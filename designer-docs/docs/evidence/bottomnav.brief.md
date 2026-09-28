# Bottom Nav brief

slug: bottomnav · label: Bottom Nav · public API: BottomNav, BottomNav.Item
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=302-79 · storybook: docsUrl('bottomnav') · stories: Default=components-bottomnav--default, With disabled item=components-bottomnav--with-disabled-item, Mobile app simulation=components-bottomnav--mobile-app-simulation
checked: 28 September 2026 · jfs-components 0.1.60 (registry latest 0.1.60)
icon: a phone-bottom bar: a horizontal line at y 12 from x 2 to 16, with three small dots evenly spaced at y 15 (x 5, 9, 13); 1.5 stroke.

All BottomNavs use `modes={{ 'Color Mode': 'Light' }}` and are placed in the kit's `<ScreenFrame footer={…}>` (BottomNav anchors itself to the bottom of that frame). Use `size="bar"` unless the example needs a screen above it (`size="screen"`, with the screen content as `children`).

Destinations (value · label · iconName): home · Home · ic_home; finances · Finances · ic_rupee; pay · Pay · ic_scan_qr_code; invest · Invest · ic_rupee_coin; explore · Explore · ic_search. "3 items" = home, pay, explore; "4 items" = home, finances, pay, invest.

## Overview
summary: Use a Bottom Nav to move between the top-level sections of an app from any screen.
principle: Three to five destinations, exactly one Active, always at the bottom.
playground: stage = `<ScreenFrame size="screen">` whose content is a Coin `Text` heading "<Label> screen" for the Active destination, with `footer` a controlled BottomNav. Controls: Segment "Items" ['3', '4', '5'] (default 5; if the Active value disappears, reset to home); Segment "Active" listing the current destinations' labels → `value` (pressing an item also changes it); OnOff "Disable Pay" → `disabled` on the pay item (hidden when Pay is not in the set; if Pay is Active when disabled, set home). Readout title "Active destination", value = its label. Stage label: "Live Coin Bottom Nav".

## Anatomy
header: Anatomy · title: A bar of equal destinations · description: The bar lays out BottomNavItems in equal shares, marks one Active, and sits on the bottom edge of the screen.
specimen: `<ScreenFrame size="bar" footer={<BottomNav testID="bn-anatomy" value="home" onChange={() => {}}>{five items}</BottomNav>} />`; specimenWidth 360
parts:
1. Bar — White surface with a hairline top border. — target: byTestId('bn-anatomy') — side: right
2. Active item — The destination people are on, in the accent colour. — target: `${byTestId('bn-anatomy')} > [role="tab"]:nth-child(1)` — side: top
3. Idle item — Another destination, one tap away. — target: `${byTestId('bn-anatomy')} > [role="tab"]:nth-child(3)` — side: top
4. Label — Names the destination in one or two words. — target: `${byTestId('bn-anatomy')} > [role="tab"]:nth-child(5) [dir="auto"]` — side: bottom
marks: padding byTestId('bn-anatomy')

## Configuration
header: Configuration · title: Three to five destinations · description: Every destination gets an equal share of the bar. Fewer destinations mean wider tap targets; five is the most that stays comfortable.
- 3 destinations — "3 items", value home — lesson: each item is about 109 px wide.
- 4 destinations — "4 items", value home — lesson: about 82 px each.
- 5 destinations — all five, value home — lesson: about 66 px each, the Figma layout.
Stack: `.coin-new-stack` of three ExampleCards, each a `ScreenFrame size="bar"`.

## States
header: States · title: One Active, the rest Idle · description: The screen tells Bottom Nav which destination is Active through its value. A destination can be disabled while it is temporarily unavailable.
- Active destination — five items, value finances — lesson: only the matching item switches to Active.
- Disabled destination — five items, value home, pay `disabled` — lesson: dimmed and skipped by keyboard focus.
Stack: `.coin-new-stack`, each a `ScreenFrame size="bar"`.

## Sizing
header: Sizing · title: Full width, fixed height · description: Bottom Nav spans its screen and anchors to the bottom edge. Its height comes from the items and the padding, 78 px in the installed package.
- Measured diagram: `<Anatomy legend={false} specimenWidth={360} marks={[{ kind: 'size', target: byTestId('bn-size'), side: 'top', label: 'both' }, { kind: 'padding', target: byTestId('bn-size') }]}>` around `<ScreenFrame size="bar" footer={<BottomNav testID="bn-size" value="home">{five items}</BottomNav>} />`.

## Content
header: Content · title: One or two words per destination · description: Use short nouns people already know, each with an icon that matches it. A long label wraps and makes that item taller than the rest.
Body: `coin-new-example-grid` with ExampleCard "Short labels" (five standard items, value home) and ExampleCard "A long label wraps" (three items: Home, "Investments & savings" (value invest, ic_rupee_coin), Pay; value home). Each in `ScreenFrame size="bar"`.

## In context
header: In context · title: Switch sections of the app · description: The app keeps the Active value and swaps the screen above when it changes. Bottom Nav only reports which destination was pressed.
Composition in `.coin-new-context`: `<ScreenFrame size="screen">` with five items, controlled; screen content per destination, in a `.coin-new-stack`, = a Coin `Text` heading (the label) and one Coin `Text` line: Home "Your balances and recent activity", Finances "Spending and bills", Pay "Scan a QR code or pay a contact", Invest "Funds, gold, and deposits", Explore "Offers and new products".

## Do & Don'ts
header: Do & Don’ts · title: Keep navigation calm and predictable · description: Each pair shows a change you can see in the bar.
- Do Keep three to five destinations: Every item keeps a comfortable tap width. — five items, value home | Don't Crowd in a sixth: Items shrink to about 55 px and labels crowd each other. — five items plus rewards · Rewards · ic_wallet, value home
- Do Keep one destination Active: People always see where they are. — five items, value invest | Don't Leave nothing Active: With no match for the value, every item looks Idle. — five items, value "none"
- Do Give each destination its own icon: Icons help people find a section at a glance. — five standard items | Don't Reuse one icon everywhere: Identical icons force people to read every label. — five standard labels, all `iconName="ic_home"`
All in `ScreenFrame size="bar"`.

## Sources
header: Sources · title: Use the public Bottom Nav contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Declared, installed, and registry <code>jfs-components</code> versions are <code>0.1.60</code>. Bottom Nav sets each item’s <code>BottomNavItem / State</code> mode from <code>value</code> and anchors itself to the bottom of its nearest positioned container. Figma draws the bar at 77 px; the installed package renders 78 px. On the web the tab list has no accessible name, even with <code>accessibilityLabel</code>, and the Active tab is not exposed as selected. The guide stays in Light mode because the installed Dark tokens turn Idle labels orange. Item details are in the Bottom Nav Item guide.

## Limits
Do not show Dark mode, `style` overrides, or custom item content. Do not claim the Active tab is announced as selected.
