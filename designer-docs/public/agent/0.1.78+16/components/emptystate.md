# EmptyState

> Coin agent pack 0.1.78+16 (pilot). Generated from `components/emptystate.json`; the JSON is the source of truth.

- **State:** flagged (1 flag, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `b4988c5` · built 2026-10-29T08:26:34Z
- **Category:** feedback (for discovery only, not a limit on composition) · **Tags:** no results, nothing here, zero state, blank state, error state
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=emptystate) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1828-82) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-emptystate--docs)

Use an Empty State when a list or screen has nothing to show, to say why and offer one next step.

## Use when

- **recommended** Use an Empty State when a list or screen has nothing to show, to say why and offer one next step.  
  _From summary: “Use an Empty State when a list or screen has nothing to show, to say why and offer one next step.”_
- **recommended** Say what's missing, then what to do next.  
  _From corePrinciple: “Say what’s missing, then what to do next.”_
- **recommended** Nothing to show yet, such as no payments yet: say so, with a soft brand icon.  
  _From configuration: “A soft brand icon when there’s simply nothing to show yet.”_
- **recommended** A search or filter found nothing: say so and offer a way back, such as Clear search.  
  _From configuration: “After a search or filter, say so and offer a way back.”_
- **recommended** Loading failed: a red error icon, and the button retries, such as Try again.  
  _From configuration: “A red error icon when loading failed; the button retries.”_

## Avoid when

- **discouraged** Keeping it once there is something to list: the screen shows the Empty State while there's nothing to list and replaces it with the list when there is.  
  _From states: “the screen shows it while there’s nothing to list and replaces it when there is.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Icon | An Icon Capsule you pass in iconSlot; its own modes set its size and colour. Left out, Empty State shows its own icon; null removes it. | no | anatomy: “An Icon Capsule you pass in; its own modes set size and colour.” |
| Title | title: 16 px bold; says what's missing. | no | anatomy: “16 px bold; says what’s missing.” |
| Description | description: 12 px; why it's empty or what to do. Hidden when showDescription is false. | no | anatomy: “12 px; why it’s empty or what to do.” |
| Button | Set with buttonLabel and onPress; without them there's no button. buttonSlot replaces it. | no | anatomy: “Set with buttonLabel and onPress; without them there’s no button.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `iconSlot` | `ReactNode` | types |
| `buttonSlot` | `ReactNode` | types |

## Placement

- **recommended** Empty State takes its width from its container and centres its text.  
  _From sizing: “Empty State takes its width from its container and centres its text.”_
- **recommended** Show it where the list would be, such as inside the Recent payments card, until there's a payment.  
  _From inContext: “The Recent payments card shows the empty state until there’s a payment.”_
- **recommended** When the action adds something (Make a payment adds a payment), the screen swaps the Empty State for the list.  
  _From inContext: “Make a payment adds one, and the screen swaps the empty state for the list.”_
- **recommended** Empty State has no background of its own: it shows on the surface that holds it.  
  _From sources: “It has no background, so this page shows Light only.”_
- **recommended** Figma's version is 236 px wide; in code the width comes from the container.  
  _From sizing: “Figma’s version is 236 px wide.”_

## Configuration

- **recommended** `iconSlot`: Pick the icon and its colour for why the area is empty, and label the button with the next step.  
  _From configuration: “Pick the icon and its colour for why the area is empty, and label the button with the next step.”_
- **recommended** `iconSlot`: Nothing yet: a soft brand icon when there's simply nothing to show yet.  
  _From configuration: “A soft brand icon when there’s simply nothing to show yet.”_
- **recommended** `iconSlot`: Couldn't load: a red error icon when loading failed; the button retries.  
  _From configuration: “A red error icon when loading failed; the button retries.”_
- **recommended** `iconSlot`: Match the icon to the reason: a soft icon for an empty list, and red only when something failed.  
  _From doDont: “A soft icon for an empty list; red only when something failed.”_
- **discouraged** `iconSlot`: Don't use the error icon for an empty list: a red alert makes “No payments yet” look like a failure.  
  _From doDont: “A red alert makes “No payments yet” look like a failure.”_
