# HelloJioInput

> Coin agent pack 0.1.78+27 (pilot). Generated from `components/hellojioinput.json`; the JSON is the source of truth.

- **State:** documented
- **Package:** jfs-components 0.1.78 · guide commit `3f56271` · built 2026-10-31T05:18:28Z
- **Category:** input (for discovery only, not a limit on composition) · **Tags:** chat, assistant, prompt, composer, send message, ask
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=hellojioinput) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=7584-1796) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-hellojioinput--docs)

Use a HelloJio Input for the HelloJio assistant’s prompt: people type a question and send it, with optional attachments above.

## Use when

- **recommended** The assistant's prompt: people type a question and send it, with optional attachments above.  
  _From summary: “Use a HelloJio Input for the HelloJio assistant’s prompt: people type a question and send it, with optional attachments above.”_
- **recommended** One short question, one tap to send.  
  _From corePrinciple: “One short question, one tap to send.”_
- **recommended** Asking the assistant a question: the brand mark and send button promise an answer.  
  _From doDont: “The brand mark and send button promise an answer.”_

## Avoid when

- **discouraged** Search: people expect an answer, not a list of results.  
  _From doDont: “People expect an answer, not a list of results.”_
- **discouraged** A search row: the upstream Storybook docs, as the evidence records them, say it is not a search row and point to InputSearch for search. Use instead: `InputSearch`.  
  _From evidence: “"not a form field and not a search row". Use FormField or MessageField for labelled input, InputSearch for search.”_
- **discouraged** Labelled input, as in a form: the upstream Storybook docs, as the evidence records them, say it is not a form field and point to FormField or MessageField for labelled input. Use instead: `FormField`.  
  _From evidence: “"not a form field and not a search row". Use FormField or MessageField for labelled input, InputSearch for search.”_
- **discouraged** Labelled input, as in a form: the upstream Storybook docs, as the evidence records them, point to MessageField or FormField for labelled input. Use instead: `MessageField`.  
  _From evidence: “"not a form field and not a search row". Use FormField or MessageField for labelled input, InputSearch for search.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Brand icon | The assistant's brand mark; it can be turned off. | no | anatomy: “The HelloJio mark; it can be turned off.” |
| Prompt | The placeholder, then the question people type; one line. | yes | anatomy: “The placeholder, then the question people type; one line.” |
| Send | Gold button that sends the text; Return sends too. | no | anatomy: “Gold button that sends the text; Return sends too.” |
| Field | Grey rounded surface; white with a border while focused. | yes | anatomy: “Grey rounded surface; white with a border while focused.” |
| Attachments | Files people add, inside the field above the prompt. | no | configuration: “Attachments people add sit inside the field, above the prompt.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `leading` | `ReactNode` | types |
| `trailing` | `ReactNode` | types |
| `attachments` | `ReactNode` | types |

## Placement

- **recommended** It fills its container's width and is 38 px tall (36 px in Jio Plus, which has no border), with an 18 px brand icon and a 26 px send button.  
  _From sizing: “HelloJio Input fills its container’s width and is 38 px tall (36 px in Jio Plus, which has no border), with an 18 px brand icon and a 26 px send button.”_
- **recommended** `attachments`: Attachments add height above the prompt.  
  _From sizing: “Attachments add height above the prompt.”_

## Configuration

- **recommended** The brand icon and send button are on by default and can each be turned off.  
  _From configuration: “The brand icon and send button are on by default and can each be turned off.”_
- **recommended** `leading`: Turn the brand icon off (leading={null}) on screens that already show the assistant's brand mark.  
  _From configuration: “For screens that already show the HelloJio mark.”_
- **recommended** `trailing`: Without send (trailing={null}), the Return key still sends the text.  
  _From configuration: “The Return key still sends the text.”_
- **recommended** `attachments`: attachments holds the files people added: they sit above the prompt, and the field grows to fit.  
  _From configuration: “Files people added sit above the prompt, and the field grows to fit.”_
