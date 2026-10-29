# PdpCcCard

> Coin agent pack 0.1.78+15 (pilot). Generated from `components/pdpcccard.json`; the JSON is the source of truth.

- **State:** flagged (5 flags, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `e7ed622` · built 2026-10-29T07:47:24Z
- **Category:** card (for discovery only, not a limit on composition) · **Tags:** product card, product detail, PDP, product summary, gold coin, PdpCcCard
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=pdpcccard) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=5352-935) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-pdpcccard--docs)

Use a PDP Card at the top of a product page: the product’s picture, name, two or three key facts, and one action.

## Use when

- **recommended** At the top of a product page: the product's picture, name, two or three key facts, and one action.  
  _From summary: “Use a PDP Card at the top of a product page: the product’s picture, name, two or three key facts, and one action.”_

## Avoid when

_None in the guide._

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Picture | imageSource, in an imageWidth × imageHeight box (100 × 60 by default); media replaces it with your own component. | no | anatomy: “imageSource, in an imageWidth × imageHeight box (100 × 60 by default).” |
| Title | title: 26 px heavy, on one line with an ellipsis. | no | anatomy: “title: 26 px heavy, on one line with an ellipsis.” |
| Subtitle | subtitle: one qualifier, 14 px; it wraps. | no | anatomy: “subtitle: one qualifier, 14 px; it wraps.” |
| Metric | One metrics entry: its title, icon and value, and caption; the entries share the row in equal columns. | no | anatomy: “One metrics entry: its title, icon and value, and caption.” |
| Action | A small light purple Button from buttonLabel and buttonIcon. | no | anatomy: “A small light purple Button from buttonLabel and buttonIcon.” |
| Panel | A white panel with square corners, 344 px wide; everything on it is centred, 12 px apart. | yes | anatomy: “A white panel with square corners, 344 px wide.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `media` | `ReactNode` | types |
| `button` | `ReactNode` | types |

## Placement

- **recommended** Open the product page with the card, under the page's heading.  
  _From inContext: “The card opens the product page, under the page’s heading.”_
- **recommended** `onButtonPress`: Let the screen own the action: Add to cart calls the screen's own cart through onButtonPress, and the card only lays out the product.  
  _From inContext: “Add to cart calls the screen’s own cart through onButtonPress; the card only lays out the product.”_
- **recommended** `width`: The card is 344 px wide, as in Figma; set width to another number or a percentage of its host.  
  _From sizing: “The card is 344 px wide, as in Figma; width sets another number or a percentage of its host.”_
- **recommended** `width`: On a narrower card, such as width 280, the facts share less room and a long title is cut sooner.  
  _From sizing: “The facts share less room, and a long title is cut sooner.”_

## Configuration

- **REQUIRED** `metrics`: Pass your own metrics: left out, the card shows two sample metrics.  
  _From fact `/facts/props/9` (metrics, source evidence)_
- **discouraged** `onPress`: Use either the card's button or onPress, not both: a pressable card with its button puts a button inside a button.  
  _From states: “Use one or the other: a pressable card with its button puts a button inside a button.”_
- **recommended** `imageSource`: Show the product: pass imageSource with its picture, which says what it is at a glance.  
  _From doDont: “The picture says what it is at a glance.”_
- **recommended** `metrics`: metrics takes one entry per fact: a title, a value, an optional caption, and an optional icon from the Coin icon set.  
  _From configuration: “metrics takes one entry per fact: a title, a value, an optional caption, and an optional icon from the Coin icon set.”_
- **recommended** `metrics`: The entries share the row in equal columns; a single fact takes the whole row.  
  _From configuration: “Entries share the row in equal columns.”_
- **recommended** `metrics`: With three metrics each fact gets a third of the width, so values stay short.  
  _From configuration: “Each fact gets a third of the width, so values stay short.”_
- **recommended** `metrics`: Leave out a metric's icon for text-only facts.  
  _From configuration: “Leave out icon for text-only facts.”_
- **recommended** The card styles its own button: small, light purple and Emphasis Medium, with a plus icon before the label.  
  _From configuration: “The card makes its Button small, light purple, and Emphasis Medium, with a plus icon before the label”_
- **recommended** `buttonIcon` = `null`: buttonIcon changes the button's icon; null removes it and leaves the label on its own.  
  _From configuration: “buttonIcon changes the icon, and null removes it.”_
