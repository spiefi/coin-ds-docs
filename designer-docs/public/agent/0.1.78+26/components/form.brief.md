# Form (brief)

> Coin agent pack 0.1.78+26 · flagged · full entry: `components/form.md` (sources, all facts, flags)

Use a Form to stack related fields and show the errors your screen sends for each one, such as a bank account’s details.

**Use when**
- Stack related fields and show the errors your screen sends for each one, such as a bank account’s details.

**Avoid when**
- Avoid: A single field on its own: the Storybook docs, as the evidence records them, say not to wrap a lone field in a Form.
- Avoid: A one-time code: the Storybook docs, as the evidence records them, say not to use a Form for OTP.

**Placement**
- A Form fills its container and adds 12 px between its fields, with no padding.
- A Form draws nothing of its own: no background, border, or title.
- Each Form Field keeps its own height in a Form: 72 px with a label, 96 px with a message.
- In the guide’s bank-details screen, the Verify account button sits outside the Form and stays enabled.

**Key rules**
- `validationErrors`: Give each field a name, and pass the errors keyed by those names in validationErrors.
- Form has no other options that change what people see.
- `validationErrors`: An error for one field: only the field whose name matches shows the message.
- `validationErrors`: Given a list of messages for one field, the field shows only the first message.
- `validationErrors`: Like the guide’s bank-details screen: when people tap Verify, the screen checks the details and passes the errors to the Form.
- Name every field: the message appears under the field it’s about.
- Avoid: Do not leave a field unnamed: the Form has an error for it, but the field never shows it.
- `children`: Use a Form Field for each value: Form Field shows the message under the field.

**Example:** Checking bank details, the guide's In context: a Card holds the Form and the Verify account Button, which sits outside the Form and stays enabled. Shown after people tapped Verify account with the account number and IFSC code empty: the screen's check passed these errors, keyed by the fields' names, and each named field shows its own. Editing a field clears its message. The inline errors and the onChangeText and onPress stubs stand in for the screen's own state and check.

```tsx
<Card>
  <VStack>
    <Form validationErrors={{ account: 'Account numbers have 9 to 18 digits', ifsc: 'IFSC codes have 11 characters' }}>
      <FormField name="holder" label="Account holder name" value="Asha Rao" onChangeText={() => {}} />
      <FormField name="account" type="number" label="Account number" value="" onChangeText={() => {}} />
      <FormField name="ifsc" label="IFSC code" value="" onChangeText={() => {}} />
    </Form>
    <Button label="Verify account" onPress={() => {}} />
  </VStack>
</Card>
```

**Props:** `children`*, `validationErrors`, `onSubmit`, `modes`, `style`, `accessibilityLabel`, `testID`. (* required)

**Gaps (report, do not work around)**
- Form shows no error summary of its own: each error shows only under its field (#207).
- The published Storybook for Form is stale, and its docs page claims mode theming (#207).

Full entry: `components/form.md`. Links: `components/form.links.md`.
