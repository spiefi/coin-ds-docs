# PaymentFeedback

> Coin agent pack 0.1.78+14 (pilot). Generated from `components/paymentfeedback.json`; the JSON is the source of truth.

- **State:** documented
- **Package:** jfs-components 0.1.78 · guide commit `2bae394` · built 2026-10-29T05:38:55Z
- **Category:** feedback (for discovery only, not a limit on composition) · **Tags:** payment status, payment result, transaction result, success screen, payment confirmation, receipt
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=paymentfeedback) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1056-3084) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-paymentfeedback--docs)

Use a Payment Feedback on the screen after a payment to show the amount, whether it went through, and its reference.

## Use when

- **recommended** On the screen after a payment, to show the amount, whether it went through, and its reference.  
  _From summary: “Use a Payment Feedback on the screen after a payment to show the amount, whether it went through, and its reference.”_

## Avoid when

- **discouraged** Before the payment has a result: Payment Feedback has no pressed, disabled or loading state, and the screen shows it once the payment has a result.  
  _From states: “Payment Feedback has no pressed, disabled, or loading state: the screen shows it once the payment has a result.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Icon | An 81 px Icon Capsule coloured by AppearanceSystem; renderMedia replaces it. | yes | anatomy: “An 81 px Icon Capsule coloured by AppearanceSystem; renderMedia replaces it.” |
| Amount | The title: 36 px heavy text. The component adds no currency sign. | yes | anatomy: “The title: 36 px heavy text. The component adds no currency sign.” |
| Status | The subtitle: the outcome in words, at 16 px. | yes | anatomy: “The subtitle: the outcome in words, at 16 px.” |
| Body | Optional: one sentence under the status, at 14 px (body). | no | anatomy: “Optional: one sentence under the status, at 14 px.” |
| Details | One line per line break in details; showDetails hides them. | no | anatomy: “One line per line break in details; showDetails hides them.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `renderMedia` | `ReactNode` | types |

## Placement

- **recommended** It has no width of its own: it fills its container, or shrinks to its longest line when centred.  
  _From sizing: “It has no width of its own: it fills its container, or shrinks to its longest line when centred”_
- **recommended** Payment Feedback has no button of its own, so the screen adds one.  
  _From inContext: “Payment Feedback has no button of its own, so the screen adds one.”_
- **recommended** On the guide's result screen, Pay swaps the payment screen for the result (the amount, the outcome and the reference), with Done below to leave.  
  _From inContext: “Pay swaps the payment screen for the result: the amount, the outcome, and the reference, with Done below to leave.”_

## Configuration

- **recommended** `AppearanceSystem`: Set the outcome with AppearanceSystem in modes: positive is green, warning orange, and negative red.  
  _From configuration: “Set the outcome with AppearanceSystem in modes: positive is green, warning orange, and negative red.”_
- **recommended** `iconName`: The icon and the words don't follow AppearanceSystem: set iconName and the status line (subtitle) to match it.  
  _From configuration: “The icon and the words don't follow it, so set iconName and the status line to match.”_
- **recommended** `AppearanceSystem` = `positive`: Paid: positive with ic_confirm, the default: a check on green.  
  _From configuration: “positive with ic_confirm, the default: a check on green.”_
- **recommended** `AppearanceSystem` = `warning`: Pending: warning with ic_info, while the bank hasn't confirmed it.  
  _From configuration: “warning with ic_info, while the bank hasn't confirmed it.”_
- **recommended** `AppearanceSystem` = `negative`: Failed: negative with ic_close: a white cross on red.  
  _From configuration: “negative with ic_close: a white cross on red.”_
- **discouraged** `iconName` = `ic_confirm`: Do not keep the default check on a failed payment: a check mark on red says success and failure at once.  
  _From doDont: “A check mark on red says success and failure at once.”_
- **REQUIRED** `iconName`: iconName defaults to ic_confirm whatever the outcome: set it for a pending or failed payment.  
  _From fact `/facts/props/5` (iconName, source types)_
- **REQUIRED** `subtitle`: subtitle defaults to “Payment successful” whatever the outcome: set it for a pending or failed payment.  
  _From fact `/facts/props/1` (subtitle, source evidence)_
- **REQUIRED** `title`: title defaults to “₹50,000”: pass the amount that was paid.  
  _From fact `/facts/props/0` (title, source evidence)_
- **REQUIRED** `details`: details defaults to a sample date and transaction ID (18 March 2025, TXN121466784): pass the payment's own, or set showDetails false.  
  _From fact `/facts/props/3` (details, source evidence)_
