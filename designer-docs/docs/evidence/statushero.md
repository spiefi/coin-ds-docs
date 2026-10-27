# StatusHero source evidence

Package, Figma, and Storybook evidence for the Status Hero guide (board ticket #88, Design documentation — Marcin; Storybook coverage — Biscuit, done: "Storybook page rewritten to the handwritten outline on main 475ae733").

## dbe0e02 publish (28 October 2026, #346)

The docs now install mirror tag `v0.1.78-dbe0e02` (Biscuit's `main` at dbe0e02, 27 October). #346 verified 27 October on dbe0e02 (run_beaf2324); closed by Marcin; published to the docs 28 October in Penny run run_92acfa9d. Where the sections below say otherwise, this section replaces them.

- Money Value's amount is announced once with its currency (web: `role="img"` named “₹1,200”, axe-core clean on StatusHero; native, from the source: an accessible text element with the same label). StatusHero only groups its children when it has an `accessibilityLabel`, so the amount is reachable on phones too.

Guide changes: Content drops “Phone screen readers skip the amount, so say it in the subtitle too” for “Screen readers read the amount once, with its currency”; the Outcome and amount caption no longer says the subtitle repeats the amount for screen readers; Sources (28 October, 27 October build; the phone-screen-reader caveat is replaced by the same sentence).

## Checked

25 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-c8526ae` (Biscuit's `main` at c8526ae, which contains 475ae733); the mirror is up to date with upstream. Rendered the installed package in the docs site's Vite setup (react-native-web 0.21.2) in headless Chrome, and the published Storybook stories.

## Sources

- Package: `src/components/StatusHero/StatusHero.tsx` (159 lines). Exports `StatusHero`, `StatusHeroProps` (`components/index.ts:200`). Uses IconCapsule and MoneyValue.
- Figma: [Coin Components Library · StatusHero](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2594-13), node `2594:13`, one component, 344 × 259. Properties `Title`, `Subtitle` (text) and `title` (boolean). A nested media slot: Icon Capsule (81 px, Neutral High: `#303338` with a white tick) over a MoneyValue ("₹50", 36/36), 46 apart; Title 20 px fixed 328 wide; Body 14 px.
- Storybook (published `index.json`): `components-statushero--default`, `--without-title`, `--without-subtitle`, `--custom-media-slot`, `--large-amount`; host `padding: 24`, centred.
- Biscuit's handwritten `StatusHero.mdx`: "the result of a payment or a setup: an icon, an amount, a title, and a subtitle. It confirms what just happened." Use for the screen after a payment, mandate, or setup succeeds; not a payment in a list (TransactionBubble) or a portfolio total (PortfolioHero). Do: "What happened, the amount, and one next fact"; Don't: "A list of transactions in the subtitle … Put the history in TransactionDetails." Limitations: "There is no button. The next action sits outside this hero." "`renderMedia` replaces both the icon and the amount."

## Contract

- `title` (default "You're set to make payments"), 20/24 Bold `#0c0d10`; hidden by `showTitle={false}` or `''`.
- `subtitle` (default '₹50 will be auto-invested daily,\nstay consistent & stay golden.'), 14/17 Medium `#24262b`; `\n` stays a line break; `''` hides it, `undefined` shows the default.
- `iconName` (default 'ic_confirm') in an IconCapsule forced to Icon Capsule Size L, Emphasis High, AppearanceBrand Primary: 81 px gold `#cea15a`, 36 px dark icon.
- `value` (string, default '50') and `currency` (default 'INR' → ₹) in a MoneyValue forced to Context3 Balance & Cards: 36 px, weight 900, on a 44 px line.
- `renderMedia`: replaces the capsule and the amount; a single element gets `cloneElement(…, { modes })` (its own modes are replaced).
- `modes`: Semantic Intent System + AppearanceSystem recolour the capsule (positive `#26ab21`, warning `#f06e0f`, negative `#f50030`, white icon). AppearanceBrand, Emphasis, Icon Capsule Size and Context3 are forced, so they do nothing. Title and subtitle colours don't change with any mode.
- `style` last on the root. No `testID`, `onPress`, accessibility props, or children.

## Web render

Root `div` (column, centred, padding 8, gap 12) › media `div` (gap 46) › [`div[role=img]` capsule, `div` MoneyValue] · content `div` (gap 12) › [`div[dir=auto]` title, `div[dir=auto]` subtitle].

- Default copy: 302 × 269. It hugs its text; in a 360 px column it fills the width and a long subtitle wraps, centred.
- `ic_warning` and `ic_close` render in the capsule (white on orange / red with System).
- A gold-coin `Image` (81 px) in `renderMedia`: no capsule, no amount; 162 tall with a one-line subtitle.
- `showTitle={false}` and `subtitle=""` together leave an empty content wrap and its 12 px gap.
- MoneyValue's row is `aria-disabled` on the web and its text hidden from native screen readers (#346).

## Discrepancies

- Mark: Figma's Neutral dark grey with a white tick vs the package's forced gold (#398).
- 269 px tall vs 259 (title line 24 vs 22, amount line 44 vs 36); hugs its text vs Figma's 344 (#398).
- `renderMedia` replaces its child's modes; the amount isn't announced; empty content keeps a gap (#398).
- Storybook: Without subtitle shows the default subtitle; Custom media slot renders a 42 px capsule 16 px from its amount; Code Connect passes MoneyValue as children (#398).

## Hosting

Anatomy and Sizing use the bare hero with its default copy (Figma's). Example cards and Do & Don'ts put each hero in a Coin `VStack` column (300 px, `maxWidth: '100%'`), so long text wraps instead of overflowing the card. In context is a whole screen (`ScreenFrame size="full"`) with a Coin Title and Button. The custom media is the docs' `src/assets/gold-coin.png` in a Coin `Image`.

## Tickets

- #398 (Component Bug, Biscuit): forced gold mark, height, `renderMedia` modes, accessibility, empty gap, Storybook stories, Code Connect.
- #346 (Component Bug, Biscuit, existing): MoneyValue's amount `aria-disabled` / hidden from native screen readers.

## Limits

Don't show or mention Color Mode, dark mode, Page type JioPlus, or Context. Don't imply a status prop, a button, that AppearanceBrand or Emphasis change the mark, that `renderMedia` keeps the amount, or that leaving `subtitle` out hides it.
