# PortfolioHero

> Coin agent pack 0.1.78+26 (pilot). Generated from `components/portfoliohero.json`; the JSON is the source of truth.

- **State:** flagged (1 flag, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `e7ed622` · built 2026-10-31T03:54:03Z
- **Category:** content (for discovery only, not a limit on composition) · **Tags:** holding value, portfolio value, investment total, gold value, asset hero
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=portfoliohero) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2705-14040) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-portfoliohero--docs)

Use a Portfolio Hero at the top of a holding’s page to show what it is and what it’s worth, with an optional note under the amount.

## Use when

- **recommended** Show what a holding is and what it's worth at the top of its page, with an optional note under the amount.  
  _From summary: “Use a Portfolio Hero at the top of a holding’s page to show what it is and what it’s worth, with an optional note under the amount.”_
- **recommended** The product, its value, then one note.  
  _From corePrinciple: “The product, its value, then one note.”_

## Avoid when

- **discouraged** A left-aligned total: Biscuit's Storybook page, as the evidence records it, points to Balance instead. Use instead: `Balance`.  
  _From evidence: “not a left-aligned total (Balance)”_
- **discouraged** A product explanation: Biscuit's Storybook page, as the evidence records it, points to Product Overview instead. Use instead: `ProductOverview`.  
  _From evidence: “or a product explanation (ProductOverview)”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Avatar | imageSource, 29 px at the default Avatar Size S. | no | anatomy: “imageSource, 29 px at the default Avatar Size S.” |
| Label | label, the product name, 16 px Bold. | no | anatomy: “label, the product name, 16 px Bold.” |
| Amount | A Money Value from value and currency, 36 px Black. | yes | anatomy: “A Money Value from value and currency, 36 px Black.” |
| Slot | children, centred under the amount, 8 px apart. | no | anatomy: “children, centred under the amount, 8 px apart.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `children` | `ReactNode` | types |
| `topSlot` | `ReactNode` | types |
| `actionSlot` | `ReactNode` | types |

## Placement

- **recommended** Put it at the top of a holding's page.  
  _From summary: “Use a Portfolio Hero at the top of a holding’s page”_
- **recommended** On the guide's Gold page the hero comes first, the holding's details follow in a list, and the two actions sit at the bottom.  
  _From inContext: “The hero opens the Gold page, the holding’s details follow in a list, and the two actions sit at the bottom.”_
- **recommended** The product label sits on top, the amount under it, and children under that; everything is centred.  
  _From anatomy: “The product label sits on top, the amount under it, and anything you pass as children under that. Everything is centred.”_
- **recommended** The hero has no width of its own: it is as wide as its widest line, usually the amount, plus 8 px on each side.  
  _From sizing: “The hero has no width of its own: it is as wide as its widest line, usually the amount, plus 8 px on each side, and centres everything.”_
- **recommended** Top to bottom: 8 px of padding, the 29 px label row, 16 px, the amount on a 44 px line, 16 px, then the slot.  
  _From sizing: “Top to bottom: 8 px of padding, the 29 px label row, 16 px, the amount on a 44 px line, 16 px, then the slot.”_
- **recommended** The amount never wraps or shrinks, so give the hero a host wider than its longest amount.  
  _From sizing: “The amount never wraps or shrinks, so give the hero a host wider than its longest amount.”_

## Configuration

- **recommended** `imageSource`: imageSource puts the product's logo before its label; without it there is no avatar, not an empty circle.  
  _From configuration: “imageSource puts the product’s logo before its label; without it there is no avatar, not an empty circle.”_
- **recommended** `Avatar Size`: Avatar Size sets the logo to 42, 36 or 29 px.  
  _From configuration: “Avatar Size sets the logo to 42, 36, or 29 px.”_
- **recommended** `Avatar Size` = `L`: Avatar Size L: a 42 px logo.  
  _From configuration: “A 42 px logo.”_
- **recommended** `Avatar Size` = `M`: Avatar Size M: a 36 px logo.  
  _From configuration: “36 px.”_
- **recommended** `Avatar Size` = `S`: Avatar Size S: a 29 px logo, the hero's default.  
  _From configuration: “29 px, the default.”_
- **recommended** `children`: children adds what sits under the amount, usually a Badge with the change and a Text with one fact.  
  _From configuration: “children adds what sits under the amount, usually a Badge with the change and a Text with one fact”_
- **recommended** `value`: The screen keeps the holding's value and passes it in value: on the guide's Gold page, Buy ₹1,000 and Sell ₹1,000 change the holding and the hero shows the new value.  
  _From inContext: “Buy ₹1,000 and Sell ₹1,000 change the holding, and the hero shows the new value”_
