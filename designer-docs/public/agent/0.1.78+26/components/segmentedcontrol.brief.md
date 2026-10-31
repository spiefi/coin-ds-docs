# SegmentedControl (brief)

> Coin agent pack 0.1.78+26 · flagged · full entry: `components/segmentedcontrol.md` (sources, all facts, flags)

Use a Segmented Control to switch between two to five short, exclusive options, such as Daily, Weekly and Monthly.

**Use when**
- Switch between two to five short, exclusive options, such as Daily, Weekly and Monthly.
- One choice from a short set, always in view.
- Switch the period of the numbers below it, such as a portfolio's value, as in the guide's In context.

**Avoid when**
- Avoid: More than five options, such as the seven days of a week: segments of about 40 px show at most a sliver of each day, so nobody can tell them apart.
- Avoid: An option needs a disabled or loading state: Segmented Control has neither.
- Avoid: Switching between peer views: the upstream Segmented Control mdx (unpublished), as the evidence records it, prefers Tabs. Use instead: Tabs.
- Avoid: A share-of chart: the upstream Segmented Control mdx (unpublished), as the evidence records it, points to a Segmented Track. Use instead: SegmentedTrack.

**Placement**
- In a column, the track fills its container and splits it equally, with 8 px between segments and no padding of its own (in a row it is as wide as its labels need, below).
- Each segment is 43 px tall: 12 px above and below a 19 px label, with 16 px at each side.
- A label that doesn't fit ends in an ellipsis, and the track never runs past its column.
- In a row, the track is as wide as its labels need, 304 px for Daily, Weekly and Monthly, and a narrower row ends them in an ellipsis.

**Key rules**
- **REQUIRED** `items`: items is required: each option is a row with a key and a label.
- `items`: Set the options (items) and the one that starts selected.
- `items`: Every segment gets the same width, so the number of options decides how much room each label has.
- `items`: Two options: opposites, such as Buy and Sell, each take half the track.
- `items`: Three options are the usual case: a period or a view with three choices.
- `items`: Offer five options at most: five is the most that fits, and on a 360 px phone each segment is then about 59 px.
- `defaultSelectedKey`: Select the likeliest option first (defaultSelectedKey, or the screen's selectedKey).
- `defaultSelectedKey`: Left out, defaultSelectedKey falls back to the first item's key, so the first option starts selected.

**Example:** Three options, the guide's Three options card: a period with Daily, Weekly and Monthly. Weekly starts selected (defaultSelectedKey), as in the guide's code for that card. The keys stand for the screen's period values; left uncontrolled, the control moves its own selection when people tap.

```tsx
<SegmentedControl
  items={[
    { key: 'daily', label: 'Daily' },
    { key: 'weekly', label: 'Weekly' },
    { key: 'monthly', label: 'Monthly' },
  ]}
  defaultSelectedKey="weekly"
/>
```

**Props:** `items`*, `selectedKey`, `defaultSelectedKey`, `onSelectionChange`, `modes`, `style`, `accessibilityLabel`, `testID`, `SegmentedControlItem.key`*, `SegmentedControlItem.label`*. (* required)

**Modes it reads:** SegmentedControl/Segment.

Full entry: `components/segmentedcontrol.md`. Links: `components/segmentedcontrol.links.md`.
