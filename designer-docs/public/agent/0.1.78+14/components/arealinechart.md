# AreaLineChart

> Coin agent pack 0.1.78+14 (pilot). Generated from `components/arealinechart.json`; the JSON is the source of truth.

- **State:** documented
- **Package:** jfs-components 0.1.78 · guide commit `4e470cf` · built 2026-10-29T05:38:55Z
- **Category:** data (for discovery only, not a limit on composition) · **Tags:** line chart, area chart, graph, trend, time series
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=arealinechart) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4225-1049) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-arealinechart--docs)

Show a continuous trend and make series comparison legible.

## Use when

- **recommended** Show a continuous trend, such as an account balance over a few months, and make a comparison between series legible.  
  _From summary: “Show a continuous trend and make series comparison legible.”_
- **recommended** Put a trend beside the decision it informs, for example inside a card or an account summary.  
  _From inContext: “Put a trend beside the decision it informs”_

## Avoid when

- **discouraged** Comparing series in unrelated units, such as income in rupees and a conversion rate in percent: they don't belong on one comparison scale.  
  _From doDont: “Income in rupees and conversion rate in percent do not belong on one comparison scale.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Y axis | Tick labels for one unit on a readable scale, so the direction is honest; on by default (showYAxis), formatted by formatY. | no | anatomy: “Use one unit and a readable scale so the direction is honest.” |
| Plot | Area and line show the trend; projected points use the dashed treatment. The plot owns pointer and x-axis selection. | yes | anatomy: “Area and line show the trend; projected points use the dashed treatment. The plot owns pointer and x-axis selection.” |
| Goal pin | A value bubble anchored to one data point (goalPin), to call out a meaningful point, not a decorative maximum. | no | anatomy: “Use a goal pin to call out a meaningful point, not a decorative maximum.” |
| X axis | Labels from xLabels, short enough to select and read at the host width; on by default (showXAxis). | no | anatomy: “Keep labels short enough to select and read at the host width.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `formatX` | `((label: string \| number, index: number) => React.ReactNode)` | types |
| `formatY` | `((value: number) => React.ReactNode)` | types |
| `formatValue` | `((value: number, series: ChartSeries) => React.ReactNode)` | types |
| `children` | `ReactNode` | types |

## Placement

- **recommended** Use a card or account summary to give the chart a clear unit and decision context.  
  _From inContext: “Use a card or account summary to give the chart a clear unit and decision context.”_
- **recommended** A Card can provide the account label and unit context while the chart stays responsible for the plotted data.  
  _From inContext: “A Card can provide the account label and unit context while the chart stays responsible for the plotted data.”_
- **recommended** The chart owns plot height while the host supplies width.  
  _From sizing: “The chart owns plot height while the host supplies width.”_
- **recommended** Use the full available width when comparing two series.  
  _From sizing: “Use full available width when comparing two series.”_
- **recommended** On a narrow host, use shorter labels and fewer points in the same order.  
  _From sizing: “On a narrow host, use shorter labels and fewer points in the same order.”_
- **recommended** Reduce labels and point count before shrinking the readable chart.  
  _From sizing: “Reduce labels and point count before shrinking the readable chart.”_
- **recommended** The Y-axis column reserves the width of its widest tick label, and the goal pin stays inside the plot.  
  _From sources: “The Y-axis column reserves the width of its widest tick label, and the goal pin stays inside the plot.”_

## Configuration

- **REQUIRED** `series`: series is required: one entry per series, each with its data; a series' label names it in the legend and when a point is selected.  
  _From fact `/facts/props/0` (series, source types)_
- **recommended** Use the series, area/line, grid, dots, curve, and x-label choices to make a trend or comparison legible.  
  _From configuration: “Use the series, area/line, grid, dots, curve, and x-label choices to make a trend or comparison legible.”_
- **recommended** `series`: A single series keeps the direction prominent.  
  _From configuration: “A single series keeps the direction prominent.”_
- **recommended** `series`: A second labelled series adds comparison without hiding the units.  
  _From configuration: “A second labelled series adds comparison without hiding the units.”_
- **recommended** `series`: Mark projected points in the data (projected on a ChartPoint) so the chart can distinguish expectation from observed values; they are drawn dashed.  
  _From configuration: “Mark projected points in the data so the chart can distinguish expectation from observed values.”_
- **recommended** `showLegend`: With more than one series the chart shows a legend of the series names (showLegend, on by default); a single series has none.  
  _From fact `/facts/props/11` (showLegend, source types)_
- **recommended** `goalPin`: Use a goal pin (goalPin, anchored to a data point) to call out a meaningful point, not a decorative maximum.  
  _From anatomy: “Use a goal pin to call out a meaningful point, not a decorative maximum.”_
- **recommended** `xLabels`: Keep the x labels (xLabels) short enough to select and read at the host width.  
  _From anatomy: “Keep labels short enough to select and read at the host width.”_
- **recommended** `height`: height sets the plot's height (218 px by default); the x-axis row is added below it.  
  _From sources: “its plot height excludes the x-axis row”_
