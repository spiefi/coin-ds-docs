import { useState, type ComponentProps } from 'react'
import { PdpCcCard, Title, VStack, type Modes } from 'jfs-components'
import coin from '../assets/gold-coin.png'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, FitWidth, OnOff, Readout, Segment, Sources, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=5352-935'
const LIGHT = { 'Color Mode': 'Light' } as Modes
const noop = () => {}

const TWO = [
  { title: 'Weight', value: '5 g', caption: 'one coin', icon: 'ic_scale' },
  { title: 'Price', value: '₹31,200', caption: 'incl. GST', icon: 'ic_rupee_coin' },
]
const ONE = [TWO[1]]
const THREE = [
  { title: 'Weight', value: '5 g', caption: 'one coin', icon: 'ic_scale' },
  { title: 'Purity', value: '24K', caption: '99.9% pure', icon: 'ic_star' },
  { title: 'Delivery', value: 'Free', caption: 'in 2 days', icon: 'ic_protection_locked' },
]
const PLAIN = TWO.map(({ icon: _icon, ...rest }) => rest)
const LONG = '24K gold coin, 5 g, with a certificate of purity'

type PDPProps = Partial<ComponentProps<typeof PdpCcCard>>
const BASE: PDPProps = {
  imageSource: coin, imageWidth: 60, imageHeight: 60, title: '5 g gold coin', subtitle: '24K · 99.9% pure',
  metrics: TWO, buttonLabel: 'Add to cart', onButtonPress: noop, modes: LIGHT,
}
function PDP(overrides: PDPProps = {}) {
  return <PdpCcCard {...BASE} {...overrides} />
}
const Fit = (overrides: PDPProps = {}) => <FitWidth>{PDP(overrides)}</FitWidth>

const R = ':scope > div'
const MEDIA = `${R} > div:nth-child(1)`
const HEADING = `${R} [role="heading"]`

