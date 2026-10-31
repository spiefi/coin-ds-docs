# AccordionCheckbox

> Coin agent pack 0.1.78+24 (pilot). Generated from `components/accordioncheckbox.json`; the JSON is the source of truth.

- **State:** flagged (8 flags, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `09a45da` · built 2026-10-31T02:32:56Z
- **Category:** input (for discovery only, not a limit on composition) · **Tags:** collapsible, expandable, nested options, grouped checkboxes
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=accordioncheckbox) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4005-2906) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-accordioncheckbox--docs)

Group related choices behind a clear heading. People can select the group and open its options independently.

## Use when

- **recommended** Related choices grouped behind a clear heading, where people can select the group and open its options independently.  
  _From summary: “Group related choices behind a clear heading. People can select the group and open its options independently.”_
- **recommended** Choosing items as a group, such as the accounts to include: people open the group to review each one, or use the header checkbox to select them all through the screen's own wiring.  
  _From inContext: “Open the group to review each account, or use the header checkbox to select all through the surrounding flow.”_

## Avoid when

_None in the guide._

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Checkbox | The header checkbox (checked). Selects the group; it does not open the content. | yes | anatomy: “Selects the group. It does not open the content.” |
| Title + subtitle | title names the group; subtitle, shown only when set, gives a short piece of supporting context. | yes | anatomy: “Names the group and gives a short piece of supporting context.” |
| Chevron | Shows whether the content slot is collapsed or open. | yes | anatomy: “Shows whether the content slot is collapsed or open.” |
| Divider | Shown only when expanded; separates the header from the options. | no | anatomy: “Separates the header from the options when expanded.” |
| Content slot | children, shown only when expanded; usually a CheckboxGroup of CheckboxItem rows. | no | anatomy: “Usually contains a public CheckboxGroup of CheckboxItems.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `children` | `ReactNode` | types |

## Placement

- **recommended** Let the host supply the width; AccordionCheckbox grows in height as its content wraps or expands.  
  _From sizing: “In a product layout, the parent supplies the available width and the component grows in height as content wraps or expands.”_
- **recommended** `children`: Put a CheckboxGroup of CheckboxItem rows in the content slot.  
  _From anatomy: “Usually contains a public CheckboxGroup of CheckboxItems.”_
- **recommended** `children`: Keep related choices together in the content area.  
  _From configuration: “Keep related choices together in the content area.”_

## Configuration

- **recommended** Selecting is not expanding: the header checkbox changes checked (onCheckedChange), and pressing the rest of the header changes expanded (onExpandedChange).  
  _From corePrinciple: “Selecting is not expanding.”_
- **recommended** Choose selection and expansion separately: a group can be selected while closed, or open while unselected.  
  _From configuration: “A group can be selected while closed, or open while unselected.”_
- **recommended** Agree how selecting a group affects its choices before using it in a flow.  
  _From configuration: “Agree how selecting a group affects its choices before using it in a flow.”_
- **recommended** `onCheckedChange`: AccordionCheckbox only reports the header checkbox and expand changes; it does not change its rows. When the product needs select-all, the screen's code connects the header's checked to the rows.  
  _From inContext: “AccordionCheckbox itself only exposes the parent check and expand events.”_
- **recommended** `checked`: When a product needs select-all behavior, connect the parent and child state explicitly in consumer code.  
  _From states: “When a product needs select-all behavior, connect the parent and child state explicitly in consumer code.”_
- **discouraged** Don't imply that checking the header automatically changes the rows below it.  
  _From states: “Do not imply that checking this component automatically changes its descendants.”_
- **recommended** `children`: Rows keep their own checked state and labels: each CheckboxItem holds its own value, which the header does not change.  
  _From inContext: “Keep their own checked state and labels.”_
- **recommended** `checked`: checked makes the header checkbox controlled: the screen keeps the value, and onCheckedChange reports the next one.  
  _From fact `/facts/props/6` (checked, source types)_
