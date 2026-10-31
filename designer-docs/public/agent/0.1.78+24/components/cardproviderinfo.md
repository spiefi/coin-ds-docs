# CardProviderInfo

> Coin agent pack 0.1.78+24 (pilot). Generated from `components/cardproviderinfo.json`; the JSON is the source of truth.

- **State:** documented
- **Package:** jfs-components 0.1.78 · guide commit `4a044e7` · built 2026-10-31T02:32:56Z
- **Category:** card (for discovery only, not a limit on composition) · **Tags:** provider card, seller info, vault info, stats card, product provider, trust facts
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=cardproviderinfo) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2916-9155) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-cardproviderinfo--docs)

Use a Card Provider Info to introduce who provides a product, with their logo and a few short facts in two columns.

## Use when

- **recommended** Introduce who provides a product: their logo and a few short facts in two columns.  
  _From summary: “Use a Card Provider Info to introduce who provides a product, with their logo and a few short facts in two columns.”_
- **recommended** Who provides it, and why to trust them.  
  _From corePrinciple: “Who provides it, and why to trust them.”_
- **recommended** A seller or vault on a product page: a provider header and two to six facts, as the card’s handwritten Storybook docs (upstream, not the published page) say in the evidence’s record.  
  _From evidence: “a provider header plus facts for a seller or vault on a product page, two to six facts”_

## Avoid when

- **discouraged** A person: the card’s handwritten Storybook docs, as the evidence records them, use Profile Card. Use instead: `ProfileCard`.  
  _From evidence: “not a person (ProfileCard) or bank account”_
- **discouraged** A bank account: the card’s handwritten Storybook docs, as the evidence records them, say the card is not for one.  
  _From evidence: “not a person (ProfileCard) or bank account”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Avatar | imageSource in a round 29 px Avatar, as in Figma; showAvatar={false} hides it. | no | anatomy: “imageSource in a round 29 px Avatar, as in Figma; showAvatar={false} hides it.” |
| Label | label names the provider in 16 px bold. | yes | anatomy: “label names the provider in 16 px bold.” |
| Fact | A StatItem child: a 12 px label over a 26 px value. | no | anatomy: “A StatItem child: a 12 px label over a 26 px value.” |
| Grid | Children sit two to a row, 8 px apart. | no | anatomy: “Children sit two to a row, 8 px apart, each half the width.” |
| Card | 16 px corners and 20 px padding; AppearanceBrand sets the fill. | yes | anatomy: “16 px corners and 20 px padding; AppearanceBrand sets the fill.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `children` | `ReactNode` | types |

## Placement

- **recommended** On a product page, for its seller or vault, as the card’s handwritten Storybook docs say in the evidence’s record.  
  _From evidence: “a provider header plus facts for a seller or vault on a product page”_
- **recommended** The screen supplies the provider’s logo, name and facts.  
  _From inContext: “The screen supplies the provider’s logo, name, and facts.”_
- **recommended** A screen action such as Buy is the screen’s own, not the card’s: on the guide’s Buy Gold screen the Buy Button sits below the card.  
  _From inContext: “the Buy button below is the screen’s own action.”_

## Configuration

- **recommended** `children`: The facts go in children as StatItem components: a small label over a large value.  
  _From anatomy: “The facts are StatItem components: a small label over a large value.”_
- **recommended** `children`: The card puts the provider’s logo and name on top, then lays its children out two to a row.  
  _From anatomy: “A rounded card puts the provider’s logo and name on top, then lays its children out two to a row.”_
- **discouraged** `children`: Don’t put a ProductLabel in children: the card builds its header from label and imageSource, and a child ProductLabel lands in the grid.  
  _From evidence: “code builds the header from `label` and `imageSource` (a child ProductLabel would land in the grid)”_
- **recommended** `imageSource`: Pass the provider’s logo in imageSource: without it the header shows the name alone.  
  _From sources: “The header comes from label and imageSource: without imageSource it shows the name alone”_
- **recommended** `AppearanceBrand`: AppearanceBrand sets the card’s fill: Primary cream by default, Secondary lilac, and Neutral or Tertiary white with a light border.  
  _From configuration: “AppearanceBrand sets the card’s fill: Primary cream by default, Secondary lilac, and Neutral or Tertiary white with a light border.”_
- **recommended** `AppearanceBrand` = `Primary`: AppearanceBrand Primary, the default: a cream card, as in Figma.  
  _From configuration: “The default: a cream card, as in Figma.”_
- **recommended** `AppearanceBrand` = `Secondary`: AppearanceBrand Secondary: a lilac card.  
  _From configuration: “A lilac card.”_
