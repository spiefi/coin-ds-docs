# ProductOverview

> Coin agent pack 0.1.78+22 (pilot). Generated from `components/productoverview.json`; the JSON is the source of truth.

- **State:** flagged (1 flag, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `6d52ca8` · built 2026-10-31T01:10:13Z
- **Category:** content (for discovery only, not a limit on composition) · **Tags:** product summary, product header, PDP, product detail, gold coin
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=productoverview) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2768-56) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-productoverview--docs)

Use a Product Overview to introduce one product: its picture, a chip, its name, a line of trust, and two or three key facts.

## Use when

- **recommended** Introduce one product: its picture, a chip, its name, a line of trust, and two or three key facts.  
  _From summary: “Use a Product Overview to introduce one product: its picture, a chip, its name, a line of trust, and two or three key facts.”_
- **recommended** One product, and the facts that matter.  
  _From corePrinciple: “One product, and the facts that matter.”_

## Avoid when

- **discouraged** A card that should respond to a press: Product Overview isn't pressable.  
  _From states: “Product Overview has no states: it isn’t pressable”_
- **discouraged** A card that needs a selected, disabled, or loading look: Product Overview has none.  
  _From states: “has no selected, disabled, or loading look.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Picture | imageSource, fitted inside the card's width at 288:170. | no | anatomy: “imageSource, fitted inside the full width at 288:170.” |
| Chip | A ProductLabel from label, with labelImageSource as its picture. | yes | anatomy: “A ProductLabel from label, with labelImageSource as its picture.” |
| Name | productName, 26 px, centred: the page's heading. | no | anatomy: “productName, 26 px, centred: the page’s heading.” |
| Description | description, 14 px, centred. | no | anatomy: “description, 14 px, centred” |
| Stats | stats: a value over a label each, in equal columns. | no | anatomy: “stats: a value over a label each, in equal columns.” |
| Panel | A white panel, 24 px padding, no corners or border. | yes | anatomy: “A white panel, 24 px padding, no corners or border.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `children` | `ReactNode` | types |

## Placement

- **recommended** Put the product's action on the screen next to the overview, not inside it.  
  _From states: “Put the product’s action on the screen next to it, not inside it.”_
- **recommended** On a product page, the Buy button goes under the overview and belongs to the screen, because the card has no action of its own.  
  _From inContext: “The overview explains the product; the Buy button under it belongs to the screen, because the card has no action of its own.”_
- **recommended** The card fills its host's width; Figma draws it at 343 px.  
  _From sizing: “The card fills its host’s width; Figma draws it at 343 px.”_

## Configuration

- **recommended** `imageSource`: imageSource adds the product's picture at the top, fitted inside the card's width at 288:170 unless imageRatio says otherwise; without it the card starts at the chip.  
  _From configuration: “imageSource adds the product’s picture at the top, fitted inside the full width at 288:170 unless imageRatio says otherwise; without it the card starts at the chip.”_
- **recommended** `imageRatio` = `2`: imageRatio 2 gives the picture a wider frame, so a smaller coin.  
  _From configuration: “A wider frame, so a smaller coin.”_
- **recommended** `labelImageSource`: labelImageSource puts a small round picture in the chip.  
  _From configuration: “labelImageSource puts a small round picture in the chip.”_
- **recommended** `labelImageSource`: Without labelImageSource, the chip shows only its label.  
  _From configuration: “The chip shows only its label.”_
- **recommended** `stats`: stats takes any number of facts in equal columns, and [] removes the row.  
  _From configuration: “stats takes any number of facts in equal columns, and [] removes the row.”_
- **recommended** `children`: children adds your own content between the description and the stats, with the card's modes.  
  _From configuration: “children adds your own content between the description and the stats, with the card’s modes.”_
- **discouraged** `children`: Don't put a Button in children: it lands between the description and the facts. Keep the action on the screen, below the overview.  
  _From doDont: “It lands between the description and the facts.”_
- **recommended** `Text Appearance`: Text Appearance colours the name and the stat labels.  
  _From configuration: “Text Appearance colours the name and the stat labels.”_
- **recommended** `Text Appearance` = `Primary`: Text Appearance Primary gives a gold name and stat labels.  
  _From configuration: “A gold name and stat labels.”_
- **recommended** `Text Appearance` = `Secondary`: Text Appearance Secondary gives a purple name and stat labels.  
  _From configuration: “A purple name and stat labels.”_
- **recommended** `disableTruncation`: Stat values and labels stay on one line and end in … unless disableTruncation is set; with it, the stats wrap instead.  
  _From sizing: “Stat values and labels stay on one line and end in … unless disableTruncation is set.”_
- **recommended** `disableTruncation` = `true`: disableTruncation true lets the product name and description wrap instead of ending in …; by default the name is one line and the description at most two.  
  _From fact `/facts/props/10` (disableTruncation, source types)_

## Content

