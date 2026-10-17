# Table brief

slug: table · label: Table · public API: Table (+ Text for cells and the title; Surface from the kit)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=5732-3710 · storybook: docsUrl('table') · stories: Default=components-table--default, Column alignment and widths=components-table--column-alignment-and-widths, Custom cell render=components-table--custom-cell-render, Pressable rows=components-table--pressable-rows, Scrollable=components-table--scrollable, Vertical scroll=components-table--vertical-scroll, Horizontal and vertical scroll=components-table--horizontal-and-vertical-scroll, Uniform column width=components-table--uniform-column-width, Trim outer borders=components-table--trim-outer-borders, Composition=components-table--composition
checked: 17 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-a116616, Biscuit's main a116616; Weight, JioPlus and web roles fixed by #264)
icon: a rounded grid with a header line and one column line — `<><rect x="2" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M2 7.5h14M7.5 7.5V15" stroke="currentColor" strokeWidth="1.5" /></>`
keywords: data table, grid, holdings table, rows and columns

Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`; every Table gets `modes={{ ...LIGHT, …extra } as Modes}` (only the extra modes named below). `type Holding = { asset: string; units: string; value: string; change: string }`. `HOLDINGS` = HDFC Bank 120 ₹1,98,400 +2.4% · Reliance 64 ₹1,52,900 -0.8% · Infosys 210 ₹3,10,500 +1.1% · TCS 48 ₹1,84,200 +0.3%. `MANY` = HOLDINGS + ITC 300 ₹1,32,600 +0.6% · SBI 150 ₹1,21,800 -1.2% · Axis Bank 90 ₹1,05,300 +0.9% · Wipro 200 ₹96,400 -0.4% · HUL 40 ₹1,02,500 +0.2% · Bajaj Finance 15 ₹1,08,700 +1.8%.
`COLUMNS: TableColumn<Holding>[]` = Asset (`key: 'asset'`), Units, Value, Change (`units`, `value`, `change`, each `align: 'right'`). `FIXED` = COLUMNS with `width` 140, 90, 130, 90. `COLOURED` = COLUMNS whose Change column has `render: row => <Text modes={{ ...LIGHT, 'Text Appearance': row.change.startsWith('-') ? 'Error' : 'Success' } as Modes}>{row.change}</Text>`.
“Host” = `<Surface width="wide"><div className="coin-new-stack">…</div></Surface>` (white like Storybook's host; the column stack lets a scrolling table fill it). “Narrow host” = the same with `width="narrow"`. Every example below is a Table in a Host unless stated.
Selectors: `T = '[role="table"]'`; header row `${T} > div:first-child`; Units header text `${T} > div:first-child > div:nth-child(2) [dir="auto"]`; second row `${T} > div:nth-child(2) > div:nth-child(2)`; its Change cell `… > div:nth-child(4)`; last row's Value text `${T} > div:nth-child(2) > div:last-child > div:nth-child(3) [dir="auto"]`; first body row `${T} > div:nth-child(2) > div:first-child`, its first cell `… > div:first-child`.

## Overview
summary: Use a Table to compare a few values across rows, such as holdings, with columns that line up and numbers aligned right.
principle: Line values up so they can be compared at a glance.
playground: `.preview-stage` › Host › Table; stage label "Live Coin Table". Controls: OnOff "Header" (on) → `showHeader`; Segment "Scroll" `None | Sideways | Down | Both` (None) → None: COLUMNS + HOLDINGS; Sideways: FIXED + HOLDINGS + `scrollable`; Down: COLUMNS + MANY + `maxHeight={152}`; Both: FIXED + MANY + `scrollable` + `maxHeight={152}`; OnOff "Trim outer borders" (off) → `trimOuterBorders`; OnOff "Pressable rows" (off) → `onRowPress={row => setPressed(row.asset)}` when on; Segment "Text size" `Small | Medium | Large` (Medium) → `'Text Sizes'`; Segment "Text appearance" `Neutral | Primary | Secondary | Tertiary` (Neutral) → `'Text Appearance'` (seven options don't fit the panel; the status ones get a Configuration card). Readout title "Pressed row", value the last pressed asset or "None"; note when pressable: "Press a row: it fades while pressed and tells the screen which holding it is."; otherwise: "Rows are static. Turn on Pressable rows to open a holding from its row."

## Anatomy
header: Anatomy · title: A header row over rows of cells · description: Each column has a grey header cell and a white cell in every row, with 1 px lines between them. Strings and numbers render as Coin Text; a column can render its own content instead.
specimen: `<Anatomy surface="white" specimenWidth={334}>` › `<Table columns={COLUMNS} data={HOLDINGS.slice(0, 3)} modes={LIGHT} />`
parts:
1. Header row — Grey row of column names; it stays put when the rows scroll. — target: header row — side: left
2. Column name — 14 px semibold, aligned like the values below it. — target: Units header text — side: top
3. Row — One record, such as one holding; it can be pressable. — target: second row — side: left
4. Cell — White, 12 px padding, with 1 px lines on its right and below. — target: second row's Change cell — side: right
5. Number — Right-aligned, so digits line up down the column. — target: last row's Value text — side: bottom

## Configuration
header: Configuration · title: Columns, header, borders, and text modes · description: Columns share the width unless one gets a flex or a fixed width, and each sets its own alignment. The header and the outer lines can go. Modes on the table reach its body text only; text size and the brand appearances are in the playground above, and the header never changes.
Grid `coin-new-example-grid`, each an ExampleCard › Host › Table with HOLDINGS:
- Default — COLUMNS — lesson: Columns share the width equally; numbers sit right so their digits line up.
- Column widths — columns Asset (`flex: 2`), Units (`width: 70`, `align: 'center'`), Value (`align: 'right'`) — lesson: Asset takes twice the room and Units keeps a fixed 70 px; a fixed width beats flex.
- Without a header — COLUMNS, `showHeader={false}` — lesson: Only the rows remain, for values that a title above already explains.
- Trimmed outer borders — COLUMNS, `trimOuterBorders` — lesson: The last column and the last row drop their outer lines, for a table inside a card.
- Your own cells — COLOURED — lesson: The Change column renders Coin Text, here green for gains and red for losses.
- Status appearances — `<div className="coin-new-stack">` of three Tables, each COLUMNS, `data={[HOLDINGS[0]]}`, `showHeader={false}`, with modes `'Text Appearance'` `'Success'`, `'Warning'`, and `'Error'` — lesson: Success, Warning, and Error tint every body cell green, amber, or red; to mark one value, render your own cells.
- Bold weight — COLUMNS, modes `Weight: 'Bold'` — lesson: Weight reaches the text cells: Bold makes every value bold. With no Weight they stay Regular.
- List item context — COLUMNS, modes `Context: 'ListItem'` — lesson: Context retunes text sizes for where the table sits: under ListItem, Medium text is 12 px.
- JioPlus page — COLUMNS, modes `'Page type': 'JioPlus'` — lesson: The values stay dark and readable on the white cells.

## States
header: States · title: Static or pressable rows · description: Rows are static by default. When the screen handles a row press, every row takes focus and a press and fades while pressed; screen readers still hear it as a row. With no rows, only the header shows: the table has no empty message of its own.
Grid `coin-new-example-grid`:
- Static rows — COLUMNS, HOLDINGS — lesson: Rows only show values; they can't be focused or pressed.
- Pressable rows — COLUMNS, HOLDINGS, `onRowPress={noop}` — lesson: Each row takes focus and a press: it fades to 60% while pressed and tells the screen which holding it is.
- No rows — COLUMNS, `data={[]}` — lesson: Only the header shows. Put an Empty State next to it to explain why.

## Sizing
header: Sizing · title: Fills its host, scrolls when it can't fit · description: A table fills its host's width. Cells have 12 px of padding and 1 px lines; rows are about 42 px tall at Medium text and the header about 45 px. Fixed widths that add up to more than the host need sideways scroll, or the last column is cut off. A maximum height scrolls the rows under a pinned header.
Measured diagram first: `<Anatomy legend={false} surface="white" specimenWidth={334} marks={[{ kind: 'size', target: T, side: 'right', label: 'both' }, { kind: 'size', target: second row, side: 'left' }, { kind: 'padding', target: `${second row} > div:first-child` }]}>` › the Anatomy specimen (the second row, Reliance, is one line tall; HDFC Bank wraps).
Then grid `coin-new-example-grid`:
- Scrolls sideways — FIXED, HOLDINGS, `scrollable` — lesson: Columns keep 140, 90, 130, and 90 px; scroll sideways to reach Change. No scrollbar shows.
- Scrolls down — COLUMNS, MANY, `maxHeight={152}` — lesson: Ten holdings in 152 px: the rows scroll and the header stays put.
- Both ways — FIXED, MANY, `scrollable`, `maxHeight={152}` — lesson: The header moves sideways with the rows but stays at the top.
- Narrow host — Narrow host, COLUMNS, HOLDINGS — lesson: In a 240 px host each column keeps about 30 px for text, so words and numbers break apart. Use fewer columns or sideways scroll.

## Content
header: Content · title: Short headers, formatted values · description: Name each column in a word or two and format values before they reach the table, with currency symbols, separators, and signs. Right-align numbers and keep text left. Cells wrap instead of cutting text off, so keep values short.
One ExampleCard "Recent payments" › Host › Table with columns Date (`key: 'date'`), Paid to (`key: 'payee'`), Amount (`key: 'amount'`, `align: 'right'`) and rows 12 Oct · Ravi Stores · ₹250; 11 Oct · Jio Mart · ₹1,240; 9 Oct · Electricity bill · ₹2,180. Description: "Three short headers; amounts carry ₹ and separators and sit right."

## In context
header: In context · title: Holdings on a portfolio screen · description: The portfolio screen lists holdings with gains in green and losses in red. Pressing a row opens that holding; the screen handles the press.
Composition in `.coin-new-context`: Host › `<Text modes={{ ...LIGHT, 'Text Sizes': 'Large' } as Modes}>Your holdings</Text>` then Table COLOURED + HOLDINGS with `onRowPress={row => setStatus(`Opened ${row.asset}`)}`. Below the host, `<p className="coin-new-readout" role="status">`, starting "Press a holding to open it".

## Do & Don'ts
header: Do & Don’ts · title: Make values easy to compare · description: Each pair shows a table that reads at a glance next to one that makes people work.
Every preview is a Host with HOLDINGS and three columns, so values never break in the narrower previews: `SHORT` = Asset, Value (`align: 'right'`), Change (`align: 'right'`); `SHORT_COLOURED` = SHORT with COLOURED's Change render.
- Do Right-align numbers: Digits line up, so ₹1,98,400 and ₹3,10,500 compare at a glance. — SHORT | Don't Left-align numbers: Ragged digits make values hard to compare down the column. — SHORT with every `align` removed
- Do Let columns share the width: Flex columns always fit, so every value shows. — SHORT | Don't Fix widths that don't fit: Three 130 px columns need 390 px; without scroll the last one is cut off. — SHORT, `columnWidth={130}`
- Do Colour single values: Coin Text in the Change column marks gains and losses. — SHORT_COLOURED | Don't Colour the whole table: Text appearance on the table tints every value, so nothing stands out. — SHORT, modes `'Text Appearance': 'Secondary'`

## Sources
header: Sources · title: Use the public Table contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (16 October build) from the team’s private package repository. Figma’s Table is one 720 × 190 component: a full-width header over a grid of white cells with 1 px grey lines. In code each column has its own header cell, a line runs under the header, and rows are a little taller; widths, alignment, and scrolling exist only in code. Developers can build the same table from data or from its parts. The app’s theme doesn’t reach the table, so it takes its modes directly, and they change body text only. Since the #264 fix, Weight reaches text cells, Page type JioPlus keeps them dark on white, and on the web screen readers hear the header cells, rows, and cells as a table, with pressable rows still rows. Biscuit’s main has the handwritten Storybook page.

## Limits
Do not show `getRowKey`, `accessibilityLabel`, `style`, the composition API (`Table.Header` …), or CompareTable. Never use raw React Native Text or hard-coded colours in cells; coloured values are Coin Text with Text Appearance. Show Weight and Page type JioPlus as they ship; never restyle cells to hide it. Don't imply striping, sorting, selection, a sticky first column, an empty state, or truncation.
