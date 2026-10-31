# ProductMerchandisingCard

> Coin agent pack 0.1.78+26 (pilot). Generated from `components/productmerchandisingcard.json`; the JSON is the source of truth.

- **State:** flagged (1 flag, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `3f56271` · built 2026-10-31T03:54:03Z
- **Category:** card (for discovery only, not a limit on composition) · **Tags:** promo card, merchandising card, campaign card, offer card, banner, image card
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=productmerchandisingcard) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=5277-317) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-productmerchandisingcard--docs)

Use a Product Merchandising Card to promote one product or campaign on a photo, with a badge, a short title, and one action.

## Use when

- **recommended** Promote one product or campaign on a photo, with a badge, a short title and one action.  
  _From summary: “Use a Product Merchandising Card to promote one product or campaign on a photo, with a badge, a short title, and one action.”_
- **recommended** The photo sells; the footer names it and acts.  
  _From corePrinciple: “The photo sells; the footer names it and acts.”_
- **recommended** One campaign or product, where the photo is the message, as the card’s handwritten Storybook docs say in the evidence’s record.  
  _From evidence: “one campaign or product, where the photo is the message”_

## Avoid when

- **discouraged** A spec sheet: the card’s handwritten Storybook docs, as the evidence records them, use Product Overview. Use instead: `ProductOverview`.  
  _From evidence: “not for a spec sheet (ProductOverview) or a card with no photo”_
- **discouraged** A card with no photo: the card’s handwritten Storybook docs, as the evidence records them, say it isn’t for one.  
  _From evidence: “not for a spec sheet (ProductOverview) or a card with no photo”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Photo | imageSource, cropped to fill the card. | no | anatomy: “imageSource, cropped to fill the card.” |
| Avatar | avatarSource, or avatarMonogram’s initials, 36 px. | no | anatomy: “avatarSource, or avatarMonogram’s initials, 36 px.” |
| Corner badge | badgeLabel: a lilac Badge; hidden without a label. | no | anatomy: “badgeLabel: a lilac Badge; hidden without a label.” |
| Glass badge | specialBadgeLabel: a small frosted badge above the title; hidden without a label. | no | fact `/facts/props/10` (specialBadgeLabel, source types) |
| Title | title, 14 px bold white, over subtitle; one line each. | yes | anatomy: “title, 14 px bold white, over subtitle; one line each.” |
| Button | A small purple Button from ctaLabel and onCtaPress. | no | anatomy: “A small purple Button from ctaLabel and onCtaPress.” |
| Footer | A blurred band under the footer’s content, with a gradient over the blur. | yes | evidence: “a separate blurred band before the footer’s content, so the targets count from child 2 (photo), 3 (header) and 5 (footer content); a gradient now sits over the blur” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `badgeIcon` | `ReactNode` | types |
| `badge` | `ReactNode` | types |
| `avatar` | `ReactNode` | types |
| `specialBadgeIcon` | `ReactNode` | types |
| `specialBadge` | `ReactNode` | types |
| `cta` | `ReactNode` | types |

## Placement

- **recommended** One offer under the screen’s heading, as on the guide’s Home screen.  
  _From inContext: “Home shows one offer under its heading.”_
- **recommended** `onCtaPress`: The screen owns what the action does: on the guide’s Home screen, Open starts the screen’s own sign-up through onCtaPress, and the card shows the offer.  
  _From inContext: “Open starts the screen’s own sign-up through onCtaPress; the card only shows the offer.”_

## Configuration

- **recommended** `imageSource`: Pass the photo in imageSource: the card has none of its own.  
  _From configuration: “imageSource is the photo; the card has none of its own.”_
- **recommended** `badgeLabel`: badgeLabel adds the corner badge at the top right; without a label the badge is hidden.  
  _From fact `/facts/props/3` (badgeLabel, source types)_
