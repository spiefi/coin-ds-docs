# Tooltip (brief)

> Coin agent pack 0.1.78+19 · flagged · full entry: `components/tooltip.md` (sources, all facts, flags)

Use a Tooltip to explain a term or icon in a short line that opens from an info button and closes with the next press.

**Use when**
- Explain a term or icon in a short line that opens from an info button and closes with the next press.
- One short explanation, on request.
- Explaining terms in a list of details, such as a fund's NAV, expense ratio and exit load, each with its own info button.

**Avoid when**
- Avoid: Writing a paragraph: four sentences fill the bubble and cover the screen behind it.
- Avoid: Putting it on the main action: every press on that action (such as Invest now) also pops a bubble over the screen.

**Placement**
- Open it from an info button next to the term: the i says there's more to read and does nothing else.
- Keep the term it explains on the page, beside the trigger: the bubble only adds detail.
- Only the trigger sits in the page; the bubble is drawn over the page, so it takes no space in the layout.
- In a list of terms, each row has its own Tooltip: pressing one explains it above its row, and each keeps its own open state.

**Key rules**
- **REQUIRED** Never put an action in the bubble: a press inside it just closes it.
- `placement`: placement picks the side, top by default, and can line the bubble up with the trigger's start or end edge instead of its centre.
- `placement` = `top`: Above (top) is the default: the bubble sits above, its arrow pointing down at the trigger.
- `placement` = `bottom`: Below (bottom) is for triggers near the top of the screen, where there's no room above.
- `placement` = `top-start`: Start-aligned (top-start): the bubble's start edge lines up with the trigger's; the arrow still points at it.
- `placement` = `right`: Beside the trigger (right) is for a row with room to its side. On a phone there rarely is, so it opens above or below instead.
- `placement`: When the bubble doesn't fit on its side it flips to the opposite one; beside the trigger with no room either way, it moves above or below.
- `TooltipTrigger.asChild`: Pass the info IconButton to TooltipTrigger with asChild, so the button itself is the trigger.

**Example:** Explain a term: one sentence that says what NAV means, opened from the i next to it. The term stays on the page as Text; the info IconButton, passed with asChild, is the trigger.

```tsx
<HStack alignVertical="center">
  <Text>NAV</Text>
  <Tooltip>
    <TooltipTrigger asChild>
      <IconButton iconName="ic_info" accessibilityLabel="About NAV" />
    </TooltipTrigger>
    <TooltipContent>The price of one unit of the fund, updated every working day.</TooltipContent>
  </Tooltip>
</HStack>
```

**Props:** `children`*, `modes`, `open`, `onOpenChange`, `defaultOpen`, `placement` (left | right | top | bottom | top-start | top-end | bottom-start | bottom-end | left-start | left-end | right-start | right-end), `TooltipTrigger.asChild`, `TooltipContent.width`. (* required)

**Modes it reads:** Color Mode.

**Gaps (report, do not work around)**
- Figma draws only a downward arrow near the bubble's bottom left or right, in two variants (Custom Width Off and On); in code the arrow points at the trigger's centre and the bubble takes 12 placements.
- The code adds a fixed drop shadow and the full-window layer that closes it; Figma shows neither.
- From the code, not tested: Tooltip imports react-dom's portal at the top of the file, and react-dom is only a devDependency of the package.

Full entry: `components/tooltip.md`. Links: `components/tooltip.links.md`.
