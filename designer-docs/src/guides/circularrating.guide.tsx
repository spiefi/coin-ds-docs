import { useState, type ComponentProps } from 'react'
import { CircularRating, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, FitWidth, OnOff, Readout, Segment, Sources, byTestId, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3741-1711'
const BASE = { 'Color Mode': 'Light', Context: 'Nudge&Alert' } as Modes
const MEDIUM = { ...BASE, Emphasis: 'Medium' } as Modes
const SECONDARY = { ...BASE, AppearanceBrand: 'Secondary' } as Modes
const noop = () => {}
const TIER: Record<Score, string> = { 36: 'Needs attention', 72: 'Doing great', 100: 'Excellent' }
type Score = 36 | 72 | 100

type RatingProps = Partial<ComponentProps<typeof CircularRating>>
function R({ value, tier, ...rest }: { value: number; tier: string } & RatingProps) {
  return <CircularRating value={value} tierLabel={tier} label="Credit health" footerText="Updated on 8 Oct 2026"
    nudgeBody="Pay your card bill in full to raise your score" nudgeButtonLabel="Pay now" onPressNudgeButton={noop} modes={BASE} {...rest} />
}
const Fit = (props: { value: number; tier: string } & RatingProps) => <FitWidth><R {...props} /></FitWidth>

const A = byTestId('cr-anatomy')
const RING = `${A} [role="progressbar"]`
const DOTS = `${RING} > div:first-child`
const CENTRE = `${RING} > div:nth-child(2)`

function CircularRatingGuide() {
  const [score, setScore] = useState<Score>(72)
  const [colour, setColour] = useState<'Primary' | 'Secondary'>('Primary')
  const [nudge, setNudge] = useState(true)
  const [last, setLast] = useState('Press the tier or Pay now')

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A dotted ring, the score, a footer, and a nudge',
      description: 'Twenty-four dots fill clockwise from 12 o’clock in step with the score. Inside sit a label, the score, and your tier with a chevron; below come a dated footer and an inline nudge.',
      body: <Anatomy parts={[
        { name: 'Lit dots', note: '18 px dots in the ring’s colour; the share lit matches the score.', target: `${DOTS} > div:nth-child(4)`, side: 'right' },
        { name: 'Track dots', note: 'Grey dots for the rest of the 100.', target: `${DOTS} > div:nth-child(22)`, side: 'left' },
        { name: 'Label', note: '12 px; names the score.', target: `${CENTRE} > div:first-child > div:first-child`, side: 'top' },
        { name: 'Score', note: '56 px heavy; the score rounded, out of 100.', target: `${CENTRE} > div:first-child > div:nth-child(2)`, side: 'left' },
        { name: 'Tier', note: '16 px bold with a chevron; your verdict on the score.', target: `${CENTRE} > div:nth-child(2)`, side: 'right' },
        { name: 'Footer', note: '12 px with an info icon; when the score was updated.', target: `${A} > div:nth-child(2) > [dir="auto"]`, side: 'left' },
        { name: 'Nudge', note: 'An inline nudge with one button for the next step.', target: `${A} > div:nth-child(3)`, side: 'bottom' },
      ]}><R value={72} tier="Doing great" testID="cr-anatomy" /></Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Your words, the dots, and the nudge',
      description: 'You write the label, tier, footer, and nudge; the score comes from the value. Choose how many dots make the ring, and whether the footer icon and the nudge show.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Without the nudge" description="The score and its footer, when there’s no next step."><Fit value={72} tier="Doing great" showNudge={false} /></ExampleCard>
        <ExampleCard title="Without the footer icon" description="Just the update line."><Fit value={72} tier="Doing great" showNudge={false} showFooterIcon={false} /></ExampleCard>
        <ExampleCard title="Fewer dots" description="Twelve dots: each stands for more of the score. Past about 50 dots they overlap."><Fit value={72} tier="Doing great" showNudge={false} dotCount={12} /></ExampleCard>
        <ExampleCard title="Tier opens details" description="With onTierPress the tier row becomes a button, such as to open the score’s breakdown."><Fit value={72} tier="Doing great" showNudge={false} onTierPress={noop} /></ExampleCard>
        <ExampleCard title="Colour" description="Modes colour the dots and the nudge together: Secondary is purple."><Fit value={72} tier="Doing great" modes={SECONDARY} /></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'No states of its own',
      description: 'The ring has no states, and neither its colour nor its tier follows the score. Pick the tier from the score yourself, and the colour with modes.',
      body: <div className="coin-new-example-grid three">
        <ExampleCard title="Low score" description="36 lights 9 dots. The tier is yours: “Needs attention”."><Fit value={36} tier="Needs attention" showNudge={false} /></ExampleCard>
        <ExampleCard title="High score" description="72 lights 18 dots, in the same colour."><Fit value={72} tier="Doing great" showNudge={false} /></ExampleCard>
        <ExampleCard title="Empty" description="At 0, only grey dots."><Fit value={0} tier="Not rated yet" showNudge={false} /></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'A fixed 340 px wide',
      description: 'A Circular Rating doesn’t resize. The ring is 320 px with 18 px dots, inside 10 px of padding, and the nudge is 312 px; give it a column at least 340 px wide.',
      body: <Anatomy legend={false} marks={[
        { kind: 'size', target: byTestId('cr-size'), side: 'right', label: 'both' },
        { kind: 'size', target: `${byTestId('cr-size')} [role="progressbar"]`, side: 'left', label: 'both' },
      ]}><R value={72} tier="Doing great" testID="cr-size" /></Anatomy>,
    },
    content: {
      header: 'Content', title: 'Name the score, give a verdict, date it',
      description: 'Name the score in two or three words, such as “Credit health”. Write the tier as a short verdict that fits one line, start the footer with when it was updated, and give the nudge one action with a verb label, such as “Pay now”.',
      body: <ExampleCard title="A complete rating"><Fit value={64} tier="Fair" /></ExampleCard>,
    },
    context: {
      header: 'In context', title: 'Credit health with a next step',
      description: 'The screen passes the score and its tier, and wires both actions: the tier opens the score’s breakdown and Pay now opens the card bill.',
      body: <div className="coin-new-context">
        <Fit value={64} tier="Fair" onTierPress={() => setLast('Opens the score breakdown')} onPressNudgeButton={() => setLast('Opens your card bill')} />
        <p className="coin-new-readout" role="status">{last}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Make the score mean something',
      description: 'Each pair shows a rating people can trust and act on versus one that misleads them.',
      body: <div className="coin-new-stack">
        <DoDont goodTitle="Write the tier for the score" goodCaption="A low score says “Needs attention”." good={<Fit value={36} tier="Needs attention" showNudge={false} />}
          badTitle="Leave the default tier" badCaption="The tier doesn’t follow the score, so 36 still says “Doing great”."
          bad={<FitWidth><CircularRating value={36} label="Credit health" footerText="Updated on 8 Oct 2026" showNudge={false} modes={BASE} /></FitWidth>} />
        <DoDont goodTitle="Name the nudge’s action" goodCaption="“Pay now” says what happens." good={<Fit value={64} tier="Fair" />}
          badTitle="Leave the default button" badCaption="It shows and is read as “Button”." bad={<Fit value={64} tier="Fair" nudgeButtonLabel={undefined} />} />
        <DoDont goodTitle="Keep emphasis High" goodCaption="The lit dots stand out from the track." good={<Fit value={72} tier="Doing great" showNudge={false} />}
          badTitle="Lower the emphasis" badCaption="At Medium the lit dots have no contrast with the track (1.0:1)." bad={<Fit value={72} tier="Doing great" showNudge={false} modes={MEDIUM} />} />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Circular Rating contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="10 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('circularrating')} stories={[
        { label: 'Default', id: 'components-circularrating--default' }, { label: 'Without nudge', id: 'components-circularrating--without-nudge' }, { label: 'Low rating', id: 'components-circularrating--low-rating' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (5 October build) from the team’s private package repository. Figma has one Circular Rating component with no variants; the package builds it from Circular Progress Bar / Doted and an inline Nudge, and gives both one set of modes. Figma shows 26 dots, all lit, on a slightly smaller ring, with a white nudge; the package draws 24 dots lit by the score and colours the nudge with the ring. The nudge button matches Figma’s small size only with Context Nudge&amp;Alert, which this guide sets. Screen readers hear the ring as a progress bar named by the label, score, and tier, without the footer and, on the web, without a separate value. With Color Mode Dark the text and grey dots keep their Light colours, so the guide shows Light only.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'circularrating', corePrinciple: 'A score, what it means, and what to do next.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('circularrating'),
  }} playground={<>
    <div className="preview-stage">
      <Fit value={score} tier={TIER[score]} showNudge={nudge} modes={colour === 'Secondary' ? SECONDARY : BASE} />
    </div>
    <div className="controls-panel">
      <Segment label="Score" value={String(score)} options={['36', '72', '100'] as const} onChange={v => setScore(Number(v) as Score)} />
      <Segment label="Colour" value={colour} options={['Primary', 'Secondary'] as const} onChange={setColour} />
      <OnOff label="Nudge" value={nudge} onChange={setNudge} />
      <Readout title="Read as" value={`Credit health. ${score} out of 100. ${TIER[score]}`}>The tier and colour don’t follow the score: you set them. The footer and nudge aren’t part of this name.</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'circularrating',
  label: 'Circular Rating',
  summary: 'Use a Circular Rating to show a score out of 100, such as credit health, as a dotted ring with your verdict and one next step.',
  keywords: ['score ring', 'credit score', 'dotted ring', 'rating ring', 'health score'],
  icon: <><circle cx="9" cy="3" r="1.4" fill="currentColor" /><circle cx="13.24" cy="4.76" r="1.4" fill="currentColor" /><circle cx="15" cy="9" r="1.4" fill="currentColor" /><circle cx="13.24" cy="13.24" r="1.4" fill="currentColor" /><circle cx="9" cy="15" r="1.4" fill="currentColor" /><circle cx="4.76" cy="13.24" r="1.4" fill="currentColor" /><circle cx="3" cy="9" r="1.4" fill="currentColor" opacity="0.35" /><circle cx="4.76" cy="4.76" r="1.4" fill="currentColor" opacity="0.35" /></>,
  Component: CircularRatingGuide,
})
