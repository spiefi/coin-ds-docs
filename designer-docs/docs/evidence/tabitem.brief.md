# Tab Item brief

slug: tabitem · label: Tab Item · public API: TabItem, always inside Tabs (+ Card, VStack, ListItem for composition)
figma: https://www.figma.com/design/dSlK8ueQ7wlbyUSZd4f8QO/Coin-Subcomponents?node-id=66-913 · storybook: `const STORYBOOK = 'https://jfs-components-storybook.vercel.app/?path=/docs/tabs-tabitem--docs'` (the published docs id; do not use docsUrl) · stories: Tabs default=components-tabs--default, Tabs with labels=components-tabs--with-labels, Tabs scrollable=components-tabs--scrollable
checked: 8 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-636f3f5, Biscuit's main 636f3f5)
icon: one label with an underline — `<path d="M5 7h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M3 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />`
keywords: tab, tab label

Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`; every Coin instance gets `modes={LIGHT}`. TabItem has no `testID`: target `[role="tablist"] > [role="tab"]:nth-child(n)`, its label `… [dir="auto"]`, and an active tab's underline `… > div:last-child`.
"Row(items, selected)" = `<Tabs modes={LIGHT}>` with one `<TabItem modes={LIGHT} label=… active={i === selected} onPress={…} />` per item (`accessibilityLabel` where given). Put each Row on its own in `<div className="coin-new-host wide"><VStack modes={LIGHT} style={{ width: '100%' }}>…</VStack></div>`; "narrow host" is the same with `coin-new-host narrow` (the host is a flex row; without the full-width VStack the tabs shrink to their content).
YEARS = AY24 / AY25 / AY26 with `accessibilityLabel` "Assessment year 2024" / "Assessment year 2025" / "Assessment year 2026".

## Overview
summary: Use a Tab Item inside Tabs for each view: a short label that turns black with a gold underline while its view is showing.
principle: One view, one short label, and always inside Tabs.
playground: `.preview-stage` with a host holding Row([Overview, {editable item}, Details]). The middle item takes its `label` from a `text-control` "Label" (default "Activity", `maxLength={16}`). Segment "State" ['Idle', 'Active'] → the middle item's `active`; when Idle, Overview is active instead, so exactly one tab is selected. Pressing a tab also selects it and updates the State control. Readout title "Spoken name", value = the label; note: "Screen readers say the label. On the web they don’t hear which tab is selected." Stage label: "Live Coin Tab Item".

## Anatomy
header: Anatomy · title: A label and an underline · description: A Tab Item is a pressable label with 8 px above and below. When selected, its label turns black and a 2 px gold underline spans the tab’s full width.
specimen: Row([Overview, Statements], 0); specimenWidth 240
parts:
1. Selected tab — Its view is on screen now. — target: `[role="tablist"] > [role="tab"]:nth-child(1)` — side: left
2. Underline — Shown only while the tab is selected. — target: `[role="tablist"] > [role="tab"]:nth-child(1) > div:last-child` — side: bottom
3. Label — Names the view in a word or two. — target: `[role="tablist"] > [role="tab"]:nth-child(2) [dir="auto"]` — side: top
4. Idle tab — Grey until someone presses it. — target: `[role="tablist"] > [role="tab"]:nth-child(2)` — side: right
marks: padding `[role="tablist"] > [role="tab"]:nth-child(1)`

## Configuration
header: Configuration · title: A label, and a spoken name when needed · description: A Tab Item has no size, icon, or style options: you set its label and, when a view needs a count, the counter badge from Figma.
Grid `coin-new-example-grid`:
- Label — Row([Overview, Activity, Details], 0) — lesson: The label is also what screen readers say.
- Abbreviation with a spoken name — Row(YEARS, 1) — lesson: Short labels such as AY24 get a full spoken name: “Assessment year 2024”.

## States
header: States · title: Idle and active · description: The screen marks the tab whose view is showing as active; a Tab Item never selects itself. Pressing dims it to 70% until release. There is no disabled state.
Grid `coin-new-example-grid`, each a narrow host with a one-item Tabs:
- Idle — `<Tabs modes={LIGHT}><TabItem modes={LIGHT} label="Statements" /></Tabs>` — lesson: Grey label, no underline.
- Active — the same with `active` — lesson: Black label and a gold underline across the tab.

## Sizing
header: Sizing · title: 33 px tall; Tabs sets the width · description: A Tab Item is 33 px tall: a 17 px label with 8 px above and below. It is as wide as its label; Tabs places the tabs 16 px apart.
Measured diagram: `<Anatomy legend={false} specimenWidth={240} marks={[{ kind: 'size', target: '[role="tablist"] > [role="tab"]:nth-child(1)', side: 'bottom', label: 'both' }, { kind: 'padding', target: '[role="tablist"] > [role="tab"]:nth-child(1)' }]}>` Row([Overview, Statements], 0) `</Anatomy>`. Expected: 112 × 33.

## Content
header: Content · title: One or two words that name the view · description: Write a noun in sentence case, such as “Statements”. Don’t write actions like “Download” or long phrases; when a label must be abbreviated, give the tab a spoken name.
One ExampleCard "View names" holding a host with Row([Overview, Activity, Details], 0).

## In context
header: In context · title: Tax years over one panel · description: Each Tab Item belongs to a Tabs row. The screen marks one active and swaps the panel when another is pressed; the abbreviated labels each have a spoken name.
Composition in `.coin-new-context`: `<Card modes={LIGHT}>` › `<VStack modes={LIGHT} style={{ width: '100%' }}>` › a controlled Row(YEARS) (starts on AY25) and below it ListItems (`layout="Horizontal" navArrow={false}`, with `supportText`) for the selected year:
- AY24: "Refund" · "₹2,340, credited 12 Nov 2024"; "Return filed" · "28 Jul 2024".
- AY25: "Refund" · "₹1,180, credited 9 Oct 2025"; "Return filed" · "30 Jul 2025".
- AY26: "Return" · "Not filed yet"; "Due date" · "31 Jul 2026".
Below the card, `<p className="coin-new-readout" role="status">Showing {spoken name}</p>`.

## Do & Don'ts
header: Do & Don’ts · title: Keep each tab in its row · description: Each pair shows a Tab Item used as intended versus one that confuses people.
Every preview is a host (`coin-new-host wide`).
- Do Use it inside Tabs: The row places the tabs 16 px apart. — Row([Overview, Activity, Details], 0) | Don't Place one on its own: A lone Tab Item stretches across its container with no row around it. — `<TabItem modes={LIGHT} label="Overview" active />` on its own
- Do Mark one tab active: One underline shows the current view. — Row([Overview, Activity, Details], 2) | Don't Mark two tabs active: Only the first is underlined, which may not be the view that’s showing. — the same Row with the first and third both `active`
- Do Name the view: “Statements” says what the panel shows. — Row([Overview, Statements], 1) | Don't Write an action: “Download” sounds like a button, but tabs only switch views. — Row([Overview, Download], 1)

## Sources
header: Sources · title: Use Tab Item through Tabs · description: The guide compares the Figma subcomponent with the installed package and the Tabs stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (5 October build) from the team’s private package repository. Tab Item is a subcomponent: in Figma it lives in Coin Subcomponents and reaches designs through the Tabs slot. Figma’s variants are State Idle and Active, each with a counter badge; the package shows the badge when a count is set. The published Storybook has no Tab Item stories yet, so the story links show Tabs. On the web a tab is announced by its label or spoken name and whether it is selected; Enter and Space select it, and the arrow keys move between tabs.

## Limits
Do not show Dark mode (#197), a counter badge, icons, a disabled tab, `style` or `labelStyle` overrides, or hover styles. Do not imply a single Tab stop for the row (#194 is still open for it). Do not suggest using Tab Item outside Tabs.
