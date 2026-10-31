# PageHero

> Coin agent pack 0.1.78+27 (pilot). Generated from `components/pagehero.json`; the JSON is the source of truth.

- **State:** flagged (2 flags, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `e7ed622` · built 2026-10-31T05:18:28Z
- **Category:** content (for discovery only, not a limit on composition) · **Tags:** offer header, feature header, upsell, promo hero, landing hero
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=pagehero) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4453-2348) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-pagehero--docs)

Use a Page Hero at the top of a feature or offer page: media, a short eyebrow, the offer as a headline, its price, and one action.

## Use when

- **recommended** At the top of a feature or offer page: media, a short eyebrow, the offer as a headline, its price, and one action.  
  _From summary: “Use a Page Hero at the top of a feature or offer page: media, a short eyebrow, the offer as a headline, its price, and one action.”_
- **recommended** Open an offer page with the offer: in the guide, the Digital Gold page shows the coin, what it is, and two actions, Start saving and Learn more.  
  _From inContext: “The Digital Gold page opens with the offer: the coin, what it is, and two actions, Start saving and Learn more.”_

## Avoid when

- **discouraged** A page title with search: Biscuit's Storybook page, as the evidence records it, points to HeroSection instead. Use instead: `HeroSection`.  
  _From evidence: “not a title with search (HeroSection)”_
- **discouraged** A portfolio total: Biscuit's Storybook page, as the evidence records it, points to PortfolioHero instead. Use instead: `PortfolioHero`.  
  _From evidence: “or a portfolio total (PortfolioHero)”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Media | media, in a 117 px box at Video / Output L. | no | anatomy: “media, in a 117 px box at Video / Output L.” |
| Eyebrow | eyebrow, a short category, 18 px Bold. | no | anatomy: “eyebrow, a short category, 18 px Bold.” |
| Headline | headline, 29 px Black; it wraps, centred. | no | anatomy: “headline, 29 px Black; it wraps, centred.” |
| Supporting text | supportingText, the price or term, 12 px. | no | anatomy: “supportingText, the price or term, 12 px.” |
| Body | body, a second fact; hidden until you pass it. | no | anatomy: “body, a second fact; hidden until you pass it.” |
| Action | A full-width Button, or your buttonSlot. | no | anatomy: “A full-width Button, or your buttonSlot.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `buttonSlot` | `ReactNode` | types |
| `media` | `ReactNode` | types |

## Placement

- **recommended** Everything is centred in one column: the media on top, the eyebrow and the headline, the supporting line and the body, then the button across the full width.  
  _From anatomy: “Everything is centred in one column: the media on top, the eyebrow and the headline, the supporting line and the body, then the button across the full width.”_
- **recommended** The hero fills its host's width.  
  _From sizing: “The hero fills its host’s width”_
- **recommended** The hero adds nothing above or below, so the screen gives it room.  
  _From sizing: “adds nothing above or below, so the screen gives it room”_
- **recommended** Its parts are 16 px apart and the eyebrow sits 8 px above the headline.  
  _From sizing: “Its parts are 16 px apart and the eyebrow sits 8 px above the headline.”_
- **recommended** With the default copy in a 328 px host the hero is 328 × 225, and the headline wraps to three 35 px lines.  
  _From sizing: “With the default copy in a 328 px host it is 328 × 225, and the headline wraps to three 35 px lines.”_

## Configuration

- **recommended** `media`: media takes any Coin element, such as an Image or an Icon Capsule, in a box Video / Output sizes to 117, 70 or 20 px.  
  _From configuration: “media takes any Coin element, such as an Image or an Icon Capsule, in a box Video / Output sizes to 117, 70, or 20 px”_
- **recommended** `media`: Give media something the size of its box, because the box clips the rest.  
  _From configuration: “give it something that size, because the box clips the rest.”_
- **recommended** `media`: Smaller media, such as an Icon Capsule, sits centred in the box.  
  _From configuration: “Smaller media sits centred in the box.”_
- **recommended** `Video / Output` = `M`: Video / Output M makes the media box 70 px: give it media to match.  
  _From configuration: “A 70 px box, with media to match.”_
- **recommended** `PageHero Size` = `M`: PageHero Size M: a 29 px headline, with the parts 16 px apart.  
  _From configuration: “A 29 px headline, 16 px apart.”_
- **recommended** `PageHero Size` = `S`: PageHero Size S makes the text smaller, with an 18 px headline and 12 px gaps.  
  _From configuration: “PageHero Size S makes the text smaller, with an 18 px headline and 12 px gaps”_
