# Overlay (brief)

> Coin agent pack 0.1.78+17 · documented · full entry: `components/overlay.md` (sources, all facts, flags)

Use an Overlay to dim the screen behind a dialog, sheet, or drawer, so attention goes to what sits above it.

**Use when**
- Dim the screen behind a dialog, sheet or drawer, so attention goes to what sits above it.

**Avoid when**
- Avoid: Over another overlay: two overlays add up to 91% black and hide the page; use one scrim.

**Placement**
- `fill` = `true`: With fill on (the default), the overlay covers the nearest parent that sets a position and nothing outside it; it has no size of its own.
- It fills its nearest positioned parent, not the device screen: place it inside the screen it dims.
- In the guide's payment confirmation, Pay completes the task and Cancel, Escape or a tap on the dimmed screen backs out; the screen removes the overlay either way.

**Key rules**
- **REQUIRED** `trapFocus` = `false`: Leave trapFocus off (the default) for a regional dimmer or a scrim drawn under another surface, such as a Drawer's: several mounted overlays must not each grab the page.
- `contentPlacement` = `center`: Centred, the default (contentPlacement center): content sits in the middle at its own width.
- `contentPlacement` = `top`: At the top: content docks to the top and stretches across the screen.
- `contentPlacement` = `bottom`: At the bottom: content docks to the bottom and stretches across, like a sheet.
- `contentPlacement` = `stretch`: Stretched: content stays in the middle but spans the screen's width.
- `children`: Leave the overlay empty (no children) when a sheet or drawer draws its own surface: a bare scrim.
- `fill` = `false`: With fill off, the overlay stays in the page's flow instead of covering its screen.
- `fill` = `false`: With fill off, the overlay is as big as its content.

**Example:** Confirming a payment, the guide's In context dialog: the overlay dims the screen and holds a dialog that keeps keyboard focus (trapFocus), named “Cancel payment”. As in the guide, the Card is white (AppearanceBrand Neutral), its buttons set AppearanceBrand Primary because a Card passes its modes to its children, and Cancel is the low-emphasis way out (Emphasis Low). Pay completes it; Cancel, Escape or a tap on the scrim backs out, and the screen removes the overlay either way.

```tsx
<Overlay
  trapFocus
  dismissAccessibilityLabel="Cancel payment"
  onPress={() => {}}
>
  <Card modes={{ AppearanceBrand: 'Neutral' }} style={{ margin: 16 }}>
    <Title title="Confirm payment" subtitle="₹250 to Ravi Stores" numberOfLines={2} />
    <ButtonGroup>
      <Button label="Pay" onPress={() => {}} modes={{ AppearanceBrand: 'Primary' }} />
      <Button label="Cancel" onPress={() => {}} modes={{ AppearanceBrand: 'Primary', Emphasis: 'Low' }} />
    </ButtonGroup>
  </Card>
</Overlay>
```

**Props:** `children`, `contentPlacement` (center | stretch | top | bottom), `onPress`, `dismissAccessibilityLabel`, `fill`, `trapFocus`, `modes`, `style`. (* required)

**Gaps (report, do not work around)**
- Figma's Overlay is a 70% black fill with no properties: placement, content, fill and tap to dismiss exist only in code.
- The published Storybook predates the 23 October build the guide was checked on.

Full entry: `components/overlay.md`. Links: `components/overlay.links.md`.
