# Badge

> Sample data. The pack pipeline generates this file from the entry JSON.

State: flagged · guide commit 2875a57777695e94bb697713e7c26b91de9e3f5a · jfs-components 0.1.78 · category feedback

Use a Badge to make a short status, category, or count easy to scan beside the content it describes.

## Use when

- **recommended**: A short status, category, or count describes nearby content. From summary: “Use a Badge to make a short status, category, or count easy to scan beside the content it describes.”

## Avoid when

- **discouraged**: A sentence inside the Badge. Use **Nudge** instead. From doDont: “Avoid a sentence inside the Badge”

## Anatomy

- **Leading visual** (optional): An optional Icon before the label. From anatomy: “Adds a recognizable cue without replacing the words.”
- **Label** (required): The status, category, or count text. From anatomy: “Names the status or category.”
- **Surface** (required): The token-owned shape around the label. From anatomy: “Groups the message into one compact shape.”

## Allowed children (facts)

- `leading` accepts Icon (source evidence)

## Placement advice

- **recommended**: Place the Badge beside its subject, such as next to a row title in a Card. From inContext: “Keep status beside its subject”
- **required** `leading`: Pass the Badge's own modes object to an Icon in leading. From evidence: “It renders a supplied leading node verbatim, so the guide passes the same owner mode object to the public Icon and selects the matching `Context4` for Solid or Glass.”

## Configuration

- **recommended** `type` = `default`: Use the solid type beside ordinary content. From configuration: “Use a solid Badge beside ordinary content.”
- **recommended** `type` = `glass`: Use the glass type only where the image or surface underneath stays part of the composition. From configuration: “Use glass where the underlying image or surface remains part of the composition.”
- **recommended** `Badge Size`: Choose Badge Size for the density of the surrounding content. From fact `/facts/modes/0`.
- **recommended** `Emphasis` = `High`: Give High emphasis only to the status that needs attention. From doDont: “Give the status needing attention the strongest emphasis.”

## Content

- **recommended**: Write the status in a few familiar words, not a sentence. From content: “Write the status, not a sentence”
- **recommended**: Keep tense and capitalization consistent across a set of badges. From content: “Keep tense and capitalization consistent across the same set.”
- Good: Paid, Due today, 3 new
- Bad: Payment successfully completed, Awaiting payment processing, FAILURE

## States

- **Informational**: The default. The Badge only shows information. From states: “Most badges communicate information.”
- **Action**: Only when opening related detail is useful. Pass onPress. From states: “Add an action only when opening related detail is useful.”
- **Loading**: While the value is still arriving. Pass loading. From states: “Loading shows that the value is still arriving.”

## Accessibility

- **required**: Write a meaningful visible label. Badge ignores accessibilityLabel, so the label is its accessible name. From evidence: “The current Badge implementation ignores its `accessibilityLabel` argument on the rendered wrapper; the interactive example keeps a meaningful visible label.”

## Do and don’t

- Do: Use a short status, such as Paid. Don’t: Put the whole explanation inside the Badge. Why: Keep the status concise. From doDont: “Avoid putting the whole explanation inside the Badge.”
- Do: Match the system meaning to the words. Don’t: Show Paid as negative or Failed as positive. Why: Conflicting words and tone make the status harder to trust. From doDont: “Conflicting words and tone make the status harder to trust.”
- Do: Reserve High emphasis for the status that needs attention. Don’t: Give every status the same High emphasis. Why: If every status competes, the urgent one is harder to find. From doDont: “If every status competes, the urgent one is harder to find.”

## Examples

### A status beside a row title

```jsx
<Card variant="slim" modes={{ 'Color Mode': 'Light' }}>
  <HStack alignVertical="center" justifyHorizontal="space-between" modes={{ 'Color Mode': 'Light' }}>
    <Text>September payment</Text>
    <Badge
      label="Paid"
      modes={{ 'Color Mode': 'Light', 'Badge Size': 'Medium', 'Semantic Intent': 'System', AppearanceSystem: 'positive', Emphasis: 'High', Context4: 'Badge' }}
    />
  </HStack>
</Card>
```

### A leading Icon that shares the Badge's modes

```jsx
<Badge
  label="New"
  leading={
    <Icon
      iconName="ic_card"
      accessibilityElementsHidden
      importantForAccessibility="no"
      modes={{ 'Color Mode': 'Light', 'Badge Size': 'Medium', 'Semantic Intent': 'Brand', AppearanceBrand: 'Primary', Emphasis: 'High', Context4: 'Badge' }}
    />
  }
  modes={{ 'Color Mode': 'Light', 'Badge Size': 'Medium', 'Semantic Intent': 'Brand', AppearanceBrand: 'Primary', Emphasis: 'High', Context4: 'Badge' }}
/>
```

### An action that opens related detail

```jsx
<Badge
  label="View details"
  onPress={() => {}}
  modes={{ 'Color Mode': 'Light', 'Badge Size': 'Medium', 'Semantic Intent': 'Brand', AppearanceBrand: 'Primary', Emphasis: 'High', Context4: 'Badge' }}
/>
```

## Facts: props

- `label` · type `string` · Visible label text shown inside the badge. · source types
- `type` · type `BadgeType` · values `default`, `glass` · default `"default"` · source types
- `modes` · type `Modes` · Modes used to resolve design tokens. · source types
- `leading` · type `ReactNode` · Optional node rendered before the label, inside the surface. · source types
- `loading` · type `boolean` · Shows a badge-shaped skeleton instead of the badge. · source types
- `onPress` · type `() => void` · Makes the badge interactive. · source types
- `accessibilityLabel` · type `string` · Accepted by the types, but ignored when rendered. See gaps. · source runtime, checked 2026-09-23

## Facts: modes

- `Badge Size` · values `Medium`, `Small` · source types
- `Semantic Intent` · values `Brand`, `System` · source types
- `AppearanceBrand` · values `Primary`, `Secondary`, `Neutral`, `Tertiary` · source types
- `AppearanceSystem` · values `positive`, `warning`, `negative` · source types
- `Emphasis` · values `High`, `Medium`, `Low` · source types
- `Context4` · values `Badge`, `Badge/glass` · Badge for the solid type, Badge/glass for glass. · source evidence, checked 2026-09-23

## Facts: slots

- `leading` · type `ReactNode` · Rendered verbatim; it does not receive the Badge's modes. · source evidence, checked 2026-09-23

## Facts: events

- `onPress` · type `() => void` · source types

## Gaps

- accessibilityLabel is ignored (source evidence, checked 2026-09-23)

## Flags

- `(whole entry)`: Hand-written sample for the Designer / Agent views. The pack pipeline did not produce or check this entry. (human)
- `/allowedChildren/0`: The types accept any node in leading; only Icon is verified in the evidence. Do not read this as a limit. (cross-check)
