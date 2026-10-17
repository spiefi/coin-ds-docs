# Badge (brief)

> Sample data. The pack pipeline generates each brief from its entry JSON.

State: flagged. Use a Badge to make a short status, category, or count easy to scan beside the content it describes.

## Use when

- A short status, category, or count describes nearby content. (recommended)

## Avoid when

- A sentence inside the Badge. Use **Nudge** instead. (discouraged)

## Placement

- Place the Badge beside its subject, such as next to a row title in a Card. (recommended)
- Pass the Badge's own modes object to an Icon in leading. (required)

## Configuration

- `type` = `default`: use the solid type beside ordinary content. (recommended)
- `type` = `glass`: only where the image or surface underneath stays part of the composition. (recommended)
- `Emphasis` = `High`: only for the status that needs attention. (recommended)

## Example

```jsx
<Badge
  label="Paid"
  modes={{ 'Color Mode': 'Light', 'Badge Size': 'Medium', 'Semantic Intent': 'System', AppearanceSystem: 'positive', Emphasis: 'High', Context4: 'Badge' }}
/>
```

Full entry, with sources, facts, gaps, and flags: `components/badge.md`.
