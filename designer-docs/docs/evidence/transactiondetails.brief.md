# Transaction Details brief

slug: transactiondetails · label: Transaction Details · public API: TransactionDetails + TransactionDetails.Item (+ VStack, Title, Button and the kit's ScreenFrame for In context)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1557-7798 · storybook: docsUrl('transactiondetails') · stories: Default=components-transactiondetails--default, Single item=components-transactiondetails--single-item, Account transfer=components-transactiondetails--account-transfer, Bill payment=components-transactiondetails--bill-payment
checked: 25 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-c8526ae = Biscuit’s main c8526ae)
icon: four short and long lines, label over value — `<path d="M3 3.5h6M3 6.5h11M3 11h6M3 14h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />`
keywords: receipt, payment details, transaction info, label and value, key value list

Setup: `LIGHT = { 'Color Mode': 'Light' } as Modes`. Item sets (`[label, value]` pairs):
- UPI = UPI transaction ID → 101674916166 · From → JioFinance ··1234 · To → Rahul Verma · rahul@okjio · Payment method → UPI
- TRANSFER = Transfer ID → TXN202610210001 · From account → Savings ··1234 · To account → Current ··5678 · Transfer type → IMPS · Date and time → 21 Oct 2026, 10:30 am
- BILL = Transaction ID → BILL2026102100042 · Biller → Jio Postpaid · Consumer number → 98765 43210 · Bill period → September 2026 · Payment method → JioFinance Wallet
“TD(items)” = `<TransactionDetails modes={LIGHT} testID="td">{items.map(([label, value], i) => <TransactionDetails.Item key={label} testID={`td-${i + 1}`} label={label} value={value} />)}</TransactionDetails>`.
COLUMN = `<VStack modes={LIGHT} style={{ width: 240 }}>…</VStack>` (a 240 px app column; a flex-row host wouldn’t let the list shrink).
Selectors: list `byTestId('td')`; item 1 `byTestId('td-1')`; item 2 `byTestId('td-2')`; label `${byTestId('td-1')} > [dir="auto"]:first-child`; value `${byTestId('td-1')} > [dir="auto"]:last-child`.

## Overview
summary: Use Transaction Details to list the facts of one payment as label and value pairs: its ID, the accounts, and how it was paid.
principle: Name the fact, then give it.
playground: `.preview-stage` › TD(set). Stage label "Live Coin Transaction Details". Control: Segment "children" `UPI payment | Transfer | Bill` (UPI payment) → UPI, TRANSFER, BILL. Readout title "Items", value "4" or "5"; note: "Each TransactionDetails.Item is one label and its value; the list only stacks them."

## Anatomy
header: Anatomy · title: Labels over values · description: Each item puts a label over its value, and the list stacks the items 16 px apart. There’s no surface, divider, or icon: the screen around it provides those.
specimen: `<Anatomy specimenWidth={315} …>` › TD(UPI.slice(0, 2)). marks: `{ kind: 'gap', from: item 1, to: item 2 }`, `{ kind: 'gap', from: label, to: value }`.
parts:
1. Label — label, 14 px Medium in near-black; it names the fact. — target: label — side: left
2. Value — value, the same size in a softer grey, 4 px under its label. — target: value — side: right
3. Item — TransactionDetails.Item: one label and its value. — target: item 2 — side: left
4. List — TransactionDetails: stacks its items 16 px apart, with no padding. — target: list — side: top

## Configuration
header: Configuration · title: Only the items · description: The list has nothing to set: no variants, and no mode changes it. You choose the items and their order, one TransactionDetails.Item each, with a label and a value. Put the reference people quote first, then who paid whom, then how.
Grid `coin-new-example-grid` (two columns):
- UPI payment — TD(UPI) — lesson: The ID, both ends, then the method.
- Bank transfer — TD(TRANSFER) — lesson: Five facts, in the order people check them.

## States
header: States · title: Static text · description: The list has no states: its items don’t press, select, copy, collapse, or page. To let people copy an ID or share the receipt, put a button on the screen.
Grid `coin-new-example-grid` (two columns):
- One item — TD(UPI.slice(0, 1)) — lesson: A single fact is still a list of one.
- Bill payment — TD(BILL) — lesson: A longer list keeps the same 16 px rhythm.

