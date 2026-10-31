# ListItem (brief)

> Coin agent pack 0.1.78+20 · undocumented · full entry: `components/listitem.md` (sources, all facts, flags)

ListItem component that mirrors the Figma "List Item" component. (Package docs; Coin has no designer guide for ListItem.)

**Example:** A horizontal row that navigates when pressed.

```tsx
<ListItem layout="Horizontal" title="Savings Account" supportText="HDFC Bank" navArrow onPress={() => {}} modes={{ 'Color Mode': 'Light' }} />
```

**Props:** `layout` (Vertical | Horizontal), `title`, `titleHighlightRanges`, `supportText`, `showSupportText`, `leading`, `supportSlot`, `trailing`, `endSlot`, `navArrow`, `isDraggable`, `isDragging`, `titleIcon`, `dragHandleProps`, `onDragHandleGrant`, `modes`, `onPress`, `style`, `contentStyle`, `accessibilityLabel`, `accessibilityHint`, `accessibilityState`, `webAccessibilityProps`, `disableTruncation`. (* required)

**Modes it reads:** AppearanceBrand, AppearanceSystem, Badge Size, Color Mode, context 10, Context2, Context4, context5, Draggable List, Emphasis, Icon Size, List Item Style, ListItem State, NavArrow Direction, Page type, Profile Card Appearance, Selectable, Semantic Intent.

Full entry: `components/listitem.md`. Links: `components/listitem.links.md`.