- **recommended** `productName`: Make productName the product with its size, such as 5g Gold Coin.  
  _From content: “Make productName the product with its size, such as 5g Gold Coin”_
- **recommended** `label`: Make the chip's label the metal or brand, not the product again.  
  _From content: “the chip’s label the metal or brand, not the product again.”_
- **discouraged** `label`: Don't repeat the product's name in the chip.  
  _From doDont: “The chip repeats 5g Gold Coin.”_
- **recommended** `description`: Write the description as a sentence or two on why to trust the product.  
  _From content: “The description is a sentence or two on why to trust it.”_
- **recommended** `stats`: A stat value is the figure, such as 995 or 3%, and its label a word or two, such as Purity or GST.  
  _From content: “A stat value is the figure, such as 995 or 3%, and its label a word or two, such as Purity or GST.”_
- **discouraged** `stats`: Don't put a sentence in a stat: stats stay on one line, so it's cut short.  
  _From doDont: “Stats stay on one line, so it’s cut short.”_
- **REQUIRED** `productName`: Set productName yourself: left out, the card shows the sample “0.5g Gold Coin”.  
  _From fact `/facts/props/4` (productName, source evidence)_
- **REQUIRED** `description`: Set description yourself: left out, the card shows the sample “Your gold is insured from our vault to you. If lost or damaged, we’ll replace it.”  
  _From fact `/facts/props/5` (description, source types)_
- **recommended** `stats`: Pass your own stats, or [] to remove the row: left out, the card shows two sample stats, 995 Purity and 3% GST.  
  _From evidence: “`stats` (995 Purity, 3% GST; `[]` removes the row)”_
- **recommended** `label`: Set label to the product's metal or brand: left out, the chip shows “Gold”.  
  _From fact `/facts/props/3` (label, source evidence)_

Good: “Gold”, “5g Gold Coin”, “Your gold is insured from our vault to you. If lost or damaged, we’ll replace it.”, “995”, “Purity”, “3%”, “GST”, “Silver”, “10g Silver Coin”, “Insured delivery to your door, with a purity certificate.”, “999”, “10g”, “Weight”

Bad: “Insured from our vault to you”

## States

| State | When | From |
| --- | --- | --- |
| Read-only | Always: Product Overview has no states, and the card itself isn't pressable. | states: “Product Overview has no states: it isn’t pressable” |
| Selected, disabled, loading | Not available: it has no selected, disabled, or loading look. | states: “has no selected, disabled, or loading look.” |

## Accessibility

- **recommended** `productName`: productName is the page's heading.  
  _From anatomy: “productName, 26 px, centred: the page’s heading.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Figures in stats | A sentence in a stat | Stats stay on one line, so it’s cut short. |
| The metal in the chip | The name twice | The chip repeats 5g Gold Coin. |
| The action under the card | A Button in children | It lands between the description and the facts. |

## Examples

### A gold coin's product page, the guide's In context: the overview explains the product, and the Buy button under it belongs to the screen, because the card has no action of its own; Buy opens the screen's own checkout. The image URIs stand for the product's own picture and the brand's logo.

```tsx
<VStack>
  <ProductOverview
    imageSource={{ uri: 'https://example.com/gold-coin.png' }}
    labelImageSource={{ uri: 'https://example.com/jio-gold-logo.png' }}
    label="Gold"
    productName="5g Gold Coin"
    description="Your gold is insured from our vault to you. If lost or damaged, we’ll replace it."
    stats={[
      { value: '995', label: 'Purity' },
      { value: '3%', label: 'GST' },
    ]}
  />
  <Button label="Buy for ₹38,750" onPress={() => {}} />
</VStack>
```

_From inContext: “The overview explains the product; the Buy button under it belongs to the screen, because the card has no action of its own.”_

### A silver coin, the guide's Content example: Silver in the chip, the size in the name, and three figures. With no imageSource the card starts at the chip, and with no labelImageSource the chip shows only its label.

```tsx
<ProductOverview
  label="Silver"
  productName="10g Silver Coin"
  description="Insured delivery to your door, with a purity certificate."
  stats={[
    { value: '999', label: 'Purity' },
    { value: '3%', label: 'GST' },
    { value: '10g', label: 'Weight' },
  ]}
/>
```

_From content: “Silver in the chip, three figures.”_

### No stats: stats={[]} removes the row, leaving the name and description.

```tsx
<ProductOverview
  imageSource={{ uri: 'https://example.com/gold-coin.png' }}
  labelImageSource={{ uri: 'https://example.com/jio-gold-logo.png' }}
  label="Gold"
  productName="5g Gold Coin"
  description="Your gold is insured from our vault to you. If lost or damaged, we’ll replace it."
  stats={[]}
/>
```

