# Table

> Coin agent pack 0.1.78+22 (pilot). Generated from `components/table.json`; the JSON is the source of truth.

- **State:** flagged (2 flags, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `622cd82` · built 2026-10-31T01:10:13Z
- **Category:** data (for discovery only, not a limit on composition) · **Tags:** data table, grid, holdings table, rows and columns
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=table) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=5732-3710) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-table--docs)

Use a Table to compare a few values across rows, such as holdings, with columns that line up and numbers aligned right.

## Use when

- **recommended** Compare a few values across rows, such as holdings, with columns that line up and numbers aligned right.  
  _From summary: “Use a Table to compare a few values across rows, such as holdings, with columns that line up and numbers aligned right.”_
- **recommended** Line values up so they can be compared at a glance.  
  _From corePrinciple: “Line values up so they can be compared at a glance.”_

## Avoid when

_None in the guide._

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Header row | Grey row of column names; it stays put when the rows scroll. | no | anatomy: “Grey row of column names; it stays put when the rows scroll.” |
| Column name | 14 px semibold, aligned like the values below it. | no | anatomy: “14 px semibold, aligned like the values below it.” |
| Row | One record, such as one holding; it can be pressable. | no | anatomy: “One record, such as one holding; it can be pressable.” |
| Cell | White, 12 px padding, with 1 px lines on its right and below. | no | anatomy: “White, 12 px padding, with 1 px lines on its right and below.” |
| Number | Right-aligned, so digits line up down the column. | no | anatomy: “Right-aligned, so digits line up down the column.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `children` | `ReactNode` | types |

## Placement

- **recommended** A table fills its host's width.  
  _From sizing: “A table fills its host’s width.”_
- **recommended** In a 240 px host each column keeps about 30 px for text, so words and numbers break apart: use fewer columns or sideways scroll.  
  _From sizing: “In a 240 px host each column keeps about 30 px for text, so words and numbers break apart. Use fewer columns or sideways scroll.”_

## Configuration

- **recommended** Columns share the width unless one gets a flex or a fixed width, and each sets its own alignment.  
  _From configuration: “Columns share the width unless one gets a flex or a fixed width, and each sets its own alignment.”_
- **recommended** In the guide's Default, columns share the width equally, and the number columns are set to align right so their digits line up.  
  _From configuration: “Columns share the width equally; numbers sit right so their digits line up.”_
- **recommended** A column's flex gives it more room and its width fixes it: a fixed width beats flex (in the guide, Asset takes twice the room and Units keeps a fixed 70 px).  
  _From configuration: “Asset takes twice the room and Units keeps a fixed 70 px; a fixed width beats flex.”_
- **recommended** `columnWidth`: columnWidth gives every column, header and body, the same fixed width; a column's own width still takes precedence. Leave it out to let columns flex.  
  _From fact `/facts/props/8` (columnWidth, source evidence)_
- **recommended** `showHeader` = `false`: Turn the header off (showHeader false) when a title above already explains the values: only the rows remain.  
  _From configuration: “Only the rows remain, for values that a title above already explains.”_
- **recommended** `trimOuterBorders` = `true`: For a table inside a card, trimOuterBorders drops the outer lines of the last column and the last row.  
  _From configuration: “The last column and the last row drop their outer lines, for a table inside a card.”_
- **recommended** A column can render its own cells: the guide's Change column renders Coin Text, green for gains and red for losses.  
  _From configuration: “The Change column renders Coin Text, here green for gains and red for losses.”_
- **recommended** `modes`: Modes on the table reach its body text only.  
  _From configuration: “Modes on the table reach its body text only”_
- **recommended** `Weight` = `Bold`: Weight reaches the text cells: Bold makes every value bold. With no Weight they stay Regular.  
  _From configuration: “Weight reaches the text cells: Bold makes every value bold. With no Weight they stay Regular.”_
- **recommended** `Context` = `ListItem`: Context retunes text sizes for where the table sits: under ListItem, Medium text is 12 px.  
  _From configuration: “Context retunes text sizes for where the table sits: under ListItem, Medium text is 12 px.”_
- **recommended** `Page type` = `JioPlus`: On a JioPlus page (Page type JioPlus) the values stay dark and readable on the white cells.  
  _From configuration: “The values stay dark and readable on the white cells.”_
