# Breadcrumbs (brief)

> Coin agent pack 0.1.78+11 · flagged · full entry: `components/breadcrumbs.md` (sources, all facts, flags)

Use Breadcrumbs when people need a compact path back through a hierarchy. The trail moves from the broadest ancestor to the current page.

**Use when**
- People need a compact path back through a hierarchy.
- The route has meaningful ancestors and the current page needs orientation.
- Orient people above a report page when the route has meaningful ancestors.

**Avoid when**
- Avoid: In place of the page title or primary navigation: Breadcrumbs shows the hierarchy beside them, without replacing them.
- Avoid: To duplicate primary navigation.

**Placement**
- Place Breadcrumbs above page content, when the route supports backtracking.
- Keep it secondary: it supports orientation and should not compete with primary navigation or the page heading.
- The trail's width comes from its parent.
- Keep a long route in its constrained parent so people can still parse each level.

**Key rules**
- **REQUIRED** `items`: items is the trail in route order, from the broadest ancestor to the current page; each item has a label.
- `BreadcrumbItem.current`: The current page is the item with current: true; when no item has it, the last item is current. The current crumb is not pressable unless it has its own onPress.
- `onItemPress`: Give onItemPress so ancestors can take people back: it is called with the pressed item and its index, and not for the current crumb unless that crumb has its own onPress.
- `items`: Configure the content hierarchy (the items) and let the component render the path.
- Avoid: Do not draw chevrons, link styling or a current-page treatment yourself: the component supplies them.
- A constrained parent lets a long trail wrap; the component does not auto-collapse the route.
- Avoid: Do not present a responsive collapse or an item count as a designer-selected control: the trail reflects the hierarchy and the available width.
- Avoid: `items`: Do not reverse the route to match a visual shortcut: the reading order stops matching the hierarchy and the current location becomes ambiguous.

**Example:** A report page, the guide's In context: the trail sits above the page content, from the broadest ancestor to the current page (the guide's default trail: Cloud, ITR, 2024-25, Original); ancestors take people back through onItemPress.

```tsx
<Breadcrumbs
  items={[
    { label: 'Cloud' },
    { label: 'ITR' },
    { label: '2024-25' },
    { label: 'Original', current: true },
  ]}
  onItemPress={() => {}}
/>
```

**Props:** `items`*, `onItemPress`, `modes`, `style`, `testID`, `accessibilityLabel`, `BreadcrumbItem.key`, `BreadcrumbItem.label`*, `BreadcrumbItem.onPress`, `BreadcrumbItem.current`, `BreadcrumbItem.accessibilityLabel`. (* required)

**Modes it reads:** AppearanceBrand, AppearanceSystem, Background, Badge Size, Color Mode, Context, context 10, Context4, Emphasis, Icon Size, Padding, Page type, Profile Card Appearance, Semantic Intent, Slot gap, Stack Context, Text Appearance, Text Sizes, Weight.

**Gaps (report, do not work around)**
- In the inspected Storybook iframe the trail's root is a div with an accessible label but no navigation role; the evidence asks for a source accessibility follow-up.
- Figma's Breadcrumbs exposes no properties in the inspected Figma source.

Full entry: `components/breadcrumbs.md`. Links: `components/breadcrumbs.links.md`.
