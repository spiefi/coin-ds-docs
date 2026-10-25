# Transaction Bubble brief

slug: transactionbubble · label: Transaction Bubble · public API: TransactionBubble (+ Text in `children`, TransactionStatus in `statusSlot`; VStack for In context)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1517-1155 · storybook: docsUrl('transactionbubble') · stories: Default=components-transactionbubble--default, Successful transaction=components-transactionbubble--successful-transaction, With press and slot=components-transactionbubble--with-press-and-slot
checked: 25 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-c8526ae = Biscuit’s main c8526ae)
icon: a rounded bubble with two text lines and a chevron — `<><rect x="1.5" y="3" width="15" height="12" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M4.5 7h6M4.5 11h4M12.5 9.8l1.2 1.2-1.2 1.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /></>`
keywords: payment bubble, chat payment, payment in thread, transaction row, payment card

Setup: `LIGHT = { 'Color Mode': 'Light' } as Modes`; `ts = (m: string) => ({ ...LIGHT, 'Transaction Status': m } as Modes)`; `noop = () => {}`.
`BUBBLE = { width: 231, maxWidth: '100%' } as const` (Figma’s width); `SENT = { ...BUBBLE, alignSelf: 'flex-end' } as const`; `RECEIVED = { ...BUBBLE, alignSelf: 'flex-start' } as const`.
“TB(overrides = {})” = `<TransactionBubble style={BUBBLE} description="Paid to Priya Sharma" value="1,200" status="Paid" date="21 Oct 2026" modes={ts('Paid')} {...overrides} />` (overrides win). Every bubble on the page is a TB.
NOTE = `<Text text="For Saturday’s dinner" />` (no modes: the bubble gives it its own).
Selectors (static root, no testID): `R = ':scope > div'`; `M = ${R} > div`; description `${M} > div:first-child > [dir="auto"]`; amount `${M} > div:first-child > div:last-child`; status `${M} > div:last-child > div:first-child`; chevron `${M} > div:last-child > [role="img"]`.

## Overview
summary: Use a Transaction Bubble for one payment in a chat thread: who it was with, the amount, and its status, opening its details.
principle: One payment per bubble; its details are one tap away.
playground: `.preview-stage` › TB({ description, status, date, modes: ts(mode), children: note ? NOTE : undefined, onPress: () => setPresses((n) => n + 1), accessibilityLabel: `${description}, ₹1,200, ${status.toLowerCase()} ${date}` }). Per mode: Request → description "Request from Priya Sharma", status "Requested", date "Today"; Paid → "Paid to Priya Sharma", "Paid", "21 Oct 2026"; Declined → "Payment to Priya Sharma", "Declined", "21 Oct 2026"; Expired → "Request from Priya Sharma", "Expired", "20 Mar 2025". Stage label "Live Coin Transaction Bubble". Controls: Segment "Transaction Status" `Request | Paid | Declined | Expired` (Paid); OnOff "children" (off). Readout title "Presses", value "0", "1", …; note: "With onPress the whole bubble is one button that opens the payment."

## Anatomy
header: Anatomy · title: Who, how much, and how it went · description: The description and the amount sit at the top, anything you pass as children comes next, and the status line and a chevron close the bubble.
specimen: `<Anatomy …>` › TB().
parts:
1. Description — description, 14 px on one line; it ellipsizes unless disableTruncation. — target: description — side: top
2. Amount — A Money Value from value and currency, at the bubble’s size. — target: amount — side: left
3. Status — A Transaction Status from status and date; the mode colours its mark. — target: status — side: bottom
4. Chevron — A Nav Arrow that says the bubble opens; statusSlot removes it. — target: chevron — side: right
5. Bubble — White, with a 1 px grey border, 23 px corners and 16 px padding. — target: R — side: right, at 0.25

## Configuration
header: Configuration · title: Status, a note, your own status line · description: Set the Transaction Status mode on the bubble to colour its status mark: Request orange (the default), Paid green, Declined red, Expired grey; status and date give the words. children add a row between the amount and the status, such as the note sent with the payment. statusSlot replaces the status line and the chevron with your own content. No other mode changes the bubble.
Grid `coin-new-example-grid` (two columns):
- Paid — TB() — lesson: A green mark beside Paid.
- Declined — TB({ description: 'Payment to Uber India', value: '56', status: 'Declined', date: '20 Mar 2025', modes: ts('Declined') }) — lesson: A red mark; the words come from status.
- With a note — TB({ children: NOTE }) — lesson: children sit between the amount and the status.
- Without the chevron — TB({ statusSlot: <TransactionStatus status="Paid" date="21 Oct 2026" /> }) — lesson: statusSlot replaces the line and the chevron.

