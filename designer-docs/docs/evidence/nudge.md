# Nudge source evidence

Package, Figma, Storybook, and browser evidence for the Nudge guide (board ticket #62, Design documentation — Marcin; Storybook coverage — Biscuit, done).

## Check

Checked 7 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-3795b4c` (Biscuit's `main` at 3795b4c). At 636f3f5 `Nudge.tsx`, its stories, and its mdx are unchanged; that commit changes only what Nudge renders inside it (IconButton's focus ring, Dark close-icon colour #ff9900 → #f1f1f1, Dark System icon colours).

- Figma: [Coin Components Library · Nudge](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=9177-4104), node `9177:4104`. A component set with one variant property, `type`: `stacked-prominent` (344 × 91), `inline-compact` (344 × 88; its 64 px slot holds 32 px of content), `stacked-detailed` (344 × 202; header plus a slot of four List Items, no button or close). Prominent and compact always show the close Icon Button (28 × 28). Padding 12, gap 6, title→body 4, text→button 8; title 14/15 bold #1e1a14, body 12/16 medium #1a1c1f, sparkle icon 20 px #5d00b5 on a #ffffff card; Button 66 × 24 (12 px label, #303338). "Nudge Old do not use" is a separate, deprecated set.
- Storybook (published `index.json`): `components-nudge--docs`, `--default`, `--without-icon`, `--with-custom-button`, `--with-close-button`, `--inline-compact`, `--inline-compact-with-close`, `--stacked-detailed`. The published page equals the upstream source (old generated outline, 15-collection table, no anatomy, do/don't, or accessibility). Biscuit's board note on #62 (7 October) says the page was rewritten to the Button outline; that rewrite is not on `main` (636f3f5) or any pushed branch. Story meta sets `Context: 'Nudge&Alert'` and `AppearanceBrand: 'Neutral'`, but the Default story overrides them to `Context: 'Default'` and `Primary`, so its button is the large size.
- Package: `Nudge` with `type` (default `'stacked-prominent'`), `title` (default "Split payment"), `body` (default "Split this transaction into installments"), `buttonLabel` (default "Button"), `onPressButton`, `buttonSlot`, `showClose` (default false), `onClose`, `closeSlot`, `startSlot` (default the `ic_ai_sparkle` icon; `null` removes it), `children` (replaces title, body, and button in prominent; body and button in compact; the list in detailed), `modes`, `style`. No `testID`, `accessibilityLabel`, or rest props. Slot children get the Nudge's modes. Per type: compact never renders `title`; detailed ignores `body`, the button props, and the close props. `buttonSlot={null}` still renders the default "Button". The close button is always `IconButton ic_close`, labelled "Close", with forced Neutral / Low / S modes. `onClose` only reports the press; the consumer removes the nudge.
- Modes: colour from `Semantic Intent` (Brand | System) × `AppearanceBrand` (Primary, Secondary, Neutral, Tertiary) or `AppearanceSystem` (positive, warning, negative) × `Color Mode`; `Border Boolean` (False | True); `Nudge padding` (Default | None); `Context` changes only the inner Button: `Nudge&Alert` gives Figma's small button. The title colour `nudge/title/color` is a literal #1e1a14 in every mode. `nudge/radius` is a dangling alias (resolves to null); the code falls back to 12.

## Browser measurements (Chrome, react-native-web 0.21.2, Light, 344 px column)

- Fills its container; height follows content. Padding 12, gap 6 (icon → content → close), title → body 4, text → button 8, radius 12, 1 px transparent border.
- Prominent with `Context: 'Nudge&Alert'`: 344 × 96; title 14/17 bold, body 12/16 medium, icon 20 × 20 at 13,13; button 54 × 25 for "Split" (padding 4 × 12, 12 px label). With `Context` unset: 344 × 113, button 42 px tall (padding 8 × 20, 16 px label).
- Compact: 344 × 52, items centred; body and button in one row; close 26 × 26.
- Detailed (two List Items): 344 × 128; header row icon + title; the list below spans the card.
- Close (`showClose`): 26 × 26 transparent IconButton, 16 px icon #24262b, centred vertically in a 26 px column. Pressing it calls `onClose`; the card stays until the screen removes it. After a mouse click the IconButton keeps a dark 1 px focus border (#179).
- Long copy wraps: a two-line title and body with a close button make the card 129 px.
- Light colours (card / body / icon / button): Primary #fef4e5 / #1e1a14 / #ad8444 / #cea15a (dark label); Secondary #f6f3ff / #22004a / #5d00b5 / #5d00b5; Neutral #ffffff / #1a1c1f / #545961 / #303338; Tertiary #ecf7ff / #001d2e / #026b9a / #036b99; System warning #ffe3d6 / #000000 / #f06e0f / #f06e0f. `Border Boolean: True` adds a #ebebed border. No mode reproduces Figma's white card with a purple icon.
- Dark (Primary): card #120d05, body #fce8cc, but the title stays #1e1a14: about 1.1:1, effectively invisible.

## Accessibility (web)

- The card is a plain `div` with no role or name; the title has no heading role; the sparkle icon is hidden from assistive tech.
- The button is `role="button"` named by its label; the close button is `role="button"` named "Close" (not overridable). Enter and Space activate them only when `onPressButton` / `onClose` are set; without them the button is focusable but does nothing.
- No announcement or focus management when a nudge is removed.

## Classification

- Designer-configurable: type, title, body, button label, close button on/off, icon on/off, appearance (`AppearanceBrand`, or `Semantic Intent: System` with `AppearanceSystem`), border, `Context: Nudge&Alert` for the small button.
- System-driven: full width, height from content, spacing, colours per mode.
- Developer-only: `onPressButton`, `onClose` and removing the card, `buttonSlot`, `closeSlot`, custom `startSlot`, `style`, `Nudge padding`.
- Not shown: Dark mode, `Nudge padding: None`, custom button or close slots, `style`.

## Coin gaps

- #206 (Component Fix, To do, Component Bug; Mr. Biscuit, Anagha Ghotkar): close shown in every Figma prominent/compact variant but off by default in code; the Figma button size needs `Context: Nudge&Alert`, which Nudge doesn't set; no mode matches Figma's white card with purple icon; `buttonSlot={null}` can't remove the button; placeholder default copy; detailed silently ignores button/close props and compact ignores `title`; `nudge/radius` alias dangling; card has no role/name/testID; the Storybook rewrite is not on `main`.
- #208 (Components, To do; Marcin Śpiewak), token problem shared with Note Input and Segmented Control: `nudge/title/color` is a literal #1e1a14 in Dark.
- Existing: #179 (IconButton keeps a focus border after a click); #177 (Dark close icon orange, fixed upstream).
