# CircularRating

> Coin agent pack 0.1.78+25 (pilot). Generated from `components/circularrating.json`; the JSON is the source of truth.

- **State:** flagged (1 flag, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `622cd82` · built 2026-10-31T03:15:31Z
- **Category:** data (for discovery only, not a limit on composition) · **Tags:** score ring, credit score, dotted ring, rating ring, health score
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=circularrating) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3741-1711) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-circularrating--docs)

Use a Circular Rating to show a score out of 100, such as credit health, as a dotted ring with your verdict and one next step.

## Use when

- **recommended** Show a score out of 100, such as credit health, as a dotted ring with your verdict and one next step.  
  _From summary: “Use a Circular Rating to show a score out of 100, such as credit health, as a dotted ring with your verdict and one next step.”_
- **recommended** A score, what it means, and what to do next.  
  _From corePrinciple: “A score, what it means, and what to do next.”_
- **recommended** Credit health with a next step, as in the guide's In context.  
  _From inContext: “Credit health with a next step”_

## Avoid when

- **discouraged** A column narrower than 340 px: Circular Rating doesn't resize.  
  _From sizing: “give it a column at least 340 px wide.”_
- **discouraged** A score on a scale other than 0 to 100: Circular Rating has no max or format prop, and always shows the score out of 100.  
  _From evidence: “No max, size, format, or centre-slot props”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Lit dots | 18 px dots in the ring's colour; the share lit matches the score (none at 0). | no | anatomy: “18 px dots in the ring’s colour; the share lit matches the score.” |
| Track dots | Grey dots for the rest of the 100. | no | anatomy: “Grey dots for the rest of the 100.” |
| Label | label, 12 px; names the score. | yes | anatomy: “12 px; names the score.” |
| Score | 56 px heavy; the score rounded, out of 100. | yes | anatomy: “56 px heavy; the score rounded, out of 100.” |
| Tier | tierLabel, 16 px bold; your verdict on the score, with a chevron when it opens details. | yes | anatomy: “16 px bold; your verdict on the score, with a chevron when it opens details.” |
| Footer | footerText, 12 px with an info icon; when the score was updated. | yes | anatomy: “12 px with an info icon; when the score was updated.” |
| Nudge | An inline nudge with one button for the next step (showNudge). | no | anatomy: “An inline nudge with one button for the next step.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `footerSlot` | `ReactNode` | types |
| `nudgeSlot` | `ReactNode` | types |

## Placement

- **recommended** A Circular Rating doesn't resize.  
  _From sizing: “A Circular Rating doesn’t resize.”_
- **recommended** The ring is 320 px with 18 px dots, inside 10 px of padding, and the nudge is 312 px: give it a column at least 340 px wide.  
  _From sizing: “The ring is 320 px with 18 px dots, inside 10 px of padding, and the nudge is 312 px; give it a column at least 340 px wide.”_
- **recommended** With the nudge it measures 340 × 478 px: the ring 320 × 320, the footer row 320 × 16 and the nudge 312 × 58.  
  _From evidence: “340 × 478 (ring 320 × 320, footer row 320 × 16, nudge 312 × 58)”_
- **recommended** The screen passes the score and its tier, and wires both actions: on the guide's credit health screen the tier opens the score's breakdown and Pay now opens the card bill.  
  _From inContext: “The screen passes the score and its tier, and wires both actions: the tier opens the score’s breakdown and Pay now opens the card bill.”_

## Configuration

- **recommended** You write the label, tier, footer and nudge; the score comes from value.  
  _From configuration: “You write the label, tier, footer, and nudge; the score comes from the value.”_
- **recommended** Choose how many dots make the ring (dotCount), and whether the footer icon (showFooterIcon) and the nudge (showNudge) show.  
  _From configuration: “Choose how many dots make the ring, and whether the footer icon and the nudge show.”_
- **recommended** `value`: Set value to the score: left out, the ring shows 72.  
  _From fact `/facts/props/1` (value, source evidence)_
- **recommended** `value`: The score shows value rounded, out of a fixed 100, with no “%”.  
  _From evidence: “Score text is `Math.round(value)`, out of a fixed 100, no “%”.”_
- **recommended** `showNudge` = `false`: showNudge={false}: the score and its footer, when there's no next step.  
  _From configuration: “The score and its footer, when there’s no next step.”_
- **recommended** `showFooterIcon` = `false`: showFooterIcon={false}: just the update line.  
  _From configuration: “Just the update line.”_
- **recommended** `dotCount` = `12`: dotCount 12: twelve dots, each standing for more of the score.  
  _From configuration: “Twelve dots: each stands for more of the score.”_
- **discouraged** `dotCount`: Don't go past about 50 dots: they overlap.  
  _From configuration: “Past about 50 dots they overlap.”_
