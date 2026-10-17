import type { ReactNode } from 'react'

// A small Markdown renderer for the pack's own files (rules.md, entry .md):
// headings, paragraphs, lists, block quotes, fenced code, tables, rules, and
// inline code, bold, italics, and links. It builds React elements, never HTML.

type Block =
  | { kind: 'heading'; level: number; text: string }
  | { kind: 'paragraph'; text: string }
  | { kind: 'list'; ordered: boolean; items: Array<{ text: string; children: Block[] }> }
  | { kind: 'quote'; blocks: Block[] }
  | { kind: 'code'; language: string; text: string }
  | { kind: 'table'; header: string[]; rows: string[][] }
  | { kind: 'rule' }

const LIST_ITEM = /^(\s*)([-*+]|\d+[.)])\s+(.*)$/

function splitRow(line: string) {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim())
}

function parseBlocks(lines: string[]): Block[] {
  const blocks: Block[] = []
  let index = 0

  while (index < lines.length) {
    const line = lines[index]

    if (!line.trim()) {
      index += 1
      continue
    }

    const fence = /^\s*(```|~~~)\s*([\w-]*)/.exec(line)
    if (fence) {
      const body: string[] = []
      index += 1
      while (index < lines.length && !lines[index].trim().startsWith(fence[1])) body.push(lines[index++])
      index += 1
      blocks.push({ kind: 'code', language: fence[2], text: body.join('\n') })
      continue
    }

    const heading = /^(#{1,6})\s+(.*?)\s*#*\s*$/.exec(line)
    if (heading) {
      blocks.push({ kind: 'heading', level: heading[1].length, text: heading[2] })
      index += 1
      continue
    }

    if (/^\s*([-*_])(\s*\1){2,}\s*$/.test(line)) {
      blocks.push({ kind: 'rule' })
      index += 1
      continue
    }

    if (/^\s*>/.test(line)) {
      const body: string[] = []
      while (index < lines.length && /^\s*>/.test(lines[index])) body.push(lines[index++].replace(/^\s*>\s?/, ''))
      blocks.push({ kind: 'quote', blocks: parseBlocks(body) })
      continue
    }

    if (line.includes('|') && index + 1 < lines.length && /^\s*\|?\s*:?-{3,}/.test(lines[index + 1])) {
      const header = splitRow(line)
      const rows: string[][] = []
      index += 2
      while (index < lines.length && lines[index].includes('|') && lines[index].trim()) rows.push(splitRow(lines[index++]))
      blocks.push({ kind: 'table', header, rows })
      continue
    }

    const item = LIST_ITEM.exec(line)
    if (item) {
      const indent = item[1].length
      const ordered = /\d/.test(item[2])
      const items: Array<{ text: string; children: Block[] }> = []
      while (index < lines.length) {
        if (!lines[index].trim()) {
          // A blank line continues the list only when another item follows.
          let next = index
          while (next < lines.length && !lines[next].trim()) next += 1
          const following = next < lines.length ? LIST_ITEM.exec(lines[next]) : null
          if (!following || following[1].length !== indent || /\d/.test(following[2]) !== ordered) break
          index = next
          continue
        }
        const current = LIST_ITEM.exec(lines[index])
        if (current && current[1].length <= indent) {
          if (current[1].length < indent || /\d/.test(current[2]) !== ordered) break
          items.push({ text: current[3], children: [] })
          index += 1
          continue
        }
        // Lines under an item: a nested list, or text that continues the item.
        const nested: string[] = []
        while (index < lines.length && lines[index].trim()) {
          const next = LIST_ITEM.exec(lines[index])
          if (next && next[1].length <= indent) break
          const text = lines[index++]
          nested.push(text.slice(Math.min(indent + 2, text.search(/\S/))))
        }
        const last = items[items.length - 1]
        if (LIST_ITEM.test(nested[0])) last.children.push(...parseBlocks(nested))
        else last.text += ' ' + nested.map((text) => text.trim()).join(' ')
      }
      blocks.push({ kind: 'list', ordered, items })
      continue
    }

    const paragraph: string[] = []
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^(#{1,6})\s|^\s*(```|~~~|>)/.test(lines[index]) &&
      !LIST_ITEM.test(lines[index])
    ) {
      paragraph.push(lines[index++].trim())
    }
    blocks.push({ kind: 'paragraph', text: paragraph.join(' ') })
  }

  return blocks
}

const INLINE = /(`+)([^`]+?)\1|\*\*([^*]+)\*\*|__([^_]+)__|\*([^*\s][^*]*)\*|_([^_\s][^_]*)_|\[([^\]]+)\]\(([^)\s]+)\)/

function safeHref(href: string) {
  return /^(https?:|mailto:|\/|#|\.{0,2}\/?[\w.-])/i.test(href) && !/^\s*javascript:/i.test(href) ? href : undefined
}

function inline(text: string, key = 0): ReactNode[] {
  const nodes: ReactNode[] = []
  let rest = text
  let index = key
  while (rest) {
    const match = INLINE.exec(rest)
    if (!match) {
      nodes.push(rest)
      break
    }
    if (match.index) nodes.push(rest.slice(0, match.index))
    const k = `i${index++}`
    if (match[2] !== undefined) nodes.push(<code key={k}>{match[2]}</code>)
    else if (match[3] !== undefined || match[4] !== undefined) nodes.push(<strong key={k}>{inline(match[3] ?? match[4], index * 100)}</strong>)
    else if (match[5] !== undefined || match[6] !== undefined) nodes.push(<em key={k}>{inline(match[5] ?? match[6], index * 100)}</em>)
    else {
      const href = safeHref(match[8])
      const external = href && /^https?:/i.test(href)
      nodes.push(
        href ? (
          <a key={k} href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
            {inline(match[7], index * 100)}
          </a>
        ) : (
          match[0]
        ),
      )
    }
    rest = rest.slice(match.index + match[0].length)
  }
  return nodes
}

function renderBlock(block: Block, key: number): ReactNode {
  switch (block.kind) {
    case 'heading': {
      // The page owns h1; file headings start at h2.
      const level = Math.min(block.level + 1, 6)
      const Tag = `h${level}` as 'h2'
      return <Tag key={key}>{inline(block.text)}</Tag>
    }
    case 'paragraph':
      return <p key={key}>{inline(block.text)}</p>
    case 'list': {
      const Tag = block.ordered ? 'ol' : 'ul'
      return (
        <Tag key={key}>
          {block.items.map((item, index) => (
            <li key={index}>
              {inline(item.text)}
              {item.children.map(renderBlock)}
            </li>
          ))}
        </Tag>
      )
    }
    case 'quote':
      return <blockquote key={key}>{block.blocks.map(renderBlock)}</blockquote>
    case 'code':
      return (
        <pre key={key}>
          <code>{block.text}</code>
        </pre>
      )
    case 'table':
      return (
        <div className="agent-table-scroll" key={key}>
          <table>
            <thead>
              <tr>
                {block.header.map((cell, index) => (
                  <th key={index} scope="col">
                    {inline(cell)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, index) => (
                    <td key={index}>{inline(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case 'rule':
      return <hr key={key} />
  }
}

export function Markdown({ source }: { source: string }) {
  return <div className="agent-markdown">{parseBlocks(source.replace(/\r\n?/g, '\n').split('\n')).map(renderBlock)}</div>
}
