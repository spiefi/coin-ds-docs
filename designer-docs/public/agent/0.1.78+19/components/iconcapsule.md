# IconCapsule

> Coin agent pack 0.1.78+19 (pilot). Generated from `components/iconcapsule.json`; the JSON is the source of truth.

- **State:** flagged (1 flag, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `021681d` · built 2026-10-30T12:30:13Z
- **Category:** content (for discovery only, not a limit on composition) · **Tags:** icon circle, round icon, leading icon, status icon, icon badge
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=iconcapsule) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=8960-33559) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-iconcapsule--docs)

Use an Icon Capsule to show one icon in a coloured circle, such as the mark at the start of a list row or a status on a result screen.

## Use when

- **recommended** Show one icon in a coloured circle, such as the mark at the start of a list row or a status on a result screen.  
  _From summary: “Use an Icon Capsule to show one icon in a coloured circle, such as the mark at the start of a list row or a status on a result screen.”_

## Avoid when

- **discouraged** Letters or a logo: a capsule holds one glyph, never letters or a logo. Use an Avatar for those. Use instead: `Avatar`.  
  _From content: “A capsule holds one glyph, never letters or a logo; use an Avatar for those.”_
- **discouraged** Something people press, select or disable: an Icon Capsule doesn't press, select or disable; the row or tile around it does.  
  _From states: “An Icon Capsule doesn’t press, select, or disable: the row or tile around it does.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Circle | Icon Capsule Size sets it, 42 px at M; AppearanceBrand and Emphasis fill it. | no | anatomy: “Icon Capsule Size sets it, 42 px at M; AppearanceBrand and Emphasis fill it.” |
| Icon | iconName: one glyph from the Coin icon set, 18 px at M. | no | anatomy: “iconName: one glyph from the Coin icon set, 18 px at M.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

_No slots._

## Placement

- **recommended** Put the capsule in a List Item's leading slot, where it says what each row is about.  
  _From inContext: “In a List Item’s leading slot the capsule says what each row is about.”_
- **recommended** `modes`: In a List Item's leading slot the row passes its modes to the capsule, and the capsule's own modes win: when the capsule takes a colour, set it on the capsule.  
  _From inContext: “The row passes its modes to the capsule, and the capsule’s own modes win, so set its colour on the capsule.”_

## Configuration

- **recommended** `AppearanceBrand`: With Semantic Intent Brand, the default, AppearanceBrand picks the colour and Emphasis how strong it is.  
  _From configuration: “With Semantic Intent Brand, the default, AppearanceBrand picks the colour and Emphasis how strong it is.”_
- **recommended** `AppearanceBrand` = `Primary`: AppearanceBrand Primary, the default: gold with a black icon.  
  _From configuration: “Gold with a black icon: the default.”_
- **recommended** `AppearanceBrand` = `Secondary`: AppearanceBrand Secondary: purple with a white icon.  
  _From configuration: “Purple with a white icon.”_
- **recommended** `AppearanceBrand` = `Neutral`: AppearanceBrand Neutral: dark grey with a white icon, as Figma draws it.  
  _From configuration: “Dark grey with a white icon, as Figma draws it.”_
- **recommended** `AppearanceBrand` = `Tertiary`: AppearanceBrand Tertiary: blue with a white icon.  
  _From configuration: “Blue with a white icon.”_
- **recommended** `Emphasis` = `High`: Emphasis High: a solid circle (the guide shows it on AppearanceBrand Secondary).  
  _From configuration: “A solid circle.”_
- **recommended** `Emphasis` = `Medium`: Emphasis Medium: a pale circle with a coloured icon (the guide shows it on AppearanceBrand Secondary).  
  _From configuration: “A pale circle with a coloured icon.”_
- **recommended** `Emphasis` = `Low`: Emphasis Low: no circle, just the coloured icon (the guide shows it on AppearanceBrand Secondary).  
  _From configuration: “No circle, just the coloured icon.”_
- **recommended** `Semantic Intent` = `System`: Semantic Intent System colours the capsule with AppearanceSystem instead, for success, warning and errors, and ignores Emphasis.  
  _From configuration: “Semantic Intent System colours it with AppearanceSystem instead, for success, warning, and errors, and ignores Emphasis.”_
- **recommended** `AppearanceSystem` = `positive`: With Semantic Intent System, AppearanceSystem positive is green, for something that worked.  
  _From configuration: “Green, for something that worked.”_
- **recommended** `AppearanceSystem` = `warning`: With Semantic Intent System, AppearanceSystem warning is orange, for something to check.  
  _From configuration: “Orange, for something to check.”_
- **recommended** `AppearanceSystem` = `negative`: With Semantic Intent System, AppearanceSystem negative is red, for something that failed.  
  _From configuration: “Red, for something that failed.”_
- **recommended** `AppearanceSystem` = `negative`: For a failure, use Semantic Intent System with AppearanceSystem negative: red is the colour people expect for an error.  
  _From doDont: “Negative is red, the colour people expect for an error.”_
