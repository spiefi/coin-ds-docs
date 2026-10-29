# Step

> Coin agent pack 0.1.78+12 (pilot). Generated from `components/step.json`; the JSON is the source of truth.

- **State:** documented
- **Package:** jfs-components 0.1.78 · guide commit `e7ed622` · built 2026-10-29T04:33:30Z
- **Category:** navigation (for discovery only, not a limit on composition) · **Tags:** stepper item, stage, timeline item, progress step
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=step) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3228-457) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-step--docs)

Use a Step for one stage of a process inside a Stepper, such as Verify PAN, with its number or outcome and a line of detail.

## Use when

- **recommended** One stage of a process inside a Stepper, such as Verify PAN, with its number or outcome and a line of detail.  
  _From summary: “Use a Step for one stage of a process inside a Stepper, such as Verify PAN, with its number or outcome and a line of detail.”_

## Avoid when

- **discouraged** Placing a stage on its own in Figma: Step itself is a subcomponent in Coin Subcomponents, which designers don't use directly; designers place Steps through Stepper. Use instead: `Stepper`.  
  _From sources: “Step itself is a subcomponent in Coin Subcomponents, which designers don’t use directly.”_
- **discouraged** The stage needs to be pressed or focused: Step is not interactive.  
  _From evidence: “Not interactive: no focus, no press.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Indicator | A 36 px circle; its colour shows the state. | yes | anatomy: “36 px circle; its colour shows the state.” |
| Glyph | The stage number, or a check, cross, or alert. | yes | anatomy: “The stage number, or a check, cross, or alert.” |
| Connector | A 2 px line to the next stage; showLine turns it off. | no | anatomy: “A 2 px line to the next stage.” |
| Title | 14 px bold; names the stage. | yes | anatomy: “14 px bold; names the stage.” |
| Supporting text | 12 px; what the stage involves or how it went. | no | anatomy: “12 px; what the stage involves or how it went.” |
| Date | 10 px bold; when it finished, started, or is due. | no | anatomy: “10 px bold; when it finished, started, or is due.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `children` | `ReactNode` | types |

## Placement

- **recommended** In Figma, place Steps through Stepper in the Components Library.  
  _From sources: “In Figma, designers place Steps through Stepper in the Components Library”_
- **recommended** A Step fills its column and is at least 52 px tall.  
  _From sizing: “A Step fills its column and is at least 52 px tall.”_
- **recommended** `children`: The current stage can hold its own action, such as an Upload button, in its children.  
  _From inContext: “The current stage holds its own Upload button.”_
- **recommended** In the guide's Form 16 example, uploading marks the stage done and the screen moves the current stage on.  
  _From inContext: “Uploading marks the stage done, and the screen moves the current stage on.”_

## Configuration

- **recommended** `title`: Every Step has a title: set title, unless children replace the text block and the title prop.  
  _From configuration: “Every Step has a title.”_
- **recommended** `title`: Use the title alone when it says enough; it is compact.  
  _From configuration: “Compact, when the title says enough.”_
- **recommended** `supportingText`: Add supporting text when it helps, to say what the stage involves or how it went.  
  _From configuration: “Add supporting text and a date when they help”_
- **recommended** `metaText`: When it helps, add a date (metaText) for when the stage finished, started, or is due.  
  _From configuration: “When the stage finished, started, or is due.”_
- **recommended** `children`: Pass children to replace the text block and the title prop with your own content; the row and its connector grow.  
  _From configuration: “Children replace the text block and the title prop; the row and its connector grow.”_
- **recommended** `showLine` = `false`: Set showLine false on a Step you place yourself, outside a Stepper; inside a Stepper, Stepper turns it off on the last stage.  
  _From configuration: “Stepper turns it off on the last stage; turn it off on a Step you place yourself.”_
- **recommended** `index`: Inside a Stepper, the Stepper passes each Step its index, isCurrent and showLine.  
  _From evidence: “Inside a Stepper, each Step gets its index, the Stepper's modes (its own win), `isCurrent` on the first step that isn't complete, and no connector on the last step.”_
- **recommended** `status`: Set status to set the glyph and colour together.  
  _From states: “A Step’s status sets its glyph and colour together”_
