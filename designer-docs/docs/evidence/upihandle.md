# UPI Handle source evidence

Package, Figma, Storybook, and browser evidence for the UPI Handle guide (board ticket #100, Design documentation — Marcin; Storybook coverage — Biscuit, done).

## Check

Checked 1 October 2026. Declared and installed `jfs-components` is `0.1.77` from the private package repository. The newest mirror tag is `v0.1.78`, and UpiHandle is unchanged in it.

- Figma: [Coin Components Library · UPI Handle](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=262-893), node `262:893`, 144 × 29. It contains a 23 px image, the label "shrutirai-1@jio", and a trailing 12 px `ic_copy` icon on a grey pill.
- Storybook: `components-upihandle--docs`; stories `--default`, `--without-image`, `--with-raster-avatar`, `--with-remote-svg-avatar`, `--with-inline-svg-avatar`, `--with-local-require`, `--with-uri-object`, `--multiple-handles`, `--without-icon`, `--pressable-handle`, `--disabled`, `--disable-truncation`.
  - The handwritten docs cover when to use it, variants, do and don't, content, states, accessibility, and limitations. They say: show a real VPA or number, put copy or scan on the pill, hide the icon when there is no action, do not set the `UPI Handle Image` mode, and do not wrap the pill in another Pressable.
  - They name `ic_copy` for copy, `ic_scan_qr_code` for scan, and `ic_confirm` for a verified handle.
  - They state that `accessibilityLabel` is forced to `undefined`, so the pill may have no accessible name.
- Package: public `UpiHandle` accepts `label` (default "Label"), `modes`, `showIcon` (default true), `iconName` (default `ic_scan_qr_code`), `source` (URI, inline SVG XML, `require`, component, or element), deprecated `avatarSource`, `accessibilityLabel` (ignored), `accessibilityHint`, `onPress` and its alias `onClick`, `disabled`, `disableTruncation`, and View props including `testID`.
  - `source` presence forces the `UPI Handle Image` mode.
  - Avatars are never tinted.
  - Pressed scales the pill to 0.98.

## Browser measurements (Chrome, react-native-web 0.21.2)

- The pill is 29 px tall, background `rgb(245,245,245)`, fully rounded, with padding 3 px vertical and 14 px at each end (4 px on the left before an avatar). The avatar is 23 × 23 and the icon 12 × 12. The pill hugs its content: "shrutirai-1@jio" with an icon is 130 × 29, and "priya@jio" with an avatar and an icon is 120 × 29. In Dark mode the background is `rgb(13,13,15)`.
- The pill does not shrink: in a 140 px column, "very-long-upi-handle-id@jio" keeps a 213 px width and overflows. There is no `style` prop.
- With `onPress`: `tabindex=0`, no role, and no `aria-label` even when `accessibilityLabel` is set. Enter and click activate it. A mouse click focuses it and adds a 1 px `#222` border that grows the pill to 102.5 × 31 (a 2 px layout shift).
- With `onPress` and `disabled`: `aria-disabled` and `tabindex=-1`, but it looks unchanged (opacity 1).
- Coin gap #182 (Components, To do, Component Bug; Mr. Biscuit, Anagha Ghotkar) covers the missing role and name, the unchanged disabled look, the click border and layout shift, the overflow, and the Figma icon difference (Figma `ic_copy`, package default `ic_scan_qr_code`).
- Guide sample avatar: an inline SVG monogram passed as `source` (sample content, not a product asset).

## 636f3f5 check

Checked 8 October 2026 against `jfs-components` 0.1.78 built from Biscuit's `main` at `636f3f5` (mirror tag `v0.1.78-636f3f5`) in headless Chrome with react-native-web 0.21.2.

- #182 fixed. A pressable pill is a button named by `accessibilityLabel` ("Copy priya@jio"), and Enter works. Disabled renders at 0.5 opacity with `aria-disabled` and `tabindex -1`. A mouse click shows no ring and the pill stays 100.5 × 29. Tab shows a 1 px outline ring in a token colour, with no layout shift. Long handles truncate with an ellipsis inside 140 px, and the new `style` prop constrains the pill.
- From the installed source (not browser-checked): without `accessibilityLabel` the name falls back to `label`; the pill now has `maxWidth: '100%'` and `flexShrink: 1`, and the label truncates to one line unless `disableTruncation` is set.
- Still open (not in the ticket's Expected): the default icon is still `ic_scan_qr_code`, while Figma uses `ic_copy`.
- Guide: States and the Disabled example say a disabled pill is dimmed and skipped by keyboard focus. Sizing says a long handle ends in an ellipsis and adds a "Long handles truncate" example (`style={{ maxWidth: 140 }}`). Content asks for an action label such as "Copy priya@jio", and every Copy pill, the Disabled example, and the In context pill now set one. The Sources note gives the 5 October build and describes the button role, name, and focus ring instead of the old gaps; checked date 8 October 2026. The brief matches.
