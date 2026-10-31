# PlanComparisonCard

> Coin agent pack 0.1.78+25 (pilot). Generated from `components/plancomparisoncard.json`; the JSON is the source of truth.

- **State:** flagged (2 flags, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `e7ed622` · built 2026-10-31T03:15:31Z
- **Category:** card (for discovery only, not a limit on composition) · **Tags:** plan comparison, compare plans, feature matrix, upgrade table, membership plans
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=plancomparisoncard) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4498-2968) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-plancomparisoncard--docs)

Use a Plan Comparison Card to compare two or three plans feature by feature, with the plan you recommend in gold.

## Use when

- **recommended** Comparing two or three plans feature by feature, with the plan you recommend in gold.  
  _From summary: “Use a Plan Comparison Card to compare two or three plans feature by feature, with the plan you recommend in gold.”_

## Avoid when

_None in the guide._

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Plan names | columns: one name per plan, 14 px, centred over its column. | yes | anatomy: “columns: one name per plan, 14 px, centred over its column.” |
| Recommended plan | brand: true turns that plan's name gold. | no | anatomy: “brand: true turns that plan’s name gold.” |
| Feature | A row's label, 12 px, on the left of the row. | no | anatomy: “A row’s label, 12 px” |
| Value | A string or number from values, 12 px medium, centred in its plan's cell. | no | anatomy: “A string or number from values, 12 px medium, centred.” |
| Info icon | showInfo adds it after the label; onInfoPress makes it a button. | no | anatomy: “showInfo adds it after the label; onInfoPress makes it a button.” |
| Not included | false in values: a grey cross. | no | anatomy: “false in values: a grey cross.” |
| Table | A dark panel with 16 px corners and a 1 px line between rows; children replace it. | no | anatomy: “A dark panel with 16 px corners and a 1 px line between rows.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `children` | `ReactNode` | types |

## Placement

- **recommended** On the guide's JioFinance+ upgrade screen, the comparison sits between the screen's heading and its upgrade button.  
  _From inContext: “The comparison sits between the screen’s heading and its upgrade button.”_
- **recommended** `PlanComparisonRow.onInfoPress`: Each info icon opens that feature's explanation through onInfoPress; the upgrade button starts the upgrade through its own onPress.  
  _From inContext: “Each info icon opens that feature’s explanation through onInfoPress; the button starts the upgrade through its own onPress.”_
- **recommended** The card fills the width of its host; Figma draws it at 328 px.  
  _From sizing: “The card fills the width of its host; Figma draws it at 328 px.”_
- **recommended** The feature column takes 1.8 shares of the width and each plan column one share.  
  _From sizing: “The feature column takes 1.8 shares of the width and each plan column one share”_
- **recommended** `rows`: The card's height follows its rows.  
  _From sizing: “Height follows the rows”_
- **recommended** The plan names sit 16 px above the table.  
  _From sizing: “the plan names sit 16 px above the table”_

## Configuration

- **recommended** `columns`: columns names the plans, left to right.  
  _From configuration: “columns names the plans, left to right.”_
- **recommended** `PlanComparisonColumn.brand` = `true`: Mark the plan you recommend with brand: its name turns gold.  
  _From configuration: “Mark the one you recommend with brand: its name turns gold.”_
- **recommended** `PlanComparisonColumn.brand` = `false`: Without brand, every plan name is white.  
  _From configuration: “Without brand, every plan name is white.”_
- **discouraged** `PlanComparisonColumn.brand`: Don't make every plan gold: nothing stands out as the one to pick.  
  _From doDont: “Nothing stands out as the one to pick.”_
- **recommended** `columns`: With three plans, each plan column gets narrower, so names and values stay short.  
  _From configuration: “Each plan column gets narrower, so names and values stay short.”_
- **recommended** `rows`: rows lists the features: each row's values fill the plan columns in the same order.  
  _From configuration: “rows lists the features: each row’s values fill the plan columns in the same order.”_
