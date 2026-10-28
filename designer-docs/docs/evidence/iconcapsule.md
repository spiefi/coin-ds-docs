# IconCapsule source evidence

Package, Figma, and Storybook evidence for the Icon Capsule guide (board ticket #54, Design documentation — Marcin; Storybook coverage — Biscuit, done: "handwritten IconCapsule docs page and stories. Component code was not changed.").

## Checked

28 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-dbe0e02` (Biscuit's `main` at dbe0e02, 27 October); `npm run coin:status` reports the mirror up to date with upstream. Installed and upstream `IconCapsule.tsx` are byte-identical. Rendered the installed package in the docs site's Vite setup (react-native-web 0.21.2) in headless Chrome.

## Sources

- Package: `src/components/IconCapsule/IconCapsule.tsx`. Exports `IconCapsule` (`React.memo`, `components/index.ts:148`); its props type isn't exported. Renders one low-level `Icon` (`IconCapsule.tsx:119-126`) in a centred `View` with `overflow: hidden`.
- Figma: [Coin Components Library · Icon Capsule](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=8960-33559), component set `8960:33559`, variant `Type` = Default (`44:39`) | Glass (`8960:33560`), instance swap `icon` (default `ic_card`). Both 42 × 42, an 18 px glyph at 12, 12. Default resolves `iconCapsule/background` `#303338` and `iconCapsule/icon/color` `#ffffff` (Neutral High). Glass uses `iconCapsule/glass/background` `#ffffff33` and the `glass/minimal` background blur (29).
- Storybook (published `index.json`): `components-iconcapsule--default`, `--different-icons`, `--fallback-source-svg-uri`, `--fallback-source-raster`, `--fallback-source-inline-svg`, `--fallback-source-comparison`, `--appearance-modes`, `--docs`. No wrapper frame; Default sets Primary, Different Icons and Appearance Modes sit in a padded row. No story shows XS, S, L, Medium, Low, System, or a Context.
- Biscuit's handwritten `IconCapsule.mdx`: eight collections, usage, the `source` prop, accessibility ("Provide `accessibilityLabel` when the icon conveys meaning; defaults to the icon name"), anatomy, token list.

## Contract

- `iconName` (`'ic_card'`): any name in the Coin icon set (about 1,300). An unknown name draws the circle with no glyph and logs a warning.
- `source`: a fallback glyph (SVG, raster, or element), used only when `iconName` isn't in the set. Because `iconName` defaults to `ic_card`, `source` alone never shows (rendered: `source` with no `iconName` draws `ic_card`; with `iconName=""` or an unknown name it draws the source).
- `modes`, merged over a `JFSThemeProvider`'s modes:
  - `Icon Capsule Size`: XS 18 / 12, S 29 / 18, M 42 / 18 (default), L 81 / 36 (circle / glyph, rendered).
  - `Context`: Default and ListItem use the size; Nudge&Alert fixes 14 / 14; CTACard 58 / 29 (rendered). Parent components set it.
  - `Semantic Intent` Brand (default): `Emphasis` × `AppearanceBrand`. High: Primary `#cea15a` / black glyph, Secondary `#5d00b5` / white, Neutral `#303338` / white, Tertiary `#036b99` / white. Medium: Primary `#fde8c9`, Secondary `#e4dbff`, Neutral `#545961`, Tertiary `#036b99` with a pale `#b3d3e0` glyph. Low: fill alpha 0, so only the coloured glyph shows (rendered).
  - `Semantic Intent` System: `AppearanceSystem` positive `#26ab21`, warning `#f06e0f`, negative `#f50030`, white glyph; `Emphasis` and `AppearanceBrand` change nothing (System + Low is still filled, rendered).
  - `Page type` JioPlus: only Neutral Low's glyph turns white.
- `accessibilityLabel`: accepted and discarded (`IconCapsule.tsx:85-88, 116`; the comment says icons are decorative). The root is `role="img"` with no name; the glyph is hidden. An `aria-label` in the rest props does reach the root (rendered).
- `style` last on the root; other View props (`testID`) pass through. No `onPress`, no states. Always a circle (radius sentinel 9999 → size / 2); 1 px transparent border.

## Web render

Root `div[role=img][data-testid]` (42 × 42 at M) › `div` › `svg` (18 × 18).

## Discrepancies

- Figma has `Type=Glass`; the package has no type prop and never reads `iconCapsule/glass/background`.
- Figma's Default is Neutral High (dark grey, white glyph); the package with no modes, and Storybook's Default, are Primary High (gold, black glyph).
- MDX says `accessibilityLabel` is supported and defaults to the icon name; the package drops it.
- JSDoc and MDX say `source` is used when `iconName` is missing; the default `iconName` means it never is.
- Figma draws only M; the other sizes and contexts exist as variable modes only.

## Hosting

Capsules sit bare on the example stages (Storybook has no frame). In List Items they go in `leading`; the List Group passes its modes through the row to the capsule, and a capsule's own modes win, so colour modes go on the capsule (on the group they also recolour the row's support text).

## Tickets

- #419 (Component Bug, Component Fix › To do; Mr. Biscuit; filed 28 October 2026, Penny run run_7586d367): Glass type, default appearance vs Figma, dropped `accessibilityLabel`, unreachable `source`.

## Limits

Don't show or mention Color Mode or dark mode. Don't show Glass, `source`, `style`, `accessibilityLabel`, or Context values as options. Don't imply the capsule presses, has a label, or has states.
