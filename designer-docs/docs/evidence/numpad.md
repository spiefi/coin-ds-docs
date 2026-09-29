# Numpad source evidence

## Checked

29 September 2026. Declared and installed `jfs-components` is `0.1.77` from the private package repo `spiefi/coin-components` (newest tag `v0.1.77`). Board ticket #143 (Design documentation — Marcin; Storybook coverage — Biscuit, done).

## Sources

- Figma: [Coin Components Library · Numpad](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2054-964), symbol `2054:964` (318 × 245): twelve 98 × 52.25 text keys in order 1–9, then ".", "0", "←". Tokens: `numpad/foreground` #141414, JioType Var 32/32, `numpad/gridRowGap/vertical` 12, `numpad/gridColumnGap/horizontal` 12. Read through the Figma MCP (jiofinance.in account).
- Storybook: `components-numpad--docs` (secure numpad for the JFS finance system; digits shuffled by default against keylogging and shoulder-surfing; always shuffle for PINs, OTPs, or transaction amounts; sits at the bottom of the screen via the layout; `showDecimal={false}` for integer-only input such as PINs; `onKeyPress` receives "0"–"9", ".", or "backspace"). Stories: `--default` (shuffled), `--unshuffled`, `--without-decimal`, `--bottom-fixed` ("Enter Amount ₹ 0.00" above the pad).
- Package source `src/components/Numpad/Numpad.tsx` (0.1.77).

## Contract

- Props: `onKeyPress(key)`, `showDecimal` (default true), `shuffle` (default true; digit positions re-randomised on each mount; "." and backspace fixed), `modes`, `style`, `keyStyle`, `keyTextStyle`.
- The screen owns the value: it appends digits, handles "." and backspace, masks or formats what it shows, and places the pad.
- Designer-configurable: shuffle, decimal key. Developer-only: `onKeyPress`, style overrides.

## Rendered (installed 0.1.77, web, Light)

- Container `role=presentation`, 318 × 220 at 318 px: four rows, 12 px row and column gaps; keys share the width equally (98 × 46), minimum height 46.
- Keys: `button` named by the digit, "." or "Backspace"; digits JioType Var 32/39 rgb(20, 20, 20), no key background; backspace is the `ic_delete_backspace` icon (Figma shows a "←" glyph). 40% opacity while pressed; no disabled state. Enter activates a focused key.
- Without the decimal, the bottom-left cell stays empty.

## Limits

- Shuffled layouts change on every mount, so the page anatomy uses `shuffle={false}` for stable targets.
- No masking, value display, or maximum length; the page must not imply them.

## Verification

`npm run verify` passed on 29 September 2026 (38 guides at 1280 and 390 px) on jfs-components 0.1.77; `guideKitSurvey` returned `{}`. Planner review of desktop and 390 px captures. Playground typing and backspace update the Entered readout; Shuffle reorders on toggle. In context: 1, 2, 5, 0 gives "Amount ₹1250" and "Add ₹1250"; backspace gives ₹125. Sizing reads 318 × 220 and 98 × 46. Review fix (brief error): the Sizing host was widened to 334 px because the VStack's 8 px padding had left the pad at 302 px.
