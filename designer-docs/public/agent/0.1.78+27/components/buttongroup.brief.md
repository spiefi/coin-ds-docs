# ButtonGroup (brief)

> Coin agent pack 0.1.78+27 · flagged · full entry: `components/buttongroup.md` (sources, all facts, flags)

Keep a few related actions in one row with shared spacing and modes.

**Use when**
- Keep a few related actions in one row with shared spacing and modes.

**Placement**
- The host sets the width: ButtonGroup fills the width it receives.
- Give the group a width.
- Avoid: Do not let the group shrink to its content: without a host width, the Buttons divide the smallest possible row and a label such as “Request” is cut short.
- Each IconButton keeps its size and the Buttons divide the rest, so a narrow host can shorten labels.

**Key rules**
- ButtonGroup exposes no layout options: the children you place and the modes you set on the group decide what people see.
- `children`: Put an IconButton in the group directly, not inside a wrapper component: a direct IconButton child keeps its intrinsic size, while a wrapper component around it would stretch.
- `modes`: Set modes on the group to change every child together, for example smaller controls and stronger fills.
- `modes`: Set Button / Size once on the group: every child inherits it, so the row keeps one height.
- Avoid: `modes`: Do not override one child's Button / Size: the child's own size wins over the group mode and leaves one short, mismatched action.
- `modes`: In the guide's narrow host, Button / Size S on the group shrinks every child, so the labels fit again.
- Emphasize one action: in the guide, Pay alone sets Emphasis High in its own modes, so the next step is obvious.
- Avoid: `modes`: Do not set Emphasis High on the group: every action then competes for attention.

**Example:** Split, request and pay in one row: the icon keeps its size, the Buttons share the rest, and only Pay sets a stronger Emphasis.

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

**Props:** `children`, `modes`, `style`. (* required)

Full entry: `components/buttongroup.md`. Links: `components/buttongroup.links.md`.
