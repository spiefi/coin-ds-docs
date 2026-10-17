# Button

> Coin agent pack 0.1.78+2 (pilot). Generated from `components/button.json`; the JSON is the source of truth.

- **State:** flagged (2 flags, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `09a45da` · built 2026-10-17T11:10:07Z
- **Category:** action (for discovery only, not a limit on composition) · **Tags:** CTA, call to action, primary button, secondary button, submit
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=button) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3574-181) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-button--docs)

Use Button when one clear action moves someone forward, confirms a choice, or completes a task.

## Use when

- **recommended** One clear action moves someone forward, confirms a choice, or completes a task.  
  _From summary: “Use Button when one clear action moves someone forward, confirms a choice, or completes a task.”_

## Avoid when

- **discouraged** `loading`: Avoid loading as a substitute for transaction progress; it is for while required content is being prepared.  
  _From states: “Use loading while required content is being prepared, not as a substitute for transaction progress.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Container | Holds the action and resolves its visual treatment. | yes | anatomy: “Holds the action and resolves its visual treatment.” |
| Start slot | Optional leading node: an icon that clarifies the action. | no | anatomy: “Optional. Use for an icon that clarifies the action.” |
| Label | The label: names the outcome in one to three words. | yes | anatomy: “Required. Name the outcome in one to three words.” |
| End icon | Optional icon after the label, for direction or continuation. | no | anatomy: “Optional. Use when direction or continuation matters.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `children` | `ReactNode` | types |
| `renderContent` | `((styles: StyleProp<TextStyle>) => React.ReactNode)` | types |
| `leading` | `ReactNode` | types |
| `trailing` | `ReactNode` | types |

## Placement

- **recommended** Place the action where the decision happens, and let surrounding content explain the choice.  
  _From inContext: “Use surrounding content to explain the choice. Let the button stay concise.”_
- **recommended** In a wide container, keep the action close to the content it completes.  
  _From sizing: “Keep the action close to the content it completes.”_
- **recommended** Make one action the strongest; competing actions should not share equal emphasis.  
  _From doDont: “Two dominant actions make the choice harder to read.”_
- **recommended** Let container width resolve the layout: the same action can fill a narrow container's width. There is no separate desktop or mobile Button.  
  _From sizing: “Container width resolves the layout. Designers choose the label, hierarchy, and size—not a separate “desktop” or “mobile” Button.”_

## Configuration

- **recommended** `type` = `default`: Use type default for most actions; it hugs its label or fills its container when the layout asks it to.  
  _From configuration: “The standard solid action. It hugs its label or fills its container when the layout asks it to.”_
- **recommended** `type` = `fixed`: Use type fixed for aligned, bounded actions: it keeps long content within the system width limit.  
  _From configuration: “Keeps long content within the system width limit. It remains responsive rather than using a hand-set pixel width.”_
- **discouraged** `type` = `fixed`: Do not use type fixed for a full-width action: fixed is bounded by the system and will not fill. Use type default for a footer action that fills its container.  
  _From doDont: “Fixed is bounded by the system and will not behave like Fill.”_
- **recommended** `type` = `glass`: Use type glass only over a meaningful backdrop such as rich media or a coloured surface. ⚑ flagged (trace-check)  
  _From configuration: “Use only over a meaningful backdrop”_
- **discouraged** `type` = `glass`: Do not place type glass on a plain, low-contrast surface: it loses its purpose and can become hard to read.  
  _From doDont: “The treatment loses its purpose and can become hard to read.”_
- **recommended** `Emphasis`: Appearance identifies the family; Emphasis sets how loudly the action speaks within it.  
  _From configuration: “Appearance identifies the family. Emphasis decides how loudly the action speaks within that family.”_
- **recommended** `Semantic Intent` = `System`: Reserve Semantic Intent System (AppearanceSystem positive, warning or negative) for an outcome with clear positive, warning or negative meaning.  
  _From configuration: “Reserve these appearances for an outcome with clear positive, warning, or negative meaning.”_
- **recommended** `Button / Size` = `M`: Button / Size M: the action leads a screen, sheet or key step.  
  _From sizing: “The action leads a screen, sheet, or key step.”_
- **recommended** `Button / Size` = `S`: Button / Size S: the action sits inside a card or compact group.  
  _From sizing: “The action sits inside a card or compact group.”_
- **recommended** `Button / Size` = `XS`: Button / Size XS: space is dense and the surrounding touch area stays usable.  
  _From sizing: “Space is dense and the surrounding touch area stays usable.”_
- **recommended** Most actions need at most one of the start slot and end icon, and many need neither.  
  _From anatomy: “Most actions need one at most, and many need neither.”_
- **recommended** `disabled`: Give disabled a clear condition; hover and pressed happen automatically and are not configured.  
  _From states: “Hover and pressed happen automatically. Disabled should have a clear condition.”_

## Content

