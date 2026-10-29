# HeroSection source evidence

Package, Figma, and Storybook evidence for the Hero Section guide (board ticket #160, Design documentation — Marcin; Storybook coverage — Biscuit, done: "Storybook page rewritten to the handwritten outline on main 475ae733").

## Checked

26 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-c8526ae` (Biscuit's `main` at c8526ae); `npm run coin:status` reports the mirror up to date with upstream. Rendered the installed package in the docs site's Vite setup (react-native-web 0.21.2) in headless Chrome.

## Sources

- Package: `src/components/HeroSection/HeroSection.tsx` (233 lines). Exports `HeroSection`, `HeroSectionProps` (`components/index.ts:137`). Renders `Title` (with `context7: 'Page Hero'`), `InputSearch`, and `IconButton` (with `AppearanceBrand: 'Secondary'`, `Emphasis: 'Medium'`); the caller's `modes` win over both defaults.
- Figma: [Coin Components Library · Hero Section](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=6507-31453), node `6507:31453`, one component, 360 × 466, fixed width, white, padding 16 / 12, gap 16. Booleans `Title` and `Search`, a `children` slot. A nested Title (26 px Black, 12 px subtitle, `context7 = Page Hero`), then a "Search Filter" instance whose VStack adds 8 px around the row: Input Search 44 tall and a 42 px Icon Button (Secondary, Medium, `ic_filter`), gap 16. No filter switch.
- Storybook (published `index.json`): `components-herosection--default`, `--with-content`, `--without-subtitle`, `--without-search`, `--without-filter`, `--centered-title`, `--controlled`, `--custom-search-and-filter`. Host: a 360 px white box.
- Biscuit's handwritten `HeroSection.mdx`: "a page header with search: a title, an optional subtitle, a search field, a filter button, and a body under the row." For a list page; not a marketing offer (PageHero) or search with no title (InputSearch alone). Content: the title is the page name, the subtitle the range or scope, the placeholder stays Search unless the field looks for something specific, the filter label says what it filters. "The section does not filter a list for you. `children` is just the body."

## Contract

- `title` (default 'Page Title'): Title, 26 px Black on a 32 px line, `#0d0d0f`, one line with an ellipsis.
- `subtitle` (default 'Subtitle'): 12/16 Regular under it, 2 px gap. `''` hides it (the 2 px gap stays); leaving it out shows 'Subtitle'.
- `titleTextAlign` `Left` (default) | `Center`. `showTitle` false removes the block. `titleSlot` replaces it (title, subtitle, alignment, showTitle ignored).
- `showSearch` (true) shows the row. `searchPlaceholder` ('Search'); `searchValue` + `onSearchChange` hold the text: the hero keeps none, so the field stays empty unless both are wired. A value shows InputSearch's clear button (`ic_close`, "Clear search"). `searchSlot` replaces the field and shows the row even with `showSearch` false.
- `showFilter` (true), `filterIcon` ('ic_filter'), `onFilterPress`, `filterAccessibilityLabel` ('Filter'). `filterSlot` replaces the button but gets only the hero's modes, not the Secondary / Medium defaults (renders gold unless given them). With `showSearch` false and no `searchSlot`, the filter and any `filterSlot` go too.
- `children`: a full-width body under the row (cascaded modes).
- `modes`: `AppearanceBrand` and `Emphasis` recolour the filter only (Secondary Medium `#e4dbff` / `#5d00b5`; Emphasis High solid `#5d00b5`; Low no fill); `Button / Size` S or XS shrinks the filter only (26 px) beside the 42 px field; `context7` other than Page Hero changes the Title (Default adds its own 12 / 8 padding; Card shrinks it to 14 px). `Page type`, `context 9`, `Context2`, `InputState`, `FormField States`, `Status` change nothing visible.
- `style` last on the root; `testID` on the root. Root: white `heroSection/background`, padding 16 / 12, gap 16, width 100%.

## Web render

Root `div[data-testid]` (column, padding 16/12/16/12, gap 16, white) › `h1[role=heading]` title block (gap 2) › [`div[dir=auto]` title, `div[dir=auto]` subtitle] · `div` row (gap 16) › [`div` InputSearch (flex 1, 42 tall, `#f5f5f5`, fully rounded) › `input[aria-label]`; `button[aria-label="Filter"]` 40 × 40] · `div` body.

- 360 px host, defaults: 360 × 140 (title block 50, field 42, filter 40). With `subtitle=""`: 124.
- A long title ellipsizes on one line.
- With `Emphasis: 'High'` the filter is solid purple; `Low` no fill; `Button / Size: 'S'` a 26 px filter beside the 42 px field.
- A `filterSlot` IconButton without modes is gold `#cea15a`; with `{ AppearanceBrand: 'Secondary', Emphasis: 'Medium' }` it matches the default.

## Discrepancies

- Figma insets the search row 8 px inside the section (Search Filter's VStack padding) and draws a 44 px field and a 42 px button; the package puts the row flush with the title, a 42 px field, and a 40 px button; the title block is 50 tall (Figma 44).
- `subtitle` has no way to hide it except `''`; the `WithoutSubtitle` story passes `undefined` and still shows "Subtitle", and the MDX says to omit it.
- `showSearch={false}` also drops `filterSlot`. A `filterSlot` doesn't get the default filter's Secondary / Medium (the `CustomSearchAndFilter` story's sort button is gold).
- The MDX says the Title context is forced; caller modes override it.
- Figma has no filter switch and no title / subtitle / placeholder / icon properties on the hero.

## Hosting

The hero is white and fills its host, so every example sits in a Coin `VStack` 360 px column (`maxWidth: 100%`), as Storybook hosts it in a 360 px white box; on the grey stage its edge shows. Search fields in examples are wired to state (`searchValue` + `onSearchChange`) so they hold typed text. Body content is a Coin `ListGroup` of `ListItem`s with a `MoneyValue` trailing.

## Tickets

- #404 (Component Bug, Biscuit, filed 26 October 2026): subtitle, row inset and sizes, filterSlot defaults, filterSlot dropped without search, story and MDX.

## Limits

Don't show or mention Color Mode or dark mode. Don't imply the hero filters or searches a list for you, keeps typed text on its own, hides the subtitle when it's left out, or that the title wraps.
