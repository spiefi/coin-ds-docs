# HeroSection

> Coin agent pack 0.1.78+27 (pilot). Generated from `components/herosection.json`; the JSON is the source of truth.

- **State:** flagged (1 flag, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `3f56271` · built 2026-10-31T05:18:28Z
- **Category:** layout (for discovery only, not a limit on composition) · **Tags:** page header, search header, list header, search and filter
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=herosection) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=6507-31453) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-herosection--docs)

Use a Hero Section at the top of a list page: the page’s name, a search field and a filter button, and the list under them.

## Use when

- **recommended** At the top of a list page: the page’s name, a search field and a filter button, and the list under them.  
  _From summary: “Use a Hero Section at the top of a list page: the page’s name, a search field and a filter button, and the list under them.”_
- **recommended** Name the page, then help people find what’s on it.  
  _From corePrinciple: “Name the page, then help people find what’s on it.”_

## Avoid when

- **discouraged** A marketing offer: the handwritten Storybook docs, as the evidence records them, point to Page Hero. Use instead: `PageHero`.  
  _From evidence: “not a marketing offer (PageHero)”_
- **discouraged** Search with no page title: the handwritten Storybook docs, as the evidence records them, use Input Search alone. Use instead: `InputSearch`.  
  _From evidence: “search with no title (InputSearch alone)”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Title | title and subtitle in a Title, on top; the title stays on one line. | no | anatomy: “title and subtitle in a Title; the title stays on one line.” |
| Search field | An Input Search that grows to fill the row under the title. | no | anatomy: “An Input Search that grows to fill the row.” |
| Filter | An Icon Button at the end of the row: ic_filter, Secondary at Emphasis Medium. | no | anatomy: “An Icon Button, ic_filter, Secondary at Emphasis Medium.” |
| Body | children, full width under the row. | no | anatomy: “children, full width under the row.” |
| Section | White, 12 px at the sides, 16 px above and below. | yes | anatomy: “White, 12 px at the sides, 16 px above and below.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `titleSlot` | `ReactNode` | types |
| `searchSlot` | `ReactNode` | types |
| `filterSlot` | `ReactNode` | types |
| `children` | `ReactNode` | types |

## Placement

- **recommended** Put the hero at the top of its page, as it heads the guide's Transactions page, with the page's list in its body (children).  
  _From inContext: “The hero heads the Transactions page.”_
- **recommended** The title sits on top, the search field and the filter button share the row under it, and children fill the body below.  
  _From anatomy: “The title sits on top, the search field and the filter button share the row under it, and children fill the body below.”_
- **recommended** The hero fills its host’s width: the section is white and spans its host.  
  _From sizing: “The hero fills its host’s width.”_
- **recommended** Top to bottom: 16 px of padding, the 50 px title block, 16 px, the 42 px search row, 16 px, then the body and 16 px more.  
  _From sizing: “Top to bottom: 16 px of padding, the 50 px title block, 16 px, the 42 px search row, 16 px, then the body and 16 px more.”_
- **recommended** In a 360 px host the hero is 360 × 140 without a body.  
  _From sizing: “In a 360 px host it is 360 × 140 without a body”_

## Configuration

- **recommended** showTitle, showSearch and showFilter turn the parts on and off, and titleTextAlign centres the title.  
  _From configuration: “showTitle, showSearch, and showFilter turn the parts on and off, and titleTextAlign centres the title.”_
- **recommended** `titleTextAlign` = `Center`: titleTextAlign Center centres the title and subtitle; Left is the default.  
  _From configuration: “titleTextAlign Center centres the title and subtitle.”_
- **recommended** `showFilter` = `false`: showFilter={false} removes the filter button: the field takes the row.  
  _From configuration: “showFilter={false}: the field takes the row.”_
- **recommended** `showSearch` = `false`: showSearch={false} removes the search field only: in the installed package it does not hide the filter, so set showFilter={false} too to remove the whole row.  
  _From fact `/facts/props/5` (showSearch, source types)_
- **recommended** `Emphasis`: The hero gives its filter AppearanceBrand Secondary at Emphasis Medium. Emphasis on the hero makes the filter solid (High, solid purple) or bare (Low, the icon alone).  
  _From configuration: “The hero gives its filter AppearanceBrand Secondary at Emphasis Medium; Emphasis on the hero makes it solid or bare.”_