- **recommended** `showButton` = `false`: showButton false removes the button: the card ends at the facts, 44 px shorter.  
  _From configuration: “showButton false removes the button.”_
- **recommended** `numberOfLines`: A title longer than one line is cut with an ellipsis; numberOfLines gives it more lines, and the card grows.  
  _From content: “A title longer than one line is cut with an ellipsis; numberOfLines gives it more lines”_
- **recommended** `disableTruncation` = `true`: Let a long title wrap: disableTruncation shows all of it, and the card grows.  
  _From doDont: “disableTruncation shows all of it, and the card grows.”_
- **discouraged** `singleLine` = `true`: Do not set singleLine with a long title.  
  _From doDont: “singleLine with a long title”_
- **recommended** `imageHeight`: The picture box is imageWidth × imageHeight and sets the space above the title; the card's height follows the content.  
  _From sizing: “The picture box is imageWidth × imageHeight, and the height follows the content.”_
- **recommended** `media`: media replaces the picture with your own component.  
  _From configuration: “media replaces the picture with your own component”_
- **recommended** `button`: button replaces the card's Button.  
  _From configuration: “button replaces the Button.”_
- **recommended** `AppearanceBrand`: On the card, AppearanceBrand changes the button and the metric icons.  
  _From configuration: “On the card, AppearanceBrand changes the button and the metric icons”_
- **recommended** `AppearanceBrand` = `Primary`: AppearanceBrand Primary gives a gold button and gold metric icons.  
  _From configuration: “A gold button and gold metric icons.”_
- **recommended** `Emphasis`: On the card, Emphasis changes the button.  
  _From configuration: “Emphasis changes the button.”_
- **recommended** `Emphasis` = `High`: Emphasis High gives a solid purple button.  
  _From configuration: “A solid purple button.”_

## Content

- **REQUIRED** `title`: Set title yourself: left out, the card shows the sample word “Title”.  
  _From fact `/facts/props/4` (title, source types)_
- **REQUIRED** `subtitle`: Set subtitle yourself: left out, the card shows the sample word “Subtitle”.  
  _From fact `/facts/props/5` (subtitle, source types)_
- **REQUIRED** `buttonLabel`: Set buttonLabel whenever the card shows its button: it defaults to “button”.  
  _From fact `/facts/props/10` (buttonLabel, source types)_
- **recommended** One product, its key facts, one action.  
  _From corePrinciple: “One product, its key facts, one action.”_
- **recommended** `metrics`: Give the card two or three key facts and one action.  
  _From summary: “the product’s picture, name, two or three key facts, and one action.”_
- **recommended** `title`: Make the title the product's name, short enough for one line.  
  _From content: “Make the title the product’s name, short enough for one line”_
- **recommended** `subtitle`: Make the subtitle one qualifier, such as the product's purity.  
  _From content: “and the subtitle one qualifier, such as its purity.”_
- **recommended** `title`: Put the details in the subtitle and the facts, not in the title.  
  _From doDont: “The details go in the subtitle and the facts.”_
- **discouraged** `title`: Do not write a sentence as the title: it's cut at one line, and the end is lost.  
  _From doDont: “It’s cut at one line, and the end is lost.”_
- **recommended** `metrics`: Name each fact with a noun, such as Weight or Price.  
  _From content: “Name each fact with a noun, such as Weight or Price”_
- **recommended** `metrics`: Keep each fact's value to a number or a word.  
  _From content: “keep values to a number or a word.”_
- **recommended** `buttonLabel`: Label the button with what it does, such as “Add to cart”.  
  _From content: “Label the button with what it does, such as Add to cart.”_

Good: “5 g gold coin”, “24K · 99.9% pure”, “Weight”, “5 g”, “one coin”, “Price”, “₹31,200”, “incl. GST”, “Purity”, “Delivery”, “Add to cart”

Bad: “Buy a 5 g 24K gold coin with free insured delivery”

## States

| State | When | From |
| --- | --- | --- |
| Default | The card isn't pressable; its button is, through onButtonPress. | states: “The card isn’t pressable: its button is.” |
| Pressable card | onPress set: the whole card is one button, named by its title; use it without the card's own button (showButton false). | states: “onPress makes the whole card one button, named by its title.” |
| Disabled, selected, loading | Not available: the card has no disabled, selected or loading state. | states: “The card has no disabled, selected, or loading state.” |

