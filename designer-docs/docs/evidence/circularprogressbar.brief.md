# Circular Progress Bar brief

slug: circularprogressbar · label: Circular Progress Bar · public API: CircularProgressBar (+ CardFinancialCondition and Button for In context)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3446-5217 · storybook: docsUrl('circularprogressbar') · stories: Default=components-circularprogressbar--default, Inactive=components-circularprogressbar--inactive, Active=components-circularprogressbar--active, All states=components-circularprogressbar--all-states, With support text=components-circularprogressbar--with-support-text
checked: 11 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-636f3f5, Biscuit's main 636f3f5)
icon: a faint full ring with a three-quarter arc from 12 o’clock — `<><circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" opacity="0.35" /><path d="M9 3a6 6 0 1 1-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>`
keywords: progress ring, circular progress, radial progress, score ring

Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`; `const M = { ...LIGHT, 'circularProgressBar Size': 'M' } as Modes`; `const MEDIUM = { ...LIGHT, Emphasis: 'Medium' } as Modes`; `noop = () => {}`.
Colour modes (fix loop, 11 October): `const BRANDS = ['Primary', 'Secondary', 'Neutral', 'Tertiary'] as const`; `const MEANINGS = ['Positive', 'Warning', 'Negative'] as const` (shown capitalised; the mode values are lower case); `const EMPHASES = ['High', 'Medium', 'Low'] as const`; `brand(a, e = 'High')` → `{ ...LIGHT, 'Semantic Intent': 'Brand', AppearanceBrand: a, Emphasis: e }`; `system(m, e = 'High')` → `{ ...LIGHT, 'Semantic Intent': 'System', AppearanceSystem: m.toLowerCase(), Emphasis: e }`. Spread `'circularProgressBar Size': 'M'` on top when a ring is M. Several rings side by side in one card go in `<div className="coin-new-content-list">` (it wraps on phones).
Every Active ring passes `state="Active"` (the component defaults to Inactive). Put rings straight into ExampleCards; several side by side go in `<div className="coin-new-row">`.
Selectors with `testID` and `R = byTestId(id)`: track `${R} svg circle:nth-of-type(1)`; arc `${R} circle[stroke-linecap="round"]`; text column `${R} > div`; with support text, support `${R} > div > div:first-child` and value `${R} > div > div:last-child`.

## Overview
summary: Use a Circular Progress Bar to show how far one measure has got, such as 70 out of 100, as a ring with the number inside.
principle: One number, read at a glance.
playground: `.preview-stage` › `<CircularProgressBar state={state} value={value} modes={size === 'M' ? M : LIGHT} />`. Controls: Segment "State" `Active | Inactive` (Active); Segment "Size" `S | M` (S); Segment "Value" `0 | 35 | 70 | 100` (70); Segment "Intent" `Brand | System` (Brand) → Semantic Intent; then, with Brand, Segment "Appearance" `Primary | Secondary | Neutral | Tertiary` (Primary) → AppearanceBrand, or, with System, Segment "Meaning" `Positive | Warning | Negative` (Positive) → AppearanceSystem (lower case); Segment "Emphasis" `High | Medium | Low` (High) → Emphasis. The ring's modes are `brand(…)` or `system(…)` with the chosen emphasis, plus Size M when chosen. Readout title "Read as", value “70 out of 100” (Active, the chosen value) or “Inactive progress”; note: "Screen readers hear this name. Inactive ignores the value." Stage label: "Live Coin Circular Progress Bar".

## Anatomy
header: Anatomy · title: A track, an arc, and the value · description: A grey track shows the whole, and the arc runs clockwise from 12 o’clock to the value. The number sits in the middle, with optional support text above it.
specimen: `<Anatomy …>` › `<CircularProgressBar testID="cpb-anatomy" state="Active" value={70} supportText="Savings goal" modes={M} />`
parts:
1. Track — The full ring, grey or a System tint; it stands for 100. — target: track — side: left
2. Arc — Fills clockwise from 12 o’clock to the value, with round ends. — target: arc — side: right
3. Support text — 11 px; names what’s measured, above the number. — target: support — side: top
4. Value — The value rounded to a whole number, with no % sign. — target: value — side: bottom
The arc stops at about 8 o’clock at 70, so the Track pin on the left lands on bare track.

## Configuration
header: Configuration · title: Size, words, and colour · description: Size and colour are modes, set on the ring or passed down by its host. Semantic Intent picks a brand or a system palette, AppearanceBrand or AppearanceSystem the colour in it, and Emphasis its strength. Support text and a value label are words you add; the arc always follows the value.
Body: `<div className="coin-new-stack">` with two grids. First `coin-new-example-grid three` with the Size S, Size M, and Value label cards; then `coin-new-example-grid` (two columns) with the four colour cards. All colour rings are size S, `state="Active" value={70}`.
- Size S — "60 px with an 8 px ring: the number alone, for cards and rows." — `state="Active" value={70} modes={LIGHT}` — lesson: compact.
- Size M — "164 px with a 22 px ring, with room for support text." — `state="Active" value={70} supportText="Savings goal" modes={M}` — lesson: room for a caption.
- Value label — "Shows a count such as “4 of 7” in place of the number; the arc still follows the value." — `state="Active" value={(4 / 7) * 100} valueLabel="4 of 7" supportText="Benefits used" accessibilityLabel="Benefits used, 4 of 7" modes={M}` — lesson: text and arc are separate.
- Semantic Intent — "Brand (left) colours only the arc. System (right) colours the arc and tints the track to match." — two rings: `brand('Primary')`, `system('Positive')` — lesson: intent switches the palette.
- AppearanceBrand — "With Brand intent: Primary gold (the default), Secondary purple, Neutral charcoal, and Tertiary blue. The track stays grey." — four rings, `brand(a)` for each of BRANDS in order.
- AppearanceSystem — "With System intent: positive green, warning orange, and negative red, each on a matching tint." — three rings, `system(m)` for each of MEANINGS in order.
- Emphasis — "High (the default), Medium, and Low. Only High stands out; Medium and Low fade into the track." — three rings, `brand('Secondary', e)` for each of EMPHASES in order.

## States
header: States · title: Active or Inactive, from empty to full · description: Active draws the arc and the number. Inactive shows the track with a minus icon and ignores the value: use it before there’s anything to measure. Values below 0 or above 100 are held at 0 and 100.
Grid of four ExampleCards, all size S (`modes={LIGHT}`):
- Active — "The arc and the number." — `state="Active" value={70}`
- Inactive — "Track and minus icon; no number." — `state="Inactive" value={70}`
- Empty — "At 0, the track and “0”." — `state="Active" value={0}`
- Full — "At 100, a closed ring." — `state="Active" value={100}`

## Sizing
header: Sizing · title: Two fixed sizes: 60 and 164 px · description: Size is a mode, not a width: S is 60 px with an 8 px ring and M is 164 px with a 22 px ring. The ring keeps its size in any host, and its text gets one line across the ring’s full width.
Measured diagram: `<Anatomy legend={false} marks={[{ kind: 'size', target: byTestId('cpb-size-s'), side: 'bottom', label: 'both' }, { kind: 'size', target: byTestId('cpb-size-m'), side: 'bottom', label: 'both' }]}>` › `<SpecimenRow><Specimen caption="S"><CircularProgressBar testID="cpb-size-s" state="Active" value={70} modes={LIGHT} /></Specimen><Specimen caption="M"><CircularProgressBar testID="cpb-size-m" state="Active" value={70} supportText="Savings goal" modes={M} /></Specimen></SpecimenRow>`. Expected 60 × 60 and 164 × 164.

## Content
header: Content · title: A number people can place · description: The ring shows a whole number with no % sign, so say nearby what it measures, or use a value label such as “3 of 5” for counts. Keep support text to two or three words, such as “Profile complete”.
One ExampleCard "Name what’s measured" › `coin-new-row`: `<CircularProgressBar state="Active" value={80} supportText="Profile complete" modes={M} />` and `<CircularProgressBar state="Active" value={60} valueLabel="3 of 5" supportText="Tasks done" accessibilityLabel="Tasks done, 3 of 5" modes={M} />`.

## In context
header: In context · title: A protection score on a card · description: The Financial Condition card draws the ring from its own value and progressState. Before the first check the ring is Inactive; when the score comes back, the screen passes it as the value and turns the ring Active.
Composition in `.coin-new-context`: `<CardFinancialCondition modes={LIGHT} title="Protection" body={checked ? 'Your health and life cover score' : 'Check your coverage and gaps'} progressState={checked ? 'Active' : 'Inactive'} value={checked ? 62 : 0} showNudge={checked} nudgeBody={'Your life cover is below the suggested amount\nAdd a term plan to close the gap'} buttonLabel={checked ? 'View details' : 'Check my cover'} onPressButton={checked ? noop : () => setChecked(true)} />`, then (only when checked) `<Button label="Start again" onPress={() => setChecked(false)} modes={LIGHT} />`. Below, `<p className="coin-new-readout" role="status">`: “Not checked yet: the ring is Inactive”, then “Score: 62 out of 100”.

## Do & Don'ts
header: Do & Don’ts · title: Make the ring say something · description: Each pair shows a ring people can read and hear versus one that hides its value.
Every preview is one ring.
- Do Set Active with a value: The ring shows 70. — `state="Active" value={70} modes={LIGHT}` | Don't Pass a value alone: Without state, the ring stays Inactive and ignores the value. — `value={70} modes={LIGHT}`
- Do Keep emphasis High: The arc stands out from the track. — `state="Active" value={70} modes={LIGHT}` | Don't Lower the emphasis: At Medium the pale arc has no contrast with the track (1.0:1). — `state="Active" value={70} modes={MEDIUM}`
- Do Name a count: “4 of 7” is read as “Benefits used, 4 of 7”. — M, `value={(4 / 7) * 100} valueLabel="4 of 7" supportText="Benefits used" accessibilityLabel="Benefits used, 4 of 7"` | Don't Leave the default name on a count: It’s read as “Benefits used, 4 of 7 out of 100”. — the same without `accessibilityLabel`
- Do Set System intent with the meaning: Semantic Intent System with warning turns the arc orange. — `state="Active" value={70} modes={system('Warning')}` | Don't Set a meaning alone: Without System intent, warning is ignored and the arc stays gold. — `state="Active" value={70} modes={{ ...LIGHT, AppearanceSystem: 'warning' } as Modes}`

## Sources
header: Sources · title: Use the public Circular Progress Bar contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (5 October build) from the team’s private package repository. Figma’s State variant (Inactive, Active) matches the <code>state</code> prop, and size S or M is a variable mode in both. The component starts Inactive, while every Storybook story starts Active. Figma shows support text at M on its own; the package shows it only when you pass it. Figma’s ring looks about 15% of the size; the package draws 13% (8 px at S). On the web the ring is a progress bar named by its label, without a separate value. Figma and the package share the colour modes: Semantic Intent (Brand, System), AppearanceBrand (Primary, Secondary, Neutral, Tertiary), AppearanceSystem (positive, warning, negative), and Emphasis (High, Medium, Low); Storybook offers each as a control. AppearanceBrand applies only with Brand intent and AppearanceSystem only with System, so the With support text story’s warning leaves its arc gold. The number, support text, and icon keep one colour in every mode.

## Limits
Do not show or mention Color Mode Dark (out of scope). Do not show `style` or the `*Style` overrides, `disableTruncation`, or CircularProgressBarDoted. Do not imply animation, interaction, or that the value is announced separately from the name.
