// Facts generated from the installed jfs-components package, all with source
// `types`: props (name, type, allowed values, required, description), the
// defaults its component source declares, slots and the API limit on what each
// accepts, events, and the mode collections the package's own metadata says
// the component reads (FIGMA_COMPONENT_MODES and FIGMA_MODES).
//
// Facts from docs/evidence (source `evidence`) and gaps are added by the build
// from each guidance file, with the evidence quote they rest on.

import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { join } from 'node:path'
import ts from 'typescript'
import { DOCS, norm } from './lib.mjs'

const PACKAGE_DIR = join(DOCS, 'node_modules/jfs-components')
const PROBE = join(DOCS, 'agent-pack/.facts-probe.tsx')
const require = createRequire(import.meta.url)

const compilerOptions = {
  target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  jsx: ts.JsxEmit.ReactJSX,
  strict: true,
  noEmit: true,
  skipLibCheck: true,
  allowSyntheticDefaultImports: true,
  esModuleInterop: true,
  types: [],
}

/** A program over one in-memory file that imports the components. */
function probeProgram(ids) {
  const text = [
    "import type { ComponentProps } from 'react'",
    `import { ${ids.join(', ')} } from 'jfs-components'`,
    ...ids.map((id) => `export type Props_${id} = ComponentProps<typeof ${id}>`),
    `export const exportsProbe = { ${ids.join(', ')} }`,
  ].join('\n')
  const host = ts.createCompilerHost(compilerOptions)
  const readFile = host.readFile.bind(host)
  const fileExists = host.fileExists.bind(host)
  host.readFile = (file) => (file === PROBE ? text : readFile(file))
  host.fileExists = (file) => file === PROBE || fileExists(file)
  host.getSourceFile = ((original) => (file, version) =>
    file === PROBE ? ts.createSourceFile(file, text, version, true, ts.ScriptKind.TSX) : original(file, version)
  )(host.getSourceFile.bind(host))
  const program = ts.createProgram([PROBE], compilerOptions, host)
  return { program, checker: program.getTypeChecker(), probe: program.getSourceFile(PROBE) }
}

/** The names jfs-components exports (values and types), for consistency checks. */
export function packageExports() {
  const { checker, probe } = probeProgram(['Button'])
  const importDecl = probe.statements.find((statement) => ts.isImportDeclaration(statement) &&
    statement.moduleSpecifier.text === 'jfs-components')
  const moduleSymbol = checker.getSymbolAtLocation(importDecl.moduleSpecifier)
  return new Set(checker.getExportsOfModule(moduleSymbol).map((symbol) => symbol.getName()))
}

const isPackageFile = (file) => file.includes('/node_modules/jfs-components/')
const componentFile = (id) => `/components/${id}/${id}.d.ts`

/** The declaration in the component's own file (RN base types can declare the same prop). */
function ownDeclaration(symbol, id) {
  return (symbol.declarations ?? []).find((declaration) =>
    declaration.getSourceFile().fileName.endsWith(componentFile(id)))
}

/** JSDoc of the component's own declaration, with any @deprecated note. */
function docOf(declaration) {
  if (!declaration) return { text: '', deprecated: null }
  let text = ''
  let deprecated = null
  for (const jsdoc of ts.getJSDocCommentsAndTags(declaration)) {
    if (ts.isJSDoc(jsdoc)) {
      text += ' ' + (ts.getTextOfJSDocComment(jsdoc.comment) ?? '')
      for (const tag of jsdoc.tags ?? []) {
        if (tag.tagName.text === 'deprecated') deprecated = norm(ts.getTextOfJSDocComment(tag.comment) ?? '')
      }
    }
  }
  return { text: norm(text), deprecated }
}

