# StatusHero (brief)

> Coin agent pack 0.1.78+18 · flagged · full entry: `components/statushero.md` (sources, all facts, flags)

Use a Status Hero at the top of a result screen to confirm what just happened: a mark, the amount, a title, and one line.

**Use when**
- At the top of a result screen, to confirm what just happened: a mark, the amount, a title, and one line.
- Say what happened, then the one thing that follows.
- The screen after a payment, mandate, or setup succeeds (Biscuit's Storybook page).

**Avoid when**
- Avoid: A history of payments: this hero is one result; put the history in Transaction Details. Use instead: TransactionDetails.
- Avoid: A payment in a list: use a TransactionBubble. Use instead: TransactionBubble.
- Avoid: A portfolio total: Biscuit's Storybook page names PortfolioHero, which has no entry in this pack. Use instead: PortfolioHero.

**Placement**
- Put it at the top of a result screen.
- The guide's example, the screen after a setup: Start saving swaps the setup screen for the result; the hero confirms it, and Done below leaves.
- The hero has no button of its own, so the screen adds one.
- The media sits on top; the title and the subtitle follow. Everything is centred.

**Key rules**
- `Semantic Intent` = `System`: Set Semantic Intent to System and AppearanceSystem colours the mark green, orange, or red; pick a matching iconName.
- `AppearanceSystem` = `positive`: AppearanceSystem positive, with Semantic Intent System: green, it went through.
- `AppearanceSystem` = `warning`: AppearanceSystem warning, with Semantic Intent System: orange, still waiting (the guide's card uses iconName ic_warning).
- `AppearanceSystem` = `negative`: AppearanceSystem negative, with Semantic Intent System: red, it didn't happen (the guide's card uses iconName ic_close).
- `iconName`: Make the mark match the result: a red cross for a failed payment.
- Avoid: Don't show a success mark on a failure.
- `renderMedia`: renderMedia replaces the mark and the amount with your own content, such as a picture.
- `renderMedia`: Content in renderMedia gets the hero's modes as defaults; each element's own modes win, and fragments and arrays get them on every element child.

**Example:** The screen after a setup, the guide's In context: Start saving swaps the setup screen for this one; the hero confirms it and Done below leaves, because the hero has no button of its own. The copy is the guide's Daily savings started hero; the mark keeps its default.

```tsx
<VStack justifyVertical="space-between">
  <StatusHero
    title="Daily savings started"
    subtitle="₹50 will move from HDFC Bank ··4821 to your gold locker every morning."
    value="50"
  />
  <Button label="Done" onPress={() => {}} />
</VStack>
```

**Props:** `renderMedia`, `title`, `showTitle`, `subtitle`, `iconName`, `value`, `currency`, `modes`, `style`, `accessibilityLabel`. (* required)

**Modes it reads:** AppearanceBrand, AppearanceSystem, Color Mode, Context, Context3, Emphasis, Icon Capsule Size, Page type, Semantic Intent.

**Gaps (report, do not work around)**
- With the default copy the hero is 269 px tall where Figma's is 259: its amount and title sit on 44 and 24 px lines, Figma's on 36 and 22 (reported in #398).

Full entry: `components/statushero.md`. Links: `components/statushero.links.md`.
