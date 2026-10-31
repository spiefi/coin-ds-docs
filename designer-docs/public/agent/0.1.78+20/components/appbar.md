# AppBar

> Coin agent pack 0.1.78+20 (pilot). Generated from `components/appbar.json`; the JSON is the source of truth.

- **State:** flagged (12 flags, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `31f1c5e` · built 2026-10-31T00:24:09Z
- **Category:** navigation (for discovery only, not a limit on composition) · **Tags:** header, top bar, navigation bar, nav bar, toolbar, title bar
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=appbar) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1070-18571) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-appbar--docs)

Keep page identity, navigation and a few relevant actions together at the top of a view.

## Use when

- **recommended** Keep page identity, navigation and a few relevant actions together at the top of a view.  
  _From summary: “Keep page identity, navigation and a few relevant actions together at the top of a view.”_

## Avoid when

_None in the guide._

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Leading | The leadingSlot: back or a product mark, such as JioDot, that establishes where the page sits in the flow. | no | anatomy: “Back or a product mark establishes where the page sits in the flow.” |
| Middle | The middleSlot: on a sub page, the title, centered inside the 192px middle slot. | no | anatomy: “The SubPage title stays centered inside the 192px middle slot.” |
| Actions | The actionsSlot: a small set of public actions that support the current page. | no | anatomy: “Use a small set of public actions that support the current page.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `leadingSlot` | `ReactNode` | types |
| `middleSlot` | `ReactNode` | types |
| `actionsSlot` | `ReactNode` | types |

## Placement

- **recommended** Place the App Bar at the top of a view.  
  _From summary: “at the top of a view”_
- **recommended** The host sets the available width; AppBar derives its height from its padding and children.  
  _From sizing: “AppBar derives its height from its public padding and children.”_
- **recommended** `actionsSlot`: At up to 360px of content width, one focused action leaves room; longer titles or extra actions compete with the side slots.  
  _From sizing: “At up to 360px of content width, one focused action leaves room; longer titles or extra actions compete with the side slots.”_
- **recommended** Let the product flow own navigation state: AppBar presents the current destination and invokes the child actions the flow supplies.  
  _From inContext: “The product flow owns navigation state.”_

## Configuration

- **recommended** `type` = `MainPage`: Choose the page relationship first: the main page type gives a view its identity.  
  _From configuration: “MainPage gives a view its identity.”_
- **recommended** `type` = `SubPage`: Use the sub page type for a child destination: it supplies a back relationship and centers its title independently from the side slots.  
  _From configuration: “SubPage supplies a back relationship and centers its title independently from the side slots.”_
- **discouraged** `type` = `MainPage`: Do not give a detail view the main page identity: JioDot and an empty middle slot describe a top-level destination, not a child page.  
  _From doDont: “JioDot and an empty middle slot describe a top-level destination, not a child page.”_
- **recommended** `leadingSlot`: For a main page, the published story pairs JioDot with low-emphasis add and Avatar actions and leaves the middle slot empty.  
  _From configuration: “The published MainPage story pairs JioDot with low-emphasis add and Avatar actions and leaves the middle slot empty.”_
- **recommended** `leadingSlot`: A main page has no default leading node: pass JioDot, or another mark, in leadingSlot.  
  _From fact `/facts/props/1` (leadingSlot, source evidence)_
- **recommended** `leadingSlot`: On a sub page, supply an accessible back action: an IconButton with a Go back label in leadingSlot, so the leading action has a clear accessible name.  
  _From configuration: “The guide supplies a public IconButton with a Go back label so the leading action has a clear accessible name.”_
- **recommended** `middleSlotWidth`: The sub page middle slot is 192 px wide by default; middleSlotWidth changes it and has no effect on a main page.  
  _From fact `/facts/props/3` (middleSlotWidth, source evidence)_
- **recommended** `actionsSlot`: Keep actions focused: one low-emphasis action leaves the destination and the next step easy to scan.  
  _From doDont: “One low-emphasis action leaves the destination and the next step easy to scan.”_
- **discouraged** `actionsSlot`: Do not overcrowd the actions slot: every extra control competes with the few actions that support the current task.  
  _From doDont: “Every extra control competes with the few actions that support the current task.”_
- **recommended** Configure the bar type and slots, then configure availability on the child action that needs it: AppBar owns the arrangement, and its IconButton children own enabled and disabled feedback.  
  _From states: “Configure the bar type and slots, then configure availability on the public child action that needs it.”_
- **recommended** `modes`: Set modes on AppBar: it resolves its own modes with Context2 AppBar and cascades the result to its direct slot children. ⚑ flagged (trace-check)  
  _From evidence: “AppBar resolves its own modes with `Context2=AppBar` and cascades the resulting mode object to direct slot children.”_

## Content

- **recommended** Use the bar to orient people. Keep its title short and its actions focused.  
  _From corePrinciple: “Use the bar to orient people. Keep its title short and its actions focused.”_
