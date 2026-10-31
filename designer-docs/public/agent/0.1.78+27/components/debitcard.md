# DebitCard

> Coin agent pack 0.1.78+27 (pilot). Generated from `components/debitcard.json`; the JSON is the source of truth.

- **State:** documented
- **Package:** jfs-components 0.1.78 · guide commit `e7ed622` · built 2026-10-31T05:18:28Z
- **Category:** card (for discovery only, not a limit on composition) · **Tags:** card face, payment card, credit card, bank card, plastic, card art
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=debitcard) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2766-25) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-debitcard--docs)

Use a Debit Card to show a card the user already holds: its bank, type, last four digits, cardholder, and expiry.

## Use when

- **recommended** Show a card the user already holds: its bank, type, last four digits, cardholder, and expiry.  
  _From summary: “Use a Debit Card to show a card the user already holds: its bank, type, last four digits, cardholder, and expiry.”_
- **recommended** Listing the cards the user holds, such as on a profile screen.  
  _From inContext: “The screen lists the cards the user holds.”_

## Avoid when

- **discouraged** A card that has to flip, freeze, or show its CVV: the Debit Card does none of these.  
  _From states: “The card doesn’t flip, freeze, or show a CVV.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Bank | bankLogoSlot, then bankName: the bank's mark, if you pass one, then its name. | yes | anatomy: “bankLogoSlot, then bankName.” |
| Card type | cardType, then providerLogoSlot (a network mark, empty in the guide). | yes | anatomy: “cardType, then providerLogoSlot (empty here).” |
| Card art | The package's art strip, 50 px tall, across the middle; cardArtSource replaces it. | no | anatomy: “The package’s art strip, 50 px tall; cardArtSource replaces it.” |
| Card number | cardNumber, shown exactly as you pass it. | yes | anatomy: “cardNumber, shown exactly as you pass it.” |
| Cardholder | cardholderName; a long name wraps. | yes | anatomy: “cardholderName; a long name wraps.” |
| Expiry | expireDate, as MM/YY, beside the cardholder. | yes | anatomy: “expireDate, as MM/YY.” |
| Card | The card face: 328 × 224 with 16 px corners; the DebitCard brand mode sets its colour. | yes | anatomy: “328 × 224 with 16 px corners; DebitCard brand sets its colour.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `bankLogoSlot` | `ReactNode` | types |
| `providerLogoSlot` | `ReactNode` | types |

## Placement

- **recommended** `onPress`: Let the screen own the details: each card's onPress opens its details on the screen, and the card only shows the plastic.  
  _From inContext: “Each card’s onPress opens its details on the screen; the card only shows the plastic.”_
- **recommended** The card is a fixed 328 × 224, as in Figma, and doesn't grow or shrink with its host or its text.  
  _From sizing: “The card is a fixed 328 × 224, as in Figma, and doesn’t grow or shrink with its host or its text.”_

## Configuration

- **recommended** `cardType`: cardType is free text: write Debit or Credit, and nothing else on the card changes.  
  _From configuration: “cardType is free text: write Debit or Credit, and nothing else changes.”_
- **recommended** `bankLogoSlot`: bankLogoSlot puts your bank's mark before its name; the package ships no logo, so the app passes its own.  
  _From configuration: “bankLogoSlot puts your bank’s mark before its name, and providerLogoSlot puts a network mark after the type; the package ships neither.”_
- **recommended** `providerLogoSlot`: providerLogoSlot puts a network mark after the card type; the package ships none, so the app passes its own.  
  _From configuration: “bankLogoSlot puts your bank’s mark before its name, and providerLogoSlot puts a network mark after the type; the package ships neither.”_
- **recommended** `bankLogoSlot`: The top band is 73 px with or without a 29 px bank logo; a taller logo makes it taller.  
  _From sizing: “The top band is 73 px with or without a 29 px bank logo; a taller logo makes it taller.”_
- **recommended** `cardArtSource`: The art strip is the package's own; cardArtSource replaces it with your picture.  
  _From configuration: “The art strip is the package’s own: cardArtSource replaces it with your picture”_