function PdpCcCardGuide() {
  const [count, setCount] = useState<'1' | '2' | '3'>('2')
  const [showButton, setShowButton] = useState(true)
  const [icon, setIcon] = useState(true)
  const [last, setLast] = useState('None')
  const [cart, setCart] = useState(0)

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A centred stack on a white panel',
      description: 'The picture, the name and its subtitle, a row of facts, and one button sit centred on a white panel, 12 px apart.',
      body: <Anatomy parts={[
        { name: 'Picture', note: 'imageSource, in an imageWidth × imageHeight box (100 × 60 by default).', target: `${MEDIA} > div`, side: 'top' },
        { name: 'Title', note: 'title: 26 px heavy, on one line with an ellipsis.', target: `${HEADING} > [dir="auto"]:first-child`, side: 'left' },
        { name: 'Subtitle', note: 'subtitle: one qualifier, 14 px; it wraps.', target: `${HEADING} > [dir="auto"]:last-child`, side: 'right' },
        { name: 'Metric', note: 'One metrics entry: its title, icon and value, and caption.', target: `${R} > div:nth-child(3) > div:first-child > div:nth-child(2)`, side: 'left' },
        { name: 'Action', note: 'A small light purple Button from buttonLabel and buttonIcon.', target: `${R} > button`, side: 'bottom' },
        { name: 'Panel', note: 'A white panel with square corners, 344 px wide.', target: R, side: 'right', at: 0.9 },
      ]}>{PDP()}</Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Facts and the action',
      description: 'metrics takes one entry per fact: a title, a value, an optional caption, and an optional icon from the Coin icon set. Entries share the row in equal columns. The card makes its Button small, light purple, and Emphasis Medium, with a plus icon before the label: buttonIcon changes the icon, and null removes it. showButton false removes the button. On the card, AppearanceBrand changes the button and the metric icons, and Emphasis changes the button. media replaces the picture with your own component, and button replaces the Button.',
      body: <div className="coin-new-stack">
        <div className="coin-new-example-grid">
          <ExampleCard title="Two metrics" description="Weight and price side by side, in equal columns.">{Fit()}</ExampleCard>
          <ExampleCard title="One metric" description="A single fact takes the whole row.">{Fit({ metrics: ONE })}</ExampleCard>
          <ExampleCard title="Three metrics" description="Each fact gets a third of the width, so values stay short.">{Fit({ metrics: THREE })}</ExampleCard>
          <ExampleCard title="Without icons" description="Leave out icon for text-only facts.">{Fit({ metrics: PLAIN })}</ExampleCard>
        </div>
        <div className="coin-new-example-grid">
          <ExampleCard title="No button" description="The card ends at the facts, 44 px shorter.">{Fit({ showButton: false })}</ExampleCard>
          <ExampleCard title="No button icon" description="buttonIcon null leaves the label on its own.">{Fit({ buttonIcon: null })}</ExampleCard>
          <ExampleCard title="AppearanceBrand Primary" description="A gold button and gold metric icons.">{Fit({ modes: { ...LIGHT, AppearanceBrand: 'Primary' } as Modes })}</ExampleCard>
          <ExampleCard title="Emphasis High" description="A solid purple button.">{Fit({ modes: { ...LIGHT, Emphasis: 'High' } as Modes })}</ExampleCard>
        </div>
      </div>,
    },
    states: {
      header: 'States', title: 'Its button acts, or the whole card does',
      description: 'The card isn’t pressable: its button is. onPress makes the whole card one button, named by its title. Use one or the other: a pressable card with its button puts a button inside a button. The card has no disabled, selected, or loading state.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Button acts" description="Only Add to cart presses.">{Fit()}</ExampleCard>
        <ExampleCard title="Whole card" description="The card is one button, named 5 g gold coin.">{Fit({ showButton: false, onPress: noop })}</ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: '344 px wide, centred content',
      description: 'The card is 344 px wide, as in Figma; width sets another number or a percentage of its host. Everything inside is centred, 12 px apart, with 20 px of padding at the top and bottom and 16 px at the sides. The picture box is imageWidth × imageHeight, and the height follows the content.',
      body: <div className="coin-new-stack">
        <Anatomy legend={false} marks={[
          { kind: 'size', target: R, side: 'bottom', label: 'both' },
          { kind: 'padding', target: R },
          { kind: 'gap', from: MEDIA, to: HEADING },
        ]}>{PDP()}</Anatomy>
        <div className="coin-new-example-grid">
          <ExampleCard title="width 280" description="The facts share less room, and a long title is cut sooner.">{Fit({ width: 280 })}</ExampleCard>
          <ExampleCard title="Bigger picture" description="The picture box sets the space above the title.">{Fit({ imageWidth: 96, imageHeight: 96 })}</ExampleCard>
        </div>
      </div>,
    },
    content: {
      header: 'Content', title: 'A name, one qualifier, short facts',
      description: 'Make the title the product’s name, short enough for one line, and the subtitle one qualifier, such as its purity. Name each fact with a noun, such as Weight or Price, and keep values to a number or a word. Label the button with what it does, such as Add to cart. A title longer than one line is cut with an ellipsis; numberOfLines gives it more lines, and disableTruncation lets it wrap in full.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Long title" description="Cut at one line with an ellipsis.">{Fit({ title: LONG })}</ExampleCard>
        <ExampleCard title="numberOfLines 2" description="Two lines before the ellipsis; the card grows.">{Fit({ title: LONG, numberOfLines: 2 })}</ExampleCard>
      </div>,
    },
    context: {
      header: 'In context', title: 'Top of a product page',
      description: 'The card opens the product page, under the page’s heading. Add to cart calls the screen’s own cart through onButtonPress; the card only lays out the product.',
      body: <div className="coin-new-context">
        <FitWidth>
          <VStack modes={{ ...LIGHT, 'Slot gap': 'M', Padding: 'None' } as Modes} style={{ width: 344 }}>
            <Title title="Gold coins" subtitle="Insured delivery to your door" modes={LIGHT} />
            {PDP({ onButtonPress: () => setCart((n) => n + 1) })}
          </VStack>
        </FitWidth>
        <p className="coin-new-readout" role="status">{cart === 0 ? 'Your cart is empty' : cart === 1 ? '1 coin in your cart' : `${cart} coins in your cart`}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'A short name, a real picture, a title that fits',
      description: 'Each pair shows a card that reads cleanly next to one that loses the end of its title, leaves an empty box, or spills past its edges.',
      body: <div className="coin-new-stack">
        <DoDont good={Fit()} bad={Fit({ title: 'Buy a 5 g 24K gold coin with free insured delivery' })} goodTitle="A name in the title" goodCaption="The details go in the subtitle and the facts." badTitle="A sentence in the title" badCaption="It’s cut at one line, and the end is lost." />
        <DoDont good={Fit()} bad={Fit({ imageSource: undefined })} goodTitle="Show the product" goodCaption="The picture says what it is at a glance." badTitle="Leave out the picture" badCaption="An empty box still takes its space above the title." />
        <DoDont good={Fit({ title: LONG, disableTruncation: true })} bad={Fit({ title: LONG, singleLine: true })} goodTitle="Let a long title wrap" goodCaption="disableTruncation shows all of it, and the card grows." badTitle="singleLine with a long title" badCaption="The title runs past both edges of the card." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public PDP Card contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="21 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('pdpcccard')} stories={[
        { label: 'Default', id: 'components-pdpcccard--default' },
        { label: 'Single metric', id: 'components-pdpcccard--single-metric' },
        { label: 'Metrics without icons', id: 'components-pdpcccard--metrics-without-icons' },
        { label: 'Button hidden', id: 'components-pdpcccard--button-hidden' },
        { label: 'Pressable card', id: 'components-pdpcccard--pressable-card' },
        { label: 'Title truncation', id: 'components-pdpcccard--title-truncation' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (19 October build of Biscuit’s main) from the team’s private package repository. Its export is <code>PdpCcCard</code>. Figma’s PDP cc card has no component properties; its parts are nested instances. In the package, the divider between metrics has no height on the web, so no line shows (Figma draws one 46 px tall); the button’s plus icon is 18 px where Figma’s is 16; and the card is 316 px tall where Figma’s is 310, because its text lines are taller. Without <code>imageSource</code> an empty box keeps its space, and <code>title</code> and <code>subtitle</code> fall back to the words Title and Subtitle. Every published Storybook story but Title truncation renders the card as a pressable button with its own button inside, and the published page is the older generated one (all reported).</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'pdpcccard', corePrinciple: 'One product, its key facts, one action.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('pdpcccard'),
  }} playground={<>
    <div className="preview-stage">
      <FitWidth>{PDP({
        metrics: count === '1' ? ONE : count === '3' ? THREE : TWO,
        showButton,
        buttonIcon: icon ? undefined : null,
        onButtonPress: () => setLast('Add to cart pressed'),
      })}</FitWidth>
      <span className="stage-label">Live Coin PDP Card</span>
    </div>
    <div className="controls-panel">
      <Segment label="metrics" value={count} options={['1', '2', '3'] as const} onChange={setCount} />
      <OnOff label="showButton" value={showButton} onChange={setShowButton} />
      <OnOff label="buttonIcon" value={icon} onChange={setIcon} />
      <Readout title="Last press" value={last}>Only the button presses. onPress would make the whole card one button instead.</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'pdpcccard',
  label: 'PDP Card',
  summary: 'Use a PDP Card at the top of a product page: the product’s picture, name, two or three key facts, and one action.',
  keywords: ['product card', 'product detail', 'PDP', 'product summary', 'gold coin', 'PdpCcCard'],
  icon: <><rect x="2.5" y="2" width="13" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none" /><rect x="7" y="4.5" width="4" height="3" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none" /><path d="M5.5 10h7M7 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /></>,
  Component: PdpCcCardGuide,
})
