# Card Financial Condition brief

slug: cardfinancialcondition · label: Card Financial Condition · public API: CardFinancialCondition (+ VStack, Title for composition)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3600-3177 · storybook: docsUrl('cardfinancialcondition') · stories: Default=components-cardfinancialcondition--default, Active progress=components-cardfinancialcondition--active-progress, Without nudge=components-cardfinancialcondition--without-nudge, Without divider=components-cardfinancialcondition--without-divider, Custom progress slot=components-cardfinancialcondition--with-custom-progress-slot, Long content=components-cardfinancialcondition--long-content
checked: 19 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-c7d3348, Biscuit's main c7d3348, which fixes #285)
icon: a card with a ring on the right and a button below — `<><rect x="2.5" y="2.5" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" /><circle cx="11.5" cy="7" r="2" stroke="currentColor" strokeWidth="1.5" /><path d="M5 6h2.5M5 12.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>`
keywords: financial condition, protection score, coverage card, insurance score, financial health

Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`; `const m = (o: Record<string, string>) => ({ ...LIGHT, ...o } as Modes)`; `const system = (s: 'positive' | 'negative') => m({ 'Semantic Intent': 'System', AppearanceSystem: s })`; `noop = () => {}`; `const FRAME = { width: '100%', maxWidth: 343 } as const` (Figma's width).
NUDGE = `'There may be gaps in your health or life cover\nAdd coverage to stay financially secure'`.
PROT = `{ title: 'Protection', body: 'Check your coverage and gaps', progressState: 'Active', value: 72, nudgeBody: NUDGE, buttonLabel: 'View details', onPressButton: noop }`. No accessibilityLabel: since #285 the default spoken name includes the score. Inactive cards set `accessibilityLabel: 'Protection. No score yet'` (the default still reads the value, #350), except the Don't that shows a known score left Inactive.
“CFC(overrides)” = `<CardFinancialCondition {...PROT} modes={LIGHT} style={FRAME} {...overrides} />`. Every card sits straight on the grey example stage; no Surface, FitWidth or host around it.
Selectors (testID on the card, `R = byTestId(id)`): title `${R} > div:first-child > div:first-child > [dir="auto"]:first-child`; body `${R} > div:first-child > div:first-child > [dir="auto"]:last-child`; text `${R} > div:first-child > div:first-child`; score `${R} [role="progressbar"]`; header `${R} > div:first-child`; nudge `${R} > div:nth-child(2)`; divider `${R} > [role="presentation"]`; button `${R} button`.

## Overview
summary: Use a Card Financial Condition to show one coverage score with a short reading, a hint on what's missing, and one button.
principle: One score, one gap, one next step.
playground: `.preview-stage` › CFC with `progressState={ring}`, `value={Number(value)}`, `accessibilityLabel={ring === 'Active' ? undefined : 'Protection. No score yet'}`, `modes={m({ AppearanceBrand: appearance })}`, `showNudge={nudge}`, `showButton={button}`, `onPressButton={() => setAction('View details pressed')}`; stage label "Live Coin Card Financial Condition". Controls: Segment "Ring" `Inactive | Active` (Active); Segment "Value" `30 | 72 | 95` (72); Segment "Appearance" `Neutral | Primary | Secondary | Tertiary` (Neutral); OnOff "Nudge" (on); OnOff "Button" (on). Readout title "Last action", value "None" or "View details pressed"; note: "Only the button acts."

## Anatomy
header: Anatomy · title: A score, a hint, and a button · description: A white card puts a title and one line beside a 60 px score ring. Under them sit an inline nudge with up to two lines, a divider, and one button.
specimen: `<Anatomy specimenWidth={343} …>` › CFC({ testID: 'cfc-anatomy', style: undefined }).
parts:
1. Title — The topic in 16 px bold; it wraps rather than cutting off. — target: title — side: top
2. Body — One short line on what the score covers. — target: body — side: left
3. Score — A 60 px Circular Progress Bar: empty while Inactive, value out of 100 when Active. — target: score — side: right
4. Nudge — An inline Nudge with nudgeBody; a line break starts its second line. — target: nudge — side: left
5. Divider — A 1 px rule; showDivider removes it. — target: divider — side: right
6. Button — A purple Button with buttonLabel; onPressButton runs your action. — target: button — side: bottom

## Configuration
header: Configuration · title: Brand, status, and sections · description: AppearanceBrand colours the ring and the nudge: the card defaults to Neutral, and the button stays purple. For a score that's good or bad, set Semantic Intent to System and pick AppearanceSystem: the ring, the nudge, and the button take the status colour. Emphasis Medium or Low makes the ring and the button paler. showNudge, showDivider, and showButton remove their parts; progressSlot, nudgeSlot, and buttonSlot replace them with your own components.
Grid `coin-new-example-grid` (two columns):
- Neutral — CFC() — lesson: The card's default: a dark ring and a white nudge.
- Primary — CFC({ modes: m({ AppearanceBrand: 'Primary' }) }) — lesson: A gold ring and a cream nudge; the button stays purple.
- Positive — CFC({ modes: system('positive'), value: 90, body: 'Your cover looks complete', nudgeBody: 'Health and life cover are in place\nReview them once a year' }) — lesson: System with positive: green for a good score.
- Negative — CFC({ modes: system('negative'), value: 30, body: 'You have gaps in your cover' }) — lesson: System with negative: red for a score to act on.
- Without the nudge — CFC({ showNudge: false }) — lesson: The score, a rule, and the button.
- Without the divider — CFC({ showDivider: false }) — lesson: The button sits right under the nudge.

## States
header: States · title: Inactive or Active · description: progressState decides whether the ring shows a score. Inactive, the default, draws an empty ring with a dash; Active fills value out of 100 and prints the number, or valueLabel in its place. The card has no pressed or disabled state: only the button acts.
Grid `coin-new-example-grid three`:
- Inactive — CFC({ progressState: 'Inactive', accessibilityLabel: 'Protection. No score yet' }) — lesson: No score yet: an empty ring with a dash, as in Figma.
- Active — CFC() — lesson: The ring fills to 72 and shows the number.
- valueLabel — CFC({ valueLabel: '72%' }) — lesson: valueLabel replaces the number, here with a percent sign.

## Sizing
header: Sizing · title: Your screen sets the width · description: The card has no width of its own: it fills its host, and Figma draws it at 343 px. It's as tall as its content, with 16 px padding, 8 px between parts, and 16 px between the text and the 60 px ring. The button is always Figma's 32 px, with 14 px text, whatever Context the card has.
Measured diagram (the section's whole body): `<Anatomy legend={false} specimenWidth={343} marks={[{ kind: 'size', target: R, side: 'bottom', label: 'both' }, { kind: 'padding', target: R }, { kind: 'gap', from: text, to: score }]}>` › CFC({ testID: 'cfc-size', style: undefined }). Measured on c7d3348: 343 × 183, button 121 × 32, padding 16, gap 16.
(Before #285 a two-column grid compared Nudge&Alert's 25 px button with CTACard's 32 px one; the button is now CTACard at every Context, so the grid was removed.)

## Content
header: Content · title: Name it, read it, act on it · description: Use a one- or two-word title for the topic and one short line for the body. Keep the nudge to two lines with a line break between them, and label the button with a verb. The default spoken name reads the title, the score, and the body, such as “Protection, 72 out of 100. Check your coverage and gaps”. While the ring is Inactive, set accessibilityLabel yourself, such as “Protection. No score yet”: the default still reads the value (#350).
Grid `coin-new-example-grid` (two columns):
- Short copy — CFC() — lesson: “Protection”, one line, two nudge lines, and “View details”.
- Long copy wraps — CFC({ title: 'Comprehensive financial protection plan', body: 'Review every active policy, find the gaps in your cover, and stay on top of renewals.' }) — lesson: Nothing is cut off: the title and body wrap and the card grows.

## In context
header: In context · title: A protection score on the Money screen · description: View details runs the screen's own action through onPressButton. Once the person adds cover, the screen passes the new value and hides the nudge with showNudge; the card doesn't fetch or work out the score itself.
Composition in `.coin-new-context`: `<VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes}>` with `<Title title="Your money" subtitle="October 2026" modes={LIGHT} />` and CFC({ value: added ? 90 : 72, body: added ? 'Your cover looks complete' : 'Check your coverage and gaps', showNudge: !added, onPressButton: () => setAdded(true) }). Below, `<p className="coin-new-readout" role="status">`: "Score 72, with a nudge" or "Cover added: score 90, and the nudge is hidden".

## Do & Don'ts
header: Do & Don’ts · title: A score people can act on · description: Each pair shows a card that reads at a glance next to one that hides its score or its next step.
- Do Keep the nudge to two lines: short lines, one line break. — CFC() | Don't Write a paragraph in the nudge: It wraps to four lines and pushes the button down. — CFC({ nudgeBody: 'There may be gaps in your health or life cover because one of your policies ended last month and your family has grown since you bought it' })
- Do Show the score when you have it: Active, with the ring at 72. — CFC() | Don't Leave a known score Inactive: The ring stays empty and the 72 is lost. — CFC({ progressState: 'Inactive' })
- Do Pair the score with a next step: The nudge says what's missing and the button opens it. — CFC() | Don't Hide the nudge and the button: A number with no reading and nothing to do. — CFC({ showNudge: false, showDivider: false, showButton: false })

## Sources
header: Sources · title: Use the public Card Financial Condition contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code>, built from Biscuit’s main at c7d3348 (19 October) and taken from the team’s private package repository. Figma’s Card/FinancialCondition is one 343 × 181 component with no properties and an Inactive ring; its nudge is the retired Nudge with a purple sparkle, which no mode reproduces, so this page follows the package’s Neutral default. The button is Figma’s 32 px at any Context. The card stays white in every mode, and its default spoken name includes the score. The published Storybook still shows the older generated page.

## Limits
Don't show Dark, circularProgressBar Size, Nudge padding, Border Boolean, Button / State, context 10, style props, or demos of progressSlot, nudgeSlot, or buttonSlot. Don't imply a pressed, disabled, or loading state on the card or a disabled button.
