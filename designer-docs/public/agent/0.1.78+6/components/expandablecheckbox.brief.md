# ExpandableCheckbox (brief)

> Coin agent pack 0.1.78+6 · documented · full entry: `components/expandablecheckbox.md` (sources, all facts, flags)

Use an Expandable Checkbox for one consent whose text is too long for a line, such as agreeing to share KYC details.

**Use when**
- One consent whose text is too long for a line, such as agreeing to share KYC details.
- A long consent: one collapsed line keeps the screen calm, and Read more shows the rest.

**Avoid when**
- Avoid: A short option: Read more would open the same words. Use a Checkbox Item. Use instead: CheckboxItem.

**Placement**
- The row fills its container.
- Idle, the row is 24 px tall (the guide measures “I agree” with its Terms link), with Read more hugging the end 8 px after the checkbox item.
- Open, Read less sits 8 px below the text, and text taller than 450 px scrolls inside the row.
- Open, the sentence wraps inside the row.

**Key rules**
- **REQUIRED** `children`: children replaces the label and the link: when children is given, label and linkLabel are ignored, and the row's modes reach the children.
- **REQUIRED** `disableTruncation` = `true`: disableTruncation true turns off the Idle clamp: no ellipsis, and collapsedLines is ignored, so the label wraps in full.
- Checked and Open are separate: ticking the box doesn't open the text, and Read more doesn't tick the box.
- `collapsedLines` = `2`: When Idle, the label shows one line by default; show two (collapsedLines 2) when the first line alone doesn't make sense.
- `label`: A long consent shows one line and an ellipsis when Idle, and the link moves to its own line.
- `onLinkPress`: Pair linkLabel with onLinkPress: the row leaves opening the document to the screen.
- `disabled` = `true`: Set disabled to dim the row and stop the box changing; Read more still opens the text, so people can read what they agreed to.
- The row forces its toggle Button to Button / Size XS, AppearanceBrand Secondary and Emphasis Low.

**Example:** The required KYC consent before opening an account: the screen keeps the row's checked state and enables Open account only once the consent is ticked (shown unticked, so the Button is disabled).

```tsx
<VStack>
  <ExpandableCheckbox
    label="I agree to share my KYC details with Jio Payments Bank to verify my identity and open this account."
    linkLabel="Terms"
    onLinkPress={() => {}}
    checked={false}
    onValueChange={() => {}}
  />
  <Button label="Open account" disabled onPress={() => {}} />
</VStack>
```

**Props:** `label`, `linkLabel`, `onLinkPress`, `children`, `checked`, `defaultChecked`, `onValueChange`, `expanded`, `defaultExpanded`, `onExpandedChange`, `disabled`, `readMoreLabel`, `readLessLabel`, `collapsedLines`, `disableTruncation`, `modes`, `style`, `labelStyle`, `accessibilityLabel`. (* required)

**Modes it reads:** AppearanceBrand, AppearanceSystem, Button / Size, Button / State, Color Mode, contentInset/Left, contentInset/Right, Context, context 10, Context2, Emphasis, Page type, Profile Card Appearance, Semantic Intent, Slot gap, Text Appearance, Text Sizes, Weight.

**Gaps (report, do not work around)**
- Figma's Expandable Checkbox has only two states, Idle and Open: checked, disabled, the number of collapsed lines and the toggle labels exist only in the package.
- Still different from Figma: the label's line height is 17 in code (16 in Figma), and Read more is 84.9 px wide (81 in Figma).

Full entry: `components/expandablecheckbox.md`. Links: `components/expandablecheckbox.links.md`.
