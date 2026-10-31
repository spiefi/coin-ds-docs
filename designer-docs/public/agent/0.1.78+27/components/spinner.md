# Spinner

> Coin agent pack 0.1.78+27 (pilot). Generated from `components/spinner.json`; the JSON is the source of truth.

- **State:** documented
- **Package:** jfs-components 0.1.78 · guide commit `622cd82` · built 2026-10-31T05:18:28Z
- **Category:** feedback (for discovery only, not a limit on composition) · **Tags:** loader, loading indicator, activity indicator, progress spinner
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=spinner) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2729-1039) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-spinner--docs)

Use a Spinner to show that something is loading when you can't show its shape or say how long it will take.

## Use when

- **recommended** Show that something is loading when you can't show its shape or say how long it will take.  
  _From summary: “Use a Spinner to show that something is loading when you can't show its shape or say how long it will take.”_
- **recommended** Show that something is happening, then get out of the way.  
  _From corePrinciple: “Show that something is happening, then get out of the way.”_

## Avoid when

- **discouraged** When you can show the shape of what's loading, or say how long it will take: the guide keeps the spinner for when you can't.  
  _From summary: “Use a Spinner to show that something is loading when you can't show its shape or say how long it will take.”_
- **discouraged** Spinning every row of a list: several spinners compete for attention and make the wait feel longer.  
  _From doDont: “Several spinners compete for attention and make the wait feel longer.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Leading arc | Gold and drawn on top. It leads the turn: fastest over the top, slowest at the bottom. | yes | anatomy: “Gold and drawn on top. It leads the turn: fastest over the top, slowest at the bottom.” |
| Middle arc | Purple. It follows the gold arc; the gap between them opens and closes as it turns. | yes | anatomy: “Purple. It follows the gold arc; the gap between them opens and closes as it turns.” |
| Trailing arc | Teal and last in the chain, closing up behind the others at the top of each turn. | yes | anatomy: “Teal and last in the chain, closing up behind the others at the top of each turn.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

_No slots._

## Placement

- **recommended** Show one spinner per wait: one spinner covers the whole list while it loads.  
  _From doDont: “One spinner covers the whole list while it loads.”_
- **recommended** `size` = `32`: 32 px is small enough to sit beside a line of text.  
  _From sizing: “Small enough to sit beside a line of text.”_
- **recommended** `size` = `56`: 56 px for a card or one section that's loading.  
  _From sizing: “10 px arcs, for a card or one section that's loading.”_
- **recommended** `size` = `88`: 88 px for a whole screen waiting on one thing.  
  _From sizing: “15.6 px arcs, for a whole screen waiting on one thing.”_
- **recommended** It keeps its size and doesn't stretch to fill its host.  
  _From sizing: “It keeps its size and doesn't stretch to fill its host.”_

## Configuration

- **recommended** The screen owns the loading state; the spinner only shows it.  
  _From inContext: “The screen owns the loading state; the spinner only shows it.”_
- **recommended** `size`: size sets the diameter in px: 72 by default, with no minimum or maximum.  
  _From sizing: “Size is the diameter in px: 72 by default, with no minimum or maximum.”_
- **recommended** `size`: The arcs stay about 18% of the size thick, so a 32 px spinner draws 5.7 px arcs.  
  _From sizing: “The arcs stay about 18% of it thick, so a 32 px spinner draws 5.7 px arcs.”_
- **recommended** `durationMs`: durationMs sets the time for one turn.  
  _From configuration: “durationMs the time for one turn”_
- **recommended** `gravity`: gravity sets how much it speeds up over the top and slows at the bottom.  
  _From configuration: “gravity how much it speeds up over the top and slows at the bottom”_
- **recommended** `gravity`: The default is gravity 0.45 and a 1.5 s turn: a little faster over the top.  
  _From configuration: “Gravity 0.45 and a 1.5 s turn: a little faster over the top.”_
- **recommended** `animating` = `true`: It spins while animating is on, the default.  
  _From states: “It spins while animating is on, the default.”_
- **recommended** `modes`: No mode changes it.  
  _From configuration: “No mode changes it.”_
- **discouraged** `colors`: colors can replace its three colours in code; keep Coin's gold, purple, and teal.  
  _From configuration: “A colors setting can replace its three colours in code; keep Coin's gold, purple, and teal.”_

## Content

- **recommended** The spinner shows no words: name what's loading, and add a short line of text next to it when the wait is more than a moment.  
  _From content: “name what's loading, and add a short line of text next to it when the wait is more than a moment.”_
- **recommended** For example, a spinner named “Loading your statements” and one line that says the same: “Fetching your statements…”.  
  _From content: “A 56 px spinner named “Loading your statements” and one line that says the same.”_
- **recommended** Say what's loading: a short line next to it tells people what they're waiting for.  
  _From doDont: “A short line next to it tells people what they're waiting for.”_
- **discouraged** Don't leave it unexplained: a spinner on its own says something is happening, not what.  
  _From doDont: “A spinner on its own says something is happening, not what.”_

Good: “Fetching your statements…”

