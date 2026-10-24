# Bubble Chart brief

slug: bubblechart · label: Bubble Chart · public API: BubbleChart, BubbleDatum (+ Title, VStack for In context)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4920-12956 (clusterBubble; Figma has no Bubble Chart) · storybook: docsUrl('bubblechart') · stories: Default=components-bubblechart--default, Uniform=components-bubblechart--uniform, Skewed=components-bubblechart--skewed, All labels outside=components-bubblechart--all-labels-outside, Constrained=components-bubblechart--constrained, Wide pool=components-bubblechart--wide-pool, Pressable=components-bubblechart--pressable
checked: 19 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-a116616; BubbleChart.tsx unchanged on Biscuit's main c7d3348)
icon: three packed circles of different sizes — `<><circle cx="6.5" cy="9" r="4.5" stroke="currentColor" strokeWidth="1.5" fill="none" /><circle cx="13" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none" /><circle cx="13.5" cy="13" r="2.75" stroke="currentColor" strokeWidth="1.5" fill="none" /></>`
keywords: bubble cluster, packed bubbles, cluster bubble, allocation chart, portfolio split

Setup (all `BubbleDatum[]`; `p(id, value, label)` = `{ id, value, display: `${value}%`, label }`):
`SPLIT3` = Equity 60, Debt 30, Gold 10 · `SPLIT4` = Equity 58, Debt 24, Gold 12, Cash 6 · `CLOSE` = Equity 60, Debt 40 · `MANY` = Equity 40, Debt 18, Gold 12, Cash 9, REIT 7, Bonds 6, Crypto 5, Other 3 · `HIGHLIGHT` = SPLIT3 with `appearance` Equity 'Primary', Debt 'Neutral', Gold 'Neutral' · `LONG` = SPLIT3 with Equity's label 'Fixed deposits and government bonds'.
`emph = (e: string) => ({ 'Emphasis / DataViz': e }) as Modes`. Pass no other modes. “C(data)” = `<BubbleChart data={data} />` plus any props listed. The chart fills its host's width.
Selectors (no testID; `R = ':scope > div'` is the chart, role img): bubble n (data order) `B(n) = ${R} > div:nth-child(n)`; circle `${B(n)} [role="img"] > div > div:first-child`; inside value `${circle(n)} > div > div:first-child`; inside caption `${circle(n)} > div > div:last-child`; outside label `${B(n)} [role="img"] > div > div:nth-child(2)`. These come from the source; confirm them with the browser test.

## Overview
summary: Use a Bubble Chart to show how a few parts make up a whole, such as a portfolio split, as a cluster of labelled bubbles.
principle: The biggest part stands out; the numbers say how much.
playground: `.preview-stage` › C(SPLIT4) with `labelPlacement={placement}`, `modes={emph(emphasis)}`, and `onBubblePress={pressable ? (d) => setLast(`${d.label}, ${d.display}`) : undefined}`. No stage label: at 390 px it sat on the Cash label. Controls: Segment "labelPlacement" `auto | inside | outside` (auto); Segment "Emphasis / DataViz" `High | Medium | Low` (High); OnOff "onBubblePress" (off). Readout title "Last pressed", value "Bubbles aren’t pressable" when off, "Nothing yet" when on until a press, then e.g. "Equity, 58%"; note "There’s no selected look: your screen decides what a press does."

## Anatomy
header: Anatomy · title: Bubbles, values, and captions · description: Each item is a bubble in the next data-viz colour. Big bubbles hold their value and caption; small ones put them outside, where there’s room.
specimen: `<Anatomy specimenWidth={320} …>` › C(SPLIT3).
parts (start with these sides; if the survey reports overlaps, move a pin’s `at` or side):
1. Bubble — One circle per item; the largest value gets the largest bubble. — target: circle(2) — side: left
2. Value — Your display text in bold; it grows with the bubble. — target: inside value(1) — side: top
3. Caption — Your label, up to two lines inside a bubble. — target: inside caption(1) — side: right
4. Outside label — Under 88 px, a bubble puts its value and caption outside. — target: outside label(3) — side: top

## Configuration
header: Configuration · title: Where labels go, and how strong the colours are · description: labelPlacement puts every value and caption inside, outside, or, with auto, inside only bubbles big enough to hold them. Emphasis / DataViz sets one colour strength for the whole chart, and an item’s appearance picks its colour.
First grid `three` of ExampleCards, each C(SPLIT3) plus:
- auto — "The default: inside big bubbles, outside small ones." — (nothing)
- inside — "Every label inside; small bubbles get small text." — `labelPlacement="inside"`
- outside — "Every label outside; the bubbles shrink to make room." — `labelPlacement="outside"`
Second grid `three`, each C(SPLIT3) plus:
- Emphasis Medium — "Paler fills for every bubble." — `modes={emph('Medium')}`
- Emphasis Low — "The palest fills, close to the page colour." — `modes={emph('Low')}`
- Highlight one — "Equity keeps Primary; the rest are Neutral." — C(HIGHLIGHT)

