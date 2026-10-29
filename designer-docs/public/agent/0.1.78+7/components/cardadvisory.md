# CardAdvisory

> Coin agent pack 0.1.78+7 (pilot). Generated from `components/cardadvisory.json`; the JSON is the source of truth.

- **State:** flagged (1 flag, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `622cd82` · built 2026-10-29T00:57:35Z
- **Category:** card (for discovery only, not a limit on composition) · **Tags:** advisory card, score card, insight card, spending score, financial health
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=cardadvisory) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3780-5784) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-cardadvisory--docs)

Use a Card Advisory to show one score with a sentence on what it means and, if it helps, one next step.

## Use when

- **recommended** Show one score with a sentence on what it means and, if it helps, one next step.  
  _From summary: “Use a Card Advisory to show one score with a sentence on what it means and, if it helps, one next step.”_

## Avoid when

_None in the guide._

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Title | title, 26 px heavy, on one line; a longer title ends in an ellipsis. | yes | anatomy: “26 px heavy, on one line; a longer title ends in an ellipsis.” |
| Info icon | An info icon beside the title, shown by default; showInfoIcon hides it and titleEndSlot replaces it. | no | anatomy: “Shown by default; showInfoIcon hides it and titleEndSlot replaces it.” |
| Description | description, one sentence at 12 px that says what the score means. | yes | anatomy: “One sentence at 12 px that says what the score means.” |
| Score | A 60 px Circular Progress Bar of value out of 100; valueLabel changes the figure. | yes | anatomy: “A 60 px Circular Progress Bar of value out of 100; valueLabel changes the figure.” |
| Nudge | An inline Nudge with nudgeBody and one button (nudgeButtonLabel, onPressNudgeButton); showNudge removes it. | no | anatomy: “An inline Nudge with nudgeBody and one button; showNudge removes it.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `titleEndSlot` | `ReactNode` | types |
| `progressSlot` | `ReactNode` | types |
| `nudgeSlot` | `ReactNode` | types |

## Placement

- **recommended** The card is 360 px wide, set by a token that no mode changes, and as tall as its content: it doesn't stretch or shrink with its host.  
  _From sizing: “The card is 360 px wide, set by a token that no mode changes, and as tall as its content: it doesn’t stretch or shrink with its host.”_
- **recommended** It has no padding or corners: it's a white section for a white screen.  
  _From sizing: “It has no padding or corners: it’s a white section for a white screen.”_
- **recommended** `onPressNudgeButton`: The nudge button runs the screen's own action through onPressNudgeButton.  
  _From inContext: “Add accounts runs the screen’s own action through onPressNudgeButton.”_
- **recommended** `showNudge` = `false`: The card doesn't act on its own: once the next step is done (on the guide's Insights screen, once the accounts are linked), the screen hides the nudge with showNudge and updates the reading.  
  _From inContext: “Once the accounts are linked, the screen hides the nudge with showNudge and updates the reading; the card doesn’t act on its own.”_

## Configuration

- **recommended** `AppearanceBrand`: AppearanceBrand colours the ring, the nudge and its button; the package defaults to Primary, and Storybook uses Neutral.  
  _From configuration: “AppearanceBrand colours the ring, the nudge, and its button: Storybook uses Neutral, and the package defaults to Primary.”_
- **recommended** `AppearanceBrand` = `Primary`: Primary, the package default: a gold ring and a cream nudge.  
  _From configuration: “The package default: a gold ring and a cream nudge.”_
- **recommended** `AppearanceBrand` = `Neutral`: Neutral, Storybook's look: a dark ring and button, a white nudge.  
  _From configuration: “Storybook’s look: a dark ring and button, a white nudge.”_
- **recommended** `Semantic Intent` = `System`: For a score that's good or bad, set Semantic Intent to System and pick AppearanceSystem.  
  _From configuration: “For a score that’s good or bad, set Semantic Intent to System and pick AppearanceSystem.”_
- **recommended** `AppearanceSystem` = `positive`: System with positive: green for a good score.  
  _From configuration: “System with positive: green for a good score.”_
- **recommended** `AppearanceSystem` = `negative`: System with negative: red for a score to act on.  
  _From configuration: “System with negative: red for a score to act on.”_
- **recommended** Brand and status modes colour the ring and the nudge; the card itself stays white.  
  _From configuration: “The card itself stays white.”_
- **recommended** `titleEndSlot`: titleEndSlot replaces the info icon with your own component.  
  _From configuration: “Three slots, titleEndSlot, progressSlot, and nudgeSlot, replace the info icon, the ring, and the nudge with your own components.”_
- **recommended** `progressSlot`: progressSlot replaces the ring with your own component.  
  _From configuration: “Three slots, titleEndSlot, progressSlot, and nudgeSlot, replace the info icon, the ring, and the nudge with your own components.”_
