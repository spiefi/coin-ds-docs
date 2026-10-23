# Fullscreen Modal source evidence

Package, Figma, Storybook, and browser evidence for the Fullscreen Modal guide (board ticket #28, Design documentation — Marcin; Storybook coverage — Biscuit, done).

## Checked

Checked 10 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-636f3f5` (Biscuit's `main` at 636f3f5); `npm run coin:status` reports the mirror and the docs up to date. `FullscreenModal.tsx` is identical to upstream.

## c8526ae publish (23 October 2026, #232)

The docs now install mirror tag `v0.1.78-c8526ae` (Biscuit's `main` at c8526ae, 23 October), which fixes #232 (verified 23 October, Penny run run_5a688e4d; closed by Marcin). Where this section differs from the 10 October sections below, it replaces them. Measured on this guide in headless Chrome (react-native-web 0.21.2, 1280 px):

- Surface: the root is black (`body/background` with Page type JioPlus and Color Mode Dark, `rgb(0, 0, 0)`), so the white hero text reads without media. In Color Mode Dark the hero text drops Color Mode and stays white.
- `heroMedia` is now a full-bleed background at the root, pinned to the top at the modal's width (height = width ÷ `ratio`), behind the hero text, the body, and the footer; it adds no scroll height and moves with the scroll.
- Defaults: copy props default to empty strings (no JioFinance+ text); `heroHeight` 532 (measured 532); `primaryActionLabel` empty, so no footer without a label or `footer`.
- Close: 28 × 28 (Button / Size S), 12 px from the top and right, rendered only when `showClose` and `onClose` are both set.
- Footer: ActionFooter `pinned`, padding 10 / 16 / 41 (`actionFooter/padding/bottom`).
- Semantics (web): root `role="dialog"` `aria-modal="true"` named by the headline (`aria-label`); the headline is an `h1` (`accessibilityRole="header"`). With `onClose`, a web focus trap moves focus inside on mount, keeps Tab and Shift+Tab inside, Escape calls `onClose`, and focus returns to the opener on unmount. Without `onClose` it is still `aria-modal` but doesn't take or keep focus.
- DOM: root › [hero media layer] › scroll area › content › foreground (hero region, body) › …; footer wrapper `div` › `div[role="toolbar"]`; close `button[aria-label="Close"]` last.
- Regressions from this fix, filed by the re-test run (not this run): #392, a FullscreenModal with `onClose` shown at load takes focus and traps Tab for the whole page. On this guide focus lands on “Upgrade for free” in the last Do & Don’ts example and the page scrolls to y 10175 (1280 px). #393, with `onClose` the keyboard can't scroll the body. The guide names #392 in Sources; nothing works around it.

Guide changes: Anatomy selectors (headline is `[role="heading"]`; the toolbar sits inside a wrapper), which fixed “5 pins for 7 legend rows”; anatomy copy (black surface, pinned footer, headline names the modal, close shown with a handler); With hero media description; Sizing (532 px hero, 28 px close); Content (unset lines don't show); Do & Don'ts: the dark-background caption now credits the modal's surface, and “Set every line / Leave lines unset” became “Write a headline / Leave the headline out”; Sources rewritten (checked 23 October).

## Sources

- Figma: [Coin Components Library · Fullscreen Modal](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4534-7558), node `4534:7558`. One component, 360 × 1228. A full-height Image (360 × 1228) sits behind everything; a hero VStack (360 × 532) holds a Page Hero (eyebrow 18/20 bold, headline 29/29 black, supporting text and price 12/16, all white, centred); two Sections (“Key benefits” list, “Compare plans” PlanComparisonCard with four rows) and a ListItem follow at 16 px gaps; an Action Footer (Button 328 × 42 + Disclaimer) overlaps the bottom; a 28 × 28 gold close Icon Button sits 12 px from the top and right.
- Storybook (published `index.json`, built 1 October): `components-fullscreenmodal--docs`, `--default`, `--lottie-hero`, `--minimal-no-body`. The docs page is the old generated page and equals upstream `main`; Biscuit's board note on #28 (7 October: rewritten to the Button outline, covering the forced context5 mode, hero media sized by ratio, and the pinned ActionFooter) is not on `main` or published. The stories render inside a 360 × 760 frame and use Storybook-only image and Lottie assets; their Compare plans card is a story-local copy with three rows (the public `PlanComparisonCard` has Figma's four).

## Contract

- Props: `eyebrow`, `headline`, `supportingText`, `priceText` (defaults are the JioFinance+ upgrade copy: “Upgrade to JioFinance+”, “Get more from your money.”, a long sentence, “₹999/year · ₹0 until 2027”; only an empty string hides a line), `heroMedia`, `heroHeight` (420), `showClose` (true), `closeOffsetY` (0), `onClose`, `closeAccessibilityLabel` (“Close”), `footer`, `primaryActionLabel` (“Upgrade for free”; empty with no `footer` removes the footer), `onPrimaryAction`, `disclaimer` (“By upgrading, we'll check your eligibility with Experian.”), `children`, `modes`, `style`, `contentContainerStyle`, `testID`.
- It does not own visibility: no `visible`, Modal, portal, transition, backdrop, Escape, focus handling, or dialog role. The screen mounts and removes it; `onClose` only reports the close press. Without `onClose` the close button still shows and does nothing.
- Modes: `context5: 'Fullscreen Modal'` is forced; `Page type: JioPlus` is the default. Both are cloned into `children` (recursively through `children` props, but not into components that don't forward `modes`), the hero media, the footer, and the close button. Under context5 Sections are transparent with white titles, ListItems white with `#ebebed` support text, the Disclaimer `#ebebed`, the Action Footer transparent.
- The hero text colour comes from `Page type` and `Color Mode`, not context5: white in Light (JioPlus), black in Dark, `#3d4047` with Page type MainPage or SubPage.
- No surface of its own: the white hero text relies on the hero media (Figma's full-height image) or whatever is behind the modal.
- Hero media renders after the first layout, full width, height = width ÷ `ratio` for an Image with a numeric `ratio`; it scrolls with the content.
- Tokens: `fullScreenModal/gap` 16 (body gap and top padding); hero region padding 16 sides and bottom; body bottom padding 24; close inset 12. Page Hero M: eyebrow 18/20 700, headline 29 900 (rendered line height 35), supporting and price 12/16 500, gaps 16 and 8.
- Classification. Designer-configurable: the hero copy lines, hero media, `heroHeight`, body Sections, the button label and disclaimer (or a custom footer), the close button on/off. System-driven: dark styling of children (context5), layout, scrolling. Developer-only: `onClose`, `onPrimaryAction`, mounting and removing the modal, `closeOffsetY`, `style`, `contentContainerStyle`, `testID`.

## Browser measurements (Chrome, react-native-web 0.21.2, Light)

- In a 360 × 640 flex parent with no hero media: the scroll area is 532 tall, the hero region 420 with the text block bottom-aligned (16 px above its bottom), the Action Footer 108 tall (padding 10/16/24, button 328 × 42, disclaimer 281 wide in two lines), the close button 40 × 40 at 12 px from the top and right, gold `#cea15a`.
- In a block parent it is as tall as its content (no inner scroll): with `heroHeight={240}`, short copy, one Section, and the footer, 360 × 673.
- Sections passed directly as children: transparent, title 18/22 heavy white; ListItem support text `#ebebed`; PlanComparisonCard white text with a gold JioFinance+ column. A Section inside a wrapper component that doesn't forward `modes` stays a white card with black text.
- Hero media: `<Image imageSource={…} ratio={328 / 223} />` renders 360 × 245 at the top; with the default 420 hero region the eyebrow overlaps the image's bottom edge.
- `Color Mode: Dark` on a black parent: the hero eyebrow, headline, supporting text, and price are black (invisible); the button and close turn `#8f6317` with light text.
- DOM: root `div[data-testid]` > scroll area `div` > content > hero region `div` > text block; body `div` (if children); footer `div[role="toolbar"]`; close `button[aria-label="Close"]` last. No dialog role, heading, or name on the root. RN Animated logs a `useNativeDriver` warning in development.

## Accessibility (web)

- Not announced as a dialog; focus isn't moved into it, kept in it, or returned; Escape does nothing. The headline is not a heading.
- The close button is a button named by `closeAccessibilityLabel` (“Close”); the main button is named by its label; the disclaimer is text.

## Limits

- Light only: Dark turns the hero text black.
- The page uses the kit's dark `ScreenFrame` (`size="full" surface="dark"`) as a stand-in for the dark hero media: the docs have no product imagery.
- Not shown: Dark, Page type overrides, LottiePlayer heroes, `closeOffsetY`, `style`, `contentContainerStyle`.

## Coin gaps

- #232 (Component Fix; Mr. Biscuit): fixed on c8526ae, verified 23 October, published to the docs 23 October. It covered: no surface, so the white hero text depends on the media behind it; hero text black in Dark; close button 40 px (Figma 28); `heroHeight` 420 (Figma 532); JioFinance+ copy by default; a close button with no `onClose` does nothing; no dialog semantics, focus handling, or Escape; Action Footer bottom padding 24 (Figma 41) and in normal flow on the web; Storybook rewrite not on `main`, stories use a local plan card.
- #392 (Component Fix, To do): a FullscreenModal or presented ModalSheet shown at load takes focus and traps Tab for the page.
- #393 (filed 23 October by the re-test run): with `onClose`, keyboard users can't scroll the body.
