# Attached

> Coin agent pack 0.1.78+15 (pilot). Generated from `components/attached.json`; the JSON is the source of truth.

- **State:** flagged (2 flags, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `4e470cf` · built 2026-10-29T07:47:24Z
- **Category:** content (for discovery only, not a limit on composition) · **Tags:** corner badge, overlay badge, indicator
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=attached) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4477-471) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-attached--docs)

Add a subordinate signal to a main item without altering its footprint.

## Use when

- **recommended** Add a subordinate signal to a main item without altering its footprint.  
  _From summary: “Add a subordinate signal to a main item without altering its footprint.”_
- **recommended** Keep a small qualifier, such as a payment type or status, attached to the item it describes.  
  _From content: “The badge adds a small qualification such as payment type or status while the central mark remains easy to recognize.”_

## Avoid when

- **discouraged** The extra signal is the item's primary label or would become a second focal point: the badge stays subordinate to the main item.  
  _From content: “The badge should not carry the primary label or become a second focal point.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Main bounds | The child in the main slot (children): it establishes the size and is the visual object people identify first. | no | anatomy: “The child in the main slot establishes the size and the visual object people identify first.” |
| Attachment | The badge slot: centred on the selected anchor, so it can straddle the main edge. | no | anatomy: “The badge slot is centered on the selected anchor and can straddle the main edge.” |
| Anchor / ring | Position chooses one of nine anchors; the token ring around the badge separates the compact signal from the main mark. | no | anatomy: “Position chooses one of nine anchors; the token ring separates a compact signal from the main mark.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `children` | `ReactNode` | types |
| `badge` | `ReactNode` | types |

## Placement

- **recommended** The main child owns its size and Attached does not grow the layout footprint for the badge, so give its host enough whitespace for the overhang.  
  _From sizing: “Attached does not grow the layout footprint for the badge, so its host needs enough whitespace for the overhang.”_
- **recommended** Leave slack around the composition so the badge can straddle the edge.  
  _From doDont: “Leave slack around the composition so the badge can straddle the edge.”_
- **discouraged** Do not clip the host with overflow hidden: the badge overhangs the main bounds and is visibly cut off.  
  _From doDont: “Overflow hidden turns a positioning choice into a visibly cut-off signal.”_
- **recommended** Keep the qualifier next to the item it describes, as in a payment row.  
  _From inContext: “A payment row keeps the qualifier next to the item it describes.”_

## Configuration

- **recommended** `position`: Use the position choices for where the badge belongs.  
  _From configuration: “Use the exposed position choices for where the badge belongs.”_
- **recommended** `position`: Use an edge or corner anchor when the badge describes the item, such as the default bottom-right.  
  _From configuration: “Use edge or corner anchors when the badge describes the item.”_
- **discouraged** `position` = `center`: Avoid the center anchor unless the overlay is deliberate: a centred badge covers the main mark.  
  _From configuration: “A center anchor is reserved for a deliberate overlay.”_
- **recommended** `circular`: For a diagonal (corner) anchor, choose whether it sits on the round child’s edge or on its bounding-box corner.  
  _From configuration: “For diagonal anchors, choose the round child’s edge or its bounding-box corner.”_
- **recommended** `circular` = `true`: Circle edge, circular true (the default), for round marks such as a circular IconCapsule: corner anchors sit on the circle.  
  _From configuration: “use Circle edge for round marks and Bounding box for a square corner relationship.”_
- **recommended** `circular` = `false`: Bounding box, circular false, for a square corner relationship: corner anchors sit on the bounding-box corners.  
  _From configuration: “use Circle edge for round marks and Bounding box for a square corner relationship.”_
- **recommended** Size IconCapsule children with their Icon Capsule Size modes, not style dimensions, so they keep their circular geometry: the guide uses M for the main item and XS for the badge.  
  _From sources: “this guide uses the native Icon Capsule Size modes M and XS so both child capsules keep their component-owned circular geometry.”_

## Content

- **recommended** Let the attachment support the item, not obscure it.  
  _From corePrinciple: “Attachment supports the item, never obscures it.”_
- **recommended** Use a compact, meaningful signal that clarifies the main item.  
  _From content: “Use a compact, meaningful signal that clarifies the main item.”_
- **recommended** Make the main item readable first: the badge adds a small qualification, such as payment type or status, while the central mark stays easy to recognise.  
  _From content: “The badge adds a small qualification such as payment type or status while the central mark remains easy to recognize.”_
- **recommended** Choose a familiar icon or small signal that people can understand at a glance.  
  _From content: “Choose a familiar icon or small signal that people can understand at a glance.”_
- **discouraged** Do not make the badge compete with the main item: an oversized attachment pulls focus away from it.  
  _From doDont: “An oversized attachment pulls focus away from the main item.”_

## States

