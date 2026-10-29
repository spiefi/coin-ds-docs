# Drawer

> Coin agent pack 0.1.78+15 (pilot). Generated from `components/drawer.json`; the JSON is the source of truth.

- **State:** documented
- **Package:** jfs-components 0.1.78 · guide commit `b4988c5` · built 2026-10-29T07:47:24Z
- **Category:** layout (for discovery only, not a limit on composition) · **Tags:** bottom drawer, bottom sheet, draggable sheet, handle
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=drawer) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2847-3454) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-drawer--docs)

Use a Drawer for a panel that peeks from the bottom of a screen and drags up to show more, such as recent transactions.

## Use when

- **recommended** A panel that peeks from the bottom of a screen and drags up to show more, such as recent transactions.  
  _From summary: “Use a Drawer for a panel that peeks from the bottom of a screen and drags up to show more, such as recent transactions.”_
- **recommended** Content that stays on the screen: always there, as a peek or pulled up to read more.  
  _From corePrinciple: “Always there: a peek, or pulled up to read more.”_

## Avoid when

- **discouraged** Something people close or dismiss: a Drawer never closes; collapsed is its smallest size.  
  _From states: “It never closes: collapsed is its smallest size.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Handle | A button: press it, or drag it or the content, to resize. | yes | anatomy: “A button: press it, or drag it or the content, to resize.” |
| Title | Optional; stays in place while the content scrolls. | no | anatomy: “Optional; stays in place while the content scrolls.” |
| Content | Scrolls inside the sheet; give each item its own modes. | no | anatomy: “Scrolls inside the sheet; give each item its own modes.” |
| Sheet | Grey, with 12 px top corners and a soft shadow. | yes | anatomy: “Grey, with 12 px top corners and a soft shadow.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `header` | `ReactNode` | types |
| `children` | `ReactNode` | types |

## Placement

- **recommended** The drawer spans the screen it sits in.  
  _From sizing: “The drawer spans the screen it sits in.”_
- **recommended** Its content starts 71 px below the top of the sheet, as in Figma.  
  _From sizing: “Its content starts 71 px below the top of the sheet, as in Figma.”_
- **recommended** In the guide, the drawer peeks under the home screen; people drag it or press its handle to expand it, and the screen’s See all transactions button opens it too.  
  _From inContext: “The drawer peeks under the home screen. People drag it or press its handle to expand it, and the screen’s See all transactions button opens it too.”_

## Configuration

- **recommended** `collapsedHeight`: Set how much of the drawer peeks when collapsed (collapsedHeight), so the title and the first item show.  
  _From configuration: “Set how much of the drawer peeks when collapsed, so the title and the first item show.”_
- **recommended** `collapsedHeight`: Collapsed, it shows 200 px by default.  
  _From sizing: “Collapsed, it shows 200 px by default”_
- **recommended** `expandedRatio`: Expanded, it is 90% of its screen’s height (expandedRatio), and never more than 95%.  
  _From sizing: “expanded, it is 90% of that screen’s height, and never more than 95%”_
- **recommended** `showOverlay`: With a scrim (showOverlay), the screen dims behind the drawer and taps on it don’t get through.  
  _From configuration: “The screen dims behind the drawer and taps on it don’t get through.”_
- **recommended** With the scrim on, onOverlayPress is called when the scrim (the area outside the sheet) is pressed.  
  _From fact `/facts/props/18` (onOverlayPress, source types)_
- **recommended** `state`: To open or collapse it from the screen, pass state: the drawer animates to it, and drags and handle presses are reported through onStateChange for the screen to apply back.  
  _From fact `/facts/props/8` (state, source evidence)_

## Content

- **recommended** `title`: Title the drawer with what it holds.  
  _From content: “Title the drawer with what it holds.”_
- **recommended** Collapsed, people see only the title and the first item or two, so put the most useful item first.  
  _From content: “Collapsed, people see only the title and the first item or two, so put the most useful item first.”_
- **recommended** `collapsedHeight`: Peek enough to read: the title and the first item say what’s inside.  
  _From doDont: “The title and the first item say what’s inside.”_
- **discouraged** `collapsedHeight`: Do not peek only the handle: people can’t tell what the drawer holds.  
  _From doDont: “People can’t tell what the drawer holds.”_
- **discouraged** `title`: Do not leave the title out: the peek shows a bare list, and screen readers hear only “Drawer”.  
  _From doDont: “The peek shows a bare list, and screen readers hear only “Drawer”.”_

