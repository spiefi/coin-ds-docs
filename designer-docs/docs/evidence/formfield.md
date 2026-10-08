# Form Field source evidence

Package, Figma, Storybook, and browser evidence for the Form Field guide (board ticket #35, Design documentation — Marcin; Storybook coverage — Biscuit, done).

## Check

Checked 2 October 2026. Declared and installed `jfs-components` is `0.1.78`, built from Biscuit's `main` at `3795b4c` (mirror tag `v0.1.78-3795b4c`); `npm run coin:status` reports the mirror up to date.

- Figma: [Coin Components Library · FormField](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1922-5647), node `1922:5647`. A single component (no variants), 328 × 94 with every part on, gap 8.
  - Properties: `label` (boolean, on), `inputLabel` (text, "Account number"), `startIcon` (boolean, off; 18 px `ic_rupee`), `end` slot (boolean, off; default content a Coin Button "Button", 80 × 32, transparent fill, purple bold text), `supportText` (boolean, on).
  - Input row 328 × 45, white, 1.5 px border `#b5b6b7`, radius 8, 12 px horizontal padding, gap 8. Label 14/17 medium black. Support text 12/16 medium with a 16 px `ic_info` icon; single line with ellipsis in Figma.
  - States are the `FormField States` variable modes (Idle, Active, Read Only, Error, Disabled), not variants. Light values: Idle border `#b5b6b7`; Active border `#5d00b5`; Read Only fill and border `#ebebec`, support text `#535353`; Error border `#f50030`, fill `#ffe0de`, support text `#f50030`; Disabled border `#b0b0b5`, text `#c2c4c7`.
- Storybook (published index): `components-formfield--docs`; stories `--default`, `--with-trailing-button`, `--with-start-icon`, `--with-leading-icon`, `--email-type`, `--password-type`, `--required`, `--invalid`, `--read-only`, `--disabled`, `--with-ref`, `--all-states`. Upstream source also has `types`, `phone-type`, and `with-form-errors`, which are not deployed yet.
  - MDX: use FormField for a labelled value with helper or error text; TextInput or InputSearch for unlabelled chrome, OTP for codes, FormUpload for files. Set `type` for email, phone, and password. Labels name the value in sentence case and do not start with "Enter" or "Your"; the placeholder is a format example; support text is a constraint; error text says how to fix the value in one sentence. Keep the primary action enabled and show the error on the field ("Disabled is not a validation strategy").
  - The trailing-button story uses a plain Pressable "Apply", not a Coin Button. The MDX says the leading and trailing slots are hidden from assistive tech; on the web they are not (see below).
- Package: public `FormField` accepts `label`, `placeholder`, `value`, `onChangeText`, `type` (text, password, email, search, number, phone, url), `name` (Form integration), `leading`, `trailing`, `startIcon`, `leadingIconName`, `isRequired`, `isDisabled`, `isInvalid`, `isReadOnly`, `supportText`, `errorMessage`, `maxLength`, `autoFocus`, `modes`, `style`, `inputStyle`, `inputTextStyle`, focus/blur/submit callbacks, `accessibilityLabel`, `accessibilityHint`, `testID` (on the root), and a ref.
  - State cascade: invalid → Error; read-only or disabled → Read Only; focused → Active; otherwise Idle. An explicit `modes['FormField States']` overrides it.
  - `errorMessage` replaces `supportText` only while `isInvalid` (or a Form error) is set; with `isInvalid` and no `errorMessage`, the support text turns red.
  - `isDisabled` uses the Read Only colours at 50 % opacity with pointer events off; Figma's Disabled mode is never used.
  - The required asterisk is a hard-coded `#d93d3d`, not a token.

## Browser measurements (Chrome, react-native-web 0.21.2, Light)

- Input row 47 px tall (45 px input plus 1 px borders; Figma 45), white, 1 px `rgb(181,182,183)` border, radius 8, 12 px horizontal padding. Label 14/17 medium; input text 16 px `rgb(36,38,43)`; support text 12/16 with a 16 px icon. Root gap 8. The field fills its container.
- Focus: border `rgb(93,0,181)`. Error: fill `rgb(255,224,222)`, border `rgb(245,0,48)`, red support text with a warning icon. Read only: fill and border `rgb(235,235,236)`, full-contrast text, `readonly`. Disabled: same as read only at opacity 0.5.
- `type="password"` masks the value; `email` sets `type=email`; `number` sets `inputmode=numeric`.
- A Coin `Button` with `AppearanceBrand: Secondary`, `Emphasis: Low`, `Button / Size: S` in `trailing` renders 74 × 32, transparent with purple `rgb(93,0,181)` text, matching Figma's end slot. It stays in the tab order after the input and keeps its name; the slot is not hidden from assistive tech on the web.
- Dark `Color Mode` renders identically to Light (no dark values).
- Accessibility: the input's name is `accessibilityLabel`, then `label`, then the placeholder. There is no `aria-invalid`, no `aria-required` (the asterisk is visual only), and neither the support text nor the error message is linked to the input. A disabled field is still reached with Tab and is not announced as disabled. Reported as a Coin gap: #186 (Components, To do, Component Bug; Mr. Biscuit, Anagha Ghotkar).

## 636f3f5 check

Checked 8 October 2026 against `jfs-components` 0.1.78 built from Biscuit's `main` at `636f3f5` (mirror tag `v0.1.78-636f3f5`) in headless Chrome with react-native-web 0.21.2.

- #186 fixed. The input has `aria-invalid` and `aria-required`, and `aria-describedby` points at the error ("IFSC codes have 11 characters"); the support text is linked while the field is valid. The asterisk uses the Negative token (`mode/Negative/1400 (base)`). Disabled sets `aria-disabled` and `tabindex -1`, and Tab skips the field. In a 260 px field with Apply, the input shrinks to 152 px and the button stays inside the border.
- Still open (installed source): Disabled uses the Read Only colours at 50 % opacity rather than Figma's Disabled mode, and there is no live region, so an error is read when people reach the field, not when it appears. The 47 px height (Figma 45) and the Light-only colours were not re-measured.
- Guide: the Sources note now says errors, required, and support text are announced and Tab skips a disabled field; the asterisk is no longer called a fixed red. The 328 px `PhoneWidth` workaround is gone: the End action example and the playground render the field at the host's width. The Disabled example says Tab skips it.
