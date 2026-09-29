import { useState } from 'react'
import { Button, Card, CheckboxGroup, CheckboxItem, Link, Text, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, Segment, Sources, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3999-527'
const GROUP_MODES = { 'Color Mode': 'Light', 'Button / Size': 'XS' } as Modes
const LIGHT = { 'Color Mode': 'Light' } as Modes
const ACCOUNTS = ['Fixed deposit • 0245', 'Recurring deposit • 1182', 'Mutual fund • Equity', 'Savings account • 4821']

function Item({ label, ...rest }: { label: string; defaultChecked?: boolean; checked?: boolean; disabled?: boolean; endSlot?: React.ReactNode; onValueChange?: (v: boolean) => void }) {
  return <CheckboxItem accessibilityLabel={label} {...rest}>{label}</CheckboxItem>
}

function Group({ labels, checkedFirst = false, manage = false, label = 'Accounts' }: { labels: string[]; checkedFirst?: boolean; manage?: boolean; label?: string }) {
  return <CheckboxGroup modes={GROUP_MODES} accessibilityLabel={label}>
    {labels.map((l, i) => <Item key={l} label={l} defaultChecked={checkedFirst && i === 0} endSlot={manage ? <Button label="Manage" /> : undefined} />)}
  </CheckboxGroup>
}

const Host = ({ children, narrow = false }: { children: React.ReactNode; narrow?: boolean }) =>
  <div className={`coin-new-host ${narrow ? 'narrow' : 'wide'}`}>{children}</div>

const LIST = '[role="list"]'
const GAP = { kind: 'gap' as const, from: `${LIST} > :nth-child(1)`, to: `${LIST} > :nth-child(2)` }

function CheckboxGroupGuide() {
  const [count, setCount] = useState<'2' | '3' | '4'>('3')
  const [disableOne, setDisableOne] = useState(false)
  const [endAction, setEndAction] = useState(false)
  const [picked, setPicked] = useState<Record<string, boolean>>({ [ACCOUNTS[0]]: true })
  const [linked, setLinked] = useState<Record<string, boolean>>({})

  const visible = ACCOUNTS.slice(0, Number(count))
  const selected = visible.filter(a => picked[a])
  const linkCount = ACCOUNTS.filter(a => linked[a]).length

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A stack of Checkbox Items',
      description: 'The group only spaces and themes its items. Each row is a public Checkbox Item with its own checkbox and label.',
      body: <Anatomy specimenWidth={272} marks={[GAP]} parts={[
        { name: 'Group', note: 'Full-width column with no padding of its own.', target: LIST, side: 'left' },
        { name: 'Checkbox Item', note: 'One independent choice.', target: `${LIST} > :nth-child(1)`, side: 'top' },
        { name: 'Checkbox', note: 'Shows whether this option is selected.', target: `${LIST} > :nth-child(2) > [role="checkbox"]`, side: 'left' },
        { name: 'Label', note: 'Names the option so it can be told apart.', target: `${LIST} > :nth-child(3) [dir="auto"]`, side: 'bottom' },
      ]}><Group labels={ACCOUNTS.slice(0, 3)} checkedFirst /></Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'What goes in each row',
      description: 'The group accepts Checkbox Items only. Each row can be a plain label, a label with a link, or a label with an action on its end.',
      body: <div className="coin-new-stack">
        <ExampleCard title="Plain labels" description="The default for lists of accounts or options."><Host><Group labels={ACCOUNTS.slice(0, 3)} /></Host></ExampleCard>
        <ExampleCard title="Label with a link" description="The Figma composition, for consent rows."><Host><CheckboxGroup modes={GROUP_MODES} accessibilityLabel="Consent">
          <CheckboxItem accessibilityLabel="I agree Terms & Conditions"><Text text="I agree" /><Link text="Terms & Conditions" autolayout="Hug" onPress={() => {}} /></CheckboxItem>
        </CheckboxGroup></Host></ExampleCard>
        <ExampleCard title="With an end action" description="A secondary action that does not toggle the row."><Host><Group labels={ACCOUNTS.slice(0, 2)} manage /></Host></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Selected, unselected, and disabled',
      description: 'Each row keeps its own state; the group does not limit or count selections. Disable a row only while the option is temporarily unavailable.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Mixed selection" description="Any number can be selected."><Host><Group labels={ACCOUNTS.slice(0, 3)} checkedFirst /></Host></ExampleCard>
        <ExampleCard title="Disabled rows" description="The checkbox dims but the label stays the same colour."><Host><CheckboxGroup modes={GROUP_MODES} accessibilityLabel="Accounts">
          <Item label={ACCOUNTS[0]} checked disabled /><Item label={ACCOUNTS[1]} disabled /><Item label={ACCOUNTS[2]} />
        </CheckboxGroup></Host></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'Full width, 12 px between rows',
      description: 'The group fills its container and adds no side padding, so the form around it sets the margins. Rows grow taller when an end action or a long label needs the space.',
      body: <div className="coin-new-stack">
        <Anatomy legend={false} specimenWidth={272} marks={[GAP, { kind: 'size', target: LIST, side: 'left', label: 'both' }]}><Group labels={ACCOUNTS.slice(0, 3)} /></Anatomy>
        <div className="coin-new-example-grid">
          <ExampleCard title="272 px column"><Host narrow><Group labels={ACCOUNTS.slice(0, 3)} /></Host></ExampleCard>
          <ExampleCard title="With an end action"><Host><Group labels={ACCOUNTS.slice(0, 2)} manage /></Host></ExampleCard>
        </div>
      </div>,
    },
    content: {
      header: 'Content', title: 'Make every option distinct',
      description: 'Start each label with what it is, then what tells it apart, such as the last four digits. Keep labels parallel and in sentence case.',
      body: <Host><Group labels={ACCOUNTS} /></Host>,
    },
    context: {
      header: 'In context', title: 'Choose accounts to link',
      description: 'The screen supplies the heading, owns each item’s checked state, and enables the button once something is selected. The group itself only lays out the rows.',
      body: <div className="coin-new-context"><Card modes={LIGHT}>
        <Text text="Choose accounts to link" modes={LIGHT} />
        <CheckboxGroup modes={GROUP_MODES} accessibilityLabel="Accounts to link">
          {ACCOUNTS.map(a => <Item key={a} label={a} checked={!!linked[a]} onValueChange={v => setLinked(s => ({ ...s, [a]: v }))} />)}
        </CheckboxGroup>
        <Button modes={LIGHT} disabled={linkCount === 0} label={linkCount === 0 ? 'Select an account' : linkCount === 1 ? 'Link 1 account' : `Link ${linkCount} accounts`} />
      </Card></div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Keep a group coherent',
      description: 'Each pair shows a group people can scan versus one that makes them stop.',
      body: <div className="coin-new-stack">
        <DoDont goodTitle="Group related options" goodCaption="Every row answers the same question." badTitle="Mix unrelated choices" badCaption="A marketing opt-in among accounts reads like one of them."
          good={<Host><Group labels={ACCOUNTS.slice(0, 3)} /></Host>} bad={<Host><Group labels={[...ACCOUNTS.slice(0, 2), 'Send me offers by SMS']} /></Host>} />
        <DoDont goodTitle="Pass real items" goodCaption="Each row names a real account." badTitle="Ship the empty group" badCaption="With no children it shows three identical placeholder rows."
          good={<Host><Group labels={ACCOUNTS.slice(0, 3)} /></Host>} bad={<Host><CheckboxGroup modes={GROUP_MODES} /></Host>} />
        <DoDont goodTitle="Use checkboxes for independent choices" goodCaption="People can pick one, several, or none." badTitle="Use them for a single choice" badCaption="Checkboxes let people pick “Monthly” and “Yearly” at once."
          good={<Host><Text text="How should we reach you?" modes={LIGHT} /><Group label="How should we reach you?" labels={['Email', 'SMS', 'Push notification']} /></Host>}
          bad={<Host><CheckboxGroup modes={GROUP_MODES} accessibilityLabel="Billing period"><Item label="Monthly" defaultChecked /><Item label="Quarterly" /><Item label="Yearly" defaultChecked /></CheckboxGroup></Host>} />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Checkbox Group contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="28 September 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('checkboxgroup')} stories={[
        { label: 'Default', id: 'components-checkboxgroup--default' }, { label: 'Controlled', id: 'components-checkboxgroup--controlled' }, { label: 'With end slot', id: 'components-checkboxgroup--with-end-slot' }, { label: 'With disabled items', id: 'components-checkboxgroup--with-disabled-items' }, { label: 'Empty', id: 'components-checkboxgroup--empty' },
      ]}>Declared, installed, and registry <code>jfs-components</code> versions are <code>0.1.60</code>. The group forwards <code>modes</code> to every item and end-slot child and uses a 12 px gap with no padding. Figma rows are 18 px tall; the installed rows render 19 px. On the web, rows repeat the checkbox role inside the row, do not expose their checked state, and sit in a list without list items; the group’s name comes only from <code>accessibilityLabel</code>. Row behaviour is covered in the Checkbox Item guide.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'checkboxgroup', name: 'Checkbox Group',
    corePrinciple: 'Related choices, each independent, stacked with even spacing.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('checkboxgroup'),
  }} playground={<>
    <div className="preview-stage">
      <Host><CheckboxGroup modes={GROUP_MODES} accessibilityLabel="Accounts to link">
        {visible.map((a, i) => <Item key={a} label={a} checked={!!picked[a]} onValueChange={v => setPicked(s => ({ ...s, [a]: v }))}
          disabled={disableOne && i === visible.length - 1} endSlot={endAction && i === 0 ? <Button label="Manage" /> : undefined} />)}
      </CheckboxGroup></Host>
      <span className="stage-label">Live Coin Checkbox Group</span>
    </div>
    <div className="controls-panel">
      <Segment label="Items" value={count} options={['2', '3', '4'] as const} onChange={setCount} />
      <OnOff label="Disable one" value={disableOne} onChange={setDisableOne} />
      <OnOff label="End action" value={endAction} onChange={setEndAction} />
      <Readout title="Selected" value={selected.length ? `${selected.length} · ${selected.join(', ')}` : 'None'} />
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'checkboxgroup',
  label: 'Checkbox Group',
  summary: 'Use a Checkbox Group to let people pick any number of related options, such as accounts to link.',
  keywords: ['multi-select', 'multiple choice', 'checkbox list', 'options'],
  icon: <path d="M2 2h4v4H2zM3 4l.8.8L5 3.2M8 4h8M2 7h4v4H2zM8 9h8M2 12h4v4H2zM8 14h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  Component: CheckboxGroupGuide,
})
