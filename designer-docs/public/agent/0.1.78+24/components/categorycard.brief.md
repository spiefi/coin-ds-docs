# CategoryCard (brief)

> Coin agent pack 0.1.78+24 · documented · full entry: `components/categorycard.md` (sources, all facts, flags)

Use a Category Card for one category in a horizontal rail: a picture, a one- or two-word label, and an optional badge.

**Use when**
- Show one category in a horizontal rail: a picture, a one- or two-word label, and an optional badge.
- One picture, one word, one tap.
- A horizontal rail of categories in which the active card is the current filter: the upstream Storybook docs, as the evidence records them.

**Avoid when**
- Avoid: Peers: the upstream Storybook docs, as the evidence records them, use Tabs. Use instead: Tabs.
- Avoid: Filters people can combine: the upstream Storybook docs, as the evidence records them, use Chip Select. Use instead: ChipSelect.

**Placement**
- Lay the cards out side by side in a category rail, as on the guide's Invest screen.
- Cards with and without a badge line up in a rail: every card keeps 11 px above it for a badge.

**Key rules**
- **REQUIRED** `label`: Set label to the category's name: left out, the card shows “Popular”.
- `badge`: badge adds a short tag on the card's top edge; leave it out for none.
- `active`: Figma's State variant (Idle, Active) is the active prop, and Figma's badge on or off is the badge text.
- `imageSlot`: Give the card a picture, such as a Coin Icon Capsule in imageSlot as the guide's examples do: without an image the card shows a plain light square.
- `children`: children is another way to fill the image slot; when both are set, imageSlot wins.
- `AppearanceBrand`: AppearanceBrand colours the badge, Tertiary (blue) by default, and whatever is in imageSlot gets the same modes, so an Icon Capsule there follows it.
- `AppearanceBrand` = `Tertiary`: AppearanceBrand Tertiary, the default: a blue badge, as in Figma.
- `AppearanceBrand` = `Primary`: AppearanceBrand Primary: gold for the badge and an Icon Capsule in imageSlot.

**Example:** A category rail on the Invest screen, the guide's In context: a Title over an HStack of four Category Cards, each with an Icon Capsule in imageSlot as its category art, two of them with a badge. active on Gold stands for the category the screen is showing, and each onPress for the screen selecting that card's category (and moving active to it).

```tsx
<VStack>
  <Title title="Invest" subtitle="Pick a category" />
  <HStack>
    <CategoryCard
      label="Gold"
      badge="New"
      imageSlot={<IconCapsule iconName="ic_rupee_coin" />}
      active
      onPress={() => {}}
    />
    <CategoryCard
      label="Loans"
      imageSlot={<IconCapsule iconName="ic_loans" />}
      active={false}
      onPress={() => {}}
    />
    <CategoryCard
      label="Savings"
      imageSlot={<IconCapsule iconName="ic_savings" />}
      active={false}
      onPress={() => {}}
    />
    <CategoryCard
      label="Insurance"
      badge="Hot"
      imageSlot={<IconCapsule iconName="ic_insurance" />}
      active={false}
      onPress={() => {}}
    />
  </HStack>
</VStack>
```

**Props:** `testID`, `label`, `imageSource`, `imageSlot`, `children`, `badge`, `active`, `width`, `disableTruncation`, `singleLine`, `onPress`, `disabled`, `modes`, `style`, `labelStyle`, `accessibilityLabel`, `accessibilityHint`, `accessibilityState`, `webAccessibilityProps`. (* required)

**Modes it reads:** AppearanceBrand, AppearanceSystem, Badge Size, Card Tab State, Color Mode, Emphasis, Radius, Semantic Intent.

**Gaps (report, do not work around)**
- The label's font token is spelt “Jio Type Var”, so the label shows in a fallback serif font until the token is fixed (token problem #288, open).
- Figma ends a long label in an ellipsis; the package lets it spill unless you change singleLine and disableTruncation.
- The published Storybook still shows the older generated Category Card page.

Full entry: `components/categorycard.md`. Links: `components/categorycard.links.md`.