- **recommended** `AppearanceBrand`: The hero passes its modes to the button, so AppearanceBrand recolours it.  
  _From configuration: “The hero passes its modes to the button, so AppearanceBrand recolours it”_
- **recommended** `AppearanceBrand` = `Primary`: AppearanceBrand Primary, the default, gives the gold button.  
  _From configuration: “The gold button, the default.”_
- **recommended** `AppearanceBrand` = `Secondary`: AppearanceBrand Secondary turns the button purple; the text doesn't change.  
  _From configuration: “The button turns purple; the text doesn’t change.”_
- **recommended** `buttonSlot`: buttonSlot replaces the default button, for example with two stacked buttons.  
  _From configuration: “buttonSlot replaces it, for example with two stacked buttons.”_
- **recommended** `buttonSlot`: For two actions, as in Figma, stack two buttons in buttonSlot: High, then Medium.  
  _From configuration: “Two stacked buttons, High then Medium, as in Figma.”_
- **recommended** `Page type` = `JioPlus`: Page type JioPlus turns the text white for the JioFinance+ page's dark backdrop.  
  _From configuration: “Page type JioPlus turns the text white for the JioFinance+ page’s dark backdrop.”_
- **recommended** showEyebrow, showSupportingText, showBody and showButton hide their parts, and an empty headline hides the headline.  
  _From states: “showEyebrow, showSupportingText, showBody, and showButton hide their parts, and an empty headline hides the headline.”_
- **recommended** `body`: body shows only once you pass one.  
  _From states: “body shows only once you pass one.”_
- **recommended** `onButtonPress`: The hero doesn't press or load: its button is its only action (onButtonPress, or the buttons you put in buttonSlot).  
  _From states: “The hero doesn’t press or load; its button is its only action.”_
- **recommended** `buttonSlot`: With two actions in buttonSlot, the hero only lays them out; each button does its own thing.  
  _From inContext: “The hero only lays them out; each button does its own thing.”_
- **recommended** Figma's Page Hero shows media, the body and two stacked buttons by default; the package shows one button until you pass media, a body or a buttonSlot.  
  _From sources: “it shows media, the body, and two stacked buttons by default, where the package shows one button until you pass media, a body, or a buttonSlot.”_
- **recommended** `eyebrow`: Left out, eyebrow reads “Upgrade to JioFinance+”, its default: pass your own category, or set showEyebrow={false}.  
  _From fact `/facts/props/0` (eyebrow, source types)_
- **recommended** `headline`: Left out, headline reads “Resume earning cashback, extra points, and 1% gold”, its default: pass your own offer.  
  _From fact `/facts/props/2` (headline, source types)_
- **recommended** `supportingText`: Left out, supportingText reads “₹999/year · ₹0 until 2027”, its default: pass your own price or term, or set showSupportingText={false}.  
  _From fact `/facts/props/3` (supportingText, source types)_
- **recommended** `buttonLabel`: Left out, buttonLabel reads “Renew for free”, its default: pass your own verb, or set showButton={false}.  
  _From fact `/facts/props/7` (buttonLabel, source types)_
- **recommended** `buttonDisabled`: buttonDisabled disables the default action button; it is ignored when buttonSlot is provided.  
  _From fact `/facts/props/9` (buttonDisabled, source types)_
- **recommended** `buttonAccessibilityLabel`: buttonAccessibilityLabel is the accessibility label of the default action button; it is ignored when buttonSlot is provided.  
  _From fact `/facts/props/10` (buttonAccessibilityLabel, source types)_

## Content

- **recommended** One offer, said once, with one next step.  
  _From corePrinciple: “One offer, said once, with one next step.”_
- **recommended** Write eyebrow as a short category, such as Upgrade to JioFinance+, and headline as the offer in one sentence.  
  _From content: “Write eyebrow as a short category, such as Upgrade to JioFinance+, and headline as the offer in one sentence.”_
- **recommended** Put the price or term in supportingText and a second, different fact in body.  
  _From content: “Put the price or term in supportingText and a second, different fact in body.”_
- **discouraged** Don't repeat the price: supportingText and body that say the same sentence twice.  
  _From doDont: “supportingText and body repeat the price”_
- **recommended** `buttonLabel`: Make buttonLabel a short verb: it stays on one line and is cut off if it's too long.  
  _From content: “Make buttonLabel a short verb: it stays on one line and is cut off if it’s too long.”_
