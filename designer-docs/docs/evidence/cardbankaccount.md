# CardBankAccount source evidence

Package, Figma, and Storybook evidence for the Card Bank Account guide (board ticket #7, Design documentation — Marcin; Storybook coverage — Biscuit, done: "Rewrote CardBankAccount to the handwritten Storybook outline").

## Checked

19 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-a116616` (Biscuit's `main` at a116616, 16 October). `npm run coin:status` shows one newer upstream commit (c7d3348); `CardBankAccount.tsx`, `InstitutionBadge.tsx`, `Badge.tsx`, `Button.tsx` and the token JSON are byte-identical there. Rendered with react-native-web 0.21.2 in headless Chrome.

## Sources

- Package: `src/components/CardBankAccount/CardBankAccount.tsx` (330 lines, plain function, no statics). Exports `CardBankAccount`, `CardBankAccountProps`, `CardBankAccountItem` (`components/index.ts:28-32`). Renders `InstitutionBadge` + `Badge` in the header, hand-built label/value rows, and a `Button` footer.
- Figma: [Coin Components Library · Card / BankAccount](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3762-2459), node `3762:2459`: one component, 292 × 204, no properties or variants. Padding 16/12, gap 16, radius 16, white. Header: Institution Badge (36 px bank logo, "State Bank of India" 14/18) and an amber `#F7AB21` "Label" Badge. A listGroup (List Item Style Minimal) of three List Items (Context ListItem): label 14/16 bold, value 12/14 medium "Korem ipsum". Button S / Secondary / Medium, full width.
- Storybook (published `index.json`): docs `components-cardbankaccount--docs` (older generated page); stories `--default`, `--savings`, `--without-badge`, `--with-custom-badge`, `--without-footer`, on a 292 px frame with 16 px padding and `#f0f0f3`. Every story shows the stock portrait avatar. Default sets AppearanceBrand Primary (gold button and badge); the others are purple.
- Biscuit's handwritten `CardBankAccount.mdx` (upstream, not the published page): "a bank account summary: the institution, a few facts, and one footer action. It does not fetch the account or move money." One account; mask the number (`•• 4242`); row labels are field names; button label a verb; one footer action ("A second action belongs outside the card"); the card isn't pressable. Use AccountCard for a row of tiles, DebitCard for a card face.

## Contract

Props (defaults): `institutionName` ('State Bank of India'), `institutionAvatar` (none: stock portrait), `badge` (none; a string becomes `<Badge label modes>`, a node is cloned with the card's modes, `false`/`null` hide it), `headerSlot` (replaces the whole header row), `items` (three "Korem ipsum" rows; no cap), `children` (replaces `items`), `buttonLabel` ('Button'), `onButtonPress`, `footer` (node replaces the Button; `false`/`null` hide it), `modes`, `style`, `accessibilityLabel` (default `institutionName`, on a role-less root), `disableTruncation` (value text only). No `testID`, no root `onPress`, no way to disable the footer Button.

- The card isn't pressable; the footer is a real `<button>` with the Button's hover (`#D2C3FF`) and pressed (`#C9B7FF`) colours.
- Rows: label `flex: 1, minWidth: 0` (wraps), value one line, never shrinks. A long value squeezes the label (36-character value: label 2 px wide, one letter per line); `disableTruncation` only lets the value wrap.
- A custom footer node hugs its content (root `alignItems: flex-start`).

## Modes and tokens

`DEFAULT_MODES = { 'Button / Size': 'S', AppearanceBrand: 'Secondary', Emphasis: 'Medium' }`, with the caller's `modes` merged on top; the same object goes to the badge, button and slots. The card doesn't read the theme provider.

- Panel (`bankAccountCard/*`, single mode): white, radius 16, padding 16 vertical / 12 horizontal, gap 16, header gap 8. No mode changes it.
- AppearanceBrand × Emphasis colour the Button and a word Badge (Medium: Secondary `#E4DBFF`/`#5D00B5`, Primary `#FDE8C9`/`#93713A`, Neutral button `#545961`/white and badge `#D6D6D9`/`#303338`, Tertiary button `#036B99`/`#B3D3E0` and badge `#C4E7FF`/`#026B9A`; High Secondary `#5D00B5`/white; Low transparent button, badge `#F6F3FF`).
- Semantic Intent System + AppearanceSystem: Button `#26AB21` / `#F06E0F` / `#F50030`; a Badge node with its own `{ 'Semantic Intent': 'System', AppearanceSystem: 'positive' }` keeps them (`#D4F6D0`/`#00773D`) while the button stays purple.
- Button / Size: S 32 px (default), M 42, XS 24. List Item Style Minimal: row gap 4, labels 12/16/400. Avatar Size L: 42 px logo. Badge Size Small: 10/12 badge. Text Sizes, Weight and Context change the value text (Context ListItem gives Figma's 12 px values but also reshapes the button).
- Rows: label `listItem/title/*` 14/16/700 `#0F0D0A` (17 px rendered line), value `text/*` 14/16/500 `#000000`.

## Web render

Root `div[aria-label]` › header row `div` (› `div` › InstitutionBadge; › Badge pill when set) › rows block `div` (› row `div` › label wrapper `div` › label `div[dir=auto]`; value `div[dir=auto]`) › footer `button[role=button]`. No `data-testid`. Width 100% of its host. Measured at 292 wide: 292 × 207 (Figma 204); rows 17 px, 12 apart; button 32. The guide's Sizing diagram measures the same: 292 × 207, padding 16/12, gap 16.

## Discrepancies

- Badge: Figma amber `#F7AB21`/`#402608` (not in the package tokens); code takes the button's Secondary / Medium colours. Figma always shows a badge; code shows none unless `badge` is passed.
- Value text: Figma 12/14; code 14/17. Rows 17 px (Figma 16), card 207 (204).
- Figma composes ListGroup › ListItem › Text; code hand-builds the rows (no ListItem options).
- Default avatar is a stock photo of a person; the package ships no bank logos. Defaults are placeholder copy ("State Bank of India", "Korem ipsum", "Button").
- Storybook Default story is gold (AppearanceBrand Primary), contradicting the mdx's Secondary default; the mdx says rows use `bankAccountCard/*` tokens (only the panel does). Published docs page is the older generated one.
- Root `aria-label` on a role-less div; no `testID`; `disableTruncation` doesn't reach the header name, badge or button.

## Hosting

Storybook frames the card at 260 px on light grey. The guide puts each card on the grey example stages with `style={{ width: '100%', maxWidth: 292 }}` (Figma's width). The bank is Jio Payments Bank with `institutionAvatar` = `src/assets/jio-gold-logo.png`, because the package has no bank logos and its fallback is a stock portrait. Status badge: a Coin `Badge` with Semantic Intent System and AppearanceSystem positive.

## Tickets

- #344 (Component Bug, Biscuit): long values collapse the label, stock-photo avatar and placeholder defaults, badge and value text against Figma, accessibility and testID, Storybook Default story and mdx.

## Limits

- Not shown: Dark, Context, Text Sizes, Weight, Badge Size, Button / State, `headerSlot`, `children`, `footer` nodes and `disableTruncation` (described only), style props beyond width.
- The card has no pressed or disabled look; the footer button can't be disabled from the card.
