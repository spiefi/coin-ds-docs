# CardInsight

> Coin agent pack 0.1.78+26 (pilot). Generated from `components/cardinsight.json`; the JSON is the source of truth.

- **State:** flagged (1 flag, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `b4988c5` · built 2026-10-31T03:54:03Z
- **Category:** card (for discovery only, not a limit on composition) · **Tags:** insight card, savings goal card, savings insight, goal progress, spending insight
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=cardinsight) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3702-17347) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-cardinsight--docs)

Use a Card Insight to show one finding about someone's money: a title, a status badge, one figure, and a hint on what to do next.

## Use when

- **recommended** Show one finding about someone's money: a title, a status badge, one figure, and a hint on what to do next.  
  _From summary: “Use a Card Insight to show one finding about someone's money: a title, a status badge, one figure, and a hint on what to do next.”_
- **recommended** A savings insight on an Insights screen.  
  _From inContext: “A savings insight on the Insights screen”_

## Avoid when

- **discouraged** A list of perks: the handwritten Storybook docs, as the evidence records them, point to Benefit Card. Use instead: `BenefitCard`.  
  _From evidence: “Not a perk list (BenefitCard), not a coverage ring (CardFinancialCondition), not several insights in one card.”_
- **discouraged** A coverage ring: the handwritten Storybook docs, as the evidence records them, point to Card Financial Condition. Use instead: `CardFinancialCondition`.  
  _From evidence: “Not a perk list (BenefitCard), not a coverage ring (CardFinancialCondition), not several insights in one card.”_
- **discouraged** Several insights in one card: the same docs, as the evidence records them, say one finding per card.  
  _From evidence: “Not a perk list (BenefitCard), not a coverage ring (CardFinancialCondition), not several insights in one card.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Title | The topic in 16 px bold; it wraps rather than cutting off. | yes | anatomy: “The topic in 16 px bold; it wraps rather than cutting off.” |
| Subtitle | One sentence of context at 12 px. | yes | anatomy: “One sentence of context at 12 px.” |
| Badge | A string becomes a Badge; false removes it. | no | anatomy: “A string becomes a Badge; false removes it.” |
| Figure | children: the figure; the guide's is a Savings Goal Summary with a bar and two legend rows. | yes | anatomy: “children: here a Savings Goal Summary with a bar and two legend rows.” |
| Divider | A Divider between the figure and the footer: on by default whenever a footer shows; false hides it, a node replaces it. | no | fact `/facts/props/10` (divider, source evidence) |
| Footer | A hint and one action, set with footerBody and footerButtonLabel; false removes it. | no | anatomy: “A hint and one action, set with footerBody and footerButtonLabel; false removes it.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `badge` | `ReactNode` | types |
| `children` | `ReactNode` | types |
| `footer` | `ReactNode` | types |
| `divider` | `ReactNode` | types |

## Placement

- **recommended** Let the screen set the width: the card fills its host's width (Figma draws it at 356 px).  
  _From sizing: “The card fills its host's width; Figma draws it at 356 px.”_
- **recommended** `onPressFooter`: Run the screen's own action from the footer's button, through onPressFooter.  
  _From inContext: “Set up runs the screen's own action through onPressFooter.”_
- **recommended** `footerBody`: Once that action is done, the screen passes a new hint and no button label, so the footer has no button; the card doesn't change itself.  
  _From inContext: “Once the plan is set, the screen passes a new hint and no button label, so the footer has no button; the card doesn't change itself.”_

## Configuration

- **recommended** `AppearanceBrand`: AppearanceBrand colours the badge and the bar: Primary gold by default, Secondary purple as in Figma, Tertiary blue, or Neutral grey.  
  _From configuration: “AppearanceBrand colours the badge and the bar: Primary gold by default, Secondary purple as in Figma, Tertiary blue, or Neutral grey.”_
- **recommended** `AppearanceBrand`: The footer has a dark button, as in Figma, until you set AppearanceBrand on the card; then the footer takes that colour too.  
  _From configuration: “with a dark button, as in Figma, until you set AppearanceBrand on the card; then it takes that colour too.”_
