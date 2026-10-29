# ProfileCard

> Coin agent pack 0.1.78+9 (pilot). Generated from `components/profilecard.json`; the JSON is the source of truth.

- **State:** flagged (1 flag, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `3542b1b` · built 2026-10-29T02:54:29Z
- **Category:** card (for discovery only, not a limit on composition) · **Tags:** profile header, identity card, UPI ID, account card, jioPlus card
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=profilecard) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=6914-38498) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-profilecard--docs)

Use a Profile Card to show who the user is on a dark panel: initials or a photo, a name, UPI handles, and account rows below.

## Use when

- **recommended** Show who the user is on a dark panel: initials or a photo, a name, UPI handles, and account rows below.  
  _From summary: “Use a Profile Card to show who the user is on a dark panel: initials or a photo, a name, UPI handles, and account rows below.”_

## Avoid when

- **discouraged** A card that needs a selected, disabled, or loading state: the Profile Card has none.  
  _From states: “There’s no selected, disabled, or loading state.”_
- **discouraged** A card that should press as a whole: the card itself isn't pressable; its handles and body rows press through their own onPress.  
  _From states: “The card itself isn’t pressable.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Avatar | The monogram, or a photo from avatarSource; 42 px. | no | anatomy: “monogram, or a photo from avatarSource, 42 px.” |
| QR badge | badgeIcon on a white disc; badgeIcon null removes it. | no | anatomy: “badgeIcon on a white disc; null removes it.” |
| Name | name, 14 px bold, on one line. | no | anatomy: “name, 14 px bold, on one line.” |
| UPI handles | upiHandles: a pill each; onPress makes a pill a button. | no | anatomy: “upiHandles: a pill each; onPress makes a pill a button.” |
| Divider | Drawn only when there's a body; showDivider hides it. | no | anatomy: “Drawn only when there’s a body; showDivider hides it.” |
| Body | children: your rows, given the card's on-dark modes. | no | anatomy: “children: your rows, given the card’s on-dark modes.” |
| Panel | A navy panel, 12 px corners, 20 px padding, 344 px wide. | yes | anatomy: “A navy panel, 12 px corners, 20 px padding, 344 px wide.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `header` | `ReactNode` | types |
| `children` | `ReactNode` | types |

## Placement

- **recommended** The card heads the Profile screen.  
  _From inContext: “The card heads the Profile screen.”_
- **recommended** Let the screen do the work: copying a handle and opening a row go through each handle's and row's onPress, and the card only lays them out.  
  _From inContext: “Copying a handle and opening a row are the screen’s own work, through each handle’s and row’s onPress; the card only lays them out.”_
- **recommended** `width`: The card is 344 px wide by default, as Figma draws it.  
  _From sizing: “The card is 344 px wide, as Figma draws it”_
- **recommended** Height follows the content: 20 px of padding, and 12 px between the header, the divider, and each body row.  
  _From sizing: “Height follows the content: 20 px of padding, and 12 px between the header, the divider, and each body row.”_

## Configuration

- **recommended** name, monogram, and upiHandles make the header.  
  _From configuration: “name, monogram, and upiHandles make the header.”_
- **recommended** `avatarSource`: avatarSource shows a photo in place of the initials, such as a business's logo.  
  _From configuration: “avatarSource shows a photo in place of the initials”_
- **recommended** `badgeIcon`: badgeIcon={null} removes the QR badge.  
  _From configuration: “badgeIcon={null} removes the QR badge”_
- **recommended** `upiHandles`: upiHandles={[]} leaves just the name.  
  _From configuration: “upiHandles={[]} leaves just the name.”_
- **recommended** `children`: children is the body, under a divider; leave it out for a header-only card.  
  _From configuration: “children is the body, under a divider; leave it out for a header-only card.”_
- **recommended** `showDivider` = `false`: The divider is drawn only when there's a body; showDivider={false} hides it.  
  _From anatomy: “Drawn only when there’s a body; showDivider hides it.”_
- **recommended** `header`: header replaces the avatar, name, and handles together.  
  _From configuration: “header replaces the avatar, name, and handles together.”_
- **recommended** `Profile Card Appearance` = `Premium`: Profile Card Appearance Premium turns the panel gold.  
  _From configuration: “Profile Card Appearance Premium turns the panel gold.”_
- **recommended** `Profile Card Appearance` = `Premium`: With Premium, the body rows' titles and Buttons follow the gold.  
  _From configuration: “The rows’ titles and Buttons follow the gold.”_
- **recommended** `modes`: The card passes its on-dark modes to everything inside, so ListItem titles, icons, chevrons, and Buttons turn white or gold on their own; plain Text and support text don't.  
  _From configuration: “The card passes its on-dark modes to everything inside, so ListItem titles, icons, chevrons, and Buttons turn white or gold on their own; plain Text and support text don’t.”_
