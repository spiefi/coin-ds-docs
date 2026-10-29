# Dropdown

> Coin agent pack 0.1.78+14 (pilot). Generated from `components/dropdown.json`; the JSON is the source of truth.

- **State:** flagged (4 flags, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `889444e` · built 2026-10-29T05:38:55Z
- **Category:** input (for discovery only, not a limit on composition) · **Tags:** popover, menu, flyout, options list, panel
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=dropdown) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3087-4266) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-dropdown--docs)

Use a Dropdown as the floating panel for a short list of choices or actions that opens from a button or field.

## Use when

- **recommended** As the floating panel for a short list of choices or actions that opens from a button or field.  
  _From summary: “Use a Dropdown as the floating panel for a short list of choices or actions that opens from a button or field.”_
- **recommended** For example, a menu from an overflow (More) button, with actions such as Download statement, Share statement and Report a problem.  
  _From inContext: “A menu from an overflow button”_

## Avoid when

- **discouraged** A form field that opens a list of options: for form fields, DropdownInput opens, closes and places the Dropdown. Use instead: `DropdownInput`.  
  _From sources: “opening, closing, and placing it are handled by the screen, or by Dropdown Input for form fields.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Panel | Rounded surface with a soft shadow that floats over content; it holds the items, each a DropdownItem (children). | yes | anatomy: “Rounded surface with a soft shadow that floats over content.” |
| Item | One choice or action in one line: a DropdownItem with a label and an optional leading icon. | yes | anatomy: “One choice or action in one line.” |
| Selected item | Grey fill and a check mark the current choice (selected on its DropdownItem). | no | anatomy: “Grey fill and a check mark the current choice.” |
| Check | Appears on the selected item unless it has its own trailing content (trailing on its DropdownItem). | no | anatomy: “Appears on the selected item unless it has its own trailing content.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `children` | `ReactNode` | types |

## Placement

- **recommended** Keep it a short, scannable list; the screen decides when it opens and where it sits.  
  _From corePrinciple: “A short, scannable list; the screen decides when it opens and where it sits.”_
- **recommended** Dropdown draws the panel and its items; opening, closing and placing it are handled by the screen, or by DropdownInput for form fields.  
  _From sources: “Dropdown draws the panel and its items; opening, closing, and placing it are handled by the screen, or by Dropdown Input for form fields.”_
- **recommended** For a menu from an overflow button, the screen opens the Dropdown when the More button is pressed, places it under the button, and closes it after a choice; Dropdown itself only draws the panel.  
  _From inContext: “The screen opens the Dropdown when the More button is pressed, places it under the button, and closes it after a choice. Dropdown only draws the panel.”_
- **recommended** The screen sets the panel's width (in the guide, a width on the Dropdown's style: 240, or 220 for the menu); the items fill it.  
  _From sizing: “The screen sets the width”_
- **recommended** Items are 43 px tall and fill the panel’s width. ⚑ flagged (human)  
  _From sizing: “Items are 43 px tall and fill the panel’s width.”_

## Configuration

- **recommended** `DropdownItem.label`: Each item is a DropdownItem: it takes a label and an optional leading icon.  
  _From configuration: “Items take a label and an optional leading icon.”_
- **recommended** `DropdownItem.label`: A list of labels alone is the simplest list, for choices people know by name.  
  _From configuration: “The simplest list, for choices people know by name.”_
- **recommended** `DropdownItem.leading`: Add a leading icon (an Icon in leading) when it helps people scan similar items.  
  _From configuration: “Icons help people scan similar items.”_
- **recommended** `DropdownItem.label`: Labels stay on one line and end in an ellipsis when they run out of room.  
  _From sizing: “Labels stay on one line and end in an ellipsis when they run out of room.”_
- **recommended** `maxHeight`: Set a maximum height (maxHeight) when the list is long so the panel scrolls instead of growing.  
  _From configuration: “Set a maximum height when the list is long so the panel scrolls instead of growing.”_
- **recommended** `maxHeight`: With maxHeight, the panel stays the same height and the list scrolls inside it.  
  _From configuration: “The panel stays the same height and the list scrolls.”_
- **discouraged** `maxHeight`: Don't let a long list grow without a max height: in the guide, twelve items push the panel far past the screen.  
  _From doDont: “Twelve items push the panel far past the screen.”_
- **recommended** `DropdownItem.selected`: Mark the current choice as selected (selected on its DropdownItem): it gets a grey fill and a check.  
  _From states: “Mark the current choice as selected”_
