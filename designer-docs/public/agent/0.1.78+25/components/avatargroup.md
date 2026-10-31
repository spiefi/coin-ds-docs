# AvatarGroup

> Coin agent pack 0.1.78+25 (pilot). Generated from `components/avatargroup.json`; the JSON is the source of truth.

- **State:** flagged (5 flags, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `31f1c5e` · built 2026-10-31T03:15:31Z
- **Category:** content (for discovery only, not a limit on composition) · **Tags:** avatar stack, facepile, people, users
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=avatargroup) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1366-15672) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-avatargroup--docs)

Show several people or identities as one compact visual cue.

## Use when

- **recommended** Show several people or identities as one compact visual cue.  
  _From summary: “Show several people or identities as one compact visual cue.”_
- **recommended** Show who can access a shared account.  
  _From inContext: “Show who can access a shared account”_

## Avoid when

_None in the guide._

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| First child | It starts at the back of the visual order and gives the group its first face. | yes | anatomy: “It starts at the back of the visual order and gives the group its first face.” |
| Middle child | It overlaps the first child and sits behind the last. | no | anatomy: “It overlaps the first child and sits behind the last.” |
| Last child | The final child is drawn in front. Child order therefore changes which face leads. | yes | anatomy: “The final child is drawn in front. Child order therefore changes which face leads.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `children` | `ReactNode` | types |

## Placement

- **recommended** Give the host room for every child: the row grows with its child count.  
  _From sizing: “The row grows with its child count.”_
- **recommended** `Avatar Size`: A narrower host doesn't shrink the Avatars: select a supported Avatar Size that fits (the guide fits four children at M in a 196 px host and at S in a 112 px host).  
  _From sizing: “A narrower host does not reduce Avatar Size automatically, so select a supported size that fits.”_
- **discouraged** Don't overfill a fixed-width host: a row with more children than fit extends past it, and the guide's host clips the outer Avatars.  
  _From doDont: “This five-child row extends past both edges, so the host clips its outer Avatars.”_
- **recommended** A Coin Card can wrap a title, support text and the AvatarGroup in one composition; the Card adds that optional context outside the group.  
  _From inContext: “A public Coin Card can wrap its title, support text, and AvatarGroup in one composition.”_

## Configuration

- **recommended** `Avatar Size`: Avatar Size belongs to the group: set it once on the AvatarGroup, and the group gives that one size to every child.  
  _From configuration: “Avatar Size belongs to the group mode.”_
- **recommended** `Avatar Size`: Share one size across the Avatar children.  
  _From corePrinciple: “Share one size across the Avatar children.”_
- **discouraged** `Avatar Size`: Don't set Avatar Size on a child: a child's own mode takes precedence over the group's, so that child comes out a different size from the others.  
  _From doDont: “An explicit L child mode takes precedence over the group’s M mode.”_
- **recommended** `Avatar Size` = `L`: With no Avatar Size set, the group and its children are L (42 px).  
  _From fact `/facts/modes/0` (Avatar Size, source types)_
- **recommended** `Avatar Size`: Avatar Size L, M, S and XS make every child 42, 36, 29 or 14 px. ⚑ flagged (trace-check)  
  _From sources: “Figma’s Avatar Size mode sets L/M/S/XS to 42/36/29/14 px.”_
- **recommended** There is no separate count or gap control: the children supply the members and their image or monogram.  
  _From configuration: “The children supply the image or monogram; there is no separate count or gap control.”_
- **recommended** AvatarGroup adds no selected, disabled or loading state of its own: loading belongs to each Avatar child.  
  _From states: “Avatar Group does not add a selected, disabled, or loading state.”_

## Content

- **recommended** Use Avatar children: the group's content is the Avatar instances supplied inside it.  
  _From content: “The group’s content is the Avatar instances supplied inside it.”_
- **recommended** The group itself contains only its Avatar children; a title or support text stays outside it, for example in a surrounding Card.  
  _From inContext: “The group itself contains only its Avatar children.”_
- **recommended** Each child supplies its own image or monogram content.  
  _From content: “Each child supplies its own image or monogram content.”_
- **recommended** Order the children intentionally: the last child sits in front, so child order changes which face leads.  
  _From content: “The last child sits in front in the overlapping group.”_
- **recommended** For an Image child, supply that person's own imageSource: with none, the Avatar shows a bundled fallback image, which is not a person record. ⚑ flagged (trace-check)  
  _From evidence: “With no `imageSource`, the implementation displays a bundled fallback image; use a supplied person-specific source for identity rather than treating the fallback as a person record.”_

Good: “MS”, “AK”, “LS”, “DV”

## States

| State | When | From |
| --- | --- | --- |
| All Avatars ready | The group stays a compact composition of the children it receives. | states: “The group stays a compact composition of the children it receives.” |
| One child is loading | One Avatar child is loading: it shows a same-size skeleton while the other Avatar children remain visible. | states: “The loading child shows a same-size skeleton while the other Avatar children remain visible.” |

## Accessibility

