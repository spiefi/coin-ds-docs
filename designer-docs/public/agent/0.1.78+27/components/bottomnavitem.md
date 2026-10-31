# BottomNavItem

> Coin agent pack 0.1.78+27 (pilot). Generated from `components/bottomnavitem.json`; the JSON is the source of truth.

- **State:** flagged (2 flags, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `31f1c5e` · built 2026-10-31T05:18:28Z
- **Category:** navigation (for discovery only, not a limit on composition) · **Tags:** tab bar item, navigation item
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=bottomnavitem) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=306-92) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-bottomnavitem--docs)

Show one top-level destination in the bottom navigation bar with an icon and a short label.

## Use when

- **recommended** Show one top-level destination in the bottom navigation bar, with an icon and a short label.  
  _From summary: “Show one top-level destination in the bottom navigation bar with an icon and a short label.”_
- **recommended** Move between top-level destinations: each destination of a BottomNav is one item.  
  _From inContext: “Move between top-level destinations”_

## Avoid when

_None in the guide._

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Icon | A 24 px registry icon. State colors it grey when Idle and gold when Active. | yes | anatomy: “A 24 px registry icon. State colors it grey when Idle and gold when Active.” |
| Label | 11 px medium text, 6 px below the icon. On the web it also becomes the tab’s spoken name. | yes | anatomy: “11 px medium text, 6 px below the icon. On the web it also becomes the tab’s spoken name.” |
| Item | Inside BottomNav, every item stretches to an equal share of the bar. | yes | anatomy: “Inside BottomNav, every item stretches to an equal share of the bar.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

_No slots._

## Placement

- **recommended** Put the items in a BottomNav, which holds them at the bottom of an app screen.  
  _From inContext: “A public BottomNav holds five BottomNavItems at the bottom of an app screen”_
- **recommended** BottomNav gives every item the same share of the bar, so fewer items mean wider tap targets.  
  _From sizing: “BottomNav gives every item the same share of the bar, so fewer items mean wider tap targets.”_
- **recommended** Keep three to five destinations in the bar, so every tap target stays wide.  
  _From content: “Canonical BottomNav guidance keeps 3–5 items so every tap target stays wide.”_

## Configuration

- **recommended** One destination per item: pair a familiar registry icon (iconName) with the destination’s name (label).  
  _From configuration: “Pair a familiar registry icon with the destination’s name.”_
- **recommended** `BottomNavItem / State`: In code, the icon and label are properties (iconName and label), and State is the BottomNavItem / State mode, which BottomNav sets from its value.  
  _From configuration: “In code, the icon and label are properties and State is the BottomNavItem / State mode, which BottomNav sets from its value.”_
- **recommended** `BottomNavItem / State`: Let BottomNav mark the Active item: give the bar the current destination's value instead of setting State on an item.  
  _From corePrinciple: “Let BottomNav mark the Active item.”_
- **recommended** `BottomNavItem / State` = `Active`: Active turns the icon gold and darkens the label.  
  _From configuration: “Active turns the icon gold and darkens the label.”_
- **recommended** `BottomNavItem / State` = `Active`: Only the current destination should be Active.  
  _From configuration: “Only the current destination should be Active.”_
- **recommended** `label`: Left out, label reads “Home”, its default: give every item its own destination's name.  
  _From fact `/facts/props/1` (label, source types)_
- **recommended** `iconName`: Left out, iconName shows ic_home, its default: give every item its own destination's icon.  
  _From fact `/facts/props/0` (iconName, source types)_
- **recommended** `disabled` = `true`: disabled is a property: the item fades and stops responding, but keeps its place in the bar.  
  _From states: “Disabled is a property: the item fades and stops responding, but keeps its place in the bar.”_

## Content

- **recommended** Keep each label short and specific: it names the destination.  
  _From content: “Keep it short and specific.”_
- **recommended** Use one or two words: Home, Finances, Pay and Explore fit on one line and scan quickly.  
  _From content: “Home, Finances, Pay, and Explore fit on one line and scan quickly.”_
- **discouraged** Don't write a long label: “Investments and savings” wraps onto extra lines and pushes that item out of line with the others.  
  _From doDont: ““Investments and savings” wraps onto extra lines and pushes that item out of line with the others.”_
