# Portfolio Hero brief

slug: portfoliohero · label: Portfolio Hero · public API: PortfolioHero (+ Badge, Icon, Text in `children`; VStack, HStack, Button and the kit's ScreenFrame)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2705-14040 · storybook: docsUrl('portfoliohero') · stories: Default=components-portfoliohero--default, Without Slot=components-portfoliohero--without-slot, Custom Slot Content=components-portfoliohero--custom-slot-content
checked: 26 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-c8526ae = Biscuit’s main c8526ae)
icon: a small circle and a short line over a long bar and a pill — `<><circle cx="6.5" cy="4" r="1.75" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M9.5 4h3M3.5 9h11M6.5 13.5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /></>`
keywords: holding value, portfolio value, investment total, gold value, asset hero

Setup: `import jioLogo from '../assets/jio-gold-logo.png'`. `LIGHT = { 'Color Mode': 'Light' } as Modes`; `BADGE = { ...LIGHT, Context4: 'Badge' } as Modes`; `LOSS = { ...BADGE, 'Semantic Intent': 'System', AppearanceSystem: 'negative' } as Modes`.
`RETURNS(label, m = BADGE)` = `<Badge label={label} modes={m} leading={<Icon iconName="ic_card" modes={m} accessibilityElementsHidden importantForAccessibility="no" />} />`. `NOTE(text)` = `<Text text={text} modes={LIGHT} />`.
SLOT = `<>{RETURNS('+₹2,722.45 (+22.5%)')}{NOTE('Worth 1.23g Gold')}</>` (Figma’s slot).
“PH(overrides = {})” = `<PortfolioHero modes={LIGHT} imageSource={jioLogo} {...overrides}>{children ?? SLOT}</PortfolioHero>`: take `children` from overrides (pass `children: null` for no slot); `imageSource: undefined` removes the logo. Default label 'Gold', value '12,000.11', currency '₹' come from the package.
HOST = `<VStack modes={LIGHT} style={{ width: 300, maxWidth: '100%' }} alignHorizontal="center">…</VStack>`: every PH in the playground, an ExampleCard, or a Do & Don’t sits in HOST. Anatomy and Sizing specimens are bare PH().
Selectors (no testID): `R = ':scope > div'`; label row `${R} > div:nth-child(1)`; avatar `${R} > div:nth-child(1) [role="img"]`; label `${R} > div:nth-child(1) > [dir="auto"]`; amount `${R} > div:nth-child(2)`; slot `${R} > div:nth-child(3)`. Check with the survey and adjust.

## Overview
summary: Use a Portfolio Hero at the top of a holding’s page to show what it is and what it’s worth, with an optional note under the amount.
principle: The product, its value, then one note.
playground: `.preview-stage` › HOST › PH({ imageSource: logo ? jioLogo : undefined, modes: { ...LIGHT, 'Avatar Size': size } as Modes, children: slot === 'Badge and note' ? SLOT : slot === 'Badge' ? RETURNS('+₹2,722.45 (+22.5%)') : null }). Stage label "Live Coin Portfolio Hero". Controls: OnOff "imageSource" (on); Segment "Avatar Size" `L | M | S` (S); Segment "children" `Badge and note | Badge | None` (Badge and note). Readout title "Avatar", value: logo off → "None"; else L → "42 px", M → "36 px", S → "29 px"; note: "Avatar Size changes the logo only when imageSource is set. Without it there’s no avatar at all."

## Anatomy
header: Anatomy · title: A product, an amount, a note · description: The product label sits on top, the amount under it, and anything you pass as children under that. Everything is centred.
specimen: `<Anatomy …>` › PH(). marks: `{ kind: 'gap', from: label row, to: amount }`.
parts:
1. Avatar — imageSource, 29 px at the default Avatar Size S. — target: avatar — side: left
2. Label — label, the product name, 16 px Bold. — target: label — side: top
3. Amount — A Money Value from value and currency, 36 px Black. — target: amount — side: right
4. Slot — children, centred under the amount, 8 px apart. — target: slot — side: bottom

## Configuration
header: Configuration · title: The logo, its size, and the note · description: imageSource puts the product’s logo before its label; without it there is no avatar, not an empty circle. Avatar Size sets the logo to 42, 36, or 29 px. children adds what sits under the amount, usually a Badge with the change and a Text with one fact; Slot gap spaces them.
Body: `<div className="coin-new-stack">` with three grids, each PH in HOST.
Grid 1 (`coin-new-example-grid three`):
- Logo and label — PH({ children: null }) — lesson: imageSource puts the logo before the label.
- Label only — PH({ imageSource: undefined, children: null }) — lesson: No imageSource, no avatar.
- With a note — PH() — lesson: children add the change and one fact.
Grid 2 (`coin-new-example-grid three`):
- Avatar Size L — PH({ modes: { ...LIGHT, 'Avatar Size': 'L' }, children: null }) — lesson: A 42 px logo.
- Avatar Size M — PH({ modes: { ...LIGHT, 'Avatar Size': 'M' }, children: null }) — lesson: 36 px.
- Avatar Size S — PH({ children: null }) — lesson: 29 px, the default.
Grid 3 (`coin-new-example-grid`, two columns):
- Slot gap S — PH() — lesson: 8 px between the badge and the note, the default.
- Slot gap L — PH({ modes: { ...LIGHT, 'Slot gap': 'L' } }) — lesson: 24 px.

