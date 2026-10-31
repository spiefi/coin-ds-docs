# ModalSheet

> Coin agent pack 0.1.78+26 (pilot). Generated from `components/modalsheet.json`; the JSON is the source of truth.

- **State:** flagged (1 flag, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `3f56271` · built 2026-10-31T03:54:03Z
- **Category:** layout (for discovery only, not a limit on composition) · **Tags:** page sheet, modal, sheet, overlay page, HelloJio sheet
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=modalsheet) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=9559-28121) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-modalsheet--docs)

Use a Modal Sheet for a task that slides up over the page, such as asking HelloJio, and goes away when it’s done.

## Use when

- **recommended** A task that slides up over the page and goes away when it's done.  
  _From summary: “Use a Modal Sheet for a task that slides up over the page, such as asking HelloJio, and goes away when it’s done.”_

## Avoid when

- **discouraged** A new flow: it deserves its own screen; keep a sheet to one task.  
  _From content: “Keep it to one task; a new flow deserves its own screen.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Sheet | The surface: white, with 20 px corners and no handle. | yes | anatomy: “White, with 20 px corners and no handle.” |
| Slot | One column of your content (children); it gets the sheet's modes, without Page type. | yes | anatomy: “One column of your content; it gets the sheet’s modes, without Page type.” |
| App bar | Yours: an AppBar at the top of the slot, holding the close button. | no | anatomy: “Yours: the top of the slot, holding the close button.” |
| Close button | Yours: a named IconButton that hides the sheet. | no | anatomy: “Yours: a named IconButton that hides the sheet.” |
| Field | Yours: the main input or action, at the bottom (a HelloJioInput in the guide). | no | anatomy: “Yours: the main input or action, at the bottom.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `children` | `ReactNode` | types |

## Placement

- **recommended** The sheet spans its screen, with 12 px of padding at the top, 8 px at the sides and 32 px at the bottom, and puts 12 px between the items in its slot.  
  _From sizing: “The sheet spans its screen with 12 px of padding at the top, 8 px at the sides, and 32 px at the bottom, and puts 12 px between the items in its slot.”_
- **recommended** `visible`: Place the sheet in the screen it covers: with visible set, it fills its nearest positioned parent as an overlay; it is not a Modal or portal.  
  _From evidence: “With `visible` set it fills its nearest positioned parent as an overlay”_
- **recommended** In the guide, a button on Home opens the sheet over Home, and Home steps back behind it.  
  _From inContext: “Ask HelloJio opens the sheet over Home, and Home steps back behind it.”_
- **recommended** `presentationProgress`: Stepping the page back with the sheet is the screen's job, not the sheet's: the guide does it through the package's page-stack hook (useModalSheetPageStackStyle) with the sheet's presentationProgress.  
  _From sources: “on a black screen whose page steps back with the sheet, through the package’s page-stack hook (the screen’s job, not the sheet’s).”_

## Configuration

- **recommended** `visible`: Set visible to present the sheet over the page; the screen shows and hides it. Without visible, the sheet renders in place as a plain surface.  
  _From fact `/facts/props/3` (visible, source evidence)_
- **recommended** `onRequestClose`: Wire onRequestClose to set visible to false: it reports that people asked to close the sheet (a drag down), and the screen hides it.  
  _From fact `/facts/props/8` (onRequestClose, source types)_
- **recommended** `fillHeight` = `true`: By default (fillHeight true) the sheet covers the screen and the field sits at its foot.  
  _From configuration: “The default: the sheet covers the screen and the field sits at its foot.”_
- **recommended** `fillHeight` = `false`: Fit the sheet to short content with fillHeight false; it fills the screen by default.  
  _From configuration: “A sheet fills the screen by default; fit it to short content instead.”_
- **recommended** `fillHeight` = `false`: A fitted sheet hugs its content and docks to the bottom.  
  _From configuration: “The sheet hugs its content and docks to the bottom.”_
- **discouraged** `fillHeight` = `true`: Do not fill the screen for one line: the sheet covers the page and leaves it empty.  
  _From doDont: “The sheet covers the page and leaves it empty.”_
- **recommended** `showOverlay` = `true`: A scrim (showOverlay) dims the page around a fitted sheet.  
  _From configuration: “A scrim dims the page around a fitted sheet”_
- **recommended** `showOverlay` = `false`: Without a scrim, the page stays bright behind the sheet, as in the Storybook story.  
  _From configuration: “The page stays bright behind the sheet, as in the Storybook story.”_
