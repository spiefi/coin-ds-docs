# Checkbox (brief)

> Coin agent pack 0.1.78+25 · flagged · full entry: `components/checkbox.md` (sources, all facts, flags)

Use Checkbox for an independent yes-or-no choice. People can select more than one option in a set.

**Use when**
- An independent yes-or-no choice.
- A set where people can select more than one option.
- Select any that apply: each option keeps its own value.

**Avoid when**
- Avoid: Only one answer is allowed: use a single-choice control.
- Avoid: The choice needs a label and a larger selectable row: use Checkbox Item. Use instead: CheckboxItem.

**Placement**
- Keep the meaning next to the control: a visible description beside the Checkbox.
- Keep the Checkbox at its token-defined size.

**Key rules**
- Keep the selected value separate from hover, focus, and availability.
- `checked`: Selection answers the question: checked says whether the choice is selected.
- `checked`: checked makes the Checkbox controlled: the screen keeps the value, and onValueChange reports the next one.
- `defaultChecked`: Without checked, the Checkbox keeps its own value, starting from defaultChecked (false by default).
- `disabled` = `true`: Availability controls whether that answer can change: disabled true keeps the value from changing.
- `disabled` = `true`: A disabled Checkbox can still show the saved checked value.
- Avoid: `checked`: Don't clear the selection to show that a control is disabled: clearing the mark misrepresents a preference that is still selected.
- The package controls hover and keyboard focus itself; Checkbox has no state, indeterminate or size prop.

**Example:** Name the choice, the guide's Do: the Checkbox with its meaning next to it in a Text, and accessibilityLabel in the same words, so the visible description and the accessible name match. checked and onValueChange stand for the screen's own wiring, which keeps the value and passes it back.

```tsx
<HStack alignVertical="center">
  <Checkbox checked={false} onValueChange={(checked) => {}} accessibilityLabel="Email me a monthly statement" />
  <Text text="Email me a monthly statement" />
</HStack>
```

**Props:** `checked`, `defaultChecked`, `onValueChange`, `disabled`, `modes`, `style`, `accessibilityLabel`, `focusable`. (* required)

**Modes it reads:** Color Mode.

**Gaps (report, do not work around)**
- On the web, a focused Checkbox does not toggle with Space (Enter does): a package and platform interaction defect, still there on dbe0e02 (Component Bug #535).

Full entry: `components/checkbox.md`. Links: `components/checkbox.links.md`.
