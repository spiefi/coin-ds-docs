# Toggle

> Coin agent pack 0.1.78+26 (pilot). Generated from `components/toggle.json`; the JSON is the source of truth.

- **State:** documented
- **Package:** jfs-components 0.1.78 · guide commit `3f56271` · built 2026-10-31T03:54:03Z
- **Category:** input (for discovery only, not a limit on composition) · **Tags:** switch, on/off, setting
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=toggle) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2906-8120) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-toggle--docs)

Use a Toggle to switch one setting on or off, with the change taking effect straight away.

## Use when

- **recommended** Switch one setting on or off, with the change taking effect straight away.  
  _From summary: “Use a Toggle to switch one setting on or off, with the change taking effect straight away.”_
- **recommended** One setting, one switch, and the change happens at once.  
  _From corePrinciple: “One setting, one switch, and the change happens at once.”_
- **recommended** One on/off setting, such as “Hide balances”, which is either on or off.  
  _From doDont: ““Hide balances” is either on or off.”_

## Avoid when

- **discouraged** A setting that waits for a Save button: a switch that needs Save looks applied when it isn't; use a Checkbox. Use instead: `Checkbox`.  
  _From doDont: “A switch that needs Save looks applied when it isn’t; use a Checkbox.”_
- **discouraged** Choosing between options, such as a Light / Dark theme: which side means Light? Use a pair of Radios. Use instead: `Radio`.  
  _From doDont: “Which side means Light? Use a pair of Radios.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Track | Fully rounded ends; grey when off and purple when on. | yes | anatomy: “Fully rounded; grey when off and purple when on.” |
| Thumb | White circle; its side shows the state. | yes | anatomy: “White circle; its side shows the state.” |
| Off position | Thumb on the left of a grey track. | no | anatomy: “Thumb on the left of a grey track.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

_No slots._

## Placement

- **recommended** It has no label of its own, so it sits at the end of a row whose title names the setting.  
  _From configuration: “It has no label of its own, so it always sits at the end of a row whose title names the setting.”_
- **recommended** The toggle never stretches: it is always 52 × 31 px.  
  _From sizing: “The toggle never stretches.”_
- **recommended** The track is 52 × 31 px with 3 px padding around a 25 px thumb, so give its row at least 31 px of height.  
  _From sizing: “The track is 52 × 31 px with 3 px padding around a 25 px thumb, so give its row at least 31 px of height.”_

## Configuration

- **recommended** Toggle has no size or style options.  
  _From configuration: “Toggle has no size or style options.”_
- **recommended** `value`: The screen sets each toggle's value.  
  _From states: “The screen sets each toggle’s value.”_
- **recommended** Each change applies as soon as the toggle moves.  
  _From inContext: “Each change applies as soon as the toggle moves.”_
- **recommended** `onValueChange`: The screen keeps every value and saves it; the toggle only reports the new value through onValueChange.  
  _From inContext: “The screen keeps every value and saves it; the toggle only reports the new value.”_
- **recommended** `disabled` = `true`: Disable a toggle only while its setting can't change, and say why nearby.  
  _From states: “Disable a toggle only while its setting can’t change, and say why nearby.”_

## Content

- **recommended** The row's title says what the toggle controls, such as “Payment alerts”.  
  _From content: “The row’s title says what the toggle controls, such as “Payment alerts”.”_
- **discouraged** Name the setting, not the action: don't write “Turn on” or “Enable”, because the switch already shows on or off.  
  _From content: “Don’t write “Turn on” or “Enable”: the switch already shows on or off.”_
- **recommended** Support text explains what on means.  
  _From configuration: “Support text explains what on means.”_
- **recommended** Label every toggle: the row's title says what switches.  
  _From doDont: “The row’s title says what switches.”_
- **discouraged** Don't leave a toggle bare: without a label people can't tell what it controls.  
  _From doDont: “Without a label people can’t tell what it controls.”_

Good: “Payment alerts”, “Biometric login”, “Hide balances”

