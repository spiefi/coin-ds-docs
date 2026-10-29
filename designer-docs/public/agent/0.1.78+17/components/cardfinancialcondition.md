# CardFinancialCondition

> Coin agent pack 0.1.78+17 (pilot). Generated from `components/cardfinancialcondition.json`; the JSON is the source of truth.

- **State:** flagged (1 flag, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `e7ed622` · built 2026-10-29T09:06:00Z
- **Category:** card (for discovery only, not a limit on composition) · **Tags:** financial condition, protection score, coverage card, insurance score, financial health
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=cardfinancialcondition) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3600-3177) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-cardfinancialcondition--docs)

Use a Card Financial Condition to show one coverage score with a short reading, a hint on what's missing, and one button.

## Use when

- **recommended** Show one coverage score with a short reading, a hint on what's missing, and one button.  
  _From summary: “Use a Card Financial Condition to show one coverage score with a short reading, a hint on what's missing, and one button.”_

## Avoid when

_None in the guide._

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Title | title: the topic in 16 px bold; it wraps rather than cutting off. | yes | anatomy: “The topic in 16 px bold; it wraps rather than cutting off.” |
| Body | body: one short line on what the score covers. | yes | anatomy: “One short line on what the score covers.” |
| Score | A 60 px Circular Progress Bar: empty while Inactive, value out of 100 when Active; progressSlot replaces it. | yes | anatomy: “A 60 px Circular Progress Bar: empty while Inactive, value out of 100 when Active.” |
| Nudge | An inline Nudge with nudgeBody; a line break starts its second line. showNudge removes it. | no | anatomy: “An inline Nudge with nudgeBody; a line break starts its second line.” |
| Divider | A 1 px rule; showDivider removes it. | no | anatomy: “A 1 px rule; showDivider removes it.” |
| Button | A purple Button with buttonLabel; onPressButton runs your action. showButton removes it. | no | anatomy: “A purple Button with buttonLabel; onPressButton runs your action.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `progressSlot` | `ReactNode` | types |
| `nudgeSlot` | `ReactNode` | types |
| `buttonSlot` | `ReactNode` | types |

## Placement

- **recommended** The card has no width of its own: it fills its host, and Figma draws it at 343 px.  
  _From sizing: “The card has no width of its own: it fills its host, and Figma draws it at 343 px.”_
- **recommended** It's as tall as its content, with 16 px padding, 8 px between parts, and 16 px between the text and the 60 px ring.  
  _From sizing: “It’s as tall as its content, with 16 px padding, 8 px between parts, and 16 px between the text and the 60 px ring.”_
- **recommended** The button is always Figma's 32 px, with 14 px text, whatever Context the card has.  
  _From sizing: “The button is always Figma’s 32 px, with 14 px text, whatever Context the card has.”_
- **recommended** `onPressButton`: View details (the button) runs the screen's own action through onPressButton.  
  _From inContext: “View details runs the screen’s own action through onPressButton.”_
- **recommended** `showNudge` = `false`: The card doesn't fetch or work out the score itself: once the person adds cover, the screen passes the new value and hides the nudge with showNudge.  
  _From inContext: “Once the person adds cover, the screen passes the new value and hides the nudge with showNudge; the card doesn’t fetch or work out the score itself.”_

## Configuration

- **recommended** `AppearanceBrand`: AppearanceBrand colours the ring and the nudge: the card defaults to Neutral, and the button stays purple.  
  _From configuration: “AppearanceBrand colours the ring and the nudge: the card defaults to Neutral, and the button stays purple.”_
- **recommended** `AppearanceBrand` = `Neutral`: Neutral, the card's default: a dark ring and a white nudge.  
  _From configuration: “The card’s default: a dark ring and a white nudge.”_
- **recommended** `AppearanceBrand` = `Primary`: Primary: a gold ring and a cream nudge; the button stays purple.  
  _From configuration: “A gold ring and a cream nudge; the button stays purple.”_
