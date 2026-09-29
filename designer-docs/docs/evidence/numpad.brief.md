# Numpad brief

slug: numpad · label: Numpad · public API: Numpad (+ VStack, MoneyValue, Text, Button, Card for composition)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2054-964 · storybook: docsUrl('numpad') · stories: Default=components-numpad--default, Unshuffled=components-numpad--unshuffled, Without decimal=components-numpad--without-decimal, Bottom fixed=components-numpad--bottom-fixed
checked: 29 September 2026 · jfs-components 0.1.77 (newest package tag v0.1.77)
icon: `<path d="M4.5 4.5h.01M9 4.5h.01M13.5 4.5h.01M4.5 9h.01M9 9h.01M13.5 9h.01M4.5 13.5h.01M9 13.5h.01M13.5 13.5h.01" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />`

Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`; every Coin instance gets `modes={LIGHT}`. Numpad fills its parent's width, so host it in `<div className="coin-new-host wide"><VStack modes={LIGHT} style={{ flex: 1 }}>…</VStack></div>` ("Host") unless stated. Keys are `[aria-label="<digit>"]`, `[aria-label="."]`, `[aria-label="Backspace"]`. Shuffled pads change order on every mount: anatomy and sizing use `shuffle={false}`.
Typing rule (playground and In context): digits append (max 8 characters), "." appends once, "backspace" removes the last character.

## Overview
summary: Use the Numpad to enter a PIN, a one-time code, or an amount on screen, without the system keyboard.
principle: Secure by default. Keep the digits shuffled whenever the number is sensitive.
playground: `.preview-stage` with a Host holding `<Numpad shuffle={shuffle} showDecimal={decimal} onKeyPress=…/>`; give Numpad `key={String(shuffle)}` so switching reshuffles. Controls: OnOff "Shuffle" → `shuffle` (default On); OnOff "Decimal" → `showDecimal` (default On; turning it off also removes any "." already typed). Readout title "Entered", value = the typed string or "Nothing yet"; note: shuffle On "Digits move each time the pad opens." Off "Digits stay in the familiar 1–9 order." Stage label: "Live Coin Numpad".

## Anatomy
header: Anatomy · title: A grid of twelve keys · description: Four rows of three keys: digits, an optional decimal point, and backspace. The keys have no fill; they dim while pressed.
specimen: `<Anatomy specimenWidth={318}><VStack modes={LIGHT}><Numpad shuffle={false} /></VStack></Anatomy>`
parts:
1. Digit key — A large digit; each key takes an equal share of the row. — target: `[aria-label="2"]` — side: top
2. Decimal point — Optional; hide it for whole numbers such as a PIN. — target: `[aria-label="."]` — side: left
3. Backspace — Deletes the last character; always at the bottom right. — target: `[aria-label="Backspace"]` — side: right
4. Key gap — 12 px between keys, across and down. — between: [`[aria-label="7"]`, `[aria-label="8"]`] — side: bottom
marks: gap `[aria-label="4"]` → `[aria-label="5"]`

## Configuration
header: Configuration · title: Shuffle and the decimal point · description: Shuffle is on by default and protects sensitive numbers. Turn it off only for numbers that are not secret. Hide the decimal point when only whole numbers are valid.
Grid `coin-new-example-grid`, each in a Host:
- Shuffled — `<Numpad />` — lesson: The default. Digits move each time, against shoulder-surfing; for PINs, codes, and amounts.
- In order — `shuffle={false}` — lesson: The familiar 1–9 layout, for numbers that are not secret, such as a quantity.
- Without decimal — `showDecimal={false}` — lesson: For whole numbers such as a PIN; the bottom-left key is left empty.

## States
header: States · title: Keys only dim when pressed · description: Numpad has one interactive state: a key dims to 40% while it is pressed. There are no disabled or selected keys; the screen decides what a key press does.
Body: one ExampleCard "Pressed" in a Host with `<Numpad shuffle={false} />` — lesson: Press any key to see it dim.

## Sizing
header: Sizing · title: The parent sets the width · description: Keys share the width equally and are at least 46 px tall, with 12 px gaps. At 318 px wide each key is 98 × 46 px. Give it the full width of the screen.
Measured diagram: `<Anatomy legend={false} marks={[{ kind: 'size', target: '[role="presentation"]', side: 'top', label: 'both' }, { kind: 'size', target: '[aria-label="1"]', side: 'left', label: 'both' }]}>` around `<VStack modes={LIGHT} style={{ width: 334 }}><Numpad shuffle={false} /></VStack>` (the VStack's 8 px padding leaves the pad 318 px wide).

## Content
header: Content · title: Show what’s been typed · description: The Numpad has no display. Put the value above it: the formatted amount for money, or masked dots for a PIN, never the PIN itself.
Grid `coin-new-example-grid`, each in a Host:
- ExampleCard "Amount": `<MoneyValue value="1250" currency="₹" />` above `<Numpad />`.
- ExampleCard "PIN": `<Text>● ● ○ ○</Text>` above `<Numpad showDecimal={false} />`.

## In context
header: In context · title: Adding money to a wallet · description: The screen keeps the amount, updates the value above the pad on each key press, and enables the button once there is an amount. The Numpad only reports keys.
Composition in `.coin-new-context`: `<Card modes={LIGHT}>` › `<VStack modes={LIGHT}>` › `<Text>Add money</Text>`, `<MoneyValue value={amount || '0'} currency="₹" />`, `<Numpad onKeyPress=… />` (typing rule), `<Button label={amount ? \`Add ₹${amount}\` : 'Enter an amount'} disabled={!amount} />`. Below the card, `<p className="coin-new-readout" role="status">`: "No amount yet", then "Amount ₹<amount>"; pressing the button → "Adding ₹<amount>".

## Do & Don'ts
header: Do & Don’ts · title: Keep sensitive entry safe · description: Each pair shows a pad that protects people versus one that exposes them.
Every preview is a Host.
- Do Shuffle for a PIN: Changing positions stop onlookers learning the PIN from finger movements. — `<Text>● ● ○ ○</Text>` + `<Numpad showDecimal={false} />` | Don't Use a fixed layout for a PIN: A fixed 1–9 layout lets onlookers read the PIN from finger positions. — same with `shuffle={false}`
- Do Hide the decimal for a PIN: Only digits can be typed. — `<Numpad showDecimal={false} />` | Don't Offer a decimal for a PIN: A decimal key invites an entry that can never be valid. — `<Numpad />`

## Sources
header: Sources · title: Use the public Numpad contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.77</code> from the team’s private package repository. Figma shows the keys in 1–9 order with a “←” glyph; the package shuffles the digits by default and draws a backspace icon. The screen keeps the value, shows it above the pad, and places the pad; the Numpad has no display, masking, or length limit.

## Limits
Do not show `keyStyle`, `keyTextStyle`, `style`, Dark mode, key backgrounds, or a disabled key. Do not imply the Numpad masks, formats, or limits input.