- **recommended** `onOverlayPress`: With showOverlay, set onOverlayPress to hide the sheet when the scrim is pressed; when it's omitted, the scrim calls onRequestClose if that is set.  
  _From fact `/facts/props/5` (onOverlayPress, source types)_
- **recommended** `topInset`: On a full-height sheet (fillHeight true, the default), a top inset (topInset) lets the page peek above the sheet; the sheet shortens to keep its bottom on the screen.  
  _From configuration: “The page peeks 40 px above, and the sheet shortens to keep its bottom on the screen.”_
- **recommended** `topInset`: A fitted sheet (fillHeight false) docks to the bottom and ignores topInset.  
  _From evidence: “With `fillHeight={false}` it docks to the bottom and ignores the inset.”_
- **recommended** `Page type`: Page type MainPage (the default) and SubPage both give a white sheet.  
  _From configuration: “MainPage, the default used everywhere else here, and SubPage both give a white sheet.”_
- **recommended** `Page type` = `JioPlus`: Page type JioPlus gives a light grey sheet; its text stays dark, and the HelloJioInput turns white to stand out.  
  _From configuration: “A light grey sheet. Its text stays dark, and the HelloJio field turns white to stand out.”_
- **recommended** `children`: Put the AppBar and the HelloJioInput straight in the slot (or in a fragment), not inside a component of your own: the sheet adjusts only the children it can see, so under Page type JioPlus a nested AppBar shows white on the grey sheet and a nested HelloJioInput's field matches the sheet.  
  _From evidence: “The sheet does this only for children it can see: its direct slot children, fragments, and their `children` props.”_
- **recommended** `enableDismissGesture` = `false`: Turning drag to close off (enableDismissGesture false) means a drag down does nothing, so a stray drag can't lose a half-typed question; the X and the scrim still close the sheet.  
  _From states: “A drag down does nothing; the X and the scrim still close it, so a stray drag can’t lose a half-typed question.”_

## Content

- **recommended** A page over the page, with a clear way to close it.  
  _From corePrinciple: “A page over the page, with a clear way to close it.”_
- **recommended** The sheet has no title or close button of its own: put an AppBar with a close button at the top of the slot and the main field at the bottom.  
  _From anatomy: “It has no title or close button of its own: put an App Bar with a close button at the top and the main field at the bottom.”_
- **recommended** Start the slot with an AppBar that holds a named close button, keep one task in the middle, and put the main field or action at the bottom.  
  _From content: “Start the slot with an App Bar that holds a named close button, keep one task in the middle, and put the main field or action at the bottom.”_

Good: “Ask about your spends, bills, or investments.”

## States

| State | When | From |
| --- | --- | --- |
| In place | visible omitted: the sheet renders in place, as a plain surface with its slot; once it's given visible, it slides over its screen. | sources: “In the package it renders in place until it’s given visible; then it slides over its screen with an optional scrim and can be dragged down.” |
| Shown | The screen shows the sheet (visible true): it slides up from the bottom and settles without a bounce. | states: “The screen shows and hides the sheet: it slides up from the bottom and settles without a bounce, then slides back down.” |
| Hidden | The screen hides the sheet (visible false): it slides back down and waits below the screen, out of the Tab order and hidden from screen readers. | states: “A hidden sheet waits below the screen, out of the Tab order and hidden from screen readers.” |
| Dragged down | A drag down asks the screen to close the sheet (onRequestClose), unless drag to close is turned off. | states: “A drag down asks to close it, unless drag to close is turned off.” |
| Drag to close off | enableDismissGesture false: a drag down does nothing; the X and the scrim still close the sheet. | states: “A drag down does nothing; the X and the scrim still close it, so a stray drag can’t lose a half-typed question.” |

## Accessibility

- **recommended** Add a named close IconButton: the X closes the sheet for everyone, including keyboard users.  
  _From doDont: “The X closes the sheet for everyone, including keyboard users.”_
- **discouraged** Do not rely on dragging to close the sheet: without an X, people must drag, tap the scrim, or know to press Escape.  
  _From doDont: “Without an X, people must drag, tap the scrim, or know to press Escape.”_
- **recommended** When the screen shows the sheet, focus moves to its first control and Tab stays inside; Escape (even from the text field), the X or the scrim closes it and returns focus to what opened it.  
  _From sources: “When the screen shows it, focus moves to its first control (the X here) and Tab stays inside; Escape, even from the text field, the X, or the scrim closes it and returns focus to what opened it.”_
