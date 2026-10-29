# IconButton (brief)

> Coin agent pack 0.1.78+8 · flagged · full entry: `components/iconbutton.md` (sources, all facts, flags)

Use an Icon Button for a frequent, well-known action where an icon alone is clear, such as add, share, or close.

**Use when**
- A frequent, well-known action where an icon alone is clear, such as add, share or close.

**Placement**
- The button is a fixed square: it never stretches with its container.
- In the guide's statement-card example, Icon Buttons sit together at the end of a row; the strongest one is the main action, and the screen handles each press.

**Key rules**
- **REQUIRED** `accessibilityLabel`: Always set accessibilityLabel: without a label, the accessible name is the icon's name.
- `Emphasis` = `High`: Use Emphasis High for the main action in a group and Medium or Low for the rest.
- `Emphasis`: Emphasis sets how loud the button is: it steps the fill from solid gold (High) to tint (Medium) to none (Low).
- Avoid: `Emphasis` = `High`: Do not make every action loud: three High buttons compete for attention.
- `AppearanceBrand`: AppearanceBrand picks the brand colour family; it changes the colour family, not the importance.
- `Button / Size`: Button / Size gives two sizes: Medium is 40 px and Small is 26 px in the installed package (Figma draws Medium at 42 px); XS renders the same as Small.
- `Button / Size`: Keep sizes consistent in a row: one size reads as one group.
- Avoid: `Button / Size`: Do not mix sizes in one row: mixed sizes look like different kinds of action.

**Example:** Actions at the end of a statement row: one High main action, the rest Medium, one size, each with a label that says the action.

```tsx
<HStack modes={{ 'Color Mode': 'Light' }}>
  <IconButton iconName="ic_share" accessibilityLabel="Share statement" onPress={() => {}} modes={{ 'Color Mode': 'Light', Emphasis: 'Medium' }} />
  <IconButton iconName="ic_filter" accessibilityLabel="Filter transactions" onPress={() => {}} modes={{ 'Color Mode': 'Light', Emphasis: 'Medium' }} />
  <IconButton iconName="ic_download" accessibilityLabel="Download statement" onPress={() => {}} modes={{ 'Color Mode': 'Light', Emphasis: 'High' }} />
</HStack>
```

**Props:** `iconName`, `source`, `modes`, `onPress`, `disabled`, `style`, `accessibilityLabel`, `accessibilityHint`, `accessibilityState`, `isToggle`, `activeIcon`, `activeSource`, `inactiveIcon`, `inactiveSource`, `isActive`, `webAccessibilityProps`, `loading`. (* required)

**Modes it reads:** AppearanceBrand, Button / Size, Button / State, Color Mode, Context2, Emphasis, Page type.

**Gaps (report, do not work around)**
- Figma's Glass variant has no package equivalent.
- Size M renders 40 px, not Figma's 42 px.
- Sizes S and XS render the same.
- On a freshly loaded page the first Tab shows the browser's default focus ring instead of the token ring; later Tabs show the token ring.

Full entry: `components/iconbutton.md`. Links: `components/iconbutton.links.md`.