- **recommended** `topSlot`: topSlot replaces the product label (the avatar and label); false, '' or null hide it. Leave topSlot out to keep the label.  
  _From fact `/facts/props/6` (topSlot, source types)_
- **recommended** `actionSlot`: actionSlot puts your own control beside the amount; false, '' or null hide it. Without actionSlot, showAction or onActionPress shows the default action: a 42 px Neutral Low IconButton.  
  _From fact `/facts/props/7` (actionSlot, source types)_
- **recommended** `actionActive`: The default action is a toggle: left without actionActive it switches itself on and off when pressed; pass actionActive to set its state from the screen.  
  _From fact `/facts/props/12` (actionActive, source types)_

## Content

- **REQUIRED** `label`: Set label to the product's name: left out, the hero shows “Gold”.  
  _From fact `/facts/props/0` (label, source types)_
- **REQUIRED** `value`: Set value to the holding's value: left out, the hero shows 12,000.11.  
  _From fact `/facts/props/2` (value, source types)_
- **recommended** `label`: Write label as the product in a word or two, such as Gold or Mutual Funds.  
  _From content: “Write label as the product in a word or two, such as Gold or Mutual Funds.”_
- **recommended** `value`: Give value as the formatted figure alone: currency adds the symbol, and INR or ₹ both show ₹.  
  _From content: “Give value as the formatted figure alone: currency adds the symbol, and INR or ₹ both show ₹.”_
- **recommended** `value`: The amount keeps its digit grouping as you write it.  
  _From content: “the grouping stays as you write it.”_
- **recommended** `children`: Use children for a caption, such as the change in a Badge and one fact in a Text.  
  _From content: “Use children for a caption, such as the change in a Badge and one fact in a Text”_
- **recommended** `children`: A Text in children is 12 px, because the hero sets Text Sizes Small.  
  _From content: “a Text there is 12 px, because the hero sets Text Sizes Small.”_
- **recommended** `children`: Show a gain or a loss with the Badge in children.  
  _From states: “What changes is what you pass: a gain or a loss is the Badge in children.”_
- **discouraged** `children`: Don't put a second total in children: the amount stays the only total.  
  _From content: “It isn’t a place for a second total.”_
- **discouraged** `children`: Don't write a paragraph under the amount: a long note turns the hero into a block of text.  
  _From doDont: “A long note turns the hero into a block of text.”_

Good: “Gold”, “Mutual Funds”, “12,000.11”, “1,45,230.50”, “+₹2,722.45 (+22.5%)”, “−₹1,204.10 (−0.8%)”, “Worth 1.23g Gold”

Bad: “Your gold has grown 22.5% since you started saving in March 2024, and you can sell it at any time at today’s price.”, “Total portfolio ₹4,52,300.00”

## States

| State | When | From |
| --- | --- | --- |
| Up | A gain: the gold Badge in children, as Figma shows it. | states: “The gold Badge, as Figma shows it.” |
| Down | A loss: the Badge in children with Semantic Intent System and AppearanceSystem negative. | states: “The Badge’s Semantic Intent System, AppearanceSystem negative.” |

## Accessibility

- **recommended** Screen readers read the amount once, with its currency.  
  _From sources: “Screen readers read the amount once, with its currency.”_
- **recommended** `accessibilityLabel`: accessibilityLabel names the hero region: with it the hero is one named group; without it the hero doesn't group its parts.  
  _From fact `/facts/props/13` (accessibilityLabel, source evidence)_
- **recommended** `actionAccessibilityLabel`: The default action is named from its icon (ic_card reads “Card”); actionAccessibilityLabel gives it another name.  
  _From fact `/facts/props/11` (actionAccessibilityLabel, source types)_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| One short note | A paragraph under the amount | A long note turns the hero into a block of text. |
| The change in a Badge | A second total in the slot | Two figures compete; put the portfolio total on its own page. |

## Examples

### The top of a holding's page, the guide's In context: the hero opens the Gold page with the product's logo, the holding's value, and under the amount a Badge with the change (its leading ic_card Icon on Context4 Badge, as the Badge entry says) and a Text with one fact; the holding's details follow in a ListGroup of List Items, and the two actions sit below: Buy keeps the defaults and Sell takes Emphasis Medium. The URI stands for the product's logo image, value for the holding's current value (Buy and Sell change it), and each onPress for the screen buying or selling ₹1,000.

