# BottomNav

> Coin agent pack 0.1.78+27 (pilot). Generated from `components/bottomnav.json`; the JSON is the source of truth.

- **State:** flagged (7 flags, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `31f1c5e` · built 2026-10-31T05:18:28Z
- **Category:** navigation (for discovery only, not a limit on composition) · **Tags:** tab bar, bottom navigation, navigation bar, tabs
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=bottomnav) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=302-79) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-bottomnav--docs)

Use a Bottom Nav to move between the top-level sections of an app from any screen.

## Use when

- **recommended** Move between the top-level sections of an app from any screen.  
  _From summary: “Use a Bottom Nav to move between the top-level sections of an app from any screen.”_
- **recommended** Switch sections of the app.  
  _From inContext: “Switch sections of the app”_

## Avoid when

- **discouraged** More than five top-level destinations: with a sixth, items shrink to about 55 px and labels crowd each other.  
  _From doDont: “Items shrink to about 55 px and labels crowd each other.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Bar | White surface with a hairline top border (the guide shows it in Light). | yes | anatomy: “White surface with a hairline top border.” |
| Active item | The destination people are on, in the accent colour. | no | anatomy: “The destination people are on, in the accent colour.” |
| Idle item | Another destination, one tap away. | no | anatomy: “Another destination, one tap away.” |
| Label | Names the destination in one or two words. | yes | anatomy: “Names the destination in one or two words.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `children` | `ReactNode` | types |

## Placement

- **recommended** Always at the bottom.  
  _From corePrinciple: “always at the bottom”_
- **recommended** Bottom Nav spans its screen and anchors to the bottom edge.  
  _From sizing: “Bottom Nav spans its screen and anchors to the bottom edge.”_
- **recommended** It anchors itself to the bottom of its nearest positioned container. ⚑ flagged (trace-check)  
  _From sources: “anchors itself to the bottom of its nearest positioned container”_
- **recommended** Its height comes from the items and the padding, 78 px in the installed package.  
  _From sizing: “Its height comes from the items and the padding, 78 px in the installed package.”_

## Configuration

- **recommended** Three to five destinations, exactly one Active.  
  _From corePrinciple: “Three to five destinations, exactly one Active”_
- **recommended** Every destination gets an equal share of the bar.  
  _From configuration: “Every destination gets an equal share of the bar.”_
- **recommended** Fewer destinations mean wider tap targets; five is the most that stays comfortable.  
  _From configuration: “Fewer destinations mean wider tap targets; five is the most that stays comfortable.”_
- **recommended** `value`: The screen tells Bottom Nav which destination is Active through its value.  
  _From states: “The screen tells Bottom Nav which destination is Active through its value.”_
- **recommended** `value`: Bottom Nav sets each item's BottomNavItem / State mode from value: the item whose value matches is Active, the rest Idle. ⚑ flagged (trace-check)  
  _From sources: “Bottom Nav sets each item’s BottomNavItem / State mode from value”_
- **recommended** `value`: The app keeps the Active value and swaps the screen above when it changes.  
  _From inContext: “The app keeps the Active value and swaps the screen above when it changes.”_
- **recommended** `onChange`: Bottom Nav only reports which destination was pressed: onChange receives that destination's value.  
  _From inContext: “Bottom Nav only reports which destination was pressed.”_
- **recommended** A destination can be disabled while it is temporarily unavailable: set disabled on its BottomNav.Item.  
  _From states: “A destination can be disabled while it is temporarily unavailable.”_
- **discouraged** `value`: Don't leave nothing Active: with no match for the value, every item looks Idle.  
  _From doDont: “With no match for the value, every item looks Idle.”_

## Content

- **recommended** One or two words per destination.  
  _From content: “One or two words per destination”_
- **recommended** Use short nouns people already know, each with an icon that matches it.  
  _From content: “Use short nouns people already know, each with an icon that matches it.”_
- **discouraged** Don't use a long label: it wraps and makes that item taller than the rest.  
  _From content: “A long label wraps and makes that item taller than the rest.”_
- **recommended** Give each destination its own icon: icons help people find a section at a glance.  
  _From doDont: “Icons help people find a section at a glance.”_
- **discouraged** Don't reuse one icon everywhere: identical icons force people to read every label.  
  _From doDont: “Identical icons force people to read every label.”_

Good: “Home”, “Finances”, “Pay”, “Invest”, “Explore”

Bad: “Investments & savings”

## States

| State | When | From |
| --- | --- | --- |
| Active | The destination whose value matches Bottom Nav's value: only the matching item switches to Active. | states: “Only the matching item switches to Active.” |
| Idle | Every other destination: one Active, the rest Idle. | states: “One Active, the rest Idle” |
| Disabled | A destination that is temporarily unavailable: dimmed and skipped by keyboard focus. | states: “Dimmed and skipped by keyboard focus.” |

## Accessibility

- **recommended** Each destination is a tab named by its label. ⚑ flagged (trace-check)  
  _From evidence: “each item `role=tab`, `aria-label` = label”_
- **discouraged** `accessibilityLabel`: Don't rely on accessibilityLabel or on the Active state being announced on the web: the tab list has no accessible name, even with accessibilityLabel, and the Active tab is not exposed as selected. ⚑ flagged (trace-check)  
  _From sources: “On the web the tab list has no accessible name, even with accessibilityLabel, and the Active tab is not exposed as selected.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Keep three to five destinations | Crowd in a sixth | Items shrink to about 55 px and labels crowd each other. |
