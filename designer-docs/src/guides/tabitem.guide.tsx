import { useState } from 'react'
import { Card, ListItem, TabItem, Tabs, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, Readout, Segment, Sources } from '../guide-kit'
import { defineGuide } from './define'

const LIGHT = { 'Color Mode': 'Light' } as Modes
const FIGMA = 'https://www.figma.com/design/dSlK8ueQ7wlbyUSZd4f8QO/Coin-Subcomponents?node-id=66-913'
const STORYBOOK = 'https://jfs-components-storybook.vercel.app/?path=/docs/tabs-tabitem--docs'
const TAB = (n: number) => `[role="tablist"] > [role="tab"]:nth-child(${n})`

type Item = { label: string; accessibilityLabel?: string }
const items = (...labels: string[]): Item[] => labels.map(label => ({ label }))
const YEARS: Item[] = [
  { label: 'AY24', accessibilityLabel: 'Assessment year 2024' },
  { label: 'AY25', accessibilityLabel: 'Assessment year 2025' },
  { label: 'AY26', accessibilityLabel: 'Assessment year 2026' },
]
const YEAR_ROWS: Record<string, [string, string][]> = {
  AY24: [['Refund', '₹2,340, credited 12 Nov 2024'], ['Return filed', '28 Jul 2024']],
  AY25: [['Refund', '₹1,180, credited 9 Oct 2025'], ['Return filed', '30 Jul 2025']],
  AY26: [['Return', 'Not filed yet'], ['Due date', '31 Jul 2026']],
}

function Row({ items: list, selected, also, onSelect }: { items: Item[]; selected: number; also?: number; onSelect?: (i: number) => void }) {
  return <Tabs modes={LIGHT}>
    {list.map((item, i) => <TabItem key={item.label + i} modes={LIGHT} label={item.label} accessibilityLabel={item.accessibilityLabel}
      active={i === selected || i === also} onPress={onSelect ? () => onSelect(i) : undefined} />)}
  </Tabs>
}

const Host = ({ children, narrow }: { children: React.ReactNode; narrow?: boolean }) =>
  <div className={`coin-new-host ${narrow ? 'narrow' : 'wide'}`}><VStack modes={LIGHT} style={{ width: '100%' }}>{children}</VStack></div>

function StaticRow({ list, initial }: { list: Item[]; initial: number }) {
  const [sel, setSel] = useState(initial)
  return <Row items={list} selected={sel} onSelect={setSel} />
}

