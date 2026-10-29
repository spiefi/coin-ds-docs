# OTP

> Coin agent pack 0.1.78+12 (pilot). Generated from `components/otp.json`; the JSON is the source of truth.

- **State:** flagged (2 flags, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `622cd82` · built 2026-10-29T04:33:30Z
- **Category:** input (for discovery only, not a limit on composition) · **Tags:** one-time code, verification code, PIN input, passcode, OTP input
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=otp) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2759-330) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-otp--docs)

Use OTP to enter a one-time verification code, one digit per slot, with an optional resend timer.

## Use when

- **recommended** Enter a one-time verification code, one digit per slot, with an optional resend timer.  
  _From summary: “Use OTP to enter a one-time verification code, one digit per slot, with an optional resend timer.”_
- **recommended** Verifying a phone number with a code sent to it.  
  _From inContext: “Verifying a phone number”_

## Avoid when

_None in the guide._

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Digit | An entered digit, centred above its underline. | no | anatomy: “An entered digit, centred above its underline.” |
| Underline | Under every slot: lit in the brand colour when filled or active; red when invalid (isInvalid). | yes | anatomy: “Lit in the brand colour when filled or active; red when invalid.” |
| Empty slot | Waits for the next digit; its underline stays neutral. | no | anatomy: “Waits for the next digit; its underline stays neutral.” |
| Slot gap | A fixed 8 px between slots. | yes | anatomy: “A fixed 8 px between slots.” |
| Support line | Guidance (supportText), resend timer (resend), or error (errorMessage), right-aligned under the slots. | no | anatomy: “Guidance, resend timer, or error, right-aligned under the slots.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `supportText` | `ReactNode` | types |

## Placement

- **recommended** OTP fills its container.  
  _From sizing: “OTP fills its container.”_
- **recommended** Slots are up to 48 px wide with 8 px gaps, plus 8 px padding, so 6 digits need 344 px at full size.  
  _From sizing: “Slots are up to 48 px wide with 8 px gaps, plus 8 px padding, so 6 digits need 344 px at full size.”_
- **recommended** In a narrower container the slots shrink: 8 digits fit a 334 px phone column at about 33 px each.  
  _From sizing: “In a narrower container the slots shrink: 8 digits fit a 334 px phone column at about 33 px each.”_
- **recommended** In a wider container, slots stay 48 px at the left.  
  _From sizing: “In a wider one, slots stay 48 px at the left.”_
- **recommended** Figma and the package agree on 48 px slots and 8 px gaps, and on a right-aligned support line with a small Resend button.  
  _From sources: “Figma and the package agree on 48 px slots and 8 px gaps, and on a right-aligned support line with a small Resend button.”_

## Configuration

- **recommended** `length`: One digit per slot.  
  _From corePrinciple: “One digit per slot.”_
- **recommended** `length`: Match the number of slots (length) to the code the service sends.  
  _From configuration: “Match the number of slots to the code the service sends.”_
- **recommended** `length` = `6`: 6 digits is the default, and the length most SMS codes use.  
  _From configuration: “The default, and the length most SMS codes use.”_
- **recommended** `length` = `4`: 4 digits for 4-digit codes. Slots stay 48 px, so the row is shorter, not wider-spaced.  
  _From configuration: “For 4-digit codes. Slots stay 48 px, so the row is shorter, not wider-spaced.”_
- **discouraged** `length`: Don't add spare slots: empty slots left after the code make people think a digit is missing.  
  _From doDont: “Empty slots left after the code make people think a digit is missing.”_
- **recommended** Below the slots, show guidance (supportText), a resend timer (resend), or nothing.  
  _From configuration: “Below the slots, show guidance, a resend timer, or nothing.”_
- **recommended** `resend`: A resend timer (resend): a countdown replaces the support text and becomes a Resend button when it ends.  
  _From configuration: “A countdown replaces the support text and becomes a Resend button when it ends.”_
- **recommended** `resend`: Use the resend timer: it counts down, then becomes a Resend button.  
  _From doDont: “It counts down, then becomes a Resend button.”_
- **discouraged** `supportText`: Don't write the timer as support text (supportText): a static line never counts down or becomes tappable.  
  _From doDont: “A static line never counts down or becomes tappable.”_
- **recommended** `supportTextStatus`: Give the support line a status (supportTextStatus) when it reports something; keep Neutral for instructions.  
  _From configuration: “Give the line a status when it reports something; keep Neutral for instructions.”_
- **recommended** `errorMessage`: Explain the error (errorMessage): the message says what went wrong and what to do.  
  _From doDont: “The message says what went wrong and what to do.”_
- **discouraged** `isInvalid`: Don't show red underlines alone (isInvalid without a message): without a message, people cannot tell what went wrong.  
  _From doDont: “Without a message, people cannot tell what went wrong.”_
- **recommended** `errorMessage`: errorMessage shows beneath the slots only while isInvalid is true, with the Error status; without it, an invalid OTP shows supportText with its status promoted to Error.  
  _From fact `/facts/props/14` (errorMessage, source types)_
