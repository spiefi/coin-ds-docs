# CardInsight (brief)

> Coin agent pack 0.1.78+23 · flagged · full entry: `components/cardinsight.md` (sources, all facts, flags)

Use a Card Insight to show one finding about someone's money: a title, a status badge, one figure, and a hint on what to do next.

**Use when**
- Show one finding about someone's money: a title, a status badge, one figure, and a hint on what to do next.
- A savings insight on an Insights screen.

**Avoid when**
- Avoid: A list of perks: the handwritten Storybook docs, as the evidence records them, point to Benefit Card. Use instead: BenefitCard.
- Avoid: A coverage ring: the handwritten Storybook docs, as the evidence records them, point to Card Financial Condition. Use instead: CardFinancialCondition.
- Avoid: Several insights in one card: the same docs, as the evidence records them, say one finding per card.

**Placement**
- Let the screen set the width: the card fills its host's width (Figma draws it at 356 px).
- `onPressFooter`: Run the screen's own action from the footer's button, through onPressFooter.
- `footerBody`: Once that action is done, the screen passes a new hint and no button label, so the footer has no button; the card doesn't change itself.

**Key rules**
- **REQUIRED** `title`: Set title to the finding's topic: left out, it reads “Emergency savings”.
- **REQUIRED** `subtitle`: Set subtitle yourself: left out, it reads “One line explanation here.”
- **REQUIRED** `badge`: Set badge to the status, or to false for none: left out, it reads “Label”.
- **REQUIRED** `footerBody`: Whenever the default footer shows, set footerBody to your hint: left out, it reads “One line of guidance.”
- **REQUIRED** `footerButtonLabel`: Whenever the default footer shows, set footerButtonLabel to the action, or to an empty string for no button: left out, it reads “Button”.
- **REQUIRED** `onPressFooter`: Whenever the default footer shows a button, give it the screen's action through onPressFooter: without it, the button does nothing.
- `AppearanceBrand`: AppearanceBrand colours the badge and the bar: Primary gold by default, Secondary purple as in Figma, Tertiary blue, or Neutral grey.
- `AppearanceBrand`: The footer has a dark button, as in Figma, until you set AppearanceBrand on the card; then the footer takes that colour too.

**Example:** A savings insight on the Insights screen, the guide's In context before the plan is set: a Title for the screen and the card in a VStack. The card names the finding (the title, one sentence of context, a short status badge) and its footer gives one hint and one action; onPressFooter stands for the screen's own action behind Set up. children is left out: the guide's figure is a SavingsGoalSummary (Saved (4 months) ₹2.4L against Goal (8 months) ₹4.8L), which has no entry in this pack, so the card shows its default figure in its place, a SavingsGoalSummary captioned “Credit usage”. The screen's own figure goes in children: report that it needs one.

```tsx
<VStack>
  <Title title="Insights" subtitle="October 2026" />
  <CardInsight
    title="Emergency savings"
    subtitle="Four of the eight months we suggest."
    badge="On track"
    footerBody="Add ₹10,000 a month to reach it by June."
    footerButtonLabel="Set up"
    onPressFooter={() => {}}
  />
</VStack>
```

**Props:** `title`, `subtitle`, `badge`, `children`, `footer`, `footerBody`, `footerButtonLabel`, `onPressFooter`, `onClose`, `showClose`, `divider`, `modes`, `style`, `onPress`, `disabled`, `accessibilityLabel`. (* required)

**Modes it reads:** Appearance / DataViz, AppearanceBrand, AppearanceSystem, Badge Size, Border Boolean, Button / Size, Button / State, Color Mode, Context, context 10, context 8, Context2, Emphasis, Emphasis / DataViz, LinearProgress Size, Nudge padding, Page type, Profile Card Appearance, Semantic Intent, Slot gap, Text Appearance.

**Gaps (report, do not work around)**
- Figma's badge is green with a white label; the package's default badge is gold (AppearanceBrand Primary). Semantic Intent System gives a green badge with a white label.
- Figma's bar is purple and 16 px; the default figure's bar is gold and 23 px.

Full entry: `components/cardinsight.md`. Links: `components/cardinsight.links.md`.
