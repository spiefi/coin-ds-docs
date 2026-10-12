import { useRef, useState, type ComponentType } from 'react'
import { Button, Popup, Text, Title, VStack, type Modes, type PopupProps, type PopupRef } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, ScreenFrame, Segment, Sources, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3040-764'
const LIGHT = { 'Color Mode': 'Light' } as Modes

type ContentProps = { modes?: Modes; onClaim: () => void; onLater?: () => void }

function Choice({ modes, onClaim, onLater, claim, later }: ContentProps & { claim: string; later: string }) {
  return (
    <VStack modes={modes} style={{ alignSelf: 'stretch' }}>
      <Button label={claim} onPress={onClaim} modes={modes} />
      {onLater && <Button label={later} onPress={onLater} modes={{ ...modes, Emphasis: 'Low' } as Modes} />}
    </VStack>
  )
}

function Rewards({ modes, onClaim, onLater }: ContentProps) {
  return <>
    <Title title="Your rewards are waiting" subtitle="Claim your points and enjoy the benefits now." textAlign="Center" modes={modes} />
    <Choice modes={modes} onClaim={onClaim} onLater={onLater} claim="Claim" later="Later" />
  </>
}

function Offer({ modes, onClaim, onLater }: ContentProps) {
  return <>
    <Title title="Get 50% cashback" subtitle="On your next three bill payments this month." textAlign="Center" modes={modes} />
    <Choice modes={modes} onClaim={onClaim} onLater={onLater} claim="Avail now" later="Maybe later" />
  </>
}

function Terms({ modes, onClaim, onLater }: ContentProps) {
  return <>
    <Title title="Offer terms" subtitle="Read before you claim." textAlign="Center" modes={modes} />
    {Array.from({ length: 40 }, (_, i) => (
      <Text key={i} modes={modes}>{`${i + 1}. Cashback is credited within 7 days of an eligible payment of ₹100 or more.`}</Text>
    ))}
    <Choice modes={modes} onClaim={onClaim} onLater={onLater} claim="Claim" later="Later" />
  </>
}

function Triggered({ label = 'Open popup', content: Content, extraModes, noLater = false, ...props }: Omit<PopupProps, 'trigger' | 'children' | 'modes' | 'defaultOpen'> & {
  label?: string; content: ComponentType<ContentProps>; extraModes?: Record<string, string>; noLater?: boolean
}) {
  const ref = useRef<PopupRef>(null)
  const close = () => ref.current?.close()
  return (
    <Popup ref={ref} trigger={<Button label={label} modes={LIGHT} />} modes={{ ...LIGHT, ...extraModes } as Modes} {...props}>
      <Content onClaim={close} onLater={noLater ? undefined : close} />
    </Popup>
  )
}

function ScreenOpened() {
  const [open, setOpen] = useState(false)
  return <>
    <Button label="Show offer" modes={LIGHT} onPress={() => setOpen(true)} />
    <Popup open={open} onOpenChange={setOpen} modes={LIGHT}>
      <Offer onClaim={() => setOpen(false)} onLater={() => setOpen(false)} />
    </Popup>
  </>
}

const SCRIM = { '30%': 0.3, '50%': 0.5, '70%': 0.7 } as const
const SPEED = { '150 ms': 150, '250 ms': 250, '400 ms': 400 } as const
type Scrim = keyof typeof SCRIM
type Speed = keyof typeof SPEED
type Gap = 'XS' | 'S' | 'M' | 'L' | 'XL'
type PageType = 'MainPage' | 'SubPage' | 'JioPlus'