## States
header: States · title: No states of its own · description: The hero doesn’t press, load, or animate, and it has no action: Figma’s Action Slot, an icon button beside the amount, isn’t in the package. What changes is what you pass: a gain or a loss is the Badge in children.
Grid `coin-new-example-grid` (two columns), each PH in HOST:
- Up — PH() — lesson: The gold Badge, as Figma shows it.
- Down — PH({ label: 'Mutual Funds', value: '1,45,230.50', children: RETURNS('−₹1,204.10 (−0.8%)', LOSS) }) — lesson: The Badge’s Semantic Intent System, AppearanceSystem negative.

## Sizing
header: Sizing · title: As wide as its amount · description: The hero has no width of its own: it is as wide as its widest line, usually the amount, plus 8 px on each side, and centres everything. Top to bottom: 8 px of padding, the 29 px label row, 16 px, the amount on a 44 px line, 16 px, then the slot. Figma’s amount sits on a 36 px line, so Figma’s hero is 159 px tall. The amount never wraps or shrinks, so give the hero a host wider than its longest amount.
Body: `<Anatomy legend={false} marks={[{ kind: 'size', target: R, side: 'bottom', label: 'both' }, { kind: 'gap', from: label row, to: amount }, { kind: 'padding', target: R }]}>` › PH(). Expected about 199 × 168, gap 16, padding 8; report the measured values.

## Content
header: Content · title: The product, the figure, one note · description: Write label as the product in a word or two, such as Gold or Mutual Funds. Give value as the formatted figure alone: currency adds the symbol, and INR or ₹ both show ₹. Use children for a caption, such as the change in a Badge and one fact in a Text; a Text there is 12 px, because the hero sets Text Sizes Small. It isn’t a place for a second total.
Grid `coin-new-example-grid` (two columns), each PH in HOST:
- Product and figure — PH({ label: 'Mutual Funds', value: '1,45,230.50', currency: 'INR', children: null }) — lesson: INR shows ₹; the grouping stays as you write it.
- One fact — PH({ children: NOTE('Worth 1.23g Gold') }) — lesson: A Text in children is 12 px.

## In context
header: In context · title: The top of a holding’s page · description: The hero opens the Gold page, the holding’s details follow in a list, and the two actions sit at the bottom. Buy ₹1,000 and Sell ₹1,000 change the holding, and the hero shows the new value; the hero has no button of its own.
Composition: `.coin-new-context` › `<ScreenFrame size="full">` › `<VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes} style={{ flex: 1, padding: 16 }} justifyVertical="space-between">` › `<VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes}>` holding PH({ value: fmt(v), children: <>{RETURNS('+₹2,722.45 (+22.5%)')}{NOTE(`Worth ${(v / 9756.2).toFixed(2)}g Gold`)}</> }) and a `<ListGroup modes={LIGHT}>` of three `<ListItem layout="Horizontal" navArrow={false} modes={LIGHT} />`: Gold in your locker · `${(v / 9756.2).toFixed(2)} g · 24K, 99.9% pure`; Average buy price · ₹7,544 a gram; Today’s price · ₹9,756 a gram; then `<HStack modes={{ ...LIGHT, 'Slot gap': 'S' } as Modes}>` with `<Button label="Sell ₹1,000" modes={{ ...LIGHT, Emphasis: 'Medium' } as Modes} style={{ flex: 1 }} onPress={() => setK(k => Math.max(k - 1, -5))} />` and `<Button label="Buy ₹1,000" modes={LIGHT} style={{ flex: 1 }} onPress={() => setK(k => Math.min(k + 1, 5))} />`. `v = 12000.11 + 1000 * k`; `fmt(v) = v.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })`. Below the frame, `<p className="coin-new-readout" role="status">`: `Holding ₹${fmt(v)}`.

## Do & Don'ts
header: Do & Don’ts · title: One holding, one figure · description: Each pair shows a hero people read at a glance next to one that buries the amount.
(Instruction, not copy: both sides of every pair sit in HOST.)
- Do One short note: The change and one fact. — PH() | Don't A paragraph under the amount: A long note turns the hero into a block of text. — PH({ children: NOTE('Your gold has grown 22.5% since you started saving in March 2024, and you can sell it at any time at today’s price.') })
- Do The change in a Badge: The amount stays the only total. — PH() | Don't A second total in the slot: Two figures compete; put the portfolio total on its own page. — PH({ children: NOTE('Total portfolio ₹4,52,300.00') })

## Sources
header: Sources · title: Use the public Portfolio Hero contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (23 October build of Biscuit’s main) from the team’s private package repository. Figma’s Portfolio Hero has <code>Top Slot</code>, <code>Bottom Slot</code>, and <code>Action Slot</code> switches; the package has a fixed label and amount, <code>children</code> for the slot, and no action. Figma shows the Jio logo by default; the package shows an avatar only with <code>imageSource</code>, and Storybook’s Default story shows a stock photo there instead. The amount sits on a 44 px line, so the hero is taller than Figma’s 159 px, and phone screen readers skip the amount (all reported).

## Limits
Don't show or mention Color Mode, dark mode, Page type JioPlus, or Context3. Don't imply the hero presses, has an action button, replaces its label row, left-aligns, wraps or shrinks the amount, or that screen readers announce the amount.

## dbe0e02 publish (28 October 2026): copy changes

These replace the matching lines above; the guide file has the exact strings. Evidence: `docs/evidence/portfoliohero.md`.

- checked: 28 October 2026 · built from dbe0e02 (27 October).
- Sources: “… The amount sits on a 44 px line, so the hero is taller than Figma’s 159 px (all reported). Screen readers read the amount once, with its currency.”
