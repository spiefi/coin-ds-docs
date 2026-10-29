# FormUpload

> Coin agent pack 0.1.78+14 (pilot). Generated from `components/formupload.json`; the JSON is the source of truth.

- **State:** documented
- **Package:** jfs-components 0.1.78 · guide commit `cba512f` · built 2026-10-29T05:38:55Z
- **Category:** input (for discovery only, not a limit on composition) · **Tags:** upload, attachment, file upload, photo upload, image picker, receipt
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=formupload) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=7217-11616) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-formupload--docs)

Use a Form Upload to collect photos, such as receipts or ID proof, with a label, previews, and a hint about what to add.

## Use when

- **recommended** Collect photos, such as receipts or ID proof, with a label, previews, and a hint about what to add.  
  _From summary: “Use a Form Upload to collect photos, such as receipts or ID proof, with a label, previews, and a hint about what to add.”_

## Avoid when

- **discouraged** Files that are not images: previews show images only, and the field does not check file type or size.  
  _From sources: “Previews show images only, and file type and size are not checked.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Label | label: names what to add; plain text above the row. | no | anatomy: “Names what to add; plain text above the row.” |
| Preview | One per attachment: a 44 px thumbnail of each added image. | no | anatomy: “A 44 px thumbnail of each added image.” |
| Remove | On each preview: a button named after the file that takes it out of the row. | no | anatomy: “A button named after the file that takes it out of the row.” |
| Add cell | After the previews: opens the app's picker; hidden once the limit (maxCount) is reached. | no | anatomy: “Opens the app’s picker; hidden once the limit is reached.” |
| Support text | supportText below the row: the file rules; an error message replaces it. | no | anatomy: “File rules; an error message replaces it.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `children` | `ReactNode` | types |

## Placement

- **recommended** `attachments`: The app opens its own picker and keeps the list of files: the screen holds attachments and passes picker.  
  _From inContext: “The app opens its own picker and keeps the list of files.”_
- **recommended** `isInvalid`: In the guide's expense claim, when people tap Submit without a receipt, the screen sets the error; the button stays enabled.  
  _From inContext: “When people tap Submit without a receipt, the screen sets the error; the button stays enabled.”_
- **recommended** The row fills its container and wraps to a new line when it runs out of room.  
  _From sizing: “The row fills its container and wraps to a new line when it runs out of room.”_
- **recommended** Each cell is 44 × 44 px with 8 px between cells.  
  _From sizing: “Each cell is 44 × 44 px with 8 px between cells.”_
- **recommended** The label, the row and the support text sit 8 px apart.  
  _From evidence: “8 px between label, row, and support text.”_

## Configuration

- **recommended** Show what was added and how much more fits.  
  _From corePrinciple: “Show what was added and how much more fits.”_
- **recommended** `maxCount`: Each added file becomes a preview, and the add cell stays at the end until the limit (maxCount) is reached.  
  _From configuration: “Each added file becomes a preview, and the add cell stays at the end until the limit is reached.”_
- **recommended** `maxCount`: Set a limit with maxCount: the add cell disappears when the row is full.  
  _From doDont: “The add cell disappears when the row is full.”_
- **discouraged** `maxCount`: Do not leave the limit open: without maxCount the add cell never goes away, so people can't tell when they're done.  
  _From doDont: “The add cell never goes away, so people can’t tell when they’re done.”_
- **recommended** `maxCount`: Without a limit (no maxCount), the add cell never goes away.  
  _From configuration: “Without a limit, the add cell never goes away.”_
- **recommended** The package always puts the add cell last, after the previews, and wraps the row.  
  _From sources: “the package wraps the row and always puts the add cell last”_
- **recommended** `maxCount`: Files picked beyond maxCount are dropped.  
  _From evidence: “Picked assets beyond `maxCount` are dropped.”_
- **recommended** `onAttachmentsChange`: Keep attachments in the screen and update them from onAttachmentsChange: the field calls it to add or remove a file, and the parent updates the attachments array.  
  _From fact `/facts/props/5` (onAttachmentsChange, source types)_