- **recommended** `expanded`: expanded makes the open state controlled: the screen keeps it, and onExpandedChange reports the next one. Without expanded, the group starts from defaultExpanded (false by default) and opens and closes on its own.  
  _From fact `/facts/props/3` (expanded, source types)_
- **recommended** `disabled` = `true`: disabled makes the header unavailable (its checkbox and the expand press); pass disabled to the rows too when they must also be unavailable. ⚑ flagged (trace-check)  
  _From sources: “The public disabled prop disables the parent header controls; pass disabled to nested rows when those rows must also be unavailable.”_
- **recommended** `disableTruncation` = `true`: Allow long labels to wrap when the content decision needs more than one line: set disableTruncation. Without it, the title and the subtitle each stay on one line and end in an ellipsis.  
  _From sizing: “Allow long labels to wrap when the content decision needs more than one line.”_
- **recommended** `modes`: AccordionCheckbox passes its modes to everything in the content slot, so the rows need no modes of their own.  
  _From fact `/facts/props/9` (children, source types)_

## Content

- **recommended** Give each level a distinct job: the heading identifies the group, the subtitle gives a short count or qualifier, and each row names one choice.  
  _From content: “The heading identifies the group, the subtitle gives a short count or qualifier, and each row names one choice.”_
- **recommended** Make the group scannable: use a meaningful title and a compact subtitle that helps someone decide whether to open the group.  
  _From content: “Use a meaningful title and a compact subtitle that helps someone decide whether to open the group.”_
- **recommended** Keep row labels distinct: use the account name and a short identifier so people can tell sibling choices apart.  
  _From content: “Use the account name and a short identifier so people can tell sibling choices apart.”_
- **recommended** Keep hierarchy short: one title, one subtitle, and one label per row. Move longer help text outside the row.  
  _From content: “Use one title, one subtitle, and one label per row. Move longer help text outside the row.”_

Good: “Axis Bank”, “3 accounts”, “Savings • 0245”, “Current • 1182”, “Fixed deposit • 9073”

Bad: “Options”, “3 items”

## States

| State | When | From |
| --- | --- | --- |
| Collapsed, unchecked | The group is closed and the header is not selected. | states: “The group is closed and the header is not selected.” |
| Collapsed, checked | checked while closed: selection can be visible while the options stay closed. | states: “Selection can be visible while the options stay closed.” |
| Expanded | expanded: the divider and content slot appear after the header. | states: “The divider and content slot appear after the header.” |
| Disabled | disabled: the parent header controls are unavailable until the condition changes. | states: “The parent header controls are unavailable until the condition changes.” |
| Pressed | While the header is pressed it shows pressed feedback; checked and expanded change independently. | states: “The checked and expanded values can change independently while the runtime supplies pressed feedback during interaction.” |

## Accessibility

- **recommended** `accessibilityLabel`: accessibilityLabel names the header press target; it defaults to the title.  
  _From fact `/facts/props/12` (accessibilityLabel, source types)_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Name the group and add a useful qualifier | Use a vague heading and unexplained count | People can predict what is inside before they open it. |
| Give each child row a distinct name | Repeat generic row labels | People cannot tell which choice they are selecting. |

## Examples

### Select accounts as a group, the guide's In context: a named group with a short qualifier, and CheckboxItem rows with distinct names in a CheckboxGroup. Every value is controlled; the handlers stand for the screen's own wiring, which opens and closes the group from onExpandedChange and, for select-all, sets every row from onCheckedChange and checks the header when every row is checked.

```tsx
<AccordionCheckbox
  title="Axis Bank"
  subtitle="3 accounts"
  checked={false}
  onCheckedChange={(checked) => {}}
  expanded
  onExpandedChange={(expanded) => {}}
>
  <CheckboxGroup accessibilityLabel="Account choices">
    <CheckboxItem checked={false} onValueChange={(checked) => {}}>Savings • 0245</CheckboxItem>
    <CheckboxItem checked={false} onValueChange={(checked) => {}}>Current • 1182</CheckboxItem>
    <CheckboxItem checked={false} onValueChange={(checked) => {}}>Fixed deposit • 9073</CheckboxItem>
  </CheckboxGroup>
</AccordionCheckbox>
```

