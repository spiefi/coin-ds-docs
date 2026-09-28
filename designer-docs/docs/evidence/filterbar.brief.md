# Filter Bar brief

slug: filterbar · label: Filter Bar · public API: FilterBar
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=541-4823 · storybook: docsUrl('filterbar') · stories: Default=components-filterbar--default, Custom placeholder=components-filterbar--with-custom-placeholder, Prefilled value=components-filterbar--with-value, Custom input=components-filterbar--with-render-input
checked: 28 September 2026 · jfs-components 0.1.60 (registry latest 0.1.60)
icon: a magnifying glass (circle r≈5 at 8,8 plus a short diagonal handle to 15,15) above nothing else; 1.5 stroke, round caps.

All Coin instances use `modes={{ 'Color Mode': 'Light' }}`. Every FilterBar is controlled: `value` from React state, `onChangeText` sets it.

## Overview
summary: Use a Filter Bar at the top of a list so people can narrow what they see by typing.
principle: Name what is being searched, then let the list below respond to every keystroke.
playground: stage = one FilterBar inside `.coin-new-host.wide`. Controls: text control "Placeholder" → `placeholder` (maxLength 40, default "Search transactions"); Segment "Start with" options ['Empty', 'A query'] → sets `value` to '' or 'Gold' (typing still updates it). Readout title "Current query", value = the typed text in quotes, or "Empty" when ''. Stage label: "Live Coin Filter Bar".

## Anatomy
header: Anatomy · title: A padded search field · description: The bar holds one public Text Input set up for search, inset from the screen edges.
specimen: `<FilterBar testID="fb-anatomy" placeholder="Search transactions" value="" onChangeText={() => {}} />`; specimenWidth 360
parts:
1. Bar — Full-width container that insets the field from the screen edges. — target: byTestId('fb-anatomy') — side: left
2. Field — Pill-shaped input surface from the public Text Input. — target: `${byTestId('fb-anatomy')} > div` — side: top
3. Search icon — Tells people the field searches. — target: `${byTestId('fb-anatomy')} svg` — side: bottom
4. Placeholder — Names what is being searched until they type. — target: `${byTestId('fb-anatomy')} input` — side: right
marks: padding byTestId('fb-anatomy')

## Configuration
header: Configuration · title: Only the words change · description: The bar, field, and icon come from tokens. Designers choose the placeholder and whether the bar opens with a query already in place.
- Default placeholder — `placeholder` omitted (renders "Search") — lesson: the generic word says nothing about what can be found.
- Specific placeholder — `placeholder="Search transactions"` — lesson: naming the list tells people what they can find.
- Prefilled query — `placeholder="Search transactions"`, `value="Gold"` — lesson: use it when returning to a list that is already filtered.
Grid: `coin-new-example-grid three`, each FilterBar inside `.coin-new-host.wide`.

## States
header: States · title: Empty, filled, and focused · description: Filter Bar has no disabled or error state. It shows its placeholder when empty, the query when filled, and an outline while focused.
- Empty — `value=""`, `placeholder="Search funds"` — lesson: the placeholder carries the name.
- Filled — `value="Nifty"`, `placeholder="Search funds"` — lesson: the query replaces the placeholder.
- Focused — live `placeholder="Search funds"` — ExampleCard description: "Select the field: the bar draws a 1 px outline around its padded area."
Grid: `coin-new-example-grid three`, hosts `.coin-new-host.wide`.

## Sizing
header: Sizing · title: It always fills its host · description: Filter Bar takes the full width of its container and keeps a fixed height. Place it in a full-width row; the screen owns the width.
- Measured diagram: `<Anatomy legend={false} marks={[{ kind: 'size', target: byTestId('fb-size'), side: 'bottom', label: 'both' }, { kind: 'padding', target: byTestId('fb-size') }]}>` around `<FilterBar testID="fb-size" placeholder="Search transactions" …/>` with specimenWidth 360.
- Two ExampleCards in `coin-new-example-grid`: "360 px screen" — host `.coin-new-host.wide`; "240 px column" — host `.coin-new-host.narrow`, description "The field shrinks with its host while the bar keeps its padding." Both `placeholder="Search transactions"`.

## Content
header: Content · title: Say what can be found · description: Start with “Search” and name the list. Keep it to three words or fewer so it fits a narrow field.
Body: `.coin-new-stack` of three FilterBars in `.coin-new-host.wide` with placeholders "Search transactions", "Search funds", "Search by merchant".

## In context
header: In context · title: Filter a transaction list · description: The screen passes the query to its list and shows only matching rows. Filter Bar reports the text; it does not filter anything itself.
Composition in `.coin-new-context`: FilterBar (`placeholder="Search transactions"`, controlled, empty to start) above a `VStack` of public `ListItem`s (`layout="Horizontal"`, `title`, `supportText`), filtered case-insensitively by title against the query: "Digital Gold" / "12 Sep · ₹2,000", "Nifty 50 Index Fund" / "10 Sep · ₹5,000", "Electricity bill" / "8 Sep · ₹1,240", "Gold savings plan" / "1 Sep · ₹1,000". When nothing matches, show a Coin `Text` "No transactions match “<query>”".

## Do & Don'ts
header: Do & Don’ts · title: Make search predictable · description: Each pair shows what people see when the placeholder or placement changes.
- Do Name the list: “Search transactions” tells people what they will find. — `placeholder="Search transactions"` in `.coin-new-host.wide` | Don't Leave a vague prompt: “Type here” hides what the field searches. — `placeholder="Type here"` in `.coin-new-host.wide`
- Do Keep the placeholder short: The whole placeholder stays readable in a narrow field. — `placeholder="Search by merchant"` in `.coin-new-host.narrow` | Don't Write a long placeholder: A long prompt is cut off, so people lose what it searches. — `placeholder="Search transactions, merchants, and categories"` in `.coin-new-host.narrow`
- Do Keep one search per list: One field, one set of results. — one FilterBar `placeholder="Search funds"` | Don't Stack several search bars: Two bars make people guess which one filters the list. — two FilterBars `placeholder="Search funds"` and `placeholder="Search by category"` in `.coin-new-stack`

## Sources
header: Sources · title: Use the public Filter Bar contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Declared, installed, and registry <code>jfs-components</code> versions are <code>0.1.60</code>. Figma draws the bar at 360 × 64 with a 44 px field; the installed package renders 62 px with a 42 px field. The focus outline is a fixed 1 px dark border that adds 2 px of height. On the web, <code>accessibilityLabel</code> is not applied to the default input, so the placeholder is the field’s only accessible name. <code>renderInput</code> and <code>children</code> are developer overrides and are not shown.

## Limits
Do not show or describe a clear button, disabled or error state, result counts, or built-in filtering. Do not tell designers to rely on `accessibilityLabel`. Do not use `renderInput` or `children`.
