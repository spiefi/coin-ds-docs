# RechargeCard

> Coin agent pack 0.1.78+7 (pilot). Generated from `components/rechargecard.json`; the JSON is the source of truth.

- **State:** flagged (13 flags, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `0615fbf` · built 2026-10-29T00:57:35Z
- **Category:** card (for discovery only, not a limit on composition) · **Tags:** plan card, prepaid plan, recharge plan, mobile plan, data pack
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=rechargecard) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2235-937) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-rechargecard--docs)

Use a Recharge Card to show one prepaid plan: its price, validity, data, the apps it includes, and the action to buy it.

## Use when

- **recommended** Show one prepaid plan: its price, validity, data, the apps it includes, and the action to buy it.  
  _From summary: “Use a Recharge Card to show one prepaid plan: its price, validity, data, the apps it includes, and the action to buy it.”_
- **recommended** A small top-up, such as a data pack, with its limit in the fine print.  
  _From content: “A small top-up, with its limit in the fine print.”_

## Avoid when

- **discouraged** A plan people select, or one that shows loading: the card has no selected or loading state.  
  _From states: “The card has no selected or loading state.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Title | title: the plan's name, 12 px bold. | yes | anatomy: “title: the plan’s name, 12 px bold.” |
| Price | A MoneyValue from price, 36 px; the card adds the ₹. | yes | anatomy: “A MoneyValue from price, 36 px; the card adds the ₹.” |
| Plan facts | validity and data, each under its label, sharing the width in equal columns. | yes | sizing: “The facts share the width in equal columns” |
| Apps | subscriptionContent: your Avatars, overlapped at size S, in a third column. | no | anatomy: “subscriptionContent: your Avatars, overlapped at size S.” |
| Fine print | disclaimer, 10 px; a line break in the text starts a new line. | yes | anatomy: “disclaimer, 10 px; a line break in the text starts a new line.” |
| Actions | actions: your Buttons, purple and size S. | no | anatomy: “actions: your Buttons, purple and size S.” |
| Panel | A white panel, 20 px corners, 1 px border, at least 312 px wide. | yes | anatomy: “A white panel, 20 px corners, 1 px border, at least 312 px wide.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `subscriptionContent` | `ReactNode` | types |
| `actions` | `ReactNode` | types |

## Placement

- **recommended** On a Recharge screen, list the plans one under another.  
  _From inContext: “The screen lists plans one under another.”_
- **recommended** `actions`: Each Recharge starts the screen's own payment through the Button's onPress; the card only lays out the plan.  
  _From inContext: “Each Recharge starts the screen’s own payment through the Button’s onPress; the card only lays out the plan.”_
- **recommended** The card is never narrower than 312 px, as Figma draws it, and fills a wider host.  
  _From sizing: “The card is never narrower than 312 px, as Figma draws it, and fills a wider host.”_
- **recommended** The facts share the width in equal columns, and the price stays at the left.  
  _From sizing: “The facts share the width in equal columns, and the price stays at the left.”_
- **recommended** In a wider host the fact columns get wider; the price stays at the left.  
  _From sizing: “The fact columns get wider; the price stays at the left.”_
- **recommended** Height follows the content: 20 px between the rows, 20 px of padding at the top and bottom, and 16 px at the sides.  
  _From sizing: “Height follows the content: 20 px between the rows and 20 px of padding at the top and bottom, 16 px at the sides.”_

## Configuration

- **recommended** `subscriptionContent`: subscriptionContent adds a third column, Subscriptions, for the apps the plan includes: pass Avatars, and the card overlaps them at size S.  
  _From configuration: “subscriptionContent adds a third column, Subscriptions, for the apps the plan includes: pass Avatars, and the card overlaps them at size S.”_
- **recommended** `subscriptionContent`: Leave subscriptionContent out for two columns, for a plan without apps.  
  _From configuration: “Leave it out for two columns.”_
- **recommended** `subscriptionContent`: subscriptionContent false, '' or an empty fragment hides the Subscriptions column, the same as leaving it out. ⚑ flagged (cross-check)  
  _From fact `/facts/props/9` (subscriptionContent, source evidence)_
- **recommended** `actions`: actions takes your Buttons, and the card makes them purple, size S, and Emphasis High.  
  _From configuration: “actions takes your Buttons, and the card makes them purple, size S, and Emphasis High”_
- **recommended** `actions`: With a second action, give that Button Emphasis Low, as Figma does. ⚑ flagged (cross-check)  
  _From configuration: “give a second one Emphasis Low, as Figma does.”_
