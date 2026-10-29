# Dropdown (brief)

> Coin agent pack 0.1.78+15 · flagged · full entry: `components/dropdown.md` (sources, all facts, flags)

Use a Dropdown as the floating panel for a short list of choices or actions that opens from a button or field.

**Use when**
- As the floating panel for a short list of choices or actions that opens from a button or field.
- For example, a menu from an overflow (More) button, with actions such as Download statement, Share statement and Report a problem.

**Avoid when**
- Avoid: A form field that opens a list of options: for form fields, DropdownInput opens, closes and places the Dropdown. Use instead: DropdownInput.

**Placement**
- Keep it a short, scannable list; the screen decides when it opens and where it sits.
- Dropdown draws the panel and its items; opening, closing and placing it are handled by the screen, or by DropdownInput for form fields.
- For a menu from an overflow button, the screen opens the Dropdown when the More button is pressed, places it under the button, and closes it after a choice; Dropdown itself only draws the panel.
- The screen sets the panel's width (in the guide, a width on the Dropdown's style: 240, or 220 for the menu); the items fill it.

**Key rules**
- `DropdownItem.label`: Each item is a DropdownItem: it takes a label and an optional leading icon.
- `DropdownItem.label`: A list of labels alone is the simplest list, for choices people know by name.
- `DropdownItem.leading`: Add a leading icon (an Icon in leading) when it helps people scan similar items.
- `DropdownItem.label`: Labels stay on one line and end in an ellipsis when they run out of room.
- `maxHeight`: Set a maximum height (maxHeight) when the list is long so the panel scrolls instead of growing.
- `maxHeight`: With maxHeight, the panel stays the same height and the list scrolls inside it.
- Avoid: `maxHeight`: Don't let a long list grow without a max height: in the guide, twelve items push the panel far past the screen.
- `DropdownItem.selected`: Mark the current choice as selected (selected on its DropdownItem): it gets a grey fill and a check.

**Example:** The guide's In context, shown open: a menu from an overflow button on a statement row. The screen opens the Dropdown when the More button is pressed, places it under the button, and closes it after a choice; Dropdown only draws the panel. Each item's onPress runs its action.

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

**Props:** `children`, `maxHeight`, `modes`, `style`, `accessibilityLabel`, `nativeID`, `focusable`, `activeDescendantId`, `DropdownItem.label`, `DropdownItem.leading`, `DropdownItem.trailing`, `DropdownItem.selected`, `DropdownItem.disabled`, `DropdownItem.onPress`. (* required)

**Modes it reads:** Dropdown Item State.

**Gaps (report, do not work around)**
- A standalone Dropdown has no arrow-key navigation: arrow keys don’t move between options (Tab, Enter and Space do). Inside DropdownInput the field handles the keyboard.
- Hover and press use the same grey as selected, so a hovered item looks selected: there is no separate hover or pressed colour.

Full entry: `components/dropdown.md`. Links: `components/dropdown.links.md`.
