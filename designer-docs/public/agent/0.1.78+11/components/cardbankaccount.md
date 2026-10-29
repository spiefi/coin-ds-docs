# CardBankAccount

> Coin agent pack 0.1.78+11 (pilot). Generated from `components/cardbankaccount.json`; the JSON is the source of truth.

- **State:** flagged (2 flags, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `e7ed622` · built 2026-10-29T04:05:26Z
- **Category:** card (for discovery only, not a limit on composition) · **Tags:** bank account card, linked account, account summary, account details
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=cardbankaccount) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3762-2459) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-cardbankaccount--docs)

Use a Card Bank Account to summarise one linked bank account: the bank, a few facts such as the masked number, and one action.

## Use when

- **recommended** Summarise one linked bank account: the bank, a few facts such as the masked number, and one action.  
  _From summary: “Use a Card Bank Account to summarise one linked bank account: the bank, a few facts such as the masked number, and one action.”_

## Avoid when

_None in the guide._

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Institution | institutionName and institutionAvatar: the bank's logo and name. | no | anatomy: “institutionName and institutionAvatar: the bank’s logo and name.” |
| Badge | badge: one word about the account, such as its status. | no | anatomy: “badge: one word about the account, such as its status.” |
| Label | Each row's field name, in 14 px bold; it wraps when space runs out. | no | anatomy: “A field name in 14 px bold; it wraps when space runs out.” |
| Value | Each row's fact, on one line. | no | anatomy: “The fact in 14 px, on one line.” |
| Button | A small Button from buttonLabel and onButtonPress, full width. | no | anatomy: “A small Button from buttonLabel and onButtonPress, full width.” |
| Panel | A white panel with 16 px corners and 16 by 12 px padding. | yes | anatomy: “A white panel with 16 px corners and 16 by 12 px padding.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `badge` | `ReactNode` | types |
| `headerSlot` | `ReactNode` | types |
| `items` | `CardBankAccountItem` | types |
| `children` | `ReactNode` | types |
| `footer` | `ReactNode` | types |

## Placement

- **recommended** The card fills its host's width, so the screen sets it; Figma draws it at 292 px.  
  _From sizing: “The card fills its host’s width; Figma draws it at 292 px.”_
- **recommended** Its height follows the rows: each is 17 px, 12 px apart.  
  _From sizing: “Height follows the rows: each is 17 px, 12 px apart.”_
- **recommended** The panel is padded 16 px top and bottom and 12 px at the sides, with 16 px between the header, the rows and the button.  
  _From sizing: “The panel is padded 16 px top and bottom and 12 px at the sides, with 16 px between the header, the rows, and the button.”_
- **recommended** In the guide, the Bank accounts screen in Settings shows the linked account with the card.  
  _From inContext: “The Bank accounts screen shows the linked account.”_
- **recommended** `onButtonPress`: The button runs the screen's own action through onButtonPress (in the guide, View statement opens the screen's statement view); the card doesn't fetch the account or change it.  
  _From inContext: “View statement opens the screen’s own statement view through onButtonPress; the card doesn’t fetch the account or change it.”_

## Configuration

- **recommended** `badge`: badge takes a word, which becomes a Badge in the button's colours, or a Badge you set up yourself, such as a green status; leave it out for none.  
  _From configuration: “badge takes a word, which becomes a Badge in the button’s colours, or a Badge you set up yourself, such as a green status; leave it out for none.”_
- **recommended** `badge`: For a status badge, a Badge with Semantic Intent System and AppearanceSystem positive turns green.  
  _From configuration: “A Badge with Semantic Intent System and AppearanceSystem positive turns green.”_
- **recommended** `badge`: Leave badge out for no badge; the bank's name then has the row.  
  _From configuration: “Leave badge out; the bank’s name has the row.”_
- **recommended** `AppearanceBrand`: AppearanceBrand and Emphasis colour the footer button and a word badge; the card's defaults, Secondary at Medium emphasis, are light purple.  
  _From configuration: “AppearanceBrand and Emphasis colour the footer button and a word badge; the defaults, Secondary at Medium emphasis, are light purple.”_
- **recommended** `Emphasis`: Emphasis, with AppearanceBrand, colours the footer button and a word badge; the card's default is Medium.  
  _From configuration: “AppearanceBrand and Emphasis colour the footer button and a word badge; the defaults, Secondary at Medium emphasis, are light purple.”_
- **recommended** AppearanceBrand and Emphasis don't change the panel or the rows.  
  _From configuration: “The panel and the rows don’t change.”_
