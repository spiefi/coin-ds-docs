# FavoriteToggle (brief)

> Coin agent pack 0.1.78+19 · flagged · full entry: `components/favoritetoggle.md` (sources, all facts, flags)

Use a Favorite Toggle on an image card so people can save the item for later with one tap.

**Use when**
- On an image card, so people can save the item for later with one tap.
- Saving an item, such as a plan, from its card.

**Avoid when**
- Avoid: On a plain white surface: white glass on white almost disappears. Place it on imagery instead.
- Avoid: A second heart on the same card: two hearts make people wonder which one saves.

**Placement**
- One heart per item, on imagery, saying exactly what gets saved.
- In the guide's In context card, the toggle sits in the top-right corner of the card image.
- Place it on imagery: the frosted circle reads clearly over a photo.
- Use one heart per item: one save action per card.

**Key rules**
- `Favorite Toggle Size`: Size is the only visual choice: Favorite Toggle Size sets it (S 14 px, M 29 px, L 41 px).
- `Favorite Toggle Size` = `M`: With no Favorite Toggle Size the toggle is M (29 px), the Figma size.
- `Favorite Toggle Size` = `M`: Use Medium (29 px) on most cards: it is the Figma size.
- `Favorite Toggle Size` = `S`: Use Small (14 px) only on dense thumbnails: it fits tiny thumbnails but is hard to tap.
- `Favorite Toggle Size` = `L`: Use Large (41 px) on full-width hero images.
- Avoid: `Favorite Toggle Size` = `S`: Don't shrink it on a large card: a 14 px heart is hard to see and to hit.
- `isActive`: Let the screen own the saved state: it keeps the list of saved items and passes each card's toggle its saved state (isActive) and change handler (onChange).
- `isActive`: isActive makes the toggle controlled: it shows that value, and onChange reports the next one for the screen to keep.

**Example:** Save a plan from its card, the guide's In context: the toggle sits in the top-right corner of the card image, and its accessibility label names the plan. The screen keeps the list of saved items; isActive and onChange stand for that wiring, which passes this card its saved state and change handler. Size is left at its default, M (29 px).

```tsx
<FavoriteToggle isActive={false} onChange={(next) => {}} accessibilityLabel="Save Gold savings plan to favorites" />
```

**Props:** `isActive`, `defaultActive`, `icon`, `onChange`, `onPress`, `modes`, `disabled`, `accessibilityLabel`, `accessibilityHint`, `accessibilityState`, `webAccessibilityProps`, `style`, `loading`. (* required)

**Modes it reads:** Color Mode, Favorite Toggle Color, Favorite Toggle Size.

**Gaps (report, do not work around)**
- In a web browser the tap area is only the visible circle (14 px at Small, 29 px at Medium): react-native-web ignores the 44 px hit slop the toggle sets, which phones honour. Still so on 0.1.78-dbe0e02 (Component Bug #541).

Full entry: `components/favoritetoggle.md`. Links: `components/favoritetoggle.links.md`.
