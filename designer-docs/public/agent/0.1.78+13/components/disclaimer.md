# Disclaimer

> Coin agent pack 0.1.78+13 (pilot). Generated from `components/disclaimer.json`; the JSON is the source of truth.

- **State:** flagged (1 flag, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `b4988c5` · built 2026-10-29T05:05:58Z
- **Category:** content (for discovery only, not a limit on composition) · **Tags:** fine print, legal line, terms, small print
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=disclaimer) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=208-2399) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-disclaimer--docs)

Use a Disclaimer for one short legal line under an action, such as who provides a payment service.

## Use when

- **recommended** One short legal line under an action, such as who provides a payment service.  
  _From summary: “Use a Disclaimer for one short legal line under an action, such as who provides a payment service.”_

## Avoid when

- **discouraged** A problem people need to fix, such as “UPI limit reached. Try a smaller amount.”: grey 10 px text hides an error. Use Support Text, whose red message tells people what to fix. Use instead: `SupportText` (not in this pack).  
  _From doDont: “Grey 10 px text hides an error.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Copy | One string of 10 px grey text, centred line by line; a line break is the only formatting it takes. | yes | anatomy: “One string; a line break is the only formatting it takes.” |
| Column | At most 281 px wide; the text wraps there and centres. | yes | anatomy: “At most 281 px wide; the text wraps there and centres.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

_No slots._

## Placement

- **recommended** Under a payment action: a payment footer (an ActionFooter) holds the Pay button and, below it, the provider line.  
  _From inContext: “A payment footer holds the Pay button and, below it, the provider line.”_
- **recommended** The footer passes its modes to both; the screen handles the payment.  
  _From inContext: “The footer passes its modes to both; the screen handles the payment.”_
- **recommended** The column is 281 px wide, or as wide as a narrower host, and the text centres inside it.  
  _From sizing: “The column is 281 px wide, or as wide as a narrower host, and the text centres inside it.”_
- **recommended** Each line adds 12 px.  
  _From sizing: “Each line adds 12 px.”_
- **recommended** It centres in any vertical stack, including one that stretches its children (a Stack with fillWidth).  
  _From sizing: “It centres in any vertical stack, including one that stretches its children.”_
- **recommended** Its root is always 100% wide, which matters in row parents.  
  _From evidence: “The root is now always 100% wide, which matters in row parents.”_

## Configuration

- **recommended** `disclaimer`: Disclaimer has no variants, icon, or size: the copy is the only choice.  
  _From configuration: “Disclaimer has no variants, icon, or size.”_
- **recommended** `disclaimer`: Write the copy for the screen; without it, the package shows a generic Jio Payments Bank line.  
  _From configuration: “Write the copy for the screen; without it, the package shows a generic Jio Payments Bank line.”_
- **recommended** `disclaimer`: Copy that doesn’t name the bank (that doesn’t contain “Jio Payments Bank Pvt. Ltd.”) gets “Jio Payments Bank Pvt. Ltd.” on a line below.  
  _From configuration: “Copy that doesn’t name the bank gets “Jio Payments Bank Pvt. Ltd.” on a line below.”_
- **recommended** `disclaimer`: To name the bank in the copy, put a line break before the bank’s name: it keeps the name on one line, as in Figma.  
  _From configuration: “A line break before the bank’s name keeps it on one line, as in Figma.”_
- **discouraged** `disclaimer`: Leaving the copy out shows “All financial services…”, which differs from Figma, and that default copy breaks the bank’s name across two lines.  
  _From doDont: “The default copy breaks the bank’s name across two lines.”_

## Content

- **recommended** Small print that says who stands behind the action, in one or two lines.  
  _From corePrinciple: “Small print that says who stands behind the action, in one or two lines.”_
- **recommended** Name the provider or the condition in one or two short sentences.  
  _From content: “Name the provider or the condition in one or two short sentences.”_
- **recommended** For terms, say what continuing means; the package adds the bank’s name below.  
  _From configuration: “Say what continuing means; the package adds the bank’s name below.”_
- **recommended** Put the full terms on their own page and add a Link below the disclaimer; the copy can’t hold links or bold text.  
  _From content: “Put the full terms on their own page and add a Link below; the copy can’t hold links or bold text.”_
- **recommended** Keep it to a sentence or two: two lines are read at a glance.  
  _From doDont: “Two lines are read at a glance.”_
- **discouraged** Do not paste the full terms: five or more lines of 10 px text go unread.  
  _From doDont: “Five or more lines of 10 px text go unread.”_

Good: “Payment and UPI services are provided by Jio Payments Bank Pvt. Ltd.”, “By continuing you agree to the terms for this payment.”

Bad: “Mutual fund investments are subject to market risks. Read all scheme-related documents carefully before investing. Past performance does not guarantee future returns. Payment and UPI services are provided by Jio Payments Bank Pvt. Ltd.”, “UPI limit reached. Try a smaller amount.”

## States

