# Testimonials Card brief

slug: testimonialscard · label: Testimonials Card · public API: TestimonialsCard (+ Avatar through `avatarProps`; Title, ScrollArea, HStack, VStack and the kit's ScreenFrame)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=5267-1880 · storybook: docsUrl('testimonialscard') · stories: Default=components-testimonialscard--default, With Author=components-testimonialscard--with-author, Short Body=components-testimonialscard--short-body, Long Body=components-testimonialscard--long-body, Carousel Row=components-testimonialscard--carousel-row
checked: 26 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-c8526ae = Biscuit’s main c8526ae)
icon: a speech card with a small circle and two lines — `<><rect x="2.75" y="2.75" width="12.5" height="10.5" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" /><circle cx="6" cy="6" r="1.25" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M5 9.5h7M5 15.25l2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /></>`
keywords: testimonial, customer quote, review card, quote card

Setup: `LIGHT = { 'Color Mode': 'Light' } as Modes`; `MONO = (initials: string) => ({ style: 'Monogram' as const, monogram: initials })`.
AARAV = `{ title: 'Aarav S.', body: 'Renewing my car insurance took a minute.', avatarProps: MONO('AS') }`; PRIYA = `{ title: 'Priya M.', body: 'Simple, fast, reliable.', avatarProps: MONO('PM') }`; ROHAN = `{ title: 'Rohan K.', body: 'Setting up my first SIP took less than two minutes.', avatarProps: MONO('RK') }`; NEHA = `{ title: 'Neha J.', body: 'I see all my accounts and my gold in one place now.', avatarProps: MONO('NJ') }`.
“TC(overrides = {})” = `<TestimonialsCard modes={LIGHT} {...AARAV} {...overrides} />`. Cards sit straight on the stage, as in Storybook (no host): the card is always 180 px wide.
Selectors (no testID): `R = ':scope > div'`; avatar `${R} > [role="img"]`; text block `${R} > div:last-child`; name `${R} > div:last-child > [dir="auto"]:first-child`; quote `${R} > div:last-child > [dir="auto"]:last-child`. Check with the survey and adjust.

## Overview
summary: Use a Testimonials Card for one customer quote, their initials or photo, their name, and their words, usually in a sideways row.
principle: A real person, in their own words.
playground: `.preview-stage` › TC({ modes: { ...LIGHT, 'Avatar Size': size } as Modes, body: quote === 'Short' ? AARAV.body : 'I have used a lot of finance apps over the years, but this is the first one that made managing my money feel calm.', onPress: pressable ? () => setPresses(n => n + 1) : undefined }). Stage label "Live Coin Testimonials Card". Controls: Segment "Avatar Size" `L | M | S` (L); Segment "body" `Short | Long` (Short); OnOff "onPress" (off). Readout title "Role", value: onPress off → "Text"; on → `Button · pressed ${presses} times`; note: "onPress makes the whole card one button. It looks the same either way."

## Anatomy
header: Anatomy · title: An avatar, a name, a quote · description: A 180 px card with the avatar on top and the name and the quote under it, all starting at the left.
specimen: `<Anatomy …>` › TC(). marks: `{ kind: 'gap', from: avatar, to: text block }`.
parts:
1. Avatar — An Avatar, 42 px; avatarProps sets its initials or photo. — target: avatar — side: left
2. Name — title, the person’s name, 14 px Bold. — target: name — side: right
3. Quote — body, 12 px; it wraps and never clips. — target: quote — side: bottom
4. Card — 180 px wide, white, a 1 px grey border, 8 px corners. — target: R — side: top

## Configuration
header: Configuration · title: Initials or a photo, at three sizes · description: The card always shows an Avatar, and avatarProps sets it: style Monogram with monogram shows the person’s initials, and imageSource shows their photo. Without avatarProps it shows the Avatar’s bundled sample photo, so always set one. Avatar Size on the card’s modes sets it to 42, 36, or 29 px.
Grid `coin-new-example-grid three`:
- Avatar Size L — TC() — lesson: 42 px, the default.
- Avatar Size M — TC({ modes: { ...LIGHT, 'Avatar Size': 'M' } }) — lesson: 36 px.
- Avatar Size S — TC({ modes: { ...LIGHT, 'Avatar Size': 'S' } }) — lesson: 29 px.

## States
header: States · title: A quote, or one button · description: Without onPress the card is text, and screen readers read it once: “Testimonial from Aarav S.: …”. With onPress the whole card is one button, so give it an accessibilityLabel that says where it goes. disabled stops presses. Neither changes how the card looks: it has no pressed or disabled style.
Grid `coin-new-example-grid three`:
- Quote — TC() — lesson: Read as one line of text.
- onPress — TC({ onPress: () => {}, accessibilityLabel: 'Read Aarav S.’s full review' }) — lesson: One button; it looks the same.
- disabled — TC({ onPress: () => {}, disabled: true }) — lesson: Presses do nothing; it looks the same.

