# ListGroup (brief)

> Coin agent pack 0.1.78+3 · undocumented · full entry: `components/listgroup.md` (sources, all facts, flags)

ListGroup component that mirrors the Figma "List Group" component. (Package docs; Coin has no designer guide for ListGroup.)

**Example:** A labelled group of list rows.

```tsx
<ListGroup label="Linked accounts" modes={{ 'Color Mode': 'Light' }}>
  <ListItem layout="Horizontal" title="Savings Account" supportText="HDFC Bank" modes={{ 'Color Mode': 'Light' }} />
</ListGroup>
```

**Props:** `label`, `modes`, `style`, `accessibilityLabel`, `accessibilityHint`, `disableTruncation`, `listGroupSlot`, `children`, `data`, `keyExtractor`, `renderItem`, `onDragEnd`, `onDragUpdate`. (* required)

**Modes it reads:** Color Mode, List Item Style, Title Level.

Full entry: `components/listgroup.md`. Links: `components/listgroup.links.md`.
