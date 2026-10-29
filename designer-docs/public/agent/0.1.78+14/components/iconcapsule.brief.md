# IconCapsule (brief)

> Coin agent pack 0.1.78+14 · flagged · full entry: `components/iconcapsule.md` (sources, all facts, flags)

Use an Icon Capsule to show one icon in a coloured circle, such as the mark at the start of a list row or a status on a result screen.

**Use when**
- Show one icon in a coloured circle, such as the mark at the start of a list row or a status on a result screen.

**Avoid when**
- Avoid: Letters or a logo: a capsule holds one glyph, never letters or a logo. Use an Avatar for those. Use instead: Avatar.
- Avoid: Something people press, select or disable: an Icon Capsule doesn't press, select or disable; the row or tile around it does.

**Placement**
- Put the capsule in a List Item's leading slot, where it says what each row is about.
- `modes`: In a List Item's leading slot the row passes its modes to the capsule, and the capsule's own modes win: when the capsule takes a colour, set it on the capsule.

**Key rules**
- `AppearanceBrand`: With Semantic Intent Brand, the default, AppearanceBrand picks the colour and Emphasis how strong it is.
- `AppearanceBrand` = `Primary`: AppearanceBrand Primary, the default: gold with a black icon.
- `AppearanceBrand` = `Secondary`: AppearanceBrand Secondary: purple with a white icon.
- `AppearanceBrand` = `Neutral`: AppearanceBrand Neutral: dark grey with a white icon, as Figma draws it.
- `AppearanceBrand` = `Tertiary`: AppearanceBrand Tertiary: blue with a white icon.
- `Emphasis` = `High`: Emphasis High: a solid circle (the guide shows it on AppearanceBrand Secondary).
- `Emphasis` = `Medium`: Emphasis Medium: a pale circle with a coloured icon (the guide shows it on AppearanceBrand Secondary).
- `Emphasis` = `Low`: Emphasis Low: no circle, just the coloured icon (the guide shows it on AppearanceBrand Secondary).

**Example:** Pay bills, the guide's In context: in each List Item's leading slot an IconCapsule says what the row is about (ic_bulb for Electricity, ic_water for Water, ic_mobile for Mobile recharge), and the row's title and support text carry the words.

```tsx
<ListGroup label="Pay bills">
  <ListItem
    layout="Horizontal"
    title="Electricity"
    supportText="Adani Electricity"
    leading={<IconCapsule iconName="ic_bulb" />}
    onPress={() => {}}
  />
  <ListItem
    layout="Horizontal"
    title="Water"
    supportText="BWSSB"
    leading={<IconCapsule iconName="ic_water" />}
    onPress={() => {}}
  />
  <ListItem
    layout="Horizontal"
    title="Mobile recharge"
    supportText="Jio prepaid"
    leading={<IconCapsule iconName="ic_mobile" />}
    onPress={() => {}}
  />
</ListGroup>
```

**Props:** `iconName`, `source`, `modes`, `accessibilityLabel`, `accessibilityRole` (button | header | link | menu | menuitem | search | summary | image | switch | text | none | togglebutton | keyboardkey | adjustable | imagebutton | alert | checkbox | combobox | menubar | progressbar | radio | radiogroup | scrollbar | spinbutton | tab | tabbar | tablist | timer | list | toolbar). (* required)

**Modes it reads:** AppearanceBrand, AppearanceSystem, Color Mode, Context, Emphasis, Icon Capsule Size, Page type, Semantic Intent.

**Gaps (report, do not work around)**
- Figma's Icon Capsule has a Type property, Default or Glass; the package has no type prop and never reads the iconCapsule/glass/background token, so there is no Glass capsule in code (Component Bug #419).
- Figma's default Icon Capsule is Neutral High (dark grey, white glyph); the package with no modes, and Storybook's Default, are Primary High (gold, black glyph) (Component Bug #419).
- The JSDoc and Biscuit's IconCapsule.mdx say source is used when iconName is missing, but iconName defaults to ic_card, so source never shows on its own: only with an empty or unknown iconName (Component Bug #419).

Full entry: `components/iconcapsule.md`. Links: `components/iconcapsule.links.md`.