## States
header: States · title: Pressable, never selected · description: Bubbles are images by default. With onBubblePress each bubble becomes a button that dims while pressed and tells your screen which item it was; nothing stays selected.
Grid (two columns) of ExampleCards:
- Static — "Each bubble is read as its value and caption." — C(SPLIT3)
- Pressable — "Press a bubble: the screen gets the item." — C(SPLIT3) with `onBubblePress={(d) => setPressed(`${d.label}, ${d.display}`)}`; under the chart `<p className="coin-new-readout" role="status">{pressed}</p>`, starting “Nothing pressed”.

## Sizing
header: Sizing · title: Sizes rank the items; the host sets the width · description: The chart fills its host’s width and picks a height for its bubbles. The smallest value always gets minBubbleSize (48 px) and the largest maxBubbleSize (170 px), so sizes show order, not exact shares. If the bubbles don’t fit, all of them shrink, as in this 320 px chart.
Measured diagram: `<Anatomy legend={false} specimenWidth={320} marks={[{ kind: 'size', target: R, side: 'bottom', label: 'both' }, { kind: 'size', target: circle(1), side: 'right', label: 'both' }]}>` › C(SPLIT3).
Then a grid (two columns) of ExampleCards, each C(SPLIT3) plus:
- 48 to 170 px — "The default range for the smallest and largest bubble." — (nothing)
- 64 to 120 px — "A narrower range: the same values look closer." — `minBubbleSize={64} maxBubbleSize={120}`

## Content
header: Content · title: Short numbers, one-word captions · description: Write each display as the number people compare, such as 58% or ₹2.4L, and each label as one or two words. Inside a bubble a caption stops at two lines, and a value wider than the circle is cut off.
Grid (two columns) of ExampleCards, each with `labelPlacement="inside"`:
- Short and clear — "A share and a one-word caption." — C(SPLIT3)
- A long caption — "It stops at two lines." — C(LONG)

## In context
header: In context · title: A portfolio split by asset class · description: The portfolio screen passes each asset class’s share as display text and opens its holdings when a bubble is pressed. The chart only lays the bubbles out.
Composition in `.coin-new-context` › `<VStack modes={{ Background: 'True', Padding: 'None', 'Slot gap': 'XS' } as Modes}>` › `<Title title="Your portfolio" subtitle="₹4.2L invested · 4 asset classes" />` and an inner `<VStack modes={{ 'Stack Context': 'Nested', Padding: 'Default', 'Slot gap': 'M' } as Modes}>` › C(SPLIT4) with `accessibilityLabel="Portfolio split by asset class"` and `onBubblePress={(d) => setOpened(`Opened ${d.label} holdings`)}`. Below the outer stack, `<p className="coin-new-readout" role="status">{opened}</p>`, starting “Press an asset class”.

## Do & Don'ts
header: Do & Don’ts · title: A few parts, a clear leader, room to breathe · description: Each pair shows a chart people read correctly next to one whose sizes or labels mislead.
- Do One clear leader: A large share and a few smaller parts read at a glance. — C(SPLIT3) | Don't Two close values: 60% is drawn over three times as wide as 40%, so the gap looks far bigger. — C(CLOSE) with `labelPlacement="inside"` (so the lesson is the sizes, not a clipped label)
- Do A few items: Four bubbles keep their labels clear. — C(SPLIT4) | Don't Many small items: Outside labels overlap bubbles or run off the edge. — C(MANY)
- Do Let the height follow the data: The chart grows to fit its bubbles. — C(SPLIT4) | Don't Fix a short height: Bubbles shrink below 48 px and labels collide. — C(SPLIT4) with `height={120}`

## Sources
header: Sources · title: Use the public Bubble Chart contract · description: The guide compares the Figma cluster bubble with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (16 October build) from the team’s private package repository. Figma has no Bubble Chart: the Coin Components Library has the Cluster Bubble that each bubble is, with its label inside (Default) or outside (Freeform). Figma’s bubble text is 20 px with a 10 px caption at weight 800; the package scales the inside text with the bubble and sets outside labels at 24 and 14 px, weight 700. Sizes run from the smallest to the largest value, not in proportion to them. Appearance / DataViz and Context in the chart’s modes change nothing, and Page type and Text Appearance recolour only outside labels, so the guide doesn’t show them. Outside labels can be cut at the chart’s edge or overlap when there are many small bubbles. In Storybook every story’s bubbles are buttons, because Storybook adds onBubblePress to all of them.

## Limits
Do not show Color Mode, Page type, Text Appearance, Context, Appearance / DataViz in the chart’s modes, `color`, `iterations`, `labelGap`, `appearanceCycle`, or `style`. Do not imply that bubble area is proportional to the value, that bubbles never overlap or clip, that positions mean anything, or that there is a selected state, legend, tooltip, or animation.
