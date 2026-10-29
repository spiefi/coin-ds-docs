# TabItem (brief)

> Coin agent pack 0.1.78+9 · documented · full entry: `components/tabitem.md` (sources, all facts, flags)

Use a Tab Item inside Tabs for each view: a short label that turns black with a gold underline while its view is showing.

**Use when**
- Use a Tab Item inside Tabs for each view: a short label that turns black with a gold underline while its view is showing.

**Avoid when**
- Avoid: On its own, outside Tabs: a lone Tab Item stretches across its container with no row around it. Use it inside Tabs. Use instead: Tabs.
- Avoid: The tab would do something, such as “Download”: it sounds like a button, but tabs only switch views.
- Avoid: The tab needs a disabled state: there is none.

**Placement**
- Tabs places the tabs 16 px apart; a Tab Item is as wide as its label.

**Key rules**
- **REQUIRED** Always place a Tab Item inside Tabs.
- `label`: Set label to name the view; the label is also what screen readers say.
- `badge`: Set badge when a view needs a count: it shows the counter badge from Figma.
- `active` = `true`: Set active on the tab whose view is showing: the screen marks it, and a Tab Item never selects itself.
- `active`: Mark one tab active: one underline shows the current view.
- Avoid: `active`: Do not mark two tabs active: only the first is underlined, which may not be the view that’s showing.
- `onPress`: Handle onPress on each tab: the screen marks one active and swaps the panel when another is pressed.
- `accessibilityLabel`: Give an abbreviated label a full spoken name with accessibilityLabel, such as AY24 as “Assessment year 2024”.

**Example:** Tax years over one panel: abbreviated labels, each with a spoken name, and the showing year marked active.

```tsx
<Tabs modes={{ 'Color Mode': 'Light' }}>
  <TabItem label="AY24" accessibilityLabel="Assessment year 2024" onPress={() => {}} />
  <TabItem label="AY25" accessibilityLabel="Assessment year 2025" active onPress={() => {}} />
  <TabItem label="AY26" accessibilityLabel="Assessment year 2026" onPress={() => {}} />
</Tabs>
```

**Props:** `label`, `active`, `onPress`, `modes`, `style`, `labelStyle`, `accessibilityLabel`, `badge`, `testID`, `truncateLabel`, `isTabStop`. (* required)

**Modes it reads:** Color Mode.

**Gaps (report, do not work around)**
- The active label stays black in Dark mode (#197, To do); the guide shows Light only.
- No disabled state, icon or href.
- No hover or focus style of its own; keyboard focus shows the browser's ring.

Full entry: `components/tabitem.md`. Links: `components/tabitem.links.md`.
