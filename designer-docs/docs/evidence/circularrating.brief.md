# Circular Rating brief

slug: circularrating · label: Circular Rating · public API: CircularRating
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3741-1711 · storybook: docsUrl('circularrating') · stories: Default=components-circularrating--default, Without nudge=components-circularrating--without-nudge, Low rating=components-circularrating--low-rating
checked: 10 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-636f3f5, Biscuit's main 636f3f5)
icon: eight dots in a ring, six solid from 12 o’clock and two faint — `<><circle cx="9" cy="3" r="1.4" fill="currentColor" /><circle cx="13.24" cy="4.76" r="1.4" fill="currentColor" /><circle cx="15" cy="9" r="1.4" fill="currentColor" /><circle cx="13.24" cy="13.24" r="1.4" fill="currentColor" /><circle cx="9" cy="15" r="1.4" fill="currentColor" /><circle cx="4.76" cy="13.24" r="1.4" fill="currentColor" /><circle cx="3" cy="9" r="1.4" fill="currentColor" opacity="0.35" /><circle cx="4.76" cy="4.76" r="1.4" fill="currentColor" opacity="0.35" /></>`
keywords: score ring, credit score, dotted ring, rating ring, health score

Setup: `const BASE = { 'Color Mode': 'Light', Context: 'Nudge&Alert' } as Modes` on every CircularRating (Context Nudge&Alert gives the nudge Figma’s small button; the component sets no default). `const MEDIUM = { ...BASE, Emphasis: 'Medium' } as Modes`; `const SECONDARY = { ...BASE, AppearanceBrand: 'Secondary' } as Modes`; `noop = () => {}`.
Copy defaults for this guide: `label="Credit health"`, `footerText="Updated on 8 Oct 2026"`, `nudgeBody="Pay your card bill in full to raise your score"`, `nudgeButtonLabel="Pay now"`, `onPressNudgeButton={noop}`. “R(value, tier)” = `<CircularRating value={value} tierLabel={tier} label="Credit health" footerText="Updated on 8 Oct 2026" nudgeBody="Pay your card bill in full to raise your score" nudgeButtonLabel="Pay now" onPressNudgeButton={noop} modes={BASE} />` plus any props listed.
It is a fixed 340 px wide: wrap every CircularRating outside Anatomy in `<FitWidth>`. Use `showNudge={false}` where the brief says “no nudge”.
Selectors with `testID` and `R = byTestId(id)`: ring `${R} [role="progressbar"]`; dots layer `${R} [role="progressbar"] > div:first-child`; dot n `${dots} > div:nth-child(n)` (1 is 12 o’clock, clockwise; at 72 with 24 dots, 1–18 are lit); centre `${R} [role="progressbar"] > div:nth-child(2)`; label `${centre} > div:first-child > div:first-child`; score `${centre} > div:first-child > div:nth-child(2)`; tier row `${centre} > div:nth-child(2)`; footer `${R} > div:nth-child(2)`; nudge `${R} > div:nth-child(3)`. These come from a server render; confirm them with the browser test.

## Overview
summary: Use a Circular Rating to show a score out of 100, such as credit health, as a dotted ring with your verdict and one next step.
principle: A score, what it means, and what to do next.
playground: `.preview-stage` › `<FitWidth>` › R(score, TIER[score]) with `showNudge={nudge}` and `modes={colour === 'Secondary' ? SECONDARY : BASE}`. TIER = { 36: 'Needs attention', 72: 'Doing great', 100: 'Excellent' }. Controls: Segment "Score" `36 | 72 | 100` (72); Segment "Colour" `Primary | Secondary` (Primary); OnOff "Nudge" (on). Readout title "Read as", value “Credit health. 72 out of 100. Doing great” (score and tier follow the controls); note: "The tier and colour don’t follow the score: you set them. The footer and nudge aren’t part of this name." No stage label: the rating (388–478 px tall) fills the stage, and the label would sit on its footer or nudge.

## Anatomy
header: Anatomy · title: A dotted ring, the score, a footer, and a nudge · description: Twenty-four dots fill clockwise from 12 o’clock in step with the score. Inside sit a label, the score, and your tier with a chevron; below come a dated footer and an inline nudge.
specimen: `<Anatomy …>` › R(72, 'Doing great') with `testID="cr-anatomy"`.
parts:
1. Lit dots — 18 px dots in the ring’s colour; the share lit matches the score. — target: dot 4 — side: right
2. Track dots — Grey dots for the rest of the 100. — target: dot 22 — side: left
3. Label — 12 px; names the score. — target: label — side: top
4. Score — 56 px heavy; the score rounded, out of 100. — target: score — side: left
5. Tier — 16 px bold with a chevron; your verdict on the score. — target: tier row — side: right
6. Footer — 12 px with an info icon; when the score was updated. — target: footer text (`${footer} > [dir="auto"]`; the row is 320 wide with centred text) — side: left
7. Nudge — An inline nudge with one button for the next step. — target: nudge — side: bottom
If the survey reports overlapping pins, move a pin’s `at` before changing sides.