- **recommended** `picker`: Pass the app's picker as picker: it keeps the component free of native picker libraries, and the add cell opens it, so uploads work on phones.  
  _From fact `/facts/props/6` (picker, source types)_
- **recommended** `errorMessage`: With isInvalid set, errorMessage replaces supportText; it shows only while the field is invalid (or has a Form error).  
  _From evidence: “`errorMessage` replaces `supportText` only while `isInvalid` (or a Form error) is set.”_
- **recommended** File type and size are not checked by the field.  
  _From sources: “file type and size are not checked”_
- **recommended** `isDisabled` = `true`: Set isDisabled to fade the cells and stop adding and removing; the label stays at full contrast.  
  _From states: “Disabled fades the cells and stops adding and removing; the label stays at full contrast.”_

## Content

- **recommended** `label`: Name what to add in the label, such as “Receipts” or “PAN card”, without “Upload” or “Your”.  
  _From content: “Name what to add in the label, such as “Receipts” or “PAN card”, without “Upload” or “Your”.”_
- **recommended** `label`: Name the document: a short label says what belongs here.  
  _From doDont: “A short label says what belongs here.”_
- **discouraged** `label`: Do not put instructions in the label: the rules crowd out the name. Put them in the support text.  
  _From doDont: “The rules crowd out the name.”_
- **recommended** `supportText`: Use the support text for file types and size.  
  _From content: “Use the support text for file types and size”_
- **recommended** `errorMessage`: Write an error that says how to fix it.  
  _From content: “an error that says how to fix it.”_
- **recommended** `errorMessage`: Say what to fix: the message names what is missing, such as “Add at least one receipt”.  
  _From doDont: “The message names what is missing.”_
- **discouraged** `isInvalid`: Do not mark an error without a message: with isInvalid, set an errorMessage that says what to fix.  
  _From doDont: “Mark an error without a message”_

Good: “Receipts”, “PAN card”, “PAN card, front and back”, “JPG or PNG, up to 5 MB each”, “Up to 6 photos, JPG or PNG”, “Up to 3 photos, JPG or PNG”, “Front and back, JPG or PNG”, “Add at least one receipt”

Bad: “Upload your receipts here in JPG or PNG format, up to 5 MB each”

## States

| State | When | From |
| --- | --- | --- |
| Empty | No attachments: one add cell until people pick a file. | configuration: “One add cell until people pick a file.” |
| Default | The default, with files below the limit: ready to add more files. | states: “Ready to add more files.” |
| At the limit | attachments reach maxCount: reaching the limit hides the add cell. | configuration: “Reaching the limit hides the add cell.” |
| Error | isInvalid with an errorMessage: the message shows in place of the support text and turns red; the cells do not change colour. | states: “An error shows its message in place of the support text; the cells do not change colour.” |
| Disabled | isDisabled: faded cells, with adding and removing turned off; the label stays at full contrast. | states: “Disabled fades the cells and stops adding and removing; the label stays at full contrast.” |

## Accessibility

- **recommended** `label`: On the web the field is a group named by its label, and the add cell says which field it adds to.  
  _From sources: “On the web the field is a group named by its label, and the add cell says which field it adds to.”_
- **recommended** `attachments`: Each file's remove button is named after it, such as “Remove Receipt 1”, and works with a click, a tap, or Enter.  
  _From sources: “Each file’s remove button is named after it, such as “Remove Receipt 1”, and works with a click, a tap, or Enter.”_
- **recommended** `attachments`: Each preview button is named after the attachment's name, so give each attachment one.  
  _From evidence: “Each preview button is named after the file's `name`.”_
- **recommended** `isDisabled` = `true`: When disabled, the cells are marked disabled and leave the tab order.  
  _From evidence: “cells get `aria-disabled` and leave the tab order.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Set a limit | Leave the limit open | The add cell never goes away, so people can’t tell when they’re done. |
