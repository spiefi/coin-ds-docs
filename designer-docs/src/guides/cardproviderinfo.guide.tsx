import { useState } from 'react'
import { Button, CardProviderInfo, StatItem, Title, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, Readout, Segment, Sources, docsUrl } from '../guide-kit'
import { defineGuide } from './define'
import logo from '../assets/jio-gold-logo.png'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2916-9155'
const LIGHT = { 'Color Mode': 'Light' } as Modes
const m = (o: Record<string, string>) => ({ ...LIGHT, ...o } as Modes)
const FRAME = { width: '100%', maxWidth: 342 } as const

const FACTS = [
  ['Purity verified by NABL', '99.99%'],
  ['Customers served', '1M+'],
  ['Insured vault storage', '100%'],
  ['Established', '2017'],
] as const

type CPIProps = Partial<React.ComponentProps<typeof CardProviderInfo>>
const CPI = (overrides: CPIProps = {}, count = 4) => (
  <CardProviderInfo label="Gold" imageSource={logo} modes={LIGHT} style={FRAME} {...overrides}>
    {FACTS.slice(0, count).map(([l, v]) => <StatItem key={l} label={l} value={v} />)}
  </CardProviderInfo>
)

const R = ':scope > div'
const header = `${R} > div:first-child`
const avatar = `${R} [role="img"]`
const label = `${R} > div:first-child > [dir="auto"]`
const grid = `${R} > div:nth-child(2)`
const firstFact = `${R} > div:nth-child(2) > div:first-child > div:first-child`

const APPEARANCES = ['Primary', 'Secondary', 'Neutral'] as const
const AVATARS = ['L', 'S'] as const
const COUNTS = ['2', '3', '4'] as const
const GRID: Record<(typeof COUNTS)[number], string> = { '2': '1 row', '3': '2 rows, one fact alone', '4': '2 rows' }

