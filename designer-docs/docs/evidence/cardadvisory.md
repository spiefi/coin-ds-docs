# CardAdvisory source evidence

Package, Figma, and Storybook evidence for the Card Advisory guide (board ticket #1, Design documentation — Marcin; Storybook coverage — Biscuit, done).

## Checked

13 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-c1fa197` (Biscuit's `main` at c1fa197, 12 October). `CardAdvisory.tsx` is identical at c1fa197, 5990169 and Biscuit's newest `main` 7020bf9 (13 October, not in the mirror). 7020bf9 changes `Nudge.tsx` so Close shows only with `onClose` or `showClose` (#271), and rewrites `CardAdvisory.mdx`.

17 October 2026 (publishing #271): the docs now install mirror tag `v0.1.78-a116616` (Biscuit's `main` at a116616, 16 October), which contains 7020bf9. `CardAdvisory.tsx` is unchanged; `Nudge.tsx` shows Close only with `onClose` or `showClose`. Re-test on #271: `<CardAdvisory showNudge />` renders no `[aria-label="Close"]`. The guide's Close anatomy part is removed.

## Sources

- Package: `src/components/CardAdvisory/CardAdvisory.tsx` (292 lines, `React.memo`); export `CardAdvisory`, `CardAdvisoryProps` (`components/index.ts:27`). Composes `CircularProgressBar` (`state="Active"`), `Nudge` (`type="inline-compact"`) and `Icon ic_info`.
- Figma: [Coin Components Library · Card / Advisory](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3780-5784), node `3780:5784`: one component, 360 × 136, one property `Title` (text). Layers: main content (content › header › Title, Icon; description) and a 60 px Circular Progress Bar; below, an instance of the deprecated `Nudge Old do not use` (white, purple #5D00B5 sparkle, #303338 button, no close). Gold ring (#CEA15A). No variants or booleans.
- Storybook (published `index.json`): docs `components-cardadvisory--docs` (old generated page); stories `--default`, `--without-nudge`, `--custom-score`. Meta args: title Spending, description “Track your spending habits and stay within your budget.”, value 70, showInfoIcon, showNudge, nudgeBody “Data confidence is low, add more accounts for better insights.”, nudgeButtonLabel “Button”, modes `AppearanceBrand: Neutral, Context: Nudge&Alert, Slot gap: S`. `layout: 'centered'`, 20 px padding, white canvas. The published Storybook still builds the older Nudge (no Close).
- Biscuit's 7020bf9 `CardAdvisory.mdx` (handwritten, unpublished): “a score with a short reading and an optional nudge”; one score, one sentence, one next step; title one or two words; button is a verb (“Add accounts”); set `accessibilityLabel` to the score in words (“Spending score 70”); slots `titleEndSlot`, `progressSlot`, `nudgeSlot`; no pressed or disabled state.

## Contract

Props (`CardAdvisory.tsx:18-67, 184-207`): `title` ('Spending', one line unless `disableTruncation`), `description` (a default sentence; wraps, no clamp), `value` (70; the ring clamps 0–100), `valueLabel` (replaces the number in the ring), `showInfoIcon` (true), `showNudge` (true; also gates `nudgeSlot`), `nudgeBody`, `nudgeButtonLabel` ('Button'), `onPressNudgeButton`, `titleEndSlot`, `progressSlot`, `nudgeSlot` (all get `modes`), `modes`, `style`, `mainContentStyle`, `titleStyle`, `descriptionStyle`, `progressStyle`, `nudgeStyle`, `accessibilityLabel`, `disableTruncation` (title only), View props (`testID` on the root).

- Not forwarded: ring `supportText`/state, nudge `title`, `showClose`, `onClose`, `buttonSlot`.
- CardAdvisory passes neither `showClose` nor `onClose`. Since a116616 the Nudge shows Close only with one of them, so the card's nudge has no Close button (#271, fixed). Before that (c1fa197) it showed a Close that did nothing.
- Default accessible name on the root `div` (no role): `${title}. ${description}. ${round(value)} out of 100. ${nudgeBody}` — includes the nudge text when the nudge is hidden, a double period after a description ending in “.”, and the unclamped value.

## Modes and tokens

22 `cardAdvisory/*` literals in one-mode `CardAdvisory / Output`: width 360, padding 0, radius 0, background #FFFFFF, gap 16 (to the nudge), main row gap 16, content gap 6, header gap 8, title #0D0D0F 26/900 (line 32 in code via `safeTextLineHeight`), description #24262B 12/16/500, info icon #1A1C1F 18 px. No mode changes the card's own surface or text.

Modes reach the ring and the nudge:
- AppearanceBrand (Primary default): Primary gold arc #CEA15A, cream nudge #FEF4E5, gold sparkle and button; Neutral dark arc #303338, white nudge, #545961 sparkle, #303338 button (Storybook); Secondary purple; Tertiary blue. Track stays #EBEBED.
- Semantic Intent System + AppearanceSystem: positive green (arc #00773D, nudge #DBF0D9), warning orange, negative red; the track tints too.
- Emphasis: pales the arc and the nudge button. circularProgressBar Size M: 164 px ring. Border Boolean, Nudge padding: the nudge's border and padding. Context: the nudge button size (Nudge defaults to Nudge&Alert). Button / State: static restyles. Page type, Context2: only the Close icon. Slot gap, context 10, Profile Card Appearance, Button / Size: nothing visible.
- No mode combination reproduces Figma's white nudge with a purple sparkle.

## Web render

`div[data-testid][aria-label]` (360 wide, gap 16) › main row `div` › content `div` › header `div` › title `div[dir=auto]`, icon `div > svg`; description `div[dir=auto]`; then `div[role=progressbar]` (60 × 60, `aria-valuenow`) › svg + value `div[dir=auto]`; then the nudge `div[role=presentation]` › sparkle, body `div[dir=auto]`, `button[aria-label="<nudgeButtonLabel>"]` (no Close since a116616). `nudge/radius` is a dangling alias (falls back to 12).

## Discrepancies

- Close button: none since a116616, as in Figma and the published Storybook (c1fa197 showed a dead Close, #271, fixed).
- 7020bf9 mdx says the description is clamped and `disableTruncation` wraps description and nudge text; in code only the title is clamped and only the title is affected.
- Title line 32 in code vs 26 in Figma; main row about 70 vs 64.
- Figma's nudge is the retired “Nudge Old”; Code Connect maps it to `Nudge`.

## Hosting

Storybook centres the white card on a white canvas with 20 px padding, Neutral brand. The guide shows each card on the kit's white `Surface` (12 px padding) inside `FitWidth`, so the fixed 360 px card scales down on narrow screens instead of clipping.

## Limits

- Not shown: Dark, Emphasis, circularProgressBar Size, Context, Border Boolean, Nudge padding, Button / State, style props, `progressSlot` and `titleEndSlot` demos (named only).
- No pressed, focus or disabled state on the card; only the nudge button acts.
