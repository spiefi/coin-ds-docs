# AvatarGroup (brief)

> Coin agent pack 0.1.78+18 · flagged · full entry: `components/avatargroup.md` (sources, all facts, flags)

Show several people or identities as one compact visual cue.

**Use when**
- Show several people or identities as one compact visual cue.
- Show who can access a shared account.

**Placement**
- Give the host room for every child: the row grows with its child count.
- `Avatar Size`: A narrower host doesn't shrink the Avatars: select a supported Avatar Size that fits (the guide fits four children at M in a 196 px host and at S in a 112 px host).
- Avoid: Don't overfill a fixed-width host: a row with more children than fit extends past it, and the guide's host clips the outer Avatars.
- A Coin Card can wrap a title, support text and the AvatarGroup in one composition; the Card adds that optional context outside the group.

**Key rules**
- `Avatar Size`: Avatar Size belongs to the group: set it once on the AvatarGroup, and the group gives that one size to every child.
- `Avatar Size`: Share one size across the Avatar children.
- Avoid: `Avatar Size`: Don't set Avatar Size on a child: a child's own mode takes precedence over the group's, so that child comes out a different size from the others.
- `Avatar Size` = `L`: With no Avatar Size set, the group and its children are L (42 px).
- `Avatar Size`: Avatar Size L, M, S and XS make every child 42, 36, 29 or 14 px.
- There is no separate count or gap control: the children supply the members and their image or monogram.
- AvatarGroup adds no selected, disabled or loading state of its own: loading belongs to each Avatar child.
- Avoid: Don't rely on the Avatar children to announce who is in the group: Avatar discards its accessibility label and hides its image and initials from accessibility.

**Example:** Who can view a shared account, the guide's In context: a Card wraps the title, the support text and the AvatarGroup, and the group holds only its three Monogram Avatars. The size, M (36 px), is set once on the group: it is what the guide's In context card draws in its code (its copy names no size), and what its Do & Don't's three children inherit. The Avatars set no size of their own.

```tsx
<Card variant="slim">
  <HStack alignVertical="center" justifyHorizontal="space-between">
    <VStack>
      <Card.Title>Shared savings</Card.Title>
      <Card.SupportText>People who can view this account</Card.SupportText>
    </VStack>
    <AvatarGroup modes={{ 'Avatar Size': 'M' }}>
      <Avatar style="Monogram" monogram="MS" />
      <Avatar style="Monogram" monogram="AK" />
      <Avatar style="Monogram" monogram="LS" />
    </AvatarGroup>
  </HStack>
</Card>
```

**Props:** `modes`, `children`, `style`. (* required)

**Modes it reads:** Avatar Size, Badge Size, Color Mode, Context2, Context4, Page type.

Full entry: `components/avatargroup.md`. Links: `components/avatargroup.links.md`.
