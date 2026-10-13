# Card Advisory brief

slug: cardadvisory · label: Card Advisory · public API: CardAdvisory (+ VStack, Title for composition; Surface and FitWidth from the kit)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3780-5784 · storybook: docsUrl('cardadvisory') · stories: Default=components-cardadvisory--default, Without nudge=components-cardadvisory--without-nudge, Custom score=components-cardadvisory--custom-score
checked: 13 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-c1fa197, Biscuit's main c1fa197; main's 7020bf9 hides the nudge's Close and rewrites the Storybook page, not installed)
icon: a card with a ring — `<><rect x="2.5" y="3.5" width="13" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><circle cx="11.5" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" /><path d="M5 7h2.5M5 11.5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>`
keywords: advisory card, score card, insight card, spending score, financial health

Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`; `const NEUTRAL = { ...LIGHT, AppearanceBrand: 'Neutral' } as Modes` (Storybook's look); `const system = (s: 'positive' | 'negative') => ({ ...LIGHT, 'Semantic Intent': 'System', AppearanceSystem: s } as Modes)`; `noop = () => {}`.
SPEND = `{ title: 'Spending', description: 'You’re within the plan you set for this month.', value: 70, nudgeBody: 'Data confidence is low. Add more accounts for better insights.', nudgeButtonLabel: 'Add accounts', accessibilityLabel: 'Spending score 70', onPressNudgeButton: noop }`.
“CA(overrides)” = `<CardAdvisory {...SPEND} modes={NEUTRAL} {...overrides} />`.
“Host(child)” = `<FitWidth><Surface>{child}</Surface></FitWidth>`: Storybook shows the white card on a white canvas; the card is a fixed 360 px, so FitWidth scales it down on narrow screens instead of clipping. Every CardAdvisory outside the Anatomy and Sizing diagrams sits in a Host.
Selectors, with `testID` on the card and `R = byTestId(id)`: header `${R} > div:first-child > div:first-child > div:first-child`; title `${header} > [dir="auto"]`; info icon `${header} > div:last-child`; description `${R} > div:first-child > div:first-child > [dir="auto"]`; content `${R} > div:first-child > div:first-child`; main row `${R} > div:first-child`; score `${R} [role="progressbar"]`; nudge `${R} > [role="presentation"]`; close `${R} [aria-label="Close"]`.

## Overview
summary: Use a Card Advisory to show one score with a sentence on what it means and, if it helps, one next step.
principle: One score, one reading, one next step.
playground: `.preview-stage` › Host › CA with `modes={{ ...LIGHT, AppearanceBrand: appearance } as Modes}`, `value={score}`, `accessibilityLabel={`Spending score ${score}`}`, `showNudge={nudge}`, `showInfoIcon={info}`, `onPressNudgeButton={() => setAction('Add accounts pressed')}`; stage label "Live Coin Card Advisory". Controls: Segment "Appearance" `Neutral | Primary | Secondary | Tertiary` (Neutral); Segment "Score" `25 | 70 | 95` (70); OnOff "Nudge" (on); OnOff "Info icon" (on). Readout title "Last action", value "None" or "Add accounts pressed"; note: "Only the nudge button acts. In this build the nudge's Close button does nothing (#271)."

## Anatomy
header: Anatomy · title: A score, its reading, and a nudge · description: A bold title and one sentence sit beside a small ring that shows the score out of 100. An inline nudge below gives one reason to act and one button.
specimen: `<Anatomy surface="white" …>` (no specimenWidth: the card is a fixed 360 px, and the diagram scales it to fit only when it measures its real width) › CA({ testID: 'ca-anatomy' }).
parts:
1. Title — 26 px heavy, on one line; a longer title ends in an ellipsis. — target: title — side: top
2. Info icon — Shown by default; showInfoIcon hides it and titleEndSlot replaces it. — target: info icon — side: top
3. Description — One sentence at 12 px that says what the score means. — target: description — side: left
4. Score — A 60 px Circular Progress Bar of value out of 100; valueLabel changes the figure. — target: score — side: right
5. Nudge — An inline Nudge with nudgeBody and one button; showNudge removes it. — target: nudge — side: bottom
6. Close — Drawn by the nudge in this build; it does nothing yet (#271). — target: close — side: right

## Configuration
header: Configuration · title: Brand and status colours · description: AppearanceBrand colours the ring, the nudge, and its button: Storybook uses Neutral, and the package defaults to Primary. For a score that's good or bad, set Semantic Intent to System and pick AppearanceSystem. The card itself stays white. Three slots, titleEndSlot, progressSlot, and nudgeSlot, replace the info icon, the ring, and the nudge with your own components.
Grid `coin-new-example-grid` (two columns), each an ExampleCard › Host:
- Neutral — CA() — lesson: Storybook's look: a dark ring and button, a white nudge.
- Primary — CA({ modes: LIGHT }) — lesson: The package default: a gold ring and a cream nudge.
- Positive — CA({ modes: system('positive'), value: 85, description: 'You’re well within this month’s plan.', accessibilityLabel: 'Spending score 85' }) — lesson: System with positive: green for a good score.
- Negative — CA({ modes: system('negative'), value: 25, description: 'You’ve used most of this month’s plan.', accessibilityLabel: 'Spending score 25' }) — lesson: System with negative: red for a score to act on.

## States
header: States · title: With or without the nudge · description: The card has no pressed or disabled state of its own: only the nudge button acts, through onPressNudgeButton. showNudge removes the nudge, leaving the score and its reading.
Grid `coin-new-example-grid`, each an ExampleCard › Host:
- With nudge — CA() — lesson: The score, its reading, and one next step.
- Score only — CA({ showNudge: false }) — lesson: Without the nudge: the score and one sentence.

## Sizing
header: Sizing · title: Always 360 px wide · description: The card is 360 px wide, set by a token that no mode changes, and as tall as its content: it doesn't stretch or shrink with its host. The ring is 60 px with 16 px before it, and the nudge sits 16 px below. It has no padding or corners: it's a white section for a white screen.
Measured diagram: `<Anatomy legend={false} surface="white" marks={[{ kind: 'size', target: R, side: 'bottom', label: 'both' }, { kind: 'gap', from: content, to: score }, { kind: 'gap', from: main row, to: nudge }]}>` › CA({ testID: 'ca-size' }). Expected 360 wide, about 146 tall, gaps 16 and 16; report the measured values.

## Content
header: Content · title: Name it, read it, act on it · description: Keep the title to one or two words: it's cut to one line. Say what the score means in one sentence, give the nudge one reason to act, and label its button with a verb; the default label is “Button”. Set accessibilityLabel to the score in words, such as “Spending score 70”, because the default reads out every line, the nudge included.
One ExampleCard "One score, one reading, one step" › Host › CA(). Description: "“Spending”, what 70 means this month, and “Add accounts” as the next step, named “Spending score 70”."

## In context
header: In context · title: A spending score on the Insights screen · description: Add accounts runs the screen's own action through onPressNudgeButton. Once the accounts are linked, the screen hides the nudge with showNudge and updates the reading; the card doesn't act on its own.
Composition in `.coin-new-context`: `<FitWidth><Surface><VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes} style={{ width: 360, padding: 0 }}>` with `<Title title="Insights" subtitle="September 2026" modes={LIGHT} />` and CA({ description: linked ? 'Based on all 3 of your accounts.' : 'You’re within the plan you set for this month.', showNudge: !linked, onPressNudgeButton: () => setLinked(true) }). Below, `<p className="coin-new-readout" role="status">`: "2 accounts linked" or "3 accounts linked; the nudge is hidden".

## Do & Don'ts
header: Do & Don’ts · title: A clear score and one step · description: Each pair shows a card people read at a glance next to one that hides its point or crowds its nudge.
Every preview is a Host.
- Do Label the button with a verb: “Add accounts” says what happens next. — CA() | Don't Leave the default label: The button reads “Button” and promises nothing. — CA without `nudgeButtonLabel`
- Do Keep the title short: “Spending” fits on its one line. — CA() | Don't Write a long title: It's cut to one line, so its end is lost. — CA({ title: 'Spending across all your accounts this month' })
- Do Give the nudge one action: One button for one next step. — CA() | Don't Put two actions in the nudge: The long label squeezes the reason to act. — CA({ nudgeButtonLabel: 'Add accounts and review bills' })

## Sources
header: Sources · title: Use the public Card Advisory contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (12 October build) from the team’s private package repository. Figma’s Card / Advisory is one 360 × 136 component with a Title property; its nudge is the retired Nudge with a purple sparkle and no close button, a mix no single mode reproduces, so this page follows Storybook’s Neutral. In this build the card’s nudge shows a Close button that does nothing (#271); Biscuit’s 13 October build hides it but isn’t installed here. The title is cut to one line and sits on a 32 px line (26 in Figma). The card stays white in every mode. Its default spoken name reads the title, description, score, and nudge text, even when the nudge is hidden. The published Storybook still shows the old page and the older nudge.

## Limits
Don't show Dark, Emphasis, circularProgressBar Size, Context, Border Boolean, Nudge padding, style props, or demos of titleEndSlot, progressSlot, or nudgeSlot. Don't hide or work around the Close button (#271), and don't imply a pressed, disabled, or loading state on the card.
