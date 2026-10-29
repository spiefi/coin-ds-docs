# HoldingsCard

> Coin agent pack 0.1.78+13 (pilot). Generated from `components/holdingscard.json`; the JSON is the source of truth.

- **State:** flagged (5 flags, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `dd34861` · built 2026-10-29T05:05:58Z
- **Category:** card (for discovery only, not a limit on composition) · **Tags:** loan offer, offer card, holding, investment card, selectable card, loan card
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=holdingscard) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1028-1533) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-holdingscard--docs)

Use a Holdings Card for one loan offer or holding: its headline amount, its key terms, and a radio to choose it from a list.

## Use when

- **recommended** One loan offer or holding: its headline amount, its key terms, and a radio to choose it from a list.  
  _From summary: “Use a Holdings Card for one loan offer or holding: its headline amount, its key terms, and a radio to choose it from a list.”_

## Avoid when

_None in the guide._

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Logo | headerImage, fitted into a 100 × 24 box; the box stays when it's left out. | no | anatomy: “headerImage, fitted into a 100 × 24 box; the box stays when left out.” |
| Radio | At the top right, showing selected; badgeLabel or trailing can replace it. | no | anatomy: “Shows selected; badgeLabel or trailing can replace it.” |
| Hero | heroLabel over heroValue, the amount in 20 px bold. | yes | anatomy: “heroLabel over heroValue, the amount in 20 px bold.” |
| Terms | details, three to a row; a long value ends in an ellipsis. | no | anatomy: “details, three to a row; a long value ends in an ellipsis.” |
| Footer | With footer: links and an action below a divider. | no | anatomy: “The footer adds links and an action below a divider.” |
| Panel | A rounded panel with a 1 px border; AppearanceBrand sets its colours. | yes | anatomy: “A rounded panel with a 1 px border; AppearanceBrand sets its colours.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `details` | `HoldingsCardDetailItem` | types |
| `children` | `ReactNode` | types |
| `trailing` | `ReactNode` | types |
| `footerSlot` | `ReactNode` | types |
| `footerItems` | `HoldingsCardFooterItem` | types |

## Placement

- **recommended** `selected`: When a screen lists offers to choose from, it keeps one selected: each card's onPress picks that offer, and its selected follows the screen's choice.  
  _From inContext: “The screen lists its offers and keeps one selected: each card’s onPress picks that offer, and its selected follows the screen’s choice.”_
- **recommended** `style`: Set the card's width with style, as Figma does at 328 px.  
  _From sizing: “Set it with style, as Figma does at 328 px.”_
- **recommended** The terms share the width in three equal columns, and the height follows the content: 20 px of padding at the top and bottom, 16 px at the sides, and 10 px between the parts.  
  _From sizing: “The terms share the width in three equal columns, and the height follows the content: 20 px of padding at the top and bottom, 16 px at the sides, and 10 px between the parts.”_
- **recommended** `style`: A wider card, such as 360 px, widens the three columns; the amount stays at the left.  
  _From sizing: “The three columns widen; the amount stays at the left.”_
- **recommended** `details`: Each extra row of terms adds about 47 px.  
  _From sizing: “Each extra row of terms adds about 47 px.”_

## Configuration

- **recommended** `radio` = `true`: The top right shows a Radio by default, for choosing this offer.  
  _From configuration: “The top right shows a Radio by default, for choosing this offer.”_
- **recommended** `badgeLabel`: badgeLabel swaps the Radio for a status Badge.  
  _From configuration: “badgeLabel swaps it for a status Badge”_
- **recommended** `trailing`: trailing swaps in your own component at the top right.  
  _From configuration: “trailing swaps in your own component”_
- **recommended** `radio` = `false`: radio false leaves the top right empty.  
  _From configuration: “radio false leaves the top right empty.”_
- **recommended** `radio` = `false`: Use radio false for a holding you don't choose: nothing shows at the top right.  
  _From configuration: “Nothing at the top right, for a holding you don’t choose.”_
- **recommended** `radio` = `false`: radio false hides the whole top right: a badgeLabel Badge or a trailing component as well as the Radio.  
  _From fact `/facts/props/5` (radio, source evidence)_
- **recommended** `footer` = `true`: footer adds a divider, footerItems as labelled links, and a small Apply button.  
  _From configuration: “footer adds a divider, footerItems as labelled links, and a small Apply button”_
- **recommended** `footerSlot`: footerSlot replaces the footer body below the divider; it shows only when footer is true.  
  _From fact `/facts/props/9` (footerSlot, source evidence)_
