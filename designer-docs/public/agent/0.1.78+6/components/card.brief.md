# Card (brief)

> Coin agent pack 0.1.78+6 · undocumented · full entry: `components/card.md` (sources, all facts, flags)

Slots: optional `header`, optional `media` (Default only), and `children` for the content stack. (Package docs; Coin has no designer guide for Card.)

**Example:** A slim card holding a line of content.

```tsx
<Card variant="slim" modes={{ 'Color Mode': 'Light' }}>
  <Text text="September payment" modes={{ 'Color Mode': 'Light' }} />
</Card>
```

**Props:** `variant` (default | slim | Default | Slim), `header`, `media`, `children`, `modes`, `mediaAspectRatio`, `style`, `onPress`, `disabled`, `accessibilityLabel`, `Card.Title`, `Card.SupportText`. (* required)

**Modes it reads:** AppearanceBrand, AppearanceSystem, Card Container, Color Mode, context 8, Gap, Page type, Semantic Intent.

Full entry: `components/card.md`. Links: `components/card.links.md`.
