# Checkbox

> Coin agent pack 0.1.78+24 (pilot). Generated from `components/checkbox.json`; the JSON is the source of truth.

- **State:** flagged (4 flags, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `31f1c5e` · built 2026-10-31T02:32:56Z
- **Category:** input (for discovery only, not a limit on composition) · **Tags:** tick box, check box, multiple choice, multi-select
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=checkbox) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=886-1552) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-checkbox--docs)

Use Checkbox for an independent yes-or-no choice. People can select more than one option in a set.

## Use when

- **recommended** An independent yes-or-no choice.  
  _From summary: “Use Checkbox for an independent yes-or-no choice.”_
- **recommended** A set where people can select more than one option.  
  _From summary: “People can select more than one option in a set.”_
- **recommended** Select any that apply: each option keeps its own value.  
  _From inContext: “Each option keeps its own value.”_

## Avoid when

- **discouraged** Only one answer is allowed: use a single-choice control.  
  _From inContext: “Use a single-choice control when only one answer is allowed.”_
- **discouraged** The choice needs a label and a larger selectable row: use Checkbox Item. Use instead: `CheckboxItem`.  
  _From sizing: “Use Checkbox Item when the choice needs a label and a larger selectable row.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Boundary | The box; locates the control in a list or form. | yes | anatomy: “Locates the control in a list or form.” |
| Checkmark | Shown when checked; makes the selected value explicit. | no | anatomy: “Makes the selected value explicit.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

_No slots._

## Placement

- **recommended** Keep the meaning next to the control: a visible description beside the Checkbox.  
  _From doDont: “Keep the meaning next to the control.”_
- **recommended** Keep the Checkbox at its token-defined size.  
  _From sizing: “Keep the Checkbox at its token-defined size.”_

## Configuration

- **recommended** Keep the selected value separate from hover, focus, and availability.  
  _From corePrinciple: “Keep the selected value separate from hover, focus, and availability.”_
- **recommended** `checked`: Selection answers the question: checked says whether the choice is selected.  
  _From configuration: “Selection answers the question”_
- **recommended** `checked`: checked makes the Checkbox controlled: the screen keeps the value, and onValueChange reports the next one.  
  _From fact `/facts/props/0` (checked, source types)_
- **recommended** `defaultChecked`: Without checked, the Checkbox keeps its own value, starting from defaultChecked (false by default).  
  _From fact `/facts/props/1` (defaultChecked, source types)_
- **recommended** `disabled` = `true`: Availability controls whether that answer can change: disabled true keeps the value from changing.  
  _From configuration: “availability controls whether that answer can change.”_
- **recommended** `disabled` = `true`: A disabled Checkbox can still show the saved checked value.  
  _From doDont: “An unavailable control can still show the saved checked value.”_
- **discouraged** `checked`: Don't clear the selection to show that a control is disabled: clearing the mark misrepresents a preference that is still selected.  
  _From doDont: “Clearing the mark misrepresents a preference that is still selected.”_
- **recommended** The package controls hover and keyboard focus itself; Checkbox has no state, indeterminate or size prop. ⚑ flagged (trace-check)  
  _From sources: “The package controls hover and keyboard focus internally; it exposes no state, indeterminate, or size prop.”_
- **recommended** `focusable`: Leave focusable at its default (true) on a Checkbox of its own. On the web, false takes it out of the Tab order and hides it from assistive tech; CheckboxItem sets it on its own Checkbox so the row is the only checkbox.  
  _From fact `/facts/props/7` (focusable, source types)_

## Content

- **recommended** Always make the meaning of the choice clear.  
  _From corePrinciple: “Always make the meaning of the choice clear.”_
- **recommended** Every choice needs a name.  
  _From content: “Every choice needs a name”_
- **discouraged** Don't leave a checkmark bare: on its own it does not explain what was selected.  
  _From content: “A bare checkmark does not explain what was selected.”_
- **discouraged** Avoid an isolated control: a control with no visible explanation.  
  _From doDont: “Avoid a control with no visible explanation.”_
- **recommended** Use direct, positive wording: make the checked meaning easy to predict.  
  _From doDont: “Make the checked meaning easy to predict.”_
- **discouraged** Avoid double negatives: they make the selected value difficult to interpret.  
  _From doDont: “Double negatives make the selected value difficult to interpret.”_

Good: “Email me a monthly statement”, “Send email updates”, “Email updates”, “SMS updates”

Bad: “Do not stop sending email updates”

## States

