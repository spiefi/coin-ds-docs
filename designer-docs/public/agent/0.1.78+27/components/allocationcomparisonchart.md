# AllocationComparisonChart

> Coin agent pack 0.1.78+27 (pilot). Generated from `components/allocationcomparisonchart.json`; the JSON is the source of truth.

- **State:** flagged (1 flag, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `31f1c5e` · built 2026-10-31T05:18:28Z
- **Category:** data (for discovery only, not a limit on composition) · **Tags:** bar chart, graph, portfolio
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=allocationcomparisonchart) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4976-1080) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-allocationcomparisonchart--docs)

Compare category amounts with a supplied reference.

## Use when

- **recommended** Compare category amounts with a supplied reference.  
  _From summary: “Compare category amounts with a supplied reference.”_
- **recommended** Use one shared scale so comparison stays honest.  
  _From corePrinciple: “Use one shared scale so comparison stays honest.”_
- **recommended** Let people compare categories directly on one shared scale.  
  _From anatomy: “The shared scale lets people compare categories directly.”_

## Avoid when

- **discouraged** Anything people press or select: the chart has no selected or pressed state.  
  _From states: “The chart has no selected or pressed state.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Legend | Current and Recommended explain the two readings when a baseline exists. | no | anatomy: “Current and Recommended explain the two readings when a baseline exists.” |
| Current pillar | The main bar; its height encodes each supplied value. | yes | anatomy: “The main bar height encodes each supplied value.” |
| Baseline overlay | A supplied recommendation overlays the same category from the bottom. | no | anatomy: “A supplied recommendation overlays the same category from the bottom.” |
| Marker | A dashed callout on the first reference, unless another marker is needed. | no | anatomy: “Keep the dashed callout focused on the first reference unless another marker is needed.” |
| Category label | A short, distinct name below each bar. | yes | anatomy: “Use short distinct names that stay readable below the bars.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `valueLegendLabel` | `ReactNode` | types |
| `baselineLegendLabel` | `ReactNode` | types |

## Placement

- **recommended** Place the chart beside a summary that explains what the categories mean.  
  _From inContext: “Use the chart beside a summary that explains what the categories mean.”_
- **recommended** A Card can give the portfolio label and the explanation while the chart owns the category comparison.  
  _From inContext: “A Card can provide the portfolio label and explanation while the chart owns the category comparison.”_
- **recommended** The host supplies the width, the chart takes its bar width from a token, and height sets the bar area.  
  _From sizing: “The host supplies width, the chart owns the bar width token, and height sets the bar area.”_
- **recommended** Narrow hosts need short category names and a shared scale.  
  _From sizing: “narrow hosts need short category names and a shared scale”_

## Configuration

- **recommended** `data`: data lists the segments left to right; each carries its value, an optional baseline and its label.  
  _From fact `/facts/props/0` (data, source types)_
- **recommended** `data`: A recommended value appears only when the data includes a baseline.  
  _From configuration: “A recommended value appears only when the data includes a baseline.”_
- **recommended** `baselineLegendLabel`: The Recommended legend item appears only when at least one segment has a baseline.  
  _From fact `/facts/props/6` (baselineLegendLabel, source types)_
- **recommended** `data`: Leave the reference out when the page only needs current category amounts.  
  _From configuration: “Omit the reference when the page only needs current category amounts.”_
- **recommended** `max`: max scales every bar and baseline. Left out, it is the largest value or baseline in data; pass an explicit max, such as 100 for percentages, for a fixed scale.  
  _From fact `/facts/props/1` (max, source types)_
- **recommended** `max`: Use one shared 100 scale (max 100) for percentages: a fixed percentage frame makes category heights comparable.  
  _From doDont: “A fixed percentage frame makes category heights comparable.”_
- **discouraged** `max`: Don't let each chart scale to its own values: separate automatic scales make the same visual height represent different amounts.  
  _From doDont: “Separate automatic scales make the same visual height represent different amounts.”_
- **recommended** `max`: Use a consistent max when categories are compared across a summary.  
  _From sizing: “Use a consistent max when categories are compared across a summary.”_
