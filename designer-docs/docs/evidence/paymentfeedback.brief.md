# Payment Feedback brief

slug: paymentfeedback · label: Payment Feedback · public API: PaymentFeedback (+ IconCapsule for renderMedia; VStack, Title, Button for composition; ScreenFrame from the kit for In context)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1056-3084 · storybook: docsUrl('paymentfeedback') · stories: Default=components-paymentfeedback--default, Without details=components-paymentfeedback--without-details, Failed payment=components-paymentfeedback--failed-payment, Warning payment=components-paymentfeedback--warning-payment, Custom media=components-paymentfeedback--custom-media
checked: 13 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-c1fa197, Biscuit's main c1fa197; main's 7020bf9 only rewrites the Storybook page for it)
icon: a circle with a check mark — `<><circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.5" /><path d="m6.2 9.2 1.9 1.9 3.7-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /></>`
keywords: payment status, payment result, transaction result, success screen, payment confirmation, receipt

Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`; `const DETAILS = '13 October 2026, 4:15 pm\nTransaction ID: TXN121466784'`; `noop = () => {}`.
Outcomes (AppearanceSystem · iconName · subtitle · body):
- PAID: `positive` · `ic_confirm` · “Payment successful” · “Sent to Rahul Sharma.”
- PENDING: `warning` · `ic_info` · “Payment pending” · “Your bank is still processing it.”
- FAILED: `negative` · `ic_close` · “Payment failed” · “Something went wrong. Please try again.”
“PF(outcome)” = `<PaymentFeedback title="₹1,250" subtitle=… body=… details={DETAILS} iconName=… modes={{ ...LIGHT, AppearanceSystem: … } as Modes} />`. Render it directly in example cards with `style={{ maxWidth: '100%' }}` (Storybook centres it in a column with no frame, so it shrinks to its longest line and wraps at the host's width; the docs stage is a flex row, which would let a long title run past the card). It has no `testID`; never wrap it in your own helper.
Selectors inside a specimen (I = `[role="img"]`, the only one): icon `[role="img"]`; message `[role="img"] + div`; title `[role="img"] + div > [dir="auto"]`; subtitle `[role="img"] + div > div > [dir="auto"]:first-child`; body `[role="img"] + div > div > [dir="auto"]:nth-child(2)`; details `[role="img"] + div + div`; root `div:has(> [role="img"])`.

## Overview
summary: Use a Payment Feedback on the screen after a payment to show the amount, whether it went through, and its reference.
principle: Lead with the amount, then say the outcome in words.
playground: `.preview-stage` › PF(status) with `body` set only when Body is on and `showDetails={details}`; stage label "Live Coin Payment Feedback". Controls: Segment "Status" `Paid | Pending | Failed` (Paid) → PAID / PENDING / FAILED; OnOff "Body" (on); OnOff "Details" (on) → `showDetails`. Readout title "Status", value `positive · ic_confirm` (or `warning · ic_info`, `negative · ic_close`); note: "The colour comes from AppearanceSystem in modes. The icon and the words don't follow it, so set them to match."

## Anatomy
header: Anatomy · title: An icon, an amount, and the outcome · description: A status icon sits above the amount, with the outcome and an optional sentence under it and the date and reference at the bottom, all centred. The icon and the words are separate settings.
specimen: `<Anatomy specimenWidth={328} …>` › PF(PAID).
parts:
1. Icon — An 81 px Icon Capsule coloured by AppearanceSystem; renderMedia replaces it. — target: icon — side: top
2. Amount — The title: 36 px heavy text. The component adds no currency sign. — target: title — side: right
3. Status — The subtitle: the outcome in words, at 16 px. — target: subtitle — side: left
4. Body — Optional: one sentence under the status, at 14 px. — target: body — side: right
5. Details — One line per line break in details; showDetails hides them. — target: details — side: bottom

## Configuration
header: Configuration · title: Three outcomes and your own mark · description: Set the outcome with AppearanceSystem in modes: positive is green, warning orange, and negative red. The icon and the words don't follow it, so set iconName and the status line to match. renderMedia replaces the icon with your own.
Grid `coin-new-example-grid` (two columns), each an ExampleCard › one PaymentFeedback:
- Paid — PF(PAID) — lesson: positive with ic_confirm, the default: a check on green.
- Pending — PF(PENDING) — lesson: warning with ic_info, while the bank hasn't confirmed it.
- Failed — PF(FAILED) — lesson: negative with ic_close: a white cross on red.
- Your own mark — `<PaymentFeedback modes={LIGHT} title="₹10,000" subtitle="Transfer complete" body="Moved to your savings account." details={DETAILS} renderMedia={<IconCapsule iconName="ic_confirm" modes={{ 'Icon Capsule Size': 'L', Emphasis: 'High', AppearanceBrand: 'Primary' } as Modes} />} />` (as Storybook's Custom media story; the capsule gets the component's modes under its own) — lesson: renderMedia swaps in your own, here a gold brand capsule.

## States
header: States · title: Shown once, with optional lines · description: Payment Feedback has no pressed, disabled, or loading state: the screen shows it once the payment has a result. The body appears only when you set it, and showDetails turns the details off.
Grid `coin-new-example-grid three`, each an ExampleCard:
- Everything — PF(PAID) — lesson: Amount, status, body, and details.
- No details — PF(PAID) with `showDetails={false}` — lesson: showDetails off hides the date and reference.
- Amount and status — PF(PAID) without `body` and with `showDetails={false}` — lesson: The shortest version: the amount and the outcome.

## Sizing
header: Sizing · title: As wide as its container · description: It has no width of its own: it fills its container, or shrinks to its longest line when centred, as in the examples above and in Storybook. The 81 px icon sits 46 px above the amount, 12 px separate the amount from the status, and the details come 46 px below. Figma's version is 328 px wide.
Measured diagram: `<Anatomy legend={false} specimenWidth={328} marks={[{ kind: 'size', target: root, side: 'right', label: 'both' }, { kind: 'gap', from: icon, to: message }, { kind: 'gap', from: title, to: '[role="img"] + div > div' }, { kind: 'gap', from: message, to: details }]}>` › PF(PAID). Expected about 328 wide, gaps 46, 12, 46; report the measured values.

## Content
header: Content · title: Amount, outcome, reference · description: Write the amount as it was paid, with its currency sign: the component adds none. Put the outcome in the status line in sentence case, keep the body to one sentence, and give the details one fact per line, split with a line break.
One ExampleCard "Amount, outcome, reference" › PF(PAID). Description: "₹1,250, “Payment successful”, who it went to, then the date and transaction ID."

## In context
header: In context · title: A payment result screen · description: Pay swaps the payment screen for the result: the amount, the outcome, and the reference, with Done below to leave. Payment Feedback has no button of its own, so the screen adds one.
Composition in `.coin-new-context`: a `<ScreenFrame size="full">` (the 320 px screen is too short for the result) holding `<VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes} style={{ flex: 1, padding: 16 }} justifyVertical="space-between">` with, while not paid, `<Title title="Pay Rahul Sharma" subtitle="HDFC Bank ··4821" modes={LIGHT} />` and a full-width `<Button label="Pay ₹1,250" modes={LIGHT} onPress={pay} />` at the bottom; once paid, PF(PAID) centred in `<VStack modes={LIGHT} style={{ flex: 1 }} justifyVertical="center">` and a full-width `<Button label="Done" modes={LIGHT} onPress={done} />` at the bottom. `pay` shows the result; `done` goes back. Below the frame, `<p className="coin-new-readout" role="status">`: "Ready to pay" (start and after Done), "Payment successful: ₹1,250 to Rahul Sharma" after Pay.

## Do & Don'ts
header: Do & Don’ts · title: The outcome at a glance · description: Each pair shows a result people read correctly next to one that hides or contradicts the outcome.
- Do Say the outcome in words: “Payment failed” tells everyone what happened, not only people who see the red. — PF(FAILED) | Don't Rely on the colour: Only the red icon says this payment failed. — PF(FAILED) with `subtitle="To Rahul Sharma"` and no `body`
- Do Match the icon to the outcome: A cross on red for a failed payment. — PF(FAILED) | Don't Keep the default check: A check mark on red says success and failure at once. — PF(FAILED) without `iconName`
- Do Keep the title to the amount: “₹1,250” reads at a glance. — PF(PAID) | Don't Write a sentence in the title: 36 px heavy text wraps into a block nobody reads first. — PF(PAID) with `title="Your payment of ₹1,250 was successful"`

## Sources
header: Sources · title: Use the public Payment Feedback contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (12 October build) from the team’s private package repository. Figma’s Payment Feedback is one 328 × 316 component showing a successful payment, with Title, Subtitle, Body and Details text and a details switch; pending and failed exist only in code, through AppearanceSystem. Storybook’s stories use a cross for failed and an info icon for pending; Biscuit’s newer Storybook page, not yet published, suggests the error and warning icons instead. In code the amount sits on a 44 px line (36 in Figma). Of the modes, set only AppearanceSystem: AppearanceBrand and Page type change nothing, and the default icon keeps its own size, emphasis and intent. It has no label of its own and doesn’t announce the result: its text is read in order, and the icon is an image with no name. The published Storybook still shows the old page.

## Limits
Don't show Dark, `Context`, `style`, `renderMedia={false}`, AppearanceBrand or Page type. Don't imply that the icon or words follow AppearanceSystem, that it announces the result, or that it has a button, loading, pressed, or disabled state.
