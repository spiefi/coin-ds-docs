# Content Sheet source evidence

Package, Figma, Storybook, and browser evidence for the Content Sheet guide (board ticket #158, Design documentation — Marcin; Storybook coverage — Biscuit, done).

## Check

Checked 6 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-3795b4c` (Biscuit's `main` at 3795b4c). `ContentSheet.tsx` is identical to upstream 636f3f5; no `contentSheet/*` or `drawer/title*` token changed there.

- Figma: [Coin Components Library · Content Sheet](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4451-1760), node `4451:1760`. One component, 360 × 350: a `fixed header` (title wrap 344 × 41, title "Title") and a `slot` starting at y 61 holding a ListGroup of four boxed List Items. Tokens: `contentSheet/gap` 8, padding 12 top / 8 sides / 41 bottom, top radius 20, background #ffffff; title 14/17 bold #0d0d0f. No handle, scrim, or shadow.
- Storybook (published `index.json`): `components-contentsheet--docs`, `--default`, `--with-title`, `--rich-content`, `--bottom-pop-up` (all upstream stories). Stories render the sheet in a positioned 360 × 640 phone frame with `List Item Style: Boxed`. The docs page is still the generated one; Biscuit's board note on #158 says it was rewritten with a handwritten marker, which is not on `main` (636f3f5).
- Upstream mdx: "Bottom-anchored surface… essentially one big slot with padding and rounded top corners"; "The sheet never sets an explicit height"; "Do not set a fixed height"; "pins to the bottom of its nearest positioned ancestor by default"; "Keep `safeAreaBottom` enabled"; "When used as a modal surface, manage focus and provide a dismiss affordance in the content."
- Package: public `ContentSheet` props `children`, `modes` (also cascaded to children), `title`, `visible` (true), `pinToBottom` (true), `maxHeightPercent` (0.7), `safeAreaBottom` (true), `style`, plus View props (`testID` → `data-testid`, role and aria pass through). `avoidKeyboard`/`keyboardSpacing` are deprecated no-ops. No ref, close callback, scrim, handle, or gestures.

## Behaviour (Chrome, react-native-web 0.21.2)

- Not a portal or modal: `position: absolute; left/right/bottom: 0` inside the nearest positioned parent (full width, flush bottom); `pinToBottom={false}` puts it in normal flow. In a parent that is not positioned it anchors to the page instead.
- Inside the kit `ScreenFrame` (passed as `footer`) it docks to the frame's bottom at the frame's inner width (358 px). White on the frame's white background: the edge is invisible without a scrim or a coloured screen behind it.
- Height follows the content: 12 top padding + title wrap 41 (if any) + content + 41 bottom padding (plus the bottom safe-area inset; 0 on the web). Three default rows without a title: 179 px; with a title: 220 px. Width follows the parent.
- Maximum height is `maxHeightPercent` × the window height (630 px at a 900 px window), not the parent's height; past it the content scrolls (scrollbar hidden). A tall sheet in a short frame loses its top.
- The title is a centred `div` inside the scroll content: it scrolls away with the content (JSDoc says "sticky"; Figma calls the layer "fixed header").
- `contentSheet/gap` is set on the container whose only child is the scroll view, so it has no effect: the slot starts 8 px higher than in Figma (53 vs 61) and several children touch (0 px).
- `visible`: springs up from below on every mount and when shown, back down when hidden. A hidden sheet stays mounted: Tab still reaches its buttons and screen readers can read it. The docs site aliases `react-native-reanimated` to a stub, so here the entrance overshoots by about 13% and settles in ~0.45 s.
- No role, label, focus handling, or Escape. Children keep their roles (ListGroup `ul[role=list]`, ListItem `button`).
- `Page type` mode: MainPage/SubPage #ffffff, JioPlus #f5f5f5. `Color Mode: Dark` turns the title white but the sheet stays white.

## Classification

- Designer-configurable: content (one slot), title, shown or hidden, the scrim the screen puts behind it.
- System-driven: auto height, width, 20 px top corners, padding, the 70% cap, the spring.
- Developer-only: `pinToBottom`, `maxHeightPercent`, `safeAreaBottom`, `style`, `testID`, roles.
- Not shown: Dark mode, Page type modes, scrolling past the cap, keyboard handling.

## Coin gaps

- #203 (Component Fix, To do, Component Bug, medium; Mr. Biscuit, Anagha Ghotkar): `contentSheet/gap` not applied; title scrolls instead of staying fixed; hidden sheet still focusable and readable; Dark title white on a white sheet; maximum height from the window rather than the parent; docs page not rewritten as the board note says.
