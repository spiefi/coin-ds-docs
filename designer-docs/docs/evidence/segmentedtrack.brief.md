# Segmented Track brief

slug: segmentedtrack · label: Segmented Track · public API: SegmentedTrack, MetricLegendItem (+ Card, VStack, Text for composition)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4176-39960 · storybook: docsUrl('segmentedtrack') · stories: Default=components-segmentedtrack--default, Proportional segments=components-segmentedtrack--proportional-segments, Senary=components-segmentedtrack--themed-senary, Many segments=components-segmentedtrack--many-segments, In Range Track=components-rangetrack--default
checked: 8 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-636f3f5, Biscuit's main 636f3f5)
icon: a pill split into three parts — `<rect x="1.5" y="6" width="15" height="6" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M9 6v6M13 6v6" stroke="currentColor" strokeWidth="1.5" />`
keywords: stacked bar, allocation bar, share chart, portfolio mix

Setup: `const SENARY = { 'Color Mode': 'Light', 'Appearance / DataViz': 'Senary' } as Modes` (the Figma look); `const PRIMARY = { 'Color Mode': 'Light' } as Modes` (the code default). Tracks use SENARY unless an example says otherwise.
MIX3 = Equity 60, Debt 25, Cash 15. MIX5 = Large cap 35, Mid cap 25, Small cap 15, Debt 15, Cash 10. "Track(mix, modes)" = `<SegmentedTrack modes={modes} segments={mix.map(p => ({ key: p.name, value: p.share }))} accessibilityLabel={'Portfolio mix: ' + 'equity 60%, debt 25%, cash 15%'} />` (the spoken name lists every part in lower case with its %). "Legend(mix, modes)" = `<VStack modes={modes} style={{ width: '100%' }}>` of `<MetricLegendItem key modes={{ ...modes, 'Emphasis / DataViz': ['High', 'Medium', 'Low'][i % 3] } as Modes} label={p.name} value={`${p.share}%`} />`; the dot colours then match the slices with no hard-coded colours. Never pass `color`.
"Panel" = `<div className="coin-new-host wide"><VStack modes={…} style={{ width: '100%' }}>…</VStack></div>`.
Targets: `[role="group"]` is the track; slice n is `[role="group"] > div:nth-child(n)`.

## Overview
summary: Use a Segmented Track to show how one whole splits into a few parts, such as a portfolio’s equity, debt, and cash.
principle: Parts of one whole, sized by their share and named in a legend.
playground: `.preview-stage` with a Panel holding Track(mix, modes) and Legend(mix, modes). Controls: Segment "Parts" ['3 parts', '5 parts'] → MIX3 or MIX5; Segment "Appearance" ['Senary', 'Primary', 'Quaternary'] → `'Appearance / DataViz'` (Primary = PRIMARY; Quaternary = `{ 'Color Mode': 'Light', 'Appearance / DataViz': 'Quaternary' }`), applied to the track and the legend. Readout title "Spoken name", value = the track’s `accessibilityLabel`; note: "Figma and code both default to Senary gold." Stage label: "Live Coin Segmented Track".

## Anatomy
header: Anatomy · title: A pill split by share · description: The track is a 24 px pill. Each slice’s width is its share of the total, and the colours step from strong to light.
specimen: Track(MIX3, SENARY); specimenWidth 300
parts:
1. Track — Rounds the ends and holds the slices with no gaps. — target: `[role="group"]` — side: left
2. First slice — Strongest colour; its width is its share. — target: `[role="group"] > div:nth-child(1)` — side: top
3. Second slice — A lighter step of the same colour. — target: `[role="group"] > div:nth-child(2)` — side: bottom
4. Third slice — Lightest; the steps repeat after three slices. — target: `[role="group"] > div:nth-child(3)` — side: top

## Configuration
header: Configuration · title: Shares and appearance · description: Pass each part’s share; the track works out the widths. An appearance recolours every slice. Figma and code both default to Senary gold.
Grid `coin-new-example-grid`, each a Panel:
- Equal slices — `segments={[{}, {}, {}]}`, SENARY — lesson: Without shares every slice is the same width, as in Figma.
- Weighted slices — Track(MIX3, SENARY) — lesson: Widths follow the shares: 60, 25, and 15.
- Five parts — Track(MIX5, SENARY) + Legend(MIX5, SENARY) — lesson: After three slices the colours repeat, so the legend tells them apart.
- Primary appearance — Track(MIX3, PRIMARY) — lesson: Purple steps instead of gold.