- **recommended** `children`: children puts your own content in place of the terms; the amount and the Radio stay.  
  _From configuration: “Your content in place of the terms; the amount and Radio stay.”_
- **recommended** `AppearanceBrand`: AppearanceBrand colours the panel.  
  _From configuration: “AppearanceBrand colours the panel”_
- **recommended** `AppearanceBrand` = `Primary`: AppearanceBrand Primary: a pale gold panel.  
  _From configuration: “Primary (pale gold)”_
- **recommended** `AppearanceBrand` = `Neutral`: AppearanceBrand Neutral: a white panel with a grey border, as in Figma.  
  _From configuration: “A white panel with a grey border, as in Figma.”_
- **recommended** `AppearanceBrand` = `Secondary`: AppearanceBrand Secondary: a lilac panel.  
  _From configuration: “A lilac panel.”_
- **recommended** `AppearanceBrand` = `Tertiary`: AppearanceBrand Tertiary: a light grey panel.  
  _From configuration: “A light grey panel.”_
- **recommended** `headerImage`: Without headerImage, the empty logo box still holds the top row's height.  
  _From configuration: “The empty logo box still holds the top row’s height.”_
- **REQUIRED** `onPress`: Update selected yourself when onPress fires: the card does not toggle selected itself.  
  _From fact `/facts/props/15` (onPress, source evidence)_
- **recommended** `disabled` = `true`: disabled greys the Radio and stops presses.  
  _From states: “disabled greys the Radio and stops presses.”_
- **recommended** `disableTruncation` = `true`: disableTruncation lets the term values wrap instead of ending in an ellipsis.  
  _From fact `/facts/props/20` (disableTruncation, source evidence)_

## Content

- **recommended** One offer, its terms at a glance.  
  _From corePrinciple: “One offer, its terms at a glance.”_
- **REQUIRED** `heroLabel`: Set heroLabel yourself: left out, the card shows the sample “Loan amount up-to”.  
  _From fact `/facts/props/1` (heroLabel, source evidence)_
- **REQUIRED** `heroValue`: Set heroValue yourself: left out, the card shows the sample “₹1,89,000”.  
  _From fact `/facts/props/2` (heroValue, source evidence)_
- **REQUIRED** `details`: Pass your own details (or children): left out, the card shows five sample terms.  
  _From fact `/facts/props/3` (details, source evidence)_
- **REQUIRED** `footerItems`: With footer, pass your own footerItems (or footerSlot): left out, the footer shows two placeholder links labelled “Link”.  
  _From fact `/facts/props/10` (footerItems, source evidence)_
- **recommended** `heroLabel`: Make heroLabel say what the amount is, such as “Loan amount up to”.  
  _From content: “Make heroLabel say what the amount is, such as Loan amount up to”_
- **recommended** `heroValue`: Give heroValue already formatted, with its ₹.  
  _From content: “give heroValue already formatted, with its ₹.”_
- **recommended** `details`: Keep term labels to a word or two.  
  _From content: “Keep term labels to a word or two”_
- **recommended** `details`: Put the unit in the value, such as “36 months” or “12% p.a.”.  
  _From content: “put the unit in the value: 36 months, 12% p.a.”_
- **discouraged** `details`: Do not give a term a long value: the column stays the same, so the value is cut short.  
  _From doDont: “The column stays the same, so the value is cut short.”_
- **recommended** `footerItems`: Name footer links for the next step.  
  _From content: “Name footer links for the next step”_
- **recommended** `footerActionLabel`: Keep the footer action to one word, such as “Apply”.  
  _From content: “keep the action to one word, such as Apply.”_
- **recommended** `badgeLabel`: Keep the badge short: “Pre-approved” fits beside the logo.  
  _From doDont: “Pre-approved fits beside the logo.”_
- **recommended** `headerImage`: headerImage is made for a wide logo: a square mark sits centred in its 100 × 24 box.  
  _From content: “headerImage is made for a wide logo: a square mark sits centred in its 100 × 24 box.”_
- **recommended** For a holding, make the current value the hero, with quantity and returns as terms.  
  _From content: “Holdings work the same way: the current value as the hero, with quantity and returns as terms.”_

Good: “Loan amount up to”, “₹1,89,000”, “Interest”, “12% p.a.”, “Tenure”, “36 months”, “Processing fee”, “₹499”, “APR”, “15.47%”, “EMI”, “₹6,277/m”, “Repayment”, “Schedule”, “Charges”, “Details”, “Apply”, “Pre-approved”, “Current value”, “₹52,340”, “Quantity”, “8.2 g”, “Bought at”, “₹5,920/g”, “Returns”, “+7.8%”