## States
header: States · title: A picture, or a button · description: Without onPress the bubble is a picture of the payment, but its chevron still shows; if it doesn’t open, drop the chevron with statusSlot. With onPress the whole bubble is one button, and it fades a little while pressed. Its default name is the description and the status word, with no amount or date, so set accessibilityLabel.
Grid `coin-new-example-grid` (two columns):
- Picture — TB() — lesson: No onPress: nothing to press, yet the chevron shows.
- Button — TB({ onPress: noop, accessibilityLabel: 'Paid to Priya Sharma, ₹1,200, paid 21 Oct 2026' }) — lesson: Looks the same; the whole bubble presses.

## Sizing
header: Sizing · title: The thread sets the width · description: The bubble has no width of its own: it fills its host. In Figma’s thread it is 231 px of a 328 px column, on the right for payments you send. With one line of description it is 119 px tall, 10 px taller than Figma’s 109, because the amount sits on a 34 px line. It has 16 px of padding, and its parts are 8 px apart.
Body: measured diagram only: `<Anatomy legend={false} marks={[{ kind: 'size', target: R, side: 'bottom', label: 'both' }, { kind: 'padding', target: R }, { kind: 'gap', from: description, to: amount }]}>` › TB(). Expected 231 × 119, padding 16, gap 8; report the measured values.

## Content
header: Content · title: The other person, the amount, one word · description: Write description as what happened and with whom, such as Paid to Priya Sharma; it gets one line, so keep it short or set disableTruncation. Give value without a currency sign: currency adds the ₹. Write status as one word that matches the mode, and date short. When the bubble presses, set accessibilityLabel to the person, the amount, the status, and the date.
Grid `coin-new-example-grid` (two columns):
- One line — TB({ description: 'Paid to Bharat Sanchar Nigam Limited', value: '799' }) — lesson: A long description ends in an ellipsis.
- Wrapped — TB({ description: 'Paid to Bharat Sanchar Nigam Limited', value: '799', disableTruncation: true }) — lesson: disableTruncation lets the description wrap.

## In context
header: In context · title: Payments in a thread · description: A thread lists the payments between two people: the ones you send sit on the right, the ones you receive on the left. The thread places and sizes the bubbles, 231 px wide here as in Figma, and each bubble’s onPress opens that payment’s details.
Composition: `.coin-new-context` › `<VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes}>` with two TBs, then `<p className="coin-new-readout" role="status">`: “No payment opened” or “Opened <description>”.
1. TB({ style: SENT, onPress: () => setOpened('Paid to Priya Sharma'), accessibilityLabel: 'Paid to Priya Sharma, ₹1,200, paid 21 Oct 2026' })
2. TB({ style: RECEIVED, description: 'Request from Priya Sharma', value: '450', status: 'Requested', date: 'Today', modes: ts('Request'), onPress: () => setOpened('Request from Priya Sharma'), accessibilityLabel: 'Request from Priya Sharma, ₹450, requested today' })

## Do & Don'ts
header: Do & Don’ts · title: One payment, said once · description: Each pair shows a bubble people read at a glance next to one that contradicts or buries the payment.
- Do The mode with the word: Paid with the Paid mode: a green mark. — TB() | Don't Only the word: Paid keeps the orange Request mark. — TB({ modes: LIGHT })
- Do Who and how much: The receipt opens from the bubble. — TB() | Don't Receipt fields inside: The bubble becomes a receipt; put these in Transaction Details. — TB({ children: <Text text="UPI ID 101674916166 · HDFC Bank ··4821" /> })

## Sources
header: Sources · title: Use the public Transaction Bubble contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (23 October build of Biscuit’s main) from the team’s private package repository. Figma’s Transaction Bubble exposes one property, <code>Description</code>; its amount and status line are nested instances, and its status comes from the Transaction Status variable mode. The package takes <code>description</code>, <code>value</code>, <code>currency</code>, <code>status</code>, and <code>date</code> as props, and the mode only colours a “!” mark, where Figma swaps the icon. The bubble is 119 px tall where Figma’s is 109, its description is Regular where Figma’s is Medium, and its default accessible name leaves out the amount and date. In Storybook, the Successful story keeps the orange mark and the slot story shows two amounts (all reported).

## Limits
Don't show or mention Color Mode, dark mode, or the Dark mode story. Don't imply the bubble aligns or sizes itself, that the mode changes the words or the icon shape, that statusSlot keeps the chevron, or that children replace the amount.