- **recommended** `PlanComparisonRow.values`: Give each row one value per plan, in column order: values fill the columns in order, so leaving one out shifts the ones after it under the wrong plan.  
  _From doDont: “Values fill columns in order, so ₹5,000 lands under Your plan.”_
- **recommended** `PlanComparisonRow.values`: In values, a string or number shows as text, false shows a grey cross, and any Coin component, such as a Badge, shows as it is.  
  _From configuration: “A string or number shows as text, false shows a grey cross, and any Coin component, such as a Badge, shows as it is.”_
- **recommended** `PlanComparisonRow.values`: A Coin component in a cell fills the cell and gets the card's modes.  
  _From configuration: “A Coin component fills the cell and gets the card’s modes.”_
- **recommended** `PlanComparisonRow.showInfo` = `true`: showInfo adds an info icon after a feature's label.  
  _From configuration: “showInfo adds an info icon after a feature’s label.”_
- **recommended** `PlanComparisonRow.showInfo`: Leave out showInfo when a feature needs no explaining.  
  _From configuration: “Leave out showInfo when a feature needs no explaining.”_
- **recommended** `PlanComparisonRow.onInfoPress`: Use onInfoPress to open a feature's explanation, for example in a sheet.  
  _From states: “Use it to open the explanation, for example in a sheet.”_
- **recommended** `PlanComparisonRow.onInfoPress`: onInfoPress shows the info icon by itself: it implies showInfo.  
  _From fact `/facts/props/12` (PlanComparisonRow.onInfoPress, source evidence)_
- **recommended** `children`: children replaces the table with your own content, under the same plan names.  
  _From configuration: “children replaces the table with your own content, under the same plan names.”_
- **recommended** `children`: With children, the plan names stay and the card adds no panel around your content.  
  _From configuration: “Your content replaces the table; the plan names stay, and the card adds no panel.”_
- **recommended** `modes`: No mode restyles the card: the modes you give it pass to the components in its cells and slot.  
  _From configuration: “No mode restyles the card: the modes you give it pass to the components in its cells and slot.”_
- **recommended** The card and its rows have no pressed, selected, or disabled state.  
  _From states: “The card and its rows have no pressed, selected, or disabled state.”_

## Content

- **recommended** Same features, side by side.  
  _From corePrinciple: “Same features, side by side.”_
- **recommended** `columns`: Pass your own columns: left out, the card shows two sample plans, “Your plan” and a gold “JioFinance+”.  
  _From fact `/facts/props/0` (columns, source evidence)_
- **recommended** `rows`: Pass your own rows (or children): left out, the card shows four sample features.  
  _From fact `/facts/props/1` (rows, source evidence)_
- **recommended** `columns`: Call the user's current plan “Your plan” and the others by their product names, in a word or two.  
  _From content: “Call the user’s current plan Your plan and the others by their product names, in a word or two.”_
- **recommended** `columns`: When the card compares the user's plan with an upgrade, put the current plan first, then the upgrade by its product name.  
  _From content: “The current plan first, the upgrade by its product name.”_
- **recommended** `columns`: With three plans, keep names under about 8 characters.  
  _From content: “With three plans, keep names under about 8 characters.”_
- **recommended** `rows`: Write features as nouns, such as “Cashback”, not sentences.  
  _From content: “Write features as nouns, such as Cashback or Bonus JioGold, not sentences.”_
- **recommended** `PlanComparisonRow.values`: Keep values to a number or a few characters, such as “1.25x”, “₹5,000” or “1%”.  
  _From content: “Keep values to a number or a few characters: 1.25x, ₹5,000, 1%.”_
- **recommended** `PlanComparisonRow.values`: Use false for a feature a plan doesn't include, not the word “No”, so every missing feature looks the same.  
  _From content: “Use false for a feature a plan doesn’t include, not the word No, so every missing feature looks the same.”_

Good: “Your plan”, “JioFinance+”, “JioPoints multiplier”, “1x”, “1.25x”, “Cashback”, “₹5,000”, “Bonus JioGold”, “1%”, “Free”, “Plus”, “Premium”, “JioPoints”, “1.1x”, “₹2,000”, “Gold bonus”