- **recommended** `attachments`: With two attachments the field grows, and the chips scroll sideways when they run out of room; the chips sit in a ScrollArea › HStack, as in Figma's attachment slot and the guide's own chips.  
  _From sizing: “The field grows, and the chips scroll sideways when they run out of room.”_
- **recommended** `attachments`: Let people remove attachments: the close button takes the file out.  
  _From doDont: “The close button takes the file out.”_
- **discouraged** `attachments`: Don't show a close icon that does nothing: it looks tappable but nothing happens.  
  _From doDont: “It looks tappable but nothing happens.”_
- **recommended** `jioPlus` = `true`: Over imagery, jioPlus makes the idle field frosted glass.  
  _From states: “Over imagery, Jio Plus makes the idle field frosted glass.”_
- **recommended** `jioPlus` = `true`: Jio Plus needs content behind the field; on a flat sheet the frost has no job (the upstream Storybook docs, as the evidence records them).  
  _From evidence: “Jio Plus needs content behind the field; on a flat sheet "the frost has no job".”_
- **recommended** The package sets the state from focus and the Jio Plus option.  
  _From sources: “The package sets the state from focus and the Jio Plus option.”_
- **discouraged** `Hello Jio Input State`: Don't set Hello Jio Input State: states come from focus and jioPlus.  
  _From evidence: “States come from focus and `jioPlus`; do not author `Hello Jio Input State`.”_
- **recommended** `value`: value makes the field controlled; pair it with onChangeText.  
  _From fact `/facts/props/1` (value, source types)_
- **recommended** `onSubmit`: On send, the screen adds the question to the conversation and clears the field.  
  _From inContext: “The screen adds the question to the conversation and clears the field.”_
- **recommended** `onSubmit`: Send works even when the field is empty, and the text stays after sending, so the screen ignores empty prompts and clears the field.  
  _From sources: “Send works even when the field is empty, and the text stays after sending, so the screen ignores empty prompts and clears the field.”_

## Content

- **recommended** `placeholder`: Write a short, open prompt in sentence case with no full stop, such as “Ask me anything”.  
  _From content: “Write a short, open prompt in sentence case with no full stop, such as “Ask me anything”.”_
- **recommended** `placeholder`: Keep the prompt short: the whole prompt fits in the field.  
  _From doDont: “The whole prompt fits in the field.”_
- **discouraged** `placeholder`: Don't write a long prompt: it is cut off in the field.  
  _From doDont: “It is cut off in the field.”_

Good: “Ask me anything”, “Ask about your gold savings”

Bad: “Ask me anything about your gold, savings, loans, or bills”, “Search transactions”

## States

| State | When | From |
| --- | --- | --- |
| Idle | The field is grey while idle. | states: “The field is grey while idle” |
| Focused | The field turns white with a border while people type. | states: “turns white with a border while people type” |
| Jio Plus | With jioPlus, frosted glass over imagery while not focused; the prompt and typed text stay readable. | states: “Frosted glass over imagery while not focused. The prompt and typed text stay readable.” |
| Disabled | Half opacity; typing and sending are off. | states: “Half opacity; typing and sending are off.” |

## Accessibility

- **recommended** `placeholder`: The prompt is also the field's accessible name, so keep it meaningful.  
  _From content: “The prompt is also the field’s accessible name, so keep it meaningful.”_
- **recommended** `accessibilityLabel`: accessibilityLabel names the field; left out, the name is the placeholder.  
  _From fact `/facts/props/15` (accessibilityLabel, source evidence)_
- **recommended** On the web Tab goes from the input straight to Send.  
  _From sources: “On the web Tab goes from the input straight to Send.”_
- **recommended** `disabled`: Disabled: on the web the input is read-only, and the send button is aria-disabled and out of the tab order.  
  _From evidence: “`disabled`: opacity 0.5, input `readonly`, send `aria-disabled` and out of the tab order.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Keep the prompt short | Write a long prompt | It is cut off in the field. |
| Use it to ask HelloJio | Use it for search | People expect an answer, not a list of results. |
| Let people remove attachments | Show a close icon that does nothing | It looks tappable but nothing happens. |

