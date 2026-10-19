import { useState, type ReactNode } from 'react'
import { Button, CardCTA, IconCapsule, Image, Title, VStack, type CardCTAProps, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, FitWidth, Readout, Segment, Sources, docsUrl } from '../guide-kit'
import { defineGuide } from './define'
import bankHero from '../assets/bank-hero.png'
import jioLogo from '../assets/jio-gold-logo.png'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3693-4477'
const LIGHT = { 'Color Mode': 'Light' } as Modes
const noop = () => {}
const W = { width: 320 } as const

const COPY = {
  cta: { title: 'Set up UPI Number', body: 'Receive money on your mobile number.', iconName: 'ic_upi_number', buttonLabel: 'Set up' },
  rating: { ratingLabel: '+28 points', title: 'Your credit score rose', body: 'Paying your bills on time helped. Was this useful?', buttonLabel: 'Save' },
  sip: { title: 'Start a gold SIP', body: 'Buy 24K gold every month, automatically.', headline: 'Jio Gold SIP', description: '₹500', subtitle: 'every month', buttonLabel: 'Start SIP', avatarSource: jioLogo },
}
type CTAType = keyof typeof COPY
const TYPES = ['cta', 'rating', 'sip'] as const
const EMPHASES = ['High', 'Medium', 'Low'] as const
type Emphasis = typeof EMPHASES[number]

const CTA = (type: CTAType, overrides: Partial<CardCTAProps> = {}) => (
  <CardCTA type={type} {...COPY[type]} onPressButton={noop} modes={LIGHT} style={W} {...overrides} />
)
const Fit = (node: ReactNode) => <FitWidth>{node}</FitWidth>

const R = ':scope > div'
const P = {
  left: `${R} > div:first-child`,
  text: `${R} > div:first-child > div:first-child`,
  title: `${R} > div:first-child > div:first-child > [dir="auto"]:first-child`,
  body: `${R} > div:first-child > div:first-child > [dir="auto"]:last-child`,
  button: `${R} > div:first-child > div:last-child`,
  icon: `${R} > div:last-child > [role="img"]`,
}

