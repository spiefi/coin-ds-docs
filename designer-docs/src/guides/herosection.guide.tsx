import { useState, type ComponentProps, type ReactNode } from 'react'
import { HeroSection, IconButton, ListGroup, ListItem, MoneyValue, Text, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, ScreenFrame, Segment, Sources, byTestId, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=6507-31453'
const LIGHT = { 'Color Mode': 'Light' } as Modes
const noop = () => {}

const TX = [
  { title: 'Blue Tokai Coffee', support: 'Today, 9:12 am', value: '240.00' },
  { title: 'Fresh Mart', support: 'Yesterday', value: '1,180.50' },
  { title: 'HP Petrol', support: '22 Oct', value: '2,000.00' },
  { title: 'Coffee Day', support: '21 Oct', value: '180.00' },
  { title: 'Airtel Recharge', support: '20 Oct', value: '299.00' },
]
const match = (q: string) => TX.filter(row => row.title.toLowerCase().includes(q.toLowerCase()))

function ROWS(q = '') {
  const rows = match(q)
  if (!rows.length) return <Text text={`No transactions match “${q}”`} modes={LIGHT} />
  return <ListGroup modes={LIGHT}>{rows.map(row => (
    <ListItem key={row.title} layout="Horizontal" title={row.title} supportText={row.support} trailing={<MoneyValue value={row.value} currency="₹" modes={LIGHT} />} onPress={noop} modes={LIGHT} />
  ))}</ListGroup>
}

type HSProps = Partial<ComponentProps<typeof HeroSection>>
function HSView({ overrides }: { overrides: HSProps }) {
  const [q, setQ] = useState(overrides.searchValue ?? '')
  return <HeroSection modes={LIGHT} title="Transactions" subtitle="Last 30 days" searchPlaceholder="Search transactions" filterAccessibilityLabel="Filter transactions" onFilterPress={noop} {...overrides} searchValue={q} onSearchChange={setQ} />
}
const HS = (overrides: HSProps = {}) => <HSView overrides={overrides} />
const Host = ({ children }: { children: ReactNode }) => <VStack modes={LIGHT} style={{ width: 360, maxWidth: '100%' }}>{children}</VStack>
const H = (overrides: HSProps = {}) => <Host>{HS(overrides)}</Host>

const sel = (id: string) => {
  const ROOT = byTestId(id)
  return {
    ROOT,
    TITLE: `${ROOT} > [role="heading"]`,
    ROW: `${ROOT} > div:nth-child(2)`,
    FIELD: `${ROOT} > div:nth-child(2) > div:first-child`,
    FILTER: `${ROOT} > div:nth-child(2) > [role="button"]`,
    BODY: `${ROOT} > div:nth-child(3)`,
  }
}
const A = sel('hs-anatomy')
const S = sel('hs-sizing')

function HeroSectionGuide() {
  const [showTitle, setShowTitle] = useState(true)
  const [align, setAlign] = useState<'Left' | 'Center'>('Left')
  const [showSearch, setShowSearch] = useState(true)
  const [showFilter, setShowFilter] = useState(true)
  const [emphasis, setEmphasis] = useState<'High' | 'Medium' | 'Low'>('Medium')
  const [query, setQuery] = useState('')
  const [ctxQuery, setCtxQuery] = useState('')
  const [filters, setFilters] = useState(false)
  const matching = match(ctxQuery).length

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A title, a search row, a body',
      description: 'The title sits on top, the search field and the filter button share the row under it, and children fill the body below. The section is white and spans its host.',
      body: <Anatomy specimenWidth={360} marks={[{ kind: 'gap', from: A.TITLE, to: A.ROW }]} parts={[
        { name: 'Title', note: 'title and subtitle in a Title; the title stays on one line.', target: A.TITLE, side: 'top' },
        { name: 'Search field', note: 'An Input Search that grows to fill the row.', target: A.FIELD, side: 'left' },
        { name: 'Filter', note: 'An Icon Button, ic_filter, Secondary at Emphasis Medium.', target: A.FILTER, side: 'right' },
        { name: 'Body', note: 'children, full width under the row.', target: A.BODY, side: 'bottom' },
        { name: 'Section', note: 'White, 12 px at the sides, 16 px above and below.', target: A.ROOT, side: 'left', at: 0.9 },
      ]}>{HS({ testID: 'hs-anatomy', searchPlaceholder: 'Search', children: ROWS() })}</Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'The parts, the alignment, the filter',
      description: 'showTitle, showSearch, and showFilter turn the parts on and off, and titleTextAlign centres the title. showSearch removes the whole row, the filter too. The hero gives its filter AppearanceBrand Secondary at Emphasis Medium; Emphasis on the hero makes it solid or bare. filterIcon and filterAccessibilityLabel change what the button is, and filterSlot replaces it with your own Icon Button, which gets the hero’s modes but not Secondary and Medium, so set them on it.',
      body: <div className="coin-new-stack">
        <div className="coin-new-example-grid">
          <ExampleCard title="Left" description="The default: the title lines up with the field.">{H()}</ExampleCard>
          <ExampleCard title="Center" description="titleTextAlign Center centres the title and subtitle.">{H({ titleTextAlign: 'Center' })}</ExampleCard>
        </div>
        <div className="coin-new-example-grid">
          <ExampleCard title="Search only" description="showFilter={false}: the field takes the row.">{H({ showFilter: false })}</ExampleCard>
          <ExampleCard title="Title only" description="showSearch={false} removes the filter too.">{H({ showSearch: false })}</ExampleCard>
        </div>
        <div className="coin-new-example-grid">
          <ExampleCard title="Emphasis High" description="Solid purple.">{H({ modes: { ...LIGHT, Emphasis: 'High' } as Modes })}</ExampleCard>
          <ExampleCard title="Emphasis Low" description="The icon alone.">{H({ modes: { ...LIGHT, Emphasis: 'Low' } as Modes })}</ExampleCard>
        </div>
        <div className="coin-new-example-grid">
          <ExampleCard title="filterIcon" description="Change the icon and its label together.">{H({ title: 'Watchlist', subtitle: 'Stocks you follow', searchPlaceholder: 'Search stocks', filterIcon: 'ic_sort', filterAccessibilityLabel: 'Sort stocks' })}</ExampleCard>
          <ExampleCard title="filterSlot" description="Your own button, with Secondary and Medium set on it.">{H({ title: 'Watchlist', subtitle: 'Stocks you follow', searchPlaceholder: 'Search stocks', filterSlot: <IconButton iconName="ic_sort" accessibilityLabel="Sort stocks" onPress={noop} modes={{ ...LIGHT, AppearanceBrand: 'Secondary', Emphasis: 'Medium' } as Modes} /> })}</ExampleCard>
        </div>
      </div>,
    },
    states: {
      header: 'States', title: 'Empty, or searching',
      description: 'The section itself has no states. Its search field shows the placeholder when empty, and the query and a clear button when it has text; its focus look comes from Input Search. The hero keeps no text: wire searchValue and onSearchChange, or typing does nothing.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Empty" description="The placeholder says what the field finds.">{H()}</ExampleCard>
        <ExampleCard title="With a query" description="Text shows the clear button.">{H({ searchValue: 'Coffee' })}</ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'Full width, as tall as its parts',
      description: 'The hero fills its host’s width. Top to bottom: 16 px of padding, the 50 px title block, 16 px, the 42 px search row, 16 px, then the body and 16 px more. In a 360 px host it is 360 × 140 without a body; the field takes the width left after the 40 px filter and its 16 px gap. Figma insets the row another 8 px and draws a 44 px field, a 42 px filter, and a 44 px title block.',
      body: <Anatomy legend={false} specimenWidth={360} marks={[
        { kind: 'size', target: S.ROOT, side: 'bottom', label: 'both' },
        { kind: 'gap', from: S.TITLE, to: S.ROW },
        { kind: 'padding', target: S.ROOT },
      ]}>{HS({ testID: 'hs-sizing' })}</Anatomy>,
    },
    content: {
      header: 'Content', title: 'The page name and its scope',
      description: 'Write title as the page’s name, such as Transactions, and subtitle as its scope in a few words, such as Last 30 days. An empty subtitle hides it, but leaving subtitle out shows the word Subtitle. Make searchPlaceholder say what the field finds and filterAccessibilityLabel say what the button filters; screen readers read both. A long title ends with an ellipsis.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Name and scope" description="Transactions, then Last 30 days.">{H()}</ExampleCard>
        <ExampleCard title="No subtitle" description="An empty subtitle hides it.">{H({ subtitle: '' })}</ExampleCard>
        <ExampleCard title="A long title" description="It ends with an ellipsis.">{H({ title: 'All your transactions across every account' })}</ExampleCard>
      </div>,
    },
    context: {
      header: 'In context', title: 'A searchable list',
      description: 'The hero heads the Transactions page. Typing narrows the list in its body, and the filter button opens the filters. The hero only passes the text on; the page does the filtering.',
      body: <div className="coin-new-context">
        <ScreenFrame size="full">
          <HeroSection modes={LIGHT} testID="hs-context" title="Transactions" subtitle="Last 30 days" searchPlaceholder="Search transactions" filterAccessibilityLabel="Filter transactions" searchValue={ctxQuery} onSearchChange={setCtxQuery} onFilterPress={() => setFilters(true)}>{ROWS(ctxQuery)}</HeroSection>
        </ScreenFrame>
        <p className="coin-new-readout" role="status">{`${matching} of 5 transactions`}{filters ? ' · Filters opened' : ''}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'A finished header',
      description: 'Each pair shows a header that’s ready to ship next to one with a default or a mode left in.',
      body: <div className="coin-new-stack">
        <DoDont good={H()} bad={<Host><HeroSection modes={LIGHT} /></Host>}
          goodTitle="The page’s name" goodCaption="Transactions, Last 30 days."
          badTitle="The defaults left in" badCaption="Without title and subtitle it shows Page Title and Subtitle." />
        <DoDont good={H()} bad={H({ modes: { ...LIGHT, 'Button / Size': 'S' } as Modes })}
          goodTitle="The filter at its size" goodCaption="The button matches the field."
          badTitle="A smaller filter" badCaption="Button / Size S shrinks only the filter, not the field beside it." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Hero Section contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="26 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('herosection')} stories={[
        { label: 'Default', id: 'components-herosection--default' },
        { label: 'With Content', id: 'components-herosection--with-content' },
        { label: 'Without Subtitle', id: 'components-herosection--without-subtitle' },
        { label: 'Without Search', id: 'components-herosection--without-search' },
        { label: 'Without Filter', id: 'components-herosection--without-filter' },
        { label: 'Centered Title', id: 'components-herosection--centered-title' },
        { label: 'Controlled', id: 'components-herosection--controlled' },
        { label: 'Custom Search And Filter', id: 'components-herosection--custom-search-and-filter' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (23 October build of Biscuit’s main) from the team’s private package repository. Figma’s Hero Section has <code>Title</code> and <code>Search</code> switches and a <code>children</code> slot; the package adds <code>showFilter</code>, <code>titleTextAlign</code>, the search and filter props, and <code>titleSlot</code>, <code>searchSlot</code>, and <code>filterSlot</code>. Figma insets the search row 8 px and draws a 44 px field and a 42 px filter; the package’s row is flush, with a 42 px field and a 40 px filter. Leaving <code>subtitle</code> out shows “Subtitle”, as Storybook’s Without Subtitle story does; a <code>filterSlot</code> doesn’t get the filter’s Secondary Medium and disappears with <code>showSearch={'{false}'}</code> (all reported).</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'herosection', corePrinciple: 'Name the page, then help people find what’s on it.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('herosection'),
  }} playground={<>
    <div className="preview-stage">
      <Host>
        <HeroSection modes={{ ...LIGHT, Emphasis: emphasis } as Modes} title="Transactions" subtitle="Last 30 days" searchPlaceholder="Search transactions" filterAccessibilityLabel="Filter transactions" showTitle={showTitle} titleTextAlign={align} showSearch={showSearch} showFilter={showFilter} searchValue={query} onSearchChange={setQuery} onFilterPress={noop} />
      </Host>
      <span className="stage-label">Live Coin Hero Section</span>
    </div>
    <div className="controls-panel">
      <OnOff label="showTitle" value={showTitle} onChange={setShowTitle} />
      <Segment label="titleTextAlign" value={align} options={['Left', 'Center'] as const} onChange={setAlign} />
      <OnOff label="showSearch" value={showSearch} onChange={setShowSearch} />
      <OnOff label="showFilter" value={showFilter} onChange={setShowFilter} />
      <Segment label="Emphasis" value={emphasis} options={['High', 'Medium', 'Low'] as const} onChange={setEmphasis} />
      <Readout title="searchValue" value={query ? `“${query}”` : 'Empty'}>The hero keeps no text of its own: searchValue and onSearchChange hold what people type.</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'herosection',
  label: 'Hero Section',
  summary: 'Use a Hero Section at the top of a list page: the page’s name, a search field and a filter button, and the list under them.',
  keywords: ['page header', 'search header', 'list header', 'search and filter'],
  icon: <><path d="M3 4h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /><rect x="2.75" y="8.75" width="9" height="4.5" rx="2.25" stroke="currentColor" strokeWidth="1.5" fill="none" /><circle cx="14.5" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" /></>,
  Component: HeroSectionGuide,
})
