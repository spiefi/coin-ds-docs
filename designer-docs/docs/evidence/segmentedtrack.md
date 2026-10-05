# Segmented Track source evidence

Package, Figma, Storybook, and browser evidence for the Segmented Track guide (board ticket #61, Design documentation — Marcin; Storybook coverage — Biscuit, done).

## Check

Checked 5 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-3795b4c` (Biscuit's `main` at 3795b4c). `SegmentedTrack.tsx` is identical to upstream.

- Figma: [Coin Components Library · Segmented Track](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4176-39960), node `4176:39960`. One component (not a set), 268 × 24, a slot of three equal TrackSegment frames (89.33 px each) in gold: `#cea15a`, `#e8bc7a`, `#fde8c9` — the package's `Appearance / DataViz: Senary` at High, Medium, Low emphasis. Fully rounded ends, no gaps, labels, or background.
- Storybook (published `index.json`, built before the 0.1.78 release commit): `components-segmentedtrack--docs`; stories `--default`, `--proportional-segments`, `--themed-senary`, `--many-segments`, `--slot-children`, `--custom-colors`, `--all-appearances` (the pre-0.1.78 set). Upstream's `--segments`, `--emphasis`, `--empty` are not published. The handwritten upstream `SegmentedTrack.mdx` (not deployed) calls it a display-only share-of chart for sibling categories that add up to one whole, recommends a MetricLegendItem legend, and points to SegmentedControl (filter in place), RangeTrack (tabs plus legend), CoverageBarComparison, and LinearProgress (one value filling a track) for other jobs.
- Package: public `SegmentedTrack` accepts `segments` (`{ key, value, color, modes, style, accessibilityLabel }[]`), `children` (`SegmentedTrack.Segment` elements; they win over `segments`), `modes`, `style`, `segmentStyle`, `accessibilityLabel`. No `testID`, ref, or rest props. A segment's width is `flex: value` (missing value = 1; 0 keeps a 1 px sliver). An empty or missing `segments` paints three equal default slices. Slice colour is `dataViz/bg` with `Emphasis / DataViz` cycling High, Medium, Low by index (the track's own Emphasis is overwritten; a segment's `modes` can change it). `color` bypasses tokens. The track reads provider modes (`useTokens`) merged under its `modes`. RangeTrack is the only component that renders it (tabs above, MetricLegendItem legend below).
- Tokens: `segmentedTrack/height` 24 (radius = half the height), `dataViz/bg`. Default appearance is Primary: `rgb(93,0,181)`, `rgb(201,183,255)`, `rgb(237,231,255)`. Senary: `rgb(206,161,90)`, `rgb(232,188,122)`, `rgb(253,232,201)`. Quaternary: `rgb(2,107,154)`, `rgb(136,205,250)`, `rgb(216,239,254)`. Neutral: `rgb(245,245,245)` for all three.
- `MetricLegendItem` resolves its dot from the same `dataViz/bg` chain, so `modes={{ 'Appearance / DataViz': 'Senary', 'Emphasis / DataViz': 'High' }}` gives the first slice's colour without hard-coding it.

## Browser measurements (Chrome, react-native-web 0.21.2)

- In a 328 px host: 328 × 24, radius 12, overflow hidden, transparent background. Weights 60/25/15 give 196.8 / 82 / 49.2 px; no weights give three 109.3 px slices; six equal slices repeat High, Medium, Low.
- DOM: one `div[role="img"]` with `aria-label` from `accessibilityLabel` and plain child `div`s; per-segment labels land on those role-less children, which assistive tech treats as part of the image. No focus, keyboard, or pointer handling.
- Legend: three MetricLegendItems with Senary High/Medium/Low modes draw 8 px dots in the slice colours, 16 px rows, label left and value right.

## Coin gaps

- #196 (Component Fix, To do, Component Bug, low; Mr. Biscuit, Anagha Ghotkar): default appearance purple vs Figma gold; slice labels inside `role="img"` likely not announced; empty data paints three slices; no `testID`; stale published Storybook.
- #197 (Components, To do; Marcin): Neutral gives three identical slices; Dark mode reverses the emphasis order. The guide shows Light only.
