# Thread Hero brief

slug: threadhero · label: Thread Hero · public API: ThreadHero (+ Avatar in `renderAvatar`; VStack and TransactionBubble for In context)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1699-6500 · storybook: docsUrl('threadhero') · stories: Default=components-threadhero--default, Without caption=components-threadhero--without-caption
checked: 25 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-c8526ae = Biscuit’s main c8526ae)
icon: a head over two centred lines — `<><circle cx="9" cy="5.5" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M5 12h8M6.5 15h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /></>`
keywords: contact header, payee, person header, chat header, thread header

Setup: `LIGHT = { 'Color Mode': 'Light' } as Modes`. `AV = (initials: string) => <Avatar style="Monogram" monogram={initials} />` (no modes: the hero gives it its own).
“TH(overrides = {})” = `<ThreadHero modes={LIGHT} renderAvatar={AV('RV')} title="Rahul Verma" subtitle="Banking name: RAHUL KUMAR VERMA" caption="+91 98765 43210" {...overrides} />` (overrides win; `caption: undefined` and `renderAvatar: undefined` remove them).
COLUMN = `<VStack modes={LIGHT} style={{ width: 240 }}>…</VStack>` (a 240 px app column).
LONG = `{ renderAvatar: AV('VR'), title: 'Venkatasubramanian Ramakrishnan', subtitle: 'Banking name: VENKATASUBRAMANIAN RAMAKRISHNAN', caption: 'venkatasubramanian.r@okjio' }`.
`SENT = { width: 231, maxWidth: '100%', alignSelf: 'flex-end' } as const`; `RECEIVED = { width: 231, maxWidth: '100%', alignSelf: 'flex-start' } as const`.
Selectors (no testID): `R = ':scope > div'`; avatar `${R} [role="img"]`; title `${R} > div:first-child > [role="img"] + [dir="auto"]`; subtitle `${R} > div:first-child > [dir="auto"]:last-child`; caption `${R} > [dir="auto"]`.

## Overview
summary: Use a Thread Hero at the top of a payment or chat thread to show who the other person is: their name, banking name, and number.
principle: The person first, then the name their bank knows.
playground: `.preview-stage` › TH({ renderAvatar: avatar ? AV('RV') : undefined, caption: caption ? '+91 98765 43210' : undefined }). Stage label "Live Coin Thread Hero". Controls: OnOff "renderAvatar" (on); OnOff "caption" (on).

## Anatomy
header: Anatomy · title: A portrait over three lines · description: The avatar sits on top, the name and the banking name close under it, and the caption 8 px below.
specimen: `<Anatomy …>` › TH(). marks: `{ kind: 'gap', from: subtitle, to: caption }`.
parts:
1. Avatar — renderAvatar: an Avatar, 42 px; there’s none by default. — target: avatar — side: left
2. Name — title, 16 px Semibold; a long name wraps. — target: title — side: right
3. Banking name — subtitle, 12 px grey on one line; it ellipsizes. — target: subtitle — side: left
4. Caption — caption: a phone number or UPI ID; left out, it doesn’t show. — target: caption — side: bottom

## Configuration
header: Configuration · title: Avatar and caption · description: renderAvatar takes an Avatar: the person’s photo, or their initials with style Monogram. There’s no default, so without one the name moves to the top. caption shows only when you pass it, and an empty subtitle hides the banking line. No mode changes the hero’s text. The hero passes its modes to the avatar and replaces the avatar’s own, so set Avatar Size on the hero; Figma uses L, 42 px.
Grid `coin-new-example-grid` (two columns):
- Full — TH() — lesson: Initials, name, banking name, and number.
- Without a caption — TH({ caption: undefined }) — lesson: It ends at the banking name.
- Without an avatar — TH({ renderAvatar: undefined }) — lesson: The name moves to the top.
- Without a banking name — TH({ subtitle: '' }) — lesson: An empty subtitle hides the line.

