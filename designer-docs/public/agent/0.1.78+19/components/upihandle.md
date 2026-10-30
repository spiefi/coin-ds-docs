# UpiHandle

> Coin agent pack 0.1.78+19 (pilot). Generated from `components/upihandle.json`; the JSON is the source of truth.

- **State:** documented
- **Package:** jfs-components 0.1.78 · guide commit `3f56271` · built 2026-10-30T12:30:13Z
- **Category:** content (for discovery only, not a limit on composition) · **Tags:** UPI ID, VPA, payment address, handle
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=upihandle) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=262-893) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-upihandle--docs)

Use a UPI Handle to show a UPI ID or number that people can recognise, copy, or scan, with an optional avatar.

## Use when

- **recommended** Show a UPI ID or number that people can recognise, copy, or scan, with an optional avatar.  
  _From summary: “Use a UPI Handle to show a UPI ID or number that people can recognise, copy, or scan, with an optional avatar.”_
- **recommended** Confirm the payee on a payment screen.  
  _From inContext: “Confirm the payee”_

## Avoid when

- **discouraged** Several IDs in one UPI Handle: people can't tell which ID they copied. Give each ID its own UPI Handle.  
  _From doDont: “People can’t tell which ID they copied.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Avatar | Optional photo or logo; it shows only when a source is set. | no | anatomy: “Optional photo or logo; it shows only when a source is set.” |
| Handle | The UPI ID or number, on one line. | yes | anatomy: “The UPI ID or number, on one line.” |
| Action icon | Optional cue for what pressing does: copy or scan. | no | anatomy: “Optional cue for what pressing does: copy or scan.” |
| Background | Grey rounded surface that hugs its content. | yes | anatomy: “Grey rounded surface that hugs its content.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

_No slots._

## Placement

- **recommended** `onPress`: Let the screen do the work: it copies the handle or opens the payment when the UPI Handle is pressed; the UPI Handle only reports the press, through onPress.  
  _From inContext: “The screen copies the handle or opens the payment when pressed; the UPI Handle only reports the press.”_
- **recommended** Leave room for the whole ID: when space runs out, a long handle ends in an ellipsis.  
  _From sizing: “When space runs out, a long handle ends in an ellipsis, so leave room for the whole ID.”_

## Configuration

- **recommended** `onPress`: Show the real handle and put its action on the UPI Handle itself, through onPress.  
  _From corePrinciple: “Show the real handle and put its action on the UPI Handle.”_
- **recommended** `source`: Add an avatar (source) when a photo or logo helps people recognise the account.  
  _From configuration: “Add an avatar when a photo or logo helps people recognise the account.”_
- **recommended** `source`: Leave source out where a name is already shown: without an avatar the UPI Handle pads evenly.  
  _From configuration: “The UPI Handle pads evenly; use it where a name is already shown.”_
- **recommended** `UPI Handle Image`: Show or hide the avatar with source alone: a source shows it and sets UPI Handle Image to True; no source hides it and sets False, overriding any UPI Handle Image value in modes. The avatar is not tinted; the source renders as-is.  
  _From fact `/facts/props/4` (source, source types)_
- **recommended** `iconName`: Choose the icon for the action the UPI Handle performs, or none when it only shows the handle.  
  _From configuration: “Choose the icon for the action the UPI Handle performs, or none when it only shows the handle.”_
- **recommended** `iconName` = `ic_copy`: iconName defaults to ic_scan_qr_code, a scan icon: set iconName="ic_copy" wherever the UPI Handle copies.  
  _From sources: “The package defaults to a scan icon, so this guide sets the copy icon wherever the UPI Handle copies.”_
- **recommended** `iconName` = `ic_scan_qr_code`: Scan icon (ic_scan_qr_code): for a handle people scan to pay.  
  _From configuration: “For a handle people scan to pay.”_
- **recommended** `showIcon` = `false`: No icon (showIcon false): display only, nothing to press.  
  _From configuration: “Display only: nothing to press.”_
