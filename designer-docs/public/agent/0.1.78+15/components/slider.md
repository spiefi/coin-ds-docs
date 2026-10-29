# Slider

> Coin agent pack 0.1.78+15 (pilot). Generated from `components/slider.json`; the JSON is the source of truth.

- **State:** flagged (2 flags, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `cba512f` · built 2026-10-29T07:47:24Z
- **Category:** input (for discovery only, not a limit on composition) · **Tags:** range, amount picker, seek bar
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=slider) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=5373-446) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-slider--docs)

Use a Slider to pick a value from a wide range by dragging, such as a monthly SIP amount or a loan tenure.

## Use when

- **recommended** Pick a value from a wide range by dragging, such as a monthly SIP amount or a loan tenure.  
  _From summary: “Use a Slider to pick a value from a wide range by dragging, such as a monthly SIP amount or a loan tenure.”_
- **recommended** A rough value, chosen by dragging, with the range in view.  
  _From corePrinciple: “A rough value, chosen by dragging, with the range in view.”_

## Avoid when

- **discouraged** A few fixed choices, such as three positions: they read better as Radios. Use instead: `Radio` (not in this pack).  
  _From doDont: “Three positions read better as Radios.”_
- **discouraged** The control needs a hover, pressed, or error style: Slider has none.  
  _From states: “There is no hover, pressed, or error style.”_
- **discouraged** Typing an exact amount: the package's Slider docs say typed exact amounts belong in AmountInput or TextInput.  
  _From evidence: “typed exact amounts belong in AmountInput or TextInput”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Fill | Gold from the minimum up to the value. | yes | anatomy: “Gold from the minimum up to the value.” |
| Track | The 4 px track; pale gold for the rest of the range. | yes | anatomy: “Pale gold: the rest of the range.” |
| Handle | The 20 px handle; drag it, or tap anywhere on the track. | yes | anatomy: “Drag it, or tap anywhere on the track.” |
| Value bubble | Shows the value above the handle; alwaysShowTooltip false shows it only while dragging or hovering. | no | anatomy: “Shows the value above the handle.” |
| End labels | The minimum and maximum, in the value's format; showLabels hides them. | no | anatomy: “The minimum and maximum, in the value’s format.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `renderTooltip` | `((value: number) => React.ReactNode)` | types |
| `minLabel` | `ReactNode` | types |
| `maxLabel` | `ReactNode` | types |

## Placement

- **recommended** `width`: Slider fills its container and is 61 px tall with its end labels.  
  _From sizing: “Slider fills its container and is 61 px tall with its end labels”_
- **recommended** Keep the area above the Slider clear: the bubble floats about 40 px above it and takes no space.  
  _From sizing: “The bubble floats about 40 px above it and takes no space, so keep that area clear.”_
- **discouraged** Do not put the title right above the Slider: the floating bubble covers the title.  
  _From doDont: “The floating bubble covers the title.”_
- **recommended** `value`: Let the screen keep the value (value with onChange) and save it when the person acts, as when they start the SIP.  
  _From inContext: “The screen keeps the value and saves it when the person starts the SIP.”_

## Configuration

- **recommended** Set the range (minValue, maxValue), the step values snap to (step), and how the value is written (formatOptions or formatValue).  
  _From configuration: “Set the range, the step values snap to, and how the value is written.”_
- **recommended** `formatValue`: When formatValue writes a unit, such as “10 years”, make it say “1 year” too.  
  _From configuration: “A format function writes “10 years”; make it say “1 year” too.”_
- **recommended** `alwaysShowTooltip` = `false`: With alwaysShowTooltip false the value appears only while dragging or hovering, so show it elsewhere too.  
  _From configuration: “The value appears only while dragging or hovering, so show it elsewhere too.”_
- **recommended** `alwaysShowTooltip` = `false`: When a heading already shows the chosen value, let the bubble appear only while dragging (alwaysShowTooltip false).  
  _From inContext: “The heading shows the chosen amount, so the bubble appears only while dragging.”_
- **recommended** `showLabels` = `false`: Hide the end labels (showLabels false) only when the screen states the range nearby. ⚑ flagged (trace-check)  
  _From configuration: “Hide the ends only when the screen states the range nearby.”_
- **recommended** `isDisabled` = `true`: Disable a slider (isDisabled) only while its value can't change, and say why nearby. ⚑ flagged (trace-check)  
  _From states: “Disable a slider only while its value can’t change, and say why nearby.”_

## Content

- **recommended** Put a title above the Slider: it has no label of its own.  
  _From content: “A Slider has no label of its own, so put a title above it”_
- **recommended** Write the value as people read it, such as ₹5,000 or 10 years; the end labels follow the same format.  
  _From content: “Write the value as people read it, such as ₹5,000 or 10 years; the end labels follow the same format.”_
- **recommended** `formatOptions`: Write a money value as money: ₹500 and ₹50,000 read as amounts.  
  _From doDont: “₹500 and ₹50,000 read as amounts.”_