- **recommended** `yMax`: The chart derives a nice tick domain from its data unless y bounds (yMin, yMax) are supplied.  
  _From sources: “The chart derives a nice tick domain from its data unless y bounds are supplied”_
- **recommended** `formatY`: formatY formats the y-axis tick labels, and formatValue the values a selected point shows (it defaults to formatY), so the unit can be written on the axis.  
  _From fact `/facts/props/15` (formatValue, source types)_
- **recommended** `interactive`: interactive (on by default) turns on hover and press-drag selection with a tooltip.  
  _From fact `/facts/props/20` (interactive, source types)_

## Content

- **recommended** Short x labels, one shared unit, and a visible legend help the chart communicate before a person inspects a point.  
  _From content: “Short x labels, one shared unit, and a visible legend help the chart communicate before a person inspects a point.”_
- **recommended** `series`: Use the same unit and scale for series that people need to compare.  
  _From content: “Use the same unit and scale for series that people need to compare.”_
- **recommended** `series`: Name every series (its label): a legend removes ambiguity when lines overlap or cross.  
  _From content: “A legend removes ambiguity when lines overlap or cross.”_
- **recommended** Keep the visible values available in text when SVG interaction is not enough for the task.  
  _From content: “Keep the visible values available in text when SVG interaction is not enough for the task.”_

Good: “Apr”, “May”, “Jun”, “Income”, “Spending”, “Balance”

Bad: “January month-end account balance”, “February month-end account balance”

## States

| State | When | From |
| --- | --- | --- |
| Unselected | No point is active, which is how the chart starts unless activeIndex or defaultActiveIndex names one: keep the plot quiet when no point needs focus. | states: “Keep the plot quiet when no point needs focus.” |
| Selected | A point is active, set by activeIndex or by pointer and x-axis selection, which update onActiveIndexChange: the chart exposes the selected point and its readable series values. | states: “Expose a selected point and its readable series values.” |

## Accessibility

- **recommended** On the web the x-axis labels are pressable and keyboard reachable, so a point can be selected without a pointer; the rendered accessibility tree does not expose the full series labels, so keep the values available in text when SVG interaction is not enough for the task.  
  _From sources: “SVG interaction is keyboard reachable through the public x-axis Pressable in RN Web, but the rendered accessibility tree does not expose full series labels”_
- **recommended** `accessibilityLabel`: accessibilityLabel names the whole chart.  
  _From fact `/facts/props/24` (accessibilityLabel, source types)_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Use one shared unit | Mix unrelated units | Income in rupees and conversion rate in percent do not belong on one comparison scale. |
| Label the series | Hide the legend | Two lines without labels force people to guess which series they are seeing. |
| Use short readable labels | Overpack the x axis | Long repeated labels crowd the axis and hide the trend. |

## Examples

### An account balance trend, the guide's In context: a Card gives the account label and the unit context, and the chart plots three months of balance with a goal pin on the last point. The guide also keeps the plotted values in a text table beside it; that table is page HTML, not Coin.

```tsx
<Card>
  <Card.Title>Account balance</Card.Title>
  <Card.SupportText>Direction over the last three months</Card.SupportText>
  <AreaLineChart
    series={[{ key: 'balance', label: 'Balance', data: [620, 590, 725] }]}
    xLabels={['Apr', 'May', 'Jun']}
    height={168}
    goalPin={{ value: '725k', atIndex: 2 }}
    formatY={(value) => `${value}k`}
    accessibilityLabel="Account balance"
  />
</Card>
```

_From inContext: “A Card can provide the account label and unit context while the chart stays responsible for the plotted data.”_

### Series comparison with a point selected, the guide's States: income and spending in the same unit over six months, so two series get the legend automatically. The screen keeps the active index, and the chart shows that point's series values (here February, Income 14k and Spending 8k); pressing an x-axis label or the plot reports the new index through onActiveIndexChange. With no activeIndex the plot stays quiet.

```tsx
<AreaLineChart
  series={[
    { key: 'income', label: 'Income', data: [1, 14, 12, 22, 33, 45] },
    { key: 'spending', label: 'Spending', data: [1, 8, 9, 14, 22, 30] },
  ]}
  xLabels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
  showDots
  activeIndex={1}
  onActiveIndexChange={() => {}}
  formatY={(value) => `${value}k`}
/>
```

_From states: “Expose a selected point and its readable series values.”_

### A projected tail: three observed months and two projected ones, marked projected in the data so their segments are dashed; the guide turns the area off and shows dots for this one.

```tsx
<AreaLineChart
  series={[
    {
      key: 'balance',
      label: 'Balance',
      showArea: false,
      data: [22, 28, 31, { y: 36, projected: true }, { y: 41, projected: true }],
    },
  ]}
  xLabels={['Apr', 'May', 'Jun', 'Jul', 'Aug']}
  showDots
  goalPin={{ value: '31k', atIndex: 2 }}
  formatY={(value) => `${value}k`}
/>
```