## Accessibility

- **recommended** `onPress`: With onPress the whole card is one button, named by its title.  
  _From states: “onPress makes the whole card one button, named by its title.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| A name in the title | A sentence in the title | It’s cut at one line, and the end is lost. |
| Show the product | Leave out the picture | An empty box still takes its space above the title. |
| Let a long title wrap | singleLine with a long title | disableTruncation shows all of it, and the card grows. |

## Examples

### A product card: the picture, the name, one qualifier, weight and price side by side, and Add to cart.

```tsx
<PdpCcCard
  imageSource={require('../assets/gold-coin.png')}
  imageWidth={60}
  imageHeight={60}
  title="5 g gold coin"
  subtitle="24K · 99.9% pure"
  metrics={[
    { title: 'Weight', value: '5 g', caption: 'one coin', icon: 'ic_scale' },
    { title: 'Price', value: '₹31,200', caption: 'incl. GST', icon: 'ic_rupee_coin' },
  ]}
  buttonLabel="Add to cart"
  onButtonPress={() => {}}
/>
```

_From configuration: “Weight and price side by side, in equal columns.”_

### Opening a product page under the page's heading; Add to cart calls the screen's own cart through onButtonPress.

```tsx
<VStack>
  <Title title="Gold coins" subtitle="Insured delivery to your door" />
  <PdpCcCard
    imageSource={require('../assets/gold-coin.png')}
    imageWidth={60}
    imageHeight={60}
    title="5 g gold coin"
    subtitle="24K · 99.9% pure"
    metrics={[
      { title: 'Weight', value: '5 g', caption: 'one coin', icon: 'ic_scale' },
      { title: 'Price', value: '₹31,200', caption: 'incl. GST', icon: 'ic_rupee_coin' },
    ]}
    buttonLabel="Add to cart"
    onButtonPress={() => {}}
  />
</VStack>
```

_From inContext: “The card opens the product page, under the page’s heading.”_

### The whole card as one button, named by its title: onPress on the card and no button of its own.

```tsx
<PdpCcCard
  imageSource={require('../assets/gold-coin.png')}
  imageWidth={60}
  imageHeight={60}
  title="5 g gold coin"
  subtitle="24K · 99.9% pure"
  metrics={[
    { title: 'Weight', value: '5 g', caption: 'one coin', icon: 'ic_scale' },
    { title: 'Price', value: '₹31,200', caption: 'incl. GST', icon: 'ic_rupee_coin' },
  ]}
  showButton={false}
  onPress={() => {}}
/>
```

