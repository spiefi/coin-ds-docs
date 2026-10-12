# Popup brief

slug: popup · label: Popup · public API: Popup, PopupRef (+ Title, VStack, Button, Text for content; ScreenFrame from the kit for In context)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3040-764 · storybook: docsUrl('popup') · stories: Default=components-popup--default, Controlled=components-popup--controlled, Custom content=components-popup--custom-content
checked: 12 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-636f3f5, Biscuit's main 636f3f5; main's c1fa197c only rewrites the Storybook page)
icon: a phone outline with a short sheet at the bottom — `<><rect x="4" y="1.5" width="10" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M4 11c0-1.1.9-2 2-2h6a2 2 0 0 1 2 2" stroke="currentColor" strokeWidth="1.5" fill="none" /></>`
keywords: bottom sheet popup, modal, promo sheet, rewards popup

Important: Popup is a React Native Modal. On the web it opens over the whole browser window, never inside a card or frame, and is absent from the page while closed. Every example is therefore a button that opens a real Popup. Never use `defaultOpen` and never start an example open.
Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`; every Popup gets `modes={{ ...LIGHT, …extra } as Modes}` (only the extra modes named below). Buttons outside a popup get `modes={LIGHT}`.
“Rewards” = a component `({ modes, onClaim, onLater }: { modes?: Modes; onClaim: () => void; onLater?: () => void })` returning `<Title title="Your rewards are waiting" subtitle="Claim your points and enjoy the benefits now." textAlign="Center" modes={modes} />` and, as in Figma, the buttons stacked full width: `<VStack modes={modes} style={{ alignSelf: 'stretch' }}><Button label="Claim" onPress={onClaim} modes={modes} />{onLater && <Button label="Later" onPress={onLater} modes={{ ...modes, Emphasis: 'Low' } as Modes} />}</VStack>` (Later is Figma's low-emphasis text button, not Storybook's blue Tertiary fill). The popup injects its modes into `modes`; Rewards forwards them and never sets Page type or Slot gap itself.
“Offer” = the same shape with Title "Get 50% cashback" / "On your next three bill payments this month." and buttons "Avail now" (onClaim) and "Maybe later" (onLater, Emphasis Low).
“Terms” = the same shape with Title "Offer terms" / "Read before you claim." then 40 `<Text modes={modes}>` lines `${n}. Cashback is credited within 7 days of an eligible payment of ₹100 or more.` (n = 1…40; enough to outgrow a desktop window), then the stacked Claim and Later.
“Triggered(props, content)” = a component holding `const ref = useRef<PopupRef>(null)`, rendering `<Popup ref={ref} trigger={<Button label={label} modes={LIGHT} />} …props>` with content whose buttons call `ref.current?.close()`. Default trigger label "Open popup" unless stated.

## Overview
summary: Use a Popup for a short, focused moment, such as an offer or a reward, that slides up over the screen and asks for one choice.
principle: One short message and a choice, then back to the screen.
playground: `.preview-stage` › Triggered with label "Claim rewards" and Rewards (Claim and Later both close), `onOpenChange={setOpen}`; stage label "Live Coin Popup". Controls: OnOff "Close on scrim tap" (on) → `closeOnBackdropPress`; Segment "Scrim" `30% | 50% | 70%` (50%) → `backdropOpacity` 0.3 / 0.5 / 0.7; Segment "Close speed" `150 ms | 250 ms | 400 ms` (250 ms) → `animationDuration`; Segment "Slot gap" `XS | S | M | L | XL` (S) → `'Slot gap'`; Segment "Page type" `MainPage | SubPage | JioPlus` (MainPage) → `'Page type'`. Readout title "Popup", value "Open" or "Closed"; note with scrim taps on: "Press Claim rewards: the popup opens over the whole page, as it covers a phone screen. Later, a tap on the dimmed page, or Escape closes it."; off: "A tap on the dimmed page does nothing now. Later or Escape closes it."

## Anatomy
header: Anatomy · title: A trigger, then a sheet over the screen · description: Only the trigger sits in the page. Pressing it dims the whole screen with a scrim and slides up a white sheet with 20 px top corners and 24 px of space at the bottom. The sheet holds one centred stack of your content, with 8 px of padding and 8 px between items. Press the trigger to see them: React Native draws the popup over the page, so this diagram can’t frame it.
specimen: `<Anatomy>` › Triggered with label "Claim rewards" and Rewards (both close).
parts:
1. Trigger — Yours: any pressable. Pressing it opens the popup over the whole screen. — target: `[role="button"]` — side: right

## Configuration
header: Configuration · title: How it opens, its scrim, and its spacing · description: A popup opens from its own trigger or when the screen sets it open. The scrim's strength is a setting. Modes on the popup reach its stack: Slot gap sets the space between items, and Page type the stack's padding.
Grid `coin-new-example-grid`, each an ExampleCard:
- Opened by its trigger — Triggered, Rewards — lesson: The popup opens when its trigger is pressed and keeps its own open state.
- Opened by the screen — a `<Button label="Show offer" modes={LIGHT} onPress={() => setOpen(true)} />` and `<Popup open={open} onOpenChange={setOpen}>` with Offer (both buttons set open false) — lesson: The screen decides when it's open, for example after a payment, and hears every close.
- Lighter scrim — Triggered, `backdropOpacity={0.3}`, Rewards — lesson: 30% black lets more of the page show through than the default 50%.
- Wider spacing — Triggered, modes `'Slot gap': 'L'`, Rewards — lesson: Slot gap L puts 24 px between the title and the buttons; the default, S, is 8 px.
- Sub page padding — Triggered, modes `'Page type': 'SubPage'`, Rewards — lesson: On a sub page, or JioPlus, the stack's padding grows from 8 to 16 px.

## States
header: States · title: Closed, open, and how it closes · description: Closed, only the trigger shows. Opening fades in the scrim while the sheet springs up from the bottom; closing slides it down and fades the scrim over 250 ms. A tap on the scrim, Escape, or a button in the sheet closes it, and focus stays inside while it's open.
Grid `coin-new-example-grid`:
- Closes from inside — Triggered, Rewards — lesson: Later closes it from inside; Claim would carry on with the task.
- Scrim tap off — Triggered, `closeOnBackdropPress={false}`, Rewards — lesson: Only Later or Escape closes it. The dimmed page is still a button named “Close popup” that does nothing (#268).

## Sizing
header: Sizing · title: The window's width, its content's height · description: The sheet spans the whole window, as it spans a phone screen, and grows with its content. There's no maximum height and no scroll, so content taller than the screen runs off the top (#268).
Grid `coin-new-example-grid`:
- Short content — Triggered, Rewards — lesson: A title and two buttons: the sheet hugs them at the bottom of the screen.
- Tall content — Triggered with label "Open tall content", Terms — lesson: Forty lines of terms run off the top of the window and can't be scrolled to.

## Content
header: Content · title: A headline, one line, and two choices · description: Lead with what's in it for people, add one supporting line, then a main action and a quiet way out. Figma's example also puts an image above the title.
One ExampleCard "An offer" › Triggered with label "See offer", Offer. Description: "One headline, one line of detail, Avail now, and Maybe later."

## In context
header: In context · title: Rewards after a payment · description: After a payment the screen opens a rewards popup. Claim or Later closes it and the screen notes the choice; a tap on the dimmed page or Escape just closes it.
Composition in `.coin-new-context`: `<ScreenFrame>` holding a real screen laid out with Coin (never loose Text and a bare button): `<VStack modes={{ ...LIGHT, 'Slot gap': 'L' } as Modes}>` with `<Title title="Payment successful" subtitle="₹250 paid to Ravi Stores." textAlign="Center" modes={LIGHT} />` and a full-width `<Button label="Done" modes={LIGHT} onPress={() => setOpen(true)} />`; then `<Popup open={open} onOpenChange={setOpen} modes={LIGHT}>` with Rewards whose Claim sets the status "Rewards claimed" and Later "Saved for later", each closing it; `onOpenChange(false)` from the scrim or Escape sets "Closed". Below the frame, `<p className="coin-new-readout" role="status">`, starting "Payment complete".

## Do & Don'ts
header: Do & Don’ts · title: Short, with a way out · description: Each pair opens a popup people can read and leave next to one that traps them or runs off the screen.
Each preview is a Triggered with label "Open popup".
- Do Offer a way out: Later, a tap on the dimmed page, and Escape all close it. — Rewards | Don't Trap people in it: With no Later and scrim taps off, only Escape closes it, and phones have no Escape key. — `closeOnBackdropPress={false}`, Rewards without `onLater`
- Do Keep it short: A title and two buttons fit any screen. — Rewards | Don't Fill it with text: Long content runs off the top of the screen and can't be scrolled (#268). — Terms

## Sources
header: Sources · title: Use the public Popup contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (5 October build) from the team’s private package repository; Biscuit’s newer build only rewrites the Storybook page. Figma’s Popup is a 360 × 508 white sheet with 20 px top corners and 24 px at the bottom, holding an image, a title, and two buttons; it has no scrim or properties. In code it’s a React Native Modal: on the web it opens over the whole browser window, never inside a frame, so these examples open it from a button, as Storybook does. The sheet spans the window, its scrim is 50% black from props (Overlay’s is 70%), and it springs up but slides away over its close speed. On the web Escape closes it and focus stays inside it, but focus starts on the dimmed page’s “Close popup” button, the dialog has no name, a scrim with taps off is still that button, doing nothing, and tall content runs off the screen (#268). The published Storybook page is still the old generated one.

## Limits
Never start a popup open or use `defaultOpen`; never host it as if a frame contained it. Do not show `backdropColor` (keep the black scrim), `style`, or the Background, Stack Context, and Context modes as settings. Don't imply a title or close button of its own, a handle, drag to close, a maximum height, or scrolling.
