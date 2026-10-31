# ButtonGroup

> Coin agent pack 0.1.78+22 (pilot). Generated from `components/buttongroup.json`; the JSON is the source of truth.

- **State:** flagged (4 flags, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `31f1c5e` · built 2026-10-31T01:10:13Z
- **Category:** action (for discovery only, not a limit on composition) · **Tags:** button row, button bar, actions
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=buttongroup) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2018-4119) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-buttongroup--docs)

Keep a few related actions in one row with shared spacing and modes.

## Use when

- **recommended** Keep a few related actions in one row with shared spacing and modes.  
  _From summary: “Keep a few related actions in one row with shared spacing and modes.”_

## Avoid when

_None in the guide._

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Row | The group itself: it fills the width its host provides, centres its children vertically, and adds no padding or background. | yes | anatomy: “Fills the width its host provides, centers children vertically, and adds no padding or background.” |
| Icon action | A direct IconButton child, which keeps its own circular size instead of stretching. | no | anatomy: “A direct IconButton child keeps its own circular size instead of stretching.” |
| Gap | One token gap that separates every pair of neighbouring children. | yes | anatomy: “One token gap, buttonGroup/gap, separates every pair of neighbors.” |
| Text actions | Button children; every Button stretches, so the Buttons share the remaining width equally. | no | anatomy: “Every Button child stretches, so the Buttons share the remaining width equally.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `children` | `ReactNode` | types |

## Placement

- **recommended** The host sets the width: ButtonGroup fills the width it receives.  
  _From sizing: “ButtonGroup fills the width it receives.”_
- **recommended** Give the group a width.  
  _From doDont: “Give the group a width”_
- **discouraged** Do not let the group shrink to its content: without a host width, the Buttons divide the smallest possible row and a label such as “Request” is cut short.  
  _From doDont: “Without a host width, the Buttons divide the smallest possible row and “Request” is cut short.”_
- **recommended** Each IconButton keeps its size and the Buttons divide the rest, so a narrow host can shorten labels.  
  _From sizing: “IconButtons keep their size and Buttons divide the rest, so a narrow host can shorten labels.”_
- **recommended** In the guide's shared-bill example, a Card holds the context and the ButtonGroup keeps split, request and pay together, with Pay emphasized.  
  _From inContext: “A Coin Card holds the context. The ButtonGroup keeps split, request, and pay together, with Pay emphasized.”_

## Configuration

- **recommended** ButtonGroup exposes no layout options: the children you place and the modes you set on the group decide what people see.  
  _From configuration: “ButtonGroup exposes no layout options. The children you place and the modes you set on the group decide what people see.”_
- **recommended** `children`: Put an IconButton in the group directly, not inside a wrapper component: a direct IconButton child keeps its intrinsic size, while a wrapper component around it would stretch. ⚑ flagged (trace-check)  
  _From evidence: “A direct `IconButton` child, checked by element type, keeps its intrinsic size; a wrapper component around it would stretch.”_
- **recommended** `modes`: Set modes on the group to change every child together, for example smaller controls and stronger fills.  
  _From configuration: “Changing the group modes changes every child together: smaller controls and stronger fills.”_
- **recommended** `modes`: Set Button / Size once on the group: every child inherits it, so the row keeps one height.  
  _From doDont: “Every child inherits Button / Size M, so the row keeps one height.”_
- **discouraged** `modes`: Do not override one child's Button / Size: the child's own size wins over the group mode and leaves one short, mismatched action.  
  _From doDont: “Pay’s own Button / Size S wins over the group mode and leaves one short, mismatched action.”_
- **recommended** `modes`: In the guide's narrow host, Button / Size S on the group shrinks every child, so the labels fit again.  
  _From sizing: “Button / Size S on the group shrinks every child, so the labels fit again.”_
- **recommended** Emphasize one action: in the guide, Pay alone sets Emphasis High in its own modes, so the next step is obvious.  
  _From doDont: “Only Pay sets Emphasis High, so the next step is obvious.”_
- **discouraged** `modes`: Do not set Emphasis High on the group: every action then competes for attention.  
  _From doDont: “With Emphasis High on the group, all three actions compete for attention.”_
- **recommended** State belongs to each child: ButtonGroup has no enabled, disabled or selected state of its own, and each child keeps its own disabled, hover and pressed feedback.  
  _From states: “ButtonGroup has no enabled, disabled, or selected state of its own. Each child keeps its own disabled, hover, and pressed feedback.”_

## Content

- **recommended** Give the group its width and modes; let only the key action stand out.  
  _From corePrinciple: “Give the group its width and modes; let only the key action stand out.”_
- **recommended** Keep a group to a few actions that belong together.  
  _From content: “Keep a group to a few actions that belong together.”_
- **recommended** End with the action people are most likely to choose; supporting actions come first.  
  _From content: “End with the action people are most likely to choose.”_
- **recommended** Use one or two words for each Button label.  
  _From content: “Use one or two words”_
