# FormField

> Coin agent pack 0.1.78+21 (pilot). Generated from `components/formfield.json`; the JSON is the source of truth.

- **State:** documented
- **Package:** jfs-components 0.1.78 · guide commit `cba512f` · built 2026-10-31T00:47:40Z
- **Category:** input (for discovery only, not a limit on composition) · **Tags:** input, text field, form input, label, error message
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=formfield) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1922-5647) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-formfield--docs)

Use a Form Field to collect one labelled value, such as an account number, with a hint or an error message below it.

## Use when

- **recommended** Collect one labelled value, such as an account number, with a hint or an error message below it.  
  _From summary: “Use a Form Field to collect one labelled value, such as an account number, with a hint or an error message below it.”_

## Avoid when

- **discouraged** The input is unlabelled chrome, a code, or a file: the Storybook docs (as the evidence records them) point to TextInput or InputSearch for unlabelled chrome, OTP for codes, and FormUpload for files.  
  _From evidence: “TextInput or InputSearch for unlabelled chrome, OTP for codes, FormUpload for files.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Label | The label text above the field; names the value and gives the field its accessible name. | no | anatomy: “Names the value and gives the field its accessible name.” |
| Required mark | A red asterisk beside the label, for fields people must fill in (isRequired). | no | anatomy: “A red asterisk for fields people must fill in.” |
| Start icon | An optional 18 px icon before the text, such as the rupee sign. | no | anatomy: “Optional 18 px icon, such as the rupee sign.” |
| Input | The placeholder, which shows the format, then what people type. | yes | anatomy: “The placeholder shows the format; then what people type.” |
| Field | The white box; its border turns purple on focus and red on error. | yes | anatomy: “White box; purple border on focus, red on error.” |
| Support text | A hint below the field; an error message replaces it. | no | anatomy: “A hint below the field; an error message replaces it.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `leading` | `ReactNode` | types |
| `trailing` | `ReactNode` | types |

## Placement

- **recommended** Form Field fills its container's width; the screen sets the width. The field is 47 px tall, and the label and support text sit 8 px above and below it.  
  _From sizing: “Form Field fills its container’s width. The field is 47 px tall with 12 px of padding at each end, and the label and support text sit 8 px above and below it. The screen sets the width.”_
- **recommended** In a narrow column the field narrows with its column, and the hint wraps.  
  _From sizing: “The field narrows with its column, and the hint wraps.”_
- **recommended** `isInvalid`: Let the screen check the values (for example when people tap Verify) and set the error on the field; Form Field only shows it, and the button stays enabled.  
  _From inContext: “The screen checks the values when people tap Verify and sets the error on the field. Form Field only shows it, and the button stays enabled.”_
- **recommended** Keep the primary action enabled and show the error on the field; the Storybook docs say disabled is not a validation strategy.  
  _From evidence: “Keep the primary action enabled and show the error on the field”_

## Configuration

- **recommended** Every option is off unless you set it. Add an icon, an action, or the required mark when it tells people something they need.  
  _From configuration: “Every option is off unless you set it. Add an icon, an action, or the required mark when it tells people something they need.”_
- **recommended** The default configuration is a label, a format example, and a hint below (label, placeholder and supportText).  
  _From configuration: “The default: a label, a format example, and a hint below.”_
- **recommended** `startIcon` = `true`: Turn on startIcon to show the rupee icon, which marks an amount before people type.  
  _From configuration: “The rupee icon marks an amount before people type.”_
- **recommended** `trailing`: Put a small text button in trailing to act on the value without leaving the field.  
  _From configuration: “A small text button acts on the value without leaving the field.”_
- **recommended** `trailing`: For the end action, a Coin Button with AppearanceBrand Secondary, Emphasis Low and Button / Size S renders 74 × 32, transparent with purple text, matching Figma's end slot.  
  _From evidence: “A Coin `Button` with `AppearanceBrand: Secondary`, `Emphasis: Low`, `Button / Size: S` in `trailing` renders 74 × 32, transparent with purple `rgb(93,0,181)` text, matching Figma's end slot.”_