_From configuration: “Mark projected points in the data so the chart can distinguish expectation from observed values.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `series` | `ChartSeries[]` |  |  | yes | types | The series to plot. A single entry renders the "Area Line Chart" preset; multiple entries render the overlapping multi-series preset with an automatic legend. |
| `xLabels` | `Array<string \| number>` |  |  |  | types | Labels rendered along the x axis (left-to-right). |
| `yMin` | `number` |  |  |  | types | Force the lower bound of the y domain. |
| `yMax` | `number` |  |  |  | types | Force the upper bound of the y domain. |
| `numberOfTicks` | `number` |  | `4` |  | types | Approximate number of y-axis ticks / grid lines. Defaults to `4`. Default 4, from the component source. |
| `curve` | `Curve` | linear, monotone | `"linear"` |  | types | Interpolation between points. Defaults to `linear` (straight segments). Default "linear", from the component source. |
| `height` | `number` |  | `218` |  | types | Plot drawing height in px (excludes the x-axis row). Defaults to `218`. Default 218, from the component source. |
| `contentInset` | `ChartInset` |  |  |  | types | Fake margin inside the SVG so strokes/dots/pins are not clipped. |
| `showGrid` | `boolean` |  | `true` |  | types | Toggle the background grid. Defaults to `true`. Default true, from the component source. |
| `showXAxis` | `boolean` |  | `true` |  | types | Toggle the x-axis labels. Defaults to `true`. Default true, from the component source. |
| `showYAxis` | `boolean` |  | `true` |  | types | Toggle the y-axis labels. Defaults to `true`. Default true, from the component source. |
| `showLegend` | `boolean` |  | `true` |  | types | Toggle the legend (multi-series only). Defaults to `true`. Default true, from the component source. |
| `showDots` | `boolean` |  | `false` |  | types | Render a dot on every data point. Defaults to `false`. Default false, from the component source. |
| `formatX` | `(label: string \| number, index: number) => React.ReactNode` |  |  |  | types | Format an x label. Receives the raw label and index. |
| `formatY` | `(value: number) => React.ReactNode` |  |  |  | types | Format a y-axis tick label. |
| `formatValue` | `(value: number, series: ChartSeries) => React.ReactNode` |  |  |  | types | Format a value shown in the tooltip. Defaults to `formatY`. |
| `goalPin` | `GoalPinConfig` |  |  |  | types | Render a goal pin anchored to a data point. |
| `activeIndex` | `number \| null` |  |  |  | types | Controlled active index (the highlighted point). |
| `defaultActiveIndex` | `number \| null` |  | `null` |  | types | Initial active index for the uncontrolled case. Default null, from the component source. |
| `onActiveIndexChange` | `(index: number \| null) => void` |  |  |  | types | Notified whenever the active index changes. |
| `interactive` | `boolean` |  | `true` |  | types | Enable hover/press-drag interaction + tooltip. Defaults to `true`. Default true, from the component source. |
| `modes` | `Modes` |  |  |  | types | Design token modes for theming (e.g. `{ 'Color Mode': 'Light' }`). |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Container style override. |
| `children` | `React.ReactNode` |  |  |  | types | Extra SVG-decorator children rendered on top of the default layers. |
| `accessibilityLabel` | `string` |  |  |  | types | Accessibility label for the whole chart. |
| `disableTruncation` | `boolean` |  |  |  | types | When `true`, disables text truncation: the trailing ellipsis (`…`) is never shown and any `numberOfLines` clamp is ignored, so the text wraps to as many lines as it needs even when horizontal space is tight. |
| `AreaLineChart.Grid` | `component` |  |  |  | types | A static sub-component of AreaLineChart. Its own props: direction, stroke, strokeWidth, strokeDasharray. |
| `AreaLineChart.XAxis` | `component` |  |  |  | types | A static sub-component of AreaLineChart. Its own props: showLabels, showTicks, tickLength, selectable, formatLabel. |
| `AreaLineChart.YAxis` | `component` |  |  |  | types | A static sub-component of AreaLineChart. Its own props: showLabels, showTicks, tickLength, showAxisLine, formatLabel. |
| `AreaLineChart.GoalPin` | `component` |  |  |  | types | A static sub-component of AreaLineChart. Its own props: value, atIndex, seriesIndex, color, textColor. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Appearance / DataViz` | `mode collection` | Primary, Secondary, Tertiary, Quaternary, Quinary, Senary, Neutral | `"Primary"` |  | types | A token collection AreaLineChart reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection AreaLineChart reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Emphasis / DataViz` | `mode collection` | High, Medium, Low | `"High"` |  | types | A token collection AreaLineChart reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `formatX` | `(label: string \| number, index: number) => React.ReactNode` |  |  |  | types | Format an x label. Receives the raw label and index. |
| `formatY` | `(value: number) => React.ReactNode` |  |  |  | types | Format a y-axis tick label. |
| `formatValue` | `(value: number, series: ChartSeries) => React.ReactNode` |  |  |  | types | Format a value shown in the tooltip. Defaults to `formatY`. |
| `children` | `React.ReactNode` |  |  |  | types | Extra SVG-decorator children rendered on top of the default layers. |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onActiveIndexChange` | `(index: number \| null) => void` |  |  |  | types | Notified whenever the active index changes. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- In a 320 px host the last x-axis label extends about 3 px past the chart's right edge. _(evidence, 2026-10-01)_

## Flags

_None._
