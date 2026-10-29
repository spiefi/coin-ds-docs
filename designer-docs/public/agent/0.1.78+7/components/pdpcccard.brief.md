# PdpCcCard (brief)

> Coin agent pack 0.1.78+7 · flagged · full entry: `components/pdpcccard.md` (sources, all facts, flags)

Use a PDP Card at the top of a product page: the product’s picture, name, two or three key facts, and one action.

**Use when**
- At the top of a product page: the product's picture, name, two or three key facts, and one action.

**Placement**
- Open the product page with the card, under the page's heading.
- `onButtonPress`: Let the screen own the action: Add to cart calls the screen's own cart through onButtonPress, and the card only lays out the product.
- `width`: The card is 344 px wide, as in Figma; set width to another number or a percentage of its host.
- `width`: On a narrower card, such as width 280, the facts share less room and a long title is cut sooner.

**Key rules**
- **REQUIRED** `metrics`: Pass your own metrics: left out, the card shows two sample metrics.
- **REQUIRED** `title`: Set title yourself: left out, the card shows the sample word “Title”.
- **REQUIRED** `subtitle`: Set subtitle yourself: left out, the card shows the sample word “Subtitle”.
- **REQUIRED** `buttonLabel`: Set buttonLabel whenever the card shows its button: it defaults to “button”.
- Avoid: `onPress`: Use either the card's button or onPress, not both: a pressable card with its button puts a button inside a button.
- `imageSource`: Show the product: pass imageSource with its picture, which says what it is at a glance.
- `metrics`: metrics takes one entry per fact: a title, a value, an optional caption, and an optional icon from the Coin icon set.
- `metrics`: The entries share the row in equal columns; a single fact takes the whole row.

**Example:** A product card: the picture, the name, one qualifier, weight and price side by side, and Add to cart.

```tsx
<PdpCcCard
  imageSource={require('../assets/gold-coin.png')}
  imageWidth={60}
  imageHeight={60}
  title="5 g gold coin"
  subtitle="24K · 99.9% pure"
  metrics={[
    { title: 'Weight', value: '5 g', caption: 'one coin', icon: 'ic_scale' },
    { title: 'Price', value: '₹31,200', caption: 'incl. GST', icon: 'ic_rupee_coin' },
  ]}
  buttonLabel="Add to cart"
  onButtonPress={() => {}}
/>
```

**Props:** `imageSource`, `imageWidth`, `imageHeight`, `media`, `title`, `subtitle`, `numberOfLines`, `disableTruncation`, `singleLine`, `metrics`, `buttonLabel`, `buttonIcon`, `onButtonPress`, `button`, `showButton`, `onPress`, `width`, `modes`, `style`, `accessibilityLabel`. (* required)

**Modes it reads:** AppearanceBrand, AppearanceSystem, Badge Size, Button / Size, Button / State, Color Mode, Context, context 10, Context2, Context4, context7, Emphasis, Icon Size, Page type, Profile Card Appearance, Radius, Semantic Intent.

**Gaps (report, do not work around)**
- No divider line shows between metrics on the web, where Figma draws one 46 px tall (#361).
- Without imageSource an empty picture box keeps its space above the title; the package ships no default picture (#361).
- The button's plus icon is 18 px where Figma's is 16 (#361).
- The card is 316 px tall where Figma's is 310, because its text lines are taller (#361).
- On the web, with numberOfLines 2 the title's ellipsis renders partly cut.

Full entry: `components/pdpcccard.md`. Links: `components/pdpcccard.links.md`.
