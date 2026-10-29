# CardBankAccount (brief)

> Coin agent pack 0.1.78+11 · flagged · full entry: `components/cardbankaccount.md` (sources, all facts, flags)

Use a Card Bank Account to summarise one linked bank account: the bank, a few facts such as the masked number, and one action.

**Use when**
- Summarise one linked bank account: the bank, a few facts such as the masked number, and one action.

**Placement**
- The card fills its host's width, so the screen sets it; Figma draws it at 292 px.
- Its height follows the rows: each is 17 px, 12 px apart.
- The panel is padded 16 px top and bottom and 12 px at the sides, with 16 px between the header, the rows and the button.
- In the guide, the Bank accounts screen in Settings shows the linked account with the card.

**Key rules**
- **REQUIRED** `buttonLabel`: To show the footer button, set buttonLabel: the default button is hidden when it is omitted or empty.
- **REQUIRED** `institutionName`: With the default header, set institutionName: omitted or empty, the header has no bank name, as there is no placeholder (headerSlot replaces the header instead).
- **REQUIRED** `items`: Show only the last four digits of the account number, such as “•••• 4521”.
- `badge`: badge takes a word, which becomes a Badge in the button's colours, or a Badge you set up yourself, such as a green status; leave it out for none.
- `badge`: For a status badge, a Badge with Semantic Intent System and AppearanceSystem positive turns green.
- `badge`: Leave badge out for no badge; the bank's name then has the row.
- `AppearanceBrand`: AppearanceBrand and Emphasis colour the footer button and a word badge; the card's defaults, Secondary at Medium emphasis, are light purple.
- `Emphasis`: Emphasis, with AppearanceBrand, colours the footer button and a word badge; the card's default is Medium.

**Example:** A linked savings account with four facts, the number masked, a green Active status Badge, and View statement as its one action; named for screen readers by the account.

```tsx
<CardBankAccount
  institutionName="Jio Payments Bank"
  institutionAvatar={require('../assets/jio-gold-logo.png')}
  badge={<Badge label="Active" modes={{ 'Semantic Intent': 'System', AppearanceSystem: 'positive' }} />}
  items={[
    { label: 'Account type', value: 'Savings' },
    { label: 'Account number', value: '•••• 4521' },
    { label: 'IFSC', value: 'JIOP0000001' },
    { label: 'Last updated', value: 'Today, 9:14 AM' },
  ]}
  buttonLabel="View statement"
  onButtonPress={() => {}}
  accessibilityLabel="Jio Payments Bank savings account ending 4521"
/>
```

**Props:** `accessibilityLabel`, `institutionName`, `institutionAvatar`, `badge`, `headerSlot`, `items`, `children`, `buttonLabel`, `onButtonPress`, `buttonDisabled`, `footer`, `modes`, `style`, `disableTruncation`, `CardBankAccountItem.label`*, `CardBankAccountItem.value`*. (* required)

**Modes it reads:** AppearanceBrand, AppearanceSystem, Avatar Size, Badge Size, Button / Size, Button / State, Color Mode, Context, context 10, Context2, Context4, context5, Emphasis, List Item Style, Page type, Profile Card Appearance, Semantic Intent, Text Appearance, Text Sizes, Weight.

**Gaps (report, do not work around)**
- Figma's badge is amber, a colour the package tokens don't have; the package's word badge takes the button's colours, light purple by default (#344).
- Rows are 17 px tall in code against Figma's 16, so at 292 px wide the card is 207 px tall against Figma's 204.

Full entry: `components/cardbankaccount.md`. Links: `components/cardbankaccount.links.md`.
