# Recharge Card brief

slug: rechargecard · label: Recharge Card · public API: RechargeCard (+ Avatar in `subscriptionContent`, Button in `actions`; Title and VStack for In context; the kit's FitWidth)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2235-937 · storybook: docsUrl('rechargecard') · stories: Default=components-rechargecard--default, Without subscriptions=components-rechargecard--without-subscriptions, Button group size override=components-rechargecard--button-group-size-override
checked: 20 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-c7d3348; Biscuit's newer e60f8bd8 changes only the Storybook page)
icon: a card with a price line and two short lines — `<><rect x="2.5" y="2.5" width="13" height="13" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M5.5 6h4M5.5 9.5h7M5.5 12.5h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /></>`
keywords: plan card, prepaid plan, recharge plan, mobile plan, data pack

Setup: `LIGHT = { 'Color Mode': 'Light' } as Modes`; `noop = () => {}`; `W = { width: 312 }` (Figma's width and the card's minimum).
SUBS = `<><Avatar style="Monogram" monogram="JH" /><Avatar style="Monogram" monogram="JS" /><Avatar style="Monogram" monogram="+2" /></>` (no modes: the card sizes them).
ONE = `<Button label="Recharge" onPress={noop} />`; TWO = `<><Button label="Recharge" onPress={noop} /><Button label="View details" onPress={noop} modes={{ Emphasis: 'Low' } as Modes} /></>`.
PLAN = `{ title: 'Unlimited 5G', price: 349, validity: '28 days', data: '2 GB/day', disclaimer: 'Unlimited voice and 100 SMS a day.\nSpeed drops to 64 kbps after 2 GB.' }`; DATA = `{ title: 'Data pack', price: 19, validity: '1 day', data: '1.5 GB', disclaimer: 'Data only. No voice or SMS.', subscriptionContent: undefined }`.
“RC(overrides = {})” = `<RechargeCard {...PLAN} subscriptionContent={SUBS} actions={ONE} modes={LIGHT} style={W} {...overrides} />` (overrides win, including `modes` and `style`).
Every RC outside the Anatomy diagrams sits in the kit's `<FitWidth>` (playground, every ExampleCard, both sides of each Do & Don't, In context): the card never goes below 312 px.
Selectors (no testID; static root): `R = ':scope > div'`; header `${R} > div:nth-child(1)`; title `${R} > div:nth-child(1) > [dir="auto"]`; price `${R} > div:nth-child(1) > div:last-child`; specs `${R} > div:nth-child(2)`; first fact `${R} > div:nth-child(2) > div:nth-child(1)`; apps `${R} > div:nth-child(2) > div:nth-child(3) > div:last-child`; fine print `${R} > div:nth-child(3)`; actions `${R} > div:nth-child(4)`.

## Overview
summary: Use a Recharge Card to show one prepaid plan: its price, validity, data, the apps it includes, and the action to buy it.
principle: One plan, priced up front.
playground: `.preview-stage` › `<FitWidth>` › RC({ subscriptionContent: apps ? SUBS : undefined, actions: count === 'two' ? <><Button label="Recharge" onPress={() => setLast('Recharge pressed')} /><Button label="View details" onPress={() => setLast('View details pressed')} modes={{ Emphasis: 'Low' } as Modes} /></> : <Button label="Recharge" onPress={() => setLast('Recharge pressed')} />, modes: { ...LIGHT, 'Button / Size': size } }); stage label "Live Coin Recharge Card". Controls: OnOff "subscriptionContent" (on); Segment "actions" `one | two` (one); Segment "Button / Size" `S | M` (S). Readout title "Last press", value "None", "Recharge pressed" or "View details pressed"; note: "The card itself isn’t pressable: only its buttons act."

## Anatomy
header: Anatomy · title: A plan in four rows · description: A white panel stacks the plan’s name and price, a row of facts, the fine print, and the actions, 20 px apart. The facts row has a third column when the plan includes apps.
specimen: `<Anatomy specimenWidth={312} …>` › RC() (no FitWidth here).
parts:
1. Title — title: the plan’s name, 12 px bold. — target: title — side: top
2. Price — A MoneyValue from price, 36 px; the card adds the ₹. — target: price — side: right
3. Plan facts — validity and data under fixed labels, in equal columns. — target: first fact — side: left
4. Apps — subscriptionContent: your Avatars, overlapped at size S. — target: apps — side: right
5. Fine print — disclaimer, 10 px; a line break in the text starts a new line. — target: fine print — side: left
6. Actions — actions: your Buttons, purple and size S. — target: actions — side: bottom
7. Panel — A white panel, 20 px corners, 1 px border, at least 312 px wide. — target: R — side: right, at 0.9

## Configuration
header: Configuration · title: Facts, apps, and actions · description: subscriptionContent adds a third column, Subscriptions, for the apps the plan includes: pass Avatars, and the card overlaps them at size S. Leave it out for two columns. actions takes your Buttons, and the card makes them purple, size S, and Emphasis High; give a second one Emphasis Low, as Figma does. The buttons always split their row into equal widths, so with two, the longer label is cut short. On the card, Button / Size M makes them bigger, and AppearanceBrand and Emphasis change all of them. The card’s own text and panel don’t change with modes.
Body: `<div className="coin-new-stack">` with two `coin-new-example-grid` grids (two columns), each card in `<FitWidth>`.
Grid 1:
- With apps — RC() — lesson: Three columns, with the apps the plan includes.
- No apps — RC(DATA) — lesson: Two columns for a plan without apps.
- Two actions — RC({ actions: TWO }) — lesson: Equal halves: the longer label, View details, is cut short.
- Button / Size M — RC({ modes: { ...LIGHT, 'Button / Size': 'M' } }) — lesson: A bigger, 42 px button.
Grid 2:
- AppearanceBrand Primary — RC({ modes: { ...LIGHT, AppearanceBrand: 'Primary' } }) — lesson: A gold button.
- Emphasis Medium — RC({ modes: { ...LIGHT, Emphasis: 'Medium' } }) — lesson: A light purple button.

