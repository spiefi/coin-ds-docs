# CheckboxItem

> Coin agent pack 0.1.78+26 (pilot). Generated from `components/checkboxitem.json`; the JSON is the source of truth.

- **State:** flagged (9 flags, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `e7ed622` · built 2026-10-31T03:54:03Z
- **Category:** input (for discovery only, not a limit on composition) · **Tags:** checkbox row, selectable row, list item, option row
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=checkboxitem) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4303-8392) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-checkboxitem--docs)

Use Checkbox Item for a selectable row with a clear label and, when needed, a supporting action.

## Use when

- **recommended** A selectable row with a clear label and, when needed, a supporting action.  
  _From summary: “Use Checkbox Item for a selectable row with a clear label and, when needed, a supporting action.”_

## Avoid when

_None in the guide._

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Control | The Checkbox; shows whether the option is selected. | yes | anatomy: “Shows whether the option is selected.” |
| Label | The children slot; describes the option and uses the remaining row width. | yes | anatomy: “Describes the option and uses the remaining row width.” |
| Action | The optional endSlot; opens related information without changing the choice. | no | anatomy: “Opens related information without changing the choice.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `children` | `ReactNode` | types |
| `label` | `ReactNode` | types |
| `endSlot` | `ReactNode` | types |

## Placement

- **recommended** Give the label room to wrap.  
  _From sizing: “Give the label room to wrap.”_
- **recommended** The row takes the available width of its host; the Checkbox keeps its own size.  
  _From sizing: “The row takes the available width; the Checkbox keeps its own size.”_
- **recommended** `checked`: In a list such as accounts to include, each row keeps its own selected value (its own checked).  
  _From inContext: “Each account keeps its own selected value.”_

## Configuration

- **recommended** `control`: Choose the edge for the control (control leading or trailing) that fits the list.  
  _From configuration: “Choose the edge that fits the list.”_
- **recommended** `control`: Keep the control position consistent across neighbouring options.  
  _From configuration: “Keep that position consistent across neighboring options.”_
- **discouraged** `control`: Avoid mixed control placement: it makes people search for each control.  
  _From doDont: “Avoid making people search for each control.”_
- **recommended** `control`: The end slot defaults to 80 px and swaps edges with the Checkbox when control changes. ⚑ flagged (trace-check)  
  _From sources: “the optional end slot defaults to 80 px and swaps edges with the Checkbox.”_
- **recommended** `endSlot`: Use endSlot for a supporting action that opens related information without changing the choice.  
  _From anatomy: “Opens related information without changing the choice.”_
- **recommended** `endSlot`: Keep supporting actions distinct from the selection.  
  _From corePrinciple: “Keep supporting actions distinct from the selection.”_
- **recommended** `endSlot`: For an action Button in the 80 px end slot, the guide sets Button / Size XS through the row's modes so it fits. ⚑ flagged (trace-check)  
  _From evidence: “The public action uses Button Size XS through the owner modes to fit the documented 80px slot.”_
- **recommended** `children`: Pass the label as children: label is deprecated and is used only when no children are given.  
  _From fact `/facts/props/5` (label, source evidence)_
- **recommended** `disabled`: When a row is disabled and the reason is not obvious, explain it in nearby content.  
  _From states: “Explain unavailable choices in nearby content when the reason is not obvious.”_
- **discouraged** `disabled` = `true`: Avoid unexplained disabled rows: a disabled control alone does not explain what to do next.  
  _From doDont: “A disabled control alone does not explain what to do next.”_

## Content

- **recommended** Make the whole choice easy to understand and select.  
  _From corePrinciple: “Make the whole choice easy to understand and select.”_
- **recommended** `children`: A plain label usually makes the row easiest to understand.  
  _From content: “A plain label usually makes the row easiest to understand.”_
- **recommended** `children`: Name the choice: say exactly what selecting the row enables.  
  _From doDont: “Say exactly what selecting the row enables.”_
- **discouraged** `children`: Avoid vague labels such as “Enable this”: people should not have to guess what “this” means.  
  _From doDont: “People should not have to guess what “this” means.”_
- **recommended** `children`: Distinguish similar options: include the detail people need to choose the right account.  
  _From doDont: “Include the detail people need to choose the right account.”_
- **discouraged** `children`: Avoid duplicate choices: identical labels hide which account will be selected.  
  _From doDont: “Identical labels hide which account will be selected.”_
- **recommended** Place the reason beside the unavailable option.  
  _From doDont: “Place the reason beside the unavailable option.”_

Good: “Send account updates by email”, “Email monthly statements”, “Send monthly account statements by email”, “Savings • 0245”, “Current • 1182”, “Fixed deposit • 9073”, “Unavailable while account verification is pending.”