## Configuration
header: Configuration · title: Your words, the dots, and the nudge · description: You write the label, tier, footer, and nudge; the score comes from the value. Choose how many dots make the ring, and whether the footer icon and the nudge show.
Grid (two columns) of ExampleCards, each `<FitWidth>` › R(72, 'Doing great') plus:
- Without the nudge — "The score and its footer, when there’s no next step." — `showNudge={false}`
- Without the footer icon — "Just the update line." — `showNudge={false} showFooterIcon={false}`
- Fewer dots — "Twelve dots: each stands for more of the score. Past about 50 dots they overlap." — `showNudge={false} dotCount={12}`
- Tier opens details — "With onTierPress the tier row becomes a button, such as to open the score’s breakdown." — `showNudge={false} onTierPress={noop}`
- Colour — "Modes colour the dots and the nudge together: Secondary is purple." — `modes={SECONDARY}`

## States
header: States · title: No states of its own · description: The ring has no states, and neither its colour nor its tier follows the score. Pick the tier from the score yourself, and the colour with modes.
Grid `three` of ExampleCards, each `<FitWidth>` › R with `showNudge={false}`:
- Low score — "36 lights 9 dots. The tier is yours: “Needs attention”." — R(36, 'Needs attention')
- High score — "72 lights 18 dots, in the same colour." — R(72, 'Doing great')
- Empty — "At 0, only grey dots." — R(0, 'Not rated yet')

## Sizing
header: Sizing · title: A fixed 340 px wide · description: A Circular Rating doesn’t resize. The ring is 320 px with 18 px dots, inside 10 px of padding, and the nudge is 312 px; give it a column at least 340 px wide.
Measured diagram: `<Anatomy legend={false} marks={[{ kind: 'size', target: byTestId('cr-size'), side: 'right', label: 'both' }, { kind: 'size', target: `${byTestId('cr-size')} [role="progressbar"]`, side: 'left', label: 'both' }]}>` › R(72, 'Doing great') with `testID="cr-size"`. Measured 340 × 478; ring 320 × 320.

## Content
header: Content · title: Name the score, give a verdict, date it · description: Name the score in two or three words, such as “Credit health”. Write the tier as a short verdict that fits one line, start the footer with when it was updated, and give the nudge one action with a verb label, such as “Pay now”.
One ExampleCard "A complete rating" › `<FitWidth>` › R(64, 'Fair').

## In context
header: In context · title: Credit health with a next step · description: The screen passes the score and its tier, and wires both actions: the tier opens the score’s breakdown and Pay now opens the card bill.
Composition in `.coin-new-context`: `<FitWidth>` › R(64, 'Fair') with `onTierPress={() => setLast('Opens the score breakdown')}` and `onPressNudgeButton={() => setLast('Opens your card bill')}`. Below, `<p className="coin-new-readout" role="status">{last}</p>`, starting “Press the tier or Pay now”.

## Do & Don'ts
header: Do & Don’ts · title: Make the score mean something · description: Each pair shows a rating people can trust and act on versus one that misleads them.
Every preview is `<FitWidth>` › R.
- Do Write the tier for the score: A low score says “Needs attention”. — R(36, 'Needs attention') `showNudge={false}` | Don't Leave the default tier: The tier doesn’t follow the score, so 36 still says “Doing great”. — `<CircularRating value={36} label="Credit health" footerText="Updated on 8 Oct 2026" showNudge={false} modes={BASE} />`
- Do Name the nudge’s action: “Pay now” says what happens. — R(64, 'Fair') | Don't Leave the default button: It shows and is read as “Button”. — R(64, 'Fair') without `nudgeButtonLabel`
- Do Keep emphasis High: The lit dots stand out from the track. — R(72, 'Doing great') `showNudge={false}` | Don't Lower the emphasis: At Medium the lit dots have no contrast with the track (1.0:1). — the same with `modes={MEDIUM}`

## Sources
header: Sources · title: Use the public Circular Rating contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (5 October build) from the team’s private package repository. Figma has one Circular Rating component with no variants; the package builds it from Circular Progress Bar / Doted and an inline Nudge, and gives both one set of modes. Figma shows 26 dots, all lit, on a slightly smaller ring, with a white nudge; the package draws 24 dots lit by the score and colours the nudge with the ring. The nudge button matches Figma’s small size only with Context Nudge&Alert, which this guide sets. Screen readers hear the ring as a progress bar named by the label, score, and tier, without the footer and, on the web, without a separate value. With Color Mode Dark the text and grey dots keep their Light colours, so the guide shows Light only.

## Limits
Light only. Do not show Dark, Emphasis Low, the footer or nudge slots, `style` overrides, `disableTruncation`, or more than 48 dots. Do not imply that the colour or tier follows the score, that it animates, or that the footer and nudge are part of the ring’s spoken name.
