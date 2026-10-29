# FullscreenModal

> Coin agent pack 0.1.78+18 (pilot). Generated from `components/fullscreenmodal.json`; the JSON is the source of truth.

- **State:** flagged (2 flags, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `e7ed622` · built 2026-10-29T10:51:06Z
- **Category:** layout (for discovery only, not a limit on composition) · **Tags:** full-screen offer, takeover, upsell screen, onboarding screen, success screen
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=fullscreenmodal) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4534-7558) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-fullscreenmodal--docs)

Use a Fullscreen Modal for a focused, full-screen moment, such as an upgrade offer, with a hero, details, and one main action.

## Use when

- **recommended** A focused, full-screen moment, such as an upgrade offer, with a hero, details and one main action.  
  _From summary: “Use a Fullscreen Modal for a focused, full-screen moment, such as an upgrade offer, with a hero, details, and one main action.”_
- **recommended** A confirmation screen: hero text and one button, with no body.  
  _From configuration: “Hero text and one button make a confirmation screen.”_

## Avoid when

_None in the guide._

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Eyebrow | A short line above the headline (eyebrow), such as the product name. | no | anatomy: “A short line above the headline, such as the product name.” |
| Headline | The heading (headline): 29 px heavy, and the modal's name for screen readers. | no | anatomy: “29 px heavy; the heading, and the modal’s name for screen readers.” |
| Supporting text | One sentence of detail (supportingText). | no | anatomy: “One sentence of detail.” |
| Price line | Optional (priceText): the price or the offer. | no | anatomy: “Optional; the price or the offer.” |
| Body | Your Sections (children), styled for the dark modal. They follow the hero and scroll. | no | anatomy: “Your Sections, styled for the dark modal.” |
| Footer | The main button (primaryActionLabel, pressed through onPrimaryAction), with an optional disclaimer. It stays at the bottom. | no | anatomy: “The main button, with an optional disclaimer.” |
| Close button | Shown when the screen handles it (onClose), which closes the modal. It floats top right. | no | anatomy: “Shown when the screen handles it, which closes the modal.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `heroMedia` | `ReactNode` | types |
| `footer` | `ReactNode` | types |
| `children` | `ReactNode` | types |

## Placement

- **recommended** It fills its screen and scrolls inside it.  
  _From sizing: “Fullscreen Modal fills its screen and scrolls inside it.”_
- **recommended** In a block parent it is as tall as its content, with no inner scroll.  
  _From evidence: “In a block parent it is as tall as its content (no inner scroll)”_
- **recommended** The hero text sits at the bottom of a 532 px space by default; the body starts 16 px below it with 16 px between Sections, and the footer stays at the bottom.  
  _From sizing: “The hero text sits at the bottom of a 532 px space by default, the body starts 16 px below it with 16 px between Sections, and the footer stays at the bottom.”_
- **recommended** The close button floats top right: 28 px, 12 px from the top and right.  
  _From sizing: “The close button is 28 px, 12 px from the top and right.”_
- **recommended** In the guide, Profile opens the offer from its JioFinance+ row. Close takes people back, Upgrade for free starts the upgrade, and the screen removes the modal either way.  
  _From inContext: “Profile opens the offer from its JioFinance+ row. Close takes people back; Upgrade for free starts the upgrade. The screen removes the modal either way.”_

## Configuration

- **recommended** Set the hero copy (eyebrow, headline, supportingText, priceText), add Sections to the body for the details, and choose the footer's button and disclaimer.  
  _From configuration: “Set the hero copy, add Sections for the details, and choose the footer’s button and disclaimer.”_
- **recommended** `heroHeight`: heroHeight sets how much space the hero text sits at the bottom of; hero media fills the width behind the hero text.  
  _From configuration: “Hero media fills the width behind the hero text, and heroHeight sets how much space the text sits at the bottom of.”_
