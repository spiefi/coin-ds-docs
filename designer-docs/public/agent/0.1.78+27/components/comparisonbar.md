# ComparisonBar

> Coin agent pack 0.1.78+27 (pilot). Generated from `components/comparisonbar.json`; the JSON is the source of truth.

- **State:** documented
- **Package:** jfs-components 0.1.78 · guide commit `ea46f68` · built 2026-10-31T05:18:28Z
- **Category:** action (for discovery only, not a limit on composition) · **Tags:** compare tray, compare drawer, add to compare, product comparison
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=comparisonbar) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=5350-360) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-comparisonbar--docs)

Use a Comparison Bar to collect the items people pick to compare, as pictures in slots, and let them start the comparison.

## Use when

- **recommended** Collect the items people pick to compare, as pictures in slots, and let them start the comparison.  
  _From summary: “Use a Comparison Bar to collect the items people pick to compare, as pictures in slots, and let them start the comparison.”_
- **recommended** Show what's picked; compare when there's something to show.  
  _From corePrinciple: “Show what’s picked; compare when there’s something to show.”_
- **recommended** People pick items from a list to compare, such as gold coins.  
  _From inContext: “Comparing gold coins”_

## Avoid when

- **discouraged** Comparing values side by side: the Comparison Bar is not a value chart. It is a card of image slots and a Compare button, for collecting the items to compare; value comparisons are other components, such as Allocation Comparison Chart and Plan Comparison Card.  
  _From evidence: “ComparisonBar is not a value chart: it is a floating card of image slots and a Compare button, for collecting items to compare. Value comparisons are Allocation Comparison Chart, Plan Comparison Card, and others.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Card | A white card as wide as its slots and button. | yes | anatomy: “A white card as wide as its slots and button.” |
| Filled slot | An item with an imageSource: a picture; pressing anywhere on the slot removes it. | no | anatomy: “A picture; pressing anywhere on the slot removes it.” |
| Remove mark | On a filled slot: shows the slot removes; it isn't a separate button. | no | anatomy: “Shows the slot removes; it isn’t a separate button.” |
| Empty slot | An item without an imageSource: a + that asks your screen to add an item. | no | anatomy: “A + that asks your screen to add an item.” |
| Compare | A Coin Button, named by compareLabel, that stays off until a slot has a picture. | yes | anatomy: “A Coin Button that stays off until a slot has a picture.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `items` | `ComparisonBarItem` | types |

## Placement

- **recommended** The bar hugs its content: 10 and 12 px of padding, 45 × 44 px slots 12 px apart, then the button.  
  _From sizing: “The bar hugs its content: 10 and 12 px of padding, 45 × 44 px slots 12 px apart, then the button.”_
- **recommended** Four slots and the default button make the bar 369 × 66 px.  
  _From sizing: “Four slots and the default button make it 369 × 66 px”_
- **recommended** `items`: Each slot adds 57 px, and the bar never wraps or scrolls.  
  _From sizing: “Each slot adds 57 px, and the bar never wraps or scrolls.”_
- **recommended** As people add items from a list, such as gold coins, the bar fills from the left.  
  _From inContext: “People add coins from the list, and the bar fills from the left.”_

## Configuration

- **REQUIRED** `items`: Pass items: one row per slot, in order. items is required.  
  _From fact `/facts/props/0` (items, source evidence)_
- **recommended** `items`: Pass one item per slot: an item with an imageSource is filled, and one without is empty.  
  _From configuration: “Pass one item per slot: an item with an imageSource is filled, and one without is empty.”_
- **recommended** `items`: Fewer slots make a shorter bar.  
  _From configuration: “Fewer slots make a shorter bar.”_
- **recommended** `items`: Use four slots or fewer: the bar fits a phone screen.  
  _From doDont: “The bar fits a phone screen.”_
- **discouraged** `items`: Do not use five or more slots: the bar doesn't wrap or scroll, so it's wider than a 390 px phone.  
  _From doDont: “The bar doesn’t wrap or scroll, so it’s wider than a 390 px phone.”_