Bad: “No”, “Up to ₹2,000”, “Up to ₹5,000”

## States

| State | When | From |
| --- | --- | --- |
| Hint | showInfo draws the info icon as a hint: it only marks that more detail exists and doesn't press. | states: “showInfo draws the icon as a hint: it doesn’t press” |
| Button | onInfoPress makes the same icon a button named “More information about” and the feature, with a bigger tap area than it looks. | states: “onInfoPress makes the same icon a button named “More information about” and the feature, with a bigger tap area than it looks.” |

## Accessibility

- **recommended** `PlanComparisonRow.onInfoPress`: With onInfoPress, each info icon looks the same as the hint but is a button you can tab to.  
  _From states: “Looks the same, but each icon is a button you can tab to.”_
- **recommended** `infoLabel`: infoLabel sets the spoken prefix of each info icon's name, before the row's label; it defaults to “More information about”.  
  _From fact `/facts/props/3` (infoLabel, source types)_
- **recommended** `notIncludedLabel`: notIncludedLabel sets the spoken name of a false cell's cross; it defaults to “Not included”.  
  _From fact `/facts/props/4` (notIncludedLabel, source types)_
- **recommended** The card is a table, with rows, column headers and cells.  
  _From evidence: “it is now a `role="table"` with rows, column headers and cells”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Cross for not included | The word No | Text reads like a value and looks different from the crosses. |
| One recommended plan | Every plan gold | Nothing stands out as the one to pick. |
| One value per plan | A value missing | Values fill columns in order, so ₹5,000 lands under Your plan. |

## Examples

### Upgrading from the user's plan, the guide's two-plan comparison: “Your plan” first, then the upgrade by its product name, gold as the recommended plan (brand). false marks what “Your plan” doesn't include, and showInfo adds hint icons to the features that need explaining.

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

_From content: “The current plan first, the upgrade by its product name.”_

### Three tiers: short names and values that fit the narrower columns, with Premium recommended in gold.

```tsx
<PlanComparisonCard
  columns={[{ label: 'Free' }, { label: 'Plus' }, { label: 'Premium', brand: true }]}
  rows={[
    { label: 'JioPoints', values: ['1x', '1.1x', '1.25x'] },
    { label: 'Cashback', showInfo: true, values: [false, '₹2,000', '₹5,000'] },
    { label: 'Gold bonus', showInfo: true, values: [false, false, '1%'] },
  ]}
/>
```

_From content: “Short names and values that fit the narrower columns.”_

### The JioFinance+ upgrade screen, the guide's In context: the comparison sits between the screen's heading and its upgrade button. Each info icon opens that feature's explanation through onInfoPress, and the button starts the upgrade through its own onPress; the handlers are stubs standing for the screen's own wiring.

```tsx
<VStack>
  <VStack>
    <Text text="Get more with JioFinance+" />
    <Text text="Compare what you get today with the upgrade." />
  </VStack>
  <PlanComparisonCard
    columns={[{ label: 'Your plan' }, { label: 'JioFinance+', brand: true }]}
    rows={[
      { label: 'JioPoints multiplier', values: ['1x', '1.25x'] },
      { label: 'Cashback', onInfoPress: () => {}, values: [false, '₹5,000'] },
      { label: 'Bonus JioGold', onInfoPress: () => {}, values: [false, '1%'] },
    ]}
  />
  <Button label="Upgrade to JioFinance+" onPress={() => {}} />
</VStack>
```

