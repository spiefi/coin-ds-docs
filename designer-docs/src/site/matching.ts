import type { GuideDefinition } from '../guides/define'

// Component search. Ranks guides by how their name matches the query, then
// by keywords, then by words in the summary. Only when nothing matches does
// it try typo-tolerant and abbreviated matches ("accordian", "btn").

export type SearchResult = {
  guide: GuideDefinition
  /** The keyword that matched when the name did not, shown as a hint. */
  alias?: string
}

export type TextPart = { text: string; match: boolean }

/** Lowercase, drop accents and apostrophes, and turn other punctuation into spaces. */
function fold(text: string) {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function searchTokens(query: string) {
  return fold(query).split(' ').filter(Boolean)
}

type Field = { text: string; compact: string; words: string[] }
type Entry = { label: Field; keywords: Field[]; summary: string[] }

function field(text: string): Field {
  const words = searchTokens(text)
  return { text, compact: words.join(''), words }
}

const entries = new WeakMap<GuideDefinition, Entry>()

function entryFor(guide: GuideDefinition) {
  let entry = entries.get(guide)
  if (!entry) {
    entry = {
      label: field(guide.label),
      keywords: (guide.keywords ?? []).map(field),
      summary: searchTokens(guide.summary),
    }
    entries.set(guide, entry)
  }
  return entry
}

/** Every token starts one of the words. */
function startsWords(tokens: string[], words: string[]) {
  return tokens.every((token) => words.some((word) => word.startsWith(token)))
}

type Score = { score: number; alias?: string }

function exactScore({ label, keywords, summary }: Entry, tokens: string[], compact: string): Score {
  if (label.compact === compact) return { score: 100 }
  if (label.compact.startsWith(compact)) return { score: 90 }
  if (startsWords(tokens, label.words)) return { score: 80 }
  // A single letter only matches the start of a name's words.
  if (compact.length < 2) return { score: 0 }

  // Inside a name, as "stack" in HStack, ranks just below an exact keyword.
  let best: Score = { score: label.compact.includes(compact) ? 58 : 0 }
  for (const keyword of keywords) {
    const score =
      keyword.compact === compact ? 60
      : tokens.every((token) => keyword.words.includes(token)) ? 57
      : keyword.compact.startsWith(compact) ? 55
      : startsWords(tokens, keyword.words) ? 50
      : 0
    if (score > best.score) best = { score, alias: keyword.text }
  }
  if (best.score) return best

  // Every token starts a word of the name or a keyword or, from three
  // letters, a word of the summary.
  const named = [...label.words, ...keywords.flatMap((keyword) => keyword.words)]
  const loose = tokens.every(
    (token) =>
      named.some((word) => word.startsWith(token)) ||
      (token.length >= 3 && summary.some((word) => word.startsWith(token))),
  )
  return { score: loose ? 40 : 0 }
}

/** Optimal string alignment distance; returns max + 1 once it is exceeded. */
function distance(a: string, b: string, max: number) {
  if (Math.abs(a.length - b.length) > max) return max + 1
  const rows = Array.from({ length: a.length + 1 }, (_, i) =>
    Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)),
  )
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      let value = Math.min(rows[i - 1][j] + 1, rows[i][j - 1] + 1, rows[i - 1][j - 1] + cost)
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        value = Math.min(value, rows[i - 2][j - 2] + 1)
      }
      rows[i][j] = value
    }
  }
  return rows[a.length][b.length]
}

/** A misspelling of the word, or of how it starts: one edit, two from seven letters. */
function closeTo(token: string, word: string) {
  const max = token.length >= 7 ? 2 : 1
  return (
    distance(token, word, max) <= max ||
    (word.length > token.length && distance(token, word.slice(0, token.length), max) <= max)
  )
}

function isSubsequence(needle: string, haystack: string) {
  let found = 0
  for (const char of haystack) if (char === needle[found]) found++
  return found === needle.length
}

// Fallback matches prefer names whose first word matches ("chekbox" finds
// Checkbox before Accordion Checkbox, "btn" finds Button before Bottom Nav).
function fuzzyScore({ label, keywords }: Entry, tokens: string[], compact: string): Score {
  const words = [...label.words, ...keywords.flatMap((keyword) => keyword.words)]
  if (tokens.every((token) => token.length >= 4 && words.some((word) => closeTo(token, word)))) {
    return { score: closeTo(tokens[0], label.words[0]) ? 33 : 30 }
  }
  // Abbreviations such as "btn" or "ddm": the name's letters in order.
  if (compact.length >= 2 && compact[0] === label.compact[0] && isSubsequence(compact, label.compact)) {
    return { score: isSubsequence(compact, label.words[0]) ? 23 : 20 }
  }
  return { score: 0 }
}

/** Guides matching the query, best first. An empty query returns every guide. */
export function searchGuides(guides: readonly GuideDefinition[], query: string): SearchResult[] {
  const tokens = searchTokens(query)
  if (!tokens.length) return guides.map((guide) => ({ guide }))
  const compact = tokens.join('')

  const rank = (score: (entry: Entry) => Score) =>
    guides
      .map((guide) => ({ guide, ...score(entryFor(guide)) }))
      .filter((result) => result.score > 0)
      .sort((a, b) => b.score - a.score || a.guide.label.localeCompare(b.guide.label, 'en'))
      .map(({ guide, alias }) => ({ guide, alias }))

  const exact = rank((entry) => exactScore(entry, tokens, compact))
  return exact.length ? exact : rank((entry) => fuzzyScore(entry, tokens, compact))
}

const isWordChar = (char: string | undefined) => !!char && /[a-z0-9]/i.test(char)

/**
 * Splits text into parts that mark where the query matches. Names match the
 * query with spaces removed ("iconbut" marks "Icon But"); other text marks
 * the start of words for query words of three letters or more.
 */
export function highlight(text: string, query: string, { name = false } = {}): TextPart[] {
  const tokens = searchTokens(query).filter((token) => name || token.length >= 3)
  const marked = new Array<boolean>(text.length).fill(false)
  const lower = text.toLowerCase()

  let done = false
  if (name && tokens.length) {
    const positions: number[] = []
    for (let index = 0; index < text.length; index++) if (isWordChar(text[index])) positions.push(index)
    const compact = tokens.join('')
    const at = positions.map((index) => lower[index]).join('').indexOf(compact)
    if (at !== -1) {
      marked.fill(true, positions[at], positions[at + compact.length - 1] + 1)
      done = true
    }
  }
  if (!done) {
    for (const token of tokens) {
      for (let index = lower.indexOf(token); index !== -1; index = lower.indexOf(token, index + 1)) {
        if (!isWordChar(text[index - 1])) marked.fill(true, index, index + token.length)
      }
    }
  }

  const parts: TextPart[] = []
  for (let index = 0; index < text.length; index++) {
    const last = parts.at(-1)
    if (last && last.match === marked[index]) last.text += text[index]
    else parts.push({ text: text[index], match: marked[index] })
  }
  return parts
}
