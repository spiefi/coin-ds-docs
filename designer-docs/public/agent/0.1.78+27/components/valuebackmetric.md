# ValueBackMetric

> Coin agent pack 0.1.78+27 (pilot). Generated from `components/valuebackmetric.json`; the JSON is the source of truth.

- **State:** flagged (1 flag, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `cba512f` · built 2026-10-31T05:18:28Z
- **Category:** content (for discovery only, not a limit on composition) · **Tags:** JioPoints, cashback, rewards, points, value back
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=valuebackmetric) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=7581-1460) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-valuebackmetric--docs)

Use a Value Back Metric to show a rewards balance, such as JioPoints or cashback, with how to earn more and one next step.

## Use when

- **recommended** Use a Value Back Metric to show a rewards balance, such as JioPoints or cashback, with how to earn more and one next step.  
  _From summary: “Use a Value Back Metric to show a rewards balance, such as JioPoints or cashback, with how to earn more and one next step.”_
- **recommended** Rewards programmes: JioPoints and cashback are earn-and-redeem programmes.  
  _From doDont: “JioPoints and cashback are earn-and-redeem programmes.”_

## Avoid when

- **discouraged** An account balance, such as a savings balance: a savings balance is not a rewards programme.  
  _From doDont: “A savings balance is not a rewards programme.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Header | The programme's icon (icon, default ic_rupee_coin) and name (title, default JioPoints); always shown. | yes | anatomy: “Programme icon and name; always shown.” |
| Value | value: the amount, in the largest type. Hidden when left out. | no | anatomy: “The amount, in the largest type.” |
| Caption | caption: one short line on how to earn or when it's credited. Hidden when left out. | no | anatomy: “One short line on how to earn or when it’s credited.” |
| Call to action | linkLabel with onLinkPress: one purple verb, such as Earn. Hidden when left out. | no | anatomy: “One purple verb, such as Earn.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `icon` | `ReactNode` | types |
| `value` | `ReactNode` | types |
| `link` | `ReactNode` | types |

## Placement

- **recommended** Place one programme per card, side by side, with a distinct verb on each.  
  _From inContext: “Place one programme per card, side by side, with a distinct verb on each.”_
- **recommended** The card has no padding and is at least 82 px tall.  
  _From sizing: “The card has no padding and is at least 82 px tall.”_
- **recommended** The card is no wider than its column: in a narrow column its text wraps instead of overflowing.  
  _From sizing: “It never grows wider than its column: in a narrow column the text wraps instead of overflowing”_

## Configuration

- **recommended** Full: the balance, how to earn, and the next step.  
  _From configuration: “Balance, how to earn, and the next step.”_
- **recommended** Add the value, caption and call to action as the card needs them; each disappears when left out. The header shows either way.  
  _From configuration: “Add the value, caption, and call to action as the card needs them; each disappears when left out.”_
- **recommended** `linkLabel`: Leave out the call to action (linkLabel) when the card is informational and the next step lives elsewhere on the screen.  
  _From configuration: “Informational; the next step lives elsewhere on the screen.”_
- **recommended** `caption`: Leave out the caption when the amount speaks for itself.  
  _From configuration: “When the amount speaks for itself.”_
- **recommended** `AppearanceBrand`: AppearanceBrand (the icon colour) retints only the header icon; the amount and Earn keep their colours.  
  _From configuration: “Retints only the icon; the amount and Earn keep their colours.”_
- **recommended** `icon`: The default icon is ic_rupee_coin, because the JioPoints mark is not in the icon set.  
  _From sources: “The package uses ic_rupee_coin as the default icon because the JioPoints mark is not in the icon set.”_
- **recommended** `icon`: icon takes an icon name from the registry, drawn in the icon colour, or a node such as an Icon or Image, which gets the card's modes.  
  _From fact `/facts/props/0` (icon, source types)_
- **recommended** `title`: title defaults to JioPoints: set it to the programme's name, or the card reads JioPoints.  
  _From fact `/facts/props/1` (title, source types)_
- **recommended** `linkLabel`: The call to action is purple text, not a Link, so it has no underline.  
  _From sources: “The call to action is purple text, not a Link, so it has no underline.”_
