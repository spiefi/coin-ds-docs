# TransactionStatus (brief)

> Coin agent pack 0.1.78+12 · flagged · full entry: `components/transactionstatus.md` (sources, all facts, flags)

Use a Transaction Status for the state and date of one payment on one line, as at the foot of a Transaction Bubble.

**Use when**
- Show the state and date of one payment on one line, as at the foot of a TransactionBubble.
- On the payments in a thread, at the foot of each payment's TransactionBubble.

**Avoid when**
- Avoid: A status people press or select, or one that shows loading: the line has no states of its own, and it doesn't press, select, or load.

**Placement**
- Every TransactionBubble ends with a TransactionStatus of its own: the bubble draws the line from its own status, date and modes.
- The line is 18 px tall: an 18 px mark, 4 px of space, then 12 px text on a 16 px line.
- The line has no width of its own and grows with its words.
- A narrower column, or a TransactionBubble, cuts the words at the end, and the mark keeps its 18 px.

**Key rules**
- `Transaction Status`: The Transaction Status mode sets the mark: Request an orange “!”, Paid a green tick, Declined a red cross, and Expired, the default, a grey “!”.
- `Transaction Status` = `Request`: Request for a request still waiting: an orange “!”.
- `Transaction Status` = `Paid`: Paid when the money went through: a green tick.
- `Transaction Status` = `Declined`: Declined when the bank turned it down: a red cross.
- `Transaction Status` = `Expired`: Expired when the request ran out: a grey “!”.
- `Transaction Status` = `Expired`: With no mode the line is Expired: a grey “!” beside “Expired”.
- `status`: status and date are free text that the mode doesn't change, so set the word and the mode together.
- `status`: With status left out the word follows the mode, except Request, which still shows “Expired” beside an orange “!”.

**Example:** A paid payment: the word and the Paid mode set together, for a green tick beside “Paid · 21 Oct 2026”.

```tsx
<TransactionStatus status="Paid" date="21 Oct 2026" modes={{ 'Transaction Status': 'Paid' }} />
```

**Props:** `status`, `date`, `modes`, `style`, `disableTruncation`. (* required)

**Modes it reads:** Transaction Status.

**Gaps (report, do not work around)**
- Figma's Transaction Status line ends in a chevron; in the package the chevron belongs to TransactionBubble, so a TransactionStatus on its own has none.
- In Figma the mode picks the icon, the colour and the word together; in the package the mode picks the mark, and status and date are free text, so code passes the word.
- The Coin Components Library has no Transaction Status: it is a Coin Subcomponents part that designers meet inside Transaction Bubble.

Full entry: `components/transactionstatus.md`. Links: `components/transactionstatus.links.md`.