_From inContext: “Consumer logic makes the header a select-all control.”_

### A group that is unavailable, rows included: disabled on AccordionCheckbox makes the header unavailable, and each row gets disabled too, because the header's disabled does not reach them.

```tsx
<AccordionCheckbox title="Axis Bank" subtitle="3 accounts" disabled expanded>
  <CheckboxGroup accessibilityLabel="Account choices">
    <CheckboxItem checked={false} disabled>Savings • 0245</CheckboxItem>
    <CheckboxItem checked={false} disabled>Current • 1182</CheckboxItem>
    <CheckboxItem checked={false} disabled>Fixed deposit • 9073</CheckboxItem>
  </CheckboxGroup>
</AccordionCheckbox>
```

_From sources: “pass disabled to nested rows when those rows must also be unavailable.”_

### A long group name in a narrow host, the guide's Sizing: disableTruncation lets the title and subtitle wrap instead of ending in an ellipsis; the group starts open and keeps its own open state.

```tsx
<AccordionCheckbox title="Longer investment account group" subtitle="3 linked accounts" disableTruncation defaultExpanded>
  <CheckboxGroup accessibilityLabel="Account choices">
    <CheckboxItem checked={false} onValueChange={(checked) => {}}>Savings • 0245</CheckboxItem>
    <CheckboxItem checked={false} onValueChange={(checked) => {}}>Current • 1182</CheckboxItem>
    <CheckboxItem checked={false} onValueChange={(checked) => {}}>Fixed deposit • 9073</CheckboxItem>
  </CheckboxGroup>
</AccordionCheckbox>
```