- **recommended** `showArt` = `false`: showArt={false} removes the art strip; the card stays 224 px tall.  
  _From configuration: “showArt={false} removes the strip; the card stays 224 px tall.”_
- **recommended** `DebitCard brand`: The DebitCard brand mode colours the card: JFS gold with dark text by default, or SBI purple with white text.  
  _From configuration: “The DebitCard brand mode colours the card: JFS gold with dark text by default, or SBI purple with white text.”_
- **recommended** `DebitCard brand` = `SBI`: DebitCard brand SBI: a purple card with white text.  
  _From configuration: “A purple card with white text.”_
- **recommended** `DebitCard brand`: The art strip doesn't change with the brand.  
  _From sources: “though the art doesn’t change with the brand.”_
- **recommended** `modes`: No mode other than DebitCard brand changes the card.  
  _From configuration: “No other mode changes it.”_
- **recommended** `onPress`: onPress makes the whole card one button, named by its bank, type, and number unless you set accessibilityLabel.  
  _From states: “onPress makes the whole card one button, named by its bank, type, and number unless you set accessibilityLabel.”_
- **recommended** `disabled`: disabled stops a pressable card and dims it to half.  
  _From states: “A pressable card dims while pressed, and disabled stops it and dims it to half.”_

## Content

- **REQUIRED** `cardNumber`: Never show the full card number on the card.  
  _From corePrinciple: “The card in their wallet, never the full number.”_
- **recommended** `cardNumber`: Mask cardNumber to its last four digits: four dots, then the last four, such as “•••• 4821”.  
  _From content: “Mask cardNumber to its last four digits”_
- **discouraged** `cardNumber`: Do not pass the full number: the card shows it exactly as passed.  
  _From doDont: “The card shows it exactly as passed.”_
- **REQUIRED** `cardNumber`: Set cardNumber yourself: left out, the card shows the sample “•••• 1234”.  
  _From fact `/facts/props/1` (cardNumber, source evidence)_
- **recommended** `bankName`: Write bankName as the issuer and cardType as Debit or Credit.  
  _From content: “Write bankName as the issuer and cardType as Debit or Credit.”_
- **recommended** `cardType`: Keep the bank and type short, so both fit the top band.  
  _From doDont: “Both fit the top band.”_
- **discouraged** `cardType`: Do not pass long bank or type names: each ends in an ellipsis, so the card type is lost.  
  _From doDont: “Each ends in an ellipsis, so the card type is lost.”_
- **recommended** `expireDate`: Write expireDate as MM/YY.  
  _From content: “write expireDate as MM/YY.”_
- **REQUIRED** `expireDate`: Set expireDate yourself: left out, the card shows the sample “02/28”.  
  _From fact `/facts/props/2` (expireDate, source types)_
- **recommended** `cardholderName`: Give cardholderName as it appears on the card.  
  _From content: “Give cardholderName as it appears on the card.”_
- **recommended** `cardholderName`: A long cardholder name wraps to a second line beside the expiry.  
  _From content: “The name wraps to a second line beside the expiry.”_
- **REQUIRED** `cardholderName`: Set cardholderName yourself: left out, the card shows the sample “Shruti Shukla”.  
  _From fact `/facts/props/0` (cardholderName, source evidence)_

Good: “JioFinance”, “Debit”, “Credit”, “•••• 4821”, “•••• 7350”, “Priya Sharma”, “09/29”, “Debit card, JioFinance, ending 4821”

Bad: “4111 1111 1111 4821”, “JioFinance Payments Bank”, “Debit Platinum Select”

## States

| State | When | From |
| --- | --- | --- |
| Picture | No onPress: the card doesn't press, and screen readers read its text. | states: “Without onPress the card is a picture: it doesn’t press, and screen readers read its text.” |
| Button | onPress set: the whole card is one button, named by its bank, type, and number unless you set accessibilityLabel. | states: “onPress makes the whole card one button, named by its bank, type, and number unless you set accessibilityLabel.” |
| Pressed | A pressable card dims while you press it. | states: “The whole card presses and dims while you press it.” |
| Disabled | disabled stops a pressable card and dims it to half. | states: “A pressable card dims while pressed, and disabled stops it and dims it to half.” |
| Flipped, frozen, CVV | Not available: the card doesn't flip, freeze, or show a CVV. | states: “The card doesn’t flip, freeze, or show a CVV.” |

