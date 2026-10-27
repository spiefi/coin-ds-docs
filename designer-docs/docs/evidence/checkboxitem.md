# Checkbox Item source evidence

Package, Figma, Storybook, API, and verification evidence for this guide. Split from the former `docs/SOURCE_EVIDENCE.md` on 26 September 2026; implementation notes about anatomy markup predate the guide-kit migration.

## dbe0e02 publish (28 October 2026, #357, #409)

The docs now install mirror tag `v0.1.78-dbe0e02` (Biscuit's `main` at dbe0e02, 27 October). #357 verified 27 October on ace46ca (run_c79cb190) and again on dbe0e02 (run_beaf2324); #409 verified on dbe0e02 (run_beaf2324); both closed by Marcin and published to the docs 28 October in Penny run run_92acfa9d. Where the sections below say otherwise, this section replaces them.

- On the web each row is one focusable `role="checkbox"` with `aria-checked` and one Tab stop; the inner box is `role="presentation"` and `aria-hidden`, so there is no nested checkbox. Space and Enter toggle once (plain, Text + Link, trailing, controlled, group rows, ExpandableCheckbox). Disabled: `aria-disabled`, `tabindex -1`, skipped by Tab. A Link or an end-slot Button keeps its own Tab stop and doesn't toggle the row.
- A focused row shows the browser's focus outline; the box's Figma Focus state (green spread) no longer appears because the box isn't a Tab stop. A standalone Checkbox is unchanged (Space does nothing, no `aria-checked`): a known gap outside these tickets.

Guide changes (legacy `src/CheckboxItemGuide.tsx`): the Control anatomy target is now `[role="checkbox"] > [role="presentation"]` (the old nested-checkbox selector matched nothing); Sources: 28 October, installed 0.1.78 (27 October build) instead of 0.1.60, and the row is one checkbox with one Tab stop that announces its state, toggled once by Space, Enter or a click.

## Batch check

Checked 23 September 2026. `designer-docs/package.json` declares `jfs-components@0.1.60`; the resolved local install is `0.1.60`, and a fresh `npm view jfs-components version` returned registry `latest=0.1.60`. No dependency change was made. The four canonical Storybook docs IDs and their cited stories were confirmed in the published index. All examples use public Coin exports and component-owned modes; the annotation frames and callouts are documentation chrome.

### Checkbox Item

- Figma: [Checkbox Item master](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4303-8392), node `4303:8392`, exposes Control Leading/Trailing, label slot, and optional EndSlot. The reference width is 256px with Hug height; the nested Checkbox is 18px and the end slot is 80px. These are source measurements, not a fixed package row width.
- Storybook: [Checkbox Item docs](https://jfs-components-storybook.vercel.app/?path=/docs/components-checkboxitem--docs) with default, string label, custom slot, end slot, trailing, trailing with end slot, interactive, and long-label stories. The package row fills its host, prefers `children` over legacy `label`, and forwards owner modes to slot children. With Trailing control, the end action appears first and Checkbox last. A string label wraps in the checked implementation; the story name does not establish ellipsis behavior.
- In the local React Native Web preview, clicking the Details Button updated only its documentation status; the row stayed unselected. Clicking the row toggled selection. The row and nested Checkbox both expose checkbox roles, duplicating semantics. The focused row toggled on Enter but did not toggle after both locator Space and native browser `space` key input; this is a package/platform limitation left unpatched. The public action uses Button Size XS through the owner modes to fit the documented 80px slot.

### Local visual evidence limit

- The primary reviewer inspected rendered anatomy at 1095×1080 for all four guides. Badge and Checkbox Item use left/top/right short, straight leaders for their three parts. Checkbox uses left Boundary/top Checkmark; Brand Chip uses left Avatar/top Label. Each line and equal numbered marker is positioned from rendered public component bounds. No elbow paths remain in this batch, and no product component was resized or restyled for the diagrams.
- Each guide now shows four standalone Do/Don’t pairs, 16 pairs across the batch. The primary reviewer inspected every rendered pair at 1095×1080. The Brand Chip long-label example deliberately exceeds its 240px dashed host while the full public chip stays visible within the comparison preview; the document did not gain horizontal overflow (`scrollWidth=1095`). The examples use public Coin components and their exposed props, not recreated product UI.
- Before the Do/Don’t expansion, desktop viewport and section captures were inspected for all four guides. At a measured 390px DOM viewport, all four pages had `documentElement.scrollWidth=390`, and the Checkbox long label retained an 18×18px control. The in-app browser returned a malformed narrow screenshot (page content scaled into the upper-left with a large blank area); mobile fit and matching-width screenshot visual QA for the expanded sections remain pending.
