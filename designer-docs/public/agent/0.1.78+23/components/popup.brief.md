# Popup (brief)

> Coin agent pack 0.1.78+23 · documented · full entry: `components/popup.md` (sources, all facts, flags)

Use a Popup for a short, focused moment, such as an offer or a reward, that slides up over the screen and asks for one choice.

**Use when**
- A short, focused moment, such as an offer or a reward, that slides up over the screen and asks for one choice.
- One short message and a choice, then back to the screen.
- Rewards after a payment: once the payment is done, the screen opens a rewards popup.

**Avoid when**
- Avoid: Leaving people no way out: with no Later and scrim taps off, only Escape closes it, and phones have no Escape key. Offer a way out, such as Later.
- Avoid: Long content: it fills the screen, and people must scroll to reach the buttons. Keep it short.

**Placement**
- Only the trigger sits in the page; the popup itself opens over the whole screen.
- The sheet spans the whole window, as it spans a phone screen, and grows with its content up to 90% of the window's height; taller content scrolls inside it.
- With short content, such as a title and two buttons, the sheet hugs it at the bottom of the screen.
- It is a React Native Modal: on the web it opens over the whole browser window, never inside a frame, so the guide's examples, like Storybook's, open it from a button.

**Key rules**
- `trigger`: Opened by its trigger: the popup opens when its trigger is pressed and keeps its own open state.
- `open`: Opened by the screen: the screen decides when it's open (open), for example after a payment, and hears every close (onOpenChange).
- `ref`: Its ref, PopupRef, has open() and close(), which open and close the popup.
- A button in the sheet closes it from inside: Later closes it; Claim would carry on with the task.
- `backdropOpacity` = `0.3`: The scrim's strength is a setting, backdropOpacity: 0.3, 30% black, lets more of the page show through than the default 50%.
- `closeOnBackdropPress` = `false`: With scrim taps off (closeOnBackdropPress false), a tap on the dimmed page does nothing: in the guide's example, which has a Later button, only Later or Escape closes it.
- `animationDuration`: The sheet springs up when it opens, but slides away over its close speed, animationDuration (250 ms by default).
- `modes`: Modes on the popup reach its stack: Slot gap sets the space between items, and Page type the stack's padding.

**Example:** Rewards after a payment, the guide's In context: the screen opens the popup (open) once the payment is done. Claim or Later closes it and the screen notes the choice; a tap on the dimmed page or Escape just closes it, which the screen hears through onOpenChange. A centred Title with one supporting line, then Claim and, under it, Later at Emphasis Low, the quiet way out, in a VStack that stretches to the sheet's width, as the guide builds it. The literal open and the empty handlers stand for the screen's own state.

```tsx
<Popup open onOpenChange={(open) => {}}>
  <Title title="Your rewards are waiting" subtitle="Claim your points and enjoy the benefits now." textAlign="Center" />
  <VStack style={{ alignSelf: 'stretch' }}>
    <Button label="Claim" onPress={() => {}} />
    <Button label="Later" onPress={() => {}} modes={{ Emphasis: 'Low' }} />
  </VStack>
</Popup>
```

**Props:** `open`, `defaultOpen`, `onOpenChange`, `trigger`, `children`, `modes`, `closeOnBackdropPress`, `backdropColor`, `backdropOpacity`, `animationDuration`, `style`, `accessibilityLabel`, `ref`. (* required)

**Modes it reads:** Background, Color Mode, Context, Padding, Page type, Slot gap, Stack Context.

**Gaps (report, do not work around)**
- Figma's Popup has no scrim; the code adds a 50% black one from props. The #268 fix left it unchanged; the evidence records it as Marcin's call.

Full entry: `components/popup.md`. Links: `components/popup.links.md`.