- **discouraged** `formatOptions`: Do not show raw numbers: 500 and 50,000 could be anything.  
  _From doDont: “500 and 50,000 could be anything.”_

Good: “₹5,000”, “₹500”, “₹50,000”, “10 years”, “1 year”, “30 years”, “Loan tenure”, “Monthly SIP amount”, “₹5,000 a month”, “Start SIP”

Bad: “500”, “50,000”, “5,000”

## States

| State | When | From |
| --- | --- | --- |
| Enabled | Gold fill and handle; drag, tap, or use the arrow keys. | states: “Gold fill and handle; drag, tap, or use the arrow keys.” |
| Disabled | isDisabled: dimmed to 50%; it keeps its value but can't be changed. | states: “Dimmed to 50%; it keeps its value but can’t be changed.” |

## Accessibility

- **recommended** `accessibilityLabel`: Give the Slider a spoken name (accessibilityLabel) in the same words as the title above it.  
  _From content: “use the same words as its spoken name”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Write the value as money | Show raw numbers | 500 and 50,000 could be anything. |
| Leave room for the bubble | Put the title right above it | The floating bubble covers the title. |
| Use it for a wide range | Use it for a few fixed choices | Three positions read better as Radios. |

## Examples

### A rupee amount from ₹500 to ₹50,000 that snaps to ₹500 steps.

```tsx
<Slider
  accessibilityLabel="Monthly SIP amount"
  minValue={500}
  maxValue={50000}
  step={500}
  defaultValue={5000}
  formatOptions={{ style: 'currency', currency: 'INR', maximumFractionDigits: 0 }}
  locale="en-IN"
  onChange={(value) => {}}
  modes={{ 'Color Mode': 'Light' }}
/>
```

_From configuration: “Values snap to ₹500 steps and read as rupees.”_

### A loan tenure whose format function also writes “1 year”.

```tsx
<Slider
  accessibilityLabel="Loan tenure"
  minValue={1}
  maxValue={30}
  defaultValue={10}
  formatValue={(value) => (value === 1 ? '1 year' : `${value} years`)}
  modes={{ 'Color Mode': 'Light' }}
/>
```

_From configuration: “A format function writes “10 years”; make it say “1 year” too.”_

### A SIP amount card: the heading shows the amount, so the bubble shows only while dragging, and the screen keeps the value until Start SIP.

```tsx
<VStack modes={{ 'Color Mode': 'Light' }}>
  <Text modes={{ 'Color Mode': 'Light' }}>Monthly SIP amount</Text>
  <Text modes={{ 'Color Mode': 'Light' }}>₹5,000 a month</Text>
  <Slider
    accessibilityLabel="Monthly SIP amount"
    value={5000}
    onChange={(value) => {}}
    alwaysShowTooltip={false}
    minValue={500}
    maxValue={50000}
    step={500}
    formatOptions={{ style: 'currency', currency: 'INR', maximumFractionDigits: 0 }}
    locale="en-IN"
    modes={{ 'Color Mode': 'Light' }}
  />
  <Button label="Start SIP" onPress={() => {}} modes={{ 'Color Mode': 'Light' }} />
</VStack>
```

