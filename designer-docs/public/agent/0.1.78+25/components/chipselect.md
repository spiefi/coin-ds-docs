# ChipSelect

> Coin agent pack 0.1.78+25 (pilot). Generated from `components/chipselect.json`; the JSON is the source of truth.

- **State:** flagged (1 flag, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `3f56271` · built 2026-10-31T03:15:31Z
- **Category:** input (for discovery only, not a limit on composition) · **Tags:** filter chip, chip, date range, filter
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=chipselect) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1901-4727) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-chipselect--docs)

Use a Chip Select to show one filter, such as a date range, and whether it is applied.

## Use when

- **recommended** Show one filter, such as a date range, and whether it is applied.  
  _From summary: “Use a Chip Select to show one filter, such as a date range, and whether it is applied.”_

## Avoid when

- **discouraged** A filter that does not apply: hide it instead. Chip Select has no disabled state.  
  _From states: “There is no disabled state; hide a filter that does not apply instead.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Leading icon | Hints at the kind of filter, such as a date. | no | anatomy: “Hints at the kind of filter, such as a date.” |
| Label | Names the filter, or the value once applied. | yes | anatomy: “Names the filter, or the value once applied.” |
| Close icon | Shown when Active; shows that pressing again clears the filter. | no | anatomy: “Shows that pressing again clears the filter.” |
| Container | Fully rounded shape that turns lavender when Active. | yes | anatomy: “Fully rounded shape that turns lavender when Active.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `labelSlot` | `ReactNode` | types |

## Placement

- **recommended** In the guide's In context, the filters sit above the list they filter, a transaction list.  
  _From inContext: “Filters above a transaction list”_
- **recommended** Height is fixed at 32 px.  
  _From sizing: “Height is fixed at 32 px.”_
- **recommended** `label`: Width grows with the label and the icons, so short labels keep a row of chips on one line.  
  _From sizing: “Width grows with the label and the icons, so short labels keep a row of chips on one line.”_

## Configuration

- **recommended** `active`: Idle names the filter; Active shows the chosen value and how to clear it.  
  _From corePrinciple: “Idle names the filter; Active shows the chosen value and how to clear it.”_
- **recommended** `active`: One property, active, switches the chip between Idle and Active.  
  _From states: “One property switches the chip between Idle and Active.”_
- **recommended** `active`: Figma's State variant maps to the active property, which sets the ChipSelect State mode.  
  _From sources: “Figma’s State variant maps to the active property, which sets the ChipSelect State mode.”_
- **recommended** `active` = `false`: With active unset (false), the chip is Idle.  
  _From fact `/facts/props/1` (active, source evidence)_
- **recommended** The screen owns each filter.  
  _From inContext: “The screen owns each filter.”_
- **recommended** `onPress`: In the guide's In context, pressing an Idle chip opens a picker (not part of Chip Select) and pressing an Active chip clears it; the screen owns what a press does.  
  _From inContext: “Pressing an Idle chip opens a picker (not part of Chip Select); pressing an Active chip clears it.”_
- **recommended** The screen updates the chip's state (active) and label after each choice.  
  _From inContext: “The screen updates the chip’s state and label after each choice.”_
- **recommended** `onPress`: The whole chip is one press target: the close icon is part of it, not a separate button.  
  _From sources: “The close icon is part of the single press target, not a separate button.”_
- **recommended** `icon`: Choose an icon that matches the filter.  
  _From configuration: “Choose an icon that matches the filter”_
- **recommended** `icon` = `ic_calendar_week`: Calendar icon, the default: for date and period filters.  
  _From configuration: “The default, for date and period filters.”_
- **recommended** `icon` = `ic_calendar_week`: icon is ic_calendar_week, the calendar icon, by default.  
  _From fact `/facts/props/2` (icon, source evidence)_
