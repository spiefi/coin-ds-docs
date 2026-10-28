# List Group brief

slug: listgroup · label: List Group · public API: ListGroup (+ ListItem, Avatar, MoneyValue, IconCapsule for rows; VStack for In context)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2849-3171 · storybook: docsUrl('listgroup') · stories: Default=components-listgroup--default, With custom items=components-listgroup--with-custom-items, Without label=components-listgroup--without-label, Reorderable=components-listgroup--reorderable
checked: 28 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-dbe0e02 = Biscuit’s main dbe0e02, 27 October)
icon: a heading line over two rows — `<><path d="M3 3.5h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /><rect x="2.5" y="6.5" width="13" height="3.5" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" /><rect x="2.5" y="12" width="13" height="3.5" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" /></>`
keywords: list section, grouped list, section header, transaction list, reorder list

Setup: `M = (m: Record<string, string> = {}) => ({ 'Color Mode': 'Light', ...m }) as Modes`. `LIGHT = M()` (one constant).
TX = Netflix / "12 Mar" / "499" / NE · Swiggy / "10 Mar" / "320" / SW · Adani Electricity / "8 Mar" / "1,840" / AE · Jio Fiber / "28 Feb" / "999" / JF · Zomato / "14 Feb" / "650" / ZO (dates only, so Boxed rows don’t wrap in three-column grids).
“ROW(tx, extra = {})” = `<ListItem key={tx.title} layout="Horizontal" title={tx.title} supportText={tx.support} leading={<Avatar style="Monogram" monogram={tx.initials} />} trailing={<MoneyValue value={tx.value} currency="₹" />} onPress={() => {}} {...extra} />`. Rows carry no modes: the group passes its own.
“G(m, label, rows)” = `<ListGroup modes={M(m)} label={label}>{rows}</ListGroup>`; MARCH = the first three TX, TWO = the first two.
PINNED = Savings / "Balance and statements" / ic_savings · Bills / "Electricity, water, gas" / ic_bill · Mobile recharge / "Jio prepaid" / ic_mobile · Wallet / "JioPay wallet" / ic_wallet (ids = titles).
Selectors: `A = byTestId('lg-anatomy')`, `S = byTestId('lg-size')` (testID lands on the root `ul`); label `${X} > div:first-child`; rows `${X} > div:nth-child(2)`; row n `${X} > div:nth-child(2) > :nth-child(n)`.

## Overview
summary: Use a List Group to put related list rows under one label, such as a month of payments, with one style for every row.
principle: One label, one look for every row under it.
playground: `.preview-stage` › `<VStack modes={LIGHT} style={{ width: 360, maxWidth: '100%' }}>` › G({ 'List Item Style': style, 'Title Level': level }, label ? 'March 2025' : undefined, MARCH rows). Stage label "Live Coin List Group". Controls: Segment "List Item Style" `Default | Boxed | Minimal` (Default); Segment "Title Level" `Default | Bold` (Default); OnOff "label" (on).

## Anatomy
header: Anatomy · title: A label over rows · description: The label sits 12 px above the rows, and the rows sit 12 px apart. The group draws nothing else: no fill, border, or padding.
specimen: `<Anatomy specimenWidth={328} marks={[{ kind: 'gap', from: label(A), to: rows(A) }]} parts={…}>` › `<ListGroup testID="lg-anatomy" modes={LIGHT} label="March 2025">` TWO rows.
parts (if the survey reports overlaps, move a pin’s `at`):
1. Label — label: what the rows share, on one line. — target: label(A) — side: top
2. Row — A List Item; the group passes its modes to it. — target: row 1 of A — side: right
3. Group — A column that fills its width, with no fill or padding. — target: A — side: bottom — at: 0.5 (with an outline mark `{ kind: 'outline', target: A, variant: 'bounds' }`)

## Configuration
header: Configuration · title: Row style and label weight · description: List Item Style changes every row: Default rows sit 12 px apart with no fill, Boxed puts each row on a white card, and Minimal packs them 4 px apart with lighter titles. Title Level makes the label bigger and bolder. Without a label the rows start at the top.
Grid 1 `coin-new-example-grid three`, each G(…, 'March 2025', TWO rows):
- Default — {} — lesson: Rows 12 px apart, no fill.
- Boxed — { 'List Item Style': 'Boxed' } — lesson: Each row on a white card.
- Minimal — { 'List Item Style': 'Minimal' } — lesson: Rows 4 px apart, regular titles.
Grid 2 `coin-new-example-grid three`, TWO rows:
- Title Level Default — G({}, 'March 2025') — lesson: A 14 px grey label.
- Title Level Bold — G({ 'Title Level': 'Bold' }, 'March 2025') — lesson: An 18 px black label.
- No label — G({}, undefined) — lesson: The rows start at the top.