- **recommended** `AppearanceBrand`: AppearanceBrand leaves the card, its title and its subtitle as they are.  
  _From configuration: “The card, its title, and its subtitle stay the same.”_
- **recommended** `badge`: badge takes a string (shown as a Badge), your own node, or false.  
  _From configuration: “badge takes a string, your own node, or false”_
- **recommended** `badge` = `false`: badge={false} removes the badge, and the title takes its width.  
  _From states: “badge={false} removes the badge, and the title takes its width.”_
- **recommended** `children`: children replaces the figure; left out, the card shows its default figure, a SavingsGoalSummary captioned “Credit usage”.  
  _From fact `/facts/props/3` (children, source evidence)_
- **recommended** `footer`: footer takes your own node, or false.  
  _From configuration: “footer takes your own node or false.”_
- **recommended** `footer` = `false`: footer={false} removes the footer and, unless you pass a divider, the rule above it.  
  _From states: “footer={false} removes the footer and, unless you pass a divider, the rule above it”_
- **recommended** `divider` = `false`: divider={false} keeps the footer without the rule.  
  _From states: “divider={false} keeps the footer without the rule.”_
- **recommended** `footerButtonLabel`: For a footer with no button, pass an empty footerButtonLabel and no onPressFooter.  
  _From evidence: “An empty `footerButtonLabel` with no `onPressFooter` gives a footer with no button.”_
- **discouraged** `onPress`: Don't make the whole card pressable (onPress) when the footer has a button.  
  _From states: “don't use it when the footer has a button.”_

## Content

- **recommended** One finding, one figure, one hint.  
  _From corePrinciple: “One finding, one figure, one hint.”_
- **recommended** `title`: Name the topic in the title and add one sentence of context in the subtitle.  
  _From content: “Name the topic in the title and add one sentence of context.”_
- **recommended** `badge`: Write the badge as a one- or two-word status, such as “On track”, that doesn't repeat the title.  
  _From content: “The badge is a one- or two-word status, such as “On track”, that doesn't repeat the title.”_
- **recommended** `footerButtonLabel`: Give the footer one hint and at most one action, labelled with a verb.  
  _From content: “Give the footer one hint and at most one action, labelled with a verb.”_
- **discouraged** `badge`: Don't write a long badge: “On track to finish by June” squeezes the title onto two lines.  
  _From doDont: ““On track to finish by June” squeezes the title onto two lines.”_
- **discouraged** `subtitle`: Don't write a paragraph as the subtitle: it wraps to several lines and pushes the figure down.  
  _From doDont: “It wraps to several lines and pushes the figure down.”_
- **REQUIRED** `title`: Set title to the finding's topic: left out, it reads “Emergency savings”.  
  _From fact `/facts/props/0` (title, source types)_
- **REQUIRED** `subtitle`: Set subtitle yourself: left out, it reads “One line explanation here.”  
  _From fact `/facts/props/1` (subtitle, source types)_
- **REQUIRED** `badge`: Set badge to the status, or to false for none: left out, it reads “Label”.  
  _From fact `/facts/props/2` (badge, source types)_
- **REQUIRED** `footerBody`: Whenever the default footer shows, set footerBody to your hint: left out, it reads “One line of guidance.”  
  _From fact `/facts/props/5` (footerBody, source types)_
- **REQUIRED** `footerButtonLabel`: Whenever the default footer shows, set footerButtonLabel to the action, or to an empty string for no button: left out, it reads “Button”.  
  _From fact `/facts/props/6` (footerButtonLabel, source evidence)_
- **REQUIRED** `onPressFooter`: Whenever the default footer shows a button, give it the screen's action through onPressFooter: without it, the button does nothing.  
  _From fact `/facts/props/7` (onPressFooter, source evidence)_

Good: “Emergency savings”, “Four of the eight months we suggest.”, “On track”, “Add ₹10,000 a month to reach it by June.”, “Set up”

Bad: “On track to finish by June”, “One line of guidance.”, “Button”, “You have saved four of the eight months of expenses we suggest keeping aside, based on what you spent over the last six months.”

## States

