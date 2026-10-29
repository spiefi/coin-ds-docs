# HoldingsCard (brief)

> Coin agent pack 0.1.78+9 · flagged · full entry: `components/holdingscard.md` (sources, all facts, flags)

Use a Holdings Card for one loan offer or holding: its headline amount, its key terms, and a radio to choose it from a list.

**Use when**
- One loan offer or holding: its headline amount, its key terms, and a radio to choose it from a list.

**Placement**
- `selected`: When a screen lists offers to choose from, it keeps one selected: each card's onPress picks that offer, and its selected follows the screen's choice.
- `style`: Set the card's width with style, as Figma does at 328 px.
- The terms share the width in three equal columns, and the height follows the content: 20 px of padding at the top and bottom, 16 px at the sides, and 10 px between the parts.
- `style`: A wider card, such as 360 px, widens the three columns; the amount stays at the left.

**Key rules**
- **REQUIRED** `onPress`: Update selected yourself when onPress fires: the card does not toggle selected itself.
- **REQUIRED** `heroLabel`: Set heroLabel yourself: left out, the card shows the sample “Loan amount up-to”.
- **REQUIRED** `heroValue`: Set heroValue yourself: left out, the card shows the sample “₹1,89,000”.
- **REQUIRED** `details`: Pass your own details (or children): left out, the card shows five sample terms.
- **REQUIRED** `footerItems`: With footer, pass your own footerItems (or footerSlot): left out, the footer shows two placeholder links labelled “Link”.
- `radio` = `true`: The top right shows a Radio by default, for choosing this offer.
- `badgeLabel`: badgeLabel swaps the Radio for a status Badge.
- `trailing`: trailing swaps in your own component at the top right.

**Example:** Choosing a loan offer: a Title over two offer cards, each 328 px wide. The screen holds the choice: selected is true only on the offer it holds, and each card's onPress should pick that offer (the handlers here are stubs).

```tsx
<VStack style={{ width: 328 }}>
  <Title title="Pick an offer" subtitle="Pre-approved for you" />
  <HoldingsCard
    headerImage={require('../assets/jio-gold-logo.png')}
    heroLabel="Loan amount up to"
    heroValue="₹1,89,000"
    details={[
      { label: 'Interest', value: '12% p.a.' },
      { label: 'Tenure', value: '36 months' },
      { label: 'Processing fee', value: '₹499' },
      { label: 'APR', value: '15.47%' },
      { label: 'EMI', value: '₹6,277/m' },
    ]}
    selected
    onPress={() => {}}
    style={{ width: 328 }}
  />
  <HoldingsCard
    headerImage={require('../assets/jio-gold-logo.png')}
    heroLabel="Loan amount up to"
    heroValue="₹2,50,000"
    details={[
      { label: 'Interest', value: '13.5% p.a.' },
      { label: 'Tenure', value: '48 months' },
      { label: 'Processing fee', value: '₹999' },
      { label: 'APR', value: '16.2%' },
      { label: 'EMI', value: '₹6,768/m' },
    ]}
    selected={false}
    onPress={() => {}}
    style={{ width: 328 }}
  />
</VStack>
```

**Props:** `headerImage`, `heroLabel`, `heroValue`, `details`, `children`, `radio`, `trailing`, `badgeLabel`, `footer`, `footerSlot`, `footerItems`, `footerActionLabel`, `onFooterActionPress`, `selected`, `disabled`, `onPress`, `accessibilityLabel`, `modes`, `style`, `testID`, `disableTruncation`, `HoldingsCardDetailItem.label`*, `HoldingsCardDetailItem.value`*, `HoldingsCardFooterItem.label`*, and 2 more. (* required)

**Modes it reads:** AppearanceBrand, AppearanceSystem, Badge Size, Button / Size, Button / State, Color Mode, Context, context 10, Context2, Emphasis, Page type, Profile Card Appearance, Semantic Intent, Text Appearance, Text Sizes, Weight.

**Gaps (report, do not work around)**
- At 328 px wide the card is about 7 px taller than Figma's (207.69 against 201): its hero line is 44 px against 42, its term rows 31 against 30, plus the border.
- The package's default top right is a Radio, where Figma's Holdings Card defaults to a Badge (reported in #362).

Full entry: `components/holdingscard.md`. Links: `components/holdingscard.links.md`.
