# Suggestive Search source evidence

Package, Figma, Storybook, and browser evidence for the Suggestive Search guide (board ticket #4, Design documentation — Marcin; Storybook coverage — Biscuit, done).

## Checked

Checked 10 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-636f3f5` (Biscuit's `main` at 636f3f5); `npm run coin:status` reports the mirror and the docs up to date. `SuggestiveSearch.tsx` is identical to upstream.

## Sources

- Figma: [Coin Components Library · Suggestive search](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4579-8094), node `4579:8094`. A variant set with one property, `State` = Idle | Open | Active, each 307 × 70: a Form Field (label 14/17 medium, 45 px input, 8 px gap) and, for Open and Active, a dropdown 6 px below with 43 px rows (the Active row 44 px with a visible 20 px check). Open shows “HDF” typed with the match in lighter grey and two rows (HDFC Bank, Himachal Pradesh Gramin Bank); Active shows “HDFC Bank” with a check on a white row. Hidden layers: an 18 px input icon, an 80 × 32 end slot, support text. No Error, Read only, or Disabled variants.
- Storybook (published `index.json`, built 1 October): `components-suggestivesearch--docs`, `--default`, `--prefilled`, `--required`, `--with-empty-message`, `--object-items`, `--invalid`, `--read-only`, `--disabled`, `--uncontrolled`. The published docs page is the old composite-component page. Biscuit's `main` has the rewritten mdx (Button outline) and two more stories (`--max-results`, `--without-highlight`) that are not published.

## Contract

- Props: `label`, `placeholder` (“Search”), `items` (strings or `{ value, label, disabled? }`), `inputValue` / `defaultInputValue` / `onInputChange`, `value` / `defaultValue` / `onValueChange`, `filter` (default: label contains the query, case-insensitive), `minChars` (1), `maxResults`, `highlightMatch` (true), `emptyMessage`, `renderItem`, `open` / `defaultOpen` / `onOpenChange`, `menuMaxHeight` (240), `menuOffset` (6), `isRequired`, `isDisabled`, `isInvalid`, `isReadOnly`, `supportText`, `errorMessage` (replaces support text when invalid), `modes`, style props, `accessibilityLabel` (defaults to label, then placeholder), `accessibilityHint`, `onFocus`, `onBlur`, `testID`.
- The consumer owns `items` and any loading; the component filters, caps, highlights the first match in bold, and shows a check on the selected row. Choosing sets the query to the option's label, closes the list, and blurs the field; typing anything else clears the selection. Without `emptyMessage` the list hides when nothing matches.
- `FormField States` is forced: invalid → Error, read-only or disabled → Read Only (disabled adds 50 % opacity), focused → Active, else Idle. Disabled options stay listed and can't be chosen.
- Tokens (Light): label 14/17 medium black; field 45 px plus a 1.5 px border, radius 8, padding 12, white with `#b5b6b7` border (Active `#5d00b5`, Error fill `#ffe0de` and border `#f50030`, Read Only `#ebebec`); text 16 px; placeholder `#888a8d` (hard-coded); rows 16 px text, padding 12, white, hover/selected `#f5f5f5` with a 16 px check; list radius 8, shadow 0 4 16 8 % black; support text 12/16 with a 16 px icon; required asterisk `#d93d3d` (hard-coded).
- Classification. Designer-configurable: label, placeholder, the options, support text, required, empty message, maximum results, highlight on/off, disabled options, invalid with an error message, read only, disabled. System-driven: filtering, the field state colours, list position and scrolling. Developer-only: controlled state and callbacks, `filter`, `renderItem`, `open`, style props, `testID`.

## Browser measurements (Chrome, react-native-web 0.21.2, Light, 360 px column)

- Closed with a label: 360 × 72 (label 17, gap 8, field 47). With support text: 96.
- Typing “ban” opens a 240 px list 6 px below the field (top at 78) with 44 px rows; the match “Ban” is bold (`span`, weight 700) in black; the list scrolls after five and a half rows and floats over whatever follows.
- `defaultOpen` with “HDF”: one row (HDFC Bank); Himachal Pradesh Gramin Bank is filtered out (Figma shows it).
- Clicking an option sets the field to its label and the value, and closes the list.
- Required: a red “*” after the label. Invalid: field `#ffe0de` with a `#f50030` border; error text red with a warning icon. Disabled: grey field, 50 % opacity.
- Keyboard: the arrow keys and Escape do nothing; Enter in the field closes the list without choosing; Tab moves to the first option, but the list closes 120 ms after the field loses focus, so a following Enter selects nothing (selecting works only if Enter comes within that window).
- DOM: root `div[data-testid]` > label row (label `div[dir="auto"]`, optional asterisk) > field wrapper (`div[tabindex="0"]`, an extra tab stop) > `input[role="search"]` with `aria-label`, `aria-expanded`, `aria-autocomplete="list"`; list `div[role="listbox"]` named “<label> suggestions”; rows `div[role="option"]` with `aria-selected`, every one named “Dropdown item”; support text a plain `div`.

## Accessibility (web)

- The field is announced as a search field, not a combobox; there is no `aria-controls` or active option; required and invalid aren't announced, and the error text isn't linked.
- Every suggestion is read as “Dropdown item”, not its label.
- Keyboard users can't choose a suggestion reliably (see above). Enter on a focused option fires twice (#209).

## Limits

- Not shown: Dark, `renderItem`, a custom `filter`, controlled `open`, `menuMaxHeight`, `menuOffset`, style props.

## Coin gaps

- #233 (Component Fix, To do, Component Bug; Mr. Biscuit): keyboard users can't pick a suggestion (no arrow keys or Escape; Tab closes the list); every option named “Dropdown item”; search role instead of a combobox; required and invalid not announced and the error not linked; an extra tab stop on the field wrapper; `onOpenChange` only fires on selection; the default filter uses the untrimmed query (“HDF ” matches nothing); Figma differences (grey vs bold match, placeholder colour, 20 vs 16 px check, white vs grey selected row, 43 vs 44 px rows); the rewritten Storybook page and two stories are not published.
- Existing: #209 (Enter fires `onPress` twice on DropdownItem).
