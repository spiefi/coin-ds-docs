# SegmentedTrack

> Coin agent pack 0.1.78+27 (pilot). Generated from `components/segmentedtrack.json`; the JSON is the source of truth.

- **State:** flagged (1 flag, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `3f56271` · built 2026-10-31T05:18:28Z
- **Category:** data (for discovery only, not a limit on composition) · **Tags:** stacked bar, allocation bar, share chart, portfolio mix
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=segmentedtrack) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4176-39960) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-segmentedtrack--docs)

Use a Segmented Track to show how one whole splits into a few parts, such as a portfolio’s equity, debt, and cash.

## Use when

- **recommended** Show how one whole splits into a few parts, such as a portfolio’s equity, debt, and cash.  
  _From summary: “Use a Segmented Track to show how one whole splits into a few parts, such as a portfolio’s equity, debt, and cash.”_

## Avoid when

- **discouraged** One value filling a track, such as “KYC 70% complete”: that is a progress bar, not a split.  
  _From doDont: “One value filling a track is a progress bar, not a split.”_
- **discouraged** Switching between mixes: nothing on the track is pressable. Use Range Track, which adds tabs. Use instead: `RangeTrack` (not in this pack).  
  _From inContext: “Nothing on the track is pressable; to switch between mixes, use Range Track, which adds tabs.”_
- **discouraged** Anything people press, select or focus: a Segmented Track has no hover, pressed, selected, or disabled state and can’t take focus.  
  _From states: “Segmented Track has no hover, pressed, selected, or disabled state and can’t take focus.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Track | The 24 px bar with fully rounded ends; it holds the slices with no gaps. | yes | anatomy: “Rounds the ends and holds the slices with no gaps.” |
| First slice | The first part in segments: strongest colour; its width is its share. | no | anatomy: “Strongest colour; its width is its share.” |
| Second slice | The second part: a lighter step of the same colour. | no | anatomy: “A lighter step of the same colour.” |
| Third slice | The third part: lightest; the steps repeat after three slices. | no | anatomy: “Lightest; the steps repeat after three slices.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `children` | `ReactNode` | types |

## Placement

- **recommended** The container sets the width: the track is 24 px tall with fully rounded ends and stretches to the width of its container.  
  _From sizing: “The track is 24 px tall with fully rounded ends and stretches to the width of its container.”_
- **recommended** Put a legend with the same names next to the track.  
  _From content: “put a legend with the same names next to it”_
- **recommended** A MetricLegendItem resolves its dot from the same colour token as the slices: its modes set to the Senary appearance with High emphasis give the first slice’s colour without hard-coding it.  
  _From evidence: “`MetricLegendItem` resolves its dot from the same `dataViz/bg` chain, so `modes={{ 'Appearance / DataViz': 'Senary', 'Emphasis / DataViz': 'High' }}` gives the first slice's colour without hard-coding it.”_

## Configuration

- **recommended** `segments`: Pass each part’s share in segments; the track works out the widths.  
  _From configuration: “Pass each part’s share; the track works out the widths.”_
- **recommended** `segments`: Weighted slices: widths follow the shares, such as 60, 25, and 15.  
  _From configuration: “Widths follow the shares: 60, 25, and 15.”_
- **recommended** `segments`: Equal slices: without shares every slice is the same width, as in Figma.  
  _From configuration: “Without shares every slice is the same width, as in Figma.”_
- **recommended** `segments`: More than three parts: after three slices the colours repeat, so the legend tells them apart.  
  _From configuration: “After three slices the colours repeat, so the legend tells them apart.”_
- **recommended** `segments`: Like the guide’s portfolio card, the screen works out each part’s share and passes the same list, in the same order, to the track and the legend, so their colours match.  
  _From inContext: “The screen works out each part’s share and passes the same list, in the same order, to the track and the legend, so their colours match.”_
- **recommended** `segments`: Only the data changes the track: pass real shares, and hide the track when there are none.  
  _From states: “Only the data changes it, so pass real shares and hide the track when there are none.”_
- **recommended** `Appearance / DataViz`: An appearance recolours every slice.  
  _From configuration: “An appearance recolours every slice.”_
- **recommended** `Appearance / DataViz` = `Senary`: Figma and code both default to Senary gold.  
  _From configuration: “Figma and code both default to Senary gold.”_