- **recommended** `isRequired` = `true`: Set isRequired to show a red asterisk on a field people must fill in.  
  _From configuration: “A red asterisk marks a field people must fill in.”_
- **recommended** `type` = `password`: Set type password to hide the characters.  
  _From configuration: “The type hides the characters.”_
- **recommended** `type`: Set type to email, phone or number to pick the keyboard for those fields.  
  _From configuration: “It also picks the keyboard for email, phone, and number fields.”_
- **discouraged** `isInvalid`: Do not show red without a message: colour alone does not say what is wrong.  
  _From doDont: “Colour alone does not say what is wrong.”_
- **recommended** `isReadOnly` = `true`: Show fixed values as read only (isReadOnly): full contrast keeps the value easy to read.  
  _From doDont: “Full contrast keeps the value easy to read.”_
- **recommended** `isDisabled` = `true`: Use isDisabled for a field that does not apply yet.  
  _From states: “Use it for a field that does not apply yet.”_
- **discouraged** `isDisabled` = `true`: Do not disable a value people need to read: half opacity makes it hard to read.  
  _From doDont: “Half opacity makes it hard to read.”_

## Content

- **recommended** A clear label, a format example, and help when it goes wrong.  
  _From corePrinciple: “A clear label, a format example, and help when it goes wrong.”_
- **recommended** `label`: Write the label as the name of the value in sentence case, such as “Account number”, not “Enter your account number”.  
  _From content: “Write the label as the name of the value in sentence case, such as “Account number”, not “Enter your account number”.”_
- **discouraged** `label`: Do not start a label with “Enter” or “Your”.  
  _From evidence: “Labels name the value in sentence case and do not start with "Enter" or "Your"”_
- **discouraged** `placeholder`: Do not use the placeholder as the label: the name disappears as soon as people type.  
  _From doDont: “The name disappears as soon as people type.”_
- **recommended** `placeholder`: Use the placeholder for a format example.  
  _From content: “Use the placeholder for a format example”_
- **recommended** `supportText`: Use support text for a rule.  
  _From content: “support text for a rule”_
- **recommended** `errorMessage`: Write an error that says how to fix the value.  
  _From content: “an error that says how to fix the value”_
- **recommended** `errorMessage`: Say how to fix it: the error message names the fix.  
  _From doDont: “The message names the fix.”_
- **recommended** `errorMessage`: Write the error so it says how to fix the value in one sentence.  
  _From evidence: “error text says how to fix the value in one sentence”_

Good: “Account number”, “IFSC code”, “Mobile number”, “PAN”, “XXXX XXXX XXXX”, “SBIN0001234”, “98765 43210”, “11 characters, on your cheque book”, “We’ll send a code to this number”, “Enter all 10 characters of your PAN”, “IFSC codes have 11 characters”, “Up to ₹50,000 a day”

Bad: “Enter your account number”

## States

| State | When | From |
| --- | --- | --- |
| Default | No state prop set: a grey border. | states: “A grey border. Select the field to see the purple focus border.” |
| Focused | While the field has focus: a purple border. | states: “Focus draws a purple border” |
| Error | isInvalid: red border and fill; errorMessage replaces the hint. | states: “Red border and fill; the message replaces the hint.” |
| Read only | isReadOnly: grey at full contrast; people can read the value but not change it. | states: “Grey and full contrast: people can read the value but not change it.” |
| Disabled | isDisabled: the read-only look at half opacity, and Tab skips it; for a field that does not apply yet. | states: “The read-only look at half opacity, and Tab skips it. Use it for a field that does not apply yet.” |

## Accessibility

- **recommended** `label`: Use label to name the value: it also gives the field its accessible name.  
  _From anatomy: “Names the value and gives the field its accessible name.”_
