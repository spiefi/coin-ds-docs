# CardInsight source evidence

Package, Figma, and Storybook evidence for the Card Insight guide (board ticket #113, Design documentation — Marcin; Storybook coverage — Biscuit, done: "Rewrote CardInsight to the handwritten outline. On GitHub main 7b7c79f0").

## c8526ae publish (23 October 2026, #284)

The docs now install mirror tag `v0.1.78-c8526ae` (Biscuit's `main` at c8526ae, 23 October). `CardInsight.tsx`, `SavingsGoalSummary` and `LinearProgress` changed in c7d3348 and c8526ae for #284 (verified 23 October, Penny run run_5a688e4d; closed by Marcin). Where this section differs from the sections below, it replaces them. Measured on this guide in headless Chrome (react-native-web 0.21.2, 1280 px):

- Default footer: an inline-compact Nudge with `footerBody` (default “One line of guidance.”) and a button labelled `footerButtonLabel` (default “Button”), which does nothing until `onPressFooter` is set. `onClose` / `showClose` reach its Close. An empty `footerButtonLabel` with no `onPressFooter` gives a footer with no button.
- Footer modes: `{ AppearanceBrand: 'Neutral', Context: 'Nudge&Alert', ...modes }`, for the default and for a custom `footer`. With no AppearanceBrand on the card the footer is grey with a dark button (`rgb(48, 51, 56)`); Secondary gives a purple button (`rgb(93, 0, 181)`) on a lavender footer, Tertiary blue (`rgb(3, 107, 153)`).
- Default caption “Credit usage” is black on the white card (`text/appearance/high/color`, re-test). Emphasis Low and Medium keep the bar's fill (`#cea15a` on `#fde8c9`, re-test).
- Divider: unset, it follows the footer; a passed `divider` (true or a node) stays when `footer={false}`.

Hosting now: the examples use the default footer with `footerBody="Add ₹10,000 a month to reach it by June."`, `footerButtonLabel="Set up"` and `onPressFooter`; the custom Nudge footer is gone. In context, after Set up the screen passes a new `footerBody`, `footerButtonLabel=""` and no `onPressFooter`, so the footer has no button. The figure is still a configured SavingsGoalSummary without a caption.

Guide changes: Anatomy description and Footer note; Configuration (the footer is grey until AppearanceBrand is set; Primary card); States (a passed divider stays); In context (onPressFooter, no button label after); Do & Don'ts “Rely on the default footer” → “Keep the default footer copy”; playground (default footer, onPressFooter; the divider note); Sources (23 October build; the default footer's placeholder copy and props; caption and fill fixed).

## Checked

19 October 2026: the docs now install mirror tag `v0.1.78-c7d3348` (Biscuit's `main` at c7d3348). Only #283 (System badge label) was published to this guide: with System intent the badge label is white, re-tested 19 October (Penny run run_43afbe70). c7d3348 also changes `CardInsight.tsx`, `SavingsGoalSummary` and `LinearProgress` for #284, which isn't fixed yet (back to In progress on 19 October: the default footer still has no button). The #284 facts below are still the 17 October ones, and this guide's #284 copy waits for #284.

17 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-a116616` (Biscuit's `main` at a116616, 16 October); `npm run coin:status` reports it up to date. `CardInsight.tsx`, `Nudge`, `SavingsGoalSummary`, `Badge`, `Divider` and `LinearProgress` are identical to Biscuit's `main`. Rendered in the docs' own Vite + react-native-web 0.21.2 build in headless Chrome.

## Sources

- Package: `src/components/CardInsight/CardInsight.tsx` (277 lines); export `CardInsight`, `CardInsightProps` (`components/index.ts:47`). Composes `Badge`, a slot defaulting to `SavingsGoalSummary label="Credit usage"`, `Divider`, and a footer defaulting to `Nudge type="inline-compact"` with `AppearanceBrand: Neutral, Context: Nudge&Alert` under the card's modes.
- Figma: [Coin Components Library · Card/Insight](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3702-17347), node `3702:17347`: one component, 356 × 322. Properties: `title` ("Emergency savings"), `subtitle` ("One line explanation here."), and the slot (a Savings Goal Summary). Badge (green `#00773d`, white "Label"), Divider and the footer (`Nudge Old do not use`: purple sparkle, body text, dark "Button") are fixed instances. Bar purple `#5d00b5` on `#ede7ff`, 16 px.
- Storybook (published `index.json`): docs `components-cardinsight--docs` (older generated page); stories `--default`, `--with-custom-savings-goal`, `--without-badge`, `--without-footer`, `--with-custom-footer`, `--without-divider`. Frame: 16 px padding on `#f0f0f3` grey, Light. The published build has an older Nudge, so its default footer shows text and a "Button"; the installed one doesn't. Storybook injects `onPress`.
- Biscuit's handwritten `CardInsight.mdx` (upstream, not the published page): one finding — a title, a line of context, a badge, a figure, and a footer hint; it doesn't navigate by itself. Title is the topic, subtitle one sentence, badge a short status ("On track") that doesn't repeat the title. Not a perk list (BenefitCard), not a coverage ring (CardFinancialCondition), not several insights in one card.

## Contract

Props (`:19-84`): `title` ('Emergency savings'), `subtitle` ('One line explanation here.'), `badge` (string → Badge, node, or `false`; default 'Label'), `children` (the figure; default SavingsGoalSummary), `footer` (node or `false`; default inline-compact Nudge), `divider` (node or boolean; shown only when there is a footer), `modes`, `style`, `onPress`, `disabled`, `accessibilityLabel`. No `testID`, no `...rest`.

- Title and subtitle wrap; the badge never truncates and squeezes the title column when long (measured).
- `footer={false}` removes the footer and the divider; `divider={false}` keeps the footer without the rule.
- A custom footer gets the card's modes only, not the default footer's Neutral: a Nudge footer takes the card's brand (Primary cream with a gold button).
- `onPress` makes the root a Pressable `role="button"` named `accessibilityLabel ?? title`; no pressed or disabled look.
- Width: none; the host owns it.

## Modes and tokens

`Card/Insight` (one mode): white, 1 px border `#ffffff`, radius 12, padding 16 / 12, gap 12, header gap 8, title 16/700 (line 20 in code), subtitle 12/400; card, title and subtitle don't change with modes.

- AppearanceBrand (Primary by default): badge, bar, legend dots, and a Nudge footer — Primary gold `#cea15a` on `#fde8c9`, Secondary purple `#5d00b5` on `#ede7ff` (Figma's bar), Tertiary blue, Neutral grey.
- Semantic Intent System + AppearanceSystem: badge, bar and footer take the status colour; the badge's label is white (`Emphasis/badge/high/fg`, since #283; before, it read the missing `Emphasis/badge/high/fg Copy` and rendered black).
- Emphasis Medium / Low: the bar's fill turns the same colour as its track, so the progress disappears (SavingsGoalSummary passes Emphasis to both).
- LinearProgress Size (SavingsGoalSummary defaults to L, 23 px; M is Figma's 16 px), Nudge padding, Border Boolean, Badge Size, Page type SubPage / context 8 Section (border `#ebebed`), context 10 (divider), Text Appearance (the % colour).

## Web render

Root `div` (padding 16 / 12, gap 12, border, radius 12) › header `div` (row) › text `div` (title `div[dir=auto]`, subtitle `div[dir=auto]`) + Badge `div`; slot `div` › SavingsGoalSummary; `div[role=presentation]` (divider); footer Nudge `div`. Measured in the guide at 356 px with its composition: 356 × 336.5 (gap 12).

## Discrepancies

- Default footer: the installed Nudge has no default text or button, and CardInsight passes none, so the default footer is an empty nudge with a lone sparkle. There's no prop for its text; a custom `footer` is needed. Reported.
- Default figure caption "Credit usage" (`text/appearance/medium/color`) is `#ffffff` in every mode: invisible on the white card, leaving an empty line. Reported.
- Emphasis Medium / Low hide the bar's fill (above). Reported.
- Badge: Figma green with a white label; code gold (Primary). System gives green with a white label (since #283).
- Bar: Figma purple, 16 px; code gold, 23 px.
- mdx says `footer={false}` keeps the divider if you pass one; code never shows the divider without a footer. mdx says the default nudge can show Close; CardInsight can't pass `onClose`.
- Figma 356 wide, 322 tall; code takes its host's width.
- Published Storybook shows an older Nudge footer and the older generated page.

## Hosting

Storybook frames the white card on light grey with 16 px padding, which the guide's grey stages match. Each card sits straight on the stage with `style={{ width: '100%', maxWidth: 356 }}` (Figma's width). The figure is a configured `SavingsGoalSummary` with no caption (as the With custom savings goal story does), and the footer is a `Nudge type="inline-compact"` with body text, because the default footer is empty.

## Tickets

- #284 (Component Bug, Biscuit): empty default footer; invisible default caption; Emphasis Medium / Low hide the bar's fill. Fixed on c8526ae, verified 23 October, published to the docs 23 October.
- #283 (Component Bug, Biscuit): Badge System + High label read a missing token (shared with Category Card). Fixed on c7d3348, verified 19 October, published to the docs 19 October.

## Limits

- Not shown: Dark, Semantic Intent System, Emphasis, LinearProgress Size, Nudge padding, Border Boolean, Badge Size, Page type, context 8 / 10, Text Appearance, the default footer and caption (named only), style props, `onPress` demos.
