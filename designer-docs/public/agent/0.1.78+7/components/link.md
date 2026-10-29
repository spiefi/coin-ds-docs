# Link

> Coin agent pack 0.1.78+7 (pilot). Generated from `components/link.json`; the JSON is the source of truth.

- **State:** flagged (10 flags, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `4e470cf` · built 2026-10-29T00:57:35Z
- **Category:** navigation (for discovery only, not a limit on composition) · **Tags:** hyperlink, text link, inline link, anchor
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=link) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=6981-5) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-link--docs)

Use a Link to send people to related content, such as terms, help, or a recovery step, on its own line or inside a sentence.

## Use when

- **recommended** Send people to related content, such as terms, help, or a recovery step, on its own line or inside a sentence.  
  _From summary: “Use a Link to send people to related content, such as terms, help, or a recovery step, on its own line or inside a sentence.”_

## Avoid when

- **discouraged** The screen's main action: links take people somewhere, so keep the main action a Button. Use instead: `Button`.  
  _From corePrinciple: “Links take people somewhere. Keep the screen’s main action a Button.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Label | The text (text or children); says where the link goes, and its size follows the Text Sizes mode. | yes | anatomy: “Says where the link goes; its size follows the Text Sizes mode.” |
| Underline | Always on; the cue that the words can be pressed. | yes | anatomy: “Always on; it is the cue that the words can be pressed.” |
| Pressable width | With Fill, the link spans its parent, so the whole row responds to a press. | no | anatomy: “With Fill, the link spans its parent, so the whole row responds to a press.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `children` | `ReactNode` | types |

## Placement

- **recommended** Inside a sentence, place the Link in a TextSegment: it wraps with the copy and takes its colour and size.  
  _From configuration: “Inside a TextSegment the link wraps with the copy and takes its colour and size.”_
- **recommended** `onPress`: Let the screen open the destination (terms, privacy policy or help) in onPress; Link only reports the press.  
  _From inContext: “The screen opens the Terms, Privacy Policy, or help when a link is pressed; Link only reports the press.”_
- **recommended** `autolayout`: The parent sets the width and the type sets the height: a Fill link is as wide as its parent and a Hug link as wide as its words.  
  _From sizing: “A Fill link is as wide as its parent and a Hug link as wide as its words.”_

## Configuration

- **recommended** `autolayout` = `Fill`: autolayout Fill with textAlign Left is the default: the label starts at the left and the whole row is pressable.  
  _From configuration: “The default. The label starts at the left and the whole row is pressable.”_
- **recommended** `textAlign` = `Center`: Use textAlign Center with Fill to centre the label, for example under a full-width button.  
  _From configuration: “Centres the label, for example under a full-width button.”_
- **REQUIRED** `textAlign` = `Center`: Use textAlign Center with autolayout Fill: Fill stretches the link across its parent, the only width where Center has room to work.  
  _From configuration: “Fill stretches the link across its parent, the only width where Center has room to work.”_
- **recommended** `autolayout` = `Hug`: Use autolayout Hug for a link in a row beside other content; only the words are pressable.  
  _From configuration: “Only the words are pressable, for a link in a row beside other content.”_
- **recommended** `disabled` = `true`: Disable a link only while it briefly can't be used, such as Resend code during a countdown.  
  _From states: “Disable a link only while it briefly can’t be used, such as Resend code during a countdown.”_
- **recommended** `Text Sizes`: Set the size with the Text Sizes mode: one line is 16, 17 or 24 px tall for Small, Medium and Large; long labels wrap onto more lines.  
  _From sizing: “Its height is one line of type: 16, 17, or 24 px for Small, Medium, and Large. Long labels wrap onto more lines.”_

## Content

- **recommended** Links take people somewhere.  
  _From corePrinciple: “Links take people somewhere.”_
- **recommended** `text`: Write a short label in sentence case that names the destination or task, such as “Forgot PIN?” or “View all transactions”.  
  _From content: “Write a short label in sentence case that names the destination or task, such as “Forgot PIN?” or “View all transactions”.”_
- **recommended** `text`: In a sentence, link only the words that name the destination and keep the punctuation outside.  
  _From content: “In a sentence, link only the words that name the destination and keep the punctuation outside.”_
- **discouraged** `text`: Avoid vague labels such as “Click here”.  
  _From content: “Avoid vague labels such as “Click here”.”_
- **discouraged** Do not link the whole sentence: a fully underlined sentence hides what will open.  
  _From doDont: “A fully underlined sentence hides what will open.”_

