import { useState, type ReactNode } from 'react'
import { Button, Card, FormUpload, Text, VStack, type FormUploadAttachment, type Modes } from 'jfs-components'
import receipt from '../assets/attachment-sample.svg'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, Segment, Sources, Surface, byTestId, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const LIGHT = { 'Color Mode': 'Light' } as Modes
const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=7217-11616'
const R = byTestId('fu-anatomy')
const HINT = 'JPG or PNG, up to 5 MB each'

const files = (n: number): FormUploadAttachment[] => Array.from({ length: n }, (_, i) => ({ uri: receipt, name: `Receipt ${i + 1}` }))
const pickerFor = (count: number) => async () => ({ assets: [{ uri: receipt, name: `Receipt ${count + 1}` }] })

type UploadProps = React.ComponentProps<typeof FormUpload>

function Host({ narrow = false, children }: { narrow?: boolean; children: ReactNode }) {
  return <Surface width={narrow ? 'narrow' : 'wide'}><VStack modes={LIGHT} style={{ width: '100%' }}>{children}</VStack></Surface>
}

function Upload({ count = 0, ...props }: Omit<UploadProps, 'attachments' | 'onAttachmentsChange' | 'picker'> & { count?: number }) {
  const [list, setList] = useState(() => files(count))
  return <FormUpload modes={LIGHT} {...props} attachments={list} onAttachmentsChange={setList} picker={pickerFor(list.length)} />
}

function Field({ narrow, ...props }: React.ComponentProps<typeof Upload> & { narrow?: boolean }) {
  return <Host narrow={narrow}><Upload {...props} /></Host>
}

function Claim() {
  const [list, setList] = useState<FormUploadAttachment[]>([])
  const [error, setError] = useState(false)
  const [sent, setSent] = useState(0)
  const change = (next: FormUploadAttachment[]) => { setList(next); if (next.length) setError(false); setSent(0) }
  const submit = () => { if (!list.length) setError(true); else setSent(list.length) }
  return <Card modes={LIGHT}><VStack modes={LIGHT}>
    <FormUpload modes={LIGHT} label="Receipts" maxCount={3} supportText="Up to 3 photos, JPG or PNG" attachments={list} onAttachmentsChange={change} picker={pickerFor(list.length)}
      isInvalid={error} errorMessage={error ? 'Add at least one receipt' : undefined} />
    <Button modes={LIGHT} label="Submit claim" onPress={submit} />
    {sent > 0 && <Text modes={LIGHT}>{`Claim submitted with ${sent} ${sent === 1 ? 'receipt' : 'receipts'}`}</Text>}
  </VStack></Card>
}

