# TransactionBubble source evidence

Package, Figma, and Storybook evidence for the Transaction Bubble guide (board ticket #77, Design documentation — Marcin; Storybook coverage — Biscuit, done: "Storybook page rewritten to the handwritten outline on main 475ae733").

## Checked

25 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-c8526ae` (Biscuit's `main` at c8526ae, which contains 475ae733); the mirror is up to date with upstream. Rendered the installed package in the docs site's Vite setup (react-native-web 0.21.2) in headless Chrome, and the published Storybook stories.

## Sources

- Package: `src/components/TransactionBubble/TransactionBubble.tsx` (164 lines). Exports `TransactionBubble`, `TransactionBubbleProps` (`components/index.ts:214`). Uses MoneyValue, TransactionStatus and NavArrow.
- Figma: [Coin Components Library · Transaction Bubble](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1517-1155), node `1517:1155`, one component, 231 × 109, fixed width. One property, `Description`. The amount is a nested MoneyValue (Context3 Transaction Bubble on its wrap); the status row is the Coin Subcomponents Transaction Status (with its chevron). Status comes from the `Transaction Status` variable mode on the instance (1686:4884 is set to Declined). The page's thread screen (1620:6589) right-aligns the bubbles at 231 px on a 328 px column.
- Storybook (published `index.json`): `components-transactionbubble--default`, `--successful-transaction`, `--with-press-and-slot`, `--dark-mode`; no host frame except the slot story's `padding: 20, gap: 16`, so bubbles fill the canvas.
- Biscuit's handwritten `TransactionBubble.mdx`: "one payment in a list: who it was, the amount, an optional extra, and a status line with a chevron." Use for one payment in a feed that opens its detail; not the receipt (TransactionDetails) or the success screen (StatusHero). Accessibility: "Set `accessibilityLabel` to the counterparty, the amount, the status, and the date."

## Contract

- `description` (default 'Payment to Uber India'): 14/17 `#24262b`, one line with a tail ellipsis; `disableTruncation` lets it wrap (status line unaffected).
- `value` (string or number, default '56') and `currency` (default '₹'; ISO codes map) feed a MoneyValue at Context3 Transaction Bubble: ₹ 28 px, amount 26 px, weight 900.
- `status` (default 'Expired') and `date` (default '20 Mar 2025') feed a TransactionStatus, followed by a NavArrow Forward (decorative, `role="img"` "Go forward").
- `children`: rendered between the amount and the status row, with the bubble's modes (child's own modes win).
- `statusSlot`: replaces the whole status row, chevron included, with the bubble's modes.
- `modes`: merged, then `Context3: 'Transaction Bubble'` forced. Only `Transaction Status` changes what designers see: the status mark Request orange (default), Paid green, Declined red, Expired grey.
- `onPress`: the root becomes a Pressable button (opacity 0.85 while pressed), named `accessibilityLabel ?? '<description> • <status>'`. Without it the root is a plain View with that `aria-label` and no role. `testID` and rest props reach only the Pressable.
- `style` goes after the container style. No width: it fills its host.

## Tokens

`transactionBubble/*` (one mode): padding 16, radius 23, border 1 `#e5e5e5`, background `#ffffff`, gap 8, wrap gap 8, description 14/17 `#24262b`; statusWrap gap 4, height 18. `transactionBubble/description/fontWeight` (500) isn't read.

## Web render

Root `div[aria-label]` (pressable: `button`) › `div` (gap 8) › [`div` (gap 8): `div[dir=auto]` description, `div` MoneyValue] · children · `div` status row (row, space-between, height 18): [`div` TransactionStatus (svg + text), `div[role=img]` chevron].

- At 231 px: 231 × 119, content 197 wide. With a `Text` child: 144 tall. With `disableTruncation` and a two-line description: 136.
- Description weight renders 400 (Figma 500).
- With `statusSlot`, the default `aria-label` still says the `status` prop.
- MoneyValue's row is `aria-disabled="true"` (#346).

## Discrepancies

- 119 px tall vs Figma 109 (amount line 34 vs 26); description 400 vs Medium 500 (#395).
- Default accessible name has no amount or date and ignores `statusSlot`; static bubble has no role; `testID` only when pressable (#395).
- The status mark is always “!” (#394); Figma swaps tick, cross, “!”.
- Storybook: Successful transaction sets no mode (orange mark beside "Completed"); With press and slot puts a second MoneyValue in children; Code Connect maps Figma's MoneyValue to children (#395).
- Figma's bubble is a fixed 231; the package's fills its host.

## Hosting

Examples give the bubble Figma's width through its public `style` prop (`{ width: 231, maxWidth: '100%' }`); In context aligns sent bubbles right and received ones left with `alignSelf`, as the Figma thread does. The note row in `children` is a Coin `Text`.

## Tickets

- #395 (Component Bug, Biscuit): weight, height, default name, `disableTruncation` scope, `testID`, Storybook stories, Code Connect.
- #394 (Component Bug, Biscuit): the status glyph.

## Limits

Don't show or mention Color Mode, dark mode, or the Dark mode story. Don't imply the bubble aligns or sizes itself, that the mode changes the words or the icon shape, that `statusSlot` keeps the chevron, or that `children` replace the amount.
