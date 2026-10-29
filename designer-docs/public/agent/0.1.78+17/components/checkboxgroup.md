# CheckboxGroup

> Coin agent pack 0.1.78+17 (pilot). Generated from `components/checkboxgroup.json`; the JSON is the source of truth.

- **State:** documented
- **Package:** jfs-components 0.1.78 · guide commit `e7ed622` · built 2026-10-29T09:06:00Z
- **Category:** input (for discovery only, not a limit on composition) · **Tags:** multi-select, multiple choice, checkbox list, options
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=checkboxgroup) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3999-527) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-checkboxgroup--docs)

Use a Checkbox Group to let people pick any number of related options, such as accounts to link.

## Use when

- **recommended** People pick any number of related options, such as accounts to link.  
  _From summary: “Use a Checkbox Group to let people pick any number of related options, such as accounts to link.”_
- **recommended** Independent choices: people can pick one, several, or none.  
  _From doDont: “People can pick one, several, or none.”_

## Avoid when

- **discouraged** A single choice, such as a billing period: checkboxes let people pick “Monthly” and “Yearly” at once.  
  _From doDont: “Checkboxes let people pick “Monthly” and “Yearly” at once.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Group | Full-width column with no padding of its own; it only spaces and themes its items. | yes | anatomy: “Full-width column with no padding of its own.” |
| Checkbox Item | One independent choice: a public CheckboxItem with its own checkbox and label. | yes | anatomy: “One independent choice.” |
| Checkbox | Shows whether this option is selected. | yes | anatomy: “Shows whether this option is selected.” |
| Label | Names the option so it can be told apart. | yes | anatomy: “Names the option so it can be told apart.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `children` | `ReactNode` | types |

## Placement

- **recommended** The group fills its container and adds no side padding, so the form around it sets the margins.  
  _From sizing: “The group fills its container and adds no side padding, so the form around it sets the margins.”_
- **recommended** Rows are 12 px apart.  
  _From sizing: “Full width, 12 px between rows”_
- **recommended** Rows grow taller when an end action or a long label needs the space.  
  _From sizing: “Rows grow taller when an end action or a long label needs the space.”_
- **recommended** The screen supplies the group's heading.  
  _From inContext: “The screen supplies the heading, owns each item’s checked state, and enables the button once something is selected.”_

## Configuration

- **REQUIRED** `children`: Put only Checkbox Items (CheckboxItem) in the group, one for each option.  
  _From configuration: “The group accepts Checkbox Items only.”_
- **recommended** Each row can be a plain label, a label with a link, or a label with an action on its end.  
  _From configuration: “Each row can be a plain label, a label with a link, or a label with an action on its end.”_
- **recommended** Plain labels are the default, for lists of accounts or options.  
  _From configuration: “The default for lists of accounts or options.”_
