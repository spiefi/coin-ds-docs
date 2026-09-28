# Checkbox Group source evidence

## Checked

28 September 2026. Declared, installed, and registry `latest` `jfs-components` are `0.1.60`. No dependency change. Board ticket #72 (Design documentation — Marcin). Row-level behaviour is in [checkboxitem.md](checkboxitem.md) and [checkbox.md](checkbox.md).

## Sources

- Figma: [Coin Components Library · Checkbox Group](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3999-527), symbol `3999:527`, 272 × 78, one `slot` (`3999:526`) holding three `Checkbox Item` instances at y 0, 30, 60 (each 272 × 18: 18 px checkbox, label slot with Text "I agree" + Link "Terms & Conditions", hidden 80 px endSlot). Bound variables: `checkboxGroup/gap` 12, `checkboxGroup/padding/horizontal` 0, `/vertical` 0; checkbox 18 px, radius 4, 1 px #666 stroke; text 14/16 400, link 14/16 500. Read through the Figma MCP (jiofinance.in account).
- Storybook: `components-checkboxgroup--docs`; stories `--default` (three uncontrolled items: "Fixed deposit • 0245", "Recurring deposit • 1182", "Mutual fund • Equity" in a 272 px frame), `--empty`, `--controlled`, `--with-end-slot` (Button "Manage"), `--with-disabled-items`. MDX: group related multi-select options in a form; the parent owns checked state; the group is purely presentational; children should be CheckboxItems; share one `modes`; the group adds no horizontal padding.

## Contract

- Public `CheckboxGroup` props: `children`, `modes` (forwarded recursively to children and their slots), `style`, `accessibilityLabel`. No `testID`, no rest spread, no selection, select-all, validation, error, heading, or orientation.
- With no children, it renders three placeholder CheckboxItems.
- Designer-configurable: which items, their labels and label slot content (Text + Link), per-item disabled, per-item end slot. System-driven: 12 px gap, zero padding, full width. Developer-only: checked state and callbacks.

## Rendered (installed package, web, 272 px host, Light)

- `ul role=list` 272 wide, gap 12. Rows 272 × 19 (Figma 18), label 14/19 400 rgb(13, 13, 15); checkbox 18 × 18. A row with a default Button end slot is 42 tall (Button 80 × 42).
- Checked: rgb(92, 0, 181) fill, white tick. Disabled: border rgb(153, 153, 153), `aria-disabled`, `tabindex=-1`; the label colour does not change.
- Empty group: three identical rows labelled "Fixed deposit • 0245", all unchecked.
- DOM: rows are `role=checkbox` with a nested `role=checkbox` (duplicated semantics), neither emits `aria-checked`, and the list's children are not list items. The group name comes only from `accessibilityLabel`. Space does not toggle (checkbox evidence).

## Limits

- Row height 19 vs Figma 18.
- Checked state not exposed on the web; nested duplicate checkbox roles; list without list items.
- No visible group label; the screen supplies a heading.
- Placeholder fallback is a scaffold, not shippable content.

## Verification

`npm run verify` passed on 28 September 2026 (all 29 guides at 1280 and 390 px). The worker moved the Sizing size mark to the left because on the right its label covered the 12 px gap label. Planner review of desktop and 390 px captures: anatomy, examples, disabled rows, placeholder Don't, and the in-context Card with the count-driven Button render as briefed.
