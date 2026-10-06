# Content Sheet brief

slug: contentsheet · label: Content Sheet · public API: ContentSheet (+ ScreenFrame from the kit; Overlay, ListGroup, ListItem, MoneyValue, Text, Button for composition)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4451-1760 · storybook: docsUrl('contentsheet') · stories: Default=components-contentsheet--default, With title=components-contentsheet--with-title, Rich content=components-contentsheet--rich-content, Bottom pop-up=components-contentsheet--bottom-pop-up
checked: 6 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-3795b4c, Biscuit's main 3795b4c)
icon: a phone outline with a panel rising from its bottom — `<rect x="4" y="1.5" width="10" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M4 10.5c0-1.1.9-2 2-2h6a2 2 0 0 1 2 2" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M7 12.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />`
keywords: bottom sheet, bottom pop-up, action sheet, panel

Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`; `const SHEET = { 'Color Mode': 'Light', 'List Item Style': 'Boxed' } as Modes`. Every ContentSheet gets `modes={SHEET}`; give ListGroup, every ListItem, and every MoneyValue `modes={SHEET}` too. Other Coin instances get `modes={LIGHT}`.
Rows: TX = Netflix “25 March · 17:30” ₹500; Spotify “24 March · 09:12” ₹119; Amazon “22 March · 21:04” ₹1,299, each `<ListItem layout="Horizontal" title=… supportText=… trailing={<MoneyValue value="500" currency="₹" />} onPress={() => {}} />` inside one `<ListGroup>`. PAY = UPI “Jio Payments Bank •• 4821”; Debit card “•• 9012”; Net banking “Any bank”, same ListItem shape without `trailing`.
“Frame” = the kit’s `<ScreenFrame footer={<>{scrim && <Overlay modes={LIGHT} onPress={…} />}<ContentSheet …>…</ContentSheet></>}>{screen}</ScreenFrame>`: the frame is the sheet’s positioned parent, so the sheet docks to its bottom. “Screen” content is `<Text modes={LIGHT}>March spends</Text>` unless stated. The sheet is white like the frame, so use the scrim (`Overlay`) wherever the brief says “dimmed”.
The diagrams draw the sheet on its own with `pinToBottom={false}` (normal flow), so it needs no frame. The sheet springs up on mount (about 0.5 s here); check the survey after it settles.

## Overview
summary: Use a Content Sheet to show a short panel from the bottom of the screen, such as a month’s transactions or a payment choice.
principle: It grows to fit its content; the screen decides when it shows.
playground: `.preview-stage` › Frame. Screen: `<Button label="Show transactions" onPress={show} modes={LIGHT} />`. Footer: when Scrim is on and the sheet is shown, `<Overlay modes={LIGHT} onPress={hide} />`; then `<ContentSheet visible={shown} title={title ? 'March 2025' : undefined}>` with the first 1–3 TX rows. Controls: OnOff "Shown" (on) → `visible`; OnOff "Title" (on) → `title`; Segment "Rows" ['1', '2', '3'] (default '3'); OnOff "Scrim" (on). Readout title "Sheet", value "Shown" or "Hidden"; note: "Tap the dimmed screen to hide it. The screen shows and hides the sheet; it has no close control of its own." Stage label: "Live Coin Content Sheet".

## Anatomy
header: Anatomy · title: One slot under an optional title · description: A white sheet with 20 px top corners holds one slot of content and an optional centred title. In a screen it docks to the bottom and spans the full width.
specimen: `<Anatomy specimenWidth={360} …>` › `<ContentSheet testID="cs-anatomy" pinToBottom={false} title="March 2025">` › ListGroup with the first 2 TX rows.
parts (CS = `byTestId('cs-anatomy')`):
1. Title — Optional and centred; it scrolls with the content. — target: `${CS} [dir="auto"]` — side: top
2. Slot — Any content; the sheet grows to fit it. — target: `${CS} [role="list"]` — side: right
3. Sheet — White, with 20 px top corners and no handle. — target: `CS` — side: left
No marks (a padding band would hide the rounded corners; Sizing shows the padding).

## Configuration
header: Configuration · title: A title and one slot · description: Add a title when the content needs a name. The slot takes any content, and the sheet’s height follows it.
Grid `coin-new-example-grid`, each an ExampleCard holding a dimmed Frame:
- With a title — sheet `title="March 2025"`, TX rows 1–2 — lesson: The title names what the sheet holds.
- Without a title — TX rows 1–2 — lesson: The slot starts right under the top padding.

## States
header: States · title: Shown or hidden · description: The screen shows and hides the sheet: it springs up from the bottom and back down. A hidden sheet stays on the page, so Tab can still reach its content.
Grid `coin-new-example-grid`, each an ExampleCard:
- Shown — dimmed Frame, `title="March 2025"`, TX rows 1–2 — lesson: Over a dimmed screen, docked to the bottom.
- Hidden — Frame without a scrim, sheet `visible={false}`, TX rows 1–2 — lesson: Below the screen; only the screen shows.

## Sizing
header: Sizing · title: Full width, as tall as its content · description: The sheet spans its screen and adds 12 px above and 41 px below the content. It never sets a height: it grows with the content up to 70% of the screen, then scrolls.
Measured diagram: `<Anatomy legend={false} specimenWidth={360} marks={[{ kind: 'size', target: byTestId('cs-size'), side: 'right', label: 'both' }, { kind: 'padding', target: byTestId('cs-size') }]}>` › `<ContentSheet testID="cs-size" pinToBottom={false} title="March 2025">` › ListGroup with all 3 TX rows. Expected width 360; report the measured height.

## Content
header: Content · title: Name it, and keep it to one task · description: Title the sheet with what it holds, such as a month or a choice, in a few words. Keep the content short enough to read without scrolling; longer content deserves its own screen.
One ExampleCard "One task, named" › dimmed Frame (screen: `<Text modes={LIGHT}>Pay ₹500 to Asha Stores</Text>`), sheet `title="Pay with"`, ListGroup of PAY rows.

## In context
header: In context · title: Choosing how to pay · description: The payment screen opens the sheet from Change payment method. Choosing an option, or tapping the dimmed screen, closes it; the screen keeps the choice.
Composition in `.coin-new-context`: Frame (starts shown). Screen: `<Text modes={LIGHT}>Pay ₹500 to Asha Stores</Text>`, `<Button label="Change payment method" onPress={open} modes={LIGHT} />`. Footer: when shown, `<Overlay modes={LIGHT} onPress={close} />`; `<ContentSheet visible={shown} title="Pay with">` › ListGroup of PAY rows, each `onPress` sets the method and closes. Below the frame, `<p className="coin-new-readout" role="status">`: “Paying with UPI” (initially), then the chosen method.

## Do & Don'ts
header: Do & Don’ts · title: Make the sheet stand out and fit · description: Each pair shows a sheet people can read at a glance versus one that blends in or wastes space.
Every preview is a Frame with TX rows 1–2 unless stated.
- Do Dim the screen behind it: The white sheet stands out from the page. — dimmed, `title="March 2025"` | Don't Leave it on a white screen: Without a scrim, the sheet’s edge disappears. — no scrim, `title="March 2025"`
- Do Let it fit the content: One row makes a short sheet. — dimmed, `title="March 2025"`, TX row 1 only | Don't Set a fixed height: Empty space fills the sheet under one row. — dimmed, `title="March 2025"`, TX row 1 only, `style={{ height: 280 }}`
- Do Name the choice: “Pay with” says what the options are for. — dimmed, `title="Pay with"`, PAY rows | Don't Leave options untitled: People can’t tell what they’re choosing. — dimmed, no title, PAY rows

## Sources
header: Sources · title: Use the public Content Sheet contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> from the team’s private package repository. Figma’s Content Sheet is one 360 × 350 component with a fixed header and a slot. In the package the title scrolls with the content, and the 8 px gap between the title and the slot is missing. The sheet has no role, scrim, or close control of its own, and a hidden sheet can still be reached with Tab. Its 70% height limit is measured against the browser window, and on this site its spring overshoots slightly because the site uses a simplified animation library.

## Limits
Do not show Dark mode, Page type modes, `maxHeightPercent`, `safeAreaBottom`, keyboard handling, or a sheet tall enough to scroll. Use `pinToBottom={false}` only in the two diagrams. Do not imply the sheet closes itself, traps focus, or has a handle or gestures.
