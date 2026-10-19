# CardFeedback source evidence

Package, Figma, and Storybook evidence for the Card Feedback guide (board ticket #75, Design documentation — Marcin; Storybook coverage — Biscuit, done: "Rewrote CardFeedback to the handwritten outline. On GitHub main 7b7c79f0").

## Checked

19 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-c7d3348` (Biscuit's `main` at c7d3348), which fixes #286. Re-tested in headless Chrome (react-native-web 0.21.2) at 1280 and 390 px on 19 October (Penny run run_43afbe70), and measured again in the guide while publishing.

First checked 17 October 2026 against mirror tag `v0.1.78-a116616` in the docs' own Vite + react-native-web 0.21.2 build.

## Sources

- Package: `src/components/CardFeedback/CardFeedback.tsx` (264 lines, plain function); export `CardFeedback`, `CardFeedbackProps` (`components/index.ts:42`). Parts are statics only: `CardFeedback.Icon`, `.Content`, `.Title`, `.Body`, `.Action` (not exported by name).
- Figma: [Coin Components Library · Card/Feedback](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1280-4481), node `1280:4481`: one component, 328 × 123, no properties. Layers: `Feedback Icons` (20 × 20, a solid green circle with a check; variant `Status` = `possitive` / `warning&negative`), `text wrap` (title "Split payment", body "Split this transaction into installments"), and an actions slot with one small green Button (12/14, padding 12 × 4). Fill `#DBF0D9`.
- Storybook (published `index.json`): docs `components-cardfeedback--docs` (older generated page); stories `--default`, `--with-custom-content`, `--multiple-actions`, `--with-icon-prop`. No frame: the card fills the canvas. The published Storybook injects an `onPress` action into every story, so each renders as a button with the Buttons inside it. Since #286 the stories set `actions.argTypesRegex` to `''` (checked in the source only; the published Storybook hadn't been rebuilt on 19 October).
- Biscuit's handwritten `CardFeedback.mdx` (upstream, not the published page): a status in the page — icon, title, a line of detail, an optional action; not a toast and doesn't block the screen. Title is the outcome ("Payment successful"), body one sentence, button labels verbs, one or two actions. Don't set `onPress` when the card has Button children. Use Toast for messages that disappear, Popup for a blocking decision, EmptyState for an empty screen.

## Contract

Root props: `children`, `modes`, `style`, `onPress`, `disabled`, `accessibilityLabel`, `testID` (since #286; each part takes `testID` too). Parts merge the card's modes with their own (`mergeModes(context.modes, propModes)`), and Icon, Content and Action paint their children with `{ ...partModes, ...child.modes }`, so a child's own modes win. Parts:

- `CardFeedback.Icon` — `icon` (registry name) in a 20 px box, coloured `appearanceFeedback/cardFeedback/icon/color`; or children. The card doesn't pick an icon for a status.
- `CardFeedback.Content` — full-width column, gap 8; holds Title, Body and Action.
- `CardFeedback.Title` — 14/17/500. `CardFeedback.Body` — 12/16/400. Both wrap.
- `CardFeedback.Action` — a wrapping row, gap 4; each child gets the card's modes under its own.
- `onPress` makes the root a Pressable `role="button"`: hover opacity 0.92, pressed 0.8, a 1 px `#0c0d10` ring on keyboard focus; `disabled` gives opacity 0.5, `aria-disabled`, `tabindex -1` and ignores presses (since #286; measured in the guide: hover 0.92, disabled 0.5 / `aria-disabled="true"` / `tabindex="-1"`). Without `onPress` the root is a plain `div`.
- Container: padding 12, radius 12, gap 8, hard-coded `minHeight: 59`, items top-left in a column.

## Modes and tokens

Defaults `AppearanceSystem: positive`, `Context: Nudge&Alert`, `Semantic Intent: System`, then `modes`. The card doesn't read the theme provider: Color Mode must come through `modes`.

- AppearanceSystem: panel and icon — positive `#DBF0D9` / `#26AB21`, warning `#FFE3D6` / `#F06E0F`, negative `#FFE0DE` / `#F50030`; Buttons in Action take the same colour (white label) at the small Nudge&Alert size (25 px).
- AppearanceBrand: title and body colour only, a slight shift (Primary `#0F0D0A` / `#1E1A14`, Neutral `#0D0D0F` / `#1A1C1F`).
- Semantic Intent Brand: Buttons in Action turn the brand colour; the panel stays the status colour. Context: Button size only.
- A Button's own modes now win inside Action (#286). Measured in the guide: Cancel-style `{ 'Semantic Intent': 'Brand', AppearanceBrand: 'Neutral', Emphasis: 'Low' }` renders transparent (`rgba(235, 235, 237, 0)`) with dark text, 25 px, beside the red `rgb(245, 0, 48)` primary. `Emphasis` alone still changes nothing on a System button: `button/background` at Semantic Intent System resolves through `appearanceFeedback/globalButton/background`, which branches only on AppearanceSystem (a token gap, noted on #286's re-test, not CardFeedback's).

## Web render

Root `div` (or `button` with `onPress`) › icon `div` 20 × 20 › svg; content `div` › title `div[dir=auto]`, body `div[dir=auto]`, action `div` › `button[role=button]`. `data-testid` lands on the root and parts when `testID` is passed (the guide doesn't use it). Measured in the guide at 328 px with one action: 328 × 126 (padding 12, gap 8).

## Discrepancies

- Coin stacks (fixed by #286): inside a VStack (or HStack, Stack) the parts merge the container's modes with the card's, so they keep `Semantic Intent: System` and `Context: Nudge&Alert`. Measured in the guide's In context (a Coin VStack): Try again is red `rgb(245, 0, 48)`, 25 px, at 1280 and 390 px. Before, the parts dropped the card's modes and Buttons turned gold and 42 px.
- Figma's icon is a solid circle with a check; the stories use `ic_status_successful` (a dashed ring with a check). The package has no status-to-icon mapping.
- The published Storybook still renders every story as a pressable card with Buttons inside it (an injected `onPress`); the mdx says not to combine them. Fixed in the story source (#286), not yet rebuilt.
- Pressed feedback (fixed by #286): see Contract. The `console.log(color)` in `CardFeedback.Icon` is gone.
- `MultipleActions`' Cancel now passes `{ Emphasis: 'Low' }`, which still looks like Confirm on a System button (token gap above).
- Figma is 328 wide; code takes its host's width.
- Published Storybook docs page is the older generated one.

## Hosting

Storybook lets the card fill a white canvas. The guide puts each example card straight on the grey example stages with `style={{ width: '100%', maxWidth: 328 }}` (Figma's width). Icons: `ic_status_successful` (positive, as in Storybook), `ic_warning`, `ic_error`. In context uses a Coin `VStack` for the screen's column (since #286). States shows a quieter second action, a pressable card and a disabled one.

## Tickets

- #286 (Component Bug, Biscuit): parts lost the card's modes inside Coin stacks; second actions couldn't be set apart; no pressed or disabled look with `onPress`; `console.log` in Icon; no `testID`; stories with an injected `onPress`. Fixed on c7d3348, verified 19 October, published to the docs 19 October.

## Limits

- Not shown: Dark, Context, Semantic Intent Brand on the card, AppearanceBrand examples, style props.
- Never Buttons inside a pressable card.
