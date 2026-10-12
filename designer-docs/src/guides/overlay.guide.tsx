import { useState, type ReactNode } from 'react'
import { Button, ButtonGroup, Card, Overlay, Text, Title, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, ScreenFrame, Segment, Sources, byTestId, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2976-55'
const LIGHT = { 'Color Mode': 'Light' } as Modes
// The white dialog Card passes AppearanceBrand Neutral to its children; its buttons stay Primary.
const PRIMARY = { ...LIGHT, AppearanceBrand: 'Primary' } as Modes
const noop = () => {}
type Placement = 'center' | 'top' | 'bottom' | 'stretch'

const OV = (id: string) => byTestId(id)

function Screen({ open }: { open: () => void }) {
  return <VStack modes={LIGHT}>
    <Text modes={{ ...LIGHT, 'Text Sizes': 'Large' } as Modes}>Home</Text>
    <Text modes={LIGHT}>Your balance and recent payments.</Text>
    <Button label="Pay ₹250" onPress={open} modes={LIGHT} />
  </VStack>
}

function Dialog({ pay, cancel }: { pay: () => void; cancel?: () => void }) {
  return <Card modes={{ ...LIGHT, AppearanceBrand: 'Neutral' } as Modes} style={{ margin: 16 }}>
    <Title title="Confirm payment" subtitle="₹250 to Ravi Stores" numberOfLines={2} modes={LIGHT} />
    <ButtonGroup modes={LIGHT}>
      <Button label="Pay" onPress={pay} modes={PRIMARY} />
      {cancel && <Button label="Cancel" onPress={cancel} modes={{ ...PRIMARY, Emphasis: 'Low' } as Modes} />}
    </ButtonGroup>
  </Card>
}

function Frame({ placement, tap = true, initial = true, content = 'dialog' }: {
  placement?: Placement; tap?: boolean; initial?: boolean; content?: 'dialog' | 'none' | 'no-cancel'
}) {
  const [shown, setShown] = useState(initial)
  const hide = () => setShown(false)
  const children: ReactNode = content === 'none' ? undefined : <Dialog pay={hide} cancel={content === 'no-cancel' ? undefined : hide} />
  return <ScreenFrame footer={shown && <Overlay modes={LIGHT} contentPlacement={placement} onPress={tap ? hide : undefined}>{children}</Overlay>}>
    <Screen open={() => setShown(true)} />
  </ScreenFrame>
}

function StackedFrame() {
  const [shown, setShown] = useState(true)
  const hide = () => setShown(false)
  return <ScreenFrame footer={shown && <>
    <Overlay modes={LIGHT} />
    <Overlay modes={LIGHT} onPress={hide}><Dialog pay={hide} cancel={hide} /></Overlay>
  </>}><Screen open={() => setShown(true)} /></ScreenFrame>
}

function ContextFrame() {
  const [shown, setShown] = useState(false)
  const [status, setStatus] = useState('On Home')
  const pay = () => { setShown(false); setStatus('Paid ₹250 to Ravi Stores') }
  const cancel = () => { setShown(false); setStatus('Payment cancelled') }
  return <div className="coin-new-context">
    <ScreenFrame footer={shown && <Overlay modes={LIGHT} onPress={cancel}><Dialog pay={pay} cancel={cancel} /></Overlay>}>
      <Screen open={() => setShown(true)} />
    </ScreenFrame>
    <p className="coin-new-readout" role="status">{status}</p>
  </div>
}

function OverlayGuide() {
  const [shown, setShown] = useState(true)
  const [placement, setPlacement] = useState<'Center' | 'Top' | 'Bottom' | 'Stretch'>('Center')
  const [content, setContent] = useState(true)
  const [tap, setTap] = useState(true)
  const hide = () => setShown(false)

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A scrim with your content above it',
      description: 'The overlay is a 70% black layer over its screen. With onPress it also becomes one large dismiss button; whatever you place inside it sits above the scrim.',
      body: <Anatomy specimenWidth={360} parts={[
        { name: 'Scrim', note: '70% black over the whole screen; it doesn’t change with mode.', target: OV('ov-anatomy'), side: 'left' },
        { name: 'Dismiss area', note: 'With onPress, a tap anywhere on the scrim calls it.', target: `${OV('ov-anatomy')} > [aria-label="Dismiss overlay"]`, side: 'right' },
        { name: 'Content', note: 'Yours, placed above the scrim; presses on it don’t dismiss.', target: `${OV('ov-anatomy')} > :last-child`, side: 'top' },
      ]}>
        <ScreenFrame footer={<Overlay testID="ov-anatomy" modes={LIGHT} onPress={noop}><Dialog pay={noop} cancel={noop} /></Overlay>}><Screen open={noop} /></ScreenFrame>
      </Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Placement, content, and fill',
      description: 'Content sits in the middle by default, or docks to the top or bottom. Leave the overlay empty when a sheet or drawer draws its own surface. With fill off it stays in the page’s flow instead of covering its screen.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Centred" description="The default: content sits in the middle at its own width."><Frame /></ExampleCard>
        <ExampleCard title="At the top" description="Content docks to the top and stretches across the screen."><Frame placement="top" /></ExampleCard>
        <ExampleCard title="At the bottom" description="Content docks to the bottom and stretches across, like a sheet."><Frame placement="bottom" /></ExampleCard>
        <ExampleCard title="Stretched" description="Content stays in the middle but spans the screen’s width."><Frame placement="stretch" /></ExampleCard>
        <ExampleCard title="Bare scrim" description="Only the dim layer, for a sheet or drawer that draws its own surface."><Frame content="none" /></ExampleCard>
        <ExampleCard title="Fill off" description="The scrim stays in the page’s flow and covers only its own content.">
          <ScreenFrame><Screen open={noop} /><Overlay fill={false} modes={LIGHT}><Dialog pay={noop} cancel={noop} /></Overlay></ScreenFrame>
        </ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Shown, dismissible, or blocking',
      description: 'The screen shows an overlay by rendering it and hides it by removing it; it appears and goes at once, with no fade. With onPress, a tap on the scrim calls it; without, the scrim still blocks the page but does nothing.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Tap to dismiss" description="A tap on the dimmed page hides it; Pay ₹250 brings it back."><Frame /></ExampleCard>
        <ExampleCard title="Blocking" description="Taps on the dimmed page do nothing, and the page underneath can’t be pressed."><Frame tap={false} /></ExampleCard>
        <ExampleCard title="Hidden" description="Nothing is drawn: the page is bright and can be pressed."><Frame initial={false} /></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'Fills its nearest positioned parent',
      description: 'With fill on, the overlay covers the nearest parent that sets a position, here the screen, and nothing outside it; it has no size of its own. With fill off it is as big as its content.',
      body: <Anatomy legend={false} specimenWidth={360} marks={[{ kind: 'size', target: byTestId('ov-size'), side: 'right', label: 'both' }]}>
        <ScreenFrame footer={<Overlay testID="ov-size" modes={LIGHT} />}><Screen open={noop} /></ScreenFrame>
      </Anatomy>,
    },
    content: {
      header: 'Content', title: 'One focused task above the scrim',
      description: 'Put one small surface on the scrim, such as a confirmation with two buttons, and give people a way back: a Cancel button and onPress on the scrim. The scrim’s spoken name, “Dismiss overlay”, is fixed in English.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Confirm or cancel" description="One question, one main action, and Cancel."><Frame /></ExampleCard>
      </div>,
    },
    context: {
      header: 'In context', title: 'Confirming a payment',
      description: 'Pay ₹250 dims Home and asks for confirmation. Pay completes it; Cancel or a tap on the dimmed screen backs out. The screen removes the overlay either way.',
      body: <ContextFrame />,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Dim the page, and always offer a way back',
      description: 'Each pair shows an overlay people can leave and read past next to one that traps or blacks out the screen.',
      body: <div className="coin-new-stack">
        <DoDont good={<Frame />} bad={<Frame tap={false} content="no-cancel" />}
          goodTitle="Offer a way back" goodCaption="onPress on the scrim and a Cancel button give two ways out."
          badTitle="Leave no way back" badCaption="Without onPress or Cancel, only finishing the task closes it." />
        <DoDont good={<Frame />} bad={<StackedFrame />}
          goodTitle="Use one scrim" goodCaption="One 70% layer keeps the page faintly visible behind."
          badTitle="Stack scrims" badCaption="Two overlays add up to 91% black and hide the page." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Overlay contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="12 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('overlay')} stories={[
        { label: 'Default', id: 'components-overlay--default' },
        { label: 'Bare backdrop', id: 'components-overlay--bare-backdrop' },
        { label: 'Bottom sheet', id: 'components-overlay--bottom-sheet' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (5 October build) from the team’s private package repository; Biscuit’s newer build only rewrites the Storybook page. Figma’s Overlay is a fill of 70% black with no properties; placement, content, fill, and tap to dismiss exist only in code. In code it fills its nearest positioned parent, not the device screen, and its colour is the same in every mode. It isn’t a modal: it has no animation, focus handling, or Escape, and with onPress it adds one large button named “Dismiss overlay”, fixed in English, whose focus ring outlines the whole screen while Tab can still reach the page behind (#269). Drawer uses it for its scrim. The examples host it as the Storybook stories do, over a small white screen; the dialog is a Coin Card instead of the stories’ hand-made box. The published Storybook page is still the old generated one.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'overlay', corePrinciple: 'Dim the page so one thing stands out.', figmaUrl: FIGMA, storybookUrl: docsUrl('overlay'),
  }} playground={<>
    <div className="preview-stage">
      <ScreenFrame footer={shown && <Overlay modes={LIGHT} contentPlacement={placement.toLowerCase() as Placement} onPress={tap ? hide : undefined}>
        {content ? <Dialog pay={hide} cancel={hide} /> : undefined}
      </Overlay>}><Screen open={() => setShown(true)} /></ScreenFrame>
      <span className="stage-label">Live Coin Overlay</span>
    </div>
    <div className="controls-panel">
      <OnOff label="Shown" value={shown} onChange={setShown} />
      <Segment label="Placement" value={placement} options={['Center', 'Top', 'Bottom', 'Stretch'] as const} onChange={setPlacement} />
      <OnOff label="Content" value={content} onChange={setContent} />
      <OnOff label="Tap to dismiss" value={tap} onChange={setTap} />
      <Readout title="Overlay" value={shown ? 'Shown' : 'Hidden'}>
        {tap ? 'Tap the dimmed screen, Pay, or Cancel to hide it. Pay ₹250 brings it back.' : 'Taps on the dimmed screen do nothing now. Pay or Cancel hide it.'}
      </Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'overlay',
  label: 'Overlay',
  summary: 'Use an Overlay to dim the screen behind a dialog, sheet, or drawer, so attention goes to what sits above it.',
  keywords: ['scrim', 'backdrop', 'dim layer', 'modal background'],
  icon: <><rect x="2" y="2" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" /><rect x="5" y="6.5" width="8" height="5" rx="1" fill="currentColor" /></>,
  Component: OverlayGuide,
})
