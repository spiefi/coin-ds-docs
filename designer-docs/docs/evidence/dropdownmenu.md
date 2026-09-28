# Dropdown Menu source evidence

## Checked

28 September 2026. Declared and installed `jfs-components` is `0.1.77` from the private package repo `spiefi/coin-components` (newest tag `v0.1.77`); public npm stops at 0.1.60, which has no DropdownMenu. Board ticket #145 (Design documentation — Marcin), previously blocked by #171.

## Sources

- Figma: [Coin Components Library · Dropdown Menu](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=9473-2192), symbol `9473:2192`, 256 × 180, one `Slot` with four `Menu Item` instances, each 256 × 45. Screenshot: white rounded panel; each row has a round photo avatar, the label "Default", and a chevron; the second row is lilac. Bound variables: `menuItems/height` 45, `menuItems/padding` 8/10, `menuItems/gap` 8, `menuItems` 14/16 400 JioType Var in #100f0f, `color/menuItems/background` #ffffff, `avatar/size` 29, `icon/size` 18, `icon/color` #24262b, `dropdown/radius` 8, `dropdown/gap` 0. The package comments cite a `Menu Item` master `9473:2159`, which no longer exists in the file. Read through the Figma MCP (jiofinance.in account).
- Storybook: `components-dropdownmenu--docs`; stories `--default` (Profile, Settings, Help, Sign out; Settings selected), `--without-leading`, `--without-trailing`, `--custom-slots`, `--with-disabled-item`, `--scrollable`. MDX: a popup surface for **actions** (profile, settings, overflow, sign out), not a form field; no open/close, trigger, or positioning API; the parent owns `selected`; use Dropdown / DropdownInput for choosing form values; labels in sentence case, verb or clear noun first, no trailing punctuation. Source read from the 0.1.77 package.

## Contract

- `DropdownMenu` props: `children` (`DropdownMenu.Item` / `DropdownMenuItem`), `maxHeight`, `modes`, `style`, `accessibilityLabel` (default "Dropdown menu"). No `testID`.
- `DropdownMenu.Item` props: `label` (default "Default"), `children`, `leading` (any node; `null` hides), `trailing` (any node; `null` hides), `showLeading` (default true: a photo `Avatar`, forced to Avatar Size S), `showTrailing` (default true: `ic_chevron_right`, Neutral), `selected`, `disabled`, `onPress`, `accessibilityLabel`, `accessibilityHint`, `modes`, `style`, `labelStyle`, `disableTruncation`.
- States come from the `Menu State` collection: Default white, hover and selected #f6f3ff, pressed #e4dbff.
- Designer-configurable: items, labels, leading avatar / icon / none, chevron on/off, selected, disabled, max height. Developer-only: open state, trigger, positioning, `onPress`.

## Rendered (installed 0.1.77, web, 256 px, Light)

- Panel radius 8, white, shadow rgba(0,0,0,0.08) 0 4 16. Items 256 × 45, padding 8/10, gap 8; label 14/17 400 rgb(16, 15, 15); avatar 29 px (sample photo); chevron 18 px.
- Selected: rgb(246, 243, 255). Disabled: opacity 0.4, `aria-disabled`, `tabindex=-1`. Labels truncate to one line.
- DOM: `role=menu` named by `accessibilityLabel`; items `role=menuitem`, `tabindex=0`; no `aria-selected`/`aria-checked`, so selection is visual only. Hover uses the same lilac as selected.

## Limits

- Selected is not exposed to assistive technology; no arrow-key navigation (tracked for Dropdown in #173).
- The default leading Avatar is a placeholder photo; the page must replace or hide it.
- Figma's `Menu Item` master node cited by the package no longer exists.

## Verification

`npm run verify` passed on 28 September 2026 (33 guides at 1280 and 390 px) on jfs-components 0.1.77. Planner review of desktop and 390 px captures found no issues: anatomy pins sit on the panel, avatar, label, chevron, and selected row; examples, states, sizing marks, the overflow-menu composition, and the Do/Don't pairs render as briefed. The default photo Avatar appears only in Anatomy and the People and accounts example.
