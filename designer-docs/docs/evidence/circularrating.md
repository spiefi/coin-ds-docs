# Circular Rating source evidence

Package, Figma, Storybook, and browser evidence for the Circular Rating guide (board ticket #141, Design documentation — Marcin; Storybook coverage — Biscuit).

## Checked

Checked 10 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-636f3f5` (Biscuit's `main` at 636f3f5); `npm run coin:status` reports the mirror and the docs up to date. `CircularRating.tsx` (last changed 1 September, 62372b0) and `CircularProgressBarDoted.tsx` are identical to upstream.

Re-checked 13 October 2026 for the #252 publish: the docs now install mirror tag `v0.1.78-c1fa197` (Biscuit's `main` at c1fa197, 12 October), which carries the #252 fix. The facts below are updated to that build; the 10 October values they replace are noted where they matter.

Re-checked 17 October 2026 for the #271 publish: the docs now install mirror tag `v0.1.78-a116616` (Biscuit's `main` at a116616, 16 October). `CircularRating.tsx` is unchanged; `Nudge.tsx` shows Close only with `onClose` or `showClose`. Re-test on #271: `<CircularRating value={72} />` renders no `[aria-label="Close"]`.

## Sources

- Figma: [Coin Components Library · Circular Rating](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3741-1711), one component (no variant set), 340 × 476: `Circular Progress Bar / Doted` (320 × 320, at 10,10) with `scoreDisplay` (`scoreTier` › `label`, `scoreLabel`; `Score trend` › `tierLabel`, `ic_chevron_right`), a footer frame named `name needed` (320 × 16: text and a 16 px icon), and an instance of the deprecated `Nudge Old do not use ⛔️🔥` (320 × 56). Variables match the package tokens (dots 6 + 6 = 18 px, track `#EBEBED`, progress `#CEA15A`, score 56/56/900, tier 16/20.8/700, label 12/15.6/400, text `#080D1A`, footer 12/16 `#0D0D0F`, gap 32, padding 10), with a white nudge (`#FFFFFF`, purple sparkle `#5D00B5`, dark button `#303338`, 12 px label). Figma draws 26 dots, all lit at “72”, with centres about 138 px out (12 px inside the 320 box). Component properties and instance modes weren't readable with the read-only tools allowed.
- Storybook (published `index.json`; the MDX chunk matches 636f3f5): `components-circularrating--docs`, `--default`, `--without-nudge`, `--low-rating` (36, “Needs attention”, “Updated today”). Meta args: 72, 24 dots, “Rating”, “Doing great”, “Updated on 1 March”, the nudge on, `AppearanceBrand: Neutral`, `Context: Nudge&Alert`, `Slot gap: S`. `onTierPress` is an action argType, so every story's tier row is a button. The MDX lists 15 mode collections (5 do nothing: Slot gap, context 10, Context2, Page type, Profile Card Appearance) and has no anatomy, accessibility, or usage guidance. No story shows System colours, Dark, other dot counts, or the slots.

## Contract

- Export: `CircularRating` and `CircularRatingProps` from the package root (`src/components/index.ts:111`). It composes `CircularProgressBarDoted` (ring, label, score, tier), a footer row, and `Nudge type="inline-compact"`. It shares no code with `CircularProgressBar`.
- Props (JSDoc in source): `value` (72; clamped 0–100), `dotCount` (24), `label` (“Rating”), `tierLabel` (“Doing great”), `footerText` (“Updated on 1 March”), `showFooterIcon` (true), `showNudge` (true), `nudgeBody` (“Split this transaction into installments”), `nudgeButtonLabel` (“Button”), `onPressNudgeButton`, `onTierPress`, `footerSlot`, `nudgeSlot`, `modes`, `style`, `ratingStyle`, `footerStyle`, `footerTextStyle`, `nudgeStyle`, `accessibilityLabel`, `disableTruncation`, plus View props (`testID` on the root). No max, size, format, or centre-slot props; Doted's `showChevron`, `onPress`, `children`, and style props aren't forwarded.
- Score text is `Math.round(value)`, out of a fixed 100, no “%”. Lit dots = `ceil(value / 100 × dotCount)` (0 lights none; any value above 0 lights at least one, so 0.4 shows “0” with one lit dot), filling clockwise from 12 o'clock. 72 of 24 lights 18. `NaN` is treated as 0 (c1fa197; it showed “NaN” before). Dots overlap from about 53.
- Neither the colour nor the tier follows the value: `tierLabel` is free text and the dot colour comes only from modes (`circularProgressBarDoted/progressDot/bg` → `semanticIntent/badge/bg`). The track dots are a literal `#EBEBED`. The ring and the default nudge share one `modes` object.
- Colours (Light): bare Primary gold dots `#CEA15A` with a cream nudge `#FEF4E5` and gold button; Neutral `#303338` with a white nudge; Secondary `#5D00B5`; Tertiary `#026B9A`; System positive `#00773D`, warning `#BE5301`, negative `#BC010C`. Contrast with the track: Primary High 1.99:1, Medium 1.00:1, Low 1.09:1; Neutral 10.65:1, Secondary 8.27:1.
- The nudge defaults to `Context: 'Nudge&Alert'` (c1fa197), so its button is Figma's small one (12 px label, 25 px tall) without any modes; before, it was the large M button unless the Context was passed. The ring and the nudge still share the colour modes, so Figma's gold ring with a white nudge needs a `nudgeSlot`.
- Layout: root padding 10, gap 32; ring wrapper a literal 320 × 320; dots 18 px on radius 151 (flush with the box); centre column (min width 116, gap 12): label 12 px, score 56 px 900 (line height 68), tier 16 px 700, wrapping with no line clamp, plus a 24 px chevron only when `onTierPress` is set (c1fa197; before, one line with an ellipsis and an always-shown chevron); footer row 16 tall, centred, text 12 px plus a 16 px info icon; nudge a literal 312 px wide, left-aligned. Natural width 340.
- `footerSlot` replaces the footer text and icon; `nudgeSlot` replaces the nudge and shows only with `showNudge`. Both receive `modes`. `disableTruncation` reaches only the footer text; the tier no longer truncates.
- Accessibility (c1fa197): the ring's `role="progressbar"` is an empty overlay beside the dots and the centre text, with `aria-valuenow` (the clamped score), `aria-valuemin` 0 and `aria-valuemax` 100, and no `aria-disabled` or `tabindex`. Its name is `accessibilityLabel`, else “<label>. <score> out of 100. <tier>” with the clamped score (150 reads “100 out of 100”). The label, score and tier are also exposed as text, so they are read twice; the footer is read as text after the ring. With `onTierPress` the tier row is a `<button>` outside the progressbar; Enter and a click each call it once. The root still carries “<label>. <score> out of 100. <tier>. <footer>” on an element with no role. The nudge button is named by its label (“Button” by default). Before c1fa197 the progressbar was always `aria-disabled="true"` with no value, held the tier button, and ignored `accessibilityLabel`.
- Modes that change it: AppearanceBrand, Semantic Intent (+ AppearanceSystem), Emphasis, Color Mode, Context, Button / Size and Button / State (nudge button), Border Boolean, Nudge padding. Reads `JFSThemeProvider`.
- Classification. Designer-configurable: the score, dot count, label, tier, footer text and icon, the nudge and its copy, a pressable tier, colour modes. System-driven: lit dots, the rounded score, truncation. Developer-only: `onTierPress`/`onPressNudgeButton` wiring, the slots, `style` and the `*Style` overrides, `disableTruncation`, `accessibilityLabel`.

## Browser measurements (Chrome, react-native-web 0.21.2, Light)

- With `Context: 'Nudge&Alert'`: 340 × 478 (ring 320 × 320, footer row 320 × 16, nudge 312 × 58); without the nudge it loses the nudge and one 32 px gap (388 tall, derived). Dots 18 × 18: 72 lights 18 of 24 `rgb(206,161,90)`, the rest `rgb(235,235,237)`; 36 lights 9, 64 lights 16, 0 lights none; 12 dots at 72 light 9. Secondary dots `rgb(93,0,181)`; Emphasis Medium `rgb(253,232,201)`.
- Text: label 12/15.6 400, score 56/68 900, tier 16/20.8 700 (all `rgb(8,13,26)`); footer 12/16 400 `rgb(13,13,15)`; nudge body 12/16 500; nudge button label 12 px 700.
- Root `aria-label` “Credit health. 72 out of 100. Doing great. Updated on 8 Oct 2026”, no role. Ring `role="progressbar"`, `aria-label` “Credit health. 72 out of 100. Doing great”, `aria-valuenow="72"`, `aria-valuemin="0"`, `aria-valuemax="100"`, no `aria-disabled` (13 October, c1fa197).
- With `onTierPress` the tier row is a `<button>` after the progressbar, and the chevron shows; without it the tier is plain text with no chevron. The nudge button calls `onPressNudgeButton`. Without `nudgeButtonLabel` the button reads “Button”.
- The default nudge has no close button since a116616 (#271, fixed). On c1fa197 it showed a 26 px close button (from the #206 Nudge change) that did nothing.
- Every Nudge logs “Variable VariableID:2892:386 not found”: `nudge/radius` aliases a variable missing from the packaged Coin Variables (token problem, noted on #251).
- The playground has no stage label: the rating fills the stage (350 px tall on mobile), and the label would sit on its footer or nudge.

## Limits

- Light only: in Dark the label, score, tier, footer text, and track dots keep their Light colours (literal tokens).
- Not shown: Dark, Emphasis Low, the slots, `style` overrides, `disableTruncation`, dot counts above 48.
- Not implied: colour or tier chosen from the score, animation, the footer or nudge being part of the ring's spoken name, a working close button on the default nudge.

## Coin gaps

- #252 (Component Fix, Done, published 13 October 2026 with c1fa197): the ring was always `aria-disabled` (so was a pressable tier inside it) with no value on the web; a custom `accessibilityLabel` and the footer never reached the spoken name, and the root label was unclamped; the chevron couldn't be hidden; no default Context for Figma's small nudge button. Fixed. Still open from it, for Marcin to judge: the label, score and tier are read twice; the ring and nudge share colour modes; 0.4 shows “0”; the story's dot count goes to 120; Figma's 26 fully lit dots and deprecated nudge.
- #271 (Component Fix; Mr. Biscuit): regression from the #206 Nudge change; the default nudge showed a close button that did nothing. Fixed in 7020bf9, published with a116616.
- #251 (Components, To do; Marcin, token problem): no Dark values for the ring text, track dots, and footer; Medium and Low dots vanish against the track; the “Defult” mode name; the broken `nudge/radius` alias.
- Related: #250 (CircularProgressBar has the same missing `aria-valuenow`).
