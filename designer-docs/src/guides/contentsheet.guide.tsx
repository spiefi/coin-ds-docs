import { useState, type ReactNode } from 'react'
import { Button, ContentSheet, ListGroup, ListItem, MoneyValue, Overlay, Text, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, ScreenFrame, Segment, Sources, byTestId, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4451-1760'
const LIGHT = { 'Color Mode': 'Light' } as Modes
const SHEET = { 'Color Mode': 'Light', 'List Item Style': 'Boxed' } as Modes
const noop = () => {}

const TX = [
  { title: 'Netflix', support: '25 March · 17:30', value: '500' },
  { title: 'Spotify', support: '24 March · 09:12', value: '119' },
  { title: 'Amazon', support: '22 March · 21:04', value: '1,299' },
]
const PAY = [
  { title: 'UPI', support: 'Jio Payments Bank •• 4821' },
  { title: 'Debit card', support: '•• 9012' },
  { title: 'Net banking', support: 'Any bank' },
]

function TxRows({ count }: { count: number }) {
  return <ListGroup modes={SHEET}>{TX.slice(0, count).map(row => (
    <ListItem key={row.title} layout="Horizontal" title={row.title} supportText={row.support} trailing={<MoneyValue value={row.value} currency="₹" modes={SHEET} />} onPress={noop} modes={SHEET} />
  ))}</ListGroup>
}

function PayRows({ onChoose = noop }: { onChoose?: (method: string) => void }) {
  return <ListGroup modes={SHEET}>{PAY.map(row => (
    <ListItem key={row.title} layout="Horizontal" title={row.title} supportText={row.support} onPress={() => onChoose(row.title)} modes={SHEET} />
  ))}</ListGroup>
}

function Frame({ scrim = true, visible, title, style, screen, children }: {
  scrim?: boolean; visible?: boolean; title?: string; style?: object; screen?: ReactNode; children: ReactNode
}) {
  return <ScreenFrame footer={<>
    {scrim && <Overlay modes={LIGHT} onPress={noop} />}
    <ContentSheet visible={visible} title={title} style={style} modes={SHEET}>{children}</ContentSheet>
  </>}>{screen ?? <Text modes={LIGHT}>March spends</Text>}</ScreenFrame>
}

function ContentSheetGuide() {
  const [shown, setShown] = useState(true)
  const [title, setTitle] = useState(true)
  const [rows, setRows] = useState<'1' | '2' | '3'>('3')
  const [scrim, setScrim] = useState(true)
  const [ctxShown, setCtxShown] = useState(true)
  const [method, setMethod] = useState('UPI')

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'One slot under an optional title',
      description: 'A white sheet with 20 px top corners holds one slot of content and an optional centred title. In a screen it docks to the bottom and spans the full width.',
      body: <Anatomy specimenWidth={360} parts={[
        { name: 'Title', note: 'Optional and centred; it scrolls with the content.', target: `${byTestId('cs-anatomy')} [dir="auto"]`, side: 'top' },
        { name: 'Slot', note: 'Any content; the sheet grows to fit it.', target: `${byTestId('cs-anatomy')} [role="list"]`, side: 'right' },
        { name: 'Sheet', note: 'White, with 20 px top corners and no handle.', target: byTestId('cs-anatomy'), side: 'left' },
      ]}>
        <ContentSheet testID="cs-anatomy" pinToBottom={false} title="March 2025" modes={SHEET}><TxRows count={2} /></ContentSheet>
      </Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'A title and one slot',
      description: 'Add a title when the content needs a name. The slot takes any content, and the sheet’s height follows it.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="With a title" description="The title names what the sheet holds."><Frame title="March 2025"><TxRows count={2} /></Frame></ExampleCard>
        <ExampleCard title="Without a title" description="The slot starts right under the top padding."><Frame><TxRows count={2} /></Frame></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Shown or hidden',
      description: 'The screen shows and hides the sheet: it springs up from the bottom and back down. A hidden sheet stays on the page, so Tab can still reach its content.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Shown" description="Over a dimmed screen, docked to the bottom."><Frame title="March 2025"><TxRows count={2} /></Frame></ExampleCard>
        <ExampleCard title="Hidden" description="Below the screen; only the screen shows."><Frame scrim={false} visible={false}><TxRows count={2} /></Frame></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'Full width, as tall as its content',
      description: 'The sheet spans its screen and adds 12 px above and 41 px below the content. It never sets a height: it grows with the content up to 70% of the screen, then scrolls.',
      body: <Anatomy legend={false} specimenWidth={360} marks={[
        { kind: 'size', target: byTestId('cs-size'), side: 'right', label: 'both' },
        { kind: 'padding', target: byTestId('cs-size') },
      ]}>
        <ContentSheet testID="cs-size" pinToBottom={false} title="March 2025" modes={SHEET}><TxRows count={3} /></ContentSheet>
      </Anatomy>,
    },
    content: {
      header: 'Content', title: 'Name it, and keep it to one task',
      description: 'Title the sheet with what it holds, such as a month or a choice, in a few words. Keep the content short enough to read without scrolling; longer content deserves its own screen.',
      body: <ExampleCard title="One task, named"><Frame title="Pay with" screen={<Text modes={LIGHT}>Pay ₹500 to Asha Stores</Text>}><PayRows /></Frame></ExampleCard>,
    },
    context: {
      header: 'In context', title: 'Choosing how to pay',
      description: 'The payment screen opens the sheet from Change payment method. Choosing an option, or tapping the dimmed screen, closes it; the screen keeps the choice.',
      body: <div className="coin-new-context">
        <ScreenFrame footer={<>
          {ctxShown && <Overlay modes={LIGHT} onPress={() => setCtxShown(false)} />}
          <ContentSheet visible={ctxShown} title="Pay with" modes={SHEET}><PayRows onChoose={m => { setMethod(m); setCtxShown(false) }} /></ContentSheet>
        </>}>
          <Text modes={LIGHT}>Pay ₹500 to Asha Stores</Text>
          <Button label="Change payment method" onPress={() => setCtxShown(true)} modes={LIGHT} />
        </ScreenFrame>
        <p className="coin-new-readout" role="status">Paying with {method}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Make the sheet stand out and fit',
      description: 'Each pair shows a sheet people can read at a glance versus one that blends in or wastes space.',
      body: <div className="coin-new-stack">
        <DoDont goodTitle="Dim the screen behind it" goodCaption="The white sheet stands out from the page." badTitle="Leave it on a white screen" badCaption="Without a scrim, the sheet’s edge disappears."
          good={<Frame title="March 2025"><TxRows count={2} /></Frame>} bad={<Frame scrim={false} title="March 2025"><TxRows count={2} /></Frame>} />
        <DoDont goodTitle="Let it fit the content" goodCaption="One row makes a short sheet." badTitle="Set a fixed height" badCaption="Empty space fills the sheet under one row."
          good={<Frame title="March 2025"><TxRows count={1} /></Frame>} bad={<Frame title="March 2025" style={{ height: 280 }}><TxRows count={1} /></Frame>} />
        <DoDont goodTitle="Name the choice" goodCaption="“Pay with” says what the options are for." badTitle="Leave options untitled" badCaption="People can’t tell what they’re choosing."
          good={<Frame title="Pay with"><PayRows /></Frame>} bad={<Frame><PayRows /></Frame>} />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Content Sheet contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="6 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('contentsheet')} stories={[
        { label: 'Default', id: 'components-contentsheet--default' },
        { label: 'With title', id: 'components-contentsheet--with-title' },
        { label: 'Rich content', id: 'components-contentsheet--rich-content' },
        { label: 'Bottom pop-up', id: 'components-contentsheet--bottom-pop-up' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> from the team’s private package repository. Figma’s Content Sheet is one 360 × 350 component with a fixed header and a slot. In the package the title scrolls with the content, and the 8 px gap between the title and the slot is missing. The sheet has no role, scrim, or close control of its own, and a hidden sheet can still be reached with Tab. Its 70% height limit is measured against the browser window, and on this site its spring overshoots slightly because the site uses a simplified animation library.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'contentsheet',
    corePrinciple: 'It grows to fit its content; the screen decides when it shows.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('contentsheet'),
  }} playground={<>
    <div className="preview-stage">
      <ScreenFrame footer={<>
        {scrim && shown && <Overlay modes={LIGHT} onPress={() => setShown(false)} />}
        <ContentSheet visible={shown} title={title ? 'March 2025' : undefined} modes={SHEET}><TxRows count={Number(rows)} /></ContentSheet>
      </>}>
        <Button label="Show transactions" onPress={() => setShown(true)} modes={LIGHT} />
      </ScreenFrame>
      <span className="stage-label">Live Coin Content Sheet</span>
    </div>
    <div className="controls-panel">
      <OnOff label="Shown" value={shown} onChange={setShown} />
      <OnOff label="Title" value={title} onChange={setTitle} />
      <Segment label="Rows" value={rows} options={['1', '2', '3'] as const} onChange={setRows} />
      <OnOff label="Scrim" value={scrim} onChange={setScrim} />
      <Readout title="Sheet" value={shown ? 'Shown' : 'Hidden'}>Tap the dimmed screen to hide it. The screen shows and hides the sheet; it has no close control of its own.</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'contentsheet',
  label: 'Content Sheet',
  summary: 'Use a Content Sheet to show a short panel from the bottom of the screen, such as a month’s transactions or a payment choice.',
  keywords: ['bottom sheet', 'bottom pop-up', 'action sheet', 'panel'],
  icon: <><rect x="4" y="1.5" width="10" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M4 10.5c0-1.1.9-2 2-2h6a2 2 0 0 1 2 2" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M7 12.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>,
  Component: ContentSheetGuide,
})