- **recommended** `nudgeSlot`: nudgeSlot replaces the nudge with your own component.  
  _From configuration: “Three slots, titleEndSlot, progressSlot, and nudgeSlot, replace the info icon, the ring, and the nudge with your own components.”_
- **recommended** `showInfoIcon` = `false`: The info icon shows by default: set showInfoIcon false to hide it, or titleEndSlot to replace it.  
  _From anatomy: “Shown by default; showInfoIcon hides it and titleEndSlot replaces it.”_
- **REQUIRED** `value`: value is the score out of 100: the ring clamps it to 0–100.  
  _From fact `/facts/props/3` (value, source evidence)_
- **recommended** `valueLabel`: valueLabel changes the figure shown in the ring.  
  _From anatomy: “A 60 px Circular Progress Bar of value out of 100; valueLabel changes the figure.”_
- **recommended** `showNudge` = `false`: Set showNudge false to remove the nudge, leaving the score and its reading.  
  _From states: “showNudge removes the nudge, leaving the score and its reading.”_
- **REQUIRED** `showNudge` = `false`: showNudge also gates nudgeSlot: with showNudge false, a nudgeSlot doesn't render either.  
  _From fact `/facts/props/6` (showNudge, source evidence)_
- **recommended** `modes`: The card passes its modes to the ring, the nudge and the components in its slots; no mode changes the card's own surface or text.  
  _From fact `/facts/props/13` (modes, source evidence)_
- **recommended** The card's nudge has no Close button: the card passes no onClose, so since the #271 fix its nudge shows none.  
  _From sources: “The card passes no onClose, so since the #271 fix its nudge shows no Close button.”_

## Content

- **recommended** One score, one reading, one next step.  
  _From corePrinciple: “One score, one reading, one next step.”_
- **recommended** `title`: Keep the title to one or two words: it's cut to one line.  
  _From content: “Keep the title to one or two words: it’s cut to one line.”_
- **recommended** `description`: Say what the score means in one sentence.  
  _From content: “Say what the score means in one sentence”_
- **recommended** `nudgeBody`: Give the nudge one reason to act.  
  _From content: “give the nudge one reason to act”_
- **recommended** `nudgeButtonLabel`: Label the nudge's button with a verb, such as “Add accounts”; the default label is “Button”.  
  _From content: “label its button with a verb; the default label is “Button”.”_
- **discouraged** `nudgeButtonLabel`: Do not leave the default label: the button reads “Button” and promises nothing.  
  _From doDont: “The button reads “Button” and promises nothing.”_
- **discouraged** `title`: Do not write a long title: it's cut to one line, so its end is lost.  
  _From doDont: “It's cut to one line, so its end is lost.”_
- **discouraged** `nudgeButtonLabel`: Do not put two actions in the nudge: a long label such as “Add accounts and review bills” squeezes the reason to act.  
  _From doDont: “The long label squeezes the reason to act.”_

Good: “Spending”, “You’re within the plan you set for this month.”, “Data confidence is low. Add more accounts for better insights.”, “Add accounts”, “Spending score 70”, “You’re well within this month’s plan.”, “You’ve used most of this month’s plan.”

Bad: “Button”, “Spending across all your accounts this month”, “Add accounts and review bills”

## States

| State | When | From |
| --- | --- | --- |
| Default | The card has no pressed or disabled state of its own: only the nudge button acts, through onPressNudgeButton. | states: “The card has no pressed or disabled state of its own: only the nudge button acts, through onPressNudgeButton.” |
| With nudge | showNudge true, the default: the score, its reading, and one next step. | states: “The score, its reading, and one next step.” |
| Score only | showNudge false: the nudge is removed, leaving the score and its reading. | states: “showNudge removes the nudge, leaving the score and its reading.” |

## Accessibility

- **recommended** `accessibilityLabel`: Set accessibilityLabel to the score in words, such as “Spending score 70”: the default reads out every line, the nudge included.  
  _From content: “Set accessibilityLabel to the score in words, such as “Spending score 70”, because the default reads out every line, the nudge included.”_
- **recommended** `accessibilityLabel`: Without accessibilityLabel, the card's spoken name reads the title, description, score and nudge text, even when the nudge is hidden.  
  _From sources: “Its default spoken name reads the title, description, score, and nudge text, even when the nudge is hidden.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Label the button with a verb | Leave the default label | The button reads “Button” and promises nothing. |
| Keep the title short | Write a long title | It's cut to one line, so its end is lost. |
| Give the nudge one action | Put two actions in the nudge | The long label squeezes the reason to act. |

## Examples

### A spending score with its reading and one next step, named for screen readers by the score in words.

