# Radio (brief)

> Coin agent pack 0.1.78+25 · flagged · full entry: `components/radio.md` (sources, all facts, flags)

Use a Radio to pick exactly one option from a short list, such as the account to pay from or how often to invest.

**Use when**
- Pick exactly one option from a short list, such as the account to pay from or how often to invest.
- One choice from a visible set.

**Avoid when**
- Avoid: A yes-or-no choice: use a Checkbox, which can be ticked and cleared; once chosen, a single Radio can't be cleared. Use instead: Checkbox.

**Placement**
- Put a label beside every Radio, and let the whole row select it.
- Use list rows when options need detail, and a plain label for short options.
- In list rows, for options with detail such as accounts, the whole row selects its Radio.
- Beside a short label, for short options, only the circle responds to a press: 18 px in a browser, 44 px on phones.

**Key rules**
- **REQUIRED** `selected`: Never let two Radios in a set be selected at once: Radio has no group, so the screen must stop a second selection.
- Radio has no label of its own.
- `selected`: The screen sets which Radio is selected and which are disabled.
- `selected`: The screen keeps the chosen option and passes selected to each Radio; on the guide's account screen, Continue is enabled once one is chosen.
- `onPress`: In list rows, pressing a row or its Radio selects it.
- `disabled`: Set disabled for an option that is unavailable now: the Radio turns grey and can't be pressed.
- Figma's eight variants come down to two props, selected and disabled; the package draws hover and focus itself.
- RadioButton is a deprecated name for the same component: build with Radio.

**Example:** Choosing the account to pay from, the guide's In context: a Card holding three ListItem rows, each with a Radio as its trailing part, and a Continue Button. The titles and balances stand for the person's accounts; selected on Salary •• 1180 stands for the account the screen keeps as chosen; each row's onPress and its Radio's onPress stand for the screen choosing that account; Continue stays disabled until one is chosen, so here it is enabled. Each Radio is named by accessibilityLabel with its account, as the Sources note asks.

```tsx
<Card>
  <VStack>
    <ListItem
      layout="Horizontal"
      navArrow={false}
      title="Savings •• 0245"
      supportText="₹1,24,500"
      onPress={() => {}}
      trailing={<Radio selected={false} accessibilityLabel="Savings •• 0245" onPress={() => {}} />}
    />
    <ListItem
      layout="Horizontal"
      navArrow={false}
      title="Salary •• 1180"
      supportText="₹48,200"
      onPress={() => {}}
      trailing={<Radio selected accessibilityLabel="Salary •• 1180" onPress={() => {}} />}
    />
    <ListItem
      layout="Horizontal"
      navArrow={false}
      title="Joint •• 7731"
      supportText="₹9,870"
      onPress={() => {}}
      trailing={<Radio selected={false} accessibilityLabel="Joint •• 7731" onPress={() => {}} />}
    />
    <Button label="Continue" onPress={() => {}} />
  </VStack>
</Card>
```

**Props:** `selected`, `disabled`, `onPress`, `modes`, `style`, `accessibilityLabel`, `accessibilityHint`, `testID`. (* required)

**Modes it reads:** Color Mode.

Full entry: `components/radio.md`. Links: `components/radio.links.md`.
