# ProductOverview (brief)

> Coin agent pack 0.1.78+22 · flagged · full entry: `components/productoverview.md` (sources, all facts, flags)

Use a Product Overview to introduce one product: its picture, a chip, its name, a line of trust, and two or three key facts.

**Use when**
- Introduce one product: its picture, a chip, its name, a line of trust, and two or three key facts.
- One product, and the facts that matter.

**Avoid when**
- Avoid: A card that should respond to a press: Product Overview isn't pressable.
- Avoid: A card that needs a selected, disabled, or loading look: Product Overview has none.

**Placement**
- Put the product's action on the screen next to the overview, not inside it.
- On a product page, the Buy button goes under the overview and belongs to the screen, because the card has no action of its own.
- The card fills its host's width; Figma draws it at 343 px.

**Key rules**
- **REQUIRED** `productName`: Set productName yourself: left out, the card shows the sample “0.5g Gold Coin”.
- **REQUIRED** `description`: Set description yourself: left out, the card shows the sample “Your gold is insured from our vault to you. If lost or damaged, we’ll replace it.”
- `imageSource`: imageSource adds the product's picture at the top, fitted inside the card's width at 288:170 unless imageRatio says otherwise; without it the card starts at the chip.
- `imageRatio` = `2`: imageRatio 2 gives the picture a wider frame, so a smaller coin.
- `labelImageSource`: labelImageSource puts a small round picture in the chip.
- `labelImageSource`: Without labelImageSource, the chip shows only its label.
- `stats`: stats takes any number of facts in equal columns, and [] removes the row.
- `children`: children adds your own content between the description and the stats, with the card's modes.

**Example:** A gold coin's product page, the guide's In context: the overview explains the product, and the Buy button under it belongs to the screen, because the card has no action of its own; Buy opens the screen's own checkout. The image URIs stand for the product's own picture and the brand's logo.

```tsx
<VStack>
  <ProductOverview
    imageSource={{ uri: 'https://example.com/gold-coin.png' }}
    labelImageSource={{ uri: 'https://example.com/jio-gold-logo.png' }}
    label="Gold"
    productName="5g Gold Coin"
    description="Your gold is insured from our vault to you. If lost or damaged, we’ll replace it."
    stats={[
      { value: '995', label: 'Purity' },
      { value: '3%', label: 'GST' },
    ]}
  />
  <Button label="Buy for ₹38,750" onPress={() => {}} />
</VStack>
```

**Props:** `imageSource`, `imageRatio`, `labelImageSource`, `label`, `productName`, `description`, `stats`, `modes`, `style`, `children`, `disableTruncation`. (* required)

**Modes it reads:** Avatar Size, Badge Size, Color Mode, Context, context 10, Context2, Context4, Page type, Profile Card Appearance, Text Appearance.

**Gaps (report, do not work around)**
- The name's line is 32 px where Figma's is 26, and a stat value's 24 where Figma's is 20, so the card is taller than Figma's 396 px (Component Bug #355).
- Left out, imageSource and labelImageSource give no picture and no chip picture, where Figma's component shows the coin and the Jio dot.
- Figma's Product Overview has no properties: the picture, chip, text, and two stats are layers there.
- Figma has no children, imageRatio or disableTruncation, and its frame holds a fixed two stats; the package takes any number of stats.
- The published Storybook is older than the installed package and still shows the older generated page (Component Bug #355).

Full entry: `components/productoverview.md`. Links: `components/productoverview.links.md`.
