# ContentSheet

> Coin agent pack 0.1.78+26 (pilot). Generated from `components/contentsheet.json`; the JSON is the source of truth.

- **State:** documented
- **Package:** jfs-components 0.1.78 · guide commit `b4988c5` · built 2026-10-31T03:54:03Z
- **Category:** layout (for discovery only, not a limit on composition) · **Tags:** bottom sheet, bottom pop-up, action sheet, panel
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=contentsheet) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4451-1760) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-contentsheet--docs)

Use a Content Sheet to show a short panel from the bottom of the screen, such as a month’s transactions or a payment choice.

## Use when

- **recommended** Show a short panel from the bottom of the screen, such as a month’s transactions or a payment choice.  
  _From summary: “Use a Content Sheet to show a short panel from the bottom of the screen, such as a month’s transactions or a payment choice.”_
- **recommended** Choosing how to pay, as in the guide's In context: the sheet holds the payment options over the payment screen.  
  _From inContext: “Choosing how to pay”_

## Avoid when

- **discouraged** Content too long to read without scrolling: longer content deserves its own screen.  
  _From content: “Keep the content short enough to read without scrolling; longer content deserves its own screen.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Title | Optional and centred; it stays put while the content scrolls. | no | anatomy: “Optional and centred; it stays put while the content scrolls.” |
| Slot | Any content; the sheet grows to fit it. | yes | anatomy: “Any content; the sheet grows to fit it.” |
| Sheet | White, with 20 px top corners and no handle. | yes | anatomy: “White, with 20 px top corners and no handle.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `children` | `ReactNode` | types |

## Placement

- **recommended** In a screen the sheet docks to the bottom and spans the full width.  
  _From anatomy: “In a screen it docks to the bottom and spans the full width.”_
- **recommended** Place the sheet in the screen it covers: it is not a portal or modal, and it docks to the bottom of its nearest positioned parent at full width.  
  _From evidence: “Not a portal or modal: `position: absolute; left/right/bottom: 0` inside the nearest positioned parent (full width, flush bottom)”_
- **recommended** The sheet spans its screen and adds 12 px above and 41 px below the content, with 8 px between the title and the content.  
  _From sizing: “The sheet spans its screen and adds 12 px above and 41 px below the content, with 8 px between the title and the content.”_
- **recommended** The sheet never sets a height: it grows with the content up to 70% of its screen, then the content scrolls under the title.  
  _From sizing: “It never sets a height: it grows with the content up to 70% of its screen, then the content scrolls under the title.”_
- **recommended** The 70% height limit is measured against the sheet's screen.  
  _From sources: “Its 70% height limit is measured against its screen.”_
- **recommended** The title stays fixed 8 px above the content, and the items in the slot are 8 px apart, as in Figma.  
  _From sources: “In the package, as in Figma, the title stays fixed 8 px above the content, and the items in the slot are 8 px apart.”_
- **recommended** In the guide, the payment screen opens the sheet from a Change payment method button.  
  _From inContext: “The payment screen opens the sheet from Change payment method.”_

## Configuration

- **recommended** The sheet grows to fit its content; the screen decides when it shows.  
  _From corePrinciple: “It grows to fit its content; the screen decides when it shows.”_
- **recommended** `title`: Add a title when the content needs a name.  
  _From configuration: “Add a title when the content needs a name.”_
- **recommended** `title`: Without a title, the slot starts right under the top padding.  
  _From configuration: “The slot starts right under the top padding.”_
- **recommended** `children`: The slot takes any content, and the sheet’s height follows it.  
  _From configuration: “The slot takes any content, and the sheet’s height follows it.”_
- **recommended** `children`: Let the sheet fit its content: one row makes a short sheet.  
  _From doDont: “One row makes a short sheet.”_
- **discouraged** `style`: Don't set a fixed height (a height in style): empty space fills the sheet under one row.  
  _From doDont: “Empty space fills the sheet under one row.”_
- **recommended** `visible`: The screen shows and hides the sheet (visible): it springs up from the bottom and back down.  
  _From states: “The screen shows and hides the sheet: it springs up from the bottom and back down.”_
- **recommended** `visible`: visible is on by default, so the sheet springs up from the bottom edge when it mounts; set to false, it springs back down below the bottom edge.  
  _From fact `/facts/props/7` (visible, source evidence)_
- **recommended** The sheet has no role, scrim, or close control of its own.  
  _From sources: “The sheet has no role, scrim, or close control of its own”_
- **recommended** Dim the screen behind the sheet: the white sheet then stands out from the page. The guide's examples dim their screens with an Overlay.  
  _From doDont: “The white sheet stands out from the page.”_
- **discouraged** Don't leave the sheet on a white screen: without a scrim, the sheet’s edge disappears.  
  _From doDont: “Without a scrim, the sheet’s edge disappears.”_
