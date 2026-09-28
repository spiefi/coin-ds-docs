# Checkbox Group brief

slug: checkboxgroup · label: Checkbox Group · public API: CheckboxGroup (+ CheckboxItem, Text, Link, Button, Card)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3999-527 · storybook: docsUrl('checkboxgroup') · stories: Default=components-checkboxgroup--default, Controlled=components-checkboxgroup--controlled, With end slot=components-checkboxgroup--with-end-slot, With disabled items=components-checkboxgroup--with-disabled-items, Empty=components-checkboxgroup--empty
checked: 28 September 2026 · jfs-components 0.1.60 (registry latest 0.1.60)
icon: three stacked rows, each a small rounded square (4 × 4 at x 2) followed by a line (x 8–16), at y 4, 9, 14; the top square has a tiny tick; 1.5 stroke.

Group modes: `const GROUP_MODES = { 'Color Mode': 'Light', 'Button / Size': 'XS' } as Modes` on every CheckboxGroup (it forwards them to items and end-slot Buttons). Put each group in `.coin-new-host` with inline width via the `wide` (360) class unless stated; the anatomy uses a 272 px specimen. Items are controlled (`checked` + `onValueChange`) wherever the page reacts; otherwise use `defaultChecked`. Always pass the label as `children`, and `accessibilityLabel` equal to the plain label.

Accounts: "Fixed deposit • 0245", "Recurring deposit • 1182", "Mutual fund • Equity", "Savings account • 4821".

## Overview
summary: Use a Checkbox Group to let people pick any number of related options, such as accounts to link.
principle: Related choices, each independent, stacked with even spacing.
playground: stage = CheckboxGroup (`accessibilityLabel="Accounts to link"`) in `.coin-new-host.wide`. Controls: Segment "Items" ['2', '3', '4'] (first N accounts); OnOff "Disable one" → `disabled` on the last visible item; OnOff "End action" → `endSlot={<Button label="Manage" />}` on the first item. Readout title "Selected", value = count and labels, e.g. "1 · Fixed deposit • 0245", or "None". First item starts checked. Stage label: "Live Coin Checkbox Group".

## Anatomy
header: Anatomy · title: A stack of Checkbox Items · description: The group only spaces and themes its items. Each row is a public Checkbox Item with its own checkbox and label.
specimen: `<CheckboxGroup modes={GROUP_MODES} accessibilityLabel="Accounts">` with items 1–3 (item 1 `defaultChecked`); specimenWidth 272
parts:
1. Group — Full-width column with no padding of its own. — target: `[role="list"]` — side: left
2. Checkbox Item — One independent choice. — target: `[role="list"] > :nth-child(1)` — side: top
3. Checkbox — Shows whether this option is selected. — target: `[role="list"] > :nth-child(2) > [role="checkbox"]` — side: left
4. Label — Names the option so it can be told apart. — target: `[role="list"] > :nth-child(3) [dir="auto"]` — side: bottom
marks: gap `[role="list"] > :nth-child(1)` → `[role="list"] > :nth-child(2)`

## Configuration
header: Configuration · title: What goes in each row · description: The group accepts Checkbox Items only. Each row can be a plain label, a label with a link, or a label with an action on its end.
- Plain labels — items 1–3 — lesson: the default for lists of accounts or options.
- Label with a link — one item whose children are `<Text text="I agree" />` and `<Link text="Terms & Conditions" autolayout="Hug" onPress={() => {}} />` — lesson: the Figma composition, for consent rows.
- With an end action — items 1–2, each with `endSlot={<Button label="Manage" />}` — lesson: a secondary action that does not toggle the row.
Stack: `.coin-new-stack` of ExampleCards.

## States
header: States · title: Selected, unselected, and disabled · description: Each row keeps its own state; the group does not limit or count selections. Disable a row only while the option is temporarily unavailable.
- Mixed selection — items 1–3, item 1 `defaultChecked` — lesson: any number can be selected.
- Disabled rows — "Fixed deposit • 0245" `checked disabled`, "Recurring deposit • 1182" `disabled`, "Mutual fund • Equity" — lesson: the checkbox dims but the label stays the same colour.
Grid: `coin-new-example-grid`.

## Sizing
header: Sizing · title: Full width, 12 px between rows · description: The group fills its container and adds no side padding, so the form around it sets the margins. Rows grow taller when an end action or a long label needs the space.
- Measured diagram: `<Anatomy legend={false} specimenWidth={272} marks={[{ kind: 'gap', from: '[role="list"] > :nth-child(1)', to: '[role="list"] > :nth-child(2)' }, { kind: 'size', target: '[role="list"]', side: 'left', label: 'both' }]}>` around items 1–3.
- Two ExampleCards in `coin-new-example-grid`: "272 px column" (`.coin-new-host.narrow`, items 1–3) and "With an end action" (`.coin-new-host.wide`, items 1–2 with the Manage end slot).

## Content
header: Content · title: Make every option distinct · description: Start each label with what it is, then what tells it apart, such as the last four digits. Keep labels parallel and in sentence case.
Body: `.coin-new-host.wide` with a CheckboxGroup of all four accounts.

## In context
header: In context · title: Choose accounts to link · description: The screen supplies the heading, owns each item’s checked state, and enables the button once something is selected. The group itself only lays out the rows.
Composition in `.coin-new-context`: public `Card` (modes Light) containing a Coin `Text` "Choose accounts to link", a controlled CheckboxGroup (`accessibilityLabel="Accounts to link"`) with all four accounts (none checked to start), and a `Button` whose label is "Link 1 account" / "Link N accounts" and "Select an account" (`disabled`) when none is selected.

## Do & Don'ts
header: Do & Don’ts · title: Keep a group coherent · description: Each pair shows a group people can scan versus one that makes them stop.
- Do Group related options: Every row answers the same question. — items 1–3 | Don't Mix unrelated choices: A marketing opt-in among accounts reads like one of them. — items 1–2 plus "Send me offers by SMS"
- Do Pass real items: Each row names a real account. — items 1–3 | Don't Ship the empty group: With no children it shows three identical placeholder rows. — `<CheckboxGroup modes={GROUP_MODES} />` with no children
- Do Use checkboxes for independent choices: People can pick one, several, or none. — "Email", "SMS", "Push notification" (label for "How should we reach you?" above via Coin `Text`) | Don't Use them for a single choice: Checkboxes let people pick “Monthly” and “Yearly” at once. — "Monthly", "Quarterly", "Yearly" with "Monthly" and "Yearly" `defaultChecked`

## Sources
header: Sources · title: Use the public Checkbox Group contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Declared, installed, and registry <code>jfs-components</code> versions are <code>0.1.60</code>. The group forwards <code>modes</code> to every item and end-slot child and uses a 12 px gap with no padding. Figma rows are 18 px tall; the installed rows render 19 px. On the web, rows repeat the checkbox role inside the row, do not expose their checked state, and sit in a list without list items; the group’s name comes only from <code>accessibilityLabel</code>. Row behaviour is covered in the Checkbox Item guide.

## Limits
Do not describe select-all, maximum selections, validation, or an error state. Do not show `style` overrides. Do not claim checked state is announced.
