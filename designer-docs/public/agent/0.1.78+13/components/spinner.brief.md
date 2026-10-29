# Spinner (brief)

> Coin agent pack 0.1.78+13 · documented · full entry: `components/spinner.md` (sources, all facts, flags)

Use a Spinner to show that something is loading when you can't show its shape or say how long it will take.

**Use when**
- Show that something is loading when you can't show its shape or say how long it will take.
- Show that something is happening, then get out of the way.

**Avoid when**
- Avoid: When you can show the shape of what's loading, or say how long it will take: the guide keeps the spinner for when you can't.
- Avoid: Spinning every row of a list: several spinners compete for attention and make the wait feel longer.

**Placement**
- Show one spinner per wait: one spinner covers the whole list while it loads.
- `size` = `32`: 32 px is small enough to sit beside a line of text.
- `size` = `56`: 56 px for a card or one section that's loading.
- `size` = `88`: 88 px for a whole screen waiting on one thing.

**Key rules**
- The screen owns the loading state; the spinner only shows it.
- `size`: size sets the diameter in px: 72 by default, with no minimum or maximum.
- `size`: The arcs stay about 18% of the size thick, so a 32 px spinner draws 5.7 px arcs.
- `durationMs`: durationMs sets the time for one turn.
- `gravity`: gravity sets how much it speeds up over the top and slows at the bottom.
- `gravity`: The default is gravity 0.45 and a 1.5 s turn: a little faster over the top.
- `animating` = `true`: It spins while animating is on, the default.
- `modes`: No mode changes it.

**Example:** Refreshing statements, the guide's In context, while they load: the list under the title is swapped for a 40 px spinner named “Loading your statements” and one line of text, and the list comes back when the statements arrive. The screen owns the loading state; Refresh is off while it loads, as in the guide's own example. The literal disabled and the empty onPress stand for the screen's own state and wiring.

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

**Props:** `accessibilityLabel`, `size`, `durationMs`, `gravity`, `colors`, `animating`, `modes`, `style`. (* required)

**Gaps (report, do not work around)**
- The published Storybook page is still the old generated one.
- Figma's Spinner is one static pose (contiguous arcs, a ~69° gap); the code's resting pose is three separate arcs 120° apart.

Full entry: `components/spinner.md`. Links: `components/spinner.links.md`.
