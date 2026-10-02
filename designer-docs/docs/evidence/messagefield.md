# Message Field source evidence

Package, Figma, Storybook, and browser evidence for the Message Field guide (board ticket #33, Design documentation — Marcin; Storybook coverage — Biscuit, done).

## Check

Checked 2 October 2026. Declared and installed `jfs-components` is `0.1.78`, built from Biscuit's `main` at `3795b4c` (mirror tag `v0.1.78-3795b4c`); `npm run coin:status` reports the mirror up to date.

- Figma: [Coin Components Library · Message Field](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4835-2564), node `4835:2564`. A single component, 328 × 159: label (17), text area (108), counter (18), gap 8.
  - Properties: `label` (text, "Describe your issue") and `text` (text, the placeholder "Describe your issue in detail..."). No booleans or slots; the counter is a fixed text layer "0/140".
  - Text area: white, 1.5 px border `#b5b6b7`, radius 8, padding 12, clipped; text 16/21 regular `#707275`. Counter 14/18 regular `#24262b`, right-aligned. Label 14/17 medium black.
  - States are the `FormField States` variable modes. Light values: Idle border `#b5b6b7`, text `#707275`; Active border `#5d00b5`, text `#0c0d10`; Read Only border `#ebebec`, label `#535353`; Error border and label `#f50030`; Disabled border `#b0b0b5`, text and label `#c2c4c7`. The fill is a fixed white in every state.
- Storybook (published index): `components-messagefield--docs`; stories `--default`, `--required`, `--invalid`, `--read-only`, `--disabled`, `--no-counter`, `--custom-rows`, `--uncontrolled`, `--all-states`. Upstream source also has `counter-only`, not deployed yet.
  - MDX: use for a labelled multi-line message (feedback, issue details, cancellation reason); use FormField for a short value with helper or error text. There is no `errorMessage` or support-text API: invalid only switches the Error tokens, so "put the fix copy nearby". Hide the counter with `showCounter={false}`; make the field taller with `rows`. Labels name the message in sentence case; the placeholder is a writing hint, never the only name. Prefer limits of 140, 200, or 1000.
- Package: public `MessageField` accepts `label`, `placeholder`, `value`, `defaultValue`, `onChangeText`, `name` (Form integration; a Form error marks it invalid but its text is not shown), `maxLength`, `showCounter`, `rows`, `isRequired`, `isDisabled`, `isInvalid`, `isReadOnly`, `autoFocus`, `modes`, `style`, `textareaStyle`, `inputStyle`, `accessibilityLabel`, `accessibilityHint`, `testID` (on the root), and focus/blur callbacks.
  - State cascade: invalid → Error; disabled → Disabled; read-only → Read Only; focused → Active; otherwise Idle. `modes['FormField States']` is ignored.
  - Counter: shown when `maxLength` is set (`count/max`), always with `showCounter`, never with `showCounter={false}`. `maxLength` stops typing at the limit.
  - Height: `rows × 21 + 24` when `rows` is set; otherwise the 108 px token (four rows). Text scrolls inside the box.
  - The placeholder and the typed text use one token, `messageField/text/foreground`.

## Browser measurements (Chrome, react-native-web 0.21.2, Light)

- Text area 108 px tall (`rows={6}`: 150 px), white, 1 px `rgb(181,182,183)` border, radius 8, 12 px padding; text 16/21. Label 14/17 medium. Counter 14/18 `rgb(36,38,43)`, right-aligned, 8 px below. The field fills its container.
- Focus: border `rgb(93,0,181)`, text `rgb(12,13,16)`.
- Idle (not focused): placeholder and typed text are both `rgb(112,114,117)`. A filled field that loses focus looks like it still shows a placeholder.
- Error: label and border `rgb(245,0,48)`; no message. Read only: label `rgb(83,83,83)`, border `rgb(235,235,236)`, text full contrast, `readonly`. Disabled: label and text `rgb(194,196,199)`, border `rgb(176,176,181)`, no opacity change, pointer events off.
- `maxLength={200}` stops typing at 200 and shows `200/200`. Without `maxLength`, `showCounter` shows a bare count.
- Dark `Color Mode` renders identically to Light (no dark values).
- A Coin `SupportText` with `status="Error"` and `modes={{ 'Color Mode': 'Light', Status: 'Error' }}` renders a red message with a warning icon; the guide uses it below the field for an error.
- Accessibility: the text area's name is `accessibilityLabel`, then `label`, then the placeholder. No `aria-invalid` or `aria-required`; a read-only field stays focusable. Reported with the idle text colour as a Coin gap: #187 (Components, To do, Component Bug; Mr. Biscuit, Anagha Ghotkar).
