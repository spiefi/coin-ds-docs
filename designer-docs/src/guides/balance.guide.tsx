import { useState, type ReactNode } from 'react'
import { Balance, Button, MoneyValue, Title, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, Readout, Segment, Sources, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1986-6203'
const STORYBOOK = docsUrl('balance')
const R = ':scope > div'
const TITLE = `${R} > div:first-child`
const MONEY = `${R} > div:nth-child(2)`
const CURRENCY = `${R} > div:nth-child(2) [role="img"] > [dir="auto"]`
const AMOUNT = `${R} > div:nth-child(2) [role="img"] > div:last-child > [dir="auto"]`

type Context3 = 'Balance & Cards' | 'Default'
type Currency = 'INR' | 'USD' | 'EUR'
const ctx = (c: string) => ({ Context3: c }) as Modes

/** A 360 px column, as in a screen: in the centred example row a Balance is only as wide as its text. */
function Column({ children }: { children: ReactNode }) {
  return <div className="coin-new-host wide"><VStack modes={{ Padding: 'None' } as Modes} style={{ width: '100%' }}>{children}</VStack></div>
}

function B({ title, amount, currency = 'INR', modes }: { title: string; amount: string; currency?: string; modes?: Modes }) {
  return <Balance title={title} amount={amount} currency={currency} modes={modes} />
}

function BalanceGuide() {
  const [title, setTitle] = useState('Total owed to people')
  const [amount, setAmount] = useState('50,000.67')
  const [currency, setCurrency] = useState<Currency>('INR')
  const [size, setSize] = useState<Context3>('Balance & Cards')
  const [last, setLast] = useState('Press Settle up')

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A title and a Money Value',
      description: 'A Balance stacks a short title over a Money Value: the currency symbol and your amount in heavy type, 6 px below.',
      body: <Anatomy parts={[
        { name: 'Title', note: 'Names the amount in 14 px medium text.', target: TITLE, side: 'top' },
        { name: 'Currency', note: 'The symbol for your currency code, such as ₹ for INR.', target: CURRENCY, side: 'left' },
        { name: 'Amount', note: 'Your amount exactly as you write it, in 36 px heavy type.', target: AMOUNT, side: 'right' },
      ]} marks={[{ kind: 'gap', from: TITLE, to: MONEY }]}>
        <B title="Total owed to people" amount="50,000.67" />
      </Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Your currency, a minus, or your own Money Value',
      description: 'Pass a currency code or symbol and the amount as text. To use a Money Value option, such as hiding the amount, pass your own Money Value inside the Balance.',
      body: <div className="coin-new-example-grid three">
        <ExampleCard title="Currency code" description="USD shows as $; unknown codes print as typed."><B title="Total owed to you" amount="1,250.00" currency="USD" /></ExampleCard>
        <ExampleCard title="Negative amount" description="A leading minus shows before the symbol."><B title="Net balance" amount="-1,200.00" /></ExampleCard>
        <ExampleCard title="Hidden amount" description="Your own Money Value, here with hidden on."><Balance title="Available balance"><MoneyValue value="50,000.67" currency="INR" hidden /></Balance></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'No states of its own',
      description: 'A Balance isn’t pressable and has no selected, disabled, or loading look. When the amount changes, pass the new amount.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Nothing owed" description="Zero looks like any other amount."><B title="Total owed to people" amount="0.00" /></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'The host sets the width, Context3 the amount',
      description: 'A Balance is as wide as its host and as tall as its text: 68 px at the default size. It has no padding or surface, so place it in a screen or card that has them. Context3 sets the amount’s size; the title stays 14 px.',
      body: <div className="coin-new-stack">
        <Anatomy legend={false} specimenWidth={300} marks={[{ kind: 'size', target: R, side: 'bottom', label: 'both' }, { kind: 'gap', from: TITLE, to: MONEY }]}>
          <B title="Total owed to people" amount="50,000.67" />
        </Anatomy>
        <div className="coin-new-example-grid">
          <ExampleCard title="Balance & Cards" description="The default: a 36 px amount."><B title="Total owed to people" amount="50,000.67" modes={ctx('Balance & Cards')} /></ExampleCard>
          <ExampleCard title="Default" description="A 14 px amount, the title’s size."><B title="Total owed to people" amount="50,000.67" modes={ctx('Default')} /></ExampleCard>
          <ExampleCard title="Transaction Bubble" description="A 26 px amount with a 28 px symbol."><B title="Total owed to people" amount="50,000.67" modes={ctx('Transaction Bubble')} /></ExampleCard>
          <ExampleCard title="Amount Input" description="A 56 px amount with a 32 px symbol."><B title="Total owed to people" amount="50,000.67" modes={ctx('Amount Input')} /></ExampleCard>
        </div>
      </div>,
    },
    content: {
      header: 'Content', title: 'Say what it is, write it as people read it',
      description: 'Write the title as a short name for the amount, such as “Available balance” or “Total owed to people”. Pass the amount already formatted, with separators and decimals: the Balance shows it exactly as you write it.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="A complete balance"><B title="Available balance" amount="1,24,500.00" /></ExampleCard>
      </div>,
    },
    context: {
      header: 'In context', title: 'What you owe after a trip',
      description: 'The trip screen adds up what you owe and passes it as formatted text; the Balance only shows it. Settle up is the screen’s own Button.',
      body: <div className="coin-new-context">
        <VStack modes={{ Padding: 'None', 'Slot gap': 'XS' } as Modes}>
          <Title title="Goa trip" subtitle="4 friends · 12 expenses" />
          <VStack modes={{ 'Stack Context': 'Nested', Padding: 'Default', 'Slot gap': 'M' } as Modes}>
            <B title="Total owed to people" amount="2,450.00" />
            <Button label="Settle up" onPress={() => setLast('Opened Settle up for ₹2,450.00')} style={{ alignSelf: 'stretch' }} />
          </VStack>
        </VStack>
        <p className="coin-new-readout" role="status">{last}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'A named, readable amount',
      description: 'Each pair shows a Balance people read at a glance next to one that misnames or garbles the amount.',
      body: <div className="coin-new-stack">
        <DoDont goodTitle="Name the amount" goodCaption="“Available balance” says what the number is." good={<B title="Available balance" amount="24,500.00" />}
          badTitle="Leave the default title" badCaption="A savings balance still says “Total owed to people”." bad={<Balance amount="24,500.00" currency="INR" />} />
        <DoDont goodTitle="Format the amount" goodCaption="Separators and decimals read at a glance." good={<B title="Available balance" amount="1,24,500.50" />}
          badTitle="Pass a raw number" badCaption="The Balance doesn’t format, so 124500.5 shows as written." bad={<B title="Available balance" amount="124500.5" />} />
        <DoDont goodTitle="Keep the title short" goodCaption="Two or three words name the amount." good={<Column><B title="Available balance" amount="2,450.00" /></Column>}
          badTitle="Write a sentence" badCaption="A long title wraps and buries the amount." bad={<Column><B title="Total amount you still owe to the friends on this trip after the last settlement" amount="2,450.00" /></Column>} />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Balance contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="28 October 2026" figmaUrl={FIGMA} storybookUrl={STORYBOOK} stories={[
        { label: 'Default', id: 'components-balance--default' }, { label: 'Custom slot', id: 'components-balance--custom-slot' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (27 October build) from the team’s private package repository. Figma’s Balance is one component with a Title property and a nested Money Value; the package adds amount and currency props and a slot for your own Money Value. Figma draws the amount on a 36 px line, the package on a 44 px one, so a Balance is 68 px tall instead of 60. The package’s default amount is “50,000.67”, as in Figma and Storybook. A Money Value in the slot always gets Context3 Balance & Cards. Page type JioPlus turns both the title and the amount white. On the web the amount is announced once, with its currency, such as “₹50,000.67”. The published Storybook docs page for Balance still doesn’t load: the fix is in Biscuit’s source but not yet deployed; its stories load.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'balance', corePrinciple: 'One amount, named, at a glance.', figmaUrl: FIGMA, storybookUrl: STORYBOOK,
  }} playground={<>
    <div className="preview-stage">
      <Balance title={title} amount={amount} currency={currency} modes={ctx(size)} />
      <span className="stage-label">Live Coin Balance</span>
    </div>
    <div className="controls-panel">
      <label className="text-control"><span>Title</span><input value={title} onChange={e => setTitle(e.target.value)} maxLength={40} /></label>
      <label className="text-control"><span>Amount</span><input value={amount} onChange={e => setAmount(e.target.value)} maxLength={16} /></label>
      <Segment label="Currency" value={currency} options={['INR', 'USD', 'EUR'] as const} onChange={setCurrency} />
      <Segment label="Context3" value={size} options={['Balance & Cards', 'Default'] as const} onChange={setSize} />
      <Readout title="Amount size" value={size === 'Balance & Cards' ? '36 px, weight 900' : '14 px, weight 500'}>Context3 sizes only the amount: the title stays 14 px.</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'balance',
  label: 'Balance',
  summary: 'Use a Balance to show one money amount, such as what someone owes or holds, in large type under a short title.',
  keywords: ['account balance', 'amount', 'total', 'money value', 'amount owed'],
  icon: <><path d="M3 3.5h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /><path d="M3 8h5M3 10.5h5M4 8h1.25a2.25 2.25 0 0 1 0 4.5H4l3.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /><path d="M11 8.5v6M14.5 8.5v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /></>,
  Component: BalanceGuide,
})
