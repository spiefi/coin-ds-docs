# DropdownMenu (brief)

> Coin agent pack 0.1.78+25 · flagged · full entry: `components/dropdownmenu.md` (sources, all facts, flags)

Use a Dropdown Menu for a short list of actions that opens from a button, such as an overflow or account menu.

**Use when**
- A short list of actions that opens from a button, such as an overflow or account menu.
- Actions, not answers.
- An overflow menu on a card, as in the guide's In context.

**Avoid when**
- Avoid: Choosing a form value: use Dropdown Input. Use instead: DropdownInput.
- Avoid: Picking a form value, such as an account: account names in a menu have no label, value or error to go with them.

**Placement**
- In the guide's overflow menu, the screen opens the menu from the More button, places it under the button, and closes it after an action.
- Dropdown Menu only draws the panel.
- Dropdown Menu draws the panel and rows; opening, placing and closing it, and which row is selected, belong to the screen.
- The screen sets the menu’s width (the guide's menus are 256 px wide); rows fill it.

**Key rules**
- `DropdownMenu.Item`: Each row is a DropdownMenu.Item in the menu's children.
- `DropdownMenu.Item`: Choose what each row shows: avatars suit people and accounts, icons suit actions, and plain labels suit short lists.
- `DropdownMenu.Item`: Actions with icons: an Icon in each row's leading helps people spot an action quickly.
- `DropdownMenu.Item`: Labels only, with no leading visual: the lightest menu, for two or three actions.
- `DropdownMenu.Item`: People and accounts: avatar rows, the Figma default, for switching between people or accounts.
- `DropdownMenu.Item`: The default leading Avatar is a sample photo: replace it with a real avatar or an icon.
- `DropdownMenu.Item.showTrailing`: Add a chevron only when a row opens another screen or menu.
- `maxHeight`: A long menu scrolls inside the panel: set maxHeight.

**Example:** The guide's In context, an overflow menu on a statement card, with the menu open under the card's More button. The rows are the guide's Actions with icons menu: each has an Icon and no chevron (showTrailing false), since each row acts in place. The More button's onPress stands for the screen opening the menu, and each row's onPress for running that action and closing the menu; Dropdown Menu only draws the panel.

```tsx
<Card>
  <HStack alignVertical="center" justifyHorizontal="space-between">
    <Text>September statement</Text>
    <IconButton iconName="ic_more_vertical" accessibilityLabel="More actions" onPress={() => {}} />
  </HStack>
  <DropdownMenu accessibilityLabel="Statement actions" style={{ width: 256 }}>
    <DropdownMenu.Item label="Download statement" leading={<Icon iconName="ic_download" />} showTrailing={false} onPress={() => {}} />
    <DropdownMenu.Item label="Share statement" leading={<Icon iconName="ic_share" />} showTrailing={false} onPress={() => {}} />
    <DropdownMenu.Item label="Edit details" leading={<Icon iconName="ic_edit" />} showTrailing={false} onPress={() => {}} />
    <DropdownMenu.Item label="Report a problem" leading={<Icon iconName="ic_info" />} showTrailing={false} onPress={() => {}} />
  </DropdownMenu>
</Card>
```

**Props:** `children`, `maxHeight`, `modes`, `style`, `accessibilityLabel`, `DropdownMenu.Item`, `DropdownMenu.Item.selected`, `DropdownMenu.Item.showTrailing`. (* required)

**Modes it reads:** AppearanceBrand, AppearanceSystem, Avatar Size, Badge Size, Color Mode, context 10, Context2, Context4, Emphasis, Icon Size, Menu State, Page type, Profile Card Appearance, Semantic Intent.

**Gaps (report, do not work around)**
- On the web the selected row is shown only visually.
- On the web arrow keys do not move between rows.

Full entry: `components/dropdownmenu.md`. Links: `components/dropdownmenu.links.md`.
