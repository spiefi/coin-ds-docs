# ChipSelect (brief)

> Coin agent pack 0.1.78+24 · flagged · full entry: `components/chipselect.md` (sources, all facts, flags)

Use a Chip Select to show one filter, such as a date range, and whether it is applied.

**Use when**
- Show one filter, such as a date range, and whether it is applied.

**Avoid when**
- Avoid: A filter that does not apply: hide it instead. Chip Select has no disabled state.

**Placement**
- In the guide's In context, the filters sit above the list they filter, a transaction list.
- Height is fixed at 32 px.
- `label`: Width grows with the label and the icons, so short labels keep a row of chips on one line.

**Key rules**
- `active`: Idle names the filter; Active shows the chosen value and how to clear it.
- `active`: One property, active, switches the chip between Idle and Active.
- `active`: Figma's State variant maps to the active property, which sets the ChipSelect State mode.
- `active` = `false`: With active unset (false), the chip is Idle.
- The screen owns each filter.
- `onPress`: In the guide's In context, pressing an Idle chip opens a picker (not part of Chip Select) and pressing an Active chip clears it; the screen owns what a press does.
- The screen updates the chip's state (active) and label after each choice.
- `onPress`: The whole chip is one press target: the close icon is part of it, not a separate button.

**Example:** Filters above a transaction list, the guide's In context, once the screen has applied the date filter: the date chip is Active and shows its value, “Last 30 days”, with the close icon (a press clears it); Category is Idle (a press opens the screen's picker, which is not part of Chip Select). The row is a ChipGroup, the pack's component for a row of Chip Select filters (the guide's own code lays the two chips out in a plain wrapping row), named “Transaction filters” as the ChipGroup entry advises. The literal values and empty onPress stand for the screen's own state and picker.

```tsx
<ChipGroup accessibilityLabel="Transaction filters">
  <ChipSelect label="Last 30 days" icon="ic_calendar_week" active onPress={() => {}} />
  <ChipSelect label="Category" icon="ic_filter" active={false} onPress={() => {}} />
</ChipGroup>
```

**Props:** `label`, `active`, `icon`, `showCloseIcon`, `modes`, `style`, `labelSlot`, `onPress`, `accessibilityLabel`, `accessibilityHint`, `testID`. (* required)

**Modes it reads:** ChipSelect State, Color Mode.

Full entry: `components/chipselect.md`. Links: `components/chipselect.links.md`.