- **recommended** Button labels stay on one line: when a Button's share is too narrow, the end of the label is cut off with an ellipsis.  
  _From content: “Button labels stay on one line. When the share is too narrow, the end of the label is cut off with an ellipsis.”_

Good: “Request”, “Pay”, “Scan QR code”

Bad: “Qr Code”

## States

| State | When | From |
| --- | --- | --- |
| Default | All actions available: every child resolves the group's modes and responds on its own. | states: “Every child resolves the group’s modes and responds on its own.” |
| Child state | One child is unavailable (disabled): that Button fades to half opacity and ignores presses, and keeps its share of the row, so the layout does not shift. | states: “The disabled Button fades to half opacity and ignores presses. It keeps its share of the row, so the layout does not shift.” |

## Accessibility

- **recommended** Name every icon action: give each IconButton a task-based accessibilityLabel, such as “Scan QR code”. Without a label, an IconButton is announced by its icon name, such as “Qr Code”.  
  _From content: “An IconButton without a label is announced by its icon name, such as “Qr Code”. Specify a task-based label, such as “Scan QR code”, for each icon action.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Give the group a width | Let the group shrink to its content | Without a host width, the Buttons divide the smallest possible row and “Request” is cut short. |
| Set the size once on the group | Override one child’s size | Pay’s own Button / Size S wins over the group mode and leaves one short, mismatched action. |
| Emphasize one action | Emphasize every action | With Emphasis High on the group, all three actions compete for attention. |

## Examples

### Split, request and pay in one row: the icon keeps its size, the Buttons share the rest, and only Pay sets a stronger Emphasis.

```tsx
<ButtonGroup
  style={{ width: 360 }}
  modes={{ 'Color Mode': 'Light', 'Button / Size': 'M', Emphasis: 'Medium', AppearanceBrand: 'Primary' }}
>
  <IconButton iconName="ic_split" accessibilityLabel="Split bill" onPress={() => {}} />
  <Button label="Request" onPress={() => {}} modes={{ AppearanceBrand: 'Secondary' }} />
  <Button label="Pay" onPress={() => {}} modes={{ Emphasis: 'High' }} />
</ButtonGroup>
```

_From inContext: “The ButtonGroup keeps split, request, and pay together, with Pay emphasized.”_

### A narrow host: Button / Size S set once on the group shrinks every child so the labels fit.

```tsx
<ButtonGroup
  style={{ width: 248 }}
  modes={{ 'Color Mode': 'Light', 'Button / Size': 'S', Emphasis: 'Medium' }}
>
  <IconButton iconName="ic_split" accessibilityLabel="Split bill" onPress={() => {}} />
  <Button label="Request" onPress={() => {}} />
  <Button label="Pay" onPress={() => {}} modes={{ Emphasis: 'High' }} />
</ButtonGroup>
```

_From sizing: “Button / Size S on the group shrinks every child, so the labels fit again.”_

### Icon actions only, each with a task-based label; the row starts at the leading edge.

```tsx
<ButtonGroup modes={{ 'Color Mode': 'Light', 'Button / Size': 'M', Emphasis: 'Medium' }}>
  <IconButton iconName="ic_qr_code" accessibilityLabel="Scan QR code" onPress={() => {}} />
  <IconButton iconName="ic_photo" accessibilityLabel="Add photo" onPress={() => {}} />
  <IconButton iconName="ic_share" accessibilityLabel="Share" onPress={() => {}} />
</ButtonGroup>
```

_From content: “Specify a task-based label, such as “Scan QR code”, for each icon action.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` ⚑ flagged (trace-check) | `React.ReactNode` |  |  |  | evidence (2026-09-24) | Fragments are flattened. A direct IconButton child, checked by element type, keeps its intrinsic size; every other child (such as Button) gets flex: 1, and a wrapper component around an IconButton would stretch. Declared: Child elements to be rendered inside the button group. Typically generic buttons or icon buttons. |
| `modes` ⚑ flagged (trace-check) | `Modes` |  |  |  | evidence (2026-09-24) | Cloned into every child; a child's explicit modes win. The group itself renders a centred row with a 12 px token gap and no padding. Declared: Mode configuration for design tokens (e.g., {"Button / Size": "M", "Emphasis": "High"}) These modes cascade to all children; a child's own `modes` still win on conflict. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Additional styles for the container. |

### Modes

_No modes._

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types | Child elements to be rendered inside the button group. Typically generic buttons or icon buttons. |

### Events

_No events._

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

_None recorded._

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/facts/props/0` · trace-check: Checked on jfs-components 0.1.60 (2026-09-24); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/props/1` · trace-check: Checked on jfs-components 0.1.60 (2026-09-24); the installed package is 0.1.78. Re-check before relying on it.
- `/configuration/1` · trace-check: Checked on jfs-components 0.1.60 (2026-09-24); the installed package is 0.1.78. Re-check before relying on it.
- `/avoidWhen` · trace-check: The guide gives no avoidWhen guidance; left empty rather than guessed.
