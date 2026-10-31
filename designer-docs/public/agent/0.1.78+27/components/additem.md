# Additem

> Coin agent pack 0.1.78+27 (pilot). Generated from `components/additem.json`; the JSON is the source of truth.

- **State:** documented
- **Package:** jfs-components 0.1.78 · guide commit `cba512f` · built 2026-10-31T05:18:28Z
- **Category:** input (for discovery only, not a limit on composition) · **Tags:** upload, attachment, attach file
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=additem) · [Figma](https://www.figma.com/design/dSlK8ueQ7wlbyUSZd4f8QO/Coin-Subcomponents) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-additem--docs)

Add an attachment and show what was chosen.

## Use when

- **recommended** Add an attachment and show what was chosen.  
  _From summary: “Add an attachment and show what was chosen.”_
- **recommended** Keep the empty, preview and unavailable states distinct.  
  _From corePrinciple: “Keep empty, preview, and unavailable states distinct.”_

## Avoid when

- **discouraged** A whole upload field, with a label, support text and a list of files: the guide uses Add Item inside a Form Upload, the public composite that supplies the field label, support text, attachment row, picker handoff and controlled attachment list. Use instead: `FormUpload`.  
  _From inContext: “The public composite supplies the field label, support text, attachment row, picker handoff, and controlled attachment list.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| 44 × 44 cell | The fixed boundary is the target and visual container. | yes | anatomy: “The fixed boundary is the target and visual container.” |
| Add icon | In the empty state: identifies the empty state as an attachment trigger. | no | anatomy: “Identifies the empty state as an attachment trigger.” |
| Thumbnail | In the preview state: confirms which visual asset was selected. | no | anatomy: “Confirms which visual asset was selected.” |
| Remove affordance | Appears only when onRemove is supplied for a preview. | no | anatomy: “Appears only when onRemove is supplied for a preview.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

_No slots._

## Placement

- **recommended** Use Add Item inside a Form Upload.  
  _From inContext: “Use Additem inside FormUpload”_
- **recommended** The cell stays 44 × 44.  
  _From sizing: “The cell stays 44 × 44”_
- **recommended** Add Item owns its fixed cell; a Form Upload or another public layout owns the row gaps, wrapping and the surrounding label.  
  _From sizing: “A FormUpload or another public layout owns row gaps, wrapping, and the surrounding label.”_
- **recommended** In an attachment row, cells keep the same footprint while the row controls spacing.  
  _From sizing: “Cells keep the same footprint while the row controls spacing.”_
- **recommended** In a constrained host, the host can wrap around the fixed cell without resizing it.  
  _From sizing: “The host can wrap around the fixed cell without resizing it.”_

## Configuration

- **recommended** `state`: The state is empty by default: the cell shows the add icon.  
  _From fact `/facts/props/0` (state, source types)_
- **recommended** `state` = `empty`: Empty can call onPress or an injected picker.  
  _From configuration: “Empty can call onPress or an injected picker.”_
- **recommended** `picker`: For the add trigger, use picker with onAssetsPicked, or wire a platform-specific onPress.  
  _From configuration: “Use picker with onAssetsPicked, or wire a platform-specific onPress.”_
- **recommended** `picker`: With picker set, onPress is ignored in the empty state: pressing the cell opens the picker, and the picked assets reach onAssetsPicked.  
  _From fact `/facts/props/4` (picker, source types)_
- **recommended** `imageSource`: Preview needs an image source: set state to preview with imageSource to show what was chosen.  
  _From configuration: “Supply preview plus imageSource to show what was chosen.”_
- **recommended** `onPress`: In preview, onPress is called when the cell is pressed, for example to open a larger view of the image.  
  _From fact `/facts/props/2` (onPress, source types)_
- **recommended** `onRemove`: onRemove is optional: setting it shows the remove control, which calls it with no event argument.  
  _From fact `/facts/props/3` (onRemove, source evidence)_
- **recommended** `onRemove`: Omit onRemove when the selected attachment cannot be cleared here.  
  _From configuration: “Omit onRemove when the selected attachment cannot be cleared here.”_
- **recommended** `isDisabled` = `true`: Show the unavailable state with isDisabled rather than a new visual variant.  
  _From states: “Unavailable uses the public isDisabled behavior rather than a new visual variant.”_
- **recommended** `modes`: The inner IconCapsule icons default to AppearanceBrand Neutral, Emphasis Low and Icon Capsule Size S; any key passed in modes overrides those defaults.  
  _From fact `/facts/props/6` (modes, source evidence)_

## Content

- **recommended** A 44 px image cannot explain itself: keep a meaningful filename or field label nearby, so the selected asset remains understandable.  
  _From content: “Keep a meaningful filename or field label nearby so the selected asset remains understandable.”_
- **recommended** Pair the cell with the field purpose and a readable filename.  
  _From content: “Pair the cell with the field purpose and a readable filename.”_
- **recommended** Use a useful field label: “Identity documents” says more than a generic “Upload”.  
  _From content: ““Identity documents” says more than a generic “Upload.””_
- **discouraged** `state` = `empty`: Do not use the empty add icon after an asset has been chosen.  
  _From content: “Do not use the empty add icon after an asset has been chosen.”_
- **discouraged** `state` = `preview`: Don't show an unexplained thumbnail: people cannot confirm what file they selected or why it belongs here.  
  _From doDont: “People cannot confirm what file they selected or why it belongs here.”_
- **discouraged** `state` = `empty`: Don't pair selected copy with an empty cell: the add icon contradicts the nearby selected state.  
  _From doDont: “The add icon contradicts the nearby selected state.”_
- **recommended** `isDisabled`: Explain why adding is unavailable: a nearby reason tells people what to do next.  
  _From doDont: “A nearby reason tells people what to do next.”_
- **discouraged** `isDisabled` = `true`: Don't disable the cell without a reason: an unexplained unavailable state leaves people stuck.  
  _From doDont: “An unexplained unavailable state leaves people stuck.”_

Good: “receipt-september.svg”, “Identity documents”, “Receipt · September”, “Receipt selected”, “Complete the required details to add a receipt”

Bad: “Upload”

## States

| State | When | From |
| --- | --- | --- |
| Empty | Ready to add: the add icon tells people the cell can accept an attachment. | states: “The add icon tells people the cell can accept an attachment.” |
| Preview | state preview, an asset selected: a thumbnail confirms the chosen asset and can expose removal. | states: “A thumbnail confirms the chosen asset and can expose removal.” |
| Unavailable | isDisabled: the cell is dimmed and its press behavior is disabled. | states: “The cell is dimmed and its press behavior is disabled.” |

## Accessibility

- **recommended** `onRemove`: The remove control is its own button beside the preview, named “Remove” plus the preview's label; a click, a tap or Enter removes the item without opening the preview.  
  _From sources: “The remove control is its own button beside the preview, named “Remove” plus the preview’s label, and a click, a tap, or Enter removes the item without opening the preview.”_
- **recommended** `accessibilityLabel`: The cell's accessibilityLabel defaults to a descriptive label based on its state.  
  _From fact `/facts/props/7` (accessibilityLabel, source types)_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Keep a meaningful label nearby | Show an unexplained thumbnail | People cannot confirm what file they selected or why it belongs here. |
| Keep selected state visible | Pair selected copy with an empty cell | The add icon contradicts the nearby selected state. |
| Explain why adding is unavailable | Disable the cell without a reason | An unexplained unavailable state leaves people stuck. |

## Examples

### Add Item inside a Form Upload, the guide's In context: the field “Identity documents” with its support text, one of two attachments added, shown as a preview cell, and the add cell for the second. Form Upload builds the Add Item cells itself from attachments. The uri is a placeholder for the app's file; the onAttachmentsChange stub and the picker stub stand for the app's own list of files and its picker.

```tsx
<FormUpload
  label="Identity documents"
  supportText="Add a clear image and keep the filename nearby."
  attachments={[{ uri: 'https://example.com/receipt-september.svg', name: 'receipt-september.svg' }]}
  maxCount={2}
  picker={async () => ({ assets: [] })}
  onAttachmentsChange={() => {}}
/>
```

_From inContext: “The public composite supplies the field label, support text, attachment row, picker handoff, and controlled attachment list.”_

### A chosen receipt with a meaningful label beside it, the guide's Do “Keep a meaningful label nearby”: a preview Add Item with its remove control, next to the text “Receipt · September”. The uri is a placeholder for the chosen image, onRemove stands for the screen clearing the attachment, and accessibilityLabel names the preview.

```tsx
<HStack alignVertical="center">
  <Additem
    state="preview"
    imageSource="https://example.com/receipt-september.svg"
    onRemove={() => {}}
    accessibilityLabel="Receipt attachment preview"
  />
  <Text text="Receipt · September" />
</HStack>
```

_From doDont: “The attachment remains identifiable even when the image is small.”_

### Adding is unavailable, with the reason nearby, the guide's Do “Explain why adding is unavailable”: a dimmed empty Add Item (isDisabled) above the text that tells people what to do next. accessibilityLabel names the add cell.

```tsx
<VStack>
  <Additem isDisabled accessibilityLabel="Add an attachment" />
  <Text text="Complete the required details to add a receipt" />
</VStack>
```

_From doDont: “A nearby reason tells people what to do next.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `state` | `AdditemState` | empty, preview | `"empty"` |  | types | Visual state of the item. - `'empty'` — shows the add/upload icon (default). - `'preview'` — shows `imageSource`; remove overlay appears only when `onRemove` is set. Default "empty", from the component source. |
| `imageSource` | `ImageSourcePropType \| string \| undefined` |  |  |  | types | Image to preview when `state` is `'preview'`. Accepts the same shapes as the library's `Image` component (remote URI string, `{ uri }`, or `require()`). |
| `onPress` | `() => void` |  |  |  | types | Called when the cell is pressed. Ignored for `'empty'` when `picker` is set. Use for empty without picker, or for preview (e.g. lightbox). |
| `onRemove` | `() => void` |  |  |  | evidence (2026-10-08) | The remove control is a button placed next to the preview button, not inside it, named “Remove” plus the cell's label (“Remove Receipt 1” in a Form Upload); a mouse click and Enter both remove, and a standalone Add Item's remove doesn't trigger open. Declared: Called when the remove icon overlay is pressed in `'preview'` mode. When set, the close `IconCapsule` is shown. No event argument is passed. |
| `picker` | `AdditemPicker` |  |  |  | types | Optional picker to invoke when the empty cell is pressed. When provided, `onPress` is ignored for the empty state and the cell becomes a real upload trigger that resolves with picked assets via `onAssetsPicked`. |
| `onAssetsPicked` | `(assets: PickedAsset[]) => void` |  |  |  | types | Called after a successful picker invocation with the selected assets. |
| `modes` | `Modes` |  |  |  | evidence (2026-10-08) | The inner IconCapsule still defaults to Neutral, Low and S. Declared: Modes for design-token resolution. Defaults to Neutral / Low / Icon Capsule Size S for the inner `IconCapsule` icons; any key supplied here overrides those defaults. |
| `accessibilityLabel` | `string` |  |  |  | types | Accessibility label. Defaults to a descriptive label based on state. |
| `isDisabled` | `boolean` |  | `false` |  | evidence (2026-10-08) | Disabled cells render at 0.5 opacity once. Declared: Disables press interaction. Also dims the cell. Default false, from the component source. |
| `testID` | `string` |  |  |  | evidence (2026-10-08) | In preview, testID lands on a wrapper holding the preview button, the image and the remove button. Declared: Test identifier. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Primary"` |  | types | A token collection Additem reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `AppearanceSystem` | `mode collection` | positive, warning, negative | `"positive"` |  | types | A token collection Additem reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection Additem reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context` | `mode collection` | Default, Nudge&Alert, CTACard, ListItem | `"Default"` |  | types | A token collection Additem reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Emphasis` | `mode collection` | High, Medium, Low | `"High"` |  | types | A token collection Additem reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Icon Capsule Size` | `mode collection` | M, L, S, XS | `"M"` |  | types | A token collection Additem reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection Additem reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Semantic Intent` | `mode collection` | Brand, System | `"Brand"` |  | types | A token collection Additem reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

_No slots._

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onPress` | `() => void` |  |  |  | types | Called when the cell is pressed. Ignored for `'empty'` when `picker` is set. Use for empty without picker, or for preview (e.g. lightbox). |
| `onRemove` | `() => void` |  |  |  | types | Called when the remove icon overlay is pressed in `'preview'` mode. When set, the close `IconCapsule` is shown. No event argument is passed. |
| `onAssetsPicked` | `(assets: PickedAsset[]) => void` |  |  |  | types | Called after a successful picker invocation with the selected assets. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

_None recorded._

## Flags

_None._
