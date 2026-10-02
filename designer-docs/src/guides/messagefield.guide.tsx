import { useState, type ReactNode } from 'react'
import { Button, Card, FormField, MessageField, SupportText, Text, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, Segment, Sources, Surface, byTestId, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const LIGHT = { 'Color Mode': 'Light' } as Modes
const ERROR = { 'Color Mode': 'Light', Status: 'Error' } as Modes
const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4835-2564'
const R = byTestId('mf-anatomy')
const B = `${byTestId('mf-size')} > div:nth-child(2)`
const ERROR_MSG = 'Add a few more details, at least 20 characters'

type MFProps = React.ComponentProps<typeof MessageField>

function Host({ children }: { children: ReactNode }) {
  return <Surface width="wide"><VStack modes={LIGHT} style={{ width: '100%' }}>{children}</VStack></Surface>
}

function Input({ value: initial = '', ...props }: MFProps) {
  const [value, setValue] = useState(initial)
  return <MessageField modes={LIGHT} {...props} value={value} onChangeText={setValue} />
}

function Field(props: MFProps) {
  return <Host><Input {...props} /></Host>
}

function ErrorField() {
  return <Host>
    <Input label="Describe your issue" value="Charged twice" maxLength={140} isInvalid />
    <SupportText modes={ERROR} status="Error" label={ERROR_MSG} />
  </Host>
}

function ReportProblem() {
  const [value, setValue] = useState('')
  const [invalid, setInvalid] = useState(false)
  const [ok, setOk] = useState(false)
  const submit = () => {
    const bad = value.replace(/\s/g, '').length < 20
    setInvalid(bad); setOk(!bad)
  }
  return <Card modes={LIGHT}><VStack modes={LIGHT}>
    <MessageField modes={LIGHT} label="Describe your issue" placeholder="What happened, and when?" maxLength={500} isRequired
      value={value} onChangeText={t => { setValue(t); setInvalid(false); setOk(false) }} isInvalid={invalid} />
    {invalid && <SupportText modes={ERROR} status="Error" label={ERROR_MSG} />}
    <Button modes={LIGHT} label="Submit" onPress={submit} />
    {ok && <Text modes={LIGHT}>Thanks, we’ll reply within 24 hours</Text>}
  </VStack></Card>
}

function MessageFieldGuide() {
  const [value, setValue] = useState('')
  const [label, setLabel] = useState('Describe your issue')
  const [limit, setLimit] = useState<'None' | '140' | '500'>('140')
  const [rows, setRows] = useState<'4' | '6' | '8'>('4')
  const [state, setState] = useState<'Default' | 'Error' | 'Read only' | 'Disabled'>('Default')
  const [required, setRequired] = useState(false)

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A label, a text area, and a counter',
      description: 'The label names the message. The text area holds a few lines of text, and a counter below shows how much room is left.',
      body: <Anatomy surface="white" specimenWidth={300} parts={[
        { name: 'Label', note: 'Names the message and gives the field its accessible name.', target: `${R} > div:first-child > div:first-child`, side: 'left' },
        { name: 'Required mark', note: 'A red asterisk for a message people must write.', target: `${R} > div:first-child > div:last-child`, side: 'top' },
        { name: 'Placeholder', note: 'A writing hint that disappears when people type.', target: `${R} textarea`, side: 'right' },
        { name: 'Text area', note: 'White box, four lines tall; purple border on focus.', target: `${R} > div:nth-child(2)`, side: 'left' },
        { name: 'Counter', note: 'Characters used out of the limit; shown when a limit is set.', target: `${R} > div:nth-child(3)`, side: 'bottom', at: 0.92 },
      ]}>
        <MessageField modes={LIGHT} testID="mf-anatomy" label="Describe your issue" isRequired placeholder="What happened, and when?" maxLength={140} />
      </Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Set the limit and the height',
      description: 'A limit adds a counter and stops typing when it is reached. Rows set how tall the text area is; longer text scrolls inside it.',
      body: <div className="coin-new-example-grid three">
        <ExampleCard title="With a limit" description="The counter shows how much room is left."><Field label="Reason for cancelling" placeholder="Help us understand why you’re leaving" maxLength={140} /></ExampleCard>
        <ExampleCard title="No limit" description="Without a limit there is no counter."><Field label="Notes for the agent" placeholder="Anything else we should know?" /></ExampleCard>
        <ExampleCard title="Taller" description="Six rows for a longer description."><Field label="Describe your issue" placeholder="What happened, and when?" rows={6} maxLength={1000} /></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Default, filled, error, read only, and disabled',
      description: 'Focus draws a purple border. An error turns the label and border red but shows no message, so add one below the field. Read only and disabled lock the text.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Default" description="Select the field to see the purple focus border."><Field label="Describe your issue" placeholder="What happened, and when?" maxLength={140} /></ExampleCard>
        <ExampleCard title="Filled" description="The counter tracks the length. Out of focus, the text turns the same grey as the placeholder."><Field label="Describe your issue" placeholder="What happened, and when?" maxLength={140} value="I was charged twice for one gold purchase." /></ExampleCard>
        <ExampleCard title="Error" description="Red label and border; the message below is a separate Support Text."><ErrorField /></ExampleCard>
        <ExampleCard title="Read only" description="Grey label and border; people can read the text but not change it."><Field label="Your message" value="Your request was received on 28 September." isReadOnly /></ExampleCard>
        <ExampleCard title="Disabled" description="Grey text and border, for a field that does not apply yet."><Field label="Describe your issue" value="I was charged twice for one gold purchase." isDisabled /></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'Full width, four lines tall',
      description: 'Message Field fills its container’s width. The text area is 108 px tall, room for four lines, with 12 px of padding; each extra row adds 21 px. The counter sits 8 px below.',
      body: <div className="coin-new-stack">
        <Anatomy legend={false} surface="white" specimenWidth={300} marks={[
          { kind: 'size', target: B, side: 'bottom', label: 'both' },
          { kind: 'padding', target: B },
        ]}>
          <MessageField modes={LIGHT} testID="mf-size" label="Describe your issue" placeholder="What happened, and when?" />
        </Anatomy>
        <ExampleCard title="Six rows" description="150 px tall: six rows of 21 px plus padding."><Field label="Describe your issue" placeholder="What happened, and when?" rows={6} /></ExampleCard>
      </div>,
    },
    content: {
      header: 'Content', title: 'Ask for one thing, with a fitting limit',
      description: 'Name the message in the label, such as “Describe your issue”, and use the placeholder for a writing hint. Pick a limit that fits the task: 140 characters for a short reason, 1,000 for a detailed description.',
      body: <ExampleCard title="Labels, hints, and limits"><Host><div className="coin-new-stack">
        <Input label="Reason for cancelling" placeholder="Help us understand why you’re leaving" maxLength={140} />
        <Input label="Describe your issue" placeholder="What happened, and when?" maxLength={1000} />
      </div></Host></ExampleCard>,
    },
    context: {
      header: 'In context', title: 'Report a problem',
      description: 'The screen checks the message when people tap Submit and shows the error below the field. Message Field only turns red; the button stays enabled.',
      body: <div className="coin-new-context"><ReportProblem /></div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Make the limits and errors visible',
      description: 'Each pair shows a field people can complete versus one that stops them without saying why.',
      body: <div className="coin-new-stack">
        <DoDont goodTitle="Show the limit" goodCaption="The counter shows how much room is left." good={<Field label="Reason for cancelling" maxLength={140} value="The app is too slow" />}
          badTitle="Hide the counter on a limit" badCaption="Typing stops at the limit with no warning." bad={<Field label="Reason for cancelling" maxLength={140} value="The app is too slow" showCounter={false} />} />
        <DoDont goodTitle="Say what to fix" goodCaption="The message below says what is missing." good={<ErrorField />}
          badTitle="Rely on red alone" badCaption="The red border does not say what is wrong." bad={<Field label="Describe your issue" value="Charged twice" maxLength={140} isInvalid />} />
        <DoDont goodTitle="Use a Form Field for a short value" goodCaption="One line for one value." good={<Host><FormField modes={LIGHT} label="Order number" placeholder="JF-0000000" /></Host>}
          badTitle="Ask for a short value in a Message Field" badCaption="A four-line box suggests a long answer." bad={<Host><MessageField modes={LIGHT} label="Order number" placeholder="JF-0000000" /></Host>} />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Message Field contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="2 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('messagefield')} stories={[
        { label: 'Default', id: 'components-messagefield--default' },
        { label: 'Required', id: 'components-messagefield--required' },
        { label: 'Invalid', id: 'components-messagefield--invalid' },
        { label: 'Read only', id: 'components-messagefield--read-only' },
        { label: 'Disabled', id: 'components-messagefield--disabled' },
        { label: 'No counter', id: 'components-messagefield--no-counter' },
        { label: 'Custom rows', id: 'components-messagefield--custom-rows' },
        { label: 'All states', id: 'components-messagefield--all-states' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> from the team’s private package repository. Figma’s Message Field is a 328 × 159 component with a label, a 108 px text area, and a fixed “0/140” counter; its states are variable modes. The package adds the required mark, a rows option, and a counter that shows only with a limit. It has no error message or support text: an error turns the label and border red, so the guide adds a Support Text below. Out of focus, typed text uses the placeholder’s grey. Dark mode is not supported. On the web the label names the text area, but the error and the required mark are not announced.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'messagefield',
    corePrinciple: 'Room to explain, with a clear limit.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('messagefield'),
  }} playground={<>
    <div className="preview-stage">
      <Host><MessageField modes={LIGHT} value={value} onChangeText={setValue} label={label} placeholder="What happened, and when?"
        maxLength={limit === 'None' ? undefined : Number(limit)} rows={Number(rows)} isRequired={required}
        isInvalid={state === 'Error'} isReadOnly={state === 'Read only'} isDisabled={state === 'Disabled'} /></Host>
      <span className="stage-label">Live Coin Message Field</span>
    </div>
    <div className="controls-panel">
      <label className="text-control"><span>Label</span><input value={label} maxLength={32} onChange={e => setLabel(e.target.value)} /></label>
      <Segment label="Limit" value={limit} options={['None', '140', '500'] as const} onChange={setLimit} />
      <Segment label="Rows" value={rows} options={['4', '6', '8'] as const} onChange={setRows} />
      <Segment label="State" value={state} options={['Default', 'Error', 'Read only', 'Disabled'] as const} onChange={setState} />
      <OnOff label="Required" value={required} onChange={setRequired} />
      <Readout title="Characters" value={String(value.length)} />
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'messagefield',
  label: 'Message Field',
  summary: 'Use a Message Field for a few sentences of free text, such as feedback or a description of a problem.',
  keywords: ['textarea', 'multiline', 'comment box', 'feedback', 'message'],
  icon: <><rect x="1.5" y="2.5" width="15" height="13" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M4.5 6.5h9M4.5 9.5h9M4.5 12.5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>,
  Component: MessageFieldGuide,
})