- **recommended** `scrollable`: Fixed widths that add up to more than the host need sideways scroll (scrollable), or the last column is cut off.  
  _From sizing: “Fixed widths that add up to more than the host need sideways scroll, or the last column is cut off.”_
- **discouraged** Don't fix widths that don't fit: three 130 px columns need 390 px; without scroll the last one is cut off.  
  _From doDont: “Three 130 px columns need 390 px; without scroll the last one is cut off.”_
- **recommended** `maxHeight`: A maximum height (maxHeight) scrolls the rows under a pinned header.  
  _From sizing: “A maximum height scrolls the rows under a pinned header.”_
- **recommended** `maxHeight`: With both sideways scroll and a maximum height, the header moves sideways with the rows but stays at the top.  
  _From sizing: “The header moves sideways with the rows but stays at the top.”_
- **recommended** `onRowPress`: On the guide's portfolio screen, pressing a row opens that holding; the screen handles the press through onRowPress.  
  _From inContext: “Pressing a row opens that holding; the screen handles the press.”_

## Content

- **recommended** Name each column in a word or two and format values before they reach the table, with currency symbols, separators, and signs.  
  _From content: “Name each column in a word or two and format values before they reach the table, with currency symbols, separators, and signs.”_
- **recommended** Right-align numbers and keep text left.  
  _From content: “Right-align numbers and keep text left.”_
- **recommended** Cells wrap instead of cutting text off, so keep values short.  
  _From content: “Cells wrap instead of cutting text off, so keep values short.”_
- **recommended** Colour single values: Coin Text in the Change column marks gains and losses.  
  _From doDont: “Coin Text in the Change column marks gains and losses.”_

Good: “Date”, “Paid to”, “Amount”, “₹1,240”, “+2.4%”

## States

| State | When | From |
| --- | --- | --- |
| Static rows | Rows only show values; they can't be focused or pressed. | states: “Rows only show values; they can't be focused or pressed.” |
| Pressable rows | Each row takes focus and a press: it fades to 60% while pressed and tells the screen which holding it is. | states: “Each row takes focus and a press: it fades to 60% while pressed and tells the screen which holding it is.” |
| No rows | Only the header shows. Put an Empty State next to it to explain why. | states: “Only the header shows. Put an Empty State next to it to explain why.” |

## Accessibility

- **recommended** `onRowPress`: When the screen handles a row press, every row takes focus and a press and fades while pressed; screen readers still hear it as a row.  
  _From states: “When the screen handles a row press, every row takes focus and a press and fades while pressed; screen readers still hear it as a row.”_
- **recommended** On the web screen readers hear the header cells, rows, and cells as a table, with pressable rows still rows.  
  _From sources: “on the web screen readers hear the header cells, rows, and cells as a table, with pressable rows still rows.”_
- **recommended** `onRowPress`: A pressable row activates with Enter or Space and fades to 60% while pressed.  
  _From evidence: “With `onRowPress` a row stays `role="row"`, gets `tabIndex 0` on the web, activates with Enter or Space, and fades to 60% while pressed”_
- **recommended** `accessibilityLabel`: accessibilityLabel is the accessibility label for the table container.  
  _From fact `/facts/props/10` (accessibilityLabel, source types)_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Right-align numbers | Left-align numbers | Ragged digits make values hard to compare down the column. |
| Let columns share the width | Fix widths that don't fit | Three 130 px columns need 390 px; without scroll the last one is cut off. |

## Examples

### Holdings on a portfolio screen, the guide's In context: a heading over a Table whose Change column renders Coin Text, green for gains and red for losses (the Text Appearance comes from each value, as the guide's Do “Colour single values” shows); pressing a row opens that holding, and the screen handles the press. The empty press handler stands for the screen's own navigation.

```tsx
<VStack>
  <Text>Your holdings</Text>
  <Table
    columns={[
      { key: 'asset', header: 'Asset' },
      { key: 'units', header: 'Units', align: 'right' },
      { key: 'value', header: 'Value', align: 'right' },
      {
        key: 'change',
        header: 'Change',
        align: 'right',
        render: (row) => (
          <Text modes={{ 'Text Appearance': row.change.startsWith('-') ? 'Error' : 'Success' }}>{row.change}</Text>
        ),
      },
    ]}
    data={[
      { asset: 'HDFC Bank', units: '120', value: '₹1,98,400', change: '+2.4%' },
      { asset: 'Reliance', units: '64', value: '₹1,52,900', change: '-0.8%' },
      { asset: 'Infosys', units: '210', value: '₹3,10,500', change: '+1.1%' },
      { asset: 'TCS', units: '48', value: '₹1,84,200', change: '+0.3%' },
    ]}
    onRowPress={(row) => {}}
  />
</VStack>
```