## States
header: States · title: Cut or wrapped · description: The hero has no states: it doesn’t press, and no part of it is a button. In a narrow column the name wraps, while the banking name and the caption stay on one line and end in an ellipsis; disableTruncation lets them wrap too. Both examples sit in a 240 px column.
Grid `coin-new-example-grid` (two columns), each TH inside COLUMN:
- Cut — TH(LONG) — lesson: The name wraps; the other two lines end in an ellipsis.
- Wrapped — TH({ ...LONG, disableTruncation: true }) — lesson: Every line wraps.

## Sizing
header: Sizing · title: Centred in its column · description: The hero has no width of its own: its lines centre in the width they get, and Figma draws it 360 px wide. With an avatar and a caption it is 110 px tall: a 42 px avatar, 2 px, a 20 px name, an 18 px banking name, then 8 px and an 18 px caption.
Body: measured diagram only: `<Anatomy legend={false} specimenWidth={328} marks={[{ kind: 'size', target: R, side: 'bottom', label: 'both' }, { kind: 'gap', from: subtitle, to: caption }]}>` › TH(). Expected 328 × 110, gap 8; report the measured values.

## Content
header: Content · title: The name people know, then the bank’s · description: Write title as the name the user knows the person by. Start subtitle with Banking name: and give the name their bank holds, so people can check they’re paying the right person. Use caption for a phone number or UPI ID, not a sentence.
Grid `coin-new-example-grid` (two columns):
- Phone number — TH() — lesson: +91 and ten digits, spaced.
- UPI ID — TH({ caption: 'rahul@okjio' }) — lesson: Or the ID they’re paid at.

## In context
header: In context · title: The top of a payment thread · description: The hero opens the thread, so people know who they’re paying before they see the payments below it. The thread lays it out; the hero only names the person.
Composition: `.coin-new-context` › `<VStack modes={{ ...LIGHT, 'Slot gap': 'XL' } as Modes} alignHorizontal="stretch">` › TH(), then `<TransactionBubble style={SENT} modes={{ ...LIGHT, 'Transaction Status': 'Paid' } as Modes} description="Paid to Rahul Verma" value="1,200" status="Paid" date="21 Oct 2026" />`, then `<TransactionBubble style={RECEIVED} modes={{ ...LIGHT, 'Transaction Status': 'Request' } as Modes} description="Request from Rahul Verma" value="450" status="Requested" date="Today" />`.

## Do & Don'ts
header: Do & Don’ts · title: The person, not their number · description: Each pair shows a hero people recognise at once next to one that makes them work out who it is.
- Do The name people know: Then the banking name, labelled. — TH() | Don't The phone as the title: The title is the person; the number goes in caption. — TH({ title: '+91 98765 43210', caption: undefined })
- Do Initials without a photo: A Monogram avatar with their initials. — TH() | Don't The default avatar: An Avatar with no photo shows a stranger’s portrait. — TH({ renderAvatar: <Avatar /> })

## Sources
header: Sources · title: Use the public Thread Hero contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (23 October build of Biscuit’s main) from the team’s private package repository. Figma’s Thread Hero has <code>Title</code>, <code>Subtitle</code>, and <code>Caption</code> text properties, a <code>caption</code> switch, and a nested Avatar, drawn 360 px wide. The package takes <code>title</code>, <code>subtitle</code>, <code>caption</code>, and <code>renderAvatar</code>: with no <code>renderAvatar</code> there’s no avatar, and the caption shows only when you pass one. The title wraps, as in Figma, though Storybook’s page says it ellipsizes. The hero replaces the avatar’s own modes, and both Storybook stories pass Avatar props that don’t exist, so they show the Avatar’s stock photo (reported).

## Limits
Don't show or mention Color Mode or dark mode. Don't imply the hero presses, copies the number, has a default avatar, or that the title truncates.

## dbe0e02 publish (28 October 2026): copy changes

These replace the matching lines above; the guide file has the exact strings. Evidence: `docs/evidence/threadhero.md`.

- checked: 28 October 2026 · built from dbe0e02 (27 October).
- Configuration: “… The hero passes its modes to the avatar, and the avatar’s own modes win, so set Avatar Size on the hero or on the avatar; Figma uses L, 42 px.”
- Sources: “… The title wraps, as in Figma, and the avatar’s own modes win over the hero’s. In Biscuit’s source, Storybook’s page now says the title wraps and its stories show a Monogram avatar.”
