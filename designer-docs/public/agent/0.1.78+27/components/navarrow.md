# NavArrow

> Coin agent pack 0.1.78+27 (pilot). Generated from `components/navarrow.json`; the JSON is the source of truth.

- **State:** flagged (1 flag, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `31f1c5e` · built 2026-10-31T05:18:28Z
- **Category:** navigation (for discovery only, not a limit on composition) · **Tags:** chevron, arrow, back arrow, disclosure indicator, caret
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=navarrow) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1444-33) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-navarrow--docs)

Use a Nav Arrow to show that something leads elsewhere: a chevron at the end of a row, or a back arrow in a header.

## Use when

- **recommended** Show that something leads elsewhere: a chevron at the end of a row, or a back arrow in a header.  
  _From summary: “Use a Nav Arrow to show that something leads elsewhere: a chevron at the end of a row, or a back arrow in a header.”_

## Avoid when

- **discouraged** At the end of a list row: ListItem draws the forward arrow for you, so don't add a Nav Arrow there. Use instead: `ListItem`.  
  _From configuration: “At the end of a row. ListItem draws it for you.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Chevron | A 6 × 10 px chevron with a 2 px rounded grey stroke. | yes | anatomy: “A 6 × 10 px chevron with a 2 px rounded grey stroke.” |
| Touch target | With onPress, a 44 × 44 area surrounds the chevron. | no | anatomy: “With onPress, a 44 × 44 area surrounds the chevron.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

_No slots._

## Placement

- **recommended** `direction` = `Back`: Put a back arrow beside a screen title, as its own button.  
  _From configuration: “Beside a screen title, as its own button.”_
- **recommended** `direction` = `Down`: Put a down arrow next to a label that opens more content below.  
  _From configuration: “Next to a label that opens more content below.”_
- **recommended** Point forward in a row: the row leads on to another screen.  
  _From doDont: “The row leads on to another screen.”_
- **discouraged** One chevron per row: use the row's own arrow, and don't add a second one, since two chevrons look like a mistake.  
  _From doDont: “Two chevrons look like a mistake.”_
- **recommended** In a header over a list, the back arrow is its own button; each row is pressable as a whole and ListItem draws its forward arrow. The screen handles the navigation.  
  _From inContext: “The back arrow is its own button; each row is pressable as a whole and ListItem draws its forward arrow. The screen handles the navigation.”_

## Configuration

- **recommended** `direction`: Set direction to where it leads: Forward leads to another screen, Back returns to the previous one, and Down opens content below.  
  _From configuration: “Forward leads to another screen, Back returns to the previous one, and Down opens content below.”_
- **recommended** `direction`: Left out, direction is Back, a left chevron, so set Forward or Down when the arrow points elsewhere.  
  _From fact `/facts/props/0` (direction, source types)_
- **recommended** `direction` = `Forward`: Forward: at the end of a row; ListItem draws it for you.  
  _From configuration: “At the end of a row. ListItem draws it for you.”_
- **discouraged** `direction` = `Back`: Don't point back in a row: a back arrow reads as leaving, not opening.  
  _From doDont: “A back arrow reads as leaving, not opening.”_
- **recommended** `onPress`: Make the whole row pressable, and give the arrow onPress only when it stands alone.  
  _From corePrinciple: “Make the whole row pressable, and give the arrow onPress only when it stands alone.”_
- **recommended** `onPress`: Give it onPress and it gains a 44 × 44 pressable area; without it, it is a small image.  
  _From anatomy: “Give it onPress and it gains a 44 × 44 pressable area; without it, it is a small image.”_
- **discouraged** `onPress`: Don't make only the arrow pressable in a row: people tap the label and nothing happens.  
  _From doDont: “People tap the label and nothing happens.”_
- **recommended** The chevron is 6 × 10 px (10 × 6 pointing down). A pressable arrow reserves 44 × 44 px so it is easy to tap.  
  _From sizing: “The chevron is 6 × 10 px (10 × 6 pointing down). A pressable arrow reserves 44 × 44 px so it is easy to tap.”_
- **recommended** `disabled`: disabled stops presses when onPress is set; it defaults to false.  
  _From fact `/facts/props/5` (disabled, source types)_
- **recommended** `disabled`: The arrow has no disabled look.  
  _From states: “It has no disabled look.”_

## Content

- **recommended** `accessibilityLabel`: Name the destination.  
  _From content: “Name the destination”_
- **recommended** The arrow has no visible text.  
  _From content: “The arrow has no visible text.”_

Good: “Back to Home”

## States

| State | When | From |
| --- | --- | --- |
| Decorative | Without onPress: a 6 × 10 image; the row around it handles presses. | states: “A 6 × 10 image; the row around it handles presses.” |
| Pressable | With onPress: a 44 × 44 button. | states: “A 44 × 44 button; press it to see it dim.” |
| Pressed | A pressable arrow dims to 70% while pressed. | states: “With onPress it is a button that dims to 70% while pressed.” |
| Disabled | With disabled set there is no disabled look: the arrow looks as it does enabled. | states: “It has no disabled look.” |

## Accessibility

- **recommended** `onPress`: Without onPress the arrow is an image inside something pressable; with onPress it is a button.  
  _From states: “Without onPress the arrow is an image inside something pressable. With onPress it is a button”_
