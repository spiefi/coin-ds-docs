import { useState, type ReactNode } from 'react'
import { Button, Card, FormField, Text, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, FitWidth, OnOff, Readout, Segment, Sources, Surface, byTestId, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const LIGHT = { 'Color Mode': 'Light' } as Modes
const ACTION = { 'Color Mode': 'Light', AppearanceBrand: 'Secondary', Emphasis: 'Low', 'Button / Size': 'S' } as Modes
const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1922-5647'
const R = byTestId('ff-anatomy')
const F = `${byTestId('ff-size')} > div:nth-child(2)`
const L = `${byTestId('ff-size')} > div:first-child`

type FieldProps = React.ComponentProps<typeof FormField>

function Host({ narrow = false, children }: { narrow?: boolean; children: ReactNode }) {
  return <Surface width={narrow ? 'narrow' : 'wide'}><VStack modes={LIGHT} style={{ width: '100%' }}>{children}</VStack></Surface>
}

function Input({ value: initial = '', ...props }: FieldProps) {
  const [value, setValue] = useState(initial)
  return <FormField modes={LIGHT} {...props} value={value} onChangeText={setValue} />
}

function Field({ narrow, ...props }: FieldProps & { narrow?: boolean }) {
  return <Host narrow={narrow}><Input {...props} /></Host>
}

// On the web the input never shrinks below about 186 px, so a field with an end
// action is shown at a phone field width (328 px) and scaled down when narrower.
function PhoneWidth({ children }: { children: ReactNode }) {
  return <FitWidth><VStack modes={LIGHT} style={{ width: 328 }}>{children}</VStack></FitWidth>
}

function BankAccount() {
  const [name, setName] = useState('')
  const [account, setAccount] = useState('')
  const [ifsc, setIfsc] = useState('')
  const [accountError, setAccountError] = useState(false)
  const [ifscError, setIfscError] = useState(false)
  const [ok, setOk] = useState(false)
  const verify = () => {
    const a = !/^\d{9,18}$/.test(account)
    const i = ifsc.length !== 11
    setAccountError(a); setIfscError(i); setOk(!a && !i)
  }
  return <Card modes={LIGHT}><VStack modes={LIGHT}>
    <FormField modes={LIGHT} label="Account holder name" placeholder="As on your passbook" value={name} onChangeText={t => { setName(t); setOk(false) }} />
    <FormField modes={LIGHT} label="Account number" type="number" placeholder="9 to 18 digits" value={account}
      onChangeText={t => { setAccount(t); setAccountError(false); setOk(false) }}
      isInvalid={accountError} errorMessage={accountError ? 'Account numbers have 9 to 18 digits' : undefined} />
    <FormField modes={LIGHT} label="IFSC code" placeholder="SBIN0001234" supportText="11 characters, on your cheque book" value={ifsc}
      onChangeText={t => { setIfsc(t); setIfscError(false); setOk(false) }}
      isInvalid={ifscError} errorMessage={ifscError ? 'IFSC codes have 11 characters' : undefined} />
    <Button modes={LIGHT} label="Verify account" onPress={verify} />
    {ok && <Text modes={LIGHT}>Details look right</Text>}
  </VStack></Card>
}

function FormFieldGuide() {
  const [value, setValue] = useState('')
  const [label, setLabel] = useState('Account number')
  const [support, setSupport] = useState('As printed on your passbook')
  const [state, setState] = useState<'Default' | 'Error' | 'Read only' | 'Disabled'>('Default')
  const [required, setRequired] = useState(false)
  const [action, setAction] = useState(false)

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A label, the field, and a hint',
      description: 'The label names the value. The field holds the text with an optional icon, and support text or an error sits below.',
      body: <Anatomy surface="white" specimenWidth={300} parts={[
        { name: 'Label', note: 'Names the value and gives the field its accessible name.', target: `${R} > div:first-child > div:first-child`, side: 'top' },
        { name: 'Required mark', note: 'A red asterisk for fields people must fill in.', target: `${R} > div:first-child > div:last-child`, side: 'right' },
        { name: 'Start icon', note: 'Optional 18 px icon, such as the rupee sign.', target: `${R} > div:nth-child(2) > div:first-child`, side: 'left' },
        { name: 'Input', note: 'The placeholder shows the format; then what people type.', target: `${R} input`, side: 'top' },
        { name: 'Field', note: 'White box; purple border on focus, red on error.', target: `${R} > div:nth-child(2)`, side: 'left' },
        { name: 'Support text', note: 'A hint below the field; an error message replaces it.', target: `${R} > div:nth-child(3)`, side: 'bottom' },
      ]}>
        <FormField modes={LIGHT} testID="ff-anatomy" label="Amount" isRequired startIcon type="number" placeholder="0" supportText="Up to ₹50,000 a day" />
      </Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Add only what helps people fill it in',
      description: 'Every option is off unless you set it. Add an icon, an action, or the required mark when it tells people something they need.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Label and hint" description="The default: a label, a format example, and a hint below."><Field label="Account number" placeholder="XXXX XXXX XXXX" supportText="As printed on your passbook" /></ExampleCard>
        <ExampleCard title="Start icon" description="The rupee icon marks an amount before people type."><Field label="Amount" startIcon type="number" placeholder="0" /></ExampleCard>
        <ExampleCard title="End action" description="A small text button acts on the value without leaving the field."><Host><PhoneWidth><Input label="Promo code" placeholder="JIO200" trailing={<Button modes={ACTION} label="Apply" />} /></PhoneWidth></Host></ExampleCard>
        <ExampleCard title="Required" description="A red asterisk marks a field people must fill in."><Field label="Full name" isRequired placeholder="As on your PAN" /></ExampleCard>
        <ExampleCard title="Password" description="The type hides the characters. It also picks the keyboard for email, phone, and number fields."><Field label="Password" type="password" value="jio2026" /></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Default, focused, error, read only, and disabled',
      description: 'The field changes colour with its state. Focus draws a purple border; an error turns it red and shows the message; read only and disabled lock the value.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Default" description="A grey border. Select the field to see the purple focus border."><Field label="Account number" placeholder="XXXX XXXX XXXX" supportText="As printed on your passbook" /></ExampleCard>
        <ExampleCard title="Error" description="Red border and fill; the message replaces the hint."><Field label="IFSC code" value="SBIN000123" supportText="On your cheque book" isInvalid errorMessage="IFSC codes have 11 characters" /></ExampleCard>
        <ExampleCard title="Read only" description="Grey and full contrast: people can read the value but not change it."><Field label="Account holder" value="Asha Rao" supportText="From your bank" isReadOnly /></ExampleCard>
        <ExampleCard title="Disabled" description="The read-only look at half opacity, for a field that does not apply yet."><Field label="Account holder" value="Asha Rao" isDisabled /></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'Full width, 47 px field',
      description: 'Form Field fills its container’s width. The field is 47 px tall with 12 px of padding at each end, and the label and support text sit 8 px above and below it. The screen sets the width.',
      body: <div className="coin-new-stack">
        <Anatomy legend={false} surface="white" specimenWidth={300} marks={[
          { kind: 'size', target: F, side: 'bottom', label: 'both' },
          { kind: 'padding', target: F },
          { kind: 'gap', from: L, to: F },
        ]}>
          <FormField modes={LIGHT} testID="ff-size" label="Account number" placeholder="XXXX XXXX XXXX" />
        </Anatomy>
        <ExampleCard title="In a narrow column" description="The field narrows with its column, and the hint wraps."><Field narrow label="PIN code" placeholder="6 digits" supportText="We deliver to most PIN codes in India" /></ExampleCard>
      </div>,
    },
    content: {
      header: 'Content', title: 'Name the value, show the format',
      description: 'Write the label as the name of the value in sentence case, such as “Account number”, not “Enter your account number”. Use the placeholder for a format example, support text for a rule, and an error that says how to fix the value.',
      body: <ExampleCard title="Labels, formats, and fixes"><Host><div className="coin-new-stack">
        <Input label="IFSC code" placeholder="SBIN0001234" supportText="11 characters, on your cheque book" />
        <Input label="Mobile number" type="phone" placeholder="98765 43210" supportText="We’ll send a code to this number" />
        <Input label="PAN" value="ABCDE12" isInvalid errorMessage="Enter all 10 characters of your PAN" />
      </div></Host></ExampleCard>,
    },
    context: {
      header: 'In context', title: 'Add a bank account',
      description: 'The screen checks the values when people tap Verify and sets the error on the field. Form Field only shows it, and the button stays enabled.',
      body: <div className="coin-new-context"><BankAccount /></div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Keep every field understandable',
      description: 'Each pair shows a field people can complete versus one that leaves them guessing.',
      body: <div className="coin-new-stack">
        <DoDont goodTitle="Label every field" goodCaption="The label stays visible while people type." good={<Field label="Account number" placeholder="XXXX XXXX XXXX" />}
          badTitle="Use the placeholder as the label" badCaption="The name disappears as soon as people type." bad={<Field placeholder="Account number" />} />
        <DoDont goodTitle="Say how to fix it" goodCaption="The message names the fix." good={<Field label="IFSC code" value="SBIN000123" isInvalid errorMessage="IFSC codes have 11 characters" />}
          badTitle="Show red without a message" badCaption="Colour alone does not say what is wrong." bad={<Field label="IFSC code" value="SBIN000123" isInvalid />} />
        <DoDont goodTitle="Show fixed values as read only" goodCaption="Full contrast keeps the value easy to read." good={<Field label="Account holder" value="Asha Rao" isReadOnly />}
          badTitle="Disable a value people need to read" badCaption="Half opacity makes it hard to read." bad={<Field label="Account holder" value="Asha Rao" isDisabled />} />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Form Field contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="2 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('formfield')} stories={[
        { label: 'Default', id: 'components-formfield--default' },
        { label: 'With trailing button', id: 'components-formfield--with-trailing-button' },
        { label: 'With start icon', id: 'components-formfield--with-start-icon' },
        { label: 'Password', id: 'components-formfield--password-type' },
        { label: 'Invalid', id: 'components-formfield--invalid' },
        { label: 'All states', id: 'components-formfield--all-states' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> from the team’s private package repository. Figma’s FormField is a 328 × 94 component with label, start icon, end slot, and support text options; its states are variable modes. The package field is 47 px tall (45 px in Figma). Disabled uses the read-only colours at half opacity instead of Figma’s Disabled colours, and the required asterisk is a fixed red. Dark mode is not supported. On the web the label names the input, but the error, the required mark, and the support text are not announced, and a disabled field can still be reached with the keyboard. The web input also never shrinks below about 186 px, so a field with an end action needs about 300 px; those examples are shown at a 328 px phone width.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'formfield',
    corePrinciple: 'A clear label, a format example, and help when it goes wrong.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('formfield'),
  }} playground={<>
    <div className="preview-stage">
      <Host><PhoneWidth><FormField modes={LIGHT} value={value} onChangeText={setValue} label={label} placeholder="XXXX XXXX XXXX" supportText={support}
        isRequired={required} isInvalid={state === 'Error'} errorMessage={state === 'Error' ? 'Account numbers have 9 to 18 digits' : undefined}
        isReadOnly={state === 'Read only'} isDisabled={state === 'Disabled'} trailing={action ? <Button modes={ACTION} label="Verify" /> : undefined} /></PhoneWidth></Host>
      <span className="stage-label">Live Coin Form Field</span>
    </div>
    <div className="controls-panel">
      <label className="text-control"><span>Label</span><input value={label} maxLength={32} onChange={e => setLabel(e.target.value)} /></label>
      <label className="text-control"><span>Support text</span><input value={support} maxLength={60} onChange={e => setSupport(e.target.value)} /></label>
      <Segment label="State" value={state} options={['Default', 'Error', 'Read only', 'Disabled'] as const} onChange={setState} />
      <OnOff label="Required" value={required} onChange={setRequired} />
      <OnOff label="End action" value={action} onChange={setAction} />
      <Readout title="Value" value={value || 'Empty'} />
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'formfield',
  label: 'Form Field',
  summary: 'Use a Form Field to collect one labelled value, such as an account number, with a hint or an error message below it.',
  keywords: ['input', 'text field', 'form input', 'label', 'error message'],
  icon: <><path d="M2 3.5h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><rect x="1.5" y="7" width="15" height="7.5" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" /></>,
  Component: FormFieldGuide,
})
