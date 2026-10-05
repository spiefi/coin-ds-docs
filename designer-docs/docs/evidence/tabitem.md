# Tab Item source evidence

Package, Figma, Storybook, and browser evidence for the Tab Item guide (board ticket #153, Design documentation — Marcin; Storybook coverage — Biscuit, done). Shared Tabs facts are in `tabs.md`.

## Check

Checked 5 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-3795b4c` (Biscuit's `main` at 3795b4c). `TabItem.tsx` is identical to upstream.

- Figma: [Coin Subcomponents · Tab item](https://www.figma.com/design/dSlK8ueQ7wlbyUSZd4f8QO/Coin-Subcomponents?node-id=66-913), node `66:913`. A component set with one property, `State` = `Idle` | `Active`, each 76 × 34. Layers: a 14/17 px label (56 × 17), a nested 18 × 18 Counter Badge ("99") 2 px after it (`tabItem/gap`), and in Active a 76 × 2 Indicator spanning label and badge. Subcomponents are not a library designers place from; Tab items reach designs through the Tabs slot.
- Storybook (published `index.json`, built before the 0.1.78 release commit): no Tab Item stories. The docs page is `tabs-tabitem--docs` (old content: a Color Mode note and a token list). Upstream's new stories (`components-tabitem--default`, `--active`, `--in-tabs`, `--dark`) and `components-tabitem--docs` are not published. The handwritten upstream `TabItem.mdx` says to always compose it inside Tabs, keep labels to one or two words in sentence case, use `accessibilityLabel` when the label is an abbreviation (AY24 → "Assessment year 2024"), and that it has no icon, disabled, href, or children.
- Package: public `TabItem` accepts `label` (default "Tab item"), `active` (default `false`), `onPress`, `modes`, `style`, `labelStyle`, and `accessibilityLabel`. No `testID`, `disabled`, badge, icon, or rest props. It never selects itself: the screen sets `active`. Inside Tabs it receives the row's `modes` (its own win) and `flex: 1` unless the row scrolls.
- Tokens (Light): idle label `#303338`, active label `#000000`, indicator `#cea15a`, 2 px, radius 99; padding 8 px top and bottom; label JioType 14/17, weight 400. `tabItem/gap` (2 px, label to badge) is unused. Values match Figma.

## Browser measurements (Chrome, react-native-web 0.21.2)

- 33 px tall. Width comes from Tabs: an equal share of the row, or the label's width when the row scrolls (Overview 62.4 px). In a 240 px row, two tabs are 112 px each.
- Active: black label and a 2 px gold underline across the full tab width. Idle: grey label, no underline. Pressed: 70% opacity. No hover or focus style; keyboard focus shows the browser ring.
- A lone TabItem outside Tabs stretches to its container's width and is a `role="tab"` with no tablist around it.
- DOM: `role="tab"`, `aria-label` = `accessibilityLabel ?? label`, `tabindex=0`; no `aria-selected`.

## Coin gaps

- #194 (Component Fix, To do, Component Bug; Mr. Biscuit, Anagha Ghotkar): selected state not announced on the web, Space doesn't select, no arrow keys, no `testID`, Figma counter badge missing in code, no TabItem stories in the published Storybook.
- #197 (Components, To do; Marcin): active label stays black in Dark mode. The guide shows Light only.
