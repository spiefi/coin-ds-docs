# CategoryCard

> Coin agent pack 0.1.78+23 (pilot). Generated from `components/categorycard.json`; the JSON is the source of truth.

- **State:** documented
- **Package:** jfs-components 0.1.78 · guide commit `4a044e7` · built 2026-10-31T01:50:12Z
- **Category:** card (for discovery only, not a limit on composition) · **Tags:** category tile, category rail, card tab, product category, filter tile
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=categorycard) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=7659-4398) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-categorycard--docs)

Use a Category Card for one category in a horizontal rail: a picture, a one- or two-word label, and an optional badge.

## Use when

- **recommended** Show one category in a horizontal rail: a picture, a one- or two-word label, and an optional badge.  
  _From summary: “Use a Category Card for one category in a horizontal rail: a picture, a one- or two-word label, and an optional badge.”_
- **recommended** One picture, one word, one tap.  
  _From corePrinciple: “One picture, one word, one tap.”_
- **recommended** A horizontal rail of categories in which the active card is the current filter: the upstream Storybook docs, as the evidence records them.  
  _From evidence: “use it for a horizontal rail of categories, the active tile is the current filter”_

## Avoid when

- **discouraged** Peers: the upstream Storybook docs, as the evidence records them, use Tabs. Use instead: `Tabs`.  
  _From evidence: “peers use Tabs, combinable filters use ChipSelect.”_
- **discouraged** Filters people can combine: the upstream Storybook docs, as the evidence records them, use Chip Select. Use instead: `ChipSelect`.  
  _From evidence: “peers use Tabs, combinable filters use ChipSelect.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Badge | Optional: badge sets one short word, cut off past 38 px. | no | anatomy: “Optional: badge sets one short word, cut off past 38 px.” |
| Image | imageSource fills a 36 px square; imageSlot takes any node instead. | yes | anatomy: “imageSource fills a 36 px square; imageSlot takes any node instead, as here.” |
| Label | 12 px on one line; by default a longer label spills past both edges. | yes | anatomy: “12 px on one line; by default a longer label spills past both edges.” |
| Card | A white tile, 60 px wide, whose 1 px border turns gold when active. | yes | anatomy: “A white tile, 60 px wide, whose 1 px border turns gold when active.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `imageSlot` | `ReactNode` | types |
| `children` | `ReactNode` | types |

## Placement

- **recommended** Lay the cards out side by side in a category rail, as on the guide's Invest screen.  
  _From inContext: “A category rail on the Invest screen”_
- **recommended** Cards with and without a badge line up in a rail: every card keeps 11 px above it for a badge.  
  _From inContext: “Every card keeps 11 px above it for a badge, so cards with and without one line up in the rail.”_

## Configuration

- **recommended** `badge`: badge adds a short tag on the card's top edge; leave it out for none.  
  _From configuration: “badge adds a short tag on the card’s top edge; leave it out for none.”_
- **recommended** `active`: Figma's State variant (Idle, Active) is the active prop, and Figma's badge on or off is the badge text.  
  _From sources: “Figma’s Category Card has a State variant (Idle, Active) and a badge on or off; in code, active and the badge text are props.”_
- **recommended** `imageSlot`: Give the card a picture, such as a Coin Icon Capsule in imageSlot as the guide's examples do: without an image the card shows a plain light square.  
  _From sources: “Without an image the card shows a plain light square, so these examples put a Coin Icon Capsule in imageSlot.”_
- **recommended** `children`: children is another way to fill the image slot; when both are set, imageSlot wins.  
  _From fact `/facts/props/4` (children, source types)_
- **recommended** `AppearanceBrand`: AppearanceBrand colours the badge, Tertiary (blue) by default, and whatever is in imageSlot gets the same modes, so an Icon Capsule there follows it.  
  _From configuration: “AppearanceBrand colours the badge, Tertiary blue by default, and anything in imageSlot gets the same modes, so the Icon Capsule follows it.”_
- **recommended** `AppearanceBrand` = `Tertiary`: AppearanceBrand Tertiary, the default: a blue badge, as in Figma.  
  _From configuration: “The default: a blue badge, as in Figma.”_
- **recommended** `AppearanceBrand` = `Primary`: AppearanceBrand Primary: gold for the badge and an Icon Capsule in imageSlot.  
  _From configuration: “Gold for the badge and the capsule.”_
- **recommended** `AppearanceBrand` = `Secondary`: AppearanceBrand Secondary: purple for the badge and an Icon Capsule in imageSlot.  
  _From configuration: “Purple for the badge and the capsule.”_
