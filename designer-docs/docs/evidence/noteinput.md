# Note Input source evidence

Package, Figma, Storybook, and browser evidence for the Note Input guide (board ticket #68, Design documentation — Marcin; Storybook coverage — Biscuit, done).

## Check

Checked 7 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-3795b4c` (Biscuit's `main` at 3795b4c). At 636f3f5 `NoteInput.tsx` and `index.ts` are byte-identical and no `noteInput/*` token changed.

- Figma: [Coin Components Library · Note Input](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2244-6063), node `2244:6063`. A component set with one variant property, `State` = Idle | Editing, each 95 × 34 with one text layer "Label" ("Add note"; Editing shows "Din" and a caret). Bound variables: `noteInput/background` #ebebed, `border/color` transparent, `border/size` 1, `radius` 999, `padding/horizontal` 16, `padding/vertical` 8, `gap` 4, `foreground` #0d0d0f, 14 px, line height 16, weight 700, JioType Var. Editing keeps a fixed 95 px width in Figma.
- Storybook (published `index.json`): `components-noteinput--docs` and `--default` only (`placeholder: 'Add note'`, `value: ''`); its docs page is the old generated one. Upstream source adds `--filled` ("Rent for April"), `--custom-placeholder` ("Add a memo"), and `--read-only` ("Gift", `editable={false}`), not deployed. The source mdx calls it a compact memo under a pay amount, not a form row or a multi-line message; no label, helper, or error API; `state` unused; "Forward accessibilityLabel"; and says Light/Dark resolve through modes (false, below).
- Package: `NoteInput` with `value` (default `''`), `placeholder` (default "Add note"), `onChangeText`, `modes`, `style` (pill), `textStyle`, `state` ('Editing' | 'Idle', typed but never read), plus every React Native `TextInput` prop through rest (`editable`, `maxLength`, `accessibilityLabel`, `testID`, focus callbacks…). `testID` lands on the `<input>`, not the pill. `value` is always passed to the field, so the component is controlled only: with no `value`/`onChangeText` pair, typing does nothing. AmountInput's default note (`<NoteInput modes={modes} />`) has the same problem. No `useTokens()`; only `NoteInput / Output` (one mode) applies.

## Browser measurements (Chrome, react-native-web 0.21.2, Light)

- Pill: 35 px tall (8 + 17 + 8 plus a 1 px transparent border; Figma 34, because the 16 px line height is raised to 17), #ebebed, radius 999, padding 8 × 16. Width hugs the text: "Add note" 98.8 px, "Rent for April" 129.9 px, "Gift" 60.5 px, "Add a memo" 122.8 px.
- Text: 14/17 bold JioType Var, #0d0d0f for both the placeholder and the value, so empty and filled look alike.
- Focus: no colour or border change; the placeholder clears and the pill shrinks to a caret (38.3 px when empty), then grows as people type ("Dinner" 80.9 px). On blur an empty note shows the placeholder again. The input's web outline is removed; the pill wrapper shows the browser's focus ring when it is focused.
- Uncontrolled (`<NoteInput />`): typing leaves the value empty.
- `editable={false}`: same look; still focusable, the placeholder clears on focus, typing does nothing (`readonly`).
- Long text: no maximum width, no wrapping, no ellipsis. In a 328 px column a 55-character note makes the pill 328 px while the 394 px text spills past both ends. In a row (the kit's Surface) the pill itself grows past the container: "Rent for April and the maintenance" in a 240 px Surface runs past its right edge.
- `maxLength={20}` limits typing; there is no counter.
- `Color Mode: Dark` renders exactly as Light: all 12 tokens are literals with no Color Mode alias.

## Accessibility (web)

- DOM: pill `div tabindex="0"` (Pressable, no role, no name) › `div` › hidden sizer `div[dir=auto]` (opacity 0, not `aria-hidden`) + `<input type="text">`. Each note is two Tab stops (the pill, then the input); Enter on the pill focuses the input.
- The input's name is `accessibilityLabel`, else the placeholder; while focused the placeholder is emptied, so without `accessibilityLabel` the focused field has no name. The sizer repeats the text for screen readers on the web (its native hiding props are ignored by RNW).
- No required, invalid, or disabled semantics; `editable={false}` is `readonly`.

## Classification

- Designer-configurable: placeholder copy; read only.
- System-driven: width follows the text; placeholder clears on focus; same colours in every state.
- Developer-only: `value`/`onChangeText` state (required), `accessibilityLabel`, `maxLength`, `style`, `textStyle`, `testID`.
- Not shown: Dark mode, the `state` prop, `multiline`, `style`/`textStyle`.

## Coin gaps

- #205 (Component Fix, To do, Component Bug; Mr. Biscuit, Anagha Ghotkar): controlled only, so uncontrolled notes (including AmountInput's default) can't be typed into; long notes overflow the pill; two Tab stops and duplicated text for screen readers on the web; read-only still takes focus and clears the placeholder; `state` prop unused while Figma has Idle/Editing; 35 vs 34 px height; Editing width differs from Figma; published Storybook stale; stale JSDoc (`InputState`, "blinking cursor").
- #208 (Components, To do; Marcin Śpiewak), token problem shared with Nudge and Segmented Control: no Dark values for `noteInput/*`.
