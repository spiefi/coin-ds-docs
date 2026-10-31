import { useState } from 'react'
import { BubbleChart, Title, VStack, type BubbleDatum, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, Segment, Sources, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4920-12956'
const STORYBOOK = docsUrl('bubblechart')
const R = ':scope > div'
/** The chart's first child is its hidden label-measuring block, so bubble n is child n + 1. */
const B = (n: number) => `${R} > div:nth-child(${n + 1})`
const CIRCLE = (n: number) => `${B(n)} [role="img"] > div > div:first-child`
const VALUE = (n: number) => `${CIRCLE(n)} > div > div:first-child`
const CAPTION = (n: number) => `${CIRCLE(n)} > div > div:last-child`
const OUTSIDE = (n: number) => `${B(n)} [role="img"] > div > div:nth-child(2)`

const p = (id: string, value: number, label: string): BubbleDatum => ({ id, value, display: `${value}%`, label })
const SPLIT3: BubbleDatum[] = [p('equity', 60, 'Equity'), p('debt', 30, 'Debt'), p('gold', 10, 'Gold')]
const SPLIT4: BubbleDatum[] = [p('equity', 58, 'Equity'), p('debt', 24, 'Debt'), p('gold', 12, 'Gold'), p('cash', 6, 'Cash')]
const CLOSE: BubbleDatum[] = [p('equity', 60, 'Equity'), p('debt', 40, 'Debt')]
const MANY: BubbleDatum[] = [p('equity', 40, 'Equity'), p('debt', 18, 'Debt'), p('gold', 12, 'Gold'), p('cash', 9, 'Cash'), p('reit', 7, 'REIT'), p('bonds', 6, 'Bonds'), p('crypto', 5, 'Crypto'), p('other', 3, 'Other')]
const HIGHLIGHT: BubbleDatum[] = SPLIT3.map((d, i) => ({ ...d, appearance: i === 0 ? 'Primary' : 'Neutral' }))
const LONG: BubbleDatum[] = SPLIT3.map((d, i) => (i === 0 ? { ...d, label: 'Fixed deposits and government bonds' } : d))
const emph = (e: string) => ({ 'Emphasis / DataViz': e }) as Modes

type Placement = 'auto' | 'inside' | 'outside'
type Emphasis = 'High' | 'Medium' | 'Low'

function BubbleChartGuide() {
  const [placement, setPlacement] = useState<Placement>('auto')
  const [emphasis, setEmphasis] = useState<Emphasis>('High')
  const [pressable, setPressable] = useState(false)
  const [last, setLast] = useState('Nothing yet')
  const [pressed, setPressed] = useState('Nothing pressed')
  const [opened, setOpened] = useState('Press an asset class')

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'Bubbles, values, and captions',
      description: 'Each item is a bubble in the next data-viz colour. Big bubbles hold their value and caption; small ones put them outside, where there’s room.',
      body: <Anatomy specimenWidth={320} parts={[
        { name: 'Bubble', note: 'One circle per item; the largest value gets the largest bubble.', target: CIRCLE(2), side: 'left' },
        { name: 'Value', note: 'Your display text in bold; it grows with the bubble.', target: VALUE(1), side: 'top' },
        { name: 'Caption', note: 'Your label, up to two lines inside a bubble.', target: CAPTION(1), side: 'right' },
        { name: 'Outside label', note: 'Under 88 px, a bubble puts its value and caption outside.', target: OUTSIDE(3), side: 'top' },
      ]}>
        <BubbleChart data={SPLIT3} />
      </Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Where labels go, and how strong the colours are',
      description: 'labelPlacement puts every value and caption inside, outside, or, with auto, inside only bubbles big enough to hold them. Emphasis / DataViz sets one colour strength for the whole chart, and an item’s appearance picks its colour.',
      body: <div className="coin-new-stack">
        <div className="coin-new-example-grid three">
          <ExampleCard title="auto" description="The default: inside big bubbles, outside small ones."><BubbleChart data={SPLIT3} /></ExampleCard>
          <ExampleCard title="inside" description="Every label inside; small bubbles get small text."><BubbleChart data={SPLIT3} labelPlacement="inside" /></ExampleCard>
          <ExampleCard title="outside" description="Every label outside; the bubbles shrink to make room."><BubbleChart data={SPLIT3} labelPlacement="outside" /></ExampleCard>
        </div>
        <div className="coin-new-example-grid three">
          <ExampleCard title="Emphasis Medium" description="Paler fills for every bubble."><BubbleChart data={SPLIT3} modes={emph('Medium')} /></ExampleCard>
          <ExampleCard title="Emphasis Low" description="The palest fills, close to the page colour."><BubbleChart data={SPLIT3} modes={emph('Low')} /></ExampleCard>
          <ExampleCard title="Highlight one" description="Equity keeps Primary; the rest are Neutral."><BubbleChart data={HIGHLIGHT} /></ExampleCard>
        </div>
      </div>,
    },
    states: {
      header: 'States', title: 'Pressable, never selected',
      description: 'Bubbles are images by default. With onBubblePress each bubble becomes a button that dims while pressed and tells your screen which item it was; nothing stays selected.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Static" description="Each bubble is read as its value and caption."><BubbleChart data={SPLIT3} /></ExampleCard>
        <ExampleCard title="Pressable" description="Press a bubble: the screen gets the item.">
          <BubbleChart data={SPLIT3} onBubblePress={(d) => setPressed(`${d.label}, ${d.display}`)} />
          <p className="coin-new-readout" role="status">{pressed}</p>
        </ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'Sizes rank the items; the host sets the width',
      description: 'The chart fills its host’s width and picks a height for its bubbles. The smallest value always gets minBubbleSize (48 px) and the largest maxBubbleSize (170 px), so sizes show order, not exact shares. If the bubbles don’t fit, all of them shrink, as in this 320 px chart.',
      body: <div className="coin-new-stack">
        <Anatomy legend={false} specimenWidth={320} marks={[{ kind: 'size', target: R, side: 'bottom', label: 'both' }, { kind: 'size', target: CIRCLE(1), side: 'right', label: 'both' }]}>
          <BubbleChart data={SPLIT3} />
        </Anatomy>
        <div className="coin-new-example-grid">
          <ExampleCard title="48 to 170 px" description="The default range for the smallest and largest bubble."><BubbleChart data={SPLIT3} /></ExampleCard>
          <ExampleCard title="64 to 120 px" description="A narrower range: the same values look closer."><BubbleChart data={SPLIT3} minBubbleSize={64} maxBubbleSize={120} /></ExampleCard>
        </div>
      </div>,
    },
    content: {
      header: 'Content', title: 'Short numbers, one-word captions',
      description: 'Write each display as the number people compare, such as 58% or ₹2.4L, and each label as one or two words. Inside a bubble a caption stops at two lines, and a value wider than the circle is cut off.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Short and clear" description="A share and a one-word caption."><BubbleChart data={SPLIT3} labelPlacement="inside" /></ExampleCard>
        <ExampleCard title="A long caption" description="It stops at two lines."><BubbleChart data={LONG} labelPlacement="inside" /></ExampleCard>
      </div>,
    },
    context: {
      header: 'In context', title: 'A portfolio split by asset class',
      description: 'The portfolio screen passes each asset class’s share as display text and opens its holdings when a bubble is pressed. The chart only lays the bubbles out.',
      body: <div className="coin-new-context">
        <VStack modes={{ Background: 'True', Padding: 'None', 'Slot gap': 'XS' } as Modes}>
          <Title title="Your portfolio" subtitle="₹4.2L invested · 4 asset classes" />
          <VStack modes={{ 'Stack Context': 'Nested', Padding: 'Default', 'Slot gap': 'M' } as Modes}>
            <BubbleChart data={SPLIT4} accessibilityLabel="Portfolio split by asset class" onBubblePress={(d) => setOpened(`Opened ${d.label} holdings`)} />
          </VStack>
        </VStack>
        <p className="coin-new-readout" role="status">{opened}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'A few parts, a clear leader, room to breathe',
      description: 'Each pair shows a chart people read correctly next to one whose sizes or labels mislead.',
      body: <div className="coin-new-stack">
        <DoDont goodTitle="One clear leader" goodCaption="A large share and a few smaller parts read at a glance." good={<BubbleChart data={SPLIT3} />}
          badTitle="Two close values" badCaption="60% is drawn over three times as wide as 40%, so the gap looks far bigger." bad={<BubbleChart data={CLOSE} labelPlacement="inside" />} />
        <DoDont goodTitle="A few items" goodCaption="Four bubbles keep their labels clear." good={<BubbleChart data={SPLIT4} />}
          badTitle="Many small items" badCaption="Outside labels overlap bubbles or run off the edge." bad={<BubbleChart data={MANY} />} />
        <DoDont goodTitle="Let the height follow the data" goodCaption="The chart grows to fit its bubbles." good={<BubbleChart data={SPLIT4} />}
          badTitle="Fix a short height" badCaption="Bubbles shrink below 48 px and labels collide." bad={<BubbleChart data={SPLIT4} height={120} />} />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Bubble Chart contract',
      description: 'The guide compares the Figma cluster bubble with the installed package and its Storybook stories.',
      body: <Sources checked="28 October 2026" figmaUrl={FIGMA} storybookUrl={STORYBOOK} stories={[
        { label: 'Default', id: 'components-bubblechart--default' }, { label: 'Uniform', id: 'components-bubblechart--uniform' },
        { label: 'Skewed', id: 'components-bubblechart--skewed' }, { label: 'All labels outside', id: 'components-bubblechart--all-labels-outside' },
        { label: 'Constrained', id: 'components-bubblechart--constrained' }, { label: 'Wide pool', id: 'components-bubblechart--wide-pool' },
        { label: 'Pressable', id: 'components-bubblechart--pressable' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (27 October build) from the team’s private package repository. Figma has no Bubble Chart: the Coin Components Library has the Cluster Bubble that each bubble is, with its label inside (Default) or outside (Freeform). Figma’s bubble text is 20 px with a 10 px caption at weight 800; the package scales the inside text with the bubble and sets outside labels at 24 and 14 px, weight 700. Sizes run from the smallest to the largest value, not in proportion to them. Appearance / DataViz and Context in the chart’s modes change nothing. Page type and Text Appearance recolour outside labels, and inside text only where that colour stays readable on the bubble; otherwise inside text stays black or white. The guide doesn’t show them. Outside labels can be cut at the chart’s edge or overlap when there are many small bubbles. In Storybook every story’s bubbles are buttons, because Storybook adds onBubblePress to all of them.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'bubblechart', corePrinciple: 'The biggest part stands out; the numbers say how much.', figmaUrl: FIGMA, storybookUrl: STORYBOOK,
  }} playground={<>
    <div className="preview-stage">
      <BubbleChart data={SPLIT4} labelPlacement={placement} modes={emph(emphasis)} onBubblePress={pressable ? (d) => setLast(`${d.label}, ${d.display}`) : undefined} />
    </div>
    <div className="controls-panel">
      <Segment label="labelPlacement" value={placement} options={['auto', 'inside', 'outside'] as const} onChange={setPlacement} />
      <Segment label="Emphasis / DataViz" value={emphasis} options={['High', 'Medium', 'Low'] as const} onChange={setEmphasis} />
      <OnOff label="onBubblePress" value={pressable} onChange={(v) => { setPressable(v); setLast('Nothing yet') }} />
      <Readout title="Last pressed" value={pressable ? last : 'Bubbles aren’t pressable'}>There’s no selected look: your screen decides what a press does.</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'bubblechart',
  label: 'Bubble Chart',
  summary: 'Use a Bubble Chart to show how a few parts make up a whole, such as a portfolio split, as a cluster of labelled bubbles.',
  keywords: ['bubble cluster', 'packed bubbles', 'cluster bubble', 'allocation chart', 'portfolio split'],
  icon: <><circle cx="6.5" cy="9" r="4.5" stroke="currentColor" strokeWidth="1.5" fill="none" /><circle cx="13" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none" /><circle cx="13.5" cy="13" r="2.75" stroke="currentColor" strokeWidth="1.5" fill="none" /></>,
  Component: BubbleChartGuide,
})