- **recommended** `actions`: Leave actions out (or pass false, '' or an empty fragment) for no buttons: the card then adds no button row and no extra gap. ⚑ flagged (cross-check)  
  _From fact `/facts/props/10` (actions, source evidence)_
- **discouraged** `onPress`: Don't give a card both onPress and actions: a pressable card with actions puts buttons inside a button.  
  _From states: “Use one or the other: a pressable card with actions puts buttons inside a button.”_
- **recommended** `modes`: On the card, Button / Size M makes its buttons bigger, and AppearanceBrand and Emphasis change all of them.  
  _From configuration: “On the card, Button / Size M makes them bigger, and AppearanceBrand and Emphasis change all of them.”_
- **recommended** `modes`: The card's own text and panel don't change with modes.  
  _From configuration: “The card’s own text and panel don’t change with modes.”_
- **recommended** `currency`: currency sets the symbol before price (₹ by default); a string price that already starts with it is not prefixed again. ⚑ flagged (cross-check)  
  _From fact `/facts/props/2` (currency, source types)_
- **recommended** `validityLabel`: validityLabel sets the label above the validity value (Validity by default). ⚑ flagged (cross-check)  
  _From fact `/facts/props/5` (validityLabel, source types)_
- **recommended** `dataLabel`: dataLabel sets the label above the data value (Data by default). ⚑ flagged (cross-check)  
  _From fact `/facts/props/6` (dataLabel, source types)_
- **recommended** `subscriptionsLabel`: subscriptionsLabel sets the label above the apps (Subscriptions by default). ⚑ flagged (cross-check)  
  _From fact `/facts/props/7` (subscriptionsLabel, source types)_

## Content

- **recommended** One plan, priced up front.  
  _From corePrinciple: “One plan, priced up front.”_
- **recommended** `title`: Make the title the plan's name.  
  _From content: “Make the title the plan’s name”_
- **recommended** `price`: Give price as a number: the card adds the ₹.  
  _From content: “the price a number: the card adds the ₹.”_
- **recommended** `validity`: Keep validity and data to one value each, such as “28 days” and “2 GB/day”.  
  _From content: “Keep validity and data to one value each, such as 28 days and 2 GB/day”_
- **recommended** `disclaimer`: Put the plan's limits in the disclaimer, in a line or two of fine print.  
  _From content: “Put the plan’s limits in the disclaimer, in a line or two of fine print.”_
- **recommended** `disclaimer`: A line break in disclaimer starts a new line of fine print.  
  _From anatomy: “a line break in the text starts a new line.”_
- **recommended** `actions`: Label the main action Recharge.  
  _From content: “Label the main action Recharge.”_
- **REQUIRED** `title`: Set title yourself: left out, the card shows the sample “Unlimited 5G”.  
  _From fact `/facts/props/0` (title, source types)_
- **REQUIRED** `price`: Set price yourself: left out, the card shows the sample ₹500.  
  _From fact `/facts/props/1` (price, source types)_
- **REQUIRED** `validity`: Set validity yourself: left out, the card shows the sample “365 days”.  
  _From fact `/facts/props/3` (validity, source types)_
- **REQUIRED** `data`: Set data yourself: left out, the card shows the sample “2 GB/Day”.  
  _From fact `/facts/props/4` (data, source types)_
- **REQUIRED** `disclaimer`: Set disclaimer yourself: left out, the card shows sample fine print for a data-only pack.  
  _From fact `/facts/props/8` (disclaimer, source types)_

Good: “Unlimited 5G”, “349”, “28 days”, “2 GB/day”, “Unlimited voice and 100 SMS a day. Speed drops to 64 kbps after 2 GB.”, “Recharge”, “Data pack”, “19”, “1 day”, “1.5 GB”, “Data only. No voice or SMS.”

## States

| State | When | From |
| --- | --- | --- |
| Static | The default: the card isn't pressable; its action Buttons are. | states: “The card isn’t pressable: its buttons are.” |
| Pressable | With onPress: the whole card is one button, announced by its title. | states: “onPress makes the whole card one button, announced by its title” |
| Disabled | disabled: the card is dimmed, a static card too; with onPress set, it doesn't fire. | fact `/facts/props/14` (disabled, source types) |

## Accessibility

- **recommended** `onPress`: With onPress, the whole card is one button, announced by its title.  
  _From states: “onPress makes the whole card one button, announced by its title”_
- **recommended** `accessibilityLabel`: accessibilityLabel names the card for screen readers, pressable or not; without it, the card is named by its title. ⚑ flagged (cross-check)  
  _From fact `/facts/props/15` (accessibilityLabel, source types)_

## Do and don’t

_None in the guide._

