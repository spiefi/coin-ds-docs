import { useState, type ComponentProps } from 'react'
import { BenefitCard, Title, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, FitWidth, OnOff, Readout, ScreenFrame, Segment, Sources, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=5352-1077'
const LIGHT = { 'Color Mode': 'Light' } as Modes
const noop = () => {}
const EARN = [
  { icon: 'ic_jewellery_diamond', title: 'JioPoints', trailingText: 'Up to 2000 pts' },
  { icon: 'ic_offer', title: 'Cashback', trailingText: 'Up to ₹5000' },
]
const PERKS = [
  { icon: 'ic_card', title: 'Zero forex markup on cards' },
  { icon: 'ic_support', title: 'Priority support, 24/7' },
]

// BenefitCard has no testID; R is the card root.
const R = ':scope > div'
const HEADER = `${R} > div:first-child`
const TITLE = `${R} > div:first-child > div:first-child > [dir="auto"]`
const EARN_ROW = `${R} > div:first-child > div:first-child > div:nth-child(2) > div:first-child`
const DIVIDER = `${R} > div:first-child > div:last-child`
const UPSELL = `${R} > div:nth-child(2)`
const ROWS = `${R} > div:nth-child(3)`
const BENEFIT_ROW = `${R} > div:nth-child(3) > div:first-child`
const BUTTON = `${R} > [role="button"]`

type BCProps = Partial<ComponentProps<typeof BenefitCard>>
const BC = (overrides: BCProps = {}) => (
  <BenefitCard modes={LIGHT} headerTitle="You will earn" headerItems={EARN} items={PERKS} buttonLabel="Upgrade" onButtonPress={noop} {...overrides} />
)
const Fit = (overrides: BCProps = {}) => <FitWidth>{BC(overrides)}</FitWidth>

const APPEARANCES = ['Default', 'Primary', 'Secondary', 'Tertiary'] as const
type Appearance = typeof APPEARANCES[number]

function BenefitCardGuide() {
  const [appearance, setAppearance] = useState<Appearance>('Default')
  const [header, setHeader] = useState(true)
  const [upsell, setUpsell] = useState(true)
  const [button, setButton] = useState(true)
  const [action, setAction] = useState('None')
  const [status, setStatus] = useState('Not upgraded yet')

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'What you earn, what you get, one button',
      description: 'A white card with a header of earnings rows and a divider, an upsell line, a list of benefits, and an upgrade button, 8 px apart.',
      body: <Anatomy parts={[
        { name: 'Header title', note: 'headerTitle at 12 px, a label for the rows below it.', target: TITLE, side: 'top' },
        { name: 'Earnings row', note: 'A headerItems row: an icon, a short title, and the figure on the right.', target: EARN_ROW, side: 'right' },
        { name: 'Divider', note: 'Separates what you earn from what the plan includes.', target: DIVIDER, side: 'left' },
        { name: 'Upsell', note: 'A Nudge by default, whose Close does nothing yet (#271); bodyHeader replaces or removes it.', target: UPSELL, side: 'right' },
        { name: 'Benefit row', note: 'An items row: an icon and a short perk.', target: BENEFIT_ROW, side: 'left' },
        { name: 'Button', note: 'buttonLabel and onButtonPress; showButton hides it.', target: BUTTON, side: 'bottom' },
      ]}>
        {BC()}
      </Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Sections and brand',
      description: 'Each section can go: showHeader drops the title, its rows, and the divider; bodyHeader set to null removes the upsell; showButton hides the button. AppearanceBrand recolours the icons, the upsell, and the button together; the card stays white.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Default" description="Purple icons, white upsell, gold button, as in Figma.">{Fit()}</ExampleCard>
        <ExampleCard title="Without the upsell" description="bodyHeader set to null closes the gap between the lists.">{Fit({ bodyHeader: null })}</ExampleCard>
        <ExampleCard title="Without the header" description="Just the upsell, the benefits, and the button.">{Fit({ showHeader: false })}</ExampleCard>
        <ExampleCard title="Tertiary" description="One brand for the icons, the upsell, and the button.">{Fit({ modes: { ...LIGHT, AppearanceBrand: 'Tertiary' } as Modes })}</ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'A summary with or without an action',
      description: 'The card has no state of its own: only its button acts, through onButtonPress, with Button\'s usual states. onPress makes the whole card one button that dims while pressed, but on the web its own buttons then sit inside it, so avoid onPress while the card has a button (#280).',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="With the button" description="One next step at the bottom.">{Fit()}</ExampleCard>
        <ExampleCard title="Without the button" description="showButton off: a summary of the plan.">{Fit({ showButton: false })}</ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: '344 px wide, as tall as its content',
      description: 'It\'s 344 px wide unless you set width to another number or a percentage, such as 100% to fill its container. It has 12 px padding, 12 px corners, and 8 px between sections, and it\'s as tall as what it shows. Figma\'s card is 344 × 221.',
      body: <Anatomy legend={false} marks={[
        { kind: 'size', target: R, side: 'bottom', label: 'both' },
        { kind: 'padding', target: R },
        { kind: 'gap', from: HEADER, to: UPSELL },
        { kind: 'gap', from: UPSELL, to: ROWS },
      ]}>
        {BC()}
      </Anatomy>,
    },
    content: {
      header: 'Content', title: 'A label, short perks, and figures',
      description: 'Write the header title as a label, such as “You will earn”. Keep each row to a short noun phrase and put its number in trailingText, where the figures line up on the right. Label the button with a verb, such as “Upgrade”.',
      body: <ExampleCard title="Short rows with the figures on the right" description="“JioPoints” with “Up to 2000 pts”, two perks, and “Upgrade”.">{Fit()}</ExampleCard>,
    },
    context: {
      header: 'In context', title: 'Upgrading to JioFinance+',
      description: 'The plan screen fills its width with the card (width 100%) and starts checkout when people press Upgrade, through onButtonPress. The card doesn\'t act on its own.',
      body: <div className="coin-new-context">
        <ScreenFrame size="full">
          <VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes} style={{ flex: 1, padding: 16 }}>
            <Title title="JioFinance+" subtitle="Earn more on every payment" modes={LIGHT} />
            {BC({ width: '100%', onButtonPress: () => setStatus('Upgrade pressed: the screen opens checkout') })}
          </VStack>
        </ScreenFrame>
        <p className="coin-new-readout" role="status">{status}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Rows people scan',
      description: 'Each pair shows a list people take in at a glance next to one they have to read line by line.',
      body: <div className="coin-new-stack">
        <DoDont
          good={Fit()}
          bad={Fit({ items: [{ icon: 'ic_card', title: 'Pay abroad with any of your cards and get zero forex markup' }, PERKS[1]] })}
          goodTitle="Keep each perk short" goodCaption="A few words per row, one benefit each."
          badTitle="Write a sentence as a row" badCaption="A long title is cut off, and the benefit with it." />
        <DoDont
          good={Fit()}
          bad={Fit({ headerItems: [{ icon: 'ic_jewellery_diamond', title: 'Up to 2000 JioPoints' }, { icon: 'ic_offer', title: 'Up to ₹5000 cashback' }] })}
          goodTitle="Put the figure in trailingText" goodCaption="The amounts line up on the right."
          badTitle="Put the figure in the title" badCaption="The amounts are buried in the text." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Benefit Card contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="13 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('benefitcard')} stories={[
        { label: 'Default', id: 'components-benefitcard--default' },
        { label: 'Declarative arrays', id: 'components-benefitcard--declarative-arrays' },
        { label: 'Without upsell', id: 'components-benefitcard--without-upsell' },
        { label: 'Header hidden', id: 'components-benefitcard--header-hidden' },
        { label: 'Button hidden', id: 'components-benefitcard--button-hidden' },
        { label: 'Pressable card', id: 'components-benefitcard--pressable-card' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (12 October build) from the team’s private package repository. Figma’s BenefitCard is one 344 × 221 component with header and Button switches and two list slots; its upsell is the retired Nudge, with 12 px text and no close button. In this build the upsell has 14 px text and a Close button that does nothing (#271), so the card is a few pixels taller; Biscuit’s 13 October build hides Close but isn’t installed here. The header swaps Figma’s spacing: 4 px under the title and 8 px between rows, 8 and 4 in Figma. The card and its title stay white and black in every mode. Its default rows repeat one placeholder, so always pass your own. The published Storybook still shows the old page and the older nudge.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'benefitcard',
    corePrinciple: 'Show what people get, then one way to get it.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('benefitcard'),
  }} playground={<>
    <div className="preview-stage">
      {Fit({
        modes: appearance === 'Default' ? LIGHT : { ...LIGHT, AppearanceBrand: appearance } as Modes,
        showHeader: header,
        bodyHeader: upsell ? undefined : null,
        showButton: button,
        onButtonPress: () => setAction('Upgrade pressed'),
      })}
      <span className="stage-label">Live Coin Benefit Card</span>
    </div>
    <div className="controls-panel">
      <Segment label="Appearance" value={appearance} options={APPEARANCES} onChange={setAppearance} />
      <OnOff label="Header" value={header} onChange={setHeader} />
      <OnOff label="Upsell" value={upsell} onChange={setUpsell} />
      <OnOff label="Button" value={button} onChange={setButton} />
      <Readout title="Last action" value={action}>
        Only the button acts. In this build the upsell's Close button does nothing (#271).
      </Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'benefitcard',
  label: 'Benefit Card',
  summary: 'Use a Benefit Card to list what a plan or offer gives, with an optional upsell and one button to upgrade.',
  keywords: ['benefits card', 'plan benefits', 'rewards card', 'upgrade card', 'perks', 'membership'],
  icon: <><rect x="2.5" y="2.5" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="m5.2 6.6 1 1 1.8-2M10 6.5h3M5.5 11h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /></>,
  Component: BenefitCardGuide,
})