- **recommended** `List Item Style`: Keep the card's own row style: rows sit on the navy panel.  
  _From doDont: “Rows sit on the navy panel.”_
- **discouraged** `List Item Style` = `Boxed`: Do not set List Item Style Boxed: white boxes cover the header and rows, and the name disappears.  
  _From doDont: “White boxes cover the header and rows, and the name disappears.”_
- **recommended** `width` = `100%`: width takes another number, or a percentage such as '100%' to fill its host.  
  _From sizing: “width takes another number, or a percentage such as '100%' to fill its host.”_
- **recommended** `upiHandles`: upiHandles: a pill each; onPress makes a pill a button.  
  _From anatomy: “upiHandles: a pill each; onPress makes a pill a button.”_

## Content

- **recommended** `name`: Give name as the person's display name.  
  _From content: “name is the person’s display name, and monogram their two initials.”_
- **recommended** `monogram`: Give monogram as the person's two initials.  
  _From content: “name is the person’s display name, and monogram their two initials.”_
- **REQUIRED** `name`: Set name yourself: left out, the card shows “Name”.  
  _From fact `/facts/props/0` (name, source evidence)_
- **REQUIRED** `monogram`: Set monogram yourself unless avatarSource gives a photo: left out, the avatar shows “MS”.  
  _From fact `/facts/props/1` (monogram, source types)_
- **recommended** `name`: A long name ends in …, and the handles wrap onto another line.  
  _From sizing: “A long name ends in …, and the handles wrap onto another line.”_
- **recommended** `upiHandles`: Write each handle's label as the UPI ID or the phone number exactly as people would type it, such as priya@jio or 98765 43210.  
  _From content: “A handle’s label is the UPI ID or the phone number exactly as people would type it”_
- **recommended** `upiHandles`: Use ic_copy on a handle people copy and ic_confirm on a verified number.  
  _From content: “use ic_copy on a handle people copy and ic_confirm on a verified number.”_
- **recommended** `upiHandles`: Pass upiHandles: left out, the card shows two sample handles; [] removes the row.  
  _From evidence: “`upiHandles` (two sample handles; `[]` removes the row)”_
- **recommended** `upiHandles`: Keep handles short, so each fits its pill.  
  _From doDont: “Each fits its pill.”_
- **discouraged** `upiHandles`: Do not use a sentence as a handle: it never ends in …, so the pill runs past the panel.  
  _From doDont: “It never ends in …, so the pill runs past the panel.”_
- **recommended** `children`: Keep body rows to short titles, with one Button or a chevron each.  
  _From content: “Keep body rows to short titles, with one Button or a chevron each.”_
- **recommended** `children`: Put titles and Buttons in the body: they turn white and gold on the navy panel.  
  _From doDont: “They turn white and gold on the navy panel.”_
- **discouraged** `children`: Do not put support text or plain Text in the body: they stay dark and almost disappear.  
  _From doDont: “They stay dark and almost disappear.”_

Good: “Priya Sharma”, “PS”, “priya@jio”, “98765 43210”, “JioFinance+”, “Upgrade”, “Linked bank accounts”

Bad: “Tap to copy my UPI ID priya@jio and pay me back”

## States

| State | When | From |
| --- | --- | --- |
| Card | Always: the card itself isn't pressable. | states: “The card itself isn’t pressable.” |
| Pressable handle | A handle with onPress is a button that shrinks a little while pressed, usually to copy it. | states: “A handle with onPress is a button that shrinks a little while pressed, usually to copy it” |
| Text handle | Without onPress, a handle is plain text. | states: “Without onPress, a handle is plain text.” |
| Body rows | Body rows keep their own states, such as a ListItem with onPress. | states: “Body rows keep their own states, such as a ListItem with onPress.” |
| Selected, disabled, loading | Not available: there's no selected, disabled, or loading state. | states: “There’s no selected, disabled, or loading state.” |

## Accessibility

- **recommended** `upiHandles`: A handle with onPress is a button; one without is plain text.  
  _From states: “A handle with onPress is a button that shrinks a little while pressed, usually to copy it; one without is plain text.”_
- **recommended** The card itself isn't pressable.  
  _From states: “The card itself isn’t pressable.”_
- **recommended** `accessibilityLabel`: accessibilityLabel is the card's accessibility label.  
  _From fact `/facts/props/11` (accessibilityLabel, source types)_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Titles and Buttons in the body | Support text or plain Text in the body | They stay dark and almost disappear. |
| Short handles | A sentence as a handle | It never ends in …, so the pill runs past the panel. |
| The card’s own row style | List Item Style Boxed | White boxes cover the header and rows, and the name disappears. |

