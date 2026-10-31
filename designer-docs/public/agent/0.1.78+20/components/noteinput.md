# NoteInput

> Coin agent pack 0.1.78+20 (pilot). Generated from `components/noteinput.json`; the JSON is the source of truth.

- **State:** documented
- **Package:** jfs-components 0.1.78 · guide commit `3f56271` · built 2026-10-31T00:24:09Z
- **Category:** input (for discovery only, not a limit on composition) · **Tags:** memo, payment note, add note, remark
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=noteinput) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2244-6063) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-noteinput--docs)

Use a Note Input for a short, optional memo under an amount, such as “Rent for April”, that grows as people type.

## Use when

- **recommended** A short, optional memo under an amount, such as “Rent for April”, that grows as people type.  
  _From summary: “Use a Note Input for a short, optional memo under an amount, such as “Rent for April”, that grows as people type.”_

## Avoid when

- **discouraged** A detail people must give, such as a reason for the transfer: Note Input has no label, required mark, or error, so people skip it. Ask for it in a Form Field, whose label and required mark say it must be filled in. Use instead: `FormField`.  
  _From doDont: “Note Input has no label, required mark, or error, so people skip it.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Background | Light grey with round ends; tap anywhere on it to type. It hugs its text and a long note wraps inside it. | yes | anatomy: “Light grey with round ends; tap anywhere on it to type.” |
| Note text | The placeholder until people type, then the note itself: 14 px bold, and the placeholder looks the same. | yes | anatomy: “14 px bold; the placeholder looks the same.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

_No slots._

## Placement

- **recommended** Under the transfer amount: Amount Input places the note under the amount.  
  _From inContext: “Amount Input places the note under the amount.”_
- **recommended** The screen keeps both values, the amount and the note, and sends the note with the payment.  
  _From inContext: “The screen keeps both values and sends the note with the payment.”_
- **recommended** The container sets the most it can take: the note's width follows the text up to the width of its container, and a longer note wraps onto more lines.  
  _From sizing: “Its width follows the text up to the width of its container; a longer note wraps onto more lines.”_
- **recommended** Note Input is 35 px tall for one line, with 8 px above and below the text and 16 px at each end.  
  _From sizing: “Note Input is 35 px tall for one line, with 8 px above and below the text and 16 px at each end.”_

## Configuration

- **recommended** `placeholder`: Note Input has no variants. Set the placeholder to say what the note is for.  
  _From configuration: “Note Input has no variants. Set the placeholder to say what the note is for.”_
- **recommended** `placeholder` = `Add note`: The default placeholder, “Add note”, suits most payments.  
  _From configuration: ““Add note” suits most payments.”_
- **recommended** `placeholder`: A specific placeholder, such as “Add a note for Asha”: say who or what the note is for when it helps.  
  _From configuration: “Say who or what the note is for when it helps.”_
- **recommended** `value`: The note keeps what people type, and the screen reads it to send with the payment.  
  _From configuration: “The note keeps what people type, and the screen reads it to send with the payment.”_
- **recommended** `value`: It keeps what people type on its own, or takes its value from the screen (value with onChangeText).  
  _From sources: “It keeps what people type on its own, or takes its value from the screen.”_
- **recommended** `editable` = `false`: Read only, for a note people can't change: set editable to false; the note fades to 60% and can't be focused or changed.  
  _From states: “Faded to 60%; it can’t be focused or changed.”_
- **recommended** Enter starts a new line in the note.  
  _From sources: “Enter starts a new line in the note.”_

## Content

- **recommended** An optional memo that stays out of the way until tapped.  
  _From corePrinciple: “An optional memo that stays out of the way until tapped.”_
- **recommended** The note travels with the payment, so keep it to a few words about what the money is for.  
  _From content: “The note travels with the payment, so keep it to a few words about what the money is for.”_
- **recommended** `placeholder`: Use the placeholder for a hint, not an instruction.  
  _From content: “Use the placeholder for a hint, not an instruction.”_
- **recommended** Keep it to a few words: the background hugs the note on one line.  
  _From doDont: “The background hugs the note on one line.”_
- **discouraged** Do not write a sentence: a long note wraps onto a second line and takes more room under the amount.  
  _From doDont: “A long note wraps onto a second line and takes more room under the amount.”_
- **recommended** Ask for required details in a Form Field, not in a note.  
  _From doDont: “Ask for required details in a Form Field”_

Good: “Rent for April”, “Dinner at Toit”, “Gift for Asha”, “Add note”, “Add a note for Asha”

Bad: “Rent for April and the maintenance”, “Reason (required)”

## States

