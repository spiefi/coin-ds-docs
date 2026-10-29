# Skeleton source evidence

Package, Figma, and Storybook evidence for the Skeleton guide (board ticket #25, Design documentation — Marcin; Storybook coverage — Biscuit, done).

## Checked

Checked 12 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-636f3f5` (Biscuit's `main` at 636f3f5). Biscuit's newer `main` commit c1fa197c (12 October) changes only `Skeleton.mdx` (a handwritten rewrite) and adds `excludeStories` to `Skeleton.stories.tsx`; no Skeleton code changed. Installed `src/` and `lib/module` match upstream byte for byte.

Re-checked 17 October 2026 for the #266 publish: the docs now install mirror tag `v0.1.78-a116616` (Biscuit's `main` at a116616, 16 October), which carries 7020bf9's `Skeleton.tsx`, `SkeletonGroup.tsx` and primitive `loading` changes. `Skeleton` has a `visible` prop (default false) that primitives set from their own `loading`: a visible placeholder draws with no group, runs its own shimmer clock, and is `role="progressbar"` named "Loading" (Skeleton.tsx:130-160, 274-298). A bare `<Skeleton>` without a group still returns null. Inside a loading group, placeholders are `aria-hidden="true"` `role="presentation"`, and the group adds one hidden `progressbar` "Loading" with `aria-live="polite"` (SkeletonGroup.tsx:148-150). Re-test on #266: `<Text loading>` alone draws a 17 px placeholder; `<Image loading>` alone draws one too.

## Sources

- Package: `src/skeleton/` (`Skeleton.tsx`, `SkeletonGroup.tsx`, `shimmer-tokens.ts`, `useReducedMotion.ts`), exported from the package root: `Skeleton`, `SkeletonGroup`, `useSkeleton`, `useStaggerIndex`, `useReducedMotion`, `SHIMMER`, `SKELETON_TOKEN`, `SKELETON_FALLBACK`, and types.
- Figma: no Skeleton component in Coin Components Library or Coin Subcomponents (`search_design_system` finds none). The ticket's link (Coin Subcomponents, node 27:854) opens the “Stepper Item” page. The Coin Variables library has a “Skeleton” collection: `bg/defaultSkeleton`, `cornerRadius/defaultSkeleton` (9999), `/imageSkeleton` (10), `/badgeSkeleton` (4). The guide links the Coin Components Library and says so.
- Storybook (published `index.json`): docs `components-skeleton--docs`; stories `--kinds`, `--reduced-motion`, `--primitives-auto-skeletonize`, `--cascade`, `--card-composition`, `--explicit-loading-prop`, `--standalone-atomic`. The published page is the old generated page (it gives the fill as `rgb(245, 245, 246)`), not c1fa197c's rewrite. Stories sit in a plain padded View on the white canvas; the Kinds controls aren't wired to any story.
- Biscuit's #25 comment (“Documents that the placeholder renders only inside a loading group”) matches the code.

## Contract

- `SkeletonGroup` (`loading` required, `reducedMotion?`: undefined follows the device, true/false forces, `children`): renders no element, only context. Nested groups replace the outer one.
- `Skeleton` (`kind` `text | image | badge | other` (default `other`), `width`, `height`, `modes`, `style`): kind sets only the corners (text and other 9999, image 10, badge 4). No size unless given. Renders only while an enclosing group is loading; otherwise `null`.
- Coin primitives that draw their own placeholder in a loading group (`useSkeleton`): Text (`kind="text"`, width from the text length × 0.55 × font size, height = line height × lines), Badge (`kind="badge"`), Button (rounded bar sized from label and padding), Avatar, IconButton, Icon, FavoriteToggle (square at their size), Image (`kind="image"`). `loading={false}` on one of them inside a loading group shows the real component. `loading` on its own, without a group, renders nothing (#266). Card and other composites skeletonize through their Text, Image, and so on.
- Loaded: `loading={false}` stops the clock; every Skeleton returns null and primitives render their content in the same size.

## Modes and tokens

- `bg/defaultSkeleton` aliases `context5 / shimmerColor`: Default → `rgb(231, 231, 231)` (`#e7e7e7`) in every Color Mode; Fullscreen Modal (or Mode 1) → `rgb(44, 37, 27)` in Light. FullscreenModal always passes `context5: 'Fullscreen Modal'` to its content. Color Mode alone changes nothing, so Storybook's Color Mode control is a no-op (c1fa197c hides it).
- Shimmer constants are code: band 1500 ms linear loop at 135°, white stops 0 / 0.33 / 1 / 0.33 / 0 at 0 / 30 / 50 / 70 / 100%; stagger `(index × 75 ms) % 600 ms` in render order. Reduced motion: a white wash pulsing 0.33 → 1 → 0.33 opacity over 3000 ms (ease in-out), no band, no stagger.

## Web render

Each placeholder in a group: `div[role="presentation"][aria-hidden="true"]` (since a116616; no `aria-hidden` before, #266) with the grey background, radius, overflow hidden, and size; no `testID`. Outside a group a primitive's placeholder is `role="progressbar"` named "Loading". The band is an `svg` gradient inside, added after the first layout; reduced motion uses a white `div` instead.

## Docs site

The site replaces `react-native-reanimated` with a web stub. Its `withRepeat` returned the animation once and child components never re-rendered from a parent's shared value, so the shimmer was a still frame. This guide's commit teaches the stub `withRepeat` and lets `useAnimatedStyle` follow the shared values it reads, so the band sweeps and the pulse breathes as in Storybook.

## Discrepancies

- c1fa197c's page says `loading={true}` draws a placeholder without a group; it didn't until a116616 (#266, fixed). The Explicit Loading Prop story shows nothing for 1.8 s for the same reason. Standalone Atomic's title says “outside any group” but the story is inside one.
- The old published page gives the fill as `rgb(245, 245, 246)`; the token resolves to `#e7e7e7`.

## Limits

- Light only. Not shown as settings: `style`, the hooks and constants, Color Mode (no effect). `context5` appears only in its Configuration card.

## Coin gaps

- #266 (Component Fix, To do, Component Bug; Mr. Biscuit): `loading` outside a group draws nothing; placeholders aren't hidden from screen readers on the web and nothing announces loading; Storybook story and control problems; no Skeleton component in Figma and the ticket's Figma link points elsewhere.

## Review 12 October 2026

Checked in Chrome at 1280 and 390 px with the stub change: the band sweeps and loops, and reduced motion pulses. Measured in a loading group: the Avatar placeholder is 42 × 42 and the Text placeholder for “Reliance Industries” 146.5 × 17. Loaded and loading rows keep the same layout. First fix round: anatomy pins rearranged so the Shimmer leader doesn't cross the Text bar.
