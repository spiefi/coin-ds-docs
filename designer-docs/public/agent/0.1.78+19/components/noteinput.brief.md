# NoteInput (brief)

> Coin agent pack 0.1.78+19 · documented · full entry: `components/noteinput.md` (sources, all facts, flags)

Use a Note Input for a short, optional memo under an amount, such as “Rent for April”, that grows as people type.

**Use when**
- A short, optional memo under an amount, such as “Rent for April”, that grows as people type.

**Avoid when**
- Avoid: A detail people must give, such as a reason for the transfer: Note Input has no label, required mark, or error, so people skip it. Ask for it in a Form Field, whose label and required mark say it must be filled in. Use instead: FormField.

**Placement**
- Under the transfer amount: Amount Input places the note under the amount.
- The screen keeps both values, the amount and the note, and sends the note with the payment.
- The container sets the most it can take: the note's width follows the text up to the width of its container, and a longer note wraps onto more lines.
- Note Input is 35 px tall for one line, with 8 px above and below the text and 16 px at each end.

**Key rules**
- `placeholder`: Note Input has no variants. Set the placeholder to say what the note is for.
- `placeholder` = `Add note`: The default placeholder, “Add note”, suits most payments.
- `placeholder`: A specific placeholder, such as “Add a note for Asha”: say who or what the note is for when it helps.
- `value`: The note keeps what people type, and the screen reads it to send with the payment.
- `value`: It keeps what people type on its own, or takes its value from the screen (value with onChangeText).
- `editable` = `false`: Read only, for a note people can't change: set editable to false; the note fades to 60% and can't be focused or changed.
- Enter starts a new line in the note.
- On the web each note is one Tab stop, its text is read once, and it keeps its name, the placeholder or yours, while focused.

**Example:** A memo under the transfer amount, the guide's In context: a Card titled for the person, an AmountInput with the amount first and the NoteInput under it, and the payment Button. The note keeps what people type on its own, and onChangeText gives the screen each change, so the screen keeps both values and sends the note with the payment. AmountInput carries Context3 Amount Input, which the guide's own source sets on it, because it doesn't set its own context and passes its modes to both of its children; nothing else sets modes.

```tsx
<Card>
  <Card.Title>Send to Asha Rao</Card.Title>
  <AmountInput
    modes={{ Context3: 'Amount Input' }}
    moneyValueSlot={<MoneyValue value="500" currency="₹" />}
    noteInputSlot={<NoteInput onChangeText={(note) => {}} />}
  />
  <Button label="Send ₹500" onPress={() => {}} />
</Card>
```

**Props:** `value`, `placeholder`, `onChangeText`, `modes`, `style`, `textStyle`, `state` (Editing | Idle), `accessibilityLabel`, `editable`, `maxLength`, `defaultValue`. (* required)

**Gaps (report, do not work around)**
- The published Storybook has one Note Input story; newer stories are not deployed yet.
- The package's JSDoc is out of date: it still mentions an InputState mode and a blinking cursor.

Full entry: `components/noteinput.md`. Links: `components/noteinput.links.md`.
