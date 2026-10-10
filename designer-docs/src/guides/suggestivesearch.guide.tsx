import { useState, type ComponentProps, type ReactNode } from 'react'
import { Button, Card, SuggestiveSearch, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, Segment, Sources, byTestId, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4579-8094'
const LIGHT = { 'Color Mode': 'Light' } as Modes
const CARD = { 'Color Mode': 'Light', AppearanceBrand: 'Neutral' } as Modes

const BANKS = ['HDFC Bank', 'Himachal Pradesh Gramin Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra Bank', 'Punjab National Bank', 'Bank of Baroda', 'Canara Bank', 'Union Bank of India', 'IndusInd Bank', 'Yes Bank']
const PEOPLE = [{ value: 'u1', label: 'Aarav Sharma' }, { value: 'u2', label: 'Aditi Verma' }, { value: 'u3', label: 'Rohan Mehta' }, { value: 'u4', label: 'Ananya Iyer', disabled: true }]

const SUPPORT = 'Pick the bank your account is with.'
const EMPTY = 'No matching banks'
const ERROR = 'Choose your bank from the list.'

const H = (rows: number) => 72 + 6 + 44 * rows + 12

const sel = (id: string) => {
  const R = byTestId(id)
  return {
    label: `${R} > div:first-child > [dir="auto"]:first-child`,
    required: `${R} > div:first-child > [dir="auto"]:nth-child(2)`,
    field: `${R} > div:nth-child(2) > div:first-child`,
    input: `${R} input`,
    list: `${R} [role="listbox"]`,
    match: `${R} [role="option"] span`,
    labelRow: `${R} > div:first-child`,
    fieldWrap: `${R} > div:nth-child(2)`,
  }
}

type SSProps = Partial<ComponentProps<typeof SuggestiveSearch>>

function Search(props: SSProps) {
  return <SuggestiveSearch modes={LIGHT} items={BANKS} label="Bank name" placeholder="Search bank name" {...props} />
}

function Host({ children, h }: { children: ReactNode, h?: number }) {
  return <div className="coin-new-host wide"><VStack modes={LIGHT} style={{ width: '100%', padding: 0, minHeight: h }}>{children}</VStack></div>
}

type Value = string | number | null
type Option = { label: string } | undefined

function useSearch() {
  const [query, setQuery] = useState('')
  const [value, setValue] = useState<Value>(null)
  const [label, setLabel] = useState<string | null>(null)
  return {
    label,
    props: {
      inputValue: query, onInputChange: setQuery, value,
      onValueChange: (v: Value, o?: Option) => { setValue(v); setLabel(v == null ? null : o?.label ?? String(v)) },
    } as SSProps,
    setQuery,
  }
}

type State = 'Default' | 'Error' | 'Read only' | 'Disabled'

function SuggestiveSearchGuide() {
  const [state, setState] = useState<State>('Default')
  const [support, setSupport] = useState(true)
  const [empty, setEmpty] = useState(true)
  const [highlight, setHighlight] = useState(true)
  const play = useSearch()
  const content = useSearch()
  const ctx = useSearch()
  const [tried, setTried] = useState(false)
  const [status, setStatus] = useState('Choose a bank')

  const changeState = (s: State) => {
    setState(s)
    if (s === 'Read only') play.setQuery('HDFC Bank')
  }
  const stateProps: SSProps = state === 'Error' ? { isInvalid: true, errorMessage: ERROR }
    : state === 'Read only' ? { isReadOnly: true }
      : state === 'Disabled' ? { isDisabled: true } : {}

  const A = sel('ss-anatomy')
  const S = sel('ss-size')

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A labelled field over a list of matches',
      description: 'A label names the field. As people type, matches from your list appear in a floating list under it, with the typed text in bold.',
      body: <Anatomy specimenWidth={328} parts={[
        { name: 'Label', note: 'Names the value, such as “Bank name”.', target: A.label, side: 'top' },
        { name: 'Required mark', note: 'Shown only; screen readers don’t hear it.', target: A.required, side: 'right' },
        { name: 'Field', note: 'Where people type; its border shows the state.', target: A.input, side: 'left' },
        { name: 'Suggestions', note: 'Matches from your list, in your order.', target: A.list, side: 'right' },
        { name: 'Match', note: 'The typed text, in bold.', target: A.match, side: 'left' },
      ]}>
        <VStack modes={LIGHT} style={{ width: '100%', padding: 0, minHeight: 230 }}>
          <Search testID="ss-anatomy" isRequired defaultInputValue="Bank of" defaultOpen />
        </VStack>
      </Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Help text, limits, and options',
      description: 'Add a hint or mark the field required, say what happens when nothing matches, and cap or simplify the list. Any option can be shown but not chosen.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="With support text" description="A short hint under the field."><Host><Search supportText={SUPPORT} /></Host></ExampleCard>
        <ExampleCard title="Required" description="A red asterisk after the label. It isn’t announced."><Host><Search isRequired /></Host></ExampleCard>
        <ExampleCard title="No-match message" description="Says so when nothing matches; without it the list just disappears."><Host h={H(1)}><Search emptyMessage={EMPTY} defaultInputValue="Paytm" defaultOpen /></Host></ExampleCard>
        <ExampleCard title="Fewer suggestions" description="Caps the list; otherwise it scrolls after about five rows."><Host h={H(3)}><Search maxResults={3} defaultInputValue="Bank" defaultOpen /></Host></ExampleCard>
        <ExampleCard title="Without highlight" description="Matches show in plain text."><Host h={H(3)}><Search highlightMatch={false} defaultInputValue="Bank of" defaultOpen /></Host></ExampleCard>
        <ExampleCard title="An option that can’t be chosen" description="Ananya Iyer is listed but disabled, such as a payee still being verified."><Host h={H(4)}><Search label="Beneficiary" placeholder="Search beneficiary" items={PEOPLE} defaultInputValue="A" defaultOpen /></Host></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Rest, focus, error, read only, disabled',
      description: 'The field shows its state with its border and fill: grey at rest, purple while focused, red when invalid. Read only and disabled can’t be typed in or opened; disabled is also faded.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Idle" description="Grey border; it turns purple when focused."><Host><Search /></Host></ExampleCard>
        <ExampleCard title="Error" description="A red field and a message that says how to fix it."><Host><Search defaultInputValue="Paytm Bank" isInvalid errorMessage={ERROR} /></Host></ExampleCard>
        <ExampleCard title="Read only" description="Grey, shows the chosen bank, and can’t be changed."><Host><Search defaultInputValue="HDFC Bank" isReadOnly /></Host></ExampleCard>
        <ExampleCard title="Disabled" description="Faded and unavailable."><Host><Search isDisabled /></Host></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'Full width, with a floating list',
      description: 'Suggestive Search fills its container. The label is 17 px tall with 8 px to a 47 px field. The list opens 6 px below the field with 44 px rows, floats over what follows, and scrolls after 240 px.',
      body: <Anatomy legend={false} specimenWidth={328} marks={[
        { kind: 'size', target: S.field, side: 'right', label: 'both' },
        { kind: 'gap', from: S.labelRow, to: S.fieldWrap },
      ]}><Search testID="ss-size" /></Anatomy>,
    },
    content: {
      header: 'Content', title: 'Name the value, hint the search',
      description: 'Label the field with what it holds, such as “Bank name”, and use the placeholder for a search hint. Keep options short and unique, write the no-match message as what happened, and make errors say how to fix the pick.',
      body: <ExampleCard title="Label, hint, and options"><Host h={320}><Search {...content.props} supportText={SUPPORT} emptyMessage={EMPTY} /></Host></ExampleCard>,
    },
    context: {
      header: 'In context', title: 'Adding a bank account',
      description: 'People find their bank by typing part of its name. Continue checks that a bank was picked from the list and shows an error if not; the list floats over the button while it’s open.',
      body: <div className="coin-new-context">
        <Card modes={CARD}>
          <Card.Title>Add a bank account</Card.Title>
          <Search {...ctx.props} emptyMessage={EMPTY} isInvalid={tried && !ctx.label} errorMessage={ERROR} />
          <Button label="Continue" modes={LIGHT} onPress={() => {
            setTried(true)
            setStatus(ctx.label ? `Adding ${ctx.label}` : ERROR)
          }} />
        </Card>
        <p className="coin-new-readout" role="status">{status}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'A named field that explains itself',
      description: 'Each pair shows a field people can understand and fix versus one that leaves them guessing.',
      body: <div className="coin-new-stack">
        <DoDont
          good={<Host><Search /></Host>}
          bad={<Host><Search label={undefined} placeholder="Bank name" /></Host>}
          goodTitle="Label the field" badTitle="Use the placeholder as the label"
          goodCaption="“Bank name” stays visible while people type." badCaption="It disappears as soon as people type." />
        <DoDont
          good={<Host h={H(1)}><Search emptyMessage={EMPTY} defaultInputValue="Paytm" defaultOpen /></Host>}
          bad={<Host h={H(1)}><Search defaultInputValue="Paytm" defaultOpen /></Host>}
          goodTitle="Say when nothing matches" badTitle="Let the list vanish"
          goodCaption="“No matching banks” explains the empty list." badCaption="People can’t tell whether anything matched." />
        <DoDont
          good={<Host><Search defaultInputValue="Paytm Bank" isInvalid errorMessage={ERROR} /></Host>}
          bad={<Host><Search defaultInputValue="Paytm Bank" isInvalid /></Host>}
          goodTitle="Explain the error" badTitle="Rely on red alone"
          goodCaption="The message says how to fix the pick." badCaption="A red field doesn’t say what’s wrong." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Suggestive Search contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="10 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('suggestivesearch')} stories={[
        { label: 'Default', id: 'components-suggestivesearch--default' },
        { label: 'Prefilled', id: 'components-suggestivesearch--prefilled' },
        { label: 'Empty message', id: 'components-suggestivesearch--with-empty-message' },
        { label: 'Invalid', id: 'components-suggestivesearch--invalid' },
        { label: 'Object items', id: 'components-suggestivesearch--object-items' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (5 October build) from the team’s private package repository. Figma’s Suggestive search has Idle, Open, and Active variants. The package bolds the typed text where Figma greys it, uses a grey placeholder, and marks the chosen row with a grey fill and a 16 px check (Figma: white with a 20 px check). On the web the arrow keys and Escape do nothing and the list closes as soon as focus leaves the field, so keyboard users can’t pick a suggestion. Every suggestion is announced as “Dropdown item”, and required and error aren’t announced. The published Storybook still shows the old page.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'suggestivesearch',
    corePrinciple: 'Type a little, then pick the right one.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('suggestivesearch'),
  }} playground={<>
    <div className="preview-stage">
      <Host h={320}>
        <Search key={state} {...play.props} supportText={support ? SUPPORT : undefined} emptyMessage={empty ? EMPTY : undefined} highlightMatch={highlight} {...stateProps} />
      </Host>
      <span className="stage-label">Live Coin Suggestive Search</span>
    </div>
    <div className="controls-panel">
      <Segment label="State" value={state} options={['Default', 'Error', 'Read only', 'Disabled'] as const} onChange={changeState} />
      <OnOff label="Support text" value={support} onChange={setSupport} />
      <OnOff label="No-match message" value={empty} onChange={setEmpty} />
      <OnOff label="Highlight match" value={highlight} onChange={setHighlight} />
      <Readout title="Selected bank" value={play.label ?? 'None'}>Type to filter, then click or tap a bank. The arrow keys don’t move through the list.</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'suggestivesearch',
  label: 'Suggestive Search',
  summary: 'Use a Suggestive Search to let people type and pick one item from a known list, such as their bank, with matches shown as they type.',
  keywords: ['autocomplete', 'typeahead', 'combobox', 'search with suggestions', 'bank search'],
  icon: <><circle cx="7" cy="6" r="3.75" stroke="currentColor" strokeWidth="1.5" /><path d="m9.75 8.75 2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M3 13.5h12M3 16h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>,
  Component: SuggestiveSearchGuide,
})
