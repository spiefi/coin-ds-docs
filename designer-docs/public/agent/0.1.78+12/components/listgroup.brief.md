# ListGroup (brief)

> Coin agent pack 0.1.78+12 · flagged · full entry: `components/listgroup.md` (sources, all facts, flags)

Use a List Group to put related list rows under one label, such as a month of payments, with one style for every row.

**Use when**
- Put related list rows under one label, such as a month of payments, with one style for every row.
- Rows people can reorder: people drag a row by its handle, and onDragEnd hands your screen the new order to save.

**Avoid when**
- Avoid: A label with no rows under it: show a group only when it has rows. An empty group shows only the label, with nothing under it.

**Placement**
- The group fills its container and adds no padding: the label, 12 px, then rows 12 px apart, or 4 px with Minimal.
- The group draws nothing but the label and the rows: no fill, border, or padding.
- Each row keeps its own height: 42 px for a Default List Item with an avatar, 68 px Boxed.
- Like the guide’s history screen, stack one group per month, newest first.

**Key rules**
- **REQUIRED** `data`: To let people reorder the rows, give the group all four of data, renderItem, keyExtractor and onDragEnd: leave one out and only the label shows.
- `children`: Pass the rows as children. The package takes label, with none by default.
- `children`: Pass rows as elements, such as List Items: only elements survive, and strings vanish.
- `label`: Without a label the rows start at the top.
- `List Item Style`: List Item Style changes every row: Default rows sit 12 px apart with no fill, Boxed puts each row on a white card, and Minimal packs them 4 px apart with lighter titles.
- `List Item Style`: Set the style on the group: every row takes it from the group (the guide’s Do shows Boxed).
- Avoid: `List Item Style`: Do not change the style on one row: a row’s own modes win, so with Boxed on the group that row loses its card.
- `Title Level`: Title Level makes the label bigger and bolder.

**Example:** Payments, a month at a time, the guide’s In context: a history screen stacks one group per month, newest first; each label names the month, and each row opens that payment (onPress). Each row’s amount is a MoneyValue in trailing; the rows carry no modes, so they take the group’s.

```tsx
<VStack>
  <ListGroup label="March 2025">
    <ListItem layout="Horizontal" title="Netflix" supportText="12 Mar" trailing={<MoneyValue value="499" currency="₹" />} onPress={() => {}} />
    <ListItem layout="Horizontal" title="Swiggy" supportText="10 Mar" trailing={<MoneyValue value="320" currency="₹" />} onPress={() => {}} />
    <ListItem layout="Horizontal" title="Adani Electricity" supportText="8 Mar" trailing={<MoneyValue value="1,840" currency="₹" />} onPress={() => {}} />
  </ListGroup>
  <ListGroup label="February 2025">
    <ListItem layout="Horizontal" title="Jio Fiber" supportText="28 Feb" trailing={<MoneyValue value="999" currency="₹" />} onPress={() => {}} />
    <ListItem layout="Horizontal" title="Zomato" supportText="14 Feb" trailing={<MoneyValue value="650" currency="₹" />} onPress={() => {}} />
  </ListGroup>
</VStack>
```

**Props:** `label`, `modes`, `style`, `accessibilityLabel`, `accessibilityHint`, `disableTruncation`, `listGroupSlot`, `children`, `data`, `keyExtractor`, `renderItem`, `onDragEnd`, `onDragUpdate`. (* required)

**Modes it reads:** Color Mode, List Item Style, Title Level.

**Gaps (report, do not work around)**
- Figma shows a “March 2025” title; the package (and Storybook’s Default) has no label until you pass one.
- Code Connect maps Figma’s List Group, but not its Title to label.
- The listGroup/border/color token exists, but the code hard-codes a transparent border.
- Static mode passes the group’s modes to its rows; reorder mode doesn’t (Component Bug #420).
- Reorder mode needs all four of data, keyExtractor, renderItem and onDragEnd; leave one out and the group silently renders only the label (Component Bug #420).

Full entry: `components/listgroup.md`. Links: `components/listgroup.links.md`.