- **recommended** `onTierPress`: With onTierPress the tier row becomes a button with a chevron, such as to open the score's breakdown.  
  _From configuration: “With onTierPress the tier row becomes a button with a chevron, such as to open the score’s breakdown.”_
- **recommended** `onTierPress`: The chevron shows only when the tier opens details (onTierPress is set).  
  _From sources: “The chevron shows only when the tier opens details.”_
- **recommended** `tierLabel`: Pick the tier from the score yourself, and the colour with modes: neither follows the score.  
  _From states: “Pick the tier from the score yourself, and the colour with modes.”_
- **recommended** `AppearanceBrand` = `Secondary`: Modes colour the dots and the nudge together: AppearanceBrand Secondary is purple.  
  _From configuration: “Modes colour the dots and the nudge together: Secondary is purple.”_
- **recommended** `Emphasis` = `High`: Keep Emphasis High: the lit dots stand out from the track.  
  _From doDont: “The lit dots stand out from the track.”_
- **discouraged** `Emphasis` = `Medium`: Don't lower Emphasis: at Medium the lit dots have no contrast with the track (1.0:1).  
  _From doDont: “At Medium the lit dots have no contrast with the track (1.0:1).”_
- **recommended** `Context`: The nudge's button is Figma's small size by default.  
  _From sources: “The nudge button is Figma’s small size by default.”_
- **recommended** `showNudge`: The default nudge has no close button.  
  _From sources: “Since the #271 fix the default nudge has no close button.”_

## Content

- **recommended** `label`: Name the score in two or three words, such as “Credit health”.  
  _From content: “Name the score in two or three words, such as “Credit health”.”_
- **recommended** `label`: Set label: left out, it reads “Rating”.  
  _From fact `/facts/props/3` (label, source types)_
- **recommended** `tierLabel`: Write the tier as a short verdict that fits one line.  
  _From content: “Write the tier as a short verdict that fits one line”_
- **recommended** `tierLabel`: Write the tier for the score: a low score says “Needs attention”.  
  _From doDont: “A low score says “Needs attention”.”_
- **discouraged** `tierLabel`: Don't leave the default tier: it doesn't follow the score, so 36 still says “Doing great”.  
  _From doDont: “The tier doesn’t follow the score, so 36 still says “Doing great”.”_
- **recommended** `footerText`: Start the footer with when it was updated.  
  _From content: “start the footer with when it was updated”_
- **recommended** `footerText`: Set footerText: left out, it reads “Updated on 1 March”.  
  _From fact `/facts/props/5` (footerText, source types)_
- **recommended** `nudgeButtonLabel`: Give the nudge one action with a verb label, such as “Pay now”.  
  _From content: “give the nudge one action with a verb label, such as “Pay now”.”_
- **discouraged** `nudgeButtonLabel`: Don't leave the default button: it shows and is read as “Button”.  
  _From doDont: “It shows and is read as “Button”.”_
- **recommended** `nudgeBody`: With the nudge on, set nudgeBody: left out, it reads “Split this transaction into installments”.  
  _From fact `/facts/props/8` (nudgeBody, source types)_

Good: “Credit health”, “Doing great”, “Needs attention”, “Fair”, “Not rated yet”, “Updated on 8 Oct 2026”, “Pay your card bill in full to raise your score”, “Pay now”

Bad: “Button”

## States

| State | When | From |
| --- | --- | --- |
| No states of its own | The ring has no states; neither its colour nor its tier follows the score. | states: “The ring has no states, and neither its colour nor its tier follows the score.” |
| Low score | 36 lights 9 of 24 dots; the tier is yours to write, such as “Needs attention”. | states: “36 lights 9 dots. The tier is yours: “Needs attention”.” |
| High score | 72 lights 18 of 24 dots, in the same colour. | states: “72 lights 18 dots, in the same colour.” |
| Empty | At 0, only grey dots. | states: “At 0, only grey dots.” |

## Accessibility

- **recommended** Screen readers hear the ring as a progress bar with its value out of 100, named by the label, score and tier, then the footer as text.  
  _From sources: “Screen readers hear the ring as a progress bar with its value out of 100, named by the label, score, and tier, then the footer as text.”_
- **recommended** `accessibilityLabel`: accessibilityLabel replaces the ring's name; without it the name is “<label>. <score> out of 100. <tier>”, with the score clamped to 0–100.  
  _From evidence: “Its name is `accessibilityLabel`, else “<label>. <score> out of 100. <tier>” with the clamped score”_
- **recommended** `onTierPress`: With onTierPress the tier row is a button outside the progress bar; Enter and a click each call it once.  
  _From evidence: “With `onTierPress` the tier row is a `<button>` outside the progressbar; Enter and a click each call it once.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Write the tier for the score | Leave the default tier | The tier doesn’t follow the score, so 36 still says “Doing great”. |