Good: “Recent transactions”

## States

| State | When | From |
| --- | --- | --- |
| Collapsed | The peek shows what’s inside and invites a drag. | states: “The peek shows what’s inside and invites a drag.” |
| Expanded | The sheet rises to near the top; the list scrolls inside it. | states: “The sheet rises to near the top; the list scrolls inside it.” |
| No closed state | It never closes: collapsed is its smallest size. | states: “It never closes: collapsed is its smallest size.” |

## Accessibility

- **recommended** `title`: Give it a title: the title says what’s inside and names the drawer for screen readers.  
  _From doDont: “The title says what’s inside and names the drawer for screen readers.”_
- **recommended** On the web it’s a dialog named by its title.  
  _From sources: “On the web it’s a dialog named by its title.”_
- **recommended** Its handle is a button that expands or collapses it, and Escape collapses it.  
  _From sources: “its handle is a button that expands or collapses it, and Escape collapses it.”_
- **recommended** It has no way to close, and its scrim leaves keyboard focus alone.  
  _From sources: “It has no way to close, and its scrim leaves keyboard focus alone.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Peek enough to read | Peek only the handle | People can’t tell what the drawer holds. |
| Give it a title | Leave the title out | The peek shows a bare list, and screen readers hear only “Drawer”. |

## Examples

### Recent transactions on a home screen, the guide's In context: the drawer peeks under Home (140 px here) with its title and the first transaction. People drag it or press its handle to expand it, and the screen's See all transactions button opens it too. The screen keeps the drawer's state in its own state: the button sets it to expanded, and onStateChange reports drags and handle presses for the screen to apply back. The literal state and the empty handlers here are placeholders for that wiring. The drawer fills the Screen it sits in.

```tsx
<Screen>
  <VStack alignHorizontal="center">
    <Text text="Home" />
    <Button label="See all transactions" onPress={() => {}} />
  </VStack>
  <Drawer
    title="Recent transactions"
    collapsedHeight={140}
    state="collapsed"
    onStateChange={() => {}}
  >
    <ListGroup>
      <ListItem layout="Horizontal" title="Netflix" supportText="25 March · 17:30" trailing={<MoneyValue value="500" currency="₹" />} onPress={() => {}} />
      <ListItem layout="Horizontal" title="Spotify" supportText="24 March · 09:12" trailing={<MoneyValue value="119" currency="₹" />} onPress={() => {}} />
      <ListItem layout="Horizontal" title="Amazon" supportText="22 March · 21:04" trailing={<MoneyValue value="1,299" currency="₹" />} onPress={() => {}} />
    </ListGroup>
  </Drawer>
</Screen>
```

_From inContext: “The drawer peeks under the home screen. People drag it or press its handle to expand it, and the screen’s See all transactions button opens it too.”_

### With a scrim, the guide's Configuration: the screen dims behind the expanded drawer and taps on it don't get through. A press on the scrim calls onOverlayPress, which the package says is typically used to collapse the drawer: here the screen would set its state back to collapsed. The literal state and the empty handlers are placeholders for the screen's own state.

```tsx
<Drawer
  title="Recent transactions"
  state="expanded"
  onStateChange={() => {}}
  showOverlay
  onOverlayPress={() => {}}
>
  <ListGroup>
    <ListItem layout="Horizontal" title="Netflix" supportText="25 March · 17:30" trailing={<MoneyValue value="500" currency="₹" />} onPress={() => {}} />
    <ListItem layout="Horizontal" title="Spotify" supportText="24 March · 09:12" trailing={<MoneyValue value="119" currency="₹" />} onPress={() => {}} />
  </ListGroup>
</Drawer>
```

_From configuration: “The screen dims behind the drawer and taps on it don’t get through.”_

### The defaults, the guide's Sizing: with no collapsedHeight the drawer peeks 200 px, and expanded it is 90% of its screen's height. It starts collapsed and manages its own state.

```tsx
<Drawer title="Recent transactions">
  <ListGroup>
    <ListItem layout="Horizontal" title="Netflix" supportText="25 March · 17:30" trailing={<MoneyValue value="500" currency="₹" />} onPress={() => {}} />
    <ListItem layout="Horizontal" title="Spotify" supportText="24 March · 09:12" trailing={<MoneyValue value="119" currency="₹" />} onPress={() => {}} />
    <ListItem layout="Horizontal" title="Amazon" supportText="22 March · 21:04" trailing={<MoneyValue value="1,299" currency="₹" />} onPress={() => {}} />
  </ListGroup>
</Drawer>
```

