# Balance (brief)

> Coin agent pack 0.1.78+16 · documented · full entry: `components/balance.md` (sources, all facts, flags)

Use a Balance to show one money amount, such as what someone owes or holds, in large type under a short title.

**Use when**
- Show one money amount, such as what someone owes or holds, in large type under a short title.

**Avoid when**
- Avoid: An amount people press, or one that needs a selected, disabled or loading look: a Balance isn't pressable and has none of those looks.

**Placement**
- Place a Balance in a screen or card that has padding and a surface: it has neither of its own.
- The host sets the width: a Balance is as wide as its host and as tall as its text, 68 px at the default size.
- In a column host, such as a screen or a VStack, a Balance takes the host's width and a long title wraps. In a row host it is as wide as its text, so a long title runs past the host on one line.
- In the guide’s trip screen, Settle up is the screen’s own Button, not part of the Balance.

**Key rules**
- `currency`: Pass a currency code or symbol in currency.
- `amount`: Pass the amount as text in amount.
- `currency`: A currency code shows as its symbol: USD shows as $. Unknown codes print as typed.
- `amount`: A leading minus in amount shows before the symbol.
- `children`: To use a Money Value option, such as hiding the amount, pass your own MoneyValue inside the Balance (children).
- `Context3` = `Balance & Cards`: A Money Value in the slot always gets Context3 Balance & Cards, so it is always the 36 px size.
- `Context3`: Context3 sets the amount's size; the title stays 14 px.
- `Context3` = `Balance & Cards`: Balance & Cards is the default: a 36 px amount.

**Example:** What you owe after a trip, the guide's In context: the screen adds up the amount and passes it as formatted text, the Balance shows it under the screen's Title, and Settle up is the screen's own Button.

```tsx
<VStack>
  <Title title="Goa trip" subtitle="4 friends · 12 expenses" />
  <VStack>
    <Balance title="Total owed to people" amount="2,450.00" currency="INR" />
    <Button label="Settle up" onPress={() => {}} />
  </VStack>
</VStack>
```

**Props:** `title`, `amount`, `currency`, `modes`, `style`, `children`, `testID`, `accessibilityLabel`. (* required)

**Modes it reads:** Color Mode, Context3, Page type.

**Gaps (report, do not work around)**
- Figma's Balance is one component with a Title property and a nested Money Value, whose amount and currency are overrides. In code amount and currency are props, and children takes your own Money Value.
- The package draws the amount on a 44 px line where Figma's is 36 px, so a Balance is 68 px tall instead of Figma's 60.
- The published Storybook docs page for Balance still doesn't load: the fix is in Biscuit's source but the hosted Storybook isn't redeployed; its stories load (#346).

Full entry: `components/balance.md`. Links: `components/balance.links.md`.
