# DebitCard (brief)

> Coin agent pack 0.1.78+23 · documented · full entry: `components/debitcard.md` (sources, all facts, flags)

Use a Debit Card to show a card the user already holds: its bank, type, last four digits, cardholder, and expiry.

**Use when**
- Show a card the user already holds: its bank, type, last four digits, cardholder, and expiry.
- Listing the cards the user holds, such as on a profile screen.

**Avoid when**
- Avoid: A card that has to flip, freeze, or show its CVV: the Debit Card does none of these.

**Placement**
- `onPress`: Let the screen own the details: each card's onPress opens its details on the screen, and the card only shows the plastic.
- The card is a fixed 328 × 224, as in Figma, and doesn't grow or shrink with its host or its text.

**Key rules**
- **REQUIRED** `cardNumber`: Never show the full card number on the card.
- **REQUIRED** `cardNumber`: Set cardNumber yourself: left out, the card shows the sample “•••• 1234”.
- **REQUIRED** `expireDate`: Set expireDate yourself: left out, the card shows the sample “02/28”.
- **REQUIRED** `cardholderName`: Set cardholderName yourself: left out, the card shows the sample “Shruti Shukla”.
- `cardType`: cardType is free text: write Debit or Credit, and nothing else on the card changes.
- `bankLogoSlot`: bankLogoSlot puts your bank's mark before its name; the package ships no logo, so the app passes its own.
- `providerLogoSlot`: providerLogoSlot puts a network mark after the card type; the package ships none, so the app passes its own.
- `bankLogoSlot`: The top band is 73 px with or without a 29 px bank logo; a taller logo makes it taller.

**Example:** A card the user holds, shown as a picture (no onPress): the bank's 29 px mark and name, then the type at the top, the art strip across the middle, and the masked number, cardholder and expiry at the bottom. The package ships no logo, so the app passes its own; the URI stands for it.

```tsx
<DebitCard
  bankName="JioFinance"
  bankLogoSlot={<Image imageSource={{ uri: 'https://example.com/jiofinance-logo.png' }} width={29} height={29} />}
  cardType="Debit"
  cardNumber="•••• 4821"
  cardholderName="Priya Sharma"
  expireDate="09/29"
/>
```

**Props:** `cardholderName`, `cardNumber`, `expireDate`, `bankName`, `cardType`, `cardArtSource`, `showArt`, `bankLogoSlot`, `providerLogoSlot`, `modes`, `style`, `onPress`, `disabled`, `accessibilityLabel`. (* required)

**Modes it reads:** DebitCard brand.

**Gaps (report, do not work around)**
- The package ships no bank or network logos, where Figma's card shows them; the app passes its own through bankLogoSlot and providerLogoSlot.
- The art strip doesn't change with the brand, and there is no brand foreground (text) token.
- Figma's Debit Card exposes cardholderName, cardNumber and expireDate as properties; its bank and network logos are nested instances and its brand is a variable mode. In code bankName and cardType are props, and the logos go in bankLogoSlot and providerLogoSlot.

Full entry: `components/debitcard.md`. Links: `components/debitcard.links.md`.
