# Accordion

> Coin agent pack 0.1.78+24 (pilot). Generated from `components/accordion.json`; the JSON is the source of truth.

- **State:** flagged (6 flags, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `31f1c5e` · built 2026-10-31T02:32:56Z
- **Category:** content (for discovery only, not a limit on composition) · **Tags:** collapsible, expandable, disclosure, FAQ
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=accordion) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1291-4846) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-accordion--docs)

Reveal supporting details when people need them, while keeping the page easy to scan.

## Use when

- **recommended** Reveal supporting details when people need them, while keeping the page easy to scan.  
  _From summary: “Reveal supporting details when people need them, while keeping the page easy to scan.”_

## Avoid when

- **discouraged** Hiding the page's main task: leave it in the page flow when hiding it would block progress or change the decision.  
  _From content: “Leave the main task in the page flow when hiding it would block progress or change the decision.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Header | The title: the promise people use to decide whether to open the section. | yes | anatomy: “The title is the promise people use to decide whether to open the section.” |
| Label | The header text, short enough to stay scannable in a narrow host. | yes | anatomy: “Keep the header short enough to remain scannable in a narrow host.” |
| Indicator | Add and minus icons the component switches as it opens and closes. | yes | anatomy: “The public component switches between add and minus icons as it opens and closes.” |
| Divider | The bottom border that separates the open section from the following content. | yes | anatomy: “The component’s bottom border separates the open section from the following content.” |
| Content slot | children: supporting details or related public rows. | no | anatomy: “Put supporting details or related public rows here; keep primary actions visible in the page flow.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `children` | `ReactNode` | types |

## Placement

- **recommended** Keep the primary action outside the Accordion, in the page flow; use the Accordion for supporting details.  
  _From doDont: “Use the Accordion for supporting details while the main payment action stays in the page flow.”_
- **discouraged** Do not put the primary action in the content slot: it is unavailable until someone expands the section.  
  _From doDont: “The button is unavailable until someone expands the section, so the task is harder to complete.”_
- **recommended** Several Accordions can sit together; each keeps its own expanded state, and the screen's wiring decides whether one, both or neither is open.  
  _From inContext: “Two public Accordions can sit together while each keeps its own expanded state. Consumer wiring decides whether one, both, or neither is open.”_
- **recommended** Let the host supply the width; the Accordion grows with its title and open content.  
  _From sizing: “In a product layout, the host supplies width and the component grows with its title and open content.”_

## Configuration

- **recommended** `contained` = `false`: Use the default treatment (contained false) when the heading can sit comfortably in the surrounding page structure.  
  _From configuration: “Use the default when the heading can sit comfortably in the surrounding page structure.”_
- **recommended** `contained` = `true`: Use contained when the filled header should keep related supporting content together, so the group stands apart from its host.  
  _From configuration: “Use contained when the filled header should keep related supporting content together.”_
- **recommended** `expanded`: Set expanded (or defaultExpanded) and disabled to reflect the product situation, and let the header show the result.  
  _From states: “Choose the expanded or disabled condition that reflects the product situation and let the header communicate the result.”_
- **REQUIRED** `Accordion States`: Leave the Accordion States mode unset: the component derives it from expanded, disabled, hover and contained.  
  _From fact `/facts/modes/0` (Accordion States, source types)_
- **recommended** `disableTruncation` = `true`: To let a long title wrap instead of truncating, set disableTruncation.  
  _From fact `/facts/props/13` (disableTruncation, source types)_

## Content

- **recommended** `title`: Make the header a clear promise about the content inside.  
  _From corePrinciple: “Make the header a clear promise about the content inside.”_
- **recommended** `title`: The header should tell people what they will find; the body answers the question the header raises.  
  _From content: “Use a meaningful header and let the body answer the question that header raises.”_
- **recommended** `title`: Keep the header short enough to stay scannable in a narrow host.  
  _From anatomy: “Keep the header short enough to remain scannable in a narrow host.”_
- **recommended** `title`: Allow a long title to wrap when the group name needs more than one line.  
  _From sizing: “Allow a long title to wrap when the group name needs more than one line.”_
- **recommended** `children`: Put rows or short explanatory text in the content slot when they answer the header's promise.  
  _From content: “Rows or short explanatory text belong in the content slot when they answer the header’s promise.”_
- **discouraged** `children`: Do not mix unrelated information in one section: the heading stops helping.  
  _From doDont: “The heading stops helping because the open content answers several different questions.”_

Good: “Payment methods”, “Bank accounts”, “Savings Account · HDFC Bank”

Bad: “More”, “Support hours, marketing preferences, and unrelated profile reminders.”

## States

| State | When | From |
| --- | --- | --- |
| Collapsed | The default (defaultExpanded false): the heading shows and the content stays out of the initial scan. | states: “The heading is visible while supporting content stays out of the initial scan.” |
| Open | expanded (or defaultExpanded) is true, after the person asks for more detail. | states: “The content slot is visible after the person asks for more detail.” |
| Disabled | disabled is true: the section is unavailable until the product condition changes. | states: “The section is unavailable until the product condition changes.” |
| Hover | Supplied by the component under a pointer; not configured. | states: “Expanded, disabled, and hover feedback come from the public component as people interact.” |

## Accessibility

_None in the guide._

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Name what people will find | Use a heading with no meaning | People must open the section before they know whether it contains the detail they need. |
| Keep the content related | Mix unrelated information | The heading stops helping because the open content answers several different questions. |
| Keep primary work visible | Hide the primary action in the body | The button is unavailable until someone expands the section, so the task is harder to complete. |

## Examples

### A section whose body answers its header, with Text in the content slot.