| Say what to fix | Mark an error without a message | Nothing on screen changes. |
| Name the document | Put instructions in the label | The rules crowd out the name. |

## Examples

### Claim an expense, the guide's In context: the field sits in a Card above Submit claim. Shown after people tapped Submit claim with no receipt, so the screen has set isInvalid and the message, and the button stays enabled. The empty attachments list, the onAttachmentsChange stub and the picker stub stand in for the app's own list of files and its own picker.

```tsx
<Card>
  <VStack>
    <FormUpload
      label="Receipts"
      maxCount={3}
      supportText="Up to 3 photos, JPG or PNG"
      attachments={[]}
      onAttachmentsChange={() => {}}
      picker={async () => ({ assets: [] })}
      isInvalid
      errorMessage="Add at least one receipt"
    />
    <Button label="Submit claim" onPress={() => {}} />
  </VStack>
</Card>
```

_From inContext: “When people tap Submit without a receipt, the screen sets the error; the button stays enabled.”_

### Two receipts with a limit of three: each file shows as a preview with a remove button named after it (Remove Receipt 1), the add cell follows, and the support text gives the file rules. The uris are placeholders for the app's files, and the picker stub stands in for the app's picker.

```tsx
<FormUpload
  label="Receipts"
  maxCount={3}
  supportText="JPG or PNG, up to 5 MB each"
  attachments={[
    { uri: 'https://example.com/receipt-1.jpg', name: 'Receipt 1' },
    { uri: 'https://example.com/receipt-2.jpg', name: 'Receipt 2' },
  ]}
  onAttachmentsChange={() => {}}
  picker={async () => ({ assets: [] })}
/>
```

_From anatomy: “Each file shows as a preview with a remove button, an add cell follows, and support text sits below.”_

### At the limit: three receipts with maxCount 3, so the add cell is hidden and people can tell they're done; removing one brings it back. The uris are placeholders for the app's files, and the picker stub stands in for the app's picker.

```tsx
<FormUpload
  label="Receipts"
  maxCount={3}
  supportText="Up to 3 photos, JPG or PNG"
  attachments={[
    { uri: 'https://example.com/receipt-1.jpg', name: 'Receipt 1' },
    { uri: 'https://example.com/receipt-2.jpg', name: 'Receipt 2' },
    { uri: 'https://example.com/receipt-3.jpg', name: 'Receipt 3' },
  ]}
  onAttachmentsChange={() => {}}
  picker={async () => ({ assets: [] })}
/>
```

