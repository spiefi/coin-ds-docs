# Page Hero brief

slug: pagehero · label: Page Hero · public API: PageHero (+ Image or IconCapsule in `media`; VStack and Button in `buttonSlot`; the kit's ScreenFrame)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4453-2348 · storybook: docsUrl('pagehero') · stories: Default=components-pagehero--default, Figma Master=components-pagehero--figma-master, With Body=components-pagehero--with-body, With Image Media=components-pagehero--with-image-media, With Illustration Media=components-pagehero--with-illustration-media, With Lottie Media=components-pagehero--with-lottie-media, With Video Media=components-pagehero--with-video-media, With Svg Media=components-pagehero--with-svg-media, Media Size M=components-pagehero--media-size-m, Size S=components-pagehero--size-s, Jio Plus On Dark=components-pagehero--jio-plus-on-dark, Without Supporting Text=components-pagehero--without-supporting-text, Without Button=components-pagehero--without-button, Headline Only=components-pagehero--headline-only, Custom Button Slot=components-pagehero--custom-button-slot, Long Headline=components-pagehero--long-headline
checked: 26 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-c8526ae = Biscuit’s main c8526ae)
icon: a circle over two centred lines and a wide pill — `<><circle cx="9" cy="4" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M5 8.5h8M6.5 11h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /><rect x="3.75" y="13.25" width="10.5" height="3" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none" /></>`
keywords: offer header, feature header, upsell, promo hero, landing hero

Setup: `import goldCoin from '../assets/gold-coin.png'`. `LIGHT = { 'Color Mode': 'Light' } as Modes`. `COIN = <Image imageSource={goldCoin} width={117} height={117} />`; `COIN70 = <Image imageSource={goldCoin} width={70} height={70} />`; `CAPSULE = <IconCapsule iconName="ic_confirm" modes={LIGHT} />`.
`TWO(onStart = noop, onLearn = noop)` = `<VStack modes={{ ...LIGHT, 'Slot gap': 'S' } as Modes} style={{ width: '100%' }}><Button label="Start saving" modes={LIGHT} style={{ width: '100%' }} onPress={onStart} /><Button label="Learn more" modes={{ ...LIGHT, Emphasis: 'Medium' } as Modes} style={{ width: '100%' }} onPress={onLearn} /></VStack>`.
“PG(overrides = {})” = `<PageHero modes={LIGHT} onButtonPress={noop} {...overrides} />` (the package’s default copy, which is Figma’s; overrides win).
HOST = `<VStack modes={LIGHT} style={{ width: 328, maxWidth: '100%' }}>…</VStack>`: every PG in the playground, an ExampleCard, or a Do & Don’t sits in HOST. Anatomy and Sizing specimens are bare, with `specimenWidth={328}`.
DARK(children) = `<ScreenFrame size="screen" surface="dark"><VStack modes={LIGHT} style={{ height: '100%', paddingVertical: 24 }} justifyVertical="center">{children}</VStack></ScreenFrame>` (height, not flex: the frame’s content box isn’t a flex column).
Selectors, for a hero with `testID={id}`: `ROOT = byTestId(id)`; with media: media `${ROOT} > div:nth-child(1)`, text wrap `${ROOT} > div:nth-child(2)`, eyebrow `${ROOT} > div:nth-child(2) > [dir="auto"]:first-child`, headline `${ROOT} > div:nth-child(2) > [dir="auto"]:last-child`, supporting `${ROOT} > [dir="auto"]:nth-child(3)`, body `${ROOT} > [dir="auto"]:nth-child(4)`; action `${ROOT} > [role="button"]`.

## Overview
summary: Use a Page Hero at the top of a feature or offer page: media, a short eyebrow, the offer as a headline, its price, and one action.
principle: One offer, said once, with one next step.
playground: `.preview-stage` › HOST › PG({ media: media ? COIN : undefined, showEyebrow, showSupportingText, showButton, modes: { ...LIGHT, 'PageHero Size': size, 'Button / Size': size } as Modes, onButtonPress: () => setPresses(n => n + 1) }). Stage label "Live Coin Page Hero". Controls: OnOff "media" (on); OnOff "showEyebrow" (on); OnOff "showSupportingText" (on); OnOff "showButton" (on); Segment "PageHero Size" `M | S` (M). Readout title "onButtonPress", value: showButton off → "No button"; else `Pressed ${presses} times`; note: "PageHero Size S also sets Button / Size S here, as Figma does: the button doesn’t follow PageHero Size on its own."

