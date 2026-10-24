# Tabs

> Coin agent pack 0.1.78+3 (pilot). Generated from `components/tabs.json`; the JSON is the source of truth.

- **State:** documented
- **Package:** jfs-components 0.1.78 · guide commit `622cd82` · built 2026-10-24T12:04:18Z
- **Category:** navigation (for discovery only, not a limit on composition) · **Tags:** tab bar, sub-navigation, views
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=tabs) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3063-136) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-tabs--docs)

Use Tabs to switch between a few peer views of the same content, such as an account’s overview, activity, and details.

## Use when

- **recommended** Switch between a few peer views of the same content, such as an account’s overview, activity and details.  
  _From summary: “Use Tabs to switch between a few peer views of the same content, such as an account’s overview, activity, and details.”_

## Avoid when

- **discouraged** The choices do something, such as “Pay” and “Cancel”: use Buttons, not tabs. Use instead: `Button`.  
  _From doDont: ““Pay” and “Cancel” do something; use Buttons.”_
- **discouraged** A tab needs a disabled or loading state: Tabs has neither.  
  _From states: “Tabs has no disabled or loading state.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Tab row | The tabs, in one row, 16 px apart. | yes | anatomy: “Holds the tabs in one row, 16 px apart.” |
| Selected tab | A black label: the view on screen now. | no | anatomy: “Black label: the view on screen now.” |
| Underline | A 2 px gold bar under the selected tab only. | no | anatomy: “2 px gold bar under the selected tab only.” |
| Idle tab | A grey label: another view, one tap away. | no | anatomy: “Grey label: another view, one tap away.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `children` | `ReactNode` | types |

## Placement

- **recommended** Show the selected tab’s view below the row; the screen keeps the selected tab.  
  _From inContext: “The screen keeps the selected tab and shows that view below the row.”_
- **recommended** When another tab is pressed, the screen swaps the panel; the tabs only report the press.  
  _From inContext: “Pressing another tab swaps the panel; the tabs only report the press.”_
- **recommended** Tabs stretches to the width of its container; each tab is as wide as its label, with 16 px between tabs.  
  _From sizing: “Tabs stretches to the width of its container.”_

## Configuration

- **REQUIRED** `children`: Pass the tabs as TabItem children: children is required, and each child should be a TabItem.  
  _From fact `/facts/props/0` (children, source evidence)_
- **recommended** `children`: Put each TabItem directly inside Tabs: Tabs passes its modes to direct TabItem children, and does not recognise wrappers or fragments around them.  
  _From evidence: “Wrappers and Fragments around TabItems are not recognised.”_
- **recommended** `modes`: Set modes on Tabs: they reach its direct TabItem children (not through wrappers or Fragments), and a TabItem's own modes win.  
  _From fact `/facts/props/1` (modes, source evidence)_
- **recommended** `scrollable` = `true`: Turn on scrollable when the labels don’t fit, so the row scrolls sideways.  
  _From configuration: “Turn on scrollable when the labels don’t fit, so the row scrolls sideways.”_
- **discouraged** `scrollable` = `false`: Do not squeeze a long set, such as six filters, into a row that doesn’t scroll: every label shrinks and ends in an ellipsis, even “All”.  
  _From doDont: “Every label shrinks and ends in an ellipsis, even “All”.”_
- **recommended** Keep track of the selected tab on the screen: mark that TabItem active, and move the mark when another tab is pressed.  
  _From states: “The screen keeps track of the selected tab: it marks that tab active and moves the mark when another tab is pressed.”_
- **recommended** Select exactly one tab: one underline says which view is showing.  
  _From doDont: “One underline says which view is showing.”_
- **discouraged** Do not mark two tabs active: only the first is underlined, which may not be the view that’s showing.  
  _From doDont: “Only the first is underlined, which may not be the view that’s showing.”_

## Content

- **recommended** A few peer views, exactly one selected, and the content below follows it.  
  _From corePrinciple: “A few peer views, exactly one selected, and the content below follows it.”_
- **recommended** Name each view in a word or two.  
  _From content: “Name each view in a word or two”_
- **recommended** Write labels as short nouns in sentence case that name the view, such as “Overview” or “Activity”.  
  _From content: “Labels are short nouns in sentence case that name the view, such as “Overview” or “Activity”.”_
- **discouraged** Don’t number tabs or write actions.  
  _From content: “Don’t number tabs or write actions.”_