function CardProviderInfoGuide() {
  const [appearance, setAppearance] = useState<(typeof APPEARANCES)[number]>('Primary')
  const [avatarSize, setAvatarSize] = useState<(typeof AVATARS)[number]>('L')
  const [facts, setFacts] = useState<(typeof COUNTS)[number]>('4')
  const [opened, setOpened] = useState(0)
  const [bought, setBought] = useState(false)

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A provider and its facts',
      description: 'A rounded card puts the provider’s logo and name on top, then lays its children out two to a row. The facts are StatItem components: a small label over a large value.',
      body: <Anatomy specimenWidth={342} parts={[
        { name: 'Avatar', note: 'imageSource in a round 42 px Avatar; Avatar Size S gives Figma’s 29 px.', target: avatar, side: 'left' },
        { name: 'Label', note: 'label names the provider in 16 px bold.', target: label, side: 'top' },
        { name: 'Fact', note: 'A StatItem child: a 12 px label over a 26 px value.', target: firstFact, side: 'left' },
        { name: 'Grid', note: 'Children sit two to a row, 8 px apart, each half the width.', target: grid, side: 'right' },
        { name: 'Card', note: '16 px corners and 20 px padding; AppearanceBrand sets the fill.', target: R, side: 'bottom' },
      ]}>
        {CPI()}
      </Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Brand and avatar size',
      description: 'AppearanceBrand sets the card’s fill: Primary cream by default, Secondary lilac, and Neutral or Tertiary white with a light border. The label and the facts stay the same colour. Avatar Size S shrinks the logo to Figma’s 29 px; the package default is 42 px.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Primary" description="The default: a cream card, as in Figma.">{CPI()}</ExampleCard>
        <ExampleCard title="Secondary" description="A lilac card.">{CPI({ modes: m({ AppearanceBrand: 'Secondary' }) })}</ExampleCard>
        <ExampleCard title="Neutral" description="White with a light border; Tertiary looks the same.">{CPI({ modes: m({ AppearanceBrand: 'Neutral' }) })}</ExampleCard>
        <ExampleCard title="Avatar Size S" description="A 29 px logo, as in Figma.">{CPI({ modes: m({ 'Avatar Size': 'S' }) })}</ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Facts only, by default',
      description: 'The card shows facts and does nothing when tapped. onPress makes the whole card one button, named by accessibilityLabel or label; it doesn’t change its look when pressed, and disabled only stops presses. Don’t put buttons among the facts of a pressable card.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Facts only" description="The default: nothing to press.">{CPI()}</ExampleCard>
        <ExampleCard title="Pressable" description="The whole card is one button and looks the same.">
          {CPI({ onPress: () => setOpened(o => o + 1), accessibilityLabel: 'Gold, by Jio. Open provider details' })}
          <p className="coin-new-readout" role="status">{opened === 0 ? 'Not opened yet' : `Opened ${opened} ${opened === 1 ? 'time' : 'times'}`}</p>
        </ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'Your screen sets the width',
      description: 'The card fills its host’s width; Figma draws it at 342 px. It has 20 px padding and 20 px between the header and the facts, and each fact takes half the width with 8 px between them. Height follows the content: 212 px with four facts and the default avatar.',
      body: <Anatomy legend={false} specimenWidth={342} marks={[
        { kind: 'size', target: R, side: 'bottom', label: 'both' },
        { kind: 'padding', target: R },
        { kind: 'gap', from: header, to: grid },
      ]}>
        {CPI()}
      </Anatomy>,
    },
    content: {
      header: 'Content', title: 'Short facts with their figures',
      description: 'Put the provider’s name in label. Give each fact a short noun phrase for its label and the figure for its value: values are large and heavy, so keep them to a few characters. Two to six facts, in pairs, read best.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Two facts" description="One row of two facts.">{CPI({}, 2)}</ExampleCard>
        <ExampleCard title="Three facts" description="The third fact sits alone and leaves a gap beside it.">{CPI({}, 3)}</ExampleCard>
      </div>,
    },
    context: {
      header: 'In context', title: 'The provider on the Buy Gold screen',
      description: 'The screen supplies the provider’s logo, name, and facts. The card only shows them; the Buy button below is the screen’s own action.',
      body: <div className="coin-new-context">
        <VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes}>
          <Title title="Buy gold" subtitle="24K, stored in an insured vault" modes={LIGHT} />
          {CPI({ style: undefined })}
          <Button label="Buy gold" modes={LIGHT} onPress={() => setBought(true)} style={{ alignSelf: 'stretch' }} />
        </VStack>
        <p className="coin-new-readout" role="status">{bought ? 'Buy gold pressed' : 'Ready to buy'}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Short facts from a known provider',
      description: 'Each pair shows a card people trust at a glance next to one that crowds its facts or shows the wrong picture.',
      body: <div className="coin-new-stack">
        <DoDont
          good={CPI({}, 2)}
          bad={<CardProviderInfo label="Gold" imageSource={logo} modes={LIGHT} style={FRAME}>
            <StatItem label="Customers served" value="Over one million" />
            <StatItem label="Established" value="In the year 2017" />
          </CardProviderInfo>}
          goodTitle="Keep values short" goodCaption="“99.99%” and “1M+” read at a glance."
          badTitle="Write sentences as values" badCaption="“Over one million” wraps and crowds the row." />
        <DoDont
          good={CPI({}, 2)}
          bad={CPI({ imageSource: undefined }, 2)}
          goodTitle="Pass the provider’s logo" goodCaption="imageSource shows who provides it."
          badTitle="Leave out imageSource" badCaption="A stock portrait stands in for the logo." />
        <DoDont
          good={CPI()}
          bad={CPI({}, 3)}
          goodTitle="Pair the facts" goodCaption="Four facts fill two rows."
          badTitle="Leave one fact alone" badCaption="Three facts leave a gap beside the last." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Card Provider Info contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="17 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('cardproviderinfo')} stories={[
        { label: 'Default', id: 'components-cardproviderinfo--default' },
        { label: 'Two stats', id: 'components-cardproviderinfo--two-stats' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (16 October build) from the team’s private package repository. Figma’s Card/Provider Info is one 342 × 185 component with no properties of its own; its Product Label can hide the avatar, but in code the header always comes from label and imageSource and the avatar can’t be hidden. Without imageSource the package shows a stock portrait, so this page passes the Jio Gold logo from the Figma component. Figma’s logo is 29 px (Avatar Size S); the package default is 42 px. Fact rows are 50 px in code and 44 in Figma. The avatar and portrait issues are reported. The published Storybook shows the placeholder portrait and still shows the older generated page.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'cardproviderinfo',
    corePrinciple: 'Who provides it, and why to trust them.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('cardproviderinfo'),
  }} playground={<>
    <div className="preview-stage">
      {CPI({ modes: m({ AppearanceBrand: appearance, 'Avatar Size': avatarSize }) }, Number(facts))}
      <span className="stage-label">Live Coin Card Provider Info</span>
    </div>
    <div className="controls-panel">
      <Segment label="Appearance" value={appearance} options={APPEARANCES} onChange={setAppearance} />
      <Segment label="Avatar Size" value={avatarSize} options={AVATARS} onChange={setAvatarSize} />
      <Segment label="Facts" value={facts} options={COUNTS} onChange={setFacts} />
      <Readout title="Grid" value={GRID[facts]}>Children sit two to a row.</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'cardproviderinfo',
  label: 'Card Provider Info',
  summary: 'Use a Card Provider Info to introduce who provides a product, with their logo and a few short facts in two columns.',
  keywords: ['provider card', 'seller info', 'vault info', 'stats card', 'product provider', 'trust facts'],
  icon: <><rect x="2.5" y="2.5" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" /><circle cx="6" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.5" /><path d="M5 10h2.5M10.5 10H13M5 13h2.5M10.5 13H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>,
  Component: CardProviderInfoGuide,
})
