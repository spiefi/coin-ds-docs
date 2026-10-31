# Toast source evidence

Package, Figma, and Storybook evidence for the Toast guide (board ticket #63, Design documentation — Marcin; Storybook coverage — Biscuit, done).

## Checked

Checked 12 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-636f3f5` (Biscuit's `main` at 636f3f5). Biscuit's newer `main` commit c1fa197c (12 October) changes only `Toast.mdx` (a handwritten rewrite) and adds `excludeStories` to `Toast.stories.tsx`; the Toast code is unchanged. Installed `src/` and `lib/module` match upstream byte for byte.

Re-checked 17 October 2026 for the #267 publish: the docs now install mirror tag `v0.1.78-a116616` (Biscuit's `main` at a116616, 16 October), which carries 7020bf9's `Toast.tsx`, `ToastProvider.tsx` and `useToast.ts` changes. The icon uses AppearanceBrand Neutral unless the toast's modes set AppearanceBrand (Toast.tsx:73-80). `maxVisibleToasts` is floored and clamped at 0, and 0 shows none (ToastProvider.tsx:24-28). Each toast's timer starts in `addToast` (useToast.ts:77-80), including toasts waiting behind the cap. `addToast` accepts `disableTruncation` and the provider passes it to the view. Measured on the guide in headless Chrome: Configuration card icon `rgb(255, 255, 255)`, own `ic_confirm` icon `rgb(173, 132, 68)`, brand icons Primary `rgb(206, 161, 90)`, Secondary `rgb(93, 0, 181)`, Tertiary `rgb(3, 107, 153)`, Neutral `rgb(255, 255, 255)`; Show five shows Notification 3–5 at 0.7 s and nothing at 4.5 s or 8.5 s (Notification 1 and 2 time out unseen). Re-test on #267: `addToast({ title: <long>, disableTruncation: true })` shows all 5 lines.

## Sources

- Package: `src/components/Toast/` — `Toast.tsx` (the toast itself), `ToastProvider.tsx`, `useToast.ts`; exports `Toast`, `ToastProvider`, `useToast`, `addToast`, `closeToast`, `closeAll`, and types `ToastProps`, `ToastProviderProps`, `ToastOptions`, `ToastEntry`, `ToastPlacement`.
- Figma: [Coin Components Library · Toast](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2197-1510), node `2197:1510`: one component, 291 × 46, properties `Text` (“Mobile number is invalid”), `Start Item` (boolean, off), `SlotItem` (instance swap, `ic_card`). Padding 16 / 14, gap 8, radius 14, 1 px border `#ffffff1a`, fill `#303338`, text white 14/18 JioType Var 500, icon 18 px, shadows 0/16/32 and 0/16/48 at `rgba(13,13,15,0.16)`. Width hugs the text (examples 328 and 193 wide). A visible-icon instance (8607:53) resolves `toast/icon/color` to white.
- Storybook (published `index.json`): docs `components-toast--docs`; stories `--default`, `--top-placement`, `--multiple-toasts`, `--persistent-toast`, `--custom-timeout`, `--with-start-item`. The published page is the old generated page, not c1fa197c's rewrite. Every story is a `ToastProvider` around a `#f5f5f5` screen (min height 400) with centred buttons; no story reads its args or passes modes.
- Biscuit's #63 comment (on addToast, the single provider, and the toast's fixed colours) matches the code.

## Contract

