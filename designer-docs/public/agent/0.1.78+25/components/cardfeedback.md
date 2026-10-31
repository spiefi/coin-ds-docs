# CardFeedback

> Coin agent pack 0.1.78+25 (pilot). Generated from `components/cardfeedback.json`; the JSON is the source of truth.

- **State:** documented
- **Package:** jfs-components 0.1.78 · guide commit `4a044e7` · built 2026-10-31T03:15:31Z
- **Category:** feedback (for discovery only, not a limit on composition) · **Tags:** feedback card, status card, result card, success message, error message, inline alert
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=cardfeedback) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1280-4481) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-cardfeedback--docs)

Use a Card Feedback to show the result of an action in the page, such as a payment that went through or failed, with one next step.

## Use when

- **recommended** Show the result of an action in the page, such as a payment that went through or failed, with one next step.  
  _From summary: “Use a Card Feedback to show the result of an action in the page, such as a payment that went through or failed, with one next step.”_
- **recommended** Something people need to finish soon, such as “KYC pending”, with the orange warning status.  
  _From configuration: “Orange for something to finish soon.”_

## Avoid when

- **discouraged** A message that should disappear on its own: the upstream Storybook docs, as the evidence records them, point to Toast. Use instead: `Toast`.  
  _From evidence: “Use Toast for messages that disappear, Popup for a blocking decision, EmptyState for an empty screen.”_
- **discouraged** An empty screen: the upstream Storybook docs, as the evidence records them, point to Empty State. Use instead: `EmptyState`.  
  _From evidence: “Use Toast for messages that disappear, Popup for a blocking decision, EmptyState for an empty screen.”_
- **discouraged** A decision that blocks the screen: the upstream Storybook docs, as the evidence records them, point to a Popup.  
  _From evidence: “Use Toast for messages that disappear, Popup for a blocking decision, EmptyState for an empty screen.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Panel | A tinted panel with 12 px padding and corners; AppearanceSystem sets the tint. | yes | anatomy: “A tinted panel with 12 px padding and corners; AppearanceSystem sets the tint.” |
| Icon | CardFeedback.Icon: a 20 px registry icon in the status colour. | no | anatomy: “CardFeedback.Icon: a 20 px registry icon in the status colour.” |
| Title | CardFeedback.Title: the outcome in a few words, 14 px. | no | anatomy: “CardFeedback.Title: the outcome in a few words, 14 px.” |
| Body | CardFeedback.Body: one sentence of detail, 12 px; it wraps. | no | anatomy: “CardFeedback.Body: one sentence of detail, 12 px; it wraps.” |
| Action | CardFeedback.Action: an optional row of small buttons in the status colour. | no | anatomy: “CardFeedback.Action: a row of small buttons in the status colour.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `children` | `ReactNode` | types |

## Placement

- **recommended** The card fills its host’s width (Figma draws it at 328 px), so the screen sets the width.  
  _From sizing: “The card fills its host’s width; Figma draws it at 328 px.”_
- **recommended** It’s as tall as its content and at least 59 px, with 12 px padding and 8 px between the icon, the text, and the actions.  
  _From sizing: “It’s as tall as its content and at least 59 px, with 12 px padding and 8 px between the icon, the text, and the actions.”_
- **recommended** Title and body wrap, and buttons wrap onto a new row when they run out of room.  
  _From sizing: “Title and body wrap, and buttons wrap onto a new row when they run out of room.”_
- **recommended** Inside a VStack or another Coin container that passes modes down, its parts keep the card’s status colours.  
  _From sources: “Inside a VStack or another Coin container that passes modes down, its parts keep the card’s status colours.”_

## Configuration

- **recommended** `children`: Build it from the card’s parts: Icon, Content, Title, Body, and Action.  
  _From anatomy: “You build it from the card’s parts: Icon, Content, Title, Body, and Action.”_
- **recommended** `CardFeedback.Content`: CardFeedback.Content is a full-width column, gap 8, that holds Title, Body and Action.  
  _From evidence: “`CardFeedback.Content` — full-width column, gap 8; holds Title, Body and Action.”_
