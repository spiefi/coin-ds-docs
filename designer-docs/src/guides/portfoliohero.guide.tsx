import { useState, type ComponentProps, type ReactNode } from 'react'
import { Badge, Button, HStack, Icon, ListGroup, ListItem, PortfolioHero, Text, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, ScreenFrame, Segment, Sources, docsUrl } from '../guide-kit'
import { defineGuide } from './define'
import jioLogo from '../assets/jio-gold-logo.png'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2705-14040'
const LIGHT = { 'Color Mode': 'Light' } as Modes
const BADGE = { ...LIGHT, Context4: 'Badge' } as Modes
const LOSS = { ...BADGE, 'Semantic Intent': 'System', AppearanceSystem: 'negative' } as Modes

const RETURNS = (label: string, m: Modes = BADGE) => (
  <Badge label={label} modes={m} leading={<Icon iconName="ic_card" modes={m} accessibilityElementsHidden importantForAccessibility="no" />} />
)
const NOTE = (text: string) => <Text text={text} modes={LIGHT} />
const SLOT = <>{RETURNS('+₹2,722.45 (+22.5%)')}{NOTE('Worth 1.23g Gold')}</>

type PHProps = Partial<ComponentProps<typeof PortfolioHero>> & { children?: ReactNode }
function PH(overrides: PHProps = {}) {
  const { children, ...rest } = overrides
  return <PortfolioHero modes={LIGHT} imageSource={jioLogo} {...rest}>{children === undefined ? SLOT : children}</PortfolioHero>
}
const Host = ({ children }: { children: ReactNode }) => (
  <VStack modes={LIGHT} style={{ width: 300, maxWidth: '100%' }} alignHorizontal="center">{children}</VStack>
)
const H = (overrides: PHProps = {}) => <Host>{PH(overrides)}</Host>

const R = ':scope > div'
const LABEL_ROW = `${R} > div:nth-child(1)`
const AVATAR = `${R} > div:nth-child(1) [role="img"]`
const LABEL = `${R} > div:nth-child(1) > [dir="auto"]`
const AMOUNT = `${R} > div:nth-child(2)`
const SLOT_SEL = `${R} > div:nth-child(3)`

const AVATAR_PX = { L: '42 px', M: '36 px', S: '29 px' } as const
const fmt = (v: number) => v.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

