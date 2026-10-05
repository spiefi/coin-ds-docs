import { useState } from 'react'
import { Card, ListItem, TabItem, Tabs, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, Readout, Segment, Sources, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const LIGHT = { 'Color Mode': 'Light' } as Modes
const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3063-136'
const VIEWS = ['Overview', 'Activity', 'Details']
const FILTERS = ['All', 'Sent', 'Received', 'Pending', 'Failed', 'Refunded']
const TAB = (n: number) => `[role="tablist"] > [role="tab"]:nth-child(${n})`
const noop = () => {}

function Row({ labels, selected, scrollable, onSelect, activeSet }: {
  labels: string[]; selected?: number; scrollable?: boolean; onSelect?: (i: number) => void; activeSet?: number[]
}) {
  return <Tabs modes={LIGHT} scrollable={scrollable}>
    {labels.map((l, i) => <TabItem key={l} modes={LIGHT} label={l}
      active={activeSet ? activeSet.includes(i) : i === selected} onPress={onSelect ? () => onSelect(i) : noop} />)}
  </Tabs>
}

const Host = ({ children }: { children: React.ReactNode }) => <div className="coin-new-host wide"><VStack modes={LIGHT} style={{ width: '100%' }}>{children}</VStack></div>

const PANELS: Record<string, [string, string][]> = {
  Overview: [['Available balance', '₹42,500.00'], ['Spent this month', '₹18,300 so far in October']],
  Activity: [['Electricity bill', 'Paid ₹1,240 on 3 Oct'], ['Salary', 'Received ₹85,000 on 1 Oct']],
  Details: [['Account number', 'XXXX 4821'], ['Branch', 'Mumbai, Bandra West']],
}

function TabsGuide() {
  const [set, setSet] = useState<'Views' | 'Filters'>('Views')
  const [layout, setLayout] = useState<'Equal width' | 'Scrollable'>('Equal width')
  const [selected, setSelected] = useState(0)
  const [ctx, setCtx] = useState(0)
  const labels = set === 'Views' ? VIEWS : FILTERS
  const scrollable = set === 'Filters' || layout === 'Scrollable'
  const note = set === 'Filters' ? 'Six filters don’t fit an equal-width row, so they always scroll.'
    : scrollable ? 'Tabs hug their labels; scroll the row for the rest.'
    : 'Each tab takes an equal share of the row.'
  const ctxLabel = VIEWS[ctx]

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A row of tabs, one underlined',
      description: 'Tabs lines up Tab Items in one row, 16 px apart. The selected tab has a black label and a gold underline; the others are grey.',
      body: <Anatomy specimenWidth={328} parts={[
        { name: 'Tab row', note: 'Holds the tabs in one row and spaces them evenly.', target: '[role="tablist"]', side: 'left' },
        { name: 'Selected tab', note: 'Black label: the view on screen now.', target: `${TAB(1)} [dir="auto"]`, side: 'top' },
        { name: 'Underline', note: '2 px gold bar under the selected tab only.', target: `${TAB(1)} > div:last-child`, side: 'bottom' },
        { name: 'Idle tab', note: 'Grey label: another view, one tap away.', target: `${TAB(3)} [dir="auto"]`, side: 'top' },
      ]} marks={[{ kind: 'gap', from: TAB(2), to: TAB(3) }]}>
        <Row labels={VIEWS} selected={0} />
      </Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Equal width or scrollable',
      description: 'By default every tab gets an equal share of the row. Turn on scrollable when the labels don’t fit: each tab then hugs its label and the row scrolls sideways.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Equal width" description="Three tabs share the row equally, whatever their label length."><Host><Row labels={VIEWS} selected={0} /></Host></ExampleCard>
        <ExampleCard title="Scrollable" description="Each tab hugs its label; scroll the row to reach the rest."><Host><Row labels={FILTERS} selected={0} scrollable /></Host></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'One tab selected at a time',
      description: 'The screen keeps track of the selected tab: it marks that tab active and moves the mark when another tab is pressed. Tabs has no disabled or loading state.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="First tab selected" description="Open on the summary view."><Host><Row labels={VIEWS} selected={0} /></Host></ExampleCard>
        <ExampleCard title="Another tab selected" description="The black label and underline move to the pressed tab."><Host><Row labels={VIEWS} selected={1} /></Host></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'Fills its row, 33 px tall',
      description: 'Tabs stretches to the width of its container. Each tab is 33 px tall: a 17 px label with 8 px above and below. Equal-width tabs split the row after the 16 px gaps; three tabs in 328 px are about 99 px each.',
      body: <Anatomy legend={false} specimenWidth={328} marks={[
        { kind: 'size', target: TAB(1), side: 'bottom', label: 'both' },
        { kind: 'padding', target: TAB(1) },
        { kind: 'gap', from: TAB(1), to: TAB(2) },
      ]}><Row labels={VIEWS} selected={0} /></Anatomy>,
    },
    content: {
      header: 'Content', title: 'Name each view in a word or two',
      description: 'Labels are short nouns in sentence case that name the view, such as “Overview” or “Activity”. Don’t number tabs or write actions.',
      body: <ExampleCard title="View names"><Host><Row labels={VIEWS} selected={0} /></Host></ExampleCard>,
    },
    context: {
      header: 'In context', title: 'Account views over one panel',
      description: 'The screen keeps the selected tab and shows that view below the row. Pressing another tab swaps the panel; the tabs only report the press.',
      body: <div className="coin-new-context">
        <Card modes={LIGHT}><VStack modes={LIGHT} style={{ width: '100%' }}>
          <Row labels={VIEWS} selected={ctx} onSelect={setCtx} />
          {PANELS[ctxLabel].map(([title, support]) => <ListItem key={title} modes={LIGHT} layout="Horizontal" navArrow={false} title={title} supportText={support} showSupportText />)}
        </VStack></Card>
        <p className="coin-new-readout" role="status">Showing {ctxLabel}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Use tabs for peer views',
      description: 'Each pair shows tabs people understand versus tabs that mislead them.',
      body: <div className="coin-new-stack">
        <DoDont goodTitle="Switch between peer views" goodCaption="Overview, Activity, and Details show the same account." good={<Host><Row labels={VIEWS} selected={0} /></Host>}
          badTitle="Use tabs as actions" badCaption="“Pay” and “Cancel” do something; use Buttons." bad={<Host><Row labels={['Pay', 'Cancel']} selected={0} /></Host>} />
        <DoDont goodTitle="Select exactly one tab" goodCaption="One underline says which view is showing." good={<Host><Row labels={VIEWS} selected={1} /></Host>}
          badTitle="Select two tabs" badCaption="Two underlines leave people unsure which view they’re in." bad={<Host><Row labels={VIEWS} activeSet={[0, 1]} /></Host>} />
        <DoDont goodTitle="Scroll a long set" goodCaption="Six filters hug their labels and scroll." good={<Host><Row labels={FILTERS} selected={0} scrollable /></Host>}
          badTitle="Squeeze six equal tabs" badCaption="The labels overlap when six tabs share one row." bad={<Host><Row labels={FILTERS} selected={0} /></Host>} />
        <DoDont goodTitle="Name each view" goodCaption="“Activity” says what’s there." good={<Host><Row labels={VIEWS} selected={0} /></Host>}
          badTitle="Number the tabs" badCaption="“Tab 1”, “Tab 2”, and “Tab 3” say nothing about the view." bad={<Host><Row labels={['Tab 1', 'Tab 2', 'Tab 3']} selected={0} /></Host>} />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Tabs contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="5 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('tabs')} stories={[
        { label: 'Default', id: 'components-tabs--default' }, { label: 'With labels', id: 'components-tabs--with-labels' },
        { label: 'Scrollable', id: 'components-tabs--scrollable' }, { label: 'All idle', id: 'components-tabs--all-idle' },
        { label: 'In Range Track', id: 'components-rangetrack--scrollable-tabs' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> from the team’s private package repository. In Figma, tabs hug their labels and carry a counter badge; in code they share the row equally unless the row is scrollable, and there is no badge. The published Storybook predates 0.1.78, so its stories show older labels. On the web each tab is announced by its label, but the selected tab is not announced; Enter selects a focused tab, while Space and the arrow keys do nothing.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'tabs',
    corePrinciple: 'A few peer views, exactly one selected, and the content below follows it.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('tabs'),
  }} playground={<>
    <div className="preview-stage">
      <Host><Row labels={labels} selected={selected} scrollable={scrollable} onSelect={setSelected} /></Host>
      <span className="stage-label">Live Coin Tabs</span>
    </div>
    <div className="controls-panel">
      <Segment label="Set" value={set} options={['Views', 'Filters'] as const} onChange={v => { setSet(v); setSelected(0) }} />
      {set === 'Views' && <Segment label="Layout" value={layout} options={['Equal width', 'Scrollable'] as const} onChange={setLayout} />}
      <Readout title="Selected tab" value={labels[selected]}>{note}</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'tabs',
  label: 'Tabs',
  summary: 'Use Tabs to switch between a few peer views of the same content, such as an account’s overview, activity, and details.',
  keywords: ['tab bar', 'sub-navigation', 'views'],
  icon: <><path d="M3 7h4M11 7h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M2.5 11h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><path d="M2 14h14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" /></>,
  Component: TabsGuide,
})