- **recommended** `icon` = `ic_filter`: Filter icon (ic_filter in the guide's code): for other attribute filters.  
  _From configuration: “For other attribute filters.”_
- **recommended** `icon`: Match the icon to the filter: a calendar signals a date filter.  
  _From doDont: “A calendar signals a date filter.”_
- **discouraged** `icon`: Don't use an unrelated icon: a home icon on a date filter confuses the meaning.  
  _From doDont: “A home icon on a date filter confuses the meaning.”_
- **recommended** `icon`: The leading icon shows in both states, as in Figma.  
  _From sources: “The leading icon shows in both states, as in Figma.”_
- **recommended** `showCloseIcon` = `true`: Keep the close icon whenever a press clears the filter: the × tells people a press removes the filter.  
  _From configuration: “keep the close icon whenever a press clears the filter”_
- **recommended** `showCloseIcon` = `false`: Hide the close icon (showCloseIcon false) only when a press reopens the picker instead of clearing.  
  _From configuration: “Only when a press reopens the picker instead of clearing.”_
- **discouraged** `showCloseIcon` = `false`: Don't hide the close icon when a press clears: without the ×, people cannot tell how to undo the filter.  
  _From doDont: “Without the ×, people cannot tell how to undo the filter.”_
- **recommended** `showCloseIcon`: showCloseIcon is true by default, and the close icon shows only when the chip is Active.  
  _From fact `/facts/props/3` (showCloseIcon, source types)_

## Content

- **recommended** `label`: While Idle, use one or two words for the filter.  
  _From content: “While Idle, use one or two words for the filter.”_
- **recommended** `label`: Once applied, replace them with the chosen value so the row reads as a summary.  
  _From content: “Once applied, replace them with the chosen value so the row reads as a summary.”_
- **recommended** `label`: Show the chosen value: “Last 30 days” tells people what the list is showing.  
  _From doDont: ““Last 30 days” tells people what the list is showing.”_
- **discouraged** `label`: Don't keep the generic label once the filter applies: an Active “Date” chip does not say which dates.  
  _From doDont: “An Active “Date” chip does not say which dates.”_

Good: “Date”, “Category”, “Account”, “Last 30 days”, “Groceries”, “Savings •• 4821”

## States

| State | When | From |
| --- | --- | --- |
| Idle | active false (the default): grey background, dark text; the label names the filter. | states: “Grey background, dark text.” |
| Active | active true: lavender background, purple icon, text, and close icon; the label shows the chosen value. | states: “Lavender background, purple icon, text, and close icon.” |

## Accessibility

- **recommended** On the web the chip is a button named by its label and announced as pressed when Active; Enter and click activate it.  
  _From sources: “On the web the chip is a button named by its label and announced as pressed when Active; Enter and click activate it.”_
- **recommended** `accessibilityLabel`: Developers can replace the name with accessibilityLabel.  
  _From sources: “Developers can replace the name with accessibilityLabel.”_
- **recommended** `accessibilityLabel`: accessibilityLabel is the chip's accessible name; without it, the name is the visible label.  
  _From fact `/facts/props/8` (accessibilityLabel, source evidence)_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Show the chosen value | Keep the generic label | An Active “Date” chip does not say which dates. |
| Match the icon to the filter | Use an unrelated icon | A home icon on a date filter confuses the meaning. |
| Keep the close icon when a press clears | Hide it when a press clears | Without the ×, people cannot tell how to undo the filter. |

## Examples

### Filters above a transaction list, the guide's In context, once the screen has applied the date filter: the date chip is Active and shows its value, “Last 30 days”, with the close icon (a press clears it); Category is Idle (a press opens the screen's picker, which is not part of Chip Select). The row is a ChipGroup, the pack's component for a row of Chip Select filters (the guide's own code lays the two chips out in a plain wrapping row), named “Transaction filters” as the ChipGroup entry advises. The literal values and empty onPress stand for the screen's own state and picker.

```tsx
<ChipGroup accessibilityLabel="Transaction filters">
  <ChipSelect label="Last 30 days" icon="ic_calendar_week" active onPress={() => {}} />
  <ChipSelect label="Category" icon="ic_filter" active={false} onPress={() => {}} />
</ChipGroup>
```

_From inContext: “Pressing an Idle chip opens a picker (not part of Chip Select); pressing an Active chip clears it.”_

### An applied date filter whose press reopens the picker instead of clearing it, the guide's Active without close icon: the only case for hiding the close icon. onPress stands for the screen reopening its picker.

```tsx
<ChipSelect label="Last 30 days" active showCloseIcon={false} onPress={() => {}} />
```

_From configuration: “Only when a press reopens the picker instead of clearing.”_

### One filter on its own, Idle: “Category” names an attribute filter, with the filter icon, as the guide's Configuration and Content show it. A press opens the screen's picker; once a value is chosen, the screen sets active and replaces the label with the value (Content's applied labels, such as “Groceries”).

```tsx
<ChipSelect label="Category" icon="ic_filter" onPress={() => {}} />
```

_From configuration: “For other attribute filters.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `label` | `string` |  | `"Date"` |  | types | Label text to display. Default "Date", from the component source. |
| `active` | `boolean` |  | `false` |  | evidence (2026-10-01) | On the web, aria-pressed follows active. Declared: Whether the chip is in active state. Default false, from the component source. |
| `icon` | `string` |  | `"ic_calendar_week"` |  | evidence (2026-10-01) | The leading icon shows in both states, as in Figma. Declared: Icon name to display in Idle state (when active is false). Default "ic_calendar_week", from the component source. |
| `showCloseIcon` | `boolean` |  | `true` |  | types | Whether to show the close icon when active. Default true, from the component source. |
| `modes` | `Modes` |  |  |  | types | Modes for design token resolution. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Optional style overrides. |
| `labelSlot` | `React.ReactNode` |  |  |  | types | Optional slot to override the label text. |
| `onPress` | `() => void` |  |  |  | types | Button press handler. |
| `accessibilityLabel` | `string` |  |  |  | evidence (2026-10-01) | On the web the chip's aria-label comes from label; accessibilityLabel replaces that name. Declared: Accessible name. Defaults to the visible `label`. |
| `accessibilityHint` | `string` |  |  |  | types | Additional accessibility hint for screen readers. |
| `testID` | `string` |  |  |  | types | Test identifier for E2E / unit tests. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `ChipSelect State` ⚑ flagged (trace-check) | `mode collection` | Idle, Active | `"Idle"` |  | evidence (2026-09-28) | active forces this mode (Idle or Active); a ChipSelect State passed in modes is overridden. Declared: A token collection ChipSelect reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection ChipSelect reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `labelSlot` | `React.ReactNode` |  |  |  | types | Optional slot to override the label text. |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onPress` | `() => void` |  |  |  | types | Button press handler. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

_None recorded._

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/facts/modes/0` · trace-check: Checked on jfs-components 0.1.60 (2026-09-28); the installed package is 0.1.78. Re-check before relying on it.