- **recommended** `trapFocus` = `false`: trapFocus false turns that focus handling off, for a sheet shown inside a page such as a preview; a sheet the screen opens keeps it (the default).  
  _From sources: “turns that off for a sheet shown inside a page, as these examples are until you open them again; In context keeps it.”_
- **recommended** Give the App Bar a title: on the web the sheet is a dialog named by its App Bar title, and a hidden sheet leaves the Tab order.  
  _From sources: “On the web it’s a dialog named by its App Bar title, and a hidden sheet leaves the Tab order.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Add a named close button | Rely on dragging | Without an X, people must drag, tap the scrim, or know to press Escape. |
| Fit short content | Fill the screen for one line | The sheet covers the page and leaves it empty. |

## Examples

### Asking a question from Home: the sheet fills the screen over a dimmed page, with an AppBar holding a named close IconButton, one line of Text and a HelloJioInput at its foot. The screen sets visible, and hides the sheet when a question is sent, the X or the scrim is pressed, or a drag asks to close it.

```tsx
<ModalSheet
  visible
  showOverlay
  onOverlayPress={() => {}}
  onRequestClose={() => {}}
>
  <AppBar
    type="SubPage"
    leadingSlot={<JioDot />}
    actionsSlot={<IconButton iconName="ic_close" accessibilityLabel="Close" onPress={() => {}} />}
  />
  <Text>Ask about your spends, bills, or investments.</Text>
  <VStack style={{ flex: 1 }} />
  <HelloJioInput onSubmit={() => {}} />
</ModalSheet>
```

_From inContext: “Sending a question or pressing the X closes it; the screen keeps what was asked.”_

### A sheet fitted to short content (fillHeight false), docked to the bottom over a dimmed page, with drag to close off (enableDismissGesture false): the X and the scrim still close it.

```tsx
<ModalSheet
  visible
  fillHeight={false}
  showOverlay
  enableDismissGesture={false}
  onOverlayPress={() => {}}
  onRequestClose={() => {}}
>
  <AppBar
    type="SubPage"
    leadingSlot={<JioDot />}
    actionsSlot={<IconButton iconName="ic_close" accessibilityLabel="Close" onPress={() => {}} />}
  />
  <Text>Ask about your spends, bills, or investments.</Text>
  <HelloJioInput onSubmit={() => {}} />
</ModalSheet>
```

_From states: “A drag down does nothing; the X and the scrim still close it, so a stray drag can’t lose a half-typed question.”_

### Page type JioPlus, fitted to its content: a light grey sheet whose text stays dark and whose HelloJioInput turns white to stand out.

```tsx
<ModalSheet
  visible
  fillHeight={false}
  showOverlay
  onOverlayPress={() => {}}
  onRequestClose={() => {}}
  modes={{ 'Page type': 'JioPlus' }}
>
  <AppBar
    type="SubPage"
    leadingSlot={<JioDot />}
    actionsSlot={<IconButton iconName="ic_close" accessibilityLabel="Close" onPress={() => {}} />}
  />
  <Text>Ask about your spends, bills, or investments.</Text>
  <HelloJioInput onSubmit={() => {}} />
</ModalSheet>
```

