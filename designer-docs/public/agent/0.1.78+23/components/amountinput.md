# AmountInput

> Coin agent pack 0.1.78+23 (pilot). Generated from `components/amountinput.json`; the JSON is the source of truth.

- **State:** flagged (6 flags, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `31f1c5e` · built 2026-10-31T01:50:12Z
- **Category:** input (for discovery only, not a limit on composition) · **Tags:** money, currency, price, text field, input, rupee
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=amountinput) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2217-6259) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-amountinput--docs)

Make monetary entry primary while keeping optional detail close.

## Use when

- **recommended** Entering an amount of money as the primary value, with optional detail (a note) kept close.  
  _From summary: “Make monetary entry primary while keeping optional detail close.”_
- **recommended** An amount with a supporting note: amount first, note second.  
  _From corePrinciple: “Amount first, note second.”_

## Avoid when

_None in the guide._

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Currency | The currency symbol gives the amount a clear unit. It is the currency of the MoneyValue in the amount slot (₹ by default), drawn before the amount; an empty currency leaves the amount without a unit, which the Do & Don'ts rule out. | no | anatomy: “The currency symbol gives the amount a clear unit.” |
| Amount | MoneyValue is the primary editable value and owns its view/edit behavior. | yes | anatomy: “MoneyValue is the primary editable value and owns its view/edit behavior.” |
| Note | NoteInput is optional supporting detail that becomes useful when focused or filled. It sits under the amount and is always drawn (an omitted slot falls back to a NoteInput); writing in it is up to people. | yes | anatomy: “NoteInput is optional supporting detail that becomes useful when focused or filled.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `moneyValueSlot` | `ReactNode` | types |
| `noteInputSlot` | `ReactNode` | types |

## Placement

- **recommended** Place the amount entry in a Card or review composition so the person knows what they are completing.  
  _From inContext: “Place the amount entry in a Card or review composition so the person knows what they are completing.”_
- **recommended** AmountInput takes its children's natural size: the currency, the amount's length, the note text and the owning context set its width.  
  _From sizing: “AmountInput uses the children’s natural size.”_
- **recommended** Give the amount and note enough room to stay legible.  
  _From sizing: “Give the amount and note enough room to stay legible.”_
- **recommended** In a narrow host, keep the content short: short content keeps the natural Hug-sized children readable.  
  _From sizing: “Short content keeps the natural Hug-sized children readable.”_
- **discouraged** Don't force an unbroken value into a narrow host.  
  _From sizing: “avoid forcing an unbroken value into a narrow host”_

## Configuration

- **recommended** AmountInput exposes two slots, moneyValueSlot for the amount and noteInputSlot for the note, and an owning context: its modes.  
  _From configuration: “The component exposes two slots and an owning context.”_
- **recommended** Choose the currency and the values through the MoneyValue and NoteInput in the slots; AmountInput has no props for them.  
  _From configuration: “Choose the currency and child values through MoneyValue and NoteInput.”_
- **recommended** Omitted slots fall back to a default MoneyValue and NoteInput: a familiar entry to start from.  
  _From configuration: “Omitted slots fall back to MoneyValue and NoteInput children.”_
- **recommended** Supply your own children when the entry needs another currency or note wording.  
  _From configuration: “Supply children when the entry needs another currency or note wording.”_
- **recommended** `modes`: Set modes on AmountInput: it passes its context to both children so their tokens resolve together.  
  _From anatomy: “The component passes its context to both children so their tokens resolve together.”_
- **recommended** `Context3` = `Amount Input`: Set Context3 Amount Input on AmountInput, as the guide's owner does to reproduce the inspected Figma context (a 56 px amount with a 32 px currency). The Color Mode=Light the owner passes with it is Color Mode's default, so it needs no setting. ⚑ flagged (trace-check)  
  _From sources: “The owner passes Context3=Amount Input with Color Mode=Light to reproduce the inspected Figma context.”_
- **recommended** `Context3` = `Default`: With no Context3 set, AmountInput is in Context3’s default, Default, not Amount Input: Amount Input is the context with Figma’s 56 px amount and 32 px currency.  
  _From fact `/facts/modes/1` (Context3, source evidence)_
- **recommended** `moneyValueSlot`: To let people type the amount, put a MoneyValue with editable in moneyValueSlot and read the new amount from its onValueChange: MoneyValue supplies view and edit behavior through its props.  
  _From states: “MoneyValue supplies view and edit behavior through its props.”_

## Content

- **recommended** Currency belongs with the amount.  
  _From content: “Currency belongs with the amount.”_
- **recommended** State the currency: keep the symbol or code visible so the amount does not depend on surrounding copy.  
  _From content: “Keep the symbol or code visible so the amount does not depend on surrounding copy.”_
- **recommended** Notes add supporting detail and should remain short enough to scan beside the primary value.  
  _From content: “Notes add supporting detail and should remain short enough to scan beside the primary value.”_
- **recommended** Keep the note concise: use a short phrase that explains the reason or destination.  
  _From content: “Use a short phrase that explains the reason or destination.”_
- **recommended** Keep precision readable: show the amount precision the decision needs, without an unbroken string that cannot fit.  
  _From content: “Show the amount precision the decision needs, without an unbroken string that cannot fit.”_

Good: “Rent”, “Utilities”, “Monthly investment”, “Add note”, “Add transfer note”, “Add investment note”

Bad: “Rent payment for the apartment and utilities”, “12345678901234567890”

## States

