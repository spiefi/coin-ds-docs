# TestimonialsCard source evidence

Package, Figma, and Storybook evidence for the Testimonials Card guide (board ticket #86, Design documentation — Marcin; Storybook coverage — Biscuit, done: "Storybook page rewritten to the handwritten outline on main 475ae733").

## dbe0e02 publish (28 October 2026, #406)

The docs now install mirror tag `v0.1.78-dbe0e02` (Biscuit's `main` at dbe0e02, 27 October). #406 verified 27 October on dbe0e02 (run_beaf2324); closed by Marcin; published to the docs 28 October in Penny run run_92acfa9d. Where the sections below say otherwise, this section replaces them.

- The name and the quote are both `#0d0d0f`, as in Figma. A one-line card is 180 × 112 (the name 14 px on a 16 px line, 2 px above the quote; the 1 px `#e8e8e8` stroke is drawn inside the frame); two quote lines give 128.
- `avatarProps={{ monogram: 'AS' }}` alone shows the initials; without avatarProps the initials come from the title; imageSource still shows a photo. avatarProps.modes merge with the card's modes, and the avatar's own Avatar Size wins.
- Pressed dims to 0.7; disabled is 0.5 with `aria-disabled` and `tabindex -1`; Enter and Space press it; no hover look. Disabled without onPress leaves a static card alone. The card reads once as the group “Testimonial from Aarav S.: …”.
- The avatar is now wrapped in an `aria-hidden` div after an absolute stroke layer, so the anatomy's avatar target is `${R} [role="img"]`.
- New, filed in this run as #418 (Component Bug, To do; Mr. Biscuit): every render warns “Variable with name "testimonialsCard/title/lineHeight" not found” (the component looks the missing token up before falling back to the subtitle's 16).

Guide changes: the avatar selector; Configuration (monogram alone, initials from the title without avatarProps, the avatar's own Avatar Size wins); States (pressed and disabled looks) and both captions; Sizing (16 px name line, 2 px, 112 px as in Figma) and the A short quote caption; the first Do & Don't (“The sample photo” no longer happens) is now “The brand’s initials”; the Readout; Sources rewritten (28 October, 27 October build).

## Checked

26 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-c8526ae` (Biscuit's `main` at c8526ae); `npm run coin:status` reports the mirror up to date with upstream. Rendered the installed package in the docs site's Vite setup (react-native-web 0.21.2) in headless Chrome.

## Sources

- Package: `src/components/TestimonialsCard/TestimonialsCard.tsx` (195 lines, `React.memo`). Exports `TestimonialsCard`, `TestimonialsCardProps` (`components/index.ts:377`). Renders one `Avatar` and two plain texts.
- Figma: [Coin Components Library · TestimonialsCard](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=5267-1880), node `5267:1880`, one component, 180 × 112, fixed width, padding 12, gap 12, radius 8, white with a 1 px `#e8e8e8` border, `context7 = Card`. A 42 px Avatar (Image) over a nested Title (14/16 Bold "Page Title", 12/16 Regular "Subtitle", gap 2, both `#0d0d0f`). Properties `Title`, `Body` (text), `Show Footer Text`, `Show Button` (booleans): none is wired to a layer, and there is no footer or button layer.
- Storybook (published `index.json`): `components-testimonialscard--default`, `--with-author`, `--short-body`, `--long-body`, `--carousel-row` (a row, gap 12, of three cards). Host: `padding: 24`, `#f5f5f5`, start-aligned. Every story shows the Avatar's bundled sample photo.
- Biscuit's handwritten `TestimonialsCard.mdx`: "one quote: an avatar, the person's name, and the sentence they said. It is meant to sit in a horizontal row of quotes." Not a review with stars (Rating) or a profile (ProfileCard). "`title` is the person's name, not the product. `body` is their words. Keep quotes in a row to a similar length." Accessibility: "Set `accessibilityLabel` when `onPress` is set, and say where the press goes." Limits: no rating, date, or link; a row should scroll rather than shrink the card.

## Contract

- `title` (default 'Title'): 14 px Bold 700 on a 17 px line, colour from `testimonialsCard/subtitle/color` (`#1a1c1f`). Empty hides it.
- `body` (default 'I was dreading renewing my car insurance, but JioFinance made it a breeze.'): 12/16 Regular 400, colour from `testimonialsCard/title/color` (`#010101`). Wraps; no clamp. Empty hides it.
- Text block: gap 4 (hard-coded), 154 px wide.
- `avatarProps`: spread last on `<Avatar style="Image" modes={…} />`, so its keys win. Initials need `{ style: 'Monogram', monogram: 'AS' }`; `monogram` alone keeps the sample photo. `imageSource` sets a photo. Without `avatarProps` the bundled sample photo shows. `avatarProps.modes` replaces the card's modes on the avatar instead of merging.
- `modes`: reach the Avatar only. `Avatar Size` L 42 (default), M 36, S 29, XS 14; `Context4` and `Context2` also resize it. The card's own tokens have no mode dependency except `Color Mode`.
- `onPress`: the root becomes a `Pressable` (`role="button"`, `tabindex=0`); without it a `View` with `accessibilityRole="text"`. `disabled` only works with `onPress`. No pressed, hover, or disabled look.
- `accessibilityLabel`: defaults to "Testimonial from {title}: {body}"; the texts are hidden from screen readers so the card reads once.
- Width 180 (hard-coded), `style` last on the root. No `testID`, children, or slot.

## Web render

Root `div` (or `button` with `onPress`) 180 wide, padding 12, gap 12, radius 8, 1 px `#e8e8e8` border › `div[role=img]` avatar 42 › `div` text (gap 4) › `div[dir=auto]` title 17 tall, `div[dir=auto]` body (16 per line).

- Heights: one-line quote 117; two lines 133; three 149; Avatar Size S with three lines 136.
- Avatar Size M → 36 px, S → 29 px; `avatarProps={{ style: 'Monogram', monogram: 'AS' }}` → lilac circle, purple initials.
- Three cards in a row with a 12 px gap are 564 px wide: wider than a phone.

## Discrepancies

- Text colours: the code reads the crossed tokens (title ← `subtitle/color` `#1a1c1f`, body ← `title/color` `#010101`); Figma is `#0d0d0f` for both.
- Name line 17 (Figma 16) and a 4 px gap (Figma 2; `testimonialsCard/textwrap/gap` 4 is unused), so one-line cards are 117 tall where Figma's is 112.
- MDX Try it and Anatomy say `avatarProps={{ monogram }}` shows initials; it needs `style: 'Monogram'` too. MDX says the width comes from tokens; it is hard-coded 180.
- CHANGELOG says card pressed feedback comes from tokens; the card has none.
- `avatarProps.modes` replaces instead of merging.
- Figma's `Title`, `Body`, `Show Footer Text`, and `Show Button` properties drive nothing (Figma-side: for the Figma owner).

## Hosting

Examples use Monogram avatars (`avatarProps={{ style: 'Monogram', monogram }}`), never the sample photo except in the Don't that shows it. Single cards sit on the plain example stage, as in Storybook. In context, cards scroll sideways in a Coin `ScrollArea direction="horizontal"` › `HStack` inside a ScreenFrame, so the row never widens the page.

## Tickets

- #406 (Component Bug, Biscuit, filed 26 October 2026): colours, line height and gap, MDX monogram, pressed look, avatar modes.

## Limits

Don't show or mention Color Mode or dark mode. Don't imply the card stretches to its host, truncates, has a pressed or disabled look, a rating, date, or link, or that `monogram` alone shows initials.
