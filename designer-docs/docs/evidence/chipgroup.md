# Chip Group source evidence

Package, Figma, Storybook, and browser evidence for the Chip Group guide (board ticket #93, Design documentation — Marcin; Storybook coverage — Biscuit, done).

## Check

Checked 6 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-3795b4c` (Biscuit's `main` at 3795b4c). `ChipGroup.tsx` is identical to upstream. Biscuit's `main` is now at 636f3f5; it changes neither ChipGroup nor ChipSelect, nor any chip token.

- Figma: [Coin Components Library · Chip group](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1905-5123), node `1905:5123`. A single component (not a set), 370 × 32, no properties. One "Slot" holding three Idle `Chip/Select` instances in one row with 8 px gaps: Date (`ic_calendar_week`, 84), Status (`ic_status_loading`, 96), Payment methods (`ic_payments`, 174). Bound tokens: `chipGroup/gap` 8 plus the chipSelect tokens. Whether the slot wraps could not be read.
- Storybook (published `index.json`): `components-chipgroup--docs`, `--default`, `--with-active-state` (all upstream stories). The published docs page is the old generated one; the hand-written mdx from cf988472 is not published. The published stories render ChipSelect without button semantics (older build) and use icon names `ic_loader` and `ic_rupee_sign`, which are not in the icon registry, so Status and Payment methods show no icon and are 20 px narrower.
- Upstream mdx (cf988472, unpublished) guidance: "the wrapping row for ChipSelect filters… It does not own selection"; one filter → a ChipSelect alone; a mutually exclusive choice → SegmentedControl; "Keep each label a short filter name… Sentence case"; "The row is not an accessibility group." It also calls FilterBar "search + chips", which the FilterBar code does not support (see `filterbar.md`); the guide does not repeat it.
- Package: public `ChipGroup` props `children`, `modes`, `style`, `testID` only, no rest props. No `items`, `value`, `onChange`, `active`, `disabled`, role, or label. Each ChipSelect owns `active` and `onPress`; the group tracks nothing.

## Behaviour (Chrome, react-native-web 0.21.2)

- Layout: `flexDirection: row`, `flexWrap: wrap`, `alignItems: flex-start`, gap 8 px both ways (`chipGroup/gap`, single-mode collection). No padding, scroll, truncation, or overflow menu. Width = parent width in a column parent; rows are 32 px.
- Web chip widths: Date 85.8, Status 99, Payment methods 181.4 (Figma 84 / 96 / 174). Figma's three chips need 382.2 px: one row at 390 px (7.8 px spare), two rows (2 + 1) at 370 and 328 px. Six chips: 3 + 3 at 390, 2 + 2 + 2 at 328 (328 × 112).
- An Active chip with its close icon is 20 px wider, so a row can re-wrap when filters apply.
- In a row parent or a horizontal ScrollView the group takes its content width and never wraps (743 px for six chips). A chip wider than the parent (long label) overflows with no truncation.
- Modes: every element child gets `{ ...groupModes, ...childModes }` (child wins, per key); Fragments are flattened; strings and numbers are dropped silently. `ChipSelect State` cannot be set from the group.
- Accessibility: the row is a plain `div` with no role and no name, and none can be passed. Each chip is a `<button>` with `aria-label` and `aria-pressed`, so selection reads as separate toggles, not one choice. Tab visits every chip in order; arrows do nothing; Enter, Space, and click press a chip.
- ChipSelect's `icon` defaults to `ic_calendar_week`, so a chip without an `icon` shows a calendar.
- Dark: the Active chip background (`mode/Purple/2400` Dark, rgb(15,13,10)) is almost the Idle background (rgb(13,13,15)); Active and Idle differ only by text and icon colour. Not changed at 636f3f5.

## Classification

- Designer-configurable: which ChipSelects the group holds, in what order, and each chip's label, icon, and Active state; the group's Color Mode (cascades to chips).
- System-driven: 8 px gaps, wrapping, left alignment, full width.
- Developer-only: `style`, `testID`.
- Not shown: Dark mode, horizontal scrolling, non-chip children, a group label.

## Coin gaps

- #199 (Component Fix, To do, Component Bug, low; Mr. Biscuit, Anagha Ghotkar): no role or accessible name for the group, and none can be passed; stories/mdx use missing icons `ic_loader` and `ic_rupee_sign` (published Storybook shows chips without icons); the published docs page is not the hand-written mdx; a long chip overflows the group with no truncation.
- #201 (Components, To do, low; Marcin): token `mode/Purple/2400` Dark is near-black, so Active chips look Idle in Dark.
