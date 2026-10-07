import { useState, type ReactNode } from 'react'
import { Card, MoneyValue, SegmentedControl, Text, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, Readout, Segment, Sources, Surface, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2994-2578'
const LIGHT = { 'Color Mode': 'Light' } as Modes
const NEUTRAL = { 'Color Mode': 'Light', AppearanceBrand: 'Neutral' } as Modes
const PERIOD = [{ key: 'daily', label: 'Daily' }, { key: 'weekly', label: 'Weekly' }, { key: 'monthly', label: 'Monthly' }]
const TRADE = [{ key: 'buy', label: 'Buy' }, { key: 'sell', label: 'Sell' }]
const RANGE = ['1M', '3M', '6M', '1Y', 'All'].map(label => ({ key: label, label }))
const PLANS = [{ key: 'once', label: 'One-time payment' }, { key: 'sip', label: 'Monthly SIP' }, { key: 'stepup', label: 'Step-up SIP' }]
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(label => ({ key: label, label }))
const SETS = { '2': TRADE, '3': PERIOD, '5': RANGE }
const CHANGE: Record<string, string> = { daily: '+₹1,180 (0.9%) today', weekly: '+₹3,020 (2.4%) this week', monthly: '+₹6,240 (5.1%) this month' }
type Count = keyof typeof SETS
type Width = 'Wide' | 'Narrow'

function Host({ children, narrow = false }: { children: ReactNode; narrow?: boolean }) {
  return <Surface width={narrow ? 'narrow' : 'wide'}><VStack modes={LIGHT} style={{ width: '100%', padding: 0 }}>{children}</VStack></Surface>
}

function Controlled({ selected }: { selected: string }) {
  const [key, setKey] = useState(selected)
  return <SegmentedControl items={PERIOD} selectedKey={key} onSelectionChange={k => setKey(String(k))} modes={LIGHT} />
}

function SegmentedControlGuide() {
  const [count, setCount] = useState<Count>('3')
  const [width, setWidth] = useState<Width>('Wide')
  const [selected, setSelected] = useState<string>(PERIOD[0].key)
  const [period, setPeriod] = useState('weekly')
  const set = SETS[count]
  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A track of equal segments',
      description: 'A lavender track holds the options side by side. The selected one fills purple with a white label; the others are labels on the track.',
      body: <Anatomy surface="white" specimenWidth={328} parts={[
        { name: 'Track', note: 'Lavender pill that holds the segments and fills its container.', target: '[role="tablist"]', side: 'bottom', at: 0.15 },
        { name: 'Segment', note: 'An option people can tap; its label sits on the track.', target: '[role="tab"]:nth-child(1)', side: 'left' },
        { name: 'Label', note: 'One or two short words, centred.', target: '[role="tab"]:nth-child(2) [dir="auto"]', side: 'top' },
        { name: 'Selected segment', note: 'Purple fill and a white label mark the current choice.', target: '[role="tab"]:nth-child(3)', side: 'right' },
      ]}>
        <SegmentedControl items={PERIOD} defaultSelectedKey="monthly" modes={LIGHT} />
      </Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Two to five options',
      description: 'Set the options and the one that starts selected. Every segment gets the same width, so the number of options decides how much room each label has.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Two options" description="Opposites, such as Buy and Sell, each take half the track."><Host><SegmentedControl items={TRADE} defaultSelectedKey="buy" modes={LIGHT} /></Host></ExampleCard>
        <ExampleCard title="Three options" description="The usual case: a period or a view with three choices."><Host><SegmentedControl items={PERIOD} defaultSelectedKey="weekly" modes={LIGHT} /></Host></ExampleCard>
        <ExampleCard title="Five options" description="Five is the most that fits: on a 360 px phone each segment is about 59 px."><Host><SegmentedControl items={RANGE} defaultSelectedKey="1Y" modes={LIGHT} /></Host></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Selected, unselected, and pressed',
      description: 'One segment is always selected. A pressed segment dims until release, then becomes the selection. There is no disabled or loading state.',
      body: <ExampleCard title="Tap to choose" description="The purple fill moves to the segment you tap; Enter does the same from the keyboard."><Host><SegmentedControl items={PERIOD} defaultSelectedKey="weekly" modes={LIGHT} /></Host></ExampleCard>,
    },
    sizing: {
      header: 'Sizing', title: 'Full width, 43 px tall, equal segments',
      description: 'The track fills its container and splits it equally, with 8 px between segments and no padding of its own. Each segment is 43 px tall: 12 px above and below a 19 px label. In a row, the track shrinks to fit its labels.',
      body: <div className="coin-new-stack">
        <Anatomy legend={false} surface="white" specimenWidth={328} marks={[
          { kind: 'size', target: '[role="tab"]:nth-child(1)', side: 'bottom', label: 'both' },
          { kind: 'gap', from: '[role="tab"]:nth-child(1)', to: '[role="tab"]:nth-child(2)' },
          { kind: 'padding', target: '[role="tab"]:nth-child(3)' },
        ]}>
          <SegmentedControl items={PERIOD} defaultSelectedKey="monthly" modes={LIGHT} />
        </Anatomy>
        <ExampleCard title="In a narrow column" description="In a 216 px column each segment is about 67 px, and “Monthly” reaches the edge of the track. Leave room for the longest label."><Host narrow><SegmentedControl items={PERIOD} defaultSelectedKey="daily" modes={LIGHT} /></Host></ExampleCard>
      </div>,
    },
    content: {
      header: 'Content', title: 'One or two words per option',
      description: 'Labels share the width equally and wrap instead of truncating, so keep them short and parallel: Daily, Weekly, Monthly. Use the words people see in the content below, and select the likeliest option first.',
      body: <ExampleCard title="Short and parallel"><Host>
        <SegmentedControl items={TRADE} defaultSelectedKey="buy" modes={LIGHT} />
        <SegmentedControl items={RANGE} defaultSelectedKey="1M" modes={LIGHT} />
      </Host></ExampleCard>,
    },
    context: {
      header: 'In context', title: 'Switching a portfolio’s period',
      description: 'The control sits above the numbers it changes. The screen keeps the selected period and updates the value below; the control only reports the tap.',
      body: <div className="coin-new-context">
        <Card modes={NEUTRAL}>
          <Card.Title>Portfolio value</Card.Title>
          <SegmentedControl items={PERIOD} selectedKey={period} onSelectionChange={k => setPeriod(String(k))} modes={NEUTRAL} />
          <MoneyValue value="1,24,560" currency="₹" modes={NEUTRAL} />
          <Text modes={NEUTRAL}>{CHANGE[period]}</Text>
        </Card>
        <p className="coin-new-readout" role="status">Showing the {period} change</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Keep every option readable',
      description: 'Each pair shows a control people can read at a glance versus one that breaks its own layout.',
      body: <div className="coin-new-stack">
        <DoDont goodTitle="Keep labels short" goodCaption="Each label fits on one line, so every segment is 43 px." good={<Host><SegmentedControl items={PERIOD} defaultSelectedKey="daily" modes={LIGHT} /></Host>}
          badTitle="Write long labels" badCaption="“One-time payment” wraps to three lines and the segments end up different heights." bad={<Host><SegmentedControl items={PLANS} defaultSelectedKey="once" modes={LIGHT} /></Host>} />
        <DoDont goodTitle="Offer five options at most" goodCaption="Each label has room to breathe." good={<Host><SegmentedControl items={RANGE} defaultSelectedKey="1M" modes={LIGHT} /></Host>}
          badTitle="Squeeze in seven" badCaption="Segments of about 39 px leave no room, and labels crowd together." bad={<Host><SegmentedControl items={DAYS} defaultSelectedKey="Mon" modes={LIGHT} /></Host>} />
        <DoDont goodTitle="Select one of the options" goodCaption="One segment is always filled, so people see the current view." good={<Host><Controlled selected="weekly" /></Host>}
          badTitle="Pass a key that isn’t an option" badCaption="Nothing is selected, and people can’t tell what they’re looking at." bad={<Host><SegmentedControl items={PERIOD} selectedKey="yearly" modes={LIGHT} /></Host>} />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Segmented Control contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="7 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('segmentedcontrol')} stories={[
        { label: 'Default', id: 'components-segmentedcontrol--default' },
        { label: 'Two segments', id: 'components-segmentedcontrol--two-segments' },
        { label: 'Interactive', id: 'components-segmentedcontrol--interactive' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> from the team’s private package repository. Figma’s Segmented Control is one 393 × 43 component whose slot holds the segments; the package matches its colours, its 43 px height, and its equal widths. On the web the segments are tabs, but the selected one is not announced, Space does not select (Enter does), and arrow keys do nothing. Dark mode shows the same colours as Light, so this page shows Light only. The published Storybook predates the current stories.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'segmentedcontrol',
    corePrinciple: 'One choice from a short set, always in view.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('segmentedcontrol'),
  }} playground={<>
    <div className="preview-stage">
      <Host narrow={width === 'Narrow'}><SegmentedControl items={set} selectedKey={selected} onSelectionChange={k => setSelected(String(k))} modes={LIGHT} /></Host>
      <span className="stage-label">Live Coin Segmented Control</span>
    </div>
    <div className="controls-panel">
      <Segment label="Options" value={count} options={['2', '3', '5'] as const} onChange={value => { setCount(value); setSelected(SETS[value][0].key) }} />
      <Segment label="Width" value={width} options={['Wide', 'Narrow'] as const} onChange={setWidth} />
      <Readout title="Selected" value={set.find(item => item.key === selected)?.label ?? ''}>Segments share the width equally. The screen updates whatever the choice controls.</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'segmentedcontrol',
  label: 'Segmented Control',
  summary: 'Use a Segmented Control to switch between two to five short, exclusive options, such as Daily, Weekly and Monthly.',
  keywords: ['segmented button', 'toggle group', 'period switcher', 'button group'],
  icon: <><rect x="1.5" y="5" width="15" height="8" rx="4" stroke="currentColor" strokeWidth="1.5" /><rect x="10" y="7" width="4.5" height="4" rx="2" fill="currentColor" /></>,
  Component: SegmentedControlGuide,
})
