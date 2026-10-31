# Cluster Bubble brief

slug: clusterbubble · label: Cluster Bubble · public API: ClusterBubble (+ HStack, VStack for hosts; BubbleChart, BubbleDatum, Title for In context)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4920-12956 · storybook: docsUrl('clusterbubble') · stories: Default=components-clusterbubble--default, Label outside=components-clusterbubble--label-outside, Label directions=components-clusterbubble--label-directions, Appearances=components-clusterbubble--appearances, Emphasis=components-clusterbubble--emphasis, Pressable=components-clusterbubble--pressable
checked: 28 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-dbe0e02 = Biscuit’s main dbe0e02, 27 October)
icon: one circle with two lines inside — `<><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M6.5 8h5M7.5 11h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /></>`
keywords: bubble, data bubble, percentage circle, stat circle

Setup: `M = (m: Record<string, string> = {}) => ({ 'Color Mode': 'Light', ...m }) as Modes`; `LIGHT = M()`. “CL(props)” = `<ClusterBubble modes={LIGHT} value="40%" label="Recommended" {...props} />` (props may replace `modes`, `value`, `label`).
Outside text takes no layout space, so “ROOM(side, child)” = `<VStack modes={LIGHT} alignHorizontal="center" style={{ padding<Side>: side is top or bottom ? 64 : 104 }}>{child}</VStack>`: use it for every bubble whose text sits outside.
SMALL = `{ size: 64, value: '₹270K', label: 'Equity' }`.
Selectors (no testID; the root’s accessible name is “value, label”): `R(name) = [aria-label="${name}"]`; circle `C(name) = ${R(name)} > div > div:first-child`; inside value `${C} > div > :first-child`; inside label `${C} > div > :last-child`; outside text `O(name) = ${R(name)} > div > div:nth-child(2)`.

## Overview
summary: Use a Cluster Bubble to show one figure, such as a share or an amount, in a coloured data-viz circle with a short label.
principle: The number first, sized so people can read it.
playground: `.preview-stage` › CL({ size, labelPlacement: placement, modes: M({ 'Emphasis / DataViz': emphasis }) }), wrapped in ROOM('bottom', …) whenever the text sits outside (placement outside, or auto with size under 88). Stage label "Live Coin Cluster Bubble". Controls: Segment "size" `64 | 88 | 120 | 200` (120); Segment "labelPlacement" `auto | inside | outside` (auto); Segment "Emphasis / DataViz" `High | Medium | Low` (High). Readout title "Text", value “Inside: 120 px is 88 or more” / “Outside: 64 px is under 88” (auto, with the size), “Inside, as set”, “Outside, as set”.

## Anatomy
header: Anatomy · title: A circle with a value and a label · description: The value sits over its label in the middle of the circle. Below 88 px the two move outside, where there’s room to read them.
specimen: `<Anatomy parts={…}>` › CL({ size: 159 }) (Figma’s size). Let N = '40%, Recommended'.
parts:
1. Circle — size sets it; appearance and Emphasis / DataViz colour it. — target: C(N) — side: left
2. Value — value in bold; inside the circle it grows with the size. — target: inside value of C(N) — side: top
3. Label — label under the value, up to two lines. — target: inside label of C(N) — side: right

## Configuration
header: Configuration · title: Colour, then where the text goes · description: appearance picks one of seven data-viz colours, and the Emphasis / DataViz mode how strong it is; without appearance, the Appearance / DataViz mode picks the colour. labelPlacement auto puts the text inside bubbles of 88 px or more and outside smaller ones, and labelDirection picks the side. The Text Appearance mode colours outside text.
Body `coin-new-stack`:
1. ExampleCard "appearance" (description "Primary, Secondary, Tertiary, Quaternary, Quinary, Senary, and Neutral.") › `<HStack modes={LIGHT} wrap justifyHorizontal="center" style={{ width: '100%' }}>` of seven `<ClusterBubble key={name} modes={LIGHT} value="40%" label={name} size={88} appearance={name} />` (keys on the bubbles: HStack unwraps Fragments).
2. Grid `coin-new-example-grid three`, Primary:
- Emphasis High — CL({}) — lesson: The full colour.
- Emphasis Medium — CL({ modes: M({ 'Emphasis / DataViz': 'Medium' }) }) — lesson: Lighter, with black text.
- Emphasis Low — CL({ modes: M({ 'Emphasis / DataViz': 'Low' }) }) — lesson: Palest, for the least important.
3. Grid `coin-new-example-grid` (2 × 2):
- auto, small — ROOM('bottom', CL(SMALL)) — lesson: At 64 px the text goes outside.
- inside — CL({ size: 64, value: '₹2', label: 'Min', labelPlacement: 'inside' }) — lesson: Forced inside, the text shrinks to 13 and 10 px.
- outside — ROOM('bottom', CL({ size: 140, labelPlacement: 'outside' })) — lesson: Forced outside, even on a big bubble.
- Text Appearance — ROOM('bottom', CL({ ...SMALL, modes: M({ 'Text Appearance': 'Secondary' }) })) — lesson: Outside text in purple.
4. Grid `coin-new-example-grid` (2 × 2), each ROOM(direction, CL({ ...SMALL, labelPlacement: 'outside', labelDirection: direction }))): top, right, bottom, left — lessons: “Above the circle.”, “To the right.”, “Below: the default.”, “To the left.”

