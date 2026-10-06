# Chip Group brief

slug: chipgroup · label: Chip Group · public API: ChipGroup (+ ChipSelect children; VStack for hosting)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1905-5123 · storybook: docsUrl('chipgroup') · stories: Default=components-chipgroup--default, With active state=components-chipgroup--with-active-state
checked: 6 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-3795b4c, Biscuit's main 3795b4c)
icon: three small pills, two on the first row and one below — `<rect x="2" y="3.5" width="6" height="4" rx="2" stroke="currentColor" strokeWidth="1.5" /><rect x="10" y="3.5" width="6" height="4" rx="2" stroke="currentColor" strokeWidth="1.5" /><rect x="2" y="10.5" width="9" height="4" rx="2" stroke="currentColor" strokeWidth="1.5" />`
keywords: filter chips, chip row, filters

Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`. Every ChipGroup gets `modes={LIGHT}`; chips inside take no `modes` (the group passes its modes to them). Every chip gets an `icon`.
FILTERS (in order): Date `ic_calendar_week` → applied “Last 30 days”; Status `ic_status_loading` → “Pending”; Payment methods `ic_payments` → “UPI”; Category `ic_filter` → “Groceries”; Account `ic_filter` → “Savings •• 4821”; Amount `ic_filter` → “Over ₹1,000”. “Chip n” = `<ChipSelect label=… icon=… />` from FILTERS; an applied chip is `active` with its applied label.
“Host” = `<Surface width="wide"><VStack modes={LIGHT} style={{ width: '100%' }}>{children}</VStack></Surface>` (the group wraps only inside a column parent; the white Surface keeps the #f5f5f5 chips visible). The Anatomy and Sizing diagrams use `surface="white"`. Never use `.coin-new-content-list` (10 px gap) for chips here.
`testID` lands on the group row; chips are its `button` children: `${byTestId(id)} > button:nth-child(n)`.

## Overview
summary: Use a Chip Group to lay out a row of Chip Select filters that wraps onto new lines with even gaps.
principle: The group spaces the chips; each chip keeps its own state.
playground: `.preview-stage` › Host › `<ChipGroup>` of the first 3 or 6 FILTERS as controlled chips: pressing a chip toggles it between Idle (filter name) and Active (applied label). Controls: Segment "Filters" ['3', '6'] → how many ChipSelect children. Readout title "Applied filters", value the applied labels joined with “, ” or “None”; note: "Each chip turns on and off by itself; the group only spaces and wraps them." Stage label: "Live Coin Chip Group".

## Anatomy
header: Anatomy · title: Chips in a wrapping row · description: The group holds Chip Selects in one row, 8 px apart. Chips that don’t fit move to the next line, also 8 px below.
specimen: `<Anatomy specimenWidth={300} …>` › `<ChipGroup testID="chipgroup-anatomy">` with chips 1–3 (all Idle). At 300 px, Payment methods wraps to the second row.
parts (CG = `byTestId('chipgroup-anatomy')`):
1. Chip Select — Each chip keeps its own label, icon, and Active state. — target: `${CG} > button:nth-child(2)` — side: right
2. Gap — 8 px between chips, set by the group. — between: [`${CG} > button:nth-child(1)`, `${CG} > button:nth-child(2)`] — side: top
3. Wrapped chip — A chip that doesn’t fit starts the next row, on the left. — target: `${CG} > button:nth-child(3)` — side: bottom
4. Group — Lays chips out; it has no label or state of its own. — target: `CG` — side: left
marks: gap `${CG} > button:nth-child(1)` → `${CG} > button:nth-child(3)` (the 8 px row gap)

## Configuration
header: Configuration · title: The chips are the content · description: Chip Group has no variants or size. Choose the filters, their order, and each chip’s icon; each chip turns Active on its own.
Grid `coin-new-example-grid`, each a Host:
- Figma’s three filters — chips 1–3, Idle — lesson: Date, Status, and Payment methods, each with its own icon.
- Six filters — chips 1–6, Idle — lesson: More filters wrap onto new rows with the same 8 px gaps.

## States
header: States · title: The group has none; each chip does · description: Chip Group has no idle, active, or disabled state. When a chip applies, it shows its value and a close icon, grows 20 px, and the row may re-wrap.
Grid `coin-new-example-grid`, each a Host:
- Nothing applied — chips 1–3, Idle — lesson: Grey chips name the filters.
- Two applied — chip 1 and chip 3 applied, chip 2 Idle — lesson: Each Active chip shows its value; the others stay as they are.

## Sizing
header: Sizing · title: Full width, 32 px rows, 8 px gaps · description: The group fills its container and adds a 32 px row for each line of chips. On the web chips are a little wider than in Figma, so Figma’s three filters need 382 px for one row.
Measured diagram: `<Anatomy legend={false} specimenWidth={300} marks={[{ kind: 'size', target: byTestId('chipgroup-size'), side: 'right', label: 'both' }, { kind: 'gap', from: `${byTestId('chipgroup-size')} > button:nth-child(1)`, to: `${byTestId('chipgroup-size')} > button:nth-child(2)` }, { kind: 'gap', from: `${byTestId('chipgroup-size')} > button:nth-child(1)`, to: `${byTestId('chipgroup-size')} > button:nth-child(3)` }]}>` › `<ChipGroup testID="chipgroup-size">` chips 1–3. Expected 300 × 72, 8, 8.
Then grid `coin-new-example-grid`:
- ExampleCard "Group 390 px wide" (description: "The three filters fit on one row, with 8 px to spare.") › `<FitWidth><VStack modes={LIGHT} style={{ width: 390, padding: 0 }}>` › ChipGroup chips 1–3 (VStack has its own padding tokens; `padding: 0` makes the group exactly 390 px)
- ExampleCard "Group 370 px wide, as in Figma" (description: "Payment methods moves to a second row.") › `<FitWidth><VStack modes={LIGHT} style={{ width: 370, padding: 0 }}>` › ChipGroup chips 1–3

## Content
header: Content · title: Short filter names, then the value · description: Name each filter in one or two words, in sentence case. Once a filter applies, its chip shows the chosen value, so the row reads as a summary of the list.
Grid `coin-new-example-grid`:
- ExampleCard "Filter names" › Host › ChipGroup chips 1–3, Idle
- ExampleCard "Applied values" › Host › ChipGroup chips 1–3, all applied (“Last 30 days”, “Pending”, “UPI”)

## In context
header: In context · title: Filters above a transaction list · description: The screen owns each filter: pressing an Idle chip applies it (a picker would open here), and pressing an Active chip clears it. The group only keeps the chips spaced as they change width.
Composition in `.coin-new-context`: Host › controlled ChipGroup of chips 1–3 (each toggles between Idle and applied on press), then `<p className="coin-new-readout" role="status">`: “Showing all transactions”, or the applied values, e.g. “Showing UPI payments from the last 30 days, pending”. Build the sentence from what is applied: “Showing” + (“UPI payments” or “transactions”) + (“ from the last 30 days” if Date) + (“, pending” if Status).

## Do & Don'ts
header: Do & Don’ts · title: Keep the row short and easy to scan · description: Each pair shows a chip row people can read at a glance versus one that slows them down.
Every preview is a Host.
- Do Match each icon to its filter: A calendar, a status, and a payment icon tell the filters apart. — chips 1–3 | Don't Leave the default icon: Every chip shows a calendar, so the filters look alike. — chips 1–3 with no `icon` prop
- Do Keep labels short: Short names fit several filters to a row. — `<ChipSelect label="Date" icon="ic_calendar_week" />`, `<ChipSelect label="Status" icon="ic_status_loading" />`, `<ChipSelect label="Method" icon="ic_payments" />` | Don't Write long labels: Each long name takes a row to itself. — `<ChipSelect label="Date of transaction" icon="ic_calendar_week" />`, `<ChipSelect label="Transaction status" icon="ic_status_loading" />`, `<ChipSelect label="Payment method used" icon="ic_payments" />`
- Do Let filters combine: Date and Payment methods apply together. — chips 1–3 with chips 1 and 3 applied | Don't Use chips for one choice: People expect several to apply, and each is announced as its own toggle. — `<ChipSelect label="Daily" icon="ic_calendar_week" />`, `<ChipSelect active label="Weekly" icon="ic_calendar_week" showCloseIcon={false} />`, `<ChipSelect label="Monthly" icon="ic_calendar_week" />`

## Sources
header: Sources · title: Use the public Chip Group contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> from the team’s private package repository. Figma’s Chip Group is one 370 × 32 component holding three Chip Selects in a slot, with no properties. The package wraps chips onto new rows with an 8 px gap; on the web the chips are slightly wider than in Figma. The group has no role or name of its own, so each chip is announced as a separate toggle button. The published Storybook stories show two chips without icons because their icon names don’t exist.

## Limits
Do not show Dark mode (the Active chip background nearly matches Idle), `style`, `testID`, horizontal scrolling, non-chip children, or a label for the group. Do not imply the group tracks selection, offers single choice, or truncates long labels. If any preview overflows its host at 390 px, report it instead of changing labels.