- **recommended** `filterIcon`: filterIcon and filterAccessibilityLabel change what the button is: change the icon and its label together, such as ic_sort with “Sort stocks”.  
  _From configuration: “Change the icon and its label together.”_
- **recommended** `filterSlot`: filterSlot replaces the filter with your own control, and filterIcon, onFilterPress and showFilter are then ignored. In the installed package the slot gets the filter's Secondary, Medium and Button / Size M under its own modes, so an Icon Button in it needs no modes.  
  _From fact `/facts/props/14` (filterSlot, source types)_
- **recommended** `searchValue`: The hero keeps no text: wire searchValue and onSearchChange, or typing does nothing.  
  _From states: “The hero keeps no text: wire searchValue and onSearchChange, or typing does nothing.”_
- **recommended** `onSearchChange`: The hero only passes the text on (onSearchChange); the page does the filtering of the list in its body.  
  _From inContext: “The hero only passes the text on; the page does the filtering.”_
- **recommended** `onFilterPress`: Give onFilterPress the page's action: the filter button opens the filters.  
  _From inContext: “Typing narrows the list in its body, and the filter button opens the filters.”_
- **recommended** `title`: Left out, title reads “Page Title”, its default: give every hero the page's name.  
  _From fact `/facts/props/0` (title, source types)_
- **recommended** `subtitle`: subtitle is optional: in the installed package, leaving it out hides it.  
  _From fact `/facts/props/1` (subtitle, source types)_
- **recommended** `searchPlaceholder`: Left out, searchPlaceholder reads “Search”, its default: make it say what the field finds.  
  _From fact `/facts/props/8` (searchPlaceholder, source types)_

## Content

- **recommended** Write title as the page’s name, such as Transactions, and subtitle as its scope in a few words, such as Last 30 days.  
  _From content: “Write title as the page’s name, such as Transactions, and subtitle as its scope in a few words, such as Last 30 days.”_
- **recommended** `subtitle`: An empty subtitle hides it.  
  _From content: “An empty subtitle hides it.”_
- **recommended** `searchPlaceholder`: Make searchPlaceholder say what the field finds, such as “Search transactions”.  
  _From states: “The placeholder says what the field finds.”_
- **recommended** `title`: A long title ends with an ellipsis: the title stays on one line.  
  _From content: “A long title ends with an ellipsis.”_

Good: “Transactions”, “Last 30 days”, “Search transactions”

Bad: “Page Title”

## States

| State | When | From |
| --- | --- | --- |
| Empty | The search field shows the placeholder when empty. | states: “Its search field shows the placeholder when empty” |
| With a query | With text, the field shows the query and a clear button. | states: “and the query and a clear button when it has text” |
| Focused | The field's focus look comes from Input Search. The section itself has no states. | states: “its focus look comes from Input Search” |

## Accessibility

- **recommended** `filterAccessibilityLabel`: Make searchPlaceholder say what the field finds and filterAccessibilityLabel say what the button filters: screen readers read both.  
  _From content: “Make searchPlaceholder say what the field finds and filterAccessibilityLabel say what the button filters; screen readers read both.”_
- **recommended** `filterAccessibilityLabel`: Left out, filterAccessibilityLabel is “Filter”, its default: say what the button filters, such as “Filter transactions”.  
  _From fact `/facts/props/13` (filterAccessibilityLabel, source types)_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| The page’s name | The defaults left in | Without title and subtitle it shows Page Title |

## Examples

### A searchable list, the guide's In context: the hero heads the Transactions page with its name and scope, a search field that says what it finds and a filter button named for what it filters, and the page's list in its body (a ListGroup of the guide's five transactions, each amount a MoneyValue in the row's trailing). The empty searchValue and the empty handlers stand for the page's own state: the page filters the list as people type and opens its filters on onFilterPress.

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

_From inContext: “The hero heads the Transactions page.”_

### Another filter, the guide's filterIcon card: a Watchlist page whose button sorts, so the icon (ic_sort) and its label (“Sort stocks”) change together. The empty searchValue and handlers stand for the page's own state.

```tsx
<HeroSection
  title="Watchlist"
  subtitle="Stocks you follow"
  searchPlaceholder="Search stocks"
  filterIcon="ic_sort"
  filterAccessibilityLabel="Sort stocks"
  searchValue=""
  onSearchChange={(text) => {}}
  onFilterPress={() => {}}
/>
```

