# RechargeCard (brief)

> Coin agent pack 0.1.78+19 · flagged · full entry: `components/rechargecard.md` (sources, all facts, flags)

Use a Recharge Card to show one prepaid plan: its price, validity, data, the apps it includes, and the action to buy it.

**Use when**
- Show one prepaid plan: its price, validity, data, the apps it includes, and the action to buy it.
- A small top-up, such as a data pack, with its limit in the fine print.

**Avoid when**
- Avoid: A plan people select, or one that shows loading: the card has no selected or loading state.

**Placement**
- On a Recharge screen, list the plans one under another.
- `actions`: Each Recharge starts the screen's own payment through the Button's onPress; the card only lays out the plan.
- The card is never narrower than 312 px, as Figma draws it, and fills a wider host.
- The facts share the width in equal columns, and the price stays at the left.

**Key rules**
- **REQUIRED** `title`: Set title yourself: left out, the card shows the sample “Unlimited 5G”.
- **REQUIRED** `price`: Set price yourself: left out, the card shows the sample ₹500.
- **REQUIRED** `validity`: Set validity yourself: left out, the card shows the sample “365 days”.
- **REQUIRED** `data`: Set data yourself: left out, the card shows the sample “2 GB/Day”.
- **REQUIRED** `disclaimer`: Set disclaimer yourself: left out, the card shows sample fine print for a data-only pack.
- `subscriptionContent`: subscriptionContent adds a third column, Subscriptions, for the apps the plan includes: pass Avatars, and the card overlaps them at size S.
- `subscriptionContent`: Leave subscriptionContent out for two columns, for a plan without apps.
- `subscriptionContent`: subscriptionContent false, '' or an empty fragment hides the Subscriptions column, the same as leaving it out.

**Example:** Plans on the Recharge screen, one under another under a Title: the Unlimited 5G plan with the apps it includes (monogram Avatars stand in for app logos, as in the guide) and a Data pack without apps. Each Recharge starts the screen's own payment through the Button's onPress (stubs here); the card only lays out the plan.

```tsx
<VStack>
  <Title title="Popular plans" subtitle="For 98765 43210" />
  <RechargeCard
    title="Unlimited 5G"
    price={349}
    validity="28 days"
    data="2 GB/day"
    disclaimer={'Unlimited voice and 100 SMS a day.\nSpeed drops to 64 kbps after 2 GB.'}
    subscriptionContent={
      <>
        <Avatar style="Monogram" monogram="JH" />
        <Avatar style="Monogram" monogram="JS" />
        <Avatar style="Monogram" monogram="+2" />
      </>
    }
    actions={<Button label="Recharge" onPress={() => {}} />}
  />
  <RechargeCard
    title="Data pack"
    price={19}
    validity="1 day"
    data="1.5 GB"
    disclaimer="Data only. No voice or SMS."
    actions={<Button label="Recharge" onPress={() => {}} />}
  />
</VStack>
```

**Props:** `title`, `price`, `currency`, `validity`, `data`, `validityLabel`, `dataLabel`, `subscriptionsLabel`, `disclaimer`, `subscriptionContent`, `actions`, `modes`, `style`, `onPress`, `disabled`, `accessibilityLabel`. (* required)

**Modes it reads:** Avatar Size, Badge Size, Color Mode, Context2, Context3, Context4, Page type.

**Gaps (report, do not work around)**
- The card is 271 px tall where Figma's is 261 (three columns, one action, 312 px wide), because its text lines are taller: line heights are raised to 1.2 × the font size.
- Figma's Recharge Card exposes only title and disclaimer as properties; the price, facts, apps and buttons are layers there.

Full entry: `components/rechargecard.md`. Links: `components/rechargecard.links.md`.
