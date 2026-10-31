# Numpad

> Coin agent pack 0.1.78+26 (pilot). Generated from `components/numpad.json`; the JSON is the source of truth.

- **State:** flagged (5 flags, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `31f1c5e` · built 2026-10-31T03:54:03Z
- **Category:** input (for discovery only, not a limit on composition) · **Tags:** keypad, number pad, keyboard, PIN, OTP, passcode
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=numpad) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2054-964) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-numpad--docs)

Use the Numpad to enter a PIN, a one-time code, or an amount on screen, without the system keyboard.

## Use when

- **recommended** Enter a PIN, a one-time code or an amount on screen, without the system keyboard.  
  _From summary: “Use the Numpad to enter a PIN, a one-time code, or an amount on screen, without the system keyboard.”_
- **recommended** Secure by default: keep the digits shuffled whenever the number is sensitive.  
  _From corePrinciple: “Secure by default. Keep the digits shuffled whenever the number is sensitive.”_
- **recommended** Enter an amount to add to a wallet, as in the guide's In context.  
  _From inContext: “Adding money to a wallet”_

## Avoid when

_None in the guide._

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Digit key | A large digit; each key takes an equal share of the row. | yes | anatomy: “A large digit; each key takes an equal share of the row.” |
| Decimal point | Optional; hide it for whole numbers such as a PIN. | no | anatomy: “Optional; hide it for whole numbers such as a PIN.” |
| Backspace | The backspace key, always at the bottom right. | yes | anatomy: “always at the bottom right.” |
| Key gap | 12 px between keys, across and down. | yes | anatomy: “12 px between keys, across and down.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

_No slots._

## Placement

- **recommended** Give the Numpad the full width of the screen.  
  _From sizing: “Give it the full width of the screen.”_
- **recommended** The parent sets the width.  
  _From sizing: “The parent sets the width”_
- **recommended** Keys share the width equally and are at least 46 px tall, with 12 px gaps.  
  _From sizing: “Keys share the width equally and are at least 46 px tall, with 12 px gaps.”_
- **recommended** At 318 px wide each key is 98 × 46 px.  
  _From sizing: “At 318 px wide each key is 98 × 46 px.”_

## Configuration

- **recommended** The keys have no fill; they dim while pressed.  
  _From anatomy: “The keys have no fill; they dim while pressed.”_
- **recommended** `shuffle`: Shuffle is on by default and protects sensitive numbers.  
  _From configuration: “Shuffle is on by default and protects sensitive numbers.”_
- **REQUIRED** `shuffle` = `false`: Turn shuffle off only for numbers that are not secret.  
  _From configuration: “Turn it off only for numbers that are not secret.”_
- **recommended** `shuffle` = `true`: Shuffled, the default, is for PINs, codes and amounts: the digits move, against shoulder-surfing.  
  _From configuration: “The default. Digits move each time, against shoulder-surfing; for PINs, codes, and amounts.”_
- **recommended** `shuffle`: With shuffle on, the digits take a new order each time the Numpad mounts; the decimal and backspace keys keep their places.  
  _From fact `/facts/props/3` (shuffle, source types)_
- **recommended** `shuffle` = `false`: In order (shuffle={false}): the familiar 1–9 layout, for numbers that are not secret, such as a quantity.  
  _From configuration: “The familiar 1–9 layout, for numbers that are not secret, such as a quantity.”_
- **discouraged** `shuffle` = `false`: Don't use a fixed layout for a PIN: a fixed 1–9 layout lets onlookers read the PIN from finger positions.  
  _From doDont: “A fixed 1–9 layout lets onlookers read the PIN from finger positions.”_
- **recommended** `showDecimal`: The decimal key shows by default (showDecimal).  
  _From fact `/facts/props/2` (showDecimal, source types)_
- **recommended** `showDecimal` = `false`: Hide the decimal point (showDecimal={false}) when only whole numbers are valid.  
  _From configuration: “Hide the decimal point when only whole numbers are valid.”_
- **recommended** `showDecimal` = `false`: Without the decimal, for whole numbers such as a PIN, the bottom-left key is left empty.  
  _From configuration: “For whole numbers such as a PIN; the bottom-left key is left empty.”_
- **discouraged** `showDecimal` = `true`: Don't offer a decimal for a PIN: a decimal key invites an entry that can never be valid.  
  _From doDont: “A decimal key invites an entry that can never be valid.”_
- **recommended** `onKeyPress`: The Numpad only reports keys (onKeyPress): the screen keeps the value.  
  _From inContext: “The Numpad only reports keys.”_
- **recommended** There are no disabled or selected keys; the screen decides what a key press does.  
  _From states: “There are no disabled or selected keys; the screen decides what a key press does.”_
- **recommended** `onKeyPress`: onKeyPress is called with the key pressed: “0” to “9”, “.” or “backspace”.  
  _From fact `/facts/props/1` (onKeyPress, source evidence)_
- **recommended** `onKeyPress`: On the guide's Add money card, the screen keeps the amount, updates the value above the pad on each key press, and enables its button once there is an amount.  
  _From inContext: “The screen keeps the amount, updates the value above the pad on each key press, and enables the button once there is an amount.”_

