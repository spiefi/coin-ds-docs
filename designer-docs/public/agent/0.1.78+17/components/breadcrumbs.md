# Breadcrumbs

> Coin agent pack 0.1.78+17 (pilot). Generated from `components/breadcrumbs.json`; the JSON is the source of truth.

- **State:** flagged (4 flags, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `09a45da` · built 2026-10-29T09:06:00Z
- **Category:** navigation (for discovery only, not a limit on composition) · **Tags:** path, trail, hierarchy, back navigation
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=breadcrumbs) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=9788-1945) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-breadcrumbs--docs)

Use Breadcrumbs when people need a compact path back through a hierarchy. The trail moves from the broadest ancestor to the current page.

## Use when

- **recommended** People need a compact path back through a hierarchy.  
  _From summary: “Use Breadcrumbs when people need a compact path back through a hierarchy.”_
- **recommended** The route has meaningful ancestors and the current page needs orientation.  
  _From content: “Breadcrumbs works when the route has meaningful ancestors and the current page needs orientation.”_
- **recommended** Orient people above a report page when the route has meaningful ancestors.  
  _From inContext: “Orient people above a report page when the route has meaningful ancestors.”_

## Avoid when

- **discouraged** In place of the page title or primary navigation: Breadcrumbs shows the hierarchy beside them, without replacing them.  
  _From anatomy: “The published component communicates hierarchy without replacing the page title or primary navigation.”_
- **discouraged** To duplicate primary navigation.  
  _From configuration: “Do not duplicate primary navigation”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Breadcrumb trail | The whole trail, built from items: it shows the hierarchy without replacing the page title or primary navigation. | yes | anatomy: “The published component communicates hierarchy without replacing the page title or primary navigation.” |