- **discouraged** `DropdownItem.selected`: In a single-choice list, mark one current choice: two checks make the current choice unclear.  
  _From doDont: “Two checks make the current choice unclear.”_
- **recommended** `DropdownItem.disabled`: Dim options that are temporarily unavailable (disabled on their DropdownItem): they cannot be pressed or focused.  
  _From states: “dim options that are temporarily unavailable.”_

## Content

- **recommended** `DropdownItem.label`: Start each label with the key word: put the word that tells items apart first.  
  _From content: “Put the word that tells items apart first”_
- **recommended** `DropdownItem.label`: Keep labels to a few words, so every label reads in full.  
  _From content: “keep labels to a few words”_
- **recommended** `DropdownItem.label`: Use the same form for every item, such as all actions (Download statement, Share statement) or all choices (Savings account, Checking account).  
  _From content: “use the same form for every item.”_
- **discouraged** `DropdownItem.label`: Don't write long labels: they are cut off, hiding what tells them apart.  
  _From doDont: “Long labels are cut off, hiding what tells them apart.”_

Good: “Download statement”, “Share statement”, “Report a problem”, “Savings account”, “Checking account”, “Brokerage account”, “Recurring deposit”

Bad: “Savings account for household expenses”, “Savings account for holiday travel”, “Savings account for emergencies”

## States

| State | When | From |
| --- | --- | --- |
| Selected | The current choice (selected): grey fill plus a check. | states: “Grey fill plus a check.” |
| Disabled item | An option that is temporarily unavailable (disabled): the item is dimmed and cannot be pressed or focused. | states: “The unavailable item is dimmed and cannot be pressed or focused.” |
| Hover and pressed | Hover and press use the same grey as selected. | states: “Hover and press use the same grey as selected.” |

## Accessibility

- **recommended** On the web the panel is a listbox of options, and the selected item is announced as selected.  
  _From sources: “On the web the panel is a listbox of options and the selected item is announced as selected.”_
- **recommended** On its own, Tab moves from option to option, skipping disabled ones, and Enter or Space picks one; arrow keys don’t move between options.  
  _From sources: “On its own, Tab moves from option to option, skipping disabled ones, and Enter or Space picks one; arrow keys don’t move between options.”_
- **recommended** Inside DropdownInput, the field handles the keyboard.  
  _From sources: “Inside Dropdown Input, the field handles the keyboard.”_
- **recommended** `accessibilityLabel`: accessibilityLabel names the panel (the listbox); the guide names each list, such as “Accounts” or “Statement actions”.  
  _From fact `/facts/props/4` (accessibilityLabel, source types)_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Mark the one current choice | Mark several choices in a single-choice list | Two checks make the current choice unclear. |
| Keep labels short | Write long labels | Long labels are cut off, hiding what tells them apart. |
| Scroll a long list | Let a long list grow | Twelve items push the panel far past the screen. |

## Examples

### The guide's In context, shown open: a menu from an overflow button on a statement row. The screen opens the Dropdown when the More button is pressed, places it under the button, and closes it after a choice; Dropdown only draws the panel. Each item's onPress runs its action.

```tsx
<Card>
  <HStack alignVertical="center" justifyHorizontal="space-between">
    <Text>September statement</Text>
    <IconButton iconName="ic_more_vertical" accessibilityLabel="More actions" onPress={() => {}} />
  </HStack>
  <Dropdown accessibilityLabel="Statement actions" style={{ width: 220 }}>
    <DropdownItem label="Download statement" onPress={() => {}} />
    <DropdownItem label="Share statement" onPress={() => {}} />
    <DropdownItem label="Report a problem" onPress={() => {}} />
  </Dropdown>
</Card>
```

_From inContext: “The screen opens the Dropdown when the More button is pressed, places it under the button, and closes it after a choice.”_

### Choices: four accounts whose labels start with the word that tells them apart, with the one current choice marked selected (grey fill and a check). Pressing an item lets the screen change the choice.

```tsx
<Dropdown accessibilityLabel="Accounts" style={{ width: 240 }}>
  <DropdownItem label="Savings account" selected onPress={() => {}} />
  <DropdownItem label="Checking account" onPress={() => {}} />
  <DropdownItem label="Brokerage account" onPress={() => {}} />
  <DropdownItem label="Recurring deposit" onPress={() => {}} />
</Dropdown>
```

_From doDont: “One check shows what is chosen.”_

### A scrolling list: twelve options with a maximum height (maxHeight 180), so the panel stays the same height and the list scrolls instead of growing.