| State | When | From |
| --- | --- | --- |
| No state of its own | Attached has no loading or disabled state of its own; show whether a supporting signal is present through its children. | states: “Attached has no loading or disabled state of its own.” |
| Badge present | The secondary signal remains visible while the main item keeps its own identity. | states: “The secondary signal remains visible while the main item keeps its own identity.” |
| Badge absent | Use the same composition, with no badge, when there is no subordinate status or action to show. | states: “Use the same composition when there is no subordinate status or action to show.” |

## Accessibility

_None in the guide._

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Keep the center clear | Cover the main mark | A centered badge obscures the item it is meant to qualify. |
| Allow the overhang | Clip the host | Overflow hidden turns a positioning choice into a visibly cut-off signal. |
| Keep the badge compact | Make the badge compete | An oversized attachment pulls focus away from the main item. |

## Examples

### The guide's composition: a main IconCapsule at its default size with a compact IconCapsule badge (Icon Capsule Size XS) on the default bottom-right anchor, projected onto the circle's edge.

```tsx
<Attached badge={<IconCapsule iconName="ic_rupee" modes={{ 'Icon Capsule Size': 'XS' }} />}>
  <IconCapsule iconName="ic_cart" />
</Attached>
```

_From sources: “this guide uses the native Icon Capsule Size modes M and XS so both child capsules keep their component-owned circular geometry.”_

### The guide's In context: a payment row keeps the qualifier next to the item it describes, with Attached as the row's leading item.

```tsx
<ListItem
  layout="Horizontal"
  title="Card payment"
  supportText="Today · Food"
  navArrow={false}
  leading={
    <Attached badge={<IconCapsule iconName="ic_rupee" modes={{ 'Icon Capsule Size': 'XS' }} />}>
      <IconCapsule iconName="ic_cart" />
    </Attached>
  }
/>
```

_From inContext: “A payment row keeps the qualifier next to the item it describes.”_

### Badge absent, the guide's States: the same composition with no badge when there is no subordinate status to show.

```tsx
<Attached>
  <IconCapsule iconName="ic_cart" />
</Attached>
```

_From states: “Use the same composition when there is no subordinate status or action to show.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types |  |
| `children` | `React.ReactNode` |  |  |  | types | Main content the badge attaches to (the Figma "main slot"). Any node — typically an `IconCapsule`, `Avatar`, image, etc. `modes` are cascaded to every child via {@link cloneChildrenWithModes}. |
| `badge` | `React.ReactNode` |  |  |  | types | The element attached on top of `children` (the Figma "slot"). Centered on the anchor point given by `position` so it straddles the edge/corner. `modes` are cascaded into it as well. |
| `badgeSize` | `number` |  |  |  | types | Enforces a fixed square size (in px) on the `badge` slot, regardless of what node is passed. The badge is wrapped in a box of `badgeSize × badgeSize` with `overflow: 'hidden'`, and the badge content is stretched to fill it. Use this to guarantee the design-token size even when a consumer drops in an arbitrary node (e.g. an `Image`) whose intrinsic size/aspect-ratio would otherwise win. When omitted, the badge keeps its own intrinsic size (legacy behavior). |
| `badgeRadius` | `number` |  |  |  | types | Corner radius used to clip the `badge` box. Only applies when `badgeSize` is set. Anything that overflows the rounded box (e.g. a non-square image) is clipped. |
| `position` | `AttachedPosition` | center, left, right, top, bottom, top-left, top-right, bottom-left, bottom-right | `"bottom-right"` |  | types | Anchor point for the `badge` relative to the main content. Default "bottom-right", from the component source. |
| `circular` | `boolean` |  | `true` |  | types | How the anchor point is computed for diagonal (corner) positions: - `true` (default): treat the main content as a **circle** inscribed in its bounding box — corner anchors sit on the circle's circumference (the 45° point), so badges hug round content like a circular `IconCapsule` or `Avatar`. - `false`: treat the main content as a **square** — corner anchors sit on the bounding-box corners. Edge (`top`/`bottom`/`left`/`right`) and `center` anchors are unaffected, since the circle meets the bounding box at those points. Default true, from the component source. |
| `modes` | `Modes` |  |  |  | types | Mode configuration cascaded to the token resolver and all children. |
| `...Omit<ViewProps, 'children'>` | `Omit<ViewProps, 'children'>` |  |  |  | types | Inherited React Native props the component also accepts. They are not part of the design contract and no guide documents them. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Attached Border` | `mode collection` | True, False | `"True"` |  | types | A token collection Attached reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection Attached reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types | Main content the badge attaches to (the Figma "main slot"). Any node — typically an `IconCapsule`, `Avatar`, image, etc. `modes` are cascaded to every child via {@link cloneChildrenWithModes}. |
| `badge` | `React.ReactNode` |  |  |  | types | The element attached on top of `children` (the Figma "slot"). Centered on the anchor point given by `position` so it straddles the edge/corner. `modes` are cascaded into it as well. |

### Events

_No events._

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

_None recorded._

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/accessibility` · trace-check: The guide gives no accessibility guidance; left empty rather than guessed.
- `(whole entry)` · trace-check: The cross-check reviewed an earlier version of this entry. Run npm run agent-pack:cross-check -- attached.
