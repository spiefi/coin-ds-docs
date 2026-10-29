# Nudge

> Coin agent pack 0.1.78+8 (pilot). Generated from `components/nudge.json`; the JSON is the source of truth.

- **State:** flagged (1 flag, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `9a7d2c4` · built 2026-10-29T01:27:42Z
- **Category:** feedback (for discovery only, not a limit on composition) · **Tags:** promo card, suggestion, tip, upsell, banner
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=nudge) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=9177-4104) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-nudge--docs)

Use a Nudge for a short suggestion with one action, such as splitting a payment, that sits within a screen’s content.

## Use when

- **recommended** A short suggestion with one action, such as splitting a payment, that sits within a screen's content.  
  _From summary: “Use a Nudge for a short suggestion with one action, such as splitting a payment, that sits within a screen’s content.”_

## Avoid when

_None in the guide._

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Icon | The startSlot: a 20 px sparkle by default; it can be swapped or removed. | no | anatomy: “A 20 px sparkle by default; it can be swapped or removed.” |
| Title | title, 14 px bold; says what's on offer in a line. | no | anatomy: “14 px bold; says what’s on offer in a line.” |
| Body | body, 12 px; one sentence of detail. | no | anatomy: “12 px; one sentence of detail.” |
| Button | The one next step, as a small pill (buttonLabel and onPressButton, or buttonSlot). | no | anatomy: “The one next step, as a small pill.” |
| Card | The surface, tinted by its appearance mode, with 12 px padding. | yes | anatomy: “Tinted by its appearance mode, with 12 px padding.” |
| Close button | An X on the right (showClose, onClose); the screen removes the nudge when it's pressed. | no | configuration: “Adds an X on the right. The screen removes the nudge when it’s pressed.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `buttonSlot` | `ReactNode` | types |
| `closeSlot` | `ReactNode` | types |
| `startSlot` | `ReactNode` | types |
| `children` | `ReactNode` | types |

## Placement

- **recommended** A Nudge fills its container: full width, and as tall as its content.  
  _From sizing: “A Nudge fills its container.”_
- **recommended** Long copy wraps and the card grows.  
  _From sizing: “Long copy wraps and the card grows.”_
- **recommended** On the guide's payment screen, the nudge sits between the amount and the Pay button, in a lavender appearance that stands out on the white card.  
  _From inContext: “The nudge sits between the amount and the Pay button, in a lavender appearance that stands out on the white card.”_
- **recommended** `onClose`: The screen handles the nudge's button and removes the nudge on close.  
  _From inContext: “The screen handles its button and removes it on close.”_

## Configuration

- **recommended** `type`: Choose the type for the space and content you have, and an appearance mode for its colour.  
  _From configuration: “Choose the type for the space and content you have, and an appearance mode for its colour.”_
- **recommended** `type` = `stacked-prominent`: stacked-prominent, the default: a title and body stacked beside the icon, the button below.  
  _From configuration: “The default: a title and body stacked beside the icon, the button below.”_
- **recommended** `type` = `inline-compact`: inline-compact: one line of text with the button beside it; it has no title.  
  _From configuration: “One line of text with the button beside it. It has no title.”_
- **recommended** `type` = `stacked-detailed`: stacked-detailed: a title over your own content, such as list items; no button or close.  
  _From configuration: “A title over your own content, such as list items. No button or close.”_
- **recommended** `type` = `stacked-detailed`: Use stacked-detailed for a list: a title over list items explains the offer.  
  _From doDont: “A title over list items explains the offer.”_
- **discouraged** `type` = `stacked-detailed`: Do not expect an action on stacked-detailed: it ignores the button and close, so people have nothing to tap.  
  _From doDont: “It ignores the button and close, so people have nothing to tap.”_
- **recommended** `showClose` = `true`: Show the close button when people may dismiss the nudge.  
  _From configuration: “Add a close button when people may dismiss it”_
- **REQUIRED** `showClose`: On stacked-prominent and inline-compact, the close button shows only when onClose is set or showClose is true; showClose false hides it even with onClose, and stacked-detailed never renders it.  
  _From fact `/facts/props/7` (showClose, source evidence)_