## States

| State | When | From |
| --- | --- | --- |
| Spinning | While animating is on, the default: shown while something loads; the screen removes it when the content arrives. | states: “Shown while something loads; the screen removes it when the content arrives.” |
| Resting | With animating off, or when the device asks for reduced motion: an evenly spaced fan of three arcs, which isn't a frame of the spin. | states: “With animating off, or when the device asks for reduced motion, it rests as an evenly spaced fan of three arcs; the rest isn't a frame of the spin.” |
| No interaction states | It has no pressed, focus, or disabled state. | states: “It has no pressed, focus, or disabled state.” |

## Accessibility

- **recommended** `accessibilityLabel`: Its spoken name is “Loading” unless you set accessibilityLabel; name what's loading.  
  _From content: “Its spoken name is “Loading” unless you set accessibilityLabel; name what's loading”_
- **recommended** It is announced as a progress bar named “Loading” unless you name it, with no value.  
  _From sources: “It is announced as a progress bar named “Loading” unless you name it, with no value.”_
- **recommended** The resting fan is also what people who turn on reduced motion see.  
  _From states: “Also what people who turn on reduced motion see.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Say what's loading | Leave it unexplained | A spinner on its own says something is happening, not what. |
| Show one spinner per wait | Spin every row | Several spinners compete for attention and make the wait feel longer. |

## Examples

### Refreshing statements, the guide's In context, while they load: the list under the title is swapped for a 40 px spinner named “Loading your statements” and one line of text, and the list comes back when the statements arrive. The screen owns the loading state; Refresh is off while it loads, as in the guide's own example. The literal disabled and the empty onPress stand for the screen's own state and wiring.

```tsx
<VStack>
  <Title title="Statements" subtitle="Savings account ··4821" />
  <VStack alignHorizontal="center">
    <Spinner size={40} accessibilityLabel="Loading your statements" />
    <Text text="Fetching your statements…" />
  </VStack>
  <Button label="Refresh" disabled onPress={() => {}} />
</VStack>
```

_From inContext: “Refresh swaps the list for a spinner and a line of text while the statements load, then brings the list back.”_

### Say what's loading, the guide's Content: a 56 px spinner, the size for a card or one section, named “Loading your statements”, with one line under it that says the same.

```tsx
<VStack alignHorizontal="center">
  <Spinner size={56} accessibilityLabel="Loading your statements" />
  <Text text="Fetching your statements…" />
</VStack>
```

_From content: “A 56 px spinner named “Loading your statements” and one line that says the same.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `accessibilityLabel` | `string` |  | `"Loading"` |  | evidence (2026-10-17) | The name of the root, a progressbar (“Loading” by default). There is no value, aria-busy or live region. Declared: Accessibility label announced to assistive tech. Defaults to "Loading". Default "Loading", from the component source. |
| `size` | `number` |  | `72` |  | evidence (2026-10-17) | The diameter, with no clamp; the arc stroke is 12.8 / 72 of it (12.8 px at 72). Declared: Diameter in px. The spinner is always rendered at a 1:1 ratio, so a single size controls both width and height. Defaults to the Figma size (72). Default 72, from the component source. |
| `durationMs` | `number` |  | `1500` |  | types | Duration of one full clockwise revolution of the leading segment, in ms. Lower = faster. Defaults to 1500. Default 1500, from the component source. |
| `gravity` | `number` |  | `0.45` |  | evidence (2026-10-17) | Default 0.45, clamped to 0–0.9; 0 gives an even speed. Declared: "Weightiness" of the fall, in `[0, 0.9]`. 0 = perfectly constant speed; higher values make segments whip faster over the top and ease through the bottom. Kept below 1 so the motion never reverses. Defaults to 0.45. Default 0.45, from the component source. |
| `colors` | `SpinnerColors` |  |  |  | evidence (2026-10-17) | { primary, secondary, tertiary }: the leading gold arc (primary, drawn on top), then the purple and the teal. Declared: Override any subset of the token-driven segment colours. |
| `animating` | `boolean` |  | `true` |  | evidence (2026-10-17) | false, or reduced motion on the device, shows the resting fan. Reduced motion comes from prefers-reduced-motion on the web, and no prop overrides it. Declared: When false, renders a static resting spinner (also honoured for reduced motion). Defaults to true. Default true, from the component source. |
| `modes` | `Modes` |  |  |  | evidence (2026-10-17) | Has no effect on the output: no mode collection changes the spinner; only colors does. Declared: Design token modes forwarded to token lookups. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Container style override. |
| `...SpinnerBaseProps` | `SpinnerBaseProps` |  |  |  | types | Inherited React Native props the component also accepts. They are not part of the design contract and no guide documents them. |

### Modes

_No modes._

### Slots

_No slots._

### Events

_No events._

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- The published Storybook page is still the old generated one. _(evidence, 2026-10-17)_
- Figma's Spinner is one static pose (contiguous arcs, a ~69° gap); the code's resting pose is three separate arcs 120° apart. _(evidence, 2026-10-17)_

## Flags

_None._
