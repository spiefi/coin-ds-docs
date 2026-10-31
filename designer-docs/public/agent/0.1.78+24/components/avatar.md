# Avatar

> Coin agent pack 0.1.78+24 (pilot). Generated from `components/avatar.json`; the JSON is the source of truth.

- **State:** flagged (3 flags, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `31f1c5e` · built 2026-10-31T02:32:56Z
- **Category:** content (for discovery only, not a limit on composition) · **Tags:** profile picture, profile photo, initials, monogram, user
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=avatar) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1-37658) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-avatar--docs)

Represent one person or account with an image or initials.

## Use when

- **recommended** Represent one person or account with an image or initials.  
  _From summary: “Represent one person or account with an image or initials.”_
- **recommended** Identify an account owner at a glance.  
  _From inContext: “Identify an account owner at a glance”_

## Avoid when

- **discouraged** Showing different people with the Image style and no imageSource: they all get the same bundled fallback and can't be told apart. Use a portrait or clear initials instead.  
  _From doDont: “Both images resolve to the same bundled fallback and cannot distinguish separate identities.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Circle and border | Avatar Size sets the token-owned width and height; its default radius resolves to a circle. | yes | anatomy: “Avatar Size sets the token-owned width and height; its default radius resolves to a circle.” |
| Monogram content | The Monogram style centers the supplied text and uses Avatar label tokens. | no | anatomy: “The Monogram style centers the supplied text and uses Avatar label tokens.” |
| Image content | The Image style crops a supplied image source into the same circular frame. | no | anatomy: “The Image style crops a supplied image source into the same circular frame.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

_No slots._

## Placement

- **recommended** A surrounding Card may add a name or role when the layout calls for it; Avatar does not require nearby text.  
  _From inContext: “A surrounding Card may add a name or role when the layout calls for it; Avatar does not require nearby text.”_
- **recommended** `Avatar Size`: A surrounding card or row can give it room, but doesn't stretch it: its size comes from Avatar Size.  
  _From sizing: “A surrounding card or row can provide room, but it does not stretch Avatar automatically.”_

## Configuration

- **recommended** `style`: Use a real image when available; use a short monogram otherwise.  
  _From corePrinciple: “Use a real image when available; use a short monogram otherwise.”_
- **recommended** `style`: style selects which content is rendered: Monogram shows its monogram text; Image shows imageSource, or the package fallback when there is none.  
  _From configuration: “Style selects which content is rendered. Monogram uses its text property; Image uses imageSource and otherwise shows the package fallback.”_
- **recommended** `style` = `Monogram`: style is Image by default: set style="Monogram" to show initials.  
  _From fact `/facts/props/1` (style, source types)_
- **recommended** `imageSource`: Image: provide an image source that represents this person. The bundled fallback is only a preview when no source is supplied.  
  _From configuration: “Provide an image source that represents this person. The bundled fallback is only a preview when no source is supplied.”_
- **recommended** `monogram`: Monogram: use a short, recognizable set of initials when a portrait is not available.  
  _From configuration: “Use a short, recognizable set of initials when a portrait is not available.”_
- **recommended** `Avatar Size`: Pick one of the four Avatar Size modes: L 42 px, M 36 px, S 29 px or XS 14 px.  
  _From sizing: “Pick one of the four Avatar Size modes”_
- **recommended** `Avatar Size` = `L`: With no Avatar Size set, an Avatar is L, 42 px.  
  _From fact `/facts/modes/0` (Avatar Size, source types)_
- **recommended** `loading`: loading true shows a same-size circular placeholder instead of the avatar; left unset, it follows the surrounding SkeletonGroup.  
  _From fact `/facts/props/7` (loading, source types)_

## Content

- **recommended** `style`: Set style to Image or Monogram, then supply the matching image source or monogram text.  
  _From content: “Set Style to Image or Monogram, then supply the matching image source or monogram text.”_
- **recommended** `monogram`: Use monogram text: supply initials for a compact, text-based identity.  
  _From content: “Supply initials for a compact text based identity.”_
- **recommended** `imageSource`: Supply image content: set imageSource to the intended image.  
  _From content: “Set imageSource to the intended image.”_
- **recommended** `Avatar Size` = `XS`: Use one letter at XS (14 px).  
  _From content: “Use one letter at XS”_
- **recommended** Give every identity meaningful content: each Avatar shows its own portrait or monogram.  
  _From doDont: “Each Avatar shows its own portrait or monogram content.”_

Good: “MS”, “AK”

## States

| State | When | From |
| --- | --- | --- |
| Ready | The image or monogram remains inside the chosen Avatar Size. | states: “The image or monogram remains inside the chosen Avatar Size.” |
| Loading | While the image or monogram is unavailable: a same-size, neutral, token-backed Skeleton circle replaces the identity content. | states: “It replaces the identity content with a same-size neutral placeholder.” |

## Accessibility

