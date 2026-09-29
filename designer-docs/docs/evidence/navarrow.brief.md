# Nav Arrow brief

slug: navarrow · label: Nav Arrow · public API: NavArrow (+ ListItem, Card, VStack, HStack, Text for composition)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1444-33 · storybook: docsUrl('navarrow') · stories: Default=components-navarrow--default, Forward=components-navarrow--forward, Back=components-navarrow--back, Down=components-navarrow--down, Pressable=components-navarrow--pressable, All directions=components-navarrow--all-directions
checked: 29 September 2026 · jfs-components 0.1.77 (newest package tag v0.1.77)
icon: `<path d="M7 4.5 11.5 9 7 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />`

Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`; every Coin instance gets `modes={LIGHT}` (never Dark). Decorative arrows are `[role="img"]`; pressable arrows are `button` elements named by their label (e.g. `[aria-label="Back to Home"]`). Host standalone examples in `<div className="coin-new-host wide"><VStack modes={LIGHT} style={{ flex: 1 }}>…</VStack></div>` ("Host").
Rows: `ListItem` with `layout="Horizontal"`, a `title`, and a `supportText` (always pass one; the default is placeholder text). ListItem draws a Forward NavArrow itself (`navArrow` defaults to true).

## Overview
summary: Use a Nav Arrow to show that something leads elsewhere: a chevron at the end of a row, or a back arrow in a header.
principle: A cue, not a button. Make the whole row pressable, and give the arrow onPress only when it stands alone.
playground: `.preview-stage` with `<NavArrow direction={direction} onPress={pressable ? count : undefined} />`. Controls: Segment "Direction" Back | Forward | Down → `direction`; OnOff "Pressable" → passes `onPress` (default Off). Readout title "Presses", value = count; note: pressable "A 44 × 44 target surrounds the chevron." decorative "A 6 × 10 image; it does not respond." Stage label: "Live Coin Nav Arrow".

## Anatomy
header: Anatomy · title: A chevron with an optional target · description: The arrow is a 2 px stroked chevron. Give it onPress and it gains a 44 × 44 pressable area; without it, it is a small image.
specimen: `<NavArrow direction="Back" accessibilityLabel="Back to Home" onPress={noop} />`
parts:
1. Chevron — A 6 × 10 px chevron with a 2 px rounded grey stroke. — target: `svg` — side: top
2. Touch target — With onPress, a 44 × 44 area surrounds the chevron. — target: `[role="button"]` — side: right
marks: outline `[role="button"]`; outline `svg` variant `child`

## Configuration
header: Configuration · title: Point where it leads · description: Forward leads to another screen, Back returns to the previous one, and Down opens content below.
Grid `coin-new-example-grid three`, each in a Host:
- Forward — `<ListItem title="Statements" supportText="Monthly and yearly" onPress={noop} />` — lesson: At the end of a row. ListItem draws it for you.
- Back — `<HStack alignVertical="center">` with `<NavArrow direction="Back" accessibilityLabel="Back to Home" onPress={noop} />` and `<Text>Accounts</Text>` — lesson: Beside a screen title, as its own button.
- Down — `<HStack alignVertical="center">` with `<Text>Show all transactions</Text>` and `<NavArrow direction="Down" />` — lesson: Next to a label that opens more content below.

## States
header: States · title: Decorative or pressable · description: Without onPress the arrow is an image inside something pressable. With onPress it is a button that dims to 70% while pressed. It has no disabled look.
Grid `coin-new-example-grid`, each in a Host:
- Decorative — `<NavArrow direction="Forward" />` — lesson: A 6 × 10 image; the row around it handles presses.
- Pressable — `<NavArrow direction="Back" accessibilityLabel="Back to Home" onPress={noop} />` — lesson: A 44 × 44 button; press it to see it dim.

## Sizing
header: Sizing · title: Small chevron, 44 px target · description: The chevron is 6 × 10 px (10 × 6 pointing down). A pressable arrow reserves 44 × 44 px so it is easy to tap.
Measured diagram: `<Anatomy legend={false} marks={[{ kind: 'outline', target: '[role="button"]' }, { kind: 'size', target: '[role="img"]', side: 'top', label: 'both' }, { kind: 'size', target: '[role="button"]', side: 'top', label: 'both' }]}>` around `<SpecimenRow>` with `<Specimen caption="Pressable"><NavArrow direction="Back" accessibilityLabel="Back to Home" onPress={noop} /></Specimen>` and `<Specimen caption="Decorative"><VStack justifyVertical="center" alignHorizontal="center" style={{ height: 44 }}><NavArrow direction="Forward" /></VStack></Specimen>` (pressable first and the decorative arrow centred, so the tiny chevron stays clear of the "Shown at" badge on mobile).

## Content
header: Content · title: Name the destination · description: The arrow has no visible text. When it is a button, set accessibilityLabel to where it goes, such as “Back to Home”, instead of the default “Go back”.
Body: one ExampleCard "Labelled back arrow" in a Host: `<HStack alignVertical="center">` with `<NavArrow direction="Back" accessibilityLabel="Back to Home" onPress={noop} />` and `<Text>Accounts</Text>`; description: Screen readers hear “Back to Home”.

## In context
header: In context · title: A header and a list of accounts · description: The back arrow is its own button; each row is pressable as a whole and ListItem draws its forward arrow. The screen handles the navigation.
Composition in `.coin-new-context`: `<VStack modes={LIGHT}>` › `<HStack alignVertical="center">` (`<NavArrow direction="Back" accessibilityLabel="Back to Home" onPress=… />`, `<Text>Accounts</Text>`), then `<Card modes={LIGHT}>` › `<VStack>` › ListItems "Savings •• 0245" ("₹1,24,500") and "Salary •• 1180" ("₹48,200") with `onPress`. Below, `<p className="coin-new-readout" role="status">`: "On Accounts"; back → "Back to Home"; a row → "Opening <title>".

## Do & Don'ts
header: Do & Don’ts · title: A clear cue in the right place · description: Each pair shows an arrow that guides people versus one that misleads them.
Every preview is a Host.
- Do Make the whole row pressable: The label and the arrow both open Statements. — `<ListItem title="Statements" supportText="Monthly and yearly" onPress={noop} />` | Don't Make only the arrow pressable: People tap the label and nothing happens. — `<HStack alignVertical="center" justifyHorizontal="space-between">` with `<Text>Statements</Text>` and `<NavArrow direction="Forward" accessibilityLabel="Open Statements" onPress={noop} />`
- Do Point forward in a row: The row leads on to another screen. — ListItem "Statements" as above | Don't Point back in a row: A back arrow reads as leaving, not opening. — same ListItem with `navArrow={false}` and `trailing={<NavArrow direction="Back" />}`
- Do Use the row’s own arrow: One chevron per row. — ListItem "Statements" as above | Don't Add a second arrow: Two chevrons look like a mistake. — same ListItem with `trailing={<NavArrow direction="Forward" />}`

## Sources
header: Sources · title: Use the public Nav Arrow contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.77</code> from the team’s private package repository. List Item, App Bar, Section, and Summary Tile already draw their own arrows. A decorative arrow is still announced as an image, and a disabled arrow looks the same as an enabled one. In Dark colour mode the chevron currently turns orange because of a token value, so use it on light surfaces.

## Limits
Do not show `disabled`, Dark mode, `Context2`/AppBar sizing, or `style`. Do not imply the arrow is hidden from screen readers or that a disabled arrow looks different (token ticket #177).
