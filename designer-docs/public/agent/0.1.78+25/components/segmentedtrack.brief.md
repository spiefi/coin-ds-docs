# SegmentedTrack (brief)

> Coin agent pack 0.1.78+25 · flagged · full entry: `components/segmentedtrack.md` (sources, all facts, flags)

Use a Segmented Track to show how one whole splits into a few parts, such as a portfolio’s equity, debt, and cash.

**Use when**
- Show how one whole splits into a few parts, such as a portfolio’s equity, debt, and cash.

**Avoid when**
- Avoid: One value filling a track, such as “KYC 70% complete”: that is a progress bar, not a split.
- Avoid: Switching between mixes: nothing on the track is pressable. Use Range Track, which adds tabs. Use instead: RangeTrack.
- Avoid: Anything people press, select or focus: a Segmented Track has no hover, pressed, selected, or disabled state and can’t take focus.

**Placement**
- The container sets the width: the track is 24 px tall with fully rounded ends and stretches to the width of its container.
- Put a legend with the same names next to the track.
- A MetricLegendItem resolves its dot from the same colour token as the slices: its modes set to the Senary appearance with High emphasis give the first slice’s colour without hard-coding it.

**Key rules**
- `segments`: Pass each part’s share in segments; the track works out the widths.
- `segments`: Weighted slices: widths follow the shares, such as 60, 25, and 15.
- `segments`: Equal slices: without shares every slice is the same width, as in Figma.
- `segments`: More than three parts: after three slices the colours repeat, so the legend tells them apart.
- `segments`: Like the guide’s portfolio card, the screen works out each part’s share and passes the same list, in the same order, to the track and the legend, so their colours match.
- `segments`: Only the data changes the track: pass real shares, and hide the track when there are none.
- `Appearance / DataViz`: An appearance recolours every slice.
- `Appearance / DataViz` = `Senary`: Figma and code both default to Senary gold.

**Example:** A portfolio card, the guide's In context: the screen works out each part's share and passes the same list, in the same order, to the track and the legend, so their colours match. The track keeps its default Senary gold and is named by its spoken name; each MetricLegendItem carries Senary and its slice's emphasis (High, Medium, Low), so its dot takes its slice's colour.

```tsx
<Card>
  <VStack>
    <Text text="Portfolio mix" />
    <Text text="₹4,20,000 invested" />
    <SegmentedTrack
      segments={[
        { key: 'Equity', value: 60 },
        { key: 'Debt', value: 25 },
        { key: 'Cash', value: 15 },
      ]}
      accessibilityLabel="Portfolio mix: equity 60%, debt 25%, cash 15%"
    />
    <VStack>
      <MetricLegendItem label="Equity" value="60%" modes={{ 'Appearance / DataViz': 'Senary', 'Emphasis / DataViz': 'High' }} />
      <MetricLegendItem label="Debt" value="25%" modes={{ 'Appearance / DataViz': 'Senary', 'Emphasis / DataViz': 'Medium' }} />
      <MetricLegendItem label="Cash" value="15%" modes={{ 'Appearance / DataViz': 'Senary', 'Emphasis / DataViz': 'Low' }} />
    </VStack>
  </VStack>
</Card>
```

**Props:** `segments`, `children`, `modes`, `style`, `segmentStyle`, `accessibilityLabel`, `testID`, `SegmentedTrack.Segment`. (* required)

**Modes it reads:** Appearance / DataViz, Color Mode, Emphasis / DataViz.

**Gaps (report, do not work around)**
- The published Storybook predates 0.1.78 (the stale Storybook reported in #196).

Full entry: `components/segmentedtrack.md`. Links: `components/segmentedtrack.links.md`.
