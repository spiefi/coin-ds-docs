# BottomNav (brief)

> Coin agent pack 0.1.78+20 · flagged · full entry: `components/bottomnav.md` (sources, all facts, flags)

Use a Bottom Nav to move between the top-level sections of an app from any screen.

**Use when**
- Move between the top-level sections of an app from any screen.
- Switch sections of the app.

**Avoid when**
- Avoid: More than five top-level destinations: with a sixth, items shrink to about 55 px and labels crowd each other.

**Placement**
- Always at the bottom.
- Bottom Nav spans its screen and anchors to the bottom edge.
- It anchors itself to the bottom of its nearest positioned container.
- Its height comes from the items and the padding, 78 px in the installed package.

**Key rules**
- Three to five destinations, exactly one Active.
- Every destination gets an equal share of the bar.
- Fewer destinations mean wider tap targets; five is the most that stays comfortable.
- `value`: The screen tells Bottom Nav which destination is Active through its value.
- `value`: Bottom Nav sets each item's BottomNavItem / State mode from value: the item whose value matches is Active, the rest Idle.
- `value`: The app keeps the Active value and swaps the screen above when it changes.
- `onChange`: Bottom Nav only reports which destination was pressed: onChange receives that destination's value.
- A destination can be disabled while it is temporarily unavailable: set disabled on its BottomNav.Item.

**Example:** Switching sections of the app, the guide's In context: a Screen holds the Active section's content and the Bottom Nav, which anchors to its bottom edge. Five destinations, each a short noun with its own icon; Home is Active. The app keeps the Active value and swaps the content above when onChange reports a pressed destination: the literal value and the empty onChange stand for the app's own state.

```tsx
<Screen>
  <VStack>
    <Text text="Home" />
    <Text text="Your balances and recent activity" />
  </VStack>
  <BottomNav value="home" onChange={(value) => {}}>
    <BottomNav.Item value="home" label="Home" iconName="ic_home" />
    <BottomNav.Item value="finances" label="Finances" iconName="ic_rupee" />
    <BottomNav.Item value="pay" label="Pay" iconName="ic_scan_qr_code" />
    <BottomNav.Item value="invest" label="Invest" iconName="ic_rupee_coin" />
    <BottomNav.Item value="explore" label="Explore" iconName="ic_search" />
  </BottomNav>
</Screen>
```

**Props:** `value`, `onChange`, `children`, `modes`, `style`, `accessibilityLabel`, `accessibilityHint`, `BottomNav.Item`. (* required)

**Modes it reads:** Color Mode.

**Gaps (report, do not work around)**
- Figma draws the bar at 77 px; the package renders 78 px, with its 1 px top border inside the bar.

Full entry: `components/bottomnav.md`. Links: `components/bottomnav.links.md`.
