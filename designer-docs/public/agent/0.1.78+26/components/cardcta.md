# CardCTA

> Coin agent pack 0.1.78+26 (pilot). Generated from `components/cardcta.json`; the JSON is the source of truth.

- **State:** flagged (1 flag, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `e7ed622` · built 2026-10-31T03:54:03Z
- **Category:** card (for discovery only, not a limit on composition) · **Tags:** CTA card, call to action, prompt card, promo card, rating card, SIP card
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=cardcta) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3693-4477) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-cardcta--docs)

Use a Card CTA to offer one next step, such as setting up UPI or rating an insight, with a title, a short line, and a button.

## Use when

- **recommended** Offer one next step, such as setting up UPI or rating an insight, with a title, a short line and a button.  
  _From summary: “Use a Card CTA to offer one next step, such as setting up UPI or rating an insight, with a title, a short line, and a button.”_
- **recommended** One prompt, one button.  
  _From corePrinciple: “One prompt, one button.”_
- **recommended** A prompt with one next step: the card doesn’t complete the action; its button does, as the card’s handwritten Storybook docs say in the evidence’s record.  
  _From evidence: “a prompt with one next step. It does not complete the action. The button does.”_
- **recommended** `type`: Pick the type by the step: cta for an offer or setup step, rating for a score and a reaction, sip for a person or plan, as the evidence records the handwritten Storybook docs.  
  _From evidence: “Types: cta for an offer or setup step, rating for a score and a reaction, sip for a person or plan.”_

## Avoid when

- **discouraged** A status message: the card’s handwritten Storybook docs, as the evidence records them, use Card Feedback. Use instead: `CardFeedback`.  
  _From evidence: “Don't use for a status message (CardFeedback)”_
- **discouraged** A bank summary: the handwritten Storybook docs, as the evidence records them, use Card Bank Account or Card Provider Info for a bank or product summary. Use instead: `CardBankAccount`.  
  _From evidence: “a bank or product summary (CardBankAccount, CardProviderInfo)”_
- **discouraged** A product summary: the handwritten Storybook docs, as the evidence records them, use Card Provider Info or Card Bank Account for a bank or product summary. Use instead: `CardProviderInfo`.  
  _From evidence: “a bank or product summary (CardBankAccount, CardProviderInfo)”_
- **discouraged** A second primary button: don’t add one, as the evidence records the handwritten Storybook docs.  
  _From evidence: “don't add a second primary button”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Title | title: the offer, 16 px bold. | yes | anatomy: “title: the offer, 16 px bold” |
| Body | body: what the step gives, 14 px. | yes | anatomy: “body: what the step gives, 14 px” |
| Button | A small purple Button from buttonLabel and onPressButton. | no | anatomy: “A small purple Button from buttonLabel and onPressButton.” |
| Icon | On cta, an IconCapsule from iconName; iconSlot replaces it. | no | anatomy: “An IconCapsule from iconName; iconSlot replaces it.” |
| Panel | A white panel with 12 px corners and a 1 px border. | yes | anatomy: “A white panel with 12 px corners and a 1 px border.” |
| Badge | badge: an optional chip on the cta layout; hidden unless you pass one. | no | fact `/facts/props/3` (badge, source types) |
| Caption | caption: an optional line under the body on the cta layout; hidden unless you pass one. | no | fact `/facts/props/4` (caption, source types) |
| Rating badge | ratingLabel: the badge on the rating type. | no | fact `/facts/props/8` (ratingLabel, source types) |
| Like and dislike | Like and dislike actions in the rating footer, shown unless showRatingActions is false. | no | fact `/facts/props/9` (showRatingActions, source types) |
| Avatar | avatarSource: the picture in the sip type’s Avatar. | no | fact `/facts/props/17` (avatarSource, source types) |
| Headline | headline: on sip, the text above the description row. | no | fact `/facts/props/14` (headline, source types) |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `badge` | `ReactNode` | types |
| `iconSlot` | `ReactNode` | types |
| `buttonSlot` | `ReactNode` | types |
| `ratingBadgeSlot` | `ReactNode` | types |
| `ratingActionsSlot` | `ReactNode` | types |
| `avatarSlot` | `ReactNode` | types |

