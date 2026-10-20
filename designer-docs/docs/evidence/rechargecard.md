# RechargeCard source evidence

Package, Figma, and Storybook evidence for the Recharge Card guide (board ticket #16, Design documentation — Marcin; Storybook coverage — Biscuit, done: "Storybook page rewritten to the handwritten outline on main e60f8bd8").

## Checked

20 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-c7d3348` (Biscuit's `main` at c7d3348). `npm run coin:status` shows one newer upstream commit, e60f8bd8, which changes only `RechargeCard.mdx`. Rendered with react-native-web 0.21.2 in headless Chrome with JioType Var loaded; the published Storybook was measured the same way.

## Sources

- Package: `src/components/RechargeCard/RechargeCard.tsx` (285 lines). Exports `RechargeCard`, `RechargeCardProps` (`components/index.ts:241`). Renders `MoneyValue` (price), `AvatarGroup` (subscriptions) and `ButtonGroup` (actions).
- Figma: [Coin Components Library · Recharge Card](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2235-937), node `2235:937`, a single component (no variants), 312 × 261. Header (title, MoneyValue), three spec items (Validity, Data, Subscriptions with an Avatar Group of 3 × 29 px), disclaimer, Button group (purple "Button" 80 px and text "View Details" 117 px, hugging). Exposed properties: text `title` and `disclaimer` only.
- Storybook (published `index.json`): `components-rechargecard--default`, `--without-subscriptions`, `--button-group-size-override`, centred, no frame. The addon's `argTypesRegex: '^on[A-Z].*'` injects `onPress`, so every published story renders the card as a `button` with its Buttons nested inside. The Default story shows "View Det…" (label 88 px in a 78 px slot). The published docs page is the older one; e60f8bd8's handwritten page isn't deployed.
- Biscuit's handwritten `RechargeCard.mdx` (e60f8bd8): "one recharge plan: a name, a price, validity, data, a disclaimer, optional subscription avatars, and the actions." Not for a bill or loan offer (HoldingsCard) or benefits with a fee (CcCard).

## Contract

All props optional, placeholder defaults: `title` ("Unlimited 5G"), `price` (500, `number | string`), `validity` ("365 days"), `data` ("2 GB/Day"), `disclaimer` (two lines; `\n` breaks), `subscriptionContent`, `actions`, `modes`, `style` (`ViewStyle`, not an array), `onPress`, `disabled`, `accessibilityLabel`. No `testID` or `...rest`.

- `price` goes to `MoneyValue value={price} currency="₹"`: a string that already has ₹ shows "₹₹349". The labels "Validity", "Data", "Subscriptions" and the ₹ are fixed.
- `subscriptionContent` adds the third column when `React.Children.count > 0` (`false`, `''` or an empty fragment still add an empty column). It is wrapped in `AvatarGroup` with `{ ...modes, 'Avatar Size': 'S' }` (29 px, −6 px overlap).
- `actions` is always wrapped in `ButtonGroup` with `{ AppearanceBrand: 'Secondary', 'Button / Size': 'S', Emphasis: 'High', ...modes }`; a child's own modes win. Without actions the empty group still takes a 20 px gap.
- ButtonGroup gives each Button `flex: 1`; the card's root is `alignItems: flex-start`, so the group hugs its content and splits it equally: of two different labels, the longer is cut short ("Recharge" + "Details" → "Recha…"; "Recharge" + "View details" → "View det…"). One Button keeps its own width.
- `onPress`: root `Pressable`, `role=button`, name `accessibilityLabel ?? title`, `accessibilityState.disabled`; no pressed or disabled look. Static: `accessibilityLabel` only (title not used).

## Modes and tokens

Reads `modes` only. Own tokens (`rechargeCard/*`, single mode): white panel, 1 px `#ebebed` border, radius 20, padding 16 / 20, gap 20, minWidth 312; title 12/14/700, spec label 12/14/500, value 14/17/500, disclaimer 10/13/400, all black. No mode changes them.

- Price: `MoneyValue` with `Context3: 'Balance & Cards'` by default → 36 px, weight 900 (line 44). `Context3: Default` shrinks it to 14 px.
- Buttons: AppearanceBrand (Secondary purple default; Primary gold; Neutral; Tertiary), Emphasis (Medium light purple; Low text), Button / Size (M 42 px; XS), Semantic Intent System + AppearanceSystem, Button / State, Context.
- Avatars: Avatar Size from the card has no effect (forced S); Context4, Context2, context 10 change them. Page type JioPlus turns the price white.
- Storybook's mode list (Avatar Size, Badge Size, Color Mode, Context2, Context3, Context4, Page type + Button / Size) omits AppearanceBrand and Emphasis and offers two that do nothing. The Default story's `"Avatar / Background": "Solid"` isn't a collection.

## Web render

Root `div` (column, `align-items: flex-start`, min-width 312) › header `div` (title `div[dir=auto]`, MoneyValue `div`) › specs `div` (row; 2 or 3 `div` columns, each label + value or AvatarGroup) › disclaimer `div[dir=auto]` › ButtonGroup `div` (row, gap 12) › `button`s. Pressable root is a `button`. No `data-testid`.

At 312 with three columns and one action: 312 × 271 (header 63, specs 48, disclaimer 26, button 32). Two columns: 259. Button / Size M: +10. No actions: 227 (the empty group's 20 px gap remains). Price line 44 (Figma 36), title 15 (Figma 14).

## Discrepancies

- Actions split equally and cut the longer label short; Figma's buttons hug ("Button" 80, "View Details" 117). Biscuit's own Default story shows "View Det…".
- Empty ButtonGroup leaves 20 px when there are no actions.
- Published stories all render a pressable card with nested buttons (auto-injected `onPress`); the component is static by default.
- Height 271 vs Figma 261 (line heights raised to 1.2 × font size).
- Static card has no accessible name; mdx says it defaults to the title. `disabled` has no visual. `subscriptionContent={false}` shows an empty column.
- ₹ and the labels are fixed (no currency or label props). JSDoc says the disclaimer default comes from tokens; it's a hard-coded string. mdx says "Price is a number"; the type accepts strings.
- Storybook mode controls Avatar Size and Badge Size do nothing; `Avatar / Background` doesn't exist; generated mode list omits AppearanceBrand and Emphasis.
- Published Storybook docs page is the older generated one.

## Hosting

Storybook centres the card at its 312 px minimum. The guide gives each card `style={{ width: 312 }}` and puts it in the kit's `FitWidth`, which scales it on narrow screens instead of scrolling. Subscriptions use monogram Avatars (JH, JS, +2) for the included apps; the package has no app logos.

## Tickets

- #353 (Component Bug, Biscuit): equal-width actions cut labels, empty actions gap, pressable Storybook stories, heights, accessible name and `disabled`, fixed currency and labels, empty Subscriptions column, Storybook mode controls.

## Limits

Don't show Dark, Context, Context2, Context3, Context4, context 10, Page type, Avatar Size, Badge Size, Semantic Intent or Button / State. Don't show `disabled` as a visual state or `subscriptionContent={false}`. Don't imply the currency or labels can change, that the buttons hug their labels, or that the card is pressable by default.
