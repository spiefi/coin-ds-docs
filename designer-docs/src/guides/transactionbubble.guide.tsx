import { useState, type ComponentProps } from 'react'
import { Text, TransactionBubble, TransactionStatus, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, Segment, Sources, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1517-1155'
const LIGHT = { 'Color Mode': 'Light' } as Modes
const ts = (m: string) => ({ ...LIGHT, 'Transaction Status': m } as Modes)
const noop = () => {}

const BUBBLE = { width: 231, maxWidth: '100%' } as const
const SENT = { ...BUBBLE, alignSelf: 'flex-end' } as const
const RECEIVED = { ...BUBBLE, alignSelf: 'flex-start' } as const

type TBProps = Partial<ComponentProps<typeof TransactionBubble>>
function TB(overrides: TBProps = {}) {
  return <TransactionBubble style={BUBBLE} description="Paid to Priya Sharma" value="1,200" status="Paid" date="21 Oct 2026" modes={ts('Paid')} {...overrides} />
}
const NOTE = <Text text="For Saturday’s dinner" />

const R = ':scope > div'
const M = `${R} > div`
const DESCRIPTION = `${M} > div:first-child > [dir="auto"]`
const AMOUNT = `${M} > div:first-child > div:last-child`
const STATUS = `${M} > div:last-child > div:first-child`
const CHEVRON = `${M} > div:last-child > [role="img"]`

type Mode = 'Request' | 'Paid' | 'Declined' | 'Expired'
const PER_MODE: Record<Mode, { description: string; status: string; date: string }> = {
  Request: { description: 'Request from Priya Sharma', status: 'Requested', date: 'Today' },
  Paid: { description: 'Paid to Priya Sharma', status: 'Paid', date: '21 Oct 2026' },
  Declined: { description: 'Payment to Priya Sharma', status: 'Declined', date: '21 Oct 2026' },
  Expired: { description: 'Request from Priya Sharma', status: 'Expired', date: '20 Mar 2025' },
}

function TransactionBubbleGuide() {
  const [mode, setMode] = useState<Mode>('Paid')
  const [note, setNote] = useState(false)
  const [presses, setPresses] = useState(0)
  const [opened, setOpened] = useState<string | null>(null)
  const { description, status, date } = PER_MODE[mode]

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'Who, how much, and how it went',
      description: 'The description and the amount sit at the top, anything you pass as children comes next, and the status line and a chevron close the bubble.',
      body: <Anatomy parts={[
        { name: 'Description', note: 'description, 14 px on one line; it ellipsizes unless disableTruncation.', target: DESCRIPTION, side: 'top' },
        { name: 'Amount', note: 'A Money Value from value and currency, at the bubble’s size.', target: AMOUNT, side: 'left' },
        { name: 'Status', note: 'A Transaction Status from status and date; the mode colours its mark.', target: STATUS, side: 'bottom' },
        { name: 'Chevron', note: 'A Nav Arrow that says the bubble opens; statusSlot removes it.', target: CHEVRON, side: 'right' },
        { name: 'Bubble', note: 'White, with a 1 px grey border, 23 px corners and 16 px padding.', target: R, side: 'right', at: 0.25 },
      ]}>{TB()}</Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Status, a note, your own status line',
      description: 'Set the Transaction Status mode on the bubble to colour its status mark: Request orange (the default), Paid green, Declined red, Expired grey; status and date give the words. children add a row between the amount and the status, such as the note sent with the payment. statusSlot replaces the status line and the chevron with your own content. No other mode changes the bubble.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Paid" description="A green mark beside Paid.">{TB()}</ExampleCard>
        <ExampleCard title="Declined" description="A red mark; the words come from status.">{TB({ description: 'Payment to Uber India', value: '56', status: 'Declined', date: '20 Mar 2025', modes: ts('Declined') })}</ExampleCard>
        <ExampleCard title="With a note" description="children sit between the amount and the status.">{TB({ children: NOTE })}</ExampleCard>
        <ExampleCard title="Without the chevron" description="statusSlot replaces the line and the chevron.">{TB({ statusSlot: <TransactionStatus status="Paid" date="21 Oct 2026" /> })}</ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'A picture, or a button',
      description: 'Without onPress the bubble is a picture of the payment, but its chevron still shows; if it doesn’t open, drop the chevron with statusSlot. With onPress the whole bubble is one button, and it fades a little while pressed. Its default name is the description and the status word, with no amount or date, so set accessibilityLabel.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Picture" description="No onPress: nothing to press, yet the chevron shows.">{TB()}</ExampleCard>
        <ExampleCard title="Button" description="Looks the same; the whole bubble presses.">{TB({ onPress: noop, accessibilityLabel: 'Paid to Priya Sharma, ₹1,200, paid 21 Oct 2026' })}</ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'The thread sets the width',
      description: 'The bubble has no width of its own: it fills its host. In Figma’s thread it is 231 px of a 328 px column, on the right for payments you send. With one line of description it is 119 px tall, 10 px taller than Figma’s 109, because the amount sits on a 34 px line. It has 16 px of padding, and its parts are 8 px apart.',
      body: <Anatomy legend={false} marks={[
        { kind: 'size', target: R, side: 'bottom', label: 'both' },
        { kind: 'padding', target: R },
        { kind: 'gap', from: DESCRIPTION, to: AMOUNT },
      ]}>{TB()}</Anatomy>,
    },
    content: {
      header: 'Content', title: 'The other person, the amount, one word',
      description: 'Write description as what happened and with whom, such as Paid to Priya Sharma; it gets one line, so keep it short or set disableTruncation. Give value without a currency sign: currency adds the ₹. Write status as one word that matches the mode, and date short. When the bubble presses, set accessibilityLabel to the person, the amount, the status, and the date.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="One line" description="A long description ends in an ellipsis.">{TB({ description: 'Paid to Bharat Sanchar Nigam Limited', value: '799' })}</ExampleCard>
        <ExampleCard title="Wrapped" description="disableTruncation lets the description wrap.">{TB({ description: 'Paid to Bharat Sanchar Nigam Limited', value: '799', disableTruncation: true })}</ExampleCard>
      </div>,
    },
    context: {
      header: 'In context', title: 'Payments in a thread',
      description: 'A thread lists the payments between two people: the ones you send sit on the right, the ones you receive on the left. The thread places and sizes the bubbles, 231 px wide here as in Figma, and each bubble’s onPress opens that payment’s details.',
      body: <div className="coin-new-context">
        <VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes}>
          {TB({ style: SENT, onPress: () => setOpened('Paid to Priya Sharma'), accessibilityLabel: 'Paid to Priya Sharma, ₹1,200, paid 21 Oct 2026' })}
          {TB({ style: RECEIVED, description: 'Request from Priya Sharma', value: '450', status: 'Requested', date: 'Today', modes: ts('Request'), onPress: () => setOpened('Request from Priya Sharma'), accessibilityLabel: 'Request from Priya Sharma, ₹450, requested today' })}
        </VStack>
        <p className="coin-new-readout" role="status">{opened ? `Opened ${opened}` : 'No payment opened'}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'One payment, said once',
      description: 'Each pair shows a bubble people read at a glance next to one that contradicts or buries the payment.',
      body: <div className="coin-new-stack">
        <DoDont good={TB()} bad={TB({ modes: LIGHT })} goodTitle="The mode with the word" goodCaption="Paid with the Paid mode: a green mark." badTitle="Only the word" badCaption="Paid keeps the orange Request mark." />
        <DoDont good={TB()} bad={TB({ children: <Text text="UPI ID 101674916166 · HDFC Bank ··4821" /> })} goodTitle="Who and how much" goodCaption="The receipt opens from the bubble." badTitle="Receipt fields inside" badCaption="The bubble becomes a receipt; put these in Transaction Details." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Transaction Bubble contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="25 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('transactionbubble')} stories={[
        { label: 'Default', id: 'components-transactionbubble--default' },
        { label: 'Successful transaction', id: 'components-transactionbubble--successful-transaction' },
        { label: 'With press and slot', id: 'components-transactionbubble--with-press-and-slot' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (23 October build of Biscuit’s main) from the team’s private package repository. Figma’s Transaction Bubble exposes one property, <code>Description</code>; its amount and status line are nested instances, and its status comes from the Transaction Status variable mode. The package takes <code>description</code>, <code>value</code>, <code>currency</code>, <code>status</code>, and <code>date</code> as props, and the mode only colours a “!” mark, where Figma swaps the icon. The bubble is 119 px tall where Figma’s is 109, its description is Regular where Figma’s is Medium, and its default accessible name leaves out the amount and date. In Storybook, the Successful story keeps the orange mark and the slot story shows two amounts (all reported).</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'transactionbubble', corePrinciple: 'One payment per bubble; its details are one tap away.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('transactionbubble'),
  }} playground={<>
    <div className="preview-stage">
      {TB({
        description, status, date, modes: ts(mode),
        children: note ? NOTE : undefined,
        onPress: () => setPresses((n) => n + 1),
        accessibilityLabel: `${description}, ₹1,200, ${status.toLowerCase()} ${date}`,
      })}
      <span className="stage-label">Live Coin Transaction Bubble</span>
    </div>
    <div className="controls-panel">
      <Segment label="Transaction Status" value={mode} options={['Request', 'Paid', 'Declined', 'Expired'] as const} onChange={setMode} />
      <OnOff label="children" value={note} onChange={setNote} />
      <Readout title="Presses" value={String(presses)}>With onPress the whole bubble is one button that opens the payment.</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'transactionbubble',
  label: 'Transaction Bubble',
  summary: 'Use a Transaction Bubble for one payment in a chat thread: who it was with, the amount, and its status, opening its details.',
  keywords: ['payment bubble', 'chat payment', 'payment in thread', 'transaction row', 'payment card'],
  icon: <><rect x="1.5" y="3" width="15" height="12" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M4.5 7h6M4.5 11h4M12.5 9.8l1.2 1.2-1.2 1.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /></>,
  Component: TransactionBubbleGuide,
})