- **REQUIRED** `buttonLabel`: The default button renders when buttonLabel or onPressButton is set; buttonSlot set to null removes it.  
  _From fact `/facts/props/3` (buttonLabel, source types)_
- **recommended** `Context` = `Nudge&Alert`: Leave Context to the Nudge: it sets the Nudge&Alert context itself, so its button is Figma's small size.  
  _From configuration: “Nudge sets the Nudge&Alert context itself, so its button is Figma’s small size.”_
- **discouraged** `Context` = `Default`: Do not pass another Context on the Nudge or through a container around it: a Default Context makes the button 42 px, and it outweighs the message.  
  _From doDont: “A Default Context, set here or passed down by a container, makes the button 42 px; it outweighs the message.”_
- **recommended** `startSlot` = `null`: Remove the sparkle when the message needs no accent: set startSlot to null.  
  _From configuration: “Remove the sparkle when the message needs no accent.”_
- **recommended** `AppearanceBrand`: AppearanceBrand tints the card, body, icon and button together.  
  _From configuration: “AppearanceBrand tints the card, body, icon, and button together.”_
- **recommended** `AppearanceBrand` = `Neutral`: Figma's white card with a purple icon matches no single appearance mode; Neutral is the closest.  
  _From sources: “Figma’s white card with a purple icon matches no single appearance mode; Neutral is the closest.”_
- **recommended** `Semantic Intent` = `System`: Semantic Intent System colours the card for a status: positive, warning or negative (AppearanceSystem).  
  _From configuration: “System intent colours the card for a status: positive, warning, or negative.”_
- **recommended** `Border Boolean` = `True`: Border Boolean True adds a 1 px grey border that separates a white card from a white screen.  
  _From configuration: “A 1 px grey border separates a white card from a white screen.”_
- **recommended** `children`: children replaces the title, body and button in stacked-prominent, the body and button in inline-compact, and supplies the list in stacked-detailed.  
  _From evidence: “`children` (replaces title, body, and button in prominent; body and button in compact; the list in detailed)”_

## Content

- **recommended** One helpful suggestion, one clear next step.  
  _From corePrinciple: “One helpful suggestion, one clear next step.”_
- **recommended** `title`: Write the title as the benefit.  
  _From content: “Write the title as the benefit, the body as one sentence of detail, and the button as a verb or two.”_
- **recommended** `body`: Write the body as one sentence of detail.  
  _From content: “Write the title as the benefit, the body as one sentence of detail, and the button as a verb or two.”_
- **recommended** `buttonLabel`: Write the button label as a verb or two.  
  _From content: “Write the title as the benefit, the body as one sentence of detail, and the button as a verb or two.”_
- **recommended** Set the title, body and button label yourself: Nudge has no copy of its own, and the title also names the card for screen readers.  
  _From content: “Nudge has no copy of its own, so set all three; the title also names the card for screen readers.”_
- **recommended** Write your own copy: the title, body and button say what's on offer.  
  _From doDont: “The title, body, and button say what’s on offer.”_

Good: “Turn on autopay”, “Pay your electricity bill on time, every month.”, “Turn on”, “Split payment”, “Pay ₹12,000 in 3 monthly instalments.”, “See plans”

## States

| State | When | From |
| --- | --- | --- |
| Default | The card isn't interactive; its button and close button have their own pressed and focus states. | states: “The card isn’t interactive. Its button and close button have their own pressed and focus states.” |
| Close removes it | Pressing the X calls onClose and the screen hides the nudge: Nudge has no hidden state of its own. | states: “Nudge has no hidden state: after a close, the screen removes it.” |

## Accessibility

- **recommended** `title`: Give a stacked card a title: on the web a card with a title is a region named by its title (inline-compact shows no title).  
  _From sources: “On the web a card with a title is a region named by its title”_
- **recommended** Set onPressButton for the button and onClose for the close button: Enter and Space activate them only when those are set, and without them the button is focusable but does nothing.  
  _From evidence: “Enter and Space activate them only when `onPressButton` / `onClose` are set; without them the button is focusable but does nothing.”_
