import { useState, type ReactNode } from 'react'
import { Card, Icon, ListItem, Text, TextInput, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, Segment, Sources, Surface, byTestId, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const LIGHT = { 'Color Mode': 'Light' } as Modes
const NEUTRAL = { 'Color Mode': 'Light', AppearanceBrand: 'Neutral' } as Modes
const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=506-10017'
const TRANSACTIONS = [
  { title: 'Gold purchase', support: '₹2,000 · 28 Sep' },
  { title: 'Electricity bill', support: '₹1,240 · 27 Sep' },
  { title: 'Grocery store', support: '₹860 · 26 Sep' },
]

const filterIcon = () => <Icon iconName="ic_filter" size={18} modes={NEUTRAL} />

function Host({ narrow = false, children }: { narrow?: boolean; children: ReactNode }) {
  return <Surface width={narrow ? "narrow" : "wide"}><VStack modes={LIGHT} style={{ width: "100%" }}>{children}</VStack></Surface>
}

function Field(props: React.ComponentProps<typeof TextInput>) {
  return <Host><TextInput modes={LIGHT} {...props} /></Host>
}

function FilledField() {
  const [value, setValue] = useState('Gold')
  return <Field value={value} onChangeText={setValue} />
}

function TransactionSearch() {
  const [query, setQuery] = useState('')
  const matches = TRANSACTIONS.filter(t => t.title.toLowerCase().includes(query.trim().toLowerCase()))
  return <Card modes={LIGHT}><VStack modes={LIGHT}>
    <TextInput modes={LIGHT} value={query} onChangeText={setQuery} placeholder="Search transactions" />
    {matches.map(t => <ListItem key={t.title} modes={LIGHT} layout="Horizontal" navArrow={false} title={t.title} supportText={t.support} />)}
    {matches.length === 0 && <Text modes={LIGHT}>No transactions match</Text>}
  </VStack></Card>
}

function TextInputGuide() {
  const [value, setValue] = useState('')
  const [placeholder, setPlaceholder] = useState('Search transactions')
  const [icon, setIcon] = useState<'Search' | 'Rupee'>('Search')
  const [filter, setFilter] = useState(false)

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'An icon, the text, and an optional end slot',
      description: 'A grey, fully rounded field holds a leading icon, the text people type, and optional content at the end.',
      body: <Anatomy surface="white" specimenWidth={300} parts={[
        { name: 'Leading icon', note: 'Hints at what to type; a search icon by default.', target: ':scope > div > div:first-child', side: 'left' },
        { name: 'Text', note: 'The placeholder, then what people type; one line.', target: byTestId('ti-anatomy'), side: 'top' },
        { name: 'End slot', note: 'Optional content after the text, such as a filter icon.', target: ':scope > div > div:last-child', side: 'right' },
        { name: 'Field', note: 'Grey rounded surface; a dark outline shows focus.', target: ':scope > div', side: 'bottom' },
      ]}>
        <TextInput modes={LIGHT} testID="ti-anatomy" placeholder="Search transactions" trailing={filterIcon()} />
      </Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Choose the icons',
      description: 'The leading icon is always there: keep the search icon or pick one that matches what people type. The end slot is empty unless you add content.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Search" description="The default, for searching a list."><Field placeholder="Search transactions" /></ExampleCard>
        <ExampleCard title="Matching icon" description="The icon says what kind of text belongs here."><Field placeholder="Amount" leadingIconName="ic_rupee" /></ExampleCard>
        <ExampleCard title="End slot" description="A cue at the end, such as filters."><Field placeholder="Search funds" trailing={filterIcon()} /></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Empty, focused, and filled',
      description: 'Empty, the field shows its placeholder. Focused, a dark outline appears and the placeholder clears. Filled, it shows the text. It has no disabled or error state.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Empty" description="The prompt shows until people type. Select the field to see the focus outline."><Field placeholder="Search transactions" /></ExampleCard>
        <ExampleCard title="Filled" description="The text replaces the prompt."><FilledField /></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'Full width, 42 px tall',
      description: 'Text Input fills its container’s width and is 42 px tall, with 14 px of padding at each end and 18 px icons. The screen sets the width.',
      body: <div className="coin-new-stack">
        <Anatomy legend={false} surface="white" specimenWidth={300} marks={[
          { kind: 'size', target: ':scope > div', side: 'bottom', label: 'both' },
          { kind: 'padding', target: ':scope > div' },
        ]}>
          <TextInput modes={LIGHT} placeholder="Search transactions" />
        </Anatomy>
        <ExampleCard title="In a narrow column" description="The field narrows with its column."><Host narrow><TextInput modes={LIGHT} placeholder="Search" /></Host></ExampleCard>
      </div>,
    },
    content: {
      header: 'Content', title: 'Prompt with what to type',
      description: 'Write a short placeholder that names what to type, such as “Search transactions”. Keep instructions out of it: it disappears as soon as people start typing.',
      body: <ExampleCard title="Prompts"><div className="coin-new-stack">
        <Field placeholder="Search transactions" />
        <Field placeholder="Search funds or stocks" />
        <Field placeholder="Amount" leadingIconName="ic_rupee" />
      </div></ExampleCard>,
    },
    context: {
      header: 'In context', title: 'Search a list of transactions',
      description: 'The screen filters the list as people type; Text Input only reports the text.',
      body: <div className="coin-new-context"><TransactionSearch /></div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Keep the field clear',
      description: 'Each pair shows a field people can fill in versus one that loses them.',
      body: <div className="coin-new-stack">
        <DoDont goodTitle="Prompt with what to type" goodCaption="A short prompt names the task." good={<Field placeholder="Search transactions" />}
          badTitle="Put instructions in the placeholder" badCaption="It is cut off and disappears as people type." bad={<Field placeholder="Enter the 12-digit number exactly as printed on your card" />} />
        <DoDont goodTitle="Match the icon to the task" goodCaption="The rupee icon says an amount goes here." good={<Field placeholder="Amount" leadingIconName="ic_rupee" />}
          badTitle="Keep the search icon everywhere" badCaption="A search icon on an amount field misleads." bad={<Field placeholder="Amount" />} />
        <DoDont goodTitle="Keep one fixed prompt" goodCaption="The field always says what it is for." good={<Field placeholder="Search" />}
          badTitle="Rotate the prompt" badCaption="Changing text distracts, and the field loses its accessible name." bad={<Field placeholder={['Search gold', 'Search funds', 'Search bills']} />} />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Text Input contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="2 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('textinput')} stories={[
        { label: 'Default', id: 'components-textinput--default' },
        { label: 'Leading and trailing', id: 'components-textinput--with-leading-and-trailing' },
        { label: 'Custom leading', id: 'components-textinput--with-custom-leading' },
        { label: 'Search', id: 'components-textinput--search' },
      ]}>Declared and installed <code>jfs-components</code> is <code>0.1.78</code> from the team’s private package repository. Figma’s textInput is 251 × 44 with start and end icon slots; the package renders 42 px tall and shows focus with its own dark outline. <code>TextInput.Search</code> is the same field with a fixed search icon. The field has no visible label, error, or disabled state, and its leading icon can be changed but not removed. On the web the accessibility label names the input. Without one, the placeholder is the field’s only name, and it clears on focus; a rotating placeholder leaves the field unnamed. Always set an accessibility label.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'textinput',
    corePrinciple: 'A short prompt, the right icon, and room to type.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('textinput'),
  }} playground={<>
    <div className="preview-stage">
      <Host><TextInput modes={LIGHT} value={value} onChangeText={setValue} placeholder={placeholder}
        leadingIconName={icon === 'Search' ? 'ic_search' : 'ic_rupee'} trailing={filter ? filterIcon() : undefined} /></Host>
      <span className="stage-label">Live Coin Text Input</span>
    </div>
    <div className="controls-panel">
      <label className="text-control"><span>Placeholder</span><input value={placeholder} maxLength={40} onChange={e => setPlaceholder(e.target.value)} /></label>
      <Segment label="Leading icon" value={icon} options={['Search', 'Rupee'] as const} onChange={setIcon} />
      <OnOff label="Trailing icon" value={filter} onChange={setFilter} />
      <Readout title="Value" value={value || 'Empty'} />
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'textinput',
  label: 'Text Input',
  summary: 'Use a Text Input for a single line of text, such as a search, with an icon that hints at what to type.',
  keywords: ['input', 'text field', 'search field', 'search bar'],
  icon: <><rect x="1.5" y="5" width="15" height="8" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M6 7.3v3.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>,
  Component: TextInputGuide,
})