- **recommended** A long headline wraps, centred; nothing is cut off.  
  _From content: “It wraps, centred; nothing is cut off.”_

Good: “Upgrade to JioFinance+”, “Resume earning cashback, extra points, and 1% gold”, “₹999/year”, “Auto-renews · Cancel anytime”, “Renew for free”, “Start saving”, “Learn more”

## States

| State | When | From |
| --- | --- | --- |
| Offer | Eyebrow, headline, price, and button. | states: “Eyebrow, headline, price, and button.” |
| Without a button | showButton={false}: text only. | states: “showButton={false}: text only.” |
| Headline only | Every switch off but the headline. | states: “Every switch off but the headline.” |

## Accessibility

_None in the guide._

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Two different lines | The same sentence twice | supportingText and body repeat the price |
| Media sized to its box | Media bigger than its box | Video / Output M is a 70 px box, so the coin is cut off. |

## Examples

### An offer, the guide's anatomy specimen: a 117 px Image in the media box at Video / Output L, a short category as eyebrow, the offer as headline, the price in supportingText, a second, different fact in body, and one short verb on the default button. The image URL and the empty press handler stand for the app's own.

```tsx
<PageHero
  media={<Image imageSource={{ uri: 'https://example.com/gold-coin.png' }} width={117} height={117} />}
  eyebrow="Upgrade to JioFinance+"
  headline="Resume earning cashback, extra points, and 1% gold"
  supportingText="₹999/year"
  body="Auto-renews · Cancel anytime"
  buttonLabel="Renew for free"
  onButtonPress={() => {}}
/>
```

_From anatomy: “Everything is centred in one column: the media on top, the eyebrow and the headline, the supporting line and the body, then the button across the full width.”_

### The top of an offer page, the guide's In context: the Digital Gold hero with the coin, what it is, its purity and where it is stored, and two actions in buttonSlot, stacked full width in a VStack: Start saving at the defaults, then Learn more at Emphasis Medium. The hero only lays them out; each button has its own press handler. The image URL and the empty handlers stand for the app's own.

```tsx
<PageHero
  media={<Image imageSource={{ uri: 'https://example.com/gold-coin.png' }} width={117} height={117} />}
  eyebrow="Digital Gold"
  headline="Save in gold from ₹10 a day"
  supportingText="24K · 99.9% pure"
  body="Stored for free in insured vaults"
  buttonSlot={
    <VStack style={{ width: '100%' }}>
      <Button label="Start saving" onPress={() => {}} />
      <Button label="Learn more" onPress={() => {}} modes={{ Emphasis: 'Medium' }} />
    </VStack>
  }
/>
```

_From inContext: “The Digital Gold page opens with the offer: the coin, what it is, and two actions, Start saving and Learn more.”_

### A headline alone, the guide's States card “Headline only”: every switch off but the headline, so the default eyebrow, price and button don't show.

```tsx
<PageHero
  headline="You are all set"
  showEyebrow={false}
  showSupportingText={false}
  showButton={false}
/>
```

