# CcCard (brief)

> Coin agent pack 0.1.78+24 · flagged · full entry: `components/cccard.md` (sources, all facts, flags)

Use a CC Card to sell one credit card: who it’s for, its key benefits, an upsell, and the joining fee, with one action.

**Use when**
- Sell one credit card: who it's for, its key benefits, an upsell, and the joining fee, with one action.
- One card, its benefits, its fee.

**Avoid when**
- Avoid: A card face (the card itself, as someone holds it): the upstream Storybook docs, as the evidence records them, point to Debit Card. Use instead: DebitCard.
- Avoid: A product page with metric columns: the upstream Storybook docs, as the evidence records them, point to PDP CC Card. Use instead: PdpCcCard.
- Avoid: A plan matrix: the upstream Storybook docs, as the evidence records them, point to Plan Comparison Card. Use instead: PlanComparisonCard.

**Placement**
- On a screen of card offers, list the cards one under another.
- `Page type` = `SubPage`: On a white page, set Page type SubPage: it gives the card a grey border.

**Key rules**
- **REQUIRED** `title`: Set title yourself on the full card: left out, it shows the sample word “Title” (compact drops the title).
- **REQUIRED** `subtitle`: Set subtitle yourself on the full card: left out, it shows the sample word “Subtitle” (compact drops it).
- **REQUIRED** `headline`: Unless footer replaces the footer text, set headline yourself: left out, it shows the sample word “Headline”; '' or null hides the line.
- **REQUIRED** `description`: Unless footer replaces the footer text, set description yourself: left out, it shows the sample word “Description”; '' or null hides the line.
- **REQUIRED** `footerSubtitle`: Unless footer replaces the footer text, set footerSubtitle yourself: left out, it shows the sample word “Subtitle”; '' or null hides the line.
- **REQUIRED** `buttonLabel`: Set buttonLabel whenever the card shows its button: it defaults to “Button”.
- **REQUIRED** `items`: Set items yourself on the full card: left out, it shows three sample benefit rows (compact drops the benefits).
- **REQUIRED** `badges`: On the full card, unless header replaces the header, set badges, or hide the header with showHeader false: left out, it shows two sample badges (compact drops the header).
- **REQUIRED** `nudgeSegments`: On the full card, unless nudge replaces the upsell, set nudgeSegments, or hide the upsell with showNudge false: left out, it shows the sample “Upsell message JioFinance+” (compact drops the upsell).

**Example:** Card offers on the Cards screen, the guide's In context: a title, then two full cards one under another, each with its picture, name, benefits and fee; the first adds a trailing badge and an upsell, the second hides the upsell. Each Apply starts the screen's own application through onButtonPress (the empty handlers stand for that wiring). Badges take their colours as modes, as the guide sets them; the upsell's last run is brand-coloured as in the package's own sample. The require() paths stand for the app's own pictures.

```tsx
<VStack>
  <Title title="Cards for you" subtitle="Pre-approved offers" />
  <CcCard
    imageSource={require('./credit-card.png')}
    title="JioFinance Gold Credit Card"
    subtitle="Rewards on gold and every spend"
    badges={[{ label: 'Pre-approved', modes: { AppearanceBrand: 'Tertiary' } }]}
    trailingBadges={[{ label: 'Lifetime free', modes: { AppearanceBrand: 'Secondary' } }]}
    items={[
      { icon: 'ic_rupee_coin', title: '5% back as JioPoints on gold' },
      { icon: 'ic_flight_mode', title: '4 airport lounge visits a year' },
      { icon: 'ic_gift', title: 'No annual fee in the first year' },
    ]}
    nudgeSegments={[{ text: 'Get 2x JioPoints with ' }, { text: 'JioFinance+', modes: { 'Text Appearance': 'Primary' } }]}
    nudgeAvatarSource={require('./jiofinance-logo.png')}
    headline="Joining fee"
    description="₹499"
    footerSubtitle="+ GST"
    buttonLabel="Apply"
    onButtonPress={() => {}}
  />
  <CcCard
    imageSource={require('./credit-card.png')}
    title="JioFinance Everyday Credit Card"
    subtitle="Cashback on bills and groceries"
    badges={[{ label: 'Pre-approved', modes: { AppearanceBrand: 'Tertiary' } }]}
    items={[
      { icon: 'ic_voucher_cashback', title: '2% cashback on bills' },
      { icon: 'ic_wallet', title: '1% cashback on everything else' },
    ]}
    showNudge={false}
    headline="Joining fee"
    description="₹0"
    footerSubtitle="Lifetime free"
    buttonLabel="Apply"
    onButtonPress={() => {}}
  />
</VStack>
```

**Props:** `compact`, `showHeader`, `badges`, `trailingBadges`, `header`, `imageSource`, `imageWidth`, `imageHeight`, `title`, `subtitle`, `media`, `items`, `showNudge`, `nudgeSegments`, `nudgeAvatarSource`, `nudge`, `headline`, `description`, `footerSubtitle`, `footer`, `buttonLabel`, `onButtonPress`, `button`, `showButton`, and 10 more. (* required)

**Modes it reads:** AppearanceBrand, AppearanceSystem, Avatar Size, Badge Size, Button / Size, Button / State, Color Mode, Context, context 10, context 8, Context2, Context4, context5, context7, Draggable List, Emphasis, Icon Size, List Item Style, ListItem State, NavArrow Direction, Page type, Profile Card Appearance, Radius, Selectable, Semantic Intent, Text Appearance, Text Sizes, Weight.

**Gaps (report, do not work around)**
- Every published Storybook story renders the card as a pressable button with Apply inside it, and the published page is the older generated one.
- The picture's corners are 8 px round, where Figma's are square.

Full entry: `components/cccard.md`. Links: `components/cccard.links.md`.