## Placement

- **recommended** On the guide’s Home screen, the prompt sits under the screen’s greeting.  
  _From inContext: “Home shows the prompt under the greeting.”_
- **recommended** `onPressButton`: The screen owns the step: on the guide’s Home screen, Set up opens the screen’s own setup flow through onPressButton, and the card doesn’t do the setup or remove itself.  
  _From inContext: “Set up opens the screen’s own setup flow through onPressButton; the card doesn’t do the setup or remove itself.”_

## Configuration

- **recommended** `type` = `cta`: type sets the layout: cta, the default, puts the title, body and button beside an icon.  
  _From configuration: “type sets the layout: cta, the default, puts the title, body, and button beside an icon”_
- **recommended** `type` = `rating`: rating adds a badge above and like and dislike beside the button.  
  _From configuration: “rating adds a badge above and like and dislike beside the button”_
- **recommended** `type` = `sip`: sip adds an avatar and a line of facts above the button.  
  _From configuration: “sip adds an avatar and a line of facts above the button.”_
- **recommended** `type`: type also accepts the Figma names CTA, Rating and Sip.  
  _From fact `/facts/props/0` (type, source types)_
- **recommended** `type`: Props for one type do nothing on the others.  
  _From configuration: “Props for one type do nothing on the others.”_
- **recommended** `iconName`: Set iconName to the step’s icon: left out, the cta capsule shows ic_upi_number.  
  _From fact `/facts/props/5` (iconName, source types)_
- **recommended** `iconSlot`: iconSlot, buttonSlot, ratingBadgeSlot, ratingActionsSlot and avatarSlot replace a type’s parts and get the card’s modes.  
  _From configuration: “iconSlot, buttonSlot, ratingBadgeSlot, ratingActionsSlot, and avatarSlot replace a type’s parts and get the card’s modes.”_
- **recommended** `buttonSlot`: iconSlot and buttonSlot take your own IconCapsule and Button.  
  _From configuration: “Your own IconCapsule and Button in iconSlot and buttonSlot.”_
- **recommended** `badge`: badge adds a chip on the cta layout: a string renders a Badge, a node replaces it, and false, null or an empty string hide it.  
  _From fact `/facts/props/3` (badge, source types)_
- **recommended** `caption`: caption adds a line under the body on the cta layout; false, null or an empty string hide it.  
  _From fact `/facts/props/4` (caption, source types)_
- **recommended** `disableTruncation`: The title clamps to one line and the body to three; disableTruncation lets both wrap freely.  
  _From fact `/facts/props/18` (disableTruncation, source types)_
- **recommended** `modes`: The card’s Button is purple at size S: Emphasis makes it lighter, and Semantic Intent System gives it and the icon AppearanceSystem’s status colour.  
  _From configuration: “The button is always purple at size S: Emphasis makes it lighter, and Semantic Intent System gives it and the icon AppearanceSystem’s status colour.”_
- **recommended** `Emphasis` = `Medium`: Emphasis Medium: a light purple button.  
  _From configuration: “A light purple button.”_
- **recommended** `Emphasis` = `Low`: Emphasis Low: a text button.  
  _From configuration: “A text button.”_
- **recommended** `Semantic Intent` = `System`: Semantic Intent System with AppearanceSystem warning turns the icon and the button orange.  
  _From configuration: “AppearanceSystem warning turns the icon and button orange.”_
- **recommended** `Context` = `CTACard`: Context CTACard: a larger, 58 px icon.  
  _From configuration: “A larger, 58 px icon.”_
