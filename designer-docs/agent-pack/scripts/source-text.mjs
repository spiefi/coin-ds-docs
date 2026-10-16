// Reads the copy a guide's source file contains, the way React renders it:
// decoded string literals, the static parts of template literals, and JSX text
// with JSX whitespace rules applied (also flattened across inline elements, so
// `Use <code>x</code> for y` reads "Use x for y"). The trace check looks for
// each quote in this text, read from the guide file at the recorded commit.

import ts from 'typescript'
import { norm } from './lib.mjs'

const ENTITIES = { '&nbsp;': ' ', '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&apos;': "'" }

/** JSX text the way Babel and TypeScript emit it (cleanJSXElementLiteralChild). */
function cleanJsxText(raw) {
  const lines = raw.split(/\r\n|\n|\r/)
  let lastNonEmpty = 0
  lines.forEach((line, index) => { if (/[^ \t]/.test(line)) lastNonEmpty = index })
  let text = ''
  lines.forEach((line, index) => {
    let trimmed = line.replace(/\t/g, ' ')
    if (index !== 0) trimmed = trimmed.replace(/^[ ]+/, '')
    if (index !== lines.length - 1) trimmed = trimmed.replace(/[ ]+$/, '')
    if (trimmed) text += index === lastNonEmpty ? trimmed : trimmed + ' '
  })
  return text.replace(/&[a-z]+;/g, (entity) => ENTITIES[entity] ?? entity)
}

const BREAK = '\u0000'

function flatten(node) {
  if (ts.isJsxText(node)) return cleanJsxText(node.text)
  if (ts.isJsxExpression(node)) {
    const expression = node.expression
    if (!expression) return ''
    if (ts.isStringLiteral(expression) || ts.isNoSubstitutionTemplateLiteral(expression)) return expression.text
    return BREAK
  }
  if (ts.isJsxElement(node) || ts.isJsxFragment(node)) return node.children.map(flatten).join('')
  return BREAK
}

/** Every piece of copy in a TSX/TS source, normalised for whitespace. */
export function sourceCorpus(code, fileName = 'guide.tsx') {
  const source = ts.createSourceFile(fileName, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  const pieces = new Set()
  const add = (text) => {
    for (const piece of text.split(BREAK)) {
      const clean = norm(piece)
      if (clean) pieces.add(clean)
    }
  }
  const visit = (node) => {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) add(node.text)
    else if (ts.isTemplateExpression(node)) {
      add(node.head.text)
      node.templateSpans.forEach((span) => add(span.literal.text))
    } else if (ts.isJsxText(node)) add(cleanJsxText(node.text))
    else if (ts.isJsxElement(node) || ts.isJsxFragment(node)) add(node.children.map(flatten).join(''))
    ts.forEachChild(node, visit)
  }
  visit(source)
  return [...pieces]
}

/** The `defineGuide({ ... })` registration: slug, label, summary, keywords. */
export function readRegistration(code, fileName = 'guide.tsx') {
  const source = ts.createSourceFile(fileName, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  let found = null
  const visit = (node) => {
    if (ts.isCallExpression(node) && node.expression.getText(source) === 'defineGuide') {
      const object = node.arguments[0]
      if (object && ts.isObjectLiteralExpression(object)) {
        found = {}
        for (const property of object.properties) {
          if (!ts.isPropertyAssignment(property)) continue
          const key = property.name.getText(source)
          const value = property.initializer
          if (ts.isStringLiteral(value) || ts.isNoSubstitutionTemplateLiteral(value)) found[key] = value.text
          else if (ts.isArrayLiteralExpression(value)) {
            found[key] = value.elements.filter(ts.isStringLiteral).map((element) => element.text)
          }
        }
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(source)
  return found
}
