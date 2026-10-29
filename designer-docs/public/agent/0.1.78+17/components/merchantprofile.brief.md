# MerchantProfile (brief)

> Coin agent pack 0.1.78+17 · documented · full entry: `components/merchantprofile.md` (sources, all facts, flags)

Use a Merchant Profile at the top of a payment to show who is being paid: the merchant’s logo, registered name, and UPI ID.

**Use when**
- At the top of a payment, to show who is being paid: the merchant's logo, registered name, and UPI ID.

**Avoid when**
- Avoid: A merchant header that people press: the profile has no states and doesn't press.

**Placement**
- A payment screen opens with the merchant, so people know who they're paying before they enter the amount.
- Who you're paying, before how much.
- The screen lays out the rest and sends the payment; the profile shows who is being paid.
- The profile has no width of its own: it fills its column, keeps 16 px clear at each side, and centres its lines. Figma draws it 360 px wide.

**Key rules**
- **REQUIRED** `title`: Set title yourself: left out, the profile shows “Uber India Systems Private Limited”.
- **REQUIRED** `subtitle`: Set subtitle yourself, or pass an empty one to hide the line: left out, it shows “UPI ID: uberindia@ybl”.
- `avatarProps`: avatarProps goes to the Avatar: an imageSource for the merchant's logo, or style Monogram with their initials.
- `avatarProps`: Pass the merchant's logo, or their initials.
- `avatarProps`: For initials, use style Monogram with the merchant’s initials.
- Avoid: `avatarProps`: Don't leave avatarProps out: the Avatar falls back to a stranger's photo.
- `Avatar Size`: Avatar Size sets the avatar, 42 px at L; no mode changes the text.
- `Avatar Size` = `M`: Avatar Size M gives a 36 px avatar; S gives 29 px.

**Example:** A payment screen opens with the merchant, the guide’s In context: Jio Gold’s logo, registered name, and UPI ID, so people know who they’re paying before they enter the amount. The screen lays out the rest (in the guide, the amount, a note and a Pay ₹1,200 button) and sends the payment. The URI stands for the merchant’s own logo.

```tsx
<MerchantProfile
  title="Jio Gold"
  subtitle="UPI ID: jiogold@jio"
  avatarProps={{ imageSource: { uri: 'https://example.com/jio-gold-logo.png' } }}
/>
```

**Props:** `title`, `subtitle`, `modes`, `style`, `avatarProps`, `accessibilityLabel`. (* required)

**Modes it reads:** Avatar Size, Badge Size, Color Mode, context 10, Context2, Context4, Page type, Profile Card Appearance.

**Gaps (report, do not work around)**
- A left-out title or subtitle shows sample text (Uber India Systems Private Limited, UPI ID: uberindia@ybl) (Component Bug #423).
- The Avatar shows a stock photo until you pass a logo or initials in avatarProps (Component Bug #423).
- An empty title or subtitle hides the text but keeps its 12 px gap: 86 px tall without a subtitle, 82 without a title (Component Bug #423).
- avatarProps.modes replaces the profile's modes on the avatar instead of merging with them (Component Bug #423).
- The name's lines are 20 px where Figma's are 18, so a two-line name is 122 px tall where Figma's is 118 (Component Bug #423).

Full entry: `components/merchantprofile.md`. Links: `components/merchantprofile.links.md`.
