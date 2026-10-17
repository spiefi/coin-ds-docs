import { useState, type ReactNode } from 'react'
import { Table, Text, type Modes, type TableColumn } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, Segment, Sources, Surface, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=5732-3710'
const LIGHT = { 'Color Mode': 'Light' } as Modes

type Holding = { asset: string; units: string; value: string; change: string }
const HOLDINGS: Holding[] = [
  { asset: 'HDFC Bank', units: '120', value: '₹1,98,400', change: '+2.4%' },
  { asset: 'Reliance', units: '64', value: '₹1,52,900', change: '-0.8%' },
  { asset: 'Infosys', units: '210', value: '₹3,10,500', change: '+1.1%' },
  { asset: 'TCS', units: '48', value: '₹1,84,200', change: '+0.3%' },
]
const MANY: Holding[] = [
  ...HOLDINGS,
  { asset: 'ITC', units: '300', value: '₹1,32,600', change: '+0.6%' },
  { asset: 'SBI', units: '150', value: '₹1,21,800', change: '-1.2%' },
  { asset: 'Axis Bank', units: '90', value: '₹1,05,300', change: '+0.9%' },
  { asset: 'Wipro', units: '200', value: '₹96,400', change: '-0.4%' },
  { asset: 'HUL', units: '40', value: '₹1,02,500', change: '+0.2%' },
  { asset: 'Bajaj Finance', units: '15', value: '₹1,08,700', change: '+1.8%' },
]

const COLUMNS: TableColumn<Holding>[] = [
  { key: 'asset', header: 'Asset' },
  { key: 'units', header: 'Units', align: 'right' },
  { key: 'value', header: 'Value', align: 'right' },
  { key: 'change', header: 'Change', align: 'right' },
]
const FIXED: TableColumn<Holding>[] = COLUMNS.map((column, i) => ({ ...column, width: [140, 90, 130, 90][i] }))
const COLOURED: TableColumn<Holding>[] = COLUMNS.map(column => column.key === 'change' ? {
  ...column,
  render: (row: Holding) => <Text modes={{ ...LIGHT, 'Text Appearance': row.change.startsWith('-') ? 'Error' : 'Success' } as Modes}>{row.change}</Text>,
} : column)
const SHORT: TableColumn<Holding>[] = COLUMNS.filter(column => column.key !== 'units')
const SHORT_COLOURED: TableColumn<Holding>[] = COLOURED.filter(column => column.key !== 'units')
const LEFT: TableColumn<Holding>[] = SHORT.map(({ align: _align, ...column }) => column)
const WIDTHS: TableColumn<Holding>[] = [
  { key: 'asset', header: 'Asset', flex: 2 },
  { key: 'units', header: 'Units', width: 70, align: 'center' },
  { key: 'value', header: 'Value', align: 'right' },
]

type Payment = { date: string; payee: string; amount: string }
const PAYMENT_COLUMNS: TableColumn<Payment>[] = [
  { key: 'date', header: 'Date' },
  { key: 'payee', header: 'Paid to' },
  { key: 'amount', header: 'Amount', align: 'right' },
]
const PAYMENTS: Payment[] = [
  { date: '12 Oct', payee: 'Ravi Stores', amount: '₹250' },
  { date: '11 Oct', payee: 'Jio Mart', amount: '₹1,240' },
  { date: '9 Oct', payee: 'Electricity bill', amount: '₹2,180' },
]

const T = '[role="table"]'
const HEADER_ROW = `${T} > div:first-child`
const SECOND_ROW = `${T} > div:nth-child(2) > div:nth-child(2)`

const noop = () => {}

function Host({ children, narrow = false }: { children: ReactNode; narrow?: boolean }) {
  return <Surface width={narrow ? 'narrow' : 'wide'}><div className="coin-new-stack">{children}</div></Surface>
}

type Scroll = 'None' | 'Sideways' | 'Down' | 'Both'
type Size = 'Small' | 'Medium' | 'Large'
type Appearance = 'Neutral' | 'Primary' | 'Secondary' | 'Tertiary'

