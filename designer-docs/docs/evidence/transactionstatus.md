# TransactionStatus source evidence

Package, Figma, and Storybook evidence for the Transaction Status guide (board ticket #15, Design documentation — Marcin; Storybook coverage — Biscuit, done: "Storybook page rewritten to the handwritten outline on main 475ae733").

## dbe0e02 publish (28 October 2026, #394)

The docs now install mirror tag `v0.1.78-dbe0e02` (Biscuit's `main` at dbe0e02, 27 October). #394 verified 27 October on ace46ca (run_c79cb190) and again on dbe0e02 (run_beaf2324); closed by Marcin; published to the docs 28 October in Penny run run_92acfa9d. Where the sections below say otherwise, this section replaces them.

- The mark follows the mode at 18 × 18: Request “!” `#f06d0f`, Paid tick `#25ab21`, Declined cross `#f50031`, Expired “!” `#b5b5b5`. The SVG now sits in an 18 × 18 View (`:scope > div > div:first-child`).
- With no mode (or Color Mode Light only) the line is the Expired mode: a grey “!” beside “Expired · 20 Mar 2025” (checked in this run). With `status` left out the word follows the mode, except Request, which still shows “Expired” beside an orange “!” (token copy; Marcin's call).
- The mark stays 18 × 18 when the line is cut (a 120 px column and row, a 200 px VStack, disableTruncation). In a 231 px TransactionBubble a long status line ellipsizes and the chevron stays inside.

Guide changes: the Mark anatomy target and note; Configuration (the mode picks the icon and colour; Expired is the default) and its four example captions; One line (the mark keeps its 18 px); Sizing; Content (Request and Expired share the “!”); the first Do & Don't now pairs Expired with the Request mode, since the default is now grey; the bubble Don't says the line is cut; the Readout names the icon; Sources rewritten (28 October, 27 October build).

## Checked

25 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-c8526ae` (Biscuit's `main` at c8526ae, which contains 475ae733). `npm run coin:status`: the mirror is up to date with upstream main. Rendered the installed package in the docs site's Vite setup (react-native-web 0.21.2) in headless Chrome, and the published Storybook story.

## Sources

- Package: `src/components/TransactionStatus/TransactionStatus.tsx` (104 lines). Exports `TransactionStatus` (`components/index.ts:213`); `TransactionStatusProps` isn't re-exported.
- Figma: the ticket's link (Coin Subcomponents `27:854`) is the Stepper Item page. The component is [Coin Subcomponents · Transaction Status](https://www.figma.com/design/dSlK8ueQ7wlbyUSZd4f8QO/Coin-Subcomponents?node-id=152-1242), node `152:1242`, one component, 199 × 18, no properties. Layers: Transaction Status Icons (18 × 18), Status, “·”, Date (fills, truncates), and a Nav Arrow. The icon set `147:178` has variants paid (tick), declined (cross), expired (“!”), picked by the `transactionStatus` string variable.
- There is no Transaction Status in the Coin Components Library: designers meet it inside Transaction Bubble.
- Storybook (published `index.json`): one story, `components-transactionstatus--default` (status Expired, date 20 Mar 2025, mode Request), no host frame.
- Biscuit's handwritten `TransactionStatus.mdx`: "the state and date of one payment, on the payment row". Don't use it for the success screen (StatusHero) or a word-only badge (Badge). "Do not use colour alone: the word has to say the state." Limitations: the glyph doesn't change shape; no press handler; inside TransactionBubble, `statusSlot` replaces it and the chevron.

## Contract

- `status` (default 'Expired') and `date` (default '20 Mar 2025') render as one Text: `{status} · {date}`. 12/16 Medium `#191b1e`, one line with a tail ellipsis; `disableTruncation` lets it wrap.
- `modes`: only the `Transaction Status` collection changes anything, and only the mark's colour: Request `#f06d0f` orange (default), Paid `#25ab21` green, Declined `#f50031` red, Expired `#b5b5b5` grey. Color Mode, Page type and the rest change nothing.
- The mark is always the same path, a circle with “!”, 18 × 18, 4 px before the text.
- `style` goes last on the root. No `onPress`, accessibility props, `testID`, or rest props.

## Web render

Root `div` (row, gap 4) › `svg` 18 × 18 · `div[dir=auto]` "Expired · 20 Mar 2025". Default 151.8 × 18; "Paid · 21 Oct 2026" 129 × 18.

- No width of its own: as wide as its words. In a 120 px host the text ellipsizes and the mark shrinks to 14 × 18. With `disableTruncation` the text wraps (32 px tall) and the mark still shrinks.
- Inside TransactionBubble the bubble's `modes` reach it, so the `Transaction Status` mode set on the bubble colours the mark.
- In a flex row (the kit's dashed host, or the bubble's status row) the root doesn't shrink: the line keeps its full width. In a 231 px bubble, "Declined · 21 October 2026, 4:15 pm" is 214 px against 197 px of content, so it runs past the bubble's edge and pushes the chevron out. In a column (VStack, 200 px) it ellipsizes and the mark shrinks to 14 × 18.

## Discrepancies

- Figma swaps tick / cross / “!” and the words with the mode; the code only recolours the “!” (#394).
- Defaults pair the word "Expired" with the orange Request mode; Figma's Expired is grey. Figma's `transactionStatus/copy` for Request is also "Expired" (token value).
- Figma's subcomponent has its own chevron; in code the chevron belongs to TransactionBubble.
- The mark shrinks when the text overflows a column; in a bubble the line overflows the bubble (#394, #395).
- MDX suggests `Successful` and `Pending` as words; the modes are Request, Paid, Declined, Expired.

## Tickets

- #394 (Component Bug, Biscuit): one glyph for every mode, words don't follow the mode, default orange "Expired", the shrinking mark, Figma's built-in chevron, MDX words.

## Limits

Don't show or mention Color Mode or dark mode. Don't imply the mark changes shape, that the mode changes the words, that the line presses, or that it has its own chevron.
