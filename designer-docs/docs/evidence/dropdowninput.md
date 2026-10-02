# Dropdown Input source evidence

## Checked

28 September 2026. Declared, installed, and registry `latest` `jfs-components` are `0.1.60`. Board ticket #23 (Design documentation — Marcin). Docs-site change for this guide: `react-native-safe-area-context@5.9.1` (already installed and locked as a jfs-components dependency) is now a direct dependency; `src/main.tsx` provides `SafeAreaInsetsContext` with zero insets at the app root (a browser page has none); and Vite excludes the package from dependency pre-bundling so the docs and jfs-components share one context. A full `SafeAreaProvider` was tried first and rejected: on the web its `flex: 1` wrapper grew the page root and moved the ActionFooter anatomy.

## Sources

- Figma: [Coin Components Library · Dropdown input](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3055-880), frame `3055:880` with variants `Open=False` (`3055:881`) and `Open=True` (`3055:884`), each 307 × 94. Screenshot: label "Name", white field "Account number" with a chevron, support text with an info icon; Open shows the chevron up and a Dropdown of three items below the field (the middle one grey). Bound variables: `formField/label` 14/17 500 #000, `formField/gap` 8, `formField/input/padding/horizontal` 12, `formField/input/gap` 8, `formField/input/radius` 8, `formField/input/border/size` 1.5, `formField/input/border/color` #b5b6b7, `formField/input/background` #fff, `formField/input/label` 16/45 400 #24262b, `input/iconSize` 32, `supportText` 12/16 500 with a 16 px icon, plus the Dropdown tokens. Read through the Figma MCP (jiofinance.in account).
- Storybook: `components-dropdowninput--docs`; stories `--default` (Account / Select an account / "Choose where to transfer funds", options Savings account, Checking account, Brokerage account, Recurring deposit), `--required`, `--invalid` ("Please choose an account before continuing"), `--disabled`, `--read-only` ("Locked for this session"), `--with-icons-and-children`, `--scrollable-long-list` (`menuMaxHeight` 200), `--top-placement`, `--imperative-control`, `--custom-render-value`.

## Contract

- Public `DropdownInput` props: `label`, `placeholder`, `items` (`{ value, label, leading?, trailing?, disabled? }`), `children` (DropdownItems), `value` / `defaultValue` / `onValueChange`, `open` / `defaultOpen` / `onOpenChange`, `placement` (bottom default, top, auto), `isRequired`, `isDisabled`, `isInvalid`, `isReadOnly`, `supportText`, `errorMessage` (replaces support text when invalid), `menuMaxHeight` (default 240), `menuOffset` (default `formField/gap`, 8), `matchTriggerWidth` (default true), `closeOnBackdropPress`, `renderValue`, `accessibilityLabel` (defaults to label, then placeholder), `modes`, `style`, `inputStyle`, `menuStyle`, a ref handle (`open`, `close`, `toggle`, `focus`, `blur`). No `testID`.
- The menu is the public `Dropdown` rendered in a React Native `Modal` positioned under (or over) the field.
- Requires a `SafeAreaProvider` above it: it calls `useSafeAreaInsets` and throws "No safe area value available" without one.
- Designer-configurable: label, placeholder, options, support text, required, invalid + error message, disabled, read-only, menu height, placement. Developer-only: value/open wiring, ref control, `renderValue`, style props.

## Rendered (installed package, web, 296 px host, Light)

- Label 14/17 500 black; 8 px gap; field 296 × 48, padding 0 12, radius 8, 1.5 px rgb(181, 182, 183) border, white; value/placeholder 16/45 400 (placeholder rgb(136, 138, 141)); 32 px chevron; support row 12/16 500 with a 16 px info icon. Whole field 97 px tall with support text (Figma 94).
- Open: the menu matches the field width, sits 8 px below it, and covers the support text; the chevron flips up. Focus moves to an invisible "Close options" backdrop button. Pressing an item selects it and closes the menu; Escape closes and returns focus to the field; a backdrop press closes.
- Keyboard: Enter opens; Tab walks the items; Enter selects. Arrow keys do nothing.
- Invalid: border rgb(245, 0, 48), fill rgb(255, 224, 222), error text red. Disabled: whole field at 50% opacity. Read-only: rgb(235, 235, 236) fill and border, does not open. Required: " *" after the label.
- DOM: field `role=combobox`, `aria-haspopup=listbox`, `aria-expanded`, `aria-label` = label; the popup is `role=menu` with `menuitem`s (not a listbox). No `aria-invalid`, `aria-required`, or `aria-disabled`; a disabled field stays in the tab order (`tabindex=0`). The web focus outline is removed (`outlineStyle: none`) with no replacement.

## Limits

- Crashes without an app-level `SafeAreaProvider` (other Coin overlays such as ActionFooter avoid this requirement).
- Accessibility gaps listed above: popup role mismatch, no arrow keys, invalid/required/disabled not exposed, disabled still focusable, no visible focus indicator.
- The open menu is a full-screen modal layer; the page shows it only through interaction, not as a static open example.

## Verification

`npm run verify` passed on 28 September 2026 (32 guides at 1280 and 390 px). A headless run pressed the first field, saw the menu open, chose Checking account, and saw the field update and the menu close with no page errors. Planner review of desktop and 390 px captures fixed: the anatomy size mark covering pin 2 (removed; Sizing measures the field), the Support text pin crowding the Placeholder pin (moved right), the Sizing mark crossing the label (moved right), a false "long values end in an ellipsis" claim, a missing placeholder in Content, and a 390 px playground overflow (kit fix: `.playground-grid > * { min-width: 0 }`).

## 0.1.78 check

Checked 1 October 2026 against `jfs-components` 0.1.78 (mirror tag `v0.1.78`, built from Biscuit's `fix/component-bugs-v0.1.78` at `5b6894b`) in headless Chrome with react-native-web 0.21.2, on a test page and on this guide. The same checks were run against 0.1.77 as a baseline.

- #173 partly fixed; it was moved back to In-Progress with a work note.
- Fixed: it renders without a safe-area provider (0.1.77 threw "No safe area value available"). The trigger has `aria-haspopup=listbox` and opens `role=listbox` with `role=option` items. The chosen option has `aria-selected=true`. `aria-invalid` and `aria-required` are set. A disabled field has `tabindex=-1`. Focus draws a 2 px box-shadow ring with no height change.
- Not fixed: opening the menu moves focus to the hidden "Close options" backdrop inside the Modal, so ArrowDown and Enter never reach the trigger's `onKeyDown`, and the keyboard cannot select an option. A disabled field has no `aria-disabled` attribute, although `a11yProps` sets it.

## 3795b4c check

Checked 2 October 2026 against `jfs-components` 0.1.78 built from Biscuit's `main` at `3795b4c` (mirror tag `v0.1.78-3795b4c`) in headless Chrome with react-native-web 0.21.2.

- #173 fixed. ArrowDown opens the menu and moves focus into the listbox ("From options"); ArrowDown and Enter then select an option, and the chosen option has `aria-selected=true`. A disabled field has `aria-disabled=true` and `tabindex=-1`.
