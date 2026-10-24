# Nudge (brief)

> Coin agent pack 0.1.78+3 · flagged · full entry: `components/nudge.md` (sources, all facts, flags)

Use a Nudge for a short suggestion with one action, such as splitting a payment, that sits within a screen’s content.

**Use when**
- A short suggestion with one action, such as splitting a payment, that sits within a screen's content.

**Placement**
- A Nudge fills its container: full width, and as tall as its content.
- Long copy wraps and the card grows.
- On the guide's payment screen, the nudge sits between the amount and the Pay button, in a lavender appearance that stands out on the white card.
- `onClose`: The screen handles the nudge's button and removes the nudge on close.

**Key rules**
- **REQUIRED** `showClose`: On stacked-prominent and inline-compact, the close button shows only when onClose is set or showClose is true; showClose false hides it even with onClose, and stacked-detailed never renders it.
- **REQUIRED** `buttonLabel`: The default button renders when buttonLabel or onPressButton is set; buttonSlot set to null removes it.
- `type`: Choose the type for the space and content you have, and an appearance mode for its colour.
- `type` = `stacked-prominent`: stacked-prominent, the default: a title and body stacked beside the icon, the button below.
- `type` = `inline-compact`: inline-compact: one line of text with the button beside it; it has no title.
- `type` = `stacked-detailed`: stacked-detailed: a title over your own content, such as list items; no button or close.
- `type` = `stacked-detailed`: Use stacked-detailed for a list: a title over list items explains the offer.
- Avoid: `type` = `stacked-detailed`: Do not expect an action on stacked-detailed: it ignores the button and close, so people have nothing to tap.

**Example:** A split-payment suggestion on a payment screen, in a lavender appearance; the screen handles the button and removes the nudge on close.

```tsx
<Nudge
  title="Split payment"
  body="Pay ₹12,000 in 3 monthly instalments."
  buttonLabel="See plans"
  onPressButton={() => {}}
  onClose={() => {}}
  modes={{ 'Color Mode': 'Light', AppearanceBrand: 'Secondary' }}
/>
```

**Props:** `type` (stacked-prominent | stacked-detailed | inline-compact), `title`, `body`, `buttonLabel`, `onPressButton`, `buttonSlot`, `onClose`, `showClose`, `closeSlot`, `startSlot`, `children`, `modes`, `style`, `testID`. (* required)

**Modes it reads:** AppearanceBrand, AppearanceSystem, Border Boolean, Button / Size, Button / State, Color Mode, Context, context 10, Context2, Emphasis, Nudge padding, Page type, Profile Card Appearance, Semantic Intent, Slot gap.

**Gaps (report, do not work around)**
- In Color Mode Dark the title stays #1e1a14 on a dark card (#208): the title colour is one literal for every mode.
- No appearance mode reproduces Figma's white card with a purple icon.
- stacked-detailed ignores the body, the button props and the close props, without a warning.
- inline-compact never shows the title, but still uses it as the region's name, an invisible name.
- The default close button's label, “Close”, is fixed.

Full entry: `components/nudge.md`. Links: `components/nudge.links.md`.