- **recommended** `AppearanceBrand` = `Neutral`: AppearanceBrand Neutral: dark grey, for a quieter rail.  
  _From configuration: “Dark grey, for a quieter rail.”_
- **recommended** `Emphasis`: Emphasis Medium or Low makes the badge pale.  
  _From configuration: “Emphasis Medium or Low makes the badge pale.”_
- **recommended** `Emphasis` = `Low`: Emphasis Low: a pale badge, and an Icon Capsule in imageSlot drops its fill.  
  _From configuration: “A pale badge; the capsule drops its fill.”_
- **recommended** `Radius`: Radius rounds the corners of the default image only, not an Icon Capsule or anything else in imageSlot.  
  _From configuration: “Radius rounds the corners of the default image only.”_
- **recommended** AppearanceBrand, Emphasis and Radius leave the card's surface, border and label as they are.  
  _From configuration: “The card’s surface, border, and label look the same in every mode.”_
- **recommended** `active`: Set active, not the Card Tab State mode: active beats the mode.  
  _From fact `/facts/modes/3` (Card Tab State, source evidence)_
- **recommended** `active`: The card keeps no state of its own: the screen sets active on one card and moves it in onPress.  
  _From states: “The card keeps no state of its own: the screen sets active on one card and moves it in onPress.”_
- **recommended** `onPress`: The screen keeps the selected category and sets active on that card; each card's onPress selects it.  
  _From inContext: “The screen keeps the selected category and sets active on that card; each card’s onPress selects it.”_
- **discouraged** `active`: Mark one card active at a time: two gold borders leave people unsure which category is showing.  
  _From doDont: “Two gold borders leave people unsure which category is showing.”_
- **recommended** `width`: The card is 60 px wide unless you set width, and as tall as its content: 4 px padding, the picture, a 6 px gap, and a 16 px label line.  
  _From sizing: “The card is 60 px wide unless you set width, and as tall as its content: 4 px padding, the picture, a 6 px gap, and a 16 px label line.”_
- **recommended** With the default 36 px image the card is 68 px tall; a 42 px Icon Capsule makes it 74.  
  _From sizing: “With the default 36 px image it’s 68 px tall; the 42 px capsule here makes it 74.”_
- **recommended** `badge`: A badge sits 11 px above the card, and every card keeps that room in its layout, with or without a badge.  
  _From sizing: “A badge sits 11 px above the card, and every card keeps that room in its layout, with or without a badge.”_
- **recommended** `width`: A wider card (width) holds a longer label; give every card in a rail the same width.  
  _From sizing: “A wider card holds the label; give every card in a rail the same width.”_
- **recommended** `singleLine` = `false`: singleLine={false} wraps a long label onto two lines and makes that card taller.  
  _From content: “singleLine={false} wraps it onto two lines and makes that card taller”_
- **recommended** `disableTruncation` = `false`: For one line that ends in an ellipsis, as Figma shows, add disableTruncation={false} to singleLine={false}.  
  _From content: “add disableTruncation={false} as well for one line that ends in an ellipsis, as Figma shows.”_
- **recommended** `disableTruncation` = `false`: disableTruncation={false} alone changes nothing: with singleLine left at true, the label stays on one line and spills.  
  _From fact `/facts/props/8` (disableTruncation, source evidence)_

## Content

- **REQUIRED** `label`: Set label to the category's name: left out, the card shows “Popular”.  
  _From fact `/facts/props/1` (label, source types)_
- **recommended** `label`: Name the category in a word or two.  
  _From content: “Name the category in a word or two, and keep the badge to one short word that doesn’t repeat it.”_
- **recommended** `badge`: Keep the badge to one short word that doesn't repeat the label.  
  _From content: “Name the category in a word or two, and keep the badge to one short word that doesn’t repeat it.”_
- **recommended** `label`: A label wider than the card spills past both edges by default.  
  _From content: “A label wider than the card spills past both edges by default.”_
- **discouraged** `badge`: Don't write a long badge: “Limited offer” is cut to a few letters.  
  _From doDont: ““Limited offer” is cut to a few letters.”_

Good: “Gold”, “Loans”, “Savings”, “Insurance”, “New”, “Hot”

Bad: “Mutual funds”, “Limited offer”

## States