- **recommended** `items`: The bar keeps no list of its own, so your screen changes items.  
  _From states: “The bar keeps no list of its own, so your screen changes items.”_
- **recommended** `onItemRemove`: Tapping a picture in the bar takes that item out (onItemRemove).  
  _From inContext: “Tapping a picture in the bar takes that coin out.”_
- **recommended** `onCompare`: Compare turns on with the first item; your screen opens the comparison (onCompare).  
  _From inContext: “Compare turns on with the first coin; your screen opens the comparison.”_
- **recommended** `compareLabel`: compareLabel names the button.  
  _From configuration: “compareLabel names the button”_
- **recommended** `compareLabel`: The button widens with its label.  
  _From configuration: “The button widens with its label.”_
- **recommended** `Button / Size` = `S`: The Compare button is Coin's Button at size M by default; Button / Size S gives the smaller, 32 px button Figma draws.  
  _From configuration: “Button / Size S gives the smaller button Figma draws.”_
- **recommended** `Radius`: Radius rounds the pictures' corners, which shows on square photos.  
  _From configuration: “Radius rounds the pictures’ corners, which shows on square photos.”_
- **recommended** `Radius` = `None`: Radius None: square corners.  
  _From configuration: “Square corners.”_
- **recommended** `Radius` = `L`: Radius L: fully rounded corners.  
  _From configuration: “Fully rounded corners.”_
- **recommended** `modes`: Leave the colour modes alone: the + stays dark on the grey slots.  
  _From doDont: “The + stays dark on the grey slots.”_
- **discouraged** `AppearanceBrand` = `Secondary`: Do not set a brand colour on the bar: AppearanceBrand Secondary turns the + white, so the empty slots look blank.  
  _From doDont: “AppearanceBrand Secondary turns the + white, so the empty slots look blank.”_
- **recommended** `compareDisabled` = `true`: compareDisabled keeps Compare off, say until two are added.  
  _From states: “compareDisabled keeps it off, say until two are added.”_
- **recommended** `disableCompareWhenEmpty`: disableCompareWhenEmpty (default true) keeps Compare off while no slot has a picture; false keeps it pressable when empty. compareDisabled, when set, wins over it.  
  _From fact `/facts/props/6` (disableCompareWhenEmpty, source evidence)_

## Content

- **recommended** `ComparisonBarItem.imageSource`: Use each item's own picture, so people can tell at a glance what they picked.  
  _From content: “Use each item’s own picture, so people can tell at a glance what they picked.”_
- **recommended** `compareLabel`: Keep compareLabel to a short verb such as Compare: a long label makes the bar wider than a phone.  
  _From content: “Keep compareLabel to a short verb such as Compare: a long label makes the bar wider than a phone.”_
- **discouraged** `compareLabel`: Do not write a sentence as compareLabel, such as “Compare these 4 coins”: the bar grows past a 390 px phone.  
  _From content: “The bar grows past a 390 px phone.”_
- **recommended** `compareLabel`: Left out, compareLabel is “Compare”.  
  _From fact `/facts/props/4` (compareLabel, source types)_

Good: “Compare”

Bad: “Compare these 4 coins”

## States

| State | When | From |
| --- | --- | --- |
| Empty slot | An item without an imageSource: pressing it asks your screen to add an item (onItemPress). | states: “Pressing an empty one asks your screen to add an item (onItemPress)” |
| Filled slot | An item with an imageSource: pressing it asks your screen to remove that item (onItemRemove). | states: “pressing a filled one asks it to remove that item (onItemRemove)” |
| Nothing added | No slot has a picture: Compare is dimmed and can't be pressed. | states: “Compare is dimmed and can’t be pressed.” |
| One added | One picture turns Compare on; one is enough. | states: “Compare stays dimmed and can’t be pressed until a slot has a picture; one is enough.” |
| All added | Every slot shows a picture and a remove mark. | states: “Every slot shows a picture and a remove mark.” |
| Kept off | compareDisabled keeps Compare off, say until two are added. | states: “compareDisabled keeps it off, say until two are added.” |