## Examples

### The guide's In context: a Card holding a short conversation (a ChatBubble with the person's question, aligned to the end as in the guide, and one with the assistant's answer) and the prompt under it. On send, the screen adds the question to the conversation and clears the field, and it ignores an empty prompt. The literal value and the empty handlers stand for the screen's own state.

```tsx
<Card>
  <VStack>
    <ChatBubble role="user" text="What is the gold rate today?" style={{ alignSelf: 'flex-end' }} />
    <ChatBubble role="assistant" text="24K gold is ₹7,412 per gram today." />
    <HelloJioInput value="" onChangeText={(text) => {}} onSubmit={(text) => {}} />
  </VStack>
</Card>
```

_From inContext: “The screen adds the question to the conversation and clears the field. It also ignores an empty prompt, because Send works even when the field is empty.”_

### Without the brand icon, from the guide's Configuration: leading={null} for a screen that already shows the assistant's brand mark; the prompt and send button stay.

```tsx
<HelloJioInput leading={null} value="" onChangeText={(text) => {}} onSubmit={(text) => {}} />
```

_From configuration: “For screens that already show the HelloJio mark.”_

### With an attachment, from the guide's Configuration: a file people added sits above the prompt and the field grows to fit. The chip is a ChatAttachment in a horizontal ScrollArea › HStack, as in Figma's attachment slot and the guide's own chips; its onClose lets people take the file out (the screen removes it from its list).

```tsx
<HelloJioInput
  value=""
  onChangeText={(text) => {}}
  onSubmit={(text) => {}}
  attachments={
    <ScrollArea direction="horizontal">
      <HStack alignVertical="center">
        <ChatAttachment title="Statement_Sep" subtitle="PDF file" onClose={() => {}} />
      </HStack>
    </ScrollArea>
  }
/>
```