```tsx
<CardAdvisory
  title="Spending"
  description="You’re within the plan you set for this month."
  value={70}
  nudgeBody="Data confidence is low. Add more accounts for better insights."
  nudgeButtonLabel="Add accounts"
  onPressNudgeButton={() => {}}
  accessibilityLabel="Spending score 70"
/>
```

_From content: ““Spending”, what 70 means this month, and “Add accounts” as the next step, named “Spending score 70”.”_

### A score to act on, in red: Semantic Intent System with AppearanceSystem negative.

```tsx
<CardAdvisory
  title="Spending"
  description="You’ve used most of this month’s plan."
  value={25}
  nudgeBody="Data confidence is low. Add more accounts for better insights."
  nudgeButtonLabel="Add accounts"
  onPressNudgeButton={() => {}}
  accessibilityLabel="Spending score 25"
  modes={{ 'Semantic Intent': 'System', AppearanceSystem: 'negative' }}
/>
```

_From configuration: “System with negative: red for a score to act on.”_

### Score only, after the screen's step is done: on the guide's Insights screen, once the accounts are linked, the screen hides the nudge with showNudge and updates the reading.

```tsx
<CardAdvisory
  title="Spending"
  description="Based on all 3 of your accounts."
  value={70}
  showNudge={false}
  accessibilityLabel="Spending score 70"
/>
```