- **recommended** `AppearanceBrand` = `Neutral`: AppearanceBrand Neutral: white with a light border; Tertiary looks the same.  
  _From configuration: “White with a light border; Tertiary looks the same.”_
- **recommended** `AppearanceBrand`: AppearanceBrand leaves the label and the facts their colour.  
  _From configuration: “The label and the facts stay the same colour.”_
- **recommended** `Avatar Size`: The logo is 29 px by default, Figma’s size; Avatar Size L makes it 42 px.  
  _From configuration: “The logo is Figma’s 29 px; Avatar Size L makes it 42 px, and showAvatar={false} hides it.”_
- **recommended** `Avatar Size` = `L`: Avatar Size L: a larger 42 px logo.  
  _From configuration: “A larger 42 px logo.”_
- **recommended** `showAvatar` = `false`: showAvatar={false} hides the logo.  
  _From configuration: “The logo is Figma’s 29 px; Avatar Size L makes it 42 px, and showAvatar={false} hides it.”_
- **recommended** `showAvatar`: Figma’s Product Label can hide the avatar; in code showAvatar does the same.  
  _From sources: “its Product Label can hide the avatar, and in code showAvatar does the same.”_
- **recommended** `onPress`: Without onPress the card shows facts and does nothing when tapped.  
  _From states: “The card shows facts and does nothing when tapped.”_
- **recommended** `onPress`: With onPress the whole card is one button.  
  _From fact `/facts/props/6` (onPress, source evidence)_
- **discouraged** `onPress`: Don’t put buttons among the facts of a pressable card.  
  _From states: “Don’t put buttons among the facts of a pressable card.”_
- **recommended** The card fills its host’s width; Figma draws it at 342 px.  
  _From sizing: “The card fills its host’s width; Figma draws it at 342 px.”_
- **recommended** 20 px padding, 20 px between the header and the facts, and 8 px between facts.  
  _From sizing: “It has 20 px padding and 20 px between the header and the facts, and each fact takes half the width with 8 px between them.”_
- **recommended** Height follows the content: 199 px with four facts and the 29 px logo.  
  _From sizing: “Height follows the content: 199 px with four facts and the 29 px logo.”_

## Content

- **recommended** `label`: Set label: left out, the card shows “Gold”.  
  _From fact `/facts/props/0` (label, source types)_
- **recommended** `label`: Put the provider’s name in label.  
  _From content: “Put the provider’s name in label.”_
- **recommended** `children`: Give each fact a short noun phrase for its label and the figure for its value.  
  _From content: “Give each fact a short noun phrase for its label and the figure for its value”_
- **recommended** `children`: Values are large and heavy, so keep them to a few characters.  
  _From content: “values are large and heavy, so keep them to a few characters.”_
- **recommended** `children`: Two to six facts, in pairs, read best.  
  _From content: “Two to six facts, in pairs, read best.”_
- **discouraged** `children`: Don’t write sentences as values: “Over one million” wraps and crowds the row.  
  _From doDont: ““Over one million” wraps and crowds the row.”_
- **discouraged** `children`: Don’t leave one fact alone: three facts leave a gap beside the last.  
  _From doDont: “Three facts leave a gap beside the last.”_

Good: “Gold”, “Purity verified by NABL”, “99.99%”, “Customers served”, “1M+”

Bad: “Over one million”, “In the year 2017”

## States

| State | When | From |
| --- | --- | --- |
| Facts only | The default, without onPress: nothing to press. | states: “The default: nothing to press.” |
| Pressable | With onPress the whole card is one button and looks the same. | states: “The whole card is one button and looks the same.” |
| Pressed | A pressable card doesn’t change its look when pressed. | states: “it doesn’t change its look when pressed” |
| Disabled | With onPress and disabled set, presses stop and the card looks the same. | states: “disabled only stops presses.” |

## Accessibility

- **recommended** `accessibilityLabel`: A pressable card is one button, named by accessibilityLabel, or else by label.  
  _From states: “onPress makes the whole card one button, named by accessibilityLabel or label”_
- **recommended** `disabled`: disabled stops a pressable card’s presses.  
  _From fact `/facts/props/7` (disabled, source types)_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Keep values short | Write sentences as values | “Over one million” wraps and crowds the row. |
| Pass the provider’s logo | Leave out imageSource | The name stands alone, with nothing to show who provides it. |
| Pair the facts | Leave one fact alone | Three facts leave a gap beside the last. |

## Examples

