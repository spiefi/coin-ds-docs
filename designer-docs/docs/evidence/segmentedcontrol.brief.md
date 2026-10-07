# Segmented Control brief

slug: segmentedcontrol · label: Segmented Control · public API: SegmentedControl (+ VStack, Card, MoneyValue, Text for hosting and composition)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2994-2578 · storybook: docsUrl('segmentedcontrol') · stories: Default=components-segmentedcontrol--default, Two segments=components-segmentedcontrol--two-segments, Interactive=components-segmentedcontrol--interactive
checked: 7 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-3795b4c; Biscuit's main 636f3f5 does not change it)
icon: a pill with its right segment filled — `<><rect x="1.5" y="5" width="15" height="8" rx="4" stroke="currentColor" strokeWidth="1.5" /><rect x="10" y="7" width="4.5" height="4" rx="2" fill="currentColor" /></>`
keywords: segmented button, toggle group, period switcher, button group

Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`; `const NEUTRAL = { 'Color Mode': 'Light', AppearanceBrand: 'Neutral' } as Modes`. Every Coin instance gets `modes={LIGHT}` unless stated.
Items: `PERIOD = [{ key: 'daily', label: 'Daily' }, { key: 'weekly', label: 'Weekly' }, { key: 'monthly', label: 'Monthly' }]`; `TRADE = [{ key: 'buy', label: 'Buy' }, { key: 'sell', label: 'Sell' }]`; `RANGE = ['1M', '3M', '6M', '1Y', 'All'].map(label => ({ key: label, label }))`; `PLANS = [{ key: 'once', label: 'One-time payment' }, { key: 'sip', label: 'Monthly SIP' }, { key: 'stepup', label: 'Step-up SIP' }]`; `DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(label => ({ key: label, label }))`.
The track is lavender, so every example sits on white: "Host" = `<Surface width="wide"><VStack modes={LIGHT} style={{ width: '100%', padding: 0 }}>{children}</VStack></Surface>` (`width="narrow"` where stated). Anatomy and Sizing use `surface="white"`. The component takes no `testID`: target `[role="tablist"]` and `[role="tab"]:nth-child(n)`. Examples are uncontrolled (`defaultSelectedKey`) unless stated, so they respond to taps.

## Overview
summary: Use a Segmented Control to switch between two to five short, exclusive options, such as Daily, Weekly and Monthly.
principle: One choice from a short set, always in view.
playground: `.preview-stage` › Host (`wide` or `narrow` from the Width control) › `<SegmentedControl items={set} selectedKey={selected} onSelectionChange={setSelected} />`. Controls: Segment "Options" `2 | 3 | 5` → TRADE / PERIOD / RANGE (default 3; changing it selects the set's first key); Segment "Width" `Wide | Narrow` (default Wide). Readout title "Selected", value = the selected label; note: "Segments share the width equally. The screen updates whatever the choice controls." Stage label: "Live Coin Segmented Control".

## Anatomy
header: Anatomy · title: A track of equal segments · description: A lavender track holds the options side by side. The selected one fills purple with a white label; the others are labels on the track.
specimen: `<Anatomy surface="white" specimenWidth={328} …><SegmentedControl items={PERIOD} defaultSelectedKey="monthly" modes={LIGHT} /></Anatomy>`
parts:
1. Track — Lavender pill that holds the segments and fills its container. — target: `[role="tablist"]` — side: bottom — at: 0.15
2. Segment — An option people can tap; its label sits on the track. — target: `[role="tab"]:nth-child(1)` — side: left
3. Label — One or two short words, centred. — target: `[role="tab"]:nth-child(2) [dir="auto"]` — side: top
4. Selected segment — Purple fill and a white label mark the current choice. — target: `[role="tab"]:nth-child(3)` — side: right

## Configuration
header: Configuration · title: Two to five options · description: Set the options and the one that starts selected. Every segment gets the same width, so the number of options decides how much room each label has.
Grid `coin-new-example-grid` (two columns, so each track keeps a phone’s width), each a Host:
- Two options — `items={TRADE} defaultSelectedKey="buy"` — lesson: Opposites, such as Buy and Sell, each take half the track.
- Three options — `items={PERIOD} defaultSelectedKey="weekly"` — lesson: The usual case: a period or a view with three choices.
- Five options — `items={RANGE} defaultSelectedKey="1Y"` — lesson: Five is the most that fits: on a 360 px phone each segment is about 59 px.

## States
header: States · title: Selected, unselected, and pressed · description: One segment is always selected. A pressed segment dims until release, then becomes the selection. There is no disabled or loading state.
One ExampleCard "Tap to choose" (description: "The purple fill moves to the segment you tap; Enter does the same from the keyboard.") › Host › `<SegmentedControl items={PERIOD} defaultSelectedKey="weekly" />`.

## Sizing
header: Sizing · title: Full width, 43 px tall, equal segments · description: The track fills its container and splits it equally, with 8 px between segments and no padding of its own. Each segment is 43 px tall: 12 px above and below a 19 px label. In a row, the track shrinks to fit its labels.
Measured diagram: `<Anatomy legend={false} surface="white" specimenWidth={328} marks={[{ kind: 'size', target: '[role="tab"]:nth-child(1)', side: 'bottom', label: 'both' }, { kind: 'gap', from: '[role="tab"]:nth-child(1)', to: '[role="tab"]:nth-child(2)' }, { kind: 'padding', target: '[role="tab"]:nth-child(3)' }]}>` › `<SegmentedControl items={PERIOD} defaultSelectedKey="monthly" />`. Expected 104 × 43 and an 8 px gap.
Then ExampleCard "In a narrow column" (description: "In a 216 px column each segment is about 67 px, and “Monthly” reaches the edge of the track. Leave room for the longest label.") › narrow Host › `items={PERIOD} defaultSelectedKey="daily"`.

## Content
header: Content · title: One or two words per option · description: Labels share the width equally and wrap instead of truncating, so keep them short and parallel: Daily, Weekly, Monthly. Use the words people see in the content below, and select the likeliest option first.
One ExampleCard "Short and parallel" › one Host holding, in order, `<SegmentedControl items={TRADE} defaultSelectedKey="buy" />` and `<SegmentedControl items={RANGE} defaultSelectedKey="1M" />` (VStack gap keeps them apart).

## In context
header: In context · title: Switching a portfolio’s period · description: The control sits above the numbers it changes. The screen keeps the selected period and updates the value below; the control only reports the tap.
Composition in `.coin-new-context`: `<Card modes={NEUTRAL}>` › `<Card.Title>Portfolio value</Card.Title>`, `<SegmentedControl items={PERIOD} selectedKey={period} onSelectionChange={k => setPeriod(String(k))} modes={NEUTRAL} />`, `<MoneyValue value="1,24,560" currency="₹" modes={NEUTRAL} />`, `<Text modes={NEUTRAL}>{CHANGE[period]}</Text>` with `CHANGE = { daily: '+₹1,180 (0.9%) today', weekly: '+₹3,020 (2.4%) this week', monthly: '+₹6,240 (5.1%) this month' }`. Starts on `weekly`. Below the card, `<p className="coin-new-readout" role="status">`: “Showing the daily change” / “weekly” / “monthly”.

## Do & Don'ts
header: Do & Don’ts · title: Keep every option readable · description: Each pair shows a control people can read at a glance versus one that breaks its own layout.
Every preview is a Host.
- Do Keep labels short: Each label fits on one line, so every segment is 43 px. — `items={PERIOD} defaultSelectedKey="daily"` | Don't Write long labels: “One-time payment” wraps to three lines and the segments end up different heights. — `items={PLANS} defaultSelectedKey="once"`
- Do Offer five options at most: Each label has room to breathe. — `items={RANGE} defaultSelectedKey="1M"` | Don't Squeeze in seven: Segments of about 39 px leave no room, and labels crowd together. — `items={DAYS} defaultSelectedKey="Mon"`
- Do Select one of the options: One segment is always filled, so people see the current view. — `items={PERIOD} selectedKey="weekly"` (controlled, with its own state) | Don't Pass a key that isn’t an option: Nothing is selected, and people can’t tell what they’re looking at. — `items={PERIOD} selectedKey="yearly"`

## Sources
header: Sources · title: Use the public Segmented Control contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> from the team’s private package repository. Figma’s Segmented Control is one 393 × 43 component whose slot holds the segments; the package matches its colours, its 43 px height, and its equal widths. On the web the segments are tabs, but the selected one is not announced, Space does not select (Enter does), and arrow keys do nothing. Dark mode shows the same colours as Light, so this page shows Light only. The published Storybook predates the current stories.

## Limits
Do not show Dark mode, `style`, icons, disabled segments, or more than five options outside the Don’t. Do not imply that selection is announced, that Space or arrow keys work, or that it switches panels like Tabs. Do not describe `onSelectionChange` as firing only on change (it also fires when the selected segment is pressed again).
