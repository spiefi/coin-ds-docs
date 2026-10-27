# Status Hero brief

slug: statushero · label: Status Hero · public API: StatusHero (+ Image in `renderMedia`; VStack, Title, Button and the kit's ScreenFrame)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2594-13 · storybook: docsUrl('statushero') · stories: Default=components-statushero--default, Without title=components-statushero--without-title, Without subtitle=components-statushero--without-subtitle, Custom media slot=components-statushero--custom-media-slot, Large amount=components-statushero--large-amount
checked: 25 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-c8526ae = Biscuit’s main c8526ae)
icon: a ticked circle over two centred lines — `<><circle cx="9" cy="6" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M7.3 6l1.2 1.2 2.2-2.4M5 13h8M6.5 16h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /></>`
keywords: success screen, result screen, payment result, confirmation, done screen

Setup: `import goldCoin from '../assets/gold-coin.png'`. `LIGHT = { 'Color Mode': 'Light' } as Modes`; `SYS = (a: 'positive' | 'warning' | 'negative') => ({ ...LIGHT, 'Semantic Intent': 'System', AppearanceSystem: a } as Modes)`.
COIN = `<Image imageSource={goldCoin} width={81} height={81} />`.
“SH(overrides = {})” = `<StatusHero modes={LIGHT} {...overrides} />` (the package’s default copy, which is Figma’s; overrides win).
HOST = `<VStack modes={LIGHT} style={{ width: 300, maxWidth: '100%' }}>…</VStack>`: every SH in the playground, an ExampleCard, or a Do & Don’t sits in HOST, so long text wraps instead of running out of the card. The Anatomy and Sizing specimens are bare SH().
PAID = `{ title: 'Payment successful', subtitle: '₹1,200 sent to Rahul Verma.', value: '1,200', modes: SYS('positive') }`; FAILED = `{ title: 'Payment failed', subtitle: 'No money left your account.', value: '1,200' }`.
Selectors (no testID): `R = ':scope > div'`; media `${R} > div:first-child`; mark `${R} [role="img"]`; amount `${R} > div:first-child > div:last-child`; title `${R} > div:last-child > [dir="auto"]:first-child`; subtitle `${R} > div:last-child > [dir="auto"]:last-child`.

## Overview
summary: Use a Status Hero at the top of a result screen to confirm what just happened: a mark, the amount, a title, and one line.
principle: Say what happened, then the one thing that follows.
playground: `.preview-stage` › HOST › SH({ modes: intent === 'Brand' ? LIGHT : SYS(appearance), iconName, showTitle }). Stage label "Live Coin Status Hero". Controls: Segment "Semantic Intent" `Brand | System` (Brand); Segment "AppearanceSystem" `positive | warning | negative` (positive); Segment "iconName" `ic_confirm | ic_warning | ic_close` (ic_confirm); OnOff "showTitle" (on). Readout title "Mark", value Brand → "Gold"; System → "Green", "Orange", or "Red"; note: "AppearanceSystem colours the mark only with Semantic Intent System. The title and the amount don’t change."

## Anatomy
header: Anatomy · title: A mark, an amount, two lines · description: The media, a mark over the amount, sits on top; the title and the subtitle follow. Everything is centred.
specimen: `<Anatomy …>` › SH(). marks: `{ kind: 'gap', from: mark, to: amount }`.
parts:
1. Mark — An 81 px Icon Capsule showing iconName. — target: mark — side: left
2. Amount — A Money Value from value and currency, 36 px. — target: amount — side: right
3. Media — renderMedia replaces the mark and the amount together. — target: media — side: top
4. Title — title, 20 px Bold; showTitle hides it. — target: title — side: left
5. Subtitle — subtitle; a line break in it stays. — target: subtitle — side: bottom

## Configuration
header: Configuration · title: The mark, or your own media · description: The mark is gold by default: the hero fixes its Icon Capsule to AppearanceBrand Primary, so no brand mode changes it. Set Semantic Intent to System and AppearanceSystem colours it green, orange, or red; pick a matching iconName. renderMedia replaces the mark and the amount with your own content, such as a picture.
Body: `<div className="coin-new-stack">` with two `coin-new-example-grid` grids (two columns), each SH in HOST.
Grid 1:
- Brand — SH() — lesson: The default gold mark.
- System positive — SH({ modes: SYS('positive') }) — lesson: Green: it went through.
- System warning — SH({ modes: SYS('warning'), iconName: 'ic_warning', title: 'Payment pending', subtitle: 'We’ll tell you when your bank confirms it.' }) — lesson: Orange: still waiting.
- System negative — SH({ ...FAILED, modes: SYS('negative'), iconName: 'ic_close' }) — lesson: Red: it didn’t happen.
Grid 2:
- Default media — SH({ title: 'Gold bought', subtitle: 'It’s in your gold locker now.', value: '5,000' }) — lesson: An Icon Capsule over a Money Value.
- renderMedia — SH({ title: 'Gold bought', subtitle: 'It’s in your gold locker now.', renderMedia: COIN }) — lesson: A picture instead, and no amount.