_From states: “The card is one button, named 5 g gold coin.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `imageSource` | `ImageSourcePropType \| string` |  |  |  | evidence (2026-10-21) | The picture is shown with cover fit, its corners from image/radius (8 px; the Radius mode changes them), and hidden from screen readers. Declared: Image source for the default media slot. Accepts a URL string or any RN `ImageSourcePropType`. Ignored when `media` is provided. |
| `imageWidth` | `number` |  | `100` |  | types | Default media image width. Defaults to the Figma spec (`100`). Default 100, from the component source. |
| `imageHeight` | `number` |  | `60` |  | types | Default media image height. Defaults to the Figma spec (`60`). Default 60, from the component source. |
| `media` | `React.ReactNode` |  |  |  | types | Full override for the media slot (top of the card). Takes precedence over `imageSource`. `modes` cascade into it automatically. |
| `title` | `string \| null` |  |  |  | types | Headline title (26px black). Omit to keep the sample `"Title"`. Pass `''` or `null` to hide the line. |
| `subtitle` | `string \| null` |  |  |  | types | Subtitle rendered below the title (14px medium). Omit to keep the sample `"Subtitle"`. Pass `''` or `null` to hide the line. |
| `numberOfLines` | `number` |  |  |  | types | Number of lines to limit the title to. The `Title` component defaults to `1` when this is unset, so the headline is a single line with an ellipsis by default. Pass a larger value (e.g. `2`) to allow the title to wrap onto that many lines before truncating, or set {@link disableTruncation} to remove the clamp entirely. The subtitle is never line-clamped. |
| `disableTruncation` | `boolean` |  |  |  | types | When `true`, disables truncation for both the title and subtitle: the trailing ellipsis (`…`) is never shown and the `numberOfLines` clamp is ignored. The text wraps onto as many lines as it needs inside the card. |
| `singleLine` | `boolean` |  |  |  | types | When `true`, forces both the title and subtitle onto a single line with no wrapping (implies {@link disableTruncation}). The line is clipped at the card edges rather than running past them. |
| `metrics` | `PdpCcCardMetric[]` |  |  |  | evidence (2026-10-21) | One equal-width column per entry, each announced as “title, value, caption”. An empty list removes the row; there is no maximum. Declared: The metric columns rendered in the stats row. Vertical dividers are inserted automatically between adjacent metrics. Defaults to two sample metrics (with leading icons) matching the Figma default. |
| `buttonLabel` | `string` |  | `"button"` |  | types | CTA button label. Defaults to `"button"`. Default "button", from the component source. |
| `buttonIcon` | `string \| null` |  | `"ic_add_circle"` |  | types | Registry icon name for the button's leading glyph. Defaults to `'ic_add_circle'`. Pass `null` to hide the leading icon. Default "ic_add_circle", from the component source. |
| `onButtonPress` | `() => void` |  |  |  | types | CTA press handler. |
| `button` | `React.ReactNode` |  |  |  | evidence (2026-10-21) | Replaces the default Button; the node gets AppearanceBrand Secondary, Emphasis Medium and Button / Size S, with the card's own modes on top. Declared: Full override for the CTA. Takes precedence over `buttonLabel`. |
| `showButton` | `boolean` |  | `true` |  | evidence (2026-10-21) | false removes the button and 44 px of the card's height. Declared: Toggles the CTA button. Defaults to `true`. Default true, from the component source. |
| `onPress` | `() => void` |  |  |  | evidence (2026-10-21) | The whole card becomes one button, named by accessibilityLabel, else title, and dims to 0.92 opacity while pressed. With the default button still showing, that nests a button in a button. The card has no disabled prop. Declared: Press handler for the whole card. When set, the card becomes pressable. |
| `width` | `number \| ˋ${number}%ˋ` |  | `344` |  | types | Card width. Defaults to the Figma spec (`344`). Pass `'100%'` to fill the parent. Default 344, from the component source. |
| `modes` | `Modes` |  |  |  | evidence (2026-10-21) | No mode changes the card's own white panel, padding or gap; modes reach the picture, title, metrics and button. Declared: Modes object for design-token resolution. Cascaded to all children. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Style overrides for the card container. |
| `accessibilityLabel` | `string` |  |  |  | types | Accessibility label for the card. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Primary"` |  | evidence (2026-10-21) | On the card it changes the button (Primary gold, Neutral grey, Tertiary blue) and the metric icons; left unset, the button and the icons are Secondary purple. Declared: A token collection PdpCcCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `AppearanceSystem` | `mode collection` | positive, warning, negative | `"positive"` |  | evidence (2026-10-21) | No effect on its own; with Semantic Intent System, warning and negative turn the button and icons orange and red. Declared: A token collection PdpCcCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Badge Size` | `mode collection` | Medium, Small | `"Medium"` |  | evidence (2026-10-21) | Listed for PdpCcCard, but changes nothing on the card. Declared: A token collection PdpCcCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / Size` | `mode collection` | M, S, XS | `"M"` |  | evidence (2026-10-21) | Changes the button: M makes it 42 px tall; the card's default is S. Declared: A token collection PdpCcCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / State` | `mode collection` | Idle, Hover, Pressed, Disabled | `"Idle"` |  | types | A token collection PdpCcCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection PdpCcCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context` | `mode collection` | Default, Nudge&Alert, CTACard, ListItem | `"Default"` |  | evidence (2026-10-21) | Changes inner tokens of the button, icons or title; not a designer choice on this card. Declared: A token collection PdpCcCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 10` | `mode collection` | Default, jioPlus | `"Default"` |  | evidence (2026-10-21) | Changes inner tokens of the button, icons or title; not a designer choice on this card. Declared: A token collection PdpCcCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context2` | `mode collection` | Default, AppBar | `"Default"` |  | evidence (2026-10-21) | Listed for PdpCcCard, but changes nothing on the card. Declared: A token collection PdpCcCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context4` | `mode collection` | Default, Chip, Button, Badge, Badge/glass | `"Default"` |  | evidence (2026-10-21) | Changes inner tokens of the button, icons or title; not a designer choice on this card. Declared: A token collection PdpCcCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context7` | `mode collection` | Default, Card, Page Hero | `"Default"` |  | evidence (2026-10-21) | Changes inner tokens of the button, icons or title; not a designer choice on this card. Declared: A token collection PdpCcCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Emphasis` | `mode collection` | High, Medium, Low | `"High"` |  | evidence (2026-10-21) | Changes the button: High is solid purple with a white label, Low is text only, and Medium, light purple, is the card's default. Declared: A token collection PdpCcCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Icon Size` | `mode collection` | Medium, Small | `"Medium"` |  | evidence (2026-10-21) | Changes inner tokens of the button, icons or title; not a designer choice on this card. Declared: A token collection PdpCcCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | evidence (2026-10-21) | Listed for PdpCcCard, but changes nothing on the card. Declared: A token collection PdpCcCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Profile Card Appearance` | `mode collection` | Default, Premium | `"Default"` |  | evidence (2026-10-21) | Listed for PdpCcCard, but changes nothing on the card. Declared: A token collection PdpCcCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Radius` | `mode collection` | S, M, L, None | `"S"` |  | evidence (2026-10-21) | Changes the picture's corners: None 0, M 16, L 32 (8 px by default). Declared: A token collection PdpCcCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Semantic Intent` | `mode collection` | Brand, System | `"Brand"` |  | evidence (2026-10-21) | System turns the button and icons green (orange or red with AppearanceSystem warning or negative); not a product-card choice. Declared: A token collection PdpCcCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `media` | `React.ReactNode` |  |  |  | types | Full override for the media slot (top of the card). Takes precedence over `imageSource`. `modes` cascade into it automatically. |
| `button` | `React.ReactNode` |  |  |  | types | Full override for the CTA. Takes precedence over `buttonLabel`. |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onButtonPress` | `() => void` |  |  |  | types | CTA press handler. |
| `onPress` | `() => void` |  |  |  | types | Press handler for the whole card. When set, the card becomes pressable. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- No divider line shows between metrics on the web, where Figma draws one 46 px tall (#361). _(evidence, 2026-10-21)_ ⚑ flagged (human)
- Without imageSource an empty picture box keeps its space above the title; the package ships no default picture (#361). _(evidence, 2026-10-21)_ ⚑ flagged (human)
- The button's plus icon is 18 px where Figma's is 16 (#361). _(evidence, 2026-10-21)_ ⚑ flagged (human)
- The card is 316 px tall where Figma's is 310, because its text lines are taller (#361). _(evidence, 2026-10-21)_ ⚑ flagged (human)
- On the web, with numberOfLines 2 the title's ellipsis renders partly cut. _(evidence, 2026-10-21)_ ⚑ flagged (human)

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/avoidWhen` · trace-check: The guide gives no avoidWhen guidance; left empty rather than guessed.
- `/anatomy/1` · cross-check: misreads-source: alwaysPresent=false implies the title can be left off, but the guide says "title and subtitle fall back to the words Title and Subtitle". The evidence says "there is no way to hide either", and its Limits say not to imply the title can be hidden.
- `/anatomy/2` · cross-check: misreads-source: alwaysPresent=false implies the subtitle can be absent, but per the guide it falls back to the word "Subtitle" when left out. The evidence says it cannot be hidden, and its Limits forbid implying it can.
- `/doDont/2` · cross-check: misreads-source: The why gives the Do caption ("disableTruncation shows all of it, and the card grows") rather than the reason against the Don't. The guide's reason is "The title runs past both edges of the card." The other doDont items use the Don't caption as the why.
- `/facts/gaps` · human: These gaps and the guide sentences they rest on were checked on 0.1.78-c7d3348. The installed build, dbe0e02, changed PdpCcCard for #361 (divider, icon size, empty picture box, two-line title), and the guide’s copy waits for #361’s own publish (evidence, 28 October). Re-extract after #361 is published. Added by Claude Code in Penny run run_19b90d38, for Marcin to confirm.
