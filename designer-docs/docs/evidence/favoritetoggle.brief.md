# Favorite Toggle brief

slug: favoritetoggle · label: Favorite Toggle · public API: FavoriteToggle (+ SkeletonGroup for loading)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=7612-54663 · storybook: docsUrl('favoritetoggle') · stories: Default=components-favoritetoggle--default, States=components-favoritetoggle--states, Disabled=components-favoritetoggle--disabled
checked: 28 September 2026 · jfs-components 0.1.60 (registry latest 0.1.60)
icon: an outline heart (two lobes meeting in a point at the bottom), about 14 px wide, centred; 1.5 stroke.

Modes: `const modes = (size = 'M') => ({ 'Color Mode': 'Light', 'Favorite Toggle Size': size })`. Always pass a size; the package default (S) is not the Figma size. Toggles are controlled (`isActive` + `onChange`) unless stated. Place toggles on `<Backdrop>` from the guide kit (it aligns children top-right) unless an example says otherwise.

## Overview
summary: Use a Favorite Toggle on an image card so people can save the item for later with one tap.
principle: One heart per item, on imagery, saying exactly what gets saved.
playground: stage = `<Backdrop size="card">` holding one controlled FavoriteToggle (`accessibilityLabel="Save Gold savings plan to favorites"`). Controls: Segment "State" ['Not saved', 'Saved'] → `isActive` (tapping the toggle also flips it); Segment "Size" ['S', 'M', 'L'] → `Favorite Toggle Size` (default M); OnOff "Disabled" → `disabled`. Readout title "Saved", value "Yes" / "No", note "Both states currently render a white heart; see Sources." Stage label: "Live Coin Favorite Toggle".

## Anatomy
header: Anatomy · title: A heart on glass · description: A frosted circle holds a single heart icon. There is no visible label.
specimen: `<FavoriteToggle testID="fav-anatomy" isActive={false} modes={modes('M')} accessibilityLabel="Save to favorites" />`; `surface="dark"`
parts:
1. Glass surface — Frosted circle that keeps the heart readable over photos. — target: byTestId('fav-anatomy') — side: left
2. Heart — Filled heart; its colour is meant to change when saved. — target: `${byTestId('fav-anatomy')} svg` — side: top
marks: size byTestId('fav-anatomy') bottom (label both)

## Configuration
header: Configuration · title: Pick a size for the card · description: Size is the only visual choice. Medium matches the Figma component; use Small only on dense thumbnails and Large on hero images.
- Small · 14 px — `modes('S')` on `<Backdrop>` — lesson: fits tiny thumbnails but is hard to tap.
- Medium · 29 px — `modes('M')` on `<Backdrop>` — lesson: the Figma size, right for most cards.
- Large · 41 px — `modes('L')` on `<Backdrop size="card">` — lesson: for full-width hero images.
Grid: `coin-new-example-grid three`.

## States
header: States · title: Saved, not saved, disabled, loading · description: Figma shows Saved as a white circle with a gold heart. The installed package does not apply those colours yet, so Saved and Not saved look almost the same; only the blur behind the heart changes.
- Not saved — `isActive={false}`, M — lesson: frosted circle, white heart.
- Saved — `isActive`, M — lesson: currently renders a flat translucent circle with a white heart (known Coin issue).
- Disabled — `disabled`, M — lesson: dimmed to half opacity and skipped by keyboard focus.
- Loading — `<SkeletonGroup loading><FavoriteToggle loading modes={modes('M')} /></SkeletonGroup>` — lesson: a same-size circle holds the place while the item loads.
Grid: `coin-new-example-grid` (2 × 2), each on `<Backdrop>`.

## Sizing
header: Sizing · title: A fixed square set by the size mode · description: The toggle never stretches. Its tap area is exactly its visible size, so Small gives a 14 px target and Medium 29 px.
- Measured diagram: `<Anatomy legend={false} surface="dark" marks={[{ kind: 'size', target: byTestId('fav-size-s'), side: 'top', label: 'both' }, { kind: 'size', target: byTestId('fav-size-m'), side: 'top', label: 'both' }, { kind: 'size', target: byTestId('fav-size-l'), side: 'top', label: 'both' }]}>` around `<SpecimenRow>` of three `<Specimen caption="S|M|L">` with the three sizes (testIDs `fav-size-s|m|l`).

## Content
header: Content · title: Name what gets saved · description: The toggle has no visible text. Give it an accessibility label that names the item, so screen reader users hear what they are saving.
Body: `coin-new-example-grid three` of ExampleCards, each a toggle on `<Backdrop>` with the label as the card title and no description: "Save Gold savings plan to favorites", "Save Nifty 50 Index Fund to favorites", "Save Digital Gold to favorites" (pass each as `accessibilityLabel`).

## In context
header: In context · title: Save a plan from its card · description: The toggle sits in the top-right corner of the card image. The screen keeps the list of saved items and passes each card its saved state and change handler.
Composition in `.coin-new-context`: `<Backdrop size="card">` with a controlled FavoriteToggle (M, `accessibilityLabel="Save Gold savings plan to favorites"`), then, in a `.coin-new-stack` with it, Coin `Text` "Gold savings plan" and Coin `Text` "Start from ₹100 a month". Below them a Readout-style line `<p className="coin-new-readout" role="status">` reading "Saved to favorites" or "Not saved".

## Do & Don'ts
header: Do & Don’ts · title: Keep the heart visible and easy to hit · description: Each pair shows a placement or size change you can see.
- Do Place it on imagery: The frosted circle reads clearly over a photo. — M toggle on `<Backdrop>` | Don't Put it on a plain white surface: White glass on white almost disappears. — M toggle directly in `.coin-new-host` (white)
- Do Use Medium on cards: 29 px is the Figma size and easier to tap. — M on `<Backdrop>` | Don't Shrink it on a large card: A 14 px heart is hard to see and to hit. — S on `<Backdrop size="card">`
- Do Use one heart per item: One save action per card. — one M toggle on `<Backdrop>` | Don't Repeat it on one card: Two hearts make people wonder which one saves. — two M toggles on the same `<Backdrop>`

## Sources
header: Sources · title: Use the public Favorite Toggle contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Declared, installed, and registry <code>jfs-components</code> versions are <code>0.1.60</code>. Size comes from the <code>Favorite Toggle Size</code> mode (S 14, M 29, L 41 px); the package defaults to S while the Figma masters are M, so this guide sets M. Figma’s Saved state is a white circle with a gold heart, but the installed package does not resolve the <code>Favorite Toggle Color</code> Active mode, so Saved renders with a white heart. On the web the saved state is not announced (<code>aria-checked</code> is missing), and the tap area equals the visible size.

## Limits
Never render or describe a gold heart as current behaviour. Do not use the `icon` prop, `style`, or any mode other than `Color Mode` and `Favorite Toggle Size`. Do not recolour the toggle to fake the Active state.
