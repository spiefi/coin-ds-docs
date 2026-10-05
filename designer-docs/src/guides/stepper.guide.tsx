import { useState } from 'react'
import { Button, Card, Step, Stepper, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, Segment, Sources, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const LIGHT = { 'Color Mode': 'Light' } as Modes
const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3228-457'

type State = 'done' | 'current' | 'upcoming' | 'attention' | 'failed'
const STATE = {
  done: ['complete', 'complete'], current: ['number', 'active'], upcoming: ['number', 'inactive'],
  attention: ['warning', 'warning'], failed: ['error', 'error'],
} as const
const stage = (s: State) => ({ status: STATE[s][0], modes: { ...LIGHT, 'Step Status': STATE[s][1] } as Modes })

const KYC = [
  { title: 'Verify PAN', text: 'Match your PAN with your name', date: '2 Oct 2026', attention: 'Your PAN name differs slightly from your bank name', failed: 'PAN not found. Check the number and try again' },
  { title: 'Add bank account', text: 'Link the account you’ll invest from', date: '3 Oct 2026', attention: 'Add your account’s IFSC to continue', failed: 'Account name doesn’t match your PAN' },
  { title: 'Add nominee', text: 'Choose who receives your investments', date: '4 Oct 2026', attention: 'Nominee’s date of birth is missing', failed: 'Nominee details couldn’t be saved. Try again' },
  { title: 'eSign', text: 'Sign the form with an Aadhaar OTP', date: '5 Oct 2026', attention: 'Your OTP expires in 2 minutes', failed: 'OTP didn’t match. Request a new one' },
]
const OUTCOMES = ['In progress', 'Needs attention', 'Failed'] as const
type Outcome = typeof OUTCOMES[number]

/** One Step with explicit text flags, so absent text never shows placeholders. */
function step(key: string | number, s: State, title?: string, text?: string, date?: string) {
  return <Step key={key} {...stage(s)} title={title} supportingText={text} subtitle={!!text} metaText={date} meta={!!date} />
}

const Host = ({ children }: { children: React.ReactNode }) => <div className="coin-new-host wide"><VStack modes={LIGHT} style={{ width: '100%' }}>{children}</VStack></div>

/** Every stage carries a date line, as in Figma: when it finished, started, or is due. */
const STARTED = 'Started 5 Oct 2026'
const DUE = 'Due by 12 Oct 2026'
const done = (date: string) => `Done ${date}`

/** KYC(current, outcome): `current` is 1-based; current > 4 means every stage is done. */
function kyc(current: number, outcome: Outcome, dates = true, doneDates?: string[]) {
  return KYC.map((k, i) => {
    const n = i + 1
    if (n < current) return step(n, 'done', k.title, k.text, dates ? done(doneDates?.[i] || k.date) : undefined)
    if (n === current) {
      const date = dates ? STARTED : undefined
      if (outcome === 'Needs attention') return step(n, 'attention', k.title, k.attention, date)
      if (outcome === 'Failed') return step(n, 'failed', k.title, k.failed, date)
      return step(n, 'current', k.title, k.text, date)
    }
    return step(n, 'upcoming', k.title, k.text, dates ? DUE : undefined)
  })
}

const S = (k: number) => `:scope > div > div:nth-child(${k})`
const circle = (k: number) => `${S(k)} > div:first-child > div:first-child`
const connector = (k: number) => `${S(k)} > div:first-child > div:nth-child(2)`
const text = (k: number, n: 1 | 2 | 3) => `${S(k)} > div:last-child > div > div:nth-child(${n})`

function StepperGuide() {
  const [current, setCurrent] = useState('2')
  const [outcome, setOutcome] = useState<Outcome>('In progress')
  const [dates, setDates] = useState(true)
  const [ctx, setCtx] = useState(2)
  const [ctxDates, setCtxDates] = useState<string[]>([])
  const cur = Number(current)

  const advance = () => {
    if (ctx > 4) { setCtx(1); setCtxDates([]); return }
    setCtxDates(d => { const next = [...d]; next[ctx - 1] = '5 Oct 2026'; return next })
    setCtx(ctx + 1)
  }

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'Stages joined by a line',
      description: 'Each stage pairs a 36 px indicator with its text. A 2 px connector links it to the next stage; the last stage has none.',
      body: <Anatomy specimenWidth={328} parts={[
        { name: 'Indicator', note: 'Circle whose colour and icon show the stage’s state.', target: circle(1), side: 'left' },
        { name: 'Connector', note: 'Links a stage to the next one.', target: connector(2), side: 'left' },
        { name: 'Upcoming stage', note: 'Pale circle: not started yet.', target: circle(3), side: 'bottom' },
        { name: 'Title', note: 'Names the stage.', target: text(1, 1), side: 'top' },
        { name: 'Date', note: 'When the stage finished, started, or is due.', target: text(1, 3), side: 'right' },
        { name: 'Supporting text', note: 'What the stage involves, or how it went.', target: text(2, 2), side: 'right' },
      ]}>
        <Stepper modes={LIGHT}>
          {step(1, 'done', KYC[0].title, KYC[0].text, done(KYC[0].date))}
          {step(2, 'current', KYC[1].title, KYC[1].text)}
          {step(3, 'upcoming', KYC[2].title, KYC[2].text)}
        </Stepper>
      </Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Choose the text each stage shows',
      description: 'Every stage has a title. Add supporting text to say what the stage involves or how it went, and a date when timing matters, as on an order tracker.',
      body: <div className="coin-new-example-grid three">
        <ExampleCard title="Title only" description="Compact, for short processes whose titles say enough."><Host><Stepper modes={LIGHT}>
          {step(1, 'done', KYC[0].title)}{step(2, 'current', KYC[1].title)}{step(3, 'upcoming', KYC[2].title)}
        </Stepper></Host></ExampleCard>
        <ExampleCard title="Title and supporting text" description="Explains what each stage asks for."><Host><Stepper modes={LIGHT}>
          {step(1, 'done', KYC[0].title, KYC[0].text)}{step(2, 'current', KYC[1].title, KYC[1].text)}{step(3, 'upcoming', KYC[2].title, KYC[2].text)}
        </Stepper></Host></ExampleCard>
        <ExampleCard title="With dates" description="Shows when each stage finished, started, or is due."><Host><Stepper modes={LIGHT}>
          {step(1, 'done', KYC[0].title, KYC[0].text, done(KYC[0].date))}{step(2, 'current', KYC[1].title, KYC[1].text, STARTED)}{step(3, 'upcoming', KYC[2].title, KYC[2].text, DUE)}
        </Stepper></Host></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Five stage states',
      description: 'Each stage shows one state. In Figma, pick it with the Step Status mode; in code the matching icon and colour are set together, so a check is always green.',
      body: <div className="coin-new-example-grid three">
        <ExampleCard title="Done" description="Green circle with a check."><Host><Stepper modes={LIGHT}>{step(1, 'done', 'Verify PAN', 'PAN details match your name')}</Stepper></Host></ExampleCard>
        <ExampleCard title="Current" description="Purple circle with the stage number."><Host><Stepper modes={LIGHT}>{step(1, 'current', KYC[1].title, KYC[1].text)}</Stepper></Host></ExampleCard>
        <ExampleCard title="Upcoming" description="Pale lavender circle: not started."><Host><Stepper modes={LIGHT}>{step(1, 'upcoming', KYC[3].title, KYC[3].text)}</Stepper></Host></ExampleCard>
        <ExampleCard title="Needs attention" description="Orange alert: the person must act to continue."><Host><Stepper modes={LIGHT}>{step(1, 'attention', 'Add nominee', 'Nominee’s date of birth is missing')}</Stepper></Host></ExampleCard>
        <ExampleCard title="Failed" description="Red cross: say what went wrong."><Host><Stepper modes={LIGHT}>{step(1, 'failed', 'Add bank account', 'Account name doesn’t match your PAN')}</Stepper></Host></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'Full width, at least 52 px per stage',
      description: 'Stepper fills its container with 8 px on each side. Each stage is at least 52 px tall and grows when its text wraps; the connector grows with it. The indicator is 36 px, with 16 px to the text.',
      body: <Anatomy legend={false} specimenWidth={328} marks={[
        { kind: 'size', target: S(1), side: 'right', label: 'both' },
        { kind: 'size', target: circle(2), side: 'bottom', label: 'both' },
        { kind: 'padding', target: ':scope > div' },
      ]}>
        <Stepper modes={LIGHT}>
          {step(1, 'done', KYC[0].title, KYC[0].text)}
          {step(2, 'current', KYC[1].title, KYC[1].text)}
        </Stepper>
      </Anatomy>,
    },
    content: {
      header: 'Content', title: 'Name the stage, then say how it went',
      description: 'Titles name the stage in a few words, such as “Verify PAN”, not an action like “Click to verify”. Supporting text says what happens or what went wrong, because the indicator’s colour and icon aren’t announced.',
      body: <ExampleCard title="Stage names and outcomes"><Host><Stepper modes={LIGHT}>
        {step(1, 'done', 'Verify PAN', 'PAN details match your name')}
        {step(2, 'attention', 'Add nominee', 'Nominee’s date of birth is missing')}
        {step(3, 'upcoming', 'eSign', 'Sign the form with an Aadhaar OTP')}
      </Stepper></Host></ExampleCard>,
    },
    context: {
      header: 'In context', title: 'KYC progress on a card',
      description: 'The screen works out each stage’s state and updates the Stepper as the person moves on. Stepper isn’t pressable, so the next action is a separate button.',
      body: <div className="coin-new-context">
        <Card modes={LIGHT}><VStack modes={LIGHT} style={{ width: '100%' }}>
          <Stepper modes={LIGHT}>{kyc(ctx, 'In progress', true, ctxDates)}</Stepper>
          <Button modes={LIGHT} label={ctx > 4 ? 'Start again' : 'Continue'} onPress={advance} />
        </VStack></Card>
        <p className="coin-new-readout" role="status">{ctx > 4 ? 'All 4 stages done' : `Stage ${ctx} of 4: ${KYC[ctx - 1].title}`}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Make every stage readable',
      description: 'Each pair shows a stage people understand versus one that misleads them.',
      body: <div className="coin-new-stack">
        <DoDont goodTitle="Match the icon and colour" goodCaption="A done stage shows a check on green."
          good={<Host><Stepper modes={LIGHT}>{step(1, 'done', 'Verify PAN', 'PAN details match your name')}</Stepper></Host>}
          badTitle="Put a check on purple" badCaption="A check in the current colour reads as both done and in progress."
          bad={<Host><Stepper modes={LIGHT}><Step status="complete" modes={{ ...LIGHT, 'Step Status': 'active' } as Modes} title="Verify PAN" supportingText="PAN details match your name" meta={false} /></Stepper></Host>} />
        <DoDont goodTitle="Name each stage" goodCaption="“Verify PAN” and “Add bank account” say what happens."
          good={<Host><Stepper modes={LIGHT}>{step(1, 'done', 'Verify PAN')}{step(2, 'current', 'Add bank account')}</Stepper></Host>}
          badTitle="Leave the default titles" badCaption="“Stepper Item” tells people nothing."
          bad={<Host><Stepper modes={LIGHT}>{step(1, 'done')}{step(2, 'current')}</Stepper></Host>} />
        <DoDont goodTitle="Write the outcome" goodCaption="The text says what failed and what to fix."
          good={<Host><Stepper modes={LIGHT}>{step(1, 'failed', 'Add bank account', 'Account name doesn’t match your PAN')}</Stepper></Host>}
          badTitle="Rely on the icon" badCaption="A red cross alone doesn’t say what failed, and screen readers don’t hear it."
          bad={<Host><Stepper modes={LIGHT}>{step(1, 'failed', 'Add bank account')}</Stepper></Host>} />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Stepper contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="5 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('stepper')} stories={[
        { label: 'Default', id: 'components-stepper--default' }, { label: 'Order tracking', id: 'components-stepper--order-tracking' },
        { label: 'Three steps', id: 'components-stepper--three-steps' }, { label: 'Step complete', id: 'components-step--complete' },
        { label: 'Step error', id: 'components-step--error-state' }, { label: 'Step warning', id: 'components-step--warning-state' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> from the team’s private package repository. In Figma a stage’s Step Status mode sets both its colour and its icon; in code the developer sets the matching <code>status</code> and Step Status mode together. Stepper is vertical only and not interactive, and Figma’s numerals all read 1 while code numbers stages in order. On the web it is read as plain text, with no list, no current stage, and no names for the icons, so the text must carry each stage’s state. The published Storybook predates 0.1.78, and its done, error, and warning examples show the icon on purple.</Sources>,
    },
  }

  const cs = KYC[cur - 1]
  return <ComponentGuideTemplate metadata={{
    slug: 'stepper',
    corePrinciple: 'Every stage named, its state shown in colour, icon, and words.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('stepper'),
  }} playground={<>
    <div className="preview-stage">
      <Host><Stepper modes={LIGHT}>{kyc(cur, outcome, dates)}</Stepper></Host>
      <span className="stage-label">Live Coin Stepper</span>
    </div>
    <div className="controls-panel">
      <Segment label="Current stage" value={current} options={['1', '2', '3', '4'] as const} onChange={setCurrent} />
      <Segment label="Outcome" value={outcome} options={OUTCOMES} onChange={setOutcome} />
      <OnOff label="Dates" value={dates} onChange={setDates} />
      <Readout title="Progress" value={`Stage ${cur} of 4: ${cs.title}`}>Stepper isn’t pressable. The screen sets each stage’s state.</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'stepper',
  label: 'Stepper',
  summary: 'Use a Stepper to show where someone is in a process with several stages, such as KYC, and how each stage went.',
  keywords: ['progress steps', 'timeline', 'onboarding steps', 'order tracking'],
  icon: <><circle cx="5" cy="4" r="2.2" fill="currentColor" /><path d="M5 6.7v4.6" stroke="currentColor" strokeWidth="1.5" /><circle cx="5" cy="14" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M10 4h6M10 14h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>,
  Component: StepperGuide,
})
