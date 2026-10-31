# AmountInput (brief)

> Coin agent pack 0.1.78+23 · flagged · full entry: `components/amountinput.md` (sources, all facts, flags)

Make monetary entry primary while keeping optional detail close.

**Use when**
- Entering an amount of money as the primary value, with optional detail (a note) kept close.
- An amount with a supporting note: amount first, note second.

**Placement**
- Place the amount entry in a Card or review composition so the person knows what they are completing.
- AmountInput takes its children's natural size: the currency, the amount's length, the note text and the owning context set its width.
- Give the amount and note enough room to stay legible.
- In a narrow host, keep the content short: short content keeps the natural Hug-sized children readable.

**Key rules**
- AmountInput exposes two slots, moneyValueSlot for the amount and noteInputSlot for the note, and an owning context: its modes.
- Choose the currency and the values through the MoneyValue and NoteInput in the slots; AmountInput has no props for them.
- Omitted slots fall back to a default MoneyValue and NoteInput: a familiar entry to start from.
- Supply your own children when the entry needs another currency or note wording.
- `modes`: Set modes on AmountInput: it passes its context to both children so their tokens resolve together.
- `Context3` = `Amount Input`: Set Context3 Amount Input on AmountInput, as the guide's owner does to reproduce the inspected Figma context (a 56 px amount with a 32 px currency). The Color Mode=Light the owner passes with it is Color Mode's default, so it needs no setting.
- `Context3` = `Default`: With no Context3 set, AmountInput is in Context3’s default, Default, not Amount Input: Amount Input is the context with Figma’s 56 px amount and 32 px currency.
- `moneyValueSlot`: To let people type the amount, put a MoneyValue with editable in moneyValueSlot and read the new amount from its onValueChange: MoneyValue supplies view and edit behavior through its props.

**Example:** A transfer review, the guide's In context: a Card titled for the task gives the entry its context, the AmountInput keeps the amount primary with an editable ₹500 and a note under it, so the person knows what they are completing. AmountInput carries Context3 Amount Input, as the guide's own source sets it, because it doesn't set its own context and passes its modes to both children; the children carry none. The literal amount and the empty onValueChange stand for the screen's own state (MoneyValue shows the value it is given); the note keeps what people type and onChangeText gives the screen each change.

```tsx
<Card>
  <Card.Title>Review transfer</Card.Title>
  <Card.SupportText>Enter the amount and an optional note before sending.</Card.SupportText>
  <AmountInput
    modes={{ Context3: 'Amount Input' }}
    moneyValueSlot={<MoneyValue value="500" currency="₹" editable onValueChange={(amount) => {}} />}
    noteInputSlot={<NoteInput placeholder="Add transfer note" onChangeText={(note) => {}} />}
  />
</Card>
```

**Props:** `moneyValueSlot`, `noteInputSlot`, `modes`, `style`. (* required)

**Modes it reads:** Color Mode, Context3, Page type.

**Gaps (report, do not work around)**
- The published Storybook's default AmountInput story relies on ambient context, not Context3 Amount Input, and renders smaller typography than the Figma parent.

Full entry: `components/amountinput.md`. Links: `components/amountinput.links.md`.
