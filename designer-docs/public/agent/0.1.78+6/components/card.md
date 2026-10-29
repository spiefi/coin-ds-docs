# Card

> Coin agent pack 0.1.78+6 (pilot). Generated from `components/card.json`; the JSON is the source of truth.

- **State:** undocumented
- **Package:** jfs-components 0.1.78 · guide commit `none` · built 2026-10-29T00:33:17Z
- **Category:** card (for discovery only, not a limit on composition) · **Tags:** 
- **Sources:** [guide](null) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-card--docs)

Slots: optional `header`, optional `media` (Default only), and `children` for the content stack. (Package docs; Coin has no designer guide for Card.)

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
| `header` | `ReactNode` | types |
| `media` | `ReactNode` | types |
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

### A slim card holding a line of content.

```tsx
<Card variant="slim" modes={{ 'Color Mode': 'Light' }}>
  <Text text="September payment" modes={{ 'Color Mode': 'Light' }} />
</Card>
```

_From no source in the guide_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `variant` | `CardVariantInput` | default, slim, Default, Slim | `"default"` |  | types | Visual layout variant matching Figma `Property 1`. - `'default'` — header + optional media + content (Figma Default) - `'slim'` — header + content only; `media` is ignored (Figma Slim) Defaults to `'default'`. Existing call sites that omit `media` continue to render a media-less default card (backward compatible). Prefer `variant="slim"` when you want the Slim contract explicitly. Default "default", from the component source. |
| `header` | `React.ReactNode` |  |  |  | types | Content rendered in the header slot at the top of the card (e.g. a brand logo). Sits above the media slot, padded with `card/content/padding/*`. `false`, `''` and `null` hide the slot. |
| `media` | `React.ReactNode` |  |  |  | types | Media slot content (e.g. `<Image />`). Wrapped in a container that respects `mediaAspectRatio`. Ignored when `variant="slim"`. `false`, `''` and `null` hide the slot. |
| `children` | `React.ReactNode` |  |  |  | types | Content slot (e.g. `Card.Title`, `Card.SupportText`). |
| `modes` | `Modes` |  |  |  | types | Modes object for token resolution. Cascades into all slots. |
| `mediaAspectRatio` | `number` |  | `1.3276` |  | types | Aspect ratio for the media slot container. Defaults to the Figma Ratio 154/116 (~1.328). Default 1.3276 (154 / 116), from the component source. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Style overrides for the card container. |
| `onPress` | `() => void` |  |  |  | types | Press handler for the whole card. When set, the card becomes pressable (`Pressable` + `accessibilityRole="button"`). |
| `disabled` | `boolean` |  |  |  | types | Disable interaction when `onPress` is set. |
| `accessibilityLabel` | `string` |  |  |  | types | Accessibility label forwarded to the root. |
| `...CardBaseProps` | `CardBaseProps` |  |  |  | types | Inherited React Native props the component also accepts. They are not part of the design contract and no guide documents them. |
| `Card.Title` | `component` |  |  |  | types | A static sub-component of Card. Its own props: children, style, modes, numberOfLines. |
| `Card.SupportText` | `component` |  |  |  | types | A static sub-component of Card. Its own props: children, style, modes, numberOfLines. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Primary"` |  | types | A token collection Card reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `AppearanceSystem` | `mode collection` | positive, warning, negative | `"positive"` |  | types | A token collection Card reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Card Container` | `mode collection` | Default, Plain | `"Default"` |  | types | A token collection Card reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection Card reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 8` | `mode collection` | Default, Section | `"Default"` |  | types | A token collection Card reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Gap` | `mode collection` | S, M, L, None | `"S"` |  | types | A token collection Card reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection Card reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Semantic Intent` | `mode collection` | Brand, System | `"Brand"` |  | types | A token collection Card reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `header` | `React.ReactNode` |  |  |  | types | Content rendered in the header slot at the top of the card (e.g. a brand logo). Sits above the media slot, padded with `card/content/padding/*`. `false`, `''` and `null` hide the slot. |
| `media` | `React.ReactNode` |  |  |  | types | Media slot content (e.g. `<Image />`). Wrapped in a container that respects `mediaAspectRatio`. Ignored when `variant="slim"`. `false`, `''` and `null` hide the slot. |
| `children` | `React.ReactNode` |  |  |  | types | Content slot (e.g. `Card.Title`, `Card.SupportText`). |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onPress` | `() => void` |  |  |  | types | Press handler for the whole card. When set, the card becomes pressable (`Pressable` + `accessibilityRole="button"`). |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

_None recorded._

## Flags

_None._
