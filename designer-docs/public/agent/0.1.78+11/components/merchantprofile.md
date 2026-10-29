# MerchantProfile

> Coin agent pack 0.1.78+11 (pilot). Generated from `components/merchantprofile.json`; the JSON is the source of truth.

- **State:** documented
- **Package:** jfs-components 0.1.78 · guide commit `4c69058` · built 2026-10-29T04:05:26Z
- **Category:** content (for discovery only, not a limit on composition) · **Tags:** merchant header, payee, business profile, UPI merchant, shop header
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=merchantprofile) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1516-1103) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-merchantprofile--docs)

Use a Merchant Profile at the top of a payment to show who is being paid: the merchant’s logo, registered name, and UPI ID.

## Use when

- **recommended** At the top of a payment, to show who is being paid: the merchant's logo, registered name, and UPI ID.  
  _From summary: “Use a Merchant Profile at the top of a payment to show who is being paid: the merchant’s logo, registered name, and UPI ID.”_

## Avoid when

- **discouraged** A merchant header that people press: the profile has no states and doesn't press.  
  _From states: “The profile has no states: it doesn’t press.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Avatar | avatarProps: the merchant's logo, or initials with style Monogram. | yes | anatomy: “avatarProps: the merchant’s logo, or initials with style Monogram.” |
| Name | title: the registered name, 16 px Bold; it wraps. | yes | anatomy: “title: the registered name, 16 px Bold; it wraps.” |
| UPI ID | subtitle, 12 px under the name; it wraps too. | no | anatomy: “subtitle, 12 px under the name; it wraps too.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

_No slots._

## Placement

- **recommended** A payment screen opens with the merchant, so people know who they're paying before they enter the amount.  
  _From inContext: “A payment screen opens with the merchant, so people know who they’re paying before they enter the amount.”_
- **recommended** Who you're paying, before how much.  
  _From corePrinciple: “Who you’re paying, before how much.”_
- **recommended** The screen lays out the rest and sends the payment; the profile shows who is being paid.  
  _From inContext: “The screen lays out the rest and sends the payment.”_
- **recommended** The profile has no width of its own: it fills its column, keeps 16 px clear at each side, and centres its lines. Figma draws it 360 px wide.  
  _From sizing: “The profile has no width of its own: it fills its column, keeps 16 px clear at each side, and centres its lines; Figma draws it 360 px wide.”_
- **recommended** In a stretching column it fills the width; in a centring one it hugs its content.  
  _From evidence: “In a stretching column it fills the width; in a centring one it hugs its content.”_
- **recommended** With a one-line name it's 102 px tall: a 42 px avatar, 12 px, a 20 px name, 12 px, and a 16 px UPI ID.  
  _From sizing: “With a one-line name it’s 102 px tall: a 42 px avatar, 12 px, a 20 px name, 12 px, and a 16 px UPI ID.”_

## Configuration

- **recommended** `avatarProps`: avatarProps goes to the Avatar: an imageSource for the merchant's logo, or style Monogram with their initials.  
  _From configuration: “avatarProps goes to the Avatar: an imageSource for the merchant’s logo, or style Monogram with their initials.”_
- **recommended** `avatarProps`: Pass the merchant's logo, or their initials.  
  _From doDont: “Pass the merchant’s logo, or their initials.”_
- **recommended** `avatarProps`: For initials, use style Monogram with the merchant’s initials.  
  _From configuration: “or style Monogram with their initials.”_
- **discouraged** `avatarProps`: Don't leave avatarProps out: the Avatar falls back to a stranger's photo.  
  _From doDont: “The Avatar falls back to a stranger’s photo.”_
- **recommended** `Avatar Size`: Avatar Size sets the avatar, 42 px at L; no mode changes the text.  
  _From configuration: “Avatar Size sets the avatar, 42 px at L; no mode changes the text.”_
- **recommended** `Avatar Size` = `M`: Avatar Size M gives a 36 px avatar; S gives 29 px.  
  _From configuration: “A 36 px avatar; S is 29 px.”_
- **recommended** `subtitle`: Leave title or subtitle out and it shows sample text, so hide the subtitle with an empty one.  
  _From configuration: “Leave title or subtitle out and it shows sample text, so hide the subtitle with an empty one.”_
- **recommended** `subtitle`: To show just the name, pass an empty subtitle: it hides the line.  
  _From doDont: “An empty subtitle to hide it”_
- **discouraged** `subtitle`: Don't leave subtitle out to hide it: it shows the sample UPI ID, uberindia@ybl.  
  _From doDont: “It shows the sample UPI ID, uberindia@ybl.”_
- **recommended** Figma's Title and Subtitle text properties and its nested Avatar are title, subtitle, and avatarProps in the package.  
  _From sources: “The package takes title, subtitle, and avatarProps”_

## Content

- **recommended** `title`: Write title as the merchant's registered name, the one their bank holds, so people know who they're paying.  
  _From content: “Write title as the merchant’s registered name, the one their bank holds, so people know who they’re paying.”_
- **recommended** `title`: Use the company's full name, such as Uber India Systems Private Limited.  
  _From content: “The company’s full name.”_
- **recommended** `subtitle`: Start subtitle with “UPI ID:” and give the ID they're paying, so they can check it.  
  _From content: “Start subtitle with UPI ID: and give the ID they’re paying, so they can check it.”_
- **REQUIRED** `title`: Set title yourself: left out, the profile shows “Uber India Systems Private Limited”.  
  _From fact `/facts/props/0` (title, source evidence)_
- **REQUIRED** `subtitle`: Set subtitle yourself, or pass an empty one to hide the line: left out, it shows “UPI ID: uberindia@ybl”.  
  _From fact `/facts/props/1` (subtitle, source evidence)_