_From inContext: “The portfolio screen lists holdings with gains in green and losses in red. Pressing a row opens that holding; the screen handles the press.”_

### Default, from the guide's Configuration: four columns share the width equally, and the three number columns are right-aligned so their digits line up.

```tsx
<Table
  columns={[
    { key: 'asset', header: 'Asset' },
    { key: 'units', header: 'Units', align: 'right' },
    { key: 'value', header: 'Value', align: 'right' },
    { key: 'change', header: 'Change', align: 'right' },
  ]}
  data={[
    { asset: 'HDFC Bank', units: '120', value: '₹1,98,400', change: '+2.4%' },
    { asset: 'Reliance', units: '64', value: '₹1,52,900', change: '-0.8%' },
    { asset: 'Infosys', units: '210', value: '₹3,10,500', change: '+1.1%' },
    { asset: 'TCS', units: '48', value: '₹1,84,200', change: '+0.3%' },
  ]}
/>
```

_From configuration: “Columns share the width equally; numbers sit right so their digits line up.”_

### Column widths, from the guide's Configuration: Asset takes twice the room (flex 2), Units keeps a fixed 70 px, centred, and Value flexes, right-aligned; a fixed width beats flex.

```tsx
<Table
  columns={[
    { key: 'asset', header: 'Asset', flex: 2 },
    { key: 'units', header: 'Units', width: 70, align: 'center' },
    { key: 'value', header: 'Value', align: 'right' },
  ]}
  data={[
    { asset: 'HDFC Bank', units: '120', value: '₹1,98,400', change: '+2.4%' },
    { asset: 'Reliance', units: '64', value: '₹1,52,900', change: '-0.8%' },
    { asset: 'Infosys', units: '210', value: '₹3,10,500', change: '+1.1%' },
    { asset: 'TCS', units: '48', value: '₹1,84,200', change: '+0.3%' },
  ]}
/>
```