```tsx
<Accordion title="Payment methods" modes={{ 'Color Mode': 'Light' }}>
  <Text text="Review the payment methods available for this account." modes={{ 'Color Mode': 'Light' }} />
</Accordion>
```

_From content: “Use a meaningful header and let the body answer the question that header raises.”_

### A contained, controlled section holding related rows.

```tsx
<Accordion title="Bank accounts" contained expanded onExpandedChange={(expanded) => {}} modes={{ 'Color Mode': 'Light' }}>
  <ListItem layout="Horizontal" title="Savings Account" supportText="HDFC Bank" modes={{ 'Color Mode': 'Light' }} />
</Accordion>
```

_From configuration: “Use contained when the filled header should keep related supporting content together.”_

### Supporting details in an Accordion, with the primary action outside it in the page flow.

```tsx
<VStack modes={{ 'Color Mode': 'Light' }}>
  <Accordion title="Payment details" modes={{ 'Color Mode': 'Light' }}>
    <Text text="Paid from your JioFinance account." modes={{ 'Color Mode': 'Light' }} />
  </Accordion>
  <Button label="Confirm payment" onPress={() => {}} modes={{ 'Color Mode': 'Light', Emphasis: 'High', AppearanceBrand: 'Primary' }} />
</VStack>
```

_From doDont: “Use the Accordion for supporting details while the main payment action stays in the page flow.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `title` | `string` |  | `"Accordion title"` |  | types | The accordion header title. Default "Accordion title", from the component source. |
| `contained` | `boolean` |  | `false` |  | types | When `true`, the header always uses the filled background treatment (Figma Hover / Open Hover visuals). Defaults to `false` (transparent at rest, filled only while hovered or pressed). Default false, from the component source. |
| `defaultExpanded` | `boolean` |  | `false` |  | types | Initial expanded state. Defaults to false (collapsed) Default false, from the component source. |
| `expanded` | `boolean` |  |  |  | types | Controlled expanded state. When provided, the component becomes controlled. |
| `onExpandedChange` | `(expanded: boolean) => void` |  |  |  | types | Callback fired when the accordion's expanded state changes. |
| `disabled` | `boolean` |  | `false` |  | types | Whether the accordion is disabled. Default false, from the component source. |
| `children` | `React.ReactNode` |  |  |  | types | Content to display when the accordion is expanded (Figma Slot: 'content') |
| `modes` | `Modes` |  |  |  | types | Modes object passed to getVariableByName for all design tokens. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Optional container style overrides. |
| `accessibilityLabel` | `string` |  |  |  | types | Accessibility label for screen readers. If not provided, uses title. |
| `accessibilityHint` | `string` |  |  |  | types | Additional accessibility hint for screen readers. |
| `accessibilityState` | `AccessibilityState` |  |  |  | types | Additional accessibility state information. |
| `webAccessibilityProps` | `WebAccessibilityProps` |  |  |  | types | Web-specific accessibility props (only used on web platform) |
| `disableTruncation` | `boolean` |  |  |  | types | When `true`, disables text truncation: the trailing ellipsis (`…`) is never shown and any `numberOfLines` clamp is ignored, so the text wraps to as many lines as it needs even when horizontal space is tight. |
| `showHeader` ⚑ flagged (trace-check) | `boolean` |  | `true` |  | evidence (2026-09-21) | Developer-only: part of a sticky-header split, not a designer setting. Declared: When `false`, the header Pressable is omitted. Pair with a header-only Accordion (`showContent={false}`) when the host lifts the title into a sticky slot (e.g. `ScrollView` `stickyHeaderIndices`). Default true, from the component source. |
| `showContent` ⚑ flagged (trace-check) | `boolean` |  | `true` |  | evidence (2026-09-21) | Developer-only: part of a sticky-header split, not a designer setting. Declared: When `false`, the expandable content slot is omitted. Use to render a header-only Accordion for sticky layouts. Default true, from the component source. |
| `...React.ComponentProps<typeof View>` | `React.ComponentProps<typeof View>` |  |  |  | types | Inherited React Native props the component also accepts. They are not part of the design contract and no guide documents them. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Accordion States` | `mode collection` | Idle, Hover, Open, Open Hover, Disabled | `"Idle"` |  | types | A token collection Accordion reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. Package docs: Interaction states (Idle, Hover, Open, Disabled) are resolved automatically from `expanded`, `disabled`, hover, and `contained` — consumers should not pass `'Accordion States'` in `modes`. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types | Content to display when the accordion is expanded (Figma Slot: 'content') |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onExpandedChange` | `(expanded: boolean) => void` |  |  |  | types | Callback fired when the accordion's expanded state changes |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- Dark mode does not restyle the Accordion: its title, icon and header background resolve to the same values in Light and Dark, so the text stays black on a dark host. _(evidence, 2026-09-21)_ ⚑ flagged (trace-check)
- On the web the header does not expose aria-expanded, although Enter and Space toggle it. _(evidence, 2026-09-21)_ ⚑ flagged (trace-check)
- In the React Native Web preview, opening and closing is immediate, with no transition. _(evidence, 2026-09-21)_ ⚑ flagged (trace-check)

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/facts/props/14` · trace-check: Checked on jfs-components 0.1.60 (2026-09-21); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/props/15` · trace-check: Checked on jfs-components 0.1.60 (2026-09-21); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/gaps/0` · trace-check: Checked on jfs-components 0.1.60 (2026-09-21); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/gaps/1` · trace-check: Checked on jfs-components 0.1.60 (2026-09-21); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/gaps/2` · trace-check: Checked on jfs-components 0.1.60 (2026-09-21); the installed package is 0.1.78. Re-check before relying on it.
- `/accessibility` · trace-check: The guide gives no accessibility guidance; left empty rather than guessed.