- **discouraged** `AppearanceBrand`: Do not use a brand colour for a failure, such as purple: it doesn't say that anything went wrong.  
  _From doDont: “Purple doesn’t say that anything went wrong.”_
- **recommended** `Icon Capsule Size`: Icon Capsule Size sets the circle and the icon together: XS is 18 px with a 12 px icon, S 29 with 18, M 42 with 18, and L 81 with 36.  
  _From sizing: “Icon Capsule Size sets the circle and the icon together: XS is 18 px with a 12 px icon, S 29 with 18, M 42 with 18, and L 81 with 36.”_
- **recommended** `Icon Capsule Size` = `M`: Figma draws Icon Capsule Size M.  
  _From sizing: “Figma draws M.”_
- **recommended** `Context`: Some parent components set the Context mode instead of Icon Capsule Size, which fixes the capsule at 14 or 58 px whatever its size.  
  _From sizing: “Some parent components set the Context mode instead, which fixes the capsule at 14 or 58 px whatever its size.”_

## Content

- **recommended** One glyph in one circle; modes pick its size and colour.  
  _From corePrinciple: “One glyph in one circle; modes pick its size and colour.”_
- **recommended** `iconName`: Pick the glyph from the Coin icon set by its iconName, so it says the same as the row's title: a bulb for electricity, a drop for water.  
  _From content: “Pick the glyph from the Coin icon set by its iconName, so it says the same as the row’s title: a bulb for electricity, a drop for water.”_
- **recommended** Put the words in the row or tile around the capsule: it has no text.  
  _From anatomy: “There’s no text: the words belong to the row or tile around it.”_
- **recommended** `iconName`: Use a name from the icon set: ic_wallet draws the wallet.  
  _From doDont: “ic_wallet draws the wallet.”_
- **discouraged** `iconName`: Do not pass a name Coin doesn't have, such as “wallet”: it isn't in the set, so the circle is empty.  
  _From doDont: ““wallet” isn’t in the set, so the circle is empty.”_

Good: “ic_bulb”, “ic_water”, “ic_mobile”, “ic_savings”, “ic_wallet”

Bad: “wallet”

## States

| State | When | From |
| --- | --- | --- |
| No states of its own | An Icon Capsule doesn't press, select or disable: the row or tile around it does. | states: “An Icon Capsule doesn’t press, select, or disable: the row or tile around it does.” |
| In the icon set | iconName is in the Coin icon set: ic_wallet draws the wallet glyph. | states: “ic_wallet draws the wallet glyph.” |
| Not in the icon set | iconName isn't in the Coin icon set: the circle shows with nothing in it. | states: “If iconName isn’t in the Coin icon set, the circle shows with nothing in it.” |

## Accessibility

- **recommended** `accessibilityLabel`: Name what the capsule shows in the row or tile around it: the capsule drops accessibilityLabel and hides the icon from screen readers.  
  _From sources: “It drops accessibilityLabel and hides the icon from screen readers, so name it in the row or tile around it.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| A name from the icon set | A name Coin doesn’t have | “wallet” isn’t in the set, so the circle is empty. |
| System for a failure | A brand colour for a failure | Purple doesn’t say that anything went wrong. |

## Examples

### Pay bills, the guide's In context: in each List Item's leading slot an IconCapsule says what the row is about (ic_bulb for Electricity, ic_water for Water, ic_mobile for Mobile recharge), and the row's title and support text carry the words.

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

_From inContext: “In a List Item’s leading slot the capsule says what each row is about.”_

### A failure, the guide's Do: Semantic Intent System with AppearanceSystem negative makes the capsule red, the colour people expect for an error (here around the ic_error glyph from the Coin icon set).

```tsx
<IconCapsule
  iconName="ic_error"
  modes={{ 'Semantic Intent': 'System', AppearanceSystem: 'negative' }}
/>
```

_From doDont: “Negative is red, the colour people expect for an error.”_

### A name from the icon set with no modes: ic_wallet draws the wallet glyph in the default capsule.

```tsx
<IconCapsule iconName="ic_wallet" />
```

