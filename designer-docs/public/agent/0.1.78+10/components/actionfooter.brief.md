# ActionFooter (brief)

> Coin agent pack 0.1.78+10 · flagged · full entry: `components/actionfooter.md` (sources, all facts, flags)

Keep the next step close to the decision.

**Use when**
- Keep the next step close to the decision.
- To keep the final decision of a composition, such as confirming a reviewed payment, at the bottom of the host.

**Avoid when**
- Avoid: Confirmation or error feedback: keep it in the surrounding flow rather than inside the persistent footer.

**Placement**
- On the web ActionFooter renders in normal flow; on native it pins the footer.
- The host supplies the width; the title and grouping change the footer's natural height.
- In a constrained host, the action composite changes its own height; ActionFooter stays full width.
- On web the footer renders in normal flow; on native it pins itself to the bottom. Keyboard avoidance remains the consumer's job.

**Key rules**
- `children`: Use a ButtonGroup for a row of actions.
- `children`: Use Stack when the actions need a vertical reading order.
- `children`: For new code, pass a single ButtonGroup or Stack (or Slot) child: ActionFooter does not re-stretch it, only cascades modes and stretches it to full width. Loose Button and IconButton children are the legacy shape: an IconButton keeps its square size and the rest stretch.
- `title`: Leave out the title when the preceding content already names the decision, to keep the surface short.
- `title`: Add a short title and stack the actions when horizontal space or hierarchy calls for it.
- `modes`: Set modes on ActionFooter: they are merged into every slot child.
- Configure disabled, loading or confirmation states on the footer's public child actions, and show feedback elsewhere: ActionFooter does not invent them.
- Avoid: Do not make both actions primary: equal emphasis hides which action advances the decision.

**Example:** A row of two actions in a ButtonGroup: Back supports the prioritized Continue.

```tsx
<ActionFooter modes={{ 'Color Mode': 'Light' }}>
  <ButtonGroup modes={{ 'Color Mode': 'Light' }}>
    <Button label="Back" onPress={() => {}} modes={{ 'Color Mode': 'Light', AppearanceBrand: 'Secondary' }} />
    <Button label="Continue" onPress={() => {}} modes={{ 'Color Mode': 'Light', AppearanceBrand: 'Primary' }} />
  </ButtonGroup>
</ActionFooter>
```

**Props:** `children`, `title`, `modes`, `style`, `accessibilityLabel`, `avoidKeyboard`, `safeAreaBottom`, `bottomPadding`, `pinned`. (* required)

**Modes it reads:** Action Footer Radius, Color Mode, Context, context5, Slot gap.

**Gaps (report, do not work around)**
- ActionFooter does not avoid the keyboard: keyboard avoidance is consumer-owned.
- Figma's sample has 41px bottom spacing, while the package defaults to 24px plus an optional safe-area inset.

Full entry: `components/actionfooter.md`. Links: `components/actionfooter.links.md`.
