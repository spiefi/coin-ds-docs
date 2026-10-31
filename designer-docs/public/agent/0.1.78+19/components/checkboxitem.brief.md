# CheckboxItem (brief)

> Coin agent pack 0.1.78+19 · flagged · full entry: `components/checkboxitem.md` (sources, all facts, flags)

Use Checkbox Item for a selectable row with a clear label and, when needed, a supporting action.

**Use when**
- A selectable row with a clear label and, when needed, a supporting action.

**Placement**
- Give the label room to wrap.
- The row takes the available width of its host; the Checkbox keeps its own size.
- `checked`: In a list such as accounts to include, each row keeps its own selected value (its own checked).

**Key rules**
- `control`: Choose the edge for the control (control leading or trailing) that fits the list.
- `control`: Keep the control position consistent across neighbouring options.
- Avoid: `control`: Avoid mixed control placement: it makes people search for each control.
- `control`: The end slot defaults to 80 px and swaps edges with the Checkbox when control changes.
- `endSlot`: Use endSlot for a supporting action that opens related information without changing the choice.
- `endSlot`: Keep supporting actions distinct from the selection.
- `endSlot`: For an action Button in the 80 px end slot, the guide sets Button / Size XS through the row's modes so it fits.
- `children`: Pass the label as children: label is deprecated and is used only when no children are given.

**Example:** A list of accounts to include; each row keeps its own selected value.

```tsx
<VStack modes={{ 'Color Mode': 'Light' }}>
  <CheckboxItem checked={false} onValueChange={(checked) => {}} modes={{ 'Color Mode': 'Light' }}>Savings • 0245</CheckboxItem>
  <CheckboxItem checked onValueChange={(checked) => {}} modes={{ 'Color Mode': 'Light' }}>Current • 1182</CheckboxItem>
  <CheckboxItem checked={false} onValueChange={(checked) => {}} modes={{ 'Color Mode': 'Light' }}>Fixed deposit • 9073</CheckboxItem>
</VStack>
```

**Props:** `checked`, `defaultChecked`, `onValueChange`, `disabled`, `children`, `label`, `control` (leading | trailing), `endSlot`, `endSlotWidth`, `modes`, `style`, `labelStyle`, `accessibilityLabel`. (* required)

**Modes it reads:** Color Mode, Context, Slot gap, Button / Size.

Full entry: `components/checkboxitem.md`. Links: `components/checkboxitem.links.md`.