- **recommended** `AppearanceBrand` = `Secondary`: Secondary, the card's default: a light purple button and badge.  
  _From configuration: “A light purple button and badge.”_
- **recommended** `AppearanceBrand` = `Primary`: Primary: a light gold button and badge.  
  _From configuration: “Light gold.”_
- **recommended** `AppearanceBrand` = `Neutral`: Neutral: a dark grey button and a light grey badge.  
  _From configuration: “A dark grey button and a light grey badge.”_
- **recommended** `AppearanceBrand` = `Tertiary`: Tertiary: a blue button and a light blue badge.  
  _From configuration: “A blue button and a light blue badge.”_
- **recommended** `Emphasis` = `High`: Emphasis High: solid purple, the strongest call.  
  _From configuration: “Solid purple, the strongest call.”_
- **recommended** `Emphasis` = `Medium`: Emphasis Medium, the card's default: light purple.  
  _From configuration: “Light purple.”_
- **recommended** `Emphasis` = `Low`: Emphasis Low: a text button and a pale badge.  
  _From configuration: “A text button and a pale badge.”_
- **recommended** `headerSlot`: headerSlot replaces the whole header.  
  _From configuration: “headerSlot replaces the whole header, children replace the rows, and footer replaces the button.”_
- **recommended** `children`: children replace the rows.  
  _From configuration: “headerSlot replaces the whole header, children replace the rows, and footer replaces the button.”_
- **recommended** `footer`: footer replaces the button.  
  _From configuration: “headerSlot replaces the whole header, children replace the rows, and footer replaces the button.”_
- **recommended** `footer` = `false`: footer={false} removes the button, for a summary to read.  
  _From states: “footer={false} removes it for a summary to read.”_
- **REQUIRED** `buttonLabel`: To show the footer button, set buttonLabel: the default button is hidden when it is omitted or empty.  
  _From fact `/facts/props/7` (buttonLabel, source types)_
- **REQUIRED** `institutionName`: With the default header, set institutionName: omitted or empty, the header has no bank name, as there is no placeholder (headerSlot replaces the header instead).  
  _From fact `/facts/props/1` (institutionName, source types)_
- **recommended** `items`: items gives one row per entry, a label and a value; omit it, or pass an empty list, for no rows. There is no placeholder copy.  
  _From fact `/facts/props/5` (items, source types)_
- **recommended** `buttonDisabled`: buttonDisabled disables the default footer button; it is ignored when footer is provided.  
  _From fact `/facts/props/9` (buttonDisabled, source types)_
- **recommended** `disableTruncation` = `true`: disableTruncation lets the header name, the badge, the row values and the default footer button wrap instead of ending in an ellipsis.  
  _From fact `/facts/props/13` (disableTruncation, source types)_
- **recommended** `modes`: The card's own defaults are Button / Size S, AppearanceBrand Secondary and Emphasis Medium; modes you pass are merged on top, and the same modes reach the badge, the button and the slots.  
  _From fact `/facts/props/11` (modes, source evidence)_
- **recommended** `Button / Size`: Button / Size S, the card's default, makes a 32 px button; M makes it 42 px and XS 24 px.  
  _From sizing: “Button / Size S, the default, is 32 px tall; M is 42 and XS 24.”_
- **recommended** `Avatar Size` = `L`: Avatar Size L makes the logo 42 px.  
  _From sizing: “Avatar Size L makes the logo 42 px.”_
- **recommended** `List Item Style` = `Minimal`: List Item Style Minimal tightens the rows to 4 px apart, with 12 px regular labels.  
  _From sizing: “List Item Style Minimal tightens the rows to 4 px apart with 12 px regular labels.”_

## Content

- **recommended** One account, a few facts, one action.  
  _From corePrinciple: “One account, a few facts, one action.”_
- **recommended** `items`: Label each row with a field name, such as Account type, and give the fact as its value.  
  _From content: “Label each row with a field name, such as Account type, and give the fact as its value.”_
- **REQUIRED** `items`: Show only the last four digits of the account number, such as “•••• 4521”.  
  _From content: “Show only the last four digits of the account number.”_
- **discouraged** `items`: Do not show the full account number: anyone near the screen can read it.  
  _From doDont: “Anyone near the screen can read it.”_
- **recommended** `items`: Keep values short.  
  _From content: “Keep values short”_
- **discouraged** `items`: Do not give a sentence as a value, such as “Savings account with auto-sweep”.  
  _From doDont: “A sentence as a value”_