## Examples

### The Profile screen, the guide's In context: the card heads the screen under its Title, with a UPI ID to copy, a verified number, and two short account rows under a divider. Copying the handle and opening a row are the screen's own work, through their onPress.

```tsx
<VStack>
  <Title title="Profile" subtitle="Your account and payments" />
  <ProfileCard
    name="Priya Sharma"
    monogram="PS"
    upiHandles={[
      { label: 'priya@jio', iconName: 'ic_copy', onPress: () => {} },
      { label: '98765 43210', iconName: 'ic_confirm' },
    ]}
  >
    <ListItem
      layout="Horizontal"
      title="JioFinance+"
      showSupportText={false}
      navArrow={false}
      trailing={<Button label="Upgrade" onPress={() => {}} />}
    />
    <Divider />
    <ListItem
      layout="Horizontal"
      title="Linked bank accounts"
      showSupportText={false}
      onPress={() => {}}
    />
  </ProfileCard>
</VStack>
```

_From inContext: “The card heads the Profile screen.”_

### Header only: no children, so no divider and no body.

```tsx
<ProfileCard
  name="Priya Sharma"
  monogram="PS"
  upiHandles={[
    { label: 'priya@jio', iconName: 'ic_copy', onPress: () => {} },
    { label: '98765 43210', iconName: 'ic_confirm' },
  ]}
/>
```

_From configuration: “No children: no divider and no body.”_

### A business's profile with a photo: avatarSource shows its logo in place of initials. The URI stands for the business's own logo.

```tsx
<ProfileCard
  name="Jio Gold"
  avatarSource={{ uri: 'https://example.com/jio-gold-logo.png' }}
  upiHandles={[{ label: 'jiogold@jio', iconName: 'ic_copy', onPress: () => {} }]}
/>
```