- **recommended** On the web the label names the input, and screen readers announce required and invalid fields and read the support text or error with them.  
  _From sources: “On the web the label names the input; screen readers also announce required and invalid fields and read the support text or error with them.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Label every field | Use the placeholder as the label | The label stays visible while people type. |
| Say how to fix it | Show red without a message | Colour alone does not say what is wrong. |
| Show fixed values as read only | Disable a value people need to read | Half opacity makes it hard to read. |

## Examples

### A field the screen marks invalid after people tap Verify; the button stays enabled.

```tsx
<VStack modes={{ 'Color Mode': 'Light' }}>
  <FormField
    label="IFSC code"
    placeholder="SBIN0001234"
    supportText="11 characters, on your cheque book"
    isInvalid
    errorMessage="IFSC codes have 11 characters"
    onChangeText={(text) => {}}
    modes={{ 'Color Mode': 'Light' }}
  />
  <Button label="Verify account" onPress={() => {}} modes={{ 'Color Mode': 'Light' }} />
</VStack>
```

_From inContext: “The screen checks the values when people tap Verify and sets the error on the field.”_

### A required amount field with the rupee start icon and a hint.

```tsx
<FormField
  label="Amount"
  placeholder="0"
  startIcon
  isRequired
  supportText="Up to ₹50,000 a day"
  onChangeText={(text) => {}}
  modes={{ 'Color Mode': 'Light' }}
/>
```

_From configuration: “The rupee icon marks an amount before people type.”_

### A promo code field with an Apply text button in the end slot; the Button gets the field's modes plus the end-slot styling.

```tsx
<FormField
  label="Promo code"
  placeholder="JIO200"
  onChangeText={(text) => {}}
  modes={{ 'Color Mode': 'Light' }}
  trailing={<Button label="Apply" onPress={() => {}} modes={{ 'Color Mode': 'Light', AppearanceBrand: 'Secondary', Emphasis: 'Low', 'Button / Size': 'S' }} />}
/>
```