## States
header: States · title: Pressable, with no selected look · description: Give onPress and the bubble becomes a button that dims a little while it’s pressed. It has no selected or disabled look, so show what people picked somewhere else on the screen.
Grid `coin-new-example-grid`:
- Not pressable — CL({}) — lesson: Without onPress it’s an image, read out as “40%, Recommended”.
- onPress — CL({ onPress: () => setPresses(n + 1) }), then `<p className="coin-new-readout" role="status">` “Not pressed yet” / “Pressed 1 time” / “Pressed n times” — lesson: Press it: it dims, then counts.

## Sizing
header: Sizing · title: The size sets the text inside · description: size is the circle’s diameter: 120 px by default, where Figma draws 159. Inside, the value is 17 % of the size and the label 8.5 %, between 13 and 48 px and between 10 and 18 px, so 20 and 10 px at 120. Outside text is 24 and 14 px at any size, labelGap (8 px) from the circle, and takes no space, so leave room for it.
Body: `<Anatomy legend={false} marks={[{ kind: 'size', target: C('40%, Recommended'), side: 'top', label: 'both' }, { kind: 'size', target: C('₹270K, Equity'), side: 'top', label: 'both' }, { kind: 'gap', from: C('₹270K, Equity'), to: O('₹270K, Equity') }]}>` › `<SpecimenRow>` › `<Specimen caption="Inside, 120 px">` CL({}) · `<Specimen caption="Outside, 64 px">` ROOM('bottom', CL(SMALL)). Expected 120 × 120, 64 × 64, gap 8; report the measured values.

## Content
header: Content · title: A figure and a word or two · description: Make value the figure people compare, such as 40% or ₹270K, and label what it’s for in a word or two. Inside the circle each line stops at two lines and ends in an ellipsis, and text wider than the circle runs into its edge.
Grid `coin-new-example-grid`:
- Short — CL({ label: 'Equity' }) — lesson: Room to spare at 120 px.
- Too long — CL({ size: 88, value: '₹12,45,000', label: 'Large and mid cap funds' }) — lesson: The value fills the circle edge to edge, and the label wraps.

## In context
header: In context · title: Inside a Bubble Chart · description: Bubble Chart lays out one Cluster Bubble per item and sizes each by its share, so use it for a split of several parts and a single Cluster Bubble for one figure. Each item’s display text, label, and appearance become its bubble’s value, label, and colour.
Composition: `.coin-new-context` › `<VStack modes={{ Background: 'True', Padding: 'None', 'Slot gap': 'XS' } as Modes}>` › `<Title title="Your portfolio" subtitle="₹4.2L invested · 3 asset classes" />`, `<VStack modes={{ 'Stack Context': 'Nested', Padding: 'Default', 'Slot gap': 'M' } as Modes}>` › `<BubbleChart data={SPLIT3} accessibilityLabel="Portfolio split by asset class" />`. SPLIT3 = `{ id, value, display: `${value}%`, label }` for Equity 60, Debt 30, Gold 10 (as the Bubble Chart guide).

## Do & Don'ts
header: Do & Don’ts · title: The right colour, readable text · description: Each pair shows a bubble that reads as intended next to one that quietly goes wrong.
- Do An appearance from the list: “Secondary” gives magenta. — CL({ appearance: 'Secondary', label: 'Secondary' }) | Don't A misspelt appearance: appearance takes any text, so “secondary” falls back to Primary purple. — CL({ appearance: 'secondary', label: 'secondary' })
- Do Outside text on a small bubble: At 64 px the figure sits below, readable. — ROOM('bottom', CL(SMALL)) | Don't Inside text on a tiny bubble: At 32 px the value spills over the rim. — CL({ size: 32, value: '2%', label: undefined, labelPlacement: 'inside' })

## Sources
header: Sources · title: Use the public Cluster Bubble contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (27 October build of Biscuit’s main) from the team’s private package repository. Figma’s clusterBubble has <code>Property 1</code>: Default, a 159 px circle with 20 px white text, and Freeform, a 33 px dot with black text beside it and a slot. The package has <code>labelPlacement</code> instead. It defaults to 120 px and scales the inside text with the circle, at weight 700 with no gap, and it centres outside text on one side, outside its layout. <code>appearance</code> takes any text and falls back to Primary when it doesn’t match (reported).

## Limits
Don't show or mention Color Mode or dark mode. Don't show `color`, `insideTextColor`, the style props, `autoInsideMinSize`, Page type, or `disableTruncation`. Don't imply the bubble has a selected look or a slot, or that outside text takes space.
