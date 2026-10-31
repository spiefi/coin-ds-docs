# DropdownInput

> Coin agent pack 0.1.78+19 (pilot). Generated from `components/dropdowninput.json`; the JSON is the source of truth.

- **State:** documented
- **Package:** jfs-components 0.1.78 · guide commit `4e470cf` · built 2026-10-30T12:30:13Z
- **Category:** input (for discovery only, not a limit on composition) · **Tags:** select, picker, combobox, select field, form field
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=dropdowninput) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3055-880) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-dropdowninput--docs)

Use a Dropdown Input in a form when people choose one option from a list of four or more.

## Use when

- **recommended** In a form, when people choose one option from a list of four or more.  
  _From summary: “Use a Dropdown Input in a form when people choose one option from a list of four or more.”_

## Avoid when

- **discouraged** Two options, such as Yes or No: in a list they need an extra tap to see both answers.  
  _From doDont: “Yes or No needs an extra tap to see both answers.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Label | Names the question the field answers (label). | no | anatomy: “Names the question the field answers.” |
| Field | Pressable surface that opens the list; it shows the current choice and a chevron. | yes | anatomy: “Pressable surface that opens the list.” |
| Placeholder | Tells people what to choose until they have chosen (placeholder); the choice replaces it. | no | anatomy: “Tells people what to choose until they have chosen.” |
| Chevron | Shows that the field opens a list. | yes | anatomy: “Shows that the field opens a list.” |
| Support text | Explains the choice (supportText), or the error when invalid (errorMessage). | no | anatomy: “Explains the choice, or the error when invalid.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `children` | `ReactNode` | types |
| `renderValue` | `((option: DropdownInputOption \| undefined, hasValue: boolean) => React.ReactNode)` | types |

## Placement

- **recommended** Place it in a form, such as the In context transfer form, where From and To fields sit above a Continue button.  
  _From summary: “Use a Dropdown Input in a form”_
- **recommended** The field fills its container and is 48 px tall.  
  _From sizing: “The field fills its container and is 48 px tall.”_
- **recommended** The field narrows with its column; the chevron stays at the end.  
  _From sizing: “The field narrows with its column; the chevron stays at the end.”_
- **recommended** Pressing the field opens a Dropdown of the options just below it, as a layer over the page.  
  _From anatomy: “Pressing it opens a Dropdown of the options just below.”_
- **recommended** The open list matches the field’s width and scrolls after about five options.  
  _From sizing: “The open list matches the field’s width and scrolls after about five options.”_
- **recommended** `placement`: In the package the list opens below the field by default (placement bottom) and moves to the other side when there isn't room.  
  _From fact `/facts/props/11` (placement, source types)_

## Configuration

- **recommended** `label`: Give every field a label.  
  _From configuration: “Every field has a label.”_
- **recommended** `placeholder`: A label and a placeholder are the minimum for a clear field.  
  _From configuration: “The minimum for a clear field.”_
- **recommended** `supportText`: Add support text when people need help choosing; it sits under the field.  
  _From configuration: “support text when people need help choosing.”_
- **recommended** `items`: Pass the options as items; the chosen option's label replaces the placeholder in the field.  
  _From configuration: “The choice replaces the placeholder.”_
- **recommended** `value`: The screen owns each value: pass value and update it in onValueChange, and check the form when people continue.  
  _From inContext: “The screen owns each value and checks the form when people continue.”_
- **recommended** `defaultOpen`: Leave the list closed until people press the field (open and defaultOpen are left unset).  
  _From corePrinciple: “Label the question, show the choice, and open the list only when asked.”_
- **recommended** `isRequired`: Mark a field the form needs with isRequired: an asterisk follows the label.  
  _From states: “An asterisk follows the label.”_
- **recommended** `errorMessage`: When a field is invalid (isInvalid), errorMessage replaces the support text.  
  _From states: “Invalid replaces the support text with the error”_
- **recommended** `isInvalid`: Mark an empty field invalid when people continue, and show how to fix it.  
  _From inContext: “It marks an empty field invalid and shows how to fix it.”_
