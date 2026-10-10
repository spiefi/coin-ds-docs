# Circular Progress Bar source evidence

Package, Figma, Storybook, and browser evidence for the Circular Progress Bar guide (board ticket #120, Design documentation — Marcin; Storybook coverage — Biscuit).

## Checked

Checked 10 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-636f3f5` (Biscuit's `main` at 636f3f5); `npm run coin:status` reports the mirror and the docs up to date. `CircularProgressBar.tsx` is byte-identical to upstream (last changed 17 August, 014d8ea).

## Sources

- Figma: [Coin Components Library · Circular Progress Bar](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3446-5217), component set `3446:5217` with one variant property, `State` = `Inactive` | `Active` (both 60 × 60). Layers: `track`, `progress`, `wrap` › `subtitle` (hidden at S) + `value` (static “70”), and `ic_minus` (24 px) in Inactive. Size is the variable mode `circularProgressBar Size` (S 60, M 164), not a variant; the boolean variable `circularProgressBar/supportText` shows the subtitle at M. Variables: track `#ebebed`, progress `#cea15a` (Primary, High), foreground `#0d0d0f`, value 18/21/700 at S and 26/26/900 at M, support text 11/13/500, icon `#666666`. Instances on the page use Secondary (`#5d00b5`) and System positive (track `#dbf0d9`, arc `#00773d`). Measured from screenshots only, Figma's ring is about 15% of the size (9 px at S, about 24.6 px at M). The M instances `3973:2252` and `3973:2259` wrap “70” onto two lines and show placeholder “text”. CircularProgressBarDoted is a separate symbol (`3544:3178`).
- Storybook (published `index.json`, generated 15 September; the stories bundle matches 636f3f5): `components-circularprogressbar--docs`, `--default` (Active, 70, S, Primary High), `--inactive`, `--active`, `--all-states` (Inactive and Active side by side), `--with-support-text` (M, value 4/7 × 100, `valueLabel` “4 of 7”, `supportText` “Benefits availed”). Meta args start every story Active, although the component defaults to Inactive. Two stories set AppearanceSystem while Semantic Intent stays Brand, so it does nothing there. No story shows M Inactive, System intent, Dark, 0, or 100.

## Contract

- Export: `CircularProgressBar` and `CircularProgressBarProps` from the package root (`src/components/index.ts:103-106`). `CircularProgressBarState` isn't exported.
- Props (JSDoc in source): `value` (70; clamped 0–100), `state` (`'Inactive'` default, `'Active'`, or a boolean), `valueLabel`, `supportText`, `modes`, `style`, `trackStyle`, `progressStyle`, `valueStyle`, `supportTextStyle`, `accessibilityLabel`, `disableTruncation`, plus View props (`testID` lands on the root). No size, stroke, colour, children, or press props.
- `<CircularProgressBar value={70} />` renders Inactive: track and minus icon, value ignored.
- Renders one SVG: a full track circle and, in Active, a progress circle with round caps that starts at 12 o'clock and runs clockwise (`rotation -90`, dash offset `C × (1 − value/100)`). Active centres a column with optional support text (11 px 500) above the value (18 px 700 at S, 26 px 900 at M; `#0d0d0f`). Inactive centres a minus icon (24 px at S, 30 at M, `#666666`). No animation.
- Value text is `Math.round(value)` with no “%”; the arc uses the exact value (33.6 draws 33.6%, shows “34”). −20 → 0, 150 → 100. `NaN` renders “NaN” and a `NaN` dash offset. `valueLabel` replaces the text only.
- Support text shows only when a non-empty `supportText` is passed and the ring is Active; size M alone doesn't show it (unlike Figma).
- Size: mode `circularProgressBar Size` S (60) or M (164). Stroke is a fixed `8/60` of the size: 8 px at S, 21.87 px at M. Interior free diameter 44 px at S, about 120 at M. Text gets the full ring width, one line, ending in an ellipsis when too long (`disableTruncation` lets it wrap).
- Colour: the arc follows Semantic Intent × AppearanceBrand / AppearanceSystem × Emphasis × Color Mode (`semanticIntent/badge/bg`); the track is resolved with AppearanceBrand Neutral and Emphasis Medium forced, so it stays `#ebebed` for Brand intent and tints for System (positive `#dbf0d9`, warning `#ffe3d6`, negative `#ffe0de`). Light arc colours at High: Primary `#cea15a`, Secondary `#5d00b5`, Neutral `#303338`, Tertiary `#026b9a`, positive `#00773d`, warning `#be5301`, negative `#bc010c`. Contrast against the track: Primary High 1.99:1, Secondary 8.27:1, Neutral 10.65:1, Tertiary 4.94:1, positive 4.72:1, warning 3.89:1, negative 5.39:1; every Medium and Low arc is 1.00–1.22:1, and System Low is fully transparent.
- Modes: reads `JFSThemeProvider` and merges the `modes` prop over it.
- Accessibility: root `accessibilityRole="progressbar"`, `accessibilityValue {min 0, max 100, now}`, label `accessibilityLabel` or “70 out of 100”, “<supportText>, 70 out of 100”, or “Inactive progress”. On the web (react-native-web 0.21.2) the object `accessibilityValue` isn't translated, so the root has `role` and `aria-label` but no `aria-valuenow/min/max`. With a `valueLabel` the default name reads “Benefits availed, 4 of 7 out of 100”.
- Hosts in the package: CardFinancialCondition (forwards `value`, `progressState`, `valueLabel`, `modes`; `progressSlot` replaces the ring), CardAdvisory, CoverageRing (locks M and passes its own label).
- Classification. Designer-configurable: State, Size, the colour modes, support text, a value label. System-driven: the arc length and the number (from `value`), the track colour, truncation. Developer-only: `style`, `trackStyle`, `progressStyle`, `valueStyle`, `supportTextStyle`, `disableTruncation`, `accessibilityLabel` wiring.

## Browser measurements (Chrome, react-native-web 0.21.2, Light)

- S: 60 × 60, stroke 8, track `rgb(235,235,237)`, arc `rgb(206,161,90)` with round caps; value “70” 18/22 700 `rgb(13,13,15)`. M: 164 × 164, stroke 21.87; support text 11/14 500, value 26/32 900.
- Secondary arc `rgb(93,0,181)`; System positive arc `rgb(0,119,61)` on track `rgb(219,240,217)`; Emphasis Medium arc `rgb(253,232,201)`.
- At 0 only the track and “0” show (no cap dot); at 100 the ring closes. Inactive draws the track and a minus icon.
- Every ring is `role="progressbar"` with `aria-label` (“70 out of 100”, “Savings goal, 70 out of 100”, “Inactive progress”, “Benefits used, 4 of 7 out of 100” without a custom label) and no `aria-valuenow/min/max`.
- `<CircularProgressBar value={70} />` renders Inactive.
- In CardFinancialCondition (Neutral by default) the ring is Inactive before the check and, after it, Active at 62 with a dark grey (Neutral) arc, named “62 out of 100”.

## Limits

- Light only: with Color Mode Dark the track, value text, and icon keep their Light colours (literal tokens), and only the arc changes.
- Not shown: Dark, Emphasis Low, `style` and the `*Style` overrides, `disableTruncation`, CircularProgressBarDoted.
- Not implied: animation, interaction, or a value announced separately from the name on the web.

## Coin gaps

- #250 (Component Fix, To do, Component Bug; Mr. Biscuit): no `aria-valuenow/min/max` on the web; a `valueLabel` is read as “4 of 7 out of 100”; `NaN` shows “NaN”; Inactive still reports a value on native; stories start Active while the component defaults to Inactive. Also lists the Figma ring thickness and Size-driven support text to confirm.
- #251 (Components, To do; Marcin, token problem): no Dark values for the text, icon, and track tokens; Medium and Low arcs vanish against the track (System Low is transparent); Primary High is 1.99:1.
