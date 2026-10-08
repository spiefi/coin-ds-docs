# Filter Bar source evidence

## Checked

28 September 2026. `designer-docs/package.json` declares `jfs-components@0.1.60`; the installed package is `0.1.60`; `npm view jfs-components version` returned `0.1.60`. No dependency change. Board ticket #164 (Design documentation — Marcin).

## Sources

- Figma: [Coin Components Library · filterBar](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=541-4823), symbol `541:4823`, 360 × 64. One child: a `textInput` instance `546:6483` at x 16, y 10, 328 × 44. No variants or component properties are exposed on the symbol. Bound variables: `filterBar/padding/horizontal` 16, `filterBar/padding/vertical` 10; the nested input uses `textInput/horizontal/padding` 14, `textInput/vertical/padding` 12, `textInput/radius` 99999, `textInput/background` and `textInput/border/color` #f5f5f5, `textInput/icon/size` 18, 14/18 JioType Var 400 text in #24262b. Read through the Figma MCP (jiofinance.in account) on 28 September 2026.
- Storybook: `components-filterbar--docs`; stories `--default`, `--with-custom-placeholder`, `--with-value`, `--with-modes`, `--with-custom-children`, `--with-render-input`. Story sources were read from the published bundle. MDX guidance: name what the search filters, keep placeholders meaningful, keep the bar full width, forward `modes`, and preserve search semantics when replacing the input.

## Contract

- Public `FilterBar` props: `placeholder` (default `Search`), `value` (default `''`), `onChangeText`, `modes`, `style`, `accessibilityLabel`, `accessibilityHint`, `children`, `renderInput`, plus View props (`testID` reaches the root).
- Designer-configurable: the placeholder text, and whether the bar starts with a query. System-driven: padding (tokens), the pill field, search icon, and focus outline. Developer-only: `value`/`onChangeText` wiring, `renderInput` and `children` (full input overrides; `children` disconnects `value`/`onChangeText`).
- The bar is a column with `width: 100%`, padding 10/16, `role="search"`. It contains the public TextInput (search icon leading, pill field).
- FilterBar only reports the typed text. Filtering results is the screen's job.

## Rendered (installed package, web, 360 px host)

- Bar 360 × 62; field 328 × 42 (padding 0 14, 8 px gap, radius 99999, #f5f5f5 fill and 1 px #f5f5f5 border); icon 18 × 18; input text 14/18 rgb(36, 38, 43); placeholder at 60% opacity.
- Focus (pointer click then typing): the bar gains a hardcoded 1 px `#222` border around its whole padded area and grows from 62 to 64 px. The value is not a token.
- There is no clear button, disabled state, error state, or result count.

## Limits

- Figma bar is 360 × 64 with a 44 px field; the installed bar is 62 px with a 42 px field. Treat Figma as the design reference and the package as the rendered truth; do not claim pixel parity.
- `accessibilityLabel` is not applied on the default path: the root receives `accessibilityLabel={undefined}` and the TextInput is given `undefined`, so the textbox name comes from the placeholder only and the search landmark is unnamed. This contradicts the Storybook guidance to set `accessibilityLabel`; the placeholder therefore has to carry the name.
- The focus outline shifts layout by 2 px and uses a hardcoded colour.
- The page must not imply FilterBar filters data, shows chips, or has a clear control.

## Verification

`npm run verify` passed on 28 September 2026 (build, guide check, headless browser test of all 29 guides at 1280 and 390 px). Planner review of desktop and 390 px captures: two brief errors fixed (a false "placeholder is cut off first" sizing claim and a Don't with no visible consequence, replaced by a long placeholder that truncates in a narrow host), and blank Anatomy/Sources headings filled. Playground typing, the Start with control, and the in-context list filter were exercised.

## 0.1.78 check

Checked 1 October 2026 against `jfs-components` 0.1.78 (mirror tag `v0.1.78`, built from Biscuit's `fix/component-bugs-v0.1.78` at `5b6894b`) in headless Chrome with react-native-web 0.21.2, on a test page and on this guide. The same checks were run against 0.1.77 as a baseline.

- #170 partly fixed; it was moved back to In-Progress with a work note.
- Fixed: focus draws a 1 px `#222` box-shadow ring, so the bar keeps its height (94 → 94 px in the test host; 0.1.77 grew by 2 px). The ring colour is still not a token.
- Not fixed: `<FilterBar accessibilityLabel="Search transactions">` renders an `<input>` with no `aria-label`. FilterBar passes the label to the Coin `TextInput`, which sets `accessibilityLabel={undefined}` on its inner input.

## 3795b4c check

Checked 2 October 2026 against `jfs-components` 0.1.78 built from Biscuit's `main` at `3795b4c` (mirror tag `v0.1.78-3795b4c`) in headless Chrome with react-native-web 0.21.2.

- #170 fixed. `<FilterBar accessibilityLabel="Search transactions">` renders the input with `aria-label="Search transactions"`, because TextInput now forwards the label. The focus ring from 0.1.78 is unchanged.

## 636f3f5 check

Checked 8 October 2026 against `jfs-components` 0.1.78 built from Biscuit's `main` at `636f3f5` (mirror tag `v0.1.78-636f3f5`) in headless Chrome with react-native-web 0.21.2. FilterBar facts below are read from the installed source; the TextInput facts come from the #183 re-test.

- #183 (TextInput) fixed: an explicit label wins, a field keeps its name while focused, there is one tab stop per field, and focus draws the `InputState: Active` border, `rgb(181,181,181)`.
- FilterBar itself is unchanged: it passes `accessibilityLabel` to TextInput, defaulting to "Search filter", so the placeholder never names the FilterBar input. The bar's focus ring is still a hard-coded 1 px `#222` box-shadow. While focused, the field inside now also shows TextInput's grey Active border.
- Still open: the 42 px field (Figma 44) and the 62 px bar (Figma 64).
- Guide: unchanged; no page sentence was made false. The brief's stale 0.1.60 lines (Sources note, the Focused lesson, and the `accessibilityLabel` limit) now match the page.
