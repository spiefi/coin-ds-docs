import { useState, type ReactNode } from 'react'
import { CardAdvisory, Title, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, FitWidth, OnOff, Readout, Segment, Sources, Surface, byTestId, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3780-5784'
const LIGHT = { 'Color Mode': 'Light' } as Modes
const NEUTRAL = { ...LIGHT, AppearanceBrand: 'Neutral' } as Modes
const system = (s: 'positive' | 'negative') => ({ ...LIGHT, 'Semantic Intent': 'System', AppearanceSystem: s } as Modes)
const noop = () => {}

const SPEND = {
  title: 'Spending',
  description: 'You’re within the plan you set for this month.',
  value: 70,
  nudgeBody: 'Data confidence is low. Add more accounts for better insights.',
  nudgeButtonLabel: 'Add accounts',
  accessibilityLabel: 'Spending score 70',
  onPressNudgeButton: noop,
}

type CAProps = Partial<React.ComponentProps<typeof CardAdvisory>>
const CA = (o: CAProps = {}) => <CardAdvisory {...SPEND} modes={NEUTRAL} {...o} />
const Host = ({ children }: { children: ReactNode }) => <FitWidth><Surface>{children}</Surface></FitWidth>

const sel = (id: string) => {
  const R = byTestId(id)
  const content = `${R} > div:first-child > div:first-child`
  const header = `${content} > div:first-child`
  return {
    R, content, header,
    title: `${header} > [dir="auto"]`,
    info: `${header} > div:last-child`,
    description: `${content} > [dir="auto"]`,
    row: `${R} > div:first-child`,
    score: `${R} [role="progressbar"]`,
    nudge: `${R} > [role="presentation"]`,
    close: `${R} [aria-label="Close"]`,
  }
}
const A = sel('ca-anatomy')
const S = sel('ca-size')

const APPEARANCES = ['Neutral', 'Primary', 'Secondary', 'Tertiary'] as const
const SCORES = ['25', '70', '95'] as const

function CardAdvisoryGuide() {
  const [appearance, setAppearance] = useState<(typeof APPEARANCES)[number]>('Neutral')
  const [score, setScore] = useState<(typeof SCORES)[number]>('70')
  const [nudge, setNudge] = useState(true)
  const [info, setInfo] = useState(true)
  const [action, setAction] = useState('None')
  const [linked, setLinked] = useState(false)
  const { nudgeButtonLabel: _omit, ...noLabel } = SPEND

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A score, its reading, and a nudge',
      description: 'A bold title and one sentence sit beside a small ring that shows the score out of 100. An inline nudge below gives one reason to act and one button.',
      body: <Anatomy surface="white" parts={[
        { name: 'Title', note: '26 px heavy, on one line; a longer title ends in an ellipsis.', target: A.title, side: 'top' },
        { name: 'Info icon', note: 'Shown by default; showInfoIcon hides it and titleEndSlot replaces it.', target: A.info, side: 'top' },
        { name: 'Description', note: 'One sentence at 12 px that says what the score means.', target: A.description, side: 'left' },
        { name: 'Score', note: 'A 60 px Circular Progress Bar of value out of 100; valueLabel changes the figure.', target: A.score, side: 'right' },
        { name: 'Nudge', note: 'An inline Nudge with nudgeBody and one button; showNudge removes it.', target: A.nudge, side: 'bottom' },
        { name: 'Close', note: 'Drawn by the nudge in this build; it does nothing yet (#271).', target: A.close, side: 'right' },
      ]}>
        {CA({ testID: 'ca-anatomy' })}
      </Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Brand and status colours',
      description: 'AppearanceBrand colours the ring, the nudge, and its button: Storybook uses Neutral, and the package defaults to Primary. For a score that’s good or bad, set Semantic Intent to System and pick AppearanceSystem. The card itself stays white. Three slots, titleEndSlot, progressSlot, and nudgeSlot, replace the info icon, the ring, and the nudge with your own components.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Neutral" description="Storybook’s look: a dark ring and button, a white nudge.">
          <Host>{CA()}</Host>
        </ExampleCard>
        <ExampleCard title="Primary" description="The package default: a gold ring and a cream nudge.">
          <Host>{CA({ modes: LIGHT })}</Host>
        </ExampleCard>
        <ExampleCard title="Positive" description="System with positive: green for a good score.">
          <Host>{CA({ modes: system('positive'), value: 85, description: 'You’re well within this month’s plan.', accessibilityLabel: 'Spending score 85' })}</Host>
        </ExampleCard>
        <ExampleCard title="Negative" description="System with negative: red for a score to act on.">
          <Host>{CA({ modes: system('negative'), value: 25, description: 'You’ve used most of this month’s plan.', accessibilityLabel: 'Spending score 25' })}</Host>
        </ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'With or without the nudge',
      description: 'The card has no pressed or disabled state of its own: only the nudge button acts, through onPressNudgeButton. showNudge removes the nudge, leaving the score and its reading.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="With nudge" description="The score, its reading, and one next step.">
          <Host>{CA()}</Host>
        </ExampleCard>
        <ExampleCard title="Score only" description="Without the nudge: the score and one sentence.">
          <Host>{CA({ showNudge: false })}</Host>
        </ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'Always 360 px wide',
      description: 'The card is 360 px wide, set by a token that no mode changes, and as tall as its content: it doesn’t stretch or shrink with its host. The ring is 60 px with 16 px before it, and the nudge sits 16 px below. It has no padding or corners: it’s a white section for a white screen.',
      body: <Anatomy legend={false} surface="white" marks={[
        { kind: 'size', target: S.R, side: 'bottom', label: 'both' },
        { kind: 'gap', from: S.content, to: S.score },
        { kind: 'gap', from: S.row, to: S.nudge },
      ]}>
        {CA({ testID: 'ca-size' })}
      </Anatomy>,
    },
    content: {
      header: 'Content', title: 'Name it, read it, act on it',
      description: 'Keep the title to one or two words: it’s cut to one line. Say what the score means in one sentence, give the nudge one reason to act, and label its button with a verb; the default label is “Button”. Set accessibilityLabel to the score in words, such as “Spending score 70”, because the default reads out every line, the nudge included.',
      body: <ExampleCard title="One score, one reading, one step" description="“Spending”, what 70 means this month, and “Add accounts” as the next step, named “Spending score 70”.">
        <Host>{CA()}</Host>
      </ExampleCard>,
    },
    context: {
      header: 'In context', title: 'A spending score on the Insights screen',
      description: 'Add accounts runs the screen’s own action through onPressNudgeButton. Once the accounts are linked, the screen hides the nudge with showNudge and updates the reading; the card doesn’t act on its own.',
      body: <div className="coin-new-context">
        <FitWidth><Surface>
          <VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes} style={{ width: 360, padding: 0 }}>
            <Title title="Insights" subtitle="September 2026" modes={LIGHT} />
            {CA({
              description: linked ? 'Based on all 3 of your accounts.' : 'You’re within the plan you set for this month.',
              showNudge: !linked,
              onPressNudgeButton: () => setLinked(true),
            })}
          </VStack>
        </Surface></FitWidth>
        <p className="coin-new-readout" role="status">{linked ? '3 accounts linked; the nudge is hidden' : '2 accounts linked'}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'A clear score and one step',
      description: 'Each pair shows a card people read at a glance next to one that hides its point or crowds its nudge.',
      body: <div className="coin-new-stack">
        <DoDont
          good={<Host>{CA()}</Host>}
          bad={<Host><CardAdvisory {...noLabel} modes={NEUTRAL} /></Host>}
          goodTitle="Label the button with a verb" goodCaption="“Add accounts” says what happens next."
          badTitle="Leave the default label" badCaption="The button reads “Button” and promises nothing." />
        <DoDont
          good={<Host>{CA()}</Host>}
          bad={<Host>{CA({ title: 'Spending across all your accounts this month' })}</Host>}
          goodTitle="Keep the title short" goodCaption="“Spending” fits on its one line."
          badTitle="Write a long title" badCaption="It's cut to one line, so its end is lost." />
        <DoDont
          good={<Host>{CA()}</Host>}
          bad={<Host>{CA({ nudgeButtonLabel: 'Add accounts and review bills' })}</Host>}
          goodTitle="Give the nudge one action" goodCaption="One button for one next step."
          badTitle="Put two actions in the nudge" badCaption="The long label squeezes the reason to act." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Card Advisory contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="13 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('cardadvisory')} stories={[
        { label: 'Default', id: 'components-cardadvisory--default' },
        { label: 'Without nudge', id: 'components-cardadvisory--without-nudge' },
        { label: 'Custom score', id: 'components-cardadvisory--custom-score' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (12 October build) from the team’s private package repository. Figma’s Card / Advisory is one 360 × 136 component with a Title property; its nudge is the retired Nudge with a purple sparkle and no close button, a mix no single mode reproduces, so this page follows Storybook’s Neutral. In this build the card’s nudge shows a Close button that does nothing (#271); Biscuit’s 13 October build hides it but isn’t installed here. The title is cut to one line and sits on a 32 px line (26 in Figma). The card stays white in every mode. Its default spoken name reads the title, description, score, and nudge text, even when the nudge is hidden. The published Storybook still shows the old page and the older nudge.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'cardadvisory',
    corePrinciple: 'One score, one reading, one next step.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('cardadvisory'),
  }} playground={<>
    <div className="preview-stage">
      <Host>{CA({
        modes: { ...LIGHT, AppearanceBrand: appearance } as Modes,
        value: Number(score),
        accessibilityLabel: `Spending score ${score}`,
        showNudge: nudge,
        showInfoIcon: info,
        onPressNudgeButton: () => setAction('Add accounts pressed'),
      })}</Host>
      <span className="stage-label">Live Coin Card Advisory</span>
    </div>
    <div className="controls-panel">
      <Segment label="Appearance" value={appearance} options={APPEARANCES} onChange={setAppearance} />
      <Segment label="Score" value={score} options={SCORES} onChange={setScore} />
      <OnOff label="Nudge" value={nudge} onChange={setNudge} />
      <OnOff label="Info icon" value={info} onChange={setInfo} />
      <Readout title="Last action" value={action}>
        Only the nudge button acts. In this build the nudge’s Close button does nothing (#271).
      </Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'cardadvisory',
  label: 'Card Advisory',
  summary: 'Use a Card Advisory to show one score with a sentence on what it means and, if it helps, one next step.',
  keywords: ['advisory card', 'score card', 'insight card', 'spending score', 'financial health'],
  icon: <><rect x="2.5" y="3.5" width="13" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><circle cx="11.5" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" /><path d="M5 7h2.5M5 11.5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>,
  Component: CardAdvisoryGuide,
})
