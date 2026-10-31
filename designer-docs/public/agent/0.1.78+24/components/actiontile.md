# ActionTile

> Coin agent pack 0.1.78+24 (pilot). Generated from `components/actiontile.json`; the JSON is the source of truth.

- **State:** flagged (4 flags, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `cba512f` · built 2026-10-31T02:32:56Z
- **Category:** action (for discovery only, not a limit on composition) · **Tags:** shortcut, quick action, tile, icon tile
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=actiontile) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1500-13351) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-actiontile--docs)

A compact shortcut to one destination.

## Use when

- **recommended** A compact shortcut to one destination.  
  _From summary: “A compact shortcut to one destination.”_
- **recommended** Offer a small set of quick actions: a group of tiles, each a shortcut to one destination.  
  _From inContext: “Offer a small set of quick actions”_

## Avoid when

- **discouraged** Explaining a destination in a sentence: explanatory sentences turn a shortcut into a card. A tile holds one short label.  
  _From content: “explanatory sentences that turn a shortcut into a card”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Icon capsule | The icon slot (icon), which expects an IconCapsule or a compatible component: reinforces the destination and receives the tile's full mode object. | no | anatomy: “Reinforces the destination and receives the owner’s full mode object.” |
| Label | label: names one destination with a short, familiar term. | yes | anatomy: “Names one destination with a short, familiar term.” |
| Tile boundary | The fixed 168 × 90 surface and its token-driven styling, owned by ActionTile. | yes | anatomy: “ActionTile owns the fixed 168 × 90 surface and token-driven styling.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `icon` | `ReactNode` | types |

## Placement

- **recommended** Group tiles in an HStack: the HStack owns the responsive group while each fixed tile keeps one destination.  
  _From inContext: “A public HStack owns the responsive group while each fixed tile keeps one destination.”_
- **recommended** Let the surrounding layout wrap or scroll around the tiles.  
  _From sizing: “Let the surrounding public layout wrap or scroll”_
- **recommended** In a wide host, the tile keeps its intrinsic footprint inside the available space.  
  _From sizing: “The tile keeps its intrinsic footprint inside available space.”_
- **recommended** In a narrow host, the host adapts around the tile; the tile itself stays 168 × 90.  
  _From sizing: “The host adapts around the tile; the tile itself stays 168 × 90.”_

## Configuration

- **recommended** Keep the label and the icon focused on the same destination.  
  _From configuration: “Keep both focused on the same destination.”_
- **recommended** `icon`: Use an icon that matches the destination, such as a card icon for a card destination.  
  _From configuration: “Use a card icon for a card destination.”_
- **recommended** `icon`: Change both the label and its icon together.  
  _From configuration: “Change both the label and its icon together.”_
- **discouraged** `icon`: Do not pair a label with another destination's icon, such as a cards icon on Savings: it makes the shortcut ambiguous.  
  _From doDont: “A cards icon makes the Savings shortcut ambiguous.”_
- **recommended** Keep the destination distinct from neighboring shortcuts.  
  _From configuration: “Keep the destination distinct from neighboring shortcuts.”_
- **recommended** `icon`: icon expects an IconCapsule or a compatible component; when it is a React element, ActionTile passes its modes to it.  
  _From fact `/facts/props/1` (icon, source types)_
- **recommended** `icon`: The icon capsule inherits the modes supplied to ActionTile.  
  _From anatomy: “The icon capsule inherits the owner modes supplied to ActionTile.”_
- **recommended** `onPress`: Supplying onPress makes the tile actionable.  
  _From states: “Supplying onPress makes the tile actionable.”_
- **discouraged** Do not invent disabled or loading states: the public API does not expose them.  
  _From states: “The public API does not expose disabled or loading states, so do not invent them.”_
- **discouraged** `style`: ActionTile owns a fixed width and height (168 × 90); do not resize the tile with style patches.  
  _From sizing: “do not resize the tile with style patches.”_

## Content

- **recommended** One icon, one short label, one destination.  
  _From corePrinciple: “One icon. One short label. One destination.”_
- **recommended** `label`: Short nouns usually work best for the label.  
  _From content: “Short nouns usually work best.”_
- **recommended** The icon and the short label should describe the same place.  
  _From content: “The icon and short label should describe the same place.”_
- **recommended** `label`: Use compact labels: Cards, Savings and Payments are easy to scan in a group.  
  _From content: “Cards, Savings, and Payments are easy to scan in a group.”_
- **recommended** `label`: Give each visible tile a destination name that distinguishes it from its siblings.  
  _From content: “Each visible tile needs a destination name that distinguishes it from its siblings.”_
- **discouraged** `label`: Do not repeat a vague label such as More on several tiles: duplicate More tiles do not reveal where either shortcut leads.  
  _From doDont: “Duplicate More tiles do not reveal where either shortcut leads.”_