- **discouraged** Don't rely on the Avatar children to announce who is in the group: Avatar discards its accessibility label and hides its image and initials from accessibility. ⚑ flagged (trace-check)  
  _From evidence: “The guides do not present it as an accessible action or rely on Avatar to announce its content.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Set one owner size | Override a child’s size | An explicit L child mode takes precedence over the group’s M mode. |
| Fit three M children | Overfill a fixed host | This five-child row extends past both edges, so the host clips its outer Avatars. |

## Examples

### Who can view a shared account, the guide's In context: a Card wraps the title, the support text and the AvatarGroup, and the group holds only its three Monogram Avatars. The size, M (36 px), is set once on the group: it is what the guide's In context card draws in its code (its copy names no size), and what its Do & Don't's three children inherit. The Avatars set no size of their own.

```tsx
<Card variant="slim">
  <HStack alignVertical="center" justifyHorizontal="space-between">
    <VStack>
      <Card.Title>Shared savings</Card.Title>
      <Card.SupportText>People who can view this account</Card.SupportText>
    </VStack>
    <AvatarGroup modes={{ 'Avatar Size': 'M' }}>
      <Avatar style="Monogram" monogram="MS" />
      <Avatar style="Monogram" monogram="AK" />
      <Avatar style="Monogram" monogram="LS" />
    </AvatarGroup>
  </HStack>
</Card>
```

_From inContext: “A public Coin Card can wrap its title, support text, and AvatarGroup in one composition.”_

### Two people at the default size, L (42 px), with no modes set: the group gives both one size, and each Avatar brings its own content, a person's own photo (the Image style, the default; the URI stands for that person's image) or initials.

```tsx
<AvatarGroup>
  <Avatar imageSource={{ uri: 'https://example.com/photos/meera-shah.jpg' }} />
  <Avatar style="Monogram" monogram="AK" />
</AvatarGroup>
```

_From configuration: “The group mode supplies one size to every child; each Avatar supplies its own image or monogram.”_

### Four people in a narrow place, like the guide's 112 px host: the group doesn't shrink its Avatars, so select a supported size that fits, here S (29 px), set once on the group.

```tsx
<AvatarGroup modes={{ 'Avatar Size': 'S' }}>
  <Avatar style="Monogram" monogram="MS" />
  <Avatar style="Monogram" monogram="AK" />
  <Avatar style="Monogram" monogram="LS" />
  <Avatar style="Monogram" monogram="DV" />
</AvatarGroup>
```

_From sizing: “A narrower host does not reduce Avatar Size automatically, so select a supported size that fits.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `modes` | `Modes` |  |  |  | types |  |
| `children` | `React.ReactNode` |  |  |  | types |  |
| `style` | `ViewStyle` |  |  |  | types |  |
| `...React.ComponentProps<typeof View>` | `React.ComponentProps<typeof View>` |  |  |  | types | Inherited React Native props the component also accepts. They are not part of the design contract and no guide documents them. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Avatar Size` | `mode collection` | L, M, S, XS | `"L"` |  | types | A token collection AvatarGroup reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Badge Size` | `mode collection` | Medium, Small | `"Medium"` |  | types | A token collection AvatarGroup reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection AvatarGroup reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context2` | `mode collection` | Default, AppBar | `"Default"` |  | types | A token collection AvatarGroup reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context4` | `mode collection` | Default, Chip, Button, Badge, Badge/glass | `"Default"` |  | types | A token collection AvatarGroup reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection AvatarGroup reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types |  |

### Events

_No events._

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

_None recorded._

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/configuration/4` · trace-check: Checked on jfs-components 0.1.60 (2026-09-23); the installed package is 0.1.78. Re-check before relying on it.
- `/accessibility/0` · trace-check: Checked on jfs-components 0.1.60 (2026-09-23); the installed package is 0.1.78. Re-check before relying on it.
- `/content/rules/4` · trace-check: Checked on jfs-components 0.1.60 (2026-09-23); the installed package is 0.1.78. Re-check before relying on it.
- `/avoidWhen` · trace-check: The guide gives no avoidWhen guidance; left empty rather than guessed.
- `(whole entry)` · human: The Avatar Group guide and its evidence were checked on 23 September 2026 on jfs-components 0.1.60 (its Sources note still says so); the installed package is 0.1.78 (mirror v0.1.78-dbe0e02). Read against the installed AvatarGroup.tsx and Avatar.tsx, with their tokens through the package's resolver, every sentence this entry quotes still holds, and no Avatar Group copy is wrong except the Sources note's version line (“The declared and installed jfs-components version is 0.1.60; the earlier registry check on 23 September also returned 0.1.60. A fresh registry lookup could not be confirmed during recovery because registry DNS was unavailable.”). The shared evidence's loading line (“a direct `loading={true}` outside an active `SkeletonGroup` renders no placeholder”, and the group example's SkeletonGroup wrapper) says less than the package: one Avatar child with loading true draws its same-size skeleton on its own (Avatar.tsx lines 167 and 216–226; Skeleton.tsx lines 134 and 272–275); the entry doesn't quote it. Re-check the guide on 0.1.78 and publish it, then re-extract. Added by Claude Code in the overnight run agentpack-batch14, for Marcin to confirm. Guide fix #533.
