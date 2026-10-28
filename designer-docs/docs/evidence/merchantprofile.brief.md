# Merchant Profile brief

slug: merchantprofile · label: Merchant Profile · public API: MerchantProfile (+ VStack for hosts; Avatar through avatarProps; AmountInput, MoneyValue, NoteInput, Button for In context)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1516-1103 · storybook: docsUrl('merchantprofile') · stories: Default=components-merchantprofile--default, Short name=components-merchantprofile--short-name, Long name=components-merchantprofile--long-name, Without subtitle=components-merchantprofile--without-subtitle, Multiple profiles=components-merchantprofile--multiple-profiles
checked: 28 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-dbe0e02 = Biscuit’s main dbe0e02, 27 October)
icon: a shopfront — `<><path d="M3 7.5 4.5 3h9L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" /><path d="M4 7.5v7.5h10V7.5M7.5 15v-3.5h3V15" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" /></>`
keywords: merchant header, payee, business profile, UPI merchant, shop header

Setup: `M = (m: Record<string, string> = {}) => ({ 'Color Mode': 'Light', ...m }) as Modes`; `LIGHT = M()`. `JIO` = `../assets/jio-gold-logo.png`. `INITIALS = (m: string) => ({ style: 'Monogram' as const, monogram: m })`.
“MP(props = {})” = `<MerchantProfile modes={LIGHT} title="Jio Gold" subtitle="UPI ID: jiogold@jio" avatarProps={{ imageSource: JIO }} {...props} />` (props win).
“COL(child, width = 328)” = `<VStack modes={LIGHT} style={{ width, maxWidth: '100%' }}>{child}</VStack>`: every profile outside Anatomy sits in COL (240 where stated).
Selectors (no testID): `R = ':scope > [role="heading"]'`; avatar `${R} > [role="img"]`; name `${R} > :nth-child(2)`; subtitle `${R} > :nth-child(3)`.

## Overview
summary: Use a Merchant Profile at the top of a payment to show who is being paid: the merchant’s logo, registered name, and UPI ID.
principle: Who you’re paying, before how much.
playground: `.preview-stage` › COL(MP({ modes: M({ 'Avatar Size': size }), subtitle: subtitle ? 'UPI ID: jiogold@jio' : '', avatarProps: avatar === 'imageSource' ? { imageSource: JIO } : INITIALS('JG') })). Stage label "Live Coin Merchant Profile". Controls: Segment "avatarProps" `imageSource | Monogram` (imageSource); Segment "Avatar Size" `L | M | S` (L); OnOff "subtitle" (on).

## Anatomy
header: Anatomy · title: A logo over two lines · description: The avatar sits on top, then the merchant’s name and their UPI ID, each 12 px apart and centred.
specimen: `<Anatomy specimenWidth={328} marks={[{ kind: 'gap', from: avatar, to: name }]} parts={…}>` › MP().
parts:
1. Avatar — avatarProps: the merchant’s logo, or initials with style Monogram. — target: avatar — side: left
2. Name — title: the registered name, 16 px Bold; it wraps. — target: name — side: right
3. UPI ID — subtitle, 12 px under the name; it wraps too. — target: subtitle — side: bottom

## Configuration
header: Configuration · title: The avatar and two lines · description: avatarProps goes to the Avatar: an imageSource for the merchant’s logo, or style Monogram with their initials. Avatar Size sets the avatar, 42 px at L; no mode changes the text. Leave title or subtitle out and it shows sample text, so hide the subtitle with an empty one.
Grid `coin-new-example-grid` (2 × 2), each in COL:
- Logo — MP() — lesson: imageSource: the merchant’s own logo.
- Initials — MP({ title: 'Amazon Pay', subtitle: 'UPI ID: amazonpay@apl', avatarProps: INITIALS('AP') }) — lesson: style Monogram with two letters.
- Avatar Size M — MP({ modes: M({ 'Avatar Size': 'M' }) }) — lesson: A 36 px avatar; S is 29 px.
- No subtitle — MP({ subtitle: '' }) — lesson: An empty subtitle hides the line.

