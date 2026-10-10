import { useState } from 'react'
import { Button, Card, HStack, Step, StepLabel, Stepper, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, Sources, byTestId, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const LIGHT = { 'Color Mode': 'Light' } as Modes
const BTN = { 'Color Mode': 'Light', 'Button / Size': 'S' } as Modes
const CARD = { 'Color Mode': 'Light', AppearanceBrand: 'Neutral' } as Modes
const FIGMA = 'https://www.figma.com/design/dSlK8ueQ7wlbyUSZd4f8QO/Coin-Subcomponents?node-id=27-854'

type State = 'current' | 'upcoming' | 'done' | 'failed'
const STATE = {
  current: ['number', 'active'], upcoming: ['number', 'inactive'], done: ['complete', 'complete'], failed: ['error', 'error'],
} as const
const stage = (s: State) => ({ status: STATE[s][0], modes: { ...LIGHT, 'Step Status': STATE[s][1] } as Modes })

const Host = ({ children, narrow }: { children: React.ReactNode; narrow?: boolean }) =>
  <div className={`coin-new-host ${narrow ? 'narrow' : 'wide'}`}><VStack modes={LIGHT} style={{ width: '100%', padding: 0 }}>{children}</VStack></div>

const labelled = (s: State, title: string, text?: string, date?: string) =>
  <Step {...stage(s)} title={title}><StepLabel title={title} supportingText={text} metaText={date} modes={LIGHT} /></Step>

const parts = (id: string) => {
  const R = byTestId(id)
  return { R, title: `${R} > div:nth-child(1)`, supporting: `${R} > div:nth-child(2)`, date: `${R} > div:nth-child(3)` }
}
const A = parts('steplabel-anatomy')
const Z = parts('steplabel-size')

function StepLabelGuide() {
  const [support, setSupport] = useState(true)
  const [date, setDate] = useState(true)
  const [added, setAdded] = useState(false)
  const height = support && date ? '50 px' : support ? '36 px' : date ? '32 px' : '18 px'

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'Three lines of text in a column',
      description: 'A title, a line of supporting text, and a date, stacked 2 px apart. Only the title is always there, and the column fills the width it’s given.',
      body: <Anatomy specimenWidth={280} parts={[
        { name: 'Column', note: 'Fills its host’s width; the lines sit 2 px apart.', target: A.R, side: 'left' },
        { name: 'Title', note: '14 px bold; names the stage and is always shown.', target: A.title, side: 'top' },
        { name: 'Supporting text', note: '12 px; what the stage involves or how it went.', target: A.supporting, side: 'right' },
        { name: 'Date', note: '10 px bold; when it finished, started, or is due.', target: A.date, side: 'bottom' },
      ]}>
        <StepLabel testID="steplabel-anatomy" title="Verify PAN" supportingText="Match your PAN with your name" metaText="Started 5 Oct 2026" modes={LIGHT} />
      </Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'A title, plus up to two optional lines',
      description: 'The title is always shown. A line of supporting text or a date shows only when it has text and its switch is on: subtitle and meta, as in Figma.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Title only" description="Compact, when the stage name says enough."><Host>
          <StepLabel title="Add address" modes={LIGHT} />
        </Host></ExampleCard>
        <ExampleCard title="With supporting text" description="One line on what the stage involves."><Host>
          <StepLabel title="Confirm nominee" supportingText="Someone who can claim this account" modes={LIGHT} />
        </Host></ExampleCard>
        <ExampleCard title="With a date" description="When the stage finished, started, or is due."><Host>
          <StepLabel title="Review and submit" supportingText="Check your income and file" metaText="Due by 12 Oct 2026" modes={LIGHT} />
        </Host></ExampleCard>
        <ExampleCard title="Date switched off" description="With meta off, the date stays hidden even though it has text. Subtitle does the same for supporting text."><Host>
          <StepLabel title="Verify PAN" supportingText="Match your PAN with your name" metaText="Started 5 Oct 2026" meta={false} modes={LIGHT} />
        </Host></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'No states of its own',
      description: 'A Step Label looks the same in every stage. The Step’s indicator shows whether the stage is current, done, or failed, so say what happened in the supporting text.',
      body: <div className="coin-new-example-grid three">
        <ExampleCard title="Current stage" description="Black title, grey detail."><Host><Stepper modes={LIGHT}>{labelled('current', 'Verify PAN', 'Match your PAN with your name')}</Stepper></Host></ExampleCard>
        <ExampleCard title="Done stage" description="Same colours; the green check says it’s done."><Host><Stepper modes={LIGHT}>{labelled('done', 'Verify PAN', 'PAN details match your name')}</Stepper></Host></ExampleCard>
        <ExampleCard title="Failed stage" description="Same colours; the text says what went wrong."><Host><Stepper modes={LIGHT}>{labelled('failed', 'Verify PAN', 'PAN not found. Check the number and try again')}</Stepper></Host></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'It fills its column, and its lines set the height',
      description: 'A Step Label has no fixed size. It takes the width it’s given (in a Step, everything right of the indicator) and is 18 px tall with a title alone, 50 px with all three lines.',
      body: <div className="coin-new-stack">
        <Anatomy legend={false} specimenWidth={280} marks={[
          { kind: 'size', target: Z.R, side: 'bottom', label: 'both' },
          { kind: 'gap', from: Z.title, to: Z.supporting },
        ]}>
          <StepLabel testID="steplabel-size" title="Verify PAN" supportingText="Match your PAN with your name" metaText="Started 5 Oct 2026" modes={LIGHT} />
        </Anatomy>
        <ExampleCard title="Long text wraps" description="Nothing is cut off: each line wraps and the label grows."><Host narrow>
          <StepLabel title="Upload Form 16 and match your employer’s TAN" supportingText="The name on Form 16 must match your PAN and the employer details you saved." metaText="Started 5 Oct 2026" modes={LIGHT} />
        </Host></ExampleCard>
      </div>,
    },
    content: {
      header: 'Content', title: 'A stage name, one line of detail, and a date',
      description: 'Write the title as the stage in one to four words, in sentence case, such as “Verify PAN”. Keep the supporting text to one line on what happens or what went wrong, and start the date with what it marks: Done, Started, or Due by.',
      body: <ExampleCard title="Stage names, details, and dates"><Host><Stepper modes={LIGHT}>
        {labelled('done', 'Verify PAN', 'PAN details match your name', 'Done 2 Oct 2026')}
        {labelled('current', 'Add nominee', 'Someone who can claim this account', 'Started 5 Oct 2026')}
        {labelled('upcoming', 'eSign', 'Sign the form with an Aadhaar OTP', 'Due by 12 Oct 2026')}
      </Stepper></Host></ExampleCard>,
    },
    context: {
      header: 'In context', title: 'Adding a nominee while opening a demat account',
      description: 'The current stage holds a Step Label and an Add nominee button. Once the nominee is added, the screen gives the Step back its own text and moves the current stage on.',
      body: <div className="coin-new-context">
        <Card modes={CARD}>
          <Card.Title>Open your demat account</Card.Title>
          <VStack modes={LIGHT} style={{ width: '100%' }}>
            <Stepper modes={LIGHT} accessibilityLabel="Account opening progress">
              <Step {...stage('done')} title="Verify PAN" supportingText="PAN details match your name" metaText="Done 2 Oct 2026" />
              {added
                ? <Step {...stage('done')} title="Add nominee" supportingText="Nominee added" metaText="Done 10 Oct 2026" />
                : <Step {...stage('current')} title="Add nominee">
                  <StepLabel title="Add nominee" supportingText="Someone who can claim this account" modes={LIGHT} />
                  <HStack modes={LIGHT}><Button label="Add nominee" onPress={() => setAdded(true)} modes={BTN} /></HStack>
                </Step>}
              <Step {...stage(added ? 'current' : 'upcoming')} title="eSign" supportingText="Sign the form with an Aadhaar OTP" />
            </Stepper>
            {added && <Button label="Start again" onPress={() => setAdded(false)} modes={LIGHT} />}
          </VStack>
        </Card>
        <p className="coin-new-readout" role="status">{added ? 'Stage 3 of 3: eSign' : 'Stage 2 of 3: Add nominee'}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Keep the label readable and named',
      description: 'Each pair shows a Step Label people can read and hear versus one that lets them down.',
      body: <div className="coin-new-stack">
        <DoDont goodTitle="Keep the Step’s title" goodCaption="The stage is read as “Add nominee”."
          good={<Host><Stepper modes={LIGHT}>{labelled('current', 'Add nominee', 'Someone who can claim this account')}</Stepper></Host>}
          badTitle="Rely on the label alone" badCaption="Without the Step’s title, it’s read as “Step 1”."
          bad={<Host><Stepper modes={LIGHT}><Step {...stage('current')}><StepLabel title="Add nominee" supportingText="Someone who can claim this account" modes={LIGHT} /></Step></Stepper></Host>} />
        <DoDont goodTitle="Leave the brand mode unset" goodCaption="The supporting text stays dark grey."
          good={<Host><StepLabel title="Verify PAN" supportingText="Match your PAN with your name" modes={LIGHT} /></Host>}
          badTitle="Pass a Primary brand mode" badCaption="AppearanceBrand Primary, even on the Stepper, turns the detail gold: 2.4:1 on white."
          bad={<Host><StepLabel title="Verify PAN" supportingText="Match your PAN with your name" modes={{ ...LIGHT, AppearanceBrand: 'Primary' } as Modes} /></Host>} />
        <DoDont goodTitle="Name the stage" goodCaption="“Verify PAN” says what happens here."
          good={<Host><StepLabel title="Verify PAN" supportingText="Match your PAN with your name" modes={LIGHT} /></Host>}
          badTitle="Leave the default title" badCaption="Without a title, it shows “Stepper Item”."
          bad={<Host><StepLabel supportingText="Match your PAN with your name" modes={LIGHT} /></Host>} />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Step Label contract',
      description: 'The guide compares Step’s text frame in Figma with the installed package and its Storybook stories.',
      body: <Sources checked="10 October 2026" figmaUrl={FIGMA} figmaDescription="Step’s text frame, in Coin Subcomponents" storybookUrl={docsUrl('steplabel')} stories={[
        { label: 'Default', id: 'components-steplabel--default' }, { label: 'Title only', id: 'components-steplabel--title-only' },
        { label: 'With supporting text', id: 'components-steplabel--with-supporting-text' }, { label: 'With meta', id: 'components-steplabel--with-meta' },
        { label: 'Long text', id: 'components-steplabel--long-text' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (5 October build) from the team’s private package repository. Figma has no Step Label component: it is the text frame inside Step in Coin Subcomponents, whose title, supporting text, and Meta text and subtitle and meta switches match the props. Only Color Mode, and AppearanceBrand for the supporting line, change the label, and it takes modes from its own prop or its Step, not from JFSThemeProvider. It has no role or name of its own: the Step around it is announced by the Step’s title. Figma’s done example shows a green date; the package keeps it grey. The published Storybook predates 0.1.78.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'steplabel',
    corePrinciple: 'The stage in words: its name, one line of detail, and when.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('steplabel'),
  }} playground={<>
    <div className="preview-stage">
      <Host>
        <StepLabel title="Verify PAN" supportingText="Match your PAN with your name" metaText="Started 5 Oct 2026" subtitle={support} meta={date} modes={LIGHT} />
      </Host>
      <span className="stage-label">Live Coin Step Label</span>
    </div>
    <div className="controls-panel">
      <OnOff label="Supporting text" value={support} onChange={setSupport} />
      <OnOff label="Date" value={date} onChange={setDate} />
      <Readout title="Height" value={height}>Each line adds its height and a 2 px gap. The width always follows the column.</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'steplabel',
  label: 'Step Label',
  summary: 'Use a Step Label to keep a Step’s title, detail and date when you put your own content, such as a button, inside the Step.',
  keywords: ['step title', 'step text', 'stepper text', 'stage label'],
  icon: <path d="M3 5h12M3 9h9M3 13h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />,
  Component: StepLabelGuide,
})
