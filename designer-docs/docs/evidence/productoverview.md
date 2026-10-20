# ProductOverview source evidence

Package, Figma, and Storybook evidence for the Product Overview guide (board ticket #47, Design documentation — Marcin; Storybook coverage — Biscuit, done: "Storybook page rewritten to the handwritten outline on main e60f8bd8").

## Checked

20 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-c7d3348` (Biscuit's `main` at c7d3348). `npm run coin:status` shows one newer upstream commit, e60f8bd8, which changes only `ProductOverview.mdx`. Rendered with react-native-web 0.21.2 in headless Chrome with JioType Var loaded. The published Storybook (built 17 October) predates c7d3348's ProductLabel change, so its chip picture is 42 px, not the installed 29 px.

## Sources

- Package: `src/components/ProductOverview/ProductOverview.tsx` (245 lines). Exports `ProductOverview`, `ProductOverviewProps`, `ProductOverviewStat` (`components/index.ts:349-352`). Renders `Image` (picture), `ProductLabel` (chip, with an `Avatar` at size S) and `Text`s.
- Figma: [Coin Components Library · Product Overview](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2768-56), node `2768:56`, a single component (no variants, no slot), 343 × 396: SafeGold 5g coin picture 288 × 170 centred, Product Label (Jio dot + "Gold"), "0.5g Gold Coin", a two-line dark description, two stats (995 Purity, 3% GST). The guide's coin picture (`src/assets/gold-coin.png`) is that Figma image, downscaled with its white background made transparent.
- Storybook (published `index.json`): `components-productoverview--default`, `--no-image`, `--three-stats`, `--no-stats`, `--dark-mode`, in a centred 343 px frame. Its description is invisible (white on white). The published docs page is the older one; e60f8bd8's handwritten page isn't deployed.
- Biscuit's handwritten `ProductOverview.mdx` (e60f8bd8): "a product story: a hero image, a product chip, a name, a short description, and a row of stats. It does not buy the product." Not for a buy button on the summary (put the action outside, or PdpCcCard) or a campaign photo (ProductMerchandisingCard). It also warns that the description colour is white in every Text Appearance mode.

## Contract

All props optional: `imageSource` (none: no picture), `imageRatio` (288 / 170), `labelImageSource` (none: the chip has no picture), `label` ("Gold"; the chip always shows), `productName` ("0.5g Gold Coin"), `description` (insured-delivery sentence), `stats` (995 Purity, 3% GST; `[]` removes the row), `modes`, `style`, `children`, `disableTruncation`. No `testID`, `onPress`, `accessibilityLabel` or `...rest`.

- Picture: Coin `Image`, `width: 100%`, `aspectRatio: imageRatio`, `resizeMode: contain`, hidden from screen readers.
- Name: `accessibilityRole="header"` (an `h1` on the web), centred, never truncated. Description: centred, never truncated (no line limit).
- Stats: each `flex: 1` (equal columns), value 20/900 over label 12/400, one line each with … unless `disableTruncation` (which affects only the stats).
- `children`: inserted between the description and the stats, cloned with the card's modes. A Badge there keeps its own `alignSelf: flex-start` and sits at the left.
- No interaction or states.

## Modes and tokens

Reads `modes` only (no theme provider). Panel (`productOverview/*`): white, padding 24, gap 12, no radius or border. Name 26/900 (line 32), description 14/18.2/500, stat value 20/900 `#141414` (line 24), label 12/15.6/400.

- Description colour reads `text/appearance/medium/color`, which is white `#ffffff` in all seven Text Appearance modes: the description is white on the white panel. Figma binds `Text/Medium` `#1a1c1f`. No prop or mode reaches it.
- Text Appearance colours the name and the stat labels (Primary gold, Secondary purple `#5d00b5`, Tertiary blue, Success, Warning, Error); not the description or stat values.
- Page type JioPlus turns the chip text white. Avatar Size, Context2, Context4 change the chip picture. Context, Badge Size, context 10, Profile Card Appearance do nothing.

## Web render

Root `div` (column, centred, white, padding 24, gap 12) › picture `div` (when `imageSource`) › chip `div` (row: `div[role=img]` 29 px when `labelImageSource`, label `div[dir=auto]`) › `h1` name › description `div[dir=auto]` › children › stats `div` (row; per stat `div` with value and label `div[dir=auto]`). No `data-testid`.

At 343 with the coin and two stats: 343 × ~409 (picture 295 × 174, chip 29, name 32, description 36, stats 42). Figma: 396.

## Discrepancies

- Description renders white on white (token value), in the package, the published Storybook and every example here; Figma's is dark `#1a1c1f`.
- Figma's picture is 288 × 170 centred; the package fills the content width (295 × 174 at 343).
- Name line 32 (Figma 26) and stat value line 24 (Figma 20): 409 vs 396.
- Component default has no picture (Figma shows the coin) and no chip picture (Figma shows the Jio dot).
- The handwritten mdx says `disableTruncation` wraps the name and description and that the description is "two lines at most"; neither truncates, and only stats change.
- Figma has no `children`, `imageRatio` or `disableTruncation` and a fixed two-stat frame; the package takes any number of stats.
- Published Storybook is older than the package (42 px chip picture, a stock portrait for the metal) and shows the older docs page; ThreeStats keeps the gold description under "10g Silver Coin".

## Hosting

Storybook centres the card in a 343 px frame. The guide caps the card at 343 px (`style={{ maxWidth: 343 }}`; it stays `width: 100%`) and shows host widths with `coin-new-host`. The coin picture is Figma's own; the chip picture is the Jio Gold logo (`src/assets/jio-gold-logo.png`). The product is named "5g Gold Coin" to match the 5g coin in the picture.

## Tickets

- #355 (Component Bug, Biscuit): white description, picture width, line heights, `disableTruncation` scope and mdx claims, children alignment, older published Storybook.

## Limits

Don't show Dark, Page type, Avatar Size, Context, Context2, Context4, Badge Size, context 10 or Profile Card Appearance. Don't imply the card is pressable, that the description is readable today or limited to two lines, or that `disableTruncation` changes the name or description.
