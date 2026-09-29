import { useState } from 'react'
import { Button, Card, CheckboxItem, HStack, ListItem, Radio, Text, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, Sources, Specimen, SpecimenRow, byTestId, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const LIGHT = { 'Color Mode': 'Light' } as Modes
const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=922-3645'
const FREQUENCIES = ['Monthly', 'Quarterly', 'Yearly'] as const
const ACCOUNTS = [
  { title: 'Savings •• 0245', support: '₹1,24,500' },
  { title: 'Salary •• 1180', support: '₹48,200' },
  { title: 'Joint •• 7731', support: '₹9,870' },
]
const noop = () => {}

function LabelRow({ option, selected = false, disabled = false, onSelect = noop }: { option: string; selected?: boolean; disabled?: boolean; onSelect?: (option: string) => void }) {
  return <HStack modes={LIGHT} alignVertical="center">
    <Radio modes={LIGHT} selected={selected} disabled={disabled} onPress={disabled ? undefined : () => onSelect(option)} />
    <Text modes={LIGHT}>{option}</Text>
  </HStack>
}

function LabelRows({ selected = [], onSelect }: { selected?: string[]; onSelect?: (option: string) => void }) {
  return <VStack modes={LIGHT}>{FREQUENCIES.map(option => <LabelRow key={option} option={option} selected={selected.includes(option)} onSelect={onSelect} />)}</VStack>
}

function AccountRow({ index, value, onSelect }: { index: number; value?: string; onSelect: (account: string) => void }) {
  const { title, support } = ACCOUNTS[index]
  return <ListItem modes={LIGHT} layout="Horizontal" navArrow={false} title={title} supportText={support} onPress={() => onSelect(title)}
    trailing={<Radio modes={LIGHT} selected={value === title} onPress={() => onSelect(title)} />} />
}

function AccountRows({ value, onSelect, children }: { value?: string; onSelect: (account: string) => void; children?: React.ReactNode }) {
  return <Card modes={LIGHT}><VStack modes={LIGHT}>
    {ACCOUNTS.map((_, index) => <AccountRow key={index} index={index} value={value} onSelect={onSelect} />)}
    {children}
  </VStack></Card>
}

function RadioGuide() {
  const [frequency, setFrequency] = useState('Monthly')
  const [disableYearly, setDisableYearly] = useState(false)
  const [configAccount, setConfigAccount] = useState('Savings •• 0245')
  const [configFrequency, setConfigFrequency] = useState('Monthly')
  const [contentFrequency, setContentFrequency] = useState('Monthly')
  const [contentAccount, setContentAccount] = useState('Salary •• 1180')
  const [account, setAccount] = useState<string>()
  const [status, setStatus] = useState('Choose an account')
  const chooseAccount = (next: string) => { setAccount(next); setStatus(`Paying from ${next}`) }

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A ring that fills when chosen',
      description: 'Radio is an 18 px circle. Unselected it is a white ring; selected it fills purple and shows a white dot.',
      body: <Anatomy parts={[
        { name: 'Ring', note: 'A 1 px deep-purple border outlines the circle.', target: byTestId('radio-off'), side: 'left' },
        { name: 'Fill', note: 'The selected Radio fills purple.', target: byTestId('radio-on'), side: 'top' },
        { name: 'Dot', note: 'A 10 px white dot confirms the choice.', target: `${byTestId('radio-on')} > div`, side: 'right' },
      ]}>
        <SpecimenRow>
          <Specimen caption="Unselected"><Radio modes={LIGHT} testID="radio-off" /></Specimen>
          <Specimen caption="Selected"><Radio modes={LIGHT} testID="radio-on" selected /></Specimen>
        </SpecimenRow>
      </Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Place it beside its label',
      description: 'Radio has no label of its own. Use list rows when options need detail, and a plain label for short options.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="In list rows" description="For options with detail, such as accounts. The whole row selects its Radio."><VStack modes={LIGHT} style={{ width: '100%' }}><AccountRows value={configAccount} onSelect={setConfigAccount} /></VStack></ExampleCard>
        <ExampleCard title="Beside a short label" description="For short options. Only the 18 px circle responds to a press."><LabelRows selected={[configFrequency]} onSelect={setConfigFrequency} /></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Selected, unselected, and disabled',
      description: 'The screen sets which Radio is selected and which are disabled. Hover adds a lilac glow and keyboard focus a yellow ring while people interact.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Unselected" description="An empty ring: not chosen."><LabelRow option="Quarterly" /></ExampleCard>
        <ExampleCard title="Selected" description="Purple fill with a white dot."><LabelRow option="Monthly" selected /></ExampleCard>
        <ExampleCard title="Disabled" description="Grey and not pressable, for an option that is unavailable now."><LabelRow option="Yearly" disabled /></ExampleCard>
        <ExampleCard title="Disabled and selected" description="Pale purple: chosen, but locked."><LabelRow option="Monthly" disabled selected /></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'An 18 px circle inside a larger row',
      description: 'The Radio is always 18 × 18 px. On its own only the circle is pressable, so put it in a list row whose whole height and width select it.',
      body: <Anatomy legend={false} marks={[
        { kind: 'size', target: byTestId('radio-alone'), side: 'top', label: 'both' },
        { kind: 'size', target: `${byTestId('radio-row')} [role="button"]`, side: 'top', label: 'both' },
      ]}>
        <SpecimenRow>
          <Specimen caption="Radio"><Radio modes={LIGHT} testID="radio-alone" selected /></Specimen>
          <Specimen caption="List row"><VStack modes={LIGHT} testID="radio-row" style={{ width: 280 }}><AccountRow index={0} value="Savings •• 0245" onSelect={noop} /></VStack></Specimen>
        </SpecimenRow>
      </Anatomy>,
    },
    content: {
      header: 'Content', title: 'Short, parallel options',
      description: 'Write options in sentence case with the same grammar, so they read as one set. Lead with the word that tells them apart, and keep two to five options visible.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Frequencies"><LabelRows selected={[contentFrequency]} onSelect={setContentFrequency} /></ExampleCard>
        <ExampleCard title="Accounts"><VStack modes={LIGHT} style={{ width: '100%' }}><AccountRows value={contentAccount} onSelect={setContentAccount} /></VStack></ExampleCard>
      </div>,
    },
    context: {
      header: 'In context', title: 'Choosing the account to pay from',
      description: 'The screen keeps the chosen account, passes selected to each Radio, and enables Continue once one is chosen. Pressing a row or its Radio selects it.',
      body: <div className="coin-new-context">
        <AccountRows value={account} onSelect={chooseAccount}>
          <Button modes={LIGHT} label="Continue" disabled={!account} onPress={() => account && setStatus(`Continuing with ${account}`)} />
        </AccountRows>
        <p className="coin-new-readout" role="status">{status}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'One choice, clearly labelled',
      description: 'Each pair shows a set people can answer quickly versus one that confuses them.',
      body: <div className="coin-new-stack">
        <DoDont goodTitle="Keep exactly one selected" goodCaption="One filled Radio shows the single answer." good={<LabelRows selected={['Monthly']} />}
          badTitle="Select two at once" badCaption="Radio has no group, so the screen must stop a second selection." bad={<LabelRows selected={['Monthly', 'Yearly']} />} />
        <DoDont goodTitle="Label every Radio" goodCaption="Each option says what it is." good={<LabelRows selected={['Quarterly']} />}
          badTitle="Leave Radios bare" badCaption="Without labels people can’t tell the options apart." bad={<HStack modes={LIGHT}><Radio modes={LIGHT} /><Radio modes={LIGHT} selected /><Radio modes={LIGHT} /></HStack>} />
        <DoDont goodTitle="Use a Checkbox for yes or no" goodCaption="A Checkbox can be ticked and cleared." good={<CheckboxItem modes={LIGHT} checked onValueChange={noop}><Text modes={LIGHT}>Save this account</Text></CheckboxItem>}
          badTitle="Use a lone Radio" badCaption="Once chosen, a single Radio can’t be cleared." bad={<LabelRow option="Save this account" selected />} />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Radio contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="29 September 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('radio')} stories={[
        { label: 'Default', id: 'components-radio--default' }, { label: 'All states', id: 'components-radio--all-states' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.77</code> from the team’s private package repository. Figma has eight variants (Idle, Hover, Active, Focus, and Disabled, unselected and selected); the package sets <code>selected</code> and <code>disabled</code>, and draws hover and focus itself. <code>RadioButton</code> is a deprecated name for the same component. Radio has no label or group: the screen keeps one selected value. On the web a Radio is not announced as a radio button or as selected, Space does not select it, and the unselected focus border differs from Figma.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'radio',
    corePrinciple: 'One choice from a visible set. Put a label beside every Radio, and let the whole row select it.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('radio'),
  }} playground={<>
    <div className="preview-stage">
      <VStack modes={LIGHT}>{FREQUENCIES.map(option => <LabelRow key={option} option={option} selected={frequency === option}
        disabled={option === 'Yearly' && disableYearly} onSelect={setFrequency} />)}</VStack>
      <span className="stage-label">Live Coin Radio</span>
    </div>
    <div className="controls-panel">
      <OnOff label="Disable Yearly" value={disableYearly} onChange={setDisableYearly} />
      <Readout title="Frequency" value={frequency} />
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'radio',
  label: 'Radio',
  summary: 'Use a Radio to pick exactly one option from a short list, such as the account to pay from or how often to invest.',
  keywords: ['radio button', 'single select', 'single choice', 'option'],
  icon: <><circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" /><circle cx="9" cy="9" r="2.5" fill="currentColor" /></>,
  Component: RadioGuide,
})
