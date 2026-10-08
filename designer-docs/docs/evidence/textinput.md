# Text Input source evidence

Package, Figma, Storybook, and browser evidence for the Text Input guide (board ticket #24, Design documentation — Marcin; Storybook coverage — Biscuit, done).

## Check

Checked 1 October 2026. Declared and installed `jfs-components` is `0.1.77` from the private package repository. The newest mirror tag is `v0.1.78`, and TextInput is unchanged in it.

- Figma: [Coin Components Library · textInput](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=506-10017), node `506:10017`, 251 × 44, a grey fully rounded field. It has an 18 px `start` slot (search icon), the text "Label", and an 18 px `end` slot (search icon).
- Storybook: `components-textinput--docs`; stories `--default`, `--with-leading-and-trailing`, `--without-icons`, `--with-custom-leading`, `--search`, `--with-modes`.
  - The docs list the `InputState` collection (Idle, Active) and `Color Mode`.
  - They ask for `accessibilityLabel` when the placeholder is empty or not descriptive, decorative slot icons, and no focusable controls inside the slots.
- Package: public `TextInput` accepts `placeholder` (a string, or an array that rotates every 2 s), `value`, `onChangeText`, `leadingIconName` (default `ic_search`), `leading`, `trailing`, `modes`, `style`, `inputStyle`, `onFocus`, `onBlur`, `accessibilityLabel`, `accessibilityHint`, and React Native TextInput props.
  - The leading slot is always filled: `leading`, or an Icon from `leadingIconName`. It cannot be hidden.
  - `TextInput.Search` is the same field with a fixed `ic_search` leading icon.
  - `testID` lands on the inner `<input>`.

## Browser measurements (Chrome, react-native-web 0.21.2)

- The field is 42 px tall, fully rounded, background `rgb(245,245,245)`, with 14 px horizontal padding and a 1 px border in the background colour. The leading icon is 18 px in `rgb(36,38,43)`. It fills a block column (360 px in a 360 px host). In Dark mode the background is `rgb(13,13,15)`. Figma is 44 px tall.
- Focus draws a 1 px `#222` border at the same 42 px height and clears the placeholder.
- `InputState: Active` turns the field transparent with a `rgb(181,181,181)` border. The component does not use it for focus, and the guide does not show it.
- `editable={false}` sets `readonly` with no visual change.
- A custom trailing `Icon` defaults to gold. `AppearanceBrand: Neutral` gives the grey `rgb(84,89,97)` used in the guide.
- Coin gap #183 (Components, To do, Component Bug; Mr. Biscuit, Anagha Ghotkar): `accessibilityLabel` never reaches the `<input>`, including through `TextInput.Search`. This is the root cause of FilterBar #170. The placeholder clears on focus, so a focused field has no accessible name, and a rotating placeholder leaves the input's placeholder empty throughout. The ticket also notes the 42 vs 44 px height.

## 3795b4c check

Checked 2 October 2026 against `jfs-components` 0.1.78 built from Biscuit's `main` at `3795b4c` (mirror tag `v0.1.78-3795b4c`) in headless Chrome with react-native-web 0.21.2.

- #183 partly fixed. `accessibilityLabel` now reaches the input as `aria-label`, including through TextInput.Search, and a labelled field keeps its name while focused. Without a label, the placeholder still clears on focus, and a rotating placeholder leaves the field unnamed. The guide now tells designers to always set an accessibility label.

## 636f3f5 check

Checked 8 October 2026 against `jfs-components` 0.1.78 built from Biscuit's `main` at `636f3f5` (mirror tag `v0.1.78-636f3f5`) in headless Chrome with react-native-web 0.21.2.

- #183 fixed; both items from the 2 October re-test now pass. A field without `accessibilityLabel` is named by its placeholder and keeps that name while focused. A rotating placeholder names the input after its first item ("Search payees"). An explicit label still wins. There is one tab stop per field, and focus uses the `InputState: Active` border, `rgb(181,181,181)`, instead of the old `#222` outline.
- The placeholder text itself still disappears on focus; only the accessible name is kept.
- Still open (lower priority in the ticket): the field is 42 px tall vs Figma's 44.
- Guide: the Field anatomy note, the States description, and the Empty example now describe a darker grey focus border instead of a dark outline. The rotating-prompt Don't now says screen readers hear only the first prompt, and the Sources note no longer says a field without a label loses its name; it asks for a label only when the placeholder does not say what the field is for.
