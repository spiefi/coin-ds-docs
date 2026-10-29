# CcCard

> Coin agent pack 0.1.78+17 (pilot). Generated from `components/cccard.json`; the JSON is the source of truth.

- **State:** flagged (1 flag, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `5170833` · built 2026-10-29T09:06:00Z
- **Category:** card (for discovery only, not a limit on composition) · **Tags:** CcCard, credit card offer, credit card, card offer, card product, joining fee, benefits card
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=cccard) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=5434-1992) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-cccard--docs)

Use a CC Card to sell one credit card: who it’s for, its key benefits, an upsell, and the joining fee, with one action.

## Use when

- **recommended** Sell one credit card: who it's for, its key benefits, an upsell, and the joining fee, with one action.  
  _From summary: “Use a CC Card to sell one credit card: who it’s for, its key benefits, an upsell, and the joining fee, with one action.”_
- **recommended** One card, its benefits, its fee.  
  _From corePrinciple: “One card, its benefits, its fee.”_

## Avoid when

- **discouraged** A card face (the card itself, as someone holds it): the upstream Storybook docs, as the evidence records them, point to Debit Card. Use instead: `DebitCard`.  
  _From evidence: “not for a card face (DebitCard), a product page with metric columns (PdpCcCard), or a plan matrix (PlanComparisonCard).”_
- **discouraged** A product page with metric columns: the upstream Storybook docs, as the evidence records them, point to PDP CC Card. Use instead: `PdpCcCard`.  
  _From evidence: “not for a card face (DebitCard), a product page with metric columns (PdpCcCard), or a plan matrix (PlanComparisonCard).”_
- **discouraged** A plan matrix: the upstream Storybook docs, as the evidence records them, point to Plan Comparison Card. Use instead: `PlanComparisonCard`.  
  _From evidence: “not for a card face (DebitCard), a product page with metric columns (PdpCcCard), or a plan matrix (PlanComparisonCard).”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Badges | badges on the left, trailingBadges on the right. | no | anatomy: “badges on the left, trailingBadges on the right.” |
| Picture | imageSource in an 88 × 54 box; media replaces it. | no | anatomy: “imageSource in an 88 × 54 box; media replaces it.” |
| Title | title in 14 px bold on one line, subtitle under it. | no | anatomy: “title in 14 px bold on one line, subtitle under it.” |
| Benefits | items: one Coin ListItem per benefit, with its icon. | no | anatomy: “items: one Coin ListItem per benefit, with its icon.” |
| Upsell | nudgeSegments after a small avatar. | no | anatomy: “nudgeSegments after a small avatar.” |
| Fee | headline, description, and footerSubtitle. | yes | anatomy: “headline, description, and footerSubtitle.” |
| Action | A small purple Button from buttonLabel. | no | anatomy: “A small purple Button from buttonLabel.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `header` | `ReactNode` | types |
| `media` | `ReactNode` | types |
| `items` | `CcCardListItem` | types |
| `nudge` | `ReactNode` | types |
| `footer` | `ReactNode` | types |
| `button` | `ReactNode` | types |

## Placement

- **recommended** On a screen of card offers, list the cards one under another.  
  _From inContext: “The screen lists the cards on offer, one under another.”_
- **recommended** `Page type` = `SubPage`: On a white page, set Page type SubPage: it gives the card a grey border.  
  _From configuration: “Page type SubPage shows a grey border for white pages”_

## Configuration

- **recommended** `compact` = `false`: The full card, the default, shows every part.  
  _From configuration: “The full card shows every part.”_
- **recommended** `compact` = `true`: Use compact for dense lists: just the picture and the fee.  
  _From configuration: “Just the picture and the fee, for dense lists.”_
- **recommended** `compact` = `true`: compact drops the badges, title, benefits, upsell, and button, so put the card's name in headline.  
  _From configuration: “it drops the badges, title, benefits, upsell, and button, so put the card’s name in headline.”_
- **recommended** `compact` = `true`: In compact, the media slot shows a 42 px Avatar, and the footer has no button.  
  _From fact `/facts/props/0` (compact, source types)_
