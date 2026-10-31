# Icon

> Coin agent pack 0.1.78+23 (pilot). Generated from `components/icon.json`; the JSON is the source of truth.

- **State:** undocumented
- **Package:** jfs-components 0.1.78 · guide commit `none` · built 2026-10-31T01:50:12Z
- **Category:** content (for discovery only, not a limit on composition) · **Tags:** 
- **Sources:** [guide](null) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-icon--docs)

Icon component — a design-token-driven wrapper around a single glyph. (Package docs; Coin has no designer guide for Icon.)

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

### A registry icon resolved through modes.

```tsx
<Icon iconName="ic_card" modes={{ 'Color Mode': 'Light' }} />
```

_From no source in the guide_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `iconName` | `string` |  |  |  | types | Built-in icon name from the registry, in the `ic_something` format (e.g. `'ic_card'`, `'ic_scan_qr_code'`). When omitted and no `source` or `children` slot is supplied, defaults to `'ic_card'` to match the Figma design's default glyph. |
| `source` | `UnifiedSource` |  |  |  | types | Unified fallback source rendered when `iconName` is missing or not in the registry. Accepts a remote URI, an inline SVG XML string, a `require()` asset, an SVG React component, or an already-rendered element. The media is tinted with the mode-resolved icon color so it follows design tokens just like a built-in icon. See {@link UnifiedSource}. |
| `children` | `React.ReactNode` |  |  |  | types | Icon slot. Render any node here (another `Icon`, a custom SVG component, etc.) and it takes precedence over `iconName`/`source`. `modes` cascade into the slotted children automatically. |
| `color` | `string` |  |  |  | types | Override the mode-resolved icon color. When omitted the value comes from the `icon/color` design token. |
| `size` | `number` |  |  |  | types | Override the mode-resolved icon size (in px). When omitted the value comes from the `icon/size` design token. |
| `modes` | `Modes` |  |  |  | types |  |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types |  |
| `...AccessibilityProps` | `AccessibilityProps` |  |  |  | types | Inherited React Native props the component also accepts. They are not part of the design contract and no guide documents them. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Primary"` |  | types | A token collection Icon reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `AppearanceSystem` | `mode collection` | positive, warning, negative | `"positive"` |  | types | A token collection Icon reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Badge Size` | `mode collection` | Medium, Small | `"Medium"` |  | types | A token collection Icon reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection Icon reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 10` | `mode collection` | Default, jioPlus | `"Default"` |  | types | A token collection Icon reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context4` | `mode collection` | Default, Chip, Button, Badge, Badge/glass | `"Default"` |  | types | A token collection Icon reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Emphasis` | `mode collection` | High, Medium, Low | `"High"` |  | types | A token collection Icon reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Icon Size` | `mode collection` | Medium, Small | `"Medium"` |  | types | A token collection Icon reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Profile Card Appearance` | `mode collection` | Default, Premium | `"Default"` |  | types | A token collection Icon reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Semantic Intent` | `mode collection` | Brand, System | `"Brand"` |  | types | A token collection Icon reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types | Icon slot. Render any node here (another `Icon`, a custom SVG component, etc.) and it takes precedence over `iconName`/`source`. `modes` cascade into the slotted children automatically. |

### Events

_No events._

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

_None recorded._

## Flags

_None._