## Anatomy
header: Anatomy · title: Media, three lines, one action · description: Everything is centred in one column: the media on top, the eyebrow and the headline, the supporting line and the body, then the button across the full width.
specimen: `<Anatomy specimenWidth={328} …>` › PG({ testID: 'pg-anatomy', media: COIN, supportingText: '₹999/year', body: 'Auto-renews · Cancel anytime' }). marks: `{ kind: 'gap', from: eyebrow, to: headline }`.
parts:
1. Media — media, in a 117 px box at Video / Output L. — target: media — side: left
2. Eyebrow — eyebrow, a short category, 18 px Bold. — target: eyebrow — side: right
3. Headline — headline, 29 px Black; it wraps, centred. — target: headline — side: left
4. Supporting text — supportingText, the price or term, 12 px. — target: supporting — side: right
5. Body — body, a second fact; hidden until you pass it. — target: body — side: left
6. Action — A full-width Button, or your buttonSlot. — target: action — side: bottom

## Configuration
header: Configuration · title: Media, size, actions, and the page · description: media takes any Coin element, such as an Image or an Icon Capsule, in a box Video / Output sizes to 117, 70, or 20 px; give it something that size, because the box clips the rest. PageHero Size S makes the text smaller, with an 18 px headline and 12 px gaps; set Button / Size S with it, as Figma does. The hero passes its modes to the button, so AppearanceBrand recolours it, and buttonSlot replaces it, for example with two stacked buttons. Page type JioPlus turns the text white for the JioFinance+ page’s dark backdrop.
Body: `<div className="coin-new-stack">` with four grids, each PG in HOST (DARK replaces HOST where shown).
Grid 1 (`coin-new-example-grid`, two columns: a 328 px hero is too cramped three across):
- An Image — PG({ media: COIN }) — lesson: Any element, in a 117 px box.
- An Icon Capsule — PG({ media: CAPSULE, eyebrow: 'New benefits unlocked', headline: 'Earn more on every payment', supportingText: 'Available across all your cards', buttonLabel: 'See benefits' }) — lesson: Smaller media sits centred in the box.
- Video / Output M — PG({ modes: { ...LIGHT, 'Video / Output': 'M' }, media: COIN70 }) — lesson: A 70 px box, with media to match.
Grid 2 (`coin-new-example-grid`, two columns):
- PageHero Size M — PG({ media: COIN }) — lesson: A 29 px headline, 16 px apart.
- PageHero Size S — PG({ media: COIN, modes: { ...LIGHT, 'PageHero Size': 'S', 'Button / Size': 'S' } }) — lesson: An 18 px headline, 12 px apart, and Button / Size S.
Grid 3 (`coin-new-example-grid`, two columns):
- AppearanceBrand Primary — PG() — lesson: The gold button, the default.
- AppearanceBrand Secondary — PG({ modes: { ...LIGHT, AppearanceBrand: 'Secondary' } }) — lesson: The button turns purple; the text doesn’t change.
Grid 4 (`coin-new-example-grid`, two columns):
- buttonSlot — PG({ buttonSlot: TWO() }) — lesson: Two stacked buttons, High then Medium, as in Figma.
- Page type JioPlus — DARK(PG({ modes: { ...LIGHT, 'Page type': 'JioPlus' }, eyebrow: 'JioFinance+', headline: 'Your money is working harder for you.', supportingText: 'Active till 22 Apr, 2027', showButton: false })) — lesson: White text for the JioFinance+ page.

## States
header: States · title: Full, or shorter · description: The hero doesn’t press or load; its button is its only action. showEyebrow, showSupportingText, showBody, and showButton hide their parts, and an empty headline hides the headline. body shows only once you pass one. Pass media only when you have some: media={false} still leaves an empty box.
Grid `coin-new-example-grid` (two columns), each PG in HOST:
- Offer — PG() — lesson: Eyebrow, headline, price, and button.
- Without a button — PG({ eyebrow: 'JioFinance+', headline: 'Earn cashback on every purchase', supportingText: 'Available on all eligible cards', showButton: false }) — lesson: showButton={false}: text only.
- Headline only — PG({ showEyebrow: false, headline: 'You are all set', showSupportingText: false, showButton: false }) — lesson: Every switch off but the headline.

