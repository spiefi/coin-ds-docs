# CardProviderInfo (brief)

> Coin agent pack 0.1.78+27 · documented · full entry: `components/cardproviderinfo.md` (sources, all facts, flags)

Use a Card Provider Info to introduce who provides a product, with their logo and a few short facts in two columns.

**Use when**
- Introduce who provides a product: their logo and a few short facts in two columns.
- Who provides it, and why to trust them.
- A seller or vault on a product page: a provider header and two to six facts, as the card’s handwritten Storybook docs (upstream, not the published page) say in the evidence’s record.

**Avoid when**
- Avoid: A person: the card’s handwritten Storybook docs, as the evidence records them, use Profile Card. Use instead: ProfileCard.
- Avoid: A bank account: the card’s handwritten Storybook docs, as the evidence records them, say the card is not for one.

**Placement**
- On a product page, for its seller or vault, as the card’s handwritten Storybook docs say in the evidence’s record.
- The screen supplies the provider’s logo, name and facts.
- A screen action such as Buy is the screen’s own, not the card’s: on the guide’s Buy Gold screen the Buy Button sits below the card.

**Key rules**
- `children`: The facts go in children as StatItem components: a small label over a large value.
- `children`: The card puts the provider’s logo and name on top, then lays its children out two to a row.
- Avoid: `children`: Don’t put a ProductLabel in children: the card builds its header from label and imageSource, and a child ProductLabel lands in the grid.
- `imageSource`: Pass the provider’s logo in imageSource: without it the header shows the name alone.
- `AppearanceBrand`: AppearanceBrand sets the card’s fill: Primary cream by default, Secondary lilac, and Neutral or Tertiary white with a light border.
- `AppearanceBrand` = `Primary`: AppearanceBrand Primary, the default: a cream card, as in Figma.
- `AppearanceBrand` = `Secondary`: AppearanceBrand Secondary: a lilac card.
- `AppearanceBrand` = `Neutral`: AppearanceBrand Neutral: white with a light border; Tertiary looks the same.

**Example:** The provider on the Buy Gold screen, the guide’s In context: a Title, the Card Provider Info with the provider’s name and logo, and the screen’s own Buy Button below it. The URI stands for the provider’s logo, and onPress for the screen starting the purchase. The guide’s card has four facts as StatItem children; StatItem has no entry in this pack, so they are left out and the card shows its header alone: report that the facts need StatItem.

```tsx
<VStack>
  <Title title="Buy gold" subtitle="24K, stored in an insured vault" />
  <CardProviderInfo
    label="Gold"
    imageSource={{ uri: 'https://example.com/jio-gold-logo.png' }}
  />
  <Button label="Buy gold" onPress={() => {}} />
</VStack>
```

**Props:** `label`, `imageSource`, `showAvatar`, `children`, `modes`, `style`, `onPress`, `disabled`, `accessibilityLabel`. (* required)

**Modes it reads:** AppearanceBrand, Avatar Size, Badge Size, Color Mode, context 10, Context2, Context4, Page type, Profile Card Appearance.

**Gaps (report, do not work around)**
- Fact rows are 50 px in code and 44 in Figma.
- Figma and Code Connect put the Product Label in as a child; in code the header comes from label and imageSource, and a child ProductLabel lands in the grid.
- The published Storybook still shows the older build, with a placeholder portrait, and the older generated page.

Full entry: `components/cardproviderinfo.md`. Links: `components/cardproviderinfo.links.md`.
