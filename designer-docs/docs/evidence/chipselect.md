# Chip Select source evidence

## Checked

28 September 2026. Declared, installed, and registry `latest` `jfs-components` are `0.1.60`. No dependency change. Board ticket #108 (Design documentation — Marcin).

## Sources

- Figma: [Coin Components Library · Chip/Select](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1901-4727), frame `1901:4727` with variants `State=Idle` (`1901:4726`, 84 × 32) and `State=Active` (`1901:4728`, 104 × 32). Screenshot: Idle is a grey pill with a calendar icon and bold "Date"; Active is a lavender pill with purple icon, "Date", and a close ×. Bound variables: `chipSelect/gap` 4, `chipSelect/padding/horizontal` 16, `chipSelect/padding/vertical` 0, `chipSelect/radius` 999, `chipSelect/icon/size` 16, 14/32 JioType Var 700, Idle background #f5f5f5 and foreground #0d0d0f. Read through the Figma MCP (jiofinance.in account).
- Storybook: `components-chipselect--docs`; stories `--default` (Date, Idle), `--active`, `--custom-icon` (Home, `ic_home`), `--active-without-close-icon`. MDX: "used for making selections, such as dates or filters"; Idle shows icon and label, Active adds a close icon unless `showCloseIcon={false}`.

## Contract

- Public `ChipSelect` props: `label` (default `Date`), `active` (default false), `icon` (default `ic_calendar_week`), `showCloseIcon` (default true), `labelSlot`, `onPress`, `modes`, `style`. No `disabled`, `testID`, or accessibility props; no rest spread.
- `active` forces the `ChipSelect State` mode (Idle/Active); a passed mode is overridden.
- The leading icon renders in both states when `icon` is set (JSDoc says Idle only; Figma shows it in both, so the package matches Figma). An empty `icon` hides it.
- The close icon is decoration inside the one press target; it is not a separate button. What a press does (open a picker, clear the filter) is the consumer's decision.
- Designer-configurable: label, active, icon, close icon. Developer-only: `onPress` wiring, `labelSlot`.

## Rendered (installed package, web, Light)

- Idle "Date": 85.8 × 32, padding 0 16, gap 4, radius 999, background rgb(245, 245, 245), 16 px icon, label 14/32 700 rgb(13, 13, 15).
- Active "Date": 105.8 × 32, background rgb(246, 243, 255), icon/label/× rgb(93, 0, 181). Without close icon: 85.8 × 32.
- "Last 30 days" Idle: 142.2 × 32 (the width hugs the label). Pressed opacity 0.8 (TouchableOpacity).
- DOM: `div tabindex=0` with no role, no accessible name, and no selected/pressed state. Enter and click both fire `onPress`.

## Limits

- Accessibility gap: on the web the chip is not announced as a button, has no name beyond its text content, and does not expose Active. The page must not claim selection is announced.
- No disabled state. No separate clear target on the ×.
- Figma widths (84/104) differ from rendered (85.8/105.8) by font rasterisation only.

## Verification

`npm run verify` passed on 28 September 2026 (all 29 guides at 1280 and 390 px). Planner review of desktop and 390 px captures: backtick prop names removed from two descriptions; anatomy, examples, and in-context toggling render as briefed. The Idle chip's #f5f5f5 fill is low-contrast against the example stage; this is the kit stage colour, not a component change.

## 0.1.78 check

Checked 1 October 2026 against `jfs-components` 0.1.78 (mirror tag `v0.1.78`, built from Biscuit's `fix/component-bugs-v0.1.78` at `5b6894b`) in headless Chrome with react-native-web 0.21.2, on a test page and on this guide. The same checks were run against 0.1.77 as a baseline.

- #169 fixed. The chip renders as a `<button>` with `aria-label` from `label`, and `aria-pressed` follows `active`. `accessibilityLabel` replaces the name, and `testID` reaches the element (the guide's anatomy now targets `byTestId('chip-anatomy')`).
