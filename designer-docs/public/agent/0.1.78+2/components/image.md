# Image

> Coin agent pack 0.1.78+2 (pilot). Generated from `components/image.json`; the JSON is the source of truth.

- **State:** undocumented
- **Package:** jfs-components 0.1.78 · guide commit `none` · built 2026-10-17T11:10:07Z
- **Category:** content (for discovery only, not a limit on composition) · **Tags:** 
- **Sources:** [guide](null) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/story/components-image--sixteen-by-nine)

Coin has no designer guide for Image; use its facts from the package types.

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

### A 16 : 9 image with an accessible label.

```tsx
<Image imageSource="https://example.com/offer.png" ratio={16 / 9} accessibilityLabel="Personal loan offer" />
```

_From no source in the guide_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `imageSource` | `ImageSourcePropType \| string \| undefined` |  |  |  | types | Image source. Accepts the same shapes as React Native's `<Image>` plus a raw URL string. Naming is intentionally aligned with `Avatar`, `ProductLabel`, `CardProviderInfo`, etc. so the library has a single, predictable image-source prop name. |
| `ratio` | `number \| undefined` |  | `1.7778` |  | types | Width-to-height aspect ratio as a number, e.g. `16 / 9`, `1`, `4 / 3`. Defaults to `16 / 9` so the image always has a sensible rendered height even when the parent has no fixed height (e.g. inside `MediaCard`, which hugs whatever the image renders at). Pass `ratio={null as any}` is not supported — explicitly set a number, or override with `width` + `height` if you need a non-aspect layout. Equivalent CSS: `aspect-ratio: <ratio>`. Default 1.7778 (16 / 9), from the component source. |
| `resizeMode` | `ImageResizeMode \| undefined` | center, stretch, cover, contain, repeat, none | `"cover"` |  | types | How the image is fit inside its box. Defaults to `'cover'`. Default "cover", from the component source. |
| `resizeMethod` | `ImageResizeMethod \| undefined` | none, auto, resize, scale |  |  | types | (Android only) How the bitmap is resampled when the source resolution differs from the rendered box. RN's own default is `'auto'`, which for large source images silently picks `'resize'`: a pre-decode software downsample that DESTROYS detail and makes big hero/background images look soft/pixelated even when the asset is high-res. To avoid that, this component defaults to: - `'none'` when an explicit `width` + `height` box is set (full-bleed hero/background usage — full resolution, maximum sharpness), and - `'scale'` otherwise (GPU scaling — high quality and memory-safe for ordinary aspect-ratio images). Pass an explicit value to override. No-op on iOS/web. |
| `width` | `ViewStyle['width'] \| undefined` |  |  |  | types | Optional explicit width. If omitted and a `ratio` is set, the image defaults to `width: '100%'` so it fills its parent. |
| `height` | `ViewStyle['height'] \| undefined` |  |  |  | types | Optional explicit height. Usually you only need `ratio` instead. |
| `borderRadius` | `number \| undefined` |  |  |  | types | Border radius applied to the image (clips the underlying raster). |
| `style` | `StyleProp<ImageStyle> \| undefined` |  |  |  | types | Style merged onto the underlying RN `<Image>`. |
| `accessibilityLabel` | `string \| undefined` |  |  |  | types | Accessibility label forwarded to RN `<Image>`. |
| `accessibilityElementsHidden` | `boolean \| undefined` |  |  |  | types | Hide from the a11y tree (e.g. when image is purely decorative). |
| `importantForAccessibility` | `'auto' \| 'yes' \| 'no' \| 'no-hide-descendants' \| undefined` | auto, yes, no, no-hide-descendants |  |  | types |  |
| `loading` | `boolean \| undefined` |  |  |  | types | Explicit per-instance loading override. When `true`, the image renders as a skeleton placeholder at the same box size; when `false`, the surrounding `<SkeletonGroup>` is ignored. Defaults to inheriting from the group. |
| `cache` | `ImageCacheControl \| undefined` | default, reload, force-cache, only-if-cached |  |  | types | iOS URL cache strategy applied to remote (`{ uri }`) sources. Injected into the RN `source.cache` field so callers don't have to re-shape the source object themselves. No-op for local/required assets and on Android/web. |
| `onLoad` | `((event: NativeSyntheticEvent<ImageLoadEventData>) => void) \| undefined` |  |  |  | types | Called when the image finishes loading successfully. Forwarded straight to RN's `<Image onLoad>`. |
| `onError` | `((event: NativeSyntheticEvent<ImageErrorEventData>) => void) \| undefined` |  |  |  | types | Called when the image fails to load. Forwarded straight to RN's `<Image onError>`. |

### Modes

_No modes._

### Slots

_No slots._

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onLoad` | `((event: NativeSyntheticEvent<ImageLoadEventData>) => void) \| undefined` |  |  |  | types | Called when the image finishes loading successfully. Forwarded straight to RN's `<Image onLoad>`. |
| `onError` | `((event: NativeSyntheticEvent<ImageErrorEventData>) => void) \| undefined` |  |  |  | types | Called when the image fails to load. Forwarded straight to RN's `<Image onError>`. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

_None recorded._

## Flags

_None._