## Accessibility

- **recommended** Each slot is a button.  
  _From states: “Each slot is a button.”_
- **recommended** The remove mark isn't a separate button: pressing anywhere on a filled slot removes it.  
  _From anatomy: “Shows the slot removes; it isn’t a separate button.”_
- **recommended** `ComparisonBarItem.accessibilityLabel`: Give each item an accessibilityLabel with its name, or every slot is read out the same.  
  _From content: “Give each item an accessibilityLabel with its name, or every slot is read out the same.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Leave the colour modes alone | Set a brand colour on the bar | AppearanceBrand Secondary turns the + white, so the empty slots look blank. |
| Four slots or fewer | Five or more slots | The bar doesn’t wrap or scroll, so it’s wider than a 390 px phone. |

## Examples

### Comparing gold coins, the guide's In context: people add coins from the Gold coins list, and the bar fills from the left. Here the 1 g coin is added, so its picture fills the first slot (named for screen readers) and Compare is on. Tapping its picture takes the coin out (onItemRemove), an empty slot asks the screen to add the next coin (onItemPress), and the screen opens the comparison (onCompare). The rows leave out the guide's leading pictures, and their Buttons carry no modes.

```tsx
<VStack alignHorizontal="stretch">
  <ListGroup label="Gold coins">
    <ListItem
      layout="Horizontal"
      navArrow={false}
      title="1 g gold coin"
      supportText="₹7,850 · 24K"
      trailing={<Button label="Added" onPress={() => {}} />}
    />
    <ListItem
      layout="Horizontal"
      navArrow={false}
      title="2 g gold coin"
      supportText="₹15,640 · 24K"
      trailing={<Button label="Add" onPress={() => {}} />}
    />
    <ListItem
      layout="Horizontal"
      navArrow={false}
      title="5 g gold coin"
      supportText="₹38,900 · 24K"
      trailing={<Button label="Add" onPress={() => {}} />}
    />
    <ListItem
      layout="Horizontal"
      navArrow={false}
      title="10 g gold coin"
      supportText="₹77,500 · 24K"
      trailing={<Button label="Add" onPress={() => {}} />}
    />
  </ListGroup>
  <ComparisonBar
    items={[
      { id: '1g', imageSource: { uri: 'https://example.com/gold-coin.png' }, accessibilityLabel: 'Remove 1 g gold coin' },
      { id: 'empty-0' },
      { id: 'empty-1' },
      { id: 'empty-2' },
    ]}
    onItemPress={() => {}}
    onItemRemove={() => {}}
    onCompare={() => {}}
  />
</VStack>
```

_From inContext: “People add coins from the list, and the bar fills from the left.”_

### Four slots, Figma's layout: one picture and three to add. The filled item carries an accessibilityLabel with its name; the empty ones keep the default add label.

```tsx
<ComparisonBar
  items={[
    { id: 'a', imageSource: { uri: 'https://example.com/gold-coin.png' }, accessibilityLabel: 'Remove 1 g gold coin' },
    { id: 'b' },
    { id: 'c' },
    { id: 'd' },
  ]}
  onItemPress={() => {}}
  onItemRemove={() => {}}
  onCompare={() => {}}
/>
```

_From configuration: “Figma’s layout: one picture and three to add.”_

### Two needed: one coin is added, but the screen sets compareDisabled to keep Compare off until two are added.

```tsx
<ComparisonBar
  items={[
    { id: 'a', imageSource: { uri: 'https://example.com/gold-coin.png' }, accessibilityLabel: 'Remove 1 g gold coin' },
    { id: 'b' },
    { id: 'c' },
    { id: 'd' },
  ]}
  compareDisabled
  onItemPress={() => {}}
  onItemRemove={() => {}}
  onCompare={() => {}}
/>
```

