# Title

> Coin agent pack 0.1.78+12 (pilot). Generated from `components/title.json`; the JSON is the source of truth.

- **State:** undocumented
- **Package:** jfs-components 0.1.78 · guide commit `none` · built 2026-10-29T04:33:30Z
- **Category:** content (for discovery only, not a limit on composition) · **Tags:** 
- **Sources:** [guide](null) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-title--docs)

Coin has no designer guide for Title; use its facts from the package types.

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

### A screen title with a subtitle.

```tsx
<Title title="Accounts" subtitle="Linked to JioFinance" modes={{ 'Color Mode': 'Light' }} />
```

_From no source in the guide_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `title` | `string` |  | `"Title"` |  | types | Default "Title", from the component source. |
| `subtitle` | `string` |  |  |  | types | Optional subtitle displayed below the title. |
| `textAlign` | `'Left' \| 'Center'` | Left, Center | `"Left"` |  | types | Horizontal alignment of the title text. Default "Left", from the component source. |
| `modes` | `Modes` |  |  |  | types |  |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types |  |
| `textStyle` | `StyleProp<TextStyle>` |  |  |  | types |  |
| `subtitleStyle` | `StyleProp<TextStyle>` |  |  |  | types | Optional style overrides for the subtitle text. |
| `numberOfLines` | `number` |  |  |  | types |  |
| `disableTruncation` | `boolean` |  |  |  | types | When `true`, disables truncation for both the title and subtitle: the trailing ellipsis (`…`) is never shown and the `numberOfLines` clamp is ignored. The text is also never shrunk by a tight parent — it keeps its full intrinsic size and overflows (even breaking the parent layout) rather than ever clipping into an ellipsis. The text still wraps onto multiple lines. |
| `singleLine` | `boolean` |  |  |  | types | When `true`, forces both the title and subtitle onto a single line with no wrapping (implies {@link disableTruncation}). On web the line overflows horizontally — brutally breaking the parent layout if it has to — instead of wrapping or truncating. |
| `accessibilityLabel` | `string` |  |  |  | types |  |
| `accessibilityHint` | `string` |  |  |  | types |  |
| `...React.ComponentProps<typeof View>` | `React.ComponentProps<typeof View>` |  |  |  | types | Inherited React Native props the component also accepts. They are not part of the design contract and no guide documents them. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection Title reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context7` | `mode collection` | Default, Card, Page Hero | `"Default"` |  | types | A token collection Title reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection Title reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

_No slots._

### Events

_No events._

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

_None recorded._

## Flags

_None._
