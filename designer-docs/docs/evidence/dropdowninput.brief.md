# Dropdown Input brief

slug: dropdowninput · label: Dropdown Input · public API: DropdownInput (+ Card, Text, Button for composition)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3055-880 · storybook: docsUrl('dropdowninput') · stories: Default=components-dropdowninput--default, Required=components-dropdowninput--required, Invalid=components-dropdowninput--invalid, Disabled=components-dropdowninput--disabled, Read-only=components-dropdowninput--read-only, Long list=components-dropdowninput--scrollable-long-list
checked: 28 September 2026 · jfs-components 0.1.60 (registry latest 0.1.60)
icon: a rounded field outline (x 2–16, y 5–13, radius 2) with a small down chevron near its right end; 1.5 stroke.

All instances use `modes={{ 'Color Mode': 'Light' }}` and are controlled (`value` + `onValueChange`) unless the example fixes a value. The app root already provides safe-area insets (`SafeAreaInsetsContext`); do not add a provider. Put each field in `.coin-new-host.wide` unless stated. DropdownInput has no `testID`; target structurally (see Anatomy). Never set `open` or `defaultOpen`: the menu opens as a full-page layer and must only open when the reader presses a field.

Accounts: savings · Savings account; checking · Checking account; brokerage · Brokerage account; recurring · Recurring deposit.

## Overview
summary: Use a Dropdown Input in a form when people choose one option from a list of four or more.
principle: Label the question, show the choice, and open the list only when asked.
playground: stage = one DropdownInput (label from the text control, `placeholder="Select an account"`, the four accounts). Controls: text control "Label" → `label` (maxLength 32, default "Account"); Segment "State" ['Default', 'Required', 'Invalid', 'Disabled', 'Read-only'] → Required: `isRequired`, `supportText="This field is required"`; Invalid: `isInvalid`, `errorMessage="Choose an account to transfer from"`; Disabled: `isDisabled`, value savings; Read-only: `isReadOnly`, value savings, `supportText="Locked for this session"`; Default: `supportText="Choose where to transfer funds"`. Readout title "Selected", value = the chosen label or "Nothing yet", note "Press the field to open the list." Stage label: "Live Coin Dropdown Input".

## Anatomy
header: Anatomy · title: Label, field, and support text · description: The field shows the current choice and a chevron. Pressing it opens a Dropdown of the options just below.
specimen: `<DropdownInput label="Account" placeholder="Select an account" supportText="Choose where to transfer funds" items={accounts} value={null} onValueChange={() => {}} />`; specimenWidth 300
parts:
1. Label — Names the question the field answers. — target: `div:has(+ [role="combobox"])` — side: top
2. Field — Pressable surface that opens the list. — target: `[role="combobox"]` — side: left
3. Placeholder — Tells people what to choose until they have chosen. — target: `[role="combobox"] [dir="auto"]` — side: bottom
4. Chevron — Shows that the field opens a list. — target: `[role="combobox"] svg` — side: right
5. Support text — Explains the choice, or the error when invalid. — target: `[role="combobox"] + div` — side: right

## Configuration
header: Configuration · title: What the field says · description: Every field has a label. Add a placeholder that starts with a verb and support text when people need help choosing.
- Label and placeholder — label "Account", placeholder "Select an account" — lesson: the minimum for a clear field.
- With support text — plus `supportText="Choose where to transfer funds"` — lesson: extra guidance sits under the field.
- With a chosen value — label "Account", value checking — lesson: the choice replaces the placeholder.
Grid: `coin-new-example-grid three`, each in `.coin-new-host.wide`.

