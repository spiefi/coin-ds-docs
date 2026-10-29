# Stepper

> Coin agent pack 0.1.78+6 (pilot). Generated from `components/stepper.json`; the JSON is the source of truth.

- **State:** documented
- **Package:** jfs-components 0.1.78 · guide commit `e7ed622` · built 2026-10-29T00:33:17Z
- **Category:** navigation (for discovery only, not a limit on composition) · **Tags:** progress steps, timeline, onboarding steps, order tracking
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=stepper) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3228-457) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-stepper--docs)

Use a Stepper to show where someone is in a process with several stages, such as KYC, and how each stage went.

## Use when

- **recommended** Show where someone is in a process with several stages, such as KYC, and how each stage went.  
  _From summary: “Use a Stepper to show where someone is in a process with several stages, such as KYC, and how each stage went.”_

## Avoid when

- **discouraged** The stages need to run horizontally or be pressed: Stepper is vertical only and not interactive.  
  _From sources: “Stepper is vertical only and not interactive”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Indicator | A 36 px circle whose colour and icon show the stage's state. | yes | anatomy: “Circle whose colour and icon show the stage’s state.” |
| Connector | A 2 px line that links a stage to the next one; the last stage has none. | no | anatomy: “A 2 px connector links it to the next stage; the last stage has none.” |
| Upcoming stage | A stage whose pale circle shows it has not started yet. | no | anatomy: “Pale circle: not started yet.” |
| Title | Names the stage; every stage has one. | yes | anatomy: “Names the stage.” |
| Date | When the stage finished, started, or is due. | no | anatomy: “When the stage finished, started, or is due.” |
| Supporting text | What the stage involves, or how it went. | no | anatomy: “What the stage involves, or how it went.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `children` | `ReactNode` | types |

## Placement

- **recommended** Stepper fills its container, with 8 px on each side.  
  _From sizing: “Stepper fills its container with 8 px on each side.”_
- **recommended** Allow at least 52 px per stage: a stage grows when its text wraps, and the connector grows with it.  
  _From sizing: “Each stage is at least 52 px tall and grows when its text wraps; the connector grows with it.”_
- **recommended** Put the next action in a separate button: Stepper isn't pressable.  
  _From inContext: “Stepper isn’t pressable, so the next action is a separate button.”_
- **recommended** Let the screen work out each stage's state and update the Stepper as the person moves on.  
  _From inContext: “The screen works out each stage’s state and updates the Stepper as the person moves on”_

## Configuration

- **recommended** Give every stage a title.  
  _From configuration: “Every stage has a title.”_
- **recommended** Add supporting text (supportingText) to say what the stage involves or how it went.  
  _From configuration: “Add supporting text to say what the stage involves or how it went”_
- **recommended** Add a date (metaText) when timing matters, as on an order tracker.  
  _From configuration: “a date when timing matters, as on an order tracker.”_
- **recommended** Use titles alone for short processes whose titles say enough; it is compact.  
  _From configuration: “Compact, for short processes whose titles say enough.”_
- **recommended** Set each stage's status: in code it sets both the stage's icon and its colour.  
  _From states: “in code the stage’s status sets both its icon and its colour.”_
- **recommended** `Step Status` = `inactive`: Set Step Status to inactive on an upcoming stage, and keep any explicit Step Status matched to the status: an explicit Step Status always wins.  
  _From states: “An upcoming stage needs Step Status set to inactive, and an explicit Step Status always wins, so keep it matched to the status.”_
- **recommended** Set the Step Status mode to inactive on each upcoming stage: upcoming steps render solid purple unless set to inactive.  
  _From evidence: “upcoming steps render solid purple unless set to `inactive`.”_
- **discouraged** `Step Status`: Set Step Status on each Step, not in the Stepper's modes: a Stepper-level Step Status colours every step the same.  
  _From evidence: “A Stepper-level `Step Status` colours every step the same.”_
- **discouraged** Do not put a check on purple, the current colour: a check in the current colour reads as both done and in progress.  
  _From doDont: “A check in the current colour reads as both done and in progress.”_

## Content

- **recommended** Name every stage, and show its state in colour, icon, and words.  
  _From corePrinciple: “Every stage named, its state shown in colour, icon, and words.”_
- **recommended** Name the stage in a few words in its title, such as “Verify PAN”, not an action like “Click to verify”.  
  _From content: “Titles name the stage in a few words, such as “Verify PAN”, not an action like “Click to verify”.”_
- **recommended** Use the supporting text to say what happens or what went wrong: the indicator only says that a stage failed or needs attention, not why.  
  _From content: “Supporting text says what happens or what went wrong: the indicator only says that a stage failed or needs attention, not why.”_
- **recommended** Write the outcome in the text: what failed and what to fix.  
  _From doDont: “The text says what failed and what to fix.”_
- **discouraged** Do not leave the default title, “Stepper Item”: it tells people nothing.  
  _From doDont: ““Stepper Item” tells people nothing.”_