function FormUploadGuide() {
  const [list, setList] = useState(() => files(1))
  const [limit, setLimit] = useState<'3' | '6'>('3')
  const [state, setState] = useState<'Default' | 'Error' | 'Disabled'>('Default')
  const [support, setSupport] = useState(true)
  const count = String(list.length) as '0' | '1' | '2' | '3'

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A label, a row of files, and a hint',
      description: 'The label names what to add. Each file shows as a preview with a remove button, an add cell follows, and support text sits below.',
      body: <Anatomy surface="white" specimenWidth={300} parts={[
        { name: 'Label', note: 'Names what to add; plain text above the row.', target: `${R} > div:first-child`, side: 'left' },
        { name: 'Preview', note: 'A 44 px thumbnail of each added image.', target: byTestId('fu-anatomy-item-0'), side: 'left' },
        { name: 'Remove', note: 'Takes the file out of the row.', target: `${byTestId('fu-anatomy-item-1')} button`, side: 'top' },
        { name: 'Add cell', note: 'Opens the app’s picker; hidden once the limit is reached.', target: byTestId('fu-anatomy-add'), side: 'right' },
        { name: 'Support text', note: 'File rules; an error message replaces it.', target: `${R} > div:nth-child(3)`, side: 'bottom' },
      ]}>
        <FormUpload modes={LIGHT} testID="fu-anatomy" label="Receipts" attachments={files(2)} onAttachmentsChange={() => {}} maxCount={3} supportText={HINT} />
      </Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Set how many files fit',
      description: 'Each added file becomes a preview, and the add cell stays at the end until the limit is reached. Without a limit, the add cell never goes away.',
      body: <div className="coin-new-example-grid three">
        <ExampleCard title="Empty" description="One add cell until people pick a file. Tap it to add a sample."><Field label="Receipts" maxCount={3} supportText={HINT} /></ExampleCard>
        <ExampleCard title="With files" description="Previews line up, and the add cell follows them."><Field label="Receipts" maxCount={6} count={2} /></ExampleCard>
        <ExampleCard title="At the limit" description="Reaching the limit hides the add cell."><Field label="PAN card, front and back" maxCount={2} count={2} /></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Default, error, and disabled',
      description: 'An error shows its message in place of the support text; the cells do not change colour. Disabled fades the whole field and stops adding and removing.',
      body: <div className="coin-new-example-grid three">
        <ExampleCard title="Default" description="Ready to add more files."><Field label="Receipts" maxCount={3} supportText={HINT} count={1} /></ExampleCard>
        <ExampleCard title="Error" description="The message turns red and replaces the hint."><Field label="Receipts" maxCount={3} supportText={HINT} isInvalid errorMessage="Add at least one receipt" /></ExampleCard>
        <ExampleCard title="Disabled" description="Faded, with adding and removing turned off."><Field label="Receipts" maxCount={3} isDisabled count={1} /></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: '44 px cells that wrap',
      description: 'Each cell is 44 × 44 px with 8 px between cells. The row fills its container and wraps to a new line when it runs out of room.',
      body: <div className="coin-new-stack">
        <Anatomy legend={false} surface="white" specimenWidth={300} marks={[
          { kind: 'size', target: byTestId('fu-size-item-0'), side: 'left', label: 'both' },
          { kind: 'gap', from: byTestId('fu-size-item-0'), to: byTestId('fu-size-item-1') },
        ]}>
          <FormUpload modes={LIGHT} testID="fu-size" label="Receipts" attachments={files(2)} onAttachmentsChange={() => {}} maxCount={3} />
        </Anatomy>
        <ExampleCard title="In a narrow column" description="The row wraps; without a limit, the add cell stays."><Field narrow label="Receipts" count={5} /></ExampleCard>
      </div>,
    },
    content: {
      header: 'Content', title: 'Name the document, state the rules',
      description: 'Name what to add in the label, such as “Receipts” or “PAN card”, without “Upload” or “Your”. Use the support text for file types and size, and an error that says how to fix it.',
      body: <ExampleCard title="Labels and rules"><Host><div className="coin-new-stack">
        <Upload label="Receipts" maxCount={6} supportText="Up to 6 photos, JPG or PNG" />
        <Upload label="PAN card" maxCount={2} supportText="Front and back, JPG or PNG" />
      </div></Host></ExampleCard>,
    },
    context: {
      header: 'In context', title: 'Claim an expense',
      description: 'The app opens its own picker and keeps the list of files. When people tap Submit without a receipt, the screen sets the error; the button stays enabled.',
      body: <div className="coin-new-context"><Claim /></div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Make the rules and errors visible',
      description: 'Each pair shows a field people can complete versus one that leaves them guessing.',
      body: <div className="coin-new-stack">
        <DoDont goodTitle="Set a limit" goodCaption="The add cell disappears when the row is full." good={<Field label="PAN card" maxCount={2} count={2} />}
          badTitle="Leave the limit open" badCaption="The add cell never goes away, so people can’t tell when they’re done." bad={<Field label="PAN card" count={2} />} />
        <DoDont goodTitle="Say what to fix" goodCaption="The message names what is missing." good={<Field label="Receipts" isInvalid errorMessage="Add at least one receipt" />}
          badTitle="Mark an error without a message" badCaption="Nothing on screen changes." bad={<Field label="Receipts" isInvalid />} />
        <DoDont goodTitle="Name the document" goodCaption="A short label says what belongs here." good={<Field label="Receipts" supportText={HINT} />}
          badTitle="Put instructions in the label" badCaption="The rules crowd out the name." bad={<Field label="Upload your receipts here in JPG or PNG format, up to 5 MB each" />} />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Form Upload contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="2 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('formupload')} stories={[
        { label: 'Default', id: 'components-formupload--default' },
        { label: 'With previews', id: 'components-formupload--with-previews' },
        { label: 'Invalid', id: 'components-formupload--invalid' },
        { label: 'Disabled', id: 'components-formupload--disabled' },
        { label: 'Inside form', id: 'components-formupload--inside-form' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> from the team’s private package repository. Figma’s FormUpload is a 328 × 93 component with label and support text options and a slot of Add Item cells in one clipped row; the package wraps the row and always puts the add cell last. The app supplies the picker and keeps the list of files. Previews show images only, and file type and size are not checked. Figma has no error or disabled design: an error only changes the support text, and disabled fades the cells twice. On the web the remove button responds to touch only, not to a mouse click or the keyboard, and has no accessible name.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'formupload',
    corePrinciple: 'Show what was added and how much more fits.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('formupload'),
  }} playground={<>
    <div className="preview-stage">
      <Host><FormUpload modes={LIGHT} label="Receipts" attachments={list} onAttachmentsChange={setList} picker={pickerFor(list.length)} maxCount={Number(limit)}
        supportText={support ? HINT : undefined} isInvalid={state === 'Error'} errorMessage={state === 'Error' ? 'Add at least one receipt' : undefined}
        isDisabled={state === 'Disabled'} /></Host>
      <span className="stage-label">Live Coin Form Upload</span>
    </div>
    <div className="controls-panel">
      <Segment label="Files" value={count} options={['0', '1', '2', '3'] as const} onChange={v => setList(files(Number(v)))} />
      <Segment label="Limit" value={limit} options={['3', '6'] as const} onChange={setLimit} />
      <Segment label="State" value={state} options={['Default', 'Error', 'Disabled'] as const} onChange={setState} />
      <OnOff label="Support text" value={support} onChange={setSupport} />
      <Readout title="Files" value={`${list.length} of ${limit}`}>The app supplies the picker; here it adds a sample receipt.</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'formupload',
  label: 'Form Upload',
  summary: 'Use a Form Upload to collect photos, such as receipts or ID proof, with a label, previews, and a hint about what to add.',
  keywords: ['upload', 'attachment', 'file upload', 'photo upload', 'image picker', 'receipt'],
  icon: <><rect x="1.5" y="3.5" width="9" height="9" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M14 6v6M11 9h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>,
  Component: FormUploadGuide,
})