- **recommended** `onComplete`: The screen keeps the code (value and onChange), checks it when the last digit is entered (onComplete), and sets the error (isInvalid).  
  _From inContext: “The screen keeps the code, checks it when the last digit is entered, and sets the error.”_
- **recommended** `isInvalid`: The screen checks the code; OTP only shows the result.  
  _From corePrinciple: “The screen checks the code; OTP only shows the result.”_
- **recommended** OTP has no verifying state; the screen checks the code and sets the error.  
  _From sources: “OTP has no verifying state; the screen checks the code and sets the error.”_
- **recommended** One hidden number-pad field takes the typing; the slots only display it.  
  _From anatomy: “One hidden number-pad field takes the typing; the slots only display it.”_
- **recommended** `enableSmsAutofill`: On phones, the keyboard offers the SMS code automatically (enableSmsAutofill, on by default).  
  _From inContext: “On phones, the keyboard offers the SMS code automatically.”_
- **recommended** `enableSmsAutofill`: On Android, filling the code from notifications also needs the app to be wired to the SMS Retriever or SMS User Consent APIs.  
  _From fact `/facts/props/16` (enableSmsAutofill, source types)_

## Content

- **recommended** `supportText`: The support line is one short line under the slots.  
  _From content: “The support line is one short line under the slots.”_
- **recommended** Say where the code went before entry, and what to do when it is wrong.  
  _From content: “Say where the code went before entry, and what to do when it is wrong.”_
- **recommended** `supportText`: Name the channel, so people know where to look.  
  _From content: “Name the channel, so people know where to look.”_
- **recommended** `errorMessage`: For an error, say what went wrong and what to do next, in one line.  
  _From content: “Say what went wrong and what to do next, in one line.”_

Good: “Enter the code sent to your phone”, “Incorrect code. Try again.”

## States

| State | When | From |
| --- | --- | --- |
| Typing | Filled slots stay lit, and the active slot lights with a caret while focused; delete a digit and its slot fades back. | states: “Filled slots stay lit, and the active slot lights with a caret while focused.” |
| Invalid | Set by the screen (isInvalid): every underline turns red, and the error replaces the support text or resend timer. | states: “Every underline turns red, and the error replaces the support text or resend timer.” |
| Disabled | Set by the screen (isDisabled): the whole field dims to 40% and takes no input, for example while the code is checked. | states: “The whole field dims to 40% and takes no input, for example while the code is checked.” |
| Counting down | With a resend timer: a countdown replaces the support text. | configuration: “A countdown replaces the support text and becomes a Resend button when it ends.” |
| Ready to resend | After the countdown, a small Resend button at the right. It reads “Sending…” while the request runs, then counts down again. | states: “After the countdown, a small Resend button at the right. It reads “Sending…” while the request runs, then counts down again.” |

## Accessibility

- **recommended** The hidden field that takes the typing is named “OTP input, N digits” for an N-digit code, and a disabled OTP is marked aria-disabled on the web. ⚑ flagged (trace-check)  
  _From evidence: “hidden `input[aria-label="OTP input, N digits"]` first; then the slot row; then the support area. `aria-disabled="true"` and opacity 0.4 when disabled.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Match the code length | Add spare slots | Empty slots left after the code make people think a digit is missing. |
| Explain the error | Show red underlines alone | Without a message, people cannot tell what went wrong. |
| Use the resend timer | Write the timer as text | A static line never counts down or becomes tappable. |

## Examples

### Verifying a phone number, the guide's In context: a Card with a heading line, a line saying where the code went, and a 6-digit OTP with a 30-second resend timer. The screen keeps the code (value and onChange), checks it when the last digit is entered (onComplete), and sets isInvalid; errorMessage then replaces the timer.

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

_From inContext: “The screen keeps the code, checks it when the last digit is entered, and sets the error.”_

### A wrong code: the screen sets isInvalid and an errorMessage that says what went wrong and what to do.

```tsx
<OTP isInvalid defaultValue="481902" errorMessage="Incorrect code. Try again." />
```

_From doDont: “The message says what went wrong and what to do.”_

### While the code is checked: the screen disables the OTP and gives the support line the Loading status.

```tsx
<OTP isDisabled defaultValue="481902" supportText="Verifying code…" supportTextStatus="Loading" />
```

