# InputSearch (brief)

> Coin agent pack 0.1.78+24 · documented · full entry: `components/inputsearch.md` (sources, all facts, flags)

Use an Input Search to search a list, with a clear button that appears as people type and an optional hint below.

**Use when**
- Search a list, with a clear button that appears as people type and an optional hint below.
- Say what people can find, and let them start over.
- Find one item in a list on the screen, such as a payee, as in the guide's In context.

**Avoid when**
- Avoid: Collecting a value, such as an account number: use a Form Field, whose label stays while people type. Use instead: FormField.
- Avoid: The field needs a disabled or an error state: Input Search has neither.

**Placement**
- Input Search fills its container's width.
- The screen sets the width.
- The field is 42 px tall with 14 px of padding at each end and 18 px icons, and the hint sits 8 px below.
- In a narrow column the field narrows with it, and the hint wraps.

**Key rules**
- `supportText`: The hint is off by default.
- `supportText`: Turn the hint on (supportText) only with a short hint you write (supportTextLabel): on its own it reads “Support Text”.
- `supportTextLabel`: With supportText on, set supportTextLabel: left out, the hint reads “Support Text”.
- `supportText` = `true`: Add a hint when the prompt is not enough: set supportText with a supportTextLabel that says what kinds of search work.
- `supportText` = `false`: Leave the hint off when the prompt says enough.
- `value`: Give the field value and onChangeText: typing and clearing need both.
- `onChangeText`: Input Search only reports the text (onChangeText): the screen filters the list as people type and restores it when they clear the field.
- `trailing`: The clear button shows while value is not empty and trailing is not passed, so passing trailing hides it; it calls onChangeText('').

**Example:** Find a payee, the guide's In context: a Card holding a VStack with Input Search over the payee rows (List Items with the payee's name and mobile number). value="" stands for the screen's query, still empty, so every payee shows; onChangeText stands for the screen storing the query and filtering the rows as people type, and clearing the field gives all of them back.

```tsx
<Card>
  <VStack>
    <InputSearch
      value=""
      onChangeText={() => {}}
      placeholder="Search payees"
      accessibilityLabel="Search payees"
      supportText
      supportTextLabel="Try a name or mobile number"
    />
    <ListItem layout="Horizontal" navArrow={false} title="Asha Rao" supportText="98765 43210" />
    <ListItem layout="Horizontal" navArrow={false} title="Ravi Kumar" supportText="91234 56780" />
    <ListItem layout="Horizontal" navArrow={false} title="Meera Shah" supportText="99887 76655" />
  </VStack>
</Card>
```

**Props:** `supportText`, `supportTextLabel`, `supportTextIcon`, `modes`, `containerStyle`, `placeholder`, `value`, `onChangeText`, `onFocus`, `onBlur`, `leading`, `trailing`, `inputStyle`, `accessibilityLabel`, `accessibilityHint`. (* required)

**Modes it reads:** Color Mode, FormField States, InputState, Status.

**Gaps (report, do not work around)**
- Input Search has no label, error or disabled design.
- The field is 42 px tall; Figma's is 44 px.
- There is no disabled, error or label prop; editable={false} blocks typing with no visual change.

Full entry: `components/inputsearch.md`. Links: `components/inputsearch.links.md`.