- **recommended** `heroHeight`: A lower heroHeight brings the body up; the text stays at the bottom of its space.  
  _From configuration: “A lower heroHeight brings the body up; the text stays at the bottom of its space.”_
- **recommended** `heroMedia`: Hero media (heroMedia) fills the width at its own ratio behind the hero and the body, and scrolls with them; keep the text off light areas.  
  _From configuration: “Media fills the width at its own ratio behind the hero and the body, and scrolls with them; keep the text off light areas.”_
- **recommended** Keep the hero text on a dark background: the modal's own black surface keeps the white text readable.  
  _From doDont: “The modal’s own black surface keeps the white text readable.”_
- **discouraged** `heroMedia`: Do not put the hero text over a light photo: the white text gets lost in the image.  
  _From doDont: “The white text gets lost in the image.”_
- **recommended** `children`: Put Sections straight in the body (children): they take the modal's dark styling.  
  _From doDont: “They take the modal’s dark styling.”_
- **discouraged** `children`: Do not wrap Sections in your own component: they miss the styling and stay white cards.  
  _From doDont: “They miss the styling and stay white cards.”_
- **recommended** `primaryActionLabel`: Set primaryActionLabel for the main button: with no label and no custom footer, the modal has no footer.  
  _From evidence: “`primaryActionLabel` empty, so no footer without a label or `footer`.”_
- **recommended** `onClose`: The close button shows only when the screen handles it: set onClose, and the screen removes the modal when it's pressed.  
  _From sources: “The close button shows only when the screen handles it”_
- **recommended** `showClose`: showClose is on by default; the close button renders only when showClose and onClose are both set.  
  _From evidence: “rendered only when `showClose` and `onClose` are both set”_
- **recommended** `onPrimaryAction`: The close button and the main button only report the press (onClose, onPrimaryAction); the screen shows the modal and removes it.  
  _From states: “The screen shows it and removes it; its close button and main button only report the press.”_

## Content

- **recommended** One big moment, one main action, and always a way out.  
  _From corePrinciple: “One big moment, one main action, and always a way out.”_
- **recommended** Use the eyebrow for the product or offer, the headline for the benefit in a few words, one supporting sentence, and the price on its own line.  
  _From content: “Use the eyebrow for the product or offer, the headline for the benefit in a few words, one supporting sentence, and the price on its own line.”_
- **recommended** `primaryActionLabel`: Label the button with the action.  
  _From content: “Label the button with the action.”_
- **recommended** A line you leave unset doesn't show: every copy line is empty by default.  
  _From content: “A line you leave unset doesn’t show.”_

Good: “JioGold”, “Save in gold every month”, “Start a monthly SIP from ₹100. Buy and sell any time.”, “No making charges”, “Start a SIP”

## States

| State | When | From |
| --- | --- | --- |
| Shown | The screen shows it; the modal has no open or closed state of its own. | states: “Fullscreen Modal has no open or closed state.” |
| Removed | Close or the main button is pressed: the screen removes the modal. The buttons only report the press. | states: “Press close or Upgrade for free: the screen removes the modal.” |

## Accessibility

- **recommended** `headline`: On the web it's a dialog named by its headline, which is a heading.  
  _From sources: “On the web it’s a dialog named by its headline, which is a heading.”_
- **recommended** `headline`: Write a headline: it's the modal's heading and names it for screen readers.  
  _From doDont: “It’s the modal’s heading and names it for screen readers.”_
- **discouraged** `headline`: Do not leave the headline out: the offer has no heading, and screen readers get no name for the modal.  
  _From doDont: “The offer has no heading, and screen readers get no name for the modal.”_
- **recommended** `onClose`: With a close button (onClose), focus moves to the scrolling body, Tab cycles the body, the main button and the close button, the arrow and Page keys scroll the body, Escape closes it, and focus returns when it's removed.  
  _From sources: “When it has a close button, focus moves to its scrolling body, Tab cycles the body, the main button, and the close button, the arrow and Page keys scroll the body, Escape closes it, and focus returns when it’s removed.”_