- **recommended** `Appearance / DataViz` = `Senary`: Senary gives three distinct golds.  
  _From doDont: “Senary gives three distinct golds.”_
- **recommended** `Appearance / DataViz` = `Primary`: The Primary appearance gives purple steps instead of gold.  
  _From configuration: “Purple steps instead of gold.”_

## Content

- **recommended** Parts of one whole, sized by their share and named in a legend.  
  _From corePrinciple: “Parts of one whole, sized by their share and named in a legend.”_
- **recommended** Use short names in sentence case and plain percentages.  
  _From content: “Use short names in sentence case and plain percentages.”_
- **recommended** Show parts of one whole: equity, debt, and cash add up to the portfolio.  
  _From doDont: “Equity, debt, and cash add up to the portfolio.”_
- **recommended** Pair the track with a legend: each name and share sits next to its colour.  
  _From doDont: “Each name and share sits next to its colour.”_
- **discouraged** Do not rely on colour alone: without a legend nobody knows which slice is which.  
  _From doDont: “Without a legend nobody knows which slice is which.”_
- **recommended** Hide the track when there’s no data, and say so in words instead, such as “No investments yet”.  
  _From doDont: “Say so in words instead.”_
- **discouraged** `segments`: Do not pass an empty list: it leaves a blank gap that says nothing about why.  
  _From doDont: “It leaves a blank gap that says nothing about why.”_

Good: “Portfolio mix: equity 60%, debt 25%, cash 15%”, “Equity”, “60%”, “No investments yet”

## States

| State | When | From |
| --- | --- | --- |
| Display only | A Segmented Track has no hover, pressed, selected, or disabled state and can’t take focus. | states: “Segmented Track has no hover, pressed, selected, or disabled state and can’t take focus.” |
| A zero share | A part worth 0 still draws a 1 px sliver; leave it out instead. | states: “A part worth 0 still draws a 1 px sliver; leave it out instead.” |
| No data | An empty list draws an empty 24 px track; hide the track instead. | states: “An empty list draws an empty 24 px track; hide the track instead.” |

## Accessibility

- **recommended** `accessibilityLabel`: The track has no text, so give it a spoken name in accessibilityLabel that lists the shares, such as “Portfolio mix: equity 60%, debt 25%, cash 15%”.  
  _From content: “The track has no text, so give it a spoken name that lists the shares, such as “Portfolio mix: equity 60%, debt 25%, cash 15%””_
- **recommended** It is display-only: on the web it is a group named by its spoken name, and a slice given its own name is read as an image inside that group.  
  _From sources: “It is display-only: on the web it is a group named by its spoken name, and a slice given its own name is read as an image inside that group.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Show parts of one whole | Use it as a progress bar | One value filling a track is a progress bar, not a split. |
| Pair it with a legend | Rely on colour alone | Without a legend nobody knows which slice is which. |
| Hide it when there’s no data | Pass an empty list | It leaves a blank gap that says nothing about why. |

## Examples

### A portfolio card, the guide's In context: the screen works out each part's share and passes the same list, in the same order, to the track and the legend, so their colours match. The track keeps its default Senary gold and is named by its spoken name; each MetricLegendItem carries Senary and its slice's emphasis (High, Medium, Low), so its dot takes its slice's colour.

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

_From inContext: “The screen works out each part’s share and passes the same list, in the same order, to the track and the legend, so their colours match.”_

### Five parts, the guide's Configuration: after three slices the colours repeat (High, Medium, Low, High, Medium), so the legend tells them apart; its items follow the same order and emphasis.

```tsx
<VStack>
  <SegmentedTrack
    segments={[
      { key: 'Large cap', value: 35 },
      { key: 'Mid cap', value: 25 },
      { key: 'Small cap', value: 15 },
      { key: 'Debt', value: 15 },
      { key: 'Cash', value: 10 },
    ]}
    accessibilityLabel="Portfolio mix: large cap 35%, mid cap 25%, small cap 15%, debt 15%, cash 10%"
  />
  <VStack>
    <MetricLegendItem label="Large cap" value="35%" modes={{ 'Appearance / DataViz': 'Senary', 'Emphasis / DataViz': 'High' }} />
    <MetricLegendItem label="Mid cap" value="25%" modes={{ 'Appearance / DataViz': 'Senary', 'Emphasis / DataViz': 'Medium' }} />
    <MetricLegendItem label="Small cap" value="15%" modes={{ 'Appearance / DataViz': 'Senary', 'Emphasis / DataViz': 'Low' }} />
    <MetricLegendItem label="Debt" value="15%" modes={{ 'Appearance / DataViz': 'Senary', 'Emphasis / DataViz': 'High' }} />
    <MetricLegendItem label="Cash" value="10%" modes={{ 'Appearance / DataViz': 'Senary', 'Emphasis / DataViz': 'Medium' }} />
  </VStack>
</VStack>
```

