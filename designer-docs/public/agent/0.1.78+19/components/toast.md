# Toast

> Coin agent pack 0.1.78+19 (pilot). Generated from `components/toast.json`; the JSON is the source of truth.

- **State:** flagged (1 flag, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `3f56271` · built 2026-10-30T12:30:13Z
- **Category:** feedback (for discovery only, not a limit on composition) · **Tags:** snackbar, notification, confirmation message, alert
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=toast) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2197-1510) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-toast--docs)

Use a Toast to confirm something that just happened, such as a payment or a copy, in a short message that closes itself.

## Use when

- **recommended** Confirm something that just happened, such as a payment or a copy, in a short message that closes itself.  
  _From summary: “Use a Toast to confirm something that just happened, such as a payment or a copy, in a short message that closes itself.”_

## Avoid when

- **discouraged** Asking for a decision, such as “Retry the payment?”: a toast has no buttons and disappears in 4 s, so people can’t answer.  
  _From doDont: “A toast has no buttons and disappears in 4 s, so people can't answer.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Surface | Dark grey with 14 px corners and a soft shadow; the same in every mode. | yes | anatomy: “Dark grey with 14 px corners and a soft shadow; the same in every mode.” |
| Leading icon | Optional 18 px icon, shown with startItem; the card icon unless you swap it. | no | anatomy: “Optional 18 px icon; the card icon unless you swap it.” |
| Message | The title: white 14 px text, up to two lines. | yes | anatomy: “White 14 px text, up to two lines.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `slotItem` | `ReactNode` | types |

## Placement

- **recommended** Screens add toasts with addToast and show them through one ToastProvider around the screen: every provider shows the same queue.  
  _From sources: “Screens add toasts with addToast and show them through one ToastProvider: every provider shows the same queue”_
- **recommended** Mount one ToastProvider: two mounted providers show every toast twice.  
  _From evidence: “Every provider renders the whole queue, so two mounted providers show every toast twice; the docs mount one at a time.”_
- **recommended** `placement`: Where toasts appear, top or bottom, is set once on the screen’s ToastProvider, not on each toast.  
  _From configuration: “Where toasts appear, top or bottom, is set once on the screen's provider”_
- **recommended** A toast is as wide as its message, at least 200 px and at most 90% of its screen, with 16 px of padding at the sides and 14 px above and below.  
  _From sizing: “A toast is as wide as its message, at least 200 px and at most 90% of its screen, with 16 px of padding at the sides and 14 px above and below.”_

## Configuration

- **recommended** `title`: A toast is one message with an optional leading icon.  
  _From configuration: “A toast is one message with an optional leading icon.”_
- **recommended** `title`: Message only is the default: one line of white text on a dark surface.  
  _From configuration: “The default: one line of white text on a dark surface.”_
- **recommended** `startItem` = `true`: startItem adds the card icon before the message, white by default, as in Figma.  
  _From configuration: “startItem adds the card icon before the message, white by default, as in Figma.”_
- **recommended** `slotItem`: Your own icon: with startItem on, swap in another 18 px icon in slotItem; it takes the Coin icon colour, a deeper gold.  
  _From configuration: “Swap in another 18 px icon; it takes the Coin icon colour, a deeper gold.”_
- **recommended** `AppearanceBrand`: AppearanceBrand recolours only the icon: gold, purple, blue, or white, the default.  
  _From configuration: “AppearanceBrand recolours only the icon: gold, purple, blue, or white, the default.”_
- **recommended** `AppearanceBrand`: Only the icon follows AppearanceBrand; the surface is the same dark grey in every mode.  
  _From configuration: “Only the icon follows AppearanceBrand; the surface is the same dark grey in every mode.”_
- **recommended** `timeout`: The screen adds a toast with addToast; it closes itself after 4 s.  
  _From inContext: “The screen adds it with addToast; it closes itself after 4 s.”_
- **recommended** `timeout`: A toast closes itself after 4 s, or after its own timeout; with no timeout (a timeout of 0 or less) it stays until the screen clears it.  
  _From states: “closes itself after 4 s, or after its own timeout; with no timeout it stays until the screen clears it.”_
- **recommended** `disableTruncation`: Long messages wrap to two lines, then end in an ellipsis, unless the toast is added with disableTruncation, which shows every line.  
  _From sizing: “Long messages wrap to two lines, then end in an ellipsis, unless the toast is added with disableTruncation, which shows every line.”_

## Content

- **recommended** Confirm, briefly, then get out of the way.  
  _From corePrinciple: “Confirm, briefly, then get out of the way.”_
- **recommended** Say what happened in a few words, such as Payment successful or UPI ID copied.  
  _From content: “Say what happened in a few words, such as Payment successful or UPI ID copied.”_
- **discouraged** Never ask for a decision or put anything in a toast that people must read twice: it has no buttons and closes itself.  
  _From content: “A toast has no buttons and closes itself, so never ask for a decision or put anything in it that people must read twice.”_
- **recommended** Short, specific, and about something that already happened.  
  _From content: “Short, specific, and about something that already happened.”_
- **recommended** Keep it to one line: “Payment successful” reads at a glance.  
  _From doDont: ““Payment successful” reads at a glance.”_
- **discouraged** Do not write a paragraph: past two lines the message is cut off, and nothing shows the rest.  
  _From doDont: “Past two lines the message is cut off, and nothing shows the rest.”_
- **recommended** Confirm what happened: the action is done; the toast just says so.  
  _From doDont: “The action is done; the toast just says so.”_

Good: “Payment successful”, “UPI ID copied”