- **recommended** `trapFocus` = `false`: trapFocus false turns that focus handling off, for a modal shown inside a page such as a preview; a modal the screen shows keeps it (the default), as In context does.  
  _From sources: “turns that off for a modal shown inside a page, as in these examples; In context, and the States example once you show it again, keep it.”_
- **recommended** `closeAccessibilityLabel`: The close button is named by closeAccessibilityLabel, Close by default.  
  _From fact `/facts/props/10` (closeAccessibilityLabel, source types)_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Keep the text on a dark background | Put the text over a light photo | The white text gets lost in the image. |
| Write a headline | Leave the headline out | The offer has no heading, and screen readers get no name for the modal. |
| Put Sections straight in the body | Wrap Sections in your own component | They miss the styling and stay white cards. |

## Examples

### An offer in four lines and one action, the guide's Content example: the eyebrow names the product, the headline gives the benefit in a few words, then one supporting sentence, the price line on its own, and a button labelled with the action. The screen shows it and removes it when close (onClose) or the main button (onPrimaryAction) is pressed.

```tsx
<FullscreenModal
  eyebrow="JioGold"
  headline="Save in gold every month"
  supportingText="Start a monthly SIP from ₹100. Buy and sell any time."
  priceText="No making charges"
  primaryActionLabel="Start a SIP"
  disclaimer="Gold prices change with the market."
  onClose={() => {}}
  onPrimaryAction={() => {}}
/>
```

_From content: “Use the eyebrow for the product or offer, the headline for the benefit in a few words, one supporting sentence, and the price on its own line.”_

### Without a body: hero text and one button make a confirmation screen. The price line and the disclaimer are left unset, so they don't show.

```tsx
<FullscreenModal
  eyebrow="JioFinance+"
  headline="You’re all set"
  supportingText="Your benefits are active on every linked account."
  primaryActionLabel="Done"
  onClose={() => {}}
  onPrimaryAction={() => {}}
/>
```

_From configuration: “Hero text and one button make a confirmation screen.”_

### With hero media, as the guide's With hero media example sets it up: an Image fills the width at its own ratio behind the hero and the body, and scrolls with them; keep the text off light areas. heroHeight 460 is the value that example gives its 328 : 223 image. The guide's Key benefits body is left out.

```tsx
<FullscreenModal
  eyebrow="JioFinance+"
  headline="Get more from your money"
  supportingText="Extra cashback, JioPoints, and JioGold every time you pay."
  priceText="₹999 a year · free until 2027"
  heroMedia={<Image imageSource="https://example.com/bank-hero.png" ratio={328 / 223} />}
  heroHeight={460}
  primaryActionLabel="Upgrade for free"
  disclaimer="We’ll check your eligibility with Experian."
  onClose={() => {}}
  onPrimaryAction={() => {}}
/>
```

