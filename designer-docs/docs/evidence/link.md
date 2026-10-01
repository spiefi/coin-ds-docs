# Link source evidence

## Checked

29 September 2026. Declared and installed `jfs-components` is `0.1.77` from the private package repo `spiefi/coin-components` (newest tag `v0.1.77`). Board ticket #128 (Design documentation — Marcin; Storybook coverage — Biscuit, done).

## Sources

- Figma: [Coin Components Library · Link](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=6981-5), frame `6981:5` (169 × 112) with three symbols: `Text align=Left, Autolayout=Fill` (`6981:6`, 137 × 16), `Text align=Left, Autolayout=Hug` (`6981:8`, 28 × 16), `Text align=Center, Autolayout=Fill` (`6981:10`, 137 × 16). No Center + Hug variant and no disabled variant. Screenshot: a black, underlined "Link" in each variant. Bound variables: `text/foreground` #000000, `link/fontFamily` JioType Var, `link/fontSize` 14, `link/fontWeight` 500, `link/lineHeight` 16, `link/letterSpacing` -0.5. Read through the Figma MCP (jiofinance.in account).
- Storybook: `components-link--docs`. MDX: an underlined, pressable text primitive rendered as one React Native `Text` (not a `Pressable`), so it nests in `TextSegment` like an `<a>` in a `<p>`; typography from `link/*`, colour from `text/foreground` "so the link matches the copy around it"; no `href`, `target`, or `rel` — navigation is handled in `onPress`. Lists the Page type, Text Appearance, Context, Color Mode, Text Sizes, and Weight collections. Stories: `--default` ("Link", Fill, Left), `--inside-text-segment` ("By continuing you agree to our Terms and Privacy Policy." in a 280 px View), `--disabled`, `--truncated` (`numberOfLines={1}` in a 160 px View), `--with-children` ("Need help?").
- Package source `src/components/Link/Link.tsx` (0.1.77); added in 0.1.23 (CHANGELOG). Composed by `CheckboxItem` (Figma default "I agree" + "Terms & Conditions", both Hug), `ExpandableCheckbox` (`linkLabel`, `onLinkPress`), and the `HoldingsCard` footer.

## Contract

- Props: `text` (default "Link"), `children` (wins over `text`), `onPress`, `disabled` (default false), `autolayout` `Fill` (default) | `Hug`, `textAlign` `Left` (default) | `Center`, `modes`, `style`, `numberOfLines`, `disableTruncation`, `singleLine`, `accessibilityLabel` (defaults to the text), `accessibilityHint`. No `testID`, `href`, or `target`.
- Tokens: `link/fontFamily` JioType Var; `link/fontSize` → `textSize/fontSize` and `link/lineHeight` → `textSize/lineHeight` (Text Sizes: Small 12/16, Medium 14/16, Large 18/24 in the Default context); `link/fontWeight` → `weight/text/fontWeight` (Weight: Regular 400, Medium 500, Bold 800); `link/letterSpacing` -0.5; colour `text/foreground` → Page type → Text Appearance (Neutral by default).
- Designer-configurable: label, Autolayout (Fill/Hug), Text align (Left/Center), Text Sizes, Weight, Text Appearance (inherited inside a `TextSegment`), disabled, and placement (own line or inside a sentence). Developer-only: `onPress` navigation, truncation props, accessibility label and hint. System: the underline is always on; disabled is 40% opacity.

## Rendered (installed 0.1.77, web, Light)

- Own line: `div[role=link][tabindex=0][dir=auto]` named by `aria-label` (the text). Inside `TextSegment`: `span[role=link]`. JioType Var 14 px on a 17 px line (token 16, raised by `safeTextLineHeight`), weight 500, letter spacing -0.5, rgb(0, 0, 0), underline, pointer cursor when `onPress` is set.
- Text Sizes: Small 12/16, Medium 14/17, Large 18/24 px; line boxes 16, 17, 24 px tall in a stack. Weight Regular 400, Bold 800.
- Fill is `align-self: stretch`. In a 180 px `VStack` (padding 8) the link is 164 × 17, and a press on the empty right side fires `onPress`. Hug is the label's width (77 × 17 for "Forgot PIN?"). In a plain block parent the element is inline and Fill has no effect, so the page hosts every link in a Coin `VStack`, as an app would.
- Center shows only with Fill. Hug + Center renders at the left edge (checked under a full-width Button).
- Inside `TextSegment`: links wrap with the copy ("Privacy Policy" breaks over two lines at 200 px) and take the paragraph's modes (Text Appearance Error → rgb(150, 0, 26); Text Sizes Small → 12/16).
- Text Appearance on a link: Primary rgb(206, 161, 90), about 2.4:1 on white; Secondary rgb(93, 0, 181); Error rgb(150, 0, 26). `Color Mode: Dark` leaves `text/foreground` black (Text behaves the same); Page type JioPlus gives white.
- `numberOfLines={1}` in a 160 px `VStack`: 144 px wide, no wrap, ellipsis. Without it, long labels wrap.
- Disabled: opacity 0.4 and `onPress` suppressed, but still `tabindex=0` with no `aria-disabled` (same in the published Storybook Disabled story).
- Keyboard: a focused link receives Enter and Space, but `onPress` does not fire; only a click or tap activates it.
- Without `onPress` a link is still `role=link`, `tabindex=0`, with the default cursor.

## Limits

- #174 (Components, To do, Component Bug; Mr. Biscuit, Anagha Ghotkar): Enter does not activate a Link on the web; the disabled state is not exposed (still focusable, no `aria-disabled`).
- No pressed, hover, or visited style; no `testID`, so the page targets `[role="link"]`.
- Figma has no disabled or Center + Hug variant; the package adds `disabled`.
- Dark Color Mode does not recolour Link (or Text), so the page shows no dark examples. Primary Text Appearance is low-contrast gold on white, so the page does not recommend recolouring links.

## Verification

`npm run verify` passed on 29 September 2026 (34 guides at 1280 and 390 px) on jfs-components 0.1.77; `guideKitSurvey(['link'])` returned `{}`. Planner review of desktop and 390 px captures: anatomy pins sit on the label, the underline, and the right edge of the Fill bounds (shown at 1.5×); Sizing reads 184 × 17 (Fill) and 77 × 17 (Hug) and scales to 0.72 at 390 px without horizontal scroll. Playground checked: Center centres the Fill label, a press on the empty right side of a Fill row counts, Hug + Center moves the label to the left edge, and Disabled dims the link and stops the count. In context: Terms, Privacy Policy, Continue, and Need help? each update the status line. Review fix (brief error): the Configuration Hug example first looked identical to Fill, left; it now shows Hug in a row beside other content (Recent transactions · View all).

## 0.1.78 check

Checked 1 October 2026 against `jfs-components` 0.1.78 (mirror tag `v0.1.78`, built from Biscuit's `fix/component-bugs-v0.1.78` at `5b6894b`) in headless Chrome with react-native-web 0.21.2, on a test page and on this guide. The same checks were run against 0.1.77 as a baseline.

- #174 fixed. Enter and Space on a focused link both call `onPress`. A disabled link has `aria-disabled=true` and `tabindex=-1`; 0.1.77 had `tabindex=0` and no `aria-disabled`.
