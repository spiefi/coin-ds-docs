# HStack (brief)

> Coin agent pack 0.1.78+23 · flagged · full entry: `components/hstack.md` (sources, all facts, flags)

Use HStack for a row of related content. It owns horizontal rhythm, alignment, and optional wrapping while the host decides how much room the row has.

**Use when**
- A row of related content.
- Related actions and values that belong in one visual row.
- Items that belong to one row and should share a rhythm.
- A value, status and action that describe one decision.

**Avoid when**
- Avoid: Unrelated page sections: use a horizontal stack for related siblings.

**Placement**
- Place the primitive where the relationship happens.
- HStack owns horizontal rhythm, alignment and optional wrapping; the host decides how much room the row has.
- Populate public component slots with HStack instead of recreating child margins.
- Design the host relationship: make the container boundary and content order clear before changing gap or wrap.

**Key rules**
- **REQUIRED** `alignVertical` = `center`: To match Figma's Alignment Left, set alignVertical to center; the default, flex-start, is Figma's Top Left.
- `Slot gap`: Set the row's rhythm with Slot gap, XS through XL; the gap belongs to the HStack owner.
- `Slot gap`: Keep spacing owned by HStack instead of adding child margins.
- `Padding` = `None`: Use Padding None when the host already owns the edge; Default gives the row its component inset.
- Avoid: `Padding`: Do not stack component insets without a reason: nested owners can create an unintended double edge and weaken alignment.
- `wrap` = `true`: Use wrap inside a constrained width: wrapping needs one.
- `wrap`: Let the available container decide when a wrapped row needs a second line.
- Avoid: Do not let the row's children spill out of the owner: a row without a width constraint can overflow and lose its relationship to the parent.

**Example:** A value, its status and the action for one decision, centered on the cross axis.

```tsx
<HStack alignVertical="center" modes={{ 'Color Mode': 'Light' }}>
  <Text text="₹2,499" modes={{ 'Color Mode': 'Light' }} />
  <Badge label="Due today" modes={{ 'Color Mode': 'Light' }} />
  <Button label="Pay" onPress={() => {}} modes={{ 'Color Mode': 'Light' }} />
</HStack>
```

**Props:** `children`, `alignVertical` (center | flex-start | flex-end | stretch | baseline), `justifyHorizontal` (center | flex-start | flex-end | space-between | space-around | space-evenly), `wrap`, `reverse`, `as`, `modes`. (* required)

**Modes it reads:** Background, Color Mode, Context, Padding, Page type, Slot gap, Stack Context.

**Gaps (report, do not work around)**
- HStack has no equalHeight control.

Full entry: `components/hstack.md`. Links: `components/hstack.links.md`.
