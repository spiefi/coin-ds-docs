# Card Provider Info brief

slug: cardproviderinfo · label: Card Provider Info · public API: CardProviderInfo with StatItem children (+ VStack, Title, Button for composition)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2916-9155 · storybook: docsUrl('cardproviderinfo') · stories: Default=components-cardproviderinfo--default, Two stats=components-cardproviderinfo--two-stats
checked: 17 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-a116616, Biscuit's main a116616, which has the 7b7c79f0 rewrite)
icon: a card with a round logo and a two-by-two grid — `<><rect x="2.5" y="2.5" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" /><circle cx="6" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.5" /><path d="M5 10h2.5M10.5 10H13M5 13h2.5M10.5 13H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>`
keywords: provider card, seller info, vault info, stats card, product provider, trust facts

Setup: `import logo from '../assets/jio-gold-logo.png'` (already in the repository: the Jio Gold logo from the Figma component); `const LIGHT = { 'Color Mode': 'Light' } as Modes`; `const m = (o: Record<string, string>) => ({ ...LIGHT, ...o } as Modes)`; `noop = () => {}`; `const FRAME = { width: '100%', maxWidth: 342 } as const` (Figma's width).
FACTS = `[['Purity verified by NABL', '99.99%'], ['Customers served', '1M+'], ['Insured vault storage', '100%'], ['Established', '2017']]`.
“CPI(overrides, count = 4)” = `<CardProviderInfo label="Gold" imageSource={logo} modes={LIGHT} style={FRAME} {...overrides}>{FACTS.slice(0, count).map(([l, v]) => <StatItem key={l} label={l} value={v} />)}</CardProviderInfo>`. Pass no modes to the StatItems: the card hands them its own. Every card sits straight on the grey example stage; no Surface, FitWidth or host.
Selectors (no testID; `R = ':scope > div'`, the card root): header `${R} > div:first-child`; avatar `${R} [role="img"]`; label `${R} > div:first-child > [dir="auto"]`; grid `${R} > div:nth-child(2)`; first fact `${R} > div:nth-child(2) > div:first-child > div:first-child`; first value `${R} > div:nth-child(2) > div:first-child > div:first-child [dir="auto"]:last-child`.

## Overview
summary: Use a Card Provider Info to introduce who provides a product, with their logo and a few short facts in two columns.
principle: Who provides it, and why to trust them.
playground: `.preview-stage` › CPI({ modes: m({ AppearanceBrand: appearance, 'Avatar Size': avatar }) }, Number(facts)); stage label "Live Coin Card Provider Info". Controls: Segment "Appearance" `Primary | Secondary | Neutral` (Primary); Segment "Avatar Size" `L | S` (L); Segment "Facts" `2 | 3 | 4` (4). Readout title "Grid", value "1 row" / "2 rows, one fact alone" / "2 rows"; note: "Children sit two to a row."

## Anatomy
header: Anatomy · title: A provider and its facts · description: A rounded card puts the provider's logo and name on top, then lays its children out two to a row. The facts are StatItem components: a small label over a large value.
specimen: `<Anatomy specimenWidth={342} …>` › CPI().
parts:
1. Avatar — imageSource in a round 42 px Avatar; Avatar Size S gives Figma's 29 px. — target: avatar — side: left
2. Label — label names the provider in 16 px bold. — target: label — side: top
3. Fact — A StatItem child: a 12 px label over a 26 px value. — target: first fact — side: left
4. Grid — Children sit two to a row, 8 px apart, each half the width. — target: grid — side: right
5. Card — 16 px corners and 20 px padding; AppearanceBrand sets the fill. — target: R — side: bottom

## Configuration
header: Configuration · title: Brand and avatar size · description: AppearanceBrand sets the card's fill: Primary cream by default, Secondary lilac, and Neutral or Tertiary white with a light border. The label and the facts stay the same colour. Avatar Size S shrinks the logo to Figma's 29 px; the package default is 42 px.
Grid `coin-new-example-grid` (two columns):
- Primary — CPI() — lesson: The default: a cream card, as in Figma.
- Secondary — CPI({ modes: m({ AppearanceBrand: 'Secondary' }) }) — lesson: A lilac card.
- Neutral — CPI({ modes: m({ AppearanceBrand: 'Neutral' }) }) — lesson: White with a light border; Tertiary looks the same.
- Avatar Size S — CPI({ modes: m({ 'Avatar Size': 'S' }) }) — lesson: A 29 px logo, as in Figma.

## States
header: States · title: Facts only, by default · description: The card shows facts and does nothing when tapped. onPress makes the whole card one button, named by accessibilityLabel or label; it doesn't change its look when pressed, and disabled only stops presses. Don't put buttons among the facts of a pressable card.
Grid `coin-new-example-grid` (two columns):
- Facts only — CPI() — lesson: The default: nothing to press.
- Pressable — CPI({ onPress: () => setOpened(o => o + 1), accessibilityLabel: 'Gold, by Jio. Open provider details' }) with `<p className="coin-new-readout" role="status">` under it: "Not opened yet" / "Opened N times" — lesson: The whole card is one button and looks the same.

## Sizing
header: Sizing · title: Your screen sets the width · description: The card fills its host's width; Figma draws it at 342 px. It has 20 px padding and 20 px between the header and the facts, and each fact takes half the width with 8 px between them. Height follows the content: 212 px with four facts and the default avatar.
Measured diagram: `<Anatomy legend={false} specimenWidth={342} marks={[{ kind: 'size', target: R, side: 'bottom', label: 'both' }, { kind: 'padding', target: R }, { kind: 'gap', from: header, to: grid }]}>` › CPI(). Expected 342 × 212, padding 20, gap 20; report the measured values.

## Content
header: Content · title: Short facts with their figures · description: Put the provider's name in label. Give each fact a short noun phrase for its label and the figure for its value: values are large and heavy, so keep them to a few characters. Two to six facts, in pairs, read best.
Grid `coin-new-example-grid` (two columns):
- Two facts — CPI({}, 2) — lesson: One row of two facts.
- Three facts — CPI({}, 3) — lesson: The third fact sits alone and leaves a gap beside it.

## In context
header: In context · title: The provider on the Buy Gold screen · description: The screen supplies the provider's logo, name, and facts. The card only shows them; the Buy button below is the screen's own action.
Composition in `.coin-new-context`: `<VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes}>` with `<Title title="Buy gold" subtitle="24K, stored in an insured vault" modes={LIGHT} />`, CPI({ style: undefined }) (it fills the column, like the button), and `<Button label="Buy gold" modes={LIGHT} onPress={() => setBought(true)} style={{ alignSelf: 'stretch' }} />`. Below, `<p className="coin-new-readout" role="status">`: "Ready to buy" or "Buy gold pressed".

## Do & Don'ts
header: Do & Don’ts · title: Short facts from a known provider · description: Each pair shows a card people trust at a glance next to one that crowds its facts or shows the wrong picture.
- Do Keep values short: “99.99%” and “1M+” read at a glance. — CPI({}, 2) | Don't Write sentences as values: “Over one million” wraps and crowds the row. — `<CardProviderInfo label="Gold" imageSource={logo} modes={LIGHT} style={FRAME}><StatItem label="Customers served" value="Over one million" /><StatItem label="Established" value="In the year 2017" /></CardProviderInfo>`
- Do Pass the provider's logo: imageSource shows who provides it. — CPI({}, 2) | Don't Leave out imageSource: A stock portrait stands in for the logo. — CPI({ imageSource: undefined }, 2)
- Do Pair the facts: Four facts fill two rows. — CPI() | Don't Leave one fact alone: Three facts leave a gap beside the last. — CPI({}, 3)

## Sources
header: Sources · title: Use the public Card Provider Info contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (16 October build) from the team’s private package repository. Figma’s Card/Provider Info is one 342 × 185 component with no properties of its own; its Product Label can hide the avatar, but in code the header always comes from label and imageSource and the avatar can’t be hidden. Without imageSource the package shows a stock portrait, so this page passes the Jio Gold logo from the Figma component. Figma’s logo is 29 px (Avatar Size S); the package default is 42 px. Fact rows are 50 px in code and 44 in Figma. The avatar and portrait issues are reported. The published Storybook shows the placeholder portrait and still shows the older generated page.

## Limits
Don't show Dark, Tertiary separately, Context2, Context4, Page type, style props, or a disabled pressable card. Don't imply a pressed look, a one-column layout, or that the avatar can be hidden.
