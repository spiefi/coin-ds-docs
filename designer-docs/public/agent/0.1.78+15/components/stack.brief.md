# Stack (brief)

> Coin agent pack 0.1.78+15 · flagged · full entry: `components/stack.md` (sources, all facts, flags)

Use Stack when a public component slot needs one token-driven gap and an intentional vertical or horizontal direction.

**Use when**
- A public component's slot needs one token-driven gap and an intentional vertical or horizontal direction.
- A clear group, such as actions, metadata or supporting copy.

**Avoid when**
- Avoid: A catch-all page canvas for unrelated sections: Stack has no wrap, padding or overlap.
- Avoid: The layout needs overlap, z-order, wrapping, padding or automatic viewport switching: use the public component that owns the slot.
- Avoid: `layoutDirection`: Expecting the direction to follow the viewport: the viewport does not switch layoutDirection; choose a different public composition when the content role changes.

**Placement**
- Use Stack in the slot owned by a public component, where direction and gap carry product meaning.
- Let the owning public component, such as ActionFooter, give the Stack its product meaning.
- Designers consume public components and patterns that own the slot; Stack's Figma source is a Subcomponents anatomy reference, not something to place on its own.
- Stack keeps its chosen direction at every width; responsive intent belongs to the owning public composition.

**Key rules**
- `layoutDirection` = `vertical`: Use layoutDirection vertical (the default) for a column of actions or supporting content inside a public slot.
- `layoutDirection` = `horizontal`: Use layoutDirection horizontal when sibling actions or content belong on one line; set the direction explicitly.
- `layoutDirection`: Choose the direction from the content role; it stays fixed through viewport changes.
- `Slot gap`: Set the gap with the Slot gap mode; Stack has no padding, wrap or reverse control.
- `equalHeight` = `true`: Use equalHeight only for a horizontal row, the direction it applies to.
- `fillWidth` = `true`: Use fillWidth for a vertical column when its children benefit from a shared edge.
- Avoid: `fillWidth`: Do not give children a fixed width when a fillWidth column should fill: fixed child dimensions still win.

**Example:** A vertical Stack in ActionFooter's slot: the action under its supporting copy.

```tsx
<ActionFooter modes={{ 'Color Mode': 'Light' }}>
  <Stack layoutDirection="vertical" fillWidth modes={{ 'Color Mode': 'Light', 'Slot gap': 'S' }}>
    <Text text="You can change your plan at any time." modes={{ 'Color Mode': 'Light' }} />
    <Button label="Continue" onPress={() => {}} modes={{ 'Color Mode': 'Light' }} />
  </Stack>
</ActionFooter>
```

**Props:** `children`, `style`, `layoutDirection` (vertical | horizontal), `alignCrossAxis` (center | flex-start | flex-end | stretch | baseline), `justifyMainAxis` (center | flex-start | flex-end | space-between | space-around | space-evenly), `equalHeight`, `fillWidth`, `modes`. (* required)

**Modes it reads:** Context, Slot gap.

**Gaps (report, do not work around)**
- Stack has no wrap, reverse, padding, overlap or automatic viewport direction.

Full entry: `components/stack.md`. Links: `components/stack.links.md`.
