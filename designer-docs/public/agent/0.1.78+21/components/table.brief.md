# Table (brief)

> Coin agent pack 0.1.78+21 · flagged · full entry: `components/table.md` (sources, all facts, flags)

Use a Table to compare a few values across rows, such as holdings, with columns that line up and numbers aligned right.

**Use when**
- Compare a few values across rows, such as holdings, with columns that line up and numbers aligned right.
- Line values up so they can be compared at a glance.

**Placement**
- A table fills its host's width.
- In a 240 px host each column keeps about 30 px for text, so words and numbers break apart: use fewer columns or sideways scroll.

**Key rules**
- Columns share the width unless one gets a flex or a fixed width, and each sets its own alignment.
- In the guide's Default, columns share the width equally, and the number columns are set to align right so their digits line up.
- A column's flex gives it more room and its width fixes it: a fixed width beats flex (in the guide, Asset takes twice the room and Units keeps a fixed 70 px).
- `columnWidth`: columnWidth gives every column, header and body, the same fixed width; a column's own width still takes precedence. Leave it out to let columns flex.
- `showHeader` = `false`: Turn the header off (showHeader false) when a title above already explains the values: only the rows remain.
- `trimOuterBorders` = `true`: For a table inside a card, trimOuterBorders drops the outer lines of the last column and the last row.
- A column can render its own cells: the guide's Change column renders Coin Text, green for gains and red for losses.
- `modes`: Modes on the table reach its body text only.

**Example:** Holdings on a portfolio screen, the guide's In context: a heading over a Table whose Change column renders Coin Text, green for gains and red for losses (the Text Appearance comes from each value, as the guide's Do “Colour single values” shows); pressing a row opens that holding, and the screen handles the press. The empty press handler stands for the screen's own navigation.

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

**Props:** `columns`, `data`, `children`, `showHeader`, `getRowKey`, `onRowPress`, `scrollable`, `maxHeight`, `columnWidth`, `trimOuterBorders`, `accessibilityLabel`, `modes`, `style`, `Table.Header`, `Table.HeaderCell`, `Table.Body`, `Table.Row`, `Table.Cell`. (* required)

**Modes it reads:** Color Mode, Context, Page type, Text Appearance, Text Sizes, Weight.

**Gaps (report, do not work around)**
- Figma's Table is one 720 × 190 component with one full-width header; in code each column has its own header cell, a line runs under the header, and rows are a little taller; widths, alignment, and scrolling exist only in code.
- Figma rows are 38 px; the code's are about 42 px (body) and 45 px (header).

Full entry: `components/table.md`. Links: `components/table.links.md`.
