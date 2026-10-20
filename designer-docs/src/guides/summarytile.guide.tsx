import { useState, type ComponentProps, type ReactNode } from 'react'
import { Button, Card, IconButton, ListGroup, ListItem, MoneyValue, SummaryTile, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, Segment, Sources, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4116-6354'
const LIGHT = { 'Color Mode': 'Light' } as Modes
const TILE = { 'Color Mode': 'Light', AppearanceBrand: 'Secondary', 'Button / Size': 'S' } as Modes
const CARD = { 'Color Mode': 'Light', AppearanceBrand: 'Neutral' } as Modes
const noop = () => {}
const W = { maxWidth: 320 } as const

type TileProps = Partial<ComponentProps<typeof SummaryTile>>

const Btn = (label: string, onPress: () => void = noop) => <Button label={label} onPress={onPress} />

function ST(overrides: TileProps = {}) {
  const props = { title: 'Spending', description: 'Know your spending and savings', confidence: 'High', modes: TILE, style: W, children: Btn('Set budget'), ...overrides } as ComponentProps<typeof SummaryTile>
  return <SummaryTile {...props} />
}

const R = ':scope > div'
const SEL = {
  title: `${R} > div:first-child > div:first-child > [dir="auto"]`,
  meter: `${R} [role="img"][aria-label^="Strength"]`,
  description: `${R} > div:first-child > [dir="auto"]`,
  text: `${R} > div:first-child`,
  titleRow: `${R} > div:first-child > div:first-child`,
  action: `${R} > div:nth-child(2)`,
}

type Confidence = 'High' | 'Medium' | 'Low' | 'None' | 'null'
type Child = 'Button' | 'IconButton' | 'left out' | 'null'

function SummaryTileGuide() {
  const [confidence, setConfidence] = useState<Confidence>('High')
  const [child, setChild] = useState<Child>('Button')
  const [chevron, setChevron] = useState(false)
  const [pressable, setPressable] = useState(false)
  const [last, setLast] = useState('None')
  const [opened, setOpened] = useState(false)

  const CHILD: Record<Child, ReactNode> = {
    Button: Btn('Set budget', () => setLast('Set budget pressed')),
    IconButton: <IconButton iconName="ic_chevron_right" onPress={() => setLast('IconButton pressed')} />,
    'left out': undefined,
    null: null,
  }

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A title, a meter, a line, and an action',
      description: 'The tile is one row with no panel of its own: the title and its meter sit over a line of description, and the action sits at the end. The chevron, when chevron is on, follows the action.',
      body: <Anatomy specimenWidth={320} parts={[
        { name: 'Title', note: 'title: the block’s name, 16 px bold, on one line.', target: SEL.title, side: 'left' },
        { name: 'Meter', note: 'A StrengthIndicator from confidence; null removes it.', target: SEL.meter, side: 'top' },
        { name: 'Description', note: 'description: what the block holds, 12 px; it wraps.', target: SEL.description, side: 'bottom' },
        { name: 'Action', note: 'children: your Button, given the tile’s modes.', target: SEL.action, side: 'right' },
      ]}>{ST()}</Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'An action, a chevron, or neither',
      description: 'children holds the action. Left out, the tile shows a placeholder Button with no onPress, so pass your own Button or IconButton, or null for none. The tile passes its modes to whatever you put there, and your Button’s own modes win. Give the tile AppearanceBrand Secondary and Button / Size S, as every example here does, and your Button is purple and small, as Figma draws it. chevron adds a forward arrow at the end. AppearanceBrand, Emphasis, and Semantic Intent change only the action: the title, description, and meter keep their look.',
      body: <div className="coin-new-stack">
        <div className="coin-new-example-grid">
          <ExampleCard title="Your Button" description="A purple, size S Button from the tile’s modes.">{ST()}</ExampleCard>
          <ExampleCard title="IconButton" description="A round icon action instead of a label.">{ST({ title: 'Bills', description: '3 bills due this week', confidence: 'Low', children: <IconButton iconName="ic_chevron_right" onPress={noop} /> })}</ExampleCard>
          <ExampleCard title="Chevron" description="A forward arrow, with onPress on the whole row.">{ST({ title: 'Insights', description: 'This month’s breakdown', children: null, chevron: true, onPress: noop })}</ExampleCard>
          <ExampleCard title="No action" description="children and confidence set to null: only text.">{ST({ title: 'Bills', description: 'Manage scheduled payments', confidence: null, children: null })}</ExampleCard>
        </div>
        <div className="coin-new-example-grid">
          <ExampleCard title="Emphasis Medium" description="A light purple action.">{ST({ modes: { ...TILE, Emphasis: 'Medium' } as Modes })}</ExampleCard>
          <ExampleCard title="Emphasis Low" description="A text action.">{ST({ modes: { ...TILE, Emphasis: 'Low' } as Modes })}</ExampleCard>
          <ExampleCard title="AppearanceBrand Neutral" description="A dark grey action.">{ST({ modes: { ...TILE, AppearanceBrand: 'Neutral' } as Modes })}</ExampleCard>
          <ExampleCard title="Semantic Intent System" description="AppearanceSystem negative turns the action red.">{ST({ title: 'Bills', description: '2 bills are overdue', confidence: 'Low', children: Btn('Pay now'), modes: { ...TILE, 'Semantic Intent': 'System', AppearanceSystem: 'negative' } as Modes })}</ExampleCard>
        </div>
      </div>,
    },
    states: {
      header: 'States', title: 'Confidence, and a pressable row',
      description: 'confidence shows how much data stands behind the block: High lights three green bars, Medium two orange, Low one red, and None, the default, three grey. A number from 0 to 1 picks the nearest level. onPress makes the whole row one button that dims while pressed; it removes the placeholder Button, not one you pass. The tile has no disabled, selected, or loading state.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="High" description="Three green bars: enough data.">{ST({ confidence: 'High' })}</ExampleCard>
        <ExampleCard title="Medium" description="Two orange bars.">{ST({ confidence: 'Medium' })}</ExampleCard>
        <ExampleCard title="Low" description="One red bar.">{ST({ confidence: 'Low' })}</ExampleCard>
        <ExampleCard title="None" description="Three grey bars: no data yet.">{ST({ confidence: 'None' })}</ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'The host sets the width',
      description: 'The tile fills its host’s width and adds no padding, background, or border: the card or screen around it supplies them. Figma draws it at 280 px. The text takes the room the action leaves, so the description wraps onto more lines, and the title ends in … unless disableTruncation is set. The parts are 8 px apart, and the meter sits 4 px after the title.',
      body: <div className="coin-new-stack">
        <Anatomy legend={false} specimenWidth={320} marks={[
          { kind: 'size', target: R, side: 'bottom', label: 'both' },
          { kind: 'gap', from: SEL.text, to: SEL.action },
          { kind: 'gap', from: SEL.titleRow, to: SEL.description },
        ]}>{ST()}</Anatomy>
        <div className="coin-new-example-grid">
          <ExampleCard title="Narrow host" description="At 240 px the description wraps and the title is cut short."><div className="coin-new-host narrow">{ST({ style: undefined })}</div></ExampleCard>
          <ExampleCard title="Wide host" description="At 360 px it fits on one line."><div className="coin-new-host wide">{ST({ style: undefined })}</div></ExampleCard>
          <ExampleCard title="Long title" description="The title ends in … on one line.">{ST({ title: 'Spending across all your accounts' })}</ExampleCard>
          <ExampleCard title="disableTruncation" description="The title wraps, and the meter stays beside it.">{ST({ title: 'Spending across all your accounts', disableTruncation: true })}</ExampleCard>
        </div>
      </div>,
    },
    content: {
      header: 'Content', title: 'Name the block, say what’s in it, use a verb',
      description: 'Make the title the block’s name in a word or two, such as Spending, Bills, or Goals. The description says what the block holds in one short line; it never truncates, so a paragraph makes the row tall. Label the action with a verb for the block, such as Set budget, Pay bills, or Add goal.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Goals" description="“Goals”, what it tracks, and “Add goal”.">{ST({ title: 'Goals', description: 'Save for a trip to Goa', confidence: 'Medium', children: Btn('Add goal') })}</ExampleCard>
        <ExampleCard title="Bills" description="“Bills”, what’s due, and “Pay bills”.">{ST({ title: 'Bills', description: '3 bills due this week', confidence: 'Low', children: Btn('Pay bills') })}</ExampleCard>
      </div>,
    },
    context: {
      header: 'In context', title: 'Spending on the Money screen',
      description: 'The tile heads a card, and the list under it is the block it introduces. See all opens the screen’s own spending view through the Button’s onPress; the tile only lays out the row.',
      body: <div className="coin-new-context">
        <Card modes={CARD}>
          <VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes}>
            {ST({ style: undefined, description: 'Your top categories this month', children: Btn('See all', () => setOpened(true)) })}
            <ListGroup modes={LIGHT}>
              <ListItem layout="Horizontal" modes={LIGHT} navArrow={false} title="Food" supportText="12 orders" trailing={<MoneyValue value="6,240" currency="₹" modes={LIGHT} />} />
              <ListItem layout="Horizontal" modes={LIGHT} navArrow={false} title="Shopping" supportText="5 orders" trailing={<MoneyValue value="4,180" currency="₹" modes={LIGHT} />} />
              <ListItem layout="Horizontal" modes={LIGHT} navArrow={false} title="Travel" supportText="3 trips" trailing={<MoneyValue value="2,950" currency="₹" modes={LIGHT} />} />
            </ListGroup>
          </VStack>
        </Card>
        <p className="coin-new-readout" role="status">{opened ? 'Opened all spending' : 'Spending view not opened'}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'A quiet action, one press target, a real verb',
      description: 'Each pair shows a tile that reads as a header next to one that shouts, presses twice, or does nothing.',
      body: <div className="coin-new-stack">
        <DoDont good={ST()} bad={ST({ modes: LIGHT })} goodTitle="Modes on the tile" goodCaption="AppearanceBrand Secondary and Button / Size S make your Button match Figma." badTitle="A bare Button" badCaption="Without those modes it’s gold and size M, too loud for a header." />
        <DoDont good={ST({ title: 'Insights', description: 'This month’s breakdown', children: null, chevron: true, onPress: noop })} bad={ST({ title: 'Insights', description: 'This month’s breakdown', chevron: true, onPress: noop })} goodTitle="A chevron on a row that opens" goodCaption="onPress makes the whole row the one target." badTitle="A Button in a pressable row" badCaption="Both press, and the Button sits inside the row’s button." />
        <DoDont good={ST()} bad={ST({ children: undefined })} goodTitle="Your own Button" goodCaption="A verb that does something." badTitle="The placeholder" badCaption="Left out, children shows “Button”, which does nothing." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Summary Tile contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="20 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('summarytile')} stories={[
        { label: 'Default', id: 'components-summarytile--default' },
        { label: 'With chevron', id: 'components-summarytile--with-chevron' },
        { label: 'Pressable with chevron', id: 'components-summarytile--with-chevron-pressable' },
        { label: 'High confidence', id: 'components-summarytile--high-confidence' },
        { label: 'No indicator', id: 'components-summarytile--no-indicator' },
        { label: 'Custom action', id: 'components-summarytile--custom-action-button' },
        { label: 'Icon button action', id: 'components-summarytile--icon-button-action' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (19 October build of Biscuit’s main) from the team’s private package repository. Figma’s Summary Tile exposes only <code>chevron</code> and the action slot; the title, description, and confidence are overrides there. The package’s default action is a placeholder Button with no <code>onPress</code>, and a Button passed in <code>children</code> doesn’t get its purple, size S look, so these examples set AppearanceBrand Secondary and Button / Size S on the tile. The title’s line is 20 px (Figma 18), so a one-line tile is 44 px tall, not 42. <code>disableTruncation</code> affects only the title, and a tile without <code>onPress</code> isn’t announced by its title. The published Storybook still shows the older generated page (all reported).</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'summarytile',
    corePrinciple: 'Name the block, then offer one way in.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('summarytile'),
  }} playground={<>
    <div className="preview-stage">
      {ST({ confidence: confidence === 'null' ? null : confidence, children: CHILD[child], chevron, onPress: pressable ? () => setLast('Row pressed') : undefined })}
      <span className="stage-label">Live Coin Summary Tile</span>
    </div>
    <div className="controls-panel">
      <Segment label="confidence" value={confidence} options={['High', 'Medium', 'Low', 'None', 'null'] as const} onChange={setConfidence} />
      <Segment label="children" value={child} options={['Button', 'IconButton', 'left out', 'null'] as const} onChange={setChild} />
      <OnOff label="chevron" value={chevron} onChange={setChevron} />
      <OnOff label="onPress" value={pressable} onChange={setPressable} />
      <Readout title="Last press" value={last}>Left out, children shows a placeholder Button that does nothing; onPress removes it.</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'summarytile',
  label: 'Summary Tile',
  summary: 'Use a Summary Tile to head a dashboard block: a title with a confidence meter, one line about the block, and one action or a chevron.',
  keywords: ['section header', 'summary row', 'dashboard header', 'confidence meter', 'strength indicator'],
  icon: <><path d="M2 6.5h5M2 11h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /><path d="M8.75 7v-.5M10.25 7V5.5M11.75 7V4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /><rect x="11.5" y="9.5" width="5" height="3.5" rx="1.75" stroke="currentColor" strokeWidth="1.5" fill="none" /></>,
  Component: SummaryTileGuide,
})
