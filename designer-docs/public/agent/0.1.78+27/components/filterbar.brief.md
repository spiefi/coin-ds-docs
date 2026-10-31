# FilterBar (brief)

> Coin agent pack 0.1.78+27 · flagged · full entry: `components/filterbar.md` (sources, all facts, flags)

Use a Filter Bar at the top of a list so people can narrow what they see by typing.

**Use when**
- At the top of a list, so people can narrow what they see by typing.

**Avoid when**
- Avoid: The field needs a disabled or an error state: Filter Bar has neither.

**Placement**
- Put it at the top of the list it filters.
- Filter Bar takes the full width of its container and keeps a fixed height.
- Place it in a full-width row; the screen owns the width.
- In a narrower host, the field shrinks while the bar keeps its padding.

**Key rules**
- Only the words change: the bar, field and icon come from tokens.
- `placeholder`: Designers choose the placeholder and whether the bar opens with a query already in place (value).
- `placeholder`: Name the list in placeholder, such as “Search transactions”: naming the list tells people what they can find.
- `placeholder`: Left out, placeholder reads “Search”, its default: the generic word says nothing about what can be found.
- `value`: Prefill value with the query when people return to a list that is already filtered.
- `onChangeText`: Name what is being searched, then let the list below respond to every keystroke.
- `onChangeText`: Filter the list in the screen, from the text onChangeText reports: Filter Bar reports the text; it does not filter anything itself.
- `renderInput`: renderInput and children are developer overrides, and the guide does not show them.

**Example:** Filtering a transaction list, the guide's In context: a Screen holds a Filter Bar named for the list above a VStack of the transaction rows (List Items with the guide's titles and dates). value="" stands for the screen's query, still empty, so every row shows; onChangeText stands for the screen storing the query and showing only the matching rows.

```tsx
<Screen>
  <FilterBar placeholder="Search transactions" value="" onChangeText={(query) => {}} />
  <VStack>
    <ListItem layout="Horizontal" title="Digital Gold" supportText="12 Sep · ₹2,000" />
    <ListItem layout="Horizontal" title="Nifty 50 Index Fund" supportText="10 Sep · ₹5,000" />
    <ListItem layout="Horizontal" title="Electricity bill" supportText="8 Sep · ₹1,240" />
    <ListItem layout="Horizontal" title="Gold savings plan" supportText="1 Sep · ₹1,000" />
  </VStack>
</Screen>
```

**Props:** `placeholder`, `value`, `onChangeText`, `children`, `renderInput`, `modes`, `style`, `accessibilityLabel`, `accessibilityHint`. (* required)

**Modes it reads:** Color Mode, InputState.

**Gaps (report, do not work around)**
- The bar renders 62 px tall with a 42 px field; Figma draws a 64 px bar with a 44 px field.
- The focus ring is a hard-coded 1 px #222 box-shadow, not a token.
- No disabled or error state.

Full entry: `components/filterbar.md`. Links: `components/filterbar.links.md`.
