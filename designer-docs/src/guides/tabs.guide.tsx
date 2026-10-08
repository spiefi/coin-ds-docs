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
  const [layout, setLayout] = useState<'One row' | 'Scrollable'>('One row')
  const [selected, setSelected] = useState(0)
  const [ctx, setCtx] = useState(0)
  const labels = set === 'Views' ? VIEWS : FILTERS
  const scrollable = set === 'Filters' || layout === 'Scrollable'
  const note = set === 'Filters' ? 'Six filters don’t fit one row, so they always scroll.'
    : scrollable ? 'Tabs hug their labels; scroll the row for the rest.'
    : 'Tabs hug their labels, 16 px apart.'
  const ctxLabel = VIEWS[ctx]

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A row of tabs, one underlined',
      description: 'Tabs lines up Tab Items in one row, 16 px apart. The selected tab has a black label and a gold underline; the others are grey.',
      body: <Anatomy specimenWidth={328} parts={[
        { name: 'Tab row', note: 'Holds the tabs in one row, 16 px apart.', target: '[role="tablist"]', side: 'left' },
        { name: 'Selected tab', note: 'Black label: the view on screen now.', target: `${TAB(1)} [dir="auto"]`, side: 'top' },
        { name: 'Underline', note: '2 px gold bar under the selected tab only.', target: `${TAB(1)} > div:last-child`, side: 'bottom' },
        { name: 'Idle tab', note: 'Grey label: another view, one tap away.', target: `${TAB(3)} [dir="auto"]`, side: 'top' },
      ]} marks={[{ kind: 'gap', from: TAB(2), to: TAB(3) }]}>
        <Row labels={VIEWS} selected={0} />
      </Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'One row or scrollable',
      description: 'Each tab hugs its label, 16 px from the next, as in Figma. Turn on scrollable when the labels don’t fit, so the row scrolls sideways.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="One row" description="Three tabs hug their labels from the start of the row."><Host><Row labels={VIEWS} selected={0} /></Host></ExampleCard>
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
      header: 'Sizing', title: 'Hugs its labels, 33 px tall',
      description: 'Tabs stretches to the width of its container. Each tab is 33 px tall: a 17 px label with 8 px above and below, and as wide as its label, with 16 px between tabs. Tabs that don’t fit are cut off unless the row scrolls.',
      body: <Anatomy legend={false} specimenWidth={328} marks={[
        { kind: 'size', target: TAB(1), side: 'top', label: 'both' },
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
          badTitle="Select two tabs" badCaption="Only the first is underlined, which may not be the view that’s showing." bad={<Host><Row labels={VIEWS} activeSet={[0, 1]} /></Host>} />
        <DoDont goodTitle="Scroll a long set" goodCaption="Six filters hug their labels and scroll." good={<Host><Row labels={FILTERS} selected={0} scrollable /></Host>}
          badTitle="Squeeze six tabs into one row" badCaption="The last labels are cut off at the edge of the row." bad={<Host><Row labels={FILTERS} selected={0} /></Host>} />
        <DoDont goodTitle="Name each view" goodCaption="“Activity” says what’s there." good={<Host><Row labels={VIEWS} selected={0} /></Host>}
          badTitle="Number the tabs" badCaption="“Tab 1”, “Tab 2”, and “Tab 3” say nothing about the view." bad={<Host><Row labels={['Tab 1', 'Tab 2', 'Tab 3']} selected={0} /></Host>} />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Tabs contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="8 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('tabs')} stories={[
        { label: 'Default', id: 'components-tabs--default' }, { label: 'With labels', id: 'components-tabs--with-labels' },
        { label: 'Scrollable', id: 'components-tabs--scrollable' }, { label: 'All idle', id: 'components-tabs--all-idle' },
        { label: 'In Range Track', id: 'components-rangetrack--scrollable-tabs' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (5 October build) from the team’s private package repository. In Figma and in code, tabs hug their labels with 16 px gaps, and a tab can carry a counter badge. If two tabs are marked active, only the first is selected. The published Storybook predates 0.1.78, so its stories show older labels. On the web the row is a tab list named by its accessibility label, and each tab is announced by its label and whether it is selected; Space, Enter, the arrow keys, Home, and End select tabs. Every tab is still its own Tab stop, and tabs that don’t fit a fixed row are cut off rather than shortened.</Sources>,
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
      {set === 'Views' && <Segment label="Layout" value={layout} options={['One row', 'Scrollable'] as const} onChange={setLayout} />}
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
