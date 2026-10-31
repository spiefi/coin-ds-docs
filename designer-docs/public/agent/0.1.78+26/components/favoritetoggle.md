# FavoriteToggle

> Coin agent pack 0.1.78+26 (pilot). Generated from `components/favoritetoggle.json`; the JSON is the source of truth.

- **State:** flagged (1 flag, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `4e470cf` · built 2026-10-31T03:54:03Z
- **Category:** input (for discovery only, not a limit on composition) · **Tags:** heart, like, save, bookmark, wishlist
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=favoritetoggle) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=7612-54663) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-favoritetoggle--docs)

Use a Favorite Toggle on an image card so people can save the item for later with one tap.

## Use when

- **recommended** On an image card, so people can save the item for later with one tap.  
  _From summary: “Use a Favorite Toggle on an image card so people can save the item for later with one tap.”_
- **recommended** Saving an item, such as a plan, from its card.  
  _From inContext: “Save a plan from its card”_

## Avoid when

- **discouraged** On a plain white surface: white glass on white almost disappears. Place it on imagery instead.  
  _From doDont: “White glass on white almost disappears.”_
- **discouraged** A second heart on the same card: two hearts make people wonder which one saves.  
  _From doDont: “Two hearts make people wonder which one saves.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Glass surface | The circle: frosted, so the heart stays readable over photos, while not saved; a white circle once saved. | yes | anatomy: “Frosted circle that keeps the heart readable over photos.” |
| Heart | The filled heart glyph (icon, ic_favorite by default): white while not saved, gold once saved. | yes | fact `/facts/props/2` (icon, source types) |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

_No slots._

## Placement

- **recommended** One heart per item, on imagery, saying exactly what gets saved.  
  _From corePrinciple: “One heart per item, on imagery, saying exactly what gets saved.”_
- **recommended** In the guide's In context card, the toggle sits in the top-right corner of the card image.  
  _From inContext: “The toggle sits in the top-right corner of the card image.”_
- **recommended** Place it on imagery: the frosted circle reads clearly over a photo.  
  _From doDont: “The frosted circle reads clearly over a photo.”_
- **recommended** Use one heart per item: one save action per card.  
  _From doDont: “One save action per card.”_
- **recommended** `Favorite Toggle Size`: It is a fixed square set by Favorite Toggle Size: the toggle never stretches.  
  _From sizing: “The toggle never stretches.”_

## Configuration

- **recommended** `Favorite Toggle Size`: Size is the only visual choice: Favorite Toggle Size sets it (S 14 px, M 29 px, L 41 px).  
  _From configuration: “Size is the only visual choice.”_
- **recommended** `Favorite Toggle Size` = `M`: With no Favorite Toggle Size the toggle is M (29 px), the Figma size.  
  _From sources: “Size comes from the Favorite Toggle Size mode (S 14, M 29, L 41 px) and defaults to M, the Figma size.”_
- **recommended** `Favorite Toggle Size` = `M`: Use Medium (29 px) on most cards: it is the Figma size.  
  _From configuration: “The Figma size, right for most cards.”_
- **recommended** `Favorite Toggle Size` = `S`: Use Small (14 px) only on dense thumbnails: it fits tiny thumbnails but is hard to tap.  
  _From configuration: “use Small only on dense thumbnails”_
- **recommended** `Favorite Toggle Size` = `L`: Use Large (41 px) on full-width hero images.  
  _From configuration: “For full-width hero images.”_
- **discouraged** `Favorite Toggle Size` = `S`: Don't shrink it on a large card: a 14 px heart is hard to see and to hit.  
  _From doDont: “A 14 px heart is hard to see and to hit.”_
- **recommended** `isActive`: Let the screen own the saved state: it keeps the list of saved items and passes each card's toggle its saved state (isActive) and change handler (onChange).  
  _From inContext: “The screen keeps the list of saved items and passes each card its saved state and change handler.”_
- **recommended** `isActive`: isActive makes the toggle controlled: it shows that value, and onChange reports the next one for the screen to keep.  
  _From fact `/facts/props/0` (isActive, source evidence)_
- **recommended** `Favorite Toggle Color` = `Active`: Saved uses Favorite Toggle Color Active: a white circle with a gold heart.  
  _From sources: “Saved uses the Favorite Toggle Color Active mode: a white circle with a gold heart.”_
