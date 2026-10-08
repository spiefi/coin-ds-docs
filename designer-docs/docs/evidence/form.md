# Form source evidence

Package, Figma, Storybook, and browser evidence for the Form guide (board ticket #55, Design documentation — Marcin; Storybook coverage — Biscuit, done).

## Check

Checked 7 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-3795b4c` (Biscuit's `main` at 3795b4c). `Form.tsx`, its stories, and its mdx are identical at 636f3f5. That commit changes Form's consumers: MessageField gains `errorMessage`/`supportText` (so a Form error will show there), and FormField, MessageField, and FormUpload gain web `aria-invalid`/`aria-describedby` or group roles.

- Figma: [Coin Components Library · Form](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1949-7250), node `1949:7250`. One component, 328 × 306: a slot "FormFields" with three FormField instances (328 × 94 each, at y 0, 106, 212). Bound variables `form/gap` 12, `form/padding/horizontal` 0, `form/padding/vertical` 0. No error, disabled, or filled variants; component properties could not be read with the read tools.
- Storybook (published `index.json`): `components-form--docs`, `--default`, `--with-validation-errors`, `--server-validation`; the published docs page is the old generated one ("design-token-driven styling", "All tokens support mode-based theming through the `modes` prop"). Upstream source has `Default`, `WithValidationErrors`, `ClearOnEdit`, `ArrayError`, and `NamedRegion` (the last three not deployed). The source mdx: Form is a thin field stack; `onSubmit` is not wired and there is no Enter-to-submit; own submit with a Button outside or beside the Form; editing clears a key until the errors object changes; an array error shows its first string; `modes` don't cascade; don't wrap a lone field; don't use it for OTP; don't disable Pay as the only validation signal.
- Package: `Form` (default) with `children`, `validationErrors?: Record<string, string | string[]>`, `onSubmit` (typed, destructured, never used), `modes`, `style`, `accessibilityLabel`, `testID`; and `useFormContext()` (null outside a Form). It renders one `View` with `gap` and padding from the tokens; no `<form>`, submit, Enter handling, validation, label, or error summary. Context: `validationErrors` minus keys people have edited, and `onFieldChange(name)`. When the `validationErrors` object changes, every error shows again. Only `FormField`, `FormUpload`, and `MessageField` read it, and only with a `name`; a field's own `errorMessage` wins. `modes` only resolve Form's own tokens (single mode) and are not passed to children.

## Browser measurements (Chrome, react-native-web 0.21.2, Light)

- Form: transparent `div role="presentation"`, fills its container (328 px in a 328 px column), gap 12, padding 0. Three label-only FormFields (72 px each) → 328 × 240. A FormField showing an error is 96 px.
- `validationErrors={{ name: 'Enter your name as on your PAN', email: ['Enter a valid email address', 'Use a work email if you have one'], doc: 'Upload a PDF under 5 MB', note: '…' }}`: FormField `name="name"` shows its message in red with the Error look; `name="email"` shows only the first string; a FormField without `name` shows nothing; FormUpload `name="doc"` shows its message; MessageField `name="note"` turns red but shows no message (#187); TextInput ignores the Form.
- Typing in the named field clears its error; the others stay. With an inline object literal (`validationErrors={{ … }}`) every parent re-render passes a new object, so the error comes straight back after typing: the screen must keep the errors object in state (developer note, not shown).
- `accessibilityLabel="Your details"` lands as `aria-label` on a `role="presentation"` div, so the form region is not named. No input gets `aria-invalid` or `aria-describedby` in 0.1.78: errors are visible text only.

## Classification

- Designer-configurable: which fields go in the form and their names; the error message for each field.
- System-driven: 12 px spacing, full width, errors shown by the matching field and cleared on edit.
- Developer-only: keeping `validationErrors` in state, submitting and validating, `useFormContext`, `style`, `modes`, `testID`.
- Not shown: `onSubmit`, `accessibilityLabel`, `modes`, MessageField errors, Dark mode.

## Coin gaps

- #207 (Component Fix, To do, Component Bug; Mr. Biscuit, Anagha Ghotkar): `onSubmit` typed but never called; `accessibilityLabel` lands on a presentational element, so the region is never named (the NamedRegion story claims otherwise); no Enter-to-submit or error summary; clear-on-edit resets on every new errors object, so inline objects re-show errors (needs a note or a deep compare); published Storybook stale and its mdx claims mode theming.
- Existing: #187 (MessageField shows no error message; fixed on `main` 636f3f5, not yet in the mirror); #186 (FormField error and required not announced).

## 636f3f5 check

Checked 8 October 2026 against `jfs-components` 0.1.78 built from Biscuit's `main` at `636f3f5` (mirror tag `v0.1.78-636f3f5`) in headless Chrome with react-native-web 0.21.2.

- #187 fixed. MessageField shows a Form validation error under the field (as well as its own `errorMessage`), linked with `aria-describedby`, with `aria-invalid` set.
- #186 fixed. FormField sets `aria-invalid` and points `aria-describedby` at its error ("IFSC codes have 11 characters"), so a Form error is read with the field.
- Still open: #207 (Form itself is unchanged: `onSubmit` unused, the region is not named, no Enter-to-submit or error summary). From the installed source, nothing announces errors when they arrive (no live region), and FormUpload gains a named group but no `aria-invalid` or `aria-describedby`.
- Guide: the Configuration card "Form Upload too" is now "Other fields too" and adds a Message Field (`name="note"`) that shows its Form error. The Sources note drops "Message Field turns red but shows no message" and "errors are not announced", and says Form Field and Message Field link their message so a screen reader reads it with the field.