Bad: “36 months or 60 months”, “Apply now”, “Recommended for you this month”

## States

| State | When | From |
| --- | --- | --- |
| Not selected | selected false, the default: an empty Radio. | states: “An empty Radio.” |
| Selected | When the card is pressed, your onPress sets selected and the Radio fills (purple); the card doesn't select itself. | states: “When it’s pressed, your onPress sets selected, and the Radio fills; the card doesn’t select itself.” |
| Disabled | disabled: a grey Radio, and the card doesn't press. | states: “A grey Radio; the card doesn’t press.” |
| Pressed | While pressed, the card fades a little. | states: “While pressed, the card fades a little.” |

## Accessibility

_None in the guide._

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Values with their unit | Long values | The column stays the same, so the value is cut short. |

## Examples

### Choosing a loan offer: a Title over two offer cards, each 328 px wide. The screen holds the choice: selected is true only on the offer it holds, and each card's onPress should pick that offer (the handlers here are stubs).

```tsx
<VStack style={{ width: 328 }}>
  <Title title="Pick an offer" subtitle="Pre-approved for you" />
  <HoldingsCard
    headerImage={require('../assets/jio-gold-logo.png')}
    heroLabel="Loan amount up to"
    heroValue="₹1,89,000"
    details={[
      { label: 'Interest', value: '12% p.a.' },
      { label: 'Tenure', value: '36 months' },
      { label: 'Processing fee', value: '₹499' },
      { label: 'APR', value: '15.47%' },
      { label: 'EMI', value: '₹6,277/m' },
    ]}
    selected
    onPress={() => {}}
    style={{ width: 328 }}
  />
  <HoldingsCard
    headerImage={require('../assets/jio-gold-logo.png')}
    heroLabel="Loan amount up to"
    heroValue="₹2,50,000"
    details={[
      { label: 'Interest', value: '13.5% p.a.' },
      { label: 'Tenure', value: '48 months' },
      { label: 'Processing fee', value: '₹999' },
      { label: 'APR', value: '16.2%' },
      { label: 'EMI', value: '₹6,768/m' },
    ]}
    selected={false}
    onPress={() => {}}
    style={{ width: 328 }}
  />
</VStack>
```

_From inContext: “The screen lists its offers and keeps one selected: each card’s onPress picks that offer, and its selected follows the screen’s choice.”_

### A gold holding: what you own today, with the current value as the hero, quantity and returns as terms, and no Radio (radio false).

```tsx
<HoldingsCard
  headerImage={require('../assets/jio-gold-logo.png')}
  heroLabel="Current value"
  heroValue="₹52,340"
  details={[
    { label: 'Quantity', value: '8.2 g' },
    { label: 'Bought at', value: '₹5,920/g' },
    { label: 'Returns', value: '+7.8%' },
  ]}
  radio={false}
  style={{ width: 328 }}
/>
```

_From content: “Holdings work the same way: the current value as the hero, with quantity and returns as terms.”_

### A loan offer with its footer: two links named for the next step and a one-word Apply action.

```tsx
<HoldingsCard
  headerImage={require('../assets/jio-gold-logo.png')}
  heroLabel="Loan amount up to"
  heroValue="₹1,89,000"
  details={[
    { label: 'Interest', value: '12% p.a.' },
    { label: 'Tenure', value: '36 months' },
    { label: 'Processing fee', value: '₹499' },
    { label: 'APR', value: '15.47%' },
    { label: 'EMI', value: '₹6,277/m' },
  ]}
  footer
  footerItems={[
    { label: 'Repayment', linkLabel: 'Schedule', onLinkPress: () => {} },
    { label: 'Charges', linkLabel: 'Details', onLinkPress: () => {} },
  ]}
  footerActionLabel="Apply"
  onFooterActionPress={() => {}}
  onPress={() => {}}
  style={{ width: 328 }}
/>
```

