# Circular Rating source evidence

Package, Figma, Storybook, and browser evidence for the Circular Rating guide (board ticket #141, Design documentation — Marcin; Storybook coverage — Biscuit).

## Checked

Checked 10 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-636f3f5` (Biscuit's `main` at 636f3f5); `npm run coin:status` reports the mirror and the docs up to date. `CircularRating.tsx` (last changed 1 September, 62372b0) and `CircularProgressBarDoted.tsx` are identical to upstream.

## Sources

- Figma: [Coin Components Library · Circular Rating](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3741-1711), one component (no variant set), 340 × 476: `Circular Progress Bar / Doted` (320 × 320, at 10,10) with `scoreDisplay` (`scoreTier` › `label`, `scoreLabel`; `Score trend` › `tierLabel`, `ic_chevron_right`), a footer frame named `name needed` (320 × 16: text and a 16 px icon), and an instance of the deprecated `Nudge Old do not use ⛔️🔥` (320 × 56). Variables match the package tokens (dots 6 + 6 = 18 px, track `#EBEBED`, progress `#CEA15A`, score 56/56/900, tier 16/20.8/700, label 12/15.6/400, text `#080D1A`, footer 12/16 `#0D0D0F`, gap 32, padding 10), with a white nudge (`#FFFFFF`, purple sparkle `#5D00B5`, dark button `#303338`, 12 px label). Figma draws 26 dots, all lit at “72”, with centres about 138 px out (12 px inside the 320 box). Component properties and instance modes weren't readable with the read-only tools allowed.
- Storybook (published `index.json`; the MDX chunk matches 636f3f5): `components-circularrating--docs`, `--default`, `--without-nudge`, `--low-rating` (36, “Needs attention”, “Updated today”). Meta args: 72, 24 dots, “Rating”, “Doing great”, “Updated on 1 March”, the nudge on, `AppearanceBrand: Neutral`, `Context: Nudge&Alert`, `Slot gap: S`. `onTierPress` is an action argType, so every story's tier row is a button. The MDX lists 15 mode collections (5 do nothing: Slot gap, context 10, Context2, Page type, Profile Card Appearance) and has no anatomy, accessibility, or usage guidance. No story shows System colours, Dark, other dot counts, or the slots.

## Contract

- Export: `CircularRating` and `CircularRatingProps` from the package root (`src/components/index.ts:111`). It composes `CircularProgressBarDoted` (ring, label, score, tier), a footer row, and `Nudge type="inline-compact"`. It shares no code with `CircularProgressBar`.
- Props (JSDoc in source): `value` (72; clamped 0–100), `dotCount` (24), `label` (“Rating”), `tierLabel` (“Doing great”), `footerText` (“Updated on 1 March”), `showFooterIcon` (true), `showNudge` (true), `nudgeBody` (“Split this transaction into installments”), `nudgeButtonLabel` (“Button”), `onPressNudgeButton`, `onTierPress`, `footerSlot`, `nudgeSlot`, `modes`, `style`, `ratingStyle`, `footerStyle`, `footerTextStyle`, `nudgeStyle`, `accessibilityLabel`, `disableTruncation`, plus View props (`testID` on the root). No max, size, format, or centre-slot props; Doted's `showChevron`, `onPress`, `children`, and style props aren't forwarded.
- Score text is `Math.round(value)`, out of a fixed 100, no “%”. Lit dots = `ceil(value / 100 × dotCount)` (0 lights none; any value above 0 lights at least one), filling clockwise from 12 o'clock. 72 of 24 lights 18. `NaN` shows “NaN”. Dots overlap from about 53.
- Neither the colour nor the tier follows the value: `tierLabel` is free text and the dot colour comes only from modes (`circularProgressBarDoted/progressDot/bg` → `semanticIntent/badge/bg`). The track dots are a literal `#EBEBED`. The ring and the default nudge share one `modes` object.
- Colours (Light): bare Primary gold dots `#CEA15A` with a cream nudge `#FEF4E5` and gold button; Neutral `#303338` with a white nudge; Secondary `#5D00B5`; Tertiary `#026B9A`; System positive `#00773D`, warning `#BE5301`, negative `#BC010C`. Contrast with the track: Primary High 1.99:1, Medium 1.00:1, Low 1.09:1; Neutral 10.65:1, Secondary 8.27:1.
- The nudge button is the large M button unless `Context: 'Nudge&Alert'` is passed (then 12 px label, 12 × 4 padding, as in Figma). The component sets no default modes.
- Layout: root padding 10, gap 32; ring wrapper a literal 320 × 320; dots 18 px on radius 151 (flush with the box); centre column (min width 116, gap 12): label 12 px, score 56 px 900 (line height 68), tier 16 px 700 on one line with ellipsis plus an always-shown 24 px chevron; footer row 16 tall, centred, text 12 px plus a 16 px info icon; nudge a literal 312 px wide, left-aligned. Natural width 340.
- `footerSlot` replaces the footer text and icon; `nudgeSlot` replaces the nudge and shows only with `showNudge`. Both receive `modes`. `disableTruncation` reaches only the footer text.
- Accessibility: the root carries `accessibilityLabel` or “<label>. <value> out of 100. <tier>. <footer>” (unclamped: 150 reads “150 out of 100”) on an element with no role. The inner ring is `role="progressbar"`, named “<label>. <score> out of 100. <tier>”, always `aria-disabled="true"` and `tabindex="-1"`, with no `aria-valuenow/min/max` on the web. A custom `accessibilityLabel` changes only the root's. With `onTierPress` the tier row is a `<button>` inside the progressbar. The nudge button is named by its label (“Button” by default).
- Modes that change it: AppearanceBrand, Semantic Intent (+ AppearanceSystem), Emphasis, Color Mode, Context, Button / Size and Button / State (nudge button), Border Boolean, Nudge padding. Reads `JFSThemeProvider`.
- Classification. Designer-configurable: the score, dot count, label, tier, footer text and icon, the nudge and its copy, a pressable tier, colour modes. System-driven: lit dots, the rounded score, truncation. Developer-only: `onTierPress`/`onPressNudgeButton` wiring, the slots, `style` and the `*Style` overrides, `disableTruncation`, `accessibilityLabel`.

## Browser measurements (Chrome, react-native-web 0.21.2, Light)

- With `Context: 'Nudge&Alert'`: 340 × 478 (ring 320 × 320, footer row 320 × 16, nudge 312 × 58); without the nudge it loses the nudge and one 32 px gap (388 tall, derived). Dots 18 × 18: 72 lights 18 of 24 `rgb(206,161,90)`, the rest `rgb(235,235,237)`; 36 lights 9, 64 lights 16, 0 lights none; 12 dots at 72 light 9. Secondary dots `rgb(93,0,181)`; Emphasis Medium `rgb(253,232,201)`.
- Text: label 12/15.6 400, score 56/68 900, tier 16/20.8 700 (all `rgb(8,13,26)`); footer 12/16 400 `rgb(13,13,15)`; nudge body 12/16 500; nudge button label 12 px 700.
- Root `aria-label` “Credit health. 72 out of 100. Doing great. Updated on 8 Oct 2026”, no role. Ring `role="progressbar"`, `aria-label` “Credit health. 72 out of 100. Doing great”, `aria-disabled="true"`, `tabindex="-1"`, no `aria-valuenow`.
- With `onTierPress` the tier row is a `<button>` inside the disabled progressbar; Playwright reports it “not enabled”, but a mouse press calls `onTierPress`. The nudge button calls `onPressNudgeButton`. Without `nudgeButtonLabel` the button reads “Button”.
- Every Nudge logs “Variable VariableID:2892:386 not found”: `nudge/radius` aliases a variable missing from the packaged Coin Variables (token problem, noted on #251).
- The playground has no stage label: the rating fills the stage (350 px tall on mobile), and the label would sit on its footer or nudge.

## Limits

- Light only: in Dark the label, score, tier, footer text, and track dots keep their Light colours (literal tokens).
- Not shown: Dark, Emphasis Low, the slots, `style` overrides, `disableTruncation`, dot counts above 48.
- Not implied: colour or tier chosen from the score, animation, the footer or nudge being part of the ring's spoken name.

## Coin gaps

- #252 (Component Fix, To do, Component Bug; Mr. Biscuit): the ring is always `aria-disabled` (so is a pressable tier inside it) and has no value on the web; a custom `accessibilityLabel` and the footer never reach the spoken name, and the root label is unclamped; the chevron can't be hidden; no default Context for Figma's small nudge button; Figma's 26 fully lit dots and deprecated nudge.
- #251 (Components, To do; Marcin, token problem): no Dark values for the ring text, track dots, and footer; Medium and Low dots vanish against the track; the “Defult” mode name; the broken `nudge/radius` alias.
- Related: #250 (CircularProgressBar has the same missing `aria-valuenow`).
