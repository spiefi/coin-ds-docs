# Comparison Bar brief

slug: comparisonbar · label: Comparison Bar · public API: ComparisonBar, ComparisonBarItem (+ ListGroup, ListItem, Avatar, Button, VStack for In context)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=5350-360 · storybook: docsUrl('comparisonbar') · stories: Default=components-comparisonbar--default, All empty=components-comparisonbar--all-empty, All filled=components-comparisonbar--all-filled
checked: 28 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-dbe0e02 = Biscuit’s main dbe0e02, 27 October)
icon: a bar with two slots and a button — `<><rect x="1.5" y="5" width="15" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M4.5 8v2M7.5 8v2M11 9h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /></>`
keywords: compare tray, compare drawer, add to compare, product comparison

Setup: `M = (m: Record<string, string> = {}) => ({ 'Color Mode': 'Light', ...m }) as Modes`; `LIGHT = M()`. Images: `COIN` = `../assets/gold-coin.png`, `JIO` = `../assets/jio-gold-logo.png`, `PHOTO` = `../assets/bank-hero.png` (square corners, for Radius).
Item lists (`ComparisonBarItem[]`, ids a–e): ONE = a COIN, b–d empty · EMPTY = a–d empty · FULL = a COIN, b JIO, c COIN, d JIO · PAIR = a COIN, b empty · FIVE = ONE plus e empty · PHOTOS = a PHOTO, b PHOTO, c–d empty.
“CB(items, props = {})” = `<FitWidth><ComparisonBar modes={LIGHT} items={items} {...props} /></FitWidth>` (props may replace `modes`). Every bar sits in FitWidth: it has a fixed width.
Selectors (no testID): `R = ':scope > div'` (the card); filled slot `F = ${R} > [aria-label="Remove item from comparison"]`; empty slot `E = ${R} > [aria-label="Add item to comparison"]`; picture `${F} > div:first-child`; close mark `${F} > div:last-child`; Compare `${R} > :last-child`; slot n `${R} > :nth-child(n)`. Anatomy and Sizing put the bare ComparisonBar in Anatomy (no FitWidth): Anatomy scales it.

## Overview
summary: Use a Comparison Bar to collect the items people pick to compare, as pictures in slots, and let them start the comparison.
principle: Show what’s picked; compare when there’s something to show.
playground: `.preview-stage` › state `items` (starts ONE). CB(items, { modes: M({ 'Button / Size': size }), disableCompareWhenEmpty: autoOff, onItemPress: (_, i) => fill slot i with `i % 2 ? JIO : COIN`, onItemRemove: (_, i) => clear slot i }). Stage label "Live Coin Comparison Bar". Controls: Segment "Button / Size" `M | S` (M); OnOff "disableCompareWhenEmpty" (on). Readout title "Compare", value "On: 1 of 4 added" (the count) or, with nothing added, "Off: nothing added yet" (or "On: nothing added yet" when the switch is off); note "Tap an empty slot to add a coin, and a picture to remove it."

## Anatomy
header: Anatomy · title: Slots, then the button · description: A white card holds a row of slots and a Compare button. A filled slot shows its picture; an empty one shows a + for adding the next item.
specimen: `<Anatomy marks={[{ kind: 'gap', from: slot 1, to: slot 2 }]} parts={…}>` › `<ComparisonBar modes={LIGHT} items={ONE} />`.
parts (if the survey reports overlaps, move a pin’s `at` or side):
1. Card — A white card as wide as its slots and button. — target: R — side: left
2. Filled slot — A picture; pressing anywhere on the slot removes it. — target: `${F} > div:first-child` — side: bottom
3. Remove mark — Shows the slot removes; it isn’t a separate button. — target: `${F} > div:last-child` — side: top
4. Empty slot — A + that asks your screen to add an item. — target: E — side: bottom
5. Compare — A Coin Button that stays off until a slot has a picture. — target: Compare — side: right

## Configuration
header: Configuration · title: Slots and the button · description: Pass one item per slot: an item with an imageSource is filled, and one without is empty. compareLabel names the button, which is Coin’s Button at size M; Button / Size S gives the smaller button Figma draws. Radius rounds the pictures’ corners, which shows on square photos.
Grid 1 `coin-new-example-grid` (2 × 2):
- Four slots — CB(ONE) — lesson: Figma’s layout: one picture and three to add.
- Two slots — CB(PAIR) — lesson: Fewer slots make a shorter bar.
- Button / Size S — CB(ONE, { modes: M({ 'Button / Size': 'S' }) }) — lesson: A 32 px button, as in Figma.
- compareLabel — CB(FULL, { compareLabel: 'Compare 4' }) — lesson: The button widens with its label.
Grid 2 `coin-new-example-grid`:
- Radius None — CB(PHOTOS, { modes: M({ Radius: 'None' }) }) — lesson: Square corners.
- Radius L — CB(PHOTOS, { modes: M({ Radius: 'L' }) }) — lesson: Fully rounded corners.