- **recommended** `media`: media replaces the picture in both the full and the compact card, for example with an Avatar.  
  _From configuration: “media replaces the picture in both, for example with an Avatar as Figma’s compact card does.”_
- **recommended** `showHeader` = `false`: showHeader and showNudge hide the badges and the upsell.  
  _From configuration: “showHeader and showNudge hide the badges and the upsell”_
- **recommended** `showButton` = `false`: showButton hides the button but not its space: the fee stays where it was, and the card is no shorter.  
  _From configuration: “showButton hides the button but not its space.”_
- **recommended** `badges`: Colour badges with their modes, not with colours.  
  _From configuration: “Badges take modes, not colours.”_
- **recommended** `width`: The card is 343 px wide, as in Figma; width sets another number or a percentage of its host.  
  _From sizing: “The card is 343 px wide, as in Figma; width sets another number or a percentage of its host.”_
- **recommended** The height follows the parts you show.  
  _From sizing: “The height follows the parts you show”_
- **recommended** `CcCardListItem.onPress`: A benefit row presses when you give it onPress.  
  _From states: “a benefit row presses when you give it onPress.”_
- **discouraged** `onPress`: Let the Button act or the whole card, not both: a pressable card (onPress) that keeps its button puts a button inside a button.  
  _From states: “Use one or the other: a pressable card that keeps its button puts a button inside a button.”_
- **recommended** `onButtonPress`: Each Apply starts the screen's own application through onButtonPress; the card only lays out the offer.  
  _From inContext: “Each Apply starts the screen’s own application through onButtonPress; the card only lays out the offer.”_

## Content

- **REQUIRED** `title`: Set title yourself on the full card: left out, it shows the sample word “Title” (compact drops the title).  
  _From fact `/facts/props/8` (title, source types)_
- **REQUIRED** `subtitle`: Set subtitle yourself on the full card: left out, it shows the sample word “Subtitle” (compact drops it).  
  _From fact `/facts/props/9` (subtitle, source types)_
- **REQUIRED** `headline`: Set headline yourself: left out, it shows the sample word “Headline”; '' or null hides the line.  
  _From fact `/facts/props/16` (headline, source types)_
- **REQUIRED** `description`: Set description yourself: left out, it shows the sample word “Description”; '' or null hides the line.  
  _From fact `/facts/props/17` (description, source types)_
- **REQUIRED** `footerSubtitle`: Set footerSubtitle yourself: left out, it shows the sample word “Subtitle”; '' or null hides the line.  
  _From fact `/facts/props/18` (footerSubtitle, source types)_
- **REQUIRED** `buttonLabel`: Set buttonLabel whenever the card shows its button: it defaults to “Button”.  
  _From fact `/facts/props/20` (buttonLabel, source types)_
- **REQUIRED** `items`: Set items yourself: left out, the card shows three sample benefit rows.  
  _From fact `/facts/props/11` (items, source evidence)_
- **REQUIRED** `badges`: Set badges, or hide the header with showHeader false: left out, the header shows two sample badges.  
  _From fact `/facts/props/2` (badges, source evidence)_
- **REQUIRED** `nudgeSegments`: Set nudgeSegments, or hide the upsell with showNudge false: left out, it shows the sample “Upsell message JioFinance+”.  
  _From fact `/facts/props/13` (nudgeSegments, source types)_
- **recommended** `title`: Make the title the card's name, short enough for one line, and the subtitle the kind of card.  
  _From content: “Make the title the card’s name, short enough for one line, and the subtitle the kind of card.”_
- **recommended** `items`: Give each benefit one fact.  
  _From content: “Give each benefit one fact.”_
- **recommended** `headline`: Put the fee label in headline, the amount in description, and the billing note in footerSubtitle.  
  _From content: “Put the fee label in headline, the amount in description, and the billing note in footerSubtitle.”_
- **recommended** `buttonLabel`: Label the button with a verb, such as Apply.  
  _From content: “Label the button with a verb, such as Apply.”_
- **recommended** Replace every sample: each line should say something about this card.  
  _From doDont: “Each line says something about this card.”_
