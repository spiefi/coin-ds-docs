# BenefitCard

> Coin agent pack 0.1.78+23 (pilot). Generated from `components/benefitcard.json`; the JSON is the source of truth.

- **State:** flagged (2 flags, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `622cd82` · built 2026-10-31T01:50:12Z
- **Category:** card (for discovery only, not a limit on composition) · **Tags:** benefits card, plan benefits, rewards card, upgrade card, perks, membership
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=benefitcard) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=5352-1077) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-benefitcard--docs)

Use a Benefit Card to list what a plan or offer gives, with an optional upsell and one button to upgrade.

## Use when

- **recommended** List what a plan or offer gives, with an optional upsell and one button to upgrade.  
  _From summary: “Use a Benefit Card to list what a plan or offer gives, with an optional upsell and one button to upgrade.”_

## Avoid when

_None in the guide._

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Header title | headerTitle at 12 px, a label for the rows below it. | no | anatomy: “headerTitle at 12 px, a label for the rows below it.” |
| Earnings row | A headerItems row: an icon, a short title, and the figure on the right. | no | anatomy: “A headerItems row: an icon, a short title, and the figure on the right.” |
| Divider | Separates what you earn from what the plan includes; goes with the header. | no | anatomy: “Separates what you earn from what the plan includes.” |
| Upsell | The bodyHeader slot: a Nudge by default, with no Close; bodyHeader replaces or removes it. | no | anatomy: “A Nudge by default, with no Close; bodyHeader replaces or removes it.” |
| Benefit row | An items row: an icon and a short perk. | yes | anatomy: “An items row: an icon and a short perk.” |
| Button | The call to action: buttonLabel and onButtonPress; showButton hides it. | no | anatomy: “buttonLabel and onButtonPress; showButton hides it.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `headerItems` | `BenefitCardItem` | types |
| `header` | `ReactNode` | types |
| `bodyHeader` | `ReactNode` | types |
| `items` | `BenefitCardItem` | types |
| `children` | `ReactNode` | types |
| `button` | `ReactNode` | types |

## Placement

- **recommended** `width`: The card is 344 px wide by default; to fill its container, set width to '100%'.  
  _From sizing: “It's 344 px wide unless you set width to another number or a percentage, such as 100% to fill its container.”_
- **recommended** `onButtonPress`: Let the screen own the next step through onButtonPress; the card doesn't act on its own.  
  _From inContext: “The card doesn't act on its own.”_

## Configuration

- **REQUIRED** `items`: Pass your own rows (headerItems and items, or the header and children slots) whenever those sections show: the default rows repeat one placeholder.  
  _From sources: “Its default rows repeat one placeholder, so always pass your own.”_
- **recommended** `showHeader` = `false`: Set showHeader false to drop the header title, its rows and the divider together.  
  _From configuration: “showHeader drops the title, its rows, and the divider”_
- **recommended** `bodyHeader` = `null`: Set bodyHeader to null to remove the upsell, or pass a node to replace it.  
  _From configuration: “bodyHeader set to null removes the upsell”_
- **REQUIRED** `showButton` = `false`: To hide the button, set showButton false; button={null} still renders the default button.  
  _From fact `/facts/props/11` (button, source evidence)_
- **recommended** `AppearanceBrand`: Use AppearanceBrand to recolour the icons, the upsell and the button together; the card stays white.  
  _From configuration: “AppearanceBrand recolours the icons, the upsell, and the button together; the card stays white.”_
- **recommended** `modes`: Set modes once on the card: they cascade to its rows, icons, upsell and button.  
  _From fact `/facts/props/15` (modes, source evidence)_

## Content

- **recommended** Show what people get, then one way to get it.  
  _From corePrinciple: “Show what people get, then one way to get it.”_
- **recommended** `headerTitle`: Write the header title as a label, such as “You will earn”.  
  _From content: “Write the header title as a label, such as “You will earn”.”_
- **recommended** `BenefitCardItem.title`: Keep each row title to a short noun phrase, one benefit per row.  
  _From content: “Keep each row to a short noun phrase”_
- **recommended** `BenefitCardItem.trailingText`: Put a row's figure in trailingText, where the figures line up on the right, not in its title.  
  _From content: “put its number in trailingText, where the figures line up on the right.”_
- **discouraged** `BenefitCardItem.title`: Do not write a sentence as a row title: a long title is cut off, and the benefit with it.  
  _From doDont: “A long title is cut off, and the benefit with it.”_
