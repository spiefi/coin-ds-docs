import { useState } from 'react'
import { BottomNav, Text, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, ScreenFrame, Segment, Sources, byTestId, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=302-79'
const MODES = { 'Color Mode': 'Light' } as Modes

type Dest = { value: string; label: string; iconName: string }
const ALL: Dest[] = [
  { value: 'home', label: 'Home', iconName: 'ic_home' },
  { value: 'finances', label: 'Finances', iconName: 'ic_rupee' },
  { value: 'pay', label: 'Pay', iconName: 'ic_scan_qr_code' },
  { value: 'invest', label: 'Invest', iconName: 'ic_rupee_coin' },
  { value: 'explore', label: 'Explore', iconName: 'ic_search' },
]
const pick = (...values: string[]) => values.map(v => ALL.find(d => d.value === v)!)
const THREE = pick('home', 'pay', 'explore')
const FOUR = pick('home', 'finances', 'pay', 'invest')
const SETS: Record<'3' | '4' | '5', Dest[]> = { '3': THREE, '4': FOUR, '5': ALL }
const LINES: Record<string, string> = {
  home: 'Your balances and recent activity',
  finances: 'Spending and bills',
  pay: 'Scan a QR code or pay a contact',
  invest: 'Funds, gold, and deposits',
  explore: 'Offers and new products',
}

function Nav({ items = ALL, value = 'home', onChange, disabled, testID, icon }: {
  items?: Dest[]; value?: string; onChange?: (v: string) => void; disabled?: string; testID?: string; icon?: string
}) {
  return <BottomNav testID={testID} value={value} onChange={v => onChange?.(String(v))} modes={MODES}>
    {items.map(d => <BottomNav.Item key={d.value} value={d.value} label={d.label} iconName={icon ?? d.iconName} disabled={d.value === disabled} />)}
  </BottomNav>
}

const Bar = (props: Parameters<typeof Nav>[0]) => <ScreenFrame size="bar" footer={<Nav {...props} />} />

function BottomNavGuide() {
  const [count, setCount] = useState<'3' | '4' | '5'>('5')
  const [active, setActive] = useState('home')
  const [disablePay, setDisablePay] = useState(false)
  const [ctx, setCtx] = useState('home')
  const items = SETS[count]
  const hasPay = items.some(d => d.value === 'pay')
  const label = (v: string) => ALL.find(d => d.value === v)?.label ?? ''

  const changeCount = (next: '3' | '4' | '5') => {
    setCount(next)
    if (!SETS[next].some(d => d.value === active)) setActive('home')
  }
  const changeDisable = (on: boolean) => {
    setDisablePay(on)
    if (on && active === 'pay') setActive('home')
  }

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A bar of equal destinations',
      description: 'The bar lays out BottomNavItems in equal shares, marks one Active, and sits on the bottom edge of the screen.',
      body: <Anatomy specimenWidth={360} marks={[{ kind: 'padding', target: byTestId('bn-anatomy') }]} parts={[
        { name: 'Bar', note: 'White surface with a hairline top border.', target: byTestId('bn-anatomy'), side: 'right' },
        { name: 'Active item', note: 'The destination people are on, in the accent colour.', target: `${byTestId('bn-anatomy')} > [role="tab"]:nth-child(1)`, side: 'top' },
        { name: 'Idle item', note: 'Another destination, one tap away.', target: `${byTestId('bn-anatomy')} > [role="tab"]:nth-child(3)`, side: 'top' },
        { name: 'Label', note: 'Names the destination in one or two words.', target: `${byTestId('bn-anatomy')} > [role="tab"]:nth-child(5) [dir="auto"]`, side: 'bottom' },
      ]}><ScreenFrame size="bar" footer={<Nav testID="bn-anatomy" onChange={() => {}} />} /></Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Three to five destinations',
      description: 'Every destination gets an equal share of the bar. Fewer destinations mean wider tap targets; five is the most that stays comfortable.',
      body: <div className="coin-new-stack">
        <ExampleCard title="3 destinations" description="Each item is about 109 px wide."><Bar items={THREE} /></ExampleCard>
        <ExampleCard title="4 destinations" description="About 82 px each."><Bar items={FOUR} /></ExampleCard>
        <ExampleCard title="5 destinations" description="About 66 px each, the Figma layout."><Bar /></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'One Active, the rest Idle',
      description: 'The screen tells Bottom Nav which destination is Active through its value. A destination can be disabled while it is temporarily unavailable.',
      body: <div className="coin-new-stack">
        <ExampleCard title="Active destination" description="Only the matching item switches to Active."><Bar value="finances" /></ExampleCard>
        <ExampleCard title="Disabled destination" description="Dimmed and skipped by keyboard focus."><Bar disabled="pay" /></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'Full width, fixed height',
      description: 'Bottom Nav spans its screen and anchors to the bottom edge. Its height comes from the items and the padding, 78 px in the installed package.',
      body: <Anatomy legend={false} specimenWidth={360} marks={[
        { kind: 'size', target: byTestId('bn-size'), side: 'top', label: 'both' },
        { kind: 'padding', target: byTestId('bn-size') },
      ]}><ScreenFrame size="bar" footer={<Nav testID="bn-size" />} /></Anatomy>,
    },
    content: {
      header: 'Content', title: 'One or two words per destination',
      description: 'Use short nouns people already know, each with an icon that matches it. A long label wraps and makes that item taller than the rest.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Short labels"><Bar /></ExampleCard>
        <ExampleCard title="A long label wraps"><Bar items={[ALL[0], { value: 'invest', label: 'Investments & savings', iconName: 'ic_rupee_coin' }, ALL[2]]} /></ExampleCard>
      </div>,
    },
    context: {
      header: 'In context', title: 'Switch sections of the app',
      description: 'The app keeps the Active value and swaps the screen above when it changes. Bottom Nav only reports which destination was pressed.',
      body: <div className="coin-new-context"><ScreenFrame size="screen" footer={<Nav value={ctx} onChange={setCtx} />}>
        <div className="coin-new-stack">
          <Text modes={MODES}>{label(ctx)}</Text>
          <Text modes={MODES}>{LINES[ctx]}</Text>
        </div>
      </ScreenFrame></div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Keep navigation calm and predictable',
      description: 'Each pair shows a change you can see in the bar.',
      body: <div className="coin-new-stack">
        <DoDont good={<Bar />} bad={<Bar items={[...ALL, { value: 'rewards', label: 'Rewards', iconName: 'ic_wallet' }]} />}
          goodTitle="Keep three to five destinations" goodCaption="Every item keeps a comfortable tap width."
          badTitle="Crowd in a sixth" badCaption="Items shrink to about 55 px and labels crowd each other." />
        <DoDont good={<Bar value="invest" />} bad={<Bar value="none" />}
          goodTitle="Keep one destination Active" goodCaption="People always see where they are."
          badTitle="Leave nothing Active" badCaption="With no match for the value, every item looks Idle." />
        <DoDont good={<Bar />} bad={<Bar icon="ic_home" />}
          goodTitle="Give each destination its own icon" goodCaption="Icons help people find a section at a glance."
          badTitle="Reuse one icon everywhere" badCaption="Identical icons force people to read every label." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Bottom Nav contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="28 September 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('bottomnav')} stories={[
        { label: 'Default', id: 'components-bottomnav--default' },
        { label: 'With disabled item', id: 'components-bottomnav--with-disabled-item' },
        { label: 'Mobile app simulation', id: 'components-bottomnav--mobile-app-simulation' },
      ]}>Declared, installed, and registry <code>jfs-components</code> versions are <code>0.1.60</code>. Bottom Nav sets each item’s <code>BottomNavItem / State</code> mode from <code>value</code> and anchors itself to the bottom of its nearest positioned container. Figma draws the bar at 77 px; the installed package renders 78 px. On the web the tab list has no accessible name, even with <code>accessibilityLabel</code>, and the Active tab is not exposed as selected. The guide stays in Light mode because the installed Dark tokens turn Idle labels orange. Item details are in the Bottom Nav Item guide.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'bottomnav', name: 'Bottom Nav',
    summary: 'Use a Bottom Nav to move between the top-level sections of an app from any screen.',
    corePrinciple: 'Three to five destinations, exactly one Active, always at the bottom.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('bottomnav'),
  }} playground={<>
    <div className="preview-stage">
      <ScreenFrame size="screen" footer={<Nav items={items} value={active} onChange={setActive} disabled={disablePay ? 'pay' : undefined} />}>
        <Text modes={MODES}>{`${label(active)} screen`}</Text>
      </ScreenFrame>
      <span className="stage-label">Live Coin Bottom Nav</span>
    </div>
    <div className="controls-panel">
      <Segment label="Items" value={count} options={['3', '4', '5'] as const} onChange={changeCount} />
      <Segment label="Active" value={label(active)} options={items.map(d => d.label)} onChange={l => setActive(items.find(d => d.label === l)!.value)} />
      {hasPay && <OnOff label="Disable Pay" value={disablePay} onChange={changeDisable} />}
      <Readout title="Active destination" value={label(active)} />
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'bottomnav',
  label: 'Bottom Nav',
  icon: <path d="M2 12h14M5 15h.01M9 15h.01M13 15h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />,
  Component: BottomNavGuide,
})
