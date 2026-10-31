# SuggestiveSearch

> Coin agent pack 0.1.78+24 (pilot). Generated from `components/suggestivesearch.json`; the JSON is the source of truth.

- **State:** flagged (1 flag, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `b4988c5` · built 2026-10-31T02:32:56Z
- **Category:** input (for discovery only, not a limit on composition) · **Tags:** autocomplete, typeahead, combobox, search with suggestions, bank search
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=suggestivesearch) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4579-8094) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-suggestivesearch--docs)

Use a Suggestive Search to let people type and pick one item from a known list, such as their bank, with matches shown as they type.

## Use when

- **recommended** Let people type and pick one item from a known list, such as their bank, with matches shown as they type.  
  _From summary: “Use a Suggestive Search to let people type and pick one item from a known list, such as their bank, with matches shown as they type.”_

## Avoid when

_None in the guide._

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Label | label: names the value, such as “Bank name”. | no | anatomy: “Names the value, such as “Bank name”.” |
| Required mark | isRequired: a red asterisk shown on screen; screen readers hear “required” from the field. | no | anatomy: “Shown on screen; screen readers hear “required” from the field.” |
| Field | Where people type; its border shows the state. | yes | anatomy: “Where people type; its border shows the state.” |
| Suggestions | A floating list of the matches from your items, in your order. | no | anatomy: “Matches from your list, in your order.” |
| Match | The typed text, in bold (highlightMatch). | no | anatomy: “The typed text, in bold.” |
| Support text | supportText: a short hint under the field. | no | configuration: “A short hint under the field.” |
| Error message | errorMessage, shown when isInvalid: a message that says how to fix it, under the red field. | no | states: “A red field and a message that says how to fix it.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `items` | `SuggestiveSearchItem` | types |
| `renderItem` | `((option: SuggestiveSearchOption, meta: { query: string; isSelected: boolean; }) => React.ReactNode)` | types |

## Placement

- **recommended** Suggestive Search fills its container.  
  _From sizing: “Suggestive Search fills its container.”_
- **recommended** The label is 17 px tall with 8 px to a 47 px field.  
  _From sizing: “The label is 17 px tall with 8 px to a 47 px field.”_
- **recommended** The list opens 6 px below the field with 44 px rows, floats over what follows, and scrolls after 240 px.  
  _From sizing: “The list opens 6 px below the field with 44 px rows, floats over what follows, and scrolls after 240 px.”_
- **recommended** `isInvalid` = `true`: On the guide's add-a-bank-account screen, Continue checks that a bank was picked from the list and, if not, shows the field's error (isInvalid with errorMessage); the open list floats over the button.  
  _From inContext: “Continue checks that a bank was picked from the list and shows an error if not; the list floats over the button while it’s open.”_

## Configuration

- **recommended** `supportText`: Add supportText for a short hint under the field.  
  _From configuration: “A short hint under the field.”_
- **recommended** `isRequired` = `true`: Set isRequired to mark the field required: a red asterisk after the label, and screen readers hear “required”.  
  _From configuration: “A red asterisk after the label; screen readers hear “required”.”_
- **recommended** `emptyMessage`: Set emptyMessage to say so when nothing matches; without it the list just disappears.  
  _From configuration: “Says so when nothing matches; without it the list just disappears.”_
- **discouraged** `emptyMessage`: Do not leave emptyMessage out and let the list vanish: people can’t tell whether anything matched.  
  _From doDont: “People can’t tell whether anything matched.”_
- **recommended** `maxResults`: Set maxResults to cap the list; otherwise it scrolls after about five rows.  
  _From configuration: “Caps the list; otherwise it scrolls after about five rows.”_
- **recommended** `highlightMatch` = `false`: Set highlightMatch to false to show matches in plain text.  
  _From configuration: “Matches show in plain text.”_
- **recommended** `items`: Pass an option as { value, label, disabled: true } to keep it listed but not choosable, such as a payee still being verified.  
  _From configuration: “Ananya Iyer is listed but disabled, such as a payee still being verified.”_
- **discouraged** `isInvalid` = `true`: Do not set isInvalid without an errorMessage: a red field doesn’t say what’s wrong.  
  _From doDont: “A red field doesn’t say what’s wrong.”_
