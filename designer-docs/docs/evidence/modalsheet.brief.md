# Modal Sheet brief

slug: modalsheet · label: Modal Sheet · public API: ModalSheet (+ ScreenFrame from the kit; AppBar, JioDot, IconButton, Text, VStack, HelloJioInput, Button for composition)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=9559-28121 · storybook: docsUrl('modalsheet') · stories: Default=components-modalsheet--default
checked: 10 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-636f3f5, Biscuit's main 636f3f5)
icon: a phone outline with a tall sheet covering most of it — `<><rect x="4" y="1.5" width="10" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M4 7c0-1.1.9-2 2-2h6a2 2 0 0 1 2 2" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M7 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>`
keywords: page sheet, modal, sheet, overlay page, HelloJio sheet

Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`; `const LOW = { 'Color Mode': 'Light', Emphasis: 'Low' } as Modes`. Every ModalSheet gets `modes={LIGHT}` (it passes them to its slot children); other Coin instances outside the sheet get `modes={LIGHT}`. On the web `topInset` defaults to 0; pass it only where stated.
“Chat(close, fill)” = the sheet’s children: `<AppBar type="SubPage" leadingSlot={<JioDot />} actionsSlot={<IconButton iconName="ic_close" accessibilityLabel="Close" onPress={close} modes={LOW} />} />`, `<Text modes={LIGHT}>Ask about your spends, bills, or investments.</Text>`, then, when `fill`, a spacer `<VStack modes={LIGHT} style={{ flex: 1 }} />`, then `<HelloJioInput value={q} onChangeText={setQ} onSubmit={…} />` (its own state; default placeholder “Ask me anything”). Static examples can pass `onSubmit={noop}`.
“Frame” = the kit’s `<ScreenFrame footer={<ModalSheet …>Chat</ModalSheet>}>{screen}</ScreenFrame>`: the 320 px frame is the sheet’s positioned parent. Screen = `<Text modes={LIGHT}>Home</Text>` and `<Button label="Ask HelloJio" onPress={open} modes={LIGHT} />`. A presented sheet is `<ModalSheet visible={shown} fillHeight={fill} showOverlay={scrim} onOverlayPress={hide} onRequestClose={hide} …>`; static examples start shown and keep their own `shown` state so they can be closed and reopened. “dimmed” means `showOverlay`.
In-flow sheets (Anatomy, Sizing) omit `visible` and pass `fillHeight={false}`; selectors: sheet `MS = byTestId(id)`; slot `${MS} > div`; app bar `${MS} > div > [role="heading"]`; close `${MS} [aria-label="Close"]`; field `${MS} input`.

## Overview
summary: Use a Modal Sheet for a task that slides up over the page, such as asking HelloJio, and goes away when it’s done.
principle: A page over the page, with a clear way to close it.
playground: `.preview-stage` › Frame with Chat(close, fill) and the controls below; the sheet starts shown. Controls: OnOff "Shown" (on) → `visible`; Segment "Height" `Fill | Fit content` (default Fill) → `fillHeight`; OnOff "Scrim" (on) → `showOverlay`. Closing by X, scrim, or drag turns Shown off. Readout title "Sheet", value "Shown" or "Hidden"; note: "Close it with the X, a tap on the dimmed screen, or a drag down. Each one asks the screen to hide it." Stage label: "Live Coin Modal Sheet".

## Anatomy
header: Anatomy · title: A white sheet with one slot · description: The sheet is a rounded white surface with one slot. It has no title or close button of its own: put an App Bar with a close button at the top and the main field at the bottom.
specimen: `<Anatomy specimenWidth={360} …>` › `<ModalSheet testID="ms-anatomy" fillHeight={false} modes={LIGHT}>` Chat(noop, no fill) `</ModalSheet>`.
parts:
1. Sheet — White, with 20 px corners and no handle. — target: MS — side: left
2. Slot — One column of your content; it gets the sheet’s modes. — target: slot — side: right
3. App bar — Yours: the top of the slot, holding the close button. — target: app bar — side: top
4. Close button — Yours: a named IconButton that hides the sheet. — target: close — side: right
5. Field — Yours: the main input or action, at the bottom. — target: field — side: bottom

## Configuration
header: Configuration · title: Height, scrim, and top inset · description: A sheet fills the screen by default; fit it to short content instead. A scrim dims the page around a fitted sheet, and a top inset lets the page peek above it.
Grid `coin-new-example-grid`, each an ExampleCard › Frame:
- Fills the screen — Chat(close, fill), `fillHeight` — lesson: The default: the sheet covers the screen and the field sits at its foot.
- Fits its content — Chat(close, no fill), `fillHeight={false}`, dimmed — lesson: The sheet hugs its content and docks to the bottom.
- Without a scrim — Chat(close, no fill), `fillHeight={false}`, no scrim — lesson: The page stays bright; the white sheet’s edge is harder to see.
- Top inset — Chat(close, fill), `topInset={40}`, dimmed — lesson: The page peeks 40 px above, but on the web the sheet’s bottom is cut off by the same 40 px.

## States
header: States · title: Shown or hidden · description: The screen shows and hides the sheet: it springs up from the bottom and slides back down. A hidden sheet stays on the page below the screen, and Tab can still reach its controls.
Grid `coin-new-example-grid`, each an ExampleCard › Frame:
- Shown — Chat(close, no fill), `fillHeight={false}`, dimmed, `visible` — lesson: Over a dimmed page, docked to the bottom.
- Hidden — the same with `visible={false}` and no scrim — lesson: Below the screen; only the page shows.

## Sizing
header: Sizing · title: Full width, filling or fitting the screen · description: The sheet spans its screen with 12 px of padding at the top, 8 px at the sides, and 32 px at the bottom. It fills the screen’s height unless it fits its content. Its 12 px gap token isn’t applied, so space your content yourself.
Measured diagram: `<Anatomy legend={false} specimenWidth={360} marks={[{ kind: 'size', target: MS, side: 'right', label: 'both' }, { kind: 'padding', target: MS }]}>` › `<ModalSheet testID="ms-size" fillHeight={false} modes={LIGHT}>` Chat(noop, no fill). Expected width 360; report the measured height.

## Content
header: Content · title: A title, a way out, and one task · description: Start the slot with an App Bar that holds a named close button, keep one task in the middle, and put the main field or action at the bottom. Keep it to one task; a new flow deserves its own screen.
One ExampleCard "One task, with a way out" › Frame › Chat(close, fill), shown.

## In context
header: In context · title: Asking HelloJio from Home · description: Ask HelloJio opens the sheet over Home. Sending a question or pressing the X closes it; the screen keeps what was asked.
Composition in `.coin-new-context`: Frame (starts hidden) with the Screen above; the sheet is Chat(close, fill) whose HelloJioInput `onSubmit` sets the status to “Asked: <text>” (or “Asked nothing” for an empty send) and hides the sheet; the X sets “Closed without asking” and hides it. Below the frame, `<p className="coin-new-readout" role="status">`, starting “On Home”.

## Do & Don'ts
header: Do & Don’ts · title: Always a visible way out · description: Each pair shows a sheet people can leave and read versus one that traps or wastes their attention.
Every preview is a Frame with the sheet shown.
- Do Add a named close button: The X closes the sheet for everyone, including keyboard users. — Chat(close, no fill), `fillHeight={false}`, dimmed | Don't Rely on dragging: Without an X, only a drag or a tap on the scrim closes it. — the same without `actionsSlot`
- Do Fit short content: A one-line sheet docks to the bottom. — `fillHeight={false}`, dimmed, children only the AppBar and the Text | Don't Fill the screen for one line: The sheet covers the page and leaves it empty. — the same with `fillHeight`

## Sources
header: Sources · title: Use the public Modal Sheet contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (5 October build) from the team’s private package repository. Figma’s Modal Sheet is one 360 × 728 white surface with one slot. In the package it renders in place until it’s given <code>visible</code>; then it slides over its screen with an optional scrim and can be dragged down. Its 12 px gap isn’t applied, and a top inset pushes the sheet down without shrinking it, so its bottom is cut off. On the web it isn’t announced as a dialog, focus isn’t moved or kept in it, Escape does nothing, and a hidden sheet’s controls stay in the Tab order. The Page type JioPlus turns it light grey (not shown). The published Storybook still shows the old page, and on this site the spring is simplified.

## Limits
Do not show Dark mode, Page type JioPlus, `presentationProgress` or the page-stack helpers, `enableDismissGesture={false}`, `style`, or `topInset` outside its Configuration example. Do not imply a title, handle, or close button of its own, focus trapping, Escape, or that the scrim calls `onRequestClose`.