- **recommended** `AppearanceSystem`: AppearanceSystem sets the status: positive, the default, is green; warning is orange; negative is red.  
  _From configuration: “AppearanceSystem sets the status: positive, the default, is green; warning is orange; negative is red.”_
- **recommended** `AppearanceSystem` = `positive`: Positive, the default: green for a result that went through.  
  _From configuration: “Green for a result that went through.”_
- **recommended** `AppearanceSystem` = `warning`: Warning: orange for something to finish soon.  
  _From configuration: “Orange for something to finish soon.”_
- **recommended** `AppearanceSystem` = `negative`: Negative: red for something that failed.  
  _From configuration: “Red for something that failed.”_
- **recommended** `AppearanceSystem`: AppearanceSystem colours the panel, the icon, and the buttons in Action.  
  _From configuration: “It colours the panel, the icon, and the buttons in Action.”_
- **recommended** `CardFeedback.Icon`: Pick an icon that matches the status: the card colours it but doesn’t choose it.  
  _From configuration: “Pick an icon that matches: the card colours it but doesn’t choose it.”_
- **recommended** `AppearanceBrand`: AppearanceBrand only shifts the title and body colour slightly.  
  _From configuration: “AppearanceBrand only shifts the title and body colour slightly.”_
- **recommended** `CardFeedback.Action`: Buttons in Action take the status colour; a Button’s own modes make a second one quieter.  
  _From states: “Buttons take the status colour; a Button’s own modes make the second one quieter.”_
- **recommended** `CardFeedback.Action`: Emphasis alone doesn’t quieten a button in the status colour, so a quieter second action switches to Brand Neutral at Emphasis Low.  
  _From sources: “Emphasis alone doesn’t quieten a button in the status colour, so the quieter action here switches to Brand Neutral at Emphasis Low.”_
- **recommended** `CardFeedback.Action`: The quieter action's own modes, { 'Semantic Intent': 'Brand', AppearanceBrand: 'Neutral', Emphasis: 'Low' }, render it transparent with dark text, 25 px, beside the status-coloured one.  
  _From evidence: “Cancel-style `{ 'Semantic Intent': 'Brand', AppearanceBrand: 'Neutral', Emphasis: 'Low' }` renders transparent (`rgba(235, 235, 237, 0)`) with dark text, 25 px, beside the red `rgb(245, 0, 48)` primary.”_
- **REQUIRED** `onPress`: onPress makes the whole card one button instead; use it only when the card has no buttons inside, and name it with accessibilityLabel.  
  _From states: “onPress makes the whole card one button instead; use it only when the card has no buttons inside, and name it with accessibilityLabel.”_
- **recommended** When the retry goes through, the screen swaps the card for a positive one; the card doesn’t change itself or time out.  
  _From inContext: “When the retry goes through, the screen swaps the card for a positive one; the card doesn’t change itself or time out.”_

## Content

- **recommended** Say what happened, then what to do next.  
  _From corePrinciple: “Say what happened, then what to do next.”_
- **recommended** Make the title the outcome, such as “Payment failed”, and the body one sentence on what it means for the person.  
  _From content: “Make the title the outcome, such as “Payment failed”, and the body one sentence on what it means for the person.”_
- **recommended** Label each button with a verb, and keep to one or two.  
  _From content: “Label each button with a verb, and keep to one or two.”_
- **recommended** Make the title the outcome: “Payment failed” says it in two words.  
  _From doDont: ““Payment failed” says it in two words.”_
- **discouraged** Do not put the detail in the title: it wraps and the outcome gets lost.  
  _From doDont: “The title wraps and the outcome gets lost.”_
- **discouraged** Do not add three or more actions: they wrap onto a second row and look the same.  
  _From doDont: “They wrap onto a second row and look the same.”_
- **discouraged** Do not reuse the success icon on another status: a tick on a red card contradicts the title.  
  _From doDont: “A tick on a red card contradicts the title.”_

Good: “Payment failed”, “Your bank declined the payment. No money was taken.”, “Try again”, “Payment successful”, “₹1,250 was sent to Rahul Sharma.”, “View receipt”, “KYC pending”, “Finish KYC by 31 October to keep investing.”, “Complete KYC”

Bad: “Your bank declined your payment of ₹1,250 to Rahul Sharma”

