# Tooltip

> Coin agent pack 0.1.78+18 (pilot). Generated from `components/tooltip.json`; the JSON is the source of truth.

- **State:** flagged (2 flags, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `e7ed622` · built 2026-10-29T10:51:06Z
- **Category:** content (for discovery only, not a limit on composition) · **Tags:** hint, info bubble, help text, popover
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=tooltip) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=928-6036) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-tooltip--docs)

Use a Tooltip to explain a term or icon in a short line that opens from an info button and closes with the next press.

## Use when

- **recommended** Explain a term or icon in a short line that opens from an info button and closes with the next press.  
  _From summary: “Use a Tooltip to explain a term or icon in a short line that opens from an info button and closes with the next press.”_
- **recommended** One short explanation, on request.  
  _From corePrinciple: “One short explanation, on request.”_
- **recommended** Explaining terms in a list of details, such as a fund's NAV, expense ratio and exit load, each with its own info button.  
  _From inContext: “A fund's details list three terms, each with an info button.”_

## Avoid when

- **discouraged** Writing a paragraph: four sentences fill the bubble and cover the screen behind it.  
  _From doDont: “Four sentences fill the bubble and cover the screen behind it.”_
- **discouraged** Putting it on the main action: every press on that action (such as Invest now) also pops a bubble over the screen.  
  _From doDont: “Every press on Invest now also pops a bubble over the screen.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Trigger | Yours: an info IconButton passed to TooltipTrigger with asChild. Pressing it opens or closes the bubble. It is the only part that sits in the page. | yes | anatomy: “Yours: an info IconButton passed with asChild. Pressing it opens or closes the bubble.” |
| Term | The word it explains, beside the trigger on the screen. Keep it visible: the bubble only adds detail. | no | anatomy: “The word it explains. Keep it visible: the bubble only adds detail.” |
| near-black bubble | The TooltipContent, drawn over the page 12 px from the trigger: 8 px corners, 12 × 8 px of padding, white 14 px text that wraps at 280 px, and a 16 × 8 px arrow pointing at the trigger. | yes | anatomy: “Pressing it opens a near-black bubble 12 px away, with 8 px corners, 12 × 8 px of padding, white 14 px text that wraps at 280 px, and a 16 × 8 px arrow pointing at the trigger.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `children` | `ReactNode` | types |

## Placement

- **recommended** Open it from an info button next to the term: the i says there's more to read and does nothing else.  
  _From doDont: “The i says there's more to read and does nothing else.”_
- **recommended** Keep the term it explains on the page, beside the trigger: the bubble only adds detail.  
  _From content: “keep the term itself on the page”_
- **recommended** Only the trigger sits in the page; the bubble is drawn over the page, so it takes no space in the layout.  
  _From anatomy: “Only the trigger sits in the page.”_
- **recommended** In a list of terms, each row has its own Tooltip: pressing one explains it above its row, and each keeps its own open state.  
  _From inContext: “Pressing one explains it above its row; the next press anywhere closes it. Each tooltip keeps its own open state.”_
- **recommended** The bubble always stays 8 px inside the screen.  
  _From configuration: “It always stays 8 px inside the screen.”_

## Configuration

- **recommended** `placement`: placement picks the side, top by default, and can line the bubble up with the trigger's start or end edge instead of its centre.  
  _From configuration: “Placement picks the side, top by default, and can line the bubble up with the trigger's start or end edge instead of its centre.”_
- **recommended** `placement` = `top`: Above (top) is the default: the bubble sits above, its arrow pointing down at the trigger.  
  _From configuration: “The default: the bubble sits above, its arrow pointing down at the trigger.”_
- **recommended** `placement` = `bottom`: Below (bottom) is for triggers near the top of the screen, where there's no room above.  
  _From configuration: “For triggers near the top of the screen, where there's no room above.”_
- **recommended** `placement` = `top-start`: Start-aligned (top-start): the bubble's start edge lines up with the trigger's; the arrow still points at it.  
  _From configuration: “The bubble's start edge lines up with the trigger's; the arrow still points at it.”_
- **recommended** `placement` = `right`: Beside the trigger (right) is for a row with room to its side. On a phone there rarely is, so it opens above or below instead.  
  _From configuration: “Next to the trigger, for a row with room to its side. On a phone there rarely is, so it opens above or below instead.”_
- **recommended** `placement`: When the bubble doesn't fit on its side it flips to the opposite one; beside the trigger with no room either way, it moves above or below.  
  _From configuration: “When the bubble doesn't fit on that side it flips to the opposite one, and beside the trigger with no room either way it moves above or below.”_
- **recommended** `TooltipTrigger.asChild`: Pass the info IconButton to TooltipTrigger with asChild, so the button itself is the trigger.  
  _From anatomy: “Yours: an info IconButton passed with asChild.”_
