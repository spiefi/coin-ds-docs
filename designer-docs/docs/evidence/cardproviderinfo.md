# CardProviderInfo source evidence

Package, Figma, and Storybook evidence for the Card Provider Info guide (board ticket #134, Design documentation — Marcin; Storybook coverage — Biscuit, done: "Rewrote CardProviderInfo to the handwritten outline. On GitHub main 7b7c79f0").

## Checked

17 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-a116616` (Biscuit's `main` at a116616, 16 October); `npm run coin:status` reports it up to date. `CardProviderInfo.tsx`, `ProductLabel`, `Avatar` and `StatItem` are identical to Biscuit's `main`. Rendered in the docs' own Vite + react-native-web 0.21.2 build in headless Chrome.

## Sources

- Package: `src/components/CardProviderInfo/CardProviderInfo.tsx` (115 lines); export `CardProviderInfo`, `CardProviderInfoProps` (`components/index.ts:225`). Renders `ProductLabel` (→ `Avatar` style Image + label) and its children two per row. `StatItem` (`components/index.ts:368`) is the usual child.
- Figma: [Coin Components Library · Card/Provider Info](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2916-9155), node `2916:9155`: one component, 342 × 185, no properties of its own. A nested `Product Label` (avatar boolean, label "Gold", a 29 px Jio Gold logo) and four `Stat item`s in a 2 × 2 grid (gap 8). Fill and border `#fef4e5`, radius 16, padding 20, gap 20.
- Storybook (published `index.json`): docs `components-cardproviderinfo--docs` (older generated page); stories `--default` (Gold, four facts, Primary) and `--two-stats` (Silver, two facts). No frame: the card fills the canvas. Neither passes `imageSource`, so both show the package's placeholder portrait photo. Storybook injects `onPress`, so both render as a button.
- Biscuit's handwritten `CardProviderInfo.mdx` (upstream, not the published page): a provider header plus facts for a seller or vault on a product page, two to six facts; not a person (ProfileCard) or bank account. Children sit two per row. Label is the provider name, stat labels are noun phrases, values are the figure. Don't put buttons inside a pressable card. It says omitting `imageSource` shows no portrait; the code shows a placeholder photo.

## Contract

Props (`:8-46`): `label` ('Gold'), `imageSource` (image or URL string), `children` (facts; cloned with the card's modes; two per row, each in a `flex: 1` cell), `modes`, `style`, `onPress`, `disabled`, `accessibilityLabel`. No `testID`, no `...rest`.

- The header is always ProductLabel with an Avatar: it can't be hidden. Without `imageSource` the Avatar shows a bundled stock portrait.
- Three facts: the third sits alone in its row, in the first column's place (Top-aligned StatItem), leaving the right side empty.
- `onPress` makes the root a Pressable `role="button"` named `accessibilityLabel ?? label`; no pressed, hover or disabled look; `disabled` only stops presses.
- Width: none; the host owns it. Facts split the width in half.

## Modes and tokens

`Card/ProviderInfo / Output` (one mode): padding 20, gap 20, grid gap 8, radius 16, border 1; background and border alias AppearanceBrand → Color Mode.

- AppearanceBrand (Primary by default): Primary cream `#fef4e5` (border the same), Secondary lilac `#f6f3ff`, Neutral and Tertiary white with a `#f5f5f5` border (identical).
- Avatar Size: L 42 px (default), M 36, S 29 (Figma), XS 14. Context4 also changes the avatar size.
- ProductLabel label: 16/700/21, black. StatItem: label 12/500/16 `#1a1c1f`, value 26/900 (line 32 in code) `#0d0d0f`; no mode changes them.
- Badge Size, context 10, Profile Card Appearance: listed for the component, change nothing.

## Web render

Root `div` (padding 20, gap 20, 1 px border, radius 16) › ProductLabel `div` (row, gap 8) › `div[role=img]` (Avatar) + label `div[dir=auto]`; grid `div` › row `div`s › cell `div` › StatItem `div` › label `div[dir=auto]` + value `div[dir=auto]`. Measured at 342 px: 212 tall with four facts and the 42 px avatar, 199 with Avatar Size S (Figma 185: its stat rows are 44, code's 50).

## Discrepancies

- Avatar: Figma 29 px (Avatar Size S); code defaults to 42. Figma's Product Label has an avatar toggle; code can't hide the avatar. Omitting `imageSource` shows a stock portrait, not "no portrait" as the mdx says. Reported.
- Figma and Code Connect put ProductLabel in as a child; code builds the header from `label` and `imageSource` (a child ProductLabel would land in the grid).
- Fact rows 50 px in code vs 44 in Figma (value line height raised to 32).
- No pressed or disabled look with `onPress`; CHANGELOG contradicts itself.
- Published Storybook docs page is the older generated one.

## Hosting

Storybook lets the card fill the canvas. The guide puts each card straight on the grey example stages with `style={{ width: '100%', maxWidth: 342 }}` (Figma's width). `imageSource` is `src/assets/jio-gold-logo.png`: the 128 × 128 Jio Gold logo exported from the Figma component's own avatar fill (node 2916:9130), because the package's fallback is a stock portrait.

## Tickets

- #287 (Component Bug, Biscuit): stock portrait without `imageSource`, avatar can't be hidden, avatar 42 px against Figma's 29.

## Limits

- Not shown: Dark, Context2, Context4, Page type, style props, `onPress` with disabled.
- No pressed or disabled look.
