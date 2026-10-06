# Disclaimer source evidence

Package, Figma, Storybook, and browser evidence for the Disclaimer guide (board ticket #71, Design documentation — Marcin; Storybook coverage — Biscuit, done).

## Check

Checked 6 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-3795b4c` (Biscuit's `main` at 3795b4c). Biscuit's `main` is now at 636f3f5 (5 October); that commit does not change `Disclaimer.tsx`, its stories, or its mdx, but its token file changes `mode/Grey/400` Dark from #FF9900 to #F1F1F1, which fixes Disclaimer's Dark text colour (ticket #177).

- Figma: [Coin Components Library · Disclaimer](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=208-2399), node `208:2399`. A single component (not a set), 281 × 24, one text layer: "Payment and UPI services are provided by / Jio Payments Bank Pvt. Ltd." on two forced, centred lines. No variants, properties, icon, or slot. Bound variables: `disclaimer/color` #24262b, `disclaimer/label/fontSize` 10, `lineHeight` 12, `fontWeight` 500, `fontFamily` JioType Var. Where Figma screens use it could not be found with the read tools.
- Storybook (published `index.json`): `components-disclaimer--docs`, `--default` (copy `'All financial services are provided by \n Jio Payments Bank Pvt. Ltd.'`), `--custom-copy` (`'All financial services are provided by'`). The published docs page is the old generated one. It says "Set `accessibilityLabel` when the disclaimer copy changes; it defaults to the first line" (false, see below) and "Avoid inline links; pair nearby buttons". Biscuit's board note on #71 says the page was rewritten with a handwritten marker; that rewrite is not on `main` (636f3f5) or in the published Storybook.
- Package: public `Disclaimer` props `disclaimer?: string` (default "All financial services are provided by Jio Payments Bank Pvt. Ltd."), `modes`, `style` (container), `textStyle`, `accessibilityLabel`, `accessibilityHint`, and any `View` prop (`testID` → `data-testid`). No icon, variant, `onPress`, `numberOfLines`, or slot. The copy is typed `string`; a React element is a type error. `children` type-check but are ignored. JSDoc and the CustomCopy story describe a fixed second line "Jio Payments Bank Pvt. Ltd."; the code renders no fixed line, only the `disclaimer` string.
- Modes: `Color Mode` (Light, Dark) and `context5` (Default, Fullscreen Modal, Mode 1). `FullscreenModal` renders its footer Disclaimer with `context5: 'Fullscreen Modal'`, which makes the text #EBEBED (light grey, for its dark surface) in both colour modes.

## Browser measurements (Chrome, react-native-web 0.21.2)

- Text: 10 px / 12 px line height, weight 500, JioType Var, centred, #24262B in Light. No icon, padding, gap, border, or background. Not focusable; no hover, pressed, focus, or disabled style.
- Container: `alignSelf: center`, `maxWidth: 281`. Width = min(copy, 281 px, host). In a column parent of 328 or 390 px: default copy 281 × 24 (two lines, breaking after "…Jio Payments"); "Terms apply." 64 × 12; a five-line copy 281 × 60. Height is 12 px per line; nothing truncates.
- Figma's copy with `\n` before "Jio Payments Bank Pvt. Ltd." renders 214 × 24 and keeps the bank's name on one line.
- Centring needs a column parent (VStack, or a vertical Stack without `fillWidth`). In a block `div` or a row parent it sits at the left edge. A vertical `Stack` with `fillWidth` injects `alignSelf: 'stretch'` into every child (`Stack.tsx` L119–125), which overrides Disclaimer's `alignSelf: center`: the 281 px column then sits at the left of the stack (measured in ActionFooter: column x = stack x, text centred inside 281 px). Biscuit's ActionFooter `WithStackedContent` story uses exactly that composition. The guide's In context uses a vertical Stack without `fillWidth` (the Button still fills; the Disclaimer centres).
- A long string without spaces (70 characters) does not wrap: it spills out of the 281 px box on both sides.
- `style`/`textStyle` override layout and type (developer-only; the guide does not use them).
- DOM: root `div[data-testid]` › one `div[dir="auto"]` with the text. No role on the web.
- Colour by mode (0.1.78): Light #24262B; Dark #FF9900 (orange, `mode/Grey/400` Dark placeholder, #177; #F1F1F1 at 636f3f5); `context5` Fullscreen Modal #EBEBED.

## Accessibility

- `accessibilityLabel` is destructured and never applied (`Disclaimer.tsx` L83 computes a fallback that nothing uses; L89 sets `accessibilityLabel={undefined}`). With `accessibilityLabel="CUSTOM LABEL"` the root has no `aria-label` and an empty accessible name. Only a raw `aria-label` passed through the `View` rest props names it on the web.
- `accessibilityRole="text"` and `accessibilityHint` produce nothing on the web. On the web the visible text is exposed as plain text. On iOS and Android the inner text is marked hidden (`accessibilityElementsHidden`, `importantForAccessibility="no"`) while the wrapper has no label, so a screen reader may skip the disclaimer entirely (inferred from source, not tested on a device).
- A nested `Link` renders at runtime (outside the type) at 14 px black, not the disclaimer style, and adds a tab stop inside non-interactive text. The guide treats links as a sibling below.

## Classification

- Designer-configurable: the copy (`disclaimer`), including a line break.
- System-driven: width (grows to 281 px, then wraps), centring in a column, light grey inside FullscreenModal.
- Developer-only: `style`, `textStyle`, `testID`, `aria-label` via rest props.
- Not shown: Dark mode (orange text in 0.1.78), `context5` modes, links or formatting inside the copy.

## Coin gaps

- #198 (Component Fix, To do, Component Bug, medium; Mr. Biscuit, Anagha Ghotkar): `accessibilityLabel` ignored and documented wrongly; text possibly hidden from native screen readers; `children` accepted but ignored; JSDoc/story describe a fixed second line that does not exist; long unbroken strings overflow the 281 px box; the board's Storybook rewrite is not on `main`; inside a vertical `Stack` with `fillWidth` (as in the ActionFooter `WithStackedContent` story) it sits at the left instead of centring.
- #177 (Components, Review): Dark text orange; fixed on Biscuit's `main` at 636f3f5, not yet in the mirror.
