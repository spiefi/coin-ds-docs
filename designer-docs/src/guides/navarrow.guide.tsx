import { useState, type ReactNode } from 'react'
import { Card, HStack, ListItem, NavArrow, Text, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, Segment, Sources, Specimen, SpecimenRow, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1444-33'
const LIGHT = { 'Color Mode': 'Light' } as Modes
const noop = () => {}

type Direction = 'Back' | 'Forward' | 'Down'

function Host({ children }: { children: ReactNode }) {
  return <div className="coin-new-host wide"><VStack modes={LIGHT} style={{ flex: 1 }}>{children}</VStack></div>
}

function Statements(props: Partial<React.ComponentProps<typeof ListItem>>) {
  return <ListItem layout="Horizontal" title="Statements" supportText="Monthly and yearly" modes={LIGHT} onPress={noop} {...props} />
}

function BackTitle({ onPress = noop }: { onPress?: () => void }) {
  return <HStack alignVertical="center" modes={LIGHT}>
    <NavArrow direction="Back" accessibilityLabel="Back to Home" onPress={onPress} modes={LIGHT} />
    <Text modes={LIGHT}>Accounts</Text>
  </HStack>
}

function NavArrowGuide() {
  const [direction, setDirection] = useState<Direction>('Forward')
  const [pressable, setPressable] = useState(false)
  const [presses, setPresses] = useState(0)
  const [status, setStatus] = useState('On Accounts')

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A chevron with an optional target',
      description: 'The arrow is a 2 px stroked chevron. Give it onPress and it gains a 44 × 44 pressable area; without it, it is a small image.',
      body: <Anatomy marks={[{ kind: 'outline', target: '[role="button"]' }, { kind: 'outline', target: 'svg', variant: 'child' }]} parts={[
        { name: 'Chevron', note: 'A 6 × 10 px chevron with a 2 px rounded grey stroke.', target: 'svg', side: 'top' },
        { name: 'Touch target', note: 'With onPress, a 44 × 44 area surrounds the chevron.', target: '[role="button"]', side: 'right' },
      ]}><NavArrow direction="Back" accessibilityLabel="Back to Home" onPress={noop} modes={LIGHT} /></Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Point where it leads',
      description: 'Forward leads to another screen, Back returns to the previous one, and Down opens content below.',
      body: <div className="coin-new-example-grid three">
        <ExampleCard title="Forward" description="At the end of a row. ListItem draws it for you."><Host><Statements /></Host></ExampleCard>
        <ExampleCard title="Back" description="Beside a screen title, as its own button."><Host><BackTitle /></Host></ExampleCard>
        <ExampleCard title="Down" description="Next to a label that opens more content below."><Host><HStack alignVertical="center" modes={LIGHT}><Text modes={LIGHT}>Show all transactions</Text><NavArrow direction="Down" modes={LIGHT} /></HStack></Host></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Decorative or pressable',
      description: 'Without onPress the arrow is an image inside something pressable. With onPress it is a button that dims to 70% while pressed. It has no disabled look.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Decorative" description="A 6 × 10 image; the row around it handles presses."><Host><NavArrow direction="Forward" modes={LIGHT} /></Host></ExampleCard>
        <ExampleCard title="Pressable" description="A 44 × 44 button; press it to see it dim."><Host><NavArrow direction="Back" accessibilityLabel="Back to Home" onPress={noop} modes={LIGHT} /></Host></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'Small chevron, 44 px target',
      description: 'The chevron is 6 × 10 px (10 × 6 pointing down). A pressable arrow reserves 44 × 44 px so it is easy to tap.',
      body: <Anatomy legend={false} marks={[{ kind: 'outline', target: '[role="button"]' }, { kind: 'size', target: '[role="img"]', side: 'top', label: 'both' }, { kind: 'size', target: '[role="button"]', side: 'top', label: 'both' }]}>
        <SpecimenRow>
          <Specimen caption="Pressable"><NavArrow direction="Back" accessibilityLabel="Back to Home" onPress={noop} modes={LIGHT} /></Specimen>
          <Specimen caption="Decorative"><VStack modes={LIGHT} justifyVertical="center" alignHorizontal="center" style={{ height: 44 }}><NavArrow direction="Forward" modes={LIGHT} /></VStack></Specimen>
        </SpecimenRow>
      </Anatomy>,
    },
    content: {
      header: 'Content', title: 'Name the destination',
      description: 'The arrow has no visible text. When it is a button, set accessibilityLabel to where it goes, such as “Back to Home”, instead of the default “Go back”.',
      body: <ExampleCard title="Labelled back arrow" description="Screen readers hear “Back to Home”."><Host><BackTitle /></Host></ExampleCard>,
    },
    context: {
      header: 'In context', title: 'A header and a list of accounts',
      description: 'The back arrow is its own button; each row is pressable as a whole and ListItem draws its forward arrow. The screen handles the navigation.',
      body: <div className="coin-new-context">
        <VStack modes={LIGHT}>
          <BackTitle onPress={() => setStatus('Back to Home')} />
          <Card modes={LIGHT}><VStack modes={LIGHT}>
            <ListItem layout="Horizontal" title="Savings •• 0245" supportText="₹1,24,500" modes={LIGHT} onPress={() => setStatus('Opening Savings •• 0245')} />
            <ListItem layout="Horizontal" title="Salary •• 1180" supportText="₹48,200" modes={LIGHT} onPress={() => setStatus('Opening Salary •• 1180')} />
          </VStack></Card>
        </VStack>
        <p className="coin-new-readout" role="status">{status}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'A clear cue in the right place',
      description: 'Each pair shows an arrow that guides people versus one that misleads them.',
      body: <div className="coin-new-stack">
        <DoDont goodTitle="Make the whole row pressable" goodCaption="The label and the arrow both open Statements." badTitle="Make only the arrow pressable" badCaption="People tap the label and nothing happens."
          good={<Host><Statements /></Host>}
          bad={<Host><HStack alignVertical="center" justifyHorizontal="space-between" modes={LIGHT}><Text modes={LIGHT}>Statements</Text><NavArrow direction="Forward" accessibilityLabel="Open Statements" onPress={noop} modes={LIGHT} /></HStack></Host>} />
        <DoDont goodTitle="Point forward in a row" goodCaption="The row leads on to another screen." badTitle="Point back in a row" badCaption="A back arrow reads as leaving, not opening."
          good={<Host><Statements /></Host>}
          bad={<Host><Statements navArrow={false} trailing={<NavArrow direction="Back" modes={LIGHT} />} /></Host>} />
        <DoDont goodTitle="Use the row’s own arrow" goodCaption="One chevron per row." badTitle="Add a second arrow" badCaption="Two chevrons look like a mistake."
          good={<Host><Statements /></Host>}
          bad={<Host><Statements trailing={<NavArrow direction="Forward" modes={LIGHT} />} /></Host>} />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Nav Arrow contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="29 September 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('navarrow')} stories={[
        { label: 'Default', id: 'components-navarrow--default' },
        { label: 'Forward', id: 'components-navarrow--forward' },
        { label: 'Back', id: 'components-navarrow--back' },
        { label: 'Down', id: 'components-navarrow--down' },
        { label: 'Pressable', id: 'components-navarrow--pressable' },
        { label: 'All directions', id: 'components-navarrow--all-directions' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.77</code> from the team’s private package repository. List Item, App Bar, Section, and Summary Tile already draw their own arrows. A decorative arrow is still announced as an image, and a disabled arrow looks the same as an enabled one. In Dark colour mode the chevron currently turns orange because of a token value, so use it on light surfaces.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'navarrow',
    summary: 'Use a Nav Arrow to show that something leads elsewhere: a chevron at the end of a row, or a back arrow in a header.',
    corePrinciple: 'A cue, not a button. Make the whole row pressable, and give the arrow onPress only when it stands alone.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('navarrow'),
  }} playground={<>
    <div className="preview-stage">
      <NavArrow direction={direction} onPress={pressable ? () => setPresses(count => count + 1) : undefined} modes={LIGHT} />
      <span className="stage-label">Live Coin Nav Arrow</span>
    </div>
    <div className="controls-panel">
      <Segment label="Direction" value={direction} options={['Back', 'Forward', 'Down']} onChange={setDirection} />
      <OnOff label="Pressable" value={pressable} onChange={setPressable} />
      <Readout title="Presses" value={presses}>{pressable ? 'A 44 × 44 target surrounds the chevron.' : 'A 6 × 10 image; it does not respond.'}</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'navarrow',
  label: 'Nav Arrow',
  icon: <path d="M7 4.5 11.5 9 7 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  Component: NavArrowGuide,
})