| Keep one destination Active | Leave nothing Active | With no match for the value, every item looks Idle. |
| Give each destination its own icon | Reuse one icon everywhere | Identical icons force people to read every label. |

## Examples

### Switching sections of the app, the guide's In context: a Screen holds the Active section's content and the Bottom Nav, which anchors to its bottom edge. Five destinations, each a short noun with its own icon; Home is Active. The app keeps the Active value and swaps the content above when onChange reports a pressed destination: the literal value and the empty onChange stand for the app's own state.

```tsx
<Screen>
  <VStack>
    <Text text="Home" />
    <Text text="Your balances and recent activity" />
  </VStack>
  <BottomNav value="home" onChange={(value) => {}}>
    <BottomNav.Item value="home" label="Home" iconName="ic_home" />
    <BottomNav.Item value="finances" label="Finances" iconName="ic_rupee" />
    <BottomNav.Item value="pay" label="Pay" iconName="ic_scan_qr_code" />
    <BottomNav.Item value="invest" label="Invest" iconName="ic_rupee_coin" />
    <BottomNav.Item value="explore" label="Explore" iconName="ic_search" />
  </BottomNav>
</Screen>
```

_From inContext: “The app keeps the Active value and swaps the screen above when it changes.”_

### Three destinations, the guide's Configuration: each gets an equal share of the bar, so the tap targets are wider than with five (about 109 px each on the guide's 360 px frame, against about 66 px for five).

```tsx
<BottomNav value="home" onChange={(value) => {}}>
  <BottomNav.Item value="home" label="Home" iconName="ic_home" />
  <BottomNav.Item value="pay" label="Pay" iconName="ic_scan_qr_code" />
  <BottomNav.Item value="explore" label="Explore" iconName="ic_search" />
</BottomNav>
```

_From configuration: “Each item is about 109 px wide.”_

### A destination that is temporarily unavailable, the guide's States: Pay is disabled, so it is dimmed and skipped by keyboard focus; Home is Active.

```tsx
<BottomNav value="home" onChange={(value) => {}}>
  <BottomNav.Item value="home" label="Home" iconName="ic_home" />
  <BottomNav.Item value="finances" label="Finances" iconName="ic_rupee" />
  <BottomNav.Item value="pay" label="Pay" iconName="ic_scan_qr_code" disabled />
  <BottomNav.Item value="invest" label="Invest" iconName="ic_rupee_coin" />
  <BottomNav.Item value="explore" label="Explore" iconName="ic_search" />
</BottomNav>
```

_From states: “A destination can be disabled while it is temporarily unavailable.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `value` | `string \| number` |  |  |  | types | Value of the currently selected item. |
| `onChange` | `(value: string \| number) => void` |  |  |  | types | Callback fired when an item is pressed. |
| `children` | `React.ReactNode` |  |  |  | types | The content of the component (BottomNav.Item components). |
| `modes` | `Modes` |  |  |  | types |  |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types |  |
| `accessibilityLabel` ⚑ flagged (trace-check) | `string` |  |  |  | evidence (2026-09-28) | Accepted by the type but discarded: the tab list gets no name from it. |
| `accessibilityHint` | `string` |  |  |  | types |  |
| `...Omit<React.ComponentProps<typeof View>, 'style' | 'accessibilityRole' | 'accessibilityLabel' | 'accessibilityHint'>` | `Omit<React.ComponentProps<typeof View>, 'style' \| 'accessibilityRole' \| 'accessibilityLabel' \| 'accessibilityHint'>` |  |  |  | types | Inherited React Native props the component also accepts. They are not part of the design contract and no guide documents them. |
| `BottomNav.Item` ⚑ flagged (trace-check) | `component` |  |  |  | evidence (2026-09-28) | Each destination is a BottomNav.Item with value, label, iconName, disabled and onPress. Declared: A static sub-component of BottomNav. Its own props: value. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection BottomNav reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types | The content of the component (BottomNav.Item components). |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onChange` | `(value: string \| number) => void` |  |  |  | types | Callback fired when an item is pressed. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- Figma draws the bar at 77 px; the package renders 78 px, with its 1 px top border inside the bar. _(evidence, 2026-09-28)_ ⚑ flagged (trace-check)

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/facts/props/5` · trace-check: Checked on jfs-components 0.1.60 (2026-09-28); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/props/8` · trace-check: Checked on jfs-components 0.1.60 (2026-09-28); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/gaps/0` · trace-check: Checked on jfs-components 0.1.60 (2026-09-28); the installed package is 0.1.78. Re-check before relying on it.
- `/placementAdvice/2` · trace-check: Checked on jfs-components 0.1.60 (2026-09-28); the installed package is 0.1.78. Re-check before relying on it.
- `/configuration/4` · trace-check: Checked on jfs-components 0.1.60 (2026-09-28); the installed package is 0.1.78. Re-check before relying on it.
- `/accessibility/0` · trace-check: Checked on jfs-components 0.1.60 (2026-09-28); the installed package is 0.1.78. Re-check before relying on it.
- `/accessibility/1` · trace-check: Checked on jfs-components 0.1.60 (2026-09-28); the installed package is 0.1.78. Re-check before relying on it.
