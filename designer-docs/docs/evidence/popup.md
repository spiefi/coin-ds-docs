# Popup source evidence

Package, Figma, and Storybook evidence for the Popup guide (board ticket #97, Design documentation — Marcin; Storybook coverage — Biscuit, done).

## Checked

Checked 12 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-636f3f5` (Biscuit's `main` at 636f3f5). Biscuit's newer `main` commit c1fa197c (12 October) changes only `Popup.mdx` (a handwritten rewrite) and adds `excludeStories` to `Popup.stories.tsx`; `Popup.tsx`, VStack, Title, and Button are unchanged.

## Sources

- Package: `src/components/Popup/Popup.tsx` (217 lines); exports `Popup` (forwardRef), `PopupProps`, `PopupRef` (`open()`, `close()`).
- Figma: [Coin Components Library · Popup](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3040-764), node `3040:764`: one component, 360 × 508, no variants or properties: a white sheet (`popup/background`), top corners 20, bottom corners 0, padding 0 / 0 / 24 bottom, holding a VStack slot (padding 8, gap 8) with an image (344 × 270, radius 16), a centred Title (26/900, subtitle 14/500), and a ButtonGroup (Claim gold primary, Later). No scrim and no usage-on-screen frame. Code Connect: `<Popup><VStack slot><Image/><Title …/><ButtonGroup>…</ButtonGroup></VStack></Popup>`.
- Storybook (published `index.json`): docs `components-popup--docs`; stories `--default` (trigger “Open Popup”, a tile, Title “Your rewards are awaiting for you”, Claim and Later), `--controlled` (a “Show Popup” button sets `open`), `--custom-content` (“Get 50% cashback”, Avail Now and Maybe Later). The published page is the old generated page, not c1fa197c's rewrite. The canvas shows only the trigger; the popup opens over the whole iframe. c1fa197c's page says the same: “the sheet is a React Native Modal, so it is not drawn inside this frame”.
- Biscuit's #97 comment (“bottom-sheet modal, controlled and triggered open, and the inner stack”) matches the code.

## Contract

- Props: `open` (controlled when set), `defaultOpen` (false), `onOpenChange(open)` (called by the trigger, the ref, the scrim, and Escape/back), `trigger` (an element cloned with `onPress` that opens; rendered in place before the modal, without the popup's modes), `children` (one slot, wrapped in `VStack modes alignHorizontal="center"`), `modes`, `closeOnBackdropPress` (true), `backdropColor` (`#000000`), `backdropOpacity` (0.5), `animationDuration` (250), `style` (on the sheet). No `testID`, `accessibilityLabel`, title, close button, handle, drag, or placement.
- Renders React Native `Modal` (`transparent`, `animationType="none"`). On the web, react-native-web portals it into a new `div` on `document.body`, `position: fixed; inset: 0; z-index: 9999`: it covers the whole browser window, never a frame, and the sheet is 100% of the window's width. Closed, nothing is in the DOM.
- Open: `Animated.spring` (React Native `Animated`, not Reanimated; damping 22, stiffness 220, mass 0.8, about 1% overshoot, ignores `animationDuration`) from the window's height, with the scrim fading to `backdropOpacity` over `animationDuration`. Close: slide and fade over `animationDuration` (ease in-out), then unmount.
- Close paths: scrim press (only with `closeOnBackdropPress`), Escape on the web (react-native-web's Modal calls `onRequestClose`), Android back, `ref.close()`, or `open={false}`. With `closeOnBackdropPress={false}` the scrim is still a focusable button named “Close popup” with no action (#268).
- Web accessibility: `role="dialog"` `aria-modal="true"` on react-native-web's wrapper, with no name (#268); react-native-web traps focus inside and returns it on close. `accessibilityViewIsModal` has no web effect.
- No maximum height or scroll: the sheet is `overflow: hidden` and docks to the bottom, so tall content runs off the top (#268).

## Modes and tokens

- Popup collection list: Background, Color Mode, Context, Padding, Page type, Slot gap, Stack Context. The sheet reads `popup/background` (`#ffffff` in Light), `popup/padding/*` (0 / 0 / 24 bottom), `popup/cornerRadius/top` 20, `/bottom` 0.
- Every mode reaches the inner VStack and, through it, every child (a child's own modes win): Padding Default + Stack Context Root gives 8 px on MainPage and 16 px on SubPage and JioPlus; Nested 12; Padding None 0. Slot gap XS 2, S 8 (default), M 16, L 24, XL 32 (Context ListItem makes S 2). Background True paints the stack white (no visible change on the white sheet). Title and Button colours don't change with Page type.
- Scrim colour and opacity are props, not tokens; Overlay's token is 70% black.

## Discrepancies

- Figma has no scrim; code adds 50% black. Figma is a fixed 360 px wide; code spans the window. Figma's example image is 270 px tall; the stories use 200 and 180 px tiles with emoji.
- c1fa197c's page: “No focus return” — on the web react-native-web's Modal returns focus; `accessibilityViewIsModal` has no web effect.

## Hosting

Because the Modal covers the whole browser window, the guide shows the popup only through interaction, as Storybook does: each example is a trigger (or a controlled button) that opens the real popup over the page. Anatomy pins only what renders in place, the trigger; the sheet's parts are described. This is a platform limit of React Native's Modal on the web, not a Coin bug.

## Limits

- Light only. `backdropColor` isn't shown (product colour); `defaultOpen` isn't used (controlled `open` or a trigger instead); `style` isn't shown.

## Coin gaps

- #268 (Component Fix, To do, Component Bug; Mr. Biscuit): unnamed dialog; inert “Close popup” scrim button with scrim taps off; no maximum height or scroll; the trigger doesn't get the popup's modes; 50% scrim from props against Overlay's 70% token, and none in Figma.

## Review 12 October 2026

Checked in Chrome at 1280 and 390 px. Opening the playground popup covers the whole window; the scrim's backdrop measures opacity 0.5 over black. Focus moves to the invisible “Close popup” scrim button on open (so Enter would close it), Tab then reaches Claim, and Escape closes it; the dialog has no name (added to #268). React Native's Animated warns once that `useNativeDriver` falls back to JS on the web. First fix round: twelve lines of terms didn't outgrow a 900 px window, so the tall example has forty.

## Fix loop 12 October 2026

Marcin's review (changes requested): the In context trigger had no padding or alignment. Astra's earlier check flagged the same screen (“Payment successful” ran into “₹250 paid to Ravi Stores.”) and that the anatomy pins only the trigger.

- Docs mistake, fixed: the screen behind the popup was two loose Coin `Text`s and a bare `Button` directly in the frame; Coin Text runs inline without a stack. It is now a Coin `VStack` (Slot gap L, 24 px) with a centred `Title` (title + subtitle) and a full-width Done button.
- Docs mistake, fixed alongside: Later used `AppearanceBrand: 'Tertiary'`, copied from the Storybook stories (`Popup.stories.tsx` Default and CustomContent pass Tertiary), which paints a blue filled button. Figma's Popup (3040:764) shows Claim as a full-width fill and Later as a low-emphasis gold text button below it. Later is now `Emphasis: 'Low'` (Primary: transparent fill, text `rgb(173, 132, 68)`), stacked under Claim in a Coin `VStack`, as in Figma.
- Component behaviour, unchanged: the anatomy can't pin the sheet's parts. Popup renders through React Native `Modal` (`Popup.tsx`), which on the web is drawn over the whole window in its own layer, outside any diagram frame; Storybook's page says the same.
- Headless note: on the Vite dev server the sheet's open spring didn't run in headless Chrome (sheet stayed at `translateY(900px)`); on the production build and the live preview it opens normally. Screenshots are taken from the production build.