- **discouraged** `label`: Do not turn the label into a sentence such as “Open the place where you manage all your cards”: long instructions overwhelm a compact shortcut.  
  _From doDont: “Long instructions overwhelm a compact shortcut.”_

Good: “Cards”, “Savings”, “Payments”

Bad: “More”, “Open the place where you manage all your cards”

## States

| State | When | From |
| --- | --- | --- |
| Static | Without onPress: display only; the tile presents the shortcut information without activation. | states: “Without onPress the tile presents the shortcut information without activation.” |
| Actionable | With onPress the whole tile activates the named destination. | states: “With onPress the whole tile activates the named destination.” |

## Accessibility

_None in the guide._

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Use distinct destination names | Repeat a vague label | Duplicate More tiles do not reveal where either shortcut leads. |
| Keep the label short | Turn the label into a sentence | Long instructions overwhelm a compact shortcut. |
| Match icon and destination | Pair the label with another destination | A cards icon makes the Savings shortcut ambiguous. |

## Examples

### Quick actions, the guide's In context: an HStack wraps three actionable tiles, each with its own label and matching IconCapsule icon, each opening one destination.

```tsx
<HStack wrap>
  <ActionTile
    label="Cards"
    icon={<IconCapsule iconName="ic_cards" />}
    onPress={() => {}}
  />
  <ActionTile
    label="Savings"
    icon={<IconCapsule iconName="ic_savings" />}
    onPress={() => {}}
  />
  <ActionTile
    label="Payments"
    icon={<IconCapsule iconName="ic_payments" />}
    onPress={() => {}}
  />
</HStack>
```

_From inContext: “A public HStack owns the responsive group while each fixed tile keeps one destination.”_

### A static, display-only tile: without onPress it presents the shortcut information without activation.

```tsx
<ActionTile
  label="Cards"
  icon={<IconCapsule iconName="ic_cards" />}
/>
```

_From states: “Without onPress the tile presents the shortcut information without activation.”_

### A Savings tile: the label and its icon change together, so the savings icon reinforces the Savings label.

```tsx
<ActionTile
  label="Savings"
  icon={<IconCapsule iconName="ic_savings" />}
/>
```

_From configuration: “Change both the label and its icon together.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `label` | `string` |  | `"Cards"` |  | types | Label text, e.g. "Cards". Default "Cards", from the component source. |
| `icon` | `React.ReactNode` |  |  |  | types | Icon component slot. Expects an IconCapsule or compatible component. Modes will be passed to this slot if it's a valid React element. |
| `modes` | `Modes` |  |  |  | types | Modes for design token resolution. |
| `style` | `ViewStyle` |  |  |  | types | Optional container style. |
| `onPress` | `() => void` |  |  |  | types | Callback when tile is pressed. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Primary"` |  | types | A token collection ActionTile reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `AppearanceSystem` | `mode collection` | positive, warning, negative | `"positive"` |  | types | A token collection ActionTile reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection ActionTile reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context` | `mode collection` | Default, Nudge&Alert, CTACard, ListItem | `"Default"` |  | types | A token collection ActionTile reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Emphasis` | `mode collection` | High, Medium, Low | `"High"` |  | types | A token collection ActionTile reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Icon Capsule Size` | `mode collection` | M, L, S, XS | `"M"` |  | types | A token collection ActionTile reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection ActionTile reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Semantic Intent` | `mode collection` | Brand, System | `"Brand"` |  | types | A token collection ActionTile reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `icon` | `React.ReactNode` |  |  |  | types | Icon component slot. Expects an IconCapsule or compatible component. Modes will be passed to this slot if it's a valid React element. |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onPress` | `() => void` |  |  |  | types | Callback when tile is pressed |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- ActionTile has no disabled or loading state: its public API offers only an optional action (onPress). _(evidence, 2026-09-19)_ ⚑ flagged (trace-check)
- Figma's live Action Tile icon capsule resolves AppearanceBrand Neutral with Emphasis High, while the supplied Storybook reference selects Primary appearance with Medium emphasis; the guide follows the Storybook reference. _(evidence, 2026-09-19)_ ⚑ flagged (trace-check)

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/facts/gaps/0` · trace-check: Checked on jfs-components 0.1.60 (2026-09-19); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/gaps/1` · trace-check: Checked on jfs-components 0.1.60 (2026-09-19); the installed package is 0.1.78. Re-check before relying on it.
- `/accessibility` · trace-check: The guide gives no accessibility guidance; left empty rather than guessed.
- `(whole entry)` · human: The Action Tile guide and its evidence were checked on 19 September 2026 on jfs-components 0.1.60, not on the installed 0.1.78 (mirror v0.1.78-dbe0e02). The installed ActionTile.tsx still matches what the entry says (read, not rendered). Re-extract once the guide is re-checked on 0.1.78 and published (#522). Added by Claude Code in the overnight run agentpack-batch6, for Marcin to confirm.
