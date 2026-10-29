# AppBar (brief)

> Coin agent pack 0.1.78+5 · flagged · full entry: `components/appbar.md` (sources, all facts, flags)

Keep page identity, navigation and a few relevant actions together at the top of a view.

**Use when**
- Keep page identity, navigation and a few relevant actions together at the top of a view.

**Placement**
- Place the App Bar at the top of a view.
- The host sets the available width; AppBar derives its height from its padding and children.
- `actionsSlot`: At up to 360px of content width, one focused action leaves room; longer titles or extra actions compete with the side slots.
- Let the product flow own navigation state: AppBar presents the current destination and invokes the child actions the flow supplies.

**Key rules**
- `type` = `MainPage`: Choose the page relationship first: the main page type gives a view its identity.
- `type` = `SubPage`: Use the sub page type for a child destination: it supplies a back relationship and centers its title independently from the side slots.
- Avoid: `type` = `MainPage`: Do not give a detail view the main page identity: JioDot and an empty middle slot describe a top-level destination, not a child page.
- `leadingSlot`: For a main page, the published story pairs JioDot with low-emphasis add and Avatar actions and leaves the middle slot empty.
- `leadingSlot`: A main page has no default leading node: pass JioDot, or another mark, in leadingSlot.
- `leadingSlot`: On a sub page, supply an accessible back action: an IconButton with a Go back label in leadingSlot, so the leading action has a clear accessible name.
- `middleSlotWidth`: The sub page middle slot is 192 px wide by default; middleSlotWidth changes it and has no effect on a main page.
- `actionsSlot`: Keep actions focused: one low-emphasis action leaves the destination and the next step easy to scan.

**Example:** A child destination: a named Go back action, a short centered title, and one low-emphasis action.

```tsx
<AppBar
  type="SubPage"
  modes={{ 'Color Mode': 'Light', Context2: 'AppBar', 'Page type': 'SubPage' }}
  leadingSlot={
    <IconButton
      iconName="ic_arrow_back"
      accessibilityLabel="Go back"
      onPress={() => {}}
      modes={{ 'Color Mode': 'Light', Context2: 'AppBar', 'Page type': 'SubPage' }}
    />
  }
  middleSlot={
    <Text numberOfLines={1} modes={{ 'Color Mode': 'Light', Context2: 'AppBar', 'Page type': 'SubPage' }}>
      Payment details
    </Text>
  }
  actionsSlot={
    <IconButton
      iconName="ic_more_horizontal"
      accessibilityLabel="More options"
      onPress={() => {}}
      modes={{ 'Color Mode': 'Light', Context2: 'AppBar', 'Page type': 'SubPage', Emphasis: 'Low' }}
    />
  }
/>
```

**Props:** `type` (MainPage | SubPage), `leadingSlot`, `middleSlot`, `middleSlotWidth`, `actionsSlot`, `modes`, `onLeadingPress`, `style`, `accessibilityLabel`, `accessibilityHint`. (* required)

**Modes it reads:** Color Mode, context 10, Context2, context5, List Item Style, NavArrow Direction, Page type, Profile Card Appearance.

**Gaps (report, do not work around)**
- The default sub page back arrow has no accessible name: its button passes no accessibilityLabel.
- Figma's main page shows the JioDot mark; the package renders none unless leadingSlot is given JioDot.
- Figma's fixed reference heights (main page 68 px, sub page 52 px) are not fixed in code: the bar's height comes from its padding plus its children.
- A long sub page title is constrained by the centered 192px middle box and clips or truncates.

Full entry: `components/appbar.md`. Links: `components/appbar.links.md`.