- **recommended** `onLinkPress`: Pair linkLabel with onLinkPress: the screen opens the programme when a call to action is pressed.  
  _From inContext: “The screen opens the programme when a call to action is pressed.”_
- **recommended** `link`: Content in the link slot renders instead of linkLabel.  
  _From fact `/facts/slots/2` (link, source types)_
- **recommended** `onPress`: Add a press action to the card (onPress) when it should open the programme; Earn keeps its own action.  
  _From states: “Add a press action to the card when it should open the programme; Earn keeps its own action.”_
- **recommended** `onPress`: In a pressable card the call to action sits beside the card's button, not inside it, so each press runs only its own action.  
  _From sources: “in a pressable card the call to action sits beside the card’s button, not inside it, so each press runs only its own action.”_
- **recommended** `disabled`: disabled turns off the card's press when onPress is set.  
  _From fact `/facts/props/8` (disabled, source types)_

## Content

- **recommended** Name the programme, show the amount, offer one verb.  
  _From corePrinciple: “Name the programme, show the amount, offer one verb.”_
- **recommended** `title`: Use the programme name as the title.  
  _From content: “Use the programme name as the title”_
- **recommended** `value`: Put the countable amount in the value.  
  _From content: “put the countable amount in the value”_
- **recommended** `caption`: Keep the caption to one short sentence: how to earn or when it's credited.  
  _From content: “keep the caption to one short sentence”_
- **recommended** `linkLabel`: Make the call to action one verb in sentence case, such as Earn, View, or Claim.  
  _From content: “make the call to action one verb in sentence case, such as Earn, View, or Claim”_
- **recommended** `linkLabel`: When cards sit side by side, give each a distinct verb.  
  _From inContext: “with a distinct verb on each”_
- **recommended** Keep lines short: in a narrow column the text wraps, but short lines still read best.  
  _From sizing: “but short lines still read best”_
- **recommended** `value`: Name the programme and show an amount, so people can tell what the number is for.  
  _From doDont: “People can tell what the number is for.”_
- **discouraged** `value`: Don't keep the Figma placeholder “Value” as the value: it is not product copy.  
  _From doDont: ““Value” is the Figma placeholder, not product copy.”_
- **recommended** `linkLabel`: Use one verb: Earn says what happens next.  
  _From doDont: “Earn says what happens next.”_
- **discouraged** `linkLabel`: Don't write a vague call to action such as “Click here”: it says nothing about what happens.  
  _From doDont: ““Click here” says nothing about what happens.”_

Good: “JioPoints”, “1,240”, “Earn 10 points with UPI”, “Earn”, “Cashback”, “₹120”, “Credited monthly”, “View”, “Claim”

Bad: “Value”, “Click here”

## States

| State | When | From |
| --- | --- | --- |
| Static | By default (no onPress) only the call to action responds to a press: Earn, with onLinkPress. | states: “By default only the call to action responds.” |
| Pressable | With onPress, the card opens the programme; Earn still runs its own action (onLinkPress). | states: “The whole card opens the programme; Earn still runs its own action.” |

## Accessibility

- **recommended** `onLinkPress`: On the web, Enter and Space activate the call to action.  
  _From sources: “On the web, Enter and Space activate the call to action”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Name the programme and show an amount | Keep the placeholder | “Value” is the Figma placeholder, not product copy. |
| Use one verb | Write a vague call to action | “Click here” says nothing about what happens. |
| Use it for rewards | Use it for an account balance | A savings balance is not a rewards programme. |

## Examples

### Rewards on the home screen, the guide's In context: one programme per card, side by side, with a distinct verb on each (Earn, View); the screen opens the programme when a call to action is pressed (onLinkPress).

```tsx
<Card>
  <VStack>
    <Text>Your rewards</Text>
    <HStack justifyHorizontal="space-around" wrap>
      <ValueBackMetric
        title="JioPoints"
        value="1,240"
        caption="Earn 10 points with UPI"
        linkLabel="Earn"
        onLinkPress={() => {}}
      />
      <ValueBackMetric
        title="Cashback"
        value="₹120"
        caption="Credited monthly"
        linkLabel="View"
        onLinkPress={() => {}}
      />
    </HStack>
  </VStack>
</Card>
```

