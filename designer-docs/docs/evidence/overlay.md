# Overlay source evidence

Package, Figma, and Storybook evidence for the Overlay guide (board ticket #8, Design documentation — Marcin; Storybook coverage — Biscuit, done).

## Checked

Checked 12 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-636f3f5` (Biscuit's `main` at 636f3f5). Biscuit's newer `main` commit c1fa197c (12 October) changes only `Overlay.mdx` (a handwritten rewrite) and adds `excludeStories` to `Overlay.stories.tsx`; `Overlay.tsx` is unchanged.

## Sources

- Package: `src/components/Overlay/Overlay.tsx` (114 lines); exports `Overlay` (memo) and `OverlayProps`.
- Figma: [Coin Components Library · Overlay](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2976-55), node `2976:55`: a 589 × 708 fill, no children, slot, variants, or properties; `overlay/background` `#000000b2` (collection Overlay / Output). The Drawer page's “Learn More” frame (4069:77809) uses an instance over a whole 360 × 800 device screen behind a white sheet. Code Connect is a bare `<Overlay />`.
- Storybook (published `index.json`): docs `components-overlay--docs`; stories `--default`, `--bare-backdrop`, `--bottom-sheet`. The published page is the old generated page, not c1fa197c's rewrite. Story host: a white 320 × 420 frame (radius 12) with “Screen content” and a line of text, the Overlay as a sibling; the Dialog is a white View, radius 12, padding 20, margin 24. Every story passes an `onPress` action, so the dismiss button exists even on the bare backdrop.
- Biscuit's #8 comment (“Scrim behavior, placement, and the fixed dismiss name match the component”) matches the code.

## Contract

- Props: `children` (painted above the scrim; omitted = bare scrim), `contentPlacement` `center` (default) | `top` | `bottom` | `stretch`, `onPress`, `fill` (true), `modes`, `style`, and View props (`testID` lands on the root, which is the scrim).
- Placement: center → content centred at its own width; top / bottom → docked to that edge, stretched across; stretch → centred vertically, stretched across.
- `fill` true: absolute fill of the nearest positioned parent (every React Native View is positioned on the web), not the viewport. `fill={false}`: in the page's flow, sized by its content (or `style`).
- `onPress` set: a full-size `button` named “Dismiss overlay” (fixed English, no prop) is the first child; content comes after it and sits above it, so presses on content don't dismiss. No `onPress`: the scrim is inert but still blocks presses to the page.
- Not a Modal or portal; no open state (render to show, remove to hide); no animation; no focus move, focus containment, or Escape; no `role` or `aria-modal` (`accessibilityViewIsModal` is dropped on the web).
- Children get the overlay's `modes` merged under their own (`cloneChildrenWithModes`).

## Modes and tokens

One token, `overlay/background` = `rgba(0, 0, 0, 0.7)` (single mode); the same in every Color Mode and collection. Storybook shows no mode controls. Drawer uses Overlay for its scrim; Popup draws its own 50% scrim from props instead.

## Web render

`div[data-testid]` (absolute, inset 0, background `rgba(0,0,0,0.7)`, overflow hidden, flex placement) › `button[aria-label="Dismiss overlay"]` (absolute fill, only with `onPress`) › children.

## Discrepancies

- Figma's 589 × 708 and 360 × 801 sizes aren't a specification; the code fills its parent.
- c1fa197c's page says the region is always treated as modal; on the web nothing is announced as modal.
- The full-size dismiss button is a Tab stop before the content; whether its focus ring outlines the whole screen is checked in the browser review.

## Hosting

The guide hosts the Overlay in the kit's `ScreenFrame` (360 × 320, white, positioned), with a small page behind it, as Storybook's frame does. Dialog content is a Coin `Card` with `Title` and `ButtonGroup` instead of Storybook's hand-made View.

## Limits

- Not shown as designer settings: `style`, `modes` (no effect on the scrim).
- Light only.

## Review 12 October 2026

Checked in Chrome at 1280 and 390 px. The scrim measures 358 × 318 inside the 360 × 320 screen frame (inside its 1 px border). Focusing the dismiss button draws the focus ring around the whole overlay; Escape does nothing; the page's own Pay ₹250 button stays in the Tab order behind the scrim. First fix round: the page behind is stacked in a VStack (Coin Text runs inline without one).

## Coin gaps

- #269 (Component Fix, To do, Component Bug; Mr. Biscuit): “Dismiss overlay” is fixed English with no prop; the dismiss button's focus ring outlines the whole screen; Tab reaches the page behind and Escape does nothing; nothing marks the region as modal on the web.

## Fix loop 12 October 2026

Marcin's review (changes requested): “Why does the popup have a color, and the cancel button is secondary”.

- Docs mistake, fixed: the dialog was a Coin `Card` with only Color Mode, so it took Card's default AppearanceBrand Primary fill, `card/background/color` = `rgb(254, 244, 229)` (cream). AppearanceBrand Neutral resolves it to `rgb(255, 255, 255)`, matching Storybook's white dialog. Card passes its modes to its children (`cloneChildrenWithModes`), so the buttons set AppearanceBrand Primary themselves.
- Docs mistake, fixed: Cancel used `AppearanceBrand: 'Tertiary'`, a blue fill (`button/background` `rgb(3, 107, 153)`) copied from the Popup stories. It is now `Emphasis: 'Low'` on Primary (transparent fill, gold text), the low-emphasis way out Figma's Popup uses for Later. Pay stays the Primary fill; both sit side by side in the ButtonGroup, so the dialog's height doesn't change.
- Docs mistake, fixed while checking 390 px: in the docked and stretched placements the dialog's Title cut “Confirm payment” to one line with an ellipsis (Title defaults to `numberOfLines` 1, `Title.tsx`). The Title now allows two lines.
