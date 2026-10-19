# CardProviderInfo source evidence

Package, Figma, and Storybook evidence for the Card Provider Info guide (board ticket #134, Design documentation — Marcin; Storybook coverage — Biscuit, done: "Rewrote CardProviderInfo to the handwritten outline. On GitHub main 7b7c79f0").

## Checked

19 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-c7d3348` (Biscuit's `main` at c7d3348), which fixes #287 in `CardProviderInfo.tsx` and `ProductLabel.tsx`. Re-tested in headless Chrome (react-native-web 0.21.2) at 1280 and 390 px on 19 October (Penny run run_43afbe70), and measured again in the guide while publishing.

First checked 17 October 2026 against mirror tag `v0.1.78-a116616` in the docs' own Vite + react-native-web 0.21.2 build.

## Sources

- Package: `src/components/CardProviderInfo/CardProviderInfo.tsx` (126 lines); export `CardProviderInfo`, `CardProviderInfoProps` (`components/index.ts:225`). Renders `ProductLabel` (→ `Avatar` style Image + label) and its children two per row. `StatItem` (`components/index.ts:368`) is the usual child.
- Figma: [Coin Components Library · Card/Provider Info](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2916-9155), node `2916:9155`: one component, 342 × 185, no properties of its own. A nested `Product Label` (avatar boolean, label "Gold", a 29 px Jio Gold logo) and four `Stat item`s in a 2 × 2 grid (gap 8). Fill and border `#fef4e5`, radius 16, padding 20, gap 20.
- Storybook (published `index.json`): docs `components-cardproviderinfo--docs` (older generated page); stories `--default` (Gold, four facts, Primary) and `--two-stats` (Silver, two facts). No frame: the card fills the canvas. Neither passes `imageSource`; the published Storybook (older build, not rebuilt on 19 October) shows the old placeholder portrait photo for it. Storybook injects `onPress`, so both render as a button.
- Biscuit's handwritten `CardProviderInfo.mdx` (upstream, not the published page): a provider header plus facts for a seller or vault on a product page, two to six facts; not a person (ProfileCard) or bank account. Children sit two per row. Label is the provider name, stat labels are noun phrases, values are the figure. Don't put buttons inside a pressable card. It says omitting `imageSource` shows no portrait; since #287 the code agrees.

## Contract

Props (`:8-50`): `label` ('Gold'), `imageSource` (image or URL string), `showAvatar` (since #287: defaults to on only when `imageSource` is set; `false` hides an avatar that has an image; `true` without an image shows a neutral 29 px circle, hard-coded `#f3f1ec`, not a token), `children` (facts; cloned with the card's modes; two per row, each in a `flex: 1` cell), `modes`, `style`, `onPress`, `disabled`, `accessibilityLabel`. No `testID`, no `...rest`.

- The header is always ProductLabel. Since #287 it shows the Avatar only with `imageSource` (or `showAvatar`); without `imageSource` the header is the label alone, with no image anywhere in the card (191 px tall with four facts). Before, the Avatar always rendered and fell back to a bundled stock portrait.
- Three facts: the third sits alone in its row, in the first column's place (Top-aligned StatItem), leaving the right side empty.
- `onPress` makes the root a Pressable `role="button"` named `accessibilityLabel ?? label`; no pressed, hover or disabled look; `disabled` only stops presses.
- Width: none; the host owns it. Facts split the width in half.

## Modes and tokens

`Card/ProviderInfo / Output` (one mode): padding 20, gap 20, grid gap 8, radius 16, border 1; background and border alias AppearanceBrand → Color Mode.

- AppearanceBrand (Primary by default): Primary cream `#fef4e5` (border the same), Secondary lilac `#f6f3ff`, Neutral and Tertiary white with a `#f5f5f5` border (identical).
- Avatar Size: S 29 px (default since #287: ProductLabel adds `Avatar Size: S` unless modes set one; Figma's size), L 42, M 36, XS 14. Context4 also changes the avatar size. ProductLabel's new defaults also apply in PortfolioHero and ProductOverview, which the docs don't cover.
- ProductLabel label: 16/700/21, black. StatItem: label 12/500/16 `#1a1c1f`, value 26/900 (line 32 in code) `#0d0d0f`; no mode changes them.
- Badge Size, context 10, Profile Card Appearance: listed for the component, change nothing.

## Web render

Root `div` (padding 20, gap 20, 1 px border, radius 16) › ProductLabel `div` (row, gap 8) › `div[role=img]` (Avatar) + label `div[dir=auto]`; grid `div` › row `div`s › cell `div` › StatItem `div` › label `div[dir=auto]` + value `div[dir=auto]`. Measured in the guide on c7d3348: 342 × 199 with four facts and the 29 px avatar (316 × 215 at 390 px); 212 with Avatar Size L (Figma 185: its stat rows are 44, code's 50).

## Discrepancies

- Avatar (fixed by #287): 29 px by default, as in Figma (measured 29 × 29; Avatar Size L 42). `showAvatar` matches Figma's avatar toggle. Omitting `imageSource` shows no portrait, as the mdx says.
- Figma and Code Connect put ProductLabel in as a child; code builds the header from `label` and `imageSource` (a child ProductLabel would land in the grid).
- Fact rows 50 px in code vs 44 in Figma (value line height raised to 32).
- No pressed or disabled look with `onPress`; CHANGELOG contradicts itself.
- Published Storybook docs page is the older generated one.

## Hosting

Storybook lets the card fill the canvas. The guide puts each card straight on the grey example stages with `style={{ width: '100%', maxWidth: 342 }}` (Figma's width). `imageSource` is `src/assets/jio-gold-logo.png`: the 128 × 128 Jio Gold logo exported from the Figma component's own avatar fill (node 2916:9130), because without it the card shows the name alone (before #287, a stock portrait). The Configuration section shows Avatar Size L (the default is now Figma's S), and the playground's Avatar Size starts on S.

## Tickets

- #287 (Component Bug, Biscuit): stock portrait without `imageSource`, avatar couldn't be hidden, avatar 42 px against Figma's 29. Fixed on c7d3348, verified 19 October, published to the docs 19 October.

## Limits

- Not shown: Dark, Context2, Context4, Page type, style props, `onPress` with disabled.
- No pressed or disabled look.