_From inContext: “Place one programme per card, side by side, with a distinct verb on each. The screen opens the programme when a call to action is pressed.”_

### Pressable: onPress makes the card open the programme, and Earn still runs its own action (onLinkPress).

```tsx
<ValueBackMetric
  title="JioPoints"
  value="1,240"
  caption="Earn 10 points with UPI"
  linkLabel="Earn"
  onLinkPress={() => {}}
  onPress={() => {}}
/>
```

_From states: “The whole card opens the programme; Earn still runs its own action.”_

### Without call to action: an informational card, when the next step lives elsewhere on the screen.

```tsx
<ValueBackMetric
  title="JioPoints"
  value="1,240"
  caption="Earn 10 points with UPI"
/>
```

_From configuration: “Informational; the next step lives elsewhere on the screen.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `icon` | `string \| React.ReactNode` |  | `"ic_rupee_coin"` |  | types | Header glyph slot, shown to the left of the title. Mirrors the Figma swap slot whose preferred instances are `Icon` and `Image`: - a registry icon name (e.g. `'ic_rupee_coin'`) renders the shared {@link Icon}, colour/size from the `icon/*` tokens (default 18px gold — retint via `modes`, e.g. `{ AppearanceBrand: 'Secondary' }`); - a custom node (an `<Icon/>`, an `<Image/>`, your brand logo) renders as-is with `modes` cascaded into it. The Figma design uses a dedicated JioPoints brand mark that is not in the icon registry, so `ic_rupee_coin` stands in by default. Default "ic_rupee_coin", from the component source. |
| `title` | `string` |  | `"JioPoints"` |  | types | Header title next to the icon. Defaults to `'JioPoints'`. Default "JioPoints", from the component source. |
| `value` | `string \| React.ReactNode` |  |  |  | types | The prominent value line (16px/500). Pass a string, or any node to compose a richer value. Hidden when omitted. |
| `caption` | `string` |  |  |  | evidence (2026-10-08) | In a 120 px column the caption wraps and nothing overflows. Declared: Muted caption below the value (12px, `#777`). Hidden when omitted. |
| `linkLabel` | `string` |  |  |  | types | Bottom CTA label rendered as the shared {@link Text} (purple 12px via seeded `Text Appearance: Secondary` + `Text Sizes: Small`). Hidden when omitted. Ignored when the {@link link} slot is provided. |
| `link` | `React.ReactNode` |  |  |  | types | Real slot for the bottom CTA. Highest precedence — when provided, these children render instead of the declarative `linkLabel` Text. Seeded `Text Appearance: Secondary` + `Text Sizes: Small` cascade into the slot (so a bare `<Text text="Earn" />` matches the design); child-level modes still win. |
| `onLinkPress` | `(event: GestureResponderEvent) => void` |  |  |  | types | Fired when the declarative CTA (`linkLabel`) is pressed. |
| `onPress` | `(event: GestureResponderEvent) => void` |  |  |  | types | Press handler for the whole card. When set, the card becomes pressable (rendered through a `Pressable` with `accessibilityRole="button"`). Independent of {@link onLinkPress} — the bottom CTA keeps its own handler. |
| `disabled` | `boolean` |  |  |  | types | Disable interaction when `onPress` is set. |
| `modes` | `Modes` |  |  |  | types | Design-token modes for theming. Cascaded to slot children. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Override the container styles. |
| `titleStyle` | `StyleProp<TextStyle>` |  |  |  | types | Override the title text styles. |
| `valueStyle` | `StyleProp<TextStyle>` |  |  |  | types | Override the value text styles. |
| `captionStyle` | `StyleProp<TextStyle>` |  |  |  | types | Override the caption text styles. |
| `accessibilityLabel` | `string` |  |  |  | types | Accessibility label. Defaults to the resolved `title`, `value`, `caption` and `linkLabel` joined together. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Primary"` |  | types | A token collection ValueBackMetric reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `AppearanceSystem` | `mode collection` | positive, warning, negative | `"positive"` |  | types | A token collection ValueBackMetric reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Badge Size` | `mode collection` | Medium, Small | `"Medium"` |  | types | A token collection ValueBackMetric reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection ValueBackMetric reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context` | `mode collection` | Default, Nudge&Alert, CTACard, ListItem | `"Default"` |  | types | A token collection ValueBackMetric reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 10` | `mode collection` | Default, jioPlus | `"Default"` |  | types | A token collection ValueBackMetric reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context4` | `mode collection` | Default, Chip, Button, Badge, Badge/glass | `"Default"` |  | types | A token collection ValueBackMetric reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Emphasis` | `mode collection` | High, Medium, Low | `"High"` |  | types | A token collection ValueBackMetric reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Icon Size` | `mode collection` | Medium, Small | `"Medium"` |  | types | A token collection ValueBackMetric reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection ValueBackMetric reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Profile Card Appearance` | `mode collection` | Default, Premium | `"Default"` |  | types | A token collection ValueBackMetric reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Semantic Intent` | `mode collection` | Brand, System | `"Brand"` |  | types | A token collection ValueBackMetric reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Text Appearance` | `mode collection` | Neutral, Primary, Secondary, Tertiary, Success, Warning, Error | `"Neutral"` |  | types | A token collection ValueBackMetric reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Text Sizes` | `mode collection` | Medium, Small, Large | `"Medium"` |  | types | A token collection ValueBackMetric reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Weight` | `mode collection` | Medium, Regular, Bold | `"Medium"` |  | types | A token collection ValueBackMetric reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `icon` | `string \| React.ReactNode` |  | `"ic_rupee_coin"` |  | types | Header glyph slot, shown to the left of the title. Mirrors the Figma swap slot whose preferred instances are `Icon` and `Image`: - a registry icon name (e.g. `'ic_rupee_coin'`) renders the shared {@link Icon}, colour/size from the `icon/*` tokens (default 18px gold — retint via `modes`, e.g. `{ AppearanceBrand: 'Secondary' }`); - a custom node (an `<Icon/>`, an `<Image/>`, your brand logo) renders as-is with `modes` cascaded into it. The Figma design uses a dedicated JioPoints brand mark that is not in the icon registry, so `ic_rupee_coin` stands in by default. |
| `value` | `string \| React.ReactNode` |  |  |  | types | The prominent value line (16px/500). Pass a string, or any node to compose a richer value. Hidden when omitted. |
| `link` | `React.ReactNode` |  |  |  | types | Real slot for the bottom CTA. Highest precedence — when provided, these children render instead of the declarative `linkLabel` Text. Seeded `Text Appearance: Secondary` + `Text Sizes: Small` cascade into the slot (so a bare `<Text text="Earn" />` matches the design); child-level modes still win. |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onLinkPress` | `(event: GestureResponderEvent) => void` |  |  |  | evidence (2026-10-08) | On the web, Enter and Space on the call to action call onLinkPress, as a click does (#184, fixed on 636f3f5). Declared: Fired when the declarative CTA (`linkLabel`) is pressed. |
| `onPress` | `(event: GestureResponderEvent) => void` |  |  |  | evidence (2026-10-08) | With onPress the card is a button and the call to action is a sibling link beside it, not inside it; each click calls only its own handler. Declared: Press handler for the whole card. When set, the card becomes pressable (rendered through a `Pressable` with `accessibilityRole="button"`). Independent of {@link onLinkPress} — the bottom CTA keeps its own handler. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

_None recorded._

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `(whole entry)` · human: The guide (checked 8 October on 0.1.78-636f3f5) says in Anatomy “It has no surface or padding of its own”, but the installed ValueBackMetric.tsx (0.1.78-dbe0e02, read from source) paints valueBackMetric/background/color, white in Light and Dark; and on dbe0e02 its In context Card defaults to AppearanceBrand Neutral, so the header icons there are grey, not gold. The entry follows the package and does not repeat “no surface”. Guide fix #525. Added by Claude Code in the overnight run agentpack-batch7, for Marcin to confirm.
