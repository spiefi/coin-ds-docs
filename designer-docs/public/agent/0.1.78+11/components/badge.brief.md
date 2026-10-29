# Badge (brief)

> Coin agent pack 0.1.78+11 · flagged · full entry: `components/badge.md` (sources, all facts, flags)

Use a Badge to make a short status, category, or count easy to scan beside the content it describes.

**Use when**
- Show a short status, category or count beside the content it describes, so people can scan it.

**Avoid when**
- Avoid: The message needs a sentence or an explanation: keep the explanation out of the Badge.

**Placement**
- Place the Badge next to the item it describes.

**Key rules**
- `type` = `default`: Use the solid treatment (type default) beside ordinary content.
- `type` = `glass`: Use type glass where the underlying image or surface stays part of the composition.
- `Badge Size`: Choose Badge Size for the density of the surrounding content.
- `Semantic Intent`: Choose a Semantic Intent and appearance whose meaning agrees with the status.
- `Emphasis`: Give the status that needs attention the strongest Emphasis, rather than equal emphasis on every badge.
- `onPress`: Add onPress only when opening related detail is useful; most badges only inform.
- `leading`: Pass the Badge's own modes object to the Icon in leading, with the Context4 that matches the treatment (solid or glass): Badge renders the leading node as given.
- `label`: Rely on the visible label for an interactive Badge's accessible name, and verify that name: Badge ignores accessibilityLabel.

**Example:** A system status beside the item it describes, in a slim Card row.

```tsx
<Card variant="slim" modes={{ 'Color Mode': 'Light' }}>
  <HStack alignVertical="center" justifyHorizontal="space-between" modes={{ 'Color Mode': 'Light' }}>
    <Text>September payment</Text>
    <Badge label="Paid" modes={{ 'Color Mode': 'Light', 'Semantic Intent': 'System', AppearanceSystem: 'positive' }} />
  </HStack>
</Card>
```

**Props:** `label`, `type` (default | glass), `modes`, `onPress`, `accessibilityLabel`, `style`, `labelStyle`, `leading`, `glassOverlayColor`, `glassIntensity`, `loading`, `disableTruncation`. (* required)

**Modes it reads:** AppearanceBrand, AppearanceSystem, Badge Size, Color Mode, Emphasis, Semantic Intent, Context4.

**Gaps (report, do not work around)**
- Badge ignores accessibilityLabel on its rendered wrapper.
- Badge has no selected or disabled variant.

Full entry: `components/badge.md`. Links: `components/badge.links.md`.
