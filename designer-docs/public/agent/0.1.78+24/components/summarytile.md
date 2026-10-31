# SummaryTile

> Coin agent pack 0.1.78+24 (pilot). Generated from `components/summarytile.json`; the JSON is the source of truth.

- **State:** flagged (1 flag, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `52bf96e` · built 2026-10-31T02:32:56Z
- **Category:** content (for discovery only, not a limit on composition) · **Tags:** section header, summary row, dashboard header, confidence meter, strength indicator
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=summarytile) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4116-6354) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-summarytile--docs)

Use a Summary Tile to head a dashboard block: a title with a confidence meter, one line about the block, and one action or a chevron.

## Use when

- **recommended** Head a dashboard block: a title with a confidence meter, one line about the block, and one action or a chevron.  
  _From summary: “Use a Summary Tile to head a dashboard block: a title with a confidence meter, one line about the block, and one action or a chevron.”_
- **recommended** Name the block, then offer one way in.  
  _From corePrinciple: “Name the block, then offer one way in.”_

## Avoid when

- **discouraged** Two actions: the upstream Storybook docs, as the evidence records them, keep the tile for naming a block and offering one next step.  
  _From evidence: “Use it to "name a dashboard block and offer one next step"; not for the block itself or two actions.”_
- **discouraged** The block itself: the upstream Storybook docs, as the evidence records them, use the tile to name the block, not to hold it.  
  _From evidence: “Use it to "name a dashboard block and offer one next step"; not for the block itself or two actions.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Title | title: the block’s name, 16 px bold, on one line. | no | anatomy: “title: the block’s name, 16 px bold, on one line.” |
| Meter | A StrengthIndicator from confidence; null removes it. | no | anatomy: “A StrengthIndicator from confidence; null removes it.” |
| Description | description: what the block holds, 12 px. | no | anatomy: “description: what the block holds, 12 px” |
| Action | children: your Button, given the tile’s modes. | no | anatomy: “children: your Button, given the tile’s modes.” |
| Chevron | A forward arrow at the end, when chevron is on. | no | configuration: “chevron adds a forward arrow at the end.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `children` | `ReactNode` | types |

## Placement

- **recommended** Put it at the top of the block it names: in the guide’s In context, the tile heads a card and the list under it is the block it introduces.  
  _From inContext: “The tile heads a card, and the list under it is the block it introduces.”_
- **recommended** It fills its host’s width and adds no padding, background, or border: the card or screen around it supplies them.  
  _From sizing: “The tile fills its host’s width and adds no padding, background, or border: the card or screen around it supplies them.”_

## Configuration

- **recommended** `children`: children holds the action.  
  _From configuration: “children holds the action.”_
- **recommended** `children`: There is no default action: pass a Button or an IconButton in children, or use actionLabel and onActionPress for the built-in small secondary Button.  
  _From fact `/facts/props/4` (children, source types)_
- **recommended** `onActionPress`: onActionPress, with children left out and no onPress on the tile, renders the built-in small secondary Button with that handler instead of a dead placeholder; a tile with onPress has no built-in Button.  
  _From fact `/facts/props/6` (onActionPress, source types)_
- **recommended** `actionLabel`: actionLabel labels the built-in Button only when children is left out, onActionPress is set and the tile has no onPress; without actionLabel the Button reads “Button”, and actionLabel on its own renders no button.  
  _From fact `/facts/props/5` (actionLabel, source types)_
- **recommended** `modes`: The tile passes its modes to whatever you put there, and your Button’s own modes win.  
  _From configuration: “The tile passes its modes to whatever you put there, and your Button’s own modes win.”_
- **recommended** `children`: A Button or IconButton in children starts at AppearanceBrand Secondary and Button / Size S; modes on the tile override those defaults, and the child’s own modes override the tile.  
  _From fact `/facts/props/4` (children, source types)_
- **recommended** AppearanceBrand, Emphasis, and Semantic Intent change only the action: the title, description, and meter keep their look.  
  _From configuration: “AppearanceBrand, Emphasis, and Semantic Intent change only the action: the title, description, and meter keep their look.”_
