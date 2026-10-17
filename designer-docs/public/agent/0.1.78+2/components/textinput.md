# TextInput

> Coin agent pack 0.1.78+2 (pilot). Generated from `components/textinput.json`; the JSON is the source of truth.

- **State:** flagged (6 flags, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `cba512f` · built 2026-10-17T15:28:09Z
- **Category:** input (for discovery only, not a limit on composition) · **Tags:** input, text field, search field, search bar
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=textinput) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=506-10017) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-textinput--docs)

Use a Text Input for a single line of text, such as a search, with an icon that hints at what to type.

## Use when

- **recommended** A single line of text, such as a search, with an icon that hints at what to type.  
  _From summary: “Use a Text Input for a single line of text, such as a search, with an icon that hints at what to type.”_

## Avoid when

- **discouraged** The field needs a disabled or an error state: Text Input has neither.  
  _From states: “It has no disabled or error state.”_
- **discouraged** The field needs a visible label: Text Input has none.  
  _From sources: “The field has no visible label, error, or disabled state”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Leading icon | An icon that hints at what to type; a search icon by default. Always present. | yes | anatomy: “Hints at what to type; a search icon by default.” |
| Text | The placeholder, then what people type; one line. | yes | anatomy: “The placeholder, then what people type; one line.” |
| End slot | Optional trailing content after the text, such as a filter icon. | no | anatomy: “Optional content after the text, such as a filter icon.” |
| Field | The grey, fully rounded surface; a darker grey border shows focus. | yes | anatomy: “Grey rounded surface; a darker grey border shows focus.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `leading` | `ReactNode` | types |
| `trailing` | `ReactNode` | types |

## Placement

- **recommended** Text Input fills its container's width; set the width with the container.  
  _From sizing: “Text Input fills its container’s width and is 42 px tall, with 14 px of padding at each end and 18 px icons. The screen sets the width.”_
- **recommended** `onChangeText`: Let the screen act on the text (for example filter a list) through onChangeText; Text Input only reports the text.  
  _From inContext: “The screen filters the list as people type; Text Input only reports the text.”_

## Configuration

- **recommended** `leadingIconName`: Keep the search icon, or set leadingIconName to an icon that matches what people type. The leading icon cannot be removed.  
  _From configuration: “The leading icon is always there: keep the search icon or pick one that matches what people type.”_
- **discouraged** `leadingIconName` = `ic_search`: Do not keep the search icon on a field that is not a search, such as an amount.  
  _From doDont: “A search icon on an amount field misleads.”_
- **recommended** `trailing`: Use trailing for a cue at the end of the field, such as a filter icon. It is empty unless you add content.  
  _From configuration: “The end slot is empty unless you add content.”_
- **recommended** `trailing`: Give a trailing Icon its own modes: without them it is gold; AppearanceBrand Neutral gives the grey the guide uses. ⚑ flagged (trace-check)  
  _From evidence: “A custom trailing `Icon` defaults to gold. `AppearanceBrand: Neutral` gives the grey `rgb(84,89,97)` used in the guide.”_
- **discouraged** `placeholder`: Do not pass an array to placeholder to rotate the prompt: the changing text distracts, and screen readers hear only the first prompt.  
  _From doDont: “Changing text distracts, and screen readers hear only the first prompt.”_

## Content

- **recommended** A short prompt, the right icon, and room to type.  
  _From corePrinciple: “A short prompt, the right icon, and room to type.”_
- **recommended** `placeholder`: Write a short placeholder that names what to type, such as “Search transactions”.  
  _From content: “Write a short placeholder that names what to type, such as “Search transactions”.”_
- **recommended** `placeholder`: Keep instructions out of the placeholder: it disappears as soon as people start typing.  
  _From content: “Keep instructions out of it: it disappears as soon as people start typing.”_

Good: “Search transactions”, “Search funds or stocks”, “Amount”

Bad: “Enter the 12-digit number exactly as printed on your card”

## States

| State | When | From |
| --- | --- | --- |
| Empty | No value: the field shows its placeholder. | states: “Empty, the field shows its placeholder.” |
| Focused | While focused: a darker grey border appears and the placeholder clears. | states: “Focused, a darker grey border appears and the placeholder clears.” |
| Filled | With a value: the field shows the text. | states: “Filled, it shows the text.” |

## Accessibility

- **recommended** `accessibilityLabel`: Set accessibilityLabel when the placeholder does not say what the field is for; otherwise, on the web, the placeholder names the field.  
  _From sources: “Set an accessibility label when the placeholder does not say what the field is for.”_
- **recommended** Keep slot icons decorative and put no focusable controls inside leading or trailing. ⚑ flagged (trace-check)  
  _From evidence: “They ask for `accessibilityLabel` when the placeholder is empty or not descriptive, decorative slot icons, and no focusable controls inside the slots.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Prompt with what to type | Put instructions in the placeholder | It is cut off and disappears as people type. |
| Match the icon to the task | Keep the search icon everywhere | A search icon on an amount field misleads. |
| Keep one fixed prompt | Rotate the prompt | Changing text distracts, and screen readers hear only the first prompt. |

