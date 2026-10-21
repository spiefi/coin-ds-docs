import { useState, type ComponentProps } from 'react'
import { HoldingsCard, Text, Title, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, FitWidth, OnOff, Readout, Segment, Sources, docsUrl } from '../guide-kit'
import { defineGuide } from './define'
import jioLogo from '../assets/jio-gold-logo.png'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1028-1533'
const LIGHT = { 'Color Mode': 'Light' } as Modes
const noop = () => {}
const W = { width: 328 }

const DETAILS = [
  { label: 'Interest', value: '12% p.a.' },
  { label: 'Tenure', value: '36 months' },
  { label: 'Processing fee', value: '₹499' },
  { label: 'APR', value: '15.47%' },
  { label: 'EMI', value: '₹6,277/m' },
]
const MORE = [...DETAILS, { label: 'Prepayment', value: 'Free' }, { label: 'Payout', value: '24 hours' }]
const FOOTER_ITEMS = [
  { label: 'Repayment', linkLabel: 'Schedule', onLinkPress: noop },
  { label: 'Charges', linkLabel: 'Details', onLinkPress: noop },
]

type HCProps = Partial<ComponentProps<typeof HoldingsCard>>
const BASE: HCProps = {
  headerImage: { uri: jioLogo }, heroLabel: 'Loan amount up to', heroValue: '₹1,89,000', details: DETAILS,
  footerItems: FOOTER_ITEMS, footerActionLabel: 'Apply', onFooterActionPress: noop, onPress: noop, modes: LIGHT, style: W,
}
const HOLDING: HCProps = {
  heroLabel: 'Current value', heroValue: '₹52,340',
  details: [{ label: 'Quantity', value: '8.2 g' }, { label: 'Bought at', value: '₹5,920/g' }, { label: 'Returns', value: '+7.8%' }],
  radio: false,
}

function HC(overrides: HCProps = {}) {
  return <HoldingsCard {...(BASE as ComponentProps<typeof HoldingsCard>)} {...overrides} />
}
const Fit = (overrides: HCProps = {}) => <FitWidth>{HC(overrides)}</FitWidth>
const m = (extra: Record<string, string>) => ({ ...LIGHT, ...extra }) as Modes

const R = ':scope > button'
const LOGO = `${R} > div:nth-child(1) > div:first-child`
const TRAILING = `${R} > div:nth-child(1) > div:last-child`
const HEADER = `${R} > div:nth-child(1)`
const HERO = `${R} > div:nth-child(2)`
const TERMS = `${R} > div:nth-child(3)`
const FOOTER = `${R} > div:nth-child(4)`

type Trailing = 'radio' | 'badgeLabel' | 'none'
type Brand = 'Primary' | 'Secondary' | 'Neutral' | 'Tertiary'

