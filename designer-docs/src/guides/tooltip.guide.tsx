import { useState } from 'react'
import { Button, HStack, IconButton, Text, Title, Tooltip, TooltipContent, TooltipTrigger, VStack, type Modes, type TooltipPlacement } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, Readout, ScreenFrame, Segment, Sources, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=928-6036'
const LIGHT = { 'Color Mode': 'Light' } as Modes
const INFO = { ...LIGHT, Emphasis: 'Low', 'Button / Size': 'S' } as Modes
// Rows sit flush in their screen: no stack padding around the term and its button.
const ROW = { ...LIGHT, Padding: 'None' } as Modes

const EXPENSE = 'The yearly fee the fund charges, as a share of your investment.'
const EXIT = 'A fee if you sell within a year of investing.'
const NAV = 'The price of one unit of the fund, updated every working day.'
const XIRR = 'Your yearly return, counting when each payment went in. It lets you compare investments made at different times and over different periods.'
const WALL = 'The yearly fee the fund charges, as a share of your investment. It covers fund management, admin, and distribution. It\'s taken from the fund\'s value every day, so you never pay it separately. Lower is better over long periods.'

type TipProps = { placement?: TooltipPlacement; open?: boolean; onOpenChange?: (open: boolean) => void; width?: number }

function Info({ label, text, width, ...props }: TipProps & { label: string; text: string }) {
  return (
    <Tooltip modes={LIGHT} {...props}>
      <TooltipTrigger asChild><IconButton iconName="ic_info" accessibilityLabel={label} modes={INFO} /></TooltipTrigger>
      <TooltipContent width={width}>{text}</TooltipContent>
    </Tooltip>
  )
}

function Term({ term, ...props }: TipProps & { term: string; label: string; text: string }) {
  return (
    <HStack modes={ROW} alignVertical="center">
      <Text modes={LIGHT}>{term}</Text>
      <Info {...props} />
    </HStack>
  )
}

function Row({ term, value, label, text }: { term: string; value: string; label: string; text: string }) {
  return (
    <HStack modes={ROW} alignVertical="center" justifyHorizontal="space-between">
      <Term term={term} label={label} text={text} />
      <Text modes={LIGHT}>{value}</Text>
    </HStack>
  )
}

function ScreenOpened() {
  const [open, setOpen] = useState(false)
  return (
    <VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes} alignHorizontal="center">
      <Term term="Exit load" label="About exit load" text={EXIT} open={open} onOpenChange={setOpen} />
      <Button label="Show hint" modes={{ ...LIGHT, Emphasis: 'Medium' } as Modes} onPress={() => setOpen(true)} />
    </VStack>
  )
}

const ALIGN = { Centre: '', Start: '-start', End: '-end' } as const
type Side = 'Top' | 'Bottom' | 'Left' | 'Right'
type Align = keyof typeof ALIGN
type Length = 'Short' | 'Long'