## Examples

### Plans on the Recharge screen, one under another under a Title: the Unlimited 5G plan with the apps it includes (monogram Avatars stand in for app logos, as in the guide) and a Data pack without apps. Each Recharge starts the screen's own payment through the Button's onPress (stubs here); the card only lays out the plan.

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

_From inContext: “Each Recharge starts the screen’s own payment through the Button’s onPress; the card only lays out the plan.”_

### The whole card as one button: onPress, announced by its title, and no actions, since a pressable card with actions would put buttons inside a button.

```tsx
<RechargeCard
  title="Data pack"
  price={19}
  validity="1 day"
  data="1.5 GB"
  disclaimer="Data only. No voice or SMS."
  onPress={() => {}}
/>
```

_From states: “onPress makes the whole card one button, announced by its title”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `title` | `string` |  | `"Unlimited 5G"` |  | types | Title of the card. Default: "Unlimited 5G". Default "Unlimited 5G", from the component source. |
| `price` | `number \| string` |  | `500` |  | types | Value for the MoneyValue component. Default: 500. Default 500, from the component source. |
| `currency` | `string` |  | `"₹"` |  | types | Currency symbol or ISO code prefixed to `price`. Default: "₹". A string `price` that already starts with this symbol (or `₹` when the currency is INR) is not prefixed again. Default "₹", from the component source. |
| `validity` | `string` |  | `"365 days"` |  | types | Validity duration string. Default: "365 days". Default "365 days", from the component source. |
| `data` | `string` |  | `"2 GB/Day"` |  | types | Data allowance string. Default: "2 GB/Day". Default "2 GB/Day", from the component source. |
| `validityLabel` | `string` |  | `"Validity"` |  | types | Label above the validity value. Default: "Validity". Default "Validity", from the component source. |
| `dataLabel` | `string` |  | `"Data"` |  | types | Label above the data value. Default: "Data". Default "Data", from the component source. |
| `subscriptionsLabel` | `string` |  | `"Subscriptions"` |  | types | Label above the subscription avatars. Default: "Subscriptions". Default "Subscriptions", from the component source. |
| `disclaimer` | `string` |  | `"Data only pack (No Voice & No SMS)\nVoice: NA \| SMS: NA..."` |  | types | Disclaimer text under the specs. Default: "Data only pack (No Voice & No SMS)\\nVoice: NA \| SMS: NA...". Default "Data only pack (No Voice & No SMS)\nVoice: NA \| SMS: NA...", from the component source. |
| `subscriptionContent` ⚑ flagged (cross-check) | `React.ReactNode` |  |  |  | evidence (2026-10-20) | Wrapped in an AvatarGroup at Avatar Size S whatever the card's modes: 29 px Avatars, overlapping by 6 px. Declared: Avatar elements to be displayed in the subscription slot. Content will be wrapped in an AvatarGroup. `false`, `''` and an empty fragment hide the column the same way as `null`. |
| `actions` ⚑ flagged (cross-check) | `React.ReactNode` |  |  |  | evidence (2026-10-20) | The Buttons get AppearanceBrand Secondary (purple), Button / Size S and Emphasis High, with the card's modes on top; a Button's own modes win. Declared: Actions to be displayed in the button group (e.g. Button components). Buttons should be passed as children to this prop. Omitted, `false`, `''` or an empty fragment leave no group and no extra gap. |
| `modes` | `Modes` |  |  |  | types | Mode configuration for design tokens. |
| `style` | `ViewStyle` |  |  |  | types |  |
| `onPress` | `() => void` |  |  |  | evidence (2026-10-20) | The root becomes a Pressable with the button role, named by accessibilityLabel or else title. Declared: Press handler for the whole card. When set, the card becomes pressable (rendered through a `Pressable` with `accessibilityRole="button"`). |
| `disabled` | `boolean` |  |  |  | types | Dims the card and blocks the pressable wrapper when `onPress` is set. The dimmed look applies even on a static card. |
| `accessibilityLabel` | `string` |  |  |  | types | Accessibility label forwarded to the root (defaults to `title`). |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Avatar Size` | `mode collection` | L, M, S, XS | `"L"` |  | evidence (2026-10-20) | Has no effect on the card's Avatars: the card forces them to S. Declared: A token collection RechargeCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Badge Size` | `mode collection` | Medium, Small | `"Medium"` |  | types | A token collection RechargeCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection RechargeCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context2` | `mode collection` | Default, AppBar | `"Default"` |  | types | A token collection RechargeCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context3` | `mode collection` | Default, Transaction Bubble, Balance & Cards, Amount Input | `"Default"` |  | evidence (2026-10-20) | The card gives its price Context3 Balance & Cards by default: 36 px, weight 900. Context3 Default on the card shrinks the price to 14 px. Declared: A token collection RechargeCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context4` | `mode collection` | Default, Chip, Button, Badge, Badge/glass | `"Default"` |  | types | A token collection RechargeCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection RechargeCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `subscriptionContent` | `React.ReactNode` |  |  |  | types | Avatar elements to be displayed in the subscription slot. Content will be wrapped in an AvatarGroup. `false`, `''` and an empty fragment hide the column the same way as `null`. |
| `actions` | `React.ReactNode` |  |  |  | types | Actions to be displayed in the button group (e.g. Button components). Buttons should be passed as children to this prop. Omitted, `false`, `''` or an empty fragment leave no group and no extra gap. |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onPress` | `() => void` |  |  |  | types | Press handler for the whole card. When set, the card becomes pressable (rendered through a `Pressable` with `accessibilityRole="button"`). |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- The card is 271 px tall where Figma's is 261 (three columns, one action, 312 px wide), because its text lines are taller: line heights are raised to 1.2 × the font size. _(evidence, 2026-10-20)_
- Figma's Recharge Card exposes only title and disclaimer as properties; the price, facts, apps and buttons are layers there. _(evidence, 2026-10-20)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/doDont` · trace-check: The guide gives no doDont guidance; left empty rather than guessed.
- `/facts/props/9` · cross-check: misreads-source: The evidence says the opposite: subscriptionContent adds the third column when React.Children.count > 0, and "`false`, `''` or an empty fragment still add an empty column". The fact says they hide the column like `null`.
- `/configuration/2` · cross-check: misreads-source: This rests on the wrong /facts/props/9. The evidence (and its Discrepancies: "`subscriptionContent={false}` shows an empty column") says false, '' or an empty fragment still render an empty Subscriptions column. Limits also say not to show `subscriptionContent={false}`.
- `/facts/props/10` · cross-check: misreads-source: The evidence says "Without actions the empty group still takes a 20 px gap", with a no-actions height of 227 because "the empty group's 20 px gap remains". The fact claims omitted or empty actions "leave no group and no extra gap".
- `/configuration/5` · cross-check: misreads-source: This contradicts the guide: "Without actions, the empty row still adds 20 px at the bottom". doDont also lists "Leave out actions" as a Don't, because "An empty row still leaves space under the fine print." The item recommends leaving actions out and claims no extra gap.
- `/configuration/4` · cross-check: lost-context: It recommends a second action without the guide's caveat that "with two, the longer label is cut short". doDont lists "Two actions" as a Don't ("The row splits equally, so View details is cut short").
- `/configuration/9` · cross-check: misreads-source: The guide says "the card adds the ₹" and that the ₹ is fixed, and doDont says a ₹ in the price "shows ₹₹349". The evidence says there are no currency props. A currency prop that avoids double prefixing contradicts the guide for the installed 0.1.78.
- `/configuration/10` · cross-check: misreads-source: The guide says "the labels Validity, Data, and Subscriptions are fixed", and the evidence says there are no label props. Limits: "Don't imply the currency or labels can change".
- `/configuration/11` · cross-check: misreads-source: The guide says the Data label is fixed, and the evidence says there are no label props.
- `/configuration/12` · cross-check: misreads-source: The guide says the Subscriptions label is fixed, and the evidence says there are no label props.
- `/accessibility/1` · cross-check: misreads-source: The guide's sources section says "a card without onPress isn't announced by its title". The evidence says "Static: `accessibilityLabel` only (title not used)". "pressable or not; without it, the card is named by its title" contradicts both.
- `/states/2` · cross-check: misreads-source: The guide says disabled "stops it firing without changing its look" and "disabled has no look of its own". Limits: "Don't show `disabled` as a visual state". The item says the card is dimmed, even when static.
- `(whole entry)` · human: The guide and its evidence were checked on 20 October on 0.1.78-c7d3348. The installed build, dbe0e02, carries most of #353's fixes: the buttons hug their labels, no actions means no row and no gap, a ₹ already in the price is not doubled, currency and label props exist, an empty subscriptionContent hides the column, disabled dims the card, and a static card is named by its title. This entry follows the installed package and leaves out the guide sentences dbe0e02 contradicts, including all three Do and Don't pairs. dbe0e02 also brought #416: actions that don't fit the row run past the card's edge. Re-extract once #353 and #416 are fixed and the guide is re-checked and published. Added by Claude Code in the overnight run agentpack-batch3, for Marcin to confirm.