_From configuration: “footer adds a divider, footerItems as labelled links, and a small Apply button”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `headerImage` | `ImageSourcePropType` |  |  |  | evidence (2026-10-21) | None ships. Shown with contain, at the left, in a 100 × 23.69 box; an empty box of that size stays when it's left out. Declared: Source for the header image (e.g. bank logo). |
| `heroLabel` | `string` |  | `"Loan amount up-to"` |  | evidence (2026-10-21) | 12 px on a 16 px line, over heroValue; it wraps. Declared: Label text above the hero value (e.g. "Loan amount up-to"). Default "Loan amount up-to", from the component source. |
| `heroValue` | `string` |  | `"₹1,89,000"` |  | evidence (2026-10-21) | 20 px bold on a 24 px line, under heroLabel; it wraps. Declared: Main hero value string (e.g. "₹1,89,000"). Default "₹1,89,000", from the component source. |
| `details` | `HoldingsCardDetailItem[]` |  |  |  | evidence (2026-10-21) | Left out, the card shows five sample terms. Three to a row in equal columns, 12 px apart, with rows 16 px apart; a short row is padded. Declared: Array of detail items displayed in a 3-column grid below the hero. |
| `children` | `React.ReactNode` |  |  |  | evidence (2026-10-21) | Replaces the terms grid and gets the card's modes; the hero and the top right stay. Declared: Figma Slot — replaces the default details grid when provided. Additive; existing `details` callers are unchanged. |
| `radio` | `boolean` |  | `true` |  | evidence (2026-10-21) | false hides the whole top right: the Radio, a badgeLabel Badge, and a trailing component. Declared: Figma "Radio" boolean — shows/hides the header trailing. Defaults to `true` (same as the historical always-visible Radio). Default true, from the component source. |
| `trailing` | `React.ReactNode` |  |  |  | types | Figma Trailing instance-swap. When omitted, the legacy default `Radio` is rendered (wired to `selected` / `disabled`). Pass any node to override, or set `badgeLabel` to opt into the Figma Badge trailing. |
| `badgeLabel` | `string` |  |  |  | types | Opt into the Figma Badge trailing instead of the legacy Radio. Ignored when `trailing` is set. Omit to keep Radio (back-compat). |
| `footer` | `boolean` |  | `false` |  | types | Figma Footer boolean. When `true`, renders the footer (divider + default action row, or `footerSlot` when provided). Defaults to `false` so existing layouts are unchanged. Default false, from the component source. |
| `footerSlot` | `React.ReactNode` |  |  |  | evidence (2026-10-21) | Replaces the footer body below the divider. Declared: Full override for the footer body below the divider. Only rendered when `footer` is `true`. |
| `footerItems` | `HoldingsCardFooterItem[]` |  |  |  | evidence (2026-10-21) | Each item is a label over a Coin Link. Left out, the footer shows two placeholder links labelled “Link”. Declared: Default footer link columns (label + link). Ignored when `footerSlot` is set. |
| `footerActionLabel` | `string` |  | `"Apply"` |  | types | Label for the default footer action Button. Default "Apply", from the component source. |
| `onFooterActionPress` | `() => void` |  |  |  | types | Press handler for the default footer action Button. |
| `selected` | `boolean` |  | `false` |  | evidence (2026-10-21) | The card never changes selected itself: the screen sets it in onPress. Declared: Whether the radio button is selected (legacy default trailing). Default false, from the component source. |
| `disabled` | `boolean` |  | `false` |  | types | Whether the card / radio is disabled. Default false, from the component source. |
| `onPress` | `() => void` |  |  |  | evidence (2026-10-21) | The card fades to 0.75 opacity while pressed. Declared: Called when the card is pressed. The card does not toggle `selected` itself — the caller updates `selected`. |
| `accessibilityLabel` | `string` |  |  |  | types | Optional accessible name for the card root. |
| `modes` | `Modes` |  |  |  | evidence (2026-10-21) | The Radio and the footer's Divider take the card's modes. Declared: Modes object for design-token resolution. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | evidence (2026-10-21) | Applied last, after the card's own styles. Declared: Custom style for the outer container. |
| `testID` | `string` |  |  |  | types | Test ID for testing. |
| `disableTruncation` | `boolean` |  |  |  | evidence (2026-10-21) | Term labels (10 px) wrap; term values (12 px) end in an ellipsis unless disableTruncation lets them wrap. Declared: When `true`, disables text truncation: the trailing ellipsis (`…`) is never shown and any `numberOfLines` clamp is ignored, so the text wraps to as many lines as it needs even when horizontal space is tight. |
| `HoldingsCardDetailItem.label` | `string` |  |  | yes | types | A field of each details row. |
| `HoldingsCardDetailItem.value` | `string` |  |  | yes | types | A field of each details row. |
| `HoldingsCardFooterItem.label` | `string` |  |  | yes | types | A field of each footerItems row. |
| `HoldingsCardFooterItem.linkLabel` | `string` |  |  |  | types | A field of each footerItems row. |
| `HoldingsCardFooterItem.onLinkPress` | `() => void` |  |  |  | types | A field of each footerItems row. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Primary"` |  | evidence (2026-10-21) | Sets the panel's fill and stroke and the term labels' colour: Primary pale gold (#fef4e5), Secondary lilac (#f6f3ff), Neutral white with an #ebebed stroke (Figma's look), Tertiary light grey (#f5f5f5). The card's radius (16), 1 px stroke, padding (20 / 16) and gap (10) don't change with any mode. Declared: A token collection HoldingsCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `AppearanceSystem` | `mode collection` | positive, warning, negative | `"positive"` |  | types | A token collection HoldingsCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Badge Size` | `mode collection` | Medium, Small | `"Medium"` |  | types | A token collection HoldingsCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / Size` | `mode collection` | M, S, XS | `"M"` |  | types | A token collection HoldingsCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / State` | `mode collection` | Idle, Hover, Pressed, Disabled | `"Idle"` |  | types | A token collection HoldingsCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection HoldingsCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context` | `mode collection` | Default, Nudge&Alert, CTACard, ListItem | `"Default"` |  | types | A token collection HoldingsCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 10` | `mode collection` | Default, jioPlus | `"Default"` |  | types | A token collection HoldingsCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context2` | `mode collection` | Default, AppBar | `"Default"` |  | types | A token collection HoldingsCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Emphasis` | `mode collection` | High, Medium, Low | `"High"` |  | types | A token collection HoldingsCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection HoldingsCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Profile Card Appearance` | `mode collection` | Default, Premium | `"Default"` |  | types | A token collection HoldingsCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Semantic Intent` | `mode collection` | Brand, System | `"Brand"` |  | types | A token collection HoldingsCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Text Appearance` | `mode collection` | Neutral, Primary, Secondary, Tertiary, Success, Warning, Error | `"Neutral"` |  | types | A token collection HoldingsCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Text Sizes` | `mode collection` | Medium, Small, Large | `"Medium"` |  | types | A token collection HoldingsCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Weight` | `mode collection` | Medium, Regular, Bold | `"Medium"` |  | types | A token collection HoldingsCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `details` | `HoldingsCardDetailItem[]` |  |  |  | types | A structured slot: an array of HoldingsCardDetailItem rows. Array of detail items displayed in a 3-column grid below the hero. |
| `children` | `React.ReactNode` |  |  |  | types | Figma Slot — replaces the default details grid when provided. Additive; existing `details` callers are unchanged. |
| `trailing` | `React.ReactNode` |  |  |  | types | Figma Trailing instance-swap. When omitted, the legacy default `Radio` is rendered (wired to `selected` / `disabled`). Pass any node to override, or set `badgeLabel` to opt into the Figma Badge trailing. |
| `footerSlot` | `React.ReactNode` |  |  |  | types | Full override for the footer body below the divider. Only rendered when `footer` is `true`. |
| `footerItems` | `HoldingsCardFooterItem[]` |  |  |  | types | A structured slot: an array of HoldingsCardFooterItem rows. Default footer link columns (label + link). Ignored when `footerSlot` is set. |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onFooterActionPress` | `() => void` |  |  |  | types | Press handler for the default footer action Button. |
| `onPress` | `() => void` |  |  |  | types | Called when the card is pressed. The card does not toggle `selected` itself — the caller updates `selected`. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- At 328 px wide the card is about 7 px taller than Figma's (207.69 against 201): its hero line is 44 px against 42, its term rows 31 against 30, plus the border. _(evidence, 2026-10-21)_
- The package's default top right is a Radio, where Figma's Holdings Card defaults to a Badge (reported in #362). _(evidence, 2026-10-21)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/avoidWhen` · trace-check: The guide gives no avoidWhen guidance; left empty rather than guessed.
- `/accessibility` · trace-check: The guide gives no accessibility guidance; left empty rather than guessed.
- `/examples/1` · cross-check: misreads-source: The gold-holding example has no onPress. The guide says "A card without onPress is disabled too". The evidence's Limits say not to imply "that a card without onPress works", and its Hosting gives every card onPress. So this example renders as a disabled button, which the guide's Gold holding example is not.
- `/states/2` · cross-check: lost-context: The Disabled state says it comes only from `disabled`. The guide also says "A card without onPress is disabled too, and then its footer links and button don't respond to clicks either", which is the condition most likely to catch an agent out.
- `(whole entry)` · human: The guide and its evidence were checked on 21 October on 0.1.78-c7d3348 and not re-checked on the installed build, dbe0e02, which changed HoldingsCard for #362 (a white card and a dark badge by default, a gold Apply that takes the card's modes, purple links, a working footer without onPress, a width that fills a stretching host up to 328). This entry follows the installed package and leaves out the guide sentences dbe0e02 contradicts (listed in its notes). Re-extract once #362 is fixed and the guide is re-checked and published. Added by Claude Code in the overnight run agentpack-batch2, for Marcin to confirm.
