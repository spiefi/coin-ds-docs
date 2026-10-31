# HStack

> Coin agent pack 0.1.78+27 (pilot). Generated from `components/hstack.json`; the JSON is the source of truth.

- **State:** flagged (5 flags, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `09a45da` · built 2026-10-31T05:18:28Z
- **Category:** layout (for discovery only, not a limit on composition) · **Tags:** horizontal stack, row, layout, auto layout, spacing
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=hstack) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=9243-2201) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-hstack--docs)

Use HStack for a row of related content. It owns horizontal rhythm, alignment, and optional wrapping while the host decides how much room the row has.

## Use when

- **recommended** A row of related content.  
  _From summary: “Use HStack for a row of related content.”_
- **recommended** Related actions and values that belong in one visual row.  
  _From corePrinciple: “Keep related actions and values in one visual row.”_
- **recommended** Items that belong to one row and should share a rhythm.  
  _From content: “Use HStack when items belong to one row and should share a rhythm.”_
- **recommended** A value, status and action that describe one decision.  
  _From inContext: “Pair a value, status, and action when they describe one decision.”_

## Avoid when

- **discouraged** Unrelated page sections: use a horizontal stack for related siblings.  
  _From inContext: “Use a horizontal stack for related siblings, not unrelated page sections.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Row direction | The children, arranged left to right; reverse changes the visual direction only, and DOM order stays the same. | yes | anatomy: “Children are arranged left to right. Reverse changes visual direction only; DOM order stays the same.” |
| Token gap | The Slot gap that sets the row's rhythm, owned by HStack rather than child margins. | yes | anatomy: “Use Slot gap to set rhythm. Keep spacing owned by HStack instead of adding child margins.” |
| Cross-axis alignment | The Figma variant named “Aligment”: Top Left maps to the top edge, and Left centers the row vertically. | yes | anatomy: “Figma exposes the variant named “Aligment”: Top Left maps to the top edge and Left centers the row vertically.” |
| Owner padding | The inset around the slot: Default supplies it; None when the surrounding owner already supplies that edge. | no | anatomy: “Default supplies the inset around the slot. Use None when the surrounding owner already supplies that edge.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `children` | `ReactNode` | types |

## Placement

- **recommended** Place the primitive where the relationship happens.  
  _From inContext: “Place the primitive where the relationship happens”_
- **recommended** HStack owns horizontal rhythm, alignment and optional wrapping; the host decides how much room the row has.  
  _From summary: “It owns horizontal rhythm, alignment, and optional wrapping while the host decides how much room the row has.”_
- **recommended** Populate public component slots with HStack instead of recreating child margins.  
  _From content: “Populate public component slots with HStack instead of recreating child margins.”_
- **recommended** Design the host relationship: make the container boundary and content order clear before changing gap or wrap.  
  _From states: “Make the container boundary and content order clear before changing gap or wrap.”_

## Configuration

- **recommended** `Slot gap`: Set the row's rhythm with Slot gap, XS through XL; the gap belongs to the HStack owner.  
  _From configuration: “Use XS through XL to set the rhythm of one row. The gap belongs to the HStack owner.”_
- **recommended** `Slot gap`: Keep spacing owned by HStack instead of adding child margins.  
  _From anatomy: “Keep spacing owned by HStack instead of adding child margins.”_
- **recommended** `Padding` = `None`: Use Padding None when the host already owns the edge; Default gives the row its component inset.  
  _From configuration: “Default gives the row its component inset. None is useful when the host already owns the edge.”_
- **discouraged** `Padding`: Do not stack component insets without a reason: nested owners can create an unintended double edge and weaken alignment.  
  _From doDont: “Nested owners can create an unintended double edge and weaken alignment.”_
- **recommended** `wrap` = `true`: Use wrap inside a constrained width: wrapping needs one.  
  _From configuration: “Wrapping needs a constrained width.”_
- **recommended** `wrap`: Let the available container decide when a wrapped row needs a second line.  
  _From corePrinciple: “Let the available container decide when a wrapped row needs a second line.”_
- **discouraged** Do not let the row's children spill out of the owner: a row without a width constraint can overflow and lose its relationship to the parent.  
  _From doDont: “A row without a width constraint can overflow and lose its relationship to the parent.”_
- **REQUIRED** `alignVertical` = `center`: To match Figma's Alignment Left, set alignVertical to center; the default, flex-start, is Figma's Top Left.  
  _From fact `/facts/props/1` (alignVertical, source evidence)_
- **recommended** `alignVertical`: Alignment changes the cross-axis position; it never changes row direction.  
  _From configuration: “Alignment changes the cross-axis position; it never changes row direction.”_
- **recommended** `alignVertical`: Use alignment to support the row, not to replace content hierarchy.  
  _From configuration: “Alignment supports the row; it does not replace content hierarchy.”_
- **recommended** Keep Color Mode and Stack Context consistent with the surrounding public component: HStack and its children inherit the selected Coin mode context.  
  _From configuration: “HStack and its children inherit the selected Coin mode context. Keep color mode and stack context consistent with the surrounding public component.”_

## Content

_None in the guide._

## States

