# Profile Card brief

slug: profilecard · label: Profile Card · public API: ProfileCard (+ ListItem, Divider, Button, Text in the body; Title and VStack for In context; the kit's FitWidth)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=6914-38498 · storybook: docsUrl('profilecard') · stories: Default=components-profilecard--default, Premium=components-profilecard--premium, Header only=components-profilecard--header-only, Pressable handles=components-profilecard--pressable-handles, With image avatar=components-profilecard--with-image-avatar
checked: 20 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-c7d3348; Biscuit's newer e60f8bd8 changes only the Storybook page)
icon: a card with a round avatar and two lines — `<><rect x="2.5" y="3" width="13" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.5" fill="none" /><circle cx="6.5" cy="7.5" r="1.75" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M9.75 7h3M9.75 9.5h2M5.5 12h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /></>`
keywords: profile header, identity card, UPI ID, account card, jioPlus card

Setup: `import jioLogo from '../assets/jio-gold-logo.png'`. `LIGHT = { 'Color Mode': 'Light' } as Modes`; `PREMIUM = { 'Color Mode': 'Light', 'Profile Card Appearance': 'Premium' } as Modes`; `S = { 'Button / Size': 'S' } as Modes`; `noop = () => {}`.
“HANDLES(onCopy = noop)” = `[{ label: 'priya@jio', iconName: 'ic_copy', onPress: onCopy }, { label: '98765 43210', iconName: 'ic_confirm' }]`.
“BODY(onUpgrade = noop, onAccounts = noop)” = `<><ListItem layout="Horizontal" title="JioFinance+" showSupportText={false} navArrow={false} trailing={<Button label="Upgrade" onPress={onUpgrade} modes={S} />} /><Divider /><ListItem layout="Horizontal" title="Linked bank accounts" showSupportText={false} onPress={onAccounts} /></>` (no modes on the rows: the card gives them its own).
“BODY_DARK” = `<><ListItem layout="Horizontal" title="Credit score" supportText="Updated today" navArrow={false} trailing={<Button label="Check" onPress={noop} modes={S} />} /><Divider /><Text>Member since 2021</Text></>`.
“PC(overrides = {})” = `<ProfileCard name="Priya Sharma" monogram="PS" upiHandles={HANDLES()} modes={LIGHT} {...overrides} />` (overrides win; the card keeps its own 344 px width).
Every PC outside the Anatomy diagrams sits in the kit's `<FitWidth>`, except the Sizing “Fills its host” example.
Selectors (no testID): `R = ':scope > div'`; header `${R} > div:nth-child(1)`; leading `${R} > div:nth-child(1) > div > div:first-child`; avatar `${leading} > div:first-child [role="img"]`; badge `${leading} > div:last-child [role="img"]`; text `${R} > div:nth-child(1) > div > div:last-child`; name `${text} > div:first-child > [dir="auto"]`; handles `${text} > div:last-child`; divider `${R} > [role="presentation"]`; first body row `${R} > :nth-child(3)`. Check them with the Anatomy self-check.

## Overview
summary: Use a Profile Card to show who the user is on a dark panel: initials or a photo, a name, UPI handles, and account rows below.
principle: Who you are, and the handles you share.
playground: `.preview-stage` › `<FitWidth>` › PC({ upiHandles: HANDLES(() => setLast('Copied priya@jio')), children: body ? BODY(() => setLast('Upgrade pressed'), () => setLast('Opened Linked bank accounts')) : undefined, badgeIcon: badge ? undefined : null, modes: { ...LIGHT, 'Profile Card Appearance': appearance } }); stage label "Live Coin Profile Card". Controls: Segment "Profile Card Appearance" `Default | Premium` (Default); OnOff "children" (on); OnOff "badgeIcon" (on: the default QR badge; off: `null`). Readout title "Last press", value "None", then the latest press; note: "Only the pressable handle and the body rows act; the card itself doesn’t."

## Anatomy
header: Anatomy · title: Who, how to pay them, and what’s below · description: A navy panel holds a header row, the avatar with its QR badge beside the name and the UPI handles, and, when you pass children, a divider and the body rows.
specimen: `<Anatomy specimenWidth={344} …>` › PC({ children: BODY() }) (no FitWidth here).
parts:
1. Avatar — monogram, or a photo from avatarSource, 42 px. — target: avatar — side: left
2. QR badge — badgeIcon on a white disc; null removes it. — target: badge — side: bottom
3. Name — name, 14 px bold, on one line. — target: name — side: top
4. UPI handles — upiHandles: a pill each; onPress makes a pill a button. — target: handles — side: right
5. Divider — Drawn only when there’s a body; showDivider hides it. — target: divider — side: left
6. Body — children: your rows, given the card’s on-dark modes. — target: first body row — side: right
7. Panel — A navy panel, 12 px corners, 20 px padding, 344 px wide. — target: R — side: left, at 0.9

## Configuration
header: Configuration · title: A header, a body, and a gold option · description: name, monogram, and upiHandles make the header. avatarSource shows a photo in place of the initials, badgeIcon={null} removes the QR badge, and upiHandles={[]} leaves just the name. children is the body, under a divider; leave it out for a header-only card. header replaces the avatar, name, and handles together. Profile Card Appearance Premium turns the panel gold. The card passes its on-dark modes to everything inside, so ListItem titles, icons, chevrons, and Buttons turn white or gold on their own; plain Text and support text don’t.
Grid `coin-new-example-grid` (two columns, six cards), each in `<FitWidth>`:
- Header only — PC() — lesson: No children: no divider and no body.
- With a body — PC({ children: BODY() }) — lesson: Account rows under a divider.
- Premium — PC({ modes: PREMIUM }) — lesson: Profile Card Appearance Premium: a gold panel.
- Premium with a body — PC({ children: BODY(), modes: PREMIUM }) — lesson: The rows’ titles and Buttons follow the gold.
- Photo — PC({ name: 'Jio Gold', avatarSource: jioLogo, upiHandles: [{ label: 'jiogold@jio', iconName: 'ic_copy', onPress: noop }] }) — lesson: avatarSource in place of initials, here a business’s logo.
- Name only — PC({ badgeIcon: null, upiHandles: [] }) — lesson: No QR badge and no handles.

## States
header: States · title: Handles you can press · description: The card itself isn’t pressable. A handle with onPress is a button that shrinks a little while pressed, usually to copy it; one without is plain text. Body rows keep their own states, such as a ListItem with onPress. There’s no selected, disabled, or loading state.
Grid `coin-new-example-grid` (two columns), each card in `<FitWidth>`:
- Copy a handle — PC({ upiHandles: HANDLES(() => setCopied(true)) }), then under the FitWidth `<p className="coin-new-readout" role="status">`: “Nothing copied” or “Copied priya@jio” — lesson: Press priya@jio: its onPress copies it.
- Text handle — PC({ upiHandles: [{ label: '98765 43210', iconName: 'ic_confirm' }] }) — lesson: Without onPress, a handle is plain text.

## Sizing
header: Sizing · title: 344 px, or the host’s width · description: The card is 344 px wide, as Figma draws it; width takes another number, or a percentage such as '100%' to fill its host. Height follows the content: 20 px of padding, and 12 px between the header, the divider, and each body row. A long name ends in …, and the handles wrap onto another line.
Body: `<div className="coin-new-stack">` with the measured diagram, then a grid.
Measured diagram: `<Anatomy legend={false} specimenWidth={344} marks={[{ kind: 'size', target: R, side: 'bottom', label: 'both' }, { kind: 'padding', target: R }, { kind: 'gap', from: header, to: divider }]}>` › PC({ children: BODY() }). Expected 344 × 190, padding 20, gap 12; report the measured values.
Grid `coin-new-example-grid` (two columns):
- Fills its host — `<div className="coin-new-host wide">` › PC({ width: '100%' }) (no FitWidth) — lesson: width '100%' fills a 360 px host.
- Long name and handle — `<FitWidth>` › PC({ name: 'Shruti Chandarshekhar Rai Venkataraman', monogram: 'SR', upiHandles: [{ label: 'shrutichandarshekhar.rai@okjio', iconName: 'ic_copy' }, { label: '98765 43210', iconName: 'ic_confirm' }] }) — lesson: The name ends in …, and the handles wrap.

## Content
header: Content · title: A name, initials, and handles as people type them · description: name is the person’s display name, and monogram their two initials. A handle’s label is the UPI ID or the phone number exactly as people would type it: use ic_copy on a handle people copy and ic_confirm on a verified number. Keep body rows to short titles, with one Button or a chevron each.
Grid `coin-new-example-grid` (two columns), each in `<FitWidth>`:
- Two handles — PC() — lesson: A UPI ID to copy and a verified number.
- Short rows — PC({ children: BODY() }) — lesson: A title with a Button, and a title with a chevron.

## In context
header: In context · title: The Profile screen · description: The card heads the Profile screen. Copying a handle and opening a row are the screen’s own work, through each handle’s and row’s onPress; the card only lays them out.
Composition in `.coin-new-context` › `<FitWidth>` › `<VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes}>` › `<Title title="Profile" subtitle="Your account and payments" modes={LIGHT} />` and PC({ upiHandles: HANDLES(() => setLast('Copied priya@jio')), children: BODY(() => setLast('Opened the JioFinance+ upgrade'), () => setLast('Opened linked bank accounts')) }). Below the FitWidth, `<p className="coin-new-readout" role="status">`: “No action yet”, then the latest action.

## Do & Don'ts
header: Do & Don’ts · title: Light rows, short handles, the card’s own style · description: Each pair shows a card that reads on its navy panel next to one that hides its text, lets a handle run past the panel, or covers it. Both sides sit in `<FitWidth>`.
- Do Titles and Buttons in the body: They turn white and gold on the navy panel. — PC({ children: BODY() }) | Don't Support text or plain Text in the body: They stay dark and almost disappear. — PC({ children: BODY_DARK })
- Do Short handles: Each fits its pill. — PC() | Don't A sentence as a handle: It never ends in …, so the pill runs past the panel. — PC({ upiHandles: [{ label: 'Tap to copy my UPI ID priya@jio and pay me back', iconName: 'ic_copy' }] })
- Do The card’s own row style: Rows sit on the navy panel. — PC({ children: BODY() }) | Don't List Item Style Boxed: White boxes cover the header and rows, and the name disappears. — PC({ children: BODY(), modes: { ...LIGHT, 'List Item Style': 'Boxed' } })

## Sources
header: Sources · title: Use the public Profile Card contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (19 October build of Biscuit’s main) from the team’s private package repository. Figma’s Profile Card has one property, the body slot; the name, handles, badge, and photo are overrides there, and Premium is a variable mode. The card gives its children on-dark modes, but plain Text and ListItem support text stay dark on the navy panel, as in Figma’s own sample, and a child’s own modes override the card’s. The header is 48 px tall where Figma’s is 47, and the QR glyph is near-black, not grey. List Item Style Boxed covers the card in white boxes, and a long handle never ends in …, so its pill runs past the card. The published Storybook is older than the installed package and still shows the older generated page (all reported).

## Limits
Don't show Dark, Page type, Context, Badge Size, Avatar Size, Icon Capsule Size, Attached Border, Slot gap, AppearanceBrand, Emphasis or Semantic Intent; List Item Style only in its Don't. Don't recommend Page type JioPlus to make body text light. Don't show a `header` override, or imply the card is pressable or that body text turns light.