Good: “Forgot PIN?”, “View all transactions”, “Need help?”, “See today’s rates”, “View all”, “Terms”, “Privacy Policy”, “Resend code”

Bad: “Click here”

## States

| State | When | From |
| --- | --- | --- |
| Enabled | The default: full-strength text with its underline. | states: “Full-strength text with its underline.” |
| Disabled | disabled true: dimmed to 40% and ignores presses; for a link that briefly can't be used. | states: “Dimmed to 40% and ignores presses.” |

## Accessibility

- **discouraged** Do not make the main action a link: a 17 px underlined line is easy to miss and hard to tap.  
  _From doDont: “A 17 px underlined line is easy to miss and hard to tap.”_
- **recommended** On the web, Enter and Space activate a focused link, and a disabled link is announced as disabled and skipped by Tab.  
  _From sources: “On the web, Enter and Space activate a focused link, and a disabled link is announced as disabled and skipped by Tab.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Link only the destination | Link the whole sentence | A fully underlined sentence hides what will open. |
| Centre with Fill | Centre with Hug | A Hug link has no room to centre, so it stays at the left. |
| Keep the main action a Button | Make the main action a link | A 17 px underlined line is easy to miss and hard to tap. |

## Examples

### Links inside a sentence: only the destinations are links, and the punctuation stays outside.

```tsx
<TextSegment modes={{ 'Color Mode': 'Light' }}>
  <Text modes={{ 'Color Mode': 'Light' }}>By continuing you agree to our </Text>
  <Link text="Terms" onPress={() => {}} modes={{ 'Color Mode': 'Light' }} />
  <Text modes={{ 'Color Mode': 'Light' }}> and </Text>
  <Link text="Privacy Policy" onPress={() => {}} modes={{ 'Color Mode': 'Light' }} />
  <Text modes={{ 'Color Mode': 'Light' }}>.</Text>
</TextSegment>
```

_From content: “In a sentence, link only the words that name the destination and keep the punctuation outside.”_

### A centred Fill link under the main Button.

```tsx
<VStack modes={{ 'Color Mode': 'Light' }}>
  <Button label="Continue" onPress={() => {}} modes={{ 'Color Mode': 'Light' }} />
  <Link text="Need help?" autolayout="Fill" textAlign="Center" onPress={() => {}} modes={{ 'Color Mode': 'Light' }} />
</VStack>
```

_From configuration: “Centres the label, for example under a full-width button.”_

### A Hug link in a row beside other content.

```tsx
<HStack alignVertical="center" justifyHorizontal="space-between" modes={{ 'Color Mode': 'Light' }}>
  <Text modes={{ 'Color Mode': 'Light' }}>Recent transactions</Text>
  <Link text="View all" autolayout="Hug" onPress={() => {}} modes={{ 'Color Mode': 'Light' }} />
</HStack>
```

