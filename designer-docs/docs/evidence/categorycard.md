# CategoryCard source evidence

Package, Figma, and Storybook evidence for the Category Card guide (board ticket #116, Design documentation — Marcin; Storybook coverage — Biscuit, done: "Rewrote CategoryCard to the handwritten outline. On GitHub main 7b7c79f0").

## Checked

17 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-a116616` (Biscuit's `main` at a116616, 16 October); `npm run coin:status` reports the mirror and the docs up to date with upstream `main`. `CategoryCard.tsx` in the package is byte-identical to Biscuit's `main`. Rendered in the docs' own Vite + react-native-web 0.21.2 build in headless Chrome.

## Sources

- Package: `src/components/CategoryCard/CategoryCard.tsx` (405 lines, `React.memo`); export `CategoryCard`, `CategoryCardProps` (`components/index.ts:49`). Renders `Badge` (gets the card's merged modes) and `Image` (36 × 36, `ratio 1`, `cover`) or the slot. `assets/sample.png` is the default image: a 512 × 302 "One does not simply use a lame placeholder graphic" meme, also used in Figma.
- Figma: [Coin Components Library · Category Card](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=7659-4398), node `7659:4398`: variant `State` = `Idle` (7659:4391) / `Active` (7659:5987), each 60 × 66. Layers: `Image` (instance, 36 × 36), `Label` (text, "Popular"), `Badge v2` (instance, "Label", 38 px max on Idle). Generated props (via design context): boolean `badge` (default true), text `label`. Code Connect maps both variants to `<CategoryCard><Image /></CategoryCard>` with no props.
- Storybook (published `index.json`): docs `components-categorycard--docs` (older generated page); stories `--default`, `--active`, `--long-label`, `--without-badge`, `--image-slot`, `--horizontal-rail`, `--disabled`. Meta args: label Popular, badge Label, sample image, width 60, `disableTruncation` and `singleLine` true. `layout: centered`, View padding 24 / top 32, white canvas, no modes. The rail story is a horizontal ScrollView with gap 8, `paddingTop: 12`, Popular active and selection in `useState`.
- Biscuit's handwritten `CategoryCard.mdx` (upstream, not yet the published page): use it for a horizontal rail of categories, the active tile is the current filter; peers use Tabs, combinable filters use ChipSelect. Anatomy Image, Badge, Label. Labels one or two words; badge shorter than the label and not repeating it. `active` beats the `Card Tab State` mode.

## Contract

Props (`CategoryCard.tsx:236-262`): `label` ('Popular'), `badge` (string; empty or undefined hides it), `imageSource` (URL, `{ uri }` or `require()`), `imageSlot` / `children` (any node, gets `modes`; `imageSlot` wins), `active` (boolean; when omitted, `modes['Card Tab State'] === 'Active'` decides), `width` (60), `disableTruncation` (true), `singleLine` (true), `onPress`, `disabled` (false), `modes`, `style`, `labelStyle`, `accessibilityLabel`, `accessibilityHint`, `accessibilityState`, `webAccessibilityProps`, `testID` (root only) and other Pressable props.

- Always a Pressable `role="button"`, named `accessibilityLabel ?? (badge ? "label, badge" : label)`. Pressed: opacity 0.85. Disabled: opacity 0.5, `disabled`, `aria-disabled`, `tabindex -1`, no `onPress`.
- `active` only changes the 1 px border: `#f5f5f5` → gold `#cea15a`. The white surface and the label don't change. Selection is the host's: the card keeps no state.
- Badge: absolutely placed 11 px above the card's top edge, centred, `maxWidth: 38`; a badged card also gets `marginTop: 11` so the overhang sits inside its layout box.
- Label (12/16/500, `#303338`): with the defaults (`singleLine` and `disableTruncation` true) it stays on one line and spills past both edges of the card; `singleLine={false}` wraps it to two lines and the card grows; `singleLine={false}` with `disableTruncation={false}` gives one line ending in an ellipsis (Figma's look). `disableTruncation={false}` alone changes nothing.

## Modes and tokens

The card injects `AppearanceBrand: Tertiary`, `Badge Size: Small`, `Context4: Badge`, `Radius: None` (`:38-44`) over the theme's modes; `modes` on the card override them; `Card Tab State` is then forced from `active`.

- Card tokens (`Card Tab / output`, one mode): width 60, padding 4, gap 6, radius 8, stroke 1, background `#ffffff`, image 36 × 36, label 12/16/500. Only `Card Tab State` (border) and Color Mode change the card itself.
- AppearanceBrand, Semantic Intent, AppearanceSystem, Emphasis and Badge Size reach the Badge (and anything in `imageSlot`): Tertiary blue `#026b9a` (default), Primary gold `#cea15a` with dark text, Secondary purple `#5d00b5`, Neutral `#303338`. Emphasis Medium / Low make the badge pale.
- Semantic Intent System at High emphasis: the badge reads the token `Emphasis/badge/high/fg Copy`, which doesn't exist (console: `Variable with name "Emphasis/badge/high/fg Copy" not found`), so its text falls back to black on green, orange or red. Badge bug, not shown.
- Badge Size Medium: 12 px text, but the 38 px cap cuts "Label" to "L…". Not shown.
- Radius changes only the default Image's corners (None 0, S 8, M 16, L 32). It doesn't reach an Icon Capsule.
- Context4 is forced to Badge and changes nothing visible.

## Web render

`button[data-testid][aria-label]` › (with a badge) `div` anchor › Badge `div` › text `div[dir=auto]`; then the image node (default Image `div` › `img`, or the slot's root); then the label `div[dir=auto]`. Measured in the docs build: default image 60 × 68 (66 in Figma: the web border adds 2); with an Icon Capsule in `imageSlot` (42 px at the default Context) 60 × 74; `singleLine={false}` with "Mutual funds" 60 × 90.

## Discrepancies

- Label font: the token `cardTab/label/fontFamily` is `"Jio Type Var"` (with a space) in Figma and the package; every other font token is `"JioType Var"`. The docs and Storybook load only `JioType Var`, so the label renders in the browser's serif fallback (verified in the docs build: computed `"Jio Type Var"`). Token problem, filed (see Tickets).
- Rails: a badged card's box is 11 px taller (margin) than an unbadged one. Top-aligned or stretched in a row, badged and unbadged cards don't line up: in Storybook's Horizontal Rail the unbadged cards are 79 tall and start 11 px higher. Bottom-aligned (`alignItems: 'flex-end'`), they line up. Figma keeps every card 60 × 66 with the badge outside the frame.
- Web: the active card has no `aria-selected` / `aria-pressed`; `accessibilityState.selected` reaches native only.
- `badge` is a boolean in Figma (text fixed "Label") and a string in code. `State=Idle|Active` in Figma, `active` or `Card Tab State: Default|Active` in code.
- Label overflow: Figma truncates with an ellipsis; the package spills by default.
- Label colour `#303338` in code, black in Figma.
- Published Storybook docs page is the older generated one (collection defaults Radius S, Primary, Medium; import from `@jfs/components`).

## Hosting

Storybook centres one card on a white canvas. The guide shows cards on the kit's grey stages, where the white card and its light border read, and puts a Coin `IconCapsule` (registry icons `ic_rupee_coin`, `ic_loans`, `ic_savings`, `ic_insurance`, `ic_graph_increasing`) in `imageSlot` as stand-in category art, because the default image is a placeholder meme. The capsule gets the card's modes, so it follows AppearanceBrand like the badge. Rails use a Coin `HStack` with `alignItems: 'flex-end'`.

## Tickets

- #288 (token problem, Marcin): `cardTab/label/fontFamily` spelt "Jio Type Var".
- #282 (Component Bug, Biscuit): rails misalign with mixed badges; active card not exposed on the web; meme default image.
- #283 (Component Bug, Biscuit): Badge System + High reads a missing token, so the label is black.

## Limits

- Not shown: Dark, Badge Size, Context4, Semantic Intent System (broken badge text), style props, `accessibilityState`, `webAccessibilityProps`.
- No hover or focus style of its own (browser focus ring only).