_From inContext: “Each info icon opens that feature’s explanation through onInfoPress; the button starts the upgrade through its own onPress.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `columns` | `PlanComparisonColumn[]` |  |  |  | evidence (2026-10-21) | Left out, the card shows two sample plans: “Your plan”, and “JioFinance+” with brand. Declared: Plan column headers (excludes the leading label column). The order here maps 1:1 to each row's `values` array. |
| `rows` | `PlanComparisonRow[]` |  |  |  | evidence (2026-10-21) | Left out, the card shows four sample feature rows. Declared: Feature rows compared across the plan columns. |
| `children` | `React.ReactNode` |  |  |  | evidence (2026-10-21) | Replaces the table body; the plan names still come from columns. The card gives the slot no panel, border or padding. Declared: Slot that replaces the default comparison table (Figma `Slot`). When omitted, the table is built from `columns` + `rows`. Header still renders from `columns`. `modes` are cascaded into slot children. |
| `infoLabel` | `string` |  | `"More information about"` |  | types | Spoken prefix for each info icon, followed by the row label. Defaults to `"More information about"`. Default "More information about", from the component source. |
| `notIncludedLabel` | `string` |  | `"Not included"` |  | types | Spoken name for a `false` cell (the muted cross). Defaults to `"Not included"`. Default "Not included", from the component source. |
| `modes` | `Modes` |  |  |  | evidence (2026-10-21) | Used for the card's tokens and cascaded to slot children and element cells; a child's own modes win. Declared: Design token modes for theming (e.g. `{ "Color Mode": "Light" }`). |
| `style` | `StyleProp<ViewStyle>` |  |  |  | evidence (2026-10-21) | Applied to the root after its own { gap: 16, width: '100%' }. Declared: Override the outer container style. |
| `PlanComparisonColumn.label` | `string` |  |  | yes | evidence (2026-10-21) | A field of each columns item: the plan's name, one header per plan. |
| `PlanComparisonColumn.brand` | `boolean` |  |  |  | evidence (2026-10-21) | A field of each columns item: true turns that plan's name gold. Any number of columns can be given, and any number branded. |
| `PlanComparisonRow.label` | `string` |  |  | yes | evidence (2026-10-21) | A field of each rows item: the feature's label. |
| `PlanComparisonRow.values` | `PlanComparisonCellValue[]` |  |  | yes | evidence (2026-10-21) | A field of each rows item: values[i] fills plan column i. A string or number shows as white text (12 px, weight 500, centred); false as a grey cross (ic_close, 16 px); null, undefined or true leave the cell empty; a React element is rendered as it is and given the card's modes. A short array leaves empty cells; extra values are ignored. |
| `PlanComparisonRow.showInfo` | `boolean` |  |  |  | evidence (2026-10-21) | A field of each rows item: adds a white 16 px info icon (ic_info) after the label. |
| `PlanComparisonRow.onInfoPress` | `() => void` |  |  |  | evidence (2026-10-21) | A field of each rows item: implies showInfo and wraps the icon in a Pressable, a button named “More information about” and the label, with hitSlop 8 (about 32 × 32 on the web); Enter and Space work. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection PlanComparisonCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types | Slot that replaces the default comparison table (Figma `Slot`). When omitted, the table is built from `columns` + `rows`. Header still renders from `columns`. `modes` are cascaded into slot children. |

### Events

_No events._

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- Figma draws a row line under rows 1 and 2 only; the package puts one under every row but the last. _(evidence, 2026-10-21)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/avoidWhen` · trace-check: The guide gives no avoidWhen guidance; left empty rather than guessed.
- `(whole entry)` · human: The guide and most of its evidence were checked on 21 October on 0.1.78-c7d3348 and not re-checked on the installed build, dbe0e02, which changed PlanComparisonCard for #360 (plan names centred over their columns, names that end in … on one line, labels and values that wrap, rows of at least 46 px, a table with rows, column headers and cells, a cross named “Not included”, infoLabel and notIncludedLabel). This entry follows the installed package and leaves out the guide sentences dbe0e02 contradicts (listed in its notes). The guide also doesn't say which surface hosts the card: its plan names are white with no panel behind them, every example sits on the docs' dark frame, and on a light Coin Screen the names don't show, so the entry's examples carry no host. Re-extract once #360 is fixed and the guide is re-checked and published. Added by Claude Code in the overnight run agentpack-batch10, for Marcin to confirm.
