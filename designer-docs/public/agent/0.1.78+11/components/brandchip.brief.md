# BrandChip (brief)

> Coin agent pack 0.1.78+11 · flagged · full entry: `components/brandchip.md` (sources, all facts, flags)

Use Brand Chip to identify a linked brand or account with an avatar and a short label.

**Use when**
- Identify a linked brand or account with an avatar and a short label.
- Show the account in use, such as the account a payment is made from (the guide's “Paying from”).

**Avoid when**
- Avoid: Showing a status such as Payment complete: a status label no longer tells people which account is involved. Put the status in nearby content and keep the chip for the account.

**Placement**
- Let the surrounding composition explain the chip's role, such as a “Paying from” line above it.
- The chip grows with its content: it hugs its avatar and label rather than filling its host.
- `label`: The label is one line by default; in constrained hosts, use short identifiers.

**Key rules**
- **REQUIRED** `imageSource`: imageSource puts the brand's image in the chip's own Avatar; it is ignored when avatarSlot is given.
- **REQUIRED** `onPress`: Make the chip actionable (onPress) only when pressing it opens account detail or a choice; to identify the current account, leave it static.
- Keep the avatar and the label about the same brand.
- Use an avatar or monogram for the brand named in the label.
- Avoid: Do not pair the label with another brand's avatar or monogram (such as HB beside Axis Bank • 0245): a different brand cue creates uncertainty about the account.
- `avatarSlot`: When no brand image is available, a monogram gives a clear fallback: an Avatar with style Monogram in avatarSlot, such as AB for Axis Bank.
- `avatarSlot`: The monogram is supplied through avatarSlot by the screen: BrandChip does not replace a failed image with a monogram on its own.
- `Avatar Size` = `S`: BrandChip already shows its avatar at Avatar Size S (29 px, as in Figma) and passes its modes on to the Avatar in avatarSlot.

**Example:** The account in use, the guide's In context: a “Paying from” line explains the chip's role, and the chip names the account with an AB monogram Avatar in avatarSlot.

```tsx
<Card variant="slim">
  <VStack>
    <Text>Paying from</Text>
    <BrandChip
      label="Axis Bank • 0245"
      avatarSlot={<Avatar style="Monogram" monogram="AB" />}
    />
  </VStack>
</Card>
```

**Props:** `label`, `imageSource`, `avatarSlot`, `onPress`, `modes`, `style`, `labelStyle`, `accessibilityLabel`, `disableTruncation`. (* required)

**Modes it reads:** Avatar Size, Badge Size, Color Mode, context 10, Context2, Context4, Page type, Profile Card Appearance.

**Gaps (report, do not work around)**
- BrandChip has no selected or disabled state: the package offers an optional action (onPress) only.
- The label has no flex shrink, so a long label can run past a narrow host: the guide’s long-label example exceeds its 240 px host. Keep identifiers short.

Full entry: `components/brandchip.md`. Links: `components/brandchip.links.md`.
