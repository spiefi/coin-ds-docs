# ActionFooter

> Coin agent pack 0.1.78+11 (pilot). Generated from `components/actionfooter.json`; the JSON is the source of truth.

- **State:** flagged (13 flags, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `cba512f` · built 2026-10-29T04:05:26Z
- **Category:** layout (for discovery only, not a limit on composition) · **Tags:** sticky footer, bottom bar, call to action, CTA, primary action
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=actionfooter) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2904-8057) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-actionfooter--docs)

Keep the next step close to the decision.

## Use when

- **recommended** Keep the next step close to the decision.  
  _From summary: “Keep the next step close to the decision.”_
- **recommended** To keep the final decision of a composition, such as confirming a reviewed payment, at the bottom of the host.  
  _From inContext: “The public footer follows a short Coin composition and keeps the final decision at the bottom of the host.”_

## Avoid when

- **discouraged** Confirmation or error feedback: keep it in the surrounding flow rather than inside the persistent footer.  
  _From content: “Keep confirmation or error feedback in the surrounding flow rather than inside the persistent footer.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Title | The optional title: context above the actions, omitted when the decision is already clear. | no | anatomy: “Optional context above the actions. Omit it when the decision is already clear.” |
| Action group | A public ButtonGroup or Stack that owns the horizontal or vertical button layout. | yes | anatomy: “A public ButtonGroup or Stack owns horizontal or vertical button layout.” |
| Surface | The token-owned surface: ActionFooter owns background, shadow, padding, radius and mode resolution. | yes | anatomy: “ActionFooter owns background, shadow, padding, radius, and mode resolution.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `children` | `ReactNode` | types |

## Placement

- **recommended** On the web ActionFooter renders in normal flow; on native it pins the footer. ⚑ flagged (trace-check)  
  _From sources: “Web renders in normal flow, native pins the footer”_
- **recommended** The host supplies the width; the title and grouping change the footer's natural height.  
  _From sizing: “The host supplies width; title and grouping change the natural height.”_
- **recommended** In a constrained host, the action composite changes its own height; ActionFooter stays full width.  
  _From sizing: “The composite changes its own height; ActionFooter remains full width.”_
- **recommended** On web the footer renders in normal flow; on native it pins itself to the bottom. Keyboard avoidance remains the consumer's job. ⚑ flagged (trace-check)  
  _From sources: “Web renders in normal flow, native pins the footer, and keyboard avoidance remains consumer-owned.”_

## Configuration

- **recommended** `children`: Use a ButtonGroup for a row of actions.  
  _From configuration: “Use a ButtonGroup for a row.”_
- **recommended** `children`: Use Stack when the actions need a vertical reading order.  
  _From configuration: “Use Stack when the actions need a vertical reading order.”_
- **recommended** `children`: For new code, pass a single ButtonGroup or Stack (or Slot) child: ActionFooter does not re-stretch it, only cascades modes and stretches it to full width. Loose Button and IconButton children are the legacy shape: an IconButton keeps its square size and the rest stretch.  
  _From fact `/facts/props/0` (children, source evidence)_
- **recommended** `title`: Leave out the title when the preceding content already names the decision, to keep the surface short.  
  _From configuration: “Keep the surface short when the preceding content already names the decision.”_
- **recommended** `title`: Add a short title and stack the actions when horizontal space or hierarchy calls for it.  
  _From configuration: “Add a short title and stack actions when horizontal space or hierarchy calls for it.”_
- **recommended** `modes`: Set modes on ActionFooter: they are merged into every slot child.  
  _From fact `/facts/props/2` (modes, source types)_
- **recommended** Configure disabled, loading or confirmation states on the footer's public child actions, and show feedback elsewhere: ActionFooter does not invent them.  
  _From states: “ActionFooter does not invent disabled, loading, or confirmation states. Configure those on its public child actions and show feedback elsewhere.”_
- **discouraged** Do not make both actions primary: equal emphasis hides which action advances the decision.  
  _From doDont: “Equal emphasis hides which action advances the decision.”_
- **recommended** `avoidKeyboard`: Where a keyboard can cover the footer, handle keyboard avoidance in the consuming implementation: avoidKeyboard is deprecated and has no effect.  
  _From fact `/facts/props/5` (avoidKeyboard, source evidence)_
- **recommended** `bottomPadding`: Bottom spacing differs between Figma and the package: Figma's sample has 41px; the package defaults to 24px (bottomPadding) plus an optional safe-area inset (safeAreaBottom). ⚑ flagged (trace-check)  
  _From sources: “Figma’s sample includes 41px bottom spacing; the package defaults to 24px plus an optional safe-area inset.”_

## Content

- **recommended** Give one action clear priority.  
  _From corePrinciple: “Give one action clear priority.”_