- **discouraged** Don't rely on Avatar to announce who it is or to act as a button: this version drops its typed accessibility label and keeps role image on the press wrapper, so the guide's examples stay non-interactive. ⚑ flagged (trace-check)  
  _From sources: “This version drops its typed accessibility label and keeps role image on the press wrapper, so examples remain non-interactive.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Use a portrait or clear initials | Reuse the built-in fallback for different people | Both images resolve to the same bundled fallback and cannot distinguish separate identities. |

## Examples

### An account owner in a Card, the guide's In context: a Monogram Avatar beside the owner's role and the account. The Card adds that context; the Avatar itself needs no nearby text. It is at M (36 px), the size the guide's In context card draws in its code (its copy names no size).

```tsx
<Card variant="slim">
  <HStack alignVertical="center">
    <Avatar style="Monogram" monogram="MS" modes={{ 'Avatar Size': 'M' }} />
    <VStack>
      <Card.Title>Account owner</Card.Title>
      <Card.SupportText>Shared savings account</Card.SupportText>
    </VStack>
  </HStack>
</Card>
```

_From inContext: “A surrounding Card may add a name or role when the layout calls for it; Avatar does not require nearby text.”_

### A person's own photo, the Image style (the default) at the default size, L (42 px). The URI stands for the image that represents this person; with no imageSource the Avatar would show the bundled fallback, which is only a preview.

```tsx
<Avatar imageSource={{ uri: 'https://example.com/photos/meera-shah.jpg' }} />
```

_From content: “Set imageSource to the intended image.”_

### The smallest size, XS (14 px), with one monogram letter, as the guide's Content shows.

```tsx
<Avatar style="Monogram" monogram="M" modes={{ 'Avatar Size': 'XS' }} />
```

_From content: “The XS example shows a single monogram letter.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `monogram` | `string` |  | `"MS"` |  | types | Default "MS", from the component source. |
| `style` | `'Image' \| 'Monogram'` | Image, Monogram | `"Image"` |  | types | Default "Image", from the component source. |
| `modes` | `Modes` |  |  |  | types |  |
| `imageSource` | `ImageSourcePropType \| string` |  |  |  | types |  |
| `accessibilityLabel` ⚑ flagged (trace-check) | `string` |  |  |  | evidence (2026-09-23) | Accepted by the type but discarded: the implementation hides the inner image and text from accessibility and gives the pressable wrapper role image. |
| `onPress` | `() => void` |  |  |  | types |  |
| `disabled` | `boolean` |  |  |  | types |  |
| `loading` | `boolean` |  |  |  | types | Explicit per-instance loading override. When `true`, renders a same-size circular skeleton instead of the avatar. Defaults to inheriting from the surrounding `<SkeletonGroup>`. |
| `...Omit<React.ComponentProps<typeof View>, 'style' | 'accessibilityRole' | 'accessibilityLabel'>` | `Omit<React.ComponentProps<typeof View>, 'style' \| 'accessibilityRole' \| 'accessibilityLabel'>` |  |  |  | types | Inherited React Native props the component also accepts. They are not part of the design contract and no guide documents them. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Avatar Size` | `mode collection` | L, M, S, XS | `"L"` |  | types | A token collection Avatar reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Badge Size` | `mode collection` | Medium, Small | `"Medium"` |  | types | A token collection Avatar reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection Avatar reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 10` | `mode collection` | Default, jioPlus | `"Default"` |  | types | A token collection Avatar reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context2` | `mode collection` | Default, AppBar | `"Default"` |  | types | A token collection Avatar reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context4` | `mode collection` | Default, Chip, Button, Badge, Badge/glass | `"Default"` |  | types | A token collection Avatar reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection Avatar reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Profile Card Appearance` | `mode collection` | Default, Premium | `"Default"` |  | types | A token collection Avatar reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

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

- `/facts/props/4` · trace-check: Checked on jfs-components 0.1.60 (2026-09-23); the installed package is 0.1.78. Re-check before relying on it.
- `/accessibility/0` · trace-check: Checked on jfs-components 0.1.60 (2026-09-23); the installed package is 0.1.78. Re-check before relying on it.
- `(whole entry)` · human: The Avatar guide and its evidence were checked on 23 September 2026 on jfs-components 0.1.60 (its Sources note still says so); the installed package is 0.1.78 (mirror v0.1.78-dbe0e02). Read against the installed Avatar.tsx and Skeleton.tsx, every sentence this entry quotes still holds, but loading no longer needs a SkeletonGroup: Avatar draws its same-size placeholder when loading is true on its own (Avatar.tsx lines 167 and 224, visible={loading === true}; Skeleton.tsx lines 134 and 272–275). So the States description (“Loading is a runtime state supplied through SkeletonGroup, not a style or size variant.”), the Sources line (“Loading replaces Avatar content with a neutral, token-backed Skeleton inside an active SkeletonGroup.”) and the evidence (“a direct `loading={true}` outside an active `SkeletonGroup` renders no placeholder”) say less than the package; the entry follows the package’s loading fact and doesn’t quote them. Re-check the guide on 0.1.78 and publish it, then re-extract. Added by Claude Code in the overnight run agentpack-batch11, for Marcin to confirm. Guide fix #533.
