# Form brief

slug: form · label: Form · public API: Form (+ FormField, FormUpload, TextInput, Button, Card, VStack for fields and composition)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1949-7250 · storybook: docsUrl('form') · stories: Default=components-form--default, With validation errors=components-form--with-validation-errors, Server validation=components-form--server-validation
checked: 7 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-3795b4c; Biscuit's main 636f3f5 does not change Form)
icon: two stacked fields — `<><rect x="2" y="2.5" width="14" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><rect x="2" y="10.5" width="14" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5" /></>`
keywords: form layout, validation, field group, server errors

Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`. Every Coin instance gets `modes={LIGHT}`.
Errors must be stable objects: every `validationErrors` is a module-level constant or React state, never an inline object literal (an inline object is new on every render, so cleared errors come straight back). Constants: `NONE = {}`; `ERR_IFSC = { ifsc: 'IFSC codes have 11 characters' }`; `ERR_TWO = { account: 'Account numbers have 9 to 18 digits', ifsc: 'IFSC codes have 11 characters' }`; `ERR_PAN = { pan: ['Enter all 10 characters of your PAN', 'Use capital letters only'] }`; `ERR_DOC = { doc: 'Upload a PDF or JPG under 5 MB' }`; `ERR_EMAIL = { email: 'Enter an email address like name@example.com' }`.
Fields: "Holder" = `<FormField name="holder" label="Account holder name" value=… />`, "Account" = `<FormField name="account" type="number" label="Account number" value=… />`, "IFSC" = `<FormField name="ifsc" label="IFSC code" value=… />`. Any field people can type in keeps its own value state (`value` + `onChangeText`). Defaults when stated as filled: Holder "Asha Rao", Account "12345", IFSC "SBIN000123".
Forms sit on white screens: "Host" = `<Surface width="wide"><VStack modes={LIGHT} style={{ width: '100%', padding: 0 }}>{children}</VStack></Surface>`; Anatomy and Sizing use `surface="white"`. `testID` lands on the Form root; its children are the fields in order.

## Overview
summary: Use a Form to stack related fields and show the errors your screen sends for each one, such as a bank account’s details.
principle: Group the fields; let each one show its own problem.
playground: `.preview-stage` › Host › `<Form validationErrors={errors}>` with Holder, Account, IFSC (filled, each with its own state). Controls: Segment "Errors" `None | One field | Two fields` → NONE / ERR_IFSC / ERR_TWO (default None). Readout title "Errors sent", value "None" / "IFSC code" / "Account number, IFSC code"; note: "Edit a field that shows an error: its message clears until the screen sends errors again." Stage label: "Live Coin Form".

## Anatomy
header: Anatomy · title: A column of named fields · description: Form stacks its fields 12 px apart and hands each named field its error. It draws nothing of its own: no background, border, or title.
specimen: `<Anatomy surface="white" specimenWidth={328} …><Form testID="form-anatomy" validationErrors={ERR_IFSC}>` Holder (filled), IFSC (filled) `</Form></Anatomy>` (let `F = byTestId('form-anatomy')`)
parts:
1. Form — An invisible column: 12 px between fields, no padding. — target: `F` — side: left — at: 0.43 (lands in the gap, not on a label)
2. Named field — A Form Field with a name gets the error for that name. — target: `${F} > div:nth-child(2)` — side: right
3. Error message — Shown by the field while the Form has an error for it. — target: `${F} > div:nth-child(2) > div:nth-child(3)` — side: bottom
marks: gap `${F} > div:first-child` → `${F} > div:nth-child(2)`

## Configuration
header: Configuration · title: Errors by field name · description: Give each field a name, and pass the errors keyed by those names. Form has no other options that change what people see.
Grid `coin-new-example-grid`, each a Host:
- No errors — `<Form>` Holder, Account (filled) — lesson: The fields, 12 px apart, with nothing added.
- An error for one field — `<Form validationErrors={ERR_IFSC}>` Holder, IFSC (filled) — lesson: Only the field whose name matches shows the message.
- Two messages for one field — `<Form validationErrors={ERR_PAN}>` `<FormField name="pan" label="PAN" value="ABCDE12" />` (with state) — lesson: Given a list, the field shows only the first message.
- Form Upload too — `<Form validationErrors={ERR_DOC}>` `<FormUpload name="doc" label="PAN card" />` — lesson: Form Upload shows its error the same way.

## States
header: States · title: Showing, then clearing an error · description: A field shows its error until people change its value, then the message clears. When the screen sends a new set of errors, they all show again.
One ExampleCard "Edit to clear" (description: "Type in either field: its message clears and the other stays.") › Host › `<Form validationErrors={ERR_TWO}>` Account, IFSC (filled).

## Sizing
header: Sizing · title: Full width, 12 px between fields · description: Form fills its container and adds 12 px between its fields, with no padding. Each Form Field keeps its own height: 72 px with a label, 96 px with a message.
Measured diagram: `<Anatomy legend={false} surface="white" specimenWidth={328} marks={[{ kind: 'size', target: Z, side: 'bottom', label: 'both' }, { kind: 'gap', from: `${Z} > div:first-child`, to: `${Z} > div:nth-child(2)` }]}>` › `<Form testID="form-size">` with three empty fields: `<FormField name="holder" label="Account holder name" />`, `<FormField name="account" label="Account number" />`, `<FormField name="ifsc" label="IFSC code" />`, where `Z = byTestId('form-size')`. Expected 328 × 240 and a 12 px gap.

## Content
header: Content · title: One sentence that names the fix · description: Key each message to the field it’s about, and write it as one sentence that says how to fix the value. Show problems with the whole form, such as a failed payment, outside it.
One ExampleCard "Say how to fix it" › Host › `<Form validationErrors={ERR_TWO}>` Account, IFSC (filled).

## In context
header: In context · title: Checking bank details · description: When people tap Verify, the screen checks the details and passes the errors to the Form. Editing a field clears its message. The button sits outside the Form and stays enabled.
Composition in `.coin-new-context`: `<Card modes={LIGHT}>` › `<VStack modes={LIGHT}>` › `<Form validationErrors={errors}>` (errors in state, starting NONE) with Holder ("Asha Rao"), Account (""), IFSC ("") each with state, then `<Button label="Verify account" onPress={verify} />`. `verify` builds a new object: holder empty → `holder: 'Enter the name on the account'`; account not 9–18 digits → `account: 'Account numbers have 9 to 18 digits'`; IFSC not 11 characters → `ifsc: 'IFSC codes have 11 characters'`; then `setErrors(next)`. Below the card, `<p className="coin-new-readout" role="status">`: “Press Verify to check the details”, then “1 field needs a fix” / “2 fields need a fix” / “3 fields need a fix”, or “Details look right”.

## Do & Don'ts
header: Do & Don’ts · title: Make every error reach its field · description: Each pair shows a form that tells people what to fix versus one where the problem never appears.
Every preview is a Host.
- Do Name every field: The message appears under the field it’s about. — `<Form validationErrors={ERR_EMAIL}><FormField name="email" label="Email" value="asha@" /></Form>` (with state) | Don't Leave a field unnamed: The Form has an error for it, but the field never shows it. — the same without `name`
- Do Use Form Field for each value: Form Field shows the message under the field. — `<Form validationErrors={ERR_EMAIL}><FormField name="email" label="Email" value="asha@" /></Form>` (with state) | Don't Put a Text Input in a Form: Text Input ignores the Form, so the error never appears. — `<Form validationErrors={ERR_EMAIL}><TextInput placeholder="Email" /></Form>`
- Do Keep the button enabled: People tap it and see which field to fix. — `<Form validationErrors={ERR_TWO}>` Account, IFSC (filled), then `<Button label="Verify account" />` outside the Form | Don't Disable the button instead: A greyed-out button doesn’t say what’s missing. — `<Form>` Account, IFSC (filled), then `<Button label="Verify account" disabled />` outside the Form

## Sources
header: Sources · title: Use the public Form contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> from the team’s private package repository. Figma’s Form is one 328 × 306 component: a slot of three Form Fields, 12 px apart, and the package matches it. In the package Form only spaces the fields and passes errors by name to Form Field, Form Upload, and Message Field; it does not submit or check anything, and its <code>onSubmit</code> property does nothing. In this version Message Field turns red but shows no message. On the web the form has no accessible name and errors are not announced. The published Storybook predates the current stories.

## Limits
Do not show `onSubmit`, `accessibilityLabel`, `modes` other than Light, `useFormContext`, `style`, Message Field inside a Form, Dark mode, or inline `validationErrors` objects. Do not imply that Form validates, submits on Enter, names its region, or announces errors.
