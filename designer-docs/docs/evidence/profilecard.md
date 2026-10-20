# ProfileCard source evidence

Package, Figma, and Storybook evidence for the Profile Card guide (board ticket #39, Design documentation — Marcin; Storybook coverage — Biscuit, done: "Storybook page rewritten to the handwritten outline on main e60f8bd8").

## Checked

20 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-c7d3348` (Biscuit's `main` at c7d3348). `npm run coin:status` shows one newer upstream commit, e60f8bd8, which changes only `ProfileCard.mdx`. Rendered with react-native-web 0.21.2 in headless Chrome with JioType Var loaded. The published Storybook (built 17 October) is older than the installed package (its UpiHandle has no button role).

## Sources

- Package: `src/components/ProfileCard/ProfileCard.tsx` (268 lines, `React.memo`). Exports `ProfileCard`, `ProfileCardProps`, `ProfileCardUpiHandle` (`components/index.ts:343`). The header is a `ListItem` (navArrow off) whose leading slot is `Attached` (`Avatar` + an `IconCapsule` badge) and whose support slot is a wrapping row of `UpiHandle` pills; a `Divider` separates the body.
- Figma: [Coin Components Library · Profile Card](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=6914-38498), node `6914:38498`, a single component (no variants), 344 × 347. Header List Item (Attached avatar "MS" with an 18 px QR badge, name, two UPI Handle pills), Divider, and one slot (the body) holding sample List Items and Dividers. No Premium property (it's the Profile Card Appearance collection).
- Storybook (published `index.json`): `components-profilecard--default`, `--premium`, `--header-only`, `--pressable-handles`, `--with-image-avatar`, in a 16 px padded frame on the page background. Default body: two "JioFinance+" rows with "78 / 100" and Upgrade, two "Health Rating" rows. The published docs page is the older one; e60f8bd8's handwritten page isn't deployed.
- Biscuit's handwritten `ProfileCard.mdx` (e60f8bd8): "a dark identity summary: an avatar, a name, UPI handles, and a body slot." Use for "a profile header on a dark surface" with account rows in the body; not for a light product card or a settings form.

## Contract

All props optional: `name` ("Name"), `monogram` ("MS"), `avatarSource` (photo instead of the monogram), `badgeIcon` (`'ic_qr_code'`; `null` removes the badge), `upiHandles` (two sample handles; `[]` removes the row), `header` (replaces avatar, name and handles together; not wrapped in a ListItem), `children` (body), `showDivider` (true; no divider without children), `width` (344; a number or a percentage), `modes`, `style`, `accessibilityLabel`. No `testID` or `...rest`.

- `ProfileCardUpiHandle`: `label` (required), `iconName` (UpiHandle's default `ic_scan_qr_code`), `showIcon` (true), `onPress` (makes the pill a `button`, scale 0.98 while pressed). No picture on a handle.
- Name: one line with … (ListItem title). Handles wrap onto more lines, but one long label never shrinks or ends in …: its pill runs past the card (276 px in a 254 px column for a 38-character label).
- Card: not pressable; `accessibilityLabel` only. Avatar and badge are `role=img` without names.

## Modes and tokens

Merges the theme provider's modes with `modes`, then gives its children `{ ...modes, 'context 10': 'jioPlus' }` (the badge also `Icon Capsule Size: XS` unless set). Body children are cloned with those modes; a child's own `modes` win.

- Panel (`profileCard/*`): navy `#00065a`, radius 12, padding 20, gap 12, width 344.
- Profile Card Appearance Premium: gold panel `#cea15a`, darker gold avatar, pills and divider, dark text.
- Under jioPlus: ListItem titles white, Icons and NavArrows white, Divider `#191f6e`, Button gold `#cea15a` with dark label, UpiHandle navy `#021891` pills, avatar `#021891` with white initials.
- Not switched by jioPlus: `Text` (black) and ListItem support text (`#1a1c1f`) stay dark on the navy panel and nearly disappear. Figma's own sample shows the same dark "78 / 100" and "Korem ipsum".
- Also change the look: Avatar Size, Icon Capsule Size, Attached Border False (removes the white disc), Slot gap (pill gap), List Item Style (Boxed paints white boxes over the header and rows, hiding the white name). AppearanceBrand / Emphasis / Semantic Intent only recolour the badge glyph. Page type, Context, Badge Size do nothing to the card.

## Web render

Root `div` (column, 344 wide, navy, padding 20, gap 12) › header `div` (ListItem) › row › leading `div` (avatar `div[role=img]` 42 px; badge disc `div` 22 px with `div[role=img]` 18 px) + text `div` (name `div[dir=auto]` 14/17/700; handles row `div` with `button` or `div[aria-label]` pills 29 high) › `div[role=presentation]` divider › body children. No `data-testid`.

Header only: 344 × 88. With a two-row body (JioFinance+ with an S Upgrade button, Linked bank accounts with a chevron): 344 × 190.

## Discrepancies

- `Text` and ListItem support text in the body stay dark on the navy panel (code comment, published prop docs and the handwritten mdx say children "stay on-dark"). Figma's sample has the same problem.
- The handwritten mdx says the card forces jioPlus on children; a child's own `modes` win.
- Header 48 px (title line 17) vs Figma 47 (16).
- Badge glyph `#0f0d0a` on a white disc vs Figma `#24262b`; badge anchored at the 45° point (26.85) vs Figma (25, 24).
- Figma exposes only the body slot; name, handles, badge, divider and photo are overrides, and Premium is a variable mode.
- List Item Style Boxed breaks the card (white boxes, the name disappears).
- A long UPI handle label never shrinks or truncates: the pill runs past the card (UpiHandle `maxWidth: 100%` has no effect in the wrapping row).
- The handwritten mdx's Anatomy specimen has no children, so its Body part and divider don't render.
- Published Storybook is older than the package (pills without button role) and shows the older docs page.

## Hosting

Storybook shows the card at its own 344 px on the page background. The guide keeps `width` 344 and puts every card outside the Anatomy diagrams in the kit's `FitWidth`. The photo example uses the Jio Gold logo (`src/assets/jio-gold-logo.png`) for a business profile. Body rows are `ListItem`s with `showSupportText={false}` (titles, a gold Button, a chevron), except where an example shows the dark support text.

## Tickets

- #354 (Component Bug, Biscuit): dark Text and support text in the body, child modes over jioPlus, List Item Style Boxed, long handles overflowing, header height, badge glyph colour and position, mdx anatomy specimen, older published Storybook.

## Limits

Don't show Dark, Page type, Context, Badge Size, Avatar Size, Icon Capsule Size, Attached Border, Slot gap, AppearanceBrand, Emphasis or Semantic Intent; List Item Style only in its Don't. Don't recommend Page type JioPlus to whiten body text. Don't show a `header` override, or imply the card is pressable, that body text turns light, or that the badge does anything when pressed.
