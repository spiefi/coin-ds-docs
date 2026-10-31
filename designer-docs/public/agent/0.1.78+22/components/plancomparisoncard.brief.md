# PlanComparisonCard (brief)

> Coin agent pack 0.1.78+22 · flagged · full entry: `components/plancomparisoncard.md` (sources, all facts, flags)

Use a Plan Comparison Card to compare two or three plans feature by feature, with the plan you recommend in gold.

**Use when**
- Comparing two or three plans feature by feature, with the plan you recommend in gold.

**Placement**
- On the guide's JioFinance+ upgrade screen, the comparison sits between the screen's heading and its upgrade button.
- `PlanComparisonRow.onInfoPress`: Each info icon opens that feature's explanation through onInfoPress; the upgrade button starts the upgrade through its own onPress.
- The card fills the width of its host; Figma draws it at 328 px.
- The feature column takes 1.8 shares of the width and each plan column one share.

**Key rules**
- `columns`: columns names the plans, left to right.
- `PlanComparisonColumn.brand` = `true`: Mark the plan you recommend with brand: its name turns gold.
- `PlanComparisonColumn.brand` = `false`: Without brand, every plan name is white.
- Avoid: `PlanComparisonColumn.brand`: Don't make every plan gold: nothing stands out as the one to pick.
- `columns`: With three plans, each plan column gets narrower, so names and values stay short.
- `rows`: rows lists the features: each row's values fill the plan columns in the same order.
- `PlanComparisonRow.values`: Give each row one value per plan, in column order: values fill the columns in order, so leaving one out shifts the ones after it under the wrong plan.
- `PlanComparisonRow.values`: In values, a string or number shows as text, false shows a grey cross, and any Coin component, such as a Badge, shows as it is.

**Example:** Upgrading from the user's plan, the guide's two-plan comparison: “Your plan” first, then the upgrade by its product name, gold as the recommended plan (brand). false marks what “Your plan” doesn't include, and showInfo adds hint icons to the features that need explaining.

```tsx
<PlanComparisonCard
  columns={[{ label: 'Your plan' }, { label: 'JioFinance+', brand: true }]}
  rows={[
    { label: 'JioPoints multiplier', values: ['1x', '1.25x'] },
    { label: 'Cashback', showInfo: true, values: [false, '₹5,000'] },
    { label: 'Bonus JioGold', showInfo: true, values: [false, '1%'] },
  ]}
/>
```

**Props:** `columns`, `rows`, `children`, `infoLabel`, `notIncludedLabel`, `modes`, `style`, `PlanComparisonColumn.label`*, `PlanComparisonColumn.brand`, `PlanComparisonRow.label`*, `PlanComparisonRow.values`*, `PlanComparisonRow.showInfo`, `PlanComparisonRow.onInfoPress`. (* required)

**Modes it reads:** Color Mode.

**Gaps (report, do not work around)**
- Figma draws a row line under rows 1 and 2 only; the package puts one under every row but the last.

Full entry: `components/plancomparisoncard.md`. Links: `components/plancomparisoncard.links.md`.
