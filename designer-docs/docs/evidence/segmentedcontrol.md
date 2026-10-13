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

- #204 (Component Fix, Done, published 13 October 2026 with c1fa197): no `aria-selected`; Space does not select and no arrow keys; tablist unnamed and no `testID`; `onSelectionChange` fires when the selected segment is pressed again; uncontrolled selection read only at mount; long labels wrap to uneven heights; unused Active shadow tokens; no `useTokens()`; published Storybook stale. #194 (Tabs/TabItem) already notes the shared `aria-selected` gap; TabItem got its fix in 636f3f5, SegmentedControl did not.
- #279 (Component Fix, To do, Component Bug, low; Mr. Biscuit), filed 13 October 2026: in a row parent the track is too narrow for its own labels, which end in an ellipsis.
- #208 (Components, To do; Marcin Śpiewak), token problem shared with Nudge and Note Input: no Dark values for `segment/*` and `segmentedControl/*`.

## c1fa197 publish (13 October 2026)

Checked 13 October 2026 against `jfs-components` 0.1.78 built from Biscuit's `main` at c1fa197 (mirror tag `v0.1.78-c1fa197`, installed since the 13 October release) in headless Chrome with react-native-web 0.21.2, on the guide pages at 1280 and 390 px. The newer mirror build `v0.1.78-5990169` changes only `Tooltip.tsx` (#277, not approved), so it was not installed.

- #204 fixed (verified 12 October, published here). The tab list is named by `accessibilityLabel` and takes `testID`. The selected segment has `aria-selected="true"` and `tabindex="0"`; the others `aria-selected="false"` and `tabindex="-1"`. Arrow keys, Home, and End move focus and select (arrows wrap); Space and Enter select the focused segment once. Pressing the selected segment again doesn't call `onSelectionChange`. The control reads `JFSThemeProvider` modes. Still open, outside the ticket's Expected list: `defaultSelectedKey` is read only at mount, and the `segment/shadow/*` tokens are neither drawn nor removed.
- Labels no longer wrap: each is one line (`white-space: nowrap`, `text-overflow: ellipsis`) inside 16 px side padding, and a label that doesn't fit ends in an ellipsis. Segments stay equal and 43 px tall. Natural label widths: Daily 38, Weekly 56, Monthly 63, 1M 22, 3M/6M 25, All 26, Mon 34 px. So Daily / Weekly / Monthly need a track of about 301 px (3 × (63 + 32) + 2 × 8), and 1M…All about 322 px.
- Measured: a 328 px track (360 px phone) gives 104 px segments and every PERIOD label in full; five RANGE segments are 59.2 px with 27.2 px for the label, so they fit. In a 214 px narrow column, segments are 66 px with 34 px for the label: Daily, Weekly, and Monthly all end in an ellipsis. PLANS at 104 px: “One-ti…”, “Monthl…”, “Step-u…”. Seven days at 40 px leave 8 px per label, so each day shows a clipped sliver of a letter; at 32 px nothing shows.
- Regression #279 (Component Fix, To do, filed in this run): in a row parent the track hugs 269 px (the sum of its labels), splits it equally, and cuts “Weekly” and “Monthly”; before c1fa197 the same width let them run into the padding but stay readable.
- Docs previews: the wide example host is 334 px at 1280 but 274 px (cards) and 242 px (Do & Don’ts) at 390, where Weekly and Monthly would end in an ellipsis. The guide's wide Host now renders the control at 328 px inside `FitWidth` (scaled down only in narrower previews), so every example shows the labels as on a 360 px phone. The narrow Host is unchanged.
- Guide: the Tap to choose card, the Sizing description and narrow-column card, the Content description, the “Keep labels short”, “Write long labels”, and “Squeeze in seven” captions, and the Sources note describe the ellipsis, the width labels need, the row limit (#279), and the announced, keyboard-selectable tab list. The brief's Host, copy, and Limits match.
