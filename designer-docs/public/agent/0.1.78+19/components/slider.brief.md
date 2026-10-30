# Slider (brief)

> Coin agent pack 0.1.78+19 · flagged · full entry: `components/slider.md` (sources, all facts, flags)

Use a Slider to pick a value from a wide range by dragging, such as a monthly SIP amount or a loan tenure.

**Use when**
- Pick a value from a wide range by dragging, such as a monthly SIP amount or a loan tenure.
- A rough value, chosen by dragging, with the range in view.

**Avoid when**
- Avoid: A few fixed choices, such as three positions: they read better as Radios. Use instead: Radio.
- Avoid: The control needs a hover, pressed, or error style: Slider has none.
- Avoid: Typing an exact amount: the package's Slider docs say typed exact amounts belong in AmountInput or TextInput.

**Placement**
- `width`: Slider fills its container and is 61 px tall with its end labels.
- Keep the area above the Slider clear: the bubble floats about 40 px above it and takes no space.
- Avoid: Do not put the title right above the Slider: the floating bubble covers the title.
- `value`: Let the screen keep the value (value with onChange) and save it when the person acts, as when they start the SIP.

**Key rules**
- Set the range (minValue, maxValue), the step values snap to (step), and how the value is written (formatOptions or formatValue).
- `formatValue`: When formatValue writes a unit, such as “10 years”, make it say “1 year” too.
- `alwaysShowTooltip` = `false`: With alwaysShowTooltip false the value appears only while dragging or hovering, so show it elsewhere too.
- `alwaysShowTooltip` = `false`: When a heading already shows the chosen value, let the bubble appear only while dragging (alwaysShowTooltip false).
- `showLabels` = `false`: Hide the end labels (showLabels false) only when the screen states the range nearby.
- `isDisabled` = `true`: Disable a slider (isDisabled) only while its value can't change, and say why nearby.
- `accessibilityLabel`: Give the Slider a spoken name (accessibilityLabel) in the same words as the title above it.
- Put a title above the Slider: it has no label of its own.

**Example:** A rupee amount from ₹500 to ₹50,000 that snaps to ₹500 steps.

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

**Props:** `value`, `defaultValue`, `onChange`, `onChangeEnd`, `minValue`, `maxValue`, `step`, `isDisabled`, `formatOptions`, `locale`, `formatValue`, `renderTooltip`, `alwaysShowTooltip`, `showLabels`, `minLabel`, `maxLabel`, `width`, `modes`, `style`, `accessibilityLabel`, `testID`, `disableTruncation`. (* required)

**Modes it reads:** AppearanceBrand, AppearanceSystem, Color Mode, Context, Emphasis, Page type, Semantic Intent, Text Appearance, Text Sizes, Weight.

**Gaps (report, do not work around)**
- The Slider is 61 px tall; Figma's is 44 px (open for a decision: change code or Figma).
- Every render logs four “Variable not found” console warnings for the bubble's radius and maxWidth tokens.
- Single thumb and horizontal only, with no ticks.
- In Dark mode the end labels resolve black (#197); the guide shows Light only.
- The published Storybook predates 0.1.78.

Full entry: `components/slider.md`. Links: `components/slider.links.md`.
