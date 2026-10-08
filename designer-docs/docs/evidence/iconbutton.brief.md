# Icon Button brief

slug: iconbutton · label: Icon Button · public API: IconButton (+ SkeletonGroup for loading)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2018-4301 · storybook: docsUrl('iconbutton') · stories: Default=components-iconbutton--default, Toggle=components-iconbutton--toggle, Sizes=components-iconbutton--sizes, Emphasis=components-iconbutton--appearance-modes, Disabled=components-iconbutton--disabled
checked: 8 October 2026 · jfs-components 0.1.78 (mirror tag v0.1.78-636f3f5, Biscuit's main 636f3f5)
icon: a circle (r 7 at 9,9) with a small plus inside; 1.5 stroke.

Modes helper: `const modes = ({ size = 'M', emphasis = 'High', appearance = 'Primary' } = {}) => ({ 'Color Mode': 'Light', 'Button / Size': size, Emphasis: emphasis, AppearanceBrand: appearance })`. Every IconButton gets an explicit `accessibilityLabel` (given below). Put rows of buttons in `.coin-new-content-list`.

## Overview
summary: Use an Icon Button for a frequent, well-known action where an icon alone is clear, such as add, share, or close.
principle: One familiar icon, one clear action, and a label for people who cannot see it.
playground: stage = one IconButton. Controls: Segment "Icon" ['Add', 'Share', 'Filter', 'Download'] → `iconName` ic_add | ic_share | ic_filter | ic_download (and `accessibilityLabel` "Add" | "Share" | "Filter" | "Download"); Segment "Size" ['M', 'S'] → `Button / Size`; Segment "Emphasis" ['High', 'Medium', 'Low'] → `Emphasis`; Segment "Appearance" ['Primary', 'Secondary', 'Neutral', 'Tertiary'] → `AppearanceBrand`; OnOff "Disabled" → `disabled`. Readout title "Presses", value = count of presses ("0"). Stage label: "Live Coin Icon Button".

## Anatomy
header: Anatomy · title: An icon in a circle · description: A token-sized circle holds one icon. There is no visible text, so the label lives in the accessibility name.
specimen: `<IconButton testID="ib-anatomy" iconName="ic_add" accessibilityLabel="Add" modes={modes()} />`
parts:
1. Container — Circle whose size comes from the Button / Size mode. — target: byTestId('ib-anatomy') — side: left
2. Icon — One registry icon that names the action. — target: `${byTestId('ib-anatomy')} svg` — side: top
marks: size byTestId('ib-anatomy') bottom (label both) | padding byTestId('ib-anatomy')

## Configuration
header: Configuration · title: Emphasis and appearance · description: Emphasis sets how loud the button is; appearance picks the brand colour family. Use High for the main action in a group and Medium or Low for the rest.
- High · Medium · Low — three buttons `ic_add` "Add" with Emphasis High, Medium, Low (Primary) — lesson: emphasis steps the fill from solid gold to tint to none.
- Appearances — four buttons `ic_add` "Add", High, AppearanceBrand Primary, Secondary, Neutral, Tertiary — lesson: appearance changes the colour family, not the importance.
Stack: `.coin-new-stack` of two ExampleCards, each with a `.coin-new-content-list`.

## States
header: States · title: Default, toggle, disabled, loading · description: A toggle swaps between two icons, and its On state turns into a white circle with a black icon. It keeps one name and is announced as pressed or not pressed.
- Default — `ic_add` "Add" — lesson: one press, one action.
- Toggle off — `isToggle`, `isActive={false}`, `inactiveIcon="ic_flash"`, `activeIcon="ic_flash_off"`, label "Flash" — lesson: Gold fill with the inactive icon.
- Toggle on — same with `isActive`, label "Flash" — lesson: White fill with the active icon, announced as pressed.
- Disabled — `ic_add` "Add", `disabled` — lesson: dimmed to half opacity and skipped by keyboard focus.
- Loading — `<SkeletonGroup loading><IconButton loading iconName="ic_add" accessibilityLabel="Add" modes={modes()} /></SkeletonGroup>` — lesson: a same-size placeholder while the action loads.
Grid: `coin-new-example-grid three` (five cards).

## Sizing
header: Sizing · title: Two sizes, fixed squares · description: Medium is 40 px and Small is 26 px in the installed package; Figma draws Medium at 42 px. XS renders the same as Small. The button never stretches with its container.
- Measured diagram: `<Anatomy legend={false} marks={[{ kind: 'size', target: byTestId('ib-size-m'), side: 'top', label: 'both' }, { kind: 'size', target: byTestId('ib-size-s'), side: 'top', label: 'both' }]}>` around `<SpecimenRow>` of `<Specimen caption="M">` (`ib-size-m`, size M) and `<Specimen caption="S">` (`ib-size-s`, size S), both `ic_add` "Add".

## Content
header: Content · title: Pick an icon people already know · description: Use icons with one common meaning and give each button a label that says the action, such as “Share statement”, not the icon’s name.
Body: `coin-new-example-grid three` of ExampleCards whose titles are the labels: "Share statement" (`ic_share`), "Download statement" (`ic_download`), "Filter transactions" (`ic_filter`), each High Primary M.

## In context
header: In context · title: Actions on a statement card · description: Icon Buttons sit together at the end of a row. The strongest one is the main action; the screen handles each press.
Composition in `.coin-new-context`: public `Card` (Light) containing `HStack` (`alignVertical="center"`, `justifyHorizontal="space-between"`, Light modes) with Coin `Text` "September statement" and a `.coin-new-content-list` of IconButtons: `ic_share` "Share statement" (Emphasis Low), `ic_download` "Download statement" (Emphasis High). Below the card, `<p className="coin-new-readout" role="status">` showing "Shared" / "Downloaded" / "No action yet".

## Do & Don'ts
header: Do & Don’ts · title: Keep icon actions obvious · description: Each pair shows a choice you can see in the row.
- Do Make one action strongest: The High button stands out as the main action. — row: `ic_share` Low, `ic_download` High | Don't Make every action loud: Three High buttons compete for attention. — row: `ic_share`, `ic_download`, `ic_filter`, all High
- Do Use a familiar icon: A download arrow says what happens. — `ic_download` "Download statement" | Don't Use an unclear icon: A card icon does not say it downloads a statement. — `ic_card` "Download statement"
- Do Keep sizes consistent in a row: One size reads as one group. — row of three M buttons (`ic_share`, `ic_download`, `ic_filter`, Medium) | Don't Mix sizes in one row: Mixed sizes look like different kinds of action. — `ic_share` M, `ic_download` S, `ic_filter` M, all Medium

## Sources
header: Sources · title: Use the public Icon Button contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (5 October build) from the team’s private package repository. Size, emphasis, and appearance come from the <code>Button / Size</code>, <code>Emphasis</code>, and <code>AppearanceBrand</code> modes. A toggle’s On state uses the toggle tokens, a white circle with a black icon as in Figma. On the web a toggle is announced as pressed or not pressed and keeps the same name in both states. Keyboard focus draws a thin ring without changing the button’s size; a mouse click leaves no ring. Figma’s Glass variant has no package equivalent. Without a label, the accessible name is the icon’s name, so always set one.

## Limits
Do not show Glass, `source` fallbacks, `style`, or XS. Do not describe a dark border after a mouse click (fixed in #179).