_From sizing: “Collapsed, it shows 200 px by default; expanded, it is 90% of that screen’s height, and never more than 95%.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `modes` | `Modes` |  |  |  | evidence (2026-10-06) | The drawer's modes are not passed to its children: every child needs its own modes. |
| `style` | `import('react-native').StyleProp<import('react-native').ViewStyle>` |  |  |  | types |  |
| `title` | `string` |  |  |  | types |  |
| `header` | `React.ReactNode` |  |  |  | types | Fixed header content that remains visible and does not scroll. Placed immediately after the handle. |
| `children` | `React.ReactNode` |  |  |  | types |  |
| `collapsedHeight` | `number` |  | `200` |  | evidence (2026-10-23) | How much of the sheet shows when collapsed, in px (default 200). The drawer sizes from its parent (the host layer's onLayout), not the window: 140 shows 140 px and 200 shows 200; with the default expandedRatio, expanded is 0.9 of the parent's height. |
| `expandedRatio` | `number` |  | `0.9` |  | evidence (2026-10-06) | How tall the drawer is when expanded, as a ratio: default 0.9, clamped to 0.2–0.95. |
| `initialState` | `'collapsed' \| 'expanded'` | expanded, collapsed | `"collapsed"` |  | evidence (2026-10-06) | The state at mount when state is not given (default collapsed). Declared: Sets the drawer state when it first mounts (uncontrolled mode). Ignored once `state` is provided (controlled mode). |
| `state` | `'collapsed' \| 'expanded'` | expanded, collapsed |  |  | evidence (2026-10-23) | A controlled state applies at mount: state="expanded" renders expanded. Declared: Programmatically controls the drawer's collapsed/expanded state. When provided, the drawer becomes a controlled component: it will animate to match this value (reusing the same spring used by gestures) and gesture-driven changes are reported via `onStateChange` for the parent to apply back. Leave undefined for uncontrolled behaviour. |
| `contentStyle` | `any` |  |  |  | types |  |
| `sheetStyle` | `any` |  |  |  | types |  |
| `accessibilityLabel` | `string` |  |  |  | evidence (2026-10-23) | The dialog's name. The sheet is a dialog named accessibilityLabel, then title, then “Drawer”. |
| `accessibilityHint` | `string` |  |  |  | types |  |
| `contentContainerStyle` | `import('react-native').StyleProp<import('react-native').ViewStyle>` |  |  |  | types |  |
| `showsVerticalScrollIndicator` | `boolean` |  |  |  | types |  |
| `bottomInset` | `number` |  |  |  | types | Extra bottom inset (in px) added to the scroll content so that items at the very bottom remain visible above overlapping UI such as a tab bar. Defaults to 80. |
| `onStateChange` | `(state: 'collapsed' \| 'expanded') => void` |  |  |  | types | Called whenever the drawer settles into a new state (collapsed or expanded), so parent components can react programmatically. |
| `showOverlay` | `boolean` |  |  |  | evidence (2026-10-06) | A static rgba(0,0,0,0.7) scrim behind the sheet, shown in both states; without onOverlayPress it still blocks taps on the screen. Declared: When `true`, renders a full-screen semi-transparent {@link Overlay} scrim behind the drawer sheet (dimming everything else on screen). Defaults to `false`, in which case nothing is rendered behind the sheet and behaviour is unchanged. |
| `onOverlayPress` | `() => void` |  |  |  | types | Called when the overlay scrim (the area outside the sheet) is pressed. Only relevant when `showOverlay` is `true` — typically used to collapse or dismiss the drawer. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection Drawer reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection Drawer reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `header` | `React.ReactNode` |  |  |  | types | Fixed header content that remains visible and does not scroll. Placed immediately after the handle. |
| `children` | `React.ReactNode` |  |  |  | types |  |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onStateChange` | `(state: 'collapsed' \| 'expanded') => void` |  |  |  | types | Called whenever the drawer settles into a new state (collapsed or expanded), so parent components can react programmatically. |
| `onOverlayPress` | `() => void` |  |  |  | types | Called when the overlay scrim (the area outside the sheet) is pressed. Only relevant when `showOverlay` is `true` — typically used to collapse or dismiss the drawer. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- The published Storybook (built 17 October) predates the 23 October Drawer fixes: on the web there, its expanded content doesn't scroll. _(evidence, 2026-10-23)_

## Flags

_None._