| State | When | From |
| --- | --- | --- |
| Read-only | Disclaimer isn’t interactive: it has no hover, pressed, focus, or disabled style, and Tab skips it. Only the copy changes. | states: “Disclaimer isn’t interactive: it has no hover, pressed, focus, or disabled style, and Tab skips it.” |
| In a full-screen modal footer | Inside a full-screen modal footer, the modal turns it light grey to suit its dark surface. | states: “Inside a full-screen modal footer, the modal turns it light grey to suit its dark surface.” |

## Accessibility

- **recommended** `accessibilityLabel`: Screen readers read the copy and the added bank line as one label, or accessibilityLabel when it’s set.  
  _From sources: “Screen readers read the copy and that line as one label, or accessibilityLabel when it’s set.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Break before the bank’s name | Let the name split | The default copy breaks the bank’s name across two lines. |
| Keep it to a sentence or two | Paste the full terms | Five or more lines of 10 px text go unread. |
| Use Support Text for problems | Put problems in small print | Grey 10 px text hides an error. |

## Examples

### The provider line under a payment action, the guide's In context: an ActionFooter titled Confirm payment holds one vertical Stack with the Pay button and, below it, the Disclaimer. The copy breaks before the bank's name, so the name stays on one line and the package adds nothing. The footer passes its modes to both, so neither sets any. The empty onPress stands for the screen's own payment handling.

```tsx
<ActionFooter title="Confirm payment">
  <Stack layoutDirection="vertical">
    <Button label="Pay ₹500" onPress={() => {}} />
    <Disclaimer disclaimer={'Payment and UPI services are provided by\nJio Payments Bank Pvt. Ltd.'} />
  </Stack>
</ActionFooter>
```

_From inContext: “A payment footer holds the Pay button and, below it, the provider line.”_

### Terms for this screen with the full terms a link away, the guide's Content: the copy says what continuing means and the package adds “Jio Payments Bank Pvt. Ltd.” on a line below it; the full terms are on their own page, reached through a Link below the copy, because the copy can't hold links. The empty onPress stands for the screen's own navigation to that page.

```tsx
<VStack>
  <Disclaimer disclaimer="By continuing you agree to the terms for this payment." />
  <Link text="View terms" textAlign="Center" onPress={() => {}} />
</VStack>
```

_From content: “Put the full terms on their own page and add a Link below; the copy can’t hold links or bold text.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `disclaimer` | `string` |  | `"All financial services are provided by Jio Payments Bank Pvt. Ltd."` |  | evidence (2026-10-23) | The copy, one string; a line break is its only formatting. The package renders it, a line break, then the children if passed, else “Jio Payments Bank Pvt. Ltd.” unless the copy already contains it: “Terms apply.” renders two lines, 24 px. Declared: First line of the disclaimer text. Default "All financial services are provided by Jio Payments Bank Pvt. Ltd.", from the component source. |
| `modes` | `Modes` |  |  |  | types | Modes object passed directly to `getVariableByName`. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Optional style overrides for the container. |
| `textStyle` | `StyleProp<TextStyle>` |  |  |  | types | Optional style overrides for the text element. |
| `accessibilityLabel` | `string` |  |  |  | evidence (2026-10-23) | Replaces the spoken name. Without it the name is the copy plus the second line (“Terms apply. Jio Payments Bank Pvt. Ltd.”). On the web the root is a group with that name and the text itself is aria-hidden; on native the root is accessible with role text, so VoiceOver gets the same name (not device-tested). Declared: Accessibility label for screen readers. If not provided, uses disclaimer text. |
| `accessibilityHint` | `string` |  |  |  | types | Additional accessibility hint for screen readers /. |
| `...React.ComponentProps<typeof View>` | `React.ComponentProps<typeof View>` |  |  |  | types | Inherited React Native props the component also accepts. They are not part of the design contract and no guide documents them. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection Disclaimer reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context5` | `mode collection` | Default, Fullscreen Modal, Mode 1 | `"Default"` |  | evidence (2026-10-06) | FullscreenModal sets Fullscreen Modal on its footer Disclaimer, which makes the text #EBEBED, light grey for its dark surface, in both colour modes. Declared: A token collection Disclaimer reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

_No slots._

### Events

_No events._

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

_None recorded._

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `(whole entry)` · human: The guide (checked 23 October on 0.1.78-c8526ae, unchanged for Disclaimer on the installed 0.1.78-dbe0e02) says three times that copy that “doesn’t name the bank” gets “Jio Payments Bank Pvt. Ltd.” on a second line (Anatomy, Configuration, Sources). The package adds it unless the copy contains that exact string (Disclaimer.tsx line 121), so copy that names the bank another way still gets it, and longer copy gets it after its last line, not on a second one. The entry keeps the guide's words and adds the exact string from the evidence (“unless the copy already contains it”). Guide fix #531. Added by Claude Code in the overnight run agentpack-batch10, for Marcin to confirm.
