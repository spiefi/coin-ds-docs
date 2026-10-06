# Drawer source evidence

Package, Figma, Storybook, and browser evidence for the Drawer guide (board ticket #67, Design documentation — Marcin; Storybook coverage — Biscuit, done).

## Check

Checked 6 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-3795b4c` (Biscuit's `main` at 3795b4c). `Drawer.tsx` is identical to upstream 636f3f5; no `drawer/*` or `overlay/*` token changed there.

- Figma: [Coin Components Library · Drawer](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2847-3454), node `2847:3454`. One component, 360 × 722: a `fixed header` (344 × 63: handle 42 × 6 at y 8, title wrap 41) and a `scroll wraper` from y 71 holding a Stack whose `content` slot is filled with Section cards and a Disclaimer. Grey #f5f5f5 sheet, top radius 12, two-layer shadow. No scrim and no collapsed/expanded variants.
- Storybook (published `index.json`): `components-drawer--docs`, `--interactive-drawer`, `--with-overlay`, `--drawer-with-carousel`, `--programmatic-control` (all upstream stories). Stories render the Drawer in a full-window host. The docs page is still the generated one (it mentions an `items` prop and a button-role handle that do not exist); Biscuit's board note on #67 says it was rewritten with a handwritten marker, which is not on `main` (636f3f5).
- Package: public `Drawer` props `title`, `header` (fixed, above the title), `children` (scrolling body), `initialState` ('collapsed'), `state` + `onStateChange`, `collapsedHeight` (200), `expandedRatio` (0.9, clamped 0.2–0.95), `showOverlay` + `onOverlayPress`, `bottomInset` (80), `modes`, `style`, `sheetStyle`, `contentStyle`, `contentContainerStyle`, `showsVerticalScrollIndicator`, `accessibilityLabel`, `accessibilityHint`; ref `expand`/`collapse`/`toggle`/`getState`. No `visible`, close, or dismiss: the minimum is the collapsed peek.

## Behaviour (Chrome, react-native-web 0.21.2)

- Inline, not a portal: a full-size absolute layer (pointer-events none) in the nearest positioned parent, holding the sheet (`role="dialog"`).
- **Geometry comes from the window, not the parent**: sheet height = window height × `expandedRatio`; collapsed position = window height − `collapsedHeight`; expanded top = window height × (1 − ratio), never less than 5% of the window. In a 390 × 640 frame on a 900 px window the default collapsed sheet sits 700 px down: invisible. Storybook hides this with a full-window host.
- The docs page fits each Drawer to the kit `ScreenFrame` (inner height 318 px) through its public props, recomputed from the window height: `collapsedHeight = window − 318 + peek`, `expandedRatio = 1 − top / window`, `sheetStyle={{ height: 318 − top }}` with `top = max(48, 5% of the window)`. Measured: 139 px visible for a 140 px peek; expanded top 46 px below the frame top.
- No entrance animation: `initialState` renders at its final position. Collapsed ↔ expanded animates with a spring. A controlled `state` is not applied at mount; pass `initialState` too.
- Gestures: drag from the handle or the content (mouse works on the web); a short drag springs back, past the threshold or a flick toggles; tapping the handle does nothing. No keyboard or screen-reader way to resize: the handle is not focusable and `accessibilityHint` does not reach the web.
- `showOverlay`: a static rgba(0,0,0,0.7) scrim behind the sheet, shown in both states; without `onOverlayPress` it still blocks taps on the screen.
- Layout: handle 42 × 6 (#e0e0e3) 8 px from the top; title text 30 px from the top (14/17 bold); first content 63 px from the top (Figma 71); side padding 8, bottom 10 + an 80 px bottom inset in the scroll content. Shadow uses the primary offset and blur for both layers. The title ignores `drawer/title/fontFamily`.
- Modes are not passed to children: every child needs its own `modes`. `Color Mode: Dark` turns the title white but leaves the sheet #f5f5f5 (the background follows `Page type`).
- `accessibilityLabel` is never applied (hard-coded `undefined`); the dialog has no name, no `aria-modal`, no focus handling, no Escape.
- Published Storybook (real reanimated): the content cannot be scrolled with the wheel or by dragging (the scroller stays `overflow-y: hidden`). The docs site aliases `react-native-reanimated` to a stub, so here the content always scrolls and springs overshoot slightly.

## Classification

- Designer-configurable: title, content, how much peeks when collapsed, how tall it is expanded, collapsed or expanded, scrim.
- System-driven: handle, drag behaviour, spring, shadow, radius, padding.
- Developer-only: `state`/ref wiring, `header` composition, styles, `bottomInset`, `accessibilityLabel`.
- Not shown: Dark mode, Page type modes, the ref API, scrolling behaviour differences.

## Coin gaps

- #202 (Component Fix, To do, Component Bug, medium; Mr. Biscuit, Anagha Ghotkar): positions from the window height instead of its parent; controlled `state` ignored at mount; `accessibilityLabel` dropped; no keyboard/screen-reader way to resize; content does not scroll in the published Storybook; Dark title white on grey; title font and secondary shadow tokens ignored; content 8 px higher than Figma; docs page stale.
