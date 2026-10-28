# MerchantProfile source evidence

Package, Figma, and Storybook evidence for the Merchant Profile guide (board ticket #50, Design documentation — Marcin; Storybook coverage — Biscuit, done: "handwritten MerchantProfile docs page and stories. Component code was not changed.").

## Checked

28 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-dbe0e02` (Biscuit's `main` at dbe0e02, 27 October); `npm run coin:status` reports the mirror up to date. Installed and upstream `MerchantProfile.tsx` are byte-identical. Rendered in the docs site's Vite setup (react-native-web 0.21.2) in headless Chrome.

## Sources

- Package: `src/components/MerchantProfile/MerchantProfile.tsx` (176 lines). Exports `MerchantProfile`, `MerchantProfileProps` (`components/index.ts:172`). Renders one Coin `Avatar` (Image style by default), a title, and a subtitle. No children, slots, `testID`, or rest props.
- Figma: [Coin Components Library · Merchant Profile](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1516-1103), node `1516:1103`, one component, 360 × 118: a 42 px Avatar (Uber logo), 12 px, `Title` "Uber India Systems / Private Limited" (a hard line break; 16/18 Bold `#0c0d10`), 12 px, `Subtitle` "UPI ID: uberindia@ybl" (12/16 Medium `#191b1e`, one line with an ellipsis). Column, centred, 16 px side padding. Text properties `Title`, `Subtitle`; no variants or booleans. Code Connect passes Avatar as a child.
- Storybook (published `index.json`, 17 October): `components-merchantprofile--default`, `--short-name`, `--long-name`, `--without-subtitle`, `--multiple-profiles`, `--token-values`, `--docs`. Host: a centred View, 24 px padding, `#f5f5f5`. No story passes `avatarProps`, so every story shows Avatar's stock photo.
- Biscuit's `MerchantProfile.mdx`: "Commonly used on payment confirmation screens, transaction receipts, and merchant identification flows"; "very long names will wrap"; "designed for centered layouts"; "for interactive merchant profiles, wrap in a Pressable". Its custom-avatar example uses `'Avatar Size': 'XL'`, which doesn't exist (L, M, S, XS); it imports from `'jsf-components'`.

## Contract

- `title` ('Uber India Systems Private Limited'), `subtitle` ('UPI ID: uberindia@ybl'): leaving either out (or `undefined`) shows that sample text. `''` hides the text but keeps its 12 px gap (rendered: 86 px tall without a subtitle, 82 without a title).
- Name: 16 px Bold on a 20 px line (`safeTextLineHeight` raises the token's 18), `#0c0d10`, centred, wraps (three lines for "HDFC Bank Limited Corporate Banking Services India" in 240 px). Subtitle: 12/16 Medium `#191b1e`, centred, wraps (no ellipsis).
- `avatarProps` (Partial AvatarProps) spread onto the Avatar: `imageSource` (a logo), or `style: 'Monogram'` with `monogram`. With neither, the Avatar's bundled stock photo of a person shows. `avatarProps.modes` replaces the profile's `modes` on the avatar instead of merging (rendered: `Avatar Size` S on the profile plus `avatarProps.modes` gives a 42 px avatar).
- `modes`: the 12 `merchantProfile/*` tokens have one mode, so no mode changes the text, gap, or padding. Modes reach the Avatar: `Avatar Size` L 42 (default), M 36, S 29, XS 14 (rendered; XS is too small for two initials).
- Root: column, centred, padding 0 16, gap 12, no width, background, or border; `style` last. In a stretching column it fills the width; in a centring one it hugs its content.
- `accessibilityLabel` does nothing: the root renders no label. The root is `role="heading"`, an `h1`, around the avatar and both lines. No press or states.

## Web render

Root `h1[role=heading]` (padding 0 16, gap 12) › `div[role=img]` avatar (42) · `div[dir=auto]` name · `div[dir=auto]` subtitle. 328 px column, a one-line name: 328 × 102.

## Discrepancies

- Figma's name is two lines by a hard break; the package's wraps by width, so the sample name is one line at 328 px.
- Name line 18 px in Figma, 20 px in the package (118 vs 122 for two lines).
- Figma cuts a long subtitle with an ellipsis; the package wraps it.
- Figma shows the merchant's logo; the package shows a stock photo until `avatarProps` is set.
- Figma is 360 px wide; the package has no width.
- MDX: "A default accessibility label is generated from the title and subtitle"; it isn't applied. "All tokens support mode-based theming"; the profile's tokens have one mode.

## Hosting

Profiles sit in a Coin `VStack` column, as Storybook centres them on a light field: 328 px for single examples (`maxWidth: '100%'`), 240 px to show wrapping. Logos are the docs' `jio-gold-logo.png`; other merchants use a Monogram avatar, never the stock photo except in the Don't.

## Tickets

- #423 (Component Bug, Component Fix › To do; Mr. Biscuit; filed 28 October 2026, Penny run run_7586d367): dead `accessibilityLabel`, `h1` root, `avatarProps.modes` replacing modes, empty lines keeping their gap, sample text when a prop is left out, stock-photo default, line height and ellipsis vs Figma.

## Limits

Don't show or mention Color Mode or dark mode. Don't show `style`, `accessibilityLabel`, `avatarProps.modes`, or modes other than Avatar Size. Don't imply the profile presses, truncates, names itself for screen readers, or that an omitted title or subtitle disappears.
