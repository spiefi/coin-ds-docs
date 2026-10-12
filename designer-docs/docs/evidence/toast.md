# Toast source evidence

Package, Figma, and Storybook evidence for the Toast guide (board ticket #63, Design documentation — Marcin; Storybook coverage — Biscuit, done).

## Checked

Checked 12 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-636f3f5` (Biscuit's `main` at 636f3f5). Biscuit's newer `main` commit c1fa197c (12 October) changes only `Toast.mdx` (a handwritten rewrite) and adds `excludeStories` to `Toast.stories.tsx`; the Toast code is unchanged. Installed `src/` and `lib/module` match upstream byte for byte.

## Sources

- Package: `src/components/Toast/` — `Toast.tsx` (the pill), `ToastProvider.tsx`, `useToast.ts`; exports `Toast`, `ToastProvider`, `useToast`, `addToast`, `closeToast`, `closeAll`, and types `ToastProps`, `ToastProviderProps`, `ToastOptions`, `ToastEntry`, `ToastPlacement`.
- Figma: [Coin Components Library · Toast](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2197-1510), node `2197:1510`: one component, 291 × 46, properties `Text` (“Mobile number is invalid”), `Start Item` (boolean, off), `SlotItem` (instance swap, `ic_card`). Padding 16 / 14, gap 8, radius 14, 1 px border `#ffffff1a`, fill `#303338`, text white 14/18 JioType Var 500, icon 18 px, shadows 0/16/32 and 0/16/48 at `rgba(13,13,15,0.16)`. Width hugs the text (examples 328 and 193 wide). A visible-icon instance (8607:53) resolves `toast/icon/color` to white.
- Storybook (published `index.json`): docs `components-toast--docs`; stories `--default`, `--top-placement`, `--multiple-toasts`, `--persistent-toast`, `--custom-timeout`, `--with-start-item`. The published page is the old generated page, not c1fa197c's rewrite. Every story is a `ToastProvider` around a `#f5f5f5` screen (min height 400) with centred buttons; no story reads its args or passes modes.
- Biscuit's #63 comment (“addToast, the single provider, and that pill colors are fixed”) matches the code.

## Contract

- `addToast({ title, timeout = 4000, onClose, modes, startItem = false, slotItem })` returns an id. `timeout <= 0` keeps it until closed. `closeToast(id)`, `closeAll()`, `useToast()` (`{ toasts, addToast, closeToast, closeAll }`) work over one module-level queue.
- `ToastProvider` (`children`, `maxVisibleToasts` 3, `placement` `bottom` (default) | `top`, `modes` as a fallback for entries without their own). It wraps the screen and adds a region 8 px (plus the safe-area inset, 0 here) from that edge: centred, 8 px gap, oldest first. Every provider renders the whole queue, so two mounted providers show every toast twice; the docs mount one at a time.
- Only the newest `maxVisibleToasts` are mounted; older ones wait without a timer and appear, with a fresh timeout, as visible ones close (#267). `maxVisibleToasts={0}` shows all (#267).
- `Toast` view (`id`, `title`, `timeout`, `modes`, `placement`, `style`, `startItem`, `slotItem`, `disableTruncation`, `onClose` unused). `disableTruncation` can't be reached through `addToast` (#267). The docs use the view for static examples with `timeout={0}`.
- No intent or type, no action, no close button, no swipe, no tap to dismiss. The title clamps at two lines with an ellipsis.
- Animation: Reanimated layout animations, enter `SlideInUp` (top) or `SlideInDown` (bottom) over 250 ms, exit `FadeOut` over 250 ms. The 250 ms entry counts toward the timeout.

## Modes and tokens

- Collection “Tost Output” (sic), one mode: background `#303338`, foreground `#ffffff`, border 1 px `rgba(255,255,255,0.1)`, padding 16 / 14, gap 8, radius 14, JioType Var 14 / 500 / 18, shadows as Figma. `toast/height` 46 is never read. The pill is the same in every mode.
- `toast/icon/color` follows AppearanceBrand (Light): Primary `rgb(206,161,90)` gold (default), Secondary `rgb(93,0,181)`, Tertiary `rgb(3,107,153)`, Neutral `#ffffff` (Figma's value) (#267).
- A custom `slotItem` Icon without a colour takes `icon/color`: `rgb(173,132,68)` in Light Primary.
- Toast never reads `JFSThemeProvider`; modes reach it through the entry or the provider.

## Web render

Provider: a `div` (flex 1) around the screen, then, while toasts exist, an absolute region (`bottom: 8px` or `top: 8px`, z-index 9999). Pill: `div[role="alert"][aria-live="assertive"]`, `minWidth 200`, `maxWidth 90%`, `alignSelf center`; leading icon `svg` 18 × 18 (no `aria-hidden`); title `div[dir="auto"]` with a two-line clamp. No `testID`.

## Docs site

The site replaces `react-native-reanimated` with a web stub; layout animations (`entering`, `exiting`) were ignored by it, so toasts appeared and vanished at once. This guide's commit teaches the stub Reanimated's slide and fade layout animations so toasts move as in Storybook.

## Discrepancies

- Icon colour: gold by default in code, white in Figma (#267).
- Figma shows a 193 px example; the code's minimum width is 200.

## Limits

- Light only. Not shown: `maxVisibleToasts`, `closeToast`, `onClose`, `id`, `style`, `disableTruncation`.

## Coin gaps

- #267 (Component Fix, To do, Component Bug; Mr. Biscuit): default icon gold against Figma's white; `maxVisibleToasts={0}` shows every toast; toasts past the cap appear late with a fresh timeout; `disableTruncation` unreachable through `addToast`; Storybook controls and Color Mode do nothing.

## Review 12 October 2026

Checked in Chrome at 1280 and 390 px. A toast is off-screen 120 ms after Show toast (sliding up from 100vh over 250 ms) and settled at the frame's bottom by 820 ms. Show five shows Notification 3–5; after 4 s they close and Notification 1 and 2 appear. Every static Toast view on the page is also `role="alert"`. First fix round: the pill's 0/16/48 shadow spilled out of the example stages onto the cards, so static pills sit in the kit's new `Surface elevated` (room below for the shadow); the anatomy and the measured diagram wrapped the pill to two lines (206.5 × 66) and now get a 300 px specimen.
