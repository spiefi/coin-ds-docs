import { useState, type ComponentProps } from 'react'
import { CardInsight, SavingsGoalSummary, Title, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, Segment, Sources, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3702-17347'
const LIGHT = { 'Color Mode': 'Light' } as Modes
const m = (o: Record<string, string>) => ({ ...LIGHT, ...o } as Modes)
const noop = () => {}
const FRAME = { width: '100%', maxWidth: 356 } as const

const FIGURE = <SavingsGoalSummary current={{ label: 'Saved (4 months)', value: 240000 }} target={{ label: 'Goal (8 months)', value: 480000 }} />
const HINT = 'Add ₹10,000 a month to reach it by June.'

type CIProps = Partial<ComponentProps<typeof CardInsight>>
const CI = (o: CIProps = {}) => (
  <CardInsight title="Emergency savings" subtitle="Four of the eight months we suggest." badge="On track" modes={LIGHT} style={FRAME} footerBody={HINT} footerButtonLabel="Set up" onPressFooter={noop} {...o}>
    {o.children ?? FIGURE}
  </CardInsight>
)

const R = ':scope > div'
const S = {
  header: `${R} > div:first-child`,
  title: `${R} > div:first-child > div:first-child > [dir="auto"]:first-child`,
  subtitle: `${R} > div:first-child > div:first-child > [dir="auto"]:last-child`,
  badge: `${R} > div:first-child > div:last-child`,
  figure: `${R} > div:nth-child(2)`,
  divider: `${R} > [role="presentation"]`,
  footer: `${R} > div:last-child`,
}

const APPEARANCES = ['Primary', 'Secondary', 'Tertiary', 'Neutral'] as const

function CardInsightGuide() {
  const [appearance, setAppearance] = useState<(typeof APPEARANCES)[number]>('Primary')
  const [badge, setBadge] = useState(true)
  const [footer, setFooter] = useState(true)
  const [divider, setDivider] = useState(true)
  const [action, setAction] = useState('None')
  const [planned, setPlanned] = useState(false)

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A finding, its figure, and a hint',
      description: 'A white card puts a title, one line of context, and a badge on top. Below sit the figure, here a Savings Goal Summary, and a footer under a divider: a hint with one action.',
      body: <Anatomy specimenWidth={356} parts={[
        { name: 'Title', note: 'The topic in 16 px bold; it wraps rather than cutting off.', target: S.title, side: 'top' },
        { name: 'Subtitle', note: 'One sentence of context at 12 px.', target: S.subtitle, side: 'left' },
        { name: 'Badge', note: 'A string becomes a Badge; false removes it.', target: S.badge, side: 'right' },
        { name: 'Figure', note: 'children: here a Savings Goal Summary with a bar and two legend rows.', target: S.figure, side: 'right' },
        { name: 'Divider', note: 'A 1 px rule, shown only with a footer.', target: S.divider, side: 'left' },
        { name: 'Footer', note: 'A hint and one action, set with footerBody and footerButtonLabel; false removes it.', target: S.footer, side: 'bottom' },
      ]}>
        {CI()}
      </Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Brand colour',
      description: 'AppearanceBrand colours the badge and the bar: Primary gold by default, Secondary purple as in Figma, Tertiary blue, or Neutral grey. The footer is grey with a dark button, as in Figma, until you set AppearanceBrand on the card; then it takes that colour too. The card, its title, and its subtitle stay the same. badge takes a string, your own node, or false; children replaces the figure, and footer takes your own node or false.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Primary" description="The default: a gold badge and bar, with a grey footer.">{CI()}</ExampleCard>
        <ExampleCard title="Secondary" description="Purple, the colour of Figma’s bar.">{CI({ modes: m({ AppearanceBrand: 'Secondary' }) })}</ExampleCard>
        <ExampleCard title="Tertiary" description="Blue throughout.">{CI({ modes: m({ AppearanceBrand: 'Tertiary' }) })}</ExampleCard>
        <ExampleCard title="Neutral" description="Grey for a quieter card.">{CI({ modes: m({ AppearanceBrand: 'Neutral' }) })}</ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Leave out what you don\'t need',
      description: 'badge={false} removes the badge, and the title takes its width. footer={false} removes the footer and, unless you pass a divider, the rule above it; divider={false} keeps the footer without the rule. onPress makes the whole card one button with no pressed look; don\'t use it when the footer has a button.',
      body: <div className="coin-new-example-grid three">
        <ExampleCard title="Without the badge" description="The title runs the full width.">{CI({ badge: false })}</ExampleCard>
        <ExampleCard title="Without the footer" description="The divider goes with it.">{CI({ footer: false })}</ExampleCard>
        <ExampleCard title="Without the divider" description="The footer sits 12 px under the figure.">{CI({ divider: false })}</ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'Your screen sets the width',
      description: 'The card fills its host\'s width; Figma draws it at 356 px. It has 16 px padding at the top and bottom, 12 px at the sides, and 12 px between the header, the figure, the divider, and the footer. Its height follows the content.',
      body: <Anatomy legend={false} specimenWidth={356} marks={[
        { kind: 'size', target: R, side: 'bottom', label: 'both' },
        { kind: 'padding', target: R },
        { kind: 'gap', from: S.header, to: S.figure },
      ]}>
        {CI()}
      </Anatomy>,
    },
    content: {
      header: 'Content', title: 'Name the finding, then the hint',
      description: 'Name the topic in the title and add one sentence of context. The badge is a one- or two-word status, such as “On track”, that doesn\'t repeat the title. Give the footer one hint and at most one action, labelled with a verb.',
      body: <ExampleCard title="One finding, one hint" description="“Emergency savings”, how far along it is, “On track”, and one way to get there.">
        {CI()}
      </ExampleCard>,
    },
    context: {
      header: 'In context', title: 'A savings insight on the Insights screen',
      description: 'Set up runs the screen\'s own action through onPressFooter. Once the plan is set, the screen passes a new hint and no button label, so the footer has no button; the card doesn\'t change itself.',
      body: <div className="coin-new-context">
        <VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes}>
          <Title title="Insights" subtitle="October 2026" modes={LIGHT} />
          {CI(planned
            ? { footerBody: '₹10,000 moves to savings on the 1st of each month.', footerButtonLabel: '', onPressFooter: undefined }
            : { onPressFooter: () => setPlanned(true) })}
        </VStack>
        <p className="coin-new-readout" role="status">{planned ? 'Plan set: the footer has no button' : 'No plan yet'}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'One clear finding',
      description: 'Each pair shows a card people read at a glance next to one that squeezes its title or leaves its footer empty.',
      body: <div className="coin-new-stack">
        <DoDont
          good={CI({ footer: false })}
          bad={CI({ footer: false, badge: 'On track to finish by June' })}
          goodTitle="Keep the badge short" goodCaption="“On track” leaves the title room."
          badTitle="Write a long badge" badCaption="“On track to finish by June” squeezes the title onto two lines." />
        <DoDont
          good={CI()}
          bad={CI({ footerBody: undefined, footerButtonLabel: undefined, onPressFooter: undefined })}
          goodTitle="Write the footer’s hint" goodCaption="Your hint, and a Set up button that runs the screen’s action."
          badTitle="Keep the default footer copy" badCaption="“One line of guidance.” and a “Button” that does nothing." />
        <DoDont
          good={CI({ footer: false })}
          bad={CI({ footer: false, subtitle: 'You have saved four of the eight months of expenses we suggest keeping aside, based on what you spent over the last six months.' })}
          goodTitle="Keep the subtitle to one sentence" goodCaption="It reads in one glance."
          badTitle="Write a paragraph as the subtitle" badCaption="It wraps to several lines and pushes the figure down." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Card Insight contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="23 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('cardinsight')} stories={[
        { label: 'Default', id: 'components-cardinsight--default' },
        { label: 'Custom savings goal', id: 'components-cardinsight--with-custom-savings-goal' },
        { label: 'Without badge', id: 'components-cardinsight--without-badge' },
        { label: 'Without footer', id: 'components-cardinsight--without-footer' },
        { label: 'Custom footer', id: 'components-cardinsight--with-custom-footer' },
        { label: 'Without divider', id: 'components-cardinsight--without-divider' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (23 October build) from the team’s private package repository. Figma’s Card/Insight is one 356 × 322 component with a title, a subtitle, and a slot; its badge, divider, and footer are fixed, its badge is green, and its bar is purple, while the package defaults to gold. The default footer shows Figma’s placeholder hint and “Button”; set its hint, button label, and action, as these examples do. The default figure’s caption, “Credit usage”, reads on the white card, and the bar keeps its fill at every Emphasis. A System badge’s label is white, as in Figma. The published Storybook predates this build.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'cardinsight',
    corePrinciple: 'One finding, one figure, one hint.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('cardinsight'),
  }} playground={<>
    <div className="preview-stage">
      {CI({
        modes: m({ AppearanceBrand: appearance }),
        badge: badge ? 'On track' : false,
        footer: footer ? undefined : false,
        onPressFooter: () => setAction('Set up pressed'),
        divider,
      })}
      <span className="stage-label">Live Coin Card Insight</span>
    </div>
    <div className="controls-panel">
      <Segment label="Appearance" value={appearance} options={APPEARANCES} onChange={setAppearance} />
      <OnOff label="Badge" value={badge} onChange={setBadge} />
      <OnOff label="Footer" value={footer} onChange={setFooter} />
      <OnOff label="Divider" value={divider} onChange={setDivider} />
      <Readout title="Last action" value={action}>
        With the footer off, the divider stays while Divider is on.
      </Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'cardinsight',
  label: 'Card Insight',
  summary: 'Use a Card Insight to show one finding about someone\'s money: a title, a status badge, one figure, and a hint on what to do next.',
  keywords: ['insight card', 'savings goal card', 'savings insight', 'goal progress', 'spending insight'],
  icon: <><rect x="2.5" y="2.5" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M5 6h3.5M11 6h2M5 10h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M5 13h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
  Component: CardInsightGuide,
})
