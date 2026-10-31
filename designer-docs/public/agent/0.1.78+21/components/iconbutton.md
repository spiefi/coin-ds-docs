# IconButton

> Coin agent pack 0.1.78+21 (pilot). Generated from `components/iconbutton.json`; the JSON is the source of truth.

- **State:** flagged (3 flags, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `cba512f` · built 2026-10-31T00:47:40Z
- **Category:** action (for discovery only, not a limit on composition) · **Tags:** icon, icon only, close button, share button, add button
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=iconbutton) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2018-4301) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-iconbutton--docs)

Use an Icon Button for a frequent, well-known action where an icon alone is clear, such as add, share, or close.

## Use when

- **recommended** A frequent, well-known action where an icon alone is clear, such as add, share or close.  
  _From summary: “Use an Icon Button for a frequent, well-known action where an icon alone is clear, such as add, share, or close.”_

## Avoid when

_None in the guide._

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Container | A circle whose size comes from the Button / Size mode. | yes | anatomy: “Circle whose size comes from the Button / Size mode.” |
| Icon | One registry icon (iconName) that names the action. | yes | anatomy: “One registry icon that names the action.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

_No slots._

## Placement

- **recommended** The button is a fixed square: it never stretches with its container.  
  _From sizing: “The button never stretches with its container.”_
- **recommended** In the guide's statement-card example, Icon Buttons sit together at the end of a row; the strongest one is the main action, and the screen handles each press.  
  _From inContext: “Icon Buttons sit together at the end of a row. The strongest one is the main action; the screen handles each press.”_

## Configuration

- **recommended** `Emphasis` = `High`: Use Emphasis High for the main action in a group and Medium or Low for the rest.  
  _From configuration: “Use High for the main action in a group and Medium or Low for the rest.”_
- **recommended** `Emphasis`: Emphasis sets how loud the button is: it steps the fill from solid gold (High) to tint (Medium) to none (Low).  
  _From configuration: “Emphasis steps the fill from solid gold to tint to none.”_
- **discouraged** `Emphasis` = `High`: Do not make every action loud: three High buttons compete for attention.  
  _From doDont: “Three High buttons compete for attention.”_
- **recommended** `AppearanceBrand`: AppearanceBrand picks the brand colour family; it changes the colour family, not the importance.  
  _From configuration: “Appearance changes the colour family, not the importance.”_
- **recommended** `Button / Size`: Button / Size gives two sizes: Medium is 40 px and Small is 26 px in the installed package (Figma draws Medium at 42 px); XS renders the same as Small.  
  _From sizing: “Medium is 40 px and Small is 26 px in the installed package; Figma draws Medium at 42 px. XS renders the same as Small.”_
- **recommended** `Button / Size`: Keep sizes consistent in a row: one size reads as one group.  
  _From doDont: “One size reads as one group.”_
- **discouraged** `Button / Size`: Do not mix sizes in one row: mixed sizes look like different kinds of action.  
  _From doDont: “Mixed sizes look like different kinds of action.”_
- **recommended** `isToggle` = `true`: A toggle (isToggle) swaps between two icons, inactiveIcon and activeIcon; its On state (isActive) turns into a white circle with a black icon.  
  _From states: “A toggle swaps between two icons, and its On state turns into a white circle with a black icon.”_

## Content

- **recommended** One familiar icon, one clear action, and a label for people who cannot see it.  
  _From corePrinciple: “One familiar icon, one clear action, and a label for people who cannot see it.”_
- **recommended** `iconName`: Use icons with one common meaning.  
  _From content: “Use icons with one common meaning and give each button a label that says the action, such as “Share statement”, not the icon’s name.”_
- **recommended** `accessibilityLabel`: Give each button a label that says the action, such as “Share statement”, not the icon's name.  
  _From content: “Use icons with one common meaning and give each button a label that says the action, such as “Share statement”, not the icon’s name.”_
