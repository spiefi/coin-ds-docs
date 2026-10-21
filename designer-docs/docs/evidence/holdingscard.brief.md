# Holdings Card brief

slug: holdingscard · label: Holdings Card · public API: HoldingsCard (+ Text in `children`; Title and VStack for In context; the kit's FitWidth)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1028-1533 · storybook: docsUrl('holdingscard') · stories: Default=components-holdingscard--default, Selected=components-holdingscard--selected, Disabled=components-holdingscard--disabled, With badge=components-holdingscard--with-badge, With footer=components-holdingscard--with-footer, Without trailing=components-holdingscard--without-trailing, With image=components-holdingscard--with-image
checked: 21 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-c7d3348; Biscuit's newer e60f8bd8 changes only the Storybook page)
icon: a card with a radio at the top right and a row of three terms — `<><rect x="2" y="3" width="14" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.5" fill="none" /><circle cx="12.5" cy="6.5" r="1.5" stroke="currentColor" strokeWidth="1.2" fill="none" /><path d="M4.5 7.5h4M4.5 11.5h2M8 11.5h2M11.5 11.5h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /></>`
keywords: loan offer, offer card, holding, investment card, selectable card, loan card

Setup: `import jioLogo from '../assets/jio-gold-logo.png'` (the package ships no logo). `LIGHT = { 'Color Mode': 'Light' } as Modes`; `noop = () => {}`; `W = { width: 328 }` (Figma's width: the card has none of its own).
DETAILS = `[{ label: 'Interest', value: '12% p.a.' }, { label: 'Tenure', value: '36 months' }, { label: 'Processing fee', value: '₹499' }, { label: 'APR', value: '15.47%' }, { label: 'EMI', value: '₹6,277/m' }]`; MORE = `[...DETAILS, { label: 'Prepayment', value: 'Free' }, { label: 'Payout', value: '24 hours' }]`.
FOOTER_ITEMS = `[{ label: 'Repayment', linkLabel: 'Schedule', onLinkPress: noop }, { label: 'Charges', linkLabel: 'Details', onLinkPress: noop }]`.
BASE = `{ headerImage: jioLogo, heroLabel: 'Loan amount up to', heroValue: '₹1,89,000', details: DETAILS, footerItems: FOOTER_ITEMS, footerActionLabel: 'Apply', onFooterActionPress: noop, onPress: noop, modes: LIGHT, style: W }`. Every card has `onPress`: without it the card is disabled and its footer doesn't respond to clicks.
HOLDING = `{ heroLabel: 'Current value', heroValue: '₹52,340', details: [{ label: 'Quantity', value: '8.2 g' }, { label: 'Bought at', value: '₹5,920/g' }, { label: 'Returns', value: '+7.8%' }], radio: false }`.
“HC(overrides = {})” = `<HoldingsCard {...BASE} {...overrides} />` (overrides win; mode examples pass `modes: { ...LIGHT, … }`).
Every HC outside the two diagrams sits in the kit's `<FitWidth>` (playground, every ExampleCard, both sides of each Do & Don't, In context). The diagrams use no `specimenWidth`: the card's own 328 px lets Anatomy scale it on phones.
Selectors (no testID; the root is always a `button`): `R = ':scope > button'`; logo `${R} > div:nth-child(1) > div:first-child`; trailing `${R} > div:nth-child(1) > div:last-child`; header `${R} > div:nth-child(1)`; hero `${R} > div:nth-child(2)`; terms `${R} > div:nth-child(3)`; footer `${R} > div:nth-child(4)`.

## Overview
summary: Use a Holdings Card for one loan offer or holding: its headline amount, its key terms, and a radio to choose it from a list.
principle: One offer, its terms at a glance.
playground: `.preview-stage` › `<FitWidth>` › HC({ selected, onPress: () => setSelected((s) => !s), radio: trailing !== 'none', badgeLabel: trailing === 'badgeLabel' ? 'Pre-approved' : undefined, footer, modes: { ...LIGHT, AppearanceBrand: brand } }). Stage label "Live Coin Holdings Card". Controls: Segment "trailing" `radio | badgeLabel | none` (radio); OnOff "footer" (off); Segment "AppearanceBrand" `Primary | Secondary | Neutral | Tertiary` (Primary). Readout title "selected", value "false" or "true"; note: "Press the card: your onPress sets selected. The card doesn’t select itself."

## Anatomy
header: Anatomy · title: An amount over its terms · description: A rounded panel puts a logo and the radio at the top, the headline amount under them, and the terms in rows of three. The footer adds links and an action below a divider.
specimen: `<Anatomy …>` › HC({ footer: true }).
parts:
1. Logo — headerImage, fitted into a 100 × 24 box; the box stays when left out. — target: logo — side: top
2. Radio — Shows selected; badgeLabel or trailing can replace it. — target: trailing — side: right
3. Hero — heroLabel over heroValue, the amount in 20 px bold. — target: hero — side: left
4. Terms — details, three to a row; a long value ends in an ellipsis. — target: terms — side: left
5. Footer — footer: a divider, two labelled links, and a small blue button. — target: footer — side: bottom
6. Panel — A rounded panel with a 1 px border; AppearanceBrand sets its colours. — target: R — side: right, at 0.55

## Configuration
header: Configuration · title: Trailing, footer, and colours · description: The top right shows a Radio by default, for choosing this offer. badgeLabel swaps it for a status Badge, green by default; AppearanceSystem warning makes it orange. trailing swaps in your own component, and radio false leaves the top right empty. footer adds a divider, footerItems as labelled links, and a small Apply button that is always blue. children replaces the terms with your own content. AppearanceBrand colours the panel: Primary (pale gold) by default, Secondary (lilac), Neutral (white, as in Figma), or Tertiary (light grey).
Body: `<div className="coin-new-stack">` with two `coin-new-example-grid` grids (two columns), each card in `<FitWidth>`.
Grid 1:
- Radio — HC() — lesson: For choosing one offer from a list.
- Badge — HC({ badgeLabel: 'Pre-approved' }) — lesson: A status in place of the Radio.
- Badge, AppearanceSystem warning — HC({ badgeLabel: 'Expires soon', modes: { ...LIGHT, AppearanceSystem: 'warning' } }) — lesson: An orange badge for a warning.
- No trailing — HC({ radio: false }) — lesson: Nothing at the top right, for a holding you don’t choose.
Grid 2:
- Footer — HC({ footer: true }) — lesson: Links to more detail and a blue Apply button.
- Custom body — HC({ children: <Text text="Pre-approved on your salary account. No documents needed." /> }) — lesson: Your content in place of the terms; the amount and Radio stay.
- AppearanceBrand Neutral — HC({ modes: { ...LIGHT, AppearanceBrand: 'Neutral' } }) — lesson: A white panel with a grey border, as in Figma.
- AppearanceBrand Secondary — HC({ modes: { ...LIGHT, AppearanceBrand: 'Secondary' } }) — lesson: A lilac panel.
- AppearanceBrand Tertiary — HC({ modes: { ...LIGHT, AppearanceBrand: 'Tertiary' } }) — lesson: A light grey panel.
- Without a logo — HC({ headerImage: undefined }) — lesson: The empty logo box still holds the top row’s height.

## States
header: States · title: Selected comes from your screen · description: The whole card is one button. When it’s pressed, your onPress sets selected, and the Radio fills; the card doesn’t select itself. disabled greys the Radio and stops presses. A card without onPress is disabled too, and then its footer links and button don’t respond to clicks either. While pressed, the card fades a little.
Grid `coin-new-example-grid three`, each in `<FitWidth>`:
- Not selected — HC() — lesson: An empty Radio.
- Selected — HC({ selected: true }) — lesson: A filled purple Radio.
- Disabled — HC({ disabled: true }) — lesson: A grey Radio; the card doesn’t press.

## Sizing
header: Sizing · title: Give it a width · description: The card has no width of its own: it fills a host that stretches it, and shrinks to its content anywhere else. Set it with style, as Figma does at 328 px. The terms share the width in three equal columns, and the height follows the content: 20 px of padding at the top and bottom, 16 px at the sides, and 10 px between the parts. Each extra row of terms adds about 47 px.
Body: `<div className="coin-new-stack">` with the measured diagram, then a grid.
Measured diagram: `<Anatomy legend={false} marks={[{ kind: 'size', target: R, side: 'bottom', label: 'both' }, { kind: 'padding', target: R }, { kind: 'gap', from: header, to: hero }]}>` › HC(). Expected 328 × 208, padding 20 / 16, gap 10; report the measured values.
Grid `coin-new-example-grid` (two columns), each in `<FitWidth>`:
- Wider, 360 px — HC({ style: { width: 360 } }) — lesson: The three columns widen; the amount stays at the left.
- Seven terms — HC({ details: MORE }) — lesson: A third row, and the card grows.

## Content
header: Content · title: Say what the number is · description: Make heroLabel say what the amount is, such as Loan amount up to, and give heroValue already formatted, with its ₹. Keep term labels to a word or two and put the unit in the value: 36 months, 12% p.a. Name footer links for the next step, and keep the action to one word, such as Apply. headerImage is made for a wide logo: a square mark sits centred in its 100 × 24 box. Holdings work the same way: the current value as the hero, with quantity and returns as terms.
Grid `coin-new-example-grid` (two columns), each in `<FitWidth>`:
- Loan offer — HC() — lesson: The amount you can borrow, with its rate and tenure.
- Gold holding — HC(HOLDING) — lesson: What you own today, with no Radio.

## In context
header: In context · title: Choosing a loan offer · description: The screen lists its offers and keeps one selected: each card’s onPress picks that offer, and its selected follows the screen’s choice.
Composition in `.coin-new-context` › `<FitWidth>` › `<VStack modes={{ ...LIGHT, 'Slot gap': 'M', Padding: 'None' } as Modes} style={{ width: 328 }}>` › `<Title title="Pick an offer" subtitle="Pre-approved for you" modes={LIGHT} />`, HC({ selected: picked === 'a', onPress: () => setPicked('a') }), HC({ heroValue: '₹2,50,000', details: [{ label: 'Interest', value: '13.5% p.a.' }, { label: 'Tenure', value: '48 months' }, { label: 'Processing fee', value: '₹999' }, { label: 'APR', value: '16.2%' }, { label: 'EMI', value: '₹6,768/m' }], selected: picked === 'b', onPress: () => setPicked('b') }). Below the FitWidth, `<p className="coin-new-readout" role="status">`: “No offer picked”, “Picked the ₹1,89,000 offer”, or “Picked the ₹2,50,000 offer”.

## Do & Don'ts
header: Do & Don’ts · title: A set width, short values, short labels · description: Each pair shows a card that reads cleanly next to one that squeezes its terms, cuts a value or badge, or wraps its button.
(Instruction, not copy: both sides of every pair sit in `<FitWidth>`.)
- Do Give it a width: style width 328 keeps three even columns. — HC() | Don't Leave the width to its host: In a host that doesn’t stretch it, the card shrinks and labels wrap. — HC({ style: undefined })
- Do Values with their unit: 36 months fits its column. — HC() | Don't Long values: The column stays the same, so the value is cut short. — HC({ details: [DETAILS[0], { label: 'Tenure', value: '36 months or 60 months' }, ...DETAILS.slice(2)] })
- Do One word on the button: Apply fits the 80 px button. — HC({ footer: true }) | Don't Two words: Apply now wraps onto two lines. — HC({ footer: true, footerActionLabel: 'Apply now' })
- Do A short badge: Pre-approved fits beside the logo. — HC({ badgeLabel: 'Pre-approved' }) | Don't A long badge: It isn’t shortened, so the card’s edge cuts it off. — HC({ badgeLabel: 'Recommended for you this month' })

## Sources
header: Sources · title: Use the public Holdings Card contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (19 October build of Biscuit’s main) from the team’s private package repository. Figma’s Holdings Card exposes <code>children</code>, <code>footer</code>, <code>radio</code>, and <code>trailing</code>; it is a white card (AppearanceBrand Neutral) with a dark badge and a gold Apply button. In the package, the default card is pale gold, the badge green, the footer links black, and the Apply button is always blue, whatever AppearanceBrand you set. The card has no width of its own, a card without <code>onPress</code> is disabled along with its footer, and it is about 7 px taller than Figma’s because its text lines are taller. A long badge is cut off by the card’s edge, and a two-word action wraps in the 80 px button. The published Storybook is older than the installed package and still shows the older generated page; its With image story can’t load its logo (all reported).

## Limits
Don't show or mention Color Mode or dark mode. Don't imply the card selects itself, that the footer button follows AppearanceBrand, that labels or badges truncate, or that a card without onPress works.