- **recommended** `buttonLabel`: Label the button with a verb, such as “View statement”.  
  _From content: “Label the button with a verb, such as View statement”_
- **recommended** `institutionAvatar`: Pass the bank's own logo through institutionAvatar.  
  _From content: “and pass the bank’s own logo.”_
- **discouraged** `institutionAvatar`: Do not leave out the logo: institutionAvatar shows the bank's own mark.  
  _From doDont: “Leave out the logo”_

Good: “Jio Payments Bank”, “Active”, “Account type”, “Savings”, “Account number”, “•••• 4521”, “IFSC”, “JIOP0000001”, “Last updated”, “Today, 9:14 AM”, “View statement”

Bad: “123456784521”, “Savings account with auto-sweep”

## States

| State | When | From |
| --- | --- | --- |
| With an action | The card itself isn't pressable: the footer button is its one action, with the Button's own hover and pressed colours. | states: “The card itself isn’t pressable: the footer button is its one action, with the Button’s own hover and pressed colours.” |
| Read only | footer={false}: no button, a summary to read. | states: “footer={false} removes it for a summary to read.” |
| Button disabled | buttonDisabled: the default footer button is disabled; ignored when footer is provided. | fact `/facts/props/9` (buttonDisabled, source types) |

## Accessibility

- **recommended** `accessibilityLabel`: accessibilityLabel labels the card region; without it, the card is named by institutionName.  
  _From fact `/facts/props/0` (accessibilityLabel, source evidence)_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Mask the account number | The full account number | Anyone near the screen can read it. |
| Pass the bank’s logo | Leave out the logo | institutionAvatar shows the bank’s own mark. |
| Short values | A sentence as a value | Each label and value fits on one line. |

## Examples

### A linked savings account with four facts, the number masked, a green Active status Badge, and View statement as its one action; named for screen readers by the account.

```tsx
<CardBankAccount
  institutionName="Jio Payments Bank"
  institutionAvatar={require('../assets/jio-gold-logo.png')}
  badge={<Badge label="Active" modes={{ 'Semantic Intent': 'System', AppearanceSystem: 'positive' }} />}
  items={[
    { label: 'Account type', value: 'Savings' },
    { label: 'Account number', value: '•••• 4521' },
    { label: 'IFSC', value: 'JIOP0000001' },
    { label: 'Last updated', value: 'Today, 9:14 AM' },
  ]}
  buttonLabel="View statement"
  onButtonPress={() => {}}
  accessibilityLabel="Jio Payments Bank savings account ending 4521"
/>
```

_From content: “Field names on the left, short facts on the right, the number masked.”_

### Read only: footer={false} removes the button, leaving a summary to read.

```tsx
<CardBankAccount
  institutionName="Jio Payments Bank"
  institutionAvatar={require('../assets/jio-gold-logo.png')}
  badge={<Badge label="Active" modes={{ 'Semantic Intent': 'System', AppearanceSystem: 'positive' }} />}
  items={[
    { label: 'Account type', value: 'Savings' },
    { label: 'Account number', value: '•••• 4521' },
    { label: 'Last updated', value: 'Today, 9:14 AM' },
  ]}
  footer={false}
  accessibilityLabel="Jio Payments Bank savings account ending 4521"
/>
```

_From states: “No button: a summary to read.”_

### On the guide's Bank accounts screen in Settings, under the page's heading: View statement opens the screen's own statement view through onButtonPress.

```tsx
<VStack>
  <Title title="Bank accounts" subtitle="Used for UPI payments and transfers" />
  <CardBankAccount
    institutionName="Jio Payments Bank"
    institutionAvatar={require('../assets/jio-gold-logo.png')}
    badge={<Badge label="Active" modes={{ 'Semantic Intent': 'System', AppearanceSystem: 'positive' }} />}
    items={[
      { label: 'Account type', value: 'Savings' },
      { label: 'Account number', value: '•••• 4521' },
      { label: 'Last updated', value: 'Today, 9:14 AM' },
    ]}
    buttonLabel="View statement"
    onButtonPress={() => {}}
    accessibilityLabel="Jio Payments Bank savings account ending 4521"
  />
</VStack>
```