- **recommended** `isReadOnly`: Use isReadOnly to show a value that cannot change right now.  
  _From states: “shows a value that cannot change right now.”_
- **recommended** It works with or without a safe-area provider at the app root.  
  _From sources: “It works with or without a SafeAreaProvider.”_

## Content

- **recommended** `label`: Write the label as a noun for the thing being chosen, such as “Account” or “Transfer from”.  
  _From content: “Write the label as a noun for the thing being chosen”_
- **recommended** `placeholder`: Write the placeholder as an instruction that starts with a verb, such as “Select an account”.  
  _From configuration: “Add a placeholder that starts with a verb”_
- **recommended** `errorMessage`: Write error messages as a way to fix the problem, such as “Choose an account to transfer from”.  
  _From content: “error messages as a way to fix the problem.”_
- **discouraged** `errorMessage`: Do not write a vague error: “Invalid” does not say what went wrong.  
  _From doDont: ““Invalid” does not say what went wrong.”_
- **recommended** `label`: Keep a visible label: “Account” still explains the value after a choice, while a placeholder disappears once people choose.  
  _From doDont: ““Account” still explains the value after a choice.”_

Good: “Account”, “Transfer from”, “Select an account”, “Choose where to transfer funds”, “Choose an account to transfer from”

Bad: “Invalid”

## States

| State | When | From |
| --- | --- | --- |
| Default | The field shows the placeholder and a chevron; pressing it opens a Dropdown of the options just below. | anatomy: “The field shows the current choice and a chevron. Pressing it opens a Dropdown of the options just below.” |
| Chosen | After a choice, the chosen option replaces the placeholder. | configuration: “The choice replaces the placeholder.” |
| Required | isRequired: an asterisk follows the label. | states: “An asterisk follows the label.” |
| Invalid | isInvalid: red border, tinted field, and the error (errorMessage) in place of support text. | states: “Red border, tinted field, and the error in place of support text.” |
| Disabled | isDisabled: the whole field is dimmed and does not open. | states: “The whole field is dimmed and does not open.” |
| Read-only | isReadOnly: a grey field that shows the value but does not open. | states: “A grey field that shows the value but does not open.” |

## Accessibility

- **recommended** On the web the field is a combobox that opens a listbox; arrow keys move through the open list and Enter chooses.  
  _From sources: “On the web the field is a combobox that opens a listbox; arrow keys move through the open list and Enter chooses.”_
- **recommended** The chosen option is announced as selected; invalid, required and disabled are announced; a disabled field leaves the tab order; and focus shows a ring.  
  _From sources: “The chosen option is announced as selected, invalid, required, and disabled are announced, a disabled field leaves the tab order, and focus shows a ring.”_
- **recommended** `accessibilityLabel`: accessibilityLabel names the field; without it the field is named by its label, then its placeholder.  
  _From fact `/facts/props/26` (accessibilityLabel, source types)_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Keep a visible label | Rely on the placeholder | Once chosen, “Savings account” sits in the field with no question. |
| Say how to fix an error | Write a vague error | “Invalid” does not say what went wrong. |
| Use it for longer lists | Hide two options in a list | Yes or No needs an extra tap to see both answers. |

## Examples

### The guide's In context: choose accounts for a transfer. A Card holds a title, a From and a To field with the same four accounts, and a Continue button. The screen owns each value (value and onValueChange); when people continue it marks an empty field invalid (isInvalid) and its errorMessage says how to fix it.

```tsx
<Card>
  <VStack>
    <Text text="Transfer money" />
    <DropdownInput
      label="From"
      placeholder="Select an account"
      items={[
        { value: 'savings', label: 'Savings account' },
        { value: 'checking', label: 'Checking account' },
        { value: 'brokerage', label: 'Brokerage account' },
        { value: 'recurring', label: 'Recurring deposit' },
      ]}
      value={null}
      onValueChange={() => {}}
      errorMessage="Choose an account to transfer from"
    />
    <DropdownInput
      label="To"
      placeholder="Select an account"
      items={[
        { value: 'savings', label: 'Savings account' },
        { value: 'checking', label: 'Checking account' },
        { value: 'brokerage', label: 'Brokerage account' },
        { value: 'recurring', label: 'Recurring deposit' },
      ]}
      value={null}
      onValueChange={() => {}}
      errorMessage="Choose an account to transfer to"
    />
    <Button label="Continue" onPress={() => {}} />
  </VStack>
</Card>
```