_From configuration: “Change the icon and its label together.”_

### Search only, the guide's Search only card: showFilter={false} removes the filter button and the field takes the row. The empty searchValue and handler stand for the page's own state.

```tsx
<HeroSection
  title="Transactions"
  subtitle="Last 30 days"
  searchPlaceholder="Search transactions"
  showFilter={false}
  searchValue=""
  onSearchChange={(text) => {}}
/>
```

_From configuration: “showFilter={false}: the field takes the row.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `title` | `string` |  | `"Page Title"` |  | types | Headline text rendered by the internal {@link Title}. Default "Page Title", from the component source. |
| `subtitle` | `string` |  |  |  | types | Optional subtitle shown below the title. Omit to hide it. |
| `titleTextAlign` | `'Left' \| 'Center'` | Left, Center | `"Left"` |  | types | Horizontal alignment of the title/subtitle block. Default "Left", from the component source. |
| `showTitle` | `boolean` |  | `true` |  | types | Whether to render the title block. Ignored when `titleSlot` is provided. Default true, from the component source. |
| `titleSlot` | `React.ReactNode` |  |  |  | types | Fully replace the default title block. When provided, `title`, `subtitle`, `titleTextAlign`, and `showTitle` are ignored. `modes` cascade into the slot. |
| `showSearch` | `boolean` |  | `true` |  | types | Whether to render the search field. Ignored when `searchSlot` is provided. Does not hide the filter. Default true, from the component source. |
| `searchValue` | `string` |  |  |  | types | Controlled value for the search input. |
| `onSearchChange` | `(text: string) => void` |  |  |  | types | Change handler for the search input. |
| `searchPlaceholder` | `string` |  | `"Search"` |  | types | Placeholder for the search input. Default "Search", from the component source. |
| `searchSlot` | `React.ReactNode` |  |  |  | types | Fully replace the search input (the flexible left part of the row). When provided, `searchValue`, `onSearchChange`, and `searchPlaceholder` are ignored. `modes` cascade into the slot. |
| `showFilter` | `boolean` |  | `true` |  | types | Whether to render the trailing filter icon button. Default true, from the component source. |
| `filterIcon` | `string` |  | `"ic_filter"` |  | types | Icon name for the filter button (from the icon registry). Default "ic_filter", from the component source. |
| `onFilterPress` | `() => void` |  |  |  | types | Press handler for the filter button. |
| `filterAccessibilityLabel` | `string` |  | `"Filter"` |  | types | Accessibility label for the filter button. Default "Filter", from the component source. |
| `filterSlot` | `React.ReactNode` |  |  |  | types | Fully replace the trailing filter control. When provided, `filterIcon`, `onFilterPress`, and `showFilter` are ignored. FILTER_BUTTON_MODES (Secondary, Medium, Size M) are merged under the slot's own `modes`. |
| `children` | `React.ReactNode` |  |  |  | evidence (2026-10-26) | A full-width body under the row; the hero's modes cascade into it. Declared: Content rendered in the body area below the search row. |
| `modes` | `Modes` |  |  |  | types | Mode configuration for design-token theming. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Style overrides applied to the outer container. |
| `testID` | `string` |  |  |  | types |  |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Primary"` |  | types | A token collection HeroSection reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / Size` | `mode collection` | M, S, XS | `"M"` |  | types | A token collection HeroSection reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / State` | `mode collection` | Idle, Hover, Pressed, Disabled | `"Idle"` |  | types | A token collection HeroSection reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection HeroSection reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 9` | `mode collection` | Default, Stack | `"Default"` |  | types | A token collection HeroSection reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context2` | `mode collection` | Default, AppBar | `"Default"` |  | types | A token collection HeroSection reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context7` | `mode collection` | Default, Card, Page Hero | `"Default"` |  | evidence (2026-10-26) | The hero gives its Title context7 Page Hero, and a context7 in the hero's modes overrides it: Default adds the Title's own 12 / 8 padding and Card shrinks the title to 14 px. Declared: A token collection HeroSection reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Emphasis` | `mode collection` | High, Medium, Low | `"High"` |  | types | A token collection HeroSection reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `FormField States` | `mode collection` | Idle, Active, Read Only, Error, Disabled | `"Idle"` |  | types | A token collection HeroSection reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `InputState` | `mode collection` | Idle, Active | `"Idle"` |  | types | A token collection HeroSection reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection HeroSection reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Status` | `mode collection` | Auto, Warning, Error, Success, Loading, Neutral | `"Auto"` |  | types | A token collection HeroSection reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `titleSlot` | `React.ReactNode` |  |  |  | types | Fully replace the default title block. When provided, `title`, `subtitle`, `titleTextAlign`, and `showTitle` are ignored. `modes` cascade into the slot. |
| `searchSlot` | `React.ReactNode` |  |  |  | types | Fully replace the search input (the flexible left part of the row). When provided, `searchValue`, `onSearchChange`, and `searchPlaceholder` are ignored. `modes` cascade into the slot. |
| `filterSlot` | `React.ReactNode` |  |  |  | types | Fully replace the trailing filter control. When provided, `filterIcon`, `onFilterPress`, and `showFilter` are ignored. FILTER_BUTTON_MODES (Secondary, Medium, Size M) are merged under the slot's own `modes`. |
| `children` | `React.ReactNode` |  |  |  | types | Content rendered in the body area below the search row. |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onSearchChange` | `(text: string) => void` |  |  |  | types | Change handler for the search input. |
| `onFilterPress` | `() => void` |  |  |  | types | Press handler for the filter button. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- Figma draws a 44 px field, a 42 px filter and a 44 px title block; the package's field is 42 px, its filter 40 px and its title block 50 px (Component Bug #404). _(evidence, 2026-10-26)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `(whole entry)` · human: The Hero Section guide (3f56271; built for #160 at 93f5870) and its evidence were checked on 26 October 2026 on the v0.1.78-c8526ae build; the installed v0.1.78-dbe0e02 has a different HeroSection.tsx (f594fba at c8526ae, d3efc90 at ace46ca, b2435fe at dbe0e02 and in node_modules), changed by Biscuit’s ace46ca and dbe0e02 for Component Bug #404; InputSearch, IconButton, TextInput and Title are unchanged. Read against the installed source, #404’s 27 October re-tests on ace46ca and dbe0e02, and the guide copy recorded today on the installed build, these sentences no longer hold, and the entry leaves them out: (1) Configuration’s “showSearch removes the whole row, the filter too.”, the Title only caption “showSearch={false} removes the filter too.” and Sources’ “… and disappears with showSearch={false} (all reported).”: showSearch={false} drops only the field; the filter and a filterSlot stay (HeroSection.tsx 203, 231). (2) Configuration’s “… which gets the hero’s modes but not Secondary and Medium, so set them on it.”, Sources’ “a filterSlot doesn’t get the filter’s Secondary Medium”, and the filterSlot caption “Your own button, with Secondary and Medium set on it.” with the modes its example sets: the slot gets Secondary, Medium and Button / Size M under its own modes (15–21, 173–180, 217–218), so those modes only repeat the defaults (and building.md keeps appearance and emphasis modes off slot children). (3) Content’s “but leaving subtitle out shows the word Subtitle.”, Sources’ “Leaving subtitle out shows “Subtitle”, as Storybook’s Without Subtitle story does”, and the end of the first Don’t caption, “… and Subtitle.”: subtitle has no default and an omitted or empty one is hidden (125, 27–29, 182); the copy recorded today shows no “Subtitle”, and the entry quotes that caption only up to “Page Title”. (4) The second Do & Don’t pair, “The filter at its size” / “The button matches the field.” against “A smaller filter” / “Button / Size S shrinks only the filter, not the field beside it.”: the hero re-applies Button / Size M to the filter (177), so Size S on the hero no longer shrinks it. (5) The Left caption “The default: the title lines up with the field.”, Sizing’s “the field takes the width left after the 40 px filter and its 16 px gap” and “Figma insets the row another 8 px”, and Sources’ “the package’s row is flush”: the row is inset 8 px at each side (41, 248), so the field starts 8 px in from the title (title at x 12, field at x 20 in #404’s dbe0e02 re-test). Still open on dbe0e02, and the entry’s gap: the 42 px field, 40 px filter and 50 px title block against Figma’s 44, 42 and 44 (#404 item 4; Biscuit keeps the shared control sizes, Marcin to decide). The guide is updated when Component Bug #404 publishes (the Component Fix flow updates the guide copy a fix changed), then a new Agent pack ticket re-extracts. Added by Claude Code in the overnight run agentpack-r27, for Marcin to confirm. Component Bug #404.
