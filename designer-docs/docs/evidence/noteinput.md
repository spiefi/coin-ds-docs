# Note Input source evidence

Package, Figma, Storybook, and browser evidence for the Note Input guide (board ticket #68, Design documentation — Marcin; Storybook coverage — Biscuit, done).

## Check

Checked 7 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-3795b4c` (Biscuit's `main` at 3795b4c). At 636f3f5 `NoteInput.tsx` and `index.ts` are byte-identical and no `noteInput/*` token changed.

Re-checked 13 October 2026 for the #205 publish: the docs now install mirror tag `v0.1.78-c1fa197` (Biscuit's `main` at c1fa197, 12 October), which carries the #205 fix. The package, browser, and accessibility facts below are updated to that build; the 7 October behaviour they replace is noted where it matters. The published Storybook (built 12 October 08:18 UTC) predates c1fa197.

- Figma: [Coin Components Library · Note Input](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2244-6063), node `2244:6063`. A component set with one variant property, `State` = Idle | Editing, each 95 × 34 with one text layer "Label" ("Add note"; Editing shows "Din" and a caret). Bound variables: `noteInput/background` #ebebed, `border/color` transparent, `border/size` 1, `radius` 999, `padding/horizontal` 16, `padding/vertical` 8, `gap` 4, `foreground` #0d0d0f, 14 px, line height 16, weight 700, JioType Var. Editing keeps a fixed 95 px width in Figma.
- Storybook (published `index.json`): `components-noteinput--docs` and `--default` only (`placeholder: 'Add note'`, `value: ''`); its docs page is the old generated one. Upstream source adds `--filled` ("Rent for April"), `--custom-placeholder` ("Add a memo"), and `--read-only` ("Gift", `editable={false}`), not deployed. The source mdx calls it a compact memo under a pay amount, not a form row or a multi-line message; no label, helper, or error API; `state` unused; "Forward accessibilityLabel"; and says Light/Dark resolve through modes (false, below).
- Package: `NoteInput` with `value` (default `''`), `placeholder` (default "Add note"), `onChangeText`, `modes`, `style` (pill), `textStyle`, `state` ('Editing' | 'Idle', typed but never read), plus every React Native `TextInput` prop through rest (`editable`, `maxLength`, `accessibilityLabel`, `testID`, focus callbacks…). `testID` lands on the field (a `<textarea>` since c1fa197), not the pill. Without `value` it keeps its own state, so `<NoteInput />` and AmountInput's default note take typing (c1fa197; before, it was controlled only and typing did nothing). `defaultValue` is ignored. The field is `multiline`, so Enter inserts a new line instead of calling `onSubmitEditing`. `state="Editing"` only hides the placeholder. The JSDoc still mentions an "InputState" mode and a "blinking cursor". No `useTokens()`; only `NoteInput / Output` (one mode) applies.

## Browser measurements (Chrome, react-native-web 0.21.2, Light)

- Pill: 35 px tall for one line (8 + 17 + 8 plus a 1 px transparent border; Figma 34, because the 16 px line height is raised to 17), #ebebed, radius 999, padding 8 × 16, `maxWidth: 100%`. Width hugs the text: "Add note" 98.8 px, "Rent for April" 129.9 px, "Gift" 60.5 px, "Add a memo" 122.8 px.
- Text: 14/17 bold JioType Var, #0d0d0f for both the placeholder and the value, so empty and filled look alike.
- Focus: no colour or border change; the placeholder clears and the pill shrinks to a caret (38.3 px when empty), then grows as people type ("Dinner" 80.9 px). On blur an empty note shows the placeholder again. The field's web outline is removed (`outlineStyle: none`); since c1fa197 the pill wrapper can't take focus, so it no longer shows the browser's focus ring.
- Uncontrolled (`<NoteInput />`): typing shows the text (c1fa197; before, it stayed empty).
- `editable={false}` (c1fa197): the pill is at 60% opacity; the field is `readonly` with `tabindex="-1"`, a click doesn't focus it, and it keeps its placeholder. Before, it looked the same as an editable note, took focus, and cleared the placeholder.
- Long text (c1fa197): the pill stops at its container's width and the note wraps inside it. "Rent for April and the maintenance" in the kit's 240 px narrow Surface makes a 214 × 52 pill on two lines; a 55-character note in a 328 px column wraps inside the pill. Before, there was no maximum width or wrapping, and the text or the pill ran past the container.
- `maxLength={20}` limits typing; there is no counter.
- `Color Mode: Dark` renders exactly as Light: all 12 tokens are literals with no Color Mode alias.

## Accessibility (web)

- DOM (c1fa197): pill `div tabindex="-1"` (Pressable; a press focuses the field) › `div` › hidden sizer `div[dir=auto]` (opacity 0, `aria-hidden="true"`) + `<textarea>`. Each note is one Tab stop, and its text is exposed once.
- The field's `aria-label` is `accessibilityLabel`, else the placeholder, and it stays while the placeholder is hidden on focus.
- Before c1fa197 the pill was a second Tab stop, the sizer repeated the text for screen readers, and a focused field without `accessibilityLabel` had no name.
- No required, invalid, or disabled semantics; `editable={false}` is `readonly`.

## Classification

- Designer-configurable: placeholder copy; read only.
- System-driven: width follows the text and wraps at the container's width; placeholder clears on focus; same colours in every state except read only (60% opacity).
- Developer-only: `value`/`onChangeText` state (optional since c1fa197), `accessibilityLabel`, `maxLength`, `style`, `textStyle`, `testID`.
- Not shown: Dark mode, the `state` prop, `multiline`, `style`/`textStyle`.

## Coin gaps

- #205 (Component Fix, Done, published 13 October 2026 with c1fa197): controlled only; long notes overflowed the pill; two Tab stops and duplicated text on the web; no name while focused; read-only took focus and cleared the placeholder. Fixed. Guide change: the "Leave it without state" Do & Don't is gone, the long-note Don't now shows the wrap, and Sizing, States, and Sources describe the wrap and the faded read-only note. Still open from it, outside its Expected list: `state="Editing"` only hides the placeholder; 35 vs 34 px height and Figma's fixed 95 px Editing width; placeholder and value share one colour; stale JSDoc (`InputState`, "blinking cursor"); `defaultValue` ignored; Enter inserts a new line; published Storybook stale.
- #208 (Components, To do; Marcin Śpiewak), token problem shared with Nudge and Segmented Control: no Dark values for `noteInput/*`.
