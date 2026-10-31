# Balance source evidence

Package, Figma, and Storybook evidence for the Balance guide (board ticket #48, Design documentation — Marcin; Storybook coverage — Biscuit).

## dbe0e02 publish (28 October 2026, #346)

The docs now install mirror tag `v0.1.78-dbe0e02` (Biscuit's `main` at dbe0e02, 27 October). #346 verified 27 October on dbe0e02 (run_beaf2324); closed by Marcin; published to the docs 28 October in Penny run run_92acfa9d. Where the sections below say otherwise, this section replaces them.

- A static amount is announced once with its currency: Money Value's row is `role="img"` named “₹50,000.67”, with the visible ₹ and digits `aria-hidden`; no `aria-disabled`, no tabindex; axe-core reports nothing. Pressable and editable amounts are still buttons. Native (source): the row is accessible with role text and the same label.
- Page type JioPlus turns the title white with the amount. Under Color Mode Dark the title token stays `#0c0d10` over a `#fff5e8` amount (single-mode title token: Marcin's part).
- Balance.mdx imports every block it uses (source). Checked in this run: the published Storybook docs page (`components-balance--docs`) still fails with “Expected component `Controls` to be defined”: the hosted Storybook hasn't been redeployed with the fix.
- testID and accessibilityLabel work; the default amount is 50,000.67. `data-node-id` is still dropped on the web.
- The anatomy's Currency and Amount targets used `[tabindex]`, which the static amount no longer has; they now use `[role="img"]`.

Guide changes: the anatomy selectors; Sources (28 October, 27 October build; default amount 50,000.67; JioPlus turns both title and amount white; the amount is announced once with its currency; the published docs page still doesn't load because the fix isn't deployed yet).

## Checked

Checked 19 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-a116616` (Biscuit's `main` at a116616, 16 October). `npm run coin:status` reports Biscuit's `main` at c7d3348 (19 October), which the mirror lacks; that commit touches 20 files (Badge, CardFeedback, CategoryCard, SegmentedControl and others) and nothing under `Balance/`, `MoneyValue/`, `utils/react-utils.ts`, `utils/typography.ts`, or the tokens. The installed `Balance.tsx` is identical to upstream; it was last changed in v0.1.72 (caae7523, 13 August).

## Sources

- Figma: [Coin Components Library · Balance](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1986-6203), one component (no variant set), 205 × 60, one property: `Title` (text, “Total owed to people”). Layers `Title` (14/18, weight 500, `#0c0d10`, bound to `balance/title/*`) and a nested `MoneyValue` instance (205 × 36, `Negative=False`, ₹, “50,000.67”); vertical auto layout, gap 6 (`balance/gap`), no padding, fill, or stroke, hug both ways. The component sets `Context3: Balance & Cards`; the page's instance `1986:6209` uses `Context3: Default` (139 × 42). Amount and currency are overrides on the nested Money Value, not Balance properties; there is no slot. Code Connect emits `<Balance><MoneyValue currency="₹" value="50,000.67" negative="False" /></Balance>`.
- Storybook (published `index.json`): `components-balance--default`, `--with-modes`, `--custom-slot`, and `--docs`. Meta args: title “Total owed to people”, amount “50,000.67”, ₹; decorator `<View style={{ padding: 20 }}>` on the white canvas, no frame or width, so Balance fills the canvas width (828 px measured) with its content left-aligned. Controls offer selects for Color Mode, Context3, and Page type. Custom Slot passes `<MoneyValue value="999.00" currency="$" style={…grey rounded background…} />` as the child. With Modes sets only Color Mode Dark (not used by this guide).
- The published Docs page does not render: “Expected component `Controls` to be defined”, because `Balance.mdx:49` uses `<Controls />` and line 1 imports only `Meta, Story, Canvas, ArgsTable`. It is the only one of 70 `.mdx` files with this problem. The three stories render.
- The toolbar's Color Mode does nothing to Balance: neither Balance nor Money Value reads `JFSThemeProvider`.

## Contract

- Export: `Balance` and `BalanceProps` from the package root (`src/components/index.ts:223`). Props (`Balance.tsx:17-64`): `title` (“Total owed to people”), `amount` (string only, “500”), `currency` (“₹”), `modes`, `style`, `children`. No `testID`, `accessibilityLabel`, or rest props; `data-node-id` attributes are dropped by react-native-web, so anatomy targets are structural (`:scope > div` is the root).
- Render: root View (column, `alignItems: flex-start`, gap `balance/gap` 6, no padding or background, the host's width) › title Text › default `MoneyValue value={amount} currency={currency} modes={{ Context3: 'Balance & Cards', ...modes }}`. With `children`, the children replace the Money Value and `amount`/`currency` are ignored.
- Width (browser, 19 October): in a column host (a screen, a VStack, Storybook's padded View) the Balance takes the host's width and a long title wraps. In a row host, such as the docs' centred example previews, it is as wide as its text (React Native views don't shrink), so a long title runs past the host on one line; the guide's long-title example sits in a 360 px column for that reason.
- Money Value shows the amount exactly as passed: no grouping or decimals are added (`MoneyValue.tsx:116-122`). A leading “-” is drawn as its own sign before the symbol. ISO codes map to symbols (INR ₹, USD $, EUR € …, `MoneyValue.tsx:22-54,189-195`); unknown codes print as typed.
- Slotted children: `cloneChildrenWithModes(children, modes, { Context3: 'Balance & Cards' })` merges Balance's modes into every element child and forces `Context3: 'Balance & Cards'` last (`react-utils.ts:59-66`), so a slotted Money Value is always the 36 px size even when Balance's `modes` set another Context3. A non-Coin child gets a stray `modes` prop.
- Tokens: every `balance/*` token is a single-mode constant (`Balance / Output`): gap 6, title JioType Var 14/18 500 `#0c0d10`. No mode changes the title or the gap.
- Modes that change it (all through the Money Value; `figma-modes.generated.ts:335`): Context3 (amount size), Page type (amount colour), Color Mode (amount colour).

| Context3 | Symbol size | Amount size | Weight | Symbol–amount gap | Rendered line height |
| --- | --- | --- | --- | --- | --- |
| Balance & Cards (default) | 36 | 36 | 900 | 0 | 44 |
| Default | 14 | 14 | 500 | 4 | 18 |
| Transaction Bubble | 28 | 26 | 900 | 0 | 34 / 32 |
| Amount Input | 32 | 56 | 900 | 4 | 39 / 68 |

- Line heights: `safeTextLineHeight` = max(token, ceil(size × 1.2)), so the 36 px amount's 36 px line height renders as 44. Balance is 68 px tall by default in the package (18 + 6 + 44) against Figma's 60; 42 px at Context3 Default.
- Amount colour: MainPage and SubPage `#0f0d0a`; Page type JioPlus white `#ffffff`, while the title stays `#0c0d10`.
- Empty values: `title=""` still leaves an 18 px line and the 6 px gap; `amount=""` leaves the symbol alone.
- Accessibility (source, web DOM): Balance sets no role or label. Money Value's row renders `aria-disabled="true" tabindex="-1"` on web when it has no `onPress`. Its symbol and amount Text carry `accessibilityElementsHidden` and `importantForAccessibility="no"` and its row passes `accessibilityLabel={undefined}`; what native screen readers announce was not checked on a device.
- Classification. Designer-configurable: the title, the amount, the currency, the amount size (Context3), a Money Value of your own (for its options, such as `hidden`). System-driven: the symbol for a code, the minus sign, line heights, the Balance & Cards default, Balance & Cards on a slotted Money Value. Developer-only: `style`, the `children` wiring, mode plumbing.

## Usages

No other package component renders Balance. PortfolioHero, StatusHero, and RechargeCard use Money Value directly with the same Balance & Cards default. Balance has no surface or padding, so a host (a screen, a card) supplies them.

## Limits

- Not shown: Color Mode Dark, Page type JioPlus (the amount turns white and the title stays dark), `style` overrides, non-Coin slot children.
- Not implied: that Balance formats the amount, that it is pressable or has states, that a slotted Money Value can take another Context3, that the title follows any mode.

## Coin gaps

- #346 (Component Fix, To do; Mr. Biscuit, filed 19 October 2026): the published Storybook Docs page throws (missing `Controls` import in `Balance.mdx`); Page type JioPlus turns the amount white while `balance/title/foreground` has no Page type alias (token side for Marcin), so no surface keeps both readable; Money Value's row is `aria-disabled` on the web and its text is hidden from native screen readers; no testID; a stray `modes` prop on non-Coin slot children.
- Inconsistency, intended per the source comment (`Balance.tsx:92-94`): Balance's `modes` can change the default Money Value's Context3 but not a slotted one's.