_From states: “ic_wallet draws the wallet glyph.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `iconName` | `string` |  | `"ic_card"` |  | evidence (2026-10-28) | Any name in the Coin icon set (about 1,300). An unknown name draws the circle with no glyph and logs a warning. Declared: The name of the icon to display from the icon registry. Default "ic_card", from the component source. |
| `source` | `UnifiedSource` |  |  |  | evidence (2026-10-28) | A fallback glyph (SVG, raster or element), used only when iconName isn't in the icon set. Because iconName defaults to ic_card, source alone never shows: with no iconName the capsule draws ic_card; with an empty or unknown iconName it draws the source. Declared: Unified fallback source rendered when `iconName` is missing or not in the registry. Accepts a remote URI, an inline SVG XML string, a `require()` asset, an SVG React component, or an already-rendered element. The resulting media is tinted with the capsule's mode-resolved icon color so it follows design tokens just like a built-in icon. See {@link UnifiedSource}. |
| `modes` | `Modes` |  |  |  | evidence (2026-10-28) | Merged over a JFSThemeProvider's modes; the capsule's own modes win. Declared: Mode configuration for design tokens (e.g., {"AppearanceBrand": "Primary"}) |
| `accessibilityLabel` | `string` |  |  |  | evidence (2026-10-28) | Accepted and discarded: the capsule is an image with no name, and its glyph is hidden from screen readers. Declared: Accessibility label for screen readers. |
| `accessibilityRole` | `string` | button, header, link, menu, menuitem, search, summary, image, switch, text, none, togglebutton, keyboardkey, adjustable, imagebutton, alert, checkbox, combobox, menubar, progressbar, radio, radiogroup, scrollbar, spinbutton, tab, tabbar, tablist, timer, list, toolbar | `"image"` |  | types | Accessibility role (defaults to "image" for decorative icons) Performance notes: - All token reads collapsed into a single `useMemo([modes])`. The merged `(globalModes + propModes)` object is also memoized so downstream `getVariableByName` calls hit the resolver's per-modes-object cache. - Wrapped in `React.memo`; with the shared `EMPTY_MODES` default the common path benefits from full memoization. /. Default "image", from the component source. |
| `...React.ComponentProps<typeof View>` | `React.ComponentProps<typeof View>` |  |  |  | types | Inherited React Native props the component also accepts. They are not part of the design contract and no guide documents them. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Primary"` |  | evidence (2026-10-28) | At Emphasis High: Primary #cea15a with a black glyph (the default), Secondary #5d00b5, Neutral #303338 and Tertiary #036b99, each with a white glyph. Declared: A token collection IconCapsule reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `AppearanceSystem` | `mode collection` | positive, warning, negative | `"positive"` |  | evidence (2026-10-28) | With Semantic Intent System: positive #26ab21, warning #f06e0f, negative #f50030, each with a white glyph. Declared: A token collection IconCapsule reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection IconCapsule reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context` | `mode collection` | Default, Nudge&Alert, CTACard, ListItem | `"Default"` |  | evidence (2026-10-28) | Default and ListItem use Icon Capsule Size; Nudge&Alert fixes the capsule at 14 px with a 14 px glyph, CTACard at 58 px with a 29 px glyph. Parent components set it. Declared: A token collection IconCapsule reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Emphasis` | `mode collection` | High, Medium, Low | `"High"` |  | evidence (2026-10-28) | Medium: Primary #fde8c9, Secondary #e4dbff, Neutral #545961, and Tertiary stays #036b99 with a pale #b3d3e0 glyph. Low: no fill, so only the coloured glyph shows. Declared: A token collection IconCapsule reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Icon Capsule Size` | `mode collection` | M, L, S, XS | `"M"` |  | evidence (2026-10-28) | Circle and glyph: XS 18 / 12 px, S 29 / 18, M 42 / 18 (the default), L 81 / 36. Declared: A token collection IconCapsule reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | evidence (2026-10-28) | JioPlus changes only Neutral Low: its glyph turns white. Declared: A token collection IconCapsule reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Semantic Intent` | `mode collection` | Brand, System | `"Brand"` |  | evidence (2026-10-28) | System colours the capsule with AppearanceSystem; Emphasis and AppearanceBrand then change nothing, so System with Emphasis Low is still filled. Declared: A token collection IconCapsule reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

_No slots._

### Events

_No events._

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- Figma's Icon Capsule has a Type property, Default or Glass; the package has no type prop and never reads the iconCapsule/glass/background token, so there is no Glass capsule in code (Component Bug #419). _(evidence, 2026-10-28)_
- Figma's default Icon Capsule is Neutral High (dark grey, white glyph); the package with no modes, and Storybook's Default, are Primary High (gold, black glyph) (Component Bug #419). _(evidence, 2026-10-28)_
- The JSDoc and Biscuit's IconCapsule.mdx say source is used when iconName is missing, but iconName defaults to ic_card, so source never shows on its own: only with an empty or unknown iconName (Component Bug #419). _(evidence, 2026-10-28)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `(whole entry)` · human: The guide’s Configuration captions for Emphasis (“A solid circle.”, “A pale circle with a coloured icon.”, “No circle, just the coloured icon.”) are drawn on AppearanceBrand Secondary but read as true for every appearance. On the installed 0.1.78-dbe0e02, read through the package’s resolver, Emphasis Medium on Neutral is a lighter grey #545961 with a white glyph and on Tertiary the circle stays #036b99 with only the glyph pale (#b3d3e0). The entry keeps the captions with “the guide shows it on AppearanceBrand Secondary”. Guide fix #527. Added by Claude Code in the overnight run agentpack-batch8, for Marcin to confirm.
