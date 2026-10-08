import { useState, type ComponentProps, type ReactNode } from 'react'
import { Card, ChatAttachment, ChatBubble, HStack, HelloJioInput, ScrollArea, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, Backdrop, DoDont, ExampleCard, OnOff, Readout, Segment, Sources, Surface, byTestId, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const LIGHT = { 'Color Mode': 'Light' } as Modes
const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=7584-1796'
const PILL = ':scope > div'
const FILES = [
  { title: 'Statement_Sep', subtitle: 'PDF file' },
  { title: 'PAN_card', subtitle: 'PDF file' },
]

function Host({ children }: { children: ReactNode }) {
  return <Surface width="wide"><VStack modes={LIGHT} style={{ width: '100%' }}>{children}</VStack></Surface>
}

function PhotoHost({ children }: { children: ReactNode }) {
  return <Backdrop size="compact"><VStack modes={LIGHT} style={{ width: '100%' }}>{children}</VStack></Backdrop>
}

function Chips({ files, onClose }: { files: typeof FILES; onClose?: (title: string) => void }) {
  return <ScrollArea direction="horizontal" style={{ width: '100%' }}>
    <HStack modes={LIGHT} alignVertical="center">
      {files.map(f => <ChatAttachment key={f.title} modes={LIGHT} title={f.title} subtitle={f.subtitle} onClose={onClose ? () => onClose(f.title) : undefined} />)}
    </HStack>
  </ScrollArea>
}

type InputProps = Omit<ComponentProps<typeof HelloJioInput>, 'value' | 'onChangeText' | 'attachments'> & { files?: number; closable?: boolean }

function Input({ files = 0, closable = true, ...props }: InputProps) {
  const [value, setValue] = useState('')
  const [list, setList] = useState(FILES.slice(0, files))
  const chips = list.length > 0
    ? <Chips files={list} onClose={closable ? t => setList(l => l.filter(f => f.title !== t)) : undefined} />
    : undefined
  return <HelloJioInput modes={LIGHT} {...props} value={value} onChangeText={setValue} attachments={chips} />
}

function Field(props: InputProps) {
  return <Host><Input {...props} /></Host>
}

function AnatomySpecimen() {
  const [value, setValue] = useState('')
  return <Anatomy surface="white" specimenWidth={300} parts={[
    { name: 'Brand icon', note: 'The HelloJio mark; it can be turned off.', target: `${PILL} > div:first-child`, side: 'left' },
    { name: 'Prompt', note: 'The placeholder, then the question people type; one line.', target: byTestId('hj-anatomy'), side: 'top' },
    { name: 'Send', note: 'Gold button that sends the text; Return sends too.', target: `${PILL} > div:last-child`, side: 'right' },
    { name: 'Pill', note: 'Grey rounded surface; white with a border while focused.', target: PILL, side: 'bottom' },
  ]}>
    <HelloJioInput modes={LIGHT} testID="hj-anatomy" value={value} onChangeText={setValue} />
  </Anatomy>
}

function Conversation() {
  const [value, setValue] = useState('')
  const [sent, setSent] = useState<string[]>([])
  const submit = (text: string) => {
    const t = text.trim()
    if (!t) return
    setSent(s => [...s, t])
    setValue('')
  }
  return <Card modes={LIGHT}><VStack modes={LIGHT}>
    <ChatBubble modes={LIGHT} role="user" text="What is the gold rate today?" style={{ alignSelf: 'flex-end' }} />
    <ChatBubble modes={LIGHT} role="assistant" text="24K gold is ₹7,412 per gram today." />
    {sent.map((t, i) => <ChatBubble key={i} modes={LIGHT} role="user" text={t} style={{ alignSelf: 'flex-end' }} />)}
    <HelloJioInput modes={LIGHT} value={value} onChangeText={setValue} onSubmit={submit} />
  </VStack></Card>
}

function HelloJioInputGuide() {
  const [value, setValue] = useState('')
  const [last, setLast] = useState<string | null>(null)
  const [background, setBackground] = useState<'Plain' | 'Photo'>('Plain')
  const [brand, setBrand] = useState(true)
  const [send, setSend] = useState(true)
  const [attachment, setAttachment] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const live = <HelloJioInput modes={LIGHT} value={value} onChangeText={setValue} onSubmit={setLast} jioPlus={background === 'Photo'}
    leading={brand ? undefined : null} trailing={send ? undefined : null} disabled={disabled}
    attachments={attachment ? <Chips files={FILES.slice(0, 1)} onClose={() => setAttachment(false)} /> : undefined} />

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A brand icon, the prompt, and a send button',
      description: 'A grey pill holds the HelloJio mark, one line for the question, and a gold send button.',
      body: <AnatomySpecimen />,
    },
    configuration: {
      header: 'Configuration', title: 'Choose what the pill shows',
      description: 'The brand icon and send button are on by default and can each be turned off. Attachments people add sit inside the pill, above the prompt.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Default" description="The brand icon, the prompt, and the send button."><Field /></ExampleCard>
        <ExampleCard title="Without the brand icon" description="For screens that already show the HelloJio mark."><Field leading={null} /></ExampleCard>
        <ExampleCard title="Without send" description="The Return key still sends the text."><Field trailing={null} /></ExampleCard>
        <ExampleCard title="With an attachment" description="Files people added sit above the prompt, and the pill grows to fit."><Field files={1} /></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Idle, focused, Jio Plus, and disabled',
      description: 'The pill is grey while idle and turns white with a border while people type. Over imagery, Jio Plus makes the idle pill frosted glass.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Idle" description="Grey pill. Select it to see the white focused pill."><Field /></ExampleCard>
        <ExampleCard title="Jio Plus" description="Frosted glass over imagery while not focused. The prompt and typed text stay readable."><PhotoHost><Input jioPlus /></PhotoHost></ExampleCard>
        <ExampleCard title="Disabled" description="Half opacity; typing and sending are off."><Field disabled /></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'Full width, 38 px tall',
      description: 'HelloJio Input fills its container’s width and is 38 px tall (36 px in Jio Plus, which has no border), with an 18 px brand icon and a 26 px send button. Attachments add height above the prompt.',
      body: <div className="coin-new-stack">
        <Anatomy legend={false} surface="white" specimenWidth={300} marks={[
          { kind: 'size', target: PILL, side: 'bottom', label: 'both' },
          { kind: 'padding', target: PILL },
        ]}>
          <HelloJioInput modes={LIGHT} value="" onChangeText={() => {}} />
        </Anatomy>
        <ExampleCard title="With two attachments" description="The pill grows, and the chips scroll sideways when they run out of room."><Field files={2} /></ExampleCard>
      </div>,
    },
    content: {
      header: 'Content', title: 'Invite a question',
      description: 'Write a short, open prompt in sentence case with no full stop, such as “Ask me anything”. The prompt is also the field’s accessible name, so keep it meaningful.',
      body: <ExampleCard title="Prompts"><Host><div className="coin-new-stack">
        <Input placeholder="Ask me anything" />
        <Input placeholder="Ask about your gold savings" />
      </div></Host></ExampleCard>,
    },
    context: {
      header: 'In context', title: 'Ask HelloJio',
      description: 'The screen adds the question to the conversation and clears the field. It also ignores an empty prompt, because Send works even when the field is empty.',
      body: <div className="coin-new-context"><Conversation /></div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Keep the prompt clear',
      description: 'Each pair shows a prompt people understand versus one that misleads them.',
      body: <div className="coin-new-stack">
        <DoDont goodTitle="Keep the prompt short" goodCaption="The whole prompt fits in the pill." good={<Field placeholder="Ask me anything" />}
          badTitle="Write a long prompt" badCaption="It is cut off in the pill." bad={<Field placeholder="Ask me anything about your gold, savings, loans, or bills" />} />
        <DoDont goodTitle="Use it to ask HelloJio" goodCaption="The brand mark and send button promise an answer." good={<Field placeholder="Ask about your gold savings" />}
          badTitle="Use it for search" badCaption="People expect an answer, not a list of results." bad={<Field placeholder="Search transactions" />} />
        <DoDont goodTitle="Let people remove attachments" goodCaption="The close button takes the file out." good={<Field files={1} />}
          badTitle="Show a close icon that does nothing" badCaption="It looks tappable but nothing happens." bad={<Field files={1} closable={false} />} />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public HelloJio Input contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="8 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('hellojioinput')} stories={[
        { label: 'Default', id: 'components-hellojioinput--default' },
        { label: 'Active', id: 'components-hellojioinput--active' },
        { label: 'Jio Plus', id: 'components-hellojioinput--jio-plus' },
        { label: 'Submit log', id: 'components-hellojioinput--submit-log' },
        { label: 'Without send', id: 'components-hellojioinput--without-send' },
        { label: 'With attachments', id: 'components-hellojioinput--with-attachments' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (5 October build) from the team’s private package repository. Figma’s HelloJio Input is a set with Idle, Active, and IdleJioPlus states, start and end slot options, and an attachment slot. The package sets the state from focus and the Jio Plus option. The pill is 38 px tall, or 36 px in Jio Plus, as in Figma; the send button is 26 px (28 px in Figma). Send works even when the field is empty, and the text stays after sending, so the screen ignores empty prompts and clears the field. On the web Tab goes from the input straight to Send. Dark mode is not shown.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'hellojioinput',
    corePrinciple: 'One short question, one tap to send.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('hellojioinput'),
  }} playground={<>
    <div className="preview-stage">
      {background === 'Photo' ? <PhotoHost>{live}</PhotoHost> : <Host>{live}</Host>}
      <span className="stage-label">Live Coin HelloJio Input</span>
    </div>
    <div className="controls-panel">
      <Segment label="Background" value={background} options={['Plain', 'Photo'] as const} onChange={setBackground} />
      <OnOff label="Brand icon" value={brand} onChange={setBrand} />
      <OnOff label="Send button" value={send} onChange={setSend} />
      <OnOff label="Attachment" value={attachment} onChange={setAttachment} />
      <OnOff label="Disabled" value={disabled} onChange={setDisabled} />
      <Readout title="Last sent" value={last === null ? 'Nothing yet' : last === '' ? '(empty)' : `“${last}”`}>Send works even when the field is empty.</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'hellojioinput',
  label: 'HelloJio Input',
  summary: 'Use a HelloJio Input for the HelloJio assistant’s prompt: people type a question and send it, with optional attachments above.',
  keywords: ['chat', 'assistant', 'prompt', 'composer', 'send message', 'ask'],
  icon: <><rect x="1.5" y="5" width="15" height="8" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M10.5 9h3M12 7.5 13.5 9 12 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></>,
  Component: HelloJioInputGuide,
})
