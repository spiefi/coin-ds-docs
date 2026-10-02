import { useState } from 'react'
import { ChipSelect, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, Segment, Sources, byTestId, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1901-4727'
const modes = { 'Color Mode': 'Light' } as Modes
const CAL = 'ic_calendar_week'
const FILTER = 'ic_filter'
const ROOT = byTestId('chip-anatomy')

function Chip(props: { label: string; active?: boolean; icon?: string; showCloseIcon?: boolean }) {
  return <ChipSelect modes={modes} {...props} />
}

function ChipSelectGuide() {
  const [label, setLabel] = useState('Date')
  const [active, setActive] = useState(false)
  const [icon, setIcon] = useState<'Calendar' | 'Filter'>('Calendar')
  const [close, setClose] = useState(true)
  const [lastPress, setLastPress] = useState('None yet')
  const [dateOn, setDateOn] = useState(false)
  const [catOn, setCatOn] = useState(false)

  const toggle = () => { setLastPress(active ? 'Cleared' : 'Applied'); setActive(!active) }
  const status = dateOn && catOn ? 'Showing Groceries from the last 30 days'
    : dateOn ? 'Showing transactions from the last 30 days'
    : catOn ? 'Showing Groceries' : 'Showing all transactions'

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'Icon, label, and a way out',
      description: 'One pill holds a leading icon, the label, and, when Active, a close icon. The whole chip is a single press target.',
      body: <Anatomy parts={[
        { name: 'Leading icon', note: 'Hints at the kind of filter, such as a date.', target: `${ROOT} > div:first-child`, side: 'left' },
        { name: 'Label', note: 'Names the filter, or the value once applied.', target: `${ROOT} [dir="auto"]`, side: 'top' },
        { name: 'Close icon', note: 'Shows that pressing again clears the filter.', target: `${ROOT} > div:last-child`, side: 'right' },
        { name: 'Container', note: 'Pill that turns lavender when Active.', target: ROOT, side: 'bottom' },
      ]} marks={[{ kind: 'gap', from: `${ROOT} > div:first-child`, to: `${ROOT} [dir="auto"]` }]}>
        <ChipSelect active label="Date" icon={CAL} modes={modes} testID="chip-anatomy" />
      </Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Label, icon, and close icon',
      description: 'Choose an icon that matches the filter, and keep the close icon whenever a press clears the filter.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Calendar icon" description="The default, for date and period filters."><Chip label="Date" icon={CAL} /></ExampleCard>
        <ExampleCard title="Filter icon" description="For other attribute filters."><Chip label="Category" icon={FILTER} /></ExampleCard>
        <ExampleCard title="Active with close icon" description="The × tells people a press removes the filter."><Chip active label="Last 30 days" /></ExampleCard>
        <ExampleCard title="Active without close icon" description="Only when a press reopens the picker instead of clearing."><Chip active label="Last 30 days" showCloseIcon={false} /></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Idle and Active',
      description: 'One property switches the chip between Idle and Active. There is no disabled state; hide a filter that does not apply instead.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Idle" description="Grey pill, dark text."><Chip label="Date" /></ExampleCard>
        <ExampleCard title="Active" description="Lavender pill, purple icon, text, and close icon."><Chip active label="Date" /></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'The label sets the width',
      description: 'Height is fixed at 32 px. Width grows with the label and the icons, so short labels keep a row of chips on one line.',
      body: <div className="coin-new-stack">
        <Anatomy legend={false} marks={[{ kind: 'size', target: ROOT, side: 'bottom', label: 'both' }, { kind: 'padding', target: ROOT }]}>
          <ChipSelect label="Date" modes={modes} testID="chip-anatomy" />
        </Anatomy>
        <ExampleCard title="Short and long"><div className="coin-new-content-list"><Chip label="Date" /><Chip label="Last 30 days" /></div></ExampleCard>
      </div>,
    },
    content: {
      header: 'Content', title: 'Name the filter, then the choice',
      description: 'While Idle, use one or two words for the filter. Once applied, replace them with the chosen value so the row reads as a summary.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Idle labels"><div className="coin-new-content-list"><Chip label="Date" icon={CAL} /><Chip label="Category" icon={FILTER} /><Chip label="Account" icon={FILTER} /></div></ExampleCard>
        <ExampleCard title="Applied labels"><div className="coin-new-content-list"><Chip active label="Last 30 days" icon={CAL} /><Chip active label="Groceries" icon={FILTER} /><Chip active label="Savings •• 4821" icon={FILTER} /></div></ExampleCard>
      </div>,
    },
    context: {
      header: 'In context', title: 'Filters above a transaction list',
      description: 'The screen owns each filter. Pressing an Idle chip opens a picker (not part of Chip Select); pressing an Active chip clears it. The screen updates the chip’s state and label after each choice.',
      body: <div className="coin-new-context">
        <div className="coin-new-content-list">
          <ChipSelect modes={modes} icon={CAL} active={dateOn} label={dateOn ? 'Last 30 days' : 'Date'} onPress={() => setDateOn(v => !v)} />
          <ChipSelect modes={modes} icon={FILTER} active={catOn} label={catOn ? 'Groceries' : 'Category'} onPress={() => setCatOn(v => !v)} />
        </div>
        <p className="coin-new-readout" role="status">{status}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Make applied filters obvious',
      description: 'Each pair shows what people read in the chip row.',
      body: <div className="coin-new-stack">
        <DoDont good={<Chip active label="Last 30 days" />} bad={<Chip active label="Date" />} goodTitle="Show the chosen value" badTitle="Keep the generic label" goodCaption="“Last 30 days” tells people what the list is showing." badCaption="An Active “Date” chip does not say which dates." />
        <DoDont good={<Chip label="Date" icon={CAL} />} bad={<Chip label="Date" icon="ic_home" />} goodTitle="Match the icon to the filter" badTitle="Use an unrelated icon" goodCaption="A calendar signals a date filter." badCaption="A home icon on a date filter confuses the meaning." />
        <DoDont good={<Chip active label="Groceries" icon={FILTER} />} bad={<Chip active label="Groceries" icon={FILTER} showCloseIcon={false} />} goodTitle="Keep the close icon when a press clears" badTitle="Hide it when a press clears" goodCaption="The × shows how to remove the filter." badCaption="Without the ×, people cannot tell how to undo the filter." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Chip Select contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="1 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('chipselect')} stories={[
        { label: 'Default', id: 'components-chipselect--default' }, { label: 'Active', id: 'components-chipselect--active' },
        { label: 'Custom icon', id: 'components-chipselect--custom-icon' }, { label: 'Active without close icon', id: 'components-chipselect--active-without-close-icon' },
      ]}>Declared and installed <code>jfs-components</code> is <code>0.1.78</code> from the team’s private package repository. Figma’s State variant maps to the <code>active</code> property, which sets the <code>ChipSelect State</code> mode. The leading icon shows in both states, as in Figma. The close icon is part of the single press target, not a separate button. On the web the chip is a button named by its label and announced as pressed when Active; Enter and click activate it. Developers can replace the name with <code>accessibilityLabel</code>.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'chipselect', name: 'Chip Select',
    corePrinciple: 'Idle names the filter; Active shows the chosen value and how to clear it.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('chipselect'),
  }} playground={<>
    <div className="preview-stage">
      <ChipSelect modes={modes} label={label} active={active} icon={icon === 'Calendar' ? CAL : FILTER} showCloseIcon={close} onPress={toggle} />
      <span className="stage-label">Live Coin Chip Select</span>
    </div>
    <div className="controls-panel">
      <label className="text-control"><span>Label</span><input value={label} onChange={e => setLabel(e.target.value)} maxLength={24} /></label>
      <Segment label="State" value={active ? 'Active' : 'Idle'} options={['Idle', 'Active'] as const} onChange={v => setActive(v === 'Active')} />
      <Segment label="Icon" value={icon} options={['Calendar', 'Filter'] as const} onChange={setIcon} />
      {active && <OnOff label="Close icon" value={close} onChange={setClose} />}
      <Readout title="Last press" value={lastPress} />
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'chipselect',
  label: 'Chip Select',
  summary: 'Use a Chip Select to show one filter, such as a date range, and whether it is applied.',
  keywords: ['filter chip', 'chip', 'pill', 'date range', 'filter'],
  icon: <><rect x="2" y="5" width="14" height="8" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M11 7.8 13 10.2M13 7.8 11 10.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>,
  Component: ChipSelectGuide,
})