- **recommended** Lead with the decision: use one clear primary action, such as Continue or Confirm payment.  
  _From content: “Use one clear primary action such as Continue or Confirm payment.”_
- **recommended** Use short verb-led labels.  
  _From content: “Use short verb-led labels.”_
- **recommended** Keep labels short: Continue and Back scan faster than sentences that repeat the screen title.  
  _From content: “Continue and Back scan faster than sentences that repeat the screen title.”_
- **recommended** Name the decision: labels such as Back and Confirm payment describe both outcomes directly.  
  _From doDont: “Back and Confirm payment describe both outcomes directly.”_
- **discouraged** Avoid vague action labels such as Yes and Go: they make people infer what will happen next.  
  _From doDont: “Yes and Go make people infer what will happen next.”_
- **recommended** `title`: Keep the title concise: a short title adds context without repeating the action.  
  _From doDont: “A short title adds context without repeating the action.”_
- **discouraged** `title`: Do not repeat the instruction in the title: a long title slows scanning and duplicates the primary action.  
  _From doDont: “A long title slows scanning and duplicates the primary action.”_
- **recommended** Show confirmation, validation or failure near the content that changed.  
  _From content: “Show confirmation, validation, or failure near the content that changed.”_

Good: “Continue”, “Confirm payment”, “Back”

Bad: “Yes”, “Go”, “Continue to continue with the next step of your payment”

## States

| State | When | From |
| --- | --- | --- |
| One action | A single next step: the lone action receives the full available width. | states: “A lone Continue action receives the full available width.” |
| Two actions | Primary and supporting: Back supports the clearly prioritized Continue action. | states: “Back supports the clearly prioritized Continue action.” |
| Dark mode | Color Mode Dark on the footer: the owner receives Dark and cascades it through the composite. | states: “The owner receives Dark and cascades it through the composite.” |

## Accessibility

_None in the guide._

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Give Continue clear priority | Make both actions primary | Equal emphasis hides which action advances the decision. |
| Name the decision | Use vague action labels | Yes and Go make people infer what will happen next. |
| Keep the title concise | Repeat the instruction | A long title slows scanning and duplicates the primary action. |

## Examples

### A row of two actions in a ButtonGroup: Back supports the prioritized Continue.

```tsx
<ActionFooter modes={{ 'Color Mode': 'Light' }}>
  <ButtonGroup modes={{ 'Color Mode': 'Light' }}>
    <Button label="Back" onPress={() => {}} modes={{ 'Color Mode': 'Light', AppearanceBrand: 'Secondary' }} />
    <Button label="Continue" onPress={() => {}} modes={{ 'Color Mode': 'Light', AppearanceBrand: 'Primary' }} />
  </ButtonGroup>
</ActionFooter>
```

_From configuration: “Use a ButtonGroup for a row.”_

### A short title above a vertical Stack of actions.

```tsx
<ActionFooter title="Confirm payment" modes={{ 'Color Mode': 'Light' }}>
  <Stack layoutDirection="vertical" fillWidth modes={{ 'Color Mode': 'Light' }}>
    <Button label="Back" onPress={() => {}} modes={{ 'Color Mode': 'Light', AppearanceBrand: 'Secondary' }} />
    <Button label="Continue" onPress={() => {}} modes={{ 'Color Mode': 'Light', AppearanceBrand: 'Primary' }} />
  </Stack>
</ActionFooter>
```

_From configuration: “Add a short title and stack actions when horizontal space or hierarchy calls for it.”_

### A single next step that takes the full width.

```tsx
<ActionFooter modes={{ 'Color Mode': 'Light' }}>
  <ButtonGroup modes={{ 'Color Mode': 'Light' }}>
    <Button label="Continue" onPress={() => {}} modes={{ 'Color Mode': 'Light' }} />
  </ButtonGroup>
</ActionFooter>
```