- **recommended** `height`: The default bar area is 154 px; choose any nonnegative height when the host needs more or less room.  
  _From configuration: “The default bar area is 154px; choose any nonnegative numeric height when the host needs more or less room.”_
- **recommended** `height`: height is the bar area only: the labels and the legend add to the total chart height.  
  _From configuration: “Labels and legend add to the total chart height.”_
- **recommended** `showLegend`: Keep the reference legend (showLegend is on by default): Current and Recommended tell people what the overlay means.  
  _From doDont: “Current and Recommended tell people what the overlay means.”_
- **discouraged** `showLegend` = `false`: Don't hide the legend when there is a reference: without it, the second reading becomes ambiguous.  
  _From doDont: “Without the legend, the second reading becomes ambiguous.”_
- **recommended** `formatValue`: formatValue formats each value and baseline into its label; left out, they read as percentages, such as 65%.  
  _From fact `/facts/props/7` (formatValue, source types)_

## Content

- **recommended** Use short, distinct labels: they help people map each value to the right category.  
  _From content: “Short, distinct labels help people map each value to the right category.”_
- **recommended** Use short distinct labels, such as Small & Mid, Large and Others.  
  _From doDont: “Names such as Small & Mid, Large, and Others stay readable.”_
- **discouraged** Don't crowd the categories: long repeated labels compete with the values and crowd a narrow host.  
  _From doDont: “Long repeated labels compete with the values and crowd a narrow host.”_
- **recommended** `showLegend`: Keep the recommended legend when a baseline changes the decision.  
  _From content: “Keep the recommended legend when a baseline changes the decision.”_
- **recommended** `formatValue`: Keep units consistent: percentages, amounts or another unit share one max and one format.  
  _From content: “Percentages, amounts, or another unit should share one max and format.”_

Good: “Small & Mid”, “Large”, “Others”

Bad: “Small and mid-capital holdings”, “Large-capital holdings”, “Other diversified holdings”

## States

| State | When | From |
| --- | --- | --- |
| Without reference | No segment has a baseline: the current bars stand on their own. | states: “Current bars stand on their own when there is no recommendation.” |
| With reference | A segment has a baseline: the legend and the first marker explain the additional reading. | states: “The legend and first marker explain the additional reading.” |

## Accessibility

- **recommended** `accessibilityLabel`: accessibilityLabel names the whole chart.  
  _From fact `/facts/props/12` (accessibilityLabel, source types)_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Use one shared 100 scale | Autoscale each chart | Separate automatic scales make the same visual height represent different amounts. |
| Keep the reference legend | Hide the explanation | Without the legend, the second reading becomes ambiguous. |
| Use short distinct labels | Crowd the categories | Long repeated labels compete with the values and crowd a narrow host. |

## Examples

### A portfolio allocation, the guide's In context: a Card gives the portfolio label and its explanation, and the chart owns the category comparison. The values are percentages of the portfolio on a shared 0–100 scale (max 100): Small & Mid is 65% now against a recommended 35%, and Large (25%) and Others (10%) have no recommendation. The bar area is 138 px.

```tsx
<Card>
  <Card.Title>Portfolio allocation</Card.Title>
  <Card.SupportText>Current mix compared with the recommended reference</Card.SupportText>
  <AllocationComparisonChart
    data={[
      { label: 'Small & Mid', value: 65, baseline: 35 },
      { label: 'Large', value: 25 },
      { label: 'Others', value: 10 },
    ]}
    max={100}
    height={138}
  />
</Card>
```

_From inContext: “A Card can provide the portfolio label and explanation while the chart owns the category comparison.”_

### Current amounts only, the guide's Current only: the same three categories as percentages on the shared 0–100 scale, with no baseline, so there is no overlay or marker and the legend shows Current alone. The bar area keeps its 154 px default.

```tsx
<AllocationComparisonChart
  data={[
    { label: 'Small & Mid', value: 65 },
    { label: 'Large', value: 25 },
    { label: 'Others', value: 10 },
  ]}
  max={100}
/>
```