## States
header: States · title: Required, invalid, disabled, read-only · description: Press any field here to open its list. Invalid replaces the support text with the error; read-only shows a value that cannot change right now.
- Required — `isRequired`, `supportText="This field is required"` — lesson: an asterisk follows the label.
- Invalid — `isInvalid`, `errorMessage="Choose an account to transfer from"` — lesson: red border, tinted field, and the error in place of support text.
- Disabled — `isDisabled`, value savings, `supportText="You cannot change this account"` — lesson: the whole field is dimmed and does not open.
- Read-only — `isReadOnly`, value savings, `supportText="Locked for this session"` — lesson: a grey field that shows the value but does not open.
Grid: `coin-new-example-grid` (2 × 2), each in `.coin-new-host.wide`.

## Sizing
header: Sizing · title: Full width, fixed height · description: The field fills its container and is 48 px tall. The open list matches the field’s width and scrolls after about five options.
- Measured diagram: `<Anatomy legend={false} specimenWidth={300} marks={[{ kind: 'size', target: '[role="combobox"]', side: 'right', label: 'both' }]}>` around a field with label "Account", placeholder "Select an account".
- Two ExampleCards in `coin-new-example-grid`: "360 px form" (`.coin-new-host.wide`) and "240 px column" (`.coin-new-host.narrow`), both label "Account", value checking; the second has description "The field narrows with its column; the chevron stays at the end." and value brokerage.

## Content
header: Content · title: Ask, prompt, and explain · description: Write the label as a noun for the thing being chosen, the placeholder as an instruction, and error messages as a way to fix the problem.
Body: `.coin-new-stack` of two fields in `.coin-new-host.wide`: (1) label "Transfer from", placeholder "Select an account", supportText "Only accounts that can send money are listed"; (2) label "Transfer from", placeholder "Select an account", `isInvalid`, errorMessage "Choose an account to transfer from".

## In context
header: In context · title: Choose accounts for a transfer · description: The screen owns each value and checks the form when people continue. It marks an empty field invalid and shows how to fix it.
Composition in `.coin-new-context`: public `Card` (Light) containing, in a `.coin-new-stack`: Coin `Text` "Transfer money"; DropdownInput "From" (placeholder "Select an account", the four accounts); DropdownInput "To" (placeholder "Select an account", the four accounts); `Button` label "Continue" (Light). Pressing Continue with an empty field sets that field `isInvalid` with `errorMessage` "Choose an account to transfer from" / "Choose an account to transfer to"; choosing a value clears its error. When both are set, show `<p className="coin-new-readout" role="status">` "Ready to transfer from <From> to <To>".

## Do & Don'ts
header: Do & Don’ts · title: Make the choice clear · description: Each pair shows what people see before and after choosing.
- Do Keep a visible label: “Account” still explains the value after a choice. — label "Account", value savings | Don't Rely on the placeholder: Once chosen, “Savings account” sits in the field with no question. — no label, placeholder "Select an account", value savings, `accessibilityLabel="Account"`
- Do Say how to fix an error: The message tells people what to do next. — `isInvalid`, errorMessage "Choose an account to transfer from" | Don't Write a vague error: “Invalid” does not say what went wrong. — `isInvalid`, errorMessage "Invalid"
- Do Use it for longer lists: Four or more options fit well in a list. — label "Account", the four accounts | Don't Hide two options in a list: Yes or No needs an extra tap to see both answers. — label "Auto-renew", placeholder "Select", items Yes, No

## Sources
header: Sources · title: Use the public Dropdown Input contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Declared, installed, and registry <code>jfs-components</code> versions are <code>0.1.60</code>. Figma’s Open variant is the field with a Dropdown below it; in code the list opens as a layer over the page when the field is pressed. The component needs a <code>SafeAreaProvider</code> at the app root and fails without one. On the web the field is a combobox that opens a menu rather than a listbox, arrow keys do not move through options, invalid, required, and disabled states are not announced, a disabled field can still receive focus, and the focus outline is removed.

## Limits
Never set `open`/`defaultOpen`. Do not use `renderValue`, `children` items, ref control, `placement`, or style props. Do not claim keyboard arrow navigation or announced validation.
