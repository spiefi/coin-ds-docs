## Building with Coin

How to build screens and pages with Coin, in any tool. The facts (what each
component is, its props, slots and examples) are in this pack's entries: read
them for the components your task uses, not all of them.

### Plan with the largest block that fits

- For each part of a screen, use the largest existing block that fits: a
  template when the pack has one (this release has none), then a component,
  then a composition of components. One screen can mix all three.
- Choose by purpose: read each candidate's summary, use when and avoid when.
- A part nothing fits is new: compose it from Coin components and report it.
  A composition that keeps coming back is a candidate for a template.
- Never rebuild a component Coin has, or one it lacks. Report the gap.

### Use only components with an entry

Use only components that have an entry in this pack. The exports under "Not
in this pack" are not for building: some are Coin components this pack does
not cover yet, and some exist only in code and are not part of Coin (Section
is one). Ask, or report that the request needs one.

### Leave modes at their defaults

- Coin components look right with no modes set. With none, a Button is the
  main action: AppearanceBrand Primary, Emphasis High, Button / Size M,
  Semantic Intent Brand.
- Give components content, actions and layout. Do not set modes to change how
  they look.
- Set a mode only when an entry's rule says this content needs it (such as
  Semantic Intent System for an outcome with a clear positive, warning or
  negative meaning), when two actions share a place, or when you build
  something new.
- Do not copy modes from examples. Many set modes that only repeat the
  defaults, and Color Mode. Leave both out.
- Never change colour, border, radius or font through style.

### Color Mode comes from the device

Never set Color Mode on a component or a screen. The app sets it once, from
the device's light or dark setting, and Coin parents pass it down.

### In a slot, the parent decides the look

Some Coin parents give the components in their slots a context: a default
Button in a Nudge, a ListItem or an AppBar gets its look and size from it.
Put default components in slots, and do not set appearance, emphasis, size or
intent on them. The context decides those, and modes you add can undo it.

### A built-in part needs only its props

When a component has a built-in part, such as a card's call to action set
through `buttonLabel` and a press handler, the component styles it.

- Give the part its text and its action, nothing else.
- Do not set modes on the component to restyle the part: in some components
  they reach it.
- If the part does not fit the design, do not swap or restyle it. Report it.

### Two actions in one place

One action leads. When the parent does not decide which, keep the leading
action at its defaults and set Emphasis Medium on the other. Report it: this
rule is provisional.

### Something new

- Set modes only for something Coin does not cover yet: a layout or a place no
  context handles. Set the fewest that work, with values the facts list, and
  report each one and why.
- Coin has no semantic tokens and no Section component yet. For the page
  background, use Screen. Other surfaces with no Coin component, such as a
  band or a website section, may use Color Mode primitives for now: by name
  (`mode/<ramp>/<step>`), never hex or rgb, never on a Coin component, and
  each one listed in your report.
- Primitive steps are relative to the mode, not fixed shades:
  `mode/Grey/2500` is white in Light and black in Dark, and `mode/Grey/100`
  is the reverse. Choose a step by its contrast with the content.

### In code

Import from the package root only, never from internal paths. Set Color Mode
once, at the app root:

```tsx
const scheme = useColorScheme()

<JFSThemeProvider modes={{ 'Color Mode': scheme === 'dark' ? 'Dark' : 'Light' }}>
  <Screen>{/* … */}</Screen>
</JFSThemeProvider>
```

Resolve a primitive through Coin, so it follows the device:
`useTokens().getVariable('mode/Grey/2400')`.

### Check before you finish

1. Color Mode is set only where the app reads it from the device.
2. Every mode you set has a reason: an entry's rule for this content, "Two
   actions", or "Something new". Its value is in the facts.
3. No colour, border, radius or font overrides on Coin components, and no hex
   or rgb values.
4. Every component has an entry in this pack.
5. Slot children and built-in parts carry no appearance, emphasis or size
   modes.
6. Primitives appear only on surfaces with no Coin component, and all are
   listed.

If you can render the result, look at it in Light and Dark, narrow and wide.

### Report

- The Coin components you used.
- Every mode you set, and why.
- Every primitive you used, and where.
- Parts you composed because no template or component fitted.
- Gaps: what Coin is missing, and exports you did not use.
- Decisions the person needs to make.