_From configuration: “stats takes any number of facts in equal columns, and [] removes the row.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `imageSource` | `ImageSourcePropType \| string` |  |  |  | types | Hero image source rendered at the top of the card. |
| `imageRatio` | `number` |  | `1.6941` |  | types | Aspect ratio for the hero image. Defaults to the Figma frame (288:170). Default 1.6941 (FIGMA_IMAGE_WIDTH / FIGMA_IMAGE_HEIGHT), from the component source. |
| `labelImageSource` | `ImageSourcePropType \| string` |  |  |  | types | Avatar source for the inline ProductLabel chip. |
| `label` | `string` |  | `"Gold"` |  | evidence (2026-10-20) | The chip always shows; label defaults to “Gold”. Declared: Text shown next to the avatar in the ProductLabel chip. Default "Gold", from the component source. |
| `productName` | `string` |  | `"0.5g Gold Coin"` |  | evidence (2026-10-20) | The name is a header (accessibilityRole header; an h1 on the web), centred. Declared: The large product name, e.g. "0.5g Gold Coin". Default "0.5g Gold Coin", from the component source. |
| `description` | `string` |  | `"Your gold is insured from our vault to you. If lost or damaged, we’ll replace it."` |  | types | The short multi-line description below the product name. Default "Your gold is insured from our vault to you. If lost or damaged, we’ll replace it.", from the component source. |
| `stats` | `ProductOverviewStat[]` |  |  |  | evidence (2026-10-20) | Each stat is an equal column (flex 1): a 20 px heavy value over a 12 px label, each on one line ending in … unless disableTruncation is set. Declared: Stats rendered in the bottom row. Each stat shows a large value above a smaller label. Pass an empty array (or `null`) to hide the row. |
| `modes` | `Modes` |  |  |  | types | Design token modes for theming (e.g. `{ 'Color Mode': 'Light' }`). |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Container style override. |
| `children` | `React.ReactNode` |  |  |  | types | Custom slot rendered between the description and the stats row, useful for badges, callouts, etc. Receives the same `modes` as the parent and is centred with the rest of the card. |
| `disableTruncation` | `boolean` |  |  |  | types | When `true`, the product name and description wrap instead of ellipsizing. By default the name is one line and the description is at most two. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Avatar Size` | `mode collection` | L, M, S, XS | `"L"` |  | types | A token collection ProductOverview reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Badge Size` | `mode collection` | Medium, Small | `"Medium"` |  | types | A token collection ProductOverview reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection ProductOverview reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context` | `mode collection` | Default, Nudge&Alert, CTACard, ListItem | `"Default"` |  | types | A token collection ProductOverview reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 10` | `mode collection` | Default, jioPlus | `"Default"` |  | types | A token collection ProductOverview reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context2` | `mode collection` | Default, AppBar | `"Default"` |  | types | A token collection ProductOverview reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context4` | `mode collection` | Default, Chip, Button, Badge, Badge/glass | `"Default"` |  | types | A token collection ProductOverview reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection ProductOverview reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Profile Card Appearance` | `mode collection` | Default, Premium | `"Default"` |  | types | A token collection ProductOverview reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Text Appearance` | `mode collection` | Neutral, Primary, Secondary, Tertiary, Success, Warning, Error | `"Neutral"` |  | evidence (2026-10-20) | Colours the product name and the stat labels: Primary gold, Secondary purple (#5d00b5), Tertiary blue, and Success, Warning and Error. It doesn't colour the description or the stat values. Declared: A token collection ProductOverview reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types | Custom slot rendered between the description and the stats row, useful for badges, callouts, etc. Receives the same `modes` as the parent and is centred with the rest of the card. |

### Events

_No events._

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- The name's line is 32 px where Figma's is 26, and a stat value's 24 where Figma's is 20, so the card is taller than Figma's 396 px (Component Bug #355). _(evidence, 2026-10-20)_
- Left out, imageSource and labelImageSource give no picture and no chip picture, where Figma's component shows the coin and the Jio dot. _(evidence, 2026-10-20)_
- Figma's Product Overview has no properties: the picture, chip, text, and two stats are layers there. _(evidence, 2026-10-20)_
- Figma has no children, imageRatio or disableTruncation, and its frame holds a fixed two stats; the package takes any number of stats. _(evidence, 2026-10-20)_
- The published Storybook is older than the installed package and still shows the older generated page (Component Bug #355). _(evidence, 2026-10-20)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `(whole entry)` · human: The guide (checked 20 October on 0.1.78-c7d3348) still describes Component Bug #355 problems that the installed 0.1.78-dbe0e02 fixes, read from source: the description is readable (card/supportive-text/color, #1a1c1f in every Text Appearance mode, not the white text/appearance/medium/color), the picture sits in a 288 px centred frame instead of filling the card’s width, and the name (1 line) and description (2 lines) end in … unless disableTruncation is set. The entry follows the package, so it does not say “white on white” or “disableTruncation affects only the stats”. The guide changes when #355 is closed and published. Added by Claude Code in the overnight run agentpack-batch7, for Marcin to confirm.