- **recommended** `style`: style constrains the UPI Handle: a long handle truncates inside that box (the guide's Sizing example limits it to 140 px).  
  _From fact `/facts/props/11` (style, source types)_

## Content

- **recommended** `label`: Write the UPI ID or number exactly as people will pay or copy it, such as priya@jio.  
  _From content: “Write the UPI ID or number exactly as people will pay or copy it, such as priya@jio.”_
- **discouraged** `label`: Don't add “UPI:” or translate the handle; the UPI Handle already says what it is.  
  _From content: “Don’t add “UPI:” or translate it; the UPI Handle already says what it is.”_
- **recommended** `label`: Set label to the real handle: the default, “Label”, is the Figma placeholder, not a handle.  
  _From doDont: ““Label” is the Figma placeholder, not a handle.”_
- **recommended** `label`: One ID per UPI Handle: each UPI Handle copies one ID.  
  _From doDont: “Each UPI Handle copies one ID.”_

Good: “priya@jio”, “merchant-1234@jio”, “9184844184”

Bad: “Label”, “priya@jio, priya@okaxis”

## States

| State | When | From |
| --- | --- | --- |
| Display only | Without an action (no onPress), the UPI Handle only shows the handle: static text on a grey rounded background. | states: “Without an action the UPI Handle only shows the handle.” |
| Pressable | With onPress (or onClick), the whole UPI Handle is a button and shrinks slightly while pressed. | states: “With one, the whole UPI Handle is a button and shrinks slightly while pressed.” |
| Disabled | With disabled set, the UPI Handle is dimmed to half opacity, ignores presses and is skipped by keyboard focus. | states: “Dimmed to half opacity and skipped by keyboard focus.” |

## Accessibility

- **recommended** `accessibilityLabel`: On a pressable UPI Handle, set accessibilityLabel to say the action, such as “Copy priya@jio”.  
  _From content: “On a pressable UPI Handle, set an accessibility label that says the action, such as “Copy priya@jio”.”_
- **recommended** `accessibilityLabel`: On the web a pressable UPI Handle is a button named by its accessibility label, or by the handle when none is set.  
  _From sources: “On the web a pressable UPI Handle is a button named by its accessibility label, or by the handle when none is set.”_
- **recommended** Keyboard focus draws a thin ring without moving anything, and a mouse click leaves no ring.  
  _From sources: “Keyboard focus draws a thin ring without moving anything, and a mouse click leaves no ring.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Use the real handle | Leave the placeholder | “Label” is the Figma placeholder, not a handle. |
| Put the action on the UPI Handle | Show an icon with no action | A scan icon on a static UPI Handle looks tappable but does nothing. |
| One ID per UPI Handle | Combine handles in one label | People can’t tell which ID they copied. |

## Examples

### Confirm the payee, the guide's In context: a Card with the payee's name in a Text, the payee's UPI Handle with an avatar and the copy icon, and the Pay Button, stacked in a VStack as the guide's code stacks them. The UPI Handle's onPress stands for the screen copying the handle, and the Button's for the screen starting the payment. The URI stands for the payee's own photo.

```tsx
<Card>
  <VStack>
    <Text>Paying Priya Sharma</Text>
    <UpiHandle
      label="priya@jio"
      source={{ uri: 'https://example.com/photos/priya-sharma.jpg' }}
      iconName="ic_copy"
      accessibilityLabel="Copy priya@jio"
      onPress={() => {}}
    />
    <Button label="Pay ₹500" onPress={() => {}} />
  </VStack>
</Card>
```

_From inContext: “The screen copies the handle or opens the payment when pressed; the UPI Handle only reports the press.”_

### A copy UPI Handle without an avatar, for a place where a name is already shown, the guide's Without avatar: the copy icon, an accessibility label that says the action, and onPress for the screen's copy.

```tsx
<UpiHandle
  label="shrutirai-1@jio"
  iconName="ic_copy"
  accessibilityLabel="Copy shrutirai-1@jio"
  onPress={() => {}}
/>
```

_From configuration: “The UPI Handle pads evenly; use it where a name is already shown.”_

### Display only, the guide's No icon: no icon and no onPress, so there is nothing to press.

```tsx
<UpiHandle label="merchant@jio" showIcon={false} />
```

_From configuration: “Display only: nothing to press.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `label` | `string` |  | `"Label"` |  | types | UPI handle text to display. Default "Label", from the component source. |
| `modes` | `Modes` |  |  |  | types | Modes object passed directly to `getVariableByName`. |
| `showIcon` | `boolean` |  | `true` |  | types | Toggles the trailing icon visibility. Default true, from the component source. |
| `iconName` | `string` |  | `"ic_scan_qr_code"` |  | types | Icon name from the actions set. Default "ic_scan_qr_code", from the component source. |
| `source` | `UnifiedSource` |  |  |  | types | Unified avatar source. Accepts a remote URI (raster or `.svg`), an inline SVG XML string, a `require()` asset, an SVG React component, or an already-rendered element. See {@link UnifiedSource}. Avatars are intentionally **not** tinted — the source renders as-is. The leading avatar is driven entirely by this prop: providing a `source` (or the deprecated `avatarSource`) force-sets the Figma "UPI Handle Image" collection to `True` and renders the avatar; omitting it force-sets the mode to `False` and hides it. This override wins over any `UPI Handle Image` value passed via `modes`. |
| `avatarSource` | `ImageSourcePropType \| UnifiedSource` |  |  |  | types | Deprecated: Use `source` instead. Kept as an alias for back-compat. Accepts the same shapes as `source` plus the legacy `ImageSourcePropType` from the previous API. Deprecated alias for `source`; kept for back-compat. |
| `accessibilityLabel` | `string` |  |  |  | evidence (2026-10-08) | Names a pressable UPI Handle: it is a button named by accessibilityLabel (“Copy priya@jio”), and Enter works. Declared: Accessibility label for screen readers. |
| `accessibilityHint` | `string` |  |  |  | types | Additional accessibility hint for screen readers Performance notes: - Token reads collapsed into a single `useMemo([modes])`. - Press visual goes through Pressable's `({ pressed })` style callback so a scroll-cancelled touch never schedules a React render. iOS gets `unstable_pressDelay={130}` for additional safety inside scrollables. - Focus state is mirrored on web only (gated setter). - Wrapped in `React.memo`. /. |
| `onPress` | `() => void` |  |  |  | types |  |
| `onClick` | `() => void` |  |  |  | types | Click/tap handler. Works as an alias for `onPress`. |
| `disabled` | `boolean` |  |  |  | evidence (2026-10-08) | A disabled UPI Handle renders at 0.5 opacity; on the web it has aria-disabled and tabindex -1. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Constrains the pill. Long handles truncate inside this box. |
| `disableTruncation` | `boolean` |  |  |  | types | When `true`, disables text truncation: the trailing ellipsis (`…`) is never shown and any `numberOfLines` clamp is ignored, so the text wraps to as many lines as it needs even when horizontal space is tight. |
| `...Omit<React.ComponentProps<typeof View>, 'style' | 'accessibilityRole' | 'accessibilityLabel' | 'accessibilityHint' | 'disabled'>` | `Omit<React.ComponentProps<typeof View>, 'style' \| 'accessibilityRole' \| 'accessibilityLabel' \| 'accessibilityHint' \| 'disabled'>` |  |  |  | types | Inherited React Native props the component also accepts. They are not part of the design contract and no guide documents them. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection UpiHandle reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 10` | `mode collection` | Default, jioPlus | `"Default"` |  | types | A token collection UpiHandle reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Profile Card Appearance` | `mode collection` | Default, Premium | `"Default"` |  | types | A token collection UpiHandle reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `UPI Handle Image` | `mode collection` | True, False | `"True"` |  | types | A token collection UpiHandle reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

_No slots._

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onPress` | `() => void` |  |  |  | types |  |
| `onClick` | `() => void` |  |  |  | types | Click/tap handler. Works as an alias for `onPress`. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- The package's default icon is still ic_scan_qr_code (scan), while Figma's UPI Handle uses ic_copy. _(evidence, 2026-10-08)_

## Flags

_None._