| State | When | From |
| --- | --- | --- |
| Static | Without onPress (the default), the card itself isn't pressable. | fact `/facts/props/13` (onPress, source evidence) |
| Pressable | onPress makes the whole card one button with no pressed look. | states: “onPress makes the whole card one button with no pressed look” |
| Disabled | With onPress set, disabled stops presses; the card looks the same. | fact `/facts/props/14` (disabled, source evidence) |

## Accessibility

- **recommended** `accessibilityLabel`: A pressable card (onPress) is one button, named by accessibilityLabel or, when that is not set, by the title.  
  _From fact `/facts/props/15` (accessibilityLabel, source types)_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Keep the badge short | Write a long badge | “On track to finish by June” squeezes the title onto two lines. |
| Write the footer’s hint | Keep the default footer copy | “One line of guidance.” and a “Button” that does nothing. |
| Keep the subtitle to one sentence | Write a paragraph as the subtitle | It wraps to several lines and pushes the figure down. |

## Examples

### A savings insight on the Insights screen, the guide's In context before the plan is set: a Title for the screen and the card in a VStack. The card names the finding (the title, one sentence of context, a short status badge) and its footer gives one hint and one action; onPressFooter stands for the screen's own action behind Set up. children is left out: the guide's figure is a SavingsGoalSummary (Saved (4 months) ₹2.4L against Goal (8 months) ₹4.8L), which has no entry in this pack, so the card shows its default figure in its place, a SavingsGoalSummary captioned “Credit usage”. The screen's own figure goes in children: report that it needs one.

```tsx
<VStack>
  <Title title="Insights" subtitle="October 2026" />
  <CardInsight
    title="Emergency savings"
    subtitle="Four of the eight months we suggest."
    badge="On track"
    footerBody="Add ₹10,000 a month to reach it by June."
    footerButtonLabel="Set up"
    onPressFooter={() => {}}
  />
</VStack>
```

_From inContext: “Set up runs the screen's own action through onPressFooter.”_

### The same card once the plan is set, the guide's In context after Set up: the screen passes a new hint (the one the guide's In context code passes once Set up is pressed), an empty footerButtonLabel and no onPressFooter, so the footer has no button. children is left out, as in the first example.

```tsx
<CardInsight
  title="Emergency savings"
  subtitle="Four of the eight months we suggest."
  badge="On track"
  footerBody="₹10,000 moves to savings on the 1st of each month."
  footerButtonLabel=""
/>
```

_From inContext: “Once the plan is set, the screen passes a new hint and no button label, so the footer has no button”_

### A card that only reports its finding, the guide's Without the footer: footer={false} removes the footer and the divider with it. children is left out, as in the first example.

```tsx
<CardInsight
  title="Emergency savings"
  subtitle="Four of the eight months we suggest."
  badge="On track"
  footer={false}
/>
```

