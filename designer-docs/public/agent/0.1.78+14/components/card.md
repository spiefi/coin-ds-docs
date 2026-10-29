# Card

> Coin agent pack 0.1.78+14 (pilot). Generated from `components/card.json`; the JSON is the source of truth.

- **State:** flagged (1 flag, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `e7ed622` · built 2026-10-29T05:38:55Z
- **Category:** card (for discovery only, not a limit on composition) · **Tags:** product card, offer card, surface, panel, container
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=card) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=5739-794) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-card--docs)

Use a Card to group one product, offer, or article on a panel, with an optional logo, a picture, and a few lines of text.

## Use when

- **recommended** Group one product, offer, or article on a panel, with an optional logo, a picture, and a few lines of text.  
  _From summary: “Use a Card to group one product, offer, or article on a panel, with an optional logo, a picture, and a few lines of text.”_

## Avoid when

_None in the guide._

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Header | The header slot: a logo or a label in a row padded 12 px. | no | anatomy: “header: a logo or a label in a row padded 12 px.” |
| Media | The media slot: a picture across the full width at 154:116 (mediaAspectRatio changes it). The default variant only; slim never shows it. | no | anatomy: “media: a picture across the full width at 154:116.” |
| Support text | Card.SupportText: a 12 px line for a category or a fact. | no | anatomy: “Card.SupportText: a 12 px line for a category or a fact.” |
| Title | Card.Title: the name in 16 px heavy type, up to 3 lines. | no | anatomy: “Card.Title: the name in 16 px heavy type, up to 3 lines.” |
| Content | children: a column padded 12 px, 4 px between lines, usually Card.SupportText and Card.Title. | no | anatomy: “children: a column padded 12 px, 4 px between lines.” |
| Panel | The card itself: AppearanceBrand sets the fill; corners are 12 px. | yes | anatomy: “AppearanceBrand sets the fill; corners are 12 px.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `header` | `ReactNode` | types |
| `media` | `ReactNode` | types |
| `children` | `ReactNode` | types |

## Placement

- **recommended** The card fills a column's width but hugs its content in a row, so give it a width there; Figma and Storybook draw it at 200 px.  
  _From sizing: “The card fills a column’s width but hugs its content in a row, so give it a width there; Figma and Storybook draw it at 200 px.”_
- **recommended** Height follows the content.  
  _From sizing: “Height follows the content.”_
- **recommended** Two offers can share a row, each card taking half of it.  
  _From inContext: “Two offers share a row, each card taking half of it.”_

## Configuration

- **recommended** `variant`: variant default shows a picture when you pass media; slim never does.  
  _From configuration: “variant default shows a picture when you pass media; slim never does.”_
- **recommended** `variant` = `default`: Default (the default variant): a logo, a picture, and the text, for an offer that leads with an image.  
  _From configuration: “A logo, a picture, and the text, for an offer that leads with an image.”_
- **recommended** `variant` = `slim`: Slim: the logo and the text, without a picture.  
  _From configuration: “The logo and the text, without a picture.”_
- **REQUIRED** `media`: To show a picture, use the default variant: slim ignores media.  
  _From fact `/facts/props/2` (media, source types)_
- **discouraged** `variant` = `slim`: Do not put a picture on a slim card: slim drops the picture without a warning.  
  _From doDont: “Slim drops the picture without a warning.”_
- **recommended** Pass header for a logo or a label, media for a picture, and children for the text, and leave out what you don't need.  
  _From configuration: “Pass header for a logo or a label, media for a picture, and children for the text, and leave out what you don’t need.”_
- **recommended** Each slot shows only when you pass it.  
  _From anatomy: “Each slot shows only when you pass it.”_
- **recommended** Figma's header and media switches are the header and media props in code: pass them or leave them out; false also hides a slot.  
  _From sources: “Figma’s header and media switches are the header and media props in code: pass them or leave them out (false also hides a slot).”_
- **recommended** `children`: Text only: just children, a plain panel for a few lines.  
  _From configuration: “Just children: a plain panel for a few lines.”_
