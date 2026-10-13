# Benefit Card brief

slug: benefitcard · label: Benefit Card · public API: BenefitCard (+ VStack, Title for composition; FitWidth and ScreenFrame from the kit)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=5352-1077 · storybook: docsUrl('benefitcard') · stories: Default=components-benefitcard--default, Declarative arrays=components-benefitcard--declarative-arrays, Without upsell=components-benefitcard--without-upsell, Header hidden=components-benefitcard--header-hidden, Button hidden=components-benefitcard--button-hidden, Pressable card=components-benefitcard--pressable-card
checked: 13 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-c1fa197, Biscuit's main c1fa197; main's 7020bf9 hides the upsell's Close and rewrites the Storybook page, not installed)
icon: a card with a check-listed row — `<><rect x="2.5" y="2.5" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="m5.2 6.6 1 1 1.8-2M10 6.5h3M5.5 11h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /></>`
keywords: benefits card, plan benefits, rewards card, upgrade card, perks, membership

Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`; `noop = () => {}`.
EARN = `[{ icon: 'ic_jewellery_diamond', title: 'JioPoints', trailingText: 'Up to 2000 pts' }, { icon: 'ic_offer', title: 'Cashback', trailingText: 'Up to ₹5000' }]`.
PERKS = `[{ icon: 'ic_card', title: 'Zero forex markup on cards' }, { icon: 'ic_support', title: 'Priority support, 24/7' }]`.
“BC(overrides)” = `<BenefitCard modes={LIGHT} headerTitle="You will earn" headerItems={EARN} items={PERKS} buttonLabel="Upgrade" onButtonPress={noop} {...overrides} />` (the default upsell stays). Every BenefitCard outside the Anatomy and Sizing diagrams and In context sits in `<FitWidth>`: it's 344 px wide, so FitWidth scales it down on narrow screens instead of clipping. Storybook shows it on a grey page; the example stages already are.
Selectors (BenefitCard has no `testID`; R = `:scope > div`, the card root): header `${R} > div:first-child`; title `${R} > div:first-child > div:first-child > [dir="auto"]`; first earnings row `${R} > div:first-child > div:first-child > div:nth-child(2) > div:first-child`; divider `${R} > div:first-child > div:last-child`; upsell `${R} > div:nth-child(2)`; close `${R} [aria-label="Close"]`; benefit rows `${R} > div:nth-child(3)`; first benefit row `${R} > div:nth-child(3) > div:first-child`; button `${R} > [role="button"]`.

## Overview
summary: Use a Benefit Card to list what a plan or offer gives, with an optional upsell and one button to upgrade.
principle: Show what people get, then one way to get it.
playground: `.preview-stage` › FitWidth › BC with `modes={appearance === 'Default' ? LIGHT : { ...LIGHT, AppearanceBrand: appearance } as Modes}`, `showHeader={header}`, `bodyHeader={upsell ? undefined : null}`, `showButton={button}`, `onButtonPress={() => setAction('Upgrade pressed')}`; stage label "Live Coin Benefit Card". Controls: Segment "Appearance" `Default | Primary | Secondary | Tertiary` (Default); OnOff "Header" (on); OnOff "Upsell" (on); OnOff "Button" (on). Readout title "Last action", value "None" or "Upgrade pressed"; note: "Only the button acts. In this build the upsell's Close button does nothing (#271)."

## Anatomy
header: Anatomy · title: What you earn, what you get, one button · description: A white card with a header of earnings rows and a divider, an upsell line, a list of benefits, and an upgrade button, 8 px apart.
specimen: `<Anatomy …>` › BC() (no FitWidth).
parts:
1. Header title — headerTitle at 12 px, a label for the rows below it. — target: title — side: top
2. Earnings row — A headerItems row: an icon, a short title, and the figure on the right. — target: first earnings row — side: right
3. Divider — Separates what you earn from what the plan includes. — target: divider — side: left
4. Upsell — A Nudge by default, whose Close does nothing yet (#271); bodyHeader replaces or removes it. — target: upsell — side: right
5. Benefit row — An items row: an icon and a short perk. — target: first benefit row — side: left
6. Button — buttonLabel and onButtonPress; showButton hides it. — target: button — side: bottom
(If two pins collide, move one with `at`; keep these sides.)

## Configuration
header: Configuration · title: Sections and brand · description: Each section can go: showHeader drops the title, its rows, and the divider; bodyHeader set to null removes the upsell; showButton hides the button. AppearanceBrand recolours the icons, the upsell, and the button together; the card stays white.
Grid `coin-new-example-grid` (two columns), each an ExampleCard › FitWidth:
- Default — BC() — lesson: Purple icons, white upsell, gold button, as in Figma.
- Without the upsell — BC({ bodyHeader: null }) — lesson: bodyHeader set to null closes the gap between the lists.
- Without the header — BC({ showHeader: false }) — lesson: Just the upsell, the benefits, and the button.
- Tertiary — BC({ modes: { ...LIGHT, AppearanceBrand: 'Tertiary' } as Modes }) — lesson: One brand for the icons, the upsell, and the button.

## States
header: States · title: A summary with or without an action · description: The card has no state of its own: only its button acts, through onButtonPress, with Button's usual states. onPress makes the whole card one button that dims while pressed, but on the web its own buttons then sit inside it, so avoid onPress while the card has a button (#280).
Grid `coin-new-example-grid`, each an ExampleCard › FitWidth:
- With the button — BC() — lesson: One next step at the bottom.
- Without the button — BC({ showButton: false }) — lesson: showButton off: a summary of the plan.

## Sizing
header: Sizing · title: 344 px wide, as tall as its content · description: It's 344 px wide unless you set width to another number or a percentage, such as 100% to fill its container. It has 12 px padding, 12 px corners, and 8 px between sections, and it's as tall as what it shows. Figma's card is 344 × 221.
Measured diagram: `<Anatomy legend={false} marks={[{ kind: 'size', target: R, side: 'bottom', label: 'both' }, { kind: 'padding', target: R }, { kind: 'gap', from: header, to: upsell }, { kind: 'gap', from: upsell, to: benefit rows }]}>` › BC(). Expected 344 wide, about 229 tall, padding 12, gaps 8; report the measured values.

## Content
header: Content · title: A label, short perks, and figures · description: Write the header title as a label, such as “You will earn”. Keep each row to a short noun phrase and put its number in trailingText, where the figures line up on the right. Label the button with a verb, such as “Upgrade”.
One ExampleCard "Short rows with the figures on the right" › FitWidth › BC(). Description: "“JioPoints” with “Up to 2000 pts”, two perks, and “Upgrade”."

## In context
header: In context · title: Upgrading to JioFinance+ · description: The plan screen fills its width with the card (width 100%) and starts checkout when people press Upgrade, through onButtonPress. The card doesn't act on its own.
Composition in `.coin-new-context`: `<ScreenFrame size="full">` › `<VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes} style={{ flex: 1, padding: 16 }}>` with `<Title title="JioFinance+" subtitle="Earn more on every payment" modes={LIGHT} />` and BC({ width: '100%', onButtonPress: () => setStatus('Upgrade pressed: the screen opens checkout') }). Below the frame, `<p className="coin-new-readout" role="status">`: "Not upgraded yet" or the status.

## Do & Don'ts
header: Do & Don’ts · title: Rows people scan · description: Each pair shows a list people take in at a glance next to one they have to read line by line.
Every preview is in FitWidth.
- Do Keep each perk short: A few words per row, one benefit each. — BC() | Don't Write a sentence as a row: A long title is cut off, and the benefit with it. — BC({ items: [{ icon: 'ic_card', title: 'Pay abroad with any of your cards and get zero forex markup' }, PERKS[1]] })
- Do Put the figure in trailingText: The amounts line up on the right. — BC() | Don't Put the figure in the title: The amounts are buried in the text. — BC({ headerItems: [{ icon: 'ic_jewellery_diamond', title: 'Up to 2000 JioPoints' }, { icon: 'ic_offer', title: 'Up to ₹5000 cashback' }] })

## Sources
header: Sources · title: Use the public Benefit Card contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (12 October build) from the team’s private package repository. Figma’s BenefitCard is one 344 × 221 component with header and Button switches and two list slots; its upsell is the retired Nudge, with 12 px text and no close button. In this build the upsell has 14 px text and a Close button that does nothing (#271), so the card is a few pixels taller; Biscuit’s 13 October build hides Close but isn’t installed here. The header swaps Figma’s spacing: 4 px under the title and 8 px between rows, 8 and 4 in Figma. The card and its title stay white and black in every mode. Its default rows repeat one placeholder, so always pass your own. The published Storybook still shows the old page and the older nudge.

## Limits
Don't show Dark, Semantic Intent System, Emphasis, Context modes, List Item Style, the deprecated headerItem or bodyTitle, the header and button slots, or iconColor. Don't hide or work around the upsell's Close (#271), and don't use button={null} to hide the button.
