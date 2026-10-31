# BrandChip

> Coin agent pack 0.1.78+21 (pilot). Generated from `components/brandchip.json`; the JSON is the source of truth.

- **State:** flagged (9 flags, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `31f1c5e` · built 2026-10-31T00:47:40Z
- **Category:** content (for discovery only, not a limit on composition) · **Tags:** chip, logo, bank, merchant, linked account
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=brandchip) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3994-3252) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-brandchip--docs)

Use Brand Chip to identify a linked brand or account with an avatar and a short label.

## Use when

- **recommended** Identify a linked brand or account with an avatar and a short label.  
  _From summary: “Use Brand Chip to identify a linked brand or account with an avatar and a short label.”_
- **recommended** Show the account in use, such as the account a payment is made from (the guide's “Paying from”).  
  _From inContext: “Show the account in use”_

## Avoid when

- **discouraged** Showing a status such as Payment complete: a status label no longer tells people which account is involved. Put the status in nearby content and keep the chip for the account.  
  _From doDont: “A status label no longer tells people which account is involved.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Avatar | The brand's image (imageSource) or the Avatar given in avatarSlot, such as a monogram; helps recognize the brand. | yes | anatomy: “Helps recognize the brand.” |
| Label | label: names the account and distinguishes it from similar accounts. | yes | anatomy: “Names the account and distinguishes it from similar accounts.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `avatarSlot` | `ReactNode` | types |

## Placement

- **recommended** Let the surrounding composition explain the chip's role, such as a “Paying from” line above it.  
  _From inContext: “The surrounding composition explains the chip’s role.”_
- **recommended** The chip grows with its content: it hugs its avatar and label rather than filling its host.  
  _From sizing: “The chip grows with its content.”_
- **recommended** `label`: The label is one line by default; in constrained hosts, use short identifiers. ⚑ flagged (trace-check)  
  _From sources: “Its label is one line by default; use short identifiers in constrained hosts.”_

## Configuration

- **recommended** Keep the avatar and the label about the same brand.  
  _From configuration: “Keep the avatar and label about the same brand.”_
- **recommended** Use an avatar or monogram for the brand named in the label.  
  _From doDont: “Use an avatar or monogram for the brand named in the label.”_
- **discouraged** Do not pair the label with another brand's avatar or monogram (such as HB beside Axis Bank • 0245): a different brand cue creates uncertainty about the account.  
  _From doDont: “A different brand cue creates uncertainty about the account.”_
- **recommended** `avatarSlot`: When no brand image is available, a monogram gives a clear fallback: an Avatar with style Monogram in avatarSlot, such as AB for Axis Bank.  
  _From configuration: “A monogram can provide a clear fallback when an image is unavailable.”_
- **recommended** `avatarSlot`: The monogram is supplied through avatarSlot by the screen: BrandChip does not replace a failed image with a monogram on its own. ⚑ flagged (trace-check)  
  _From sources: “The monogram here is supplied through the public avatarSlot; it is not an automatic image-error fallback.”_
- **REQUIRED** `imageSource`: imageSource puts the brand's image in the chip's own Avatar; it is ignored when avatarSlot is given.  
  _From fact `/facts/props/1` (imageSource, source types)_
- **recommended** `Avatar Size` = `S`: BrandChip already shows its avatar at Avatar Size S (29 px, as in Figma) and passes its modes on to the Avatar in avatarSlot. ⚑ flagged (trace-check)  
  _From evidence: “Brand Chip forwards its modes recursively and defaults the slot Avatar to S”_
- **REQUIRED** `onPress`: Make the chip actionable (onPress) only when pressing it opens account detail or a choice; to identify the current account, leave it static.  
  _From states: “Make it actionable only when it opens account detail or a choice.”_

## Content

- **recommended** Pair a recognizable identity with just enough text to distinguish it.  
  _From corePrinciple: “Pair a recognizable identity with just enough text to distinguish it.”_
- **recommended** `label`: Keep the brand name recognizable.  
  _From content: “Keep the brand name recognizable.”_
- **recommended** `label`: Include the account suffix when more than one account shares the same brand, such as Axis Bank • 0245 and Axis Bank • 1182.  
  _From content: “Include the account suffix when more than one account shares the same brand.”_
- **discouraged** `label`: Do not give different accounts identical labels.  
  _From doDont: “Avoid identical labels for different accounts.”_
- **recommended** `label`: Prefer a short brand name and a distinguishing account suffix.  
  _From sizing: “Prefer a short brand name and a distinguishing account suffix.”_
- **recommended** `label`: Keep the identifier compact: the brand and the distinguishing suffix.  
  _From doDont: “Keep the brand and the distinguishing suffix.”_
- **discouraged** `label`: Do not write a full description (such as Axis Bank savings account • 0245): long descriptions consume space needed by surrounding content.  
  _From doDont: “Long descriptions consume space needed by surrounding content.”_
- **recommended** `label`: Put a transaction status in nearby content, not in the label.  
  _From doDont: “Use nearby content for the transaction status.”_

Good: “Axis Bank • 0245”, “Axis Bank • 1182”, “Horizon Bank • 1182”, “Axis • 0245”

Bad: “Axis Bank savings account • 0245”, “Payment complete”

## States

| State | When | From |
| --- | --- | --- |
| Static | Without onPress: a read-only chip that identifies the current account. | states: “Use a static chip to identify the current account.” |
| Interactive | With onPress the chip can be pressed. Use it when pressing opens account detail or a choice, and not otherwise. | states: “Make it actionable only when it opens account detail or a choice.” |

## Accessibility

- **recommended** `accessibilityLabel`: The chip's accessibility label defaults to its label; set accessibilityLabel to replace it.  
  _From fact `/facts/props/7` (accessibilityLabel, source types)_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Use an account suffix | duplicate labels | Avoid identical labels for different accounts. |
| Match avatar and label | conflicting identities | A different brand cue creates uncertainty about the account. |
| Keep the identifier compact | full descriptions | Long descriptions consume space needed by surrounding content. |
| Keep status beside the identifier | replace identity with status | A status label no longer tells people which account is involved. |

## Examples

### The account in use, the guide's In context: a “Paying from” line explains the chip's role, and the chip names the account with an AB monogram Avatar in avatarSlot.

```tsx
<Card variant="slim">
  <VStack>
    <Text>Paying from</Text>
    <BrandChip
      label="Axis Bank • 0245"
      avatarSlot={<Avatar style="Monogram" monogram="AB" />}
    />
  </VStack>
</Card>
```

_From inContext: “The surrounding composition explains the chip’s role.”_

### Two accounts at the same bank, told apart by their account suffixes.

```tsx
<VStack>
  <BrandChip
    label="Axis Bank • 0245"
    avatarSlot={<Avatar style="Monogram" monogram="AB" />}
  />
  <BrandChip
    label="Axis Bank • 1182"
    avatarSlot={<Avatar style="Monogram" monogram="AB" />}
  />
</VStack>
```

_From content: “Include the account suffix when more than one account shares the same brand.”_

### An actionable chip (onPress) that opens the account's details.

```tsx
<BrandChip
  label="Axis Bank • 0245"
  avatarSlot={<Avatar style="Monogram" monogram="AB" />}
  onPress={() => {}}
/>
```

_From states: “Make it actionable only when it opens account detail or a choice.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `label` ⚑ flagged (trace-check) | `string` |  | `"Axis Bank • 0245"` |  | evidence (2026-09-23) | One line by default, and the label lacks flex shrink: the chip hugs its content, so a long label is not promised to fit a narrow host (the guide's long-label example runs past its 240 px host). Declared: Visible label (e.g. `"Axis Bank • 0245"`). Default "Axis Bank • 0245", from the component source. |
| `imageSource` | `ImageSourcePropType \| string` |  |  |  | types | Image shown in the avatar. Forwarded to the underlying `Avatar`'s `imageSource` prop. Pass a `require()`-ed asset, an `{ uri }` object or a remote URL string. Ignored when `avatarSlot` is provided. |
| `avatarSlot` ⚑ flagged (trace-check) | `React.ReactNode` |  |  |  | evidence (2026-09-23) | Gets the chip's modes recursively and Avatar Size S by default. BrandChip does not replace a failed image with a monogram: a monogram is an Avatar the screen puts in the slot. Declared: Slot replacing the default `Avatar`. Receives `modes` recursively, so inner `Avatar` / `IconCapsule` instances inherit theming. |
| `onPress` | `() => void` |  |  |  | types | Optional press handler — when provided, the chip becomes a `Pressable`. |
| `modes` | `Modes` |  |  |  | types | Design token modes for theming (e.g. `{ 'Color Mode': 'Light' }`). |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Container style override. |
| `labelStyle` | `StyleProp<TextStyle>` |  |  |  | types | Label style override. |
| `accessibilityLabel` | `string` |  |  |  | types | Accessibility label. Defaults to `label`. |
| `disableTruncation` | `boolean` |  |  |  | types | When `true`, disables text truncation: the trailing ellipsis (`…`) is never shown and any `numberOfLines` clamp is ignored, so the text wraps to as many lines as it needs even when horizontal space is tight. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Avatar Size` ⚑ flagged (trace-check) | `mode collection` | L, M, S, XS | `"L"` |  | evidence (2026-09-23) | BrandChip shows its avatar at S (29 px, Figma's size) unless its modes set Avatar Size. Declared: A token collection BrandChip reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Badge Size` | `mode collection` | Medium, Small | `"Medium"` |  | types | A token collection BrandChip reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection BrandChip reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 10` | `mode collection` | Default, jioPlus | `"Default"` |  | types | A token collection BrandChip reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context2` | `mode collection` | Default, AppBar | `"Default"` |  | types | A token collection BrandChip reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context4` | `mode collection` | Default, Chip, Button, Badge, Badge/glass | `"Default"` |  | types | A token collection BrandChip reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection BrandChip reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Profile Card Appearance` | `mode collection` | Default, Premium | `"Default"` |  | types | A token collection BrandChip reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `avatarSlot` | `React.ReactNode` |  |  |  | types | Slot replacing the default `Avatar`. Receives `modes` recursively, so inner `Avatar` / `IconCapsule` instances inherit theming. |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onPress` | `() => void` |  |  |  | types | Optional press handler — when provided, the chip becomes a `Pressable`. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- BrandChip has no selected or disabled state: the package offers an optional action (onPress) only. _(evidence, 2026-09-23)_ ⚑ flagged (trace-check)
- The label has no flex shrink, so a long label can run past a narrow host: the guide’s long-label example exceeds its 240 px host. Keep identifiers short. _(evidence, 2026-09-23)_ ⚑ flagged (trace-check)

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/facts/props/0` · trace-check: Checked on jfs-components 0.1.60 (2026-09-23); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/props/2` · trace-check: Checked on jfs-components 0.1.60 (2026-09-23); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/modes/0` · trace-check: Checked on jfs-components 0.1.60 (2026-09-23); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/gaps/0` · trace-check: Checked on jfs-components 0.1.60 (2026-09-23); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/gaps/1` · trace-check: Checked on jfs-components 0.1.60 (2026-09-23); the installed package is 0.1.78. Re-check before relying on it.
- `/placementAdvice/2` · trace-check: Checked on jfs-components 0.1.60 (2026-09-23); the installed package is 0.1.78. Re-check before relying on it.
- `/configuration/4` · trace-check: Checked on jfs-components 0.1.60 (2026-09-23); the installed package is 0.1.78. Re-check before relying on it.
- `/configuration/6` · trace-check: Checked on jfs-components 0.1.60 (2026-09-23); the installed package is 0.1.78. Re-check before relying on it.
- `(whole entry)` · human: The Brand Chip guide and its evidence were checked on 23 September 2026 on jfs-components 0.1.60, not on the installed 0.1.78 (mirror v0.1.78-dbe0e02). The installed BrandChip.tsx still matches what the entry says (read, not rendered). Re-extract once the guide is re-checked on 0.1.78 and published (#516). Added by Claude Code in the overnight run agentpack-batch3, for Marcin to confirm.
