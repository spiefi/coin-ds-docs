# TransactionBubble

> Coin agent pack 0.1.78+18 (pilot). Generated from `components/transactionbubble.json`; the JSON is the source of truth.

- **State:** flagged (1 flag, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `e7ed622` · built 2026-10-29T10:51:06Z
- **Category:** content (for discovery only, not a limit on composition) · **Tags:** payment bubble, chat payment, payment in thread, transaction row, payment card
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=transactionbubble) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1517-1155) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-transactionbubble--docs)

Use a Transaction Bubble for one payment in a chat thread: who it was with, the amount, and its status, opening its details.

## Use when

- **recommended** One payment in a chat thread: who it was with, the amount, and its status, opening its details.  
  _From summary: “Use a Transaction Bubble for one payment in a chat thread: who it was with, the amount, and its status, opening its details.”_
- **recommended** One payment per bubble; its details are one tap away.  
  _From corePrinciple: “One payment per bubble; its details are one tap away.”_

## Avoid when

- **discouraged** Receipt fields inside the bubble, such as a UPI ID or a bank account: the bubble becomes a receipt; put these in TransactionDetails, which opens from the bubble. Use instead: `TransactionDetails`.  
  _From doDont: “The bubble becomes a receipt; put these in Transaction Details.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Description | description, 14 px on one line; it ellipsizes unless disableTruncation. | yes | anatomy: “description, 14 px on one line; it ellipsizes unless disableTruncation.” |
| Amount | A MoneyValue from value and currency, at the bubble’s size. | yes | anatomy: “A Money Value from value and currency, at the bubble’s size.” |
| Status | A TransactionStatus from status and date; the mode sets its mark. | no | anatomy: “A Transaction Status from status and date; the mode sets its mark.” |
| Chevron | A NavArrow that says the bubble opens; statusSlot removes it. | no | anatomy: “A Nav Arrow that says the bubble opens; statusSlot removes it.” |
| Bubble | White, with a 1 px grey border, 23 px corners and 16 px padding. | yes | anatomy: “White, with a 1 px grey border, 23 px corners and 16 px padding.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `statusSlot` | `ReactNode` | types |
| `children` | `ReactNode` | types |

## Placement

- **recommended** The bubble has no width of its own: it fills its host, so the thread places and sizes it.  
  _From sizing: “The bubble has no width of its own: it fills its host.”_
- **recommended** In a thread of the payments between two people, the ones you send sit on the right and the ones you receive on the left.  
  _From inContext: “A thread lists the payments between two people: the ones you send sit on the right, the ones you receive on the left.”_
- **recommended** In Figma’s thread a bubble is 231 px wide in a 328 px column, on the right for payments you send.  
  _From sizing: “In Figma’s thread it is 231 px of a 328 px column, on the right for payments you send.”_

## Configuration

- **recommended** `Transaction Status`: Set the Transaction Status mode on the bubble to set its status mark: Request an orange “!”, Paid a green tick, Declined a red cross, and Expired, the default, a grey “!”.  
  _From configuration: “Set the Transaction Status mode on the bubble to set its status mark: Request an orange “!”, Paid a green tick, Declined a red cross, and Expired, the default, a grey “!”; status and date give the words.”_
- **recommended** `Transaction Status` = `Paid`: Set the mode that goes with the word: Paid with the Paid mode shows a green mark, where the word alone leaves the default Expired mode’s grey “!”.  
  _From doDont: “Paid with the Paid mode: a green mark.”_
- **recommended** `status`: status and date give the words of the status line.  
  _From configuration: “status and date give the words.”_
- **recommended** `children`: children add a row between the amount and the status, such as the note sent with the payment.  
  _From configuration: “children add a row between the amount and the status, such as the note sent with the payment.”_
- **recommended** `statusSlot`: statusSlot replaces the status line and the chevron with your own content.  
  _From configuration: “statusSlot replaces the status line and the chevron with your own content.”_
- **recommended** `onPress`: In a thread, each bubble’s onPress opens that payment’s details.  
  _From inContext: “each bubble’s onPress opens that payment’s details.”_
- **recommended** `statusSlot`: Without onPress the chevron still shows: if the bubble doesn’t open, drop the chevron with statusSlot.  
  _From states: “Without onPress the bubble is a picture of the payment, but its chevron still shows; if it doesn’t open, drop the chevron with statusSlot.”_
- **recommended** `disableTruncation` = `true`: disableTruncation lets the description wrap.  
  _From content: “disableTruncation lets the description wrap.”_

## Content

- **recommended** `description`: Write description as what happened and with whom, such as “Paid to Priya Sharma”; it gets one line, so keep it short or set disableTruncation.  
  _From content: “Write description as what happened and with whom, such as Paid to Priya Sharma; it gets one line, so keep it short or set disableTruncation.”_