_From inContext: “The screen owns each value and checks the form when people continue.”_

### A label, a placeholder that starts with a verb, and support text for people who need help choosing; nothing is chosen yet.

```tsx
<DropdownInput
  label="Account"
  placeholder="Select an account"
  supportText="Choose where to transfer funds"
  items={[
    { value: 'savings', label: 'Savings account' },
    { value: 'checking', label: 'Checking account' },
    { value: 'brokerage', label: 'Brokerage account' },
    { value: 'recurring', label: 'Recurring deposit' },
  ]}
  value={null}
  onValueChange={() => {}}
/>
```

_From configuration: “Extra guidance sits under the field.”_

### Invalid: the field has no choice when people continue, so the error replaces the support text and says how to fix it.

```tsx
<DropdownInput
  label="Account"
  placeholder="Select an account"
  items={[
    { value: 'savings', label: 'Savings account' },
    { value: 'checking', label: 'Checking account' },
    { value: 'brokerage', label: 'Brokerage account' },
    { value: 'recurring', label: 'Recurring deposit' },
  ]}
  value={null}
  onValueChange={() => {}}
  isInvalid
  errorMessage="Choose an account to transfer from"
/>
```

_From states: “Red border, tinted field, and the error in place of support text.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `label` | `string` |  |  |  | types | Label rendered above the input. |
| `placeholder` | `string` |  | `"Select an option"` |  | types | Placeholder text shown when no value is selected. Default "Select an option", from the component source. |
| `items` | `DropdownInputOption[]` |  |  |  | types | Data-driven list of options. Mutually compatible with `children`; if both are provided the `items` are rendered first. |
| `value` | `DropdownInputOptionValue \| null` |  |  |  | types | Currently selected value (controlled). When `value` is `undefined` the component operates in uncontrolled mode and keeps its own state. |
| `defaultValue` | `DropdownInputOptionValue \| null` |  | `null` |  | types | Initial selected value for uncontrolled mode. Default null, from the component source. |
| `onValueChange` | `(value: DropdownInputOptionValue \| null, option?: DropdownInputOption) => void` |  |  |  | types | Called when the selected value changes. |
| `children` | `React.ReactNode` |  |  |  | types | Custom slot of `<DropdownItem />` children. Used when finer-grained control is needed (icons, custom layouts, etc.). When provided alongside `items`, both are rendered (items first). |
| `renderValue` | `(option: DropdownInputOption \| undefined, hasValue: boolean) => React.ReactNode` |  |  |  | types | Custom renderer for the trigger label. Receives the currently-selected option (if any) and a boolean indicating whether the field has a value. |
| `open` | `boolean` |  |  |  | types | Controlled open state. |
| `defaultOpen` | `boolean` |  | `false` |  | types | Initial open state for uncontrolled mode. Default false, from the component source. |
| `onOpenChange` | `(open: boolean) => void` |  |  |  | types | Called whenever the open state changes. |
| `placement` | `'bottom' \| 'top' \| 'auto'` | top, bottom, auto | `"bottom"` |  | types | Preferred placement for the popup. The component falls back to the opposite side automatically when there isn't enough room. Default "bottom", from the component source. |
| `isRequired` | `boolean` |  | `false` |  | types | Renders a required asterisk next to the label. Default false, from the component source. |
| `isDisabled` | `boolean` |  | `false` |  | evidence (2026-10-02) | On the web a disabled field has aria-disabled=true and tabindex=-1, so it is announced as disabled and leaves the tab order. Declared: Disables interaction and dims the field. Default false, from the component source. |
| `isInvalid` | `boolean` |  | `false` |  | types | Marks the field as invalid and shows `errorMessage`. Default false, from the component source. |
| `isReadOnly` | `boolean` |  | `false` |  | types | Renders the field in read-only mode (non-interactive but not disabled). Default false, from the component source. |
| `supportText` | `string` |  |  |  | types | Helper text displayed below the input. |
| `errorMessage` | `string` |  |  |  | types | Replaces `supportText` when `isInvalid` is true. |
| `menuMaxHeight` | `number` |  | `240` |  | types | Maximum height of the popup before it becomes scrollable. Helpful for long lists. Defaults to 240 (roughly 5 items). Default 240, from the component source. |
| `menuOffset` | `number` |  |  |  | types | Pixel gap between the trigger and the popup. When omitted, it defaults to the `formField/gap` design token so the menu sits the same distance below the input as the rest of the field's internal spacing. |
| `matchTriggerWidth` | `boolean` |  | `true` |  | types | When true, the popup width matches the trigger width. When false, the popup uses its intrinsic content width but never exceeds the trigger. Default true, from the component source. |
| `closeOnBackdropPress` | `boolean` |  | `true` |  | types | Whether tapping the backdrop closes the menu. Default true, from the component source. |
| `modes` | `Modes` |  |  |  | types | Modes for design token resolution. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Style overrides for the outermost wrapper. |
| `inputStyle` | `StyleProp<ViewStyle>` |  |  |  | types | Style overrides for the input row. |
| `menuStyle` | `StyleProp<ViewStyle>` |  |  |  | types | Style overrides for the popup container. |
| `accessibilityLabel` | `string` |  |  |  | types | Accessibility label. Defaults to the visible label / placeholder. |
| `accessibilityHint` | `string` |  |  |  | types | Accessibility hint. |
| `onFocus` | `(e: any) => void` |  |  |  | types | Called when the trigger receives focus (web only). |
| `onBlur` | `(e: any) => void` |  |  |  | types | Called when the trigger loses focus (web only). |
| `disableTruncation` | `boolean` |  |  |  | types | When `true`, disables text truncation: the trailing ellipsis (`…`) is never shown and any `numberOfLines` clamp is ignored, so the text wraps to as many lines as it needs even when horizontal space is tight. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Primary"` |  | types | A token collection DropdownInput reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / State` | `mode collection` | Idle, Hover, Pressed, Disabled | `"Idle"` |  | types | A token collection DropdownInput reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection DropdownInput reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Dropdown Item State` | `mode collection` | Idle, Selected | `"Idle"` |  | types | A token collection DropdownInput reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Emphasis` | `mode collection` | High, Medium, Low | `"High"` |  | types | A token collection DropdownInput reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `FormField States` | `mode collection` | Idle, Active, Read Only, Error, Disabled | `"Idle"` |  | types | A token collection DropdownInput reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection DropdownInput reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Status` | `mode collection` | Auto, Warning, Error, Success, Loading, Neutral | `"Auto"` |  | types | A token collection DropdownInput reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types | Custom slot of `<DropdownItem />` children. Used when finer-grained control is needed (icons, custom layouts, etc.). When provided alongside `items`, both are rendered (items first). |
| `renderValue` | `(option: DropdownInputOption \| undefined, hasValue: boolean) => React.ReactNode` |  |  |  | types | Custom renderer for the trigger label. Receives the currently-selected option (if any) and a boolean indicating whether the field has a value. |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onValueChange` | `(value: DropdownInputOptionValue \| null, option?: DropdownInputOption) => void` |  |  |  | types | Called when the selected value changes. |
| `onOpenChange` | `(open: boolean) => void` |  |  |  | types | Called whenever the open state changes. |
| `onFocus` | `(e: any) => void` |  |  |  | types | Called when the trigger receives focus (web only). |
| `onBlur` | `(e: any) => void` |  |  |  | types | Called when the trigger loses focus (web only). |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

_None recorded._

## Flags

_None._