- **recommended** `buttonLabel`: Label the button with a verb, such as “Upgrade”.  
  _From content: “Label the button with a verb, such as “Upgrade”.”_

Good: “You will earn”, “JioPoints”, “Up to 2000 pts”, “Zero forex markup on cards”, “Priority support, 24/7”, “Upgrade”

Bad: “Pay abroad with any of your cards and get zero forex markup”, “Up to 2000 JioPoints”, “Up to ₹5000 cashback”

## States

| State | When | From |
| --- | --- | --- |
| Default | The card has no state of its own; only its button acts, through onButtonPress, with Button's states. | states: “The card has no state of its own: only its button acts, through onButtonPress, with Button's usual states.” |
| Without the button | showButton false: a summary of the plan. | states: “showButton off: a summary of the plan.” |
| Pressable card | onPress set: the header becomes a button named by its title, and pressing the header or the lists dims them and calls onPress; the upsell and the card's button stay separate buttons. | states: “onPress makes the header a button named by its title, and pressing the header or the lists dims them and calls it; the upsell and the card’s button stay separate buttons beside it.” |

## Accessibility

_None in the guide._

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Keep each perk short | Write a sentence as a row | A long title is cut off, and the benefit with it. |
| Put the figure in trailingText | Put the figure in the title | The amounts are buried in the text. |

## Examples

### A plan card with its own earnings rows, perks and an upgrade button.

```tsx
<BenefitCard
  headerTitle="You will earn"
  headerItems={[
    { icon: 'ic_jewellery_diamond', title: 'JioPoints', trailingText: 'Up to 2000 pts' },
    { icon: 'ic_offer', title: 'Cashback', trailingText: 'Up to ₹5000' },
  ]}
  items={[
    { icon: 'ic_card', title: 'Zero forex markup on cards' },
    { icon: 'ic_support', title: 'Priority support, 24/7' },
  ]}
  buttonLabel="Upgrade"
  onButtonPress={() => {}}
  modes={{ 'Color Mode': 'Light' }}
/>
```

_From content: ““JioPoints” with “Up to 2000 pts”, two perks, and “Upgrade”.”_

### Full width on a plan screen, without the upsell, in one brand.

```tsx
<BenefitCard
  width="100%"
  bodyHeader={null}
  headerItems={[{ icon: 'ic_offer', title: 'Cashback', trailingText: 'Up to ₹5000' }]}
  items={[{ icon: 'ic_support', title: 'Priority support, 24/7' }]}
  onButtonPress={() => {}}
  modes={{ 'Color Mode': 'Light', AppearanceBrand: 'Tertiary' }}
/>
```

_From configuration: “bodyHeader set to null closes the gap between the lists.”_

### A summary of the plan: no header and no button.

```tsx
<BenefitCard
  showHeader={false}
  showButton={false}
  items={[
    { icon: 'ic_card', title: 'Zero forex markup on cards' },
    { icon: 'ic_support', title: 'Priority support, 24/7' },
  ]}
  modes={{ 'Color Mode': 'Light' }}
/>
```

