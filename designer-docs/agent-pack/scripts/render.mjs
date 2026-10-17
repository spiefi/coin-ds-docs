// Renders a release's Markdown from its JSON: one page per component, the
// agent rules (rules.md) and the entry point (llms.txt). Nothing here adds
// guidance; it only lays out what the entries already say.

const STRENGTH = { required: 'REQUIRED', recommended: 'recommended', discouraged: 'discouraged' }

const code = (text) => `\`${String(text).replace(/`/g, 'ˋ')}\``
const cell = (text) => String(text ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ')

function origin(from, entry) {
  if (!from) return 'no source in the guide'
  if ('fact' in from) {
    const parts = from.fact.split('/')
    const fact = entry.facts[parts[2]]?.[Number(parts[3])]
    return `fact ${code(from.fact)}${fact ? ` (${fact.name}, source ${fact.source})` : ''}`
  }
  return `${from.section}: “${from.quote}”`
}

function flagNote(entry, pointer) {
  const flags = entry.status.flags.filter((flag) => flag.field === pointer || pointer.startsWith(`${flag.field}/`) && flag.field !== '')
  return flags.length ? ` ⚑ flagged (${flags.map((flag) => flag.by).join(', ')})` : ''
}

function rules(entry, list, pointerBase, { outsidePilot = [] } = {}) {
  if (!list.length) return ['_None in the guide._', '']
  return [
    ...list.map((rule, index) => {
      const about = rule.target ? ` ${code(rule.target)}${rule.value !== undefined ? ` = ${code(rule.value)}` : ''}:` : ''
      const instead = rule.useInstead
        ? ` Use instead: ${code(rule.useInstead)}${outsidePilot.includes(rule.useInstead) ? ' (not in this pack)' : ''}.`
        : ''
      return `- **${STRENGTH[rule.strength]}**${about} ${rule.text}${instead}${flagNote(entry, `${pointerBase}/${index}`)}  \n  _From ${origin(rule.from, entry)}_`
    }),
    '',
  ]
}

function factTable(entry, list, name) {
  const facts = entry.facts[list]
  if (!facts.length) return [`_No ${name}._`, '']
  return [
    '| Name | Type | Values | Default | Required | Source | Description |',
    '| --- | --- | --- | --- | --- | --- | --- |',
    ...facts.map((fact, index) => `| ${code(fact.name)}${flagNote(entry, `/facts/${list}/${index}`)} | ${fact.type ? code(cell(fact.type)) : ''} | ${cell((fact.values ?? []).join(', '))} | ${fact.default !== undefined ? code(cell(JSON.stringify(fact.default))) : ''} | ${fact.required ? 'yes' : ''} | ${fact.source}${fact.checkedOn ? ` (${fact.checkedOn})` : ''} | ${cell(fact.description ?? '')} |`),
    '',
  ]
}

export function componentMarkdown(entry, { packVersion, outsidePilot = [] }) {
  const { status } = entry
  const lines = [
    `# ${entry.id}`,
    '',
    `> Coin agent pack ${packVersion} (pilot). Generated from \`components/${entry.slug}.json\`; the JSON is the source of truth.`,
    '',
    `- **State:** ${status.state}${status.flags.length ? ` (${status.flags.length} flag${status.flags.length === 1 ? '' : 's'}, listed at the end)` : ''}`,
    `- **Package:** jfs-components ${status.packageVersion} · guide commit ${code(status.guideCommit?.slice(0, 7) ?? 'none')} · built ${status.builtAt}`,
    `- **Category:** ${entry.category} (for discovery only, not a limit on composition) · **Tags:** ${entry.tags.join(', ')}`,
    `- **Sources:** [guide](${entry.sources.guide})${entry.sources.figma ? ` · [Figma](${entry.sources.figma})` : ''}${entry.sources.storybook ? ` · [Storybook](${entry.sources.storybook})` : ''}`,
    '',
    entry.summary,
    '',
    '## Use when',
    '',
    ...rules(entry, entry.useWhen, '/useWhen'),
    '## Avoid when',
    '',
    ...rules(entry, entry.avoidWhen, '/avoidWhen', { outsidePilot }),
    '## Anatomy',
    '',
    ...(entry.anatomy.length
      ? ['| Part | Holds | Always present | From |', '| --- | --- | --- | --- |',
        ...entry.anatomy.map((part) => `| ${cell(part.part)} | ${cell(part.holds)} | ${part.required ? 'yes' : 'no'} | ${cell(origin(part.from, entry))} |`), '']
      : ['_None in the guide._', '']),
    '## Allowed children',
    '',
    'What each slot accepts, from the package types (the API limit, not a design recommendation).',
    '',
    ...(entry.allowedChildren.length
      ? ['| Slot | Accepts | Source |', '| --- | --- | --- |',
        ...entry.allowedChildren.map((slot) => `| ${code(slot.slot)} | ${slot.accepts.map((item) => code(cell(item))).join(', ')} | ${slot.source} |`), '']
      : ['_No slots._', '']),
    '## Placement',
    '',
    ...rules(entry, entry.placementAdvice, '/placementAdvice'),
    '## Configuration',
    '',
    ...rules(entry, entry.configuration, '/configuration'),
    '## Content',
    '',
    ...rules(entry, entry.content.rules, '/content/rules'),
    ...(entry.content.good.length ? [`Good: ${entry.content.good.map((text) => `“${text}”`).join(', ')}`, ''] : []),
    ...(entry.content.bad.length ? [`Bad: ${entry.content.bad.map((text) => `“${text}”`).join(', ')}`, ''] : []),
    '## States',
    '',
    ...(entry.states.length
      ? ['| State | When | From |', '| --- | --- | --- |',
        ...entry.states.map((state) => `| ${cell(state.state)} | ${cell(state.when)} | ${cell(origin(state.from, entry))} |`), '']
      : ['_None in the guide._', '']),
    '## Accessibility',
    '',
    ...rules(entry, entry.accessibility, '/accessibility'),
    '## Do and don’t',
    '',
    ...(entry.doDont.length
      ? ['| Do | Don’t | Why |', '| --- | --- | --- |',
        ...entry.doDont.map((pair) => `| ${cell(pair.do)} | ${cell(pair.dont)} | ${cell(pair.why)} |`), '']
      : ['_None in the guide._', '']),
    '## Examples',
    '',
    ...entry.examples.flatMap((example) => [
      `### ${example.purpose}`,
      '',
      '```tsx',
      example.jsx,
      '```',
      '',
      `_From ${origin(example.from, entry)}_`,
      '',
    ]),
    '## Facts',
    '',
    'Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.',
    '',
    '### Props',
    '',
    ...factTable(entry, 'props', 'props'),
    '### Modes',
    '',
    ...factTable(entry, 'modes', 'modes'),
    '### Slots',
    '',
    ...factTable(entry, 'slots', 'slots'),
    '### Events',
    '',
    ...factTable(entry, 'events', 'events'),
    '### Gaps',
    '',
    'Behaviour that was checked and found missing. Report these; do not work around them.',
    '',
    ...(entry.facts.gaps.length
      ? entry.facts.gaps.map((gap, index) => `- ${gap.text} _(${gap.source}, ${gap.checkedOn})_${flagNote(entry, `/facts/gaps/${index}`)}`)
      : ['_None recorded._']),
    '',
    '## Flags',
    '',
    ...(status.flags.length
      ? ['Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.', '',
        ...status.flags.map((flag) => `- ${code(flag.field || '(whole entry)')} · ${flag.by}: ${flag.reason}`)]
      : ['_None._']),
    '',
  ]
  return lines.join('\n')
}

export function rulesMarkdown({ packVersion, packageVersion, packageSource, entries, otherComponents }) {
  const guided = entries.filter((entry) => entry.status.state !== 'undocumented')
  const hints = entries.filter((entry) => entry.status.state === 'undocumented')
  return `# Coin agent pack: rules for agents (pilot)

Pack ${packVersion} · jfs-components ${packageVersion} · schema version 1.

**Pilot.** This pack has ${entries.length} entries, generated from the Coin
designer guides and the installed package, and is being tested.
${guided.length} come from designer guides (${guided.map((entry) => entry.id).join(', ')}).
${hints.length} are undocumented: public exports with no guide, facts only
(${hints.map((entry) => entry.id).join(', ')}).

## Rules

1. **Match the version.** Use this pack only when its jfs-components version
   (\`${packageVersion}\`) matches the installed package
   (\`node_modules/jfs-components/package.json\`). If it does not, find the
   matching release in \`/agent/index.json\`, or do not use the pack. Built
   from ${packageSource}.
2. **Use only what the facts list.** Use only components, props, values and
   slots that are in an entry's facts (or, for exports without an entry, in
   the package types). Never invent one.
3. **Follow strength.** Treat \`required\` rules as constraints. Follow
   \`recommended\` rules unless the request asks otherwise, and say so when you
   depart from one. Avoid \`discouraged\` configurations.
4. **Follow avoidWhen.** When an avoidWhen rule matches the request, follow
   it, and use its \`useInstead\` component when it names one.
5. **Read facts by source.** \`types\`: the API accepts it, but nothing has
   proven how it behaves. \`evidence\`: checked behaviour, as of \`checkedOn\`.
   \`unknown\`: nothing establishes it; do not promise it. A gap: behaviour
   that was checked and found missing; report the gap instead of working
   around it.
6. **Read entries by state.** Treat \`documented\` entries as guidance and
   \`undocumented\` ones as hints. Do not rely on a flagged rule: each flag
   points at the item it concerns; a \`flagged\` entry is still guidance apart
   from those items.
7. **Keep copy within the content rules.**
8. **Pass modes to slot children.** Pass a component's \`modes\` to the Coin
   children in its slots.
9. **Prefer what exists.** Use an existing component when it fits. Compose
   supported Coin components for layouts and patterns. Report a gap when the
   request needs unsupported API, or a replacement for a component Coin lacks.

## Reading the pack

- \`index.json\`: every entry's id, category, tags, state, summary and
  useInstead targets. \`category\` is for discovery only, never a limit on
  composition.
- \`components/<slug>.brief.md\`: the short form of an entry (summary, when to
  use and avoid, placement, key rules, one example, props and gaps). Start
  there when you have briefs.
- \`components/<slug>.md\` and \`.json\`: the full entry, with the guide sentence
  behind every rule, all facts and all flags. Open it when the brief does not
  answer the question.
- \`components/<slug>.links.md\` and \`graph.json\`: which components an entry is
  used with, placed in, or replaced by.

## Not in this pack

These jfs-components component exports exist but have no entry, so this pack
gives no guidance for them. They are not missing from Coin: work from their
types and say they are undocumented here.
${otherComponents.join(', ')}.
`
}

export function llmsText({ packVersion, packageVersion, entries }) {
  return `# Coin agent pack ${packVersion} (pilot)

> Machine-readable guidance for Coin, the Jio Finance design system's React Native components (jfs-components ${packageVersion}). Generated from the Coin designer guides and the installed package. Every rule cites the guide sentence it came from; every fact has a source.

Read rules.md first. Use this pack only with jfs-components ${packageVersion}.

## Pack

- [rules.md](rules.md): how agents use this pack, and the exports it does not cover.
- [index.json](index.json): every entry's id, category, tags, state, summary and useInstead targets.
- [manifest.json](manifest.json): versions, build time, and entry counts by state.
- [graph.json](graph.json): how the components relate (useInstead, placedIn, slotAccepts, usedWith).
- [sizes.json](sizes.json): every file's size in bytes and tokens.

## Components

${entries.map((entry) => `- [${entry.id}](components/${entry.slug}.md): ${entry.summary} (${entry.status.state}; brief: components/${entry.slug}.brief.md; links: components/${entry.slug}.links.md)`).join('\n')}

## Schema

${['entry', 'manifest', 'index', 'releases', 'graph', 'sizes', 'pilot-results'].map((name) => `- [schema/${name}.schema.json](schema/${name}.schema.json)`).join('\n')}
`
}

const BRIEF_CAPS = { useWhen: 4, avoidWhen: 4, placementAdvice: 4, keyRules: 8, gaps: 5, props: 24 }

function briefRule(rule) {
  const about = rule.target ? `\`${rule.target}\`${rule.value !== undefined ? ` = \`${rule.value}\`` : ''}: ` : ''
  const instead = rule.useInstead ? ` Use instead: ${rule.useInstead}.` : ''
  return `- ${rule.strength === 'required' ? '**REQUIRED** ' : rule.strength === 'discouraged' ? 'Avoid: ' : ''}${about}${rule.text}${instead}`
}

/** The short form of an entry: about 800–1,200 tokens, no quotes, flags or full facts. */
export function briefMarkdown(entry, { packVersion }) {
  const all = [...entry.configuration, ...entry.content.rules, ...entry.accessibility, ...entry.placementAdvice]
  const required = all.filter((rule) => rule.strength === 'required')
  const key = [...required, ...entry.configuration.filter((rule) => rule.strength !== 'required'),
    ...entry.accessibility.filter((rule) => rule.strength !== 'required'),
    ...entry.content.rules.filter((rule) => rule.strength !== 'required')]
    .filter((rule, index, list) => list.indexOf(rule) === index)
    .slice(0, Math.max(BRIEF_CAPS.keyRules, required.length))
  const props = entry.facts.props.filter((fact) => !fact.name.startsWith('...'))
  const glance = props.slice(0, BRIEF_CAPS.props).map((fact) =>
    `\`${fact.name}\`${fact.required ? '*' : ''}${fact.values ? ` (${fact.values.join(' | ')})` : ''}`)
  const more = props.length > BRIEF_CAPS.props ? `, and ${props.length - BRIEF_CAPS.props} more` : ''
  const modes = entry.facts.modes.map((fact) => fact.name)
  const example = entry.examples[0]
  const section = (title, lines) => (lines.length ? [`**${title}**`, ...lines, ''] : [])
  return [
    `# ${entry.id} (brief)`,
    '',
    `> Coin agent pack ${packVersion} · ${entry.status.state} · full entry: \`components/${entry.slug}.md\` (sources, all facts, flags)`,
    '',
    entry.summary,
    '',
    ...section('Use when', entry.useWhen.slice(0, BRIEF_CAPS.useWhen).map(briefRule)),
    ...section('Avoid when', entry.avoidWhen.slice(0, BRIEF_CAPS.avoidWhen).map(briefRule)),
    ...section('Placement', entry.placementAdvice.filter((rule) => !key.includes(rule)).slice(0, BRIEF_CAPS.placementAdvice).map(briefRule)),
    ...section('Key rules', key.map(briefRule)),
    ...(example ? [`**Example:** ${example.purpose}`, '', '```tsx', example.jsx, '```', ''] : []),
    `**Props:** ${glance.join(', ')}${more}. (* required)`,
    '',
    ...(modes.length ? [`**Modes it reads:** ${modes.join(', ')}.`, ''] : []),
    ...section('Gaps (report, do not work around)', entry.facts.gaps.slice(0, BRIEF_CAPS.gaps).map((gap) => `- ${gap.text}`)),
    `Full entry: \`components/${entry.slug}.md\`. Links: \`components/${entry.slug}.links.md\`.`,
    '',
  ].join('\n')
}

/** An entry's neighbourhood in graph.json, as one-line triples. */
export function linksMarkdown(entry, graph, { packVersion, triple }) {
  const inPack = new Set(graph.nodes.filter((node) => node.inPack).map((node) => node.id))
  const out = graph.edges.filter((edge) => edge.from === entry.id)
  const incoming = graph.edges.filter((edge) => edge.to === entry.id)
  const list = (edges) => (edges.length ? edges.map((edge) => `- ${triple(edge, inPack)}`) : ['- none'])
  return [
    `# ${entry.id} (links)`,
    '',
    `> Coin agent pack ${packVersion}. Edges from graph.json, derived by code from the entries. Brief: \`components/${entry.slug}.brief.md\` · full entry: \`components/${entry.slug}.md\``,
    '',
    '## Outgoing',
    '',
    ...list(out),
    '',
    '## Incoming',
    '',
    ...list(incoming),
    '',
  ].join('\n')
}
