# ListGroup

> Coin agent pack 0.1.78+11 (pilot). Generated from `components/listgroup.json`; the JSON is the source of truth.

- **State:** flagged (1 flag, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `267077a` · built 2026-10-29T04:05:26Z
- **Category:** content (for discovery only, not a limit on composition) · **Tags:** list section, grouped list, section header, transaction list, reorder list
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=listgroup) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2849-3171) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-listgroup--docs)

Use a List Group to put related list rows under one label, such as a month of payments, with one style for every row.

## Use when

- **recommended** Put related list rows under one label, such as a month of payments, with one style for every row.  
  _From summary: “Use a List Group to put related list rows under one label, such as a month of payments, with one style for every row.”_
- **recommended** Rows people can reorder: people drag a row by its handle, and onDragEnd hands your screen the new order to save.  
  _From states: “People drag a row by its handle, and onDragEnd hands your screen the new order to save.”_

## Avoid when

- **discouraged** A label with no rows under it: show a group only when it has rows. An empty group shows only the label, with nothing under it.  
  _From doDont: “Show a group only when it has rows.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Label | label: what the rows share, on one line. | no | anatomy: “label: what the rows share, on one line.” |
| Row | A List Item; the group passes its modes to it (not in reorder mode: see States). | no | anatomy: “A List Item; the group passes its modes to it.” |
| Group | A column that fills its width, with no fill or padding. | yes | anatomy: “A column that fills its width, with no fill or padding.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `listGroupSlot` | `ReactNode` | types |
| `children` | `ReactNode` | types |

## Placement

- **recommended** The group fills its container and adds no padding: the label, 12 px, then rows 12 px apart, or 4 px with Minimal.  
  _From sizing: “The group fills its container and adds no padding: the label, 12 px, then rows 12 px apart, or 4 px with Minimal.”_
- **recommended** The group draws nothing but the label and the rows: no fill, border, or padding.  
  _From anatomy: “The group draws nothing else: no fill, border, or padding.”_
- **recommended** Each row keeps its own height: 42 px for a Default List Item with an avatar, 68 px Boxed.  
  _From sizing: “Each row keeps its own height: 42 px for a Default List Item with an avatar, 68 px Boxed.”_
- **recommended** Like the guide’s history screen, stack one group per month, newest first.  
  _From inContext: “A history screen stacks one group per month, newest first.”_

## Configuration

- **recommended** `children`: Pass the rows as children. The package takes label, with none by default.  
  _From sources: “The package takes label, with none by default, and the rows as children.”_
- **recommended** `children`: Pass rows as elements, such as List Items: only elements survive, and strings vanish.  
  _From evidence: “Only elements survive: strings vanish.”_
- **recommended** `label`: Without a label the rows start at the top.  
  _From configuration: “Without a label the rows start at the top.”_
- **recommended** `List Item Style`: List Item Style changes every row: Default rows sit 12 px apart with no fill, Boxed puts each row on a white card, and Minimal packs them 4 px apart with lighter titles.  
  _From configuration: “List Item Style changes every row: Default rows sit 12 px apart with no fill, Boxed puts each row on a white card, and Minimal packs them 4 px apart with lighter titles.”_
- **recommended** `List Item Style`: Set the style on the group: every row takes it from the group (the guide’s Do shows Boxed).  
  _From doDont: “Every row takes Boxed from the group.”_
- **discouraged** `List Item Style`: Do not change the style on one row: a row’s own modes win, so with Boxed on the group that row loses its card.  
  _From doDont: “A row’s own modes win, so that row loses its card.”_
- **recommended** `Title Level`: Title Level makes the label bigger and bolder.  
  _From configuration: “Title Level makes the label bigger and bolder.”_
- **recommended** `Title Level` = `Default`: Title Level Default: a 14 px grey label.  
  _From configuration: “A 14 px grey label.”_
- **recommended** `Title Level` = `Bold`: Title Level Bold: an 18 px black label.  
  _From configuration: “An 18 px black label.”_
- **recommended** `disableTruncation`: The label stays on one line and ends in an ellipsis; disableTruncation lets a longer label wrap.  
  _From content: “It stays on one line and ends in an ellipsis; disableTruncation lets a longer label wrap.”_
- **REQUIRED** `data`: To let people reorder the rows, give the group all four of data, renderItem, keyExtractor and onDragEnd: leave one out and only the label shows.  
  _From states: “All four are needed: leave one out and only the label shows.”_
- **recommended** `renderItem`: In reorder mode each row shows a drag handle: renderItem returns a ListItem with isDraggable and onDragHandleGrant={drag}.  
  _From evidence: “Each row shows a drag handle (List Item `isDraggable`, `onDragHandleGrant={drag}`)”_
- **recommended** `onDragEnd`: Your screen keeps the order: onDragEnd hands it the new order to save.  
  _From states: “Your screen keeps the order; this one shows it below.”_