- **recommended** `headline`: In compact, headline carries the card's name, which the title can't show.  
  _From doDont: “headline carries the name the title can’t show.”_

Good: “JioFinance Gold Credit Card”, “Rewards on gold and every spend”, “5% back as JioPoints on gold”, “Joining fee”, “₹499”, “+ GST”, “Apply”

Bad: “Headline”, “Description”, “Subtitle”

## States

| State | When | From |
| --- | --- | --- |
| Button acts | The default: the card isn't pressable; its Apply button is, and a benefit row presses when you give it onPress. | states: “The card isn’t pressable: its Apply button is, and a benefit row presses when you give it onPress.” |
| Whole card | onPress set: the whole card is one button, named by its title. Use it without the card's own button (showButton false). | states: “onPress makes the whole card one button, named by its title.” |
| Disabled, selected, loading | Not available: the card has no disabled, selected, or loading state. | states: “The card has no disabled, selected, or loading state.” |

## Accessibility

- **recommended** `onPress`: With onPress, the whole card is one button, named by its title.  
  _From states: “onPress makes the whole card one button, named by its title.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Replace every sample | Leave the footer empty | Headline, Description, and Subtitle show as written. |
| Show the card | Leave out the picture | The picture says what’s on offer. |
| Name the card in compact | Compact with the full card’s text | The title disappears, so only the fee is left. |

## Examples

### Card offers on the Cards screen, the guide's In context: a title, then two full cards one under another, each with its picture, name, benefits and fee; the first adds a trailing badge and an upsell, the second hides the upsell. Each Apply starts the screen's own application through onButtonPress (the empty handlers stand for that wiring). Badges take their colours as modes, as the guide sets them; the upsell's last run is brand-coloured as in the package's own sample. The require() paths stand for the app's own pictures.

```tsx
<VStack>
  <Title title="Cards for you" subtitle="Pre-approved offers" />
  <CcCard
    imageSource={require('./credit-card.png')}
    title="JioFinance Gold Credit Card"
    subtitle="Rewards on gold and every spend"
    badges={[{ label: 'Pre-approved', modes: { AppearanceBrand: 'Tertiary' } }]}
    trailingBadges={[{ label: 'Lifetime free', modes: { AppearanceBrand: 'Secondary' } }]}
    items={[
      { icon: 'ic_rupee_coin', title: '5% back as JioPoints on gold' },
      { icon: 'ic_flight_mode', title: '4 airport lounge visits a year' },
      { icon: 'ic_gift', title: 'No annual fee in the first year' },
    ]}
    nudgeSegments={[{ text: 'Get 2x JioPoints with ' }, { text: 'JioFinance+', modes: { 'Text Appearance': 'Primary' } }]}
    nudgeAvatarSource={require('./jiofinance-logo.png')}
    headline="Joining fee"
    description="₹499"
    footerSubtitle="+ GST"
    buttonLabel="Apply"
    onButtonPress={() => {}}
  />
  <CcCard
    imageSource={require('./credit-card.png')}
    title="JioFinance Everyday Credit Card"
    subtitle="Cashback on bills and groceries"
    badges={[{ label: 'Pre-approved', modes: { AppearanceBrand: 'Tertiary' } }]}
    items={[
      { icon: 'ic_voucher_cashback', title: '2% cashback on bills' },
      { icon: 'ic_wallet', title: '1% cashback on everything else' },
    ]}
    showNudge={false}
    headline="Joining fee"
    description="₹0"
    footerSubtitle="Lifetime free"
    buttonLabel="Apply"
    onButtonPress={() => {}}
  />
</VStack>
```

_From inContext: “The screen lists the cards on offer, one under another.”_

### Compact with an Avatar, as in Figma, for a dense list: a round mark over the fee, with the card's name in headline because compact drops the title. The require() path stands for the app's own logo.

```tsx
<CcCard
  compact
  media={<Avatar imageSource={require('./jiofinance-logo.png')} />}
  headline="JioFinance Gold Credit Card"
  description="₹499"
  footerSubtitle="Joining fee"
/>
```

_From configuration: “media replaces the picture in both, for example with an Avatar as Figma’s compact card does.”_