## Examples

### A search field whose text the screen uses to filter a list.

```tsx
<TextInput placeholder="Search transactions" onChangeText={(text) => {}} modes={{ 'Color Mode': 'Light' }} />
```

_From inContext: “The screen filters the list as people type; Text Input only reports the text.”_

### An amount field with a matching leading icon.

```tsx
<TextInput placeholder="Amount" leadingIconName="ic_rupee" modes={{ 'Color Mode': 'Light' }} />
```

_From doDont: “The rupee icon says an amount goes here.”_

### A search field with a filter cue in the end slot; the Icon gets its own modes.

```tsx
<TextInput
  placeholder="Search funds"
  modes={{ 'Color Mode': 'Light' }}
  trailing={<Icon iconName="ic_filter" size={18} modes={{ 'Color Mode': 'Light', AppearanceBrand: 'Neutral' }} />}
/>
```

_From configuration: “A cue at the end, such as filters.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `placeholder` | `string \| readonly string[]` |  | `""` |  | evidence (2026-10-08) | The placeholder text disappears on focus. Without accessibilityLabel, the field keeps the placeholder as its accessible name; a rotating placeholder names it after its first item. Declared: Placeholder when empty. A string is static; a string array (2+) cycles with a vertical slide (2000ms dwell, 500ms ease-out), using the same placeholder color/typography as the native placeholder. Default "", from the component source. |
| `value` | `string` |  | `""` |  | types | Default "", from the component source. |
| `onChangeText` | `(text: string) => void` |  |  |  | types |  |
| `leadingIconName` ⚑ flagged (trace-check) | `string` |  | `"ic_search"` |  | evidence (2026-10-01) | The leading slot is always filled, by leading or by an Icon from leadingIconName; it cannot be hidden. Declared: Default "ic_search", from the component source. |
| `leading` | `React.ReactNode` |  |  |  | types |  |
| `trailing` ⚑ flagged (trace-check) | `React.ReactNode` |  |  |  | evidence (2026-10-01) | A custom trailing Icon defaults to gold; AppearanceBrand Neutral gives grey. |
| `modes` | `Modes` |  |  |  | types |  |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types |  |
| `inputStyle` | `StyleProp<TextStyle>` |  |  |  | types |  |
| `onFocus` | `(e: any) => void` |  |  |  | types |  |
| `onBlur` | `(e: any) => void` |  |  |  | types |  |
| `accessibilityLabel` | `string` |  |  |  | evidence (2026-10-08) | Names the input and wins over the placeholder; without it the placeholder names the field and keeps that name while focused. |
| `accessibilityHint` | `string` |  |  |  | types |  |
| `...Omit<RNTextInputProps, "style" | "onBlur" | "onFocus" | "value" | "placeholder" | "onChangeText">` | `Omit<RNTextInputProps, "style" \| "onBlur" \| "onFocus" \| "value" \| "placeholder" \| "onChangeText">` |  |  |  | types | Inherited React Native props the component also accepts. They are not part of the design contract and no guide documents them. |
| `TextInput.Search` ⚑ flagged (trace-check) | `component` |  |  |  | evidence (2026-10-01) | The same field with a fixed ic_search leading icon. Declared: A static sub-component of TextInput. Its own props: placeholder, value, onChangeText, leading, modes, style, inputStyle, accessibilityLabel, accessibilityHint, onFocus, onBlur. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection TextInput reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `InputState` | `mode collection` | Idle, Active | `"Idle"` |  | evidence (2026-10-08) | The component sets Active itself for its focus border (rgb(181,181,181)); the guide does not set it. Declared: A token collection TextInput reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `leading` | `React.ReactNode` |  |  |  | types |  |
| `trailing` | `React.ReactNode` |  |  |  | types |  |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onChangeText` | `(text: string) => void` |  |  |  | types |  |
| `onFocus` | `(e: any) => void` |  |  |  | types |  |
| `onBlur` | `(e: any) => void` |  |  |  | types |  |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- No visible label, error state or disabled state. _(evidence, 2026-10-08)_
- editable={false} makes the field read-only with no visual change, so it cannot stand in for a disabled state. _(evidence, 2026-10-01)_ ⚑ flagged (trace-check)
- The field renders 42 px tall; Figma's is 44 px (open, lower priority, in #183). _(evidence, 2026-10-08)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/facts/props/3` · trace-check: Checked on jfs-components 0.1.77 (2026-10-01); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/props/5` · trace-check: Checked on jfs-components 0.1.77 (2026-10-01); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/props/14` · trace-check: Checked on jfs-components 0.1.77 (2026-10-01); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/gaps/1` · trace-check: Checked on jfs-components 0.1.77 (2026-10-01); the installed package is 0.1.78. Re-check before relying on it.
- `/configuration/3` · trace-check: Checked on jfs-components 0.1.77 (2026-10-01); the installed package is 0.1.78. Re-check before relying on it.
- `/accessibility/1` · trace-check: Checked on jfs-components 0.1.77 (2026-10-01); the installed package is 0.1.78. Re-check before relying on it.
