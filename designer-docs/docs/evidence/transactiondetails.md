# TransactionDetails source evidence

Package, Figma, and Storybook evidence for the Transaction Details guide (board ticket #9, Design documentation — Marcin; Storybook coverage — Biscuit, done: "Storybook page rewritten to the handwritten outline on main 475ae733").

## Checked

25 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-c8526ae` (Biscuit's `main` at c8526ae, which contains 475ae733); the mirror is up to date with upstream. Rendered the installed package in the docs site's Vite setup (react-native-web 0.21.2) in headless Chrome, and the published Storybook story.

## Sources

- Package: `src/components/TransactionDetails/TransactionDetails.tsx` (201 lines). Exports `TransactionDetails` (`components/index.ts:212`) with `TransactionDetails.Item` attached (:199). The prop types aren't re-exported.
- Figma: [Coin Components Library · Transaction Details](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1557-7798), node `1557:7798`, one component, 315 × 200, no properties. A slot of four "Detail Item" instances (Label, Value text properties), each fixed 315 wide, 38 tall, gap 4; items 16 apart.
- Storybook (published `index.json`): `components-transactiondetails--default`, `--single-item`, `--account-transfer`, `--bill-payment`, `--multiple-transactions`, `--custom-styles`; no host frame.
- Biscuit's handwritten `TransactionDetails.mdx`: "a receipt: a vertical list of label and value pairs." Use for the facts of one completed payment; not the tappable row (TransactionBubble) or a plan comparison (PlanComparisonCard). Content: "Labels are field names: From, To, UPI transaction ID. Values are the data. Do not put a sentence in a value." Do/don't: the label shouldn't repeat the number. Limitations: doesn't paginate or collapse; an item is text only, not a link.

## Contract

- `TransactionDetails`: `children` (Items), `modes`, `style`, View props through `...rest` (so `testID` works); `accessibilityLabel` is accepted but never applied.
- `TransactionDetails.Item`: `label` (default 'Label'), `value` (default 'Value'), `modes`, `style`, `labelStyle`, `valueStyle`, View props (`testID` works); `accessibilityLabel` accepted, never applied.
- Children get the list's `modes` (`cloneChildrenWithModes`, child's own modes win).
- No variants, no states, no truncation: long text wraps.

## Tokens and modes

`transationDetails/*` (sic) and `detailItem/*`, each a one-mode collection of literals: list gap 16, padding 0; item gap 4; label 14/17 Medium `#0c0d10`; value 14/17 Medium `#24262b`. No mode changes the list or its items.

## Web render

`section[role=region]` (column, gap 16, `data-testid` from `testID`) › `div` per Item (column, gap 4, `data-testid`) › `div[dir=auto]` label, `div[dir=auto]` value.

- Four story items: 228 × 200 when the host lets it hug; each item as wide as its longer text.
- In a 315 px column: the list fills it; a long value wraps under its label (two lines, 34 tall).
- In a flex row the list keeps its natural width (doesn't shrink).
- `accessibilityLabel="Transfer details"` doesn't reach the DOM: the region has no name. On the web the label and value text are read; on native they are hidden and the item has no label.

## Discrepancies

- `accessibilityLabel` on the list and items is dropped; the MDX says items are announced as "label: value" and the list can be named (#396).
- MDX Modes and tokens omits the list tokens; Code Connect renders `<TransactionDetails />` with no Items (#396).
- Figma's items are a fixed 315; the package sizes them to their text.

## Hosting

Anatomy and Sizing use `specimenWidth={315}` (Figma's width). Long-value examples sit in a Coin `VStack` 240 px column, since a flex-row host wouldn't let the list shrink. In context is a whole screen (`ScreenFrame size="full"`) with a Coin Title and Button.

## Tickets

- #396 (Component Bug, Biscuit): accessibility labels never applied; MDX tokens; Code Connect.

## Limits

Don't show or mention Color Mode or dark mode. Don't imply the list presses, copies, collapses, or pages, that it has a surface or dividers, or that it names itself for screen readers.
