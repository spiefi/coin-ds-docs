# Nav Arrow source evidence

## Checked

29 September 2026. Declared and installed `jfs-components` is `0.1.77` from the private package repo `spiefi/coin-components` (newest tag `v0.1.77`). Board ticket #137 (Design documentation — Marcin; Storybook coverage — Biscuit, done).

## Sources

- Figma: [Coin Components Library · Nav Arrow](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1444-33), frame `1444:33` with `Direction=Back` (6 × 10), `Direction=Forward` (6 × 10), `Direction=Down` (10 × 6). Tokens: `navArrow/icon/color` #24262b, `navArrow/width` 6, `navArrow/height` 10, `navArrow/radius` 0, `navArrow/background` transparent. Read through the Figma MCP (jiofinance.in account).
- Storybook: `components-navarrow--docs` (chevron for Back or Forward navigation in headers and list items; examples in a header and a pressable list row). Stories: `--default`, `--forward`, `--back`, `--down`, `--pressable` (44 × 44 target), `--all-directions`.
- Package source `src/components/NavArrow/NavArrow.tsx` (0.1.77). Drawn inside `ListItem` (`navArrow`, default true, Forward), `AppBar` (Back), `Section`, `SummaryTile`, and `TransactionBubble` (Forward).

## Contract

- Props: `direction` `Back` (default) | `Forward` | `Down`, `onPress`, `disabled`, `accessibilityLabel` (defaults "Go back", "Go forward", "Go down"), `modes`, `style`, plus pressable rest props.
- Without `onPress`: a `View` with `accessibilityRole="image"`. With `onPress`: a `Pressable` button with a 44 × 44 minimum target, 70% opacity while pressed.
- Modes: colour via context 10 → context5 → Page type → Color Mode (Light #24262b; JioPlus white; Profile Card Appearance Premium gold); size via NavArrow Direction and Context2 (Default 6 × 10, AppBar 32 × 32 box).
- Designer-configurable: direction, pressable or decorative, label. Developer-only: `onPress`, `disabled`.

## Rendered (installed 0.1.77, web, Light)

- Decorative: `div[role=img]` 6 × 10 (Down 10 × 6) named "Go back"/"Go forward"/"Go down"; 2 px round-capped stroke rgb(36, 38, 43).
- Pressable: `button` 44 × 44 named by the label, chevron 6 × 10 centred. Enter activates. `disabled` has no visual change.
- `Context2: AppBar`: 32 × 32 box. `Page type: JioPlus`: white. `Color Mode: Dark`: rgb(255, 153, 0), because `mode/Grey/400` Dark is #ff9900.
- A decorative arrow inside a pressable `ListItem` row is still announced as an image named "Go forward".

## Limits

- #177 (Components, To do; Marcin Śpiewak, token problem): `mode/Grey/400` Dark is orange, so a Dark-mode NavArrow is orange. The page shows Light only.
- Disabled has no visual state; the page does not show it.
- Prefer the arrow that ListItem, AppBar, Section, and SummaryTile already draw.

## Verification

`npm run verify` passed on 29 September 2026 (38 guides at 1280 and 390 px) on jfs-components 0.1.77; `guideKitSurvey` returned `{}`. Planner review of desktop and 390 px captures. Playground Direction and Pressable work, and presses count only when pressable. Sizing reads 6 × 10 and 44 × 44. Review fixes (brief errors): Sizing marks moved to the top so they no longer overlap the captions, the 44 × 44 target is outlined, and the decorative arrow is centred second so the "Shown at" badge no longer hides it on mobile.