_From configuration: “After three slices the colours repeat, so the legend tells them apart.”_

### No data, the guide's Do: when there are no parts, the screen hides the track and says so in words instead of passing an empty list.

```tsx
<Text text="No investments yet" />
```

_From doDont: “Say so in words instead.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `segments` | `SegmentedTrackSegmentData[]` |  |  |  | evidence (2026-10-08) | Each part's value sets its width as a share of the total (flex: value; a missing value counts as 1; 0 keeps a 1 px sliver). An empty list draws an empty, transparent 24 px track; leaving segments out draws three equal default slices. Declared: Data-driven segment list. Used when no `children` slot is provided. Defaults to three equal segments which receive per-index Emphasis defaults (`High`, `Medium`, `Low`). |
| `children` | `React.ReactNode` |  |  |  | types | Slot for fully custom segment children. Each top-level child is treated as one segment. The parent injects per-index Emphasis defaults and the shared `modes`, while child-level `modes` overrides win. |
| `modes` | `Modes` |  |  |  | types | Design token modes for theming (e.g. `{ 'Color Mode': 'Light' }`). |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Override the container styles. |
| `segmentStyle` | `StyleProp<ViewStyle>` |  |  |  | types | Style applied to every segment (data-driven mode only). |
| `accessibilityLabel` | `string` |  |  |  | evidence (2026-10-08) | The track's spoken name. On the web the track is a group (role group) named by it. Declared: Accessibility label announced for the whole distribution row. |
| `testID` | `string` |  |  |  | types | Test identifier. |
| `SegmentedTrack.Segment` | `component` |  |  |  | types | A static sub-component of SegmentedTrack. Its own props: value, color, modes, style, accessibilityLabel. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Appearance / DataViz` | `mode collection` | Primary, Secondary, Tertiary, Quaternary, Quinary, Senary, Neutral | `"Senary"` |  | evidence (2026-10-13) | A track with no modes has Senary gold slices (206,161,90 / 232,188,122 / 253,232,201 at High, Medium, Low), as in Figma, not the collection's default Primary (purple). An appearance recolours every slice. Declared: A token collection SegmentedTrack reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. Package docs: Each segment resolves its color through the `dataViz/bg` token, which cascades through `Emphasis / DataViz` and `Appearance / DataViz`. Pass `modes` per segment (or override `Appearance / DataViz` at the parent level via `modes`) to retheme the row without touching colors directly. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection SegmentedTrack reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Emphasis / DataViz` | `mode collection` | High, Medium, Low | `"High"` |  | evidence (2026-10-05) | Set on each slice by its position: High, Medium, Low, then repeating, as checked in Light (the guide shows Light only). An Emphasis / DataViz on the track itself is overwritten; a segment's own modes win. Declared: A token collection SegmentedTrack reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. Package docs: Each segment resolves its color through the `dataViz/bg` token, which cascades through `Emphasis / DataViz` and `Appearance / DataViz`. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types | Slot for fully custom segment children. Each top-level child is treated as one segment. The parent injects per-index Emphasis defaults and the shared `modes`, while child-level `modes` overrides win. |

### Events

_No events._

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- The published Storybook predates 0.1.78 (the stale Storybook reported in #196). _(evidence, 2026-10-13)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `(whole entry)` · human: The guide (checked 13 October on 0.1.78-c1fa197) has two lines the installed 0.1.78-dbe0e02 contradicts: the Don’t “All three slices turn the same grey and the split disappears.” (Neutral’s dataViz backgrounds have been Grey/2000, 2200 and 2400 since 636f3f5: three different greys), and the “Primary appearance” example and playground option pass only Color Mode, so they show the Senary gold default, not the “Purple steps instead of gold.” the caption gives. The entry leaves the Neutral caption out and keeps the purple caption for Appearance / DataViz Primary. Guide fix #529. Added by Claude Code in the overnight run agentpack-batch8, for Marcin to confirm.
