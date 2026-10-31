# ComparisonBar (brief)

> Coin agent pack 0.1.78+22 · documented · full entry: `components/comparisonbar.md` (sources, all facts, flags)

Use a Comparison Bar to collect the items people pick to compare, as pictures in slots, and let them start the comparison.

**Use when**
- Collect the items people pick to compare, as pictures in slots, and let them start the comparison.
- Show what's picked; compare when there's something to show.
- People pick items from a list to compare, such as gold coins.

**Avoid when**
- Avoid: Comparing values side by side: the Comparison Bar is not a value chart. It is a card of image slots and a Compare button, for collecting the items to compare; value comparisons are other components, such as Allocation Comparison Chart and Plan Comparison Card.

**Placement**
- The bar hugs its content: 10 and 12 px of padding, 45 × 44 px slots 12 px apart, then the button.
- Four slots and the default button make the bar 369 × 66 px.
- `items`: Each slot adds 57 px, and the bar never wraps or scrolls.
- As people add items from a list, such as gold coins, the bar fills from the left.

**Key rules**
- **REQUIRED** `items`: Pass items: one row per slot, in order. items is required.
- `items`: Pass one item per slot: an item with an imageSource is filled, and one without is empty.
- `items`: Fewer slots make a shorter bar.
- `items`: Use four slots or fewer: the bar fits a phone screen.
- Avoid: `items`: Do not use five or more slots: the bar doesn't wrap or scroll, so it's wider than a 390 px phone.
- `items`: The bar keeps no list of its own, so your screen changes items.
- `onItemRemove`: Tapping a picture in the bar takes that item out (onItemRemove).
- `onCompare`: Compare turns on with the first item; your screen opens the comparison (onCompare).

**Example:** Comparing gold coins, the guide's In context: people add coins from the Gold coins list, and the bar fills from the left. Here the 1 g coin is added, so its picture fills the first slot (named for screen readers) and Compare is on. Tapping its picture takes the coin out (onItemRemove), an empty slot asks the screen to add the next coin (onItemPress), and the screen opens the comparison (onCompare). The rows leave out the guide's leading pictures, and their Buttons carry no modes.

```tsx
<VStack alignHorizontal="stretch">
  <ListGroup label="Gold coins">
    <ListItem
      layout="Horizontal"
      navArrow={false}
      title="1 g gold coin"
      supportText="₹7,850 · 24K"
      trailing={<Button label="Added" onPress={() => {}} />}
    />
    <ListItem
      layout="Horizontal"
      navArrow={false}
      title="2 g gold coin"
      supportText="₹15,640 · 24K"
      trailing={<Button label="Add" onPress={() => {}} />}
    />
    <ListItem
      layout="Horizontal"
      navArrow={false}
      title="5 g gold coin"
      supportText="₹38,900 · 24K"
      trailing={<Button label="Add" onPress={() => {}} />}
    />
    <ListItem
      layout="Horizontal"
      navArrow={false}
      title="10 g gold coin"
      supportText="₹77,500 · 24K"
      trailing={<Button label="Add" onPress={() => {}} />}
    />
  </ListGroup>
  <ComparisonBar
    items={[
      { id: '1g', imageSource: { uri: 'https://example.com/gold-coin.png' }, accessibilityLabel: 'Remove 1 g gold coin' },
      { id: 'empty-0' },
      { id: 'empty-1' },
      { id: 'empty-2' },
    ]}
    onItemPress={() => {}}
    onItemRemove={() => {}}
    onCompare={() => {}}
  />
</VStack>
```

**Props:** `items`*, `onItemPress`, `onItemRemove`, `onCompare`, `compareLabel`, `compareDisabled`, `disableCompareWhenEmpty`, `modes`, `style`, `ComparisonBarItem.id`, `ComparisonBarItem.imageSource`, `ComparisonBarItem.accessibilityLabel`. (* required)

**Modes it reads:** AppearanceBrand, AppearanceSystem, Button / Size, Button / State, Color Mode, Context, context 10, Context2, Emphasis, Icon Capsule Size, Page type, Profile Card Appearance, Radius, Semantic Intent.

**Gaps (report, do not work around)**
- Brand modes on the bar turn the empty slots' + white (Component Bug #421).
- Figma's Compare button is 96 × 32 and pale purple (the values of Button Size S, Secondary, Disabled); the package draws a size M gold Button, dimmed by opacity when off (Component Bug #421).
- The empty slot's + is 18 px (XS) where Figma's is 29 px with an 18 px glyph (S), though the package's own comment says S (Component Bug #421).
- A filled slot's picture is 33 × 28 where Figma's is 33 × 20, and the bar's right padding is 12 px where Figma's is 8 (Component Bug #421).
- The slots give no press feedback (Component Bug #421).

Full entry: `components/comparisonbar.md`. Links: `components/comparisonbar.links.md`.