- **recommended** `modes`: In reorder mode the group doesn’t pass its modes on, so give every row the same modes.  
  _From states: “In this mode the group doesn’t pass its modes on, so give every row the same modes.”_

## Content

- **recommended** One label, one look for every row under it.  
  _From corePrinciple: “One label, one look for every row under it.”_
- **recommended** `label`: Write label as the one thing the rows share, such as a month or a kind of account, in a few words.  
  _From content: “Write label as the one thing the rows share, such as a month or a kind of account, in a few words.”_
- **recommended** `label`: In the guide’s payment history, each label names the month, and each row opens that payment.  
  _From inContext: “Each label names the month, and each row opens that payment.”_

Good: “March 2025”, “February 2025”

## States

| State | When | From |
| --- | --- | --- |
| Reorderable | With data, renderItem, keyExtractor and onDragEnd, people drag a row by its handle, and onDragEnd hands your screen the new order to save. | states: “People drag a row by its handle, and onDragEnd hands your screen the new order to save.” |
| Reorder props incomplete | Leave out any of data, renderItem, keyExtractor or onDragEnd and only the label shows. | states: “All four are needed: leave one out and only the label shows.” |
| Empty | With no rows, only the label shows, with nothing under it. | doDont: “Only the label shows, with nothing under it.” |

## Accessibility

