# Hero Section brief

slug: herosection · label: Hero Section · public API: HeroSection (+ IconButton in `filterSlot`; ListGroup, ListItem, MoneyValue, Text in `children`; VStack and the kit's ScreenFrame)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=6507-31453 · storybook: docsUrl('herosection') · stories: Default=components-herosection--default, With Content=components-herosection--with-content, Without Subtitle=components-herosection--without-subtitle, Without Search=components-herosection--without-search, Without Filter=components-herosection--without-filter, Centered Title=components-herosection--centered-title, Controlled=components-herosection--controlled, Custom Search And Filter=components-herosection--custom-search-and-filter
checked: 26 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-c8526ae = Biscuit’s main c8526ae)
icon: a heading line over a search pill and a small circle — `<><path d="M3 4h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /><rect x="2.75" y="8.75" width="9" height="4.5" rx="2.25" stroke="currentColor" strokeWidth="1.5" fill="none" /><circle cx="14.5" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" /></>`
keywords: page header, search header, list header, search and filter

Setup: `LIGHT = { 'Color Mode': 'Light' } as Modes`. TX = five rows `{ title, support, value }`: Blue Tokai Coffee · Today, 9:12 am · 240.00; Fresh Mart · Yesterday · 1,180.50; HP Petrol · 22 Oct · 2,000.00; Coffee Day · 21 Oct · 180.00; Airtel Recharge · 20 Oct · 299.00.
`ROWS(q = '')` = rows whose title contains q (case-insensitive) as `<ListGroup modes={LIGHT}>` of `<ListItem key layout="Horizontal" title supportText={support} trailing={<MoneyValue value currency="₹" modes={LIGHT} />} onPress={noop} modes={LIGHT} />`; when none match, `<Text text={`No transactions match “${q}”`} modes={LIGHT} />` instead.
“HS(overrides = {})” = a small component that keeps its own query: `const [q, setQ] = useState(overrides.searchValue ?? '')` and returns `<HeroSection modes={LIGHT} title="Transactions" subtitle="Last 30 days" searchPlaceholder="Search transactions" filterAccessibilityLabel="Filter transactions" onFilterPress={noop} {...overrides} searchValue={q} onSearchChange={setQ} />`, so every example’s field holds typed text. (Raw `<HeroSection>` only where the brief says so.)
HOST = `<VStack modes={LIGHT} style={{ width: 360, maxWidth: '100%' }}>…</VStack>`: every HS in the playground, an ExampleCard, or a Do & Don’t sits in HOST. Anatomy and Sizing specimens are bare, with `specimenWidth={360}`.
Selectors, for a hero with `testID={id}`: `ROOT = byTestId(id)`; title block `${ROOT} > [role="heading"]`; row `${ROOT} > div:nth-child(2)`; field `${ROOT} > div:nth-child(2) > div:first-child`; filter `${ROOT} > div:nth-child(2) > [role="button"]`; body `${ROOT} > div:nth-child(3)`.

## Overview
summary: Use a Hero Section at the top of a list page: the page’s name, a search field and a filter button, and the list under them.
principle: Name the page, then help people find what’s on it.
playground: `.preview-stage` › HOST › `<HeroSection modes={{ ...LIGHT, Emphasis: emphasis } as Modes} title="Transactions" subtitle="Last 30 days" searchPlaceholder="Search transactions" filterAccessibilityLabel="Filter transactions" showTitle={showTitle} titleTextAlign={align} showSearch={showSearch} showFilter={showFilter} searchValue={query} onSearchChange={setQuery} onFilterPress={noop} />`. Stage label "Live Coin Hero Section". Controls: OnOff "showTitle" (on); Segment "titleTextAlign" `Left | Center` (Left); OnOff "showSearch" (on); OnOff "showFilter" (on); Segment "Emphasis" `High | Medium | Low` (Medium). Readout title "searchValue", value query ? `“${query}”` : 'Empty'; note: "The hero keeps no text of its own: searchValue and onSearchChange hold what people type."

## Anatomy
header: Anatomy · title: A title, a search row, a body · description: The title sits on top, the search field and the filter button share the row under it, and children fill the body below. The section is white and spans its host.
specimen: `<Anatomy specimenWidth={360} …>` › HS({ testID: 'hs-anatomy', searchPlaceholder: 'Search', children: ROWS() }) (the short package placeholder, so the field isn’t cut off when the stage is narrow). marks: `{ kind: 'gap', from: title block, to: row }`.
parts:
1. Title — title and subtitle in a Title; the title stays on one line. — target: title block — side: top
2. Search field — An Input Search that grows to fill the row. — target: field — side: left
3. Filter — An Icon Button, ic_filter, Secondary at Emphasis Medium. — target: filter — side: right
4. Body — children, full width under the row. — target: body — side: bottom
5. Section — White, 12 px at the sides, 16 px above and below. — target: ROOT — side: left, at: 0.9

