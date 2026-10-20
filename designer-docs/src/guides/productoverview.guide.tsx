import { useState } from 'react'
import { Button, ProductOverview, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, Segment, Sources, docsUrl } from '../guide-kit'
import { defineGuide } from './define'
import coin from '../assets/gold-coin.png'
import jioLogo from '../assets/jio-gold-logo.png'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2768-56'
const LIGHT = { 'Color Mode': 'Light' } as Modes
const noop = () => {}
const W = { maxWidth: 343 } as const

const STATS = {
  two: [{ value: '995', label: 'Purity' }, { value: '3%', label: 'GST' }],
  three: [{ value: '995', label: 'Purity' }, { value: '3%', label: 'GST' }, { value: '5g', label: 'Weight' }],
}
const LONG = [{ value: '₹7,812.50', label: 'Price per gram today' }, { value: '3%', label: 'GST' }]

const PO = {
  imageSource: coin, labelImageSource: jioLogo, label: 'Gold', productName: '5g Gold Coin',
  description: 'Your gold is insured from our vault to you. If lost or damaged, we’ll replace it.', stats: STATS.two,
}

type POProps = React.ComponentProps<typeof ProductOverview>
function PV(overrides: Partial<POProps> = {}) {
  return <ProductOverview {...PO} modes={LIGHT} style={W} {...overrides} />
}

const R = ':scope > div'
const PICTURE = `${R} > div:nth-child(1)`
const CHIP = `${R} > div:nth-child(2)`
const NAME = `${R} > h1`
const DESCRIPTION = `${R} > h1 + div`
const STATS_SEL = `${R} > div:last-child`

type Count = 'two' | 'three' | '[]'
type Appearance = 'Neutral' | 'Primary' | 'Secondary'