function TableGuide() {
  const [showHeader, setShowHeader] = useState(true)
  const [scroll, setScroll] = useState<Scroll>('None')
  const [trim, setTrim] = useState(false)
  const [pressable, setPressable] = useState(false)
  const [size, setSize] = useState<Size>('Medium')
  const [appearance, setAppearance] = useState<Appearance>('Neutral')
  const [pressed, setPressed] = useState('None')
  const [status, setStatus] = useState('Press a holding to open it')

  const fixed = scroll === 'Sideways' || scroll === 'Both'
  const tall = scroll === 'Down' || scroll === 'Both'

  const specimen = <Table columns={COLUMNS} data={HOLDINGS.slice(0, 3)} modes={LIGHT} />

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A header row over rows of cells',
      description: 'Each column has a grey header cell and a white cell in every row, with 1 px lines between them. Strings and numbers render as Coin Text; a column can render its own content instead.',
      body: <Anatomy surface="white" specimenWidth={334} parts={[
        { name: 'Header row', note: 'Grey row of column names; it stays put when the rows scroll.', target: HEADER_ROW, side: 'left' },
        { name: 'Column name', note: '14 px semibold, aligned like the values below it.', target: `${T} > div:first-child > div:nth-child(2) [dir="auto"]`, side: 'top' },
        { name: 'Row', note: 'One record, such as one holding; it can be pressable.', target: SECOND_ROW, side: 'left' },
        { name: 'Cell', note: 'White, 12 px padding, with 1 px lines on its right and below.', target: `${SECOND_ROW} > div:nth-child(4)`, side: 'right' },
        { name: 'Number', note: 'Right-aligned, so digits line up down the column.', target: `${T} > div:nth-child(2) > div:last-child > div:nth-child(3) [dir="auto"]`, side: 'bottom' },
      ]}>{specimen}</Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Columns, header, borders, and text modes',
      description: 'Columns share the width unless one gets a flex or a fixed width, and each sets its own alignment. The header and the outer lines can go. Modes on the table reach its body text only; text size and the brand appearances are in the playground above, and the header never changes.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Default" description="Columns share the width equally; numbers sit right so their digits line up."><Host><Table columns={COLUMNS} data={HOLDINGS} modes={LIGHT} /></Host></ExampleCard>
        <ExampleCard title="Column widths" description="Asset takes twice the room and Units keeps a fixed 70 px; a fixed width beats flex."><Host><Table columns={WIDTHS} data={HOLDINGS} modes={LIGHT} /></Host></ExampleCard>
        <ExampleCard title="Without a header" description="Only the rows remain, for values that a title above already explains."><Host><Table columns={COLUMNS} data={HOLDINGS} showHeader={false} modes={LIGHT} /></Host></ExampleCard>
        <ExampleCard title="Trimmed outer borders" description="The last column and the last row drop their outer lines, for a table inside a card."><Host><Table columns={COLUMNS} data={HOLDINGS} trimOuterBorders modes={LIGHT} /></Host></ExampleCard>
        <ExampleCard title="Your own cells" description="The Change column renders Coin Text, here green for gains and red for losses."><Host><Table columns={COLOURED} data={HOLDINGS} modes={LIGHT} /></Host></ExampleCard>
        <ExampleCard title="Status appearances" description="Success, Warning, and Error tint every body cell green, amber, or red; to mark one value, render your own cells."><Host><div className="coin-new-stack">{(['Success', 'Warning', 'Error'] as const).map(tone => <Table key={tone} columns={COLUMNS} data={[HOLDINGS[0]]} showHeader={false} modes={{ ...LIGHT, 'Text Appearance': tone } as Modes} />)}</div></Host></ExampleCard>
        <ExampleCard title="Bold weight" description="Weight reaches the text cells: Bold makes every value bold. With no Weight they stay Regular."><Host><Table columns={COLUMNS} data={HOLDINGS} modes={{ ...LIGHT, Weight: 'Bold' } as Modes} /></Host></ExampleCard>
        <ExampleCard title="List item context" description="Context retunes text sizes for where the table sits: under ListItem, Medium text is 12 px."><Host><Table columns={COLUMNS} data={HOLDINGS} modes={{ ...LIGHT, Context: 'ListItem' } as Modes} /></Host></ExampleCard>
        <ExampleCard title="JioPlus page" description="The values stay dark and readable on the white cells."><Host><Table columns={COLUMNS} data={HOLDINGS} modes={{ ...LIGHT, 'Page type': 'JioPlus' } as Modes} /></Host></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Static or pressable rows',
      description: 'Rows are static by default. When the screen handles a row press, every row takes focus and a press and fades while pressed; screen readers still hear it as a row. With no rows, only the header shows: the table has no empty message of its own.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Static rows" description="Rows only show values; they can't be focused or pressed."><Host><Table columns={COLUMNS} data={HOLDINGS} modes={LIGHT} /></Host></ExampleCard>
        <ExampleCard title="Pressable rows" description="Each row takes focus and a press: it fades to 60% while pressed and tells the screen which holding it is."><Host><Table columns={COLUMNS} data={HOLDINGS} onRowPress={noop} modes={LIGHT} /></Host></ExampleCard>
        <ExampleCard title="No rows" description="Only the header shows. Put an Empty State next to it to explain why."><Host><Table columns={COLUMNS} data={[]} modes={LIGHT} /></Host></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'Fills its host, scrolls when it can’t fit',
      description: 'A table fills its host’s width. Cells have 12 px of padding and 1 px lines; rows are about 42 px tall at Medium text and the header about 45 px. Fixed widths that add up to more than the host need sideways scroll, or the last column is cut off. A maximum height scrolls the rows under a pinned header.',
      body: <div className="coin-new-stack">
        <Anatomy legend={false} surface="white" specimenWidth={334} marks={[
          { kind: 'size', target: T, side: 'right', label: 'both' },
          { kind: 'size', target: SECOND_ROW, side: 'left' },
          { kind: 'padding', target: `${SECOND_ROW} > div:first-child` },
        ]}>{specimen}</Anatomy>
        <div className="coin-new-example-grid">
          <ExampleCard title="Scrolls sideways" description="Columns keep 140, 90, 130, and 90 px; scroll sideways to reach Change. No scrollbar shows."><Host><Table columns={FIXED} data={HOLDINGS} scrollable modes={LIGHT} /></Host></ExampleCard>
          <ExampleCard title="Scrolls down" description="Ten holdings in 152 px: the rows scroll and the header stays put."><Host><Table columns={COLUMNS} data={MANY} maxHeight={152} modes={LIGHT} /></Host></ExampleCard>
          <ExampleCard title="Both ways" description="The header moves sideways with the rows but stays at the top."><Host><Table columns={FIXED} data={MANY} scrollable maxHeight={152} modes={LIGHT} /></Host></ExampleCard>
          <ExampleCard title="Narrow host" description="In a 240 px host each column keeps about 30 px for text, so words and numbers break apart. Use fewer columns or sideways scroll."><Host narrow><Table columns={COLUMNS} data={HOLDINGS} modes={LIGHT} /></Host></ExampleCard>
        </div>
      </div>,
    },
    content: {
      header: 'Content', title: 'Short headers, formatted values',
      description: 'Name each column in a word or two and format values before they reach the table, with currency symbols, separators, and signs. Right-align numbers and keep text left. Cells wrap instead of cutting text off, so keep values short.',
      body: <ExampleCard title="Recent payments" description="Three short headers; amounts carry ₹ and separators and sit right."><Host><Table columns={PAYMENT_COLUMNS} data={PAYMENTS} modes={LIGHT} /></Host></ExampleCard>,
    },
    context: {
      header: 'In context', title: 'Holdings on a portfolio screen',
      description: 'The portfolio screen lists holdings with gains in green and losses in red. Pressing a row opens that holding; the screen handles the press.',
      body: <div className="coin-new-context">
        <Host>
          <Text modes={{ ...LIGHT, 'Text Sizes': 'Large' } as Modes}>Your holdings</Text>
          <Table columns={COLOURED} data={HOLDINGS} onRowPress={row => setStatus(`Opened ${row.asset}`)} modes={LIGHT} />
        </Host>
        <p className="coin-new-readout" role="status">{status}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Make values easy to compare',
      description: 'Each pair shows a table that reads at a glance next to one that makes people work.',
      body: <div className="coin-new-stack">
        <DoDont
          good={<Host><Table columns={SHORT} data={HOLDINGS} modes={LIGHT} /></Host>}
          bad={<Host><Table columns={LEFT} data={HOLDINGS} modes={LIGHT} /></Host>}
          goodTitle="Right-align numbers" goodCaption="Digits line up, so ₹1,98,400 and ₹3,10,500 compare at a glance."
          badTitle="Left-align numbers" badCaption="Ragged digits make values hard to compare down the column." />
        <DoDont
          good={<Host><Table columns={SHORT} data={HOLDINGS} modes={LIGHT} /></Host>}
          bad={<Host><Table columns={SHORT} data={HOLDINGS} columnWidth={130} modes={LIGHT} /></Host>}
          goodTitle="Let columns share the width" goodCaption="Flex columns always fit, so every value shows."
          badTitle="Fix widths that don't fit" badCaption="Three 130 px columns need 390 px; without scroll the last one is cut off." />
        <DoDont
          good={<Host><Table columns={SHORT_COLOURED} data={HOLDINGS} modes={LIGHT} /></Host>}
          bad={<Host><Table columns={SHORT} data={HOLDINGS} modes={{ ...LIGHT, 'Text Appearance': 'Secondary' } as Modes} /></Host>}
          goodTitle="Colour single values" goodCaption="Coin Text in the Change column marks gains and losses."
          badTitle="Colour the whole table" badCaption="Text appearance on the table tints every value, so nothing stands out." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Table contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="17 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('table')} stories={[
        { label: 'Default', id: 'components-table--default' },
        { label: 'Column alignment and widths', id: 'components-table--column-alignment-and-widths' },
        { label: 'Custom cell render', id: 'components-table--custom-cell-render' },
        { label: 'Pressable rows', id: 'components-table--pressable-rows' },
        { label: 'Scrollable', id: 'components-table--scrollable' },
        { label: 'Vertical scroll', id: 'components-table--vertical-scroll' },
        { label: 'Horizontal and vertical scroll', id: 'components-table--horizontal-and-vertical-scroll' },
        { label: 'Uniform column width', id: 'components-table--uniform-column-width' },
        { label: 'Trim outer borders', id: 'components-table--trim-outer-borders' },
        { label: 'Composition', id: 'components-table--composition' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (16 October build) from the team’s private package repository. Figma’s Table is one 720 × 190 component: a full-width header over a grid of white cells with 1 px grey lines. In code each column has its own header cell, a line runs under the header, and rows are a little taller; widths, alignment, and scrolling exist only in code. Developers can build the same table from data or from its parts. The app’s theme doesn’t reach the table, so it takes its modes directly, and they change body text only. Since the #264 fix, Weight reaches text cells, Page type JioPlus keeps them dark on white, and on the web screen readers hear the header cells, rows, and cells as a table, with pressable rows still rows. Biscuit’s main has the handwritten Storybook page.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'table',
    corePrinciple: 'Line values up so they can be compared at a glance.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('table'),
  }} playground={<>
    <div className="preview-stage">
      <Host>
        <Table
          columns={fixed ? FIXED : COLUMNS}
          data={tall ? MANY : HOLDINGS}
          scrollable={fixed}
          maxHeight={tall ? 152 : undefined}
          showHeader={showHeader}
          trimOuterBorders={trim}
          onRowPress={pressable ? row => setPressed(row.asset) : undefined}
          modes={{ ...LIGHT, 'Text Sizes': size, 'Text Appearance': appearance } as Modes}
        />
      </Host>
      <span className="stage-label">Live Coin Table</span>
    </div>
    <div className="controls-panel">
      <OnOff label="Header" value={showHeader} onChange={setShowHeader} />
      <Segment label="Scroll" value={scroll} options={['None', 'Sideways', 'Down', 'Both']} onChange={setScroll} />
      <OnOff label="Trim outer borders" value={trim} onChange={setTrim} />
      <OnOff label="Pressable rows" value={pressable} onChange={setPressable} />
      <Segment label="Text size" value={size} options={['Small', 'Medium', 'Large']} onChange={setSize} />
      <Segment label="Text appearance" value={appearance} options={['Neutral', 'Primary', 'Secondary', 'Tertiary']} onChange={setAppearance} />
      <Readout title="Pressed row" value={pressed}>
        {pressable ? 'Press a row: it fades while pressed and tells the screen which holding it is.' : 'Rows are static. Turn on Pressable rows to open a holding from its row.'}
      </Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'table',
  label: 'Table',
  summary: 'Use a Table to compare a few values across rows, such as holdings, with columns that line up and numbers aligned right.',
  keywords: ['data table', 'grid', 'holdings table', 'rows and columns'],
  icon: <><rect x="2" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M2 7.5h14M7.5 7.5V15" stroke="currentColor" strokeWidth="1.5" /></>,
  Component: TableGuide,
})
