# ExpandableCheckbox

> Coin agent pack 0.1.78+8 (pilot). Generated from `components/expandablecheckbox.json`; the JSON is the source of truth.

- **State:** documented
- **Package:** jfs-components 0.1.78 · guide commit `e7ed622` · built 2026-10-29T01:27:42Z
- **Category:** input (for discovery only, not a limit on composition) · **Tags:** consent, terms checkbox, read more, agreement
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=expandablecheckbox) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4514-5767) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-expandablecheckbox--docs)

Use an Expandable Checkbox for one consent whose text is too long for a line, such as agreeing to share KYC details.

## Use when

- **recommended** One consent whose text is too long for a line, such as agreeing to share KYC details.  
  _From summary: “Use an Expandable Checkbox for one consent whose text is too long for a line, such as agreeing to share KYC details.”_
- **recommended** A long consent: one collapsed line keeps the screen calm, and Read more shows the rest.  
  _From doDont: “One line keeps the screen calm; Read more shows the rest.”_

## Avoid when

- **discouraged** A short option: Read more would open the same words. Use a Checkbox Item. Use instead: `CheckboxItem`.  
  _From doDont: “Read more opens the same words. Use a Checkbox Item.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Checkbox | The box: ticking it gives consent; pressing the label or the row ticks it too. | yes | anatomy: “Ticking it gives consent; the label and row tick it too.” |
| Label | label, the consent phrase, cut to one line with an ellipsis when long. | yes | anatomy: “The consent phrase, cut to one line with an ellipsis when long.” |
| Terms link | Optional (linkLabel): opens the document; pressing it doesn't tick the box. | no | anatomy: “Opens the document; pressing it doesn’t tick the box.” |
| Read more | The toggle at the end of the row: shows the full text and never ticks the box. | yes | anatomy: “Shows the full text; it never ticks the box.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `children` | `ReactNode` | types |

## Placement

- **recommended** The row fills its container.  
  _From sizing: “The row fills its container.”_
- **recommended** Idle, the row is 24 px tall (the guide measures “I agree” with its Terms link), with Read more hugging the end 8 px after the checkbox item.  
  _From sizing: “Idle it is 24 px tall, with Read more hugging the end 8 px after the checkbox item.”_
- **recommended** Open, Read less sits 8 px below the text, and text taller than 450 px scrolls inside the row.  
  _From sizing: “Open, Read less sits 8 px below the text, and text taller than 450 px scrolls inside the row.”_
- **recommended** Open, the sentence wraps inside the row.  
  _From sources: “an open sentence wraps inside the row”_
- **recommended** In narrow rows, “I agree” with its Terms link stops fitting one line below about 295 px: the link wraps under “I agree” and the row grows to 38 px.  
  _From sizing: “Below about 295 px, the link wraps under “I agree” and the row grows to 38 px.”_
- **recommended** One row per agreement.  
  _From inContext: “One row per agreement.”_
- **recommended** `checked`: The screen keeps each row's checked state (checked with onValueChange); on the guide's account-opening screen, it enables Open account only after the required consent is ticked.  
  _From inContext: “The screen keeps each row’s checked state and enables Open account only after the required consent”_
- **recommended** `expanded`: Each row opens and closes on its own.  
  _From inContext: “each row opens and closes on its own.”_

## Configuration

- **recommended** Checked and Open are separate: ticking the box doesn't open the text, and Read more doesn't tick the box.  
  _From states: “Ticking the box doesn’t open the text, and Read more doesn’t tick the box.”_
- **recommended** `collapsedLines` = `2`: When Idle, the label shows one line by default; show two (collapsedLines 2) when the first line alone doesn't make sense.  
  _From configuration: “When Idle, the label shows one line by default; show two when the first line alone doesn’t make sense.”_
- **recommended** `label`: A long consent shows one line and an ellipsis when Idle, and the link moves to its own line.  
  _From configuration: “One line and an ellipsis; the link moves to its own line.”_
- **recommended** `onLinkPress`: Pair linkLabel with onLinkPress: the row leaves opening the document to the screen.  
  _From fact `/facts/props/2` (onLinkPress, source evidence)_
- **recommended** `disabled` = `true`: Set disabled to dim the row and stop the box changing; Read more still opens the text, so people can read what they agreed to.  
  _From states: “Disabled dims the row and stops the box changing, but Read more still opens the text so people can read what they agreed to.”_