- **recommended** `TooltipTrigger.asChild`: A Coin button nested inside TooltipTrigger without asChild opens it too.  
  _From sources: “though a Coin button nested inside the trigger opens it too.”_
- **recommended** `TooltipContent.width`: The bubble is as wide as its text up to 280 px, then wraps. A width on TooltipContent sets it instead, like Figma's Custom Width variant.  
  _From sizing: “The bubble is as wide as its text up to 280 px, then wraps; padding is 12 × 8 px and text 14 px on 18 px lines. A width on the content sets it instead, like Figma's Custom Width variant.”_
- **recommended** `TooltipContent.width` = `200`: A set width of 200 px (Figma's Custom Width On) makes the same text wrap sooner.  
  _From sizing: “A set width of 200 px, Figma's Custom Width On: the same text wraps sooner.”_
- **recommended** `open`: The screen can open it itself with open, for example for a first-time hint, and hears every close through onOpenChange.  
  _From states: “The screen can also open it itself with open and hear every close through onOpenChange.”_
- **recommended** A press on the trigger toggles the bubble; the trigger's and the child's own onPress run after the toggle.  
  _From evidence: “The trigger's and the child's `onPress` are chained after the toggle (lines 205-217).”_

## Content

- **recommended** Explain one term in a sentence or two of plain text, and keep the term itself on the page.  
  _From content: “Explain one term in a sentence or two of plain text, and keep the term itself on the page.”_
- **recommended** Keep it to a sentence: one short line explains the term and gets out of the way.  
  _From doDont: “One short line explains the term and gets out of the way.”_
- **recommended** Long text wraps at 280 px; two or three lines is the most people will read.  
  _From sizing: “Wraps at 280 px. Two or three lines is the most people will read.”_
- **recommended** Plain text and Coin Text in TooltipContent both get the white label style.  
  _From content: “Plain text and Coin Text both get the white label style.”_
- **REQUIRED** Never put an action in the bubble: a press inside it just closes it.  
  _From content: “A press inside it just closes it, so never put an action there.”_

## States

| State | When | From |
| --- | --- | --- |
| Closed | Only the trigger sits in the page; the bubble isn't drawn. | anatomy: “Only the trigger sits in the page.” |
| Open | A press on the trigger opens it; there's no hover, focus or timer. While it's open a clear layer covers the page. | states: “A press on the trigger opens it; there's no hover, focus, or timer. While it's open a clear layer covers the page” |
| Closing | The next press anywhere, Escape on the web, or Android's back button closes it. After Escape, focus stays on the trigger. | states: “the next press anywhere, Escape on the web, or Android's back button closes it. After Escape, focus stays on the trigger.” |

## Accessibility

- **recommended** On the web the bubble is a tooltip tied to its trigger, and Escape closes it.  
  _From sources: “On the web the bubble is a tooltip tied to its trigger, and Escape closes it.”_
- **recommended** After Escape, focus stays on the trigger.  
  _From states: “After Escape, focus stays on the trigger.”_
- **recommended** On the web a keyboard user can Tab to the trigger and open the bubble with Enter or Space; Escape closes it and leaves focus on the trigger.  
  _From evidence: “Escape closes an open tooltip on the web again, with focus left on the trigger and `aria-describedby` removed: opened with Enter or Space after Tab, or with the mouse, and after Tabbing away.”_
- **recommended** The bubble's text is not the trigger's accessible name: the trigger keeps its own.  
  _From evidence: “Biscuit's #20 comment (“press-toggled label … not the trigger's accessible name”) matches the code.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Keep it to a sentence | Write a paragraph | Four sentences fill the bubble and cover the screen behind it. |
| Open it from an info button | Put it on the main action | Every press on Invest now also pops a bubble over the screen. |

## Examples

### Explain a term: one sentence that says what NAV means, opened from the i next to it. The term stays on the page as Text; the info IconButton, passed with asChild, is the trigger.

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

_From content: “One sentence that says what NAV means, opened from the i next to it.”_

### Explaining fund terms, the guide's In context: a fund's details list three terms, each with an info button. Pressing one explains it above its row; the next press anywhere closes it. Each Tooltip keeps its own open state.