_From states: “showButton off: a summary of the plan.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `headerTitle` | `string` |  | `"You will earn"` |  | types | Header section title (e.g. `"You will earn"`). Default "You will earn", from the component source. |
| `headerItem` | `BenefitCardItem` |  |  |  | types | Deprecated: The header is now a multi-row list wrap. A single item still works and is rendered as a one-row list (lowest precedence, after `header` and `headerItems`). Prefer `headerItems` (declarative) or `header` (slot). |
| `headerItems` | `BenefitCardItem[]` |  |  |  | evidence (2026-10-13) | Defaults to two duplicate JioPoints rows, a placeholder. Declared: Declarative header list-wrap rows shown under the header title and above the divider (icon + title + optional trailing value). Replaces the legacy single {@link BenefitCardProps.headerItem}. Ignored when the `header` slot is provided. |
| `header` | `React.ReactNode` |  |  |  | types | Real slot for the header "list wrap" (the rows under the header title). Highest precedence — when provided, these children render instead of `headerItems` / `headerItem`; `modes` (plus the `List Item Style: Minimal` style) cascade into every child automatically. |
| `showHeader` | `boolean` |  | `true` |  | types | Toggles the whole header section (title + item + divider). Mirrors the Figma `showHeader` property. Defaults to `true`. Default true, from the component source. |
| `bodyTitle` | `string` |  |  |  | types | Deprecated: In the Figma redesign the plain body title was replaced by a slot-based upsell `Nudge` ({@link BenefitCardProps.bodyHeader}). Still honored for backward compatibility: when set, it renders as a plain text title in place of the default nudge. Prefer `bodyHeader`. |
| `bodyHeader` | `React.ReactNode` |  |  |  | evidence (2026-10-13) | Defaults to the upsell Nudge; null or false removes it; a node replaces it. Declared: Real slot rendered between the header divider and the body list — in the Figma reference this is an upsell `Nudge` (avatar + highlighted "JioFinance+" message). Defaults to that nudge. Pass `null`/`false` to hide it, `bodyTitle` for the legacy plain-text title, or any `ReactNode` for full control; `modes` cascade into the slot. |
| `items` | `BenefitCardItem[]` |  |  |  | evidence (2026-10-13) | Defaults to two placeholder rows; children wins over items. Declared: Body benefit rows. Ignored when `children` is provided (the slot wins). |
| `children` | `React.ReactNode` |  |  |  | types | Real slot for the body "list wrap". When provided, these children render instead of `items`; `modes` (plus the `List Item Style: Minimal` style) cascade into every child automatically. |
| `buttonLabel` | `string` |  | `"Upgrade"` |  | types | CTA button label. Defaults to `"Upgrade"`. Default "Upgrade", from the component source. |
| `onButtonPress` | `() => void` |  |  |  | types | CTA press handler. |
| `button` | `React.ReactNode` |  |  |  | evidence (2026-10-13) | Replaces the call to action; null still renders the default button, so hide it with showButton false. Declared: Full override for the CTA. Takes precedence over `buttonLabel`. |
| `showButton` | `boolean` |  | `true` |  | types | Toggles the CTA button. Mirrors the Figma `showButton` property. Defaults to `true`. Default true, from the component source. |
| `onPress` | `() => void` |  |  |  | evidence (2026-10-17) | Since a116616 the header becomes a Pressable button named by accessibilityLabel, else headerTitle, else bodyTitle; the lists become a pointer-only press region with no role or Tab stop, and each dims to 0.92 opacity while pressed. With showHeader false the lists are the button. The upsell and the card's button are siblings, not children. Declared: Press handler for the card body. The upgrade button and the upsell stay siblings of this control, so they are not nested inside it. |
| `width` | `number \| ˋ${number}%ˋ` |  | `344` |  | types | Card width. Defaults to the Figma spec (`344`). Pass `'100%'` to fill the parent. Default 344, from the component source. |
| `modes` | `Modes` |  |  |  | evidence (2026-10-13) | Cascades to the card's children, each over its own defaults: rows (List Item Style Minimal, Nudge padding None), icons (AppearanceBrand Secondary), figures (Text Sizes Small, Weight Regular), the button (Button / Size S) and the upsell (AppearanceBrand Neutral). A consumer AppearanceBrand overrides all three brand defaults at once. Declared: Modes object for design-token resolution. Cascaded to all children. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Style overrides for the card container. |
| `accessibilityLabel` | `string` |  |  |  | types | Accessibility label for the card. |
| `BenefitCardItem.icon` | `string` |  |  |  | types | Registry icon name for the leading glyph (e.g. `'ic_jewellery_diamond'`). A field of each headerItems and items row. |
| `BenefitCardItem.iconColor` | `string` |  |  |  | types | Per-item override for the leading icon color. Defaults to the brand token. A field of each headerItems and items row. |
| `BenefitCardItem.leading` | `React.ReactNode` |  |  |  | types | Full override for the leading node. Takes precedence over `icon`. A field of each headerItems and items row. |
| `BenefitCardItem.title` | `string` |  |  | yes | types | Row title (e.g. `"JioPoints"`). A field of each headerItems and items row. |
| `BenefitCardItem.trailingText` | `string` |  |  |  | types | Optional right-aligned trailing value (e.g. `"Up to 2000 pts"`). A field of each headerItems and items row. |
| `BenefitCardItem.trailing` | `React.ReactNode` |  |  |  | types | Full override for the trailing node. Takes precedence over `trailingText`. A field of each headerItems and items row. |
| `BenefitCardItem.onPress` | `() => void` |  |  |  | types | Makes the row pressable. A field of each headerItems and items row. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Primary"` |  | evidence (2026-10-13) | Recolours the icons, the upsell and the button; no mode changes the card's surface or title. Declared: A token collection BenefitCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `AppearanceSystem` | `mode collection` | positive, warning, negative | `"positive"` |  | types | A token collection BenefitCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Avatar Size` | `mode collection` | L, M, S, XS | `"L"` |  | evidence (2026-10-13) | Listed for BenefitCard, but changes nothing on the card. Declared: A token collection BenefitCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Badge Size` | `mode collection` | Medium, Small | `"Medium"` |  | evidence (2026-10-13) | Listed for BenefitCard, but changes nothing on the card. Declared: A token collection BenefitCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Border Boolean` | `mode collection` | False, True | `"False"` |  | types | A token collection BenefitCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / Size` | `mode collection` | M, S, XS | `"M"` |  | types | A token collection BenefitCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / State` | `mode collection` | Idle, Hover, Pressed, Disabled | `"Idle"` |  | types | A token collection BenefitCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection BenefitCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context` | `mode collection` | Default, Nudge&Alert, CTACard, ListItem | `"Default"` |  | types | A token collection BenefitCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 10` | `mode collection` | Default, jioPlus | `"Default"` |  | types | A token collection BenefitCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context2` | `mode collection` | Default, AppBar | `"Default"` |  | types | A token collection BenefitCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context4` | `mode collection` | Default, Chip, Button, Badge, Badge/glass | `"Default"` |  | types | A token collection BenefitCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Emphasis` | `mode collection` | High, Medium, Low | `"High"` |  | types | A token collection BenefitCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Icon Size` | `mode collection` | Medium, Small | `"Medium"` |  | types | A token collection BenefitCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Nudge padding` | `mode collection` | Default, None | `"Default"` |  | types | A token collection BenefitCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection BenefitCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Profile Card Appearance` | `mode collection` | Default, Premium | `"Default"` |  | evidence (2026-10-13) | Listed for BenefitCard, but changes nothing on the card. Declared: A token collection BenefitCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Semantic Intent` | `mode collection` | Brand, System | `"Brand"` |  | types | A token collection BenefitCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Slot gap` | `mode collection` | S, M, L, XL, XS | `"S"` |  | evidence (2026-10-13) | Listed for BenefitCard, but changes nothing on the card. Declared: A token collection BenefitCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Text Appearance` | `mode collection` | Neutral, Primary, Secondary, Tertiary, Success, Warning, Error | `"Neutral"` |  | types | A token collection BenefitCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Text Sizes` | `mode collection` | Medium, Small, Large | `"Medium"` |  | types | A token collection BenefitCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Weight` | `mode collection` | Medium, Regular, Bold | `"Medium"` |  | types | A token collection BenefitCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `List Item Style` | `mode collection` |  |  |  | evidence (2026-10-13) | Not in the package's mode list for BenefitCard, but it changes the rows; the card sets Minimal. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `headerItems` | `BenefitCardItem[]` |  |  |  | types | A structured slot: an array of BenefitCardItem rows. Declarative header list-wrap rows shown under the header title and above the divider (icon + title + optional trailing value). Replaces the legacy single {@link BenefitCardProps.headerItem}. Ignored when the `header` slot is provided. |
| `header` | `React.ReactNode` |  |  |  | types | Real slot for the header "list wrap" (the rows under the header title). Highest precedence — when provided, these children render instead of `headerItems` / `headerItem`; `modes` (plus the `List Item Style: Minimal` style) cascade into every child automatically. |
| `bodyHeader` | `React.ReactNode` |  |  |  | types | Real slot rendered between the header divider and the body list — in the Figma reference this is an upsell `Nudge` (avatar + highlighted "JioFinance+" message). Defaults to that nudge. Pass `null`/`false` to hide it, `bodyTitle` for the legacy plain-text title, or any `ReactNode` for full control; `modes` cascade into the slot. |
| `items` | `BenefitCardItem[]` |  |  |  | types | A structured slot: an array of BenefitCardItem rows. Body benefit rows. Ignored when `children` is provided (the slot wins). |
| `children` | `React.ReactNode` |  |  |  | types | Real slot for the body "list wrap". When provided, these children render instead of `items`; `modes` (plus the `List Item Style: Minimal` style) cascade into every child automatically. |
| `button` | `React.ReactNode` |  |  |  | types | Full override for the CTA. Takes precedence over `buttonLabel`. |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onButtonPress` | `() => void` |  |  |  | types | CTA press handler. |
| `onPress` | `() => void` |  |  |  | types | Press handler for the card body. The upgrade button and the upsell stay siblings of this control, so they are not nested inside it. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- No mode changes the card's white surface or black title, including Color Mode Dark. _(evidence, 2026-10-13)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/avoidWhen` · trace-check: The guide gives no avoidWhen guidance; left empty rather than guessed.
- `/accessibility` · trace-check: The guide gives no accessibility guidance; left empty rather than guessed.
