# CounterBadge

> Sample data. The pack pipeline generates this file from the entry JSON.

State: undocumented · guide commit none · jfs-components 0.1.78 · category feedback

Counter Badge: a small token-driven badge that displays a value.

## Use when

None.

## Avoid when

None.

## Anatomy

None.

## Allowed children (facts)

None.

## Placement advice

None.

## Configuration

- **recommended** `value`: Pass the value to show as a string. From fact `/facts/props/0`.

## Content

None.

## States

None.

## Accessibility

None.

## Do and don’t

None.

## Examples

### A count

```jsx
<CounterBadge value="3" />
```

## Facts: props

- `value` · type `string` · The value shown inside the badge. · source types
- `modes` · type `Modes` · Counter Badge exposes a single Default mode. · source types

## Facts: modes

None.

## Facts: slots

None.

## Facts: events

None.

## Gaps

None.

## Flags

- `(whole entry)`: Hand-written sample of an export without a guide. The pack pipeline did not produce or check this entry. (human)
