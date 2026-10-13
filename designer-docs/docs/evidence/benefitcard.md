# BenefitCard source evidence

Package, Figma, and Storybook evidence for the Benefit Card guide (board ticket #151, Design documentation — Marcin; Storybook coverage — Biscuit, done).

## Checked

13 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-c1fa197` (Biscuit's `main` at c1fa197, 12 October). `BenefitCard.tsx` and everything it imports are identical at c1fa197 and 5990169; `BenefitCard.tsx` is also unchanged at Biscuit's newest `main` 7020bf9 (13 October, not in the mirror), which changes Nudge's Close default (#271) and rewrites `BenefitCard.mdx`.

## Sources

- Package: `src/components/BenefitCard/BenefitCard.tsx` (403 lines); exports `BenefitCard`, `BenefitCardProps`, `BenefitCardItem` (`components/index.ts:13`). Composes ListItem rows (`layout="Horizontal"`, no nav arrow or support text), Icon, Text, Divider, an inline-compact Nudge (Avatar + TextSegment), and a size-S Button.
- Figma: [Coin Components Library · BenefitCard](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=5352-1077), node `5352:1077`: one component, 344 × 221, properties `header` and `Button` (booleans) and slots `list wrap`, `list wrap2`. Header (title “You will earn”, two rows, divider), body (deprecated “Nudge Old” with a gold avatar and “Upsell message JioFinance+” at 12 px, no close; two rows), gold “Upgrade” button 92 × 32. Padding 12, radius 12, gap 8.
- Storybook (published `index.json`): docs `components-benefitcard--docs` (old generated page); stories `--default`, `--declarative-arrays`, `--legacy-api`, `--custom-header-slot`, `--custom-items-slot`, `--custom-upsell-nudge`, `--without-upsell`, `--header-hidden`, `--button-hidden`, `--pressable-card`. Host: `View { padding: 20, alignItems: 'center', backgroundColor: '#f0eee9', flex: 1 }`, width arg 344. The published Storybook builds the older Nudge (no Close).
- Biscuit's 7020bf9 `BenefitCard.mdx` (unpublished): “a list of what a plan includes, with an optional upsell and an upgrade button”; header title is a label, rows are noun phrases, the figure goes in `trailingText`, the button label is a verb; don't put a paragraph in a row title.

## Contract

`BenefitCardItem`: `icon`, `iconColor`, `leading` (wins over icon), `title` (required), `trailingText`, `trailing` (wins over trailingText), `onPress` (the row becomes a button).

Props (`:45-161`): `headerTitle` ('You will earn'; null hides it), `headerItems` (default two duplicate JioPoints rows), `header` slot (wins), `headerItem`/`bodyTitle` (deprecated), `showHeader` (true; title, rows and divider together), `bodyHeader` (default upsell Nudge; `null`/`false` removes it; a node replaces it), `items` (default two rows) or `children` (wins), `buttonLabel` ('Upgrade'), `onButtonPress`, `button` (replaces the CTA; `null` still renders the default), `showButton` (true), `onPress` (root becomes a Pressable button, opacity 0.92 while pressed, named `accessibilityLabel ?? headerTitle`), `width` (344; number or percentage), `modes`, `style`, `accessibilityLabel`. No `testID`, no rest props.

- Modes cascade: rows get `{ 'List Item Style': 'Minimal', 'Nudge padding': 'None', ...modes }`; icons `{ AppearanceBrand: 'Secondary', ...modes }`; figures `{ 'Text Sizes': 'Small', Weight: 'Regular', ...modes }`; button `{ 'Button / Size': 'S', ...modes }`; upsell `{ AppearanceBrand: 'Neutral', ... }`. A consumer AppearanceBrand overrides all three defaults at once.
- The default upsell is `<Nudge type="inline-compact">` with an image Avatar and “Upgrade to JioFinance+ and earn more” (JioFinance+ in gold). Installed Nudge shows Close by default and the card passes no `onClose`, so a Close that does nothing appears (#271, open; fixed in 7020bf9, not installed).

## Modes and tokens

Nine `benefitCard/*` literals in one-mode `Benefit Card`: background #ffffff, padding 12/12, radius 12, gap 8, title #000000 12/500 (line 20). No mode changes the card's surface or title.

Children: AppearanceBrand recolours icons (Secondary purple #5d00b5 default; Primary #ad8444, Neutral #545961, Tertiary #026b9a), the upsell (Neutral white default; Primary cream, Secondary #f6f3ff, Tertiary #ecf7ff) and the button (Primary gold #cea15a default; Secondary #5d00b5, Neutral #303338, Tertiary #036b99). Semantic Intent System (+ AppearanceSystem) turns them green, orange or red. Emphasis, Button / Size, Button / State: the button only. Text Appearance, Text Sizes, Weight: the figures and upsell text. Nudge padding Default, Border Boolean: the upsell box. Context, Context2, Context4, Icon Size, Page type JioPlus, context 10: secondary effects. Avatar Size, Badge Size, Profile Card Appearance, Slot gap: nothing. Not listed but effective: List Item Style, context5, Draggable List.

## Web render

`div` root (344 wide, padding 12, radius 12, gap 8) › header `div` (cardHeader `div` › title `div[dir=auto]`, rows `div` › ListItem `div`s; then Divider `div`) › upsell `div` (Nudge: Avatar `[role=img]`, TextSegment, `[aria-label="Close"]` 26 × 26) › body rows `div` › Button `div[role=button]`. No `data-testid` anywhere. Header: 4 px under the title, 8 px between rows (code); Figma has 8 and 4. Predicted height about 229 (Figma 221) because of the 26 px Close and 1 px nudge border.

## Discrepancies

- Close on the upsell (#271): installed build only.
- Figma's upsell is the retired “Nudge Old”, 12 px “Upsell message JioFinance+”; code's is 14 px “Upgrade to JioFinance+ and earn more”.
- Header spacing swapped (code 4/8, Figma 8/4); same 77 px header.
- Figure colour #1c1c1c in Figma, #000000 in tokens.
- 7020bf9 mdx says `button={null}` hides the CTA; code renders the default.
- `nudge/radius` is a dangling alias (falls back to 12).
- A pressable card nests its Button and Close inside a `role=button` element on the web. Confirmed on the published Pressable card story (13 October 2026: the button “You will earn” contains “View details”). Filed as #280.
- #271 confirmed in the browser here: the upsell's Close (26 × 26) has no handler, and clicking it leaves the upsell in place.

## Hosting

Storybook shows the white card on a warm grey page at 344 px. The guide renders it on the example cards' grey stage inside `FitWidth`, so the 344 px card scales down on narrow screens; In context uses `width="100%"` inside a full screen.

## Limits

- Not shown: Dark, Semantic Intent System, Emphasis, Context modes, List Item Style, the deprecated `headerItem`/`bodyTitle`, `button` and `header` slots, `iconColor`.
- The guide shows the default upsell with its Close as it ships (#271).