## States
header: States · title: Rows people can reorder · description: Give the group data, renderItem, keyExtractor, and onDragEnd, and every row gets a drag handle. People drag a row by its handle, and onDragEnd hands your screen the new order to save. All four are needed: leave one out and only the label shows. In this mode the group doesn’t pass its modes on, so give every row the same modes.
One ExampleCard "Drag a handle" (description: "Your screen keeps the order; this one shows it below.") › state `order` (starts PINNED) › `<ListGroup modes={LIGHT} label="Pinned on home" data={order} keyExtractor={(i) => i.id} onDragEnd={({ data }) => setOrder(data)} renderItem={({ item, isActive, drag }) => <ListItem layout="Horizontal" modes={LIGHT} title={item.title} supportText={item.support} navArrow={false} isDraggable isDragging={isActive} onDragHandleGrant={drag} leading={<IconCapsule iconName={item.icon} modes={M({ AppearanceBrand: 'Neutral' })} />} />} />`, then `<p className="coin-new-readout" role="status">` “Order: Savings, Bills, Mobile recharge, Wallet” (the titles in the current order).

## Sizing
header: Sizing · title: Full width, 12 px apart · description: The group fills its container and adds no padding: the label, 12 px, then rows 12 px apart, or 4 px with Minimal. Each row keeps its own height: 42 px for a Default List Item with an avatar, 68 px Boxed.
Body: `<Anatomy legend={false} specimenWidth={328} marks={[{ kind: 'size', target: S, side: 'bottom', label: 'both' }, { kind: 'gap', from: label(S), to: rows(S) }, { kind: 'gap', from: row 1 of S, to: row 2 of S }]}>` › `<ListGroup testID="lg-size" modes={LIGHT} label="March 2025">` TWO rows. Expected 328 × 126, both gaps 12; report the measured values.

## Content
header: Content · title: A label that names the rows · description: Write label as the one thing the rows share, such as a month or a kind of account, in a few words. It stays on one line and ends in an ellipsis; disableTruncation lets a longer label wrap.
Grid `coin-new-example-grid three`, TWO rows each:
- A month — G({}, 'March 2025') — lesson: Fits on one line.
- A sentence — G({}, 'Payments to merchants this month across all linked accounts') — lesson: It ends in an ellipsis.
- Wrapped — the same label with `disableTruncation` — lesson: disableTruncation shows all of it.

## In context
header: In context · title: Payments, a month at a time · description: A history screen stacks one group per month, newest first. Each label names the month, and each row opens that payment.
Composition: `.coin-new-context` › `<VStack modes={{ ...LIGHT, 'Slot gap': 'XL' } as Modes} alignHorizontal="stretch">` › G({}, 'March 2025', MARCH rows), G({}, 'February 2025', Jio Fiber and Zomato rows).

## Do & Don'ts
header: Do & Don’ts · title: One group, one list · description: Each pair shows a group that reads as one list next to one that falls apart.
- Do Set the style on the group: Every row takes Boxed from the group. — G({ 'List Item Style': 'Boxed' }, 'March 2025', TWO rows) | Don't Change it on one row: A row’s own modes win, so that row loses its card. — the same, with Swiggy as ROW(tx, { modes: M({ 'List Item Style': 'Default' }) })
- Do Rows under every label: Show a group only when it has rows. — G({}, 'March 2025', TWO rows) | Don't An empty group: Only the label shows, with nothing under it. — G({}, 'March 2025', no rows)

## Sources
header: Sources · title: Use the public List Group contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (27 October build of Biscuit’s main) from the team’s private package repository. Figma’s listGroup is one component: a Title over a slot of List Items, 12 px apart, drawn 352 px wide with “March 2025”. The package takes <code>label</code>, with none by default, and the rows as children. List Item Style and Title Level are modes, and the group passes its modes to its rows except when they can be reordered. It drops <code>accessibilityLabel</code> and hides the label from screen readers, so nothing names the list, and its rows aren’t list items (reported).

## Limits
Don't show or mention Color Mode or dark mode. Don't show `listGroupSlot` with `children`, `style`, or `accessibilityLabel`. Don't imply the group draws a surface, presses, saves the order, or names itself for screen readers.
