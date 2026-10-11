# Modal Sheet source evidence

Package, Figma, Storybook, and browser evidence for the Modal Sheet guide (board ticket #3, Design documentation — Marcin; Storybook coverage — Biscuit, done).

## Checked

Checked 10 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-636f3f5` (Biscuit's `main` at 636f3f5); `npm run coin:status` reports the mirror and the docs up to date. `ModalSheet.tsx` is identical to upstream. Re-checked 11 October 2026: still up to date with Biscuit's `main` (636f3f5).

## Sources

- Figma: [Coin Components Library · Modal Sheet](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=9559-28121), node `9559:28121`. One component, 360 × 728, white, radius 20, with one `slot` (344 × 684): padding 12 top, 8 sides, 32 bottom. Bound variables `modalSheet/gap` 12, padding, radius 20, `modalSheet/bg` `#ffffff`. No title, handle, close button, or shadow.
- Figma usage on the Modal Sheet page: the standalone component and instance 9629:23095 sit on a grey canvas; the device composition “Screen Full” 9629:23370 (390 × 844, black) has the receded Screen 1 (r10), a 20% black dim, and Screen 2 (white, r10) holding the sheet (390 × 774, r20), whose bottom runs white to the screen edge; instance 9618:4383 sits over a 360 × 800 r24 screen with its bottom on the screen's bottom. The only annotation is “Ignore bottom safe area”.
- Storybook (published `index.json`, built 1 October): `components-modalsheet--docs`, `--default`. The published docs page is the old generated page. Biscuit's `main` has a handwritten mdx and an `InFlow` story that are not published. The published Default story is already the rewrite (`ModalSheet.stories.tsx:128-209`): a black 360 × 728 frame (`presentFrame`, `#000000`); a white page with Home and an “Open HelloJio modal” button that steps back while the sheet is shown (`modalSheetPageStackBaseStyle` + `useModalSheetPageStackStyle(presentationProgress)`: scale 0.9 from the top, 16 px down, radius 10, from `MODAL_SHEET_PAGE_STACK`); then the sheet with `topInset={40}`, `showOverlay` off by default, `fillHeight` on, an AppBar (JioDot, title, close IconButton at Emphasis Low), a flex spacer, and a HelloJioInput. Its top corners show black; its bottom corners and the bottom 40 px are cut off (#234). Re-checked 11 October 2026 in Chrome.

## Contract

- Props: `children` (one slot; every child gets the sheet's `modes`), `modes` (`Page type` only: MainPage and SubPage white, JioPlus `#f5f5f5`; Color Mode doesn't change the sheet), `fillHeight` (true: fill the parent; false: fit the content), `visible`, `showOverlay` (false), `onOverlayPress`, `onRequestClose` (drag-down only), `enableDismissGesture` (true), `onDismissed`, `topInset` (40 on iOS, 0 elsewhere), `presentationProgress`, `style`, and View props (`testID` lands on the sheet surface).
- With `visible` omitted it renders in flow: the surface and its slot. With `visible` set it fills its nearest positioned parent as an overlay: the sheet springs up from below, an optional scrim (`rgba(0,0,0,0.7)`, a button named “Dismiss overlay”) fades in, and a drag down past a quarter of the travel or a downward fling calls `onRequestClose`. `visible={false}` keeps it mounted below the screen. It is not a Modal or portal; the screen sets `visible` to false on every close.
- No title, handle, close button, footer, dialog role, focus handling, or Escape. Compose an App Bar with a named close IconButton at the top of the slot.
- Tokens: padding 12 / 8 / 32 / 8, radius 20 on all corners, `modalSheet/gap` 12 (applied to the surface, whose only child is the slot, so slot children are not spaced). The `modalSheet/font*` tokens are unused.
- Page type (`modalSheet/bg` → `ContentSheet/background/color`, collection “Page type”, default MainPage): MainPage `#ffffff`, SubPage `#ffffff`, JioPlus `#f5f5f5`. The other `modalSheet/*` tokens have one mode. The sheet passes its modes to its slot children (`ModalSheet.tsx:227-230`, `cloneChildrenWithModes`; a child's own modes are merged over them, `react-utils.ts:59-66`), so under JioPlus: Text `text/foreground` → `text/color` turns `#ffffff`; AppBar SubPage background turns transparent and its title stays dark; VStack padding is 16 on SubPage and JioPlus (8 on MainPage); HelloJioInput doesn't read Page type, and its Idle pill (background and border `#f5f5f5`) matches the JioPlus sheet. JioDot and IconButton (Emphasis Low) don't change. In Figma “Page type” is a remote variable collection, not a property or variant; the component resolves to MainPage. Storybook's Default story has a Page type control (`ModalSheet.stories.tsx:47, 56, 70, 206`).
- `enableDismissGesture` (default true; `ModalSheet.tsx:206`) gates only the drag (React Native `PanResponder`, `:394-398`, `:481`) and the “Drag down to dismiss” hint (`:478-480`). The scrim (`onOverlayPress`) and a close button in the slot still work; with the drag off the sheet never calls `onRequestClose`. Storybook has it as a control (`ModalSheet.stories.tsx:52-58, 75-78, 204`); Figma doesn't mention it.
- Classification. Designer-configurable: the slot content, fill or fit content, the scrim, Page type, top inset, whether a drag closes it (`enableDismissGesture`). System-driven: the slide and spring, the drag threshold. Developer-only: `visible`, `onRequestClose`, `onOverlayPress`, `onDismissed`, `presentationProgress` and the page-stack helpers, `style`, `testID`.

## Browser measurements (Chrome, react-native-web 0.21.2, Light)

- In flow, `fillHeight={false}`, an AppBar and one line of Text in a 360 px column: 360 × 113, padding 12/8/32/8, radius 20, white. Two Text children sit 0 px apart (the 12 px gap is not applied).
- Presented in a 360 × 640 positioned frame with `topInset={40}`, `fillHeight`: the sheet is 640 tall and starts at 40, so its bottom 40 px (the 32 px padding and 8 px of content) fall outside the frame. With `fillHeight={false}` it docks to the bottom and is still pushed down by 40, cutting off the bottom of the HelloJioInput. With `topInset={0}` it fits.
- The scrim covers the frame; tapping it calls `onOverlayPress`. The AppBar renders as a heading (`h1`) with a back button unless `leadingSlot` is set; the close IconButton is 40 × 40.
- After closing, Tab still reaches the hidden sheet's back button, Close, the input, and Send, and scrolls the frame to show them.
- On this site the slide is the simplified animation library's 420 ms spring.

## Accessibility (web)

- Not announced as a dialog; focus isn't moved into it, kept in it, or returned; Escape does nothing. The “Drag down to dismiss” hint isn't exposed on the web. A hidden sheet's controls stay in the Tab order.
- The scrim is a button named “Dismiss overlay” (fixed English). Close needs a named IconButton in the slot.

## Review 11 October 2026 (fix loop)

- Marcin: dark corners on all four corners; the second screen (Without a scrim) looked broken; “look how it’s made in Storybook”. Cause: the guide hosted the sheet in a white frame with the 70% scrim filling the same box, so the scrim showed as dark crescents between the sheet’s four 20 px corners and the frame; without a scrim, the white sheet sat on a white page with nothing between them. The sheet itself matches Figma (one radius 20 on all corners) and renders the same in Storybook. Fix: the kit’s `ScreenFrame receded` gives the frame Storybook’s black stage and steps the page back by `MODAL_SHEET_PAGE_STACK` (the site’s animation stub can’t run `useModalSheetPageStackStyle`: its `interpolate` returns the progress unchanged).

## Review 11 October 2026, second fix loop (Astra's three issues)

- “Fills the screen examples: black crescents still show at the sheet's rounded corners.” Docs mistake. The kit's screen frame clipped at 16 px (15 px inside its border) while the sheet's corners are 20 px, so the black stage showed at every corner where the sheet met the frame: all four on a filled sheet, the bottom two on a fitted one. Neither source shows that: Storybook's frame cuts the sheet's bottom off (#234) and Figma's device composition puts the sheet's bottom on white to the screen edge. Fix: the stacked frame's corners are 32 px, rounder than the sheet's, like a phone screen's; the corner wedges are gone (checked at 2× in Chrome).
- “Configuration: page types MainPage, SubPage and JioPlus aren't shown.” Docs mistake, plus a component bug. The guide also wrapped the slot content in a helper that swallowed the modes the sheet passes to its slot, so Page type would never have reached the children. The slot content now takes the sheet's modes. MainPage and SubPage render the same white sheet; JioPlus renders a `#f5f5f5` sheet with white body Text and an input pill that blends into it (the same pill in Storybook's Default story with Page type JioPlus): #255.
- “Dismissal: no explanation of drag-to-dismiss turned off (enableDismissGesture).” Docs mistake: it is a designer choice (whether a drag can close the sheet), and the brief had excluded it as developer-only.

## Limits

- Light only (Color Mode doesn't change the sheet; slot content is Light). The page uses `topInset={0}` except where it shows the inset.
- Not shown: `presentationProgress` and the animated page-stack hook (the examples use its values through the kit), `style`.
- Page type JioPlus is shown as it ships (#255).

## Coin gaps

- #255 (Component Fix, To do, Component Bug; Mr. Biscuit): Page type JioPlus turns the sheet `#f5f5f5` but passes JioPlus to its slot, so Text turns white and the HelloJio Input pill disappears into the sheet.
- #234 (Component Fix, To do, Component Bug; Mr. Biscuit): `topInset` moves the sheet down without shrinking it, so its bottom is cut off by the inset; `modalSheet/gap` not applied to slot children; a hidden sheet stays in the Tab order and focus scrolls it into view; no dialog role, focus handling, or Escape; the drag hint isn't exposed on the web; the scrim press doesn't call `onRequestClose`; the Storybook rewrite and InFlow story aren't published.
