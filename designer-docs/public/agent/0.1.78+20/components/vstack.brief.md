# VStack (brief)

> Coin agent pack 0.1.78+20 · flagged · full entry: `components/vstack.md` (sources, all facts, flags)

Use VStack for page flow, grouped details, and ordered content. Its children follow token-driven spacing and padding while the host supplies the available height.

**Use when**
- Page flow, grouped details and ordered content.
- One coherent vertical group, from heading through supporting detail and next step.
- Sequence, grouping and supporting detail should be easy to scan in a column.

**Avoid when**
- Avoid: Separating unrelated sections with a giant gap: spacing cannot repair a missing grouping boundary or unclear content hierarchy.
- Avoid: A responsive grid: a constrained height can let wrapped children flow into columns, but that does not turn VStack into a responsive grid.

**Placement**
- Place the primitive where the relationship happens.
- Children follow token-driven spacing and padding; the host supplies the available height.
- Place related content in one slot so spacing stays contiguous as items change.
- Design the host relationship: make the container boundary and content order clear before changing gap or wrap.

**Key rules**
- `Slot gap`: Set Slot gap to the token rhythm that matches the surrounding hierarchy; do not tune each child independently.
- `Padding` = `None`: Choose Padding None when a containing pattern already supplies the page inset; Default and None are owner modes.
- Avoid: `Padding`: Do not recreate the Padding inset with local wrappers.
- `Padding`: Set Default or None padding once; avoid stacked insets from nested owners.
- `wrap` = `true`: Use wrap only when the host has a real height boundary and columns are meaningful.
- Avoid: `wrap`: Do not expect width to make columns: VStack wraps into columns only when its height is constrained.
- `reverse` = `true`: Use reverse when the content order genuinely needs it.
- `alignHorizontal`: alignHorizontal defaults to stretch (Figma's Slot fill-width); pass flex-start for Top Left or center for Top.

**Example:** One page flow: a heading, supporting copy and the next step in sequence.

```tsx
<VStack modes={{ 'Color Mode': 'Light' }}>
  <Title title="Payment summary" subtitle="Review before confirming" modes={{ 'Color Mode': 'Light' }} />
  <Text text="Your payment is due today." modes={{ 'Color Mode': 'Light' }} />
  <Button label="Continue" onPress={() => {}} modes={{ 'Color Mode': 'Light' }} />
</VStack>
```

**Props:** `children`, `alignHorizontal` (center | flex-start | flex-end | stretch | baseline), `justifyVertical` (center | flex-start | flex-end | space-between | space-around | space-evenly), `wrap`, `reverse`, `as`, `modes`. (* required)

**Modes it reads:** Background, Color Mode, Context, Padding, Page type, Slot gap, Stack Context.

**Gaps (report, do not work around)**
- The Figma VStack exposes Slot only, with no Alignment property, so code's cross-axis alignment has no Figma counterpart.

Full entry: `components/vstack.md`. Links: `components/vstack.links.md`.