Bad: “Retry the payment?”, “We couldn't verify your mobile number. Check the number and try again, or sign in with your email address instead.”

## States

| State | When | From |
| --- | --- | --- |
| Shown | A toast slides in from its edge and closes itself after 4 s, or after its own timeout. | states: “A toast slides in from its edge and closes itself after 4 s, or after its own timeout” |
| Stays | With no timeout (a timeout of 0 or less) it stays until the screen clears it. | states: “with no timeout it stays until the screen clears it.” |
| Stacked | Up to three show at once, newest last. | states: “Up to three show at once, newest last.” |
| Queued | Older ones wait behind them on their own timers, so they appear only if they’re still due when a newer one closes. | states: “Older ones wait behind them on their own timers, so they appear only if they’re still due when a newer one closes.” |
| No dismiss | There’s no close button and no swipe. | states: “There's no close button and no swipe.” |

## Accessibility

- **recommended** Each toast is announced as an alert.  
  _From sources: “Each toast is announced as an alert.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Keep it to one line | Write a paragraph | Past two lines the message is cut off, and nothing shows the rest. |
| Confirm what happened | Ask for a decision | A toast has no buttons and disappears in 4 s, so people can't answer. |

## Examples

### Copying a UPI ID, the guide's In context: the screen sits in one ToastProvider, which shows toasts at the bottom by default. Copy's onPress calls addToast({ title: 'UPI ID copied' }) (shown as a comment, since addToast is a function, not a component); the toast closes itself after 4 s.

```tsx
<ToastProvider>
  <VStack>
    <Text text="Your UPI ID" />
    <Text text="yourname@jio" />
    <Button
      label="Copy"
      onPress={() => {
        /* addToast({ title: 'UPI ID copied' }) */
      }}
    />
  </VStack>
</ToastProvider>
```

_From inContext: “The screen adds it with addToast; it closes itself after 4 s.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `id` | `string` |  |  | yes | types |  |
| `title` | `string` |  |  | yes | types |  |
| `timeout` | `number \| undefined` |  | `4000` |  | evidence (2026-10-17) | Through addToast({ timeout }): how long the toast stays, in ms, from when it is added (default 4000), also for toasts waiting behind the cap. 0 or less keeps it until closeToast or closeAll removes it. Declared: Default 4000, from the component source. |
| `onClose` | `(() => void) \| undefined` |  |  |  | types |  |
| `modes` | `Modes \| undefined` |  |  |  | evidence (2026-10-17) | Per toast through addToast({ modes }), or for every toast through the ToastProvider's modes, used for entries without their own. Toast never reads JFSThemeProvider. |
| `placement` | `ToastPlacement \| undefined` | top, bottom | `"bottom"` |  | evidence (2026-10-17) | Set on the ToastProvider (bottom by default, or top), which passes it to every toast it shows; the toast slides in from that edge. Declared: Default "bottom", from the component source. |
| `style` | `StyleProp<ViewStyle> \| undefined` |  |  |  | types |  |
| `startItem` | `boolean \| undefined` |  | `false` |  | types | When `true`, shows the leading icon area (Figma `startItem`). Defaults to `false` so existing call sites stay text-only. Default false, from the component source. |
| `slotItem` | `React.ReactNode \| undefined` |  |  |  | types | Optional custom leading content (Figma Slot `slotItem`). Used only when `startItem` is `true`. When omitted, the default `ic_card` icon is shown. |
| `disableTruncation` | `boolean` |  |  |  | evidence (2026-10-17) | Reachable through addToast({ disableTruncation: true }) since a116616: the title wraps to every line instead of clamping at two. Declared: When `true`, disables text truncation: the trailing ellipsis (`…`) is never shown and any `numberOfLines` clamp is ignored, so the text wraps to as many lines as it needs even when horizontal space is tight. |
| `autoClose` | `boolean` |  | `true` |  | types | When false, the view does not start its own timer. ToastProvider sets this because `addToast` already schedules the close, including for queued toasts. Default true, from the component source. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Primary"` |  | evidence (2026-10-17) | Recolours only the leading icon (Light): Primary gold rgb(206,161,90), Secondary rgb(93,0,181), Tertiary rgb(3,107,153). With AppearanceBrand unset, the card icon is Neutral white (#ffffff), as in Figma, not the collection's default Primary gold. Declared: A token collection Toast reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | evidence (2026-10-17) | The surface (dark grey background, white text, faint white border) is the same in every mode. Declared: A token collection Toast reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `slotItem` | `React.ReactNode \| undefined` |  |  |  | types | Optional custom leading content (Figma Slot `slotItem`). Used only when `startItem` is `true`. When omitted, the default `ic_card` icon is shown. |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onClose` | `(() => void) \| undefined` |  |  |  | types |  |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- The published Storybook page is still the old generated one. _(evidence, 2026-10-17)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `(whole entry)` · human: The guide (checked 17 October on 0.1.78-a116616, unchanged for Toast on the installed 0.1.78-dbe0e02) has two unclear lines. States says a toast “closes itself after 4 s, or after its own timeout; with no timeout it stays until the screen clears it.”: leaving timeout out gives the 4 s default, so “no timeout” has to mean a timeout of 0 (the playground's Stays); the entry says “a timeout of 0 or less” from the evidence. The Content example “Confirmations” includes “Mobile number is invalid”, an error, beside the guide's rule that a toast confirms something that already happened, and the guide doesn't say whether errors belong in a toast; the entry leaves it out of good copy. Guide fix #530. Added by Claude Code in the overnight run agentpack-batch9, for Marcin to confirm.