- **recommended** `chevron` = `true`: chevron adds a forward arrow at the end.  
  _From configuration: “chevron adds a forward arrow at the end.”_
- **recommended** `onPress`: For a row that opens something, set onPress with chevron and no action: onPress makes the whole row the one target.  
  _From doDont: “onPress makes the whole row the one target.”_
- **discouraged** `children`: Don’t put a Button in children when onPress is set: both press, and the Button sits inside the row’s button.  
  _From doDont: “Both press, and the Button sits inside the row’s button.”_
- **recommended** `confidence`: confidence shows how much data stands behind the block: High lights three green bars, Medium two orange, Low one red, and None, the default, three grey.  
  _From states: “confidence shows how much data stands behind the block: High lights three green bars, Medium two orange, Low one red, and None, the default, three grey.”_
- **recommended** `confidence`: A number from 0 to 1 picks the nearest level.  
  _From states: “A number from 0 to 1 picks the nearest level.”_
- **recommended** `confidence` = `null`: With children and confidence set to null and chevron left off (the default), the tile shows only text.  
  _From configuration: “children and confidence set to null: only text.”_
- **recommended** `disableTruncation` = `true`: By default the title and the description each stay on one line and end in …; disableTruncation lets both wrap.  
  _From fact `/facts/props/13` (disableTruncation, source types)_
- **recommended** The action’s own onPress does the work, such as opening the screen’s own view; the tile only lays out the row.  
  _From inContext: “See all opens the screen’s own spending view through the Button’s onPress; the tile only lays out the row.”_

## Content

- **recommended** Make the title the block’s name in a word or two, such as Spending, Bills, or Goals.  
  _From content: “Make the title the block’s name in a word or two, such as Spending, Bills, or Goals.”_
- **recommended** The description says what the block holds in one short line.  
  _From content: “The description says what the block holds in one short line”_
- **recommended** Label the action with a verb for the block, such as Set budget, Pay bills, or Add goal.  
  _From content: “Label the action with a verb for the block, such as Set budget, Pay bills, or Add goal.”_
- **recommended** `actionLabel`: Name the built-in Button with actionLabel: without it the Button reads “Button”.  
  _From fact `/facts/props/5` (actionLabel, source types)_

Good: “Goals”, “Save for a trip to Goa”, “Add goal”, “Bills”, “3 bills due this week”, “Pay bills”

Bad: “Button”

## States

| State | When | From |
| --- | --- | --- |
| High | confidence High: three green bars, enough data. | states: “Three green bars: enough data.” |
| Medium | confidence Medium: two orange bars. | states: “Two orange bars.” |
| Low | confidence Low: one red bar. | states: “One red bar.” |
| None | confidence None, the default: three grey bars, no data yet. | states: “Three grey bars: no data yet.” |
| Pressed | With onPress, the whole row is one button that dims while pressed. | states: “onPress makes the whole row one button that dims while pressed” |
| No disabled, selected or loading state | The tile has no disabled, selected, or loading state. | states: “The tile has no disabled, selected, or loading state.” |

## Accessibility

- **recommended** `accessibilityLabel`: The tile’s spoken name is its title unless you set accessibilityLabel.  
  _From fact `/facts/props/12` (accessibilityLabel, source types)_
- **recommended** `confidence`: The meter is read as an image named “Strength indicator: <Level> confidence”.  
  _From evidence: “Meter: `role=img`, "Strength indicator: <Level> confidence".”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| A chevron on a row that opens | A Button in a pressable row | Both press, and the Button sits inside the row’s button. |

## Examples

### Spending on the Money screen, the guide’s In context: the tile heads a card and the list under it is the block it introduces. See all does the work through its own onPress (the empty handler stands for opening the screen’s spending view). The tile carries no modes: on the installed package a Button in children starts at AppearanceBrand Secondary and Button / Size S. The guide’s MoneyValue amounts are left out because MoneyValue has no entry in this pack.

