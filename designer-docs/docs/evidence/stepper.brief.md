# Stepper brief

slug: stepper · label: Stepper · public API: Stepper, Step (+ Card, VStack, Button for composition)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3228-457 · storybook: docsUrl('stepper') · stories: Default=components-stepper--default, Order tracking=components-stepper--order-tracking, Three steps=components-stepper--three-steps, Step complete=components-step--complete, Step error=components-step--error-state, Step warning=components-step--warning-state
checked: 8 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-636f3f5, Biscuit's main 636f3f5)
icon: two stage circles joined by a line, with text lines — `<circle cx="5" cy="4" r="2.2" fill="currentColor" /><path d="M5 6.7v4.6" stroke="currentColor" strokeWidth="1.5" /><circle cx="5" cy="14" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M10 4h6M10 14h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />`
keywords: progress steps, timeline, onboarding steps, order tracking

Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`; `<Stepper modes={LIGHT}>`. A stage's state sets both the glyph and the colour, always together:
`const STATE = { done: ['complete', 'complete'], current: ['number', 'active'], upcoming: ['number', 'inactive'], attention: ['warning', 'warning'], failed: ['error', 'error'] }` → `stage(s) = { status: STATE[s][0], modes: { ...LIGHT, 'Step Status': STATE[s][1] } as Modes }`, spread onto `<Step {...stage('done')} title=… supportingText=… metaText=… />`. Keep every Step a direct child of Stepper (Stepper numbers and connects its direct children; no Fragments or wrapper components).
KYC stages (title · supporting text · date when done):
1. Verify PAN · Match your PAN with your name · 2 Oct 2026
2. Add bank account · Link the account you’ll invest from · 3 Oct 2026
3. Add nominee · Choose who receives your investments · 4 Oct 2026
4. eSign · Sign the form with an Aadhaar OTP · 5 Oct 2026
Every stage carries a date line, as in Figma and the Storybook stories: done “Done 2 Oct 2026”, current (any outcome) “Started 5 Oct 2026”, upcoming “Due by 12 Oct 2026”. (Dating only done stages made the Dates toggle look broken at stages 1–2; review comment, 5 October 2026.)
Outcome text for the current stage (needs attention / failed): 1 “Your PAN name differs slightly from your bank name” / “PAN not found. Check the number and try again”; 2 “Add your account’s IFSC to continue” / “Account name doesn’t match your PAN”; 3 “Nominee’s date of birth is missing” / “Nominee details couldn’t be saved. Try again”; 4 “Your OTP expires in 2 minutes” / “OTP didn’t match. Request a new one”.
"KYC(current, outcome)": stages before `current` are done (with dates), the current one is current / attention / failed (outcome text replaces its supporting text), later ones upcoming. Hosts: `<div className="coin-new-host wide"><VStack modes={LIGHT} style={{ width: '100%' }}>…</VStack></div>` (without the full-width VStack the text does not wrap).
No `testID`. In an Anatomy specimen the Stepper is `:scope > div`; stage k is `S(k) = ':scope > div > div:nth-child(k)'`; its circle `${S(k)} > div:first-child > div:first-child`; connector `${S(k)} > div:first-child > div:nth-child(2)`; title, supporting text, date `${S(k)} > div:last-child > div > div:nth-child(1|2|3)`.

## Overview
summary: Use a Stepper to show where someone is in a process with several stages, such as KYC, and how each stage went.
principle: Every stage named, its state shown in colour, icon, and words.
playground: `.preview-stage` with a host holding KYC(current, outcome). Controls: Segment "Current stage" ['1', '2', '3', '4']; Segment "Outcome" ['In progress', 'Needs attention', 'Failed'] → the current stage’s state; OnOff "Dates" (default on) → the date line on every stage. Readout title "Progress", value "Stage 2 of 4: Add bank account"; note: "Stepper isn’t pressable. The screen sets each stage’s state." Stage label: "Live Coin Stepper".

## Anatomy
header: Anatomy · title: Stages joined by a line · description: Each stage pairs a 36 px indicator with its text. A 2 px connector links it to the next stage; the last stage has none.
specimen: Stepper with stage 1 done (with date), stage 2 current, stage 3 upcoming (titles and supporting text from the KYC list); specimenWidth 328
parts:
1. Indicator — Circle whose colour and icon show the stage’s state. — target: circle of S(1) — side: left
2. Connector — Links a stage to the next one. — target: connector of S(2) — side: left
3. Upcoming stage — Pale circle: not started yet. — target: circle of S(3) — side: bottom
4. Title — Names the stage. — target: title of S(1) — side: top
5. Date — When the stage finished, started, or is due. — target: date of S(1) — side: right
6. Supporting text — What the stage involves, or how it went. — target: supporting text of S(2) — side: right
If the survey reports overlapping pins, move a left pin to the bottom.

## Configuration
header: Configuration · title: Choose the text each stage shows · description: Every stage has a title. Add supporting text to say what the stage involves or how it went, and a date when timing matters, as on an order tracker.
Grid `coin-new-example-grid three`, each a host with stages 1 done, 2 current, 3 upcoming:
- Title only — titles only — lesson: Compact, for short processes whose titles say enough.
- Title and supporting text — add supporting text — lesson: Explains what each stage asks for.
- With dates — add supporting text and each stage’s date line — lesson: Shows when each stage finished, started, or is due.

## States
header: States · title: Five stage states · description: Each stage shows one state. In Figma, pick it with the Step Status mode; in code the stage’s status sets both its icon and its colour, so a check is always green.
Grid `coin-new-example-grid three`; each ExampleCard holds a host with a one-stage Stepper:
- Done — stage('done'), Verify PAN, “PAN details match your name” — lesson: Green circle with a check.
- Current — stage('current'), Add bank account, its supporting text — lesson: Purple circle with the stage number.
- Upcoming — stage('upcoming'), eSign, its supporting text — lesson: Pale lavender circle: not started.
- Needs attention — stage('attention'), Add nominee, “Nominee’s date of birth is missing” — lesson: Orange alert: the person must act to continue.
- Failed — stage('failed'), Add bank account, “Account name doesn’t match your PAN” — lesson: Red cross: say what went wrong.
(A one-stage Stepper numbers its stage 1; that is expected.)

## Sizing
header: Sizing · title: Full width, at least 52 px per stage · description: Stepper fills its container with 8 px on each side. Each stage is at least 52 px tall and grows when its text wraps; the connector grows with it. The indicator is 36 px, with 16 px to the text.
Measured diagram: `<Anatomy legend={false} specimenWidth={328} marks={[{ kind: 'size', target: S(1), side: 'right', label: 'both' }, { kind: 'size', target: circle of S(2), side: 'bottom', label: 'both' }, { kind: 'padding', target: ':scope > div' }]}>` with stages 1 done and 2 current (titles and supporting text). Expected labels: 312 × 52 and 36 × 36. (A circle mark on the side or a gap mark lands its label on a circle.)

## Content
header: Content · title: Name the stage, then say how it went · description: Titles name the stage in a few words, such as “Verify PAN”, not an action like “Click to verify”. Supporting text says what happens or what went wrong: the indicator only says that a stage failed or needs attention, not why.
One ExampleCard "Stage names and outcomes": a host with stage('done') Verify PAN “PAN details match your name”, stage('attention') Add nominee “Nominee’s date of birth is missing”, stage('upcoming') eSign “Sign the form with an Aadhaar OTP”.

## In context
header: In context · title: KYC progress on a card · description: The screen works out each stage’s state and updates the Stepper as the person moves on, and gives it a spoken name such as “KYC progress”. Stepper isn’t pressable, so the next action is a separate button. (The Stepper takes `accessibilityLabel="KYC progress"`.)
Composition in `.coin-new-context`: `<Card modes={LIGHT}>` › `<VStack modes={LIGHT} style={{ width: '100%' }}>` › KYC(current, 'In progress') starting at stage 2, then `<Button modes={LIGHT} label="Continue" onPress={…} />`. Continue marks the current stage done (“Done 5 Oct 2026”) and makes the next one current; after stage 4 every stage is done and the button label becomes “Start again”, which resets to stage 1. Below the card, `<p className="coin-new-readout" role="status">` with “Stage 2 of 4: Add bank account” or “All 4 stages done”.

## Do & Don'ts
header: Do & Don’ts · title: Make every stage readable · description: Each pair shows a stage people understand versus one that misleads them.
Every preview is a host (`coin-new-host wide`) with a Stepper.
- Do Match the icon and colour: A done stage shows a check on green. — stage('done') Verify PAN, “PAN details match your name” | Don't Put a check on purple: A check in the current colour reads as both done and in progress. — `<Step status="complete" modes={{ ...LIGHT, 'Step Status': 'active' }} title="Verify PAN" supportingText="PAN details match your name" />`
- Do Name each stage: “Verify PAN” and “Add bank account” say what happens. — stage('done') Verify PAN, stage('current') Add bank account | Don't Leave the default titles: “Stepper Item” tells people nothing. — stage('done') and stage('current') with no title (they show “Stepper Item”)
- Do Write the outcome: The text says what failed and what to fix. — stage('failed') Add bank account, “Account name doesn’t match your PAN” | Don't Rely on the icon: A red cross, or “Failed” read aloud, doesn’t say what went wrong or how to fix it. — stage('failed') Add bank account, no supporting text

## Sources
header: Sources · title: Use the public Stepper contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (5 October build) from the team’s private package repository. In Figma a stage’s Step Status mode sets both its colour and its icon; in code the stage’s <code>status</code> sets both, and an explicit Step Status mode overrides the colour. Stepper is vertical only and not interactive, and Figma’s numerals all read 1 while code numbers stages in order. On the web it is a list named by its accessibility label: each stage is read with its title, plus “Completed”, “Failed”, or “Needs attention”, and the first unfinished stage is marked as current. The icons themselves have no names, so the text must say what happened. The published Storybook predates 0.1.78, and its done, error, and warning examples show the icon on purple.

## Limits
Do not show Dark mode (#197), a horizontal Stepper, pressable stages, custom content inside a Step, `connectorStyle` or `style`, or a Stepper-level Step Status. Do not show a glyph with a mismatched colour except in the Don’t above. Do not imply that the icons are announced or that the status word explains what happened.