- **recommended** `showDetails` = `false`: Set showDetails false to hide the date and reference.  
  _From states: “showDetails off hides the date and reference.”_
- **recommended** `renderMedia`: renderMedia replaces the icon with your own.  
  _From configuration: “renderMedia replaces the icon with your own.”_
- **recommended** `AppearanceSystem`: Of Payment Feedback's modes, set only AppearanceSystem.  
  _From sources: “Of the modes, set only AppearanceSystem”_
- **discouraged** `AppearanceBrand`: Do not set AppearanceBrand on it: it changes nothing.  
  _From sources: “AppearanceBrand and Page type change nothing”_
- **discouraged** `Page type`: Do not set Page type on it: it changes nothing.  
  _From sources: “AppearanceBrand and Page type change nothing”_
- **discouraged** `Icon Capsule Size`: Do not set Icon Capsule Size, Emphasis or Semantic Intent for the default icon: it keeps its own size, emphasis and intent.  
  _From sources: “the default icon keeps its own size, emphasis and intent.”_

## Content

- **recommended** Lead with the amount, then say the outcome in words.  
  _From corePrinciple: “Lead with the amount, then say the outcome in words.”_
- **recommended** `title`: Write the amount as it was paid, with its currency sign: the component adds none.  
  _From content: “Write the amount as it was paid, with its currency sign: the component adds none.”_
- **discouraged** `title`: Do not write a sentence in the title: 36 px heavy text wraps into a block nobody reads first.  
  _From doDont: “36 px heavy text wraps into a block nobody reads first.”_
- **recommended** `subtitle`: Put the outcome in the status line, in sentence case.  
  _From content: “Put the outcome in the status line in sentence case”_
- **discouraged** `subtitle`: Do not rely on the colour to give the outcome: say it in the status line.  
  _From doDont: “Rely on the colour”_
- **recommended** `body`: Keep the body to one sentence.  
  _From content: “keep the body to one sentence”_
- **recommended** `details`: Give the details one fact per line, split with a line break.  
  _From content: “give the details one fact per line, split with a line break.”_

Good: “₹1,250”, “Payment successful”, “Sent to Rahul Sharma.”, “13 October 2026, 4:15 pm”, “Transaction ID: TXN121466784”, “Payment pending”, “Your bank is still processing it.”, “Payment failed”, “Something went wrong. Please try again.”

Bad: “Your payment of ₹1,250 was successful”

## States

| State | When | From |
| --- | --- | --- |
| Default | It has no pressed, disabled or loading state: the screen shows it once the payment has a result. | states: “Payment Feedback has no pressed, disabled, or loading state: the screen shows it once the payment has a result.” |
| Everything | Amount, status, body, and details. | states: “Amount, status, body, and details.” |
| No details | showDetails off hides the date and reference. | states: “showDetails off hides the date and reference.” |
| Amount and status | The shortest version: the amount and the outcome, with no body and showDetails off. | states: “The shortest version: the amount and the outcome.” |

## Accessibility

- **recommended** `subtitle`: Say the outcome in words in the status line: “Payment failed” tells everyone what happened, not only people who see the red.  
  _From doDont: ““Payment failed” tells everyone what happened, not only people who see the red.”_
- **recommended** It has no label of its own and doesn’t announce the result: its text is read in order, and the icon is an image with no name.  
  _From sources: “It has no label of its own and doesn’t announce the result: its text is read in order, and the icon is an image with no name.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Say the outcome in words | Rely on the colour | Only the red icon says this payment failed. |
| Match the icon to the outcome | Keep the default check | A check mark on red says success and failure at once. |
| Keep the title to the amount | Write a sentence in the title | 36 px heavy text wraps into a block nobody reads first. |

## Examples

### A successful payment: the amount, the outcome, who it went to, then the date and transaction ID.

```tsx
<PaymentFeedback
  title="₹1,250"
  subtitle="Payment successful"
  body="Sent to Rahul Sharma."
  details={'13 October 2026, 4:15 pm\nTransaction ID: TXN121466784'}
  iconName="ic_confirm"
/>
```

_From content: “₹1,250, “Payment successful”, who it went to, then the date and transaction ID.”_

### A failed payment: negative with ic_close, and the outcome in words.

```tsx
<PaymentFeedback
  title="₹1,250"
  subtitle="Payment failed"
  body="Something went wrong. Please try again."
  details={'13 October 2026, 4:15 pm\nTransaction ID: TXN121466784'}
  iconName="ic_close"
  modes={{ AppearanceSystem: 'negative' }}
/>
```

_From configuration: “negative with ic_close: a white cross on red.”_

