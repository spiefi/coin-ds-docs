# AccordionCheckbox (brief)

> Coin agent pack 0.1.78+20 · flagged · full entry: `components/accordioncheckbox.md` (sources, all facts, flags)

Group related choices behind a clear heading. People can select the group and open its options independently.

**Use when**
- Related choices grouped behind a clear heading, where people can select the group and open its options independently.
- Choosing items as a group, such as the accounts to include: people open the group to review each one, or use the header checkbox to select them all through the screen's own wiring.

**Placement**
- Let the host supply the width; AccordionCheckbox grows in height as its content wraps or expands.
- `children`: Put a CheckboxGroup of CheckboxItem rows in the content slot.
- `children`: Keep related choices together in the content area.

**Key rules**
- Selecting is not expanding: the header checkbox changes checked (onCheckedChange), and pressing the rest of the header changes expanded (onExpandedChange).
- Choose selection and expansion separately: a group can be selected while closed, or open while unselected.
- Agree how selecting a group affects its choices before using it in a flow.
- `onCheckedChange`: AccordionCheckbox only reports the header checkbox and expand changes; it does not change its rows. When the product needs select-all, the screen's code connects the header's checked to the rows.
- `checked`: When a product needs select-all behavior, connect the parent and child state explicitly in consumer code.
- Avoid: Don't imply that checking the header automatically changes the rows below it.
- `children`: Rows keep their own checked state and labels: each CheckboxItem holds its own value, which the header does not change.
- `checked`: checked makes the header checkbox controlled: the screen keeps the value, and onCheckedChange reports the next one.

**Example:** Select accounts as a group, the guide's In context: a named group with a short qualifier, and CheckboxItem rows with distinct names in a CheckboxGroup. Every value is controlled; the handlers stand for the screen's own wiring, which opens and closes the group from onExpandedChange and, for select-all, sets every row from onCheckedChange and checks the header when every row is checked.

```tsx
<AccordionCheckbox
  title="Axis Bank"
  subtitle="3 accounts"
  checked={false}
  onCheckedChange={(checked) => {}}
  expanded
  onExpandedChange={(expanded) => {}}
>
  <CheckboxGroup accessibilityLabel="Account choices">
    <CheckboxItem checked={false} onValueChange={(checked) => {}}>Savings • 0245</CheckboxItem>
    <CheckboxItem checked={false} onValueChange={(checked) => {}}>Current • 1182</CheckboxItem>
    <CheckboxItem checked={false} onValueChange={(checked) => {}}>Fixed deposit • 9073</CheckboxItem>
  </CheckboxGroup>
</AccordionCheckbox>
```

**Props:** `title`, `subtitle`, `defaultExpanded`, `expanded`, `onExpandedChange`, `defaultChecked`, `checked`, `onCheckedChange`, `disabled`, `children`, `modes`, `style`, `accessibilityLabel`, `disableTruncation`. (* required)

**Modes it reads:** Color Mode, context 10, Profile Card Appearance.

**Gaps (report, do not work around)**
- On the web, the keyboard does not keep selecting apart from expanding: Enter on the focused header checkbox selects the group and also opens or closes it, and Space opens or closes it without selecting it. Pointer presses keep the two apart. Still so on dbe0e02 (Component Bug #540; Space not selecting is the Checkbox's own Component Bug #535).
- disabled dims the whole component, content slot included, but makes only the header unavailable: rows that are not disabled themselves look unavailable yet still respond, though the package's own description of disabled says the content is disabled too. Still so on dbe0e02 (Component Bug #540).

Full entry: `components/accordioncheckbox.md`. Links: `components/accordioncheckbox.links.md`.
