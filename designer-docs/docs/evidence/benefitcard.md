# BenefitCard source evidence

Package, Figma, and Storybook evidence for the Benefit Card guide (board ticket #151, Design documentation — Marcin; Storybook coverage — Biscuit, done).

## Checked

13 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-c1fa197` (Biscuit's `main` at c1fa197, 12 October). `BenefitCard.tsx` and everything it imports are identical at c1fa197 and 5990169; `BenefitCard.tsx` is also unchanged at Biscuit's newest `main` 7020bf9 (13 October, not in the mirror), which changes Nudge's Close default (#271) and rewrites `BenefitCard.mdx`.

17 October 2026 (publishing #271 and #280): the docs now install mirror tag `v0.1.78-a116616` (Biscuit's `main` at a116616, 16 October). `BenefitCard.tsx` changed in 7b7c79f (#280) and `Nudge.tsx` in 7020bf9 (#271). Measured on the guide's anatomy specimen in headless Chrome: 344 × 223, one button (Upgrade), no `[aria-label="Close"]`. Re-test on #280: with `onPress`, the button "You will earn" wraps only the header; "View details", the upsell and its buttons are siblings, and no button contains another. Tab goes You will earn → View details.

## Sources

- Package: `src/components/BenefitCard/BenefitCard.tsx` (403 lines); exports `BenefitCard`, `BenefitCardProps`, `BenefitCardItem` (`components/index.ts:13`). Composes ListItem rows (`layout="Horizontal"`, no nav arrow or support text), Icon, Text, Divider, an inline-compact Nudge (Avatar + TextSegment), and a size-S Button.
- Figma: [Coin Components Library · BenefitCard](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=5352-1077), node `5352:1077`: one component, 344 × 221, properties `header` and `Button` (booleans) and slots `list wrap`, `list wrap2`. Header (title “You will earn”, two rows, divider), body (deprecated “Nudge Old” with a gold avatar and “Upsell message JioFinance+” at 12 px, no close; two rows), gold “Upgrade” button 92 × 32. Padding 12, radius 12, gap 8.
- Storybook (published `index.json`): docs `components-benefitcard--docs` (old generated page); stories `--default`, `--declarative-arrays`, `--legacy-api`, `--custom-header-slot`, `--custom-items-slot`, `--custom-upsell-nudge`, `--without-upsell`, `--header-hidden`, `--button-hidden`, `--pressable-card`. Host: `View { padding: 20, alignItems: 'center', backgroundColor: '#f0eee9', flex: 1 }`, width arg 344. The published Storybook builds the older Nudge (no Close).
- Biscuit's 7020bf9 `BenefitCard.mdx` (unpublished): “a list of what a plan includes, with an optional upsell and an upgrade button”; header title is a label, rows are noun phrases, the figure goes in `trailingText`, the button label is a verb; don't put a paragraph in a row title.

## Contract

`BenefitCardItem`: `icon`, `iconColor`, `leading` (wins over icon), `title` (required), `trailingText`, `trailing` (wins over trailingText), `onPress` (the row becomes a button).

Props (`:45-161`): `headerTitle` ('You will earn'; null hides it), `headerItems` (default two duplicate JioPoints rows), `header` slot (wins), `headerItem`/`bodyTitle` (deprecated), `showHeader` (true; title, rows and divider together), `bodyHeader` (default upsell Nudge; `null`/`false` removes it; a node replaces it), `items` (default two rows) or `children` (wins), `buttonLabel` ('Upgrade'), `onButtonPress`, `button` (replaces the CTA; `null` still renders the default), `showButton` (true), `onPress` (since a116616: the header becomes a Pressable button named `accessibilityLabel ?? headerTitle ?? bodyTitle`, and the lists a pointer-only press region with no role or Tab stop; each dims to opacity 0.92 while pressed; with `showHeader={false}` the lists are the button. The upsell and the CTA are siblings, not children, BenefitCard.tsx:283-319), `width` (344; number or percentage), `modes`, `style`, `accessibilityLabel`. No `testID`, no rest props.

- Modes cascade: rows get `{ 'List Item Style': 'Minimal', 'Nudge padding': 'None', ...modes }`; icons `{ AppearanceBrand: 'Secondary', ...modes }`; figures `{ 'Text Sizes': 'Small', Weight: 'Regular', ...modes }`; button `{ 'Button / Size': 'S', ...modes }`; upsell `{ AppearanceBrand: 'Neutral', ... }`. A consumer AppearanceBrand overrides all three defaults at once.
- The default upsell is `<Nudge type="inline-compact">` with an image Avatar and “Upgrade to JioFinance+ and earn more” (JioFinance+ in gold). The card passes no `onClose`; since a116616 the Nudge shows Close only with `onClose` or `showClose`, so the upsell has no Close (#271, fixed; c1fa197 showed a Close that did nothing).

## Modes and tokens

Nine `benefitCard/*` literals in one-mode `Benefit Card`: background #ffffff, padding 12/12, radius 12, gap 8, title #000000 12/500 (line 20). No mode changes the card's surface or title.

Children: AppearanceBrand recolours icons (Secondary purple #5d00b5 default; Primary #ad8444, Neutral #545961, Tertiary #026b9a), the upsell (Neutral white default; Primary cream, Secondary #f6f3ff, Tertiary #ecf7ff) and the button (Primary gold #cea15a default; Secondary #5d00b5, Neutral #303338, Tertiary #036b99). Semantic Intent System (+ AppearanceSystem) turns them green, orange or red. Emphasis, Button / Size, Button / State: the button only. Text Appearance, Text Sizes, Weight: the figures and upsell text. Nudge padding Default, Border Boolean: the upsell box. Context, Context2, Context4, Icon Size, Page type JioPlus, context 10: secondary effects. Avatar Size, Badge Size, Profile Card Appearance, Slot gap: nothing. Not listed but effective: List Item Style, context5, Draggable List.

## Web render

`div` root (344 wide, padding 12, radius 12, gap 8) › header `div` (cardHeader `div` › title `div[dir=auto]`, rows `div` › ListItem `div`s; then Divider `div`) › upsell `div` (Nudge: Avatar `[role=img]`, TextSegment; no Close since a116616) › body rows `div` › Button `div[role=button]`. No `data-testid` anywhere. Header: 4 px under the title, 8 px between rows (code); Figma has 8 and 4. Measured height 223 on a116616 (Figma 221); c1fa197 was predicted at about 229 with the 26 px Close.

## Discrepancies

- Close on the upsell (#271): c1fa197 only; gone since a116616.
- Figma's upsell is the retired “Nudge Old”, 12 px “Upsell message JioFinance+”; code's is 14 px “Upgrade to JioFinance+ and earn more”.
- Header spacing swapped (code 4/8, Figma 8/4); same 77 px header.
- Figure colour #1c1c1c in Figma, #000000 in tokens.
- 7020bf9 mdx says `button={null}` hides the CTA; code renders the default.
- `nudge/radius` is a dangling alias (falls back to 12).
- A pressable card nests its Button and Close inside a `role=button` element on the web. Confirmed on the published Pressable card story (13 October 2026: the button “You will earn” contains “View details”). Filed as #280; fixed in 7b7c79f and published with a116616 (the header is the button, its upsell and CTA are siblings).
- #271 confirmed in the browser on c1fa197: the upsell's Close (26 × 26) had no handler. Fixed in a116616: no Close.

## Hosting

Storybook shows the white card on a warm grey page at 344 px. The guide renders it on the example cards' grey stage inside `FitWidth`, so the 344 px card scales down on narrow screens; In context uses `width="100%"` inside a full screen.

## Limits

- Not shown: Dark, Semantic Intent System, Emphasis, Context modes, List Item Style, the deprecated `headerItem`/`bodyTitle`, `button` and `header` slots, `iconColor`.
- The guide shows the default upsell as it ships: no Close since the #271 fix. It shows no pressable card (States describes `onPress`).
