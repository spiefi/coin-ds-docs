# FilterBar

> Coin agent pack 0.1.78+27 (pilot). Generated from `components/filterbar.json`; the JSON is the source of truth.

- **State:** flagged (1 flag, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `3f56271` · built 2026-10-31T05:18:28Z
- **Category:** input (for discovery only, not a limit on composition) · **Tags:** search, search bar, search field, text field, filter
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=filterbar) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=541-4823) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-filterbar--docs)

Use a Filter Bar at the top of a list so people can narrow what they see by typing.

## Use when

- **recommended** At the top of a list, so people can narrow what they see by typing.  
  _From summary: “Use a Filter Bar at the top of a list so people can narrow what they see by typing.”_

## Avoid when

- **discouraged** The field needs a disabled or an error state: Filter Bar has neither.  
  _From states: “Filter Bar has no disabled or error state.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Bar | Full-width container that insets the field from the screen edges. | yes | anatomy: “Full-width container that insets the field from the screen edges.” |
| Field | One public Text Input, set up for search. | yes | anatomy: “The bar holds one public Text Input set up for search” |
| Search icon | Tells people the field searches. | yes | anatomy: “Tells people the field searches.” |
| Placeholder | Names what is being searched. The query replaces it. | no | anatomy: “Names what is being searched” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `children` | `ReactNode` | types |
| `renderInput` | `((args: RenderInputArgs) => React.ReactNode)` | types |

## Placement

- **recommended** Put it at the top of the list it filters.  
  _From summary: “at the top of a list”_
- **recommended** Filter Bar takes the full width of its container and keeps a fixed height.  
  _From sizing: “Filter Bar takes the full width of its container and keeps a fixed height.”_
- **recommended** Place it in a full-width row; the screen owns the width.  
  _From sizing: “Place it in a full-width row; the screen owns the width.”_
- **recommended** In a narrower host, the field shrinks while the bar keeps its padding.  
  _From sizing: “The field shrinks with its host while the bar keeps its padding.”_
- **recommended** Keep one search per list: one field, one set of results.  
  _From doDont: “Keep one search per list”_

## Configuration

- **recommended** Only the words change: the bar, field and icon come from tokens.  
  _From configuration: “The bar, field, and icon come from tokens.”_
- **recommended** `placeholder`: Designers choose the placeholder and whether the bar opens with a query already in place (value).  
  _From configuration: “Designers choose the placeholder and whether the bar opens with a query already in place.”_
- **recommended** `placeholder`: Name the list in placeholder, such as “Search transactions”: naming the list tells people what they can find.  
  _From configuration: “Naming the list tells people what they can find.”_
- **recommended** `placeholder`: Left out, placeholder reads “Search”, its default: the generic word says nothing about what can be found.  
  _From configuration: “The generic word says nothing about what can be found.”_
- **recommended** `value`: Prefill value with the query when people return to a list that is already filtered.  
  _From configuration: “Use it when returning to a list that is already filtered.”_
- **recommended** `onChangeText`: Name what is being searched, then let the list below respond to every keystroke.  
  _From corePrinciple: “Name what is being searched, then let the list below respond to every keystroke.”_
- **recommended** `onChangeText`: Filter the list in the screen, from the text onChangeText reports: Filter Bar reports the text; it does not filter anything itself.  
  _From inContext: “Filter Bar reports the text; it does not filter anything itself.”_
- **recommended** `renderInput`: renderInput and children are developer overrides, and the guide does not show them.  
  _From sources: “renderInput and children are developer overrides and are not shown.”_
- **recommended** `children`: Passing children without renderInput replaces the default Text Input, and FilterBar then wires up neither value nor onChangeText.  
  _From fact `/facts/props/3` (children, source types)_

## Content

- **recommended** Start the placeholder with “Search” and name the list.  
  _From content: “Start with “Search” and name the list.”_
- **recommended** Keep it to three words or fewer so it fits a narrow field.  
  _From content: “Keep it to three words or fewer so it fits a narrow field.”_
- **recommended** Name the list: “Search transactions” tells people what they will find.  
  _From doDont: ““Search transactions” tells people what they will find.”_
- **discouraged** Don't leave a vague prompt: “Type here” hides what the field searches.  
  _From doDont: ““Type here” hides what the field searches.”_
- **discouraged** Don't write a long placeholder: a long prompt is cut off, so people lose what it searches.  
  _From doDont: “A long prompt is cut off, so people lose what it searches.”_

Good: “Search transactions”, “Search funds”, “Search by merchant”

Bad: “Type here”, “Search transactions, merchants, and categories”

## States

| State | When | From |
| --- | --- | --- |
| Empty | No query yet: the field shows its placeholder. | states: “It shows its placeholder when empty” |
| Filled | With a query: the query replaces the placeholder. | states: “The query replaces the placeholder.” |
| Focused | While the field is selected: a 1 px ring outlines its padded area without changing the bar’s height. | states: “Select the field: a 1 px ring outlines its padded area without changing the bar’s height.” |

## Accessibility

- **recommended** `accessibilityLabel`: On the web, accessibilityLabel names the input.  
  _From sources: “On the web, accessibilityLabel names the input.”_
- **recommended** `accessibilityLabel`: Without accessibilityLabel, FilterBar names the input “Search filter”, so the placeholder never names it.  
  _From evidence: “defaulting to "Search filter", so the placeholder never names the FilterBar input.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Name the list | Leave a vague prompt | “Type here” hides what the field searches. |