- **recommended** `Page type` = `SubPage`: Page type SubPage: a light grey border.  
  _From configuration: “A light grey border.”_
- **recommended** `context 8` = `Section`: context 8 Section adds a grey border.  
  _From configuration: “Context CTACard enlarges the icon, and Page type SubPage and context 8 Section add a grey border.”_
- **recommended** `showButton` = `false`: On rating, showButton={false} removes Save and moves like and dislike to the start.  
  _From states: “On rating, showButton={false} removes Save and moves like and dislike to the start”_
- **recommended** `showRatingActions` = `false`: showRatingActions={false} removes like and dislike.  
  _From states: “showRatingActions={false} removes like and dislike”_
- **recommended** `onPressLike`: Pass onPressLike and onPressDislike: like and dislike respond only when you do.  
  _From states: “Like and dislike only respond when you pass onPressLike and onPressDislike.”_
- **recommended** `ratingMediaAlign`: On rating, ratingMediaAlign aligns the badge slot above the title: center, the default, or start.  
  _From fact `/facts/props/11` (ratingMediaAlign, source types)_
- **recommended** `onPressButton`: The card’s button can’t be disabled.  
  _From states: “The card’s button can’t be disabled.”_
- **recommended** The card fills its host’s width; Figma and Storybook draw it at 320 px.  
  _From sizing: “The card fills its host’s width; Figma and Storybook draw it at 320 px.”_
- **recommended** On cta the text takes 3/5 of the width and the icon 2/5, padded 22 px top and bottom.  
  _From sizing: “On cta the text takes 3/5 of the width and the icon 2/5, padded 22 px top and bottom.”_
- **recommended** `avatarSource`: Pass the plan’s picture in avatarSource: it shows the plan’s own mark.  
  _From doDont: “avatarSource shows the plan’s own mark.”_

## Content

- **recommended** `title`: Make the title the offer.  
  _From content: “Make the title the offer”_
- **recommended** `body`: Make the body what the person gets.  
  _From content: “the body what the person gets”_
- **recommended** `buttonLabel`: Make the button label a verb, such as Set up, Save or Start SIP.  
  _From content: “the button label a verb, such as Set up, Save, or Start SIP”_
- **recommended** `body`: Keep the title to one line and the body to three.  
  _From content: “Keep the title to one line and the body to three”_
- **recommended** `headline`: On sip, the headline names the plan, the description is its main fact, and the subtitle qualifies it.  
  _From content: “On sip, the headline names the plan, the description is its main fact, and the subtitle qualifies it.”_
- **discouraged** `buttonLabel`: Don’t put a long label on the button.  
  _From doDont: “A long button label”_
- **recommended** `title`: Set title: left out, it reads “If you have 1 line”.  
  _From fact `/facts/props/1` (title, source types)_
- **recommended** `body`: Set body: left out, it reads “Then you can have up to 3 lines in the subtext as well. This is for demonstration.”  
  _From fact `/facts/props/2` (body, source types)_
- **recommended** `buttonLabel`: Set buttonLabel: left out, the Button reads “Button”, or “Save” on rating.  
  _From fact `/facts/props/6` (buttonLabel, source evidence)_
- **recommended** `ratingLabel`: Set ratingLabel on rating: left out, the badge reads “+28 Rating”.  
  _From fact `/facts/props/8` (ratingLabel, source types)_
- **recommended** `headline`: Set headline on sip: left out, it reads “Headline”.  
  _From fact `/facts/props/14` (headline, source types)_
- **recommended** `description`: Set description on sip: left out, it reads “Description”.  
  _From fact `/facts/props/15` (description, source types)_
- **recommended** `subtitle`: Set subtitle on sip: left out, it reads “Subtitle”.  
  _From fact `/facts/props/16` (subtitle, source types)_

Good: “Set up UPI Number”, “Receive money on your mobile number.”, “Set up”, “Your credit score rose”, “Save”, “Start a gold SIP”, “Jio Gold SIP”, “₹500”, “every month”, “Start SIP”