## Sizing
header: Sizing · title: 180 px wide, as tall as its quote · description: The card is always 180 px wide and never stretches to its host. Its height follows the quote: 12 px of padding, the 42 px avatar, 12 px, the name on a 17 px line, 4 px, then 16 px for each line of the quote. With a one-line quote it is 117 px tall; Figma’s is 112, with the name on a 16 px line and 2 px under it.
Body: `<Anatomy legend={false} marks={[{ kind: 'size', target: R, side: 'bottom', label: 'both' }, { kind: 'gap', from: avatar, to: text block }, { kind: 'padding', target: R }]}>` › TC(PRIYA). Expected 180 × 117, gap 12, padding 12; report the measured values.

## Content
header: Content · title: Their name, their words · description: Write title as the person’s name the way they’d sign it, such as Aarav S., not the product. Write body as what they said, in a sentence or two. Screen readers read the name and the whole quote together, and cards in a row look best with quotes of similar length.
Grid `coin-new-example-grid` (two columns):
- A short quote — TC(PRIYA) — lesson: One line: 117 px tall.
- A longer quote — TC(ROHAN) — lesson: It wraps, and the card grows to fit.

## In context
header: In context · title: A row of quotes · description: Customer quotes scroll sideways under a section title, and each card opens that customer’s full review. The cards keep their 180 px, so the row scrolls instead of squeezing them.
Composition: `.coin-new-context` › `<ScreenFrame size="screen">` › `<VStack modes={{ ...LIGHT, 'Slot gap': 'S' } as Modes} style={{ paddingVertical: 16 }}>` › `<Title title="What customers say" subtitle="From people who switched this year" modes={LIGHT} />`, then `<ScrollArea direction="horizontal" style={{ width: '100%' }}>` › `<HStack modes={{ ...LIGHT, 'Slot gap': 'S' } as Modes} style={{ paddingHorizontal: 12 }} alignVertical="flex-start">` › TC(p) for p of [AARAV, PRIYA, ROHAN, NEHA], each with `key`, `onPress={() => setOpened(p.title)}` and `accessibilityLabel={`Read ${p.title}’s full review`}`. Below the frame, `<p className="coin-new-readout" role="status">`: opened ? `Opened ${opened}’s review` : 'No review opened'.

## Do & Don'ts
header: Do & Don’ts · title: A person, not an advert · description: Each pair shows a quote that reads as a real customer next to one that doesn’t.
- Do Their initials: A face or initials that belong to the name. — TC() | Don't The sample photo: Without avatarProps, every card shows the same stranger. — TC({ avatarProps: undefined })
- Do A sentence or two: Short enough to read in a row. — TC() | Don't A paragraph of marketing: The card grows tall and stops sounding like a person. — TC({ body: 'JioFinance brings your bank accounts, cards, insurance, loans, and digital gold together in one secure app, with instant payments, smart insights, and rewards on every transaction you make.' })

## Sources
header: Sources · title: Use the public Testimonials Card contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (23 October build of Biscuit’s main) from the team’s private package repository. Figma’s card has <code>Title</code> and <code>Body</code> text properties and <code>Show Footer Text</code> and <code>Show Button</code> switches, but none of them changes a layer. The package’s name is <code>#1a1c1f</code> and its quote <code>#010101</code> where Figma’s are both <code>#0d0d0f</code>, and its name line and gap make a one-line card 117 px tall where Figma’s is 112. Initials need <code>style: 'Monogram'</code> in <code>avatarProps</code>, not just <code>monogram</code> as the Storybook docs say, and the card has no pressed look (all reported).

## Limits
Don't show or mention Color Mode or dark mode. Don't imply the card stretches to its host, truncates, has a pressed or disabled look, a rating, a date, or a link, or that monogram alone shows initials.

## dbe0e02 publish (28 October 2026): copy changes

These replace the matching lines above; the guide file has the exact strings. Evidence: `docs/evidence/testimonialscard.md`.

- checked: 28 October 2026 · built from dbe0e02 (27 October). AVATAR = `${R} [role="img"]`.
- Configuration: “The card always shows an Avatar, and avatarProps sets it: monogram shows the person’s initials, and imageSource shows their photo. Without avatarProps it shows the initials of the title. Avatar Size on the card’s modes sets it to 42, 36, or 29 px; an Avatar Size in avatarProps’ own modes wins.”
- States: “… With onPress the whole card is one button, so give it an accessibilityLabel that says where it goes; it dims while pressed and has no hover look. disabled dims it to half, stops presses, and takes it out of the Tab order.” onPress — “One button; it dims while you press it.”; disabled — “Dimmed to half; presses do nothing.”
- Sizing: “… 12 px of padding, the 42 px avatar, 12 px, the name on a 16 px line, 2 px, then 16 px for each line of the quote. With a one-line quote it is 112 px tall, as in Figma.” Content, A short quote — “One line: 112 px tall.”
- Do & Don'ts, first pair: Don't The brand’s initials — TC({ avatarProps: MONO('JF') }) — “JF” beside Aarav S. reads as the company, not the customer.
- Readout: “onPress makes the whole card one button, which dims while pressed.”
- Sources: “… The package matches Figma’s <code>#0d0d0f</code> for the name and the quote and its 112 px one-line card. <code>monogram</code> alone in <code>avatarProps</code> shows initials, and a pressable card dims while pressed.”
