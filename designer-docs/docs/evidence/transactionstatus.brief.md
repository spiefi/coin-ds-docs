# Transaction Status brief

slug: transactionstatus · label: Transaction Status · public API: TransactionStatus (+ TransactionBubble and VStack for In context)
figma: https://www.figma.com/design/dSlK8ueQ7wlbyUSZd4f8QO/Coin-Subcomponents?node-id=152-1242 · storybook: docsUrl('transactionstatus') · stories: Default=components-transactionstatus--default
checked: 25 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-c8526ae = Biscuit’s main c8526ae)
icon: a small circle mark, then a line — `<><circle cx="5" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M5 7.6v1.6M11 9h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /></>`
keywords: payment status, status line, paid, declined, expired, request

Setup: `LIGHT = { 'Color Mode': 'Light' } as Modes`; `ts = (m: string) => ({ ...LIGHT, 'Transaction Status': m } as Modes)`.
“TS(overrides = {})” = `<TransactionStatus status="Paid" date="21 Oct 2026" modes={ts('Paid')} {...overrides} />` (overrides win).
`COLUMN` = `<VStack modes={LIGHT} style={{ width: 200 }}>…</VStack>` around a TS (a 200 px app column; the kit’s dashed host is a flex row, where the line doesn’t shrink).
`BUBBLE = { width: 231, maxWidth: '100%' } as const` (Figma’s bubble width) for In context.
Selectors (no testID): `R = ':scope > div'`; mark `${R} > svg`; text `${R} > [dir="auto"]`.

## Overview
summary: Use a Transaction Status for the state and date of one payment on one line, as at the foot of a Transaction Bubble.
principle: One word for the state; the mode colours the mark.
playground: `.preview-stage` › TS({ status: word, modes: ts(mode) }). Stage label "Live Coin Transaction Status". Controls: Segment "Transaction Status" `Request | Paid | Declined | Expired` (Paid); Segment "status" `Requested | Paid | Declined | Expired` (Paid). Readout title "Mark", value Request → "Orange", Paid → "Green", Declined → "Red", Expired → "Grey"; note: "The mode sets the mark’s colour and nothing else: the words are whatever you pass in status."

## Anatomy
header: Anatomy · title: A mark and one line of text · description: An 18 px mark, then the status and the date as one line of text, joined by a middle dot.
specimen: `<Anatomy …>` › TS(). marks: `{ kind: 'gap', from: mark, to: text }`.
parts:
1. Mark — The same “!” glyph in every mode, 18 px; the Transaction Status mode sets its colour. — target: mark — side: left
2. Status and date — status, a middle dot, then date: one text on one line. — target: text — side: top
3. Line — No width of its own: as wide as its words. — target: R — side: bottom

## Configuration
header: Configuration · title: Four modes, any words · description: The Transaction Status mode colours the mark: Request orange (the default), Paid green, Declined red, Expired grey. status and date are free text, and the mode doesn’t change them, so set the word and the mode together. The mark is the same “!” in every mode; Figma swaps it for a tick or a cross.
Grid `coin-new-example-grid` (two columns):
- Request — TS({ status: 'Requested', date: 'Today', modes: ts('Request') }) — lesson: Orange: a request still waiting.
- Paid — TS() — lesson: Green: the money went through.
- Declined — TS({ status: 'Declined', modes: ts('Declined') }) — lesson: Red: the bank turned it down.
- Expired — TS({ status: 'Expired', date: '20 Mar 2025', modes: ts('Expired') }) — lesson: Grey: the request ran out.

## States
header: States · title: One line, or wrapped · description: The line has no states of its own: it doesn’t press, select, or load. In a column narrower than the words, it ellipsizes at the end, so the date goes first; disableTruncation lets it wrap instead. Both examples sit in a 200 px column.
Grid `coin-new-example-grid` (two columns), each TS inside COLUMN:
- One line — TS({ status: 'Declined', date: '21 October 2026, 4:15 pm', modes: ts('Declined') }) — lesson: The date is cut, and the mark is squeezed.
- Wrapped — the same TS plus `disableTruncation` — lesson: The date moves to a second line.

## Sizing
header: Sizing · title: 18 px tall, as wide as its words · description: The line is 18 px tall: an 18 px mark, 4 px of space, then 12 px text on a 16 px line. It has no width of its own and grows with its words. A narrower column cuts them at the end and squeezes the mark; inside a Transaction Bubble the line doesn’t shrink at all and runs past the bubble’s edge.
Body: measured diagram only: `<Anatomy legend={false} marks={[{ kind: 'size', target: R, side: 'bottom', label: 'both' }, { kind: 'gap', from: mark, to: text }]}>` › TS(). Expected 129 × 18, gap 4; report the measured values.