/** Reads `{ a = 1, b = 'x' }` defaults from the component's shipped source. */
function sourceDefaults(id) {
  const file = join(PACKAGE_DIR, 'src/components', id, `${id}.tsx`)
  let code
  try { code = readFileSync(file, 'utf8') } catch { return {} }
  const source = ts.createSourceFile(file, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  const constants = new Map()
  const literal = (node) => {
    if (!node) return undefined
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return { value: node.text }
    if (ts.isNumericLiteral(node)) return { value: Number(node.text) }
    if (node.kind === ts.SyntaxKind.TrueKeyword) return { value: true }
    if (node.kind === ts.SyntaxKind.FalseKeyword) return { value: false }
    if (node.kind === ts.SyntaxKind.NullKeyword) return { value: null }
    if (ts.isObjectLiteralExpression(node) && node.properties.length === 0) return { value: {} }
    if (ts.isPrefixUnaryExpression(node) && node.operator === ts.SyntaxKind.MinusToken && ts.isNumericLiteral(node.operand)) {
      return { value: -Number(node.operand.text) }
    }
    if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.SlashToken) {
      const left = literal(node.left)
      const right = literal(node.right)
      if (typeof left?.value === 'number' && typeof right?.value === 'number') {
        return { value: Number((left.value / right.value).toFixed(4)), expression: node.getText(source) }
      }
    }
    if (ts.isIdentifier(node) && constants.has(node.text)) return constants.get(node.text)
    if (ts.isCallExpression(node) && node.expression.getText(source) === 'Object.freeze') return literal(node.arguments[0])
    if (ts.isAsExpression(node) || ts.isParenthesizedExpression(node)) return literal(node.expression)
    return undefined
  }
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue
    for (const declaration of statement.declarationList.declarations) {
      if (ts.isIdentifier(declaration.name)) {
        const value = literal(declaration.initializer)
        if (value) constants.set(declaration.name.text, value)
      }
    }
  }
  const defaults = {}
  const visitParams = (fn) => {
    const pattern = fn.parameters[0]?.name
    if (!pattern || !ts.isObjectBindingPattern(pattern)) return
    for (const element of pattern.elements) {
      const name = (element.propertyName ?? element.name).getText(source)
      const value = literal(element.initializer)
      if (value && !(name in defaults)) defaults[name] = value
    }
  }
  const visit = (node) => {
    if ((ts.isFunctionDeclaration(node) || ts.isFunctionExpression(node)) && node.name &&
      (node.name.text === id || node.name.text === `${id}Impl`)) visitParams(node)
    ts.forEachChild(node, visit)
  }
  visit(source)
  return defaults
}

