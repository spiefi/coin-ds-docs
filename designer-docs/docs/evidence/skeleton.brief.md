# Skeleton brief

slug: skeleton · label: Skeleton · public API: SkeletonGroup, Skeleton (+ the `loading` prop of Text, Avatar, Badge, Button; HStack, VStack, ScreenFrame and Surface for hosting)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library (no Skeleton component; pass `figmaDescription="No Skeleton component; only its colour and corner variables"` to Sources) · storybook: docsUrl('skeleton') · stories: Kinds=components-skeleton--kinds, Reduced motion=components-skeleton--reduced-motion, Primitives=components-skeleton--primitives-auto-skeletonize, Cascade=components-skeleton--cascade, Card composition=components-skeleton--card-composition, Explicit loading prop=components-skeleton--explicit-loading-prop, Standalone atomic=components-skeleton--standalone-atomic
checked: 12 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-636f3f5, Biscuit's main 636f3f5; main's c1fa197c only rewrites the Storybook page)
icon: three rounded bars of falling length — `<><rect x="2" y="3" width="14" height="3" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><rect x="2" y="8" width="10" height="3" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><rect x="2" y="13" width="6" height="3" rx="1.5" stroke="currentColor" strokeWidth="1.5" /></>`
keywords: loading placeholder, shimmer, ghost content, loading state

Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`; Coin instances get `modes={LIGHT}` unless stated. Don't add any animation: the site runs the package's shimmer.
“Row(name, detail, monogram)” = `<HStack modes={LIGHT} alignVertical="center"><Avatar style="Monogram" monogram={monogram} modes={LIGHT} /><VStack modes={LIGHT} style={{ flex: 1 }}><Text modes={LIGHT}>{name}</Text><Text modes={{ ...LIGHT, 'Text Sizes': 'Small' } as Modes}>{detail}</Text></VStack><Badge label="Equity" modes={LIGHT} /></HStack>`. Rows: Reliance Industries · 64 units · ₹1,52,900 · RI; HDFC Bank · 120 units · ₹1,98,400 · HB.
“Feed” = `<div className="coin-new-stack">` with both Rows and `<Button label="View all holdings" modes={LIGHT} />`.
“Panel(group props, content)” = `<Surface width="wide"><SkeletonGroup …>{content}</SkeletonGroup></Surface>` (white like Storybook's canvas). When content is several Skeletons, put them in `<div className="coin-new-stack">` so percentage widths fill the panel.
Selectors: `A = byTestId('sk-anatomy')`, its children `${A} > :nth-child(n)`; `SZ = byTestId('sk-size')`.

## Overview
summary: Use a Skeleton group to show the shape of content while it loads, so the screen doesn't jump when it arrives.
principle: Show the shape of what's coming, then fill it in place.
playground: `.preview-stage` › Panel(`loading={loading}` `reducedMotion={…}`, Feed); stage label "Live Coin Skeleton". Controls: OnOff "Loading" (on) → group `loading`; Segment "Motion" `System | Shimmer | Pulse` (System) → `reducedMotion` undefined / false / true. Readout title "Content", value "Loading" or "Loaded"; note while loading: "Each Coin component in the group draws a placeholder its own size. Turn Loading off to swap the content in."; loaded: "The same components now show their content, in the same places."

## Anatomy
header: Anatomy · title: Grey blocks with a moving highlight · description: Each placeholder is a light grey block whose kind sets its corners. While the group loads, a white band sweeps across every block, one after another.
specimen: `<Anatomy surface="white">` › `<SkeletonGroup loading><VStack testID="sk-anatomy" modes={LIGHT}>` Skeletons: `kind="text"` 220 × 20, `kind="image"` 220 × 120, `kind="badge"` 70 × 20, `kind="other"` 48 × 48 `</VStack></SkeletonGroup>`
parts:
1. Text bar — kind text: a full pill, one per line of text. — target: child 1 — side: top
2. Image block — kind image: 10 px corners, as big as the image it replaces. — target: child 2 — side: left
3. Shimmer — A white band sweeps across every block each 1.5 s. — target: child 2 — side: right (`at: 0.3`, so its leader doesn't cross the text bar)
4. Badge block — kind badge: 4 px corners, like a badge. — target: child 3 — side: right
5. Circle or pill — kind other, the default: a circle when square, else a pill. — target: child 4 — side: left

## Configuration
header: Configuration · title: Four kinds, or components that draw their own · description: A Skeleton's kind sets only its corners; its width and height are yours. Inside a group, Coin components such as Text, Avatar, Badge, and Button draw their own placeholder at their own size, so you rarely place a Skeleton by hand.
Grid `coin-new-example-grid`, each an ExampleCard › Panel(`loading`, …):
- Text — Skeletons `kind="text"` `width="80%"` `height={16}` and `width="60%"` `height={14}` — lesson: Full pills, one per line; match each line's height.
- Image — `kind="image"` `width="100%"` `height={120}` — lesson: 10 px corners, as big as the image it stands in for.
- Badge — `kind="badge"` 56 × 20 — lesson: 4 px corners, the size of a badge.
- Circle or pill — in `<div className="coin-new-row">`: `kind="other"` 48 × 48 and 120 × 40 — lesson: The default kind: square sizes make a circle, wide ones a pill, for avatars and buttons.
- Coin components — Row(Reliance Industries …) — lesson: Avatar, Text, and Badge draw their own placeholders, sized from their own tokens.
- On a fullscreen modal — not a Panel: `<ScreenFrame surface="dark">` › `<SkeletonGroup loading><div className="coin-new-row">` `kind="other"` 48 × 48 and `kind="text"` 160 × 16, each with `modes={{ ...LIGHT, context5: 'Fullscreen Modal' } as Modes}` — lesson: Fullscreen Modal gives its content this context, which turns the blocks deep brown for dark media.

## States
header: States · title: Loading, loaded, and reduced motion · description: The group's loading flag switches every placeholder inside it at once. While loading, a white band sweeps across the blocks every 1.5 s, each a little after the one before. When the device asks for reduced motion, or the group sets it, the blocks pulse gently instead.
Grid `coin-new-example-grid`:
- Loading — Panel(`loading`, Feed) — lesson: Placeholders hold the layout, and the shimmer runs down them in a cascade.
- Loaded — Panel(`loading={false}`, Feed) — lesson: The same components show their content in the same places.
- Reduced motion — Panel(`loading reducedMotion`, Feed) — lesson: A slow white pulse every 3 s replaces the moving band.
- Outside a group — `<Surface width="wide"><div className="coin-new-stack"><Text modes={LIGHT} loading>Reliance Industries</Text><Text modes={LIGHT}>64 units · ₹1,52,900</Text></div></Surface>` (no group) — lesson: loading on its own draws nothing: the first line vanishes until a group is active (#266).

## Sizing
header: Sizing · title: The size of what it replaces · description: Coin components size their own placeholders: a Text bar is as tall as its line and about as long as its words, and an Avatar's is its own size. A hand-placed Skeleton has no size until you give it a width and height; percentages follow its host.
Measured diagram: `<Anatomy legend={false} surface="white" marks={[{ kind: 'size', target: `${SZ} > :nth-child(1)`, side: 'top', label: 'both' }, { kind: 'size', target: `${SZ} > :nth-child(2)`, side: 'bottom', label: 'both' }]}>` › `<SkeletonGroup loading><HStack testID="sk-size" modes={LIGHT} alignVertical="center"><Avatar style="Monogram" monogram="RI" modes={LIGHT} /><Text modes={LIGHT}>Reliance Industries</Text></HStack></SkeletonGroup>`. Report the measured sizes.

## Content
header: Content · title: Mirror the real layout · description: Put the same components in the group that will show the content, with realistic sample text, so each placeholder has the right length. Anything already known, such as a heading, stays real with loading off.
One ExampleCard "Known title, loading values" › Panel(`loading`, `<div className="coin-new-stack">` with `<Text modes={{ ...LIGHT, 'Text Sizes': 'Large' } as Modes} loading={false}>Your holdings</Text>` and both Rows). Description: "The title stays readable; only the values still loading turn into placeholders."

## In context
header: In context · title: Refreshing holdings · description: Refresh puts the holdings into their loading state for two seconds, then swaps the content back in place. The title and the button stay real.
Composition in `.coin-new-context`: `<ScreenFrame>` with `<Text modes={{ ...LIGHT, 'Text Sizes': 'Large' } as Modes}>Your holdings</Text>`, `<SkeletonGroup loading={refreshing}>` with both Rows, and `<Button label="Refresh" modes={LIGHT} />` outside the group, which sets `refreshing` true and back to false after 2000 ms (clear the timer on unmount). Below the frame, `<p className="coin-new-readout" role="status">`: "Loading holdings" while refreshing, otherwise "Holdings up to date".

## Do & Don'ts
header: Do & Don’ts · title: Hold the layout, keep what's known · description: Each pair shows a loading state that previews the screen next to one that hides it or makes people wait for nothing.
- Do Keep the real layout: Each row keeps its shape, so nothing jumps when content arrives. — Panel(`loading`, Feed) | Don't Cover it with one block: One block hides how much is coming, and the layout jumps when it loads. — Panel(`loading`, `<Skeleton kind="image" width="100%" height={160} />` in a `coin-new-stack`)
- Do Keep known text real: People can read the heading while the values load. — the Content card's panel | Don't Grey out everything: Turning known text grey makes people wait for nothing. — the same without `loading={false}` on the title

## Sources
header: Sources · title: Use the public Skeleton contract · description: The guide compares the Coin variables with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (5 October build) from the team’s private package repository; Biscuit’s newer build only rewrites the Storybook page. Figma has no Skeleton component: the Coin variables hold its grey and its corner radii, and the ticket’s Figma link opens the Stepper Item page. In code a SkeletonGroup switches every placeholder inside it; Text, Avatar, Badge, Button, Image, and other Coin components draw their own, and a Skeleton places one by hand. Blocks are light grey (#e7e7e7; the old Storybook page gives a lighter grey). A white band sweeps across them every 1.5 s in a 75 ms cascade, or they pulse every 3 s with reduced motion, as in Storybook. A component’s loading on its own draws nothing without a group, and on the web placeholders aren’t hidden from screen readers and nothing announces the loading (#266). The published Storybook page is still the old generated one.

## Limits
Do not show `style`, the hooks (`useSkeleton`, `useStaggerIndex`, `useReducedMotion`), or the shimmer constants. Color Mode has no effect, so don't offer it; `context5` appears only in its Configuration card. Show `loading` outside a group as it ships (#266). Don't imply that loading is announced to screen readers.
