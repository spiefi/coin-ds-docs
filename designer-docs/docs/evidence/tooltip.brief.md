# Tooltip brief

slug: tooltip · label: Tooltip · public API: Tooltip, TooltipTrigger, TooltipContent, TooltipPlacement (+ IconButton, Button, HStack, VStack, Text, Title for composition; ScreenFrame from the kit for In context)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=928-6036 · storybook: docsUrl('tooltip') · stories: Default=components-tooltip--default, Long text=components-tooltip--long-text, Slot=components-tooltip--slot, Edge detection=components-tooltip--edge-detection
checked: 19 October 2026 · jfs-components 0.1.78 (mirror v0.1.78-c7d3348, Biscuit's main c7d3348; Tooltip.tsx as rewritten in 7020bf9, which fixes #277)
icon: a speech bubble with a small tail — `<><rect x="2" y="3" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M7 12l2 2.5 2-2.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" /></>`
keywords: hint, info bubble, help text, popover

Important: the bubble is a React Native Modal on iOS and Android and a full-window layer on the web. It opens over the whole window next to its trigger, and while it's open a clear layer covers the page until the next press. Every example is a closed trigger: never use `defaultOpen`, and never render a tooltip open at start.
Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`; `const INFO = { ...LIGHT, Emphasis: 'Low', 'Button / Size': 'S' } as Modes`. Every Tooltip gets `modes={LIGHT}`.
“Info(label, text, props)” = `<Tooltip modes={LIGHT} {...props}><TooltipTrigger asChild><IconButton iconName="ic_info" accessibilityLabel={label} modes={INFO} /></TooltipTrigger><TooltipContent width={width}>{text}</TooltipContent></Tooltip>` (props: placement, open, onOpenChange; `width` goes to TooltipContent only). Always `asChild` and a plain string as content, for consistency (since #277 a nested Coin button and Coin Text both work too).
`const ROW = { ...LIGHT, Padding: 'None' } as Modes` (HStack's default padding made each row about 58 px tall and overflowed the screen).
“Term(term, label, text, props)” = `<HStack modes={ROW} alignVertical="center"><Text modes={LIGHT}>{term}</Text>Info(label, text, props)</HStack>`.
“Row(term, value, label, text)” = `<HStack modes={ROW} alignVertical="center" justifyHorizontal="space-between">Term(term, label, text)<Text modes={LIGHT}>{value}</Text></HStack>`.
Copy: EXPENSE = "The yearly fee the fund charges, as a share of your investment."; EXIT = "A fee if you sell within a year of investing."; NAV = "The price of one unit of the fund, updated every working day."; XIRR = "Your yearly return, counting when each payment went in. It lets you compare investments made at different times and over different periods."; WALL = "The yearly fee the fund charges, as a share of your investment. It covers fund management, admin, and distribution. It's taken from the fund's value every day, so you never pay it separately. Lower is better over long periods."

## Overview
summary: Use a Tooltip to explain a term or icon in a short line that opens from an info button and closes with the next press.
principle: One short explanation, on request.
playground: `.preview-stage` › Term("Expense ratio", "About expense ratio", text, { placement, onOpenChange: setOpen }); stage label "Live Coin Tooltip". Controls: Segment "Side" `Top | Bottom | Left | Right` (Top) and Segment "Align" `Centre | Start | End` (Centre) → `placement` = side in lower case plus `''`, `'-start'`, or `'-end'`; Segment "Text" `Short | Long` (Short) → EXPENSE or XIRR. Readout title "Tooltip", value "Open" or "Closed"; note: "Press the i to open it. The next press anywhere closes it, and nothing else on the page responds until then."

## Anatomy
header: Anatomy · title: A trigger, then a bubble over the page · description: Only the trigger sits in the page. Pressing it opens a near-black bubble 12 px away, with 8 px corners, 12 × 8 px of padding, white 14 px text that wraps at 280 px, and a 16 × 8 px arrow pointing at the trigger. React Native draws the bubble over the page, so this diagram can't frame it; press the trigger to see it.
specimen: `<Anatomy>` › Term("Expense ratio", "About expense ratio", EXPENSE)
parts:
1. Trigger — Yours: an info IconButton passed with asChild. Pressing it opens or closes the bubble. — target: `[role="button"]` — side: right
2. Term — The word it explains. Keep it visible: the bubble only adds detail. — target: `[dir="auto"]` (Coin Text renders `dir="auto"`; the first match is the term, before the button) — side: left

## Configuration
header: Configuration · title: Side and alignment · description: Placement picks the side, top by default, and can line the bubble up with the trigger's start or end edge instead of its centre. When the bubble doesn't fit on that side it flips to the opposite one, and beside the trigger with no room either way it moves above or below. It always stays 8 px inside the screen.
Grid `coin-new-example-grid`, each an ExampleCard › Term("Expense ratio", "About expense ratio", EXPENSE, { placement }):
- Above — default — lesson: The default: the bubble sits above, its arrow pointing down at the trigger.
- Below — `placement="bottom"` — lesson: For triggers near the top of the screen, where there's no room above.
- Start-aligned — `placement="top-start"` — lesson: The bubble's start edge lines up with the trigger's; the arrow still points at it.
- Beside — `placement="right"` — lesson: Next to the trigger, for a row with room to its side. On a phone there rarely is, so it opens above or below instead.

## States
header: States · title: Closed, open, and how it closes · description: A press on the trigger opens it; there's no hover, focus, or timer. While it's open a clear layer covers the page: the next press anywhere, or Android's back button, closes it. On the web Escape doesn't close it (#349). The screen can also open it itself with open and hear every close through onOpenChange.
Grid `coin-new-example-grid`:
- Opens on press — Term("Expense ratio", "About expense ratio", EXPENSE) — lesson: Press the i to open it; press anywhere to close it.
- Opened by the screen — a component with `const [open, setOpen] = useState(false)`: `<VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes} alignHorizontal="center">` holding Term("Exit load", "About exit load", EXIT, { open, onOpenChange: setOpen }) and `<Button label="Show hint" modes={{ ...LIGHT, Emphasis: 'Medium' } as Modes} onPress={() => setOpen(true)} />` — lesson: The screen decides when it shows, for example a first-time hint, and hears every close.

## Sizing
header: Sizing · title: Hugs short text, wraps at 280 px · description: The bubble is as wide as its text up to 280 px, then wraps; padding is 12 × 8 px and text 14 px on 18 px lines. A width on the content sets it instead, like Figma's Custom Width variant.
Grid `coin-new-example-grid three`:
- Short text — Term("Exit load", "About exit load", EXIT) — lesson: One line: the bubble hugs it.
- Long text — Term("XIRR", "About XIRR", XIRR) — lesson: Wraps at 280 px. Two or three lines is the most people will read.
- Custom width — Term("XIRR", "About XIRR", XIRR, { width: 200 }) — lesson: A set width of 200 px, Figma's Custom Width On: the same text wraps sooner.

## Content
header: Content · title: One plain explanation · description: Explain one term in a sentence or two of plain text, and keep the term itself on the page. Plain text and Coin Text both get the white label style. A press inside it just closes it, so never put an action there.
One ExampleCard "Explain a term" › Term("NAV", "About NAV", NAV). Description: "One sentence that says what NAV means, opened from the i next to it."

## In context
header: In context · title: Explaining fund terms · description: A fund's details list three terms, each with an info button. Pressing one explains it above its row; the next press anywhere closes it. Each tooltip keeps its own open state.
Composition in `.coin-new-context`: a `<ScreenFrame>` holding `<VStack modes={{ ...LIGHT, 'Slot gap': 'L' } as Modes}>` with `<Title title="Nifty 50 Index Fund" subtitle="Direct plan · Growth" modes={LIGHT} />` and `<VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes}>` holding Row("NAV", "₹182.40", "About NAV", NAV), Row("Expense ratio", "0.45%", "About expense ratio", EXPENSE), Row("Exit load", "1%", "About exit load", EXIT).

## Do & Don'ts
header: Do & Don’ts · title: Short, and on an info button · description: Each pair opens a tooltip people can read at a glance next to one that buries them in text or gets in the way of an action.
- Do Keep it to a sentence: One short line explains the term and gets out of the way. — Term("Expense ratio", "About expense ratio", EXPENSE) | Don't Write a paragraph: Four sentences fill the bubble and cover the screen behind it. — Term("Expense ratio", "About expense ratio", WALL)
- Do Open it from an info button: The i says there's more to read and does nothing else. — Term("Expense ratio", "About expense ratio", EXPENSE) | Don't Put it on the main action: Every press on Invest now also pops a bubble over the screen. — `<Tooltip modes={LIGHT}><TooltipTrigger asChild><Button label="Invest now" modes={LIGHT} /></TooltipTrigger><TooltipContent>Starts a monthly SIP of ₹500.</TooltipContent></Tooltip>`

## Sources
header: Sources · title: Use the public Tooltip contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code>, built from Biscuit’s main at c7d3348 (19 October) and taken from the team’s private package repository. Figma’s Tooltip is a near-black bubble with a downward arrow near its bottom left or right, in two variants, Custom Width Off (up to 280 px) and On. In code the bubble hugs its text up to 280 px or takes a set width, centres the arrow on the trigger, offers 12 placements, and stays 8 px inside the screen. It opens on press only, over the whole window, and the next press anywhere closes it. On the web the bubble is a tooltip tied to its trigger, but Escape doesn’t close it (#349). Storybook’s stories use a plain grey box as the trigger; these examples pass a Coin IconButton with asChild, though a Coin button nested inside the trigger opens it too.

## Limits
Never start a tooltip open, use `defaultOpen`, or pass actions as content. Don't show `sideOffset`, `gap`, or `alignItems`, or any Color Mode but Light. Don't imply hover or focus opening, a timer, that Escape closes it on the web (#349), or that the bubble names the trigger.