## States
header: States · title: Its buttons act, or the whole card does · description: The card isn’t pressable: its buttons are. onPress makes the whole card one button, announced by its title, and disabled then stops it firing without changing its look. Use one or the other: a pressable card with actions puts buttons inside a button. The card has no selected or loading state.
Grid `coin-new-example-grid` (two columns), each in `<FitWidth>`:
- Buttons act — RC() — lesson: Only Recharge presses.
- Whole card — RC({ actions: undefined, onPress: noop }) — lesson: The card is the button; the empty actions row still leaves space below.

## Sizing
header: Sizing · title: At least 312 px wide · description: The card is never narrower than 312 px, as Figma draws it, and fills a wider host. The facts share the width in equal columns, and the price stays at the left. Height follows the content: 20 px between the rows and 20 px of padding at the top and bottom, 16 px at the sides. Without actions, the empty row still adds 20 px at the bottom.
Body: `<div className="coin-new-stack">` with the measured diagram, then a grid.
Measured diagram: `<Anatomy legend={false} specimenWidth={312} marks={[{ kind: 'size', target: R, side: 'bottom', label: 'both' }, { kind: 'padding', target: R }, { kind: 'gap', from: header, to: specs }]}>` › RC(). Expected 312 × 271, padding 20/16, gap 20; report the measured values.
Grid `coin-new-example-grid` (two columns), each in `<FitWidth>`:
- Wide host — RC({ style: { width: 360 } }) — lesson: The fact columns get wider; the price stays at the left.
- No actions — RC({ ...DATA, actions: undefined }) — lesson: An empty row still leaves 20 px under the fine print.

## Content
header: Content · title: A name, a number, and short facts · description: Make the title the plan’s name and the price a number: the card adds the ₹. Keep validity and data to one value each, such as 28 days and 2 GB/day; the labels Validity, Data, and Subscriptions are fixed. Put the plan’s limits in the disclaimer, in a line or two of fine print. Label the main action Recharge.
Grid `coin-new-example-grid` (two columns), each in `<FitWidth>`:
- Unlimited plan — RC() — lesson: Price, validity, data, and the apps included.
- Data pack — RC(DATA) — lesson: A small top-up, with its limit in the fine print.

## In context
header: In context · title: Plans on the Recharge screen · description: The screen lists plans one under another. Each Recharge starts the screen’s own payment through the Button’s onPress; the card only lays out the plan.
Composition in `.coin-new-context` › `<FitWidth>` › `<VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes}>` › `<Title title="Popular plans" subtitle="For 98765 43210" modes={LIGHT} />`, RC({ actions: <Button label="Recharge" onPress={() => setPicked('Unlimited 5G, ₹349')} /> }) and RC({ ...DATA, actions: <Button label="Recharge" onPress={() => setPicked('Data pack, ₹19')} /> }). Below the FitWidth, `<p className="coin-new-readout" role="status">`: “No plan picked” or “Paying for <plan>”.

## Do & Don'ts
header: Do & Don’ts · title: One clear action, a plain price, no empty rows · description: Each pair shows a card that reads cleanly next to one that cuts a label, doubles the ₹, or leaves a gap. Both sides sit in `<FitWidth>`.
- Do One main action: Recharge fits its button. — RC() | Don't Two actions: The row splits equally, so View details is cut short. — RC({ actions: TWO })
- Do Price as a number: price 349 shows ₹349. — RC() | Don't ₹ in the price: The card adds its own, so it shows ₹₹349. — RC({ price: '₹349' })
- Do Pass your actions: The card ends at its buttons. — RC() | Don't Leave out actions: An empty row still leaves space under the fine print. — RC({ actions: undefined })

## Sources
header: Sources · title: Use the public Recharge Card contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (19 October build of Biscuit’s main) from the team’s private package repository. Figma’s Recharge Card exposes only <code>title</code> and <code>disclaimer</code> as properties; the price, facts, apps, and buttons are layers there. In the package, <code>actions</code> always split their row into equal widths, so of two different labels the longer is cut short (Biscuit’s own Storybook shows “View Det…”), while Figma’s buttons fit their labels. Without actions an empty row still adds space. The card is 271 px tall where Figma’s is 261, because its text lines are taller. The ₹ and the labels Validity, Data, and Subscriptions are fixed, a card without <code>onPress</code> isn’t announced by its title, and <code>disabled</code> has no look of its own. The published Storybook renders every story as a pressable card and still shows the older generated page (all reported).

## Limits
Don't show Dark, Context, Context2, Context3, Context4, context 10, Page type, Avatar Size, Badge Size, Semantic Intent or Button / State. Don't show `disabled` as a visual state or `subscriptionContent={false}`. Don't imply the currency or labels can change, that the buttons fit their labels, or that the card is pressable by default.