Bad: “Turn on”, “Enable”

## States

| State | When | From |
| --- | --- | --- |
| Off | Grey track, thumb left: the setting is off. | states: “Grey track, thumb left: the setting is off.” |
| On | Purple track, thumb right: the setting is on. | states: “Purple track, thumb right: the setting is on.” |
| Disabled | Dimmed to 50% and grey in both states; only the thumb position shows which is on. | states: “Dimmed to 50% and grey in both states; only the thumb position shows which is on.” |

## Accessibility

- **recommended** Toggle has no label of its own, so the screen names it, usually with the row's title.  
  _From sources: “Toggle has no label of its own, so the screen names it, usually with the row’s title.”_
- **recommended** `accessibilityLabel`: accessibilityLabel is the toggle's label for screen readers.  
  _From fact `/facts/props/6` (accessibilityLabel, source types)_
- **recommended** On the web it is a switch with a name, and its on or off state is announced.  
  _From sources: “On the web it is a switch with a name, and its on or off state is announced.”_
- **recommended** Enter, Space, and click switch it.  
  _From sources: “Enter, Space, and click switch it.”_
- **recommended** `disabled`: A disabled toggle is announced as disabled and skipped by Tab.  
  _From sources: “A disabled toggle is announced as disabled and skipped by Tab.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Apply the change at once | Wait for a Save button | A switch that needs Save looks applied when it isn’t; use a Checkbox. |
| Label every toggle | Leave a toggle bare | Without a label people can’t tell what it controls. |
| Use it for one on/off setting | Use it to choose between options | Which side means Light? Use a pair of Radios. |

## Examples

### A settings card, the guide's In context: a Card holding three rows, each a horizontal ListItem whose title names the setting, with no support text and no arrow, and a Toggle at its end named with the same words. Each change applies as soon as the toggle moves; the screen keeps the values and saves them. The literal values and the empty onValueChange stand for the screen's own state and saving.

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

_From inContext: “Each change applies as soon as the toggle moves. The screen keeps every value and saves it; the toggle only reports the new value.”_

### Title and support text, from the guide's Configuration: the row's title names the setting and its support text explains what on means; the Toggle at its end is off and named with the title.

```tsx
<ListItem
  layout="Horizontal"
  navArrow={false}
  title="Round up savings"
  supportText="Invest the spare change from each payment"
  trailing={<Toggle value={false} onValueChange={(value) => {}} accessibilityLabel="Round up savings" />}
/>
```

_From configuration: “Support text explains what on means.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `value` | `boolean` |  |  |  | evidence (2026-10-08) | On the web, aria-checked follows the value. Declared: Whether the toggle is on (controlled) |
| `defaultValue` | `boolean` |  | `false` |  | types | Initial value (uncontrolled) Default false, from the component source. |
| `onValueChange` | `(value: boolean) => void` |  |  |  | evidence (2026-10-13) | Called once with the new value for each Enter, Space or click. Declared: Callback when the toggle state changes. |
| `disabled` | `boolean` |  | `false` |  | evidence (2026-10-08) | On the web, sets aria-disabled and tabindex -1, so Tab skips it. Declared: Whether the toggle is disabled. Default false, from the component source. |
| `modes` | `Modes` |  |  |  | types | Design token modes for theming. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Override container styles. |
| `accessibilityLabel` | `string` |  |  |  | types | Accessibility label for screen readers. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection Toggle reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Toggle States` | `mode collection` | Off, On, Disabled Off, Disabled On | `"Off"` |  | types | A token collection Toggle reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

_No slots._

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onValueChange` | `(value: boolean) => void` |  |  |  | types | Callback when the toggle state changes |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- Figma has two variants, Off and On, both 52 × 31; disabled exists only in the package, which dims the toggle to 50% and greys the track in both states. _(evidence, 2026-10-13)_
- Disabled On and Disabled Off share one grey track, so only the thumb position shows the state. _(evidence, 2026-10-08)_

## Flags

_None._
