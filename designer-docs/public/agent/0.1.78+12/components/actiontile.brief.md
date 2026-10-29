# ActionTile (brief)

> Coin agent pack 0.1.78+12 · flagged · full entry: `components/actiontile.md` (sources, all facts, flags)

A compact shortcut to one destination.

**Use when**
- A compact shortcut to one destination.
- Offer a small set of quick actions: a group of tiles, each a shortcut to one destination.

**Avoid when**
- Avoid: Explaining a destination in a sentence: explanatory sentences turn a shortcut into a card. A tile holds one short label.

**Placement**
- Group tiles in an HStack: the HStack owns the responsive group while each fixed tile keeps one destination.
- Let the surrounding layout wrap or scroll around the tiles.
- In a wide host, the tile keeps its intrinsic footprint inside the available space.
- In a narrow host, the host adapts around the tile; the tile itself stays 168 × 90.

**Key rules**
- Keep the label and the icon focused on the same destination.
- `icon`: Use an icon that matches the destination, such as a card icon for a card destination.
- `icon`: Change both the label and its icon together.
- Avoid: `icon`: Do not pair a label with another destination's icon, such as a cards icon on Savings: it makes the shortcut ambiguous.
- Keep the destination distinct from neighboring shortcuts.
- `icon`: icon expects an IconCapsule or a compatible component; when it is a React element, ActionTile passes its modes to it.
- `icon`: The icon capsule inherits the modes supplied to ActionTile.
- `onPress`: Supplying onPress makes the tile actionable.

**Example:** Quick actions, the guide's In context: an HStack wraps three actionable tiles, each with its own label and matching IconCapsule icon, each opening one destination.

```tsx
<HStack wrap>
  <ActionTile
    label="Cards"
    icon={<IconCapsule iconName="ic_cards" />}
    onPress={() => {}}
  />
  <ActionTile
    label="Savings"
    icon={<IconCapsule iconName="ic_savings" />}
    onPress={() => {}}
  />
  <ActionTile
    label="Payments"
    icon={<IconCapsule iconName="ic_payments" />}
    onPress={() => {}}
  />
</HStack>
```

**Props:** `label`, `icon`, `modes`, `style`, `onPress`. (* required)

**Modes it reads:** AppearanceBrand, AppearanceSystem, Color Mode, Context, Emphasis, Icon Capsule Size, Page type, Semantic Intent.

**Gaps (report, do not work around)**
- ActionTile has no disabled or loading state: its public API offers only an optional action (onPress).
- Figma's live Action Tile icon capsule resolves AppearanceBrand Neutral with Emphasis High, while the supplied Storybook reference selects Primary appearance with Medium emphasis; the guide follows the Storybook reference.

Full entry: `components/actiontile.md`. Links: `components/actiontile.links.md`.
