# Card Feedback brief

slug: cardfeedback · label: Card Feedback · public API: CardFeedback with CardFeedback.Icon, .Content, .Title, .Body, .Action (+ Button inside Action; VStack and Title for composition)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1280-4481 · storybook: docsUrl('cardfeedback') · stories: Default=components-cardfeedback--default, Custom content=components-cardfeedback--with-custom-content, Multiple actions=components-cardfeedback--multiple-actions, Icon prop=components-cardfeedback--with-icon-prop
checked: 19 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-c7d3348, Biscuit's main c7d3348, which fixes #286)
icon: a tinted panel with a tick — `<><rect x="2.5" y="3.5" width="13" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="m5.5 7.2 1 1 1.8-2M5.5 11.5h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /></>`
keywords: feedback card, status card, result card, success message, error message, inline alert

Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`; `noop = () => {}`; `const FRAME = { width: '100%', maxWidth: 328 } as const` (Figma's width).
STATUS = {
  positive: { icon: 'ic_status_successful', title: 'Payment successful', body: '₹1,250 was sent to Rahul Sharma.', action: 'View receipt' },
  warning: { icon: 'ic_warning', title: 'KYC pending', body: 'Finish KYC by 31 October to keep investing.', action: 'Complete KYC' },
  negative: { icon: 'ic_error', title: 'Payment failed', body: 'Your bank declined the payment. No money was taken.', action: 'Try again' },
}.
`QUIET = { 'Semantic Intent': 'Brand', AppearanceBrand: 'Neutral', Emphasis: 'Low' } as Modes` (a quiet text button: a Button's own modes win over the card's since #286; Emphasis alone doesn't change a System button).
“FB(status, { actions, quiet, icon, title, body, card })” =
```tsx
<CardFeedback modes={{ ...LIGHT, AppearanceSystem: status } as Modes} style={FRAME} {...card}>
  <CardFeedback.Icon icon={icon ?? STATUS[status].icon} />
  <CardFeedback.Content>
    <CardFeedback.Title>{title ?? STATUS[status].title}</CardFeedback.Title>
    <CardFeedback.Body>{body ?? STATUS[status].body}</CardFeedback.Body>
    {actions?.length ? <CardFeedback.Action>{actions.map(a => <Button key={a} label={a} modes={a === quiet ? QUIET : undefined} onPress={noop} />)}</CardFeedback.Action> : null}
  </CardFeedback.Content>
