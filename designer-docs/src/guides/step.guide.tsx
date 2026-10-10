import { useState } from 'react'
import { Button, Card, HStack, Step, StepLabel, Stepper, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, Segment, Sources, byTestId, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const LIGHT = { 'Color Mode': 'Light' } as Modes
const BTN = { 'Color Mode': 'Light', 'Button / Size': 'S' } as Modes
const CARD = { 'Color Mode': 'Light', AppearanceBrand: 'Neutral' } as Modes
const noop = () => {}
const FIGMA = 'https://www.figma.com/design/dSlK8ueQ7wlbyUSZd4f8QO/Coin-Subcomponents?node-id=27-854'

type State = 'current' | 'upcoming' | 'done' | 'attention' | 'failed'
const STATE = {
  current: ['number', 'active'], upcoming: ['number', 'inactive'], done: ['complete', 'complete'],
  attention: ['warning', 'warning'], failed: ['error', 'error'],
} as const
const stage = (s: State) => ({ status: STATE[s][0], modes: { ...LIGHT, 'Step Status': STATE[s][1] } as Modes })

/** Explicit text flags, so absent text never shows placeholders. */
const lines = (text?: string, date?: string) => ({ supportingText: text, subtitle: !!text, metaText: date, meta: !!date })

const Host = ({ children, narrow }: { children: React.ReactNode; narrow?: boolean }) =>
  <div className={`coin-new-host ${narrow ? 'narrow' : 'wide'}`}><VStack modes={LIGHT} style={{ width: '100%', padding: 0 }}>{children}</VStack></div>

const parts = (id: string) => {
  const R = byTestId(id)
  const circle = `${R} > div:first-child > div:first-child`
  const text = (n: 1 | 2 | 3) => `${R} > div:last-child > div > div:nth-child(${n})`
  return { R, circle, glyph: `${circle} > div`, connector: `${R} > div:first-child > div:nth-child(2)`, title: text(1), support: text(2), date: text(3) }
}
const A = parts('step-anatomy')
const Z = parts('step-size')

const LABELS = ['Current', 'Done', 'Attention', 'Failed'] as const
type Label = typeof LABELS[number]
const KEY: Record<Label, State> = { Current: 'current', Done: 'done', Attention: 'attention', Failed: 'failed' }
const COPY: Record<State, string> = {
  current: 'Match your PAN with your name', upcoming: 'Match your PAN with your name', done: 'PAN details match your name',
  attention: 'Your PAN name differs slightly from your bank name', failed: 'PAN not found. Check the number and try again',
}
const DATE: Record<State, string> = {
  current: 'Started 5 Oct 2026', upcoming: 'Due by 12 Oct 2026', done: 'Done 2 Oct 2026',
  attention: 'Started 5 Oct 2026', failed: 'Started 5 Oct 2026',
}
const READ: Record<State, string> = {
  current: 'Verify PAN', upcoming: 'Verify PAN', done: 'Verify PAN, Completed',
  attention: 'Verify PAN, Needs attention', failed: 'Verify PAN, Failed',
}

const connectorOff = <Step {...stage('done')} title="Verify PAN" {...lines('PAN details match your name')} showLine={false} />
const uploadStep = (onPress: () => void) => <Step {...stage('current')} title="Upload Form 16">
  <StepLabel title="Upload Form 16" supportingText="Add the PDF from your employer" subtitle meta={false} modes={LIGHT} />
  <HStack modes={LIGHT}><Button label="Upload" onPress={onPress} modes={BTN} /></HStack>
</Step>

function StepGuide() {
  const [state, setState] = useState<Label>('Current')
  const [support, setSupport] = useState(true)
  const [date, setDate] = useState(true)
  const [uploaded, setUploaded] = useState(false)
  const s = KEY[state]

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'An indicator, a connector, and three lines of text',
      description: 'A 36 px circle shows the stage’s number or outcome, and a 2 px connector runs down to the next stage. Beside them sit the title, a line of supporting text, and a date.',
      body: <Anatomy specimenWidth={312} parts={[
        { name: 'Indicator', note: '36 px circle; its colour shows the state.', target: A.circle, side: 'left' },
        { name: 'Glyph', note: 'The stage number, or a check, cross, or alert.', target: A.glyph, side: 'top' },
        { name: 'Connector', note: 'A 2 px line to the next stage.', target: A.connector, side: 'bottom' },
        { name: 'Title', note: '14 px bold; names the stage.', target: A.title, side: 'right' },
        { name: 'Supporting text', note: '12 px; what the stage involves or how it went.', target: A.support, side: 'right' },
        { name: 'Date', note: '10 px bold; when it finished, started, or is due.', target: A.date, side: 'bottom' },
      ]}>
        <Step testID="step-anatomy" {...stage('current')} title="Verify PAN" {...lines('Match your PAN with your name', 'Started 5 Oct 2026')} />
      </Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'The text lines, custom content, and the connector',
      description: 'Every Step has a title. Add supporting text and a date when they help, or replace the text with your own content. Stepper hides the connector on the last stage.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Title only" description="Compact, when the title says enough."><Host><Stepper modes={LIGHT}>
          <Step {...stage('current')} title="Verify PAN" {...lines()} />
        </Stepper></Host></ExampleCard>
        <ExampleCard title="With supporting text" description="Says what the stage involves or how it went."><Host><Stepper modes={LIGHT}>
          <Step {...stage('current')} title="Verify PAN" {...lines('Match your PAN with your name')} />
        </Stepper></Host></ExampleCard>
        <ExampleCard title="With a date" description="When the stage finished, started, or is due."><Host><Stepper modes={LIGHT}>
          <Step {...stage('current')} title="Verify PAN" {...lines('Match your PAN with your name', 'Started 5 Oct 2026')} />
        </Stepper></Host></ExampleCard>
        <ExampleCard title="Custom content" description="Children replace the text block; the row and its connector grow. Keep the title prop: it’s what screen readers hear."><Host><Stepper modes={LIGHT}>
          {uploadStep(noop)}
          <Step {...stage('upcoming')} title="Review and submit" {...lines()} />
        </Stepper></Host></ExampleCard>
        <ExampleCard title="Connector off" description="Stepper turns it off on the last stage; turn it off on a Step you place yourself."><Host>
          {connectorOff}
        </Host></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Five stage states',
      description: 'A Step’s status sets its glyph and colour together; an upcoming stage needs the Step Status mode set to inactive. An explicit Step Status always wins, so keep it matched to the status.',
      body: <div className="coin-new-example-grid three">
        <ExampleCard title="Current" description="Purple with the stage number."><Host><Stepper modes={LIGHT}><Step {...stage('current')} title="Add bank account" {...lines('Link the account you’ll invest from')} /></Stepper></Host></ExampleCard>
        <ExampleCard title="Upcoming" description="Pale lavender: not started."><Host><Stepper modes={LIGHT}><Step {...stage('upcoming')} title="eSign" {...lines('Sign the form with an Aadhaar OTP')} /></Stepper></Host></ExampleCard>
        <ExampleCard title="Done" description="Green with a check; read as “Completed”."><Host><Stepper modes={LIGHT}><Step {...stage('done')} title="Verify PAN" {...lines('PAN details match your name')} /></Stepper></Host></ExampleCard>
        <ExampleCard title="Needs attention" description="Orange alert; read as “Needs attention”."><Host><Stepper modes={LIGHT}><Step {...stage('attention')} title="Add nominee" {...lines('Nominee’s date of birth is missing')} /></Stepper></Host></ExampleCard>
        <ExampleCard title="Failed" description="Red cross; read as “Failed”."><Host><Stepper modes={LIGHT}><Step {...stage('failed')} title="Add bank account" {...lines('Account name doesn’t match your PAN')} /></Stepper></Host></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'At least 52 px, growing with its text',
      description: 'A Step fills its column and is at least 52 px tall. The indicator is 36 px with 16 px to the text; the connector is 2 px wide, starts 2 px under the circle, and stretches when the text wraps.',
      body: <div className="coin-new-stack">
        <Anatomy legend={false} specimenWidth={312} marks={[
          { kind: 'size', target: Z.R, side: 'right', label: 'both' },
          { kind: 'size', target: Z.circle, side: 'bottom', label: 'both' },
        ]}>
          <Step testID="step-size" {...stage('current')} title="Verify PAN" {...lines('Match your PAN with your name', 'Started 5 Oct 2026')} />
        </Anatomy>
        <ExampleCard title="Long text wraps" description="The title and supporting text wrap, and the row and connector grow with them."><Host narrow><Stepper modes={LIGHT}>
          <Step {...stage('current')} title="Upload Form 16 and match your employer’s TAN" {...lines('The name on Form 16 must match your PAN and the employer details you saved.', 'Started 5 Oct 2026')} />
          <Step {...stage('upcoming')} title="Review and submit" {...lines()} />
        </Stepper></Host></ExampleCard>
      </div>,
    },
    content: {
      header: 'Content', title: 'Name the stage, then say how it went',
      description: 'Write the title as the stage in a few words, such as “Verify PAN”, not an action. Use the supporting text for what happens or what went wrong, and the date for when. The glyph only says that a stage failed, not why.',
      body: <ExampleCard title="Stage names and outcomes"><Host><Stepper modes={LIGHT}>
        <Step {...stage('done')} title="Verify PAN" {...lines('PAN details match your name')} />
        <Step {...stage('attention')} title="Add nominee" {...lines('Nominee’s date of birth is missing')} />
        <Step {...stage('upcoming')} title="eSign" {...lines('Sign the form with an Aadhaar OTP')} />
      </Stepper></Host></ExampleCard>,
    },
    context: {
      header: 'In context', title: 'Uploading Form 16 while filing ITR',
      description: 'The current stage holds its own Upload button. Uploading marks the stage done, and the screen moves the current stage on.',
      body: <div className="coin-new-context">
        <Card modes={CARD}>
          <Card.Title>File your ITR</Card.Title>
          <VStack modes={LIGHT} style={{ width: '100%' }}>
            <Stepper modes={LIGHT} accessibilityLabel="ITR progress">
              <Step {...stage('done')} title="Verify PAN" {...lines('PAN details match your name', 'Done 2 Oct 2026')} />
              {uploaded
                ? <Step {...stage('done')} title="Upload Form 16" {...lines('Form 16 added', 'Done 10 Oct 2026')} />
                : uploadStep(() => setUploaded(true))}
              <Step {...stage(uploaded ? 'current' : 'upcoming')} title="Review and submit" {...lines('Check your income and file')} />
            </Stepper>
            {uploaded && <Button label="Start again" onPress={() => setUploaded(false)} modes={LIGHT} />}
          </VStack>
        </Card>
        <p className="coin-new-readout" role="status">{uploaded ? 'Stage 3 of 3: Review and submit' : 'Stage 2 of 3: Upload Form 16'}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Make every stage readable',
      description: 'Each pair shows a stage people understand versus one that misleads them.',
      body: <div className="coin-new-stack">
        <DoDont goodTitle="Match the icon and colour" goodCaption="A done stage shows a check on green."
          good={<Host><Stepper modes={LIGHT}><Step {...stage('done')} title="Verify PAN" {...lines('PAN details match your name')} /></Stepper></Host>}
          badTitle="Put a check on purple" badCaption="An explicit Step Status of active overrides the green."
          bad={<Host><Stepper modes={LIGHT}><Step status="complete" modes={{ ...LIGHT, 'Step Status': 'active' } as Modes} title="Verify PAN" {...lines('PAN details match your name')} /></Stepper></Host>} />
        <DoDont goodTitle="Turn off the last connector" goodCaption="The stage ends cleanly."
          good={<Host>{connectorOff}</Host>}
          badTitle="Leave a hanging line" badCaption="A connector with no next stage looks unfinished."
          bad={<Host><Step {...stage('done')} title="Verify PAN" {...lines('PAN details match your name')} /></Host>} />
        <DoDont goodTitle="Name the stage" goodCaption="“Verify PAN” is shown and read aloud."
          good={<Host><Stepper modes={LIGHT}><Step {...stage('current')} title="Verify PAN" {...lines()} /></Stepper></Host>}
          badTitle="Leave the default title" badCaption="“Stepper Item” tells people nothing, and it’s read as “Step 1”."
          bad={<Host><Stepper modes={LIGHT}><Step {...stage('current')} {...lines()} /></Stepper></Host>} />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Step contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="10 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('step')} stories={[
        { label: 'Default', id: 'components-step--default' }, { label: 'Complete', id: 'components-step--complete' },
        { label: 'Error', id: 'components-step--error-state' }, { label: 'Warning', id: 'components-step--warning-state' },
        { label: 'Last step', id: 'components-step--last-step' }, { label: 'Custom slot', id: 'components-step--custom-slot' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (5 October build) from the team’s private package repository. Figma keeps Step in Coin Subcomponents; the Components Library uses it inside Stepper. In Figma the Step Status mode sets the colour and a nested glyph variant the icon; in code <code>status</code> sets both, and an explicit Step Status mode overrides the colour. On the web each Step is a list item read as its title plus “Completed”, “Failed”, or “Needs attention”; the supporting text and date aren’t read, and a Step with only a StepLabel child is read as “Step” and its number. Figma’s done example shows a green date; the package keeps it grey. The published Storybook predates 0.1.78.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'step',
    corePrinciple: 'One stage: its name, its state, and what happened.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('step'),
  }} playground={<>
    <div className="preview-stage">
      <Host><Stepper modes={LIGHT}>
        <Step {...stage(s)} title="Verify PAN" {...lines(support ? COPY[s] : undefined, date ? DATE[s] : undefined)} />
        <Step {...stage('upcoming')} title="Add bank account" {...lines('Link the account you’ll invest from')} />
      </Stepper></Host>
      <span className="stage-label">Live Coin Step</span>
    </div>
    <div className="controls-panel">
      <Segment label="State" value={state} options={LABELS} onChange={setState} />
      <OnOff label="Supporting text" value={support} onChange={setSupport} />
      <OnOff label="Date" value={date} onChange={setDate} />
      <Readout title="Read as" value={READ[s]}>Screen readers hear the title and the outcome, not the supporting text or the date.</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'step',
  label: 'Step',
  summary: 'Use a Step for one stage of a process inside a Stepper, such as Verify PAN, with its number or outcome and a line of detail.',
  keywords: ['stepper item', 'stage', 'timeline item', 'progress step'],
  icon: <><circle cx="5" cy="5" r="2.75" stroke="currentColor" strokeWidth="1.5" /><path d="M5 8.5v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M10 4h6M10 7h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>,
  Component: StepGuide,
})