_From inContext: “The heading shows the chosen amount, so the bubble appears only while dragging.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `value` | `number` |  |  |  | types | Current value (controlled). Pair with `onChange`. |
| `defaultValue` | `number` |  |  |  | types | Initial value (uncontrolled). Defaults to `minValue`. |
| `onChange` | `(value: number) => void` |  |  |  | types | Called continuously while the value changes (drag / keypress / track press). |
| `onChangeEnd` | `(value: number) => void` |  |  |  | evidence (2026-10-08) | Fires on release and on key presses; since 636f3f5 not when a key can't change the value. Ref methods do nothing while disabled. Declared: Called once when the interaction ends (drag release / keypress). |
| `minValue` | `number` |  | `0` |  | types | Minimum selectable value. Defaults to `0`. Default 0, from the component source. |
| `maxValue` | `number` |  | `100` |  | types | Maximum selectable value. Defaults to `100`. Default 100, from the component source. |
| `step` | `number` |  | `1` |  | evidence (2026-10-05) | Arrow keys move one step, Page Up and Down 10% of the range, Home and End to the ends; tapping anywhere on the 20 px row jumps the handle there. Declared: Snap increment. Defaults to `1`. Use a smaller value for finer control. Default 1, from the component source. |
| `isDisabled` | `boolean` |  | `false` |  | evidence (2026-10-05) | 50% opacity, tabindex -1, no drag or key response; on the web it also sets aria-disabled (636f3f5). Declared: Disables interaction and dims the control. Default false, from the component source. |
| `formatOptions` | `Intl.NumberFormatOptions` |  |  |  | evidence (2026-10-05) | Formats the bubble and both end labels, like formatValue. Declared: `Intl.NumberFormat` options used to format the value bubble and the min/max labels (e.g. `{ style: 'currency', currency: 'USD' }`). |
| `locale` | `string` |  |  |  | types | BCP-47 locale used with `formatOptions`. Defaults to the runtime locale. |
| `formatValue` | `(value: number) => string` |  |  |  | evidence (2026-10-05) | Also formats the end labels, so a function that appends a unit must handle the singular: a plain `${v} years` writes “1 years” on the minimum label. Declared: Full override for value formatting. Takes precedence over `formatOptions`. Receives the raw numeric value, returns the string to display. |
| `renderTooltip` | `(value: number) => React.ReactNode` |  |  |  | types | Renders fully custom value-bubble content. Takes precedence over `formatValue`. |
| `alwaysShowTooltip` | `boolean` |  | `true` |  | evidence (2026-10-08) | Either way the bubble sits 12 px above the 20 px handle row and takes no layout space, so content directly above the Slider is covered. Declared: When `true` (default, matches the Figma design) the value bubble is always visible. When `false` it behaves like a normal tooltip — hidden at rest and revealed only while the user interacts (dragging on touch, or hovering/dragging on web), then dismissed as soon as the finger lifts. Either way the bubble floats above the track and never occupies layout space, so it will overlap content above the slider — leave room for it. Default true, from the component source. |
| `showLabels` | `boolean` |  | `true` |  | types | Toggles the min/max labels below the track. Defaults to `true`. Default true, from the component source. |
| `minLabel` | `React.ReactNode` |  |  |  | types | Override for the left (min) label. Defaults to the formatted `minValue`. |
| `maxLabel` | `React.ReactNode` |  |  |  | types | Override for the right (max) label. Defaults to the formatted `maxValue`. |
| `width` | `number \| ˋ${number}%ˋ` |  | `"100%"` |  | types | Slider width. Defaults to `'100%'` so it fills its parent. Default "100%", from the component source. |
| `modes` | `Modes` |  |  |  | evidence (2026-10-08) | Since 636f3f5, JFSThemeProvider's modes apply too, matching the modes prop. Declared: Design-token modes for theming. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Style override for the outer container. |
| `accessibilityLabel` | `string` |  |  |  | evidence (2026-10-08) | Names the role=slider element, the only element carrying the name; it exposes aria-valuenow, aria-valuemin, aria-valuemax and aria-valuetext, and aria-disabled when disabled. Declared: Accessibility label for screen readers. |
| `testID` | `string` |  |  |  | types | Test identifier for the slider. |
| `disableTruncation` | `boolean` |  |  |  | types | When `true`, disables text truncation: the trailing ellipsis (`…`) is never shown and any `numberOfLines` clamp is ignored, so the text wraps to as many lines as it needs even when horizontal space is tight. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Primary"` |  | types | A token collection Slider reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `AppearanceSystem` | `mode collection` | positive, warning, negative | `"positive"` |  | types | A token collection Slider reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection Slider reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context` | `mode collection` | Default, Nudge&Alert, CTACard, ListItem | `"Default"` |  | types | A token collection Slider reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Emphasis` | `mode collection` | High, Medium, Low | `"High"` |  | types | A token collection Slider reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection Slider reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Semantic Intent` | `mode collection` | Brand, System | `"Brand"` |  | types | A token collection Slider reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Text Appearance` | `mode collection` | Neutral, Primary, Secondary, Tertiary, Success, Warning, Error | `"Neutral"` |  | types | A token collection Slider reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Text Sizes` | `mode collection` | Medium, Small, Large | `"Medium"` |  | types | A token collection Slider reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Weight` | `mode collection` | Medium, Regular, Bold | `"Medium"` |  | types | A token collection Slider reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `renderTooltip` | `(value: number) => React.ReactNode` |  |  |  | types | Renders fully custom value-bubble content. Takes precedence over `formatValue`. |
| `minLabel` | `React.ReactNode` |  |  |  | types | Override for the left (min) label. Defaults to the formatted `minValue`. |
| `maxLabel` | `React.ReactNode` |  |  |  | types | Override for the right (max) label. Defaults to the formatted `maxValue`. |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onChange` | `(value: number) => void` |  |  |  | types | Called continuously while the value changes (drag / keypress / track press). |
| `onChangeEnd` | `(value: number) => void` |  |  |  | types | Called once when the interaction ends (drag release / keypress). |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- The Slider is 61 px tall; Figma's is 44 px (open for a decision: change code or Figma). _(evidence, 2026-10-08)_
- Every render logs four “Variable not found” console warnings for the bubble's radius and maxWidth tokens. _(evidence, 2026-10-08)_
- Single thumb and horizontal only, with no ticks. _(evidence, 2026-10-05)_
- In Dark mode the end labels resolve black (#197); the guide shows Light only. _(evidence, 2026-10-05)_
- The published Storybook predates 0.1.78. _(evidence, 2026-10-08)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/configuration/4` · trace-check: The source says "only", but whether the screen states the range nearby is a judgement the package cannot check, though the sentence reads as a firm condition on any Slider that hides its end labels. Read as recommended, not hardened into a constraint.
- `/configuration/5` · trace-check: The source says "only", but whether the value can change is decided by the screen, which the package cannot check, though the sentence reads as a firm condition on any disabled Slider. Read as recommended, not hardened into a constraint.