- **REQUIRED** `children`: children replaces the label and the link: when children is given, label and linkLabel are ignored, and the row's modes reach the children.  
  _From fact `/facts/props/3` (children, source evidence)_
- **REQUIRED** `disableTruncation` = `true`: disableTruncation true turns off the Idle clamp: no ellipsis, and collapsedLines is ignored, so the label wraps in full.  
  _From fact `/facts/props/14` (disableTruncation, source evidence)_
- **recommended** The row forces its toggle Button to Button / Size XS, AppearanceBrand Secondary and Emphasis Low.  
  _From evidence: “The toggle Button's size, appearance, and emphasis are forced (XS, Secondary, Low).”_
- **recommended** `Weight`: Figma and the package both set the label in regular weight.  
  _From sources: “Figma and the package both set the label in regular weight.”_

## Content

- **recommended** Ticking gives consent; Read more only shows the words.  
  _From corePrinciple: “Ticking gives consent; Read more only shows the words.”_
- **recommended** `label`: Write the consent as the label and name the document in the link.  
  _From configuration: “Write the consent as the label and name the document in the link.”_
- **recommended** `label`: Start the label with the consent, in sentence case without a full stop.  
  _From content: “Start the label with the consent, in sentence case without a full stop.”_
- **recommended** `linkLabel`: Name the document in the link.  
  _From content: “Name the document in the link.”_
- **recommended** `readMoreLabel`: Rename the toggles only in pairs (readMoreLabel with readLessLabel), and keep them short, such as “Show terms” and “Hide terms”.  
  _From content: “Rename the toggles only in pairs, and keep them short, such as “Show terms” and “Hide terms”.”_
- **recommended** `readMoreLabel`: Name the toggle Read more: people know it opens the text.  
  _From doDont: “People know it opens the text.”_
- **discouraged** `readMoreLabel`: Do not put the document on the toggle: “Terms & Conditions” on the button only opens the row, and squeezes the label.  
  _From doDont: ““Terms & Conditions” on the button only opens the row, and squeezes the label.”_
- **recommended** Give each agreement its own row: people can accept one without the other.  
  _From doDont: “People can accept one without the other.”_
