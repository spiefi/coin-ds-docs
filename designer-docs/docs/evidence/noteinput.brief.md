# Note Input brief

slug: noteinput · label: Note Input · public API: NoteInput (+ AmountInput, MoneyValue, Card, Button, FormField, VStack for composition)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2244-6063 · storybook: docsUrl('noteinput') · stories: Default=components-noteinput--default
checked: 7 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-3795b4c; Biscuit's main 636f3f5 does not change it)
icon: a pill with a line of text — `<><rect x="1.5" y="5.5" width="15" height="7" rx="3.5" stroke="currentColor" strokeWidth="1.5" /><path d="M5.5 9h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>`
keywords: memo, payment note, add note, remark

Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`; `const CARD = { 'Color Mode': 'Light', AppearanceBrand: 'Neutral' } as Modes`; `const AMOUNT = { 'Color Mode': 'Light', Context3: 'Amount Input' } as Modes`. Every Coin instance gets `modes={LIGHT}` unless stated.
NoteInput only works with state: "Note" = a small helper that keeps its own value, `function Note({ initial = '', ...props })` › `<NoteInput value={value} onChangeText={setValue} accessibilityLabel="Add note" modes={LIGHT} {...props} />`. Every example uses Note unless stated.
The pill is light grey, so every example sits on white: "Host" = `<Surface width="wide">` (or `"narrow"` where stated); Anatomy and Sizing use `surface="white"`. `testID` lands on the `<input>`; the pill is `div:has(> div > ${byTestId(id)})`.

## Overview
summary: Use a Note Input for a short, optional memo under an amount, such as “Rent for April”, that grows as people type.
principle: An optional memo that stays out of the way until tapped.
playground: `.preview-stage` › Host › `<NoteInput value={note} onChangeText={setNote} placeholder={placeholder} editable={!readOnly} accessibilityLabel="Add note" />`. Controls: `text-control` "Placeholder" (default "Add note", maxLength 24); OnOff "Read only" (off). Readout title "Note", value = the typed text or "Empty"; note: "Tap the pill to type. It grows with the text and has no limit of its own." Stage label: "Live Coin Note Input".

## Anatomy
header: Anatomy · title: A grey pill around one line · description: The pill hugs its text: the placeholder until people type, then the note itself. Tapping anywhere on it starts typing.
specimen: `<Anatomy surface="white" …><NoteInput testID="note-anatomy" value="Rent for April" onChangeText={() => {}} accessibilityLabel="Add note" modes={LIGHT} /></Anatomy>` (let `P = div:has(> div > ${byTestId('note-anatomy')})`)
parts:
1. Pill — Light grey with round ends; tap anywhere on it to type. — target: `P` — side: bottom
2. Note text — 14 px bold; the placeholder looks the same. — target: `byTestId('note-anatomy')` — side: top
marks: padding `P`

## Configuration
header: Configuration · title: A placeholder, then the note · description: Note Input has no variants. Set the placeholder to say what the note is for. The screen keeps the value; without it, typing does nothing.
Grid `coin-new-example-grid three`, each a Host:
- Default placeholder — `<Note />` — lesson: “Add note” suits most payments.
- Specific placeholder — `<Note placeholder="Add a note for Asha" />` — lesson: Say who or what the note is for when it helps.
- Filled — `<Note initial="Rent for April" />` — lesson: The note replaces the placeholder in the same style.

## States
header: States · title: Empty, typing, filled, and read only · description: Focus doesn’t change the pill’s colour: the placeholder disappears and a caret shows. A read-only note looks the same but can’t be changed.
Grid `coin-new-example-grid three`, each a Host:
- Empty — `<Note />` — lesson: Tap it: the placeholder clears and the pill shrinks to the caret.
- Filled — `<Note initial="Rent for April" />` — lesson: Same colour and weight as the placeholder.
- Read only — `<NoteInput value="Gift" editable={false} accessibilityLabel="Note" modes={LIGHT} />` — lesson: Same pill; it takes focus but typing does nothing.

## Sizing
header: Sizing · title: 35 px tall, as wide as its text · description: The pill is 35 px tall, with 8 px above and below the text and 16 px at each end. Its width follows the text and has no maximum, so a long note runs past its container.
Measured diagram: `<Anatomy legend={false} surface="white" marks={[{ kind: 'size', target: S, side: 'bottom', label: 'both' }, { kind: 'padding', target: S }]}>` › `<NoteInput testID="note-size" value="" onChangeText={() => {}} accessibilityLabel="Add note" modes={LIGHT} />` where `S = div:has(> div > ${byTestId('note-size')})`. Expected about 99 × 35.
Then ExampleCard "It grows as people type" (description: "Type in the note: the pill widens with each character.") › Host › `<Note initial="Dinner" />`.

## Content
header: Content · title: A few words people will recognise later · description: The note travels with the payment, so keep it to a few words about what the money is for. Use the placeholder for a hint, not an instruction.
One ExampleCard "Short and specific" › one Host holding three notes: `<Note initial="Rent for April" />`, `<Note initial="Dinner at Toit" />`, `<Note initial="Gift for Asha" />`.

## In context
header: In context · title: A memo under the transfer amount · description: Amount Input places the note under the amount. The screen keeps both values and sends the note with the payment.
Composition in `.coin-new-context`: `<Card modes={CARD}>` › `<Card.Title>Send to Asha Rao</Card.Title>`, `<AmountInput modes={AMOUNT} moneyValueSlot={<MoneyValue value="500" currency="₹" modes={AMOUNT} />} noteInputSlot={<NoteInput value={note} onChangeText={setNote} accessibilityLabel="Add note" modes={AMOUNT} />} />`, `<Button label="Send ₹500" onPress={() => setSent(note)} modes={LIGHT} />`. Below the card, `<p className="coin-new-readout" role="status">`: “Add an optional note” before sending; after Send, “Sent ₹500 with the note “<note>”” or “Sent ₹500 without a note”.

## Do & Don'ts
header: Do & Don’ts · title: Keep notes short and optional · description: Each pair shows a note people can use versus one that loses what they type or what they need.
Every preview is a Host.
- Do Keep the note in state: Typing updates the note, ready to send. — `<Note />` | Don't Leave it without state: Without a value from the screen, typing does nothing. — `<NoteInput accessibilityLabel="Add note" modes={LIGHT} />` (no `value`, no `onChangeText`)
- Do Keep it to a few words: The pill hugs the note and stays in the column. — narrow Host, `<Note initial="Rent for April" />` | Don't Write a sentence: A long note runs past the edge of its column. — narrow Host, `<Note initial="Rent for April and the maintenance" />`
- Do Ask for required details in a Form Field: A label and a required mark say it must be filled in. — Host › `<VStack modes={LIGHT} style={{ width: '100%', padding: 0 }}><FormField label="Reason for transfer" isRequired placeholder="For example, rent" modes={LIGHT} /></VStack>` | Don't Hide a required detail in a note: The pill has no label, required mark, or error, so people skip it. — `<Note placeholder="Reason (required)" />`

## Sources
header: Sources · title: Use the public Note Input contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> from the team’s private package repository. Figma’s Note Input has Idle and Editing variants, 95 × 34; the package has none: it follows focus, grows with the text, and is 35 px tall. Its colours are the same in Dark mode, so this page shows Light only. It works only when the screen keeps its value. On the web each note takes two Tab stops and its text is exposed twice to screen readers; set an accessible name, because the placeholder disappears on focus. The published Storybook has one story; newer stories are not deployed yet.

## Limits
Do not show Dark mode, the `state` prop, `multiline`, `maxLength`, `style`, or `textStyle`. Do not imply a focus colour, a character counter, required or error states, or that an uncontrolled note can be typed into. Do not show the long-note overflow outside the Don’t.