_From configuration: “A light grey sheet. Its text stays dark, and the HelloJio field turns white to stand out.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | evidence (2026-10-13) | The sheet adjusts only the slot children it can see: its direct children, fragments, and their children props. An AppBar or HelloJioInput rendered inside a consumer's own component isn't recognised. Declared: Sheet content. Figma exposes one slot — children fill it inside the token-driven padding. |
| `modes` | `Modes` |  |  |  | evidence (2026-10-13) | The sheet passes its modes to its slot children without Page type (an AppBar keeps it) and without Color Mode Dark; a child's own modes are merged over them. Declared: Design-token modes. Cascaded to every slot child via {@link cloneChildrenWithModes}. `Page type` drives `modalSheet/bg` (`JioPlus` → grey surface). |
| `fillHeight` | `boolean` |  | `true` |  | types | Fill the parent's available height (`flex: 1`). Default `true`. Set `false` to size to slot content. Default true, from the component source. |
| `visible` | `boolean` |  |  |  | evidence (2026-10-13) | With visible set, the sheet fills its nearest positioned parent as an overlay, and visible false keeps it mounted below the screen. It is not a Modal or portal: the screen sets visible to false on every close. Declared: When set, presents as an animated modal over the page (slide up / down). Omit for a plain in-flow Figma surface (container + slot only). |
| `showOverlay` | `boolean` |  | `false` |  | types | Optional dimming scrim behind the sheet (`overlay/background` token). Presentation mode only. Defaults to `false` (page-sheet peek stays clear). Set `true` for a classic dimmed backdrop; pair with `onOverlayPress` to dismiss. Default false, from the component source. |
| `onOverlayPress` | `() => void` |  |  |  | types | Scrim press — typically set `visible` to `false`. Only used when `showOverlay`. When omitted, the scrim calls `onRequestClose` if that is set, so a dimmed sheet can dismiss from the backdrop without a second handler. |
| `dismissAccessibilityLabel` | `string` |  | `"Dismiss overlay"` |  | types | Accessible name for the scrim. Defaults to "Dismiss overlay". On the web the scrim is not a tab stop (pointer dismiss still works). Default "Dismiss overlay", from the component source. |
| `trapFocus` | `boolean` |  | `true` |  | evidence (2026-10-27) | With trapFocus false, Escape doesn't close the sheet, and a sheet shown from the first render leaves focus on the page; with the default, a sheet shown at load still takes focus. Declared: When `true` (default), opening moves focus to a control inside the dialog and keeps Tab there. Set `false` to render the sheet in a frame or preview without a page-wide trap. Default true, from the component source. |
| `onRequestClose` | `() => void` |  |  |  | types | User requested close via swipe-down. Wire to set `visible={false}` (same role as RN `Modal`'s `onRequestClose`). |
| `enableDismissGesture` | `boolean` |  | `true` |  | evidence (2026-10-13) | Gates only the drag and its “Drag down to dismiss” hint; the scrim and a close button in the slot still work. Declared: Drag down to dismiss (iOS & Android via `PanResponder`). Presentation mode only. Defaults to `true`. No grabber chrome — Figma has none. Default true, from the component source. |
| `onDismissed` | `() => void` |  |  |  | types | Fired after the dismiss slide-down animation completes. |
| `topInset` | `number` |  |  |  | evidence (2026-10-13) | With fillHeight false the sheet docks to the bottom and ignores the inset; with fillHeight it shortens by the inset so its bottom stays on the screen. Declared: Top gap (px) so the layer under the modal peeks above the sheet (iOS page-sheet / card stack). Presentation mode only. Defaults to `40` on iOS and `0` elsewhere. |
| `presentationProgress` | `SharedValue<number>` |  |  |  | types | Optional shared progress `0 → 1` (closed → open), updated during present, dismiss, and swipe. Drive a page-recede (scale / radius / dim) from this so the under-layer stays in sync while dragging. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Optional style override on the Figma container. |
| `...Omit<ViewProps, 'style' | 'children'>` | `Omit<ViewProps, 'style' \| 'children'>` |  |  |  | types | Inherited React Native props the component also accepts. They are not part of the design contract and no guide documents them. |
| `accessibilityLabel` | `string` |  |  |  | evidence (2026-10-13) | Names the dialog; without it, a slot child's title names it. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | evidence (2026-10-13) | MainPage and SubPage give a white sheet (#ffffff), JioPlus a light grey one (#f5f5f5). Declared: A token collection ModalSheet reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types | Sheet content. Figma exposes one slot — children fill it inside the token-driven padding. |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onOverlayPress` | `() => void` |  |  |  | types | Scrim press — typically set `visible` to `false`. Only used when `showOverlay`. When omitted, the scrim calls `onRequestClose` if that is set, so a dimmed sheet can dismiss from the backdrop without a second handler. |
| `onRequestClose` | `() => void` |  |  |  | types | User requested close via swipe-down. Wire to set `visible={false}` (same role as RN `Modal`'s `onRequestClose`). |
| `onDismissed` | `() => void` |  |  |  | types | Fired after the dismiss slide-down animation completes. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- Under Page type JioPlus, an AppBar or HelloJioInput rendered inside a consumer's own component in the slot isn't recognised: the AppBar loses Page type (white on the grey sheet) and the HelloJioInput's field isn't repainted, so it still matches the sheet. The #255 fix doesn't reach them; the evidence leaves this limit for Marcin to judge. _(evidence, 2026-10-13)_
- A hidden sheet sets inert as the string "true", so React 19 logs a development warning; the sheet still works (#417, Component Bug, To do). _(evidence, 2026-10-28)_
- The “Drag down to dismiss” hint has no web mapping, so it isn't exposed on the web. _(evidence, 2026-10-27)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/examples/0` · cross-check: misreads-source: The guide's In context sheet has an App Bar titled “Ask HelloJio” (the live-example text), and Sources says the dialog is “named by its App Bar title”. The example's AppBar has no title, so the dialog would be unnamed. That contradicts the guide and /accessibility/4 (“Give the App Bar a title”).
