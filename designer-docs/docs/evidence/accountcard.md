# AccountCard source evidence

Package, Figma, and Storybook evidence for the Account Card guide (board ticket #19, Design documentation — Marcin; Storybook coverage — Biscuit, done).

## Checked

13 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-c1fa197` (Biscuit's `main` at c1fa197, 12 October). `AccountCard.tsx` is identical at c1fa197, 5990169 and Biscuit's newest `main` 7020bf9 (13 October, not in the mirror), which only rewrites `AccountCard.mdx` and adds a docs control exclude to the stories.

## Sources

- Package: `src/components/AccountCard/AccountCard.tsx` (385 lines, `React.memo`); exports `AccountCard`, `AccountCardProps`, `AccountCardState` (`components/index.ts:1`). Imports only `Icon` (the plus) and React Native `Image`, `Text`, `View`, `Pressable`. `CarouselCardAccounts` (125 px items, 8 px gap) is the row it's meant for.
- Figma: [Coin Components Library · Account Card](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4271-3515), node `4271:3515`: component set, `State` = Connected (125 × 122: rounded navy card image, title, subtitle) | Add (125 × 106: #ede8ff field, 8 px radius, 18 px purple `ic_add`, title). Text properties `Title` (“Personal account”), `Subtitle` (“**** 5651”). Gap 8, text gap 0.
- Storybook (published `index.json`): docs `components-accountcard--docs` (old generated page); stories `--default`, `--connected`, `--add`, `--pair`, `--from-url`, `--pressable`, `--disabled`. Each story sits in a 125 px `View`; the host is `View { padding: 16, backgroundColor: '#f0f0f3' }`. Art: the package's Jio dot strip (DebitCard's internal PNG), or an Unsplash photo in From URL.
- Biscuit's 7020bf9 `AccountCard.mdx` (unpublished): “a compact account tile”; `connected` shows art, a name and a masked number; `add` links another account; title is the account name, subtitle the mask in the bank's format; the add tile's title is the action, “Add account”; don't show the full number.

## Contract

Props (`:37-98, 144-159`): `state` ('connected' | 'add', default connected), `title` ('Personal account'), `subtitle` ('**** 5651'; connected only; `''`/null hides it), `imageSource` (image or URL; connected only; none leaves an empty box), `imageRatio` (125/82), `cardSlot` (replaces the art or the add field in either state; gets `modes`), `addIcon` ('ic_add'), `onPress` (root becomes a Pressable button; 0.7 opacity while pressed), `disabled` (0.5 opacity in both branches; with onPress also not pressable, `aria-disabled`), `modes`, `style`, `accessibilityLabel` (defaults to `title`), `accessibilityHint` (dropped on the web), `disableTruncation` (title and subtitle wrap). No `testID`, children, or rest props.

- Root: `width: '100%'`, column, gap 8, no background, padding, border or radius. Art box: width 100%, `aspectRatio: imageRatio`, overflow hidden, no radius. Add field: #ede8ff, radius 8, centred plus.
- Ignores `JFSThemeProvider`; modes come only from the `modes` prop.

## Modes and tokens

16 tokens: 14 `accountCard/*` literals in one-mode `AccountCard / Output` (gap 8, text gap 0, title #0d0d0f 12/16/700, subtitle #24262b 12/16/400, add field radius 8 and #ede8ff) plus `iconButton/icon/color` and `/size` for the plus. The plus starts from `{ AppearanceBrand: 'Secondary', Emphasis: 'Low', 'Button / Size': 'M' }` (#5d00b5, 18 px; 8.25:1 on the field) and caller modes override it. Only the plus changes: AppearanceBrand (Primary #ad8444, Neutral #24262b, Tertiary #036b99), Emphasis High (white, 1.19:1 on the field), Button / State, Button / Size (S/XS 16), Context2, Page type (Neutral Low only), Color Mode. Text, field and art never change with modes.

## Web render

Without onPress: `div[aria-label="<title>"]` (no role) › art `div` (RNW Image: background-image + hidden `img`) or add field `div` › 18 px `svg`; then text `div` › title `div[dir=auto]`, subtitle `div[dir=auto]` (one line, ellipsis). With onPress: `button[aria-label]`. `accessibilityElementsHidden` isn't mapped on the web, so the art `img` (alt="") and the plus `svg` aren't `aria-hidden`.

## Discrepancies

- Figma's connected art has rounded corners (about 4–5 px, unbound); code doesn't round the art.
- 7020bf9 mdx says the art and type follow the seven mode collections; only the plus does. It says disabled only matters with onPress; code dims without it too. It uses “•• 4242” masks; code, stories and Figma use “**** 5651”.
- Add tile title: “Personal account” in code and Figma; the mdx says “Add account”.
- The package ships no card art like Figma's; Storybook uses DebitCard's internal Jio strip, which can't be copied into this public repository.

## Hosting

Storybook places each tile in a 125 px column on a light grey page. The guide does the same with a 125 px VStack on the grey stages. The connected art is the docs' own `src/assets/bank-hero.png` (a photo), like Storybook's From URL story.

## Limits

- Not shown: Dark, Button / State, Context2, Page type, `cardSlot` and `addIcon` demos (named only), `accessibilityHint`.
- No selected state; the tile doesn't navigate on its own.
