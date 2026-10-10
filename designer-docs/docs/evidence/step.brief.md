# Step brief

slug: step · label: Step · public API: Step, StepLabel (+ Stepper as the list; Card, VStack, HStack, Button for composition)
figma: https://www.figma.com/design/dSlK8ueQ7wlbyUSZd4f8QO/Coin-Subcomponents?node-id=27-854 · storybook: docsUrl('step') · stories: Default=components-step--default, Complete=components-step--complete, Error=components-step--error-state, Warning=components-step--warning-state, Last step=components-step--last-step, Custom slot=components-step--custom-slot
checked: 10 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-636f3f5, Biscuit's main 636f3f5)
icon: one stage circle with a line below it and two text lines — `<><circle cx="5" cy="5" r="2.75" stroke="currentColor" strokeWidth="1.5" /><path d="M5 8.5v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M10 4h6M10 7h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>`
keywords: stepper item, stage, timeline item, progress step

Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`; `const BTN = { 'Color Mode': 'Light', 'Button / Size': 'S' } as Modes`; `const CARD = { 'Color Mode': 'Light', AppearanceBrand: 'Neutral' } as Modes`; `noop = () => {}`. A stage’s state sets the glyph and the colour together: `const STATE = { current: ['number', 'active'], upcoming: ['number', 'inactive'], done: ['complete', 'complete'], attention: ['warning', 'warning'], failed: ['error', 'error'] }` → `stage(s) = { status: STATE[s][0], modes: { ...LIGHT, 'Step Status': STATE[s][1] } as Modes }`, spread onto `<Step {...stage('done')} … />`.
Steps sit in `<Stepper modes={LIGHT}>` (it numbers them, marks the current one, and drops the last connector) unless the brief says “standalone”; keep every Step a direct child. Host = `<div className="coin-new-host wide"><VStack modes={LIGHT} style={{ width: '100%', padding: 0 }}>{children}</VStack></div>` (the text doesn’t wrap without the full-width VStack); “narrow Host” uses `coin-new-host narrow`.
Copy: Verify PAN — current/upcoming “Match your PAN with your name”, done “PAN details match your name”, attention “Your PAN name differs slightly from your bank name”, failed “PAN not found. Check the number and try again”; dates: done “Done 2 Oct 2026”, current/attention/failed “Started 5 Oct 2026”, upcoming “Due by 12 Oct 2026”. Add bank account — “Link the account you’ll invest from”.
Selectors for a standalone Step with `testID` and `R = byTestId(id)`: circle `${R} > div:first-child > div:first-child`; glyph `${circle} > div`; connector `${R} > div:first-child > div:nth-child(2)`; title, supporting text, date `${R} > div:last-child > div > div:nth-child(1|2|3)`.

## Overview
summary: Use a Step for one stage of a process inside a Stepper, such as Verify PAN, with its number or outcome and a line of detail.
principle: One stage: its name, its state, and what happened.
playground: `.preview-stage` › Host › Stepper with `<Step {...stage(state)} title="Verify PAN" supportingText={support ? copy : undefined} metaText={date ? date : undefined} />` and `<Step {...stage('upcoming')} title="Add bank account" supportingText="Link the account you’ll invest from" />`. Controls: Segment "State" `Current | Done | Attention | Failed` (default Current; the second stage already shows Upcoming, and five options don’t fit the controls panel; review, 10 October); OnOff "Supporting text" (on); OnOff "Date" (on). Readout title "Read as", value “Verify PAN” (Current), “Verify PAN, Completed”, “Verify PAN, Needs attention”, or “Verify PAN, Failed”; note: "Screen readers hear the title and the outcome, not the supporting text or the date." Stage label: "Live Coin Step".

## Anatomy
header: Anatomy · title: An indicator, a connector, and three lines of text · description: A 36 px circle shows the stage’s number or outcome, and a 2 px connector runs down to the next stage. Beside them sit the title, a line of supporting text, and a date.
specimen: `<Anatomy specimenWidth={312} …>` › standalone `<Step testID="step-anatomy" {...stage('current')} title="Verify PAN" supportingText="Match your PAN with your name" metaText="Started 5 Oct 2026" />` (standalone so the connector shows).
parts:
1. Indicator — 36 px circle; its colour shows the state. — target: circle — side: left
2. Glyph — The stage number, or a check, cross, or alert. — target: glyph — side: top
3. Connector — A 2 px line to the next stage. — target: connector — side: bottom
4. Title — 14 px bold; names the stage. — target: title — side: right
5. Supporting text — 12 px; what the stage involves or how it went. — target: supporting text — side: right
6. Date — 10 px bold; when it finished, started, or is due. — target: date — side: bottom
If the survey reports overlapping pins, move a pin on the circle to another side.

## Configuration
header: Configuration · title: The text lines, custom content, and the connector · description: Every Step has a title. Add supporting text and a date when they help, or replace the text with your own content. Stepper hides the connector on the last stage.
Grid `coin-new-example-grid`, each an ExampleCard › Host:
- Title only — Stepper › `<Step {...stage('current')} title="Verify PAN" />` — lesson: Compact, when the title says enough.
- With supporting text — add “Match your PAN with your name” — lesson: Says what the stage involves or how it went.
- With a date — add the supporting text and “Started 5 Oct 2026” — lesson: When the stage finished, started, or is due.
- Custom content — Stepper › `<Step {...stage('current')} title="Upload Form 16"><StepLabel title="Upload Form 16" supportingText="Add the PDF from your employer" /><HStack modes={LIGHT}><Button label="Upload" onPress={noop} modes={BTN} /></HStack></Step>` then `<Step {...stage('upcoming')} title="Review and submit" />` — lesson: Children replace the text block; the row and its connector grow. Keep the title prop: it’s what screen readers hear.
- Connector off — standalone `<Step {...stage('done')} title="Verify PAN" supportingText="PAN details match your name" showLine={false} />` — lesson: Stepper turns it off on the last stage; turn it off on a Step you place yourself.

## States
header: States · title: Five stage states · description: A Step’s status sets its glyph and colour together; an upcoming stage needs the Step Status mode set to inactive. An explicit Step Status always wins, so keep it matched to the status.
Grid `coin-new-example-grid three`; each ExampleCard › Host › a one-Step Stepper:
- Current — stage('current'), Add bank account, “Link the account you’ll invest from” — lesson: Purple with the stage number.
- Upcoming — stage('upcoming'), eSign, “Sign the form with an Aadhaar OTP” — lesson: Pale lavender: not started.
- Done — stage('done'), Verify PAN, “PAN details match your name” — lesson: Green with a check; read as “Completed”.
- Needs attention — stage('attention'), Add nominee, “Nominee’s date of birth is missing” — lesson: Orange alert; read as “Needs attention”.
- Failed — stage('failed'), Add bank account, “Account name doesn’t match your PAN” — lesson: Red cross; read as “Failed”.
(A one-Step Stepper numbers its stage 1; that is expected.)

## Sizing
header: Sizing · title: At least 52 px, growing with its text · description: A Step fills its column and is at least 52 px tall. The indicator is 36 px with 16 px to the text; the connector is 2 px wide, starts 2 px under the circle, and stretches when the text wraps.
Measured diagram: `<Anatomy legend={false} specimenWidth={312} marks={[{ kind: 'size', target: R, side: 'right', label: 'both' }, { kind: 'size', target: circle, side: 'bottom', label: 'both' }]}>` › standalone `<Step testID="step-size" {...stage('current')} title="Verify PAN" supportingText="Match your PAN with your name" metaText="Started 5 Oct 2026" />`. Expected 312 × 52 and 36 × 36.
Then ExampleCard "Long text wraps" (description: "The title and supporting text wrap, and the row and connector grow with them.") › narrow Host › Stepper › `<Step {...stage('current')} title="Upload Form 16 and match your employer’s TAN" supportingText="The name on Form 16 must match your PAN and the employer details you saved." metaText="Started 5 Oct 2026" />`, `<Step {...stage('upcoming')} title="Review and submit" />`.

## Content
header: Content · title: Name the stage, then say how it went · description: Write the title as the stage in a few words, such as “Verify PAN”, not an action. Use the supporting text for what happens or what went wrong, and the date for when. The glyph only says that a stage failed, not why.
One ExampleCard "Stage names and outcomes" › Host › Stepper › stage('done') Verify PAN “PAN details match your name”, stage('attention') Add nominee “Nominee’s date of birth is missing”, stage('upcoming') eSign “Sign the form with an Aadhaar OTP”.

## In context
header: In context · title: Uploading Form 16 while filing ITR · description: The current stage holds its own Upload button. Uploading marks the stage done, and the screen moves the current stage on.
Composition in `.coin-new-context`: `<Card modes={CARD}>` › `<Card.Title>File your ITR</Card.Title>` › `<VStack modes={LIGHT} style={{ width: '100%' }}>` › `<Stepper modes={LIGHT} accessibilityLabel="ITR progress">`: stage('done') Verify PAN “PAN details match your name” “Done 2 Oct 2026”; Upload Form 16 — while current: the Custom content Step with `onPress` uploading; after upload: stage('done') `title="Upload Form 16" supportingText="Form 16 added" metaText="Done 10 Oct 2026"`; Review and submit — upcoming “Check your income and file”, current after upload. Then `<Button label="Start again" onPress={reset} modes={LIGHT} />` (shown after upload). Below the card, `<p className="coin-new-readout" role="status">`: “Stage 2 of 3: Upload Form 16”, then “Stage 3 of 3: Review and submit”.

## Do & Don'ts
header: Do & Don’ts · title: Make every stage readable · description: Each pair shows a stage people understand versus one that misleads them.
Every preview is a Host.
- Do Match the icon and colour: A done stage shows a check on green. — Stepper › stage('done') Verify PAN, “PAN details match your name” | Don't Put a check on purple: An explicit Step Status of active overrides the green. — Stepper › `<Step status="complete" modes={{ ...LIGHT, 'Step Status': 'active' } as Modes} title="Verify PAN" supportingText="PAN details match your name" />`
- Do Turn off the last connector: The stage ends cleanly. — the Connector off Step | Don't Leave a hanging line: A connector with no next stage looks unfinished. — the same without `showLine={false}`
- Do Name the stage: “Verify PAN” is shown and read aloud. — Stepper › stage('current') Verify PAN | Don't Leave the default title: “Stepper Item” tells people nothing, and it’s read as “Step 1”. — Stepper › `<Step {...stage('current')} />`

## Sources
header: Sources · title: Use the public Step contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (5 October build) from the team’s private package repository. Figma keeps Step in Coin Subcomponents; the Components Library uses it inside Stepper. In Figma the Step Status mode sets the colour and a nested glyph variant the icon; in code <code>status</code> sets both, and an explicit Step Status mode overrides the colour. On the web each Step is a list item read as its title plus “Completed”, “Failed”, or “Needs attention”; the supporting text and date aren’t read, and a Step with only a StepLabel child is read as “Step” and its number. Figma’s done example shows a green date; the package keeps it grey. The published Storybook predates 0.1.78.

## Limits
Do not show Dark mode, `connectorStyle`, `style`, `isCurrent`, a Stepper-level Step Status, or a glyph with a mismatched colour outside the Don’t. Do not imply that a Step is pressable or that the glyph, supporting text, or date is announced.
