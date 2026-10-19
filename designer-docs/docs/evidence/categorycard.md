# CategoryCard source evidence

Package, Figma, and Storybook evidence for the Category Card guide (board ticket #116, Design documentation — Marcin; Storybook coverage — Biscuit, done: "Rewrote CategoryCard to the handwritten outline. On GitHub main 7b7c79f0").

## Checked

19 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-c7d3348` (Biscuit's `main` at c7d3348, 19 October), which fixes #282 (rails, web selected state, default image) and #283 (System badge label). Both fixes were re-tested in headless Chrome (react-native-web 0.21.2) at 1280 and 390 px on 19 October (Penny run run_43afbe70).

First checked 17 October 2026 against mirror tag `v0.1.78-a116616` (Biscuit's `main` at a116616) in the docs' own Vite + react-native-web 0.21.2 build.

## Sources

- Package: `src/components/CategoryCard/CategoryCard.tsx` (422 lines, `React.memo`); export `CategoryCard`, `CategoryCardProps` (`components/index.ts:49`). Renders `Badge` (gets the card's merged modes) and `Image` (36 × 36, `ratio 1`, `cover`) when `imageSource` is set, or the slot. Without either it draws a neutral 36 × 36 tile (hard-coded `#f3f1ec`, not a token; corners follow the image radius), hidden from screen readers. Before #282 the default was `assets/sample.png`, a "One does not simply use a lame placeholder graphic" meme, which Figma still uses.
- Figma: [Coin Components Library · Category Card](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=7659-4398), node `7659:4398`: variant `State` = `Idle` (7659:4391) / `Active` (7659:5987), each 60 × 66. Layers: `Image` (instance, 36 × 36), `Label` (text, "Popular"), `Badge v2` (instance, "Label", 38 px max on Idle). Generated props (via design context): boolean `badge` (default true), text `label`. Code Connect maps both variants to `<CategoryCard><Image /></CategoryCard>` with no props.
- Storybook (published `index.json`): docs `components-categorycard--docs` (older generated page); stories `--default`, `--active`, `--long-label`, `--without-badge`, `--image-slot`, `--horizontal-rail`, `--disabled`. Meta args: label Popular, badge Label, sample image, width 60, `disableTruncation` and `singleLine` true. `layout: centered`, View padding 24 / top 32, white canvas, no modes. The rail story is a horizontal ScrollView with gap 8, `paddingTop: 12`, Popular active and selection in `useState`.
- Biscuit's handwritten `CategoryCard.mdx` (upstream, not yet the published page): use it for a horizontal rail of categories, the active tile is the current filter; peers use Tabs, combinable filters use ChipSelect. Anatomy Image, Badge, Label. Labels one or two words; badge shorter than the label and not repeating it. `active` beats the `Card Tab State` mode.

## Contract

Props (`CategoryCard.tsx:236-262`): `label` ('Popular'), `badge` (string; empty or undefined hides it), `imageSource` (URL, `{ uri }` or `require()`), `imageSlot` / `children` (any node, gets `modes`; `imageSlot` wins), `active` (boolean; when omitted, `modes['Card Tab State'] === 'Active'` decides), `width` (60), `disableTruncation` (true), `singleLine` (true), `onPress`, `disabled` (false), `modes`, `style`, `labelStyle`, `accessibilityLabel`, `accessibilityHint`, `accessibilityState`, `webAccessibilityProps`, `testID` (root only) and other Pressable props.

- Always a Pressable `role="button"`, named `accessibilityLabel ?? (badge ? "label, badge" : label)`. On the web it also gets `aria-pressed` from `active` (since #282). Pressed: opacity 0.85. Disabled: opacity 0.5, `disabled`, `aria-disabled`, `tabindex -1`, no `onPress`.
- `active` only changes the 1 px border: `#f5f5f5` → gold `#cea15a`. The white surface and the label don't change. Selection is the host's: the card keeps no state.
- Badge: absolutely placed 11 px above the card's top edge, centred, `maxWidth: 38`. Every card gets `marginTop: 11`, badge or not (since #282), so the overhang sits inside its layout box and mixed rails line up. A lone card without a badge has 11 px of empty space above it.
- Label (12/16/500, `#303338`): with the defaults (`singleLine` and `disableTruncation` true) it stays on one line and spills past both edges of the card; `singleLine={false}` wraps it to two lines and the card grows; `singleLine={false}` with `disableTruncation={false}` gives one line ending in an ellipsis (Figma's look). `disableTruncation={false}` alone changes nothing.

## Modes and tokens

The card injects `AppearanceBrand: Tertiary`, `Badge Size: Small`, `Context4: Badge`, `Radius: None` (`:38-44`) over the theme's modes; `modes` on the card override them; `Card Tab State` is then forced from `active`.

- Card tokens (`Card Tab / output`, one mode): width 60, padding 4, gap 6, radius 8, stroke 1, background `#ffffff`, image 36 × 36, label 12/16/500. Only `Card Tab State` (border) and Color Mode change the card itself.
- AppearanceBrand, Semantic Intent, AppearanceSystem, Emphasis and Badge Size reach the Badge (and anything in `imageSlot`): Tertiary blue `#026b9a` (default), Primary gold `#cea15a` with dark text, Secondary purple `#5d00b5`, Neutral `#303338`. Emphasis Medium / Low make the badge pale.
- Semantic Intent System at High emphasis: since #283 the badge label reads `Emphasis/badge/high/fg` and is white on green, orange or red, with no console warning. Before, it read the missing `Emphasis/badge/high/fg Copy` and fell back to black. Not shown in this guide.
- Badge Size Medium: 12 px text, but the 38 px cap cuts "Label" to "L…". Not shown.
- Radius changes only the default Image's corners (None 0, S 8, M 16, L 32). It doesn't reach an Icon Capsule.
- Context4 is forced to Badge and changes nothing visible.

## Web render

`button[data-testid][aria-label]` › (with a badge) `div` anchor › Badge `div` › text `div[dir=auto]`; then the image node (default Image `div` › `img`, or the slot's root); then the label `div[dir=auto]`. Measured in the docs build: default image 60 × 68 (66 in Figma: the web border adds 2); with an Icon Capsule in `imageSlot` (42 px at the default Context) 60 × 74; `singleLine={false}` with "Mutual funds" 60 × 90.

## Discrepancies

- Label font: the token `cardTab/label/fontFamily` is `"Jio Type Var"` (with a space) in Figma and the package; every other font token is `"JioType Var"`. The docs and Storybook load only `JioType Var`, so the label renders in the browser's serif fallback (verified in the docs build: computed `"Jio Type Var"`). Token problem, filed (see Tickets).
- Rails (fixed by #282): every card reserves the 11 px badge room, so in a row of badged and unbadged cards all tiles start at the same top and are 68 px tall with `alignItems` flex-start, stretch and flex-end, and in a horizontal ScrollView like the Horizontal Rail story. Figma keeps every card 60 × 66 with the badge outside the frame. Before, a badged card's box was 11 px taller and only `flex-end` lined them up.
- Web (fixed by #282): the active card has `aria-pressed="true"`, the others `"false"`, and it follows a press. `accessibilityState.selected` still reaches native only.
- `badge` is a boolean in Figma (text fixed "Label") and a string in code. `State=Idle|Active` in Figma, `active` or `Card Tab State: Default|Active` in code.
- Label overflow: Figma truncates with an ellipsis; the package spills by default.
- Label colour `#303338` in code, black in Figma.
- Published Storybook docs page is the older generated one (collection defaults Radius S, Primary, Medium; import from `@jfs/components`).

## Hosting

Storybook centres one card on a white canvas. The guide shows cards on the kit's grey stages, where the white card and its light border read, and puts a Coin `IconCapsule` (registry icons `ic_rupee_coin`, `ic_loans`, `ic_savings`, `ic_insurance`, `ic_graph_increasing`) in `imageSlot` as stand-in category art, because without an image the card is a plain light square. The capsule gets the card's modes, so it follows AppearanceBrand like the badge. Rails use a plain Coin `HStack` (since #282 they line up at any alignment). The Do & Don'ts' third pair, which compared bottom- and top-aligned rails, now compares one active card with two.

## Tickets

- #288 (token problem, Marcin): `cardTab/label/fontFamily` spelt "Jio Type Var".
- #282 (Component Bug, Biscuit): rails misalign with mixed badges; active card not exposed on the web; meme default image. Fixed on Biscuit's main c7d3348, verified 19 October, published to the docs 19 October.
- #283 (Component Bug, Biscuit): Badge System + High read a missing token, so the label was black. Fixed on c7d3348, verified 19 October, published to the docs 19 October.

## Limits

- Not shown: Dark, Badge Size, Context4, Semantic Intent System, style props, `accessibilityState`, `webAccessibilityProps`.
- No hover or focus style of its own (browser focus ring only).
