# ListGroup

> Coin agent pack 0.1.78+2 (pilot). Generated from `components/listgroup.json`; the JSON is the source of truth.

- **State:** undocumented
- **Package:** jfs-components 0.1.78 · guide commit `none` · built 2026-10-17T11:10:07Z
- **Category:** content (for discovery only, not a limit on composition) · **Tags:** 
- **Sources:** [guide](null) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-listgroup--docs)

ListGroup component that mirrors the Figma "List Group" component. (Package docs; Coin has no designer guide for ListGroup.)

## Use when

_None in the guide._

## Avoid when

_None in the guide._

## Anatomy

_None in the guide._

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `listGroupSlot` | `ReactNode` | types |
| `children` | `ReactNode` | types |

## Placement

_None in the guide._

## Configuration

_None in the guide._

## Content

_None in the guide._

## States

_None in the guide._

## Accessibility

_None in the guide._

## Do and don’t

_None in the guide._

## Examples

### A labelled group of list rows.

```tsx
<ListGroup label="Linked accounts" modes={{ 'Color Mode': 'Light' }}>
  <ListItem layout="Horizontal" title="Savings Account" supportText="HDFC Bank" modes={{ 'Color Mode': 'Light' }} />
</ListGroup>
```

_From no source in the guide_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `label` | `string` |  |  |  | types |  |
| `modes` | `Modes` |  |  |  | types |  |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types |  |
| `accessibilityLabel` | `string` |  |  |  | types |  |
| `accessibilityHint` | `string` |  |  |  | types |  |
| `disableTruncation` | `boolean` |  |  |  | types | When `true`, disables text truncation: the trailing ellipsis (`…`) is never shown and any `numberOfLines` clamp is ignored, so the text wraps to as many lines as it needs even when horizontal space is tight. |
| `listGroupSlot` | `React.ReactNode` |  |  |  | types |  |
| `children` | `React.ReactNode` |  |  |  | types |  |
| `data` | `undefined` |  |  |  | types |  |
| `keyExtractor` | `undefined` |  |  |  | types |  |
| `renderItem` | `undefined` |  |  |  | types |  |
| `onDragEnd` | `undefined` |  |  |  | types |  |
| `onDragUpdate` | `undefined` |  |  |  | types |  |
| `...ListGroupStaticProps | ListGroupReorderProps<T>` | `ListGroupStaticProps \| ListGroupReorderProps<T>` |  |  |  | types | Inherited React Native props the component also accepts. They are not part of the design contract and no guide documents them. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection ListGroup reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `List Item Style` | `mode collection` | Default, Boxed, Minimal | `"Default"` |  | types | A token collection ListGroup reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Title Level` | `mode collection` | Default, Bold | `"Default"` |  | types | A token collection ListGroup reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `listGroupSlot` | `React.ReactNode` |  |  |  | types |  |
| `children` | `React.ReactNode` |  |  |  | types |  |

### Events

_No events._

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

_None recorded._

## Flags

_None._