- **recommended** `Favorite Toggle Color`: Favorite Toggle Color follows isActive: Default while not saved, Active once saved.  
  _From fact `/facts/modes/1` (Favorite Toggle Color, source evidence)_
- **recommended** `icon`: Leave icon at its default heart (ic_favorite): Figma hardcodes the heart, and the prop is there purely for future reuse.  
  _From fact `/facts/props/2` (icon, source types)_
- **recommended** `loading`: loading true draws a same-size circular placeholder instead of the toggle; left unset, loading follows a surrounding SkeletonGroup.  
  _From fact `/facts/props/12` (loading, source types)_

## Content

- **recommended** Name what gets saved: the label names the item, as in “Save Gold savings plan to favorites”.  
  _From content: “Name what gets saved”_
- **recommended** `accessibilityLabel`: The toggle has no visible text: its accessibility label carries what it saves.  
  _From content: “The toggle has no visible text.”_

Good: “Save Gold savings plan to favorites”, “Save Nifty 50 Index Fund to favorites”, “Save Digital Gold to favorites”

## States

| State | When | From |
| --- | --- | --- |
| Not saved | isActive false: a frosted circle with a white heart. | states: “Not saved is a frosted circle with a white heart.” |
| Saved | isActive true: a white circle with a gold heart, as in Figma. | states: “Saved is a white circle with a gold heart, as in Figma.” |
| Disabled | disabled true: dimmed to half opacity and skipped by keyboard focus. | states: “Dimmed to half opacity and skipped by keyboard focus.” |
| Loading | While the item loads: a same-size circle holds the place. | states: “A same-size circle holds the place while the item loads.” |

## Accessibility

- **recommended** `accessibilityLabel`: Give it an accessibility label that names the item, so screen reader users hear what they are saving.  
  _From content: “Give it an accessibility label that names the item, so screen reader users hear what they are saving.”_
- **recommended** `accessibilityLabel`: Without accessibilityLabel the toggle's name is the default “Favorite”, which doesn't name the item.  
  _From fact `/facts/props/7` (accessibilityLabel, source types)_
- **recommended** `isActive`: On the web the saved state is announced (aria-checked).  
  _From sources: “On the web the saved state is announced (aria-checked).”_
- **recommended** `Favorite Toggle Size`: Tap area: on phones it reaches 44 px around the circle; in a web browser only the visible circle responds (14 px at Small, 29 px at Medium).  
  _From sizing: “On phones its tap area reaches 44 px around the circle; in a web browser only the visible circle responds, 14 px for Small and 29 px for Medium.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Place it on imagery | Put it on a plain white surface | White glass on white almost disappears. |
| Use Medium on cards | Shrink it on a large card | A 14 px heart is hard to see and to hit. |
| Use one heart per item | Repeat it on one card | Two hearts make people wonder which one saves. |

## Examples

### Save a plan from its card, the guide's In context: the toggle sits in the top-right corner of the card image, and its accessibility label names the plan. The screen keeps the list of saved items; isActive and onChange stand for that wiring, which passes this card its saved state and change handler. Size is left at its default, M (29 px).

```tsx
<FavoriteToggle isActive={false} onChange={(next) => {}} accessibilityLabel="Save Gold savings plan to favorites" />
```

_From inContext: “The screen keeps the list of saved items and passes each card its saved state and change handler.”_

### A saved item, the guide's States: isActive true draws a white circle with a gold heart. The label still names the item.

```tsx
<FavoriteToggle isActive onChange={(next) => {}} accessibilityLabel="Save Nifty 50 Index Fund to favorites" />
```

_From states: “Saved is a white circle with a gold heart, as in Figma.”_

### On a full-width hero image: Favorite Toggle Size L (41 px), the size the guide's Configuration gives hero images.

```tsx
<FavoriteToggle isActive={false} onChange={(next) => {}} modes={{ 'Favorite Toggle Size': 'L' }} accessibilityLabel="Save Digital Gold to favorites" />
```

