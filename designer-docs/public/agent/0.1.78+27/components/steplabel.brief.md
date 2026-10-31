# StepLabel (brief)

> Coin agent pack 0.1.78+27 · flagged · full entry: `components/steplabel.md` (sources, all facts, flags)

Use a Step Label to keep a Step’s title, detail and date when you put your own content, such as a button, inside the Step.

**Use when**
- Keep a Step's title, detail and date when you put your own content, such as a button, inside the Step.

**Placement**
- Put a Step Label in a Step's children, beside your own content: the guide's current stage holds a Step Label and an Add nominee button.
- In the guide's nominee example, once the nominee is added, the screen gives the Step back its own text and moves the current stage on.
- A Step Label has no fixed size: it takes the width it's given, which in a Step is everything right of the indicator.
- Its lines set the height: 18 px tall with a title alone, 50 px with all three lines.

**Key rules**
- `title`: The title is always shown: set title to name the stage.
- Avoid: `title`: Don't leave the default title: without a title, a Step Label shows “Stepper Item”.
- `title`: Use the title alone when the stage name says enough: it is compact.
- `supportingText`: Add supportingText for one line on what the stage involves.
- `metaText`: Add a date (metaText) for when the stage finished, started, or is due.
- `subtitle`: The supporting text shows only when supportingText has text and its switch, subtitle, is on.
- `meta`: The date shows only when metaText has text and its switch, meta, is on.
- `meta` = `false`: With meta off, the date stays hidden even though it has text.

**Example:** The guide's In context, adding a nominee while opening a demat account: a Card titled “Open your demat account” holds a Stepper. The done stage and the upcoming stage use the Step's own text; the current stage holds a Step Label and an Add nominee button in an HStack, and the Step Label keeps the stage's title and detail beside the button. The upcoming stage sets the Step Status mode inactive, as the Step entry says; the empty onPress stands for the app's own action.

```tsx
<Card>
  <Card.Title>Open your demat account</Card.Title>
  <VStack>
    <Stepper accessibilityLabel="Account opening progress">
      <Step title="Verify PAN" supportingText="PAN details match your name" metaText="Done 2 Oct 2026" status="complete" />
      <Step>
        <StepLabel title="Add nominee" supportingText="Someone who can claim this account" />
        <HStack>
          <Button label="Add nominee" onPress={() => {}} />
        </HStack>
      </Step>
      <Step title="eSign" supportingText="Sign the form with an Aadhaar OTP" modes={{ 'Step Status': 'inactive' }} />
    </Stepper>
  </VStack>
</Card>
```

**Props:** `title`, `supportingText`, `metaText`, `subtitle`, `meta`, `modes`, `style`, `testID`. (* required)

**Modes it reads:** AppearanceBrand, AppearanceSystem, Color Mode, Emphasis, Semantic Intent.

**Gaps (report, do not work around)**
- Figma's done example shows a green date; the package keeps it grey.
- The published Storybook StepLabel page predates 0.1.78.

Full entry: `components/steplabel.md`. Links: `components/steplabel.links.md`.
