# ProductMerchandisingCard source evidence

Package, Figma, and Storybook evidence for the Product Merchandising Card guide (board ticket #139, Design documentation — Marcin; Storybook coverage — Biscuit, done: "Storybook page rewritten to the handwritten outline on main e60f8bd8").

## Checked

20 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-c7d3348` (Biscuit's `main` at c7d3348). `npm run coin:status` shows one newer upstream commit, e60f8bd8, which changes only `ProductMerchandisingCard.mdx`. Rendered with react-native-web 0.21.2 in headless Chrome with JioType Var loaded; the published Storybook (built 17 October) was measured the same way and matches the installed code.

## Sources

- Package: `src/components/ProductMerchandisingCard/ProductMerchandisingCard.tsx` (549 lines). Exports `ProductMerchandisingCard`, `ProductMerchandisingCardProps` (`components/index.ts:345-347`). Renders `Image` (photo), `Avatar`, `Badge` (corner and glass), `Button`, a react-native-svg blurred copy of the photo behind the footer, and `GlassFill` when there is no photo.
- Figma: [Coin Components Library · Product Merchandising card](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=5277-317), node `5277:317`, a single component (no variants), 328 × 223. Booleans `avatar`, `gradient`, `showBadge`, `showSpecialBadge` (all true); text `title`, `subtitle`. Layers: photo (a Diwali shopping scene), header wrap 328 × 55 (36 px Avatar, lilac Badge with an icon), a black gradient scrim 65 px (`linear-gradient(… rgba(0,0,0,0) → #000)`, 90 %), footer 328 × 95 with a glass Badge, title / subtitle and a purple S Button, `background-blur` 29.
- Storybook (published `index.json`): `components-productmerchandisingcard--default`, `--no-special-badge`, `--monogram-avatar`, `--pressable-card`, `--narrow-responsive-footer`, on a `#1b1b1f` canvas in a 328 px column (168 px for the narrow story). Stories use a picsum shop photo, a pravatar portrait, and icons with hard-coded colours. The published docs page is the older one; e60f8bd8's handwritten page isn't deployed.
- Biscuit's handwritten `ProductMerchandisingCard.mdx` (e60f8bd8): "a full-bleed promo: a photo, an avatar, a corner badge, a glass footer, and one action." Use for "one campaign or product, where the photo is the message"; not for a spec sheet (ProductOverview) or a card with no photo.

## Contract

All props optional: `imageSource` (none: no photo, a transparent card), `title` ("Title"), `subtitle` ("Subtitle"), `badgeLabel`, `badgeIcon`, `badge`, `showAvatar` (true), `avatarSource`, `avatarMonogram`, `avatar`, `specialBadgeLabel`, `specialBadgeIcon`, `specialBadge`, `ctaLabel` ("CTA"), `onCtaPress`, `cta`, `onPress`, `height` (223), `modes`, `style`, `accessibilityLabel`, `disableTruncation`. No width prop, `testID` or `...rest`.

- Corner badge and glass badge show only with a label (or their slot). Avatar: `avatarSource` (photo), else `avatarMonogram`, else the Avatar's stock portrait; `showAvatar={false}` removes it (and a custom `avatar`).
- `badge`, `avatar`, `specialBadge`, `cta` use `??`: `null` still shows the default, `false` removes it. They get no modes from the card; nor do `badgeIcon` / `specialBadgeIcon`, so a default `Icon` keeps its own gold colour (Figma: purple on the lilac badge, white on the glass one).
- Title and subtitle: one line with … unless `disableTruncation` (which also frees the glass badge, not the corner badge or the Button).
- `onPress`: root `Pressable`, `role=button`, name `accessibilityLabel ?? title`, opacity 0.92 while pressed; the CTA keeps its own `onCtaPress`, so both nest (a button in a button). Static card: `accessibilityLabel` only. On the web the pressable root is a `button` that shrinks to zero width without an explicit width (the content is absolutely positioned); with `style={{ width }}` it renders normally.
- Without `onCtaPress` the Button still renders and does nothing.

## Modes and tokens

Reads `modes` only. Card tokens (`productMerchandisingcard/*`, single mode): radius 12, header padding 12, footer padding 16, footer gap 8, text gap 2, text min width 100, title 14/700 white (line 17), subtitle 12/400 `#c5bcb5` (line 15), glass badge padding 6 / 4, radius 4, overlay `rgba(255,255,255,0.15)`; `blur/minimal` 29 (SVG blur deviation 10).

- Forced defaults (yours win): Avatar `Avatar Size: M` (36 px); corner Badge `AppearanceBrand: Secondary, Emphasis: Medium` (lilac `#e4dbff`, purple label); Button `Button / Size: S, AppearanceBrand: Secondary` (purple, 32 px). One `modes` object reaches all three.
- AppearanceBrand: Primary → cream badge and gold Button; Neutral, Tertiary likewise. Emphasis: High → purple badge, white label; Medium → light purple Button; Low → text Button and pale badge. Semantic Intent System + AppearanceSystem: green / orange / red badge and Button. Badge Size Small: smaller corner and glass badges. Button / Size: M, XS. Avatar Size, Context4: avatar size.
- Page type and Profile Card Appearance change nothing. Storybook offers 15 collections.

## Web render

Root `div` (radius 12, overflow hidden, height 223) › photo `div` (cover) › header `div` (absolute top, row, padding 12: avatar `div[role=img]` 36 px, corner badge `div`) › footer `div` (absolute bottom, padding 16, gap 8: SVG blur layer, glass badge `div`, row `div` with the text `div` (title, subtitle `div[dir=auto]`) and the Button wrapper › `button[aria-label=<ctaLabel>]`). No `data-testid`.

At 328 with both badges: header 60, footer 97 (Figma 55, 95). Without the glass badge the footer is 66. At 168 wide (Storybook's narrow story, XS Button, height 141) the Button wraps under the text and the footer grows upward.

## Discrepancies

- No dark scrim: Figma has a black gradient under the footer (the `gradient` boolean); the package draws only a blurred copy of the photo, so the white title sits on a pale haze, and the copy is re-cropped to the footer (a lighter band shows).
- The handwritten mdx and the JSDoc call the footer a live native blur; with a photo it is an SVG blur on every platform.
- Defaults: no photo, no badges, stock-portrait avatar; Figma shows the photo, both badges with icons and an avatar. Without a photo the card is transparent and its white title invisible on a light screen.
- Badge icons and custom slots get no modes or colour (icons render gold).
- Header 60 vs 55, footer 97 vs 95, badges 23 vs 22; footer row gap 8 both ways vs Figma's 10 vertical only.
- Figma binds `footer/title/fontweight`, which the token file lacks (code uses `typography/body/fontWeight/high`, also 700).
- The code says the glass badge is pinned against Badge Size; its padding and weight still change.
- The handwritten mdx: "modes cascade" (default children only), "spoken name is accessibilityLabel, then the title" (only with `onPress`), `disableTruncation` scope, and demos without the photo or badges its anatomy numbers.
- `null` slots fall back to the defaults; only `false` removes them.
- Published Storybook docs page is the older generated one.

## Hosting

Storybook shows the card in a 328 px column on a near-black canvas. The guide gives every card `style={{ width: 328 }}` (Figma's width; it also keeps a pressable card from collapsing on the web) and puts it in the kit's `FitWidth` outside the Anatomy diagrams. Photo: `src/assets/bank-hero.png` (328 × 223, two people with a phone), promoting a savings account; avatar: the Jio Gold logo (`src/assets/jio-gold-logo.png`).

## Tickets

- #356 (Component Bug, Biscuit): missing scrim and re-cropped blur, defaults (stock portrait, transparent card), uncoloured badge icons and modes-less slots, heights and footer gap, missing font-weight token, Badge Size pin, mdx claims, `null` slots, collapsing pressable root on the web.

## Limits

Don't show Dark, Page type, Profile Card Appearance, Context, Context2, context 10, Avatar Size, Context4, Semantic Intent or Button / State. Don't show `badge`, `avatar`, `specialBadge` or `cta` slots except `cta={false}`. Don't imply a dark scrim, a live blur, that the card works without a photo, or that modes reach custom slots.