</CardFeedback>
```
`actions` defaults to `[STATUS[status].action]`; pass `[]` for none. Pass no `modes` to the Buttons except the quiet one: the card hands them its own. `card` takes root props: `onPress`, `disabled`, `accessibilityLabel`.
Since #286 the card's parts keep its modes inside a VStack, HStack or Stack, so In context uses a Coin VStack. Every example card sits straight on the grey example stage; no Surface, FitWidth or host.
Selectors (no testID; `R = ':scope > div'`, the card root): icon `${R} > div:first-child`; content `${R} > div:nth-child(2)`; title `${R} > div:nth-child(2) > [dir="auto"]:first-child`; body `${R} > div:nth-child(2) > [dir="auto"]:nth-child(2)`; action `${R} > div:nth-child(2) > div:last-child`.

## Overview
summary: Use a Card Feedback to show the result of an action in the page, such as a payment that went through or failed, with one next step.
principle: Say what happened, then what to do next.
playground: `.preview-stage` › FB(status, { actions: action ? [STATUS[status].action] : [] }) with the Button's `onPress={() => setLast(`${STATUS[status].action} pressed`)}`; stage label "Live Coin Card Feedback". Controls: Segment "Status" `positive | warning | negative` (positive); OnOff "Action" (on). Readout title "Last action", value "None" or "<label> pressed"; note: "Only the button acts; the card itself isn't pressable here."

## Anatomy
header: Anatomy · title: An icon, the outcome, and a next step · description: A tinted panel stacks a status icon, a title, one line of detail, and an optional row of buttons. You build it from the card's parts: Icon, Content, Title, Body, and Action.
specimen: `<Anatomy specimenWidth={328} …>` › FB('positive').
parts:
1. Icon — CardFeedback.Icon: a 20 px registry icon in the status colour. — target: icon — side: left
2. Title — CardFeedback.Title: the outcome in a few words, 14 px. — target: title — side: top
3. Body — CardFeedback.Body: one sentence of detail, 12 px; it wraps. — target: body — side: left
4. Action — CardFeedback.Action: a row of small buttons in the status colour. — target: action — side: bottom
5. Panel — A tinted panel with 12 px padding and corners; AppearanceSystem sets the tint. — target: R — side: right

## Configuration
header: Configuration · title: Three statuses · description: AppearanceSystem sets the status: positive, the default, is green; warning is orange; negative is red. It colours the panel, the icon, and the buttons in Action. Pick an icon that matches: the card colours it but doesn't choose it. AppearanceBrand only shifts the title and body colour slightly.
Grid `coin-new-example-grid three`:
- Positive — FB('positive') — lesson: Green for a result that went through.
- Warning — FB('warning') — lesson: Orange for something to finish soon.
- Negative — FB('negative') — lesson: Red for something that failed.

## States
header: States · title: With or without actions · description: The card itself is static: only the buttons you put in Action respond. onPress makes the whole card one button instead; use it only when the card has no buttons inside, and name it with accessibilityLabel. A pressable card fades slightly on hover and more while pressed, and shows a ring on keyboard focus. disabled fades it to half and ignores presses.
Grid `coin-new-example-grid` (two columns):
- Message only — FB('positive', { actions: [] }) — lesson: Icon, title, and body: nothing to press.
- Two actions — FB('negative', { actions: ['Try again', 'Change bank'], quiet: 'Change bank' }) — lesson: Buttons take the status colour; a Button’s own modes make the second one quieter.
- Pressable card — FB('positive', { actions: [], card: { onPress: noop, accessibilityLabel: 'Payment successful. View receipt' } }) — lesson: onPress with no buttons inside: press it to see it fade.
- Disabled — FB('positive', { actions: [], card: { onPress: noop, disabled: true, accessibilityLabel: 'Payment successful. View receipt' } }) — lesson: Half opacity, and presses are ignored.

## Sizing
header: Sizing · title: Your screen sets the width · description: The card fills its host's width; Figma draws it at 328 px. It's as tall as its content and at least 59 px, with 12 px padding and 8 px between the icon, the text, and the actions. Title and body wrap, and buttons wrap onto a new row when they run out of room.
Measured diagram: `<Anatomy legend={false} specimenWidth={328} marks={[{ kind: 'size', target: R, side: 'bottom', label: 'both' }, { kind: 'padding', target: R }, { kind: 'gap', from: icon, to: content }]}>` › FB('positive'). Expected 328 wide, about 126 tall, padding 12, gap 8; report the measured values.

## Content
header: Content · title: The outcome, then the next step · description: Make the title the outcome, such as “Payment failed”, and the body one sentence on what it means for the person. Label each button with a verb, and keep to one or two. The colour alone doesn't carry the status for everyone, so the title has to say it.
One ExampleCard "Outcome, detail, next step" › FB('negative'). Description: "“Payment failed”, what happened to the money, and “Try again”."

## In context
header: In context · title: A failed payment on the Pay screen · description: Try again runs the screen's own retry through the button's onPress. When the retry goes through, the screen swaps the card for a positive one; the card doesn't change itself or time out.
Composition in `.coin-new-context` › `<VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes}>` (since #286 a Coin stack no longer strips the card's modes) with `<Title title="Pay Rahul Sharma" subtitle="₹1,250 from HDFC Bank" modes={LIGHT} />` and, when `paid` is false, FB('negative') whose Try again Button has `onPress={() => setPaid(true)}`; when `paid` is true, FB('positive') whose View receipt Button has `onPress={() => setPaid(false)}`. Below, `<p className="coin-new-readout" role="status">`: "Payment failed" or "Retried: payment successful".

## Do & Don'ts
header: Do & Don’ts · title: A clear result and one next step · description: Each pair shows a card people read at once next to one that sends mixed signals or crowds its actions.
- Do Match the icon to the status: an error icon on the red card. — FB('negative', { actions: [] }) | Don't Reuse the success icon: A tick on a red card contradicts the title. — FB('negative', { actions: [], icon: 'ic_status_successful' })
- Do Make the title the outcome: “Payment failed” says it in two words. — FB('negative', { actions: [] }) | Don't Put the detail in the title: The title wraps and the outcome gets lost. — FB('negative', { actions: [], title: 'Your bank declined your payment of ₹1,250 to Rahul Sharma', body: 'No money was taken.' })
- Do One or two actions: They fit on one row. — FB('warning') | Don't Three or more actions: They wrap onto a second row and look the same. — FB('warning', { actions: ['Complete KYC', 'Remind me later', 'Contact support'] })

## Sources
header: Sources · title: Use the public Card Feedback contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code>, built from Biscuit’s main at c7d3348 (19 October) and taken from the team’s private package repository. Figma’s Card/Feedback is one 328 × 123 component with no properties; its status comes from modes, and its icon is a solid circle, while the package draws whichever registry icon you pass. The card doesn’t read the app’s theme, so Color Mode has to come through its modes. Inside a VStack or another Coin container that passes modes down, its parts keep the card’s status colours. Emphasis alone doesn’t quieten a button in the status colour, so the quieter action here switches to Brand Neutral at Emphasis Low. The published Storybook hasn’t been rebuilt: it still renders every story as a pressable card with buttons inside it, and shows the older generated page.

## Limits
Don't show Dark, Context, Semantic Intent Brand on the card, AppearanceBrand examples, or style props. Don't put Buttons inside a pressable card. Don't imply that Emphasis alone quietens a System button, that the card times out, or that it picks an icon for a status.