_From inContext: “Once the accounts are linked, the screen hides the nudge with showNudge and updates the reading; the card doesn’t act on its own.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `accessibilityLabel` | `string` |  |  |  | evidence (2026-10-13) | Without it, the card's root (no role) is named `${title}. ${description}. ${round(value)} out of 100. ${nudgeBody}`: the name includes the nudge text when the nudge is hidden, a double period after a description ending in “.”, and the unclamped value. Declared: Accessibility label for the full card. |
| `title` | `string` |  | `"Spending"` |  | evidence (2026-10-13) | Clamped to one line unless disableTruncation is set. Declared: Main heading text. Default "Spending", from the component source. |
| `description` | `string` |  | `"Track your spending habits and stay within your budget."` |  | evidence (2026-10-13) | Wraps, with no line clamp. Declared: Description shown below the heading. Default "Track your spending habits and stay within your budget.", from the component source. |
| `value` | `number` |  | `70` |  | evidence (2026-10-13) | The ring clamps it to 0–100. Declared: Progress score displayed in the circular progress bar. Default 70, from the component source. |
| `valueLabel` | `string` |  |  |  | evidence (2026-10-13) | Replaces the number in the ring. Declared: Optional formatted score label. |
| `showInfoIcon` | `boolean` |  | `true` |  | types | Show the info icon beside the title. Default true, from the component source. |
| `showNudge` | `boolean` |  | `true` |  | evidence (2026-10-13) | Also gates nudgeSlot: with showNudge false, a nudgeSlot doesn't render either. Declared: Show the bottom advisory nudge. Default true, from the component source. |
| `nudgeBody` | `string` |  | `"Data confidence is low, add more accounts for better insights."` |  | types | Body text for the default nudge. Default "Data confidence is low, add more accounts for better insights.", from the component source. |
| `nudgeButtonLabel` | `string` |  | `"Button"` |  | evidence (2026-10-17) | Also names the nudge button for screen readers (aria-label on the web). Declared: Button label for the default nudge. Default "Button", from the component source. |
| `onPressNudgeButton` | `() => void` |  |  |  | types | Callback for the default nudge button. |
| `titleEndSlot` | `React.ReactNode` |  |  |  | types | Optional slot replacing the title info icon. Receives `modes` recursively. |
| `progressSlot` | `React.ReactNode` |  |  |  | evidence (2026-10-13) | The card forwards no supportText or state to its default ring. Declared: Optional slot replacing the circular progress bar. Receives `modes` recursively. |
| `nudgeSlot` | `React.ReactNode` |  |  |  | evidence (2026-10-13) | The card forwards no title, showClose, onClose or buttonSlot to its default nudge. Declared: Optional slot replacing the bottom nudge. Receives `modes` recursively. |
| `modes` | `Modes` |  |  |  | evidence (2026-10-13) | Reach the ring and the nudge; no mode changes the card's own surface or text. Declared: Design token modes forwarded to token lookups and child components. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Optional container style override. |
| `mainContentStyle` | `StyleProp<ViewStyle>` |  |  |  | types | Optional main content row style override. |
| `titleStyle` | `StyleProp<TextStyle>` |  |  |  | types | Optional title text style override. |
| `descriptionStyle` | `StyleProp<TextStyle>` |  |  |  | types | Optional description text style override. |
| `progressStyle` | `StyleProp<ViewStyle>` |  |  |  | types | Optional progress wrapper style override. |
| `nudgeStyle` | `StyleProp<ViewStyle>` |  |  |  | types | Optional nudge style override. |
| `disableTruncation` | `boolean` |  |  |  | evidence (2026-10-13) | Affects the title only, the card's one clamped text (Biscuit's unpublished 7020bf9 mdx says it also wraps the description and nudge text; the code does not). Declared: When `true`, disables text truncation: the trailing ellipsis (`…`) is never shown and any `numberOfLines` clamp is ignored, so the text wraps to as many lines as it needs even when horizontal space is tight. |
| `...CardAdvisoryBaseProps` | `CardAdvisoryBaseProps` |  |  |  | types | Inherited React Native props the component also accepts. They are not part of the design contract and no guide documents them. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Primary"` |  | evidence (2026-10-13) | Colours the ring's arc and the nudge with its sparkle and button: Primary (the default) a gold arc and a cream nudge; Neutral a dark arc and button with a white nudge (Storybook); Secondary purple; Tertiary blue. The ring's track stays grey. Declared: A token collection CardAdvisory reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `AppearanceSystem` | `mode collection` | positive, warning, negative | `"positive"` |  | evidence (2026-10-13) | With Semantic Intent System: positive green, warning orange, negative red, on the ring (its track too) and the nudge. Declared: A token collection CardAdvisory reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Border Boolean` | `mode collection` | False, True | `"False"` |  | evidence (2026-10-13) | Changes the nudge's border. Declared: A token collection CardAdvisory reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / Size` | `mode collection` | M, S, XS | `"M"` |  | evidence (2026-10-13) | Listed for CardAdvisory, but changes nothing visible. Declared: A token collection CardAdvisory reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / State` | `mode collection` | Idle, Hover, Pressed, Disabled | `"Idle"` |  | evidence (2026-10-13) | Static restyles. Declared: A token collection CardAdvisory reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `circularProgressBar Size` | `mode collection` | S, M | `"S"` |  | evidence (2026-10-13) | M makes the ring 164 px. Declared: A token collection CardAdvisory reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection CardAdvisory reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context` | `mode collection` | Default, Nudge&Alert, CTACard, ListItem | `"Default"` |  | evidence (2026-10-13) | Sets the nudge button's size; the Nudge defaults to Nudge&Alert. Declared: A token collection CardAdvisory reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 10` | `mode collection` | Default, jioPlus | `"Default"` |  | evidence (2026-10-13) | Listed for CardAdvisory, but changes nothing visible. Declared: A token collection CardAdvisory reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context2` | `mode collection` | Default, AppBar | `"Default"` |  | evidence (2026-10-13) | Changes only the nudge's Close icon, and the card's nudge has shown no Close since a116616. Declared: A token collection CardAdvisory reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Emphasis` | `mode collection` | High, Medium, Low | `"High"` |  | evidence (2026-10-13) | Pales the ring's arc and the nudge button. Declared: A token collection CardAdvisory reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Nudge padding` | `mode collection` | Default, None | `"Default"` |  | evidence (2026-10-13) | Changes the nudge's padding. Declared: A token collection CardAdvisory reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | evidence (2026-10-13) | Changes only the nudge's Close icon, and the card's nudge has shown no Close since a116616. Declared: A token collection CardAdvisory reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Profile Card Appearance` | `mode collection` | Default, Premium | `"Default"` |  | evidence (2026-10-13) | Listed for CardAdvisory, but changes nothing visible. Declared: A token collection CardAdvisory reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Semantic Intent` | `mode collection` | Brand, System | `"Brand"` |  | evidence (2026-10-13) | System, with AppearanceSystem, colours the ring (its track too) and the nudge for a status. Declared: A token collection CardAdvisory reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Slot gap` | `mode collection` | S, M, L, XL, XS | `"S"` |  | evidence (2026-10-13) | Listed for CardAdvisory, but changes nothing visible. Declared: A token collection CardAdvisory reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `titleEndSlot` | `React.ReactNode` |  |  |  | types | Optional slot replacing the title info icon. Receives `modes` recursively. |
| `progressSlot` | `React.ReactNode` |  |  |  | types | Optional slot replacing the circular progress bar. Receives `modes` recursively. |
| `nudgeSlot` | `React.ReactNode` |  |  |  | types | Optional slot replacing the bottom nudge. Receives `modes` recursively. |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onPressNudgeButton` | `() => void` |  |  |  | types | Callback for the default nudge button. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- No mode combination reproduces Figma's nudge on Card / Advisory: white, with a purple sparkle. _(evidence, 2026-10-13)_
- The title sits on a 32 px line in code (26 in Figma), so the main row is about 70 px tall against Figma's 64. _(evidence, 2026-10-13)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/avoidWhen` · trace-check: The guide gives no avoidWhen guidance; left empty rather than guessed.
