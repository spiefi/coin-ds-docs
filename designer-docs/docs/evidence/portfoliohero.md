# PortfolioHero source evidence

Package, Figma, and Storybook evidence for the Portfolio Hero guide (board ticket #135, Design documentation — Marcin; Storybook coverage — Biscuit, done: "Storybook page rewritten to the handwritten outline on main 475ae733").

## dbe0e02 publish (28 October 2026, #346)

The docs now install mirror tag `v0.1.78-dbe0e02` (Biscuit's `main` at dbe0e02, 27 October). #346 verified 27 October on dbe0e02 (run_beaf2324); closed by Marcin; published to the docs 28 October in Penny run run_92acfa9d. Where the sections below say otherwise, this section replaces them.

- Money Value's amount is announced once with its currency (web: `role="img"`, axe-core clean on PortfolioHero; native, from the source: an accessible text element with the same label). PortfolioHero only groups its children when it has an `accessibilityLabel`.

Guide changes: Sources only (28 October, 27 October build; “phone screen readers skip the amount” replaced by “Screen readers read the amount once, with its currency”).

## Checked

26 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-c8526ae` (Biscuit's `main` at c8526ae); `npm run coin:status` reports the mirror up to date with upstream. Rendered the installed package in the docs site's Vite setup (react-native-web 0.21.2) in headless Chrome.

## Sources

- Package: `src/components/PortfolioHero/PortfolioHero.tsx` (83 lines). Exports `PortfolioHero`, `PortfolioHeroProps` (`components/index.ts:309`). Renders `ProductLabel` (avatar + label) and `MoneyValue`.
- Figma: [Coin Components Library · Portfolio Hero](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2705-14040), node `2705:14040`, one component (no variants), 200 × 159, hug × hug, padding 8 (`portfolioHero/padding`), gap 16 (`portfolioHero/gap`), centred, explicit `Context3 = Balance`. Booleans `Top Slot` (on; a Stack slot holding Product Label with a 29 px Jio avatar), `Bottom Slot` (on; a Stack slot with a Badge v2 "+₹2,722.45 (+22.5%)" with an `ic_card` icon and a Text "Worth 1.23g Gold", Text Sizes Small), `Action Slot` (off; a 42 px toggle Icon Button beside the amount, Emphasis Low, Neutral).
- Storybook (published `index.json`): `components-portfoliohero--default`, `--without-slot`, `--dark-mode`, `--custom-slot-content`. No story passes an `imageSource`, but the published Default story renders a 29 px avatar with the Avatar's bundled stock photo of a stranger beside "Gold" (headless Chrome, 26 October), presumably from the empty `imageSource` text control; its Badge has no `ic_card` icon.
- Biscuit's handwritten `PortfolioHero.mdx`: "a holding total: a product chip, a money value, and an optional note under the amount. It is centered." Use for "the value of one holding at the top of its page"; not a left-aligned total (Balance) or a product explanation (ProductOverview). Do: "The holding name and its value"; Don't: "A sentence in the amount". "Anything in `children` is a caption, not another total." "There is no press handler on the hero."

## Contract

- `label` (default 'Gold'): ProductLabel text, 16/21 Bold 700 `#000000`.
- `imageSource` (no default): the avatar before the label. Without it there is no avatar and no placeholder (`ProductLabel.tsx:47`).
- `value` (default '12,000.11', string only) and `currency` (default '₹'; ISO codes map, INR → ₹): Money Value, 36 px Black 900 `#0f0d0a`, currency-to-value gap 0. Never wraps or shrinks.
- `children`: rendered only when truthy, in a centred column with `slot/gap` (8) between items; `cloneChildrenWithModes` passes the hero's modes, the child's own keys win.
- `modes`: merged over defaults `{ Context3: 'Balance & Cards', 'Avatar Size': 'S', 'Text Sizes': 'Small' }` (`PortfolioHero.tsx:16-20, 52`).
  - `Avatar Size` (with an image): L 42, M 36, S 29 (default), XS 14 (XS is not in Figma's mode list).
  - `Slot gap`: XS 2, S 8 (default), M 16, L 24, XL 32 between slot items.
  - `Text Sizes Small` (default) makes a Text child 12/16 (its own default is 14).
  - `Context3` other than Balance & Cards shrinks the amount (Default 14 px Medium); not a designer choice.
  - Badge/Text modes in the slot (Semantic Intent, AppearanceSystem, AppearanceBrand, Emphasis) change only those children.
  - `portfolioHero/gap` 16 and `portfolioHero/padding` 8 have no mode dependency.
- `style` (ViewStyle) last on the root. No `testID`, `onPress`, accessibility props, or top-area slot.

## Web render

Root `div` (column, centred, padding 8, gap 16) › [`div` label row (gap 8) › `div[role=img]` avatar 29 px, `div[dir=auto]` label] · `div` amount (Money Value; `div[tabindex=-1]` › currency `div[dir=auto]`, value) · `div` slot (column, centred, gap 8).

- Amount line renders 44 tall (token 36, raised by `safeTextLineHeight`); label row 29 with an avatar, 21 without.
- Default props, no image, no slot: 97 tall. With the Jio avatar and Figma's badge (with `ic_card`) and note: about 168 tall and 199 wide (amount 183 + 16). Figma: 159.
- A long amount (`12,34,56,789.00`) is wider than a 200 px host and overflows it; nothing wraps.
- Badge `leading` Icon needs the Badge's modes with `Context4: 'Badge'` to be 14 px (18 px otherwise).

## Discrepancies

- Figma's Action Slot (icon button beside the amount) and its Top Slot / Bottom Slot switches have no package equivalent; the chip is fixed (in Figma the top area is a slot).
- Figma shows the 29 px Jio avatar by default; the package shows none until `imageSource` is set. The published Default story says it matches Figma but shows a stock photo of a stranger as the Gold avatar, and its Badge has no `ic_card` icon.
- The hero is taller than Figma (amount on a 44 px line, not 36).
- Phone screen readers don't get the amount: Money Value hides both texts and sets no label (already #346); PortfolioHero has no prop to label it. The MDX says the amount is visible text.
- Unused tokens: `portfolioHero/slotWrap/gap`, `portfolioHero/text/*`.
- Mode names differ between the Figma library and the package token JSON (Figma `Context3 = Balance`, package `Balance & Cards`; Figma Avatar Size L/M/S, package adds XS).

## Hosting

Examples pass the docs' Jio logo (`src/assets/jio-gold-logo.png`) as `imageSource`, as Figma's chip shows, and Figma's slot: a Badge with an `ic_card` leading Icon (Badge and Icon both on `{ ...LIGHT, Context4: 'Badge' }`) and a Text. Each hero sits in a Coin `VStack` 300 px column (`maxWidth: 100%`), centred. In context is a holding page in a full ScreenFrame.

## Tickets

- #346 (Component Bug, existing): Money Value amount not announced on phone screen readers.
- #403 (Component Bug, Biscuit, filed 26 October 2026): Action Slot / Top Slot missing, Default story without avatar and badge icon, height.

## Limits

Don't show or mention Color Mode, dark mode, Page type JioPlus, or Context3. Don't imply the hero presses, has an action button, replaces the chip, left-aligns, wraps the amount, or that screen readers announce the amount.