- **discouraged** Don't remove the labels: icons alone must be guessed, and each tab loses its spoken name.  
  _From doDont: “Icons alone must be guessed, and each tab loses its spoken name.”_

Good: “Home”, “Finances”, “Pay”, “Invest”, “Explore”

Bad: “Investments and savings”

## States

| State | When | From |
| --- | --- | --- |
| Idle | Any destination other than the current one. | states: “Any destination other than the current one.” |
| Active | The destination people are on now. | states: “The destination people are on now.” |
| Disabled | Unavailable: half opacity; the item cannot be pressed or reached with Tab. | states: “Half opacity. The item cannot be pressed or reached with Tab.” |
| Hover | On the web, hover fades an item to 85% opacity. | states: “On the web, hover fades an item to 85% opacity” |
| Pressed | On the web, a touch press fades the item to 70% opacity. | states: “a touch press fades it to 70%” |
| Focused | Keyboard focus adds a dark 2 px line under the item alongside the browser’s focus ring. | states: “Keyboard focus adds a dark 2 px line under the item alongside the browser’s focus ring.” |

## Accessibility

- **recommended** `label`: The label is both the visible name and, on the web, the spoken name of the tab.  
  _From content: “The label is both the visible name and, on the web, the spoken name of the tab.”_
- **recommended** The icon is hidden from assistive technology.  
  _From content: “The icon is hidden from assistive technology.”_
- **recommended** `accessibilityLabel`: Add an accessibilityLabel only when the visible label is abbreviated.  
  _From content: “Add an accessibility label only when the visible label is abbreviated.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Use a short label | Write a long label | “Investments and savings” wraps onto extra lines and pushes that item out of line with the others. |
| Keep every label | Remove the labels | Icons alone must be guessed, and each tab loses its spoken name. |

## Examples

### Moving between top-level destinations, the guide's In context: a Screen holds the current destination's content (Home's Title and a slim Card, the guide's literals) and a BottomNav at its bottom with five items, each a BottomNav.Item with its value, label and icon. The bar's value “home” makes Home Active and the other four Idle; the literal value and the empty onChange stand for the app's own state of the current destination.

```tsx
<Screen>
  <VStack>
    <Title title="Home" />
    <Card variant="slim">
      <Card.Title>Your accounts at a glance</Card.Title>
      <Card.SupportText>Balances, recent payments, and reminders.</Card.SupportText>
    </Card>
  </VStack>
  <BottomNav value="home" onChange={(value) => {}}>
    <BottomNav.Item value="home" label="Home" iconName="ic_home" />
    <BottomNav.Item value="finances" label="Finances" iconName="ic_rupee" />
    <BottomNav.Item value="pay" label="Pay" iconName="ic_scan_qr_code" />
    <BottomNav.Item value="invest" label="Invest" iconName="ic_rupee_coin" />
    <BottomNav.Item value="explore" label="Explore" iconName="ic_search" />
  </BottomNav>
</Screen>
```

_From inContext: “A public BottomNav holds five BottomNavItems at the bottom of an app screen”_

### One or two words per label, the guide's Content example: Home, Finances, Pay and Explore, each with its own registry icon, fit on one line. The bar's value “home” makes Home Active; the literal value and the empty onChange stand for the app's own state.

```tsx
<BottomNav value="home" onChange={(value) => {}}>
  <BottomNav.Item value="home" label="Home" iconName="ic_home" />
  <BottomNav.Item value="finances" label="Finances" iconName="ic_rupee" />
  <BottomNav.Item value="pay" label="Pay" iconName="ic_scan_qr_code" />
  <BottomNav.Item value="explore" label="Explore" iconName="ic_search" />
</BottomNav>
```

_From content: “Home, Finances, Pay, and Explore fit on one line and scan quickly.”_

### An unavailable destination, the guide's States card “Unavailable” (Pay, disabled) in a four-destination bar, as the guide's playground shows it with “Pay unavailable” switched on: Pay fades to half opacity and can't be pressed or reached with Tab, but keeps its place in the bar; Home is Active. The literal value and the empty onChange stand for the app's own state.

