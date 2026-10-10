# Modal Sheet source evidence

Package, Figma, Storybook, and browser evidence for the Modal Sheet guide (board ticket #3, Design documentation — Marcin; Storybook coverage — Biscuit, done).

## Checked

Checked 10 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-636f3f5` (Biscuit's `main` at 636f3f5); `npm run coin:status` reports the mirror and the docs up to date. `ModalSheet.tsx` is identical to upstream.

## Sources

- Figma: [Coin Components Library · Modal Sheet](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=9559-28121), node `9559:28121`. One component, 360 × 728, white, radius 20, with one `slot` (344 × 684): padding 12 top, 8 sides, 32 bottom. Bound variables `modalSheet/gap` 12, padding, radius 20, `modalSheet/bg` `#ffffff`. No title, handle, close button, or shadow.
- Storybook (published `index.json`, built 1 October): `components-modalsheet--docs`, `--default`. The published docs page is the old generated page. Biscuit's `main` has a handwritten mdx and an `InFlow` story that are not published. The Default story presents the sheet in a 360 × 728 frame with `topInset={40}`, a scrim, an AppBar (JioDot, title, close IconButton), a flex spacer, and a HelloJioInput.

## Contract

- Props: `children` (one slot; every child gets the sheet's `modes`), `modes` (`Page type` only: MainPage and SubPage white, JioPlus `#f5f5f5`; Color Mode doesn't change the sheet), `fillHeight` (true: fill the parent; false: fit the content), `visible`, `showOverlay` (false), `onOverlayPress`, `onRequestClose` (drag-down only), `enableDismissGesture` (true), `onDismissed`, `topInset` (40 on iOS, 0 elsewhere), `presentationProgress`, `style`, and View props (`testID` lands on the sheet surface).
- With `visible` omitted it renders in flow: the surface and its slot. With `visible` set it fills its nearest positioned parent as an overlay: the sheet springs up from below, an optional scrim (`rgba(0,0,0,0.7)`, a button named “Dismiss overlay”) fades in, and a drag down past a quarter of the travel or a downward fling calls `onRequestClose`. `visible={false}` keeps it mounted below the screen. It is not a Modal or portal; the screen sets `visible` to false on every close.
- No title, handle, close button, footer, dialog role, focus handling, or Escape. Compose an App Bar with a named close IconButton at the top of the slot.
- Tokens: padding 12 / 8 / 32 / 8, radius 20 on all corners, `modalSheet/gap` 12 (applied to the surface, whose only child is the slot, so slot children are not spaced). The `modalSheet/font*` tokens are unused.
- Classification. Designer-configurable: the slot content, fill or fit content, the scrim, Page type, top inset. System-driven: the slide and spring, the drag threshold. Developer-only: `visible`, `onRequestClose`, `onOverlayPress`, `onDismissed`, `presentationProgress` and the page-stack helpers, `enableDismissGesture`, `style`, `testID`.

## Browser measurements (Chrome, react-native-web 0.21.2, Light)

- In flow, `fillHeight={false}`, an AppBar and one line of Text in a 360 px column: 360 × 113, padding 12/8/32/8, radius 20, white. Two Text children sit 0 px apart (the 12 px gap is not applied).
- Presented in a 360 × 640 positioned frame with `topInset={40}`, `fillHeight`: the sheet is 640 tall and starts at 40, so its bottom 40 px (the 32 px padding and 8 px of content) fall outside the frame. With `fillHeight={false}` it docks to the bottom and is still pushed down by 40, cutting off the bottom of the HelloJioInput. With `topInset={0}` it fits.
- The scrim covers the frame; tapping it calls `onOverlayPress`. The AppBar renders as a heading (`h1`) with a back button unless `leadingSlot` is set; the close IconButton is 40 × 40.
- After closing, Tab still reaches the hidden sheet's back button, Close, the input, and Send, and scrolls the frame to show them.
- On this site the slide is the simplified animation library's 420 ms spring.

## Accessibility (web)

- Not announced as a dialog; focus isn't moved into it, kept in it, or returned; Escape does nothing. The “Drag down to dismiss” hint isn't exposed on the web. A hidden sheet's controls stay in the Tab order.
- The scrim is a button named “Dismiss overlay” (fixed English). Close needs a named IconButton in the slot.

## Limits

- Light only (Color Mode doesn't change the sheet; slot content is Light). The page uses `topInset={0}` except where it shows the inset.
- Not shown: Page type JioPlus, `presentationProgress` and the page-stack helpers, `enableDismissGesture={false}`, `style`.

## Coin gaps

- #234 (Component Fix, To do, Component Bug; Mr. Biscuit): `topInset` moves the sheet down without shrinking it, so its bottom is cut off by the inset; `modalSheet/gap` not applied to slot children; a hidden sheet stays in the Tab order and focus scrolls it into view; no dialog role, focus handling, or Escape; the drag hint isn't exposed on the web; the scrim press doesn't call `onRequestClose`; the Storybook rewrite and InFlow story aren't published.
