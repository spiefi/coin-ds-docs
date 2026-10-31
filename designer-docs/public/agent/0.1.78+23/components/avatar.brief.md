# Avatar (brief)

> Coin agent pack 0.1.78+23 · flagged · full entry: `components/avatar.md` (sources, all facts, flags)

Represent one person or account with an image or initials.

**Use when**
- Represent one person or account with an image or initials.
- Identify an account owner at a glance.

**Avoid when**
- Avoid: Showing different people with the Image style and no imageSource: they all get the same bundled fallback and can't be told apart. Use a portrait or clear initials instead.

**Placement**
- A surrounding Card may add a name or role when the layout calls for it; Avatar does not require nearby text.
- `Avatar Size`: A surrounding card or row can give it room, but doesn't stretch it: its size comes from Avatar Size.

**Key rules**
- `style`: Use a real image when available; use a short monogram otherwise.
- `style`: style selects which content is rendered: Monogram shows its monogram text; Image shows imageSource, or the package fallback when there is none.
- `style` = `Monogram`: style is Image by default: set style="Monogram" to show initials.
- `imageSource`: Image: provide an image source that represents this person. The bundled fallback is only a preview when no source is supplied.
- `monogram`: Monogram: use a short, recognizable set of initials when a portrait is not available.
- `Avatar Size`: Pick one of the four Avatar Size modes: L 42 px, M 36 px, S 29 px or XS 14 px.
- `Avatar Size` = `L`: With no Avatar Size set, an Avatar is L, 42 px.
- `loading`: loading true shows a same-size circular placeholder instead of the avatar; left unset, it follows the surrounding SkeletonGroup.

**Example:** An account owner in a Card, the guide's In context: a Monogram Avatar beside the owner's role and the account. The Card adds that context; the Avatar itself needs no nearby text. It is at M (36 px), the size the guide's In context card draws in its code (its copy names no size).

```tsx
<Card variant="slim">
  <HStack alignVertical="center">
    <Avatar style="Monogram" monogram="MS" modes={{ 'Avatar Size': 'M' }} />
    <VStack>
      <Card.Title>Account owner</Card.Title>
      <Card.SupportText>Shared savings account</Card.SupportText>
    </VStack>
  </HStack>
</Card>
```

**Props:** `monogram`, `style` (Image | Monogram), `modes`, `imageSource`, `accessibilityLabel`, `onPress`, `disabled`, `loading`. (* required)

**Modes it reads:** Avatar Size, Badge Size, Color Mode, context 10, Context2, Context4, Page type, Profile Card Appearance.

Full entry: `components/avatar.md`. Links: `components/avatar.links.md`.
