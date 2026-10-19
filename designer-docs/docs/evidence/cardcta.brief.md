# Card CTA brief

slug: cardcta · label: Card CTA · public API: CardCTA (+ Button, IconCapsule, Image for slots; Title and VStack for In context; the kit's FitWidth)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3693-4477 · storybook: docsUrl('cardcta') · stories: Default=components-cardcta--default, Rating=components-cardcta--rating, Sip=components-cardcta--sip, Custom slots=components-cardcta--with-custom-slots, Short content=components-cardcta--short-content, Long button label=components-cardcta--long-button-label
checked: 19 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-a116616, which has the 7b7c79f0 rewrite; CardCTA.tsx unchanged on Biscuit's main c7d3348)
icon: a card with two text lines and a dot — `<><rect x="2.5" y="3.5" width="13" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M5 7h5M5 11.5h3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /><circle cx="12.5" cy="7.5" r="1.5" stroke="currentColor" strokeWidth="1.5" fill="none" /></>`
keywords: CTA card, call to action, prompt card, promo card, rating card, SIP card

Setup: `import bankHero from '../assets/bank-hero.png'`, `import jioLogo from '../assets/jio-gold-logo.png'`. `LIGHT = { 'Color Mode': 'Light' } as Modes`; `noop = () => {}`; `W = { width: 320 } as const` (Storybook's column and Figma's width).
COPY = {
  cta: { title: 'Set up UPI Number', body: 'Receive money on your mobile number.', iconName: 'ic_upi_number', buttonLabel: 'Set up' },
  rating: { ratingLabel: '+28 points', title: 'Your credit score rose', body: 'Paying your bills on time helped. Was this useful?', buttonLabel: 'Save' },
  sip: { title: 'Start a gold SIP', body: 'Buy 24K gold every month, automatically.', headline: 'Jio Gold SIP', description: '₹500', subtitle: 'every month', buttonLabel: 'Start SIP', avatarSource: jioLogo },
}
“CTA(type, overrides = {})” = `<CardCTA type={type} {...COPY[type]} onPressButton={noop} modes={LIGHT} style={W} {...overrides} />` (overrides win, including `modes` and `style`; pass `modes` whole, as given).
Important: on the web the card's default button adds a hidden 9,999 px measuring copy of its label, which makes the page scroll sideways unless something around the card clips it. So every CardCTA outside the Anatomy diagrams sits inside the kit's `<FitWidth>`: in the playground stage, in every ExampleCard, in both sides of every Do & Don't, and around the In context screen. Never use `buttonSlot` or other props to avoid it except where an example below says so.
Selectors (no testID; `R = ':scope > div'`, the card root; cta only): left `${R} > div:first-child`; text wrap `${R} > div:first-child > div:first-child`; title `${R} > div:first-child > div:first-child > [dir="auto"]:first-child`; body `${R} > div:first-child > div:first-child > [dir="auto"]:last-child`; button wrap `${R} > div:first-child > div:last-child`; icon `${R} > div:last-child > [role="img"]`.

## Overview
summary: Use a Card CTA to offer one next step, such as setting up UPI or rating an insight, with a title, a short line, and a button.
principle: One prompt, one button.
playground: `.preview-stage` › `<FitWidth>` › CTA(type, { modes: { ...LIGHT, Emphasis: emphasis }, onPressButton: () => setLast(`${COPY[type].buttonLabel} pressed`), onPressLike: () => setLast('Liked'), onPressDislike: () => setLast('Disliked') }); stage label "Live Coin Card CTA". Controls: Segment "type" `cta | rating | sip` (cta); Segment "Emphasis" `High | Medium | Low` (High). Readout title "Last action", value "None", "<label> pressed", "Liked" or "Disliked"; note: "The card itself isn’t pressable: only its buttons act."

## Anatomy
header: Anatomy · title: A prompt, its button, and an icon · description: The cta type splits a white panel in two: the title, the body, and a button take 3/5 of the width, and an icon sits in the rest. rating and sip keep the title, body, and button, and add their own parts, shown under Configuration.
specimen: `<Anatomy specimenWidth={320} …>` › CTA('cta') (no FitWidth here).
parts:
1. Title — title: the offer, 16 px bold; nothing cuts it short. — target: title — side: top
2. Body — body: what the step gives, 14 px; it wraps. — target: body — side: left
3. Button — A small purple Button from buttonLabel and onPressButton. — target: button wrap — side: bottom
4. Icon — An IconCapsule from iconName; iconSlot replaces it. — target: icon — side: right
5. Panel — A white panel with 12 px corners and a 1 px border. — target: R — side: right, at 0.85

## Configuration
header: Configuration · title: Three types, and the button’s look · description: type sets the layout: cta, the default, puts the title, body, and button beside an icon; rating adds a badge above and like and dislike beside the button; sip adds an avatar and a line of facts above the button. Props for one type do nothing on the others. iconSlot, buttonSlot, ratingBadgeSlot, ratingActionsSlot, and avatarSlot replace a type’s parts and get the card’s modes. The button is always purple at size S: Emphasis makes it lighter, and Semantic Intent System gives it and the icon AppearanceSystem’s status colour. AppearanceBrand changes only the rating badge. Context CTACard enlarges the icon, and Page type SubPage and context 8 Section add a grey border.
Body: `<div className="coin-new-stack">` holding two grids, each card in `<FitWidth>`:
Grid `coin-new-example-grid` (two columns):
- cta — CTA('cta') — lesson: An icon and one button, to set something up.
- rating — CTA('rating') — lesson: A badge, Save, and like or dislike, to react to an insight.
- sip — CTA('sip') — lesson: An avatar and two facts, to start a plan.
- Slots — CTA('cta', { title: 'Scan any QR code', body: 'Pay any UPI app or shop from your camera.', iconSlot: <IconCapsule iconName="ic_scan" />, buttonSlot: <Button label="Scan" onPress={noop} /> }) — lesson: Your own IconCapsule and Button in iconSlot and buttonSlot.
Grid `coin-new-example-grid` (two columns):
- Emphasis Medium — CTA('cta', { modes: { ...LIGHT, Emphasis: 'Medium' } }) — lesson: A light purple button.
- Emphasis Low — CTA('cta', { modes: { ...LIGHT, Emphasis: 'Low' } }) — lesson: A text button.
- Semantic Intent System — CTA('cta', { title: 'Complete your KYC', body: 'Finish by 31 October to keep investing.', iconName: 'ic_kyc', buttonLabel: 'Continue', modes: { ...LIGHT, 'Semantic Intent': 'System', AppearanceSystem: 'warning' } }) — lesson: AppearanceSystem warning turns the icon and button orange.
- AppearanceBrand Secondary — CTA('rating', { modes: { ...LIGHT, AppearanceBrand: 'Secondary' } }) — lesson: The rating badge turns purple, as Figma draws it.
- Context CTACard — CTA('cta', { modes: { ...LIGHT, Context: 'CTACard' } }) — lesson: A larger, 58 px icon.
- Page type SubPage — CTA('cta', { modes: { ...LIGHT, 'Page type': 'SubPage' } }) — lesson: A light grey border.

## States
header: States · title: Rating with or without Save · description: The card itself isn’t pressable; its buttons are. On rating, showButton={false} removes Save and moves like and dislike to the start, and showRatingActions={false} removes like and dislike. Like and dislike only respond when you pass onPressLike and onPressDislike. The card’s button can’t be disabled.
Grid `coin-new-example-grid` (two columns), each in `<FitWidth>`:
- Reactions only — CTA('rating', { showButton: false }) — lesson: Like and dislike, without Save.
- Save only — CTA('rating', { showRatingActions: false }) — lesson: Save, without reactions.

## Sizing
header: Sizing · title: Your layout sets the width · description: The card fills its host’s width; Figma and Storybook draw it at 320 px. On cta the text takes 3/5 of the width and the icon 2/5, padded 22 px top and bottom. Height follows the text: nothing cuts the title or body short, so longer copy or a narrower host makes the card taller. The button grows with its label and never wraps.
Body: `<div className="coin-new-stack">` with the measured diagram, then a grid.
Measured diagram: `<Anatomy legend={false} specimenWidth={320} marks={[{ kind: 'size', target: R, side: 'bottom', label: 'both' }, { kind: 'padding', target: left }, { kind: 'gap', from: text wrap, to: button wrap }]}>` › CTA('cta'). Expected 320 wide, padding 22/8/22/12, gap 16; report the measured values.
Grid `coin-new-example-grid` (two columns), each in `<FitWidth>`:
- Long copy — CTA('cta', { body: 'Receive money on your mobile number. There’s no account number or IFSC to share, and it works with every UPI app.' }) — lesson: More text, a taller card: nothing cuts it short.
- Narrow host — CTA('cta', { style: { width: 260 } }) — lesson: At 260 px the body wraps onto more lines.

## Content
header: Content · title: The offer, what it gives, and a verb · description: Make the title the offer, the body what the person gets, and the button label a verb, such as Set up, Save, or Start SIP. Keep the title to one line and the body to three: the card doesn’t cut either short. On sip, the headline names the plan, the description is its main fact, and the subtitle qualifies it.
Grid `coin-new-example-grid` (two columns), each in `<FitWidth>`:
- Offer, benefit, verb — CTA('cta') — lesson: “Set up UPI Number”, what it gives, and “Set up”.
- Plan facts — CTA('sip') — lesson: “Jio Gold SIP”, “₹500”, and “every month”.

## In context
header: In context · title: A setup prompt on the Home screen · description: Home shows the prompt under the greeting. Set up opens the screen’s own setup flow through onPressButton; the card doesn’t do the setup or remove itself.
Composition in `.coin-new-context` › `<FitWidth>` › `<VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes}>` › `<Title title="Good morning, Priya" subtitle="Your balance is ₹12,450" modes={LIGHT} />` and CTA('cta', { onPressButton: () => setOpened(true) }). Below the FitWidth, `<p className="coin-new-readout" role="status">`: "Setup not started" or "Opened UPI Number setup".

## Do & Don'ts
header: Do & Don’ts · title: One short action, the right picture, clean corners · description: Each pair shows a card that reads at a glance next to one that overflows, shows a stranger, or breaks its corners. Both sides sit in `<FitWidth>`.
- Do One verb on the button: “Set up” names the action. — CTA('cta') | Don't A long button label: The button never wraps, so it runs out of the card. — CTA('cta', { buttonLabel: 'Set up your UPI Number to receive money' })
- Do Pass the plan’s picture: avatarSource shows the plan’s own mark. — CTA('sip') | Don't Leave out avatarSource: A stranger’s photo appears in its place. — CTA('sip', { avatarSource: undefined })
- Do An icon in the capsule: The card keeps its rounded corners. — CTA('cta') | Don't A full-bleed picture: Its corners poke out past the card’s rounded corners. — CTA('cta', { iconSlot: <Image imageSource={bankHero} width="100%" height="100%" accessibilityLabel="Two people smiling at a phone" />, modes: { ...LIGHT, MediaBlock: 'Image' } })

## Sources
header: Sources · title: Use the public Card CTA contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (16 October build) from the team’s private package repository. Figma’s Card/CTA has the same three types, but its CTA type shows a badge, a caption line, and a full-bleed picture, while the package’s cta shows an icon and no badge or caption; a picture passed through <code>iconSlot</code> isn’t clipped to the card’s corners. Figma’s rating badge is purple because that variant sets AppearanceBrand Secondary; the package’s is gold until you pass it. Nothing cuts the title or body short, a long button label runs out of the card, <code>ratingMediaAlign</code> doesn’t move the default badge, and without <code>avatarSource</code> sip shows a stock photo. On the web the default button adds a hidden 9,999 px copy of its label that makes a page scroll sideways unless something around the card clips it, so these examples sit in hosts that clip (all reported). The published Storybook still shows the older generated page.

## Limits
Don't show Dark, Context Nudge&Alert or ListItem, Button / State, ratingBadgeSlot, ratingActionsSlot, avatarSlot, or ratingMediaAlign examples. Don't imply the card is pressable or can be disabled, that it clamps text, or that it hides itself after the action.