- **recommended** `AppearanceSystem` = `negative`: For the red error icon, the Icon Capsule takes Semantic Intent System with AppearanceSystem negative: Figma's red capsule (Icon Capsule Size L makes it Figma's 81 px).  
  _From evidence: “The red capsule plus gold button equals Icon Capsule Size L + System negative on the capsule and Button / Size S + Brand Primary on the button.”_
- **recommended** `Emphasis` = `Medium`: For the soft icon, the guide's empty-payments composition (Make a payment) gives the Icon Capsule Emphasis Medium: a pale capsule (#fde8c9) instead of the default gold (#cea15a).  
  _From evidence: “`Emphasis: Medium` capsule; Button size S “Make a payment”): 360 × 213; capsule `#fde8c9`”_
- **recommended** `modes`: Modes set on Empty State reach the icon and button you pass in, and their own modes win.  
  _From sources: “Its modes reach the icon and button you pass in, and their own modes win.”_
- **recommended** `iconSlot`: Leave iconSlot out for Empty State's own icon, or pass null to remove the icon. A node you pass gets Empty State's modes.  
  _From fact `/facts/props/3` (iconSlot, source evidence)_
- **recommended** `buttonLabel`: The button comes from a label and an action: buttonLabel and onPress.  
  _From anatomy: “You pass in the icon; the button comes from a label and an action.”_
- **recommended** `buttonSlot`: buttonSlot replaces the button, and null removes it. Left out, Empty State draws its own button when buttonLabel or onPress is set, and no button otherwise.  
  _From fact `/facts/props/4` (buttonSlot, source types)_
- **recommended** `showDescription` = `false`: Turn the description off (showDescription false) when the title says enough.  
  _From configuration: “Turn the description off when the title says enough.”_
- **recommended** The spacing is built in: 4 px of padding, 16 px between the icon, title and description, and 24 px above the button.  
  _From sizing: “It has 4 px of padding, 16 px between the icon, title, and description, and 24 px above the button.”_

## Content

- **recommended** `title`: Write the title as what's missing, in a few words.  
  _From content: “Write the title as what’s missing, in a few words.”_
- **recommended** `description`: Use the description for why it's empty or what will appear.  
  _From content: “Use the description for why it’s empty or what will appear”_
- **recommended** `buttonLabel`: Label the button with the next step.  
  _From content: “label the button with the next step”_
- **recommended** Empty State has no copy of its own and shows a button only when you give it a label, so set all three: title, description and buttonLabel. ⚑ flagged (human)  
  _From content: “Empty State has no copy of its own and shows a button only when you give it a label, so set all three.”_
- **recommended** `buttonLabel`: Name the next step on the button, such as “Make a payment”, and let the screen handle the press (onPress).  
  _From doDont: ““Make a payment” names the next step, and the screen handles the press.”_
- **discouraged** `buttonLabel`: Don't leave out the button label: without it there's no button, so people have no way forward.  
  _From doDont: “Without a button label there’s no button, so people have no way forward.”_

Good: “No payments yet”, “Payments you make will show up here.”, “Make a payment”, “No matching payments”, “Try a different name or amount.”, “Clear search”, “Couldn’t load payments”, “Check your connection and try again.”, “Try again”

## States

| State | When | From |
| --- | --- | --- |
| Shown while empty | Empty State has no states of its own: the screen shows it while there's nothing to list and replaces it when there is. | states: “Empty State has no states of its own: the screen shows it while there’s nothing to list and replaces it when there is.” |
| Ready | The button waits for a press. | states: “The button waits for a press.” |
| Retrying | While a retry is already running, the button is disabled. Empty State's own button takes no disabled, so the guide's Retrying example puts a disabled Button in buttonSlot. | states: “Disable the button while a retry is already running.” |

## Accessibility

- **recommended** `title`: On the web a titled Empty State is a region named by its title, which is a heading.  
  _From sources: “On the web a titled Empty State is a region named by its title, which is a heading.”_
- **recommended** `title`: Write a title: it is the heading and names the area for screen readers.  
  _From doDont: ““No payments yet” is the heading and names the area for screen readers.”_