Good: “Overview”, “Activity”, “Details”, “All”, “Sent”, “Received”, “Pending”, “Failed”, “Refunded”

Bad: “Pay”, “Cancel”, “Tab 1”, “Tab 2”, “Tab 3”

## States

| State | When | From |
| --- | --- | --- |
| First tab selected | The screen opens on the summary view, with the first tab marked active. | states: “Open on the summary view.” |
| Another tab selected | After a press, the screen marks the pressed tab active: the black label and underline move to it. | states: “The black label and underline move to the pressed tab.” |

## Accessibility

- **recommended** `accessibilityLabel`: On the web the row is a tab list named by its accessibilityLabel, and each tab is announced by its label and whether it is selected.  
  _From sources: “On the web the row is a tab list named by its accessibility label, and each tab is announced by its label and whether it is selected”_
- **recommended** Only the selected tab is in the Tab order, or the first tab when none is selected; Space, Enter, the arrow keys, Home and End select tabs.  
  _From sources: “Only the selected tab is in the Tab order, or the first tab when none is selected; Space, Enter, the arrow keys, Home, and End select tabs.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Switch between peer views | Use tabs as actions | “Pay” and “Cancel” do something; use Buttons. |
| Select exactly one tab | Select two tabs | Only the first is underlined, which may not be the view that’s showing. |
| Scroll a long set | Squeeze six tabs into one row | Every label shrinks and ends in an ellipsis, even “All”. |
| Name each view | Number the tabs | “Tab 1”, “Tab 2”, and “Tab 3” say nothing about the view. |

## Examples

### Account views in one row, with the screen marking the selected tab active.

```tsx
<Tabs modes={{ 'Color Mode': 'Light' }}>
  <TabItem label="Overview" active onPress={() => {}} />
  <TabItem label="Activity" onPress={() => {}} />
  <TabItem label="Details" onPress={() => {}} />
</Tabs>
```

_From inContext: “The screen keeps the selected tab and shows that view below the row.”_

### Six filters in a scrollable row: each tab hugs its label and the row scrolls sideways.

```tsx
<Tabs scrollable modes={{ 'Color Mode': 'Light' }}>
  <TabItem label="All" active onPress={() => {}} />
  <TabItem label="Sent" onPress={() => {}} />
  <TabItem label="Received" onPress={() => {}} />
  <TabItem label="Pending" onPress={() => {}} />
  <TabItem label="Failed" onPress={() => {}} />
  <TabItem label="Refunded" onPress={() => {}} />
</Tabs>
```

_From doDont: “Six filters hug their labels and scroll.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  | yes | evidence (2026-10-05) | Tabs recognises only direct TabItem children; wrappers and fragments around TabItems are not recognised, so they miss the row's modes. Declared: Tab item children. Each child should be a <TabItem> component. Modes are automatically forwarded to all TabItem children. |
| `modes` | `Modes` |  |  |  | evidence (2026-10-05) | Merged under each direct TabItem child's own modes; the item's modes win. Declared: Design token modes for theming. |
| `scrollable` | `boolean` |  | `false` |  | evidence (2026-10-05) | Makes the row a horizontal scroll view: tabs hug their labels 16 px apart, and the row scrolls sideways with no scrollbar or edge hint. Declared: When true, the tabs row scrolls horizontally (useful for many items). Default false, from the component source. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | evidence (2026-10-05) | With scrollable, style lands on the content container, not the viewport. Declared: Override container styles. |
| `accessibilityLabel` | `string` |  |  |  | evidence (2026-10-13) | Names the tab list on the web. Declared: Accessible name for the tab row. |
| `testID` | `string` |  |  |  | evidence (2026-10-08) | Works since the 636f3f5 build (the 5 October check found none). Declared: Test identifier. |

### Modes

_No modes._

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types | Tab item children. Each child should be a <TabItem> component. Modes are automatically forwarded to all TabItem children. |

### Events

_No events._

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- The active label stays black in Dark mode (#197, To do); the guide shows Light only. _(evidence, 2026-10-05)_
- A scrollable row has no scrollbar or edge hint. _(evidence, 2026-10-05)_
- Tabs has no disabled or loading prop. _(evidence, 2026-10-05)_
- No hover style: pressing dims a tab to 70% opacity. _(evidence, 2026-10-05)_

## Flags

_None._
