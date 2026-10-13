import { useState } from 'react'
import { AppBar, Button, HelloJioInput, IconButton, JioDot, ModalSheet, Text, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, ScreenFrame, Segment, Sources, byTestId, docsUrl, usePresentationProgress } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=9559-28121'
const LIGHT = { 'Color Mode': 'Light' } as Modes
type PageType = 'MainPage' | 'SubPage' | 'JioPlus'
const sheetModes = (pageType: PageType) => ({ ...LIGHT, 'Page type': pageType } as Modes)
const noop = () => {}

const MS = byTestId('ms-anatomy')
const SZ = byTestId('ms-size')

// The slot content as elements, not a component of its own, so the sheet sees
// each child and gives it modes as in the Storybook story.
function useChat({ close, fill, onSubmit = noop, closeButton = true, field = true }: {
  close: () => void; fill: boolean; onSubmit?: (text: string) => void; closeButton?: boolean; field?: boolean
}) {
  const [q, setQ] = useState('')
  return <>
    <AppBar type="SubPage" leadingSlot={<JioDot />} actionsSlot={closeButton ? <IconButton iconName="ic_close" accessibilityLabel="Close" onPress={close} modes={{ ...LIGHT, Emphasis: 'Low' } as Modes} /> : undefined} />
    <Text>Ask about your spends, bills, or investments.</Text>
    {fill && <VStack style={{ flex: 1 }} />}
    {field && <HelloJioInput value={q} onChangeText={setQ} onSubmit={text => { onSubmit(text); setQ('') }} />}
  </>
}

function Screen({ open }: { open: () => void }) {
  return <>
    <Text modes={LIGHT}>Home</Text>
    <Button label="Ask HelloJio" onPress={open} modes={LIGHT} />
  </>
}

function Frame({ fill = true, scrim = true, visible = true, topInset, closeButton = true, field = true, pageType = 'MainPage', drag = true }: {
  fill?: boolean; scrim?: boolean; visible?: boolean; topInset?: number; closeButton?: boolean; field?: boolean; pageType?: PageType; drag?: boolean
}) {
  const [shown, setShown] = useState(visible)
  const progress = usePresentationProgress()
  const hide = () => setShown(false)
  const chat = useChat({ close: hide, fill, closeButton, field })
  return <ScreenFrame receded={progress} footer={
    <ModalSheet visible={shown} fillHeight={fill} showOverlay={scrim} enableDismissGesture={drag} onOverlayPress={hide} onRequestClose={hide} topInset={topInset} presentationProgress={progress} modes={sheetModes(pageType)}>
      {chat}
    </ModalSheet>
  }><Screen open={() => setShown(true)} /></ScreenFrame>
}

