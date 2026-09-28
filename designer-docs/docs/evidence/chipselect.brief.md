# Chip Select brief

slug: chipselect · label: Chip Select · public API: ChipSelect
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1901-4727 · storybook: docsUrl('chipselect') · stories: Default=components-chipselect--default, Active=components-chipselect--active, Custom icon=components-chipselect--custom-icon, Active without close icon=components-chipselect--active-without-close-icon
checked: 28 September 2026 · jfs-components 0.1.60 (registry latest 0.1.60)
icon: a rounded pill outline (x 2–16, y 5–13, fully rounded) with a small × on its right third; 1.5 stroke.

All instances use `modes={{ 'Color Mode': 'Light' }}`. ChipSelect has no `testID`; wrap every Anatomy specimen chip in nothing else and target it structurally (see Anatomy). Chips are content-sized: put them in `.coin-new-content-list` or an ExampleCard, never a full-width host.

## Overview
summary: Use a Chip Select to show one filter, such as a date range, and whether it is applied.
principle: Idle names the filter; Active shows the chosen value and how to clear it.
playground: stage = one ChipSelect. Controls: text control "Label" → `label` (maxLength 24, default "Date"); Segment "State" ['Idle', 'Active'] → `active` (pressing the chip also toggles it); Segment "Icon" ['Calendar', 'Filter'] → `icon` 'ic_calendar_week' | 'ic_filter'; when State is Active, OnOff "Close icon" → `showCloseIcon` (default On). Readout title "Last press", value "None yet" or "Applied" / "Cleared" after the chip toggles. Stage label: "Live Coin Chip Select".

## Anatomy
header: Anatomy · title: Icon, label, and a way out · description: One pill holds a leading icon, the label, and, when Active, a close icon. The whole chip is a single press target.
specimen: `<ChipSelect active label="Date" icon="ic_calendar_week" />` as the only child of `<Anatomy>`
parts (selectors are relative to the specimen; the chip root is `[tabindex="0"]`):
1. Leading icon — Hints at the kind of filter, such as a date. — target: `[tabindex="0"] > div:first-child` — side: left
2. Label — Names the filter, or the value once applied. — target: `[tabindex="0"] [dir="auto"]` — side: top
3. Close icon — Shows that pressing again clears the filter. — target: `[tabindex="0"] > div:last-child` — side: right
4. Container — Pill that turns lavender when Active. — target: `[tabindex="0"]` — side: bottom
marks: gap `[tabindex="0"] > div:first-child` → `[tabindex="0"] [dir="auto"]`

## Configuration
header: Configuration · title: Label, icon, and close icon · description: Choose an icon that matches the filter, and keep the close icon whenever a press clears the filter.
- Calendar icon — `label="Date"`, `icon="ic_calendar_week"` — lesson: the default, for date and period filters.
- Filter icon — `label="Category"`, `icon="ic_filter"` — lesson: for other attribute filters.
- Active with close icon — `active`, `label="Last 30 days"` — lesson: the × tells people a press removes the filter.
- Active without close icon — `active`, `label="Last 30 days"`, `showCloseIcon={false}` — lesson: only when a press reopens the picker instead of clearing.
Grid: `coin-new-example-grid` (2 × 2).

## States
header: States · title: Idle and Active · description: One property switches the chip between Idle and Active. There is no disabled state; hide a filter that does not apply instead.
- Idle — `label="Date"` — lesson: grey pill, dark text.
- Active — `active`, `label="Date"` — lesson: lavender pill, purple icon, text, and close icon.
Grid: `coin-new-example-grid`.

## Sizing
header: Sizing · title: The label sets the width · description: Height is fixed at 32 px. Width grows with the label and the icons, so short labels keep a row of chips on one line.
- Measured diagram: `<Anatomy legend={false} marks={[{ kind: 'size', target: '[tabindex="0"]', side: 'bottom', label: 'both' }, { kind: 'padding', target: '[tabindex="0"]' }]}>` around `<ChipSelect label="Date" />`.
- ExampleCard "Short and long" containing `.coin-new-content-list` of `<ChipSelect label="Date" />` and `<ChipSelect label="Last 30 days" />`.

## Content
header: Content · title: Name the filter, then the choice · description: While Idle, use one or two words for the filter. Once applied, replace them with the chosen value so the row reads as a summary.
Body: two ExampleCards in `coin-new-example-grid`: "Idle labels" with `.coin-new-content-list` of chips "Date", "Category", "Account"; "Applied labels" with active chips "Last 30 days", "Groceries", "Savings •• 4821" (icons: calendar for the date ones, `ic_filter` for the others).

## In context
header: In context · title: Filters above a transaction list · description: The screen owns each filter. Pressing an Idle chip opens a picker (not part of Chip Select); pressing an Active chip clears it. The screen updates the chip’s state and label after each choice.
Composition in `.coin-new-context`: a `.coin-new-content-list` row with a controlled Date chip (toggles between Idle "Date" and Active "Last 30 days" on press) and a controlled Category chip (`ic_filter`, toggles between "Category" and "Groceries"), above a `<p className="coin-new-readout" role="status">` reading "Showing all transactions" or e.g. "Showing Groceries from the last 30 days".

## Do & Don'ts
header: Do & Don’ts · title: Make applied filters obvious · description: Each pair shows what people read in the chip row.
- Do Show the chosen value: “Last 30 days” tells people what the list is showing. — `active`, `label="Last 30 days"` | Don't Keep the generic label: An Active “Date” chip does not say which dates. — `active`, `label="Date"`
- Do Match the icon to the filter: A calendar signals a date filter. — `label="Date"`, `icon="ic_calendar_week"` | Don't Use an unrelated icon: A home icon on a date filter confuses the meaning. — `label="Date"`, `icon="ic_home"`
- Do Keep the close icon when a press clears: The × shows how to remove the filter. — `active`, `label="Groceries"`, `icon="ic_filter"` | Don't Hide it when a press clears: Without the ×, people cannot tell how to undo the filter. — `active`, `label="Groceries"`, `icon="ic_filter"`, `showCloseIcon={false}`

## Sources
header: Sources · title: Use the public Chip Select contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Declared, installed, and registry <code>jfs-components</code> versions are <code>0.1.60</code>. Figma’s State variant maps to the <code>active</code> property, which sets the <code>ChipSelect State</code> mode. The leading icon shows in both states, as in Figma. The close icon is part of the single press target, not a separate button. On the web the chip has no button role and does not announce whether it is Active; Enter and click both activate it.

## Limits
No disabled state, no separate clear button, no `labelSlot`, no `style`. Do not claim the Active state is announced to screen readers.