- **recommended** `closeAccessibilityLabel`: The close button's label for screen readers can be changed with closeAccessibilityLabel.  
  _From sources: “its label for screen readers can be changed.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Keep Nudge’s own context | Pass another Context | A Default Context, set here or passed down by a container, makes the button 42 px; it outweighs the message. |
| Write your own copy | Leave the copy out | Nudge has no placeholder: without copy it’s an empty card with a sparkle and no button. |
| Use stacked detailed for a list | Expect an action on stacked detailed | It ignores the button and close, so people have nothing to tap. |

## Examples

### A split-payment suggestion on a payment screen, in a lavender appearance; the screen handles the button and removes the nudge on close.

```tsx
<Nudge
  title="Split payment"
  body="Pay ₹12,000 in 3 monthly instalments."
  buttonLabel="See plans"
  onPressButton={() => {}}
  onClose={() => {}}
  modes={{ 'Color Mode': 'Light', AppearanceBrand: 'Secondary' }}
/>
```

_From inContext: “The screen handles its button and removes it on close.”_

### Inline compact, with no close button: one line of text with the button beside it.

```tsx
<Nudge
  type="inline-compact"
  body="Set up autopay so you never miss a bill."
  buttonLabel="Set up"
  onPressButton={() => {}}
  showClose={false}
  modes={{ 'Color Mode': 'Light' }}
/>
```

_From configuration: “One line of text with the button beside it. It has no title.”_

### Stacked detailed: a title over list items, with no button or close.

```tsx
<Nudge type="stacked-detailed" title="Why split this payment?" modes={{ 'Color Mode': 'Light' }}>
  <ListItem layout="Horizontal" title="No extra cost" supportText="You pay ₹12,000 in total" modes={{ 'Color Mode': 'Light' }} />
  <ListItem layout="Horizontal" title="Three monthly payments" supportText="₹4,000 on the 5th of each month" modes={{ 'Color Mode': 'Light' }} />
</Nudge>
```