### A payment result screen: the result centred, with Done below to leave, since Payment Feedback has no button of its own.

```tsx
<VStack justifyVertical="space-between" style={{ flex: 1, padding: 16 }}>
  <VStack justifyVertical="center" style={{ flex: 1 }}>
    <PaymentFeedback
      title="₹1,250"
      subtitle="Payment successful"
      body="Sent to Rahul Sharma."
      details={'13 October 2026, 4:15 pm\nTransaction ID: TXN121466784'}
      iconName="ic_confirm"
    />
  </VStack>
  <Button label="Done" onPress={() => {}} />
</VStack>
```

_From inContext: “Pay swaps the payment screen for the result: the amount, the outcome, and the reference, with Done below to leave.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `title` | `string` |  | `"₹50,000"` |  | evidence (2026-10-13) | An empty string renders no title line. Declared: Large heading text, typically a monetary value (e.g. "₹50,000") Default "₹50,000", from the component source. |
| `subtitle` | `string` |  | `"Payment successful"` |  | evidence (2026-10-13) | An empty string renders no status line. Declared: Status line below the title (e.g. "Payment successful") Default "Payment successful", from the component source. |
| `body` | `string` |  |  |  | types | Descriptive body text below the subtitle. |
| `details` | `string` |  | `"18 March 2025, 4:15 pm\nTransaction ID: TXN121466784"` |  | evidence (2026-10-13) | showDetails false or an empty details string removes the details block. Declared: Transaction metadata shown at the bottom (e.g. date, transaction ID). Supports newlines. Default "18 March 2025, 4:15 pm\nTransaction ID: TXN121466784", from the component source. |
| `showDetails` | `boolean` |  | `true` |  | types | Whether to render the details section. Default true, from the component source. |
| `iconName` | `string` |  | `"ic_confirm"` |  | types | Icon name used in the default IconCapsule media slot. Default "ic_confirm", from the component source. |
| `renderMedia` | `ReactNode` |  |  |  | evidence (2026-10-13) | Replaces the default capsule; the node gets the Payment Feedback's modes under its own. Declared: Optional custom media slot that replaces the default IconCapsule. |
| `modes` | `Modes` |  |  |  | evidence (2026-10-13) | On the default capsule the caller's AppearanceSystem wins, and its size, emphasis and intent are forced (Icon Capsule Size L, Emphasis High, Semantic Intent System). Declared: Mode configuration for design tokens. Also drives the default IconCapsule's color — pass `AppearanceSystem: 'positive' \| 'warning' \| 'negative'` to render a green/orange/red capsule (defaults to `positive`). |
| `style` | `ViewStyle` |  |  |  | types |  |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Primary"` |  | evidence (2026-10-13) | Listed for PaymentFeedback, but changes nothing. Declared: A token collection PaymentFeedback reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `AppearanceSystem` | `mode collection` | positive, warning, negative | `"positive"` |  | evidence (2026-10-13) | There is no status prop: the outcome is AppearanceSystem (positive green, warning orange, negative red) plus iconName and the words. Declared: A token collection PaymentFeedback reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection PaymentFeedback reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context` | `mode collection` | Default, Nudge&Alert, CTACard, ListItem | `"Default"` |  | evidence (2026-10-13) | Nudge&Alert shrinks the default capsule to 14 px and CTACard to 58 px. Declared: A token collection PaymentFeedback reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Emphasis` | `mode collection` | High, Medium, Low | `"High"` |  | evidence (2026-10-13) | Listed for PaymentFeedback, but changes nothing: the default capsule keeps High. Declared: A token collection PaymentFeedback reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Icon Capsule Size` | `mode collection` | M, L, S, XS | `"M"` |  | evidence (2026-10-13) | Listed for PaymentFeedback, but changes nothing: the default capsule keeps L. Declared: A token collection PaymentFeedback reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | evidence (2026-10-13) | Listed for PaymentFeedback, but changes nothing. Declared: A token collection PaymentFeedback reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Semantic Intent` | `mode collection` | Brand, System | `"Brand"` |  | evidence (2026-10-13) | Listed for PaymentFeedback, but changes nothing: the default capsule keeps System. Declared: A token collection PaymentFeedback reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `renderMedia` | `ReactNode` |  |  |  | types | Optional custom media slot that replaces the default IconCapsule |

### Events

_No events._

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- Figma's Payment Feedback shows only a successful payment; pending and failed exist only in code, through AppearanceSystem. _(evidence, 2026-10-13)_
- It doesn't announce the result: it has no live region or alert role. _(evidence, 2026-10-13)_

## Flags

_None._
