# Step (brief)

> Coin agent pack 0.1.78+2 · documented · full entry: `components/step.md` (sources, all facts, flags)

Use a Step for one stage of a process inside a Stepper, such as Verify PAN, with its number or outcome and a line of detail.

**Use when**
- One stage of a process inside a Stepper, such as Verify PAN, with its number or outcome and a line of detail.

**Avoid when**
- Avoid: Placing a stage on its own in Figma: Step itself is a subcomponent in Coin Subcomponents, which designers don't use directly; designers place Steps through Stepper. Use instead: Stepper.
- Avoid: The stage needs to be pressed or focused: Step is not interactive.

**Placement**
- In Figma, place Steps through Stepper in the Components Library.
- A Step fills its column and is at least 52 px tall.
- `children`: The current stage can hold its own action, such as an Upload button, in its children.
- In the guide's Form 16 example, uploading marks the stage done and the screen moves the current stage on.

**Key rules**
- `title`: Give every Step a title.
- `title`: Use the title alone when it says enough; it is compact.
- `supportingText`: Add supporting text when it helps, to say what the stage involves or how it went.
- `metaText`: When it helps, add a date (metaText) for when the stage finished, started, or is due.
- `children`: Pass children to replace the text block with your own content; the row and its connector grow.
- `showLine` = `false`: Set showLine false on a Step you place yourself, outside a Stepper; inside a Stepper, Stepper turns it off on the last stage.
- `index`: Inside a Stepper, the Stepper passes each Step its index, isCurrent and showLine.
- `status`: Set status to set the glyph and colour together.

**Example:** Filing an ITR: the current stage holds its own Upload button in its children, and the upcoming stage is inactive.

```tsx
<Stepper accessibilityLabel="File your ITR" modes={{ 'Color Mode': 'Light' }}>
  <Step title="Verify PAN" supportingText="PAN details match your name" metaText="Done 2 Oct 2026" status="complete" modes={{ 'Color Mode': 'Light' }} />
  <Step title="Upload Form 16" modes={{ 'Color Mode': 'Light' }}>
    <StepLabel title="Upload Form 16" supportingText="Add the PDF from your employer" modes={{ 'Color Mode': 'Light' }} />
    <Button label="Upload" onPress={() => {}} modes={{ 'Color Mode': 'Light', 'Button / Size': 'S' }} />
  </Step>
  <Step title="Review and submit" supportingText="Check your income and file" modes={{ 'Color Mode': 'Light', 'Step Status': 'inactive' }} />
</Stepper>
```

**Props:** `children`, `modes`, `style`, `index`, `showLine`, `connectorStyle`, `title`, `supportingText`, `metaText`, `subtitle`, `meta`, `status` (number | complete | error | warning), `isCurrent`, `withinStepper`, `testID`. (* required)

**Modes it reads:** Color Mode, Step Status.

**Gaps (report, do not work around)**
- The glyph itself has no accessible name; the title and status word carry the meaning.
- Step is not interactive: no focus and no press (no onPress).
- Figma's done example shows a green date; the package keeps it grey.
- The published Storybook predates 0.1.78.

Full entry: `components/step.md`. Links: `components/step.links.md`.
