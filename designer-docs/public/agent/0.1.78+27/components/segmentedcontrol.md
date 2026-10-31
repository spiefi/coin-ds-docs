# SegmentedControl

> Coin agent pack 0.1.78+27 (pilot). Generated from `components/segmentedcontrol.json`; the JSON is the source of truth.

- **State:** flagged (1 flag, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `3f56271` · built 2026-10-31T05:18:28Z
- **Category:** input (for discovery only, not a limit on composition) · **Tags:** segmented button, toggle group, period switcher, button group
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=segmentedcontrol) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2994-2578) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-segmentedcontrol--docs)

Use a Segmented Control to switch between two to five short, exclusive options, such as Daily, Weekly and Monthly.

## Use when

- **recommended** Switch between two to five short, exclusive options, such as Daily, Weekly and Monthly.  
  _From summary: “Use a Segmented Control to switch between two to five short, exclusive options, such as Daily, Weekly and Monthly.”_
- **recommended** One choice from a short set, always in view.  
  _From corePrinciple: “One choice from a short set, always in view.”_
- **recommended** Switch the period of the numbers below it, such as a portfolio's value, as in the guide's In context.  
  _From inContext: “Switching a portfolio’s period”_

## Avoid when

- **discouraged** More than five options, such as the seven days of a week: segments of about 40 px show at most a sliver of each day, so nobody can tell them apart.  
  _From doDont: “Segments of about 40 px show at most a sliver of each day, so nobody can tell them apart.”_
- **discouraged** An option needs a disabled or loading state: Segmented Control has neither.  
  _From states: “There is no disabled or loading state.”_
- **discouraged** Switching between peer views: the upstream Segmented Control mdx (unpublished), as the evidence records it, prefers Tabs. Use instead: `Tabs`. ⚑ flagged (human)  
  _From evidence: “prefer Tabs for peer views”_
- **discouraged** A share-of chart: the upstream Segmented Control mdx (unpublished), as the evidence records it, points to a Segmented Track. Use instead: `SegmentedTrack`.  
  _From evidence: “SegmentedTrack for a share-of chart”_
- **discouraged** Optional filters: the upstream Segmented Control mdx (unpublished), as the evidence records it, points to a Chip Select (or a FilterBar, which this pack does not cover). Use instead: `ChipSelect`.  
  _From evidence: “ChipSelect or FilterBar for optional filters”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Track | The lavender track holds the options side by side. | yes | anatomy: “A lavender track holds the options side by side.” |
| Segment | An option people can tap; its label sits on the track. | yes | anatomy: “An option people can tap; its label sits on the track.” |
| Label | One or two short words, centred. | yes | anatomy: “One or two short words, centred.” |
| Selected segment | Purple fill and a white label mark the current choice. | yes | anatomy: “Purple fill and a white label mark the current choice.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `items` | `SegmentedControlItem` | types |

## Placement

- **recommended** In a column, the track fills its container and splits it equally, with 8 px between segments and no padding of its own (in a row it is as wide as its labels need, below).  
  _From sizing: “The track fills its container and splits it equally, with 8 px between segments and no padding of its own.”_
- **recommended** Each segment is 43 px tall: 12 px above and below a 19 px label, with 16 px at each side.  
  _From sizing: “Each segment is 43 px tall: 12 px above and below a 19 px label, with 16 px at each side.”_
- **recommended** A label that doesn't fit ends in an ellipsis, and the track never runs past its column.  
  _From sizing: “A label that doesn’t fit ends in an ellipsis, and the track never runs past its column.”_
- **recommended** In a row, the track is as wide as its labels need, 304 px for Daily, Weekly and Monthly, and a narrower row ends them in an ellipsis.  
  _From sizing: “In a row, the track is as wide as its labels need, 304 px for Daily, Weekly, and Monthly, and a narrower row ends them in an ellipsis.”_
- **recommended** In a narrow column the labels end in an ellipsis: in a 216 px column each segment is about 66 px, too narrow for any of Daily, Weekly and Monthly; showing all three in full needs a track of about 300 px.  
  _From sizing: “In a 216 px column each segment is about 66 px, too narrow for any of these labels, so each ends in an ellipsis. Daily, Weekly, and Monthly need about 300 px.”_
- **recommended** Place the control above the numbers it changes.  
  _From inContext: “The control sits above the numbers it changes.”_
- **recommended** `style`: In a row, a width set through style wins over the width the labels need.  
  _From evidence: “An explicit style width wins.”_

## Configuration

- **recommended** `items`: Set the options (items) and the one that starts selected.  
  _From configuration: “Set the options and the one that starts selected.”_
- **REQUIRED** `items`: items is required: each option is a row with a key and a label.  
  _From fact `/facts/props/0` (items, source types)_
- **recommended** `items`: Every segment gets the same width, so the number of options decides how much room each label has.  
  _From configuration: “Every segment gets the same width, so the number of options decides how much room each label has.”_