| Keep the placeholder short | Write a long placeholder | A long prompt is cut off, so people lose what it searches. |
| Keep one search per list | Stack several search bars | Two bars make people guess which one filters the list. |

## Examples

### Filtering a transaction list, the guide's In context: a Screen holds a Filter Bar named for the list above a VStack of the transaction rows (List Items with the guide's titles and dates). value="" stands for the screen's query, still empty, so every row shows; onChangeText stands for the screen storing the query and showing only the matching rows.

```tsx
<Screen>
  <FilterBar placeholder="Search transactions" value="" onChangeText={(query) => {}} />
  <VStack>
    <ListItem layout="Horizontal" title="Digital Gold" supportText="12 Sep · ₹2,000" />
    <ListItem layout="Horizontal" title="Nifty 50 Index Fund" supportText="10 Sep · ₹5,000" />
    <ListItem layout="Horizontal" title="Electricity bill" supportText="8 Sep · ₹1,240" />
    <ListItem layout="Horizontal" title="Gold savings plan" supportText="1 Sep · ₹1,000" />
  </VStack>
</Screen>
```

_From inContext: “The screen passes the query to its list”_

### Returning to a list that is already filtered, the guide's Prefilled query card: the bar opens with the query “Gold” in place.

```tsx
<FilterBar placeholder="Search transactions" value="Gold" onChangeText={(query) => {}} />
```

_From configuration: “Use it when returning to a list that is already filtered.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `placeholder` | `string` |  | `"Search"` |  | types | Placeholder text for the search input. Default "Search", from the component source. |
| `value` | `string` |  | `""` |  | types | Current value of the search input. Default "", from the component source. |
| `onChangeText` | `(text: string) => void` |  |  |  | types | Callback function called when text changes. |
| `children` | `React.ReactNode` |  |  |  | types | Optional custom content to replace the default TextInput. When provided (and `renderInput` is not set), this is treated as a full override and FilterBar will not wire up value or onChangeText. |
| `renderInput` | `(args: RenderInputArgs) => React.ReactNode` |  |  |  | types | Narrow override hook for the inner input. When provided, this takes precedence over `children` and receives the same props that the default TextInput would use (placeholder, value, onChangeText, modes, and accessibility labelling). Use this when you want to customize the input implementation but still respect the higher-level FilterBar API. |
| `modes` | `Modes` |  |  |  | types | Modes object passed to `getVariableByName` for all design tokens. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Optional container style overrides. |
| `accessibilityLabel` | `string` |  | `"Search filter"` |  | evidence (2026-10-08) | Without it, FilterBar gives its Text Input the name “Search filter”, so the placeholder never names the input. Declared: Accessibility label for the filter bar. |
| `accessibilityHint` | `string` |  |  |  | types | Additional accessibility hint for screen readers /. |
| `...React.ComponentProps<typeof View>` | `React.ComponentProps<typeof View>` |  |  |  | types | Inherited React Native props the component also accepts. They are not part of the design contract and no guide documents them. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection FilterBar reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `InputState` | `mode collection` | Idle, Active | `"Idle"` |  | evidence (2026-10-08) | While the field is focused, the Text Input inside draws its grey InputState Active border, beside the bar's own focus ring. Declared: A token collection FilterBar reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types | Optional custom content to replace the default TextInput. When provided (and `renderInput` is not set), this is treated as a full override and FilterBar will not wire up value or onChangeText. |
| `renderInput` | `(args: RenderInputArgs) => React.ReactNode` |  |  |  | types | Narrow override hook for the inner input. When provided, this takes precedence over `children` and receives the same props that the default TextInput would use (placeholder, value, onChangeText, modes, and accessibility labelling). Use this when you want to customize the input implementation but still respect the higher-level FilterBar API. |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onChangeText` | `(text: string) => void` |  |  |  | types | Callback function called when text changes |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- The bar renders 62 px tall with a 42 px field; Figma draws a 64 px bar with a 44 px field. _(evidence, 2026-10-08)_
- The focus ring is a hard-coded 1 px #222 box-shadow, not a token. _(evidence, 2026-10-08)_
- No disabled or error state. _(evidence, 2026-10-02)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `(whole entry)` · human: The Filter Bar guide (Sources: checked 2 October 2026 on the 3795b4c build) and its evidence (last check 8 October, on 636f3f5) were read against the installed v0.1.78-dbe0e02. FilterBar.tsx is the same file on every build since 0.1.78 (155f6f5 at 5b6894b, 3795b4c, 636f3f5 and dbe0e02); TextInput.tsx changed after the guide's check (17c8f68 at 3795b4c, 2004ac9 from 636f3f5 through dbe0e02), and the filterBar and textInput tokens resolve to the same values on both. One guide sentence does not hold on dbe0e02, and the entry leaves its second half out: the Anatomy Placeholder note “Names what is being searched until they type.” The Text Input inside clears its placeholder as soon as the field is focused, before anything is typed (TextInput.tsx: displayPlaceholder is empty while focused; it was so at 3795b4c too), and the Text Input guide says so itself (“Focused, a darker grey border appears and the placeholder clears.”). The entry quotes only “Names what is being searched”. Also for the same guide fix: the States Empty caption “The placeholder carries the name.” is not quoted, since it can be read as the input's accessible name, which is “Search filter” unless accessibilityLabel is set (evidence, 8 October); and the Focused card describes only the bar's ring, while since 636f3f5 the field also shows Text Input's grey Active border (evidence, 8 October). Guide fix #558. Added by Claude Code in the overnight run agentpack-r27, for Marcin to confirm.
