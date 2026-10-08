import { useState, type ReactNode } from 'react'
import { Button, Card, IconCapsule, ListItem, MoneyValue, Nudge, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, Segment, Sources, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=9177-4104'
const NA = { 'Color Mode': 'Light', AppearanceBrand: 'Neutral', Context: 'Nudge&Alert' } as Modes
const SYSTEM = { ...NA, 'Semantic Intent': 'System', AppearanceSystem: 'warning' } as Modes
const LIGHT = { 'Color Mode': 'Light' } as Modes
const CARD = { 'Color Mode': 'Light', AppearanceBrand: 'Neutral' } as Modes
const CAPSULE = { 'Color Mode': 'Light', Emphasis: 'Low', 'Icon Capsule Size': 'S' } as Modes
const noop = () => {}

const SPLIT = { title: 'Split payment', body: 'Pay ₹12,000 in 3 monthly instalments.', buttonLabel: 'See plans' }
const AUTOPAY = { body: 'Set up autopay so you never miss a bill.', buttonLabel: 'Set up' }

const R = ':scope > div'

function Reasons() {
  return <>
    <ListItem layout="Horizontal" navArrow={false} modes={NA} title="No extra cost" supportText="You pay ₹12,000 in total" leading={<IconCapsule iconName="ic_offer" modes={CAPSULE} />} />
    <ListItem layout="Horizontal" navArrow={false} modes={NA} title="Three monthly payments" supportText="₹4,000 on the 5th of each month" leading={<IconCapsule iconName="ic_calendar" modes={CAPSULE} />} />
    <ListItem layout="Horizontal" navArrow={false} modes={NA} title="Pay with your card" supportText="Any Jio credit card" leading={<IconCapsule iconName="ic_card" modes={CAPSULE} />} />
  </>
}

function Host({ children }: { children: ReactNode }) {
  return <div className="coin-new-host wide"><VStack modes={LIGHT} style={{ width: '100%', padding: 0 }}>{children}</VStack></div>
}

type TypeOpt = 'Prominent' | 'Compact' | 'Detailed'
type Appearance = 'Primary' | 'Secondary' | 'Neutral' | 'Tertiary'

function NudgeGuide() {
  const [type, setType] = useState<TypeOpt>('Prominent')
  const [appearance, setAppearance] = useState<Appearance>('Neutral')
  const [close, setClose] = useState(false)
  const [icon, setIcon] = useState(true)
  const [action, setAction] = useState('None')
  const [shown, setShown] = useState(true)
  const [ctxShown, setCtxShown] = useState(true)
  const [status, setStatus] = useState('Ready to pay ₹12,000')

  const playModes = { ...NA, AppearanceBrand: appearance } as Modes
  const common = {
    modes: playModes, showClose: close, startSlot: icon ? undefined : null,
    onPressButton: () => setAction('Button pressed'), onClose: () => setAction('Close pressed'),
  }
  const playNudge = type === 'Prominent'
    ? <Nudge type="stacked-prominent" {...common} {...SPLIT} />
    : type === 'Compact'
      ? <Nudge type="inline-compact" {...common} {...AUTOPAY} />
      : <Nudge type="stacked-detailed" {...common} title="Why split this payment?"><Reasons /></Nudge>

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'An icon, a message, and one action',
      description: 'A tinted card puts a sparkle beside a bold title and a line of detail, with one small button below. A close button can sit on the right.',
      body: <Anatomy specimenWidth={344} parts={[
        { name: 'Icon', note: 'A 20 px sparkle by default; it can be swapped or removed.', target: `${R} > div:first-child`, side: 'left' },
        { name: 'Title', note: '14 px bold; says what’s on offer in a line.', target: `${R} > div:nth-child(2) > div:first-child > div:first-child`, side: 'top' },
        { name: 'Body', note: '12 px; one sentence of detail.', target: `${R} > div:nth-child(2) > div:first-child > div:nth-child(2)`, side: 'right' },
        { name: 'Button', note: 'The one next step, as a small pill.', target: `${R} [role="button"]`, side: 'bottom' },
        { name: 'Card', note: 'Tinted by its appearance mode, with 12 px padding.', target: R, side: 'top', at: 0.9 },
      ]}><Nudge modes={NA} {...SPLIT} onPressButton={noop} /></Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Type, appearance, and a close button',
      description: 'Choose the type for the space and content you have, and an appearance mode for its colour. Add a close button when people may dismiss it, and pass the Nudge&Alert context so the button is the small size from Figma.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Stacked prominent" description="The default: a title and body stacked beside the icon, the button below."><Host><Nudge modes={NA} {...SPLIT} onPressButton={noop} /></Host></ExampleCard>
        <ExampleCard title="Inline compact" description="One line of text with the button beside it. It has no title."><Host><Nudge type="inline-compact" modes={NA} {...AUTOPAY} onPressButton={noop} /></Host></ExampleCard>
        <ExampleCard title="Stacked detailed" description="A title over your own content, such as list items. No button or close."><Host><Nudge type="stacked-detailed" modes={NA} title="Why split this payment?"><Reasons /></Nudge></Host></ExampleCard>
        <ExampleCard title="Close button" description="Adds an X on the right. The screen removes the nudge when it’s pressed."><Host><Nudge modes={NA} {...SPLIT} showClose onClose={noop} onPressButton={noop} /></Host></ExampleCard>
        <ExampleCard title="Without icon" description="Remove the sparkle when the message needs no accent."><Host><Nudge modes={NA} startSlot={null} title="Turn on autopay" body="Pay your electricity bill on time, every month." buttonLabel="Turn on" onPressButton={noop} /></Host></ExampleCard>
        <ExampleCard title="Brand appearances" description="AppearanceBrand tints the card, body, icon, and button together."><Host>
          {(['Primary', 'Secondary', 'Neutral', 'Tertiary'] as const).map(a => <Nudge key={a} modes={{ ...NA, AppearanceBrand: a } as Modes} {...SPLIT} onPressButton={noop} />)}
        </Host></ExampleCard>
        <ExampleCard title="System warning" description="System intent colours the card for a status: positive, warning, or negative."><Host><Nudge modes={SYSTEM} title="Bill due tomorrow" body="Pay ₹1,240 to avoid a late fee." buttonLabel="Pay now" onPressButton={noop} /></Host></ExampleCard>
        <ExampleCard title="With a border" description="A 1 px grey border separates a white card from a white screen."><Host><Nudge modes={{ ...NA, 'Border Boolean': 'True' } as Modes} {...SPLIT} onPressButton={noop} /></Host></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'A static card with live buttons',
      description: 'The card isn’t interactive. Its button and close button have their own pressed and focus states. Nudge has no hidden state: after a close, the screen removes it.',
      body: <ExampleCard title="Close removes it" description="Press the X: the screen hides the nudge. Bring it back with the button."><Host>
        {shown
          ? <Nudge modes={NA} {...SPLIT} showClose onClose={() => setShown(false)} onPressButton={noop} />
          : <Button label="Show the nudge again" onPress={() => setShown(true)} modes={LIGHT} />}
      </Host></ExampleCard>,
    },
    sizing: {
      header: 'Sizing', title: 'Full width, as tall as its content',
      description: 'A Nudge fills its container. It has 12 px of padding and 6 px between the icon, the content, and the close button; the title and body are 4 px apart, with 8 px above the button. Long copy wraps and the card grows.',
      body: <div className="coin-new-stack">
        <Anatomy legend={false} specimenWidth={344} marks={[
          { kind: 'size', target: R, side: 'bottom', label: 'both' },
          { kind: 'padding', target: R },
          { kind: 'gap', from: `${R} > div:first-child`, to: `${R} > div:nth-child(2)` },
        ]}><Nudge modes={NA} {...SPLIT} onPressButton={noop} /></Anatomy>
        <ExampleCard title="Long copy wraps" description="At 344 px, a two-line title and body make the card 129 px tall; the close button stays centred."><Host>
          <Nudge modes={NA} showClose onClose={noop} onPressButton={noop} title="Split this ₹12,000 purchase into easy monthly instalments" body="Pay in 3, 6 or 9 months at no extra cost with your Jio credit card." buttonLabel="See plans" />
        </Host></ExampleCard>
      </div>,
    },
    content: {
      header: 'Content', title: 'A benefit, a detail, and a next step',
      description: 'Write the title as the benefit, the body as one sentence of detail, and the button as a verb or two. Nudge’s own copy is a placeholder, so always set all three.',
      body: <ExampleCard title="Benefit, detail, next step"><Host><Nudge modes={NA} title="Turn on autopay" body="Pay your electricity bill on time, every month." buttonLabel="Turn on" onPressButton={noop} /></Host></ExampleCard>,
    },
    context: {
      header: 'In context', title: 'A suggestion on a payment screen',
      description: 'The nudge sits between the amount and the Pay button, in a lavender appearance that stands out on the white card. The screen handles its button and removes it on close.',
      body: <div className="coin-new-context">
        <Card modes={CARD}>
          <Card.Title>Pay Croma</Card.Title>
          <MoneyValue value="12,000" currency="₹" modes={CARD} />
          {ctxShown && <Nudge modes={{ ...NA, AppearanceBrand: 'Secondary' } as Modes} {...SPLIT} showClose onPressButton={() => setStatus('Showing instalment plans')} onClose={() => { setCtxShown(false); setStatus('Suggestion dismissed') }} />}
          <Button label="Pay ₹12,000" onPress={() => setStatus('Paid ₹12,000')} modes={LIGHT} />
        </Card>
        <p className="coin-new-readout" role="status">{status}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'One clear suggestion at the right size',
      description: 'Each pair shows a nudge people can read and act on versus one that shouts, says nothing, or hides its action.',
      body: <div className="coin-new-stack">
        <DoDont
          good={<Host><Nudge modes={NA} {...SPLIT} onPressButton={noop} /></Host>}
          bad={<Host><Nudge modes={{ 'Color Mode': 'Light', AppearanceBrand: 'Neutral' } as Modes} {...SPLIT} onPressButton={noop} /></Host>}
          goodTitle="Use the Nudge&Alert context" badTitle="Leave the context unset"
          goodCaption="The button is Figma’s small pill and stays below the message." badCaption="The button grows to 42 px and outweighs the message." />
        <DoDont
          good={<Host><Nudge modes={NA} title="Turn on autopay" body="Pay your electricity bill on time, every month." buttonLabel="Turn on" onPressButton={noop} /></Host>}
          bad={<Host><Nudge modes={NA} /></Host>}
          goodTitle="Write your own copy" badTitle="Ship the placeholder copy"
          goodCaption="The title, body, and button say what’s on offer." badCaption="Without props it reads “Split payment” and “Button”." />
        <DoDont
          good={<Host><Nudge type="stacked-detailed" modes={NA} title="Why split this payment?"><Reasons /></Nudge></Host>}
          bad={<Host><Nudge type="stacked-detailed" modes={NA} title="Split payment" buttonLabel="See plans" showClose /></Host>}
          goodTitle="Use stacked detailed for a list" badTitle="Expect an action on stacked detailed"
          goodCaption="A title over list items explains the offer." badCaption="It ignores the button and close, so people have nothing to tap." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Nudge contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="8 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('nudge')} stories={[
        { label: 'Default', id: 'components-nudge--default' },
        { label: 'Without icon', id: 'components-nudge--without-icon' },
        { label: 'With close button', id: 'components-nudge--with-close-button' },
        { label: 'Inline compact', id: 'components-nudge--inline-compact' },
        { label: 'Stacked detailed', id: 'components-nudge--stacked-detailed' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (5 October build) from the team’s private package repository. Figma’s Nudge is a component set with three types, 344 px wide, and the package matches its spacing. Figma shows a close button on every prominent and compact card; the package adds it only when asked. Figma’s small button needs the Nudge&amp;Alert context, and its white card with a purple icon matches no single appearance mode; Neutral is the closest. In Dark mode the title stays dark on a dark card, so this page shows Light only. The card has no role or name on the web, and the close button is always labelled “Close”.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'nudge',
    corePrinciple: 'One helpful suggestion, one clear next step.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('nudge'),
  }} playground={<>
    <div className="preview-stage">
      <Host>{playNudge}</Host>
      <span className="stage-label">Live Coin Nudge</span>
    </div>
    <div className="controls-panel">
      <Segment label="Type" value={type} options={['Prominent', 'Compact', 'Detailed'] as const} onChange={setType} />
      <Segment label="Appearance" value={appearance} options={['Primary', 'Secondary', 'Neutral', 'Tertiary'] as const} onChange={setAppearance} />
      <OnOff label="Close button" value={close} onChange={setClose} />
      <OnOff label="Icon" value={icon} onChange={setIcon} />
      <Readout title="Last action" value={action}>Close only reports the tap; the screen removes the nudge. Detailed has no button or close.</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'nudge',
  label: 'Nudge',
  summary: 'Use a Nudge for a short suggestion with one action, such as splitting a payment, that sits within a screen’s content.',
  keywords: ['promo card', 'suggestion', 'tip', 'upsell', 'banner'],
  icon: <><rect x="1.5" y="3.5" width="15" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.5" /><path d="M8 7.5h5.5M8 10.5h3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M4.75 6.5v2.5M3.5 7.75h2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></>,
  Component: NudgeGuide,
})