Bad: “Enable this”

## States

| State | When | From |
| --- | --- | --- |
| Unchecked | The option is not selected (checked false). | states: “Unchecked” |
| Checked | The option is selected (checked true). | states: “Checked” |
| Disabled, unchecked | disabled true and not selected. | states: “Disabled, unchecked” |
| Disabled, checked | disabled true and selected: a disabled option can retain its selected value. | states: “A disabled option can retain its selected value.” |

## Accessibility

- **recommended** On the web the row is one checkbox with one Tab stop that announces whether it is selected; Space, Enter or a click toggles it once, and Details keeps its own Tab stop without changing the selection.  
  _From sources: “On the web the row is one checkbox with one Tab stop that announces whether it is selected; Space, Enter, or a click toggles it once, and Details keeps its own Tab stop without changing the selection.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Align the controls | Avoid mixed placement | Keep controls on the same edge. |
| Name the choice | Avoid vague labels | Say exactly what selecting the row enables. |
| Explain unavailable choices | Avoid unexplained disabled rows | A disabled control alone does not explain what to do next. |
| Distinguish similar options | Avoid duplicate choices | Identical labels hide which account will be selected. |

## Examples

### A list of accounts to include; each row keeps its own selected value.

```tsx
<VStack modes={{ 'Color Mode': 'Light' }}>
  <CheckboxItem checked={false} onValueChange={(checked) => {}} modes={{ 'Color Mode': 'Light' }}>Savings • 0245</CheckboxItem>
  <CheckboxItem checked onValueChange={(checked) => {}} modes={{ 'Color Mode': 'Light' }}>Current • 1182</CheckboxItem>
  <CheckboxItem checked={false} onValueChange={(checked) => {}} modes={{ 'Color Mode': 'Light' }}>Fixed deposit • 9073</CheckboxItem>
</VStack>
```

_From inContext: “Each account keeps its own selected value.”_

### A row with a Details action in the end slot; Button / Size XS goes in the row's modes, and the Button gets the same modes.

```tsx
<CheckboxItem
  defaultChecked={false}
  onValueChange={(checked) => {}}
  modes={{ 'Color Mode': 'Light', 'Button / Size': 'XS' }}
  endSlot={<Button label="Details" onPress={() => {}} modes={{ 'Color Mode': 'Light', 'Button / Size': 'XS' }} />}
>
  Savings • 0245
</CheckboxItem>
```

_From anatomy: “Opens related information without changing the choice.”_

### A disabled, selected row with its reason beside it.

```tsx
<VStack modes={{ 'Color Mode': 'Light' }}>
  <CheckboxItem checked disabled modes={{ 'Color Mode': 'Light' }}>Savings • 0245</CheckboxItem>
  <Text modes={{ 'Color Mode': 'Light' }}>Unavailable while account verification is pending.</Text>
</VStack>
```

