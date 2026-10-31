# Toast brief

slug: toast · label: Toast · public API: ToastProvider, addToast, closeAll, useToast, Toast (+ ScreenFrame from the kit; Icon, Button, Text, VStack for composition)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2197-1510 · storybook: docsUrl('toast') · stories: Default=components-toast--default, Top placement=components-toast--top-placement, Multiple toasts=components-toast--multiple-toasts, Persistent toast=components-toast--persistent-toast, Custom timeout=components-toast--custom-timeout, With start item=components-toast--with-start-item
checked: 17 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-a116616, Biscuit's main a116616; icon colour, queue timers, maxVisibleToasts and disableTruncation fixed by #267)
icon: a small rounded bar near the bottom of a line — `<><rect x="2.5" y="10" width="13" height="5" rx="2.5" stroke="currentColor" strokeWidth="1.5" /><path d="M5 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>`
keywords: snackbar, notification, confirmation message, alert

Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`; Coin instances get `modes={LIGHT}` unless stated. `LONG = "We couldn't verify your mobile number. Check the number and try again, or sign in with your email address instead."`
Static toasts are the public `Toast` view: `<Toast id={unique} title=… timeout={0} modes={LIGHT} />` (`timeout={0}` so it never closes itself), plus `startItem` / `slotItem` where stated. In ExampleCards (Configuration, Sizing, Content) every static toast, or stack of toasts, sits in the kit's `<Surface width="wide" elevated>` (a hugging panel wraps the toast) so its drop shadow fades out inside the panel; Do & Don't previews keep the bare toast.
Live screens: every `ToastProvider` shows the same queue, so only one may be mounted at a time. The guide holds `const [active, setActive] = useState('playground')`. “Live(id, providerProps, buttons)” = `<ScreenFrame size="full">` whose child is `screen` wrapped in `<ToastProvider {...providerProps}>` only when `active === id`, otherwise `screen` alone; `screen` = `<VStack modes={LIGHT} style={{ flex: 1 }} justifyVertical="center" alignHorizontal="center">` holding its buttons. Every button that adds a toast first calls `take(id)`: when `active !== id`, `closeAll()` then `setActive(id)`; then `addToast(…)`. Don't add any animation: the site plays the package's slide and fade.
Selectors: surface `[role="alert"]`; icon `[role="alert"] svg`; message `[role="alert"] [dir="auto"]`.

## Overview
summary: Use a Toast to confirm something that just happened, such as a payment or a copy, in a short message that closes itself.
principle: Confirm, briefly, then get out of the way.
playground: `.preview-stage` › Live('playground', `placement` and `modes={{ ...LIGHT, AppearanceBrand: brand } as Modes}`) with `<Button label="Show toast" />` (adds `{ title, timeout, startItem }`) and `<Button label="Clear all" modes={{ ...LIGHT, AppearanceBrand: 'Tertiary' } as Modes} onPress={closeAll} />`; stage label "Live Coin Toast". Controls: Segment "Placement" `Bottom | Top` (Bottom) → provider `placement`; Segment "Message" `Short | Long` (Short) → title "Mobile number is invalid" or LONG; OnOff "Leading icon" (off) → `startItem`; Segment "Timeout" `4 s | 8 s | Stays` (4 s) → 4000 / 8000 / 0; Segment "Brand" `Primary | Secondary | Tertiary | Neutral` (Primary) → provider AppearanceBrand. Readout title "In the queue", value from `useToast().toasts.length`: "1 toast" / "N toasts"; note: "Up to three show at once, newest last. Each closes after its timeout; Stays waits for Clear all."

## Anatomy
header: Anatomy · title: A dark surface with a message · description: A toast is a dark rounded surface holding one message and, if you ask for it, a leading icon. It has no buttons; it closes itself.
specimen: `<Anatomy specimenWidth={300}>` (so the toast stays on one line) › `<Toast id="toast-anatomy" title="Mobile number is invalid" startItem timeout={0} modes={LIGHT} />`
parts:
1. Surface — Dark grey with 14 px corners and a soft shadow; the same in every mode. — target: surface — side: left
2. Leading icon — Optional 18 px icon; the card icon unless you swap it. — target: icon — side: top
3. Message — White 14 px text, up to two lines. — target: message — side: bottom

## Configuration
header: Configuration · title: Message, icon, and brand · description: A toast is one message with an optional leading icon. Only the icon follows AppearanceBrand; the surface is the same dark grey in every mode. Where toasts appear, top or bottom, is set once on the screen's provider: try it in the playground.
Grid `coin-new-example-grid`, each an ExampleCard › static toast:
- Message only — title "Mobile number is invalid" — lesson: The default: one line of white text on a dark surface.
- With the card icon — the same, `startItem` — lesson: startItem adds the card icon before the message, white by default, as in Figma.
- Your own icon — the same, `startItem`, `slotItem={<Icon iconName="ic_confirm" size={18} />}`, title "Payment successful" — lesson: Swap in another 18 px icon; it takes the Coin icon colour, a deeper gold.
- Icon by brand — `<div className="coin-new-stack">` of four toasts with `startItem` and modes AppearanceBrand Primary, Secondary, Tertiary, Neutral, titled with the brand name — lesson: AppearanceBrand recolours only the icon: gold, purple, blue, or white, the default.

## States
header: States · title: Shown, stacked, and gone · description: A toast slides in from its edge and closes itself after 4 s, or after its own timeout; with no timeout it stays until the screen clears it. Up to three show at once, newest last. Older ones wait behind them on their own timers, so they appear only if they’re still due when a newer one closes. There's no close button and no swipe.
One ExampleCard "Stacked and queued" › Live('states', bottom) with `<Button label="Show five" />` (adds "Notification 1" … "Notification 5", 4 s each) and `<Button label="Clear all" …Tertiary… onPress={closeAll} />`. Description: "Five at once: the newest three show; the first two time out behind them and never appear."

## Sizing
header: Sizing · title: Hugs its message, within 90% of the screen · description: A toast is as wide as its message, at least 200 px and at most 90% of its screen, with 16 px of padding at the sides and 14 px above and below. Long messages wrap to two lines, then end in an ellipsis, unless the toast is added with disableTruncation, which shows every line.
Measured diagram: `<Anatomy legend={false} specimenWidth={300} marks={[{ kind: 'size', target: '[role="alert"]', side: 'right', label: 'both' }, { kind: 'padding', target: '[role="alert"]' }]}>` › static toast "Mobile number is invalid" with `startItem`. Report the measured size.
Then grid `coin-new-example-grid`, each in `<Surface width="wide" elevated>`:
- Short message — title "Saved" — lesson: Even one word gets a 200 px toast.
- Long message — title LONG — lesson: It wraps to two lines, then ends in an ellipsis; the rest is lost.

## Content
header: Content · title: One short sentence about what happened · description: Say what happened in a few words, such as Payment successful or UPI ID copied. A toast has no buttons and closes itself, so never ask for a decision or put anything in it that people must read twice.
One ExampleCard "Confirmations" › `<div className="coin-new-stack">` of toasts "Payment successful", "UPI ID copied", "Mobile number is invalid". Description: "Short, specific, and about something that already happened."

## In context
header: In context · title: Copying a UPI ID · description: Pressing Copy confirms with a toast at the bottom of the screen. The screen adds it with addToast; it closes itself after 4 s.
Composition in `.coin-new-context`: Live('context', bottom) whose screen holds `<Text modes={{ ...LIGHT, 'Text Sizes': 'Large' } as Modes}>Your UPI ID</Text>`, `<Text modes={LIGHT}>yourname@jio</Text>`, and `<Button label="Copy" />` that adds `{ title: 'UPI ID copied' }` and sets the status "Copied yourname@jio". Below the frame, `<p className="coin-new-readout" role="status">`, starting "Nothing copied yet".

## Do & Don'ts
header: Do & Don’ts · title: Short, and about what already happened · description: Each pair shows a toast people take in at a glance next to one they can't finish reading or act on.
Every preview is a static toast.
- Do Keep it to one line: “Payment successful” reads at a glance. — "Payment successful" | Don't Write a paragraph: Past two lines the message is cut off, and nothing shows the rest. — LONG
- Do Confirm what happened: The action is done; the toast just says so. — "UPI ID copied" | Don't Ask for a decision: A toast has no buttons and disappears in 4 s, so people can't answer. — "Retry the payment?"

## Sources
header: Sources · title: Use the public Toast contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (16 October build) from the team’s private package repository. Figma’s Toast is one 291 × 46 component with a text, an optional start icon, and an icon swap; its icon resolves to white. Since the #267 fix the default icon is white too; an AppearanceBrand mode recolours it, while the surface stays the same dark grey in every mode. Screens add toasts with addToast and show them through one ToastProvider: every provider shows the same queue, so this page mounts one at a time. Toasts slide in from their edge and fade out, as in the package, and messages stop at two lines unless addToast sets disableTruncation. Each toast is announced as an alert. The published Storybook page is still the old generated one.

## Limits
Never mount two ToastProviders at once. Do not show `maxVisibleToasts`, `closeToast`, `onClose`, `id`, `style`, or `disableTruncation` as settings. Don't imply types or intents (success, error colours), an action or close button, swipe or tap to dismiss, or a surface colour per mode. Never hard-code icon colours.