- **recommended** `visible` = `false`: Choosing an option, or tapping the dimmed screen, closes the sheet; the screen keeps the choice.  
  _From inContext: “Choosing an option, or tapping the dimmed screen, closes it; the screen keeps the choice.”_
- **recommended** `pinToBottom`: pinToBottom is on by default: the sheet is pinned to the bottom of its parent, absolute and full width. Set it to false to render the sheet in normal flow, inside your own layout container.  
  _From fact `/facts/props/6` (pinToBottom, source evidence)_
- **recommended** `safeAreaBottom`: safeAreaBottom is on by default: it adds the device's bottom safe-area inset (home indicator) on top of the sheet's bottom padding, so content stays clear of the indicator when the sheet rests at the bottom of the screen.  
  _From fact `/facts/props/5` (safeAreaBottom, source types)_

## Content

- **recommended** `title`: Title the sheet with what it holds, such as a month or a choice, in a few words.  
  _From content: “Title the sheet with what it holds, such as a month or a choice, in a few words.”_
- **recommended** Keep the sheet to one task, and name it.  
  _From content: “Name it, and keep it to one task”_
- **recommended** Keep the content short enough to read without scrolling.  
  _From content: “Keep the content short enough to read without scrolling; longer content deserves its own screen.”_
- **recommended** `title`: Name the choice: a title such as “Pay with” says what the options are for.  
  _From doDont: ““Pay with” says what the options are for.”_
- **discouraged** `title`: Don't leave options untitled: people can’t tell what they’re choosing.  
  _From doDont: “People can’t tell what they’re choosing.”_

Good: “March 2025”, “Pay with”

## States

| State | When | From |
| --- | --- | --- |
| Shown | Over a dimmed screen, docked to the bottom. | states: “Over a dimmed screen, docked to the bottom.” |
| Hidden | The sheet waits below the screen, out of the Tab order and hidden from screen readers. | states: “A hidden sheet waits below the screen, out of the Tab order and hidden from screen readers.” |

## Accessibility

- **recommended** `visible` = `false`: A hidden sheet (visible false) is out of the Tab order and hidden from screen readers.  
  _From states: “A hidden sheet waits below the screen, out of the Tab order and hidden from screen readers.”_
- **recommended** `title`: The title is a page heading.  
  _From sources: “The title is a page heading.”_
- **recommended** The sheet has no role, label, focus handling or Escape of its own; the content keeps its own roles, such as a ListGroup's list and its List Items' buttons.  
  _From evidence: “No role, label, focus handling, or Escape. Children keep their roles (ListGroup `ul[role=list]`, ListItem `button`); the title is an `h1`.”_
- **recommended** The guide's examples dim their screens with an Overlay that leaves keyboard focus on the page.  
  _From sources: “The examples dim their screens with Coin Overlay, which leaves keyboard focus on the page.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Dim the screen behind it | Leave it on a white screen | Without a scrim, the sheet’s edge disappears. |
| Let it fit the content | Set a fixed height | Empty space fills the sheet under one row. |
| Name the choice | Leave options untitled | People can’t tell what they’re choosing. |

## Examples

### Choosing how to pay, the guide's In context, with the sheet shown: the payment screen (a line of Text and its Change payment method Button) is dimmed by a bare Overlay, and the sheet titled “Pay with” docks to the bottom over it, holding the three payment options as List Items in a ListGroup. visible stands for the screen's shown state, which the Button's onPress sets; a row's onPress stands for keeping that choice and hiding the sheet, and the Overlay's onPress for hiding it on a tap on the dimmed screen. The screen renders the Overlay only while the sheet shows.

```tsx
<Screen>
  <Text>Pay ₹500 to Asha Stores</Text>
  <Button label="Change payment method" onPress={() => {}} />
  <Overlay onPress={() => {}} />
  <ContentSheet visible title="Pay with">
    <ListGroup>
      <ListItem layout="Horizontal" title="UPI" supportText="Jio Payments Bank •• 4821" onPress={() => {}} />
      <ListItem layout="Horizontal" title="Debit card" supportText="•• 9012" onPress={() => {}} />
      <ListItem layout="Horizontal" title="Net banking" supportText="Any bank" onPress={() => {}} />
    </ListGroup>
  </ContentSheet>
</Screen>
```

_From inContext: “Choosing an option, or tapping the dimmed screen, closes it; the screen keeps the choice.”_

### The same payment screen with the sheet hidden, as after a choice: visible={false} and no Overlay, so only the screen shows; the sheet waits below the screen, out of the Tab order and hidden from screen readers. The Button's onPress stands for the screen showing the sheet (and its Overlay) again.