```tsx
<VStack>
  <Title title="Nifty 50 Index Fund" subtitle="Direct plan · Growth" />
  <VStack>
    <HStack alignVertical="center" justifyHorizontal="space-between">
      <HStack alignVertical="center">
        <Text>NAV</Text>
        <Tooltip>
          <TooltipTrigger asChild>
            <IconButton iconName="ic_info" accessibilityLabel="About NAV" />
          </TooltipTrigger>
          <TooltipContent>The price of one unit of the fund, updated every working day.</TooltipContent>
        </Tooltip>
      </HStack>
      <Text>₹182.40</Text>
    </HStack>
    <HStack alignVertical="center" justifyHorizontal="space-between">
      <HStack alignVertical="center">
        <Text>Expense ratio</Text>
        <Tooltip>
          <TooltipTrigger asChild>
            <IconButton iconName="ic_info" accessibilityLabel="About expense ratio" />
          </TooltipTrigger>
          <TooltipContent>The yearly fee the fund charges, as a share of your investment.</TooltipContent>
        </Tooltip>
      </HStack>
      <Text>0.45%</Text>
    </HStack>
    <HStack alignVertical="center" justifyHorizontal="space-between">
      <HStack alignVertical="center">
        <Text>Exit load</Text>
        <Tooltip>
          <TooltipTrigger asChild>
            <IconButton iconName="ic_info" accessibilityLabel="About exit load" />
          </TooltipTrigger>
          <TooltipContent>A fee if you sell within a year of investing.</TooltipContent>
        </Tooltip>
      </HStack>
      <Text>1%</Text>
    </HStack>
  </VStack>
</VStack>
```

_From inContext: “A fund's details list three terms, each with an info button. Pressing one explains it above its row; the next press anywhere closes it.”_

### Custom width: a set width of 200 px, Figma's Custom Width On, so the longer XIRR explanation wraps sooner. Without width the bubble hugs its text up to 280 px.

```tsx
<HStack alignVertical="center">
  <Text>XIRR</Text>
  <Tooltip>
    <TooltipTrigger asChild>
      <IconButton iconName="ic_info" accessibilityLabel="About XIRR" />
    </TooltipTrigger>
    <TooltipContent width={200}>Your yearly return, counting when each payment went in. It lets you compare investments made at different times and over different periods.</TooltipContent>
  </Tooltip>
</HStack>
```

_From sizing: “A set width of 200 px, Figma's Custom Width On: the same text wraps sooner.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `ReactNode` |  |  | yes | types |  |
| `modes` | `Modes` |  |  |  | types |  |
| `open` | `boolean` |  |  |  | types | Initial visibility state (controlled) |
| `onOpenChange` | `(open: boolean) => void` |  |  |  | evidence (2026-10-19) | Called on every open and close, also when the Tooltip is uncontrolled. Declared: Callback when visibility changes. |
| `defaultOpen` | `boolean` |  | `false` |  | types | Default false, from the component source. |
| `placement` | `Placement` | left, right, top, bottom, top-start, top-end, bottom-start, bottom-end, left-start, left-end, right-start, right-end | `"top"` |  | evidence (2026-10-19) | A bubble that doesn't fit flips to the opposite side; left or right with no room either way fall back to top or bottom, whichever has more space; every bubble is clamped 8 px inside the screen. Declared: Preferred placement of the tooltip. Default "top", from the component source. |
| `TooltipTrigger.asChild` | `boolean` |  |  |  | evidence (2026-10-19) | On TooltipTrigger: with asChild the child itself becomes the trigger (the guide passes an info IconButton). Without it the trigger is a Pressable wrapping the child, and the child gets pointerEvents none, so a press on a nested Coin Button or IconButton reaches the trigger and opens it too. |
| `TooltipContent.width` | `number` |  |  |  | evidence (2026-10-19) | On TooltipContent: a set bubble width in px, Figma's Custom Width On. Omit it and the bubble hugs its text up to 280 px. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | evidence (2026-10-19) | The only collection Tooltip reads. Padding, type, arrow, radius and max width don't change with any mode. Declared: A token collection Tooltip reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `ReactNode` |  |  |  | types |  |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onOpenChange` | `(open: boolean) => void` |  |  |  | types | Callback when visibility changes |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- Figma draws only a downward arrow near the bubble's bottom left or right, in two variants (Custom Width Off and On); in code the arrow points at the trigger's centre and the bubble takes 12 placements. _(evidence, 2026-10-28)_
- The code adds a fixed drop shadow and the full-window layer that closes it; Figma shows neither. _(evidence, 2026-10-19)_
- From the code, not tested: Tooltip imports react-dom's portal at the top of the file, and react-dom is only a devDependency of the package. _(evidence, 2026-10-19)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `(whole entry)` · trace-check: The cross-check reviewed an earlier version of this entry. Run npm run agent-pack:cross-check -- tooltip.
- `/anatomy/0` · human: The guide's info buttons are IconButtons with Emphasis Low and Button / Size S (src/guides/tooltip.guide.tsx, INFO), but no guide sentence says so. Under the building rules the entry's examples leave modes at their defaults, so an agent builds the info button as a default IconButton (Emphasis High, size M), not the quiet small i the guide shows. Guide fix #517: say what the info button should look like. Added by Claude Code in the overnight run agentpack-batch4, for Marcin to confirm.
