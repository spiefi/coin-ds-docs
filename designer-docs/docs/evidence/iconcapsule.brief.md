# Icon Capsule brief

slug: iconcapsule · label: Icon Capsule · public API: IconCapsule (+ ListGroup, ListItem for In context)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=8960-33559 · storybook: docsUrl('iconcapsule') · stories: Default=components-iconcapsule--default, Different icons=components-iconcapsule--different-icons, Appearance modes=components-iconcapsule--appearance-modes, Fallback source=components-iconcapsule--fallback-source-comparison
checked: 28 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-dbe0e02 = Biscuit’s main dbe0e02, 27 October)
icon: a circle with a small card inside — `<><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" /><rect x="6" y="6.75" width="6" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" /></>`
keywords: icon circle, round icon, leading icon, status icon, icon badge

Setup: `M = (m: Record<string, string> = {}) => ({ 'Color Mode': 'Light', ...m }) as Modes`. “IC(m, name = 'ic_wallet')” = `<IconCapsule modes={M(m)} iconName={name} />`. Every capsule gets `modes`.
SYS(s) = `{ 'Semantic Intent': 'System', AppearanceSystem: s }`.
Selectors: `CAP = byTestId('ic-anatomy')`; glyph `${CAP} svg`. `testID` lands on the capsule root.

## Overview
summary: Use an Icon Capsule to show one icon in a coloured circle, such as the mark at the start of a list row or a status on a result screen.
principle: One glyph in one circle; modes pick its size and colour.
playground: `.preview-stage` › IC({ 'Icon Capsule Size': size, Emphasis: emphasis, AppearanceBrand: brand }, 'ic_card'). Stage label "Live Coin Icon Capsule". Controls: Segment "Icon Capsule Size" `XS | S | M | L` (M); Segment "Emphasis" `High | Medium | Low` (High); Segment "AppearanceBrand" `Primary | Secondary | Neutral | Tertiary` (Primary). Readout title "Size", value XS "18 px circle, 12 px icon", S "29 px circle, 18 px icon", M "42 px circle, 18 px icon", L "81 px circle, 36 px icon"; note "Low draws no circle: only the icon takes the colour."

## Anatomy
header: Anatomy · title: An icon in a circle · description: The circle and the icon inside it both come from modes. There’s no text: the words belong to the row or tile around it.
specimen: `<Anatomy marks={[{ kind: 'size', target: CAP, side: 'bottom', label: 'both' }]} parts={…}>` › `<IconCapsule testID="ic-anatomy" modes={M({ AppearanceBrand: 'Neutral' })} iconName="ic_card" />` (Figma’s look). Expected 42 × 42.
parts:
1. Circle — Icon Capsule Size sets it, 42 px at M; AppearanceBrand and Emphasis fill it. — target: CAP — side: left
2. Icon — iconName: one glyph from the Coin icon set, 18 px at M. — target: `${CAP} svg` — side: right

## Configuration
header: Configuration · title: Colour from three modes · description: With Semantic Intent Brand, the default, AppearanceBrand picks the colour and Emphasis how strong it is. Semantic Intent System colours it with AppearanceSystem instead, for success, warning, and errors, and ignores Emphasis. With no modes it’s Primary gold; Figma draws Neutral.
Grid 1 `coin-new-example-grid` (2 × 2), all High:
- Primary — IC({}) — lesson: Gold with a black icon: the default.
- Secondary — IC({ AppearanceBrand: 'Secondary' }) — lesson: Purple with a white icon.
- Neutral — IC({ AppearanceBrand: 'Neutral' }) — lesson: Dark grey with a white icon, as Figma draws it.
- Tertiary — IC({ AppearanceBrand: 'Tertiary' }) — lesson: Blue with a white icon.
Grid 2 `coin-new-example-grid three`:
- Emphasis High — IC({ AppearanceBrand: 'Secondary' }) — lesson: A solid circle.
- Emphasis Medium — IC({ AppearanceBrand: 'Secondary', Emphasis: 'Medium' }) — lesson: A pale circle with a coloured icon.
- Emphasis Low — IC({ AppearanceBrand: 'Secondary', Emphasis: 'Low' }) — lesson: No circle, just the coloured icon.
Grid 3 `coin-new-example-grid three`:
- positive — IC(SYS('positive'), 'ic_confirm') — lesson: Green, for something that worked.
- warning — IC(SYS('warning'), 'ic_warning') — lesson: Orange, for something to check.
- negative — IC(SYS('negative'), 'ic_error') — lesson: Red, for something that failed.

