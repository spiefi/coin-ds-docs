# MessageField

> Coin agent pack 0.1.78+21 (pilot). Generated from `components/messagefield.json`; the JSON is the source of truth.

- **State:** flagged (3 flags, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `cba512f` · built 2026-10-31T00:47:40Z
- **Category:** input (for discovery only, not a limit on composition) · **Tags:** textarea, multiline, comment box, feedback, message
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=messagefield) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4835-2564) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-messagefield--docs)

Use a Message Field for a few sentences of free text, such as feedback or a description of a problem.

## Use when

- **recommended** A few sentences of free text, such as feedback or a description of a problem.  
  _From summary: “Use a Message Field for a few sentences of free text, such as feedback or a description of a problem.”_
- **recommended** Reporting a problem, as in the guide's In context screen: people describe the issue, then tap Submit.  
  _From inContext: “Report a problem”_

## Avoid when

- **discouraged** A short value, such as an order number: use a FormField, one line for one value. A four-line box suggests a long answer. Use instead: `FormField`.  
  _From doDont: “A four-line box suggests a long answer.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Label | Names the message and gives the field its accessible name (label). | no | anatomy: “Names the message and gives the field its accessible name.” |
| Required mark | A red asterisk after the label for a message people must write (isRequired). | no | anatomy: “A red asterisk for a message people must write.” |
| Placeholder | A writing hint that disappears when people type (placeholder). | no | anatomy: “A writing hint that disappears when people type.” |
| Text area | White box, four lines tall unless rows is set; purple border on focus. | yes | anatomy: “White box, four lines tall; purple border on focus.” |
| Counter | Characters used out of the limit (maxLength); shown when a limit is set. | no | anatomy: “Characters used out of the limit; shown when a limit is set.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

_No slots._

## Placement

- **recommended** Message Field fills its container’s width; set the width with the container.  
  _From sizing: “Message Field fills its container’s width.”_
- **recommended** The text area is 108 px tall, room for four lines, with 12 px of padding; each extra row adds 21 px. The counter sits 8 px below. ⚑ flagged (human)  
  _From sizing: “The text area is 108 px tall, room for four lines, with 12 px of padding; each extra row adds 21 px. The counter sits 8 px below.”_

## Configuration

- **recommended** `maxLength`: Set a limit with maxLength: it adds a counter and stops typing when the limit is reached.  
  _From configuration: “A limit adds a counter and stops typing when it is reached.”_
- **recommended** `maxLength`: Without a limit (maxLength unset) there is no counter. ⚑ flagged (human)  
  _From configuration: “Without a limit there is no counter.”_
- **discouraged** `showCounter` = `false`: Do not hide the counter on a field with a limit (showCounter false): typing stops at the limit with no warning.  
  _From doDont: “Typing stops at the limit with no warning.”_
- **recommended** `rows`: Set rows for a taller text area, such as six rows for a longer description; longer text scrolls inside it.  
  _From configuration: “Rows set how tall the text area is; longer text scrolls inside it.”_
- **recommended** `isRequired`: Mark a message people must write with isRequired: a red asterisk follows the label.  
  _From anatomy: “A red asterisk for a message people must write.”_
- **recommended** `isInvalid`: The screen checks the message when people tap Submit and sets the error on the field (isInvalid with errorMessage); Message Field only shows it. In the guide's Report a problem screen the Submit button stays enabled.  
  _From inContext: “The screen checks the message when people tap Submit and sets the error on the field. Message Field only shows it, and the button stays enabled.”_
- **recommended** `errorMessage`: Say what to fix: give an invalid field an errorMessage, so the message below says what is missing.  
  _From doDont: “The message below says what is missing.”_
- **discouraged** `isInvalid`: Do not rely on red alone (isInvalid without errorMessage): the red border does not say what is wrong.  
  _From doDont: “The red border does not say what is wrong.”_
- **recommended** `supportText`: supportText adds a supporting line under the field; errorMessage replaces it while the field is invalid.  
  _From fact `/facts/props/13` (supportText, source types)_
- **recommended** `isReadOnly`: Use isReadOnly for text people can read but not change.  
  _From states: “people can read the text but not change it.”_
- **recommended** `isDisabled`: Use isDisabled for a field that does not apply yet.  
  _From states: “Use it for a field that does not apply yet.”_
- **discouraged** `FormField States`: Set the state with isInvalid, isDisabled and isReadOnly, not with the FormField States mode: the field derives that mode itself (with focus) and ignores it in modes.  
  _From evidence: “State cascade: invalid → Error; disabled → Disabled; read-only → Read Only; focused → Active; otherwise Idle. `modes['FormField States']` is ignored.”_
- **recommended** `value`: With value, the screen owns the text and updates it in onChangeText.  
  _From fact `/facts/props/2` (value, source types)_

## Content

- **recommended** Room to explain, with a clear limit.  
  _From corePrinciple: “Room to explain, with a clear limit.”_
