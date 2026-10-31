# Toggle (brief)

> Coin agent pack 0.1.78+19 · documented · full entry: `components/toggle.md` (sources, all facts, flags)

Use a Toggle to switch one setting on or off, with the change taking effect straight away.

**Use when**
- Switch one setting on or off, with the change taking effect straight away.
- One setting, one switch, and the change happens at once.
- One on/off setting, such as “Hide balances”, which is either on or off.

**Avoid when**
- Avoid: A setting that waits for a Save button: a switch that needs Save looks applied when it isn't; use a Checkbox. Use instead: Checkbox.
- Avoid: Choosing between options, such as a Light / Dark theme: which side means Light? Use a pair of Radios. Use instead: Radio.

**Placement**
- It has no label of its own, so it sits at the end of a row whose title names the setting.
- The toggle never stretches: it is always 52 × 31 px.
- The track is 52 × 31 px with 3 px padding around a 25 px thumb, so give its row at least 31 px of height.

**Key rules**
- Toggle has no size or style options.
- `value`: The screen sets each toggle's value.
- Each change applies as soon as the toggle moves.
- `onValueChange`: The screen keeps every value and saves it; the toggle only reports the new value through onValueChange.
- `disabled` = `true`: Disable a toggle only while its setting can't change, and say why nearby.
- Toggle has no label of its own, so the screen names it, usually with the row's title.
- `accessibilityLabel`: accessibilityLabel is the toggle's label for screen readers.
- On the web it is a switch with a name, and its on or off state is announced.

**Example:** A settings card, the guide's In context: a Card holding three rows, each a horizontal ListItem whose title names the setting, with no support text and no arrow, and a Toggle at its end named with the same words. Each change applies as soon as the toggle moves; the screen keeps the values and saves them. The literal values and the empty onValueChange stand for the screen's own state and saving.

```tsx
<Card>
  <VStack>
    <ListItem
      layout="Horizontal"
      navArrow={false}
      title="Payment alerts"
      showSupportText={false}
      trailing={<Toggle value onValueChange={(value) => {}} accessibilityLabel="Payment alerts" />}
    />
    <ListItem
      layout="Horizontal"
      navArrow={false}
      title="Biometric login"
      showSupportText={false}
      trailing={<Toggle value={false} onValueChange={(value) => {}} accessibilityLabel="Biometric login" />}
    />
    <ListItem
      layout="Horizontal"
      navArrow={false}
      title="Hide balances"
      showSupportText={false}
      trailing={<Toggle value={false} onValueChange={(value) => {}} accessibilityLabel="Hide balances" />}
    />
  </VStack>
</Card>
```

**Props:** `value`, `defaultValue`, `onValueChange`, `disabled`, `modes`, `style`, `accessibilityLabel`. (* required)

**Modes it reads:** Color Mode, Toggle States.

**Gaps (report, do not work around)**
- Figma has two variants, Off and On, both 52 × 31; disabled exists only in the package, which dims the toggle to 50% and greys the track in both states.
- Disabled On and Disabled Off share one grey track, so only the thumb position shows the state.

Full entry: `components/toggle.md`. Links: `components/toggle.links.md`.
