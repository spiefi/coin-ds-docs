import { useState } from 'react'
import { FilterBar, ListItem, Text, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, Readout, Segment, Sources, byTestId, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=541-4823'
const MODES = { 'Color Mode': 'Light' } as Modes

type BarProps = { placeholder?: string; initial?: string; testID?: string }

function Bar({ placeholder, initial = '', testID }: BarProps) {
  const [value, setValue] = useState(initial)
  return <FilterBar modes={MODES} placeholder={placeholder} value={value} onChangeText={setValue} testID={testID} />
}

function Host({ narrow = false, children }: { narrow?: boolean; children: React.ReactNode }) {
  return <div className={`coin-new-host ${narrow ? 'narrow' : 'wide'}`}>{children}</div>
}

const TRANSACTIONS = [
  { title: 'Digital Gold', support: '12 Sep · ₹2,000' },
  { title: 'Nifty 50 Index Fund', support: '10 Sep · ₹5,000' },
  { title: 'Electricity bill', support: '8 Sep · ₹1,240' },
  { title: 'Gold savings plan', support: '1 Sep · ₹1,000' },
]

function TransactionList() {
  const [query, setQuery] = useState('')
  const rows = TRANSACTIONS.filter(row => row.title.toLowerCase().includes(query.trim().toLowerCase()))
  return <div className="coin-new-context">
    <FilterBar modes={MODES} placeholder="Search transactions" value={query} onChangeText={setQuery} />
    <VStack modes={MODES}>
      {rows.length
        ? rows.map(row => <ListItem key={row.title} modes={MODES} layout="Horizontal" title={row.title} supportText={row.support} />)
        : <Text modes={MODES}>{`No transactions match “${query}”`}</Text>}
    </VStack>
  </div>
}

function FilterBarGuide() {
  const [placeholder, setPlaceholder] = useState('Search transactions')
  const [value, setValue] = useState('')
  const startWith = value === '' ? 'Empty' : 'A query'

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A padded search field', description: 'The bar holds one public Text Input set up for search, inset from the screen edges.',
      body: <Anatomy specimenWidth={360} marks={[{ kind: 'padding', target: byTestId('fb-anatomy') }]} parts={[
        { name: 'Bar', note: 'Full-width container that insets the field from the screen edges.', target: byTestId('fb-anatomy'), side: 'left' },
        { name: 'Field', note: 'Pill-shaped input surface from the public Text Input.', target: `${byTestId('fb-anatomy')} > div`, side: 'top' },
        { name: 'Search icon', note: 'Tells people the field searches.', target: `${byTestId('fb-anatomy')} svg`, side: 'bottom' },
        { name: 'Placeholder', note: 'Names what is being searched until they type.', target: `${byTestId('fb-anatomy')} input`, side: 'right' },
      ]}><FilterBar testID="fb-anatomy" modes={MODES} placeholder="Search transactions" value="" onChangeText={() => {}} /></Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Only the words change',
      description: 'The bar, field, and icon come from tokens. Designers choose the placeholder and whether the bar opens with a query already in place.',
      body: <div className="coin-new-example-grid three">
        <ExampleCard title="Default placeholder" description="The generic word says nothing about what can be found."><Host><Bar /></Host></ExampleCard>
        <ExampleCard title="Specific placeholder" description="Naming the list tells people what they can find."><Host><Bar placeholder="Search transactions" /></Host></ExampleCard>
        <ExampleCard title="Prefilled query" description="Use it when returning to a list that is already filtered."><Host><Bar placeholder="Search transactions" initial="Gold" /></Host></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Empty, filled, and focused',
      description: 'Filter Bar has no disabled or error state. It shows its placeholder when empty, the query when filled, and an outline while focused.',
      body: <div className="coin-new-example-grid three">
        <ExampleCard title="Empty" description="The placeholder carries the name."><Host><FilterBar modes={MODES} placeholder="Search funds" value="" onChangeText={() => {}} /></Host></ExampleCard>
        <ExampleCard title="Filled" description="The query replaces the placeholder."><Host><FilterBar modes={MODES} placeholder="Search funds" value="Nifty" onChangeText={() => {}} /></Host></ExampleCard>
        <ExampleCard title="Focused" description="Select the field: a 1 px ring outlines its padded area without changing the bar’s height."><Host><Bar placeholder="Search funds" /></Host></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'It always fills its host',
      description: 'Filter Bar takes the full width of its container and keeps a fixed height. Place it in a full-width row; the screen owns the width.',
      body: <div className="coin-new-stack">
        <Anatomy legend={false} specimenWidth={360} marks={[
          { kind: 'size', target: byTestId('fb-size'), side: 'bottom', label: 'both' },
          { kind: 'padding', target: byTestId('fb-size') },
        ]}><FilterBar testID="fb-size" modes={MODES} placeholder="Search transactions" value="" onChangeText={() => {}} /></Anatomy>
        <div className="coin-new-example-grid">
          <ExampleCard title="360 px screen"><Host><Bar placeholder="Search transactions" /></Host></ExampleCard>
          <ExampleCard title="240 px column" description="The field shrinks with its host while the bar keeps its padding."><Host narrow><Bar placeholder="Search transactions" /></Host></ExampleCard>
        </div>
      </div>,
    },
    content: {
      header: 'Content', title: 'Say what can be found',
      description: 'Start with “Search” and name the list. Keep it to three words or fewer so it fits a narrow field.',
      body: <div className="coin-new-stack">
        <Host><Bar placeholder="Search transactions" /></Host>
        <Host><Bar placeholder="Search funds" /></Host>
        <Host><Bar placeholder="Search by merchant" /></Host>
      </div>,
    },
    context: {
      header: 'In context', title: 'Filter a transaction list',
      description: 'The screen passes the query to its list and shows only matching rows. Filter Bar reports the text; it does not filter anything itself.',
      body: <TransactionList />,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Make search predictable',
      description: 'Each pair shows what people see when the placeholder or placement changes.',
      body: <div className="coin-new-stack">
        <DoDont goodTitle="Name the list" goodCaption="“Search transactions” tells people what they will find." badTitle="Leave a vague prompt" badCaption="“Type here” hides what the field searches."
          good={<Host><Bar placeholder="Search transactions" /></Host>} bad={<Host><Bar placeholder="Type here" /></Host>} />
        <DoDont goodTitle="Keep the placeholder short" goodCaption="The whole placeholder stays readable in a narrow field." badTitle="Write a long placeholder" badCaption="A long prompt is cut off, so people lose what it searches."
          good={<Host narrow><Bar placeholder="Search by merchant" /></Host>} bad={<Host narrow><Bar placeholder="Search transactions, merchants, and categories" /></Host>} />
        <DoDont goodTitle="Keep one search per list" goodCaption="One field, one set of results." badTitle="Stack several search bars" badCaption="Two bars make people guess which one filters the list."
          good={<Bar placeholder="Search funds" />} bad={<div className="coin-new-stack"><Bar placeholder="Search funds" /><Bar placeholder="Search by category" /></div>} />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Filter Bar contract', description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="28 September 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('filterbar')} stories={[
        { label: 'Default', id: 'components-filterbar--default' },
        { label: 'Custom placeholder', id: 'components-filterbar--with-custom-placeholder' },
        { label: 'Prefilled value', id: 'components-filterbar--with-value' },
        { label: 'Custom input', id: 'components-filterbar--with-render-input' },
      ]}>Declared and installed <code>jfs-components</code> is <code>0.1.78</code> from the team’s private package repository. Figma draws the bar at 360 × 64 with a 44 px field; the installed package renders 62 px with a 42 px field. The focus outline is a fixed 1 px dark ring (not a token) that keeps the bar’s height. On the web, <code>accessibilityLabel</code> still does not reach the default input, so the placeholder is the field’s only accessible name. <code>renderInput</code> and <code>children</code> are developer overrides and are not shown.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'filterbar',
    corePrinciple: 'Name what is being searched, then let the list below respond to every keystroke.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('filterbar'),
  }} playground={<>
    <div className="preview-stage">
      <Host><FilterBar modes={MODES} placeholder={placeholder} value={value} onChangeText={setValue} /></Host>
      <span className="stage-label">Live Coin Filter Bar</span>
    </div>
    <div className="controls-panel">
      <label className="text-control"><span>Placeholder</span><input value={placeholder} onChange={event => setPlaceholder(event.target.value)} maxLength={40} /></label>
      <Segment label="Start with" value={startWith} options={['Empty', 'A query'] as const} onChange={option => setValue(option === 'Empty' ? '' : 'Gold')} />
      <Readout title="Current query" value={value === '' ? 'Empty' : `“${value}”`} />
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'filterbar',
  label: 'Filter Bar',
  summary: 'Use a Filter Bar at the top of a list so people can narrow what they see by typing.',
  keywords: ['search', 'search bar', 'search field', 'text field', 'filter'],
  icon: <path d="M13 8A5 5 0 1 1 3 8a5 5 0 0 1 10 0ZM11.6 11.6 15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />,
  Component: FilterBarGuide,
})
