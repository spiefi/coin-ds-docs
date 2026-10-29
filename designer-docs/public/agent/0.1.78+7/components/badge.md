# Badge

> Coin agent pack 0.1.78+7 (pilot). Generated from `components/badge.json`; the JSON is the source of truth.

- **State:** flagged (8 flags, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `4a044e7` · built 2026-10-29T00:57:35Z
- **Category:** content (for discovery only, not a limit on composition) · **Tags:** tag, label, pill, status, lozenge, count
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=badge) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=5607-5484) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-badge--docs)

Use a Badge to make a short status, category, or count easy to scan beside the content it describes.

## Use when

- **recommended** Show a short status, category or count beside the content it describes, so people can scan it.  
  _From summary: “Use a Badge to make a short status, category, or count easy to scan beside the content it describes.”_

## Avoid when

- **discouraged** The message needs a sentence or an explanation: keep the explanation out of the Badge.  
  _From doDont: “Avoid putting the whole explanation inside the Badge.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Leading visual | Optional leading node, such as an icon, that adds a recognizable cue without replacing the words. | no | anatomy: “Adds a recognizable cue without replacing the words.” |
| Label | The label text; names the status or category. | yes | anatomy: “Names the status or category.” |
| Surface | The token-owned surface that groups the message into one compact shape. | yes | anatomy: “Groups the message into one compact shape.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `leading` | `ReactNode` | types |

## Placement

- **recommended** Place the Badge next to the item it describes.  
  _From inContext: “Place the compact status next to the item it describes.”_

## Configuration

- **recommended** `type` = `default`: Use the solid treatment (type default) beside ordinary content.  
  _From configuration: “Use a solid Badge beside ordinary content.”_
- **recommended** `type` = `glass`: Use type glass where the underlying image or surface stays part of the composition.  
  _From configuration: “Use glass where the underlying image or surface remains part of the composition.”_
- **recommended** `Badge Size`: Choose Badge Size for the density of the surrounding content.  
  _From sizing: “Choose the size for the surrounding density.”_
- **recommended** `Semantic Intent`: Choose a Semantic Intent and appearance whose meaning agrees with the status.  
  _From doDont: “Use semantic treatment that agrees with the status.”_
- **recommended** `Emphasis`: Give the status that needs attention the strongest Emphasis, rather than equal emphasis on every badge.  
  _From doDont: “Give the status needing attention the strongest emphasis.”_
- **recommended** `onPress`: Add onPress only when opening related detail is useful; most badges only inform.  
  _From states: “Add an action only when opening related detail is useful.”_
- **recommended** `leading`: Pass the Badge's own modes object to the Icon in leading, with the Context4 that matches the treatment (solid or glass): Badge renders the leading node as given. ⚑ flagged (trace-check)  
  _From evidence: “It renders a supplied leading node verbatim, so the guide passes the same owner mode object to the public Icon and selects the matching `Context4` for Solid or Glass.”_

## Content

- **recommended** Say one thing in a few words.  
  _From corePrinciple: “Say one thing, in a few words.”_
- **recommended** `label`: Write the status, not a sentence.  
  _From content: “Write the status, not a sentence”_
- **recommended** `label`: Use familiar words.  
  _From content: “Use familiar words.”_
- **recommended** `label`: Keep tense and capitalization consistent across a set of badges.  
  _From content: “Keep tense and capitalization consistent across the same set.”_
- **recommended** `label`: Keep comparable statuses similar in length and capitalization.  
  _From doDont: “Keep comparable statuses similar in length and capitalization.”_
- **recommended** `label`: Keep the label short so the Badge stays a compact companion; its width follows the label.  
  _From sizing: “Keep the label short so the Badge remains a compact companion.”_
- **recommended** Let the label carry the meaning, and use emphasis to set priority.  
  _From corePrinciple: “Let the label carry the meaning and use emphasis to establish priority.”_

Good: “Paid”, “Due today”, “3 new”, “Pending”, “Failed”

Bad: “Payment successfully completed”, “Awaiting payment processing”, “FAILURE”

## States

| State | When | From |
| --- | --- | --- |
| Informational | Without onPress; most badges only communicate information. | states: “Most badges communicate information.” |
| Action | With onPress, when opening related detail is useful. | states: “Add an action only when opening related detail is useful.” |
| Loading | loading is true while the value is still arriving. | states: “Loading shows that the value is still arriving.” |

## Accessibility

- **recommended** `label`: Rely on the visible label for an interactive Badge's accessible name, and verify that name: Badge ignores accessibilityLabel. ⚑ flagged (trace-check)  
  _From sources: “The package currently ignores the supplied accessibilityLabel on Badge; rely on visible text and verify the resulting accessible name for an action.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Use a short status | Avoid a sentence inside the Badge | Avoid putting the whole explanation inside the Badge. |
| Match meaning and tone | Avoid contradictory signals | Conflicting words and tone make the status harder to trust. |
| Reserve strong emphasis | Avoid equal emphasis everywhere | If every status competes, the urgent one is harder to find. |
| Use a consistent vocabulary | Avoid mixed label styles | Mixed wording and capitalization slow scanning. |

## Examples

### A system status beside the item it describes, in a slim Card row.

```tsx
<Card variant="slim" modes={{ 'Color Mode': 'Light' }}>
  <HStack alignVertical="center" justifyHorizontal="space-between" modes={{ 'Color Mode': 'Light' }}>
    <Text>September payment</Text>
    <Badge label="Paid" modes={{ 'Color Mode': 'Light', 'Semantic Intent': 'System', AppearanceSystem: 'positive' }} />
  </HStack>
</Card>
```

