# PlanComparisonCard source evidence

Package, Figma, and Storybook evidence for the Plan Comparison Card guide (board ticket #70, Design documentation — Marcin; Storybook coverage — Biscuit, done: "Storybook page rewritten to the handwritten outline on main e60f8bd8").

## Checked

21 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-c7d3348` (Biscuit's `main` at c7d3348). `npm run coin:status` shows one newer upstream commit, e60f8bd8, which changes only Storybook MDX pages (`PlanComparisonCard.mdx` among them); component code and stories are identical. The published Storybook was measured in headless Chrome (react-native-web, JioType Var loaded).

## Sources

- Package: `src/components/PlanComparisonCard/PlanComparisonCard.tsx` (333 lines). Exports `PlanComparisonCard`, `PlanComparisonCardProps`, `PlanComparisonColumn`, `PlanComparisonRow`, `PlanComparisonCellValue` (`components/index.ts:311-316`). Renders Coin `Icon` (`ic_info`, `ic_close`).
- Figma: [Coin Components Library · PlanComparisonCard](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4498-2968), node `4498:2968`, a single component (no variants), 328 × 218. Header (no label-column text, "Your plan" white, "JioFinance+" gold), then a `Slot` holding the table (4 rows × 46 px, `#141414`, 1 px `#1e1a14` border, radius 16). The one exposed property is the Slot; columns and rows are layer content.
- Storybook (published `index.json`): `components-plancomparisoncard--default`, `--three-plans`, `--interactive-info`, `--custom-slot`. Every story sits in a 428 px black (`#000`) host with 16 px padding, so the card is 396 wide. The published docs page is the older generated one; e60f8bd8's handwritten page isn't deployed.
- Biscuit's handwritten `PlanComparisonCard.mdx` (e60f8bd8): "a plan matrix: feature labels down the side, plan names across the top, one cell per plan. A `false` cell is a cross. A brand column is the plan you recommend." Use for "two or three plans, a handful of features, and a clear recommended column"; not for one product with a price (HoldingsCard, CcCard) or a long catalogue (CompareTable). "Use `false` for 'not included', not the word 'No'." Do: one value per plan, in column order.

## Contract

Five props, all optional: `columns` (default Your plan, JioFinance+ with `brand`), `rows` (four default rows), `children`, `modes`, `style`. No `testID`, `onPress`, `disabled`, `accessibilityLabel`, or `...rest`.

- `columns: { label, brand? }[]` — one header per plan; `brand: true` turns that name gold. Any number of columns, any number branded. The label column has no header.
- `rows: { label, showInfo?, onInfoPress?, values, key? }[]` — `values[i]` fills plan column i. `string | number` → white text (12/16, 500, centred); `false` → grey cross (`ic_close`, 16 px); `null`, `undefined` or `true` → empty cell; a React element → rendered as is, given the card's `modes`. A short array leaves empty cells; extra values are ignored.
- `showInfo` adds a white `ic_info` (16 px) after the label: decorative, no role or name. `onInfoPress` implies `showInfo` and wraps the icon in a `Pressable` (`role=button`, name "More information about <label>", hitSlop 8 → about 32 × 32 on web; Enter and Space work).
- `children` replaces the table body; the header still comes from `columns`. The card gives the slot no panel, border or padding.
- `modes` is used for the card's tokens and cascaded (`cloneChildrenWithModes`, child's own modes win) to slot children and element cells.
- `style` is appended to the root (`{ gap: 16, width: '100%' }`).
- All text has `whiteSpace: nowrap` and `flexShrink: 0`: nothing wraps or truncates; long text runs into the next column or past the card.

## Modes and tokens

29 tokens, all in `PlanComparisonCard / Output` (one mode). Only Color Mode changes three of them (not covered by the docs). No AppearanceBrand, Emphasis, Semantic Intent, AppearanceSystem, Page type, or size mode reaches the card: its colours are fixed white text on a `#141414` table, gold `#cea15a` brand name, grey `#91949c` cross. `FIGMA_COMPONENT_MODES.PlanComparisonCard = ['Color Mode']`. Root gap 16, header 14/18 500, cell padding 12, min height 46, label 12/16 400, value 12/16 500, icons 16, label–icon gap 2.

- Page type JioPlus (the black JioFinance+ page) passed as the card's `modes` changes nothing on the card but reaches slot content: Coin `Text` turns white (`text/foreground` black → white). Coin `Badge` in a cell is gold with dark text in any mode. Coin `Title` stays dark under JioPlus.

## Web render

Root `div` › header `div` (row: empty label spacer, then one `div` per plan › `div[dir=auto]`) › table `div` › row `div`s › label cell `div` (`div[dir=auto]` label, then icon `div` › `svg`, or `button` › `div` › `svg`) + one value cell `div` per plan (`div[dir=auto]` text or icon `div`). No `data-testid`, no table roles.

- Storybook host 396: card 396 × 223 = header 18 + gap 16 + table 189 (rows 47, 47, 47, 46 + 2 border). Three rows: 176.
- Header columns split 1.8 : 1 exactly; table cells split about 1.62 : 1 because each cell's 24 px padding counts before the ratio, so header names sit 3–8 px right of their cells' centres (Figma ≈ 2 px).
- At 328 (Figma width): two plans → label cell 144, plan cells 91 (67 px for text); header plan columns 86. Three plans → label cell 110 (86 px for text), plan cells 72 (48 px for text); header plan columns 68. "JioFinance+" (84 px at 14/500) runs 8 px past the card with three plans; "JioPoints multiplier" (113 px) runs into the first plan column; "Upto ₹2000" and "Upto ₹5000" end up 3 px apart.

## Discrepancies

- Header columns don't line up with the table's columns (padding inside the flex ratio); Figma's do.
- Table 189 vs Figma 184 (row lines and the outer border are drawn outside the 46 px cells); card 223 vs 218. Figma's `planComparisonCard/header/gap` (8) is never read.
- Text never wraps or truncates; at phone width with three plans names, labels and values overflow their columns.
- Static info icon and the cross have no accessible name; the cross isn't announced as "not included"; no table semantics. The info button's name is fixed English.
- Figma draws a row line under rows 1 and 2 only; the code (and the old MDX) puts one under every row but the last.
- Published Storybook docs page is the older generated one; the handwritten MDX's Controls and ArgTypes tables exclude every prop. The Custom slot story uses literal colours and the system font.

## Hosting

Storybook hosts the card on black. The kit's dark host is `ScreenFrame surface="dark"` (a 360 px phone screen with 16 px padding; Anatomy uses `surface="dark"`). The guide puts each card in `ScreenFrame surface="dark"` › `FitWidth` with `style={{ width: 328 }}` (Figma's width), so phones scale it instead of letting text overflow. Examples use three rows so the card fits the 320 px frame without scrolling. Cards get `modes={{ 'Page type': 'JioPlus' }}` so Coin `Text` in the slot turns white.

## Tickets

- #360 (Component Bug, Biscuit): header/table misalignment, overflow at phone width, height vs Figma, unused header gap, accessible names.

## Limits

Don't show or mention Color Mode or dark mode. Don't imply text wraps or truncates, that rows or the card are pressable or selectable, that `showInfo` alone is a button, or that any mode restyles the card. Don't show `children` with literal colours.
