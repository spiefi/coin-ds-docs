# Debit Card brief

slug: debitcard · label: Debit Card · public API: DebitCard (+ Image in `bankLogoSlot`; Title and VStack for In context; the kit's FitWidth)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2766-25 · storybook: docsUrl('debitcard') · stories: Default=components-debitcard--default, Credit card=components-debitcard--credit-card, No card art=components-debitcard--no-card-art
checked: 21 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-c7d3348; Biscuit's newer e60f8bd8 changes only the Storybook page)
icon: a payment card with a stripe and a short number line — `<><rect x="1.5" y="4" width="15" height="10.5" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M1.5 7.5h15M4.5 11.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /></>`
keywords: card face, payment card, credit card, bank card, plastic, card art

Setup: `import jioLogo from '../assets/jio-gold-logo.png'` (the package ships no logos). `LIGHT = { 'Color Mode': 'Light' } as Modes`; `noop = () => {}`.
LOGO = `<Image imageSource={jioLogo} width={29} height={29} />`.
BASE = `{ bankName: 'JioFinance', cardType: 'Debit', cardNumber: '•••• 4821', cardholderName: 'Priya Sharma', expireDate: '09/29', bankLogoSlot: LOGO, modes: LIGHT }`.
“DC(overrides = {})” = `<DebitCard {...BASE} {...overrides} />` (overrides win; brand examples pass `modes: { ...LIGHT, 'DebitCard brand': 'SBI' }`).
The card is always 328 × 224. Every DC outside the two diagrams sits in the kit's `<FitWidth>` (playground, every ExampleCard, both sides of each Do & Don't, In context). The diagrams use no `specimenWidth`.
Selectors (no testID; static root): `R = ':scope > div'`; header `${R} > div:nth-child(1)`; bank `${R} > div:nth-child(1) > div:first-child`; type `${R} > div:nth-child(1) > div:last-child`; art `${R} > div:nth-child(2)`; footer `${R} > div:nth-child(3)`; number `${R} > div:nth-child(3) > [dir="auto"]:first-child`; name `${R} > div:nth-child(3) > div:last-child > [dir="auto"]:first-child`; expiry `${R} > div:nth-child(3) > div:last-child > [dir="auto"]:last-child`.

## Overview
summary: Use a Debit Card to show a card the user already holds: its bank, type, last four digits, cardholder, and expiry.
principle: The card in their wallet, never the full number.
playground: `.preview-stage` › `<FitWidth>` › DC({ cardType: type, cardNumber: type === 'Credit' ? '•••• 7350' : '•••• 4821', bankLogoSlot: logo ? LOGO : undefined, modes: { ...LIGHT, 'DebitCard brand': brand }, onPress: () => setPresses((n) => n + 1) }). Stage label "Live Coin Debit Card". Controls: Segment "cardType" `Debit | Credit` (Debit); Segment "DebitCard brand" `JFS | SBI` (JFS); OnOff "bankLogoSlot" (on). Readout title "Presses", value "0", "1", …; note: "With onPress the whole card is one button. Without it, the card is a picture."

## Anatomy
header: Anatomy · title: A card face in three bands · description: The bank and the card type sit at the top, the art strip runs across the middle, and the number, cardholder, and expiry fill the bottom.
specimen: `<Anatomy …>` › DC().
parts:
1. Bank — bankLogoSlot, then bankName. — target: bank — side: top
2. Card type — cardType, then providerLogoSlot (empty here). — target: type — side: top
3. Card art — The package’s art strip, 50 px tall; cardArtSource replaces it. — target: art — side: left
4. Card number — cardNumber, shown exactly as you pass it. — target: number — side: left
5. Cardholder — cardholderName; a long name wraps. — target: name — side: bottom
6. Expiry — expireDate, as MM/YY. — target: expiry — side: bottom
7. Card — 328 × 224 with 16 px corners; DebitCard brand sets its colour. — target: R — side: right, at 0.6

## Configuration
header: Configuration · title: Type, logo, art, and brand · description: cardType is free text: write Debit or Credit, and nothing else changes. bankLogoSlot puts your bank’s mark before its name, and providerLogoSlot puts a network mark after the type; the package ships neither. The art strip is the package’s own: cardArtSource replaces it with your picture, and there’s no supported way to remove it. The DebitCard brand mode colours the card: JFS gold by default, or SBI purple. No other mode changes it.
Body: `<div className="coin-new-stack">` with two `coin-new-example-grid` grids (two columns), each card in `<FitWidth>`.
Grid 1:
- Debit — DC() — lesson: The bank’s mark and name, then the card type.
- Credit — DC({ cardType: 'Credit', cardNumber: '•••• 7350' }) — lesson: Only the word changes.
- Without a bank logo — DC({ bankLogoSlot: undefined }) — lesson: The top band is 12 px shorter than Figma’s.
- DebitCard brand SBI — DC({ modes: { ...LIGHT, 'DebitCard brand': 'SBI' } }) — lesson: A purple card. The text stays black, so it’s hard to read.

