# Expandable Checkbox source evidence

Package, Figma, Storybook, and browser evidence for the Expandable Checkbox guide (board ticket #10, Design documentation — Marcin; Storybook coverage — Biscuit, done).

## dbe0e02 publish (28 October 2026, #409, #357)

The docs now install mirror tag `v0.1.78-dbe0e02` (Biscuit's `main` at dbe0e02, 27 October). #409 verified 27 October on dbe0e02 (run_beaf2324); #357 verified on ace46ca and dbe0e02; both closed by Marcin; published to the docs 28 October in Penny run run_92acfa9d. Where the sections below say otherwise, this section replaces them.

- Space ticks and unticks the box with one onValueChange per press, controlled or not, open or closed; Enter does the same and Space doesn't scroll the page. The Terms link and Read more / Read less never tick it. One checkbox Tab stop per row; Tab goes box → link → Read more. The inner box is `role="presentation"`.

Guide changes: the Checkbox anatomy target is now `[role="checkbox"] > [role="presentation"]`; Sources: 28 October, 27 October build, “Enter or Space ticks or unticks the box once”.

## Check

Checked 6 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-3795b4c` (Biscuit's `main` at 3795b4c). `ExpandableCheckbox.tsx` is identical to upstream. Biscuit's `main` is now at 636f3f5: no change to this component, Checkbox, CheckboxItem, Button, Link, or ScrollArea; its token file turns the Dark label and link from black to white (Light unchanged).

- Figma: [Coin Components Library · Expandable Checkbox](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4514-5767), node `4514:5767`. A component set with one property, `State` = Idle (498 × 24) | Open (498 × 50). Idle: Checkbox Item (18 px box, Text "I agree" + Link "Terms & Conditions", gap 4) and a "Read more" Button (81 × 24) 8 px to the right. Open: the same Text + Link (gap 2) inside a scrollArea, with "Read less" (74 × 24) 8 px below, right-aligned. Label weight 400 and line height 16 in Figma; no checked, disabled, or hover variant.
- Storybook (published `index.json`): `components-expandablecheckbox--docs`, `--default`, `--expanded`, `--checked`, `--disabled`, `--controlled`, `--long-label`, `--two-line-collapse`, `--custom-button-labels` (all upstream stories).
- Upstream mdx (cf988472, hand-written): "A consent row with a checkbox and a Read more / Read less toggle. Checking the box and opening the copy are separate actions." Use it for a consent whose copy is longer than one line; use CheckboxItem for a short option, CheckboxGroup for a list, Accordion for disclosure without a checkbox. "One row is one agreement." Label = the consent phrase ("I agree"), link = the document name, toggle named Read more / Read less, not the policy.
- Package: public `ExpandableCheckbox` props `label`, `linkLabel`, `onLinkPress`, `children` (replaces label and link), `checked`/`defaultChecked`/`onValueChange`, `expanded`/`defaultExpanded`/`onExpandedChange`, `disabled`, `readMoreLabel` ("Read more"), `readLessLabel` ("Read less"), `collapsedLines` (1), `disableTruncation`, `modes`, `style`, `labelStyle`, `accessibilityLabel`. No `testID`, indeterminate, chevron, or animation. The toggle Button's size, appearance, and emphasis are forced (XS, Secondary, Low).

## Behaviour (Chrome, react-native-web 0.21.2)

- Idle: one row, 24 px tall in a 328 px host: CheckboxItem (fills) and the Read more button (84.9 × 24), 8 px apart. The label clamps to `collapsedLines` with an ellipsis; the link is outside the clamp, so a long label puts the link on a second line (38 px tall). "I agree" + "Terms & Conditions" fits one line only when the host is at least 295 px wide.
- Open: a column aligned to the end: the full label in a scroll area (capped at 450 px), then "Read less" 8 px below on the right (328 × 50 for the default copy). No animation.
- **Open clips long sentences on the web**: the label keeps its unwrapped width (a 100-character sentence is ~550 px) and the scroll area cuts it at the right edge; no wrap, no horizontal scroll. Reproduced in the published Storybook `long-label` story opened (scrollWidth 621 vs clientWidth 472). `disableTruncation` and `collapsedLines={0}` overflow the row the same way. The `children` path wraps but is not clamped when Idle.
- Pressing the label, the box, or blank row space ticks the box; the link calls `onLinkPress` only; the toggle only opens or closes. Checked fill #5c00b5.
- Disabled: row at 60% opacity (the link and button dim further, to about 24% and 30%), nothing responds, and the row cannot be opened.
- Toggle labels: a long `readMoreLabel` squeezes the checkbox item (a 236 px button leaves the item 84 px and stacks label and link).
- Accessibility (web): two nested `role=checkbox` elements, both tab stops; no `aria-checked` (a ticked box reports unchecked); no `aria-expanded` on the toggle; Enter ticks, Space does not. The Terms link (`linkLabel`) is a tab stop but Enter and Space throw a TypeError (`event.stopPropagation` on `undefined`, `ExpandableCheckbox.tsx` L176) and never call `onLinkPress`. A link passed in `children` works.
- Modes: Color Mode, Text Appearance, Text Sizes, and Weight reach the label and link. Dark in 0.1.78 renders the label and link black (fixed at 636f3f5).
- Figma vs package: label weight 400 vs 500 (default Weight mode); line height 16 vs 17; toggle 81 vs 84.9 px; the Figma link fills the row, the package link hugs its text.

## Classification

- Designer-configurable: label, link label, checked, Idle or Open, disabled, `collapsedLines`, toggle labels.
- System-driven: the clamp and ellipsis, the toggle position (beside when Idle, below when Open), the 450 px scroll cap, the forced toggle style.
- Developer-only: `children`, `style`, `labelStyle`, `accessibilityLabel`, `disableTruncation`, controlled wiring.
- Not shown: Dark mode, `children`, `disableTruncation`, Text Appearance/Sizes/Weight modes.

## Coin gaps

- #200 (Component Fix, Done, published 13 October 2026 with c1fa197): open label clipped on the web; `disableTruncation`/`collapsedLines={0}` overflow; Terms link cannot be opened by keyboard (TypeError); no `aria-checked`/`aria-expanded`, two checkbox tab stops, Space does not tick; disabled rows cannot be opened to read the copy; default label weight 500 vs Figma 400.

## c1fa197 publish (13 October 2026)

Checked 13 October 2026 against `jfs-components` 0.1.78 built from Biscuit's `main` at c1fa197 (mirror tag `v0.1.78-c1fa197`, installed since the 13 October release) in headless Chrome with react-native-web 0.21.2, on the guide pages at 1280 and 390 px. The newer mirror build `v0.1.78-5990169` changes only `Tooltip.tsx` (#277, not approved), so it was not installed.

- #200 fixed (verified 12 October, published here). Open text wraps inside the row: the long KYC consent in a 318 px row is three lines (292 × 51), with Read less (78.1 × 24) 8 px below on the right. `disableTruncation` wraps when Idle.
- One checkbox is exposed: the row is `role="checkbox"` with `tabindex="0"` and `aria-checked`; the inner box is `aria-hidden` with `tabindex="-1"`. Enter and Space each tick it once. Read more / Read less has `aria-expanded`.
- Enter on the Terms link calls `onLinkPress` once, with no TypeError, and doesn't tick the box.
- Disabled: the row has `aria-disabled` and `tabindex="-1"` and can't be ticked, but Read more stays enabled and opens the text.
- Label weight is 400, as in Figma. Still different from Figma: line height 17 (16) and Read more 84.9 px (81). Plain Checkbox and CheckboxItem are unchanged.
- With the lighter label, “I agree” (43 px) + “Terms & Conditions” (127.1 px) fit one line when the row is at least about 293 px, so the “about 295 px” Narrow rows caption still holds; a 280 px row is 38 px tall.
- Guide: the States description, the Disabled card, the playground note, and the Sources note now say Open text wraps, a disabled row can still be opened, the label is regular weight, and the box, toggle, and Terms link work from the keyboard. The brief matches.
