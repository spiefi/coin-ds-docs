# ThreadHero source evidence

Package, Figma, and Storybook evidence for the Thread Hero guide (board ticket #58, Design documentation — Marcin; Storybook coverage — Biscuit, done: "Storybook page rewritten to the handwritten outline on main 475ae733").

## dbe0e02 publish (28 October 2026, #397)

The docs now install mirror tag `v0.1.78-dbe0e02` (Biscuit's `main` at dbe0e02, 27 October). #397 verified 27 October on dbe0e02 (run_beaf2324); closed by Marcin; published to the docs 28 October in Penny run run_92acfa9d. Where the sections below say otherwise, this section replaces them.

- renderAvatar's own modes win: an avatar set to Size S stays 29 px, and a hero at S with an avatar at M gives 36. Fragments and arrays get the hero's modes; `renderAvatar={false}` shows no avatar.
- In Biscuit's source the WithoutCaption and Default stories pass `<Avatar style="Monogram" monogram="SR" />` (no stock photo), the MDX says only the subtitle and the caption ellipsize, and the MDX Anatomy specimen and Code Connect pass renderAvatar. The title wraps (two lines, 40 px).

Guide changes: Configuration (the avatar's own modes win, so set Avatar Size on the hero or on the avatar); Sources (28 October, 27 October build; the title wraps as in Figma, the avatar's modes win, and in Biscuit's source Storybook says the title wraps and its stories show a Monogram avatar).

## Checked

25 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-c8526ae` (Biscuit's `main` at c8526ae, which contains 475ae733); the mirror is up to date with upstream. Rendered the installed package in the docs site's Vite setup (react-native-web 0.21.2) in headless Chrome, and the published Storybook stories.

## Sources

- Package: `src/components/ThreadHero/ThreadHero.tsx` (134 lines). Exports `ThreadHero`, `ThreadHeroProps` (`components/index.ts:201`).
- Figma: [Coin Components Library · Thread Hero](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1699-6500), node `1699:6500`, one component, 360 × 110, fixed width. Properties `Title`, `Subtitle`, `Caption` (text) and `caption` (boolean, on). A nested Avatar (style Image, 42 px), no swap property. Title truncation off; Subtitle and Caption one line, ending.
- Storybook (published `index.json`): `components-threadhero--default`, `--without-caption`; host `padding: 20`, centred. Both pass `<Avatar size="small" initials="SR" … />`: those props don't exist, so both show the Avatar's bundled stock photo.
- Biscuit's handwritten `ThreadHero.mdx`: "the person at the top of a thread: an avatar, their name, the banking name, and an optional phone or handle." Use for the other person in a payment or chat thread; not the signed-in user (ProfileCard) or a payment result (StatusHero). Content: "Subtitle starts with `Banking name:` when it is the legal name. Caption is a phone number or a handle, not a sentence." "There is no press handler on the hero."

## Contract

- `title` (default 'Subhash Rajan'): 16/20 Semibold 600 `#191b1e`, centred, wraps (no clamp).
- `subtitle` (default 'Banking name: SHIVASHANKAR RAJAN'): 12/18 Medium `#5d5d61`, one line with ellipsis. `''` hides it; `undefined` shows the default.
- `caption` (no default): 12/18 Medium `#5d5d61`, one line with ellipsis, 8 px below; hidden when not passed.
- `renderAvatar`: any node; a single element gets `cloneElement(…, { modes })`, which replaces its own `modes` with the hero's. No default avatar.
- `disableTruncation`: subtitle and caption wrap.
- `modes`: no mode changes the hero's own text (one-mode literals). Through the avatar, `Avatar Size` on the hero's modes resizes it (S → 29 px); on the Avatar itself it's overwritten.
- `style` (ViewStyle) last on the root. No `testID`, `onPress`, accessibility props, or children.

## Web render

Root `div` (column, centred, gap 8) › `div` details (gap 2, width 100%) › [`div[role=img]` avatar, `div[dir=auto]` title, `div[dir=auto]` subtitle] · `div[dir=auto]` caption.

- Hugs its text (233 × 110 with the defaults and a caption); 84 tall without a caption; 40 without avatar and caption.
- In a 200 px column, a long title wraps (two lines) and subtitle and caption ellipsize; with `disableTruncation` they wrap too.
- `<Avatar />` with no props shows a bundled stock photo of a stranger; `<Avatar style="Monogram" monogram="SR" />` shows initials on lilac.

## Discrepancies

- MDX says all three lines ellipsize; the title wraps (as in Figma) (#397).
- Stories pass Avatar props that don't exist and show the stock photo; the MDX Try it's `<Avatar monogram="SR" />` lacks `style="Monogram"` (#397).
- `renderAvatar`'s own modes are replaced, not merged (#397).
- MDX Anatomy specimen has no avatar; Code Connect passes the Avatar as a child (#397).
- Figma's caption shows by default and the hero is 360 px wide; the package hides the caption until passed and hugs its text.

## Hosting

Examples use a Monogram Avatar (initials), never the stock photo except in the Don't that shows it. Narrow examples sit in a Coin `VStack` 240 px column. In context stacks the hero over two Transaction Bubbles at Figma's 231 px, sent right, received left.

## Tickets

- #397 (Component Bug, Biscuit): avatar modes replaced, story Avatar props, MDX truncation claim, MDX anatomy specimen, Code Connect.

## Limits

Don't show or mention Color Mode or dark mode. Don't imply the hero presses, copies the number, has a default avatar, or that the title truncates.
