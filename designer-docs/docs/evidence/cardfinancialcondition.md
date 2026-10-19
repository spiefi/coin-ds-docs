# CardFinancialCondition source evidence

Package, Figma, and Storybook evidence for the Card Financial Condition guide (board ticket #65, Design documentation — Marcin; Storybook coverage — Biscuit, done: "Rewrote CardFinancialCondition to the handwritten outline. On GitHub main 7b7c79f0").

## Checked

19 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-c7d3348` (Biscuit's `main` at c7d3348), which fixes #285: the button is always Context CTACard, and the default spoken name comes from the new `financialConditionName.ts`. Re-tested in headless Chrome (react-native-web 0.21.2) at 1280 and 390 px on 19 October (Penny run run_43afbe70), and measured again in the guide while publishing.

First checked 17 October 2026 against mirror tag `v0.1.78-a116616` in the docs' own Vite + react-native-web 0.21.2 build.

## Sources

- Package: `src/components/CardFinancialCondition/CardFinancialCondition.tsx` (375 lines, `React.memo`); export `CardFinancialCondition`, `CardFinancialConditionProps` (`components/index.ts:44-46`). Composes `CircularProgressBar`, `Nudge` (`inline-compact`, a Text child), `Divider` and `Button`.
- Figma: [Coin Components Library · Card/FinancialCondition](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3600-3177), node `3600:3177`: one component, 343 × 181, no properties. Layers: header (title "Protection", body "Check your coverage and gaps", a 60 px Inactive Circular Progress Bar), the retired `Nudge Old do not use` (`stacked-prominent`, purple `#5D00B5` sparkle, two lines), Divider, Button "View Details" (14/22, padding 16 × 4, 32 px tall, purple). Code Connect maps it to `<CardFinancialCondition />` and nests the parts as children.
- Storybook (published `index.json`): docs `components-cardfinancialcondition--docs` (older generated page); stories `--default`, `--active-progress`, `--without-nudge`, `--without-divider`, `--with-custom-progress-slot`, `--long-content`. Every story: `layout: centered`, a 360 px wrapper with 20 px padding (card 320 px) on white, modes Neutral / Nudge&Alert / Nudge padding None / Light.
- Biscuit's handwritten `CardFinancialCondition.mdx` (upstream, not the published page): a coverage summary — title, short reading, a circular score, an advisory, one action; it doesn't calculate the score. Title is the topic, body one line, nudge up to two lines, button a verb. Set `accessibilityLabel` to include the score. Not for multi-series charts, benefit lists, or a score with no reading and no action.

## Contract

Props (`:26-67`, defaults `:252-274`): `title` ('Protection'), `body` ('Check your coverage and gaps'), `value` (0; the ring clamps 0–100), `progressState` ('Inactive' | 'Active' | boolean; default 'Inactive'), `valueLabel` (replaces the number in the ring), `showNudge` (true; also gates `nudgeSlot`), `nudgeBody` (two default lines; `\n` breaks), `showDivider` (true), `showButton` (true; also gates `buttonSlot`), `buttonLabel` ('View Details'), `onPressButton`, `progressSlot`, `nudgeSlot`, `buttonSlot` (slots get the card's modes; `buttonSlot` gets the button modes), `modes`, `style`, `headerStyle`, `titleStyle`, `bodyStyle`, `accessibilityLabel` (default `financialConditionName(title, body, value, valueLabel)`: "Protection, 72 out of 100. Check your coverage and gaps", or `valueLabel` in place of "72 out of 100", with no doubled period; before #285 it was `${title}. ${body}.`), and View props on the root (`testID` works). The default ignores `progressState`, so an Inactive card still reads the value (#350; measured: the guide's Inactive Don't reads "Protection, 72 out of 100. …"). `financialConditionName` is also exported.

- Not a pressable card: only the button acts. No disabled or loading for the button; no nudge title, button or close.
- Inactive draws the track with a dash; Active draws the arc and the rounded value (or `valueLabel`).
- Title, body and nudge wrap; nothing is truncated.

## Modes and tokens

Card defaults `AppearanceBrand: Neutral`, `Context: Nudge&Alert`, `Nudge padding: None` (`:72-76`), then the theme, then `modes`. The button always gets `AppearanceBrand: Secondary` and `Context: CTACard` (`:295-298`, since #285); the nudge keeps the card's Context.

- Card tokens (`FinancialConditionCard / Output`, one mode): white, radius 16, padding 16, gap 8, header gap 16, text gap 8, title 16/700 (line 20 in code, 18 in Figma), body 14/17/400. No mode changes them.
- AppearanceBrand: ring arc and nudge — Neutral `#303338` arc, white nudge, grey `#545961` sparkle; Primary gold arc, cream nudge; Secondary purple; Tertiary blue. Track stays `#EBEBED`. Button stays purple.
- Semantic Intent System + AppearanceSystem: ring, nudge and button take the status colour (positive green, warning orange, negative red). AppearanceSystem alone does nothing.
- Emphasis Medium / Low: paler button and arc.
- Context: no longer changes the button, which is always CTACard: 14/22, padding 16 × 4, gap 4, 32 px (Figma's values; measured 121 × 32 with "View details"). Before #285 the card's Nudge&Alert default made it 25 px with 12 px text.
- circularProgressBar Size M: 164 px ring. Nudge padding Default: 12 px nudge padding. Border Boolean: nudge border. context 10 jioPlus: divider colour. Button / State: a static button restyle. Page type, Context2, Slot gap, Profile Card Appearance: nothing visible.

## Web render

Root `div[data-testid][aria-label]` (padding 16, gap 8) › header `div` (row) › text `div` (title `div[dir=auto]`, body `div[dir=auto]`) + `div[role=progressbar]` 60 × 60; then the nudge `div`; `div[role=presentation]` (divider); `div` › `button[role=button]`. Measured in the guide at 343 px on c7d3348: 343 × 183 with all parts (padding 16, text-to-ring gap 16; 176 before #285 with the 25 px button). At 390 px the card is 316 × 201.

## Discrepancies

- Button size: matches Figma's 32 px since #285.
- Sparkle: Figma's retired nudge has a purple sparkle on white; no mode reproduces it (Neutral gives a grey sparkle on white, as in Storybook).
- Figma shows only the Inactive ring and has no properties; code adds the props, booleans and slots above.
- Figma is 343 wide; code takes its host's width (Storybook 320).
- Default spoken name: includes the score since #285, with no "..", but also on an Inactive card (#350).
- Published Storybook docs page is the older generated one (lists collection defaults Primary / Default / Default, not the card's Neutral / Nudge&Alert / None).

## Hosting

Storybook shows the white card on white inside a 360 px frame. The guide puts the card straight on the grey example stages, where the white card reads as a card on a screen, with `style={{ width: '100%', maxWidth: 343 }}` (Figma's width) so it fills narrow screens and stops at 343 on wide ones. Examples rely on the default spoken name, except Inactive cards, which pass `accessibilityLabel: 'Protection. No score yet'` (#350). The Sizing section no longer compares two Contexts.

## Tickets

- #285 (Component Bug, Biscuit): default Context made the button 25 px against Figma's 32 px; default spoken name had no score. Fixed on c7d3348, verified 19 October, published to the docs 19 October.
- #350 (Component Bug, Biscuit; regression from the #285 fix, filed 19 October while publishing): an Inactive card's default spoken name reads a score the ring doesn't show.

## Limits

- Not shown: Dark, circularProgressBar Size, Nudge padding, Border Boolean, Button / State, context 10, style props, slot demos (named only).
- No pressed, focus or disabled state on the card.
