# Favorite Toggle source evidence

## Checked

28 September 2026. Declared, installed, and registry `latest` `jfs-components` are `0.1.60`. No dependency change. Board ticket #105 (Design documentation — Marcin).

## Sources

- Figma: [Coin Components Library · Favorite Toggle](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=7612-54663), frame `7612:54663` with variants `isActive=False` (`7612:54662`) and `isActive=True` (`7612:54664`), each 29 × 29. Screenshot: False is a frosted translucent circle with a white filled heart; True is a solid white circle with a gold heart. Bound variables on the set: `favoriteToggle/width`/`height` 29, `favoriteToggle/icon/width`/`height` 20, `favoriteToggle/icon/radius` 9999, `color/favoriteToggle/background/color` #ffffff33, `color/favoriteToggle/icon/color` #ffffff, `blur/minimal` 29 (`glass/minimal` background blur). Read through the Figma MCP (jiofinance.in account).
- Storybook: `components-favoritetoggle--docs`; stories `--default`, `--states`, `--disabled`, all on a dark gradient backdrop. The published Storybook renders both States variants identically (translucent circle, white heart) at 14 × 14.

## Contract

- Public `FavoriteToggle` props: `isActive` (controlled), `defaultActive` (uncontrolled, default false), `onChange(next)`, `onPress`, `disabled`, `loading`, `icon` (default `ic_favorite`; Figma hardcodes the heart, the prop exists "for future reuse"), `accessibilityLabel` (default `Favorite`), `accessibilityHint`, `modes`, `style`, `testID` (reaches the DOM).
- Size is a mode, `Favorite Toggle Size`: S 14 px (icon 10), M 29 px (icon 20), L 41 px (icon 28). The package default is S. Figma's masters are M.
- Colour collection `Favorite Toggle Color` has modes Default (background white 20%, icon white) and Active (background white 100%, icon gold alias).
- Designer-configurable: state (favorited or not), size mode, disabled. System-driven: glass blur, colours, pressed opacity 0.7, disabled opacity 0.5. Developer-only: controlled/uncontrolled wiring, `onPress`, `icon`.
- `loading` renders a same-size circular skeleton only inside `<SkeletonGroup loading>`; on its own it renders nothing.

## Rendered (installed package, web)

- M: 29 × 29, radius 14.5, 20 px heart. S: 14 × 14 (10 px heart). L: 41 × 41 (28 px heart).
- Inactive: transparent container with a GlassFill layer (white 20%, `backdrop-filter: blur(9px)`) and a white heart.
- Active: the container paints white 20% and the heart stays white. The Figma Active colours (white circle, gold heart) never resolve: the component passes its state under a mode key named `isActive`, but the collection is `Favorite Toggle Color` with modes Default/Active. The only visible difference between states is whether the blur layer is drawn.
- Role `switch`, `aria-label` from `accessibilityLabel`, `tabindex=0`. `aria-checked` is not emitted on the web, so the state is not exposed. Disabled: opacity 0.5, `aria-disabled=true`, `tabindex=-1`.
- No hit slop: the touch area equals the visual size (29 px at M, 14 px at S).

## Limits

- Coin component bug: Active colours do not resolve (mode key mismatch). The guide must not show or claim a gold heart in the rendered examples; it states the Figma intent in text only.
- Package default size S (14 px) differs from the Figma masters (M, 29 px). The guide sets M explicitly.
- Favorited state is not announced on the web.
- Glass depends on imagery behind it; on white it is barely visible.

## Verification

`npm run verify` passed on 28 September 2026 (all 29 guides at 1280 and 390 px). Planner review of desktop and 390 px captures: Sizing size labels moved above the specimens (they collided with the S/M/L captions), in-context text stacked, and backtick prop names removed from page copy. Rendered Saved state confirmed as a white heart, matching the Limits.
