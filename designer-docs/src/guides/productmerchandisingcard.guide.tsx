import { useState } from 'react'
import { Icon, ProductMerchandisingCard, Title, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, FitWidth, OnOff, Readout, Segment, Sources, docsUrl } from '../guide-kit'
import { defineGuide } from './define'
import bankHero from '../assets/bank-hero.png'
import jioLogo from '../assets/jio-gold-logo.png'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=5277-317'
const STORYBOOK = docsUrl('productmerchandisingcard')
const LIGHT = { 'Color Mode': 'Light' } as Modes
const noop = () => {}
const W = { width: 328 }

type CardProps = Partial<Parameters<typeof ProductMerchandisingCard>[0]>

function M(overrides: CardProps = {}) {
  return <ProductMerchandisingCard imageSource={bankHero} avatarSource={jioLogo} badgeLabel="New" specialBadgeLabel="Zero balance" title="Savings account" subtitle="Open in 5 minutes" ctaLabel="Open" onCtaPress={noop} accessibilityLabel="Savings account, zero balance, open in 5 minutes" modes={LIGHT} style={W} {...overrides} />
}

const F = (overrides: CardProps = {}) => <FitWidth>{M(overrides)}</FitWidth>

const R = ':scope > div'
const SEL = {
  // Children: a press layer, the photo, the header, the blurred band, then the footer's content.
  photo: `${R} > div:nth-child(2)`,
  header: `${R} > div:nth-child(3)`,
  avatar: `${R} > div:nth-child(3) [role="img"]`,
  corner: `${R} > div:nth-child(3) > div:last-child`,
  footer: `${R} > div:nth-child(5)`,
  glass: `${R} > div:nth-child(5) > div:first-child`,
  text: `${R} > div:nth-child(5) > div:last-child > div:first-child`,
  button: `${R} > div:nth-child(5) > div:last-child > div:last-child`,
}

type Avatar = 'avatarSource' | 'avatarMonogram' | 'none'
const AVATAR: Record<Avatar, CardProps> = {
  avatarSource: {},
  avatarMonogram: { avatarSource: undefined, avatarMonogram: 'JF' },
  none: { showAvatar: false },
}
const LONG = { title: 'Zero-balance savings account with free debit card', subtitle: 'Open in 5 minutes with Aadhaar and PAN' }

