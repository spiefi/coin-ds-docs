# FormUpload (brief)

> Coin agent pack 0.1.78+11 · documented · full entry: `components/formupload.md` (sources, all facts, flags)

Use a Form Upload to collect photos, such as receipts or ID proof, with a label, previews, and a hint about what to add.

**Use when**
- Collect photos, such as receipts or ID proof, with a label, previews, and a hint about what to add.

**Avoid when**
- Avoid: Files that are not images: previews show images only, and the field does not check file type or size.

**Placement**
- `attachments`: The app opens its own picker and keeps the list of files: the screen holds attachments and passes picker.
- `isInvalid`: In the guide's expense claim, when people tap Submit without a receipt, the screen sets the error; the button stays enabled.
- The row fills its container and wraps to a new line when it runs out of room.
- Each cell is 44 × 44 px with 8 px between cells.

**Key rules**
- Show what was added and how much more fits.
- `maxCount`: Each added file becomes a preview, and the add cell stays at the end until the limit (maxCount) is reached.
- `maxCount`: Set a limit with maxCount: the add cell disappears when the row is full.
- Avoid: `maxCount`: Do not leave the limit open: without maxCount the add cell never goes away, so people can't tell when they're done.
- `maxCount`: Without a limit (no maxCount), the add cell never goes away.
- The package always puts the add cell last, after the previews, and wraps the row.
- `maxCount`: Files picked beyond maxCount are dropped.
- `onAttachmentsChange`: Keep attachments in the screen and update them from onAttachmentsChange: the field calls it to add or remove a file, and the parent updates the attachments array.

**Example:** Claim an expense, the guide's In context: the field sits in a Card above Submit claim. Shown after people tapped Submit claim with no receipt, so the screen has set isInvalid and the message, and the button stays enabled. The empty attachments list, the onAttachmentsChange stub and the picker stub stand in for the app's own list of files and its own picker.

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

**Props:** `label`, `supportText`, `name`, `attachments`, `maxCount`, `onAttachmentsChange`, `picker`, `errorMessage`, `isInvalid`, `isDisabled`, `children`, `modes`, `style`, `rowStyle`, `accessibilityLabel`, `testID`. (* required)

**Modes it reads:** AppearanceBrand, AppearanceSystem, Color Mode, Context, Emphasis, FormField States, Icon Capsule Size, Page type, Semantic Intent, Status.

**Gaps (report, do not work around)**
- Previews show images only: there is no file icon or name, so a non-image file, such as a PDF, has no thumbnail.
- Figma has no error or disabled design: in the package an error only changes the support text, and disabled fades the cells to half opacity.
- Figma's FormUpload puts its Add Item cells in one clipped row; the package wraps the row and always puts the add cell last.
- Cells are 44 × 44 px in the package and 45 × 44 in Figma.

Full entry: `components/formupload.md`. Links: `components/formupload.links.md`.
