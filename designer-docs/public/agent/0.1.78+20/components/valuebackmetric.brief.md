# ValueBackMetric (brief)

> Coin agent pack 0.1.78+20 · flagged · full entry: `components/valuebackmetric.md` (sources, all facts, flags)

Use a Value Back Metric to show a rewards balance, such as JioPoints or cashback, with how to earn more and one next step.

**Use when**
- Use a Value Back Metric to show a rewards balance, such as JioPoints or cashback, with how to earn more and one next step.
- Rewards programmes: JioPoints and cashback are earn-and-redeem programmes.

**Avoid when**
- Avoid: An account balance, such as a savings balance: a savings balance is not a rewards programme.

**Placement**
- Place one programme per card, side by side, with a distinct verb on each.
- The card has no padding and is at least 82 px tall.
- The card is no wider than its column: in a narrow column its text wraps instead of overflowing.

**Key rules**
- Full: the balance, how to earn, and the next step.
- Add the value, caption and call to action as the card needs them; each disappears when left out. The header shows either way.
- `linkLabel`: Leave out the call to action (linkLabel) when the card is informational and the next step lives elsewhere on the screen.
- `caption`: Leave out the caption when the amount speaks for itself.
- `AppearanceBrand`: AppearanceBrand (the icon colour) retints only the header icon; the amount and Earn keep their colours.
- `icon`: The default icon is ic_rupee_coin, because the JioPoints mark is not in the icon set.
- `icon`: icon takes an icon name from the registry, drawn in the icon colour, or a node such as an Icon or Image, which gets the card's modes.
- `title`: title defaults to JioPoints: set it to the programme's name, or the card reads JioPoints.

**Example:** Rewards on the home screen, the guide's In context: one programme per card, side by side, with a distinct verb on each (Earn, View); the screen opens the programme when a call to action is pressed (onLinkPress).

```tsx
<Card>
  <VStack>
    <Text>Your rewards</Text>
    <HStack justifyHorizontal="space-around" wrap>
      <ValueBackMetric
        title="JioPoints"
        value="1,240"
        caption="Earn 10 points with UPI"
        linkLabel="Earn"
        onLinkPress={() => {}}
      />
      <ValueBackMetric
        title="Cashback"
        value="₹120"
        caption="Credited monthly"
        linkLabel="View"
        onLinkPress={() => {}}
      />
    </HStack>
  </VStack>
</Card>
```

**Props:** `icon`, `title`, `value`, `caption`, `linkLabel`, `link`, `onLinkPress`, `onPress`, `disabled`, `modes`, `style`, `titleStyle`, `valueStyle`, `captionStyle`, `accessibilityLabel`. (* required)

**Modes it reads:** AppearanceBrand, AppearanceSystem, Badge Size, Color Mode, Context, context 10, Context4, Emphasis, Icon Size, Page type, Profile Card Appearance, Semantic Intent, Text Appearance, Text Sizes, Weight.

Full entry: `components/valuebackmetric.md`. Links: `components/valuebackmetric.links.md`.
