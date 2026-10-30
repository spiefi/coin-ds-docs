# Skeleton

> Coin agent pack 0.1.78+19 (pilot). Generated from `components/skeleton.json`; the JSON is the source of truth.

- **State:** documented
- **Package:** jfs-components 0.1.78 · guide commit `3f56271` · built 2026-10-30T12:30:13Z
- **Category:** feedback (for discovery only, not a limit on composition) · **Tags:** loading placeholder, shimmer, ghost content, loading state
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=skeleton) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-skeleton--docs)

Use a Skeleton group to show the shape of content while it loads, so the screen doesn't jump when it arrives.

## Use when

- **recommended** Show the shape of content while it loads, with a SkeletonGroup, so the screen doesn't jump when it arrives.  
  _From summary: “Use a Skeleton group to show the shape of content while it loads, so the screen doesn't jump when it arrives.”_
- **recommended** Show the shape of what's coming, then fill it in place.  
  _From corePrinciple: “Show the shape of what's coming, then fill it in place.”_
- **recommended** Refreshing a list, such as holdings: the rows go into their loading state, then the content swaps back in place.  
  _From inContext: “Refresh puts the holdings into their loading state for two seconds, then swaps the content back in place.”_

## Avoid when

- **discouraged** Covering the loading area with one block: it hides how much is coming, and the layout jumps when it loads.  
  _From doDont: “One block hides how much is coming, and the layout jumps when it loads.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Text bar | A Skeleton with kind text: a bar with fully rounded ends, one per line of text. | no | anatomy: “kind text: a bar with fully rounded ends, one per line of text.” |
| Image block | A Skeleton with kind image: 10 px corners, as big as the image it replaces. | no | anatomy: “kind image: 10 px corners, as big as the image it replaces.” |
| Shimmer | A white band that sweeps across every block each 1.5 s while the group loads. | no | anatomy: “A white band sweeps across every block each 1.5 s.” |
| Badge block | A Skeleton with kind badge: 4 px corners, like a badge. | no | anatomy: “kind badge: 4 px corners, like a badge.” |
| Circle or rounded bar | A Skeleton with kind other, the default: a circle when square, else a rounded bar. | no | anatomy: “kind other, the default: a circle when square, else a rounded bar.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

_No slots._

## Placement

- **recommended** Put the same components in the SkeletonGroup that will show the content, so the placeholders mirror the real layout.  
  _From content: “Put the same components in the group that will show the content”_
- **recommended** Keep the real layout while loading: each row keeps its shape, so nothing jumps when content arrives.  
  _From doDont: “Each row keeps its shape, so nothing jumps when content arrives.”_
- **recommended** A Skeleton placed by hand still needs a group (SkeletonGroup) around it.  
  _From sources: “A Skeleton placed by hand still needs a group.”_

## Configuration

- **recommended** `kind`: A Skeleton's kind sets only its corners; its width and height are yours.  
  _From configuration: “A Skeleton's kind sets only its corners; its width and height are yours.”_
- **recommended** `kind` = `text`: kind text: rounded bars, one per line; match each line's height.  
  _From configuration: “Rounded bars, one per line; match each line's height.”_
- **recommended** `kind` = `image`: kind image: 10 px corners, as big as the image it stands in for.  
  _From configuration: “10 px corners, as big as the image it stands in for.”_
- **recommended** `kind` = `badge`: kind badge: 4 px corners, the size of a badge.  
  _From configuration: “4 px corners, the size of a badge.”_
- **recommended** `kind` = `other`: kind other is the default: square sizes make a circle, wide ones a rounded bar, for avatars and buttons.  
  _From configuration: “The default kind: square sizes make a circle, wide ones a rounded bar, for avatars and buttons.”_
- **recommended** Inside a group, Coin components such as Text, Avatar, Badge, and Button draw their own placeholder at their own size, so you rarely place a Skeleton by hand.  
  _From configuration: “Inside a group, Coin components such as Text, Avatar, Badge, and Button draw their own placeholder at their own size, so you rarely place a Skeleton by hand.”_
- **recommended** A SkeletonGroup switches every placeholder inside it; Text, Avatar, Badge, Button, Image and other Coin components draw their own, and a Skeleton places one by hand.  
  _From sources: “In code a SkeletonGroup switches every placeholder inside it; Text, Avatar, Badge, Button, Image, and other Coin components draw their own, and a Skeleton places one by hand.”_
