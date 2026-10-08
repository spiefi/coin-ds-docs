# Form Field brief

slug: formfield · label: Form Field · public API: FormField (+ Button, Card, VStack, Text for composition)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1922-5647 · storybook: docsUrl('formfield') · stories: Default=components-formfield--default, With trailing button=components-formfield--with-trailing-button, With start icon=components-formfield--with-start-icon, Password=components-formfield--password-type, Invalid=components-formfield--invalid, All states=components-formfield--all-states
checked: 8 October 2026 · jfs-components 0.1.78 (mirror tag v0.1.78-636f3f5, 5 October build)
icon: a label line over a field — `<path d="M2 3.5h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><rect x="1.5" y="7" width="15" height="7.5" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />`
keywords: input, text field, form input, label, error message

Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`; `const ACTION = { 'Color Mode': 'Light', AppearanceBrand: 'Secondary', Emphasis: 'Low', 'Button / Size': 'S' } as Modes`. Every FormField gets `modes={LIGHT}`. An end action is always `<Button modes={ACTION} label="…" />` (transparent, purple text, 32 px). Form fields sit on white screens, so every example uses a host built from the kit’s `<Surface width="wide">` (or `"narrow"` where stated) wrapping `<VStack modes={LIGHT} style={{ width: '100%' }}>`, and the Anatomy and Sizing diagrams use `surface="white"`. Any field people can type in keeps its own `value` state. `testID` lands on the FormField root; its children are the label row, the field row, and the support text, in that order.

## Overview
summary: Use a Form Field to collect one labelled value, such as an account number, with a hint or an error message below it.
principle: A clear label, a format example, and help when it goes wrong.
playground: `.preview-stage` holding a host with `<FormField value={value} onChangeText={setValue} label={label} placeholder="XXXX XXXX XXXX" supportText={support} isRequired={required} isInvalid={state === 'Error'} errorMessage={state === 'Error' ? 'Account numbers have 9 to 18 digits' : undefined} isReadOnly={state === 'Read only'} isDisabled={state === 'Disabled'} trailing={action ? <Button modes={ACTION} label="Verify" /> : undefined} />`. Controls: `text-control` "Label" (default "Account number", maxLength 32); `text-control` "Support text" (default "As printed on your passbook", maxLength 60); Segment "State" Default | Error | Read only | Disabled; OnOff "Required" (off); OnOff "End action" (off). Readout title "Value", value = the typed text or "Empty". Stage label: "Live Coin Form Field".

## Anatomy
header: Anatomy · title: A label, the field, and a hint · description: The label names the value. The field holds the text with an optional icon, and support text or an error sits below.
specimen: `<Anatomy surface="white" specimenWidth={300} …><FormField modes={LIGHT} testID="ff-anatomy" label="Amount" isRequired startIcon type="number" placeholder="0" supportText="Up to ₹50,000 a day" /></Anatomy>` (let `R = byTestId('ff-anatomy')`)
parts:
1. Label — Names the value and gives the field its accessible name. — target: `${R} > div:first-child > div:first-child` — side: top
2. Required mark — A red asterisk for fields people must fill in. — target: `${R} > div:first-child > div:last-child` — side: right
3. Start icon — Optional 18 px icon, such as the rupee sign. — target: `${R} > div:nth-child(2) > div:first-child` — side: left
4. Input — The placeholder shows the format; then what people type. — target: `${R} input` — side: top
5. Field — White box; purple border on focus, red on error. — target: `${R} > div:nth-child(2)` — side: left
6. Support text — A hint below the field; an error message replaces it. — target: `${R} > div:nth-child(3)` — side: bottom
(If pins collide at 390 px, move Input to `bottom` and report it.)

## Configuration
header: Configuration · title: Add only what helps people fill it in · description: Every option is off unless you set it. Add an icon, an action, or the required mark when it tells people something they need.
Grid `coin-new-example-grid` (each in a host):
- Label and hint — `label="Account number" placeholder="XXXX XXXX XXXX" supportText="As printed on your passbook"` — lesson: The default: a label, a format example, and a hint below.
- Start icon — `label="Amount" startIcon type="number" placeholder="0"` — lesson: The rupee icon marks an amount before people type.
- End action — `label="Promo code" placeholder="JIO200" trailing={<Button modes={ACTION} label="Apply" />}` — lesson: A small text button acts on the value without leaving the field.
- Required — `label="Full name" isRequired placeholder="As on your PAN"` — lesson: A red asterisk marks a field people must fill in.
- Password — `label="Password" type="password"` with its own state, initial value "jio2026" — lesson: The type hides the characters. It also picks the keyboard for email, phone, and number fields.

## States
header: States · title: Default, focused, error, read only, and disabled · description: The field changes colour with its state. Focus draws a purple border; an error turns it red and shows the message; read only and disabled lock the value.
Grid `coin-new-example-grid` (each in a host):
- Default — `label="Account number" placeholder="XXXX XXXX XXXX" supportText="As printed on your passbook"` — lesson: A grey border. Select the field to see the purple focus border.
- Error — `label="IFSC code" value="SBIN000123" supportText="On your cheque book" isInvalid errorMessage="IFSC codes have 11 characters"` — lesson: Red border and fill; the message replaces the hint.
- Read only — `label="Account holder" value="Asha Rao" supportText="From your bank" isReadOnly` — lesson: Grey and full contrast: people can read the value but not change it.
- Disabled — `label="Account holder" value="Asha Rao" isDisabled` — lesson: The read-only look at half opacity, and Tab skips it. Use it for a field that does not apply yet.

## Sizing
header: Sizing · title: Full width, 47 px field · description: Form Field fills its container’s width. The field is 47 px tall with 12 px of padding at each end, and the label and support text sit 8 px above and below it. The screen sets the width.
Measured diagram: `<Anatomy legend={false} surface="white" specimenWidth={300} marks={[{ kind: 'size', target: F, side: 'bottom', label: 'both' }, { kind: 'padding', target: F }, { kind: 'gap', from: L, to: F }]}><FormField modes={LIGHT} testID="ff-size" label="Account number" placeholder="XXXX XXXX XXXX" /></Anatomy>` where `F = ${byTestId('ff-size')} > div:nth-child(2)` and `L = ${byTestId('ff-size')} > div:first-child`. Expected label about 300 × 47 and an 8 px gap.
Then ExampleCard "In a narrow column" — `narrow` host with `label="PIN code" placeholder="6 digits" supportText="We deliver to most PIN codes in India"` — lesson: The field narrows with its column, and the hint wraps.

## Content
header: Content · title: Name the value, show the format · description: Write the label as the name of the value in sentence case, such as “Account number”, not “Enter your account number”. Use the placeholder for a format example, support text for a rule, and an error that says how to fix the value.
One ExampleCard "Labels, formats, and fixes" with a `coin-new-stack` of three fields in one host:
- `label="IFSC code" placeholder="SBIN0001234" supportText="11 characters, on your cheque book"`
- `label="Mobile number" type="phone" placeholder="98765 43210" supportText="We’ll send a code to this number"`
- `label="PAN" value="ABCDE12" isInvalid errorMessage="Enter all 10 characters of your PAN"`

## In context
header: In context · title: Add a bank account · description: The screen checks the values when people tap Verify and sets the error on the field. Form Field only shows it, and the button stays enabled.
Composition in `.coin-new-context`: `<Card modes={LIGHT}>` › `<VStack modes={LIGHT}>` › three controlled FormFields — "Account holder name" (placeholder "As on your passbook"), "Account number" (`type="number"`, placeholder "9 to 18 digits"), "IFSC code" (placeholder "SBIN0001234", supportText "11 characters, on your cheque book") — then `<Button modes={LIGHT} label="Verify account" />`. On press: account number not 9–18 digits → that field gets `isInvalid errorMessage="Account numbers have 9 to 18 digits"`; IFSC not 11 characters → `isInvalid errorMessage="IFSC codes have 11 characters"`. Editing a field clears its error. When both pass, show `<Text modes={LIGHT}>Details look right</Text>` below the button.

## Do & Don'ts
header: Do & Don’ts · title: Keep every field understandable · description: Each pair shows a field people can complete versus one that leaves them guessing.
Every preview is a host.
- Do Label every field: The label stays visible while people type. — `label="Account number" placeholder="XXXX XXXX XXXX"` | Don't Use the placeholder as the label: The name disappears as soon as people type. — `placeholder="Account number"` (no label)
- Do Say how to fix it: The message names the fix. — `label="IFSC code" value="SBIN000123" isInvalid errorMessage="IFSC codes have 11 characters"` | Don't Show red without a message: Colour alone does not say what is wrong. — `label="IFSC code" value="SBIN000123" isInvalid`
- Do Show fixed values as read only: Full contrast keeps the value easy to read. — `label="Account holder" value="Asha Rao" isReadOnly` | Don't Disable a value people need to read: Half opacity makes it hard to read. — `label="Account holder" value="Asha Rao" isDisabled`

## Sources
header: Sources · title: Use the public Form Field contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (5 October build) from the team’s private package repository. Figma’s FormField is a 328 × 94 component with label, start icon, end slot, and support text options; its states are variable modes. The package field is 47 px tall (45 px in Figma). Disabled uses the read-only colours at half opacity instead of Figma’s Disabled colours. Dark mode is not supported. On the web the label names the input; screen readers also announce required and invalid fields and read the support text or error with them. Tab skips a disabled field, and the input narrows to make room for an end action.

## Limits
Do not show Dark mode, forced `FormField States` modes, a custom `leading` node, `leadingIconName` other than in prose, the `search`/`url` types, `maxLength`, Form `validationErrors`, or `style`/`inputStyle`. Do not imply that Disabled uses Figma’s Disabled colours, or that errors are announced the moment they appear (they are read when people reach the field).
