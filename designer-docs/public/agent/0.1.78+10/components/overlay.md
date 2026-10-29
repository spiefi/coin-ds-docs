# Overlay

> Coin agent pack 0.1.78+10 (pilot). Generated from `components/overlay.json`; the JSON is the source of truth.

- **State:** documented
- **Package:** jfs-components 0.1.78 · guide commit `b4988c5` · built 2026-10-29T03:24:15Z
- **Category:** layout (for discovery only, not a limit on composition) · **Tags:** scrim, backdrop, dim layer, modal background
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=overlay) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2976-55) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-overlay--docs)

Use an Overlay to dim the screen behind a dialog, sheet, or drawer, so attention goes to what sits above it.

## Use when

- **recommended** Dim the screen behind a dialog, sheet or drawer, so attention goes to what sits above it.  
  _From summary: “Use an Overlay to dim the screen behind a dialog, sheet, or drawer, so attention goes to what sits above it.”_

## Avoid when

- **discouraged** Over another overlay: two overlays add up to 91% black and hide the page; use one scrim.  
  _From doDont: “Two overlays add up to 91% black and hide the page.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Scrim | The dim layer: 70% black over the whole screen; it doesn't change with mode. | yes | anatomy: “70% black over the whole screen; it doesn’t change with mode.” |
| Dismiss area | With onPress, a tap anywhere on the scrim calls it. | no | anatomy: “With onPress, a tap anywhere on the scrim calls it.” |
| Content | Yours (children), placed above the scrim; presses on it don't dismiss. | no | anatomy: “Yours, placed above the scrim; presses on it don’t dismiss.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `children` | `ReactNode` | types |

## Placement

- **recommended** `fill` = `true`: With fill on (the default), the overlay covers the nearest parent that sets a position and nothing outside it; it has no size of its own.  
  _From sizing: “With fill on, the overlay covers the nearest parent that sets a position, here the screen, and nothing outside it; it has no size of its own.”_
- **recommended** It fills its nearest positioned parent, not the device screen: place it inside the screen it dims.  
  _From sources: “In code it fills its nearest positioned parent, not the device screen”_
- **recommended** In the guide's payment confirmation, Pay completes the task and Cancel, Escape or a tap on the dimmed screen backs out; the screen removes the overlay either way.  
  _From inContext: “Pay completes it; Cancel, Escape, or a tap on the dimmed screen backs out. The screen removes the overlay either way.”_

## Configuration

- **recommended** `contentPlacement` = `center`: Centred, the default (contentPlacement center): content sits in the middle at its own width.  
  _From configuration: “The default: content sits in the middle at its own width.”_
- **recommended** `contentPlacement` = `top`: At the top: content docks to the top and stretches across the screen.  
  _From configuration: “Content docks to the top and stretches across the screen.”_
- **recommended** `contentPlacement` = `bottom`: At the bottom: content docks to the bottom and stretches across, like a sheet.  
  _From configuration: “Content docks to the bottom and stretches across, like a sheet.”_
- **recommended** `contentPlacement` = `stretch`: Stretched: content stays in the middle but spans the screen's width.  
  _From configuration: “Content stays in the middle but spans the screen’s width.”_
- **recommended** `children`: Leave the overlay empty (no children) when a sheet or drawer draws its own surface: a bare scrim.  
  _From configuration: “Leave the overlay empty when a sheet or drawer draws its own surface.”_
- **recommended** `fill` = `false`: With fill off, the overlay stays in the page's flow instead of covering its screen.  
  _From configuration: “With fill off it stays in the page’s flow instead of covering its screen.”_
- **recommended** `fill` = `false`: With fill off, the overlay is as big as its content.  
  _From sizing: “With fill off it is as big as its content.”_
- **recommended** `onPress`: Set onPress to let a tap on the scrim dismiss: the scrim calls it. Without onPress, the scrim still blocks the page but does nothing.  
  _From states: “With onPress, a tap on the scrim calls it; without, the scrim still blocks the page but does nothing.”_
- **REQUIRED** `trapFocus` = `false`: Leave trapFocus off (the default) for a regional dimmer or a scrim drawn under another surface, such as a Drawer's: several mounted overlays must not each grab the page.  
  _From fact `/facts/props/5` (trapFocus, source evidence)_
- **recommended** `modes`: Modes set on the overlay cascade to its children, merged under their own; no mode changes the scrim.  
  _From fact `/facts/props/6` (modes, source evidence)_

## Content

- **recommended** Dim the page so one thing stands out.  
  _From corePrinciple: “Dim the page so one thing stands out.”_
- **recommended** Put one small surface on the scrim, such as a confirmation with two buttons.  
  _From content: “Put one small surface on the scrim, such as a confirmation with two buttons”_
- **recommended** `onPress`: Give people a way back: a Cancel button and onPress on the scrim.  
  _From content: “give people a way back: a Cancel button and onPress on the scrim.”_
