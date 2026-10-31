# DropdownInput (brief)

> Coin agent pack 0.1.78+26 · documented · full entry: `components/dropdowninput.md` (sources, all facts, flags)

Use a Dropdown Input in a form when people choose one option from a list of four or more.

**Use when**
- In a form, when people choose one option from a list of four or more.

**Avoid when**
- Avoid: Two options, such as Yes or No: in a list they need an extra tap to see both answers.

**Placement**
- Place it in a form, such as the In context transfer form, where From and To fields sit above a Continue button.
- The field fills its container and is 48 px tall.
- The field narrows with its column; the chevron stays at the end.
- Pressing the field opens a Dropdown of the options just below it, as a layer over the page.

**Key rules**
- `label`: Give every field a label.
- `placeholder`: A label and a placeholder are the minimum for a clear field.
- `supportText`: Add support text when people need help choosing; it sits under the field.
- `items`: Pass the options as items; the chosen option's label replaces the placeholder in the field.
- `value`: The screen owns each value: pass value and update it in onValueChange, and check the form when people continue.
- `defaultOpen`: Leave the list closed until people press the field (open and defaultOpen are left unset).
- `isRequired`: Mark a field the form needs with isRequired: an asterisk follows the label.
- `errorMessage`: When a field is invalid (isInvalid), errorMessage replaces the support text.

**Example:** The guide's In context: choose accounts for a transfer. A Card holds a title, a From and a To field with the same four accounts, and a Continue button. The screen owns each value (value and onValueChange); when people continue it marks an empty field invalid (isInvalid) and its errorMessage says how to fix it.

```tsx
<Card>
  <VStack>
    <Text text="Transfer money" />
    <DropdownInput
      label="From"
      placeholder="Select an account"
      items={[
        { value: 'savings', label: 'Savings account' },
        { value: 'checking', label: 'Checking account' },
        { value: 'brokerage', label: 'Brokerage account' },
        { value: 'recurring', label: 'Recurring deposit' },
      ]}
      value={null}
      onValueChange={() => {}}
      errorMessage="Choose an account to transfer from"
    />
    <DropdownInput
      label="To"
      placeholder="Select an account"
      items={[
        { value: 'savings', label: 'Savings account' },
        { value: 'checking', label: 'Checking account' },
        { value: 'brokerage', label: 'Brokerage account' },
        { value: 'recurring', label: 'Recurring deposit' },
      ]}
      value={null}
      onValueChange={() => {}}
      errorMessage="Choose an account to transfer to"
    />
    <Button label="Continue" onPress={() => {}} />
  </VStack>
</Card>
```

**Props:** `label`, `placeholder`, `items`, `value`, `defaultValue`, `onValueChange`, `children`, `renderValue`, `open`, `defaultOpen`, `onOpenChange`, `placement` (top | bottom | auto), `isRequired`, `isDisabled`, `isInvalid`, `isReadOnly`, `supportText`, `errorMessage`, `menuMaxHeight`, `menuOffset`, `matchTriggerWidth`, `closeOnBackdropPress`, `modes`, `style`, and 7 more. (* required)

**Modes it reads:** AppearanceBrand, Button / State, Color Mode, Dropdown Item State, Emphasis, FormField States, Page type, Status.

Full entry: `components/dropdowninput.md`. Links: `components/dropdowninput.links.md`.
