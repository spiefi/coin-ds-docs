# Plan Comparison Card brief

slug: plancomparisoncard · label: Plan Comparison Card · public API: PlanComparisonCard (+ Badge in a cell, Text in `children`; Text, VStack and Button for In context; the kit's ScreenFrame and FitWidth)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4498-2968 · storybook: docsUrl('plancomparisoncard') · stories: Default=components-plancomparisoncard--default, Three plans=components-plancomparisoncard--three-plans, Interactive info=components-plancomparisoncard--interactive-info, Custom slot=components-plancomparisoncard--custom-slot
checked: 21 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-c7d3348; Biscuit's newer e60f8bd8 changes only the Storybook page)
icon: a table with a header row and a column line — `<><rect x="2.5" y="3.5" width="13" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M2.5 7.5h13M2.5 11h13M8.5 7.5v7" stroke="currentColor" strokeWidth="1.5" fill="none" /></>`
keywords: plan comparison, compare plans, feature matrix, upgrade table, membership plans

Setup: `JIOPLUS = { 'Page type': 'JioPlus' } as Modes`; `noop = () => {}`; `W = { width: 328 }` (Figma's width, for the two diagrams); `WF = { width: 320 }` (fits the frame's 326 px content without scaling on desktop).
TWO = `[{ label: 'Your plan' }, { label: 'JioFinance+', brand: true }]`; TWO_PLAIN = `[{ label: 'Your plan' }, { label: 'JioFinance+' }]`.
THREE = `[{ label: 'Free' }, { label: 'Plus' }, { label: 'Premium', brand: true }]`; THREE_PLAIN = the same without `brand`.
ROWS = `[{ label: 'JioPoints multiplier', values: ['1x', '1.25x'] }, { label: 'Cashback', showInfo: true, values: [false, '₹5,000'] }, { label: 'Bonus JioGold', showInfo: true, values: [false, '1%'] }]`.
ROWS3 = `[{ label: 'JioPoints', values: ['1x', '1.1x', '1.25x'] }, { label: 'Cashback', showInfo: true, values: [false, '₹2,000', '₹5,000'] }, { label: 'Gold bonus', showInfo: true, values: [false, false, '1%'] }]`.
ROWS_PLAIN = ROWS with `showInfo` removed. ROWS_BADGE = `[ROWS[0], ROWS[1], { label: 'Gold locker', values: [false, <Badge label="New" />] }]` (no modes on the Badge: the card passes its own).
LONG3 = `{ columns: [{ label: 'Free' }, { label: 'Plus' }, { label: 'JioFinance+', brand: true }], rows: [{ label: 'JioPoints multiplier', values: ['1x', '1.1x', '1.25x'] }, { label: 'Cashback', showInfo: true, values: [false, 'Up to ₹2,000', 'Up to ₹5,000'] }, { label: 'Bonus JioGold', showInfo: true, values: [false, false, '1%'] }] }`.
“PCC(overrides = {})” = `<PlanComparisonCard columns={TWO} rows={ROWS} modes={JIOPLUS} style={W} {...overrides} />` (overrides win).
“Framed(overrides)” = `<ScreenFrame surface="dark"><FitWidth>{PCC({ style: WF, ...overrides })}</FitWidth></ScreenFrame>`. The card is white on black and is designed for a dark screen: every PCC outside the Anatomy diagrams is Framed (playground, every ExampleCard, both sides of each Do & Don't). Three rows keep it inside the frame without scrolling.
Selectors (no testID): `R = ':scope > div'`; HEADER `${R} > div:nth-child(1)`; plan name `${R} > div:nth-child(1) > div:nth-child(2) > [dir="auto"]`; brand name `${R} > div:nth-child(1) > div:nth-child(3) > [dir="auto"]`; TABLE `${R} > div:nth-child(2)`; ROW1 `${TABLE} > div:nth-child(1)`, ROW3 `${TABLE} > div:nth-child(3)`; feature `${ROW1} > div:nth-child(1) > [dir="auto"]`; value `${ROW1} > div:nth-child(3) > [dir="auto"]`; info icon `${ROW3} > div:nth-child(1) > div:last-child`; cross `${ROW3} > div:nth-child(2) > div`; label cell `${ROW1} > div:nth-child(1)`; value cell `${ROW1} > div:nth-child(3)`.

## Overview
summary: Use a Plan Comparison Card to compare two or three plans feature by feature, with the plan you recommend in gold.
principle: Same features, side by side.
playground: `.preview-stage` › Framed({ columns, rows, }) where columns = plans `two` → (brand ? TWO : TWO_PLAIN), `three` → (brand ? THREE : THREE_PLAIN); rows = (plans `two` ? ROWS : ROWS3) with every row after the first set by info: `none` → no `showInfo`, `showInfo` → `showInfo: true`, `onInfoPress` → `onInfoPress: () => setLast(`${row.label} info pressed`)`. Stage label "Live Coin Plan Comparison Card". Controls: Segment "columns" `two | three` (two); OnOff "brand" (on); Segment "info" `none | showInfo | onInfoPress` (showInfo). Readout title "Last press", value "None" or "<label> info pressed"; note: "Only onInfoPress makes the icon a button. The card and its rows don’t press."

## Anatomy
header: Anatomy · title: Plan names over a table of features · description: Plan names sit in a row above a dark table. Each row of the table is one feature: its label on the left, then one cell per plan, in the same order as the names.
specimen: `<Anatomy surface="dark" …>` › PCC() (no frame and no `specimenWidth`: the card keeps its 328 px through `style`, so Anatomy scales it down on phones instead of narrowing it).
parts:
1. Plan names — columns: one name per plan, 14 px, centred over its column. — target: plan name — side: top
2. Recommended plan — brand: true turns that plan’s name gold. — target: brand name — side: right
3. Feature — A row’s label, 12 px, always on one line. — target: feature — side: left
4. Value — A string or number from values, 12 px medium, centred. — target: value — side: right
5. Info icon — showInfo adds it after the label; onInfoPress makes it a button. — target: info icon — side: bottom
6. Not included — false in values: a grey cross. — target: cross — side: bottom
7. Table — A dark panel with 16 px corners and a 1 px line between rows. — target: TABLE — side: left, at 0.85

## Configuration
header: Configuration · title: Plans, features, and cells · description: columns names the plans, left to right. Mark the one you recommend with brand: its name turns gold. rows lists the features: each row’s values fill the plan columns in the same order. A string or number shows as text, false shows a grey cross, and any Coin component, such as a Badge, shows as it is. showInfo adds an info icon after a feature’s label. children replaces the table with your own content, under the same plan names. No mode restyles the card: the modes you give it pass to the components in its cells and slot.
Body: `<div className="coin-new-stack">` with two `coin-new-example-grid` grids (two columns), each card Framed.
Grid 1:
- Two plans — PCC() — lesson: Your plan against the one you recommend, in gold.
- Three plans — PCC({ columns: THREE, rows: ROWS3 }) — lesson: Each plan column gets narrower, so names and values stay short.
- No recommendation — PCC({ columns: TWO_PLAIN }) — lesson: Without brand, every plan name is white.
- A Badge in a cell — PCC({ rows: ROWS_BADGE }) — lesson: A Coin component fills the cell and gets the card’s modes.
Grid 2:
- Without info icons — PCC({ rows: ROWS_PLAIN }) — lesson: Leave out showInfo when a feature needs no explaining.
- Custom body — PCC({ children: <Text text="JioFinance+ benefits change on 1 November." /> }) — lesson: Your content replaces the table; the plan names stay, and the card adds no panel.

## States
header: States · title: An info icon that explains or only hints · description: showInfo draws the icon as a hint: it doesn’t press, and screen readers skip it. onInfoPress makes the same icon a button named “More information about” and the feature, with a bigger tap area than it looks. Use it to open the explanation, for example in a sheet. The card and its rows have no pressed, selected, or disabled state.
Grid `coin-new-example-grid` (two columns), each Framed:
- Hint — PCC() — lesson: The icon only marks that more detail exists.
- Button — PCC({ rows: ROWS.map((row, i) => i === 0 ? row : { label: row.label, values: row.values, onInfoPress: noop }) }) — lesson: Looks the same, but each icon is a button you can tab to.

## Sizing
header: Sizing · title: Fills its host, nothing wraps · description: The card fills the width of its host; Figma draws it at 328 px. The feature column takes 1.8 shares of the width and each plan column one share, so at 328 px two plans leave about 67 px for each value and three plans about 48 px. Text never wraps or shortens: a name, label, or value too long for its column runs into the next one. Height follows the rows: each row is 46 px, and the plan names sit 16 px above the table.
Body: measured diagram only: `<Anatomy legend={false} surface="dark" marks={[{ kind: 'size', target: R, side: 'bottom', label: 'both' }, { kind: 'gap', from: HEADER, to: TABLE }, { kind: 'padding', target: label cell }, { kind: 'size', target: value cell, side: 'right', label: 'both' }]}>` › PCC(). Expected 328 × 176 (header 18, gap 16, table 142), cell padding 12, value cell about 91 × 46; report the measured values.

## Content
header: Content · title: Short names, short values · description: Call the user’s current plan Your plan and the others by their product names, in a word or two. Write features as nouns, such as Cashback or Bonus JioGold, not sentences. Keep values to a number or a few characters: 1.25x, ₹5,000, 1%. Use false for a feature a plan doesn’t include, not the word No, so every missing feature looks the same. With three plans, keep names under about 8 characters.
Grid `coin-new-example-grid` (two columns), each Framed:
- Upgrade from your plan — PCC() — lesson: The current plan first, the upgrade by its product name.
- Three tiers — PCC({ columns: THREE, rows: ROWS3 }) — lesson: Short names and values that fit the narrower columns.

## In context
header: In context · title: The JioFinance+ upgrade screen · description: The comparison sits between the screen’s heading and its upgrade button. Each info icon opens that feature’s explanation through onInfoPress; the button starts the upgrade through its own onPress.
Composition in `.coin-new-context` › `<ScreenFrame size="full" surface="dark" footer={<VStack style={{ padding: 16 }}><Button label="Upgrade to JioFinance+" onPress={() => setOpened('Upgrade')} modes={{ AppearanceBrand: 'Primary' } as Modes} style={{ width: '100%' }} /></VStack>}>` › `<VStack modes={{ ...JIOPLUS, 'Slot gap': 'L' } as Modes} style={{ flex: 1, padding: 16 }}>` › `<VStack modes={{ ...JIOPLUS, 'Slot gap': 'XS', Padding: 'None' } as Modes}>` holding `<Text text="Get more with JioFinance+" modes={{ ...JIOPLUS, 'Text Sizes': 'Large', Weight: 'Bold' } as Modes} />` and `<Text text="Compare what you get today with the upgrade." modes={{ ...JIOPLUS, 'Text Sizes': 'Small', Weight: 'Regular' } as Modes} />`, then `<FitWidth>`{PCC({ style: { width: 326 }, rows: ROWS.map((row, i) => i === 0 ? row : { label: row.label, values: row.values, onInfoPress: () => setOpened(`${row.label} details`) }) })}`</FitWidth>` (326 = the screen's width inside its padding, so the card lines up with the heading). The button sits at the bottom of the screen as its footer. Below the frame, `<p className="coin-new-readout" role="status">`: “Nothing opened yet”, “Opened Cashback details”, or “Started the upgrade”.

## Do & Don'ts
header: Do & Don’ts · title: Crosses, one gold plan, values that fit · description: Each pair shows a comparison that reads at a glance next to one that hides a missing feature, loses the recommendation, or spills out of its columns.
- Do Cross for not included: false shows the same grey cross in every cell. — PCC() | Don't The word No: Text reads like a value and looks different from the crosses. — PCC({ rows: [ROWS[0], { ...ROWS[1], values: ['No', '₹5,000'] }, { ...ROWS[2], values: ['No', '1%'] }] })
- Do One recommended plan: Only JioFinance+ is gold. — PCC() | Don't Every plan gold: Nothing stands out as the one to pick. — PCC({ columns: [{ label: 'Your plan', brand: true }, { label: 'JioFinance+', brand: true }] })
- Do Short names for three plans: Every name and value fits its column. — PCC({ columns: THREE, rows: ROWS3 }) | Don't Long names in three columns: Text doesn’t wrap, so it runs into the next column and off the card. — PCC(LONG3)
- Do One value per plan: Each value sits under its own plan. — PCC() | Don't A value missing: Values fill columns in order, so ₹5,000 lands under Your plan. — PCC({ rows: [ROWS[0], { ...ROWS[1], values: ['₹5,000'] }, ROWS[2]] })

## Sources
header: Sources · title: Use the public Plan Comparison Card contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (19 October build of Biscuit’s main) from the team’s private package repository. Figma’s Plan Comparison Card exposes only its Slot as a property; the plan names, rows, and cells are layers there. In the package, the plan names split their row exactly 1.8 to 1 but the table’s cells don’t, because each cell’s padding counts first, so a name sits 3 to 8 px right of its column. Text never wraps or shortens and overflows narrow columns. The table is 5 px taller than Figma’s because its row lines sit outside the 46 px cells, and Figma draws no line under its third row. The info icon from <code>showInfo</code> and the grey cross have no accessible name. The published Storybook still shows the older generated page, with every story on a black host (all reported).

## Limits
Don't show or mention Color Mode or dark mode. Don't imply text wraps or shortens, that the card or rows press or select, that showInfo alone is a button, or that any mode restyles the card. Don't put literal colours in `children`.