Bad: “Set up your UPI Number to receive money”

## States

| State | When | From |
| --- | --- | --- |
| Not pressable | Always: the card itself isn’t pressable; its buttons are. | states: “The card itself isn’t pressable; its buttons are.” |
| Reactions only | On rating with showButton={false}: like and dislike, without Save, at the start. | states: “On rating, showButton={false} removes Save and moves like and dislike to the start” |
| Save only | On rating with showRatingActions={false}: Save, without reactions. | states: “showRatingActions={false} removes like and dislike” |

## Accessibility

- **recommended** `iconAccessibilityLabel`: iconAccessibilityLabel names the default IconCapsule; without it the icon is decorative and hidden from screen readers.  
  _From fact `/facts/props/21` (iconAccessibilityLabel, source types)_
- **recommended** `avatarAccessibilityLabel`: avatarAccessibilityLabel names the default sip Avatar; without it the avatar is decorative and hidden from screen readers.  
  _From fact `/facts/props/22` (avatarAccessibilityLabel, source types)_
- **recommended** `likeAccessibilityLabel`: likeAccessibilityLabel names the like control; left out, it is “Like”.  
  _From fact `/facts/props/19` (likeAccessibilityLabel, source types)_
- **recommended** `dislikeAccessibilityLabel`: dislikeAccessibilityLabel names the dislike control; left out, it is “Dislike”.  
  _From fact `/facts/props/20` (dislikeAccessibilityLabel, source types)_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| One verb on the button | A long button label | “Set up” names the action. |

## Examples

### The setup prompt on the Home screen, the guide’s In context: a Title greeting over a cta card with the UPI Number icon and the Set up Button. The greeting and balance are the guide’s; onPressButton stands for the screen opening its own setup flow (the card doesn’t do the setup or remove itself).

```tsx
<VStack>
  <Title title="Good morning, Priya" subtitle="Your balance is ₹12,450" />
  <CardCTA
    type="cta"
    title="Set up UPI Number"
    body="Receive money on your mobile number."
    iconName="ic_upi_number"
    buttonLabel="Set up"
    onPressButton={() => {}}
  />
</VStack>
```

_From inContext: “Set up opens the screen’s own setup flow through onPressButton; the card doesn’t do the setup or remove itself.”_

### A rating card, the guide’s rating example: the +28 points badge over a credit-score insight, with Save beside like and dislike. onPressButton stands for the screen’s Save action, and onPressLike and onPressDislike for the person’s reaction.

```tsx
<CardCTA
  type="rating"
  ratingLabel="+28 points"
  title="Your credit score rose"
  body="Paying your bills on time helped. Was this useful?"
  buttonLabel="Save"
  onPressButton={() => {}}
  onPressLike={() => {}}
  onPressDislike={() => {}}
/>
```

_From configuration: “A badge, Save, and like or dislike, to react to an insight.”_

### A plan card, the guide’s sip and Plan facts examples: the plan’s own mark as the avatar, the offer and what it gives, Jio Gold SIP as the headline, ₹500 as its main fact, every month as the qualifier, and Start SIP as the verb. The URI stands for the plan’s mark, and onPressButton for the screen starting the plan.

```tsx
<CardCTA
  type="sip"
  title="Start a gold SIP"
  body="Buy 24K gold every month, automatically."
  headline="Jio Gold SIP"
  description="₹500"
  subtitle="every month"
  buttonLabel="Start SIP"
  avatarSource={{ uri: 'https://example.com/jio-gold-sip-mark.png' }}
  onPressButton={() => {}}
/>
```

