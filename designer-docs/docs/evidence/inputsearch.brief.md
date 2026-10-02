# Input Search brief

slug: inputsearch · label: Input Search · public API: InputSearch (+ Card, VStack, ListItem, Text, FormField for composition)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1796-188 · storybook: docsUrl('inputsearch') · stories: Default=components-inputsearch--default, With value=components-inputsearch--with-value, No support text=components-inputsearch--no-support-text, Custom support icon=components-inputsearch--with-custom-support-icon, Animated placeholders=components-inputsearch--animated-placeholders
checked: 2 October 2026 · jfs-components 0.1.78 (mirror tag v0.1.78-3795b4c, up to date)
icon: a magnifier over a hint line — `<circle cx="7.5" cy="7" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M11 10.5l3.5 3.5M2 16h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />`
keywords: search, search bar, search field, find, clear button

Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`. Every InputSearch gets `modes={LIGHT}`, its own `value` state with `onChangeText` (typing and the clear button need both), and an `accessibilityLabel` equal to its placeholder. Set `supportText={false}` wherever no hint is listed; never leave the default "Support Text". The light grey field vanishes on the grey stages, so every example uses a host built from the kit’s `<Surface width="wide">` (or `"narrow"` where stated) wrapping `<VStack modes={LIGHT} style={{ width: '100%' }}>`, and the Anatomy and Sizing diagrams use `surface="white"`. `testID` lands on the inner `<input>`. Inside an Anatomy, the InputSearch root is `:scope > div`; its children are the field and the support text.

## Overview
summary: Use an Input Search to search a list, with a clear button that appears as people type and an optional hint below.
principle: Say what people can find, and let them start over.
playground: `.preview-stage` holding a host with `<InputSearch value={value} onChangeText={setValue} placeholder={placeholder} accessibilityLabel={placeholder} supportText={hint} supportTextLabel="Try a name or mobile number" />`. Controls: `text-control` "Placeholder" (default "Search payees", maxLength 40); OnOff "Support text" (on). Readout title "Query", value = the typed text or "Empty". Stage label: "Live Coin Input Search".

## Anatomy
header: Anatomy · title: A search field, a clear button, and a hint · description: A grey, fully rounded field holds the search icon and the query. A clear button appears once people type, and an optional hint sits below.
specimen: `<Anatomy surface="white" specimenWidth={300} …><InputSearch modes={LIGHT} testID="is-anatomy" value={value} onChangeText={setValue} placeholder="Search payees" accessibilityLabel="Search payees" supportTextLabel="Try a name or mobile number" /></Anatomy>` with its own state, initial value "Asha". Let `F = ':scope > div > div:first-child'`.
parts:
1. Search icon — Marks the field as search; always shown. — target: `${F} > div:first-child` — side: top
2. Query — The placeholder, then what people type; one line. — target: `byTestId('is-anatomy')` — side: top
3. Clear — Appears with text and empties the field. — target: `${F} > div:last-child` — side: right
4. Field — Grey rounded surface; a dark outline shows focus. — target: `F` — side: left
5. Hint — Optional support text about what people can search for. — target: `:scope > div > div:last-child` — side: bottom

## Configuration
header: Configuration · title: Add a hint when the prompt is not enough · description: The hint is on by default and reads “Support Text” until you write one. Write a short hint, or turn it off.
Grid `coin-new-example-grid` (each in a host):
- With a hint — `placeholder="Search payees" supportTextLabel="Try a name or mobile number"` — lesson: The hint says what kinds of search work.
- Without a hint — `placeholder="Search help articles" supportText={false}` — lesson: Turn it off when the prompt says enough.

## States
header: States · title: Empty, focused, and filled · description: Empty, the field shows its prompt. Focused, a dark outline appears and the prompt clears. Filled, a clear button appears at the end. It has no disabled or error state.
Grid `coin-new-example-grid` (each in a host):
- Empty — `placeholder="Search payees" supportText={false}` — lesson: The prompt shows until people type. Select the field to see the focus outline.
- Filled — same, initial value "Asha" — lesson: The clear button empties the field in one tap.

## Sizing
header: Sizing · title: Full width, 42 px tall · description: Input Search fills its container’s width. The field is 42 px tall with 14 px of padding at each end and 18 px icons, and the hint sits 8 px below. The screen sets the width.
Measured diagram: `<Anatomy legend={false} surface="white" specimenWidth={300} marks={[{ kind: 'size', target: F, side: 'top', label: 'both' }, { kind: 'padding', target: F }, { kind: 'gap', from: F, to: ':scope > div > div:last-child' }]}><InputSearch modes={LIGHT} placeholder="Search payees" accessibilityLabel="Search payees" supportTextLabel="Try a name or mobile number" value="" onChangeText={() => {}} /></Anatomy>`. Expected labels about 300 × 42 and 8 px.
Then ExampleCard "In a narrow column" — `narrow` host with `placeholder="Search" supportTextLabel="Try a name or mobile number"` — lesson: The field narrows with its column, and the hint wraps.

## Content
header: Content · title: Say what people can find · description: Write a short prompt that names what people search, such as “Search payees”, in sentence case with no full stop. Use the hint for an example of what works. The field has no visible label, so give it an accessibility label with the same words.
One ExampleCard "Prompts and hints" with a `coin-new-stack` of three in one host:
- `placeholder="Search payees" supportTextLabel="Try a name or mobile number"`
- `placeholder="Search funds" supportTextLabel="Try a fund name or fund house"`
- `placeholder="Search help articles" supportText={false}`

## In context
header: In context · title: Find a payee · description: The screen filters the list as people type and restores it when they clear the field; Input Search only reports the text.
Composition in `.coin-new-context`: `<Card modes={LIGHT}>` › `<VStack modes={LIGHT}>` › controlled InputSearch (`placeholder="Search payees" accessibilityLabel="Search payees" supportTextLabel="Try a name or mobile number"`) › `<ListItem modes={LIGHT} layout="Horizontal" navArrow={false} title=… supportText=… />` rows filtered case-insensitively by name or by digits in the number (ignore spaces): "Asha Rao" / "98765 43210", "Ravi Kumar" / "91234 56780", "Meera Shah" / "99887 76655". When nothing matches, show `<Text modes={LIGHT}>No payees match</Text>`.

## Do & Don'ts
header: Do & Don’ts · title: Keep the search clear · description: Each pair shows a search people understand versus one that confuses them.
Every preview is a host.
- Do Write your own hint: The hint gives an example that works. — `placeholder="Search payees" supportTextLabel="Try a name or mobile number"` | Don't Leave the default hint: The placeholder words “Support Text” reach people. — `placeholder="Search payees"` (support text left on, no label)
- Do Keep one fixed prompt: The field always says what it searches. — `placeholder="Search investments" supportText={false}` | Don't Rotate the prompt: Changing text distracts, and the field loses its accessible name. — `placeholder={['Search gold', 'Search funds', 'Search bills']} supportText={false}` (no accessibilityLabel here)
- Do Use a Form Field for a labelled value: The label stays while people type. — `<FormField modes={LIGHT} label="Account number" placeholder="XXXX XXXX XXXX" />` | Don't Collect a value with a search field: The prompt disappears as people type, and there is no label or error. — `placeholder="Account number" supportText={false}`

## Sources
header: Sources · title: Use the public Input Search contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> from the team’s private package repository. Figma’s Input Search is a 251 × 68 set with idle and active variants and a support text option. The package is a Text Input with a fixed search icon, a clear button that appears with text, and support text that is on by default and reads “Support Text” until you set it. The field is 42 px tall (44 px in Figma) and shows focus with a dark outline instead of Figma’s grey border. It has no label, error, or disabled design. On the web the clear button has no role or name, the field adds an unnamed tab stop before the input, and without an accessibility label the field is named only by its placeholder, which clears on focus.

## Limits
Do not show Dark mode, `editable={false}`, custom `leading`/`trailing`, `supportTextIcon`, `containerStyle`/`inputStyle`, or a rotating placeholder outside the Don’t. Do not imply a disabled or error state, or that the clear button is announced.
