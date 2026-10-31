# Radio

> Coin agent pack 0.1.78+27 (pilot). Generated from `components/radio.json`; the JSON is the source of truth.

- **State:** flagged (1 flag, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `4e470cf` · built 2026-10-31T05:18:28Z
- **Category:** input (for discovery only, not a limit on composition) · **Tags:** radio button, single select, single choice, option
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=radio) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=922-3645) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-radio--docs)

Use a Radio to pick exactly one option from a short list, such as the account to pay from or how often to invest.

## Use when

- **recommended** Pick exactly one option from a short list, such as the account to pay from or how often to invest.  
  _From summary: “Use a Radio to pick exactly one option from a short list, such as the account to pay from or how often to invest.”_
- **recommended** One choice from a visible set.  
  _From corePrinciple: “One choice from a visible set.”_

## Avoid when

- **discouraged** A yes-or-no choice: use a Checkbox, which can be ticked and cleared; once chosen, a single Radio can't be cleared. Use instead: `Checkbox`.  
  _From doDont: “Use a Checkbox for yes or no”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Ring | A 1 px deep-purple border outlines the 18 px circle, white inside when unselected; a disabled Radio is grey, or pale purple when selected (see States). | yes | anatomy: “A 1 px deep-purple border outlines the circle.” |
| Fill | The selected Radio fills purple. | no | anatomy: “The selected Radio fills purple.” |
| Dot | A 10 px white dot confirms the choice, on the selected Radio. | no | anatomy: “A 10 px white dot confirms the choice.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

_No slots._

## Placement

- **recommended** Put a label beside every Radio, and let the whole row select it.  
  _From corePrinciple: “Put a label beside every Radio, and let the whole row select it.”_
- **recommended** Use list rows when options need detail, and a plain label for short options.  
  _From configuration: “Use list rows when options need detail, and a plain label for short options.”_
- **recommended** In list rows, for options with detail such as accounts, the whole row selects its Radio.  
  _From configuration: “For options with detail, such as accounts. The whole row selects its Radio.”_
- **recommended** Beside a short label, for short options, only the circle responds to a press: 18 px in a browser, 44 px on phones.  
  _From configuration: “For short options. Only the circle responds to a press: 18 px in a browser, 44 px on phones.”_
- **recommended** The Radio is always 18 × 18 px.  
  _From sizing: “The Radio is always 18 × 18 px.”_
- **recommended** On its own only the circle is pressable (44 px on phones, 18 px in a browser), so put it in a list row whose whole height and width select it.  
  _From sizing: “On its own only the circle is pressable (44 px on phones, 18 px in a browser), so put it in a list row whose whole height and width select it.”_

## Configuration

- **recommended** Radio has no label of its own.  
  _From configuration: “Radio has no label of its own.”_
- **REQUIRED** `selected`: Never let two Radios in a set be selected at once: Radio has no group, so the screen must stop a second selection.  
  _From doDont: “Radio has no group, so the screen must stop a second selection.”_
- **recommended** `selected`: The screen sets which Radio is selected and which are disabled.  
  _From states: “The screen sets which Radio is selected and which are disabled.”_
- **recommended** `selected`: The screen keeps the chosen option and passes selected to each Radio; on the guide's account screen, Continue is enabled once one is chosen.  
  _From inContext: “The screen keeps the chosen account, passes selected to each Radio, and enables Continue once one is chosen.”_
- **recommended** `onPress`: In list rows, pressing a row or its Radio selects it.  
  _From inContext: “Pressing a row or its Radio selects it.”_
- **recommended** `disabled`: Set disabled for an option that is unavailable now: the Radio turns grey and can't be pressed.  
  _From states: “Grey and not pressable, for an option that is unavailable now.”_
- **recommended** Figma's eight variants come down to two props, selected and disabled; the package draws hover and focus itself.  
  _From sources: “Figma has eight variants (Idle, Hover, Active, Focus, and Disabled, unselected and selected); the package sets selected and disabled, and draws hover and focus itself.”_
- **recommended** RadioButton is a deprecated name for the same component: build with Radio.  
  _From sources: “RadioButton is a deprecated name for the same component.”_

## Content

- **recommended** Write options in sentence case with the same grammar, so they read as one set.  
  _From content: “Write options in sentence case with the same grammar, so they read as one set.”_
- **recommended** Lead with the word that tells the options apart.  
  _From content: “Lead with the word that tells them apart”_
- **recommended** Keep two to five options visible.  
  _From content: “keep two to five options visible.”_
- **recommended** Label every Radio, so each option says what it is.  
  _From doDont: “Each option says what it is.”_
- **discouraged** Don't leave Radios bare: without labels people can't tell the options apart.  
  _From doDont: “Without labels people can’t tell the options apart.”_

Good: “Monthly”, “Quarterly”, “Yearly”, “Savings •• 0245”, “Salary •• 1180”, “Joint •• 7731”

## States

