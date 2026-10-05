import { useState } from 'react'
import { Button, Card, Slider, Text, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, Segment, Sources, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const LIGHT = { 'Color Mode': 'Light' } as Modes
const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=5373-446'
const FORMAT = { style: 'currency', currency: 'INR', maximumFractionDigits: 0 } as const
const SIP = { minValue: 500, maxValue: 50000, step: 500, formatOptions: FORMAT, locale: 'en-IN', accessibilityLabel: 'Monthly SIP amount', modes: LIGHT }
const TENURE = { minValue: 1, maxValue: 30, formatValue: (v: number) => v === 1 ? '1 year' : `${v} years`, accessibilityLabel: 'Loan tenure', modes: LIGHT }
const money = (v: number) => new Intl.NumberFormat('en-IN', FORMAT).format(v)

const Room = ({ children }: { children: React.ReactNode }) => <VStack modes={LIGHT} style={{ width: '100%', paddingTop: 48 }}>{children}</VStack>
const Host = ({ children }: { children: React.ReactNode }) => <div className="coin-new-host wide">{children}</div>
const Titled = ({ children }: { children: React.ReactNode }) => <VStack modes={LIGHT} style={{ width: '100%' }}><Text modes={LIGHT}>Monthly SIP amount</Text>{children}</VStack>

function SliderGuide() {
  const [value, setValue] = useState(5000)
  const [always, setAlways] = useState(true)
  const [labels, setLabels] = useState(true)
  const [disabled, setDisabled] = useState(false)
  const [sip, setSip] = useState(5000)
  const [started, setStarted] = useState(false)

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'Track, fill, handle, and value',
      description: 'A 4 px track fills in gold up to a 20 px handle. The value bubble floats above the handle and the range’s ends sit below. In 0.1.78 the bubble shows as a narrow black block without its value; in Figma it is a rounded label.',
      body: <Anatomy specimenWidth={300} parts={[
        { name: 'Fill', note: 'Gold from the minimum up to the value.', target: '[role="slider"] > div:nth-child(2)', side: 'left' },
        { name: 'Track', note: 'Pale gold: the rest of the range.', target: '[role="slider"] > div:nth-child(1)', side: 'right' },
        { name: 'Handle', note: 'Drag it, or tap anywhere on the track.', target: '[role="slider"] > div:nth-child(3)', side: 'bottom' },
        { name: 'Value bubble', note: 'Shows the value above the handle.', target: '[role="slider"] > div:nth-child(4)', side: 'top' },
        { name: 'End labels', note: 'The minimum and maximum, in the value’s format.', target: '[role="slider"] + div', side: 'bottom', at: 0.9 },
      ]}><Room><Slider {...SIP} defaultValue={15000} /></Room></Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Range, step, format, and what shows',
      description: 'Set the range, the step values snap to, and how the value is written. The bubble can stay visible or appear only while dragging, and the end labels can be hidden.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Currency range" description="Values snap to ₹500 steps and read as rupees."><Host><Room><Slider {...SIP} defaultValue={5000} /></Room></Host></ExampleCard>
        <ExampleCard title="Custom format" description="A format function writes “10 years”; make it say “1 year” too."><Host><Room><Slider {...TENURE} defaultValue={10} /></Room></Host></ExampleCard>
        <ExampleCard title="Bubble while dragging" description="The value appears only while dragging or hovering, so show it elsewhere too."><Host><Slider {...SIP} defaultValue={5000} alwaysShowTooltip={false} /></Host></ExampleCard>
        <ExampleCard title="Without end labels" description="Hide the ends only when the screen states the range nearby."><Host><Room><Slider {...SIP} defaultValue={5000} showLabels={false} /></Room></Host></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Enabled and disabled',
      description: 'Disable a slider only while its value can’t change, and say why nearby. There is no hover, pressed, or error style.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Enabled" description="Gold fill and handle; drag, tap, or use the arrow keys."><Host><Room><Slider {...SIP} defaultValue={5000} /></Room></Host></ExampleCard>
        <ExampleCard title="Disabled" description="Dimmed to 50%; it keeps its value but can’t be changed."><Host><Room><Slider {...SIP} defaultValue={5000} isDisabled /></Room></Host></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'Full width, 61 px tall, room above',
      description: 'Slider fills its container and is 61 px tall with its end labels: 8 px of padding, a 20 px handle row, 16 px, then the labels. The bubble floats about 40 px above it and takes no space, so keep that area clear.',
      body: <Anatomy legend={false} specimenWidth={300} marks={[
        { kind: 'size', target: ':scope > div', side: 'left', label: 'both' },
        { kind: 'size', target: '[role="slider"] > div:nth-child(3)', side: 'top', label: 'both' },
        { kind: 'gap', from: '[role="slider"]', to: '[role="slider"] + div' },
        { kind: 'padding', target: ':scope > div' },
      ]}><Slider {...SIP} defaultValue={15000} alwaysShowTooltip={false} /></Anatomy>,
    },
    content: {
      header: 'Content', title: 'Name it, and write the value as people say it',
      description: 'A Slider has no label of its own, so put a title above it and use the same words as its spoken name. Write the value as people read it, such as ₹5,000 or 10 years; the end labels follow the same format.',
      body: <ExampleCard title="Loan tenure"><Host><VStack modes={LIGHT} style={{ width: '100%' }}>
        <Text modes={LIGHT}>Loan tenure</Text><Room><Slider {...TENURE} defaultValue={10} /></Room>
      </VStack></Host></ExampleCard>,
    },
    context: {
      header: 'In context', title: 'A SIP amount card',
      description: 'The heading shows the chosen amount, so the bubble appears only while dragging. The screen keeps the value and saves it when the person starts the SIP.',
      body: <div className="coin-new-context">
        <Card modes={LIGHT}><VStack modes={LIGHT} style={{ width: '100%' }}>
          <Text modes={LIGHT}>Monthly SIP amount</Text>
          <Text modes={LIGHT}>{money(sip)}</Text>
          <Slider {...SIP} alwaysShowTooltip={false} value={sip} onChange={v => { setSip(v); setStarted(false) }} />
          <Button modes={LIGHT} label="Start SIP" onPress={() => setStarted(true)} />
        </VStack></Card>
        <p className="coin-new-readout" role="status">{started ? `SIP started: ${money(sip)} a month` : `${money(sip)} a month`}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Make the value easy to read and reach',
      description: 'Each pair shows a slider people can use versus one that trips them up.',
      body: <div className="coin-new-stack">
        <DoDont goodTitle="Write the value as money" goodCaption="₹500 and ₹50,000 read as amounts." good={<Host><Room><Slider {...SIP} defaultValue={5000} /></Room></Host>}
          badTitle="Show raw numbers" badCaption="500 and 50,000 could be anything."
          bad={<Host><Room><Slider modes={LIGHT} minValue={500} maxValue={50000} step={500} defaultValue={5000} accessibilityLabel="Monthly SIP amount" /></Room></Host>} />
        <DoDont goodTitle="Leave room for the bubble" goodCaption="The value floats in clear space under the title."
          good={<Host><Titled><Room><Slider {...SIP} defaultValue={5000} /></Room></Titled></Host>}
          badTitle="Put the title right above it" badCaption="The floating bubble covers the title."
          bad={<Host><Titled><Slider {...SIP} defaultValue={5000} /></Titled></Host>} />
        <DoDont goodTitle="Use it for a wide range" goodCaption="Dragging across ₹500 to ₹50,000 is quick." good={<Host><Room><Slider {...SIP} defaultValue={5000} /></Room></Host>}
          badTitle="Use it for a few fixed choices" badCaption="Three positions read better as Radios."
          bad={<Host><Room><Slider modes={LIGHT} minValue={1} maxValue={3} defaultValue={2} formatValue={v => ['Low', 'Medium', 'High'][v - 1]} accessibilityLabel="Risk level" /></Room></Host>} />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Slider contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="5 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('slider')} stories={[
        { label: 'Default', id: 'components-slider--default' }, { label: 'Currency format', id: 'components-slider--currency-format' },
        { label: 'Bubble on interaction', id: 'components-slider--tooltip-on-interaction' },
        { label: 'Without labels', id: 'components-slider--without-labels' }, { label: 'Disabled', id: 'components-slider--disabled' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> from the team’s private package repository. Figma’s Slider is 294 × 44; the package is 61 px tall because its handle row is 20 px. In 0.1.78 the value bubble reads two tokens that don’t exist, so it has no width or rounded corners; Figma shows a rounded black label. On the web the slider has a name and works with the arrow, Page Up and Down, Home, and End keys, but its value and disabled state are not announced. The published Storybook predates 0.1.78.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'slider',
    corePrinciple: 'A rough value, chosen by dragging, with the range in view.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('slider'),
  }} playground={<>
    <div className="preview-stage">
      <Host><Room><Slider {...SIP} value={value} onChange={setValue} alwaysShowTooltip={always} showLabels={labels} isDisabled={disabled} /></Room></Host>
      <span className="stage-label">Live Coin Slider</span>
    </div>
    <div className="controls-panel">
      <Segment label="Value bubble" value={always ? 'Always' : 'While dragging'} options={['Always', 'While dragging'] as const} onChange={v => setAlways(v === 'Always')} />
      <OnOff label="End labels" value={labels} onChange={setLabels} />
      <OnOff label="Disabled" value={disabled} onChange={setDisabled} />
      <Readout title="Monthly SIP amount" value={money(value)}>{disabled ? 'Disabled sliders keep their value but ignore drags and keys.' : 'Drag, tap the track, or use the arrow keys.'}</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'slider',
  label: 'Slider',
  summary: 'Use a Slider to pick a value from a wide range by dragging, such as a monthly SIP amount or a loan tenure.',
  keywords: ['range', 'amount picker', 'seek bar'],
  icon: <><path d="M2 9h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="7" cy="9" r="2.6" fill="currentColor" /></>,
  Component: SliderGuide,
})
