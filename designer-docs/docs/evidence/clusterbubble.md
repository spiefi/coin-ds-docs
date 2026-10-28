# ClusterBubble source evidence

Package, Figma, and Storybook evidence for the Cluster Bubble guide (board ticket #51, Design documentation — Marcin; Storybook coverage — Biscuit, done: "handwritten ClusterBubble docs page and stories. Component code was not changed.").

ClusterBubble is one circle with a value and a label. The cluster of many bubbles is BubbleChart (its own guide and evidence, `bubblechart.md`), which renders one ClusterBubble per item.

## Checked

28 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-dbe0e02` (Biscuit's `main` at dbe0e02, 27 October); `npm run coin:status` reports the mirror up to date. Installed and upstream `ClusterBubble.tsx` and `insideTextColor.ts` are byte-identical. Rendered in the docs site's Vite setup (react-native-web 0.21.2) in headless Chrome.

## Sources

- Package: `src/components/ClusterBubble/ClusterBubble.tsx`. Exports `ClusterBubble`, `ClusterBubbleProps`, `ClusterBubbleLabelPlacement`, `ClusterBubbleLabelDirection` (`components/index.ts:268-273`). Renders no other Coin component. Reads only `dataViz/bg`, `text/fontFamily`, `text/foreground`, never the `clusterBubble/*` tokens.
- Figma: [Coin Components Library · clusterBubble](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4920-12956), page Data viz, component set with `Property 1` = Default (`4920:12955`, 159 × 159, `#5d00b5`, value 20/22 weight 800 and label 10/10 weight 400 in white, 4 px apart, centred) | Freeform (`4920:12972`, a 96 × 76 `slot` holding a 33 px dot with black value and label offset beside it). Token `clusterBubble/size` 179. Code Connect maps both to a bare `<ClusterBubble />`.
- Storybook (published `index.json`): `components-clusterbubble--default` (200 px), `--label-outside` (64 px), `--forced-placement`, `--label-directions`, `--appearances`, `--emphasis`, `--pressable`, `--docs`. Host: centred, a white Frame with 24 px padding. The meta arg `appearance: 'Primary'` is always set, so the Appearance / DataViz select does nothing there.
- Biscuit's `ClusterBubble.mdx`: "the atomic circle that composes a BubbleChart"; six collections; the import is an internal `@src/...` path.

## Contract

- `value`, `label` (ReactNode): strings are centred, bold value over regular label, each up to two lines with an ellipsis (`disableTruncation` lifts it). `null`/`undefined` hide a line; `''` renders an empty one (no visible gap, rendered). Accessible name "value, label".
- `size` (120): the diameter. Inside text scales: value round(clamp(size × 0.17, 13, 48)), label round(clamp(size × 0.085, 10, 18)); rendered 120 → 20/24 and 10/13; 159 → 27 and 14; 200 → 34 and 17; 64 inside → 13 and 10. No gap between value and label; 8 px side padding.
- Fill: `appearance` (Primary `#5d00b5`, Secondary `#b84fbd`, Tertiary `#b9beff`, Quaternary `#026b9a`, Quinary `#4cbfac`, Senary `#cea15a`, Neutral `#cccfd1` at High, rendered). Without `appearance`, the `Appearance / DataViz` mode picks it (rendered: Quinary). `Emphasis / DataViz` Medium and Low lighten it (Primary `#c9b7ff`, `#ede7ff`). `appearance` is plain text: an unknown or lower-case name falls back to Primary (computed from the resolver). `color` overrides the fill.
- Inside text is black (`#0f0d0a`) or white by the fill's brightness (white on Primary, Secondary, Quaternary; black on the rest, and on every Medium and Low); `insideTextColor` overrides.
- `labelPlacement` auto (default): inside when `size` ≥ `autoInsideMinSize` (88), else outside; `inside` and `outside` force it. Outside text is 24 px bold value and 14 px label in `text/foreground` (black; `Text Appearance` recolours it, e.g. Secondary purple), centred on the circle `labelGap` (8) away on `labelDirection` (bottom, top, left, right). It's absolutely positioned: it takes no layout space and isn't pressable (rendered: a right label runs 53 px past a 144 px host).
- `onPress`: the root becomes a `button`, 0.85 opacity while pressed; no selected, focus, or disabled look.
- `style` on the outer box; `circleStyle`, `valueStyle`, `labelStyle` override styles. No `testID`.

## Web render

Root `div[role=img][aria-label="40%, Recommended"]` (or `button`) › `div` (size × size) › `div` circle › `div` text block › value · label. Outside: › `div` (size × size) › [`div` circle, `div` label box › text block].

## Discrepancies

- Default size: Figma 159 (token 179); package 120; Storybook 200.
- Inside text: Figma fixed 20/22 weight 800 and 10/10, 4 px apart; package scales with size, weight 700, no gap. Outside: package 24/14; Figma's Freeform 20/10.
- Freeform: Figma a 33 px dot with text offset beside it inside the component's bounds, plus a slot; package centres outside text on one of four sides, outside its bounds, and has no slot.
- `Property 1` (Default | Freeform) vs `labelPlacement` (auto | inside | outside); Code Connect maps neither.
- White inside text on Secondary High is 4.29:1 (tracked on #347).

## Hosting

Bubbles sit centred on the example stages, as Storybook centres them. Outside labels need room the bubble doesn't reserve, so outside examples sit in a Coin `VStack` (`alignHorizontal="center"`) with padding on the label's side. In context uses Bubble Chart, as its guide does.

## Tickets

- #422 (Component Bug, Component Fix › To do; Mr. Biscuit; filed 28 October 2026, Penny run run_7586d367): Figma text, size, and gap; Freeform vs outside placement; outside text with no layout space or hit area; unchecked `appearance`; Storybook's Appearance / DataViz select. Related: #347 (BubbleChart, contrast), #412 (Done).

## Limits

Don't show or mention Color Mode or dark mode. Don't show `color`, `insideTextColor`, the style props, `autoInsideMinSize`, Page type, or `disableTruncation`. Don't imply the bubble has a selected look, a slot, or that outside text takes space.