## Sizing
header: Sizing · title: Full width, 16 px inside · description: The hero fills its host’s width and keeps 16 px clear on each side, but adds nothing above or below, so the screen gives it room. Its parts are 16 px apart and the eyebrow sits 8 px above the headline. With the default copy in a 328 px host it is 328 × 225, and the headline wraps to three 35 px lines. Figma’s hero has no side padding, and its eyebrow and headline lines are 20 and 29 px.
Body: `<Anatomy legend={false} specimenWidth={328} marks={[{ kind: 'size', target: ROOT, side: 'bottom', label: 'both' }, { kind: 'gap', from: eyebrow, to: headline }, { kind: 'padding', target: ROOT }]}>` › PG({ testID: 'pg-sizing' }) (no media, so use the no-media selectors: text wrap `${ROOT} > div:nth-child(1)`, eyebrow and headline inside it). Expected 328 × 225, gap 8, padding 16 at the sides; report the measured values.

## Content
header: Content · title: The offer, its price, a verb · description: Write eyebrow as a short category, such as Upgrade to JioFinance+, and headline as the offer in one sentence. Put the price or term in supportingText and a second, different fact in body. Make buttonLabel a short verb: it stays on one line and is cut off if it’s too long.
Grid `coin-new-example-grid` (two columns), each PG in HOST:
- Price, then a second fact — PG({ supportingText: '₹999/year', body: 'Auto-renews · Cancel anytime' }) — lesson: Two lines that say different things.
- A long headline — PG({ eyebrow: 'Important update', headline: 'A longer headline wraps across several lines and stays centred', supportingText: 'Tap to learn more about the changes', buttonLabel: 'Read more' }) — lesson: It wraps, centred; nothing is cut off.

## In context
header: In context · title: The top of an offer page · description: The Digital Gold page opens with the offer: the coin, what it is, and two actions, Start saving and Learn more. The hero only lays them out; each button does its own thing.
Composition: `.coin-new-context` › `<ScreenFrame size="full">` › `<VStack modes={LIGHT} style={{ flex: 1, paddingVertical: 24 }} justifyVertical="center">` › PG({ media: COIN, eyebrow: 'Digital Gold', headline: 'Save in gold from ₹10 a day', supportingText: '24K · 99.9% pure', body: 'Stored for free in insured vaults', buttonSlot: TWO(() => setLast('Start saving'), () => setLast('Learn more')) }). Below the frame, `<p className="coin-new-readout" role="status">`: last ? `Pressed ${last}` : 'Nothing pressed'.

## Do & Don'ts
header: Do & Don’ts · title: One offer, said once · description: Each pair shows a hero that reads cleanly next to one that repeats itself or breaks its media.
(Instruction, not copy: both sides of every pair sit in HOST.)
- Do Two different lines: The price, then what follows from it. — PG({ supportingText: '₹999/year', body: 'Auto-renews · Cancel anytime' }) | Don't The same sentence twice: supportingText and body repeat the price, as Storybook’s Default story does. — PG({ body: '₹999/year · ₹0 until 2027' })
- Do Media sized to its box: A 117 px coin in the 117 px box. — PG({ media: COIN }) | Don't Media bigger than its box: Video / Output M is a 70 px box, so the coin is cut off. — PG({ modes: { ...LIGHT, 'Video / Output': 'M' }, media: COIN })

## Sources
header: Sources · title: Use the public Page Hero contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (23 October build of Biscuit’s main) from the team’s private package repository. Figma’s Page Hero has <code>Eybrow</code>, <code>Headline</code>, <code>Supporting text</code>, and <code>Body</code> text properties and switches for each part, media, and the buttons; it shows media, the body, and two stacked buttons by default, where the package shows one button until you pass media, a body, or a <code>buttonSlot</code>. The package adds 16 px of side padding, its eyebrow and headline lines are taller than Figma’s, <code>PageHero Size</code> S leaves the button at M, and Storybook’s Default story shows the price twice (all reported).

## Limits
Don't show or mention Color Mode or dark mode. Don't imply the hero presses, plays video or Lottie itself, fits media to its box, resizes its button with PageHero Size, or that body shows without being set.