_From sizing: “Allow long labels to wrap when the content decision needs more than one line.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `title` | `string` |  | `"Axis Bank"` |  | types | Title shown next to the checkbox (e.g. "Axis Bank"). Default "Axis Bank", from the component source. |
| `subtitle` | `string` |  | `"3 accounts"` |  | types | Subtitle shown beneath the title (e.g. "3 accounts"). Default "3 accounts", from the component source. |
| `defaultExpanded` | `boolean` |  | `false` |  | types | Initial expanded state (uncontrolled). Defaults to `false`. Default false, from the component source. |
| `expanded` | `boolean` |  |  |  | types | Controlled expanded state. When provided, the component becomes controlled. |
| `onExpandedChange` | `(expanded: boolean) => void` |  |  |  | types | Callback fired whenever the expanded state changes. |
| `defaultChecked` | `boolean` |  | `false` |  | types | Initial checked state of the header checkbox (uncontrolled). Default false, from the component source. |
| `checked` | `boolean` |  |  |  | types | Controlled checked state of the header checkbox. |
| `onCheckedChange` ⚑ flagged (trace-check) | `(checked: boolean) => void` |  |  |  | evidence (2026-09-19) | Pressing the header checkbox calls onCheckedChange; pressing the rest of the header calls onExpandedChange. AccordionCheckbox does not select or clear its rows: select-all is the screen's wiring. Declared: Callback fired whenever the header checkbox value changes. |
| `disabled` ⚑ flagged (trace-check) | `boolean` |  | `false` |  | evidence (2026-09-19) | disabled reaches the header press target and the header Checkbox; the content slot's children get only modes, so rows stay available unless each is disabled too. Declared: Disables the entire component (header press + checkbox + content). Default false, from the component source. |
| `children` | `React.ReactNode` |  |  |  | types | Slot — content rendered below the divider when expanded. Typically a `CheckboxGroup` of child `CheckboxItem`s. The `modes` prop is forwarded recursively to every child. |
| `modes` | `Modes` |  |  |  | types | Design token modes for theming (e.g. `{ 'Color Mode': 'Light' }`). |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Override outer container styles. |
| `accessibilityLabel` | `string` |  |  |  | types | Accessibility label for the header press target. Defaults to `title`. |
| `disableTruncation` | `boolean` |  |  |  | types | When `true`, disables text truncation: the trailing ellipsis (`…`) is never shown and any `numberOfLines` clamp is ignored, so the text wraps to as many lines as it needs even when horizontal space is tight. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection AccordionCheckbox reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 10` | `mode collection` | Default, jioPlus | `"Default"` |  | types | A token collection AccordionCheckbox reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Profile Card Appearance` | `mode collection` | Default, Premium | `"Default"` |  | types | A token collection AccordionCheckbox reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types | Slot — content rendered below the divider when expanded. Typically a `CheckboxGroup` of child `CheckboxItem`s. The `modes` prop is forwarded recursively to every child. |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onExpandedChange` | `(expanded: boolean) => void` |  |  |  | types | Callback fired whenever the expanded state changes. |
| `onCheckedChange` | `(checked: boolean) => void` |  |  |  | types | Callback fired whenever the header checkbox value changes. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- On the web, the keyboard does not keep selecting apart from expanding: Enter on the focused header checkbox selects the group and also opens or closes it, and Space opens or closes it without selecting it. Pointer presses keep the two apart. Still so on dbe0e02 (Component Bug #540; Space not selecting is the Checkbox's own Component Bug #535). _(evidence, 2026-09-19)_ ⚑ flagged (trace-check)
- disabled dims the whole component, content slot included, but makes only the header unavailable: rows that are not disabled themselves look unavailable yet still respond, though the package's own description of disabled says the content is disabled too. Still so on dbe0e02 (Component Bug #540). _(evidence, 2026-09-19)_ ⚑ flagged (trace-check)

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/facts/props/7` · trace-check: Checked on jfs-components 0.1.60 (2026-09-19); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/props/8` · trace-check: Checked on jfs-components 0.1.60 (2026-09-19); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/gaps/0` · trace-check: Checked on jfs-components 0.1.60 (2026-09-19); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/gaps/1` · trace-check: Checked on jfs-components 0.1.60 (2026-09-19); the installed package is 0.1.78. Re-check before relying on it.
- `/configuration/9` · trace-check: Checked on jfs-components 0.1.60 (2026-09-18); the installed package is 0.1.78. Re-check before relying on it.
- `/examples/1` · trace-check: Checked on jfs-components 0.1.60 (2026-09-18); the installed package is 0.1.78. Re-check before relying on it.
- `/avoidWhen` · trace-check: The guide gives no avoidWhen guidance; left empty rather than guessed.
- `(whole entry)` · human: The Accordion Checkbox guide and its evidence were checked on 18–19 September 2026 on jfs-components 0.1.60 (its Sources note still says so); the installed package is 0.1.78 (mirror v0.1.78-dbe0e02). Read against the installed AccordionCheckbox.tsx (the same blob from v0.1.78 to dbe0e02) and CheckboxItem.tsx, and run on the installed build, every sentence this entry quotes still holds, but one keyboard sentence is out of date. The Sources note's “child choices do not respond to Space. This is a known package limitation.” and the evidence's “Space on a nested child did not change its checked state” are contradicted: since dbe0e02 a CheckboxItem row toggles with Space on the web (CheckboxItem.tsx lines 230–244 and 317–323), and on 29 October, in headless Chrome on the guide's own playground, Space on the focused “Savings • 0245” row inside AccordionCheckbox ticked it. The note's first clause (“In this web build, checkbox keyboard activation can also toggle expansion”) still holds, and so does the evidence's header-checkbox sentence. The entry doesn't quote the out-of-date part. Re-check the guide on 0.1.78 and publish it, then re-extract. Added by Claude Code in the overnight run agentpack-batch14, for Marcin to confirm. Guide fix #539.