_From configuration: “A small text button acts on the value without leaving the field.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `label` | `string` |  |  |  | types | Label rendered above the input. |
| `placeholder` | `string` |  |  |  | types | Placeholder text shown when the input is empty. |
| `value` | `string` |  |  |  | types | Current value of the input (controlled). |
| `onChangeText` | `(text: string) => void` |  |  |  | types | Called when the input text changes. |
| `type` | `FormFieldType` | number, search, text, password, email, phone, url | `"text"` |  | evidence (2026-10-02) | password masks the value; email sets type=email; number sets inputmode=numeric. Declared: Logical input type. Mapped to keyboard, secure entry and capitalization. Default "text", from the component source. |
| `name` | `string` |  |  |  | types | Field name. When used inside `<Form>`, this is the key used to look up server-side `validationErrors` and to notify the form when the value changes so the error can clear. |
| `leading` | `React.ReactNode` |  |  |  | types | Optional element rendered before the input text (Figma start icon area). No leading element is rendered by default — the Figma FormField design hides the start icon unless toggled on. |
| `trailing` | `React.ReactNode` |  |  |  | evidence (2026-10-02) | Not hidden from assistive tech on the web: a Button there stays in the tab order after the input and keeps its name. Declared: Optional element rendered after the input text (Figma slot "end"). Typically used for an inline button (e.g. "Apply", "Show") or a status icon. |
| `startIcon` | `boolean` |  | `false` |  | types | When `true`, shows the leading icon area (Figma `startIcon`). Defaults to `false`. Uses `ic_rupee` at 18px unless `leading` or `leadingIconName` overrides it. Default false, from the component source. |
| `leadingIconName` | `string` |  |  |  | types | Convenience prop to render a built-in icon as the leading element. Ignored when `leading` is provided. When set, implies a visible start icon even if `startIcon` is omitted. |
| `isRequired` | `boolean` |  | `false` |  | evidence (2026-10-08) | Sets aria-required on the input; the asterisk uses the Negative token. Declared: Shows a required asterisk next to the label. Default false, from the component source. |
| `isDisabled` | `boolean` |  | `false` |  | evidence (2026-10-08) | Uses the Read Only colours at 50 % opacity rather than Figma's Disabled mode; sets aria-disabled and tabindex -1, so Tab skips the field. Declared: Disables interaction and dims the field. Resolves to "Read Only" state. Default false, from the component source. |
| `isInvalid` | `boolean` |  | `false` |  | evidence (2026-10-08) | Sets aria-invalid on the input, and aria-describedby points at the error message. Declared: Marks the field as invalid and shows `errorMessage`. Default false, from the component source. |
| `isReadOnly` | `boolean` |  | `false` |  | types | Renders the field in read-only mode (non-interactive but not dimmed). Resolves to the "Read Only" state. Default false, from the component source. |
| `supportText` | `string` |  |  |  | evidence (2026-10-08) | Linked to the input (aria-describedby) while the field is valid. Declared: Helper text displayed below the input. |
| `errorMessage` | `string` |  |  |  | evidence (2026-10-02) | Replaces supportText only while isInvalid (or a Form error) is set; with isInvalid and no errorMessage, the support text turns red. Declared: Replaces `supportText` when `isInvalid` is true. |
| `maxLength` | `number` |  |  |  | types | Maximum number of characters accepted. |
| `autoFocus` | `boolean` |  | `false` |  | types | When true, focuses the input on mount. Default false, from the component source. |
| `modes` | `Modes` |  |  |  | types | Modes for design token resolution. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Style overrides for the outermost wrapper. |
| `inputStyle` | `StyleProp<ViewStyle>` |  |  |  | types | Style overrides for the input row container. |
| `inputTextStyle` | `StyleProp<TextStyle>` |  |  |  | types | Style overrides for the input text. |
| `onFocus` | `RNTextInputProps['onFocus']` |  |  |  | types | Called when the input receives focus. |
| `onBlur` | `RNTextInputProps['onBlur']` |  |  |  | types | Called when the input loses focus. |
| `onSubmitEditing` | `RNTextInputProps['onSubmitEditing']` |  |  |  | types | Called when the user submits the input (e.g. presses return). |
| `accessibilityLabel` | `string` |  |  |  | evidence (2026-10-02) | The input's accessible name is accessibilityLabel, then label, then the placeholder. Declared: Accessibility label. Defaults to `label` or `placeholder`. |
| `accessibilityHint` | `string` |  |  |  | types | Accessibility hint. |
| `testID` | `string` |  |  |  | types | Test identifier. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | evidence (2026-10-02) | Dark renders identically to Light: Form Field has no dark values. Declared: A token collection FormField reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `FormField States` | `mode collection` | Idle, Active, Read Only, Error, Disabled | `"Idle"` |  | evidence (2026-10-02) | Set by the component from its props: invalid → Error; read only or disabled → Read Only; focused → Active; otherwise Idle. An explicit modes['FormField States'] overrides it. Declared: A token collection FormField reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Status` | `mode collection` | Auto, Warning, Error, Success, Loading, Neutral | `"Auto"` |  | types | A token collection FormField reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `leading` | `React.ReactNode` |  |  |  | types | Optional element rendered before the input text (Figma start icon area). No leading element is rendered by default — the Figma FormField design hides the start icon unless toggled on. |
| `trailing` | `React.ReactNode` |  |  |  | types | Optional element rendered after the input text (Figma slot "end"). Typically used for an inline button (e.g. "Apply", "Show") or a status icon. |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onChangeText` | `(text: string) => void` |  |  |  | types | Called when the input text changes. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- Dark mode is not supported: Color Mode Dark renders like Light. _(evidence, 2026-10-02)_
- Disabled uses the read-only colours at half opacity instead of Figma's Disabled colours; the FormField States Disabled mode is never used. _(evidence, 2026-10-08)_
- No live region: an error is read when people reach the field, not when it appears. _(evidence, 2026-10-08)_
- The package field is 47 px tall; Figma's is 45 px. _(evidence, 2026-10-02)_

## Flags

_None._
