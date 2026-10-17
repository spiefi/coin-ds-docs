// Parses the JSX in agent pack examples, without eval. It reads the subset
// that public-API examples use: elements and fragments, string and literal
// props, objects, arrays, nested JSX, and arrow functions (kept as no-ops).
// LiveJsx.tsx turns the result into real jfs-components elements.

export type Value =
  | { kind: 'literal'; value: string | number | boolean | null | undefined }
  | { kind: 'object'; entries: Array<[string, Value]> }
  | { kind: 'array'; items: Value[] }
  | { kind: 'function' }
  | { kind: 'name'; path: string[] }
  | { kind: 'jsx'; node: JsxNode }

export type JsxNode =
  | { kind: 'element'; name: string; props: Array<[string, Value]>; children: JsxNode[] }
  | { kind: 'fragment'; children: JsxNode[] }
  | { kind: 'text'; value: string }
  | { kind: 'expression'; value: Value | null }

const ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: '\u00a0' }

class Parser {
  index = 0
  constructor(readonly source: string) {}

  fail(message: string): never {
    const line = this.source.slice(0, this.index).split('\n').length
    throw new SyntaxError(`${message} (line ${line})`)
  }

  peek(text: string) {
    return this.source.startsWith(text, this.index)
  }

  skipSpace() {
    for (;;) {
      const rest = this.source.slice(this.index)
      const space = /^\s+/.exec(rest)
      if (space) {
        this.index += space[0].length
        continue
      }
      if (rest.startsWith('//')) {
        const end = this.source.indexOf('\n', this.index)
        this.index = end === -1 ? this.source.length : end
        continue
      }
      if (rest.startsWith('/*')) {
        const end = this.source.indexOf('*/', this.index + 2)
        if (end === -1) this.fail('Unclosed comment')
        this.index = end + 2
        continue
      }
      return
    }
  }

  expect(text: string) {
    this.skipSpace()
    if (!this.peek(text)) this.fail(`Expected "${text}"`)
    this.index += text.length
  }

  name(pattern = /^[A-Za-z_$][\w$]*/) {
    const match = pattern.exec(this.source.slice(this.index))
    if (!match) this.fail('Expected a name')
    this.index += match[0].length
    return match[0]
  }

  root(): JsxNode {
    const nodes: JsxNode[] = []
    this.skipSpace()
    while (this.index < this.source.length) {
      if (!this.peek('<')) this.fail('Expected a JSX element')
      nodes.push(this.element())
      this.skipSpace()
    }
    if (!nodes.length) this.fail('No JSX to render')
    return nodes.length === 1 ? nodes[0] : { kind: 'fragment', children: nodes }
  }