```tsx
<Dropdown accessibilityLabel="Options" maxHeight={180} style={{ width: 240 }}>
  <DropdownItem label="Option 1" onPress={() => {}} />
  <DropdownItem label="Option 2" onPress={() => {}} />
  <DropdownItem label="Option 3" onPress={() => {}} />
  <DropdownItem label="Option 4" onPress={() => {}} />
  <DropdownItem label="Option 5" onPress={() => {}} />
  <DropdownItem label="Option 6" onPress={() => {}} />
  <DropdownItem label="Option 7" onPress={() => {}} />
  <DropdownItem label="Option 8" onPress={() => {}} />
  <DropdownItem label="Option 9" onPress={() => {}} />
  <DropdownItem label="Option 10" onPress={() => {}} />
  <DropdownItem label="Option 11" onPress={() => {}} />
  <DropdownItem label="Option 12" onPress={() => {}} />
</Dropdown>
```

_From configuration: “The panel stays the same height and the list scrolls.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types | Dropdown items, typically `<DropdownItem />` children. |
| `maxHeight` | `number` |  |  |  | types | Maximum height of the popup before its content becomes scrollable. Defaults to no limit. |
| `modes` | `Modes` |  |  |  | types | Modes for design token resolution. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Style overrides for the popup container. |
| `accessibilityLabel` | `string` |  |  |  | types | Accessibility label for the menu surface. |
| `nativeID` | `string` |  |  |  | types | DOM id so the open menu can be focused and referenced. |
| `focusable` | `boolean` |  | `false` |  | types | When true on web, the listbox is a tab stop (tabIndex 0) so a modal focus trap lands on the menu instead of a backdrop. Default false, from the component source. |
| `activeDescendantId` | `string` |  |  |  | types | Id of the keyboard-highlighted option (`aria-activedescendant`). |
| `DropdownItem.label` ⚑ flagged (trace-check) | `string` |  |  |  | evidence (2026-09-28) | On DropdownItem: the item's text, on one line; a long label is cut with an ellipsis. |
| `DropdownItem.leading` ⚑ flagged (trace-check) | `React.ReactNode` |  |  |  | evidence (2026-09-28) | On DropdownItem: content before the label, such as an Icon; a registry icon shows at 18 px in the brand gold when no colour is given. |
| `DropdownItem.trailing` ⚑ flagged (trace-check) | `React.ReactNode` |  |  |  | evidence (2026-09-28) | On DropdownItem: content after the label; when set, it replaces the selected item's check. |
| `DropdownItem.selected` | `boolean` |  |  |  | evidence (2026-10-01) | On DropdownItem: marks the current choice; on the web the option has aria-selected=true, so it is announced as selected. |
| `DropdownItem.disabled` | `boolean` |  |  |  | evidence (2026-10-08) | On DropdownItem: in a standalone Dropdown on the web, enabled options are tab stops (tabindex 0) and a disabled option leaves the tab order (tabindex -1). |
| `DropdownItem.onPress` | `(value) => void` |  |  |  | evidence (2026-10-13) | On DropdownItem: the press handler. In a standalone Dropdown, Enter and Space each call it once (#209 fixed), so an action item runs once. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Dropdown Item State` | `mode collection` | Idle, Selected | `"Idle"` |  | types | A token collection Dropdown reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types | Dropdown items, typically `<DropdownItem />` children. |

### Events

_No events._

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- A standalone Dropdown has no arrow-key navigation: arrow keys don’t move between options (Tab, Enter and Space do). Inside DropdownInput the field handles the keyboard. _(evidence, 2026-10-13)_
- Hover and press use the same grey as selected, so a hovered item looks selected: there is no separate hover or pressed colour. _(evidence, 2026-10-01)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/facts/props/8` · trace-check: Checked on jfs-components 0.1.60 (2026-09-28); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/props/9` · trace-check: Checked on jfs-components 0.1.60 (2026-09-28); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/props/10` · trace-check: Checked on jfs-components 0.1.60 (2026-09-28); the installed package is 0.1.78. Re-check before relying on it.
- `/placementAdvice/4` · human: "Items are 43 px tall" is Figma's number: the guide's own size marks read 240 × 44 for one item, and in the installed Dropdown.tsx (0.1.78-dbe0e02, read from source) safeTextLineHeight raises the label line to 20 px, so an item is 44 px. Guide fix #523. Added by Claude Code in the overnight run agentpack-batch6, for Marcin to confirm.
