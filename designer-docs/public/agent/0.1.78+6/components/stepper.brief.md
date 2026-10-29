# Stepper (brief)

> Coin agent pack 0.1.78+6 · documented · full entry: `components/stepper.md` (sources, all facts, flags)

Use a Stepper to show where someone is in a process with several stages, such as KYC, and how each stage went.

**Use when**
- Show where someone is in a process with several stages, such as KYC, and how each stage went.

**Avoid when**
- Avoid: The stages need to run horizontally or be pressed: Stepper is vertical only and not interactive.

**Placement**
- Stepper fills its container, with 8 px on each side.
- Allow at least 52 px per stage: a stage grows when its text wraps, and the connector grows with it.
- Put the next action in a separate button: Stepper isn't pressable.
- Let the screen work out each stage's state and update the Stepper as the person moves on.

**Key rules**
- Give every stage a title.
- Add supporting text (supportingText) to say what the stage involves or how it went.
- Add a date (metaText) when timing matters, as on an order tracker.
- Use titles alone for short processes whose titles say enough; it is compact.
- Set each stage's status: in code it sets both the stage's icon and its colour.
- `Step Status` = `inactive`: Set Step Status to inactive on an upcoming stage, and keep any explicit Step Status matched to the status: an explicit Step Status always wins.
- Set the Step Status mode to inactive on each upcoming stage: upcoming steps render solid purple unless set to inactive.
- Avoid: `Step Status`: Set Step Status on each Step, not in the Stepper's modes: a Stepper-level Step Status colours every step the same.

**Example:** KYC progress with a spoken name, upcoming stages set to inactive, and the next action as a separate Button.

```tsx
<VStack modes={{ 'Color Mode': 'Light' }}>
  <Stepper accessibilityLabel="KYC progress" modes={{ 'Color Mode': 'Light' }}>
    <Step title="Verify PAN" supportingText="Match your PAN with your name" metaText="Done 2 Oct 2026" status="complete" modes={{ 'Color Mode': 'Light' }} />
    <Step title="Add bank account" supportingText="Link the account you’ll invest from" metaText="Started 5 Oct 2026" modes={{ 'Color Mode': 'Light' }} />
    <Step title="Add nominee" supportingText="Choose who receives your investments" metaText="Due by 12 Oct 2026" modes={{ 'Color Mode': 'Light', 'Step Status': 'inactive' }} />
    <Step title="eSign" supportingText="Sign the form with an Aadhaar OTP" modes={{ 'Color Mode': 'Light', 'Step Status': 'inactive' }} />
  </Stepper>
  <Button label="Continue" onPress={() => {}} modes={{ 'Color Mode': 'Light' }} />
</VStack>
```

**Props:** `children`, `modes`, `style`, `testID`, `accessibilityLabel`. (* required)

**Modes it reads:** Step Status.

**Gaps (report, do not work around)**
- The check, cross and alert glyphs are unnamed images.
- Stepper is vertical only and not interactive.
- In Dark mode, complete and warning stages turn red, and supporting text and dates stay near-black (#197); the guide shows Light only.
- The published Storybook predates 0.1.78: its done, error and warning examples show the icon on purple.

Full entry: `components/stepper.md`. Links: `components/stepper.links.md`.
