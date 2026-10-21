import { useState, type ComponentProps } from 'react'
import { Avatar, CcCard, Title, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, FitWidth, OnOff, Readout, Sources, Surface, docsUrl } from '../guide-kit'
import { defineGuide } from './define'
import bankHero from '../assets/bank-hero.png'
import jioLogo from '../assets/jio-gold-logo.png'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=5434-1992'
const LIGHT = { 'Color Mode': 'Light' } as Modes
const noop = () => {}

const BADGES = [{ label: 'Pre-approved', modes: { AppearanceBrand: 'Tertiary' } as Modes }]
const TRAILING = [{ label: 'Lifetime free', modes: { AppearanceBrand: 'Secondary' } as Modes }]
const ITEMS = [
  { icon: 'ic_rupee_coin', title: '5% back as JioPoints on gold' },
  { icon: 'ic_flight_mode', title: '4 airport lounge visits a year' },
  { icon: 'ic_gift', title: 'No annual fee in the first year' },
]
const NUDGE = [{ text: 'Get 2x JioPoints with ' }, { text: 'JioFinance+', modes: { 'Text Appearance': 'Primary' } as Modes }]

type CCProps = Partial<ComponentProps<typeof CcCard>>
const BASE: CCProps = {
  imageSource: bankHero, title: 'JioFinance Gold Credit Card', subtitle: 'Rewards on gold and every spend',
  badges: BADGES, trailingBadges: TRAILING, items: ITEMS, nudgeSegments: NUDGE, nudgeAvatarSource: jioLogo,
  headline: 'Joining fee', description: '₹499', footerSubtitle: '+ GST', buttonLabel: 'Apply', onButtonPress: noop, modes: LIGHT,
}
const COMPACT: CCProps = { compact: true, headline: 'JioFinance Gold Credit Card', description: '₹499', footerSubtitle: 'Joining fee' }

function CC(overrides: CCProps = {}) {
  return <CcCard {...BASE} {...overrides} />
}
const Fit = (overrides: CCProps = {}) => <FitWidth>{CC(overrides)}</FitWidth>

const R = ':scope > div'
const HEADER = `${R} > div:nth-child(1)`
const PICTURE = `${R} > div:nth-child(2) > div:first-child`
const TITLE = `${R} > div:nth-child(2) > div:last-child`
const BENEFITS = `${R} > div:nth-child(3)`
const NUDGE_SEL = `${R} > div:nth-child(4)`
const FEE = `${R} > div:nth-child(5) > div:first-child`
const ACTION = `${R} > div:nth-child(5) > button`