function ProductMerchandisingCardGuide() {
  const [badge, setBadge] = useState(true)
  const [special, setSpecial] = useState(true)
  const [avatar, setAvatar] = useState<Avatar>('avatarSource')
  const [pressable, setPressable] = useState(false)
  const [last, setLast] = useState('None')
  const [opened, setOpened] = useState(false)

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A photo, a corner, and a footer',
      description: 'The photo fills a 223 px card with 12 px corners. A header row sits on its top edge, the avatar at the left and a badge at the right, and the footer sits on its bottom edge: a glass badge, the title and subtitle, and the Button.',
      body: <Anatomy specimenWidth={328} parts={[
        { name: 'Photo', note: 'imageSource, cropped to fill the card.', target: SEL.photo, side: 'right', at: 0.35 },
        { name: 'Avatar', note: 'avatarSource, or avatarMonogram’s initials, 36 px.', target: SEL.avatar, side: 'left' },
        { name: 'Corner badge', note: 'badgeLabel: a lilac Badge; hidden without a label.', target: SEL.corner, side: 'top' },
        { name: 'Glass badge', note: 'specialBadgeLabel: a frosted glass Badge above the title.', target: SEL.glass, side: 'left' },
        { name: 'Title', note: 'title, 14 px bold white, over subtitle; one line each.', target: SEL.text, side: 'bottom' },
        { name: 'Button', note: 'A small purple Button from ctaLabel and onCtaPress.', target: SEL.button, side: 'right' },
        { name: 'Footer', note: 'A blurred copy of the photo behind the text; no dark shade.', target: SEL.footer, side: 'bottom', at: 0.9 },
      ]}>{M()}</Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Badges, an avatar, and one look for both',
      description: 'imageSource is the photo; the card has none of its own. badgeLabel adds a lilac badge at the top right and specialBadgeLabel a frosted glass Badge above the title; each stays hidden without a label, and badgeIcon and specialBadgeIcon put an Icon before it. avatarSource shows a round picture at the top left, avatarMonogram initials instead, and showAvatar={false} removes it. ctaLabel and onCtaPress make the small purple Button. One modes object styles the corner badge and the Button together: AppearanceBrand Primary turns both gold, and Emphasis, Badge Size, and Button / Size change them too. badge, avatar, specialBadge, and cta replace those parts and don’t get the card’s modes.',
      body: <div className="coin-new-stack">
        <div className="coin-new-example-grid">
          <ExampleCard title="Full card" description="An avatar, both badges, and an action.">{F()}</ExampleCard>
          <ExampleCard title="Monogram" description="Initials when there’s no picture.">{F({ avatarSource: undefined, avatarMonogram: 'JF' })}</ExampleCard>
          <ExampleCard title="Photo and footer" description="No avatar and no badges.">{F({ showAvatar: false, badgeLabel: undefined, specialBadgeLabel: undefined })}</ExampleCard>
          <ExampleCard title="Badge icons" description="An Icon before each label; the card doesn’t colour it.">{F({ badgeIcon: <Icon iconName="ic_star" size={14} />, specialBadgeIcon: <Icon iconName="ic_offer" size={14} /> })}</ExampleCard>
        </div>
        <div className="coin-new-example-grid">
          <ExampleCard title="AppearanceBrand Primary" description="A cream badge and a gold Button.">{F({ modes: { ...LIGHT, AppearanceBrand: 'Primary' } as Modes })}</ExampleCard>
          <ExampleCard title="Emphasis Medium" description="A light purple Button.">{F({ modes: { ...LIGHT, Emphasis: 'Medium' } as Modes })}</ExampleCard>
          <ExampleCard title="Badge Size Small" description="Smaller badges.">{F({ modes: { ...LIGHT, 'Badge Size': 'Small' } as Modes })}</ExampleCard>
          <ExampleCard title="Button / Size XS" description="A smaller, 24 px Button.">{F({ modes: { ...LIGHT, 'Button / Size': 'XS' } as Modes })}</ExampleCard>
        </div>
      </div>,
    },
    states: {
      header: 'States', title: 'The Button acts, or the whole card does',
      description: 'The card isn’t pressable: its Button is. onPress makes the whole card one button that dims slightly while pressed, announced by accessibilityLabel or the title. Open stays a separate button inside it, so use one or the other: cta={false} drops the Button. There’s no selected, disabled, or loading look.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Button acts" description="Only Open presses.">{F()}</ExampleCard>
        <ExampleCard title="Whole card" description="cta={false}: the card is the one target.">{F({ onPress: noop, cta: false })}</ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: '223 px tall, as wide as its host',
      description: 'The card is 223 px tall unless you set height, and takes its width from its host; Figma draws it at 328 px. The photo fills and crops to the card. The header and footer sit on the photo: the footer grows upward with its content, and in a narrow card the Button drops under the title. The title and subtitle stay on one line and end in … unless disableTruncation is set.',
      body: <div className="coin-new-stack">
        <Anatomy legend={false} specimenWidth={328} marks={[
          { kind: 'size', target: R, side: 'bottom', label: 'both' },
          { kind: 'padding', target: SEL.header },
          { kind: 'padding', target: SEL.footer },
        ]}>{M()}</Anatomy>
        <div className="coin-new-example-grid">
          <ExampleCard title="Narrow card" description="At 168 px the Button drops under the title.">{F({ style: { width: 168 }, height: 141, showAvatar: false, badgeLabel: undefined, specialBadgeLabel: undefined, title: 'Digital gold', subtitle: 'From ₹10', ctaLabel: 'Buy', modes: { ...LIGHT, 'Button / Size': 'XS' } as Modes })}</ExampleCard>
          <ExampleCard title="Shorter card" description="height 180 crops the photo tighter.">{F({ height: 180 })}</ExampleCard>
          <ExampleCard title="Long title" description="Each ends in … on one line.">{F(LONG)}</ExampleCard>
          <ExampleCard title="disableTruncation" description="They wrap, and the footer grows upward.">{F({ ...LONG, disableTruncation: true })}</ExampleCard>
        </div>
      </div>,
    },
    content: {
      header: 'Content', title: 'A short name, one line, a verb',
      description: 'Make the title the product or campaign in two to four words, and the subtitle one line of support. Badge labels are a word or two, such as New or Zero balance, and ctaLabel a verb, such as Open or Buy. Pass accessibilityLabel with the offer: the photo tells a screen reader nothing.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Product" description="A product, one line, and Open.">{F()}</ExampleCard>
        <ExampleCard title="Campaign" description="A campaign, its reward, and Join.">{F({ title: 'Festive rewards', subtitle: 'Earn 2× JioPoints on UPI', badgeLabel: 'Diwali', specialBadgeLabel: 'Ends Sunday', ctaLabel: 'Join', accessibilityLabel: 'Festive rewards, earn 2× JioPoints on UPI, ends Sunday' })}</ExampleCard>
      </div>,
    },
    context: {
      header: 'In context', title: 'An offer on the Home screen',
      description: 'Home shows one offer under its heading. Open starts the screen’s own sign-up through onCtaPress; the card only shows the offer.',
      body: <div className="coin-new-context">
        <FitWidth>
          <VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes}>
            <Title title="For you" subtitle="Offers picked for your savings" modes={LIGHT} />
            {M({ onCtaPress: () => setOpened(true) })}
          </VStack>
        </FitWidth>
        <p className="coin-new-readout" role="status">{opened ? 'Opened the savings account sign-up' : 'Offer not opened'}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'A photo, your own avatar, a short title',
      description: 'Each pair shows a card that reads at a glance next to one that loses its text, shows a stranger, or cuts its title short.',
      body: <div className="coin-new-stack">
        <DoDont good={F()} bad={F({ imageSource: undefined })} goodTitle="A photo" badTitle="No photo" goodCaption="White text needs a photo behind it." badCaption="The card has no background, so its white title disappears." />
        <DoDont good={F()} bad={F({ avatarSource: undefined })} goodTitle="Your own avatar" badTitle="No avatar source" goodCaption="The brand’s logo in the corner." badCaption="A stranger’s stock photo appears." />
        <DoDont good={F()} bad={F({ title: 'Zero-balance savings account with free debit card' })} goodTitle="A short title" badTitle="A long title" goodCaption="It reads in one line." badCaption="It ends in … on one line" />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Product Merchandising Card contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="20 October 2026" figmaUrl={FIGMA} storybookUrl={STORYBOOK} stories={[
        { label: 'Default', id: 'components-productmerchandisingcard--default' },
        { label: 'No special badge', id: 'components-productmerchandisingcard--no-special-badge' },
        { label: 'Monogram avatar', id: 'components-productmerchandisingcard--monogram-avatar' },
        { label: 'Pressable card', id: 'components-productmerchandisingcard--pressable-card' },
        { label: 'Narrow footer', id: 'components-productmerchandisingcard--narrow-responsive-footer' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (19 October build of Biscuit’s main) from the team’s private package repository. Figma’s Product Merchandising card has the booleans avatar, gradient, showBadge, and showSpecialBadge and the text title and subtitle; the package shows each badge only when you pass its label and has no gradient. Figma darkens the footer with a black gradient, while the package draws only a blurred copy of the photo, so the white text sits on a pale haze, with a lighter band where the copy is re-cropped. Badge icons and the badge, avatar, specialBadge, and cta slots don’t get the card’s modes. Without avatarSource or avatarMonogram the avatar is a stock portrait, and without imageSource the card has no background. The header and footer are a few pixels taller than Figma’s. The published Storybook still shows the older generated page (all reported).</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'productmerchandisingcard',
    corePrinciple: 'The photo sells; the footer names it and acts.',
    figmaUrl: FIGMA, storybookUrl: STORYBOOK,
  }} playground={<>
    <div className="preview-stage">
      <FitWidth>{M({
        badgeLabel: badge ? 'New' : undefined,
        specialBadgeLabel: special ? 'Zero balance' : undefined,
        ...AVATAR[avatar],
        onCtaPress: () => setLast('Open pressed'),
        onPress: pressable ? () => setLast('Card pressed') : undefined,
      })}</FitWidth>
      <span className="stage-label">Live Coin Product Merchandising Card</span>
    </div>
    <div className="controls-panel">
      <OnOff label="badgeLabel" value={badge} onChange={setBadge} />
      <OnOff label="specialBadgeLabel" value={special} onChange={setSpecial} />
      <Segment label="avatar" value={avatar} options={['avatarSource', 'avatarMonogram', 'none'] as const} onChange={setAvatar} />
      <OnOff label="onPress" value={pressable} onChange={setPressable} />
      <Readout title="Last press" value={last}>With onPress on, the whole card is a button, with Open still inside it.</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'productmerchandisingcard',
  label: 'Product Merchan\u00ADdising Card',
  summary: 'Use a Product Merchandising Card to promote one product or campaign on a photo, with a badge, a short title, and one action.',
  keywords: ['promo card', 'merchandising card', 'campaign card', 'offer card', 'banner', 'image card'],
  icon: <><rect x="2.5" y="3" width="13" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M2.75 12l3.5-3 3 2.5 2-1.5 3.75 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /><circle cx="12" cy="6.5" r="1.25" stroke="currentColor" strokeWidth="1.5" fill="none" /></>,
  Component: ProductMerchandisingCardGuide,
})