- **recommended** `media`: Give the media Image a width and height of 100%, as the guide does, so it fills the media slot at any mediaAspectRatio; an Image with its own ratio leaves a blank band.  
  _From evidence: “so it fills the media slot at any `mediaAspectRatio` (an Image with its own ratio leaves a blank band)”_
- **recommended** `mediaAspectRatio`: The picture keeps 154:116 of the width, and mediaAspectRatio changes that.  
  _From sizing: “The picture keeps 154:116 of the width, and mediaAspectRatio changes that.”_
- **recommended** `mediaAspectRatio` = `1`: mediaAspectRatio 1: a square picture.  
  _From sizing: “A square picture.”_
- **recommended** `AppearanceBrand`: AppearanceBrand sets the fill: with no modes the card is Neutral white, as Figma draws it.  
  _From configuration: “AppearanceBrand sets the fill: with no modes the card is Neutral white, as Figma draws it.”_
- **recommended** `AppearanceBrand` = `Neutral`: Neutral (the card's default): with no AppearanceBrand the card is white, as Figma and Storybook draw it.  
  _From configuration: “With no AppearanceBrand the card is white, as Figma and Storybook draw it.”_
- **recommended** `AppearanceBrand` = `Primary`: Primary: a cream fill.  
  _From configuration: “A cream fill.”_
- **recommended** `AppearanceBrand` = `Secondary`: Secondary: a light purple fill.  
  _From configuration: “A light purple fill.”_
- **recommended** `AppearanceBrand` = `Tertiary`: Tertiary: a light blue fill.  
  _From configuration: “A light blue fill.”_
- **recommended** `Semantic Intent` = `System`: Semantic Intent System tints the card with AppearanceSystem's status colour.  
  _From configuration: “Semantic Intent System tints it with AppearanceSystem’s status colour.”_
- **recommended** `AppearanceSystem` = `positive`: With Semantic Intent System, AppearanceSystem positive tints the card green.  
  _From configuration: “Semantic Intent System with AppearanceSystem positive: green.”_
- **recommended** `AppearanceSystem` = `warning`: With Semantic Intent System, AppearanceSystem warning tints the card orange.  
  _From configuration: “warning: orange.”_
- **recommended** `AppearanceSystem` = `negative`: With Semantic Intent System, AppearanceSystem negative tints the card red.  
  _From configuration: “negative: red.”_
- **recommended** `Card Container` = `Plain`: Card Container Plain removes the panel: no fill, border, corners, or padding, so the text sits on what's behind it.  
  _From configuration: “No fill, border, corners, or padding: the text sits on what’s behind it.”_
- **recommended** `Page type` = `SubPage`: Page type SubPage: a light grey border around the white card.  
  _From configuration: “A light grey border around the white card.”_
- **recommended** `context 8` = `Section`: context 8 Section: the same grey border, for a card inside a section.  
  _From configuration: “The same grey border, for a card inside a section.”_
- **recommended** `Gap`: The header and the text are padded 12 px, with 4 px between slots and between lines; Gap M and L widen both, and Gap None removes them.  
  _From sizing: “The header and the text are padded 12 px, with 4 px between slots and between lines; Gap M and L widen both, and Gap None removes them.”_
- **recommended** `Gap` = `M`: Gap M: 14 px between slots, 18 px between lines.  
  _From sizing: “14 px between slots, 18 px between lines.”_
- **recommended** `Gap` = `L`: Gap L: 23 px between slots and between lines.  
  _From sizing: “23 px for both.”_
- **recommended** `onPress`: Without onPress the card is static; with onPress the whole card is one button.  
  _From states: “Without onPress the card is static. With onPress the whole card is one button”_
- **discouraged** `onPress`: Do not put buttons inside a pressable card: with onPress the whole card is one button.  
  _From states: “don’t put buttons inside it”_
- **recommended** `onPress`: Each card's onPress opens its offer: the screen does the navigation, and the card only reports the press.  
  _From inContext: “Each card’s onPress opens its offer: the screen does the navigation, and the card only reports the press.”_
- **recommended** `disabled`: disabled acts on a pressable card: without onPress it does nothing.  
  _From states: “without onPress it does nothing”_

## Content

- **recommended** One card, one idea: a name and one fact.  
  _From corePrinciple: “One card, one idea: a name and one fact.”_
- **recommended** Make the title the product or offer name, and each support line one fact: a category, a price, a date, or a status.  
  _From content: “Make the title the product or offer name, and each support line one fact: a category, a price, a date, or a status.”_
- **recommended** `header`: The header is a logo or a label, not a second title.  
  _From content: “The header is a logo or a label, not a second title.”_
- **discouraged** `header`: Do not put a second title in the header: two titles compete, and the product name gets lost.  
  _From doDont: “Two titles compete, and the product name gets lost.”_
- **recommended** `Card.Title`: Card.Title stops at three lines with an ellipsis.  
  _From content: “Card.Title stops at three lines with an ellipsis”_
- **recommended** `Card.SupportText`: Keep Card.SupportText short: it never stops.  
  _From content: “Card.SupportText never stops, so keep it short.”_
- **discouraged** `Card.SupportText`: Do not write a paragraph of support text: support text never stops, so the card grows and the name gets lost.  
  _From doDont: “Support text never stops, so the card grows and the name gets lost.”_

Good: “Digital gold”, “24K digital gold”, “From ₹10”, “JioFinance”, “Fixed deposit”, “Earn 7.25% a year”, “From ₹1,000”

Bad: “Buy and sell 24K gold any time, from as little as ₹10, and we keep it in an insured vault for you at no extra cost.”, “Grow your savings”

## States

| State | When | From |
| --- | --- | --- |
| Static | Without onPress: text to read, nothing responds. | states: “Without onPress the card is static.” |
| Pressable | With onPress the whole card is one button. | states: “With onPress the whole card is one button” |
| Hover | A pressable card dims a little on hover. | states: “It dims a little on hover and more while pressed, and a thin dark outline shows its focus.” |
| Pressed | A pressable card dims more while pressed. | states: “It dims a little on hover and more while pressed, and a thin dark outline shows its focus.” |
| Focus | A thin dark outline shows a pressable card's focus. | states: “It dims a little on hover and more while pressed, and a thin dark outline shows its focus.” |
| Disabled | disabled dims it to half, stops presses, and takes it out of the Tab order; without onPress it does nothing. | states: “disabled dims it to half, stops presses, and takes it out of the Tab order; without onPress it does nothing.” |

## Accessibility

- **recommended** `accessibilityLabel`: A pressable card is one button: give it an accessibilityLabel when the title isn't its whole name.  
  _From states: “give it an accessibilityLabel when the title isn’t its whole name”_
- **recommended** `disabled`: A disabled pressable card is dimmed to half; presses and Tab skip it.  
  _From states: “Dimmed to half; presses and Tab skip it.”_
- **recommended** `accessibilityLabel`: Without onPress, an accessibilityLabel makes the card a group with that name on the web.  
  _From evidence: “`accessibilityLabel` without `onPress` gives a `group` with that name.”_
- **recommended** `Card.Title`: Card.Title is not a heading.  
  _From evidence: “The title is not a heading.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Default for a picture | A picture on a slim card | Slim drops the picture without a warning. |
| A name and one fact | A paragraph of support text | Support text never stops, so the card grows and the name gets lost. |
| A logo in the header | A second title in the header | Two titles compete, and the product name gets lost. |

## Examples

### Offers on the Home screen, the guide's In context: two offers share a row, each card taking half of it, under the section's Title. As in the guide's own In context example, the cards are Slim, each onPress opens its offer, and an accessibilityLabel names the whole card; the logo in the header is decorative.

```tsx
<VStack>
  <Title title="Offers for you" subtitle="Picked for your savings" />
  <HStack alignVertical="stretch">
    <Card
      variant="slim"
      header={
        <HStack alignVertical="center">
          <Image imageSource={{ uri: 'https://example.com/jiofinance-logo.png' }} width={18} height={18} accessibilityElementsHidden importantForAccessibility="no" />
          <Text text="JioFinance" />
        </HStack>
      }
      onPress={() => {}}
      accessibilityLabel="24K digital gold, from ₹10"
      style={{ flex: 1 }}
    >
      <Card.SupportText>Digital gold</Card.SupportText>
      <Card.Title>24K digital gold</Card.Title>
      <Card.SupportText>From ₹10</Card.SupportText>
    </Card>
    <Card
      variant="slim"
      header={
        <HStack alignVertical="center">
          <Image imageSource={{ uri: 'https://example.com/jiofinance-logo.png' }} width={18} height={18} accessibilityElementsHidden importantForAccessibility="no" />
          <Text text="JioFinance" />
        </HStack>
      }
      onPress={() => {}}
      accessibilityLabel="Fixed deposit, earn 7.25% a year"
      style={{ flex: 1 }}
    >
      <Card.SupportText>Fixed deposit</Card.SupportText>
      <Card.Title>Earn 7.25% a year</Card.Title>
      <Card.SupportText>From ₹1,000</Card.SupportText>
    </Card>
  </HStack>
</VStack>
```

_From inContext: “Two offers share a row, each card taking half of it.”_

### Default, for an offer that leads with an image: a logo, a picture, and the text, at Figma's 200 px. The media Image is 100% wide and tall so it fills the 154:116 slot. Static: no onPress.

```tsx
<Card
  header={
    <HStack alignVertical="center">
      <Image imageSource={{ uri: 'https://example.com/jiofinance-logo.png' }} width={18} height={18} accessibilityElementsHidden importantForAccessibility="no" />
      <Text text="JioFinance" />
    </HStack>
  }
  media={
    <Image imageSource={{ uri: 'https://example.com/bank-hero.png' }} width="100%" height="100%" accessibilityLabel="Two people smiling at a phone" />
  }
  style={{ width: 200 }}
>
  <Card.SupportText>Jio Payments Bank</Card.SupportText>
  <Card.Title>Savings account</Card.Title>
  <Card.SupportText>Zero balance</Card.SupportText>
</Card>
```

_From configuration: “A logo, a picture, and the text, for an offer that leads with an image.”_

### A status, the guide's negative example: Semantic Intent System with AppearanceSystem negative tints the card red for a fixed deposit whose renewal failed. Text only: just children.

```tsx
<Card modes={{ 'Semantic Intent': 'System', AppearanceSystem: 'negative' }} style={{ width: 200 }}>
  <Card.SupportText>Fixed deposit</Card.SupportText>
  <Card.Title>Renewal failed</Card.Title>
  <Card.SupportText>Add ₹1,000 to try again</Card.SupportText>
</Card>
```

_From configuration: “Semantic Intent System tints it with AppearanceSystem’s status colour.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `variant` | `CardVariantInput` | default, slim, Default, Slim | `"default"` |  | types | Visual layout variant matching Figma `Property 1`. - `'default'` — header + optional media + content (Figma Default) - `'slim'` — header + content only; `media` is ignored (Figma Slim) Defaults to `'default'`. Existing call sites that omit `media` continue to render a media-less default card (backward compatible). Prefer `variant="slim"` when you want the Slim contract explicitly. Default "default", from the component source. |
| `header` | `React.ReactNode` |  |  |  | evidence (2026-10-27) | A plain string header is wrapped in Text. Declared: Content rendered in the header slot at the top of the card (e.g. a brand logo). Sits above the media slot, padded with `card/content/padding/*`. `false`, `''` and `null` hide the slot. |
| `media` | `React.ReactNode` |  |  |  | types | Media slot content (e.g. `<Image />`). Wrapped in a container that respects `mediaAspectRatio`. Ignored when `variant="slim"`. `false`, `''` and `null` hide the slot. |
| `children` | `React.ReactNode` |  |  |  | types | Content slot (e.g. `Card.Title`, `Card.SupportText`). |
| `modes` | `Modes` |  |  |  | evidence (2026-10-28) | The card doesn't read the app's theme: its modes come from this prop or from a Coin stack it is placed in. Declared: Modes object for token resolution. Cascades into all slots. |
| `mediaAspectRatio` | `number` |  | `1.3276` |  | types | Aspect ratio for the media slot container. Defaults to the Figma Ratio 154/116 (~1.328). Default 1.3276 (154 / 116), from the component source. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Style overrides for the card container. |
| `onPress` | `() => void` |  |  |  | evidence (2026-10-27) | A pressable card dims to opacity 0.92 on hover and 0.8 while pressed (mouse and Space), and shows a 1 px #0c0d10 focus outline at offset 2, which also shows after a mouse click until blur. Declared: Press handler for the whole card. When set, the card becomes pressable (`Pressable` + `accessibilityRole="button"`). |
| `disabled` | `boolean` |  |  |  | evidence (2026-10-27) | With onPress: opacity 0.5, disabled and aria-disabled, tabindex -1, skipped by Tab, no hover or press change. Without onPress it does nothing. Declared: Disable interaction when `onPress` is set. |
| `accessibilityLabel` | `string` |  |  |  | evidence (2026-10-27) | Without onPress it makes the card a group with that name on the web; with onPress it names the button. Declared: Accessibility label forwarded to the root. |
| `...CardBaseProps` | `CardBaseProps` |  |  |  | types | Inherited React Native props the component also accepts. They are not part of the design contract and no guide documents them. |
| `Card.Title` | `component` |  |  |  | evidence (2026-10-19) | 16 px, weight 900, line height 20 (the 18 px token raised to fit the type); clamps at 3 lines, and its numberOfLines changes that (0 removes the clamp). Not a heading. Declared: A static sub-component of Card. Its own props: children, style, modes, numberOfLines. |
| `Card.SupportText` | `component` |  |  |  | evidence (2026-10-19) | 12 px on 16 px lines, weight 400, with no line limit unless numberOfLines sets one. Not a heading. Declared: A static sub-component of Card. Its own props: children, style, modes, numberOfLines. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Neutral"` |  | evidence (2026-10-27) | Sets the card's fill. With no modes, or Color Mode Light only, the fill is Neutral white (#ffffff); AppearanceBrand Primary, on the card or from a VStack, gives cream #fef4e5. Declared: A token collection Card reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `AppearanceSystem` | `mode collection` | positive, warning, negative | `"positive"` |  | types | A token collection Card reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Card Container` | `mode collection` | Default, Plain | `"Default"` |  | types | A token collection Card reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection Card reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 8` | `mode collection` | Default, Section | `"Default"` |  | types | A token collection Card reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Gap` | `mode collection` | S, M, L, None | `"S"` |  | types | A token collection Card reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection Card reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Semantic Intent` | `mode collection` | Brand, System | `"Brand"` |  | types | A token collection Card reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `header` | `React.ReactNode` |  |  |  | types | Content rendered in the header slot at the top of the card (e.g. a brand logo). Sits above the media slot, padded with `card/content/padding/*`. `false`, `''` and `null` hide the slot. |
| `media` | `React.ReactNode` |  |  |  | types | Media slot content (e.g. `<Image />`). Wrapped in a container that respects `mediaAspectRatio`. Ignored when `variant="slim"`. `false`, `''` and `null` hide the slot. |
| `children` | `React.ReactNode` |  |  |  | types | Content slot (e.g. `Card.Title`, `Card.SupportText`). |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onPress` | `() => void` |  |  |  | types | Press handler for the whole card. When set, the card becomes pressable (`Pressable` + `accessibilityRole="button"`). |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- Figma draws Default and Slim at 200 px with fixed heights; in code the card hugs its content. _(evidence, 2026-10-28)_
- Card.Title's line height is 20 px in code and 18 px in Figma. _(evidence, 2026-10-19)_
- Figma has no header switch on Slim; code accepts a header there. _(evidence, 2026-10-19)_
- The published Storybook still shows the older generated Card page. _(evidence, 2026-10-28)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/avoidWhen` · trace-check: The guide gives no avoidWhen guidance; left empty rather than guessed.
