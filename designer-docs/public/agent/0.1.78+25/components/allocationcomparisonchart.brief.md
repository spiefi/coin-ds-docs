# AllocationComparisonChart (brief)

> Coin agent pack 0.1.78+25 · flagged · full entry: `components/allocationcomparisonchart.md` (sources, all facts, flags)

Compare category amounts with a supplied reference.

**Use when**
- Compare category amounts with a supplied reference.
- Use one shared scale so comparison stays honest.
- Let people compare categories directly on one shared scale.

**Avoid when**
- Avoid: Anything people press or select: the chart has no selected or pressed state.

**Placement**
- Place the chart beside a summary that explains what the categories mean.
- A Card can give the portfolio label and the explanation while the chart owns the category comparison.
- The host supplies the width, the chart takes its bar width from a token, and height sets the bar area.
- Narrow hosts need short category names and a shared scale.

**Key rules**
- `data`: data lists the segments left to right; each carries its value, an optional baseline and its label.
- `data`: A recommended value appears only when the data includes a baseline.
- `baselineLegendLabel`: The Recommended legend item appears only when at least one segment has a baseline.
- `data`: Leave the reference out when the page only needs current category amounts.
- `max`: max scales every bar and baseline. Left out, it is the largest value or baseline in data; pass an explicit max, such as 100 for percentages, for a fixed scale.
- `max`: Use one shared 100 scale (max 100) for percentages: a fixed percentage frame makes category heights comparable.
- Avoid: `max`: Don't let each chart scale to its own values: separate automatic scales make the same visual height represent different amounts.
- `max`: Use a consistent max when categories are compared across a summary.

**Example:** A portfolio allocation, the guide's In context: a Card gives the portfolio label and its explanation, and the chart owns the category comparison. The values are percentages of the portfolio on a shared 0–100 scale (max 100): Small & Mid is 65% now against a recommended 35%, and Large (25%) and Others (10%) have no recommendation. The bar area is 138 px.

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

**Props:** `data`, `max`, `height`, `barWidth`, `showLegend`, `valueLegendLabel`, `baselineLegendLabel`, `formatValue`, `modes`, `style`, `chartStyle`, `legendStyle`, `accessibilityLabel`, `disableTruncation`. (* required)

**Modes it reads:** Appearance / DataViz, Color Mode, Emphasis / DataViz.

**Gaps (report, do not work around)**
- A recommendation above the current value is clipped at the top of the current bar, so the chart can't show a baseline higher than its bar (Component Bug #550).

Full entry: `components/allocationcomparisonchart.md`. Links: `components/allocationcomparisonchart.links.md`.
