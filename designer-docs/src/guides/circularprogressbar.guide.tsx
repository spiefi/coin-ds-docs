import { useState } from 'react'
import { Button, CardFinancialCondition, CircularProgressBar, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, Readout, Segment, Sources, Specimen, SpecimenRow, byTestId, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3446-5217'
const LIGHT = { 'Color Mode': 'Light' } as Modes
const M = { ...LIGHT, 'circularProgressBar Size': 'M' } as Modes
const SECONDARY = { ...LIGHT, AppearanceBrand: 'Secondary' } as Modes
const POSITIVE = { ...LIGHT, 'Semantic Intent': 'System', AppearanceSystem: 'positive' } as Modes
const MEDIUM = { ...LIGHT, Emphasis: 'Medium' } as Modes
const noop = () => {}

type State = 'Active' | 'Inactive'
type Size = 'S' | 'M'
type Value = '0' | '35' | '70' | '100'

const R = byTestId('cpb-anatomy')

function CircularProgressBarGuide() {
  const [state, setState] = useState<State>('Active')
  const [size, setSize] = useState<Size>('S')
  const [value, setValue] = useState<Value>('70')
  const [checked, setChecked] = useState(false)

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A track, an arc, and the value',
      description: 'A grey track shows the whole, and the arc runs clockwise from 12 o’clock to the value. The number sits in the middle, with optional support text above it.',
      body: <Anatomy parts={[
        { name: 'Track', note: 'The full ring in light grey; it stands for 100.', target: `${R} svg circle:nth-of-type(1)`, side: 'left' },
        { name: 'Arc', note: 'Fills clockwise from 12 o’clock to the value, with round ends.', target: `${R} circle[stroke-linecap="round"]`, side: 'right' },
        { name: 'Support text', note: '11 px; names what’s measured, above the number.', target: `${R} > div > div:first-child`, side: 'top' },
        { name: 'Value', note: 'The value rounded to a whole number, with no % sign.', target: `${R} > div > div:last-child`, side: 'bottom' },
      ]}><CircularProgressBar testID="cpb-anatomy" state="Active" value={70} supportText="Savings goal" modes={M} /></Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Size, words, and colour',
      description: 'Size and colour are modes, set on the ring or passed down by its host. Support text and a value label are words you add; the arc always follows the value.',
      body: <div className="coin-new-example-grid three">
        <ExampleCard title="Size S" description="60 px with an 8 px ring: the number alone, for cards and rows."><CircularProgressBar state="Active" value={70} modes={LIGHT} /></ExampleCard>
        <ExampleCard title="Size M" description="164 px with a 22 px ring, with room for support text."><CircularProgressBar state="Active" value={70} supportText="Savings goal" modes={M} /></ExampleCard>
        <ExampleCard title="Value label" description="Shows a count such as “4 of 7” in place of the number; the arc still follows the value."><CircularProgressBar state="Active" value={(4 / 7) * 100} valueLabel="4 of 7" supportText="Benefits used" accessibilityLabel="Benefits used, 4 of 7" modes={M} /></ExampleCard>
        <ExampleCard title="Brand colour" description="AppearanceBrand sets the arc: Secondary is purple. The track stays grey."><CircularProgressBar state="Active" value={70} modes={SECONDARY} /></ExampleCard>
        <ExampleCard title="System colour" description="Semantic Intent System with positive, warning, or negative colours the arc and tints the track."><CircularProgressBar state="Active" value={70} modes={POSITIVE} /></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Active or Inactive, from empty to full',
      description: 'Active draws the arc and the number. Inactive shows the track with a minus icon and ignores the value: use it before there’s anything to measure. Values below 0 or above 100 are held at 0 and 100.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Active" description="The arc and the number."><CircularProgressBar state="Active" value={70} modes={LIGHT} /></ExampleCard>
        <ExampleCard title="Inactive" description="Track and minus icon; no number."><CircularProgressBar state="Inactive" value={70} modes={LIGHT} /></ExampleCard>
        <ExampleCard title="Empty" description="At 0, the track and “0”."><CircularProgressBar state="Active" value={0} modes={LIGHT} /></ExampleCard>
        <ExampleCard title="Full" description="At 100, a closed ring."><CircularProgressBar state="Active" value={100} modes={LIGHT} /></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'Two fixed sizes: 60 and 164 px',
      description: 'Size is a mode, not a width: S is 60 px with an 8 px ring and M is 164 px with a 22 px ring. The ring keeps its size in any host, and its text gets one line across the ring’s full width.',
      body: <Anatomy legend={false} marks={[
        { kind: 'size', target: byTestId('cpb-size-s'), side: 'bottom', label: 'both' },
        { kind: 'size', target: byTestId('cpb-size-m'), side: 'bottom', label: 'both' },
      ]}><SpecimenRow>
        <Specimen caption="S"><CircularProgressBar testID="cpb-size-s" state="Active" value={70} modes={LIGHT} /></Specimen>
        <Specimen caption="M"><CircularProgressBar testID="cpb-size-m" state="Active" value={70} supportText="Savings goal" modes={M} /></Specimen>
      </SpecimenRow></Anatomy>,
    },
    content: {
      header: 'Content', title: 'A number people can place',
      description: 'The ring shows a whole number with no % sign, so say nearby what it measures, or use a value label such as “3 of 5” for counts. Keep support text to two or three words, such as “Profile complete”.',
      body: <ExampleCard title="Name what’s measured"><div className="coin-new-row">
        <CircularProgressBar state="Active" value={80} supportText="Profile complete" modes={M} />
        <CircularProgressBar state="Active" value={60} valueLabel="3 of 5" supportText="Tasks done" accessibilityLabel="Tasks done, 3 of 5" modes={M} />
      </div></ExampleCard>,
    },
    context: {
      header: 'In context', title: 'A protection score on a card',
      description: 'The Financial Condition card draws the ring from its own value and progressState. Before the first check the ring is Inactive; when the score comes back, the screen passes it as the value and turns the ring Active.',
      body: <div className="coin-new-context">
        <CardFinancialCondition modes={LIGHT} title="Protection" body={checked ? 'Your health and life cover score' : 'Check your coverage and gaps'} progressState={checked ? 'Active' : 'Inactive'} value={checked ? 62 : 0} showNudge={checked} nudgeBody={'Your life cover is below the suggested amount\nAdd a term plan to close the gap'} buttonLabel={checked ? 'View details' : 'Check my cover'} onPressButton={checked ? noop : () => setChecked(true)} />
        {checked && <Button label="Start again" onPress={() => setChecked(false)} modes={LIGHT} />}
        <p className="coin-new-readout" role="status">{checked ? 'Score: 62 out of 100' : 'Not checked yet: the ring is Inactive'}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Make the ring say something',
      description: 'Each pair shows a ring people can read and hear versus one that hides its value.',
      body: <div className="coin-new-stack">
        <DoDont good={<CircularProgressBar state="Active" value={70} modes={LIGHT} />} bad={<CircularProgressBar value={70} modes={LIGHT} />} goodTitle="Set Active with a value" badTitle="Pass a value alone" goodCaption="The ring shows 70." badCaption="Without state, the ring stays Inactive and ignores the value." />
        <DoDont good={<CircularProgressBar state="Active" value={70} modes={LIGHT} />} bad={<CircularProgressBar state="Active" value={70} modes={MEDIUM} />} goodTitle="Keep emphasis High" badTitle="Lower the emphasis" goodCaption="The arc stands out from the track." badCaption="At Medium the pale arc has no contrast with the track (1.0:1)." />
        <DoDont good={<CircularProgressBar state="Active" value={(4 / 7) * 100} valueLabel="4 of 7" supportText="Benefits used" accessibilityLabel="Benefits used, 4 of 7" modes={M} />} bad={<CircularProgressBar state="Active" value={(4 / 7) * 100} valueLabel="4 of 7" supportText="Benefits used" modes={M} />} goodTitle="Name a count" badTitle="Leave the default name on a count" goodCaption="“4 of 7” is read as “Benefits used, 4 of 7”." badCaption="It’s read as “Benefits used, 4 of 7 out of 100”." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Circular Progress Bar contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="10 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('circularprogressbar')} stories={[
        { label: 'Default', id: 'components-circularprogressbar--default' },
        { label: 'Inactive', id: 'components-circularprogressbar--inactive' },
        { label: 'Active', id: 'components-circularprogressbar--active' },
        { label: 'All states', id: 'components-circularprogressbar--all-states' },
        { label: 'With support text', id: 'components-circularprogressbar--with-support-text' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (5 October build) from the team’s private package repository. Figma’s State variant (Inactive, Active) matches the <code>state</code> prop, and size S or M is a variable mode in both. The component starts Inactive, while every Storybook story starts Active. Figma shows support text at M on its own; the package shows it only when you pass it. Figma’s ring looks about 15% of the size; the package draws 13% (8 px at S). On the web the ring is a progress bar named by its label, without a separate value. With Color Mode Dark the track and number keep their Light colours, so the guide shows Light only.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'circularprogressbar', name: 'Circular Progress Bar',
    corePrinciple: 'One number, read at a glance.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('circularprogressbar'),
  }} playground={<>
    <div className="preview-stage">
      <CircularProgressBar state={state} value={Number(value)} modes={size === 'M' ? M : LIGHT} />
      <span className="stage-label">Live Coin Circular Progress Bar</span>
    </div>
    <div className="controls-panel">
      <Segment label="State" value={state} options={['Active', 'Inactive'] as const} onChange={setState} />
      <Segment label="Size" value={size} options={['S', 'M'] as const} onChange={setSize} />
      <Segment label="Value" value={value} options={['0', '35', '70', '100'] as const} onChange={setValue} />
      <Readout title="Read as" value={state === 'Active' ? `${value} out of 100` : 'Inactive progress'}>Screen readers hear this name. Inactive ignores the value.</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'circularprogressbar',
  label: 'Circular Progress Bar',
  summary: 'Use a Circular Progress Bar to show how far one measure has got, such as 70 out of 100, as a ring with the number inside.',
  keywords: ['progress ring', 'circular progress', 'radial progress', 'score ring'],
  icon: <><circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" opacity="0.35" /><path d="M9 3a6 6 0 1 1-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>,
  Component: CircularProgressBarGuide,
})
