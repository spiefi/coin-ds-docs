# CardAdvisory (brief)

> Coin agent pack 0.1.78+23 · flagged · full entry: `components/cardadvisory.md` (sources, all facts, flags)

Use a Card Advisory to show one score with a sentence on what it means and, if it helps, one next step.

**Use when**
- Show one score with a sentence on what it means and, if it helps, one next step.

**Placement**
- The card is 360 px wide, set by a token that no mode changes, and as tall as its content: it doesn't stretch or shrink with its host.
- It has no padding or corners: it's a white section for a white screen.
- `onPressNudgeButton`: The nudge button runs the screen's own action through onPressNudgeButton.
- `showNudge` = `false`: The card doesn't act on its own: once the next step is done (on the guide's Insights screen, once the accounts are linked), the screen hides the nudge with showNudge and updates the reading.

**Key rules**
- **REQUIRED** `value`: value is the score out of 100: the ring clamps it to 0–100.
- **REQUIRED** `showNudge` = `false`: showNudge also gates nudgeSlot: with showNudge false, a nudgeSlot doesn't render either.
- `AppearanceBrand`: AppearanceBrand colours the ring, the nudge and its button; the package defaults to Primary, and Storybook uses Neutral.
- `AppearanceBrand` = `Primary`: Primary, the package default: a gold ring and a cream nudge.
- `AppearanceBrand` = `Neutral`: Neutral, Storybook's look: a dark ring and button, a white nudge.
- `Semantic Intent` = `System`: For a score that's good or bad, set Semantic Intent to System and pick AppearanceSystem.
- `AppearanceSystem` = `positive`: System with positive: green for a good score.
- `AppearanceSystem` = `negative`: System with negative: red for a score to act on.

**Example:** A spending score with its reading and one next step, named for screen readers by the score in words.

```tsx
<CardAdvisory
  title="Spending"
  description="You’re within the plan you set for this month."
  value={70}
  nudgeBody="Data confidence is low. Add more accounts for better insights."
  nudgeButtonLabel="Add accounts"
  onPressNudgeButton={() => {}}
  accessibilityLabel="Spending score 70"
/>
```

**Props:** `accessibilityLabel`, `title`, `description`, `value`, `valueLabel`, `showInfoIcon`, `showNudge`, `nudgeBody`, `nudgeButtonLabel`, `onPressNudgeButton`, `titleEndSlot`, `progressSlot`, `nudgeSlot`, `modes`, `style`, `mainContentStyle`, `titleStyle`, `descriptionStyle`, `progressStyle`, `nudgeStyle`, `disableTruncation`. (* required)

**Modes it reads:** AppearanceBrand, AppearanceSystem, Border Boolean, Button / Size, Button / State, circularProgressBar Size, Color Mode, Context, context 10, Context2, Emphasis, Nudge padding, Page type, Profile Card Appearance, Semantic Intent, Slot gap.

**Gaps (report, do not work around)**
- No mode combination reproduces Figma's nudge on Card / Advisory: white, with a purple sparkle.
- The title sits on a 32 px line in code (26 in Figma), so the main row is about 70 px tall against Figma's 64.

Full entry: `components/cardadvisory.md`. Links: `components/cardadvisory.links.md`.
