import { useState, type ReactNode } from 'react'
import { Card, FormField, InputSearch, ListItem, Text, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, Sources, Surface, byTestId, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const LIGHT = { 'Color Mode': 'Light' } as Modes
const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1796-188'
const F = ':scope > div > div:first-child'
const HINT = ':scope > div > div:last-child'
const PAYEES = [
  { name: 'Asha Rao', number: '98765 43210' },
  { name: 'Ravi Kumar', number: '91234 56780' },
  { name: 'Meera Shah', number: '99887 76655' },
]

function Host({ narrow = false, children }: { narrow?: boolean; children: ReactNode }) {
  return <Surface width={narrow ? 'narrow' : 'wide'}><VStack modes={LIGHT} style={{ width: '100%' }}>{children}</VStack></Surface>
}

type SearchProps = Omit<React.ComponentProps<typeof InputSearch>, 'value' | 'onChangeText'> & { initial?: string }

function Search({ initial = '', ...props }: SearchProps) {
  const [value, setValue] = useState(initial)
  const label = typeof props.placeholder === 'string' ? props.placeholder : undefined
  return <InputSearch modes={LIGHT} accessibilityLabel={label} {...props} value={value} onChangeText={setValue} />
}

function Field(props: SearchProps & { narrow?: boolean }) {
  const { narrow, ...rest } = props
  return <Host narrow={narrow}><Search {...rest} /></Host>
}

function AnatomySpecimen() {
  const [value, setValue] = useState('Asha')
  return <Anatomy surface="white" specimenWidth={300} parts={[
    { name: 'Search icon', note: 'Marks the field as search; always shown.', target: `${F} > div:first-child`, side: 'top' },
    { name: 'Query', note: 'The placeholder, then what people type; one line.', target: byTestId('is-anatomy'), side: 'top' },
    { name: 'Clear', note: 'Appears with text and empties the field.', target: `${F} > div:last-child`, side: 'right' },
    { name: 'Field', note: 'Grey rounded surface; a dark outline shows focus.', target: F, side: 'left' },
    { name: 'Hint', note: 'Optional support text about what people can search for.', target: HINT, side: 'bottom' },
  ]}>
    <InputSearch modes={LIGHT} testID="is-anatomy" value={value} onChangeText={setValue} placeholder="Search payees" accessibilityLabel="Search payees" supportTextLabel="Try a name or mobile number" />
  </Anatomy>
}

function PayeeSearch() {
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()
  const digits = query.replace(/\D/g, '')
  const matches = PAYEES.filter(p => p.name.toLowerCase().includes(q) || (digits !== '' && p.number.replace(/\s/g, '').includes(digits)))
  return <Card modes={LIGHT}><VStack modes={LIGHT}>
    <InputSearch modes={LIGHT} value={query} onChangeText={setQuery} placeholder="Search payees" accessibilityLabel="Search payees" supportTextLabel="Try a name or mobile number" />
    {matches.map(p => <ListItem key={p.name} modes={LIGHT} layout="Horizontal" navArrow={false} title={p.name} supportText={p.number} />)}
    {matches.length === 0 && <Text modes={LIGHT}>No payees match</Text>}
  </VStack></Card>
}

function InputSearchGuide() {
  const [value, setValue] = useState('')
  const [placeholder, setPlaceholder] = useState('Search payees')
  const [hint, setHint] = useState(true)

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A search field, a clear button, and a hint',
      description: 'A grey, fully rounded field holds the search icon and the query. A clear button appears once people type, and an optional hint sits below.',
      body: <AnatomySpecimen />,
    },
    configuration: {
      header: 'Configuration', title: 'Add a hint when the prompt is not enough',
      description: 'The hint is on by default and reads “Support Text” until you write one. Write a short hint, or turn it off.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="With a hint" description="The hint says what kinds of search work."><Field placeholder="Search payees" supportTextLabel="Try a name or mobile number" /></ExampleCard>
        <ExampleCard title="Without a hint" description="Turn it off when the prompt says enough."><Field placeholder="Search help articles" supportText={false} /></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Empty, focused, and filled',
      description: 'Empty, the field shows its prompt. Focused, a dark outline appears and the prompt clears. Filled, a clear button appears at the end. It has no disabled or error state.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Empty" description="The prompt shows until people type. Select the field to see the focus outline."><Field placeholder="Search payees" supportText={false} /></ExampleCard>
        <ExampleCard title="Filled" description="The clear button empties the field in one tap."><Field placeholder="Search payees" supportText={false} initial="Asha" /></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'Full width, 42 px tall',
      description: 'Input Search fills its container’s width. The field is 42 px tall with 14 px of padding at each end and 18 px icons, and the hint sits 8 px below. The screen sets the width.',
      body: <div className="coin-new-stack">
        <Anatomy legend={false} surface="white" specimenWidth={300} marks={[
          { kind: 'size', target: F, side: 'top', label: 'both' },
          { kind: 'padding', target: F },
          { kind: 'gap', from: F, to: HINT },
        ]}>
          <InputSearch modes={LIGHT} placeholder="Search payees" accessibilityLabel="Search payees" supportTextLabel="Try a name or mobile number" value="" onChangeText={() => {}} />
        </Anatomy>
        <ExampleCard title="In a narrow column" description="The field narrows with its column, and the hint wraps."><Field narrow placeholder="Search" supportTextLabel="Try a name or mobile number" /></ExampleCard>
      </div>,
    },
    content: {
      header: 'Content', title: 'Say what people can find',
      description: 'Write a short prompt that names what people search, such as “Search payees”, in sentence case with no full stop. Use the hint for an example of what works. The field has no visible label, so give it an accessibility label with the same words.',
      body: <ExampleCard title="Prompts and hints"><Host><div className="coin-new-stack">
        <Search placeholder="Search payees" supportTextLabel="Try a name or mobile number" />
        <Search placeholder="Search funds" supportTextLabel="Try a fund name or fund house" />
        <Search placeholder="Search help articles" supportText={false} />
      </div></Host></ExampleCard>,
    },
    context: {
      header: 'In context', title: 'Find a payee',
      description: 'The screen filters the list as people type and restores it when they clear the field; Input Search only reports the text.',
      body: <div className="coin-new-context"><PayeeSearch /></div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Keep the search clear',
      description: 'Each pair shows a search people understand versus one that confuses them.',
      body: <div className="coin-new-stack">
        <DoDont goodTitle="Write your own hint" goodCaption="The hint gives an example that works." good={<Field placeholder="Search payees" supportTextLabel="Try a name or mobile number" />}
          badTitle="Leave the default hint" badCaption="The placeholder words “Support Text” reach people." bad={<Field placeholder="Search payees" />} />
        <DoDont goodTitle="Keep one fixed prompt" goodCaption="The field always says what it searches." good={<Field placeholder="Search investments" supportText={false} />}
          badTitle="Rotate the prompt" badCaption="Changing text distracts, and the field loses its accessible name." bad={<Field placeholder={['Search gold', 'Search funds', 'Search bills']} supportText={false} />} />
        <DoDont goodTitle="Use a Form Field for a labelled value" goodCaption="The label stays while people type." good={<Host><FormField modes={LIGHT} label="Account number" placeholder="XXXX XXXX XXXX" /></Host>}
          badTitle="Collect a value with a search field" badCaption="The prompt disappears as people type, and there is no label or error." bad={<Field placeholder="Account number" supportText={false} />} />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Input Search contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="2 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('inputsearch')} stories={[
        { label: 'Default', id: 'components-inputsearch--default' },
        { label: 'With value', id: 'components-inputsearch--with-value' },
        { label: 'No support text', id: 'components-inputsearch--no-support-text' },
        { label: 'Custom support icon', id: 'components-inputsearch--with-custom-support-icon' },
        { label: 'Animated placeholders', id: 'components-inputsearch--animated-placeholders' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> from the team’s private package repository. Figma’s Input Search is a 251 × 68 set with idle and active variants and a support text option. The package is a Text Input with a fixed search icon, a clear button that appears with text, and support text that is on by default and reads “Support Text” until you set it. The field is 42 px tall (44 px in Figma) and shows focus with a dark outline instead of Figma’s grey border. It has no label, error, or disabled design. On the web the clear button has no role or name, the field adds an unnamed tab stop before the input, and without an accessibility label the field is named only by its placeholder, which clears on focus.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'inputsearch',
    corePrinciple: 'Say what people can find, and let them start over.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('inputsearch'),
  }} playground={<>
    <div className="preview-stage">
      <Host><InputSearch modes={LIGHT} value={value} onChangeText={setValue} placeholder={placeholder} accessibilityLabel={placeholder}
        supportText={hint} supportTextLabel="Try a name or mobile number" /></Host>
      <span className="stage-label">Live Coin Input Search</span>
    </div>
    <div className="controls-panel">
      <label className="text-control"><span>Placeholder</span><input value={placeholder} maxLength={40} onChange={e => setPlaceholder(e.target.value)} /></label>
      <OnOff label="Support text" value={hint} onChange={setHint} />
      <Readout title="Query" value={value || 'Empty'} />
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'inputsearch',
  label: 'Input Search',
  summary: 'Use an Input Search to search a list, with a clear button that appears as people type and an optional hint below.',
  keywords: ['search', 'search bar', 'search field', 'find', 'clear button'],
  icon: <><circle cx="7.5" cy="7" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M11 10.5l3.5 3.5M2 16h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>,
  Component: InputSearchGuide,
})
