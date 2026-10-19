# Card brief

slug: card · label: Card · public API: Card with Card.Title, Card.SupportText, `header`, `media` (+ HStack, Image, Text, Title, VStack)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=5739-794 · storybook: docsUrl('card') · stories: Default=components-card--default, Slim=components-card--slim, Real image=components-card--with-real-image, Header=components-card--with-header, Custom content=components-card--custom-content
checked: 19 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-a116616; Card.tsx unchanged on Biscuit's main c7d3348)
icon: a card with a picture area and two text lines — `<><rect x="3" y="2.5" width="12" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M3 9h12M5.5 11.5h6M5.5 13.5h3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /></>`
keywords: product card, offer card, surface, panel, container

Setup: `import bankHero from '../assets/bank-hero.png'`, `import jioLogo from '../assets/jio-gold-logo.png'`.
`LIGHT = { 'Color Mode': 'Light' } as Modes`; `NEUTRAL = { ...LIGHT, AppearanceBrand: 'Neutral' } as Modes`; `W = { width: 200 } as const` (Figma's and Storybook's width).
`HEADER = <HStack alignVertical="center"><Image imageSource={jioLogo} width={18} height={18} accessibilityElementsHidden importantForAccessibility="no" /><Text text="JioFinance" /></HStack>`
`MEDIA = <Image imageSource={bankHero} width="100%" height="100%" accessibilityLabel="Two people smiling at a phone" />` (fills the media slot at any mediaAspectRatio, as the Storybook stories' picture does)
Text sets `[support, title, support]`: SAVINGS = ['Jio Payments Bank', 'Savings account', 'Zero balance']; GOLD = ['Digital gold', '24K digital gold', 'From ₹10']; FD = ['Fixed deposit', 'Earn 7.25% a year', 'From ₹1,000'].
“C({ variant, header, media, modes = NEUTRAL, text = SAVINGS, style = W, mediaAspectRatio, onPress, accessibilityLabel })” =
`<Card variant={variant} header={header} media={media} modes={modes} style={style} mediaAspectRatio={mediaAspectRatio} onPress={onPress} accessibilityLabel={accessibilityLabel}><Card.SupportText>{text[0]}</Card.SupportText><Card.Title>{text[1]}</Card.Title><Card.SupportText>{text[2]}</Card.SupportText></Card>`
Pass `header`/`media` through exactly as given (HEADER, MEDIA, `false`, or nothing); don't add a default. Leave `mediaAspectRatio` undefined unless an example sets it.
Selectors (no testID; `R = ':scope > div'`, the card root): header `${R} > div:nth-child(1)`; media `${R} > div:nth-child(2)`; content `${R} > div:last-child`; first support line `${R} > div:last-child > [dir="auto"]:first-child`; title `${R} > div:last-child > [dir="auto"]:nth-child(2)`.

## Overview
summary: Use a Card to group one product, offer, or article on a panel, with an optional logo, a picture, and a few lines of text.
principle: One card, one idea: a name and one fact.
playground: `.preview-stage` › C({ variant, header: header ? HEADER : undefined, media: media ? MEDIA : undefined, modes: { ...LIGHT, AppearanceBrand: brand } }); stage label "Live Coin Card". Controls: Segment "variant" `default | slim` (default); Segment "AppearanceBrand" `Primary | Secondary | Neutral | Tertiary` (Neutral); OnOff "header" (on); OnOff "media" (on). Readout title "Slots shown", value: the shown slots joined with ", " — "Header" if header, "Media" if media and variant is default, then "Content" (e.g. "Header, Media, Content"); note: "Slim ignores media even when you pass it."

## Anatomy
header: Anatomy · title: A header, a picture, and the text · description: A panel stacks three slots: header for a logo or a label, media for a picture, and the content you pass as children, usually Card.SupportText and Card.Title. Each slot shows only when you pass it.
specimen: `<Anatomy specimenWidth={200} …>` › C({ header: HEADER, media: MEDIA }).
parts:
1. Header — header: a logo or a label in a row padded 12 px. — target: header — side: left
2. Media — media: a picture across the full width at 154:116. — target: media — side: right
3. Support text — Card.SupportText: a 12 px line for a category or a fact. — target: first support line — side: left
4. Title — Card.Title: the name in 16 px heavy type, up to 3 lines. — target: title — side: right
5. Content — children: a column padded 12 px, 4 px between lines. — target: content — side: bottom
6. Panel — AppearanceBrand sets the fill; corners are 12 px. — target: R — side: top

## Configuration
header: Configuration · title: Two variants, three slots, and a fill · description: variant default shows a picture when you pass media; slim never does. Pass header for a logo or a label, media for a picture, and children for the text, and leave out what you don’t need. AppearanceBrand sets the fill: with no modes the card is Primary cream, and Figma draws it Neutral white. Semantic Intent System tints it with AppearanceSystem’s status colour. Card Container Plain removes the panel; Page type SubPage and context 8 Section add a grey border.
Body: `<div className="coin-new-stack">` holding four grids, in this order:
Grid `coin-new-example-grid three`:
- Default — C({ header: HEADER, media: MEDIA }) — lesson: A logo, a picture, and the text, for an offer that leads with an image.
- Slim — C({ variant: 'slim', header: HEADER, text: GOLD }) — lesson: The logo and the text, without a picture.
- Text only — C({ text: FD }) — lesson: Just children: a plain panel for a few lines.
Grid `coin-new-example-grid` (two columns), each C({ variant: 'slim', header: HEADER, text: GOLD, modes }):
- Primary (default) — modes LIGHT — lesson: With no AppearanceBrand the card is cream.
- Neutral — modes NEUTRAL — lesson: White, as Figma and Storybook draw it.
- Secondary — modes { ...LIGHT, AppearanceBrand: 'Secondary' } — lesson: A light purple fill.
- Tertiary — modes { ...LIGHT, AppearanceBrand: 'Tertiary' } — lesson: A light blue fill.
Grid `coin-new-example-grid three`, each C({ text, modes: { ...LIGHT, 'Semantic Intent': 'System', AppearanceSystem: status } }):
- positive — text ['Fixed deposit', 'Matured', '₹1,07,250 paid to your account'] — lesson: Semantic Intent System with AppearanceSystem positive: green.
- warning — text ['Fixed deposit', 'Matures in 3 days', 'Choose to renew or withdraw'] — lesson: warning: orange.
- negative — text ['Fixed deposit', 'Renewal failed', 'Add ₹1,000 to try again'] — lesson: negative: red.
Grid `coin-new-example-grid three`, each C({ variant: 'slim', header: HEADER, text: GOLD, modes }):
- Card Container Plain — modes { ...NEUTRAL, 'Card Container': 'Plain' } — lesson: No fill, border, corners, or padding: the text sits on what’s behind it.
- Page type SubPage — modes { ...NEUTRAL, 'Page type': 'SubPage' } — lesson: A light grey border around the white card.
- context 8 Section — modes { ...NEUTRAL, 'context 8': 'Section' } — lesson: The same grey border, for a card inside a section.

## States
header: States · title: Static or pressable · description: Without onPress the card is static. With onPress the whole card is one button: give it an accessibilityLabel when the title isn’t its whole name, and don’t put buttons inside it. disabled stops presses. The card shows no pressed, hover, or disabled look.
Grid `coin-new-example-grid` (two columns):
- Static — C({ variant: 'slim', header: HEADER, text: GOLD }) — lesson: Text to read: nothing responds.
- Pressable — C({ variant: 'slim', header: HEADER, text: GOLD, onPress: () => setPresses(n => n + 1), accessibilityLabel: '24K digital gold, from ₹10' }) — lesson: One button; it looks the same as the static card.
Below the grid: `<p className="coin-new-readout" role="status">` "Pressable card pressed {n} times" ("Pressable card not pressed yet" at 0, "pressed 1 time" at 1).

## Sizing
header: Sizing · title: Your layout sets the width · description: The card fills a column’s width but hugs its content in a row, so give it a width there; Figma and Storybook draw it at 200 px. Height follows the content. The picture keeps 154:116 of the width, and mediaAspectRatio changes that. The header and the text are padded 12 px, with 4 px between slots and between lines; Gap M and L widen both, and Gap None removes them.
Body: `<div className="coin-new-stack">` with the measured diagram, then a grid.
Measured diagram: `<Anatomy legend={false} specimenWidth={200} marks={[{ kind: 'size', target: R, side: 'bottom', label: 'both' }, { kind: 'padding', target: content }, { kind: 'gap', from: media, to: content }]}>` › C({ header: HEADER, media: MEDIA }). Expected about 200 × 285, padding 12, gap 4; report the measured values.
Grid `coin-new-example-grid three`:
- Gap M — C({ variant: 'slim', header: HEADER, text: GOLD, modes: { ...NEUTRAL, Gap: 'M' } }) — lesson: 14 px between slots, 18 px between lines.
- Gap L — same with Gap 'L' — lesson: 23 px for both.
- mediaAspectRatio 1 — C({ media: MEDIA, text: SAVINGS, mediaAspectRatio: 1 }) — lesson: A square picture.

## Content
header: Content · title: A name and one fact · description: Make the title the product or offer name, and each support line one fact: a category, a price, a date, or a status. The header is a logo or a label, not a second title. Card.Title stops at three lines with an ellipsis; Card.SupportText never stops, so keep it short.
Grid `coin-new-example-grid` (two columns):
- Name and one fact — C({ variant: 'slim', header: HEADER, text: GOLD }) — lesson: “24K digital gold”, and its price.
- Long title — C({ variant: 'slim', header: HEADER, text: ['Digital gold', 'Buy 24K digital gold in seconds and keep it in an insured vault at no cost', 'From ₹10'] }) — lesson: Card.Title stops at three lines.

## In context
header: In context · title: Offers on the Home screen · description: Two offers share a row, each card taking half of it. The cards use the package default, Primary cream. Each card’s onPress opens its offer: the screen does the navigation, and the card only reports the press.
Composition in `.coin-new-context` › `<VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes}>` › `<Title title="Offers for you" subtitle="Picked for your savings" modes={LIGHT} />` and `<HStack alignVertical="stretch" modes={LIGHT}>` › C({ variant: 'slim', header: HEADER, text: GOLD, modes: LIGHT, style: { flex: 1 }, onPress: () => setOpened('24K digital gold'), accessibilityLabel: '24K digital gold, from ₹10' }) and C({ variant: 'slim', header: HEADER, text: FD, modes: LIGHT, style: { flex: 1 }, onPress: () => setOpened('Fixed deposit'), accessibilityLabel: 'Fixed deposit, earn 7.25% a year' }). Below, `<p className="coin-new-readout" role="status">`: "No offer opened" or "Opened: <name>".

## Do & Don'ts
header: Do & Don’ts · title: A picture, a name, and nothing empty · description: Each pair shows a card that reads at a glance next to one that loses its picture, its name, or its spacing.
- Do Default for a picture: The picture leads the card. — C({ header: HEADER, media: MEDIA }) | Don't A picture on a slim card: Slim drops the picture without a warning. — C({ variant: 'slim', header: HEADER, media: MEDIA })
- Do A name and one fact: “24K digital gold”, from ₹10. — C({ variant: 'slim', header: HEADER, text: GOLD }) | Don't A paragraph of support text: Support text never stops, so the card grows and the name gets lost. — C({ variant: 'slim', header: HEADER, text: ['Digital gold', '24K digital gold', 'Buy and sell 24K gold any time, from as little as ₹10, and we keep it in an insured vault for you at no extra cost.'] })
- Do Leave out a slot: No header, so the text starts at the top. — C({ variant: 'slim', text: GOLD }) | Don't Pass false to hide a slot: An empty 24 px band stays where the header was. — C({ variant: 'slim', header: false, text: GOLD })

## Sources
header: Sources · title: Use the public Card contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (16 October build) from the team’s private package repository. Figma’s Card has two variants, Default and Slim, drawn white (AppearanceBrand Neutral) at 200 px with fixed heights; in code the card hugs its content, and with no modes it is cream (Primary). Figma’s header and media switches are the <code>header</code> and <code>media</code> props in code: pass them or leave them out. Passing <code>false</code> leaves an empty band, and the card shows no pressed or disabled look (both reported). The card doesn’t read the app’s theme, so pass modes on the card or place it in a Coin stack. The published Storybook still shows the older generated page.

## Limits
Don't show Dark or Color Mode examples, Page type JioPlus, numberOfLines overrides, or style beyond width and flex. Don't imply a pressed, hover, or disabled look, that the card navigates, or that Card.Title is a heading.