- **discouraged** `title`: Don't leave the title out: the area then has no heading or name, so screen readers can't say what's empty.  
  _From doDont: “The area has no heading or name, so screen readers can’t say what’s empty.”_
- **recommended** `iconSlot`: Empty State's own icon is hidden from screen readers, but an icon you pass in is read as an unnamed image.  
  _From sources: “Its default icon is hidden from screen readers, but an icon you pass in is read as an unnamed image.”_
- **recommended** `accessibilityLabel`: accessibilityLabel names the area in place of the title; with neither, Empty State has no role or name.  
  _From fact `/facts/props/10` (accessibilityLabel, source evidence)_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Offer the next step | Leave out the button | Without a button label there’s no button, so people have no way forward. |
| Match the icon to the reason | Use the error icon for an empty list | A red alert makes “No payments yet” look like a failure. |
| Write a title | Leave the title out | The area has no heading or name, so screen readers can’t say what’s empty. |

## Examples

### An empty payments card, the guide's In context: the Recent payments card shows the Empty State until there's a payment; Make a payment (onPress) adds one, and the screen swaps the Empty State for the list. The icon is the guide's own Nothing yet capsule (ic_wallet with Emphasis Medium, the soft icon for an empty list).

```tsx
<Card>
  <Card.Title>Recent payments</Card.Title>
  <EmptyState
    iconSlot={<IconCapsule iconName="ic_wallet" modes={{ Emphasis: 'Medium' }} />}
    title="No payments yet"
    description="Payments you make will show up here."
    buttonLabel="Make a payment"
    onPress={() => {}}
  />
</Card>
```

_From inContext: “The Recent payments card shows the empty state until there’s a payment. Make a payment adds one, and the screen swaps the empty state for the list.”_

### Couldn't load: a red error icon when loading failed (Semantic Intent System with AppearanceSystem negative, set on the Icon Capsule so the button keeps its own look), and the button retries.

```tsx
<EmptyState
  iconSlot={<IconCapsule iconName="ic_error" modes={{ 'Semantic Intent': 'System', AppearanceSystem: 'negative' }} />}
  title="Couldn’t load payments"
  description="Check your connection and try again."
  buttonLabel="Try again"
  onPress={() => {}}
/>
```

_From configuration: “A red error icon when loading failed; the button retries.”_

### Retrying: while a retry is already running, the button is disabled. Empty State's own button takes no disabled, so a disabled Button goes in buttonSlot, as in the guide's Retrying example; it gets Empty State's modes.

```tsx
<EmptyState
  iconSlot={<IconCapsule iconName="ic_error" modes={{ 'Semantic Intent': 'System', AppearanceSystem: 'negative' }} />}
  title="Couldn’t load payments"
  description="Check your connection and try again."
  buttonSlot={<Button label="Try again" disabled />}
/>
```

