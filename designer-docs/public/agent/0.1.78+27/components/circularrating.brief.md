# CircularRating (brief)

> Coin agent pack 0.1.78+27 · flagged · full entry: `components/circularrating.md` (sources, all facts, flags)

Use a Circular Rating to show a score out of 100, such as credit health, as a dotted ring with your verdict and one next step.

**Use when**
- Show a score out of 100, such as credit health, as a dotted ring with your verdict and one next step.
- A score, what it means, and what to do next.
- Credit health with a next step, as in the guide's In context.

**Avoid when**
- Avoid: A column narrower than 340 px: Circular Rating doesn't resize.
- Avoid: A score on a scale other than 0 to 100: Circular Rating has no max or format prop, and always shows the score out of 100.

**Placement**
- A Circular Rating doesn't resize.
- The ring is 320 px with 18 px dots, inside 10 px of padding, and the nudge is 312 px: give it a column at least 340 px wide.
- With the nudge it measures 340 × 478 px: the ring 320 × 320, the footer row 320 × 16 and the nudge 312 × 58.
- The screen passes the score and its tier, and wires both actions: on the guide's credit health screen the tier opens the score's breakdown and Pay now opens the card bill.

**Key rules**
- You write the label, tier, footer and nudge; the score comes from value.
- Choose how many dots make the ring (dotCount), and whether the footer icon (showFooterIcon) and the nudge (showNudge) show.
- `value`: Set value to the score: left out, the ring shows 72.
- `value`: The score shows value rounded, out of a fixed 100, with no “%”.
- `showNudge` = `false`: showNudge={false}: the score and its footer, when there's no next step.
- `showFooterIcon` = `false`: showFooterIcon={false}: just the update line.
- `dotCount` = `12`: dotCount 12: twelve dots, each standing for more of the score.
- Avoid: `dotCount`: Don't go past about 50 dots: they overlap.

**Example:** Credit health with a next step, the guide's In context: a score of 64 with the tier “Fair”, which the screen picks for that score, a dated footer, and a nudge whose Pay now button is the next step. onTierPress stands for opening the score's breakdown (it makes the tier a button with a chevron), and onPressNudgeButton for opening the card bill.

```tsx
<CircularRating
  value={64}
  label="Credit health"
  tierLabel="Fair"
  footerText="Updated on 8 Oct 2026"
  nudgeBody="Pay your card bill in full to raise your score"
  nudgeButtonLabel="Pay now"
  onTierPress={() => {}}
  onPressNudgeButton={() => {}}
/>
```

**Props:** `accessibilityLabel`, `value`, `dotCount`, `label`, `tierLabel`, `footerText`, `showFooterIcon`, `showNudge`, `nudgeBody`, `nudgeButtonLabel`, `onPressNudgeButton`, `onTierPress`, `footerSlot`, `nudgeSlot`, `modes`, `style`, `ratingStyle`, `footerStyle`, `footerTextStyle`, `nudgeStyle`, `disableTruncation`. (* required)

**Modes it reads:** AppearanceBrand, AppearanceSystem, Border Boolean, Button / Size, Button / State, Color Mode, Context, context 10, Context2, Emphasis, Nudge padding, Page type, Profile Card Appearance, Semantic Intent, Slot gap.

**Gaps (report, do not work around)**
- Figma draws 26 dots, all lit, on a slightly smaller ring, with a white nudge; the package draws 24 dots lit by the score and colours the nudge with the ring.
- At Emphasis Medium and Low the default gold lit dots vanish against the grey track, at 1.00:1 and 1.09:1 (token problem #251, open); at Emphasis High the gold is 1.99:1.
- Screen readers hear the label, score and tier twice: in the progress bar's name and again as text.

Full entry: `components/circularrating.md`. Links: `components/circularrating.links.md`.
