# DebitCard source evidence

Package, Figma, and Storybook evidence for the Debit Card guide (board ticket #31, Design documentation — Marcin; Storybook coverage — Biscuit, done: "Storybook page rewritten to the handwritten outline on main e60f8bd8").

## dbe0e02 publish (28 October 2026, #363)

The docs now install mirror tag `v0.1.78-dbe0e02` (Biscuit's `main` at dbe0e02, 27 October). #363 verified 27 October on ace46ca (run_c79cb190) and again on dbe0e02 (run_beaf2324); closed by Marcin; published to the docs 28 October in Penny run run_92acfa9d. Where the sections below say otherwise, this section replaces them.

- SBI text is `#ffffff` on the `#5d00b5` brand (9.85:1), also when the brand comes from JFSThemeProvider; JFS stays `#141414` on `#cea15a` (7.78:1).
- `cardArtSource={null}` and `showArt={false}` drop the art strip; the card stays 224 px. The art still doesn't change with the brand, and there's no brand foreground token.
- The header is 73 px without a logo (Figma 73); a 29 px logo keeps 73; a 40 px logo grows it to 84.
- Long bankName and cardType end in an ellipsis on one line. Pressed opacity 0.75; without onPress the root is a named group; disabled dims to 0.5 with `aria-disabled`.

Guide changes: Configuration (showArt removes the strip; SBI has white text; new “Without the art” example; “Without a bank logo” keeps Figma's 73 px); States (pressed and disabled looks); Sizing (73 px with or without a 29 px logo); the Long names Don't now says each ends in an ellipsis; Sources rewritten for the fixes (28 October, 27 October build).

## Checked

21 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-c7d3348` (Biscuit's `main` at c7d3348). `npm run coin:status` shows one newer upstream commit, e60f8bd8, which changes only Storybook MDX pages (`DebitCard.mdx` among them); the component last changed on 8 September. Rendered both the published Storybook and the installed package (docs site Vite config, react-native-web 0.21.2) in headless Chrome; the numbers match.

## Sources

- Package: `src/components/DebitCard/DebitCard.tsx` (220 lines) and its bundled art `cf64a67d….png` (656 × 91, dot pattern with a gold Jio mark). Exports `DebitCard`, `DebitCardProps` (`components/index.ts:82`).
- Figma: [Coin Components Library · Debit Card](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2766-25), node `2766:25`, one component, 328 × 224. Text properties `cardholderName`, `cardNumber`, `expireDate`; nested "Bank logos" (JioFinance mark + name, 29 tall) and "Credit card logos" ("Debit" + RuPay). Header 73, art strip 50 at y 73, footer 77. Brand is the `DebitCard brand` variable mode (JFS gold), not a property.
- Storybook (published `index.json`): `components-debitcard--default`, `--credit-card`, `--no-card-art`, padded host, no background. Storybook injects `onPress`, so every story is a button. "No card art" passes `cardArtSource: undefined`, which still shows the art. The published docs page is the older generated one.
- Biscuit's handwritten `DebitCard.mdx` (e60f8bd8): "the plastic: bank, card type, art, the last four digits, expiry, and the cardholder. It does not start a payment." Use to show a card the user already holds and to tell debit from credit with `cardType`; not to sell a card (CcCard), show a balance (CardBankAccount, Balance), or print the full number. Content: bankName is the issuer, cardType Debit or Credit, cardNumber masked, expireDate MM/YY, cardholderName as printed. Accessibility: label "Debit card, JioFinance, ending 1234", never the full number.

## Contract

All props optional; no `testID` or `...rest`.

- Text: `bankName` ('JioFinance'), `cardType` ('Debit'), `cardNumber` ('•••• 1234', shown exactly as passed), `cardholderName` ('Shruti Shukla'; wraps), `expireDate` ('02/28'). All 14/17 medium `#141414`. Header text doesn't truncate: long values overflow and the card's edge cuts them.
- `bankLogoSlot` (before bankName, gap 4) and `providerLogoSlot` (after cardType, gap 8): any node, given the card's modes. Nothing ships for either.
- `cardArtSource` (`ImageSourcePropType`): the bundled strip by default (328 × 50, cover, 4 px corners); `undefined` keeps it. The type has no way to remove it: the code drops the strip for a falsy value such as `null` (the footer then fills the space), but `null` isn't in the public type or JSDoc, so the guide doesn't use it.
- `onPress` makes the card a `Pressable` button named `accessibilityLabel ?? '<bankName> <cardType> <cardNumber>'`; without it the card is a plain `View` (no role, no default name). `disabled` works only with `onPress`. No pressed feedback.
- Size from tokens: 328 × 224, radius 16, `overflow: hidden`; `style` goes last and can change the box, but the content doesn't reflow.

## Modes and tokens

18 tokens (`debitCard/*`, one mode). Only `debitCard/background` changes: `DebitCard brand` JFS `#cea15a` (default), SBI `#5d00b5`. Text stays `#141414` (1.87:1 on SBI purple) and the art doesn't change. No other mode changes the card (AppearanceBrand, Semantic Intent and the rest don't reach it). Header padding 16 / 20 / 28, art 50, footer gap 16, padding 16 / 20, bottom padding 24.

## Web render

Root `div` (pressable: `button`) › header `div` (left row: logo slot + `div[dir=auto]` bank; right row: type + provider slot) · art `div` › background `div` + hidden `img` · footer `div` (`div[dir=auto]` number; row: name, expiry). No `data-testid`.

- 328 × 224. Without a logo slot the header is 61 tall, so the art and footer sit 12 px higher than Figma; with a 29 px logo it's 73, exactly Figma's layout.
- `cardArtSource={null}`: footer 139 tall, number at y 77.
- Long cardholder name wraps to two lines; long bank + type overflow the header and are clipped.

## Discrepancies

- Text stays `#141414` on the SBI purple (1.87:1); MDX says the brand "switches the art treatment", but only the background changes.
- Header 12 px shorter than Figma without a logo; no logo assets ship (Figma shows the JioFinance mark and RuPay).
- No supported way to remove the art: `undefined` still shows it (the "No card art" story shows art), and `null`, which the code handles, isn't allowed by the type.
- Header text clipped, not truncated; no pressed feedback; `disabled` only with `onPress`; no default accessible name without `onPress`.
- Published stories all render as buttons (auto-injected `onPress`); older generated docs page.

## Hosting

The card is fixed 328 × 224 (Figma's size) and sits in `FitWidth`, which scales it on narrow screens. Bank mark: the docs' `src/assets/jio-gold-logo.png` in a Coin `Image` 29 × 29 in `bankLogoSlot`, which also gives Figma's 73 px header. No network logo is available, so `providerLogoSlot` stays empty.

## Tickets

- #363 (Component Bug, Biscuit): SBI text contrast, header height without a logo, no supported way to remove the art, clipped header text, no pressed feedback or default name.

## Limits

Don't show or mention Color Mode or dark mode. Don't imply the brand mode changes the art or text, that the art can be removed (no `null` with a cast), that header text truncates, or that the card flips, freezes or shows a CVV.
