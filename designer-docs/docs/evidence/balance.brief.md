# Balance brief

slug: balance · label: Balance · public API: Balance (+ MoneyValue for the slot; Title, VStack, Button for In context)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1986-6203 · storybook: docsUrl('balance') · stories: Default=components-balance--default, Custom slot=components-balance--custom-slot
checked: 19 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-a116616; Balance.tsx unchanged on Biscuit's main c7d3348)
icon: a short title line above a rupee sign and two digit bars — `<><path d="M3 3.5h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /><path d="M3 8h5M3 10.5h5M4 8h1.25a2.25 2.25 0 0 1 0 4.5H4l3.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /><path d="M11 8.5v6M14.5 8.5v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /></>`
keywords: account balance, amount, total, money value, amount owed

Setup: `const ctx = (c: string) => ({ Context3: c }) as Modes`. Balance has no testID; with `R = ':scope > div'` (the root, as in card.guide.tsx): title `${R} > div:first-child`; money value `${R} > div:nth-child(2)`; currency `${R} > div:nth-child(2) [tabindex] > [dir="auto"]`; amount `${R} > div:nth-child(2) [tabindex] > div:last-child > [dir="auto"]`. These come from a server render; confirm them with the browser test.
“B(title, amount)” = `<Balance title={title} amount={amount} currency="INR" />` plus any props listed. Pass no `modes` unless the brief gives a Context3.

## Overview
summary: Use a Balance to show one money amount, such as what someone owes or holds, in large type under a short title.
principle: One amount, named, at a glance.
playground: `.preview-stage` › `<Balance title={title} amount={amount} currency={currency} modes={ctx(size)} />`, stage label "Live Coin Balance". Controls: text control "Title" → `title` (“Total owed to people”, maxLength 40); text control "Amount" → `amount` (“50,000.67”, maxLength 16); Segment "Currency" `INR | USD | EUR` → `currency` (INR); Segment "Context3" `Balance & Cards | Default` → the Context3 mode (Balance & Cards). Readout title "Amount size", value "36 px, weight 900" for Balance & Cards or "14 px, weight 500" for Default; note "Context3 sizes only the amount: the title stays 14 px."

## Anatomy
header: Anatomy · title: A title and a Money Value · description: A Balance stacks a short title over a Money Value: the currency symbol and your amount in heavy type, 6 px below.
specimen: `<Anatomy …>` › B('Total owed to people', '50,000.67'). No specimenWidth.
parts:
1. Title — Names the amount in 14 px medium text. — target: title — side: top
2. Currency — The symbol for your currency code, such as ₹ for INR. — target: currency — side: left
3. Amount — Your amount exactly as you write it, in 36 px heavy type. — target: amount — side: right
marks: gap title → money value (6 px).

## Configuration
header: Configuration · title: Your currency, a minus, or your own Money Value · description: Pass a currency code or symbol and the amount as text. To use a Money Value option, such as hiding the amount, pass your own Money Value inside the Balance.
Grid `three` of ExampleCards:
- Currency code — "USD shows as $; unknown codes print as typed." — B('Total owed to you', '1,250.00') with `currency="USD"`
- Negative amount — "A leading minus shows before the symbol." — B('Net balance', '-1,200.00')
- Hidden amount — "Your own Money Value, here with hidden on." — `<Balance title="Available balance"><MoneyValue value="50,000.67" currency="INR" hidden /></Balance>`

## States
header: States · title: No states of its own · description: A Balance isn’t pressable and has no selected, disabled, or loading look. When the amount changes, pass the new amount.
One ExampleCard "Nothing owed" — "Zero looks like any other amount." — B('Total owed to people', '0.00').