- **recommended** `Semantic Intent` = `System`: For a score that's good or bad, set Semantic Intent to System and pick AppearanceSystem: the ring, the nudge, and the button take the status colour.  
  _From configuration: “For a score that’s good or bad, set Semantic Intent to System and pick AppearanceSystem: the ring, the nudge, and the button take the status colour.”_
- **recommended** `AppearanceSystem` = `positive`: System with positive: green for a good score.  
  _From configuration: “System with positive: green for a good score.”_
- **recommended** `AppearanceSystem` = `negative`: System with negative: red for a score to act on.  
  _From configuration: “System with negative: red for a score to act on.”_
- **recommended** `Emphasis`: Emphasis Medium or Low makes the ring and the button paler.  
  _From configuration: “Emphasis Medium or Low makes the ring and the button paler.”_
- **recommended** The card itself stays white in every mode.  
  _From sources: “The card stays white in every mode”_
- **recommended** `progressState` = `Active`: Set progressState to Active to show the score: Inactive, the default, draws an empty ring with a dash; Active fills value out of 100 and prints the number, or valueLabel in its place.  
  _From states: “Inactive, the default, draws an empty ring with a dash; Active fills value out of 100 and prints the number, or valueLabel in its place.”_
- **REQUIRED** `value`: value is the score out of 100: the ring clamps it to 0–100.  
  _From fact `/facts/props/3` (value, source evidence)_
- **recommended** `valueLabel`: valueLabel replaces the number in the ring, such as “72%” with a percent sign.  
  _From states: “valueLabel replaces the number, here with a percent sign.”_
- **recommended** `showNudge` = `false`: Set showNudge false to remove the nudge: the score, a rule, and the button remain.  
  _From configuration: “showNudge, showDivider, and showButton remove their parts; progressSlot, nudgeSlot, and buttonSlot replace them with your own components.”_
- **recommended** `showDivider` = `false`: Set showDivider false to remove the divider: the button sits right under the nudge.  
  _From configuration: “The button sits right under the nudge.”_
- **recommended** `showButton` = `false`: Set showButton false to remove the button.  
  _From configuration: “showNudge, showDivider, and showButton remove their parts; progressSlot, nudgeSlot, and buttonSlot replace them with your own components.”_
- **recommended** `progressSlot`: progressSlot replaces the ring with your own component.  
  _From configuration: “showNudge, showDivider, and showButton remove their parts; progressSlot, nudgeSlot, and buttonSlot replace them with your own components.”_
- **recommended** `nudgeSlot`: nudgeSlot replaces the nudge with your own component.  
  _From configuration: “showNudge, showDivider, and showButton remove their parts; progressSlot, nudgeSlot, and buttonSlot replace them with your own components.”_
- **recommended** `buttonSlot`: buttonSlot replaces the button with your own component.  
  _From configuration: “showNudge, showDivider, and showButton remove their parts; progressSlot, nudgeSlot, and buttonSlot replace them with your own components.”_
- **REQUIRED** `showNudge` = `false`: showNudge also gates nudgeSlot: with showNudge false, a nudgeSlot doesn't render either.  
  _From fact `/facts/props/6` (showNudge, source evidence)_
- **REQUIRED** `showButton` = `false`: showButton also gates buttonSlot: with showButton false, a buttonSlot doesn't render either.  
  _From fact `/facts/props/9` (showButton, source evidence)_

## Content

- **recommended** One score, one gap, one next step.  
  _From corePrinciple: “One score, one gap, one next step.”_
- **recommended** `title`: Use a one- or two-word title for the topic.  
  _From content: “Use a one- or two-word title for the topic and one short line for the body.”_
- **recommended** `body`: Use one short line for the body.  
  _From content: “Use a one- or two-word title for the topic and one short line for the body.”_
- **recommended** `nudgeBody`: Keep the nudge to two lines with a line break between them.  
  _From content: “Keep the nudge to two lines with a line break between them”_
- **recommended** `buttonLabel`: Label the button with a verb, such as “View details”.  
  _From content: “label the button with a verb”_
- **recommended** `nudgeBody`: Keep the nudge to two lines: short lines, one line break.  
  _From doDont: “Short lines, one line break.”_
