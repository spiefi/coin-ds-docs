# PdpCcCard source evidence

Package, Figma, and Storybook evidence for the PDP Card guide (board ticket #5, Design documentation — Marcin; Storybook coverage — Biscuit, done: "Storybook page rewritten to the handwritten outline on main e60f8bd8").

## dbe0e02 install (28 October 2026, not this guide's tickets)

The docs now install mirror tag `v0.1.78-dbe0e02` (Biscuit's `main` at dbe0e02) to publish the Component Fix batch #343–#406 (Penny run run_92acfa9d). Biscuit's ace46ca and dbe0e02 also changed PdpCcCard for #361, which isn't in that release, so this guide's copy wasn't re-checked and waits for #361's own publish. Only the anatomy selectors changed, so the page passes on this build: the heading now sits in a wrapper (and has 8/12 px padding), so HEADING is `${R} [role="heading"]`. `npm run verify` passes.

## Checked

21 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-c7d3348` (Biscuit's `main` at c7d3348). `npm run coin:status` shows one newer upstream commit, e60f8bd8, which changes only Storybook MDX pages (`PdpCcCard.mdx` among them). The published Storybook (built 17 October; no PdpCcCard file changed since) was measured in headless Chrome with JioType Var loaded.

## Sources

- Package: `src/components/PdpCcCard/PdpCcCard.tsx` (340 lines). Exports `PdpCcCard`, `PdpCcCardProps`, `PdpCcCardMetric` (`components/index.ts:307`). Renders Coin `Image`, `Title`, `MetricData`, `Divider`, `Button`, `Icon`.
- Figma: [Coin Components Library · PDP cc card](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=5352-935), node `5352:935`, one component (no variants, no component properties), 344 × 310: Image 100 × 60 in a slot, Title (26 px), two MetricData with a 1 × 46 Divider between, Button 99 × 32 with a 16 px leading icon. Optional parts are booleans on nested instances (metric caption and icon, Title subtitle, Button start slot).
- Storybook (published `index.json`): `components-pdpcccard--default`, `--single-metric`, `--metrics-without-icons`, `--button-hidden`, `--pressable-card`, `--title-truncation`. Host: centred on `#f0eee9`, padding 20; image from Unsplash. The jfs-controls addon (`argTypesRegex '^on[A-Z].*'`) injects `onPress`, so every story but Title truncation renders the card as a button with the Add to cart button inside it. The published docs page is the older generated one.
- Biscuit's handwritten `PdpCcCard.mdx` (e60f8bd8): "a centered product: image, title, a row of metrics, and one action. It is the card on a product page, not a list of benefits." Use for "a product page summary: picture, name, two or three facts, one action"; not for a benefit list and a joining fee (CcCard) or a long description under a hero photo (ProductOverview). Do "Two or three short facts"; Don't "A paragraph in the title". Content: title is the product, subtitle one qualifier, metric title the fact name, button a verb.

## Contract

All props optional; closed list (no `testID`, no `...rest`).

- `imageSource` (no default; nothing ships: an empty `imageWidth × imageHeight` box, 100 × 60 by default, keeps its space), `imageWidth`, `imageHeight`; radius `image/radius` 8 (Radius mode), cover, hidden from screen readers. `media` replaces the image with any node (given the card's modes).
- `title` ('Title'), `subtitle` ('Subtitle'): a centred Coin `Title` (26/32 900; subtitle 14/18 500). `undefined` brings the placeholder back; there is no way to hide either. Title: one line with an ellipsis; `numberOfLines` clamps it (title only); `disableTruncation` wraps it fully and the card grows; `singleLine` keeps one line and lets it run past both card edges on web. The subtitle always wraps.
- `metrics: { title?, value?, caption?, icon? }[]` (two sample metrics by default): one `MetricData` per entry, equal widths (`flex: 1`), each announced as "title, value, caption". A vertical `Divider` goes between neighbours (`height: '70%'`). `metrics={[]}` removes the row. No maximum.
- Action: `buttonLabel` ('button'), `buttonIcon` (`'ic_add_circle'`; `null` hides it), `onButtonPress`, `showButton` (true; false removes 44 px). `button` replaces the default Button and gets `{ AppearanceBrand: 'Secondary', Emphasis: 'Medium', 'Button / Size': 'S', ...modes }`.
- `onPress` makes the whole card a `Pressable` (role button, name `accessibilityLabel ?? title`, opacity 0.92 when pressed); with the default Button that nests a button in a button. No `disabled`.
- `width` (344; number or percentage), `style`, `modes`, `accessibilityLabel`.
- Panel: white, padding 20 / 16, gap 12, everything centred; no border, no radius, no shadow.

## Modes and tokens

The card's own tokens (`PDPcccard/*`: white, padding, gap) don't change with any mode. Modes reach the children:

- AppearanceBrand: the button (Primary gold, Neutral grey, Tertiary blue) and the metric icons (Primary `#ad8444`; MetricData uses Secondary purple unless the card's modes say otherwise).
- Emphasis: the button (High solid `#5d00b5` with white label; Low text only; Medium light purple is the card's default).
- Button / Size: the button (M 42 px) and the leading icon size (the card reads `button/iconSize` with your modes: 18 by default, 16 at S).
- Radius: the image corners (None 0, M 16, L 32).
- Semantic Intent System turns the button and icons green (with AppearanceSystem warning/negative: orange/red): not a product-card choice.
- Context, Context4, Icon Size, context 10, context7 change inner tokens of the button, icons or Title; not designer choices on this card. Badge Size, Page type, Profile Card Appearance, AppearanceSystem alone, Context2: no effect.

## Web render

Root `div` (pressable: `button`) › media slot `div` › image box `div` (radius 8) › background `div` + hidden `img` · `h1[role=heading]` › title `div[dir=auto]`, subtitle `div[dir=auto]` · metrics row `div` › MetricData `div[aria-label]` › title, value row (icon `svg` + value), caption · Divider `div[role=presentation]` (1 × 0) · Button `button` › icon + label. No `data-testid`.

- 344 × 316 with two metrics and a button (Figma 310: title block 66 vs 60, metrics 82 vs 80, from line heights raised to 1.2 × font size); 272 without the button. Content width 312; metric cells 155.5 × 82; button 138.6 × 32 ("Add to cart").
- The Divider between metrics is 1 × 0 on web (the percentage height has nothing to resolve against), so no line shows. Figma: 1 × 46.
- The leading button icon renders 18 × 18 (Figma 16).

## Discrepancies

- No visible divider between metrics on web.
- Button icon 18 vs Figma 16 (reads the icon size with the card's modes, not the button's size S).
- Height 316 vs 310.
- No default image: an empty box. MDX says "The empty default image".
- `title`/`subtitle` can't be removed; `undefined` shows "Title"/"Subtitle".
- `numberOfLines={2}` ellipsis renders partly cut ("Gold Bond .."). The Title truncation story says `disableTruncation` overflows the card; on web it wraps and the card grows. Only `singleLine` overflows (an 828 px title box past both edges).
- Published stories render a pressable card with a nested button (auto-injected `onPress`); the published docs page is the older one.

## Hosting

Storybook centres the card on a light warm grey. The guide keeps the kit's light stage and puts each card (344 px, Figma's width) in `FitWidth`, which scales it on narrow screens. Picture: the docs' own `src/assets/gold-coin.png` (a 5 g coin, 375 × 400, transparent) at `imageWidth={60} imageHeight={60}`; the package ships none. Icons from the package registry: `ic_scale`, `ic_rupee_coin`, `ic_star`, `ic_protection_locked`.

## Tickets

- #361 (Component Bug, Biscuit): invisible divider, button icon size, height, empty image box and placeholder text, `disableTruncation`/`singleLine` behaviour, pressable Storybook stories.

## Limits

Don't show or mention Color Mode or dark mode. Don't show Semantic Intent, Context modes, `disabled`, or a pressable card with its button. Don't imply a divider line shows between metrics, that the title or subtitle can be hidden, or that a default image exists.
