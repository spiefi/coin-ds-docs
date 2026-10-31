# InputSearch

> Coin agent pack 0.1.78+24 (pilot). Generated from `components/inputsearch.json`; the JSON is the source of truth.

- **State:** documented
- **Package:** jfs-components 0.1.78 · guide commit `3f56271` · built 2026-10-31T02:32:56Z
- **Category:** input (for discovery only, not a limit on composition) · **Tags:** search, search bar, search field, find, clear button
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=inputsearch) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1796-188) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-inputsearch--docs)

Use an Input Search to search a list, with a clear button that appears as people type and an optional hint below.

## Use when

- **recommended** Search a list, with a clear button that appears as people type and an optional hint below.  
  _From summary: “Use an Input Search to search a list, with a clear button that appears as people type and an optional hint below.”_
- **recommended** Say what people can find, and let them start over.  
  _From corePrinciple: “Say what people can find, and let them start over.”_
- **recommended** Find one item in a list on the screen, such as a payee, as in the guide's In context.  
  _From inContext: “Find a payee”_

## Avoid when

- **discouraged** Collecting a value, such as an account number: use a Form Field, whose label stays while people type. Use instead: `FormField`.  
  _From doDont: “Use a Form Field for a labelled value”_
- **discouraged** The field needs a disabled or an error state: Input Search has neither.  
  _From states: “It has no disabled or error state.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Search icon | Marks the field as search; always shown. | yes | anatomy: “Marks the field as search; always shown.” |
| Query | The placeholder, then what people type; one line. | yes | anatomy: “The placeholder, then what people type; one line.” |
| Clear | Appears with text and empties the field. | no | anatomy: “Appears with text and empties the field.” |
| Field | Grey rounded surface; a grey border shows focus. | yes | anatomy: “Grey rounded surface; a grey border shows focus.” |
| Hint | Optional support text about what people can search for. | no | anatomy: “Optional support text about what people can search for.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `leading` | `ReactNode` | types |
| `trailing` | `ReactNode` | types |

## Placement

- **recommended** Input Search fills its container's width.  
  _From sizing: “Input Search fills its container’s width.”_
- **recommended** The screen sets the width.  
  _From sizing: “The screen sets the width.”_
- **recommended** The field is 42 px tall with 14 px of padding at each end and 18 px icons, and the hint sits 8 px below.  
  _From sizing: “The field is 42 px tall with 14 px of padding at each end and 18 px icons, and the hint sits 8 px below.”_
- **recommended** In a narrow column the field narrows with it, and the hint wraps.  
  _From sizing: “The field narrows with its column, and the hint wraps.”_

## Configuration

- **recommended** `supportText`: The hint is off by default.  
  _From configuration: “The hint is off by default.”_
- **recommended** `supportText`: Turn the hint on (supportText) only with a short hint you write (supportTextLabel): on its own it reads “Support Text”.  
  _From configuration: “Turn it on only with a short hint you write; on its own it reads “Support Text”.”_
- **recommended** `supportTextLabel`: With supportText on, set supportTextLabel: left out, the hint reads “Support Text”.  
  _From fact `/facts/props/1` (supportTextLabel, source types)_
- **recommended** `supportText` = `true`: Add a hint when the prompt is not enough: set supportText with a supportTextLabel that says what kinds of search work.  
  _From configuration: “Add a hint when the prompt is not enough”_
- **recommended** `supportText` = `false`: Leave the hint off when the prompt says enough.  
  _From configuration: “Leave it off when the prompt says enough.”_
- **recommended** `value`: Give the field value and onChangeText: typing and clearing need both.  
  _From evidence: “The field needs `value` and `onChangeText` for typing and clearing to work.”_
- **recommended** `onChangeText`: Input Search only reports the text (onChangeText): the screen filters the list as people type and restores it when they clear the field.  
  _From inContext: “The screen filters the list as people type and restores it when they clear the field; Input Search only reports the text.”_
