# StatusHero

> Coin agent pack 0.1.78+27 (pilot). Generated from `components/statushero.json`; the JSON is the source of truth.

- **State:** flagged (1 flag, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `e7ed622` · built 2026-10-31T05:18:28Z
- **Category:** feedback (for discovery only, not a limit on composition) · **Tags:** success screen, result screen, payment result, confirmation, done screen
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=statushero) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2594-13) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-statushero--docs)

Use a Status Hero at the top of a result screen to confirm what just happened: a mark, the amount, a title, and one line.

## Use when

- **recommended** At the top of a result screen, to confirm what just happened: a mark, the amount, a title, and one line.  
  _From summary: “Use a Status Hero at the top of a result screen to confirm what just happened: a mark, the amount, a title, and one line.”_
- **recommended** Say what happened, then the one thing that follows.  
  _From corePrinciple: “Say what happened, then the one thing that follows.”_
- **recommended** The screen after a payment, mandate, or setup succeeds (Biscuit's Storybook page).  
  _From evidence: “Use for the screen after a payment, mandate, or setup succeeds”_

## Avoid when

- **discouraged** A history of payments: this hero is one result; put the history in Transaction Details. Use instead: `TransactionDetails`.  
  _From doDont: “This hero is one result; put the history in Transaction Details.”_
- **discouraged** A payment in a list: use a TransactionBubble. Use instead: `TransactionBubble`.  
  _From evidence: “not a payment in a list (TransactionBubble)”_
- **discouraged** A portfolio total: Biscuit's Storybook page names PortfolioHero, which has no entry in this pack. Use instead: `PortfolioHero`.  
  _From evidence: “or a portfolio total (PortfolioHero)”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Media | The mark over the amount by default; renderMedia replaces the mark and the amount together. | yes | anatomy: “renderMedia replaces the mark and the amount together.” |
| Mark | An 81 px Icon Capsule showing iconName. | no | anatomy: “An 81 px Icon Capsule showing iconName.” |
| Amount | A Money Value from value and currency, 36 px. | no | anatomy: “A Money Value from value and currency, 36 px.” |
| Title | title, 20 px Bold; showTitle hides it. | no | anatomy: “title, 20 px Bold; showTitle hides it.” |
| Subtitle | subtitle; a line break in it stays. | no | anatomy: “subtitle; a line break in it stays.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `renderMedia` | `ReactNode` | types |

## Placement

- **recommended** Put it at the top of a result screen.  
  _From summary: “Use a Status Hero at the top of a result screen”_
- **recommended** The guide's example, the screen after a setup: Start saving swaps the setup screen for the result; the hero confirms it, and Done below leaves.  
  _From inContext: “Start saving swaps the setup screen for the result: the hero confirms it, and Done below leaves.”_
- **recommended** The hero has no button of its own, so the screen adds one.  
  _From inContext: “The hero has no button of its own, so the screen adds one.”_
- **recommended** The media sits on top; the title and the subtitle follow. Everything is centred.  
  _From anatomy: “The media, a mark over the amount, sits on top; the title and the subtitle follow. Everything is centred.”_
- **recommended** With the default copy: 8 px of padding, an 81 px mark, 46 px to a 44 px amount, then 12 px to a 24 px title and 12 px to the subtitle.  
  _From sizing: “8 px of padding, an 81 px mark, 46 px to a 44 px amount, then 12 px to a 24 px title and 12 px to the subtitle.”_

## Configuration

- **recommended** `Semantic Intent` = `System`: Set Semantic Intent to System and AppearanceSystem colours the mark green, orange, or red; pick a matching iconName.  
  _From configuration: “Set Semantic Intent to System and AppearanceSystem colours it green, orange, or red; pick a matching iconName.”_
- **recommended** `AppearanceSystem` = `positive`: AppearanceSystem positive, with Semantic Intent System: green, it went through.  
  _From configuration: “Green: it went through.”_
- **recommended** `AppearanceSystem` = `warning`: AppearanceSystem warning, with Semantic Intent System: orange, still waiting (the guide's card uses iconName ic_warning).  
  _From configuration: “Orange: still waiting.”_
- **recommended** `AppearanceSystem` = `negative`: AppearanceSystem negative, with Semantic Intent System: red, it didn't happen (the guide's card uses iconName ic_close).  
  _From configuration: “Red: it didn’t happen.”_
- **recommended** `iconName`: Make the mark match the result: a red cross for a failed payment.  
  _From doDont: “A red cross for a failed payment.”_
- **discouraged** Don't show a success mark on a failure.  
  _From doDont: “A success mark on a failure”_
- **recommended** `renderMedia`: renderMedia replaces the mark and the amount with your own content, such as a picture.  
  _From configuration: “renderMedia replaces the mark and the amount with your own content, such as a picture.”_
- **recommended** `renderMedia`: Content in renderMedia gets the hero's modes as defaults; each element's own modes win, and fragments and arrays get them on every element child.  
  _From fact `/facts/props/0` (renderMedia, source types)_
- **recommended** The hero has no states: it doesn't press, load, or animate, and it has no button, so the screen adds the next action.  
  _From states: “The hero has no states: it doesn’t press, load, or animate, and it has no button, so the screen adds the next action.”_
- **recommended** `showTitle` = `false`: showTitle={false} hides the title.  
  _From states: “showTitle={false} hides the title.”_
- **recommended** `subtitle`: An empty subtitle ('') hides the subtitle; leaving subtitle out shows the package's default sentence instead.  
  _From states: “an empty subtitle hides the subtitle; leaving subtitle out shows the package’s default sentence instead.”_

## Content

- **recommended** `title`: Write title as the outcome in a few words, such as Payment successful.  
  _From content: “Write title as the outcome in a few words, such as Payment successful.”_
- **recommended** `subtitle`: Write subtitle as the one fact that follows; a line break in it stays.  
  _From content: “Write subtitle as the one fact that follows; a line break in it stays.”_
- **recommended** `value`: Give value as the number alone: currency adds the sign, and INR or ₹ both show ₹.  
  _From content: “Give value as the number alone: currency adds the sign, and INR or ₹ both show ₹.”_
- **recommended** For a payment that went through (the guide's Outcome and amount card): the title gives the outcome; the subtitle says where the money went.  
  _From content: “The title gives the outcome; the subtitle says where the money went.”_
- **recommended** A long subtitle wraps, centred, in its column.  
  _From content: “It wraps, centred, in its column.”_
- **recommended** One next fact: what happened, then what follows.  
  _From doDont: “What happened, then what follows.”_
- **discouraged** Don't put a history in the subtitle: this hero is one result; put the history in Transaction Details.  
  _From doDont: “This hero is one result; put the history in Transaction Details.”_

Good: “Payment successful”, “₹1,200 sent to Rahul Verma.”, “Payment failed”, “No money left your account.”, “Daily savings started”

Bad: “₹50 on 19 Oct, ₹50 on 20 Oct, ₹50 on 21 Oct, ₹50 on 22 Oct, ₹50 on 23 Oct”

## States

| State | When | From |
| --- | --- | --- |
| Full | Mark, amount, title, and subtitle. | states: “Mark, amount, title, and subtitle.” |
| Without a title | showTitle={false} hides the title. | states: “showTitle={false} hides the title.” |
| Without a subtitle | An empty subtitle hides it. | states: “An empty subtitle hides it.” |

## Accessibility

- **recommended** Screen readers read the amount once, with its currency.  
  _From content: “Screen readers read the amount once, with its currency.”_
- **recommended** `accessibilityLabel`: accessibilityLabel is an optional accessible name for the hero region.  
  _From fact `/facts/props/9` (accessibilityLabel, source types)_
- **recommended** Without an accessibilityLabel the hero doesn’t group its children, so the amount stays reachable on phones too; the hero groups them only when it has an accessibilityLabel.  
  _From evidence: “StatusHero only groups its children when it has an `accessibilityLabel`, so the amount is reachable on phones too.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| The mark matches | A success mark on a failure | A red cross for a failed payment. |
| One next fact | A history in the subtitle | This hero is one result; put the history in Transaction Details. |

## Examples

### The screen after a setup, the guide's In context: Start saving swaps the setup screen for this one; the hero confirms it and Done below leaves, because the hero has no button of its own. The copy is the guide's Daily savings started hero; the mark keeps its default.

```tsx
<VStack justifyVertical="space-between">
  <StatusHero
    title="Daily savings started"
    subtitle="₹50 will move from HDFC Bank ··4821 to your gold locker every morning."
    value="50"
  />
  <Button label="Done" onPress={() => {}} />
</VStack>
```

_From inContext: “Start saving swaps the setup screen for the result: the hero confirms it, and Done below leaves.”_

### A failed payment: Semantic Intent System with AppearanceSystem negative and a matching ic_close, so the mark is a red cross.

```tsx
<StatusHero
  title="Payment failed"
  subtitle="No money left your account."
  value="1,200"
  iconName="ic_close"
  modes={{ 'Semantic Intent': 'System', AppearanceSystem: 'negative' }}
/>
```

_From configuration: “Set Semantic Intent to System and AppearanceSystem colours it green, orange, or red; pick a matching iconName.”_

### A picture instead of the mark and the amount: renderMedia holds an 81 px Image (a placeholder URL stands for the screen's own picture).

```tsx
<StatusHero
  title="Gold bought"
  subtitle="It’s in your gold locker now."
  renderMedia={<Image imageSource="https://example.com/gold-coin.png" width={81} height={81} />}
/>
```

_From configuration: “renderMedia replaces the mark and the amount with your own content, such as a picture.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `renderMedia` | `ReactNode` |  |  |  | types | Custom media slot content. Defaults to an IconCapsule above a MoneyValue. Hero modes are defaults; each element's own modes win. Fragments and arrays receive modes on every element child. |
| `title` | `string` |  | `"You're set to make payments"` |  | evidence (2026-10-25) | Hidden by showTitle={false} or an empty string. Declared: Title text displayed below the media slot. Default "You're set to make payments", from the component source. |
| `showTitle` | `boolean` |  | `true` |  | types | Whether to render the title. Default true, from the component source. |
| `subtitle` | `string` |  | `"₹50 will be auto-invested daily,\nstay consistent & stay golden."` |  | evidence (2026-10-25) | A line break (\n) stays a line break; '' hides the subtitle, undefined shows the default sentence. Declared: Body/subtitle text displayed below the title. Default "₹50 will be auto-invested daily,\nstay consistent & stay golden.", from the component source. |
| `iconName` | `string` |  | `"ic_confirm"` |  | types | Icon name used in the default media slot. Default "ic_confirm", from the component source. |
| `value` | `string` |  | `"50"` |  | evidence (2026-10-28) | The amount is announced once with its currency (on the web a role img named with both, such as “₹1,200”). Declared: Monetary value shown in the default MoneyValue inside the media slot. Default "50", from the component source. |
| `currency` | `string` |  | `"INR"` |  | types | Currency symbol or ISO code for the default MoneyValue. Default "INR", from the component source. |
| `modes` | `Modes` |  |  |  | types | Mode configuration for design tokens. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types |  |
| `accessibilityLabel` | `string` |  |  |  | types | Optional accessible name for the hero region. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Primary"` |  | types | A token collection StatusHero reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `AppearanceSystem` | `mode collection` | positive, warning, negative | `"positive"` |  | evidence (2026-10-25) | With Semantic Intent System it colours the mark: positive #26ab21, warning #f06e0f, negative #f50030, with a white icon. Declared: A token collection StatusHero reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection StatusHero reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context` | `mode collection` | Default, Nudge&Alert, CTACard, ListItem | `"Default"` |  | types | A token collection StatusHero reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context3` | `mode collection` | Default, Transaction Bubble, Balance & Cards, Amount Input | `"Default"` |  | types | A token collection StatusHero reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Emphasis` | `mode collection` | High, Medium, Low | `"High"` |  | types | A token collection StatusHero reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Icon Capsule Size` | `mode collection` | M, L, S, XS | `"M"` |  | types | A token collection StatusHero reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection StatusHero reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Semantic Intent` | `mode collection` | Brand, System | `"Brand"` |  | types | A token collection StatusHero reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `renderMedia` | `ReactNode` |  |  |  | types | Custom media slot content. Defaults to an IconCapsule above a MoneyValue. Hero modes are defaults; each element's own modes win. Fragments and arrays receive modes on every element child. |

### Events

_No events._

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- With the default copy the hero is 269 px tall where Figma's is 259: its amount and title sit on 44 and 24 px lines, Figma's on 36 and 22 (reported in #398). _(evidence, 2026-10-25)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `(whole entry)` · human: The guide and its evidence were re-checked on 28 October on the installed build, dbe0e02, only for #346 (the amount is announced once with its currency); the rest still describes the 25 October build, c8526ae. dbe0e02 changed StatusHero for #398: the mark's Neutral High at Icon Capsule Size L is a default the hero's modes override (dark grey with a white tick; AppearanceBrand Primary on the hero makes it gold; Semantic Intent System still colours it green, orange or red), the hero fills its parent instead of hugging its text, renderMedia gets the hero's modes as defaults and each element's own modes win, a hero with no title and no subtitle has no empty content wrap, and a new accessibilityLabel names the hero as a group. This entry follows the installed package and leaves out the guide sentences dbe0e02 contradicts (listed in its notes): Configuration “The mark is gold by default: the hero fixes its Icon Capsule to AppearanceBrand Primary, so no brand mode changes it.” and the Brand card's “The default gold mark.”; Sizing's “As wide as its words”, “The hero has no width of its own: it centres its content and wraps text only when its host is narrower.” and the 302 of “With the default copy it is 302 × 269” (269 still holds); the Don't caption “The gold tick says it worked.” (the pair is kept with the Do caption); Sources “Its mark is gold where Figma’s is dark grey with a white tick: the hero fixes the capsule’s brand mode, so only Semantic Intent System recolours it.” and “Storybook’s Without subtitle story still shows the default subtitle”; the playground's Gold readout; and the evidence's Contract, Web render, Discrepancies and Limits lines on the forced gold mark and modes, renderMedia replacing modes, the hugging width, the empty gap and no accessibility props. The guide fix belongs to #398 (Component Fix, In progress; only the 269 px against Figma's 259 is left, waiting for Marcin's call), whose publish re-checks the guide on dbe0e02. Re-extract once #398 is closed and the guide is published. Added by Claude Code in the overnight run agentpack-batch12, for Marcin to confirm.
