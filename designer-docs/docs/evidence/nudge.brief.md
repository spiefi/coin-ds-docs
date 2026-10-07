# Nudge brief

slug: nudge · label: Nudge · public API: Nudge (+ ListItem, IconCapsule, Button, Card, MoneyValue, VStack for content and composition)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=9177-4104 · storybook: docsUrl('nudge') · stories: Default=components-nudge--default, Without icon=components-nudge--without-icon, With close button=components-nudge--with-close-button, Inline compact=components-nudge--inline-compact, Stacked detailed=components-nudge--stacked-detailed
checked: 7 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-3795b4c; Biscuit's main 636f3f5 does not change Nudge)
icon: a card with a sparkle and two lines — `<><rect x="1.5" y="3.5" width="15" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.5" /><path d="M8 7.5h5.5M8 10.5h3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M4.75 6.5v2.5M3.5 7.75h2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></>`
keywords: promo card, suggestion, tip, upsell, banner

Setup: `const NA = { 'Color Mode': 'Light', AppearanceBrand: 'Neutral', Context: 'Nudge&Alert' } as Modes` (every Nudge, unless stated: `Context: 'Nudge&Alert'` gives Figma's small button). Appearance variants: `{ ...NA, AppearanceBrand: 'Primary' | 'Secondary' | 'Tertiary' }`; `SYSTEM = { ...NA, 'Semantic Intent': 'System', AppearanceSystem: 'warning' }`. `const LIGHT = { 'Color Mode': 'Light' } as Modes`; `const CARD = { 'Color Mode': 'Light', AppearanceBrand: 'Neutral' } as Modes`; `const CAPSULE = { 'Color Mode': 'Light', Emphasis: 'Low', 'Icon Capsule Size': 'S' } as Modes`. `noop = () => {}`; every default Nudge gets `onPressButton={noop}` unless stated.
Copy: `SPLIT = { title: 'Split payment', body: 'Pay ₹12,000 in 3 monthly instalments.', buttonLabel: 'See plans' }`; `AUTOPAY = { body: 'Set up autopay so you never miss a bill.', buttonLabel: 'Set up' }`. "Reasons" = three `<ListItem layout="Horizontal" navArrow={false} modes={NA} … />`: "No extra cost" / "You pay ₹12,000 in total" (leading `<IconCapsule iconName="ic_offer" modes={CAPSULE} />`), "Three monthly payments" / "₹4,000 on the 5th of each month" (`ic_calendar`), "Pay with your card" / "Any Jio credit card" (`ic_card`).
Nudge fills its container: "Host" = `<div className="coin-new-host wide"><VStack modes={LIGHT} style={{ width: '100%', padding: 0 }}>{children}</VStack></div>`. Nudge takes no `testID`: in Anatomy, `R = ':scope > div'` is the card. If `:scope` selectors match nothing, wrap the specimen in `<VStack testID="nudge-anatomy" modes={LIGHT} style={{ width: '100%', padding: 0 }}>` and use `${byTestId('nudge-anatomy')} > div` for `R`.

## Overview
summary: Use a Nudge for a short suggestion with one action, such as splitting a payment, that sits within a screen’s content.
principle: One helpful suggestion, one clear next step.
playground: `.preview-stage` › Host › Nudge with `type` from Type, `modes={{ ...NA, AppearanceBrand: appearance }}`, `showClose={close}`, `startSlot={icon ? undefined : null}`, `onPressButton={() => setAction('Button pressed')}`, `onClose={() => setAction('Close pressed')}`; Prominent uses SPLIT, Compact uses AUTOPAY, Detailed uses `title="Why split this payment?"` with Reasons as children. Controls: Segment "Type" `Prominent | Compact | Detailed` (→ stacked-prominent, inline-compact, stacked-detailed); Segment "Appearance" `Primary | Secondary | Neutral | Tertiary` (default Neutral); OnOff "Close button" (off); OnOff "Icon" (on). Readout title "Last action", value "None" / "Button pressed" / "Close pressed"; note: "Close only reports the tap; the screen removes the nudge. Detailed has no button or close." Stage label: "Live Coin Nudge".

## Anatomy
header: Anatomy · title: An icon, a message, and one action · description: A tinted card puts a sparkle beside a bold title and a line of detail, with one small button below. A close button can sit on the right.
specimen: `<Anatomy specimenWidth={344} …><Nudge modes={NA} {...SPLIT} onPressButton={noop} /></Anatomy>`
parts:
1. Icon — A 20 px sparkle by default; it can be swapped or removed. — target: `${R} > div:first-child` — side: left
2. Title — 14 px bold; says what’s on offer in a line. — target: `${R} > div:nth-child(2) > div:first-child > div:first-child` — side: top
3. Body — 12 px; one sentence of detail. — target: `${R} > div:nth-child(2) > div:first-child > div:nth-child(2)` — side: right
4. Button — The one next step, as a small pill. — target: `${R} [role="button"]` — side: bottom
5. Card — Tinted by its appearance mode, with 12 px padding. — target: `R` — side: top — at: 0.9

## Configuration
header: Configuration · title: Type, appearance, and a close button · description: Choose the type for the space and content you have, and an appearance mode for its colour. Add a close button when people may dismiss it, and pass the Nudge&Alert context so the button is the small size from Figma.
Grid `coin-new-example-grid`, each a Host:
- Stacked prominent — `<Nudge modes={NA} {...SPLIT} />` — lesson: The default: a title and body stacked beside the icon, the button below.
- Inline compact — `<Nudge type="inline-compact" modes={NA} {...AUTOPAY} />` — lesson: One line of text with the button beside it. It has no title.
- Stacked detailed — `<Nudge type="stacked-detailed" modes={NA} title="Why split this payment?">{Reasons}</Nudge>` — lesson: A title over your own content, such as list items. No button or close.
- Close button — `<Nudge modes={NA} {...SPLIT} showClose onClose={noop} />` — lesson: Adds an X on the right. The screen removes the nudge when it’s pressed.
- Without icon — `<Nudge modes={NA} startSlot={null} title="Turn on autopay" body="Pay your electricity bill on time, every month." buttonLabel="Turn on" />` — lesson: Remove the sparkle when the message needs no accent.
- Brand appearances — one Host holding four prominent Nudges with SPLIT copy and `AppearanceBrand` Primary, Secondary, Neutral, Tertiary, in that order — lesson: AppearanceBrand tints the card, body, icon, and button together.
- System warning — `<Nudge modes={SYSTEM} title="Bill due tomorrow" body="Pay ₹1,240 to avoid a late fee." buttonLabel="Pay now" />` — lesson: System intent colours the card for a status: positive, warning, or negative.
- With a border — `<Nudge modes={{ ...NA, 'Border Boolean': 'True' }} {...SPLIT} />` — lesson: A 1 px grey border separates a white card from a white screen.

## States
header: States · title: A static card with live buttons · description: The card isn’t interactive. Its button and close button have their own pressed and focus states. Nudge has no hidden state: after a close, the screen removes it.
One ExampleCard "Close removes it" (description: "Press the X: the screen hides the nudge. Bring it back with the button.") › Host › shown: `<Nudge modes={NA} {...SPLIT} showClose onClose={() => setShown(false)} />`; hidden: `<Button label="Show the nudge again" onPress={() => setShown(true)} modes={LIGHT} />`.

## Sizing
header: Sizing · title: Full width, as tall as its content · description: A Nudge fills its container. It has 12 px of padding and 6 px between the icon, the content, and the close button; the title and body are 4 px apart, with 8 px above the button. Long copy wraps and the card grows.
Measured diagram: `<Anatomy legend={false} specimenWidth={344} marks={[{ kind: 'size', target: R, side: 'bottom', label: 'both' }, { kind: 'padding', target: R }, { kind: 'gap', from: `${R} > div:first-child`, to: `${R} > div:nth-child(2)` }]}>` › `<Nudge modes={NA} {...SPLIT} />`. Expected 344 × 96.
Then ExampleCard "Long copy wraps" (description: "At 344 px, a two-line title and body make the card 129 px tall; the close button stays centred.") › Host › `<Nudge modes={NA} showClose onClose={noop} title="Split this ₹12,000 purchase into easy monthly instalments" body="Pay in 3, 6 or 9 months at no extra cost with your Jio credit card." buttonLabel="See plans" />`.

## Content
header: Content · title: A benefit, a detail, and a next step · description: Write the title as the benefit, the body as one sentence of detail, and the button as a verb or two. Nudge’s own copy is a placeholder, so always set all three.
One ExampleCard "Benefit, detail, next step" › Host › `<Nudge modes={NA} title="Turn on autopay" body="Pay your electricity bill on time, every month." buttonLabel="Turn on" />`.

## In context
header: In context · title: A suggestion on a payment screen · description: The nudge sits between the amount and the Pay button, in a lavender appearance that stands out on the white card. The screen handles its button and removes it on close.
Composition in `.coin-new-context`: `<Card modes={CARD}>` › `<Card.Title>Pay Croma</Card.Title>`, `<MoneyValue value="12,000" currency="₹" modes={CARD} />`, then (while shown) `<Nudge modes={{ ...NA, AppearanceBrand: 'Secondary' }} {...SPLIT} showClose onPressButton={() => setStatus('Showing instalment plans')} onClose={() => { setShown(false); setStatus('Suggestion dismissed') }} />`, then `<Button label="Pay ₹12,000" onPress={() => setStatus('Paid ₹12,000')} modes={LIGHT} />`. Below the card, `<p className="coin-new-readout" role="status">{status}</p>`, starting “Ready to pay ₹12,000”.

## Do & Don'ts
header: Do & Don’ts · title: One clear suggestion at the right size · description: Each pair shows a nudge people can read and act on versus one that shouts, says nothing, or hides its action.
Every preview is a Host.
- Do Use the Nudge&Alert context: The button is Figma’s small pill and stays below the message. — `<Nudge modes={NA} {...SPLIT} />` | Don't Leave the context unset: The button grows to 42 px and outweighs the message. — `<Nudge modes={{ 'Color Mode': 'Light', AppearanceBrand: 'Neutral' }} {...SPLIT} />`
- Do Write your own copy: The title, body, and button say what’s on offer. — `<Nudge modes={NA} title="Turn on autopay" body="Pay your electricity bill on time, every month." buttonLabel="Turn on" />` | Don't Ship the placeholder copy: Without props it reads “Split payment” and “Button”. — `<Nudge modes={NA} />` (no copy props, no `onPressButton`)
- Do Use stacked detailed for a list: A title over list items explains the offer. — `<Nudge type="stacked-detailed" modes={NA} title="Why split this payment?">{Reasons}</Nudge>` | Don't Expect an action on stacked detailed: It ignores the button and close, so people have nothing to tap. — `<Nudge type="stacked-detailed" modes={NA} title="Split payment" buttonLabel="See plans" showClose />` (no children)

## Sources
header: Sources · title: Use the public Nudge contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> from the team’s private package repository. Figma’s Nudge is a component set with three types, 344 px wide, and the package matches its spacing. Figma shows a close button on every prominent and compact card; the package adds it only when asked. Figma’s small button needs the Nudge&Alert context, and its white card with a purple icon matches no single appearance mode; Neutral is the closest. In Dark mode the title stays dark on a dark card, so this page shows Light only. The card has no role or name on the web, and the close button is always labelled “Close”.

## Limits
Do not show Dark mode, `Nudge padding: None`, `buttonSlot`, `closeSlot`, a custom `startSlot`, or `style`. Do not show `Context` unset outside the Don’t. Do not imply the card closes itself, that compact shows a title, or that detailed has a button or close.