| Name the nudge’s action | Leave the default button | It shows and is read as “Button”. |
| Keep emphasis High | Lower the emphasis | At Medium the lit dots have no contrast with the track (1.0:1). |

## Examples

### Credit health with a next step, the guide's In context: a score of 64 with the tier “Fair”, which the screen picks for that score, a dated footer, and a nudge whose Pay now button is the next step. onTierPress stands for opening the score's breakdown (it makes the tier a button with a chevron), and onPressNudgeButton for opening the card bill.

```tsx
<CircularRating
  value={64}
  label="Credit health"
  tierLabel="Fair"
  footerText="Updated on 8 Oct 2026"
  nudgeBody="Pay your card bill in full to raise your score"
  nudgeButtonLabel="Pay now"
  onTierPress={() => {}}
  onPressNudgeButton={() => {}}
/>
```

_From inContext: “The screen passes the score and its tier, and wires both actions: the tier opens the score’s breakdown and Pay now opens the card bill.”_

### A rating without the nudge, the guide's Without the nudge: a score of 72 with the tier “Doing great” and its dated footer, for when there's no next step. The tier is plain text with no chevron, since no onTierPress is set.

```tsx
<CircularRating
  value={72}
  label="Credit health"
  tierLabel="Doing great"
  footerText="Updated on 8 Oct 2026"
  showNudge={false}
/>
```

_From configuration: “The score and its footer, when there’s no next step.”_

### A low score, the guide's States: 36 lights 9 of the 24 dots in the same colour as a high score, and the tier “Needs attention” is the one the screen writes for that score. No nudge.

```tsx
<CircularRating
  value={36}
  label="Credit health"
  tierLabel="Needs attention"
  footerText="Updated on 8 Oct 2026"
  showNudge={false}
/>
```

