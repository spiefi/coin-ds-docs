# ChipGroup

> Coin agent pack 0.1.78+19 (pilot). Generated from `components/chipgroup.json`; the JSON is the source of truth.

- **State:** documented
- **Package:** jfs-components 0.1.78 · guide commit `622cd82` · built 2026-10-30T12:30:13Z
- **Category:** input (for discovery only, not a limit on composition) · **Tags:** filter chips, chip row, filters
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=chipgroup) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1905-5123) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-chipgroup--docs)

Use a Chip Group to lay out a row of Chip Select filters that wraps onto new lines with even gaps.

## Use when

- **recommended** Lay out a row of Chip Select filters that wraps onto new lines with even gaps.  
  _From summary: “Use a Chip Group to lay out a row of Chip Select filters that wraps onto new lines with even gaps.”_
- **recommended** The group spaces the chips; each chip keeps its own state.  
  _From corePrinciple: “The group spaces the chips; each chip keeps its own state.”_
- **recommended** Filters that combine, such as Date and Payment methods applying together.  
  _From doDont: “Date and Payment methods apply together.”_

## Avoid when

- **discouraged** One choice among options, such as Daily, Weekly or Monthly: people expect several chips to apply, and each is announced as its own toggle.  
  _From doDont: “People expect several to apply, and each is announced as its own toggle.”_
- **discouraged** A mutually exclusive choice: the upstream ChipGroup mdx (unpublished), as the evidence records it, points to a SegmentedControl. Use instead: `SegmentedControl` (not in this pack).  
  _From evidence: “a mutually exclusive choice → SegmentedControl”_
- **discouraged** A single filter: the upstream ChipGroup mdx (unpublished), as the evidence records it, points to a ChipSelect alone. Use instead: `ChipSelect`.  
  _From evidence: “one filter → a ChipSelect alone”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Chip Select | Each chip keeps its own label, icon, and Active state. | no | anatomy: “Each chip keeps its own label, icon, and Active state.” |
| Gap | 8 px between chips, set by the group. | no | anatomy: “8 px between chips, set by the group.” |
| Wrapped chip | A chip that doesn't fit starts the next row, on the left. | no | anatomy: “A chip that doesn’t fit starts the next row, on the left.” |
| Group | Lays chips out; it has no state, only an optional spoken name. | yes | anatomy: “Lays chips out; it has no state, only an optional spoken name.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `children` | `ReactNode` | types |

## Placement

- **recommended** In the guide's In context, the filters sit above the list they filter, a transaction list.  
  _From inContext: “Filters above a transaction list”_
- **recommended** The group fills its container and adds a 32 px row for each line of chips.  
  _From sizing: “The group fills its container and adds a 32 px row for each line of chips.”_
- **recommended** On the web chips are a little wider than in Figma, so Figma's three filters need 382 px for one row.  
  _From sizing: “On the web chips are a little wider than in Figma, so Figma’s three filters need 382 px for one row.”_
- **recommended** More filters wrap onto new rows with the same 8 px gaps.  
  _From configuration: “More filters wrap onto new rows with the same 8 px gaps.”_
- **recommended** A chip wider than the row wraps its label to stay inside it.  
  _From sources: “a chip wider than the row wraps its label to stay inside it.”_
- **discouraged** A row parent or a horizontal ScrollView: there the group takes its content width and never wraps.  
  _From evidence: “In a row parent or a horizontal ScrollView the group takes its content width and never wraps (743 px for six chips).”_

## Configuration

- **recommended** Chip Group has no variants or size.  
  _From configuration: “Chip Group has no variants or size.”_
- **recommended** Choose the filters, their order, and each chip's icon; each chip turns Active on its own.  
  _From configuration: “Choose the filters, their order, and each chip’s icon; each chip turns Active on its own.”_
- **recommended** Chip Group has no idle, active, or disabled state.  
  _From states: “Chip Group has no idle, active, or disabled state.”_
- **recommended** Each ChipSelect owns its active and onPress; the group tracks nothing.  
  _From evidence: “Each ChipSelect owns `active` and `onPress`; the group tracks nothing.”_
- **recommended** The screen owns each filter: pressing an Idle chip applies it (a picker would open here), and pressing an Active chip clears it.  
  _From inContext: “The screen owns each filter: pressing an Idle chip applies it (a picker would open here), and pressing an Active chip clears it.”_
- **recommended** The group only keeps the chips spaced as they change width.  
  _From inContext: “The group only keeps the chips spaced as they change width.”_
- **recommended** Match each icon to its filter: a calendar, a status, and a payment icon tell the filters apart.  
  _From doDont: “A calendar, a status, and a payment icon tell the filters apart.”_
- **discouraged** Don't leave the default icon: every chip shows a calendar, so the filters look alike.  
  _From doDont: “Every chip shows a calendar, so the filters look alike.”_

## Content

- **recommended** Name each filter in one or two words, in sentence case.  
  _From content: “Name each filter in one or two words, in sentence case.”_
- **recommended** Once a filter applies, its chip shows the chosen value, so the row reads as a summary of the list.  
  _From content: “Once a filter applies, its chip shows the chosen value, so the row reads as a summary of the list.”_
- **recommended** Keep labels short: short names fit several filters to a row.  
  _From doDont: “Short names fit several filters to a row.”_
