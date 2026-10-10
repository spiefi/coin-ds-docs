# Suggestive Search brief

slug: suggestivesearch · label: Suggestive Search · public API: SuggestiveSearch (+ Card, Button, VStack for composition)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4579-8094 · storybook: docsUrl('suggestivesearch') · stories: Default=components-suggestivesearch--default, Prefilled=components-suggestivesearch--prefilled, Empty message=components-suggestivesearch--with-empty-message, Invalid=components-suggestivesearch--invalid, Object items=components-suggestivesearch--object-items
checked: 10 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-636f3f5, Biscuit's main 636f3f5)
icon: a magnifier above two list lines — `<><circle cx="7" cy="6" r="3.75" stroke="currentColor" strokeWidth="1.5" /><path d="m9.75 8.75 2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M3 13.5h12M3 16h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>`
keywords: autocomplete, typeahead, combobox, search with suggestions, bank search

Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`; `const CARD = { 'Color Mode': 'Light', AppearanceBrand: 'Neutral' } as Modes`. `BANKS = ['HDFC Bank', 'Himachal Pradesh Gramin Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra Bank', 'Punjab National Bank', 'Bank of Baroda', 'Canara Bank', 'Union Bank of India', 'IndusInd Bank', 'Yes Bank']`; `PEOPLE = [{ value: 'u1', label: 'Aarav Sharma' }, { value: 'u2', label: 'Aditi Verma' }, { value: 'u3', label: 'Rohan Mehta' }, { value: 'u4', label: 'Ananya Iyer', disabled: true }]`.
Every SuggestiveSearch gets `modes={LIGHT}`, `items={BANKS}`, `label="Bank name"`, and `placeholder="Search bank name"` unless stated. Examples that show an open list pass `defaultInputValue=…` and `defaultOpen` and leave the query uncontrolled; the playground, Content, and In context keep `inputValue`/`onInputChange` and `value`/`onValueChange` in state.
Host = `<div className="coin-new-host wide"><VStack modes={LIGHT} style={{ width: '100%', padding: 0, minHeight: H }}>{children}</VStack></div>`; the list floats below the field, so give a Host with an open list room: H = 72 + 6 + 44 × rows + 12 (omit H when closed).
Selectors, with `testID` and `R = byTestId(id)`: label `${R} > div:first-child > [dir="auto"]:first-child`; required mark `${R} > div:first-child > [dir="auto"]:nth-child(2)`; field row `${R} > div:nth-child(2) > div:first-child`; input `${R} input`; list `${R} [role="listbox"]`; first match `${R} [role="option"] span`.

## Overview
summary: Use a Suggestive Search to let people type and pick one item from a known list, such as their bank, with matches shown as they type.
principle: Type a little, then pick the right one.
playground: `.preview-stage` › Host (H 320) › controlled SuggestiveSearch with `supportText={support ? 'Pick the bank your account is with.' : undefined}`, `emptyMessage={empty ? 'No matching banks' : undefined}`, `highlightMatch={highlight}`, and by State: Error `isInvalid errorMessage="Choose your bank from the list."`; Read only `isReadOnly` with the query set to “HDFC Bank”; Disabled `isDisabled`. Controls: Segment "State" `Default | Error | Read only | Disabled`; OnOff "Support text" (on); OnOff "No-match message" (on); OnOff "Highlight match" (on). Readout title "Selected bank", value "None" or the bank’s label; note: "Type to filter, then click or tap a bank. The arrow keys don’t move through the list." Stage label: "Live Coin Suggestive Search".

## Anatomy
header: Anatomy · title: A labelled field over a list of matches · description: A label names the field. As people type, matches from your list appear in a floating list under it, with the typed text in bold.
specimen: `<Anatomy specimenWidth={328} …>` › Host-style `<VStack modes={LIGHT} style={{ width: '100%', padding: 0, minHeight: 230 }}>` › `<SuggestiveSearch testID="ss-anatomy" … isRequired defaultInputValue="Bank of" defaultOpen />` (three matches).
parts:
1. Label — Names the value, such as “Bank name”. — target: label — side: top
2. Required mark — Shown only; screen readers don’t hear it. — target: required mark — side: right
3. Field — Where people type; its border shows the state. — target: input — side: left
4. Suggestions — Matches from your list, in your order. — target: list — side: right
5. Match — The typed text, in bold. — target: first match — side: left

## Configuration
header: Configuration · title: Help text, limits, and options · description: Add a hint or mark the field required, say what happens when nothing matches, and cap or simplify the list. Any option can be shown but not chosen.
Grid `coin-new-example-grid`, each an ExampleCard › Host:
- With support text — `supportText="Pick the bank your account is with."` — lesson: A short hint under the field.
- Required — `isRequired` — lesson: A red asterisk after the label. It isn’t announced.
- No-match message — `emptyMessage="No matching banks" defaultInputValue="Paytm" defaultOpen` (H for 1 row) — lesson: Says so when nothing matches; without it the list just disappears.
- Fewer suggestions — `maxResults={3} defaultInputValue="Bank" defaultOpen` (3 rows) — lesson: Caps the list; otherwise it scrolls after about five rows.
- Without highlight — `highlightMatch={false} defaultInputValue="Bank of" defaultOpen` (3 rows) — lesson: Matches show in plain text.
- An option that can’t be chosen — `label="Beneficiary" placeholder="Search beneficiary" items={PEOPLE} defaultInputValue="A" defaultOpen` (4 rows) — lesson: Ananya Iyer is listed but disabled, such as a payee still being verified.

## States
header: States · title: Rest, focus, error, read only, disabled · description: The field shows its state with its border and fill: grey at rest, purple while focused, red when invalid. Read only and disabled can’t be typed in or opened; disabled is also faded.
Grid `coin-new-example-grid`, each an ExampleCard › Host:
- Idle — defaults — lesson: Grey border; it turns purple when focused.
- Error — `defaultInputValue="Paytm Bank" isInvalid errorMessage="Choose your bank from the list."` — lesson: A red field and a message that says how to fix it.
- Read only — `defaultInputValue="HDFC Bank" isReadOnly` — lesson: Grey, shows the chosen bank, and can’t be changed.
- Disabled — `isDisabled` — lesson: Faded and unavailable.

## Sizing
header: Sizing · title: Full width, with a floating list · description: Suggestive Search fills its container. The label is 17 px tall with 8 px to a 47 px field. The list opens 6 px below the field with 44 px rows, floats over what follows, and scrolls after 240 px.
Measured diagram: `<Anatomy legend={false} specimenWidth={328} marks={[{ kind: 'size', target: field row, side: 'right', label: 'both' }, { kind: 'gap', from: `${R} > div:first-child`, to: `${R} > div:nth-child(2)` }]}>` › `<SuggestiveSearch testID="ss-size" … />` (closed). Expected 328 × 47 and 8.

## Content
header: Content · title: Name the value, hint the search · description: Label the field with what it holds, such as “Bank name”, and use the placeholder for a search hint. Keep options short and unique, write the no-match message as what happened, and make errors say how to fix the pick.
One ExampleCard "Label, hint, and options" › Host (H 320) › controlled SuggestiveSearch with `supportText="Pick the bank your account is with."` and `emptyMessage="No matching banks"`.

## In context
header: In context · title: Adding a bank account · description: People find their bank by typing part of its name. Continue checks that a bank was picked from the list and shows an error if not; the list floats over the button while it’s open.
Composition in `.coin-new-context`: `<Card modes={CARD}>` › `<Card.Title>Add a bank account</Card.Title>`, controlled SuggestiveSearch with `emptyMessage="No matching banks"`, `isInvalid={tried && !bank}`, `errorMessage="Choose your bank from the list."`, then `<Button label="Continue" onPress={…} modes={LIGHT} />`. Continue with a bank sets the status “Adding HDFC Bank” (the chosen label); without one it shows the error. Below the card, `<p className="coin-new-readout" role="status">`, starting “Choose a bank”.

## Do & Don'ts
header: Do & Don’ts · title: A named field that explains itself · description: Each pair shows a field people can understand and fix versus one that leaves them guessing.
Every preview is a Host.
- Do Label the field: “Bank name” stays visible while people type. — defaults | Don't Use the placeholder as the label: It disappears as soon as people type. — `label={undefined} placeholder="Bank name"`
- Do Say when nothing matches: “No matching banks” explains the empty list. — `emptyMessage="No matching banks" defaultInputValue="Paytm" defaultOpen` (H for 1 row) | Don't Let the list vanish: People can’t tell whether anything matched. — `defaultInputValue="Paytm" defaultOpen` (same H)
- Do Explain the error: The message says how to fix the pick. — `defaultInputValue="Paytm Bank" isInvalid errorMessage="Choose your bank from the list."` | Don't Rely on red alone: A red field doesn’t say what’s wrong. — `defaultInputValue="Paytm Bank" isInvalid`

## Sources
header: Sources · title: Use the public Suggestive Search contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (5 October build) from the team’s private package repository. Figma’s Suggestive search has Idle, Open, and Active variants. The package bolds the typed text where Figma greys it, uses a grey placeholder, and marks the chosen row with a grey fill and a 16 px check (Figma: white with a 20 px check). On the web the arrow keys and Escape do nothing and the list closes as soon as focus leaves the field, so keyboard users can’t pick a suggestion. Every suggestion is announced as “Dropdown item”, and required and error aren’t announced. The published Storybook still shows the old page.

## Limits
Do not show Dark mode, `renderItem`, a custom `filter`, controlled `open`, `menuMaxHeight`, `menuOffset`, or style props. Do not imply keyboard selection, arrow-key navigation, Escape, or announced required and error states.