```tsx
<Card>
  <VStack>
    <SummaryTile title="Spending" description="Your top categories this month" confidence="High">
      <Button label="See all" onPress={() => {}} />
    </SummaryTile>
    <ListGroup>
      <ListItem layout="Horizontal" navArrow={false} title="Food" supportText="12 orders" />
      <ListItem layout="Horizontal" navArrow={false} title="Shopping" supportText="5 orders" />
      <ListItem layout="Horizontal" navArrow={false} title="Travel" supportText="3 trips" />
    </ListGroup>
  </VStack>
</Card>
```

_From inContext: “The tile heads a card, and the list under it is the block it introduces.”_

### A row that opens, the guide’s Do: chevron on and onPress on the whole row, with no action, so the row is the one target.

```tsx
<SummaryTile title="Insights" description="This month’s breakdown" confidence="High" chevron onPress={() => {}} />
```

_From doDont: “onPress makes the whole row the one target.”_

### Name the block, say what’s in it, use a verb, the guide’s Content: “Bills”, what’s due, and “Pay bills”. As in the In context example, the slotted Button needs no modes on the tile.

```tsx
<SummaryTile title="Bills" description="3 bills due this week" confidence="Low">
  <Button label="Pay bills" onPress={() => {}} />
</SummaryTile>
```

