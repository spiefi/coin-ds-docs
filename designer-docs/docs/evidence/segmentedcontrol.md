# Segmented Control source evidence

Package, Figma, Storybook, and browser evidence for the Segmented Control guide (board ticket #156, Design documentation — Marcin; Storybook coverage — Biscuit, done).

## Check

Checked 7 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-3795b4c` (Biscuit's `main` at 3795b4c). Biscuit's `main` is now at 636f3f5 (5 October); `SegmentedControl.tsx`, its stories, and its mdx are byte-identical there, and none of that commit's token changes touch `segment/*` or `segmentedControl/*`.

- Figma: [Coin Components Library · Segmented Control](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2994-2578), node `2994:2578`. One component, 393 × 43, with a slot "Slot" holding three `SegmentedControl/Segment` instances (125.67 × 43 each, 8 px apart, no track padding). Labels "Daily", "Weekly", "Monthly"; the third is Active. Bound variables: `segmentedControl/background` #f6f3ff, `segmentedControl/gap` 8, `segment/padding` 16 × 12, `segment/radius` 20, `segment/fontSize` 16, `lineHeight` 19, `fontWeight` 500, JioType Var; Idle `segment/background` transparent and `segment/foreground` #0c0d10; Active #5d00b5 and #ffffff. Idle vs Active is the `SegmentedControl/Segment` variable collection. Segment's main component lives in another library file; its variant properties could not be read with the read tools.
- Storybook (published `index.json`, generated 15 September): `components-segmentedcontrol--docs`, `--default` (Daily/Weekly/Monthly, `defaultSelectedKey: 'monthly'`), `--two-segments` (Buy/Sell), `--interactive` (controlled, "Selected: weekly"). The upstream source adds `--five-segments` (1M/3M/6M/1Y/All), `--controlled`, and `--uncontrolled`, not deployed. The source mdx: pick one option in a short exclusive set; two to five short labels; `flex: 1`, not scrollable; no icons, disabled, or loading; prefer Tabs for peer views, SegmentedTrack for a share-of chart, ChipSelect or FilterBar for optional filters. It also claims selection is announced, Space selects, and Light/Dark works (all false on the web, below).
- Package: `SegmentedControl` (default export) with `items: { key: React.Key; label: string }[]`, `selectedKey` (controlled), `defaultSelectedKey` (uncontrolled; falls back to the first item, read once at mount), `onSelectionChange(key)`, `modes`, `style` (track). No `testID`, `accessibilityLabel`, `disabled`, icon, or per-item props. `onSelectionChange` fires on every press, including the already-selected segment (`SegmentedControl.tsx:132-140`). Selection is strict equality; a key that matches no item leaves every segment unselected. The component sets `SegmentedControl/Segment` Idle/Active per segment, overriding caller modes. It never calls `useTokens()`. The `segment/shadow/*` tokens exist (Active: black, blur 4, y 1) but are not read.

## Browser measurements (Chrome, react-native-web 0.21.2, Light)

- Track: fills a column parent (328 px in a 328 px column), 43 px tall, #f6f3ff, radius 20, no padding, 8 px gap, `overflow: hidden`. In a row parent it shrinks to its labels (269 px for Daily/Weekly/Monthly).
- Segments share the width equally whatever the label: 2 → 160 px, 3 → 104 px, 5 → 59.2 px each (328 px track); 3 in a 240 px track → 74.7 px. Each 43 px tall: 12 px padding above and below a 19 px line, 16 px at the sides, radius 20.
- Selected: #5d00b5 fill, white 16/19 medium label. Unselected: transparent, #0c0d10 label. No shadow is drawn.
- Pressed: the segment dims to opacity 0.8 until release. No hover, focus, or disabled styling; keyboard focus shows the browser's default ring.
- Long labels wrap; nothing truncates. "One-time payment / Monthly SIP / Step-up SIP" at 104 px each: the first wraps to three lines (81 px), the others to two (62 px), so segments differ in height and the track grows to 81 px.
- `selectedKey="yearly"` (not an item): no segment is selected.
- `Color Mode: Dark` renders exactly as Light (#f6f3ff track, #5d00b5 selection): every `segment/*` and `segmentedControl/*` token is a literal with no Color Mode alias.

## Accessibility (web)

- DOM: track `div role="tablist"` (no name, no `data-testid`) › segments `div role="tab" tabindex="0" aria-label="<label>"`. `accessibilityState.selected` is not mapped by RNW 0.21.2, so no segment has `aria-selected`: only colour shows the selection.
- Each segment is its own Tab stop. Enter selects the focused segment; Space does nothing (RNW only treats Space as a press on `role=button`); arrow keys do nothing. The tablist has no tabpanel or `aria-controls`.

## Classification

- Designer-configurable: the options (`items`: count and labels), which option starts selected.
- System-driven: equal widths, 43 px height, selection colour, pressed dimming, wrapping of long labels, fill-width in a column.
- Developer-only: `selectedKey`/`defaultSelectedKey` wiring, `onSelectionChange`, `style`.
- Not shown: Dark mode (identical to Light), icons, disabled segments, `style`.

## Coin gaps

- #204 (Component Fix, To do, Component Bug; Mr. Biscuit, Anagha Ghotkar): no `aria-selected`; Space does not select and no arrow keys; tablist unnamed and no `testID`; `onSelectionChange` fires when the selected segment is pressed again; uncontrolled selection read only at mount; long labels wrap to uneven heights; unused Active shadow tokens; no `useTokens()`; published Storybook stale. #194 (Tabs/TabItem) already notes the shared `aria-selected` gap; TabItem got its fix in 636f3f5, SegmentedControl did not.
- #208 (Components, To do; Marcin Śpiewak), token problem shared with Nudge and Note Input: no Dark values for `segment/*` and `segmentedControl/*`.