- **recommended** `badgeIcon`: badgeIcon puts a node such as an Icon before the corner badge’s label, and gives it the lilac badge’s modes, so a default Icon is purple.  
  _From fact `/facts/props/4` (badgeIcon, source types)_
- **recommended** `specialBadgeIcon`: specialBadgeIcon puts a leading node, such as an Icon, inside the special badge.  
  _From fact `/facts/props/11` (specialBadgeIcon, source types)_
- **recommended** `avatarSource`: avatarSource shows a round picture at the top left.  
  _From configuration: “avatarSource shows a round picture at the top left, avatarMonogram initials instead, and showAvatar={false} removes it.”_
- **recommended** `avatarSource`: Pass your own avatar in avatarSource, such as the brand’s logo in the corner.  
  _From doDont: “The brand’s logo in the corner.”_
- **recommended** `avatarMonogram`: avatarMonogram shows initials instead of a picture.  
  _From configuration: “avatarSource shows a round picture at the top left, avatarMonogram initials instead, and showAvatar={false} removes it.”_
- **recommended** `showAvatar` = `false`: showAvatar={false} removes the avatar.  
  _From configuration: “avatarSource shows a round picture at the top left, avatarMonogram initials instead, and showAvatar={false} removes it.”_
- **recommended** `ctaLabel`: ctaLabel and onCtaPress make the small purple Button.  
  _From configuration: “ctaLabel and onCtaPress make the small purple Button.”_
- **recommended** `onCtaPress`: Pass onCtaPress: without it the Button still shows and does nothing.  
  _From evidence: “Without `onCtaPress` the Button still renders and does nothing.”_
- **recommended** `modes`: One modes object styles the corner badge and the Button together; Emphasis, Badge Size and Button / Size change them too.  
  _From configuration: “One modes object styles the corner badge and the Button together: AppearanceBrand Primary turns both gold, and Emphasis, Badge Size, and Button / Size change them too.”_
- **recommended** `modes`: The card’s modes reach its default parts and anything passed in the badge, avatar, specialBadge, cta and icon slots.  
  _From fact `/facts/props/18` (modes, source types)_
- **recommended** `AppearanceBrand` = `Primary`: AppearanceBrand Primary: a cream badge and a gold Button.  
  _From configuration: “A cream badge and a gold Button.”_
- **recommended** `Emphasis` = `Medium`: Emphasis Medium: a light purple Button.  
  _From configuration: “A light purple Button.”_
- **recommended** `Button / Size` = `XS`: Button / Size XS: a smaller, 24 px Button.  
  _From configuration: “A smaller, 24 px Button.”_
- **recommended** `onPress`: Use the Button or the whole card, not both: with onPress, Open stays a separate button inside the card, so drop the Button with cta={false}.  
  _From states: “Open stays a separate button inside it, so use one or the other: cta={false} drops the Button.”_
- **recommended** `cta` = `false`: cta={false} drops the Button.  
  _From states: “Open stays a separate button inside it, so use one or the other: cta={false} drops the Button.”_
- **recommended** `height`: The card is 223 px tall unless you set height.  
  _From sizing: “The card is 223 px tall unless you set height, and takes its width from its host; Figma draws it at 328 px.”_
- **recommended** The card takes its width from its host; Figma draws it at 328 px.  
  _From sizing: “The card is 223 px tall unless you set height, and takes its width from its host; Figma draws it at 328 px.”_
- **recommended** The photo fills and crops to the card.  
  _From sizing: “The photo fills and crops to the card.”_
- **recommended** The header and footer sit on the photo: the footer grows upward with its content, and in a narrow card the Button drops under the title.  
  _From sizing: “The header and footer sit on the photo: the footer grows upward with its content, and in a narrow card the Button drops under the title.”_
- **recommended** `disableTruncation`: The title and subtitle stay on one line and end in … unless disableTruncation is set.  
  _From sizing: “The title and subtitle stay on one line and end in … unless disableTruncation is set.”_