## States
header: States · title: No states of its own · description: An Icon Capsule doesn’t press, select, or disable: the row or tile around it does. If iconName isn’t in the Coin icon set, the circle shows with nothing in it.
Grid `coin-new-example-grid`:
- In the icon set — IC({}, 'ic_wallet') — lesson: ic_wallet draws the wallet glyph.
- Not in the icon set — IC({}, 'wallet') — lesson: An unknown name leaves the circle empty.

## Sizing
header: Sizing · title: Four sizes · description: Icon Capsule Size sets the circle and the icon together: XS is 18 px with a 12 px icon, S 29 with 18, M 42 with 18, and L 81 with 36. Figma draws M. Some parent components set the Context mode instead, which fixes the capsule at 14 or 58 px whatever its size.
Body: `<Anatomy legend={false} marks={[size marks]}>` › `<SpecimenRow>` with four `<Specimen caption="XS|S|M|L">`, each `<IconCapsule testID="ic-xs|ic-s|ic-m|ic-l" modes={M({ 'Icon Capsule Size': … })} iconName="ic_wallet" />`. Marks: `{ kind: 'size', target: byTestId(id), side: 'top', label: 'both' }` for each of the four. If the survey reports a covered or overlapping label, keep only the M and L marks. Expected 18 × 18, 29 × 29, 42 × 42, 81 × 81; report the measured values.

## Content
header: Content · title: One glyph that names the thing · description: Pick the glyph from the Coin icon set by its iconName, so it says the same as the row’s title: a bulb for electricity, a drop for water. A capsule holds one glyph, never letters or a logo; use an Avatar for those.
Grid `coin-new-example-grid` (2 × 2), each IC({ AppearanceBrand: 'Neutral' }, name):
- ic_bulb — lesson: Electricity.
- ic_water — lesson: Water.
- ic_mobile — lesson: Mobile recharge.
- ic_savings — lesson: Savings.

## In context
header: In context · title: The mark at the start of a row · description: In a List Item’s leading slot the capsule says what each row is about. The row passes its modes to the capsule, and the capsule’s own modes win, so set its colour on the capsule.
Composition: `.coin-new-context` › `<ListGroup modes={M()} label="Pay bills">` with three rows `<ListItem layout="Horizontal" title=… supportText=… leading={IC({ AppearanceBrand: 'Neutral' }, …)} onPress={() => {}} />`: Electricity / "Adani Electricity" / ic_bulb; Water / "BWSSB" / ic_water; Mobile recharge / "Jio prepaid" / ic_mobile. No modes on the rows.

## Do & Don'ts
header: Do & Don’ts · title: Keep the icon and its meaning · description: Each pair shows a capsule people read at a glance next to one that loses its icon or says the wrong thing.
- Do A name from the icon set: ic_wallet draws the wallet. — IC({ AppearanceBrand: 'Neutral' }, 'ic_wallet') | Don't A name Coin doesn’t have: “wallet” isn’t in the set, so the circle is empty. — IC({ AppearanceBrand: 'Neutral' }, 'wallet')
- Do System for a failure: Negative is red, the colour people expect for an error. — IC(SYS('negative'), 'ic_error') | Don't A brand colour for a failure: Purple doesn’t say that anything went wrong. — IC({ AppearanceBrand: 'Secondary' }, 'ic_error')

## Sources
header: Sources · title: Use the public Icon Capsule contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (27 October build of Biscuit’s main) from the team’s private package repository. Figma’s Icon Capsule has a <code>Type</code> property, Default or Glass, and an <code>icon</code> swap, drawn at 42 px in Neutral. The package takes <code>iconName</code> and modes: it has no Glass type, and with no modes it’s Primary gold. It drops <code>accessibilityLabel</code> and hides the icon from screen readers, so name it in the row or tile around it. A custom <code>source</code> icon shows only when <code>iconName</code> isn’t in the icon set (reported).

## Limits
Don't show or mention Color Mode or dark mode. Don't show Glass, `source`, `style`, `accessibilityLabel`, Page type, or Context values. Don't imply the capsule presses or has states or a label.
