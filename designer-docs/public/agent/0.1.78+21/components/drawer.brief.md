# Drawer (brief)

> Coin agent pack 0.1.78+21 · documented · full entry: `components/drawer.md` (sources, all facts, flags)

Use a Drawer for a panel that peeks from the bottom of a screen and drags up to show more, such as recent transactions.

**Use when**
- A panel that peeks from the bottom of a screen and drags up to show more, such as recent transactions.
- Content that stays on the screen: always there, as a peek or pulled up to read more.

**Avoid when**
- Avoid: Something people close or dismiss: a Drawer never closes; collapsed is its smallest size.

**Placement**
- The drawer spans the screen it sits in.
- Its content starts 71 px below the top of the sheet, as in Figma.
- In the guide, the drawer peeks under the home screen; people drag it or press its handle to expand it, and the screen’s See all transactions button opens it too.

**Key rules**
- `collapsedHeight`: Set how much of the drawer peeks when collapsed (collapsedHeight), so the title and the first item show.
- `collapsedHeight`: Collapsed, it shows 200 px by default.
- `expandedRatio`: Expanded, it is 90% of its screen’s height (expandedRatio), and never more than 95%.
- `showOverlay`: With a scrim (showOverlay), the screen dims behind the drawer and taps on it don’t get through.
- With the scrim on, onOverlayPress is called when the scrim (the area outside the sheet) is pressed.
- `state`: To open or collapse it from the screen, pass state: the drawer animates to it, and drags and handle presses are reported through onStateChange for the screen to apply back.
- `title`: Give it a title: the title says what’s inside and names the drawer for screen readers.
- On the web it’s a dialog named by its title.

**Example:** Recent transactions on a home screen, the guide's In context: the drawer peeks under Home (140 px here) with its title and the first transaction. People drag it or press its handle to expand it, and the screen's See all transactions button opens it too. The screen keeps the drawer's state in its own state: the button sets it to expanded, and onStateChange reports drags and handle presses for the screen to apply back. The literal state and the empty handlers here are placeholders for that wiring. The drawer fills the Screen it sits in.

```tsx
<Screen>
  <VStack alignHorizontal="center">
    <Text text="Home" />
    <Button label="See all transactions" onPress={() => {}} />
  </VStack>
  <Drawer
    title="Recent transactions"
    collapsedHeight={140}
    state="collapsed"
    onStateChange={() => {}}
  >
    <ListGroup>
      <ListItem layout="Horizontal" title="Netflix" supportText="25 March · 17:30" trailing={<MoneyValue value="500" currency="₹" />} onPress={() => {}} />
      <ListItem layout="Horizontal" title="Spotify" supportText="24 March · 09:12" trailing={<MoneyValue value="119" currency="₹" />} onPress={() => {}} />
      <ListItem layout="Horizontal" title="Amazon" supportText="22 March · 21:04" trailing={<MoneyValue value="1,299" currency="₹" />} onPress={() => {}} />
    </ListGroup>
  </Drawer>
</Screen>
```

**Props:** `modes`, `style`, `title`, `header`, `children`, `collapsedHeight`, `expandedRatio`, `initialState` (expanded | collapsed), `state` (expanded | collapsed), `contentStyle`, `sheetStyle`, `accessibilityLabel`, `accessibilityHint`, `contentContainerStyle`, `showsVerticalScrollIndicator`, `bottomInset`, `onStateChange`, `showOverlay`, `onOverlayPress`. (* required)

**Modes it reads:** Color Mode, Page type.

**Gaps (report, do not work around)**
- The published Storybook (built 17 October) predates the 23 October Drawer fixes: on the web there, its expanded content doesn't scroll.

Full entry: `components/drawer.md`. Links: `components/drawer.links.md`.
