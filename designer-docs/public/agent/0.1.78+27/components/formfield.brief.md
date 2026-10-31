# FormField (brief)

> Coin agent pack 0.1.78+27 · documented · full entry: `components/formfield.md` (sources, all facts, flags)

Use a Form Field to collect one labelled value, such as an account number, with a hint or an error message below it.

**Use when**
- Collect one labelled value, such as an account number, with a hint or an error message below it.

**Avoid when**
- Avoid: The input is unlabelled chrome, a code, or a file: the Storybook docs (as the evidence records them) point to TextInput or InputSearch for unlabelled chrome, OTP for codes, and FormUpload for files.

**Placement**
- Form Field fills its container's width; the screen sets the width. The field is 47 px tall, and the label and support text sit 8 px above and below it.
- In a narrow column the field narrows with its column, and the hint wraps.
- `isInvalid`: Let the screen check the values (for example when people tap Verify) and set the error on the field; Form Field only shows it, and the button stays enabled.
- Keep the primary action enabled and show the error on the field; the Storybook docs say disabled is not a validation strategy.

**Key rules**
- Every option is off unless you set it. Add an icon, an action, or the required mark when it tells people something they need.
- The default configuration is a label, a format example, and a hint below (label, placeholder and supportText).
- `startIcon` = `true`: Turn on startIcon to show the rupee icon, which marks an amount before people type.
- `trailing`: Put a small text button in trailing to act on the value without leaving the field.
- `trailing`: For the end action, a Coin Button with AppearanceBrand Secondary, Emphasis Low and Button / Size S renders 74 × 32, transparent with purple text, matching Figma's end slot.
- `isRequired` = `true`: Set isRequired to show a red asterisk on a field people must fill in.
- `type` = `password`: Set type password to hide the characters.
- `type`: Set type to email, phone or number to pick the keyboard for those fields.

**Example:** A field the screen marks invalid after people tap Verify; the button stays enabled.

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

**Props:** `label`, `placeholder`, `value`, `onChangeText`, `type` (number | search | text | password | email | phone | url), `name`, `leading`, `trailing`, `startIcon`, `leadingIconName`, `isRequired`, `isDisabled`, `isInvalid`, `isReadOnly`, `supportText`, `errorMessage`, `maxLength`, `autoFocus`, `modes`, `style`, `inputStyle`, `inputTextStyle`, `onFocus`, `onBlur`, and 4 more. (* required)

**Modes it reads:** Color Mode, FormField States, Status.

**Gaps (report, do not work around)**
- Dark mode is not supported: Color Mode Dark renders like Light.
- Disabled uses the read-only colours at half opacity instead of Figma's Disabled colours; the FormField States Disabled mode is never used.
- No live region: an error is read when people reach the field, not when it appears.
- The package field is 47 px tall; Figma's is 45 px.

Full entry: `components/formfield.md`. Links: `components/formfield.links.md`.