- **recommended** Ask for one thing, with a fitting limit.  
  _From content: “Ask for one thing, with a fitting limit”_
- **recommended** `label`: Name the message in the label, such as “Describe your issue”.  
  _From content: “Name the message in the label, such as “Describe your issue””_
- **recommended** `placeholder`: Use the placeholder for a writing hint, such as “What happened, and when?”.  
  _From content: “use the placeholder for a writing hint”_
- **recommended** `maxLength`: Pick a limit that fits the task: 140 characters for a short reason, 1,000 for a detailed description.  
  _From content: “Pick a limit that fits the task: 140 characters for a short reason, 1,000 for a detailed description.”_
- **recommended** `label`: Write the label in sentence case; the placeholder is a writing hint, never the only name for the field.  
  _From evidence: “Labels name the message in sentence case; the placeholder is a writing hint, never the only name.”_

Good: “Describe your issue”, “What happened, and when?”, “Reason for cancelling”, “Help us understand why you’re leaving”, “Add a few more details, at least 20 characters”

## States

| State | When | From |
| --- | --- | --- |
| Default | No state prop set; selecting the field draws the purple focus border. | states: “Select the field to see the purple focus border.” |
| Focused | While the field has focus: a purple border. | states: “Focus draws a purple border.” |
| Filled | With text: the counter tracks the length, and the text stays dark when people leave the field. | states: “The counter tracks the length, and the text stays dark when people leave the field.” |
| Error | isInvalid: red label and border, with the message (errorMessage) below the field. | states: “Red label and border, with the message below the field.” |
| Read only | isReadOnly: grey label and border; people can read the text but not change it. | states: “Grey label and border; people can read the text but not change it.” |
| Disabled | isDisabled: grey text and border, and Tab skips it; for a field that does not apply yet. | states: “Grey text and border, and Tab skips it. Use it for a field that does not apply yet.” |

## Accessibility

- **recommended** `label`: The label names the message and gives the field its accessible name.  
  _From anatomy: “Names the message and gives the field its accessible name.”_
- **recommended** On the web the label names the text area; screen readers also announce required and invalid fields and read the error or support text with them. Tab skips a disabled field.  
  _From sources: “On the web the label names the text area; screen readers also announce required and invalid fields and read the error or support text with them. Tab skips a disabled field.”_
- **recommended** `accessibilityLabel`: accessibilityLabel names the text area; without it the field is named by its label, then its placeholder.  
  _From fact `/facts/props/20` (accessibilityLabel, source types)_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Show the limit | Hide the counter on a limit | Typing stops at the limit with no warning. |
| Say what to fix | Rely on red alone | The red border does not say what is wrong. |
| Use a Form Field for a short value | Ask for a short value in a Message Field | A four-line box suggests a long answer. |

## Examples

### Report a problem, the guide's In context: a Card holds a required field with a 500-character limit and a Submit Button. The screen owns the text (value and onChangeText); when people tap Submit it checks the message and sets isInvalid, and errorMessage says what to fix. The button stays enabled.

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

_From inContext: “The screen checks the message when people tap Submit and sets the error on the field.”_

### Error, the guide's Error state and its Do “Say what to fix”: the screen sets isInvalid, and errorMessage below the field says what is missing.

```tsx
<MessageField
  label="Describe your issue"
  value="Charged twice"
  onChangeText={() => {}}
  maxLength={140}
  isInvalid
  errorMessage="Add a few more details, at least 20 characters"
/>
```

_From states: “Red label and border, with the message below the field.”_

### Taller: six rows (150 px) and a 1,000-character limit for a longer description.

```tsx
<MessageField
  label="Describe your issue"
  placeholder="What happened, and when?"
  rows={6}
  maxLength={1000}
/>
```

