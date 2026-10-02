# Form Upload brief

slug: formupload · label: Form Upload · public API: FormUpload (+ Button, Card, VStack, Text for composition)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=7217-11616 · storybook: docsUrl('formupload') · stories: Default=components-formupload--default, With previews=components-formupload--with-previews, Invalid=components-formupload--invalid, Disabled=components-formupload--disabled, Inside form=components-formupload--inside-form
checked: 2 October 2026 · jfs-components 0.1.78 (mirror tag v0.1.78-3795b4c, up to date)
icon: a photo tile with a plus — `<rect x="1.5" y="3.5" width="9" height="9" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M14 6v6M11 9h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />`
keywords: upload, attachment, file upload, photo upload, image picker, receipt

Setup: `import receipt from '../assets/attachment-sample.svg'` (an illustrated receipt). `const LIGHT = { 'Color Mode': 'Light' } as Modes`. A file is `{ uri: receipt, name: 'Receipt N' }`; `files(n)` returns Receipt 1…n. Every FormUpload gets `modes={LIGHT}`, its own `attachments` state with `onAttachmentsChange`, and a picker `async () => ({ assets: [{ uri: receipt, name: \`Receipt ${count + 1}\` }] })` unless stated. The grey cells vanish on the grey stages, so every example uses a host built from the kit’s `<Surface width="wide">` (or `"narrow"` where stated) wrapping `<VStack modes={LIGHT} style={{ width: '100%' }}>`, and the Anatomy and Sizing diagrams use `surface="white"`. `testID` lands on the FormUpload root (children: label, cell row, support text); previews get `testID-item-N` and the add cell `testID-add`.

## Overview
summary: Use a Form Upload to collect photos, such as receipts or ID proof, with a label, previews, and a hint about what to add.
principle: Show what was added and how much more fits.
playground: `.preview-stage` holding a host with `<FormUpload label="Receipts" attachments={list} onAttachmentsChange={setList} picker={picker} maxCount={Number(limit)} supportText={support ? 'JPG or PNG, up to 5 MB each' : undefined} isInvalid={state === 'Error'} errorMessage={state === 'Error' ? 'Add at least one receipt' : undefined} isDisabled={state === 'Disabled'} />`. Controls: Segment "Files" 0 | 1 | 2 | 3 (sets the list to that many receipts; default 1); Segment "Limit" 3 | 6 (default 3); Segment "State" Default | Error | Disabled; OnOff "Support text" (on). Readout title "Files", value `${list.length} of ${limit}`, note "The app supplies the picker; here it adds a sample receipt." Stage label: "Live Coin Form Upload".

## Anatomy
header: Anatomy · title: A label, a row of files, and a hint · description: The label names what to add. Each file shows as a preview with a remove button, an add cell follows, and support text sits below.
specimen: `<Anatomy surface="white" specimenWidth={300} …><FormUpload modes={LIGHT} testID="fu-anatomy" label="Receipts" attachments={files(2)} onAttachmentsChange={() => {}} maxCount={3} supportText="JPG or PNG, up to 5 MB each" /></Anatomy>` (let `R = byTestId('fu-anatomy')`)
parts:
1. Label — Names what to add; plain text above the row. — target: `${R} > div:first-child` — side: left
2. Preview — A 44 px thumbnail of each added image. — target: `${byTestId('fu-anatomy-item-0')}` — side: left
3. Remove — Takes the file out of the row. — target: `${byTestId('fu-anatomy-item-1')} button` — side: top
4. Add cell — Opens the app’s picker; hidden once the limit is reached. — target: `${byTestId('fu-anatomy-add')}` — side: right
5. Support text — File rules; an error message replaces it. — target: `${R} > div:nth-child(3)` — side: bottom

## Configuration
header: Configuration · title: Set how many files fit · description: Each added file becomes a preview, and the add cell stays at the end until the limit is reached. Without a limit, the add cell never goes away.
Grid `coin-new-example-grid three` (each in a host):
- Empty — `label="Receipts" maxCount={3} supportText="JPG or PNG, up to 5 MB each"`, no files — lesson: One add cell until people pick a file. Tap it to add a sample.
- With files — `label="Receipts" maxCount={6}`, `files(2)` — lesson: Previews line up, and the add cell follows them.
- At the limit — `label="PAN card, front and back" maxCount={2}`, `files(2)` — lesson: Reaching the limit hides the add cell.