function PopupGuide() {
  const [open, setOpen] = useState(false)
  const [scrimTap, setScrimTap] = useState(true)
  const [scrim, setScrim] = useState<Scrim>('50%')
  const [speed, setSpeed] = useState<Speed>('250 ms')
  const [gap, setGap] = useState<Gap>('S')
  const [pageType, setPageType] = useState<PageType>('MainPage')
  const [ctxOpen, setCtxOpen] = useState(false)
  const [status, setStatus] = useState('Payment complete')

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A trigger, then a sheet over the screen',
      description: 'Only the trigger sits in the page. Pressing it dims the whole screen with a scrim and slides up a white sheet with 20 px top corners and 24 px of space at the bottom. The sheet holds one centred stack of your content, with 8 px of padding and 8 px between items. Press the trigger to see them: React Native draws the popup over the page, so this diagram can’t frame it.',
      body: <Anatomy parts={[
        { name: 'Trigger', note: 'Yours: any pressable. Pressing it opens the popup over the whole screen.', target: '[role="button"]', side: 'right' },
      ]}><Triggered label="Claim rewards" content={Rewards} /></Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'How it opens, its scrim, and its spacing',
      description: 'A popup opens from its own trigger or when the screen sets it open. The scrim\'s strength is a setting. Modes on the popup reach its stack: Slot gap sets the space between items, and Page type the stack\'s padding.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Opened by its trigger" description="The popup opens when its trigger is pressed and keeps its own open state."><Triggered content={Rewards} /></ExampleCard>
        <ExampleCard title="Opened by the screen" description="The screen decides when it's open, for example after a payment, and hears every close."><ScreenOpened /></ExampleCard>
        <ExampleCard title="Lighter scrim" description="30% black lets more of the page show through than the default 50%."><Triggered backdropOpacity={0.3} content={Rewards} /></ExampleCard>
        <ExampleCard title="Wider spacing" description="Slot gap L puts 24 px between the title and the buttons; the default, S, is 8 px."><Triggered extraModes={{ 'Slot gap': 'L' }} content={Rewards} /></ExampleCard>
        <ExampleCard title="Sub page padding" description="On a sub page, or JioPlus, the stack's padding grows from 8 to 16 px."><Triggered extraModes={{ 'Page type': 'SubPage' }} content={Rewards} /></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Closed, open, and how it closes',
      description: 'Closed, only the trigger shows. Opening fades in the scrim while the sheet springs up from the bottom; closing slides it down and fades the scrim over 250 ms. A tap on the scrim, Escape, or a button in the sheet closes it, and focus stays inside while it\'s open.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Closes from inside" description="Later closes it from inside; Claim would carry on with the task."><Triggered content={Rewards} /></ExampleCard>
        <ExampleCard title="Scrim tap off" description="Only Later or Escape closes it. The dimmed page is still a button named “Close popup” that does nothing (#268)."><Triggered closeOnBackdropPress={false} content={Rewards} /></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'The window\'s width, its content\'s height',
      description: 'The sheet spans the whole window, as it spans a phone screen, and grows with its content. There\'s no maximum height and no scroll, so content taller than the screen runs off the top (#268).',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Short content" description="A title and two buttons: the sheet hugs them at the bottom of the screen."><Triggered content={Rewards} /></ExampleCard>
        <ExampleCard title="Tall content" description="Forty lines of terms run off the top of the window and can't be scrolled to."><Triggered label="Open tall content" content={Terms} /></ExampleCard>
      </div>,
    },
    content: {
      header: 'Content', title: 'A headline, one line, and two choices',
      description: 'Lead with what\'s in it for people, add one supporting line, then a main action and a quiet way out. Figma\'s example also puts an image above the title.',
      body: <ExampleCard title="An offer" description="One headline, one line of detail, Avail now, and Maybe later."><Triggered label="See offer" content={Offer} /></ExampleCard>,
    },
    context: {
      header: 'In context', title: 'Rewards after a payment',
      description: 'After a payment the screen opens a rewards popup. Claim or Later closes it and the screen notes the choice; a tap on the dimmed page or Escape just closes it.',
      body: <div className="coin-new-context">
        <ScreenFrame>
          <VStack modes={{ ...LIGHT, 'Slot gap': 'L' } as Modes}>
            <Title title="Payment successful" subtitle="₹250 paid to Ravi Stores." textAlign="Center" modes={LIGHT} />
            <Button label="Done" modes={LIGHT} onPress={() => setCtxOpen(true)} />
          </VStack>
          <Popup open={ctxOpen} onOpenChange={next => { setCtxOpen(next); if (!next) setStatus('Closed') }} modes={LIGHT}>
            <Rewards
              onClaim={() => { setStatus('Rewards claimed'); setCtxOpen(false) }}
              onLater={() => { setStatus('Saved for later'); setCtxOpen(false) }}
            />
          </Popup>
        </ScreenFrame>
        <p className="coin-new-readout" role="status">{status}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Short, with a way out',
      description: 'Each pair opens a popup people can read and leave next to one that traps them or runs off the screen.',
      body: <div className="coin-new-stack">
        <DoDont good={<Triggered content={Rewards} />} bad={<Triggered closeOnBackdropPress={false} noLater content={Rewards} />}
          goodTitle="Offer a way out" goodCaption="Later, a tap on the dimmed page, and Escape all close it."
          badTitle="Trap people in it" badCaption="With no Later and scrim taps off, only Escape closes it, and phones have no Escape key." />
        <DoDont good={<Triggered content={Rewards} />} bad={<Triggered content={Terms} />}
          goodTitle="Keep it short" goodCaption="A title and two buttons fit any screen."
          badTitle="Fill it with text" badCaption="Long content runs off the top of the screen and can't be scrolled (#268)." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Popup contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="12 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('popup')} stories={[
        { label: 'Default', id: 'components-popup--default' }, { label: 'Controlled', id: 'components-popup--controlled' }, { label: 'Custom content', id: 'components-popup--custom-content' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (5 October build) from the team’s private package repository; Biscuit’s newer build only rewrites the Storybook page. Figma’s Popup is a 360 × 508 white sheet with 20 px top corners and 24 px at the bottom, holding an image, a title, and two buttons; it has no scrim or properties. In code it’s a React Native Modal: on the web it opens over the whole browser window, never inside a frame, so these examples open it from a button, as Storybook does. The sheet spans the window, its scrim is 50% black from props (Overlay’s is 70%), and it springs up but slides away over its close speed. On the web Escape closes it and focus stays inside it, but focus starts on the dimmed page’s “Close popup” button, the dialog has no name, a scrim with taps off is still that button, doing nothing, and tall content runs off the screen (#268). The published Storybook page is still the old generated one.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'popup',
    corePrinciple: 'One short message and a choice, then back to the screen.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('popup'),
  }} playground={<>
    <div className="preview-stage">
      <Triggered label="Claim rewards" content={Rewards} onOpenChange={setOpen}
        closeOnBackdropPress={scrimTap} backdropOpacity={SCRIM[scrim]} animationDuration={SPEED[speed]}
        extraModes={{ 'Slot gap': gap, 'Page type': pageType }} />
      <span className="stage-label">Live Coin Popup</span>
    </div>
    <div className="controls-panel">
      <OnOff label="Close on scrim tap" value={scrimTap} onChange={setScrimTap} />
      <Segment label="Scrim" value={scrim} options={['30%', '50%', '70%'] as const} onChange={setScrim} />
      <Segment label="Close speed" value={speed} options={['150 ms', '250 ms', '400 ms'] as const} onChange={setSpeed} />
      <Segment label="Slot gap" value={gap} options={['XS', 'S', 'M', 'L', 'XL'] as const} onChange={setGap} />
      <Segment label="Page type" value={pageType} options={['MainPage', 'SubPage', 'JioPlus'] as const} onChange={setPageType} />
      <Readout title="Popup" value={open ? 'Open' : 'Closed'}>
        {scrimTap
          ? 'Press Claim rewards: the popup opens over the whole page, as it covers a phone screen. Later, a tap on the dimmed page, or Escape closes it.'
          : 'A tap on the dimmed page does nothing now. Later or Escape closes it.'}
      </Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'popup',
  label: 'Popup',
  summary: 'Use a Popup for a short, focused moment, such as an offer or a reward, that slides up over the screen and asks for one choice.',
  keywords: ['bottom sheet popup', 'modal', 'promo sheet', 'rewards popup'],
  icon: <><rect x="4" y="1.5" width="10" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M4 11c0-1.1.9-2 2-2h6a2 2 0 0 1 2 2" stroke="currentColor" strokeWidth="1.5" fill="none" /></>,
  Component: PopupGuide,
})