- **recommended** `items`: Two options: opposites, such as Buy and Sell, each take half the track.  
  _From configuration: “Opposites, such as Buy and Sell, each take half the track.”_
- **recommended** `items`: Three options are the usual case: a period or a view with three choices.  
  _From configuration: “The usual case: a period or a view with three choices.”_
- **recommended** `items`: Offer five options at most: five is the most that fits, and on a 360 px phone each segment is then about 59 px.  
  _From configuration: “Five is the most that fits: on a 360 px phone each segment is about 59 px.”_
- **recommended** `defaultSelectedKey`: Select the likeliest option first (defaultSelectedKey, or the screen's selectedKey).  
  _From content: “select the likeliest option first”_
- **recommended** `defaultSelectedKey`: Left out, defaultSelectedKey falls back to the first item's key, so the first option starts selected.  
  _From fact `/facts/props/2` (defaultSelectedKey, source evidence)_
- **recommended** `selectedKey`: One segment is always selected, as long as the key names one of the options.  
  _From states: “One segment is always selected.”_
- **discouraged** `selectedKey`: Don't pass a key that isn't one of the options (as selectedKey or defaultSelectedKey): nothing is selected, and people can't tell what they're looking at.  
  _From doDont: “Nothing is selected, and people can’t tell what they’re looking at.”_
- **recommended** `selectedKey`: Keys match by strict equality: a key that matches no item leaves every segment unselected.  
  _From evidence: “Selection is strict equality; a key that matches no item leaves every segment unselected.”_
- **recommended** `defaultSelectedKey`: defaultSelectedKey is read only when the control mounts: changing it later doesn't move the selection.  
  _From evidence: “`defaultSelectedKey` is read only at mount”_
- **recommended** `onSelectionChange`: In the guide's In context the screen keeps the selected period (selectedKey) and updates the value below; the control only reports the tap (onSelectionChange).  
  _From inContext: “The screen keeps the selected period and updates the value below; the control only reports the tap.”_
- **recommended** `onSelectionChange`: onSelectionChange is called with the new key; pressing the selected segment again doesn't call it.  
  _From evidence: “Pressing the selected segment again doesn't call `onSelectionChange`.”_
- **recommended** `SegmentedControl/Segment`: The control sets SegmentedControl/Segment on each segment itself (Idle, or Active for the selected one), over the modes it is given.  
  _From evidence: “The component sets `SegmentedControl/Segment` Idle/Active per segment, overriding caller modes.”_

## Content

- **recommended** `SegmentedControlItem.label`: One or two words per option.  
  _From content: “One or two words per option”_
- **recommended** `SegmentedControlItem.label`: Keep labels short and parallel, such as Daily, Weekly, Monthly: labels share the width equally and end in an ellipsis when they don't fit.  
  _From content: “Labels share the width equally and end in an ellipsis when they don’t fit, so keep them short and parallel: Daily, Weekly, Monthly.”_
- **recommended** `SegmentedControlItem.label`: Use the words people see in the content below the control.  
  _From content: “Use the words people see in the content below”_
- **discouraged** `SegmentedControlItem.label`: Don't write long labels such as “One-time payment”: every label is cut short, and “One-ti…” doesn't say which plan it is.  
  _From doDont: “Every label is cut short, and “One-ti…” doesn’t say which plan it is.”_

Good: “Daily”, “Weekly”, “Monthly”, “Buy”, “Sell”, “1M”, “3M”, “6M”, “1Y”, “All”

Bad: “One-time payment”, “Monthly SIP”, “Step-up SIP”

## States

| State | When | From |
| --- | --- | --- |
| Selected | The current choice: a purple fill and a white label. | anatomy: “Purple fill and a white label mark the current choice.” |
| Unselected | The other options: labels on the track. | anatomy: “the others are labels on the track.” |
| Pressed | A pressed segment dims until release, then becomes the selection. | states: “A pressed segment dims until release, then becomes the selection.” |

## Accessibility

- **recommended** On the web the control is a tab list: the selected segment is announced as selected and is the only one in the Tab order, and Enter, Space and the arrow keys select.  
  _From sources: “On the web the control is a tab list: the selected segment is announced as selected and is the only one in the Tab order, and Enter, Space, and the arrow keys select.”_
- **recommended** On the web the arrow keys, Home and End move focus and select (the arrows wrap); Space and Enter select the focused segment once.  
  _From evidence: “Arrow keys, Home, and End move focus and select (arrows wrap); Space and Enter select the focused segment once.”_
- **recommended** `accessibilityLabel`: accessibilityLabel names the tab list, and testID identifies it.  
  _From evidence: “The tab list is named by `accessibilityLabel` and takes `testID`.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Keep labels short | Write long labels | Every label is cut short, and “One-ti…” doesn’t say which plan it is. |
| Offer five options at most | Squeeze in seven | Segments of about 40 px show at most a sliver of each day, so nobody can tell them apart. |
| Select one of the options | Pass a key that isn’t an option | Nothing is selected, and people can’t tell what they’re looking at. |

## Examples

### Three options, the guide's Three options card: a period with Daily, Weekly and Monthly. Weekly starts selected (defaultSelectedKey), as in the guide's code for that card. The keys stand for the screen's period values; left uncontrolled, the control moves its own selection when people tap.

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

_From configuration: “The usual case: a period or a view with three choices.”_

### Five options, the most that fits, the guide's Five options card: the ranges 1M, 3M, 6M, 1Y and All, each key the same as its label. 1Y starts selected (defaultSelectedKey), as in the guide's code for that card. On a 360 px phone each segment is about 59 px.

```tsx
<SegmentedControl
  items={[
    { key: '1M', label: '1M' },
    { key: '3M', label: '3M' },
    { key: '6M', label: '6M' },
    { key: '1Y', label: '1Y' },
    { key: 'All', label: 'All' },
  ]}
  defaultSelectedKey="1Y"
/>
```

_From configuration: “Five is the most that fits: on a 360 px phone each segment is about 59 px.”_

### Switching a portfolio's period, the guide's In context, showing the weekly change: a Card titled “Portfolio value” with the control above the change it controls, “+₹3,020 (2.4%) this week”. selectedKey="weekly" stands for the period the screen keeps, and onSelectionChange for the screen storing the new period and updating the change below. Between the control and the change the guide also shows the value, ₹ 1,24,560; in the guide's code it is a MoneyValue, which has no entry in this pack, so it is left out: report that the value needs MoneyValue.

```tsx
<Card>
  <Card.Title>Portfolio value</Card.Title>
  <SegmentedControl
    items={[
      { key: 'daily', label: 'Daily' },
      { key: 'weekly', label: 'Weekly' },
      { key: 'monthly', label: 'Monthly' },
    ]}
    selectedKey="weekly"
    onSelectionChange={() => {}}
  />
  <Text text="+₹3,020 (2.4%) this week" />
</Card>
```

_From inContext: “The screen keeps the selected period and updates the value below; the control only reports the tap.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `items` | `SegmentedControlItem[]` |  |  | yes | types | The items to display as segments. |
| `selectedKey` | `React.Key` |  |  |  | evidence (2026-10-07) | Keys match by strict equality; a key that matches no item leaves every segment unselected. Declared: The currently selected key (controlled) |
| `defaultSelectedKey` | `React.Key` |  |  |  | evidence (2026-10-13) | Read only at mount: a later change doesn't move the selection. Declared: The initially selected key (uncontrolled). Defaults to the first item's key. |
| `onSelectionChange` | `(key: React.Key) => void` |  |  |  | evidence (2026-10-13) | Not called when the selected segment is pressed again. Declared: Callback fired when the selected segment changes. |
| `modes` | `Modes` |  |  |  | types | Design token modes for theming. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | evidence (2026-10-27) | In a row, an explicit style width wins over the width the labels need. Declared: Override container styles. |
| `accessibilityLabel` | `string` |  |  |  | evidence (2026-10-13) | Names the tab list. Declared: Accessible name for the segment group. |
| `testID` | `string` |  |  |  | types | Test identifier. |
| `SegmentedControlItem.key` | `React.Key` |  |  | yes | types | A field of each items row. |
| `SegmentedControlItem.label` | `string` |  |  | yes | types | A field of each items row. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `SegmentedControl/Segment` | `mode collection` | Idle, Active | `"Idle"` |  | evidence (2026-10-07) | Set by the control on each segment (Idle, or Active for the selected one), over the modes it is given. Declared: A token collection SegmentedControl reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `items` | `SegmentedControlItem[]` |  |  |  | types | A structured slot: an array of SegmentedControlItem rows. The items to display as segments |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onSelectionChange` | `(key: React.Key) => void` |  |  |  | types | Callback fired when the selected segment changes |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

_None recorded._

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/avoidWhen/2` · human: The Segmented Control guide (3f56271) never says when to use Tabs instead, and the Tabs guide doesn't name Segmented Control. This rule's pointer to Tabs rests on the unpublished upstream SegmentedControl.mdx as the evidence records it (“prefer Tabs for peer views”); at dbe0e02f the mdx still says the control “filters or switches a value in place” while Tabs “switch peer views or pages” (lines 24 and 84). But the guide's own Three options card calls “a period or a view with three choices” the usual case, and the Tabs guide offers Tabs “to switch between a few peer views of the same content”, so from the published guides alone a designer or agent can't tell whether switching views belongs to this control or to Tabs. The guide should say when to use Tabs instead (and, as the mdx does, Segmented Track for a share-of chart and Chip Select for optional filters, which /avoidWhen/3 and /avoidWhen/4 also take from the mdx); then re-extract. Added by Claude Code in the overnight run agentpack-r26, for Marcin to confirm. Guide fix #557.
