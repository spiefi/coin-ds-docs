# PageHero source evidence

Package, Figma, and Storybook evidence for the Page Hero guide (board ticket #159, Design documentation — Marcin; Storybook coverage — Biscuit, done: "Storybook page rewritten to the handwritten outline on main 475ae733").

## Checked

26 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-c8526ae` (Biscuit's `main` at c8526ae); `npm run coin:status` reports the mirror up to date with upstream. Rendered the installed package in the docs site's Vite setup (react-native-web 0.21.2) in headless Chrome.

## Sources

- Package: `src/components/PageHero/PageHero.tsx` (306 lines). Exports `PageHero`, `PageHeroProps` (`components/index.ts:306`). Renders plain texts, an optional media box, and a `Button` (`style={{ width: '100%' }}`, the hero's modes).
- Figma: [Coin Components Library · Page Hero](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4453-2348), node `4453:2348`, one component, 328 × 424, fixed width, no fill, no padding, gap 16. Text properties `Eybrow` (sic), `Headline`, `Supporting text`, `Body`; booleans `eyebrow`, `supportingText`, `body`, `media`, `Button`. A 117 px Video instance, eyebrow 18/20 Bold, headline 29/29 Black (3 lines), two 12/16 Medium lines, all `#3d4047`, then a Button group of two stacked full-width Buttons (High, then Medium), gap 12. Instance `7902:740` sets `PageHero Size = S` and its buttons to `Button / Size = S` by hand; the JioFinance+ screen `6138:1876` sets `Page type = JioPlus` (white text on a dark gold backdrop).
- Storybook (published `index.json`): 16 stories, from `components-pagehero--default` to `--long-headline` (ids in the brief). Host: `#f5f4f2`, padding 24, the hero in a 328 px box. Meta args set `body` to the supporting line, so Default shows the price twice.
- Biscuit's handwritten `PageHero.mdx`: "the top of a feature page: optional media, an eyebrow, a headline, a supporting line, a body line, and one action. Media is whatever you pass. The library does not play video or Lottie itself." For one offer; not a title with search (HeroSection) or a portfolio total (PortfolioHero). Content: "Eyebrow is a short category. Headline is the offer. Supporting text is the price or the term. Body is a second fact, not a repeat of the price. The button is a verb." Don't: "The same sentence twice". "There is no card press. Only the button acts."

## Contract

- `eyebrow` ('Upgrade to JioFinance+') / `showEyebrow`: 18 px Bold on a 22 px line. `headline` ('Resume earning cashback, extra points, and 1% gold'): 29 px Black on 35 px lines, wraps, centred; `''` hides it. Eyebrow-to-headline gap 8.
- `supportingText` ('₹999/year · ₹0 until 2027') / `showSupportingText`; `body` (no default) / `showBody`: 12/16 Medium. All text `#3d4047`, centred, wraps.
- `buttonLabel` ('Renew for free'), `onButtonPress`, `showButton`: one full-width Button (one line; a long label truncates). `buttonSlot` replaces it (cascaded modes; ignores the three).
- `media`: any element in a centred `video/width × video/height` box with `overflow: hidden` (Video / Output L 117, M 70, S 20); the element keeps its own size and is clipped. `media={false}` still draws the empty box.
- `modes`: `PageHero Size` S → gap 12, eyebrow 12 px, headline 18/22 (the Button stays M); `Video / Output` → media box; `Page type` JioPlus → white text (MainPage = SubPage); `AppearanceBrand`, `Emphasis`, `Semantic Intent`, `Button / Size`, `Button / State`, `Context` reach only the default Button.
- Root: column, centred, `paddingHorizontal` 16, no vertical padding, no background, width 100%. `style` last; `testID` on the root. No heading role on the headline; no button `disabled` or label props.

## Web render

Root `div[data-testid]` (padding 0 16, gap 16) › [`div` media box] · `div` text wrap (gap 8) › [`div[dir=auto]` eyebrow, `div[dir=auto]` headline] · `div[dir=auto]` supporting · `div[dir=auto]` body · `button[role=button]` 42 tall.

- 328 px host, default props: 328 × 225 (headline three lines, 105 tall); with a 117 px Image media and a body line: 390.
- `PageHero Size: 'S'` + `Button / Size: 'S'`: 18 px headline on two lines, 32 px button. `Video / Output: 'M'`: a 70 px box. `Page type: 'JioPlus'` on `#18152b`: white text.
- `{ 'Semantic Intent': 'System' }` turns the default button green; text unchanged.
- A `VStack` (Slot gap S) of two full-width Buttons in `buttonSlot` (Medium second) matches Figma's stacked pair, with an 8 px gap (Figma 12).

## Discrepancies

- Package adds 16 px horizontal padding Figma doesn't have (text 296 wide in a 328 host).
- Eyebrow and headline lines are taller than Figma's (22 vs 20; 35 vs 29 per headline line).
- `PageHero Size S` doesn't resize the Button; Figma's S instance does.
- Storybook's Default (and Size S, Figma Master) stories show the price in both lines, the MDX's own Don't; the MDX says body stays hidden until set.
- `media={false}` leaves an empty 117 px box.
- Figma's default shows media, the body, and two buttons; the package shows none of the media or body and one button until set.
- Figma property typo `Eybrow` (Figma-side).

## Hosting

Examples sit in a Coin `VStack` 328 px column (`maxWidth: 100%`), as Storybook hosts them in a 328 px box. Media is the docs' gold coin (`src/assets/gold-coin.png`) as a Coin `Image` sized to the box (117, or 70 at Video / Output M), or an Icon Capsule. Two actions are a `VStack` (Slot gap S) of full-width Buttons in `buttonSlot`, High then Medium. JioPlus sits on the kit's dark ScreenFrame.

## Tickets

- #405 (Component Bug, Biscuit, filed 26 October 2026): padding, line heights, Size S button, Default story body, empty media box.

## Limits

Don't show or mention Color Mode or dark mode. Don't imply the hero presses, plays video or Lottie itself, fits media to its box, resizes its button with PageHero Size, or that body shows without being set.