_From configuration: “Omit the reference when the page only needs current category amounts.”_

### More room for the comparison, the guide's Plot height: the same portfolio percentages, Small & Mid 65% against a recommended 35%, with a 220 px bar area (height 220, the height of a bar at the max of 100); the legend and labels add to it.

```tsx
<AllocationComparisonChart
  data={[
    { label: 'Small & Mid', value: 65, baseline: 35 },
    { label: 'Large', value: 25 },
    { label: 'Others', value: 10 },
  ]}
  max={100}
  height={220}
/>
```

_From configuration: “The default bar area is 154px; choose any nonnegative numeric height when the host needs more or less room.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `data` | `AllocationSegment[]` |  |  |  | types | The segments to plot, left → right. Each carries its `value`, optional `baseline` and its `label`, so a bar can never drift from its caption. |
| `max` | `number` |  |  |  | types | Maximum value used to scale every bar **and** baseline. Defaults to the largest `value`/`baseline` across `data`. Pass an explicit `max` (e.g. `100` for percentages) for a fixed scale. |
| `height` | `number` |  | `154` |  | types | Height in px of the bar area — i.e. the height of a bar whose value equals `max`. Excludes the value/caption label rows. Default: `154`. Default 154, from the component source. |
| `barWidth` | `number` |  |  |  | types | Width of each pill bar in px. Default: the `segmentIndicator/track/width` token (`28`). |
| `showLegend` | `boolean` |  | `true` |  | types | Show the legend row above the chart. Default: `true`. Default true, from the component source. |
| `valueLegendLabel` | `React.ReactNode` |  | `"Current"` |  | types | Legend label for the bar (current) series. Default: `"Current"`. Default "Current", from the component source. |
| `baselineLegendLabel` | `React.ReactNode` |  | `"Recommended"` |  | types | Legend label for the baseline (recommended) series. Default: `"Recommended"`. The baseline legend item only appears when at least one segment defines a `baseline`. Default "Recommended", from the component source. |
| `formatValue` | `(value: number) => string` |  |  |  | types | Formats numeric `value`/`baseline` into the default labels. Default: `(v) => \`${v}%\``. |
| `modes` | `Modes` |  |  |  | types | Design token modes for theming (e.g. `{ 'Color Mode': 'Light' }`). |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Container style override. |
| `chartStyle` | `StyleProp<ViewStyle>` |  |  |  | types | Style applied to the bars row. |
| `legendStyle` | `StyleProp<ViewStyle>` |  |  |  | types | Style applied to the legend row. |
| `accessibilityLabel` | `string` |  |  |  | types | Accessibility label for the whole chart. |
| `disableTruncation` | `boolean` |  |  |  | types | When `true`, disables text truncation: the trailing ellipsis (`…`) is never shown and any `numberOfLines` clamp is ignored, so the text wraps to as many lines as it needs even when horizontal space is tight. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Appearance / DataViz` | `mode collection` | Primary, Secondary, Tertiary, Quaternary, Quinary, Senary, Neutral | `"Primary"` |  | types | A token collection AllocationComparisonChart reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection AllocationComparisonChart reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Emphasis / DataViz` | `mode collection` | High, Medium, Low | `"High"` |  | types | A token collection AllocationComparisonChart reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `valueLegendLabel` | `React.ReactNode` |  | `"Current"` |  | types | Legend label for the bar (current) series. Default: `"Current"`. |
| `baselineLegendLabel` | `React.ReactNode` |  | `"Recommended"` |  | types | Legend label for the baseline (recommended) series. Default: `"Recommended"`. The baseline legend item only appears when at least one segment defines a `baseline`. |

### Events

_No events._

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- A recommendation above the current value is clipped at the top of the current bar, so the chart can't show a baseline higher than its bar (Component Bug #550). _(evidence, 2026-09-22)_ ⚑ flagged (trace-check)

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/facts/gaps/0` · trace-check: Checked on jfs-components 0.1.60 (2026-09-22); the installed package is 0.1.78. Re-check before relying on it.