## Accessibility

- **recommended** Without onPress the card is a picture, and screen readers read its text.  
  _From states: “Without onPress the card is a picture: it doesn’t press, and screen readers read its text.”_
- **recommended** `onPress`: With onPress the whole card is one button, named by its bank, type, and number unless you set accessibilityLabel.  
  _From states: “onPress makes the whole card one button, named by its bank, type, and number unless you set accessibilityLabel.”_
- **recommended** `accessibilityLabel`: When the card presses, set accessibilityLabel to the type, bank, and last four, such as “Debit card, JioFinance, ending 4821”, never the full number.  
  _From content: “When the card presses, set accessibilityLabel to the type, bank, and last four, such as Debit card, JioFinance, ending 4821, never the full number.”_
- **recommended** Without onPress the card is a named group, not a button.  
  _From evidence: “without onPress the root is a named group”_
- **recommended** `disabled`: A disabled card dims to half and is marked disabled for screen readers (aria-disabled on the web).  
  _From evidence: “disabled dims to 0.5 with `aria-disabled`”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Mask the number | The full number | The card shows it exactly as passed. |
| Short bank and type | Long names | Each ends in an ellipsis, so the card type is lost. |

## Examples

### A card the user holds, shown as a picture (no onPress): the bank's 29 px mark and name, then the type at the top, the art strip across the middle, and the masked number, cardholder and expiry at the bottom. The package ships no logo, so the app passes its own; the URI stands for it.

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

_From anatomy: “The bank and the card type sit at the top, the art strip runs across the middle, and the number, cardholder, and expiry fill the bottom.”_

### The cards on a profile screen, the guide's In context: the screen lists the cards the user holds. Each card's onPress opens its details on the screen, and each is named for screen readers by its type, bank and last four.

```tsx
<VStack>
  <Title title="Your cards" subtitle="2 cards" />
  <DebitCard
    bankName="JioFinance"
    bankLogoSlot={<Image imageSource={{ uri: 'https://example.com/jiofinance-logo.png' }} width={29} height={29} />}
    cardType="Debit"
    cardNumber="•••• 4821"
    cardholderName="Priya Sharma"
    expireDate="09/29"
    onPress={() => {}}
    accessibilityLabel="Debit card, JioFinance, ending 4821"
  />
  <DebitCard
    bankName="JioFinance"
    bankLogoSlot={<Image imageSource={{ uri: 'https://example.com/jiofinance-logo.png' }} width={29} height={29} />}
    cardType="Credit"
    cardNumber="•••• 7350"
    cardholderName="Priya Sharma"
    expireDate="09/29"
    onPress={() => {}}
    accessibilityLabel="Credit card, JioFinance, ending 7350"
  />
</VStack>
```

_From inContext: “Each card’s onPress opens its details on the screen; the card only shows the plastic.”_

### Without the art: showArt false removes the strip, and the card stays 224 px tall.

```tsx
<DebitCard
  bankName="JioFinance"
  bankLogoSlot={<Image imageSource={{ uri: 'https://example.com/jiofinance-logo.png' }} width={29} height={29} />}
  cardType="Debit"
  cardNumber="•••• 4821"
  cardholderName="Priya Sharma"
  expireDate="09/29"
  showArt={false}
/>
```