## States
header: States · title: Empty, filled, and off · description: Each slot is a button. Pressing an empty one asks your screen to add an item (onItemPress), and pressing a filled one asks it to remove that item (onItemRemove). The bar keeps no list of its own, so your screen changes items. Compare stays dimmed and can’t be pressed until a slot has a picture; one is enough.
Grid `coin-new-example-grid` (2 × 2):
- Nothing added — CB(EMPTY) — lesson: Compare is dimmed and can’t be pressed.
- One added — CB(ONE) — lesson: One picture turns Compare on.
- All added — CB(FULL) — lesson: Every slot shows a picture and a remove mark.
- Two needed — CB(ONE, { compareDisabled: true }) — lesson: compareDisabled keeps it off, say until two are added.

## Sizing
header: Sizing · title: As wide as its slots · description: The bar hugs its content: 10 and 12 px of padding, 45 × 44 px slots 12 px apart, then the button. Four slots and the default button make it 369 × 66 px; Figma draws 344 × 64 with the smaller button. Each slot adds 57 px, and the bar never wraps or scrolls.
Body: `<Anatomy legend={false} marks={[{ kind: 'size', target: R, side: 'bottom', label: 'both' }, { kind: 'padding', target: R }, { kind: 'gap', from: slot 1, to: slot 2 }]}>` › `<ComparisonBar modes={LIGHT} items={ONE} />`. Expected 369 × 66, padding 10 / 12, gap 12; report the measured values.

## Content
header: Content · title: Pictures people recognise, a short verb · description: Use each item’s own picture, so people can tell at a glance what they picked. Keep compareLabel to a short verb such as Compare: a long label makes the bar wider than a phone. Give each item an accessibilityLabel with its name, or every slot is read out the same.
Grid `coin-new-example-grid`:
- A short verb — CB(FULL) — lesson: “Compare” keeps the bar 369 px wide.
- A sentence — CB(FULL, { compareLabel: 'Compare these 4 coins' }) — lesson: The bar grows past a 390 px phone.

## In context
header: In context · title: Comparing gold coins · description: People add coins from the list, and the bar fills from the left. Tapping a picture in the bar takes that coin out. Compare turns on with the first coin; your screen opens the comparison.
Composition: `.coin-new-context` › `<VStack modes={{ ...LIGHT, 'Slot gap': 'L' } as Modes} alignHorizontal="stretch">` ›
1. `<ListGroup modes={LIGHT} label="Gold coins">` with four `<ListItem layout="Horizontal" navArrow={false} title=… supportText=… leading={<Avatar imageSource={COIN} />} trailing={<Button label={added ? 'Added' : 'Add'} modes={M({ 'Button / Size': 'S', Emphasis: added ? 'Low' : 'Medium' })} onPress={() => toggle(id)} />} />`: "1 g gold coin" / "₹7,850 · 24K" · "2 g gold coin" / "₹15,640 · 24K" · "5 g gold coin" / "₹38,900 · 24K" · "10 g gold coin" / "₹77,500 · 24K".
2. `<FitWidth><ComparisonBar modes={LIGHT} items={slots} onItemPress={addNext} onItemRemove={(id) => remove(id)} onCompare={compare} /></FitWidth>`. `slots`: the picked coins in the order picked, each `{ id, imageSource: COIN, accessibilityLabel: `Remove ${title}` }`, then empty `{ id: 'empty-n' }` up to four. `addNext` picks the first coin not yet added. At most four coins: Add does nothing on a fifth.
3. `<p className="coin-new-readout" role="status">`: “Add coins to compare”; after Compare, “Comparing 1 g and 5 g gold coins” (the picked weights, joined with commas and “and”); any change returns to “2 coins picked” (the count; “1 coin picked”).

## Do & Don'ts
header: Do & Don’ts · title: Keep every slot usable · description: Each pair shows a bar people can use next to one that hides its own controls.
- Do Leave the colour modes alone: The + stays dark on the grey slots. — CB(ONE) | Don't Set a brand colour on the bar: AppearanceBrand Secondary turns the + white, so the empty slots look blank. — CB(ONE, { modes: M({ AppearanceBrand: 'Secondary' }) })
- Do Four slots or fewer: The bar fits a phone screen. — CB(ONE) | Don't Five or more slots: The bar doesn’t wrap or scroll, so it’s wider than a 390 px phone. — CB(FIVE)

## Sources
header: Sources · title: Use the public Comparison Bar contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (27 October build of Biscuit’s main) from the team’s private package repository. Figma’s Comparison Bar is one component, 344 × 64: four slots, the first filled, and a small pale purple Compare button. The package takes <code>items</code> and draws Coin’s Button at size M in gold, so the bar is 369 × 66; <code>Button / Size</code> S gives Figma’s button size. Its empty-slot + is 18 px where Figma’s is 29, its pictures are 28 px tall where Figma’s are 20, and brand modes on the bar turn the + white (reported).

## Limits
Don't show or mention Color Mode or dark mode. Don't show `style` or `Button / State`, or brand colour modes except in the Don't. Don't imply the bar stores items, compares anything, has a separate close button, scrolls, or wraps.