_From doDont: “Place the reason beside the unavailable option.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `checked` | `boolean` |  |  |  | types | Whether the checkbox is checked (controlled). |
| `defaultChecked` | `boolean` |  | `false` |  | types | Initial checked state (uncontrolled). Default false, from the component source. |
| `onValueChange` | `(checked: boolean) => void` |  |  |  | types | Callback fired when the checked state changes. |
| `disabled` | `boolean` |  | `false` |  | types | Whether the row is disabled — both the checkbox and row press handler are disabled. Default false, from the component source. |
| `children` ⚑ flagged (trace-check) | `React.ReactNode` |  |  |  | evidence (2026-09-23) | Preferred over the legacy label; the row forwards its modes to slot children. Declared: Content rendered in the row's label slot (between the leading and trailing edges). This is the primary way to supply the label and mirrors the Figma "Text" slot — pass a plain string for the default token-styled label, or any custom node(s) for full control. Multiple children are laid out in a horizontal row with `slot/gap` (Figma default `Slot gap = XS` → 2px), matching the `Text` + `Link` composition in the design. A single custom node (e.g. a vertical stack) is left as-is. Custom nodes receive the same `modes` as the parent. When both `children` and the legacy {@link label} prop are provided, `children` wins. |
| `label` ⚑ flagged (trace-check) | `React.ReactNode` |  |  |  | evidence (2026-09-23) | A string label wraps; the Long label story's name does not mean it truncates. Declared: Deprecated: Prefer the `children` slot instead (`<CheckboxItem>Fixed deposit • 0245</CheckboxItem>`). `label` is kept for backward compatibility and behaves identically — it is used only when no `children` are provided. The label content rendered next to the checkbox. |
| `control` ⚑ flagged (trace-check) | `'leading' \| 'trailing'` | leading, trailing | `"leading"` |  | evidence (2026-09-23) | With control trailing, the end action comes first and the Checkbox last. Declared: Position of the checkbox control relative to the label. - `'leading'` (default): checkbox is rendered on the left, then label, then optional `endSlot` on the right. - `'trailing'`: optional `endSlot` is rendered on the left, then label, then checkbox on the right (row uses `space-between` so the checkbox sits on the trailing edge). Matches the Figma "Control" variant on the Checkbox Item component. Default "leading", from the component source. |
| `endSlot` ⚑ flagged (trace-check) | `React.ReactNode` |  |  |  | evidence (2026-09-23) | A press on the end-slot Button does not change the selection; a press on the row toggles it. Declared: Optional content rendered in the row's end slot (e.g. a `Button`). When provided, it receives the same `modes` as the parent. Wrapped in a fixed-width container matching the Figma `endSlot` design. Presses on the end slot do not toggle the checkbox. Placement depends on `control`: - With `control="leading"` the slot appears on the right edge (after the label). - With `control="trailing"` the slot appears on the left edge (before the label). |
| `endSlotWidth` ⚑ flagged (trace-check) | `number` |  | `80` |  | evidence (2026-09-23) | Figma's end slot is 80 px, matching the default; the nested Checkbox is 18 px. Declared: Width of the end slot container in pixels. Defaults to 80 to match the Figma reference. Default 80, from the component source. |
| `modes` | `Modes` |  |  |  | types | Design token modes for theming (e.g. `{ 'Color Mode': 'Light' }`). |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Override container styles. |
| `labelStyle` | `StyleProp<TextStyle>` |  |  |  | types | Override the label text styles. |
| `accessibilityLabel` | `string` |  |  |  | types | Accessibility label for screen readers. Defaults to the `label` prop when it is a string. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection CheckboxItem reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context` | `mode collection` | Default, Nudge&Alert, CTACard, ListItem | `"Default"` |  | types | A token collection CheckboxItem reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Slot gap` | `mode collection` | S, M, L, XL, XS | `"S"` |  | types | A token collection CheckboxItem reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / Size` ⚑ flagged (trace-check) | `mode collection` |  |  |  | evidence (2026-09-23) | Not in CheckboxItem's mode list; set in the row's modes, it reaches the end-slot Button, and XS fits the 80 px slot. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types | Content rendered in the row's label slot (between the leading and trailing edges). This is the primary way to supply the label and mirrors the Figma "Text" slot — pass a plain string for the default token-styled label, or any custom node(s) for full control. Multiple children are laid out in a horizontal row with `slot/gap` (Figma default `Slot gap = XS` → 2px), matching the `Text` + `Link` composition in the design. A single custom node (e.g. a vertical stack) is left as-is. Custom nodes receive the same `modes` as the parent. When both `children` and the legacy {@link label} prop are provided, `children` wins. |
| `label` | `React.ReactNode` |  |  |  | types | The label content rendered next to the checkbox. |
| `endSlot` | `React.ReactNode` |  |  |  | types | Optional content rendered in the row's end slot (e.g. a `Button`). When provided, it receives the same `modes` as the parent. Wrapped in a fixed-width container matching the Figma `endSlot` design. Presses on the end slot do not toggle the checkbox. Placement depends on `control`: - With `control="leading"` the slot appears on the right edge (after the label). - With `control="trailing"` the slot appears on the left edge (before the label). |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onValueChange` | `(checked: boolean) => void` |  |  |  | types | Callback fired when the checked state changes. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

_None recorded._

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/facts/props/7` · trace-check: Checked on jfs-components 0.1.60 (2026-09-23); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/props/4` · trace-check: Checked on jfs-components 0.1.60 (2026-09-23); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/props/6` · trace-check: Checked on jfs-components 0.1.60 (2026-09-23); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/props/5` · trace-check: Checked on jfs-components 0.1.60 (2026-09-23); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/props/8` · trace-check: Checked on jfs-components 0.1.60 (2026-09-23); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/modes/3` · trace-check: Checked on jfs-components 0.1.60 (2026-09-23); the installed package is 0.1.78. Re-check before relying on it.
- `/configuration/3` · trace-check: Checked on jfs-components 0.1.60 (2026-09-23); the installed package is 0.1.78. Re-check before relying on it.
- `/configuration/6` · trace-check: Checked on jfs-components 0.1.60 (2026-09-23); the installed package is 0.1.78. Re-check before relying on it.
- `/avoidWhen` · trace-check: The guide gives no avoidWhen guidance; left empty rather than guessed.