- **recommended** `Step Status` = `inactive`: Set the Step Status mode to inactive on an upcoming stage.  
  _From states: “an upcoming stage needs the Step Status mode set to inactive.”_
- **recommended** `Step Status`: If you set Step Status explicitly, keep it matched to the status: an explicit Step Status always wins.  
  _From states: “An explicit Step Status always wins, so keep it matched to the status.”_
- **discouraged** `Step Status` = `active`: Do not set Step Status active on a done stage: an explicit Step Status of active overrides the green.  
  _From doDont: “An explicit Step Status of active overrides the green.”_
- **recommended** `showLine` = `false`: On the last Step you place yourself, turn off the connector: a connector with no next stage looks unfinished (inside a Stepper, Stepper does this).  
  _From doDont: “A connector with no next stage looks unfinished.”_

## Content

- **recommended** One stage: its name, its state, and what happened.  
  _From corePrinciple: “One stage: its name, its state, and what happened.”_
- **recommended** `title`: Write the title as the stage in a few words, such as “Verify PAN”, not an action.  
  _From content: “Write the title as the stage in a few words, such as “Verify PAN”, not an action.”_
- **recommended** `supportingText`: Use the supporting text for what happens or what went wrong, and the date for when.  
  _From content: “Use the supporting text for what happens or what went wrong, and the date for when.”_
- **recommended** Say in the text why a stage failed: the glyph only says that it failed, not why.  
  _From content: “The glyph only says that a stage failed, not why.”_
- **discouraged** `title`: Do not leave the default title: “Stepper Item” tells people nothing, and it's read as “Step 1”.  
  _From doDont: ““Stepper Item” tells people nothing, and it’s read as “Step 1”.”_
- **recommended** `supportingText`: Screen readers hear the title, supporting text of up to 80 characters, and the date.  
  _From content: “Screen readers hear the title, supporting text of up to 80 characters, and the date.”_

Good: “Verify PAN”, “Upload Form 16”, “Review and submit”, “Add nominee”, “eSign”, “Match your PAN with your name”, “PAN details match your name”, “Add the PDF from your employer”, “Nominee’s date of birth is missing”, “Account name doesn’t match your PAN”, “Sign the form with an Aadhaar OTP”, “Started 5 Oct 2026”, “Done 2 Oct 2026”

Bad: “Stepper Item”

## States

| State | When | From |
| --- | --- | --- |
| Current | status number with no Step Status mode: purple with the stage number. | states: “Purple with the stage number.” |
| Upcoming | status number with the Step Status mode inactive: pale lavender, not started. | states: “Pale lavender: not started.” |
| Done | status complete: green with a check; read as “Completed”. | states: “Green with a check; read as “Completed”.” |
| Needs attention | status warning: an orange alert; read as “Needs attention”. | states: “Orange alert; read as “Needs attention”.” |
| Failed | status error: a red cross; read as “Failed”. | states: “Red cross; read as “Failed”.” |

## Accessibility

