import { useEffect, useRef, useState } from 'react'
import { Button, HStack, Spinner, Text, Title, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, ScreenFrame, Segment, Sources, byTestId, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2729-1039'
const LIGHT = { 'Color Mode': 'Light' } as Modes
const SP = byTestId('sp-anatomy')
const STATEMENTS = ['September 2026 statement', 'August 2026 statement', 'July 2026 statement']

function Waiting({ size }: { size: number }) {
  return (
    <VStack modes={{ ...LIGHT, 'Slot gap': 'S' } as Modes} alignHorizontal="center">
      <Spinner size={size} accessibilityLabel="Loading your statements" />
      <Text modes={LIGHT}>Fetching your statements…</Text>
    </VStack>
  )
}

function SpinningRows() {
  return (
    <VStack modes={{ ...LIGHT, 'Slot gap': 'S' } as Modes}>
      {STATEMENTS.map(s => (
        <HStack key={s} modes={LIGHT} alignVertical="center" justifyHorizontal="space-between">
          <Text modes={LIGHT}>{s}</Text>
          <Spinner size={24} />
        </HStack>
      ))}
    </VStack>
  )
}

const SIZES = ['32', '56', '72', '88', '128'] as const
const TURNS = { '1000 ms': 1000, '1500 ms': 1500, '2800 ms': 2800 } as const
const WEIGHTS = { None: 0, Default: 0.45, Heavy: 0.85 } as const
type Size = typeof SIZES[number]
type Turn = keyof typeof TURNS
type Weight = keyof typeof WEIGHTS

function SpinnerGuide() {
  const [size, setSize] = useState<Size>('72')
  const [turn, setTurn] = useState<Turn>('1500 ms')
  const [weight, setWeight] = useState<Weight>('Default')
  const [animating, setAnimating] = useState(true)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('Statements up to date')
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => () => clearTimeout(timer.current), [])
  const refresh = () => {
    setLoading(true)
    setStatus('Loading statements…')
    clearTimeout(timer.current)
    timer.current = setTimeout(() => { setLoading(false); setStatus('Statements up to date') }, 1800)
  }

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'Three arcs chasing each other',
      description: 'Three 100° arcs with round ends turn clockwise around an empty centre, with no track behind them. Each is 11% of the size thick, so 7.9 px at the default 72 px. The diagram shows the resting pose so the pins stay put.',
      body: <Anatomy marks={[{ kind: 'size', target: SP, side: 'bottom', label: 'both' }]} parts={[
        { name: 'Leading arc', note: 'Gold and drawn on top. It leads the turn: fastest over the top, slowest at the bottom.', target: `${SP} > div:nth-child(3) path`, side: 'top' },
        { name: 'Middle arc', note: 'Purple. It follows the gold arc; the gap between them opens and closes as it turns.', target: `${SP} > div:nth-child(2) path`, side: 'left' },
        { name: 'Trailing arc', note: 'Teal and last in the chain, closing up behind the others at the top of each turn.', target: SP, side: 'right' },
      ]}><Spinner testID="sp-anatomy" animating={false} /></Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Size, speed, and weight',
      description: 'Three settings shape it: size sets the diameter, durationMs the time for one turn, and gravity how much it speeds up over the top and slows at the bottom. No mode changes it. A colors setting can replace its three colours in code; keep Coin\'s gold, purple, and teal.',
      body: <div className="coin-new-example-grid three">
        <ExampleCard title="Default" description="72 px, one turn every 1.5 s, and gravity 0.45."><Spinner /></ExampleCard>
        <ExampleCard title="Heavy" description="Whips over the top and hangs at the bottom, for a slower, weightier feel."><Spinner gravity={0.85} durationMs={2800} /></ExampleCard>
        <ExampleCard title="Weightless" description="An even, steady turn with no change of speed."><Spinner gravity={0} durationMs={1600} /></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Spinning or resting',
      description: 'It spins while animating is on, the default. With animating off, or when the device asks for reduced motion, it rests as an evenly spaced fan of three arcs; the rest isn\'t a frame of the spin. It has no pressed, focus, or disabled state.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Spinning" description="Shown while something loads; the screen removes it when the content arrives."><Spinner /></ExampleCard>
        <ExampleCard title="Resting" description="Also what people who turn on reduced motion see."><Spinner animating={false} /></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'You set the diameter',
      description: 'Size is the diameter in px: 72 by default, with no minimum or maximum. The arcs stay 11% of it thick, so a 32 px spinner draws 3.5 px arcs. It keeps its size and doesn\'t stretch to fill its host.',
      body: <div className="coin-new-example-grid three">
        <ExampleCard title="32 px" description="3.5 px arcs. Small enough to sit beside a line of text."><Spinner size={32} /></ExampleCard>
        <ExampleCard title="56 px" description="6.2 px arcs, for a card or one section that's loading."><Spinner size={56} /></ExampleCard>
        <ExampleCard title="88 px" description="9.7 px arcs, for a whole screen waiting on one thing."><Spinner size={88} /></ExampleCard>
      </div>,
    },
    content: {
      header: 'Content', title: 'No text of its own',
      description: 'The spinner shows no words. Its spoken name is “Loading” unless you set accessibilityLabel; name what\'s loading, and add a short line of text next to it when the wait is more than a moment.',
      body: <ExampleCard title="Say what's loading" description="A 56 px spinner named “Loading your statements” and one line that says the same."><Waiting size={56} /></ExampleCard>,
    },
    context: {
      header: 'In context', title: 'Refreshing statements',
      description: 'Refresh swaps the list for a spinner and a line of text while the statements load, then brings the list back. The screen owns the loading state; the spinner only shows it.',
      body: <div className="coin-new-context">
        <ScreenFrame>
          <VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes}>
            <Title title="Statements" subtitle="Savings account ··4821" modes={LIGHT} />
            {loading ? <Waiting size={40} /> : (
              <VStack modes={{ ...LIGHT, 'Slot gap': 'S' } as Modes}>
                {STATEMENTS.map(s => <Text key={s} modes={LIGHT}>{s}</Text>)}
              </VStack>
            )}
            <Button label="Refresh" modes={LIGHT} disabled={loading} onPress={refresh} />
          </VStack>
        </ScreenFrame>
        <p className="coin-new-readout" role="status">{status}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'One clear wait',
      description: 'Each pair shows a wait people understand next to one that leaves them guessing or watching several spinners at once.',
      body: <div className="coin-new-stack">
        <DoDont good={<Waiting size={40} />} bad={<Spinner size={40} />}
          goodTitle="Say what's loading" goodCaption="A short line next to it tells people what they're waiting for."
          badTitle="Leave it unexplained" badCaption="A spinner on its own says something is happening, not what." />
        <DoDont good={<Waiting size={40} />} bad={<SpinningRows />}
          goodTitle="Show one spinner per wait" goodCaption="One spinner covers the whole list while it loads."
          badTitle="Spin every row" badCaption="Several spinners compete for attention and make the wait feel longer." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Spinner contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="12 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('spinner')} stories={[
        { label: 'Default', id: 'components-spinner--default' }, { label: 'Sizes', id: 'components-spinner--sizes' },
        { label: 'Heavy', id: 'components-spinner--heavy' }, { label: 'Weightless', id: 'components-spinner--weightless' },
        { label: 'Resting', id: 'components-spinner--resting' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (5 October build) from the team’s private package repository; Biscuit’s newer build only rewrites the Storybook page. Figma’s Spinner is one 72 × 72 frame of three arcs in gold, purple, and teal, with no variants; the motion, speed, weight, and resting pose exist only in code. In code the arcs are 11% of the size thick, 7.9 px at 72, while Figma’s ring is about 12.8 px (#276). No mode changes it, and a colors setting replaces its three colours. It is announced as a progress bar named “Loading” unless you name it, with no value. The code’s description of durationMs says 2400 ms, but the default is 1500 ms. The published Storybook page is still the old generated one.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'spinner',
    corePrinciple: 'Show that something is happening, then get out of the way.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('spinner'),
  }} playground={<>
    <div className="preview-stage">
      <Spinner size={Number(size)} durationMs={TURNS[turn]} gravity={WEIGHTS[weight]} animating={animating} />
      <span className="stage-label">Live Coin Spinner</span>
    </div>
    <div className="controls-panel">
      <Segment label="Size" value={size} options={SIZES} onChange={setSize} />
      <Segment label="Turn" value={turn} options={['1000 ms', '1500 ms', '2800 ms'] as const} onChange={setTurn} />
      <Segment label="Weight" value={weight} options={['None', 'Default', 'Heavy'] as const} onChange={setWeight} />
      <OnOff label="Animating" value={animating} onChange={setAnimating} />
      <Readout title="Spinner" value={animating ? 'Spinning' : 'Resting'}>
        {animating
          ? 'It turns until the screen removes it or sets animating off. Weight makes it whip over the top and slow at the bottom.'
          : 'Resting: three evenly spaced arcs, which isn\'t a frame of the spin.'}
      </Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'spinner',
  label: 'Spinner',
  summary: 'Use a Spinner to show that something is loading when you can\'t show its shape or say how long it will take.',
  keywords: ['loader', 'loading indicator', 'activity indicator', 'progress spinner'],
  icon: <path d="M9 2.5a6.5 6.5 0 1 1-6.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />,
  Component: SpinnerGuide,
})
