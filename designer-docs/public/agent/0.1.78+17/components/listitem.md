# ListItem

> Coin agent pack 0.1.78+17 (pilot). Generated from `components/listitem.json`; the JSON is the source of truth.

- **State:** undocumented
- **Package:** jfs-components 0.1.78 · guide commit `none` · built 2026-10-29T09:06:00Z
- **Category:** content (for discovery only, not a limit on composition) · **Tags:** 
- **Sources:** [guide](null) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-listitem--docs)

ListItem component that mirrors the Figma "List Item" component. (Package docs; Coin has no designer guide for ListItem.)

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
| `leading` | `ReactNode` | types |
| `supportSlot` | `ReactNode` | types |
| `trailing` | `ReactNode` | types |
| `endSlot` | `ReactNode` | types |
| `titleIcon` | `ReactNode` | types |

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

### A horizontal row that navigates when pressed.

```tsx
<ListItem layout="Horizontal" title="Savings Account" supportText="HDFC Bank" navArrow onPress={() => {}} modes={{ 'Color Mode': 'Light' }} />
```

_From no source in the guide_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `layout` | `'Vertical' \| 'Horizontal'` | Vertical, Horizontal | `"Vertical"` |  | types | Layout variant, controlling structure and children. Default "Vertical", from the component source. |
| `title` | `string` |  | `"Title"` |  | types | Primary title used in the horizontal layout. Default "Title", from the component source. |
| `titleHighlightRanges` | `ReadonlyArray<TextHighlightRange>` |  |  |  | types | Optional match ranges into `title` for search highlighting. When omitted or empty after normalization, the title renders with the normal `listItem/title/*` style. When present, matched spans keep `listItem/title/color` and unmatched spans recede using `textSearchUnmatched/fg/color` (Figma: Labels - Vibrant/Secondary). |
| `supportText` | `string` |  | `"Support Text"` |  | types | Support text used in both layouts when `supportSlot` is not provided. Default "Support Text", from the component source. |
| `showSupportText` | `boolean` |  | `true` |  | types | Toggles rendering of the support text in Horizontal layout. Default true, from the component source. |
| `leading` | `React.ReactNode \| null` |  |  |  | types | Leading slot (Figma "leading"). Omitted or `null` renders nothing. |
| `supportSlot` | `React.ReactNode` |  |  |  | types | Optional custom slot used instead of the default support text block. |
| `trailing` | `React.ReactNode` |  |  |  | types | Trailing slot (Figma "trailing"), e.g. `MoneyValue` or `Button`. Horizontal layout only. |
| `endSlot` | `React.ReactNode` |  |  |  | types | Deprecated: Renamed to `trailing` for a symmetric `leading` / `trailing` slot API. Still honored for backward compatibility; `trailing` wins when both are provided. Will be removed in a future major version. |
| `navArrow` | `boolean` |  | `true` |  | types | Whether to show the NavArrow on the far right (Horizontal layout only). Defaults to true. Default true, from the component source. |
| `isDraggable` | `boolean` |  | `false` |  | types | When `true`, shows the Figma drag handle (`ic_sort_handle`) on the far right of the Horizontal layout. Visual affordance only — reorder logic lives on {@link ListGroup} (or the consumer). Wire the handle via {@link ListItemProps.dragHandleProps} / {@link ListItemProps.onDragHandleGrant}. Default false, from the component source. |
| `isDragging` | `boolean` |  | `false` |  | types | When `true`, injects `Draggable List: 'onDrag'` for lifted-row chrome (padding, translucent background, drop shadow). All other modes from `modes` still apply and can override their own collections. Typically set by the reorder parent while this row is the active drag. Default false, from the component source. |
| `titleIcon` | `React.ReactNode` |  |  |  | types | Optional icon rendered after the title in the Horizontal title wrap (Figma title-icon slot). Modes cascade into slotted children. |
| `dragHandleProps` | `Omit<ViewProps, 'children'>` |  |  |  | types | Props spread onto the drag-handle wrapper View when `isDraggable` is true. Use this (or `onDragHandleGrant`) so a parent can attach pan activation without ListItem importing gesture-handler. |
| `onDragHandleGrant` | `() => void` |  |  |  | types | Called on press-in of the drag handle. Prefer for starting a parent-owned reorder gesture (`ListGroup` passes its `drag()` activator here). |
| `modes` | `Modes` |  |  |  | types | Modes object passed to `getVariableByName` for all design tokens. |
| `onPress` | `() => void` |  |  |  | types | When provided, the entire item becomes pressable (navigation variant). |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Optional container style overrides. |
| `contentStyle` | `StyleProp<ViewStyle>` |  |  |  | types | Optional inner content wrapper style overrides. |
| `accessibilityLabel` | `string` |  |  |  | types | Accessibility label for screen readers. If not provided, uses title and supportText. |
| `accessibilityHint` | `string` |  |  |  | types | Additional accessibility hint for screen readers. |
| `accessibilityState` | `AccessibilityState` |  |  |  | types | Additional accessibility state information Performance notes: - All token reads are folded into a single `useMemo([modes])`. - The pressed visual is applied via Pressable's `style={({pressed}) => ...}` callback so RN updates the host view directly — no React render is scheduled by a touch. On iOS the touch is additionally delayed via `unstable_pressDelay={130}` so a scroll-cancelled tap never even transiently applies the pressed style. This is the fix for the "People / Setup card flicker during scroll" report. - User-supplied event handlers are read through a ref so the wrapper handlers stay referentially stable across renders. - The component is wrapped in `React.memo`. /. |
| `webAccessibilityProps` | `WebAccessibilityProps` |  |  |  | types | Web-specific accessibility props (only used on web platform) |
| `disableTruncation` | `boolean` |  |  |  | types | When `true`, disables text truncation: the trailing ellipsis (`…`) is never shown and any `numberOfLines` clamp is ignored, so the text wraps to as many lines as it needs even when horizontal space is tight. |
| `...React.ComponentProps<typeof View>` | `React.ComponentProps<typeof View>` |  |  |  | types | Inherited React Native props the component also accepts. They are not part of the design contract and no guide documents them. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Primary"` |  | types | A token collection ListItem reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `AppearanceSystem` | `mode collection` | positive, warning, negative | `"positive"` |  | types | A token collection ListItem reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Badge Size` | `mode collection` | Medium, Small | `"Medium"` |  | types | A token collection ListItem reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection ListItem reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 10` | `mode collection` | Default, jioPlus | `"Default"` |  | types | A token collection ListItem reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context2` | `mode collection` | Default, AppBar | `"Default"` |  | types | A token collection ListItem reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context4` | `mode collection` | Default, Chip, Button, Badge, Badge/glass | `"Default"` |  | types | A token collection ListItem reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context5` | `mode collection` | Default, Fullscreen Modal, Mode 1 | `"Default"` |  | types | A token collection ListItem reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Draggable List` | `mode collection` | default, onDrag | `"default"` |  | types | A token collection ListItem reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Emphasis` | `mode collection` | High, Medium, Low | `"High"` |  | types | A token collection ListItem reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Icon Size` | `mode collection` | Medium, Small | `"Medium"` |  | types | A token collection ListItem reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `List Item Style` | `mode collection` | Default, Boxed, Minimal | `"Default"` |  | types | A token collection ListItem reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `ListItem State` | `mode collection` | Idle, Active | `"Idle"` |  | types | A token collection ListItem reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `NavArrow Direction` | `mode collection` | Left&Right, Top&Bottom | `"Left&Right"` |  | types | A token collection ListItem reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection ListItem reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Profile Card Appearance` | `mode collection` | Default, Premium | `"Default"` |  | types | A token collection ListItem reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Selectable` | `mode collection` | False, True | `"False"` |  | types | A token collection ListItem reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Semantic Intent` | `mode collection` | Brand, System | `"Brand"` |  | types | A token collection ListItem reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `leading` | `React.ReactNode \| null` |  |  |  | types | Leading slot (Figma "leading"). Omitted or `null` renders nothing. |
| `supportSlot` | `React.ReactNode` |  |  |  | types | Optional custom slot used instead of the default support text block. |
| `trailing` | `React.ReactNode` |  |  |  | types | Trailing slot (Figma "trailing"), e.g. `MoneyValue` or `Button`. Horizontal layout only. |
| `endSlot` | `React.ReactNode` |  |  |  | types |  |
| `titleIcon` | `React.ReactNode` |  |  |  | types | Optional icon rendered after the title in the Horizontal title wrap (Figma title-icon slot). Modes cascade into slotted children. |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onDragHandleGrant` | `() => void` |  |  |  | types | Called on press-in of the drag handle. Prefer for starting a parent-owned reorder gesture (`ListGroup` passes its `drag()` activator here). |
| `onPress` | `() => void` |  |  |  | types | When provided, the entire item becomes pressable (navigation variant). |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

_None recorded._

## Flags

_None._