### The whole card as one button, named by its title, the guide's Whole card state: onPress is set and the card's own button is hidden, so there is no button inside a button. The empty handler stands for the screen's own navigation.

```tsx
<CcCard
  imageSource={require('./credit-card.png')}
  title="JioFinance Gold Credit Card"
  subtitle="Rewards on gold and every spend"
  badges={[{ label: 'Pre-approved', modes: { AppearanceBrand: 'Tertiary' } }]}
  items={[
    { icon: 'ic_rupee_coin', title: '5% back as JioPoints on gold' },
    { icon: 'ic_flight_mode', title: '4 airport lounge visits a year' },
  ]}
  showNudge={false}
  headline="Joining fee"
  description="₹499"
  footerSubtitle="+ GST"
  showButton={false}
  onPress={() => {}}
/>
```

_From states: “onPress makes the whole card one button, named by its title.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `compact` | `boolean` |  | `false` |  | types | Compact variant. Renders a 42 px Avatar (Figma) in the media slot and the footer **without** its CTA button. Drops the product title/subtitle, header, list, and nudge — see the MDX. Mirrors the Figma `compact` property. Default false, from the component source. |
| `showHeader` | `boolean` |  | `true` |  | types | Toggles the header badge row. Defaults to `true`. Default true, from the component source. |
| `badges` | `CcCardBadge[]` |  |  |  | evidence (2026-10-21) | Left out, the header shows two sample Tertiary badges. Declared: Leading (left) badge group. |
| `trailingBadges` | `CcCardBadge[]` |  |  |  | types | Trailing (right-aligned) badge group. |
| `header` | `React.ReactNode` |  |  |  | types | Full override for the header. Takes precedence over `badges`/`trailingBadges`. |
| `imageSource` | `ImageSourcePropType \| string` |  |  |  | types | Image source for the default media slot. Accepts a URL string or any RN `ImageSourcePropType`. Ignored when `media` is provided. |
| `imageWidth` | `number` |  | `88` |  | types | Default media image width. Defaults to the Figma spec (`88`). Default 88, from the component source. |
| `imageHeight` | `number` |  | `54` |  | types | Default media image height. Defaults to the Figma spec (`54`). Default 54, from the component source. |
| `title` | `string` |  | `"Title"` |  | types | Product title rendered next to the media slot (non-compact only). Default "Title", from the component source. |
| `subtitle` | `string` |  | `"Subtitle"` |  | types | Product subtitle rendered below the title (non-compact only). Default "Subtitle", from the component source. |
| `media` | `React.ReactNode` |  |  |  | types | Full override for the media slot's visual. Whatever you pass here is rendered **in both the compact and non-compact variants** — e.g. pass an `Avatar` and it stays an avatar in both, pass an `Image` and it stays an image in both. `modes` cascade into it automatically. Defaults to an `Image` driven by `imageSource`. |
| `items` | `CcCardListItem[]` |  |  |  | evidence (2026-10-21) | A row's icon: null hides its glyph; a row's onPress makes it a button; items={[]} removes the list. Declared: Benefit rows rendered in the list. Defaults to three sample rows. |
| `showNudge` | `boolean` |  | `true` |  | types | Toggles the upsell nudge row. Defaults to `true`. Default true, from the component source. |
| `nudgeSegments` | `TextSegmentRun[]` |  |  |  | types | Declarative content for the nudge's inline text. Defaults to a sample "Upsell message JioFinance+" string with the last run brand-coloured. |
| `nudgeAvatarSource` | `ImageSourcePropType \| string` |  |  |  | types | Avatar image source shown at the start of the nudge row. |
| `nudge` | `React.ReactNode` |  |  |  | types | Full override for the nudge row. Takes precedence over the declarative props. |
| `headline` | `string \| null` |  |  |  | types | Small muted label above the footer title (`ccCard/headline/*`). Omit for the sample "Headline". Pass `''` or `null` to hide the line. |
| `description` | `string \| null` |  |  |  | types | Bold footer value (`ccCard/title/*`). Omit for the sample "Description". Pass `''` or `null` to hide the line. |
| `footerSubtitle` | `string \| null` |  |  |  | types | Muted caption rendered inline after the description (`ccCard/subtitle/*`). Omit for the sample "Subtitle". Pass `''` or `null` to hide the line. |
| `footer` | `React.ReactNode` |  |  |  | types | Full override for the footer text block. |
| `buttonLabel` | `string` |  | `"Button"` |  | types | CTA button label. Defaults to `"Button"`. Default "Button", from the component source. |
| `onButtonPress` | `() => void` |  |  |  | types | CTA press handler. |
| `button` | `React.ReactNode` |  |  |  | types | Full override for the CTA. Takes precedence over `buttonLabel`. |
| `showButton` | `boolean` |  | `true` |  | evidence (2026-10-21) | Hiding the button doesn't change the card's height. Declared: Toggles the CTA button (non-compact). Defaults to `true`. Default true, from the component source. |
| `onPress` | `() => void` |  |  |  | evidence (2026-10-21) | Makes the card a Pressable named by accessibilityLabel or, without one, its title, slightly dimmed while pressed; with the Apply button kept, that nests a button in a button. There is no disabled. Declared: Press handler for the whole card. When set, the card becomes pressable. |
| `width` | `number \| ˋ${number}%ˋ` |  | `343` |  | types | Card width. Defaults to the Figma spec (`343`). Pass `'100%'` to fill the parent. Default 343, from the component source. |
| `modes` | `Modes` |  |  |  | types | Modes object for design-token resolution. Cascaded to all children. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Style overrides for the card container. |
| `accessibilityLabel` | `string` |  |  |  | types | Accessibility label for the card. |
| `CcCardListItem.icon` | `string \| null` |  |  |  | types | Registry icon name for the leading glyph. Defaults to `'ic_card'`. Pass `null` to omit the leading icon. A field of each items row. |
| `CcCardListItem.iconColor` | `string` |  |  |  | types | Per-row override for the leading icon color. A field of each items row. |
| `CcCardListItem.leading` | `React.ReactNode` |  |  |  | types | Full override for the leading node. Takes precedence over `icon`. A field of each items row. |
| `CcCardListItem.title` | `string` |  |  | yes | types | Row title (e.g. `"4 domestic + 2 intl. lounge access yearly"`). A field of each items row. |
| `CcCardListItem.onPress` | `() => void` |  |  |  | types | Makes the row pressable. A field of each items row. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Primary"` |  | types | A token collection CcCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `AppearanceSystem` | `mode collection` | positive, warning, negative | `"positive"` |  | types | A token collection CcCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Avatar Size` | `mode collection` | L, M, S, XS | `"L"` |  | types | A token collection CcCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Badge Size` | `mode collection` | Medium, Small | `"Medium"` |  | types | A token collection CcCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / Size` | `mode collection` | M, S, XS | `"M"` |  | types | A token collection CcCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / State` | `mode collection` | Idle, Hover, Pressed, Disabled | `"Idle"` |  | types | A token collection CcCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection CcCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context` | `mode collection` | Default, Nudge&Alert, CTACard, ListItem | `"Default"` |  | types | A token collection CcCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 10` | `mode collection` | Default, jioPlus | `"Default"` |  | types | A token collection CcCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 8` | `mode collection` | Default, Section | `"Default"` |  | types | A token collection CcCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context2` | `mode collection` | Default, AppBar | `"Default"` |  | types | A token collection CcCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context4` | `mode collection` | Default, Chip, Button, Badge, Badge/glass | `"Default"` |  | types | A token collection CcCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context5` | `mode collection` | Default, Fullscreen Modal, Mode 1 | `"Default"` |  | types | A token collection CcCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context7` | `mode collection` | Default, Card, Page Hero | `"Default"` |  | types | A token collection CcCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Draggable List` | `mode collection` | default, onDrag | `"default"` |  | types | A token collection CcCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Emphasis` | `mode collection` | High, Medium, Low | `"High"` |  | types | A token collection CcCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Icon Size` | `mode collection` | Medium, Small | `"Medium"` |  | types | A token collection CcCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `List Item Style` | `mode collection` | Default, Boxed, Minimal | `"Default"` |  | types | A token collection CcCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `ListItem State` | `mode collection` | Idle, Active | `"Idle"` |  | types | A token collection CcCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `NavArrow Direction` | `mode collection` | Left&Right, Top&Bottom | `"Left&Right"` |  | types | A token collection CcCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | evidence (2026-10-21) | On the card, only the border colour changes: white by default, so it doesn't show, and grey with Page type SubPage. Declared: A token collection CcCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Profile Card Appearance` | `mode collection` | Default, Premium | `"Default"` |  | types | A token collection CcCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Radius` | `mode collection` | S, M, L, None | `"S"` |  | types | A token collection CcCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Selectable` | `mode collection` | False, True | `"False"` |  | types | A token collection CcCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Semantic Intent` | `mode collection` | Brand, System | `"Brand"` |  | types | A token collection CcCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Text Appearance` | `mode collection` | Neutral, Primary, Secondary, Tertiary, Success, Warning, Error | `"Neutral"` |  | types | A token collection CcCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Text Sizes` | `mode collection` | Medium, Small, Large | `"Medium"` |  | types | A token collection CcCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Weight` | `mode collection` | Medium, Regular, Bold | `"Medium"` |  | types | A token collection CcCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `header` | `React.ReactNode` |  |  |  | types | Full override for the header. Takes precedence over `badges`/`trailingBadges`. |
| `media` | `React.ReactNode` |  |  |  | types | Full override for the media slot's visual. Whatever you pass here is rendered **in both the compact and non-compact variants** — e.g. pass an `Avatar` and it stays an avatar in both, pass an `Image` and it stays an image in both. `modes` cascade into it automatically. Defaults to an `Image` driven by `imageSource`. |
| `items` | `CcCardListItem[]` |  |  |  | types | A structured slot: an array of CcCardListItem rows. Benefit rows rendered in the list. Defaults to three sample rows. |
| `nudge` | `React.ReactNode` |  |  |  | types | Full override for the nudge row. Takes precedence over the declarative props. |
| `footer` | `React.ReactNode` |  |  |  | types | Full override for the footer text block. |
| `button` | `React.ReactNode` |  |  |  | types | Full override for the CTA. Takes precedence over `buttonLabel`. |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onButtonPress` | `() => void` |  |  |  | types | CTA press handler. |
| `onPress` | `() => void` |  |  |  | types | Press handler for the whole card. When set, the card becomes pressable. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- Every published Storybook story renders the card as a pressable button with Apply inside it, and the published page is the older generated one. _(evidence, 2026-10-21)_
- The picture's corners are 8 px round, where Figma's are square. _(evidence, 2026-10-21)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `(whole entry)` · human: The guide and its evidence were checked on 21 October on 0.1.78-c7d3348 and not re-checked on the installed build, dbe0e02, which changed CcCard for #364: badges are Small and benefit icons purple by default, benefits sit 4 px apart, the upsell is a 12 px line, compact shows a 42 px Avatar (the image in a circle, or a “CC” monogram), the full card shows no picture box without imageSource, '' or null hides a footer line, showHeader and showNudge also hide a custom header or upsell, and the full card is 343 × 244. This entry follows the installed package and leaves out the guide sentences dbe0e02 contradicts: Sizing “and 12 px between benefits” and “It comes out taller than Figma’s, because its badges are bigger and its benefits further apart.”; Configuration “AppearanceBrand Secondary turns the benefit icons purple”, “Badge Size Small makes the badges smaller”, their example captions and “Without the badges, 31 px shorter.” (24 px now); the Don’t caption “An empty box still takes its space beside the title.”; Content “an empty headline, description, or footerSubtitle shows its placeholder word”; and the Sources note’s 264 px, Medium badges, 12 px benefits, gold icons, 14 px upsell, 88 × 54 compact picture and hard-coded badge label colour. The guide fix belongs to #364 (open; a work note there lists these sentences). Re-extract once #364 is closed and the guide is re-checked on dbe0e02 and published. Added by Claude Code in the overnight run agentpack-batch11, for Marcin to confirm.
