# Additem (brief)

> Coin agent pack 0.1.78+27 · documented · full entry: `components/additem.md` (sources, all facts, flags)

Add an attachment and show what was chosen.

**Use when**
- Add an attachment and show what was chosen.
- Keep the empty, preview and unavailable states distinct.

**Avoid when**
- Avoid: A whole upload field, with a label, support text and a list of files: the guide uses Add Item inside a Form Upload, the public composite that supplies the field label, support text, attachment row, picker handoff and controlled attachment list. Use instead: FormUpload.

**Placement**
- Use Add Item inside a Form Upload.
- The cell stays 44 × 44.
- Add Item owns its fixed cell; a Form Upload or another public layout owns the row gaps, wrapping and the surrounding label.
- In an attachment row, cells keep the same footprint while the row controls spacing.

**Key rules**
- `state`: The state is empty by default: the cell shows the add icon.
- `state` = `empty`: Empty can call onPress or an injected picker.
- `picker`: For the add trigger, use picker with onAssetsPicked, or wire a platform-specific onPress.
- `picker`: With picker set, onPress is ignored in the empty state: pressing the cell opens the picker, and the picked assets reach onAssetsPicked.
- `imageSource`: Preview needs an image source: set state to preview with imageSource to show what was chosen.
- `onPress`: In preview, onPress is called when the cell is pressed, for example to open a larger view of the image.
- `onRemove`: onRemove is optional: setting it shows the remove control, which calls it with no event argument.
- `onRemove`: Omit onRemove when the selected attachment cannot be cleared here.

**Example:** Add Item inside a Form Upload, the guide's In context: the field “Identity documents” with its support text, one of two attachments added, shown as a preview cell, and the add cell for the second. Form Upload builds the Add Item cells itself from attachments. The uri is a placeholder for the app's file; the onAttachmentsChange stub and the picker stub stand for the app's own list of files and its picker.

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

**Props:** `state` (empty | preview), `imageSource`, `onPress`, `onRemove`, `picker`, `onAssetsPicked`, `modes`, `accessibilityLabel`, `isDisabled`, `testID`. (* required)

**Modes it reads:** AppearanceBrand, AppearanceSystem, Color Mode, Context, Emphasis, Icon Capsule Size, Page type, Semantic Intent.

Full entry: `components/additem.md`. Links: `components/additem.links.md`.
