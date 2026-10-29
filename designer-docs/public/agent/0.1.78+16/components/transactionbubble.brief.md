# TransactionBubble (brief)

> Coin agent pack 0.1.78+16 · flagged · full entry: `components/transactionbubble.md` (sources, all facts, flags)

Use a Transaction Bubble for one payment in a chat thread: who it was with, the amount, and its status, opening its details.

**Use when**
- One payment in a chat thread: who it was with, the amount, and its status, opening its details.
- One payment per bubble; its details are one tap away.

**Avoid when**
- Avoid: Receipt fields inside the bubble, such as a UPI ID or a bank account: the bubble becomes a receipt; put these in TransactionDetails, which opens from the bubble. Use instead: TransactionDetails.

**Placement**
- The bubble has no width of its own: it fills its host, so the thread places and sizes it.
- In a thread of the payments between two people, the ones you send sit on the right and the ones you receive on the left.
- In Figma’s thread a bubble is 231 px wide in a 328 px column, on the right for payments you send.

**Key rules**
- `Transaction Status`: Set the Transaction Status mode on the bubble to set its status mark: Request an orange “!”, Paid a green tick, Declined a red cross, and Expired, the default, a grey “!”.
- `Transaction Status` = `Paid`: Set the mode that goes with the word: Paid with the Paid mode shows a green mark, where the word alone leaves the default Expired mode’s grey “!”.
- `status`: status and date give the words of the status line.
- `children`: children add a row between the amount and the status, such as the note sent with the payment.
- `statusSlot`: statusSlot replaces the status line and the chevron with your own content.
- `onPress`: In a thread, each bubble’s onPress opens that payment’s details.
- `statusSlot`: Without onPress the chevron still shows: if the bubble doesn’t open, drop the chevron with statusSlot.
- `disableTruncation` = `true`: disableTruncation lets the description wrap.

**Example:** Payments in a thread, the guide's In context: the payment you sent sits on the right and the request you received on the left, each 231 px wide as in Figma, with the Transaction Status mode that goes with its word and an accessibilityLabel with the person, the amount, the status and the date. Each onPress opens that payment's details; the empty functions stand for that wiring.

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

**Props:** `description`, `value`, `currency`, `status`, `date`, `statusSlot`, `children`, `modes`, `onPress`, `style`, `accessibilityLabel`, `accessibilityHint`, `webAccessibilityProps`, `disableTruncation`. (* required)

**Modes it reads:** Color Mode, context 10, Context2, Context3, context5, List Item Style, NavArrow Direction, Page type, Profile Card Appearance, Transaction Status.

**Gaps (report, do not work around)**
- The bubble is 119 px tall with one line of description where Figma's is 109, because the amount sits on a 34 px line.
- Figma's bubble is a fixed 231 px wide; the package's fills its host.
- In the published Storybook, the Successful story keeps the orange mark and the slot story shows two amounts (reported).

Full entry: `components/transactionbubble.md`. Links: `components/transactionbubble.links.md`.
