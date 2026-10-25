import { useState, type ComponentProps } from 'react'
import { TransactionBubble, TransactionStatus, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, Readout, Segment, Sources, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/dSlK8ueQ7wlbyUSZd4f8QO/Coin-Subcomponents?node-id=152-1242'
const LIGHT = { 'Color Mode': 'Light' } as Modes
const ts = (m: string) => ({ ...LIGHT, 'Transaction Status': m } as Modes)
const BUBBLE = { width: 231, maxWidth: '100%' } as const

type TSProps = Partial<ComponentProps<typeof TransactionStatus>>
function TS(overrides: TSProps = {}) {
  return <TransactionStatus status="Paid" date="21 Oct 2026" modes={ts('Paid')} {...overrides} />
}
const Column = (overrides: TSProps = {}) => <VStack modes={LIGHT} style={{ width: 200 }}>{TS(overrides)}</VStack>
const DECLINED = { description: 'Payment to Uber India', value: '56', status: 'Declined', date: '21 Oct 2026', modes: ts('Declined') }

const R = ':scope > div'
const MARK = `${R} > svg`
const TEXT = `${R} > [dir="auto"]`

type Mode = 'Request' | 'Paid' | 'Declined' | 'Expired'
type Word = 'Requested' | 'Paid' | 'Declined' | 'Expired'
const COLOUR: Record<Mode, string> = { Request: 'Orange', Paid: 'Green', Declined: 'Red', Expired: 'Grey' }

function TransactionStatusGuide() {
  const [mode, setMode] = useState<Mode>('Paid')
  const [word, setWord] = useState<Word>('Paid')

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A mark and one line of text',
      description: 'An 18 px mark, then the status and the date as one line of text, joined by a middle dot.',
      body: <Anatomy marks={[{ kind: 'gap', from: MARK, to: TEXT }]} parts={[
        { name: 'Mark', note: 'The same “!” glyph in every mode, 18 px; the Transaction Status mode sets its colour.', target: MARK, side: 'left' },
        { name: 'Status and date', note: 'status, a middle dot, then date: one text on one line.', target: TEXT, side: 'top' },
        { name: 'Line', note: 'No width of its own: as wide as its words.', target: R, side: 'bottom' },
      ]}>{TS()}</Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Four modes, any words',
      description: 'The Transaction Status mode colours the mark: Request orange (the default), Paid green, Declined red, Expired grey. status and date are free text, and the mode doesn’t change them, so set the word and the mode together. The mark is the same “!” in every mode; Figma swaps it for a tick or a cross.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Request" description="Orange: a request still waiting.">{TS({ status: 'Requested', date: 'Today', modes: ts('Request') })}</ExampleCard>
        <ExampleCard title="Paid" description="Green: the money went through.">{TS()}</ExampleCard>
        <ExampleCard title="Declined" description="Red: the bank turned it down.">{TS({ status: 'Declined', modes: ts('Declined') })}</ExampleCard>
        <ExampleCard title="Expired" description="Grey: the request ran out.">{TS({ status: 'Expired', date: '20 Mar 2025', modes: ts('Expired') })}</ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'One line, or wrapped',
      description: 'The line has no states of its own: it doesn’t press, select, or load. In a column narrower than the words, it ellipsizes at the end, so the date goes first; disableTruncation lets it wrap instead. Both examples sit in a 200 px column.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="One line" description="The date is cut, and the mark is squeezed.">{Column({ status: 'Declined', date: '21 October 2026, 4:15 pm', modes: ts('Declined') })}</ExampleCard>
        <ExampleCard title="Wrapped" description="The date moves to a second line.">{Column({ status: 'Declined', date: '21 October 2026, 4:15 pm', modes: ts('Declined'), disableTruncation: true })}</ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: '18 px tall, as wide as its words',
      description: 'The line is 18 px tall: an 18 px mark, 4 px of space, then 12 px text on a 16 px line. It has no width of its own and grows with its words. A narrower column cuts them at the end and squeezes the mark; inside a Transaction Bubble the line doesn’t shrink at all and runs past the bubble’s edge.',
      body: <Anatomy legend={false} marks={[
        { kind: 'size', target: R, side: 'bottom', label: 'both' },
        { kind: 'gap', from: MARK, to: TEXT },
      ]}>{TS()}</Anatomy>,
    },
    content: {
      header: 'Content', title: 'One word and a short date',
      description: 'Write status as one word that matches the mode: Requested, Paid, Declined, or Expired. Write date short, such as 21 Oct 2026, or Today for a recent payment; the line adds the middle dot. The mark is the same for every state, so the word has to say it.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="A date" description="One word, then the day.">{TS()}</ExampleCard>
        <ExampleCard title="Today" description="A recent payment can say Today.">{TS({ date: 'Today' })}</ExampleCard>
      </div>,
    },
    context: {
      header: 'In context', title: 'On the payments in a thread',
      description: 'Every Transaction Bubble ends with a Transaction Status. Set the Transaction Status mode on the bubble, as in Figma: the bubble passes its modes to the line, and its status and date props give the words.',
      body: <div className="coin-new-context">
        <VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes} alignHorizontal="flex-end">
          <TransactionBubble style={BUBBLE} description="Paid to Priya Sharma" value="1,200" status="Paid" date="21 Oct 2026" modes={ts('Paid')} />
          <TransactionBubble style={BUBBLE} description="Request to Rahul Verma" value="450" status="Requested" date="Today" modes={ts('Request')} />
          <TransactionBubble style={BUBBLE} description="Payment to Uber India" value="56" status="Declined" date="20 Mar 2025" modes={ts('Declined')} />
        </VStack>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'The word and the colour agree',
      description: 'Each pair shows a line people read correctly next to one whose colour or length works against it.',
      body: <div className="coin-new-stack">
        <DoDont
          good={TS({ status: 'Expired', date: '20 Mar 2025', modes: ts('Expired') })}
          bad={TS({ status: 'Expired', date: '20 Mar 2025', modes: LIGHT })}
          goodTitle="Mode matches the word" goodCaption="Expired with the Expired mode: a grey mark."
          badTitle="The default mode" badCaption="Expired keeps the orange Request mark, as if it still needs action." />
        <DoDont
          good={<TransactionBubble style={BUBBLE} {...DECLINED} />}
          bad={<TransactionBubble style={BUBBLE} {...DECLINED} status="Declined by your bank" />}
          goodTitle="One word" goodCaption="Declined and a short date fit beside the chevron."
          badTitle="A sentence" badCaption="In a bubble, the line runs past the edge." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Transaction Status contract',
      description: 'The guide compares the Figma subcomponent with the installed package and its Storybook story.',
      body: <Sources checked="25 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('transactionstatus')} stories={[
        { label: 'Default', id: 'components-transactionstatus--default' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (23 October build of Biscuit’s main) from the team’s private package repository. In Figma, Transaction Status is a subcomponent (Coin Subcomponents) with no properties: its mode picks the icon, the colour, and the word together. In the package the mode only colours the mark, which is always “!”, and <code>status</code> and <code>date</code> are free text; by default an orange mark sits beside “Expired”, where Figma’s Expired is grey. Figma’s line ends in a chevron; in the package the chevron belongs to Transaction Bubble. When the words don’t fit a column, the mark shrinks with them, and inside a Transaction Bubble a long line runs past the bubble’s edge (all reported).</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'transactionstatus', corePrinciple: 'One word for the state; the mode colours the mark.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('transactionstatus'),
  }} playground={<>
    <div className="preview-stage">
      {TS({ status: word, modes: ts(mode) })}
      <span className="stage-label">Live Coin Transaction Status</span>
    </div>
    <div className="controls-panel">
      <Segment label="Transaction Status" value={mode} options={['Request', 'Paid', 'Declined', 'Expired'] as const} onChange={setMode} />
      <Segment label="status" value={word} options={['Requested', 'Paid', 'Declined', 'Expired'] as const} onChange={setWord} />
      <Readout title="Mark" value={COLOUR[mode]}>The mode sets the mark’s colour and nothing else: the words are whatever you pass in status.</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'transactionstatus',
  label: 'Transaction Status',
  summary: 'Use a Transaction Status for the state and date of one payment on one line, as at the foot of a Transaction Bubble.',
  keywords: ['payment status', 'status line', 'paid', 'declined', 'expired', 'request'],
  icon: <><circle cx="5" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M5 7.6v1.6M11 9h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /></>,
  Component: TransactionStatusGuide,
})