| State | When | From |
| --- | --- | --- |
| Default | No mode changes: HStack uses its default direction and token rhythm. | states: “uses its default direction and token rhythm.” |
| Roomy rhythm | A larger Slot gap on the owner: the whole group's rhythm changes. | states: “Changing the owner gap changes the whole group.” |
| Host-owned edge | Padding None: a containing pattern owns the edge inset. | states: “None lets a containing pattern own the edge inset.” |
| Constrained host | wrap set and the host supplies a width constraint: wrapping appears. | states: “Wrapping appears when the host supplies a constraint.” |

## Accessibility

- **recommended** `reverse`: Keep the children's order meaningful: reverse changes visual order while assistive technology still follows the DOM order.  
  _From content: “Reverse changes visual order while assistive technology still follows the DOM order.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Wrap inside a real width boundary | Let children spill out of the owner | A row without a width constraint can overflow and lose its relationship to the parent. |
| Let the host own the edge inset | Stack component insets without a reason | Nested owners can create an unintended double edge and weaken alignment. |

## Examples

### A value, its status and the action for one decision, centered on the cross axis.

```tsx
<HStack alignVertical="center" modes={{ 'Color Mode': 'Light' }}>
  <Text text="₹2,499" modes={{ 'Color Mode': 'Light' }} />
  <Badge label="Due today" modes={{ 'Color Mode': 'Light' }} />
  <Button label="Pay" onPress={() => {}} modes={{ 'Color Mode': 'Light' }} />
</HStack>
```

_From inContext: “Pair a value, status, and action when they describe one decision.”_

### A row that wraps inside a bounded width.

```tsx
<HStack wrap style={{ width: 150 }} modes={{ 'Color Mode': 'Light' }}>
  <Badge label="Paid" modes={{ 'Color Mode': 'Light' }} />
  <Badge label="Due today" modes={{ 'Color Mode': 'Light' }} />
  <Badge label="New" modes={{ 'Color Mode': 'Light' }} />
</HStack>
```

_From sizing: “HStack can wrap when its width is constrained.”_

### A row with Padding None inside a VStack that owns the edge inset.

```tsx
<VStack modes={{ 'Color Mode': 'Light' }}>
  <HStack justifyHorizontal="space-between" modes={{ 'Color Mode': 'Light', Padding: 'None' }}>
    <Text text="Amount" modes={{ 'Color Mode': 'Light', Padding: 'None' }} />
    <Text text="₹2,499" modes={{ 'Color Mode': 'Light', Padding: 'None' }} />
  </HStack>
</VStack>
```

_From configuration: “None is useful when the host already owns the edge.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types | The content to display inside the stack. |
| `alignVertical` ⚑ flagged (trace-check) | `ViewStyle['alignItems']` | center, flex-start, flex-end, stretch, baseline |  |  | evidence (2026-09-19) | Figma's variant is spelled Aligment; Top Left is the default and maps to top alignment, while Left centers the row. Declared: Alignment of children along the cross axis (vertical for HStack). Maps to alignItems. Defaults to `flex-start` (Figma Alignment=Top Left). Pass `center` for Figma Alignment=Left. This is a layout prop, not a Figma variant. |
| `justifyHorizontal` | `ViewStyle['justifyContent']` | center, flex-start, flex-end, space-between, space-around, space-evenly |  |  | types | Justification of children along the main axis (horizontal for HStack). Maps to justifyContent. Defaults to `flex-start`. |
| `wrap` ⚑ flagged (trace-check) | `boolean \| 'wrap' \| 'nowrap' \| 'wrap-reverse'` |  |  |  | evidence (2026-09-19) | Wrapping needs a constrained width. Declared: Controls whether children can wrap. Maps to flexWrap. |
| `reverse` ⚑ flagged (trace-check) | `boolean` |  | `false` |  | evidence (2026-09-19) | Reverses the visual direction. Declared: If true, reverses the direction of the stack (row-reverse). Default false, from the component source. |
| `as` | `any` |  |  |  | types | Prop for web semantics, often mapped to HTML tags. |
| `modes` | `Modes` |  |  |  | types | Modes object to override default variable values. |
| `...ViewProps` | `ViewProps` |  |  |  | types | Inherited React Native props the component also accepts. They are not part of the design contract and no guide documents them. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Background` | `mode collection` | False, True | `"False"` |  | types | A token collection HStack reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection HStack reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context` | `mode collection` | Default, Nudge&Alert, CTACard, ListItem | `"Default"` |  | types | A token collection HStack reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Padding` | `mode collection` | Default, None | `"Default"` |  | types | A token collection HStack reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection HStack reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Slot gap` | `mode collection` | S, M, L, XL, XS | `"S"` |  | types | A token collection HStack reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Stack Context` | `mode collection` | Root, Nested | `"Root"` |  | types | A token collection HStack reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types | The content to display inside the stack. |

### Events

_No events._

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- HStack has no equalHeight control. _(evidence, 2026-09-19)_ ⚑ flagged (trace-check)

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/facts/props/1` · trace-check: Checked on jfs-components 0.1.60 (2026-09-19); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/props/3` · trace-check: Checked on jfs-components 0.1.60 (2026-09-19); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/props/4` · trace-check: Checked on jfs-components 0.1.60 (2026-09-19); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/gaps/0` · trace-check: Checked on jfs-components 0.1.60 (2026-09-19); the installed package is 0.1.78. Re-check before relying on it.
- `/content/rules` · trace-check: The guide gives no content rules; left empty rather than guessed.
