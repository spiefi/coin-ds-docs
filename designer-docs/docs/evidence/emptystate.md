# Empty State source evidence

Package, Figma, Storybook, and browser evidence for the Empty State guide (board ticket #43, Design documentation — Marcin; Storybook coverage — Biscuit, done).

## Checked

Checked 10 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-636f3f5` (Biscuit's `main` at 636f3f5); `npm run coin:status` reports the mirror and the docs up to date with upstream. `EmptyState.tsx` is identical to upstream.

## Sources

- Figma: [Coin Components Library · Empty state](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1828-82), node `1828:82`, page `Empty state`. One component (not a set), 236 × 229: `content wrap` (Icon Capsule 81 px with a 36 px `ic_error`, red `#f50030`; Title 16/18 bold `#0d0d0f`; Body 12/16 `#1a1c1f`, two lines) and a slot `Slot:"Action"` holding a 32 px Button (gold, 14/22, padding 16 × 4). Padding 4, icon/title/body gap 16, content → action gap 24. Variables bound: `emptyState/padding` 4, `radius` 16, `gap` 24, `content/gap` 16, `slot/gap` 12. No fill. Instance `1829:871` uses a green capsule; the others red. The red capsule plus gold button equals Icon Capsule Size L + System negative on the capsule and Button / Size S + Brand Primary on the button.
- Storybook (published `index.json`, built 1 October): `components-emptystate--docs`, `--default`, `--with-custom-text`, `--without-description`, `--custom-slots`. The published docs page is the old generated outline and equals upstream `main`; Biscuit's board note on #43 (7 October: rewritten to the Button outline, covering the placeholder button, slots that don't inherit modes, and Color Mode on the text) is not on `main` or in the published build. The Custom slots story passes `modes={{ 'IconCapsule/Color': 'Error' }}`, which is not a collection, so its capsule is not red.

## Contract

- `EmptyState` props: `title` (default “No payments to show”), `description` (default “Start by paying bills, recharge or your friends”), `showDescription` (default true), `iconSlot` (default `<IconCapsule modes={modes} />`, gold `ic_card`, 42 px), `buttonSlot` (default `<Button label="Button" modes={modes} />`, no `onPress`), `modes`, `style`, `testID`. No `onPress`, button label, icon name, accessibility props, or rest props.
- `iconSlot={null}` and `buttonSlot={null}` still render the defaults (`||` fallback). The body hides when `showDescription` is false or `description` is empty; the title always renders.
- Modes: EmptyState forces none. It merges the theme provider's modes with `modes` and passes the result to the two default children only. Custom slots get nothing: pass each slot component its own modes. Only `Color Mode` changes EmptyState's own text (title `#0d0d0f` / Dark `#ffffff`; body `#1a1c1f` / Dark `#ebebed`); every other collection only restyles the default capsule and button, which always get identical modes and so identical colours.
- Tokens: padding 4, gap 24 (content → button), content gap 16, title 16 bold (line height token 18, rendered 20 by the package's minimum line height), body 12/16 regular, radius 16 with no fill or border. `emptyState/slot/gap` (12) is never read.
- Width comes from the parent or `style`; text centres. There is no surface: the parent supplies the background.
- Classification. Designer-configurable: title, description on/off, the icon (an Icon Capsule with its own icon, size, and appearance modes), the button (label, size). System-driven: layout, spacing, text colours by Color Mode. Developer-only: the button's `onPress`, `style`, `testID`, slot wiring.

## Browser measurements (Chrome, react-native-web 0.21.2, Light)

- Defaults in a 360 px column: 360 × 184; capsule 42 × 42 gold `#cea15a`; title “No payments to show” 16/20 bold; body one line; button 97 × 42 labelled “Button”, `aria-label="Button"`, focusable, does nothing.
- Figma composition (`modes` with `Button / Size: S`, `iconSlot` = `<IconCapsule iconName="ic_error" modes={{ 'Icon Capsule Size': 'L', 'Semantic Intent': 'System', AppearanceSystem: 'negative' }} />`, `style={{ width: 236 }}`): 236 × 229, matching Figma; capsule 81 × 81 red `#f50030` with a 36 px icon; body wraps to two lines (228 × 32); button 83 × 32.
- Custom slots (`Icon Capsule Size: L`, `Emphasis: Medium` capsule; Button size S “Make a payment”): 360 × 213; capsule `#fde8c9`; button 151 × 32.
- `iconSlot={null}` / `buttonSlot={null}`: identical to the defaults. An empty fragment as `buttonSlot` removes the button (root 118 tall).
- In a centring parent the root is as wide as its widest line plus 8 px.
- DOM: root `div[data-testid]` > content wrap `div` > capsule `div[role="img"]` (no name), title `div[dir="auto"]`, body `div[dir="auto"]`; the button is the root's second child `button[role="button"]`. Root and title have no role.

## Accessibility (web)

- No role or name on the root; the title is not a heading; the capsule is an unnamed image.
- The default button is a focusable button named “Button” that does nothing on click, Enter, or Space.
- Nothing announces the empty state when it appears.

## Limits

- Light only on this page: Dark switches the text to white but EmptyState has no surface, so it needs a dark parent.
- Not shown: `null` slots, an empty-fragment slot, `style`, Dark, the default capsule and button.

## Coin gaps

- #231 (Component Fix, To do, Component Bug; Mr. Biscuit): placeholder copy and a “Button” that does nothing by default; slots can't be removed with `null`; custom slots don't receive EmptyState's modes; Figma's red L capsule and S button need custom slots and modes; `emptyState/slot/gap` unused; title line height 20 vs Figma 18; no role, heading, or capsule name; Storybook Custom slots story uses a non-existent mode; the Storybook rewrite is not on `main`.
