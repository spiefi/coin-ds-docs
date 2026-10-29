# Image (brief)

> Coin agent pack 0.1.78+11 · undocumented · full entry: `components/image.md` (sources, all facts, flags)

Coin has no designer guide for Image; use its facts from the package types.

**Example:** A 16 : 9 image with an accessible label.

```tsx
<Image imageSource="https://example.com/offer.png" ratio={16 / 9} accessibilityLabel="Personal loan offer" />
```

**Props:** `imageSource`, `ratio`, `resizeMode` (center | none | stretch | repeat | cover | contain), `resizeMethod` (none | auto | resize | scale), `width`, `height`, `borderRadius`, `style`, `accessibilityLabel`, `accessibilityElementsHidden`, `importantForAccessibility` (auto | yes | no | no-hide-descendants), `loading`, `cache` (default | reload | force-cache | only-if-cached), `onLoad`, `onError`. (* required)

Full entry: `components/image.md`. Links: `components/image.links.md`.
