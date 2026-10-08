# Input Search source evidence

Package, Figma, Storybook, and browser evidence for the Input Search guide (board ticket #127, Design documentation — Marcin; Storybook coverage — Biscuit, done). Text Input (`textinput.md`) documents the field it is built on.

## Check

Checked 2 October 2026. Declared and installed `jfs-components` is `0.1.78`, built from Biscuit's `main` at `3795b4c` (mirror tag `v0.1.78-3795b4c`); `npm run coin:status` reports the mirror up to date.

- Figma: [Coin Components Library · Input Search](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1796-188), node `1796:188`. A component set with `State` idle | active (each 251 × 68) and a `Support Text` boolean (on). No text, slot, disabled, or error properties.
  - A textInput pill (44 px, full radius, 14 px horizontal padding) with an 18 px `ic_search` start icon, 14/18 text, and an `end` slot that holds an 18 px `ic_close` only in the active variant; 8 px below, Support Text (16 px `ic_info`, 12/16 medium, "Support Text").
  - Idle: fill and border `#f5f5f5`. Active: transparent fill, border `#b5b5b5`, typed value plus the clear icon.
- Storybook (published index): `components-inputsearch--docs`; stories `--default`, `--with-value`, `--no-support-text`, `--with-custom-support-icon`, `--disabled` (passes only `editable: false`), `--animated-placeholders`.
  - MDX: use for a search query with optional helper text and a clear button; FormField for a labelled field, TextInput for a bare row, FilterBar for list-filter chrome. Placeholder short, sentence case, no trailing punctuation ("Search payees"); support text one short fragment ("Try a name or mobile"). Pass `accessibilityLabel` when the placeholder is not enough. The MDX notes the clear control has no accessibility label.
- Package: public `InputSearch` renders a Coin `TextInput` with `leadingIconName="ic_search"` and a Coin `SupportText`-style row. Props: `supportText` (boolean, default true), `supportTextLabel` (default "Support Text"), `supportTextIcon` (default `ic_info`), `placeholder` (default "Search"; an array rotates), `value`, `onChangeText`, `onFocus`, `onBlur`, `leading`, `trailing`, `modes`, `containerStyle`, `inputStyle`, `accessibilityLabel`, `accessibilityHint`, and React Native TextInput props (`testID` lands on the input).
  - The clear button shows while `value` is not empty and `trailing` is not passed; it calls `onChangeText('')`. The field needs `value` and `onChangeText` for typing and clearing to work.
  - There is no disabled, error, or label prop; `editable={false}` blocks typing with no visual change.

## Browser measurements (Chrome, react-native-web 0.21.2, Light)

- Field 42 px tall (Figma 44), fully rounded, `rgb(245,245,245)` fill and border, 14 px horizontal padding, 18 px icons, 14/18 text. Support text 12/16 with a 16 px icon, 8 px below. Fills its container (360 px in a 360 px host).
- Focus: transparent fill, 1 px `rgb(34,34,34)` border (Figma active `#b5b5b5`), and the placeholder clears.
- With text, an 18 px clear icon appears at the end. A mouse click and Enter on it empty the field. It is a focusable `div` with no role and no name.
- Support text is on by default and reads "Support Text" until `supportTextLabel` is set.
- Accessibility: without `accessibilityLabel` the input's only name is its placeholder, which clears on focus; a rotating placeholder leaves it unnamed. With `accessibilityLabel` the input is named (#183 partly fixed). The field's wrapper is an extra, unnamed tab stop before the input (from TextInput).
- Dark `Color Mode`: the text turns orange `#ff9900` (token ticket #177) and the support text stays black on dark; not shown.
- Coin gap ticket filed for the default support text, the unnamed clear button, and the extra tab stop: #189 (Components, To do, Component Bug; Mr. Biscuit, Anagha Ghotkar).

## 636f3f5 check

Checked 8 October 2026 against `jfs-components` 0.1.78 built from Biscuit's `main` at `636f3f5` (mirror tag `v0.1.78-636f3f5`) in headless Chrome with react-native-web 0.21.2.

- #189 fixed. Clear is a button named “Clear search”, and Enter clears the field. Tab goes input → Clear → next field, so the wrapper is no longer a tab stop. Focus draws a 1 px `rgb(181,181,181)` border on a transparent fill, matching Figma’s active variant. `supportText` now defaults to `false` (with `supportText` on and no label it still reads “Support Text”).
- #183 fixed (TextInput underneath): without `accessibilityLabel` the placeholder names the input and keeps naming it while focused; a rotating placeholder names it after its first item. The visible placeholder still clears on focus.
- Guide: every example with a hint now sets `supportText` (Anatomy, Sizing, Content, In context, and the “Leave the default hint” Don’t), which keeps the Hint pin and the 8 px gap mark. The Field note, Configuration, States, the “Rotate the prompt” caption, and the Sources note describe the grey focus border, the off-by-default hint, the named clear button, the single tab stop, and the kept name.
