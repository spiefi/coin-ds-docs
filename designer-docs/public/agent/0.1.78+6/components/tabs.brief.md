# Tabs (brief)

> Coin agent pack 0.1.78+6 · documented · full entry: `components/tabs.md` (sources, all facts, flags)

Use Tabs to switch between a few peer views of the same content, such as an account’s overview, activity, and details.

**Use when**
- Switch between a few peer views of the same content, such as an account’s overview, activity and details.

**Avoid when**
- Avoid: The choices do something, such as “Pay” and “Cancel”: use Buttons, not tabs. Use instead: Button.
- Avoid: A tab needs a disabled or loading state: Tabs has neither.

**Placement**
- Show the selected tab’s view below the row; the screen keeps the selected tab.
- When another tab is pressed, the screen swaps the panel; the tabs only report the press.
- Tabs stretches to the width of its container; each tab is as wide as its label, with 16 px between tabs.

**Key rules**
- **REQUIRED** `children`: Pass the tabs as TabItem children: children is required, and each child should be a TabItem.
- `children`: Put each TabItem directly inside Tabs: Tabs passes its modes to direct TabItem children, and does not recognise wrappers or fragments around them.
- `modes`: Set modes on Tabs: they reach its direct TabItem children (not through wrappers or Fragments), and a TabItem's own modes win.
- `scrollable` = `true`: Turn on scrollable when the labels don’t fit, so the row scrolls sideways.
- Avoid: `scrollable` = `false`: Do not squeeze a long set, such as six filters, into a row that doesn’t scroll: every label shrinks and ends in an ellipsis, even “All”.
- Keep track of the selected tab on the screen: mark that TabItem active, and move the mark when another tab is pressed.
- Select exactly one tab: one underline says which view is showing.
- Avoid: Do not mark two tabs active: only the first is underlined, which may not be the view that’s showing.

**Example:** Account views in one row, with the screen marking the selected tab active.

```tsx
<Tabs modes={{ 'Color Mode': 'Light' }}>
  <TabItem label="Overview" active onPress={() => {}} />
  <TabItem label="Activity" onPress={() => {}} />
  <TabItem label="Details" onPress={() => {}} />
</Tabs>
```

**Props:** `children`*, `modes`, `scrollable`, `style`, `accessibilityLabel`, `testID`. (* required)

**Gaps (report, do not work around)**
- The active label stays black in Dark mode (#197, To do); the guide shows Light only.
- A scrollable row has no scrollbar or edge hint.
- Tabs has no disabled or loading prop.
- No hover style: pressing dims a tab to 70% opacity.

Full entry: `components/tabs.md`. Links: `components/tabs.links.md`.