_From configuration: “For full-width hero images.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `isActive` | `boolean` |  |  |  | evidence (2026-10-01) | On the web the toggle carries aria-checked true or false. Declared: Whether the toggle is favorited (active) — **controlled**. When provided, the component reflects this value and defers state ownership to the parent (update it in `onChange`). Omit it to use the component uncontrolled with `defaultActive`. |
| `defaultActive` | `boolean` |  | `false` |  | types | Initial favorited state for **uncontrolled** usage. Ignored when `isActive` is provided. Defaults to `false`. Default false, from the component source. |
| `icon` | `string` |  | `"ic_favorite"` |  | types | Icon rendered inside the toggle. Defaults to the heart glyph (`ic_favorite`). Both Figma variants use the same filled heart; only its color changes with state (white when inactive, gold when active). Figma hardcodes the heart, so this prop is exposed purely for future reuse. Default "ic_favorite", from the component source. |
| `onChange` | `(next: boolean) => void` |  |  |  | types | Fired on press with the next (toggled) active state. |
| `onPress` | `() => void` |  |  |  | types | Raw press handler, fired alongside `onChange`. |
| `modes` | `Modes` |  |  |  | types | Modes used to resolve design tokens. |
| `disabled` | `boolean` |  | `false` |  | types | Default false, from the component source. |
| `accessibilityLabel` | `string` |  |  |  | types | Accessibility label; defaults to `"Favorite"`. |
| `accessibilityHint` | `string` |  |  |  | types |  |
| `accessibilityState` | `AccessibilityState` |  |  |  | types |  |
| `webAccessibilityProps` | `WebAccessibilityProps` |  |  |  | types |  |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types |  |
| `loading` | `boolean` |  |  |  | types | Explicit per-instance loading override. When `true`, renders a same-size circular skeleton instead of the toggle. Defaults to inheriting from the surrounding `<SkeletonGroup>`. |
| `...SafePressableProps` | `SafePressableProps` |  |  |  | types | Inherited React Native props the component also accepts. They are not part of the design contract and no guide documents them. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection FavoriteToggle reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Favorite Toggle Color` | `mode collection` | Default, Active | `"Default"` |  | evidence (2026-10-01) | Saved (isActive true) resolves Active: a white background, rgb(255, 255, 255), and a gold heart, rgb(206, 161, 90). Declared: A token collection FavoriteToggle reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. Package docs: Colors resolve under `Favorite Toggle Color` Default/Active from the `isActive` prop. |
| `Favorite Toggle Size` | `mode collection` | S, M, L | `"M"` |  | evidence (2026-10-01) | With no Favorite Toggle Size mode the toggle is 29 × 29 (M); 0.1.77 defaulted to 14 × 14 (S). Declared: A token collection FavoriteToggle reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

_No slots._

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onChange` | `(next: boolean) => void` |  |  |  | types | Fired on press with the next (toggled) active state. |
| `onPress` | `() => void` |  |  |  | types | Raw press handler, fired alongside `onChange`. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- In a web browser the tap area is only the visible circle (14 px at Small, 29 px at Medium): react-native-web ignores the 44 px hit slop the toggle sets, which phones honour. Still so on 0.1.78-dbe0e02 (Component Bug #541). _(evidence, 2026-10-01)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `(whole entry)` · human: The Favorite Toggle guide's Sources note and its evidence's 0.1.78 check were made on 1 October 2026 on mirror v0.1.78 (5b6894b); the rest of the evidence on 28 September on 0.1.60. The installed package is 0.1.78, mirror v0.1.78-dbe0e02, where FavoriteToggle.tsx has changed once since (17 October): loading now draws its placeholder on its own (FavoriteToggle.tsx line 231, visible={loading === true}; Skeleton.tsx lines 134 and 272–275). Read against the installed source, every sentence this entry quotes still holds, but two are out of date and not quoted: the Anatomy note “Filled heart; its colour is meant to change when saved.” (the colour does change since #168: white while not saved, gold once saved, FavoriteToggle.tsx lines 114–123), and the evidence's Contract line “`loading` renders a same-size circular skeleton only inside `<SkeletonGroup loading>`; on its own it renders nothing.” The evidence's 0.1.60 Rendered and Limits sections (Active colours never resolve, no aria-checked, no hit slop, package default S) are superseded by its 0.1.78 check but still read as current. Re-check the guide and evidence on 0.1.78 and publish them, then re-extract. Added by Claude Code in the overnight run agentpack-batch14, for Marcin to confirm. Guide fix #538.