## States

| State | When | From |
| --- | --- | --- |
| Static | The card itself is static: only the buttons you put in Action respond. | states: “The card itself is static: only the buttons you put in Action respond.” |
| Message only | Icon, title, and body: nothing to press. | states: “Icon, title, and body: nothing to press.” |
| Two actions | Buttons take the status colour; a Button’s own modes make the second one quieter. | states: “Buttons take the status colour; a Button’s own modes make the second one quieter.” |
| Pressable card | With onPress and no buttons inside, the card fades slightly on hover and more while pressed, and shows a ring on keyboard focus. | states: “A pressable card fades slightly on hover and more while pressed, and shows a ring on keyboard focus.” |
| Disabled | On a pressable card, disabled fades it to half and ignores presses. | states: “disabled fades it to half and ignores presses.” |

## Accessibility

- **recommended** The colour alone doesn’t carry the status for everyone, so the title has to say it.  
  _From content: “The colour alone doesn’t carry the status for everyone, so the title has to say it.”_
- **recommended** `accessibilityLabel`: A pressable card is one button: name it with accessibilityLabel.  
  _From states: “onPress makes the whole card one button instead; use it only when the card has no buttons inside, and name it with accessibilityLabel.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Match the icon to the status | Reuse the success icon | A tick on a red card contradicts the title. |
| Make the title the outcome | Put the detail in the title | The title wraps and the outcome gets lost. |
| One or two actions | Three or more actions | They wrap onto a second row and look the same. |

## Examples

### A failed payment on the Pay screen, the guide's In context: a VStack column with the screen's Title and a negative Card Feedback (AppearanceSystem negative, because the payment failed; nothing else sets modes). Try again's onPress is a placeholder for the screen's own retry; when the retry goes through, the screen swaps the card for a positive one, since the card doesn't change itself or time out.

```tsx
<VStack>
  <Title title="Pay Rahul Sharma" subtitle="₹1,250 from HDFC Bank" />
  <CardFeedback modes={{ AppearanceSystem: 'negative' }}>
    <CardFeedback.Icon icon="ic_error" />
    <CardFeedback.Content>
      <CardFeedback.Title>Payment failed</CardFeedback.Title>
      <CardFeedback.Body>Your bank declined the payment. No money was taken.</CardFeedback.Body>
      <CardFeedback.Action>
        <Button label="Try again" onPress={() => {}} />
      </CardFeedback.Action>
    </CardFeedback.Content>
  </CardFeedback>
</VStack>
```

_From inContext: “Try again runs the screen’s own retry through the button’s onPress.”_

### Two actions, the guide's States: Try again leads at its defaults and takes the status colour; Change bank is the quieter second action. Emphasis alone doesn't quieten a button in the status colour, so Change bank sets the guide's own modes, Semantic Intent Brand, AppearanceBrand Neutral and Emphasis Low, which render it transparent with dark text. The handlers are placeholders for the screen's own wiring.

```tsx
<CardFeedback modes={{ AppearanceSystem: 'negative' }}>
  <CardFeedback.Icon icon="ic_error" />
  <CardFeedback.Content>
    <CardFeedback.Title>Payment failed</CardFeedback.Title>
    <CardFeedback.Body>Your bank declined the payment. No money was taken.</CardFeedback.Body>
    <CardFeedback.Action>
      <Button label="Try again" onPress={() => {}} />
      <Button
        label="Change bank"
        modes={{ 'Semantic Intent': 'Brand', AppearanceBrand: 'Neutral', Emphasis: 'Low' }}
        onPress={() => {}}
      />
    </CardFeedback.Action>
  </CardFeedback.Content>
</CardFeedback>
```

_From states: “Buttons take the status colour; a Button’s own modes make the second one quieter.”_

### A pressable card, the guide's States: onPress (a placeholder for the screen's own wiring) makes the whole card one button, so it has no buttons inside, and accessibilityLabel names it. Positive is the default status, so no modes are set.

```tsx
<CardFeedback onPress={() => {}} accessibilityLabel="Payment successful. View receipt">
  <CardFeedback.Icon icon="ic_status_successful" />
  <CardFeedback.Content>
    <CardFeedback.Title>Payment successful</CardFeedback.Title>
    <CardFeedback.Body>₹1,250 was sent to Rahul Sharma.</CardFeedback.Body>
  </CardFeedback.Content>
</CardFeedback>
```

