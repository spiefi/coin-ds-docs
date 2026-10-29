# Form

> Coin agent pack 0.1.78+17 (pilot). Generated from `components/form.json`; the JSON is the source of truth.

- **State:** flagged (2 flags, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `8572e95` · built 2026-10-29T09:06:00Z
- **Category:** input (for discovery only, not a limit on composition) · **Tags:** form layout, validation, field group, server errors
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=form) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1949-7250) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-form--docs)

Use a Form to stack related fields and show the errors your screen sends for each one, such as a bank account’s details.

## Use when

- **recommended** Stack related fields and show the errors your screen sends for each one, such as a bank account’s details.  
  _From summary: “Use a Form to stack related fields and show the errors your screen sends for each one, such as a bank account’s details.”_

## Avoid when

- **discouraged** A single field on its own: the Storybook docs, as the evidence records them, say not to wrap a lone field in a Form.  
  _From evidence: “don't wrap a lone field”_
- **discouraged** A one-time code: the Storybook docs, as the evidence records them, say not to use a Form for OTP.  
  _From evidence: “don't use it for OTP”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Form | An invisible column around the fields (children): 12 px between fields, no padding. | yes | anatomy: “An invisible column: 12 px between fields, no padding.” |
| Named field | A Form Field with a name; it gets the error for that name from validationErrors. | no | anatomy: “A Form Field with a name gets the error for that name.” |
| Error message | Shown by the field while the Form has an error for it. | no | anatomy: “Shown by the field while the Form has an error for it.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `children` | `ReactNode` | types |

## Placement

- **recommended** A Form fills its container and adds 12 px between its fields, with no padding.  
  _From sizing: “Form fills its container and adds 12 px between its fields, with no padding.”_
- **recommended** A Form draws nothing of its own: no background, border, or title.  
  _From anatomy: “It draws nothing of its own: no background, border, or title.”_
- **recommended** Each Form Field keeps its own height in a Form: 72 px with a label, 96 px with a message.  
  _From sizing: “Each Form Field keeps its own height: 72 px with a label, 96 px with a message.”_
- **recommended** In the guide’s bank-details screen, the Verify account button sits outside the Form and stays enabled.  
  _From inContext: “The button sits outside the Form and stays enabled.”_
- **recommended** Keep the button enabled: people tap it and see which field to fix.  
  _From doDont: “People tap it and see which field to fix.”_
- **discouraged** Do not disable the button instead: a greyed-out button doesn’t say what’s missing.  
  _From doDont: “A greyed-out button doesn’t say what’s missing.”_

## Configuration

- **recommended** `validationErrors`: Give each field a name, and pass the errors keyed by those names in validationErrors.  
  _From configuration: “Give each field a name, and pass the errors keyed by those names.”_
- **recommended** Form has no other options that change what people see.  
  _From configuration: “Form has no other options that change what people see.”_
- **recommended** `validationErrors`: An error for one field: only the field whose name matches shows the message.  
  _From configuration: “Only the field whose name matches shows the message.”_
- **recommended** `validationErrors`: Given a list of messages for one field, the field shows only the first message.  
  _From configuration: “Given a list, the field shows only the first message.”_
- **recommended** `validationErrors`: Like the guide’s bank-details screen: when people tap Verify, the screen checks the details and passes the errors to the Form.  
  _From inContext: “When people tap Verify, the screen checks the details and passes the errors to the Form.”_
- **recommended** Name every field: the message appears under the field it’s about.  
  _From doDont: “The message appears under the field it’s about.”_
- **discouraged** Do not leave a field unnamed: the Form has an error for it, but the field never shows it.  
  _From doDont: “The Form has an error for it, but the field never shows it.”_
- **recommended** `children`: Use a Form Field for each value: Form Field shows the message under the field.  
  _From doDont: “Form Field shows the message under the field.”_
- **discouraged** `children`: Do not put a Text Input in a Form: Text Input ignores the Form, so the error never appears.  
  _From doDont: “Text Input ignores the Form, so the error never appears.”_

## Content

- **recommended** Group the fields; let each one show its own problem.  
  _From corePrinciple: “Group the fields; let each one show its own problem.”_
- **recommended** `validationErrors`: Key each message to the field it’s about, and write it as one sentence that says how to fix the value.  
  _From content: “Key each message to the field it’s about, and write it as one sentence that says how to fix the value.”_
- **recommended** Show problems with the whole form, such as a failed payment, outside the Form.  
  _From content: “Show problems with the whole form, such as a failed payment, outside it.”_

Good: “IFSC codes have 11 characters”, “Account numbers have 9 to 18 digits”, “Enter an email address like name@example.com”

## States