_From configuration: “showArt={false} removes the strip; the card stays 224 px tall.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `cardholderName` | `string` |  | `"Shruti Shukla"` |  | evidence (2026-10-21) | A long name wraps. Declared: Cardholder name displayed in the footer. Default "Shruti Shukla", from the component source. |
| `cardNumber` | `string` |  | `"•••• 1234"` |  | evidence (2026-10-21) | Shown exactly as passed: the card doesn't mask it. Declared: Masked card number. Default "•••• 1234", from the component source. |
| `expireDate` | `string` |  | `"02/28"` |  | types | Card expiry date. Default "02/28", from the component source. |
| `bankName` | `string` |  | `"JioFinance"` |  | evidence (2026-10-27) | Shown on one line; long text ends in an ellipsis. Declared: Bank / issuer name shown in the header left. Default "JioFinance", from the component source. |
| `cardType` | `string` |  | `"Debit"` |  | evidence (2026-10-27) | Shown on one line; long text ends in an ellipsis. Declared: Card type label shown in the header right (e.g. "Debit", "Credit") Default "Debit", from the component source. |
| `cardArtSource` | `ImageSourcePropType \| null` |  |  |  | evidence (2026-10-21) | Left out (undefined), the card shows the package's own strip: 328 × 50, cover, 4 px corners. Declared: Image source for the decorative card art strip. `undefined` uses the bundled strip. Pass `null` (or `showArt={false}`) to hide the art. |
| `showArt` | `boolean` |  | `true` |  | evidence (2026-10-27) | showArt={false}, like cardArtSource={null}, drops the art strip; the card stays 224 px tall. Declared: When `false`, hides the art strip. Defaults to `true`. Default true, from the component source. |
| `bankLogoSlot` | `React.ReactNode` |  |  |  | evidence (2026-10-21) | Before bankName, 4 px apart; takes any node and passes it the card's modes. The package ships no logo for it. Declared: Slot: custom content for the bank logo area (left side of header, before bankName text) |
| `providerLogoSlot` | `React.ReactNode` |  |  |  | evidence (2026-10-21) | After cardType, 8 px apart; takes any node and passes it the card's modes. The package ships no network logo for it. Declared: Slot: custom content for the provider logo area (right side of header, after cardType text) |
| `modes` | `Modes` |  |  |  | types | Mode configuration for design token resolution. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | evidence (2026-10-21) | The card's size comes from its tokens (328 × 224, radius 16). style goes last and can change the box, but the content doesn't reflow. Declared: Container style overrides. |
| `onPress` | `() => void` |  |  |  | evidence (2026-10-27) | While pressed the card dims to 0.75 opacity. Declared: Press handler for the whole card. When set, the card becomes pressable (rendered through a `Pressable` with `accessibilityRole="button"`). |
| `disabled` | `boolean` |  |  |  | evidence (2026-10-27) | Dims the card to 0.5 opacity, with aria-disabled on the web. Declared: Disable interaction and apply the disabled look (with or without `onPress`). |
| `accessibilityLabel` | `string` |  |  |  | types | Accessibility label. Defaults to bank, type, and masked number. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `DebitCard brand` | `mode collection` | JFS, SBI | `"JFS"` |  | evidence (2026-10-27) | Sets the card's brand colours: JFS gold #cea15a (the default) with #141414 text, or SBI purple #5d00b5 with white text, also when the brand comes from JFSThemeProvider. Declared: A token collection DebitCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `bankLogoSlot` | `React.ReactNode` |  |  |  | types | Slot: custom content for the bank logo area (left side of header, before bankName text) |
| `providerLogoSlot` | `React.ReactNode` |  |  |  | types | Slot: custom content for the provider logo area (right side of header, after cardType text) |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onPress` | `() => void` |  |  |  | types | Press handler for the whole card. When set, the card becomes pressable (rendered through a `Pressable` with `accessibilityRole="button"`). |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- The package ships no bank or network logos, where Figma's card shows them; the app passes its own through bankLogoSlot and providerLogoSlot. _(evidence, 2026-10-28)_
- The art strip doesn't change with the brand, and there is no brand foreground (text) token. _(evidence, 2026-10-27)_
- Figma's Debit Card exposes cardholderName, cardNumber and expireDate as properties; its bank and network logos are nested instances and its brand is a variable mode. In code bankName and cardType are props, and the logos go in bankLogoSlot and providerLogoSlot. _(evidence, 2026-10-28)_

## Flags

_None._