- **recommended** `FormField States`: Show states with isInvalid, isReadOnly and isDisabled: the component sets FormField States itself (invalid gives Error, read only or disabled give Read Only with disabled at 50 % opacity, focus gives Active, otherwise Idle).  
  _From evidence: “`FormField States` is forced: invalid → Error, read-only or disabled → Read Only (disabled adds 50 % opacity), focused → Active, else Idle.”_
- **recommended** `open` = `true`: To show the list open in a static example, pass the controlled open prop: on the web an uncontrolled list (defaultOpen) closes on the first mousedown outside it.  
  _From evidence: “on the web the component closes an uncontrolled list on any mousedown outside it”_

## Content

- **recommended** Type a little, then pick the right one.  
  _From corePrinciple: “Type a little, then pick the right one.”_
- **recommended** `label`: Label the field with what it holds, such as “Bank name”.  
  _From content: “Label the field with what it holds, such as “Bank name””_
- **recommended** `placeholder`: Use the placeholder for a search hint.  
  _From content: “use the placeholder for a search hint.”_
- **discouraged** `placeholder`: Do not use the placeholder as the label: it disappears as soon as people type.  
  _From doDont: “It disappears as soon as people type.”_
- **recommended** `items`: Keep options short and unique.  
  _From content: “Keep options short and unique”_
- **recommended** `emptyMessage`: Write the no-match message as what happened.  
  _From content: “write the no-match message as what happened”_
- **recommended** `errorMessage`: Make error messages say how to fix the pick.  
  _From content: “make errors say how to fix the pick.”_

Good: “Bank name”, “Search bank name”, “Pick the bank your account is with.”, “No matching banks”, “Choose your bank from the list.”, “HDFC Bank”, “State Bank of India”, “Beneficiary”, “Search beneficiary”

## States

| State | When | From |
| --- | --- | --- |
| Idle | At rest: a grey border; it turns purple when focused. | states: “Grey border; it turns purple when focused.” |
| Open | As people type, matches from the items appear in a floating list under the field, with the typed text in bold. | anatomy: “As people type, matches from your list appear in a floating list under it, with the typed text in bold.” |
| No matches | With emptyMessage the list says so when nothing matches; without it the list just disappears. | configuration: “Says so when nothing matches; without it the list just disappears.” |
| Option chosen | The list marks the chosen row with a grey fill and a 16 px check (Figma: white with a 20 px check). | sources: “marks the chosen row with a grey fill and a 16 px check (Figma: white with a 20 px check).” |
| Error | isInvalid with errorMessage: a red field and a message that says how to fix it. | states: “A red field and a message that says how to fix it.” |
| Read only | isReadOnly: grey, shows the chosen bank, and can’t be changed. | states: “Grey, shows the chosen bank, and can’t be changed.” |
| Disabled | isDisabled: faded and unavailable; like read only, it can’t be typed in or opened. | states: “Read only and disabled can’t be typed in or opened; disabled is also faded.” |

## Accessibility

- **recommended** On the web the field is a combobox: the arrow keys move through the suggestions, Enter picks one, Escape closes the list, and focus stays in the field after a pick.  
  _From sources: “On the web the field is a combobox: the arrow keys move through the suggestions, Enter picks one, Escape closes the list, and focus stays in the field after a pick.”_
- **recommended** Each suggestion is announced by its label; isRequired and isInvalid are announced, with the errorMessage tied to the field.  
  _From sources: “Each suggestion is announced by its label, and required and error are announced, with the message tied to the field.”_
- **recommended** `accessibilityLabel`: The field's accessible name defaults to the visible label, then the placeholder; accessibilityLabel overrides it.  
  _From fact `/facts/props/31` (accessibilityLabel, source types)_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Label the field | Use the placeholder as the label | It disappears as soon as people type. |
| Say when nothing matches | Let the list vanish | People can’t tell whether anything matched. |
| Explain the error | Rely on red alone | A red field doesn’t say what’s wrong. |

## Examples

### Adding a bank account: people type part of their bank’s name and pick it, then press Continue. The screen checks that a bank was picked; errorMessage shows only once it sets isInvalid, as in the error state.

```tsx
<Card>
  <Card.Title>Add a bank account</Card.Title>
  <SuggestiveSearch
    label="Bank name"
    placeholder="Search bank name"
    items={['HDFC Bank', 'Himachal Pradesh Gramin Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra Bank', 'Punjab National Bank', 'Bank of Baroda', 'Canara Bank', 'Union Bank of India', 'IndusInd Bank', 'Yes Bank']}
    emptyMessage="No matching banks"
    errorMessage="Choose your bank from the list."
    onValueChange={() => {}}
  />
  <Button label="Continue" onPress={() => {}} />
</Card>
```