- **recommended** `trailing`: The clear button shows while value is not empty and trailing is not passed, so passing trailing hides it; it calls onChangeText('').  
  _From evidence: “The clear button shows while `value` is not empty and `trailing` is not passed; it calls `onChangeText('')`.”_
- **recommended** `placeholder`: Set placeholder to your own prompt: left out, it reads “Search”.  
  _From fact `/facts/props/5` (placeholder, source evidence)_
- **recommended** There is no disabled or error state.  
  _From states: “It has no disabled or error state.”_

## Content

- **recommended** `placeholder`: Write a short prompt that names what people search, such as “Search payees”, in sentence case with no full stop.  
  _From content: “Write a short prompt that names what people search, such as “Search payees”, in sentence case with no full stop.”_
- **recommended** `supportTextLabel`: Use the hint for an example of what works.  
  _From content: “Use the hint for an example of what works.”_
- **recommended** `placeholder`: Keep one fixed prompt.  
  _From doDont: “Keep one fixed prompt”_
- **discouraged** `placeholder`: Don't rotate the prompt (a placeholder array): changing text distracts, and screen readers hear only the first prompt when the field has no accessibility label.  
  _From doDont: “Changing text distracts, and screen readers hear only the first prompt.”_
- **discouraged** `supportTextLabel`: Don't leave the default hint: the placeholder words “Support Text” reach people.  
  _From doDont: “The placeholder words “Support Text” reach people.”_

Good: “Search payees”, “Search funds”, “Search help articles”, “Search investments”, “Try a name or mobile number”, “Try a fund name or fund house”

Bad: “Support Text”

## States

| State | When | From |
| --- | --- | --- |
| Empty | No text yet: the field shows its prompt. | states: “Empty, the field shows its prompt.” |
| Focused | While focused: a grey border appears and the prompt clears. | states: “Focused, a grey border appears and the prompt clears.” |
| Filled | With text: a clear button appears at the end. | states: “Filled, a clear button appears at the end.” |

## Accessibility

- **recommended** `accessibilityLabel`: The field has no visible label: give it an accessibilityLabel with the same words as the prompt.  
  _From content: “The field has no visible label, so give it an accessibility label with the same words.”_
- **recommended** On the web the clear button is a button named “Clear search”.  
  _From sources: “On the web the clear button is a button named “Clear search””_
- **recommended** On the web the field has one tab stop, the input: Tab goes from the input to Clear (when there is text) and on to the next field.  
  _From evidence: “Tab goes input → Clear → next field, so the wrapper is no longer a tab stop.”_
- **recommended** `accessibilityLabel`: On the web, without an accessibilityLabel the placeholder names the field, also while focused; a rotating placeholder is named by its first prompt.  
  _From sources: “without an accessibility label the placeholder names the field, also while focused; a rotating placeholder is named by its first prompt.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Write your own hint | Leave the default hint | The placeholder words “Support Text” reach people. |
| Keep one fixed prompt | Rotate the prompt | Changing text distracts, and screen readers hear only the first prompt. |
| Use a Form Field for a labelled value | Collect a value with a search field | The prompt disappears as people type, and there is no label or error. |

## Examples

### Find a payee, the guide's In context: a Card holding a VStack with Input Search over the payee rows (List Items with the payee's name and mobile number). value="" stands for the screen's query, still empty, so every payee shows; onChangeText stands for the screen storing the query and filtering the rows as people type, and clearing the field gives all of them back.

```tsx
<Card>
  <VStack>
    <InputSearch
      value=""
      onChangeText={() => {}}
      placeholder="Search payees"
      accessibilityLabel="Search payees"
      supportText
      supportTextLabel="Try a name or mobile number"
    />
    <ListItem layout="Horizontal" navArrow={false} title="Asha Rao" supportText="98765 43210" />
    <ListItem layout="Horizontal" navArrow={false} title="Ravi Kumar" supportText="91234 56780" />
    <ListItem layout="Horizontal" navArrow={false} title="Meera Shah" supportText="99887 76655" />
  </VStack>
</Card>
```

_From inContext: “The screen filters the list as people type and restores it when they clear the field; Input Search only reports the text.”_

