# TransactionDetails

> Coin agent pack 0.1.78+12 (pilot). Generated from `components/transactiondetails.json`; the JSON is the source of truth.

- **State:** documented
- **Package:** jfs-components 0.1.78 · guide commit `e7ed622` · built 2026-10-29T04:33:30Z
- **Category:** content (for discovery only, not a limit on composition) · **Tags:** receipt, payment details, transaction info, label and value, key value list
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=transactiondetails) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1557-7798) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-transactiondetails--docs)

Use Transaction Details to list the facts of one payment as label and value pairs: its ID, the accounts, and how it was paid.

## Use when

- **recommended** List the facts of one payment as label and value pairs: its ID, the accounts, and how it was paid.  
  _From summary: “Use Transaction Details to list the facts of one payment as label and value pairs: its ID, the accounts, and how it was paid.”_
- **recommended** The receipt behind a payment.  
  _From inContext: “The receipt behind a payment”_

## Avoid when

- **discouraged** Items people should press, select, copy, collapse or page through: the list has no states, and its items are static text.  
  _From states: “The list has no states: its items don’t press, select, copy, collapse, or page.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Label | label, 14 px Medium in near-black; it names the fact. | yes | anatomy: “label, 14 px Medium in near-black; it names the fact.” |
| Value | value, the same size in a softer grey, 4 px under its label. | yes | anatomy: “value, the same size in a softer grey, 4 px under its label.” |
| Item | TransactionDetails.Item: one label and its value. | yes | anatomy: “TransactionDetails.Item: one label and its value.” |
| List | TransactionDetails: stacks its items 16 px apart, with no padding. | yes | anatomy: “TransactionDetails: stacks its items 16 px apart, with no padding.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `children` | `ReactNode` | types |

## Placement

- **recommended** The details sit on the screen a payment opens, under its amount and outcome.  
  _From inContext: “The details sit on the screen a payment opens, under its amount and outcome.”_
- **recommended** The screen adds the heading and the action; the list holds only the facts.  
  _From inContext: “The screen adds the heading and the action; the list only holds the facts”_
- **recommended** The list has no surface, divider or icon: the screen around it provides those.  
  _From anatomy: “There’s no surface, divider, or icon: the screen around it provides those.”_
- **recommended** To let people copy an ID or share the receipt, put a button on the screen.  
  _From states: “To let people copy an ID or share the receipt, put a button on the screen.”_
- **recommended** The list has no width of its own: it fills its column, and each item is as wide as its text.  
  _From sizing: “The list has no width of its own: it fills its column, and each item is as wide as its text.”_
- **recommended** A long value wraps under its label; nothing is cut.  
  _From sizing: “A long value wraps under its label; nothing is cut.”_
- **recommended** Items sit 16 px apart, and a label sits 4 px above its value, each on a 17 px line.  
  _From sizing: “Items sit 16 px apart, and a label sits 4 px above its value, each on a 17 px line.”_
