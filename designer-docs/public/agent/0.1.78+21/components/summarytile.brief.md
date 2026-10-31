# SummaryTile (brief)

> Coin agent pack 0.1.78+21 · flagged · full entry: `components/summarytile.md` (sources, all facts, flags)

Use a Summary Tile to head a dashboard block: a title with a confidence meter, one line about the block, and one action or a chevron.

**Use when**
- Head a dashboard block: a title with a confidence meter, one line about the block, and one action or a chevron.
- Name the block, then offer one way in.

**Avoid when**
- Avoid: Two actions: the upstream Storybook docs, as the evidence records them, keep the tile for naming a block and offering one next step.
- Avoid: The block itself: the upstream Storybook docs, as the evidence records them, use the tile to name the block, not to hold it.

**Placement**
- Put it at the top of the block it names: in the guide’s In context, the tile heads a card and the list under it is the block it introduces.
- It fills its host’s width and adds no padding, background, or border: the card or screen around it supplies them.

**Key rules**
- `children`: children holds the action.
- `children`: There is no default action: pass a Button or an IconButton in children, or use actionLabel and onActionPress for the built-in small secondary Button.
- `onActionPress`: onActionPress, with children left out, renders the built-in small secondary Button with that handler instead of a dead placeholder.
- `actionLabel`: actionLabel labels the built-in Button only when children is left out and onActionPress is set; without it the Button reads “Button”, and actionLabel on its own renders no button.
- `modes`: The tile passes its modes to whatever you put there, and your Button’s own modes win.
- `children`: A Button or IconButton in children starts at AppearanceBrand Secondary and Button / Size S; modes on the tile override those defaults, and the child’s own modes override the tile.
- AppearanceBrand, Emphasis, and Semantic Intent change only the action: the title, description, and meter keep their look.
- `chevron` = `true`: chevron adds a forward arrow at the end.

**Example:** Spending on the Money screen, the guide’s In context: the tile heads a card and the list under it is the block it introduces. See all does the work through its own onPress (the empty handler stands for opening the screen’s spending view). The tile carries no modes: on the installed package a Button in children starts at AppearanceBrand Secondary and Button / Size S. The guide’s MoneyValue amounts are left out because MoneyValue has no entry in this pack.

```tsx
<Card>
  <VStack>
    <SummaryTile title="Spending" description="Your top categories this month" confidence="High">
      <Button label="See all" onPress={() => {}} />
    </SummaryTile>
    <ListGroup>
      <ListItem layout="Horizontal" navArrow={false} title="Food" supportText="12 orders" />
      <ListItem layout="Horizontal" navArrow={false} title="Shopping" supportText="5 orders" />
      <ListItem layout="Horizontal" navArrow={false} title="Travel" supportText="3 trips" />
    </ListGroup>
  </VStack>
</Card>
```

**Props:** `title`, `description`, `confidence`, `chevron`, `children`, `actionLabel`, `onActionPress`, `onPress`, `modes`, `style`, `titleStyle`, `descriptionStyle`, `accessibilityLabel`, `disableTruncation`. (* required)

**Modes it reads:** AppearanceBrand, AppearanceSystem, Button / Size, Button / State, Color Mode, Context, context 10, Context2, context5, Emphasis, List Item Style, NavArrow Direction, Page type, Profile Card Appearance, Semantic Intent.

**Gaps (report, do not work around)**
- The published Storybook page is still the older generated one.
- The title’s line is 20 px where Figma’s is 18, so a one-line tile is 44 px tall, not 42.

Full entry: `components/summarytile.md`. Links: `components/summarytile.links.md`.
