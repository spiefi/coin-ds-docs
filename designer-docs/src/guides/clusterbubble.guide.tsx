import { useState, type ComponentProps, type ReactNode } from 'react'
import { BubbleChart, ClusterBubble, HStack, Title, VStack, type BubbleDatum, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, Readout, Segment, Sources, Specimen, SpecimenRow, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4920-12956'
const STORYBOOK = docsUrl('clusterbubble')

const M = (m: Record<string, string> = {}) => ({ 'Color Mode': 'Light', ...m }) as Modes
const LIGHT = M()

type CLProps = Partial<ComponentProps<typeof ClusterBubble>>
const CL = (props: CLProps = {}) => <ClusterBubble modes={LIGHT} value="40%" label="Recommended" {...props} />

type Side = 'top' | 'right' | 'bottom' | 'left'
const PAD: Record<Side, 'paddingTop' | 'paddingRight' | 'paddingBottom' | 'paddingLeft'> = { top: 'paddingTop', right: 'paddingRight', bottom: 'paddingBottom', left: 'paddingLeft' }
/** Outside text takes no layout space, so reserve room for it on its side. */
const ROOM = (side: Side, child: ReactNode) => (
  <VStack modes={LIGHT} alignHorizontal="center" style={{ [PAD[side]]: side === 'top' || side === 'bottom' ? 64 : 104 }}>{child}</VStack>
)

const SMALL = { size: 64, value: '₹270K', label: 'Equity' }

const R = (name: string) => `[aria-label="${name}"]`
const C = (name: string) => `${R(name)} > div > div:first-child`
const VALUE = (name: string) => `${C(name)} > div > :first-child`
const LABEL = (name: string) => `${C(name)} > div > :last-child`
const O = (name: string) => `${R(name)} > div > div:nth-child(2)`

const p = (id: string, value: number, label: string): BubbleDatum => ({ id, value, display: `${value}%`, label })
const SPLIT3: BubbleDatum[] = [p('equity', 60, 'Equity'), p('debt', 30, 'Debt'), p('gold', 10, 'Gold')]

const APPEARANCES = ['Primary', 'Secondary', 'Tertiary', 'Quaternary', 'Quinary', 'Senary', 'Neutral']
const DIRECTIONS: { d: Side; lesson: string }[] = [
  { d: 'top', lesson: 'Above the circle.' },
  { d: 'right', lesson: 'To the right.' },
  { d: 'bottom', lesson: 'Below: the default.' },
  { d: 'left', lesson: 'To the left.' },
]

type Size = '64' | '88' | '120' | '200'
type Placement = 'auto' | 'inside' | 'outside'
type Emphasis = 'High' | 'Medium' | 'Low'

function ClusterBubbleGuide() {
  const [size, setSize] = useState<Size>('120')
  const [placement, setPlacement] = useState<Placement>('auto')
  const [emphasis, setEmphasis] = useState<Emphasis>('High')
  const [presses, setPresses] = useState(0)

  const px = Number(size)
  const outside = placement === 'outside' || (placement === 'auto' && px < 88)
  const live = CL({ size: px, labelPlacement: placement, modes: M({ 'Emphasis / DataViz': emphasis }) })
  const readout = placement === 'auto'
    ? (px >= 88 ? `Inside: ${px} px is 88 or more` : `Outside: ${px} px is under 88`)
    : placement === 'inside' ? 'Inside, as set' : 'Outside, as set'
  const N = '40%, Recommended'
  const S = '₹270K, Equity'

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A circle with a value and a label',
      description: 'The value sits over its label in the middle of the circle. Below 88 px the two move outside, where there’s room to read them.',
      body: <Anatomy parts={[
        { name: 'Circle', note: 'size sets it; appearance and Emphasis / DataViz colour it.', target: C(N), side: 'left' },
        { name: 'Value', note: 'value in bold; inside the circle it grows with the size.', target: VALUE(N), side: 'top' },
        { name: 'Label', note: 'label under the value, up to two lines.', target: LABEL(N), side: 'right' },
      ]}>{CL({ size: 159 })}</Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Colour, then where the text goes',
      description: 'appearance picks one of seven data-viz colours, and the Emphasis / DataViz mode how strong it is; without appearance, the Appearance / DataViz mode picks the colour. labelPlacement auto puts the text inside bubbles of 88 px or more and outside smaller ones, and labelDirection picks the side. The Text Appearance mode colours outside text.',
      body: <div className="coin-new-stack">
        <ExampleCard title="appearance" description="Primary, Secondary, Tertiary, Quaternary, Quinary, Senary, and Neutral.">
          <HStack modes={LIGHT} wrap justifyHorizontal="center" style={{ width: "100%" }}>{APPEARANCES.map(a => <ClusterBubble key={a} modes={LIGHT} value="40%" label={a} size={88} appearance={a} />)}</HStack>
        </ExampleCard>
        <div className="coin-new-example-grid three">
          <ExampleCard title="Emphasis High" description="The full colour.">{CL({})}</ExampleCard>
          <ExampleCard title="Emphasis Medium" description="Lighter, with black text.">{CL({ modes: M({ 'Emphasis / DataViz': 'Medium' }) })}</ExampleCard>
          <ExampleCard title="Emphasis Low" description="Palest, for the least important.">{CL({ modes: M({ 'Emphasis / DataViz': 'Low' }) })}</ExampleCard>
        </div>
        <div className="coin-new-example-grid">
          <ExampleCard title="auto, small" description="At 64 px the text goes outside.">{ROOM('bottom', CL(SMALL))}</ExampleCard>
          <ExampleCard title="inside" description="Forced inside, the text shrinks to 13 and 10 px.">{CL({ size: 64, value: '₹2', label: 'Min', labelPlacement: 'inside' })}</ExampleCard>
          <ExampleCard title="outside" description="Forced outside, even on a big bubble.">{ROOM('bottom', CL({ size: 140, labelPlacement: 'outside' }))}</ExampleCard>
          <ExampleCard title="Text Appearance" description="Outside text in purple.">{ROOM('bottom', CL({ ...SMALL, modes: M({ 'Text Appearance': 'Secondary' }) }))}</ExampleCard>
        </div>
        <div className="coin-new-example-grid">
          {DIRECTIONS.map(({ d, lesson }) => <ExampleCard key={d} title={d} description={lesson}>{ROOM(d, CL({ ...SMALL, labelPlacement: 'outside', labelDirection: d }))}</ExampleCard>)}
        </div>
      </div>,
    },
    states: {
      header: 'States', title: 'Pressable, with no selected look',
      description: 'Give onPress and the bubble becomes a button that dims a little while it’s pressed. It has no selected or disabled look, so show what people picked somewhere else on the screen.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Not pressable" description="Without onPress it’s an image, read out as “40%, Recommended”.">{CL({})}</ExampleCard>
        <ExampleCard title="onPress" description="Press it: it dims, then counts.">
          {CL({ onPress: () => setPresses(n => n + 1) })}
          <p className="coin-new-readout" role="status">{presses === 0 ? 'Not pressed yet' : presses === 1 ? 'Pressed 1 time' : `Pressed ${presses} times`}</p>
        </ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'The size sets the text inside',
      description: 'size is the circle’s diameter: 120 px by default, where Figma draws 159. Inside, the value is 17 % of the size and the label 8.5 %, between 13 and 48 px and between 10 and 18 px, so 20 and 10 px at 120. Outside text is 24 and 14 px at any size, labelGap (8 px) from the circle, and takes no space, so leave room for it.',
      body: <Anatomy legend={false} marks={[
        { kind: 'size', target: C(N), side: 'top', label: 'both' },
        { kind: 'size', target: C(S), side: 'top', label: 'both' },
        { kind: 'gap', from: C(S), to: O(S) },
      ]}>
        <SpecimenRow>
          <Specimen caption="Inside, 120 px">{CL({})}</Specimen>
          <Specimen caption="Outside, 64 px">{ROOM('bottom', CL(SMALL))}</Specimen>
        </SpecimenRow>
      </Anatomy>,
    },
    content: {
      header: 'Content', title: 'A figure and a word or two',
      description: 'Make value the figure people compare, such as 40% or ₹270K, and label what it’s for in a word or two. Inside the circle each line stops at two lines and ends in an ellipsis, and text wider than the circle runs into its edge.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Short" description="Room to spare at 120 px.">{CL({ label: 'Equity' })}</ExampleCard>
        <ExampleCard title="Too long" description="The value fills the circle edge to edge, and the label wraps.">{CL({ size: 88, value: '₹12,45,000', label: 'Large and mid cap funds' })}</ExampleCard>
      </div>,
    },
    context: {
      header: 'In context', title: 'Inside a Bubble Chart',
      description: 'Bubble Chart lays out one Cluster Bubble per item and sizes each by its share, so use it for a split of several parts and a single Cluster Bubble for one figure. Each item’s display text, label, and appearance become its bubble’s value, label, and colour.',
      body: <div className="coin-new-context">
        <VStack modes={{ Background: 'True', Padding: 'None', 'Slot gap': 'XS' } as Modes}>
          <Title title="Your portfolio" subtitle="₹4.2L invested · 3 asset classes" />
          <VStack modes={{ 'Stack Context': 'Nested', Padding: 'Default', 'Slot gap': 'M' } as Modes}>
            <BubbleChart data={SPLIT3} accessibilityLabel="Portfolio split by asset class" />
          </VStack>
        </VStack>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'The right colour, readable text',
      description: 'Each pair shows a bubble that reads as intended next to one that quietly goes wrong.',
      body: <div className="coin-new-stack">
        <DoDont goodTitle="An appearance from the list" goodCaption="“Secondary” gives magenta." good={CL({ appearance: 'Secondary', label: 'Secondary' })}
          badTitle="A misspelt appearance" badCaption="appearance takes any text, so “secondary” falls back to Primary purple." bad={CL({ appearance: 'secondary', label: 'secondary' })} />
        <DoDont goodTitle="Outside text on a small bubble" goodCaption="At 64 px the figure sits below, readable." good={ROOM('bottom', CL(SMALL))}
          badTitle="Inside text on a tiny bubble" badCaption="At 32 px the value spills over the rim." bad={CL({ size: 32, value: '2%', label: undefined, labelPlacement: 'inside' })} />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Cluster Bubble contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="28 October 2026" figmaUrl={FIGMA} storybookUrl={STORYBOOK} stories={[
        { label: 'Default', id: 'components-clusterbubble--default' },
        { label: 'Label outside', id: 'components-clusterbubble--label-outside' },
        { label: 'Label directions', id: 'components-clusterbubble--label-directions' },
        { label: 'Appearances', id: 'components-clusterbubble--appearances' },
        { label: 'Emphasis', id: 'components-clusterbubble--emphasis' },
        { label: 'Pressable', id: 'components-clusterbubble--pressable' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (27 October build of Biscuit’s main) from the team’s private package repository. Figma’s clusterBubble has <code>Property 1</code>: Default, a 159 px circle with 20 px white text, and Freeform, a 33 px dot with black text beside it and a slot. The package has <code>labelPlacement</code> instead. It defaults to 120 px and scales the inside text with the circle, at weight 700 with no gap, and it centres outside text on one side, outside its layout. <code>appearance</code> takes any text and falls back to Primary when it doesn’t match (reported).</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'clusterbubble',
    corePrinciple: 'The number first, sized so people can read it.',
    figmaUrl: FIGMA, storybookUrl: STORYBOOK,
  }} playground={<>
    <div className="preview-stage">
      {outside ? ROOM('bottom', live) : live}
      <span className="stage-label">Live Coin Cluster Bubble</span>
    </div>
    <div className="controls-panel">
      <Segment label="size" value={size} options={['64', '88', '120', '200'] as const} onChange={setSize} />
      <Segment label="labelPlacement" value={placement} options={['auto', 'inside', 'outside'] as const} onChange={setPlacement} />
      <Segment label="Emphasis / DataViz" value={emphasis} options={['High', 'Medium', 'Low'] as const} onChange={setEmphasis} />
      <Readout title="Text" value={readout} />
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'clusterbubble',
  label: 'Cluster Bubble',
  summary: 'Use a Cluster Bubble to show one figure, such as a share or an amount, in a coloured data-viz circle with a short label.',
  keywords: ['bubble', 'data bubble', 'percentage circle', 'stat circle'],
  icon: <><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M6.5 8h5M7.5 11h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /></>,
  Component: ClusterBubbleGuide,
})