- **discouraged** `label`: Do not merge agreements into one row: one tick accepts them all (all three, in the guide's example).  
  _From doDont: “One tick accepts all three.”_

Good: “I agree to share my KYC details with Jio Payments Bank to verify my identity and open this account.”, “Terms”, “I agree”, “Terms & Conditions”, “I agree to share my KYC details”, “KYC terms”, “Read more”, “Read less”, “Show terms”, “Hide terms”

Bad: “Email me offers”, “I agree to share my KYC details, get offers on WhatsApp, and receive marketing calls”

## States

| State | When | From |
| --- | --- | --- |
| Idle | The default (checked and expanded false): unticked, one line, Read more. | states: “The default: unticked, one line, Read more.” |
| Checked | checked (or defaultChecked) true: a purple box records consent; the text stays collapsed. | states: “A purple box records consent; the text stays collapsed.” |
| Open | expanded (or defaultExpanded) true: the text opens above Read less, which moves to the right. | states: “The text opens above Read less, which moves to the right.” |
| Disabled | disabled true: dimmed; it can't be ticked or unticked, but Read more still opens the text. | states: “Dimmed; it can’t be ticked or unticked, but Read more still opens the text.” |

## Accessibility

- **recommended** On the web the row is one checkbox that announces whether it is ticked, Read more announces whether the text is open, and Enter or Space ticks or unticks the box once.  
  _From sources: “On the web the row is one checkbox that announces whether it is ticked, Read more announces whether the text is open, and Enter or Space ticks or unticks the box once.”_
- **recommended** `onLinkPress`: The Terms link opens with the keyboard.  
  _From sources: “The Terms link opens with the keyboard”_
- **recommended** One checkbox Tab stop per row; Tab goes from the box to the link, then to Read more.  
  _From evidence: “One checkbox Tab stop per row; Tab goes box → link → Read more.”_
- **recommended** `accessibilityLabel`: accessibilityLabel names the checkbox; without it, the row is named from its label.  
  _From fact `/facts/props/18` (accessibilityLabel, source types)_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Collapse long consent | Use it for a short option | Read more opens the same words. Use a Checkbox Item. |
| Name the toggle Read more | Put the document on the toggle | “Terms & Conditions” on the button only opens the row, and squeezes the label. |
| Give each agreement its own row | Merge agreements | One tick accepts all three. |

## Examples

### The required KYC consent before opening an account: the screen keeps the row's checked state and enables Open account only once the consent is ticked (shown unticked, so the Button is disabled).

```tsx
<VStack>
  <ExpandableCheckbox
    label="I agree to share my KYC details with Jio Payments Bank to verify my identity and open this account."
    linkLabel="Terms"
    onLinkPress={() => {}}
    checked={false}
    onValueChange={() => {}}
  />
  <Button label="Open account" disabled onPress={() => {}} />
</VStack>
```

_From inContext: “The screen keeps each row’s checked state and enables Open account only after the required consent”_

### A long consent that shows two lines before Read more (collapsedLines 2), for when the first line alone doesn't make sense.

```tsx
<ExpandableCheckbox
  label="I agree to share my KYC details with Jio Payments Bank to verify my identity and open this account."
  linkLabel="Terms"
  onLinkPress={() => {}}
  collapsedLines={2}
  onValueChange={() => {}}
/>
```

_From configuration: “show two when the first line alone doesn’t make sense.”_

### Toggles renamed as a short pair, “Show terms” and “Hide terms”, on the long KYC consent.

```tsx
<ExpandableCheckbox
  label="I agree to share my KYC details with Jio Payments Bank to verify my identity and open this account."
  linkLabel="Terms"
  onLinkPress={() => {}}
  readMoreLabel="Show terms"
  readLessLabel="Hide terms"
  onValueChange={() => {}}
/>
```

_From content: “Rename the toggles only in pairs, and keep them short, such as “Show terms” and “Hide terms”.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `label` | `string` |  | `""` |  | types | Primary label rendered next to the checkbox (Figma `Text` instance). Ignored when {@link children} is provided. Default "", from the component source. |
| `linkLabel` | `string` |  |  |  | types | Optional underlined link rendered after {@link label} (Figma `Link` instance, e.g. "Terms & Conditions"). Ignored when {@link children} is provided. |
| `onLinkPress` | `(event: GestureResponderEvent) => void` |  |  |  | evidence (2026-10-13) | Enter on the Terms link calls onLinkPress once and doesn't tick the box. Declared: Press handler for {@link linkLabel}. Navigation is left to the consumer. |
| `children` | `React.ReactNode` |  |  |  | evidence (2026-10-06) | Children wrap but are not clamped when Idle. Declared: Full label-slot override matching the Figma Checkbox Item `slot`. When provided, {@link label} / {@link linkLabel} are ignored and `modes` are cascaded into the slot children. Prefer this for fully custom label compositions. |
| `checked` | `boolean` |  |  |  | types | Whether the checkbox is checked (controlled). |
| `defaultChecked` | `boolean` |  | `false` |  | types | Initial checked state (uncontrolled). Default false, from the component source. |
| `onValueChange` | `(checked: boolean) => void` |  |  |  | evidence (2026-10-27) | Space and Enter each tick or untick the box with one onValueChange per press, controlled or not, open or closed; the Terms link and Read more / Read less never tick it. Declared: Callback fired when the checked state changes. |
| `expanded` | `boolean` |  |  |  | types | Whether the row is expanded to reveal the full label (controlled). |
| `defaultExpanded` | `boolean` |  | `false` |  | types | Initial expanded state (uncontrolled). Defaults to `false` (Idle). Default false, from the component source. |
| `onExpandedChange` | `(expanded: boolean) => void` |  |  |  | types | Callback fired when the expanded state changes. |
| `disabled` | `boolean` |  | `false` |  | evidence (2026-10-13) | The row is exposed as disabled and can't be ticked, but Read more stays enabled and opens the text. Declared: Dims the row and blocks the checkbox and terms link. The disclosure toggle still opens so the consent can be read. Default false, from the component source. |
| `readMoreLabel` | `string` |  | `"Read more"` |  | evidence (2026-10-06) | A long toggle label squeezes the checkbox item: a 236 px button leaves the item 84 px and stacks the label and link. Declared: Label for the toggle button shown when the row is collapsed. Default "Read more", from the component source. |
| `readLessLabel` | `string` |  | `"Read less"` |  | types | Label for the toggle button shown when the row is expanded. Default "Read less", from the component source. |
| `collapsedLines` | `number` |  | `1` |  | evidence (2026-10-06) | Clamps the label only: the link is outside the clamp, so a long label puts the link on a second line (the Idle row is then 38 px tall). Declared: Number of lines to show when collapsed. Defaults to `1`. Default 1, from the component source. |
| `disableTruncation` | `boolean` |  | `false` |  | evidence (2026-10-13) | Wraps the label in full when Idle. Declared: When `true`, disables truncation of the collapsed label: the trailing ellipsis (`…`) is never shown and the `collapsedLines` clamp is ignored, so the label wraps fully even when horizontal space is tight. Default false, from the component source. |
| `modes` | `Modes` |  |  |  | types | Design token modes for theming (e.g. `{ 'Color Mode': 'Light' }`). |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Override outer container styles. |
| `labelStyle` | `StyleProp<TextStyle>` |  |  |  | types | Override styles applied to the composed {@link label} `Text`. No-op when {@link children} is provided. |
| `accessibilityLabel` | `string` |  |  |  | types | Accessibility label for the checkbox. Falls back to `label`. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Primary"` |  | evidence (2026-10-06) | The toggle Button is forced to Secondary; the row's modes don't change it. Declared: A token collection ExpandableCheckbox reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `AppearanceSystem` | `mode collection` | positive, warning, negative | `"positive"` |  | types | A token collection ExpandableCheckbox reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / Size` | `mode collection` | M, S, XS | `"M"` |  | evidence (2026-10-06) | The toggle Button is forced to XS; the row's modes don't change it. Declared: A token collection ExpandableCheckbox reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / State` | `mode collection` | Idle, Hover, Pressed, Disabled | `"Idle"` |  | types | A token collection ExpandableCheckbox reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection ExpandableCheckbox reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `contentInset/Left` | `mode collection` | Mode 1, S, M, L | `"Mode 1"` |  | types | A token collection ExpandableCheckbox reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `contentInset/Right` | `mode collection` | Default, S, M, L | `"Default"` |  | types | A token collection ExpandableCheckbox reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context` | `mode collection` | Default, Nudge&Alert, CTACard, ListItem | `"Default"` |  | types | A token collection ExpandableCheckbox reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 10` | `mode collection` | Default, jioPlus | `"Default"` |  | types | A token collection ExpandableCheckbox reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context2` | `mode collection` | Default, AppBar | `"Default"` |  | types | A token collection ExpandableCheckbox reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Emphasis` | `mode collection` | High, Medium, Low | `"High"` |  | evidence (2026-10-06) | The toggle Button is forced to Low; the row's modes don't change it. Declared: A token collection ExpandableCheckbox reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection ExpandableCheckbox reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Profile Card Appearance` | `mode collection` | Default, Premium | `"Default"` |  | types | A token collection ExpandableCheckbox reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Semantic Intent` | `mode collection` | Brand, System | `"Brand"` |  | types | A token collection ExpandableCheckbox reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Slot gap` | `mode collection` | S, M, L, XL, XS | `"S"` |  | types | A token collection ExpandableCheckbox reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Text Appearance` | `mode collection` | Neutral, Primary, Secondary, Tertiary, Success, Warning, Error | `"Neutral"` |  | evidence (2026-10-06) | Reaches the label and link. Declared: A token collection ExpandableCheckbox reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Text Sizes` | `mode collection` | Medium, Small, Large | `"Medium"` |  | evidence (2026-10-06) | Reaches the label and link. Declared: A token collection ExpandableCheckbox reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Weight` | `mode collection` | Medium, Regular, Bold | `"Medium"` |  | evidence (2026-10-13) | Reaches the label and link; left unset, the label is regular weight (400), as in Figma. Declared: A token collection ExpandableCheckbox reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types | Full label-slot override matching the Figma Checkbox Item `slot`. When provided, {@link label} / {@link linkLabel} are ignored and `modes` are cascaded into the slot children. Prefer this for fully custom label compositions. |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onLinkPress` | `(event: GestureResponderEvent) => void` |  |  |  | types | Press handler for {@link linkLabel}. Navigation is left to the consumer. |
| `onValueChange` | `(checked: boolean) => void` |  |  |  | types | Callback fired when the checked state changes. |
| `onExpandedChange` | `(expanded: boolean) => void` |  |  |  | types | Callback fired when the expanded state changes. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- Figma's Expandable Checkbox has only two states, Idle and Open: checked, disabled, the number of collapsed lines and the toggle labels exist only in the package. _(evidence, 2026-10-28)_
- Still different from Figma: the label's line height is 17 in code (16 in Figma), and Read more is 84.9 px wide (81 in Figma). _(evidence, 2026-10-13)_

## Flags

_None._
