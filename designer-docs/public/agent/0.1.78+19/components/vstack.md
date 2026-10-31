# VStack

> Coin agent pack 0.1.78+19 (pilot). Generated from `components/vstack.json`; the JSON is the source of truth.

- **State:** flagged (6 flags, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `09a45da` · built 2026-10-30T12:30:13Z
- **Category:** layout (for discovery only, not a limit on composition) · **Tags:** vertical stack, column, layout, auto layout, spacing
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=vstack) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2841-190) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-vstack--docs)

Use VStack for page flow, grouped details, and ordered content. Its children follow token-driven spacing and padding while the host supplies the available height.

## Use when

- **recommended** Page flow, grouped details and ordered content.  
  _From summary: “Use VStack for page flow, grouped details, and ordered content.”_
- **recommended** One coherent vertical group, from heading through supporting detail and next step.  
  _From inContext: “Use VStack for one coherent vertical group, from heading through supporting detail and next step.”_
- **recommended** Sequence, grouping and supporting detail should be easy to scan in a column.  
  _From content: “Use the column to make sequence, grouping, and supporting detail easy to scan.”_

## Avoid when

- **discouraged** Separating unrelated sections with a giant gap: spacing cannot repair a missing grouping boundary or unclear content hierarchy.  
  _From doDont: “Spacing cannot repair a missing grouping boundary or unclear content hierarchy.”_
- **discouraged** A responsive grid: a constrained height can let wrapped children flow into columns, but that does not turn VStack into a responsive grid.  
  _From corePrinciple: “A constrained height can let wrapped children flow into columns; it does not turn VStack into a responsive grid.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Column direction | The children in vertical page-flow order; reverse is available when the content order genuinely needs it. | yes | anatomy: “Children follow a vertical page-flow order. Reverse is available when the content order genuinely needs it.” |
| Token gap | The Slot gap: the repeated rhythm between children, which stays consistent as content grows. | yes | anatomy: “Slot gap sets the repeated rhythm between children and remains consistent as content grows.” |
| Cross-axis edge | The owner's cross-axis edge that direct children share; with wrap, children flow into a new column only inside a height boundary. | yes | anatomy: “Direct children share the owner’s cross-axis edge, while wrap flows into a new column only inside a height boundary.” |
| Padding | The inset, Default or None, from the Padding mode; not recreated with local wrappers. | yes | anatomy: “Default or None comes from the component mode. Do not recreate its inset with local wrappers.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `children` | `ReactNode` | types |

## Placement

- **recommended** Place the primitive where the relationship happens.  
  _From inContext: “Place the primitive where the relationship happens”_
- **recommended** Children follow token-driven spacing and padding; the host supplies the available height.  
  _From summary: “Its children follow token-driven spacing and padding while the host supplies the available height.”_
- **recommended** Place related content in one slot so spacing stays contiguous as items change.  
  _From content: “Place related content in one slot so spacing stays contiguous as items change.”_
- **recommended** Design the host relationship: make the container boundary and content order clear before changing gap or wrap.  
  _From states: “Make the container boundary and content order clear before changing gap or wrap.”_
- **recommended** `Padding` = `None`: A nested group can use Padding None when the surrounding section owns the inset.  
  _From inContext: “A nested group can use None when the surrounding section owns the inset.”_

## Configuration

- **recommended** `Slot gap`: Set Slot gap to the token rhythm that matches the surrounding hierarchy; do not tune each child independently.  
  _From configuration: “Use the token rhythm that matches the surrounding hierarchy. Do not tune each child independently.”_
- **recommended** `Padding` = `None`: Choose Padding None when a containing pattern already supplies the page inset; Default and None are owner modes.  
  _From configuration: “Default and None are owner modes. Choose None when a containing pattern already supplies the page inset.”_
- **discouraged** `Padding`: Do not recreate the Padding inset with local wrappers.  
  _From anatomy: “Do not recreate its inset with local wrappers.”_
- **recommended** `Padding`: Set Default or None padding once; avoid stacked insets from nested owners.  
  _From content: “Use Default or None padding once. Avoid stacked insets from nested owners.”_
- **recommended** `wrap` = `true`: Use wrap only when the host has a real height boundary and columns are meaningful.  
  _From content: “Only use wrap when the host has a real height boundary and columns are meaningful.”_
- **discouraged** `wrap`: Do not expect width to make columns: VStack wraps into columns only when its height is constrained.  
  _From sizing: “VStack wraps into columns only when its height is constrained. Width alone does not make columns.”_
- **recommended** `reverse` = `true`: Use reverse when the content order genuinely needs it.  
  _From anatomy: “Reverse is available when the content order genuinely needs it.”_
