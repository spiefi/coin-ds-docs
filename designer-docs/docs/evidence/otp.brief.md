# OTP brief

slug: otp · label: OTP · public API: OTP (+ Card, VStack, Text for composition)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2759-330 · storybook: docsUrl('otp') · stories: Default=components-otp--default, Four digits=components-otp--four-digits, Invalid=components-otp--invalid, Disabled=components-otp--disabled, With resend countdown=components-otp--with-resend-countdown, Validation flow=components-otp--validation-flow
checked: 8 October 2026 · jfs-components 0.1.78 (5 October build, mirror tag v0.1.78-636f3f5)
icon: `<path d="M2.5 13.5h3M7.5 13.5h3M12.5 13.5h3M9 5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />`
keywords: one-time code, verification code, PIN input, passcode, OTP input

Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`; every Coin instance gets `modes={LIGHT}`. OTP fills its container and its slots shrink (up to 48 px), so put every live OTP in a Host, `<div className="coin-new-host wide">` (334 px inside, a phone column); the In context card needs no host, and Anatomy specimens use `specimenWidth={344}`. Do not use `FitWidth`: OTP no longer has a fixed width. Selectors (S = `input[aria-label^="OTP input"]`): root `div:has(> ${S})`; slot n `${S} + div > div:nth-child(n)`; digit `${slot} > div:first-child`; underline `${slot} > div:last-child`; support area `${S} + div + *`.
Fake resend for every `resend` config: `onResend: () => new Promise((r) => setTimeout(r, 600))`.

## Overview
summary: Use OTP to enter a one-time verification code, one digit per slot, with an optional resend timer.
principle: One digit per slot. The screen checks the code; OTP only shows the result.
playground: `.preview-stage` with `<Host><OTP key={length} length={length} value={value} onChange={setValue} …/></Host>` (changing Digits clears the value). Controls: Segment "Digits" 4 | 6 → `length` (default 6); Segment "Below" Text | Resend | None → Text: `supportText="Enter the code sent to your phone"`; Resend: `resend={{ durationSeconds: 10, onResend }}`; None: neither (default Text); OnOff "Invalid" → `isInvalid` + `errorMessage="Incorrect code. Try again."` (default Off); OnOff "Disabled" → `isDisabled` (default Off). Readout title "Entered", value = typed digits or "Nothing yet"; note: when complete "Complete. The screen verifies the code now." otherwise "Click the slots and type digits." Stage label: "Live Coin OTP".

## Anatomy
header: Anatomy · title: Slots and a support line · description: A row of slots, one per digit, over a single support line. One hidden number-pad field takes the typing; the slots only display it.
specimen: `<OTP defaultValue="48" supportText="Enter the code sent to your phone" />`; specimenWidth 344
parts:
1. Digit — An entered digit, centred above its underline. — target: digit of slot 1 — side: top
2. Underline — Lit in the brand colour when filled or active; red when invalid. — target: underline of slot 2 — side: left
3. Empty slot — Waits for the next digit; its underline stays neutral. — target: slot 4 — side: top
4. Slot gap — A fixed 8 px between slots. — between: [slot 5, slot 6] — side: top
5. Support line — Guidance, resend timer, or error; left-aligned in code, right-aligned in Figma. — target: support area — side: right
marks: gap slot row (`${S} + div`) → support area

## Configuration
header: Configuration · title: Length and what sits below · description: Match the number of slots to the code the service sends. Below the slots, show guidance, a resend timer, or nothing.
Grid `coin-new-example-grid`, each OTP in a Host:
- 6 digits — `<OTP supportText="Enter the code sent to your phone" />` — lesson: The default, and the length most SMS codes use.
- 4 digits — `length={4} supportText="Enter the 4-digit code"` — lesson: For 4-digit codes. Slots stay 48 px, so the row is shorter, not wider-spaced.
- Resend timer — `resend={{ durationSeconds: 30, onResend }}` — lesson: A countdown replaces the support text and becomes a Resend button when it ends.
- Status line — `supportText="Code sent" supportTextStatus="Success"` — lesson: Give the line a status when it reports something; keep Neutral for instructions.

## States
header: States · title: Typing, error, disabled, and resend · description: Filled slots stay lit, and the active slot lights with a caret while focused. The other states are set by the screen.
Grid `coin-new-example-grid`, each OTP in a Host:
- Typing — `defaultValue="481" supportText="Enter the code sent to your phone"` — lesson: Click and type: filled slots stay lit; delete a digit and its slot fades back.
- Invalid — `isInvalid defaultValue="481902" errorMessage="Incorrect code. Try again."` — lesson: Every underline turns red, and the error replaces the support text or resend timer.
- Disabled — `isDisabled defaultValue="481902" supportText="Verifying code…" supportTextStatus="Loading"` — lesson: The whole field dims to 40% and takes no input, for example while the code is checked.
- Ready to resend — `resend={{ autoStart: false, onResend }}` — lesson: After the countdown, a Resend button, which in this build stretches across the row. It reads “Sending…” while the request runs, then counts down again.

## Sizing
header: Sizing · title: Fills its container, slots up to 48 px · description: OTP fills its container. Slots are up to 48 px wide with 8 px gaps, plus 8 px padding, so 6 digits need 344 px at full size. In a narrower container the slots shrink: 8 digits fit a 334 px phone column at about 33 px each. In a wider one, slots stay 48 px at the left.
Measured diagram: `<Anatomy legend={false} specimenWidth={344} marks={[{ kind: 'size', target: root, side: 'top', label: 'both' }, { kind: 'size', target: slot 1, side: 'left', label: 'both' }, { kind: 'gap', from: slot 1, to: slot 2 }]}>` around `<OTP supportText="Enter the code sent to your phone" />`.

## Content
header: Content · title: Short, specific support text · description: The support line is one short line under the slots. Say where the code went before entry, and what to do when it is wrong.
Grid `coin-new-example-grid`, each OTP in a Host:
- Say where the code went — `supportText="Enter the code sent to your phone"` — lesson: Name the channel, so people know where to look.
- Say how to recover — `isInvalid defaultValue="481902" errorMessage="Incorrect code. Try again."` — lesson: Say what went wrong and what to do next, in one line.

## In context
header: In context · title: Verifying a phone number · description: The screen keeps the code, checks it when the last digit is entered, and sets the error. On phones, the keyboard offers the SMS code automatically. Enter 123456 to see success, anything else to see the error.
Composition in `.coin-new-context` › `<Card modes={LIGHT}>` › `<VStack modes={LIGHT}>`: `<Text>Verify your number</Text>`, `<Text>We sent a 6-digit code to your phone.</Text>`, `<OTP value onChange onComplete isInvalid errorMessage="Incorrect code. Try again." resend={{ durationSeconds: 30, onResend }} />`. Wiring: onChange sets the value and clears the error; onComplete: "123456" → verified, else isInvalid; onResend also clears the value and error. Below, `<p className="coin-new-readout" role="status">`: "Waiting for the code", "Incorrect code", or "Number verified".

## Do & Don'ts
header: Do & Don’ts · title: Keep entry clear · description: Each pair shows a choice that helps people finish verification versus one that stalls them.
Every preview is an OTP in a Host.
- Do Match the code length: Six slots for a 6-digit code; people know when they are done. — `defaultValue="481902" supportText="Enter the code sent to your phone"` | Don't Add spare slots: Empty slots left after the code make people think a digit is missing. — `length={8} defaultValue="481902" supportText="Enter the code sent to your phone"`
- Do Explain the error: The message says what went wrong and what to do. — `isInvalid defaultValue="481902" errorMessage="Incorrect code. Try again."` | Don't Show red underlines alone: Without a message, people cannot tell what went wrong. — `isInvalid defaultValue="481902"`
- Do Use the resend timer: It counts down, then becomes a Resend button. — `resend={{ durationSeconds: 30, onResend }}` | Don't Write the timer as text: A static line never counts down or becomes tappable. — `supportText="Didn’t get it? Resend in 30s"`

## Sources
header: Sources · title: Use the public OTP contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (5 October build) from the team’s private package repository. Figma and the package agree on 48 px slots and 8 px gaps. In code the slots shrink in a narrow container, so all of Storybook’s 4–8 digit lengths fit a phone. Figma right-aligns the support line and a small Resend button; in this build they sit at the left and Resend stretches across the row, which is reported to the Coin team. OTP has no verifying state; the screen checks the code and sets the error.

## Limits
Do not show Dark mode, `style`, `allowedPattern`, `autoFocus`, `formatCountdown`, `resendButtonModes`, `OTPResend` on its own, or the `useOtpResend` custom UI. Do not imply OTP validates the code, masks digits, or has a loading state, or that the support line and Resend are right-aligned in code (regression #210). Do not name or link the Coin Workflow board on the page.