## States
header: States · title: Display only · description: Segmented Track has no hover, pressed, selected, or disabled state and can’t take focus. Only the data changes it, so pass real shares and hide the track when there are none.
Grid `coin-new-example-grid`, each a Panel with SENARY:
- A zero share — `segments={[{ value: 0 }, { value: 60 }, { value: 40 }]}` — lesson: A part worth 0 still draws a 1 px sliver; leave it out instead.
- No data — `segments={[]}` — lesson: An empty list draws an empty 24 px track; hide the track instead.

## Sizing
header: Sizing · title: 24 px tall, full width · description: The track is 24 px tall with fully rounded ends and stretches to the width of its container. Slices share that width by their shares, with no gaps.
Measured diagram: `<Anatomy legend={false} specimenWidth={300} marks={[{ kind: 'size', target: '[role="group"]', side: 'bottom', label: 'both' }, { kind: 'size', target: '[role="group"] > div:nth-child(1)', side: 'top', label: 'both' }]}>` Track(MIX3, SENARY) `</Anatomy>`. Expected: 300 × 24 and 180 × 24.

## Content
header: Content · title: Name the mix and every part · description: The track has no text, so give it a spoken name that lists the shares, such as “Portfolio mix: equity 60%, debt 25%, cash 15%”, and put a legend with the same names next to it. Use short names in sentence case and plain percentages.
One ExampleCard "Track with a legend": a Panel with Track(MIX3, SENARY) and Legend(MIX3, SENARY).

## In context
header: In context · title: A portfolio card · description: The screen works out each part’s share and passes the same list, in the same order, to the track and the legend, so their colours match. Nothing on the track is pressable; to switch between mixes, use Range Track, which adds tabs.
Composition in `.coin-new-context`: `<Card modes={SENARY}>` › `<VStack modes={SENARY} style={{ width: '100%' }}>` › `<Text modes={SENARY}>Portfolio mix</Text>`, `<Text modes={SENARY}>₹4,20,000 invested</Text>`, Track(MIX3, SENARY), Legend(MIX3, SENARY).

## Do & Don'ts
header: Do & Don’ts · title: Show one whole, clearly named · description: Each pair shows a track people can read versus one that misleads them.
Every preview is a Panel with SENARY unless stated.
- Do Show parts of one whole: Equity, debt, and cash add up to the portfolio. — Track(MIX3) + Legend(MIX3) | Don't Use it as a progress bar: One value filling a track is a progress bar, not a split. — `segments={[{ value: 70 }, { value: 30 }]}`, `accessibilityLabel="KYC 70% complete"`, with `<Text modes={SENARY}>KYC 70% complete</Text>` above
- Do Pair it with a legend: Each name and share sits next to its colour. — Track(MIX3) + Legend(MIX3) | Don't Rely on colour alone: Without a legend nobody knows which slice is which. — Track(MIX3) only
- Do Use a data appearance: Senary gives three distinct golds. — Track(MIX3, SENARY) | Don't Pick Neutral: All three slices turn the same grey and the split disappears. — Track(MIX3, `{ 'Color Mode': 'Light', 'Appearance / DataViz': 'Neutral' }`)
- Do Hide it when there’s no data: Say so in words instead. — `<Text modes={SENARY}>No investments yet</Text>` | Don't Pass an empty list: It leaves a blank gap that says nothing about why. — `segments={[]}`

## Sources
header: Sources · title: Use the public Segmented Track contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (5 October build) from the team’s private package repository. Figma’s Segmented Track is one 268 × 24 component with three equal gold slices, the Senary appearance, which code now uses by default too. It is display-only: on the web it is a group named by its spoken name, and names given to single slices are not read out. Range Track builds on it, adding tabs and a legend. The published Storybook predates 0.1.78.

## Limits
Do not show Dark mode (#197), Neutral as a choice (only in the Don’t), hex `color` overrides, `segmentStyle` or `style`, the `children` slot, or anything pressable. Do not imply per-slice names are announced (#196).