_From inContext: “Place the compact status next to the item it describes.”_

### A solid badge with a leading icon; the Icon gets the Badge's modes, with Context4 Badge.

```tsx
<Badge
  label="Paid"
  modes={{ 'Color Mode': 'Light', 'Badge Size': 'Medium', Context4: 'Badge' }}
  leading={<Icon iconName="ic_card" modes={{ 'Color Mode': 'Light', 'Badge Size': 'Medium', Context4: 'Badge' }} />}
/>
```

_From evidence: “It renders a supplied leading node verbatim, so the guide passes the same owner mode object to the public Icon and selects the matching `Context4` for Solid or Glass.”_

### A badge that opens related detail.

```tsx
<Badge label="View details" onPress={() => {}} modes={{ 'Color Mode': 'Light' }} />
```

_From states: “Add an action only when opening related detail is useful.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `label` | `string` |  | `"Label"` |  | types | Visible label text shown inside the badge. Default "Label", from the component source. |
| `type` | `BadgeType` | default, glass | `"default"` |  | types | Visual style (matches the Figma `type` property). `'default'` is a solid token-colored pill; `'glass'` is a frosted, translucent pill backed by a real background blur (`GlassFill`) — the same glass surface used at the bottom of media/merchandising cards. Default "default", from the component source. |
| `modes` | `Modes` |  |  |  | types | Modes used to resolve design tokens (e.g. Appearance, Size) |
| `onPress` | `() => void` |  |  |  | types | Optional press handler to make the badge interactive. |
| `accessibilityLabel` ⚑ flagged (trace-check) | `string` |  |  |  | evidence (2026-09-23) | Ignored: the rendered wrapper does not get it. |
| `style` | `ViewStyle` |  |  |  | types |  |
| `labelStyle` | `TextStyle` |  |  |  | types |  |
| `leading` ⚑ flagged (trace-check) | `React.ReactNode` |  |  |  | evidence (2026-09-23) | Rendered verbatim: Badge does not pass its modes to the leading node. Declared: Optional leading node (icon/image) rendered before the label, inside the badge surface. When present, the badge lays its contents out in a row. |
| `glassOverlayColor` | `string` |  |  |  | types | Glass-only override for the translucent overlay color painted over the live blur. Defaults to the `badge/glass/color/background` token. Ignored for the `'default'` type. |
| `glassIntensity` | `number` |  |  |  | types | Glass-only override for the blur intensity on the 0–100 scale. Defaults to the `blur/minimal` token. Ignored for the `'default'` type. |
| `loading` | `boolean` |  |  |  | types | Explicit per-instance loading override. When `true`, renders a badge-shaped skeleton placeholder instead of the badge. Defaults to inheriting from the surrounding `<SkeletonGroup>`. |
| `disableTruncation` | `boolean` |  |  |  | types | When `true`, disables text truncation: the trailing ellipsis (`…`) is never shown and any `numberOfLines` clamp is ignored, so the text wraps to as many lines as it needs even when horizontal space is tight. |
| `...Omit<React.ComponentProps<typeof View>, 'style' | 'accessibilityLabel' | 'accessibilityRole'>` | `Omit<React.ComponentProps<typeof View>, 'style' \| 'accessibilityLabel' \| 'accessibilityRole'>` |  |  |  | types | Inherited React Native props the component also accepts. They are not part of the design contract and no guide documents them. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Primary"` |  | types | A token collection Badge reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `AppearanceSystem` | `mode collection` | positive, warning, negative | `"positive"` |  | types | A token collection Badge reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Badge Size` | `mode collection` | Medium, Small | `"Medium"` |  | types | A token collection Badge reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection Badge reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Emphasis` | `mode collection` | High, Medium, Low | `"High"` |  | types | A token collection Badge reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Semantic Intent` | `mode collection` | Brand, System | `"Brand"` |  | types | A token collection Badge reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context4` ⚑ flagged (trace-check) | `mode collection` | Badge, Badge/glass |  |  | evidence (2026-09-23) | The solid Figma master owns Context4=Badge. The package lists Badge/glass for the glass treatment, but the glass master's mode could not be resolved, so full mode parity is unverified. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `leading` | `React.ReactNode` |  |  |  | types | Optional leading node (icon/image) rendered before the label, inside the badge surface. When present, the badge lays its contents out in a row. |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onPress` | `() => void` |  |  |  | types | Optional press handler to make the badge interactive |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- Badge ignores accessibilityLabel on its rendered wrapper. _(evidence, 2026-09-23)_ ⚑ flagged (trace-check)
- Badge has no selected or disabled variant. _(evidence, 2026-09-23)_ ⚑ flagged (trace-check)

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/facts/props/7` · trace-check: Checked on jfs-components 0.1.60 (2026-09-23); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/props/4` · trace-check: Checked on jfs-components 0.1.60 (2026-09-23); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/modes/6` · trace-check: Checked on jfs-components 0.1.60 (2026-09-23); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/gaps/0` · trace-check: Checked on jfs-components 0.1.60 (2026-09-23); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/gaps/1` · trace-check: Checked on jfs-components 0.1.60 (2026-09-23); the installed package is 0.1.78. Re-check before relying on it.
- `/configuration/6` · trace-check: Checked on jfs-components 0.1.60 (2026-09-23); the installed package is 0.1.78. Re-check before relying on it.
- `/accessibility/0` · trace-check: Checked on jfs-components 0.1.60 (2026-09-23); the installed package is 0.1.78. Re-check before relying on it.
- `/examples/1` · trace-check: Checked on jfs-components 0.1.60 (2026-09-23); the installed package is 0.1.78. Re-check before relying on it.