## States
header: States · title: Full, or shorter · description: The hero has no states: it doesn’t press, load, or animate, and it has no button, so the screen adds the next action. showTitle={false} hides the title, and an empty subtitle hides the subtitle; leaving subtitle out shows the package’s default sentence instead.
Grid `coin-new-example-grid three`, each SH in HOST:
- Full — SH(PAID) — lesson: Mark, amount, title, and subtitle.
- Without a title — SH({ ...PAID, showTitle: false }) — lesson: showTitle={false} hides the title.
- Without a subtitle — SH({ ...PAID, subtitle: '' }) — lesson: An empty subtitle hides it.

## Sizing
header: Sizing · title: As wide as its words · description: The hero has no width of its own: it centres its content and wraps text only when its host is narrower. With the default copy it is 302 × 269: 8 px of padding, an 81 px mark, 46 px to a 44 px amount, then 12 px to a 24 px title and 12 px to the subtitle. Figma’s is 259 px tall, because its amount and title sit on 36 and 22 px lines.
Body: measured diagram only: `<Anatomy legend={false} marks={[{ kind: 'size', target: R, side: 'bottom', label: 'both' }, { kind: 'gap', from: mark, to: amount }, { kind: 'padding', target: R }]}>` › SH(). Expected 302 × 269, gap 46, padding 8; report the measured values.

## Content
header: Content · title: The outcome, then one fact · description: Write title as the outcome in a few words, such as Payment successful. Write subtitle as the one fact that follows; a line break in it stays. Give value as the number alone: currency adds the sign, and INR or ₹ both show ₹. Phone screen readers skip the amount, so say it in the subtitle too.
Grid `coin-new-example-grid` (two columns), each SH in HOST:
- Outcome and amount — SH(PAID) — lesson: The subtitle repeats the amount for screen readers.
- A long subtitle — SH({ title: 'Daily savings started', subtitle: '₹50 will move from HDFC Bank ··4821 to your gold locker every morning.', value: '50' }) — lesson: It wraps, centred, in its column.

## In context
header: In context · title: The screen after a setup · description: Start saving swaps the setup screen for the result: the hero confirms it, and Done below leaves. The hero has no button of its own, so the screen adds one.
Composition: `.coin-new-context` › `<ScreenFrame size="full">` › `<VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes} style={{ flex: 1, padding: 16 }} justifyVertical="space-between">`. When started: `<VStack modes={LIGHT} style={{ flex: 1 }} justifyVertical="center">` › SH() (default copy), then `<Button label="Done" modes={LIGHT} onPress={() => setStarted(false)} />`. Before: `<Title title="Save in gold every day" subtitle="₹50 a day from HDFC Bank ··4821" modes={LIGHT} />`, then `<Button label="Start saving" modes={LIGHT} onPress={() => setStarted(true)} />`. Below the frame, `<p className="coin-new-readout" role="status">`: “Not started” or “Daily savings started: ₹50 a day”.

## Do & Don'ts
header: Do & Don’ts · title: One result, said plainly · description: Each pair shows a result people take in at a glance next to one that contradicts or overloads it.
(Instruction, not copy: both sides of every pair sit in HOST.)
- Do The mark matches: A red cross for a failed payment. — SH({ ...FAILED, modes: SYS('negative'), iconName: 'ic_close' }) | Don't A success mark on a failure: The gold tick says it worked. — SH(FAILED)
- Do One next fact: What happened, then what follows. — SH(PAID) | Don't A history in the subtitle: This hero is one result; put the history in Transaction Details. — SH({ ...PAID, value: '250', subtitle: '₹50 on 19 Oct, ₹50 on 20 Oct, ₹50 on 21 Oct, ₹50 on 22 Oct, ₹50 on 23 Oct' })

## Sources
header: Sources · title: Use the public Status Hero contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (23 October build of Biscuit’s main) from the team’s private package repository. Figma’s Status Hero has <code>Title</code> and <code>Subtitle</code> text properties and a <code>title</code> switch, over a nested Icon Capsule and Money Value; the package adds <code>iconName</code>, <code>value</code>, <code>currency</code>, and <code>renderMedia</code>. Its mark is gold where Figma’s is dark grey with a white tick: the hero fixes the capsule’s brand mode, so only Semantic Intent System recolours it. It is 269 px tall where Figma’s is 259, and phone screen readers skip the amount. Storybook’s Without subtitle story still shows the default subtitle (all reported).

## Limits
Don't show or mention Color Mode, dark mode, Page type JioPlus, or Context. Don't imply a status prop, a button, that AppearanceBrand or Emphasis change the mark, that renderMedia keeps the amount, or that leaving subtitle out hides it.

## dbe0e02 publish (28 October 2026): copy changes

These replace the matching lines above; the guide file has the exact strings. Evidence: `docs/evidence/statushero.md`.

- checked: 28 October 2026 · built from dbe0e02 (27 October).
- Content: “… Give value as the number alone: currency adds the sign, and INR or ₹ both show ₹. Screen readers read the amount once, with its currency.” Outcome and amount — “The title gives the outcome; the subtitle says where the money went.”
- Sources: “… It is 269 px tall where Figma’s is 259, and Storybook’s Without subtitle story still shows the default subtitle (both reported). Screen readers read the amount once, with its currency.”
