import { useState, type ComponentProps, type ReactNode } from 'react'
import { Button, IconCapsule, Image, PageHero, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, ScreenFrame, Segment, Sources, byTestId, docsUrl } from '../guide-kit'
import { defineGuide } from './define'
import goldCoin from '../assets/gold-coin.png'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4453-2348'
const LIGHT = { 'Color Mode': 'Light' } as Modes
const noop = () => {}

const COIN = <Image imageSource={goldCoin} width={117} height={117} />
const COIN70 = <Image imageSource={goldCoin} width={70} height={70} />
const CAPSULE = <IconCapsule iconName="ic_confirm" modes={LIGHT} />

const TWO = (onStart: () => void = noop, onLearn: () => void = noop) => (
  <VStack modes={{ ...LIGHT, 'Slot gap': 'S' } as Modes} style={{ width: '100%' }}>
    <Button label="Start saving" modes={LIGHT} style={{ width: '100%' }} onPress={onStart} />
    <Button label="Learn more" modes={{ ...LIGHT, Emphasis: 'Medium' } as Modes} style={{ width: '100%' }} onPress={onLearn} />
  </VStack>
)

type PGProps = Partial<ComponentProps<typeof PageHero>>
const PG = (overrides: PGProps = {}) => <PageHero modes={LIGHT} onButtonPress={noop} {...overrides} />
const Host = ({ children }: { children: ReactNode }) => <VStack modes={LIGHT} style={{ width: 328, maxWidth: '100%' }}>{children}</VStack>
const H = (overrides: PGProps = {}) => <Host>{PG(overrides)}</Host>
const DARK = (children: ReactNode) => (
  <ScreenFrame size="screen" surface="dark">
    <VStack modes={LIGHT} style={{ height: '100%', paddingVertical: 24 }} justifyVertical="center">{children}</VStack>
  </ScreenFrame>
)

const A = byTestId('pg-anatomy')
const A_MEDIA = `${A} > div:nth-child(1)`
const A_EYEBROW = `${A} > div:nth-child(2) > [dir="auto"]:first-child`
const A_HEADLINE = `${A} > div:nth-child(2) > [dir="auto"]:last-child`
const A_SUPPORTING = `${A} > [dir="auto"]:nth-child(3)`
const A_BODY = `${A} > [dir="auto"]:nth-child(4)`
const A_ACTION = `${A} > [role="button"]`

const S = byTestId('pg-sizing')
const S_EYEBROW = `${S} > div:nth-child(1) > [dir="auto"]:first-child`
const S_HEADLINE = `${S} > div:nth-child(1) > [dir="auto"]:last-child`

