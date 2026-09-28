# Bottom Nav source evidence

## Checked

28 September 2026. Declared, installed, and registry `latest` `jfs-components` are `0.1.60`. No dependency change. Board ticket #99 (Design documentation — Marcin). The item-level guide is `bottomnavitem` (see [bottomnavitem.md](bottomnavitem.md)); this guide covers the bar.

## Sources

- Figma: [Coin Components Library · BottomNav](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=302-79), symbol `302:79`, 360 × 77, five `BottomNavItem` instances (`301:2036`–`301:2040`) each 65.6 × 44 starting at x 16, y 10. Screenshot: Home, Finances, Pay, Invest, Explore; no item is shown Active in the master. Bound variables: `bottomNav/padding/top` 10, `/bottom` 23, `/horizontal` 16, `bottomNav/gap` 0, `bottomNav/border/width` 1, `bottomNav/border/color` #cccfd1, `bottomNav/background` #ffffff; items use 24 px icons, 6 px gap, 11/14 500 labels. Read through the Figma MCP (jiofinance.in account).
- Storybook: `components-bottomnav--docs`; stories `--default` (five items in a 360 × 160 frame, Light), `--with-disabled-item` (Pay disabled), `--on-dark-background`, `--mobile-app-simulation` (360 × 640 screen whose content follows the active tab). MDX: keep 3–5 items to preserve tap width, labels of 1–2 words, set `value` on each item; state and modes are managed by the parent.

## Contract

- Public `BottomNav` props: `value`, `onChange(value)`, `children` (`BottomNav.Item` with `value`, `label`, `iconName`, `disabled`, `onPress`), `modes`, `style`, `accessibilityHint`, View props (`testID` reaches the DOM). `accessibilityLabel` is accepted but discarded.
- BottomNav clones each child: merges modes, sets `BottomNavItem / State` to Active when `child.value === value` (else Idle), wraps `onPress` to call `onChange`, sets `accessibilityState.selected`, and gives each item `flex: 1`.
- Layout: `position: absolute; bottom: 0; left: 0; right: 0` — it anchors to the nearest positioned ancestor. Row, padding 10/16/23, 1 px top border.
- Designer-configurable: the destinations (count, label, icon), which one is Active, a disabled destination. System-driven: equal widths, padding, border, state colours. Developer-only: `value`/`onChange` wiring, `onPress`, positioning host.

## Rendered (installed package, web, 360 px positioned host, Light)

- Bar 360 × 78 (1 + 10 + 44 + 23); items share 328 px: 109.3 (3 items), 82 (4), 65.6 (5), 54.7 (6).
- Active item: icon rgb(173, 132, 68), label rgb(13, 13, 15). Idle: icon rgb(48, 51, 56), label rgb(36, 38, 43). Border rgb(204, 207, 209).
- A long label ("Investments & savings") wraps to two lines and makes that tab 58 px tall.
- With `value` matching no item, every item is Idle.
- DOM: `role=tablist` with no accessible name even when `accessibilityLabel` is set; each item `role=tab`, `aria-label` = label. `aria-selected` is not emitted (React Native Web 0.21). Disabled: `aria-disabled`, `tabindex=-1`, opacity 0.5.

## Limits

- Figma 77 px vs rendered 78 px bar height (top border drawn outside vs inside).
- Tablist unnamed and Active tab not exposed as selected on the web.
- Dark mode: the installed tokens resolve the Idle label to orange (bottomnavitem evidence), so the guide stays Light.
- Needs a positioned host; the guide uses the kit's `ScreenFrame`.

## Verification

`npm run verify` passed on 28 September 2026 (all 29 guides at 1280 and 390 px). Planner review of desktop and 390 px captures: in-context screen text stacked (it ran together). The Sizing mark reads 358 × 78 because the kit ScreenFrame draws a 1 px border inside its 360 px width. At 390 px the anatomy bar is narrower than 360 and labels sit close together, which is the component's real behaviour at that width.
