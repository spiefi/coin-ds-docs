# Card (brief)

> Coin agent pack 0.1.78+27 · flagged · full entry: `components/card.md` (sources, all facts, flags)

Use a Card to group one product, offer, or article on a panel, with an optional logo, a picture, and a few lines of text.

**Use when**
- Group one product, offer, or article on a panel, with an optional logo, a picture, and a few lines of text.

**Placement**
- The card fills a column's width but hugs its content in a row, so give it a width there; Figma and Storybook draw it at 200 px.
- Height follows the content.
- Two offers can share a row, each card taking half of it.

**Key rules**
- **REQUIRED** `media`: To show a picture, use the default variant: slim ignores media.
- `variant`: variant default shows a picture when you pass media; slim never does.
- `variant` = `default`: Default (the default variant): a logo, a picture, and the text, for an offer that leads with an image.
- `variant` = `slim`: Slim: the logo and the text, without a picture.
- Avoid: `variant` = `slim`: Do not put a picture on a slim card: slim drops the picture without a warning.
- Pass header for a logo or a label, media for a picture, and children for the text, and leave out what you don't need.
- Each slot shows only when you pass it.
- Figma's header and media switches are the header and media props in code: pass them or leave them out; false also hides a slot.

**Example:** Offers on the Home screen, the guide's In context: two offers share a row, each card taking half of it, under the section's Title. As in the guide's own In context example, the cards are Slim, each onPress opens its offer, and an accessibilityLabel names the whole card; the logo in the header is decorative.

```tsx
<VStack>
  <Title title="Offers for you" subtitle="Picked for your savings" />
  <HStack alignVertical="stretch">
    <Card
      variant="slim"
      header={
        <HStack alignVertical="center">
          <Image imageSource={{ uri: 'https://example.com/jiofinance-logo.png' }} width={18} height={18} accessibilityElementsHidden importantForAccessibility="no" />
          <Text text="JioFinance" />
        </HStack>
      }
      onPress={() => {}}
      accessibilityLabel="24K digital gold, from ₹10"
      style={{ flex: 1 }}
    >
      <Card.SupportText>Digital gold</Card.SupportText>
      <Card.Title>24K digital gold</Card.Title>
      <Card.SupportText>From ₹10</Card.SupportText>
    </Card>
    <Card
      variant="slim"
      header={
        <HStack alignVertical="center">
          <Image imageSource={{ uri: 'https://example.com/jiofinance-logo.png' }} width={18} height={18} accessibilityElementsHidden importantForAccessibility="no" />
          <Text text="JioFinance" />
        </HStack>
      }
      onPress={() => {}}
      accessibilityLabel="Fixed deposit, earn 7.25% a year"
      style={{ flex: 1 }}
    >
      <Card.SupportText>Fixed deposit</Card.SupportText>
      <Card.Title>Earn 7.25% a year</Card.Title>
      <Card.SupportText>From ₹1,000</Card.SupportText>
    </Card>
  </HStack>
</VStack>
```

**Props:** `variant` (default | slim | Default | Slim), `header`, `media`, `children`, `modes`, `mediaAspectRatio`, `style`, `onPress`, `disabled`, `accessibilityLabel`, `Card.Title`, `Card.SupportText`. (* required)

**Modes it reads:** AppearanceBrand, AppearanceSystem, Card Container, Color Mode, context 8, Gap, Page type, Semantic Intent.

**Gaps (report, do not work around)**
- Figma draws Default and Slim at 200 px with fixed heights; in code the card hugs its content.
- Card.Title's line height is 20 px in code and 18 px in Figma.
- Figma has no header switch on Slim; code accepts a header there.
- The published Storybook still shows the older generated Card page.

Full entry: `components/card.md`. Links: `components/card.links.md`.
