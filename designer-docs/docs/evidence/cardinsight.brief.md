# Card Insight brief

slug: cardinsight · label: Card Insight · public API: CardInsight (+ SavingsGoalSummary as the figure, Nudge as the footer; VStack, Title for composition)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3702-17347 · storybook: docsUrl('cardinsight') · stories: Default=components-cardinsight--default, Custom savings goal=components-cardinsight--with-custom-savings-goal, Without badge=components-cardinsight--without-badge, Without footer=components-cardinsight--without-footer, Custom footer=components-cardinsight--with-custom-footer, Without divider=components-cardinsight--without-divider
checked: 17 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-a116616, Biscuit's main a116616, which has the 7b7c79f0 rewrite)
icon: a card with a badge and a progress bar — `<><rect x="2.5" y="2.5" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M5 6h3.5M11 6h2M5 10h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M5 13h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>`
keywords: insight card, savings goal card, savings insight, goal progress, spending insight

Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`; `const m = (o: Record<string, string>) => ({ ...LIGHT, ...o } as Modes)`; `noop = () => {}`; `const FRAME = { width: '100%', maxWidth: 356 } as const` (Figma's width).
FIGURE = `<SavingsGoalSummary current={{ label: 'Saved (4 months)', value: 240000 }} target={{ label: 'Goal (8 months)', value: 480000 }} />` (no `label`: see Limits).
HINT(button = true) = `<Nudge type="inline-compact" body="Add ₹10,000 a month to reach it by June." {...(button ? { buttonLabel: 'Set up', onPressButton: noop } : {})} />`.
“CI(overrides)” = `<CardInsight title="Emergency savings" subtitle="Four of the eight months we suggest." badge="On track" modes={LIGHT} style={FRAME} footer={HINT()} {...overrides}>{overrides.children ?? FIGURE}</CardInsight>`. Pass no modes to the figure or the Nudge: the card hands them its own. Every card sits straight on the grey example stage (Storybook frames it on light grey too); no Surface, FitWidth or host.
Selectors (no testID; `R = ':scope > div'`, the card root): header `${R} > div:first-child`; title `${R} > div:first-child > div:first-child > [dir="auto"]:first-child`; subtitle `${R} > div:first-child > div:first-child > [dir="auto"]:last-child`; badge `${R} > div:first-child > div:last-child`; figure `${R} > div:nth-child(2)`; divider `${R} > [role="presentation"]`; footer `${R} > div:last-child`.

## Overview
summary: Use a Card Insight to show one finding about someone's money: a title, a status badge, one figure, and a hint on what to do next.
principle: One finding, one figure, one hint.
playground: `.preview-stage` › CI({ modes: m({ AppearanceBrand: appearance }), badge: badge ? 'On track' : false, footer: footer ? HINT() : false, divider: divider }) with the Nudge's `onPressButton={() => setAction('Set up pressed')}`; stage label "Live Coin Card Insight". Controls: Segment "Appearance" `Primary | Secondary | Tertiary | Neutral` (Primary); OnOff "Badge" (on); OnOff "Footer" (on); OnOff "Divider" (on). Readout title "Last action", value "None" or "Set up pressed"; note: "The divider shows only with a footer."

## Anatomy
header: Anatomy · title: A finding, its figure, and a hint · description: A white card puts a title, one line of context, and a badge on top. Below sit the figure, here a Savings Goal Summary, and a footer under a divider, here an inline Nudge with one action.
specimen: `<Anatomy specimenWidth={356} …>` › CI().
parts:
1. Title — The topic in 16 px bold; it wraps rather than cutting off. — target: title — side: top
2. Subtitle — One sentence of context at 12 px. — target: subtitle — side: left
3. Badge — A string becomes a Badge; false removes it. — target: badge — side: right
4. Figure — children: here a Savings Goal Summary with a bar and two legend rows. — target: figure — side: right
5. Divider — A 1 px rule, shown only with a footer. — target: divider — side: left
6. Footer — footer: here an inline Nudge with one action; false removes it. — target: footer — side: bottom

## Configuration
header: Configuration · title: Brand colour · description: AppearanceBrand colours the badge, the bar, and a Nudge footer together: Primary gold by default, Secondary purple as in Figma, Tertiary blue, or Neutral grey. The card, its title, and its subtitle stay the same. badge takes a string, your own node, or false; children replaces the figure, and footer takes your own node or false.
Grid `coin-new-example-grid` (two columns):
- Primary — CI() — lesson: The default: gold badge, bar, and footer.
- Secondary — CI({ modes: m({ AppearanceBrand: 'Secondary' }) }) — lesson: Purple, the colour of Figma's bar.
- Tertiary — CI({ modes: m({ AppearanceBrand: 'Tertiary' }) }) — lesson: Blue throughout.
- Neutral — CI({ modes: m({ AppearanceBrand: 'Neutral' }) }) — lesson: Grey for a quieter card.

## States
header: States · title: Leave out what you don't need · description: badge={false} removes the badge, and the title takes its width. footer={false} removes the footer and the divider above it; divider={false} keeps the footer without the rule. onPress makes the whole card one button with no pressed look; don't use it when the footer has a button.
Grid `coin-new-example-grid three`:
- Without the badge — CI({ badge: false }) — lesson: The title runs the full width.
- Without the footer — CI({ footer: false }) — lesson: The divider goes with it.
- Without the divider — CI({ divider: false }) — lesson: The footer sits 12 px under the figure.

## Sizing
header: Sizing · title: Your screen sets the width · description: The card fills its host's width; Figma draws it at 356 px. It has 16 px padding at the top and bottom, 12 px at the sides, and 12 px between the header, the figure, the divider, and the footer. Its height follows the content.
Measured diagram: `<Anatomy legend={false} specimenWidth={356} marks={[{ kind: 'size', target: R, side: 'bottom', label: 'both' }, { kind: 'padding', target: R }, { kind: 'gap', from: header, to: figure }]}>` › CI(). Expected 356 wide, about 390 tall, padding 16 / 12, gap 12; report the measured values.

## Content
header: Content · title: Name the finding, then the hint · description: Name the topic in the title and add one sentence of context. The badge is a one- or two-word status, such as “On track”, that doesn't repeat the title. Give the footer one hint and at most one action, labelled with a verb.
One ExampleCard "One finding, one hint" › CI(). Description: "“Emergency savings”, how far along it is, “On track”, and one way to get there."

## In context
header: In context · title: A savings insight on the Insights screen · description: Set up runs the screen's own action through the footer's onPressButton. Once the plan is set, the screen passes a new footer without a button; the card doesn't change itself.
Composition in `.coin-new-context`: `<VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes}>` with `<Title title="Insights" subtitle="October 2026" modes={LIGHT} />` and CI({ footer: planned ? <Nudge type="inline-compact" body="₹10,000 moves to savings on the 1st of each month." /> : <Nudge type="inline-compact" body="Add ₹10,000 a month to reach it by June." buttonLabel="Set up" onPressButton={() => setPlanned(true)} /> }). Below, `<p className="coin-new-readout" role="status">`: "No plan yet" or "Plan set: the footer has no button".

## Do & Don'ts
header: Do & Don’ts · title: One clear finding · description: Each pair shows a card people read at a glance next to one that squeezes its title or leaves its footer empty.
- Do Keep the badge short: “On track” leaves the title room. — CI({ footer: false }) | Don't Write a long badge: “On track to finish by June” squeezes the title onto two lines. — CI({ footer: false, badge: 'On track to finish by June' })
- Do Write the footer's hint: an inline Nudge with text and one action. — CI() | Don't Rely on the default footer: It shows a lone sparkle with no text. — CI({ footer: undefined })
- Do Keep the subtitle to one sentence: It reads in one glance. — CI({ footer: false }) | Don't Write a paragraph as the subtitle: It wraps to several lines and pushes the figure down. — CI({ footer: false, subtitle: 'You have saved four of the eight months of expenses we suggest keeping aside, based on what you spent over the last six months.' })

## Sources
header: Sources · title: Use the public Card Insight contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (16 October build) from the team’s private package repository. Figma’s Card/Insight is one 356 × 322 component with a title, a subtitle, and a slot; its badge, divider, and footer are fixed, its badge is green, and its bar is purple, while the package defaults to gold. The default footer is an empty nudge with no text, and the default figure’s caption, “Credit usage”, is white on the white card, so these examples pass their own; Emphasis Medium or Low hide the bar’s fill. All three are reported. A System badge’s label is white, as in Figma. The published Storybook shows an older footer with text and still shows the older generated page.

## Limits
Don't show Dark, Semantic Intent System, Emphasis, LinearProgress Size, Nudge padding, Border Boolean, Badge Size, Page type, context 8 or 10, Text Appearance, a SavingsGoalSummary label, style props, or onPress demos. Don't imply a pressed look, or a divider without a footer.