- **recommended** `disableTruncation` = `true`: disableTruncation: the title and subtitle wrap, and the footer grows upward.  
  _From sizing: “They wrap, and the footer grows upward.”_
- **recommended** The card has no selected, disabled or loading look.  
  _From states: “There’s no selected, disabled, or loading look.”_

## Content

- **recommended** `title`: Make the title the product or campaign in two to four words.  
  _From content: “Make the title the product or campaign in two to four words”_
- **recommended** `subtitle`: Make the subtitle one line of support.  
  _From content: “the subtitle one line of support”_
- **recommended** `badgeLabel`: Badge labels are a word or two, such as New or Zero balance.  
  _From content: “Badge labels are a word or two, such as New or Zero balance”_
- **recommended** `ctaLabel`: Make ctaLabel a verb, such as Open or Buy.  
  _From content: “ctaLabel a verb, such as Open or Buy.”_
- **discouraged** `title`: Don’t write a long title: it ends in … on one line.  
  _From doDont: “It ends in … on one line”_
- **recommended** `title`: Set title: left out, it reads “Title”.  
  _From fact `/facts/props/1` (title, source types)_
- **recommended** `subtitle`: Set subtitle: left out, it reads “Subtitle”.  
  _From fact `/facts/props/2` (subtitle, source types)_
- **recommended** `ctaLabel`: Set ctaLabel: left out, the Button reads “CTA”.  
  _From fact `/facts/props/13` (ctaLabel, source types)_

Good: “Savings account”, “Open in 5 minutes”, “New”, “Zero balance”, “Open”, “Festive rewards”, “Earn 2× JioPoints on UPI”, “Diwali”, “Ends Sunday”, “Join”

Bad: “Zero-balance savings account with free debit card”

## States

| State | When | From |
| --- | --- | --- |
| Button acts | The default, without onPress: the card isn’t pressable, its Button is. | states: “The card isn’t pressable: its Button is.” |
| Whole card | With onPress the whole card is one button, which dims slightly while pressed. | states: “onPress makes the whole card one button that dims slightly while pressed” |

## Accessibility

- **recommended** `accessibilityLabel`: Pass accessibilityLabel with the offer: the photo tells a screen reader nothing.  
  _From content: “Pass accessibilityLabel with the offer: the photo tells a screen reader nothing.”_
- **recommended** `onPress`: A pressable card is one button, announced by accessibilityLabel or else the title.  
  _From states: “onPress makes the whole card one button that dims slightly while pressed, announced by accessibilityLabel or the title.”_
- **recommended** `accessibilityLabel`: Left out, accessibilityLabel falls back to the title.  
  _From fact `/facts/props/20` (accessibilityLabel, source types)_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| A short title | A long title | It ends in … on one line |

## Examples

### The offer on the Home screen, the guide’s In context: a Title heading over one card with a photo, an avatar, both badges and the Open Button. The URIs stand for the offer’s photo and the brand’s logo, and onCtaPress for the screen starting its own sign-up. The accessibilityLabel is the one the guide’s code gives the card (the rendered copy doesn’t show it).

```tsx
<VStack>
  <Title title="For you" subtitle="Offers picked for your savings" />
  <ProductMerchandisingCard
    imageSource={{ uri: 'https://example.com/savings-account-photo.png' }}
    avatarSource={{ uri: 'https://example.com/jio-gold-logo.png' }}
    badgeLabel="New"
    specialBadgeLabel="Zero balance"
    title="Savings account"
    subtitle="Open in 5 minutes"
    ctaLabel="Open"
    onCtaPress={() => {}}
    accessibilityLabel="Savings account, zero balance, open in 5 minutes"
  />
</VStack>
```

_From inContext: “Open starts the screen’s own sign-up through onCtaPress; the card only shows the offer.”_

### The whole card as the one target, the guide’s Whole card state: onPress makes the card one button and cta={false} drops the Button, so the card shows no Open. The URIs stand for the offer’s photo and the brand’s logo, and onPress for the screen opening the offer.