- **recommended** `accessibilityLabel`: When it is a button, set accessibilityLabel to where it goes, such as “Back to Home”, instead of the default “Go back”.  
  _From content: “When it is a button, set accessibilityLabel to where it goes, such as “Back to Home”, instead of the default “Go back”.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Make the whole row pressable | Make only the arrow pressable | People tap the label and nothing happens. |
| Point forward in a row | Point back in a row | A back arrow reads as leaving, not opening. |
| Use the row’s own arrow | Add a second arrow | Two chevrons look like a mistake. |

## Examples

### A header and a list of accounts, the guide's In context as its example code draws it: a back arrow beside the screen title “Accounts”, as its own button, over two account rows in a Card. The arrow's accessibilityLabel names where it goes (“Back to Home”), as the guide's Content section says. Each ListItem is pressable as a whole and draws its own forward arrow; the empty onPress handlers stand for the screen's navigation (back to Home, or opening that account).

```tsx
<VStack>
  <HStack alignVertical="center">
    <NavArrow direction="Back" accessibilityLabel="Back to Home" onPress={() => {}} />
    <Text text="Accounts" />
  </HStack>
  <Card>
    <VStack>
      <ListItem layout="Horizontal" title="Savings •• 0245" supportText="₹1,24,500" onPress={() => {}} />
      <ListItem layout="Horizontal" title="Salary •• 1180" supportText="₹48,200" onPress={() => {}} />
    </VStack>
  </Card>
</VStack>
```

_From inContext: “The back arrow is its own button; each row is pressable as a whole and ListItem draws its forward arrow. The screen handles the navigation.”_

### The guide's labelled back arrow: beside the screen title “Accounts”, a pressable Back arrow that screen readers hear as “Back to Home”. The empty onPress stands for the screen going back to Home.

```tsx
<HStack alignVertical="center">
  <NavArrow direction="Back" accessibilityLabel="Back to Home" onPress={() => {}} />
  <Text text="Accounts" />
</HStack>
```

_From content: “Screen readers hear “Back to Home”.”_

### A forward arrow at the end of a row, the guide's Forward card: ListItem draws it for you, and the whole row (“Statements”, “Monthly and yearly”) is pressable. The empty onPress stands for the screen opening Statements.

```tsx
<ListItem layout="Horizontal" title="Statements" supportText="Monthly and yearly" onPress={() => {}} />
```

_From configuration: “At the end of a row. ListItem draws it for you.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `direction` | `NavArrowDirection` | Back, Forward, Down | `"Back"` |  | types | Direction of the arrow: 'Back' (left chevron), 'Forward' (right chevron), or 'Down'. Default "Back", from the component source. |
| `modes` | `Modes` |  |  |  | types | Modes used to resolve design tokens. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Optional additional container style. |
| `accessibilityLabel` | `string` |  |  |  | types | Accessibility label for the arrow. |
| `onPress` | `() => void` |  |  |  | types | Called when the arrow is pressed. Expands the hit area to at least 44×44. |
| `disabled` | `boolean` |  | `false` |  | types | Disables press interaction when `onPress` is provided. Default false, from the component source. |
| `...SafePressableProps` | `SafePressableProps` |  |  |  | types | Inherited React Native props the component also accepts. They are not part of the design contract and no guide documents them. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection NavArrow reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 10` | `mode collection` | Default, jioPlus | `"Default"` |  | types | A token collection NavArrow reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context2` | `mode collection` | Default, AppBar | `"Default"` |  | types | A token collection NavArrow reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context5` | `mode collection` | Default, Fullscreen Modal, Mode 1 | `"Default"` |  | types | A token collection NavArrow reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `List Item Style` | `mode collection` | Default, Boxed, Minimal | `"Default"` |  | types | A token collection NavArrow reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `NavArrow Direction` | `mode collection` | Left&Right, Top&Bottom | `"Left&Right"` |  | types | A token collection NavArrow reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection NavArrow reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Profile Card Appearance` | `mode collection` | Default, Premium | `"Default"` |  | types | A token collection NavArrow reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

_No slots._

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onPress` | `() => void` |  |  |  | types | Called when the arrow is pressed. Expands the hit area to at least 44×44. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

_None recorded._

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `(whole entry)` · human: The Nav Arrow guide (31f1c5e) and its evidence were checked on 29 September 2026 on jfs-components 0.1.77 (its Sources note says “Installed jfs-components is 0.1.77”); the installed package is 0.1.78 (mirror v0.1.78-dbe0e02). NavArrow.tsx is the same blob at v0.1.77 and dbe0e02, and every guide-body sentence this entry quotes still holds, but one Sources sentence no longer does, and the entry leaves it out: “In Dark colour mode the chevron currently turns orange because of a token value, so use it on light surfaces.” With Color Mode Dark, navArrow/icon/color now resolves to rgb(241, 241, 241), a light grey, not the orange rgb(255, 153, 0) of 0.1.77 (mode/Grey/400 Dark, fixed for #177 in 636f3f5). The entry also leaves out the Sources note's other limitations (the arrows List Item, App Bar, Section and Summary Tile draw; a decorative arrow announced as an image), which still hold on dbe0e02 but were checked only on 0.1.77. Re-check the guide on 0.1.78 and publish it, then re-extract. Added by Claude Code in the overnight run agentpack-r24, for Marcin to confirm. Guide fix #547.