```tsx
<Screen>
  <Text>Pay ₹500 to Asha Stores</Text>
  <Button label="Change payment method" onPress={() => {}} />
  <ContentSheet visible={false} title="Pay with">
    <ListGroup>
      <ListItem layout="Horizontal" title="UPI" supportText="Jio Payments Bank •• 4821" onPress={() => {}} />
      <ListItem layout="Horizontal" title="Debit card" supportText="•• 9012" onPress={() => {}} />
      <ListItem layout="Horizontal" title="Net banking" supportText="Any bank" onPress={() => {}} />
    </ListGroup>
  </ContentSheet>
</Screen>
```

_From states: “A hidden sheet waits below the screen, out of the Tab order and hidden from screen readers.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types | Sheet content. The sheet is one big slot: whatever you place here is stacked in a column (separated by the `contentSheet/gap` token) inside the sheet's padding. The sheet has **no fixed height** — it grows and shrinks to fit these children automatically. |
| `modes` | `Modes` |  |  |  | types | Design-token modes. Cascaded to every slot child via {@link cloneChildrenWithModes} so nested `ListItem`/`Section`/etc. resolve the same theme without you wiring `modes` onto each one. |
| `title` | `string` |  |  |  | evidence (2026-10-13) | On the web the title is a centred h1 (role heading) in a fixed header outside the scroller, so it stays put while the content scrolls; each titled sheet adds a page heading. Declared: Optional title rendered in a centered, sticky header at the top of the sheet. Uses the same `drawer/title*` token family as the `Drawer` title so the two surfaces stay visually consistent. |
| `avoidKeyboard` | `boolean` |  | `false` |  | types | Deprecated: Keyboard avoidance is now owned by the consuming implementation. This prop is retained for backwards compatibility, defaults to `false`, and has no effect. Default false, from the component source. |
| `keyboardSpacing` | `number` |  | `0` |  | types | Deprecated: Keyboard avoidance is now owned by the consuming implementation. This prop is retained for backwards compatibility and has no effect. Default 0, from the component source. |
| `safeAreaBottom` | `boolean` |  | `true` |  | types | Add the device's bottom safe-area inset (home indicator) on top of the sheet's bottom padding, so content never sits under the indicator when the sheet rests at the bottom of the screen. Default `true`. Default true, from the component source. |
| `pinToBottom` | `boolean` |  | `true` |  | evidence (2026-10-13) | Not a portal or modal: pinned, the sheet is absolute at left, right and bottom 0 inside its nearest positioned parent (full width, flush bottom); pinToBottom={false} puts it in normal flow. Declared: Pin the sheet to the bottom of its parent (absolute, full width). This is the default behaviour — the sheet "just stays at the bottom". Set to `false` to render the sheet in normal flow instead (e.g. when you compose it inside your own layout container). Default true, from the component source. |
| `visible` | `boolean` |  | `true` |  | evidence (2026-10-13) | A hidden sheet stays mounted; on the web it is inert and aria-hidden, with its controls at tabindex -1, so Tab skips it and screen readers don't read it. Declared: Controls whether the sheet is on-screen. When this becomes `true` the sheet springs up from the bottom edge (off-screen → on-screen) using the same spring as the {@link Drawer} (`damping: 32`, `stiffness: 300`); when it becomes `false` it springs back down below the bottom edge. The sheet pops up on mount by default. The animation runs entirely on the UI thread via `react-native-reanimated` (no re-renders). Default `true`. Default true, from the component source. |
| `maxHeightPercent` | `number` |  | `0.7` |  | evidence (2026-10-13) | The maximum height is maxHeightPercent of the parent's height (448 px in a 640 px parent at the default 0.7); past it the content scrolls, with the scrollbar hidden. Declared: Max height of the sheet as a fraction (0–1) of the parent height (measured with `onLayout` when the sheet is pinned). When content reaches this height the slot scrolls and the title stays fixed. Default `0.7`. Default 0.7, from the component source. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Optional style override applied to the sheet container. |
| `...Omit<ViewProps, 'style' | 'children'>` | `Omit<ViewProps, 'style' \| 'children'>` |  |  |  | types | Inherited React Native props the component also accepts. They are not part of the design contract and no guide documents them. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection ContentSheet reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | evidence (2026-10-13) | MainPage and SubPage give a white sheet (#ffffff), JioPlus a light grey one (#f5f5f5). Declared: A token collection ContentSheet reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types | Sheet content. The sheet is one big slot: whatever you place here is stacked in a column (separated by the `contentSheet/gap` token) inside the sheet's padding. The sheet has **no fixed height** — it grows and shrinks to fit these children automatically. |

### Events

_No events._

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- Open since #203 (question 6): on a phone with a home indicator the package adds the bottom safe-area inset on top of Figma's 41 px bottom padding (safeAreaBottom, on by default); whether Figma means the inset to be added is not decided. _(evidence, 2026-10-13)_

## Flags

_None._