### The provider on the Buy Gold screen, the guide’s In context: a Title, the Card Provider Info with the provider’s name and logo, and the screen’s own Buy Button below it. The URI stands for the provider’s logo, and onPress for the screen starting the purchase. The guide’s card has four facts as StatItem children; StatItem has no entry in this pack, so they are left out and the card shows its header alone: report that the facts need StatItem.

```tsx
<VStack>
  <Title title="Buy gold" subtitle="24K, stored in an insured vault" />
  <CardProviderInfo
    label="Gold"
    imageSource={{ uri: 'https://example.com/jio-gold-logo.png' }}
  />
  <Button label="Buy gold" onPress={() => {}} />
</VStack>
```

_From inContext: “The screen supplies the provider’s logo, name, and facts.”_

### A pressable card, the guide’s Pressable: onPress makes the whole card one button that looks the same as the default, named by accessibilityLabel or else by label. The accessibilityLabel is the one the guide’s code gives its Pressable card (the rendered copy doesn’t show it). onPress stands for the screen’s response to the press, and the URI for the provider’s logo. The facts (StatItem children) are left out, as above.

```tsx
<CardProviderInfo
  label="Gold"
  imageSource={{ uri: 'https://example.com/jio-gold-logo.png' }}
  accessibilityLabel="Gold, by Jio. Open provider details"
  onPress={() => {}}
/>
```

_From states: “The whole card is one button and looks the same.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `label` | `string` |  | `"Gold"` |  | types | Product name shown in the ProductLabel header. Default "Gold", from the component source. |
| `imageSource` | `ImageSourcePropType \| string` |  |  |  | types | Image source for the product avatar. Omit to show the label without a portrait. |
| `showAvatar` | `boolean` |  |  |  | evidence (2026-10-19) | showAvatar={true} with no imageSource shows a plain neutral 29 px circle, not a picture; left unset, no imageSource means no avatar. Declared: Show the header avatar. Defaults to on only when `imageSource` is set. Pass `false` to hide an avatar that has an image. |
| `children` | `React.ReactNode` |  |  |  | evidence (2026-10-19) | Children get the card’s modes and sit two per row, each in an equal cell. Declared: Slot content — typically StatItem components arranged in a 2-column grid. |
| `modes` | `Modes` |  |  |  | types | Design token modes for theming. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Override container styles. |
| `onPress` | `() => void` |  |  |  | evidence (2026-10-19) | With onPress the card is a Pressable with role button, named accessibilityLabel, or else label; it has no pressed, hover or disabled look. Declared: Press handler for the whole card. When set, the card becomes pressable (rendered through a `Pressable` with `accessibilityRole="button"`). |
| `disabled` | `boolean` |  |  |  | types | Disable interaction when `onPress` is set. |
| `accessibilityLabel` | `string` |  |  |  | types | Accessibility label forwarded to the pressable wrapper (defaults to `label`). |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Primary"` |  | types | A token collection CardProviderInfo reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Avatar Size` | `mode collection` | L, M, S, XS | `"S"` |  | evidence (2026-10-19) | The card’s header (ProductLabel) sets Avatar Size S unless modes set one, so the logo is 29 px, Figma’s size; L is 42, M 36, XS 14. Declared: A token collection CardProviderInfo reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Badge Size` | `mode collection` | Medium, Small | `"Medium"` |  | types | A token collection CardProviderInfo reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection CardProviderInfo reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 10` | `mode collection` | Default, jioPlus | `"Default"` |  | types | A token collection CardProviderInfo reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context2` | `mode collection` | Default, AppBar | `"Default"` |  | types | A token collection CardProviderInfo reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context4` | `mode collection` | Default, Chip, Button, Badge, Badge/glass | `"Default"` |  | types | A token collection CardProviderInfo reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection CardProviderInfo reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Profile Card Appearance` | `mode collection` | Default, Premium | `"Default"` |  | types | A token collection CardProviderInfo reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types | Slot content — typically StatItem components arranged in a 2-column grid. |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onPress` | `() => void` |  |  |  | types | Press handler for the whole card. When set, the card becomes pressable (rendered through a `Pressable` with `accessibilityRole="button"`). |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- Fact rows are 50 px in code and 44 in Figma. _(evidence, 2026-10-19)_
- Figma and Code Connect put the Product Label in as a child; in code the header comes from label and imageSource, and a child ProductLabel lands in the grid. _(evidence, 2026-10-19)_
- The published Storybook still shows the older build, with a placeholder portrait, and the older generated page. _(evidence, 2026-10-19)_

## Flags

_None._
