# OTP source evidence

## Checked

1 October 2026. Declared and installed `jfs-components` is `0.1.77` from the private package repo `spiefi/coin-components` (newest tag `v0.1.77`). Board ticket #22 (Design documentation — Marcin; Storybook coverage — Biscuit, done).

## Sources

- Figma: [Coin Components Library · OTP](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2759-330), symbol `2759:330` (360 × 107): "slot wrap" with six `Input/PINSlot` instances (48 × 39, 8 px apart), then a right-aligned `Support Text`. Tokens: `otp/gap` 36, `otp/padding/horizontal` 8, `otp/padding/vertical` 8, `pinSlot/width` 48, `pinSlot/gap` 8, `pinSlot/digit/*` JioType Var 24/29 weight 500 #000000, `pinSlot/underline/height` 2, `radius` 1, `color` #a07a3f (active), `supportText/*` 12/16, icon 16, gap 4. Read through the Figma MCP (jiofinance.in account). The first slot is drawn active with a caret.
- Storybook: `components-otp--docs`. Stories: `--default` (6, "Enter OTP sent to your phone"), `--four-digits` ("Enter 4-digit PIN"), `--controlled`, `--highlight-on-entry` (filled slots stay lit; deleting fades a slot back), `--on-complete`, `--disabled`, `--invalid` ("123456", "Invalid OTP"), `--with-custom-support-text`, `--with-resend-countdown` (30 s), `--validation-flow` (123456 succeeds; editing clears the error; resend clears the value), `--standalone-resend` (`OTPResend`), `--with-use-otp-resend-hook` (headless hook with custom UI). `length` control range 4–8.
- Package source `src/components/OTP/OTP.tsx` (0.1.77). Public exports: `OTP`, `OTPResend`, `useOtpResend`, and their types.

## Contract

- Props: `length` (default 6), `value` / `defaultValue`, `onChange` / `onValueChange`, `onComplete` (fires once when the last slot fills), `isDisabled`, `isInvalid`, `errorMessage`, `supportText` (string or node), `supportTextStatus` (SupportText: Neutral, Warning, Error, Success, Loading; default Neutral), `resend` (`durationSeconds` 30, `onResend`, `autoStart` true, `formatCountdown`, `sendingLabel` "Sending…", `resendLabel` "Resend", `countdownStatus` Loading, `resendButtonModes`), `allowedPattern` (digits), `autoFocus`, `enableSmsAutofill` (default true: iOS `oneTimeCode`, Android `one-time-code`), `modes`, `style`.
- Designer-configurable: length, support text and its status, error message, invalid, disabled, resend timer.
- System-driven: one hidden number-pad input behind the slots; filled slots and the focused active slot light in the brand colour (fade in 120 ms, out 220 ms); a blinking caret marks the active slot while focused; invalid snaps every underline to red; support area priority is error → resend → support text; resend runs counting → ready (Button, Neutral / S / Low) → sending → counting.
- Developer-only: value wiring, `onComplete`, validation, `allowedPattern`, `autoFocus`, SMS autofill, `formatCountdown`, `resendButtonModes`, `useOtpResend`, `style`.
- The screen owns validation: OTP only reflects `isInvalid`.

## Rendered (installed 0.1.77, web, Light)

- Root `div[role=presentation]` (no testID), column, `align-items: flex-end`, 8 px padding, 36 px gap; hidden `input[aria-label="OTP input, N digits"]` first; then the slot row; then the support area. `aria-disabled="true"` and opacity 0.4 when disabled.
- Slots 48 × 39: a 48 × 29 digit box (JioType Var 24/29, 500, black) above a 48 × 2 underline. Idle underline rgb(48, 51, 56); lit rgb(160, 122, 63); invalid rgb(204, 0, 38). Error label rgb(245, 0, 48).
- Natural width = 48 × length + 8 × (length − 1) + 16: 232 (4), 344 (6), 400 (7), 456 (8). Slots never shrink: in a 334 px parent a 6-digit OTP overflows by 2 px and an 8-digit one by 114 px. Figma differs slightly: its slot wrap is a fixed 344 px frame (slots fill 328 px of it), so the symbol is 360 px; in code the row hugs the slots, so a 6-digit OTP is 344 px. In a wider parent, slots stay left-aligned and the support area right-aligned.
- Resend: countdown "Resend OTP in Ns" with the clock (Loading) icon; when ready, a 32 px pill Button "Resend".
- Support text 12/16. Without support content an OTP is 55 px tall; with it, 107 px.

## Kit

- Added `FitWidth` to the guide kit (1 October 2026): fixed-width components such as OTP are shown at natural size and scaled down, still interactive, only when the host is narrower, with a "Shown at N%" tag. Review fix: the box needs `align-items: flex-start`, or the inner stretched to the scaled height and collapsed. Needed because a 6-digit OTP (344 px) is wider than an example card at 390 px.

## Limits

- No loading/verifying state: the page uses Disabled with a Loading-status support line for "verifying".
- Codes longer than 6 digits are wider than common phone screens (Coin gap, board ticket #178).
- Do not show Dark mode, `style`, `allowedPattern`, `formatCountdown`, `resendButtonModes`, or the `useOtpResend` custom UI.

## Verification

`npm run verify` passed on 1 October 2026 (home page, search, and 39 guides at 1280 and 390 px) on jfs-components 0.1.77. Planner review of desktop and 390 px captures. Playground typing updates the Entered readout and reports Complete at 6 digits. In context: 111111 shows "Incorrect code. Try again." and the "Incorrect code" status, editing returns to "Waiting for the code", 123456 gives "Number verified". Review fixes: kit error (`FitWidth` collapsed scaled content; fixed with `align-items: flex-start`) and brief error (6 digits are 344 px, 4 digits 232 px, not 360 and 224).
