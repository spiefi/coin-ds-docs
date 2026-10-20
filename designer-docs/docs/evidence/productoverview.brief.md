# Product Overview brief

slug: productoverview · label: Product Overview · public API: ProductOverview (+ Button for In context and a Don't; VStack for In context)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2768-56 · storybook: docsUrl('productoverview') · stories: Default=components-productoverview--default, No image=components-productoverview--no-image, Three stats=components-productoverview--three-stats, No stats=components-productoverview--no-stats
checked: 20 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-c7d3348; Biscuit's newer e60f8bd8 changes only the Storybook page)
icon: a coin over two centred lines — `<><circle cx="9" cy="6.5" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M5 12.5h8M6.5 15.25h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /></>`
keywords: product summary, product header, PDP, product detail, gold coin

Setup: `import coin from '../assets/gold-coin.png'` (added by the planner: Figma's own SafeGold 5g coin), `import jioLogo from '../assets/jio-gold-logo.png'`. `LIGHT = { 'Color Mode': 'Light' } as Modes`; `noop = () => {}`; `W = { maxWidth: 343 } as const` (the card stays `width: 100%`).
STATS = `{ two: [{ value: '995', label: 'Purity' }, { value: '3%', label: 'GST' }], three: [{ value: '995', label: 'Purity' }, { value: '3%', label: 'GST' }, { value: '5g', label: 'Weight' }] }`; LONG = `[{ value: '₹7,812.50', label: 'Price per gram today' }, { value: '3%', label: 'GST' }]`.
PO = `{ imageSource: coin, labelImageSource: jioLogo, label: 'Gold', productName: '5g Gold Coin', description: 'Your gold is insured from our vault to you. If lost or damaged, we’ll replace it.', stats: STATS.two }`.
“PV(overrides = {})” = `<ProductOverview {...PO} modes={LIGHT} style={W} {...overrides} />` (overrides win).
Selectors (no testID): `R = ':scope > div'`; picture `${R} > div:nth-child(1)`; chip `${R} > div:nth-child(2)`; name `${R} > h1`; description `${R} > h1 + div`; stats `${R} > div:last-child`.

## Overview
summary: Use a Product Overview to introduce one product: its picture, a chip, its name, a line of trust, and two or three key facts.
principle: One product, and the facts that matter.
playground: `.preview-stage` › PV({ imageSource: picture ? coin : undefined, labelImageSource: chipPicture ? jioLogo : undefined, stats: count === '[]' ? [] : STATS[count], modes: { ...LIGHT, 'Text Appearance': appearance } }); stage label "Live Coin Product Overview". Controls: OnOff "imageSource" (on); OnOff "labelImageSource" (on); Segment "stats" `two | three | []` (two); Segment "Text Appearance" `Neutral | Primary | Secondary` (Neutral). Readout title "Description colour", value "White on white"; note: "The description’s colour token is white in every Text Appearance mode, so it can’t be read on the white card (reported)."

## Anatomy
header: Anatomy · title: A picture, a chip, a name, and facts · description: A white panel centres the product’s picture, a chip naming the metal or brand, the product’s name, a description, and a row of stats, 12 px apart.
specimen: `<Anatomy specimenWidth={343} …>` › PV().
parts:
1. Picture — imageSource, fitted inside the full width at 288:170. — target: picture — side: left
2. Chip — A ProductLabel from label, with labelImageSource as its picture. — target: chip — side: right
3. Name — productName, 26 px, centred: the page’s heading. — target: name — side: left
4. Description — description, 14 px, centred; it renders white on white today. — target: description — side: right
5. Stats — stats: a value over a label each, in equal columns. — target: stats — side: bottom
6. Panel — A white panel, 24 px padding, no corners or border. — target: R — side: right, at 0.1

## Configuration
header: Configuration · title: Picture, chip, facts, and colour · description: imageSource adds the product’s picture at the top, fitted inside the full width at 288:170 unless imageRatio says otherwise; without it the card starts at the chip. labelImageSource puts a small round picture in the chip. stats takes any number of facts in equal columns, and [] removes the row. children adds your own content between the description and the stats, with the card’s modes. Text Appearance colours the name and the stat labels.
Body: `<div className="coin-new-stack">` with two `coin-new-example-grid` grids (two columns).
Grid 1:
- Picture — PV() — lesson: The product’s picture leads.
- No picture — PV({ imageSource: undefined }) — lesson: The chip leads.
- Three stats — PV({ stats: STATS.three }) — lesson: Three equal columns.
- No stats — PV({ stats: [] }) — lesson: The name and description only.
- imageRatio 2 — PV({ imageRatio: 2 }) — lesson: A wider frame, so a smaller coin.
- No chip picture — PV({ labelImageSource: undefined }) — lesson: The chip shows only its label.
Grid 2:
- Text Appearance Primary — PV({ modes: { ...LIGHT, 'Text Appearance': 'Primary' } }) — lesson: A gold name and stat labels.
- Text Appearance Secondary — PV({ modes: { ...LIGHT, 'Text Appearance': 'Secondary' } }) — lesson: A purple name and stat labels.

## States
header: States · title: Nothing to press · description: Product Overview has no states: it isn’t pressable and has no selected, disabled, or loading look. Put the product’s action on the screen next to it, not inside it.
Grid `coin-new-example-grid` (two columns):
- Read-only — PV() — lesson: Nothing on the card responds to a press.

## Sizing
header: Sizing · title: The host sets the width · description: The card fills its host’s width; Figma draws it at 343 px. The picture fills the width inside 24 px of padding, so a wider card has a taller picture, and the parts are 12 px apart. The name and description wrap. Stat values and labels stay on one line and end in … unless disableTruncation is set.
Body: `<div className="coin-new-stack">` with the measured diagram, then a grid.
Measured diagram: `<Anatomy legend={false} specimenWidth={343} marks={[{ kind: 'size', target: R, side: 'bottom', label: 'both' }, { kind: 'padding', target: R }, { kind: 'gap', from: picture, to: chip }]}>` › PV(). Expected 343 × 409, padding 24, gap 12; report the measured values.
Grid `coin-new-example-grid` (two columns); each card sits in a host and passes `style: undefined`:
- Narrow host — `<div className="coin-new-host narrow">` › PV({ style: undefined }) — lesson: At 240 px the picture shrinks with the card.
- Wide host — `<div className="coin-new-host wide">` › PV({ style: undefined }) — lesson: At 360 px the picture grows with the card.
- Long stats — `<div className="coin-new-host narrow">` › PV({ style: undefined, stats: LONG }) — lesson: Stat values and labels end in … on one line.
- disableTruncation — `<div className="coin-new-host narrow">` › PV({ style: undefined, stats: LONG, disableTruncation: true }) — lesson: The stats wrap instead.

## Content
header: Content · title: The product, its metal, and its figures · description: Make productName the product with its size, such as 5g Gold Coin, and the chip’s label the metal or brand, not the product again. The description is a sentence or two on why to trust it. A stat value is the figure, such as 995 or 3%, and its label a word or two, such as Purity or GST.
Grid `coin-new-example-grid` (two columns):
- Gold coin — PV() — lesson: Gold in the chip, the size in the name.
- Silver coin — PV({ imageSource: undefined, labelImageSource: undefined, label: 'Silver', productName: '10g Silver Coin', description: 'Insured delivery to your door, with a purity certificate.', stats: [{ value: '999', label: 'Purity' }, { value: '3%', label: 'GST' }, { value: '10g', label: 'Weight' }] }) — lesson: Silver in the chip, three figures.

## In context
header: In context · title: A gold coin’s product page · description: The overview explains the product; the Buy button under it belongs to the screen, because the card has no action of its own. Buy opens the screen’s own checkout.
Composition in `.coin-new-context` › `<VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes}>` › PV({ style: undefined }) and `<Button label="Buy for ₹38,750" onPress={() => setBought(true)} modes={LIGHT} style={{ alignSelf: 'stretch' }} />`. Below the VStack, `<p className="coin-new-readout" role="status">`: “Not bought yet” or “Opened checkout for the 5g Gold Coin”.

## Do & Don'ts
header: Do & Don’ts · title: Figures, a chip that adds, an action outside · description: Each pair shows a card that reads at a glance next to one that cuts a fact short, repeats itself, or pushes an action into the card.
- Do Figures in stats: A number and a word or two each. — PV() | Don't A sentence in a stat: Stats stay on one line, so it’s cut short. — PV({ stats: [{ value: 'Insured from our vault to you', label: 'Promise' }, { value: '3%', label: 'GST' }] })
- Do The metal in the chip: Gold, then the product’s name. — PV() | Don't The name twice: The chip repeats 5g Gold Coin. — PV({ label: '5g Gold Coin' })
- Do The action under the card: Keep Buy on the screen, below the overview. — PV() | Don't A Button in children: It lands between the description and the facts. — PV({ children: <Button label="Buy" onPress={noop} /> })

## Sources
header: Sources · title: Use the public Product Overview contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (19 October build of Biscuit’s main) from the team’s private package repository. Figma’s Product Overview has no properties; the picture, chip, text, and two stats are layers there, and the coin picture here is Figma’s own. The description’s colour token is white in every Text Appearance mode, so the description can’t be read on the white card, here and in Storybook; Figma’s is dark grey. The package’s picture fills the card’s width (Figma’s is 288 × 170, centred), and its text lines are taller, so the card is about 409 px tall where Figma’s is 396. <code>disableTruncation</code> affects only the stats. The published Storybook is older than the installed package and still shows the older generated page (all reported).

## Limits
Don't show Dark, Page type, Avatar Size, Context, Context2, Context4, Badge Size, context 10 or Profile Card Appearance. Don't imply the card is pressable, that the description is readable today or limited to two lines, or that disableTruncation changes the name or description.