function PortfolioHeroGuide() {
  const [logo, setLogo] = useState(true)
  const [size, setSize] = useState<'L' | 'M' | 'S'>('S')
  const [slot, setSlot] = useState<'Badge and note' | 'Badge' | 'None'>('Badge and note')
  const [k, setK] = useState(0)
  const v = 12000.11 + 1000 * k

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A product, an amount, a note',
      description: 'The product label sits on top, the amount under it, and anything you pass as children under that. Everything is centred.',
      body: <Anatomy marks={[{ kind: 'gap', from: LABEL_ROW, to: AMOUNT }]} parts={[
        { name: 'Avatar', note: 'imageSource, 29 px at the default Avatar Size S.', target: AVATAR, side: 'left' },
        { name: 'Label', note: 'label, the product name, 16 px Bold.', target: LABEL, side: 'top' },
        { name: 'Amount', note: 'A Money Value from value and currency, 36 px Black.', target: AMOUNT, side: 'right' },
        { name: 'Slot', note: 'children, centred under the amount, 8 px apart.', target: SLOT_SEL, side: 'bottom' },
      ]}>{PH()}</Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'The logo, its size, and the note',
      description: 'imageSource puts the product’s logo before its label; without it there is no avatar, not an empty circle. Avatar Size sets the logo to 42, 36, or 29 px. children adds what sits under the amount, usually a Badge with the change and a Text with one fact; Slot gap spaces them.',
      body: <div className="coin-new-stack">
        <div className="coin-new-example-grid three">
          <ExampleCard title="Logo and label" description="imageSource puts the logo before the label.">{H({ children: null })}</ExampleCard>
          <ExampleCard title="Label only" description="No imageSource, no avatar.">{H({ imageSource: undefined, children: null })}</ExampleCard>
          <ExampleCard title="With a note" description="children add the change and one fact.">{H()}</ExampleCard>
        </div>
        <div className="coin-new-example-grid three">
          <ExampleCard title="Avatar Size L" description="A 42 px logo.">{H({ modes: { ...LIGHT, 'Avatar Size': 'L' } as Modes, children: null })}</ExampleCard>
          <ExampleCard title="Avatar Size M" description="36 px.">{H({ modes: { ...LIGHT, 'Avatar Size': 'M' } as Modes, children: null })}</ExampleCard>
          <ExampleCard title="Avatar Size S" description="29 px, the default.">{H({ children: null })}</ExampleCard>
        </div>
        <div className="coin-new-example-grid">
          <ExampleCard title="Slot gap S" description="8 px between the badge and the note, the default.">{H()}</ExampleCard>
          <ExampleCard title="Slot gap L" description="24 px.">{H({ modes: { ...LIGHT, 'Slot gap': 'L' } as Modes })}</ExampleCard>
        </div>
      </div>,
    },
    states: {
      header: 'States', title: 'No states of its own',
      description: 'The hero doesn’t press, load, or animate, and it has no action: Figma’s Action Slot, an icon button beside the amount, isn’t in the package. What changes is what you pass: a gain or a loss is the Badge in children.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Up" description="The gold Badge, as Figma shows it.">{H()}</ExampleCard>
        <ExampleCard title="Down" description="The Badge’s Semantic Intent System, AppearanceSystem negative.">{H({ label: 'Mutual Funds', value: '1,45,230.50', children: RETURNS('−₹1,204.10 (−0.8%)', LOSS) })}</ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'As wide as its amount',
      description: 'The hero has no width of its own: it is as wide as its widest line, usually the amount, plus 8 px on each side, and centres everything. Top to bottom: 8 px of padding, the 29 px label row, 16 px, the amount on a 44 px line, 16 px, then the slot. Figma’s amount sits on a 36 px line, so Figma’s hero is 159 px tall. The amount never wraps or shrinks, so give the hero a host wider than its longest amount.',
      body: <Anatomy legend={false} marks={[
        { kind: 'size', target: R, side: 'bottom', label: 'both' },
        { kind: 'gap', from: LABEL_ROW, to: AMOUNT },
        { kind: 'padding', target: R },
      ]}>{PH()}</Anatomy>,
    },
    content: {
      header: 'Content', title: 'The product, the figure, one note',
      description: 'Write label as the product in a word or two, such as Gold or Mutual Funds. Give value as the formatted figure alone: currency adds the symbol, and INR or ₹ both show ₹. Use children for a caption, such as the change in a Badge and one fact in a Text; a Text there is 12 px, because the hero sets Text Sizes Small. It isn’t a place for a second total.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Product and figure" description="INR shows ₹; the grouping stays as you write it.">{H({ label: 'Mutual Funds', value: '1,45,230.50', currency: 'INR', children: null })}</ExampleCard>
        <ExampleCard title="One fact" description="A Text in children is 12 px.">{H({ children: NOTE('Worth 1.23g Gold') })}</ExampleCard>
      </div>,
    },
    context: {
      header: 'In context', title: 'The top of a holding’s page',
      description: 'The hero opens the Gold page, the holding’s details follow in a list, and the two actions sit at the bottom. Buy ₹1,000 and Sell ₹1,000 change the holding, and the hero shows the new value; the hero has no button of its own.',
      body: <div className="coin-new-context">
        <ScreenFrame size="full">
          <VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes} style={{ flex: 1, padding: 16 }} justifyVertical="space-between">
            <VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes}>
              {PH({ value: fmt(v), children: <>{RETURNS('+₹2,722.45 (+22.5%)')}{NOTE(`Worth ${(v / 9756.2).toFixed(2)}g Gold`)}</> })}
              <ListGroup modes={LIGHT}>
                <ListItem layout="Horizontal" title="Gold in your locker" supportText={`${(v / 9756.2).toFixed(2)} g · 24K, 99.9% pure`} navArrow={false} modes={LIGHT} />
                <ListItem layout="Horizontal" title="Average buy price" supportText="₹7,544 a gram" navArrow={false} modes={LIGHT} />
                <ListItem layout="Horizontal" title="Today’s price" supportText="₹9,756 a gram" navArrow={false} modes={LIGHT} />
              </ListGroup>
            </VStack>
            <HStack modes={{ ...LIGHT, 'Slot gap': 'S' } as Modes}>
              <Button label="Sell ₹1,000" modes={{ ...LIGHT, Emphasis: 'Medium' } as Modes} style={{ flex: 1 }} onPress={() => setK(x => Math.max(x - 1, -5))} />
              <Button label="Buy ₹1,000" modes={LIGHT} style={{ flex: 1 }} onPress={() => setK(x => Math.min(x + 1, 5))} />
            </HStack>
          </VStack>
        </ScreenFrame>
        <p className="coin-new-readout" role="status">{`Holding ₹${fmt(v)}`}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'One holding, one figure',
      description: 'Each pair shows a hero people read at a glance next to one that buries the amount.',
      body: <div className="coin-new-stack">
        <DoDont good={H()} bad={H({ children: NOTE('Your gold has grown 22.5% since you started saving in March 2024, and you can sell it at any time at today’s price.') })}
          goodTitle="One short note" goodCaption="The change and one fact."
          badTitle="A paragraph under the amount" badCaption="A long note turns the hero into a block of text." />
        <DoDont good={H()} bad={H({ children: NOTE('Total portfolio ₹4,52,300.00') })}
          goodTitle="The change in a Badge" goodCaption="The amount stays the only total."
          badTitle="A second total in the slot" badCaption="Two figures compete; put the portfolio total on its own page." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Portfolio Hero contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="28 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('portfoliohero')} stories={[
        { label: 'Default', id: 'components-portfoliohero--default' },
        { label: 'Without Slot', id: 'components-portfoliohero--without-slot' },
        { label: 'Custom Slot Content', id: 'components-portfoliohero--custom-slot-content' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (27 October build of Biscuit’s main) from the team’s private package repository. Figma’s Portfolio Hero has <code>Top Slot</code>, <code>Bottom Slot</code>, and <code>Action Slot</code> switches; the package has a fixed label and amount, <code>children</code> for the slot, and no action. Figma shows the Jio logo by default; the package shows an avatar only with <code>imageSource</code>, and Storybook’s Default story shows a stock photo there instead. The amount sits on a 44 px line, so the hero is taller than Figma’s 159 px (all reported). Screen readers read the amount once, with its currency.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'portfoliohero', corePrinciple: 'The product, its value, then one note.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('portfoliohero'),
  }} playground={<>
    <div className="preview-stage">
      {H({
        imageSource: logo ? jioLogo : undefined,
        modes: { ...LIGHT, 'Avatar Size': size } as Modes,
        children: slot === 'Badge and note' ? SLOT : slot === 'Badge' ? RETURNS('+₹2,722.45 (+22.5%)') : null,
      })}
      <span className="stage-label">Live Coin Portfolio Hero</span>
    </div>
    <div className="controls-panel">
      <OnOff label="imageSource" value={logo} onChange={setLogo} />
      <Segment label="Avatar Size" value={size} options={['L', 'M', 'S'] as const} onChange={setSize} />
      <Segment label="children" value={slot} options={['Badge and note', 'Badge', 'None'] as const} onChange={setSlot} />
      <Readout title="Avatar" value={logo ? AVATAR_PX[size] : 'None'}>Avatar Size changes the logo only when imageSource is set. Without it there’s no avatar at all.</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'portfoliohero',
  label: 'Portfolio Hero',
  summary: 'Use a Portfolio Hero at the top of a holding’s page to show what it is and what it’s worth, with an optional note under the amount.',
  keywords: ['holding value', 'portfolio value', 'investment total', 'gold value', 'asset hero'],
  icon: <><circle cx="6.5" cy="4" r="1.75" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M9.5 4h3M3.5 9h11M6.5 13.5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /></>,
  Component: PortfolioHeroGuide,
})