## Content

- **recommended** The Numpad has no display: put the value above it, such as the formatted amount for money.  
  _From content: “The Numpad has no display. Put the value above it: the formatted amount for money”_
- **REQUIRED** For a PIN, show masked dots above the pad, never the PIN itself.  
  _From content: “or masked dots for a PIN, never the PIN itself.”_

Good: “● ● ○ ○”

## States

| State | When | From |
| --- | --- | --- |
| Pressed | A key dims to 40% while it is pressed; this is the Numpad's one interactive state. | states: “Numpad has one interactive state: a key dims to 40% while it is pressed.” |

## Accessibility

- **recommended** Each key is a button named by its digit, “.” or “Backspace”. ⚑ flagged (trace-check)  
  _From evidence: “Keys: `button` named by the digit, "." or "Backspace"”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Shuffle for a PIN | Use a fixed layout for a PIN | A fixed 1–9 layout lets onlookers read the PIN from finger positions. |
| Hide the decimal for a PIN | Offer a decimal for a PIN | A decimal key invites an entry that can never be valid. |

## Examples

### A PIN pad, the guide's Content PIN and its Do “Shuffle for a PIN”: masked dots above a Numpad with shuffle left on (the default) and no decimal key. “● ● ○ ○” stands for a four-digit PIN with two digits typed; onKeyPress stands for the screen updating the PIN and its dots on each key press.

```tsx
<VStack>
  <Text text="● ● ○ ○" />
  <Numpad showDecimal={false} onKeyPress={() => {}} />
</VStack>
```

_From content: “or masked dots for a PIN, never the PIN itself.”_

### Adding money to a wallet, the guide's In context, before any amount is typed: a Card holding a VStack with the text “Add money”, a shuffled Numpad with its decimal key, and the screen's Button, disabled and reading “Enter an amount” until there is an amount. onKeyPress stands for the screen updating the amount on each key press, and onPress for adding the money. The guide shows the amount (₹0) between the text and the pad in a MoneyValue, which has no entry in this pack, so it is left out: report that the amount needs MoneyValue.

```tsx
<Card>
  <VStack>
    <Text text="Add money" />
    <Numpad onKeyPress={() => {}} />
    <Button label="Enter an amount" disabled onPress={() => {}} />
  </VStack>
</Card>
```

_From inContext: “The screen keeps the amount, updates the value above the pad on each key press, and enables the button once there is an amount.”_

### Digits in order, the guide's In order: the familiar 1–9 layout (shuffle={false}) for a number that is not secret, such as a quantity; the decimal key shows, as in the guide's example. onKeyPress stands for the screen updating the number.

```tsx
<Numpad shuffle={false} onKeyPress={() => {}} />
```

_From configuration: “The familiar 1–9 layout, for numbers that are not secret, such as a quantity.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `modes` | `Modes` |  |  |  | types | Design token modes for theming (e.g., {"Color Mode": "Light"}) |
| `onKeyPress` ⚑ flagged (trace-check) | `(key: NumpadKeyValue) => void` |  |  |  | evidence (2026-09-29) | Called with the key pressed: “0” to “9”, “.” or “backspace”. Declared: Callback fired when any key is pressed. |
| `showDecimal` | `boolean` |  | `true` |  | types | Whether to show the decimal point key (default: true) Default true, from the component source. |
| `shuffle` | `boolean` |  | `true` |  | types | When true, digit positions (0-9) are randomised on each mount for anti-keylogging / shoulder-surfing protection. The decimal and backspace keys keep their fixed positions. Default true, from the component source. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Override container styles. |
| `keyStyle` | `StyleProp<ViewStyle>` |  |  |  | types | Override individual key styles. |
| `keyTextStyle` | `StyleProp<TextStyle>` |  |  |  | types | Override text styles on digit / decimal keys. |

### Modes

_No modes._

### Slots

_No slots._

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onKeyPress` | `(key: NumpadKeyValue) => void` |  |  |  | types | Callback fired when any key is pressed |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- Figma shows the keys in 1–9 order with a “←” glyph; the package shuffles the digits by default and draws a backspace icon. _(evidence, 2026-09-29)_ ⚑ flagged (trace-check)
- Figma's Numpad is 318 × 245, with 98 × 52.25 keys; the package's keys are at least 46 px tall, and at 318 px wide it measures 318 × 220, with 98 × 46 keys. _(evidence, 2026-09-29)_ ⚑ flagged (trace-check)

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/facts/props/1` · trace-check: Checked on jfs-components 0.1.77 (2026-09-29); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/gaps/0` · trace-check: Checked on jfs-components 0.1.77 (2026-09-29); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/gaps/1` · trace-check: Checked on jfs-components 0.1.77 (2026-09-29); the installed package is 0.1.78. Re-check before relying on it.
- `/accessibility/0` · trace-check: Checked on jfs-components 0.1.77 (2026-09-29); the installed package is 0.1.78. Re-check before relying on it.
- `/avoidWhen` · trace-check: The guide gives no avoidWhen guidance; left empty rather than guessed.
