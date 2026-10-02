import { useState } from 'react'
import { Card, HStack, Text, ValueBackMetric, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, Segment, Sources, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const LIGHT = { 'Color Mode': 'Light' } as Modes
const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=7581-1460'
const PROGRAMMES = ['JioPoints', 'Cashback'] as const
const BRANDS = ['Primary', 'Secondary', 'Neutral', 'Tertiary'] as const
const JIOPOINTS = { title: 'JioPoints', value: '1,240', caption: 'Earn 10 points with UPI', linkLabel: 'Earn' }
const CASHBACK = { title: 'Cashback', value: '₹120', caption: 'Credited monthly', linkLabel: 'View' }
const noop = () => {}

type CardProps = React.ComponentProps<typeof ValueBackMetric>

function Metric(props: CardProps) {
  return <ValueBackMetric modes={LIGHT} onLinkPress={props.linkLabel ? noop : undefined} {...props} />
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="coin-new-row">{children}</div>
}

function ValueBackMetricGuide() {
  const [programme, setProgramme] = useState<(typeof PROGRAMMES)[number]>('JioPoints')
  const [caption, setCaption] = useState(true)
  const [cta, setCta] = useState(true)
  const [brand, setBrand] = useState<(typeof BRANDS)[number]>('Primary')
  const [lastAction, setLastAction] = useState('None yet')
  const [status, setStatus] = useState('Nothing opened yet')
  const card = programme === 'JioPoints' ? JIOPOINTS : CASHBACK

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'Programme, amount, and a next step',
      description: 'A left-aligned stack with the programme’s icon and name, the amount, a short caption, and a purple call to action. It has no surface or padding of its own.',
      body: <Anatomy parts={[
        { name: 'Header', note: 'Programme icon and name; always shown.', target: ':scope > div > div:first-child', side: 'left' },
        { name: 'Value', note: 'The amount, in the largest type.', target: ':scope > div > div:nth-child(2) > div:first-child', side: 'right' },
        { name: 'Caption', note: 'One short line on how to earn or when it’s credited.', target: ':scope > div > div:nth-child(2) > div:last-child', side: 'right' },
        { name: 'Call to action', note: 'One purple verb, such as Earn.', target: '[role="link"]', side: 'bottom' },
      ]}>
        <Metric {...JIOPOINTS} />
      </Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Show only what helps',
      description: 'The header always shows. Add the value, caption, and call to action as the card needs them; each disappears when left out. The icon colour changes only the icon.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Full" description="Balance, how to earn, and the next step."><Row><Metric {...JIOPOINTS} /></Row></ExampleCard>
        <ExampleCard title="Without call to action" description="Informational; the next step lives elsewhere on the screen."><Row><Metric {...JIOPOINTS} linkLabel={undefined} onLinkPress={undefined} /></Row></ExampleCard>
        <ExampleCard title="Without caption" description="When the amount speaks for itself."><Row><Metric {...JIOPOINTS} caption={undefined} /></Row></ExampleCard>
        <ExampleCard title="Icon colour" description="Retints only the icon; the amount and Earn keep their colours."><Row><Metric {...JIOPOINTS} modes={{ ...LIGHT, AppearanceBrand: 'Secondary' } as Modes} /></Row></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Static or pressable',
      description: 'By default only the call to action responds. Add a press action to the card when it should open the programme; Earn keeps its own action.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Static" description="Only Earn responds to a press."><Row><Metric {...JIOPOINTS} /></Row></ExampleCard>
        <ExampleCard title="Pressable" description="The whole card opens the programme; Earn still runs its own action."><Row><Metric {...JIOPOINTS} onPress={noop} /></Row></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'As wide as its longest line, at least 82 px tall',
      description: 'The card is as wide as its longest line and at least 82 px tall, with no padding. Text does not wrap, so keep each line short in narrow columns.',
      body: <Anatomy legend={false} marks={[{ kind: 'size', target: ':scope > div', side: 'right', label: 'both' }]}>
        <Metric {...JIOPOINTS} />
      </Anatomy>,
    },
    content: {
      header: 'Content', title: 'Programme, amount, one verb',
      description: 'Use the programme name as the title, put the countable amount in the value, keep the caption to one short sentence, and make the call to action one verb in sentence case, such as Earn, View, or Claim.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="JioPoints"><Row><Metric {...JIOPOINTS} /></Row></ExampleCard>
        <ExampleCard title="Cashback"><Row><Metric {...CASHBACK} /></Row></ExampleCard>
      </div>,
    },
    context: {
      header: 'In context', title: 'Rewards on the home screen',
      description: 'Place one programme per card, side by side, with a distinct verb on each. The screen opens the programme when a call to action is pressed.',
      body: <div className="coin-new-context">
        <Card modes={LIGHT}><VStack modes={LIGHT}>
          <Text modes={LIGHT}>Your rewards</Text>
          <HStack modes={LIGHT} justifyHorizontal="space-around" wrap>
            <Metric {...JIOPOINTS} onLinkPress={() => setStatus('Earn JioPoints opened')} />
            <Metric {...CASHBACK} onLinkPress={() => setStatus('Cashback history opened')} />
          </HStack>
        </VStack></Card>
        <p className="coin-new-readout" role="status">{status}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Keep it a clear rewards card',
      description: 'Each pair shows a card people understand versus one that confuses them.',
      body: <div className="coin-new-stack">
        <DoDont goodTitle="Name the programme and show an amount" goodCaption="People can tell what the number is for." good={<Row><Metric {...JIOPOINTS} /></Row>}
          badTitle="Keep the placeholder" badCaption="“Value” is the Figma placeholder, not product copy." bad={<Row><Metric {...JIOPOINTS} value="Value" /></Row>} />
        <DoDont goodTitle="Use one verb" goodCaption="Earn says what happens next." good={<Row><Metric {...JIOPOINTS} /></Row>}
          badTitle="Write a vague call to action" badCaption="“Click here” says nothing about what happens." bad={<Row><Metric {...JIOPOINTS} linkLabel="Click here" /></Row>} />
        <DoDont goodTitle="Use it for rewards" goodCaption="JioPoints and cashback are earn-and-redeem programmes." good={<Row><Metric {...CASHBACK} /></Row>}
          badTitle="Use it for an account balance" badCaption="A savings balance is not a rewards programme." bad={<Row><Metric title="JioPoints" value="₹54,200" caption="Savings balance" linkLabel="Earn" /></Row>} />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Value Back Metric contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="1 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('valuebackmetric')} stories={[
        { label: 'Default', id: 'components-valuebackmetric--default' },
        { label: 'No link', id: 'components-valuebackmetric--no-link' },
        { label: 'No caption', id: 'components-valuebackmetric--no-caption' },
        { label: 'Brand appearance', id: 'components-valuebackmetric--brand-appearance' },
        { label: 'Card row', id: 'components-valuebackmetric--card-row' },
        { label: 'Pressable card', id: 'components-valuebackmetric--pressable-card' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.77</code> from the team’s private package repository; Value Back Metric is unchanged in 0.1.78. Figma’s valueBack metric (122 × 83) stacks the JioPoints header, a value, a caption, and an Earn call to action. The package uses <code>ic_rupee_coin</code> as the default icon because the JioPoints mark is not in the icon set. The call to action is purple text, not a Link, so it has no underline. On the web, Enter does not activate the call to action, a pressable card nests the call to action inside its button, and long lines overflow instead of wrapping.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'valuebackmetric',
    corePrinciple: 'Name the programme, show the amount, offer one verb.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('valuebackmetric'),
  }} playground={<>
    <div className="preview-stage">
      <ValueBackMetric modes={{ ...LIGHT, AppearanceBrand: brand } as Modes} title={card.title} value={card.value}
        caption={caption ? card.caption : undefined} linkLabel={cta ? card.linkLabel : undefined}
        onLinkPress={cta ? () => setLastAction(`${card.linkLabel} pressed`) : undefined} />
      <span className="stage-label">Live Coin Value Back Metric</span>
    </div>
    <div className="controls-panel">
      <Segment label="Programme" value={programme} options={PROGRAMMES} onChange={setProgramme} />
      <OnOff label="Caption" value={caption} onChange={setCaption} />
      <OnOff label="Call to action" value={cta} onChange={setCta} />
      <Segment label="Icon colour" value={brand} options={BRANDS} onChange={setBrand} />
      <Readout title="Last action" value={lastAction} />
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'valuebackmetric',
  label: 'Value Back Metric',
  summary: 'Use a Value Back Metric to show a rewards balance, such as JioPoints or cashback, with how to earn more and one next step.',
  keywords: ['JioPoints', 'cashback', 'rewards', 'points', 'value back'],
  icon: <><circle cx="9" cy="9" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M6.5 9h5M8.8 6.7 6.5 9l2.3 2.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /></>,
  Component: ValueBackMetricGuide,
})
