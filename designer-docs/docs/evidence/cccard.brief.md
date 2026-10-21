# CC Card brief

slug: cccard · label: CC Card · public API: CcCard (+ Avatar in `media`; Title and VStack for In context; the kit's FitWidth)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=5434-1992 · storybook: docsUrl('cccard') · stories: Default=components-cccard--default, Compact=components-cccard--compact, Avatar slot=components-cccard--avatar-slot, Header hidden=components-cccard--header-hidden, Nudge hidden=components-cccard--nudge-hidden, Button hidden=components-cccard--button-hidden, Pressable card=components-cccard--pressable-card
checked: 21 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-c7d3348; Biscuit's newer e60f8bd8 changes only the Storybook page)
icon: a card with a badge, a picture beside a title, and list lines — `<><rect x="2" y="2" width="14" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.5" fill="none" /><rect x="4.5" y="6" width="4" height="3" rx="0.8" stroke="currentColor" strokeWidth="1.2" fill="none" /><path d="M4.5 4.2h3M10.5 7.5h3M4.5 11.5h9M4.5 13.8h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none" /></>`
keywords: CcCard, credit card offer, credit card, card offer, card product, joining fee, benefits card

Setup: `import bankHero from '../assets/bank-hero.png'` and `import jioLogo from '../assets/jio-gold-logo.png'` (the package ships no pictures). `LIGHT = { 'Color Mode': 'Light' } as Modes`; `noop = () => {}`.
BADGES = `[{ label: 'Pre-approved', modes: { AppearanceBrand: 'Tertiary' } as Modes }]`; TRAILING = `[{ label: 'Lifetime free', modes: { AppearanceBrand: 'Secondary' } as Modes }]` (modes only: no `color` or `labelColor`).
ITEMS = `[{ icon: 'ic_rupee_coin', title: '5% back as JioPoints on gold' }, { icon: 'ic_flight_mode', title: '4 airport lounge visits a year' }, { icon: 'ic_gift', title: 'No annual fee in the first year' }]`.
NUDGE = `[{ text: 'Get 2x JioPoints with ' }, { text: 'JioFinance+', modes: { 'Text Appearance': 'Primary' } as Modes }]`.
BASE = `{ imageSource: bankHero, title: 'JioFinance Gold Credit Card', subtitle: 'Rewards on gold and every spend', badges: BADGES, trailingBadges: TRAILING, items: ITEMS, nudgeSegments: NUDGE, nudgeAvatarSource: jioLogo, headline: 'Joining fee', description: '₹499', footerSubtitle: '+ GST', buttonLabel: 'Apply', onButtonPress: noop, modes: LIGHT }`.
COMPACT = `{ compact: true, headline: 'JioFinance Gold Credit Card', description: '₹499', footerSubtitle: 'Joining fee' }` (compact shows no title, so the headline names the card).
“CC(overrides = {})” = `<CcCard {...BASE} {...overrides} />` (overrides win; mode examples pass `modes: { ...LIGHT, … }`). The card is 343 px wide by default (Figma's width): leave `width` alone unless the example says otherwise.
Every CC outside the two diagrams sits in the kit's `<FitWidth>` (playground, every ExampleCard, both sides of each Do & Don't, In context). The diagrams use no `specimenWidth`.
Selectors (no testID; static root): `R = ':scope > div'`; header `${R} > div:nth-child(1)`; picture `${R} > div:nth-child(2) > div:first-child`; title `${R} > div:nth-child(2) > div:last-child`; benefits `${R} > div:nth-child(3)`; nudge `${R} > div:nth-child(4)`; fee `${R} > div:nth-child(5) > div:first-child`; action `${R} > div:nth-child(5) > button`.

## Overview
summary: Use a CC Card to sell one credit card: who it’s for, its key benefits, an upsell, and the joining fee, with one action.
principle: One card, its benefits, its fee.
playground: `.preview-stage` › `<FitWidth>` › CC({ ...(compact ? COMPACT : {}), showHeader, showNudge, onButtonPress: () => setLast('Apply pressed') }). Stage label "Live Coin CC Card". Controls: OnOff "compact" (off); OnOff "showHeader" (on); OnOff "showNudge" (on). Readout title "Last press", value "None" or "Apply pressed"; note: "compact has no button, so nothing presses."

## Anatomy
header: Anatomy · title: An offer from badges to fee · description: A white card stacks the badges, the card’s picture and name, its benefits, an upsell line, and the fee with the action, 8 px apart.
specimen: `<Anatomy …>` › CC().
parts:
1. Badges — badges on the left, trailingBadges on the right. — target: `${header} > div:first-child` (the left group) — side: top
2. Picture — imageSource in an 88 × 54 box; media replaces it. — target: picture — side: left
3. Title — title in 14 px bold on one line, subtitle under it. — target: title — side: right
4. Benefits — items: one Coin ListItem per benefit, with its icon. — target: benefits — side: left
5. Upsell — nudgeSegments after a small avatar. — target: nudge — side: right
6. Fee — headline, description, and footerSubtitle. — target: fee — side: bottom
7. Action — A small purple Button from buttonLabel. — target: action — side: right

## Configuration
header: Configuration · title: Full or compact, and what to show · description: The full card shows every part. compact keeps only the picture and the fee, for dense lists: it drops the badges, title, benefits, upsell, and button, so put the card’s name in headline. media replaces the picture in both, for example with an Avatar as Figma’s compact card does. showHeader and showNudge hide the badges and the upsell; showButton hides the button but not its space. Badges take modes, not colours. On the card, AppearanceBrand Secondary turns the benefit icons purple, Badge Size Small makes the badges smaller, and Page type SubPage shows a grey border for white pages; the Button stays small and purple.
Body: `<div className="coin-new-stack">` with two `coin-new-example-grid` grids (two columns), each card in `<FitWidth>`.
Grid 1:
- Full card — CC() — lesson: Badges, the card, its benefits, an upsell, and the fee.
- Compact — CC(COMPACT) — lesson: Just the picture and the fee, for dense lists.
- Compact with an Avatar — CC({ ...COMPACT, media: <Avatar imageSource={jioLogo} /> }) — lesson: As in Figma: a round mark over the fee.
- No header — CC({ showHeader: false }) — lesson: Without the badges, 31 px shorter.
Grid 2:
- No upsell — CC({ showNudge: false }) — lesson: The benefits sit right above the fee.
- No button — CC({ showButton: false }) — lesson: The fee stays where it was; the card is no shorter.
- AppearanceBrand Secondary — CC({ modes: { ...LIGHT, AppearanceBrand: 'Secondary' } }) — lesson: Purple benefit icons, as in Figma.
- Badge Size Small — CC({ modes: { ...LIGHT, 'Badge Size': 'Small' } }) — lesson: Smaller badges, as in Figma.
- Page type SubPage — `<Surface>` (the kit's white panel, so the border shows) › `<FitWidth>` › CC({ modes: { ...LIGHT, 'Page type': 'SubPage' } }) — lesson: A grey border, for a card on a white page.

## States
header: States · title: Its button acts, or the whole card does · description: The card isn’t pressable: its Apply button is, and a benefit row presses when you give it onPress. onPress makes the whole card one button, named by its title. Use one or the other: a pressable card that keeps its button puts a button inside a button. The card has no disabled, selected, or loading state.
Grid `coin-new-example-grid` (two columns), each in `<FitWidth>`:
- Button acts — CC() — lesson: Only Apply presses.
- Whole card — CC({ showButton: false, onPress: noop }) — lesson: The card is one button, named by its title.

## Sizing
header: Sizing · title: 343 px wide, height from its parts · description: The card is 343 px wide, as in Figma; width sets another number or a percentage of its host. The height follows the parts you show: 12 px of padding, 8 px between parts, and 12 px between benefits. It comes out taller than Figma’s, because its badges are bigger and its benefits further apart.
Body: `<div className="coin-new-stack">` with the measured diagram, then a grid.
Measured diagram: `<Anatomy legend={false} marks={[{ kind: 'size', target: R, side: 'bottom', label: 'both' }, { kind: 'padding', target: R }, { kind: 'gap', from: header, to: `${R} > div:nth-child(2)` }]}>` › CC(). Expected 343 × 264, padding 12, gap 8; report the measured values.
Grid `coin-new-example-grid` (two columns), each in `<FitWidth>`:
- width 300 — CC({ width: 300 }) — lesson: Less room beside the picture, so a long title is cut sooner.
- Shortest full card — CC({ showHeader: false, showNudge: false }) — lesson: No badges and no upsell: the picture, benefits, and fee.

## Content
header: Content · title: Name the card, then its facts · description: Make the title the card’s name, short enough for one line, and the subtitle the kind of card. Give each benefit one fact. Put the fee label in headline, the amount in description, and the billing note in footerSubtitle. Label the button with a verb, such as Apply. Replace every sample: an empty headline, description, or footerSubtitle shows its placeholder word.
Grid `coin-new-example-grid` (two columns), each in `<FitWidth>`:
- Card offer — CC() — lesson: A name, three benefits, and the fee.
- Long title — CC({ title: 'JioFinance Gold Rewards Platinum Credit Card' }) — lesson: Cut at one line with an ellipsis.

## In context
header: In context · title: Card offers on the Cards screen · description: The screen lists the cards on offer, one under another. Each Apply starts the screen’s own application through onButtonPress; the card only lays out the offer.
Composition in `.coin-new-context` › `<FitWidth>` › `<VStack modes={{ ...LIGHT, 'Slot gap': 'M', Padding: 'None' } as Modes} style={{ width: 343 }}>` › `<Title title="Cards for you" subtitle="Pre-approved offers" modes={LIGHT} />`, CC({ onButtonPress: () => setApplied('JioFinance Gold Credit Card') }), CC({ title: 'JioFinance Everyday Credit Card', subtitle: 'Cashback on bills and groceries', trailingBadges: undefined, items: [{ icon: 'ic_voucher_cashback', title: '2% cashback on bills' }, { icon: 'ic_wallet', title: '1% cashback on everything else' }], showNudge: false, description: '₹0', footerSubtitle: 'Lifetime free', onButtonPress: () => setApplied('JioFinance Everyday Credit Card') }). Below the FitWidth, `<p className="coin-new-readout" role="status">`: “No application started” or “Applying for <card>”.

## Do & Don'ts
header: Do & Don’ts · title: Real text, a picture, a name in compact · description: Each pair shows an offer that reads cleanly next to one that shows placeholder words, an empty box, or a compact card with no name.
(Instruction, not copy: both sides of every pair sit in `<FitWidth>`.)
- Do Replace every sample: Each line says something about this card. — CC() | Don't Leave the footer empty: Headline, Description, and Subtitle show as written. — CC({ headline: undefined, description: undefined, footerSubtitle: undefined })
- Do Show the card: The picture says what’s on offer. — CC() | Don't Leave out the picture: An empty box still takes its space beside the title. — CC({ imageSource: undefined })
- Do Name the card in compact: headline carries the name the title can’t show. — CC(COMPACT) | Don't Compact with the full card’s text: The title disappears, so only the fee is left. — CC({ compact: true })

## Sources
header: Sources · title: Use the public CC Card contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (19 October build of Biscuit’s main) from the team’s private package repository. Its export is <code>CcCard</code>. Figma’s CC CARD has <code>Compact</code> and <code>Type</code> variants. The package’s card is 264 px tall where Figma’s is 242: its badges are Medium where Figma’s are Small, and its benefits sit 12 px apart instead of 4. Its benefit icons are gold where Figma’s are purple, and its upsell is its own 14 px line instead of Figma’s Nudge. Compact defaults to the 88 × 54 picture where Figma shows a 42 px Avatar, and it drops the title too. The border is white, so it shows only with Page type SubPage. Empty footer text falls back to placeholder words, and the sample badges set their label colour in code. Every published Storybook story renders the card as a pressable button with Apply inside it, and the published page is the older generated one (all reported).

## Limits
Don't show or mention Color Mode or dark mode. Don't show Semantic Intent, Context modes, hex badge colours, or a pressable card that keeps its button. Don't imply compact keeps the title, that removing the button shortens the card, that the border shows by default, or that footer lines can be hidden one by one.
