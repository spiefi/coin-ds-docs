# Category Card brief

slug: categorycard · label: Category Card · public API: CategoryCard (+ IconCapsule as stand-in art in imageSlot; HStack, VStack, Title for composition)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=7659-4398 · storybook: docsUrl('categorycard') · stories: Default=components-categorycard--default, Active=components-categorycard--active, Long label=components-categorycard--long-label, Without badge=components-categorycard--without-badge, Image slot=components-categorycard--image-slot, Horizontal rail=components-categorycard--horizontal-rail, Disabled=components-categorycard--disabled
checked: 19 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-c7d3348, Biscuit's main c7d3348, which fixes #282 and #283)
icon: a small tile with a round image and a label line — `<><rect x="4" y="2.5" width="10" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" /><circle cx="9" cy="7.5" r="2.25" stroke="currentColor" strokeWidth="1.5" /><path d="M6.5 12.5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>`
keywords: category tile, category rail, card tab, product category, filter tile

Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`; `const m = (o: Record<string, string>) => ({ ...LIGHT, ...o } as Modes)`; `noop = () => {}`.
ART = `{ Gold: 'ic_rupee_coin', Loans: 'ic_loans', Savings: 'ic_savings', Insurance: 'ic_insurance', 'Mutual funds': 'ic_graph_increasing' }`.
“CC(overrides)” = `<CategoryCard label="Gold" badge="New" modes={LIGHT} onPress={noop} imageSlot={<IconCapsule iconName={ART[label]} />} {...overrides} />`, where the IconCapsule's iconName follows the card's label. Pass the IconCapsule with no modes: the card hands it its own. Never use the package's default image (since #282 a plain light square; before, a placeholder meme).
Every card sits directly on the example stage (grey), which is what shows its white surface and light border. Don't wrap single cards in Surface, FitWidth or a host.
Selectors (testID on the card, `R = byTestId(id)`): with a badge — badge `${R} > div:first-child > div`, image `${R} > div:nth-child(2)`; without a badge — image `${R} > div:first-child`; label `${R} > [dir="auto"]`.

## Overview
summary: Use a Category Card for one category in a horizontal rail: a picture, a one- or two-word label, and an optional badge.
principle: One picture, one word, one tap.
playground: `.preview-stage` › CC with `label={label}`, `badge={badge === 'None' ? undefined : badge}`, `active={active}`, `disabled={disabled}`, `onPress={() => setPresses(n => n + 1)}`; stage label "Live Coin Category Card". Controls: Segment "Label" `Gold | Insurance | Mutual funds` (Gold); Segment "Badge" `None | New | Hot` (New); OnOff "Active" (off); OnOff "Disabled" (off). Readout title "onPress", value "Not pressed yet" or "Pressed 1 time" / "Pressed N times"; note: "A disabled card doesn't call onPress."

## Anatomy
header: Anatomy · title: A badge, a picture, and a label · description: A 60 px white tile stacks a square picture over a one-line label, with an optional badge on its top edge. Here a Coin Icon Capsule in imageSlot stands in for your category art.
specimen: `<Anatomy …>` › CC({ testID: 'cc-anatomy' }) (no specimenWidth: the card is small and is enlarged for you).
parts:
1. Badge — Optional: badge sets one short word, cut off past 38 px. — target: badge — side: top
2. Image — imageSource fills a 36 px square; imageSlot takes any node instead, as here. — target: image (with badge) — side: left
3. Label — 12 px on one line; by default a longer label spills past both edges. — target: label — side: bottom
4. Card — A white tile, 60 px wide, whose 1 px border turns gold when active. — target: R — side: right

## Configuration
header: Configuration · title: Badge and brand colour · description: badge adds a short tag on the card's top edge; leave it out for none. AppearanceBrand colours the badge, Tertiary blue by default, and anything in imageSlot gets the same modes, so the Icon Capsule follows it. Emphasis Medium or Low makes the badge pale. Radius rounds the corners of the default image only. The card's surface, border, and label look the same in every mode.
Grid `coin-new-example-grid three`, each an ExampleCard with one card on the stage:
- No badge — CC({ badge: undefined }) — lesson: Leave badge out: just the picture and the label.
- Tertiary — CC() — lesson: The default: a blue badge, as in Figma.
- Primary — CC({ modes: m({ AppearanceBrand: 'Primary' }) }) — lesson: Gold for the badge and the capsule.
- Secondary — CC({ modes: m({ AppearanceBrand: 'Secondary' }) }) — lesson: Purple for the badge and the capsule.
- Neutral — CC({ modes: m({ AppearanceBrand: 'Neutral' }) }) — lesson: Dark grey, for a quieter rail.
- Emphasis Low — CC({ modes: m({ Emphasis: 'Low' }) }) — lesson: A pale badge; the capsule drops its fill.

## States
header: States · title: Idle, active, and disabled · description: active turns the border gold on the category that's showing. The card keeps no state of its own: the screen sets active on one card and moves it in onPress. A pressed card dims to 85 %; disabled dims it to half and stops onPress.
Grid `coin-new-example-grid three`:
- Idle — CC({ label: 'Loans', badge: undefined }) — lesson: The default: a light grey border.
- Active — CC({ label: 'Loans', badge: undefined, active: true }) — lesson: A gold border marks the category that's showing.
- Disabled — CC({ label: 'Loans', badge: undefined, disabled: true }) — lesson: Half opacity, and onPress isn't called.

## Sizing
header: Sizing · title: 60 px wide, as tall as its content · description: The card is 60 px wide unless you set width, and as tall as its content: 4 px padding, the picture, a 6 px gap, and a 16 px label line. With the default 36 px image it's 68 px tall; the 42 px capsule here makes it 74. A badge sits 11 px above the card, and every card keeps that room in its layout, with or without a badge.
Measured diagram: `<Anatomy legend={false} marks={[{ kind: 'size', target: R, side: 'bottom', label: 'both' }, { kind: 'padding', target: R }, { kind: 'gap', from: image (no badge), to: label }]}>` › CC({ testID: 'cc-size', badge: undefined }). Expected 60 × 74, padding 4, gap 6; report the measured values.
Then a two-column `coin-new-example-grid`:
- 60 px, the default — CC({ label: 'Mutual funds', badge: undefined }) — lesson: “Mutual funds” is wider than the card and spills.
- width={80} — CC({ label: 'Mutual funds', badge: undefined, width: 80 }) — lesson: A wider card holds the label; give every card in a rail the same width.

## Content
header: Content · title: One or two short words · description: Name the category in a word or two, and keep the badge to one short word that doesn't repeat it. A label wider than the card spills past both edges by default. singleLine={false} wraps it onto two lines and makes that card taller; add disableTruncation={false} as well for one line that ends in an ellipsis, as Figma shows.
Grid `coin-new-example-grid three` (no badges):
- Spills, the default — CC({ label: 'Mutual funds', badge: undefined }) — lesson: One line, wider than the card.
- Wraps — CC({ label: 'Mutual funds', badge: undefined, singleLine: false }) — lesson: Two lines; this card grows 16 px taller.
- Ellipsis — CC({ label: 'Mutual funds', badge: undefined, singleLine: false, disableTruncation: false }) — lesson: One line, cut to the card's width.

## In context
header: In context · title: A category rail on the Invest screen · description: The screen keeps the selected category and sets active on that card; each card's onPress selects it. Every card keeps 11 px above it for a badge, so cards with and without one line up in the rail.
Composition in `.coin-new-context`: `<VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes}>` with `<Title title="Invest" subtitle="Pick a category" modes={LIGHT} />` and `<HStack modes={LIGHT}>` holding four cards: CC({ label: 'Gold', badge: 'New' }), CC({ label: 'Loans', badge: undefined }), CC({ label: 'Savings', badge: undefined }), CC({ label: 'Insurance', badge: 'Hot' }), each with `active={selected === label}` and `onPress={() => setSelected(label)}` (start: Gold). Below, `<p className="coin-new-readout" role="status">`: "Showing {selected}".

## Do & Don'ts
header: Do & Don’ts · title: Short words, one active card · description: Each pair shows a rail people scan at a glance next to one that spills, clips, or marks two categories at once.
- Do Keep the label short: “Gold” sits inside the card. — CC({ badge: undefined }) | Don't Write a long label: “Mutual funds” spills past both edges of the card. — CC({ label: 'Mutual funds', badge: undefined })
- Do One short badge word: “New” fits the badge. — CC() | Don't Write a long badge: “Limited offer” is cut to a few letters. — CC({ badge: 'Limited offer' })
- Do Mark one card active: One gold border shows the category on screen. — `<HStack modes={LIGHT}>` with CC({ active: true }) and CC({ label: 'Loans', badge: undefined }) | Don't Mark several cards active: Two gold borders leave people unsure which category is showing. — `<HStack modes={LIGHT}>` with CC({ active: true }) and CC({ label: 'Loans', badge: undefined, active: true })
(Before #282 this pair was "Line the rail up along the bottom / top"; every card now reserves the badge room, so a rail lines up at any alignment.)

## Sources
header: Sources · title: Use the public Category Card contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code>, built from Biscuit’s main at c7d3348 (19 October) and taken from the team’s private package repository. Figma’s Category Card has a State variant (Idle, Active) and a badge on or off; in code, active and the badge text are props. Without an image the card shows a plain light square, so these examples put a Coin Icon Capsule in imageSlot. The label’s font token is spelt “Jio Type Var”, so the label shows in a fallback serif font until the token is fixed. Figma ends a long label in an ellipsis; the package lets it spill unless you change singleLine and disableTruncation. Every card keeps 11 px above it for a badge, so a rail lines up with or without badges, and on the web the active card is announced as pressed. The published Storybook still shows the older generated page.

## Limits
Don't show Dark, Badge Size, Semantic Intent System (not needed here; its badge text is white since #283), Context4, Radius (it doesn't reach the capsule), style props, accessibilityState, or the default image. Don't imply hover or focus styles, or that the card remembers its own selection.