## Content
header: Content · title: One word and a short date · description: Write status as one word that matches the mode: Requested, Paid, Declined, or Expired. Write date short, such as 21 Oct 2026, or Today for a recent payment; the line adds the middle dot. The mark is the same for every state, so the word has to say it.
Grid `coin-new-example-grid` (two columns):
- A date — TS() — lesson: One word, then the day.
- Today — TS({ date: 'Today' }) — lesson: A recent payment can say Today.

## In context
header: In context · title: On the payments in a thread · description: Every Transaction Bubble ends with a Transaction Status. Set the Transaction Status mode on the bubble, as in Figma: the bubble passes its modes to the line, and its status and date props give the words.
Composition: `.coin-new-context` › `<VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes} alignHorizontal="flex-end">` with three `<TransactionBubble style={BUBBLE} …>`:
1. description "Paid to Priya Sharma", value "1,200", status "Paid", date "21 Oct 2026", modes ts('Paid')
2. description "Request to Rahul Verma", value "450", status "Requested", date "Today", modes ts('Request')
3. description "Payment to Uber India", value "56", status "Declined", date "20 Mar 2025", modes ts('Declined')

## Do & Don'ts
header: Do & Don’ts · title: The word and the colour agree · description: Each pair shows a line people read correctly next to one whose colour or length works against it.
- Do Mode matches the word: Expired with the Expired mode: a grey mark. — TS({ status: 'Expired', date: '20 Mar 2025', modes: ts('Expired') }) | Don't The default mode: Expired keeps the orange Request mark, as if it still needs action. — TS({ status: 'Expired', date: '20 Mar 2025', modes: LIGHT })
- Do One word: Declined and a short date fit beside the chevron. — `<TransactionBubble style={BUBBLE} description="Payment to Uber India" value="56" status="Declined" date="21 Oct 2026" modes={ts('Declined')} />` | Don't A sentence: In a bubble, the line runs past the edge. — the same bubble with status="Declined by your bank"

## Sources
header: Sources · title: Use the public Transaction Status contract · description: The guide compares the Figma subcomponent with the installed package and its Storybook story.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (23 October build of Biscuit’s main) from the team’s private package repository. In Figma, Transaction Status is a subcomponent (Coin Subcomponents) with no properties: its mode picks the icon, the colour, and the word together. In the package the mode only colours the mark, which is always “!”, and <code>status</code> and <code>date</code> are free text; by default an orange mark sits beside “Expired”, where Figma’s Expired is grey. Figma’s line ends in a chevron; in the package the chevron belongs to Transaction Bubble. When the words don’t fit a column, the mark shrinks with them, and inside a Transaction Bubble a long line runs past the bubble’s edge (all reported).

## Limits
Don't show or mention Color Mode or dark mode. Don't imply the mark changes shape, that the mode changes the words, that the line presses, or that it has its own chevron.

## dbe0e02 publish (28 October 2026): copy changes

These replace the matching lines above; the guide file has the exact strings. Evidence: `docs/evidence/transactionstatus.md`.

- checked: 28 October 2026 · built from dbe0e02 (27 October). MARK = `${R} > div:first-child`. MARKS = { Request: 'Orange “!”', Paid: 'Green tick', Declined: 'Red cross', Expired: 'Grey “!”' } for the Readout.
- Anatomy, Mark: “18 px; the mode picks a tick, a cross, or “!”, and its colour.”
- Configuration: “The Transaction Status mode sets the mark, as in Figma: Request an orange “!”, Paid a green tick, Declined a red cross, and Expired, the default, a grey “!”. status and date are free text that the mode doesn’t change, so set the word and the mode together.” Captions: “An orange “!”: a request still waiting.”, “A green tick: the money went through.”, “A red cross: the bank turned it down.”, “A grey “!”: the request ran out.”
- States, One line: “The date is cut; the mark keeps its 18 px.” Sizing: “… A narrower column, or a Transaction Bubble, cuts them at the end, and the mark keeps its 18 px.” Content: “… Request and Expired share the “!” mark, so the word has to say which.”
- Do & Don'ts: first Don't — TS({ status: 'Expired', date: '20 Mar 2025', modes: ts('Request') }) — A mode that disagrees: “Expired with the Request mode gets an orange mark, as if it still needs action.” Second Don't caption: “In a bubble, the line is cut and the date is lost.”
- Readout: “The mode sets the mark’s icon and colour and nothing else: the words are whatever you pass in status.”
- Sources: “… In the package the mode picks the mark’s icon and colour, as in Figma, and <code>status</code> and <code>date</code> are free text; with no mode it is Expired: a grey “!” beside “Expired”. … When the words don’t fit a column or a Transaction Bubble, they end in an ellipsis and the mark keeps its 18 px.”
