# DropdownMenu

> Coin agent pack 0.1.78+27 (pilot). Generated from `components/dropdownmenu.json`; the JSON is the source of truth.

- **State:** flagged (2 flags, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `cba512f` · built 2026-10-31T05:18:28Z
- **Category:** action (for discovery only, not a limit on composition) · **Tags:** overflow menu, kebab menu, more menu, context menu, actions menu
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=dropdownmenu) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=9473-2192) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-dropdownmenu--docs)

Use a Dropdown Menu for a short list of actions that opens from a button, such as an overflow or account menu.

## Use when

- **recommended** A short list of actions that opens from a button, such as an overflow or account menu. ⚑ flagged (human)  
  _From summary: “Use a Dropdown Menu for a short list of actions that opens from a button, such as an overflow or account menu.”_
- **recommended** Actions, not answers.  
  _From corePrinciple: “Actions, not answers.”_
- **recommended** An overflow menu on a card, as in the guide's In context.  
  _From inContext: “An overflow menu on a card”_

## Avoid when

- **discouraged** Choosing a form value: use Dropdown Input. Use instead: `DropdownInput`.  
  _From corePrinciple: “For choosing a form value, use Dropdown Input.”_
- **discouraged** Picking a form value, such as an account: account names in a menu have no label, value or error to go with them.  
  _From doDont: “Account names in a menu have no label, value, or error to go with them.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Panel | Rounded surface with a soft shadow; it holds the rows, each a DropdownMenu.Item (children). | yes | anatomy: “Rounded surface with a soft shadow.” |
| Leading visual | Avatar or icon that identifies the row (leading); optional. | no | anatomy: “Avatar or icon that identifies the row.” |
| Label | Names the action in a few words. | yes | anatomy: “Names the action in a few words.” |
| Chevron | Shows the row leads somewhere further; optional (showTrailing). | no | anatomy: “Shows the row leads somewhere further.” |
| Selected row | Lilac fill marks the current row (selected). | no | anatomy: “Lilac fill marks the current row.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `children` | `ReactNode` | types |

## Placement

- **recommended** In the guide's overflow menu, the screen opens the menu from the More button, places it under the button, and closes it after an action.  
  _From inContext: “The screen opens the menu from the More button, places it under the button, and closes it after an action.”_
- **recommended** Dropdown Menu only draws the panel.  
  _From inContext: “Dropdown Menu only draws the panel.”_
- **recommended** Dropdown Menu draws the panel and rows; opening, placing and closing it, and which row is selected, belong to the screen.  
  _From sources: “Dropdown Menu draws the panel and rows; opening, placing, and closing it, and which row is selected, belong to the screen.”_
