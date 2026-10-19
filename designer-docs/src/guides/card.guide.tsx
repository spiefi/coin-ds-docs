import { useState, type ReactNode } from 'react'
import { Card,HStack, Image, Text, Title, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, Segment, Sources, docsUrl } from '../guide-kit'
import { defineGuide } from './define'
import bankHero from '../assets/bank-hero.png'
import jioLogo from '../assets/jio-gold-logo.png'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=5739-794'
const LIGHT = { 'Color Mode': 'Light' } as Modes
const NEUTRAL = { ...LIGHT, AppearanceBrand: 'Neutral' } as Modes
const W = { width: 200 } as const

const HEADER = <HStack alignVertical="center"><Image imageSource={jioLogo} width={18} height={18} accessibilityElementsHidden importantForAccessibility="no" /><Text text="JioFinance" /></HStack>
const MEDIA = <Image imageSource={bankHero} width="100%" height="100%" accessibilityLabel="Two people smiling at a phone" />

type TextSet = readonly [string, string, string]
const SAVINGS: TextSet = ['Jio Payments Bank', 'Savings account', 'Zero balance']
const GOLD: TextSet = ['Digital gold', '24K digital gold', 'From ₹10']
const FD: TextSet = ['Fixed deposit', 'Earn 7.25% a year', 'From ₹1,000']

type COpts = {
  variant?: 'default' | 'slim'
  header?: ReactNode | false
  media?: ReactNode | false
  modes?: Modes
  text?: TextSet
  style?: object
  mediaAspectRatio?: number
  onPress?: () => void
  accessibilityLabel?: string
}
const C = ({ variant, header, media, modes = NEUTRAL, text = SAVINGS, style = W, mediaAspectRatio, onPress, accessibilityLabel }: COpts = {}) => (
  <Card variant={variant} header={header as never} media={media as never} modes={modes} style={style as never} mediaAspectRatio={mediaAspectRatio} onPress={onPress} accessibilityLabel={accessibilityLabel}>
    <Card.SupportText>{text[0]}</Card.SupportText>
    <Card.Title>{text[1]}</Card.Title>
    <Card.SupportText>{text[2]}</Card.SupportText>
  </Card>
)

const R = ':scope > div'
const P = {
  header: `${R} > div:nth-child(1)`,
  media: `${R} > div:nth-child(2)`,
  content: `${R} > div:last-child`,
  support: `${R} > div:last-child > [dir="auto"]:first-child`,
  title: `${R} > div:last-child > [dir="auto"]:nth-child(2)`,
}

const BRANDS = ['Primary', 'Secondary', 'Neutral', 'Tertiary'] as const
type Brand = typeof BRANDS[number]
const VARIANTS = ['default', 'slim'] as const
type Variant = typeof VARIANTS[number]