_From states: “onPress makes the whole card one button instead; use it only when the card has no buttons inside, and name it with accessibilityLabel.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types | The main content of the card (Icon, Title, Body, Action). |
| `modes` | `Modes` |  |  |  | evidence (2026-10-19) | Merged over the card's own modes, AppearanceSystem positive, Context Nudge&Alert and Semantic Intent System. Every part merges the card's modes with its own, and Icon, Content and Action give their children those modes under the child's own, so a child's own modes win. Declared: Modes object for token resolution. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Style overrides for the card container. |
| `onPress` | `() => void` |  |  |  | evidence (2026-10-19) | Makes the root a Pressable with role button: hover opacity 0.92, pressed 0.8, a 1 px #0c0d10 ring on keyboard focus. Without onPress the root is a plain view. Declared: Press handler for the whole card. When set, the card becomes pressable (rendered through a `Pressable` with `accessibilityRole="button"`). |
| `disabled` | `boolean` |  |  |  | evidence (2026-10-19) | With onPress: opacity 0.5, aria-disabled, tabindex -1 on the web, and presses are ignored. Declared: Disable interaction when `onPress` is set. |
| `accessibilityLabel` | `string` |  |  |  | types | Accessibility label forwarded to the pressable wrapper. |
| `testID` | `string` |  |  |  | types | Test identifier for the card root. |
| `CardFeedback.Icon` | `component` |  |  |  | evidence (2026-10-19) | icon, a registry name, drawn in a 20 px box in the status colour (appearanceFeedback/cardFeedback/icon/color); or children instead. The card doesn't pick an icon for a status. Declared: A static sub-component of CardFeedback. Its own props: children, style, modes, icon, testID. |
| `CardFeedback.Content` | `component` |  |  |  | evidence (2026-10-19) | A full-width column, gap 8, that holds Title, Body and Action. Declared: A static sub-component of CardFeedback. Its own props: children, style, modes, testID. |
| `CardFeedback.Title` | `component` |  |  |  | evidence (2026-10-19) | Text at 14/17, weight 500; it wraps. Declared: A static sub-component of CardFeedback. Its own props: children, style, modes, testID. |
| `CardFeedback.Body` | `component` |  |  |  | evidence (2026-10-19) | Text at 12/16, weight 400; it wraps. Declared: A static sub-component of CardFeedback. Its own props: children, style, modes, testID. |
| `CardFeedback.Action` | `component` |  |  |  | evidence (2026-10-19) | A wrapping row, gap 4; each child gets the card's modes under its own, so a Button's own modes win. Declared: A static sub-component of CardFeedback. Its own props: children, style, modes, testID. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Primary"` |  | evidence (2026-10-19) | Changes only the title and body colour, a slight shift (Primary #0F0D0A / #1E1A14, Neutral #0D0D0F / #1A1C1F); the panel, the icon and the buttons keep the status colour. Declared: A token collection CardFeedback reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `AppearanceSystem` | `mode collection` | positive, warning, negative | `"positive"` |  | evidence (2026-10-19) | The status (positive by default): panel and icon positive #DBF0D9 / #26AB21, warning #FFE3D6 / #F06E0F, negative #FFE0DE / #F50030. Buttons in Action take the same colour with a white label, at the small Nudge&Alert size (25 px). Declared: A token collection CardFeedback reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection CardFeedback reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types | The main content of the card (Icon, Title, Body, Action). |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onPress` | `() => void` |  |  |  | types | Press handler for the whole card. When set, the card becomes pressable (rendered through a `Pressable` with `accessibilityRole="button"`). |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- The published Storybook hasn’t been rebuilt: it still renders every story as a pressable card with buttons inside it, and shows the older generated page. _(evidence, 2026-10-19)_
- Emphasis alone still changes nothing on a System button, such as a button in Action: button/background at Semantic Intent System branches only on AppearanceSystem. A token gap, noted on #286's re-test, not CardFeedback's. _(evidence, 2026-10-19)_

## Flags

_None._