function ProductOverviewGuide() {
  const [picture, setPicture] = useState(true)
  const [chipPicture, setChipPicture] = useState(true)
  const [count, setCount] = useState<Count>('two')
  const [appearance, setAppearance] = useState<Appearance>('Neutral')
  const [bought, setBought] = useState(false)

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A picture, a chip, a name, and facts',
      description: 'A white panel centres the product’s picture, a chip naming the metal or brand, the product’s name, a description, and a row of stats, 12 px apart.',
      body: <Anatomy specimenWidth={343} parts={[
        { name: 'Picture', note: 'imageSource, fitted inside the full width at 288:170.', target: PICTURE, side: 'left' },
        { name: 'Chip', note: 'A ProductLabel from label, with labelImageSource as its picture.', target: CHIP, side: 'right' },
        { name: 'Name', note: 'productName, 26 px, centred: the page’s heading.', target: NAME, side: 'left' },
        { name: 'Description', note: 'description, 14 px, centred; it renders white on white today.', target: DESCRIPTION, side: 'right' },
        { name: 'Stats', note: 'stats: a value over a label each, in equal columns.', target: STATS_SEL, side: 'bottom' },
        { name: 'Panel', note: 'A white panel, 24 px padding, no corners or border.', target: R, side: 'right', at: 0.1 },
      ]}>{PV()}</Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Picture, chip, facts, and colour',
      description: 'imageSource adds the product’s picture at the top, fitted inside the full width at 288:170 unless imageRatio says otherwise; without it the card starts at the chip. labelImageSource puts a small round picture in the chip. stats takes any number of facts in equal columns, and [] removes the row. children adds your own content between the description and the stats, with the card’s modes. Text Appearance colours the name and the stat labels.',
      body: <div className="coin-new-stack"><div className="coin-new-example-grid">
        <ExampleCard title="Picture" description="The product’s picture leads.">{PV()}</ExampleCard>
        <ExampleCard title="No picture" description="The chip leads.">{PV({ imageSource: undefined })}</ExampleCard>
        <ExampleCard title="Three stats" description="Three equal columns.">{PV({ stats: STATS.three })}</ExampleCard>
        <ExampleCard title="No stats" description="The name and description only.">{PV({ stats: [] })}</ExampleCard>
        <ExampleCard title="imageRatio 2" description="A wider frame, so a smaller coin.">{PV({ imageRatio: 2 })}</ExampleCard>
        <ExampleCard title="No chip picture" description="The chip shows only its label.">{PV({ labelImageSource: undefined })}</ExampleCard>
      </div><div className="coin-new-example-grid">
        <ExampleCard title="Text Appearance Primary" description="A gold name and stat labels.">{PV({ modes: { ...LIGHT, 'Text Appearance': 'Primary' } as Modes })}</ExampleCard>
        <ExampleCard title="Text Appearance Secondary" description="A purple name and stat labels.">{PV({ modes: { ...LIGHT, 'Text Appearance': 'Secondary' } as Modes })}</ExampleCard>
      </div></div>,
    },
    states: {
      header: 'States', title: 'Nothing to press',
      description: 'Product Overview has no states: it isn’t pressable and has no selected, disabled, or loading look. Put the product’s action on the screen next to it, not inside it.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Read-only" description="Nothing on the card responds to a press.">{PV()}</ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'The host sets the width',
      description: 'The card fills its host’s width; Figma draws it at 343 px. The picture fills the width inside 24 px of padding, so a wider card has a taller picture, and the parts are 12 px apart. The name and description wrap. Stat values and labels stay on one line and end in … unless disableTruncation is set.',
      body: <div className="coin-new-stack">
        <Anatomy legend={false} specimenWidth={343} marks={[
          { kind: 'size', target: R, side: 'bottom', label: 'both' },
          { kind: 'padding', target: R },
          { kind: 'gap', from: PICTURE, to: CHIP },
        ]}>{PV()}</Anatomy>
        <div className="coin-new-example-grid">
          <ExampleCard title="Narrow host" description="At 240 px the picture shrinks with the card."><div className="coin-new-host narrow">{PV({ style: undefined })}</div></ExampleCard>
          <ExampleCard title="Wide host" description="At 360 px the picture grows with the card."><div className="coin-new-host wide">{PV({ style: undefined })}</div></ExampleCard>
          <ExampleCard title="Long stats" description="Stat values and labels end in … on one line."><div className="coin-new-host narrow">{PV({ style: undefined, stats: LONG })}</div></ExampleCard>
          <ExampleCard title="disableTruncation" description="The stats wrap instead."><div className="coin-new-host narrow">{PV({ style: undefined, stats: LONG, disableTruncation: true })}</div></ExampleCard>
        </div>
      </div>,
    },
    content: {
      header: 'Content', title: 'The product, its metal, and its figures',
      description: 'Make productName the product with its size, such as 5g Gold Coin, and the chip’s label the metal or brand, not the product again. The description is a sentence or two on why to trust it. A stat value is the figure, such as 995 or 3%, and its label a word or two, such as Purity or GST.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Gold coin" description="Gold in the chip, the size in the name.">{PV()}</ExampleCard>
        <ExampleCard title="Silver coin" description="Silver in the chip, three figures.">{PV({
          imageSource: undefined, labelImageSource: undefined, label: 'Silver', productName: '10g Silver Coin',
          description: 'Insured delivery to your door, with a purity certificate.',
          stats: [{ value: '999', label: 'Purity' }, { value: '3%', label: 'GST' }, { value: '10g', label: 'Weight' }],
        })}</ExampleCard>
      </div>,
    },
    context: {
      header: 'In context', title: 'A gold coin’s product page',
      description: 'The overview explains the product; the Buy button under it belongs to the screen, because the card has no action of its own. Buy opens the screen’s own checkout.',
      body: <div className="coin-new-context">
        <VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes}>
          {PV({ style: undefined })}
          <Button label="Buy for ₹38,750" onPress={() => setBought(true)} modes={LIGHT} style={{ alignSelf: 'stretch' }} />
        </VStack>
        <p className="coin-new-readout" role="status">{bought ? 'Opened checkout for the 5g Gold Coin' : 'Not bought yet'}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Figures, a chip that adds, an action outside',
      description: 'Each pair shows a card that reads at a glance next to one that cuts a fact short, repeats itself, or pushes an action into the card.',
      body: <div className="coin-new-stack">
        <DoDont good={PV()} bad={PV({ stats: [{ value: 'Insured from our vault to you', label: 'Promise' }, { value: '3%', label: 'GST' }] })}
          goodTitle="Figures in stats" goodCaption="A number and a word or two each."
          badTitle="A sentence in a stat" badCaption="Stats stay on one line, so it’s cut short." />
        <DoDont good={PV()} bad={PV({ label: '5g Gold Coin' })}
          goodTitle="The metal in the chip" goodCaption="Gold, then the product’s name."
          badTitle="The name twice" badCaption="The chip repeats 5g Gold Coin." />
        <DoDont good={PV()} bad={PV({ children: <Button label="Buy" onPress={noop} /> })}
          goodTitle="The action under the card" goodCaption="Keep Buy on the screen, below the overview."
          badTitle="A Button in children" badCaption="It lands between the description and the facts." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Product Overview contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="20 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('productoverview')} stories={[
        { label: 'Default', id: 'components-productoverview--default' },
        { label: 'No image', id: 'components-productoverview--no-image' },
        { label: 'Three stats', id: 'components-productoverview--three-stats' },
        { label: 'No stats', id: 'components-productoverview--no-stats' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (19 October build of Biscuit’s main) from the team’s private package repository. Figma’s Product Overview has no properties; the picture, chip, text, and two stats are layers there, and the coin picture here is Figma’s own. The description’s colour token is white in every Text Appearance mode, so the description can’t be read on the white card, here and in Storybook; Figma’s is dark grey. The package’s picture fills the card’s width (Figma’s is 288 × 170, centred), and its text lines are taller, so the card is about 409 px tall where Figma’s is 396. <code>disableTruncation</code> affects only the stats. The published Storybook is older than the installed package and still shows the older generated page (all reported).</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'productoverview', corePrinciple: 'One product, and the facts that matter.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('productoverview'),
  }} playground={<>
    <div className="preview-stage">
      {PV({
        imageSource: picture ? coin : undefined,
        labelImageSource: chipPicture ? jioLogo : undefined,
        stats: count === '[]' ? [] : STATS[count],
        modes: { ...LIGHT, 'Text Appearance': appearance } as Modes,
      })}
      <span className="stage-label">Live Coin Product Overview</span>
    </div>
    <div className="controls-panel">
      <OnOff label="imageSource" value={picture} onChange={setPicture} />
      <OnOff label="labelImageSource" value={chipPicture} onChange={setChipPicture} />
      <Segment label="stats" value={count} options={['two', 'three', '[]'] as const} onChange={setCount} />
      <Segment label="Text Appearance" value={appearance} options={['Neutral', 'Primary', 'Secondary'] as const} onChange={setAppearance} />
      <Readout title="Description colour" value="White on white">The description’s colour token is white in every Text Appearance mode, so it can’t be read on the white card (reported).</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'productoverview',
  label: 'Product Overview',
  summary: 'Use a Product Overview to introduce one product: its picture, a chip, its name, a line of trust, and two or three key facts.',
  keywords: ['product summary', 'product header', 'PDP', 'product detail', 'gold coin'],
  icon: <><circle cx="9" cy="6.5" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M5 12.5h8M6.5 15.25h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /></>,
  Component: ProductOverviewGuide,
})
