# Overlay brief

slug: overlay · label: Overlay · public API: Overlay (+ ScreenFrame from the kit; Card, Title, ButtonGroup, Button, Text for composition)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2976-55 · storybook: docsUrl('overlay') · stories: Default=components-overlay--default, Bare backdrop=components-overlay--bare-backdrop, Bottom sheet=components-overlay--bottom-sheet
checked: 17 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-a116616, Biscuit's main a116616; dismiss name, focus and Escape fixed by #269; every overlay traps focus, #281)
icon: a rounded screen with a smaller filled box in the middle — `<><rect x="2" y="2" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" /><rect x="5" y="6.5" width="8" height="5" rx="1" fill="currentColor" /></>`
keywords: scrim, backdrop, dim layer, modal background

Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`; every Coin instance gets `modes={LIGHT}` unless stated; `const noop = () => {}`.
“Screen(open)” = the page behind, stacked in `<VStack modes={LIGHT}>` (Coin Text runs inline without it): `<Text modes={{ ...LIGHT, 'Text Sizes': 'Large' } as Modes}>Home</Text>`, `<Text modes={LIGHT}>Your balance and recent payments.</Text>`, `<Button label="Pay ₹250" onPress={open} modes={LIGHT} />`.
“Dialog(pay, cancel)” = a white dialog: `<Card modes={{ ...LIGHT, AppearanceBrand: 'Neutral' } as Modes} style={{ margin: 16 }}><Title title="Confirm payment" subtitle="₹250 to Ravi Stores" numberOfLines={2} modes={LIGHT} /><ButtonGroup modes={LIGHT}><Button label="Pay" onPress={pay} modes={PRIMARY} />{cancel && <Button label="Cancel" onPress={cancel} modes={{ ...PRIMARY, Emphasis: 'Low' } as Modes} />}</ButtonGroup></Card>` with `PRIMARY = { ...LIGHT, AppearanceBrand: 'Primary' }`. Card's default fill is cream (Primary); Neutral makes it white like Storybook's dialog, and Card passes Neutral to its children, so the buttons set Primary themselves. Cancel is a low-emphasis text button, not a second fill (the margin stands in for Storybook's 24 px dialog margin). Omit Cancel only where stated.
“Frame” = a component with its own `shown` state (default true unless stated): `<ScreenFrame footer={shown && <Overlay modes={LIGHT} contentPlacement={…} onPress={tap ? hide : undefined}>{content}</Overlay>}><Screen open={() => setShown(true)} /></ScreenFrame>`; content defaults to Dialog(hide, hide). The frame is the overlay's positioned parent.
Selectors: `OV = byTestId(id)`; dismiss area `${OV} > [aria-label="Dismiss overlay"]`; content `${OV} > :last-child`.

## Overview
summary: Use an Overlay to dim the screen behind a dialog, sheet, or drawer, so attention goes to what sits above it.
principle: Dim the page so one thing stands out.
playground: `.preview-stage` › Frame; stage label "Live Coin Overlay". Controls: OnOff "Shown" (on) → render the Overlay or not; Segment "Placement" `Center | Top | Bottom | Stretch` (Center) → `contentPlacement` (lower case); OnOff "Content" (on) → Dialog(hide, hide) or no children; OnOff "Tap to dismiss" (on) → `onPress={hide}` or none. Pay ₹250 on the screen turns Shown on. Readout title "Overlay", value "Shown" or "Hidden"; note with Tap to dismiss on: "Tap the dimmed screen, Pay, or Cancel to hide it. Pay ₹250 brings it back."; off: "Taps on the dimmed screen do nothing now. Pay or Cancel hide it."

## Anatomy
header: Anatomy · title: A scrim with your content above it · description: The overlay is a 70% black layer over its screen. With onPress a tap anywhere on the scrim dismisses it; whatever you place inside it sits above the scrim.
specimen: `<Anatomy specimenWidth={360}>` › `<ScreenFrame footer={<Overlay testID="ov-anatomy" modes={LIGHT} onPress={noop}>Dialog(noop, noop)</Overlay>}><Screen open={noop} /></ScreenFrame>`
parts:
1. Scrim — 70% black over the whole screen; it doesn't change with mode. — target: OV — side: left
2. Dismiss area — With onPress, a tap anywhere on the scrim calls it. — target: dismiss area — side: right
3. Content — Yours, placed above the scrim; presses on it don't dismiss. — target: content — side: top

## Configuration
header: Configuration · title: Placement, content, and fill · description: Content sits in the middle by default, or docks to the top or bottom. Leave the overlay empty when a sheet or drawer draws its own surface. With fill off it stays in the page's flow instead of covering its screen.
Grid `coin-new-example-grid`, each an ExampleCard › Frame with Tap to dismiss on:
- Centred — default placement — lesson: The default: content sits in the middle at its own width.
- At the top — `contentPlacement="top"` — lesson: Content docks to the top and stretches across the screen.
- At the bottom — `contentPlacement="bottom"` — lesson: Content docks to the bottom and stretches across, like a sheet.
- Stretched — `contentPlacement="stretch"` — lesson: Content stays in the middle but spans the screen's width.
- Bare scrim — no children — lesson: Only the dim layer, for a sheet or drawer that draws its own surface.
- Fill off — not in the footer: a `<ScreenFrame>` whose children are the Screen followed by `<Overlay fill={false} modes={LIGHT}>Dialog(noop, noop)</Overlay>` — lesson: The scrim stays in the page's flow and covers only its own content.

## States
header: States · title: Shown, dismissible, or blocking · description: The screen shows an overlay by rendering it and hides it by removing it; it appears and goes at once, with no fade. With onPress, a tap on the scrim or Escape calls it; without, the scrim still blocks the page but does nothing. On the web, Tab stays inside the overlay while it’s shown.
Grid `coin-new-example-grid`, each an ExampleCard › Frame:
- Tap to dismiss — onPress hides it — lesson: A tap on the dimmed page hides it; Pay ₹250 brings it back.
- Blocking — no onPress — lesson: Taps on the dimmed page do nothing, and the page underneath can't be pressed.
- Hidden — starts with `shown` false — lesson: Nothing is drawn: the page is bright and can be pressed.

## Sizing
header: Sizing · title: Fills its nearest positioned parent · description: With fill on, the overlay covers the nearest parent that sets a position, here the screen, and nothing outside it; it has no size of its own. With fill off it is as big as its content.
Measured diagram: `<Anatomy legend={false} specimenWidth={360} marks={[{ kind: 'size', target: byTestId('ov-size'), side: 'right', label: 'both' }]}>` › `<ScreenFrame footer={<Overlay testID="ov-size" modes={LIGHT} />}><Screen open={noop} /></ScreenFrame>`. Report the measured size.

## Content
header: Content · title: One focused task above the scrim · description: Put one small surface on the scrim, such as a confirmation with two buttons, and give people a way back: a Cancel button and onPress on the scrim. Name it for screen readers with dismissAccessibilityLabel, such as “Cancel payment”; the default is “Dismiss overlay”.
One ExampleCard "Confirm or cancel" › Frame (Tap to dismiss on). Description: "One question, one main action, and Cancel."

## In context
header: In context · title: Confirming a payment · description: Pay ₹250 dims Home and asks for confirmation. Pay completes it; Cancel or a tap on the dimmed screen backs out. The screen removes the overlay either way.
Composition in `.coin-new-context`: a ScreenFrame (starts hidden) with Screen; the footer, when shown, is `<Overlay modes={LIGHT} onPress={cancel}>Dialog(pay, cancel)</Overlay>`, where pay sets the status "Paid ₹250 to Ravi Stores" and cancel sets "Payment cancelled", both hiding it. Below the frame, `<p className="coin-new-readout" role="status">`, starting "On Home".

## Do & Don'ts
header: Do & Don’ts · title: Dim the page, and always offer a way back · description: Each pair shows an overlay people can leave and read past next to one that traps or blacks out the screen.
Every preview is a Frame.
- Do Offer a way back: onPress on the scrim and a Cancel button give two ways out. — Tap to dismiss on, Dialog(hide, hide) | Don't Leave no way back: Without onPress or Cancel, only finishing the task closes it. — no onPress, Dialog(hide) without Cancel
- Do Use one scrim: One 70% layer keeps the page faintly visible behind. — one Overlay with Dialog | Don't Stack scrims: Two overlays add up to 91% black and hide the page. — footer holds `<Overlay modes={LIGHT} />` followed by `<Overlay modes={LIGHT} onPress={hide}>Dialog(hide, hide)</Overlay>`

## Sources
header: Sources · title: Use the public Overlay contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (16 October build) from the team’s private package repository. Figma’s Overlay is a fill of 70% black with no properties; placement, content, fill, and tap to dismiss exist only in code. In code it fills its nearest positioned parent, not the device screen, and its colour is the same in every mode. It has no animation. Since the #269 fix it’s a modal on the web, named by dismissAccessibilityLabel: the scrim is no longer a Tab stop or a screen-wide focus ring, Tab stays inside, and Escape calls onPress. Every overlay takes focus as soon as it shows, even one that dims only part of a screen, so this page opens scrolled down to Do & Don’ts and Tab can’t leave that example (#281). Drawer uses it for its scrim. The examples host it as the Storybook stories do, over a small white screen; the dialog is a Coin Card instead of the stories’ hand-made box. The published Storybook page is still the old generated one.

## Limits
Do not show `style` or `modes` as designer settings (the scrim ignores modes). Don't imply an animation or a scrim colour per mode, and don't work around the focus trap on every overlay (#281). Dialog content is Coin components only.
