# StepLabel

> Coin agent pack 0.1.78+27 (pilot). Generated from `components/steplabel.json`; the JSON is the source of truth.

- **State:** flagged (1 flag, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `e7ed622` · built 2026-10-31T05:18:28Z
- **Category:** navigation (for discovery only, not a limit on composition) · **Tags:** step title, step text, stepper text, stage label
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=steplabel) · [Figma](https://www.figma.com/design/dSlK8ueQ7wlbyUSZd4f8QO/Coin-Subcomponents?node-id=27-854) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-steplabel--docs)

Use a Step Label to keep a Step’s title, detail and date when you put your own content, such as a button, inside the Step.

## Use when

- **recommended** Keep a Step's title, detail and date when you put your own content, such as a button, inside the Step.  
  _From summary: “Use a Step Label to keep a Step’s title, detail and date when you put your own content, such as a button, inside the Step.”_

## Avoid when

_None in the guide._

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Column | Fills its host’s width; the lines sit 2 px apart. | yes | anatomy: “Fills its host’s width; the lines sit 2 px apart.” |
| Title | 14 px bold; names the stage and is always shown. | yes | anatomy: “14 px bold; names the stage and is always shown.” |
| Supporting text | 12 px; what the stage involves or how it went. | no | anatomy: “12 px; what the stage involves or how it went.” |
| Date | 10 px bold; when it finished, started, or is due. | no | anatomy: “10 px bold; when it finished, started, or is due.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

_No slots._

## Placement

- **recommended** Put a Step Label in a Step's children, beside your own content: the guide's current stage holds a Step Label and an Add nominee button.  
  _From inContext: “The current stage holds a Step Label and an Add nominee button.”_
- **recommended** In the guide's nominee example, once the nominee is added, the screen gives the Step back its own text and moves the current stage on.  
  _From inContext: “Once the nominee is added, the screen gives the Step back its own text and moves the current stage on.”_
- **recommended** A Step Label has no fixed size: it takes the width it's given, which in a Step is everything right of the indicator.  
  _From sizing: “It takes the width it’s given (in a Step, everything right of the indicator)”_
- **recommended** Its lines set the height: 18 px tall with a title alone, 50 px with all three lines.  
  _From sizing: “18 px tall with a title alone, 50 px with all three lines.”_
- **recommended** Long text wraps: nothing is cut off; each line wraps and the label grows.  
  _From sizing: “Nothing is cut off: each line wraps and the label grows.”_

## Configuration

- **recommended** `title`: The title is always shown: set title to name the stage.  
  _From configuration: “The title is always shown.”_
- **discouraged** `title`: Don't leave the default title: without a title, a Step Label shows “Stepper Item”.  
  _From doDont: “Without a title, it shows “Stepper Item”.”_
- **recommended** `title`: Use the title alone when the stage name says enough: it is compact.  
  _From configuration: “Compact, when the stage name says enough.”_
- **recommended** `supportingText`: Add supportingText for one line on what the stage involves.  
  _From configuration: “One line on what the stage involves.”_
- **recommended** `metaText`: Add a date (metaText) for when the stage finished, started, or is due.  
  _From configuration: “When the stage finished, started, or is due.”_
- **recommended** `subtitle`: The supporting text shows only when supportingText has text and its switch, subtitle, is on.  
  _From configuration: “A line of supporting text or a date shows only when it has text and its switch is on: subtitle and meta, as in Figma.”_
- **recommended** `meta`: The date shows only when metaText has text and its switch, meta, is on.  
  _From configuration: “A line of supporting text or a date shows only when it has text and its switch is on: subtitle and meta, as in Figma.”_
- **recommended** `meta` = `false`: With meta off, the date stays hidden even though it has text.  
  _From configuration: “With meta off, the date stays hidden even though it has text.”_
- **recommended** `subtitle` = `false`: With subtitle off, the supporting text stays hidden even though it has text.  
  _From configuration: “Subtitle does the same for supporting text.”_
- **recommended** In Figma there is no Step Label component: it is the text frame inside Step in Coin Subcomponents, whose title, supporting text and Meta text, and subtitle and meta switches, match the props.  
  _From sources: “Figma has no Step Label component: it is the text frame inside Step in Coin Subcomponents, whose title, supporting text, and Meta text and subtitle and meta switches match the props.”_
- **recommended** `modes`: Only Color Mode, and AppearanceBrand for the supporting line, change the label; it takes modes from its own modes prop, its Step, or JFSThemeProvider.  
  _From sources: “Only Color Mode, and AppearanceBrand for the supporting line, change the label, and it takes modes from its own prop, its Step, or JFSThemeProvider.”_
- **recommended** `AppearanceBrand`: Leave AppearanceBrand unset: the supporting text stays dark grey.  
  _From doDont: “Leave the brand mode unset”_
- **discouraged** `AppearanceBrand` = `Primary`: Don't pass AppearanceBrand Primary, on the Step Label or even on the Stepper: it turns the detail gold, 2.4:1 on white.  
  _From doDont: “AppearanceBrand Primary, even on the Stepper, turns the detail gold: 2.4:1 on white.”_

## Content

- **recommended** The stage in words: its name, one line of detail, and when.  
  _From corePrinciple: “The stage in words: its name, one line of detail, and when.”_
- **recommended** `title`: Write the title as the stage in one to four words, in sentence case, such as “Verify PAN”.  
  _From content: “Write the title as the stage in one to four words, in sentence case, such as “Verify PAN”.”_
- **recommended** `title`: Name the stage: “Verify PAN” says what happens here.  
  _From doDont: ““Verify PAN” says what happens here.”_
- **recommended** `supportingText`: Keep the supporting text to one line on what happens or what went wrong.  
  _From content: “Keep the supporting text to one line on what happens or what went wrong”_
- **recommended** `supportingText`: Say what happened in the supporting text: the label looks the same in every stage, and the Step's indicator shows whether the stage is current, done, or failed.  
  _From states: “The Step’s indicator shows whether the stage is current, done, or failed, so say what happened in the supporting text.”_
- **recommended** `metaText`: Start the date with what it marks: Done, Started, or Due by.  
  _From content: “start the date with what it marks: Done, Started, or Due by.”_

Good: “Verify PAN”, “PAN details match your name”, “Done 2 Oct 2026”, “Add nominee”, “Someone who can claim this account”, “Started 5 Oct 2026”, “eSign”, “Sign the form with an Aadhaar OTP”, “Due by 12 Oct 2026”

Bad: “Stepper Item”, “Choose someone who can claim this account and its investments if anything happens to you”

## States

| State | When | From |
| --- | --- | --- |
| No states of its own | A Step Label looks the same in every stage; the Step's indicator shows whether the stage is current, done, or failed. | states: “A Step Label looks the same in every stage.” |
| In a current stage | Black title, grey detail. | states: “Black title, grey detail.” |
| In a done stage | Same colours; the Step's green check says it's done. | states: “Same colours; the green check says it’s done.” |
| In a failed stage | Same colours; the supporting text says what went wrong. | states: “Same colours; the text says what went wrong.” |

## Accessibility

- **recommended** A Step Label has no role or name of its own: the Step around it is announced by the label's title, supporting text of up to 80 characters, and date, and the Step's own title is ignored.  
  _From sources: “It has no role or name of its own: the Step around it is announced by the label’s title, supporting text of up to 80 characters, and date, and the Step’s own title is ignored.”_
- **recommended** `supportingText`: Keep the detail short so it is heard with the title: the guide's stage is read as “Add nominee, Someone who can claim this account”.  
  _From doDont: “The stage is read as “Add nominee, Someone who can claim this account”.”_
- **discouraged** `supportingText`: Don't write a detail line over 80 characters: it is shown but not read (in the guide's example, only “Add nominee” is heard).  
  _From doDont: “Over 80 characters, the detail is shown but not read: only “Add nominee” is heard.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Keep the detail short | Write a long detail line | Over 80 characters, the detail is shown but not read: only “Add nominee” is heard. |
