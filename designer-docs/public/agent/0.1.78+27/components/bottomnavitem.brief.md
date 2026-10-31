# BottomNavItem (brief)

> Coin agent pack 0.1.78+27 · flagged · full entry: `components/bottomnavitem.md` (sources, all facts, flags)

Show one top-level destination in the bottom navigation bar with an icon and a short label.

**Use when**
- Show one top-level destination in the bottom navigation bar, with an icon and a short label.
- Move between top-level destinations: each destination of a BottomNav is one item.

**Placement**
- Put the items in a BottomNav, which holds them at the bottom of an app screen.
- BottomNav gives every item the same share of the bar, so fewer items mean wider tap targets.
- Keep three to five destinations in the bar, so every tap target stays wide.

**Key rules**
- One destination per item: pair a familiar registry icon (iconName) with the destination’s name (label).
- `BottomNavItem / State`: In code, the icon and label are properties (iconName and label), and State is the BottomNavItem / State mode, which BottomNav sets from its value.
- `BottomNavItem / State`: Let BottomNav mark the Active item: give the bar the current destination's value instead of setting State on an item.
- `BottomNavItem / State` = `Active`: Active turns the icon gold and darkens the label.
- `BottomNavItem / State` = `Active`: Only the current destination should be Active.
- `label`: Left out, label reads “Home”, its default: give every item its own destination's name.
- `iconName`: Left out, iconName shows ic_home, its default: give every item its own destination's icon.
- `disabled` = `true`: disabled is a property: the item fades and stops responding, but keeps its place in the bar.

**Example:** Moving between top-level destinations, the guide's In context: a Screen holds the current destination's content (Home's Title and a slim Card, the guide's literals) and a BottomNav at its bottom with five items, each a BottomNav.Item with its value, label and icon. The bar's value “home” makes Home Active and the other four Idle; the literal value and the empty onChange stand for the app's own state of the current destination.

```tsx
<Screen>
  <VStack>
    <Title title="Home" />
    <Card variant="slim">
      <Card.Title>Your accounts at a glance</Card.Title>
      <Card.SupportText>Balances, recent payments, and reminders.</Card.SupportText>
    </Card>
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

**Props:** `iconName`, `label`, `modes`, `onPress`, `disabled`, `style`, `labelStyle`, `iconColor`, `iconSize`, `accessibilityLabel`, `accessibilityHint`, `accessibilityState`, `webAccessibilityProps`. (* required)

**Modes it reads:** BottomNavItem / State, Color Mode.

Full entry: `components/bottomnavitem.md`. Links: `components/bottomnavitem.links.md`.
