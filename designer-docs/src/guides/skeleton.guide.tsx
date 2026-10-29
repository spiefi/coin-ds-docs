import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Avatar, Badge, Button, HStack, Skeleton, SkeletonGroup, Text, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, ScreenFrame, Segment, Sources, Surface, byTestId, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library'
const LIGHT = { 'Color Mode': 'Light' } as Modes
const SMALL = { ...LIGHT, 'Text Sizes': 'Small' } as Modes
const LARGE = { ...LIGHT, 'Text Sizes': 'Large' } as Modes
const FULLSCREEN = { ...LIGHT, context5: 'Fullscreen Modal' } as Modes
const A = byTestId('sk-anatomy')
const SZ = byTestId('sk-size')

type Motion = 'System' | 'Shimmer' | 'Pulse'

function Row({ name, detail, monogram }: { name: string; detail: string; monogram: string }) {
  return <HStack modes={LIGHT} alignVertical="center">
    <Avatar style="Monogram" monogram={monogram} modes={LIGHT} />
    <VStack modes={LIGHT} style={{ flex: 1 }}>
      <Text modes={LIGHT}>{name}</Text>
      <Text modes={SMALL}>{detail}</Text>
    </VStack>
    <Badge label="Equity" modes={LIGHT} />
  </HStack>
}

const Rows = () => <>
  <Row name="Reliance Industries" detail="64 units · ₹1,52,900" monogram="RI" />
  <Row name="HDFC Bank" detail="120 units · ₹1,98,400" monogram="HB" />
</>

const Feed = () => <div className="coin-new-stack"><Rows /><Button label="View all holdings" modes={LIGHT} /></div>

function Panel({ loading, reducedMotion, children }: { loading: boolean; reducedMotion?: boolean; children: ReactNode }) {
  return <Surface width="wide"><SkeletonGroup loading={loading} reducedMotion={reducedMotion}>{children}</SkeletonGroup></Surface>
}

const Holdings = ({ titleLoading }: { titleLoading?: boolean }) => <Panel loading><div className="coin-new-stack">
  <Text modes={LARGE} loading={titleLoading}>Your holdings</Text>
  <Rows />
</div></Panel>

