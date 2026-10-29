# AreaLineChart (brief)

> Coin agent pack 0.1.78+7 · documented · full entry: `components/arealinechart.md` (sources, all facts, flags)

Show a continuous trend and make series comparison legible.

**Use when**
- Show a continuous trend, such as an account balance over a few months, and make a comparison between series legible.
- Put a trend beside the decision it informs, for example inside a card or an account summary.

**Avoid when**
- Avoid: Comparing series in unrelated units, such as income in rupees and a conversion rate in percent: they don't belong on one comparison scale.

**Placement**
- Use a card or account summary to give the chart a clear unit and decision context.
- A Card can provide the account label and unit context while the chart stays responsible for the plotted data.
- The chart owns plot height while the host supplies width.
- Use the full available width when comparing two series.

**Key rules**
- **REQUIRED** `series`: series is required: one entry per series, each with its data; a series' label names it in the legend and when a point is selected.
- Use the series, area/line, grid, dots, curve, and x-label choices to make a trend or comparison legible.
- `series`: A single series keeps the direction prominent.
- `series`: A second labelled series adds comparison without hiding the units.
- `series`: Mark projected points in the data (projected on a ChartPoint) so the chart can distinguish expectation from observed values; they are drawn dashed.
- `showLegend`: With more than one series the chart shows a legend of the series names (showLegend, on by default); a single series has none.
- `goalPin`: Use a goal pin (goalPin, anchored to a data point) to call out a meaningful point, not a decorative maximum.
- `xLabels`: Keep the x labels (xLabels) short enough to select and read at the host width.

**Example:** An account balance trend, the guide's In context: a Card gives the account label and the unit context, and the chart plots three months of balance with a goal pin on the last point. The guide also keeps the plotted values in a text table beside it; that table is page HTML, not Coin.

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

**Props:** `series`*, `xLabels`, `yMin`, `yMax`, `numberOfTicks`, `curve` (linear | monotone), `height`, `contentInset`, `showGrid`, `showXAxis`, `showYAxis`, `showLegend`, `showDots`, `formatX`, `formatY`, `formatValue`, `goalPin`, `activeIndex`, `defaultActiveIndex`, `onActiveIndexChange`, `interactive`, `modes`, `style`, `children`, and 6 more. (* required)

**Modes it reads:** Appearance / DataViz, Color Mode, Emphasis / DataViz.

**Gaps (report, do not work around)**
- In a 320 px host the last x-axis label extends about 3 px past the chart's right edge.

Full entry: `components/arealinechart.md`. Links: `components/arealinechart.links.md`.