_From configuration: “Only the words are pressable, for a link in a row beside other content.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `text` | `string` |  |  |  | types | The link label. You may also pass content as JSX children (e.g. `<Link>Terms</Link>`); when both are provided, `children` wins. Mirrors the {@link Text} API so `Link` is a near-drop-in, underlined sibling of `Text`. |
| `children` | `React.ReactNode` |  |  |  | types | Child nodes (string or nested `Text`/`Link`). Wins over `text`. |
| `onPress` | `(event: GestureResponderEvent) => void` |  |  |  | evidence (2026-10-01) | Enter and Space on a focused link both call onPress (#174 fixed). Declared: Called when the link is activated. Navigation is the consumer's job (e.g. `Linking.openURL`, a router push) — `Link` is intentionally navigation-agnostic and React Native friendly (no `href`/`target`). |
| `disabled` | `boolean` |  | `false` |  | evidence (2026-10-01) | Opacity 0.4 with onPress suppressed; the link has aria-disabled=true and tabindex=-1, so Tab skips it. Declared: Disables interaction and dims the label. Default false, from the component source. |
| `autolayout` ⚑ flagged (trace-check) | `'Fill' \| 'Hug'` | Fill, Hug | `"Fill"` |  | evidence (2026-09-29) | Fill is align-self: stretch, so a press on the empty right side of a Fill row fires onPress; Hug is the label's width. In a plain block parent on the web the element is inline and Fill has no effect. Declared: Layout sizing (matches the Figma `autolayout` variant). - `Fill` (default): the label stretches to fill the parent's width, so `textAlign="Center"` is visible and the whole line is tappable. - `Hug`: the label hugs its content width. Default "Fill", from the component source. |
| `textAlign` ⚑ flagged (trace-check) | `'Left' \| 'Center'` | Left, Center | `"Left"` |  | evidence (2026-09-29) | Center shows only with Fill; Hug with Center renders at the left edge. Declared: Horizontal alignment of the label (matches `Text`). Default "Left", from the component source. |
| `modes` | `Modes` |  |  |  | types | Modes configuration for design token resolution (cascades from `TextSegment`). |
| `style` | `StyleProp<TextStyle>` |  |  |  | types | Style override for the label. |
| `numberOfLines` ⚑ flagged (trace-check) | `number` |  |  |  | evidence (2026-09-29) | numberOfLines 1 keeps the label to one line with an ellipsis; without it, long labels wrap. Declared: Number of lines to limit the label to. |
| `disableTruncation` | `boolean` |  |  |  | types | Never truncate — drops the clamp/ellipsis and lets the label overflow. See {@link Text}. |
| `singleLine` | `boolean` |  |  |  | types | Force a single non-wrapping line (implies `disableTruncation`). See {@link Text}. |
| `accessibilityLabel` | `string` |  |  |  | types | Accessibility label; defaults to the resolved text content. |
| `accessibilityHint` | `string` |  |  |  | types | Accessibility hint describing what activating the link does. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Color Mode` ⚑ flagged (trace-check) | `mode collection` | Light, Dark | `"Light"` |  | evidence (2026-09-29) | Dark leaves text/foreground black: Link (like Text) is not recoloured. Declared: A token collection Link reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context` | `mode collection` | Default, Nudge&Alert, CTACard, ListItem | `"Default"` |  | types | A token collection Link reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` ⚑ flagged (trace-check) | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | evidence (2026-09-29) | JioPlus gives white link text. Declared: A token collection Link reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Text Appearance` ⚑ flagged (trace-check) | `mode collection` | Neutral, Primary, Secondary, Tertiary, Success, Warning, Error | `"Neutral"` |  | evidence (2026-09-29) | Primary is gold rgb(206,161,90), about 2.4:1 on white; Secondary is purple; Error is red. Inside a TextSegment the link takes the paragraph's modes. Declared: A token collection Link reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Text Sizes` ⚑ flagged (trace-check) | `mode collection` | Medium, Small, Large | `"Medium"` |  | evidence (2026-09-29) | Small 12/16, Medium 14/17, Large 18/24 px; line boxes 16, 17 and 24 px tall. Declared: A token collection Link reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Weight` ⚑ flagged (trace-check) | `mode collection` | Medium, Regular, Bold | `"Medium"` |  | evidence (2026-09-29) | Regular 400, Medium 500 (the default), Bold 800. Declared: A token collection Link reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types | Child nodes (string or nested `Text`/`Link`). Wins over `text`. |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onPress` | `(event: GestureResponderEvent) => void` |  |  |  | types | Called when the link is activated. Navigation is the consumer's job (e.g. `Linking.openURL`, a router push) — `Link` is intentionally navigation-agnostic and React Native friendly (no `href`/`target`). |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- No pressed, hover or visited style, and no testID. _(evidence, 2026-09-29)_ ⚑ flagged (trace-check)
- Dark Color Mode does not recolour Link (or Text). _(evidence, 2026-09-29)_ ⚑ flagged (trace-check)
- Figma has no disabled variant and no Center + Hug variant; the package adds disabled. _(evidence, 2026-10-01)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/facts/props/4` · trace-check: Checked on jfs-components 0.1.77 (2026-09-29); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/props/5` · trace-check: Checked on jfs-components 0.1.77 (2026-09-29); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/props/8` · trace-check: Checked on jfs-components 0.1.77 (2026-09-29); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/modes/3` · trace-check: Checked on jfs-components 0.1.77 (2026-09-29); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/modes/4` · trace-check: Checked on jfs-components 0.1.77 (2026-09-29); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/modes/5` · trace-check: Checked on jfs-components 0.1.77 (2026-09-29); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/modes/0` · trace-check: Checked on jfs-components 0.1.77 (2026-09-29); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/modes/2` · trace-check: Checked on jfs-components 0.1.77 (2026-09-29); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/gaps/0` · trace-check: Checked on jfs-components 0.1.77 (2026-09-29); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/gaps/1` · trace-check: Checked on jfs-components 0.1.77 (2026-09-29); the installed package is 0.1.78. Re-check before relying on it.
