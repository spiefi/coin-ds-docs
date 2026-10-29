# Screen (brief)

> Coin agent pack 0.1.78+13 · undocumented · full entry: `components/screen.md` (sources, all facts, flags)

Screen component that acts as the outer most container providing the background color. (Package docs; Coin has no designer guide for Screen.)

**Example:** A screen's outermost container holding the page flow.

```tsx
<Screen modes={{ 'Color Mode': 'Light' }}>
  <VStack modes={{ 'Color Mode': 'Light' }}>
    <Title title="Personal loan" modes={{ 'Color Mode': 'Light' }} />
  </VStack>
</Screen>
```

**Props:** `children`, `modes`, `style`. (* required)

**Modes it reads:** Color Mode, Page type.

Full entry: `components/screen.md`. Links: `components/screen.links.md`.