_From content: ““Jio Gold SIP”, “₹500”, and “every month”.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `type` | `CardCTATypeInput` | cta, rating, sip, CTA, Rating, Sip | `"cta"` |  | types | Visual layout variant. `'cta'` (default) is the horizontal CTA card, `'rating'` is the rating card, and `'sip'` is the avatar-led card with a headline/description/subtitle footer. PascalCase Figma names (`'CTA' \| 'Rating' \| 'Sip'`) are also accepted. Default "cta", from the component source. |
| `title` | `string` |  | `"If you have 1 line"` |  | types | Title text. Default "If you have 1 line", from the component source. |
| `body` | `string` |  | `"Then you can have up to 3 lines in the subtext as well. This is for demonstration."` |  | types | Body / subtitle text. Default "Then you can have up to 3 lines in the subtext as well. This is for demonstration.", from the component source. |
| `badge` | `React.ReactNode \| string \| false \| null` |  |  |  | types | Optional chip on the cta layout, including Figma's picture CTA. A string renders a `Badge`. A node replaces it. `false`, `null`, and `''` hide it. Omitted by default. |
| `caption` | `string \| false \| null` |  |  |  | types | Optional caption under the body on the cta layout (Figma's picture CTA). `false`, `null`, and `''` hide it. Omitted by default. |
| `iconName` | `string` |  | `"ic_upi_number"` |  | types | Icon name for the default IconCapsule on the right. Default "ic_upi_number", from the component source. |
| `buttonLabel` | `string` |  | `"Button"` |  | evidence (2026-10-19) | Left out, the default Button reads “Button”, or “Save” on rating. Declared: Label for the default Button. |
| `onPressButton` | `() => void` |  |  |  | types | Callback for the default Button press. |
| `ratingLabel` | `string` |  | `"+28 Rating"` |  | types | Label shown in the rating badge. Default "+28 Rating", from the component source. |
| `showRatingActions` | `boolean` |  | `true` |  | types | Show like/dislike actions in the rating footer. Default true, from the component source. |
| `showButton` | `boolean` |  | `true` |  | types | [rating] Show the primary footer button (default `Save` / `buttonSlot`). When `false`, only rating actions render and they stay start-aligned — no empty button slot and no consumer `buttonSlot={<Fragment />}` hack. Default: `true`. Default true, from the component source. |
| `ratingMediaAlign` | `'start' \| 'center'` | center, start | `"center"` |  | types | [rating] Horizontal alignment of the media / badge slot above the title. Charts and dataviz should use `'center'` (default). Use `'start'` for left-aligned badges/labels. Default "center", from the component source. |
| `onPressLike` | `() => void` |  |  |  | types | Callback for the default like action. |
| `onPressDislike` | `() => void` |  |  |  | types | Callback for the default dislike action. |
| `headline` | `string` |  | `"Headline"` |  | types | [sip] Headline text shown above the description row. Default "Headline", from the component source. |
| `description` | `string` |  | `"Description"` |  | types | [sip] Description text (left of subtitle) Default "Description", from the component source. |
| `subtitle` | `string` |  | `"Subtitle"` |  | types | [sip] Subtitle text (right of description) Default "Subtitle", from the component source. |
| `avatarSource` | `ImageSourcePropType \| string` |  |  |  | types | [sip] Image source for the default Avatar. |
| `disableTruncation` | `boolean` |  |  |  | types | When `true`, title and body wrap freely. When omitted, title clamps to one line and body to three, matching the docs. |
| `likeAccessibilityLabel` | `string` |  | `"Like"` |  | types | Accessible name for the default Like control. Defaults to `Like`. Default "Like", from the component source. |
| `dislikeAccessibilityLabel` | `string` |  | `"Dislike"` |  | types | Accessible name for the default Dislike control. Defaults to `Dislike`. Default "Dislike", from the component source. |
| `iconAccessibilityLabel` | `string` |  |  |  | types | Accessible name for the default IconCapsule. Omit it to hide the icon from the accessibility tree (decorative). |
| `avatarAccessibilityLabel` | `string` |  |  |  | types | Accessible name for the default sip Avatar. Omit it to hide the avatar from the accessibility tree (decorative). |
| `modes` | `Modes` |  |  |  | types | Mode configuration for design token resolution. |
| `iconSlot` | `React.ReactNode` |  |  |  | types | Slot: replaces the default icon area (right side) |
| `buttonSlot` | `React.ReactNode` |  |  |  | types | Slot: replaces the default Button. |
| `ratingBadgeSlot` | `React.ReactNode` |  |  |  | types | Slot: replaces the default rating badge. |
| `ratingActionsSlot` | `React.ReactNode` |  |  |  | types | Slot: replaces the default like/dislike action group. |
| `avatarSlot` | `React.ReactNode` |  |  |  | types | [sip] Slot: replaces the default Avatar. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Container style overrides. |
| `...Omit<React.ComponentProps<typeof View>, 'children' | 'style'>` | `Omit<React.ComponentProps<typeof View>, 'children' \| 'style'>` |  |  |  | types | Inherited React Native props the component also accepts. They are not part of the design contract and no guide documents them. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Primary"` |  | evidence (2026-10-19) | The card sets AppearanceBrand Secondary on its own Button and IconCapsule over its modes, so AppearanceBrand on the card doesn’t change either. Declared: A token collection CardCTA reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `AppearanceSystem` | `mode collection` | positive, warning, negative | `"positive"` |  | types | A token collection CardCTA reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Avatar Size` | `mode collection` | L, M, S, XS | `"L"` |  | types | A token collection CardCTA reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Badge Size` | `mode collection` | Medium, Small | `"Medium"` |  | types | A token collection CardCTA reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / Size` | `mode collection` | M, S, XS | `"S"` |  | evidence (2026-10-19) | The card’s own Button is Button / Size S: the card sets it over its modes, so Button / Size on the card doesn’t change it. Declared: A token collection CardCTA reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / State` | `mode collection` | Idle, Hover, Pressed, Disabled | `"Idle"` |  | types | A token collection CardCTA reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection CardCTA reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context` | `mode collection` | Default, Nudge&Alert, CTACard, ListItem | `"Default"` |  | types | A token collection CardCTA reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 10` | `mode collection` | Default, jioPlus | `"Default"` |  | types | A token collection CardCTA reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 8` | `mode collection` | Default, Section | `"Default"` |  | types | A token collection CardCTA reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 9` | `mode collection` | Default, Stack | `"Default"` |  | types | A token collection CardCTA reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context2` | `mode collection` | Default, AppBar | `"Default"` |  | types | A token collection CardCTA reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context4` | `mode collection` | Default, Chip, Button, Badge, Badge/glass | `"Default"` |  | types | A token collection CardCTA reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Emphasis` | `mode collection` | High, Medium, Low | `"High"` |  | evidence (2026-10-19) | The card keeps its own IconCapsule at Emphasis Medium, so Emphasis on the card changes its Button, not the icon. Declared: A token collection CardCTA reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Icon Capsule Size` | `mode collection` | M, L, S, XS | `"M"` |  | types | A token collection CardCTA reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `MediaBlock` | `mode collection` | IconCapsule, Image | `"IconCapsule"` |  | types | A token collection CardCTA reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection CardCTA reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Profile Card Appearance` | `mode collection` | Default, Premium | `"Default"` |  | types | A token collection CardCTA reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Semantic Intent` | `mode collection` | Brand, System | `"Brand"` |  | types | A token collection CardCTA reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `badge` | `React.ReactNode \| string \| false \| null` |  |  |  | types | Optional chip on the cta layout, including Figma's picture CTA. A string renders a `Badge`. A node replaces it. `false`, `null`, and `''` hide it. Omitted by default. |
| `iconSlot` | `React.ReactNode` |  |  |  | types | Slot: replaces the default icon area (right side) |
| `buttonSlot` | `React.ReactNode` |  |  |  | types | Slot: replaces the default Button |
| `ratingBadgeSlot` | `React.ReactNode` |  |  |  | types | Slot: replaces the default rating badge |
| `ratingActionsSlot` | `React.ReactNode` |  |  |  | types | Slot: replaces the default like/dislike action group |
| `avatarSlot` | `React.ReactNode` |  |  |  | types | [sip] Slot: replaces the default Avatar |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onPressButton` | `() => void` |  |  |  | types | Callback for the default Button press |
| `onPressLike` | `() => void` |  |  |  | types | Callback for the default like action |
| `onPressDislike` | `() => void` |  |  |  | types | Callback for the default dislike action |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- The title’s line is 20 px where Figma’s is 18. _(evidence, 2026-10-19)_
- Like and dislike are 26 px where Figma’s are 28. _(evidence, 2026-10-19)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `(whole entry)` · human: The Card CTA guide (e7ed622) and its evidence were checked on 19 October 2026 on the a116616 build; the installed v0.1.78-dbe0e02 has a different CardCTA.tsx (12f3f2b at a116616, 037ab56 at dbe0e02), changed by Biscuit's ace46ca and dbe0e02 for Component Bug #345, and the evidence's 28 October note says the guide's copy waits for #345's own publish. Read against the installed source and the guide page rendered on it (31 October, headless Chrome, 1280 and 390 px), these sentences no longer hold, and the entry leaves them out: (1) Anatomy's Title note “nothing cuts it short”, Sizing's “Height follows the text: nothing cuts the title or body short, so longer copy or a narrower host makes the card taller.”, the Long copy caption “More text, a taller card: nothing cuts it short.” and Content's “the card doesn’t cut either short”: the title clamps to one line and the body to three unless disableTruncation is set (CardCTA.tsx lines 519–527); on the page the Long copy body is cut at three lines and at 260 px the title ends in …. (2) Sizing's “The button grows with its label and never wraps.” and the first Don't caption “The button never wraps, so it runs out of the card.”: the card is overflow hidden (305), the Button stretches to its column (386–399) and its label stays on one line and ends in … inside it (Button.tsx 431–438). (3) Configuration's “AppearanceBrand changes only the rating badge.”: the new cta badge prop gets the card's modes too (52, 528); and the AppearanceBrand Secondary caption “The rating badge turns purple, as Figma draws it.”: the rating badge is AppearanceBrand Secondary unless the card's modes set one (285), so it is purple without it. (4) The second Don't caption “A stranger’s photo appears in its place.”: without avatarSource the sip Avatar is a monogram of the title's initials (568–594; the page shows “SA”). (5) The third Don't caption “Its corners poke out past the card’s rounded corners.”: with MediaBlock Image the right column clips to 12 px corners (286–297, 362–374); and the Do & Don'ts description's “overflows, shows a stranger, or breaks its corners”. (6) Sources: “… while the package’s cta shows an icon and no badge or caption; a picture passed through iconSlot isn’t clipped to the card’s corners.” (badge and caption props, 45–56, 528–531), “the package’s is gold until you pass it.”, “Nothing cuts the title or body short, a long button label runs out of the card, ratingMediaAlign doesn’t move the default badge, and without avatarSource sip shows a stock photo.” (641–647 move the badge) and the 9,999 px measuring copy sentence (gone: the page's scrollWidth equals its width). Still open on dbe0e02 and not in the guide or evidence, so not listed as gaps: every default Button fills its column instead of hugging its label (Component Bug #414, In progress); and from #345's 27 October re-test, a long badge isn't truncated or held to its column, the badge-to-title gap is 6 px where Figma's is 16, and the caption is 12/16 regular where Figma's is 14/16 medium. The guide is updated when Component Bug #345 publishes (the Component Fix flow updates the guide copy a fix changed; the sentences are listed in a note on #345), then a new Agent pack ticket re-extracts. Added by Claude Code in the overnight run agentpack-r26, for Marcin to confirm. Component Bug #345.
