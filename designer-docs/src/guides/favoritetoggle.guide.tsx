import { useState } from 'react'
import { FavoriteToggle, SkeletonGroup, Text, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, Backdrop, DoDont, ExampleCard, OnOff, Readout, Segment, Sources, Specimen, SpecimenRow, byTestId, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=7612-54663'
type Size = 'S' | 'M' | 'L'
const modes = (size: Size = 'M') => ({ 'Color Mode': 'Light', 'Favorite Toggle Size': size }) as Modes

function Fav({ size = 'M', label = 'Save to favorites', initial = false, disabled, testID }: { size?: Size; label?: string; initial?: boolean; disabled?: boolean; testID?: string }) {
  const [active, setActive] = useState(initial)
  return <FavoriteToggle isActive={active} onChange={setActive} modes={modes(size)} accessibilityLabel={label} disabled={disabled} testID={testID} />
}

function FavoriteToggleGuide() {
  const [saved, setSaved] = useState(false)
  const [size, setSize] = useState<Size>('M')
  const [disabled, setDisabled] = useState(false)
  const [contextSaved, setContextSaved] = useState(false)

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A heart on glass',
      description: 'A frosted circle holds a single heart icon. There is no visible label.',
      body: <Anatomy surface="dark" parts={[
        { name: 'Glass surface', note: 'Frosted circle that keeps the heart readable over photos.', target: byTestId('fav-anatomy'), side: 'left' },
        { name: 'Heart', note: 'Filled heart; its colour is meant to change when saved.', target: `${byTestId('fav-anatomy')} svg`, side: 'top' },
      ]} marks={[{ kind: 'size', target: byTestId('fav-anatomy'), side: 'bottom', label: 'both' }]}>
        <FavoriteToggle testID="fav-anatomy" isActive={false} modes={modes('M')} accessibilityLabel="Save to favorites" />
      </Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Pick a size for the card',
      description: 'Size is the only visual choice. Medium matches the Figma component; use Small only on dense thumbnails and Large on hero images.',
      body: <div className="coin-new-example-grid three">
        <ExampleCard title="Small · 14 px" description="Fits tiny thumbnails but is hard to tap."><Backdrop><Fav size="S" /></Backdrop></ExampleCard>
        <ExampleCard title="Medium · 29 px" description="The Figma size, right for most cards."><Backdrop><Fav size="M" /></Backdrop></ExampleCard>
        <ExampleCard title="Large · 41 px" description="For full-width hero images."><Backdrop size="card"><Fav size="L" /></Backdrop></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Saved, not saved, disabled, loading',
      description: 'Saved is a white circle with a gold heart, as in Figma. Not saved is a frosted circle with a white heart.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Not saved" description="Frosted circle, white heart."><Backdrop><Fav /></Backdrop></ExampleCard>
        <ExampleCard title="Saved" description="White circle, gold heart."><Backdrop><Fav initial /></Backdrop></ExampleCard>
        <ExampleCard title="Disabled" description="Dimmed to half opacity and skipped by keyboard focus."><Backdrop><Fav disabled /></Backdrop></ExampleCard>
        <ExampleCard title="Loading" description="A same-size circle holds the place while the item loads."><Backdrop><SkeletonGroup loading><FavoriteToggle loading modes={modes('M')} accessibilityLabel="Save to favorites" /></SkeletonGroup></Backdrop></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'A fixed square set by the size mode',
      description: 'The toggle never stretches. On phones its tap area reaches 44 px around the circle; in a web browser only the visible circle responds, 14 px for Small and 29 px for Medium.',
      body: <Anatomy legend={false} surface="dark" marks={[
        { kind: 'size', target: byTestId('fav-size-s'), side: 'top', label: 'both' },
        { kind: 'size', target: byTestId('fav-size-m'), side: 'top', label: 'both' },
        { kind: 'size', target: byTestId('fav-size-l'), side: 'top', label: 'both' },
      ]}><SpecimenRow>
        <Specimen caption="S"><Fav size="S" testID="fav-size-s" /></Specimen>
        <Specimen caption="M"><Fav size="M" testID="fav-size-m" /></Specimen>
        <Specimen caption="L"><Fav size="L" testID="fav-size-l" /></Specimen>
      </SpecimenRow></Anatomy>,
    },
    content: {
      header: 'Content', title: 'Name what gets saved',
      description: 'The toggle has no visible text. Give it an accessibility label that names the item, so screen reader users hear what they are saving.',
      body: <div className="coin-new-example-grid three">
        {['Save Gold savings plan to favorites', 'Save Nifty 50 Index Fund to favorites', 'Save Digital Gold to favorites'].map(label =>
          <ExampleCard key={label} title={label}><Backdrop><Fav label={label} /></Backdrop></ExampleCard>)}
      </div>,
    },
    context: {
      header: 'In context', title: 'Save a plan from its card',
      description: 'The toggle sits in the top-right corner of the card image. The screen keeps the list of saved items and passes each card its saved state and change handler.',
      body: <div className="coin-new-context"><div className="coin-new-stack">
        <Backdrop size="card"><FavoriteToggle isActive={contextSaved} onChange={setContextSaved} modes={modes('M')} accessibilityLabel="Save Gold savings plan to favorites" /></Backdrop>
        <Text>Gold savings plan</Text>
        <Text>Start from ₹100 a month</Text>
        <p className="coin-new-readout" role="status">{contextSaved ? 'Saved to favorites' : 'Not saved'}</p>
      </div></div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Keep the heart visible and easy to hit',
      description: 'Each pair shows a placement or size change you can see.',
      body: <div className="coin-new-stack">
        <DoDont good={<Backdrop><Fav /></Backdrop>} bad={<div className="coin-new-host"><Fav /></div>} goodTitle="Place it on imagery" badTitle="Put it on a plain white surface" goodCaption="The frosted circle reads clearly over a photo." badCaption="White glass on white almost disappears." />
        <DoDont good={<Backdrop><Fav /></Backdrop>} bad={<Backdrop size="card"><Fav size="S" /></Backdrop>} goodTitle="Use Medium on cards" badTitle="Shrink it on a large card" goodCaption="29 px is the Figma size and easier to tap." badCaption="A 14 px heart is hard to see and to hit." />
        <DoDont good={<Backdrop><Fav /></Backdrop>} bad={<Backdrop><Fav /><Fav /></Backdrop>} goodTitle="Use one heart per item" badTitle="Repeat it on one card" goodCaption="One save action per card." badCaption="Two hearts make people wonder which one saves." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Favorite Toggle contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="1 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('favoritetoggle')} stories={[
        { label: 'Default', id: 'components-favoritetoggle--default' }, { label: 'States', id: 'components-favoritetoggle--states' }, { label: 'Disabled', id: 'components-favoritetoggle--disabled' },
      ]}>Declared and installed <code>jfs-components</code> is <code>0.1.78</code> from the team’s private package repository. Size comes from the <code>Favorite Toggle Size</code> mode (S 14, M 29, L 41 px) and defaults to M, the Figma size. Saved uses the <code>Favorite Toggle Color</code> Active mode: a white circle with a gold heart. On the web the saved state is announced (<code>aria-checked</code>). On iOS and Android a hit slop extends the tap area to 44 px; react-native-web ignores it, so in a browser the tap area equals the visible size.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'favoritetoggle', name: 'Favorite Toggle',
    corePrinciple: 'One heart per item, on imagery, saying exactly what gets saved.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('favoritetoggle'),
  }} playground={<>
    <div className="preview-stage">
      <Backdrop size="card"><FavoriteToggle isActive={saved} onChange={setSaved} disabled={disabled} modes={modes(size)} accessibilityLabel="Save Gold savings plan to favorites" /></Backdrop>
      <span className="stage-label">Live Coin Favorite Toggle</span>
    </div>
    <div className="controls-panel">
      <Segment label="State" value={saved ? 'Saved' : 'Not saved'} options={['Not saved', 'Saved'] as const} onChange={v => setSaved(v === 'Saved')} />
      <Segment label="Size" value={size} options={['S', 'M', 'L'] as const} onChange={setSize} />
      <OnOff label="Disabled" value={disabled} onChange={setDisabled} />
      <Readout title="Saved" value={saved ? 'Yes' : 'No'}>Saved shows a gold heart on a white circle.</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'favoritetoggle',
  label: 'Favorite Toggle',
  summary: 'Use a Favorite Toggle on an image card so people can save the item for later with one tap.',
  keywords: ['heart', 'like', 'save', 'bookmark', 'wishlist'],
  icon: <path d="M9 14.5 3.6 9.3A3 3 0 0 1 9 5.2a3 3 0 0 1 5.4 4.1L9 14.5Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />,
  Component: FavoriteToggleGuide,
})