## Configuration
header: Configuration · title: The parts, the alignment, the filter · description: showTitle, showSearch, and showFilter turn the parts on and off, and titleTextAlign centres the title. showSearch removes the whole row, the filter too. The hero gives its filter AppearanceBrand Secondary at Emphasis Medium; Emphasis on the hero makes it solid or bare. filterIcon and filterAccessibilityLabel change what the button is, and filterSlot replaces it with your own Icon Button, which gets the hero’s modes but not Secondary and Medium, so set them on it.
Body: `<div className="coin-new-stack">` with four grids, each HS in HOST.
Grid 1 (`coin-new-example-grid`, two columns):
- Left — HS() — lesson: The default: the title lines up with the field.
- Center — HS({ titleTextAlign: 'Center' }) — lesson: titleTextAlign Center centres the title and subtitle.
Grid 2 (`coin-new-example-grid`, two columns; 360 px heroes don’t fit three across):
- Search only — HS({ showFilter: false }) — lesson: showFilter={false}: the field takes the row.
- Title only — HS({ showSearch: false }) — lesson: showSearch={false} removes the filter too.
Grid 3 (`coin-new-example-grid`, two columns; Medium is the default shown everywhere else):
- Emphasis High — HS({ modes: { ...LIGHT, Emphasis: 'High' } }) — lesson: Solid purple.
- Emphasis Low — HS({ modes: { ...LIGHT, Emphasis: 'Low' } }) — lesson: The icon alone.
Grid 4 (`coin-new-example-grid`, two columns):
- filterIcon — HS({ title: 'Watchlist', subtitle: 'Stocks you follow', searchPlaceholder: 'Search stocks', filterIcon: 'ic_sort', filterAccessibilityLabel: 'Sort stocks' }) — lesson: Change the icon and its label together.
- filterSlot — HS({ title: 'Watchlist', subtitle: 'Stocks you follow', searchPlaceholder: 'Search stocks', filterSlot: <IconButton iconName="ic_sort" accessibilityLabel="Sort stocks" onPress={noop} modes={{ ...LIGHT, AppearanceBrand: 'Secondary', Emphasis: 'Medium' } as Modes} /> }) — lesson: Your own button, with Secondary and Medium set on it.

## States
header: States · title: Empty, or searching · description: The section itself has no states. Its search field shows the placeholder when empty, and the query and a clear button when it has text; its focus look comes from Input Search. The hero keeps no text: wire searchValue and onSearchChange, or typing does nothing.
Grid `coin-new-example-grid` (two columns), each HS in HOST:
- Empty — HS() — lesson: The placeholder says what the field finds.
- With a query — HS({ searchValue: 'Coffee' }) — lesson: Text shows the clear button.

## Sizing
header: Sizing · title: Full width, as tall as its parts · description: The hero fills its host’s width. Top to bottom: 16 px of padding, the 50 px title block, 16 px, the 42 px search row, 16 px, then the body and 16 px more. In a 360 px host it is 360 × 140 without a body; the field takes the width left after the 40 px filter and its 16 px gap. Figma insets the row another 8 px and draws a 44 px field, a 42 px filter, and a 44 px title block.
Body: `<Anatomy legend={false} specimenWidth={360} marks={[{ kind: 'size', target: ROOT, side: 'bottom', label: 'both' }, { kind: 'gap', from: title block, to: row }, { kind: 'padding', target: ROOT }]}>` › HS({ testID: 'hs-sizing' }). Expected 360 × 140, gap 16, padding 16 / 12; report the measured values.

## Content
header: Content · title: The page name and its scope · description: Write title as the page’s name, such as Transactions, and subtitle as its scope in a few words, such as Last 30 days. An empty subtitle hides it, but leaving subtitle out shows the word Subtitle. Make searchPlaceholder say what the field finds and filterAccessibilityLabel say what the button filters; screen readers read both. A long title ends with an ellipsis.
Grid `coin-new-example-grid` (two columns), each HS in HOST:
- Name and scope — HS() — lesson: Transactions, then Last 30 days.
- No subtitle — HS({ subtitle: '' }) — lesson: An empty subtitle hides it.
- A long title — HS({ title: 'All your transactions across every account' }) — lesson: It ends with an ellipsis.

## In context
header: In context · title: A searchable list · description: The hero heads the Transactions page. Typing narrows the list in its body, and the filter button opens the filters. The hero only passes the text on; the page does the filtering.
Composition: `.coin-new-context` › `<ScreenFrame size="full">` › `<HeroSection modes={LIGHT} testID="hs-context" title="Transactions" subtitle="Last 30 days" searchPlaceholder="Search transactions" filterAccessibilityLabel="Filter transactions" searchValue={query} onSearchChange={setQuery} onFilterPress={() => setFilters(true)}>{ROWS(query)}</HeroSection>`. Below the frame, `<p className="coin-new-readout" role="status">`: `${matching} of 5 transactions` plus ` · Filters opened` once the filter was pressed.

## Do & Don'ts
header: Do & Don’ts · title: A finished header · description: Each pair shows a header that’s ready to ship next to one with a default or a mode left in.
(Instruction, not copy: both sides of every pair sit in HOST.)
- Do The page’s name: Transactions, Last 30 days. — HS() | Don't The defaults left in: Without title and subtitle it shows Page Title and Subtitle. — raw `<HeroSection modes={LIGHT} />`
- Do The filter at its size: The button matches the field. — HS() | Don't A smaller filter: Button / Size S shrinks only the filter, not the field beside it. — HS({ modes: { ...LIGHT, 'Button / Size': 'S' } })

## Sources
header: Sources · title: Use the public Hero Section contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (23 October build of Biscuit’s main) from the team’s private package repository. Figma’s Hero Section has <code>Title</code> and <code>Search</code> switches and a <code>children</code> slot; the package adds <code>showFilter</code>, <code>titleTextAlign</code>, the search and filter props, and <code>titleSlot</code>, <code>searchSlot</code>, and <code>filterSlot</code>. Figma insets the search row 8 px and draws a 44 px field and a 42 px filter; the package’s row is flush, with a 42 px field and a 40 px filter. Leaving <code>subtitle</code> out shows “Subtitle”, as Storybook’s Without Subtitle story does; a <code>filterSlot</code> doesn’t get the filter’s Secondary Medium and disappears with <code>showSearch={false}</code> (all reported).

## Limits
Don't show or mention Color Mode or dark mode. Don't imply the hero filters or searches a list for you, keeps typed text on its own, hides the subtitle when it’s left out, or that the title wraps.
