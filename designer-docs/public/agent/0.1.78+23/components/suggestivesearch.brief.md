# SuggestiveSearch (brief)

> Coin agent pack 0.1.78+23 · flagged · full entry: `components/suggestivesearch.md` (sources, all facts, flags)

Use a Suggestive Search to let people type and pick one item from a known list, such as their bank, with matches shown as they type.

**Use when**
- Let people type and pick one item from a known list, such as their bank, with matches shown as they type.

**Placement**
- Suggestive Search fills its container.
- The label is 17 px tall with 8 px to a 47 px field.
- The list opens 6 px below the field with 44 px rows, floats over what follows, and scrolls after 240 px.
- `isInvalid` = `true`: On the guide's add-a-bank-account screen, Continue checks that a bank was picked from the list and, if not, shows the field's error (isInvalid with errorMessage); the open list floats over the button.

**Key rules**
- `supportText`: Add supportText for a short hint under the field.
- `isRequired` = `true`: Set isRequired to mark the field required: a red asterisk after the label, and screen readers hear “required”.
- `emptyMessage`: Set emptyMessage to say so when nothing matches; without it the list just disappears.
- Avoid: `emptyMessage`: Do not leave emptyMessage out and let the list vanish: people can’t tell whether anything matched.
- `maxResults`: Set maxResults to cap the list; otherwise it scrolls after about five rows.
- `highlightMatch` = `false`: Set highlightMatch to false to show matches in plain text.
- `items`: Pass an option as { value, label, disabled: true } to keep it listed but not choosable, such as a payee still being verified.
- Avoid: `isInvalid` = `true`: Do not set isInvalid without an errorMessage: a red field doesn’t say what’s wrong.

**Example:** Adding a bank account: people type part of their bank’s name and pick it, then press Continue. The screen checks that a bank was picked; errorMessage shows only once it sets isInvalid, as in the error state.

```tsx
<Card>
  <Card.Title>Add a bank account</Card.Title>
  <SuggestiveSearch
    label="Bank name"
    placeholder="Search bank name"
    items={['HDFC Bank', 'Himachal Pradesh Gramin Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra Bank', 'Punjab National Bank', 'Bank of Baroda', 'Canara Bank', 'Union Bank of India', 'IndusInd Bank', 'Yes Bank']}
    emptyMessage="No matching banks"
    errorMessage="Choose your bank from the list."
    onValueChange={() => {}}
  />
  <Button label="Continue" onPress={() => {}} />
</Card>
```

**Props:** `label`, `placeholder`, `items`, `inputValue`, `defaultInputValue`, `onInputChange`, `value`, `defaultValue`, `onValueChange`, `filter`, `minChars`, `maxResults`, `highlightMatch`, `emptyMessage`, `renderItem`, `open`, `defaultOpen`, `onOpenChange`, `menuMaxHeight`, `menuOffset`, `isRequired`, `isDisabled`, `isInvalid`, `isReadOnly`, and 14 more. (* required)

**Modes it reads:** Color Mode, Dropdown Item State, FormField States, Status.

**Gaps (report, do not work around)**
- Suggestive Search still differs from Figma (raised in #233, not claimed by its fix): it bolds the typed text where Figma greys it, its placeholder colour (#888a8d) differs, it marks the chosen row with a grey fill and a 16 px check (Figma: white with a 20 px check), and its rows are 44 px (Figma: 43 px).

Full entry: `components/suggestivesearch.md`. Links: `components/suggestivesearch.links.md`.
