# Tabs brief

slug: tabs · label: Tabs · public API: Tabs, TabItem (+ Card, VStack, ListItem for composition)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3063-136 · storybook: docsUrl('tabs') · stories: Default=components-tabs--default, With labels=components-tabs--with-labels, Scrollable=components-tabs--scrollable, All idle=components-tabs--all-idle, In Range Track=components-rangetrack--scrollable-tabs
checked: 5 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-3795b4c, Biscuit's main 3795b4c)
icon: two short labels with an underline under the first, over a baseline — `<path d="M3 7h4M11 7h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M2.5 11h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><path d="M2 14h14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />`
keywords: tab bar, sub-navigation, views

Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`; every Coin instance gets `modes={LIGHT}`. Tabs and TabItem have no `testID`: target `[role="tablist"]` and `[role="tablist"] > [role="tab"]:nth-child(n)`; the active tab's underline is `[role="tab"]:nth-child(n) > div:last-child`; a label is `[role="tab"]:nth-child(n) [dir="auto"]`.
Sets: VIEWS = Overview, Activity, Details (short enough that three tabs fit a 240 px row; “Transactions” overflowed its tab at 390 px). FILTERS = All, Sent, Received, Pending, Failed, Refunded.
"Row(labels, selected, scrollable?)" = `<Tabs modes={LIGHT} scrollable={scrollable}>{labels.map((l, i) => <TabItem key={l} modes={LIGHT} label={l} active={i === selected} onPress={…} />)}</Tabs>`; static examples may pass a no-op `onPress`. Put each Row on its own in `<div className="coin-new-host wide"><VStack modes={LIGHT} style={{ width: '100%' }}>…</VStack></div>` (the host is a flex row; without the full-width VStack the tabs shrink to their content).

## Overview
summary: Use Tabs to switch between a few peer views of the same content, such as an account’s overview, activity, and details.
principle: A few peer views, exactly one selected, and the content below follows it.
playground: `.preview-stage` with a host holding a controlled Row. Controls: Segment "Set" ['Views', 'Filters'] → VIEWS or FILTERS (changing it resets the selection to the first tab); Segment "Layout" ['Equal width', 'Scrollable'] → `scrollable`, shown only for Views: Filters is always scrollable, because six labels overlap in an equal-width row (the playground must never show a broken row; review comment, 5 October 2026); pressing a tab selects it. Readout title "Selected tab", value = its label; note: Filters → "Six filters don’t fit an equal-width row, so they always scroll."; Scrollable → "Tabs hug their labels; scroll the row for the rest."; otherwise "Each tab takes an equal share of the row." Stage label: "Live Coin Tabs".

## Anatomy
header: Anatomy · title: A row of tabs, one underlined · description: Tabs lines up Tab Items in one row, 16 px apart. The selected tab has a black label and a gold underline; the others are grey.
specimen: Row(VIEWS, 0); specimenWidth 328
parts:
1. Tab row — Holds the tabs in one row and spaces them evenly. — target: `[role="tablist"]` — side: left
2. Selected tab — Black label: the view on screen now. — target: `[role="tablist"] > [role="tab"]:nth-child(1) [dir="auto"]` — side: top
3. Underline — 2 px gold bar under the selected tab only. — target: `[role="tablist"] > [role="tab"]:nth-child(1) > div:last-child` — side: bottom
4. Idle tab — Grey label: another view, one tap away. — target: `[role="tablist"] > [role="tab"]:nth-child(3) [dir="auto"]` — side: top
marks: gap `[role="tablist"] > [role="tab"]:nth-child(2)` → `[role="tablist"] > [role="tab"]:nth-child(3)`

## Configuration
header: Configuration · title: Equal width or scrollable · description: By default every tab gets an equal share of the row. Turn on scrollable when the labels don’t fit: each tab then hugs its label and the row scrolls sideways.
Grid `coin-new-example-grid`:
- Equal width — Row(VIEWS, 0) — lesson: Three tabs share the row equally, whatever their label length.
- Scrollable — Row(FILTERS, 0, scrollable) — lesson: Each tab hugs its label; scroll the row to reach the rest.

## States
header: States · title: One tab selected at a time · description: The screen keeps track of the selected tab: it marks that tab active and moves the mark when another tab is pressed. Tabs has no disabled or loading state.
Grid `coin-new-example-grid`:
- First tab selected — Row(VIEWS, 0) — lesson: Open on the summary view.
- Another tab selected — Row(VIEWS, 1) — lesson: The black label and underline move to the pressed tab.

## Sizing
header: Sizing · title: Fills its row, 33 px tall · description: Tabs stretches to the width of its container. Each tab is 33 px tall: a 17 px label with 8 px above and below. Equal-width tabs split the row after the 16 px gaps; three tabs in 328 px are about 99 px each.
Measured diagram: `<Anatomy legend={false} specimenWidth={328} marks={[{ kind: 'size', target: '[role="tablist"] > [role="tab"]:nth-child(1)', side: 'bottom', label: 'both' }, { kind: 'padding', target: '[role="tablist"] > [role="tab"]:nth-child(1)' }, { kind: 'gap', from: '[role="tablist"] > [role="tab"]:nth-child(1)', to: '[role="tablist"] > [role="tab"]:nth-child(2)' }]}>` Row(VIEWS, 0) `</Anatomy>`. Expected: about 99 × 33 and a 16 px gap.

## Content
header: Content · title: Name each view in a word or two · description: Labels are short nouns in sentence case that name the view, such as “Overview” or “Activity”. Don’t number tabs or write actions.
One ExampleCard "View names" holding a host with Row(VIEWS, 0).

## In context
header: In context · title: Account views over one panel · description: The screen keeps the selected tab and shows that view below the row. Pressing another tab swaps the panel; the tabs only report the press.
Composition in `.coin-new-context`: `<Card modes={LIGHT}>` › `<VStack modes={LIGHT} style={{ width: '100%' }}>` › a controlled Row(VIEWS) and below it the panel for the selected tab, as ListItems (`layout="Horizontal" navArrow={false}`, with `supportText`):
- Overview: "Available balance" · "₹42,500.00"; "Spent this month" · "₹18,300 so far in October".
- Activity: "Electricity bill" · "Paid ₹1,240 on 3 Oct"; "Salary" · "Received ₹85,000 on 1 Oct".
- Details: "Account number" · "XXXX 4821"; "Branch" · "Mumbai, Bandra West".
Below the card, `<p className="coin-new-readout" role="status">Showing {label}</p>`.

## Do & Don'ts
header: Do & Don’ts · title: Use tabs for peer views · description: Each pair shows tabs people understand versus tabs that mislead them.
Every preview is a host (`coin-new-host wide`).
- Do Switch between peer views: Overview, Activity, and Details show the same account. — Row(VIEWS, 0) | Don't Use tabs as actions: “Pay” and “Cancel” do something; use Buttons. — Row([Pay, Cancel], 0)
- Do Select exactly one tab: One underline says which view is showing. — Row(VIEWS, 1) | Don't Select two tabs: Two underlines leave people unsure which view they’re in. — Row(VIEWS) with the first and second both `active`
- Do Scroll a long set: Six filters hug their labels and scroll. — Row(FILTERS, 0, scrollable) | Don't Squeeze six equal tabs: The labels overlap when six tabs share one row. — Row(FILTERS, 0)
- Do Name each view: “Activity” says what’s there. — Row(VIEWS, 0) | Don't Number the tabs: “Tab 1”, “Tab 2”, and “Tab 3” say nothing about the view. — Row([Tab 1, Tab 2, Tab 3], 0)

## Sources
header: Sources · title: Use the public Tabs contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> from the team’s private package repository. In Figma, tabs hug their labels and carry a counter badge; in code they share the row equally unless the row is scrollable, and there is no badge. The published Storybook predates 0.1.78, so its stories show older labels. On the web each tab is announced by its label, but the selected tab is not announced; Enter selects a focused tab, while Space and the arrow keys do nothing.

## Limits
Do not show Dark mode (the active label stays black in Dark, #197), a counter badge, icons, disabled or loading tabs, `style` or `labelStyle` overrides, or hover styles. Do not imply arrow-key navigation, Space, or announced selection (#194). Do not link `components-tabitem--docs` (not published).