function CcCardGuide() {
  const [compact, setCompact] = useState(false)
  const [showHeader, setShowHeader] = useState(true)
  const [showNudge, setShowNudge] = useState(true)
  const [last, setLast] = useState('None')
  const [applied, setApplied] = useState<string | null>(null)

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'An offer from badges to fee',
      description: 'A white card stacks the badges, the card’s picture and name, its benefits, an upsell line, and the fee with the action, 8 px apart.',
      body: <Anatomy parts={[
        { name: 'Badges', note: 'badges on the left, trailingBadges on the right.', target: `${HEADER} > div:first-child`, side: 'top' },
        { name: 'Picture', note: 'imageSource in an 88 × 54 box; media replaces it.', target: PICTURE, side: 'left' },
        { name: 'Title', note: 'title in 14 px bold on one line, subtitle under it.', target: TITLE, side: 'right' },
        { name: 'Benefits', note: 'items: one Coin ListItem per benefit, with its icon.', target: BENEFITS, side: 'left' },
        { name: 'Upsell', note: 'nudgeSegments after a small avatar.', target: NUDGE_SEL, side: 'right' },
        { name: 'Fee', note: 'headline, description, and footerSubtitle.', target: FEE, side: 'bottom' },
        { name: 'Action', note: 'A small purple Button from buttonLabel.', target: ACTION, side: 'right' },
      ]}>{CC()}</Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Full or compact, and what to show',
      description: 'The full card shows every part. compact keeps only the picture and the fee, for dense lists: it drops the badges, title, benefits, upsell, and button, so put the card’s name in headline. media replaces the picture in both, for example with an Avatar as Figma’s compact card does. showHeader and showNudge hide the badges and the upsell; showButton hides the button but not its space. Badges take modes, not colours. On the card, AppearanceBrand Secondary turns the benefit icons purple, Badge Size Small makes the badges smaller, and Page type SubPage shows a grey border for white pages; the Button stays small and purple.',
      body: <div className="coin-new-stack">
        <div className="coin-new-example-grid">
          <ExampleCard title="Full card" description="Badges, the card, its benefits, an upsell, and the fee.">{Fit()}</ExampleCard>
          <ExampleCard title="Compact" description="Just the picture and the fee, for dense lists.">{Fit(COMPACT)}</ExampleCard>
          <ExampleCard title="Compact with an Avatar" description="As in Figma: a round mark over the fee.">{Fit({ ...COMPACT, media: <Avatar imageSource={jioLogo} /> })}</ExampleCard>
          <ExampleCard title="No header" description="Without the badges, 31 px shorter.">{Fit({ showHeader: false })}</ExampleCard>
        </div>
        <div className="coin-new-example-grid">
          <ExampleCard title="No upsell" description="The benefits sit right above the fee.">{Fit({ showNudge: false })}</ExampleCard>
          <ExampleCard title="No button" description="The fee stays where it was; the card is no shorter.">{Fit({ showButton: false })}</ExampleCard>
          <ExampleCard title="AppearanceBrand Secondary" description="Purple benefit icons, as in Figma.">{Fit({ modes: { ...LIGHT, AppearanceBrand: 'Secondary' } as Modes })}</ExampleCard>
          <ExampleCard title="Badge Size Small" description="Smaller badges, as in Figma.">{Fit({ modes: { ...LIGHT, 'Badge Size': 'Small' } as Modes })}</ExampleCard>
          <ExampleCard title="Page type SubPage" description="A grey border, for a card on a white page."><Surface>{Fit({ modes: { ...LIGHT, 'Page type': 'SubPage' } as Modes })}</Surface></ExampleCard>
        </div>
      </div>,
    },
    states: {
      header: 'States', title: 'Its button acts, or the whole card does',
      description: 'The card isn’t pressable: its Apply button is, and a benefit row presses when you give it onPress. onPress makes the whole card one button, named by its title. Use one or the other: a pressable card that keeps its button puts a button inside a button. The card has no disabled, selected, or loading state.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Button acts" description="Only Apply presses.">{Fit()}</ExampleCard>
        <ExampleCard title="Whole card" description="The card is one button, named by its title.">{Fit({ showButton: false, onPress: noop })}</ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: '343 px wide, height from its parts',
      description: 'The card is 343 px wide, as in Figma; width sets another number or a percentage of its host. The height follows the parts you show: 12 px of padding, 8 px between parts, and 12 px between benefits. It comes out taller than Figma’s, because its badges are bigger and its benefits further apart.',
      body: <div className="coin-new-stack">
        <Anatomy legend={false} marks={[
          { kind: 'size', target: R, side: 'bottom', label: 'both' },
          { kind: 'padding', target: R },
          { kind: 'gap', from: HEADER, to: `${R} > div:nth-child(2)` },
        ]}>{CC()}</Anatomy>
        <div className="coin-new-example-grid">
          <ExampleCard title="width 300" description="Less room beside the picture, so a long title is cut sooner.">{Fit({ width: 300 })}</ExampleCard>
          <ExampleCard title="Shortest full card" description="No badges and no upsell: the picture, benefits, and fee.">{Fit({ showHeader: false, showNudge: false })}</ExampleCard>
        </div>
      </div>,
    },
    content: {
      header: 'Content', title: 'Name the card, then its facts',
      description: 'Make the title the card’s name, short enough for one line, and the subtitle the kind of card. Give each benefit one fact. Put the fee label in headline, the amount in description, and the billing note in footerSubtitle. Label the button with a verb, such as Apply. Replace every sample: an empty headline, description, or footerSubtitle shows its placeholder word.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Card offer" description="A name, three benefits, and the fee.">{Fit()}</ExampleCard>
        <ExampleCard title="Long title" description="Cut at one line with an ellipsis.">{Fit({ title: 'JioFinance Gold Rewards Platinum Credit Card' })}</ExampleCard>
      </div>,
    },
    context: {
      header: 'In context', title: 'Card offers on the Cards screen',
      description: 'The screen lists the cards on offer, one under another. Each Apply starts the screen’s own application through onButtonPress; the card only lays out the offer.',
      body: <div className="coin-new-context">
        <FitWidth>
          <VStack modes={{ ...LIGHT, 'Slot gap': 'M', Padding: 'None' } as Modes} style={{ width: 343 }}>
            <Title title="Cards for you" subtitle="Pre-approved offers" modes={LIGHT} />
            {CC({ onButtonPress: () => setApplied('JioFinance Gold Credit Card') })}
            {CC({
              title: 'JioFinance Everyday Credit Card', subtitle: 'Cashback on bills and groceries', trailingBadges: undefined,
              items: [{ icon: 'ic_voucher_cashback', title: '2% cashback on bills' }, { icon: 'ic_wallet', title: '1% cashback on everything else' }],
              showNudge: false, description: '₹0', footerSubtitle: 'Lifetime free',
              onButtonPress: () => setApplied('JioFinance Everyday Credit Card'),
            })}
          </VStack>
        </FitWidth>
        <p className="coin-new-readout" role="status">{applied ? `Applying for ${applied}` : 'No application started'}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Real text, a picture, a name in compact',
      description: 'Each pair shows an offer that reads cleanly next to one that shows placeholder words, an empty box, or a compact card with no name.',
      body: <div className="coin-new-stack">
        <DoDont good={Fit()} bad={Fit({ headline: undefined, description: undefined, footerSubtitle: undefined })} goodTitle="Replace every sample" goodCaption="Each line says something about this card." badTitle="Leave the footer empty" badCaption="Headline, Description, and Subtitle show as written." />
        <DoDont good={Fit()} bad={Fit({ imageSource: undefined })} goodTitle="Show the card" goodCaption="The picture says what’s on offer." badTitle="Leave out the picture" badCaption="An empty box still takes its space beside the title." />
        <DoDont good={Fit(COMPACT)} bad={Fit({ compact: true })} goodTitle="Name the card in compact" goodCaption="headline carries the name the title can’t show." badTitle="Compact with the full card’s text" badCaption="The title disappears, so only the fee is left." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public CC Card contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="21 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('cccard')} stories={[
        { label: 'Default', id: 'components-cccard--default' },
        { label: 'Compact', id: 'components-cccard--compact' },
        { label: 'Avatar slot', id: 'components-cccard--avatar-slot' },
        { label: 'Header hidden', id: 'components-cccard--header-hidden' },
        { label: 'Nudge hidden', id: 'components-cccard--nudge-hidden' },
        { label: 'Button hidden', id: 'components-cccard--button-hidden' },
        { label: 'Pressable card', id: 'components-cccard--pressable-card' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (19 October build of Biscuit’s main) from the team’s private package repository. Its export is <code>CcCard</code>. Figma’s CC CARD has <code>Compact</code> and <code>Type</code> variants. The package’s card is 264 px tall where Figma’s is 242: its badges are Medium where Figma’s are Small, and its benefits sit 12 px apart instead of 4. Its benefit icons are gold where Figma’s are purple, and its upsell is its own 14 px line instead of Figma’s Nudge. Compact defaults to the 88 × 54 picture where Figma shows a 42 px Avatar, and it drops the title too. The border is white, so it shows only with Page type SubPage. Empty footer text falls back to placeholder words, and the sample badges set their label colour in code. Every published Storybook story renders the card as a pressable button with Apply inside it, and the published page is the older generated one (all reported).</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'cccard', corePrinciple: 'One card, its benefits, its fee.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('cccard'),
  }} playground={<>
    <div className="preview-stage">
      <FitWidth>{CC({ ...(compact ? COMPACT : {}), showHeader, showNudge, onButtonPress: () => setLast('Apply pressed') })}</FitWidth>
      <span className="stage-label">Live Coin CC Card</span>
    </div>
    <div className="controls-panel">
      <OnOff label="compact" value={compact} onChange={setCompact} />
      <OnOff label="showHeader" value={showHeader} onChange={setShowHeader} />
      <OnOff label="showNudge" value={showNudge} onChange={setShowNudge} />
      <Readout title="Last press" value={last}>compact has no button, so nothing presses.</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'cccard',
  label: 'CC Card',
  summary: 'Use a CC Card to sell one credit card: who it’s for, its key benefits, an upsell, and the joining fee, with one action.',
  keywords: ['CcCard', 'credit card offer', 'credit card', 'card offer', 'card product', 'joining fee', 'benefits card'],
  icon: <><rect x="2" y="2" width="14" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.5" fill="none" /><rect x="4.5" y="6" width="4" height="3" rx="0.8" stroke="currentColor" strokeWidth="1.2" fill="none" /><path d="M4.5 4.2h3M10.5 7.5h3M4.5 11.5h9M4.5 13.8h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none" /></>,
  Component: CcCardGuide,
})