_From states: “footer={false} removes the footer and, unless you pass a divider, the rule above it”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `title` | `string` |  | `"Emergency savings"` |  | types | Card title rendered in the header (left of the badge). Default "Emergency savings", from the component source. |
| `subtitle` | `string` |  | `"One line explanation here."` |  | types | One-line explanation rendered under the title. Default "One line explanation here.", from the component source. |
| `badge` | `React.ReactNode \| string \| false` |  | `"Label"` |  | types | Header badge. Pass a string to render the default `Badge` with that label, or a custom `ReactNode` for full control. Pass `false` or `null` to hide the badge entirely. Default "Label", from the component source. |
| `children` | `React.ReactNode` |  |  |  | evidence (2026-10-23) | Left out, the figure is a SavingsGoalSummary captioned “Credit usage”; since #284 the caption is black on the white card. Declared: Main content slot. Defaults to a `SavingsGoalSummary` to match the Figma reference. Pass any `ReactNode` to override. |
| `footer` | `React.ReactNode \| false` |  |  |  | evidence (2026-10-23) | The default footer and your own footer node both get the modes { AppearanceBrand: 'Neutral', Context: 'Nudge&Alert', ...modes }: the card's own modes win, so AppearanceBrand set on the card recolours the footer. Declared: Footer Nudge. Pass a `ReactNode` to override the default inline-compact `Nudge`, or `false`/`null` to hide it. |
| `footerBody` | `string` |  | `"One line of guidance."` |  | types | Body of the default footer nudge. Ignored when `footer` is a node or hidden. Default "One line of guidance.", from the component source. |
| `footerButtonLabel` | `string` |  | `"Button"` |  | evidence (2026-10-23) | An empty footerButtonLabel with no onPressFooter gives a footer with no button. Declared: Label for the default footer's button. Ignored when `footer` is a node or hidden. Default "Button", from the component source. |
| `onPressFooter` | `() => void` |  |  |  | evidence (2026-10-23) | The default footer's button (labelled footerButtonLabel, default “Button”) does nothing until onPressFooter is set. Declared: Press handler for the default footer's button. |
| `onClose` | `() => void` |  |  |  | evidence (2026-10-23) | onClose and showClose reach the default footer's Close. Declared: Shows the default footer's close button and handles its press. |
| `showClose` | `boolean` |  |  |  | types | Force the default footer's close button on or off. |
| `divider` | `React.ReactNode \| boolean` |  |  |  | evidence (2026-10-23) | Unset, the divider follows the footer; a passed divider (true or a node) stays when footer={false}. Declared: Whether to render a `Divider` between the content slot and the footer. Defaults to `true` whenever a footer is shown. Pass `false` to hide it, or a custom `ReactNode` to override. |
| `modes` | `Modes` |  |  |  | types | Design token modes for theming (e.g. `{ 'Color Mode': 'Light' }`). |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Override container styles. |
| `onPress` | `() => void` |  |  |  | evidence (2026-10-17) | The card becomes a Pressable with role button, named accessibilityLabel, else the title; it has no pressed or disabled look. Declared: Press handler for the whole card. When set, the card becomes pressable (rendered through a `Pressable` with `accessibilityRole="button"`). |
| `disabled` | `boolean` |  |  |  | evidence (2026-10-17) | With onPress set, disabled stops presses; the card shows no disabled look. Declared: Disable interaction when `onPress` is set. |
| `accessibilityLabel` | `string` |  |  |  | types | Accessibility label forwarded to the pressable wrapper (defaults to `title`). |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Appearance / DataViz` | `mode collection` | Primary, Secondary, Tertiary, Quaternary, Quinary, Senary, Neutral | `"Primary"` |  | types | A token collection CardInsight reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Primary"` |  | evidence (2026-10-17) | Colours the badge, the bar and its legend dots: Primary gold #cea15a on #fde8c9 by default, Secondary purple #5d00b5 on #ede7ff (Figma's bar), Tertiary blue, Neutral grey. Set on the card, it colours a Nudge footer too. Declared: A token collection CardInsight reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `AppearanceSystem` | `mode collection` | positive, warning, negative | `"positive"` |  | types | A token collection CardInsight reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Badge Size` | `mode collection` | Medium, Small | `"Medium"` |  | types | A token collection CardInsight reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Border Boolean` | `mode collection` | False, True | `"False"` |  | types | A token collection CardInsight reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / Size` | `mode collection` | M, S, XS | `"M"` |  | types | A token collection CardInsight reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / State` | `mode collection` | Idle, Hover, Pressed, Disabled | `"Idle"` |  | types | A token collection CardInsight reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection CardInsight reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context` | `mode collection` | Default, Nudge&Alert, CTACard, ListItem | `"Default"` |  | types | A token collection CardInsight reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 10` | `mode collection` | Default, jioPlus | `"Default"` |  | types | A token collection CardInsight reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 8` | `mode collection` | Default, Section | `"Default"` |  | types | A token collection CardInsight reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context2` | `mode collection` | Default, AppBar | `"Default"` |  | types | A token collection CardInsight reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Emphasis` | `mode collection` | High, Medium, Low | `"High"` |  | evidence (2026-10-23) | Emphasis Low and Medium keep the bar's fill (fixed in #284). Declared: A token collection CardInsight reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Emphasis / DataViz` | `mode collection` | High, Medium, Low | `"High"` |  | types | A token collection CardInsight reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `LinearProgress Size` | `mode collection` | S, M, L, XS | `"S"` |  | evidence (2026-10-17) | The default figure's bar defaults to L (23 px); M is Figma's 16 px. Declared: A token collection CardInsight reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Nudge padding` | `mode collection` | Default, None | `"Default"` |  | types | A token collection CardInsight reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | evidence (2026-10-17) | Page type SubPage (or context 8 Section) gives the card a grey border, #ebebed. Declared: A token collection CardInsight reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Profile Card Appearance` | `mode collection` | Default, Premium | `"Default"` |  | types | A token collection CardInsight reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Semantic Intent` | `mode collection` | Brand, System | `"Brand"` |  | evidence (2026-10-19) | Semantic Intent System with AppearanceSystem gives the badge, the bar and the footer the status colour; the badge's label is white (since #283). Declared: A token collection CardInsight reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Slot gap` | `mode collection` | S, M, L, XL, XS | `"S"` |  | types | A token collection CardInsight reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Text Appearance` | `mode collection` | Neutral, Primary, Secondary, Tertiary, Success, Warning, Error | `"Neutral"` |  | types | A token collection CardInsight reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `badge` | `React.ReactNode \| string \| false` |  | `"Label"` |  | types | Header badge. Pass a string to render the default `Badge` with that label, or a custom `ReactNode` for full control. Pass `false` or `null` to hide the badge entirely. |
| `children` | `React.ReactNode` |  |  |  | types | Main content slot. Defaults to a `SavingsGoalSummary` to match the Figma reference. Pass any `ReactNode` to override. |
| `footer` | `React.ReactNode \| false` |  |  |  | types | Footer Nudge. Pass a `ReactNode` to override the default inline-compact `Nudge`, or `false`/`null` to hide it. |
| `divider` | `React.ReactNode \| boolean` |  |  |  | types | Whether to render a `Divider` between the content slot and the footer. Defaults to `true` whenever a footer is shown. Pass `false` to hide it, or a custom `ReactNode` to override. |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onPressFooter` | `() => void` |  |  |  | types | Press handler for the default footer's button. |
| `onClose` | `() => void` |  |  |  | types | Shows the default footer's close button and handles its press. |
| `onPress` | `() => void` |  |  |  | types | Press handler for the whole card. When set, the card becomes pressable (rendered through a `Pressable` with `accessibilityRole="button"`). |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- Figma's badge is green with a white label; the package's default badge is gold (AppearanceBrand Primary). Semantic Intent System gives a green badge with a white label. _(evidence, 2026-10-19)_
- Figma's bar is purple and 16 px; the default figure's bar is gold and 23 px. _(evidence, 2026-10-17)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `(whole entry)` · human: The Card Insight guide (b4988c5) was checked on 23 October 2026 on the c8526ae build; every file the card renders is the same blob on the installed v0.1.78-dbe0e02. Read against the installed source and the guide page rendered on it (31 October, headless Chrome, 1280 px), three sentences no longer hold, and the entry leaves them out: (1) Configuration “The footer is grey with a dark button, as in Figma, …” and the Primary card's “The default: a gold badge and bar, with a grey footer.”: with no AppearanceBrand on the card the default footer (AppearanceBrand Neutral, CardInsight.tsx lines 166–170) has a white surface, nudge/background rgb(255, 255, 255), on the white card, with a grey sparkle rgb(84, 89, 97) and a dark button rgb(48, 51, 56); nothing about its surface is grey (the evidence's 23 October line says grey too). /configuration/1 quotes the sentence only from “with a dark button” on. (2) Anatomy's Divider note “A 1 px rule, shown only with a footer.”: a passed divider (true or a node) stays with footer={false} (CardInsight.tsx 200–209, 282), as the guide's own States sentence and playground readout say; the Divider part rests on the divider fact. (3) The Do & Don'ts description's “… or leaves its footer empty.”: since c8526ae the Don't shows the default copy, “One line of guidance.” and “Button”, not an empty footer. Also unclear: In context's “the screen passes a new hint and no button label” means an empty footerButtonLabel (the guide's code passes '' at line 103); a label left out reads “Button”. The entry keeps the sentence and adds /configuration/9 from the evidence. Re-check these sentences on the installed build and publish the guide, then re-extract. Added by Claude Code in the overnight run agentpack-r23, for Marcin to confirm. Guide fix #546.
