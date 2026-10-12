# Spinner brief

slug: spinner · label: Spinner · public API: Spinner (+ VStack, HStack, Title, Text, Button for composition; ScreenFrame from the kit for In context)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2729-1039 · storybook: docsUrl('spinner') · stories: Default=components-spinner--default, Sizes=components-spinner--sizes, Heavy=components-spinner--heavy, Weightless=components-spinner--weightless, Resting=components-spinner--resting
checked: 12 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-636f3f5, Biscuit's main 636f3f5; main's c1fa197c and a463361 only rewrite the Storybook page)
icon: an open ring, three quarters of a circle — `<path d="M9 2.5a6.5 6.5 0 1 1-6.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />`
keywords: loader, loading indicator, activity indicator, progress spinner

Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`. Spinner takes no modes (none change it): never pass `modes` or `colors` to it. Other Coin components get `modes={LIGHT}` unless stated. Never hardcode colours.
“Waiting(size)” = `<VStack modes={{ ...LIGHT, 'Slot gap': 'S' } as Modes} alignHorizontal="center"><Spinner size={size} accessibilityLabel="Loading your statements" /><Text modes={LIGHT}>Fetching your statements…</Text></VStack>`.

## Overview
summary: Use a Spinner to show that something is loading when you can't show its shape or say how long it will take.
principle: Show that something is happening, then get out of the way.
playground: `.preview-stage` › `<Spinner size durationMs gravity animating />`; stage label "Live Coin Spinner". Controls: Segment "Size" `32 | 56 | 72 | 88 | 128` (72) → `size`; Segment "Turn" `1000 ms | 1500 ms | 2800 ms` (1500 ms) → `durationMs`; Segment "Weight" `None | Default | Heavy` (Default) → `gravity` 0 / 0.45 / 0.85; OnOff "Animating" (on) → `animating`. Readout title "Spinner", value "Spinning" or "Resting"; note when on: "It turns until the screen removes it or sets animating off. Weight makes it whip over the top and slow at the bottom."; off: "Resting: three evenly spaced arcs, which isn't a frame of the spin."

## Anatomy
header: Anatomy · title: Three arcs chasing each other · description: Three 100° arcs with round ends turn clockwise around an empty centre, with no track behind them. Each is 11% of the size thick, so 7.9 px at the default 72 px. The diagram shows the resting pose so the pins stay put.
specimen: `<Anatomy marks={[{ kind: 'size', target: byTestId('sp-anatomy'), side: 'bottom', label: 'both' }]}>` › `<Spinner testID="sp-anatomy" animating={false} />`
Root children render teal, purple, gold, so: SP = byTestId('sp-anatomy').
parts:
1. Leading arc — Gold and drawn on top. It leads the turn: fastest over the top, slowest at the bottom. — target: `${SP} > div:nth-child(3) path` — side: top
2. Middle arc — Purple. It follows the gold arc; the gap between them opens and closes as it turns. — target: `${SP} > div:nth-child(2) path` — side: left
3. Trailing arc — Teal and last in the chain, closing up behind the others at the top of each turn. — target: SP (its right edge is where the teal arc sits in the resting pose; the arc path's box overshoots) — side: right

## Configuration
header: Configuration · title: Size, speed, and weight · description: Three settings shape it: size sets the diameter, durationMs the time for one turn, and gravity how much it speeds up over the top and slows at the bottom. No mode changes it. A colors setting can replace its three colours in code; keep Coin's gold, purple, and teal.
Grid `coin-new-example-grid three`, each an ExampleCard › one Spinner at the default size:
- Default — `<Spinner />` — lesson: 72 px, one turn every 1.5 s, and gravity 0.45.
- Heavy — `gravity={0.85} durationMs={2800}` — lesson: Whips over the top and hangs at the bottom, for a slower, weightier feel.
- Weightless — `gravity={0} durationMs={1600}` — lesson: An even, steady turn with no change of speed.

## States
header: States · title: Spinning or resting · description: It spins while animating is on, the default. With animating off, or when the device asks for reduced motion, it rests as an evenly spaced fan of three arcs; the rest isn't a frame of the spin. It has no pressed, focus, or disabled state.
Grid `coin-new-example-grid`:
- Spinning — `<Spinner />` — lesson: Shown while something loads; the screen removes it when the content arrives.
- Resting — `<Spinner animating={false} />` — lesson: Also what people who turn on reduced motion see.

## Sizing
header: Sizing · title: You set the diameter · description: Size is the diameter in px: 72 by default, with no minimum or maximum. The arcs stay 11% of it thick, so a 32 px spinner draws 3.5 px arcs. It keeps its size and doesn't stretch to fill its host.
Grid `coin-new-example-grid three`, each an ExampleCard › one spinning Spinner (a SpecimenRow with size marks crowds the stage, so the sizes are cards):
- 32 px — `size={32}` — lesson: 3.5 px arcs. Small enough to sit beside a line of text.
- 56 px — `size={56}` — lesson: 6.2 px arcs, for a card or one section that's loading.
- 88 px — `size={88}` — lesson: 9.7 px arcs, for a whole screen waiting on one thing.

## Content
header: Content · title: No text of its own · description: The spinner shows no words. Its spoken name is “Loading” unless you set accessibilityLabel; name what's loading, and add a short line of text next to it when the wait is more than a moment.
One ExampleCard "Say what's loading" › Waiting(56). Description: "A 56 px spinner named “Loading your statements” and one line that says the same."

## In context
header: In context · title: Refreshing statements · description: Refresh swaps the list for a spinner and a line of text while the statements load, then brings the list back. The screen owns the loading state; the spinner only shows it.
Composition in `.coin-new-context`: a `<ScreenFrame>` holding `<VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes}>` with `<Title title="Statements" subtitle="Savings account ··4821" modes={LIGHT} />`; then, while loading, Waiting(40); otherwise `<VStack modes={{ ...LIGHT, 'Slot gap': 'S' } as Modes}>` with three `<Text modes={LIGHT}>` lines "September 2026 statement", "August 2026 statement", "July 2026 statement"; then a full-width `<Button label="Refresh" modes={LIGHT} disabled={loading} onPress={refresh} />`. `refresh` sets loading true and, after 1800 ms, false (clear the timer on unmount). Below the frame, `<p className="coin-new-readout" role="status">`: "Statements up to date" (start), "Loading statements…" while loading, "Statements up to date" after.

## Do & Don'ts
header: Do & Don’ts · title: One clear wait · description: Each pair shows a wait people understand next to one that leaves them guessing or watching several spinners at once.
- Do Say what's loading: A short line next to it tells people what they're waiting for. — Waiting(40) | Don't Leave it unexplained: A spinner on its own says something is happening, not what. — `<Spinner size={40} />` alone
- Do Show one spinner per wait: One spinner covers the whole list while it loads. — Waiting(40) | Don't Spin every row: Several spinners compete for attention and make the wait feel longer. — `<VStack modes={{ ...LIGHT, 'Slot gap': 'S' } as Modes}>` with three `<HStack modes={LIGHT} alignVertical="center" justifyHorizontal="space-between">` rows, each `<Text modes={LIGHT}>` ("September 2026 statement", "August 2026 statement", "July 2026 statement") and `<Spinner size={24} />`

## Sources
header: Sources · title: Use the public Spinner contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (5 October build) from the team’s private package repository; Biscuit’s newer build only rewrites the Storybook page. Figma’s Spinner is one 72 × 72 frame of three arcs in gold, purple, and teal, with no variants; the motion, speed, weight, and resting pose exist only in code. In code the arcs are 11% of the size thick, 7.9 px at 72, while Figma’s ring is about 12.8 px (#276). No mode changes it, and a colors setting replaces its three colours. It is announced as a progress bar named “Loading” unless you name it, with no value. The code’s description of durationMs says 2400 ms, but the default is 1500 ms. The published Storybook page is still the old generated one.

## Limits
Don't demo `colors` (it needs hardcoded colours) or pass `modes`. Don't imply a progress value, a track, a label of its own, size variants, or that Button's loading state is a spinner (it's a Skeleton). Don't mention colour modes.