- **discouraged** `accessibilityLabel`: Do not count on accessibilityLabel or the label to name the list: the group drops accessibilityLabel and hides the label from screen readers, so nothing names the list, and its rows aren’t list items (reported, #420).  
  _From sources: “It drops accessibilityLabel and hides the label from screen readers, so nothing names the list, and its rows aren’t list items (reported).”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Set the style on the group | Change it on one row | A row’s own modes win, so that row loses its card. |
| Rows under every label | An empty group | Only the label shows, with nothing under it. |

## Examples

### Payments, a month at a time, the guide’s In context: a history screen stacks one group per month, newest first; each label names the month, and each row opens that payment (onPress). Each row’s amount is a MoneyValue in trailing; the rows carry no modes, so they take the group’s.

```tsx
<VStack>
  <ListGroup label="March 2025">
    <ListItem layout="Horizontal" title="Netflix" supportText="12 Mar" trailing={<MoneyValue value="499" currency="₹" />} onPress={() => {}} />
    <ListItem layout="Horizontal" title="Swiggy" supportText="10 Mar" trailing={<MoneyValue value="320" currency="₹" />} onPress={() => {}} />
    <ListItem layout="Horizontal" title="Adani Electricity" supportText="8 Mar" trailing={<MoneyValue value="1,840" currency="₹" />} onPress={() => {}} />
  </ListGroup>
  <ListGroup label="February 2025">
    <ListItem layout="Horizontal" title="Jio Fiber" supportText="28 Feb" trailing={<MoneyValue value="999" currency="₹" />} onPress={() => {}} />
    <ListItem layout="Horizontal" title="Zomato" supportText="14 Feb" trailing={<MoneyValue value="650" currency="₹" />} onPress={() => {}} />
  </ListGroup>
</VStack>
```

_From inContext: “A history screen stacks one group per month, newest first. Each label names the month, and each row opens that payment.”_

### Rows people can reorder, the guide’s States: data, renderItem, keyExtractor and onDragEnd are all given; each row is a ListItem with a drag handle (isDraggable, onDragHandleGrant from drag, isDragging while it is the dragged row). onDragEnd (a stub here) hands your screen the new order to save, and data is that order. The group passes no modes in this mode, and no row sets any, so every row has the same.

```tsx
<ListGroup
  label="Pinned on home"
  data={[
    { id: 'Savings', title: 'Savings', support: 'Balance and statements', icon: 'ic_savings' },
    { id: 'Bills', title: 'Bills', support: 'Electricity, water, gas', icon: 'ic_bill' },
    { id: 'Mobile recharge', title: 'Mobile recharge', support: 'Jio prepaid', icon: 'ic_mobile' },
    { id: 'Wallet', title: 'Wallet', support: 'JioPay wallet', icon: 'ic_wallet' },
  ]}
  keyExtractor={(item) => item.id}
  onDragEnd={() => {}}
  renderItem={({ item, isActive, drag }) => (
    <ListItem
      layout="Horizontal"
      title={item.title}
      supportText={item.support}
      navArrow={false}
      isDraggable
      isDragging={isActive}
      onDragHandleGrant={drag}
      leading={<IconCapsule iconName={item.icon} />}
    />
  )}
/>
```

_From states: “People drag a row by its handle, and onDragEnd hands your screen the new order to save.”_

### Wrapped, the guide’s Content example: a label stays on one line and ends in an ellipsis; disableTruncation lets a longer label wrap.

```tsx
<ListGroup label="Payments to merchants this month across all linked accounts" disableTruncation>
  <ListItem layout="Horizontal" title="Netflix" supportText="12 Mar" trailing={<MoneyValue value="499" currency="₹" />} onPress={() => {}} />
  <ListItem layout="Horizontal" title="Swiggy" supportText="10 Mar" trailing={<MoneyValue value="320" currency="₹" />} onPress={() => {}} />
</ListGroup>
```

_From content: “disableTruncation shows all of it.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `label` | `string` |  | `""` |  | evidence (2026-10-28) | None by default. Shown above the rows on one line with an ellipsis; disableTruncation lets it wrap. 12 px (listGroup/gap) below it when there are rows. |
| `modes` | `Modes` |  |  |  | evidence (2026-10-28) | The group passes them to every row ({ ...group, ...row }, so a row’s own modes win), and List Items pass them on to their slots. Not in reorder mode: rows aren’t given the group’s modes there. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types |  |
| `accessibilityLabel` | `string` |  |  |  | evidence (2026-10-28) | Dropped: the root is a list with no name, and the label text is hidden from screen readers (#420). |
| `accessibilityHint` | `string` |  |  |  | types |  |
| `disableTruncation` | `boolean` |  |  |  | types | When `true`, disables text truncation: the trailing ellipsis (`…`) is never shown and any `numberOfLines` clamp is ignored, so the text wraps to as many lines as it needs even when horizontal space is tight. |
| `listGroupSlot` | `React.ReactNode` |  |  |  | types |  |
| `children` | `React.ReactNode` |  |  |  | types |  |
| `data` | `undefined` |  |  |  | evidence (2026-10-28) | Reorder mode: the rows’ items, with keyExtractor, renderItem and onDragEnd. All four, or the group silently renders only the label. Rows aren’t given the group’s modes in this mode. |
| `keyExtractor` | `undefined` |  |  |  | types |  |
| `renderItem` | `undefined` |  |  |  | evidence (2026-10-28) | Reorder mode: returns each row. Each row shows a drag handle (List Item isDraggable, onDragHandleGrant={drag}). |
| `onDragEnd` | `undefined` |  |  |  | evidence (2026-10-28) | Reorder mode: gets the new order on release; the screen saves it. |
| `onDragUpdate` | `undefined` |  |  |  | types |  |
| `...ListGroupStaticProps | ListGroupReorderProps<T>` | `ListGroupStaticProps \| ListGroupReorderProps<T>` |  |  |  | types | Inherited React Native props the component also accepts. They are not part of the design contract and no guide documents them. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection ListGroup reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `List Item Style` | `mode collection` | Default, Boxed, Minimal | `"Default"` |  | evidence (2026-10-28) | Default: rows 42 px tall, no fill, 12 px gap. Boxed: rows get 12 px padding, a white fill, a 1 px #ebebed border and radius 12 (68 px tall), gap 12. Minimal: gap 4 and regular-weight titles. The look comes from List Item; the group only changes its gap. Declared: A token collection ListGroup reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Title Level` | `mode collection` | Default, Bold | `"Default"` |  | evidence (2026-10-28) | Default: the label is 14/18 medium #24262b. Bold: 18/22 black #0d0d0f. Declared: A token collection ListGroup reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `listGroupSlot` | `React.ReactNode` |  |  |  | types |  |
| `children` | `React.ReactNode` |  |  |  | evidence (2026-10-28) | The rows, stacked full width, 12 px apart. children or listGroupSlot (listGroupSlot’s rows first when both). Only elements survive: strings vanish. |

### Events

_No events._

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- Figma shows a “March 2025” title; the package (and Storybook’s Default) has no label until you pass one. _(evidence, 2026-10-28)_
- Code Connect maps Figma’s List Group, but not its Title to label. _(evidence, 2026-10-28)_
- The listGroup/border/color token exists, but the code hard-codes a transparent border. _(evidence, 2026-10-28)_
- Static mode passes the group’s modes to its rows; reorder mode doesn’t (Component Bug #420). _(evidence, 2026-10-28)_
- Reorder mode needs all four of data, keyExtractor, renderItem and onDragEnd; leave one out and the group silently renders only the label (Component Bug #420). _(evidence, 2026-10-28)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `(whole entry)` · human: The guide’s States description says “Give the group data, renderItem, keyExtractor, and onDragEnd, and every row gets a drag handle.”, but the installed ListGroup.tsx (0.1.78-dbe0e02, ReorderRow, lines 163–210) wraps each row in a plain Animated.View and adds no handle: the handle is the List Item’s, shown when renderItem returns it with isDraggable and onDragHandleGrant={drag}, as the guide’s own example and the evidence do. The entry leaves the sentence out and cites the evidence for the handle. Guide fix #526. Added by Claude Code in the overnight run agentpack-batch8, for Marcin to confirm.