function HoldingsCardGuide() {
  const [selected, setSelected] = useState(false)
  const [trailing, setTrailing] = useState<Trailing>('radio')
  const [footer, setFooter] = useState(false)
  const [brand, setBrand] = useState<Brand>('Primary')
  const [picked, setPicked] = useState<'a' | 'b' | null>(null)

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'An amount over its terms',
      description: 'A rounded panel puts a logo and the radio at the top, the headline amount under them, and the terms in rows of three. The footer adds links and an action below a divider.',
      body: <Anatomy parts={[
        { name: 'Logo', note: 'headerImage, fitted into a 100 × 24 box; the box stays when left out.', target: LOGO, side: 'top' },
        { name: 'Radio', note: 'Shows selected; badgeLabel or trailing can replace it.', target: TRAILING, side: 'right' },
        { name: 'Hero', note: 'heroLabel over heroValue, the amount in 20 px bold.', target: HERO, side: 'left' },
        { name: 'Terms', note: 'details, three to a row; a long value ends in an ellipsis.', target: TERMS, side: 'left' },
        { name: 'Footer', note: 'footer: a divider, two labelled links, and a small blue button.', target: FOOTER, side: 'bottom' },
        { name: 'Panel', note: 'A rounded panel with a 1 px border; AppearanceBrand sets its colours.', target: R, side: 'right', at: 0.55 },
      ]}>{HC({ footer: true })}</Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Trailing, footer, and colours',
      description: 'The top right shows a Radio by default, for choosing this offer. badgeLabel swaps it for a status Badge, green by default; AppearanceSystem warning makes it orange. trailing swaps in your own component, and radio false leaves the top right empty. footer adds a divider, footerItems as labelled links, and a small Apply button that is always blue. children replaces the terms with your own content. AppearanceBrand colours the panel: Primary (pale gold) by default, Secondary (lilac), Neutral (white, as in Figma), or Tertiary (light grey).',
      body: <div className="coin-new-stack">
        <div className="coin-new-example-grid">
          <ExampleCard title="Radio" description="For choosing one offer from a list.">{Fit()}</ExampleCard>
          <ExampleCard title="Badge" description="A status in place of the Radio.">{Fit({ badgeLabel: 'Pre-approved' })}</ExampleCard>
          <ExampleCard title="Badge, AppearanceSystem warning" description="An orange badge for a warning.">{Fit({ badgeLabel: 'Expires soon', modes: m({ AppearanceSystem: 'warning' }) })}</ExampleCard>
          <ExampleCard title="No trailing" description="Nothing at the top right, for a holding you don’t choose.">{Fit({ radio: false })}</ExampleCard>
        </div>
        <div className="coin-new-example-grid">
          <ExampleCard title="Footer" description="Links to more detail and a blue Apply button.">{Fit({ footer: true })}</ExampleCard>
          <ExampleCard title="Custom body" description="Your content in place of the terms; the amount and Radio stay.">{Fit({ children: <Text text="Pre-approved on your salary account. No documents needed." /> })}</ExampleCard>
          <ExampleCard title="AppearanceBrand Neutral" description="A white panel with a grey border, as in Figma.">{Fit({ modes: m({ AppearanceBrand: 'Neutral' }) })}</ExampleCard>
          <ExampleCard title="AppearanceBrand Secondary" description="A lilac panel.">{Fit({ modes: m({ AppearanceBrand: 'Secondary' }) })}</ExampleCard>
          <ExampleCard title="AppearanceBrand Tertiary" description="A light grey panel.">{Fit({ modes: m({ AppearanceBrand: 'Tertiary' }) })}</ExampleCard>
          <ExampleCard title="Without a logo" description="The empty logo box still holds the top row’s height.">{Fit({ headerImage: undefined })}</ExampleCard>
        </div>
      </div>,
    },
    states: {
      header: 'States', title: 'Selected comes from your screen',
      description: 'The whole card is one button. When it’s pressed, your onPress sets selected, and the Radio fills; the card doesn’t select itself. disabled greys the Radio and stops presses. A card without onPress is disabled too, and then its footer links and button don’t respond to clicks either. While pressed, the card fades a little.',
      body: <div className="coin-new-example-grid three">
        <ExampleCard title="Not selected" description="An empty Radio.">{Fit()}</ExampleCard>
        <ExampleCard title="Selected" description="A filled purple Radio.">{Fit({ selected: true })}</ExampleCard>
        <ExampleCard title="Disabled" description="A grey Radio; the card doesn’t press.">{Fit({ disabled: true })}</ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'Give it a width',
      description: 'The card has no width of its own: it fills a host that stretches it, and shrinks to its content anywhere else. Set it with style, as Figma does at 328 px. The terms share the width in three equal columns, and the height follows the content: 20 px of padding at the top and bottom, 16 px at the sides, and 10 px between the parts. Each extra row of terms adds about 47 px.',
      body: <div className="coin-new-stack">
        <Anatomy legend={false} marks={[
          { kind: 'size', target: R, side: 'bottom', label: 'both' },
          { kind: 'padding', target: R },
          { kind: 'gap', from: HEADER, to: HERO },
        ]}>{HC()}</Anatomy>
        <div className="coin-new-example-grid">
          <ExampleCard title="Wider, 360 px" description="The three columns widen; the amount stays at the left.">{Fit({ style: { width: 360 } })}</ExampleCard>
          <ExampleCard title="Seven terms" description="A third row, and the card grows.">{Fit({ details: MORE })}</ExampleCard>
        </div>
      </div>,
    },
    content: {
      header: 'Content', title: 'Say what the number is',
      description: 'Make heroLabel say what the amount is, such as Loan amount up to, and give heroValue already formatted, with its ₹. Keep term labels to a word or two and put the unit in the value: 36 months, 12% p.a. Name footer links for the next step, and keep the action to one word, such as Apply. headerImage is made for a wide logo: a square mark sits centred in its 100 × 24 box. Holdings work the same way: the current value as the hero, with quantity and returns as terms.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Loan offer" description="The amount you can borrow, with its rate and tenure.">{Fit()}</ExampleCard>
        <ExampleCard title="Gold holding" description="What you own today, with no Radio.">{Fit(HOLDING)}</ExampleCard>
      </div>,
    },
    context: {
      header: 'In context', title: 'Choosing a loan offer',
      description: 'The screen lists its offers and keeps one selected: each card’s onPress picks that offer, and its selected follows the screen’s choice.',
      body: <div className="coin-new-context">
        <FitWidth>
          <VStack modes={{ ...LIGHT, 'Slot gap': 'M', Padding: 'None' } as Modes} style={{ width: 328 }}>
            <Title title="Pick an offer" subtitle="Pre-approved for you" modes={LIGHT} />
            {HC({ selected: picked === 'a', onPress: () => setPicked('a') })}
            {HC({
              heroValue: '₹2,50,000',
              details: [{ label: 'Interest', value: '13.5% p.a.' }, { label: 'Tenure', value: '48 months' }, { label: 'Processing fee', value: '₹999' }, { label: 'APR', value: '16.2%' }, { label: 'EMI', value: '₹6,768/m' }],
              selected: picked === 'b', onPress: () => setPicked('b'),
            })}
          </VStack>
        </FitWidth>
        <p className="coin-new-readout" role="status">{picked === 'a' ? 'Picked the ₹1,89,000 offer' : picked === 'b' ? 'Picked the ₹2,50,000 offer' : 'No offer picked'}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'A set width, short values, short labels',
      description: 'Each pair shows a card that reads cleanly next to one that squeezes its terms, cuts a value or badge, or wraps its button.',
      body: <div className="coin-new-stack">
        <DoDont good={Fit()} bad={Fit({ style: undefined })} goodTitle="Give it a width" goodCaption="style width 328 keeps three even columns." badTitle="Leave the width to its host" badCaption="In a host that doesn’t stretch it, the card shrinks and labels wrap." />
        <DoDont good={Fit()} bad={Fit({ details: [DETAILS[0], { label: 'Tenure', value: '36 months or 60 months' }, ...DETAILS.slice(2)] })} goodTitle="Values with their unit" goodCaption="36 months fits its column." badTitle="Long values" badCaption="The column stays the same, so the value is cut short." />
        <DoDont good={Fit({ footer: true })} bad={Fit({ footer: true, footerActionLabel: 'Apply now' })} goodTitle="One word on the button" goodCaption="Apply fits the 80 px button." badTitle="Two words" badCaption="Apply now wraps onto two lines." />
        <DoDont good={Fit({ badgeLabel: 'Pre-approved' })} bad={Fit({ badgeLabel: 'Recommended for you this month' })} goodTitle="A short badge" goodCaption="Pre-approved fits beside the logo." badTitle="A long badge" badCaption="It isn’t shortened, so the card’s edge cuts it off." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Holdings Card contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="21 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('holdingscard')} stories={[
        { label: 'Default', id: 'components-holdingscard--default' },
        { label: 'Selected', id: 'components-holdingscard--selected' },
        { label: 'Disabled', id: 'components-holdingscard--disabled' },
        { label: 'With badge', id: 'components-holdingscard--with-badge' },
        { label: 'With footer', id: 'components-holdingscard--with-footer' },
        { label: 'Without trailing', id: 'components-holdingscard--without-trailing' },
        { label: 'With image', id: 'components-holdingscard--with-image' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (19 October build of Biscuit’s main) from the team’s private package repository. Figma’s Holdings Card exposes <code>children</code>, <code>footer</code>, <code>radio</code>, and <code>trailing</code>; it is a white card (AppearanceBrand Neutral) with a dark badge and a gold Apply button. In the package, the default card is pale gold, the badge green, the footer links black, and the Apply button is always blue, whatever AppearanceBrand you set. The card has no width of its own, a card without <code>onPress</code> is disabled along with its footer, and it is about 7 px taller than Figma’s because its text lines are taller. A long badge is cut off by the card’s edge, and a two-word action wraps in the 80 px button. The published Storybook is older than the installed package and still shows the older generated page; its With image story can’t load its logo (all reported).</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'holdingscard', corePrinciple: 'One offer, its terms at a glance.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('holdingscard'),
  }} playground={<>
    <div className="preview-stage">
      <FitWidth>{HC({
        selected, onPress: () => setSelected((s) => !s),
        radio: trailing !== 'none',
        badgeLabel: trailing === 'badgeLabel' ? 'Pre-approved' : undefined,
        footer,
        modes: m({ AppearanceBrand: brand }),
      })}</FitWidth>
      <span className="stage-label">Live Coin Holdings Card</span>
    </div>
    <div className="controls-panel">
      <Segment label="trailing" value={trailing} options={['radio', 'badgeLabel', 'none'] as const} onChange={setTrailing} />
      <OnOff label="footer" value={footer} onChange={setFooter} />
      <Segment label="AppearanceBrand" value={brand} options={['Primary', 'Secondary', 'Neutral', 'Tertiary'] as const} onChange={setBrand} />
      <Readout title="selected" value={selected ? 'true' : 'false'}>Press the card: your onPress sets selected. The card doesn’t select itself.</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'holdingscard',
  label: 'Holdings Card',
  summary: 'Use a Holdings Card for one loan offer or holding: its headline amount, its key terms, and a radio to choose it from a list.',
  keywords: ['loan offer', 'offer card', 'holding', 'investment card', 'selectable card', 'loan card'],
  icon: <><rect x="2" y="3" width="14" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.5" fill="none" /><circle cx="12.5" cy="6.5" r="1.5" stroke="currentColor" strokeWidth="1.2" fill="none" /><path d="M4.5 7.5h4M4.5 11.5h2M8 11.5h2M11.5 11.5h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /></>,
  Component: HoldingsCardGuide,
})
