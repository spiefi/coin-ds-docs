# PDP Card brief

slug: pdpcccard · label: PDP Card · public API: PdpCcCard (Title and VStack for In context; the kit's FitWidth)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=5352-935 · storybook: docsUrl('pdpcccard') · stories: Default=components-pdpcccard--default, Single metric=components-pdpcccard--single-metric, Metrics without icons=components-pdpcccard--metrics-without-icons, Button hidden=components-pdpcccard--button-hidden, Pressable card=components-pdpcccard--pressable-card, Title truncation=components-pdpcccard--title-truncation
checked: 21 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-c7d3348; Biscuit's newer e60f8bd8 changes only the Storybook page)
icon: a card with a picture on top, a title line, and a rounded button — `<><rect x="2.5" y="2" width="13" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none" /><rect x="7" y="4.5" width="4" height="3" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none" /><path d="M5.5 10h7M7 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /></>`
keywords: product card, product detail, PDP, product summary, gold coin, PdpCcCard

Setup: `import coin from '../assets/gold-coin.png'` (the docs' own picture; the package ships none). `LIGHT = { 'Color Mode': 'Light' } as Modes`; `noop = () => {}`.
TWO = `[{ title: 'Weight', value: '5 g', caption: 'one coin', icon: 'ic_scale' }, { title: 'Price', value: '₹31,200', caption: 'incl. GST', icon: 'ic_rupee_coin' }]`; ONE = `[TWO[1]]`; THREE = `[{ title: 'Weight', value: '5 g', caption: 'one coin', icon: 'ic_scale' }, { title: 'Purity', value: '24K', caption: '99.9% pure', icon: 'ic_star' }, { title: 'Delivery', value: 'Free', caption: 'in 2 days', icon: 'ic_protection_locked' }]`; PLAIN = TWO without `icon`.
LONG = `'24K gold coin, 5 g, with a certificate of purity'`.
BASE = `{ imageSource: coin, imageWidth: 60, imageHeight: 60, title: '5 g gold coin', subtitle: '24K · 99.9% pure', metrics: TWO, buttonLabel: 'Add to cart', onButtonPress: noop, modes: LIGHT }`.
“PDP(overrides = {})” = `<PdpCcCard {...BASE} {...overrides} />` (overrides win; mode examples pass `modes: { ...LIGHT, … }`). The card is 344 px wide by default (Figma's width): leave `width` alone unless the example says otherwise.
Every PDP outside the two diagrams sits in the kit's `<FitWidth>` (playground, every ExampleCard, both sides of each Do & Don't, In context), so phones scale it instead of cutting it. The diagrams use no `specimenWidth`: Anatomy scales the 344 px card itself.
Selectors (no testID; the card isn't pressable): `R = ':scope > div'`; picture `${R} > div:nth-child(1) > div`; title `${R} > [role="heading"] > [dir="auto"]:first-child`; subtitle `${R} > [role="heading"] > [dir="auto"]:last-child`; metric `${R} > div:nth-child(3) > div:first-child > div:nth-child(2)` (its icon and value); metrics row `${R} > div:nth-child(3)`; action `${R} > button`; media slot `${R} > div:nth-child(1)`; heading `${R} > [role="heading"]`.

## Overview
summary: Use a PDP Card at the top of a product page: the product’s picture, name, two or three key facts, and one action.
principle: One product, its key facts, one action.
playground: `.preview-stage` › `<FitWidth>` › PDP({ metrics: count === '1' ? ONE : count === '3' ? THREE : TWO, showButton, buttonIcon: icon ? undefined : null, onButtonPress: () => setLast('Add to cart pressed') }). Stage label "Live Coin PDP Card". Controls: Segment "metrics" `1 | 2 | 3` (2); OnOff "showButton" (on); OnOff "buttonIcon" (on). Readout title "Last press", value "None" or "Add to cart pressed"; note: "Only the button presses. onPress would make the whole card one button instead."

## Anatomy
header: Anatomy · title: A centred stack on a white panel · description: The picture, the name and its subtitle, a row of facts, and one button sit centred on a white panel, 12 px apart.
specimen: `<Anatomy …>` › PDP().
parts:
1. Picture — imageSource, in an imageWidth × imageHeight box (100 × 60 by default). — target: picture — side: top
2. Title — title: 26 px heavy, on one line with an ellipsis. — target: title — side: left
3. Subtitle — subtitle: one qualifier, 14 px; it wraps. — target: subtitle — side: right
4. Metric — One metrics entry: its title, icon and value, and caption. — target: metric — side: left
5. Action — A small light purple Button from buttonLabel and buttonIcon. — target: action — side: bottom
6. Panel — A white panel with square corners, 344 px wide. — target: R — side: right, at 0.9

## Configuration
header: Configuration · title: Facts and the action · description: metrics takes one entry per fact: a title, a value, an optional caption, and an optional icon from the Coin icon set. Entries share the row in equal columns. The card makes its Button small, light purple, and Emphasis Medium, with a plus icon before the label: buttonIcon changes the icon, and null removes it. showButton false removes the button. On the card, AppearanceBrand changes the button and the metric icons, and Emphasis changes the button. media replaces the picture with your own component, and button replaces the Button.
Body: `<div className="coin-new-stack">` with two `coin-new-example-grid` grids (two columns), each card in `<FitWidth>`.
Grid 1:
- Two metrics — PDP() — lesson: Weight and price side by side, in equal columns.
- One metric — PDP({ metrics: ONE }) — lesson: A single fact takes the whole row.
- Three metrics — PDP({ metrics: THREE }) — lesson: Each fact gets a third of the width, so values stay short.
- Without icons — PDP({ metrics: PLAIN }) — lesson: Leave out icon for text-only facts.
Grid 2:
- No button — PDP({ showButton: false }) — lesson: The card ends at the facts, 44 px shorter.
- No button icon — PDP({ buttonIcon: null }) — lesson: buttonIcon null leaves the label on its own.
- AppearanceBrand Primary — PDP({ modes: { ...LIGHT, AppearanceBrand: 'Primary' } }) — lesson: A gold button and gold metric icons.
- Emphasis High — PDP({ modes: { ...LIGHT, Emphasis: 'High' } }) — lesson: A solid purple button.

## States
header: States · title: Its button acts, or the whole card does · description: The card isn’t pressable: its button is. onPress makes the whole card one button, named by its title. Use one or the other: a pressable card with its button puts a button inside a button. The card has no disabled, selected, or loading state.
Grid `coin-new-example-grid` (two columns), each in `<FitWidth>`:
- Button acts — PDP() — lesson: Only Add to cart presses.
- Whole card — PDP({ showButton: false, onPress: noop }) — lesson: The card is one button, named 5 g gold coin.

## Sizing
header: Sizing · title: 344 px wide, centred content · description: The card is 344 px wide, as in Figma; width sets another number or a percentage of its host. Everything inside is centred, 12 px apart, with 20 px of padding at the top and bottom and 16 px at the sides. The picture box is imageWidth × imageHeight, and the height follows the content.
Body: `<div className="coin-new-stack">` with the measured diagram, then a grid.
Measured diagram: `<Anatomy legend={false} marks={[{ kind: 'size', target: R, side: 'bottom', label: 'both' }, { kind: 'padding', target: R }, { kind: 'gap', from: media slot, to: heading }]}>` › PDP(). Expected 344 × 316, padding 20 / 16, gap 12; report the measured values.
Grid `coin-new-example-grid` (two columns), each in `<FitWidth>`:
- width 280 — PDP({ width: 280 }) — lesson: The facts share less room, and a long title is cut sooner.
- Bigger picture — PDP({ imageWidth: 96, imageHeight: 96 }) — lesson: The picture box sets the space above the title.

## Content
header: Content · title: A name, one qualifier, short facts · description: Make the title the product’s name, short enough for one line, and the subtitle one qualifier, such as its purity. Name each fact with a noun, such as Weight or Price, and keep values to a number or a word. Label the button with what it does, such as Add to cart. A title longer than one line is cut with an ellipsis; numberOfLines gives it more lines, and disableTruncation lets it wrap in full.
Grid `coin-new-example-grid` (two columns), each in `<FitWidth>`:
- Long title — PDP({ title: LONG }) — lesson: Cut at one line with an ellipsis.
- numberOfLines 2 — PDP({ title: LONG, numberOfLines: 2 }) — lesson: Two lines before the ellipsis; the card grows.

## In context
header: In context · title: Top of a product page · description: The card opens the product page, under the page’s heading. Add to cart calls the screen’s own cart through onButtonPress; the card only lays out the product.
Composition in `.coin-new-context` › `<FitWidth>` › `<VStack modes={{ ...LIGHT, 'Slot gap': 'M', Padding: 'None' } as Modes} style={{ width: 344 }}>` › `<Title title="Gold coins" subtitle="Insured delivery to your door" modes={LIGHT} />`, PDP({ onButtonPress: () => setCount((n) => n + 1) }). Below the FitWidth, `<p className="coin-new-readout" role="status">`: “Your cart is empty”, “1 coin in your cart”, or “<n> coins in your cart”.

## Do & Don'ts
header: Do & Don’ts · title: A short name, a real picture, a title that fits · description: Each pair shows a card that reads cleanly next to one that loses the end of its title, leaves an empty box, or spills past its edges. (Instruction, not copy: both sides sit in `<FitWidth>`.)
- Do A name in the title: The details go in the subtitle and the facts. — PDP() | Don't A sentence in the title: It’s cut at one line, and the end is lost. — PDP({ title: 'Buy a 5 g 24K gold coin with free insured delivery' })
- Do Show the product: The picture says what it is at a glance. — PDP() | Don't Leave out the picture: An empty box still takes its space above the title. — PDP({ imageSource: undefined })
- Do Let a long title wrap: disableTruncation shows all of it, and the card grows. — PDP({ title: LONG, disableTruncation: true }) | Don't singleLine with a long title: The title runs past both edges of the card. — PDP({ title: LONG, singleLine: true })

## Sources
header: Sources · title: Use the public PDP Card contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (19 October build of Biscuit’s main) from the team’s private package repository. Its export is <code>PdpCcCard</code>. Figma’s PDP cc card has no component properties; its parts are nested instances. In the package, the divider between metrics has no height on the web, so no line shows (Figma draws one 46 px tall); the button’s plus icon is 18 px where Figma’s is 16; and the card is 316 px tall where Figma’s is 310, because its text lines are taller. Without <code>imageSource</code> an empty box keeps its space, and <code>title</code> and <code>subtitle</code> fall back to the words Title and Subtitle. Every published Storybook story but Title truncation renders the card as a pressable button with its own button inside, and the published page is the older generated one (all reported).

## Limits
Don't show or mention Color Mode or dark mode. Don't show Semantic Intent, Context modes, `disabled`, or a pressable card that keeps its button. Don't imply a line shows between metrics, that the title or subtitle can be hidden, or that a default picture exists.
