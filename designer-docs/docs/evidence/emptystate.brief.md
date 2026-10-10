# Empty State brief

slug: emptystate · label: Empty State · public API: EmptyState (+ IconCapsule, Button for its slots; Card, ListGroup, ListItem, MoneyValue, VStack for composition)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1828-82 · storybook: docsUrl('emptystate') · stories: Default=components-emptystate--default, Without description=components-emptystate--without-description, Custom slots=components-emptystate--custom-slots
checked: 10 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-636f3f5, Biscuit's main 636f3f5)
icon: an empty inbox tray — `<><path d="M2.5 10.5 4.5 4h9l2 6.5v3a1.5 1.5 0 0 1-1.5 1.5H4a1.5 1.5 0 0 1-1.5-1.5v-3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M2.5 10.5h4l1 1.5h3l1-1.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></>`
keywords: no results, nothing here, zero state, blank state, error state

Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`; `const BTN = { 'Color Mode': 'Light', 'Button / Size': 'S' } as Modes`; `const CAP = { 'Color Mode': 'Light', 'Icon Capsule Size': 'L', Emphasis: 'Medium' } as Modes`; `const ERR = { 'Color Mode': 'Light', 'Icon Capsule Size': 'L', 'Semantic Intent': 'System', AppearanceSystem: 'negative' } as Modes`; `const CARD = { 'Color Mode': 'Light', AppearanceBrand: 'Neutral' } as Modes`; `noop = () => {}`.
EmptyState does not pass its modes to slot children: every IconCapsule and Button gets its own `modes` as stated. Every EmptyState gets `modes={LIGHT}` unless stated.
Reasons (icon · modes · title · description · button):
- EMPTY: `ic_wallet` · CAP · “No payments yet” · “Payments you make will show up here.” · “Make a payment”
- NORESULT: `ic_search` · CAP · “No matching payments” · “Try a different name or amount.” · “Clear search”
- FAILED: `ic_error` · ERR · “Couldn’t load payments” · “Check your connection and try again.” · “Try again”
“ES(reason)” = `<EmptyState modes={LIGHT} title=… description=… iconSlot={<IconCapsule iconName=… modes=… />} buttonSlot={<Button label=… onPress={noop} modes={BTN} />} />`.
Host = `<div className="coin-new-host wide"><VStack modes={LIGHT} style={{ width: '100%', padding: 0 }}>{children}</VStack></div>`.
Selectors, with `testID` on the EmptyState and `R = byTestId(id)`: icon `${R} > div:first-child > [role="img"]`; title `${R} > div:first-child > [dir="auto"]:nth-child(2)`; description `${R} > div:first-child > [dir="auto"]:nth-child(3)`; button `${R} > [role="button"]`; content group `${R} > div:first-child`.

## Overview
summary: Use an Empty State when a list or screen has nothing to show, to say why and offer one next step.
principle: Say what’s missing, then what to do next.
playground: `.preview-stage` › Host › ES(reason) with `showDescription={description}` and the button’s `onPress={() => setAction(`${label} pressed`)}`. Controls: Segment "Reason" `Nothing yet | No results | Couldn’t load` (→ EMPTY, NORESULT, FAILED; default Nothing yet); OnOff "Description" (on). Readout title "Last action", value "None" or e.g. "Make a payment pressed"; note: "The button does nothing until the screen gives it an action." Stage label: "Live Coin Empty State".

## Anatomy
header: Anatomy · title: An icon, a message, and one button · description: An icon sits above a bold title and a line of description, with one button below. The icon and the button are components you pass in.
specimen: `<Anatomy specimenWidth={236} …>` › ES(FAILED) with `testID="es-anatomy"`.
parts:
1. Icon — An Icon Capsule you pass in; its own modes set size and colour. — target: icon — side: top
2. Title — 16 px bold; says what’s missing. — target: title — side: right
3. Description — 12 px; why it’s empty or what to do. — target: description — side: left
4. Button — A Button you pass in, with your label and action. — target: button — side: bottom

## Configuration
header: Configuration · title: An icon and a button for the reason · description: Pick the icon and its colour for why the area is empty, and label the button with the next step. Turn the description off when the title says enough.
Grid `coin-new-example-grid`, each an ExampleCard › Host:
- Nothing yet — ES(EMPTY) — lesson: A soft brand icon when there’s simply nothing to show yet.
- No results — ES(NORESULT) — lesson: After a search or filter, say so and offer a way back.
- Couldn’t load — ES(FAILED) — lesson: A red error icon when loading failed; the button retries.
- Without a description — ES(EMPTY) with `showDescription={false}` — lesson: Drop the description when the title says it all.

## States
header: States · title: A static message with a live button · description: Empty State has no states of its own: the screen shows it while there’s nothing to list and replaces it when there is. Its button has the usual Button states.
Grid `coin-new-example-grid`, each an ExampleCard › Host:
- Ready — ES(FAILED) — lesson: The button waits for a press.
- Retrying — ES(FAILED) with `buttonSlot={<Button label="Try again" disabled modes={BTN} />}` — lesson: Disable the button while a retry is already running. (Button’s `loading` draws a skeleton placeholder, not a spinner: don’t use it here.)

## Sizing
header: Sizing · title: As wide as its container, as tall as its content · description: Empty State takes its width from its container and centres its text. It has 4 px of padding, 16 px between the icon, title, and description, and 24 px above the button. Figma’s version is 236 px wide.
Measured diagram: `<Anatomy legend={false} specimenWidth={236} marks={[{ kind: 'size', target: R, side: 'right', label: 'both' }, { kind: 'gap', from: content group, to: button }, { kind: 'gap', from: icon, to: title }]}>` › ES(FAILED) with `testID="es-size"`. Expected about 236 × 213, gaps 24 and 16; report the measured values.

## Content
header: Content · title: What’s missing, why, and what next · description: Write the title as what’s missing, in a few words. Use the description for why it’s empty or what will appear, and label the button with the next step. Empty State’s own copy and button are placeholders, so always set all of them.
One ExampleCard "What’s missing, why, what next" › Host › ES(EMPTY).

## In context
header: In context · title: An empty payments card · description: The Recent payments card shows the empty state until there’s a payment. Make a payment adds one, and the screen swaps the empty state for the list.
Composition in `.coin-new-context`: `<Card modes={CARD}>` › `<Card.Title>Recent payments</Card.Title>`, then while there are no payments ES(EMPTY) whose button adds a payment; otherwise `<ListGroup modes={LIGHT}>` with `<ListItem layout="Horizontal" modes={LIGHT} title="Netflix" supportText="Today · 17:30" trailing={<MoneyValue value="500" currency="₹" modes={LIGHT} />} />`, followed by `<Button label="Clear payments" onPress={…} modes={BTN} />` that empties the list. Below the card, `<p className="coin-new-readout" role="status">`: “No payments yet” or “1 payment”.

## Do & Don'ts
header: Do & Don’ts · title: A clear reason and a working next step · description: Each pair shows an empty state people can act on versus one that misleads them or does nothing.
Every preview is a Host.
- Do Pass your own button: “Make a payment” names the next step, and the screen handles the press. — ES(EMPTY) | Don't Leave the default button: It reads “Button” and does nothing when pressed. — ES(EMPTY) without `buttonSlot`
- Do Match the icon to the reason: A soft icon for an empty list; red only when something failed. — ES(EMPTY) | Don't Use the error icon for an empty list: A red alert makes “No payments yet” look like a failure. — ES(EMPTY) with `iconSlot={<IconCapsule iconName="ic_error" modes={ERR} />}`
- Do Give each slot its own modes: The icon and button get Figma’s sizes. — ES(EMPTY) | Don't Set sizes on Empty State only: It doesn’t pass them on, so the icon stays small and the button large. — `<EmptyState modes={{ ...LIGHT, 'Icon Capsule Size': 'L', 'Button / Size': 'S' } as Modes} title="No payments yet" description="Payments you make will show up here." iconSlot={<IconCapsule iconName="ic_wallet" />} buttonSlot={<Button label="Make a payment" onPress={noop} />} />`

## Sources
header: Sources · title: Use the public Empty State contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (5 October build) from the team’s private package repository. Figma’s Empty state is one 236 px component with a red 81 px icon and a 32 px button. In the package both slots default to placeholders, a small gold card icon and a button labelled “Button” with no action, and passing <code>null</code> keeps them. Empty State doesn’t pass its modes to the icon and button you give it, so set each one’s size and colour on it. Its title renders with a 20 px line height (18 in Figma). It has no background, so this page shows Light only, and on the web it has no role or heading and its icon has no name. The published Storybook still shows the old page.

## Limits
Do not show Dark mode, `null` or empty-fragment slots, `style`, or the default icon outside the Don’ts. Do not imply that Empty State hides its own button, announces itself, or passes modes to its slots.