- **recommended** `alignHorizontal`: alignHorizontal defaults to stretch (Figma's Slot fill-width); pass flex-start for Top Left or center for Top.  
  _From fact `/facts/props/1` (alignHorizontal, source evidence)_

## Content

_None in the guide._

## States

| State | When | From |
| --- | --- | --- |
| Default | No mode changes: VStack uses its default direction and token rhythm. | states: “uses its default direction and token rhythm.” |
| Roomy rhythm | A larger Slot gap on the owner: the whole group's rhythm changes. | states: “Changing the owner gap changes the whole group.” |
| Host-owned edge | Padding None: a containing pattern owns the edge inset. | states: “None lets a containing pattern own the edge inset.” |
| Constrained host | wrap set and the host supplies a height constraint: wrapping appears. | states: “Wrapping appears when the host supplies a constraint.” |

## Accessibility

_None in the guide._

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Keep one coherent group together | Use a giant gap to separate unrelated sections | Spacing cannot repair a missing grouping boundary or unclear content hierarchy. |
| Use None when the section owns the inset | Stack component insets without a reason | Nested owners can create an unintended double edge and weaken alignment. |

## Examples

### One page flow: a heading, supporting copy and the next step in sequence.

```tsx
<VStack modes={{ 'Color Mode': 'Light' }}>
  <Title title="Payment summary" subtitle="Review before confirming" modes={{ 'Color Mode': 'Light' }} />
  <Text text="Your payment is due today." modes={{ 'Color Mode': 'Light' }} />
  <Button label="Continue" onPress={() => {}} modes={{ 'Color Mode': 'Light' }} />
</VStack>
```

_From inContext: “Group a heading, supporting copy, and next step in a clear sequence.”_

### A nested group with Padding None inside a section that owns the inset.

```tsx
<VStack modes={{ 'Color Mode': 'Light' }}>
  <Title title="Payment summary" modes={{ 'Color Mode': 'Light' }} />
  <VStack modes={{ 'Color Mode': 'Light', Padding: 'None' }}>
    <Text text="To: Electricity bill" modes={{ 'Color Mode': 'Light' }} />
    <Text text="Amount: ₹2,499" modes={{ 'Color Mode': 'Light' }} />
  </VStack>
</VStack>
```

_From inContext: “A nested group can use None when the surrounding section owns the inset.”_

### Wrap into columns inside a bounded height.

```tsx
<VStack wrap style={{ height: 92 }} modes={{ 'Color Mode': 'Light' }}>
  <Badge label="Paid" modes={{ 'Color Mode': 'Light' }} />
  <Badge label="Due today" modes={{ 'Color Mode': 'Light' }} />
  <Badge label="New" modes={{ 'Color Mode': 'Light' }} />
</VStack>
```

_From sizing: “VStack wraps into columns only when its height is constrained.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types | The content to display inside the stack. |
| `alignHorizontal` ⚑ flagged (trace-check) | `ViewStyle['alignItems']` | center, flex-start, flex-end, stretch, baseline |  |  | evidence (2026-09-19) | Defaults to stretch. The inspected Figma VStack exposes Slot only, with no Alignment property. Declared: Alignment of children along the cross axis (horizontal for VStack). Maps to alignItems. Defaults to `stretch` (Figma Slot fill-width). Pass `flex-start` for Top Left or `center` for Top. This is a layout prop, not a Figma variant. |
| `justifyVertical` | `ViewStyle['justifyContent']` | center, flex-start, flex-end, space-between, space-around, space-evenly |  |  | types | Justification of children along the main axis (vertical for VStack). Maps to justifyContent. Defaults to `flex-start`. |
| `wrap` ⚑ flagged (trace-check) | `boolean \| 'wrap' \| 'nowrap' \| 'wrap-reverse'` |  |  |  | evidence (2026-09-19) | Wrapping needs a constrained height; wrapped children flow into columns. Declared: Controls whether children can wrap. Maps to flexWrap. |
| `reverse` ⚑ flagged (trace-check) | `boolean` |  | `false` |  | evidence (2026-09-19) | Reverses the visual direction. Declared: If true, reverses the direction of the stack (column-reverse). Default false, from the component source. |
| `as` | `any` |  |  |  | types | Prop for web semantics, often mapped to HTML tags. |
| `modes` | `Modes` |  |  |  | types | Modes object to override default variable values. |
| `...ViewProps` | `ViewProps` |  |  |  | types | Inherited React Native props the component also accepts. They are not part of the design contract and no guide documents them. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Background` | `mode collection` | False, True | `"False"` |  | types | A token collection VStack reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection VStack reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context` | `mode collection` | Default, Nudge&Alert, CTACard, ListItem | `"Default"` |  | types | A token collection VStack reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Padding` | `mode collection` | Default, None | `"Default"` |  | types | A token collection VStack reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection VStack reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Slot gap` | `mode collection` | S, M, L, XL, XS | `"S"` |  | types | A token collection VStack reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Stack Context` | `mode collection` | Root, Nested | `"Root"` |  | types | A token collection VStack reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types | The content to display inside the stack. |

### Events

_No events._

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- The Figma VStack exposes Slot only, with no Alignment property, so code's cross-axis alignment has no Figma counterpart. _(evidence, 2026-09-19)_ ⚑ flagged (trace-check)

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/facts/props/3` · trace-check: Checked on jfs-components 0.1.60 (2026-09-19); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/props/1` · trace-check: Checked on jfs-components 0.1.60 (2026-09-19); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/props/4` · trace-check: Checked on jfs-components 0.1.60 (2026-09-19); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/gaps/0` · trace-check: Checked on jfs-components 0.1.60 (2026-09-19); the installed package is 0.1.78. Re-check before relying on it.
- `/accessibility` · trace-check: The guide gives no accessibility guidance; left empty rather than guessed.
- `/content/rules` · trace-check: The guide gives no content rules; left empty rather than guessed.
