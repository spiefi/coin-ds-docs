# CardFeedback (brief)

> Coin agent pack 0.1.78+21 · documented · full entry: `components/cardfeedback.md` (sources, all facts, flags)

Use a Card Feedback to show the result of an action in the page, such as a payment that went through or failed, with one next step.

**Use when**
- Show the result of an action in the page, such as a payment that went through or failed, with one next step.
- Something people need to finish soon, such as “KYC pending”, with the orange warning status.

**Avoid when**
- Avoid: A message that should disappear on its own: the upstream Storybook docs, as the evidence records them, point to Toast. Use instead: Toast.
- Avoid: An empty screen: the upstream Storybook docs, as the evidence records them, point to Empty State. Use instead: EmptyState.
- Avoid: A decision that blocks the screen: the upstream Storybook docs, as the evidence records them, point to a Popup.

**Placement**
- The card fills its host’s width (Figma draws it at 328 px), so the screen sets the width.
- It’s as tall as its content and at least 59 px, with 12 px padding and 8 px between the icon, the text, and the actions.
- Title and body wrap, and buttons wrap onto a new row when they run out of room.
- Inside a VStack or another Coin container that passes modes down, its parts keep the card’s status colours.

**Key rules**
- **REQUIRED** `onPress`: onPress makes the whole card one button instead; use it only when the card has no buttons inside, and name it with accessibilityLabel.
- `children`: Build it from the card’s parts: Icon, Content, Title, Body, and Action.
- `CardFeedback.Content`: CardFeedback.Content is a full-width column, gap 8, that holds Title, Body and Action.
- `AppearanceSystem`: AppearanceSystem sets the status: positive, the default, is green; warning is orange; negative is red.
- `AppearanceSystem` = `positive`: Positive, the default: green for a result that went through.
- `AppearanceSystem` = `warning`: Warning: orange for something to finish soon.
- `AppearanceSystem` = `negative`: Negative: red for something that failed.
- `AppearanceSystem`: AppearanceSystem colours the panel, the icon, and the buttons in Action.

**Example:** A failed payment on the Pay screen, the guide's In context: a VStack column with the screen's Title and a negative Card Feedback (AppearanceSystem negative, because the payment failed; nothing else sets modes). Try again's onPress is a placeholder for the screen's own retry; when the retry goes through, the screen swaps the card for a positive one, since the card doesn't change itself or time out.

```tsx
<VStack>
  <Title title="Pay Rahul Sharma" subtitle="₹1,250 from HDFC Bank" />
  <CardFeedback modes={{ AppearanceSystem: 'negative' }}>
    <CardFeedback.Icon icon="ic_error" />
    <CardFeedback.Content>
      <CardFeedback.Title>Payment failed</CardFeedback.Title>
      <CardFeedback.Body>Your bank declined the payment. No money was taken.</CardFeedback.Body>
      <CardFeedback.Action>
        <Button label="Try again" onPress={() => {}} />
      </CardFeedback.Action>
    </CardFeedback.Content>
  </CardFeedback>
</VStack>
```

**Props:** `children`, `modes`, `style`, `onPress`, `disabled`, `accessibilityLabel`, `testID`, `CardFeedback.Icon`, `CardFeedback.Content`, `CardFeedback.Title`, `CardFeedback.Body`, `CardFeedback.Action`. (* required)

**Modes it reads:** AppearanceBrand, AppearanceSystem, Color Mode.

**Gaps (report, do not work around)**
- The published Storybook hasn’t been rebuilt: it still renders every story as a pressable card with buttons inside it, and shows the older generated page.
- Emphasis alone still changes nothing on a System button, such as a button in Action: button/background at Semantic Intent System branches only on AppearanceSystem. A token gap, noted on #286's re-test, not CardFeedback's.

Full entry: `components/cardfeedback.md`. Links: `components/cardfeedback.links.md`.
