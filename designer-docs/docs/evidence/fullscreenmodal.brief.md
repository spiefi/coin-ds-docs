# Fullscreen Modal brief

slug: fullscreenmodal · label: Fullscreen Modal · public API: FullscreenModal (+ Section, ListGroup, ListItem, IconCapsule, PlanComparisonCard, Image for its content; ScreenFrame from the kit; VStack, Text, Button for composition)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4534-7558 · storybook: docsUrl('fullscreenmodal') · stories: Default=components-fullscreenmodal--default, Minimal no body=components-fullscreenmodal--minimal-no-body, Lottie hero=components-fullscreenmodal--lottie-hero
checked: 10 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-636f3f5, Biscuit's main 636f3f5)
icon: a phone outline with a star in its upper half and a bar at the bottom — `<><rect x="4" y="1.5" width="10" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M7 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M9 4.2l.9 1.8 2 .3-1.45 1.4.35 2L9 8.75l-1.8.95.35-2L6.1 6.3l2-.3L9 4.2Z" fill="currentColor" /></>`
keywords: full-screen offer, takeover, upsell screen, onboarding screen, success screen

Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`; `noop = () => {}`; `import bankHero from '../assets/bank-hero.png'` (a light photo, 328 × 223). FullscreenModal forces its own dark styling (`context5`) onto its children; do not pass it `modes`.
Copy: `OFFER = { eyebrow: 'JioFinance+', headline: 'Get more from your money', supportingText: 'Extra cashback, JioPoints, and JioGold every time you pay.', priceText: '₹999 a year · free until 2027', primaryActionLabel: 'Upgrade for free', disclaimer: 'We’ll check your eligibility with Experian.' }`; `GOLD = { eyebrow: 'JioGold', headline: 'Save in gold every month', supportingText: 'Start a monthly SIP from ₹100. Buy and sell any time.', priceText: 'No making charges', primaryActionLabel: 'Start a SIP', disclaimer: 'Gold prices change with the market.' }`.
Body elements, kept as constant JSX elements so they are direct children (a wrapper component would block the modal's styling):
- `BENEFITS = <Section title="Key benefits" showSupportText={false} slotDirection="column" slot={<ListGroup>…</ListGroup>} />` with three `<ListItem layout="Horizontal" navArrow={false} leading={<IconCapsule iconName=… />} title=… supportText=… />`: `ic_offer` “Up to ₹5,000 cashback” / “On bills and recharges”; `ic_star` “1.25× JioPoints” / “On every UPI payment”; `ic_gift` “1% extra JioGold” / “On gold you buy above ₹1,000”.
- `PLANS = <Section title="Compare plans" showSupportText={false} slotDirection="column" slot={<PlanComparisonCard />} />` (its default columns and four rows match Figma).
“Frame” = the kit’s `<ScreenFrame size="full" surface="dark">{modal}</ScreenFrame>`: a 560 px phone screen whose dark surface stands in for the hero media (this site has no product imagery).
Selectors, with `testID` on the modal and `R = byTestId(id)`, no hero media: hero space `HERO = ${R} > div:first-child > div > div > div:first-child`; text block `T = ${HERO} > div`; eyebrow `${T} > div:first-child > div:first-child`; headline `${T} > div:first-child > div:nth-child(2)`; supporting text `${T} > div:nth-child(2)`; price `${T} > div:nth-child(3)`; body `BODY = ${R} > div:first-child > div > div > div:nth-child(2)`; footer `${R} > [role="toolbar"]`; close `${R} > [aria-label="Close"]`. If a selector misses, read the structure in the evidence file.

## Overview
summary: Use a Fullscreen Modal for a focused, full-screen moment, such as an upgrade offer, with a hero, details, and one main action.
principle: One big moment, one main action, and always a way out.
playground: `.preview-stage` › Frame › `<FullscreenModal {...OFFER} showClose={close} onClose={() => setAction('Close pressed')} onPrimaryAction={() => setAction('Upgrade for free pressed')}>` with BENEFITS and PLANS when Body is on; Footer button off sets `primaryActionLabel=""` (no footer), Disclaimer off sets `disclaimer=""`. Controls: OnOff "Body" (on); OnOff "Footer button" (on); OnOff "Disclaimer" (on); OnOff "Close button" (on). (A three-way Footer segment was too long for the controls panel; review, 10 October.) Readout title "Last action", value "None", "Close pressed", or "Upgrade for free pressed"; note: "The modal never closes itself: the screen removes it when either button is pressed." Stage label: "Live Coin Fullscreen Modal".

## Anatomy
header: Anatomy · title: Hero text, a body, a footer, and a close button · description: Centred hero text sits at the bottom of a space reserved for hero media. Your Sections follow and scroll; the footer holds the main button, and a close button floats top right.
specimen: `<Anatomy surface="dark" specimenWidth={360} …>` › `<FullscreenModal testID="fm-anatomy" {...OFFER} heroHeight={260} onClose={noop} onPrimaryAction={noop}>{BENEFITS}</FullscreenModal>` (in the Anatomy stage it is as tall as its content).
parts:
1. Eyebrow — A short line above the headline, such as the product name. — target: eyebrow — side: left
2. Headline — 29 px heavy; the promise in a few words. — target: headline — side: left
3. Supporting text — One sentence of detail. — target: supporting text — side: right
4. Price line — Optional; the price or the offer. — target: price — side: right
5. Body — Your Sections, styled for the dark modal. — target: BODY — side: left
6. Footer — The main button, with an optional disclaimer. — target: footer — side: bottom
7. Close button — Top right; the screen closes the modal. — target: close — side: top

## Configuration
header: Configuration · title: Hero, body, and footer · description: Set the hero copy, add Sections for the details, and choose the footer’s button and disclaimer. Hero media fills the width behind the hero text, and heroHeight sets how much space the text sits at the bottom of.
Grid `coin-new-example-grid`, each an ExampleCard › Frame:
- Hero, body, and footer — `{...OFFER}` with BENEFITS and PLANS — lesson: The full layout: Sections scroll under the hero, and the footer stays at the bottom.
- Without a body — `eyebrow="JioFinance+" headline="You’re all set" supportingText="Your benefits are active on every linked account." priceText="" primaryActionLabel="Done" disclaimer=""`, no children — lesson: Hero text and one button make a confirmation screen.
- Shorter hero — `{...OFFER}` with `heroHeight={240}` and BENEFITS — lesson: A lower heroHeight brings the body up; the text stays at the bottom of its space.
- With hero media — `{...OFFER}` with `heroMedia={<Image imageSource={bankHero} ratio={328 / 223} />}`, `heroHeight={460}`, and BENEFITS — lesson: Media fills the width at its own ratio and scrolls with the content; keep the text off light areas.

## States
header: States · title: Shown until the screen removes it · description: Fullscreen Modal has no open or closed state. The screen shows it and removes it; its close button and main button only report the press.
One ExampleCard "The screen closes it" (description: "Press close or Upgrade for free: the screen removes the modal. Show it again with the button.") › Frame › shown: `<FullscreenModal {...OFFER} onClose={hide} onPrimaryAction={hide}>{BENEFITS}</FullscreenModal>`; hidden: `<VStack modes={LIGHT} alignHorizontal="center" style={{ flex: 1, justifyContent: 'center' }}><Button label="Show the offer" onPress={show} modes={LIGHT} /></VStack>`.

## Sizing
header: Sizing · title: The whole screen · description: Fullscreen Modal fills its screen and scrolls inside it. The hero text sits at the bottom of a 420 px space by default, the body starts 16 px below it with 16 px between Sections, and the footer stays at the bottom. The close button is 40 px, 12 px from the top and right.
Measured diagram: `<Anatomy legend={false} surface="dark" specimenWidth={360} marks={[{ kind: 'size', target: close, side: 'left', label: 'both' }, { kind: 'size', target: HERO, side: 'right', label: 'both' }, { kind: 'gap', from: HERO, to: `${BODY} > :first-child` }]}>` › `<FullscreenModal testID="fm-size" {...OFFER} heroHeight={240} onClose={noop} onPrimaryAction={noop}>{BENEFITS}</FullscreenModal>`. Expected 40 × 40, 360 × 240, and 16.

## Content
header: Content · title: An offer in four lines and one action · description: Use the eyebrow for the product or offer, the headline for the benefit in a few words, one supporting sentence, and the price on its own line. Label the button with the action. Unset lines fall back to the JioFinance+ upgrade copy, so set every line; an empty one hides it.
One ExampleCard "Four lines, one action" › Frame › `<FullscreenModal {...GOLD} onClose={noop} onPrimaryAction={noop} />`.

## In context
header: In context · title: An upgrade offer from Profile · description: Profile opens the offer from its JioFinance+ row. Close takes people back; Upgrade for free starts the upgrade. The screen removes the modal either way.
Composition in `.coin-new-context`: `<ScreenFrame size="full" surface={open ? 'dark' : 'light'}>` › closed: `<VStack modes={LIGHT}>` with `<Text modes={LIGHT}>Profile</Text>` and `<ListItem layout="Horizontal" modes={LIGHT} title="JioFinance+" supportText="Cashback, JioPoints, and JioGold" onPress={open} />`; open: `<FullscreenModal {...OFFER} onClose={…} onPrimaryAction={…}>{BENEFITS}{PLANS}</FullscreenModal>`. Close sets the status “Closed the offer”, Upgrade for free “Upgrade started”; both close it. Below the frame, `<p className="coin-new-readout" role="status">`, starting “On Profile”.

## Do & Don'ts
header: Do & Don’ts · title: Readable, complete, and styled · description: Each pair shows a modal that reads as one message versus one that hides or muddles it.
Every preview is a Frame.
- Do Keep the text on a dark background: White hero text needs dark media behind it; here the dark screen stands in. — `{...OFFER}` with BENEFITS | Don't Put the text over a light photo: The white text gets lost in the image. — `{...OFFER}` with `heroMedia={<Image imageSource={bankHero} ratio={328 / 223} />}` and `heroHeight={300}`
- Do Set every line of copy: The JioGold offer reads as one message. — `{...GOLD}` | Don't Leave lines unset: They fall back to the JioFinance+ upgrade copy. — `eyebrow="JioGold" headline="Save in gold every month"` only
- Do Put Sections straight in the body: They take the modal’s dark styling. — `{...OFFER}` with `heroHeight={240}` and BENEFITS | Don't Wrap Sections in your own component: They miss the styling and stay white cards. — `{...OFFER}` with `heroHeight={240}` and `<Wrapped />`, where `function Wrapped() { return BENEFITS }` (the lower hero keeps the Section in view)

## Sources
header: Sources · title: Use the public Fullscreen Modal contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (5 October build) from the team’s private package repository. In Figma the modal is 1228 px tall with a full-height image behind everything; the package has no background of its own, so this page shows it on a dark screen in place of that image. Its close button is 40 px (28 in Figma) and its hero space 420 px (532 in Figma), and unset copy falls back to the JioFinance+ upgrade text. In Dark mode the hero text turns black, so this page shows Light only. On the web it isn’t announced as a dialog, focus isn’t moved into it or kept there, and Escape does nothing. The published Storybook still shows the old page.

## Limits
Do not show Dark mode, Page type overrides, `modes`, LottiePlayer heroes, `closeOffsetY`, `style`, or `contentContainerStyle`. Do not imply that the modal opens, closes, or animates itself, traps focus, or that a close button without `onClose` does anything.
