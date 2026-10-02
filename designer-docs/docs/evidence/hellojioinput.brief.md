# HelloJio Input brief

slug: hellojioinput · label: HelloJio Input · public API: HelloJioInput (+ ChatAttachment, ChatBubble, ScrollArea, HStack, Card, VStack for composition)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=7584-1796 · storybook: docsUrl('hellojioinput') · stories: Default=components-hellojioinput--default, Active=components-hellojioinput--active, Jio Plus=components-hellojioinput--jio-plus, Submit log=components-hellojioinput--submit-log, Without send=components-hellojioinput--without-send, With attachments=components-hellojioinput--with-attachments
checked: 2 October 2026 · jfs-components 0.1.78 (mirror tag v0.1.78-3795b4c, up to date)
icon: a pill with a send arrow — `<rect x="1.5" y="5" width="15" height="8" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M10.5 9h3M12 7.5 13.5 9 12 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />`
keywords: chat, assistant, prompt, composer, send message, ask

Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`. Every Coin component gets `modes={LIGHT}`; every HelloJioInput has its own `value` state with `onChangeText`. An attachment is `<ScrollArea direction="horizontal" style={{ width: '100%' }}><HStack modes={LIGHT} alignVertical="center">{chips}</HStack></ScrollArea>` passed to `attachments`, each chip `<ChatAttachment modes={LIGHT} title="Statement_Sep" subtitle="PDF file" onClose={…} />` (second chip, where two are listed: "PAN_card", "PDF file"); `onClose` removes that chip from the example’s own list. Plain examples use a host built from the kit’s `<Surface width="wide">` wrapping `<VStack modes={LIGHT} style={{ width: '100%' }}>` (the light grey pill vanishes on the grey stages), and the Anatomy and Sizing diagrams use `surface="white"`. Jio Plus examples use `<Backdrop size="compact">` wrapping the same VStack. `testID` lands on the inner `<input>`; inside an Anatomy the pill is `:scope > div`, and without attachments its children are the brand icon, the input, and the send button.

## Overview
summary: Use a HelloJio Input for the HelloJio assistant’s prompt: people type a question and send it, with optional attachments above.
principle: One short question, one tap to send.
playground: `.preview-stage` holding a host — `Backdrop` when Background is Photo, otherwise the Surface host — with `<HelloJioInput value={value} onChangeText={setValue} onSubmit={setLast} jioPlus={background === 'Photo'} leading={brand ? undefined : null} trailing={send ? undefined : null} attachments={attachment ? chip : undefined} disabled={disabled} />`. The chip’s `onClose` turns the Attachment control off. Controls: Segment "Background" Plain | Photo; OnOff "Brand icon" (on); OnOff "Send button" (on); OnOff "Attachment" (off); OnOff "Disabled" (off). Readout title "Last sent", value = the last sent text in quotes, "(empty)" for an empty send, or "Nothing yet"; note "Send works even when the field is empty." Stage label: "Live Coin HelloJio Input".

## Anatomy
header: Anatomy · title: A brand icon, the prompt, and a send button · description: A grey pill holds the HelloJio mark, one line for the question, and a gold send button.
specimen: `<Anatomy surface="white" specimenWidth={300} …><HelloJioInput modes={LIGHT} testID="hj-anatomy" value={value} onChangeText={setValue} /></Anatomy>` with its own state.
parts:
1. Brand icon — The HelloJio mark; it can be turned off. — target: `:scope > div > div:first-child` — side: left
2. Prompt — The placeholder, then the question people type; one line. — target: `byTestId('hj-anatomy')` — side: top
3. Send — Gold button that sends the text; Return sends too. — target: `:scope > div > div:last-child` — side: right
4. Pill — Grey rounded surface; white with a border while focused. — target: `:scope > div` — side: bottom

## Configuration
header: Configuration · title: Choose what the pill shows · description: The brand icon and send button are on by default and can each be turned off. Attachments people add sit inside the pill, above the prompt.
Grid `coin-new-example-grid` (each in a Surface host):
- Default — `<HelloJioInput />` — lesson: The brand icon, the prompt, and the send button.
- Without the brand icon — `leading={null}` — lesson: For screens that already show the HelloJio mark.
- Without send — `trailing={null}` — lesson: The Return key still sends the text.
- With an attachment — `attachments` with one chip — lesson: Files people added sit above the prompt, and the pill grows to fit.

## States
header: States · title: Idle, focused, Jio Plus, and disabled · description: The pill is grey while idle and turns white with a border while people type. Over imagery, Jio Plus makes the idle pill frosted glass.
Grid `coin-new-example-grid` (two columns: in a three-column card the send button is pushed out of the pill):
- Idle — Surface host, default — lesson: Grey pill. Select it to see the white focused pill.
- Jio Plus — Backdrop host, `jioPlus` — lesson: Frosted glass over imagery while not focused. On the web the frost currently hides the prompt.
- Disabled — Surface host, `disabled` — lesson: Half opacity; typing and sending are off.

## Sizing
header: Sizing · title: Full width, 36 px tall · description: HelloJio Input fills its container’s width and is 36 px tall, with an 18 px brand icon and a 26 px send button. Attachments add height above the prompt.
Measured diagram: `<Anatomy legend={false} surface="white" specimenWidth={300} marks={[{ kind: 'size', target: ':scope > div', side: 'bottom', label: 'both' }, { kind: 'padding', target: ':scope > div' }]}><HelloJioInput modes={LIGHT} value="" onChangeText={() => {}} /></Anatomy>`. Expected label about 300 × 36.
Then ExampleCard "With two attachments" — Surface host, `attachments` with two chips — lesson: The pill grows, and the chips scroll sideways when they run out of room.

## Content
header: Content · title: Invite a question · description: Write a short, open prompt in sentence case with no full stop, such as “Ask me anything”. The prompt is also the field’s accessible name, so keep it meaningful.
One ExampleCard "Prompts" with a `coin-new-stack` of two in one Surface host: `placeholder="Ask me anything"`; `placeholder="Ask about your gold savings"`.

## In context
header: In context · title: Ask HelloJio · description: The screen adds the question to the conversation and clears the field. It also ignores an empty prompt, because Send works even when the field is empty.
Composition in `.coin-new-context`: `<Card modes={LIGHT}>` › `<VStack modes={LIGHT}>` › conversation: `<ChatBubble modes={LIGHT} role="user" text="What is the gold rate today?" style={{ alignSelf: 'flex-end' }} />`, `<ChatBubble modes={LIGHT} role="assistant" text="24K gold is ₹7,412 per gram today." />`, then one user bubble (same `alignSelf`) per sent question › controlled `<HelloJioInput modes={LIGHT} />` whose `onSubmit` trims the text, ignores it when empty, appends it, and clears the value.

## Do & Don'ts
header: Do & Don’ts · title: Keep the prompt clear · description: Each pair shows a prompt people understand versus one that misleads them.
Every preview is a Surface host.
- Do Keep the prompt short: The whole prompt fits in the pill. — `placeholder="Ask me anything"` | Don't Write a long prompt: It is cut off in the pill. — `placeholder="Ask me anything about your gold, savings, loans, or bills"`
- Do Use it to ask HelloJio: The brand mark and send button promise an answer. — `placeholder="Ask about your gold savings"` | Don't Use it for search: People expect an answer, not a list of results. — `placeholder="Search transactions"`
- Do Let people remove attachments: The close button takes the file out. — one chip with `onClose` | Don't Show a close icon that does nothing: It looks tappable but nothing happens. — one chip without `onClose`

## Sources
header: Sources · title: Use the public HelloJio Input contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> from the team’s private package repository. Figma’s HelloJio Input is a set with Idle, Active, and IdleJioPlus states, start and end slot options, and an attachment slot. The package sets the state from focus and the Jio Plus option. The pill is 36 px tall (38 px in Figma) and the send button 26 px (28 px). Send works even when the field is empty, and the text stays after sending, so the screen ignores empty prompts and clears the field. On the web the Jio Plus frost hides the prompt and typed text until the field is focused, and the pill adds an unnamed tab stop before the input. Dark mode is not shown.

## Limits
Do not show Dark mode, `leadingIconName`/`sendIconName`, custom `leading`/`trailing` nodes (only `null`), `style`/`inputStyle`, or Jio Plus on a plain background. Do not imply that the app does not need to ignore empty sends or clear the field.
