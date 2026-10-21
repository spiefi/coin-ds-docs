# HoldingsCard source evidence

Package, Figma, and Storybook evidence for the Holdings Card guide (board ticket #6, Design documentation — Marcin; Storybook coverage — Biscuit, done: "Storybook page rewritten to the handwritten outline on main e60f8bd8").

## Checked

21 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-c7d3348` (Biscuit's `main` at c7d3348). `npm run coin:status` shows one newer upstream commit, e60f8bd8, which changes only Storybook MDX pages (`HoldingsCard.mdx` among them). The published Storybook (built 17 October) is older than the installed package for Badge (black label), Radio (no `role=radio`) and Link; the installed package was rendered with the docs site's Vite config and react-native-web 0.21.2 as ground truth.

## Sources

- Package: `src/components/HoldingsCard/HoldingsCard.tsx` (598 lines). Exports `HoldingsCard`, `HoldingsCardProps`, `HoldingsCardDetailItem`, `HoldingsCardFooterItem` (`components/index.ts:140-144`). Renders Coin `Image`, `Radio`, `Badge`, `Divider`, `Link`, `Button`.
- Figma: [Coin Components Library · Holdings Card](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1028-1533), node `1028:1533`, one component, 328 × 201 (no footer). Properties: `children` (Slot), `footer` (false), `radio` (true), `trailing` (instance swap; default a Badge "Label"). Reference look: white card, `#ebebed` stroke (AppearanceBrand Neutral), dark `#303338` badge, purple links, gold Apply button.
- Storybook (published `index.json`): `components-holdingscard--default`, `--selected`, `--disabled`, `--with-badge`, `--with-footer`, `--without-trailing`, `--with-image`. Centred layout, no width (the card hugs its content, 263.75 wide, and "Processing fee" wraps). Storybook injects `onPress` into every story. The With image story's logo URL is blocked (cross-origin), so it shows an empty box. The published docs page is the older generated one.
- Biscuit's handwritten `HoldingsCard.mdx` (e60f8bd8): "one offer or holding: a label, a hero amount, a grid of terms, and an optional footer. The trailing control is a radio unless you swap it for a badge." Use to pick one loan, plan or holding from a list (the radio is the selection), or with `badgeLabel` to show a status; not for comparing plans (PlanComparisonCard) or a dashboard sentence (SummaryTile). Content: heroLabel says what the number is; heroValue already formatted; short detail labels; values carry the unit; footer link labels are the next step.

## Contract

All props optional; no `accessibilityLabel` or `...rest`; `testID` is forwarded.

- Header: `headerImage` (none ships) in a 100 × 23.69 box, `contain`, left; an empty box of that size stays when it's left out. Trailing on the right: a `Radio` (default) showing `selected`/`disabled`; `badgeLabel` swaps it for a `Badge`; `trailing` swaps in any node; `radio={false}` hides the whole trailing area (Badge and `trailing` too).
- Hero: `heroLabel` (12/16) over `heroValue` (20/24 bold); both wrap. Placeholders "Loan amount up-to", "₹1,89,000".
- `details: { label, value }[]` (five sample items): three per row, equal columns (gap 12, rows 16 apart); short rows padded. Labels (10 px) wrap; values (12 px) cut with an ellipsis (`disableTruncation` lets values wrap). `children` replaces the grid (given the card's modes; hero and trailing stay).
- Footer (`footer`, default false): a `Divider`, then `footerItems: { label, linkLabel?, onLinkPress? }[]` (two placeholders, "Link") as label + Coin `Link`, then a Button 80 px wide (`footerActionLabel` 'Apply', `onFooterActionPress`). `footerSlot` replaces the footer body.
- Root is always a `Pressable` button (`accessibilityState { disabled, selected }`, opacity 0.75 while pressed). `disabled={disabled || !onPress}`: without `onPress` the whole card is a disabled button and mouse clicks on its footer Apply and Links do nothing (keyboard still works). The card never changes `selected` itself: the screen sets it in `onPress`.
- No width of its own: it fills a stretching (column) host and hugs its content in other hosts. `style` goes last.

## Modes and tokens

Card tokens (`holdingsCard/*`, one mode): radius 16, 1 px stroke, padding 20 / 16, gap 10, header image 100 × 23.69, hero 12/16 and 20/22 (rendered 24), detail label 10/12, value 12/14 (rendered 15). Colours come from AppearanceBrand (Light):

| AppearanceBrand | fill | stroke | detail label |
|---|---|---|---|
| Primary (default) | `#fef4e5` | `#fde8c9` | `#2c251b` |
| Secondary | `#f6f3ff` | `#ede7ff` | `#310064` |
| Neutral (Figma) | `#ffffff` | `#ebebed` | `#24262b` |
| Tertiary | `#f5f5f5` | `#ebebed` | `#24262b` |

- Badge gets `{ 'Semantic Intent': 'System', Emphasis: 'High', 'Badge Size': 'Medium', ...modes }`: green by default; AppearanceSystem warning (orange) / negative (red); Emphasis Medium (pale green); Badge Size Small; Semantic Intent Brand + AppearanceBrand gives brand colours (Neutral `#303338`, Figma's).
- Footer Button gets `{ ...modes, 'Button / Size': 'S', AppearanceBrand: 'Tertiary' }`: always blue `#036b99`, size S; your AppearanceBrand and Button / Size never reach it. Emphasis Low makes it a text button; Button / State, Context change it.
- Link (footer): black by default; Text Appearance Secondary purple (Figma). Radio and Divider take the card's modes.
- No effect: Button / Size, Context2, Profile Card Appearance (offered by Storybook).

## Web render

Root `button` › header `div` (logo box `div` 100 × 23.69, trailing `div` › Radio 18 × 18 or Badge) · hero `div` (`div[dir=auto]` label, value) · grid `div` › row `div`s › cells (label, value) · footer `div` (Divider `div[role=presentation]`, row: two label + `div[role=link]` columns, Apply `button` 80 × 32).

- At width 328: 328 × 207.69 (Figma 201: hero 44 vs 42, rows 31 vs 30, plus the border); with footer 261.69. Content width 294 (Figma 296). Cells 90 wide.
- Hugging (Storybook): 263.75 wide; "Processing fee" wraps; footer columns misalign.
- A long `badgeLabel` isn't truncated: it's cut by the card's edge. "Apply now" wraps to two lines in the 80 px button (44 px tall). A value longer than its cell ends in an ellipsis.

## Discrepancies

- Footer Apply is forced blue (Tertiary); Figma's is gold, and the code comment says "gold".
- Default look Primary (pale gold) vs Figma Neutral (white); default trailing Radio vs Figma's Badge; default Badge green vs Figma `#303338`; Link black vs Figma purple.
- No width: hugs in non-stretching hosts; Figma is fixed 328.
- Without `onPress` the card is a disabled button and its footer controls don't respond to clicks; Storybook hides this by injecting `onPress`.
- `selected` isn't exposed on the root (only through the Radio's `aria-checked`); the Radio stays tabbable inside the card button.
- Height 207.69 vs 201; long badge cut without an ellipsis; two-word action wraps.
- MDX mentions an `accessibilityLabel` that doesn't exist and says `onPress` toggles selection; the badge modes are defaults, not forced; `radio={false}` hides any trailing.
- Published Storybook older than the package; With image logo blocked.

## Hosting

Each card gets `style={{ width: 328 }}` (Figma's width) and sits in `FitWidth`. Every card gets `onPress` (the screen's selection), so its footer controls respond. Logo: the docs' `src/assets/jio-gold-logo.png` (gold Jio mark, 128 × 128).

## Tickets

- #362 (Component Bug, Biscuit): forced blue footer button, no width, disabled without `onPress` (footer unclickable), defaults vs Figma, long badge and action label, `selected` exposure.

## Limits

Don't show or mention Color Mode or dark mode. Don't imply the card selects itself, that the footer button follows AppearanceBrand, that labels or badges truncate, or that a card without `onPress` works.
