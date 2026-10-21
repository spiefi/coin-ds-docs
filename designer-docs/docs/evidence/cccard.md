# CcCard source evidence

Package, Figma, and Storybook evidence for the CC Card guide (board ticket #78, Design documentation — Marcin; Storybook coverage — Biscuit, done: "Storybook page rewritten to the handwritten outline on main e60f8bd8").

## Checked

21 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-c7d3348` (Biscuit's `main` at c7d3348). `npm run coin:status` shows one newer upstream commit, e60f8bd8, which changes only Storybook MDX pages (`CcCard.mdx` among them). The published Storybook (built 17 October; only Badge changed since, for System badges) was measured in headless Chrome with JioType Var loaded.

## Sources

- Package: `src/components/CcCard/CcCard.tsx` (599 lines). Exports `CcCard`, `CcCardProps`, `CcCardBadge`, `CcCardListItem` (`components/index.ts:48`). Renders Coin `Badge`, `Image`, `Title`, `ListItem`, `Icon`, `Avatar`, `TextSegment`, `Button`; it builds its own list and nudge rows (the package's `ListGroup` and `Nudge` aren't used).
- Figma: [Coin Components Library · CC CARD](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=5434-1992), node `5434:1992`, two variants: `Compact=False` (343 × 242) and `Compact=True` (343 × 108); properties `Compact`, `Type` (Default only). Full: Small badges (16 tall; right badge solid purple with a card icon), Image 88 × 54 + Title, three ListItems with purple icons (gap 4), a Nudge (avatar + "Upsell message JioFinance+", 12 px), footer (headline, fee, subtitle) + purple Button. Compact: a 42 px Avatar over the footer.
- Storybook (published `index.json`): `components-cccard--default`, `--compact`, `--avatar-slot`, `--header-hidden`, `--nudge-hidden`, `--button-hidden`, `--pressable-card`. Host: dark warm grey `#33312e`, padding 20; image from Unsplash; trailing badge colours as hex args. Storybook injects `onPress`, so every card is a button with Apply nested inside. Published docs page is the older generated one.
- Biscuit's handwritten `CcCard.mdx` (e60f8bd8): "a credit-card product: badges, a media row, benefit lines, an upsell, and a fee with one action. `compact` keeps only the media and the fee." Use for one card product (who it's for, what it includes, the fee) or, with `compact`, a dense list of the same product; not for a card face (DebitCard), a product page with metric columns (PdpCcCard), or a plan matrix (PlanComparisonCard). Do "One product, one fee, one action"; Don't "A button inside a button". Content: title the product, subtitle the kind of card, one fact per benefit, headline the fee label, description the amount, footerSubtitle the billing note, button a verb.

## Contract

All props optional; closed list (no `testID`, no `...rest`).

