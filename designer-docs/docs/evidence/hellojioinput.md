# HelloJio Input source evidence

Package, Figma, Storybook, and browser evidence for the HelloJio Input guide (board ticket #91, Design documentation — Marcin; Storybook coverage — Biscuit, done).

## Check

Checked 2 October 2026. Declared and installed `jfs-components` is `0.1.78`, built from Biscuit's `main` at `3795b4c` (mirror tag `v0.1.78-3795b4c`); `npm run coin:status` reports the mirror up to date.

- Figma: [Coin Components Library · HelloJio Input](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=7584-1796), node `7584:1796`. A component set with `State` Idle | Active | IdleJioPlus (251 × 38, 251 × 38, 251 × 36), booleans `start Slot` (on), `end Slot` (on), `Attachment Slot` (off), and slots `Slot` (attachments) and `end` (replaces send). No size or disabled property.
  - Pill: radius 20, padding 4/4/4/8, gap 8, 1 px stroke. Brand icon 18 px; text 14/18 regular "Ask me anything" `#545961`; gold `#cea15a` send IconButton 28 px with a 16 px glyph.
  - Idle fill and stroke `#f5f5f5`. Active fill white, stroke `#b5b5b5`, text `#24262b`. IdleJioPlus: no stroke, `#f5f5f5` over a `glass/minimal` background blur.
  - Attachment slot default: ScrollArea › HStack (gap 8) › two Chat Attachment chips ("My_PAN_card", "PDF file"), blue `#1680b5`, radius 12.
- Storybook (published index): `components-hellojioinput--docs`; stories `--default`, `--active`, `--jio-plus` (on a flat `#1a3a5c` box), `--submit-log`, `--without-send`, `--without-leading-icon`, `--with-attachments`. Upstream source also has `disabled`, not deployed yet.
  - MDX: the HelloJio chat composer — "not a form field and not a search row". Use FormField or MessageField for labelled input, InputSearch for search. States come from focus and `jioPlus`; do not author `Hello Jio Input State`. Placeholder short, sentence case, no trailing punctuation. Jio Plus needs content behind the pill; on a flat sheet "the frost has no job". Attachments stack above the prompt and grow the pill.
- Package: public `HelloJioInput` accepts `placeholder` (default "Ask me anything"), `value`, `defaultValue`, `onChangeText`, `onSubmit` (send button and Return key), `leadingIconName` (default `ic_hellojio`), `leading` (`null` hides the icon), `trailing` (`null` hides send), `attachments`, `sendIconName`, `jioPlus`, `disabled`, `modes`, `style`, `inputStyle`, `accessibilityLabel` (default the placeholder), `accessibilityHint`, `testID` (on the input), focus/blur callbacks, and React Native TextInput props (`returnKeyType` default "send").
  - `onSubmit` receives the current text even when it is empty, and the field is not cleared after sending; the app does both.
  - Public `ChatAttachment` (title, subtitle, `onClose`) and `ChatBubble` (`role` user | assistant, `text`) compose with it.

## Browser measurements (Chrome, react-native-web 0.21.2, Light)

- Pill 36 px tall in every state (Figma 38 for Idle and Active), radius 20, padding 4/4/4/8, `rgb(245,245,245)` fill and 1 px border. Brand icon 18 px; text 14/18 `rgb(84,89,97)`; send button 26 × 26 (Figma 28), gold `rgb(206,161,90)`, named "Send". Fills its container.
- Focus: white fill, `rgb(181,181,181)` border; the placeholder clears but the input keeps its name ("Ask me anything").
- Send with an empty field calls `onSubmit('')`; Return sends the typed text; the text stays in the field afterwards.
- The send button is a Coin IconButton, so a mouse click leaves a dark 1 px `rgb(34,34,34)` border around it until focus moves (`:focus-visible` is false). This is IconButton gap #179, not specific to HelloJio Input.
- `disabled`: opacity 0.5, input `readonly`, send `aria-disabled` and out of the tab order.
- `leading={null}` and `trailing={null}` remove the icon and the send button.
- With two Chat Attachment chips the pill grows to 110 px; chips sit above the prompt. A chip with `onClose` gets an 18 × 18 "Remove attachment" button that works with a mouse; without `onClose` its close icon does nothing.
- Long text scrolls sideways on one line.
- Jio Plus on the kit's photo Backdrop: a frosted pill (9 px backdrop blur) without a border. The blur layer is positioned above the input, so the placeholder and any typed text are hidden while the pill is not focused. Focusing switches to the white Active pill and shows the text again.
- The pill's web wrapper is an extra, unnamed tab stop before the input (as in TextInput).
- Dark `Color Mode` gives a near-black pill with pink text; not shown.
- Coin gap ticket filed for the hidden Jio Plus text, the 36 vs 38 px height, and the extra tab stop: #190 (Components, To do, Component Bug; Mr. Biscuit, Anagha Ghotkar).