| Ancestor links | The items before the current page, from the broadest ancestor toward it. Each can take people back one level when onItemPress (or the item's own onPress) is given. | no | anatomy: “Items are ordered from the broadest ancestor toward the current page. Each ancestor can take people back one level.” |
| Automatic chevrons | The separators between items, which express the path; the component adds them, so add no manual punctuation or duplicate chevrons. | no | anatomy: “Separators express the path between items. Do not add manual punctuation or duplicate chevrons.” |
| Current page | The item marked current (BreadcrumbItem.current), or the last item when none is marked. | yes | anatomy: “The last item is current unless an explicit current item is supplied.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `items` | `BreadcrumbItem` | types |

## Placement

- **recommended** Place Breadcrumbs above page content, when the route supports backtracking.  
  _From inContext: “Use Breadcrumbs above page content when the route supports backtracking.”_
- **recommended** Keep it secondary: it supports orientation and should not compete with primary navigation or the page heading.  
  _From content: “Breadcrumbs supports orientation. It should not compete with primary navigation or the page heading.”_
- **recommended** The trail's width comes from its parent.  
  _From sizing: “Width comes from the parent.”_
- **recommended** Keep a long route in its constrained parent so people can still parse each level.  
  _From inContext: “Keep a long route in its constrained parent so people can still parse each level.”_

## Configuration

- **REQUIRED** `items`: items is the trail in route order, from the broadest ancestor to the current page; each item has a label.  
  _From fact `/facts/props/0` (items, source types)_
- **recommended** `BreadcrumbItem.current`: The current page is the item with current: true; when no item has it, the last item is current. The current crumb is not pressable unless it has its own onPress.  
  _From fact `/facts/props/9` (BreadcrumbItem.current, source types)_
- **recommended** `onItemPress`: Give onItemPress so ancestors can take people back: it is called with the pressed item and its index, and not for the current crumb unless that crumb has its own onPress.  
  _From fact `/facts/props/1` (onItemPress, source types)_
- **recommended** `items`: Configure the content hierarchy (the items) and let the component render the path.  
  _From configuration: “Configure content hierarchy and let the published component render the path.”_
- **discouraged** Do not draw chevrons, link styling or a current-page treatment yourself: the component supplies them. ⚑ flagged (human)  
  _From corePrinciple: “Chevrons, link treatment, and current-page state are supplied by the published component.”_
- **recommended** A constrained parent lets a long trail wrap; the component does not auto-collapse the route.  
  _From configuration: “A constrained parent lets a long trail wrap. The component does not auto-collapse the route.”_
- **discouraged** Do not present a responsive collapse or an item count as a designer-selected control: the trail reflects the hierarchy and the available width.  
  _From states: “Do not represent a responsive collapse or item count as a designer-selected control.”_
- **discouraged** `items`: Do not reverse the route to match a visual shortcut: the reading order stops matching the hierarchy and the current location becomes ambiguous.  
  _From doDont: “The reading order stops matching the hierarchy and current location becomes ambiguous.”_

## Content

- **recommended** `items`: Start broad: order items from the broadest ancestor toward the current page.  
  _From content: “Order items from the broadest ancestor toward the current page.”_
- **recommended** Preserve route order and keep the current page visible in the trail.  
  _From corePrinciple: “Preserve route order and keep the current page visible.”_
- **recommended** `BreadcrumbItem.label`: Name the current page: keep the final item concise and aligned with the page title.  
  _From content: “Keep the final item concise and aligned with the page title.”_
- **discouraged** Do not add manual punctuation or duplicate chevrons between items: the separators express the path, and the component supplies them.  
  _From anatomy: “Do not add manual punctuation or duplicate chevrons.”_

## States

| State | When | From |
| --- | --- | --- |
| Default trail | The ancestors in route order, ending at the current page, such as Cloud, ITR, 2024-25, Original. | states: “Cloud → ITR → 2024-25 → Original.” |
| Long trail | A route longer than the line: the items wrap within the constrained parent. | states: “Items wrap within the constrained parent.” |
| Interactive item | With onItemPress, ancestor items navigate; the current item stays current. | states: “Ancestor items can navigate; current remains current.” |

## Accessibility

- **recommended** The current page should agree with the visible heading and carry current-page semantics; the component marks the current crumb.  
  _From inContext: “The current page should agree with the visible heading and carry current-page semantics.”_
- **recommended** `accessibilityLabel`: The trail is announced as “Breadcrumb” unless accessibilityLabel names it.  
  _From fact `/facts/props/5` (accessibilityLabel, source types)_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Order the trail from ancestor to current | Reverse the route to match a visual shortcut | The reading order stops matching the hierarchy and current location becomes ambiguous. |
| Let a long trail wrap inside its parent | Invent an unapproved auto-collapse | The component does not decide to replace route levels with an ellipsis menu. |

## Examples

### A report page, the guide's In context: the trail sits above the page content, from the broadest ancestor to the current page (the guide's default trail: Cloud, ITR, 2024-25, Original); ancestors take people back through onItemPress.

```tsx
<Breadcrumbs
  items={[
    { label: 'Cloud' },
    { label: 'ITR' },
    { label: '2024-25' },
    { label: 'Original', current: true },
  ]}
  onItemPress={() => {}}
/>
```

_From inContext: “Orient people above a report page when the route has meaningful ancestors.”_

### A long route: the trail wraps inside its parent instead of collapsing, so every level stays readable.

```tsx
<Breadcrumbs
  items={[
    { label: 'Cloud' },
    { label: 'ITR' },
    { label: '2024-25' },
    { label: 'Original' },
    { label: 'Returns' },
    { label: 'Summary', current: true },
  ]}
  onItemPress={() => {}}
/>
```

_From inContext: “Keep a long route in its constrained parent so people can still parse each level.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `items` | `BreadcrumbItem[]` |  |  | yes | types | Ordered trail from ancestor to the current page. |
| `onItemPress` | `(item: BreadcrumbItem, index: number) => void` |  |  |  | types | Called with the pressed item and its index. Not invoked for the current crumb unless that crumb supplies its own `onPress`. |
| `modes` | `Modes` |  |  |  | types | Design token modes forwarded to `HStack`, `Text`, and `Icon`. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Override the wrapping trail container. |
| `testID` | `string` |  |  |  | types | Test ID for the trail container. |
| `accessibilityLabel` | `string` |  | `"Breadcrumb"` |  | types | Accessibility label for the trail. Defaults to `"Breadcrumb"`. Default "Breadcrumb", from the component source. |
| `BreadcrumbItem.key` | `string` |  |  |  | types | Optional stable key. Falls back to `label` + index. A field of each items row. |
| `BreadcrumbItem.label` | `string` |  |  | yes | types | Visible crumb label. A field of each items row. |
| `BreadcrumbItem.onPress` | `() => void` |  |  |  | types | Called when this crumb is pressed. Takes precedence over the list-level `onItemPress` handler. A field of each items row. |
| `BreadcrumbItem.current` | `boolean` |  |  |  | types | Marks this crumb as the current page. When omitted, the last item is treated as current and is not pressable unless it has its own `onPress`. A field of each items row. |
| `BreadcrumbItem.accessibilityLabel` | `string` |  |  |  | types | Override announced to assistive tech. Defaults to `label`. A field of each items row. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Primary"` |  | types | A token collection Breadcrumbs reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `AppearanceSystem` | `mode collection` | positive, warning, negative | `"positive"` |  | types | A token collection Breadcrumbs reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Background` | `mode collection` | False, True | `"False"` |  | types | A token collection Breadcrumbs reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Badge Size` | `mode collection` | Medium, Small | `"Medium"` |  | types | A token collection Breadcrumbs reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection Breadcrumbs reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context` | `mode collection` | Default, Nudge&Alert, CTACard, ListItem | `"Default"` |  | types | A token collection Breadcrumbs reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 10` | `mode collection` | Default, jioPlus | `"Default"` |  | types | A token collection Breadcrumbs reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context4` | `mode collection` | Default, Chip, Button, Badge, Badge/glass | `"Default"` |  | types | A token collection Breadcrumbs reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Emphasis` | `mode collection` | High, Medium, Low | `"High"` |  | types | A token collection Breadcrumbs reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Icon Size` | `mode collection` | Medium, Small | `"Medium"` |  | types | A token collection Breadcrumbs reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Padding` | `mode collection` | Default, None | `"Default"` |  | types | A token collection Breadcrumbs reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection Breadcrumbs reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Profile Card Appearance` | `mode collection` | Default, Premium | `"Default"` |  | types | A token collection Breadcrumbs reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Semantic Intent` | `mode collection` | Brand, System | `"Brand"` |  | types | A token collection Breadcrumbs reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Slot gap` | `mode collection` | S, M, L, XL, XS | `"S"` |  | types | A token collection Breadcrumbs reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Stack Context` | `mode collection` | Root, Nested | `"Root"` |  | types | A token collection Breadcrumbs reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Text Appearance` | `mode collection` | Neutral, Primary, Secondary, Tertiary, Success, Warning, Error | `"Neutral"` |  | types | A token collection Breadcrumbs reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Text Sizes` | `mode collection` | Medium, Small, Large | `"Medium"` |  | types | A token collection Breadcrumbs reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Weight` | `mode collection` | Medium, Regular, Bold | `"Medium"` |  | types | A token collection Breadcrumbs reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `items` | `BreadcrumbItem[]` |  |  |  | types | A structured slot: an array of BreadcrumbItem rows. Ordered trail from ancestor to the current page. |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onItemPress` | `(item: BreadcrumbItem, index: number) => void` |  |  |  | types | Called with the pressed item and its index. Not invoked for the current crumb unless that crumb supplies its own `onPress`. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- In the inspected Storybook iframe the trail's root is a div with an accessible label but no navigation role; the evidence asks for a source accessibility follow-up. _(evidence, 2026-09-19)_ ⚑ flagged (trace-check)
- Figma's Breadcrumbs exposes no properties in the inspected Figma source. _(evidence, 2026-09-15)_ ⚑ flagged (trace-check)

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/facts/gaps/0` · trace-check: Checked on jfs-components 0.1.60 (2026-09-19); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/gaps/1` · trace-check: Checked on jfs-components 0.1.60 (2026-09-15); the installed package is 0.1.78. Re-check before relying on it.
- `(whole entry)` · human: The Breadcrumbs guide and its evidence were checked in September 2026 on jfs-components 0.1.60 and say the package has no Breadcrumbs ("the resolved package does not include Breadcrumbs"); its previews are drawn from NavArrow and Text. The installed 0.1.78 (mirror v0.1.78-dbe0e02) exports Breadcrumbs, and the entry's facts and examples come from it. Re-extract once the guide is re-checked on 0.1.78 and published (#521). Added by Claude Code in the overnight run agentpack-batch6, for Marcin to confirm.
- `/configuration/4` · human: "Chevrons, link treatment, and current-page state are supplied by the published component." says more than the installed Breadcrumbs.tsx does (read, not rendered): it adds the chevrons, but every crumb gets the same text style, so ancestors have no link colour and the current crumb is not set apart visually (it only gets aria-current on the web, selected on native). Guide fix #521. Added by Claude Code in the overnight run agentpack-batch6, for Marcin to confirm.