```tsx
<VStack>
  <VStack>
    <PortfolioHero
      label="Gold"
      imageSource={{ uri: 'https://example.com/logos/gold.png' }}
      value="12,000.11"
    >
      <Badge
        label="+₹2,722.45 (+22.5%)"
        leading={<Icon iconName="ic_card" modes={{ Context4: 'Badge' }} accessibilityElementsHidden importantForAccessibility="no" />}
      />
      <Text text="Worth 1.23g Gold" />
    </PortfolioHero>
    <ListGroup>
      <ListItem layout="Horizontal" title="Gold in your locker" supportText="1.23 g · 24K, 99.9% pure" navArrow={false} />
      <ListItem layout="Horizontal" title="Average buy price" supportText="₹7,544 a gram" navArrow={false} />
      <ListItem layout="Horizontal" title="Today’s price" supportText="₹9,756 a gram" navArrow={false} />
    </ListGroup>
  </VStack>
  <HStack>
    <Button label="Sell ₹1,000" modes={{ Emphasis: 'Medium' }} onPress={() => {}} />
    <Button label="Buy ₹1,000" onPress={() => {}} />
  </HStack>
</VStack>
```

_From inContext: “The hero opens the Gold page, the holding’s details follow in a list, and the two actions sit at the bottom.”_

### A holding that lost value, the guide's Down card: the change goes in a Badge with Semantic Intent System and AppearanceSystem negative, and its leading Icon takes the same modes with Context4 Badge. The URI stands for the product's logo image, and the figures for the holding's value and its change.

```tsx
<PortfolioHero
  label="Mutual Funds"
  imageSource={{ uri: 'https://example.com/logos/mutual-funds.png' }}
  value="1,45,230.50"
>
  <Badge
    label="−₹1,204.10 (−0.8%)"
    modes={{ 'Semantic Intent': 'System', AppearanceSystem: 'negative' }}
    leading={<Icon iconName="ic_card" modes={{ 'Semantic Intent': 'System', AppearanceSystem: 'negative', Context4: 'Badge' }} accessibilityElementsHidden importantForAccessibility="no" />}
  />
</PortfolioHero>
```

_From states: “The Badge’s Semantic Intent System, AppearanceSystem negative.”_

### The product and its figure alone, the guide's Product and figure card: currency INR shows ₹, and the amount keeps its grouping as written. The URI stands for the product's logo image, and value for the holding's value.

```tsx
<PortfolioHero
  label="Mutual Funds"
  imageSource={{ uri: 'https://example.com/logos/mutual-funds.png' }}
  value="1,45,230.50"
  currency="INR"
/>
```

