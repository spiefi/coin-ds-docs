# HelloJioInput (brief)

> Coin agent pack 0.1.78+20 · documented · full entry: `components/hellojioinput.md` (sources, all facts, flags)

Use a HelloJio Input for the HelloJio assistant’s prompt: people type a question and send it, with optional attachments above.

**Use when**
- The assistant's prompt: people type a question and send it, with optional attachments above.
- One short question, one tap to send.
- Asking the assistant a question: the brand mark and send button promise an answer.

**Avoid when**
- Avoid: Search: people expect an answer, not a list of results.
- Avoid: A search row: the upstream Storybook docs, as the evidence records them, say it is not a search row and point to InputSearch for search. Use instead: InputSearch.
- Avoid: Labelled input, as in a form: the upstream Storybook docs, as the evidence records them, say it is not a form field and point to FormField or MessageField for labelled input. Use instead: FormField.
- Avoid: Labelled input, as in a form: the upstream Storybook docs, as the evidence records them, point to MessageField or FormField for labelled input. Use instead: MessageField.

**Placement**
- It fills its container's width and is 38 px tall (36 px in Jio Plus, which has no border), with an 18 px brand icon and a 26 px send button.
- `attachments`: Attachments add height above the prompt.

**Key rules**
- The brand icon and send button are on by default and can each be turned off.
- `leading`: Turn the brand icon off (leading={null}) on screens that already show the assistant's brand mark.
- `trailing`: Without send (trailing={null}), the Return key still sends the text.
- `attachments`: attachments holds the files people added: they sit above the prompt, and the field grows to fit.
- `attachments`: With two attachments the field grows, and the chips scroll sideways when they run out of room; the chips sit in a ScrollArea › HStack, as in Figma's attachment slot and the guide's own chips.
- `attachments`: Let people remove attachments: the close button takes the file out.
- Avoid: `attachments`: Don't show a close icon that does nothing: it looks tappable but nothing happens.
- `jioPlus` = `true`: Over imagery, jioPlus makes the idle field frosted glass.

**Example:** The guide's In context: a Card holding a short conversation (a ChatBubble with the person's question, aligned to the end as in the guide, and one with the assistant's answer) and the prompt under it. On send, the screen adds the question to the conversation and clears the field, and it ignores an empty prompt. The literal value and the empty handlers stand for the screen's own state.

```tsx
<Card>
  <VStack>
    <ChatBubble role="user" text="What is the gold rate today?" style={{ alignSelf: 'flex-end' }} />
    <ChatBubble role="assistant" text="24K gold is ₹7,412 per gram today." />
    <HelloJioInput value="" onChangeText={(text) => {}} onSubmit={(text) => {}} />
  </VStack>
</Card>
```

**Props:** `placeholder`, `value`, `defaultValue`, `onChangeText`, `onSubmit`, `leadingIconName`, `leading`, `trailing`, `attachments`, `sendIconName`, `jioPlus`, `disabled`, `modes`, `style`, `inputStyle`, `accessibilityLabel`, `accessibilityHint`, `testID`, `onFocus`, `onBlur`. (* required)

**Modes it reads:** AppearanceBrand, Button / Size, Button / State, Color Mode, Context2, Emphasis, Hello Jio Input State, Hello Jio Size, Page type.

**Gaps (report, do not work around)**
- The send button is 26 × 26 px against Figma's 28 px (IconButton's known 2 px size gap).
- Send works with an empty field and the text stays after sending: onSubmit receives empty text and the field is not cleared, so the screen ignores empty prompts and clears the field itself. The evidence records this as an open question.
- Figma's component has no size or disabled property, while the package has a disabled prop.

Full entry: `components/hellojioinput.md`. Links: `components/hellojioinput.links.md`.
