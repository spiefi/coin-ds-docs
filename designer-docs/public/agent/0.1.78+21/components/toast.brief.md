# Toast (brief)

> Coin agent pack 0.1.78+21 · flagged · full entry: `components/toast.md` (sources, all facts, flags)

Use a Toast to confirm something that just happened, such as a payment or a copy, in a short message that closes itself.

**Use when**
- Confirm something that just happened, such as a payment or a copy, in a short message that closes itself.

**Avoid when**
- Avoid: Asking for a decision, such as “Retry the payment?”: a toast has no buttons and disappears in 4 s, so people can’t answer.

**Placement**
- Screens add toasts with addToast and show them through one ToastProvider around the screen: every provider shows the same queue.
- Mount one ToastProvider: two mounted providers show every toast twice.
- `placement`: Where toasts appear, top or bottom, is set once on the screen’s ToastProvider, not on each toast.
- A toast is as wide as its message, at least 200 px and at most 90% of its screen, with 16 px of padding at the sides and 14 px above and below.

**Key rules**
- `title`: A toast is one message with an optional leading icon.
- `title`: Message only is the default: one line of white text on a dark surface.
- `startItem` = `true`: startItem adds the card icon before the message, white by default, as in Figma.
- `slotItem`: Your own icon: with startItem on, swap in another 18 px icon in slotItem; it takes the Coin icon colour, a deeper gold.
- `AppearanceBrand`: AppearanceBrand recolours only the icon: gold, purple, blue, or white, the default.
- `AppearanceBrand`: Only the icon follows AppearanceBrand; the surface is the same dark grey in every mode.
- `timeout`: The screen adds a toast with addToast; it closes itself after 4 s.
- `timeout`: A toast closes itself after 4 s, or after its own timeout; with no timeout (a timeout of 0 or less) it stays until the screen clears it.

**Example:** Copying a UPI ID, the guide's In context: the screen sits in one ToastProvider, which shows toasts at the bottom by default. Copy's onPress calls addToast({ title: 'UPI ID copied' }) (shown as a comment, since addToast is a function, not a component); the toast closes itself after 4 s.

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

**Props:** `id`*, `title`*, `timeout`, `onClose`, `modes`, `placement` (top | bottom), `style`, `startItem`, `slotItem`, `disableTruncation`, `autoClose`. (* required)

**Modes it reads:** AppearanceBrand, Color Mode.

**Gaps (report, do not work around)**
- The published Storybook page is still the old generated one.

Full entry: `components/toast.md`. Links: `components/toast.links.md`.
