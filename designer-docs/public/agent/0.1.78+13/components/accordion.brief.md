# Accordion (brief)

> Coin agent pack 0.1.78+13 · flagged · full entry: `components/accordion.md` (sources, all facts, flags)

Reveal supporting details when people need them, while keeping the page easy to scan.

**Use when**
- Reveal supporting details when people need them, while keeping the page easy to scan.

**Avoid when**
- Avoid: Hiding the page's main task: leave it in the page flow when hiding it would block progress or change the decision.

**Placement**
- Keep the primary action outside the Accordion, in the page flow; use the Accordion for supporting details.
- Avoid: Do not put the primary action in the content slot: it is unavailable until someone expands the section.
- Several Accordions can sit together; each keeps its own expanded state, and the screen's wiring decides whether one, both or neither is open.
- Let the host supply the width; the Accordion grows with its title and open content.

**Key rules**
- **REQUIRED** `Accordion States`: Leave the Accordion States mode unset: the component derives it from expanded, disabled, hover and contained.
- `contained` = `false`: Use the default treatment (contained false) when the heading can sit comfortably in the surrounding page structure.
- `contained` = `true`: Use contained when the filled header should keep related supporting content together, so the group stands apart from its host.
- `expanded`: Set expanded (or defaultExpanded) and disabled to reflect the product situation, and let the header show the result.
- `disableTruncation` = `true`: To let a long title wrap instead of truncating, set disableTruncation.
- `title`: Make the header a clear promise about the content inside.
- `title`: The header should tell people what they will find; the body answers the question the header raises.
- `title`: Keep the header short enough to stay scannable in a narrow host.

**Example:** A section whose body answers its header, with Text in the content slot.

```tsx
<Accordion title="Payment methods" modes={{ 'Color Mode': 'Light' }}>
  <Text text="Review the payment methods available for this account." modes={{ 'Color Mode': 'Light' }} />
</Accordion>
```

**Props:** `title`, `contained`, `defaultExpanded`, `expanded`, `onExpandedChange`, `disabled`, `children`, `modes`, `style`, `accessibilityLabel`, `accessibilityHint`, `accessibilityState`, `webAccessibilityProps`, `disableTruncation`, `showHeader`, `showContent`. (* required)

**Modes it reads:** Accordion States.

**Gaps (report, do not work around)**
- Dark mode does not restyle the Accordion: its title, icon and header background resolve to the same values in Light and Dark, so the text stays black on a dark host.
- On the web the header does not expose aria-expanded, although Enter and Space toggle it.
- In the React Native Web preview, opening and closing is immediate, with no transition.

Full entry: `components/accordion.md`. Links: `components/accordion.links.md`.