- **recommended** `iconName`: Use a familiar icon: a download arrow says what happens.  
  _From doDont: “A download arrow says what happens.”_
- **discouraged** `iconName`: Do not use an unclear icon: a card icon does not say it downloads a statement.  
  _From doDont: “A card icon does not say it downloads a statement.”_

Good: “Share statement”, “Download statement”, “Filter transactions”

## States

| State | When | From |
| --- | --- | --- |
| Default | One press, one action. | states: “One press, one action.” |
| Toggle off | isToggle true, isActive false: gold fill with the inactive icon. | states: “Gold fill with the inactive icon.” |
| Toggle on | isToggle and isActive true: white fill with the active icon, announced as pressed. | states: “White fill with the active icon, announced as pressed.” |
| Disabled | disabled is true: dimmed to half opacity and skipped by keyboard focus. | states: “Dimmed to half opacity and skipped by keyboard focus.” |
| Loading | loading: a same-size placeholder while the action loads. | states: “A same-size placeholder while the action loads.” |
| Keyboard focus | Keyboard focus draws a thin ring without changing the button's size; a mouse click leaves no ring. | sources: “Keyboard focus draws a thin ring without changing the button’s size; a mouse click leaves no ring.” |

## Accessibility

- **REQUIRED** `accessibilityLabel`: Always set accessibilityLabel: without a label, the accessible name is the icon's name.  
  _From sources: “Without a label, the accessible name is the icon’s name, so always set one.”_
- **recommended** `isToggle`: A toggle keeps one name in both states and is announced as pressed or not pressed.  
  _From states: “It keeps one name and is announced as pressed or not pressed.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Make one action strongest | Make every action loud | Three High buttons compete for attention. |
| Use a familiar icon | Use an unclear icon | A card icon does not say it downloads a statement. |
| Keep sizes consistent in a row | Mix sizes in one row | Mixed sizes look like different kinds of action. |

## Examples

### Actions at the end of a statement row: one High main action, the rest Medium, one size, each with a label that says the action.

```tsx
<HStack modes={{ 'Color Mode': 'Light' }}>
  <IconButton iconName="ic_share" accessibilityLabel="Share statement" onPress={() => {}} modes={{ 'Color Mode': 'Light', Emphasis: 'Medium' }} />
  <IconButton iconName="ic_filter" accessibilityLabel="Filter transactions" onPress={() => {}} modes={{ 'Color Mode': 'Light', Emphasis: 'Medium' }} />
  <IconButton iconName="ic_download" accessibilityLabel="Download statement" onPress={() => {}} modes={{ 'Color Mode': 'Light', Emphasis: 'High' }} />
</HStack>
```

_From inContext: “The strongest one is the main action; the screen handles each press.”_

### A toggle that swaps two icons and keeps one label in both states.

```tsx
<IconButton
  isToggle
  isActive={false}
  inactiveIcon="ic_flash"
  activeIcon="ic_flash_off"
  accessibilityLabel="Flash"
  onPress={() => {}}
  modes={{ 'Color Mode': 'Light' }}
/>
```

_From states: “A toggle swaps between two icons, and its On state turns into a white circle with a black icon.”_

### A close action with an accessibility label.

```tsx
<IconButton iconName="ic_close" accessibilityLabel="Close" onPress={() => {}} modes={{ 'Color Mode': 'Light' }} />
```