## States
header: States · title: A picture, or a button · description: Without onPress the card is a picture: it doesn’t press, and screen readers read its text. onPress makes the whole card one button, named by its bank, type, and number unless you set accessibilityLabel. disabled stops a pressable card without changing its look. The card shows no pressed state, and it doesn’t flip, freeze, or show a CVV.
Grid `coin-new-example-grid` (two columns), each in `<FitWidth>`:
- Picture — DC() — lesson: No onPress: nothing to press.
- Button — DC({ onPress: noop, accessibilityLabel: 'Debit card, JioFinance, ending 4821' }) — lesson: Looks the same, but the whole card presses.

## Sizing
header: Sizing · title: Always 328 × 224 · description: The card is a fixed 328 × 224, as in Figma, and doesn’t grow or shrink with its host or its text. The top band has 16 px of padding above and 28 px below; the art strip is 50 px tall; the details sit 16 px apart with 20 px at the sides. Without a 29 px bank logo, the top band is 12 px shorter and everything below moves up.
Body: measured diagram only: `<Anatomy legend={false} marks={[{ kind: 'size', target: R, side: 'bottom', label: 'both' }, { kind: 'size', target: art, side: 'right', label: 'both' }, { kind: 'padding', target: header }]}>` › DC(). Expected 328 × 224, art 328 × 50, header padding 16 / 20 / 28; report the measured values.

## Content
header: Content · title: Masked, short, as printed · description: Write bankName as the issuer and cardType as Debit or Credit. Mask cardNumber to its last four digits, and write expireDate as MM/YY. Give cardholderName as it appears on the card. When the card presses, set accessibilityLabel to the type, bank, and last four, such as Debit card, JioFinance, ending 4821, never the full number.
Grid `coin-new-example-grid` (two columns), each in `<FitWidth>`:
- Masked number — DC() — lesson: Four dots, then the last four digits.
- Long name — DC({ cardholderName: 'Venkatasubramanian Ramakrishnan' }) — lesson: The name wraps to a second line beside the expiry.

## In context
header: In context · title: The cards on a profile screen · description: The screen lists the cards the user holds. Each card’s onPress opens its details on the screen; the card only shows the plastic.
Composition in `.coin-new-context` › `<FitWidth>` › `<VStack modes={{ ...LIGHT, 'Slot gap': 'M', Padding: 'None' } as Modes} style={{ width: 328 }}>` › `<Title title="Your cards" subtitle="2 cards" modes={LIGHT} />`, DC({ onPress: () => setOpened('Debit •••• 4821'), accessibilityLabel: 'Debit card, JioFinance, ending 4821' }), DC({ cardType: 'Credit', cardNumber: '•••• 7350', onPress: () => setOpened('Credit •••• 7350'), accessibilityLabel: 'Credit card, JioFinance, ending 7350' }). Below the FitWidth, `<p className="coin-new-readout" role="status">`: “No card opened” or “Opened <card>”.

## Do & Don'ts
header: Do & Don’ts · title: A masked number and short labels · description: Each pair shows a card face that keeps the number private and reads cleanly next to one that exposes it or cuts a label.
(Instruction, not copy: both sides of every pair sit in `<FitWidth>`.)
- Do Mask the number: Only the last four digits show. — DC() | Don't The full number: The card shows it exactly as passed. — DC({ cardNumber: '4111 1111 1111 4821' })
- Do Short bank and type: Both fit the top band. — DC() | Don't Long names: They don’t shorten, so the card’s edge cuts the type off. — DC({ bankName: 'JioFinance Payments Bank', cardType: 'Debit Platinum Select' })

## Sources
header: Sources · title: Use the public Debit Card contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (19 October build of Biscuit’s main) from the team’s private package repository. Figma’s Debit Card exposes <code>cardholderName</code>, <code>cardNumber</code>, and <code>expireDate</code>; its bank and network logos are nested instances, and its brand is a variable mode. The package ships no logos, so without a 29 px <code>bankLogoSlot</code> the top band is 12 px shorter than Figma’s. On the SBI brand the text stays black on purple, which is hard to read. <code>cardArtSource</code> can replace the art strip but not remove it, long bank or type text is cut off instead of shortened, and the card has no pressed state. Every published Storybook story renders the card as a button, and the published page is the older generated one (all reported).

## Limits
Don't show or mention Color Mode or dark mode. Don't imply the brand mode changes the art or text, that the art can be removed, that header text truncates, or that the card flips, freezes, or shows a CVV.
