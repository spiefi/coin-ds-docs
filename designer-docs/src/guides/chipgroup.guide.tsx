import { useState, type ReactNode } from 'react'
import { ChipGroup, ChipSelect, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, FitWidth, Readout, Segment, Sources, Surface, byTestId, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1905-5123'
const LIGHT = { 'Color Mode': 'Light' } as Modes

const FILTERS = [
  { label: 'Date', icon: 'ic_calendar_week', applied: 'Last 30 days' },
  { label: 'Status', icon: 'ic_status_loading', applied: 'Pending' },
  { label: 'Payment methods', icon: 'ic_payments', applied: 'UPI' },
  { label: 'Category', icon: 'ic_filter', applied: 'Groceries' },
  { label: 'Account', icon: 'ic_filter', applied: 'Savings •• 4821' },
  { label: 'Amount', icon: 'ic_filter', applied: 'Over ₹1,000' },
]

function Host({ children }: { children: ReactNode }) {
  return <Surface width="wide"><VStack modes={LIGHT} style={{ width: '100%' }}>{children}</VStack></Surface>
}

/** Chips from FILTERS; indexes in `applied` render Active with their applied label. */
function Chips({ count, applied = [], onToggle }: { count: number; applied?: number[]; onToggle?: (i: number) => void }) {
  return <>{FILTERS.slice(0, count).map((f, i) => {
    const on = applied.includes(i)
    return <ChipSelect key={f.label} label={on ? f.applied : f.label} icon={f.icon} active={on} onPress={onToggle ? () => onToggle(i) : undefined} />
  })}</>
}

function useApplied() {
  const [applied, setApplied] = useState<number[]>([])
  const toggle = (i: number) => setApplied(a => (a.includes(i) ? a.filter(x => x !== i) : [...a, i]))
  return [applied, toggle] as const
}

function ChipGroupGuide() {
  const [count, setCount] = useState<'3' | '6'>('3')
  const [playApplied, playToggle] = useApplied()
  const [ctxApplied, ctxToggle] = useApplied()
  const n = Number(count)
  const appliedLabels = playApplied.filter(i => i < n).sort((a, b) => a - b).map(i => FILTERS[i].applied)
  const ctxSentence = 'Showing '
    + (ctxApplied.includes(2) ? 'UPI payments' : 'transactions')
    + (ctxApplied.includes(0) ? ' from the last 30 days' : '')
    + (ctxApplied.includes(1) ? ', pending' : '')
  const CG = byTestId('chipgroup-anatomy')
  const SZ = byTestId('chipgroup-size')

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'Chips in a wrapping row',
      description: 'The group holds Chip Selects in one row, 8 px apart. Chips that don’t fit move to the next line, also 8 px below.',
      body: <Anatomy surface="white" specimenWidth={300} parts={[
        { name: 'Chip Select', note: 'Each chip keeps its own label, icon, and Active state.', target: `${CG} > button:nth-child(2)`, side: 'right' },
        { name: 'Gap', note: '8 px between chips, set by the group.', between: [`${CG} > button:nth-child(1)`, `${CG} > button:nth-child(2)`], side: 'top' },
        { name: 'Wrapped chip', note: 'A chip that doesn’t fit starts the next row, on the left.', target: `${CG} > button:nth-child(3)`, side: 'bottom' },
        { name: 'Group', note: 'Lays chips out; it has no label or state of its own.', target: CG, side: 'left' },
      ]} marks={[{ kind: 'gap', from: `${CG} > button:nth-child(1)`, to: `${CG} > button:nth-child(3)` }]}>
        <ChipGroup testID="chipgroup-anatomy" modes={LIGHT}><Chips count={3} /></ChipGroup>
      </Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'The chips are the content',
      description: 'Chip Group has no variants or size. Choose the filters, their order, and each chip’s icon; each chip turns Active on its own.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Figma’s three filters" description="Date, Status, and Payment methods, each with its own icon."><Host><ChipGroup modes={LIGHT}><Chips count={3} /></ChipGroup></Host></ExampleCard>
        <ExampleCard title="Six filters" description="More filters wrap onto new rows with the same 8 px gaps."><Host><ChipGroup modes={LIGHT}><Chips count={6} /></ChipGroup></Host></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'The group has none; each chip does',
      description: 'Chip Group has no idle, active, or disabled state. When a chip applies, it shows its value and a close icon, grows 20 px, and the row may re-wrap.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Nothing applied" description="Grey chips name the filters."><Host><ChipGroup modes={LIGHT}><Chips count={3} /></ChipGroup></Host></ExampleCard>
        <ExampleCard title="Two applied" description="Each Active chip shows its value; the others stay as they are."><Host><ChipGroup modes={LIGHT}><Chips count={3} applied={[0, 2]} /></ChipGroup></Host></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'Full width, 32 px rows, 8 px gaps',
      description: 'The group fills its container and adds a 32 px row for each line of chips. On the web chips are a little wider than in Figma, so Figma’s three filters need 382 px for one row.',
      body: <div className="coin-new-stack">
        <Anatomy legend={false} surface="white" specimenWidth={300} marks={[
          { kind: 'size', target: SZ, side: 'right', label: 'both' },
          { kind: 'gap', from: `${SZ} > button:nth-child(1)`, to: `${SZ} > button:nth-child(2)` },
          { kind: 'gap', from: `${SZ} > button:nth-child(1)`, to: `${SZ} > button:nth-child(3)` },
        ]}><ChipGroup testID="chipgroup-size" modes={LIGHT}><Chips count={3} /></ChipGroup></Anatomy>
        <div className="coin-new-example-grid">
          <ExampleCard title="Group 390 px wide" description="The three filters fit on one row, with 8 px to spare."><FitWidth><VStack modes={LIGHT} style={{ width: 390, padding: 0 }}><ChipGroup modes={LIGHT}><Chips count={3} /></ChipGroup></VStack></FitWidth></ExampleCard>
          <ExampleCard title="Group 370 px wide, as in Figma" description="Payment methods moves to a second row."><FitWidth><VStack modes={LIGHT} style={{ width: 370, padding: 0 }}><ChipGroup modes={LIGHT}><Chips count={3} /></ChipGroup></VStack></FitWidth></ExampleCard>
        </div>
      </div>,
    },
    content: {
      header: 'Content', title: 'Short filter names, then the value',
      description: 'Name each filter in one or two words, in sentence case. Once a filter applies, its chip shows the chosen value, so the row reads as a summary of the list.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Filter names"><Host><ChipGroup modes={LIGHT}><Chips count={3} /></ChipGroup></Host></ExampleCard>
        <ExampleCard title="Applied values"><Host><ChipGroup modes={LIGHT}><Chips count={3} applied={[0, 1, 2]} /></ChipGroup></Host></ExampleCard>
      </div>,
    },
    context: {
      header: 'In context', title: 'Filters above a transaction list',
      description: 'The screen owns each filter: pressing an Idle chip applies it (a picker would open here), and pressing an Active chip clears it. The group only keeps the chips spaced as they change width.',
      body: <div className="coin-new-context">
        <Host><ChipGroup modes={LIGHT}><Chips count={3} applied={ctxApplied} onToggle={ctxToggle} /></ChipGroup></Host>
        <p className="coin-new-readout" role="status">{ctxSentence}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Keep the row short and easy to scan',
      description: 'Each pair shows a chip row people can read at a glance versus one that slows them down.',
      body: <div className="coin-new-stack">
        <DoDont
          good={<Host><ChipGroup modes={LIGHT}><Chips count={3} /></ChipGroup></Host>}
          bad={<Host><ChipGroup modes={LIGHT}>{FILTERS.slice(0, 3).map(f => <ChipSelect key={f.label} label={f.label} />)}</ChipGroup></Host>}
          goodTitle="Match each icon to its filter" badTitle="Leave the default icon"
          goodCaption="A calendar, a status, and a payment icon tell the filters apart." badCaption="Every chip shows a calendar, so the filters look alike." />
        <DoDont
          good={<Host><ChipGroup modes={LIGHT}><ChipSelect label="Date" icon="ic_calendar_week" /><ChipSelect label="Status" icon="ic_status_loading" /><ChipSelect label="Method" icon="ic_payments" /></ChipGroup></Host>}
          bad={<Host><ChipGroup modes={LIGHT}><ChipSelect label="Date of transaction" icon="ic_calendar_week" /><ChipSelect label="Transaction status" icon="ic_status_loading" /><ChipSelect label="Payment method used" icon="ic_payments" /></ChipGroup></Host>}
          goodTitle="Keep labels short" badTitle="Write long labels"
          goodCaption="Short names fit several filters to a row." badCaption="Each long name takes a row to itself." />
        <DoDont
          good={<Host><ChipGroup modes={LIGHT}><Chips count={3} applied={[0, 2]} /></ChipGroup></Host>}
          bad={<Host><ChipGroup modes={LIGHT}><ChipSelect label="Daily" icon="ic_calendar_week" /><ChipSelect active label="Weekly" icon="ic_calendar_week" showCloseIcon={false} /><ChipSelect label="Monthly" icon="ic_calendar_week" /></ChipGroup></Host>}
          goodTitle="Let filters combine" badTitle="Use chips for one choice"
          goodCaption="Date and Payment methods apply together." badCaption="People expect several to apply, and each is announced as its own toggle." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Chip Group contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="6 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('chipgroup')} stories={[
        { label: 'Default', id: 'components-chipgroup--default' },
        { label: 'With active state', id: 'components-chipgroup--with-active-state' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> from the team’s private package repository. Figma’s Chip Group is one 370 × 32 component holding three Chip Selects in a slot, with no properties. The package wraps chips onto new rows with an 8 px gap; on the web the chips are slightly wider than in Figma. The group has no role or name of its own, so each chip is announced as a separate toggle button. The published Storybook stories show two chips without icons because their icon names don’t exist.</Sources>,
    },
  }

  return <ComponentGuideTemplate
    metadata={{ slug: 'chipgroup', corePrinciple: 'The group spaces the chips; each chip keeps its own state.', figmaUrl: FIGMA, storybookUrl: docsUrl('chipgroup') }}
    playground={<>
      <div className="preview-stage">
        <Host><ChipGroup modes={LIGHT}><Chips count={n} applied={playApplied} onToggle={playToggle} /></ChipGroup></Host>
        <span className="stage-label">Live Coin Chip Group</span>
      </div>
      <div className="controls-panel">
        <Segment label="Filters" value={count} options={['3', '6'] as const} onChange={setCount} />
        <Readout title="Applied filters" value={appliedLabels.length ? appliedLabels.join(', ') : 'None'}>Each chip turns on and off by itself; the group only spaces and wraps them.</Readout>
      </div>
    </>}
    sections={sections}
  />
}

export default defineGuide({
  slug: 'chipgroup',
  label: 'Chip Group',
  summary: 'Use a Chip Group to lay out a row of Chip Select filters that wraps onto new lines with even gaps.',
  keywords: ['filter chips', 'chip row', 'filters'],
  icon: <><rect x="2" y="3.5" width="6" height="4" rx="2" stroke="currentColor" strokeWidth="1.5" /><rect x="10" y="3.5" width="6" height="4" rx="2" stroke="currentColor" strokeWidth="1.5" /><rect x="2" y="10.5" width="9" height="4" rx="2" stroke="currentColor" strokeWidth="1.5" /></>,
  Component: ChipGroupGuide,
})
