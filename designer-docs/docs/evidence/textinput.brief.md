# Text Input brief

slug: textinput · label: Text Input · public API: TextInput (+ Icon, Card, VStack, ListItem, Text for composition)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=506-10017 · storybook: docsUrl('textinput') · stories: Default=components-textinput--default, Leading and trailing=components-textinput--with-leading-and-trailing, Custom leading=components-textinput--with-custom-leading, Search=components-textinput--search
checked: 1 October 2026 · jfs-components 0.1.77 (newest package tag v0.1.78; TextInput unchanged)
icon: a field with a cursor — `<rect x="1.5" y="5" width="15" height="8" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M6 7.3v3.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />`
keywords: input, text field, search field, search bar

Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`; `const NEUTRAL = { 'Color Mode': 'Light', AppearanceBrand: 'Neutral' } as Modes`. Every TextInput gets `modes={LIGHT}`, and trailing icons are `<Icon iconName="…" size={18} modes={NEUTRAL} />`. Text Input fills its container, and its light grey (#f5f5f5) field vanishes on the grey stages, so every example sits on the kit’s white `Surface` (`<Surface width="wide">`, or `width="narrow"` where stated) instead of a host, and the Anatomy and Sizing diagrams use `surface="white"`. The playground puts `<Surface width="wide">` inside `.preview-stage`. `testID` lands on the inner `<input>`; inside an Anatomy the field container is `:scope > div`. Controlled examples keep their own `value` state.

## Overview
summary: Use a Text Input for a single line of text, such as a search, with an icon that hints at what to type.
principle: A short prompt, the right icon, and room to type.
playground: `.preview-stage` holding a host with `<TextInput value={value} onChangeText={setValue} placeholder={placeholder} leadingIconName={icon === 'Search' ? 'ic_search' : 'ic_rupee'} trailing={filter ? <Icon iconName="ic_filter" size={18} modes={NEUTRAL} /> : undefined} />`. Controls: `text-control` "Placeholder" (default "Search transactions", maxLength 40); Segment "Leading icon" Search | Rupee; OnOff "Trailing icon" (default off). Readout title "Value", value = the typed text or "Empty". Stage label: "Live Coin Text Input".

## Anatomy
header: Anatomy · title: An icon, the text, and an optional end slot · description: A grey, fully rounded field holds a leading icon, the text people type, and optional content at the end.
specimen: `<Anatomy specimenWidth={300} …><TextInput testID="ti-anatomy" placeholder="Search transactions" trailing={<Icon iconName="ic_filter" size={18} modes={NEUTRAL} />} /></Anatomy>`
parts:
1. Leading icon — Hints at what to type; a search icon by default. — target: `:scope > div > div:first-child` — side: left
2. Text — The placeholder, then what people type; one line. — target: `byTestId('ti-anatomy')` — side: top
3. End slot — Optional content after the text, such as a filter icon. — target: `:scope > div > div:last-child` — side: right
4. Field — Grey rounded surface; a dark outline shows focus. — target: `:scope > div` — side: bottom

## Configuration
header: Configuration · title: Choose the icons · description: The leading icon is always there: keep the search icon or pick one that matches what people type. The end slot is empty unless you add content.
Grid `coin-new-example-grid` (each in a host):
- Search — `placeholder="Search transactions"` — lesson: The default, for searching a list.
- Matching icon — `placeholder="Amount" leadingIconName="ic_rupee"` — lesson: The icon says what kind of text belongs here.
- End slot — `placeholder="Search funds" trailing={<Icon iconName="ic_filter" … />}` — lesson: A cue at the end, such as filters.

## States
header: States · title: Empty, focused, and filled · description: Empty, the field shows its placeholder. Focused, a dark outline appears and the placeholder clears. Filled, it shows the text. It has no disabled or error state.
Grid `coin-new-example-grid` (each in a host):
- Empty — `placeholder="Search transactions"` — lesson: The prompt shows until people type. Select the field to see the focus outline.
- Filled — `value="Gold"` with its own state — lesson: The text replaces the prompt.

## Sizing
header: Sizing · title: Full width, 42 px tall · description: Text Input fills its container’s width and is 42 px tall, with 14 px of padding at each end and 18 px icons. The screen sets the width.
Measured diagram: `<Anatomy legend={false} specimenWidth={300} marks={[{ kind: 'size', target: ':scope > div', side: 'bottom', label: 'both' }, { kind: 'padding', target: ':scope > div' }]}><TextInput placeholder="Search transactions" /></Anatomy>`. Expected label about 300 × 42.
Then ExampleCard "In a narrow column" — `narrow` host with `placeholder="Search"` — lesson: The field narrows with its column.

## Content
header: Content · title: Prompt with what to type · description: Write a short placeholder that names what to type, such as “Search transactions”. Keep instructions out of it: it disappears as soon as people start typing.
One ExampleCard "Prompts" with three hosts: "Search transactions", "Search funds or stocks", "Amount" (Rupee icon).

## In context
header: In context · title: Search a list of transactions · description: The screen filters the list as people type; Text Input only reports the text.
Composition in `.coin-new-context`: `<Card modes={LIGHT}>` › `<VStack modes={LIGHT}>` › TextInput (controlled, `placeholder="Search transactions"`), then `<ListItem modes={LIGHT} layout="Horizontal" navArrow={false} title=… supportText=… />` rows filtered case-insensitively by title: "Gold purchase" / "₹2,000 · 28 Sep", "Electricity bill" / "₹1,240 · 27 Sep", "Grocery store" / "₹860 · 26 Sep". When nothing matches, show `<Text modes={LIGHT}>No transactions match</Text>`.

## Do & Don'ts
header: Do & Don’ts · title: Keep the field clear · description: Each pair shows a field people can fill in versus one that loses them.
Every preview is a host.
- Do Prompt with what to type: A short prompt names the task. — `placeholder="Search transactions"` | Don't Put instructions in the placeholder: It is cut off and disappears as people type. — `placeholder="Enter the 12-digit number exactly as printed on your card"`
- Do Match the icon to the task: The rupee icon says an amount goes here. — `placeholder="Amount" leadingIconName="ic_rupee"` | Don't Keep the search icon everywhere: A search icon on an amount field misleads. — `placeholder="Amount"`
- Do Keep one fixed prompt: The field always says what it is for. — `placeholder="Search"` | Don't Rotate the prompt: Changing text distracts, and the field loses its accessible name. — `placeholder={['Search gold', 'Search funds', 'Search bills']}`

## Sources
header: Sources · title: Use the public Text Input contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.77</code> from the team’s private package repository; Text Input is unchanged in 0.1.78. Figma’s textInput is 251 × 44 with start and end icon slots; the package renders 42 px tall and shows focus with its own dark outline. <code>TextInput.Search</code> is the same field with a fixed search icon. The field has no visible label, error, or disabled state, and its leading icon can be changed but not removed. On the web the accessibility label is not applied to the input and the placeholder clears on focus, so a focused field has no accessible name; a rotating placeholder leaves it unnamed throughout.

## Limits
Do not show Dark mode, the `InputState` modes, `editable={false}`, `inputStyle`/`style`, a custom `leading` node, or focusable controls in the slots. Do not imply a visible label, an error or disabled state, or an announced name (ticket #183).
