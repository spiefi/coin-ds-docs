# Message Field brief

slug: messagefield · label: Message Field · public API: MessageField (+ SupportText, Button, Card, VStack, Text, FormField for composition)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4835-2564 · storybook: docsUrl('messagefield') · stories: Default=components-messagefield--default, Required=components-messagefield--required, Invalid=components-messagefield--invalid, Read only=components-messagefield--read-only, Disabled=components-messagefield--disabled, No counter=components-messagefield--no-counter, Custom rows=components-messagefield--custom-rows, All states=components-messagefield--all-states
checked: 2 October 2026 · jfs-components 0.1.78 (mirror tag v0.1.78-3795b4c, up to date)
icon: a text box with lines — `<rect x="1.5" y="2.5" width="15" height="13" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M4.5 6.5h9M4.5 9.5h9M4.5 12.5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />`
keywords: textarea, multiline, comment box, feedback, message

Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`; `const ERROR = { 'Color Mode': 'Light', Status: 'Error' } as Modes`. Every MessageField gets `modes={LIGHT}`. An error message under a field is `<SupportText modes={ERROR} status="Error" label="…" />`. Message fields sit on white screens, so every example uses a host built from the kit’s `<Surface width="wide">` wrapping `<VStack modes={LIGHT} style={{ width: '100%' }}>`, and the Anatomy and Sizing diagrams use `surface="white"`. Any field people can type in keeps its own `value` state (pass `value` and `onChangeText`). `testID` lands on the MessageField root; its children are the label row, the text area box, and the counter, in that order.

## Overview
summary: Use a Message Field for a few sentences of free text, such as feedback or a description of a problem.
principle: Room to explain, with a clear limit.
playground: `.preview-stage` holding a host with `<MessageField value={value} onChangeText={setValue} label={label} placeholder="What happened, and when?" maxLength={limit === 'None' ? undefined : Number(limit)} rows={Number(rows)} isRequired={required} isInvalid={state === 'Error'} isReadOnly={state === 'Read only'} isDisabled={state === 'Disabled'} />`. Controls: `text-control` "Label" (default "Describe your issue", maxLength 32); Segment "Limit" None | 140 | 500 (default 140); Segment "Rows" 4 | 6 | 8 (default 4); Segment "State" Default | Error | Read only | Disabled; OnOff "Required" (off). Readout title "Characters", value = the text length as a number ("0" when empty). Stage label: "Live Coin Message Field".

## Anatomy
header: Anatomy · title: A label, a text area, and a counter · description: The label names the message. The text area holds a few lines of text, and a counter below shows how much room is left.
specimen: `<Anatomy surface="white" specimenWidth={300} …><MessageField modes={LIGHT} testID="mf-anatomy" label="Describe your issue" isRequired placeholder="What happened, and when?" maxLength={140} /></Anatomy>` (let `R = byTestId('mf-anatomy')`)
parts:
1. Label — Names the message and gives the field its accessible name. — target: `${R} > div:first-child > div:first-child` — side: left
2. Required mark — A red asterisk for a message people must write. — target: `${R} > div:first-child > div:last-child` — side: top
3. Placeholder — A writing hint that disappears when people type. — target: `${R} textarea` — side: right
4. Text area — White box, four lines tall; purple border on focus. — target: `${R} > div:nth-child(2)` — side: left
5. Counter — Characters used out of the limit; shown when a limit is set. — target: `${R} > div:nth-child(3)` — side: bottom, `at: 0.92` (the count is right-aligned)

## Configuration
header: Configuration · title: Set the limit and the height · description: A limit adds a counter and stops typing when it is reached. Rows set how tall the text area is; longer text scrolls inside it.
Grid `coin-new-example-grid three` (each in a host):
- With a limit — `label="Reason for cancelling" placeholder="Help us understand why you’re leaving" maxLength={140}` — lesson: The counter shows how much room is left.
- No limit — `label="Notes for the agent" placeholder="Anything else we should know?"` — lesson: Without a limit there is no counter.
- Taller — `label="Describe your issue" placeholder="What happened, and when?" rows={6} maxLength={1000}` — lesson: Six rows for a longer description.

## States
header: States · title: Default, filled, error, read only, and disabled · description: Focus draws a purple border. An error turns the label and border red but shows no message, so add one below the field. Read only and disabled lock the text.
Grid `coin-new-example-grid` (each in a host):
- Default — `label="Describe your issue" placeholder="What happened, and when?" maxLength={140}` — lesson: Select the field to see the purple focus border.
- Filled — same, initial value "I was charged twice for one gold purchase." — lesson: The counter tracks the length. Out of focus, the text turns the same grey as the placeholder.
- Error — `label="Describe your issue" value="Charged twice" maxLength={140} isInvalid` followed by `<SupportText modes={ERROR} status="Error" label="Add a few more details, at least 20 characters" />` in the same host — lesson: Red label and border; the message below is a separate Support Text.
- Read only — `label="Your message" value="Your request was received on 28 September." isReadOnly` — lesson: Grey label and border; people can read the text but not change it.
- Disabled — `label="Describe your issue" value="I was charged twice for one gold purchase." isDisabled` — lesson: Grey text and border, for a field that does not apply yet.

## Sizing
header: Sizing · title: Full width, four lines tall · description: Message Field fills its container’s width. The text area is 108 px tall, room for four lines, with 12 px of padding; each extra row adds 21 px. The counter sits 8 px below.
Measured diagram: `<Anatomy legend={false} surface="white" specimenWidth={300} marks={[{ kind: 'size', target: B, side: 'bottom', label: 'both' }, { kind: 'padding', target: B }]}><MessageField modes={LIGHT} testID="mf-size" label="Describe your issue" placeholder="What happened, and when?" /></Anatomy>` where `B = ${byTestId('mf-size')} > div:nth-child(2)`. Expected label about 300 × 108.
Then ExampleCard "Six rows" — host with `label="Describe your issue" placeholder="What happened, and when?" rows={6}` — lesson: 150 px tall: six rows of 21 px plus padding.

## Content
header: Content · title: Ask for one thing, with a fitting limit · description: Name the message in the label, such as “Describe your issue”, and use the placeholder for a writing hint. Pick a limit that fits the task: 140 characters for a short reason, 1,000 for a detailed description.
One ExampleCard "Labels, hints, and limits" with a `coin-new-stack` of two fields in one host:
- `label="Reason for cancelling" placeholder="Help us understand why you’re leaving" maxLength={140}`
- `label="Describe your issue" placeholder="What happened, and when?" maxLength={1000}`

## In context
header: In context · title: Report a problem · description: The screen checks the message when people tap Submit and shows the error below the field. Message Field only turns red; the button stays enabled.
Composition in `.coin-new-context`: `<Card modes={LIGHT}>` › `<VStack modes={LIGHT}>` › a controlled MessageField (`label="Describe your issue" placeholder="What happened, and when?" maxLength={500} isRequired`) › when invalid, `<SupportText modes={ERROR} status="Error" label="Add a few more details, at least 20 characters" />` › `<Button modes={LIGHT} label="Submit" />`. On press: fewer than 20 non-space characters → set `isInvalid` and show the Support Text; otherwise show `<Text modes={LIGHT}>Thanks, we’ll reply within 24 hours</Text>` below the button. Typing clears the error.

## Do & Don'ts
header: Do & Don’ts · title: Make the limits and errors visible · description: Each pair shows a field people can complete versus one that stops them without saying why.
Every preview is a host.
- Do Show the limit: The counter shows how much room is left. — `label="Reason for cancelling" maxLength={140} value="The app is too slow"` with its own state | Don't Hide the counter on a limit: Typing stops at the limit with no warning. — same with `showCounter={false}`
- Do Say what to fix: The message below says what is missing. — the Error example (field plus Support Text) | Don't Rely on red alone: The red border does not say what is wrong. — `label="Describe your issue" value="Charged twice" maxLength={140} isInvalid`
- Do Use a Form Field for a short value: One line for one value. — `<FormField modes={LIGHT} label="Order number" placeholder="JF-0000000" />` | Don't Ask for a short value in a Message Field: A four-line box suggests a long answer. — `<MessageField modes={LIGHT} label="Order number" placeholder="JF-0000000" />`

## Sources
header: Sources · title: Use the public Message Field contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> from the team’s private package repository. Figma’s Message Field is a 328 × 159 component with a label, a 108 px text area, and a fixed “0/140” counter; its states are variable modes. The package adds the required mark, a rows option, and a counter that shows only with a limit. It has no error message or support text: an error turns the label and border red, so the guide adds a Support Text below. Out of focus, typed text uses the placeholder’s grey. Dark mode is not supported. On the web the label names the text area, but the error and the required mark are not announced.

## Limits
Do not show Dark mode, forced `FormField States` modes, `showCounter` without `maxLength`, `defaultValue`, Form `validationErrors`, or `style`/`textareaStyle`/`inputStyle`. Do not imply Message Field shows an error message itself, or that errors and required are announced.