- **recommended** Coin components size their own placeholders: a Text bar is as tall as its line and about as long as its words, and an Avatar's is its own size.  
  _From sizing: “Coin components size their own placeholders: a Text bar is as tall as its line and about as long as its words, and an Avatar's is its own size.”_
- **recommended** `width`: A hand-placed Skeleton has no size until you give it a width and height; percentages follow its host.  
  _From sizing: “A hand-placed Skeleton has no size until you give it a width and height; percentages follow its host.”_
- **recommended** `SkeletonGroup.loading`: The group's loading flag switches every placeholder inside it at once.  
  _From states: “The group's loading flag switches every placeholder inside it at once.”_
- **recommended** `SkeletonGroup.reducedMotion`: Reduced motion follows the device, or the group sets it (reducedMotion); then the blocks pulse gently instead of the moving band.  
  _From states: “When the device asks for reduced motion, or the group sets it, the blocks pulse gently instead.”_
- **recommended** `context5` = `Fullscreen Modal`: Inside a FullscreenModal, the modal gives its content this context (context5 Fullscreen Modal), which turns the blocks deep brown for dark media.  
  _From configuration: “Fullscreen Modal gives its content this context, which turns the blocks deep brown for dark media.”_

## Content

- **recommended** Give the components in the group realistic sample text, so each placeholder has the right length.  
  _From content: “with realistic sample text, so each placeholder has the right length.”_
- **recommended** Anything already known, such as a heading, stays real with loading off (loading={false} on that component).  
  _From content: “Anything already known, such as a heading, stays real with loading off.”_
- **recommended** Keep known text real: people can read the heading while the values load.  
  _From doDont: “People can read the heading while the values load.”_
- **discouraged** Don't grey out everything: turning known text grey makes people wait for nothing.  
  _From doDont: “Turning known text grey makes people wait for nothing.”_

## States

| State | When | From |
| --- | --- | --- |
| Loading | While the group loads, placeholders hold the layout and a white band sweeps across them every 1.5 s, each a little after the one before. | states: “Placeholders hold the layout, and the shimmer runs down them in a cascade.” |
| Loaded | With loading off, the same components show their content in the same places. | states: “The same components show their content in the same places.” |
| Reduced motion | When the device asks for reduced motion, or the group sets reducedMotion, a slow white pulse every 3 s replaces the moving band. | states: “A slow white pulse every 3 s replaces the moving band.” |
| Outside a group | A component's own loading draws its placeholder with no group, and screen readers hear “Loading”. | states: “loading on its own draws that line’s placeholder too, and screen readers hear “Loading”.” |

## Accessibility

- **recommended** Inside a group the blocks are hidden from screen readers, and the group announces “Loading” once.  
  _From sources: “inside a group the blocks are hidden from screen readers and the group announces “Loading” once.”_
- **recommended** Outside a group, a component's own loading draws its placeholder, named “Loading”.  
  _From sources: “Since the #266 fix a component’s loading draws its placeholder without a group too, named “Loading””_
- **recommended** When the device asks for reduced motion, or the group sets it, the blocks pulse gently instead of the moving band.  
  _From states: “When the device asks for reduced motion, or the group sets it, the blocks pulse gently instead.”_
- **recommended** On the web, placeholders in a loading group are aria-hidden with role presentation, and the group adds one hidden progressbar named “Loading” in a polite live region.  
  _From evidence: “Inside a loading group, placeholders are `aria-hidden="true"` `role="presentation"`, and the group adds one hidden `progressbar` "Loading" with `aria-live="polite"`”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Keep the real layout | Cover it with one block | One block hides how much is coming, and the layout jumps when it loads. |
| Keep known text real | Grey out everything | Turning known text grey makes people wait for nothing. |

## Examples

### Refreshing holdings, the guide's In context: the screen sets the group's loading while it refreshes the holdings, then turns it off and the content swaps back in place. The title and the button sit outside the group and stay real; each Text and Badge in the rows draws its own placeholder.

```tsx
<VStack>
  <Text>Your holdings</Text>
  <SkeletonGroup loading>
    <HStack alignVertical="center">
      <VStack style={{ flex: 1 }}>
        <Text>Reliance Industries</Text>
        <Text>64 units · ₹1,52,900</Text>
      </VStack>
      <Badge label="Equity" />
    </HStack>
    <HStack alignVertical="center">
      <VStack style={{ flex: 1 }}>
        <Text>HDFC Bank</Text>
        <Text>120 units · ₹1,98,400</Text>
      </VStack>
      <Badge label="Equity" />
    </HStack>
  </SkeletonGroup>
  <Button label="Refresh" onPress={() => {}} />
</VStack>
```