- **recommended** `title`: Name the stage in its visible copy: in a Stepper a Step is read as its title (or a StepLabel child's title), supporting text of up to 80 characters, the date, and “Completed”, “Failed”, or “Needs attention”.  
  _From sources: “On the web each Step in a Stepper is a list item read as its visible copy: the title (or a StepLabel child’s title), supporting text of up to 80 characters, the date, and “Completed”, “Failed”, or “Needs attention”.”_
- **recommended** `children`: With custom children, screen readers hear the StepLabel child's text.  
  _From configuration: “Screen readers hear the StepLabel child’s text.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Match the icon and colour | Put a check on purple | An explicit Step Status of active overrides the green. |
| Turn off the last connector | Leave a hanging line | A connector with no next stage looks unfinished. |
| Name the stage | Leave the default title | “Stepper Item” tells people nothing, and it’s read as “Step 1”. |

## Examples

### Filing an ITR: the current stage holds its own Upload button in its children, and the upcoming stage is inactive.

```tsx
<Stepper accessibilityLabel="File your ITR" modes={{ 'Color Mode': 'Light' }}>
  <Step title="Verify PAN" supportingText="PAN details match your name" metaText="Done 2 Oct 2026" status="complete" modes={{ 'Color Mode': 'Light' }} />
  <Step modes={{ 'Color Mode': 'Light' }}>
    <StepLabel title="Upload Form 16" supportingText="Add the PDF from your employer" modes={{ 'Color Mode': 'Light' }} />
    <Button label="Upload" onPress={() => {}} modes={{ 'Color Mode': 'Light', 'Button / Size': 'S' }} />
  </Step>
  <Step title="Review and submit" supportingText="Check your income and file" modes={{ 'Color Mode': 'Light', 'Step Status': 'inactive' }} />
</Stepper>
```

_From inContext: “The current stage holds its own Upload button.”_

### A done Step placed on its own, with its connector turned off.

```tsx
<Step title="Verify PAN" supportingText="PAN details match your name" status="complete" showLine={false} modes={{ 'Color Mode': 'Light' }} />
```

_From configuration: “turn it off on a Step you place yourself.”_

### A failed stage whose supporting text says what went wrong.

```tsx
<Step title="Add bank account" supportingText="Account name doesn’t match your PAN" status="error" showLine={false} modes={{ 'Color Mode': 'Light' }} />
```

_From content: “Use the supporting text for what happens or what went wrong, and the date for when.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | evidence (2026-10-28) | Replace the default StepLabel and get Step's modes; the Step's own title and date are then ignored, and a StepLabel child's title, supporting text and date make the name. |
| `modes` | `Modes` |  |  |  | types |  |
| `style` | `ViewStyle` |  |  |  | types |  |
| `index` | `number` |  | `0` |  | evidence (2026-10-10) | Default 0; the number shows index + 1. Inside a Stepper each Step gets its index. Declared: Default 0, from the component source. |
| `showLine` | `boolean` |  | `true` |  | evidence (2026-10-10) | Stepper sets it false on the last step; a standalone Step keeps index 0, a connector, and no current marker unless set. Declared: Default true, from the component source. |
| `connectorStyle` | `ViewStyle` |  |  |  | types |  |
| `title` | `string` |  |  |  | evidence (2026-10-10) | StepLabel shows “Stepper Item” when title is unset. |
| `supportingText` | `string` |  |  |  | types |  |
| `metaText` | `string` |  |  |  | evidence (2026-10-28) | The date; screen readers read it with the title, the supporting text and the outcome word. |
| `subtitle` | `boolean` |  | `true` |  | evidence (2026-10-10) | Default true; false hides the supporting text. Declared: Default true, from the component source. |
| `meta` | `boolean` |  | `true` |  | evidence (2026-10-10) | Default true; false hides the date. Declared: Default true, from the component source. |
| `status` | `StepStatus` | number, complete, error, warning | `"number"` |  | evidence (2026-10-17) | Sets the glyph, and the colour when no Step Status mode is set (complete green, error red, warning orange); an explicit Step Status still wins. Declared: Default "number", from the component source. |
| `isCurrent` | `boolean` |  | `false` |  | evidence (2026-10-10) | Set by Stepper on the first step that isn't complete; on the web the Step then has aria-current="step". Declared: Set by Stepper: this is the current incomplete step. Default false, from the component source. |
| `withinStepper` | `boolean` |  | `false` |  | evidence (2026-10-28) | Set by Stepper; then the Step is a list item (with aria-current when current). A Step on its own is a group with the same name. Declared: Set by Stepper. Standalone Steps are not list items. Default false, from the component source. |
| `testID` | `string` |  |  |  | types |  |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection Step reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Step Status` | `mode collection` | active, inactive, complete, error, warning | `"active"` |  | evidence (2026-10-10) | Overrides the colour status picks; upcoming lavender (inactive) only comes from this mode. Declared: A token collection Step reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types |  |

### Events

_No events._

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- The status glyph is an unnamed image on the web rather than hidden; the title and status word carry the meaning. _(evidence, 2026-10-17)_
- The published Storybook Step page is still the old stub. _(evidence, 2026-10-17)_
- Step is not interactive: no focus and no press (no onPress). _(evidence, 2026-10-10)_
- Figma's done example shows a green date; the package keeps it grey. _(evidence, 2026-10-11)_

## Flags

_None._