- `addToast({ title, timeout = 4000, onClose, modes, startItem = false, slotItem, disableTruncation })` returns an id (`disableTruncation` since a116616). `timeout <= 0` keeps it until closed. `closeToast(id)`, `closeAll()`, `useToast()` (`{ toasts, addToast, closeToast, closeAll }`) work over one module-level queue.
- `ToastProvider` (`children`, `maxVisibleToasts` 3, `placement` `bottom` (default) | `top`, `modes` as a fallback for entries without their own). It wraps the screen and adds a region 8 px (plus the safe-area inset, 0 here) from that edge: centred, 8 px gap, oldest first. Every provider renders the whole queue, so two mounted providers show every toast twice; the docs mount one at a time.
- Only the newest `maxVisibleToasts` are mounted. Since a116616 every toast's timer runs from `addToast`, so older ones wait behind the cap on their own timers and appear only if still due when a newer one closes; `maxVisibleToasts={0}` shows none (#267, fixed; on c1fa197 they waited without a timer and 0 showed all).
- `Toast` view (`id`, `title`, `timeout`, `modes`, `placement`, `style`, `startItem`, `slotItem`, `disableTruncation`, `onClose` unused). `disableTruncation` is reachable through `addToast` since a116616 (#267, fixed). The docs use the view for static examples with `timeout={0}`.
- No intent or type, no action, no close button, no swipe, no tap to dismiss. The title clamps at two lines with an ellipsis.
- Animation: Reanimated layout animations, enter `SlideInUp` (top) or `SlideInDown` (bottom) over 250 ms, exit `FadeOut` over 250 ms. The 250 ms entry counts toward the timeout.

## Modes and tokens

- Collection “Tost Output” (sic), one mode: background `#303338`, foreground `#ffffff`, border 1 px `rgba(255,255,255,0.1)`, padding 16 / 14, gap 8, radius 14, JioType Var 14 / 500 / 18, shadows as Figma. `toast/height` 46 is never read. The surface is the same in every mode.
- `toast/icon/color` follows AppearanceBrand (Light): Primary `rgb(206,161,90)` gold, Secondary `rgb(93,0,181)`, Tertiary `rgb(3,107,153)`, Neutral `#ffffff` (Figma's value; the default since a116616, #267).
- A custom `slotItem` Icon without a colour takes `icon/color`: `rgb(173,132,68)` in Light Primary.
- Toast never reads `JFSThemeProvider`; modes reach it through the entry or the provider.

## Web render

Provider: a `div` (flex 1) around the screen, then, while toasts exist, an absolute region (`bottom: 8px` or `top: 8px`, z-index 9999). Surface: `div[role="alert"][aria-live="assertive"]`, `minWidth 200`, `maxWidth 90%`, `alignSelf center`; leading icon `svg` 18 × 18 (no `aria-hidden`); title `div[dir="auto"]` with a two-line clamp. No `testID`.

## Docs site

The site replaces `react-native-reanimated` with a web stub; layout animations (`entering`, `exiting`) were ignored by it, so toasts appeared and vanished at once. This guide's commit teaches the stub Reanimated's slide and fade layout animations so toasts move as in Storybook.

## Discrepancies

- Icon colour: white by default since a116616, as in Figma (gold before, #267, fixed).
- Figma shows a 193 px example; the code's minimum width is 200.

## Limits

- Light only. Not shown: `maxVisibleToasts`, `closeToast`, `onClose`, `id`, `style`, `disableTruncation`.

## Coin gaps

- #267 (Component Fix, To do, Component Bug; Mr. Biscuit): default icon gold against Figma's white; `maxVisibleToasts={0}` shows every toast; toasts past the cap appear late with a fresh timeout; `disableTruncation` unreachable through `addToast`; Storybook controls and Color Mode do nothing.

## Review 12 October 2026

Checked in Chrome at 1280 and 390 px. A toast is off-screen 120 ms after Show toast (sliding up from 100vh over 250 ms) and settled at the frame's bottom by 820 ms. Show five shows Notification 3–5; after 4 s they close and Notification 1 and 2 appear. Every static Toast view on the page is also `role="alert"`. First fix round: the toast's 0/16/48 shadow spilled out of the example stages onto the cards, so static toasts sit in the kit's new `Surface elevated` (room below for the shadow); the anatomy and the measured diagram wrapped the toast to two lines (206.5 × 66) and now get a 300 px specimen.
