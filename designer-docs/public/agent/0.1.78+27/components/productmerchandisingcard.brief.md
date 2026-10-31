# ProductMerchandisingCard (brief)

> Coin agent pack 0.1.78+27 · flagged · full entry: `components/productmerchandisingcard.md` (sources, all facts, flags)

Use a Product Merchandising Card to promote one product or campaign on a photo, with a badge, a short title, and one action.

**Use when**
- Promote one product or campaign on a photo, with a badge, a short title and one action.
- The photo sells; the footer names it and acts.
- One campaign or product, where the photo is the message, as the card’s handwritten Storybook docs say in the evidence’s record.

**Avoid when**
- Avoid: A spec sheet: the card’s handwritten Storybook docs, as the evidence records them, use Product Overview. Use instead: ProductOverview.
- Avoid: A card with no photo: the card’s handwritten Storybook docs, as the evidence records them, say it isn’t for one.

**Placement**
- One offer under the screen’s heading, as on the guide’s Home screen.
- `onCtaPress`: The screen owns what the action does: on the guide’s Home screen, Open starts the screen’s own sign-up through onCtaPress, and the card shows the offer.

**Key rules**
- `imageSource`: Pass the photo in imageSource: the card has none of its own.
- `badgeLabel`: badgeLabel adds the corner badge at the top right; without a label the badge is hidden.
- `badgeIcon`: badgeIcon puts a node such as an Icon before the corner badge’s label, and gives it the lilac badge’s modes, so a default Icon is purple.
- `specialBadgeIcon`: specialBadgeIcon puts a leading node, such as an Icon, inside the special badge.
- `avatarSource`: avatarSource shows a round picture at the top left.
- `avatarSource`: Pass your own avatar in avatarSource, such as the brand’s logo in the corner.
- `avatarMonogram`: avatarMonogram shows initials instead of a picture.
- `showAvatar` = `false`: showAvatar={false} removes the avatar.

**Example:** The offer on the Home screen, the guide’s In context: a Title heading over one card with a photo, an avatar, both badges and the Open Button. The URIs stand for the offer’s photo and the brand’s logo, and onCtaPress for the screen starting its own sign-up. The accessibilityLabel is the one the guide’s code gives the card (the rendered copy doesn’t show it).

```tsx
<VStack>
  <Title title="For you" subtitle="Offers picked for your savings" />
  <ProductMerchandisingCard
    imageSource={{ uri: 'https://example.com/savings-account-photo.png' }}
    avatarSource={{ uri: 'https://example.com/jio-gold-logo.png' }}
    badgeLabel="New"
    specialBadgeLabel="Zero balance"
    title="Savings account"
    subtitle="Open in 5 minutes"
    ctaLabel="Open"
    onCtaPress={() => {}}
    accessibilityLabel="Savings account, zero balance, open in 5 minutes"
  />
</VStack>
```

**Props:** `imageSource`, `title`, `subtitle`, `badgeLabel`, `badgeIcon`, `badge`, `showAvatar`, `avatarSource`, `avatarMonogram`, `avatar`, `specialBadgeLabel`, `specialBadgeIcon`, `specialBadge`, `ctaLabel`, `onCtaPress`, `cta`, `onPress`, `height`, `modes`, `style`, `accessibilityLabel`, `disableTruncation`. (* required)

**Modes it reads:** AppearanceBrand, AppearanceSystem, Avatar Size, Badge Size, Button / Size, Button / State, Color Mode, Context, context 10, Context2, Context4, Emphasis, Page type, Profile Card Appearance, Semantic Intent.

**Gaps (report, do not work around)**
- At 328 px with both badges the header is 60 px and the footer 97, where Figma’s are 55 and 95, and the badges are 23 px against Figma’s 22 (Component Bug #356).
- Figma binds a title font-weight token that the token file lacks; the code uses the body high weight token, also 700 (Component Bug #356).
- Figma’s card has the booleans showBadge and showSpecialBadge; the package has neither and shows each badge only when you pass its label (Component Bug #356).

Full entry: `components/productmerchandisingcard.md`. Links: `components/productmerchandisingcard.links.md`.
