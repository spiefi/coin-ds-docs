# Dropdown Menu brief

slug: dropdownmenu · label: Dropdown Menu · public API: DropdownMenu, DropdownMenu.Item (+ Icon, Avatar, IconButton, Card, HStack, Text for composition)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=9473-2192 · storybook: docsUrl('dropdownmenu') · stories: Default=components-dropdownmenu--default, Without leading=components-dropdownmenu--without-leading, Without trailing=components-dropdownmenu--without-trailing, Custom slots=components-dropdownmenu--custom-slots, Disabled item=components-dropdownmenu--with-disabled-item, Scrollable=components-dropdownmenu--scrollable
checked: 28 September 2026 · jfs-components 0.1.77 (newest package tag v0.1.77)
icon: a rounded panel (x 3–15, y 3–15, radius 2) with three short lines at y 7, 9.5, 12 (x 6–10) and a small right chevron at the end of the middle line; 1.5 stroke.

All instances use `modes={{ 'Color Mode': 'Light' }}`, `style={{ width: 256 }}`, and an `accessibilityLabel`. Target structurally: root `[role="menu"]`, items `[role="menu"] [role="menuitem"]:nth-child(n)`. Never rely on the default photo Avatar except in Anatomy and where stated; elsewhere pass `leading={<Icon iconName="…" />}` or `showLeading={false}`.

Actions (label · icon): Download statement · ic_download; Share statement · ic_share; Edit details · ic_edit; Report a problem · ic_info.

## Overview
summary: Use a Dropdown Menu for a short list of actions that opens from a button, such as an overflow or account menu.
principle: Actions, not answers. For choosing a form value, use Dropdown Input.
playground: stage = one DropdownMenu (`accessibilityLabel="Statement actions"`) of the four actions, each with its icon as `leading`. Pressing an item marks it `selected` and records it. Controls: OnOff "Icons" → leading icon on/off (`showLeading={false}` when off); OnOff "Chevrons" → `showTrailing` (default Off); OnOff "Disable one" → `disabled` on Report a problem. Readout title "Last action", value = the pressed label or "None yet". Stage label: "Live Coin Dropdown Menu".

## Anatomy
header: Anatomy · title: A panel of action rows · description: Each row can show a leading visual, a label, and a trailing chevron. The selected row turns lilac.
specimen: `<DropdownMenu accessibilityLabel="Account menu">` with items Profile, Settings (`selected`), Help — all with the default Avatar and chevron (as in Figma)
parts:
1. Panel — Rounded surface with a soft shadow. — target: `[role="menu"]` — side: left
2. Leading visual — Avatar or icon that identifies the row. — target: `[role="menu"] [role="menuitem"]:nth-child(1) [role="img"]` — side: top
3. Label — Names the action in a few words. — target: `[role="menu"] [role="menuitem"]:nth-child(3) [dir="auto"]` — side: bottom
4. Chevron — Shows the row leads somewhere further. — target: `[role="menu"] [role="menuitem"]:nth-child(1) > div:last-child` — side: right
5. Selected row — Lilac fill marks the current row. — target: `[role="menu"] [role="menuitem"]:nth-child(2)` — side: right
marks: padding `[role="menu"] [role="menuitem"]:nth-child(3)`

## Configuration
header: Configuration · title: Choose what each row shows · description: Avatars suit people and accounts, icons suit actions, and plain labels suit short lists. Add a chevron only when a row opens another screen or menu.
- People and accounts — items "Marcin Śpiewak", "Joint account" with the default Avatar and chevron — lesson: the Figma default, for switching between people or accounts.
- Actions with icons — the four actions with icons, `showTrailing={false}` — lesson: icons help people spot an action quickly.
- Labels only — Download statement, Share statement, Report a problem with `showLeading={false}`, `showTrailing={false}` — lesson: the lightest menu, for two or three actions.
- Scrolling menu — ten items "Action 1"…"Action 10", labels only, `maxHeight={180}` — lesson: a long menu scrolls inside the panel.
Grid: `coin-new-example-grid` (2 × 2).

## States
header: States · title: Selected and disabled · description: The screen marks the current row as selected. Disable an action that is temporarily unavailable rather than removing it. Hover uses the same lilac as selected.
- Selected — the four actions with icons, Share statement `selected`, no chevrons — lesson: a lilac fill marks the current row.
- Disabled — the four actions with icons, Report a problem `disabled`, no chevrons — lesson: dimmed, skipped by keyboard focus, and not pressable.
Grid: `coin-new-example-grid`.

## Sizing
header: Sizing · title: Rows are 45 px tall · description: The screen sets the menu’s width; rows fill it and labels stay on one line, ending in an ellipsis when they run out of room.
- Measured diagram: `<Anatomy legend={false} marks={[{ kind: 'size', target: '[role="menu"]', side: 'top', label: 'both' }, { kind: 'size', target: '[role="menu"] [role="menuitem"]:nth-child(1)', side: 'right', label: 'both' }]}>` around the labels-only menu of three actions.

## Content
header: Content · title: Start with the verb · description: Write actions in sentence case, starting with a verb such as “Download” or a clear noun such as “Settings”. Keep them short and skip end punctuation.
Body: `coin-new-example-grid` with ExampleCard "Actions" (the four actions with icons, no chevrons) and ExampleCard "Places" (Profile, Settings, Help — `showLeading={false}`, chevrons on).

## In context
header: In context · title: An overflow menu on a card · description: The screen opens the menu from the More button, places it under the button, and closes it after an action. Dropdown Menu only draws the panel.
Composition in `.coin-new-context`: public `Card` (Light) containing `HStack` (`alignVertical="center"`, `justifyHorizontal="space-between"`, Light) with Coin `Text` "September statement" and `IconButton` (`iconName="ic_more_vertical"`, `accessibilityLabel="More actions"`, modes Light plus `Emphasis: 'Low'`) that toggles open state; when open, render the four-action menu (icons, no chevrons) directly after the HStack inside the card; pressing an item closes it. Below the card, `<p className="coin-new-readout" role="status">` with "Menu closed", "Menu open", or the last action.

## Do & Don'ts
header: Do & Don’ts · title: Keep menus for actions · description: Each pair shows a menu people can act on quickly versus one that confuses them.
- Do Highlight only the current row: One lilac row shows where people are. — four actions with icons, Share statement `selected` | Don't Mark every row selected: When every row is lilac, the highlight means nothing. — same, all four `selected`
- Do Use it for actions: Each row does something. — the four actions with icons | Don't Use it to pick a form value: Account names in a menu have no label, value, or error to go with them. — items "Savings account", "Checking account", "Recurring deposit", labels only, no chevrons, `accessibilityLabel="Accounts"`
- Do Scroll a long menu: A max height keeps the panel within the screen. — ten "Action n" items, labels only, `maxHeight={180}` | Don't Let a long menu grow: Ten rows push the panel far down the screen. — same without `maxHeight`

## Sources
header: Sources · title: Use the public Dropdown Menu contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.77</code> from the team’s private package repository; public npm stops at 0.1.60, which has no Dropdown Menu. Dropdown Menu draws the panel and rows; opening, placing, and closing it, and which row is selected, belong to the screen. The default leading Avatar is a sample photo, so replace it with a real avatar or an icon. On the web the selected row is shown only visually and arrow keys do not move between rows. Figma’s Menu Item master cited by the package is no longer in the file.

## Limits
Do not show a trigger or positioning as part of the component, `children` custom rows, `style` beyond width, or `labelStyle`. Do not claim announced selection or arrow-key navigation.
