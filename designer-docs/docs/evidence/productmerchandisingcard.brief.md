# Product Merchandising Card brief

slug: productmerchandisingcard · label: Product Merchandising Card (written `Product Merchan\u00ADdising Card`: a soft hyphen lets the 70 px page title break at 390 px) · public API: ProductMerchandisingCard (+ Icon for badge icons; Title and VStack for In context; the kit's FitWidth)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=5277-317 · storybook: docsUrl('productmerchandisingcard') · stories: Default=components-productmerchandisingcard--default, No special badge=components-productmerchandisingcard--no-special-badge, Monogram avatar=components-productmerchandisingcard--monogram-avatar, Pressable card=components-productmerchandisingcard--pressable-card, Narrow footer=components-productmerchandisingcard--narrow-responsive-footer
checked: 20 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-c7d3348; Biscuit's newer e60f8bd8 changes only the Storybook page)
icon: a photo card with hills and a sun — `<><rect x="2.5" y="3" width="13" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M2.75 12l3.5-3 3 2.5 2-1.5 3.75 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /><circle cx="12" cy="6.5" r="1.25" stroke="currentColor" strokeWidth="1.5" fill="none" /></>`
keywords: promo card, merchandising card, campaign card, offer card, banner, image card

Setup: `import bankHero from '../assets/bank-hero.png'` (328 × 223, two people with a phone), `import jioLogo from '../assets/jio-gold-logo.png'`. `LIGHT = { 'Color Mode': 'Light' } as Modes`; `noop = () => {}`; `W = { width: 328 }` (Figma's width; a pressable card collapses on the web without one).
“M(overrides = {})” = `<ProductMerchandisingCard imageSource={bankHero} avatarSource={jioLogo} badgeLabel="New" specialBadgeLabel="Zero balance" title="Savings account" subtitle="Open in 5 minutes" ctaLabel="Open" onCtaPress={noop} accessibilityLabel="Savings account, zero balance, open in 5 minutes" modes={LIGHT} style={W} {...overrides} />` (overrides win, including `modes` and `style`).
Every M outside the Anatomy diagrams sits in the kit's `<FitWidth>` (playground, every ExampleCard, both sides of each Do & Don't, In context).
Selectors (no testID; static root): `R = ':scope > div'`; photo `${R} > div:nth-child(1)`; header `${R} > div:nth-child(2)`; avatar `${R} > div:nth-child(2) [role="img"]`; corner badge `${R} > div:nth-child(2) > div:last-child`; footer `${R} > div:nth-child(3)`; glass badge `${R} > div:nth-child(3) > div:nth-child(2)`; text `${R} > div:nth-child(3) > div:last-child > div:first-child`; button `${R} > div:nth-child(3) > div:last-child > div:last-child`.

## Overview
summary: Use a Product Merchandising Card to promote one product or campaign on a photo, with a badge, a short title, and one action.
principle: The photo sells; the footer names it and acts.
playground: `.preview-stage` › `<FitWidth>` › M({ badgeLabel: badge ? 'New' : undefined, specialBadgeLabel: special ? 'Zero balance' : undefined, ...AVATAR[avatar], onCtaPress: () => setLast('Open pressed'), onPress: pressable ? () => setLast('Card pressed') : undefined }), where AVATAR = `{ avatarSource: {}, avatarMonogram: { avatarSource: undefined, avatarMonogram: 'JF' }, none: { showAvatar: false } }`; stage label "Live Coin Product Merchandising Card". Controls: OnOff "badgeLabel" (on); OnOff "specialBadgeLabel" (on); Segment "avatar" `avatarSource | avatarMonogram | none` (avatarSource; none sets showAvatar false); OnOff "onPress" (off). Readout title "Last press", value "None", "Open pressed" or "Card pressed"; note: "With onPress on, the whole card is a button, with Open still inside it."

## Anatomy
header: Anatomy · title: A photo, a corner, and a footer · description: The photo fills a 223 px card with 12 px corners. A header row sits on its top edge, the avatar at the left and a badge at the right, and the footer sits on its bottom edge: a glass badge, the title and subtitle, and the Button.
specimen: `<Anatomy specimenWidth={328} …>` › M() (no FitWidth here).
parts:
1. Photo — imageSource, cropped to fill the card. — target: photo — side: right, at 0.35
2. Avatar — avatarSource, or avatarMonogram’s initials, 36 px. — target: avatar — side: left
3. Corner badge — badgeLabel: a lilac Badge; hidden without a label. — target: corner badge — side: top
4. Glass badge — specialBadgeLabel: a frosted glass Badge above the title. — target: glass badge — side: left
5. Title — title, 14 px bold white, over subtitle; one line each. — target: text — side: bottom
6. Button — A small purple Button from ctaLabel and onCtaPress. — target: button — side: right
7. Footer — A blurred copy of the photo behind the text; no dark shade. — target: footer — side: bottom, at 0.9

## Configuration
header: Configuration · title: Badges, an avatar, and one look for both · description: imageSource is the photo; the card has none of its own. badgeLabel adds a lilac badge at the top right and specialBadgeLabel a frosted glass Badge above the title; each stays hidden without a label, and badgeIcon and specialBadgeIcon put an Icon before it. avatarSource shows a round picture at the top left, avatarMonogram initials instead, and showAvatar={false} removes it. ctaLabel and onCtaPress make the small purple Button. One modes object styles the corner badge and the Button together: AppearanceBrand Primary turns both gold, and Emphasis, Badge Size, and Button / Size change them too. badge, avatar, specialBadge, and cta replace those parts and don’t get the card’s modes.
Body: `<div className="coin-new-stack">` with two `coin-new-example-grid` grids (two columns), each card in `<FitWidth>`.
Grid 1:
- Full card — M() — lesson: An avatar, both badges, and an action.
- Monogram — M({ avatarSource: undefined, avatarMonogram: 'JF' }) — lesson: Initials when there’s no picture.
- Photo and footer — M({ showAvatar: false, badgeLabel: undefined, specialBadgeLabel: undefined }) — lesson: No avatar and no badges.
- Badge icons — M({ badgeIcon: <Icon iconName="ic_star" size={14} />, specialBadgeIcon: <Icon iconName="ic_offer" size={14} /> }) — lesson: An Icon before each label; the card doesn’t colour it.
Grid 2:
- AppearanceBrand Primary — M({ modes: { ...LIGHT, AppearanceBrand: 'Primary' } }) — lesson: A cream badge and a gold Button.
- Emphasis Medium — M({ modes: { ...LIGHT, Emphasis: 'Medium' } }) — lesson: A light purple Button.
- Badge Size Small — M({ modes: { ...LIGHT, 'Badge Size': 'Small' } }) — lesson: Smaller badges.
- Button / Size XS — M({ modes: { ...LIGHT, 'Button / Size': 'XS' } }) — lesson: A smaller, 24 px Button.

## States
header: States · title: The Button acts, or the whole card does · description: The card isn’t pressable: its Button is. onPress makes the whole card one button that dims slightly while pressed, announced by accessibilityLabel or the title. Open stays a separate button inside it, so use one or the other: cta={false} drops the Button. There’s no selected, disabled, or loading look.
Grid `coin-new-example-grid` (two columns), each in `<FitWidth>`:
- Button acts — M() — lesson: Only Open presses.
- Whole card — M({ onPress: noop, cta: false }) — lesson: cta={false}: the card is the one target.

## Sizing
header: Sizing · title: 223 px tall, as wide as its host · description: The card is 223 px tall unless you set height, and takes its width from its host; Figma draws it at 328 px. The photo fills and crops to the card. The header and footer sit on the photo: the footer grows upward with its content, and in a narrow card the Button drops under the title. The title and subtitle stay on one line and end in … unless disableTruncation is set.
Body: `<div className="coin-new-stack">` with the measured diagram, then a grid.
Measured diagram: `<Anatomy legend={false} specimenWidth={328} marks={[{ kind: 'size', target: R, side: 'bottom', label: 'both' }, { kind: 'padding', target: header }, { kind: 'padding', target: footer }]}>` › M(). Expected 328 × 223, header padding 12, footer padding 16; report the measured values.
Grid `coin-new-example-grid` (two columns), each in `<FitWidth>`:
- Narrow card — M({ style: { width: 168 }, height: 141, showAvatar: false, badgeLabel: undefined, specialBadgeLabel: undefined, title: 'Digital gold', subtitle: 'From ₹10', ctaLabel: 'Buy', modes: { ...LIGHT, 'Button / Size': 'XS' } }) — lesson: At 168 px the Button drops under the title.
- Shorter card — M({ height: 180 }) — lesson: height 180 crops the photo tighter.
- Long title — M({ title: 'Zero-balance savings account with free debit card', subtitle: 'Open in 5 minutes with Aadhaar and PAN' }) — lesson: Each ends in … on one line.
- disableTruncation — M({ title: 'Zero-balance savings account with free debit card', subtitle: 'Open in 5 minutes with Aadhaar and PAN', disableTruncation: true }) — lesson: They wrap, and the footer grows upward.

## Content
header: Content · title: A short name, one line, a verb · description: Make the title the product or campaign in two to four words, and the subtitle one line of support. Badge labels are a word or two, such as New or Zero balance, and ctaLabel a verb, such as Open or Buy. Pass accessibilityLabel with the offer: the photo tells a screen reader nothing.
Grid `coin-new-example-grid` (two columns), each in `<FitWidth>`:
- Product — M() — lesson: A product, one line, and Open.
- Campaign — M({ title: 'Festive rewards', subtitle: 'Earn 2× JioPoints on UPI', badgeLabel: 'Diwali', specialBadgeLabel: 'Ends Sunday', ctaLabel: 'Join', accessibilityLabel: 'Festive rewards, earn 2× JioPoints on UPI, ends Sunday' }) — lesson: A campaign, its reward, and Join.

## In context
header: In context · title: An offer on the Home screen · description: Home shows one offer under its heading. Open starts the screen’s own sign-up through onCtaPress; the card only shows the offer.
Composition in `.coin-new-context` › `<FitWidth>` › `<VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes}>` › `<Title title="For you" subtitle="Offers picked for your savings" modes={LIGHT} />` and M({ onCtaPress: () => setOpened(true) }). Below the FitWidth, `<p className="coin-new-readout" role="status">`: “Offer not opened” or “Opened the savings account sign-up”.

## Do & Don'ts
header: Do & Don’ts · title: A photo, your own avatar, a short title · description: Each pair shows a card that reads at a glance next to one that loses its text, shows a stranger, or cuts its title short.
- Do A photo: White text needs a photo behind it. — M() | Don't No photo: The card has no background, so its white title disappears. — M({ imageSource: undefined })
- Do Your own avatar: The brand’s logo in the corner. — M() | Don't No avatar source: A stranger’s stock photo appears. — M({ avatarSource: undefined })
- Do A short title: It reads in one line. — M() | Don't A long title: It ends in … on one line — M({ title: 'Zero-balance savings account with free debit card' })

## Sources
header: Sources · title: Use the public Product Merchandising Card contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (19 October build of Biscuit’s main) from the team’s private package repository. Figma’s Product Merchandising card has the booleans avatar, gradient, showBadge, and showSpecialBadge and the text title and subtitle; the package shows each badge only when you pass its label and has no gradient. Figma darkens the footer with a black gradient, while the package draws only a blurred copy of the photo, so the white text sits on a pale haze, with a lighter band where the copy is re-cropped. Badge icons and the badge, avatar, specialBadge, and cta slots don’t get the card’s modes. Without avatarSource or avatarMonogram the avatar is a stock portrait, and without imageSource the card has no background. The header and footer are a few pixels taller than Figma’s. The published Storybook still shows the older generated page (all reported).

## Limits
Don't show Dark, Page type, Profile Card Appearance, Context, Context2, context 10, Avatar Size, Context4, Semantic Intent or Button / State. Don't show the `badge`, `avatar`, `specialBadge` or `cta` slots except `cta={false}`. Don't imply a dark scrim, a live blur, that the card works without a photo, or that modes reach custom slots.