function SkeletonGuide() {
  const [loading, setLoading] = useState(true)
  const [motion, setMotion] = useState<Motion>('System')
  const [refreshing, setRefreshing] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => () => clearTimeout(timer.current), [])
  const refresh = () => {
    clearTimeout(timer.current)
    setRefreshing(true)
    timer.current = setTimeout(() => setRefreshing(false), 2000)
  }
  const reducedMotion = motion === 'System' ? undefined : motion === 'Pulse'

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'Grey blocks with a moving highlight',
      description: 'Each placeholder is a light grey block whose kind sets its corners. While the group loads, a white band sweeps across every block, one after another.',
      body: <Anatomy surface="white" parts={[
        { name: 'Text bar', note: 'kind text: a bar with fully rounded ends, one per line of text.', target: `${A} > :nth-child(1)`, side: 'top' },
        { name: 'Image block', note: 'kind image: 10 px corners, as big as the image it replaces.', target: `${A} > :nth-child(2)`, side: 'left' },
        { name: 'Shimmer', note: 'A white band sweeps across every block each 1.5 s.', target: `${A} > :nth-child(2)`, side: 'right', at: 0.3 },
        { name: 'Badge block', note: 'kind badge: 4 px corners, like a badge.', target: `${A} > :nth-child(3)`, side: 'right' },
        { name: 'Circle or rounded bar', note: 'kind other, the default: a circle when square, else a rounded bar.', target: `${A} > :nth-child(4)`, side: 'left' },
      ]}>
        <SkeletonGroup loading><VStack testID="sk-anatomy" modes={LIGHT}>
          <Skeleton kind="text" width={220} height={20} modes={LIGHT} />
          <Skeleton kind="image" width={220} height={120} modes={LIGHT} />
          <Skeleton kind="badge" width={70} height={20} modes={LIGHT} />
          <Skeleton kind="other" width={48} height={48} modes={LIGHT} />
        </VStack></SkeletonGroup>
      </Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Four kinds, or components that draw their own',
      description: "A Skeleton's kind sets only its corners; its width and height are yours. Inside a group, Coin components such as Text, Avatar, Badge, and Button draw their own placeholder at their own size, so you rarely place a Skeleton by hand.",
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Text" description="Rounded bars, one per line; match each line's height."><Panel loading><div className="coin-new-stack">
          <Skeleton kind="text" width="80%" height={16} modes={LIGHT} />
          <Skeleton kind="text" width="60%" height={14} modes={LIGHT} />
        </div></Panel></ExampleCard>
        <ExampleCard title="Image" description="10 px corners, as big as the image it stands in for."><Panel loading><div className="coin-new-stack">
          <Skeleton kind="image" width="100%" height={120} modes={LIGHT} />
        </div></Panel></ExampleCard>
        <ExampleCard title="Badge" description="4 px corners, the size of a badge."><Panel loading>
          <Skeleton kind="badge" width={56} height={20} modes={LIGHT} />
        </Panel></ExampleCard>
        <ExampleCard title="Circle or rounded bar" description="The default kind: square sizes make a circle, wide ones a rounded bar, for avatars and buttons."><Panel loading><div className="coin-new-row">
          <Skeleton kind="other" width={48} height={48} modes={LIGHT} />
          <Skeleton kind="other" width={120} height={40} modes={LIGHT} />
        </div></Panel></ExampleCard>
        <ExampleCard title="Coin components" description="Avatar, Text, and Badge draw their own placeholders, sized from their own tokens."><Panel loading>
          <Row name="Reliance Industries" detail="64 units · ₹1,52,900" monogram="RI" />
        </Panel></ExampleCard>
        <ExampleCard title="On a fullscreen modal" description="Fullscreen Modal gives its content this context, which turns the blocks deep brown for dark media."><ScreenFrame surface="dark">
          <SkeletonGroup loading><div className="coin-new-row">
            <Skeleton kind="other" width={48} height={48} modes={FULLSCREEN} />
            <Skeleton kind="text" width={160} height={16} modes={FULLSCREEN} />
          </div></SkeletonGroup>
        </ScreenFrame></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Loading, loaded, and reduced motion',
      description: "The group's loading flag switches every placeholder inside it at once. While loading, a white band sweeps across the blocks every 1.5 s, each a little after the one before. When the device asks for reduced motion, or the group sets it, the blocks pulse gently instead.",
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Loading" description="Placeholders hold the layout, and the shimmer runs down them in a cascade."><Panel loading><Feed /></Panel></ExampleCard>
        <ExampleCard title="Loaded" description="The same components show their content in the same places."><Panel loading={false}><Feed /></Panel></ExampleCard>
        <ExampleCard title="Reduced motion" description="A slow white pulse every 3 s replaces the moving band."><Panel loading reducedMotion><Feed /></Panel></ExampleCard>
        <ExampleCard title="Outside a group" description="loading on its own draws that line’s placeholder too, and screen readers hear “Loading”."><Surface width="wide"><div className="coin-new-stack">
          <Text modes={LIGHT} loading>Reliance Industries</Text>
          <Text modes={LIGHT}>64 units · ₹1,52,900</Text>
        </div></Surface></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'The size of what it replaces',
      description: "Coin components size their own placeholders: a Text bar is as tall as its line and about as long as its words, and an Avatar's is its own size. A hand-placed Skeleton has no size until you give it a width and height; percentages follow its host.",
      body: <Anatomy legend={false} surface="white" marks={[
        { kind: 'size', target: `${SZ} > :nth-child(1)`, side: 'top', label: 'both' },
        { kind: 'size', target: `${SZ} > :nth-child(2)`, side: 'bottom', label: 'both' },
      ]}>
        <SkeletonGroup loading><HStack testID="sk-size" modes={LIGHT} alignVertical="center">
          <Avatar style="Monogram" monogram="RI" modes={LIGHT} />
          <Text modes={LIGHT}>Reliance Industries</Text>
        </HStack></SkeletonGroup>
      </Anatomy>,
    },
    content: {
      header: 'Content', title: 'Mirror the real layout',
      description: 'Put the same components in the group that will show the content, with realistic sample text, so each placeholder has the right length. Anything already known, such as a heading, stays real with loading off.',
      body: <ExampleCard title="Known title, loading values" description="The title stays readable; only the values still loading turn into placeholders."><Holdings titleLoading={false} /></ExampleCard>,
    },
    context: {
      header: 'In context', title: 'Refreshing holdings',
      description: 'Refresh puts the holdings into their loading state for two seconds, then swaps the content back in place. The title and the button stay real.',
      body: <div className="coin-new-context">
        <ScreenFrame>
          <Text modes={LARGE}>Your holdings</Text>
          <SkeletonGroup loading={refreshing}><Rows /></SkeletonGroup>
          <Button label="Refresh" modes={LIGHT} onPress={refresh} />
        </ScreenFrame>
        <p className="coin-new-readout" role="status">{refreshing ? 'Loading holdings' : 'Holdings up to date'}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: "Hold the layout, keep what's known",
      description: 'Each pair shows a loading state that previews the screen next to one that hides it or makes people wait for nothing.',
      body: <div className="coin-new-stack">
        <DoDont
          good={<Panel loading><Feed /></Panel>}
          bad={<Panel loading><div className="coin-new-stack"><Skeleton kind="image" width="100%" height={160} modes={LIGHT} /></div></Panel>}
          goodTitle="Keep the real layout" badTitle="Cover it with one block"
          goodCaption="Each row keeps its shape, so nothing jumps when content arrives."
          badCaption="One block hides how much is coming, and the layout jumps when it loads." />
        <DoDont
          good={<Holdings titleLoading={false} />}
          bad={<Holdings />}
          goodTitle="Keep known text real" badTitle="Grey out everything"
          goodCaption="People can read the heading while the values load."
          badCaption="Turning known text grey makes people wait for nothing." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Skeleton contract',
      description: 'The guide compares the Coin variables with the installed package and its Storybook stories.',
      body: <Sources checked="17 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('skeleton')}
        figmaDescription="No Skeleton component; only its colour and corner variables"
        stories={[
          { label: 'Kinds', id: 'components-skeleton--kinds' },
          { label: 'Reduced motion', id: 'components-skeleton--reduced-motion' },
          { label: 'Primitives', id: 'components-skeleton--primitives-auto-skeletonize' },
          { label: 'Cascade', id: 'components-skeleton--cascade' },
          { label: 'Card composition', id: 'components-skeleton--card-composition' },
          { label: 'Explicit loading prop', id: 'components-skeleton--explicit-loading-prop' },
          { label: 'Standalone atomic', id: 'components-skeleton--standalone-atomic' },
        ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (16 October build) from the team’s private package repository. Figma has no Skeleton component: the Coin variables hold its grey and its corner radii, and the ticket’s Figma link opens the Stepper Item page. In code a SkeletonGroup switches every placeholder inside it; Text, Avatar, Badge, Button, Image, and other Coin components draw their own, and a Skeleton places one by hand. Blocks are light grey (#e7e7e7; the old Storybook page gives a lighter grey). A white band sweeps across them every 1.5 s in a 75 ms cascade, or they pulse every 3 s with reduced motion, as in Storybook. Since the #266 fix a component’s loading draws its placeholder without a group too, named “Loading”; inside a group the blocks are hidden from screen readers and the group announces “Loading” once. A Skeleton placed by hand still needs a group. The published Storybook page is still the old generated one.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'skeleton',
    corePrinciple: "Show the shape of what's coming, then fill it in place.",
    figmaUrl: FIGMA, storybookUrl: docsUrl('skeleton'),
  }} playground={<>
    <div className="preview-stage">
      <Panel loading={loading} reducedMotion={reducedMotion}><Feed /></Panel>
      <span className="stage-label">Live Coin Skeleton</span>
    </div>
    <div className="controls-panel">
      <OnOff label="Loading" value={loading} onChange={setLoading} />
      <Segment label="Motion" value={motion} options={['System', 'Shimmer', 'Pulse'] as const} onChange={setMotion} />
      <Readout title="Content" value={loading ? 'Loading' : 'Loaded'}>{loading
        ? 'Each Coin component in the group draws a placeholder its own size. Turn Loading off to swap the content in.'
        : 'The same components now show their content, in the same places.'}</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'skeleton',
  label: 'Skeleton',
  summary: 'Use a Skeleton group to show the shape of content while it loads, so the screen doesn\'t jump when it arrives.',
  keywords: ['loading placeholder', 'shimmer', 'ghost content', 'loading state'],
  icon: <><rect x="2" y="3" width="14" height="3" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><rect x="2" y="8" width="10" height="3" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><rect x="2" y="13" width="6" height="3" rx="1.5" stroke="currentColor" strokeWidth="1.5" /></>,
  Component: SkeletonGuide,
})
