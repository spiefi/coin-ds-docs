# Form Upload source evidence

Package, Figma, Storybook, and browser evidence for the Form Upload guide (board ticket #12, Design documentation — Marcin; Storybook coverage — Biscuit, done). Add Item (`additem.md`) documents the cell on its own.

## Check

Checked 2 October 2026. Declared and installed `jfs-components` is `0.1.78`, built from Biscuit's `main` at `3795b4c` (mirror tag `v0.1.78-3795b4c`); `npm run coin:status` reports the mirror up to date.

- Figma: [Coin Components Library · FormUpload](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=7217-11616), node `7217:11616`. A single component (no variants), 328 × 93, vertical, gap 8.
  - Properties: `Label` (boolean, on; text "Attachments"), `Support Text` (boolean, on; "Supported file types: .jpg, .png, .pdf (max 5MB)"), `Slot` (slot, preferred value the Additem set).
  - Default slot: six `additem` cells in one clipped row with no wrap (gap 8); cells 1, 2, 4, 5, 6 are previews and cell 3 is empty. Cell 45 × 44, fill `#ebebed`, radius 8, padding 6/8; preview image 33 × 28; remove capsule 18 × 18 `#545961` with a 12 px white close glyph at the top right; empty cell a 29 × 29 capsule with an 18 px plus.
  - No error or disabled variants or properties.
- Storybook (published index): `components-formupload--docs`; stories `--default`, `--with-previews`, `--disabled`, `--invalid`, `--with-custom-slot`, `--inside-form`. Upstream source also has `at-max-count`, not deployed yet. Stories use a mock picker that returns one sample photo per tap.
  - MDX: use for a labelled attachment row (ID proof, receipts, photos); FormField for typed values. The app owns the attachment list (`onAttachmentsChange`) and injects the `picker`. Cap with `maxCount`; without it the add cell stays after every add. Show the error as text, not colour alone. Labels name the attachment ("Attachments", "ID proof", "Receipt") and do not start with "Upload" or "Your"; support text gives types or size; error text says how to fix it.
- Package: public `FormUpload` accepts `label`, `supportText`, `name` (Form integration), `attachments` (controlled list of `{ uri, name?, type?, size?, width?, height? }`), `maxCount`, `onAttachmentsChange`, `picker`, `errorMessage`, `isInvalid`, `isDisabled`, `children` (replaces the generated cells), `modes`, `style`, `rowStyle`, `accessibilityLabel`, `testID`.
  - Each attachment renders a preview `Additem` (`testID-item-N`) with a remove control; one empty `Additem` (`testID-add`) follows while `attachments.length < maxCount`, or always when `maxCount` is unset. Picked assets beyond `maxCount` are dropped.
  - Previews render `uri` as an image (cover). There is no file icon or name, so non-image files have no thumbnail. File type and size are not checked.
  - `errorMessage` replaces `supportText` only while `isInvalid` (or a Form error) is set. Invalid changes nothing else: the cells keep their colours.
  - `isDisabled` sets opacity 0.5 on the field and again on each cell, and blocks add and remove.

## Browser measurements (Chrome, react-native-web 0.21.2, Light)

- Cells 44 × 44 (Figma 45 × 44), `rgb(235,235,237)`, radius 8, padding 8/6, 8 px apart; preview image 32 × 28. The row fills its container and wraps (eight previews plus the add cell make two rows in 360 px). Label 14/17 medium; support text 12/16 with a 16 px icon; 8 px between label, row, and support text.
- Add cell: a button named "Add attachment"; with the mock picker each press adds one preview. With `maxCount={3}`, the add cell disappears after the third file.
- Remove control: an 18 × 18 dark capsule inside the preview button (a button nested in a button, which React warns about). It removes the file on touch only: a mouse click and Enter do nothing, and it has no accessible name. Each preview button is named after the file's `name`.
- Error: support text turns red `rgb(245,0,48)` with a warning icon; cells unchanged. Disabled: field opacity 0.5 and each cell 0.5 again (about 25 % overall); cells get `aria-disabled` and leave the tab order.
- The wrapper has `role="presentation"`, so its `aria-label` (the label) does not name the group; the add button does not say which field it belongs to.
- Coin gap ticket filed for the remove control, the doubled disabled opacity, and the unnamed group: #188 (Components, To do, Component Bug; Mr. Biscuit, Anagha Ghotkar). Dark mode is not shown.

## 636f3f5 check

Checked 8 October 2026 against `jfs-components` 0.1.78 built from Biscuit's `main` at `636f3f5` (mirror tag `v0.1.78-636f3f5`) in headless Chrome with react-native-web 0.21.2.

- #188 fixed. Remove is a button named "Remove Receipt 1", placed next to the preview button rather than inside it, and React no longer warns about a nested button. A mouse click and Enter both remove the file, and a standalone Additem's remove doesn't trigger open. Disabled cells render at 0.5 opacity once, with the label at full opacity. The field is a group named "Receipts", and the add button is named "Receipts, add attachment".
- From the installed source: `testID-item-N` now lands on a wrapper that holds the preview button and the remove button as siblings, so the anatomy's Remove pin targets `[aria-label="Remove Receipt 2"]` instead of `button` (which would now match the preview).
- Guide: the Sources note now says the field is a named group, the add cell names its field, and remove is a named button that works with a click, a tap, or Enter; "disabled fades the cells twice" is now "half opacity". The States description and the Disabled example say the cells fade and the label stays at full contrast. The Remove anatomy note says it is a button named after the file.