| State | When | From |
| --- | --- | --- |
| No errors | With no errors sent, the fields stand 12 px apart with nothing added. | configuration: “The fields, 12 px apart, with nothing added.” |
| Showing an error | A field shows its error until people change its value, then the message clears. | states: “A field shows its error until people change its value, then the message clears.” |
| Edited | Typing in a named field clears its error; the others stay. | evidence: “Typing in the named field clears its error; the others stay.” |
| New errors sent | When the screen sends a new set of errors, they all show again. | states: “When the screen sends a new set of errors, they all show again.” |

## Accessibility

_None in the guide._

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Name every field | Leave a field unnamed | The Form has an error for it, but the field never shows it. |
| Use Form Field for each value | Put a Text Input in a Form | Text Input ignores the Form, so the error never appears. |
| Keep the button enabled | Disable the button instead | A greyed-out button doesn’t say what’s missing. |

## Examples

### Checking bank details, the guide's In context: a Card holds the Form and the Verify account Button, which sits outside the Form and stays enabled. Shown after people tapped Verify account with the account number and IFSC code empty: the screen's check passed these errors, keyed by the fields' names, and each named field shows its own. Editing a field clears its message. The inline errors and the onChangeText and onPress stubs stand in for the screen's own state and check.

```tsx
<Card>
  <VStack>
    <Form validationErrors={{ account: 'Account numbers have 9 to 18 digits', ifsc: 'IFSC codes have 11 characters' }}>
      <FormField name="holder" label="Account holder name" value="Asha Rao" onChangeText={() => {}} />
      <FormField name="account" type="number" label="Account number" value="" onChangeText={() => {}} />
      <FormField name="ifsc" label="IFSC code" value="" onChangeText={() => {}} />
    </Form>
    <Button label="Verify account" onPress={() => {}} />
  </VStack>
</Card>
```

_From inContext: “When people tap Verify, the screen checks the details and passes the errors to the Form.”_

### An error for one field: only the field named ifsc shows the message; the account holder name field shows nothing added.

```tsx
<Form validationErrors={{ ifsc: 'IFSC codes have 11 characters' }}>
  <FormField name="holder" label="Account holder name" value="Asha Rao" onChangeText={() => {}} />
  <FormField name="ifsc" label="IFSC code" value="SBIN000123" onChangeText={() => {}} />
</Form>
```

_From configuration: “Only the field whose name matches shows the message.”_

### Edit to clear, the guide's States example: errors for two fields; typing in either field clears its message and the other stays.

```tsx
<Form validationErrors={{ account: 'Account numbers have 9 to 18 digits', ifsc: 'IFSC codes have 11 characters' }}>
  <FormField name="account" type="number" label="Account number" value="12345" onChangeText={() => {}} />
  <FormField name="ifsc" label="IFSC code" value="SBIN000123" onChangeText={() => {}} />
</Form>
```

_From states: “Type in either field: its message clears and the other stays.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  | yes | types |  |
| `validationErrors` | `Record<string, string \| string[]>` |  |  |  | evidence (2026-10-07) | Only FormField, FormUpload and MessageField read it, and only when they have a name; a field's own errorMessage wins over the Form's error. |
| `onSubmit` | `() => void` |  |  |  | types |  |
| `modes` | `Modes` |  |  |  | evidence (2026-10-07) | Resolves only the Form's own tokens (gap and padding, single mode) and is not passed to the fields. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types |  |
| `accessibilityLabel` | `string` |  |  |  | types |  |
| `testID` | `string` |  |  |  | types |  |

### Modes

_No modes._

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | evidence (2026-10-07) | TextInput ignores the Form: a Text Input never shows the Form's errors. |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onSubmit` | `() => void` |  |  |  | types |  |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- Form shows no error summary of its own: each error shows only under its field (#207). _(evidence, 2026-10-07)_
- The published Storybook for Form is stale, and its docs page claims mode theming (#207). _(evidence, 2026-10-07)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/accessibility` · trace-check: The guide gives no accessibility guidance; left empty rather than guessed.
- `(whole entry)` · human: The live Form guide on main (51f6153) is older than the guide on docs-next (8572e95, where this entry’s copy was read): the 8 October publish of the #186/#187 fixes never reached main’s Form guide, so the live Sources note still says “In this version Message Field turns red but shows no message”, which the installed 0.1.78-dbe0e02 contradicts (MessageField shows the Form error). Both versions also say “its onSubmit property does nothing” and that the form has no accessible name; the installed Form.tsx calls onSubmit on Enter and when a Form Field submits, and names the form with accessibilityLabel (Component Bug #207’s points, In progress). The entry quotes only sentences the same on main and docs-next and leaves the Sources note out. Guide fix #528. Added by Claude Code in the overnight run agentpack-batch8, for Marcin to confirm.