- **discouraged** `nudgeBody`: Do not write a paragraph in the nudge: it wraps to four lines and pushes the button down.  
  _From doDont: “It wraps to four lines and pushes the button down.”_
- **recommended** `progressState` = `Active`: Show the score when you have it: Active, with the ring at the score.  
  _From doDont: “Show the score when you have it”_
- **discouraged** `progressState` = `Inactive`: Do not leave a known score Inactive: the ring stays empty and the score is lost.  
  _From doDont: “The ring stays empty and the 72 is lost.”_
- **recommended** Pair the score with a next step: the nudge says what's missing and the button opens it.  
  _From doDont: “The nudge says what’s missing and the button opens it.”_
- **discouraged** Do not hide the nudge and the button: that leaves a number with no reading and nothing to do.  
  _From doDont: “A number with no reading and nothing to do.”_
- **recommended** Long copy wraps: nothing is cut off; the title and body wrap and the card grows.  
  _From content: “Nothing is cut off: the title and body wrap and the card grows.”_

Good: “Protection”, “Check your coverage and gaps”, “View details”

Bad: “There may be gaps in your health or life cover because one of your policies ended last month and your family has grown since you bought it”

## States

| State | When | From |
| --- | --- | --- |
| Inactive | progressState Inactive, the default: no score yet, an empty ring with a dash, as in Figma. | states: “No score yet: an empty ring with a dash, as in Figma.” |
| Active | progressState Active: the ring fills value out of 100 and prints the number, or valueLabel in its place. | states: “Inactive, the default, draws an empty ring with a dash; Active fills value out of 100 and prints the number, or valueLabel in its place.” |
| Not pressable | The card has no pressed or disabled state: only the button acts. | states: “The card has no pressed or disabled state: only the button acts.” |

## Accessibility

- **recommended** `accessibilityLabel`: Without accessibilityLabel, while the ring is Active, the card's default spoken name reads the title, the score, and the body, such as “Protection, 72 out of 100. Check your coverage and gaps”.  
  _From content: “The default spoken name reads the title, the score, and the body, such as “Protection, 72 out of 100. Check your coverage and gaps”.”_
- **recommended** `accessibilityLabel`: While the ring is Inactive, the default spoken name leaves out the score: “Protection. Check your coverage and gaps”.  
  _From content: “While the ring is Inactive, it leaves out the score: “Protection. Check your coverage and gaps”.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Keep the nudge to two lines | Write a paragraph in the nudge | It wraps to four lines and pushes the button down. |
| Show the score when you have it | Leave a known score Inactive | The ring stays empty and the 72 is lost. |
| Pair the score with a next step | Hide the nudge and the button | A number with no reading and nothing to do. |

## Examples

### A protection score on the Money screen, the guide's In context: under the page's Title, the card shows the score Active at 72 with its reading and two-line nudge; View details runs the screen's own action through onPressButton.

```tsx
<VStack>
  <Title title="Your money" subtitle="October 2026" />
  <CardFinancialCondition
    title="Protection"
    body="Check your coverage and gaps"
    progressState="Active"
    value={72}
    nudgeBody={'There may be gaps in your health or life cover\nAdd coverage to stay financially secure'}
    buttonLabel="View details"
    onPressButton={() => {}}
  />
</VStack>
```

_From inContext: “View details runs the screen’s own action through onPressButton.”_

### After the person adds cover, the guide's In context: the screen passes the new score and reading and hides the nudge with showNudge; the card doesn't work out the score itself.

```tsx
<CardFinancialCondition
  title="Protection"
  body="Your cover looks complete"
  progressState="Active"
  value={90}
  showNudge={false}
  buttonLabel="View details"
  onPressButton={() => {}}
/>
```

_From inContext: “Once the person adds cover, the screen passes the new value and hides the nudge with showNudge; the card doesn’t fetch or work out the score itself.”_

### A score to act on, in red, the guide's Configuration: Semantic Intent System with AppearanceSystem negative colours the ring, the nudge and the button.