## States
header: States · title: Wrapped, never cut · description: The profile has no states: it doesn’t press. In a narrow column both lines wrap and stay centred, and neither ends in an ellipsis, though Figma cuts a long UPI ID. Both examples sit in a 240 px column.
Grid `coin-new-example-grid`, each COL(…, 240):
- Long name — MP({ title: 'HDFC Bank Limited Corporate Banking Services India', subtitle: 'UPI ID: hdfccorp@hdfcbank', avatarProps: INITIALS('HB') }) — lesson: The name wraps onto three lines.
- Long UPI ID — MP({ title: 'Swiggy', subtitle: 'UPI ID: swiggy.instamart.payments@axisbank', avatarProps: INITIALS('SW') }) — lesson: The UPI ID wraps too.

## Sizing
header: Sizing · title: Centred in its column · description: The profile has no width of its own: it fills its column, keeps 16 px clear at each side, and centres its lines; Figma draws it 360 px wide. With a one-line name it’s 102 px tall: a 42 px avatar, 12 px, a 20 px name, 12 px, and a 16 px UPI ID. Figma’s name lines are 18 px.
Body: `<Anatomy legend={false} specimenWidth={328} marks={[{ kind: 'size', target: R, side: 'bottom', label: 'both' }, { kind: 'padding', target: R }, { kind: 'gap', from: avatar, to: name }]}>` › MP(). Expected 328 × 102, padding 0 / 16, gap 12; report the measured values.

## Content
header: Content · title: The registered name, then the UPI ID · description: Write title as the merchant’s registered name, the one their bank holds, so people know who they’re paying. Start subtitle with UPI ID: and give the ID they’re paying, so they can check it.
Grid `coin-new-example-grid`, each in COL:
- Registered name — MP({ title: 'Uber India Systems Private Limited', subtitle: 'UPI ID: uberindia@ybl', avatarProps: INITIALS('UI') }) — lesson: The company’s full name.
- Labelled ID — MP() — lesson: “UPI ID:” before the ID people pay.

## In context
header: In context · title: Before people pay · description: A payment screen opens with the merchant, so people know who they’re paying before they enter the amount. The screen lays out the rest and sends the payment.
Composition: `.coin-new-context` › `<VStack modes={{ ...LIGHT, 'Slot gap': 'XL' } as Modes} alignHorizontal="stretch">` › MP(), `<AmountInput modes={AMOUNT} moneyValueSlot={<MoneyValue value="1,200" currency="₹" modes={AMOUNT} />} noteInputSlot={<NoteInput value={note} onChangeText={setNote} accessibilityLabel="Add note" modes={AMOUNT} />} />` where `AMOUNT = { 'Color Mode': 'Light', Context3: 'Amount Input' } as Modes`, then `<Button label="Pay ₹1,200" onPress={() => setPaid(true)} modes={LIGHT} />`. Below the stack, `<p className="coin-new-readout" role="status">` “Paying Jio Gold, UPI ID jiogold@jio”, then “Paid ₹1,200 to Jio Gold”.

## Do & Don'ts
header: Do & Don’ts · title: The right merchant, nothing borrowed · description: Each pair shows a profile people can trust next to one that shows someone else’s details.
- Do A logo or initials: Pass the merchant’s logo, or their initials. — COL(MP({ title: 'Amazon Pay', subtitle: 'UPI ID: amazonpay@apl', avatarProps: INITIALS('AP') })) | Don't No avatarProps: The Avatar falls back to a stranger’s photo. — COL(MP({ title: 'Amazon Pay', subtitle: 'UPI ID: amazonpay@apl', avatarProps: undefined }))
- Do An empty subtitle to hide it: subtitle="" leaves just the name. — COL(MP({ subtitle: '' })) | Don't Leaving subtitle out: It shows the sample UPI ID, uberindia@ybl. — COL(MP({ subtitle: undefined }))

## Sources
header: Sources · title: Use the public Merchant Profile contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (27 October build of Biscuit’s main) from the team’s private package repository. Figma’s Merchant Profile is one component, 360 × 118, with <code>Title</code> and <code>Subtitle</code> text properties and a nested Avatar showing the merchant’s logo. The package takes <code>title</code>, <code>subtitle</code>, and <code>avatarProps</code>: a left-out line shows sample text, and the Avatar shows a stock photo until you pass a logo or initials. The name’s lines are 20 px, not 18, and a long UPI ID wraps where Figma cuts it. <code>accessibilityLabel</code> does nothing, and the whole profile is a heading (reported).

## Limits
Don't show or mention Color Mode or dark mode. Don't show `style`, `accessibilityLabel`, `avatarProps.modes`, or modes other than Avatar Size. Don't imply the profile presses, truncates, or names itself for screen readers, or that a left-out title or subtitle disappears.
