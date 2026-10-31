# ChipGroup (brief)

> Coin agent pack 0.1.78+23 · documented · full entry: `components/chipgroup.md` (sources, all facts, flags)

Use a Chip Group to lay out a row of Chip Select filters that wraps onto new lines with even gaps.

**Use when**
- Lay out a row of Chip Select filters that wraps onto new lines with even gaps.
- The group spaces the chips; each chip keeps its own state.
- Filters that combine, such as Date and Payment methods applying together.

**Avoid when**
- Avoid: One choice among options, such as Daily, Weekly or Monthly: people expect several chips to apply, and each is announced as its own toggle.
- Avoid: A mutually exclusive choice: the upstream ChipGroup mdx (unpublished), as the evidence records it, points to a SegmentedControl. Use instead: SegmentedControl.
- Avoid: A single filter: the upstream ChipGroup mdx (unpublished), as the evidence records it, points to a ChipSelect alone. Use instead: ChipSelect.

**Placement**
- In the guide's In context, the filters sit above the list they filter, a transaction list.
- The group fills its container and adds a 32 px row for each line of chips.
- On the web chips are a little wider than in Figma, so Figma's three filters need 382 px for one row.
- More filters wrap onto new rows with the same 8 px gaps.

**Key rules**
- Chip Group has no variants or size.
- Choose the filters, their order, and each chip's icon; each chip turns Active on its own.
- Chip Group has no idle, active, or disabled state.
- Each ChipSelect owns its active and onPress; the group tracks nothing.
- The screen owns each filter: pressing an Idle chip applies it (a picker would open here), and pressing an Active chip clears it.
- The group only keeps the chips spaced as they change width.
- Match each icon to its filter: a calendar, a status, and a payment icon tell the filters apart.
- Avoid: Don't leave the default icon: every chip shows a calendar, so the filters look alike.

**Example:** Figma's three filters, from the guide's Configuration: Date, Status and Payment methods, each ChipSelect with its own icon, in one wrapping row. The screen adds each chip's active and onPress, as the next example shows.

```tsx
<ChipGroup>
  <ChipSelect label="Date" icon="ic_calendar_week" />
  <ChipSelect label="Status" icon="ic_status_loading" />
  <ChipSelect label="Payment methods" icon="ic_payments" />
</ChipGroup>
```

**Props:** `children`, `modes`, `style`, `testID`, `accessibilityLabel`, `accessibilityRole` (button | header | link | menu | menuitem | search | summary | image | switch | text | none | togglebutton | keyboardkey | adjustable | imagebutton | alert | checkbox | combobox | menubar | progressbar | radio | radiogroup | scrollbar | spinbutton | tab | tabbar | tablist | timer | list | toolbar), `accessibilityHint`, `accessibilityState`. (* required)

**Gaps (report, do not work around)**
- On the web the chips are slightly wider than in Figma.
- The published Storybook predates the current stories, so two of its chips show no icon.

Full entry: `components/chipgroup.md`. Links: `components/chipgroup.links.md`.