| State | When | From |
| --- | --- | --- |
| Unchecked | Not selected: the boundary with no checkmark. | configuration: “Unchecked” |
| Checked | Selected: the checkmark makes the selected value explicit. | anatomy: “Makes the selected value explicit.” |
| Disabled, unchecked | disabled true and not selected: the answer can't change. | configuration: “Disabled, unchecked” |
| Disabled, checked | disabled true and selected: an unavailable control can still show the saved checked value. | doDont: “An unavailable control can still show the saved checked value.” |
| Hover and focus | Temporary feedback while a pointer hovers or Tab reaches the control; they do not change the saved selection. | states: “Hover and focus are temporary feedback. They do not change the saved selection.” |

## Accessibility

- **recommended** `accessibilityLabel`: Use a visible description and a matching accessible name: accessibilityLabel says the same words as the text beside the Checkbox.  
  _From content: “Use a visible description and a matching accessible name.”_
- **recommended** `accessibilityLabel`: accessibilityLabel is the Checkbox's label for screen readers.  
  _From fact `/facts/props/6` (accessibilityLabel, source types)_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Name the choice | Avoid an isolated control | Keep the meaning next to the control. |
| Use direct, positive wording | Avoid double negatives | Double negatives make the selected value difficult to interpret. |
| Use independent options | Avoid mutually exclusive answers | Yes and No cannot both be true; use a single-choice control for this question. |
| Preserve the saved value | Do not clear selection to show disabled | Clearing the mark misrepresents a preference that is still selected. |

## Examples

### Name the choice, the guide's Do: the Checkbox with its meaning next to it in a Text, and accessibilityLabel in the same words, so the visible description and the accessible name match. checked and onValueChange stand for the screen's own wiring, which keeps the value and passes it back.

```tsx
<HStack alignVertical="center">
  <Checkbox checked={false} onValueChange={(checked) => {}} accessibilityLabel="Email me a monthly statement" />
  <Text text="Email me a monthly statement" />
</HStack>
```

_From doDont: “Keep the meaning next to the control.”_

### Select any that apply, the guide's In context: two update channels, each a Checkbox Item row (the guide's Sizing: Checkbox Item when the choice needs a label and a larger selectable row), stacked as the guide's own code stacks them. Each option keeps its own value; checked and onValueChange stand for the screen's own wiring.

```tsx
<VStack>
  <CheckboxItem checked={false} onValueChange={(checked) => {}}>Email updates</CheckboxItem>
  <CheckboxItem checked={false} onValueChange={(checked) => {}}>SMS updates</CheckboxItem>
</VStack>
```

_From inContext: “Each option keeps its own value.”_

### Preserve the saved value, the guide's Do: an unavailable control still shows the saved checked value, with the reason in a Text below it.

```tsx
<VStack>
  <HStack alignVertical="center">
    <Checkbox checked disabled accessibilityLabel="Email updates" />
    <Text text="Email updates" />
  </HStack>
  <Text text="Saved preference; editing is unavailable." />
</VStack>
```

_From doDont: “An unavailable control can still show the saved checked value.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `checked` | `boolean` |  |  |  | types | Whether the checkbox is checked (controlled) |
| `defaultChecked` | `boolean` |  | `false` |  | types | Initial checked state (uncontrolled) Default false, from the component source. |
| `onValueChange` ⚑ flagged (trace-check) | `(checked: boolean) => void` |  |  |  | evidence (2026-09-23) | On the web, a pointer click and Enter toggled the Checkbox. Declared: Callback when the checked state changes. |
| `disabled` ⚑ flagged (trace-check) | `boolean` |  | `false` |  | evidence (2026-09-23) | On the web, a disabled Checkbox exposed aria-disabled true. Declared: Whether the checkbox is disabled. Default false, from the component source. |
| `modes` | `Modes` |  |  |  | types | Design token modes for theming. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Override container styles. |
| `accessibilityLabel` | `string` |  |  |  | types | Accessibility label for screen readers. |
| `focusable` | `boolean` |  | `true` |  | types | When `false` on web, the control is not a tab stop and is hidden from assistive tech. Used by CheckboxItem so the row is the only checkbox. Native behaviour is unchanged. Defaults to `true`. Default true, from the component source. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection Checkbox reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

_No slots._

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onValueChange` | `(checked: boolean) => void` |  |  |  | types | Callback when the checked state changes |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- On the web, a focused Checkbox does not toggle with Space (Enter does): a package and platform interaction defect, still there on dbe0e02 (Component Bug #535). _(evidence, 2026-09-23)_ ⚑ flagged (trace-check)

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/facts/props/2` · trace-check: Checked on jfs-components 0.1.60 (2026-09-23); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/props/3` · trace-check: Checked on jfs-components 0.1.60 (2026-09-23); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/gaps/0` · trace-check: Checked on jfs-components 0.1.60 (2026-09-23); the installed package is 0.1.78. Re-check before relying on it.
- `/configuration/7` · trace-check: Checked on jfs-components 0.1.60 (2026-09-23); the installed package is 0.1.78. Re-check before relying on it.
