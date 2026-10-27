# Modal Sheet brief

slug: modalsheet · label: Modal Sheet · public API: ModalSheet (+ ScreenFrame from the kit; AppBar, JioDot, IconButton, Text, VStack, HelloJioInput, Button for composition)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=9559-28121 · storybook: docsUrl('modalsheet') · stories: Default=components-modalsheet--default
checked: 13 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-c1fa197, Biscuit's main c1fa197)
icon: a phone outline with a tall sheet covering most of it — `<><rect x="4" y="1.5" width="10" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M4 7c0-1.1.9-2 2-2h6a2 2 0 0 1 2 2" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M7 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>`
keywords: page sheet, modal, sheet, overlay page, HelloJio sheet

Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`; `type PageType = 'MainPage' | 'SubPage' | 'JioPlus'`. Every ModalSheet gets `modes={{ ...LIGHT, 'Page type': pageType } as Modes}` (pageType defaults to `'MainPage'`); the sheet passes its modes to its slot children. Coin instances outside the sheet get `modes={LIGHT}`. On the web `topInset` defaults to 0; pass it only where stated.
“Chat(close, fill)” = the slot content as elements, not a component of its own: a `useChat({ close, fill, onSubmit?, closeButton?, field? })` hook that returns a fragment, so the sheet sees each child as in the Storybook story (the sheet only gives modes to, and repaints, children it can see; a wrapper component hides them). The children set no modes of their own, so the sheet's apply: `<AppBar type="SubPage" leadingSlot={<JioDot />} actionsSlot={<IconButton iconName="ic_close" accessibilityLabel="Close" onPress={close} modes={{ ...LIGHT, Emphasis: 'Low' } as Modes} />} />`, `<Text>Ask about your spends, bills, or investments.</Text>`, then, when `fill`, a spacer `<VStack style={{ flex: 1 }} />`, then `<HelloJioInput value={q} onChangeText={setQ} onSubmit={…} />` (its own state; default placeholder “Ask me anything”). Never give the children their own Page type: JioPlus must show as it ships. Static examples can pass `onSubmit={noop}`.
“Frame” = `const progress = usePresentationProgress()` (kit) and the kit’s `<ScreenFrame receded={progress} footer={<ModalSheet … presentationProgress={progress}>Chat</ModalSheet>}>{screen}</ScreenFrame>`: the 320 px frame is the sheet’s positioned parent; `receded` gives it Storybook’s black stage and steps the page back with the sheet through the package’s page-stack hook (every presented sheet, including the playground and In context, has its own progress). Screen = `<Text modes={LIGHT}>Home</Text>` and `<Button label="Ask HelloJio" onPress={open} modes={LIGHT} />`. A presented sheet is `<ModalSheet visible={shown} fillHeight={fill} showOverlay={scrim} enableDismissGesture={drag} onOverlayPress={hide} onRequestClose={hide} modes={…pageType…}>` (drag defaults to true); static examples start shown and keep their own `shown` state so they can be closed and reopened. “dimmed” means `showOverlay`.
In-flow sheets (Anatomy, Sizing) omit `visible` and pass `fillHeight={false}`; selectors: sheet `MS = byTestId(id)`; slot `${MS} > div`; app bar `${MS} > div > [role="heading"]`; close `${MS} [aria-label="Close"]`; field `${MS} input`.

## Overview
summary: Use a Modal Sheet for a task that slides up over the page, such as asking HelloJio, and goes away when it’s done.
principle: A page over the page, with a clear way to close it.
playground: `.preview-stage` › Frame with Chat(close, fill) and the controls below; the sheet starts shown. Controls, in order: OnOff "Shown" (on) → `visible`; Segment "Height" `Fill | Fit content` (default Fill) → `fillHeight`; OnOff "Scrim" (on) → `showOverlay`; Segment "Page type" `MainPage | SubPage | JioPlus` (default MainPage) → the sheet’s `'Page type'` mode; OnOff "Drag to close" (on) → `enableDismissGesture`. Closing by X, scrim, or drag turns Shown off. Readout title "Sheet", value "Shown" or "Hidden"; note, with Drag to close on: "Close it with the X, a tap on the dimmed screen, or a drag down. Each one asks the screen to hide it."; with it off: "A drag down does nothing now. Close it with the X or a tap on the dimmed screen." Stage label: "Live Coin Modal Sheet".

## Anatomy
header: Anatomy · title: A white sheet with one slot · description: The sheet is a rounded white surface with one slot. It has no title or close button of its own: put an App Bar with a close button at the top and the main field at the bottom.
specimen: `<Anatomy specimenWidth={360} …>` › `<ModalSheet testID="ms-anatomy" fillHeight={false} modes={LIGHT}>` Chat(noop, no fill) `</ModalSheet>`.
parts:
1. Sheet — White, with 20 px corners and no handle. — target: MS — side: left
2. Slot — One column of your content; it gets the sheet’s modes, without Page type. — target: slot — side: right
3. App bar — Yours: the top of the slot, holding the close button. — target: app bar — side: top
4. Close button — Yours: a named IconButton that hides the sheet. — target: close — side: right
5. Field — Yours: the main input or action, at the bottom. — target: field — side: bottom

## Configuration
header: Configuration · title: Height, scrim, top inset, and page type · description: A sheet fills the screen by default; fit it to short content instead. A scrim dims the page around a fitted sheet, and a top inset lets the page peek above it. Page type sets the sheet’s colour.
Grid `coin-new-example-grid`, each an ExampleCard › Frame:
- Fills the screen — Chat(close, fill), `fillHeight` — lesson: The default: the sheet covers the screen and the field sits at its foot.
- Fits its content — Chat(close, no fill), `fillHeight={false}`, dimmed — lesson: The sheet hugs its content and docks to the bottom.
- Without a scrim — Chat(close, no fill), `fillHeight={false}`, no scrim — lesson: The page stays bright behind the sheet, as in the Storybook story.
- Top inset — Chat(close, fill), `topInset={40}`, dimmed — lesson: The page peeks 40 px above, and the sheet shortens to keep its bottom on the screen.
- Main or sub page — Chat(close, no fill), `fillHeight={false}`, dimmed, Page type SubPage — lesson: MainPage, the default used everywhere else here, and SubPage both give a white sheet.
- JioPlus — Chat(close, no fill), `fillHeight={false}`, dimmed, Page type JioPlus — lesson: A light grey sheet. Its text stays dark, and the HelloJio field turns white to stand out.

## States
header: States · title: Shown, hidden, and how it closes · description: The screen shows and hides the sheet: it slides up from the bottom and settles without a bounce, then slides back down. A drag down asks to close it, unless drag to close is turned off. A hidden sheet waits below the screen, out of the Tab order and hidden from screen readers.
Grid `coin-new-example-grid`, each an ExampleCard › Frame:
- Shown — Chat(close, no fill), `fillHeight={false}`, dimmed, `visible` — lesson: Over a dimmed page, docked to the bottom.
- Hidden — the same with `visible={false}` and no scrim — lesson: Below the screen; only the page shows.
- Drag to close off — Chat(close, no fill), `fillHeight={false}`, dimmed, `enableDismissGesture={false}` — lesson: A drag down does nothing; the X and the scrim still close it, so a stray drag can’t lose a half-typed question.

## Sizing
header: Sizing · title: Full width, filling or fitting the screen · description: The sheet spans its screen with 12 px of padding at the top, 8 px at the sides, and 32 px at the bottom, and puts 12 px between the items in its slot. It fills the screen’s height unless it fits its content.
Measured diagram: `<Anatomy legend={false} specimenWidth={360} marks={[{ kind: 'size', target: MS, side: 'right', label: 'both' }, { kind: 'padding', target: MS }]}>` › `<ModalSheet testID="ms-size" fillHeight={false} modes={LIGHT}>` Chat(noop, no fill). Expected width 360; report the measured height.

## Content
header: Content · title: A title, a way out, and one task · description: Start the slot with an App Bar that holds a named close button, keep one task in the middle, and put the main field or action at the bottom. Keep it to one task; a new flow deserves its own screen.
One ExampleCard "One task, with a way out" › Frame › Chat(close, fill), shown.

## In context
header: In context · title: Asking HelloJio from Home · description: Ask HelloJio opens the sheet over Home, and Home steps back behind it. Sending a question or pressing the X closes it; the screen keeps what was asked.
Composition in `.coin-new-context`: Frame (starts hidden) with the Screen above; the sheet is Chat(close, fill) whose HelloJioInput `onSubmit` sets the status to “Asked: <text>” (or “Asked nothing” for an empty send) and hides the sheet; the X sets “Closed without asking” and hides it. Below the frame, `<p className="coin-new-readout" role="status">`, starting “On Home”.

## Do & Don'ts
header: Do & Don’ts · title: Always a visible way out · description: Each pair shows a sheet people can leave and read versus one that traps or wastes their attention.
Every preview is a Frame with the sheet shown.
- Do Add a named close button: The X closes the sheet for everyone, including keyboard users. — Chat(close, no fill), `fillHeight={false}`, dimmed | Don't Rely on dragging: Without an X, people must drag, tap the scrim, or know to press Escape. — the same without `actionsSlot`
- Do Fit short content: A one-line sheet docks to the bottom. — `fillHeight={false}`, dimmed, children only the AppBar and the Text | Don't Fill the screen for one line: The sheet covers the page and leaves it empty. — the same with `fillHeight`

## Sources
header: Sources · title: Use the public Modal Sheet contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> (12 October build) from the team’s private package repository. Figma’s Modal Sheet is one 360 × 728 white surface with one slot. In the package it renders in place until it’s given <code>visible</code>; then it slides over its screen with an optional scrim and can be dragged down. It puts its 12 px gap between the slot’s items, and a top inset shortens the sheet so its bottom stays on the screen. On the web it’s a dialog and a hidden sheet leaves the Tab order, but focus isn’t moved into it, kept in it, or returned, and Escape doesn’t close it from a text field (#234). Page type JioPlus turns it light grey and stays off its slot, except the App Bar: text stays dark, and the HelloJio Input turns white to show on the grey. Turning the drag off leaves the X and the scrim. The examples host the sheet as the Storybook story does: on a black screen whose page steps back with the sheet, through the package’s page-stack hook (the screen’s job, not the sheet’s). The screen’s corners are rounder than the sheet’s, like a phone’s. The published Docs page is still the old generated one. The slide runs the package’s own spring settings, as in Storybook.

## Limits
Do not show `presentationProgress` or the page-stack hook as designer settings (the kit wires them, as Storybook does), `style`, or `topInset` outside its Configuration example. Show Page type JioPlus as it ships (dark text and a white HelloJio pill since the 12 October build); never restyle or re-mode the slot content to hide #255. Page type and drag to close appear only where this brief puts them. Do not imply a title, handle, or close button of its own, focus trapping, Escape, or that the scrim calls `onRequestClose`.

## dbe0e02 publish (28 October 2026): copy changes

These replace the matching lines above; the guide file has the exact strings. Evidence: `docs/evidence/modalsheet.md`.

- checked: 28 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-dbe0e02).
- Frame and the playground keep a `reopened` flag: `trapFocus={reopened}`, set true by the screen's open button. The anatomy and sizing sheets take `trapFocus={false}`. In context keeps the default.
- Sources: “… On the web it’s a dialog named by its App Bar title, and a hidden sheet leaves the Tab order. When the screen shows it, focus moves to its first control (the X here) and Tab stays inside; Escape, even from the text field, the X, or the scrim closes it and returns focus to what opened it. trapFocus={false} turns that off for a sheet shown inside a page, as these examples are until you open them again; In context keeps it. …”
