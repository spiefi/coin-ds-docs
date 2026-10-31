# Popup

> Coin agent pack 0.1.78+23 (pilot). Generated from `components/popup.json`; the JSON is the source of truth.

- **State:** documented
- **Package:** jfs-components 0.1.78 · guide commit `622cd82` · built 2026-10-31T01:50:12Z
- **Category:** layout (for discovery only, not a limit on composition) · **Tags:** bottom sheet popup, modal, promo sheet, rewards popup
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=popup) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3040-764) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-popup--docs)

Use a Popup for a short, focused moment, such as an offer or a reward, that slides up over the screen and asks for one choice.

## Use when

- **recommended** A short, focused moment, such as an offer or a reward, that slides up over the screen and asks for one choice.  
  _From summary: “Use a Popup for a short, focused moment, such as an offer or a reward, that slides up over the screen and asks for one choice.”_
- **recommended** One short message and a choice, then back to the screen.  
  _From corePrinciple: “One short message and a choice, then back to the screen.”_
- **recommended** Rewards after a payment: once the payment is done, the screen opens a rewards popup.  
  _From inContext: “After a payment the screen opens a rewards popup.”_

## Avoid when

- **discouraged** Leaving people no way out: with no Later and scrim taps off, only Escape closes it, and phones have no Escape key. Offer a way out, such as Later.  
  _From doDont: “With no Later and scrim taps off, only Escape closes it, and phones have no Escape key.”_
- **discouraged** Long content: it fills the screen, and people must scroll to reach the buttons. Keep it short.  
  _From doDont: “Long content fills the screen, and people must scroll to reach the buttons.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Trigger | Yours: any pressable (trigger). Pressing it opens the popup over the whole screen. | no | anatomy: “Yours: any pressable. Pressing it opens the popup over the whole screen.” |
| scrim | Dims the whole screen behind the sheet while the popup is open. | yes | anatomy: “Pressing it dims the whole screen with a scrim” |
| white sheet | Slides up from the bottom: white, with 20 px top corners and 24 px of space at the bottom. | yes | anatomy: “slides up a white sheet with 20 px top corners and 24 px of space at the bottom.” |
| centred stack | One centred stack of your content (children), with 8 px of padding and 8 px between items. | yes | anatomy: “The sheet holds one centred stack of your content, with 8 px of padding and 8 px between items.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `trigger` | `ReactNode` | types |
| `children` | `ReactNode` | types |

## Placement

- **recommended** Only the trigger sits in the page; the popup itself opens over the whole screen.  
  _From anatomy: “Only the trigger sits in the page.”_
- **recommended** The sheet spans the whole window, as it spans a phone screen, and grows with its content up to 90% of the window's height; taller content scrolls inside it.  
  _From sizing: “The sheet spans the whole window, as it spans a phone screen, and grows with its content up to 90% of the window's height; taller content scrolls inside it.”_
- **recommended** With short content, such as a title and two buttons, the sheet hugs it at the bottom of the screen.  
  _From sizing: “A title and two buttons: the sheet hugs them at the bottom of the screen.”_
- **recommended** It is a React Native Modal: on the web it opens over the whole browser window, never inside a frame, so the guide's examples, like Storybook's, open it from a button.  
  _From sources: “In code it’s a React Native Modal: on the web it opens over the whole browser window, never inside a frame, so these examples open it from a button, as Storybook does.”_

## Configuration

- **recommended** `trigger`: Opened by its trigger: the popup opens when its trigger is pressed and keeps its own open state.  
  _From configuration: “The popup opens when its trigger is pressed and keeps its own open state.”_
- **recommended** `open`: Opened by the screen: the screen decides when it's open (open), for example after a payment, and hears every close (onOpenChange).  
  _From configuration: “The screen decides when it's open, for example after a payment, and hears every close.”_
- **recommended** `ref`: Its ref, PopupRef, has open() and close(), which open and close the popup.  
  _From fact `/facts/props/12` (ref, source evidence)_
- **recommended** A button in the sheet closes it from inside: Later closes it; Claim would carry on with the task.  
  _From states: “Later closes it from inside; Claim would carry on with the task.”_
- **recommended** `backdropOpacity` = `0.3`: The scrim's strength is a setting, backdropOpacity: 0.3, 30% black, lets more of the page show through than the default 50%.  
  _From configuration: “30% black lets more of the page show through than the default 50%.”_
- **recommended** `closeOnBackdropPress` = `false`: With scrim taps off (closeOnBackdropPress false), a tap on the dimmed page does nothing: in the guide's example, which has a Later button, only Later or Escape closes it.  
  _From states: “Only Later or Escape closes it; a tap on the dimmed page does nothing.”_
- **recommended** `animationDuration`: The sheet springs up when it opens, but slides away over its close speed, animationDuration (250 ms by default).  
  _From sources: “it springs up but slides away over its close speed”_
