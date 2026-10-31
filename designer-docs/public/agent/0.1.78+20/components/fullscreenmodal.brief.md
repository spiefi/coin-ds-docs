# FullscreenModal (brief)

> Coin agent pack 0.1.78+20 · flagged · full entry: `components/fullscreenmodal.md` (sources, all facts, flags)

Use a Fullscreen Modal for a focused, full-screen moment, such as an upgrade offer, with a hero, details, and one main action.

**Use when**
- A focused, full-screen moment, such as an upgrade offer, with a hero, details and one main action.
- A confirmation screen: hero text and one button, with no body.

**Placement**
- It fills its screen and scrolls inside it.
- In a block parent it is as tall as its content, with no inner scroll.
- The hero text sits at the bottom of a 532 px space by default; the body starts 16 px below it with 16 px between Sections, and the footer stays at the bottom.
- The close button floats top right: 28 px, 12 px from the top and right.

**Key rules**
- Set the hero copy (eyebrow, headline, supportingText, priceText), add Sections to the body for the details, and choose the footer's button and disclaimer.
- `heroHeight`: heroHeight sets how much space the hero text sits at the bottom of; hero media fills the width behind the hero text.
- `heroHeight`: A lower heroHeight brings the body up; the text stays at the bottom of its space.
- `heroMedia`: Hero media (heroMedia) fills the width at its own ratio behind the hero and the body, and scrolls with them; keep the text off light areas.
- Keep the hero text on a dark background: the modal's own black surface keeps the white text readable.
- Avoid: `heroMedia`: Do not put the hero text over a light photo: the white text gets lost in the image.
- `children`: Put Sections straight in the body (children): they take the modal's dark styling.
- Avoid: `children`: Do not wrap Sections in your own component: they miss the styling and stay white cards.

**Example:** An offer in four lines and one action, the guide's Content example: the eyebrow names the product, the headline gives the benefit in a few words, then one supporting sentence, the price line on its own, and a button labelled with the action. The screen shows it and removes it when close (onClose) or the main button (onPrimaryAction) is pressed.

```tsx
<FullscreenModal
  eyebrow="JioGold"
  headline="Save in gold every month"
  supportingText="Start a monthly SIP from ₹100. Buy and sell any time."
  priceText="No making charges"
  primaryActionLabel="Start a SIP"
  disclaimer="Gold prices change with the market."
  onClose={() => {}}
  onPrimaryAction={() => {}}
/>
```

**Props:** `eyebrow`, `headline`, `supportingText`, `priceText`, `heroMedia`, `heroHeight`, `showClose`, `closeOffsetY`, `onClose`, `trapFocus`, `closeAccessibilityLabel`, `footer`, `primaryActionLabel`, `onPrimaryAction`, `disclaimer`, `children`, `modes`, `style`, `contentContainerStyle`, `testID`. (* required)

**Modes it reads:** Action Footer Radius, AppearanceBrand, AppearanceSystem, Button / Size, Button / State, Color Mode, Context, context 10, Context2, context5, Emphasis, Page type, PageHero Size, Profile Card Appearance, Semantic Intent, Slot gap.

**Gaps (report, do not work around)**
- Figma draws the modal 1228 px tall with a full-height image behind everything; the package gives it its own black surface, so the hero text reads without media, and media you add sits behind the hero and the body.
- The published Storybook predates the 27 October build the guide was checked on.
- In development, React Native's Animated logs a useNativeDriver warning.

Full entry: `components/fullscreenmodal.md`. Links: `components/fullscreenmodal.links.md`.