```tsx
<CardFinancialCondition
  title="Protection"
  body="You have gaps in your cover"
  progressState="Active"
  value={30}
  nudgeBody={'There may be gaps in your health or life cover\nAdd coverage to stay financially secure'}
  buttonLabel="View details"
  onPressButton={() => {}}
  modes={{ 'Semantic Intent': 'System', AppearanceSystem: 'negative' }}
/>
```

_From configuration: “System with negative: red for a score to act on.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `accessibilityLabel` | `string` |  |  |  | evidence (2026-10-27) | Without it, the card is named by title, score and body (“Protection, 72 out of 100. Check your coverage and gaps”, or valueLabel in place of the score) while the ring is Active; while it is Inactive (or progressState false) the name leaves out the score (“Protection. Check your coverage and gaps”), and the ring itself reads “Inactive progress”. Declared: Accessibility label for the whole card. |
| `title` | `string` |  | `"Protection"` |  | types | Title text shown in the header. Default "Protection", from the component source. |
| `body` | `string` |  | `"Check your coverage and gaps"` |  | types | Body / description shown below the title. Default "Check your coverage and gaps", from the component source. |
| `value` | `number` |  | `0` |  | evidence (2026-10-19) | The score out of 100; the ring clamps it to 0–100. Declared: Progress score for the circular indicator. Forwarded to CircularProgressBar. Default 0, from the component source. |
| `progressState` | `CircularProgressBarProps['state']` |  | `"Inactive"` |  | types | Visual state of the circular indicator. Forwarded to CircularProgressBar. Default "Inactive", from the component source. |
| `valueLabel` | `string` |  |  |  | evidence (2026-10-19) | Replaces the number in the ring. Declared: Optional formatted value label for the active state. |
| `showNudge` | `boolean` |  | `true` |  | evidence (2026-10-19) | Also gates nudgeSlot: with showNudge false, a nudgeSlot doesn't render either. Declared: Show the bottom advisory nudge. Default true, from the component source. |
| `nudgeBody` | `string` |  | `"There may be gaps in your health or life cover\nAdd coverage to stay financially secure"` |  | types | Body text for the default nudge. Use `\n` to add a second line. Default "There may be gaps in your health or life cover\nAdd coverage to stay financially secure", from the component source. |
| `showDivider` | `boolean` |  | `true` |  | types | Show the bottom divider above the action button. Default true, from the component source. |
| `showButton` | `boolean` |  | `true` |  | evidence (2026-10-19) | Also gates buttonSlot: with showButton false, a buttonSlot doesn't render either. Declared: Show the action button at the bottom of the card. Default true, from the component source. |
| `buttonLabel` | `string` |  | `"View Details"` |  | types | Label for the default action button. Default "View Details", from the component source. |
| `onPressButton` | `() => void` |  |  |  | evidence (2026-10-19) | Runs when the button is pressed; the card itself is not pressable. The button has no disabled or loading state, and the card's nudge has no title, button or close. Declared: Callback for the default action button press. |
| `progressSlot` | `React.ReactNode` |  |  |  | types | Slot replacing the default circular progress bar. Receives `modes` recursively. |
| `nudgeSlot` | `React.ReactNode` |  |  |  | types | Slot replacing the default Nudge. Receives `modes` recursively. |
| `buttonSlot` | `React.ReactNode` |  |  |  | evidence (2026-10-19) | Its components get the button's modes (AppearanceBrand Secondary, Context CTACard over the card's); progressSlot and nudgeSlot get the card's modes. Declared: Slot replacing the default action button. Receives `modes` recursively. |
| `modes` | `Modes` |  |  |  | types | Design token modes forwarded to token lookups and child components. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Container style override. |
| `headerStyle` | `StyleProp<ViewStyle>` |  |  |  | types | Header row style override. |
| `titleStyle` | `StyleProp<TextStyle>` |  |  |  | types | Title text style override. |
| `bodyStyle` | `StyleProp<TextStyle>` |  |  |  | types | Body text style override. |
| `...CardFinancialConditionBaseProps` | `CardFinancialConditionBaseProps` |  |  |  | types | Inherited React Native props the component also accepts. They are not part of the design contract and no guide documents them. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Neutral"` |  | evidence (2026-10-19) | The card sets AppearanceBrand Neutral itself, over the collection's Primary default; the theme's modes and the card's own modes are merged on top of it. Declared: A token collection CardFinancialCondition reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `AppearanceSystem` | `mode collection` | positive, warning, negative | `"positive"` |  | evidence (2026-10-19) | Only with Semantic Intent System: positive green, warning orange, negative red on the ring, the nudge and the button. AppearanceSystem alone does nothing. Declared: A token collection CardFinancialCondition reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Border Boolean` | `mode collection` | False, True | `"False"` |  | evidence (2026-10-19) | Changes the nudge's border. Declared: A token collection CardFinancialCondition reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / Size` | `mode collection` | M, S, XS | `"M"` |  | types | A token collection CardFinancialCondition reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / State` | `mode collection` | Idle, Hover, Pressed, Disabled | `"Idle"` |  | evidence (2026-10-19) | A static restyle of the button. Declared: A token collection CardFinancialCondition reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `circularProgressBar Size` | `mode collection` | S, M | `"S"` |  | evidence (2026-10-19) | M makes the ring 164 px. Declared: A token collection CardFinancialCondition reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection CardFinancialCondition reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context` | `mode collection` | Default, Nudge&Alert, CTACard, ListItem | `"Nudge&Alert"` |  | evidence (2026-10-19) | The card defaults to Nudge&Alert, which its nudge keeps; its button always gets Context CTACard (and AppearanceBrand Secondary), so the card's Context doesn't change the button. Declared: A token collection CardFinancialCondition reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 10` | `mode collection` | Default, jioPlus | `"Default"` |  | evidence (2026-10-19) | jioPlus changes the divider's colour. Declared: A token collection CardFinancialCondition reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context2` | `mode collection` | Default, AppBar | `"Default"` |  | evidence (2026-10-19) | Listed for CardFinancialCondition, but changes nothing visible. Declared: A token collection CardFinancialCondition reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Emphasis` | `mode collection` | High, Medium, Low | `"High"` |  | evidence (2026-10-19) | Medium and Low make the button and the ring's arc paler. Declared: A token collection CardFinancialCondition reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Nudge padding` | `mode collection` | Default, None | `"None"` |  | evidence (2026-10-19) | The card defaults to None, so its nudge has no padding; Default gives the nudge 12 px padding. Declared: A token collection CardFinancialCondition reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | evidence (2026-10-19) | Listed for CardFinancialCondition, but changes nothing visible. Declared: A token collection CardFinancialCondition reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Profile Card Appearance` | `mode collection` | Default, Premium | `"Default"` |  | evidence (2026-10-19) | Listed for CardFinancialCondition, but changes nothing visible. Declared: A token collection CardFinancialCondition reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Semantic Intent` | `mode collection` | Brand, System | `"Brand"` |  | evidence (2026-10-19) | System, with AppearanceSystem, gives the ring, the nudge and the button the status colour: positive green, warning orange, negative red. Declared: A token collection CardFinancialCondition reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Slot gap` | `mode collection` | S, M, L, XL, XS | `"S"` |  | evidence (2026-10-19) | Listed for CardFinancialCondition, but changes nothing visible. Declared: A token collection CardFinancialCondition reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `progressSlot` | `React.ReactNode` |  |  |  | types | Slot replacing the default circular progress bar. Receives `modes` recursively. |
| `nudgeSlot` | `React.ReactNode` |  |  |  | types | Slot replacing the default Nudge. Receives `modes` recursively. |
| `buttonSlot` | `React.ReactNode` |  |  |  | types | Slot replacing the default action button. Receives `modes` recursively. |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onPressButton` | `() => void` |  |  |  | types | Callback for the default action button press. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- Figma's Card/FinancialCondition uses the retired Nudge with a purple sparkle, which no mode reproduces. _(evidence, 2026-10-28)_
- The published Storybook still shows the older generated Card Financial Condition page. _(evidence, 2026-10-28)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/avoidWhen` · trace-check: The guide gives no avoidWhen guidance; left empty rather than guessed.
