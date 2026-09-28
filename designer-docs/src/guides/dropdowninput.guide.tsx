import { useState } from 'react'
import { Button, Card, DropdownInput, Text, type DropdownInputOption, type DropdownInputOptionValue, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, Readout, Segment, Sources, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3055-880'
const LIGHT = { 'Color Mode': 'Light' } as Modes
type Value = DropdownInputOptionValue | null
type State = 'Default' | 'Required' | 'Invalid' | 'Disabled' | 'Read-only'

const accounts: DropdownInputOption[] = [
  { value: 'savings', label: 'Savings account' },
  { value: 'checking', label: 'Checking account' },
  { value: 'brokerage', label: 'Brokerage account' },
  { value: 'recurring', label: 'Recurring deposit' },
]
const yesNo: DropdownInputOption[] = [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]
const labelOf = (value: Value) => accounts.find(option => option.value === value)?.label

type FieldProps = Omit<React.ComponentProps<typeof DropdownInput>, 'value' | 'onValueChange' | 'open' | 'defaultOpen'> & { initial?: Value }

/** A controlled Coin DropdownInput that owns its own value. */
function Field({ initial = null, items = accounts, ...props }: FieldProps) {
  const [value, setValue] = useState<Value>(initial)
  return <DropdownInput modes={LIGHT} items={items} value={value} onValueChange={next => setValue(next)} {...props} />
}

const Host = ({ children, narrow = false }: { children: React.ReactNode; narrow?: boolean }) =>
  <div className={`coin-new-host ${narrow ? 'narrow' : 'wide'}`}>{children}</div>

function TransferForm() {
  const [from, setFrom] = useState<Value>(null)
  const [to, setTo] = useState<Value>(null)
  const [fromError, setFromError] = useState(false)
  const [toError, setToError] = useState(false)
  return <div className="coin-new-context"><Card modes={LIGHT}><div className="coin-new-stack">
    <Text modes={LIGHT}>Transfer money</Text>
    <DropdownInput modes={LIGHT} label="From" placeholder="Select an account" items={accounts} value={from}
      onValueChange={next => { setFrom(next); setFromError(false) }} isInvalid={fromError} errorMessage="Choose an account to transfer from" />
    <DropdownInput modes={LIGHT} label="To" placeholder="Select an account" items={accounts} value={to}
      onValueChange={next => { setTo(next); setToError(false) }} isInvalid={toError} errorMessage="Choose an account to transfer to" />
    <Button modes={LIGHT} label="Continue" onPress={() => { setFromError(from == null); setToError(to == null) }} />
    {from != null && to != null && <p className="coin-new-readout" role="status">Ready to transfer from {labelOf(from)} to {labelOf(to)}</p>}
  </div></Card></div>
}

function DropdownInputGuide() {
  const [label, setLabel] = useState('Account')
  const [state, setState] = useState<State>('Default')
  const [value, setValue] = useState<Value>(null)
  const locked = state === 'Disabled' || state === 'Read-only'
  const shown: Value = locked ? 'savings' : value
  const stateProps = {
    Default: { supportText: 'Choose where to transfer funds' },
    Required: { isRequired: true, supportText: 'This field is required' },
    Invalid: { isInvalid: true, errorMessage: 'Choose an account to transfer from' },
    Disabled: { isDisabled: true },
    'Read-only': { isReadOnly: true, supportText: 'Locked for this session' },
  }[state]

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'Label, field, and support text',
      description: 'The field shows the current choice and a chevron. Pressing it opens a Dropdown of the options just below.',
      body: <Anatomy specimenWidth={300} parts={[
        { name: 'Label', note: 'Names the question the field answers.', target: 'div:has(+ [role="combobox"])', side: 'top' },
        { name: 'Field', note: 'Pressable surface that opens the list.', target: '[role="combobox"]', side: 'left' },
        { name: 'Placeholder', note: 'Tells people what to choose until they have chosen.', target: '[role="combobox"] [dir="auto"]', side: 'bottom' },
        { name: 'Chevron', note: 'Shows that the field opens a list.', target: '[role="combobox"] svg', side: 'right' },
        { name: 'Support text', note: 'Explains the choice, or the error when invalid.', target: '[role="combobox"] + div', side: 'right' },
      ]}>
        <DropdownInput modes={LIGHT} label="Account" placeholder="Select an account" supportText="Choose where to transfer funds" items={accounts} value={null} onValueChange={() => {}} />
      </Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'What the field says',
      description: 'Every field has a label. Add a placeholder that starts with a verb and support text when people need help choosing.',
      body: <div className="coin-new-example-grid three">
        <ExampleCard title="Label and placeholder" description="The minimum for a clear field."><Host><Field label="Account" placeholder="Select an account" /></Host></ExampleCard>
        <ExampleCard title="With support text" description="Extra guidance sits under the field."><Host><Field label="Account" placeholder="Select an account" supportText="Choose where to transfer funds" /></Host></ExampleCard>
        <ExampleCard title="With a chosen value" description="The choice replaces the placeholder."><Host><Field label="Account" initial="checking" /></Host></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Required, invalid, disabled, read-only',
      description: 'Press any field here to open its list. Invalid replaces the support text with the error; read-only shows a value that cannot change right now.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Required" description="An asterisk follows the label."><Host><Field label="Account" placeholder="Select an account" isRequired supportText="This field is required" /></Host></ExampleCard>
        <ExampleCard title="Invalid" description="Red border, tinted field, and the error in place of support text."><Host><Field label="Account" placeholder="Select an account" isInvalid errorMessage="Choose an account to transfer from" /></Host></ExampleCard>
        <ExampleCard title="Disabled" description="The whole field is dimmed and does not open."><Host><Field label="Account" initial="savings" isDisabled supportText="You cannot change this account" /></Host></ExampleCard>
        <ExampleCard title="Read-only" description="A grey field that shows the value but does not open."><Host><Field label="Account" initial="savings" isReadOnly supportText="Locked for this session" /></Host></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'Full width, fixed height',
      description: 'The field fills its container and is 48 px tall. The open list matches the field’s width and scrolls after about five options.',
      body: <div className="coin-new-stack">
        <Anatomy legend={false} specimenWidth={300} marks={[{ kind: 'size', target: '[role="combobox"]', side: 'right', label: 'both' }]}>
          <DropdownInput modes={LIGHT} label="Account" placeholder="Select an account" items={accounts} value={null} onValueChange={() => {}} />
        </Anatomy>
        <div className="coin-new-example-grid">
          <ExampleCard title="360 px form"><Host><Field label="Account" initial="checking" /></Host></ExampleCard>
          <ExampleCard title="240 px column" description="The field narrows with its column; the chevron stays at the end."><Host narrow><Field label="Account" initial="brokerage" /></Host></ExampleCard>
        </div>
      </div>,
    },
    content: {
      header: 'Content', title: 'Ask, prompt, and explain',
      description: 'Write the label as a noun for the thing being chosen, the placeholder as an instruction, and error messages as a way to fix the problem.',
      body: <div className="coin-new-stack">
        <Host><Field label="Transfer from" placeholder="Select an account" supportText="Only accounts that can send money are listed" /></Host>
        <Host><Field label="Transfer from" placeholder="Select an account" isInvalid errorMessage="Choose an account to transfer from" /></Host>
      </div>,
    },
    context: {
      header: 'In context', title: 'Choose accounts for a transfer',
      description: 'The screen owns each value and checks the form when people continue. It marks an empty field invalid and shows how to fix it.',
      body: <TransferForm />,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Make the choice clear',
      description: 'Each pair shows what people see before and after choosing.',
      body: <div className="coin-new-stack">
        <DoDont goodTitle="Keep a visible label" goodCaption="“Account” still explains the value after a choice." badTitle="Rely on the placeholder" badCaption="Once chosen, “Savings account” sits in the field with no question."
          good={<Host><Field label="Account" initial="savings" /></Host>}
          bad={<Host><Field placeholder="Select an account" initial="savings" accessibilityLabel="Account" /></Host>} />
        <DoDont goodTitle="Say how to fix an error" goodCaption="The message tells people what to do next." badTitle="Write a vague error" badCaption="“Invalid” does not say what went wrong."
          good={<Host><Field label="Account" isInvalid errorMessage="Choose an account to transfer from" /></Host>}
          bad={<Host><Field label="Account" isInvalid errorMessage="Invalid" /></Host>} />
        <DoDont goodTitle="Use it for longer lists" goodCaption="Four or more options fit well in a list." badTitle="Hide two options in a list" badCaption="Yes or No needs an extra tap to see both answers."
          good={<Host><Field label="Account" placeholder="Select an account" /></Host>}
          bad={<Host><Field label="Auto-renew" placeholder="Select" items={yesNo} /></Host>} />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Dropdown Input contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="28 September 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('dropdowninput')} stories={[
        { label: 'Default', id: 'components-dropdowninput--default' }, { label: 'Required', id: 'components-dropdowninput--required' },
        { label: 'Invalid', id: 'components-dropdowninput--invalid' }, { label: 'Disabled', id: 'components-dropdowninput--disabled' },
        { label: 'Read-only', id: 'components-dropdowninput--read-only' }, { label: 'Long list', id: 'components-dropdowninput--scrollable-long-list' },
      ]}>Declared, installed, and registry <code>jfs-components</code> versions are <code>0.1.60</code>. Figma’s Open variant is the field with a Dropdown below it; in code the list opens as a layer over the page when the field is pressed. The component needs a <code>SafeAreaProvider</code> at the app root and fails without one. On the web the field is a combobox that opens a menu rather than a listbox, arrow keys do not move through options, invalid, required, and disabled states are not announced, a disabled field can still receive focus, and the focus outline is removed.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'dropdowninput',
    summary: 'Use a Dropdown Input in a form when people choose one option from a list of four or more.',
    corePrinciple: 'Label the question, show the choice, and open the list only when asked.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('dropdowninput'),
  }} playground={<>
    <div className="preview-stage">
      <div className="coin-new-host wide">
        <DropdownInput key={state} modes={LIGHT} label={label} placeholder="Select an account" items={accounts} value={shown} onValueChange={next => setValue(next)} {...stateProps} />
      </div>
      <span className="stage-label">Live Coin Dropdown Input</span>
    </div>
    <div className="controls-panel">
      <label className="text-control"><span>Label</span><input value={label} onChange={event => setLabel(event.target.value)} maxLength={32} /></label>
      <Segment label="State" value={state} options={['Default', 'Required', 'Invalid', 'Disabled', 'Read-only']} onChange={setState} />
      <Readout title="Selected" value={labelOf(shown) ?? 'Nothing yet'}>Press the field to open the list.</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'dropdowninput',
  label: 'Dropdown Input',
  icon: <path d="M4 5h10a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm7 3 1.5 1.5L14 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  Component: DropdownInputGuide,
})