- **recommended** `value`: Give value without a currency sign: currency adds the ₹.  
  _From content: “Give value without a currency sign: currency adds the ₹.”_
- **recommended** `status`: Write status as one word that matches the mode, and date short.  
  _From content: “Write status as one word that matches the mode, and date short.”_
- **recommended** Keep the bubble to who and how much: the receipt opens from the bubble.  
  _From doDont: “The receipt opens from the bubble.”_

Good: “Paid to Priya Sharma”, “Request from Priya Sharma”, “For Saturday’s dinner”

Bad: “UPI ID 101674916166 · HDFC Bank ··4821”

## States

| State | When | From |
| --- | --- | --- |
| Picture | No onPress: nothing to press, yet the chevron shows. | states: “No onPress: nothing to press, yet the chevron shows.” |
| Button | With onPress the whole bubble is one button, and it fades a little while pressed. | states: “With onPress the whole bubble is one button, and it fades a little while pressed.” |

## Accessibility

- **recommended** `accessibilityLabel`: When the bubble presses, set accessibilityLabel to the person, the amount, the status, and the date.  
  _From content: “When the bubble presses, set accessibilityLabel to the person, the amount, the status, and the date.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| The mode with the word | Only the word | Paid gets the default Expired mode’s grey “!”. |
| Who and how much | Receipt fields inside | The bubble becomes a receipt; put these in Transaction Details. |

## Examples

### Payments in a thread, the guide's In context: the payment you sent sits on the right and the request you received on the left, each 231 px wide as in Figma, with the Transaction Status mode that goes with its word and an accessibilityLabel with the person, the amount, the status and the date. Each onPress opens that payment's details; the empty functions stand for that wiring.

```tsx
<VStack>
  <TransactionBubble
    style={{ width: 231, maxWidth: '100%', alignSelf: 'flex-end' }}
    description="Paid to Priya Sharma"
    value="1,200"
    status="Paid"
    date="21 Oct 2026"
    modes={{ 'Transaction Status': 'Paid' }}
    onPress={() => {}}
    accessibilityLabel="Paid to Priya Sharma, ₹1,200, paid 21 Oct 2026"
  />
  <TransactionBubble
    style={{ width: 231, maxWidth: '100%', alignSelf: 'flex-start' }}
    description="Request from Priya Sharma"
    value="450"
    status="Requested"
    date="Today"
    modes={{ 'Transaction Status': 'Request' }}
    onPress={() => {}}
    accessibilityLabel="Request from Priya Sharma, ₹450, requested today"
  />
</VStack>
```

_From inContext: “A thread lists the payments between two people: the ones you send sit on the right, the ones you receive on the left.”_

### A note sent with the payment, the guide's With a note: children add a row between the amount and the status.

```tsx
<TransactionBubble
  style={{ width: 231, maxWidth: '100%' }}
  description="Paid to Priya Sharma"
  value="1,200"
  status="Paid"
  date="21 Oct 2026"
  modes={{ 'Transaction Status': 'Paid' }}
>
  <Text text="For Saturday’s dinner" />
</TransactionBubble>
```

_From configuration: “children add a row between the amount and the status, such as the note sent with the payment.”_

### A bubble that doesn't open, the guide's Without the chevron: statusSlot replaces the status line and the chevron with a TransactionStatus of its own, which takes the bubble's Transaction Status mode.

```tsx
<TransactionBubble
  style={{ width: 231, maxWidth: '100%' }}
  description="Paid to Priya Sharma"
  value="1,200"
  modes={{ 'Transaction Status': 'Paid' }}
  statusSlot={<TransactionStatus status="Paid" date="21 Oct 2026" />}
/>
```

