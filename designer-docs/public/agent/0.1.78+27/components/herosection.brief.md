# HeroSection (brief)

> Coin agent pack 0.1.78+27 · flagged · full entry: `components/herosection.md` (sources, all facts, flags)

Use a Hero Section at the top of a list page: the page’s name, a search field and a filter button, and the list under them.

**Use when**
- At the top of a list page: the page’s name, a search field and a filter button, and the list under them.
- Name the page, then help people find what’s on it.

**Avoid when**
- Avoid: A marketing offer: the handwritten Storybook docs, as the evidence records them, point to Page Hero. Use instead: PageHero.
- Avoid: Search with no page title: the handwritten Storybook docs, as the evidence records them, use Input Search alone. Use instead: InputSearch.

**Placement**
- Put the hero at the top of its page, as it heads the guide's Transactions page, with the page's list in its body (children).
- The title sits on top, the search field and the filter button share the row under it, and children fill the body below.
- The hero fills its host’s width: the section is white and spans its host.
- Top to bottom: 16 px of padding, the 50 px title block, 16 px, the 42 px search row, 16 px, then the body and 16 px more.

**Key rules**
- showTitle, showSearch and showFilter turn the parts on and off, and titleTextAlign centres the title.
- `titleTextAlign` = `Center`: titleTextAlign Center centres the title and subtitle; Left is the default.
- `showFilter` = `false`: showFilter={false} removes the filter button: the field takes the row.
- `showSearch` = `false`: showSearch={false} removes the search field only: in the installed package it does not hide the filter, so set showFilter={false} too to remove the whole row.
- `Emphasis`: The hero gives its filter AppearanceBrand Secondary at Emphasis Medium. Emphasis on the hero makes the filter solid (High, solid purple) or bare (Low, the icon alone).
- `filterIcon`: filterIcon and filterAccessibilityLabel change what the button is: change the icon and its label together, such as ic_sort with “Sort stocks”.
- `filterSlot`: filterSlot replaces the filter with your own control, and filterIcon, onFilterPress and showFilter are then ignored. In the installed package the slot gets the filter's Secondary, Medium and Button / Size M under its own modes, so an Icon Button in it needs no modes.
- `searchValue`: The hero keeps no text: wire searchValue and onSearchChange, or typing does nothing.

**Example:** A searchable list, the guide's In context: the hero heads the Transactions page with its name and scope, a search field that says what it finds and a filter button named for what it filters, and the page's list in its body (a ListGroup of the guide's five transactions, each amount a MoneyValue in the row's trailing). The empty searchValue and the empty handlers stand for the page's own state: the page filters the list as people type and opens its filters on onFilterPress.

```tsx
<Screen>
  <HeroSection
    title="Transactions"
    subtitle="Last 30 days"
    searchPlaceholder="Search transactions"
    filterAccessibilityLabel="Filter transactions"
    searchValue=""
    onSearchChange={(text) => {}}
    onFilterPress={() => {}}
  >
    <ListGroup>
      <ListItem layout="Horizontal" title="Blue Tokai Coffee" supportText="Today, 9:12 am" trailing={<MoneyValue value="240.00" currency="₹" />} onPress={() => {}} />
      <ListItem layout="Horizontal" title="Fresh Mart" supportText="Yesterday" trailing={<MoneyValue value="1,180.50" currency="₹" />} onPress={() => {}} />
      <ListItem layout="Horizontal" title="HP Petrol" supportText="22 Oct" trailing={<MoneyValue value="2,000.00" currency="₹" />} onPress={() => {}} />
      <ListItem layout="Horizontal" title="Coffee Day" supportText="21 Oct" trailing={<MoneyValue value="180.00" currency="₹" />} onPress={() => {}} />
      <ListItem layout="Horizontal" title="Airtel Recharge" supportText="20 Oct" trailing={<MoneyValue value="299.00" currency="₹" />} onPress={() => {}} />
    </ListGroup>
  </HeroSection>
</Screen>
```

**Props:** `title`, `subtitle`, `titleTextAlign` (Left | Center), `showTitle`, `titleSlot`, `showSearch`, `searchValue`, `onSearchChange`, `searchPlaceholder`, `searchSlot`, `showFilter`, `filterIcon`, `onFilterPress`, `filterAccessibilityLabel`, `filterSlot`, `children`, `modes`, `style`, `testID`. (* required)

**Modes it reads:** AppearanceBrand, Button / Size, Button / State, Color Mode, context 9, Context2, context7, Emphasis, FormField States, InputState, Page type, Status.

**Gaps (report, do not work around)**
- Figma draws a 44 px field, a 42 px filter and a 44 px title block; the package's field is 42 px, its filter 40 px and its title block 50 px (Component Bug #404).

Full entry: `components/herosection.md`. Links: `components/herosection.links.md`.