_From configuration: “Six rows for a longer description.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `label` | `string` |  |  |  | types | Label rendered above the textarea. |
| `placeholder` | `string` |  |  |  | types | Placeholder text shown when the textarea is empty. |
| `value` | `string` |  |  |  | types | Current value of the textarea (controlled). When provided, the consumer is responsible for updating it via `onChangeText`. |
| `defaultValue` | `string` |  |  |  | types | Initial value when used uncontrolled. Ignored when `value` is provided. |
| `onChangeText` | `(text: string) => void` |  |  |  | types | Called whenever the text changes. Fires for both controlled and uncontrolled use. |
| `name` | `string` |  |  |  | types | Form field name. When the field is rendered inside a `<Form>`, this is the key used to look up server-side `validationErrors` and to clear the error when the value changes. |
| `maxLength` | `number` |  |  |  | evidence (2026-10-02) | Typing stops at the limit, and the counter then reads the limit out of the limit (200/200 for 200). Declared: Maximum number of characters accepted. Drives the counter when `showCounter` is not explicitly false. |
| `showCounter` | `boolean` |  |  |  | evidence (2026-10-02) | With showCounter and no maxLength, the counter shows a bare count. Declared: Controls visibility of the character counter. - Default: counter is shown when `maxLength` is provided. - `true`: always show counter (shows `<count>/<maxLength>` when `maxLength` is set, or just `<count>` otherwise). - `false`: never show counter. |
| `rows` | `number` |  |  |  | evidence (2026-10-02) | The text area is rows × 21 + 24 px tall when rows is set, otherwise the 108 px token (four rows); text scrolls inside it. Declared: Number of visible text rows. When provided, overrides the default `messageField/textarea/height` token to derive the textarea height as `rows * lineHeight + 2 * padding`. |
| `isRequired` | `boolean` |  | `false` |  | evidence (2026-10-08) | On the web the text area has aria-required, and the asterisk uses the Negative (red) token. Declared: Renders a required indicator (asterisk) next to the label. Default false, from the component source. |
| `isDisabled` | `boolean` |  | `false` |  | evidence (2026-10-08) | On the web a disabled field has aria-disabled and tabindex -1, so Tab skips it. Declared: Disables interaction and applies the Disabled token mode. Default false, from the component source. |
| `isInvalid` | `boolean` |  | `false` |  | types | Marks the field as invalid and resolves to the `Error` state token mode. Default false, from the component source. |
| `errorMessage` | `string` |  |  |  | evidence (2026-10-08) | Replaces supportText only while the field is invalid; the message sits between the text area and the counter. Declared: Message shown under the field when `isInvalid` is set. Also used for a Form validation error. |
| `supportText` | `string` |  |  |  | types | Supporting line under the field. Replaced by `errorMessage` while invalid. |
| `isReadOnly` | `boolean` |  | `false` |  | types | Read-only, non-interactive but not dimmed. Default false, from the component source. |
| `autoFocus` | `boolean` |  | `false` |  | types | Auto-focus the textarea on mount. Default false, from the component source. |
| `modes` | `Modes` |  |  |  | types | Modes for design token resolution (e.g. `{ 'Color Mode': 'Light' }`). |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Style overrides for the outermost wrapper. |
| `textareaStyle` | `StyleProp<ViewStyle>` |  |  |  | types | Style overrides for the textarea container (border/padding/etc). |
| `inputStyle` | `StyleProp<TextStyle>` |  |  |  | types | Style overrides for the input text. |
| `accessibilityLabel` | `string` |  |  |  | types | Accessibility label. Defaults to `label` or `placeholder`. |
| `accessibilityHint` | `string` |  |  |  | types | Accessibility hint. |
| `testID` | `string` |  |  |  | types | Test identifier. |
| `onFocus` | `RNTextInputProps['onFocus']` |  |  |  | types | Called when the textarea receives focus. |
| `onBlur` | `RNTextInputProps['onBlur']` |  |  |  | types | Called when the textarea loses focus. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection MessageField reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `FormField States` | `mode collection` | Idle, Active, Read Only, Error, Disabled | `"Idle"` |  | evidence (2026-10-02) | MessageField sets this mode itself from its props and focus: invalid gives Error, then disabled gives Disabled, read-only gives Read Only, focus gives Active, otherwise Idle. A value passed in modes is ignored. Declared: A token collection MessageField reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

_No slots._

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onChangeText` | `(text: string) => void` |  |  |  | types | Called whenever the text changes. Fires for both controlled and uncontrolled use. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- Figma's Message Field has a fixed “0/140” counter and its states are variable modes; the package adds the required mark, a rows option, a counter that shows only with a limit, and support text or an error message below the text area, none of which Figma has. _(evidence, 2026-10-08)_ ⚑ flagged (human)

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/configuration/1` · human: "Without a limit there is no counter." is true only by default: with showCounter set and no maxLength the installed MessageField shows a plain count (MessageField.tsx, 0.1.78-dbe0e02, read from source). An agent reading this rule would think showCounter does nothing without a limit. Guide fix #518. Added by Claude Code in the overnight run agentpack-batch5, for Marcin to confirm.
- `/facts/gaps/0` · human: "a counter that shows only with a limit" (the guide's Sources note) is true only by default: with showCounter set and no maxLength the installed MessageField shows a plain count (the entry's showCounter fact; MessageField.tsx, 0.1.78-dbe0e02, read from source). Same problem as /configuration/1: guide fix #518. Added by Claude Code in the overnight run agentpack-r20 (release 0.1.78+20), for Marcin to confirm.
- `/placementAdvice/1` · human: "The counter sits 8 px below." holds only with no message under the field: with support text or an error message, the message sits between the text area and the counter (the entry's errorMessage fact; MessageField.tsx, 0.1.78-dbe0e02, read from source). Guide fix #518. Added by Claude Code in the overnight run agentpack-r20 (release 0.1.78+20), for Marcin to confirm.
