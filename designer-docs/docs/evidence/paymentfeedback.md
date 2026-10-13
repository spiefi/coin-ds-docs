# PaymentFeedback source evidence

Package, Figma, and Storybook evidence for the Payment Feedback guide (board ticket #2, Design documentation — Marcin; Storybook coverage — Biscuit, done).

## Checked

13 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-c1fa197` (Biscuit's `main` at c1fa197, 12 October). Biscuit's newest `main` 7020bf9 (13 October, not in the mirror) rewrites `PaymentFeedback.mdx` and adds a docs control exclude to the stories; `PaymentFeedback.tsx` is identical in all three.

## Sources

- Package: `src/components/PaymentFeedback/PaymentFeedback.tsx` (178 lines, `PF`); export `PaymentFeedback`, `PaymentFeedbackProps` (`components/index.ts:367`). Composes only `IconCapsule`.
- Figma: [Coin Components Library · Payment Feedback](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1056-3084), node `1056:3084`: one component (not a set), 328 × 316, no variants. Properties: `Title`, `Subtitle`, `Body`, `Details` (text) and `details` (boolean). Nested Icon Capsule 81 × 81 (green, white check). Layers: Icon Capsule, Message container › Title, Subtext › Subtitle, Body; Details. Spacing from positions 46 / 12 / 4 / 46. No fill.
- Storybook (published `index.json`, 12 October): docs `components-paymentfeedback--docs` (old generated page); stories `--default`, `--without-details`, `--failed-payment`, `--warning-payment`, `--custom-media`. Host: `View { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }` on a white canvas, so it shrinks to its longest line. Every story sets `Color Mode: Light`.
- Biscuit's 7020bf9 `PaymentFeedback.mdx` (handwritten, not yet published): “the result of a payment: an icon, an amount, a status line, and the transaction details. It does not submit a payment or show a spinner.” No action button; put the next step outside it. Content: a formatted amount (no currency sign added), the outcome in the subtitle, one-sentence body, one fact per details line.

## Contract

Props (`PF:10-44`): `title` (`'₹50,000'`), `subtitle` (`'Payment successful'`), `body` (none), `details` (`'18 March 2025, 4:15 pm\nTransaction ID: TXN121466784'`, split on `\n`, one line each), `showDetails` (true), `iconName` (`'ic_confirm'`), `renderMedia` (a ReactNode that replaces the default capsule), `modes`, `style` (`ViewStyle` on the root). No `testID`, `accessibilityLabel`, children, or rest props.

- Empty `title`/`subtitle`/`body` strings render nothing for that line. `showDetails={false}` or empty `details` removes the details block.
- Default media: `<IconCapsule iconName modes={{ AppearanceSystem: 'positive', ...modes, 'Icon Capsule Size': 'L', Emphasis: 'High', 'Semantic Intent': 'System' }} />` (`PF:137-144`): the caller's AppearanceSystem wins; size, emphasis and intent are forced.
- `renderMedia` goes through `cloneChildrenWithModes(renderMedia, modes)`: the child gets the parent's modes under its own. `renderMedia={false}` renders no media (read from code, not run).
- No status prop: the outcome is `modes.AppearanceSystem` (positive green, warning orange, negative red) plus `iconName` and the words.

## Modes and tokens

Own tokens: 23 `paymnetFeedback/*` literals (the typo is the real key) in the single-mode collection `PaymnetFeedback / Output`: container gap 46, message gap 12, title #0d0d0f 36/900 (line 36), subtitle #24262b 16/500 (19), body and details #24262b 14/500 (17), details paragraph spacing 4. `paymnetFeedback/subtext/gap` (4) exists but code hard-codes 4. No mode changes any own token.

Default capsule (L, High, System): AppearanceSystem positive rgb(38,171,33) / warning rgb(240,110,15) / negative rgb(245,0,48), white icon, 81 px capsule, 36 px icon. Context Nudge&Alert shrinks it to 14 px and CTACard to 58 px. AppearanceBrand, Emphasis, Icon Capsule Size, Semantic Intent and Page type change nothing. `FIGMA_COMPONENT_MODES.PaymentFeedback` lists all eight collections (it is IconCapsule's trace).

Custom media as in the CustomMedia story (`IconCapsule` with `Icon Capsule Size: L, Emphasis: High, AppearanceBrand: Primary`, intent Brand): gold rgb(206,161,90) with a dark icon.

## Web render

`div` (column, centred, gap 46, no width) › `div[role="img"]` (capsule, 81 × 81) › `div` › `svg`; then the message `div` (width 100%, gap 12) › title `div[dir="auto"]`, subtext `div` (gap 4) › subtitle and body `div[dir="auto"]`; then the details `div` › one `div[dir="auto"]` per line (4 px between). No `data-testid` anywhere; the capsule is the only `[role="img"]`, with no accessible name. Effective line heights: title 44 (`safeTextLineHeight` raises 36 to ceil(36 × 1.2)), subtitle 20, body and details 17. No live region or alert role.

## Discrepancies

- Pending and failed icons: the stories use `ic_info` (pending) and `ic_close` (failed); Biscuit's unpublished 7020bf9 page lists `ic_warning` and `ic_error`. The guide follows the stories and says so in Sources.
- Title line 44 px in code vs 36 in Figma; subtitle 20 vs 19.
- Figma shows only success; pending and failed exist only in code.
- The 7020bf9 page says Color Mode and Page type give light, dark and JioPlus; none of PaymentFeedback's own tokens change with them.
- The published Storybook docs page is the old generated one.

## Hosting

Storybook centres it on a white canvas with 24 px padding and no frame. The guide's example cards centre it the same way; the anatomy and sizing diagrams give it Figma's 328 px width. In context: a ScreenFrame screen with the result and a full-width Done button below it, as the 7020bf9 page asks.

## Limits

- Not shown: Dark, `Context`, `style`, `renderMedia={false}`, and modes that change nothing.
- No action, loading, pressed or disabled state; no announcement of the result.
