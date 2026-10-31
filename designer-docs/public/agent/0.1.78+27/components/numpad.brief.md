# Numpad (brief)

> Coin agent pack 0.1.78+27 · flagged · full entry: `components/numpad.md` (sources, all facts, flags)

Use the Numpad to enter a PIN, a one-time code, or an amount on screen, without the system keyboard.

**Use when**
- Enter a PIN, a one-time code or an amount on screen, without the system keyboard.
- Secure by default: keep the digits shuffled whenever the number is sensitive.
- Enter an amount to add to a wallet, as in the guide's In context.

**Placement**
- Give the Numpad the full width of the screen.
- The parent sets the width.
- Keys share the width equally and are at least 46 px tall, with 12 px gaps.
- At 318 px wide each key is 98 × 46 px.

**Key rules**
- **REQUIRED** `shuffle` = `false`: Turn shuffle off only for numbers that are not secret.
- **REQUIRED** For a PIN, show masked dots above the pad, never the PIN itself.
- The keys have no fill; they dim while pressed.
- `shuffle`: Shuffle is on by default and protects sensitive numbers.
- `shuffle` = `true`: Shuffled, the default, is for PINs, codes and amounts: the digits move, against shoulder-surfing.
- `shuffle`: With shuffle on, the digits take a new order each time the Numpad mounts; the decimal and backspace keys keep their places.
- `shuffle` = `false`: In order (shuffle={false}): the familiar 1–9 layout, for numbers that are not secret, such as a quantity.
- Avoid: `shuffle` = `false`: Don't use a fixed layout for a PIN: a fixed 1–9 layout lets onlookers read the PIN from finger positions.

**Example:** A PIN pad, the guide's Content PIN and its Do “Shuffle for a PIN”: masked dots above a Numpad with shuffle left on (the default) and no decimal key. “● ● ○ ○” stands for a four-digit PIN with two digits typed; onKeyPress stands for the screen updating the PIN and its dots on each key press.

```tsx
<VStack>
  <Text text="● ● ○ ○" />
  <Numpad showDecimal={false} onKeyPress={() => {}} />
</VStack>
```

**Props:** `modes`, `onKeyPress`, `showDecimal`, `shuffle`, `style`, `keyStyle`, `keyTextStyle`. (* required)

**Gaps (report, do not work around)**
- Figma shows the keys in 1–9 order with a “←” glyph; the package shuffles the digits by default and draws a backspace icon.
- Figma's Numpad is 318 × 245, with 98 × 52.25 keys; the package's keys are at least 46 px tall, and at 318 px wide it measures 318 × 220, with 98 × 46 keys.

Full entry: `components/numpad.md`. Links: `components/numpad.links.md`.
