# Radio brief

slug: radio · label: Radio · public API: Radio (+ ListItem, Card, VStack, HStack, Text, Button, CheckboxItem for composition)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=922-3645 · storybook: docsUrl('radio') · stories: Default=components-radio--default, All states=components-radio--all-states
checked: 29 September 2026 · jfs-components 0.1.77 (newest package tag v0.1.77)
icon: `<><circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" /><circle cx="9" cy="9" r="2.5" fill="currentColor" /></>`

Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`; every Coin instance gets `modes={LIGHT}`. Radio has no group: keep one selected value in state and pass `selected={value === option}`. Radio has `testID`; target with `byTestId`.
LabelRow(option): `<HStack modes={LIGHT} alignVertical="center"><Radio selected=… onPress={() => set(option)} /><Text>{option}</Text></HStack>`.
AccountRows: a `Card` › `VStack` of `ListItem` (`layout="Horizontal"`, `navArrow={false}`) for "Savings •• 0245" (supportText "₹1,24,500"), "Salary •• 1180" ("₹48,200"), "Joint •• 7731" ("₹9,870"); each `trailing={<Radio … />}`; the row's `onPress` and the Radio's `onPress` both select that account.

## Overview
summary: Use a Radio to pick exactly one option from a short list, such as the account to pay from or how often to invest.
principle: One choice from a visible set. Put a label beside every Radio, and let the whole row select it.
playground: `.preview-stage` with a `VStack` of three LabelRows: Monthly, Quarterly, Yearly (Monthly selected at first). Controls: OnOff "Disable Yearly" → `disabled` on Yearly's Radio (and on Yearly's `onPress`; if Yearly was selected, it stays selected). Readout title "Frequency", value = the selected option. Stage label: "Live Coin Radio".

## Anatomy
header: Anatomy · title: A ring that fills when chosen · description: Radio is an 18 px circle. Unselected it is a white ring; selected it fills purple and shows a white dot.
specimen: `<SpecimenRow>` with `<Specimen caption="Unselected"><Radio testID="radio-off" /></Specimen>` and `<Specimen caption="Selected"><Radio testID="radio-on" selected /></Specimen>`
parts:
1. Ring — A 1 px deep-purple border outlines the circle. — target: `byTestId('radio-off')` — side: left
2. Fill — The selected Radio fills purple. — target: `byTestId('radio-on')` — side: top
3. Dot — A 10 px white dot confirms the choice. — target: `${byTestId('radio-on')} > div` — side: right

## Configuration
header: Configuration · title: Place it beside its label · description: Radio has no label of its own. Use list rows when options need detail, and a plain label for short options.
Grid `coin-new-example-grid`:
- In list rows — AccountRows (Savings selected) inside `<VStack modes={LIGHT} style={{ width: '100%' }}>` — lesson: For options with detail, such as accounts. The whole row selects its Radio.
- Beside a short label — a VStack of LabelRows Monthly (selected), Quarterly, Yearly — lesson: For short options. Only the 18 px circle responds to a press.

## States
header: States · title: Selected, unselected, and disabled · description: The screen sets which Radio is selected and which are disabled. Hover adds a lilac glow and keyboard focus a yellow ring while people interact.
Grid `coin-new-example-grid`, each a LabelRow-style HStack with its label:
- Unselected — `<Radio />` + "Quarterly" — lesson: An empty ring: not chosen.
- Selected — `<Radio selected />` + "Monthly" — lesson: Purple fill with a white dot.
- Disabled — `<Radio disabled />` + "Yearly" — lesson: Grey and not pressable, for an option that is unavailable now.
- Disabled and selected — `<Radio disabled selected />` + "Monthly" — lesson: Pale purple: chosen, but locked.

## Sizing
header: Sizing · title: An 18 px circle inside a larger row · description: The Radio is always 18 × 18 px. On its own only the circle is pressable, so put it in a list row whose whole height and width select it.
Measured diagram: `<Anatomy legend={false} marks={[{ kind: 'size', target: byTestId('radio-alone'), side: 'top', label: 'both' }, { kind: 'size', target: `${byTestId('radio-row')} [role="button"]`, side: 'top', label: 'both' }]}>` around `<SpecimenRow>`: `<Specimen caption="Radio"><Radio testID="radio-alone" selected /></Specimen>` and `<Specimen caption="List row"><VStack testID="radio-row" style={{ width: 280 }}>` one AccountRows ListItem (Savings, selected) `</VStack></Specimen>`.

## Content
header: Content · title: Short, parallel options · description: Write options in sentence case with the same grammar, so they read as one set. Lead with the word that tells them apart, and keep two to five options visible.
Grid `coin-new-example-grid`:
- ExampleCard "Frequencies": LabelRows Monthly (selected), Quarterly, Yearly.
- ExampleCard "Accounts": AccountRows (Salary selected) inside `<VStack modes={LIGHT} style={{ width: '100%' }}>`.

## In context
header: In context · title: Choosing the account to pay from · description: The screen keeps the chosen account, passes selected to each Radio, and enables Continue once one is chosen. Pressing a row or its Radio selects it.
Composition in `.coin-new-context`: AccountRows with nothing selected at first, then `<Button label="Continue" disabled={!account} />` inside the same `VStack` after the rows. Below the card, `<p className="coin-new-readout" role="status">`: "Choose an account" at first, then "Paying from <account>"; pressing Continue → "Continuing with <account>".

## Do & Don'ts
header: Do & Don’ts · title: One choice, clearly labelled · description: Each pair shows a set people can answer quickly versus one that confuses them.
- Do Keep exactly one selected: One filled Radio shows the single answer. — LabelRows Monthly (selected), Quarterly, Yearly | Don't Select two at once: Radio has no group, so the screen must stop a second selection. — same with Monthly and Yearly selected
- Do Label every Radio: Each option says what it is. — LabelRows Monthly, Quarterly (selected), Yearly | Don't Leave Radios bare: Without labels people can’t tell the options apart. — `<HStack>` of three Radios, the second selected, no text
- Do Use a Checkbox for yes or no: A Checkbox can be ticked and cleared. — `<CheckboxItem modes={LIGHT} checked onValueChange={noop}><Text>Save this account</Text></CheckboxItem>` | Don't Use a lone Radio: Once chosen, a single Radio can’t be cleared. — LabelRow "Save this account" (selected)

## Sources
header: Sources · title: Use the public Radio contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.77</code> from the team’s private package repository. Figma has eight variants (Idle, Hover, Active, Focus, and Disabled, unselected and selected); the package sets <code>selected</code> and <code>disabled</code>, and draws hover and focus itself. <code>RadioButton</code> is a deprecated name for the same component. Radio has no label or group: the screen keeps one selected value. On the web a Radio is not announced as a radio button or as selected, Space does not select it, and the unselected focus border differs from Figma.

## Limits
Do not show hover, pressed, or focus as settable states, `RadioButton`, `style`, or Dark mode. Do not imply a label prop, a group component, announced selection, or Space activation (ticket #175).