- **recommended** A label with a link (a Text and a Link in the row's children) is the Figma composition, for consent rows.  
  _From configuration: “The Figma composition, for consent rows.”_
- **recommended** An end action (the row's endSlot) is for a secondary action that does not toggle the row.  
  _From configuration: “A secondary action that does not toggle the row.”_
- **recommended** `children`: Pass real items, not the empty group: with no children the group shows three identical placeholder rows.  
  _From doDont: “With no children it shows three identical placeholder rows.”_
- **recommended** The screen owns each item’s checked state (checked and onValueChange on each CheckboxItem); on the guide's Choose accounts to link screen it also enables the button once something is selected.  
  _From inContext: “The screen supplies the heading, owns each item’s checked state, and enables the button once something is selected.”_
- **recommended** The group itself only lays out the rows.  
  _From inContext: “The group itself only lays out the rows.”_
- **recommended** Each row keeps its own state; the group does not limit or count selections.  
  _From states: “Each row keeps its own state; the group does not limit or count selections.”_
- **recommended** Disable a row (disabled on its CheckboxItem) only while the option is temporarily unavailable.  
  _From states: “Disable a row only while the option is temporarily unavailable.”_
- **recommended** `modes`: The group forwards its modes to every item and end-slot child.  
  _From sources: “The group forwards modes to every item and end-slot child and uses a 12 px gap with no padding.”_

## Content

- **recommended** Related choices, each independent, stacked with even spacing.  
  _From corePrinciple: “Related choices, each independent, stacked with even spacing.”_
- **recommended** Make every option distinct: start each label with what it is, then what tells it apart, such as the last four digits.  
  _From content: “Start each label with what it is, then what tells it apart, such as the last four digits.”_
- **recommended** Keep labels parallel and in sentence case.  
  _From content: “Keep labels parallel and in sentence case.”_
- **recommended** Group related options: every row answers the same question.  
  _From doDont: “Every row answers the same question.”_
- **discouraged** Don't mix unrelated choices: a marketing opt-in among accounts reads like one of them.  
  _From doDont: “A marketing opt-in among accounts reads like one of them.”_

Good: “Fixed deposit • 0245”, “Recurring deposit • 1182”, “Mutual fund • Equity”, “Savings account • 4821”, “Email”, “SMS”, “Push notification”

## States

| State | When | From |
| --- | --- | --- |
| Selected and unselected | Each row keeps its own state; the group does not limit or count selections. | states: “Each row keeps its own state; the group does not limit or count selections.” |
| Mixed selection | Any number can be selected. | states: “Any number can be selected.” |
| Disabled rows | The checkbox dims but the label stays the same colour. | states: “The checkbox dims but the label stays the same colour.” |
| No children | With no children it shows three identical placeholder rows. | doDont: “With no children it shows three identical placeholder rows.” |

## Accessibility

- **recommended** `accessibilityLabel`: Name the group with accessibilityLabel: the group’s name comes only from accessibilityLabel.  
  _From sources: “the group’s name comes only from accessibilityLabel”_
- **recommended** On the web each row is one checkbox with one Tab stop that announces whether it is selected.  
  _From sources: “On the web each row is one checkbox with one Tab stop that announces whether it is selected”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Group related options | Mix unrelated choices | A marketing opt-in among accounts reads like one of them. |
| Pass real items | Ship the empty group | With no children it shows three identical placeholder rows. |
| Use checkboxes for independent choices | Use them for a single choice | Checkboxes let people pick “Monthly” and “Yearly” at once. |

## Examples

### Choose accounts to link, the guide's In context, as the screen first shows it: a Card with the screen's heading in a Text, the group named by accessibilityLabel, and the Button. The screen owns each row's checked value: onValueChange stands for the screen's own wiring, which stores the new value and passes it back as checked. The screen enables the Button once something is selected; onPress stands for linking. It sets no modes.

```tsx
<Card>
  <Text text="Choose accounts to link" />
  <CheckboxGroup accessibilityLabel="Accounts to link">
    <CheckboxItem checked={false} onValueChange={(checked) => {}}>Fixed deposit • 0245</CheckboxItem>
    <CheckboxItem checked={false} onValueChange={(checked) => {}}>Recurring deposit • 1182</CheckboxItem>
    <CheckboxItem checked={false} onValueChange={(checked) => {}}>Mutual fund • Equity</CheckboxItem>
    <CheckboxItem checked={false} onValueChange={(checked) => {}}>Savings account • 4821</CheckboxItem>
  </CheckboxGroup>
  <Button label="Select an account" disabled onPress={() => {}} />
</Card>
```

_From inContext: “The screen supplies the heading, owns each item’s checked state, and enables the button once something is selected.”_

### A consent row, the guide's Label with a link (the Figma composition): a Text and a Link side by side in the row's children, the Link hugging its text, and accessibilityLabel naming the row, as the guide's source sets it. onPress stands for opening the terms; checked and onValueChange stand for the screen's own wiring, as in the In context example.

```tsx
<CheckboxGroup accessibilityLabel="Consent">
  <CheckboxItem checked={false} onValueChange={(checked) => {}} accessibilityLabel="I agree Terms & Conditions">
    <Text text="I agree" />
    <Link text="Terms & Conditions" autolayout="Hug" onPress={() => {}} />
  </CheckboxItem>
</CheckboxGroup>
```

_From configuration: “The Figma composition, for consent rows.”_

### Rows with an end action, the guide's With an end action: a Manage Button in each row's endSlot, a secondary action that does not toggle the row; the rows grow taller to fit it. Button / Size XS goes on the group, as the guide's own source sets it, and the group forwards it to every item and end-slot child so the Button fits the 80 px end slot (the Checkbox Item entry's rule); the Button itself takes no modes. onPress and onValueChange stand for the screen's own wiring.

```tsx
<CheckboxGroup accessibilityLabel="Accounts" modes={{ 'Button / Size': 'XS' }}>
  <CheckboxItem checked={false} onValueChange={(checked) => {}} endSlot={<Button label="Manage" onPress={() => {}} />}>Fixed deposit • 0245</CheckboxItem>
  <CheckboxItem checked={false} onValueChange={(checked) => {}} endSlot={<Button label="Manage" onPress={() => {}} />}>Recurring deposit • 1182</CheckboxItem>
</CheckboxGroup>
```

_From configuration: “A secondary action that does not toggle the row.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types | Slot — a list of `CheckboxItem` (or compatible) elements to render inside the group. The `modes` prop is automatically forwarded to each child. When omitted, three default placeholder `CheckboxItem`s are rendered to mirror the Figma reference for the empty/initial state. |
| `modes` | `Modes` |  |  |  | evidence (2026-10-28) | Forwarded to every item and end-slot child. Declared: Design token modes for theming (e.g. `{ 'Color Mode': 'Light' }`). |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Override container styles. |
| `accessibilityLabel` | `string` |  |  |  | evidence (2026-10-28) | The group's name: on the web the group is a list named by accessibilityLabel and nothing else. Declared: Accessibility label for the surrounding group. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection CheckboxGroup reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context` | `mode collection` | Default, Nudge&Alert, CTACard, ListItem | `"Default"` |  | types | A token collection CheckboxGroup reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Slot gap` | `mode collection` | S, M, L, XL, XS | `"S"` |  | types | A token collection CheckboxGroup reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types | Slot — a list of `CheckboxItem` (or compatible) elements to render inside the group. The `modes` prop is automatically forwarded to each child. When omitted, three default placeholder `CheckboxItem`s are rendered to mirror the Figma reference for the empty/initial state. |

### Events

_No events._

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- On the web the rows sit directly in the group's list, without list items. _(evidence, 2026-10-28)_

## Flags

_None._
