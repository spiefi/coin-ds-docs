# OTP (brief)

> Coin agent pack 0.1.78+19 · flagged · full entry: `components/otp.md` (sources, all facts, flags)

Use OTP to enter a one-time verification code, one digit per slot, with an optional resend timer.

**Use when**
- Enter a one-time verification code, one digit per slot, with an optional resend timer.
- Verifying a phone number with a code sent to it.

**Placement**
- OTP fills its container.
- Slots are up to 48 px wide with 8 px gaps, plus 8 px padding, so 6 digits need 344 px at full size.
- In a narrower container the slots shrink: 8 digits fit a 334 px phone column at about 33 px each.
- In a wider container, slots stay 48 px at the left.

**Key rules**
- `length`: One digit per slot.
- `length`: Match the number of slots (length) to the code the service sends.
- `length` = `6`: 6 digits is the default, and the length most SMS codes use.
- `length` = `4`: 4 digits for 4-digit codes. Slots stay 48 px, so the row is shorter, not wider-spaced.
- Avoid: `length`: Don't add spare slots: empty slots left after the code make people think a digit is missing.
- Below the slots, show guidance (supportText), a resend timer (resend), or nothing.
- `resend`: A resend timer (resend): a countdown replaces the support text and becomes a Resend button when it ends.
- `resend`: Use the resend timer: it counts down, then becomes a Resend button.

**Example:** Verifying a phone number, the guide's In context: a Card with a heading line, a line saying where the code went, and a 6-digit OTP with a 30-second resend timer. The screen keeps the code (value and onChange), checks it when the last digit is entered (onComplete), and sets isInvalid; errorMessage then replaces the timer.

```tsx
<Card>
  <VStack>
    <Text text="Verify your number" />
    <Text text="We sent a 6-digit code to your phone." />
    <OTP
      value=""
      onChange={() => {}}
      onComplete={() => {}}
      isInvalid={false}
      errorMessage="Incorrect code. Try again."
      resend={{ durationSeconds: 30, onResend: () => {} }}
    />
  </VStack>
</Card>
```

**Props:** `length`, `value`, `defaultValue`, `onChange`, `onValueChange`, `onComplete`, `isDisabled`, `isInvalid`, `allowedPattern`, `autoFocus`, `modes`, `style`, `supportText`, `supportTextStatus` (Neutral | Warning | Error | Success | Loading), `errorMessage`, `resend`, `enableSmsAutofill`. (* required)

**Modes it reads:** AppearanceBrand, AppearanceSystem, Button / Size, Button / State, Color Mode, Context, context 10, Context2, Emphasis, FormField States, Input/PINSlot  States, Page type, Profile Card Appearance, Semantic Intent, Status.

**Gaps (report, do not work around)**
- OTP has no verifying state; the screen checks the code and sets the error.

Full entry: `components/otp.md`. Links: `components/otp.links.md`.
