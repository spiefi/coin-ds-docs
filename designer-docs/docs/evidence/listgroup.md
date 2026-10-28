# ListGroup source evidence

Package, Figma, and Storybook evidence for the List Group guide (board ticket #53, Design documentation — Marcin; Storybook coverage — Biscuit, done: "handwritten ListGroup docs page and stories. Component code was not changed.").

## Checked

28 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-dbe0e02` (Biscuit's `main` at dbe0e02, 27 October); `npm run coin:status` reports the mirror up to date. Installed and upstream `ListGroup.tsx` are byte-identical. Rendered in the docs site's Vite setup (react-native-web 0.21.2) in headless Chrome, including a mouse drag in reorder mode.

## Sources

- Package: `src/components/ListGroup/ListGroup.tsx`. Exports `ListGroup`, `ListGroupProps`, `ListGroupRenderItemInfo`, `DragEndResult` (`components/index.ts:155-159`). Renders no other Coin component; rows are whatever you pass (List Items).
- Figma: [Coin Components Library · listGroup](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2849-3171), node `2849:3171`, one component (no variants), 352 × 234: a `Title` text "March 2025" (14/18 Medium `#24262b`), then a Stack with a `content` slot of four 42 px List Items, all 12 px apart. No padding, fill, or border. Code Connect maps it, but not the Title to `label`.
- Storybook (published `index.json`): `components-listgroup--default`, `--using-children`, `--with-custom-items`, `--without-label`, `--reorderable`, `--with-modes`, `--docs`. No frame: the group is full width. Default passes `label: ''`; With Custom Items has "Transactions"; Reorderable sits in a 380 px padded View.
- Biscuit's `ListGroup.mdx`: collections Color Mode, List Item Style, Title Level; "Forward `modes` so rows inherit the same theme"; "Avoid empty groups; hide the component when no items exist"; "Reorder is within a single ListGroup only".

## Contract

- `label` (`''`): heading above the rows, one line with an ellipsis; `disableTruncation` lets it wrap. 12 px (`listGroup/gap`) below it when there are rows.
- Rows: `children` or `listGroupSlot` (slot first when both). Only elements survive: strings vanish. Rows stack full width, 12 px apart.
- `modes`: the group passes them to every row (`{ ...group, ...row }`, so a row's own modes win), and List Items pass them on to their slots (an Icon Capsule in `leading` gets them; rendered).
  - `List Item Style` Default: rows 42 tall, no fill, 12 px gap. Boxed: rows get 12 px padding, white fill, a 1 px `#ebebed` border, radius 12 (68 tall), gap 12. Minimal: gap 4 and regular-weight titles. The look comes from List Item; the group only changes its gap.
  - `Title Level` Default: label 14/18 Medium `#24262b`. Bold: 18/22 Black `#0d0d0f`.
- Reorder mode: `data`, `keyExtractor`, `renderItem`, and `onDragEnd` (all four, or it silently renders only the label). Each row shows a drag handle (List Item `isDraggable`, `onDragHandleGrant={drag}`); `onDragEnd` gets the new order and the screen saves it. Rows aren't given the group's modes in this mode. Dragging works on the web build (rendered: Netflix dragged from first to last).
- `accessibilityLabel` is dropped; the root is `ul[role=list]` with no name, and the label text is hidden from screen readers. Rows are `button` (pressable List Items) or have no role; none is `listitem`.
- `style` last; `testID` and other View props reach the root.

## Web render

Root `ul[role=list][data-testid]` › `div` label (18 tall) · `div` rows (gap 12) › rows. 328 px host, label and two Default rows: 328 × 126.

## Discrepancies

- Figma shows a "March 2025" title; the package and Storybook's Default have no label until you pass one.
- MDX says `accessibilityLabel` names the group (default: the label) and rows expose `listitem`; neither is true.
- `listGroup/border/color` exists but the code hard-codes a transparent border.
- Static mode passes modes to rows; reorder mode doesn't.

## Hosting

Groups fill their example card, as Storybook shows them full width. Rows are List Items with a Monogram Avatar and a Money Value; the group's modes reach them, so rows carry no modes (reorder rows get the same `modes` object by hand).

## Tickets

- #420 (Component Bug, Component Fix › To do; Mr. Biscuit; filed 28 October 2026, Penny run run_7586d367): no accessible name, rows not list items, reorder fall-through and missing mode cascade.

## Limits

Don't show or mention Color Mode or dark mode. Don't show `listGroupSlot` and `children` together, `style`, or `accessibilityLabel`. Don't imply the group draws a surface, presses, saves an order, or names itself for screen readers.
