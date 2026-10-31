# MessageField (brief)

> Coin agent pack 0.1.78+22 · flagged · full entry: `components/messagefield.md` (sources, all facts, flags)

Use a Message Field for a few sentences of free text, such as feedback or a description of a problem.

**Use when**
- A few sentences of free text, such as feedback or a description of a problem.
- Reporting a problem, as in the guide's In context screen: people describe the issue, then tap Submit.

**Avoid when**
- Avoid: A short value, such as an order number: use a FormField, one line for one value. A four-line box suggests a long answer. Use instead: FormField.

**Placement**
- Message Field fills its container’s width; set the width with the container.
- The text area is 108 px tall, room for four lines, with 12 px of padding; each extra row adds 21 px. The counter sits 8 px below.

**Key rules**
- `maxLength`: Set a limit with maxLength: it adds a counter and stops typing when the limit is reached.
- `maxLength`: Without a limit (maxLength unset) there is no counter.
- Avoid: `showCounter` = `false`: Do not hide the counter on a field with a limit (showCounter false): typing stops at the limit with no warning.
- `rows`: Set rows for a taller text area, such as six rows for a longer description; longer text scrolls inside it.
- `isRequired`: Mark a message people must write with isRequired: a red asterisk follows the label.
- `isInvalid`: The screen checks the message when people tap Submit and sets the error on the field (isInvalid with errorMessage); Message Field only shows it. In the guide's Report a problem screen the Submit button stays enabled.
- `errorMessage`: Say what to fix: give an invalid field an errorMessage, so the message below says what is missing.
- Avoid: `isInvalid`: Do not rely on red alone (isInvalid without errorMessage): the red border does not say what is wrong.

**Example:** Report a problem, the guide's In context: a Card holds a required field with a 500-character limit and a Submit Button. The screen owns the text (value and onChangeText); when people tap Submit it checks the message and sets isInvalid, and errorMessage says what to fix. The button stays enabled.

```tsx
<Card>
  <VStack>
    <MessageField
      label="Describe your issue"
      placeholder="What happened, and when?"
      maxLength={500}
      isRequired
      value=""
      onChangeText={() => {}}
      isInvalid={false}
      errorMessage="Add a few more details, at least 20 characters"
    />
    <Button label="Submit" onPress={() => {}} />
  </VStack>
</Card>
```

**Props:** `label`, `placeholder`, `value`, `defaultValue`, `onChangeText`, `name`, `maxLength`, `showCounter`, `rows`, `isRequired`, `isDisabled`, `isInvalid`, `errorMessage`, `supportText`, `isReadOnly`, `autoFocus`, `modes`, `style`, `textareaStyle`, `inputStyle`, `accessibilityLabel`, `accessibilityHint`, `testID`, `onFocus`, and 1 more. (* required)

**Modes it reads:** Color Mode, FormField States.

**Gaps (report, do not work around)**
- Figma's Message Field has a fixed “0/140” counter and its states are variable modes; the package adds the required mark, a rows option, a counter that shows only with a limit, and support text or an error message below the text area, none of which Figma has.

Full entry: `components/messagefield.md`. Links: `components/messagefield.links.md`.
