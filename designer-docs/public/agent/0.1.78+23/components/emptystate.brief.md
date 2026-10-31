# EmptyState (brief)

> Coin agent pack 0.1.78+23 · flagged · full entry: `components/emptystate.md` (sources, all facts, flags)

Use an Empty State when a list or screen has nothing to show, to say why and offer one next step.

**Use when**
- Use an Empty State when a list or screen has nothing to show, to say why and offer one next step.
- Say what's missing, then what to do next.
- Nothing to show yet, such as no payments yet: say so, with a soft brand icon.
- A search or filter found nothing: say so and offer a way back, such as Clear search.

**Avoid when**
- Avoid: Keeping it once there is something to list: the screen shows the Empty State while there's nothing to list and replaces it with the list when there is.

**Placement**
- Empty State takes its width from its container and centres its text.
- Show it where the list would be, such as inside the Recent payments card, until there's a payment.
- When the action adds something (Make a payment adds a payment), the screen swaps the Empty State for the list.
- Empty State has no background of its own: it shows on the surface that holds it.

**Key rules**
- `iconSlot`: Pick the icon and its colour for why the area is empty, and label the button with the next step.
- `iconSlot`: Nothing yet: a soft brand icon when there's simply nothing to show yet.
- `iconSlot`: Couldn't load: a red error icon when loading failed; the button retries.
- `iconSlot`: Match the icon to the reason: a soft icon for an empty list, and red only when something failed.
- Avoid: `iconSlot`: Don't use the error icon for an empty list: a red alert makes “No payments yet” look like a failure.
- `AppearanceSystem` = `negative`: For the red error icon, the Icon Capsule takes Semantic Intent System with AppearanceSystem negative: Figma's red capsule (Icon Capsule Size L makes it Figma's 81 px).
- `Emphasis` = `Medium`: For the soft icon, the guide's empty-payments composition (Make a payment) gives the Icon Capsule Emphasis Medium: a pale capsule (#fde8c9) instead of the default gold (#cea15a).
- `modes`: Modes set on Empty State reach the icon and button you pass in, and their own modes win.

**Example:** An empty payments card, the guide's In context: the Recent payments card shows the Empty State until there's a payment; Make a payment (onPress) adds one, and the screen swaps the Empty State for the list. The icon is the guide's own Nothing yet capsule (ic_wallet with Emphasis Medium, the soft icon for an empty list).

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

**Props:** `title`, `description`, `showDescription`, `iconSlot`, `buttonSlot`, `buttonLabel`, `onPress`, `modes`, `style`, `testID`, `accessibilityLabel`, `accessibilityRole` (button | header | link | menu | menuitem | search | summary | image | switch | text | none | togglebutton | keyboardkey | adjustable | imagebutton | alert | checkbox | combobox | menubar | progressbar | radio | radiogroup | scrollbar | spinbutton | tab | tabbar | tablist | timer | list | toolbar). (* required)

**Modes it reads:** AppearanceBrand, AppearanceSystem, Button / Size, Button / State, Color Mode, Context, context 10, Context2, Emphasis, Icon Capsule Size, Page type, Profile Card Appearance, Semantic Intent.

**Gaps (report, do not work around)**
- The published Storybook predates this build (the #231 fix on c8526ae), so its Empty State pages are older than the package.

Full entry: `components/emptystate.md`. Links: `components/emptystate.links.md`.
