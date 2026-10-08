import { useState, type ReactNode } from 'react'
import { Button, Card, Form, FormField, FormUpload, MessageField, TextInput, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, Readout, Segment, Sources, Surface, byTestId, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const LIGHT = { 'Color Mode': 'Light' } as Modes
const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1949-7250'
const F = byTestId('form-anatomy')
const Z = byTestId('form-size')

type Errors = Record<string, string | string[]>
const NONE: Errors = {}
const ERR_IFSC: Errors = { ifsc: 'IFSC codes have 11 characters' }
const ERR_TWO: Errors = { account: 'Account numbers have 9 to 18 digits', ifsc: 'IFSC codes have 11 characters' }
const ERR_PAN: Errors = { pan: ['Enter all 10 characters of your PAN', 'Use capital letters only'] }
const ERR_OTHER: Errors = { doc: 'Upload a PDF or JPG under 5 MB', note: 'Add a few more details, at least 20 characters' }
const ERR_EMAIL: Errors = { email: 'Enter an email address like name@example.com' }

type FieldProps = React.ComponentProps<typeof FormField>

function Host({ children }: { children: ReactNode }) {
  return <Surface width="wide"><VStack modes={LIGHT} style={{ width: '100%', padding: 0 }}>{children}</VStack></Surface>
}

function Input({ value: initial = '', ...props }: FieldProps) {
  const [value, setValue] = useState(initial)
  return <FormField modes={LIGHT} {...props} value={value} onChangeText={setValue} />
}

const Holder = ({ value = 'Asha Rao' }: { value?: string }) => <Input name="holder" label="Account holder name" value={value} />
const Account = ({ value = '12345' }: { value?: string }) => <Input name="account" type="number" label="Account number" value={value} />
const Ifsc = ({ value = 'SBIN000123' }: { value?: string }) => <Input name="ifsc" label="IFSC code" value={value} />

function Note() {
  const [value, setValue] = useState('Charged twice')
  return <MessageField modes={LIGHT} name="note" label="Describe your issue" value={value} onChangeText={setValue} />
}

const ERROR_OPTIONS = { None: NONE, 'One field': ERR_IFSC, 'Two fields': ERR_TWO } as const
const ERROR_READOUT = { None: 'None', 'One field': 'IFSC code', 'Two fields': 'Account number, IFSC code' } as const
type ErrorOption = keyof typeof ERROR_OPTIONS

function BankDetails() {
  const [errors, setErrors] = useState<Errors>(NONE)
  const [checked, setChecked] = useState(false)
  const [holder, setHolder] = useState('Asha Rao')
  const [account, setAccount] = useState('')
  const [ifsc, setIfsc] = useState('')
  const verify = () => {
    const next: Errors = {}
    if (!holder.trim()) next.holder = 'Enter the name on the account'
    if (!/^\d{9,18}$/.test(account)) next.account = 'Account numbers have 9 to 18 digits'
    if (ifsc.length !== 11) next.ifsc = 'IFSC codes have 11 characters'
    setErrors(next)
    setChecked(true)
  }
  const count = Object.keys(errors).length
  const status = !checked ? 'Press Verify to check the details'
    : count === 0 ? 'Details look right' : `${count} ${count === 1 ? 'field needs' : 'fields need'} a fix`
  return <div className="coin-new-context">
    <Card modes={LIGHT}><VStack modes={LIGHT}>
      <Form modes={LIGHT} validationErrors={errors}>
        <FormField modes={LIGHT} name="holder" label="Account holder name" value={holder} onChangeText={setHolder} />
        <FormField modes={LIGHT} name="account" type="number" label="Account number" value={account} onChangeText={setAccount} />
        <FormField modes={LIGHT} name="ifsc" label="IFSC code" value={ifsc} onChangeText={setIfsc} />
      </Form>
      <Button modes={LIGHT} label="Verify account" onPress={verify} />
    </VStack></Card>
    <p className="coin-new-readout" role="status">{status}</p>
  </div>
}

function FormGuide() {
  const [option, setOption] = useState<ErrorOption>('None')

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A column of named fields',
      description: 'Form stacks its fields 12 px apart and hands each named field its error. It draws nothing of its own: no background, border, or title.',
      body: <Anatomy surface="white" specimenWidth={328} parts={[
        { name: 'Form', note: 'An invisible column: 12 px between fields, no padding.', target: F, side: 'left', at: 0.43 },
        { name: 'Named field', note: 'A Form Field with a name gets the error for that name.', target: `${F} > div:nth-child(2)`, side: 'right' },
        { name: 'Error message', note: 'Shown by the field while the Form has an error for it.', target: `${F} > div:nth-child(2) > div:nth-child(3)`, side: 'bottom' },
      ]} marks={[{ kind: 'gap', from: `${F} > div:first-child`, to: `${F} > div:nth-child(2)` }]}>
        <Form modes={LIGHT} testID="form-anatomy" validationErrors={ERR_IFSC}><Holder /><Ifsc /></Form>
      </Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Errors by field name',
      description: 'Give each field a name, and pass the errors keyed by those names. Form has no other options that change what people see.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="No errors" description="The fields, 12 px apart, with nothing added."><Host><Form modes={LIGHT}><Holder /><Account /></Form></Host></ExampleCard>
        <ExampleCard title="An error for one field" description="Only the field whose name matches shows the message."><Host><Form modes={LIGHT} validationErrors={ERR_IFSC}><Holder /><Ifsc /></Form></Host></ExampleCard>
        <ExampleCard title="Two messages for one field" description="Given a list, the field shows only the first message."><Host><Form modes={LIGHT} validationErrors={ERR_PAN}><Input name="pan" label="PAN" value="ABCDE12" /></Form></Host></ExampleCard>
        <ExampleCard title="Other fields too" description="Form Upload and Message Field show their errors the same way."><Host><Form modes={LIGHT} validationErrors={ERR_OTHER}><FormUpload modes={LIGHT} name="doc" label="PAN card" /><Note /></Form></Host></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Showing, then clearing an error',
      description: 'A field shows its error until people change its value, then the message clears. When the screen sends a new set of errors, they all show again.',
      body: <ExampleCard title="Edit to clear" description="Type in either field: its message clears and the other stays."><Host><Form modes={LIGHT} validationErrors={ERR_TWO}><Account /><Ifsc /></Form></Host></ExampleCard>,
    },
    sizing: {
      header: 'Sizing', title: 'Full width, 12 px between fields',
      description: 'Form fills its container and adds 12 px between its fields, with no padding. Each Form Field keeps its own height: 72 px with a label, 96 px with a message.',
      body: <Anatomy legend={false} surface="white" specimenWidth={328} marks={[
        { kind: 'size', target: Z, side: 'bottom', label: 'both' },
        { kind: 'gap', from: `${Z} > div:first-child`, to: `${Z} > div:nth-child(2)` },
      ]}>
        <Form modes={LIGHT} testID="form-size">
          <FormField modes={LIGHT} name="holder" label="Account holder name" />
          <FormField modes={LIGHT} name="account" label="Account number" />
          <FormField modes={LIGHT} name="ifsc" label="IFSC code" />
        </Form>
      </Anatomy>,
    },
    content: {
      header: 'Content', title: 'One sentence that names the fix',
      description: 'Key each message to the field it’s about, and write it as one sentence that says how to fix the value. Show problems with the whole form, such as a failed payment, outside it.',
      body: <ExampleCard title="Say how to fix it"><Host><Form modes={LIGHT} validationErrors={ERR_TWO}><Account /><Ifsc /></Form></Host></ExampleCard>,
    },
    context: {
      header: 'In context', title: 'Checking bank details',
      description: 'When people tap Verify, the screen checks the details and passes the errors to the Form. Editing a field clears its message. The button sits outside the Form and stays enabled.',
      body: <BankDetails />,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Make every error reach its field',
      description: 'Each pair shows a form that tells people what to fix versus one where the problem never appears.',
      body: <div className="coin-new-stack">
        <DoDont goodTitle="Name every field" goodCaption="The message appears under the field it’s about."
          good={<Host><Form modes={LIGHT} validationErrors={ERR_EMAIL}><Input name="email" label="Email" value="asha@" /></Form></Host>}
          badTitle="Leave a field unnamed" badCaption="The Form has an error for it, but the field never shows it."
          bad={<Host><Form modes={LIGHT} validationErrors={ERR_EMAIL}><Input label="Email" value="asha@" /></Form></Host>} />
        <DoDont goodTitle="Use Form Field for each value" goodCaption="Form Field shows the message under the field."
          good={<Host><Form modes={LIGHT} validationErrors={ERR_EMAIL}><Input name="email" label="Email" value="asha@" /></Form></Host>}
          badTitle="Put a Text Input in a Form" badCaption="Text Input ignores the Form, so the error never appears."
          bad={<Host><Form modes={LIGHT} validationErrors={ERR_EMAIL}><TextInput modes={LIGHT} placeholder="Email" /></Form></Host>} />
        <DoDont goodTitle="Keep the button enabled" goodCaption="People tap it and see which field to fix."
          good={<Host><Form modes={LIGHT} validationErrors={ERR_TWO}><Account /><Ifsc /></Form><Button modes={LIGHT} label="Verify account" /></Host>}
          badTitle="Disable the button instead" badCaption="A greyed-out button doesn’t say what’s missing."
          bad={<Host><Form modes={LIGHT}><Account /><Ifsc /></Form><Button modes={LIGHT} label="Verify account" disabled /></Host>} />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Form contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="8 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('form')} stories={[
        { label: 'Default', id: 'components-form--default' },
        { label: 'With validation errors', id: 'components-form--with-validation-errors' },
        { label: 'Server validation', id: 'components-form--server-validation' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (5 October build) from the team’s private package repository. Figma’s Form is one 328 × 306 component: a slot of three Form Fields, 12 px apart, and the package matches it. In the package Form only spaces the fields and passes errors by name to Form Field, Form Upload, and Message Field; it does not submit or check anything, and its <code>onSubmit</code> property does nothing. On the web the form has no accessible name, and nothing announces errors when they arrive. Form Field and Message Field mark themselves invalid and link their message, so a screen reader reads it with the field. The published Storybook predates the current stories.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'form',
    corePrinciple: 'Group the fields; let each one show its own problem.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('form'),
  }} playground={<>
    <div className="preview-stage">
      <Host><Form modes={LIGHT} validationErrors={ERROR_OPTIONS[option]}><Holder /><Account /><Ifsc /></Form></Host>
      <span className="stage-label">Live Coin Form</span>
    </div>
    <div className="controls-panel">
      <Segment label="Errors" value={option} options={['None', 'One field', 'Two fields'] as const} onChange={setOption} />
      <Readout title="Errors sent" value={ERROR_READOUT[option]}>Edit a field that shows an error: its message clears until the screen sends errors again.</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'form',
  label: 'Form',
  summary: 'Use a Form to stack related fields and show the errors your screen sends for each one, such as a bank account’s details.',
  keywords: ['form layout', 'validation', 'field group', 'server errors'],
  icon: <><rect x="2" y="2.5" width="14" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><rect x="2" y="10.5" width="14" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5" /></>,
  Component: FormGuide,
})
