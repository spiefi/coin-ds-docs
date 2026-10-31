# PageHero (brief)

> Coin agent pack 0.1.78+27 · flagged · full entry: `components/pagehero.md` (sources, all facts, flags)

Use a Page Hero at the top of a feature or offer page: media, a short eyebrow, the offer as a headline, its price, and one action.

**Use when**
- At the top of a feature or offer page: media, a short eyebrow, the offer as a headline, its price, and one action.
- Open an offer page with the offer: in the guide, the Digital Gold page shows the coin, what it is, and two actions, Start saving and Learn more.

**Avoid when**
- Avoid: A page title with search: Biscuit's Storybook page, as the evidence records it, points to HeroSection instead. Use instead: HeroSection.
- Avoid: A portfolio total: Biscuit's Storybook page, as the evidence records it, points to PortfolioHero instead. Use instead: PortfolioHero.

**Placement**
- Everything is centred in one column: the media on top, the eyebrow and the headline, the supporting line and the body, then the button across the full width.
- The hero fills its host's width.
- The hero adds nothing above or below, so the screen gives it room.
- Its parts are 16 px apart and the eyebrow sits 8 px above the headline.

**Key rules**
- `media`: media takes any Coin element, such as an Image or an Icon Capsule, in a box Video / Output sizes to 117, 70 or 20 px.
- `media`: Give media something the size of its box, because the box clips the rest.
- `media`: Smaller media, such as an Icon Capsule, sits centred in the box.
- `Video / Output` = `M`: Video / Output M makes the media box 70 px: give it media to match.
- `PageHero Size` = `M`: PageHero Size M: a 29 px headline, with the parts 16 px apart.
- `PageHero Size` = `S`: PageHero Size S makes the text smaller, with an 18 px headline and 12 px gaps.
- `AppearanceBrand`: The hero passes its modes to the button, so AppearanceBrand recolours it.
- `AppearanceBrand` = `Primary`: AppearanceBrand Primary, the default, gives the gold button.

**Example:** An offer, the guide's anatomy specimen: a 117 px Image in the media box at Video / Output L, a short category as eyebrow, the offer as headline, the price in supportingText, a second, different fact in body, and one short verb on the default button. The image URL and the empty press handler stand for the app's own.

```tsx
<PageHero
  media={<Image imageSource={{ uri: 'https://example.com/gold-coin.png' }} width={117} height={117} />}
  eyebrow="Upgrade to JioFinance+"
  headline="Resume earning cashback, extra points, and 1% gold"
  supportingText="₹999/year"
  body="Auto-renews · Cancel anytime"
  buttonLabel="Renew for free"
  onButtonPress={() => {}}
/>
```

**Props:** `eyebrow`, `showEyebrow`, `headline`, `supportingText`, `showSupportingText`, `body`, `showBody`, `buttonLabel`, `onButtonPress`, `buttonDisabled`, `buttonAccessibilityLabel`, `showButton`, `buttonSlot`, `media`, `modes`, `style`, `testID`. (* required)

**Modes it reads:** AppearanceBrand, AppearanceSystem, Button / Size, Button / State, Color Mode, Context, context 10, Context2, Emphasis, Page type, PageHero Size, Profile Card Appearance, Semantic Intent, Video / Output.

**Gaps (report, do not work around)**
- The eyebrow and headline lines are taller than Figma's: the eyebrow's line is 22 px where Figma's is 20, and each headline line is 35 px where Figma's is 29. Still so on the installed dbe0e02 build (Component Bug #405).

Full entry: `components/pagehero.md`. Links: `components/pagehero.links.md`.
