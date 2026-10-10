import { useState, type ReactNode } from 'react'
import { Button, Card, EmptyState, IconCapsule, ListGroup, ListItem, MoneyValue, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, Segment, Sources, byTestId, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1828-82'
const LIGHT = { 'Color Mode': 'Light' } as Modes
const BTN = { 'Color Mode': 'Light', 'Button / Size': 'S' } as Modes
const CAP = { 'Color Mode': 'Light', 'Icon Capsule Size': 'L', Emphasis: 'Medium' } as Modes
const ERR = { 'Color Mode': 'Light', 'Icon Capsule Size': 'L', 'Semantic Intent': 'System', AppearanceSystem: 'negative' } as Modes
const CARD = { 'Color Mode': 'Light', AppearanceBrand: 'Neutral' } as Modes
const noop = () => {}

type Reason = { icon: string; modes: Modes; title: string; description: string; button: string }
const EMPTY: Reason = { icon: 'ic_wallet', modes: CAP, title: 'No payments yet', description: 'Payments you make will show up here.', button: 'Make a payment' }
const NORESULT: Reason = { icon: 'ic_search', modes: CAP, title: 'No matching payments', description: 'Try a different name or amount.', button: 'Clear search' }
const FAILED: Reason = { icon: 'ic_error', modes: ERR, title: 'Couldn’t load payments', description: 'Check your connection and try again.', button: 'Try again' }

function ES({ r, testID, showDescription, onPress = noop, buttonSlot, iconSlot }: {
  r: Reason; testID?: string; showDescription?: boolean; onPress?: () => void; buttonSlot?: ReactNode; iconSlot?: ReactNode
}) {
  return <EmptyState modes={LIGHT} testID={testID} title={r.title} description={r.description} showDescription={showDescription}
    iconSlot={iconSlot ?? <IconCapsule iconName={r.icon} modes={r.modes} />}
    buttonSlot={buttonSlot ?? <Button label={r.button} onPress={onPress} modes={BTN} />} />
}

function Host({ children }: { children: ReactNode }) {
  return <div className="coin-new-host wide"><VStack modes={LIGHT} style={{ width: '100%', padding: 0 }}>{children}</VStack></div>
}

const sel = (id: string) => {
  const R = byTestId(id)
  return {
    R,
    icon: `${R} > div:first-child > [role="img"]`,
    title: `${R} > div:first-child > [dir="auto"]:nth-child(2)`,
    description: `${R} > div:first-child > [dir="auto"]:nth-child(3)`,
    button: `${R} > [role="button"]`,
    group: `${R} > div:first-child`,
  }
}
const A = sel('es-anatomy')
const S = sel('es-size')

type ReasonOpt = 'Nothing yet' | 'No results' | 'Couldn’t load'
const REASONS: Record<ReasonOpt, Reason> = { 'Nothing yet': EMPTY, 'No results': NORESULT, 'Couldn’t load': FAILED }

function EmptyStateGuide() {
  const [reason, setReason] = useState<ReasonOpt>('Nothing yet')
  const [description, setDescription] = useState(true)
  const [action, setAction] = useState('None')
  const [payments, setPayments] = useState(0)
  const r = REASONS[reason]

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'An icon, a message, and one button',
      description: 'An icon sits above a bold title and a line of description, with one button below. The icon and the button are components you pass in.',
      body: <Anatomy specimenWidth={236} parts={[
        { name: 'Icon', note: 'An Icon Capsule you pass in; its own modes set size and colour.', target: A.icon, side: 'top' },
        { name: 'Title', note: '16 px bold; says what’s missing.', target: A.title, side: 'right' },
        { name: 'Description', note: '12 px; why it’s empty or what to do.', target: A.description, side: 'left' },
        { name: 'Button', note: 'A Button you pass in, with your label and action.', target: A.button, side: 'bottom' },
      ]}><ES r={FAILED} testID="es-anatomy" /></Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'An icon and a button for the reason',
      description: 'Pick the icon and its colour for why the area is empty, and label the button with the next step. Turn the description off when the title says enough.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Nothing yet" description="A soft brand icon when there’s simply nothing to show yet."><Host><ES r={EMPTY} /></Host></ExampleCard>
        <ExampleCard title="No results" description="After a search or filter, say so and offer a way back."><Host><ES r={NORESULT} /></Host></ExampleCard>
        <ExampleCard title="Couldn’t load" description="A red error icon when loading failed; the button retries."><Host><ES r={FAILED} /></Host></ExampleCard>
        <ExampleCard title="Without a description" description="Drop the description when the title says it all."><Host><ES r={EMPTY} showDescription={false} /></Host></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'A static message with a live button',
      description: 'Empty State has no states of its own: the screen shows it while there’s nothing to list and replaces it when there is. Its button has the usual Button states.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Ready" description="The button waits for a press."><Host><ES r={FAILED} /></Host></ExampleCard>
        <ExampleCard title="Retrying" description="Disable the button while a retry is already running."><Host><ES r={FAILED} buttonSlot={<Button label="Try again" disabled modes={BTN} />} /></Host></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'As wide as its container, as tall as its content',
      description: 'Empty State takes its width from its container and centres its text. It has 4 px of padding, 16 px between the icon, title, and description, and 24 px above the button. Figma’s version is 236 px wide.',
      body: <Anatomy legend={false} specimenWidth={236} marks={[
        { kind: 'size', target: S.R, side: 'left', label: 'both' },
        { kind: 'gap', from: S.group, to: S.button },
        { kind: 'gap', from: S.icon, to: S.title },
      ]}><ES r={FAILED} testID="es-size" /></Anatomy>,
    },
    content: {
      header: 'Content', title: 'What’s missing, why, and what next',
      description: 'Write the title as what’s missing, in a few words. Use the description for why it’s empty or what will appear, and label the button with the next step. Empty State’s own copy and button are placeholders, so always set all of them.',
      body: <ExampleCard title="What’s missing, why, what next"><Host><ES r={EMPTY} /></Host></ExampleCard>,
    },
    context: {
      header: 'In context', title: 'An empty payments card',
      description: 'The Recent payments card shows the empty state until there’s a payment. Make a payment adds one, and the screen swaps the empty state for the list.',
      body: <div className="coin-new-context">
        <Card modes={CARD}>
          <Card.Title>Recent payments</Card.Title>
          {payments === 0
            ? <ES r={EMPTY} onPress={() => setPayments(1)} />
            : <>
              <ListGroup modes={LIGHT}>
                <ListItem layout="Horizontal" modes={LIGHT} title="Netflix" supportText="Today · 17:30" trailing={<MoneyValue value="500" currency="₹" modes={LIGHT} />} />
              </ListGroup>
              <Button label="Clear payments" onPress={() => setPayments(0)} modes={BTN} />
            </>}
        </Card>
        <p className="coin-new-readout" role="status">{payments === 0 ? 'No payments yet' : '1 payment'}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'A clear reason and a working next step',
      description: 'Each pair shows an empty state people can act on versus one that misleads them or does nothing.',
      body: <div className="coin-new-stack">
        <DoDont
          good={<Host><ES r={EMPTY} /></Host>}
          bad={<Host><EmptyState modes={LIGHT} title={EMPTY.title} description={EMPTY.description} iconSlot={<IconCapsule iconName={EMPTY.icon} modes={CAP} />} /></Host>}
          goodTitle="Pass your own button" badTitle="Leave the default button"
          goodCaption="“Make a payment” names the next step, and the screen handles the press." badCaption="It reads “Button” and does nothing when pressed." />
        <DoDont
          good={<Host><ES r={EMPTY} /></Host>}
          bad={<Host><ES r={EMPTY} iconSlot={<IconCapsule iconName="ic_error" modes={ERR} />} /></Host>}
          goodTitle="Match the icon to the reason" badTitle="Use the error icon for an empty list"
          goodCaption="A soft icon for an empty list; red only when something failed." badCaption="A red alert makes “No payments yet” look like a failure." />
        <DoDont
          good={<Host><ES r={EMPTY} /></Host>}
          bad={<Host><EmptyState modes={{ ...LIGHT, 'Icon Capsule Size': 'L', 'Button / Size': 'S' } as Modes} title="No payments yet" description="Payments you make will show up here." iconSlot={<IconCapsule iconName="ic_wallet" />} buttonSlot={<Button label="Make a payment" onPress={noop} />} /></Host>}
          goodTitle="Give each slot its own modes" badTitle="Set sizes on Empty State only"
          goodCaption="The icon and button get Figma’s sizes." badCaption="It doesn’t pass them on, so the icon stays small and the button large." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Empty State contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="10 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('emptystate')} stories={[
        { label: 'Default', id: 'components-emptystate--default' },
        { label: 'Without description', id: 'components-emptystate--without-description' },
        { label: 'Custom slots', id: 'components-emptystate--custom-slots' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (5 October build) from the team’s private package repository. Figma’s Empty state is one 236 px component with a red 81 px icon and a 32 px button. In the package both slots default to placeholders, a small gold card icon and a button labelled “Button” with no action, and passing <code>null</code> keeps them. Empty State doesn’t pass its modes to the icon and button you give it, so set each one’s size and colour on it. Its title renders with a 20 px line height (18 in Figma). It has no background, so this page shows Light only, and on the web it has no role or heading and its icon has no name. The published Storybook still shows the old page.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'emptystate',
    corePrinciple: 'Say what’s missing, then what to do next.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('emptystate'),
  }} playground={<>
    <div className="preview-stage">
      <Host><ES r={r} showDescription={description} onPress={() => setAction(`${r.button} pressed`)} /></Host>
      <span className="stage-label">Live Coin Empty State</span>
    </div>
    <div className="controls-panel">
      <Segment label="Reason" value={reason} options={['Nothing yet', 'No results', 'Couldn’t load'] as const} onChange={setReason} />
      <OnOff label="Description" value={description} onChange={setDescription} />
      <Readout title="Last action" value={action}>The button does nothing until the screen gives it an action.</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'emptystate',
  label: 'Empty State',
  summary: 'Use an Empty State when a list or screen has nothing to show, to say why and offer one next step.',
  keywords: ['no results', 'nothing here', 'zero state', 'blank state', 'error state'],
  icon: <><path d="M2.5 10.5 4.5 4h9l2 6.5v3a1.5 1.5 0 0 1-1.5 1.5H4a1.5 1.5 0 0 1-1.5-1.5v-3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M2.5 10.5h4l1 1.5h3l1-1.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></>,
  Component: EmptyStateGuide,
})
