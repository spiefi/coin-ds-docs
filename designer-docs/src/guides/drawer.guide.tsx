import { useState, type ReactNode } from 'react'
import { useWindowDimensions } from 'react-native'
import { Button, Drawer, ListGroup, ListItem, MoneyValue, Text, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, ScreenFrame, Segment, Sources, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const LIGHT = { 'Color Mode': 'Light' } as Modes
const ROWS = { 'Color Mode': 'Light', 'List Item Style': 'Boxed' } as Modes
const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2847-3454'

const TX = [
  { title: 'Netflix', support: '25 March · 17:30', value: '500' },
  { title: 'Spotify', support: '24 March · 09:12', value: '119' },
  { title: 'Amazon', support: '22 March · 21:04', value: '1,299' },
  { title: 'Swiggy', support: '21 March · 20:41', value: '386' },
  { title: 'Uber', support: '20 March · 08:15', value: '212' },
  { title: 'BigBasket', support: '18 March · 11:02', value: '1,054' },
]

const HANDLE = '[role="dialog"] div[style*="width: 42px"]'
const TITLE = '[role="dialog"] [dir="auto"]'
const CONTENT = '[role="dialog"] [role="list"]'
const SHEET = '[role="dialog"]'

const FRAME = 318
function useFit(peek: number) {
  const { height: w } = useWindowDimensions()
  const top = Math.max(48, Math.ceil(w * 0.05))
  return { collapsedHeight: w - FRAME + peek, expandedRatio: 1 - top / w, sheetStyle: { height: FRAME - top } }
}

type DrawerState = 'collapsed' | 'expanded'

function Rows({ count = 6 }: { count?: number }) {
  return <ListGroup modes={ROWS}>
    {TX.slice(0, count).map(tx => <ListItem key={tx.title} layout="Horizontal" title={tx.title} supportText={tx.support} trailing={<MoneyValue value={tx.value} currency="₹" modes={ROWS} />} onPress={() => {}} modes={ROWS} />)}
  </ListGroup>
}

function Frame({ peek = 140, title = 'Recent transactions', count = 6, screen, initialState = 'collapsed', state, onStateChange, showOverlay, onOverlayPress }: {
  peek?: number; title?: string | null; count?: number; screen?: ReactNode; initialState?: DrawerState
  state?: DrawerState; onStateChange?: (s: DrawerState) => void; showOverlay?: boolean; onOverlayPress?: () => void
}) {
  const fit = useFit(peek)
  return <ScreenFrame footer={<Drawer modes={LIGHT} title={title ?? undefined} {...fit} initialState={initialState} state={state} onStateChange={onStateChange} showOverlay={showOverlay} onOverlayPress={onOverlayPress}><Rows count={count} /></Drawer>}>
    {screen ?? <Text modes={LIGHT}>Home</Text>}
  </ScreenFrame>
}

function Controlled({ peek = 140, screen, showOverlay, children }: { peek?: number; screen?: (open: () => void) => ReactNode; showOverlay?: boolean; children?: (state: DrawerState) => ReactNode }) {
  const [state, setState] = useState<DrawerState>('collapsed')
  return <>
    <Frame peek={peek} state={state} initialState={state} onStateChange={setState} showOverlay={showOverlay} onOverlayPress={() => setState('collapsed')} screen={screen?.(() => setState('expanded'))} />
    {children?.(state)}
  </>
}

function OpenScreen({ open }: { open: () => void }) {
  return <><Text modes={LIGHT}>Home</Text><VStack modes={LIGHT} alignHorizontal="center"><Button label="See all transactions" onPress={open} modes={LIGHT} /></VStack></>
}

function DrawerGuide() {
  const [state, setState] = useState<DrawerState>('collapsed')
  const [peek, setPeek] = useState<'100' | '140' | '200'>('140')
  const [scrim, setScrim] = useState(false)

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A handle, a title, and scrolling content',
      description: 'The grey sheet carries a drag handle and an optional title that stay put while the content scrolls. Collapsed, only its top peeks above the screen’s bottom edge.',
      body: <Anatomy specimenWidth={360} parts={[
        { name: 'Handle', note: 'Drag it, or the content, to resize; tapping does nothing.', target: HANDLE, side: 'top' },
        { name: 'Title', note: 'Optional; stays in place while the content scrolls.', target: TITLE, side: 'right' },
        { name: 'Content', note: 'Scrolls inside the sheet; give each item its own modes.', target: CONTENT, side: 'left' },
        { name: 'Sheet', note: 'Grey, with 12 px top corners and a soft shadow.', target: SHEET, side: 'bottom', at: 0.8 },
      ]}><Frame initialState="expanded" count={4} /></Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Peek, title, and scrim',
      description: 'Set how much of the drawer peeks when collapsed, so the title and the first item show. A scrim dims the screen while the drawer covers it.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Peek 140" description="The title and the first transaction show."><Frame peek={140} /></ExampleCard>
        <ExampleCard title="Peek 200" description="A taller peek shows two transactions."><Frame peek={200} /></ExampleCard>
        <ExampleCard title="Without a title" description="The content starts under the handle."><Frame peek={140} title={null} /></ExampleCard>
        <ExampleCard title="With a scrim" description="The screen dims behind the drawer and taps on it don’t get through."><Frame initialState="expanded" showOverlay /></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Collapsed or expanded',
      description: 'A Drawer has two sizes and moves between them with a spring when dragged. It never closes: collapsed is its smallest size.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Collapsed" description="The peek shows what’s inside and invites a drag."><Frame peek={140} initialState="collapsed" /></ExampleCard>
        <ExampleCard title="Expanded" description="The sheet rises to near the top; the list scrolls inside it."><Frame initialState="expanded" /></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'Full width, sized by the screen',
      description: 'The drawer spans the screen. Collapsed, it shows 200 px by default; expanded, it is 90% of the screen’s height, and never more than 95%. Here each drawer is fitted to its frame.',
      body: <Anatomy legend={false} specimenWidth={360} marks={[
        { kind: 'size', target: HANDLE, side: 'bottom', label: 'both' },
        { kind: 'gap', from: TITLE, to: CONTENT },
      ]}><Frame initialState="expanded" count={3} /></Anatomy>,
    },
    content: {
      header: 'Content', title: 'Name it, and lead with what matters',
      description: 'Title the drawer with what it holds. Collapsed, people see only the title and the first item or two, so put the most useful item first.',
      body: <ExampleCard title="The peek shows the first item"><Frame peek={140} /></ExampleCard>,
    },
    context: {
      header: 'In context', title: 'Recent transactions on a home screen',
      description: 'The drawer peeks under the home screen. It can only be resized by dragging, so the screen adds a button that opens it for keyboard and screen-reader users.',
      body: <div className="coin-new-context"><Controlled screen={open => <OpenScreen open={open} />}>
        {s => <p className="coin-new-readout" role="status">{s === 'expanded' ? 'Drawer expanded' : 'Drawer collapsed'}</p>}
      </Controlled></div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Show enough, and offer another way in',
      description: 'Each pair shows a drawer people understand and can open versus one that hides its content or its controls.',
      body: <div className="coin-new-stack">
        <DoDont good={<Frame peek={140} />} bad={<Frame peek={24} />} goodTitle="Peek enough to read" badTitle="Peek only the handle" goodCaption="The title and the first item say what’s inside." badCaption="People can’t tell what the drawer holds." />
        <DoDont good={<Controlled screen={open => <OpenScreen open={open} />} />} bad={<Frame />} goodTitle="Add a button that opens it" badTitle="Rely on dragging alone" goodCaption="Keyboard and screen-reader users can reach the content." badCaption="Without a button, only a drag opens it." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Drawer contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="6 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('drawer')} stories={[
        { label: 'Interactive', id: 'components-drawer--interactive-drawer' },
        { label: 'With overlay', id: 'components-drawer--with-overlay' },
        { label: 'With carousel', id: 'components-drawer--drawer-with-carousel' },
        { label: 'Programmatic control', id: 'components-drawer--programmatic-control' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> from the team’s private package repository. Figma’s Drawer is one 360 × 722 component with a fixed header and a scrolling content slot. The package places the drawer by the window’s height, so on this page each drawer is fitted to its frame through its peek and expanded height. It can be dragged with a mouse or a finger, but it has no keyboard control, no accessible name, and no way to close. Its content starts 8 px higher than in Figma. On this site drags spring slightly differently from Storybook because the site uses a simplified animation library.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'drawer',
    corePrinciple: 'Always there: a peek, or pulled up to read more.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('drawer'),
  }} playground={<>
    <div className="preview-stage">
      <Frame peek={Number(peek)} state={state} initialState={state} onStateChange={setState} showOverlay={scrim} onOverlayPress={() => setState('collapsed')} />
      <span className="stage-label">Live Coin Drawer</span>
    </div>
    <div className="controls-panel">
      <Segment label="State" value={state === 'expanded' ? 'Expanded' : 'Collapsed'} options={['Collapsed', 'Expanded'] as const} onChange={v => setState(v === 'Expanded' ? 'expanded' : 'collapsed')} />
      <Segment label="Peek" value={peek} options={['100', '140', '200'] as const} onChange={setPeek} />
      <OnOff label="Scrim" value={scrim} onChange={setScrim} />
      <Readout title="State" value={state === 'expanded' ? 'Expanded' : 'Collapsed'}>Drag the handle or the list to resize it. A Drawer never closes; its smallest size is the peek.</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'drawer',
  label: 'Drawer',
  summary: 'Use a Drawer for a panel that peeks from the bottom of a screen and drags up to show more, such as recent transactions.',
  keywords: ['bottom drawer', 'bottom sheet', 'draggable sheet', 'handle'],
  icon: <><rect x="4" y="1.5" width="10" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M4 8.5h10" stroke="currentColor" strokeWidth="1.5" /><path d="M7.5 10.5h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>,
  Component: DrawerGuide,
})