_From configuration: “avatarSource in place of initials, here a business’s logo.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `name` | `string` |  | `"Name"` |  | evidence (2026-10-20) | One line ending in … (the header's ListItem title). Declared: User's display name shown in the header. Default "Name", from the component source. |
| `monogram` | `string` |  | `"MS"` |  | types | Monogram initials for the avatar (used when `avatarSource` is not set). Default "MS", from the component source. |
| `avatarSource` | `ImageSourcePropType \| string` |  |  |  | types | Avatar image source. When set, the avatar renders the image instead of the monogram. |
| `badgeIcon` | `string \| null` |  | `"ic_qr_code"` |  | types | Registry icon for the small badge attached to the avatar's bottom-right corner. Pass `null` to hide the badge. Defaults to `'ic_qr_code'`. Default "ic_qr_code", from the component source. |
| `upiHandles` | `ProfileCardUpiHandle[]` |  |  |  | evidence (2026-10-20) | Each handle is { label (required), iconName (UpiHandle's default ic_scan_qr_code), showIcon (default true), onPress }; onPress makes the pill a button that scales to 0.98 while pressed. A handle has no picture. Declared: UPI handle pills rendered under the name. Pass `[]` to render none. |
| `header` | `React.ReactNode` |  |  |  | types | Full override for the header row (avatar + name + handles). Takes precedence over the declarative header props. `modes` cascade into it. |
| `children` | `React.ReactNode` |  |  |  | types | Card body (the Figma "slot"). Rendered below the header divider. The card forces `context 10: jioPlus` onto every child so nested `ListItem`s and `Text`s stay on-dark. A child's own modes cannot unset that context. |
| `showDivider` | `boolean` |  | `true` |  | types | Toggles the divider between the header and the body. Defaults to `true`. Default true, from the component source. |
| `width` | `number \| ˋ${number}%ˋ` |  | `344` |  | types | Card width. Defaults to the Figma spec (`344`). Pass `'100%'` to fill the parent. Default 344, from the component source. |
| `modes` | `Modes` |  |  |  | types | Modes object for design-token resolution, cascaded to all children. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Style overrides for the card container. |
| `accessibilityLabel` | `string` |  |  |  | types | Accessibility label for the card. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Primary"` |  | types | A token collection ProfileCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `AppearanceSystem` | `mode collection` | positive, warning, negative | `"positive"` |  | types | A token collection ProfileCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Attached Border` | `mode collection` | True, False | `"True"` |  | types | A token collection ProfileCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Avatar Size` | `mode collection` | L, M, S, XS | `"L"` |  | types | A token collection ProfileCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Badge Size` | `mode collection` | Medium, Small | `"Medium"` |  | types | A token collection ProfileCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection ProfileCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context` | `mode collection` | Default, Nudge&Alert, CTACard, ListItem | `"Default"` |  | types | A token collection ProfileCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 10` | `mode collection` | Default, jioPlus | `"Default"` |  | evidence (2026-10-20) | The card gives everything inside context 10 jioPlus. Under it ListItem titles, Icons and NavArrows are white, a Divider is #191f6e, a Button is gold (#cea15a) with a dark label, the UpiHandle pills are navy (#021891), and the avatar is navy (#021891) with white initials. Declared: A token collection ProfileCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context2` | `mode collection` | Default, AppBar | `"Default"` |  | types | A token collection ProfileCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context4` | `mode collection` | Default, Chip, Button, Badge, Badge/glass | `"Default"` |  | types | A token collection ProfileCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context5` | `mode collection` | Default, Fullscreen Modal, Mode 1 | `"Default"` |  | types | A token collection ProfileCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Draggable List` | `mode collection` | default, onDrag | `"default"` |  | types | A token collection ProfileCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Emphasis` | `mode collection` | High, Medium, Low | `"High"` |  | types | A token collection ProfileCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Icon Capsule Size` | `mode collection` | M, L, S, XS | `"M"` |  | types | A token collection ProfileCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Icon Size` | `mode collection` | Medium, Small | `"Medium"` |  | types | A token collection ProfileCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `List Item Style` | `mode collection` | Default, Boxed, Minimal | `"Default"` |  | types | A token collection ProfileCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `ListItem State` | `mode collection` | Idle, Active | `"Idle"` |  | types | A token collection ProfileCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `NavArrow Direction` | `mode collection` | Left&Right, Top&Bottom | `"Left&Right"` |  | types | A token collection ProfileCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection ProfileCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Profile Card Appearance` | `mode collection` | Default, Premium | `"Default"` |  | evidence (2026-10-20) | Premium turns the panel gold (#cea15a), with a darker gold avatar, pills and divider, and dark text. Declared: A token collection ProfileCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. Package docs: The card supports the `Profile Card Appearance` collection (`Default` \| `Premium`) via the `modes` prop, which recolors the container, avatar, pills and divider in one go. |
| `Selectable` | `mode collection` | False, True | `"False"` |  | types | A token collection ProfileCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Semantic Intent` | `mode collection` | Brand, System | `"Brand"` |  | types | A token collection ProfileCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Slot gap` | `mode collection` | S, M, L, XL, XS | `"S"` |  | types | A token collection ProfileCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `UPI Handle Image` | `mode collection` | True, False | `"True"` |  | types | A token collection ProfileCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `header` | `React.ReactNode` |  |  |  | types | Full override for the header row (avatar + name + handles). Takes precedence over the declarative header props. `modes` cascade into it. |
| `children` | `React.ReactNode` |  |  |  | types | Card body (the Figma "slot"). Rendered below the header divider. The card forces `context 10: jioPlus` onto every child so nested `ListItem`s and `Text`s stay on-dark. A child's own modes cannot unset that context. |

### Events

_No events._

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- Plain Text and ListItem support text in the body stay dark on the navy panel and almost disappear, as in Figma's own sample (Component Bug #354). _(evidence, 2026-10-20)_
- A body child's own modes override the card's on-dark modes (Component Bug #354). _(evidence, 2026-10-20)_
- List Item Style Boxed breaks the card: white boxes cover the header and rows, and the name disappears (Component Bug #354). _(evidence, 2026-10-20)_
- A long UPI handle never ends in …, so its pill runs past the card (Component Bug #354). _(evidence, 2026-10-20)_
- The header is 48 px tall where Figma's is 47 (Component Bug #354). _(evidence, 2026-10-20)_
- The QR badge's glyph is near-black (#0f0d0a) where Figma's is grey (#24262b), and the badge sits at the avatar's 45° point where Figma places it at (25, 24) (Component Bug #354). _(evidence, 2026-10-20)_
- The published Storybook is older than the installed package and still shows the older generated page (Component Bug #354). _(evidence, 2026-10-20)_
- Figma's Profile Card has one property, the body slot; the name, handles, badge, and photo are overrides there, and Premium is a variable mode. In code they are props (name, monogram, avatarSource, badgeIcon, upiHandles), and Premium is the Profile Card Appearance mode. _(evidence, 2026-10-20)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `(whole entry)` · human: The guide was checked on 0.1.78-c7d3348; the installed dbe0e02 ProfileCard.tsx (read, not rendered) already forces context 10 jioPlus and List Item Style Default on every child, paints plain Text and ListItem support text on-dark, and gives a long handle an ellipsis, so most of the gaps quoted from the guide (Component Bug #354) describe the pre-fix card. Only the 48 px header still holds. Re-extract once #354's fix is published to the guide. Added by Claude Code in the overnight run agentpack-batch6, for Marcin to confirm.