- **recommended** For a confirmation: one question, one main action, and Cancel.  
  _From content: “One question, one main action, and Cancel.”_
- **recommended** Dim the page, and always offer a way back.  
  _From doDont: “Dim the page, and always offer a way back”_
- **discouraged** `onPress`: Do not leave people without a way back: without onPress or Cancel, only finishing the task closes the overlay.  
  _From doDont: “Without onPress or Cancel, only finishing the task closes it.”_

Good: “Confirm payment”, “₹250 to Ravi Stores”, “Pay”, “Cancel”, “Cancel payment”

## States

| State | When | From |
| --- | --- | --- |
| Shown | The screen shows the overlay by rendering it; it appears at once, with no fade. | states: “The screen shows an overlay by rendering it and hides it by removing it; it appears and goes at once, with no fade.” |
| Tap to dismiss | With onPress: a tap on the dimmed page hides it. | states: “A tap on the dimmed page hides it” |
| Blocking | Without onPress: taps on the dimmed page do nothing, and the page underneath can't be pressed. | states: “Taps on the dimmed page do nothing, and the page underneath can’t be pressed.” |
| Dialog | With trapFocus it's a dialog: on the web focus moves inside, Tab stays there, and Escape calls onPress. | states: “With trapFocus it’s a dialog: on the web focus moves inside, Tab stays there, and Escape calls onPress.” |
| Hidden | The screen removes the overlay: nothing is drawn, and the page is bright and can be pressed. | states: “Nothing is drawn: the page is bright and can be pressed.” |

## Accessibility

- **recommended** `trapFocus` = `true`: When the overlay is the dialog, as in the guide's payment confirmation, set trapFocus: on the web focus moves inside, Tab stays there, and Escape calls onPress.  
  _From states: “With trapFocus it’s a dialog: on the web focus moves inside, Tab stays there, and Escape calls onPress.”_
- **recommended** `dismissAccessibilityLabel`: When it's a dialog (trapFocus), name it for screen readers with dismissAccessibilityLabel, such as “Cancel payment”; the default is “Dismiss overlay”.  
  _From content: “When it’s a dialog (trapFocus), name it for screen readers with dismissAccessibilityLabel, such as “Cancel payment”; the default is “Dismiss overlay”.”_
- **recommended** `trapFocus` = `true`: With trapFocus the overlay is a modal dialog named by dismissAccessibilityLabel; when several such overlays are shown, only the newest holds focus.  
  _From sources: “With trapFocus the overlay is a modal dialog named by dismissAccessibilityLabel: focus moves inside, Tab stays inside, and Escape calls onPress, and only the newest such overlay holds focus.”_
- **recommended** `trapFocus` = `true`: When a trapFocus overlay is removed, focus returns to the control that opened it.  
  _From evidence: “focus returns to the opener when it's removed”_
- **recommended** `trapFocus` = `false`: Without trapFocus, as for a dimmed region or a Drawer's scrim, the overlay leaves focus alone.  
  _From sources: “Without it, as for a dimmed region or Drawer’s scrim, it leaves focus alone”_
- **recommended** On the web the scrim is never a Tab stop.  
  _From sources: “On the web the scrim is never a Tab stop.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Offer a way back | Leave no way back | Without onPress or Cancel, only finishing the task closes it. |
| Use one scrim | Stack scrims | Two overlays add up to 91% black and hide the page. |

## Examples

### Confirming a payment, the guide's In context dialog: the overlay dims the screen and holds a dialog that keeps keyboard focus (trapFocus), named “Cancel payment”. As in the guide, the Card is white (AppearanceBrand Neutral), its buttons set AppearanceBrand Primary because a Card passes its modes to its children, and Cancel is the low-emphasis way out (Emphasis Low). Pay completes it; Cancel, Escape or a tap on the scrim backs out, and the screen removes the overlay either way.

```tsx
<Overlay
  trapFocus
  dismissAccessibilityLabel="Cancel payment"
  onPress={() => {}}
>
  <Card modes={{ AppearanceBrand: 'Neutral' }} style={{ margin: 16 }}>
    <Title title="Confirm payment" subtitle="₹250 to Ravi Stores" numberOfLines={2} />
    <ButtonGroup>
      <Button label="Pay" onPress={() => {}} modes={{ AppearanceBrand: 'Primary' }} />
      <Button label="Cancel" onPress={() => {}} modes={{ AppearanceBrand: 'Primary', Emphasis: 'Low' }} />
    </ButtonGroup>
  </Card>
</Overlay>
```

_From inContext: “Pay ₹250 dims Home and asks for confirmation in a dialog that holds keyboard focus (trapFocus).”_

### The same confirmation docked to the bottom (contentPlacement bottom): it stretches across the screen, like a sheet. Shown on a screen as a dialog, it sets trapFocus and its name, as the guide's Content says for a dialog; the guide's own At the bottom preview leaves trapFocus off, since on that page only the In context dialog uses it.