| Leave the brand mode unset | Pass a Primary brand mode | AppearanceBrand Primary, even on the Stepper, turns the detail gold: 2.4:1 on white. |
| Name the stage | Leave the default title | Without a title, it shows “Stepper Item”. |

## Examples

### The guide's In context, adding a nominee while opening a demat account: a Card titled “Open your demat account” holds a Stepper. The done stage and the upcoming stage use the Step's own text; the current stage holds a Step Label and an Add nominee button in an HStack, and the Step Label keeps the stage's title and detail beside the button. The upcoming stage sets the Step Status mode inactive, as the Step entry says; the empty onPress stands for the app's own action.

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

_From inContext: “The current stage holds a Step Label and an Add nominee button.”_

### The guide's Content example: in each Step, a Step Label names the stage in a few words, gives one line of detail, and starts the date with what it marks (Done, Started, Due by). The first stage is done, the second current, and the third upcoming, with the Step Status mode inactive, as the Step entry says.

```tsx
<Stepper>
  <Step status="complete">
    <StepLabel title="Verify PAN" supportingText="PAN details match your name" metaText="Done 2 Oct 2026" />
  </Step>
  <Step>
    <StepLabel title="Add nominee" supportingText="Someone who can claim this account" metaText="Started 5 Oct 2026" />
  </Step>
  <Step modes={{ 'Step Status': 'inactive' }}>
    <StepLabel title="eSign" supportingText="Sign the form with an Aadhaar OTP" metaText="Due by 12 Oct 2026" />
  </Step>
</Stepper>
```

_From content: “start the date with what it marks: Done, Started, or Due by.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `title` | `string` |  | `"Stepper Item"` |  | types | Default "Stepper Item", from the component source. |
| `supportingText` | `string` |  |  |  | types |  |
| `metaText` | `string` |  |  |  | types |  |
| `subtitle` | `boolean` |  | `true` |  | types | Default true, from the component source. |
| `meta` | `boolean` |  | `true` |  | types | Default true, from the component source. |
| `modes` | `Modes` |  |  |  | types |  |
| `style` | `ViewStyle` |  |  |  | types |  |
| `testID` | `string` |  |  |  | types |  |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Primary"` |  | evidence (2026-10-10) | The supporting and date lines resolve with AppearanceBrand Neutral unless the caller sets one. Declared: A token collection StepLabel reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `AppearanceSystem` | `mode collection` | positive, warning, negative | `"positive"` |  | types | A token collection StepLabel reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection StepLabel reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Emphasis` | `mode collection` | High, Medium, Low | `"High"` |  | types | A token collection StepLabel reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Semantic Intent` | `mode collection` | Brand, System | `"Brand"` |  | types | A token collection StepLabel reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

_No slots._

### Events

_No events._

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- Figma's done example shows a green date; the package keeps it grey. _(evidence, 2026-10-28)_
- The published Storybook StepLabel page predates 0.1.78. _(evidence, 2026-10-28)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/avoidWhen` · trace-check: The guide gives no avoidWhen guidance; left empty rather than guessed.
