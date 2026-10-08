# Value Back Metric brief

slug: valuebackmetric · label: Value Back Metric · public API: ValueBackMetric (+ Card, VStack, HStack, Text for composition)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=7581-1460 · storybook: docsUrl('valuebackmetric') · stories: Default=components-valuebackmetric--default, No link=components-valuebackmetric--no-link, No caption=components-valuebackmetric--no-caption, Brand appearance=components-valuebackmetric--brand-appearance, Card row=components-valuebackmetric--card-row, Pressable card=components-valuebackmetric--pressable-card
checked: 8 October 2026 · jfs-components 0.1.78 (5 October build, mirror tag v0.1.78-636f3f5)
icon: a coin with a return arrow — `<circle cx="9" cy="9" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M6.5 9h5M8.8 6.7 6.5 9l2.3 2.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />`
keywords: JioPoints, cashback, rewards, points, value back

Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`; every Coin instance gets `modes={LIGHT}` (plus `AppearanceBrand` where stated). ValueBackMetric has no `testID`; inside an Anatomy the component root is `:scope > div`. "JioPoints card" = `title="JioPoints" value="1,240" caption="Earn 10 points with UPI" linkLabel="Earn"`; "Cashback card" = `title="Cashback" value="₹120" caption="Credited monthly" linkLabel="View"`. Give every `linkLabel` an `onLinkPress` (a no-op unless stated). Put each example in `.coin-new-row` so the card keeps its own width.

## Overview
summary: Use a Value Back Metric to show a rewards balance, such as JioPoints or cashback, with how to earn more and one next step.
principle: Name the programme, show the amount, offer one verb.
playground: `.preview-stage` holding a ValueBackMetric. Controls: Segment "Programme" JioPoints | Cashback → the JioPoints or Cashback card; OnOff "Caption" (default on) → `caption`; OnOff "Call to action" (default on) → `linkLabel`; Segment "Icon colour" Primary | Secondary | Neutral | Tertiary → `modes.AppearanceBrand` (default Primary). Pressing the call to action sets the readout. Readout title "Last action", value "None yet", then "Earn pressed" or "View pressed". Stage label: "Live Coin Value Back Metric".

## Anatomy
header: Anatomy · title: Programme, amount, and a next step · description: A left-aligned stack with the programme’s icon and name, the amount, a short caption, and a purple call to action. It has no surface or padding of its own.
specimen: the JioPoints card.
parts:
1. Header — Programme icon and name; always shown. — target: `:scope > div > div:first-child` — side: left
2. Value — The amount, in the largest type. — target: `:scope > div > div:nth-child(2) > div:first-child` — side: right
3. Caption — One short line on how to earn or when it’s credited. — target: `:scope > div > div:nth-child(2) > div:last-child` — side: right
4. Call to action — One purple verb, such as Earn. — target: `[role="link"]` — side: bottom

## Configuration
header: Configuration · title: Show only what helps · description: The header always shows. Add the value, caption, and call to action as the card needs them; each disappears when left out. The icon colour changes only the icon.
Grid `coin-new-example-grid` (2 × 2):
- Full — JioPoints card — lesson: Balance, how to earn, and the next step.
- Without call to action — JioPoints card without `linkLabel` — lesson: Informational; the next step lives elsewhere on the screen.
- Without caption — JioPoints card without `caption` — lesson: When the amount speaks for itself.
- Icon colour — JioPoints card with `AppearanceBrand: 'Secondary'` — lesson: Retints only the icon; the amount and Earn keep their colours.

## States
header: States · title: Static or pressable · description: By default only the call to action responds. Add a press action to the card when it should open the programme; Earn keeps its own action.
Grid `coin-new-example-grid`:
- Static — JioPoints card — lesson: Only Earn responds to a press.
- Pressable — JioPoints card with `onPress` — lesson: The whole card opens the programme; Earn still runs its own action.

## Sizing
header: Sizing · title: No wider than its column, at least 82 px tall · description: The card has no padding and is at least 82 px tall. It never grows wider than its column: in a narrow column the text wraps instead of overflowing, but short lines still read best.
Measured diagram: `<Anatomy legend={false} marks={[{ kind: 'size', target: ':scope > div', side: 'right', label: 'both' }]}>` with the JioPoints card. Expected label about 136 × 84.

## Content
header: Content · title: Programme, amount, one verb · description: Use the programme name as the title, put the countable amount in the value, keep the caption to one short sentence, and make the call to action one verb in sentence case, such as Earn, View, or Claim.
Grid `coin-new-example-grid`: ExampleCard "JioPoints" with the JioPoints card; ExampleCard "Cashback" with the Cashback card.

## In context
header: In context · title: Rewards on the home screen · description: Place one programme per card, side by side, with a distinct verb on each. The screen opens the programme when a call to action is pressed.
Composition in `.coin-new-context`: `<Card modes={LIGHT}>` › `<VStack modes={LIGHT}>` › `<Text modes={LIGHT}>Your rewards</Text>` and `<HStack modes={LIGHT} justifyHorizontal="space-around" wrap>` holding the JioPoints card and the Cashback card (the cards have no padding, so they need the space between them). Below the card, `<p className="coin-new-readout" role="status">`: "Nothing opened yet" at first; Earn → "Earn JioPoints opened"; View → "Cashback history opened".

## Do & Don'ts
header: Do & Don’ts · title: Keep it a clear rewards card · description: Each pair shows a card people understand versus one that confuses them.
Each preview holds the card in `.coin-new-row`.
- Do Name the programme and show an amount: People can tell what the number is for. — JioPoints card | Don't Keep the placeholder: “Value” is the Figma placeholder, not product copy. — `title="JioPoints" value="Value" caption="Earn 10 points with UPI" linkLabel="Earn"`
- Do Use one verb: Earn says what happens next. — JioPoints card | Don't Write a vague call to action: “Click here” says nothing about what happens. — JioPoints card with `linkLabel="Click here"`
- Do Use it for rewards: JioPoints and cashback are earn-and-redeem programmes. — Cashback card | Don't Use it for an account balance: A savings balance is not a rewards programme. — `title="JioPoints" value="₹54,200" caption="Savings balance" linkLabel="Earn"`

## Sources
header: Sources · title: Use the public Value Back Metric contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (5 October build) from the team’s private package repository. Figma’s valueBack metric (122 × 83) stacks the JioPoints header, a value, a caption, and an Earn call to action. The package uses <code>ic_rupee_coin</code> as the default icon because the JioPoints mark is not in the icon set. The call to action is purple text, not a Link, so it has no underline. On the web, Enter and Space activate the call to action, and in a pressable card the call to action sits beside the card’s button, not inside it, so each press runs only its own action. Long lines wrap within the column.

## Limits
Do not show Dark mode, `link` slot content, an image header, `titleStyle`/`valueStyle`/`captionStyle`, `disabled`, or header-only cards. Do not imply an underlined link, or that a card without `onPress` is announced as one item (still open after #184).
