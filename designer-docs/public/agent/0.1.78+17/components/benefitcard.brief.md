# BenefitCard (brief)

> Coin agent pack 0.1.78+17 · flagged · full entry: `components/benefitcard.md` (sources, all facts, flags)

Use a Benefit Card to list what a plan or offer gives, with an optional upsell and one button to upgrade.

**Use when**
- List what a plan or offer gives, with an optional upsell and one button to upgrade.

**Placement**
- `width`: The card is 344 px wide by default; to fill its container, set width to '100%'.
- `onButtonPress`: Let the screen own the next step through onButtonPress; the card doesn't act on its own.

**Key rules**
- **REQUIRED** `items`: Pass your own rows (headerItems and items, or the header and children slots) whenever those sections show: the default rows repeat one placeholder.
- **REQUIRED** `showButton` = `false`: To hide the button, set showButton false; button={null} still renders the default button.
- `showHeader` = `false`: Set showHeader false to drop the header title, its rows and the divider together.
- `bodyHeader` = `null`: Set bodyHeader to null to remove the upsell, or pass a node to replace it.
- `AppearanceBrand`: Use AppearanceBrand to recolour the icons, the upsell and the button together; the card stays white.
- `modes`: Set modes once on the card: they cascade to its rows, icons, upsell and button.
- Show what people get, then one way to get it.
- `headerTitle`: Write the header title as a label, such as “You will earn”.

**Example:** A plan card with its own earnings rows, perks and an upgrade button.

```tsx
<BenefitCard
  headerTitle="You will earn"
  headerItems={[
    { icon: 'ic_jewellery_diamond', title: 'JioPoints', trailingText: 'Up to 2000 pts' },
    { icon: 'ic_offer', title: 'Cashback', trailingText: 'Up to ₹5000' },
  ]}
  items={[
    { icon: 'ic_card', title: 'Zero forex markup on cards' },
    { icon: 'ic_support', title: 'Priority support, 24/7' },
  ]}
  buttonLabel="Upgrade"
  onButtonPress={() => {}}
  modes={{ 'Color Mode': 'Light' }}
/>
```

**Props:** `headerTitle`, `headerItem`, `headerItems`, `header`, `showHeader`, `bodyTitle`, `bodyHeader`, `items`, `children`, `buttonLabel`, `onButtonPress`, `button`, `showButton`, `onPress`, `width`, `modes`, `style`, `accessibilityLabel`, `BenefitCardItem.icon`, `BenefitCardItem.iconColor`, `BenefitCardItem.leading`, `BenefitCardItem.title`*, `BenefitCardItem.trailingText`, `BenefitCardItem.trailing`, and 1 more. (* required)

**Modes it reads:** AppearanceBrand, AppearanceSystem, Avatar Size, Badge Size, Border Boolean, Button / Size, Button / State, Color Mode, Context, context 10, Context2, Context4, Emphasis, Icon Size, Nudge padding, Page type, Profile Card Appearance, Semantic Intent, Slot gap, Text Appearance, Text Sizes, Weight, List Item Style.

**Gaps (report, do not work around)**
- No mode changes the card's white surface or black title, including Color Mode Dark.

Full entry: `components/benefitcard.md`. Links: `components/benefitcard.links.md`.