_From states: “compareDisabled keeps it off, say until two are added.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `items` | `ComparisonBarItem[]` |  |  | yes | evidence (2026-10-28) | The bar keeps no state: your screen updates items. Declared: The slots rendered before the Compare button. Each entry controls its own add/image state via {@link ComparisonBarItem.imageSource}. |
| `onItemPress` | `(id: ComparisonBarItem['id'], index: number) => void` |  |  |  | types | Fired when an empty (Add) slot is tapped. The consumer is expected to react by opening whatever picker is appropriate and then updating that item's `imageSource` to flip it into the "Image Added" state — the component does not know how images are sourced. Receives the item's `id` (or index when no id was supplied) and the slot index. |
| `onItemRemove` | `(id: ComparisonBarItem['id'], index: number) => void` |  |  |  | types | Fired when a filled slot is tapped. For better mobile ergonomics the *entire* filled slot is the remove target (the dismiss capsule is just a visual affordance), so a fingertip anywhere on the item triggers this. The consumer is expected to clear that item's `imageSource` to return it to the "Add" state. Receives the item's `id` (or index) and the slot index. |
| `onCompare` | `() => void` |  |  |  | types | Fired when the Compare button is pressed. |
| `compareLabel` | `string` |  | `"Compare"` |  | types | Label for the trailing action button. Defaults to `"Compare"`. Default "Compare", from the component source. |
| `compareDisabled` | `boolean` |  |  |  | evidence (2026-10-28) | Set to true or false, it overrides the automatic behaviour both ways. Declared: Explicitly controls the Compare button's *functional* disabled state — a truly disabled button is non-interactive (its `onPress` never fires), not just dimmed. Note that `modes` only affects appearance, so dimming the button via tokens does NOT stop taps; that is what this prop is for. When provided (a boolean), it always wins over {@link ComparisonBarProps.disableCompareWhenEmpty}. Leave it `undefined` to fall back to the auto behavior. |
| `disableCompareWhenEmpty` | `boolean` |  | `true` |  | evidence (2026-10-28) | While no slot has an image, Compare is off: 50 % opacity and not pressable. One image turns it on. Declared: When `true` (default) the Compare button is automatically (and truly) disabled while no slot has an image — there is nothing to compare yet. Set to `false` to keep it tappable even when empty. Ignored when {@link ComparisonBarProps.compareDisabled} is set explicitly. Default true, from the component source. |
| `modes` | `Modes` |  |  |  | types | Mode configuration passed to the token resolver. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Style overrides for the outer floating card. |
| `ComparisonBarItem.id` | `string \| number` |  |  |  | types | Stable identifier for this slot. Returned to callbacks so the consumer can target the exact item that was interacted with. Falls back to the array index when omitted. A field of each items row. |
| `ComparisonBarItem.imageSource` | `ImageSourcePropType \| string \| null` |  |  |  | evidence (2026-10-28) | Set, the slot is filled: its picture and a close mark. null, undefined or an empty string leave it empty, with a +. Declared: Image to render in the slot. When provided the slot renders in the "Image Added" state; when omitted/`null` it renders the empty "Add" state. Accepts the same shapes as the library `Image` component (remote URL string, `{ uri }`, or a `require()`d asset). A field of each items row. |
| `ComparisonBarItem.accessibilityLabel` | `string` |  |  |  | evidence (2026-10-28) | Names the slot. Left out, an empty slot is “Add item to comparison” and a filled one “Remove item from comparison”. Declared: Accessibility label for the slot. Defaults to a generic add/remove label. A field of each items row. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Primary"` |  | evidence (2026-10-28) | Brand modes on the bar also reach the empty slots' +: on Secondary, Neutral or Tertiary (or Semantic Intent System) it turns white, about 1.19:1 on the slot, and on Emphasis Medium faint gold. Declared: A token collection ComparisonBar reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `AppearanceSystem` | `mode collection` | positive, warning, negative | `"positive"` |  | types | A token collection ComparisonBar reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / Size` | `mode collection` | M, S, XS | `"M"` |  | evidence (2026-10-28) | Sizes the Compare button. With the default M the button is 115 × 42 (16/24 type) and four slots make the bar 369 × 66; with S the button is 98 × 32 (14/22) and the bar 352 × 66. Declared: A token collection ComparisonBar reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / State` | `mode collection` | Idle, Hover, Pressed, Disabled | `"Idle"` |  | types | A token collection ComparisonBar reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection ComparisonBar reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context` | `mode collection` | Default, Nudge&Alert, CTACard, ListItem | `"Default"` |  | types | A token collection ComparisonBar reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 10` | `mode collection` | Default, jioPlus | `"Default"` |  | types | A token collection ComparisonBar reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context2` | `mode collection` | Default, AppBar | `"Default"` |  | types | A token collection ComparisonBar reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Emphasis` | `mode collection` | High, Medium, Low | `"High"` |  | types | A token collection ComparisonBar reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Icon Capsule Size` | `mode collection` | M, L, S, XS | `"M"` |  | types | A token collection ComparisonBar reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection ComparisonBar reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Profile Card Appearance` | `mode collection` | Default, Premium | `"Default"` |  | types | A token collection ComparisonBar reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Radius` | `mode collection` | S, M, L, None | `"S"` |  | evidence (2026-10-28) | Rounds the pictures' corners: S 8 px, M 16, L 32, None 0. Declared: A token collection ComparisonBar reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Semantic Intent` | `mode collection` | Brand, System | `"Brand"` |  | types | A token collection ComparisonBar reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `items` | `ComparisonBarItem[]` |  |  |  | types | A structured slot: an array of ComparisonBarItem rows. The slots rendered before the Compare button. Each entry controls its own add/image state via {@link ComparisonBarItem.imageSource}. |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onItemPress` | `(id: ComparisonBarItem['id'], index: number) => void` |  |  |  | types | Fired when an empty (Add) slot is tapped. The consumer is expected to react by opening whatever picker is appropriate and then updating that item's `imageSource` to flip it into the "Image Added" state — the component does not know how images are sourced. Receives the item's `id` (or index when no id was supplied) and the slot index. |
| `onItemRemove` | `(id: ComparisonBarItem['id'], index: number) => void` |  |  |  | types | Fired when a filled slot is tapped. For better mobile ergonomics the *entire* filled slot is the remove target (the dismiss capsule is just a visual affordance), so a fingertip anywhere on the item triggers this. The consumer is expected to clear that item's `imageSource` to return it to the "Add" state. Receives the item's `id` (or index) and the slot index. |
| `onCompare` | `() => void` |  |  |  | types | Fired when the Compare button is pressed. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- Brand modes on the bar turn the empty slots' + white (Component Bug #421). _(evidence, 2026-10-28)_
- Figma's Compare button is 96 × 32 and pale purple (the values of Button Size S, Secondary, Disabled); the package draws a size M gold Button, dimmed by opacity when off (Component Bug #421). _(evidence, 2026-10-28)_
- The empty slot's + is 18 px (XS) where Figma's is 29 px with an 18 px glyph (S), though the package's own comment says S (Component Bug #421). _(evidence, 2026-10-28)_
- A filled slot's picture is 33 × 28 where Figma's is 33 × 20, and the bar's right padding is 12 px where Figma's is 8 (Component Bug #421). _(evidence, 2026-10-28)_
- The slots give no press feedback (Component Bug #421). _(evidence, 2026-10-28)_
- The bar has no overflow handling (Component Bug #421). _(evidence, 2026-10-28)_
- Figma's Code Connect passes a Button child; the package takes items and compareLabel. _(evidence, 2026-10-28)_
- Biscuit's ComparisonBar.mdx mentions “the disabled-style props”; the props are compareDisabled and disableCompareWhenEmpty. _(evidence, 2026-10-28)_

## Flags

_None._
