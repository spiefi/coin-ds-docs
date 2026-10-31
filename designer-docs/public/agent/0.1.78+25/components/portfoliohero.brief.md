# PortfolioHero (brief)

> Coin agent pack 0.1.78+25 · flagged · full entry: `components/portfoliohero.md` (sources, all facts, flags)

Use a Portfolio Hero at the top of a holding’s page to show what it is and what it’s worth, with an optional note under the amount.

**Use when**
- Show what a holding is and what it's worth at the top of its page, with an optional note under the amount.
- The product, its value, then one note.

**Avoid when**
- Avoid: A left-aligned total: Biscuit's Storybook page, as the evidence records it, points to Balance instead. Use instead: Balance.
- Avoid: A product explanation: Biscuit's Storybook page, as the evidence records it, points to Product Overview instead. Use instead: ProductOverview.

**Placement**
- Put it at the top of a holding's page.
- On the guide's Gold page the hero comes first, the holding's details follow in a list, and the two actions sit at the bottom.
- The product label sits on top, the amount under it, and children under that; everything is centred.
- The hero has no width of its own: it is as wide as its widest line, usually the amount, plus 8 px on each side.

**Key rules**
- **REQUIRED** `label`: Set label to the product's name: left out, the hero shows “Gold”.
- **REQUIRED** `value`: Set value to the holding's value: left out, the hero shows 12,000.11.
- `imageSource`: imageSource puts the product's logo before its label; without it there is no avatar, not an empty circle.
- `Avatar Size`: Avatar Size sets the logo to 42, 36 or 29 px.
- `Avatar Size` = `L`: Avatar Size L: a 42 px logo.
- `Avatar Size` = `M`: Avatar Size M: a 36 px logo.
- `Avatar Size` = `S`: Avatar Size S: a 29 px logo, the hero's default.
- `children`: children adds what sits under the amount, usually a Badge with the change and a Text with one fact.

**Example:** The top of a holding's page, the guide's In context: the hero opens the Gold page with the product's logo, the holding's value, and under the amount a Badge with the change (its leading ic_card Icon on Context4 Badge, as the Badge entry says) and a Text with one fact; the holding's details follow in a ListGroup of List Items, and the two actions sit below: Buy keeps the defaults and Sell takes Emphasis Medium. The URI stands for the product's logo image, value for the holding's current value (Buy and Sell change it), and each onPress for the screen buying or selling ₹1,000.

```tsx
<VStack>
  <VStack>
    <PortfolioHero
      label="Gold"
      imageSource={{ uri: 'https://example.com/logos/gold.png' }}
      value="12,000.11"
    >
      <Badge
        label="+₹2,722.45 (+22.5%)"
        leading={<Icon iconName="ic_card" modes={{ Context4: 'Badge' }} accessibilityElementsHidden importantForAccessibility="no" />}
      />
      <Text text="Worth 1.23g Gold" />
    </PortfolioHero>
    <ListGroup>
      <ListItem layout="Horizontal" title="Gold in your locker" supportText="1.23 g · 24K, 99.9% pure" navArrow={false} />
      <ListItem layout="Horizontal" title="Average buy price" supportText="₹7,544 a gram" navArrow={false} />
      <ListItem layout="Horizontal" title="Today’s price" supportText="₹9,756 a gram" navArrow={false} />
    </ListGroup>
  </VStack>
  <HStack>
    <Button label="Sell ₹1,000" modes={{ Emphasis: 'Medium' }} onPress={() => {}} />
    <Button label="Buy ₹1,000" onPress={() => {}} />
  </HStack>
</VStack>
```

**Props:** `label`, `imageSource`, `value`, `currency`, `modes`, `children`, `topSlot`, `actionSlot`, `showAction`, `onActionPress`, `actionIconName`, `actionAccessibilityLabel`, `actionActive`, `accessibilityLabel`, `style`. (* required)

**Modes it reads:** Avatar Size, Badge Size, Color Mode, Context, context 10, Context2, Context3, Context4, Page type, Profile Card Appearance, Slot gap, Text Sizes.

**Gaps (report, do not work around)**
- The amount sits on a 44 px line, so the hero is taller than Figma's 159 px (Component Bug #403).
- Figma shows the Jio logo by default; the package shows an avatar only when imageSource is set.

Full entry: `components/portfoliohero.md`. Links: `components/portfoliohero.links.md`.