- **recommended** `modes`: Modes on the popup reach its stack: Slot gap sets the space between items, and Page type the stack's padding.  
  _From configuration: “Modes on the popup reach its stack: Slot gap sets the space between items, and Page type the stack's padding.”_
- **recommended** `Slot gap` = `L`: Slot gap L puts 24 px between the title and the buttons; the default, S, is 8 px.  
  _From configuration: “Slot gap L puts 24 px between the title and the buttons; the default, S, is 8 px.”_
- **recommended** `Page type` = `SubPage`: On a sub page (Page type SubPage), or JioPlus, the stack's padding grows from 8 to 16 px, at the default Padding and Stack Context.  
  _From configuration: “On a sub page, or JioPlus, the stack's padding grows from 8 to 16 px.”_
- **recommended** `trigger`: The trigger takes the popup's modes.  
  _From sources: “the trigger takes the popup’s modes”_

## Content

- **recommended** Lead with what's in it for people, add one supporting line, then a main action and a quiet way out.  
  _From content: “Lead with what's in it for people, add one supporting line, then a main action and a quiet way out.”_
- **recommended** An offer: one headline, one line of detail, a main action such as Avail now, and a quiet way out such as Maybe later.  
  _From content: “One headline, one line of detail, Avail now, and Maybe later.”_
- **recommended** Keep it short: a title and two buttons fit any screen.  
  _From doDont: “A title and two buttons fit any screen.”_

Good: “Avail now”, “Maybe later”, “Claim”, “Later”

## States

| State | When | From |
| --- | --- | --- |
| Closed | Only the trigger shows. | states: “Closed, only the trigger shows.” |
| Opening | The scrim fades in while the sheet springs up from the bottom. | states: “Opening fades in the scrim while the sheet springs up from the bottom” |
| Open | Focus stays inside the sheet while it's open. | states: “focus stays inside while it's open” |
| Closing | A tap on the scrim, Escape, or a button in the sheet closes it: the sheet slides down and the scrim fades over 250 ms. | states: “closing slides it down and fades the scrim over 250 ms. A tap on the scrim, Escape, or a button in the sheet closes it” |

## Accessibility

- **recommended** On the web, Escape closes it, and focus moves into the sheet and stays there.  
  _From sources: “On the web Escape closes it, and focus moves into the sheet and stays there.”_
- **recommended** `accessibilityLabel`: accessibilityLabel is the dialog's accessible name; it defaults to “Popup”.  
  _From fact `/facts/props/11` (accessibilityLabel, source evidence)_
- **recommended** The scrim is never a Tab stop.  
  _From sources: “the scrim is never a Tab stop”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Offer a way out | Trap people in it | With no Later and scrim taps off, only Escape closes it, and phones have no Escape key. |
| Keep it short | Fill it with text | Long content fills the screen, and people must scroll to reach the buttons. |

## Examples

### Rewards after a payment, the guide's In context: the screen opens the popup (open) once the payment is done. Claim or Later closes it and the screen notes the choice; a tap on the dimmed page or Escape just closes it, which the screen hears through onOpenChange. A centred Title with one supporting line, then Claim and, under it, Later at Emphasis Low, the quiet way out, in a VStack that stretches to the sheet's width, as the guide builds it. The literal open and the empty handlers stand for the screen's own state.

```tsx
<Popup open onOpenChange={(open) => {}}>
  <Title title="Your rewards are waiting" subtitle="Claim your points and enjoy the benefits now." textAlign="Center" />
  <VStack style={{ alignSelf: 'stretch' }}>
    <Button label="Claim" onPress={() => {}} />
    <Button label="Later" onPress={() => {}} modes={{ Emphasis: 'Low' }} />
  </VStack>
</Popup>
```

_From inContext: “After a payment the screen opens a rewards popup. Claim or Later closes it and the screen notes the choice; a tap on the dimmed page or Escape just closes it.”_

### An offer, the guide's Content example, opened by the screen as its Opened by the screen card shows it: the screen's own Show offer button sets open to true, and Avail now or Maybe later (Emphasis Low, the quiet way out) sets it back to false; onOpenChange tells the screen about a tap on the scrim or Escape. One headline, one line of detail, then the two buttons in a VStack that stretches to the sheet's width. The literal open and the empty handlers stand for the screen's own state.

```tsx
<Button label="Show offer" onPress={() => {}} />
<Popup open onOpenChange={(open) => {}}>
  <Title title="Get 50% cashback" subtitle="On your next three bill payments this month." textAlign="Center" />
  <VStack style={{ alignSelf: 'stretch' }}>
    <Button label="Avail now" onPress={() => {}} />
    <Button label="Maybe later" onPress={() => {}} modes={{ Emphasis: 'Low' }} />
  </VStack>
</Popup>
```

_From configuration: “The screen decides when it's open, for example after a payment, and hears every close.”_

