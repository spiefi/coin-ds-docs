# CardFinancialCondition (brief)

> Coin agent pack 0.1.78+18 · flagged · full entry: `components/cardfinancialcondition.md` (sources, all facts, flags)

Use a Card Financial Condition to show one coverage score with a short reading, a hint on what's missing, and one button.

**Use when**
- Show one coverage score with a short reading, a hint on what's missing, and one button.

**Placement**
- The card has no width of its own: it fills its host, and Figma draws it at 343 px.
- It's as tall as its content, with 16 px padding, 8 px between parts, and 16 px between the text and the 60 px ring.
- The button is always Figma's 32 px, with 14 px text, whatever Context the card has.
- `onPressButton`: View details (the button) runs the screen's own action through onPressButton.

**Key rules**
- **REQUIRED** `value`: value is the score out of 100: the ring clamps it to 0–100.
- **REQUIRED** `showNudge` = `false`: showNudge also gates nudgeSlot: with showNudge false, a nudgeSlot doesn't render either.
- **REQUIRED** `showButton` = `false`: showButton also gates buttonSlot: with showButton false, a buttonSlot doesn't render either.
- `AppearanceBrand`: AppearanceBrand colours the ring and the nudge: the card defaults to Neutral, and the button stays purple.
- `AppearanceBrand` = `Neutral`: Neutral, the card's default: a dark ring and a white nudge.
- `AppearanceBrand` = `Primary`: Primary: a gold ring and a cream nudge; the button stays purple.
- `Semantic Intent` = `System`: For a score that's good or bad, set Semantic Intent to System and pick AppearanceSystem: the ring, the nudge, and the button take the status colour.
- `AppearanceSystem` = `positive`: System with positive: green for a good score.

**Example:** A protection score on the Money screen, the guide's In context: under the page's Title, the card shows the score Active at 72 with its reading and two-line nudge; View details runs the screen's own action through onPressButton.

```tsx
<VStack>
  <Title title="Your money" subtitle="October 2026" />
  <CardFinancialCondition
    title="Protection"
    body="Check your coverage and gaps"
    progressState="Active"
    value={72}
    nudgeBody={'There may be gaps in your health or life cover\nAdd coverage to stay financially secure'}
    buttonLabel="View details"
    onPressButton={() => {}}
  />
</VStack>
```

**Props:** `accessibilityLabel`, `title`, `body`, `value`, `progressState`, `valueLabel`, `showNudge`, `nudgeBody`, `showDivider`, `showButton`, `buttonLabel`, `onPressButton`, `progressSlot`, `nudgeSlot`, `buttonSlot`, `modes`, `style`, `headerStyle`, `titleStyle`, `bodyStyle`. (* required)

**Modes it reads:** AppearanceBrand, AppearanceSystem, Border Boolean, Button / Size, Button / State, circularProgressBar Size, Color Mode, Context, context 10, Context2, Emphasis, Nudge padding, Page type, Profile Card Appearance, Semantic Intent, Slot gap.

**Gaps (report, do not work around)**
- Figma's Card/FinancialCondition uses the retired Nudge with a purple sparkle, which no mode reproduces.
- The published Storybook still shows the older generated Card Financial Condition page.

Full entry: `components/cardfinancialcondition.md`. Links: `components/cardfinancialcondition.links.md`.
