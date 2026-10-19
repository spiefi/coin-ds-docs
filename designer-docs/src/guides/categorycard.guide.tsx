import { useState } from 'react'
import { CategoryCard, HStack, IconCapsule, Title, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, Segment, Sources, byTestId, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=7659-4398'
const LIGHT = { 'Color Mode': 'Light' } as Modes
const m = (o: Record<string, string>) => ({ ...LIGHT, ...o } as Modes)
const noop = () => {}

const ART: Record<string, string> = {
  Gold: 'ic_rupee_coin', Loans: 'ic_loans', Savings: 'ic_savings', Insurance: 'ic_insurance', 'Mutual funds': 'ic_graph_increasing',
}

type CCProps = Partial<React.ComponentProps<typeof CategoryCard>>
const CC = (o: CCProps = {}, key?: string) => {
  const label = o.label ?? 'Gold'
  return <CategoryCard key={key} label="Gold" badge="New" modes={LIGHT} onPress={noop}
    imageSlot={<IconCapsule iconName={ART[label]} />} {...o} />
}

const A = byTestId('cc-anatomy')
const S = byTestId('cc-size')

const LABELS = ['Gold', 'Insurance', 'Mutual funds'] as const
const BADGES = ['None', 'New', 'Hot'] as const
const RAIL = [
  { label: 'Gold', badge: 'New' },
  { label: 'Loans', badge: undefined },
  { label: 'Savings', badge: undefined },
  { label: 'Insurance', badge: 'Hot' },
]

function CategoryCardGuide() {
  const [label, setLabel] = useState<(typeof LABELS)[number]>('Gold')
  const [badge, setBadge] = useState<(typeof BADGES)[number]>('New')
  const [active, setActive] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [presses, setPresses] = useState(0)
  const [selected, setSelected] = useState('Gold')

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A badge, a picture, and a label',
      description: 'A 60 px white tile stacks a square picture over a one-line label, with an optional badge on its top edge. Here a Coin Icon Capsule in imageSlot stands in for your category art.',
      body: <Anatomy parts={[
        { name: 'Badge', note: 'Optional: badge sets one short word, cut off past 38 px.', target: `${A} > div:first-child > div`, side: 'top' },
        { name: 'Image', note: 'imageSource fills a 36 px square; imageSlot takes any node instead, as here.', target: `${A} > div:nth-child(2)`, side: 'left' },
        { name: 'Label', note: '12 px on one line; by default a longer label spills past both edges.', target: `${A} > [dir="auto"]`, side: 'bottom' },
        { name: 'Card', note: 'A white tile, 60 px wide, whose 1 px border turns gold when active.', target: A, side: 'right' },
      ]}>
        {CC({ testID: 'cc-anatomy' })}
      </Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Badge and brand colour',
      description: 'badge adds a short tag on the card’s top edge; leave it out for none. AppearanceBrand colours the badge, Tertiary blue by default, and anything in imageSlot gets the same modes, so the Icon Capsule follows it. Emphasis Medium or Low makes the badge pale. Radius rounds the corners of the default image only. The card’s surface, border, and label look the same in every mode.',
      body: <div className="coin-new-example-grid three">
        <ExampleCard title="No badge" description="Leave badge out: just the picture and the label.">{CC({ badge: undefined })}</ExampleCard>
        <ExampleCard title="Tertiary" description="The default: a blue badge, as in Figma.">{CC()}</ExampleCard>
        <ExampleCard title="Primary" description="Gold for the badge and the capsule.">{CC({ modes: m({ AppearanceBrand: 'Primary' }) })}</ExampleCard>
        <ExampleCard title="Secondary" description="Purple for the badge and the capsule.">{CC({ modes: m({ AppearanceBrand: 'Secondary' }) })}</ExampleCard>
        <ExampleCard title="Neutral" description="Dark grey, for a quieter rail.">{CC({ modes: m({ AppearanceBrand: 'Neutral' }) })}</ExampleCard>
        <ExampleCard title="Emphasis Low" description="A pale badge; the capsule drops its fill.">{CC({ modes: m({ Emphasis: 'Low' }) })}</ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Idle, active, and disabled',
      description: 'active turns the border gold on the category that’s showing. The card keeps no state of its own: the screen sets active on one card and moves it in onPress. A pressed card dims to 85 %; disabled dims it to half and stops onPress.',
      body: <div className="coin-new-example-grid three">
        <ExampleCard title="Idle" description="The default: a light grey border.">{CC({ label: 'Loans', badge: undefined })}</ExampleCard>
        <ExampleCard title="Active" description="A gold border marks the category that’s showing.">{CC({ label: 'Loans', badge: undefined, active: true })}</ExampleCard>
        <ExampleCard title="Disabled" description="Half opacity, and onPress isn’t called.">{CC({ label: 'Loans', badge: undefined, disabled: true })}</ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: '60 px wide, as tall as its content',
      description: 'The card is 60 px wide unless you set width, and as tall as its content: 4 px padding, the picture, a 6 px gap, and a 16 px label line. With the default 36 px image it’s 68 px tall; the 42 px capsule here makes it 74. A badge sits 11 px above the card, and every card keeps that room in its layout, with or without a badge.',
      body: <div className="coin-new-stack">
        <Anatomy legend={false} marks={[
          { kind: 'size', target: S, side: 'bottom', label: 'both' },
          { kind: 'padding', target: S },
          { kind: 'gap', from: `${S} > div:first-child`, to: `${S} > [dir="auto"]` },
        ]}>
          {CC({ testID: 'cc-size', badge: undefined })}
        </Anatomy>
        <div className="coin-new-example-grid">
          <ExampleCard title="60 px, the default" description="“Mutual funds” is wider than the card and spills.">{CC({ label: 'Mutual funds', badge: undefined })}</ExampleCard>
          <ExampleCard title="width={80}" description="A wider card holds the label; give every card in a rail the same width.">{CC({ label: 'Mutual funds', badge: undefined, width: 80 })}</ExampleCard>
        </div>
      </div>,
    },
    content: {
      header: 'Content', title: 'One or two short words',
      description: 'Name the category in a word or two, and keep the badge to one short word that doesn’t repeat it. A label wider than the card spills past both edges by default. singleLine={false} wraps it onto two lines and makes that card taller; add disableTruncation={false} as well for one line that ends in an ellipsis, as Figma shows.',
      body: <div className="coin-new-example-grid three">
        <ExampleCard title="Spills, the default" description="One line, wider than the card.">{CC({ label: 'Mutual funds', badge: undefined })}</ExampleCard>
        <ExampleCard title="Wraps" description="Two lines; this card grows 16 px taller.">{CC({ label: 'Mutual funds', badge: undefined, singleLine: false })}</ExampleCard>
        <ExampleCard title="Ellipsis" description="One line, cut to the card’s width.">{CC({ label: 'Mutual funds', badge: undefined, singleLine: false, disableTruncation: false })}</ExampleCard>
      </div>,
    },
    context: {
      header: 'In context', title: 'A category rail on the Invest screen',
      description: 'The screen keeps the selected category and sets active on that card; each card’s onPress selects it. Every card keeps 11 px above it for a badge, so cards with and without one line up in the rail.',
      body: <div className="coin-new-context">
        <VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes}>
          <Title title="Invest" subtitle="Pick a category" modes={LIGHT} />
          <HStack modes={LIGHT}>
            {RAIL.map(c => CC({
              label: c.label, badge: c.badge, active: selected === c.label, onPress: () => setSelected(c.label),
            }, c.label))}
          </HStack>
        </VStack>
        <p className="coin-new-readout" role="status">Showing {selected}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Short words, one active card',
      description: 'Each pair shows a rail people scan at a glance next to one that spills, clips, or marks two categories at once.',
      body: <div className="coin-new-stack">
        <DoDont
          good={CC({ badge: undefined })}
          bad={CC({ label: 'Mutual funds', badge: undefined })}
          goodTitle="Keep the label short" goodCaption="“Gold” sits inside the card."
          badTitle="Write a long label" badCaption="“Mutual funds” spills past both edges of the card." />
        <DoDont
          good={CC()}
          bad={CC({ badge: 'Limited offer' })}
          goodTitle="One short badge word" goodCaption="“New” fits the badge."
          badTitle="Write a long badge" badCaption="“Limited offer” is cut to a few letters." />
        <DoDont
          good={<HStack modes={LIGHT}>{CC({ active: true })}{CC({ label: 'Loans', badge: undefined })}</HStack>}
          bad={<HStack modes={LIGHT}>{CC({ active: true })}{CC({ label: 'Loans', badge: undefined, active: true })}</HStack>}
          goodTitle="Mark one card active" goodCaption="One gold border shows the category on screen."
          badTitle="Mark several cards active" badCaption="Two gold borders leave people unsure which category is showing." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Category Card contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="19 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('categorycard')} stories={[
        { label: 'Default', id: 'components-categorycard--default' },
        { label: 'Active', id: 'components-categorycard--active' },
        { label: 'Long label', id: 'components-categorycard--long-label' },
        { label: 'Without badge', id: 'components-categorycard--without-badge' },
        { label: 'Image slot', id: 'components-categorycard--image-slot' },
        { label: 'Horizontal rail', id: 'components-categorycard--horizontal-rail' },
        { label: 'Disabled', id: 'components-categorycard--disabled' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code>, built from Biscuit’s main at c7d3348 (19 October) and taken from the team’s private package repository. Figma’s Category Card has a State variant (Idle, Active) and a badge on or off; in code, active and the badge text are props. Without an image the card shows a plain light square, so these examples put a Coin Icon Capsule in imageSlot. The label’s font token is spelt “Jio Type Var”, so the label shows in a fallback serif font until the token is fixed. Figma ends a long label in an ellipsis; the package lets it spill unless you change singleLine and disableTruncation. Every card keeps 11 px above it for a badge, so a rail lines up with or without badges, and on the web the active card is announced as pressed. The published Storybook still shows the older generated page.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'categorycard',
    corePrinciple: 'One picture, one word, one tap.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('categorycard'),
  }} playground={<>
    <div className="preview-stage">
      {CC({
        label, badge: badge === 'None' ? undefined : badge, active, disabled,
        onPress: () => setPresses(n => n + 1),
      })}
      <span className="stage-label">Live Coin Category Card</span>
    </div>
    <div className="controls-panel">
      <Segment label="Label" value={label} options={LABELS} onChange={setLabel} />
      <Segment label="Badge" value={badge} options={BADGES} onChange={setBadge} />
      <OnOff label="Active" value={active} onChange={setActive} />
      <OnOff label="Disabled" value={disabled} onChange={setDisabled} />
      <Readout title="onPress" value={presses === 0 ? 'Not pressed yet' : `Pressed ${presses} ${presses === 1 ? 'time' : 'times'}`}>
        A disabled card doesn’t call onPress.
      </Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'categorycard',
  label: 'Category Card',
  summary: 'Use a Category Card for one category in a horizontal rail: a picture, a one- or two-word label, and an optional badge.',
  keywords: ['category tile', 'category rail', 'card tab', 'product category', 'filter tile'],
  icon: <><rect x="4" y="2.5" width="10" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" /><circle cx="9" cy="7.5" r="2.25" stroke="currentColor" strokeWidth="1.5" /><path d="M6.5 12.5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>,
  Component: CategoryCardGuide,
})