| State | When | From |
| --- | --- | --- |
| Unselected | An empty ring: not chosen. | states: “An empty ring: not chosen.” |
| Selected | With selected set: a purple fill with a white dot. | states: “Purple fill with a white dot.” |
| Disabled | With disabled set: grey and not pressable, for an option that is unavailable now. | states: “Grey and not pressable, for an option that is unavailable now.” |
| Disabled and selected | With disabled and selected set: pale purple, chosen but locked. | states: “Pale purple: chosen, but locked.” |
| Hover | Hover adds a lilac glow. | states: “Hover adds a lilac glow” |
| Focus | Keyboard focus on an unselected Radio draws an orange border with a 4 px yellow ring. | evidence: “A focused unselected radio draws a `rgb(253,90,19)` (#fd5a13) border plus the existing 4 px yellow ring” |

## Accessibility

- **recommended** On the web a Radio is announced as a radio button with its selected state, and Space selects it.  
  _From sources: “On the web a Radio is announced as a radio button with its selected state, Space selects it”_
- **recommended** `accessibilityLabel`: Name each Radio with accessibilityLabel.  
  _From sources: “Developers name each Radio with accessibilityLabel.”_
- **recommended** A 44 px touch area is set in code; react-native-web ignores it, so in a browser the Radio still measures 18 × 18.  
  _From evidence: “A 44 px `hitSlop` is set in code. react-native-web's Pressable ignores it, so a browser still measures 18 × 18.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Keep exactly one selected | Select two at once | Radio has no group, so the screen must stop a second selection. |
| Label every Radio | Leave Radios bare | Without labels people can’t tell the options apart. |
| Use a Checkbox for yes or no | Use a lone Radio | Once chosen, a single Radio can’t be cleared. |

## Examples

### Choosing the account to pay from, the guide's In context: a Card holding three ListItem rows, each with a Radio as its trailing part, and a Continue Button. The titles and balances stand for the person's accounts; selected on Salary •• 1180 stands for the account the screen keeps as chosen; each row's onPress and its Radio's onPress stand for the screen choosing that account; Continue stays disabled until one is chosen, so here it is enabled. Each Radio is named by accessibilityLabel with its account, as the Sources note asks.

```tsx
<Card>
  <VStack>
    <ListItem
      layout="Horizontal"
      navArrow={false}
      title="Savings •• 0245"
      supportText="₹1,24,500"
      onPress={() => {}}
      trailing={<Radio selected={false} accessibilityLabel="Savings •• 0245" onPress={() => {}} />}
    />
    <ListItem
      layout="Horizontal"
      navArrow={false}
      title="Salary •• 1180"
      supportText="₹48,200"
      onPress={() => {}}
      trailing={<Radio selected accessibilityLabel="Salary •• 1180" onPress={() => {}} />}
    />
    <ListItem
      layout="Horizontal"
      navArrow={false}
      title="Joint •• 7731"
      supportText="₹9,870"
      onPress={() => {}}
      trailing={<Radio selected={false} accessibilityLabel="Joint •• 7731" onPress={() => {}} />}
    />
    <Button label="Continue" onPress={() => {}} />
  </VStack>
</Card>
```

_From inContext: “The screen keeps the chosen account, passes selected to each Radio, and enables Continue once one is chosen.”_

### Short options beside a plain label, the guide's Frequencies with its playground's Disable Yearly on: each option is an HStack of a Radio and a Text. selected on Monthly stands for the frequency the screen keeps; each onPress stands for the screen choosing that frequency; Yearly is disabled and has no onPress, as an option that is unavailable now. Each Radio is named by accessibilityLabel with its option.

```tsx
<VStack>
  <HStack alignVertical="center">
    <Radio selected accessibilityLabel="Monthly" onPress={() => {}} />
    <Text text="Monthly" />
  </HStack>
  <HStack alignVertical="center">
    <Radio selected={false} accessibilityLabel="Quarterly" onPress={() => {}} />
    <Text text="Quarterly" />
  </HStack>
  <HStack alignVertical="center">
    <Radio selected={false} disabled accessibilityLabel="Yearly" />
    <Text text="Yearly" />
  </HStack>
</VStack>
```

_From configuration: “For short options. Only the circle responds to a press: 18 px in a browser, 44 px on phones.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `selected` | `boolean` |  | `false` |  | types | Whether the radio is selected. Default false, from the component source. |
| `disabled` | `boolean` |  | `false` |  | types | Whether the radio is disabled. Default false, from the component source. |
| `onPress` | `() => void` |  |  |  | types | Function to call when the radio is pressed. |
| `modes` | `Modes` |  |  |  | types | Modes object for design-token resolution. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Custom style for the radio container. |
| `accessibilityLabel` | `string` |  |  |  | evidence (2026-10-01) | On the web accessibilityLabel becomes the Radio's aria-label. Declared: Accessibility label for screen readers / assistive tech. |
| `accessibilityHint` | `string` |  |  |  | types | Accessibility hint for screen readers / assistive tech. |
| `testID` | `string` |  |  |  | types | Test ID for testing. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection Radio reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

_No slots._

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onPress` | `() => void` |  |  |  | types | Function to call when the radio is pressed. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

_None recorded._

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `(whole entry)` · human: The Radio guide (4e470cf) was checked on 1 October 2026 on 0.1.78 (5b6894b); Radio.tsx and all 37 radio tokens are the same on the installed v0.1.78-dbe0e02. Read against the installed source and the guide page rendered on it (31 October, headless Chrome, 1280 px), one sentence does not hold, and the entry leaves it out: the States description's “keyboard focus adds a yellow ring and an orange border.” is true only of an unselected Radio. A focused selected Radio keeps its selected look, a deep-purple border rgb(34, 0, 74) and no ring (box-shadow none): the orange border is a fallback for a focused unselected Radio only (Radio.tsx lines 142–147), and radio/focusSelected/boxShadow/size is not in the packaged Coin Variables, so the ring's size is 0 (165, 177, 192). The published Storybook (an older build) draws the same, so this is also a Component Bug: a selected Radio shows no Coin focus indicator. The entry's Focus state rests on the evidence's 0.1.78 sentence for an unselected Radio. Component Bug #548 asks for the focus ring on a selected Radio; once it is fixed the sentence holds, and if it isn't, the guide should say the ring and the orange border show on an unselected Radio. Then re-extract. Added by Claude Code in the overnight run agentpack-r24, for Marcin to confirm. Component Bug #548.