_From states: “36 lights 9 dots. The tier is yours: “Needs attention”.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `accessibilityLabel` | `string` |  |  |  | types | Accessibility label for the whole component. |
| `value` | `number` |  | `72` |  | evidence (2026-10-13) | NaN is treated as 0. Declared: Rating value. Clamped by CircularProgressBarDoted between 0 and 100. Default 72, from the component source. |
| `dotCount` | `number` |  | `24` |  | evidence (2026-10-13) | Lit dots are ceil(value / 100 × dotCount), filling clockwise from 12 o'clock: 0 lights none, and any value above 0 lights at least one. Declared: Number of dots rendered around the rating ring. Default 24, from the component source. |
| `label` | `string` |  | `"Rating"` |  | types | Small label above the score. Default "Rating", from the component source. |
| `tierLabel` | `string` |  | `"Doing great"` |  | types | Text below the score. Default "Doing great", from the component source. |
| `footerText` | `string` |  | `"Updated on 1 March"` |  | types | Footer timestamp/copy shown below the rating. Default "Updated on 1 March", from the component source. |
| `showFooterIcon` | `boolean` |  | `true` |  | types | Show the footer info icon. Default true, from the component source. |
| `showNudge` | `boolean` |  | `true` |  | types | Show the bottom inline nudge. Default true, from the component source. |
| `nudgeBody` | `string` |  | `"Split this transaction into installments"` |  | types | Body text for the default bottom nudge. Default "Split this transaction into installments", from the component source. |
| `nudgeButtonLabel` | `string` |  | `"Button"` |  | types | Button label for the default bottom nudge. Default "Button", from the component source. |
| `onPressNudgeButton` | `() => void` |  |  |  | types | Called when the nudge button is pressed. |
| `onTierPress` | `() => void` |  |  |  | types | Called when the rating tier row is pressed. |
| `footerSlot` | `React.ReactNode` |  |  |  | evidence (2026-10-13) | Replaces the footer text and icon; it receives the rating's modes. Declared: Optional footer slot. Receives `modes` recursively. |
| `nudgeSlot` | `React.ReactNode` |  |  |  | evidence (2026-10-13) | Replaces the nudge, and shows only with showNudge; it receives the rating's modes. Declared: Optional nudge slot. Receives `modes` recursively. |
| `modes` | `Modes` |  |  |  | types | Design token modes forwarded to token lookups and child components. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Optional container style overrides. |
| `ratingStyle` | `StyleProp<ViewStyle>` |  |  |  | types | Optional rating ring wrapper style overrides. |
| `footerStyle` | `StyleProp<ViewStyle>` |  |  |  | types | Optional footer row style overrides. |
| `footerTextStyle` | `StyleProp<TextStyle>` |  |  |  | types | Optional footer text style overrides. |
| `nudgeStyle` | `StyleProp<ViewStyle>` |  |  |  | types | Optional nudge style overrides. |
| `disableTruncation` | `boolean` |  |  |  | evidence (2026-10-13) | Reaches only the footer text, not the tier. Declared: When `true`, disables text truncation: the trailing ellipsis (`…`) is never shown and any `numberOfLines` clamp is ignored, so the text wraps to as many lines as it needs even when horizontal space is tight. |
| `...CircularRatingBaseProps` | `CircularRatingBaseProps` |  |  |  | types | Inherited React Native props the component also accepts. They are not part of the design contract and no guide documents them. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Primary"` |  | types | A token collection CircularRating reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `AppearanceSystem` | `mode collection` | positive, warning, negative | `"positive"` |  | types | A token collection CircularRating reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Border Boolean` | `mode collection` | False, True | `"False"` |  | types | A token collection CircularRating reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / Size` | `mode collection` | M, S, XS | `"M"` |  | types | A token collection CircularRating reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / State` | `mode collection` | Idle, Hover, Pressed, Disabled | `"Idle"` |  | types | A token collection CircularRating reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection CircularRating reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context` | `mode collection` | Default, Nudge&Alert, CTACard, ListItem | `"Nudge&Alert"` |  | evidence (2026-10-13) | The default nudge gets Context Nudge&Alert unless modes set one, so its button is Figma's small one (12 px label, 25 px tall) with no modes set. Declared: A token collection CircularRating reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 10` | `mode collection` | Default, jioPlus | `"Default"` |  | types | A token collection CircularRating reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context2` | `mode collection` | Default, AppBar | `"Default"` |  | types | A token collection CircularRating reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Emphasis` | `mode collection` | High, Medium, Low | `"High"` |  | types | A token collection CircularRating reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Nudge padding` | `mode collection` | Default, None | `"Default"` |  | types | A token collection CircularRating reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection CircularRating reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Profile Card Appearance` | `mode collection` | Default, Premium | `"Default"` |  | types | A token collection CircularRating reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Semantic Intent` | `mode collection` | Brand, System | `"Brand"` |  | types | A token collection CircularRating reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Slot gap` | `mode collection` | S, M, L, XL, XS | `"S"` |  | types | A token collection CircularRating reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `footerSlot` | `React.ReactNode` |  |  |  | types | Optional footer slot. Receives `modes` recursively. |
| `nudgeSlot` | `React.ReactNode` |  |  |  | types | Optional nudge slot. Receives `modes` recursively. |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onPressNudgeButton` | `() => void` |  |  |  | types | Called when the nudge button is pressed. |
| `onTierPress` | `() => void` |  |  |  | types | Called when the rating tier row is pressed. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- Figma draws 26 dots, all lit, on a slightly smaller ring, with a white nudge; the package draws 24 dots lit by the score and colours the nudge with the ring. _(evidence, 2026-10-17)_
- At Emphasis Medium and Low the default gold lit dots vanish against the grey track, at 1.00:1 and 1.09:1 (token problem #251, open); at Emphasis High the gold is 1.99:1. _(evidence, 2026-10-13)_
- Screen readers hear the label, score and tier twice: in the progress bar's name and again as text. _(evidence, 2026-10-13)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `(whole entry)` · human: The Circular Rating guide (622cd82) and its evidence were checked on 13 October 2026 on v0.1.78-c1fa197 and 17 October on v0.1.78-a116616; CircularRating.tsx and CircularProgressBarDoted.tsx are the same blobs on the installed v0.1.78-dbe0e02. Read against the installed source, and rendered with react-native-web 0.21.2 in headless Chromium on 31 October, every sentence this entry quotes still holds, but two evidence sentences do not, and the entry leaves them out: the Contract's Layout line “tier 16 px 700, wrapping with no line clamp” and its slots line “the tier no longer truncates.” (the 12 October #252 re-test says the same). The tier is one line: CircularProgressBarDoted.tsx line 305 passes resolveTruncation(disableTruncation, 1), so numberOfLines 1, and CircularRating never forwards disableTruncation to the ring (lines 217–226). Rendered, a 58-character tier is one 21 px line, 440 px wide, white-space nowrap, overflowing both sides of the 320 px ring. The guide's own Content sentence “Write the tier as a short verdict that fits one line” holds and is kept. Also unclear: Sizing's “A Circular Rating doesn’t resize.” is true of the ring (320 px) and the nudge (312 px), but the root has no width of its own (CircularRating.tsx lines 121–126), so in a wider stretching column the root and its full-width footer row widen while the ring and nudge stay at the left: in a 400 px column the footer row is 380 px wide and its text and icon centre 30 px right of the ring's centre. Re-check these on the installed build and publish the guide and evidence, then re-extract. Added by Claude Code in the overnight run agentpack-r25, for Marcin to confirm. Guide fix #551; the overflowing tier and the off-centre footer are Component Bug #549.