_From configuration: “Media fills the width at its own ratio behind the hero and the body, and scrolls with them; keep the text off light areas.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `eyebrow` | `string` |  | `""` |  | types | Small eyebrow line above the headline. Default "", from the component source. |
| `headline` | `string` |  | `""` |  | evidence (2026-10-23) | Names the dialog on the web (aria-label) and renders as the heading. Left empty, the modal has no heading and no name. Declared: Large hero headline. Default "", from the component source. |
| `supportingText` | `string` |  | `""` |  | types | Supporting paragraph shown below the headline. Default "", from the component source. |
| `priceText` | `string` |  | `""` |  | types | Secondary line below the supporting paragraph (e.g. a price / timeline). Default "", from the component source. |
| `heroMedia` | `React.ReactNode` |  |  |  | evidence (2026-10-23) | A full-bleed background at the root, pinned to the top at the modal's width (height = width ÷ an Image's ratio), behind the hero text, the body and the footer. It adds no scroll height and moves with the scroll. Declared: Full-bleed background media for the whole modal. It is pinned to the top and laid out at the full modal width; size it with an aspect ratio (e.g. `<Image ratio={1080 / 4140} />`) so its height follows the width naturally. It renders as a single continuous background BEHIND both the hero text and the body content — there is no separate body box stacked on top of it. Bring any renderer — most commonly an `Image`, but a `LottiePlayer`, `Video`, or `SvgXml` works too. It never intercepts touches and the foreground content scrolls over it (no parallax). `modes` are cascaded into it. |
| `heroHeight` | `number` |  | `532` |  | evidence (2026-10-23) | The hero text region is 532 px tall by default, as in Figma; the package's own doc comment still says 420. Declared: Height reserved for the hero text region (eyebrow / headline / supporting / price), whose content is anchored to the bottom. Applies whether or not `heroMedia` is present. Defaults to 420. Default 532, from the component source. |
| `showClose` | `boolean` |  | `true` |  | evidence (2026-10-23) | The close button (28 × 28, 12 px from the top and right) renders only when showClose and onClose are both set. Declared: Whether to render the floating close button (top-right). Defaults to true. Default true, from the component source. |
| `closeOffsetY` | `number` |  | `0` |  | types | Additional vertical offset (in px) applied to the floating close button's top position, on top of the base inset (`12 + safe-area top`). Positive values push it further down. Defaults to 0. Default 0, from the component source. |
| `onClose` | `() => void` |  |  |  | evidence (2026-10-23) | Shows the close button. On the web, with trapFocus on (the default), a focus trap moves focus inside on mount (to the scrolling body), keeps Tab and Shift+Tab inside, calls onClose on Escape, and returns focus to the opener when the modal is removed. Without onClose it is still aria-modal but doesn't take or keep focus. Declared: Press handler for the close button. |
| `trapFocus` | `boolean` |  | `true` |  | evidence (2026-10-27) | With trapFocus false, a modal shown from the first render leaves focus on the page and Tab passes through it; Escape doesn't close it, and it is still a modal dialog. With the default, one shown at load takes focus. Declared: When `true` (default) and `onClose` is set, the modal takes focus and keeps Tab inside itself. Set `false` to show the modal in a frame or preview without a page-wide trap. Default true, from the component source. |
| `closeAccessibilityLabel` | `string` |  | `"Close"` |  | types | Accessibility label for the close button. Default "Close", from the component source. |
| `footer` | `React.ReactNode` |  |  |  | types | Fully custom footer content rendered inside the sticky `ActionFooter`. When provided, `primaryActionLabel` / `disclaimer` are ignored. |
| `primaryActionLabel` | `string` |  | `""` |  | evidence (2026-10-23) | Empty by default, so there is no footer until a label or a custom footer is given. Declared: Label for the default primary action button in the footer. Default "", from the component source. |
| `onPrimaryAction` | `() => void` |  |  |  | types | Press handler for the default primary action button. |
| `disclaimer` | `string` |  | `""` |  | types | Disclaimer text shown below the default primary action button. Default "", from the component source. |
| `children` | `React.ReactNode` |  |  |  | evidence (2026-10-10) | The modal's modes cascade into its children, through their children props, but not into a component that doesn't forward modes: a Section inside a wrapper component stays a white card with black text. Declared: Body content (typically `Section`s). `modes` are cascaded automatically. |
| `modes` | `Modes` |  |  |  | types | Mode configuration. `Page type` defaults to `'JioPlus'` (overridable here), and `context5` is always forced to `'Fullscreen Modal'` (non-overridable). The resolved modes cascade to the body, hero media, and the `ActionFooter`. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Style overrides for the outer container. |
| `contentContainerStyle` | `StyleProp<ViewStyle>` |  |  |  | types | Style overrides for the transparent body wrapper. |
| `testID` | `string` |  |  |  | types |  |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Action Footer Radius` | `mode collection` | False, True | `"False"` |  | types | A token collection FullscreenModal reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Primary"` |  | types | A token collection FullscreenModal reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `AppearanceSystem` | `mode collection` | positive, warning, negative | `"positive"` |  | types | A token collection FullscreenModal reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / Size` | `mode collection` | M, S, XS | `"M"` |  | types | A token collection FullscreenModal reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / State` | `mode collection` | Idle, Hover, Pressed, Disabled | `"Idle"` |  | types | A token collection FullscreenModal reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | evidence (2026-10-23) | The surface is black in every Color Mode. In Dark the hero text drops Color Mode and stays white. Declared: A token collection FullscreenModal reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context` | `mode collection` | Default, Nudge&Alert, CTACard, ListItem | `"Default"` |  | types | A token collection FullscreenModal reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 10` | `mode collection` | Default, jioPlus | `"Default"` |  | types | A token collection FullscreenModal reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context2` | `mode collection` | Default, AppBar | `"Default"` |  | types | A token collection FullscreenModal reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context5` | `mode collection` | Default, Fullscreen Modal, Mode 1 | `"Fullscreen Modal"` |  | evidence (2026-10-10) | Always Fullscreen Modal: the modal forces it and modes can't override it. It gives the components in the body and the footer their white-on-dark look. Declared: A token collection FullscreenModal reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Emphasis` | `mode collection` | High, Medium, Low | `"High"` |  | types | A token collection FullscreenModal reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"JioPlus"` |  | evidence (2026-10-10) | FullscreenModal sets Page type JioPlus itself, which gives the white hero text; modes can override it. Declared: A token collection FullscreenModal reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `PageHero Size` | `mode collection` | M, S | `"M"` |  | types | A token collection FullscreenModal reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Profile Card Appearance` | `mode collection` | Default, Premium | `"Default"` |  | types | A token collection FullscreenModal reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Semantic Intent` | `mode collection` | Brand, System | `"Brand"` |  | types | A token collection FullscreenModal reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Slot gap` | `mode collection` | S, M, L, XL, XS | `"S"` |  | types | A token collection FullscreenModal reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `heroMedia` | `React.ReactNode` |  |  |  | types | Full-bleed background media for the whole modal. It is pinned to the top and laid out at the full modal width; size it with an aspect ratio (e.g. `<Image ratio={1080 / 4140} />`) so its height follows the width naturally. It renders as a single continuous background BEHIND both the hero text and the body content — there is no separate body box stacked on top of it. Bring any renderer — most commonly an `Image`, but a `LottiePlayer`, `Video`, or `SvgXml` works too. It never intercepts touches and the foreground content scrolls over it (no parallax). `modes` are cascaded into it. |
| `footer` | `React.ReactNode` |  |  |  | types | Fully custom footer content rendered inside the sticky `ActionFooter`. When provided, `primaryActionLabel` / `disclaimer` are ignored. |
| `children` | `React.ReactNode` |  |  |  | types | Body content (typically `Section`s). `modes` are cascaded automatically. |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onClose` | `() => void` |  |  |  | types | Press handler for the close button. |
| `onPrimaryAction` | `() => void` |  |  |  | types | Press handler for the default primary action button. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- Figma draws the modal 1228 px tall with a full-height image behind everything; the package gives it its own black surface, so the hero text reads without media, and media you add sits behind the hero and the body. _(evidence, 2026-10-28)_
- The published Storybook predates the 27 October build the guide was checked on. _(evidence, 2026-10-28)_
- In development, React Native's Animated logs a useNativeDriver warning. _(evidence, 2026-10-10)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/avoidWhen` · trace-check: The guide gives no avoidWhen guidance; left empty rather than guessed.
- `/anatomy/4` · human: The guide fills the body with Sections ("Your Sections, styled for the dark modal."; Do & Don't "Put Sections straight in the body"), but the pack's building rules say Section exists only in code and is not part of Coin, so agents don't build with it. The entry's examples therefore have no body. Guide fix #519 asks Marcin to decide which holds. Added by Claude Code in the overnight run agentpack-batch5, for Marcin to confirm.