function TooltipGuide() {
  const [open, setOpen] = useState(false)
  const [side, setSide] = useState<Side>('Top')
  const [align, setAlign] = useState<Align>('Centre')
  const [length, setLength] = useState<Length>('Short')
  const placement = `${side.toLowerCase()}${ALIGN[align]}` as TooltipPlacement

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A trigger, then a bubble over the page',
      description: 'Only the trigger sits in the page. Pressing it opens a near-black bubble 12 px away, with 8 px corners, 12 × 8 px of padding, white 14 px text that wraps at 280 px, and a 16 × 8 px arrow pointing at the trigger. React Native draws the bubble over the page, so this diagram can\'t frame it; press the trigger to see it.',
      body: <Anatomy parts={[
        { name: 'Trigger', note: 'Yours: an info IconButton passed with asChild. Pressing it opens or closes the bubble.', target: '[role="button"]', side: 'right' },
        { name: 'Term', note: 'The word it explains. Keep it visible: the bubble only adds detail.', target: '[dir="auto"]', side: 'left' },
      ]}><Term term="Expense ratio" label="About expense ratio" text={EXPENSE} /></Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Side and alignment',
      description: 'Placement picks the side, top by default, and can line the bubble up with the trigger\'s start or end edge instead of its centre. When the bubble doesn\'t fit on that side it flips to the opposite one, and beside the trigger with no room either way it moves above or below. It always stays 8 px inside the screen.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Above" description="The default: the bubble sits above, its arrow pointing down at the trigger."><Term term="Expense ratio" label="About expense ratio" text={EXPENSE} /></ExampleCard>
        <ExampleCard title="Below" description="For triggers near the top of the screen, where there's no room above."><Term term="Expense ratio" label="About expense ratio" text={EXPENSE} placement="bottom" /></ExampleCard>
        <ExampleCard title="Start-aligned" description="The bubble's start edge lines up with the trigger's; the arrow still points at it."><Term term="Expense ratio" label="About expense ratio" text={EXPENSE} placement="top-start" /></ExampleCard>
        <ExampleCard title="Beside" description="Next to the trigger, for a row with room to its side. On a phone there rarely is, so it opens above or below instead."><Term term="Expense ratio" label="About expense ratio" text={EXPENSE} placement="right" /></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Closed, open, and how it closes',
      description: 'A press on the trigger opens it; there\'s no hover, focus, or timer. While it\'s open a clear layer covers the page: the next press anywhere, or Android\'s back button, closes it. On the web Escape doesn\'t close it (#349). The screen can also open it itself with open and hear every close through onOpenChange.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Opens on press" description="Press the i to open it; press anywhere to close it."><Term term="Expense ratio" label="About expense ratio" text={EXPENSE} /></ExampleCard>
        <ExampleCard title="Opened by the screen" description="The screen decides when it shows, for example a first-time hint, and hears every close."><ScreenOpened /></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'Hugs short text, wraps at 280 px',
      description: 'The bubble is as wide as its text up to 280 px, then wraps; padding is 12 × 8 px and text 14 px on 18 px lines. A width on the content sets it instead, like Figma\'s Custom Width variant.',
      body: <div className="coin-new-example-grid three">
        <ExampleCard title="Short text" description="One line: the bubble hugs it."><Term term="Exit load" label="About exit load" text={EXIT} /></ExampleCard>
        <ExampleCard title="Long text" description="Wraps at 280 px. Two or three lines is the most people will read."><Term term="XIRR" label="About XIRR" text={XIRR} /></ExampleCard>
        <ExampleCard title="Custom width" description="A set width of 200 px, Figma's Custom Width On: the same text wraps sooner."><Term term="XIRR" label="About XIRR" text={XIRR} width={200} /></ExampleCard>
      </div>,
    },
    content: {
      header: 'Content', title: 'One plain explanation',
      description: 'Explain one term in a sentence or two of plain text, and keep the term itself on the page. Plain text and Coin Text both get the white label style. A press inside it just closes it, so never put an action there.',
      body: <ExampleCard title="Explain a term" description="One sentence that says what NAV means, opened from the i next to it."><Term term="NAV" label="About NAV" text={NAV} /></ExampleCard>,
    },
    context: {
      header: 'In context', title: 'Explaining fund terms',
      description: 'A fund\'s details list three terms, each with an info button. Pressing one explains it above its row; the next press anywhere closes it. Each tooltip keeps its own open state.',
      body: <div className="coin-new-context">
        <ScreenFrame>
          <VStack modes={{ ...LIGHT, 'Slot gap': 'L' } as Modes}>
            <Title title="Nifty 50 Index Fund" subtitle="Direct plan · Growth" modes={LIGHT} />
            <VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes}>
              <Row term="NAV" value="₹182.40" label="About NAV" text={NAV} />
              <Row term="Expense ratio" value="0.45%" label="About expense ratio" text={EXPENSE} />
              <Row term="Exit load" value="1%" label="About exit load" text={EXIT} />
            </VStack>
          </VStack>
        </ScreenFrame>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Short, and on an info button',
      description: 'Each pair opens a tooltip people can read at a glance next to one that buries them in text or gets in the way of an action.',
      body: <div className="coin-new-stack">
        <DoDont good={<Term term="Expense ratio" label="About expense ratio" text={EXPENSE} />} bad={<Term term="Expense ratio" label="About expense ratio" text={WALL} />}
          goodTitle="Keep it to a sentence" goodCaption="One short line explains the term and gets out of the way."
          badTitle="Write a paragraph" badCaption="Four sentences fill the bubble and cover the screen behind it." />
        <DoDont good={<Term term="Expense ratio" label="About expense ratio" text={EXPENSE} />}
          bad={<Tooltip modes={LIGHT}><TooltipTrigger asChild><Button label="Invest now" modes={LIGHT} /></TooltipTrigger><TooltipContent>Starts a monthly SIP of ₹500.</TooltipContent></Tooltip>}
          goodTitle="Open it from an info button" goodCaption="The i says there's more to read and does nothing else."
          badTitle="Put it on the main action" badCaption="Every press on Invest now also pops a bubble over the screen." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Tooltip contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="19 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('tooltip')} stories={[
        { label: 'Default', id: 'components-tooltip--default' }, { label: 'Long text', id: 'components-tooltip--long-text' },
        { label: 'Slot', id: 'components-tooltip--slot' }, { label: 'Edge detection', id: 'components-tooltip--edge-detection' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code>, built from Biscuit’s main at c7d3348 (19 October) and taken from the team’s private package repository. Figma’s Tooltip is a near-black bubble with a downward arrow near its bottom left or right, in two variants, Custom Width Off (up to 280 px) and On. In code the bubble hugs its text up to 280 px or takes a set width, centres the arrow on the trigger, offers 12 placements, and stays 8 px inside the screen. It opens on press only, over the whole window, and the next press anywhere closes it. On the web the bubble is a tooltip tied to its trigger, but Escape doesn’t close it (#349). Storybook’s stories use a plain grey box as the trigger; these examples pass a Coin IconButton with asChild, though a Coin button nested inside the trigger opens it too.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'tooltip',
    corePrinciple: 'One short explanation, on request.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('tooltip'),
  }} playground={<>
    <div className="preview-stage">
      <Term term="Expense ratio" label="About expense ratio" text={length === 'Short' ? EXPENSE : XIRR} placement={placement} onOpenChange={setOpen} />
      <span className="stage-label">Live Coin Tooltip</span>
    </div>
    <div className="controls-panel">
      <Segment label="Side" value={side} options={['Top', 'Bottom', 'Left', 'Right'] as const} onChange={setSide} />
      <Segment label="Align" value={align} options={['Centre', 'Start', 'End'] as const} onChange={setAlign} />
      <Segment label="Text" value={length} options={['Short', 'Long'] as const} onChange={setLength} />
      <Readout title="Tooltip" value={open ? 'Open' : 'Closed'}>
        Press the i to open it. The next press anywhere closes it, and nothing else on the page responds until then.
      </Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'tooltip',
  label: 'Tooltip',
  summary: 'Use a Tooltip to explain a term or icon in a short line that opens from an info button and closes with the next press.',
  keywords: ['hint', 'info bubble', 'help text', 'popover'],
  icon: <><rect x="2" y="3" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M7 12l2 2.5 2-2.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" /></>,
  Component: TooltipGuide,
})
