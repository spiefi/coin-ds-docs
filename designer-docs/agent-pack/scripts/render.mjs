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
      ? ['Do not rely on a flagged item. A flag on `` (the whole entry) means the entry as a whole needs review.', '',
        ...status.flags.map((flag) => `- ${code(flag.field || '(whole entry)')} · ${flag.by}: ${flag.reason}`)]
      : ['_None._']),
    '',
  ]
  return lines.join('\n')
}

export function rulesMarkdown({ packVersion, packageVersion, packageSource, entries }) {
  return `# Coin agent pack: rules for agents (pilot)

Pack ${packVersion} · jfs-components ${packageVersion} · schema version 1.

**Pilot.** This pack covers ${entries.length} components (${entries.map((entry) => entry.id).join(', ')}).
It is generated from the Coin designer guides and the installed package, and is
being tested. Other jfs-components exports exist but have no entry here: see
\`llms.txt\`.

## Rules

1. **Match the version.** Use this pack only when its jfs-components version
   (\`${packageVersion}\`, in \`manifest.json\` as \`packageVersion\`) matches the
   installed package (\`node_modules/jfs-components/package.json\`). If it does
   not, find the matching release in \`/agent/index.json\`, or do not use the
   pack. Built from ${packageSource}.
2. **Use only what the facts list.** Use only components, props, values and
   slots that are in an entry's \`facts\` (or, for components without an entry,
   in the package's exports and types). Never invent one.
3. **Follow strength.** Treat \`required\` rules as constraints. Follow
   \`recommended\` rules unless the request asks otherwise, and say so when you
   depart from one. Avoid \`discouraged\` configurations.
4. **Follow avoidWhen.** When an \`avoidWhen\` rule matches the request, follow
   it, and use its \`useInstead\` component when it names one. A \`useInstead\`
   outside this pack has no entry here; read its types.
5. **Read facts by source.** \`types\`: the API accepts it, but nothing has
   proven how it behaves. \`evidence\`: checked behaviour, as of \`checkedOn\`.
   \`unknown\`: nothing establishes it; do not promise it. A \`gap\`: behaviour
   that was checked and found missing; report the gap instead of working
   around it.
6. **Read entries by state.** Treat \`documented\` entries as guidance and
   \`undocumented\` ones as hints. Do not rely on a flagged rule: each flag in
   \`status.flags\` points (\`field\`, a JSON pointer) at the item it concerns; a
   \`flagged\` entry is still guidance apart from those items. A flag on the
   whole entry (\`field\` is empty) asks for review of the entry as a whole.
7. **Keep copy within the content rules** (\`content.rules\`, with
   \`content.good\` and \`content.bad\` as examples).
8. **Pass modes to slot children.** Pass a component's \`modes\` to the Coin
   children in its slots.
9. **Prefer what exists.** Use an existing component when it fits. Compose
   supported Coin components for layouts and patterns. Report a gap when the
   request needs unsupported API, or a replacement for a component Coin lacks.

## Reading an entry

Each \`components/<slug>.json\` (Markdown alongside) has:

- \`useWhen\`, \`avoidWhen\`, \`placementAdvice\`, \`configuration\`,
  \`content.rules\`, \`accessibility\`: rules, each with \`strength\` and \`from\`.
  \`from\` is the guide section and the exact sentence the rule was read from,
  or a JSON pointer to the fact it rests on. \`target\` and \`value\` name the
  prop or mode a rule is about.
- \`anatomy\`, \`states\`, \`doDont\`: the guide's parts, states and pairs.
- \`allowedChildren\`: what each slot accepts, from the types.
- \`examples\`: public-API JSX that type-checks against this package version.
- \`facts\`: \`props\`, \`modes\`, \`slots\`, \`events\` and \`gaps\`, each with a \`source\`.
- \`status\`: \`state\`, \`flags\`, the guide commit and the package version.

\`category\` is for discovery only, never a limit on composition.
`
}

export function llmsText({ packVersion, packageVersion, entries, otherComponents }) {
  return `# Coin agent pack ${packVersion} (pilot)

> Machine-readable guidance for Coin, the Jio Finance design system's React Native components (jfs-components ${packageVersion}). Generated from the Coin designer guides and the installed package. Every rule cites the guide sentence it came from; every fact has a source.

Read rules.md first. Use this pack only with jfs-components ${packageVersion}.

## Pack

- [rules.md](rules.md): how agents use this pack.
- [manifest.json](manifest.json): versions, build time, and entry counts by state.
- [index.json](index.json): every entry's id, category, tags, state, summary and useInstead targets.

## Components

${entries.map((entry) => `- [${entry.id}](components/${entry.slug}.md): ${entry.summary} (${entry.status.state}; JSON: components/${entry.slug}.json)`).join('\n')}

## Not in this pilot

These jfs-components component exports have no entry in this pack. They exist in the package; this pack gives no guidance for them, so treat them as undocumented and work from their types: ${otherComponents.join(', ')}.

## Schema

- [schema/entry.schema.json](schema/entry.schema.json), [schema/manifest.schema.json](schema/manifest.schema.json), [schema/index.schema.json](schema/index.schema.json), [schema/releases.schema.json](schema/releases.schema.json), [schema/pilot-results.schema.json](schema/pilot-results.schema.json)
`
}
