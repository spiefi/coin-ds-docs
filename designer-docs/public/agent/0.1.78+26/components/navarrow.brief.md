# NavArrow (brief)

> Coin agent pack 0.1.78+26 · flagged · full entry: `components/navarrow.md` (sources, all facts, flags)

Use a Nav Arrow to show that something leads elsewhere: a chevron at the end of a row, or a back arrow in a header.

**Use when**
- Show that something leads elsewhere: a chevron at the end of a row, or a back arrow in a header.

**Avoid when**
- Avoid: At the end of a list row: ListItem draws the forward arrow for you, so don't add a Nav Arrow there. Use instead: ListItem.

**Placement**
- `direction` = `Back`: Put a back arrow beside a screen title, as its own button.
- `direction` = `Down`: Put a down arrow next to a label that opens more content below.
- Point forward in a row: the row leads on to another screen.
- Avoid: One chevron per row: use the row's own arrow, and don't add a second one, since two chevrons look like a mistake.

**Key rules**
- `direction`: Set direction to where it leads: Forward leads to another screen, Back returns to the previous one, and Down opens content below.
- `direction`: Left out, direction is Back, a left chevron, so set Forward or Down when the arrow points elsewhere.
- `direction` = `Forward`: Forward: at the end of a row; ListItem draws it for you.
- Avoid: `direction` = `Back`: Don't point back in a row: a back arrow reads as leaving, not opening.
- `onPress`: Make the whole row pressable, and give the arrow onPress only when it stands alone.
- `onPress`: Give it onPress and it gains a 44 × 44 pressable area; without it, it is a small image.
- Avoid: `onPress`: Don't make only the arrow pressable in a row: people tap the label and nothing happens.
- The chevron is 6 × 10 px (10 × 6 pointing down). A pressable arrow reserves 44 × 44 px so it is easy to tap.

**Example:** A header and a list of accounts, the guide's In context as its example code draws it: a back arrow beside the screen title “Accounts”, as its own button, over two account rows in a Card. The arrow's accessibilityLabel names where it goes (“Back to Home”), as the guide's Content section says. Each ListItem is pressable as a whole and draws its own forward arrow; the empty onPress handlers stand for the screen's navigation (back to Home, or opening that account).

```tsx
<VStack>
  <HStack alignVertical="center">
    <NavArrow direction="Back" accessibilityLabel="Back to Home" onPress={() => {}} />
    <Text text="Accounts" />
  </HStack>
  <Card>
    <VStack>
      <ListItem layout="Horizontal" title="Savings •• 0245" supportText="₹1,24,500" onPress={() => {}} />
      <ListItem layout="Horizontal" title="Salary •• 1180" supportText="₹48,200" onPress={() => {}} />
    </VStack>
  </Card>
</VStack>
```

**Props:** `direction` (Back | Forward | Down), `modes`, `style`, `accessibilityLabel`, `onPress`, `disabled`. (* required)

**Modes it reads:** Color Mode, context 10, Context2, context5, List Item Style, NavArrow Direction, Page type, Profile Card Appearance.

Full entry: `components/navarrow.md`. Links: `components/navarrow.links.md`.