```tsx
<ProductMerchandisingCard
  imageSource={{ uri: 'https://example.com/savings-account-photo.png' }}
  avatarSource={{ uri: 'https://example.com/jio-gold-logo.png' }}
  badgeLabel="New"
  specialBadgeLabel="Zero balance"
  title="Savings account"
  subtitle="Open in 5 minutes"
  cta={false}
  onPress={() => {}}
  accessibilityLabel="Savings account, zero balance, open in 5 minutes"
/>
```

_From states: “cta={false}: the card is the one target.”_

### A campaign, the guide’s Content example: the campaign as the title, its reward as the subtitle, Diwali and Ends Sunday as the badges, and Join as the verb. The URIs stand for the campaign’s photo and the brand’s logo, and onCtaPress for the screen joining the campaign. The accessibilityLabel is the one the guide’s code gives it (the rendered copy doesn’t show it).

```tsx
<ProductMerchandisingCard
  imageSource={{ uri: 'https://example.com/festive-rewards-photo.png' }}
  avatarSource={{ uri: 'https://example.com/jio-gold-logo.png' }}
  badgeLabel="Diwali"
  specialBadgeLabel="Ends Sunday"
  title="Festive rewards"
  subtitle="Earn 2× JioPoints on UPI"
  ctaLabel="Join"
  onCtaPress={() => {}}
  accessibilityLabel="Festive rewards, earn 2× JioPoints on UPI, ends Sunday"
/>
```