_From states: “Disable the button while a retry is already running.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `title` | `string` |  | `""` |  | evidence (2026-10-23) | On the web, a titled Empty State is a section with role region named by its title (accessibilityRole summary), and the title is a heading (h1). Declared: Title text for the empty state Empty when omitted. Storybook's default story supplies the payments copy. Default "", from the component source. |
| `description` | `string` |  | `""` |  | types | Body description text. Empty when omitted. Default "", from the component source. |
| `showDescription` | `boolean` |  | `true` |  | types | Whether to show the description text. Default true, from the component source. |
| `iconSlot` | `React.ReactNode` |  |  |  | evidence (2026-10-23) | Left out, the default icon is hidden from screen readers (aria-hidden on the web); an IconCapsule you pass stays an unnamed image (role img). Declared: Custom slot for the icon area. Omit for the default IconCapsule. Pass `null` to remove the icon. Custom nodes receive `modes`. |
| `buttonSlot` | `React.ReactNode` |  |  |  | types | Custom slot for the action. Pass `null` to remove it. Omit to use `buttonLabel` / `onPress` when one of those is set; otherwise no button. |
| `buttonLabel` | `string` |  |  |  | evidence (2026-10-23) | With buttonLabel or onPress, and no buttonSlot, Empty State draws a Button that gets its modes; with neither, there is no button. Declared: Label for the default action. Renders a button only together with a label or `onPress`. |
| `onPress` | `() => void` |  |  |  | types | Press handler for the default action. |
| `modes` | `Modes` |  |  |  | types | Mode configuration for theming. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types |  |
| `testID` | `string` |  |  |  | types |  |
| `accessibilityLabel` | `string` |  |  |  | evidence (2026-10-23) | Names the Empty State in place of its title. Without a title and without accessibilityLabel, the Empty State has no role or name. |
| `accessibilityRole` | `AccessibilityRole` | button, header, link, menu, menuitem, search, summary, image, switch, text, none, togglebutton, keyboardkey, adjustable, imagebutton, alert, checkbox, combobox, menubar, progressbar, radio, radiogroup, scrollbar, spinbutton, tab, tabbar, tablist, timer, list, toolbar |  |  | types |  |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Primary"` |  | types | A token collection EmptyState reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `AppearanceSystem` | `mode collection` | positive, warning, negative | `"positive"` |  | evidence (2026-10-10) | On the Icon Capsule in iconSlot, Semantic Intent System with AppearanceSystem negative gives Figma's red error capsule (#f50030). Set on Empty State instead, it would also reach the button. Declared: A token collection EmptyState reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / Size` | `mode collection` | M, S, XS | `"M"` |  | evidence (2026-10-23) | The guide sets S on Empty State, whose modes reach its button, for Figma's 32 px button. Declared: A token collection EmptyState reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / State` | `mode collection` | Idle, Hover, Pressed, Disabled | `"Idle"` |  | types | A token collection EmptyState reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection EmptyState reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context` | `mode collection` | Default, Nudge&Alert, CTACard, ListItem | `"Default"` |  | types | A token collection EmptyState reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 10` | `mode collection` | Default, jioPlus | `"Default"` |  | types | A token collection EmptyState reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context2` | `mode collection` | Default, AppBar | `"Default"` |  | types | A token collection EmptyState reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Emphasis` | `mode collection` | High, Medium, Low | `"High"` |  | evidence (2026-10-10) | On the Icon Capsule in iconSlot, Emphasis Medium gives a pale capsule (#fde8c9); the default capsule is gold (#cea15a). Declared: A token collection EmptyState reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Icon Capsule Size` | `mode collection` | M, L, S, XS | `"M"` |  | evidence (2026-10-10) | On the Icon Capsule, L is Figma's 81 px capsule with a 36 px icon; the default capsule is 42 px. Declared: A token collection EmptyState reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection EmptyState reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Profile Card Appearance` | `mode collection` | Default, Premium | `"Default"` |  | types | A token collection EmptyState reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Semantic Intent` | `mode collection` | Brand, System | `"Brand"` |  | types | A token collection EmptyState reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `iconSlot` | `React.ReactNode` |  |  |  | evidence (2026-10-23) | null or false removes the icon; a node you pass gets Empty State's modes, and its own modes win. Declared: Custom slot for the icon area. Omit for the default IconCapsule. Pass `null` to remove the icon. Custom nodes receive `modes`. |
| `buttonSlot` | `React.ReactNode` |  |  |  | evidence (2026-10-23) | null or false removes the button; a node you pass gets Empty State's modes, and its own modes win. Declared: Custom slot for the action. Pass `null` to remove it. Omit to use `buttonLabel` / `onPress` when one of those is set; otherwise no button. |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onPress` | `() => void` |  |  |  | types | Press handler for the default action. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- The published Storybook predates this build (the #231 fix on c8526ae), so its Empty State pages are older than the package. _(evidence, 2026-10-23)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/content/rules/3` · human: "shows a button only when you give it a label" is narrower than the package: the guide's Sources and the installed EmptyState.tsx (0.1.78-dbe0e02, read from source) show a button with a label or an action, and onPress alone draws a Button with an empty label. Guide fix #524. Added by Claude Code in the overnight run agentpack-batch6, for Marcin to confirm.