| State | When | From |
| --- | --- | --- |
| Idle | The default: a light grey border. | states: “The default: a light grey border.” |
| Active | With active set, the border turns gold on the category that's showing. | states: “active turns the border gold on the category that’s showing.” |
| Pressed | While pressed, the card dims to 85 %. | states: “A pressed card dims to 85 %” |
| Disabled | With disabled set, the card dims to half opacity and onPress isn't called. | states: “disabled dims it to half and stops onPress.” |

## Accessibility

- **recommended** `accessibilityLabel`: The card is a button named by its label, with the badge after a comma (“Gold, New”); accessibilityLabel replaces that name.  
  _From fact `/facts/props/15` (accessibilityLabel, source evidence)_
- **recommended** `active`: On the web the active card is announced as pressed.  
  _From sources: “on the web the active card is announced as pressed”_
- **recommended** `disabled`: A disabled card is skipped by keyboard focus on the web and doesn't call onPress.  
  _From fact `/facts/props/11` (disabled, source evidence)_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Keep the label short | Write a long label | “Mutual funds” spills past both edges of the card. |
| One short badge word | Write a long badge | “Limited offer” is cut to a few letters. |
| Mark one card active | Mark several cards active | Two gold borders leave people unsure which category is showing. |

## Examples

### A category rail on the Invest screen, the guide's In context: a Title over an HStack of four Category Cards, each with an Icon Capsule in imageSlot as its category art, two of them with a badge. active on Gold stands for the category the screen is showing, and each onPress for the screen selecting that card's category (and moving active to it).

```tsx
<VStack>
  <Title title="Invest" subtitle="Pick a category" />
  <HStack>
    <CategoryCard
      label="Gold"
      badge="New"
      imageSlot={<IconCapsule iconName="ic_rupee_coin" />}
      active
      onPress={() => {}}
    />
    <CategoryCard
      label="Loans"
      imageSlot={<IconCapsule iconName="ic_loans" />}
      active={false}
      onPress={() => {}}
    />
    <CategoryCard
      label="Savings"
      imageSlot={<IconCapsule iconName="ic_savings" />}
      active={false}
      onPress={() => {}}
    />
    <CategoryCard
      label="Insurance"
      badge="Hot"
      imageSlot={<IconCapsule iconName="ic_insurance" />}
      active={false}
      onPress={() => {}}
    />
  </HStack>
</VStack>
```

_From inContext: “The screen keeps the selected category and sets active on that card; each card’s onPress selects it.”_

### A two-word label on one line that ends in an ellipsis, as Figma shows, the guide's Ellipsis card: singleLine={false} with disableTruncation={false}. The Icon Capsule stands for the category's art, and onPress for the screen selecting the category.

```tsx
<CategoryCard
  label="Mutual funds"
  imageSlot={<IconCapsule iconName="ic_graph_increasing" />}
  singleLine={false}
  disableTruncation={false}
  onPress={() => {}}
/>
```

_From content: “add disableTruncation={false} as well for one line that ends in an ellipsis, as Figma shows.”_

### A wider card that holds a longer label, the guide's width={80} card; every card in the same rail would get the same width. The Icon Capsule stands for the category's art, and onPress for the screen selecting the category.

```tsx
<CategoryCard
  label="Mutual funds"
  width={80}
  imageSlot={<IconCapsule iconName="ic_graph_increasing" />}
  onPress={() => {}}
/>
```

