# Dropdown brief

slug: dropdown · label: Dropdown · public API: Dropdown, DropdownItem (+ IconButton, Icon, Card, Text, HStack for composition)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3087-4266 · storybook: docsUrl('dropdown') · stories: Default=components-dropdown--default, With icons=components-dropdown--with-icons, With disabled item=components-dropdown--with-disabled-item, Scrollable=components-dropdown--scrollable
checked: 28 September 2026 · jfs-components 0.1.60 (registry latest 0.1.60)
icon: a rounded rectangle panel (x 3–15, y 3–15, radius 2) with three horizontal lines inside at y 7, 9.5, 12; 1.5 stroke.

All instances use `modes={{ 'Color Mode': 'Light' }}`. Dropdown has no `testID`; target it structurally: root `[role="menu"]`, items `[role="menu"] [role="menuitem"]:nth-child(n)`. Give each Dropdown `style={{ width: 240 }}` unless stated, and pass `accessibilityLabel`.

Accounts: savings · Savings account; checking · Checking account; brokerage · Brokerage account; recurring · Recurring deposit.

## Overview
summary: Use a Dropdown as the floating panel for a short list of choices or actions that opens from a button or field.
principle: A short, scannable list; the screen decides when it opens and where it sits.
playground: stage = one Dropdown (`accessibilityLabel="Accounts"`) of the four accounts; pressing an item selects it. Pressing an item marks it `selected`. Controls: OnOff "Leading icons" → `leading={<Icon name="ic_wallet" size={18} />}` on every item; OnOff "Disable one" → `disabled` on Recurring deposit; OnOff "Max height" → `maxHeight={120}`. Readout title "Last choice", value = the pressed item's label or "None yet". Stage label: "Live Coin Dropdown".

## Anatomy
header: Anatomy · title: A panel of items · description: A rounded, shadowed panel holds Dropdown Items. The selected item gets a grey fill and a check.
specimen: `<Dropdown accessibilityLabel="Accounts" style={{ width: 240 }}>` with Savings account (`selected`), Checking account, Brokerage account
parts:
1. Panel — Rounded surface with a soft shadow that floats over content. — target: `[role="menu"]` — side: left
2. Selected item — Grey fill and a check mark the current choice. — target: `[role="menu"] [role="menuitem"]:nth-child(1)` — side: top
3. Check — Appears on the selected item unless it has its own trailing content. — target: `[role="menu"] [role="menuitem"]:nth-child(1) svg` — side: right
4. Item — One choice or action in one line. — target: `[role="menu"] [role="menuitem"]:nth-child(3)` — side: bottom
marks: padding `[role="menu"] [role="menuitem"]:nth-child(2)`

## Configuration
header: Configuration · title: Labels, icons, and length · description: Items take a label and an optional leading icon. Set a maximum height when the list is long so the panel scrolls instead of growing.
- Labels only — four accounts, none selected — lesson: the simplest list, for choices people know by name.
- With leading icons — four accounts, each `leading={<Icon name="ic_wallet" size={18} />}` — lesson: icons help people scan similar items.
- Scrolling list — 12 items "Option 1"…"Option 12", `maxHeight={180}` — lesson: the panel stays the same height and the list scrolls.
Grid: `coin-new-example-grid three`.

## States
header: States · title: Selected, disabled, and pressed · description: Mark the current choice as selected and dim options that are temporarily unavailable. Hover and press use the same grey as selected.
- Selected — accounts, Checking account `selected` — lesson: grey fill plus a check.
- Disabled item — "Available option", "Coming soon" (`disabled`) — lesson: the unavailable item is dimmed and cannot be pressed or focused.
Grid: `coin-new-example-grid`.

## Sizing
header: Sizing · title: The screen sets the width · description: Items are 43 px tall and fill the panel’s width. Labels stay on one line and end in an ellipsis when they run out of room.
- Measured diagram: `<Anatomy legend={false} marks={[{ kind: 'size', target: '[role="menu"]', side: 'top', label: 'both' }, { kind: 'size', target: '[role="menu"] [role="menuitem"]:nth-child(1)', side: 'right', label: 'both' }]}>` around the anatomy Dropdown without a selected item.
- ExampleCard "A long label" containing a Dropdown with Savings account and "Savings account for household and family expenses" — description "The label is cut to one line."

## Content
header: Content · title: Start each label with the key word · description: Put the word that tells items apart first, keep labels to a few words, and use the same form for every item.
Body: `coin-new-example-grid` with ExampleCard "Actions" (Dropdown `accessibilityLabel="Statement actions"`: "Download statement", "Share statement", "Report a problem") and ExampleCard "Choices" (the four accounts, Savings account selected).

## In context
header: In context · title: A menu from an overflow button · description: The screen opens the Dropdown when the More button is pressed, places it under the button, and closes it after a choice. Dropdown only draws the panel.
Composition in `.coin-new-context`: public `Card` (Light) containing `HStack` (`alignVertical="center"`, `justifyHorizontal="space-between"`, Light) with Coin `Text` "September statement" and `IconButton` (`iconName="ic_more_vertical"`, `accessibilityLabel="More actions"`, Light modes plus `Emphasis: 'Low'`) that toggles open state. When open, render the "Statement actions" Dropdown (width 220) directly after the HStack inside the card; pressing an item closes it. Below the card, `<p className="coin-new-readout" role="status">` with "Menu closed", "Menu open", or the last chosen action.

## Do & Don'ts
header: Do & Don’ts · title: Keep lists short and honest · description: Each pair shows a list people can scan versus one that slows them down.
- Do Mark the one current choice: One check shows what is chosen. — accounts, Savings account `selected` | Don't Mark several choices in a single-choice list: Two checks make the current choice unclear. — accounts, Savings account and Brokerage account both `selected`
- Do Keep labels short: Every label reads in full. — "Savings account", "Checking account", "Recurring deposit" | Don't Write long labels: Long labels are cut off, hiding what tells them apart. — "Savings account for household expenses", "Savings account for holiday travel", "Savings account for emergencies"
- Do Scroll a long list: A max height keeps the panel compact. — 12 options, `maxHeight={180}` | Don't Let a long list grow: Twelve items push the panel far past the screen. — 12 options, no `maxHeight`

## Sources
header: Sources · title: Use the public Dropdown contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Declared, installed, and registry <code>jfs-components</code> versions are <code>0.1.60</code>. Dropdown draws the panel and its items; opening, closing, and placing it are handled by the screen, or by Dropdown Input for form fields. On the web the panel is a menu of menu items, the selected item is shown only visually (it is not announced as selected), and arrow keys do not move between items; Tab and Enter do.

## Limits
Do not describe built-in open/close, positioning, arrow-key navigation, or announced selection. Do not use `style` except the width, `labelStyle`, or custom `children` items.
