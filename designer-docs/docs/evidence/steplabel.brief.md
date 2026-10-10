# Step Label brief

slug: steplabel · label: Step Label · public API: StepLabel (+ Step and Stepper as hosts; Card, VStack, HStack, Button for composition)
figma: https://www.figma.com/design/dSlK8ueQ7wlbyUSZd4f8QO/Coin-Subcomponents?node-id=27-854 · storybook: docsUrl('steplabel') · stories: Default=components-steplabel--default, Title only=components-steplabel--title-only, With supporting text=components-steplabel--with-supporting-text, With meta=components-steplabel--with-meta, Long text=components-steplabel--long-text
checked: 10 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-636f3f5, Biscuit's main 636f3f5)
icon: three left-aligned text lines, shortening — `<path d="M3 5h12M3 9h9M3 13h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />`
keywords: step title, step text, stepper text, stage label

Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`; `const BTN = { 'Color Mode': 'Light', 'Button / Size': 'S' } as Modes`; `const CARD = { 'Color Mode': 'Light', AppearanceBrand: 'Neutral' } as Modes`; `noop = () => {}`. Steps use the Step guide's helper: `const STATE = { current: ['number', 'active'], upcoming: ['number', 'inactive'], done: ['complete', 'complete'], failed: ['error', 'error'] }` → `stage(s) = { status: STATE[s][0], modes: { ...LIGHT, 'Step Status': STATE[s][1] } as Modes }`.
Host = `<div className="coin-new-host wide"><VStack modes={LIGHT} style={{ width: '100%', padding: 0 }}>{children}</VStack></div>`; “narrow Host” uses `coin-new-host narrow`.
“Label in a Step” = `<Step {...stage(s)} title={T}><StepLabel title={T} supportingText={S} metaText={D} modes={LIGHT} /></Step>` — always pass the same title to the Step. Put Steps in `<Stepper modes={LIGHT}>` inside a Host.
Give every StepLabel `modes={LIGHT}`. Omitted `supportingText`/`metaText` simply don't render.
Selectors for a standalone StepLabel with `testID` and `R = byTestId(id)`, all three lines shown: title `${R} > div:nth-child(1)`, supporting `${R} > div:nth-child(2)`, date `${R} > div:nth-child(3)`.

## Overview
summary: Use a Step Label to keep a Step’s title, detail and date when you put your own content, such as a button, inside the Step.
principle: The stage in words: its name, one line of detail, and when.
playground: `.preview-stage` › Host › `<StepLabel title="Verify PAN" supportingText="Match your PAN with your name" metaText="Started 5 Oct 2026" subtitle={support} meta={date} modes={LIGHT} />`. Controls: OnOff "Supporting text" → `subtitle` (on); OnOff "Date" → `meta` (on). Readout title "Height", value “50 px” (both on), “36 px” (supporting only), “32 px” (date only), “18 px” (both off); note: "Each line adds its height and a 2 px gap. The width always follows the column." Stage label: "Live Coin Step Label".

## Anatomy
header: Anatomy · title: Three lines of text in a column · description: A title, a line of supporting text, and a date, stacked 2 px apart. Only the title is always there, and the column fills the width it’s given.
specimen: `<Anatomy specimenWidth={280} …>` › `<StepLabel testID="steplabel-anatomy" title="Verify PAN" supportingText="Match your PAN with your name" metaText="Started 5 Oct 2026" modes={LIGHT} />`
parts:
1. Column — Fills its host’s width; the lines sit 2 px apart. — target: R — side: left
2. Title — 14 px bold; names the stage and is always shown. — target: title — side: top
3. Supporting text — 12 px; what the stage involves or how it went. — target: supporting — side: right
4. Date — 10 px bold; when it finished, started, or is due. — target: date — side: bottom
If the survey reports overlapping pins, move the Column pin's `at` or put it on the right.

## Configuration
header: Configuration · title: A title, plus up to two optional lines · description: The title is always shown. A line of supporting text or a date shows only when it has text and its switch is on: subtitle and meta, as in Figma.
Grid of four ExampleCards, each a Host with one StepLabel:
- Title only — "Compact, when the stage name says enough." — `title="Add address"` — lesson: one line.
- With supporting text — "One line on what the stage involves." — `title="Confirm nominee" supportingText="Someone who can claim this account"` — lesson: two lines.
- With a date — "When the stage finished, started, or is due." — `title="Review and submit" supportingText="Check your income and file" metaText="Due by 12 Oct 2026"` — lesson: three lines.
- Date switched off — "With meta off, the date stays hidden even though it has text. Subtitle does the same for supporting text." — `title="Verify PAN" supportingText="Match your PAN with your name" metaText="Started 5 Oct 2026" meta={false}` — lesson: the switch wins over the text.

## States
header: States · title: No states of its own · description: A Step Label looks the same in every stage. The Step’s indicator shows whether the stage is current, done, or failed, so say what happened in the supporting text.
Grid `three` of ExampleCards, each Host › Stepper › one “Label in a Step”:
- Current stage — "Black title, grey detail." — stage('current'), Verify PAN, “Match your PAN with your name”
- Done stage — "Same colours; the green check says it’s done." — stage('done'), Verify PAN, “PAN details match your name”
- Failed stage — "Same colours; the text says what went wrong." — stage('failed'), Verify PAN, “PAN not found. Check the number and try again”

## Sizing
header: Sizing · title: It fills its column, and its lines set the height · description: A Step Label has no fixed size. It takes the width it’s given (in a Step, everything right of the indicator) and is 18 px tall with a title alone, 50 px with all three lines.
Measured diagram: `<Anatomy legend={false} specimenWidth={280} marks={[{ kind: 'size', target: Z.R, side: 'bottom', label: 'both' }, { kind: 'gap', from: Z.title, to: Z.supporting }]}> (bottom, so the label clears the text and the gap's “2”)` › `<StepLabel testID="steplabel-size" title="Verify PAN" supportingText="Match your PAN with your name" metaText="Started 5 Oct 2026" modes={LIGHT} />`. Expected 280 × 50 and a 2 px gap.
Then ExampleCard "Long text wraps" (description: "Nothing is cut off: each line wraps and the label grows.") › narrow Host › `<StepLabel title="Upload Form 16 and match your employer’s TAN" supportingText="The name on Form 16 must match your PAN and the employer details you saved." metaText="Started 5 Oct 2026" modes={LIGHT} />`.

## Content
header: Content · title: A stage name, one line of detail, and a date · description: Write the title as the stage in one to four words, in sentence case, such as “Verify PAN”. Keep the supporting text to one line on what happens or what went wrong, and start the date with what it marks: Done, Started, or Due by.
One ExampleCard "Stage names, details, and dates" › Host › Stepper › “Label in a Step” ×3: stage('done') Verify PAN, “PAN details match your name”, “Done 2 Oct 2026”; stage('current') Add nominee, “Someone who can claim this account”, “Started 5 Oct 2026”; stage('upcoming') eSign, “Sign the form with an Aadhaar OTP”, “Due by 12 Oct 2026”.

## In context
header: In context · title: Adding a nominee while opening a demat account · description: The current stage holds a Step Label and an Add nominee button. Once the nominee is added, the screen gives the Step back its own text and moves the current stage on.
Composition in `.coin-new-context`: `<Card modes={CARD}>` › `<Card.Title>Open your demat account</Card.Title>` › `<VStack modes={LIGHT} style={{ width: '100%' }}>` › `<Stepper modes={LIGHT} accessibilityLabel="Account opening progress">`:
- `<Step {...stage('done')} title="Verify PAN" supportingText="PAN details match your name" metaText="Done 2 Oct 2026" />`
- while not added: `<Step {...stage('current')} title="Add nominee"><StepLabel title="Add nominee" supportingText="Someone who can claim this account" modes={LIGHT} /><HStack modes={LIGHT}><Button label="Add nominee" onPress={add} modes={BTN} /></HStack></Step>`; after: `<Step {...stage('done')} title="Add nominee" supportingText="Nominee added" metaText="Done 10 Oct 2026" />`
- `<Step {...stage(added ? 'current' : 'upcoming')} title="eSign" supportingText="Sign the form with an Aadhaar OTP" />`
Then `<Button label="Start again" onPress={reset} modes={LIGHT} />` (only after adding). Below the card, `<p className="coin-new-readout" role="status">`: “Stage 2 of 3: Add nominee”, then “Stage 3 of 3: eSign”.

## Do & Don'ts
header: Do & Don’ts · title: Keep the label readable and named · description: Each pair shows a Step Label people can read and hear versus one that lets them down.
Every preview is a Host.
- Do Keep the Step’s title: The stage is read as “Add nominee”. — Stepper › “Label in a Step” stage('current') Add nominee, “Someone who can claim this account” | Don't Rely on the label alone: Without the Step’s title, it’s read as “Step 1”. — Stepper › `<Step {...stage('current')}><StepLabel title="Add nominee" supportingText="Someone who can claim this account" modes={LIGHT} /></Step>`
- Do Leave the brand mode unset: The supporting text stays dark grey. — `<StepLabel title="Verify PAN" supportingText="Match your PAN with your name" modes={LIGHT} />` | Don't Pass a Primary brand mode: AppearanceBrand Primary, even on the Stepper, turns the detail gold: 2.4:1 on white. — `<StepLabel title="Verify PAN" supportingText="Match your PAN with your name" modes={{ ...LIGHT, AppearanceBrand: 'Primary' } as Modes} />`
- Do Name the stage: “Verify PAN” says what happens here. — `<StepLabel title="Verify PAN" supportingText="Match your PAN with your name" modes={LIGHT} />` | Don't Leave the default title: Without a title, it shows “Stepper Item”. — `<StepLabel supportingText="Match your PAN with your name" modes={LIGHT} />`

## Sources
header: Sources · title: Use the public Step Label contract · description: The guide compares Step’s text frame in Figma with the installed package and its Storybook stories.
figmaDescription: Step’s text frame, in Coin Subcomponents
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (5 October build) from the team’s private package repository. Figma has no Step Label component: it is the text frame inside Step in Coin Subcomponents, whose title, supporting text, and Meta text and subtitle and meta switches match the props. Only Color Mode, and AppearanceBrand for the supporting line, change the label, and it takes modes from its own prop or its Step, not from JFSThemeProvider. It has no role or name of its own: the Step around it is announced by the Step’s title. Figma’s done example shows a green date; the package keeps it grey. The published Storybook predates 0.1.78.

## Limits
Light only. Do not show Dark, `style`, AppearanceBrand outside the Don’t, Emphasis, Semantic Intent, or AppearanceSystem. Do not imply that the label is pressable, is announced on its own, or changes colour with the stage.