function PageHeroGuide() {
  const [media, setMedia] = useState(true)
  const [showEyebrow, setShowEyebrow] = useState(true)
  const [showSupportingText, setShowSupportingText] = useState(true)
  const [showButton, setShowButton] = useState(true)
  const [size, setSize] = useState<'M' | 'S'>('M')
  const [presses, setPresses] = useState(0)
  const [last, setLast] = useState<string | null>(null)

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'Media, three lines, one action',
      description: 'Everything is centred in one column: the media on top, the eyebrow and the headline, the supporting line and the body, then the button across the full width.',
      body: <Anatomy specimenWidth={328} marks={[{ kind: 'gap', from: A_EYEBROW, to: A_HEADLINE }]} parts={[
        { name: 'Media', note: 'media, in a 117 px box at Video / Output L.', target: A_MEDIA, side: 'left' },
        { name: 'Eyebrow', note: 'eyebrow, a short category, 18 px Bold.', target: A_EYEBROW, side: 'right' },
        { name: 'Headline', note: 'headline, 29 px Black; it wraps, centred.', target: A_HEADLINE, side: 'left' },
        { name: 'Supporting text', note: 'supportingText, the price or term, 12 px.', target: A_SUPPORTING, side: 'right' },
        { name: 'Body', note: 'body, a second fact; hidden until you pass it.', target: A_BODY, side: 'left' },
        { name: 'Action', note: 'A full-width Button, or your buttonSlot.', target: A_ACTION, side: 'bottom' },
      ]}>{PG({ testID: 'pg-anatomy', media: COIN, supportingText: '₹999/year', body: 'Auto-renews · Cancel anytime' })}</Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Media, size, actions, and the page',
      description: 'media takes any Coin element, such as an Image or an Icon Capsule, in a box Video / Output sizes to 117, 70, or 20 px; give it something that size, because the box clips the rest. PageHero Size S makes the text smaller, with an 18 px headline and 12 px gaps; set Button / Size S with it, as Figma does. The hero passes its modes to the button, so AppearanceBrand recolours it, and buttonSlot replaces it, for example with two stacked buttons. Page type JioPlus turns the text white for the JioFinance+ page’s dark backdrop.',
      body: <div className="coin-new-stack">
        <div className="coin-new-example-grid">
          <ExampleCard title="An Image" description="Any element, in a 117 px box.">{H({ media: COIN })}</ExampleCard>
          <ExampleCard title="An Icon Capsule" description="Smaller media sits centred in the box.">{H({ media: CAPSULE, eyebrow: 'New benefits unlocked', headline: 'Earn more on every payment', supportingText: 'Available across all your cards', buttonLabel: 'See benefits' })}</ExampleCard>
          <ExampleCard title="Video / Output M" description="A 70 px box, with media to match.">{H({ modes: { ...LIGHT, 'Video / Output': 'M' } as Modes, media: COIN70 })}</ExampleCard>
        </div>
        <div className="coin-new-example-grid">
          <ExampleCard title="PageHero Size M" description="A 29 px headline, 16 px apart.">{H({ media: COIN })}</ExampleCard>
          <ExampleCard title="PageHero Size S" description="An 18 px headline, 12 px apart, and Button / Size S.">{H({ media: COIN, modes: { ...LIGHT, 'PageHero Size': 'S', 'Button / Size': 'S' } as Modes })}</ExampleCard>
        </div>
        <div className="coin-new-example-grid">
          <ExampleCard title="AppearanceBrand Primary" description="The gold button, the default.">{H()}</ExampleCard>
          <ExampleCard title="AppearanceBrand Secondary" description="The button turns purple; the text doesn’t change.">{H({ modes: { ...LIGHT, AppearanceBrand: 'Secondary' } as Modes })}</ExampleCard>
        </div>
        <div className="coin-new-example-grid">
          <ExampleCard title="buttonSlot" description="Two stacked buttons, High then Medium, as in Figma.">{H({ buttonSlot: TWO() })}</ExampleCard>
          <ExampleCard title="Page type JioPlus" description="White text for the JioFinance+ page.">{DARK(PG({ modes: { ...LIGHT, 'Page type': 'JioPlus' } as Modes, eyebrow: 'JioFinance+', headline: 'Your money is working harder for you.', supportingText: 'Active till 22 Apr, 2027', showButton: false }))}</ExampleCard>
        </div>
      </div>,
    },
    states: {
      header: 'States', title: 'Full, or shorter',
      description: 'The hero doesn’t press or load; its button is its only action. showEyebrow, showSupportingText, showBody, and showButton hide their parts, and an empty headline hides the headline. body shows only once you pass one. Pass media only when you have some: media={false} still leaves an empty box.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Offer" description="Eyebrow, headline, price, and button.">{H()}</ExampleCard>
        <ExampleCard title="Without a button" description="showButton={false}: text only.">{H({ eyebrow: 'JioFinance+', headline: 'Earn cashback on every purchase', supportingText: 'Available on all eligible cards', showButton: false })}</ExampleCard>
        <ExampleCard title="Headline only" description="Every switch off but the headline.">{H({ showEyebrow: false, headline: 'You are all set', showSupportingText: false, showButton: false })}</ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'Full width, 16 px inside',
      description: 'The hero fills its host’s width and keeps 16 px clear on each side, but adds nothing above or below, so the screen gives it room. Its parts are 16 px apart and the eyebrow sits 8 px above the headline. With the default copy in a 328 px host it is 328 × 225, and the headline wraps to three 35 px lines. Figma’s hero has no side padding, and its eyebrow and headline lines are 20 and 29 px.',
      body: <Anatomy legend={false} specimenWidth={328} marks={[
        { kind: 'size', target: S, side: 'bottom', label: 'both' },
        { kind: 'gap', from: S_EYEBROW, to: S_HEADLINE },
        { kind: 'padding', target: S },
      ]}>{PG({ testID: 'pg-sizing' })}</Anatomy>,
    },
    content: {
      header: 'Content', title: 'The offer, its price, a verb',
      description: 'Write eyebrow as a short category, such as Upgrade to JioFinance+, and headline as the offer in one sentence. Put the price or term in supportingText and a second, different fact in body. Make buttonLabel a short verb: it stays on one line and is cut off if it’s too long.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Price, then a second fact" description="Two lines that say different things.">{H({ supportingText: '₹999/year', body: 'Auto-renews · Cancel anytime' })}</ExampleCard>
        <ExampleCard title="A long headline" description="It wraps, centred; nothing is cut off.">{H({ eyebrow: 'Important update', headline: 'A longer headline wraps across several lines and stays centred', supportingText: 'Tap to learn more about the changes', buttonLabel: 'Read more' })}</ExampleCard>
      </div>,
    },
    context: {
      header: 'In context', title: 'The top of an offer page',
      description: 'The Digital Gold page opens with the offer: the coin, what it is, and two actions, Start saving and Learn more. The hero only lays them out; each button does its own thing.',
      body: <div className="coin-new-context">
        <ScreenFrame size="full">
          <VStack modes={LIGHT} style={{ flex: 1, paddingVertical: 24 }} justifyVertical="center">
            {PG({ media: COIN, eyebrow: 'Digital Gold', headline: 'Save in gold from ₹10 a day', supportingText: '24K · 99.9% pure', body: 'Stored for free in insured vaults', buttonSlot: TWO(() => setLast('Start saving'), () => setLast('Learn more')) })}
          </VStack>
        </ScreenFrame>
        <p className="coin-new-readout" role="status">{last ? `Pressed ${last}` : 'Nothing pressed'}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'One offer, said once',
      description: 'Each pair shows a hero that reads cleanly next to one that repeats itself or breaks its media.',
      body: <div className="coin-new-stack">
        <DoDont good={H({ supportingText: '₹999/year', body: 'Auto-renews · Cancel anytime' })} bad={H({ body: '₹999/year · ₹0 until 2027' })}
          goodTitle="Two different lines" goodCaption="The price, then what follows from it."
          badTitle="The same sentence twice" badCaption="supportingText and body repeat the price, as Storybook’s Default story does." />
        <DoDont good={H({ media: COIN })} bad={H({ modes: { ...LIGHT, 'Video / Output': 'M' } as Modes, media: COIN })}
          goodTitle="Media sized to its box" goodCaption="A 117 px coin in the 117 px box."
          badTitle="Media bigger than its box" badCaption="Video / Output M is a 70 px box, so the coin is cut off." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Page Hero contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="26 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('pagehero')} stories={[
        { label: 'Default', id: 'components-pagehero--default' },
        { label: 'Figma Master', id: 'components-pagehero--figma-master' },
        { label: 'With Body', id: 'components-pagehero--with-body' },
        { label: 'With Image Media', id: 'components-pagehero--with-image-media' },
        { label: 'With Illustration Media', id: 'components-pagehero--with-illustration-media' },
        { label: 'With Lottie Media', id: 'components-pagehero--with-lottie-media' },
        { label: 'With Video Media', id: 'components-pagehero--with-video-media' },
        { label: 'With Svg Media', id: 'components-pagehero--with-svg-media' },
        { label: 'Media Size M', id: 'components-pagehero--media-size-m' },
        { label: 'Size S', id: 'components-pagehero--size-s' },
        { label: 'Jio Plus On Dark', id: 'components-pagehero--jio-plus-on-dark' },
        { label: 'Without Supporting Text', id: 'components-pagehero--without-supporting-text' },
        { label: 'Without Button', id: 'components-pagehero--without-button' },
        { label: 'Headline Only', id: 'components-pagehero--headline-only' },
        { label: 'Custom Button Slot', id: 'components-pagehero--custom-button-slot' },
        { label: 'Long Headline', id: 'components-pagehero--long-headline' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (23 October build of Biscuit’s main) from the team’s private package repository. Figma’s Page Hero has <code>Eybrow</code>, <code>Headline</code>, <code>Supporting text</code>, and <code>Body</code> text properties and switches for each part, media, and the buttons; it shows media, the body, and two stacked buttons by default, where the package shows one button until you pass media, a body, or a <code>buttonSlot</code>. The package adds 16 px of side padding, its eyebrow and headline lines are taller than Figma’s, <code>PageHero Size</code> S leaves the button at M, and Storybook’s Default story shows the price twice (all reported).</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'pagehero', corePrinciple: 'One offer, said once, with one next step.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('pagehero'),
  }} playground={<>
    <div className="preview-stage">
      {H({ media: media ? COIN : undefined, showEyebrow, showSupportingText, showButton, modes: { ...LIGHT, 'PageHero Size': size, 'Button / Size': size } as Modes, onButtonPress: () => setPresses(n => n + 1) })}
      <span className="stage-label">Live Coin Page Hero</span>
    </div>
    <div className="controls-panel">
      <OnOff label="media" value={media} onChange={setMedia} />
      <OnOff label="showEyebrow" value={showEyebrow} onChange={setShowEyebrow} />
      <OnOff label="showSupportingText" value={showSupportingText} onChange={setShowSupportingText} />
      <OnOff label="showButton" value={showButton} onChange={setShowButton} />
      <Segment label="PageHero Size" value={size} options={['M', 'S'] as const} onChange={setSize} />
      <Readout title="onButtonPress" value={showButton ? `Pressed ${presses} times` : 'No button'}>PageHero Size S also sets Button / Size S here, as Figma does: the button doesn’t follow PageHero Size on its own.</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'pagehero',
  label: 'Page Hero',
  summary: 'Use a Page Hero at the top of a feature or offer page: media, a short eyebrow, the offer as a headline, its price, and one action.',
  keywords: ['offer header', 'feature header', 'upsell', 'promo hero', 'landing hero'],
  icon: <><circle cx="9" cy="4" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M5 8.5h8M6.5 11h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /><rect x="3.75" y="13.25" width="10.5" height="3" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none" /></>,
  Component: PageHeroGuide,
})