### Scrim taps off (closeOnBackdropPress false), as the guide's Scrim tap off card sets it, on a popup the screen opens: a tap on the dimmed page does nothing, so Later stays as the way out; only Later or Escape closes it, and Claim carries on with the task. The screen sets open back to false from Later, and onOpenChange tells it about Escape.

```tsx
<Popup open onOpenChange={(open) => {}} closeOnBackdropPress={false}>
  <Title title="Your rewards are waiting" subtitle="Claim your points and enjoy the benefits now." textAlign="Center" />
  <VStack style={{ alignSelf: 'stretch' }}>
    <Button label="Claim" onPress={() => {}} />
    <Button label="Later" onPress={() => {}} modes={{ Emphasis: 'Low' }} />
  </VStack>
</Popup>
```

_From states: “Only Later or Escape closes it; a tap on the dimmed page does nothing.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `open` | `boolean` |  |  |  | types | Whether the popup is open (controlled mode). |
| `defaultOpen` | `boolean` |  | `false` |  | types | Initial open state for uncontrolled mode. Default false, from the component source. |
| `onOpenChange` | `(open: boolean) => void` |  |  |  | evidence (2026-10-12) | Called by the trigger, the ref, the scrim, and Escape (web) or back (Android). Declared: Called when the open state changes. |
| `trigger` | `React.ReactElement` |  |  |  | evidence (2026-10-17) | Rendered in place before the modal and cloned with an onPress that opens the popup; it receives the popup's modes. Declared: Element that triggers the popup when pressed. Its existing onPress is preserved. |
| `children` | `React.ReactNode` |  |  |  | evidence (2026-10-12) | One slot, wrapped in a VStack with the popup's modes, centred horizontally. Declared: Slot content displayed inside the popup. |
| `modes` | `Modes` |  |  |  | types | Mode configuration for design token resolution. |
| `closeOnBackdropPress` | `boolean` |  | `true` |  | evidence (2026-10-17) | Off, a click on the scrim does nothing and Tab stays on the sheet; on, the scrim isn't a Tab stop and a click closes. Declared: Whether pressing the backdrop closes the popup. Default true, from the component source. |
| `backdropColor` | `string` |  | `"#000000"` |  | types | Backdrop overlay color. Default "#000000", from the component source. |
| `backdropOpacity` | `number` |  | `0.5` |  | evidence (2026-10-12) | The scrim's colour and opacity are props, not tokens; Overlay's scrim token is 70% black. Declared: Maximum backdrop opacity when fully visible. Default 0.5, from the component source. |
| `animationDuration` | `number` |  | `250` |  | evidence (2026-10-12) | The opening spring ignores it; the scrim fades in over it, and closing slides the sheet and fades the scrim over it (ease in-out), then unmounts. Declared: Animation duration in ms for transitions. Default 250, from the component source. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Style overrides for the popup container. |
| `accessibilityLabel` | `string` |  | `"Popup"` |  | evidence (2026-10-17) | On the web the dialog has role dialog and aria-modal true, named by accessibilityLabel (“Popup” by default). Declared: Accessible name for the dialog. Defaults to "Popup". Default "Popup", from the component source. |
| `ref` | `React.Ref<PopupRef>` |  |  |  | evidence (2026-10-12) | Popup forwards a ref of type PopupRef, with open() and close(). |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Background` | `mode collection` | False, True | `"False"` |  | types | A token collection Popup reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection Popup reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context` | `mode collection` | Default, Nudge&Alert, CTACard, ListItem | `"Default"` |  | types | A token collection Popup reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Padding` | `mode collection` | Default, None | `"Default"` |  | evidence (2026-10-12) | None removes the inner stack's padding (0). Declared: A token collection Popup reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | evidence (2026-10-12) | With Padding Default and Stack Context Root, the inner stack's padding is 8 px on MainPage and 16 px on SubPage and JioPlus. Declared: A token collection Popup reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Slot gap` | `mode collection` | S, M, L, XL, XS | `"S"` |  | evidence (2026-10-12) | The inner stack's gap: XS 2, S 8 (the default), M 16, L 24, XL 32 px; Context ListItem makes S 2. Declared: A token collection Popup reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Stack Context` | `mode collection` | Root, Nested | `"Root"` |  | evidence (2026-10-12) | Nested gives the inner stack 12 px of padding (Root: 8 px on MainPage, 16 px on SubPage and JioPlus). Declared: A token collection Popup reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `trigger` | `React.ReactElement` |  |  |  | types | Element that triggers the popup when pressed. Its existing onPress is preserved. |
| `children` | `React.ReactNode` |  |  |  | types | Slot content displayed inside the popup. |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onOpenChange` | `(open: boolean) => void` |  |  |  | types | Called when the open state changes. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- Figma's Popup has no scrim; the code adds a 50% black one from props. The #268 fix left it unchanged; the evidence records it as Marcin's call. _(evidence, 2026-10-17)_

## Flags

_None._