function TabItemGuide() {
  const [label, setLabel] = useState('Activity')
  const [sel, setSel] = useState(1)
  const active = sel === 1
  const setActive = (a: boolean) => setSel(a ? 1 : 0)
  const [year, setYear] = useState(1)

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A label and an underline',
      description: 'A Tab Item is a pressable label with 8 px above and below. When selected, its label turns black and a 2 px gold underline spans the tab’s full width.',
      body: <Anatomy specimenWidth={240} parts={[
        { name: 'Selected tab', note: 'Its view is on screen now.', target: TAB(1), side: 'left' },
        { name: 'Underline', note: 'Shown only while the tab is selected.', target: `${TAB(1)} > div:last-child`, side: 'bottom' },
        { name: 'Label', note: 'Names the view in a word or two.', target: `${TAB(2)} [dir="auto"]`, side: 'top' },
        { name: 'Idle tab', note: 'Grey until someone presses it.', target: TAB(2), side: 'right' },
      ]} marks={[{ kind: 'padding', target: TAB(1) }]}>
        <Row items={items('Overview', 'Statements')} selected={0} />
      </Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'A label, and a spoken name when needed',
      description: 'A Tab Item has no size, icon, or style options: you set its label. Figma’s counter badge has no code equivalent yet, so keep it hidden.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Label" description="The label is also what screen readers say."><Host><StaticRow list={items('Overview', 'Activity', 'Details')} initial={0} /></Host></ExampleCard>
        <ExampleCard title="Abbreviation with a spoken name" description="Short labels such as AY24 get a full spoken name: “Assessment year 2024”."><Host><StaticRow list={YEARS} initial={1} /></Host></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Idle and active',
      description: 'The screen marks the tab whose view is showing as active; a Tab Item never selects itself. Pressing dims it to 70% until release. There is no disabled state.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Idle" description="Grey label, no underline."><Host narrow><Tabs modes={LIGHT}><TabItem modes={LIGHT} label="Statements" /></Tabs></Host></ExampleCard>
        <ExampleCard title="Active" description="Black label and a gold underline across the tab."><Host narrow><Tabs modes={LIGHT}><TabItem modes={LIGHT} label="Statements" active /></Tabs></Host></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: '33 px tall; Tabs sets the width',
      description: 'A Tab Item is 33 px tall: a 17 px label with 8 px above and below. Tabs sets its width: an equal share of the row, or the label’s width when the row scrolls.',
      body: <Anatomy legend={false} specimenWidth={240} marks={[
        { kind: 'size', target: TAB(1), side: 'bottom', label: 'both' },
        { kind: 'padding', target: TAB(1) },
      ]}><Row items={items('Overview', 'Statements')} selected={0} /></Anatomy>,
    },
    content: {
      header: 'Content', title: 'One or two words that name the view',
      description: 'Write a noun in sentence case, such as “Statements”. Don’t write actions like “Download” or long phrases; when a label must be abbreviated, give the tab a spoken name.',
      body: <ExampleCard title="View names"><Host><StaticRow list={items('Overview', 'Activity', 'Details')} initial={0} /></Host></ExampleCard>,
    },
    context: {
      header: 'In context', title: 'Tax years over one panel',
      description: 'Each Tab Item belongs to a Tabs row. The screen marks one active and swaps the panel when another is pressed; the abbreviated labels each have a spoken name.',
      body: <div className="coin-new-context">
        <Card modes={LIGHT}><VStack modes={LIGHT} style={{ width: '100%' }}>
          <Row items={YEARS} selected={year} onSelect={setYear} />
          {YEAR_ROWS[YEARS[year].label].map(([title, support]) =>
            <ListItem key={title} modes={LIGHT} layout="Horizontal" navArrow={false} title={title} supportText={support} showSupportText />)}
        </VStack></Card>
        <p className="coin-new-readout" role="status">Showing {YEARS[year].accessibilityLabel}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Keep each tab in its row',
      description: 'Each pair shows a Tab Item used as intended versus one that confuses people.',
      body: <div className="coin-new-stack">
        <DoDont goodTitle="Use it inside Tabs" goodCaption="The row spaces the tabs and shares out the width." good={<Host><Row items={items('Overview', 'Activity', 'Details')} selected={0} /></Host>}
          badTitle="Place one on its own" badCaption="A lone Tab Item stretches across its container with no row around it." bad={<Host><TabItem modes={LIGHT} label="Overview" active /></Host>} />
        <DoDont goodTitle="Mark one tab active" goodCaption="One underline shows the current view." good={<Host><Row items={items('Overview', 'Activity', 'Details')} selected={2} /></Host>}
          badTitle="Mark two tabs active" badCaption="Two underlines leave people unsure which view is showing." bad={<Host><Row items={items('Overview', 'Activity', 'Details')} selected={0} also={2} /></Host>} />
        <DoDont goodTitle="Name the view" goodCaption="“Statements” says what the panel shows." good={<Host><Row items={items('Overview', 'Statements')} selected={1} /></Host>}
          badTitle="Write an action" badCaption="“Download” sounds like a button, but tabs only switch views." bad={<Host><Row items={items('Overview', 'Download')} selected={1} /></Host>} />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use Tab Item through Tabs',
      description: 'The guide compares the Figma subcomponent with the installed package and the Tabs stories.',
      body: <Sources checked="5 October 2026" figmaUrl={FIGMA} storybookUrl={STORYBOOK} stories={[
        { label: 'Tabs default', id: 'components-tabs--default' }, { label: 'Tabs with labels', id: 'components-tabs--with-labels' },
        { label: 'Tabs scrollable', id: 'components-tabs--scrollable' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> from the team’s private package repository. Tab Item is a subcomponent: in Figma it lives in Coin Subcomponents and reaches designs through the Tabs slot. Figma’s variants are State Idle and Active, each with a counter badge; the package has no badge. The published Storybook has no Tab Item stories yet, so the story links show Tabs. On the web a tab is announced by its label or spoken name but not as selected; Enter selects it, Space does not.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'tabitem',
    corePrinciple: 'One view, one short label, and always inside Tabs.',
    figmaUrl: FIGMA, storybookUrl: STORYBOOK,
  }} playground={<>
    <div className="preview-stage">
      <Host><Row items={items('Overview', label, 'Details')} selected={sel} onSelect={setSel} /></Host>
      <span className="stage-label">Live Coin Tab Item</span>
    </div>
    <div className="controls-panel">
      <label className="text-control"><span>Label</span><input value={label} onChange={e => setLabel(e.target.value)} maxLength={16} /></label>
      <Segment label="State" value={active ? 'Active' : 'Idle'} options={['Idle', 'Active'] as const} onChange={v => setActive(v === 'Active')} />
      <Readout title="Spoken name" value={label}>Screen readers say the label. On the web they don’t hear which tab is selected.</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'tabitem',
  label: 'Tab Item',
  summary: 'Use a Tab Item inside Tabs for each view: a short label that turns black with a gold underline while its view is showing.',
  keywords: ['tab', 'tab label'],
  icon: <><path d="M5 7h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M3 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
  Component: TabItemGuide,
})
