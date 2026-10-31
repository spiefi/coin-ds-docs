# Text

> Coin agent pack 0.1.78+20 (pilot). Generated from `components/text.json`; the JSON is the source of truth.

- **State:** undocumented
- **Package:** jfs-components 0.1.78 · guide commit `none` · built 2026-10-31T00:24:09Z
- **Category:** content (for discovery only, not a limit on composition) · **Tags:** 
- **Sources:** [guide](null) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-text--docs)

Coin has no designer guide for Text; use its facts from the package types.

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

### A line of body text.

```tsx
<Text text="Paid from your JioFinance account." modes={{ 'Color Mode': 'Light' }} />
```

_From no source in the guide_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `text` | `string` |  |  |  | types | The text content to display. You may also pass content as JSX children (e.g. `<Text>Hello</Text>`) — when both are provided, `children` wins. |
| `children` | `React.ReactNode` |  |  |  | types | Child nodes (string, number, or nested <Text>/<RNText> elements). This mirrors the standard React Native `<Text>` API so the component is a near-drop-in replacement. |
| `textAlign` | `'Left' \| 'Center'` | Left, Center | `"Left"` |  | types | Horizontal alignment of the text. Default "Left", from the component source. |
| `modes` | `Modes` |  |  |  | types | Modes configuration for design token resolution. |
| `style` | `StyleProp<TextStyle>` |  |  |  | types | Style override for the text. |
| `numberOfLines` | `number` |  |  |  | types | Number of lines to limit the text to. |
| `disableTruncation` | `boolean` |  |  |  | types | When `true`, disables text truncation entirely: the trailing ellipsis (`…`) is never shown and any `numberOfLines` clamp is ignored. The text is also never shrunk by a tight parent — it keeps its full intrinsic size and overflows (even breaking the parent layout) rather than clipping into an ellipsis. It still wraps onto multiple lines. |
| `singleLine` | `boolean` |  |  |  | types | When `true`, forces the text onto a single line with no wrapping (implies {@link disableTruncation}). On web the line overflows horizontally — brutally breaking the parent layout if it has to — instead of wrapping or truncating. |
| `loading` | `boolean` |  |  |  | types | Explicit per-instance loading override. When `true`, this `Text` renders a skeleton placeholder regardless of any surrounding `<SkeletonGroup>`. When `false`, the surrounding group is ignored for this instance. When omitted, the surrounding group's `loading` flag wins. |
| `skeletonWidth` | `number \| ˋ${number}%ˋ` |  |  |  | types | Optional width used while the skeleton is showing. Numbers are dp; `'100%'` (etc.) is a valid RN dimension. Defaults to a character-count heuristic based on the resolved font size and the supplied content. |
| `skeletonLines` | `number` |  |  |  | types | Optional explicit line count for the skeleton placeholder. Defaults to `numberOfLines ?? 1`. Useful when `numberOfLines` is intentionally unbounded but you want a sensible multi-line placeholder. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection Text reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context` | `mode collection` | Default, Nudge&Alert, CTACard, ListItem | `"Default"` |  | types | A token collection Text reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection Text reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Text Appearance` | `mode collection` | Neutral, Primary, Secondary, Tertiary, Success, Warning, Error | `"Neutral"` |  | types | A token collection Text reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Text Sizes` | `mode collection` | Medium, Small, Large | `"Medium"` |  | types | A token collection Text reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Weight` | `mode collection` | Medium, Regular, Bold | `"Medium"` |  | types | A token collection Text reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types | Child nodes (string, number, or nested <Text>/<RNText> elements). This mirrors the standard React Native `<Text>` API so the component is a near-drop-in replacement. |

### Events

_No events._

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

_None recorded._

## Flags

_None._
