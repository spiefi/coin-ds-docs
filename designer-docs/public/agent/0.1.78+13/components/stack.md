# Stack

> Coin agent pack 0.1.78+13 (pilot). Generated from `components/stack.json`; the JSON is the source of truth.

- **State:** flagged (6 flags, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `09a45da` · built 2026-10-29T05:05:58Z
- **Category:** layout (for discovery only, not a limit on composition) · **Tags:** layout, spacing, gap, slot, auto layout
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=stack) · [Figma](https://www.figma.com/design/dSlK8ueQ7wlbyUSZd4f8QO/Coin-Subcomponents?node-id=279-3) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-stack--docs)

Use Stack when a public component slot needs one token-driven gap and an intentional vertical or horizontal direction.

## Use when

- **recommended** A public component's slot needs one token-driven gap and an intentional vertical or horizontal direction.  
  _From summary: “Use Stack when a public component slot needs one token-driven gap and an intentional vertical or horizontal direction.”_
- **recommended** A clear group, such as actions, metadata or supporting copy.  
  _From content: “Use Stack for a clear group such as actions, metadata, or supporting copy.”_

## Avoid when

- **discouraged** A catch-all page canvas for unrelated sections: Stack has no wrap, padding or overlap.  
  _From doDont: “Stack has no wrap, padding, or overlap semantics for unrelated sections.”_
- **discouraged** The layout needs overlap, z-order, wrapping, padding or automatic viewport switching: use the public component that owns the slot.  
  _From states: “Stack does not add overlap, z-order, wrapping, padding, or automatic viewport switching. Use the public component that owns the slot.”_
- **discouraged** `layoutDirection`: Expecting the direction to follow the viewport: the viewport does not switch layoutDirection; choose a different public composition when the content role changes.  
  _From sizing: “Choose a different public composition when the content role changes; the viewport does not switch layoutDirection for you.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Direction | layoutDirection, vertical or horizontal; vertical by default. | yes | anatomy: “Set layoutDirection to vertical or horizontal. The default is vertical.” |
| Token gap | The Slot gap between children; Stack has no padding, wrap or reverse control. | yes | anatomy: “Slot gap provides repeated separation. Stack has no padding, wrap, or reverse control.” |
| Cross-axis fit | Optional fillWidth (vertical) or equalHeight (horizontal); fixed child dimensions still win. | no | anatomy: “fillWidth makes these vertical children share the host edge. Fixed child dimensions still win.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `children` | `ReactNode` | types |

## Placement

- **recommended** Use Stack in the slot owned by a public component, where direction and gap carry product meaning.  
  _From inContext: “Use Stack in the slot owned by a public component, where direction and gap carry product meaning.”_
- **recommended** Let the owning public component, such as ActionFooter, give the Stack its product meaning.  
  _From inContext: “A public ActionFooter or related component gives this primitive its product meaning.”_
- **recommended** Designers consume public components and patterns that own the slot; Stack's Figma source is a Subcomponents anatomy reference, not something to place on its own.  
  _From configuration: “The Figma source is a Coin Subcomponents anatomy reference, so designers should consume public components and patterns that own the slot.”_
- **recommended** Stack keeps its chosen direction at every width; responsive intent belongs to the owning public composition.  
  _From sizing: “Stack keeps its chosen direction at every width. Responsive intent belongs to the owning public composition.”_

## Configuration

- **recommended** `layoutDirection` = `vertical`: Use layoutDirection vertical (the default) for a column of actions or supporting content inside a public slot.  
  _From configuration: “Use the default direction for a column of actions or supporting content inside a public slot.”_
- **recommended** `layoutDirection` = `horizontal`: Use layoutDirection horizontal when sibling actions or content belong on one line; set the direction explicitly.  
  _From configuration: “Use a row when sibling actions or content belong on one line. Direction is explicit.”_
- **recommended** `layoutDirection`: Choose the direction from the content role; it stays fixed through viewport changes.  
  _From corePrinciple: “Choose direction from the content role. Stack stays direction-locked; it does not switch because the viewport changed.”_
- **recommended** `Slot gap`: Set the gap with the Slot gap mode; Stack has no padding, wrap or reverse control.  
  _From anatomy: “Slot gap provides repeated separation. Stack has no padding, wrap, or reverse control.”_
- **recommended** `equalHeight` = `true`: Use equalHeight only for a horizontal row, the direction it applies to.  
  _From configuration: “Use only for the active direction”_
- **recommended** `fillWidth` = `true`: Use fillWidth for a vertical column when its children benefit from a shared edge.  
  _From content: “Use equalHeight for a row or fillWidth for a column when the content benefits from shared edges.”_
- **discouraged** `fillWidth`: Do not give children a fixed width when a fillWidth column should fill: fixed child dimensions still win.  
  _From doDont: “Fixed child dimensions still win, so the column edge no longer aligns.”_

## Content

_None in the guide._

## States

| State | When | From |
| --- | --- | --- |
| Vertical | layoutDirection vertical (default): a column for grouped slot content. | states: “Default column direction for grouped slot content.” |
| Horizontal | layoutDirection horizontal: an explicit row for sibling content. | states: “Explicit row direction for sibling content.” |
| Equal height | equalHeight in a row: children share the tallest height when they can stretch. | states: “Horizontal children share the tallest height when they can stretch.” |
| Fill width | fillWidth in a column: children stretch across the stack when they can. | states: “Vertical children stretch across the stack when they can.” |

## Accessibility

_None in the guide._

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Let a vertical slot fill its width | Fix child widths when the column should fill | Fixed child dimensions still win, so the column edge no longer aligns. |
| Use fill width when column edges should align | Use Stack as a catch-all page canvas | Stack has no wrap, padding, or overlap semantics for unrelated sections. |

## Examples

### A vertical Stack in ActionFooter's slot: the action under its supporting copy.

```tsx
<ActionFooter modes={{ 'Color Mode': 'Light' }}>
  <Stack layoutDirection="vertical" fillWidth modes={{ 'Color Mode': 'Light', 'Slot gap': 'S' }}>
    <Text text="You can change your plan at any time." modes={{ 'Color Mode': 'Light' }} />
    <Button label="Continue" onPress={() => {}} modes={{ 'Color Mode': 'Light' }} />
  </Stack>
</ActionFooter>
```

_From inContext: “Use a vertical Stack when actions belong under supporting copy.”_

### A deliberate row of actions that share an edge.

```tsx
<Stack layoutDirection="horizontal" equalHeight modes={{ 'Color Mode': 'Light', 'Slot gap': 'M' }}>
  <Button label="Back" onPress={() => {}} modes={{ 'Color Mode': 'Light', Emphasis: 'Low', AppearanceBrand: 'Neutral' }} />
  <Button label="Continue" onPress={() => {}} modes={{ 'Color Mode': 'Light', Emphasis: 'High' }} />
</Stack>
```

_From inContext: “Use horizontal direction when actions are a deliberate row.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types | Content laid out inside the stack. `modes` are cascaded to every child via {@link cloneChildrenWithModes}. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types |  |
| `layoutDirection` ⚑ flagged (trace-check) | `StackLayoutDirection` | vertical, horizontal | `"vertical"` |  | evidence (2026-09-19) | vertical or horizontal, default vertical; the direction never switches on its own. Declared: Main-axis direction for stack children. Matches the Figma Slot variant: - `vertical` (default): stacks children in a column - `horizontal`: arranges children in a row. Default "vertical", from the component source. |
| `alignCrossAxis` | `ViewStyle['alignItems']` | center, flex-start, flex-end, stretch, baseline |  |  | types | Alignment along the cross axis. Defaults to `stretch` for vertical and `flex-start` for horizontal (Figma Alignment=Top Left). Pass `center` for Figma Alignment=Left. This is a layout prop, not a Figma variant. |
| `justifyMainAxis` | `ViewStyle['justifyContent']` | center, flex-start, flex-end, space-between, space-around, space-evenly |  |  | types | Distribution along the main axis (maps to `justifyContent`). Defaults to `flex-start`. |
| `equalHeight` ⚑ flagged (trace-check) | `boolean` |  | `false` |  | evidence (2026-09-19) | Stretches a row's children to the tallest; a fixed child dimension still wins over the stretch. Declared: Only meaningful when `layoutDirection` is `horizontal`. When true, forces every child to share the height of the tallest child. The height is enforced by the stack itself (`alignItems: 'stretch'` plus an injected `alignSelf: 'stretch'` on each child), so children can no longer opt out via their own `alignSelf`. Children with an explicit `height` keep that height, since a fixed cross-axis dimension defeats stretch in Yoga. Overrides `alignCrossAxis` when it applies. Default false, from the component source. |
| `fillWidth` ⚑ flagged (trace-check) | `boolean` |  | `false` |  | evidence (2026-09-19) | Stretches a column's children; a fixed child dimension still wins over the stretch. Declared: Only meaningful when `layoutDirection` is `vertical`. When true, forces every child to fill the full width of the stack. The width is enforced by the stack itself (`alignItems: 'stretch'` plus an injected `alignSelf: 'stretch'` on each child), so children can no longer opt out via their own `alignSelf`. Children with an explicit `width` keep that width, since a fixed cross-axis dimension defeats stretch in Yoga. Overrides `alignCrossAxis` when it applies. Default false, from the component source. |
| `modes` | `Modes` |  |  |  | types | Mode configuration passed to the token resolver and cascaded to children. |
| `...ViewProps` | `ViewProps` |  |  |  | types | Inherited React Native props the component also accepts. They are not part of the design contract and no guide documents them. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Context` | `mode collection` | Default, Nudge&Alert, CTACard, ListItem | `"Default"` |  | types | A token collection Stack reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Slot gap` | `mode collection` | S, M, L, XL, XS | `"S"` |  | types | A token collection Stack reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types | Content laid out inside the stack. `modes` are cascaded to every child via {@link cloneChildrenWithModes}. |

### Events

_No events._

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- Stack has no wrap, reverse, padding, overlap or automatic viewport direction. _(evidence, 2026-09-19)_ ⚑ flagged (trace-check)

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/facts/props/2` · trace-check: Checked on jfs-components 0.1.60 (2026-09-19); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/props/6` · trace-check: Checked on jfs-components 0.1.60 (2026-09-19); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/props/5` · trace-check: Checked on jfs-components 0.1.60 (2026-09-19); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/gaps/0` · trace-check: Checked on jfs-components 0.1.60 (2026-09-19); the installed package is 0.1.78. Re-check before relying on it.
- `/accessibility` · trace-check: The guide gives no accessibility guidance; left empty rather than guessed.
- `/content/rules` · trace-check: The guide gives no content rules; left empty rather than guessed.
