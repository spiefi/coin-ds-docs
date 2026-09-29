import { useState, type ReactNode } from 'react'
import { Button, Card, MoneyValue, Numpad, Text, VStack, type Modes, type NumpadKeyValue } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, Sources, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2054-964'
const LIGHT = { 'Color Mode': 'Light' } as Modes

function Host({ children }: { children: ReactNode }) {
  return <div className="coin-new-host wide"><VStack modes={LIGHT} style={{ flex: 1 }}>{children}</VStack></div>
}

function typeKey(value: string, key: NumpadKeyValue) {
  if (key === 'backspace') return value.slice(0, -1)
  if (value.length >= 8) return value
  if (key === '.') return value.includes('.') ? value : value + '.'
  return value + key
}

function NumpadGuide() {
  const [shuffle, setShuffle] = useState(true)
  const [decimal, setDecimal] = useState(true)
  const [entered, setEntered] = useState('')
  const [amount, setAmount] = useState('')
  const [status, setStatus] = useState('No amount yet')

  const onAmountKey = (key: NumpadKeyValue) => {
    const next = typeKey(amount, key)
    setAmount(next)
    setStatus(next ? `Amount ₹${next}` : 'No amount yet')
  }

  const pin = <Text modes={LIGHT}>● ● ○ ○</Text>

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A grid of twelve keys',
      description: 'Four rows of three keys: digits, an optional decimal point, and backspace. The keys have no fill; they dim while pressed.',
      body: <Anatomy specimenWidth={318} marks={[{ kind: 'gap', from: '[aria-label="4"]', to: '[aria-label="5"]' }]} parts={[
        { name: 'Digit key', note: 'A large digit; each key takes an equal share of the row.', target: '[aria-label="2"]', side: 'top' },
        { name: 'Decimal point', note: 'Optional; hide it for whole numbers such as a PIN.', target: '[aria-label="."]', side: 'left' },
        { name: 'Backspace', note: 'Deletes the last character; always at the bottom right.', target: '[aria-label="Backspace"]', side: 'right' },
        { name: 'Key gap', note: '12 px between keys, across and down.', between: ['[aria-label="7"]', '[aria-label="8"]'], side: 'bottom' },
      ]}><VStack modes={LIGHT}><Numpad modes={LIGHT} shuffle={false} /></VStack></Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Shuffle and the decimal point',
      description: 'Shuffle is on by default and protects sensitive numbers. Turn it off only for numbers that are not secret. Hide the decimal point when only whole numbers are valid.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Shuffled" description="The default. Digits move each time, against shoulder-surfing; for PINs, codes, and amounts."><Host><Numpad modes={LIGHT} /></Host></ExampleCard>
        <ExampleCard title="In order" description="The familiar 1–9 layout, for numbers that are not secret, such as a quantity."><Host><Numpad modes={LIGHT} shuffle={false} /></Host></ExampleCard>
        <ExampleCard title="Without decimal" description="For whole numbers such as a PIN; the bottom-left key is left empty."><Host><Numpad modes={LIGHT} showDecimal={false} /></Host></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Keys only dim when pressed',
      description: 'Numpad has one interactive state: a key dims to 40% while it is pressed. There are no disabled or selected keys; the screen decides what a key press does.',
      body: <ExampleCard title="Pressed" description="Press any key to see it dim."><Host><Numpad modes={LIGHT} shuffle={false} /></Host></ExampleCard>,
    },
    sizing: {
      header: 'Sizing', title: 'The parent sets the width',
      description: 'Keys share the width equally and are at least 46 px tall, with 12 px gaps. At 318 px wide each key is 98 × 46 px. Give it the full width of the screen.',
      body: <Anatomy legend={false} marks={[
        { kind: 'size', target: '[role="presentation"]', side: 'top', label: 'both' },
        { kind: 'size', target: '[aria-label="1"]', side: 'left', label: 'both' },
      ]}><VStack modes={LIGHT} style={{ width: 334 }}><Numpad modes={LIGHT} shuffle={false} /></VStack></Anatomy>,
    },
    content: {
      header: 'Content', title: 'Show what’s been typed',
      description: 'The Numpad has no display. Put the value above it: the formatted amount for money, or masked dots for a PIN, never the PIN itself.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Amount"><Host><MoneyValue modes={LIGHT} value="1250" currency="₹" /><Numpad modes={LIGHT} /></Host></ExampleCard>
        <ExampleCard title="PIN"><Host>{pin}<Numpad modes={LIGHT} showDecimal={false} /></Host></ExampleCard>
      </div>,
    },
    context: {
      header: 'In context', title: 'Adding money to a wallet',
      description: 'The screen keeps the amount, updates the value above the pad on each key press, and enables the button once there is an amount. The Numpad only reports keys.',
      body: <div className="coin-new-context">
        <Card modes={LIGHT}><VStack modes={LIGHT}>
          <Text modes={LIGHT}>Add money</Text>
          <MoneyValue modes={LIGHT} value={amount || '0'} currency="₹" />
          <Numpad modes={LIGHT} onKeyPress={onAmountKey} />
          <Button modes={LIGHT} label={amount ? `Add ₹${amount}` : 'Enter an amount'} disabled={!amount} onPress={() => setStatus(`Adding ₹${amount}`)} />
        </VStack></Card>
        <p className="coin-new-readout" role="status">{status}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Keep sensitive entry safe',
      description: 'Each pair shows a pad that protects people versus one that exposes them.',
      body: <div className="coin-new-stack">
        <DoDont good={<Host>{pin}<Numpad modes={LIGHT} showDecimal={false} /></Host>} bad={<Host>{pin}<Numpad modes={LIGHT} showDecimal={false} shuffle={false} /></Host>}
          goodTitle="Shuffle for a PIN" badTitle="Use a fixed layout for a PIN"
          goodCaption="Changing positions stop onlookers learning the PIN from finger movements." badCaption="A fixed 1–9 layout lets onlookers read the PIN from finger positions." />
        <DoDont good={<Host><Numpad modes={LIGHT} showDecimal={false} /></Host>} bad={<Host><Numpad modes={LIGHT} /></Host>}
          goodTitle="Hide the decimal for a PIN" badTitle="Offer a decimal for a PIN"
          goodCaption="Only digits can be typed." badCaption="A decimal key invites an entry that can never be valid." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Numpad contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="29 September 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('numpad')} stories={[
        { label: 'Default', id: 'components-numpad--default' },
        { label: 'Unshuffled', id: 'components-numpad--unshuffled' },
        { label: 'Without decimal', id: 'components-numpad--without-decimal' },
        { label: 'Bottom fixed', id: 'components-numpad--bottom-fixed' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.77</code> from the team’s private package repository. Figma shows the keys in 1–9 order with a “←” glyph; the package shuffles the digits by default and draws a backspace icon. The screen keeps the value, shows it above the pad, and places the pad; the Numpad has no display, masking, or length limit.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'numpad',
    summary: 'Use the Numpad to enter a PIN, a one-time code, or an amount on screen, without the system keyboard.',
    corePrinciple: 'Secure by default. Keep the digits shuffled whenever the number is sensitive.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('numpad'),
  }} playground={<>
    <div className="preview-stage">
      <Host><Numpad key={String(shuffle)} modes={LIGHT} shuffle={shuffle} showDecimal={decimal} onKeyPress={key => setEntered(value => typeKey(value, key))} /></Host>
      <span className="stage-label">Live Coin Numpad</span>
    </div>
    <div className="controls-panel">
      <OnOff label="Shuffle" value={shuffle} onChange={setShuffle} />
      <OnOff label="Decimal" value={decimal} onChange={next => { setDecimal(next); if (!next) setEntered(value => value.replace(/\./g, '')) }} />
      <Readout title="Entered" value={entered || 'Nothing yet'}>{shuffle ? 'Digits move each time the pad opens.' : 'Digits stay in the familiar 1–9 order.'}</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'numpad',
  label: 'Numpad',
  icon: <path d="M4.5 4.5h.01M9 4.5h.01M13.5 4.5h.01M4.5 9h.01M9 9h.01M13.5 9h.01M4.5 13.5h.01M9 13.5h.01M13.5 13.5h.01" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />,
  Component: NumpadGuide,
})