- **recommended** `label`: Make the action clear before choosing its appearance; the label should explain what happens next.  
  _From corePrinciple: “Make the action clear before choosing its appearance. The label should explain what happens next.”_
- **recommended** `label`: Lead with a verb, such as “Save details”, “Transfer money” or “View statement”.  
  _From content: “Use clear actions such as “Save details”, “Transfer money”, or “View statement”.”_
- **recommended** `label`: Aim for one to three words. Put the explanation beside the button, not inside it.  
  _From content: “Aim for one to three words. Put explanation beside the button, not inside it.”_
- **recommended** `icon`: Add an icon only when it improves recognition, direction, or the action's meaning.  
  _From content: “Add one only when it improves recognition, direction, or the action’s meaning.”_
- **recommended** `label`: Be specific: prefer “Pay ₹500” or “Download report” over a vague “OK” when the outcome can be named.  
  _From content: “Prefer “Pay ₹500” or “Download report” over a vague “OK” when the outcome can be named.”_

Good: “Save details”, “Transfer money”, “Pay ₹1,250”, “Confirm payment”

Bad: “Click here to transfer your money now”

## States

| State | When | From |
| --- | --- | --- |
| Idle | Ready for action. | states: “Ready for action.” |
| Hover | Appears automatically under a pointer; not configured. | states: “Appears automatically under a pointer.” |
| Pressed | Appears while the action is held; not configured. | states: “Appears while the action is held.” |
| Disabled | disabled is true; unavailable until a condition is met. | states: “Unavailable until a condition is met.” |
| Loading | loading is true while required content is being prepared; a shape-preserving skeleton holds the action's place. | states: “A shape-preserving skeleton holds the action’s place.” |

## Accessibility

_None in the guide._

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Write a short, verb-led label | Put the explanation inside the button | Long labels are slower to scan and can truncate. |
| Make one action strongest | Give competing actions equal emphasis | Two dominant actions make the choice harder to read. |
| Use Default when a footer action fills the container | Use Fixed as a substitute for a full-width action | Fixed is bounded by the system and will not behave like Fill. |
| Use Glass over a visible backdrop | Place Glass on a plain, low-contrast surface | The treatment loses its purpose and can become hard to read. |

## Examples

### A primary action that leads a step, filling its container's width.

```tsx
<Button
  label="Pay ₹1,250"
  onPress={() => {}}
  style={{ width: '100%' }}
  modes={{ 'Color Mode': 'Light', 'Button / Size': 'M', Emphasis: 'High', 'Semantic Intent': 'Brand', AppearanceBrand: 'Primary' }}
/>
```

_From inContext: “Default · M · full available width”_

### One strongest action beside a quieter one.

```tsx
<HStack modes={{ 'Color Mode': 'Light' }}>
  <Button label="Back" onPress={() => {}} modes={{ 'Color Mode': 'Light', Emphasis: 'Low', AppearanceBrand: 'Neutral' }} />
  <Button label="Continue" onPress={() => {}} modes={{ 'Color Mode': 'Light', Emphasis: 'High', AppearanceBrand: 'Primary' }} />
</HStack>
```

_From doDont: “Make one action strongest”_

### A positive system action with clear meaning, in a card.

```tsx
<Button label="Confirm" onPress={() => {}} modes={{ 'Color Mode': 'Light', 'Button / Size': 'S', 'Semantic Intent': 'System', AppearanceSystem: 'positive' }} />
```