| State | When | From |
| --- | --- | --- |
| Money view | Use the quiet view when the amount is not being edited. | states: “Use the quiet view when the amount is not being edited.” |
| Money edit | Tap the amount to enter the inline edit behavior (an editable MoneyValue). | states: “Tap the amount to enter the inline edit behavior.” |
| Note filled | A short controlled note stays supporting detail. | states: “A short controlled note stays supporting detail.” |

## Accessibility

_None in the guide._

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Show the currency | Hide the unit | Without a currency, the number needs surrounding copy to become meaningful. |
| Use a short note | Write a note that takes over | An oversized note competes with the primary amount and makes the natural width harder to manage. |
| Use readable precision | Force an unbroken value | An unbroken string clips inside a narrow teaching frame; widen the host or choose a meaningful precision. |

## Examples

### A transfer review, the guide's In context: a Card titled for the task gives the entry its context, the AmountInput keeps the amount primary with an editable ₹500 and a note under it, so the person knows what they are completing. AmountInput carries Context3 Amount Input, as the guide's own source sets it, because it doesn't set its own context and passes its modes to both children; the children carry none. The literal amount and the empty onValueChange stand for the screen's own state (MoneyValue shows the value it is given); the note keeps what people type and onChangeText gives the screen each change.

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

_From inContext: “A Card gives the entry a task context while AmountInput keeps amount primary.”_

### Custom slots, the guide's Configuration: your own children for another currency and note wording, a $1000 monthly investment with its note filled in. The amount is editable. The literal values and the empty handlers stand for the screen's own state, which passes each new amount and note back.

```tsx
<AmountInput
  modes={{ Context3: 'Amount Input' }}
  moneyValueSlot={<MoneyValue value="1000" currency="$" editable onValueChange={(amount) => {}} />}
  noteInputSlot={<NoteInput value="Monthly investment" placeholder="Add investment note" onChangeText={(note) => {}} />}
/>
```

_From configuration: “Supply children when the entry needs another currency or note wording.”_

### The quiet view, the guide's States (Money view): the amount as it shows when it is not being edited, with a short note, Rent. Like the guide's Money view card, this MoneyValue isn't editable; an editable one shows the same view until it is tapped. The literal note and the empty onChangeText stand for the screen's own state.

```tsx
<AmountInput
  modes={{ Context3: 'Amount Input' }}
  moneyValueSlot={<MoneyValue value="500" currency="₹" />}
  noteInputSlot={<NoteInput value="Rent" onChangeText={(note) => {}} />}
/>
```

_From states: “Use the quiet view when the amount is not being edited.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `moneyValueSlot` | `React.ReactNode` |  |  |  | types | Slot for the MoneyValue component. |
| `noteInputSlot` | `React.ReactNode` |  |  |  | types | Slot for the NoteInput component. |
| `modes` | `Modes` |  |  |  | types | Modes for design token resolution. |
| `style` | `ViewStyle` |  |  |  | types | Optional container style. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection AmountInput reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context3` ⚑ flagged (trace-check) | `mode collection` | Default, Transaction Bubble, Balance & Cards, Amount Input | `"Default"` |  | evidence (2026-09-22) | Amount Input is the amount entry's context in Figma: the inspected parent owns Context3 Amount Input and shows a 56 px amount with a 32 px currency and a 14 px Add note label. Declared: A token collection AmountInput reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection AmountInput reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `moneyValueSlot` | `React.ReactNode` |  |  |  | types | Slot for the MoneyValue component. |
| `noteInputSlot` | `React.ReactNode` |  |  |  | types | Slot for the NoteInput component. |

### Events

_No events._

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- The published Storybook's default AmountInput story relies on ambient context, not Context3 Amount Input, and renders smaller typography than the Figma parent. _(evidence, 2026-09-22)_ ⚑ flagged (trace-check)

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/facts/modes/1` · trace-check: Checked on jfs-components 0.1.60 (2026-09-22); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/gaps/0` · trace-check: Checked on jfs-components 0.1.60 (2026-09-22); the installed package is 0.1.78. Re-check before relying on it.
- `/configuration/5` · trace-check: Checked on jfs-components 0.1.60 (2026-09-22); the installed package is 0.1.78. Re-check before relying on it.
- `/avoidWhen` · trace-check: The guide gives no avoidWhen guidance; left empty rather than guessed.
- `/accessibility` · trace-check: The guide gives no accessibility guidance; left empty rather than guessed.
- `(whole entry)` · human: The Amount Input guide and its evidence were checked on 22 September 2026 on jfs-components 0.1.60 (its Sources note still says so); the installed package is 0.1.78 (mirror v0.1.78-dbe0e02). Read against the installed AmountInput.tsx, MoneyValue.tsx and NoteInput.tsx, with their tokens through the package's resolver, every sentence this entry quotes still holds, but two NoteInput sentences are out of date. The Sources note's “The NoteInput state prop is accepted but unused by the implementation; its visible editing state is focus-driven.” is contradicted: NoteInput reads state, and state Editing hides the placeholder as focus does (NoteInput.tsx lines 50, 68–69, 170 and 177). The States description's “NoteInput responds to focus and controlled text; its internal state is runtime-driven.” says less than the package: a note with no value keeps what people type on its own and still calls onChangeText (NoteInput.tsx lines 55–57 and 148–151), as the NoteInput guide now says. Both changed between the 8 October (v0.1.78-636f3f5) and 12 October (v0.1.78-c1fa197) builds; AmountInput.tsx itself is the same blob from v0.1.78 to dbe0e02. The entry doesn't quote either sentence. Re-check the guide on 0.1.78 and publish it, then re-extract. Added by Claude Code in the overnight run agentpack-batch13, for Marcin to confirm. Guide fix #536.
