// Types for the Coin agent pack, written from the shared JSON Schemas
// (entry, manifest, index, releases, graph, and sizes at schemaVersion 1;
// pilot results at schemaVersion 2). The pack
// pipeline owns the schemas and the published files under public/agent/; the
// views only read them. Keep these in step with the schemas, never ahead.

export type Category =
  | 'action'
  | 'input'
  | 'content'
  | 'card'
  | 'navigation'
  | 'feedback'
  | 'layout'
  | 'data'

export type EntryState = 'documented' | 'flagged' | 'undocumented' | 'unsupported'

export type Strength = 'required' | 'recommended' | 'discouraged'

/** Where a fact came from: package types, runtime check, guide evidence, or not known. */
export type FactSource = 'types' | 'runtime' | 'evidence' | 'unknown'

/** Guide sections a quote can come from. */
export type GuideSectionName =
  | 'summary'
  | 'corePrinciple'
  | 'anatomy'
  | 'configuration'
  | 'states'
  | 'sizing'
  | 'content'
  | 'inContext'
  | 'doDont'
  | 'evidence'

/** Exact guide text at status.guideCommit. `section` is a GuideSectionName. */
export type QuoteOrigin = { section: string; quote: string }

/** A JSON pointer into facts, e.g. /facts/props/0. */
export type FactOrigin = { fact: string }

export type Origin = QuoteOrigin | FactOrigin

export type Rule = {
  text: string
  strength: Strength
  from: Origin
  /** Prop or mode a configuration rule is about. */
  target?: string
  /** The value the rule is about, when one. */
  value?: string
  /** Component id to use instead (avoidWhen rules). */
  useInstead?: string
}

export type Fact = {
  name: string
  type?: string
  values?: string[]
  default?: unknown
  required?: boolean
  description?: string
  source: FactSource
  /** ISO date. */
  checkedOn?: string
}

export type Gap = {
  text: string
  source: 'runtime' | 'evidence'
  /** ISO date. */
  checkedOn: string
}

export type Flag = {
  /** JSON pointer to the flagged item; "" is the whole entry. */
  field: string
  reason: string
  by: 'trace-check' | 'cross-check' | 'human'
}

export type AnatomyPart = {
  part: string
  holds: string
  required: boolean
  from: Origin
}

export type AllowedChildren = {
  slot: string
  accepts: string[]
  source: FactSource
}

export type EntryStateRecord = {
  state: EntryState
  guideCommit: string | null
  packageVersion: string
  /** ISO date-time. */
  builtAt: string
  flags: Flag[]
}

export type StateNote = { state: string; when: string; from: Origin }

export type DoDontPair = { do: string; dont: string; why: string; from: Origin }

export type Example = {
  purpose: string
  /** Public-API JSX, jfs-components exports only. */
  jsx: string
  from: Origin | null
}

export type AgentEntry = {
  schemaVersion: 1
  /** Public export name, e.g. Badge. */
  id: string
  /** Guide slug, e.g. badge. */
  slug: string
  category: Category
  tags: string[]
  status: EntryStateRecord
  summary: string
  useWhen: Rule[]
  avoidWhen: Rule[]
  anatomy: AnatomyPart[]
  allowedChildren: AllowedChildren[]
  placementAdvice: Rule[]
  configuration: Rule[]
  content: { rules: Rule[]; good: string[]; bad: string[] }
  states: StateNote[]
  accessibility: Rule[]
  doDont: DoDontPair[]
  /** One to three. */
  examples: Example[]
  facts: { props: Fact[]; modes: Fact[]; slots: Fact[]; events: Fact[]; gaps: Gap[] }
  sources: { guide: string | null; figma: string | null; storybook: string | null }
}

export type Manifest = {
  schemaVersion: 1
  packVersion: string
  packageVersion: string
  packageSource: string
  guideCommit: string
  /** ISO date-time. */
  builtAt: string
  components: number
  counts: Record<EntryState, number>
}

export type IndexComponent = {
  id: string
  slug: string
  category: Category
  tags: string[]
  state: EntryState
  summary: string
  /** The ids its avoidWhen rules name. */
  useInstead: string[]
}

export type PackIndex = {
  schemaVersion: 1
  packVersion: string
  components: IndexComponent[]
}

/** /agent/index.json */
export type Releases = {
  schemaVersion: 1
  current: string
  releases: string[]
}

export type PilotKind = 'choose' | 'configure' | 'compose' | 'gap'

/** What the agent may read in a pilot run. */
export type PilotVariant = 'none' | 'full' | 'brief' | 'graph'

export type PilotTokens = {
  input: number
  cacheRead: number
  cacheWrite: number
  output: number
  /** Largest single model call: input + cacheRead + cacheWrite. */
  peakContext: number
  /** Tokens of the pack files the agent read, each file counted once. */
  coin: number
  coinEstimated: boolean
}

export type PilotRun = {
  variant: PilotVariant
  answer: string
  read: Array<{ file: string; tokens: number }>
  pass: boolean
  /** Expectations it missed. */
  failed: string[]
  notes: string
  tokens: PilotTokens
  /** Model calls in the run. */
  calls: number
  durationMs: number
}

export type PilotQuestion = {
  id: string
  kind: PilotKind
  question: string
  expected: {
    validAnswers: string[]
    required: string[]
    recommended: string[]
    settledBy: string | null
  }
  runs: PilotRun[]
}

/** /agent/pilot/results.json, schema version 2. */
export type PilotResults = {
  schemaVersion: 2
  packVersion: string
  /** ISO date-time. */
  runAt: string
  model: string
  variants: PilotVariant[]
  questions: PilotQuestion[]
}

export type GraphEdgeType = 'useInstead' | 'placedIn' | 'slotAccepts' | 'usedWith'

export type GraphNode = {
  id: string
  slug: string | null
  category: Category | null
  state: EntryState | null
  /** false for components named by edges but without an entry. */
  inPack: boolean
}

export type GraphEdge = {
  from: string
  to: string
  type: GraphEdgeType
  /** slotAccepts only. */
  slot?: string
  strength?: Strength
  /** JSON pointer into the from-component's entry. */
  source: string
}

/** graph.json in a release. */
export type PackGraph = {
  schemaVersion: 1
  packVersion: string
  nodes: GraphNode[]
  edges: GraphEdge[]
}

export type SizedFile = {
  path: string
  bytes: number
  tokens: number
  estimated: boolean
}

/** sizes.json in a release. */
export type PackSizes = {
  schemaVersion: 1
  packVersion: string
  /** How tokens were counted: the API counter and model, or 'estimate: chars/3.5'. */
  tokenizer: string
  files: SizedFile[]
}