- **recommended** `middleSlot`: Keep the title short: use the page name people need to recognize, then move supporting detail into the page body.  
  _From content: “Use the page name people need to recognize, then move supporting detail into the page body.”_
- **discouraged** `middleSlot`: Do not put the page brief inside the bar: the centered slot clips extra words when a title carries the whole page brief.  
  _From doDont: “The centered slot clips extra words when a title carries the whole page brief.”_
- **recommended** `actionsSlot`: Show only the few actions that help someone complete the current task.  
  _From content: “Show only the few actions that help someone complete the current task.”_
- **recommended** `actionsSlot`: Each action should support the page people are on and remain understandable from its accessible label.  
  _From content: “Each action should support the page they are on and remain understandable from its accessible label.”_

Good: “Bills”, “Payments”, “Payment details”, “Overview”, “Go back”

Bad: “Your complete investment dashboard”

## States

| State | When | From |
| --- | --- | --- |
| Enabled actions | The page has a useful next action: its IconButton in the actions slot is enabled. | states: “Use the actions slot when the page has a useful next action.” |
| Disabled child | A child action is temporarily unavailable: disable that child IconButton. | states: “Disable a child IconButton when its action is temporarily unavailable.” |

## Accessibility

- **recommended** `leadingSlot`: On a sub page, supply a named back action in leadingSlot, such as an IconButton with accessibilityLabel “Go back”: the package default back arrow has no accessible name. ⚑ flagged (trace-check)  
  _From sources: “the guide also supplies a named public back action because the package default has no accessible name.”_
- **recommended** Name icon actions with the IconButton accessibilityLabel so icon-only controls remain discoverable.  
  _From content: “Use the public IconButton accessibilityLabel so icon-only controls remain discoverable.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Keep the destination concise | Put the page brief inside the bar | The centered slot clips extra words when a title carries the whole page brief. |
| Keep actions focused | Overcrowd the actions slot | Every extra control competes with the few actions that support the current task. |
| Use SubPage for a child destination | Use MainPage identity for a detail view | JioDot and an empty middle slot describe a top-level destination, not a child page. |

## Examples

### A child destination: a named Go back action, a short centered title, and one low-emphasis action.

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

_From doDont: “The supplied Go back action makes the relationship to the parent page explicit.”_

### A top-level destination: JioDot in the leading slot, low-emphasis add and Avatar actions, and an empty middle slot.

```tsx
<AppBar
  type="MainPage"
  modes={{ 'Color Mode': 'Light', Context2: 'AppBar', 'Page type': 'MainPage' }}
  leadingSlot={<JioDot modes={{ 'Color Mode': 'Light', Context2: 'AppBar', 'Page type': 'MainPage' }} />}
  actionsSlot={[
    <IconButton
      key="add"
      iconName="ic_add"
      accessibilityLabel="Add item"
      onPress={() => {}}
      modes={{ 'Color Mode': 'Light', Context2: 'AppBar', 'Page type': 'MainPage', Emphasis: 'Low' }}
    />,
    <Avatar key="avatar" modes={{ 'Color Mode': 'Light', Context2: 'AppBar', 'Page type': 'MainPage' }} />,
  ]}
/>
```

_From configuration: “The published MainPage story pairs JioDot with low-emphasis add and Avatar actions and leaves the middle slot empty.”_

### A child action that is temporarily unavailable, disabled on the IconButton itself.

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
      Bills
    </Text>
  }
  actionsSlot={
    <IconButton
      iconName="ic_more_horizontal"
      accessibilityLabel="More options"
      disabled
      onPress={() => {}}
      modes={{ 'Color Mode': 'Light', Context2: 'AppBar', 'Page type': 'SubPage', Emphasis: 'Low' }}
    />
  }
