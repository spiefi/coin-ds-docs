# TransactionDetails (brief)

> Coin agent pack 0.1.78+23 · documented · full entry: `components/transactiondetails.md` (sources, all facts, flags)

Use Transaction Details to list the facts of one payment as label and value pairs: its ID, the accounts, and how it was paid.

**Use when**
- List the facts of one payment as label and value pairs: its ID, the accounts, and how it was paid.
- The receipt behind a payment.

**Avoid when**
- Avoid: Items people should press, select, copy, collapse or page through: the list has no states, and its items are static text.

**Placement**
- The details sit on the screen a payment opens, under its amount and outcome.
- The screen adds the heading and the action; the list holds only the facts.
- The list has no surface, divider or icon: the screen around it provides those.
- To let people copy an ID or share the receipt, put a button on the screen.

**Key rules**
- **REQUIRED** Write the value as the data itself, never a sentence.
- `modes`: The list has nothing to set: no variants, and no mode changes it.
- `children`: You choose the items and their order: one TransactionDetails.Item each, with a label and a value.
- `children`: A single fact is still a list of one: one TransactionDetails.Item in a TransactionDetails.
- `TransactionDetails.Item`: An item's label defaults to the word Label and its value to the word Value.
- `accessibilityLabel`: Name the list for screen readers with accessibilityLabel; the guide's receipt screen names it “Payment details”.
- On the web the list is named by its accessibilityLabel, and each item is read once as its label and value, unless the item's own accessibilityLabel replaces them; phone screen readers read the items too.
- Name the fact, then give it.

**Example:** The receipt a payment opens: the screen puts the amount and outcome above in a Title and its action, Share receipt, below; the list holds the facts and is named “Payment details” for screen readers.

```tsx
<VStack justifyVertical="space-between" style={{ flex: 1, padding: 16 }}>
  <VStack>
    <Title title="Paid ₹1,200" subtitle="To Rahul Verma · 21 Oct 2026, 4:15 pm" />
    <TransactionDetails accessibilityLabel="Payment details">
      <TransactionDetails.Item label="UPI transaction ID" value="101674916166" />
      <TransactionDetails.Item label="From" value="JioFinance ··1234" />
      <TransactionDetails.Item label="To" value="Rahul Verma · rahul@okjio" />
      <TransactionDetails.Item label="Payment method" value="UPI" />
    </TransactionDetails>
  </VStack>
  <Button label="Share receipt" onPress={() => {}} />
</VStack>
```

**Props:** `children`, `modes`, `style`, `accessibilityLabel`, `TransactionDetails.Item`. (* required)

**Gaps (report, do not work around)**
- On the web, a TransactionDetails.Item on its own, outside a TransactionDetails, renders a list item (li) with no list (#413, Component Fix, To do). The guide never shows a standalone Item.
- Figma draws each Detail Item at a fixed 315 px; the package sizes items to their text, and the list fills its column.

Full entry: `components/transactiondetails.md`. Links: `components/transactiondetails.links.md`.