- **recommended** In a flex row the list keeps its natural width and doesn't shrink.  
  _From evidence: “In a flex row the list keeps its natural width (doesn't shrink).”_

## Configuration

- **recommended** `modes`: The list has nothing to set: no variants, and no mode changes it.  
  _From configuration: “The list has nothing to set: no variants, and no mode changes it.”_
- **recommended** `children`: You choose the items and their order: one TransactionDetails.Item each, with a label and a value.  
  _From configuration: “You choose the items and their order, one TransactionDetails.Item each, with a label and a value.”_
- **recommended** `children`: A single fact is still a list of one: one TransactionDetails.Item in a TransactionDetails.  
  _From states: “A single fact is still a list of one.”_
- **recommended** `TransactionDetails.Item`: An item's label defaults to the word Label and its value to the word Value.  
  _From evidence: “`TransactionDetails.Item`: `label` (default 'Label'), `value` (default 'Value')”_

## Content

- **recommended** Name the fact, then give it.  
  _From corePrinciple: “Name the fact, then give it.”_
- **recommended** Put the reference people quote first, then who paid whom, then how.  
  _From configuration: “Put the reference people quote first, then who paid whom, then how.”_
- **recommended** Write each label as a field name, such as UPI transaction ID, From, To, or Payment method.  
  _From content: “Write each label as a field name, such as UPI transaction ID, From, To, or Payment method.”_
- **recommended** Keep labels to short names people scan for.  
  _From content: “Short names people scan for.”_
- **REQUIRED** Write the value as the data itself, never a sentence.  
  _From content: “Write the value as the data itself, never a sentence”_
- **recommended** Mask account numbers to their last four digits.  
  _From content: “mask account numbers to their last four digits”_
- **discouraged** Do not repeat the value in the label.  
  _From content: “The label shouldn’t repeat the value.”_
- **discouraged** Do not put the ID in both places: the label repeats the number.  
  _From doDont: “The label repeats the number.”_
- **recommended** One fact per item.  
  _From doDont: “One fact per item.”_
- **discouraged** Do not write a sentence as a value: people have to read it to find the fact.  
  _From doDont: “People have to read it to find the fact.”_

Good: “UPI transaction ID”, “101674916166”, “From”, “JioFinance ··1234”, “To”, “Rahul Verma · rahul@okjio”, “Payment method”, “UPI”, “Payment details”

Bad: “UPI transaction ID 101674916166”, “You paid with UPI from your JioFinance account ending 1234.”

## States

| State | When | From |
| --- | --- | --- |
| Static | Always: the list has no states, and its items don't press, select, copy, collapse, or page. | states: “The list has no states: its items don’t press, select, copy, collapse, or page.” |

## Accessibility

- **recommended** `accessibilityLabel`: Name the list for screen readers with accessibilityLabel; the guide's receipt screen names it “Payment details”.  
  _From inContext: “its accessibilityLabel, Payment details, names it for screen readers.”_
- **recommended** On the web the list is named by its accessibilityLabel, and each item is read once as its label and value, unless the item's own accessibilityLabel replaces them; phone screen readers read the items too.  
  _From sources: “On the web it’s a list named by its accessibilityLabel, and each item is read once as its label and value, unless the item’s own accessibilityLabel replaces them; phone screen readers read the items too.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Name, then the fact | The ID in both places | The label repeats the number. |
| Data in the value | A sentence as a value | People have to read it to find the fact. |

## Examples

### The receipt a payment opens: the screen puts the amount and outcome above in a Title and its action, Share receipt, below; the list holds the facts and is named “Payment details” for screen readers.

```tsx
<VStack justifyVertical="space-between" style={{ flex: 1, padding: 16 }}>
  <VStack>
    <Title title="Paid ₹1,200" subtitle="To Rahul Verma · 21 Oct 2026, 4:15 pm" />
    <TransactionDetails accessibilityLabel="Payment details">
      <TransactionDetails.Item label="UPI transaction ID" value="101674916166" />
      <TransactionDetails.Item label="From" value="JioFinance ··1234" />
      <TransactionDetails.Item label="To" value="Rahul Verma · rahul@okjio" />
      <TransactionDetails.Item label="Payment method" value="UPI" />
    </TransactionDetails>
  </VStack>
  <Button label="Share receipt" onPress={() => {}} />
</VStack>
```

_From inContext: “The details sit on the screen a payment opens, under its amount and outcome.”_

### A bank transfer: the reference first, then both accounts masked to their last four digits, then how and when.

```tsx
<TransactionDetails accessibilityLabel="Transfer details">
  <TransactionDetails.Item label="Transfer ID" value="TXN202610210001" />
  <TransactionDetails.Item label="From account" value="Savings ··1234" />
  <TransactionDetails.Item label="To account" value="Current ··5678" />
  <TransactionDetails.Item label="Transfer type" value="IMPS" />
  <TransactionDetails.Item label="Date and time" value="21 Oct 2026, 10:30 am" />
</TransactionDetails>
```

_From configuration: “Put the reference people quote first, then who paid whom, then how.”_

### A single fact, still a list of one: the item stays inside a TransactionDetails.

```tsx
<TransactionDetails accessibilityLabel="Payment details">
  <TransactionDetails.Item label="UPI transaction ID" value="101674916166" />
</TransactionDetails>
```

_From states: “A single fact is still a list of one.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | evidence (2026-10-25) | TransactionDetails.Item children. Nothing truncates: long text wraps. Declared: Slot for TransactionDetails.Item children. |
| `modes` | `Modes` |  |  |  | evidence (2026-10-25) | No mode changes the list or its items: their tokens are one-mode collections of literals. The list passes its modes to its items, and an item's own modes win. Declared: Modes object passed to `getVariableByName` for design token resolution. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Optional container style overrides. |
| `accessibilityLabel` | `string` |  |  |  | evidence (2026-10-27) | On the web the list is a list (ul, role list) named by accessibilityLabel, with no name without it. On native the list is not accessible itself (accessible={false}), so iOS probably never says its name (not checked on a device). Declared: Accessibility label for screen readers. |
| `...React.ComponentProps<typeof View>` | `React.ComponentProps<typeof View>` |  |  |  | types | Inherited React Native props the component also accepts. They are not part of the design contract and no guide documents them. |
| `TransactionDetails.Item` | `component` |  |  |  | evidence (2026-10-27) | On the web each Item is a list item (li, role listitem) named “label: value” (its own accessibilityLabel wins), its text hidden so it is read once, and not a Tab stop. On native each Item is accessible with role text and the label “label: value”. Declared: A static sub-component of TransactionDetails. Its own props: label, value, modes, style, labelStyle, valueStyle, accessibilityLabel. |

### Modes

_No modes._

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types | Slot for TransactionDetails.Item children |

### Events

_No events._

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- On the web, a TransactionDetails.Item on its own, outside a TransactionDetails, renders a list item (li) with no list (#413, Component Fix, To do). The guide never shows a standalone Item. _(evidence, 2026-10-27)_
- Figma draws each Detail Item at a fixed 315 px; the package sizes items to their text, and the list fills its column. _(evidence, 2026-10-25)_

## Flags

_None._
