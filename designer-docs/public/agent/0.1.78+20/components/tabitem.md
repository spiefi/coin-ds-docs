# TabItem

> Coin agent pack 0.1.78+20 (pilot). Generated from `components/tabitem.json`; the JSON is the source of truth.

- **State:** documented
- **Package:** jfs-components 0.1.78 · guide commit `622cd82` · built 2026-10-31T00:24:09Z
- **Category:** navigation (for discovery only, not a limit on composition) · **Tags:** tab, tab label
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=tabitem) · [Figma](https://www.figma.com/design/dSlK8ueQ7wlbyUSZd4f8QO/Coin-Subcomponents?node-id=66-913) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/tabs-tabitem--docs)

Use a Tab Item inside Tabs for each view: a short label that turns black with a gold underline while its view is showing.

## Use when

- **recommended** Use a Tab Item inside Tabs for each view: a short label that turns black with a gold underline while its view is showing.  
  _From summary: “Use a Tab Item inside Tabs for each view: a short label that turns black with a gold underline while its view is showing.”_

## Avoid when

- **discouraged** On its own, outside Tabs: a lone Tab Item stretches across its container with no row around it. Use it inside Tabs. Use instead: `Tabs`.  
  _From doDont: “A lone Tab Item stretches across its container with no row around it.”_
- **discouraged** The tab would do something, such as “Download”: it sounds like a button, but tabs only switch views.  
  _From doDont: ““Download” sounds like a button, but tabs only switch views.”_
- **discouraged** The tab needs a disabled state: there is none.  
  _From states: “There is no disabled state.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Selected tab | The tab whose view is on screen now (active). | no | anatomy: “Its view is on screen now.” |
| Underline | A 2 px gold bar across the tab's full width, shown only while the tab is selected. | no | anatomy: “Shown only while the tab is selected.” |
| Label | The label text, which names the view in a word or two. | yes | anatomy: “Names the view in a word or two.” |
| Idle tab | A tab that is not active: grey until someone presses it. | no | anatomy: “Grey until someone presses it.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

_No slots._

## Placement

- **REQUIRED** Always place a Tab Item inside Tabs.  
  _From corePrinciple: “One view, one short label, and always inside Tabs.”_
- **recommended** Tabs places the tabs 16 px apart; a Tab Item is as wide as its label.  
  _From sizing: “It is as wide as its label; Tabs places the tabs 16 px apart.”_

## Configuration

- **recommended** `label`: Set label to name the view; the label is also what screen readers say.  
  _From configuration: “The label is also what screen readers say.”_
- **recommended** `badge`: Set badge when a view needs a count: it shows the counter badge from Figma.  
  _From configuration: “when a view needs a count, the counter badge from Figma”_
- **recommended** `active` = `true`: Set active on the tab whose view is showing: the screen marks it, and a Tab Item never selects itself.  
  _From states: “The screen marks the tab whose view is showing as active; a Tab Item never selects itself.”_
- **recommended** `active`: Mark one tab active: one underline shows the current view.  
  _From doDont: “One underline shows the current view.”_
- **discouraged** `active`: Do not mark two tabs active: only the first is underlined, which may not be the view that’s showing.  
  _From doDont: “Only the first is underlined, which may not be the view that’s showing.”_
- **recommended** `onPress`: Handle onPress on each tab: the screen marks one active and swaps the panel when another is pressed.  
  _From inContext: “The screen marks one active and swaps the panel when another is pressed”_

## Content

- **recommended** `label`: Name the view in one or two words.  
  _From content: “One or two words that name the view”_
- **recommended** `label`: Write a noun in sentence case, such as “Statements”.  
  _From content: “Write a noun in sentence case, such as “Statements”.”_
- **discouraged** `label`: Don’t write actions like “Download” or long phrases.  
  _From content: “Don’t write actions like “Download” or long phrases”_
- **recommended** `accessibilityLabel`: When a label must be abbreviated, give the tab a spoken name with accessibilityLabel.  
  _From content: “when a label must be abbreviated, give the tab a spoken name.”_

Good: “Statements”, “Overview”, “Activity”, “Details”

Bad: “Download”

## States

| State | When | From |
| --- | --- | --- |
| Idle | active is false (the default): grey label, no underline. | states: “Grey label, no underline.” |
| Active | active is true, set by the screen for the view that is showing: black label and a gold underline across the tab. | states: “Black label and a gold underline across the tab.” |
| Pressed | While pressed: the tab dims to 70% until release. | states: “Pressing dims it to 70% until release.” |

## Accessibility

- **recommended** `accessibilityLabel`: Give an abbreviated label a full spoken name with accessibilityLabel, such as AY24 as “Assessment year 2024”.  
  _From configuration: “Short labels such as AY24 get a full spoken name: “Assessment year 2024”.”_
- **recommended** `accessibilityLabel`: On the web a tab is announced by its label or spoken name and whether it is selected.  
  _From sources: “On the web a tab is announced by its label or spoken name and whether it is selected.”_
- **recommended** Only the selected tab is in the Tab order, or the first one when none is selected, and a Tab Item on its own is always reachable; Enter and Space select a tab, and the arrow keys move between tabs.  
  _From sources: “Only the selected tab is in the Tab order, or the first one when none is selected, and a Tab Item on its own is always reachable; Enter and Space select a tab, and the arrow keys move between tabs.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Use it inside Tabs | Place one on its own | A lone Tab Item stretches across its container with no row around it. |
| Mark one tab active | Mark two tabs active | Only the first is underlined, which may not be the view that’s showing. |
| Name the view | Write an action | “Download” sounds like a button, but tabs only switch views. |

## Examples

### Tax years over one panel: abbreviated labels, each with a spoken name, and the showing year marked active.

```tsx
<Tabs modes={{ 'Color Mode': 'Light' }}>
  <TabItem label="AY24" accessibilityLabel="Assessment year 2024" onPress={() => {}} />
  <TabItem label="AY25" accessibilityLabel="Assessment year 2025" active onPress={() => {}} />
  <TabItem label="AY26" accessibilityLabel="Assessment year 2026" onPress={() => {}} />
</Tabs>
```

_From inContext: “the abbreviated labels each have a spoken name.”_

### Two views named by nouns, one active, inside a Tabs row.

```tsx
<Tabs modes={{ 'Color Mode': 'Light' }}>
  <TabItem label="Overview" active onPress={() => {}} />
  <TabItem label="Statements" onPress={() => {}} />
</Tabs>
```

_From doDont: ““Statements” says what the panel shows.”_

### A view that needs a count, with the counter badge.

```tsx
<Tabs modes={{ 'Color Mode': 'Light' }}>
  <TabItem label="Overview" active onPress={() => {}} />
  <TabItem label="Activity" badge={3} onPress={() => {}} />
</Tabs>
```

_From configuration: “when a view needs a count, the counter badge from Figma”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `label` | `string` |  | `"Tab item"` |  | types | Label text to display. Default "Tab item", from the component source. |
| `active` | `boolean` |  | `false` |  | evidence (2026-10-08) | Set by the screen; a Tab Item never selects itself. In a row with two active items, the second is ignored: only the first is selected. Declared: Whether this tab item is currently active/selected. Default false, from the component source. |
| `onPress` | `() => void` |  |  |  | evidence (2026-10-13) | Enter and Space each call it once (#209 fixed). Declared: Callback when this tab item is pressed. |
| `modes` | `Modes` |  |  |  | evidence (2026-10-05) | Inside Tabs, a Tab Item receives the row's modes; its own modes win. Declared: Design token modes for theming. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Override container styles. |
| `labelStyle` | `StyleProp<TextStyle>` |  |  |  | types | Override label text styles. |
| `accessibilityLabel` | `string` |  |  |  | evidence (2026-10-05) | Becomes the tab's accessible name on the web; without it, the label names the tab. Declared: Accessibility label for screen readers. |
| `badge` | `string \| number` |  |  |  | evidence (2026-10-08) | Shows a CounterBadge beside the label. Declared: Optional counter shown beside the label. Matches the Figma tab badge. |
| `testID` | `string` |  |  |  | evidence (2026-10-08) | Works since the 636f3f5 build (the 5 October check found none). Declared: Test identifier. |
| `truncateLabel` | `boolean` |  | `false` |  | types | Set by Tabs on a non-scrollable row so a long label ellipsizes instead of pushing the last tab outside the row. Standalone items keep hugging. Default false, from the component source. |
| `isTabStop` | `boolean` |  |  |  | types | Set by Tabs. When omitted, a standalone item stays in the tab order. Inside a row, only the active tab (or the first tab when none is active) is true. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection TabItem reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

_No slots._

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onPress` | `() => void` |  |  |  | types | Callback when this tab item is pressed |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- The active label stays black in Dark mode (#197, To do); the guide shows Light only. _(evidence, 2026-10-05)_
- No disabled state, icon or href. _(evidence, 2026-10-05)_
- No hover or focus style of its own; keyboard focus shows the browser's ring. _(evidence, 2026-10-05)_

## Flags

_None._