_From configuration: “Reaching the limit hides the add cell.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `label` | `string` |  |  |  | evidence (2026-10-08) | On the web it names the field, a group, and the add button, such as “Receipts, add attachment”. Declared: Label rendered above the upload row. |
| `supportText` | `string` |  |  |  | types | Helper text rendered below the upload row. When `errorMessage` is provided, it replaces the support text and renders in the error status. |
| `name` | `string` |  |  |  | types | Field name. When used inside `<Form>`, this is the key used to look up server-side `validationErrors`. |
| `attachments` | `FormUploadAttachment[]` |  |  |  | evidence (2026-10-02) | Each attachment renders a preview cell (testID-item-N) that shows its uri as an image (cover), with a remove control; there is no file icon or name, so a non-image file has no thumbnail. File type and size are not checked. Declared: Controlled list of attachments. Each item maps to an `Additem` cell: render attachments as `'preview'` cells and leave the last slot as the `'empty'` upload trigger. |
| `maxCount` | `number` |  |  |  | evidence (2026-10-02) | One empty add cell (testID-add) follows the previews while attachments.length < maxCount, or always when maxCount is unset. Picked assets beyond maxCount are dropped. Declared: Maximum number of attachments allowed. When omitted, the component renders a single empty upload trigger. Once `attachments.length` reaches `maxCount`, the empty trigger is hidden. |
| `onAttachmentsChange` | `(attachments: FormUploadAttachment[]) => void` |  |  |  | types | Called when the attachment list should change (add or remove). The parent is responsible for updating the `attachments` array. |
| `picker` | `AdditemProps['picker']` |  |  |  | types | Optional picker injected by the parent. This keeps the component free of native-library dependencies while still providing real upload behaviour on iOS/Android. The picker should wrap `react-native-image-picker`, `expo-image-picker`, `react-native-document-picker`, etc. |
| `errorMessage` | `string` |  |  |  | evidence (2026-10-02) | Replaces supportText only while isInvalid (or a Form error) is set. Invalid changes nothing else: the cells keep their colours. Declared: Error message shown below the row. When provided inside `<Form>`, the form context error is used automatically unless this prop is set explicitly. |
| `isInvalid` | `boolean` |  | `false` |  | evidence (2026-10-02) | The support text turns red (rgb(245, 0, 48)) with a warning icon; the cells are unchanged. Declared: Marks the field as invalid. Also set automatically by `<Form>` errors. Default false, from the component source. |
| `isDisabled` | `boolean` |  | `false` |  | evidence (2026-10-08) | Each cell renders at 0.5 opacity once, with the label at full opacity; adding and removing are blocked, and the cells leave the tab order. Declared: Disables all upload interaction. Default false, from the component source. |
| `children` | `React.ReactNode` |  |  |  | types | Custom children/slot rendered in place of the generated `Additem` cells. Useful when the consumer wants full control over the upload row. `modes` cascade into slot children automatically. |
| `modes` | `Modes` |  |  |  | types | Modes for design-token resolution. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Style overrides for the outermost wrapper. |
| `rowStyle` | `StyleProp<ViewStyle>` |  |  |  | types | Style overrides for the upload row container. |
| `accessibilityLabel` | `string` |  |  |  | types | Accessibility label. Defaults to `label`. |
| `testID` | `string` |  |  |  | evidence (2026-10-08) | Each preview gets testID-item-N, a wrapper holding the preview button and its remove button as siblings, and the add cell gets testID-add. Declared: Test identifier. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `AppearanceBrand` | `mode collection` | Primary, Secondary, Neutral, Tertiary | `"Primary"` |  | types | A token collection FormUpload reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `AppearanceSystem` | `mode collection` | positive, warning, negative | `"positive"` |  | types | A token collection FormUpload reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection FormUpload reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context` | `mode collection` | Default, Nudge&Alert, CTACard, ListItem | `"Default"` |  | types | A token collection FormUpload reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Emphasis` | `mode collection` | High, Medium, Low | `"High"` |  | types | A token collection FormUpload reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `FormField States` | `mode collection` | Idle, Active, Read Only, Error, Disabled | `"Idle"` |  | types | A token collection FormUpload reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Icon Capsule Size` | `mode collection` | M, L, S, XS | `"M"` |  | types | A token collection FormUpload reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection FormUpload reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Semantic Intent` | `mode collection` | Brand, System | `"Brand"` |  | types | A token collection FormUpload reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Status` | `mode collection` | Auto, Warning, Error, Success, Loading, Neutral | `"Auto"` |  | types | A token collection FormUpload reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types | Custom children/slot rendered in place of the generated `Additem` cells. Useful when the consumer wants full control over the upload row. `modes` cascade into slot children automatically. |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onAttachmentsChange` | `(attachments: FormUploadAttachment[]) => void` |  |  |  | types | Called when the attachment list should change (add or remove). The parent is responsible for updating the `attachments` array. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- Previews show images only: there is no file icon or name, so a non-image file, such as a PDF, has no thumbnail. _(evidence, 2026-10-02)_
- Figma has no error or disabled design: in the package an error only changes the support text, and disabled fades the cells to half opacity. _(evidence, 2026-10-08)_
- Figma's FormUpload puts its Add Item cells in one clipped row; the package wraps the row and always puts the add cell last. _(evidence, 2026-10-08)_
- Cells are 44 × 44 px in the package and 45 × 44 in Figma. _(evidence, 2026-10-02)_

## Flags

_None._