_From configuration: “Reserve these appearances for an outcome with clear positive, warning, or negative meaning.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `label` | `string` |  | `"Button"` |  | types | Label text to display when no children are provided. Default "Button", from the component source. |
| `children` | `React.ReactNode` |  |  |  | types | Optional custom content to render inside the button. When provided, this is treated as a full-content override and `label`/`labelStyle` are ignored. |
| `renderContent` | `(styles: StyleProp<TextStyle>) => React.ReactNode` |  |  |  | types | Optional render prop for taking over the inner label/content while still reusing the token-driven text styles. When provided, this takes precedence over `children`. The `styles` argument is the merged text style (base token styles + `labelStyle`). Example: ```tsx <Button renderContent={(styles) => ( <CustomText style={styles}>Pay now</CustomText> )} /> ```. |
| `leading` | `React.ReactNode` |  |  |  | types | Optional leading accessory (e.g., icon) |
| `trailing` | `React.ReactNode` |  |  |  | types | Optional trailing accessory (e.g., icon) |
| `icon` | `string` |  |  |  | types | Name of the icon to display on the right side of the button. Takes precedence over `trailing` if both are provided. |
| `type` | `ButtonType` | default, glass, fixed | `"default"` |  | types | Visual/layout type matching the Figma `Type` property. Defaults to `'default'`. `'glass'` also activates when `modes['Button type'] === 'glass'`. Default "default", from the component source. |
| `glassOverlayColor` | `string` |  |  |  | types | Glass-only override for the translucent overlay color painted over the live blur. Defaults to the resolved `button/background` token under `Button type=glass`. Ignored for non-glass types. |
| `glassIntensity` | `number` |  |  |  | types | Glass-only override for blur intensity on the 0–100 scale. Defaults to the `blur/minimal` token. Ignored for non-glass types. |
| `modes` | `Modes` |  |  |  | types | Mode configuration passed to the token resolver (e.g., {"Button / Size": "M"}) |
| `onPress` | `() => void` |  |  |  | types | Callback triggered when the button is pressed. |
| `disabled` | `boolean` |  | `false` |  | types | When true, the button cannot be pressed. Default false, from the component source. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Optional style overrides for the button container. |
| `labelStyle` | `StyleProp<TextStyle>` |  |  |  | types | Optional style overrides for the label text. |
| `accessibilityLabel` | `string` |  |  |  | types | Accessibility label for screen readers. If not provided, uses label or children text. |
| `accessibilityHint` | `string` |  |  |  | types | Additional accessibility hint for screen readers. |
| `accessibilityState` | `AccessibilityState` |  |  |  | types | Additional accessibility state information Performance notes: - The pressed visual (background/border swap) is applied through the Pressable `style` callback, NOT a mirrored React state. This avoids the flicker that scrolling parents previously caused: when a ScrollView cancels a touch the host view simply reverts its style without React rendering. On iOS we additionally use `unstable_pressDelay` so the pressed visual is never even applied during a scroll-cancelled touch. - Hover state is only mirrored into React state on web (where hover events fire). On native the setter call is gated out so the component never re-renders due to hover. - All design-token reads are folded into a single `useMemo` keyed on `(modes, disabled)`. - The component is wrapped in `React.memo`. Callers that want to take advantage of this should pass stable `modes` (the default `EMPTY_MODES` is already stable) and stable callback props. /. |
| `webAccessibilityProps` | `WebAccessibilityProps` |  |  |  | types | Web-specific accessibility props (only used on web platform) |
| `loading` | `boolean` |  |  |  | types | Explicit per-instance loading override. When `true`, the button renders as a pill-shaped skeleton of the same size; when `false`, the surrounding `<SkeletonGroup>` is ignored. Defaults to inheriting from the group. |
| `disableTruncation` | `boolean` |  |  |  | types | When `true`, disables text truncation: the trailing ellipsis (`…`) is never shown and any `numberOfLines` clamp is ignored, so the text wraps to as many lines as it needs even when horizontal space is tight. |
| `...SafePressableProps` | `SafePressableProps` |  |  |  | types | Inherited React Native props the component also accepts. They are not part of the design contract and no guide documents them. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Primary"` |  | types | A token collection Button reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `AppearanceSystem` | `mode collection` | positive, warning, negative | `"positive"` |  | types | A token collection Button reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / Size` | `mode collection` | M, S, XS | `"M"` |  | types | A token collection Button reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Button / State` | `mode collection` | Idle, Hover, Pressed, Disabled | `"Idle"` |  | types | A token collection Button reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection Button reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context` | `mode collection` | Default, Nudge&Alert, CTACard, ListItem | `"Default"` |  | types | A token collection Button reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 10` | `mode collection` | Default, jioPlus | `"Default"` |  | types | A token collection Button reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context2` | `mode collection` | Default, AppBar | `"Default"` |  | types | A token collection Button reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Emphasis` | `mode collection` | High, Medium, Low | `"High"` |  | types | A token collection Button reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection Button reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Profile Card Appearance` | `mode collection` | Default, Premium | `"Default"` |  | types | A token collection Button reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Semantic Intent` | `mode collection` | Brand, System | `"Brand"` |  | types | A token collection Button reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types | Optional custom content to render inside the button. When provided, this is treated as a full-content override and `label`/`labelStyle` are ignored. |
| `renderContent` | `(styles: StyleProp<TextStyle>) => React.ReactNode` |  |  |  | types | Optional render prop for taking over the inner label/content while still reusing the token-driven text styles. When provided, this takes precedence over `children`. The `styles` argument is the merged text style (base token styles + `labelStyle`). Example: ```tsx <Button renderContent={(styles) => ( <CustomText style={styles}>Pay now</CustomText> )} /> ``` |
| `leading` | `React.ReactNode` |  |  |  | types | Optional leading accessory (e.g., icon) |
| `trailing` | `React.ReactNode` |  |  |  | types | Optional trailing accessory (e.g., icon) |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onPress` | `() => void` |  |  |  | types | Callback triggered when the button is pressed |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

_None recorded._

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/configuration/3` · trace-check: The source says "only", but the line is a short card caption under the Glass example; it is unclear whether it is a hard limit or advice, and the guide does not define a meaningful backdrop. Read as recommended, not hardened into a constraint.
- `/accessibility` · trace-check: The guide gives no accessibility guidance; left empty rather than guessed.