```tsx
<Overlay
  contentPlacement="bottom"
  trapFocus
  dismissAccessibilityLabel="Cancel payment"
  onPress={() => {}}
>
  <Card modes={{ AppearanceBrand: 'Neutral' }} style={{ margin: 16 }}>
    <Title title="Confirm payment" subtitle="₹250 to Ravi Stores" numberOfLines={2} />
    <ButtonGroup>
      <Button label="Pay" onPress={() => {}} modes={{ AppearanceBrand: 'Primary' }} />
      <Button label="Cancel" onPress={() => {}} modes={{ AppearanceBrand: 'Primary', Emphasis: 'Low' }} />
    </ButtonGroup>
  </Card>
</Overlay>
```

_From configuration: “Content docks to the bottom and stretches across, like a sheet.”_

### A bare scrim: only the dim layer, for a sheet or drawer that draws its own surface; a tap on it calls onPress. It leaves trapFocus off, since it is a scrim drawn under another surface.

```tsx
<Overlay onPress={() => {}} />
```

_From configuration: “Leave the overlay empty when a sheet or drawer draws its own surface.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types | Content rendered on top of the scrim. `modes` are cascaded to every child via {@link cloneChildrenWithModes}. When omitted the overlay renders as a bare backdrop. |
| `contentPlacement` | `'center' \| 'top' \| 'bottom' \| 'stretch'` | center, stretch, top, bottom | `"center"` |  | evidence (2026-10-12) | center: content centred at its own width; top and bottom: docked to that edge and stretched across; stretch: centred vertically and stretched across. Declared: How `children` are positioned within the overlay. - `center` (default): centers content both axes - `top` / `bottom`: pins content to the top/bottom edge - `stretch`: stretches content to fill the overlay. Default "center", from the component source. |
| `onPress` | `() => void` |  |  |  | evidence (2026-10-12) | With onPress, a full-size scrim under the content calls it, so presses on the content don't dismiss; without it the scrim is inert but still blocks presses to the page. Declared: Called when the scrim (the area outside `children`) is pressed. Typically used to dismiss the overlaid surface. When omitted the backdrop is inert. |
| `dismissAccessibilityLabel` | `string` |  | `"Dismiss overlay"` |  | evidence (2026-10-23) | Names the dialog when trapFocus is set (accessibilityLabel wins when it is set). Without trapFocus it stays the label of the scrim with onPress, which is hidden from screen readers and is not a Tab stop. Declared: Accessible name for the scrim when it dismisses. Defaults to "Dismiss overlay". The dialog uses `accessibilityLabel` when that is set. Default "Dismiss overlay", from the component source. |
| `fill` | `boolean` |  | `true` |  | evidence (2026-10-12) | true: an absolute fill of the nearest positioned parent (on the web every React Native View is positioned), not the viewport. false: in the page's flow, sized by its content or style. Declared: When `true` (default) the overlay covers its parent via `StyleSheet.absoluteFill`. Set to `false` to lay it out in normal flow (driven by `style`). Default true, from the component source. |
| `trapFocus` | `boolean` |  | `false` |  | evidence (2026-10-23) | Only with trapFocus is the overlay a dialog: role dialog and aria-modal on the web (accessibilityViewIsModal on native), named accessibilityLabel ?? dismissAccessibilityLabel. On the web focus moves inside on mount, Tab and Shift+Tab stay inside, Escape calls onPress, and focus returns to the opener when it's removed; only the newest mounted trapFocus overlay handles Tab and Escape. Without it the overlay doesn't move focus, trap Tab or take a dialog role. Declared: When `true`, this overlay is a modal dialog: it takes focus and keeps Tab inside itself. Leave this off for a regional dimmer or a scrim drawn under another surface (Drawer `showOverlay`). Several mounted overlays must not each grab the page. Default false, from the component source. |
| `modes` | `Modes` |  |  |  | evidence (2026-10-12) | Cascade to the children, merged under their own modes. The scrim reads one token, overlay/background (rgba(0, 0, 0, 0.7)), the same in every mode. Declared: Mode configuration passed to the token resolver and cascaded to children. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types |  |
| `...Omit<ViewProps, 'children' | 'style'>` | `Omit<ViewProps, 'children' \| 'style'>` |  |  |  | types | Inherited React Native props the component also accepts. They are not part of the design contract and no guide documents them. |

### Modes

_No modes._

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types | Content rendered on top of the scrim. `modes` are cascaded to every child via {@link cloneChildrenWithModes}. When omitted the overlay renders as a bare backdrop. |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onPress` | `() => void` |  |  |  | types | Called when the scrim (the area outside `children`) is pressed. Typically used to dismiss the overlaid surface. When omitted the backdrop is inert. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- Figma's Overlay is a 70% black fill with no properties: placement, content, fill and tap to dismiss exist only in code. _(evidence, 2026-10-23)_
- The published Storybook predates the 23 October build the guide was checked on. _(evidence, 2026-10-23)_

## Flags

_None._
