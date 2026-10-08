# Value Back Metric source evidence

Package, Figma, Storybook, and browser evidence for the Value Back Metric guide (board ticket #46, Design documentation — Marcin; Storybook coverage — Biscuit, done).

## Check

Checked 1 October 2026. Declared and installed `jfs-components` is `0.1.77` from the private package repository. The newest mirror tag is `v0.1.78`, and ValueBackMetric is unchanged in it.

- Figma: [Coin Components Library · valueBack metric](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=7581-1460), node `7581:1460`, 122 × 83. It stacks a value wrap (18 px icon and "JioPoints"), a text wrap ("Value" and "Earn 10 point with UPI"), and a purple "Earn" Text.
- Storybook: `components-valuebackmetric--docs`; stories `--default`, `--no-link`, `--no-caption`, `--header-only`, `--brand-appearance`, `--image-header`, `--custom-link`, `--card-row`, `--pressable-card`, `--disabled`.
  - The handwritten docs say: use it for an earn or redeem balance (JioPoints, cashback); use MetricData for a generic stat and MoneyValue for an amount.
  - The header always shows. The CTA is the shared Text styled Secondary + Small, not Link, so it has no underline.
  - `AppearanceBrand` (Primary, Secondary, Neutral, Tertiary) tints only the header icon. `disabled` does nothing without `onPress`.
  - Content: the programme name as title, the countable amount as value, a one-sentence caption, and a one-verb CTA (Earn, View, Claim). Avoid "Click here" and the Figma placeholder "Value".
  - Do not invent a warning variant with AppearanceSystem.
- Package: public `ValueBackMetric` accepts `icon` (registry name or node, default `ic_rupee_coin`), `title` (default "JioPoints"), `value` (string or node), `caption`, `linkLabel`, `link` (slot), `onLinkPress`, `onPress`, `disabled`, `modes`, `style`, `titleStyle`, `valueStyle`, `captionStyle`, and `accessibilityLabel` (defaults to the joined title, value, caption, and link label). It has no `testID`.

## Browser measurements (Chrome, react-native-web 0.21.2)

- The default card with all parts is 136 × 84, white, with no padding and no radius (min-height 82). The header row is 78 × 18 (18 px gold icon `rgb(173,132,68)` plus title). Value "1,240" is 20 px tall; the caption is 18 px; Earn is 26 × 16. Header only is 78 × 82.
- `AppearanceBrand: Secondary` turns only the icon purple.
- Without `onPress` the root is a generic div with the joined `aria-label`, which is ignored on a generic element. With `onPress` the root is a `<button>` named by the joined label, and it contains the focusable `role=link` Earn. Clicking Earn fires only `onLinkPress`.
- Earn is `role=link` with `tabindex=0`, but Enter on it does not call `onLinkPress`; click does.
- Text does not wrap: in a 120 px column, value "1,24,000" with a long caption renders 226 px wide.
- Coin gap #184 (Components, To do, Component Bug; Mr. Biscuit, Anagha Ghotkar) covers Enter, the nested link in a pressable card, the ignored generic label, and the lack of wrapping.

## 636f3f5 check

Checked 8 October 2026 against `jfs-components` 0.1.78 built from Biscuit's `main` at `636f3f5` (mirror tag `v0.1.78-636f3f5`) in headless Chrome with react-native-web 0.21.2.

- #184 fixed. Enter (and Space) on Earn calls `onLinkPress`. With `onPress`, the card is a button and Earn is a sibling link, not inside it; each click calls only its own handler. In a 120 px column the caption wraps and nothing overflows.
- Installed source: the root now has `maxWidth: '100%'`, `minWidth: 0`, and `alignSelf: 'stretch'`, and each text has `flexShrink: 1`. In a row (`.coin-new-row`, the Anatomy specimen) the card still hugs its longest line; in a column container it may fill the column's width. Not measured on the guide.
- Still open (not in the ticket's Expected): without `onPress`, the joined label still sits on a role-less div, so assistive tech ignores it (the text is still read in order).
- Guide: the Sizing title and description now say the card is never wider than its column and its text wraps in narrow columns; the Sources note gives the 5 October build and says Enter and Space activate the call to action, a pressable card keeps it beside its button, and long lines wrap; `checked` is 8 October 2026. The brief's checked line, Sizing, note, and Limits match.
