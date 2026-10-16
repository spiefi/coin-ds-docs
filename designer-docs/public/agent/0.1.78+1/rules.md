# Coin agent pack: rules for agents (pilot)

Pack 0.1.78+1 · jfs-components 0.1.78 · schema version 1.

**Pilot.** This pack covers 6 components (Button, TextInput, Badge, Accordion, Stack, BenefitCard).
It is generated from the Coin designer guides and the installed package, and is
being tested. Other jfs-components exports exist but have no entry here: see
`llms.txt`.

## Rules

1. **Match the version.** Use this pack only when its jfs-components version
   (`0.1.78`, in `manifest.json` as `packageVersion`) matches the
   installed package (`node_modules/jfs-components/package.json`). If it does
   not, find the matching release in `/agent/index.json`, or do not use the
   pack. Built from github:spiefi/coin-components#v0.1.78-c1fa197 (mirror commit edc36d0c813f6bf906900dfea3aca927e4916326; built from MrBiscuit/react-native-storybook-boilerplate-master@c1fa197, 2026-10-12).
2. **Use only what the facts list.** Use only components, props, values and
   slots that are in an entry's `facts` (or, for components without an entry,
   in the package's exports and types). Never invent one.
3. **Follow strength.** Treat `required` rules as constraints. Follow
   `recommended` rules unless the request asks otherwise, and say so when you
   depart from one. Avoid `discouraged` configurations.
4. **Follow avoidWhen.** When an `avoidWhen` rule matches the request, follow
   it, and use its `useInstead` component when it names one. A `useInstead`
   outside this pack has no entry here; read its types.
5. **Read facts by source.** `types`: the API accepts it, but nothing has
   proven how it behaves. `evidence`: checked behaviour, as of `checkedOn`.
   `unknown`: nothing establishes it; do not promise it. A `gap`: behaviour
   that was checked and found missing; report the gap instead of working
   around it.
6. **Read entries by state.** Treat `documented` entries as guidance and
   `undocumented` ones as hints. Do not rely on a flagged rule: each flag in
   `status.flags` points (`field`, a JSON pointer) at the item it concerns; a
   `flagged` entry is still guidance apart from those items. A flag on the
   whole entry (`field` is empty) asks for review of the entry as a whole.
7. **Keep copy within the content rules** (`content.rules`, with
   `content.good` and `content.bad` as examples).
8. **Pass modes to slot children.** Pass a component's `modes` to the Coin
   children in its slots.
9. **Prefer what exists.** Use an existing component when it fits. Compose
   supported Coin components for layouts and patterns. Report a gap when the
   request needs unsupported API, or a replacement for a component Coin lacks.

## Reading an entry

Each `components/<slug>.json` (Markdown alongside) has:

- `useWhen`, `avoidWhen`, `placementAdvice`, `configuration`,
  `content.rules`, `accessibility`: rules, each with `strength` and `from`.
  `from` is the guide section and the exact sentence the rule was read from,
  or a JSON pointer to the fact it rests on. `target` and `value` name the
  prop or mode a rule is about.
- `anatomy`, `states`, `doDont`: the guide's parts, states and pairs.
- `allowedChildren`: what each slot accepts, from the types.
- `examples`: public-API JSX that type-checks against this package version.
- `facts`: `props`, `modes`, `slots`, `events` and `gaps`, each with a `source`.
- `status`: `state`, `flags`, the guide commit and the package version.

`category` is for discovery only, never a limit on composition.
