# CardCTA (brief)

> Coin agent pack 0.1.78+27 · flagged · full entry: `components/cardcta.md` (sources, all facts, flags)

Use a Card CTA to offer one next step, such as setting up UPI or rating an insight, with a title, a short line, and a button.

**Use when**
- Offer one next step, such as setting up UPI or rating an insight, with a title, a short line and a button.
- One prompt, one button.
- A prompt with one next step: the card doesn’t complete the action; its button does, as the card’s handwritten Storybook docs say in the evidence’s record.
- `type`: Pick the type by the step: cta for an offer or setup step, rating for a score and a reaction, sip for a person or plan, as the evidence records the handwritten Storybook docs.

**Avoid when**
- Avoid: A status message: the card’s handwritten Storybook docs, as the evidence records them, use Card Feedback. Use instead: CardFeedback.
- Avoid: A bank summary: the handwritten Storybook docs, as the evidence records them, use Card Bank Account or Card Provider Info for a bank or product summary. Use instead: CardBankAccount.
- Avoid: A product summary: the handwritten Storybook docs, as the evidence records them, use Card Provider Info or Card Bank Account for a bank or product summary. Use instead: CardProviderInfo.
- Avoid: A second primary button: don’t add one, as the evidence records the handwritten Storybook docs.

**Placement**
- On the guide’s Home screen, the prompt sits under the screen’s greeting.
- `onPressButton`: The screen owns the step: on the guide’s Home screen, Set up opens the screen’s own setup flow through onPressButton, and the card doesn’t do the setup or remove itself.

**Key rules**
- `type` = `cta`: type sets the layout: cta, the default, puts the title, body and button beside an icon.
- `type` = `rating`: rating adds a badge above and like and dislike beside the button.
- `type` = `sip`: sip adds an avatar and a line of facts above the button.
- `type`: type also accepts the Figma names CTA, Rating and Sip.
- `type`: Props for one type do nothing on the others.
- `iconName`: Set iconName to the step’s icon: left out, the cta capsule shows ic_upi_number.
- `iconSlot`: iconSlot, buttonSlot, ratingBadgeSlot, ratingActionsSlot and avatarSlot replace a type’s parts and get the card’s modes.
- `buttonSlot`: iconSlot and buttonSlot take your own IconCapsule and Button.

**Example:** The setup prompt on the Home screen, the guide’s In context: a Title greeting over a cta card with the UPI Number icon and the Set up Button. The greeting and balance are the guide’s; onPressButton stands for the screen opening its own setup flow (the card doesn’t do the setup or remove itself).

```tsx
<VStack>
  <Title title="Good morning, Priya" subtitle="Your balance is ₹12,450" />
  <CardCTA
    type="cta"
    title="Set up UPI Number"
    body="Receive money on your mobile number."
    iconName="ic_upi_number"
    buttonLabel="Set up"
    onPressButton={() => {}}
  />
</VStack>
```

**Props:** `type` (cta | rating | sip | CTA | Rating | Sip), `title`, `body`, `badge`, `caption`, `iconName`, `buttonLabel`, `onPressButton`, `ratingLabel`, `showRatingActions`, `showButton`, `ratingMediaAlign` (center | start), `onPressLike`, `onPressDislike`, `headline`, `description`, `subtitle`, `avatarSource`, `disableTruncation`, `likeAccessibilityLabel`, `dislikeAccessibilityLabel`, `iconAccessibilityLabel`, `avatarAccessibilityLabel`, `modes`, and 6 more. (* required)

**Modes it reads:** AppearanceBrand, AppearanceSystem, Avatar Size, Badge Size, Button / Size, Button / State, Color Mode, Context, context 10, context 8, context 9, Context2, Context4, Emphasis, Icon Capsule Size, MediaBlock, Page type, Profile Card Appearance, Semantic Intent.

**Gaps (report, do not work around)**
- The title’s line is 20 px where Figma’s is 18.
- Like and dislike are 26 px where Figma’s are 28.

Full entry: `components/cardcta.md`. Links: `components/cardcta.links.md`.