function CardGuide() {
  const [variant, setVariant] = useState<Variant>('default')
  const [brand, setBrand] = useState<Brand>('Neutral')
  const [header, setHeader] = useState(true)
  const [media, setMedia] = useState(true)
  const [presses, setPresses] = useState(0)
  const [opened, setOpened] = useState<string | null>(null)

  const shown = [header && 'Header', media && variant === 'default' && 'Media', 'Content'].filter(Boolean).join(', ')
  const status = (s: string) => ({ ...LIGHT, 'Semantic Intent': 'System', AppearanceSystem: s }) as Modes

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A header, a picture, and the text',
      description: 'A panel stacks three slots: header for a logo or a label, media for a picture, and the content you pass as children, usually Card.SupportText and Card.Title. Each slot shows only when you pass it.',
      body: <Anatomy specimenWidth={200} parts={[
        { name: 'Header', note: 'header: a logo or a label in a row padded 12 px.', target: P.header, side: 'left' },
        { name: 'Media', note: 'media: a picture across the full width at 154:116.', target: P.media, side: 'right' },
        { name: 'Support text', note: 'Card.SupportText: a 12 px line for a category or a fact.', target: P.support, side: 'left' },
        { name: 'Title', note: 'Card.Title: the name in 16 px heavy type, up to 3 lines.', target: P.title, side: 'right' },
        { name: 'Content', note: 'children: a column padded 12 px, 4 px between lines.', target: P.content, side: 'bottom' },
        { name: 'Panel', note: 'AppearanceBrand sets the fill; corners are 12 px.', target: R, side: 'top' },
      ]}>
        {C({ header: HEADER, media: MEDIA })}
      </Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Two variants, three slots, and a fill',
      description: 'variant default shows a picture when you pass media; slim never does. Pass header for a logo or a label, media for a picture, and children for the text, and leave out what you don’t need. AppearanceBrand sets the fill: with no modes the card is Primary cream, and Figma draws it Neutral white. Semantic Intent System tints it with AppearanceSystem’s status colour. Card Container Plain removes the panel; Page type SubPage and context 8 Section add a grey border.',
      body: <div className="coin-new-stack">
        <div className="coin-new-example-grid three">
          <ExampleCard title="Default" description="A logo, a picture, and the text, for an offer that leads with an image.">{C({ header: HEADER, media: MEDIA })}</ExampleCard>
          <ExampleCard title="Slim" description="The logo and the text, without a picture.">{C({ variant: 'slim', header: HEADER, text: GOLD })}</ExampleCard>
          <ExampleCard title="Text only" description="Just children: a plain panel for a few lines.">{C({ text: FD })}</ExampleCard>
        </div>
        <div className="coin-new-example-grid">
          <ExampleCard title="Primary (default)" description="With no AppearanceBrand the card is cream.">{C({ variant: 'slim', header: HEADER, text: GOLD, modes: LIGHT })}</ExampleCard>
          <ExampleCard title="Neutral" description="White, as Figma and Storybook draw it.">{C({ variant: 'slim', header: HEADER, text: GOLD, modes: NEUTRAL })}</ExampleCard>
          <ExampleCard title="Secondary" description="A light purple fill.">{C({ variant: 'slim', header: HEADER, text: GOLD, modes: { ...LIGHT, AppearanceBrand: 'Secondary' } as Modes })}</ExampleCard>
          <ExampleCard title="Tertiary" description="A light blue fill.">{C({ variant: 'slim', header: HEADER, text: GOLD, modes: { ...LIGHT, AppearanceBrand: 'Tertiary' } as Modes })}</ExampleCard>
        </div>
        <div className="coin-new-example-grid three">
          <ExampleCard title="positive" description="Semantic Intent System with AppearanceSystem positive: green.">{C({ text: ['Fixed deposit', 'Matured', '₹1,07,250 paid to your account'], modes: status('positive') })}</ExampleCard>
          <ExampleCard title="warning" description="warning: orange.">{C({ text: ['Fixed deposit', 'Matures in 3 days', 'Choose to renew or withdraw'], modes: status('warning') })}</ExampleCard>
          <ExampleCard title="negative" description="negative: red.">{C({ text: ['Fixed deposit', 'Renewal failed', 'Add ₹1,000 to try again'], modes: status('negative') })}</ExampleCard>
        </div>
        <div className="coin-new-example-grid three">
          <ExampleCard title="Card Container Plain" description="No fill, border, corners, or padding: the text sits on what’s behind it.">{C({ variant: 'slim', header: HEADER, text: GOLD, modes: { ...NEUTRAL, 'Card Container': 'Plain' } as Modes })}</ExampleCard>
          <ExampleCard title="Page type SubPage" description="A light grey border around the white card.">{C({ variant: 'slim', header: HEADER, text: GOLD, modes: { ...NEUTRAL, 'Page type': 'SubPage' } as Modes })}</ExampleCard>
          <ExampleCard title="context 8 Section" description="The same grey border, for a card inside a section.">{C({ variant: 'slim', header: HEADER, text: GOLD, modes: { ...NEUTRAL, 'context 8': 'Section' } as Modes })}</ExampleCard>
        </div>
      </div>,
    },
    states: {
      header: 'States', title: 'Static or pressable',
      description: 'Without onPress the card is static. With onPress the whole card is one button: give it an accessibilityLabel when the title isn’t its whole name, and don’t put buttons inside it. disabled stops presses. The card shows no pressed, hover, or disabled look.',
      body: <>
        <div className="coin-new-example-grid">
          <ExampleCard title="Static" description="Text to read: nothing responds.">{C({ variant: 'slim', header: HEADER, text: GOLD })}</ExampleCard>
          <ExampleCard title="Pressable" description="One button; it looks the same as the static card.">{C({ variant: 'slim', header: HEADER, text: GOLD, onPress: () => setPresses(n => n + 1), accessibilityLabel: '24K digital gold, from ₹10' })}</ExampleCard>
        </div>
        <p className="coin-new-readout" role="status">{presses === 0 ? 'Pressable card not pressed yet' : `Pressable card pressed ${presses} ${presses === 1 ? 'time' : 'times'}`}</p>
      </>,
    },
    sizing: {
      header: 'Sizing', title: 'Your layout sets the width',
      description: 'The card fills a column’s width but hugs its content in a row, so give it a width there; Figma and Storybook draw it at 200 px. Height follows the content. The picture keeps 154:116 of the width, and mediaAspectRatio changes that. The header and the text are padded 12 px, with 4 px between slots and between lines; Gap M and L widen both, and Gap None removes them.',
      body: <div className="coin-new-stack">
        <Anatomy legend={false} specimenWidth={200} marks={[
          { kind: 'size', target: R, side: 'bottom', label: 'both' },
          { kind: 'padding', target: P.content },
          { kind: 'gap', from: P.media, to: P.content },
        ]}>
          {C({ header: HEADER, media: MEDIA })}
        </Anatomy>
        <div className="coin-new-example-grid three">
          <ExampleCard title="Gap M" description="14 px between slots, 18 px between lines.">{C({ variant: 'slim', header: HEADER, text: GOLD, modes: { ...NEUTRAL, Gap: 'M' } as Modes })}</ExampleCard>
          <ExampleCard title="Gap L" description="23 px for both.">{C({ variant: 'slim', header: HEADER, text: GOLD, modes: { ...NEUTRAL, Gap: 'L' } as Modes })}</ExampleCard>
          <ExampleCard title="mediaAspectRatio 1" description="A square picture.">{C({ media: MEDIA, text: SAVINGS, mediaAspectRatio: 1 })}</ExampleCard>
        </div>
      </div>,
    },
    content: {
      header: 'Content', title: 'A name and one fact',
      description: 'Make the title the product or offer name, and each support line one fact: a category, a price, a date, or a status. The header is a logo or a label, not a second title. Card.Title stops at three lines with an ellipsis; Card.SupportText never stops, so keep it short.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Name and one fact" description="“24K digital gold”, and its price.">{C({ variant: 'slim', header: HEADER, text: GOLD })}</ExampleCard>
        <ExampleCard title="Long title" description="Card.Title stops at three lines.">{C({ variant: 'slim', header: HEADER, text: ['Digital gold', 'Buy 24K digital gold in seconds and keep it in an insured vault at no cost', 'From ₹10'] })}</ExampleCard>
      </div>,
    },
    context: {
      header: 'In context', title: 'Offers on the Home screen',
      description: 'Two offers share a row, each card taking half of it. The cards use the package default, Primary cream. Each card’s onPress opens its offer: the screen does the navigation, and the card only reports the press.',
      body: <div className="coin-new-context">
        <VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes}>
          <Title title="Offers for you" subtitle="Picked for your savings" modes={LIGHT} />
          <HStack alignVertical="stretch" modes={LIGHT}>
            {C({ variant: 'slim', header: HEADER, text: GOLD, modes: LIGHT, style: { flex: 1 }, onPress: () => setOpened('24K digital gold'), accessibilityLabel: '24K digital gold, from ₹10' })}
            {C({ variant: 'slim', header: HEADER, text: FD, modes: LIGHT, style: { flex: 1 }, onPress: () => setOpened('Fixed deposit'), accessibilityLabel: 'Fixed deposit, earn 7.25% a year' })}
          </HStack>
        </VStack>
        <p className="coin-new-readout" role="status">{opened ? `Opened: ${opened}` : 'No offer opened'}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'A picture, a name, and nothing empty',
      description: 'Each pair shows a card that reads at a glance next to one that loses its picture, its name, or its spacing.',
      body: <div className="coin-new-stack">
        <DoDont
          good={C({ header: HEADER, media: MEDIA })}
          bad={C({ variant: 'slim', header: HEADER, media: MEDIA })}
          goodTitle="Default for a picture" goodCaption="The picture leads the card."
          badTitle="A picture on a slim card" badCaption="Slim drops the picture without a warning." />
        <DoDont
          good={C({ variant: 'slim', header: HEADER, text: GOLD })}
          bad={C({ variant: 'slim', header: HEADER, text: ['Digital gold', '24K digital gold', 'Buy and sell 24K gold any time, from as little as ₹10, and we keep it in an insured vault for you at no extra cost.'] })}
          goodTitle="A name and one fact" goodCaption="“24K digital gold”, from ₹10."
          badTitle="A paragraph of support text" badCaption="Support text never stops, so the card grows and the name gets lost." />
        <DoDont
          good={C({ variant: 'slim', text: GOLD })}
          bad={C({ variant: 'slim', header: false, text: GOLD })}
          goodTitle="Leave out a slot" goodCaption="No header, so the text starts at the top."
          badTitle="Pass false to hide a slot" badCaption="An empty 24 px band stays where the header was." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Card contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="19 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('card')} stories={[
        { label: 'Default', id: 'components-card--default' },
        { label: 'Slim', id: 'components-card--slim' },
        { label: 'Real image', id: 'components-card--with-real-image' },
        { label: 'Header', id: 'components-card--with-header' },
        { label: 'Custom content', id: 'components-card--custom-content' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (16 October build) from the team’s private package repository. Figma’s Card has two variants, Default and Slim, drawn white (AppearanceBrand Neutral) at 200 px with fixed heights; in code the card hugs its content, and with no modes it is cream (Primary). Figma’s header and media switches are the <code>header</code> and <code>media</code> props in code: pass them or leave them out. Passing <code>false</code> leaves an empty band, and the card shows no pressed or disabled look (both reported). The card doesn’t read the app’s theme, so pass modes on the card or place it in a Coin stack. The published Storybook still shows the older generated page.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'card',
    corePrinciple: 'One card, one idea: a name and one fact.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('card'),
  }} playground={<>
    <div className="preview-stage">
      {C({ variant, header: header ? HEADER : undefined, media: media ? MEDIA : undefined, modes: { ...LIGHT, AppearanceBrand: brand } as Modes })}
      <span className="stage-label">Live Coin Card</span>
    </div>
    <div className="controls-panel">
      <Segment label="variant" value={variant} options={VARIANTS} onChange={setVariant} />
      <Segment label="AppearanceBrand" value={brand} options={BRANDS} onChange={setBrand} />
      <OnOff label="header" value={header} onChange={setHeader} />
      <OnOff label="media" value={media} onChange={setMedia} />
      <Readout title="Slots shown" value={shown}>Slim ignores media even when you pass it.</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'card',
  label: 'Card',
  summary: 'Use a Card to group one product, offer, or article on a panel, with an optional logo, a picture, and a few lines of text.',
  keywords: ['product card', 'offer card', 'surface', 'panel', 'container'],
  icon: <><rect x="3" y="2.5" width="12" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M3 9h12M5.5 11.5h6M5.5 13.5h3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /></>,
  Component: CardGuide,
})