_From states: “Every switch off but the headline.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `eyebrow` | `string` |  | `"Upgrade to JioFinance+"` |  | types | Small eyebrow text shown above the headline. Default "Upgrade to JioFinance+", from the component source. |
| `showEyebrow` | `boolean` |  | `true` |  | types | Whether to render the eyebrow line. Default true, from the component source. |
| `headline` | `string` |  | `"Resume earning cashback, extra points, and 1% gold"` |  | types | Main headline text. Centered and bold. Default "Resume earning cashback, extra points, and 1% gold", from the component source. |
| `supportingText` | `string` |  | `"₹999/year · ₹0 until 2027"` |  | types | Supporting text shown directly below the headline (e.g. price). Default "₹999/year · ₹0 until 2027", from the component source. |
| `showSupportingText` | `boolean` |  | `true` |  | types | Whether to render the supporting text. Default true, from the component source. |
| `body` | `string` |  |  |  | types | Optional second supporting line shown below `supportingText`. |
| `showBody` | `boolean` |  | `true` |  | types | Whether to render the body line. Default true, from the component source. |
| `buttonLabel` | `string` |  | `"Renew for free"` |  | types | Label for the default action button. Ignored when `buttonSlot` is provided. Default "Renew for free", from the component source. |
| `onButtonPress` | `() => void` |  |  |  | types | Press handler for the default action button. Ignored when `buttonSlot` is provided. |
| `buttonDisabled` | `boolean` |  |  |  | types | Disable the default action button. Ignored when `buttonSlot` is provided. |
| `buttonAccessibilityLabel` | `string` |  |  |  | types | Accessibility label for the default action button. Ignored when `buttonSlot` is provided. |
| `showButton` | `boolean` |  | `true` |  | types | Whether to render the default action button. Ignored when `buttonSlot` is provided. Default true, from the component source. |
| `buttonSlot` | `React.ReactNode` |  |  |  | types | Optional slot to fully override the action button area (e.g. a `ButtonGroup` with several buttons). When provided, `showButton`, `buttonLabel`, `onButtonPress`, `buttonDisabled`, and `buttonAccessibilityLabel` are ignored. `modes` are automatically cascaded into this slot. |
| `media` | `React.ReactNode` |  |  |  | types | Optional media element shown above the text block (eyebrow + headline). Intentionally typed as `React.ReactNode` so the consumer can bring any renderer they like — `<Image />`, `<IconCapsule />`, a Lottie player (`LottiePlayer` / `lottie-react-native`), an `<SvgXml />` from `react-native-svg`, a `<Video />` from `react-native-video`, a gradient view, or a custom illustration. The library deliberately does NOT wrap Lottie / video runtimes (they require native modules + pod autolinking on every consumer's app), so PageHero just allocates a token-sized container and lets the slot render whatever it wants. The slot is rendered inside a `width × height` box driven by the `video/width` and `video/height` tokens from the `Video / Output` collection (`L \| M \| S` → 117 / 70 / 20; default `L` = 117×117). `modes` are automatically cascaded into the slot via `cloneChildrenWithModes`. |
| `modes` | `Modes` |  |  |  | types | Mode configuration for design-token theming. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Style overrides applied to the outer container. |
| `testID` | `string` |  |  |  | types |  |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Primary"` |  | types | A token collection PageHero reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `AppearanceSystem` | `mode collection` | positive, warning, negative | `"positive"` |  | types | A token collection PageHero reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / Size` | `mode collection` | M, S, XS | `"M"` |  | types | A token collection PageHero reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / State` | `mode collection` | Idle, Hover, Pressed, Disabled | `"Idle"` |  | types | A token collection PageHero reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection PageHero reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. Package docs: Text colors react to the `Page type` (`MainPage \| SubPage \| JioPlus`) and `Color Mode` (`Light \| Dark`) collections; type scale reacts to `PageHero Size` (`M \| S`); the media box reacts to `Video / Output` (`L \| M \| S`). |
| `Context` | `mode collection` | Default, Nudge&Alert, CTACard, ListItem | `"Default"` |  | types | A token collection PageHero reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 10` | `mode collection` | Default, jioPlus | `"Default"` |  | types | A token collection PageHero reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context2` | `mode collection` | Default, AppBar | `"Default"` |  | types | A token collection PageHero reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Emphasis` | `mode collection` | High, Medium, Low | `"High"` |  | types | A token collection PageHero reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection PageHero reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. Package docs: Text colors react to the `Page type` (`MainPage \| SubPage \| JioPlus`) and `Color Mode` (`Light \| Dark`) collections; type scale reacts to `PageHero Size` (`M \| S`); the media box reacts to `Video / Output` (`L \| M \| S`). |
| `PageHero Size` | `mode collection` | M, S | `"M"` |  | types | A token collection PageHero reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. Package docs: Text colors react to the `Page type` (`MainPage \| SubPage \| JioPlus`) and `Color Mode` (`Light \| Dark`) collections; type scale reacts to `PageHero Size` (`M \| S`); the media box reacts to `Video / Output` (`L \| M \| S`). |
| `Profile Card Appearance` | `mode collection` | Default, Premium | `"Default"` |  | types | A token collection PageHero reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Semantic Intent` | `mode collection` | Brand, System | `"Brand"` |  | types | A token collection PageHero reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Video / Output` | `mode collection` | L, M, S | `"L"` |  | types | A token collection PageHero reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. Package docs: Text colors react to the `Page type` (`MainPage \| SubPage \| JioPlus`) and `Color Mode` (`Light \| Dark`) collections; type scale reacts to `PageHero Size` (`M \| S`); the media box reacts to `Video / Output` (`L \| M \| S`). |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `buttonSlot` | `React.ReactNode` |  |  |  | types | Optional slot to fully override the action button area (e.g. a `ButtonGroup` with several buttons). When provided, `showButton`, `buttonLabel`, `onButtonPress`, `buttonDisabled`, and `buttonAccessibilityLabel` are ignored. `modes` are automatically cascaded into this slot. |
| `media` | `React.ReactNode` |  |  |  | evidence (2026-10-26) | The media element keeps its own size in the centred box and is clipped to it. Declared: Optional media element shown above the text block (eyebrow + headline). Intentionally typed as `React.ReactNode` so the consumer can bring any renderer they like — `<Image />`, `<IconCapsule />`, a Lottie player (`LottiePlayer` / `lottie-react-native`), an `<SvgXml />` from `react-native-svg`, a `<Video />` from `react-native-video`, a gradient view, or a custom illustration. The library deliberately does NOT wrap Lottie / video runtimes (they require native modules + pod autolinking on every consumer's app), so PageHero just allocates a token-sized container and lets the slot render whatever it wants. The slot is rendered inside a `width × height` box driven by the `video/width` and `video/height` tokens from the `Video / Output` collection (`L \| M \| S` → 117 / 70 / 20; default `L` = 117×117). `modes` are automatically cascaded into the slot via `cloneChildrenWithModes`. |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onButtonPress` | `() => void` |  |  |  | types | Press handler for the default action button. Ignored when `buttonSlot` is provided. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- The eyebrow and headline lines are taller than Figma's: the eyebrow's line is 22 px where Figma's is 20, and each headline line is 35 px where Figma's is 29. Still so on the installed dbe0e02 build (Component Bug #405). _(evidence, 2026-10-26)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/accessibility` · trace-check: The guide gives no accessibility guidance; left empty rather than guessed.
- `(whole entry)` · human: The Page Hero guide (e7ed622) and its evidence were checked on 26 October 2026 on the c8526ae build; the installed v0.1.78-dbe0e02 has a different PageHero.tsx (5c1d049 at c8526ae, cfcb2e6 at ace46ca and dbe0e02), changed by Biscuit's ace46ca for Component Bug #405, and the evidence's 28 October note says the guide's copy waits for #405's own publish. Read against the installed source, the token values and the guide page rendered on it (31 October), these sentences no longer hold, and the entry leaves them out: (1) Sizing's “The hero fills its host’s width and keeps 16 px clear on each side, but adds nothing above or below, so the screen gives it room.” and its title “Full width, 16 px inside”: the root no longer applies PageHero/padding/horizontal (the token is still 16), so the text and the button are as wide as the host; the entry quotes only “The hero fills its host’s width” and “adds nothing above or below, so the screen gives it room”. Sizing's “Figma’s hero has no side padding, and its eyebrow and headline lines are 20 and 29 px.” is left out too: the padding no longer differs from Figma (the line heights still do, the entry's gap from the evidence). (2) Configuration's “set Button / Size S with it, as Figma does”, the PageHero Size S card that sets both modes, and the playground note “PageHero Size S also sets Button / Size S here, as Figma does: the button doesn’t follow PageHero Size on its own.”: PageHero Size S now sets the default button, and the buttons in buttonSlot, to Button / Size S itself, and a Button / Size in modes still wins (buttonModes). (3) States' “Pass media only when you have some: media={false} still leaves an empty box.”: false, '' and null now draw no box (isRenderedSlot). (4) The first Don't caption's “as Storybook’s Default story does”: the stories' meta args set body to '' since ace46ca, so Default shows the price once; the entry quotes only “supportingText and body repeat the price”. (5) Sources: “The package adds 16 px of side padding, its eyebrow and headline lines are taller than Figma’s, PageHero Size S leaves the button at M, and Storybook’s Default story shows the price twice (all reported).”: only the line heights still hold. The evidence's Contract, Web render and Discrepancies lines for the 16 px padding (text 296 wide), “the Button stays M”, “media={false} still draws the empty box.”, “No heading role on the headline; no button disabled or label props.” and the Default story's repeated price are out of date the same way. Not in the guide or the evidence: ace46ca also made the headline a heading (accessibilityRole header, role heading on the web) and added buttonDisabled and buttonAccessibilityLabel for the default button; the entry carries the two props from the package's facts. The guide is updated when Component Bug #405 publishes (the Component Fix flow updates the guide copy a fix changed); #405 stays open only for the eyebrow and headline line heights, which wait for Marcin's call. Added by Claude Code in the overnight run agentpack-r27, for Marcin to confirm. Component Bug #405.
