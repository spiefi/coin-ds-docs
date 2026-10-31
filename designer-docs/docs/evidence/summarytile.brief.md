# Summary Tile brief

slug: summarytile · label: Summary Tile · public API: SummaryTile (+ Button, IconButton in `children`; Card, VStack, ListGroup, ListItem, MoneyValue for In context)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4116-6354 · storybook: docsUrl('summarytile') · stories: Default=components-summarytile--default, With chevron=components-summarytile--with-chevron, Pressable with chevron=components-summarytile--with-chevron-pressable, High confidence=components-summarytile--high-confidence, No indicator=components-summarytile--no-indicator, Custom action=components-summarytile--custom-action-button, Icon button action=components-summarytile--icon-button-action
checked: 20 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-c7d3348; Biscuit's newer e60f8bd8 changes only the Storybook page)
icon: a row of two text lines, three rising bars, and a rounded bar — `<><path d="M2 6.5h5M2 11h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /><path d="M8.75 7v-.5M10.25 7V5.5M11.75 7V4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /><rect x="11.5" y="9.5" width="5" height="3.5" rx="1.75" stroke="currentColor" strokeWidth="1.5" fill="none" /></>`
keywords: section header, summary row, dashboard header, confidence meter, strength indicator

Setup: `LIGHT = { 'Color Mode': 'Light' } as Modes`; `TILE = { 'Color Mode': 'Light', AppearanceBrand: 'Secondary', 'Button / Size': 'S' } as Modes` (every tile gets it unless stated: the tile hands these to your Button, which then looks like Figma's); `CARD = { 'Color Mode': 'Light', AppearanceBrand: 'Neutral' } as Modes`; `noop = () => {}`; `W = { maxWidth: 320 } as const`.
“Btn(label, onPress = noop)” = `<Button label={label} onPress={onPress} />` (no modes of its own).
“ST(overrides = {})” = `<SummaryTile title="Spending" description="Know your spending and savings" confidence="High" modes={TILE} style={W} children={Btn('Set budget')} {...overrides} />` (overrides win; `children: undefined` shows the placeholder Button, `children: null` shows none).
Selectors (no testID; static root only): `R = ':scope > div'`; title `${R} > div:first-child > div:first-child > [dir="auto"]`; meter `${R} [role="img"][aria-label^="Strength"]`; description `${R} > div:first-child > [dir="auto"]`; text column `${R} > div:first-child`; title row `${R} > div:first-child > div:first-child`; action `${R} > div:nth-child(2)`.

## Overview
summary: Use a Summary Tile to head a dashboard block: a title with a confidence meter, one line about the block, and one action or a chevron.
principle: Name the block, then offer one way in.
playground: `.preview-stage` › ST({ confidence, children: CHILD[children], chevron, onPress: pressable ? () => setLast('Row pressed') : undefined }); stage label "Live Coin Summary Tile". Controls: Segment "confidence" `High | Medium | Low | None | null` (High; null passes `null`); Segment "children" `Button | IconButton | left out | null` (Button) where Button = Btn('Set budget', () => setLast('Set budget pressed')), IconButton = `<IconButton iconName="ic_chevron_right" onPress={() => setLast('IconButton pressed')} />`, left out = `undefined`, null = `null`; OnOff "chevron" (off); OnOff "onPress" (off). Readout title "Last press", value "None", then the latest press; note: "Left out, children shows a placeholder Button that does nothing; onPress removes it."

## Anatomy
header: Anatomy · title: A title, a meter, a line, and an action · description: The tile is one row with no panel of its own: the title and its meter sit over a line of description, and the action sits at the end. The chevron, when chevron is on, follows the action.
specimen: `<Anatomy specimenWidth={320} …>` › ST().
parts:
1. Title — title: the block’s name, 16 px bold, on one line. — target: title — side: left
2. Meter — A StrengthIndicator from confidence; null removes it. — target: meter — side: top
3. Description — description: what the block holds, 12 px; it wraps. — target: description — side: bottom
4. Action — children: your Button, given the tile’s modes. — target: action — side: right

## Configuration
header: Configuration · title: An action, a chevron, or neither · description: children holds the action. Left out, the tile shows a placeholder Button with no onPress, so pass your own Button or IconButton, or null for none. The tile passes its modes to whatever you put there, and your Button’s own modes win. Give the tile AppearanceBrand Secondary and Button / Size S, as every example here does, and your Button is purple and small, as Figma draws it. chevron adds a forward arrow at the end. AppearanceBrand, Emphasis, and Semantic Intent change only the action: the title, description, and meter keep their look.
Body: `<div className="coin-new-stack">` with two `coin-new-example-grid` grids (two columns each).
Grid 1:
- Your Button — ST() — lesson: A purple, size S Button from the tile’s modes.
- IconButton — ST({ title: 'Bills', description: '3 bills due this week', confidence: 'Low', children: <IconButton iconName="ic_chevron_right" onPress={noop} /> }) — lesson: A round icon action instead of a label.
- Chevron — ST({ title: 'Insights', description: 'This month’s breakdown', children: null, chevron: true, onPress: noop }) — lesson: A forward arrow, with onPress on the whole row.
- No action — ST({ title: 'Bills', description: 'Manage scheduled payments', confidence: null, children: null }) — lesson: children and confidence set to null: only text.
Grid 2:
- Emphasis Medium — ST({ modes: { ...TILE, Emphasis: 'Medium' } }) — lesson: A light purple action.
- Emphasis Low — ST({ modes: { ...TILE, Emphasis: 'Low' } }) — lesson: A text action.
- AppearanceBrand Neutral — ST({ modes: { ...TILE, AppearanceBrand: 'Neutral' } }) — lesson: A dark grey action.
- Semantic Intent System — ST({ title: 'Bills', description: '2 bills are overdue', confidence: 'Low', children: Btn('Pay now'), modes: { ...TILE, 'Semantic Intent': 'System', AppearanceSystem: 'negative' } }) — lesson: AppearanceSystem negative turns the action red.

## States
header: States · title: Confidence, and a pressable row · description: confidence shows how much data stands behind the block: High lights three green bars, Medium two orange, Low one red, and None, the default, three grey. A number from 0 to 1 picks the nearest level. onPress makes the whole row one button that dims while pressed; it removes the placeholder Button, not one you pass. The tile has no disabled, selected, or loading state.
Grid `coin-new-example-grid` (two columns):
- High — ST({ confidence: 'High' }) — lesson: Three green bars: enough data.
- Medium — ST({ confidence: 'Medium' }) — lesson: Two orange bars.
- Low — ST({ confidence: 'Low' }) — lesson: One red bar.
- None — ST({ confidence: 'None' }) — lesson: Three grey bars: no data yet.

## Sizing
header: Sizing · title: The host sets the width · description: The tile fills its host’s width and adds no padding, background, or border: the card or screen around it supplies them. Figma draws it at 280 px. The text takes the room the action leaves, so the description wraps onto more lines, and the title ends in … unless disableTruncation is set. The parts are 8 px apart, and the meter sits 4 px after the title.
Body: `<div className="coin-new-stack">` with the measured diagram, then a grid.
Measured diagram: `<Anatomy legend={false} specimenWidth={320} marks={[{ kind: 'size', target: R, side: 'bottom', label: 'both' }, { kind: 'gap', from: text column, to: action }, { kind: 'gap', from: title row, to: description }]}>` › ST(). Expected 320 × 44 with gaps 8 and 8; report the measured values.
Grid `coin-new-example-grid` (two columns); the first two put the tile in a host and pass `style: undefined`:
- Narrow host — `<div className="coin-new-host narrow">` › ST({ style: undefined }) — lesson: At 240 px the description wraps and the title is cut short.
- Wide host — `<div className="coin-new-host wide">` › ST({ style: undefined }) — lesson: At 360 px it fits on one line.
- Long title — ST({ title: 'Spending across all your accounts' }) — lesson: The title ends in … on one line.
- disableTruncation — ST({ title: 'Spending across all your accounts', disableTruncation: true }) — lesson: The title wraps, and the meter stays beside it.

## Content
header: Content · title: Name the block, say what’s in it, use a verb · description: Make the title the block’s name in a word or two, such as Spending, Bills, or Goals. The description says what the block holds in one short line; it never truncates, so a paragraph makes the row tall. Label the action with a verb for the block, such as Set budget, Pay bills, or Add goal.
Grid `coin-new-example-grid` (two columns):
- Goals — ST({ title: 'Goals', description: 'Save for a trip to Goa', confidence: 'Medium', children: Btn('Add goal') }) — lesson: “Goals”, what it tracks, and “Add goal”.
- Bills — ST({ title: 'Bills', description: '3 bills due this week', confidence: 'Low', children: Btn('Pay bills') }) — lesson: “Bills”, what’s due, and “Pay bills”.

## In context
header: In context · title: Spending on the Money screen · description: The tile heads a card, and the list under it is the block it introduces. See all opens the screen’s own spending view through the Button’s onPress; the tile only lays out the row.
Composition in `.coin-new-context` › `<Card modes={CARD}>` › `<VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes}>` › ST({ style: undefined, description: 'Your top categories this month', children: Btn('See all', () => setOpened(true)) }) and `<ListGroup modes={LIGHT}>` with three `<ListItem layout="Horizontal" modes={LIGHT} navArrow={false} title=… supportText=… trailing={<MoneyValue value=… currency="₹" modes={LIGHT} />} />`: Food “12 orders” 6,240; Shopping “5 orders” 4,180; Travel “3 trips” 2,950. Below the card, `<p className="coin-new-readout" role="status">`: “Spending view not opened” or “Opened all spending”.

## Do & Don'ts
header: Do & Don’ts · title: A quiet action, one press target, a real verb · description: Each pair shows a tile that reads as a header next to one that shouts, presses twice, or does nothing.
- Do Modes on the tile: AppearanceBrand Secondary and Button / Size S make your Button match Figma. — ST() | Don't A bare Button: Without those modes it’s gold and size M, too loud for a header. — ST({ modes: LIGHT })
- Do A chevron on a row that opens: onPress makes the whole row the one target. — ST({ title: 'Insights', description: 'This month’s breakdown', children: null, chevron: true, onPress: noop }) | Don't A Button in a pressable row: Both press, and the Button sits inside the row’s button. — ST({ title: 'Insights', description: 'This month’s breakdown', chevron: true, onPress: noop })
- Do Your own Button: A verb that does something. — ST() | Don't The placeholder: Left out, children shows “Button”, which does nothing. — ST({ children: undefined })

## Sources
header: Sources · title: Use the public Summary Tile contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (19 October build of Biscuit’s main) from the team’s private package repository. Figma’s Summary Tile exposes only <code>chevron</code> and the action slot; the title, description, and confidence are overrides there. The package’s default action is a placeholder Button with no <code>onPress</code>, and a Button passed in <code>children</code> doesn’t get its purple, size S look, so these examples set AppearanceBrand Secondary and Button / Size S on the tile. The title’s line is 20 px (Figma 18), so a one-line tile is 44 px tall, not 42. <code>disableTruncation</code> affects only the title, and a tile without <code>onPress</code> isn’t announced by its title. The published Storybook still shows the older generated page (all reported).

## Limits
Don't show Dark, Context, Context2, context5, context 10, Page type, NavArrow Direction, List Item Style or Button / State, titleStyle or descriptionStyle. Don't imply the tile has padding, a background or a border, that the description truncates, that a static tile is announced by its title, that the chevron is pressable on its own, or a disabled or loading state.
