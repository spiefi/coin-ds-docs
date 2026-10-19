import { useState } from 'react'
import { CardFinancialCondition, Title, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, Segment, Sources, byTestId, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3600-3177'
const LIGHT = { 'Color Mode': 'Light' } as Modes
const m = (o: Record<string, string>) => ({ ...LIGHT, ...o } as Modes)
const system = (s: 'positive' | 'negative') => m({ 'Semantic Intent': 'System', AppearanceSystem: s })
const noop = () => {}
const FRAME = { width: '100%', maxWidth: 343 } as const

const NUDGE = 'There may be gaps in your health or life cover\nAdd coverage to stay financially secure'
const PROT = {
  title: 'Protection',
  body: 'Check your coverage and gaps',
  progressState: 'Active' as const,
  value: 72,
  nudgeBody: NUDGE,
  buttonLabel: 'View details',
  onPressButton: noop,
}

type CFCProps = Partial<React.ComponentProps<typeof CardFinancialCondition>>
const CFC = (o: CFCProps = {}) => <CardFinancialCondition {...PROT} modes={LIGHT} style={FRAME} {...o} />

const sel = (id: string) => {
  const R = byTestId(id)
  const text = `${R} > div:first-child > div:first-child`
  return {
    R, text,
    title: `${text} > [dir="auto"]:first-child`,
    body: `${text} > [dir="auto"]:last-child`,
    score: `${R} [role="progressbar"]`,
    header: `${R} > div:first-child`,
    nudge: `${R} > div:nth-child(2)`,
    divider: `${R} > [role="presentation"]`,
    button: `${R} button`,
  }
}
const A = sel('cfc-anatomy')
const S = sel('cfc-size')

const RINGS = ['Inactive', 'Active'] as const
const VALUES = ['30', '72', '95'] as const
const APPEARANCES = ['Neutral', 'Primary', 'Secondary', 'Tertiary'] as const

function CardFinancialConditionGuide() {
  const [ring, setRing] = useState<(typeof RINGS)[number]>('Active')
  const [value, setValue] = useState<(typeof VALUES)[number]>('72')
  const [appearance, setAppearance] = useState<(typeof APPEARANCES)[number]>('Neutral')
  const [nudge, setNudge] = useState(true)
  const [button, setButton] = useState(true)
  const [action, setAction] = useState('None')
  const [added, setAdded] = useState(false)

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A score, a hint, and a button',
      description: 'A white card puts a title and one line beside a 60 px score ring. Under them sit an inline nudge with up to two lines, a divider, and one button.',
      body: <Anatomy specimenWidth={343} parts={[
        { name: 'Title', note: 'The topic in 16 px bold; it wraps rather than cutting off.', target: A.title, side: 'top' },
        { name: 'Body', note: 'One short line on what the score covers.', target: A.body, side: 'left' },
        { name: 'Score', note: 'A 60 px Circular Progress Bar: empty while Inactive, value out of 100 when Active.', target: A.score, side: 'right' },
        { name: 'Nudge', note: 'An inline Nudge with nudgeBody; a line break starts its second line.', target: A.nudge, side: 'left' },
        { name: 'Divider', note: 'A 1 px rule; showDivider removes it.', target: A.divider, side: 'right' },
        { name: 'Button', note: 'A purple Button with buttonLabel; onPressButton runs your action.', target: A.button, side: 'bottom' },
      ]}>
        {CFC({ testID: 'cfc-anatomy', style: undefined })}
      </Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Brand, status, and sections',
      description: 'AppearanceBrand colours the ring and the nudge: the card defaults to Neutral, and the button stays purple. For a score that’s good or bad, set Semantic Intent to System and pick AppearanceSystem: the ring, the nudge, and the button take the status colour. Emphasis Medium or Low makes the ring and the button paler. showNudge, showDivider, and showButton remove their parts; progressSlot, nudgeSlot, and buttonSlot replace them with your own components.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Neutral" description="The card’s default: a dark ring and a white nudge.">{CFC()}</ExampleCard>
        <ExampleCard title="Primary" description="A gold ring and a cream nudge; the button stays purple.">{CFC({ modes: m({ AppearanceBrand: 'Primary' }) })}</ExampleCard>
        <ExampleCard title="Positive" description="System with positive: green for a good score.">
          {CFC({ modes: system('positive'), value: 90, body: 'Your cover looks complete', nudgeBody: 'Health and life cover are in place\nReview them once a year' })}
        </ExampleCard>
        <ExampleCard title="Negative" description="System with negative: red for a score to act on.">
          {CFC({ modes: system('negative'), value: 30, body: 'You have gaps in your cover' })}
        </ExampleCard>
        <ExampleCard title="Without the nudge" description="The score, a rule, and the button.">{CFC({ showNudge: false })}</ExampleCard>
        <ExampleCard title="Without the divider" description="The button sits right under the nudge.">{CFC({ showDivider: false })}</ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Inactive or Active',
      description: 'progressState decides whether the ring shows a score. Inactive, the default, draws an empty ring with a dash; Active fills value out of 100 and prints the number, or valueLabel in its place. The card has no pressed or disabled state: only the button acts.',
      body: <div className="coin-new-example-grid three">
        <ExampleCard title="Inactive" description="No score yet: an empty ring with a dash, as in Figma.">{CFC({ progressState: 'Inactive', accessibilityLabel: 'Protection. No score yet' })}</ExampleCard>
        <ExampleCard title="Active" description="The ring fills to 72 and shows the number.">{CFC()}</ExampleCard>
        <ExampleCard title="valueLabel" description="valueLabel replaces the number, here with a percent sign.">{CFC({ valueLabel: '72%' })}</ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'Your screen sets the width',
      description: 'The card has no width of its own: it fills its host, and Figma draws it at 343 px. It’s as tall as its content, with 16 px padding, 8 px between parts, and 16 px between the text and the 60 px ring. The button is always Figma’s 32 px, with 14 px text, whatever Context the card has.',
      body: <Anatomy legend={false} specimenWidth={343} marks={[
        { kind: 'size', target: S.R, side: 'bottom', label: 'both' },
        { kind: 'padding', target: S.R },
        { kind: 'gap', from: S.text, to: S.score },
      ]}>
        {CFC({ testID: 'cfc-size', style: undefined })}
      </Anatomy>,
    },
    content: {
      header: 'Content', title: 'Name it, read it, act on it',
      description: 'Use a one- or two-word title for the topic and one short line for the body. Keep the nudge to two lines with a line break between them, and label the button with a verb. The default spoken name reads the title, the score, and the body, such as “Protection, 72 out of 100. Check your coverage and gaps”. While the ring is Inactive, set accessibilityLabel yourself, such as “Protection. No score yet”: the default still reads the value (#350).',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Short copy" description="“Protection”, one line, two nudge lines, and “View details”.">{CFC()}</ExampleCard>
        <ExampleCard title="Long copy wraps" description="Nothing is cut off: the title and body wrap and the card grows.">
          {CFC({ title: 'Comprehensive financial protection plan', body: 'Review every active policy, find the gaps in your cover, and stay on top of renewals.' })}
        </ExampleCard>
      </div>,
    },
    context: {
      header: 'In context', title: 'A protection score on the Money screen',
      description: 'View details runs the screen’s own action through onPressButton. Once the person adds cover, the screen passes the new value and hides the nudge with showNudge; the card doesn’t fetch or work out the score itself.',
      body: <div className="coin-new-context">
        <VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes}>
          <Title title="Your money" subtitle="October 2026" modes={LIGHT} />
          {CFC({
            value: added ? 90 : 72,
            body: added ? 'Your cover looks complete' : 'Check your coverage and gaps',
            showNudge: !added,
            onPressButton: () => setAdded(true),
          })}
        </VStack>
        <p className="coin-new-readout" role="status">{added ? 'Cover added: score 90, and the nudge is hidden' : 'Score 72, with a nudge'}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'A score people can act on',
      description: 'Each pair shows a card that reads at a glance next to one that hides its score or its next step.',
      body: <div className="coin-new-stack">
        <DoDont good={CFC()}
          bad={CFC({ nudgeBody: 'There may be gaps in your health or life cover because one of your policies ended last month and your family has grown since you bought it' })}
          goodTitle="Keep the nudge to two lines" goodCaption="Short lines, one line break."
          badTitle="Write a paragraph in the nudge" badCaption="It wraps to four lines and pushes the button down." />
        <DoDont good={CFC()} bad={CFC({ progressState: 'Inactive' })}
          goodTitle="Show the score when you have it" goodCaption="Active, with the ring at 72."
          badTitle="Leave a known score Inactive" badCaption="The ring stays empty and the 72 is lost." />
        <DoDont good={CFC()} bad={CFC({ showNudge: false, showDivider: false, showButton: false })}
          goodTitle="Pair the score with a next step" goodCaption="The nudge says what’s missing and the button opens it."
          badTitle="Hide the nudge and the button" badCaption="A number with no reading and nothing to do." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Card Financial Condition contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="19 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('cardfinancialcondition')} stories={[
        { label: 'Default', id: 'components-cardfinancialcondition--default' },
        { label: 'Active progress', id: 'components-cardfinancialcondition--active-progress' },
        { label: 'Without nudge', id: 'components-cardfinancialcondition--without-nudge' },
        { label: 'Without divider', id: 'components-cardfinancialcondition--without-divider' },
        { label: 'Custom progress slot', id: 'components-cardfinancialcondition--with-custom-progress-slot' },
        { label: 'Long content', id: 'components-cardfinancialcondition--long-content' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code>, built from Biscuit’s main at c7d3348 (19 October) and taken from the team’s private package repository. Figma’s Card/FinancialCondition is one 343 × 181 component with no properties and an Inactive ring; its nudge is the retired Nudge with a purple sparkle, which no mode reproduces, so this page follows the package’s Neutral default. The button is Figma’s 32 px at any Context. The card stays white in every mode, and its default spoken name includes the score. The published Storybook still shows the older generated page.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'cardfinancialcondition',
    corePrinciple: 'One score, one gap, one next step.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('cardfinancialcondition'),
  }} playground={<>
    <div className="preview-stage">
      {CFC({
        progressState: ring,
        value: Number(value),
        accessibilityLabel: ring === 'Active' ? undefined : 'Protection. No score yet',
        modes: m({ AppearanceBrand: appearance }),
        showNudge: nudge,
        showButton: button,
        onPressButton: () => setAction('View details pressed'),
      })}
      <span className="stage-label">Live Coin Card Financial Condition</span>
    </div>
    <div className="controls-panel">
      <Segment label="Ring" value={ring} options={RINGS} onChange={setRing} />
      <Segment label="Value" value={value} options={VALUES} onChange={setValue} />
      <Segment label="Appearance" value={appearance} options={APPEARANCES} onChange={setAppearance} />
      <OnOff label="Nudge" value={nudge} onChange={setNudge} />
      <OnOff label="Button" value={button} onChange={setButton} />
      <Readout title="Last action" value={action}>Only the button acts.</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'cardfinancialcondition',
  label: 'Card Financial Condition',
  summary: 'Use a Card Financial Condition to show one coverage score with a short reading, a hint on what\'s missing, and one button.',
  keywords: ['financial condition', 'protection score', 'coverage card', 'insurance score', 'financial health'],
  icon: <><rect x="2.5" y="2.5" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" /><circle cx="11.5" cy="7" r="2" stroke="currentColor" strokeWidth="1.5" /><path d="M5 6h2.5M5 12.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>,
  Component: CardFinancialConditionGuide,
})