### A fund search with a hint, from the guide's Prompts and hints: the prompt names what people search, the hint gives an example of what works, and the accessibility label repeats the prompt. value and onChangeText stand for the screen's query state.

```tsx
<InputSearch
  value=""
  onChangeText={() => {}}
  placeholder="Search funds"
  accessibilityLabel="Search funds"
  supportText
  supportTextLabel="Try a fund name or fund house"
/>
```

_From content: “Use the hint for an example of what works.”_

### A search with no hint, the guide's Without a hint: the prompt says enough, and the hint is off by default, so supportText is left out. value and onChangeText stand for the screen's query state.

```tsx
<InputSearch
  value=""
  onChangeText={() => {}}
  placeholder="Search help articles"
  accessibilityLabel="Search help articles"
/>
```

_From configuration: “Leave it off when the prompt says enough.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `supportText` | `boolean` |  | `false` |  | evidence (2026-10-08) | Off by default; turned on with no supportTextLabel, the hint reads “Support Text”. Declared: Default false, from the component source. |
| `supportTextLabel` | `string` |  | `"Support Text"` |  | types | Default "Support Text", from the component source. |
| `supportTextIcon` | `string` |  | `"ic_info"` |  | types | Icon name from the icon registry to render inside the support text (e.g. 'ic_info', 'ic_cart'). Defaults to 'ic_info'. Default "ic_info", from the component source. |
| `modes` | `Modes` |  |  |  | types |  |
| `containerStyle` | `StyleProp<ViewStyle>` |  |  |  | types |  |
| `placeholder` | `string \| readonly string[]` |  | `"Search"` |  | evidence (2026-10-08) | The visible placeholder clears on focus. Declared: Placeholder shown when the field is empty. Pass a string for a static placeholder, or a string array (2+) to cycle with a vertical slide (2000ms dwell, 500ms ease-out). Styled by TextInput. Default "Search", from the component source. |
| `value` | `string` |  |  |  | evidence (2026-10-02) | Typing and clearing need value and onChangeText both. |
| `onChangeText` | `(text: string) => void` |  |  |  | types |  |
| `onFocus` | `(e: any) => void` |  |  |  | types |  |
| `onBlur` | `(e: any) => void` |  |  |  | types |  |
| `leading` | `React.ReactNode` |  |  |  | types |  |
| `trailing` | `React.ReactNode` |  |  |  | evidence (2026-10-02) | The clear button shows while value is not empty and trailing is not passed; it calls onChangeText(''). |
| `inputStyle` | `StyleProp<TextStyle>` |  |  |  | types |  |
| `accessibilityLabel` | `string` |  |  |  | evidence (2026-10-08) | Without accessibilityLabel the placeholder names the input and keeps naming it while focused; a rotating placeholder names it after its first item. |
| `accessibilityHint` | `string` |  |  |  | types |  |
| `...Omit<RNTextInputProps, 'style' | 'onChangeText' | 'onFocus' | 'onBlur' | 'placeholder' | 'value'>` | `Omit<RNTextInputProps, 'style' \| 'onChangeText' \| 'onFocus' \| 'onBlur' \| 'placeholder' \| 'value'>` |  |  |  | types | Inherited React Native props the component also accepts. They are not part of the design contract and no guide documents them. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection InputSearch reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `FormField States` | `mode collection` | Idle, Active, Read Only, Error, Disabled | `"Idle"` |  | types | A token collection InputSearch reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `InputState` | `mode collection` | Idle, Active | `"Idle"` |  | types | A token collection InputSearch reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Status` | `mode collection` | Auto, Warning, Error, Success, Loading, Neutral | `"Auto"` |  | types | A token collection InputSearch reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

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

- Input Search has no label, error or disabled design. _(evidence, 2026-10-08)_
- The field is 42 px tall; Figma's is 44 px. _(evidence, 2026-10-08)_
- There is no disabled, error or label prop; editable={false} blocks typing with no visual change. _(evidence, 2026-10-02)_

## Flags

_None._
