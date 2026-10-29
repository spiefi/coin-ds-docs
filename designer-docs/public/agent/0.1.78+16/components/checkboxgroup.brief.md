# CheckboxGroup (brief)

> Coin agent pack 0.1.78+16 · documented · full entry: `components/checkboxgroup.md` (sources, all facts, flags)

Use a Checkbox Group to let people pick any number of related options, such as accounts to link.

**Use when**
- People pick any number of related options, such as accounts to link.
- Independent choices: people can pick one, several, or none.

**Avoid when**
- Avoid: A single choice, such as a billing period: checkboxes let people pick “Monthly” and “Yearly” at once.

**Placement**
- The group fills its container and adds no side padding, so the form around it sets the margins.
- Rows are 12 px apart.
- Rows grow taller when an end action or a long label needs the space.
- The screen supplies the group's heading.

**Key rules**
- **REQUIRED** `children`: Put only Checkbox Items (CheckboxItem) in the group, one for each option.
- Each row can be a plain label, a label with a link, or a label with an action on its end.
- Plain labels are the default, for lists of accounts or options.
- A label with a link (a Text and a Link in the row's children) is the Figma composition, for consent rows.
- An end action (the row's endSlot) is for a secondary action that does not toggle the row.
- `children`: Pass real items, not the empty group: with no children the group shows three identical placeholder rows.
- The screen owns each item’s checked state (checked and onValueChange on each CheckboxItem); on the guide's Choose accounts to link screen it also enables the button once something is selected.
- The group itself only lays out the rows.

**Example:** Choose accounts to link, the guide's In context, as the screen first shows it: a Card with the screen's heading in a Text, the group named by accessibilityLabel, and the Button. The screen owns each row's checked value: onValueChange stands for the screen's own wiring, which stores the new value and passes it back as checked. The screen enables the Button once something is selected; onPress stands for linking. It sets no modes.

```tsx
<Card>
  <Text text="Choose accounts to link" />
  <CheckboxGroup accessibilityLabel="Accounts to link">
    <CheckboxItem checked={false} onValueChange={(checked) => {}}>Fixed deposit • 0245</CheckboxItem>
    <CheckboxItem checked={false} onValueChange={(checked) => {}}>Recurring deposit • 1182</CheckboxItem>
    <CheckboxItem checked={false} onValueChange={(checked) => {}}>Mutual fund • Equity</CheckboxItem>
    <CheckboxItem checked={false} onValueChange={(checked) => {}}>Savings account • 4821</CheckboxItem>
  </CheckboxGroup>
  <Button label="Select an account" disabled onPress={() => {}} />
</Card>
```

**Props:** `children`, `modes`, `style`, `accessibilityLabel`. (* required)

**Modes it reads:** Color Mode, Context, Slot gap.

**Gaps (report, do not work around)**
- On the web the rows sit directly in the group's list, without list items.

Full entry: `components/checkboxgroup.md`. Links: `components/checkboxgroup.links.md`.
