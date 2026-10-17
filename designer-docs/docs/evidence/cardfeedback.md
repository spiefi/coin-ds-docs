# CardFeedback source evidence

Package, Figma, and Storybook evidence for the Card Feedback guide (board ticket #75, Design documentation — Marcin; Storybook coverage — Biscuit, done: "Rewrote CardFeedback to the handwritten outline. On GitHub main 7b7c79f0").

## Checked

17 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-a116616` (Biscuit's `main` at a116616, 16 October); `npm run coin:status` reports it up to date. `CardFeedback.tsx` and the token JSON are byte-identical to Biscuit's `main`. Rendered in the docs' own Vite + react-native-web 0.21.2 build in headless Chrome.

## Sources

- Package: `src/components/CardFeedback/CardFeedback.tsx` (248 lines, plain function); export `CardFeedback`, `CardFeedbackProps` (`components/index.ts:42`). Parts are statics only: `CardFeedback.Icon`, `.Content`, `.Title`, `.Body`, `.Action` (not exported by name).
- Figma: [Coin Components Library · Card/Feedback](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1280-4481), node `1280:4481`: one component, 328 × 123, no properties. Layers: `Feedback Icons` (20 × 20, a solid green circle with a check; variant `Status` = `possitive` / `warning&negative`), `text wrap` (title "Split payment", body "Split this transaction into installments"), and an actions slot with one small green Button (12/14, padding 12 × 4). Fill `#DBF0D9`.
- Storybook (published `index.json`): docs `components-cardfeedback--docs` (older generated page); stories `--default`, `--with-custom-content`, `--multiple-actions`, `--with-icon-prop`. No frame: the card fills the canvas. Storybook injects an `onPress` action into every story, so each renders as a button with the Buttons inside it.
- Biscuit's handwritten `CardFeedback.mdx` (upstream, not the published page): a status in the page — icon, title, a line of detail, an optional action; not a toast and doesn't block the screen. Title is the outcome ("Payment successful"), body one sentence, button labels verbs, one or two actions. Don't set `onPress` when the card has Button children. Use Toast for messages that disappear, Popup for a blocking decision, EmptyState for an empty screen.

## Contract

Root props: `children`, `modes`, `style`, `onPress`, `disabled`, `accessibilityLabel`. No `...rest`, so no `testID`. Parts:

- `CardFeedback.Icon` — `icon` (registry name) in a 20 px box, coloured `appearanceFeedback/cardFeedback/icon/color`; or children. The card doesn't pick an icon for a status.
- `CardFeedback.Content` — full-width column, gap 8; holds Title, Body and Action.
- `CardFeedback.Title` — 14/17/500. `CardFeedback.Body` — 12/16/400. Both wrap.
- `CardFeedback.Action` — a wrapping row, gap 4; each child gets the card's modes.
- `onPress` makes the root a Pressable `role="button"` with no pressed, hover or disabled look; `disabled` only stops presses. Without `onPress` the root is a plain `div`.
- Container: padding 12, radius 12, gap 8, hard-coded `minHeight: 59`, items top-left in a column.

## Modes and tokens

Defaults `AppearanceSystem: positive`, `Context: Nudge&Alert`, `Semantic Intent: System`, then `modes`. The card doesn't read the theme provider: Color Mode must come through `modes`.

- AppearanceSystem: panel and icon — positive `#DBF0D9` / `#26AB21`, warning `#FFE3D6` / `#F06E0F`, negative `#FFE0DE` / `#F50030`; Buttons in Action take the same colour (white label) at the small Nudge&Alert size (25 px).
- AppearanceBrand: title and body colour only, a slight shift (Primary `#0F0D0A` / `#1E1A14`, Neutral `#0D0D0F` / `#1A1C1F`).
- Semantic Intent Brand: Buttons in Action turn the brand colour; the panel stays the status colour. Context: Button size only.
- Measured: a Button with `modes={{ Emphasis: 'Low' }}` inside Action still renders the solid status fill, so two actions look alike.

## Web render

Root `div` (or `button` with `onPress`) › icon `div` 20 × 20 › svg; content `div` › title `div[dir=auto]`, body `div[dir=auto]`, action `div` › `button[role=button]`. No `data-testid` anywhere. Measured in the guide at 328 px with one action: 328 × 126 (padding 12, gap 8).

## Discrepancies

- Inside a Coin VStack (or any container that passes modes down, such as HStack or Stack), the container hands `Content` and `Action` an explicit `modes` prop. They then use it instead of the card's modes (`propModes || context.modes`), so they lose `Semantic Intent: System` and `Context: Nudge&Alert`: Buttons turn gold and full size (measured). Reported. The guide keeps CardFeedback out of Coin stacks.
- Figma's icon is a solid circle with a check; the stories use `ic_status_successful` (a dashed ring with a check). The package has no status-to-icon mapping.
- Storybook renders every story as a pressable card with Buttons inside it (an injected `onPress`); the mdx says not to combine them.
- CHANGELOG mentions pressed feedback; the code has none. A leftover `console.log(color)` in `CardFeedback.Icon` logs on every render.
- `MultipleActions` passes token names as `modes` to Cancel, which does nothing.
- Figma is 328 wide; code takes its host's width.
- Published Storybook docs page is the older generated one.

## Hosting

Storybook lets the card fill a white canvas. The guide puts each card straight on the grey example stages with `style={{ width: '100%', maxWidth: 328 }}` (Figma's width), never inside a VStack or another Coin container. Icons: `ic_status_successful` (positive, as in Storybook), `ic_warning`, `ic_error`. In context uses the kit's `.coin-new-stack` for the screen's column for the same reason.

## Tickets

- #286 (Component Bug, Biscuit): parts lose the card's modes inside Coin stacks; second actions can't be set apart; no pressed or disabled look with `onPress`; `console.log` in Icon; no `testID`.

## Limits

- Not shown: Dark, Context, Semantic Intent Brand, AppearanceBrand examples, `onPress` (described only), style props.
- No pressed, focus or disabled look.