## Sizing
header: Sizing · title: As wide as its column · description: The list has no width of its own: it fills its column, and each item is as wide as its text. A long value wraps under its label; nothing is cut. Figma draws the items at a fixed 315 px. Items sit 16 px apart, and a label sits 4 px above its value, each on a 17 px line.
Body: measured diagram only: `<Anatomy legend={false} specimenWidth={315} marks={[{ kind: 'size', target: list, side: 'bottom', label: 'both' }, { kind: 'gap', from: item 1, to: item 2 }, { kind: 'gap', from: label, to: value }]}>` › TD(UPI.slice(0, 2)). Expected 315 × 92, gaps 16 and 4; report the measured values.

## Content
header: Content · title: Field names and data · description: Write each label as a field name, such as UPI transaction ID, From, To, or Payment method. Write the value as the data itself, never a sentence, and mask account numbers to their last four digits. The label shouldn’t repeat the value.
Grid `coin-new-example-grid` (two columns):
- Field names — TD(UPI) — lesson: Short names people scan for.
- A long value — COLUMN › TD([['To', 'Bharat Sanchar Nigam Limited · bsnl.broadband@okaxis'], ['Payment method', 'UPI']]) — lesson: It wraps under its label; nothing is cut.

## In context
header: In context · title: The receipt behind a payment · description: The details sit on the screen a payment opens, under its amount and outcome. The screen adds the heading and the action; the list only holds the facts.
Composition: `.coin-new-context` › `<ScreenFrame size="full">` › `<VStack modes={{ ...LIGHT, 'Slot gap': 'L' } as Modes} style={{ flex: 1, padding: 16 }} justifyVertical="space-between">` › [`<VStack modes={{ ...LIGHT, 'Slot gap': 'L' } as Modes}>` › `<Title title="Paid ₹1,200" subtitle="To Rahul Verma · 21 Oct 2026, 4:15 pm" modes={LIGHT} />`, TD(UPI)], `<Button label="Share receipt" modes={LIGHT} onPress={() => setShared(true)} />`. Below the frame, `<p className="coin-new-readout" role="status">`: “Receipt not shared yet” or “Receipt shared”.

## Do & Don'ts
header: Do & Don’ts · title: Name it, then give it · description: Each pair shows a receipt people scan in seconds next to one that makes them read twice.
- Do Name, then the fact: UPI transaction ID is the label; the number is the value. — TD([['UPI transaction ID', '101674916166']]) | Don't The ID in both places: The label repeats the number. — TD([['UPI transaction ID 101674916166', '101674916166']])
- Do Data in the value: One fact per item. — TD([['Payment method', 'UPI'], ['From', 'JioFinance ··1234']]) | Don't A sentence as a value: People have to read it to find the fact. — COLUMN › TD([['Payment method', 'You paid with UPI from your JioFinance account ending 1234.']])

## Sources
header: Sources · title: Use the public Transaction Details contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (23 October build of Biscuit’s main) from the team’s private package repository. Figma’s Transaction Details is one component with no properties: a slot of Detail Items, each with a Label and a Value, drawn 315 px wide. The package takes <code>TransactionDetails.Item</code> children with <code>label</code> and <code>value</code> and sizes them to their text. No mode changes it. Its <code>accessibilityLabel</code> props are never applied, so the list has no name, and on phones screen readers skip the items (reported).

## Limits
Don't show or mention Color Mode or dark mode. Don't imply the list presses, copies, collapses, or pages, that it has a surface or dividers, or that it names itself for screen readers.

## dbe0e02 publish (28 October 2026): copy changes

These replace the matching lines above; the guide file has the exact strings. Evidence: `docs/evidence/transactiondetails.md`.

- checked: 28 October 2026 · built from dbe0e02 (27 October). `TD(items, accessibilityLabel?)` passes the label to TransactionDetails; In context uses TD(UPI, 'Payment details').
- In context: “… The screen adds the heading and the action; the list only holds the facts, and its accessibilityLabel, Payment details, names it for screen readers.”
- Sources: “… On the web it’s a list named by its <code>accessibilityLabel</code>, and each item is read once as its label and value, unless the item’s own <code>accessibilityLabel</code> replaces them; phone screen readers read the items too.”
