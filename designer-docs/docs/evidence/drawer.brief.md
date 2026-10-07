# Drawer brief

slug: drawer · label: Drawer · public API: Drawer (+ ScreenFrame from the kit; ListGroup, ListItem, MoneyValue, Text, Button for composition)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2847-3454 · storybook: docsUrl('drawer') · stories: Interactive=components-drawer--interactive-drawer, With overlay=components-drawer--with-overlay, With carousel=components-drawer--drawer-with-carousel, Programmatic control=components-drawer--programmatic-control
checked: 6 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-3795b4c, Biscuit's main 3795b4c)
icon: a phone outline with a sheet and a short handle near its middle — `<rect x="4" y="1.5" width="10" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M4 8.5h10" stroke="currentColor" strokeWidth="1.5" /><path d="M7.5 10.5h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />`
keywords: bottom drawer, bottom sheet, draggable sheet, handle

Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`; `const ROWS = { 'Color Mode': 'Light', 'List Item Style': 'Boxed' } as Modes`. Drawer does not pass modes to its children: give the Drawer `modes={LIGHT}` and ListGroup, every ListItem, and every MoneyValue `modes={ROWS}`.
Rows: TX = Netflix “25 March · 17:30” ₹500; Spotify “24 March · 09:12” ₹119; Amazon “22 March · 21:04” ₹1,299; Swiggy “21 March · 20:41” ₹386; Uber “20 March · 08:15” ₹212; BigBasket “18 March · 11:02” ₹1,054. Each `<ListItem layout="Horizontal" title=… supportText=… trailing={<MoneyValue value=… currency="₹" />} onPress={() => {}} />` inside one `<ListGroup>`.

The Drawer places itself by the browser window’s height, not its parent’s, so a plain Drawer would sit below the kit frame. Fit every Drawer to the kit `ScreenFrame` (inner height 318 px) through its public props, with a hook in the guide file:
```ts
import { useWindowDimensions } from 'react-native'
const FRAME = 318
function useFit(peek: number) {
  const { height: w } = useWindowDimensions()
  const top = Math.max(48, Math.ceil(w * 0.05))
  return { collapsedHeight: w - FRAME + peek, expandedRatio: 1 - top / w, sheetStyle: { height: FRAME - top } }
}
```
“Frame” = `<ScreenFrame footer={<Drawer modes={LIGHT} title=… {...useFit(peek)} …>{ListGroup}</Drawer>}>{screen}</ScreenFrame>`. Default peek 140. Screen content is `<Text modes={LIGHT}>Home</Text>` unless stated. A controlled `state` is not applied at mount: always pass `initialState` with the same value too, and mirror `onStateChange` into state.
Selectors: sheet `[role="dialog"]`; handle `[role="dialog"] div[style*="width: 42px"]`; title `[role="dialog"] [dir="auto"]` (the first match is the title); content `[role="dialog"] [role="list"]`.

## Overview
summary: Use a Drawer for a panel that peeks from the bottom of a screen and drags up to show more, such as recent transactions.
principle: Always there: a peek, or pulled up to read more.
playground: `.preview-stage` › Frame with `title="Recent transactions"` and all 6 TX rows, controlled (`state` + `initialState` + `onStateChange`). Controls: Segment "State" ['Collapsed', 'Expanded'] → `state` (dragging also changes it); Segment "Peek" ['100', '140', '200'] (default '140') → `useFit(peek)`; OnOff "Scrim" → `showOverlay` with `onOverlayPress` collapsing it. Readout title "State", value "Collapsed" or "Expanded"; note: "Drag the handle or the list to resize it. A Drawer never closes; its smallest size is the peek." Stage label: "Live Coin Drawer".

## Anatomy
header: Anatomy · title: A handle, a title, and scrolling content · description: The grey sheet carries a drag handle and an optional title that stay put while the content scrolls. Collapsed, only its top peeks above the screen’s bottom edge.
specimen: `<Anatomy specimenWidth={360} …>` › Frame with `initialState="expanded"`, `title="Recent transactions"`, TX rows 1–4.
parts:
1. Handle — Drag it, or the content, to resize; tapping does nothing. — target: `[role="dialog"] div[style*="width: 42px"]` — side: top
2. Title — Optional; stays in place while the content scrolls. — target: `[role="dialog"] [dir="auto"]` — side: right
3. Content — Scrolls inside the sheet; give each item its own modes. — target: `[role="dialog"] [role="list"]` — side: left
4. Sheet — Grey, with 12 px top corners and a soft shadow. — target: `[role="dialog"]` — side: bottom, at 0.8

## Configuration
header: Configuration · title: Peek, title, and scrim · description: Set how much of the drawer peeks when collapsed, so the title and the first item show. A scrim dims the screen while the drawer covers it.
Grid `coin-new-example-grid`, each an ExampleCard holding a Frame with `title="Recent transactions"` and all 6 TX rows:
- Peek 140 — collapsed, peek 140 — lesson: The title and the first transaction show.
- Peek 200 — collapsed, peek 200 — lesson: A taller peek shows two transactions.
- Without a title — collapsed, peek 140, no `title` — lesson: The content starts under the handle.
- With a scrim — expanded, `showOverlay` — lesson: The screen dims behind the drawer and taps on it don’t get through.

## States
header: States · title: Collapsed or expanded · description: A Drawer has two sizes and moves between them with a spring when dragged. It never closes: collapsed is its smallest size.
Grid `coin-new-example-grid`, each an ExampleCard:
- Collapsed — Frame, peek 140, `initialState="collapsed"` — lesson: The peek shows what’s inside and invites a drag.
- Expanded — Frame, `initialState="expanded"` — lesson: The sheet rises to near the top; the list scrolls inside it.

## Sizing
header: Sizing · title: Full width, sized by the screen · description: The drawer spans the screen. Collapsed, it shows 200 px by default; expanded, it is 90% of the screen’s height, and never more than 95%. Here each drawer is fitted to its frame.
Measured diagram: `<Anatomy legend={false} specimenWidth={360} marks={[{ kind: 'size', target: '[role="dialog"] div[style*="width: 42px"]', side: 'bottom', label: 'both' }, { kind: 'gap', from: '[role="dialog"] [dir="auto"]', to: '[role="dialog"] [role="list"]' }]}>` › Frame with `initialState="expanded"`, `title="Recent transactions"`, TX rows 1–3. Expected 42 × 6 and 16.

## Content
header: Content · title: Name it, and lead with what matters · description: Title the drawer with what it holds. Collapsed, people see only the title and the first item or two, so put the most useful item first.
One ExampleCard "The peek shows the first item" › Frame, collapsed, peek 140, `title="Recent transactions"`, all 6 TX rows.

## In context
header: In context · title: Recent transactions on a home screen · description: The drawer peeks under the home screen. It can only be resized by dragging, so the screen adds a button that opens it for keyboard and screen-reader users.
Composition in `.coin-new-context`: Frame, controlled, starts collapsed, `title="Recent transactions"`, all 6 TX rows. Screen: `<Text modes={LIGHT}>Home</Text>`, then the button centred in `<VStack modes={LIGHT} alignHorizontal="center">`: `<Button label="See all transactions" onPress={() => setState('expanded')} modes={LIGHT} />` (review on #67, 7 October: the left-aligned button looked unfinished). Below the frame, `<p className="coin-new-readout" role="status">`: “Drawer collapsed” or “Drawer expanded”.

## Do & Don'ts
header: Do & Don’ts · title: Show enough, and offer another way in · description: Each pair shows a drawer people understand and can open versus one that hides its content or its controls.
Every preview is a Frame, collapsed, with `title="Recent transactions"` and all 6 TX rows unless stated.
- Do Peek enough to read: The title and the first item say what’s inside. — peek 140 | Don't Peek only the handle: People can’t tell what the drawer holds. — peek 24
- Do Add a button that opens it: Keyboard and screen-reader users can reach the content. — screen: same as In context (Home, centred `<Button label="See all transactions" onPress={…} modes={LIGHT} />`) that expands it | Don't Rely on dragging alone: Without a button, only a drag opens it. — screen: Text “Home” only

## Sources
header: Sources · title: Use the public Drawer contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> from the team’s private package repository. Figma’s Drawer is one 360 × 722 component with a fixed header and a scrolling content slot. The package places the drawer by the window’s height, so on this page each drawer is fitted to its frame through its peek and expanded height. It can be dragged with a mouse or a finger, but it has no keyboard control, no accessible name, and no way to close. Its content starts 8 px higher than in Figma. On this site drags spring slightly differently from Storybook because the site uses a simplified animation library.

## Limits
Do not show Dark mode, Page type modes, the `header` slot, the ref API, `bottomInset`, or a Drawer outside a fitted Frame. Do not imply it closes, responds to Escape or the keyboard, has an accessible name, or passes modes to its content.