_From sizing: “A wider card holds the label; give every card in a rail the same width.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `testID` | `string` |  |  |  | types |  |
| `label` | `string` |  | `"Popular"` |  | types | Bottom label (e.g. `"Popular"`). Default "Popular", from the component source. |
| `imageSource` | `ImageSourcePropType \| string` |  |  |  | types | Image shown in the card centre. Ignored when `imageSlot` / `children` is provided. Accepts a remote URL string, `{ uri }` object, or `require()`-ed asset. |
| `imageSlot` | `React.ReactNode` |  |  |  | types | Slot replacing the default `Image` (Figma Image instance / Code Connect). Receives `modes` recursively so inner components inherit theming. Prefer this or `children` when swapping the media. |
| `children` | `React.ReactNode` |  |  |  | types | Alias for {@link imageSlot} — the Figma image slot. When both are set, `imageSlot` wins so existing `imageSlot` callers stay authoritative. |
| `badge` | `string` |  |  |  | evidence (2026-10-19) | An empty string or undefined hides the badge. Declared: Optional badge label rendered as an overlapping pill at the top edge. Omit or pass `undefined` to hide the badge. |
| `active` | `boolean` |  |  |  | evidence (2026-10-19) | On the web the card also gets aria-pressed from active. Declared: Whether the card is in the selected / active state (gold stroke). When omitted, falls back to `modes['Card Tab State'] === 'Active'` (and the legacy `modes['Category Card State'] === 'Active'` alias). |
| `width` | `number` |  | `60` |  | types | Fixed width of the card in dp. Defaults to `60` per the Figma spec. Default 60, from the component source. |
| `disableTruncation` | `boolean` |  | `true` |  | evidence (2026-10-19) | disableTruncation={false} alone changes nothing: with singleLine left true, the label still stays on one line and spills. Declared: When `true`, disables text truncation: the trailing ellipsis (`…`) is never shown and any `numberOfLines` clamp is ignored. Defaults to `true` (same overflow behaviour as {@link Text}'s `disableTruncation`). Pass `false` to restore single-line ellipsis clamping. Default true, from the component source. |
| `singleLine` | `boolean` |  | `true` |  | types | When `true`, forces the label onto a single line with no wrapping (implies `disableTruncation`). On web the line overflows horizontally instead of wrapping or truncating. Defaults to `true` — same API as {@link Text}'s `singleLine`. Pass `false` to allow wrapping. Default true, from the component source. |
| `onPress` | `() => void` |  |  |  | types | Press handler — the card is always a `Pressable`. |
| `disabled` | `boolean` |  | `false` |  | evidence (2026-10-19) | A disabled card renders at 0.5 opacity, with disabled and aria-disabled, tabindex -1 on the web, and no onPress. Declared: Default false, from the component source. |
| `modes` | `Modes` |  |  |  | types | Design token modes for theming (e.g. `{ 'Color Mode': 'Light' }`). |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Container style override. |
| `labelStyle` | `StyleProp<TextStyle>` |  |  |  | types | Label style override. |
| `accessibilityLabel` | `string` |  |  |  | evidence (2026-10-19) | The card is always a Pressable with role button, named by accessibilityLabel, or else by the label, with the badge after a comma when there is one (“Gold, New”). |
| `accessibilityHint` | `string` |  |  |  | types |  |
| `accessibilityState` | `AccessibilityState` |  |  |  | types |  |
| `webAccessibilityProps` | `WebAccessibilityProps` |  |  |  | types |  |
| `...SafePressableProps` | `SafePressableProps` |  |  |  | types | Inherited React Native props the component also accepts. They are not part of the design contract and no guide documents them. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Tertiary"` |  | evidence (2026-10-19) | CategoryCard sets AppearanceBrand Tertiary over the theme's modes, so Tertiary is its default; modes on the card override it. Declared: A token collection CategoryCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `AppearanceSystem` | `mode collection` | positive, warning, negative | `"positive"` |  | types | A token collection CategoryCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Badge Size` | `mode collection` | Medium, Small | `"Small"` |  | evidence (2026-10-19) | CategoryCard sets Badge Size Small over the theme's modes, so Small is its default; modes on the card override it. Declared: A token collection CategoryCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Card Tab State` | `mode collection` | Default, Active | `"Default"` |  | evidence (2026-10-19) | The active prop beats the Card Tab State mode: with active set, the card sets Card Tab State from it. Declared: A token collection CategoryCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection CategoryCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Emphasis` | `mode collection` | High, Medium, Low | `"High"` |  | types | A token collection CategoryCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Radius` | `mode collection` | S, M, L, None | `"None"` |  | evidence (2026-10-19) | CategoryCard sets Radius None over the theme's modes, so None (square corners on the default image) is its default; modes on the card override it. Declared: A token collection CategoryCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Semantic Intent` | `mode collection` | Brand, System | `"Brand"` |  | types | A token collection CategoryCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `imageSlot` | `React.ReactNode` |  |  |  | types | Slot replacing the default `Image` (Figma Image instance / Code Connect). Receives `modes` recursively so inner components inherit theming. Prefer this or `children` when swapping the media. |
| `children` | `React.ReactNode` |  |  |  | types | Alias for {@link imageSlot} — the Figma image slot. When both are set, `imageSlot` wins so existing `imageSlot` callers stay authoritative. |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onPress` | `() => void` |  |  |  | types | Press handler — the card is always a `Pressable`. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- The label's font token is spelt “Jio Type Var”, so the label shows in a fallback serif font until the token is fixed (token problem #288, open). _(evidence, 2026-10-19)_
- Figma ends a long label in an ellipsis; the package lets it spill unless you change singleLine and disableTruncation. _(evidence, 2026-10-19)_
- The published Storybook still shows the older generated Category Card page. _(evidence, 2026-10-19)_

## Flags

_None._
