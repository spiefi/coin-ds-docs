# Divider

> Coin agent pack 0.1.78+5 (pilot). Generated from `components/divider.json`; the JSON is the source of truth.

- **State:** undocumented
- **Package:** jfs-components 0.1.78 · guide commit `none` · built 2026-10-29T00:02:25Z
- **Category:** layout (for discovery only, not a limit on composition) · **Tags:** 
- **Sources:** [guide](null) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-divider--docs)

Divider component that renders a horizontal or vertical separator line. This component is used to visually separate content sections. (Package docs; Coin has no designer guide for Divider.)

## Use when

_None in the guide._

## Avoid when

_None in the guide._

## Anatomy

_None in the guide._

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

_No slots._

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

### A horizontal separator between two sections.

```tsx
<Divider direction="horizontal" modes={{ 'Color Mode': 'Light' }} />
```

_From no source in the guide_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `direction` | `DividerDirection` | vertical, horizontal | `"horizontal"` |  | types | Direction of the divider line. - 'horizontal': renders a horizontal line (default) - 'vertical': renders a vertical line. Default "horizontal", from the component source. |
| `modes` | `Modes` |  |  |  | types | Mode configuration passed to the token resolver. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Optional style overrides for the divider. |
| `accessibilityLabel` | `string` |  |  |  | types | Accessibility label for the divider. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection Divider reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 10` | `mode collection` | Default, jioPlus | `"Default"` |  | types | A token collection Divider reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Profile Card Appearance` | `mode collection` | Default, Premium | `"Default"` |  | types | A token collection Divider reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

_No slots._

### Events

_No events._

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

_None recorded._

## Flags

_None._
