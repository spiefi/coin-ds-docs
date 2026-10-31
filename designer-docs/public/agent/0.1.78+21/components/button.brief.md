# Button (brief)

> Coin agent pack 0.1.78+21 · flagged · full entry: `components/button.md` (sources, all facts, flags)

Use Button when one clear action moves someone forward, confirms a choice, or completes a task.

**Use when**
- One clear action moves someone forward, confirms a choice, or completes a task.

**Avoid when**
- Avoid: `loading`: Avoid loading as a substitute for transaction progress; it is for while required content is being prepared.

**Placement**
- Place the action where the decision happens, and let surrounding content explain the choice.
- In a wide container, keep the action close to the content it completes.
- Make one action the strongest; competing actions should not share equal emphasis.
- Let container width resolve the layout: the same action can fill a narrow container's width. There is no separate desktop or mobile Button.

**Key rules**
- `type` = `default`: Use type default for most actions; it hugs its label or fills its container when the layout asks it to.
- `type` = `fixed`: Use type fixed for aligned, bounded actions: it keeps long content within the system width limit.
- Avoid: `type` = `fixed`: Do not use type fixed for a full-width action: fixed is bounded by the system and will not fill. Use type default for a footer action that fills its container.
- `type` = `glass`: Use type glass only over a meaningful backdrop such as rich media or a coloured surface.
- Avoid: `type` = `glass`: Do not place type glass on a plain, low-contrast surface: it loses its purpose and can become hard to read.
- `Emphasis`: Appearance identifies the family; Emphasis sets how loudly the action speaks within it.
- `Semantic Intent` = `System`: Reserve Semantic Intent System (AppearanceSystem positive, warning or negative) for an outcome with clear positive, warning or negative meaning.
- `Button / Size` = `M`: Button / Size M: the action leads a screen, sheet or key step.

**Example:** A primary action that leads a step, filling its container's width.

```tsx
<Button
  label="Pay ₹1,250"
  onPress={() => {}}
  style={{ width: '100%' }}
  modes={{ 'Color Mode': 'Light', 'Button / Size': 'M', Emphasis: 'High', 'Semantic Intent': 'Brand', AppearanceBrand: 'Primary' }}
/>
```

**Props:** `label`, `children`, `renderContent`, `leading`, `trailing`, `icon`, `type` (default | glass | fixed), `glassOverlayColor`, `glassIntensity`, `modes`, `onPress`, `disabled`, `style`, `labelStyle`, `accessibilityLabel`, `accessibilityHint`, `accessibilityState`, `webAccessibilityProps`, `loading`, `disableTruncation`. (* required)

**Modes it reads:** AppearanceBrand, AppearanceSystem, Button / Size, Button / State, Color Mode, Context, context 10, Context2, Emphasis, Page type, Profile Card Appearance, Semantic Intent.

Full entry: `components/button.md`. Links: `components/button.links.md`.
