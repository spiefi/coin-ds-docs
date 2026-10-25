import { useState, type ReactNode } from 'react'
import { Button, Title, TransactionDetails, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, Readout, ScreenFrame, Segment, Sources, byTestId, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1557-7798'
const LIGHT = { 'Color Mode': 'Light' } as Modes

type Pair = [string, string]
const UPI: Pair[] = [
  ['UPI transaction ID', '101674916166'],
  ['From', 'JioFinance ··1234'],
  ['To', 'Rahul Verma · rahul@okjio'],
  ['Payment method', 'UPI'],
]
const TRANSFER: Pair[] = [
  ['Transfer ID', 'TXN202610210001'],
  ['From account', 'Savings ··1234'],
  ['To account', 'Current ··5678'],
  ['Transfer type', 'IMPS'],
  ['Date and time', '21 Oct 2026, 10:30 am'],
]
const BILL: Pair[] = [
  ['Transaction ID', 'BILL2026102100042'],
  ['Biller', 'Jio Postpaid'],
  ['Consumer number', '98765 43210'],
  ['Bill period', 'September 2026'],
  ['Payment method', 'JioFinance Wallet'],
]
const SETS = { 'UPI payment': UPI, Transfer: TRANSFER, Bill: BILL }
type SetName = keyof typeof SETS

function TD(items: Pair[]) {
  return <TransactionDetails modes={LIGHT} testID="td">
    {items.map(([label, value], i) => <TransactionDetails.Item key={label} testID={`td-${i + 1}`} label={label} value={value} />)}
  </TransactionDetails>
}
const COLUMN = (children: ReactNode) => <VStack modes={LIGHT} style={{ width: 240 }}>{children}</VStack>

const LIST = byTestId('td')
const ITEM1 = byTestId('td-1')
const ITEM2 = byTestId('td-2')
const LABEL = `${byTestId('td-1')} > [dir="auto"]:first-child`
const VALUE = `${byTestId('td-1')} > [dir="auto"]:last-child`

function TransactionDetailsGuide() {
  const [set, setSet] = useState<SetName>('UPI payment')
  const [shared, setShared] = useState(false)
  const items = SETS[set]

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'Labels over values',
      description: 'Each item puts a label over its value, and the list stacks the items 16 px apart. There’s no surface, divider, or icon: the screen around it provides those.',
      body: <Anatomy specimenWidth={315} parts={[
        { name: 'Label', note: 'label, 14 px Medium in near-black; it names the fact.', target: LABEL, side: 'left' },
        { name: 'Value', note: 'value, the same size in a softer grey, 4 px under its label.', target: VALUE, side: 'right' },
        { name: 'Item', note: 'TransactionDetails.Item: one label and its value.', target: ITEM2, side: 'left' },
        { name: 'List', note: 'TransactionDetails: stacks its items 16 px apart, with no padding.', target: LIST, side: 'top' },
      ]} marks={[
        { kind: 'gap', from: ITEM1, to: ITEM2 },
        { kind: 'gap', from: LABEL, to: VALUE },
      ]}>{TD(UPI.slice(0, 2))}</Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Only the items',
      description: 'The list has nothing to set: no variants, and no mode changes it. You choose the items and their order, one TransactionDetails.Item each, with a label and a value. Put the reference people quote first, then who paid whom, then how.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="UPI payment" description="The ID, both ends, then the method.">{TD(UPI)}</ExampleCard>
        <ExampleCard title="Bank transfer" description="Five facts, in the order people check them.">{TD(TRANSFER)}</ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Static text',
      description: 'The list has no states: its items don’t press, select, copy, collapse, or page. To let people copy an ID or share the receipt, put a button on the screen.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="One item" description="A single fact is still a list of one.">{TD(UPI.slice(0, 1))}</ExampleCard>
        <ExampleCard title="Bill payment" description="A longer list keeps the same 16 px rhythm.">{TD(BILL)}</ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'As wide as its column',
      description: 'The list has no width of its own: it fills its column, and each item is as wide as its text. A long value wraps under its label; nothing is cut. Figma draws the items at a fixed 315 px. Items sit 16 px apart, and a label sits 4 px above its value, each on a 17 px line.',
      body: <Anatomy legend={false} specimenWidth={315} marks={[
        { kind: 'size', target: LIST, side: 'bottom', label: 'both' },
        { kind: 'gap', from: ITEM1, to: ITEM2 },
        { kind: 'gap', from: LABEL, to: VALUE },
      ]}>{TD(UPI.slice(0, 2))}</Anatomy>,
    },
    content: {
      header: 'Content', title: 'Field names and data',
      description: 'Write each label as a field name, such as UPI transaction ID, From, To, or Payment method. Write the value as the data itself, never a sentence, and mask account numbers to their last four digits. The label shouldn’t repeat the value.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Field names" description="Short names people scan for.">{TD(UPI)}</ExampleCard>
        <ExampleCard title="A long value" description="It wraps under its label; nothing is cut.">{COLUMN(TD([['To', 'Bharat Sanchar Nigam Limited · bsnl.broadband@okaxis'], ['Payment method', 'UPI']]))}</ExampleCard>
      </div>,
    },
    context: {
      header: 'In context', title: 'The receipt behind a payment',
      description: 'The details sit on the screen a payment opens, under its amount and outcome. The screen adds the heading and the action; the list only holds the facts.',
      body: <div className="coin-new-context">
        <ScreenFrame size="full">
          <VStack modes={{ ...LIGHT, 'Slot gap': 'L' } as Modes} style={{ flex: 1, padding: 16 }} justifyVertical="space-between">
            <VStack modes={{ ...LIGHT, 'Slot gap': 'L' } as Modes}>
              <Title title="Paid ₹1,200" subtitle="To Rahul Verma · 21 Oct 2026, 4:15 pm" modes={LIGHT} />
              {TD(UPI)}
            </VStack>
            <Button label="Share receipt" modes={LIGHT} onPress={() => setShared(true)} />
          </VStack>
        </ScreenFrame>
        <p className="coin-new-readout" role="status">{shared ? 'Receipt shared' : 'Receipt not shared yet'}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Name it, then give it',
      description: 'Each pair shows a receipt people scan in seconds next to one that makes them read twice.',
      body: <div className="coin-new-stack">
        <DoDont good={TD([['UPI transaction ID', '101674916166']])} bad={TD([['UPI transaction ID 101674916166', '101674916166']])}
          goodTitle="Name, then the fact" goodCaption="UPI transaction ID is the label; the number is the value."
          badTitle="The ID in both places" badCaption="The label repeats the number." />
        <DoDont good={TD([['Payment method', 'UPI'], ['From', 'JioFinance ··1234']])} bad={COLUMN(TD([['Payment method', 'You paid with UPI from your JioFinance account ending 1234.']]))}
          goodTitle="Data in the value" goodCaption="One fact per item."
          badTitle="A sentence as a value" badCaption="People have to read it to find the fact." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Transaction Details contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="25 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('transactiondetails')} stories={[
        { label: 'Default', id: 'components-transactiondetails--default' },
        { label: 'Single item', id: 'components-transactiondetails--single-item' },
        { label: 'Account transfer', id: 'components-transactiondetails--account-transfer' },
        { label: 'Bill payment', id: 'components-transactiondetails--bill-payment' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (23 October build of Biscuit’s main) from the team’s private package repository. Figma’s Transaction Details is one component with no properties: a slot of Detail Items, each with a Label and a Value, drawn 315 px wide. The package takes <code>TransactionDetails.Item</code> children with <code>label</code> and <code>value</code> and sizes them to their text. No mode changes it. Its <code>accessibilityLabel</code> props are never applied, so the list has no name, and on phones screen readers skip the items (reported).</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'transactiondetails', corePrinciple: 'Name the fact, then give it.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('transactiondetails'),
  }} playground={<>
    <div className="preview-stage">
      {TD(items)}
      <span className="stage-label">Live Coin Transaction Details</span>
    </div>
    <div className="controls-panel">
      <Segment label="children" value={set} options={['UPI payment', 'Transfer', 'Bill'] as const} onChange={setSet} />
      <Readout title="Items" value={String(items.length)}>Each TransactionDetails.Item is one label and its value; the list only stacks them.</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'transactiondetails',
  label: 'Transaction Details',
  summary: 'Use Transaction Details to list the facts of one payment as label and value pairs: its ID, the accounts, and how it was paid.',
  keywords: ['receipt', 'payment details', 'transaction info', 'label and value', 'key value list'],
  icon: <path d="M3 3.5h6M3 6.5h11M3 11h6M3 14h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />,
  Component: TransactionDetailsGuide,
})