Good: “Jio Gold”, “UPI ID: jiogold@jio”, “Uber India Systems Private Limited”, “Amazon Pay”, “UPI ID: amazonpay@apl”

## States

| State | When | From |
| --- | --- | --- |
| Static | Always: the profile has no states; it doesn't press. | states: “The profile has no states: it doesn’t press.” |
| Long name or UPI ID | In a narrow column both lines wrap and stay centred, and neither ends in an ellipsis, though Figma cuts a long UPI ID. | states: “In a narrow column both lines wrap and stay centred, and neither ends in an ellipsis, though Figma cuts a long UPI ID.” |

## Accessibility

- **discouraged** `accessibilityLabel`: Don't rely on accessibilityLabel: it does nothing (reported).  
  _From sources: “accessibilityLabel does nothing”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| A logo or initials | No avatarProps | The Avatar falls back to a stranger’s photo. |
| An empty subtitle to hide it | Leaving subtitle out | It shows the sample UPI ID, uberindia@ybl. |

## Examples

### A payment screen opens with the merchant, the guide’s In context: Jio Gold’s logo, registered name, and UPI ID, so people know who they’re paying before they enter the amount. The screen lays out the rest (in the guide, the amount, a note and a Pay ₹1,200 button) and sends the payment. The URI stands for the merchant’s own logo.

```tsx
<MerchantProfile
  title="Jio Gold"
  subtitle="UPI ID: jiogold@jio"
  avatarProps={{ imageSource: { uri: 'https://example.com/jio-gold-logo.png' } }}
/>
```

_From inContext: “A payment screen opens with the merchant, so people know who they’re paying before they enter the amount.”_

### A merchant shown by initials: style Monogram with two letters.

```tsx
<MerchantProfile
  title="Amazon Pay"
  subtitle="UPI ID: amazonpay@apl"
  avatarProps={{ style: 'Monogram', monogram: 'AP' }}
/>
```

_From configuration: “style Monogram with two letters.”_

### Just the name: an empty subtitle hides the line (left out, it would show the sample UPI ID).

```tsx
<MerchantProfile
  title="Jio Gold"
  subtitle=""
  avatarProps={{ imageSource: { uri: 'https://example.com/jio-gold-logo.png' } }}
/>
```

_From configuration: “An empty subtitle hides the line.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `title` | `string` |  | `"Uber India Systems Private Limited"` |  | evidence (2026-10-28) | The name: 16 px Bold on a 20 px line (the package raises the token's 18), centred; it wraps. Declared: The merchant's display name or title. Default "Uber India Systems Private Limited", from the component source. |
| `subtitle` | `string` |  | `"UPI ID: uberindia@ybl"` |  | evidence (2026-10-28) | The UPI ID line: 12 px Medium on a 16 px line, centred; it wraps, with no ellipsis. Declared: Subtitle text, typically the UPI ID or additional merchant info. Default "UPI ID: uberindia@ybl", from the component source. |
| `modes` | `Modes` |  |  |  | evidence (2026-10-28) | The profile's own 12 tokens have one mode, so no mode changes the text, gap, or padding. Declared: Mode configuration passed to the token resolver. Also passed to the Avatar child component for consistent theming. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Optional style overrides for the container. |
| `avatarProps` | `Partial<AvatarProps>` |  |  |  | evidence (2026-10-28) | Spread onto the Avatar: imageSource (a logo), or style 'Monogram' with monogram. With neither, the Avatar's bundled stock photo of a person shows. Declared: Props to pass to the Avatar component. |
| `accessibilityLabel` | `string` |  |  |  | evidence (2026-10-28) | Does nothing: the root renders no label. Declared: Accessibility label for the merchant profile region. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Avatar Size` | `mode collection` | L, M, S, XS | `"L"` |  | evidence (2026-10-28) | Modes reach the Avatar: L 42 px (the default), M 36, S 29, XS 14. XS is too small for two initials. Declared: A token collection MerchantProfile reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Badge Size` | `mode collection` | Medium, Small | `"Medium"` |  | types | A token collection MerchantProfile reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection MerchantProfile reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 10` | `mode collection` | Default, jioPlus | `"Default"` |  | types | A token collection MerchantProfile reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context2` | `mode collection` | Default, AppBar | `"Default"` |  | types | A token collection MerchantProfile reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context4` | `mode collection` | Default, Chip, Button, Badge, Badge/glass | `"Default"` |  | types | A token collection MerchantProfile reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection MerchantProfile reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Profile Card Appearance` | `mode collection` | Default, Premium | `"Default"` |  | types | A token collection MerchantProfile reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

_No slots._

### Events

_No events._

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- A left-out title or subtitle shows sample text (Uber India Systems Private Limited, UPI ID: uberindia@ybl) (Component Bug #423). _(evidence, 2026-10-28)_
- The Avatar shows a stock photo until you pass a logo or initials in avatarProps (Component Bug #423). _(evidence, 2026-10-28)_
- An empty title or subtitle hides the text but keeps its 12 px gap: 86 px tall without a subtitle, 82 without a title (Component Bug #423). _(evidence, 2026-10-28)_
- avatarProps.modes replaces the profile's modes on the avatar instead of merging with them (Component Bug #423). _(evidence, 2026-10-28)_
- The name's lines are 20 px where Figma's are 18, so a two-line name is 122 px tall where Figma's is 118 (Component Bug #423). _(evidence, 2026-10-28)_
- A long UPI ID wraps where Figma cuts it with an ellipsis (Component Bug #423). _(evidence, 2026-10-28)_
- The whole profile is a heading: on the web its root is an h1 around the avatar and both lines (Component Bug #423). _(evidence, 2026-10-28)_

## Flags

_None._