_From content: “INR shows ₹; the grouping stays as you write it.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `label` | `string` |  | `"Gold"` |  | types | Product label text displayed next to the avatar. Default "Gold", from the component source. |
| `imageSource` | `ImageSourcePropType \| string` |  |  |  | evidence (2026-10-26) | Without imageSource there is no avatar and no placeholder. Declared: Image source for the product avatar. |
| `value` | `string \| number` |  | `"12,000.11"` |  | types | Monetary value to display. Default "12,000.11", from the component source. |
| `currency` | `string` |  | `"₹"` |  | types | Currency symbol or ISO code. Default "₹", from the component source. |
| `modes` | `Modes` |  |  |  | types | Modes configuration mapped to Figma tokens. |
| `children` | `React.ReactNode` |  |  |  | types | Slot content rendered below the money value (e.g. Badge, subtitle). |
| `topSlot` | `ReactNode` |  |  |  | types | Replaces the Product Label chip when given. `false`, `''` and `null` hide the chip. Omit the prop to keep the default label. |
| `actionSlot` | `ReactNode` |  |  |  | types | Custom control beside the amount. `false`, `''` and `null` hide the action. When omitted, `showAction` or `onActionPress` can still show the default 42 px Neutral Low IconButton. |
| `showAction` | `boolean` |  |  |  | types | Show the default action next to the amount. |
| `onActionPress` | `() => void` |  |  |  | types | Press handler for the default action button. |
| `actionIconName` | `string` |  | `"ic_card"` |  | types | Icon for the default action. Defaults to `ic_card`. Default "ic_card", from the component source. |
| `actionAccessibilityLabel` | `string` |  |  |  | types | Accessible name for the default action. Defaults from `actionIconName` (`ic_card` is "Card"). |
| `actionActive` | `boolean` |  |  |  | types | On/off state of the default toggle. Omit it and the button toggles itself when pressed. Pass it to control the state from outside. |
| `accessibilityLabel` | `string` |  |  |  | evidence (2026-10-27) | With accessibilityLabel the hero is a group named by it; without one the hero does not group its children. Declared: Optional accessible name for the hero region. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Container style override. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Avatar Size` | `mode collection` | L, M, S, XS | `"S"` |  | evidence (2026-10-26) | With imageSource, Avatar Size sets the logo: L 42, M 36, S 29 px or XS 14 px. The hero's default is S, a 29 px logo. Declared: A token collection PortfolioHero reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Badge Size` | `mode collection` | Medium, Small | `"Medium"` |  | types | A token collection PortfolioHero reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection PortfolioHero reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context` | `mode collection` | Default, Nudge&Alert, CTACard, ListItem | `"Default"` |  | types | A token collection PortfolioHero reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 10` | `mode collection` | Default, jioPlus | `"Default"` |  | types | A token collection PortfolioHero reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context2` | `mode collection` | Default, AppBar | `"Default"` |  | types | A token collection PortfolioHero reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context3` | `mode collection` | Default, Transaction Bubble, Balance & Cards, Amount Input | `"Default"` |  | types | A token collection PortfolioHero reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context4` | `mode collection` | Default, Chip, Button, Badge, Badge/glass | `"Default"` |  | types | A token collection PortfolioHero reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection PortfolioHero reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Profile Card Appearance` | `mode collection` | Default, Premium | `"Default"` |  | types | A token collection PortfolioHero reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Slot gap` | `mode collection` | S, M, L, XL, XS | `"S"` |  | types | A token collection PortfolioHero reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Text Sizes` | `mode collection` | Medium, Small, Large | `"Small"` |  | evidence (2026-10-26) | The hero sets Text Sizes Small, so a Text in children is 12 px on a 16 px line (a Text's own default is 14 px). |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types | Slot content rendered below the money value (e.g. Badge, subtitle). |
| `topSlot` | `ReactNode` |  |  |  | types | Replaces the Product Label chip when given. `false`, `''` and `null` hide the chip. Omit the prop to keep the default label. |
| `actionSlot` | `ReactNode` |  |  |  | types | Custom control beside the amount. `false`, `''` and `null` hide the action. When omitted, `showAction` or `onActionPress` can still show the default 42 px Neutral Low IconButton. |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onActionPress` | `() => void` |  |  |  | types | Press handler for the default action button. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- The amount sits on a 44 px line, so the hero is taller than Figma's 159 px (Component Bug #403). _(evidence, 2026-10-28)_
- Figma shows the Jio logo by default; the package shows an avatar only when imageSource is set. _(evidence, 2026-10-28)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `(whole entry)` · human: The Portfolio Hero guide (e7ed622) says it was checked on 28 October 2026 on the 27 October build, the installed v0.1.78-dbe0e02, but that publish changed only the screen-reader sentence (#346); #403's fix to PortfolioHero.tsx (ace46ca, then dbe0e02; blob 8907545 on c8526ae, d1a9deb installed) is not in the guide. Read against the installed source and its tokens through the package's resolver, three guide statements no longer hold, and the entry leaves them out: (1) States “… and it has no action: Figma’s Action Slot, an icon button beside the amount, isn’t in the package.” and Sources “the package has a fixed label and amount, children for the slot, and no action.”: the package now has topSlot, which replaces or hides the product label, and actionSlot, showAction and onActionPress, which put a control beside the amount (by default a 42 px Icon Button toggle, Emphasis Low, AppearanceBrand Neutral, named “Card”), plus actionActive, actionAccessibilityLabel and accessibilityLabel (PortfolioHero.tsx lines 53–78, 160–189, 210–216); the States title “No states of its own” goes with it, since the default action keeps its own on and off state. (2) Configuration “Slot gap spaces them.” and the Slot gap cards (“Slot gap L … 24 px.”): the slot now reads portfolioHero/slotWrap/gap (line 123), which is 8 px in every Slot gap mode, so Slot gap L leaves 8 px between the badge and the note. (3) In context “the hero has no button of its own”: true of the guide's example, not of the package. Also out of date in the evidence: the Contract's slot/gap and Slot gap lines, “No testID, onPress, accessibility props, or top-area slot”, the Discrepancies' Action Slot / Top Slot and “Unused tokens” lines, and the Limits' “Don't imply the hero presses, has an action button, replaces the chip, …, or that screen readers announce the amount” (on dbe0e02 the amount is announced once, #346). #403 is still In progress for its height item alone. The guide changes when #403 is closed and published (the stale sentences are listed in a note on #403); then re-extract. Added by Claude Code in the overnight run agentpack-r24, for Marcin to confirm.