_From summary: “Use an Icon Button for a frequent, well-known action where an icon alone is clear, such as add, share, or close.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `iconName` | `string` |  |  |  | types | Built-in icon name from the registry (default state). |
| `source` | `UnifiedSource` |  |  |  | types | Unified fallback source for the default state, used when `iconName` is missing or not in the registry. Accepts a remote URI, an inline SVG XML string, a `require()` asset, an SVG React component, or a React element. The result is tinted with the button's mode-resolved icon color so it follows design tokens just like a built-in icon. See {@link UnifiedSource}. |
| `modes` | `Modes` |  |  |  | types |  |
| `onPress` | `() => void` |  |  |  | types |  |
| `disabled` | `boolean` |  | `false` |  | types | Default false, from the component source. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types |  |
| `accessibilityLabel` | `string` |  |  |  | evidence (2026-10-01) | Without it, the name is derived from the icon (ic_flash gives “Flash”); a toggle keeps the same derived name in both states. |
| `accessibilityHint` | `string` |  |  |  | types |  |
| `accessibilityState` | `AccessibilityState` |  |  |  | types |  |
| `isToggle` | `boolean` |  | `false` |  | types | Whether the button behaves as a toggle button. Default false, from the component source. |
| `activeIcon` | `string` |  |  |  | types | Icon to display when isToggle is true and isActive is true. |
| `activeSource` | `UnifiedSource` |  |  |  | types | Unified fallback source for the active state. Used when `activeIcon` is missing or not in the registry (and only when `isToggle` is true and `isActive` is true). Falls back to the default `source` if not provided. See {@link UnifiedSource}. |
| `inactiveIcon` | `string` |  |  |  | types | Icon to display when isToggle is true and isActive is false. |
| `inactiveSource` | `UnifiedSource` |  |  |  | types | Unified fallback source for the inactive state. Used when `inactiveIcon` is missing or not in the registry (and only when `isToggle` is true and `isActive` is false). Falls back to the default `source` if not provided. See {@link UnifiedSource}. |
| `isActive` | `boolean` |  | `false` |  | evidence (2026-10-01) | On a toggle, the On state reads the toggle tokens (white fill in Light), and aria-pressed follows isActive on the web. Declared: Whether the toggle button is in active state (only used when isToggle is true) Default false, from the component source. |
| `webAccessibilityProps` | `WebAccessibilityProps` |  |  |  | types | Web-specific accessibility props (only used on web platform) |
| `loading` | `boolean` |  |  |  | types | Explicit per-instance loading override. When `true`, renders a same-size pill-shaped skeleton instead of the button. Defaults to inheriting from the surrounding `<SkeletonGroup>`. |
| `...SafePressableProps` | `SafePressableProps` |  |  |  | types | Inherited React Native props the component also accepts. They are not part of the design contract and no guide documents them. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Primary"` |  | types | A token collection IconButton reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / Size` ⚑ flagged (trace-check) | `mode collection` | M, S, XS | `"M"` |  | evidence (2026-09-28) | M renders 40 × 40 (Figma 42 × 42); S and XS both render 26 × 26 with a 16 px icon. Declared: A token collection IconButton reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / State` | `mode collection` | Idle, Hover, Pressed, Disabled | `"Idle"` |  | types | A token collection IconButton reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection IconButton reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context2` | `mode collection` | Default, AppBar | `"Default"` |  | types | A token collection IconButton reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Emphasis` | `mode collection` | High, Medium, Low | `"High"` |  | types | A token collection IconButton reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection IconButton reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

_No slots._

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onPress` | `() => void` |  |  |  | types |  |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- Figma's Glass variant has no package equivalent. _(evidence, 2026-10-08)_
- Size M renders 40 px, not Figma's 42 px. _(evidence, 2026-10-08)_
- Sizes S and XS render the same. _(evidence, 2026-09-28)_ ⚑ flagged (trace-check)
- On a freshly loaded page the first Tab shows the browser's default focus ring instead of the token ring; later Tabs show the token ring. _(evidence, 2026-10-08)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/facts/modes/1` · trace-check: Checked on jfs-components 0.1.60 (2026-09-28); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/gaps/2` · trace-check: Checked on jfs-components 0.1.60 (2026-09-28); the installed package is 0.1.78. Re-check before relying on it.
- `/avoidWhen` · trace-check: The guide gives no avoidWhen guidance; left empty rather than guessed.
