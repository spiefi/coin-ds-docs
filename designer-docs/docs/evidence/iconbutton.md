# Icon Button source evidence

## Checked

28 September 2026. Declared, installed, and registry `latest` `jfs-components` are `0.1.60`. No dependency change. Board ticket #118 (Design documentation — Marcin).

## Sources

- Figma: [Coin Components Library · Icon Button](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2018-4301), frame `2018:4301` with four 42 × 42 variants: `isToggle=false, isActive=false, Property=Default` (`72:14`, gold circle with +), `isToggle=true, isActive=false, Property=Default` (`2017:3657`, gold with flash), `isToggle=true, isActive=true, Property=Toggle` (`2016:84`, white circle with black flash-off), `isToggle=false, isActive=false, Property=Glass` (`8877:1893`, translucent white on dark with white +). Bound variables: `iconButton/padding` 11, `iconButton/icon/size` 18, radius 9999, border 1 px transparent, background #cea15a, icon #0f0d0a; the same values under `toggleIconButton/*`; glass uses `State/glassIconButton/idle/background` #ffffff4d and `State/glassIconCapsule/idle/foreground` #ffffff. Read through the Figma MCP (jiofinance.in account).
- Storybook: `components-iconbutton--docs`; stories `--default`, `--toggle` (ic_flash / ic_flash_off), `--different-icons`, `--sizes` (S, M), `--appearance-modes` (Emphasis High/Medium/Low), `--disabled`, `--combined-modes`, plus `--with-remote-svg-source`, `--with-raster-source`, `--with-inline-svg-source`, `--toggle-with-sources`, `--source-shapes-comparison`.

## Contract

- Public `IconButton` props: `iconName`, `source` (fallback for non-registry icons), `onPress`, `disabled`, `loading`, `isToggle`, `isActive`, `activeIcon`, `inactiveIcon`, `activeSource`, `inactiveSource`, `accessibilityLabel` (defaults to the icon name, e.g. `ic_add` → "Add"), `accessibilityHint`, `modes`, `style`, `testID` (reaches the DOM).
- Modes: `Button / Size` M (default; padding 11, icon 18) / S / XS (both padding 5, icon 16); `Emphasis` High (default) / Medium / Low; `AppearanceBrand` Primary (default) / Secondary / Neutral / Tertiary. Hover and pressed are opacity overlays (0.85 / 0.7); keyboard focus adds a hardcoded 1 px #222 border.
- Designer-configurable: icon, size, emphasis, appearance, toggle icons and state, disabled. System-driven: shape, colours, overlays. Developer-only: `source` fallbacks, `onPress`, toggle state wiring.
- `loading` renders a same-size skeleton only inside `<SkeletonGroup loading>`.

## Rendered (installed package, web, Light)

- M: 40 × 40 (Figma 42 × 42; the 1 px border is drawn inside on the web). S and XS: 26 × 26 with a 16 px icon.
- High Primary: rgb(206, 161, 90) fill, rgb(15, 13, 10) icon. Medium: rgb(253, 232, 201) fill, rgb(147, 113, 58) icon. Low: transparent fill, rgb(173, 132, 68) icon. Secondary High: rgb(93, 0, 181) fill, white icon. Neutral High: rgb(48, 51, 56) fill, white icon.
- Toggle: `isActive` swaps only the icon (ic_flash → ic_flash_off); the fill stays gold. The `toggleIconButton/*` tokens (Active: white fill, black icon, via the `isActive` True/False collection) exist but the component never reads them.
- `role=button`, `aria-label` from the label or icon name. The toggle emits no `aria-pressed`; its default label changes with the icon ("Flash" → "Flash Off"). Disabled: opacity 0.5, `aria-disabled`, `tabindex=-1`.

## Limits

- Coin component bug: toggle Active colours never apply (toggle tokens unread); state is not exposed as pressed.
- Figma's Glass variant has no package equivalent.
- Size M renders 40 px, not Figma's 42 px; S and XS are identical.
- The page must set `accessibilityLabel` on every example rather than rely on icon-name labels.

## Verification

`npm run verify` passed on 28 September 2026 (32 guides at 1280 and 390 px). Planner review of desktop and 390 px captures: the size-consistency Do/Don't used Low emphasis, which has no fill, so the size difference was invisible; both rows now use Medium. Everything else rendered as briefed, including the toggle On state showing only the icon swap.

## 0.1.78 check

Checked 1 October 2026 against `jfs-components` 0.1.78 (mirror tag `v0.1.78`, built from Biscuit's `fix/component-bugs-v0.1.78` at `5b6894b`) in headless Chrome with react-native-web 0.21.2, on a test page and on this guide. The same checks were run against 0.1.77 as a baseline.

- #172 fixed. Toggle On reads `toggleIconButton/*` through the `isActive` True/False modes. In Light mode the fill changes from gold `rgb(206,161,90)` (Off) to white (On).
- `aria-pressed` follows `isActive`, and the derived name stays "Flash" in both states; 0.1.77 changed it to "Flash Off".
- The Glass variant and the 40 px vs Figma 42 px size gap remain open (Biscuit's note).
- Open Coin gap #179 (Components, To do, Component Bug; Mr. Biscuit, Anagha Ghotkar). A mouse click focuses the button, and IconButton then draws its `focusOverlayStyle` border (1 px, hardcoded `#222`), so a dark ring stays after clicking. `:focus-visible` is false at that point. The behaviour is the same in 0.1.77 and 0.1.78.

## 636f3f5 check

Checked 8 October 2026 against `jfs-components` 0.1.78 built from Biscuit's `main` at `636f3f5` (mirror tag `v0.1.78-636f3f5`) in headless Chrome with react-native-web 0.21.2.

- #179 fixed. After a mouse click there is no ring and the button stays 40 × 40; HelloJio Input's send button behaves the same. Keyboard focus draws a 1 px outline ring in a token colour (`mode/Grey/200`) without changing the size. Minor: on a freshly loaded page the very first Tab shows the browser's default ring instead, because the keyboard listener installs on first focus; later Tabs show the token ring.
- Still open: the Glass variant has no package equivalent, and Medium is 40 px vs Figma's 42 px.
- Guide: the Sources note gives the 5 October build and says keyboard focus draws a thin ring without changing the size, while a mouse click leaves none; checked date 8 October 2026. The brief now matches the page (toggle On state, Sources note, Limits).
