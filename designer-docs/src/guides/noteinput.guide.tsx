import { useState, type ComponentProps, type ReactNode } from 'react'
import { AmountInput, Button, Card, FormField, MoneyValue, NoteInput, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, Sources, Surface, byTestId, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2244-6063'
const LIGHT = { 'Color Mode': 'Light' } as Modes
const CARD = { 'Color Mode': 'Light', AppearanceBrand: 'Neutral' } as Modes
const AMOUNT = { 'Color Mode': 'Light', Context3: 'Amount Input' } as Modes
const pill = (id: string) => `div:has(> div > ${byTestId(id)})`

function Note({ initial = '', ...props }: { initial?: string } & Partial<ComponentProps<typeof NoteInput>>) {
  const [value, setValue] = useState(initial)
  return <NoteInput value={value} onChangeText={setValue} accessibilityLabel="Add note" modes={LIGHT} {...props} />
}

function Host({ children, narrow }: { children: ReactNode; narrow?: boolean }) {
  return <Surface width={narrow ? 'narrow' : 'wide'}>{children}</Surface>
}

function NoteInputGuide() {
  const [note, setNote] = useState('')
  const [placeholder, setPlaceholder] = useState('Add note')
  const [readOnly, setReadOnly] = useState(false)
  const [sendNote, setSendNote] = useState('')
  const [sent, setSent] = useState<string | null>(null)

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A grey pill around one line',
      description: 'The pill hugs its text: the placeholder until people type, then the note itself. Tapping anywhere on it starts typing.',
      body: <Anatomy surface="white" parts={[
        { name: 'Pill', note: 'Light grey with round ends; tap anywhere on it to type.', target: pill('note-anatomy'), side: 'bottom' },
        { name: 'Note text', note: '14 px bold; the placeholder looks the same.', target: byTestId('note-anatomy'), side: 'top' },
      ]} marks={[{ kind: 'padding', target: pill('note-anatomy') }]}>
        <NoteInput testID="note-anatomy" value="Rent for April" onChangeText={() => {}} accessibilityLabel="Add note" modes={LIGHT} />
      </Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'A placeholder, then the note',
      description: 'Note Input has no variants. Set the placeholder to say what the note is for. The screen keeps the value; without it, typing does nothing.',
      body: <div className="coin-new-example-grid three">
        <ExampleCard title="Default placeholder" description="“Add note” suits most payments."><Host><Note /></Host></ExampleCard>
        <ExampleCard title="Specific placeholder" description="Say who or what the note is for when it helps."><Host><Note placeholder="Add a note for Asha" /></Host></ExampleCard>
        <ExampleCard title="Filled" description="The note replaces the placeholder in the same style."><Host><Note initial="Rent for April" /></Host></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Empty, typing, filled, and read only',
      description: 'Focus doesn’t change the pill’s colour: the placeholder disappears and a caret shows. A read-only note looks the same but can’t be changed.',
      body: <div className="coin-new-example-grid three">
        <ExampleCard title="Empty" description="Tap it: the placeholder clears and the pill shrinks to the caret."><Host><Note /></Host></ExampleCard>
        <ExampleCard title="Filled" description="Same colour and weight as the placeholder."><Host><Note initial="Rent for April" /></Host></ExampleCard>
        <ExampleCard title="Read only" description="Same pill; it takes focus but typing does nothing."><Host><NoteInput value="Gift" editable={false} accessibilityLabel="Note" modes={LIGHT} /></Host></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: '35 px tall, as wide as its text',
      description: 'The pill is 35 px tall, with 8 px above and below the text and 16 px at each end. Its width follows the text and has no maximum, so a long note runs past its container.',
      body: <div className="coin-new-stack">
        <Anatomy legend={false} surface="white" marks={[
          { kind: 'size', target: pill('note-size'), side: 'bottom', label: 'both' },
          { kind: 'padding', target: pill('note-size') },
        ]}>
          <NoteInput testID="note-size" value="" onChangeText={() => {}} accessibilityLabel="Add note" modes={LIGHT} />
        </Anatomy>
        <ExampleCard title="It grows as people type" description="Type in the note: the pill widens with each character."><Host><Note initial="Dinner" /></Host></ExampleCard>
      </div>,
    },
    content: {
      header: 'Content', title: 'A few words people will recognise later',
      description: 'The note travels with the payment, so keep it to a few words about what the money is for. Use the placeholder for a hint, not an instruction.',
      body: <ExampleCard title="Short and specific"><Host>
        <Note initial="Rent for April" /><Note initial="Dinner at Toit" /><Note initial="Gift for Asha" />
      </Host></ExampleCard>,
    },
    context: {
      header: 'In context', title: 'A memo under the transfer amount',
      description: 'Amount Input places the note under the amount. The screen keeps both values and sends the note with the payment.',
      body: <div className="coin-new-context">
        <Card modes={CARD}>
          <Card.Title>Send to Asha Rao</Card.Title>
          <AmountInput modes={AMOUNT} moneyValueSlot={<MoneyValue value="500" currency="₹" modes={AMOUNT} />}
            noteInputSlot={<NoteInput value={sendNote} onChangeText={setSendNote} accessibilityLabel="Add note" modes={AMOUNT} />} />
          <Button label="Send ₹500" onPress={() => setSent(sendNote)} modes={LIGHT} />
        </Card>
        <p className="coin-new-readout" role="status">{sent === null ? 'Add an optional note' : sent ? `Sent ₹500 with the note “${sent}”` : 'Sent ₹500 without a note'}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Keep notes short and optional',
      description: 'Each pair shows a note people can use versus one that loses what they type or what they need.',
      body: <div className="coin-new-stack">
        <DoDont goodTitle="Keep the note in state" goodCaption="Typing updates the note, ready to send." good={<Host><Note /></Host>}
          badTitle="Leave it without state" badCaption="Without a value from the screen, typing does nothing." bad={<Host><NoteInput accessibilityLabel="Add note" modes={LIGHT} /></Host>} />
        <DoDont goodTitle="Keep it to a few words" goodCaption="The pill hugs the note and stays in the column." good={<Host narrow><Note initial="Rent for April" /></Host>}
          badTitle="Write a sentence" badCaption="A long note runs past the edge of its column." bad={<Host narrow><Note initial="Rent for April and the maintenance" /></Host>} />
        <DoDont goodTitle="Ask for required details in a Form Field" goodCaption="A label and a required mark say it must be filled in." good={<Host><VStack modes={LIGHT} style={{ width: '100%', padding: 0 }}><FormField label="Reason for transfer" isRequired placeholder="For example, rent" modes={LIGHT} /></VStack></Host>}
          badTitle="Hide a required detail in a note" badCaption="The pill has no label, required mark, or error, so people skip it." bad={<Host><Note placeholder="Reason (required)" /></Host>} />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Note Input contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="7 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('noteinput')} stories={[
        { label: 'Default', id: 'components-noteinput--default' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> from the team’s private package repository. Figma’s Note Input has Idle and Editing variants, 95 × 34; the package has none: it follows focus, grows with the text, and is 35 px tall. Its colours are the same in Dark mode, so this page shows Light only. It works only when the screen keeps its value. On the web each note takes two Tab stops and its text is exposed twice to screen readers; set an accessible name, because the placeholder disappears on focus. The published Storybook has one story; newer stories are not deployed yet.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'noteinput',
    corePrinciple: 'An optional memo that stays out of the way until tapped.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('noteinput'),
  }} playground={<>
    <div className="preview-stage">
      <Host><NoteInput value={note} onChangeText={setNote} placeholder={placeholder} editable={!readOnly} accessibilityLabel="Add note" modes={LIGHT} /></Host>
      <span className="stage-label">Live Coin Note Input</span>
    </div>
    <div className="controls-panel">
      <label className="text-control"><span>Placeholder</span><input value={placeholder} onChange={event => setPlaceholder(event.target.value)} maxLength={24} /></label>
      <OnOff label="Read only" value={readOnly} onChange={setReadOnly} />
      <Readout title="Note" value={note || 'Empty'}>Tap the pill to type. It grows with the text and has no limit of its own.</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'noteinput',
  label: 'Note Input',
  summary: 'Use a Note Input for a short, optional memo under an amount, such as “Rent for April”, that grows as people type.',
  keywords: ['memo', 'payment note', 'add note', 'remark'],
  icon: <><rect x="1.5" y="5.5" width="15" height="7" rx="3.5" stroke="currentColor" strokeWidth="1.5" /><path d="M5.5 9h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>,
  Component: NoteInputGuide,
})
