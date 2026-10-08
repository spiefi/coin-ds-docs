# Tabs source evidence

Package, Figma, Storybook, and browser evidence for the Tabs guide (board ticket #45, Design documentation — Marcin; Storybook coverage — Biscuit, done). Tab Item has its own guide and evidence (`tabitem.md`, ticket #153).

## Check

Checked 5 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-3795b4c`, built from Biscuit's `main` at 3795b4c; `npm run coin:status` reports the mirror up to date with upstream. `Tabs.tsx` and `TabItem.tsx` are identical to upstream.

- Figma: [Coin Components Library · Tabs](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3063-136), node `3063:136`. One component (not a set), 268 × 34, with a slot of four "Tab item" instances. Items hug their labels with 16 px gaps; the first is active (black label, gold 2 px underline, counter badge "99"), the others idle with the badge hidden. The fourth item is clipped at the frame edge. Variables: `tabs/gap` 16, `tabs/padding/*` 0.
- Storybook (published `index.json`, built 1 October 2026 09:52 GMT, before the 0.1.78 release commit): `components-tabs--docs`; stories `--default`, `--with-labels`, `--scrollable`, `--all-idle`; also `components-rangetrack--scrollable-tabs`. The published pages show the pre-0.1.78 content (placeholder "Tab item" labels in Default and All Idle). The handwritten upstream `Tabs.mdx` (not deployed) says Tabs does not own selection, has no hug API for the non-scrollable row, no disabled or loading prop, and no arrow-key roving tabindex.
- Package: public `Tabs` accepts only `children` (TabItems), `modes`, `scrollable` (default `false`), and `style`. No `value`, `onChange`, `testID`, or rest props. The screen owns selection through `active` and `onPress` on each TabItem. Tabs clones direct TabItem children (`child.type === TabItem`), merging its `modes` under the item's and, when not scrollable, giving each `flex: 1`. Wrappers and Fragments around TabItems are not recognised. With `scrollable`, the row is a horizontal ScrollView, items hug their labels, and `style` lands on the content container, not the viewport. RangeTrack is the only other component that renders Tabs.
- Tokens: `tabs/gap` 16, `tabs/padding/*` 0. Tabs has no mode collection of its own; TabItem's collection is Color Mode. Tabs and TabItem never call `useTokens`, so `JFSThemeProvider` has no effect; only `modes` works.

## Browser measurements (Chrome, react-native-web 0.21.2)

- Equal width in a 328 px host: three tabs are 98.7 px each, four are 70 px, six are 41.3 px. Six equal tabs overlap their labels ("Received" needs 62 px); the row clips, so there is no page scroll.
- Scrollable: tabs hug their labels ("All" 16.6 px, "Sent" 31.5, "Received" 62.4, "Pending" 55.4, "Failed" 40.2, "Refunded" 66) with 16 px gaps; the row scrolls sideways with no scrollbar or edge hint.
- Each tab is 33 px tall: a 14/17 px label with 8 px above and below. The active label is black `rgb(0,0,0)`, idle `rgb(48,51,56)`; the underline is 2 px, radius 99, `rgb(206,161,90)`, spanning the tab's full width.
- DOM: `role="tablist"` (unnamed) holding `role="tab"` elements with `aria-label` from `accessibilityLabel ?? label` and `tabindex=0`. In scrollable mode the tabs sit one wrapper below the tablist.
- Pressing dims a tab to 70% opacity; there is no hover style. Keyboard focus shows the browser's default ring.

## Coin gaps

- #194 (Component Fix, To do, Component Bug; Mr. Biscuit, Anagha Ghotkar): no `aria-selected` on any tab, because RNW 0.21.2 does not map `accessibilityState.selected`; Space does not select (Enter does); no arrow, Home, or End keys, and every tab is a Tab stop; the tablist has no name; no `testID`; `JFSThemeProvider` ignored; Figma's counter badge and hug layout have no code equivalent; two `active` items both render selected; the published Storybook predates 0.1.78.
- #197 (Components, To do; Marcin): `tabItem/active/label/color` is black in Dark mode too. The guide shows Light only.

## 636f3f5 check

Checked 8 October 2026 against `jfs-components` 0.1.78 built from Biscuit's `main` at `636f3f5` (mirror tag `v0.1.78-636f3f5`) in headless Chrome with react-native-web 0.21.2. The docs moved to this build to publish other fixes; the Tabs ticket #194 is still In progress.

- From #194 (mostly fixed, back in In progress on 8 October): tabs hug their labels with 16 px gaps, as in Figma (Overview 62.4, Activity 50.8, Details 46.9 px in a 328 px row). `aria-selected` is true or false; Space selects; the arrow keys, Home, and End move focus and select; the tab list is named by `accessibilityLabel`; `testID` works; provider modes apply; `badge` shows a CounterBadge; a second `active` item is ignored (only the first is selected).
- Still open (#194): every tab is its own Tab stop (all `tabindex=0`, no roving tabindex). Six labels in a 330 px fixed row now clip the last tab (“Refunded” is cut at the edge) instead of overlapping; there is no truncation or minimum width.
- Regression #209 (Component Fix, To do): Enter calls a tab’s `onPress` twice. Selecting the same tab twice has no visible effect.
- Guide: the playground’s Layout options are now One row and Scrollable. Configuration, Sizing (size mark moved to the top so its label clears the 16 px gap label), the Tab row note, the “Select two tabs” and “Squeeze six tabs into one row” Don’ts, and the Sources note describe hugging tabs, the badge, single selection, the keyboard support, and the clipped last tab.