_From content: “A campaign, its reward, and Join.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `imageSource` | `ImageSourcePropType \| string` |  |  |  | types | Background media for the card. Accepts a URL string or any RN `ImageSourcePropType` (same shape as `Avatar`, `MediaCard`, etc.). The image is rendered full-bleed behind the header and glass footer. |
| `title` | `string` |  | `"Title"` |  | types | Footer title (bold, white). Default "Title", from the component source. |
| `subtitle` | `string` |  | `"Subtitle"` |  | types | Footer subtitle (muted). Default "Subtitle", from the component source. |
| `badgeLabel` | `string` |  |  |  | types | Header badge label (top-right). The badge is hidden when this is `undefined` and no `badge` override is provided. |
| `badgeIcon` | `React.ReactNode` |  |  |  | types | Optional leading node (icon/image) rendered before the header badge label, inside the badge surface. Maps to `Badge`'s `leading` slot — the same pattern as `specialBadgeIcon` for the footer badge. Ignored when a full `badge` override is supplied. Receives the lilac-badge modes so a default `Icon` is purple. |
| `badge` | `React.ReactNode` |  |  |  | types | Full override for the header badge. Takes precedence over `badgeLabel`. `null`, `false` and `''` hide the badge (same as omitting `badgeLabel`). |
| `showAvatar` | `boolean` |  | `true` |  | types | Show the header avatar (top-left). Defaults to `true`. Default true, from the component source. |
| `avatarSource` | `ImageSourcePropType \| string` |  |  |  | types | Avatar image source. |
| `avatarMonogram` | `string` |  |  |  | types | Avatar monogram fallback when no image is supplied. |
| `avatar` | `React.ReactNode` |  |  |  | types | Full override for the header avatar. Takes precedence over avatar props. `null`, `false` and `''` hide the avatar. |
| `specialBadgeLabel` | `string` |  |  |  | types | Footer "special badge" label (small frosted pill above the title). The badge is hidden when this is `undefined` and no `specialBadge` override is provided. |
| `specialBadgeIcon` | `React.ReactNode` |  |  |  | types | Optional leading node (icon/image) rendered inside the special badge. |
| `specialBadge` | `React.ReactNode` |  |  |  | types | Full override for the special badge. Takes precedence over the props above. `null`, `false` and `''` hide the pill. |
| `ctaLabel` | `string` |  | `"CTA"` |  | types | CTA button label. Defaults to `"CTA"`. Default "CTA", from the component source. |
| `onCtaPress` | `() => void` |  |  |  | types | CTA button press handler. |
| `cta` | `React.ReactNode` |  |  |  | types | Full override for the CTA. Takes precedence over `ctaLabel`/`onCtaPress`. `null`, `false` and `''` hide the button. |
| `onPress` | `() => void` |  |  |  | evidence (2026-10-20) | With onPress the card is a Pressable with role button, named accessibilityLabel or else the title, at 0.92 opacity while pressed; the Button keeps its own onCtaPress, so the two nest, a button in a button. Declared: Press handler for the whole card. When set, the card becomes pressable. |
| `height` | `number` |  | `223` |  | types | Card height in px. Defaults to `223` (Figma spec). Default 223, from the component source. |
| `modes` | `Modes` |  |  |  | types | Modes object for design-token resolution. Cascaded to default children and to `badge` / `avatar` / `specialBadge` / `cta` / icon slots. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Style overrides for the card container. |
| `accessibilityLabel` | `string` |  |  |  | types | Accessibility label for the card. Defaults to `title`. |
| `disableTruncation` | `boolean` |  |  |  | types | When `true`, disables text truncation: the trailing ellipsis (`…`) is never shown and any `numberOfLines` clamp is ignored, so the text wraps to as many lines as it needs even when horizontal space is tight. Also forwarded to the default glass special badge (not the corner badge). |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Secondary"` |  | evidence (2026-10-20) | The card gives its corner badge and its Button AppearanceBrand Secondary unless modes set one: a lilac badge with a purple label, and a purple Button. Declared: A token collection ProductMerchandisingCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `AppearanceSystem` | `mode collection` | positive, warning, negative | `"positive"` |  | types | A token collection ProductMerchandisingCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Avatar Size` | `mode collection` | L, M, S, XS | `"M"` |  | evidence (2026-10-20) | The card’s avatar is Avatar Size M, 36 px, unless modes set one. Declared: A token collection ProductMerchandisingCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Badge Size` | `mode collection` | Medium, Small | `"Medium"` |  | types | A token collection ProductMerchandisingCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / Size` | `mode collection` | M, S, XS | `"S"` |  | evidence (2026-10-20) | The card’s Button is Button / Size S, 32 px, unless modes set one. Declared: A token collection ProductMerchandisingCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / State` | `mode collection` | Idle, Hover, Pressed, Disabled | `"Idle"` |  | types | A token collection ProductMerchandisingCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection ProductMerchandisingCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context` | `mode collection` | Default, Nudge&Alert, CTACard, ListItem | `"Default"` |  | types | A token collection ProductMerchandisingCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 10` | `mode collection` | Default, jioPlus | `"Default"` |  | types | A token collection ProductMerchandisingCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context2` | `mode collection` | Default, AppBar | `"Default"` |  | types | A token collection ProductMerchandisingCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context4` | `mode collection` | Default, Chip, Button, Badge, Badge/glass | `"Default"` |  | types | A token collection ProductMerchandisingCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Emphasis` | `mode collection` | High, Medium, Low | `"High"` |  | evidence (2026-10-20) | The card gives its corner badge Emphasis Medium unless modes set one. Declared: A token collection ProductMerchandisingCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection ProductMerchandisingCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Profile Card Appearance` | `mode collection` | Default, Premium | `"Default"` |  | types | A token collection ProductMerchandisingCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Semantic Intent` | `mode collection` | Brand, System | `"Brand"` |  | types | A token collection ProductMerchandisingCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `badgeIcon` | `React.ReactNode` |  |  |  | types | Optional leading node (icon/image) rendered before the header badge label, inside the badge surface. Maps to `Badge`'s `leading` slot — the same pattern as `specialBadgeIcon` for the footer badge. Ignored when a full `badge` override is supplied. Receives the lilac-badge modes so a default `Icon` is purple. |
| `badge` | `React.ReactNode` |  |  |  | types | Full override for the header badge. Takes precedence over `badgeLabel`. `null`, `false` and `''` hide the badge (same as omitting `badgeLabel`). |
| `avatar` | `React.ReactNode` |  |  |  | types | Full override for the header avatar. Takes precedence over avatar props. `null`, `false` and `''` hide the avatar. |
| `specialBadgeIcon` | `React.ReactNode` |  |  |  | types | Optional leading node (icon/image) rendered inside the special badge. |
| `specialBadge` | `React.ReactNode` |  |  |  | types | Full override for the special badge. Takes precedence over the props above. `null`, `false` and `''` hide the pill. |
| `cta` | `React.ReactNode` |  |  |  | types | Full override for the CTA. Takes precedence over `ctaLabel`/`onCtaPress`. `null`, `false` and `''` hide the button. |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onCtaPress` | `() => void` |  |  |  | types | CTA button press handler. |
| `onPress` | `() => void` |  |  |  | types | Press handler for the whole card. When set, the card becomes pressable. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- At 328 px with both badges the header is 60 px and the footer 97, where Figma’s are 55 and 95, and the badges are 23 px against Figma’s 22 (Component Bug #356). _(evidence, 2026-10-20)_
- Figma binds a title font-weight token that the token file lacks; the code uses the body high weight token, also 700 (Component Bug #356). _(evidence, 2026-10-20)_
- Figma’s card has the booleans showBadge and showSpecialBadge; the package has neither and shows each badge only when you pass its label (Component Bug #356). _(evidence, 2026-10-20)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `(whole entry)` · human: The Product Merchandising Card guide (3f56271) and its evidence were checked on 20 October 2026 on the c7d3348 build; the installed v0.1.78-dbe0e02 has a different ProductMerchandisingCard.tsx (9e4e6ac at c7d3348, 660c1b0 at dbe0e02), changed by Biscuit's ace46ca and dbe0e02 for Component Bug #356, and the evidence's 28 October note says the guide's copy waits for #356's own publish. Read against the installed source, these sentences no longer hold, and the entry leaves them out: (1) Anatomy's Footer note “A blurred copy of the photo behind the text; no dark shade.”: a 65 px gradient from transparent to black now sits over the blur (ProductMerchandisingCard.tsx lines 331–399). (2) Configuration's “badge, avatar, specialBadge, and cta replace those parts and don’t get the card’s modes.” and the Badge icons caption “An Icon before each label; the card doesn’t colour it.”: the slots are cloned with the card's modes (45–58, 235–297), and a default Icon in badgeIcon is purple, rgb(93, 0, 181), and white in specialBadgeIcon. (3) The Badge Size Small caption “Smaller badges.”: the glass badge is pinned to Badge Size Medium (224–233, 505–513), so only the corner badge gets smaller. (4) Do & Don'ts: “White text needs a photo behind it.” and “The card has no background, so its white title disappears.”: without imageSource the card draws a #141414 surface (318–324, 377–379); “A stranger’s stock photo appears.”: without avatarSource the avatar is a monogram of avatarMonogram or else the title's first letter (248–262), and the page rendered on this build already shows “S” in that Don't; and the description's “loses its text, shows a stranger”. (5) Sources: “… and has no gradient”, “Figma darkens the footer with a black gradient, while the package draws only a blurred copy of the photo, so the white text sits on a pale haze, with a lighter band where the copy is re-cropped.”, “Badge icons and the badge, avatar, specialBadge, and cta slots don’t get the card’s modes.” and “Without avatarSource or avatarMonogram the avatar is a stock portrait, and without imageSource the card has no background.” The guide is updated when Component Bug #356 publishes (the Component Fix flow updates the guide copy a fix changed; the sentences are listed in a note on #356), then a new Agent pack ticket re-extracts. Added by Claude Code in the overnight run agentpack-r25, for Marcin to confirm. Component Bug #356.