- **recommended** The screen sets the menu’s width (the guide's menus are 256 px wide); rows fill it.  
  _From sizing: “The screen sets the menu’s width; rows fill it”_
- **recommended** Rows are 45 px tall.  
  _From sizing: “Rows are 45 px tall”_

## Configuration

- **recommended** `DropdownMenu.Item`: Each row is a DropdownMenu.Item in the menu's children.  
  _From fact `/facts/props/5` (DropdownMenu.Item, source types)_
- **recommended** `DropdownMenu.Item`: Choose what each row shows: avatars suit people and accounts, icons suit actions, and plain labels suit short lists.  
  _From configuration: “Avatars suit people and accounts, icons suit actions, and plain labels suit short lists.”_
- **recommended** `DropdownMenu.Item`: Actions with icons: an Icon in each row's leading helps people spot an action quickly.  
  _From configuration: “Icons help people spot an action quickly.”_
- **recommended** `DropdownMenu.Item`: Labels only, with no leading visual: the lightest menu, for two or three actions.  
  _From configuration: “The lightest menu, for two or three actions.”_
- **recommended** `DropdownMenu.Item`: People and accounts: avatar rows, the Figma default, for switching between people or accounts.  
  _From configuration: “The Figma default, for switching between people or accounts.”_
- **recommended** `DropdownMenu.Item`: The default leading Avatar is a sample photo: replace it with a real avatar or an icon.  
  _From sources: “The default leading Avatar is a sample photo, so replace it with a real avatar or an icon.”_
- **recommended** `DropdownMenu.Item.showTrailing`: Add a chevron only when a row opens another screen or menu.  
  _From configuration: “Add a chevron only when a row opens another screen or menu.”_
- **recommended** `maxHeight`: A long menu scrolls inside the panel: set maxHeight.  
  _From configuration: “A long menu scrolls inside the panel.”_
- **discouraged** `maxHeight`: Don't let a long menu grow without a max height: ten rows push the panel far down the screen.  
  _From doDont: “Ten rows push the panel far down the screen.”_
- **recommended** `DropdownMenu.Item.selected`: The screen marks the current row as selected (selected on its DropdownMenu.Item).  
  _From states: “The screen marks the current row as selected.”_
- **discouraged** `DropdownMenu.Item.selected`: Don't mark every row selected: when every row is lilac, the highlight means nothing.  
  _From doDont: “When every row is lilac, the highlight means nothing.”_
- **recommended** `DropdownMenu.Item`: Disable an action that is temporarily unavailable (disabled on its row) rather than removing it.  
  _From states: “Disable an action that is temporarily unavailable rather than removing it.”_
- **recommended** `DropdownMenu.Item`: Labels stay on one line, ending in an ellipsis when they run out of room.  
  _From sizing: “labels stay on one line, ending in an ellipsis when they run out of room.”_

## Content

- **recommended** `DropdownMenu.Item`: Write actions in sentence case, starting with a verb such as “Download” or a clear noun such as “Settings”.  
  _From content: “Write actions in sentence case, starting with a verb such as “Download” or a clear noun such as “Settings”.”_
- **recommended** `DropdownMenu.Item`: Keep labels short and skip end punctuation.  
  _From content: “Keep them short and skip end punctuation.”_

Good: “Download statement”, “Share statement”, “Edit details”, “Report a problem”, “Profile”, “Settings”, “Help”

## States

| State | When | From |
| --- | --- | --- |
| Selected | The current row, which the screen marks selected: a lilac fill. | states: “A lilac fill marks the current row.” |
| Disabled | An action that is temporarily unavailable (disabled): dimmed, skipped by keyboard focus, and not pressable. | states: “Dimmed, skipped by keyboard focus, and not pressable.” |
| Hover | Hover uses the same lilac as selected. | states: “Hover uses the same lilac as selected.” |

## Accessibility

- **recommended** `accessibilityLabel`: On the web the menu renders as a named menu with menu items; accessibilityLabel names it.  
  _From evidence: “They render as a named menu with menu items”_
- **recommended** `DropdownMenu.Item.selected`: On the web the selected row is shown only visually: it is not announced as selected.  
  _From sources: “On the web the selected row is shown only visually”_
- **recommended** On the web arrow keys do not move between rows.  
  _From sources: “arrow keys do not move between rows.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Highlight only the current row | Mark every row selected | When every row is lilac, the highlight means nothing. |
| Use it for actions | Use it to pick a form value | Account names in a menu have no label, value, or error to go with them. |
| Scroll a long menu | Let a long menu grow | Ten rows push the panel far down the screen. |

## Examples

### The guide's In context, an overflow menu on a statement card, with the menu open under the card's More button. The rows are the guide's Actions with icons menu: each has an Icon and no chevron (showTrailing false), since each row acts in place. The More button's onPress stands for the screen opening the menu, and each row's onPress for running that action and closing the menu; Dropdown Menu only draws the panel.

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

_From inContext: “The screen opens the menu from the More button, places it under the button, and closes it after an action.”_

### Places, from the guide's Content: an account menu whose rows are clear nouns and open other screens, so each keeps its chevron (showTrailing is true by default) and shows no leading visual. Each onPress stands for the screen opening that place.

```tsx
<DropdownMenu accessibilityLabel="Account menu" style={{ width: 256 }}>
  <DropdownMenu.Item label="Profile" showLeading={false} onPress={() => {}} />
  <DropdownMenu.Item label="Settings" showLeading={false} onPress={() => {}} />
  <DropdownMenu.Item label="Help" showLeading={false} onPress={() => {}} />
</DropdownMenu>
```

_From content: “Write actions in sentence case, starting with a verb such as “Download” or a clear noun such as “Settings”.”_

### A scrolling menu, from the guide's Configuration: ten labels-only rows (“Action 1” to “Action 10” stand for real actions) with no chevrons, and maxHeight 180, so the menu scrolls inside the panel instead of growing.

```tsx
<DropdownMenu accessibilityLabel="Actions" maxHeight={180} style={{ width: 256 }}>
  <DropdownMenu.Item label="Action 1" showLeading={false} showTrailing={false} onPress={() => {}} />
  <DropdownMenu.Item label="Action 2" showLeading={false} showTrailing={false} onPress={() => {}} />
  <DropdownMenu.Item label="Action 3" showLeading={false} showTrailing={false} onPress={() => {}} />
  <DropdownMenu.Item label="Action 4" showLeading={false} showTrailing={false} onPress={() => {}} />
  <DropdownMenu.Item label="Action 5" showLeading={false} showTrailing={false} onPress={() => {}} />
  <DropdownMenu.Item label="Action 6" showLeading={false} showTrailing={false} onPress={() => {}} />
  <DropdownMenu.Item label="Action 7" showLeading={false} showTrailing={false} onPress={() => {}} />
  <DropdownMenu.Item label="Action 8" showLeading={false} showTrailing={false} onPress={() => {}} />
  <DropdownMenu.Item label="Action 9" showLeading={false} showTrailing={false} onPress={() => {}} />
  <DropdownMenu.Item label="Action 10" showLeading={false} showTrailing={false} onPress={() => {}} />
</DropdownMenu>
```

_From configuration: “A long menu scrolls inside the panel.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types | Menu rows — typically {@link DropdownMenuItem} children. Maps to the Figma composition of `Menu Item` instances inside the surface. |
| `maxHeight` | `number` |  |  |  | types | Max height before the menu body scrolls. |
| `modes` | `Modes` |  |  |  | types |  |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types |  |
| `accessibilityLabel` | `string` |  |  |  | types |  |
| `DropdownMenu.Item` | `component` |  |  |  | types | A static sub-component of DropdownMenu. Its own props: label, children, leading, trailing, showLeading, showTrailing, selected, disabled, onPress, modes, style, labelStyle, accessibilityLabel, accessibilityHint, disableTruncation. |
| `DropdownMenu.Item.selected` | `boolean` |  |  |  | evidence (2026-10-08) | On DropdownMenu.Item: marks the current row. On the web it reaches only accessibilityState, which react-native-web 0.21 does not turn into aria-selected (the 8 October check read this from the installed source; not browser-checked). |
| `DropdownMenu.Item.showTrailing` ⚑ flagged (trace-check) | `boolean` |  | `true` |  | evidence (2026-09-28) | On DropdownMenu.Item: shows the default trailing chevron (ic_chevron_right) when trailing is not given; true by default. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Primary"` |  | types | A token collection DropdownMenu reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `AppearanceSystem` | `mode collection` | positive, warning, negative | `"positive"` |  | types | A token collection DropdownMenu reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Avatar Size` | `mode collection` | L, M, S, XS | `"L"` |  | types | A token collection DropdownMenu reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Badge Size` | `mode collection` | Medium, Small | `"Medium"` |  | types | A token collection DropdownMenu reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection DropdownMenu reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 10` | `mode collection` | Default, jioPlus | `"Default"` |  | types | A token collection DropdownMenu reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context2` | `mode collection` | Default, AppBar | `"Default"` |  | types | A token collection DropdownMenu reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context4` | `mode collection` | Default, Chip, Button, Badge, Badge/glass | `"Default"` |  | types | A token collection DropdownMenu reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Emphasis` | `mode collection` | High, Medium, Low | `"High"` |  | types | A token collection DropdownMenu reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Icon Size` | `mode collection` | Medium, Small | `"Medium"` |  | types | A token collection DropdownMenu reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Menu State` | `mode collection` | Default, hover, pressed | `"Default"` |  | types | A token collection DropdownMenu reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection DropdownMenu reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Profile Card Appearance` | `mode collection` | Default, Premium | `"Default"` |  | types | A token collection DropdownMenu reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Semantic Intent` | `mode collection` | Brand, System | `"Brand"` |  | types | A token collection DropdownMenu reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types | Menu rows — typically {@link DropdownMenuItem} children. Maps to the Figma composition of `Menu Item` instances inside the surface. |

### Events

_No events._

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- On the web the selected row is shown only visually. _(evidence, 2026-10-08)_
- On the web arrow keys do not move between rows. _(evidence, 2026-10-08)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/facts/props/7` · trace-check: Checked on jfs-components 0.1.77 (2026-09-28); the installed package is 0.1.78. Re-check before relying on it.
- `/useWhen/0` · human: Two guides offer an action menu. This guide's summary uses Dropdown Menu for “a short list of actions that opens from a button, such as an overflow or account menu”, while the Dropdown guide (889444e) uses Dropdown for “a short list of choices or actions that opens from a button or field”, and its In context is the same overflow menu on a September statement card (Download statement, Share statement, Report a problem); the Dropdown entry's useWhen says so too. Neither guide says which one an action menu uses, so this entry doesn't decide it: it gives no avoidWhen for Dropdown, and the Dropdown entry none for Dropdown Menu. The question is open in guide fixes #523 (the Dropdown guide) and #554 (this guide), for Marcin; once a guide answers it, re-extract both entries. Added by Claude Code in the overnight run agentpack-r25, for Marcin to confirm.