## States
header: States · title: Default, error, and disabled · description: An error shows its message in place of the support text; the cells do not change colour. Disabled fades the whole field and stops adding and removing.
Grid `coin-new-example-grid three` (each in a host):
- Default — `label="Receipts" maxCount={3} supportText="JPG or PNG, up to 5 MB each"`, `files(1)` — lesson: Ready to add more files.
- Error — `label="Receipts" maxCount={3} supportText="JPG or PNG, up to 5 MB each" isInvalid errorMessage="Add at least one receipt"`, no files — lesson: The message turns red and replaces the hint.
- Disabled — `label="Receipts" maxCount={3} isDisabled`, `files(1)` — lesson: Faded, with adding and removing turned off.

## Sizing
header: Sizing · title: 44 px cells that wrap · description: Each cell is 44 × 44 px with 8 px between cells. The row fills its container and wraps to a new line when it runs out of room.
Measured diagram: `<Anatomy legend={false} surface="white" specimenWidth={300} marks={[{ kind: 'size', target: byTestId('fu-size-item-0'), side: 'bottom', label: 'both' }, { kind: 'gap', from: byTestId('fu-size-item-0'), to: byTestId('fu-size-item-1') }]}><FormUpload modes={LIGHT} testID="fu-size" label="Receipts" attachments={files(2)} onAttachmentsChange={() => {}} maxCount={3} /></Anatomy>`. Expected labels 44 × 44 and 8 px.
Then ExampleCard "In a narrow column" — `narrow` host with `label="Receipts"`, `files(5)`, no `maxCount` — lesson: The row wraps; without a limit, the add cell stays.

## Content
header: Content · title: Name the document, state the rules · description: Name what to add in the label, such as “Receipts” or “PAN card”, without “Upload” or “Your”. Use the support text for file types and size, and an error that says how to fix it.
One ExampleCard "Labels and rules" with a `coin-new-stack` of two FormUploads in one host:
- `label="Receipts" maxCount={6} supportText="Up to 6 photos, JPG or PNG"`, no files
- `label="PAN card" maxCount={2} supportText="Front and back, JPG or PNG"`, no files

## In context
header: In context · title: Claim an expense · description: The app opens its own picker and keeps the list of files. When people tap Submit without a receipt, the screen sets the error; the button stays enabled.
Composition in `.coin-new-context`: `<Card modes={LIGHT}>` › `<VStack modes={LIGHT}>` › controlled FormUpload (`label="Receipts" maxCount={3} supportText="Up to 3 photos, JPG or PNG"`, starts empty) › `<Button modes={LIGHT} label="Submit claim" />`. On press with no files → `isInvalid errorMessage="Add at least one receipt"`; adding a file clears it. With files, show `<Text modes={LIGHT}>Claim submitted with N receipts</Text>` (N = count; “1 receipt” when one).

## Do & Don'ts
header: Do & Don’ts · title: Make the rules and errors visible · description: Each pair shows a field people can complete versus one that leaves them guessing.
Every preview is a host.
- Do Set a limit: The add cell disappears when the row is full. — `label="PAN card" maxCount={2}`, `files(2)` | Don't Leave the limit open: The add cell never goes away, so people can’t tell when they’re done. — `label="PAN card"`, `files(2)`, no `maxCount`
- Do Say what to fix: The message names what is missing. — `label="Receipts" isInvalid errorMessage="Add at least one receipt"` | Don't Mark an error without a message: Nothing on screen changes. — `label="Receipts" isInvalid`
- Do Name the document: A short label says what belongs here. — `label="Receipts" supportText="JPG or PNG, up to 5 MB each"` | Don't Put instructions in the label: The rules crowd out the name. — `label="Upload your receipts here in JPG or PNG format, up to 5 MB each"`

## Sources
header: Sources · title: Use the public Form Upload contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.78</code> from the team’s private package repository. Figma’s FormUpload is a 328 × 93 component with label and support text options and a slot of Add Item cells in one clipped row; the package wraps the row and always puts the add cell last. The app supplies the picker and keeps the list of files. Previews show images only, and file type and size are not checked. Figma has no error or disabled design: an error only changes the support text, and disabled fades the cells twice. On the web the remove button responds to touch only, not to a mouse click or the keyboard, and has no accessible name.

## Limits
Do not show Dark mode, `children` (custom cells), `rowStyle`/`style`, Form `validationErrors`, or non-image files. Do not imply that remove works with a mouse or keyboard on the web, that file types or sizes are checked, or that the cells turn red on error.