/>
```

_From states: “Disable a child IconButton when its action is temporarily unavailable.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `type` ⚑ flagged (trace-check) | `AppBarType` | MainPage, SubPage | `"MainPage"` |  | evidence (2026-09-21) | Figma's main page variant includes the JioDot mark; the package makes JioDot opt-in through leadingSlot. Declared: Type of the App Bar. - `MainPage`: Taller bar; no default leading (pass `JioDot` or your logo via `leadingSlot`). - `SubPage`: Shorter bar with default back arrow and centered middle slot. Default "MainPage", from the component source. |
| `leadingSlot` ⚑ flagged (trace-check) | `React.ReactNode` |  |  |  | evidence (2026-09-21) | On a sub page, omitting leadingSlot gives a default back arrow whose button has no accessible name; a main page has no default leading node. Declared: Slot for the leading element. Defaults: - MainPage: none (opt in with `<JioDot />` or any custom node) - SubPage: Back `NavArrow`. |
| `middleSlot` | `React.ReactNode` |  |  |  | types | Slot for the middle content. Often used for a page title on SubPage. On `SubPage` this is rendered as an absolutely-centered box (Figma "slot wrap"): it stays centered regardless of leading/actions width, and content fills/shrinks within {@link middleSlotWidth}. |
| `middleSlotWidth` ⚑ flagged (trace-check) | `number` |  | `192` |  | evidence (2026-09-21) | Defaults to 192; the sub page middle is centered in an absolute overlay with 21px horizontal inner padding and clips overflow. Declared: Width of the centered `SubPage` middle slot, in px. Defaults to the Figma value (192). Has no effect on `MainPage`. Default 192, from the component source. |
| `actionsSlot` | `React.ReactNode` |  |  |  | types | Slot for the actions on the right (IconButtons, Avatar, etc.). |
| `modes` ⚑ flagged (trace-check) | `Modes` |  |  |  | evidence (2026-09-21) | AppBar resolves its own modes with Context2=AppBar and cascades the resulting mode object to its direct slot children. Declared: Token modes to override. |
| `onLeadingPress` | `() => void` |  |  |  | types | Callback for the default SubPage leading back arrow. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Container style override. |
| `accessibilityLabel` | `string` |  |  |  | types |  |
| `accessibilityHint` | `string` |  |  |  | types |  |
| `...Omit<React.ComponentProps<typeof View>, 'style' | 'accessibilityRole' | 'accessibilityLabel' | 'accessibilityHint'>` | `Omit<React.ComponentProps<typeof View>, 'style' \| 'accessibilityRole' \| 'accessibilityLabel' \| 'accessibilityHint'>` |  |  |  | types | Inherited React Native props the component also accepts. They are not part of the design contract and no guide documents them. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection AppBar reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 10` | `mode collection` | Default, jioPlus | `"Default"` |  | types | A token collection AppBar reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context2` ⚑ flagged (trace-check) | `mode collection` | Default, AppBar | `"Default"` |  | evidence (2026-09-21) | Both Figma variants own Context2=AppBar; AppBar resolves its own modes with it. Declared: A token collection AppBar reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context5` | `mode collection` | Default, Fullscreen Modal, Mode 1 | `"Default"` |  | types | A token collection AppBar reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `List Item Style` | `mode collection` | Default, Boxed, Minimal | `"Default"` |  | types | A token collection AppBar reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `NavArrow Direction` | `mode collection` | Left&Right, Top&Bottom | `"Left&Right"` |  | types | A token collection AppBar reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection AppBar reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Profile Card Appearance` | `mode collection` | Default, Premium | `"Default"` |  | types | A token collection AppBar reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `leadingSlot` | `React.ReactNode` |  |  |  | types | Slot for the leading element. Defaults: - MainPage: none (opt in with `<JioDot />` or any custom node) - SubPage: Back `NavArrow` |
| `middleSlot` | `React.ReactNode` |  |  |  | types | Slot for the middle content. Often used for a page title on SubPage. On `SubPage` this is rendered as an absolutely-centered box (Figma "slot wrap"): it stays centered regardless of leading/actions width, and content fills/shrinks within {@link middleSlotWidth}. |
| `actionsSlot` | `React.ReactNode` |  |  |  | types | Slot for the actions on the right (IconButtons, Avatar, etc.). |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onLeadingPress` | `() => void` |  |  |  | types | Callback for the default SubPage leading back arrow. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- The default sub page back arrow has no accessible name: its button passes no accessibilityLabel. _(evidence, 2026-09-21)_ ⚑ flagged (trace-check)
- Figma's main page shows the JioDot mark; the package renders none unless leadingSlot is given JioDot. _(evidence, 2026-09-21)_ ⚑ flagged (trace-check)
- Figma's fixed reference heights (main page 68 px, sub page 52 px) are not fixed in code: the bar's height comes from its padding plus its children. _(evidence, 2026-09-21)_ ⚑ flagged (trace-check)
- A long sub page title is constrained by the centered 192px middle box and clips or truncates. _(evidence, 2026-09-21)_ ⚑ flagged (trace-check)

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/facts/props/1` · trace-check: Checked on jfs-components 0.1.60 (2026-09-21); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/props/3` · trace-check: Checked on jfs-components 0.1.60 (2026-09-21); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/props/5` · trace-check: Checked on jfs-components 0.1.60 (2026-09-21); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/props/0` · trace-check: Checked on jfs-components 0.1.60 (2026-09-21); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/modes/2` · trace-check: Checked on jfs-components 0.1.60 (2026-09-21); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/gaps/0` · trace-check: Checked on jfs-components 0.1.60 (2026-09-21); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/gaps/1` · trace-check: Checked on jfs-components 0.1.60 (2026-09-21); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/gaps/2` · trace-check: Checked on jfs-components 0.1.60 (2026-09-21); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/gaps/3` · trace-check: Checked on jfs-components 0.1.60 (2026-09-21); the installed package is 0.1.78. Re-check before relying on it.
- `/configuration/10` · trace-check: Checked on jfs-components 0.1.60 (2026-09-21); the installed package is 0.1.78. Re-check before relying on it.
- `/accessibility/0` · trace-check: Checked on jfs-components 0.1.60 (2026-09-21); the installed package is 0.1.78. Re-check before relying on it.
- `/avoidWhen` · trace-check: The guide gives no avoidWhen guidance; left empty rather than guessed.