_From inContext: “View statement opens the screen’s own statement view through onButtonPress; the card doesn’t fetch the account or change it.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `accessibilityLabel` | `string` |  |  |  | evidence (2026-10-19) | Defaults to institutionName. Declared: Accessibility label for the card region. |
| `institutionName` | `string` |  | `""` |  | types | Institution name shown in the header next to the avatar. Omit it, or pass an empty string, and the header has no placeholder bank name. Pass `headerSlot` to replace the header entirely. Default "", from the component source. |
| `institutionAvatar` | `UnifiedSource` |  |  |  | types | Avatar source for the institution. Forwarded to the underlying `InstitutionBadge`. Accepts any {@link UnifiedSource}. |
| `badge` | `React.ReactNode \| string \| false \| null` |  |  |  | evidence (2026-10-19) | A word becomes a Badge with the card's modes; a Badge you pass is given the card's modes with its own on top, so a status Badge keeps its green while the button stays purple. Declared: Header badge. Pass a string to render the default `Badge` with that label, or a custom `ReactNode` for full control. Pass `false`/`null` to hide the badge entirely. |
| `headerSlot` | `React.ReactNode` |  |  |  | types | Override the entire header. When provided, replaces the default `InstitutionBadge` + `Badge` row. |
| `items` | `CardBankAccountItem[]` |  |  |  | types | Data rows shown in the middle. Each entry renders a left-aligned label and a right-aligned value. Omit the prop, or pass an empty list, for no rows. There is no placeholder copy. |
| `children` | `React.ReactNode` |  |  |  | types | Custom content slot rendered between the header and the footer. Overrides `items` when provided. |
| `buttonLabel` | `string` |  |  |  | types | Footer button label. The default button is hidden when this is omitted or empty, so an untouched card does not say "Button". Ignored when `footer` is provided. |
| `onButtonPress` | `() => void` |  |  |  | types | Footer button press handler. Ignored when `footer` is provided. |
| `buttonDisabled` | `boolean` |  |  |  | types | Disables the default footer button. Ignored when `footer` is provided. |
| `footer` | `React.ReactNode \| false \| null` |  |  |  | types | Override the footer. Pass a `ReactNode` for full control or `false`/`null` to hide it entirely. |
| `modes` | `Modes` |  |  |  | evidence (2026-10-19) | The card's defaults (Button / Size S, AppearanceBrand Secondary, Emphasis Medium) sit under the modes you pass, and the same modes go to the badge, the button and the slots; the card itself doesn't read the theme provider. Declared: Design token modes for theming (e.g. `{ 'Color Mode': 'Light' }`). Defaults to `{ 'Button / Size': 'S', AppearanceBrand: 'Secondary', Emphasis: 'Medium' }` so the footer button matches the Figma reference out of the box. Caller-supplied modes are merged on top and can override any of the default keys. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Container style override. |
| `disableTruncation` | `boolean` |  |  |  | types | When `true`, disables text truncation: the trailing ellipsis (`…`) is never shown and any `numberOfLines` clamp is ignored, so the text wraps to as many lines as it needs even when horizontal space is tight. Reaches the header name, the badge, row values, and the default footer button. |
| `CardBankAccountItem.label` | `string` |  |  | yes | types | Left-aligned label text (e.g. "Account type"). A field of each items row. |
| `CardBankAccountItem.value` | `React.ReactNode` |  |  | yes | types | Right-aligned value. Strings render through the `text/*` design tokens. Pass any `ReactNode` to fully customise the value (e.g. obfuscated account numbers, masked dots, icons). A field of each items row. |
| `...CardBankAccountBaseProps` | `CardBankAccountBaseProps` |  |  |  | types | Inherited React Native props the component also accepts. They are not part of the design contract and no guide documents them. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Primary"` |  | evidence (2026-10-19) | With Emphasis, colours the footer button and a word badge. At Medium: Secondary (the card's default) light purple, Primary light gold, Neutral a dark grey button and a light grey badge, Tertiary a blue button and a light blue badge. Declared: A token collection CardBankAccount reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `AppearanceSystem` | `mode collection` | positive, warning, negative | `"positive"` |  | evidence (2026-10-19) | With Semantic Intent System on the card: positive green, warning orange, negative red, on the footer button. Declared: A token collection CardBankAccount reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Avatar Size` | `mode collection` | L, M, S, XS | `"L"` |  | evidence (2026-10-19) | L makes the bank's logo 42 px. Declared: A token collection CardBankAccount reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Badge Size` | `mode collection` | Medium, Small | `"Medium"` |  | evidence (2026-10-19) | Small makes the badge's text 10 px on a 12 px line. Declared: A token collection CardBankAccount reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / Size` | `mode collection` | M, S, XS | `"M"` |  | evidence (2026-10-19) | The footer button's height: S 32 px (the card's default), M 42, XS 24. Declared: A token collection CardBankAccount reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / State` | `mode collection` | Idle, Hover, Pressed, Disabled | `"Idle"` |  | types | A token collection CardBankAccount reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection CardBankAccount reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context` | `mode collection` | Default, Nudge&Alert, CTACard, ListItem | `"Default"` |  | types | A token collection CardBankAccount reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 10` | `mode collection` | Default, jioPlus | `"Default"` |  | types | A token collection CardBankAccount reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context2` | `mode collection` | Default, AppBar | `"Default"` |  | types | A token collection CardBankAccount reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context4` | `mode collection` | Default, Chip, Button, Badge, Badge/glass | `"Default"` |  | types | A token collection CardBankAccount reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context5` | `mode collection` | Default, Fullscreen Modal, Mode 1 | `"Default"` |  | types | A token collection CardBankAccount reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Emphasis` | `mode collection` | High, Medium, Low | `"High"` |  | evidence (2026-10-19) | With AppearanceBrand, colours the footer button and a word badge: High a solid button with a white label, Medium (the card's default) light, Low a transparent button and a pale badge. Declared: A token collection CardBankAccount reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `List Item Style` | `mode collection` | Default, Boxed, Minimal | `"Default"` |  | evidence (2026-10-19) | Minimal sets the rows 4 px apart, with 12 px regular labels. Declared: A token collection CardBankAccount reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection CardBankAccount reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Profile Card Appearance` | `mode collection` | Default, Premium | `"Default"` |  | types | A token collection CardBankAccount reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Semantic Intent` | `mode collection` | Brand, System | `"Brand"` |  | evidence (2026-10-19) | System, with AppearanceSystem, turns the card's footer button green, orange or red. Declared: A token collection CardBankAccount reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Text Appearance` | `mode collection` | Neutral, Primary, Secondary, Tertiary, Success, Warning, Error | `"Neutral"` |  | types | A token collection CardBankAccount reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Text Sizes` | `mode collection` | Medium, Small, Large | `"Medium"` |  | evidence (2026-10-19) | Changes the size of the row values' text. Declared: A token collection CardBankAccount reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Weight` | `mode collection` | Medium, Regular, Bold | `"Medium"` |  | evidence (2026-10-19) | Changes the weight of the row values' text. Declared: A token collection CardBankAccount reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `badge` | `React.ReactNode \| string \| false \| null` |  |  |  | types | Header badge. Pass a string to render the default `Badge` with that label, or a custom `ReactNode` for full control. Pass `false`/`null` to hide the badge entirely. |
| `headerSlot` | `React.ReactNode` |  |  |  | types | Override the entire header. When provided, replaces the default `InstitutionBadge` + `Badge` row. |
| `items` | `CardBankAccountItem[]` |  |  |  | types | A structured slot: an array of CardBankAccountItem rows. Data rows shown in the middle. Each entry renders a left-aligned label and a right-aligned value. Omit the prop, or pass an empty list, for no rows. There is no placeholder copy. |
| `children` | `React.ReactNode` |  |  |  | types | Custom content slot rendered between the header and the footer. Overrides `items` when provided. |
| `footer` | `React.ReactNode \| false \| null` |  |  |  | types | Override the footer. Pass a `ReactNode` for full control or `false`/`null` to hide it entirely. |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onButtonPress` | `() => void` |  |  |  | types | Footer button press handler. Ignored when `footer` is provided. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- Figma's badge is amber, a colour the package tokens don't have; the package's word badge takes the button's colours, light purple by default (#344). _(evidence, 2026-10-19)_
- Rows are 17 px tall in code against Figma's 16, so at 292 px wide the card is 207 px tall against Figma's 204. _(evidence, 2026-10-19)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/avoidWhen` · trace-check: The guide gives no avoidWhen guidance; left empty rather than guessed.
- `(whole entry)` · human: The guide and its evidence were checked on 19 October on 0.1.78-a116616. The installed build, dbe0e02, changed CardBankAccount for #344 (a monogram instead of the stock photo, no placeholder copy, buttonDisabled, a long value cut before its label, 12 px values), and the guide's copy waits for #344's own publish (evidence, 28 October). This entry follows the installed package and leaves out the guide sentences dbe0e02 contradicts (listed in its notes). Re-extract after #344 is published. Added by Claude Code in the overnight run agentpack-batch2, for Marcin to confirm.