_From content: “Label the action with a verb for the block, such as Set budget, Pay bills, or Add goal.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `title` | `string` |  | `"Spending"` |  | evidence (2026-10-20) | 16 px, weight 700, drawn on a 20 px line (its token says 18). Declared: Bold heading shown at the top-left of the tile. Default "Spending", from the component source. |
| `description` | `string` |  | `"Know your spending and savings"` |  | evidence (2026-10-20) | 12 px, weight 500, on a 16 px line. Declared: Smaller supporting copy rendered beneath the title. Default "Know your spending and savings", from the component source. |
| `confidence` | `StrengthIndicatorConfidenceValue \| null` |  | `"None"` |  | evidence (2026-10-20) | A number is bucketed to the nearest level: above 5/6 High, above 1/2 Medium, above 1/6 Low, otherwise None. Declared: Confidence level for the inline `StrengthIndicator` next to the title. Defaults to `'None'` to match the Figma reference (all bars unlit). Pass `null` to hide the indicator entirely. Default "None", from the component source. |
| `chevron` | `boolean` |  | `false` |  | types | When `true`, render a trailing forward chevron (`NavArrow`) — the convention for "tap the tile to drill in" affordance. Defaults to `false`. Default false, from the component source. |
| `children` | `React.ReactNode` |  |  |  | types | Action slot rendered to the right of the text content. There is no default control — pass a `Button` / `IconButton` here, or use `actionLabel` / `onActionPress` for the built-in small secondary button. A slotted `Button` / `IconButton` starts at AppearanceBrand Secondary and Button / Size S. Modes on the tile override those defaults. The child's own `modes` override the tile. |
| `actionLabel` | `string` |  |  |  | types | Label for the built-in action button. Used only when `children` is omitted and `onActionPress` is set. Defaults to `'Button'` in that case. `actionLabel` on its own does not render a button. |
| `onActionPress` | `() => void` |  |  |  | types | Press handler for the built-in action button. When set (and `children` is omitted) the tile renders a small secondary button instead of a dead placeholder. |
| `onPress` | `() => void` |  |  |  | evidence (2026-10-20) | The row dims to 0.7 opacity while pressed. Declared: Optional press handler for the entire tile. When provided, the tile is wrapped in a `Pressable`, gets `accessibilityRole="button"` and the built-in action button is suppressed so the rendered HTML doesn't contain a `<button>` inside another `<button>`. Pair this with `chevron` for the navigational tile pattern. An explicit `children` node is still rendered — do not pass a `Button` there. |
| `modes` | `Modes` |  |  |  | evidence (2026-10-20) | The tile’s own tokens have one mode: an 8 px gap between the text and the action, no padding, 8 px between the title row and the description, and 4 px between the title and the meter. No mode changes them. Declared: Design token modes for theming (e.g. `{ 'Color Mode': 'Light' }`). |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Override container styles. |
| `titleStyle` | `StyleProp<TextStyle>` |  |  |  | types | Override the title text styles. |
| `descriptionStyle` | `StyleProp<TextStyle>` |  |  |  | types | Override the description text styles. |
| `accessibilityLabel` | `string` |  |  |  | types | Accessibility label override (defaults to `title`). |
| `disableTruncation` | `boolean` |  |  |  | types | When `true`, the title and description wrap instead of ellipsizing. By default both are clamped to one line. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Primary"` |  | types | A token collection SummaryTile reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `AppearanceSystem` | `mode collection` | positive, warning, negative | `"positive"` |  | types | A token collection SummaryTile reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / Size` | `mode collection` | M, S, XS | `"M"` |  | types | A token collection SummaryTile reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / State` | `mode collection` | Idle, Hover, Pressed, Disabled | `"Idle"` |  | types | A token collection SummaryTile reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection SummaryTile reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context` | `mode collection` | Default, Nudge&Alert, CTACard, ListItem | `"Default"` |  | types | A token collection SummaryTile reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 10` | `mode collection` | Default, jioPlus | `"Default"` |  | types | A token collection SummaryTile reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context2` | `mode collection` | Default, AppBar | `"Default"` |  | types | A token collection SummaryTile reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context5` | `mode collection` | Default, Fullscreen Modal, Mode 1 | `"Default"` |  | types | A token collection SummaryTile reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Emphasis` | `mode collection` | High, Medium, Low | `"High"` |  | types | A token collection SummaryTile reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `List Item Style` | `mode collection` | Default, Boxed, Minimal | `"Default"` |  | types | A token collection SummaryTile reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `NavArrow Direction` | `mode collection` | Left&Right, Top&Bottom | `"Left&Right"` |  | types | A token collection SummaryTile reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection SummaryTile reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Profile Card Appearance` | `mode collection` | Default, Premium | `"Default"` |  | types | A token collection SummaryTile reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Semantic Intent` | `mode collection` | Brand, System | `"Brand"` |  | types | A token collection SummaryTile reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types | Action slot rendered to the right of the text content. There is no default control — pass a `Button` / `IconButton` here, or use `actionLabel` / `onActionPress` for the built-in small secondary button. A slotted `Button` / `IconButton` starts at AppearanceBrand Secondary and Button / Size S. Modes on the tile override those defaults. The child's own `modes` override the tile. |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onActionPress` | `() => void` |  |  |  | types | Press handler for the built-in action button. When set (and `children` is omitted) the tile renders a small secondary button instead of a dead placeholder. |
| `onPress` | `() => void` |  |  |  | types | Optional press handler for the entire tile. When provided, the tile is wrapped in a `Pressable`, gets `accessibilityRole="button"` and the built-in action button is suppressed so the rendered HTML doesn't contain a `<button>` inside another `<button>`. Pair this with `chevron` for the navigational tile pattern. An explicit `children` node is still rendered — do not pass a `Button` there. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- The published Storybook page is still the older generated one. _(evidence, 2026-10-20)_
- The title’s line is 20 px where Figma’s is 18, so a one-line tile is 44 px tall, not 42. _(evidence, 2026-10-20)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `(whole entry)` · human: The guide and its evidence were checked on 20 October on 0.1.78-c7d3348 and not re-checked on the installed build, dbe0e02, which changed SummaryTile for #352: children left out shows no action (no placeholder Button), onActionPress with actionLabel adds the built-in small secondary Button, a Button or IconButton in children is AppearanceBrand Secondary and Button / Size S without modes on the tile, the description stays on one line and ends in … like the title (disableTruncation lets both wrap), and a tile without onPress is named by its title. This entry follows the installed package and leaves out the guide sentences dbe0e02 contradicts (listed in its notes): the placeholder Button (Configuration, States, the Your own Button pair, Sources), setting AppearanceBrand Secondary and Button / Size S on the tile (Configuration, the Modes on the tile pair, Sources), the description that wraps and never truncates (Anatomy, Sizing, Content), and disableTruncation affecting only the title and the static tile not announced by its title (Sources). Re-extract once #352 is closed and the guide is re-checked and published. Added by Claude Code in the overnight run agentpack-batch11, for Marcin to confirm.