- **discouraged** Don't write long labels: each long name takes a row to itself.  
  _From doDont: “Each long name takes a row to itself.”_

Good: “Date”, “Status”, “Payment methods”, “Last 30 days”, “Pending”, “UPI”

Bad: “Date of transaction”, “Transaction status”, “Payment method used”

## States

| State | When | From |
| --- | --- | --- |
| Nothing applied | Grey chips name the filters. | states: “Grey chips name the filters.” |
| Filters applied | Each Active chip shows its value; the others stay as they are. | states: “Each Active chip shows its value; the others stay as they are.” |
| A chip applies | It shows its value and a close icon, grows 20 px, and the row may re-wrap. | states: “When a chip applies, it shows its value and a close icon, grows 20 px, and the row may re-wrap.” |

## Accessibility

- **recommended** `accessibilityLabel`: Name the row with accessibilityLabel, as the screen names it “Transaction filters”, so it is announced as a group.  
  _From inContext: “The screen names the row “Transaction filters”, so it is announced as a group.”_
- **recommended** `accessibilityLabel`: accessibilityLabel is the chip row's accessible name; when it is set, the row's role defaults to group.  
  _From fact `/facts/props/4` (accessibilityLabel, source evidence)_
- **recommended** Given an accessibility label, the row is announced as a named group; each chip is still announced as its own toggle button.  
  _From sources: “Given an accessibility label, the row is announced as a named group; each chip is still announced as its own toggle button.”_
- **recommended** Tab visits every chip in order; arrows do nothing; Enter, Space, and click press a chip.  
  _From evidence: “Tab visits every chip in order; arrows do nothing; Enter, Space, and click press a chip.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Match each icon to its filter | Leave the default icon | Every chip shows a calendar, so the filters look alike. |
| Keep labels short | Write long labels | Each long name takes a row to itself. |
| Let filters combine | Use chips for one choice | People expect several to apply, and each is announced as its own toggle. |

## Examples

### Figma's three filters, from the guide's Configuration: Date, Status and Payment methods, each ChipSelect with its own icon, in one wrapping row. The screen adds each chip's active and onPress, as the next example shows.

```tsx
<ChipGroup>
  <ChipSelect label="Date" icon="ic_calendar_week" />
  <ChipSelect label="Status" icon="ic_status_loading" />
  <ChipSelect label="Payment methods" icon="ic_payments" />
</ChipGroup>
```

_From configuration: “Date, Status, and Payment methods, each with its own icon.”_

### Filters above a transaction list, the guide's In context, once the screen has applied Date and Payment methods: the screen names the row “Transaction filters” and owns each chip's active and onPress; an applied chip shows its value as its label, and pressing it again clears it. The literal values and empty onPress stand for the screen's own state and picker.

```tsx
<ChipGroup accessibilityLabel="Transaction filters">
  <ChipSelect label="Last 30 days" icon="ic_calendar_week" active onPress={() => {}} />
  <ChipSelect label="Status" icon="ic_status_loading" active={false} onPress={() => {}} />
  <ChipSelect label="UPI" icon="ic_payments" active onPress={() => {}} />
</ChipGroup>
```

_From inContext: “The screen owns each filter: pressing an Idle chip applies it (a picker would open here), and pressing an Active chip clears it.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | evidence (2026-10-13) | Each chip gets maxWidth 100%, flexShrink 1, minWidth 0 and overflow hidden from the group, so a chip wider than the row shrinks to the row and wraps its label. Declared: Child elements to be rendered inside the chip group. Expects ChipSelect components. Strings and numbers are rendered as single-line text so a ReactNode child does not get dropped. |
| `modes` | `Modes` |  |  |  | evidence (2026-10-06) | Every element child gets the group's modes with its own on top (the child wins, per key). ChipSelect State can't be set from the group. Declared: Mode configuration for design tokens. These modes are passed down to all child components. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Additional styles for the container. |
| `testID` | `string` |  |  |  | types | Test ID for testing. |
| `accessibilityLabel` | `string` |  |  |  | evidence (2026-10-13) | On the web the named row gets role="group" and aria-label. Declared: Accessible name for the chip row. When set, the row's role defaults to `group`. |
| `accessibilityRole` | `AccessibilityRole` | button, header, link, menu, menuitem, search, summary, image, switch, text, none, togglebutton, keyboardkey, adjustable, imagebutton, alert, checkbox, combobox, menubar, progressbar, radio, radiogroup, scrollbar, spinbutton, tab, tabbar, tablist, timer, list, toolbar |  |  | types | Accessibility role. Defaults to `group` when `accessibilityLabel` is set. |
| `accessibilityHint` | `string` |  |  |  | types | Additional accessibility hint for screen readers. |
| `accessibilityState` | `AccessibilityState` |  |  |  | types | Accessibility state forwarded to the row. |

### Modes

_No modes._

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types | Child elements to be rendered inside the chip group. Expects ChipSelect components. Strings and numbers are rendered as single-line text so a ReactNode child does not get dropped. |

### Events

_No events._

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- On the web the chips are slightly wider than in Figma. _(evidence, 2026-10-17)_
- The published Storybook predates the current stories, so two of its chips show no icon. _(evidence, 2026-10-17)_

## Flags

_None._