_From states: “A lone Continue action receives the full available width.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` ⚑ flagged (trace-check) | `React.ReactNode` |  |  |  | evidence (2026-09-19) | A single ButtonGroup, Stack or Slot child owns its internal layout and receives the footer's modes. Declared: Content to render inside the action footer slot. **Legacy (fully supported):** pass loose `IconButton` / `Button` children — IconButtons keep their intrinsic square size; everything else is auto-stretched to share the remaining horizontal space equally. **Figma shape (preferred for new code):** pass a single `ButtonGroup` (or `Stack` / `Slot`) that owns its own internal layout. ActionFooter will not re-stretch that composite — it only cascades `modes` and stretches it to full width. |
| `title` | `string` |  |  |  | types | Optional centered title rendered above the action slot (Figma "title wrap"). Omitted / empty string → title wrap is not mounted (identical to the pre-title layout tree for loose children). |
| `modes` | `Modes` |  |  |  | types | Mode configuration passed to the token resolver. Automatically merged into every slot child via {@link cloneChildrenWithModes} so callers don't have to thread modes down by hand. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Optional style overrides for the footer chrome (not the sticky shell). |
| `accessibilityLabel` | `string` |  |  |  | types | Accessibility label for the footer region (announced for the toolbar). |
| `avoidKeyboard` ⚑ flagged (trace-check) | `boolean` |  | `false` |  | evidence (2026-09-19) | Keyboard avoidance is consumer-owned: the footer does not avoid the keyboard. Declared: Deprecated: Keyboard avoidance is now owned by the consuming implementation. This prop is retained for backwards compatibility, defaults to `false`, and has no effect. Default false, from the component source. |
| `safeAreaBottom` ⚑ flagged (trace-check) | `boolean` |  |  |  | evidence (2026-09-19) | Optionally adds the native safe-area inset to the 24px bottom padding. Declared: Add the device's bottom safe-area inset to the footer padding so its actions clear system UI such as the home indicator. Default `true`. |
| `bottomPadding` ⚑ flagged (trace-check) | `number` |  |  |  | evidence (2026-09-19) | Defaults to 24; the native safe-area inset is optionally added. Declared: Fixed spacing added below the footer content, in addition to the optional safe-area inset. Default `24`. |
| `pinned` | `boolean` |  | `false` |  | types | Pin the footer to the bottom on web as well as native. FullscreenModal sets this so the bar stays on the screen edge inside the modal. Default false, from the component source. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Action Footer Radius` ⚑ flagged (trace-check) | `mode collection` | False, True | `"False"` |  | evidence (2026-09-19) | The Figma reference selects False. Declared: A token collection ActionFooter reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection ActionFooter reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context` | `mode collection` | Default, Nudge&Alert, CTACard, ListItem | `"Default"` |  | types | A token collection ActionFooter reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context5` ⚑ flagged (trace-check) | `mode collection` | Default, Fullscreen Modal, Mode 1 | `"Default"` |  | evidence (2026-09-19) | The Figma reference selects Default. Declared: A token collection ActionFooter reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Slot gap` | `mode collection` | S, M, L, XL, XS | `"S"` |  | types | A token collection ActionFooter reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types | Content to render inside the action footer slot. **Legacy (fully supported):** pass loose `IconButton` / `Button` children — IconButtons keep their intrinsic square size; everything else is auto-stretched to share the remaining horizontal space equally. **Figma shape (preferred for new code):** pass a single `ButtonGroup` (or `Stack` / `Slot`) that owns its own internal layout. ActionFooter will not re-stretch that composite — it only cascades `modes` and stretches it to full width. |

### Events

_No events._

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- ActionFooter does not avoid the keyboard: keyboard avoidance is consumer-owned. _(evidence, 2026-09-19)_ ⚑ flagged (trace-check)
- Figma's sample has 41px bottom spacing, while the package defaults to 24px plus an optional safe-area inset. _(evidence, 2026-09-19)_ ⚑ flagged (trace-check)

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/facts/props/0` · trace-check: Checked on jfs-components 0.1.60 (2026-09-19); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/props/7` · trace-check: Checked on jfs-components 0.1.60 (2026-09-19); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/props/6` · trace-check: Checked on jfs-components 0.1.60 (2026-09-19); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/props/5` · trace-check: Checked on jfs-components 0.1.60 (2026-09-19); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/modes/0` · trace-check: Checked on jfs-components 0.1.60 (2026-09-19); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/modes/3` · trace-check: Checked on jfs-components 0.1.60 (2026-09-19); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/gaps/0` · trace-check: Checked on jfs-components 0.1.60 (2026-09-19); the installed package is 0.1.78. Re-check before relying on it.
- `/facts/gaps/1` · trace-check: Checked on jfs-components 0.1.60 (2026-09-19); the installed package is 0.1.78. Re-check before relying on it.
- `/placementAdvice/0` · trace-check: Checked on jfs-components 0.1.60 (2026-09-19); the installed package is 0.1.78. Re-check before relying on it.
- `/placementAdvice/3` · trace-check: Checked on jfs-components 0.1.60 (2026-09-19); the installed package is 0.1.78. Re-check before relying on it.
- `/configuration/9` · trace-check: Checked on jfs-components 0.1.60 (2026-09-19); the installed package is 0.1.78. Re-check before relying on it.
- `/accessibility` · trace-check: The guide gives no accessibility guidance; left empty rather than guessed.
- `(whole entry)` · trace-check: The cross-check reviewed an earlier version of this entry. Run npm run agent-pack:cross-check -- actionfooter.