Good: “Verify PAN”, “Add bank account”, “Add nominee”, “eSign”, “Match your PAN with your name”, “Link the account you’ll invest from”, “Choose who receives your investments”, “Sign the form with an Aadhaar OTP”, “PAN details match your name”, “Nominee’s date of birth is missing”, “Account name doesn’t match your PAN”, “Done 2 Oct 2026”, “Started 5 Oct 2026”, “Due by 12 Oct 2026”

Bad: “Stepper Item”, “Click to verify”

## States

| State | When | From |
| --- | --- | --- |
| Done | status complete: a green circle with a check. | states: “Green circle with a check.” |
| Current | The stage in progress (status number): a purple circle with the stage number. | states: “Purple circle with the stage number.” |
| Upcoming | Not started (status number with the Step Status mode inactive): a pale lavender circle. | states: “Pale lavender circle: not started.” |
| Needs attention | status warning: an orange alert; the person must act to continue. | states: “Orange alert: the person must act to continue.” |
| Failed | status error: a red cross; the text says what went wrong. | states: “Red cross: say what went wrong.” |

## Accessibility

- **recommended** `accessibilityLabel`: Give the Stepper a spoken name with accessibilityLabel, such as “KYC progress”.  
  _From inContext: “gives it a spoken name such as “KYC progress””_
- **recommended** Give each stage a title that names it: on the web each stage is read with its title, supporting text of up to 80 characters, and date, plus “Completed”, “Failed”, or “Needs attention”, and the first unfinished stage is marked as current.  
  _From sources: “each stage is read with its title, supporting text of up to 80 characters, and date, plus “Completed”, “Failed”, or “Needs attention”, and the first unfinished stage is marked as current.”_
- **recommended** Say in the text what happened: the icons themselves have no names.  
  _From sources: “The icons themselves have no names, so the text must say what happened.”_
- **discouraged** Do not rely on the icon: a red cross, or “Failed” read aloud, doesn't say what went wrong or how to fix it.  
  _From doDont: “A red cross, or “Failed” read aloud, doesn’t say what went wrong or how to fix it.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Match the icon and colour | Put a check on purple | A check in the current colour reads as both done and in progress. |
| Name each stage | Leave the default titles | “Stepper Item” tells people nothing. |
| Write the outcome | Rely on the icon | A red cross, or “Failed” read aloud, doesn’t say what went wrong or how to fix it. |

## Examples

### KYC progress with a spoken name, upcoming stages set to inactive, and the next action as a separate Button.

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

_From inContext: “Stepper isn’t pressable, so the next action is a separate button.”_

### A short process with titles only.

```tsx
<Stepper accessibilityLabel="KYC progress" modes={{ 'Color Mode': 'Light' }}>
  <Step title="Verify PAN" status="complete" modes={{ 'Color Mode': 'Light' }} />
  <Step title="Add bank account" modes={{ 'Color Mode': 'Light' }} />
  <Step title="Add nominee" modes={{ 'Color Mode': 'Light', 'Step Status': 'inactive' }} />
</Stepper>
```

_From configuration: “Compact, for short processes whose titles say enough.”_

### A failed stage whose supporting text says what went wrong.

```tsx
<Stepper accessibilityLabel="KYC progress" modes={{ 'Color Mode': 'Light' }}>
  <Step title="Verify PAN" supportingText="PAN details match your name" status="complete" modes={{ 'Color Mode': 'Light' }} />
  <Step title="Add bank account" supportingText="Account name doesn’t match your PAN" status="error" modes={{ 'Color Mode': 'Light' }} />
  <Step title="Add nominee" supportingText="Choose who receives your investments" modes={{ 'Color Mode': 'Light', 'Step Status': 'inactive' }} />
</Stepper>
```

_From doDont: “The text says what failed and what to fix.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | evidence (2026-10-05) | Stepper clones every element child with index, its own modes merged into the child's (the child's win), and showLine (false on the last child). It is vertical only, not interactive, and owns no current step. |
| `modes` | `Modes` |  |  |  | evidence (2026-10-05) | Merged into every Step child, whose own modes win; a Step Status set here colours every step the same. |
| `style` | `ViewStyle` |  |  |  | types |  |
| `testID` | `string` |  |  |  | evidence (2026-10-08) | Works on Stepper, Step and StepLabel. |
| `accessibilityLabel` | `string` |  |  |  | evidence (2026-10-08) | Names the list: on the web Stepper renders a ul named by accessibilityLabel, and each Step an li. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Step Status` | `mode collection` | active, inactive, complete, error, warning |  |  | evidence (2026-10-08) | A Step's status alone sets its colour (complete green, error red, warning orange); an explicit Step Status mode still overrides it. Set on the Stepper, Step Status colours every step the same. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types |  |

### Events

_No events._

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- The check, cross and alert glyphs are unnamed images. _(evidence, 2026-10-08)_
- Stepper is vertical only and not interactive. _(evidence, 2026-10-05)_
- In Dark mode, complete and warning stages turn red, and supporting text and dates stay near-black (#197); the guide shows Light only. _(evidence, 2026-10-05)_
- The published Storybook predates 0.1.78: its done, error and warning examples show the icon on purple. _(evidence, 2026-10-17)_

## Flags

_None._