_From inContext: “Continue checks that a bank was picked from the list and shows an error if not”_

### The error state: the typed bank is not in the list, so the field is red and the message says how to fix the pick.

```tsx
<SuggestiveSearch
  label="Bank name"
  placeholder="Search bank name"
  items={['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Bank of Baroda']}
  defaultInputValue="Paytm Bank"
  isInvalid
  errorMessage="Choose your bank from the list."
/>
```

_From states: “A red field and a message that says how to fix it.”_

### Object items with an option that can’t be chosen: Ananya Iyer stays listed but disabled, such as a payee still being verified.

```tsx
<SuggestiveSearch
  label="Beneficiary"
  placeholder="Search beneficiary"
  items={[
    { value: 'u1', label: 'Aarav Sharma' },
    { value: 'u2', label: 'Aditi Verma' },
    { value: 'u3', label: 'Rohan Mehta' },
    { value: 'u4', label: 'Ananya Iyer', disabled: true },
  ]}
  onValueChange={() => {}}
/>
```

_From configuration: “Ananya Iyer is listed but disabled, such as a payee still being verified.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `label` | `string` |  |  |  | types | Label rendered above the input. |
| `placeholder` | `string` |  | `"Search"` |  | types | Placeholder text shown when the query is empty. Default "Search", from the component source. |
| `items` | `SuggestiveSearchItem[]` |  |  |  | evidence (2026-10-10) | The screen owns the items and any loading; the component filters, caps, highlights the first match in bold, and shows a check on the selected row. An option object may set disabled: it stays listed and can't be chosen. Declared: Suggestions to filter against the current query. May be bare strings or `{ value, label }` objects. |
| `inputValue` | `string` |  |  |  | types | Current query text (controlled). When `undefined` the component manages its own query state internally. |
| `defaultInputValue` | `string` |  | `""` |  | types | Initial query text for uncontrolled mode. Default "", from the component source. |
| `onInputChange` | `(text: string) => void` |  |  |  | types | Called whenever the query text changes (typing or selection). |
| `value` | `SuggestiveSearchOptionValue \| null` |  |  |  | types | Currently selected suggestion value (controlled). When `undefined` the component tracks the selection internally. |
| `defaultValue` | `SuggestiveSearchOptionValue \| null` |  | `null` |  | types | Initial selected value for uncontrolled mode. Default null, from the component source. |
| `onValueChange` | `(value: SuggestiveSearchOptionValue \| null, option?: SuggestiveSearchOption) => void` |  |  |  | evidence (2026-10-10) | Choosing an option sets the query to its label and closes the list; typing anything else clears the selection. Declared: Called when a suggestion is chosen. |
| `filter` | `(query: string, option: SuggestiveSearchOption) => boolean` |  |  |  | evidence (2026-10-23) | Since c8526ae the default and custom filters get the trimmed query (“HDF ” lists HDFC Bank). Declared: Custom predicate deciding whether an option matches the current query. Defaults to a case-insensitive substring match on the label. |
| `minChars` | `number` |  | `1` |  | types | Minimum number of characters required before suggestions are shown. Default 1, from the component source. |
| `maxResults` | `number` |  |  |  | types | Caps the number of suggestions rendered. Defaults to no limit. |
| `highlightMatch` | `boolean` |  | `true` |  | types | Highlights the matched substring of each suggestion in bold. Default true, from the component source. |
| `emptyMessage` | `string` |  |  |  | types | Message shown when the query has matched no suggestions. When omitted, the dropdown simply stays hidden on an empty result set. |
| `renderItem` | `(option: SuggestiveSearchOption, meta: {         query: string;         isSelected: boolean;     }) => React.ReactNode` |  |  |  | types | Custom renderer for a suggestion row (overrides the default label). |
| `open` | `boolean` |  |  |  | types | Controlled open state of the suggestion dropdown. |
| `defaultOpen` | `boolean` |  | `false` |  | evidence (2026-10-11) | On the web an uncontrolled list closes on any mousedown outside it, as designed; the guide's static examples pass the controlled open prop to keep their lists open. Declared: Initial open state for uncontrolled mode. Default false, from the component source. |
| `onOpenChange` | `(open: boolean) => void` |  |  |  | types | Called whenever the open state changes. |
| `menuMaxHeight` | `number` |  | `240` |  | types | Maximum height of the suggestion list before it becomes scrollable. Default 240, from the component source. |
| `menuOffset` | `number` |  | `6` |  | types | Vertical gap between the input and the suggestion dropdown. Default 6, from the component source. |
| `isRequired` | `boolean` |  | `false` |  | evidence (2026-10-23) | The red asterisk is visible text; screen readers get the requirement from the field (aria-required on the web). Declared: Renders a required asterisk next to the label. Default false, from the component source. |
| `isDisabled` | `boolean` |  | `false` |  | types | Disables interaction and dims the field. Default false, from the component source. |
| `isInvalid` | `boolean` |  | `false` |  | types | Marks the field as invalid and shows `errorMessage`. Default false, from the component source. |
| `isReadOnly` | `boolean` |  | `false` |  | types | Renders the field as read-only (non-interactive, not dimmed). Default false, from the component source. |
| `supportText` | `string` |  |  |  | types | Helper text displayed below the input. |
| `errorMessage` | `string` |  |  |  | types | Replaces `supportText` when `isInvalid` is true. |
| `modes` | `Modes` |  |  |  | types | Modes for design token resolution. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Style overrides for the outermost wrapper. |
| `inputStyle` | `StyleProp<ViewStyle>` |  |  |  | types | Style overrides for the input row. |
| `inputTextStyle` | `StyleProp<TextStyle>` |  |  |  | types | Style overrides for the input text. |
| `menuStyle` | `StyleProp<ViewStyle>` |  |  |  | types | Style overrides for the suggestion dropdown container. |
| `accessibilityLabel` | `string` |  |  |  | types | Accessibility label. Defaults to the visible label / placeholder. |
| `accessibilityHint` | `string` |  |  |  | types | Accessibility hint. |
| `onFocus` | `RNTextInputProps['onFocus']` |  |  |  | types | Called when the input receives focus. |
| `onBlur` | `RNTextInputProps['onBlur']` |  |  |  | types | Called when the input loses focus. |
| `testID` | `string` |  |  |  | types | Test identifier. |
| `SuggestiveSearchItem.toString` | `(() => string) \| (() => string)` |  |  | yes | types | Returns a string representation of a string. A field of each items row. |
| `SuggestiveSearchItem.valueOf` | `(() => string) \| (() => Object)` |  |  | yes | types | Returns the primitive value of the specified object. A field of each items row. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection SuggestiveSearch reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Dropdown Item State` | `mode collection` | Idle, Selected | `"Idle"` |  | types | A token collection SuggestiveSearch reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `FormField States` | `mode collection` | Idle, Active, Read Only, Error, Disabled | `"Idle"` |  | evidence (2026-10-10) | Forced by the component from its props and focus: invalid gives Error, read only or disabled give Read Only (disabled adds 50 % opacity), focused gives Active, otherwise Idle. Declared: A token collection SuggestiveSearch reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Status` | `mode collection` | Auto, Warning, Error, Success, Loading, Neutral | `"Auto"` |  | types | A token collection SuggestiveSearch reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `items` | `SuggestiveSearchItem[]` |  |  |  | types | A structured slot: an array of SuggestiveSearchItem rows. Suggestions to filter against the current query. May be bare strings or `{ value, label }` objects. |
| `renderItem` | `(option: SuggestiveSearchOption, meta: {         query: string;         isSelected: boolean;     }) => React.ReactNode` |  |  |  | types | Custom renderer for a suggestion row (overrides the default label). |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onInputChange` | `(text: string) => void` |  |  |  | types | Called whenever the query text changes (typing or selection). |
| `onValueChange` | `(value: SuggestiveSearchOptionValue \| null, option?: SuggestiveSearchOption) => void` |  |  |  | types | Called when a suggestion is chosen. |
| `onOpenChange` | `(open: boolean) => void` |  |  |  | types | Called whenever the open state changes. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- Suggestive Search still differs from Figma (raised in #233, not claimed by its fix): it bolds the typed text where Figma greys it, its placeholder colour (#888a8d) differs, it marks the chosen row with a grey fill and a 16 px check (Figma: white with a 20 px check), and its rows are 44 px (Figma: 43 px). _(evidence, 2026-10-23)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/avoidWhen` · trace-check: The guide gives no avoidWhen guidance; left empty rather than guessed.