function CardCTAGuide() {
  const [type, setType] = useState<CTAType>('cta')
  const [emphasis, setEmphasis] = useState<Emphasis>('High')
  const [last, setLast] = useState('None')
  const [opened, setOpened] = useState(false)

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A prompt, its button, and an icon',
      description: 'The cta type splits a white panel in two: the title, the body, and a button take 3/5 of the width, and an icon sits in the rest. rating and sip keep the title, body, and button, and add their own parts, shown under Configuration.',
      body: <Anatomy specimenWidth={320} parts={[
        { name: 'Title', note: 'title: the offer, 16 px bold; nothing cuts it short.', target: P.title, side: 'top' },
        { name: 'Body', note: 'body: what the step gives, 14 px; it wraps.', target: P.body, side: 'left' },
        { name: 'Button', note: 'A small purple Button from buttonLabel and onPressButton.', target: P.button, side: 'bottom' },
        { name: 'Icon', note: 'An IconCapsule from iconName; iconSlot replaces it.', target: P.icon, side: 'right' },
        { name: 'Panel', note: 'A white panel with 12 px corners and a 1 px border.', target: R, side: 'right', at: 0.85 },
      ]}>
        {CTA('cta')}
      </Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Three types, and the button’s look',
      description: 'type sets the layout: cta, the default, puts the title, body, and button beside an icon; rating adds a badge above and like and dislike beside the button; sip adds an avatar and a line of facts above the button. Props for one type do nothing on the others. iconSlot, buttonSlot, ratingBadgeSlot, ratingActionsSlot, and avatarSlot replace a type’s parts and get the card’s modes. The button is always purple at size S: Emphasis makes it lighter, and Semantic Intent System gives it and the icon AppearanceSystem’s status colour. AppearanceBrand changes only the rating badge. Context CTACard enlarges the icon, and Page type SubPage and context 8 Section add a grey border.',
      body: <div className="coin-new-stack">
        <div className="coin-new-example-grid">
          <ExampleCard title="cta" description="An icon and one button, to set something up.">{Fit(CTA('cta'))}</ExampleCard>
          <ExampleCard title="rating" description="A badge, Save, and like or dislike, to react to an insight.">{Fit(CTA('rating'))}</ExampleCard>
          <ExampleCard title="sip" description="An avatar and two facts, to start a plan.">{Fit(CTA('sip'))}</ExampleCard>
          <ExampleCard title="Slots" description="Your own IconCapsule and Button in iconSlot and buttonSlot.">{Fit(CTA('cta', { title: 'Scan any QR code', body: 'Pay any UPI app or shop from your camera.', iconSlot: <IconCapsule iconName="ic_scan" />, buttonSlot: <Button label="Scan" onPress={noop} /> }))}</ExampleCard>
        </div>
        <div className="coin-new-example-grid">
          <ExampleCard title="Emphasis Medium" description="A light purple button.">{Fit(CTA('cta', { modes: { ...LIGHT, Emphasis: 'Medium' } }))}</ExampleCard>
          <ExampleCard title="Emphasis Low" description="A text button.">{Fit(CTA('cta', { modes: { ...LIGHT, Emphasis: 'Low' } }))}</ExampleCard>
          <ExampleCard title="Semantic Intent System" description="AppearanceSystem warning turns the icon and button orange.">{Fit(CTA('cta', { title: 'Complete your KYC', body: 'Finish by 31 October to keep investing.', iconName: 'ic_kyc', buttonLabel: 'Continue', modes: { ...LIGHT, 'Semantic Intent': 'System', AppearanceSystem: 'warning' } }))}</ExampleCard>
          <ExampleCard title="AppearanceBrand Secondary" description="The rating badge turns purple, as Figma draws it.">{Fit(CTA('rating', { modes: { ...LIGHT, AppearanceBrand: 'Secondary' } }))}</ExampleCard>
          <ExampleCard title="Context CTACard" description="A larger, 58 px icon.">{Fit(CTA('cta', { modes: { ...LIGHT, Context: 'CTACard' } }))}</ExampleCard>
          <ExampleCard title="Page type SubPage" description="A light grey border.">{Fit(CTA('cta', { modes: { ...LIGHT, 'Page type': 'SubPage' } }))}</ExampleCard>
        </div>
      </div>,
    },
    states: {
      header: 'States', title: 'Rating with or without Save',
      description: 'The card itself isn’t pressable; its buttons are. On rating, showButton={false} removes Save and moves like and dislike to the start, and showRatingActions={false} removes like and dislike. Like and dislike only respond when you pass onPressLike and onPressDislike. The card’s button can’t be disabled.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Reactions only" description="Like and dislike, without Save.">{Fit(CTA('rating', { showButton: false }))}</ExampleCard>
        <ExampleCard title="Save only" description="Save, without reactions.">{Fit(CTA('rating', { showRatingActions: false }))}</ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'Your layout sets the width',
      description: 'The card fills its host’s width; Figma and Storybook draw it at 320 px. On cta the text takes 3/5 of the width and the icon 2/5, padded 22 px top and bottom. Height follows the text: nothing cuts the title or body short, so longer copy or a narrower host makes the card taller. The button grows with its label and never wraps.',
      body: <div className="coin-new-stack">
        <Anatomy legend={false} specimenWidth={320} marks={[
          { kind: 'size', target: R, side: 'bottom', label: 'both' },
          { kind: 'padding', target: P.left },
          { kind: 'gap', from: P.text, to: P.button },
        ]}>
          {CTA('cta')}
        </Anatomy>
        <div className="coin-new-example-grid">
          <ExampleCard title="Long copy" description="More text, a taller card: nothing cuts it short.">{Fit(CTA('cta', { body: 'Receive money on your mobile number. There’s no account number or IFSC to share, and it works with every UPI app.' }))}</ExampleCard>
          <ExampleCard title="Narrow host" description="At 260 px the body wraps onto more lines.">{Fit(CTA('cta', { style: { width: 260 } }))}</ExampleCard>
        </div>
      </div>,
    },
    content: {
      header: 'Content', title: 'The offer, what it gives, and a verb',
      description: 'Make the title the offer, the body what the person gets, and the button label a verb, such as Set up, Save, or Start SIP. Keep the title to one line and the body to three: the card doesn’t cut either short. On sip, the headline names the plan, the description is its main fact, and the subtitle qualifies it.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Offer, benefit, verb" description="“Set up UPI Number”, what it gives, and “Set up”.">{Fit(CTA('cta'))}</ExampleCard>
        <ExampleCard title="Plan facts" description="“Jio Gold SIP”, “₹500”, and “every month”.">{Fit(CTA('sip'))}</ExampleCard>
      </div>,
    },
    context: {
      header: 'In context', title: 'A setup prompt on the Home screen',
      description: 'Home shows the prompt under the greeting. Set up opens the screen’s own setup flow through onPressButton; the card doesn’t do the setup or remove itself.',
      body: <div className="coin-new-context">
        <FitWidth>
          <VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes}>
            <Title title="Good morning, Priya" subtitle="Your balance is ₹12,450" modes={LIGHT} />
            {CTA('cta', { onPressButton: () => setOpened(true) })}
          </VStack>
        </FitWidth>
        <p className="coin-new-readout" role="status">{opened ? 'Opened UPI Number setup' : 'Setup not started'}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'One short action, the right picture, clean corners',
      description: 'Each pair shows a card that reads at a glance next to one that overflows, shows a stranger, or breaks its corners.',
      body: <div className="coin-new-stack">
        <DoDont
          good={Fit(CTA('cta'))}
          bad={Fit(CTA('cta', { buttonLabel: 'Set up your UPI Number to receive money' }))}
          goodTitle="One verb on the button" goodCaption="“Set up” names the action."
          badTitle="A long button label" badCaption="The button never wraps, so it runs out of the card." />
        <DoDont
          good={Fit(CTA('sip'))}
          bad={Fit(CTA('sip', { avatarSource: undefined }))}
          goodTitle="Pass the plan’s picture" goodCaption="avatarSource shows the plan’s own mark."
          badTitle="Leave out avatarSource" badCaption="A stranger’s photo appears in its place." />
        <DoDont
          good={Fit(CTA('cta'))}
          bad={Fit(CTA('cta', { iconSlot: <Image imageSource={bankHero} width="100%" height="100%" accessibilityLabel="Two people smiling at a phone" />, modes: { ...LIGHT, MediaBlock: 'Image' } }))}
          goodTitle="An icon in the capsule" goodCaption="The card keeps its rounded corners."
          badTitle="A full-bleed picture" badCaption="Its corners poke out past the card’s rounded corners." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Card CTA contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="19 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('cardcta')} stories={[
        { label: 'Default', id: 'components-cardcta--default' },
        { label: 'Rating', id: 'components-cardcta--rating' },
        { label: 'Sip', id: 'components-cardcta--sip' },
        { label: 'Custom slots', id: 'components-cardcta--with-custom-slots' },
        { label: 'Short content', id: 'components-cardcta--short-content' },
        { label: 'Long button label', id: 'components-cardcta--long-button-label' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (16 October build) from the team’s private package repository. Figma’s Card/CTA has the same three types, but its CTA type shows a badge, a caption line, and a full-bleed picture, while the package’s cta shows an icon and no badge or caption; a picture passed through <code>iconSlot</code> isn’t clipped to the card’s corners. Figma’s rating badge is purple because that variant sets AppearanceBrand Secondary; the package’s is gold until you pass it. Nothing cuts the title or body short, a long button label runs out of the card, <code>ratingMediaAlign</code> doesn’t move the default badge, and without <code>avatarSource</code> sip shows a stock photo. On the web the default button adds a hidden 9,999 px copy of its label that makes a page scroll sideways unless something around the card clips it, so these examples sit in hosts that clip (all reported). The published Storybook still shows the older generated page.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'cardcta',
    corePrinciple: 'One prompt, one button.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('cardcta'),
  }} playground={<>
    <div className="preview-stage">
      <FitWidth>
        {CTA(type, {
          modes: { ...LIGHT, Emphasis: emphasis },
          onPressButton: () => setLast(`${COPY[type].buttonLabel} pressed`),
          onPressLike: () => setLast('Liked'),
          onPressDislike: () => setLast('Disliked'),
        })}
      </FitWidth>
      <span className="stage-label">Live Coin Card CTA</span>
    </div>
    <div className="controls-panel">
      <Segment label="type" value={type} options={TYPES} onChange={setType} />
      <Segment label="Emphasis" value={emphasis} options={EMPHASES} onChange={setEmphasis} />
      <Readout title="Last action" value={last}>
        The card itself isn’t pressable: only its buttons act.
      </Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'cardcta',
  label: 'Card CTA',
  summary: 'Use a Card CTA to offer one next step, such as setting up UPI or rating an insight, with a title, a short line, and a button.',
  keywords: ['CTA card', 'call to action', 'prompt card', 'promo card', 'rating card', 'SIP card'],
  icon: <><rect x="2.5" y="3.5" width="13" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M5 7h5M5 11.5h3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /><circle cx="12.5" cy="7.5" r="1.5" stroke="currentColor" strokeWidth="1.5" fill="none" /></>,
  Component: CardCTAGuide,
})