/** `@param {T} [props.name=default] - text` descriptions on the component's own JSDoc. */
function paramDocs(id) {
  const path = join(PACKAGE_DIR, 'lib/typescript/src/components', id, `${id}.d.ts`)
  const source = ts.createSourceFile(path, readFileSync(path, 'utf8'), ts.ScriptTarget.Latest, true)
  const docs = {}
  const visit = (node) => {
    if (ts.isFunctionDeclaration(node) && node.name && (node.name.text === id || node.name.text === `${id}Impl`)) {
      // TypeScript's JSDoc parser drops `[props.x="…"]` tags, so read the raw comment.
      for (const jsdoc of ts.getJSDocCommentsAndTags(node)) {
        if (!ts.isJSDoc(jsdoc)) continue
        const text = jsdoc.getText(source).replace(/^\s*\*\s?/gm, '')
        for (const match of text.matchAll(/@param\s+\{[^}]*\}\s+\[?props\.(\w+)(?:=[^\]]*)?\]?\s*-\s*([^@]*)/g)) {
          docs[match[1]] = norm(match[2].replace(/\*\/\s*$/, ''))
        }
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(source)
  return docs
}

function literalValues(type) {
  const members = type.isUnion() ? type.types : [type]
  const values = members.filter((member) => member.isStringLiteral()).map((member) => member.value)
  return values.length && values.length === members.filter((member) => !(member.flags & ts.TypeFlags.Undefined)).length
    ? values
    : null
}

function typeText(checker, symbol, node, declaration = symbol.valueDeclaration ?? symbol.declarations?.[0]) {
  if (declaration && (ts.isPropertySignature(declaration) || ts.isPropertyDeclaration(declaration)) && declaration.type) {
    return declaration.type.getText()
  }
  return checker.typeToString(checker.getTypeOfSymbolAtLocation(symbol, node), node, ts.TypeFormatFlags.NoTruncation)
}

const isNodeType = (text) => /ReactNode|ReactElement|JSX\.Element/.test(text)
const isFunctionType = (text) => /=>/.test(text)

/** The inherited (non-component) parts of a props type, e.g. `Omit<ViewProps, …>`. */
function inheritedBases(id) {
  const path = join(PACKAGE_DIR, 'lib/typescript/src/components', id, `${id}.d.ts`)
  const source = ts.createSourceFile(path, readFileSync(path, 'utf8'), ts.ScriptTarget.Latest, true)
  const bases = []
  const collect = (typeNode) => {
    if (!typeNode) return
    if (ts.isIntersectionTypeNode(typeNode)) typeNode.types.forEach(collect)
    else if (!ts.isTypeLiteralNode(typeNode)) bases.push(typeNode.getText(source))
  }
  const visit = (node) => {
    if (ts.isTypeAliasDeclaration(node) && node.name.text === `${id}Props`) collect(node.type)
    if (ts.isInterfaceDeclaration(node) && node.name.text === `${id}Props`) {
      for (const clause of node.heritageClauses ?? []) clause.types.forEach((type) => bases.push(type.getText(source)))
    }
    if (ts.isVariableDeclaration(node) && node.type && /ForwardRefExoticComponent/.test(node.type.getText(source)) &&
      ts.isIdentifier(node.name) && node.name.text === `${id}Base`) {
      const argument = node.type.typeArguments?.[0]
      collect(argument)
    }
    ts.forEachChild(node, visit)
  }
  visit(source)
  return bases.filter((base) => !/^React\.RefAttributes/.test(base))
}

const MODES = require(join(PACKAGE_DIR, 'lib/commonjs/design-tokens/figma-modes.generated.js'))
const VARIABLES = JSON.parse(readFileSync(join(PACKAGE_DIR, 'src/design-tokens/Coin Variables-variables-full.json'), 'utf8'))
const DEFAULT_MODE = new Map(VARIABLES.collections.map((collection) => [
  collection.name,
  collection.modes.find((mode) => mode.modeId === collection.defaultModeId)?.name,
]))

/** Every mode collection the package defines (its FIGMA_MODES export). */
export function modeCollections() {
  return new Set(Object.keys(MODES.FIGMA_MODES))
}

/** The component's own JSDoc (on its function declaration), as plain text. */
function componentDoc(id) {
  const path = join(PACKAGE_DIR, 'lib/typescript/src/components', id, `${id}.d.ts`)
  const source = ts.createSourceFile(path, readFileSync(path, 'utf8'), ts.ScriptTarget.Latest, true)
  let text = ''
  const visit = (node) => {
    if (ts.isFunctionDeclaration(node) && node.name && (node.name.text === id || node.name.text === `${id}Impl`)) {
      for (const jsdoc of ts.getJSDocCommentsAndTags(node)) {
        if (ts.isJSDoc(jsdoc)) text += ' ' + (ts.getTextOfJSDocComment(jsdoc.comment) ?? '')
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(source)
  return norm(text.replace(/\*\*/g, ''))
}

function modeFacts(id) {
  const doc = componentDoc(id)
  return (MODES.FIGMA_COMPONENT_MODES[id] ?? []).map((collection) => {
    // A sentence of the component's JSDoc that names this collection, if any.
    const said = doc.split(/(?<=\.)\s+/).filter((sentence) =>
      sentence.includes(`'${collection}'`) || sentence.includes(`\`${collection}\``))
    const fact = {
      name: collection,
      type: 'mode collection',
      values: [...(MODES.FIGMA_MODES[collection] ?? [])],
      description: norm([
        `A token collection ${id} reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode.`,
        said.length ? `Package docs: ${said.join(' ')}` : '',
      ].join(' ')),
      source: 'types',
    }
    const fallback = DEFAULT_MODE.get(collection)
    if (fallback) fact.default = fallback
    return fact
  })
}

/** Fields of item types used by structured slots, e.g. BenefitCardItem. */
function itemTypeFacts(checker, probe, typeName, usedBy) {
  const importDecl = probe.statements.find((statement) => ts.isImportDeclaration(statement) && statement.moduleSpecifier.text === 'jfs-components')
  const moduleSymbol = checker.getSymbolAtLocation(importDecl.moduleSpecifier)
  const symbol = checker.getExportsOfModule(moduleSymbol).find((entry) => entry.getName() === typeName)
  if (!symbol) return []
  const type = checker.getDeclaredTypeOfSymbol(symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol)
  return type.getProperties().map((property) => {
    const text = typeText(checker, property, probe)
    const fact = {
      name: `${typeName}.${property.getName()}`,
      type: text,
      required: !(property.flags & ts.SymbolFlags.Optional),
      description: [docOf(property.declarations?.[0]).text, `A field of each ${usedBy.join(' and ')} row.`].filter(Boolean).join(' '),
      source: 'types',
    }
    const values = literalValues(checker.getTypeOfSymbolAtLocation(property, probe))
    if (values) fact.values = values
    return fact
  })
}

export function generateFacts(ids) {
  const { program, checker, probe } = probeProgram(ids)
  const diagnostics = ts.getPreEmitDiagnostics(program).filter((d) => d.file?.fileName === PROBE)
  if (diagnostics.length) {
    throw new Error(diagnostics.map((d) => ts.flattenDiagnosticMessageText(d.messageText, '\n')).join('\n'))
  }
  const result = {}
  for (const id of ids) {
    const alias = probe.statements.find((statement) => ts.isTypeAliasDeclaration(statement) && statement.name.text === `Props_${id}`)
    const propsType = checker.getTypeAtLocation(alias.name)
    const defaults = sourceDefaults(id)
    const params = paramDocs(id)
    const props = []
    const slots = []
    const events = []
    const allowedChildren = []
    const itemTypes = new Map()
    for (const property of propsType.getProperties()) {
      const declarations = property.declarations ?? []
      const own = declarations.some((declaration) => {
        const file = declaration.getSourceFile().fileName
        return isPackageFile(file) && file.endsWith(componentFile(id))
      })
      if (!own) continue
      const name = property.getName()
      const declaration = ownDeclaration(property, id)
      const text = typeText(checker, property, probe, declaration)
      const fact = { name, type: text, required: !(property.flags & ts.SymbolFlags.Optional), source: 'types' }
      const values = literalValues(checker.getTypeOfSymbolAtLocation(property, probe))
      if (values) fact.values = values
      const doc = docOf(declaration)
      const description = doc.text || params[name] || ''
      const deprecated = doc.deprecated
      const declared = defaults[name]
      if (declared) fact.default = declared.value
      const parts = [description]
      if (declared) parts.push(`Default ${JSON.stringify(declared.value)}${declared.expression ? ` (${declared.expression})` : ''}, from the component source.`)
      if (deprecated !== null) parts.unshift(`Deprecated${deprecated ? `: ${deprecated}` : '.'}`)
      const joined = norm(parts.filter(Boolean).map((part) => /[.!?)]$/.test(part) ? part : `${part}.`).join(' '))
      if (joined) fact.description = joined
      props.push(fact)

      const itemMatch = text.match(/^(\w+Item)\[\]$/)
      if (itemMatch) {
        itemTypes.set(itemMatch[1], [...(itemTypes.get(itemMatch[1]) ?? []), name])
        slots.push({ name, type: text, description: `A structured slot: an array of ${itemMatch[1]} rows. ${description}`.trim(), source: 'types' })
        allowedChildren.push({ slot: name, accepts: [itemMatch[1]], source: 'types' })
      } else if (isNodeType(text)) {
        const accepts = isFunctionType(text) ? [`(${text.replace(/\s+/g, ' ')})`] : ['ReactNode']
        slots.push({ name, type: text, ...(fact.default !== undefined ? { default: fact.default } : {}), ...(description ? { description } : {}), source: 'types' })
        allowedChildren.push({ slot: name, accepts, source: 'types' })
      }
      if (/^on[A-Z]/.test(name) && isFunctionType(text)) {
        events.push({ name, type: text, ...(description ? { description } : {}), source: 'types' })
      }
    }
    for (const [typeName, usedBy] of itemTypes) props.push(...itemTypeFacts(checker, probe, typeName, usedBy))
    for (const base of inheritedBases(id)) {
      props.push({
        name: `...${base}`,
        type: base,
        description: 'Inherited React Native props the component also accepts. They are not part of the design contract and no guide documents them.',
        source: 'types',
      })
    }
    // Static sub-components such as TextInput.Search.
    const valueSymbol = checker.getExportsOfModule(checker.getSymbolAtLocation(
      probe.statements.find((statement) => ts.isImportDeclaration(statement) && statement.moduleSpecifier.text === 'jfs-components').moduleSpecifier,
    )).find((symbol) => symbol.getName() === id)
    const valueType = checker.getTypeOfSymbolAtLocation(valueSymbol, probe)
    for (const member of valueType.getProperties()) {
      const name = member.getName()
      if (!/^[A-Z]/.test(name)) continue
      const memberType = checker.getTypeOfSymbolAtLocation(member, probe)
      const memberProps = memberType.getCallSignatures()[0]?.getParameters()[0]
      const ownMemberProps = memberProps
        ? checker.getTypeOfSymbolAtLocation(memberProps, probe).getProperties()
          .filter((prop) => prop.declarations?.some((d) => d.getSourceFile().fileName.endsWith(componentFile(id))))
          .map((prop) => prop.getName())
        : []
      props.push({
        name: `${id}.${name}`,
        type: 'component',
        description: `A static sub-component of ${id}. Its own props: ${ownMemberProps.join(', ')}.`,
        source: 'types',
      })
    }
    result[id] = { props, modes: modeFacts(id), slots, events, gaps: [], allowedChildren }
  }
  return result
}

/** Type-checks example JSX against jfs-components; returns errors per example. */
export function typecheckExamples(examples) {
  const exports = packageExports()
  const files = new Map()
  const errors = new Map()
  examples.forEach((example, index) => {
    const used = [...new Set([...example.jsx.matchAll(/<([A-Z][A-Za-z0-9]*)/g)].map((match) => match[1]))]
    const missing = used.filter((name) => !exports.has(name))
    if (missing.length) errors.set(index, [`not jfs-components exports: ${missing.join(', ')}`])
    const imports = used.filter((name) => exports.has(name))
    const file = join(DOCS, `agent-pack/.example-${index}.tsx`)
    files.set(file, [
      imports.length ? `import { ${imports.join(', ')} } from 'jfs-components'` : '',
      `export const example = (<>${example.jsx}</>)`,
    ].join('\n'))
  })
  const host = ts.createCompilerHost(compilerOptions)
  const readFile = host.readFile.bind(host)
  const fileExists = host.fileExists.bind(host)
  host.readFile = (file) => files.get(file) ?? readFile(file)
  host.fileExists = (file) => files.has(file) || fileExists(file)
  host.getSourceFile = ((original) => (file, version) =>
    files.has(file) ? ts.createSourceFile(file, files.get(file), version, true, ts.ScriptKind.TSX) : original(file, version)
  )(host.getSourceFile.bind(host))
  const program = ts.createProgram([...files.keys()], compilerOptions, host)
  for (const diagnostic of ts.getPreEmitDiagnostics(program)) {
    const fileName = diagnostic.file?.fileName
    if (!files.has(fileName)) continue
    const index = Number(fileName.match(/\.example-(\d+)\.tsx$/)[1])
    const list = errors.get(index) ?? []
    list.push(ts.flattenDiagnosticMessageText(diagnostic.messageText, ' '))
    errors.set(index, list)
  }
  return errors
}

/** Value exports that are React components (functions, memo or forwardRef). */
export function componentExports() {
  const { checker, probe } = probeProgram(['Button'])
  const importDecl = probe.statements.find((statement) => ts.isImportDeclaration(statement) &&
    statement.moduleSpecifier.text === 'jfs-components')
  const moduleSymbol = checker.getSymbolAtLocation(importDecl.moduleSpecifier)
  const names = []
  for (const symbol of checker.getExportsOfModule(moduleSymbol)) {
    const name = symbol.getName()
    if (!/^[A-Z]/.test(name)) continue
    const target = symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol
    if (!(target.flags & (ts.SymbolFlags.Function | ts.SymbolFlags.Variable))) continue
    const type = checker.getTypeOfSymbolAtLocation(target, probe)
    const text = checker.typeToString(type)
    const callable = type.getCallSignatures().some((signature) =>
      /Element|ReactNode/.test(checker.typeToString(signature.getReturnType())))
    if (callable || /ExoticComponent|ComponentType|FC</.test(text)) names.push(name)
  }
  return names.sort()
}