_From states: “if it doesn’t open, drop the chevron with statusSlot.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `description` | `string` |  | `"Payment to Uber India"` |  | types | Default "Payment to Uber India", from the component source. |
| `value` | `string \| number` |  | `"56"` |  | evidence (2026-10-27) | Shown by a MoneyValue. The amount is announced once, as an image named with the currency and the digits (“₹1,200”); the visible ₹ and digits are hidden from screen readers. Declared: Default "56", from the component source. |
| `currency` | `string` |  | `"₹"` |  | evidence (2026-10-25) | Defaults to ₹; ISO codes such as INR show their symbol. The amount is drawn at the bubble's size: ₹ 28 px, digits 26 px, weight 900. Declared: Default "₹", from the component source. |
| `status` | `string` |  |  |  | evidence (2026-10-27) | The status line stays on one line: in a 231 px bubble a long status and date end in an ellipsis, and the chevron stays inside. |
| `date` | `string` |  | `"20 Mar 2025"` |  | types | Default "20 Mar 2025", from the component source. |
| `statusSlot` | `React.ReactNode` |  |  |  | evidence (2026-10-25) | Replaces the whole status row, chevron included; what it holds gets the bubble's modes. Declared: Slot for the status area. When provided, replaces the default TransactionStatus + NavArrow. |
| `children` | `React.ReactNode` |  |  |  | evidence (2026-10-25) | Rendered between the amount and the status row, with the bubble's modes (a child's own modes win). |
| `modes` | `Modes` |  |  |  | types |  |
| `onPress` | `() => void` |  |  |  | evidence (2026-10-25) | Makes the root a Pressable button, at opacity 0.85 while pressed. |
| `style` | `ViewStyle` |  |  |  | evidence (2026-10-25) | Goes after the container style. The bubble sets no width: it fills its host. |
| `accessibilityLabel` | `string` |  |  |  | types |  |
| `accessibilityHint` | `string` |  |  |  | types |  |
| `webAccessibilityProps` | `WebAccessibilityProps` |  |  |  | types |  |
| `disableTruncation` | `boolean` |  |  |  | types | When `true`, disables text truncation: the trailing ellipsis (`…`) is never shown and any `numberOfLines` clamp is ignored, so the text wraps to as many lines as it needs even when horizontal space is tight. |
| `...Omit<PressableProps, 'style' | 'children' | 'onPress'>` | `Omit<PressableProps, 'style' \| 'children' \| 'onPress'>` |  |  |  | types | Inherited React Native props the component also accepts. They are not part of the design contract and no guide documents them. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection TransactionBubble reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 10` | `mode collection` | Default, jioPlus | `"Default"` |  | types | A token collection TransactionBubble reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context2` | `mode collection` | Default, AppBar | `"Default"` |  | types | A token collection TransactionBubble reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context3` | `mode collection` | Default, Transaction Bubble, Balance & Cards, Amount Input | `"Default"` |  | types | A token collection TransactionBubble reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context5` | `mode collection` | Default, Fullscreen Modal, Mode 1 | `"Default"` |  | types | A token collection TransactionBubble reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `List Item Style` | `mode collection` | Default, Boxed, Minimal | `"Default"` |  | types | A token collection TransactionBubble reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `NavArrow Direction` | `mode collection` | Left&Right, Top&Bottom | `"Left&Right"` |  | types | A token collection TransactionBubble reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection TransactionBubble reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Profile Card Appearance` | `mode collection` | Default, Premium | `"Default"` |  | types | A token collection TransactionBubble reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Transaction Status` | `mode collection` | Request, Paid, Declined, Expired | `"Expired"` |  | evidence (2026-10-28) | Sets the status mark: Request an orange “!”, Paid a green tick, Declined a red cross, Expired a grey “!”. With no Transaction Status mode the bubble is the Expired mode: a grey “!”. Declared: A token collection TransactionBubble reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `statusSlot` | `React.ReactNode` |  |  |  | types | Slot for the status area. When provided, replaces the default TransactionStatus + NavArrow. |
| `children` | `React.ReactNode` |  |  |  | types |  |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onPress` | `() => void` |  |  |  | types |  |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- The bubble is 119 px tall with one line of description where Figma's is 109, because the amount sits on a 34 px line. _(evidence, 2026-10-28)_
- Figma's bubble is a fixed 231 px wide; the package's fills its host. _(evidence, 2026-10-25)_
- In the published Storybook, the Successful story keeps the orange mark and the slot story shows two amounts (reported). _(evidence, 2026-10-28)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `(whole entry)` · human: The guide was checked on 28 October on the installed build (0.1.78-dbe0e02) for #394 and #346, but three of its sentences describe the bubble before the #395 fixes that dbe0e02 also carries, and the entry leaves them out. States: “Its default name is the description and the status word, with no amount or date, so set accessibilityLabel.” The installed bubble's default name is the description, the amount with its currency, the status and the date (“Paid to Priya Sharma, ₹1,200, Paid, 21 Oct 2026”), or the slot's words when statusSlot is set (TransactionBubble.tsx lines 110–144, 242–250). Sources: “its description is Regular where Figma’s is Medium, and its default accessible name leaves out the amount and date”; the description now reads its 500 weight token, Medium like Figma (198–202, 226). Configuration: “No other mode changes the bubble.”; the package's tokens say otherwise: Page type JioPlus turns the amount and the chevron white, context 10 jioPlus and context5 turn the chevron white, and Context2 AppBar and NavArrow Direction resize or turn it. The Content advice to set accessibilityLabel on a pressable bubble is kept. The guide fix belongs to #395 (open; a work note there lists these sentences). Re-extract once #395 is closed and the guide is re-checked and published. Added by Claude Code in the overnight run agentpack-batch11, for Marcin to confirm.