  element(): JsxNode {
    this.expect('<')
    this.skipSpace()
    if (this.peek('>')) {
      this.index += 1
      return { kind: 'fragment', children: this.children('') }
    }
    const name = this.name(/^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*)*/)
    const props: Array<[string, Value]> = []
    for (;;) {
      this.skipSpace()
      if (this.peek('/>')) {
        this.index += 2
        return { kind: 'element', name, props, children: [] }
      }
      if (this.peek('>')) {
        this.index += 1
        return { kind: 'element', name, props, children: this.children(name) }
      }
      if (this.peek('{')) this.fail(`Spread props are not supported on <${name}>`)
      const prop = this.name(/^[A-Za-z_$][\w$:-]*/)
      this.skipSpace()
      if (!this.peek('=')) {
        props.push([prop, { kind: 'literal', value: true }])
        continue
      }
      this.index += 1
      this.skipSpace()
      if (this.peek('"') || this.peek("'")) {
        props.push([prop, { kind: 'literal', value: this.quoted(false) }])
      } else if (this.peek('{')) {
        this.index += 1
        const value = this.expression()
        this.expect('}')
        props.push([prop, value])
      } else {
        this.fail(`Expected a value for ${prop}`)
      }
    }
  }

  children(name: string): JsxNode[] {
    const children: JsxNode[] = []
    for (;;) {
      if (this.index >= this.source.length) this.fail(`<${name || ''}> is not closed`)
      if (this.peek('</')) {
        this.index += 2
        this.skipSpace()
        const closing = this.peek('>') ? '' : this.name(/^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*)*/)
        if (closing !== name) this.fail(`Expected </${name}>, found </${closing}>`)
        this.expect('>')
        return children
      }
      if (this.peek('<')) {
        children.push(this.element())
      } else if (this.peek('{')) {
        this.index += 1
        this.skipSpace()
        const value = this.peek('}') ? null : this.expression()
        this.expect('}')
        children.push({ kind: 'expression', value })
      } else {
        const end = this.source.slice(this.index).search(/[<{]/)
        const raw = this.source.slice(this.index, end === -1 ? undefined : this.index + end)
        this.index += raw.length
        const text = jsxText(raw)
        if (text) children.push({ kind: 'text', value: text })
      }
    }
  }

  quoted(escapes: boolean) {
    const quote = this.source[this.index]
    let value = ''
    this.index += 1
    for (;;) {
      const char = this.source[this.index]
      if (char === undefined) this.fail('Unclosed string')
      this.index += 1
      if (char === quote) return value
      if (escapes && char === '\\') {
        const next = this.source[this.index]
        this.index += 1
        value += next === 'n' ? '\n' : next === 't' ? '\t' : next
      } else if (quote === '`' && char === '$' && this.peek('{')) {
        // A template expression can't run here: keep a literal's value, or show
        // the expression itself, e.g. `${value}%` renders as "${value}%".
        const start = this.index
        this.skipBalanced('{', '}')
        const inner = this.source.slice(start + 1, this.index - 1).trim()
        const text = /^(['"])(.*)\1$/.exec(inner)?.[2]
        value += text ?? (/^-?\d+(\.\d+)?$/.test(inner) ? inner : `\${${inner}}`)
      } else {
        value += char
      }
    }
  }

  expression(): Value {
    this.skipSpace()
    const value = this.arithmetic(['+', '-'], () => this.arithmetic(['*', '/'], () => this.primary()))
    this.skipSpace()
    // TypeScript casts in examples, e.g. modes={{ … } as Modes}.
    while (/^(as|satisfies)\b/.test(this.source.slice(this.index))) {
      this.name()
      this.skipSpace()
      this.name(/^[A-Za-z_$][\w$.]*(<[^>]*>)?(\[\])?/)
      this.skipSpace()
    }
    return value
  }

  /** Number arithmetic with the usual precedence, e.g. ratio={16 / 9}. */
  arithmetic(operators: string[], operand: () => Value): Value {
    let value = operand()
    for (;;) {
      this.skipSpace()
      const operator = this.source[this.index]
      // Not an operator: a comment, the end of a tag, or anything else.
      if (!operators.includes(operator) || /^[/][/*>]/.test(this.source.slice(this.index))) return value
      this.index += 1
      this.skipSpace()
      const right = operand()
      if (value.kind !== 'literal' || right.kind !== 'literal' || typeof value.value !== 'number' || typeof right.value !== 'number') {
        this.fail('Only arithmetic on numbers is supported')
      }
      const [a, b] = [value.value, right.value]
      value = { kind: 'literal', value: operator === '+' ? a + b : operator === '-' ? a - b : operator === '*' ? a * b : a / b }
    }
  }

  primary(): Value {
    const rest = this.source.slice(this.index)
    if (this.peek('"') || this.peek("'") || this.peek('`')) return { kind: 'literal', value: this.quoted(true) }
    const number = /^-?\d+(\.\d+)?/.exec(rest)
    if (number) {
      this.index += number[0].length
      return { kind: 'literal', value: Number(number[0]) }
    }
    if (this.peek('<')) return { kind: 'jsx', node: this.element() }
    if (this.peek('{')) return this.object()
    if (this.peek('[')) return this.array()
    const arrow = /^(\([^()]*\)|[A-Za-z_$][\w$]*)\s*=>/.exec(rest)
    if (arrow) {
      this.index += arrow[0].length
      this.skipSpace()
      // The body never runs, so skip it: a block, or an expression up to the
      // next "," or closing bracket at this depth.
      if (this.peek('{')) this.skipBalanced('{', '}')
      else this.skipExpression()
      return { kind: 'function' }
    }
    if (this.peek('(')) {
      this.index += 1
      const value = this.expression()
      this.expect(')')
      return value
    }
    const word = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*)*/.exec(rest)
    if (word) {
      this.index += word[0].length
      const literals: Record<string, Value> = {
        true: { kind: 'literal', value: true },
        false: { kind: 'literal', value: false },
        null: { kind: 'literal', value: null },
        undefined: { kind: 'literal', value: undefined },
      }
      return literals[word[0]] ?? { kind: 'name', path: word[0].split('.') }
    }
    this.fail('Unsupported expression')
  }

  object(): Value {
    this.expect('{')
    const entries: Array<[string, Value]> = []
    for (;;) {
      this.skipSpace()
      if (this.peek('}')) {
        this.index += 1
        return { kind: 'object', entries }
      }
      if (this.peek('...')) this.fail('Object spread is not supported')
      const key =
        this.peek('"') || this.peek("'") ? this.quoted(true) : this.name(/^[A-Za-z_$\d][\w$]*/)
      this.expect(':')
      entries.push([key, this.expression()])
      this.skipSpace()
      if (this.peek(',')) this.index += 1
      else if (!this.peek('}')) this.fail('Expected "," or "}" in an object')
    }
  }

  array(): Value {
    this.expect('[')
    const items: Value[] = []
    for (;;) {
      this.skipSpace()
      if (this.peek(']')) {
        this.index += 1
        return { kind: 'array', items }
      }
      items.push(this.expression())
      this.skipSpace()
      if (this.peek(',')) this.index += 1
      else if (!this.peek(']')) this.fail('Expected "," or "]" in an array')
    }
  }

  skipExpression() {
    let depth = 0
    for (;;) {
      const char = this.source[this.index]
      if (char === undefined) this.fail('Unfinished function')
      if (char === '"' || char === "'" || char === '`') {
        this.quoted(true)
        continue
      }
      if ('([{'.includes(char)) depth += 1
      if (')]}'.includes(char) || char === ',') {
        if (depth === 0) return
        if (char !== ',') depth -= 1
      }
      this.index += 1
    }
  }

  skipBalanced(open: string, close: string) {
    let depth = 0
    do {
      const char = this.source[this.index]
      if (char === undefined) this.fail(`Unclosed "${open}"`)
      if (char === '"' || char === "'" || char === '`') {
        this.quoted(true)
        continue
      }
      if (char === open) depth += 1
      if (char === close) depth -= 1
      this.index += 1
    } while (depth > 0)
  }
}

/** JSX whitespace rules (as Babel applies them): trim lines, drop blank ones, join with spaces. */
function jsxText(raw: string) {
  const lines = raw.split(/\r\n|\n|\r/)
  let lastFilled = -1
  lines.forEach((line, index) => {
    if (/[^ \t]/.test(line)) lastFilled = index
  })
  let text = ''
  lines.forEach((line, index) => {
    let trimmed = line.replace(/\t/g, ' ')
    if (index > 0) trimmed = trimmed.replace(/^ +/, '')
    if (index < lines.length - 1) trimmed = trimmed.replace(/ +$/, '')
    if (trimmed) text += index === lastFilled ? trimmed : `${trimmed} `
  })
  return text.replace(/&(\w+);/g, (match, name: string) => ENTITIES[name] ?? match)
}

/** Parses example JSX. Throws a SyntaxError that names the line. */
export function parseJsx(source: string): JsxNode {
  return new Parser(source).root()
}

/** Every component name the JSX uses, in order of first use. */
export function jsxComponents(source: string): string[] {
  const names = new Set<string>()
  const visit = (node: JsxNode) => {
    if (node.kind === 'element') names.add(node.name)
    if (node.kind === 'element' || node.kind === 'fragment') node.children.forEach(visit)
    if (node.kind === 'element') node.props.forEach(([, value]) => visitValue(value))
    if (node.kind === 'expression' && node.value) visitValue(node.value)
  }
  const visitValue = (value: Value) => {
    if (value.kind === 'jsx') visit(value.node)
    if (value.kind === 'object') value.entries.forEach(([, item]) => visitValue(item))
    if (value.kind === 'array') value.items.forEach(visitValue)
  }
  try {
    visit(parseJsx(source))
  } catch {
    // The renderer reports parse errors.
  }
  return [...names]
}
