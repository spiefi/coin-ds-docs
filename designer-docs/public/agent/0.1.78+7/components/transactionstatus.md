# TransactionStatus

> Coin agent pack 0.1.78+7 (pilot). Generated from `components/transactionstatus.json`; the JSON is the source of truth.

- **State:** flagged (1 flag, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `e7ed622` · built 2026-10-29T00:57:35Z
- **Category:** feedback (for discovery only, not a limit on composition) · **Tags:** payment status, status line, paid, declined, expired, request
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=transactionstatus) · [Figma](https://www.figma.com/design/dSlK8ueQ7wlbyUSZd4f8QO/Coin-Subcomponents?node-id=152-1242) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-transactionstatus--docs)

Use a Transaction Status for the state and date of one payment on one line, as at the foot of a Transaction Bubble.

## Use when

- **recommended** Show the state and date of one payment on one line, as at the foot of a TransactionBubble.  
  _From summary: “Use a Transaction Status for the state and date of one payment on one line, as at the foot of a Transaction Bubble.”_
- **recommended** On the payments in a thread, at the foot of each payment's TransactionBubble.  
  _From inContext: “On the payments in a thread”_

## Avoid when

- **discouraged** A status people press or select, or one that shows loading: the line has no states of its own, and it doesn't press, select, or load.  
  _From states: “The line has no states of its own: it doesn’t press, select, or load.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Mark | 18 px; the mode picks a tick, a cross, or “!”, and its colour. | yes | anatomy: “18 px; the mode picks a tick, a cross, or “!”, and its colour.” |
| Status and date | status, a middle dot, then date: one text on one line. | yes | anatomy: “status, a middle dot, then date: one text on one line.” |
| Line | The row of mark and text. No width of its own: as wide as its words. | yes | anatomy: “No width of its own: as wide as its words.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

_No slots._

## Placement

- **recommended** Every TransactionBubble ends with a TransactionStatus of its own: the bubble draws the line from its own status, date and modes.  
  _From inContext: “Every Transaction Bubble ends with a Transaction Status.”_
- **recommended** The line is 18 px tall: an 18 px mark, 4 px of space, then 12 px text on a 16 px line.  
  _From sizing: “The line is 18 px tall: an 18 px mark, 4 px of space, then 12 px text on a 16 px line.”_
- **recommended** The line has no width of its own and grows with its words.  
  _From sizing: “It has no width of its own and grows with its words.”_
- **recommended** A narrower column, or a TransactionBubble, cuts the words at the end, and the mark keeps its 18 px.  
  _From sizing: “A narrower column, or a Transaction Bubble, cuts them at the end, and the mark keeps its 18 px.”_

## Configuration

- **recommended** `Transaction Status`: The Transaction Status mode sets the mark: Request an orange “!”, Paid a green tick, Declined a red cross, and Expired, the default, a grey “!”.  
  _From configuration: “The Transaction Status mode sets the mark, as in Figma: Request an orange “!”, Paid a green tick, Declined a red cross, and Expired, the default, a grey “!”.”_
- **recommended** `Transaction Status` = `Request`: Request for a request still waiting: an orange “!”.  
  _From configuration: “An orange “!”: a request still waiting.”_
- **recommended** `Transaction Status` = `Paid`: Paid when the money went through: a green tick.  
  _From configuration: “A green tick: the money went through.”_
- **recommended** `Transaction Status` = `Declined`: Declined when the bank turned it down: a red cross.  
  _From configuration: “A red cross: the bank turned it down.”_
- **recommended** `Transaction Status` = `Expired`: Expired when the request ran out: a grey “!”.  
  _From configuration: “A grey “!”: the request ran out.”_
- **recommended** `Transaction Status` = `Expired`: With no mode the line is Expired: a grey “!” beside “Expired”.  
  _From sources: “with no mode it is Expired: a grey “!” beside “Expired”.”_
- **recommended** `status`: status and date are free text that the mode doesn't change, so set the word and the mode together.  
  _From configuration: “status and date are free text that the mode doesn’t change, so set the word and the mode together.”_
- **recommended** `status`: With status left out the word follows the mode, except Request, which still shows “Expired” beside an orange “!”.  
  _From evidence: “With `status` left out the word follows the mode, except Request, which still shows “Expired” beside an orange “!” (token copy; Marcin's call).”_
- **recommended** `disableTruncation` = `true`: Set disableTruncation to let the line wrap instead of ending in an ellipsis.  
  _From states: “disableTruncation lets it wrap instead.”_
- **recommended** In a TransactionBubble, set the Transaction Status mode on the bubble: the bubble passes its modes to the line, and its status and date props give the words.  
  _From inContext: “Set the Transaction Status mode on the bubble, as in Figma: the bubble passes its modes to the line, and its status and date props give the words.”_

## Content

- **recommended** One word for the state; the mode colours the mark.  
  _From corePrinciple: “One word for the state; the mode colours the mark.”_
- **recommended** Write status as one word that matches the mode: Requested, Paid, Declined, or Expired.  
  _From content: “Write status as one word that matches the mode: Requested, Paid, Declined, or Expired.”_
- **recommended** Write date short, such as 21 Oct 2026, or Today for a recent payment.  
  _From content: “Write date short, such as 21 Oct 2026, or Today for a recent payment”_
- **recommended** Pass only the word and the date: the line adds the middle dot.  
  _From content: “the line adds the middle dot.”_
- **recommended** Request and Expired share the “!” mark, so the word has to say which.  
  _From content: “Request and Expired share the “!” mark, so the word has to say which.”_
- **recommended** The word and the colour agree.  
  _From doDont: “The word and the colour agree”_
- **discouraged** Do not pair a word with a mode that disagrees: Expired with the Request mode gets an orange mark, as if it still needs action.  
  _From doDont: “Expired with the Request mode gets an orange mark, as if it still needs action.”_
- **discouraged** Do not write a sentence as status: in a bubble, the line is cut and the date is lost.  
  _From doDont: “In a bubble, the line is cut and the date is lost.”_

Good: “Requested”, “Paid”, “Declined”, “Expired”, “21 Oct 2026”, “Today”, “Paid · 21 Oct 2026”, “Requested · Today”

Bad: “Declined by your bank · 21 Oct 2026”

## States

| State | When | From |
| --- | --- | --- |
| One line | By default. In a column narrower than the words it ellipsizes at the end, so the date is cut first; the mark keeps its 18 px. | states: “In a column narrower than the words, it ellipsizes at the end, so the date goes first” |
| Wrapped | With disableTruncation: the text wraps and the date moves to a second line. | states: “The date moves to a second line.” |

## Accessibility

_None in the guide._

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Mode matches the word | A mode that disagrees | Expired with the Request mode gets an orange mark, as if it still needs action. |
| One word | A sentence | In a bubble, the line is cut and the date is lost. |

## Examples

### A paid payment: the word and the Paid mode set together, for a green tick beside “Paid · 21 Oct 2026”.

```tsx
<TransactionStatus status="Paid" date="21 Oct 2026" modes={{ 'Transaction Status': 'Paid' }} />
```

_From configuration: “A green tick: the money went through.”_

### A request that ran out: Expired is the default mode, so the line sets no mode and shows a grey “!”.

```tsx
<TransactionStatus status="Expired" date="20 Mar 2025" />
```

_From configuration: “Expired, the default, a grey “!”.”_

### Payments in a thread: each TransactionBubble ends with its own status line, so the words go in the bubble's status and date and the Transaction Status mode is set on the bubble.

```tsx
<VStack alignHorizontal="flex-end">
  <TransactionBubble
    style={{ width: 231, maxWidth: '100%' }}
    description="Paid to Priya Sharma"
    value="1,200"
    status="Paid"
    date="21 Oct 2026"
    modes={{ 'Transaction Status': 'Paid' }}
  />
  <TransactionBubble
    style={{ width: 231, maxWidth: '100%' }}
    description="Request to Rahul Verma"
    value="450"
    status="Requested"
    date="Today"
    modes={{ 'Transaction Status': 'Request' }}
  />
  <TransactionBubble
    style={{ width: 231, maxWidth: '100%' }}
    description="Payment to Uber India"
    value="56"
    status="Declined"
    date="20 Mar 2025"
    modes={{ 'Transaction Status': 'Declined' }}
  />
</VStack>
```

_From inContext: “Set the Transaction Status mode on the bubble, as in Figma: the bubble passes its modes to the line, and its status and date props give the words.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `status` | `string` |  |  |  | evidence (2026-10-27) | With status left out the word follows the mode (its copy token), except Request, which still shows “Expired” beside an orange “!” (the token's copy, kept by Marcin's decision). Declared: Status text, e.g. "Expired". Defaults to `transactionStatus/copy` for the active mode. |
| `date` | `string` |  | `"20 Mar 2025"` |  | types | Date text, e.g. "20 Mar 2025". Default "20 Mar 2025", from the component source. |
| `modes` | `Modes` |  |  |  | types | Modes for design token resolution. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | evidence (2026-10-25) | style goes last on the root. The line takes no onPress, accessibility props, testID, or rest props. Declared: Optional container style. |
| `disableTruncation` | `boolean` |  |  |  | evidence (2026-10-27) | The mark stays 18 × 18 when the line is cut (a 120 px column and row, a 200 px VStack) and when disableTruncation lets the text wrap. Declared: When `true`, disables text truncation: the trailing ellipsis (`…`) is never shown and any `numberOfLines` clamp is ignored, so the text wraps to as many lines as it needs even when horizontal space is tight. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Transaction Status` | `mode collection` | Request, Paid, Declined, Expired | `"Expired"` |  | evidence (2026-10-28) | Picks the mark at 18 × 18: Request an orange “!”, Paid a green tick, Declined a red cross, Expired a grey “!”. With no mode the line is the Expired mode: a grey “!” beside “Expired · 20 Mar 2025”. Declared: A token collection TransactionStatus reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

_No slots._

### Events

_No events._

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- Figma's Transaction Status line ends in a chevron; in the package the chevron belongs to TransactionBubble, so a TransactionStatus on its own has none. _(evidence, 2026-10-28)_
- In Figma the mode picks the icon, the colour and the word together; in the package the mode picks the mark, and status and date are free text, so code passes the word. _(evidence, 2026-10-28)_
- The Coin Components Library has no Transaction Status: it is a Coin Subcomponents part that designers meet inside Transaction Bubble. _(evidence, 2026-10-25)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/accessibility` · trace-check: The guide gives no accessibility guidance; left empty rather than guessed.