function ModalSheetGuide() {
  const [shown, setShown] = useState(true)
  const [height, setHeight] = useState<'Fill' | 'Fit content'>('Fill')
  const [scrim, setScrim] = useState(true)
  const [pageType, setPageType] = useState<PageType>('MainPage')
  const [drag, setDrag] = useState(true)
  const [ctxShown, setCtxShown] = useState(false)
  const [status, setStatus] = useState('On Home')
  const progress = usePresentationProgress()
  const ctxProgress = usePresentationProgress()
  const fill = height === 'Fill'
  const hide = () => setShown(false)
  const ctxHide = () => setCtxShown(false)
  const anatomyChat = useChat({ close: noop, fill: false })
  const sizeChat = useChat({ close: noop, fill: false })
  const ctxChat = useChat({ fill: true, close: () => { setStatus('Closed without asking'); ctxHide() },
    onSubmit: text => { setStatus(text.trim() ? `Asked: ${text.trim()}` : 'Asked nothing'); ctxHide() } })
  const playChat = useChat({ close: hide, fill })

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A white sheet with one slot',
      description: 'The sheet is a rounded white surface with one slot. It has no title or close button of its own: put an App Bar with a close button at the top and the main field at the bottom.',
      body: <Anatomy specimenWidth={360} parts={[
        { name: 'Sheet', note: 'White, with 20 px corners and no handle.', target: MS, side: 'left' },
        { name: 'Slot', note: 'One column of your content; it gets the sheet’s modes, without Page type.', target: `${MS} > div`, side: 'right' },
        { name: 'App bar', note: 'Yours: the top of the slot, holding the close button.', target: `${MS} > div > [role="heading"]`, side: 'top' },
        { name: 'Close button', note: 'Yours: a named IconButton that hides the sheet.', target: `${MS} [aria-label="Close"]`, side: 'right' },
        { name: 'Field', note: 'Yours: the main input or action, at the bottom.', target: `${MS} input`, side: 'bottom' },
      ]}>
        <ModalSheet testID="ms-anatomy" fillHeight={false} modes={LIGHT}>{anatomyChat}</ModalSheet>
      </Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Height, scrim, top inset, and page type',
      description: 'A sheet fills the screen by default; fit it to short content instead. A scrim dims the page around a fitted sheet, and a top inset lets the page peek above it. Page type sets the sheet’s colour.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Fills the screen" description="The default: the sheet covers the screen and the field sits at its foot."><Frame /></ExampleCard>
        <ExampleCard title="Fits its content" description="The sheet hugs its content and docks to the bottom."><Frame fill={false} /></ExampleCard>
        <ExampleCard title="Without a scrim" description="The page stays bright behind the sheet, as in the Storybook story."><Frame fill={false} scrim={false} /></ExampleCard>
        <ExampleCard title="Top inset" description="The page peeks 40 px above, and the sheet shortens to keep its bottom on the screen."><Frame topInset={40} /></ExampleCard>
        <ExampleCard title="Main or sub page" description="MainPage, the default used everywhere else here, and SubPage both give a white sheet."><Frame fill={false} pageType="SubPage" /></ExampleCard>
        <ExampleCard title="JioPlus" description="A light grey sheet. Its text stays dark, and the HelloJio field turns white to stand out."><Frame fill={false} pageType="JioPlus" /></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Shown, hidden, and how it closes',
      description: 'The screen shows and hides the sheet: it slides up from the bottom and settles without a bounce, then slides back down. A drag down asks to close it, unless drag to close is turned off. A hidden sheet waits below the screen, out of the Tab order and hidden from screen readers.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Shown" description="Over a dimmed page, docked to the bottom."><Frame fill={false} /></ExampleCard>
        <ExampleCard title="Hidden" description="Below the screen; only the page shows."><Frame fill={false} scrim={false} visible={false} /></ExampleCard>
        <ExampleCard title="Drag to close off" description="A drag down does nothing; the X and the scrim still close it, so a stray drag can’t lose a half-typed question."><Frame fill={false} drag={false} /></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'Full width, filling or fitting the screen',
      description: 'The sheet spans its screen with 12 px of padding at the top, 8 px at the sides, and 32 px at the bottom, and puts 12 px between the items in its slot. It fills the screen’s height unless it fits its content.',
      body: <Anatomy legend={false} specimenWidth={360} marks={[
        { kind: 'size', target: SZ, side: 'right', label: 'both' },
        { kind: 'padding', target: SZ },
      ]}>
        <ModalSheet testID="ms-size" fillHeight={false} modes={LIGHT}>{sizeChat}</ModalSheet>
      </Anatomy>,
    },
    content: {
      header: 'Content', title: 'A title, a way out, and one task',
      description: 'Start the slot with an App Bar that holds a named close button, keep one task in the middle, and put the main field or action at the bottom. Keep it to one task; a new flow deserves its own screen.',
      body: <ExampleCard title="One task, with a way out"><Frame /></ExampleCard>,
    },
    context: {
      header: 'In context', title: 'Asking HelloJio from Home',
      description: 'Ask HelloJio opens the sheet over Home, and Home steps back behind it. Sending a question or pressing the X closes it; the screen keeps what was asked.',
      body: <div className="coin-new-context">
        <ScreenFrame receded={ctxProgress} footer={
          <ModalSheet visible={ctxShown} fillHeight showOverlay onOverlayPress={ctxHide} onRequestClose={ctxHide} presentationProgress={ctxProgress} modes={sheetModes('MainPage')}>
            {ctxChat}
          </ModalSheet>
        }><Screen open={() => setCtxShown(true)} /></ScreenFrame>
        <p className="coin-new-readout" role="status">{status}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Always a visible way out',
      description: 'Each pair shows a sheet people can leave and read versus one that traps or wastes their attention.',
      body: <div className="coin-new-stack">
        <DoDont goodTitle="Add a named close button" goodCaption="The X closes the sheet for everyone, including keyboard users." badTitle="Rely on dragging" badCaption="Without an X, people must drag, tap the scrim, or know to press Escape."
          good={<Frame fill={false} />} bad={<Frame fill={false} closeButton={false} />} />
        <DoDont goodTitle="Fit short content" goodCaption="A one-line sheet docks to the bottom." badTitle="Fill the screen for one line" badCaption="The sheet covers the page and leaves it empty."
          good={<Frame fill={false} field={false} />} bad={<Frame field={false} />} />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Modal Sheet contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="13 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('modalsheet')} stories={[
        { label: 'Default', id: 'components-modalsheet--default' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (12 October build) from the team’s private package repository. Figma’s Modal Sheet is one 360 × 728 white surface with one slot. In the package it renders in place until it’s given <code>visible</code>; then it slides over its screen with an optional scrim and can be dragged down. It puts its 12 px gap between the slot’s items, and a top inset shortens the sheet so its bottom stays on the screen. On the web it’s a dialog and a hidden sheet leaves the Tab order, but focus isn’t moved into it, kept in it, or returned, and Escape doesn’t close it from a text field (#234). Page type JioPlus turns it light grey and stays off its slot, except the App Bar: text stays dark, and the HelloJio Input turns white to show on the grey. Turning the drag off leaves the X and the scrim. The examples host the sheet as the Storybook story does: on a black screen whose page steps back with the sheet, through the package’s page-stack hook (the screen’s job, not the sheet’s). The screen’s corners are rounder than the sheet’s, like a phone’s. The published Docs page is still the old generated one. The slide runs the package’s own spring settings, as in Storybook.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'modalsheet',
    corePrinciple: 'A page over the page, with a clear way to close it.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('modalsheet'),
  }} playground={<>
    <div className="preview-stage">
      <ScreenFrame receded={progress} footer={
        <ModalSheet visible={shown} fillHeight={fill} showOverlay={scrim} enableDismissGesture={drag} onOverlayPress={hide} onRequestClose={hide} presentationProgress={progress} modes={sheetModes(pageType)}>
          {playChat}
        </ModalSheet>
      }><Screen open={() => setShown(true)} /></ScreenFrame>
      <span className="stage-label">Live Coin Modal Sheet</span>
    </div>
    <div className="controls-panel">
      <OnOff label="Shown" value={shown} onChange={setShown} />
      <Segment label="Height" value={height} options={['Fill', 'Fit content'] as const} onChange={setHeight} />
      <OnOff label="Scrim" value={scrim} onChange={setScrim} />
      <Segment label="Page type" value={pageType} options={['MainPage', 'SubPage', 'JioPlus'] as const} onChange={setPageType} />
      <OnOff label="Drag to close" value={drag} onChange={setDrag} />
      <Readout title="Sheet" value={shown ? 'Shown' : 'Hidden'}>{drag
        ? 'Close it with the X, a tap on the dimmed screen, or a drag down. Each one asks the screen to hide it.'
        : 'A drag down does nothing now. Close it with the X or a tap on the dimmed screen.'}</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'modalsheet',
  label: 'Modal Sheet',
  summary: 'Use a Modal Sheet for a task that slides up over the page, such as asking HelloJio, and goes away when it’s done.',
  keywords: ['page sheet', 'modal', 'sheet', 'overlay page', 'HelloJio sheet'],
  icon: <><rect x="4" y="1.5" width="10" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M4 7c0-1.1.9-2 2-2h6a2 2 0 0 1 2 2" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M7 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>,
  Component: ModalSheetGuide,
})
