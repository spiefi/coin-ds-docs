# Card Bank Account brief

slug: cardbankaccount · label: Card Bank Account · public API: CardBankAccount (+ Badge for the status badge; Title and VStack for In context)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3762-2459 · storybook: docsUrl('cardbankaccount') · stories: Default=components-cardbankaccount--default, Savings=components-cardbankaccount--savings, Without badge=components-cardbankaccount--without-badge, Custom badge=components-cardbankaccount--with-custom-badge, Without footer=components-cardbankaccount--without-footer
checked: 19 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-a116616; CardBankAccount.tsx unchanged on Biscuit's main c7d3348)
icon: a bank building — `<><path d="M3 7.5 9 4l6 3.5M4 15h10M5.5 8.5v4.5M9 8.5v4.5M12.5 8.5v4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /></>`
keywords: bank account card, linked account, account summary, account details

Setup: `import jioLogo from '../assets/jio-gold-logo.png'`. `LIGHT = { 'Color Mode': 'Light' } as Modes`; `noop = () => {}`; `FRAME = { width: '100%', maxWidth: 292 } as const` (Figma's width).
ROWS = [{ label: 'Account type', value: 'Savings' }, { label: 'Account number', value: '•••• 4521' }, { label: 'Last updated', value: 'Today, 9:14 AM' }].
ACTIVE = `<Badge label="Active" modes={{ 'Semantic Intent': 'System', AppearanceSystem: 'positive' } as Modes} />` (the card merges its own modes under these; don't add others).
“BA({ badge, footer, modes = LIGHT, items = ROWS, logo = true, onButtonPress = noop })” =
`<CardBankAccount institutionName="Jio Payments Bank" institutionAvatar={jioLogo} badge={badge} items={items} buttonLabel="View statement" onButtonPress={onButtonPress} footer={footer} modes={modes} style={FRAME} accessibilityLabel="Jio Payments Bank savings account ending 4521" />`
When `logo` is false, leave `institutionAvatar` out entirely (don't pass `undefined` explicitly through a spread that sets the key; omitting the prop is what shows the package's fallback). Pass `badge`/`footer` through exactly as given.
Selectors (no testID; `R = ':scope > div'`, the card root): institution `${R} > div:first-child > div:first-child`; badge `${R} > div:first-child > div:nth-child(2)`; rows `${R} > div:nth-child(2)`; first label `${R} > div:nth-child(2) > div:first-child > div:first-child`; first value `${R} > div:nth-child(2) > div:first-child > [dir="auto"]:last-child`; button `${R} > button`; header `${R} > div:first-child`.

## Overview
summary: Use a Card Bank Account to summarise one linked bank account: the bank, a few facts such as the masked number, and one action.
principle: One account, a few facts, one action.
playground: `.preview-stage` › BA({ badge: badge ? 'Active' : undefined, footer: footer ? undefined : false, modes: { ...LIGHT, AppearanceBrand: brand, Emphasis: emphasis }, onButtonPress: () => setLast('View statement pressed') }); stage label "Live Coin Card Bank Account". Controls: OnOff "badge" (on); OnOff "footer" (on); Segment "AppearanceBrand" `Secondary | Primary | Neutral | Tertiary` (Secondary); Segment "Emphasis" `High | Medium | Low` (Medium). Readout title "Last action", value "None" or "View statement pressed"; note: "Only the footer button acts; the card itself isn’t pressable."

## Anatomy
header: Anatomy · title: The bank, its facts, and one action · description: A white panel stacks a header with the bank’s logo, its name, and an optional badge; a list of label and value rows; and one footer button. You set them through props: institutionName, institutionAvatar, badge, items, and buttonLabel.
specimen: `<Anatomy specimenWidth={292} …>` › BA({ badge: ACTIVE }).
parts:
1. Institution — institutionName and institutionAvatar: the bank’s logo and name. — target: institution — side: left
2. Badge — badge: one word about the account, such as its status. — target: badge — side: top
3. Label — A field name in 14 px bold; it wraps when space runs out. — target: first label — side: left
4. Value — The fact in 14 px, on one line. — target: first value — side: right
5. Button — A small Button from buttonLabel and onButtonPress, full width. — target: button — side: bottom
6. Panel — A white panel with 16 px corners and 16 by 12 px padding. — target: R — side: bottom, at 0.15

## Configuration
header: Configuration · title: A badge, and the button’s colours · description: badge takes a word, which becomes a Badge in the button’s colours, or a Badge you set up yourself, such as a green status; leave it out for none. AppearanceBrand and Emphasis colour the footer button and a word badge; the defaults, Secondary at Medium emphasis, are light purple. The panel and the rows don’t change. headerSlot replaces the whole header, children replace the rows, and footer replaces the button.
Body: `<div className="coin-new-stack">` holding three grids, in this order:
Grid `coin-new-example-grid` (two columns; three columns cut the bank’s name short):
- Word badge — BA({ badge: 'Active' }) — lesson: A word becomes a Badge in the button’s colours.
- Status badge — BA({ badge: ACTIVE }) — lesson: A Badge with Semantic Intent System and AppearanceSystem positive turns green.
- No badge — BA({}) — lesson: Leave badge out; the bank’s name has the row.
Grid `coin-new-example-grid` (two columns), each BA({ badge: 'Active', modes }):
- Secondary (default) — modes LIGHT — lesson: A light purple button and badge.
- Primary — modes { ...LIGHT, AppearanceBrand: 'Primary' } — lesson: Light gold.
- Neutral — modes { ...LIGHT, AppearanceBrand: 'Neutral' } — lesson: A dark grey button and a light grey badge.
- Tertiary — modes { ...LIGHT, AppearanceBrand: 'Tertiary' } — lesson: A blue button and a light blue badge.
Grid `coin-new-example-grid` (two columns; three columns cut the bank’s name short), each BA({ badge: 'Active', modes }):
- Emphasis High — modes { ...LIGHT, Emphasis: 'High' } — lesson: Solid purple, the strongest call.
- Emphasis Medium (default) — modes LIGHT — lesson: Light purple.
- Emphasis Low — modes { ...LIGHT, Emphasis: 'Low' } — lesson: A text button and a pale badge.

## States
header: States · title: Only the button responds · description: The card itself isn’t pressable: the footer button is its one action, with the Button’s own hover and pressed colours. footer={false} removes it for a summary to read. The card can’t disable its button.
Grid `coin-new-example-grid` (two columns):
- With an action — BA({ badge: ACTIVE }) — lesson: View statement is the card’s one action.
- Read only — BA({ badge: ACTIVE, footer: false }) — lesson: No button: a summary to read.

## Sizing
header: Sizing · title: Your screen sets the width · description: The card fills its host’s width; Figma draws it at 292 px. Height follows the rows: each is 17 px, 12 px apart. The panel is padded 16 px top and bottom and 12 px at the sides, with 16 px between the header, the rows, and the button. Button / Size S, the default, is 32 px tall; M is 42 and XS 24. Avatar Size L makes the logo 42 px. List Item Style Minimal tightens the rows to 4 px apart with 12 px regular labels.
Body: `<div className="coin-new-stack">` with the measured diagram, then a grid.
Measured diagram: `<Anatomy legend={false} specimenWidth={292} marks={[{ kind: 'size', target: R, side: 'bottom', label: 'both' }, { kind: 'padding', target: R }, { kind: 'gap', from: header, to: rows }]}>` › BA({ badge: ACTIVE }). Expected 292 × 207, padding 16/12, gap 16; report the measured values.
Grid `coin-new-example-grid` (two columns; three columns cut the bank’s name short), each BA({ badge: ACTIVE, modes }):
- Button / Size M — modes { ...LIGHT, 'Button / Size': 'M' } — lesson: A 42 px button.
- Button / Size XS — modes { ...LIGHT, 'Button / Size': 'XS' } — lesson: A 24 px button.
- List Item Style Minimal — modes { ...LIGHT, 'List Item Style': 'Minimal' } — lesson: Rows 4 px apart, labels 12 px regular.

## Content
header: Content · title: Field names and short facts · description: Label each row with a field name, such as Account type, and give the fact as its value. Show only the last four digits of the account number. Keep values short: a value never shrinks, so a long one squeezes its label. Label the button with a verb, such as View statement, and pass the bank’s own logo.
One ExampleCard "Four facts" › BA({ badge: ACTIVE, items: [...Account type Savings, Account number •••• 4521, { label: 'IFSC', value: 'JIOP0000001' }, Last updated Today, 9:14 AM] }) (four rows in that order). Description: "Field names on the left, short facts on the right, the number masked."

## In context
header: In context · title: Linked accounts in Settings · description: The Bank accounts screen shows the linked account. View statement opens the screen’s own statement view through onButtonPress; the card doesn’t fetch the account or change it.
Composition in `.coin-new-context` › `<VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes}>` › `<Title title="Bank accounts" subtitle="Used for UPI payments and transfers" modes={LIGHT} />` and BA({ badge: ACTIVE, onButtonPress: () => setOpened(true) }). Below, `<p className="coin-new-readout" role="status">`: "Statement not opened" or "Opened the statement for •••• 4521".

## Do & Don'ts
header: Do & Don’ts · title: Safe, recognisable, readable · description: Each pair shows a card people trust at a glance next to one that exposes the number, shows a stranger, or squeezes its labels.
- Do Mask the account number: Only the last four digits show. — BA({}) | Don't The full account number: Anyone near the screen can read it. — BA({ items: [ROWS[0], { label: 'Account number', value: '123456784521' }, ROWS[2]] })
- Do Pass the bank’s logo: institutionAvatar shows the bank’s own mark. — BA({}) | Don't Leave out the logo: The card falls back to a stranger’s photo. — BA({ logo: false })
- Do Short values: Each label and value fits on one line. — BA({}) | Don't A sentence as a value: The value never shrinks, so its label is squeezed into a narrow column. — BA({ items: [{ label: 'Account type', value: 'Savings account with auto-sweep' }, ROWS[1], ROWS[2]] })

## Sources
header: Sources · title: Use the public Card Bank Account contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (16 October build) from the team’s private package repository. Figma’s Card / BankAccount is one 292 px component with no properties; in code it fills its host and you set it through props. Figma’s badge is amber, while the package’s takes the button’s colours (Secondary at Medium emphasis by default), and its row values are 14 px where Figma’s are 12 px. Without <code>institutionAvatar</code> the card shows a stock photo of a person, without other props it shows placeholder copy, and a long value squeezes its label (all reported). The published Storybook still shows the older generated page, and its Default story is gold (AppearanceBrand Primary) while the others are purple.

## Limits
Don't show Dark, Context, Text Sizes, Weight, Badge Size, Avatar Size, or Button / State examples, headerSlot, children or footer nodes, disableTruncation, or style beyond width. Don't imply the card is pressable, that it fetches or edits the account, or that the footer button can be disabled.
