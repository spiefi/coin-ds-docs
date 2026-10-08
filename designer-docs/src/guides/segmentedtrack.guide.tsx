import { useState } from 'react'
import { Card, MetricLegendItem, SegmentedTrack, Text, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, Readout, Segment, Sources, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const SENARY = { 'Color Mode': 'Light', 'Appearance / DataViz': 'Senary' } as Modes
const PRIMARY = { 'Color Mode': 'Light' } as Modes
const QUATERNARY = { 'Color Mode': 'Light', 'Appearance / DataViz': 'Quaternary' } as Modes
const NEUTRAL = { 'Color Mode': 'Light', 'Appearance / DataViz': 'Neutral' } as Modes
const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4176-39960'

type Part = { name: string; share: number }
const MIX3: Part[] = [{ name: 'Equity', share: 60 }, { name: 'Debt', share: 25 }, { name: 'Cash', share: 15 }]
const MIX5: Part[] = [{ name: 'Large cap', share: 35 }, { name: 'Mid cap', share: 25 }, { name: 'Small cap', share: 15 }, { name: 'Debt', share: 15 }, { name: 'Cash', share: 10 }]

const spoken = (mix: Part[]) => 'Portfolio mix: ' + mix.map(p => `${p.name.toLowerCase()} ${p.share}%`).join(', ')

const Track = ({ mix, modes = SENARY }: { mix: Part[]; modes?: Modes }) =>
  <SegmentedTrack modes={modes} segments={mix.map(p => ({ key: p.name, value: p.share }))} accessibilityLabel={spoken(mix)} />

const Legend = ({ mix, modes = SENARY }: { mix: Part[]; modes?: Modes }) =>
  <VStack modes={modes} style={{ width: '100%' }}>
    {mix.map((p, i) => <MetricLegendItem key={p.name} modes={{ ...modes, 'Emphasis / DataViz': ['High', 'Medium', 'Low'][i % 3] } as Modes} label={p.name} value={`${p.share}%`} />)}
  </VStack>

const Panel = ({ children, modes = SENARY }: { children: React.ReactNode; modes?: Modes }) =>
  <div className="coin-new-host wide"><VStack modes={modes} style={{ width: '100%' }}>{children}</VStack></div>

const APPEARANCES = { Senary: SENARY, Primary: PRIMARY, Quaternary: QUATERNARY } as const

function SegmentedTrackGuide() {
  const [parts, setParts] = useState<'3 parts' | '5 parts'>('3 parts')
  const [appearance, setAppearance] = useState<keyof typeof APPEARANCES>('Senary')
  const mix = parts === '3 parts' ? MIX3 : MIX5
  const modes = APPEARANCES[appearance]

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A pill split by share',
      description: 'The track is a 24 px pill. Each slice’s width is its share of the total, and the colours step from strong to light.',
      body: <Anatomy specimenWidth={300} parts={[
        { name: 'Track', note: 'Rounds the ends and holds the slices with no gaps.', target: '[role="group"]', side: 'left' },
        { name: 'First slice', note: 'Strongest colour; its width is its share.', target: '[role="group"] > div:nth-child(1)', side: 'top' },
        { name: 'Second slice', note: 'A lighter step of the same colour.', target: '[role="group"] > div:nth-child(2)', side: 'bottom' },
        { name: 'Third slice', note: 'Lightest; the steps repeat after three slices.', target: '[role="group"] > div:nth-child(3)', side: 'top' },
      ]}><Track mix={MIX3} /></Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Shares and appearance',
      description: 'Pass each part’s share; the track works out the widths. An appearance recolours every slice. Figma and code both default to Senary gold.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Equal slices" description="Without shares every slice is the same width, as in Figma."><Panel><SegmentedTrack modes={SENARY} segments={[{}, {}, {}]} accessibilityLabel="Three equal parts" /></Panel></ExampleCard>
        <ExampleCard title="Weighted slices" description="Widths follow the shares: 60, 25, and 15."><Panel><Track mix={MIX3} /></Panel></ExampleCard>
        <ExampleCard title="Five parts" description="After three slices the colours repeat, so the legend tells them apart."><Panel><Track mix={MIX5} /><Legend mix={MIX5} /></Panel></ExampleCard>
        <ExampleCard title="Primary appearance" description="Purple steps instead of gold."><Panel modes={PRIMARY}><Track mix={MIX3} modes={PRIMARY} /></Panel></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Display only',
      description: 'Segmented Track has no hover, pressed, selected, or disabled state and can’t take focus. Only the data changes it, so pass real shares and hide the track when there are none.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="A zero share" description="A part worth 0 still draws a 1 px sliver; leave it out instead."><Panel><SegmentedTrack modes={SENARY} segments={[{ value: 0 }, { value: 60 }, { value: 40 }]} accessibilityLabel="Portfolio mix: equity 0%, debt 60%, cash 40%" /></Panel></ExampleCard>
        <ExampleCard title="No data" description="An empty list draws an empty 24 px track; hide the track instead."><Panel><SegmentedTrack modes={SENARY} segments={[]} accessibilityLabel="Portfolio mix" /></Panel></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: '24 px tall, full width',
      description: 'The track is 24 px tall with fully rounded ends and stretches to the width of its container. Slices share that width by their shares, with no gaps.',
      body: <Anatomy legend={false} specimenWidth={300} marks={[
        { kind: 'size', target: '[role="group"]', side: 'bottom', label: 'both' },
        { kind: 'size', target: '[role="group"] > div:nth-child(1)', side: 'top', label: 'both' },
      ]}><Track mix={MIX3} /></Anatomy>,
    },
    content: {
      header: 'Content', title: 'Name the mix and every part',
      description: 'The track has no text, so give it a spoken name that lists the shares, such as “Portfolio mix: equity 60%, debt 25%, cash 15%”, and put a legend with the same names next to it. Use short names in sentence case and plain percentages.',
      body: <ExampleCard title="Track with a legend"><Panel><Track mix={MIX3} /><Legend mix={MIX3} /></Panel></ExampleCard>,
    },
    context: {
      header: 'In context', title: 'A portfolio card',
      description: 'The screen works out each part’s share and passes the same list, in the same order, to the track and the legend, so their colours match. Nothing on the track is pressable; to switch between mixes, use Range Track, which adds tabs.',
      body: <div className="coin-new-context">
        <Card modes={SENARY}><VStack modes={SENARY} style={{ width: '100%' }}>
          <Text modes={SENARY}>Portfolio mix</Text>
          <Text modes={SENARY}>₹4,20,000 invested</Text>
          <Track mix={MIX3} />
          <Legend mix={MIX3} />
        </VStack></Card>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Show one whole, clearly named',
      description: 'Each pair shows a track people can read versus one that misleads them.',
      body: <div className="coin-new-stack">
        <DoDont goodTitle="Show parts of one whole" goodCaption="Equity, debt, and cash add up to the portfolio." good={<Panel><Track mix={MIX3} /><Legend mix={MIX3} /></Panel>}
          badTitle="Use it as a progress bar" badCaption="One value filling a track is a progress bar, not a split."
          bad={<Panel><Text modes={SENARY}>KYC 70% complete</Text><SegmentedTrack modes={SENARY} segments={[{ value: 70 }, { value: 30 }]} accessibilityLabel="KYC 70% complete" /></Panel>} />
        <DoDont goodTitle="Pair it with a legend" goodCaption="Each name and share sits next to its colour." good={<Panel><Track mix={MIX3} /><Legend mix={MIX3} /></Panel>}
          badTitle="Rely on colour alone" badCaption="Without a legend nobody knows which slice is which." bad={<Panel><Track mix={MIX3} /></Panel>} />
        <DoDont goodTitle="Use a data appearance" goodCaption="Senary gives three distinct golds." good={<Panel><Track mix={MIX3} /></Panel>}
          badTitle="Pick Neutral" badCaption="All three slices turn the same grey and the split disappears." bad={<Panel modes={NEUTRAL}><Track mix={MIX3} modes={NEUTRAL} /></Panel>} />
        <DoDont goodTitle="Hide it when there’s no data" goodCaption="Say so in words instead." good={<Panel><Text modes={SENARY}>No investments yet</Text></Panel>}
          badTitle="Pass an empty list" badCaption="It leaves a blank gap that says nothing about why."
          bad={<Panel><SegmentedTrack modes={SENARY} segments={[]} accessibilityLabel="Portfolio mix" /></Panel>} />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Segmented Track contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="8 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('segmentedtrack')} stories={[
        { label: 'Default', id: 'components-segmentedtrack--default' },
        { label: 'Proportional segments', id: 'components-segmentedtrack--proportional-segments' },
        { label: 'Senary', id: 'components-segmentedtrack--themed-senary' },
        { label: 'Many segments', id: 'components-segmentedtrack--many-segments' },
        { label: 'In Range Track', id: 'components-rangetrack--default' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (5 October build) from the team’s private package repository. Figma’s Segmented Track is one 268 × 24 component with three equal gold slices, the Senary appearance, which code now uses by default too. It is display-only: on the web it is a group named by its spoken name, and names given to single slices are not read out. Range Track builds on it, adding tabs and a legend. The published Storybook predates 0.1.78.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'segmentedtrack',
    corePrinciple: 'Parts of one whole, sized by their share and named in a legend.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('segmentedtrack'),
  }} playground={<>
    <div className="preview-stage">
      <Panel modes={modes}><Track mix={mix} modes={modes} /><Legend mix={mix} modes={modes} /></Panel>
      <span className="stage-label">Live Coin Segmented Track</span>
    </div>
    <div className="controls-panel">
      <Segment label="Parts" value={parts} options={['3 parts', '5 parts'] as const} onChange={setParts} />
      <Segment label="Appearance" value={appearance} options={['Senary', 'Primary', 'Quaternary'] as const} onChange={setAppearance} />
      <Readout title="Spoken name" value={spoken(mix)}>Figma and code both default to Senary gold.</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'segmentedtrack',
  label: 'Segmented Track',
  summary: 'Use a Segmented Track to show how one whole splits into a few parts, such as a portfolio’s equity, debt, and cash.',
  keywords: ['stacked bar', 'allocation bar', 'share chart', 'portfolio mix'],
  icon: <><rect x="1.5" y="6" width="15" height="6" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M9 6v6M13 6v6" stroke="currentColor" strokeWidth="1.5" /></>,
  Component: SegmentedTrackGuide,
})