_From configuration: “Asset takes twice the room and Units keeps a fixed 70 px; a fixed width beats flex.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `columns` | `TableColumn<T>[]` |  |  |  | types | Column definitions for the data-driven API. |
| `data` | `T[]` |  |  |  | evidence (2026-10-12) | An empty data array renders the header only; there is no empty state. Declared: Row records, one per table row. |
| `children` | `React.ReactNode` |  |  |  | evidence (2026-10-12) | Composition (Table.Header, Table.HeaderCell, Table.Body, Table.Row, Table.Cell): with children, columns, data and showHeader are ignored. Same look; a developer's choice, not a designer setting. Declared: Composition children (`Table.Header`, `Table.Body`, `Table.Row`, `Table.Cell`, `Table.HeaderCell`). When provided, `columns`/`data` are ignored and the children are rendered as-is. Maps to the Figma Slot. |
| `showHeader` | `boolean` |  | `true` |  | types | Show the header row in the data-driven API. Default true, from the component source. |
| `getRowKey` | `(row: T, index: number) => React.Key` |  |  |  | types | Resolve a stable key per row. Defaults to the row index. |
| `onRowPress` | `(row: T, index: number) => void` |  |  |  | evidence (2026-10-17) | With onRowPress each row stays a row (role row), is focusable on the web, activates with Enter or Space, and fades to 60% while pressed. Declared: Called when a row is pressed (data-driven API). Makes rows pressable. |
| `scrollable` | `boolean` |  | `false` |  | evidence (2026-10-12) | Wraps the table in a horizontal scroller with the scrollbar hidden. Declared: Wrap the table in a horizontal `ScrollView`. Use with fixed-width columns for wide tables that exceed the viewport on mobile. Default false, from the component source. |
| `maxHeight` | `number` |  |  |  | evidence (2026-10-12) | Scrolls the body under the header, which stays pinned vertically; with scrollable as well, the header scrolls sideways with the body. Declared: Cap the body height (px) and scroll rows vertically. The header stays pinned above the scroll region (data-driven and composition with `Table.Header`). Combine with `scrollable` for wide + tall tables on mobile. |
| `columnWidth` | `number` |  |  |  | evidence (2026-10-12) | A column's width beats columnWidth, which beats flex. Declared: Fixed width (px) applied to every column — header and body alike — so all columns share the same width. An explicit per-column `width` (on `TableColumn`, or on an individual `Table.Cell`/`Table.HeaderCell`) still takes precedence when set. Omit to let columns flex to share the available space. |
| `trimOuterBorders` | `boolean` |  | `false` |  | types | When `true`, the data-driven API hides the right divider on the last column and the bottom divider on the last row (flush outer edge). Figma draws dividers on every cell — leave this `false` (default) to match. Composition consumers can still set `isLastColumn` / `isLastRow` per cell. Default false, from the component source. |
| `accessibilityLabel` | `string` |  |  |  | types | Accessibility label for the table container. |
| `modes` | `Modes` |  |  |  | types | Design token modes for theming (e.g. `{ "Color Mode": "Light" }`). |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Override the outer container style. |
| `Table.Header` | `component` |  |  |  | types | A static sub-component of Table. Its own props: children, modes, style. |
| `Table.HeaderCell` | `component` |  |  |  | types | A static sub-component of Table. Its own props: children, align, width, flex, modes, style. |
| `Table.Body` | `component` |  |  |  | types | A static sub-component of Table. Its own props: children, modes, style. |
| `Table.Row` | `component` |  |  |  | types | A static sub-component of Table. Its own props: children, onPress, modes, style. |
| `Table.Cell` | `component` |  |  |  | types | A static sub-component of Table. Its own props: children, align, width, flex, isLastColumn, isLastRow, modes, style. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection Table reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context` | `mode collection` | Default, Nudge&Alert, CTACard, ListItem | `"Default"` |  | types | A token collection Table reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection Table reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Text Appearance` | `mode collection` | Neutral, Primary, Secondary, Tertiary, Success, Warning, Error | `"Neutral"` |  | types | A token collection Table reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Text Sizes` | `mode collection` | Medium, Small, Large | `"Medium"` |  | types | A token collection Table reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Weight` | `mode collection` | Medium, Regular, Bold | `"Medium"` |  | types | A token collection Table reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types | Composition children (`Table.Header`, `Table.Body`, `Table.Row`, `Table.Cell`, `Table.HeaderCell`). When provided, `columns`/`data` are ignored and the children are rendered as-is. Maps to the Figma Slot. |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onRowPress` | `(row: T, index: number) => void` |  |  |  | types | Called when a row is pressed (data-driven API). Makes rows pressable. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- Figma's Table is one 720 × 190 component with one full-width header; in code each column has its own header cell, a line runs under the header, and rows are a little taller; widths, alignment, and scrolling exist only in code. _(evidence, 2026-10-17)_
- Figma rows are 38 px; the code's are about 42 px (body) and 45 px (header). _(evidence, 2026-10-12)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/avoidWhen` · trace-check: The guide gives no avoidWhen guidance; left empty rather than guessed.
- `(whole entry)` · human: The guide's Sources note was checked on 17 October on 0.1.78-a116616, whose Table.tsx is identical to the installed dbe0e02, but the #264 fix in that build also stopped Text Appearance from reaching the table's own values: every string or number body cell is Coin Text given colour: bodyTextColor(modes), the tableHeader/label/color token, after Text's token colour (Table.tsx lines 108–110 and 143; Text.tsx line 153 puts style after the token colour), and that token is black in every mode, so Success, Warning, Error and the brand appearances set on the table leave the values black. Only Coin Text that a column renders itself still takes its own Text Appearance (or the table's, through the modes merged into it). The 17 October re-check measured Weight, JioPlus and the roles, not Text Appearance. This entry follows the installed package and leaves out the guide sentences it contradicts: Configuration's Status appearances card (“Success, Warning, and Error tint every body cell green, amber, or red; to mark one value, render your own cells.”), the Configuration description's “text size and the brand appearances are in the playground above”, the third Do & Don't pair (its Don't “Colour the whole table”: “Text appearance on the table tints every value, so nothing stands out.”), and the evidence's 12 October Text Appearance colours for body text. Guide fix #534 (Documentation, To do), filed by this run; it also asks Marcin whether black values under every Text Appearance are intended or a Component Bug. Re-extract once #534 is fixed and published. Added by Claude Code in the overnight run agentpack-batch12, for Marcin to confirm.
