# Card source evidence

Package, Figma, and Storybook evidence for the Card guide (board ticket #32, Design documentation — Marcin; Storybook coverage — Biscuit, done: "Rewrote Card to the handwritten Storybook outline").

## Checked

19 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-a116616` (Biscuit's `main` at a116616, 16 October). `npm run coin:status` shows one newer upstream commit (c7d3348, 19 October, "Fix the remaining open component tickets"); `Card.tsx` is byte-identical in the installed package and in c7d3348, so the guide is not affected. Rendered with react-native-web 0.21.2 in headless Chrome.

## Sources

- Package: `src/components/Card/Card.tsx` (407 lines, plain function). Exports `Card`, `CardProps`, `CardTextProps`, `CardVariant`, `CardVariantInput`, `CARD_MEDIA_ASPECT_RATIO` (`components/index.ts:19-26`). Statics `Card.Title` and `Card.SupportText` (`Card.tsx:404-405`), not exported by name.
- Figma: [Coin Components Library · Card](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=5739-794), component set `5739:794`: `Property 1` = Default (200 × 298.65) | Slim (200 × 144); booleans `header` (Default only) and `media wrap`; slots header, media, content. Both variants set explicit modes `Gap = S`, `AppearanceBrand = Neutral` (white). Content: Support text 12/16, Title 16/18 Black (max 3 lines), Support text. Header default content: a gold logo with "SafeGold". Media: an Image over a 154:116 Ratio.
- Storybook (published `index.json`): docs `components-card--docs` (older generated page); stories `--default`, `--slim`, `--with-real-image`, `--with-header` (same as Default), `--custom-content`. Args: AppearanceBrand Neutral, Gap S, `style: { width: 200 }`, on a `#3a3a3a` frame with 20 px padding.
- Biscuit's handwritten `Card.mdx` (upstream, not the published page): "a surface with a header, optional media, and content… It does not fetch data or navigate." Default when there is a picture, slim when there is not. Title is a product or offer name; support text one fact (a price, a date, a status); header a logo or a label, not a second title. Don't use for a payment result (PaymentFeedback), a list row (ListItem), or a fixed-size shortcut (ActionTile). Pass `modes` on Card; they cascade into header, media and content.

## Contract

Props: `variant` (`default` | `slim`, also `Default` | `Slim`; default `default`), `header`, `media`, `children`, `modes`, `mediaAspectRatio` (default `CARD_MEDIA_ASPECT_RATIO` = 154 / 116), `style`, `onPress`, `disabled`, `accessibilityLabel`. No `...rest`, so no `testID`.

- `header` renders in a row padded 12 px; works on both variants. `media` renders full width at `mediaAspectRatio`, default variant only: slim ignores it.
- Slots show when the prop is not `null`/`undefined`. `header={false}` or `media={false}` render an empty box (24 px header band; a 154:116 empty media box).
- `children` sit in a column padded 12 px with `card/content/gap` between them. `Card.Title`: 16 px, weight 900, line height 20 (token 18 raised by `safeTextLineHeight`), clamps at 3 lines (`numberOfLines`, `0` = no clamp). `Card.SupportText`: 12/16/400, no clamp by default. Neither is a heading.
- `onPress` makes the root a `<button role="button">` (Pressable) with `accessibilityLabel` and `disabled`; there is no pressed, hover, focus (beyond the browser ring) or disabled look (measured). `disabled` without `onPress` does nothing.
- Modes cascade (`cloneChildrenWithModes`) into header, media and children, merged under each child's own `modes`.

## Modes and tokens

No default modes; Card doesn't read the theme provider (a Coin VStack passes its modes down). Every collection falls to its default: AppearanceBrand Primary, Semantic Intent Brand, Card Container Default, Gap S, Page type MainPage, context 8 Default.

- AppearanceBrand (fill): Primary `#fef4e5` (cream, the code default), Secondary `#f6f3ff`, Neutral `#ffffff` (Figma, Storybook), Tertiary `#ecf7ff`.
- Semantic Intent System: fill from AppearanceSystem — positive `#dbf0d9`, warning `#ffe3d6`, negative `#ffe0de`.
- Card Container Plain: transparent fill and border, radius 0, header and content padding 0.
- Gap: space between slots S 4 / M 14 / L 23 / None 0; between content lines S 4 / M 18 / L 23 / None 0.
- Page type SubPage and context 8 Section: border `#ebebed` (MainPage white). Page type JioPlus: support text `#545961`.
- Fixed: radius 12, border 0.5 (Chrome draws 1 px), title `#000000`, support text `#1a1c1f`.

## Web render

Root `div` (or `button` with `onPress`) › header wrap `div` (only with header) › media wrap `div` (only default variant with media) › content wrap `div` (always) › `div[dir=auto]` per Title/SupportText. Inline styles, no `data-testid`. Width: fills a block parent or a Coin VStack; hugs its content in a row (HStack, flex row). Height hugs content. Measured at 200 wide, Neutral: default with header (18 px logo), media and three lines 200 × 285; slim 200 × 132; children only 200 × 86. The guide's Sizing diagram (header: logo and Coin Text, 44 px; media; three one-line texts) measures 200 × 301, content padding 12, gap 4.

## Discrepancies

- With no modes the card is cream (Primary); Figma's variants and the stories are white (Neutral), and the mdx gives the fill fallback as `#ffffff`.
- Figma's heights are fixed (298.65, 144) with space-between; code hugs (285, 132 at 200). Title line height 20 in code, 18 in Figma.
- Figma's `header` and `media wrap` booleans are props in code (pass or leave out); Figma has no header boolean on Slim, code accepts a header there.
- `header={false}` / `media={false}` leave empty bands.
- No pressed look, though the CHANGELOG (0.1.19, 0.1.23) and the mdx list a Pressed state.
- Code Connect maps no props and puts the Image in children, not `media`.
- Storybook `WithHeader` duplicates `Default`; the published docs page is the older generated one.
- A raw string as `header` logs a react-native-web "Unexpected text node" error.

## Hosting

Storybook shows a 200 px Neutral card on a dark grey frame. The guide shows cards at 200 px (`style={{ width: 200 }}`) on the grey example stages, Neutral unless the example is about AppearanceBrand. Header: a Coin `HStack` with a Coin `Image` of `src/assets/jio-gold-logo.png` (18 px) and Coin `Text` "JioFinance". Media: a Coin `Image` of `src/assets/bank-hero.png` at 100% × 100%, so it fills the media slot at any `mediaAspectRatio` (an Image with its own ratio leaves a blank band). In context uses the package default (cream) cards in an HStack on the page.

## Tickets

- #343 (Component Bug, Biscuit): empty bands from `false` slots, no pressed or disabled look, cream default against Figma's white, no `testID`, raw-string header error, Storybook duplicates.

## Limits

- Not shown: Dark, Color Mode, Page type JioPlus text colour (described only), `numberOfLines` overrides, `style` beyond width and flex.
- No pressed, hover or disabled look; the title is not a heading.