- Header: `badges` (left; sample two Tertiary badges with a hard-coded white label) and `trailingBadges` (right): `{ label, modes?, color?, labelColor? }`; each Badge gets `{ ...cardModes, ...badge.modes }`. Labels don't truncate. No icon field. `showHeader={false}` hides them; `header` replaces the row (and ignores `showHeader`).
- Media row: `imageSource` (none ships: an empty box stays) in `imageWidth × imageHeight` (88 × 54), radius 8; `media` replaces it in both variants. Beside it a Coin `Title` (`context7: Card`: title 14/16 bold on one line with an ellipsis; subtitle 12/16, wraps). `title`/`subtitle` default to "Title"/"Subtitle" and can't be hidden.
- `items: { icon?, iconColor?, leading?, title, onPress? }[]` (three samples): one `ListItem` (Minimal, horizontal, no arrow) per item, 12 px, gap 12; `icon: null` hides the glyph; `onPress` makes the row a button. `items={[]}` removes the list.
- Nudge: an Avatar (XS, 14 px; `nudgeAvatarSource`, else the Avatar's built-in portrait) + `TextSegment` from `nudgeSegments` (sample "Upsell message " + "JioFinance+" in Text Appearance Primary gold), 14 px. `showNudge={false}` hides it; `nudge` replaces it (and ignores `showNudge`).
- Footer: `headline` (10 px grey), `description` (14 px bold) + `footerSubtitle` (10 px grey); defaults "Headline", "Description", "Subtitle" (undefined brings them back); `footer` replaces the block. Button: `buttonLabel` ('Button'), `onButtonPress`, `button` override, `showButton` (removing it doesn't change the height). CTA modes `{ AppearanceBrand: 'Secondary', 'Button / Size': 'S', ...modes }`: solid purple, size S.
- `compact` shows only the media and the footer text (no badges, title, subtitle, list, nudge or button), media stacked over the fee.
- `onPress` makes the card a `Pressable` (name `accessibilityLabel ?? title`, opacity 0.92); with Apply that nests a button in a button. No `disabled`.
- `width` (343; number or percentage), `style`, `modes`. Panel: white, radius 12, 1 px border, padding 12, gap 8, `overflow: hidden`.

## Modes and tokens

Card tokens (`ccCard/*`): white, radius 12, padding 12, gap 8, fee text 10/13, 14/15 (rendered 17), 10/13. Only the border colour varies: white by default (invisible), `#ebebed` with Page type SubPage (or context 8 Section). List group gap 12 (Figma 4).

- AppearanceBrand: benefit icons (default Primary gold `#ad8444`; Secondary purple `#5d00b5`, Figma's), the Button (Secondary purple by default; Primary gold, Neutral grey, Tertiary blue), and badges without their own AppearanceBrand.
- Emphasis: badges and the Button (Medium light purple). Badge Size Small: 16 px badges (Figma's). Button / Size: the Button. Page type SubPage: grey border. Semantic Intent System: green badges and button (not a card-offer choice).
- Context, Context4, Icon Size, Avatar Size, context7, context 10, Text Appearance/Sizes/Weight, List Item Style change inner children; not designer choices on this card. AppearanceSystem alone, ListItem State, NavArrow Direction, Profile Card Appearance, Selectable: no effect.

## Web render

Root `div` (pressable: `button`) › header `div` (two badge groups) · media row `div` (image box `div`, title wrap `div` › `h1`) · list `div` › rows (icon `div`, text `div`) · nudge `div` (`div[role=img]` avatar, text `div` › `span`s) · footer `div` (text block `div`, Apply `button`). Compact: media `div`, footer `div`. No `data-testid`.

- 343 × 264 (Figma 242): header 23 vs 16 (Medium badges), list 78 vs 62 (gap 12 vs 4), nudge 17 vs 20, footer 34 vs 32. Badge Size Small: 257. No header 233; no nudge 239; no button 264. Compact 122 with the 88 × 54 image (Figma 108 with a 42 px Avatar; 110 with one in code).
- Long title: one line with an ellipsis; subtitle, headline and fee wrap.

## Discrepancies

- Height 264 vs 242 (badge size, list gap, nudge, line heights).
- Benefit icons gold vs Figma purple; the nudge is the card's own row (14 px, 17 tall) vs Figma's Nudge (12 px, 20 tall); Figma's trailing badge has an icon `CcCardBadge` can't add; the sample badges hard-code a white label.
- Compact defaults to the 88 × 54 image (Figma: a 42 px Avatar); JSDoc says both "an Avatar by default" and "an Image"; compact drops the title and subtitle too.
- Border invisible (white) unless Page type SubPage; Figma image radius 0 vs 8.
- `showHeader`/`showNudge` don't hide a custom `header`/`nudge`; footer text can't be partly hidden (placeholders come back); no default image; Avatar's built-in portrait in the nudge.
- Published stories render a pressable card with a nested button; older docs page.

## Hosting

Storybook hosts the card on dark grey; the white card also reads on the kit's light stage, where it will sit on a real page. Each card (343 px, Figma's width) is in `FitWidth`. Pictures: the docs' `src/assets/bank-hero.png` as the offer photo and `src/assets/jio-gold-logo.png` for the nudge avatar and the compact Avatar. Badges use modes only (no hex): leading Tertiary, trailing Secondary.

## Tickets

- #364 (Component Bug, Biscuit): height vs Figma, icon colour, nudge, compact default media, invisible border, `showHeader`/`showNudge` with custom nodes, placeholder text, hard-coded badge label colour, pressable Storybook stories.

## Limits

Don't show or mention Color Mode or dark mode. Don't show Semantic Intent, Context modes, hex badge colours, or a pressable card that keeps its button. Don't imply compact keeps the title, that removing the button shortens the card, that the border shows by default, or that footer lines can be hidden one by one.