## Sizing
header: Sizing · title: The host sets the width, Context3 the amount · description: A Balance is as wide as its host and as tall as its text: 68 px at the default size. It has no padding or surface, so place it in a screen or card that has them. Context3 sets the amount’s size; the title stays 14 px.
Measured diagram: `<Anatomy legend={false} specimenWidth={300} marks={[{ kind: 'size', target: R, side: 'bottom', label: 'both' }, { kind: 'gap', from: title, to: money value }]}>` › B('Total owed to people', '50,000.67'). Measured 300 × 68.
Then a `coin-new-example-grid` (two columns) of ExampleCards, each B('Total owed to people', '50,000.67') with `modes={ctx(…)}`:
- Balance & Cards — "The default: a 36 px amount." — ctx('Balance & Cards')
- Default — "A 14 px amount, the title’s size." — ctx('Default')
- Transaction Bubble — "A 26 px amount with a 28 px symbol." — ctx('Transaction Bubble')
- Amount Input — "A 56 px amount with a 32 px symbol." — ctx('Amount Input')

## Content
header: Content · title: Say what it is, write it as people read it · description: Write the title as a short name for the amount, such as “Available balance” or “Total owed to people”. Pass the amount already formatted, with separators and decimals: the Balance shows it exactly as you write it.
One ExampleCard "A complete balance" › B('Available balance', '1,24,500.00').

## In context
header: In context · title: What you owe after a trip · description: The trip screen adds up what you owe and passes it as formatted text; the Balance only shows it. Settle up is the screen’s own Button.
Composition in `.coin-new-context` › `<VStack modes={{ Padding: 'None', 'Slot gap': 'XS' } as Modes}>` › `<Title title="Goa trip" subtitle="4 friends · 12 expenses" />` (Title has its own 12 px side padding) and an inner `<VStack modes={{ 'Stack Context': 'Nested', Padding: 'Default', 'Slot gap': 'M' } as Modes}>` (12 px padding, so the Balance lines up with the Title's text; Padding Default must be explicit because a child's modes override its parent's) › B('Total owed to people', '2,450.00') and `<Button label="Settle up" onPress={() => setLast('Opened Settle up for ₹2,450.00')} style={{ alignSelf: 'stretch' }} />` (full width). Below, `<p className="coin-new-readout" role="status">{last}</p>`, starting “Press Settle up”.

## Do & Don'ts
header: Do & Don’ts · title: A named, readable amount · description: Each pair shows a Balance people read at a glance next to one that misnames or garbles the amount.
- Do Name the amount: “Available balance” says what the number is. — B('Available balance', '24,500.00') | Don't Leave the default title: A savings balance still says “Total owed to people”. — `<Balance amount="24,500.00" currency="INR" />`
- Do Format the amount: Separators and decimals read at a glance. — B('Available balance', '1,24,500.50') | Don't Pass a raw number: The Balance doesn’t format, so 124500.5 shows as written. — B('Available balance', '124500.5')
- Do Keep the title short: Two or three words name the amount. — Column › B('Available balance', '2,450.00') | Don't Write a sentence: A long title wraps and buries the amount. — Column › B('Total amount you still owe to the friends on this trip after the last settlement', '2,450.00')
  “Column” = `<div className="coin-new-host wide"><VStack modes={{ Padding: 'None' } as Modes} style={{ width: '100%' }}>…</VStack></div>` (as disclaimer.guide.tsx): in the centred example row a Balance is as wide as its text, so a long title runs past the card instead of wrapping.

## Sources
header: Sources · title: Use the public Balance contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (16 October build) from the team’s private package repository. Figma’s Balance is one component with a Title property and a nested Money Value; the package adds amount and currency props and a slot for your own Money Value. Figma draws the amount on a 36 px line, the package on a 44 px one, so a Balance is 68 px tall instead of 60. The package’s default amount is “500”; Figma and Storybook show “50,000.67”. A Money Value in the slot always gets Context3 Balance & Cards. Page type JioPlus turns the amount white but not the title, so the guide doesn’t show it. The published Storybook docs page for Balance doesn’t load; its stories do.

## Limits
Do not show Color Mode, Page type JioPlus, `style` overrides, or non-Coin children in the slot. Do not imply that the Balance formats the amount, that it is pressable or has states, that a slotted Money Value can take another Context3, or that the title changes with any mode.