| State | When | From |
| --- | --- | --- |
| Empty | Tap it: the placeholder clears and the background shrinks to the caret. | states: “Tap it: the placeholder clears and the background shrinks to the caret.” |
| Typing | Focus doesn’t change the background’s colour: the placeholder disappears and a caret shows. The background widens with each character. | states: “Focus doesn’t change the background’s colour: the placeholder disappears and a caret shows.” |
| Filled | The note replaces the placeholder, in the same colour and weight as the placeholder. | states: “Same colour and weight as the placeholder.” |
| Read only | Faded to 60%; it can’t be focused or changed. | states: “Faded to 60%; it can’t be focused or changed.” |

## Accessibility

- **recommended** On the web each note is one Tab stop, its text is read once, and it keeps its name, the placeholder or yours, while focused.  
  _From sources: “On the web each note is one Tab stop, its text is read once, and it keeps its name, the placeholder or yours, while focused.”_
- **recommended** `accessibilityLabel`: The note's spoken name is accessibilityLabel, else the placeholder, and it stays while the placeholder is hidden on focus.  
  _From evidence: “The field's `aria-label` is `accessibilityLabel`, else the placeholder, and it stays while the placeholder is hidden on focus.”_
- **recommended** `editable` = `false`: A read-only note is faded and can’t be focused.  
  _From sources: “A read-only note is faded and can’t be focused.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Keep it to a few words | Write a sentence | A long note wraps onto a second line and takes more room under the amount. |
| Ask for required details in a Form Field | Hide a required detail in a note | Note Input has no label, required mark, or error, so people skip it. |

## Examples

### A memo under the transfer amount, the guide's In context: a Card titled for the person, an AmountInput with the amount first and the NoteInput under it, and the payment Button. The note keeps what people type on its own, and onChangeText gives the screen each change, so the screen keeps both values and sends the note with the payment. AmountInput carries Context3 Amount Input, which the guide's own source sets on it, because it doesn't set its own context and passes its modes to both of its children; nothing else sets modes.

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

_From inContext: “The screen keeps both values and sends the note with the payment.”_

### A specific placeholder, the guide's Configuration: say who or what the note is for. The note keeps what people type on its own; with no accessibilityLabel, the placeholder is its name.

```tsx
<NoteInput placeholder="Add a note for Asha" />
```

_From configuration: “Say who or what the note is for when it helps.”_

### Read only, the guide's States: a note people can't change, faded to 60%; it can't be focused or changed.

```tsx
<NoteInput value="Gift" editable={false} accessibilityLabel="Note" />
```

_From states: “Faded to 60%; it can’t be focused or changed.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `value` | `string` |  |  |  | evidence (2026-10-13) | Optional. Without it the note keeps its own state and takes typing; with it the screen owns the note (value and onChangeText). Declared: The value of the text input. |
| `placeholder` | `string` |  | `"Add note"` |  | types | The placeholder when empty ("Add note" by default) Default "Add note", from the component source. |
| `onChangeText` | `(text: string) => void` |  |  |  | types | Callback when text changes. |
| `modes` | `Modes` |  |  |  | types | Design token modes (e.g., {'InputState': 'Idle', 'Color Mode': 'Light'}) |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Custom container style. |
| `textStyle` | `StyleProp<TextStyle>` |  |  |  | types | Custom text input style. |
| `state` | `"Editing" \| "Idle"` | Editing, Idle |  |  | evidence (2026-10-13) | Not a designer variant: state Editing only hides the placeholder. Focus clears the placeholder on its own. Declared: State of the component. |
| `...Omit<TextInputProps, 'style' | 'value' | 'onChangeText' | 'placeholder'>` | `Omit<TextInputProps, 'style' \| 'value' \| 'onChangeText' \| 'placeholder'>` |  |  |  | types | Inherited React Native props the component also accepts. They are not part of the design contract and no guide documents them. |
| `accessibilityLabel` | `string` |  |  |  | evidence (2026-10-13) | The note's spoken name (on the web, the field's aria-label). Without it the placeholder names the note, and the name stays while the placeholder is hidden on focus. |
| `editable` | `boolean` |  |  |  | evidence (2026-10-13) | false makes the note read only: the background is at 60% opacity, the field is read-only and out of the tab order, a click doesn't focus it, and it keeps its placeholder. |
| `maxLength` | `number` |  |  |  | evidence (2026-10-13) | Limits how many characters people can type; there is no counter. |
| `defaultValue` | `string` |  |  |  | evidence (2026-10-13) | Ignored: the note doesn't start from it. To start with a note, pass value and update it from onChangeText. |

### Modes

_No modes._

### Slots

_No slots._

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onChangeText` | `(text: string) => void` |  |  |  | types | Callback when text changes |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- The published Storybook has one Note Input story; newer stories are not deployed yet. _(evidence, 2026-10-13)_
- The package's JSDoc is out of date: it still mentions an InputState mode and a blinking cursor. _(evidence, 2026-10-13)_

## Flags

_None._
