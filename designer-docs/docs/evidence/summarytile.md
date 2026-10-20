# SummaryTile source evidence

Package, Figma, and Storybook evidence for the Summary Tile guide (board ticket #76, Design documentation — Marcin; Storybook coverage — Biscuit, done: "Storybook page rewritten to the handwritten outline on main e60f8bd8").

## Checked

20 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-c7d3348` (Biscuit's `main` at c7d3348). `npm run coin:status` shows one newer upstream commit, e60f8bd8, which changes only `SummaryTile.mdx` (the handwritten Storybook page), not the component. Rendered with react-native-web 0.21.2 in headless Chrome with JioType Var loaded.

## Sources

- Package: `src/components/SummaryTile/SummaryTile.tsx` (260 lines). Exports `SummaryTile`, `SummaryTileProps` (`components/index.ts:376`). Renders `StrengthIndicator` (the meter), `NavArrow` (chevron) and, by default, a `Button`.
- Figma: [Coin Components Library · Summary Tile](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4116-6354), node `4116:6354`, a single component (no variants), 280 × 42. Layers: text column 192 wide (Title wrap: "Title" + Strength Indicator; description), slot 80 × 32 with a Button, Nav Arrow 6 × 10 hidden. Exposed properties: `chevron` (false) and the slot. Title, description and confidence are text and nested-instance overrides.
- Storybook (published `index.json`): `components-summarytile--default`, `--with-chevron`, `--with-chevron-pressable`, `--high-confidence`, `--no-indicator`, `--custom-action-button`, `--icon-button-action`, in a `width: 280, padding: 16` frame (248 px tile). The published docs page is the older generated one; e60f8bd8's handwritten page isn't deployed yet.
- Biscuit's handwritten `SummaryTile.mdx` (e60f8bd8): "a section header row: a title, a strength meter, one line of support, and either an action or a chevron. `onPress` turns the row into the action and removes the default button." Use it to "name a dashboard block and offer one next step"; not for the block itself or two actions.

## Contract

All props optional: `title` ("Spending"), `description` ("Know your spending and savings"), `confidence` (`'High' | 'Medium' | 'Low' | 'None' | number 0–1 | null`, default `'None'`), `chevron` (false), `children`, `onPress`, `modes`, `style`, `titleStyle`, `descriptionStyle`, `accessibilityLabel`, `disableTruncation`. No `testID`, `disabled`, or `...rest`.

- `children` is the action slot. Left out: a placeholder `Button` labelled "Button" with no `onPress` (it does nothing). `null`: no slot. Anything else is cloned with the tile's `modes` (`{ ...tileModes, ...child.modes }`, so a child's own modes win).
- `onPress` makes the root a `Pressable` (`role=button`, name `accessibilityLabel ?? title`, opacity 0.7 while pressed) and removes the placeholder Button, but not a child you pass (that child nests inside the row button).
- Empty `title` or `description` removes that text. `confidence={null}` removes the meter. Numbers are bucketed: > 5/6 High, > 1/2 Medium, > 1/6 Low, else None.
- `disableTruncation` affects only the title (one line with … by default). The description never truncates.
- Static tile: `accessibilityLabel` only; the title is not used as its name. Meter: `role=img`, "Strength indicator: <Level> confidence". Chevron: `role=img`, "Go forward" (not pressable on its own).

## Modes and tokens

Reads `modes` only (no theme provider). Own tokens (`summaryTile/*`, single mode): gap 8, padding 0, content gap 8, title-wrap gap 4, title 16/18/700 `#0d0d0f` (rendered line 20), description 12/16/500 `#24262b`. No mode changes them. `summaryTile/content/width` (190), `/height` (58) and `/titleWrap/height` (18) exist but are not read.

- Placeholder Button: `{ AppearanceBrand: 'Secondary', ...modes, 'Button / Size': 'S' }` → purple `#5d00b5`, size S (32 high).
- A Button you pass gets only the tile's modes: with `{ 'Color Mode': 'Light' }` it is gold Primary at size M (42 high). With tile modes `{ AppearanceBrand: 'Secondary', 'Button / Size': 'S' }` it matches Figma. The guide sets those on the tile (`TILE`).
- On the action only: AppearanceBrand (Primary gold, Secondary purple, Neutral `#303338`, Tertiary blue), Emphasis (Medium light purple, Low text), Semantic Intent System + AppearanceSystem (positive green, warning orange, negative red `#f50030`), Button / State, Context.
- Meter colours come from confidence, not modes: High 3 green `#25ab21`, Medium 2 orange, Low 1 red, None 3 grey `#e0e0e0`.
- Storybook's mode list (15 collections) is wider than what changes anything.

## Web render

Static root `div` (row, gap 8, width 100%) › text column `div` (flex 1; title row `div` › title `div[dir=auto]` + meter `div[role=img]` 17 × 16; description `div[dir=auto]`) › action wrapper `div` › `button` › optional chevron `div[role=img][aria-label="Go forward"]` 6 × 10. Pressable root is a `button`. No `data-testid`.

At 300 px with "Set budget" and TILE modes: tile 300 × 60 (description wraps to two lines); at 320 the default copy fits on one line (44 high). With "Button" placeholder: 300 × 44.

## Discrepancies

- Placeholder Button has no `onPress`; a Button passed in `children` is gold size M unless the consumer sets Secondary and S (Figma's slot Button is purple S).
- Title line 20 px (Figma 18): one-line tile 44 high (Figma 42).
- Static tile has no accessible name; the handwritten mdx says the name defaults to the title.
- The handwritten mdx says `disableTruncation` wraps the title and description; only the title is affected.
- The handwritten mdx's Don't preview (`onPress`, no children) shows no inner button although its caption says "A button inside the pressable row".
- Unread tokens `summaryTile/content/width`, `/height`, `/titleWrap/height`.
- Published Storybook docs page is the older generated one.

## Hosting

Storybook shows the tile in a 280 px frame with 16 px padding. The guide caps the tile at 320 px (`style={{ maxWidth: 320 }}`; it stays `width: 100%`), shows host widths with `coin-new-host`, and gives every tile `TILE` modes so the action is purple S as in Figma.

## Tickets

- #352 (Component Bug, Biscuit): placeholder action, slot Button look, title line height, accessible name, `disableTruncation` scope, mdx claims, unread tokens.

## Limits

Don't show Dark, Context, Context2, context5, context 10, Page type, NavArrow Direction, List Item Style or Button / State. Don't imply the tile has padding, a background or a border, that the description truncates or wraps through `disableTruncation`, that a static tile is announced by its title, that the chevron is pressable alone, or a disabled or loading state.