_From doDont: “A title over list items explains the offer.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `type` | `NudgeType` | stacked-prominent, stacked-detailed, inline-compact | `"stacked-prominent"` |  | types | Controls the layout type. - "stacked-prominent": icon + title/body/button content - "inline-compact": icon + body/button in one row - "stacked-detailed": header + children detail slot. Default "stacked-prominent", from the component source. |
| `title` | `string` |  | `""` |  | evidence (2026-10-17) | On the web, with a title the card is a region named by the title; without one it has no role. Declared: Title text displayed in the nudge. Empty when omitted. Default "", from the component source. |
| `body` | `string` |  | `""` |  | types | Body text displayed in prominent and compact types when no children are provided. Empty when omitted. Default "", from the component source. |
| `buttonLabel` | `string` |  |  |  | types | Label for the default button. The default button renders only when this or `onPressButton` is set. `buttonSlot={null}` removes it. |
| `onPressButton` | `() => void` |  |  |  | types | Callback for the default button press. Also opts into the default button. |
| `buttonSlot` | `React.ReactNode` |  |  |  | evidence (2026-10-17) | null or false removes the button, leaving the title and body. Declared: Custom button slot. `null` or `false` removes the button. Omit to use `buttonLabel` / `onPressButton` when one of those is set. |
| `onClose` | `() => void` |  |  |  | evidence (2026-10-07) | Only reports the press; the screen removes the nudge. Declared: Called when the default close IconButton is pressed. When set, the close button is shown unless `showClose` is false. |
| `showClose` | `boolean` |  |  |  | evidence (2026-10-17) | Since a116616 (the #271 fix), Close renders only when onClose is set or showClose is true, and showClose false hides it even with onClose. Declared: Show the trailing close button on `stacked-prominent` and `inline-compact`. When omitted, the button shows only if `onClose` is set. Pass true to force it, or false to hide it. `stacked-detailed` never renders it. |
| `closeAccessibilityLabel` | `string` |  | `"Close"` |  | types | Accessible name for the default close button. Default "Close", from the component source. |
| `closeSlot` | `React.ReactNode` |  |  |  | evidence (2026-10-07) | Replaces the default close, an IconButton ic_close labelled “Close” with forced Neutral / Low / S modes. Declared: Custom close slot, overrides the default close IconButton. |
| `startSlot` | `React.ReactNode \| false` |  |  |  | types | Optional leading slot. Omit for the token-driven sparkle icon, pass null/false to hide. |
| `children` | `React.ReactNode` |  |  |  | evidence (2026-10-07) | Replaces the title, body and button in stacked-prominent; the body and button in inline-compact; the list in stacked-detailed. Declared: Content slot — overrides default content, or provides detailed list content. |
| `modes` | `Modes` |  |  |  | evidence (2026-10-07) | Slot children get the Nudge's modes. Declared: Mode configuration for design token resolution. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Optional container style overrides. |
| `testID` | `string` |  |  |  | types | Test id for the card. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Primary"` |  | types | A token collection Nudge reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `AppearanceSystem` | `mode collection` | positive, warning, negative | `"positive"` |  | types | A token collection Nudge reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Border Boolean` | `mode collection` | False, True | `"False"` |  | evidence (2026-10-07) | True adds a #ebebed border. Declared: A token collection Nudge reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / Size` | `mode collection` | M, S, XS | `"M"` |  | types | A token collection Nudge reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / State` | `mode collection` | Idle, Hover, Pressed, Disabled | `"Idle"` |  | types | A token collection Nudge reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection Nudge reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context` | `mode collection` | Default, Nudge&Alert, CTACard, ListItem | `"Default"` |  | evidence (2026-10-17) | When the merged modes have no Context, Nudge sets Nudge&Alert itself (Figma's small button). A Default Context, on the Nudge or on a container whose modes reach it, gives a 42 px button. Declared: A token collection Nudge reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 10` | `mode collection` | Default, jioPlus | `"Default"` |  | types | A token collection Nudge reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context2` | `mode collection` | Default, AppBar | `"Default"` |  | types | A token collection Nudge reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Emphasis` | `mode collection` | High, Medium, Low | `"High"` |  | types | A token collection Nudge reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Nudge padding` | `mode collection` | Default, None | `"Default"` |  | types | A token collection Nudge reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection Nudge reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Profile Card Appearance` | `mode collection` | Default, Premium | `"Default"` |  | types | A token collection Nudge reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Semantic Intent` | `mode collection` | Brand, System | `"Brand"` |  | types | A token collection Nudge reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Slot gap` | `mode collection` | S, M, L, XL, XS | `"S"` |  | types | A token collection Nudge reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `buttonSlot` | `React.ReactNode` |  |  |  | types | Custom button slot. `null` or `false` removes the button. Omit to use `buttonLabel` / `onPressButton` when one of those is set. |
| `closeSlot` | `React.ReactNode` |  |  |  | types | Custom close slot, overrides the default close IconButton. |
| `startSlot` | `React.ReactNode \| false` |  |  |  | types | Optional leading slot. Omit for the token-driven sparkle icon, pass null/false to hide. |
| `children` | `React.ReactNode` |  |  |  | types | Content slot — overrides default content, or provides detailed list content |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onPressButton` | `() => void` |  |  |  | types | Callback for the default button press. Also opts into the default button. |
| `onClose` | `() => void` |  |  |  | types | Called when the default close IconButton is pressed. When set, the close button is shown unless `showClose` is false. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- In Color Mode Dark the title stays #1e1a14 on a dark card (#208): the title colour is one literal for every mode. _(evidence, 2026-10-17)_
- No appearance mode reproduces Figma's white card with a purple icon. _(evidence, 2026-10-17)_
- inline-compact never shows the title, but still uses it as the region's name, an invisible name. _(evidence, 2026-10-17)_
- onPressButton without buttonLabel renders an empty, unnamed button. _(evidence, 2026-10-17)_
- The sparkle icon isn't hidden from assistive tech on the web. _(evidence, 2026-10-17)_
- Nothing is announced and focus is not managed when a nudge is removed. _(evidence, 2026-10-07)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/avoidWhen` · trace-check: The guide gives no avoidWhen guidance; left empty rather than guessed.