_From states: “The whole field dims to 40% and takes no input, for example while the code is checked.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `length` | `number` |  | `6` |  | evidence (2026-10-08) | Slots shrink to fit the container with a 48 px cap: 8 digits in a 334 px parent get 32.8 px slots and fit, 7 digits in 360 px get 42.3 px, 6 digits in 334 px get 46.3 px, and a wide parent keeps 48 px. Declared: Number of OTP digits. Defaults to 6. Default 6, from the component source. |
| `value` | `string` |  |  |  | types | Controlled value of the OTP input. |
| `defaultValue` | `string` |  | `""` |  | types | Default value for uncontrolled usage. Default "", from the component source. |
| `onChange` | `(value: string) => void` |  |  |  | types | Called when the OTP value changes. Receives the current string of entered digits. |
| `onValueChange` | `(value: string) => void` |  |  |  | types | Alias for onChange — called when the OTP value changes. |
| `onComplete` | `(value: string) => void` |  |  |  | types | Called when all digits have been entered. Receives the complete OTP string. |
| `isDisabled` | `boolean` |  | `false` |  | types | Whether the OTP input is disabled. Default false, from the component source. |
| `isInvalid` | `boolean` |  | `false` |  | types | Whether the OTP input is in an invalid/error state. Drives underline colour and (optionally) the error message. Default false, from the component source. |
| `allowedPattern` | `RegExp` |  |  |  | types | Regex pattern to filter allowed characters. Defaults to digits only. |
| `autoFocus` | `boolean` |  | `false` |  | types | Auto-focus the input on mount. Default false, from the component source. |
| `modes` | `Modes` |  |  |  | types | Design token modes for Figma token resolution. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Container style override. |
| `supportText` | `React.ReactNode` |  |  |  | evidence (2026-10-17) | Long support or error text wraps inside the field; short text stays on one line, right-aligned. Declared: Optional SupportText rendered below the slots. Pass a string for the label or a ReactNode for full control. |
| `supportTextStatus` | `SupportTextProps['status']` | Neutral, Warning, Error, Success, Loading |  |  | types | SupportText status when using the string shorthand. |
| `errorMessage` | `string` |  |  |  | types | Convenience: shown beneath the slots **only** while `isInvalid` is true. Renders with status="Error" automatically. When omitted, the regular `supportText` is shown instead (with status promoted to Error). |
| `resend` | `OTPResendConfig` |  |  |  | evidence (2026-10-13) | The “Resend OTP in Ns” countdown sits at the right of the support row; when it ends, Resend is a small 32 px tall pill at the right. Declared: When provided, replaces the support area with a managed countdown that decays into a "Resend" button. Hidden while `isInvalid` is true so the error message can take precedence. |
| `enableSmsAutofill` | `boolean` |  | `true` |  | types | Enable native one-time-code auto-fill on the underlying TextInput. On iOS this surfaces the SMS code in the QuickType bar above the keyboard (system-managed; no library required). On Android this sets `autoComplete="one-time-code"`, which the OS can auto-fill from notifications when the host app is wired up to the SMS Retriever or SMS User Consent APIs. Defaults to true. Default true, from the component source. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Primary"` |  | types | A token collection OTP reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `AppearanceSystem` | `mode collection` | positive, warning, negative | `"positive"` |  | types | A token collection OTP reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / Size` | `mode collection` | M, S, XS | `"M"` |  | types | A token collection OTP reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / State` | `mode collection` | Idle, Hover, Pressed, Disabled | `"Idle"` |  | types | A token collection OTP reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection OTP reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context` | `mode collection` | Default, Nudge&Alert, CTACard, ListItem | `"Default"` |  | types | A token collection OTP reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 10` | `mode collection` | Default, jioPlus | `"Default"` |  | types | A token collection OTP reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context2` | `mode collection` | Default, AppBar | `"Default"` |  | types | A token collection OTP reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Emphasis` | `mode collection` | High, Medium, Low | `"High"` |  | types | A token collection OTP reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `FormField States` | `mode collection` | Idle, Active, Read Only, Error, Disabled | `"Idle"` |  | types | A token collection OTP reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Input/PINSlot  States` | `mode collection` | Idle, Active, Error | `"Idle"` |  | types | A token collection OTP reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection OTP reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Profile Card Appearance` | `mode collection` | Default, Premium | `"Default"` |  | types | A token collection OTP reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Semantic Intent` | `mode collection` | Brand, System | `"Brand"` |  | types | A token collection OTP reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Status` | `mode collection` | Auto, Warning, Error, Success, Loading, Neutral | `"Auto"` |  | types | A token collection OTP reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `supportText` | `React.ReactNode` |  |  |  | types | Optional SupportText rendered below the slots. Pass a string for the label or a ReactNode for full control. |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onChange` | `(value: string) => void` |  |  |  | types | Called when the OTP value changes. Receives the current string of entered digits. |
| `onValueChange` | `(value: string) => void` |  |  |  | types | Alias for onChange — called when the OTP value changes. |
| `onComplete` | `(value: string) => void` |  |  |  | types | Called when all digits have been entered. Receives the complete OTP string. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- OTP has no verifying state; the screen checks the code and sets the error. _(evidence, 2026-10-17)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/accessibility/0` · trace-check: Checked on jfs-components 0.1.77 (2026-10-01); the installed package is 0.1.78. Re-check before relying on it.
- `/avoidWhen` · trace-check: The guide gives no avoidWhen guidance; left empty rather than guessed.
