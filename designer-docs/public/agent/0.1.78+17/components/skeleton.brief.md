# Skeleton (brief)

> Coin agent pack 0.1.78+17 · documented · full entry: `components/skeleton.md` (sources, all facts, flags)

Use a Skeleton group to show the shape of content while it loads, so the screen doesn't jump when it arrives.

**Use when**
- Show the shape of content while it loads, with a SkeletonGroup, so the screen doesn't jump when it arrives.
- Show the shape of what's coming, then fill it in place.
- Refreshing a list, such as holdings: the rows go into their loading state, then the content swaps back in place.

**Avoid when**
- Avoid: Covering the loading area with one block: it hides how much is coming, and the layout jumps when it loads.

**Placement**
- Put the same components in the SkeletonGroup that will show the content, so the placeholders mirror the real layout.
- Keep the real layout while loading: each row keeps its shape, so nothing jumps when content arrives.
- A Skeleton placed by hand still needs a group (SkeletonGroup) around it.

**Key rules**
- `kind`: A Skeleton's kind sets only its corners; its width and height are yours.
- `kind` = `text`: kind text: full pills, one per line; match each line's height.
- `kind` = `image`: kind image: 10 px corners, as big as the image it stands in for.
- `kind` = `badge`: kind badge: 4 px corners, the size of a badge.
- `kind` = `other`: kind other is the default: square sizes make a circle, wide ones a pill, for avatars and buttons.
- Inside a group, Coin components such as Text, Avatar, Badge, and Button draw their own placeholder at their own size, so you rarely place a Skeleton by hand.
- A SkeletonGroup switches every placeholder inside it; Text, Avatar, Badge, Button, Image and other Coin components draw their own, and a Skeleton places one by hand.
- Coin components size their own placeholders: a Text bar is as tall as its line and about as long as its words, and an Avatar's is its own size.

**Example:** Refreshing holdings, the guide's In context: the screen sets the group's loading while it refreshes the holdings, then turns it off and the content swaps back in place. The title and the button sit outside the group and stay real; each Text and Badge in the rows draws its own placeholder.

```tsx
<VStack>
  <Text>Your holdings</Text>
  <SkeletonGroup loading>
    <HStack alignVertical="center">
      <VStack style={{ flex: 1 }}>
        <Text>Reliance Industries</Text>
        <Text>64 units · ₹1,52,900</Text>
      </VStack>
      <Badge label="Equity" />
    </HStack>
    <HStack alignVertical="center">
      <VStack style={{ flex: 1 }}>
        <Text>HDFC Bank</Text>
        <Text>120 units · ₹1,98,400</Text>
      </VStack>
      <Badge label="Equity" />
    </HStack>
  </SkeletonGroup>
  <Button label="Refresh" onPress={() => {}} />
</VStack>
```

**Props:** `kind` (image | text | badge | other), `width`, `height`, `style`, `modes`, `visible`, `SkeletonGroup.loading`*, `SkeletonGroup.reducedMotion`. (* required)

**Modes it reads:** context5.

**Gaps (report, do not work around)**
- Figma has no Skeleton component: the Coin variables hold its grey and its corner radii, and the ticket's Figma link opens the Stepper Item page.
- The published Storybook page is still the old generated one, and it gives a lighter grey than the code's #e7e7e7.

Full entry: `components/skeleton.md`. Links: `components/skeleton.links.md`.
