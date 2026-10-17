# Table source evidence

Package, Figma, and Storybook evidence for the Table guide (board ticket #89, Design documentation — Marcin; Storybook coverage — Biscuit, done).

## Checked

Checked 12 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-636f3f5` (Biscuit's `main` at 636f3f5). `npm run coin:status` shows one newer upstream commit, c1fa197c (12 October), which touches no Table file; the last Table change is 452ceb45 (31 August). `Table.tsx`, `Table.mdx`, and `Table.stories.tsx` on `main` are identical to 636f3f5.

Re-checked 17 October 2026 for the #264 publish: the docs now install mirror tag `v0.1.78-a116616` (Biscuit's `main` at a116616, 16 October), which carries 7020bf9's `Table.tsx` changes. Body text colour is set after the token colour (`bodyTextColor`), so Page type JioPlus no longer paints white on the white cells; text cells default to Weight Regular only when no Weight mode is set (Table.tsx:98-105); grid roles come from `gridRole()` (Table.tsx:112-116): `table`, `rowgroup`, `row`, `columnheader`, `cell`. With `onRowPress` a row stays `role="row"`, gets `tabIndex 0` on the web, activates with Enter or Space, and fades to 60% while pressed (Table.tsx:342-356). Re-test on #264: JioPlus body text rgb(0, 0, 0); Weight Bold body cells 800; table, rowgroup, 3 rows, 3 columnheaders, 6 cells. `Table.mdx` on main is the handwritten page since a463361.

## Sources

- Package: `src/components/Table/Table.tsx` (611 lines); exports `Table` (with statics `Table.Header`, `.HeaderCell`, `.Body`, `.Row`, `.Cell`), `TableHeader`, `TableHeaderCell`, `TableBody`, `TableRow`, `TableCell`, and types `TableProps`, `TableColumn`, `TableCellAlign` (`src/components/index.ts:325-341`).
- Figma: [Coin Components Library · Table](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=5732-3710), node `5732:3710`, page “Table” (5756:643). One plain component, 720 × 190, no variants or properties: a slot holding a full-width header (“Table header”, one cell, 38 px, `#f5f5f5`, 14/600 black, padding 12) and 4 × 4 `table-cell` instances (180 × 38, white, 1 px `#eeeeee` right and bottom, padding 12, text 14/16 weight 400, letter-spacing −0.5). No line between header and body; no outer top or left border, radius, or shadow. Collections bound: Table Cell, Table Header, Text.
- Storybook (published `index.json`): docs `components-table--docs`; stories `--default`, `--column-alignment-and-widths`, `--custom-cell-render`, `--pressable-rows`, `--scrollable`, `--vertical-scroll`, `--horizontal-and-vertical-scroll`, `--uniform-column-width`, `--trim-outer-borders`, `--composition`. The published page is the old generated page and matches 636f3f5.
- Biscuit's #89 comment (12 October): “Storybook page rewritten to the Button outline … data-driven and composition APIs, scroll, pinned header, and … the theme provider does not reach the table unless modes is passed.” Not found: `Table.mdx` on `main` and the published page are the old page without the handwritten marker or the Button outline (#264).
- CompareTable is a different component (selection cards plus accordion sections) built on Table's parts; not covered here.

## Contract

- Data-driven: `columns` (`key`, `header` (defaults to the key), `align` `left | center | right` (left), `headerAlign` (= align), `width`, `flex` (1), `render(row, index)`), `data`, `showHeader` (true), `scrollable` (false), `maxHeight`, `columnWidth`, `trimOuterBorders` (false), `onRowPress(row, index)`, `getRowKey`, `accessibilityLabel`, `modes`, `style`.
- Composition: `children` of `Table.Header` › `Table.HeaderCell` (`align`, `width`, `flex`) and `Table.Body` › `Table.Row` (`onPress`) › `Table.Cell` (`align`, `width`, `flex`, `isLastColumn`, `isLastRow`). With `children`, `columns`, `data`, and `showHeader` are ignored. Same look; only a direct `Table.Header` child is pinned by `maxHeight`.
- Width: a column's `width` beats `columnWidth`, which beats `flex`. Flex cells shrink (`min-width: 0`) and wrap; fixed widths don't shrink, and the table is `overflow: hidden`, so fixed widths wider than the host are cut off unless `scrollable` is on.
- `scrollable` wraps the table in a horizontal scroller with the scrollbar hidden. `maxHeight` scrolls the body under the header (pinned vertically); with both, the header scrolls sideways with the body.
- `onRowPress` makes each row focusable and pressable (a `row`, not a button, since a116616); pressed rows fade to 60% opacity. `data={[]}` renders the header only; there is no empty state.
- Cells: strings and numbers render through Coin `Text` (body) or token-styled header text; `null`, `undefined`, and booleans render empty; elements returned by `render` get the table's `modes` merged under their own (`cloneChildrenWithModes`). Right alignment is a style (Text offers Left and Center only). No truncation; text wraps.
- Not supported: striping, hover, selection, sorting, sticky first column, row height, per-cell background, outer border, radius, empty state.

## Modes and tokens

- Table never reads `JFSThemeProvider`; modes reach it only through its `modes` prop (and Storybook's toolbar Color Mode doesn't reach it). Confirmed by rendering inside a provider.
- Own tokens are single-mode (Table Cell, Table Header, mode Default): cell background `#ffffff`, border `#eeeeee` 1 px, padding 12/12; header background `#f5f5f5`, label `#000000` 14/600 JioType Var, line height 20 (hard-coded), divider under the header `tableHeader/border/color` `#eeeeee`, padding 12/12. `tableCell/label/*` exist but aren't read.
- Modes passed to the table reach only body text (through Text): Color Mode, Context, Page type, Text Appearance, Text Sizes, Weight (Storybook offers one select each).
  - Text Appearance (MainPage/SubPage): Neutral `#000000`, Primary `#cea15a`, Secondary `#5d00b5`, Tertiary `#026b9a`, Success `#0f5e0d`, Warning `#a1420a`, Error `#96001a`. The header stays black.
  - Text Sizes (Context Default): Small 12/16, Medium 14/17 (rendered), Large 18/24.
  - Context: Default and Nudge&Alert unchanged; ListItem Medium 12/14, Large 26/26; CTACard Medium 8/8.
  - Weight: string and number cells are Regular 400 unless a Weight mode is set; since a116616 Weight reaches them (#264, fixed; before, they were forced to Regular).
  - Page type JioPlus: the Text tokens resolve to `#ffffff`, but since a116616 the table sets its own body colour, so values stay dark on the white cells (#264, fixed).
- Arithmetic (not measured): body row 12 + 17 + 12 + 1 = 42 px at Medium; header 12 + 20 + 12 + 1 = 45 px. Figma rows are 38 px.

## Web render

`div[role="table"]` (width 100%; not when `scrollable`) › header row `div` (child 1) › header cells › `div[dir="auto"]`; body `div` (child 2) › rows › cells › Coin Text `div[dir="auto"]`. With `maxHeight`, child 2 is the scroller. No `testID` anywhere; on c1fa197 no `row`, `cell`, or `columnheader` roles and pressable rows were `button` elements (#264); since a116616 the header and body are `rowgroup`s of `row`s with `columnheader` and `cell` children.

## Storybook hosting

Every story sits in a white `View` 360 wide (320 for the scroll stories) with 16 px padding. Sample data: holdings HDFC Bank 120 / ₹1,98,400 / +2.4%, Reliance 64 / ₹1,52,900 / −0.8%, Infosys 210 / ₹3,10,500 / +1.1%, TCS 48 / ₹1,84,200 / +0.3% (`MANY_HOLDINGS` adds ITC, SBI, Axis Bank, Wipro, HUL, Bajaj Finance); columns Asset, Units, Value, Change, numbers right-aligned. The docs host tables on the kit's white `Surface` (360 wide, 12 px padding), the closest match.

## Discrepancies

- Figma's header is one full-width cell; the code draws one header cell per column. Figma has no divider under the header; the code draws one. Figma rows are 38 px; the code's are about 42 (body) and 45 (header). Alignment, widths, and scrolling exist only in code.
- Code Connect maps the component to a Table with bare `Text` children, which renders a plain stack, not rows and cells.
- The Custom Cell Render story uses raw React Native `Text` with hard-coded colours; the guide uses Coin `Text` with Text Appearance instead.
- The Uniform Column Width story's four 90 px columns need 360 px inside a 328 px host, so its last column is cut off.

## Limits

- Light only. Weight and Page type JioPlus are shown as they ship (fixed in a116616, #264).
- Not shown as designer settings: `getRowKey`, `accessibilityLabel`, `style`, the composition API (same look; developer choice).

## Coin gaps

- #264 (Component Fix, To do, Component Bug; Mr. Biscuit): Page type JioPlus makes body text white on white cells; no row, cell, or columnheader roles on the web (pressable rows are buttons); Weight is ignored by text cells; the Storybook rewrite described on #89 isn't on `main`.

## Review 12 October 2026

Checked in Chrome at 1280 and 390 px. The Anatomy specimen measures 334 × 188 (three rows); a one-line body row is 42 px and the header 45 px, as computed; “HDFC Bank” wraps in four equal columns, making its row 59 px. In a 240 px host each column keeps about 30 px for text and react-native-web breaks words and numbers mid-word (no truncation exists). First fix round: the playground's seven-option appearance control didn't fit (now the four brand appearances, with a Status appearances card for Success, Warning, and Error); the Sizing row mark moved to a one-line row; the Do & Don'ts use three columns so values don't break in their narrower previews, and the fixed-width pair compares flex columns with 130 px columns.