_From inContext: “Refresh puts the holdings into their loading state for two seconds, then swaps the content back in place. The title and the button stay real.”_

### Known title, loading values: the heading is inside the loading group but keeps loading={false}, so it stays readable; only the values still loading turn into placeholders.

```tsx
<SkeletonGroup loading>
  <VStack>
    <Text loading={false}>Your holdings</Text>
    <HStack alignVertical="center">
      <VStack style={{ flex: 1 }}>
        <Text>Reliance Industries</Text>
        <Text>64 units · ₹1,52,900</Text>
      </VStack>
      <Badge label="Equity" />
    </HStack>
    <HStack alignVertical="center">
      <VStack style={{ flex: 1 }}>
        <Text>HDFC Bank</Text>
        <Text>120 units · ₹1,98,400</Text>
      </VStack>
      <Badge label="Equity" />
    </HStack>
  </VStack>
</SkeletonGroup>
```

_From content: “The title stays readable; only the values still loading turn into placeholders.”_

### Placeholders placed by hand, the guide's anatomy: one Skeleton of each kind inside a loading group, each given its own width and height. kind sets only the corners.

```tsx
<SkeletonGroup loading>
  <VStack>
    <Skeleton kind="text" width={220} height={20} />
    <Skeleton kind="image" width={220} height={120} />
    <Skeleton kind="badge" width={70} height={20} />
    <Skeleton kind="other" width={48} height={48} />
  </VStack>
</SkeletonGroup>
```

_From anatomy: “Each placeholder is a light grey block whose kind sets its corners.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `kind` | `SkeletonKind` | image, text, badge, other | `"other"` |  | evidence (2026-10-12) | kind sets only the corner radius: text and other 9999 (fully rounded ends, or a circle when square), image 10, badge 4. Declared: Visual category — controls only the corner-radius token. Sizes are still supplied via `width`/`height`. Defaults to `'other'`. Default "other", from the component source. |
| `width` | `DimensionValue` |  |  |  | types | Width of the rectangular placeholder. Numbers are dp, strings are RN dimensions. |
| `height` | `DimensionValue` |  |  |  | types | Height of the rectangular placeholder. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Optional style overrides merged onto the base layer (e.g. `marginTop`, `alignSelf`). Avoid `backgroundColor` and `borderRadius` here — use the design tokens instead so the system stays consistent. |
| `modes` | `Modes` |  |  |  | types | Modes for token resolution (forwarded to `getVariableByName`). Most consumers can omit this — defaults work for every standard mode. |
| `visible` | `boolean` |  | `false` |  | evidence (2026-10-17) | A visible placeholder draws with no group, runs its own shimmer, and is a progressbar named “Loading”. Primitives set it from their own loading. Declared: Draw the placeholder even when no `SkeletonGroup` is loading. Primitives set this when their own `loading` prop is true. A sprinkled `<Skeleton />` leaves it unset, so an idle group still hides it. Default false, from the component source. |
| `SkeletonGroup.loading` | `boolean` |  |  | yes | evidence (2026-10-12) | On SkeletonGroup, required: while true, every Skeleton and every Coin component that draws its own placeholder inside the group shows its placeholder, except a component that sets loading={false}; a nested group replaces the outer one. false shows the content. |
| `SkeletonGroup.reducedMotion` | `boolean` |  |  |  | evidence (2026-10-12) | On SkeletonGroup: left unset, the group follows the device's reduced-motion setting; true or false forces it. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `context5` | `mode collection` | Default, Fullscreen Modal, Mode 1 | `"Default"` |  | evidence (2026-10-12) | Not in the package's mode list for Skeleton, but it sets the block colour: Default is light grey (#e7e7e7) in every Color Mode; Fullscreen Modal is deep brown (rgb(44, 37, 27)) in Light. FullscreenModal always passes it to its content. |

### Slots

_No slots._

### Events

_No events._

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- Figma has no Skeleton component: the Coin variables hold its grey and its corner radii, and the ticket's Figma link opens the Stepper Item page. _(evidence, 2026-10-17)_
- The published Storybook page is still the old generated one, and it gives a lighter grey than the code's #e7e7e7. _(evidence, 2026-10-17)_

## Flags

_None._
