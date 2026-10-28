# ComparisonBar source evidence

Package, Figma, and Storybook evidence for the Comparison Bar guide (board ticket #52, Design documentation — Marcin; Storybook coverage — Biscuit, done: "handwritten ComparisonBar docs page and stories. Component code was not changed.").

ComparisonBar is not a value chart: it is a floating card of image slots and a Compare button, for collecting items to compare. Value comparisons are Allocation Comparison Chart, Plan Comparison Card, and others.

## Checked

28 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-dbe0e02` (Biscuit's `main` at dbe0e02, 27 October); `npm run coin:status` reports the mirror up to date. Installed and upstream `ComparisonBar.tsx` are byte-identical. Rendered in the docs site's Vite setup (react-native-web 0.21.2) in headless Chrome.

## Sources

- Package: `src/components/ComparisonBar/ComparisonBar.tsx` (`React.memo`). Exports `ComparisonBar`, `ComparisonBarProps`, `ComparisonBarItem` (`components/index.ts:119-122`). Renders private 45 × 44 slots (an `Image` and close `IconCapsule`, or an add `IconCapsule`) and a Coin `Button`. No `testID` or rest props.
- Figma: [Coin Components Library · Comparison Bar](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=5350-360), node `5350:360`, one component, 344 × 64: four `additem` instances (the first in its preview state: a 33 × 20 picture and an 18 px close capsule; three empty with a 29 px `ic_card` capsule) 12 px apart, then a 96 × 32 Button, 14/22, `#ceb2e9` with a white label (the values of Button Size S, Secondary, Disabled). Padding 12 left, 8 right, 10 top and bottom. Code Connect shows a Button child.
- Storybook (published `index.json`): `components-comparisonbar--default` (one filled of four; tapping fills or clears), `--all-empty`, `--all-filled`, `--docs`. Host: a View with 24 px padding, `alignItems: flex-start`. Pictures are remote Unsplash URLs.
- Biscuit's `ComparisonBar.mdx`: "a floating card that lets a user assemble a set of items to compare, then trigger the comparison with a single action button"; a token-dimmed button "is still tappable".

## Contract

- `items` (required): one slot per item, in order. `imageSource` set = filled (picture and close mark); `null`, `undefined` or `''` = empty (+). `id` comes back in the callbacks; `accessibilityLabel` names the slot (default "Add item to comparison" / "Remove item from comparison").
- `onItemPress(id, index)`: an empty slot was pressed. `onItemRemove(id, index)`: a filled slot was pressed anywhere (the close mark isn't separate). The bar keeps no state: the screen updates `items`.
- Compare: `compareLabel` ('Compare'), `onCompare`. Off (50 % opacity, not pressable) while no slot has an image (`disableCompareWhenEmpty`, default true); one image turns it on. `compareDisabled` overrides both ways.
- Card: hugs its content (`alignSelf: flex-start`, a row, no wrap, no scroll). Padding 10 / 12, gap 12, radius 12, white with a 1 px `#f5f5f5` border. Slots `#ebebed`, radius 8, padding 8 / 6. None of these change with any mode.
- Rendered sizes: four slots and the default Button (M, 115 × 42, 16/24): 369 × 66. With `'Button / Size': 'S'` (98 × 32, 14/22): 352 × 66. Two slots: 255. Five slots: 426. "Compare 4 funds": 434. Filled picture 33 × 28; add and close capsules 18 px (XS) with 12 px glyphs.
- Modes reaching it: `Button / Size` (button size); `AppearanceBrand`, `Emphasis`, `Semantic Intent` (button colour: Secondary purple, Medium pale gold, System green); `Radius` (picture corners: S 8, M 16, L 32, None 0); `Button / State` Disabled (pale tokens, still pressable). The + capsule also takes the bar's brand modes: on Secondary, Neutral, Tertiary, or System it turns white (about 1.19:1 on the slot), and on Medium faint gold (rendered).

## Web render

Root `div` card › `button[aria-label="Remove item from comparison"]` (filled: `div` picture · `div` close capsule) · `button[aria-label="Add item to comparison"]` × n · `button[aria-label="Compare"]`.

## Discrepancies

- Compare button: Figma 96 × 32 pale purple (S, Secondary, Disabled values); package M gold, dimmed by opacity when off.
- Empty-slot +: Figma 29 px with an 18 px glyph (S); package 18 px (XS), though its own comment says S.
- Picture: Figma 33 × 20; package 33 × 28. Right padding: Figma 8; package 12.
- Figma's Code Connect passes a Button child; the package takes `items` and `compareLabel`.
- MDX mentions "the `disabled`-style props"; the props are `compareDisabled` and `disableCompareWhenEmpty`.

## Hosting

Bars sit in the kit's `FitWidth` (they have a fixed width) on the example stages, left-aligned as in Storybook's padded host. Pictures are the docs' own `gold-coin.png` and `jio-gold-logo.png`; both are round on transparent corners, so the Radius examples use the square `bank-hero.png` photo, where corner rounding shows. A filled slot's picture gets the same accessible name as its slot button (rendered: two elements named "Remove 1 g gold coin").

## Tickets

- #421 (Component Bug, Component Fix › To do; Mr. Biscuit; filed 28 October 2026, Penny run run_7586d367): + capsule vanishing under brand modes, sizes and button versus Figma, no slot press feedback, no overflow handling.

## Limits

Don't show or mention Color Mode or dark mode. Don't show `style`, `Button / State`, or brand colour modes except as the Don't. Don't imply the bar stores items, compares anything, has a separate close button, scrolls, or wraps.