```tsx
<BottomNav value="home" onChange={(value) => {}}>
  <BottomNav.Item value="home" label="Home" iconName="ic_home" />
  <BottomNav.Item value="finances" label="Finances" iconName="ic_rupee" />
  <BottomNav.Item value="pay" label="Pay" iconName="ic_scan_qr_code" disabled />
  <BottomNav.Item value="explore" label="Explore" iconName="ic_search" />
</BottomNav>
```

_From states: “Disabled is a property: the item fades and stops responding, but keeps its place in the bar.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `iconName` | `string` |  | `"ic_home"` |  | types | Default "ic_home", from the component source. |
| `label` | `string` |  | `"Home"` |  | types | Default "Home", from the component source. |
| `modes` | `Modes` |  |  |  | types |  |
| `onPress` | `() => void` |  |  |  | types |  |
| `disabled` | `boolean` |  | `false` |  | types | Default false, from the component source. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types |  |
| `labelStyle` | `StyleProp<TextStyle>` |  |  |  | types |  |
| `iconColor` | `string` |  |  |  | types |  |
| `iconSize` | `number` |  |  |  | types |  |
| `accessibilityLabel` | `string` |  |  |  | types |  |
| `accessibilityHint` | `string` |  |  |  | types |  |
| `accessibilityState` | `AccessibilityState` |  |  |  | types |  |
| `webAccessibilityProps` | `WebAccessibilityProps` |  |  |  | types | Web-specific accessibility props (only used on web platform) |
| `...SafePressableProps` | `SafePressableProps` |  |  |  | types | Inherited React Native props the component also accepts. They are not part of the design contract and no guide documents them. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `BottomNavItem / State` | `mode collection` | Idle, Active | `"Idle"` |  | types | A token collection BottomNavItem reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection BottomNavItem reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

_No slots._

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onPress` | `() => void` |  |  |  | types |  |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

_None recorded._

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/avoidWhen` · trace-check: The guide gives no avoidWhen guidance; left empty rather than guessed.
- `(whole entry)` · human: The Bottom Nav Item guide (31f1c5e) and its evidence were checked on 24 September 2026 on jfs-components 0.1.60 (its Sources note says “Declared, installed, and npm latest are all jfs-components@0.1.60.”); the installed package is 0.1.78 (mirror v0.1.78-dbe0e02). BottomNav.tsx is the same blob at the 0.1.60 release and on dbe0e02, and BottomNavItem.tsx changed once since 0.1.60 (the label's line height now goes through safeTextLineHeight, still 14 px), so every sentence this entry quotes still holds, but these do not, and the entry leaves them out: (1) the Sources note's “The guide stays in Light mode, matching the Figma context, because the installed Dark tokens resolve the Idle label to orange.”: with Color Mode Dark the Idle label now resolves to rgb(241, 241, 241), a light grey (mode/Grey/400 Dark, fixed for #177 in 636f3f5). (2) The Anatomy Item note's “Hugs its content on its own.” and the Sizing description's “On its own, an item is as wide as its label.” (and its card “Width follows the label”) hold only in the guide's inline-flex frame: the item's root has alignItems center and no width (BottomNavItem.tsx lines 79–82), so a parent that stretches its children widens it (Storybook's Default story draws a standalone Home item 992 px wide). Also unclear: In context's “… and keeps exactly one Active.” and its caption “Choose a destination. BottomNav marks it Active and the screen above changes.”: BottomNav keeps no state; it calls onChange with the pressed item's value and draws Active from the value the screen passes back, so a value that matches no item leaves every item Idle (BottomNav.tsx lines 99–119), as the Bottom Nav guide says (“Bottom Nav only reports which destination was pressed.”). And the guide doesn't say when not to use a Bottom Nav Item, so avoidWhen is empty. On the web, the item's dark 2 px focus line (States: “Keyboard focus adds a dark 2 px line under the item …”) also appears after a mouse press and stays until focus moves on, though the browser doesn't treat that focus as keyboard focus (not :focus-visible): the item sets its focus style on every focus event (BottomNavItem.tsx lines 46, 203–206 and 226) and doesn't use Coin's own keyboard-only check (isKeyboardInputModality, web-platform-utils.ts lines 233–271). Published Storybook draws the same after a click on a Bottom Nav tab. Re-check the guide on 0.1.78 and publish it, then re-extract. Added by Claude Code in the overnight run agentpack-r26, for Marcin to confirm. Guide fix #556; the focus line after a mouse press is Component Bug #555.
