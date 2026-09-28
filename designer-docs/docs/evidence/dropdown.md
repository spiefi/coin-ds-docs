# Dropdown source evidence

## Checked

28 September 2026. Declared, installed, and registry `latest` `jfs-components` are `0.1.60`. No dependency change. Board ticket #37 (Design documentation — Marcin).

## Sources

- Figma: [Coin Components Library · Dropdown](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3087-4266), symbol `3087:4266` (layer name "Drodown"), 223 × 129, one `Slot` holding three `Dropdown item` instances, each 223 × 43. Screenshot: white rounded panel with a soft shadow; the middle item has a light grey fill. Bound variables: `dropdown/radius` 8, `dropdown/background` #ffffff, `dropdown/gap` 0, shadow #00000014 0/4/16; `dropdownItem/padding` 12/12, `dropdownItem/gap` 8, 16/19 JioType Var 400 in #000000, `dropdownItem/background` #ffffff. Read through the Figma MCP (jiofinance.in account).
- Storybook: `components-dropdown--docs`; stories `--default` (12 options, `maxHeight` 180, width 240, single selection), `--with-icons`, `--with-disabled-item` ("Available option", "Coming soon"), `--scrollable`. Component description: a surface for a vertical list of `DropdownItem`s; use standalone for menus or inside `DropdownInput` for form selection.

## Contract

- `Dropdown` props: `children` (DropdownItems), `maxHeight` (turns the list into a scroll area), `modes`, `style`, `accessibilityLabel` (default "Dropdown menu"). No `testID`, no open/close state, no positioning: showing, hiding, and placing the panel is the consumer's job (DropdownInput does this for form fields).
- `DropdownItem` props: `label`, `value`, `selected` (grey fill + trailing check), `disabled` (opacity 0.4), `leading`, `trailing` (replaces the check), `onPress(value)`, `children` (replaces the label), `disableTruncation`, `accessibilityLabel`, `modes`, `style`, `labelStyle`.
- Designer-configurable: items, labels, leading icons, selected item, disabled items, max height. System-driven: panel radius/shadow, item padding, hover/pressed fill (same grey as selected). Developer-only: open state, placement, `onPress` wiring.

## Rendered (installed package, web, 240 px wide, Light)

- Panel: radius 8, white, shadow rgba(0,0,0,0.08) 0 4 16; items 240 × 43, padding 12, gap 8, label 16/19 400 black.
- Selected: rgb(245, 245, 245) fill and a 16 px check. Disabled: opacity 0.4, `aria-disabled`, `tabindex=-1`. A long label truncates to one line with an ellipsis.
- Leading icon: 18 px registry icon rendered in the brand gold when no colour is given.
- DOM: `role=menu` (named by `accessibilityLabel`), items `role=menuitem`, `tabindex=0`. `aria-selected`/`aria-checked` are not emitted, so the selected item is only visual. No arrow-key navigation; Tab moves item to item and Enter activates.

## Limits

- Selection is not exposed to assistive technology; menu semantics are used even for choice lists.
- Hover and pressed use the same grey as selected, so a hovered item looks selected.
- The page must state that opening, closing, and positioning belong to the screen (or to DropdownInput).

## Verification

`npm run verify` passed on 28 September 2026 (32 guides at 1280 and 390 px). Planner review of desktop and 390 px captures: the Sizing item mark's label covered the first label (panel mark moved to the top, item mark to the right), and the playground's "Selected" control covered only two of four items (removed; pressing an item selects it). The worker used the public `Icon` prop `iconName` where the brief said `name`.