_From configuration: “Files people added sit above the prompt, and the field grows to fit.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `placeholder` | `string` |  | `"Ask me anything"` |  | types | Placeholder shown when empty. Defaults to `"Ask me anything"`. Default "Ask me anything", from the component source. |
| `value` | `string` |  |  |  | types | Controlled value. Pair with `onChangeText`. |
| `defaultValue` | `string` |  | `""` |  | types | Uncontrolled initial value. Ignored when `value` is provided. Default "", from the component source. |
| `onChangeText` | `(text: string) => void` |  |  |  | types | Called whenever the text changes. |
| `onSubmit` | `(text: string) => void` |  |  |  | evidence (2026-10-08) | Still receives empty text when the field is empty, and the field is not cleared after sending. Declared: Called when the user submits — either via the send button or the keyboard return key. Receives the current text. This is the primary action hook. |
| `leadingIconName` | `string` |  | `"ic_hellojio"` |  | types | Leading icon name from the registry. Defaults to `"ic_hellojio"`. Ignored when `leading` is provided. Default "ic_hellojio", from the component source. |
| `leading` | `React.ReactNode \| null` |  |  |  | types | Slot replacing the default leading icon (Figma Slot "start"). Receives `modes` recursively. Pass `null` to hide the leading icon entirely (the design's `startSlot={false}`), mirroring `trailing`. |
| `trailing` | `React.ReactNode \| null` |  |  |  | types | Slot replacing the default send `IconButton` (Figma Slot "end"). Pass `null` to hide the trailing control entirely. |
| `attachments` | `React.ReactNode` |  |  |  | types | Optional slot rendered inside the pill, stacked **above** the input row (Figma "Slot" / `attachmentSlot`). Use it for `ChatAttachment` chips the user has added to the prompt. `modes` cascade into the slotted children. When omitted, the pill is a single input row (default). |
| `sendIconName` | `string` |  | `"ic_send_message"` |  | types | Icon name for the default send button. Defaults to `"ic_send_message"`. Ignored when `trailing` is provided. Default "ic_send_message", from the component source. |
| `jioPlus` | `boolean` |  | `false` |  | evidence (2026-10-08) | The input sits above the glass layer, so the prompt and typed text stay readable on a photo. Declared: When `true`, renders the IdleJioPlus glass surface while unfocused. Focus still switches to the Active (solid white + border) state. Default false, from the component source. |
| `disabled` | `boolean` |  | `false` |  | evidence (2026-10-02) | Opacity 0.5; on the web the input is read-only and the send button is aria-disabled and out of the tab order. Declared: Disables typing and the send button. Default false, from the component source. |
| `modes` | `Modes` |  |  |  | types | Design token modes. Visual Idle/Active/IdleJioPlus is derived from focus + `jioPlus`. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Container style override. |
| `inputStyle` | `StyleProp<TextStyle>` |  |  |  | types | Text input style override. |
| `accessibilityLabel` | `string` |  |  |  | evidence (2026-10-02) | Defaults to the placeholder. |
| `accessibilityHint` | `string` |  |  |  | types |  |
| `testID` | `string` |  |  |  | types |  |
| `onFocus` | `RNTextInputProps["onFocus"]` |  |  |  | types |  |
| `onBlur` | `RNTextInputProps["onBlur"]` |  |  |  | types |  |
| `...Omit<RNTextInputProps, 'style' | 'value' | 'defaultValue' | 'onChangeText' | 'onFocus' | 'onBlur' | 'placeholder' | 'editable' | 'onSubmitEditing'>` | `Omit<RNTextInputProps, 'style' \| 'value' \| 'defaultValue' \| 'onChangeText' \| 'onFocus' \| 'onBlur' \| 'placeholder' \| 'editable' \| 'onSubmitEditing'>` |  |  |  | types | Inherited React Native props the component also accepts. They are not part of the design contract and no guide documents them. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Primary"` |  | types | A token collection HelloJioInput reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / Size` | `mode collection` | M, S, XS | `"M"` |  | types | A token collection HelloJioInput reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / State` | `mode collection` | Idle, Hover, Pressed, Disabled | `"Idle"` |  | types | A token collection HelloJioInput reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection HelloJioInput reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context2` | `mode collection` | Default, AppBar | `"Default"` |  | types | A token collection HelloJioInput reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Emphasis` | `mode collection` | High, Medium, Low | `"High"` |  | types | A token collection HelloJioInput reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Hello Jio Input State` | `mode collection` | Idle, Active | `"Idle"` |  | types | A token collection HelloJioInput reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Hello Jio Size` | `mode collection` | M, L, XL | `"M"` |  | types | A token collection HelloJioInput reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection HelloJioInput reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `leading` | `React.ReactNode \| null` |  |  |  | types | Slot replacing the default leading icon (Figma Slot "start"). Receives `modes` recursively. Pass `null` to hide the leading icon entirely (the design's `startSlot={false}`), mirroring `trailing`. |
| `trailing` | `React.ReactNode \| null` |  |  |  | types | Slot replacing the default send `IconButton` (Figma Slot "end"). Pass `null` to hide the trailing control entirely. |
| `attachments` | `React.ReactNode` |  |  |  | types | Optional slot rendered inside the pill, stacked **above** the input row (Figma "Slot" / `attachmentSlot`). Use it for `ChatAttachment` chips the user has added to the prompt. `modes` cascade into the slotted children. When omitted, the pill is a single input row (default). |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onChangeText` | `(text: string) => void` |  |  |  | types | Called whenever the text changes. |
| `onSubmit` | `(text: string) => void` |  |  |  | types | Called when the user submits — either via the send button or the keyboard return key. Receives the current text. This is the primary action hook. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- The send button is 26 × 26 px against Figma's 28 px (IconButton's known 2 px size gap). _(evidence, 2026-10-08)_
- Send works with an empty field and the text stays after sending: onSubmit receives empty text and the field is not cleared, so the screen ignores empty prompts and clears the field itself. The evidence records this as an open question. _(evidence, 2026-10-08)_
- Figma's component has no size or disabled property, while the package has a disabled prop. _(evidence, 2026-10-02)_

## Flags

_None._
