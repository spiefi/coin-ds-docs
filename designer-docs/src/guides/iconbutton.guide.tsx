import { useState } from 'react'
import { Card, HStack, IconButton, SkeletonGroup, Text, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, Segment, Sources, Specimen, SpecimenRow, byTestId, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2018-4301'
type Size = 'M' | 'S'
type Emphasis = 'High' | 'Medium' | 'Low'
type Appearance = 'Primary' | 'Secondary' | 'Neutral' | 'Tertiary'
type IconChoice = 'Add' | 'Share' | 'Filter' | 'Download'

const modes = ({ size = 'M', emphasis = 'High', appearance = 'Primary' }: { size?: Size; emphasis?: Emphasis; appearance?: Appearance } = {}) =>
  ({ 'Color Mode': 'Light', 'Button / Size': size, Emphasis: emphasis, AppearanceBrand: appearance }) as Modes

const ICONS: Record<IconChoice, string> = { Add: 'ic_add', Share: 'ic_share', Filter: 'ic_filter', Download: 'ic_download' }
const light = { 'Color Mode': 'Light' } as Modes

function IconButtonGuide() {
  const [icon, setIcon] = useState<IconChoice>('Add')
  const [size, setSize] = useState<Size>('M')
  const [emphasis, setEmphasis] = useState<Emphasis>('High')
  const [appearance, setAppearance] = useState<Appearance>('Primary')
  const [disabled, setDisabled] = useState(false)
  const [presses, setPresses] = useState(0)
  const [status, setStatus] = useState('No action yet')

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'An icon in a circle',
      description: 'A token-sized circle holds one icon. There is no visible text, so the label lives in the accessibility name.',
      body: <Anatomy parts={[
        { name: 'Container', note: 'Circle whose size comes from the Button / Size mode.', target: byTestId('ib-anatomy'), side: 'left' },
        { name: 'Icon', note: 'One registry icon that names the action.', target: `${byTestId('ib-anatomy')} svg`, side: 'top' },
      ]} marks={[
        { kind: 'size', target: byTestId('ib-anatomy'), side: 'bottom', label: 'both' },
        { kind: 'padding', target: byTestId('ib-anatomy') },
      ]}><IconButton testID="ib-anatomy" iconName="ic_add" accessibilityLabel="Add" modes={modes()} /></Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Emphasis and appearance',
      description: 'Emphasis sets how loud the button is; appearance picks the brand colour family. Use High for the main action in a group and Medium or Low for the rest.',
      body: <div className="coin-new-stack">
        <ExampleCard title="High · Medium · Low" description="Emphasis steps the fill from solid gold to tint to none."><div className="coin-new-content-list">
          {(['High', 'Medium', 'Low'] as const).map(e => <IconButton key={e} iconName="ic_add" accessibilityLabel="Add" modes={modes({ emphasis: e })} />)}
        </div></ExampleCard>
        <ExampleCard title="Appearances" description="Appearance changes the colour family, not the importance."><div className="coin-new-content-list">
          {(['Primary', 'Secondary', 'Neutral', 'Tertiary'] as const).map(a => <IconButton key={a} iconName="ic_add" accessibilityLabel="Add" modes={modes({ appearance: a })} />)}
        </div></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Default, toggle, disabled, loading',
      description: 'A toggle swaps between two icons, and its On state turns into a white circle with a black icon. It keeps one name and is announced as pressed or not pressed.',
      body: <div className="coin-new-example-grid three">
        <ExampleCard title="Default" description="One press, one action."><IconButton iconName="ic_add" accessibilityLabel="Add" modes={modes()} /></ExampleCard>
        <ExampleCard title="Toggle off" description="Gold fill with the inactive icon."><IconButton isToggle isActive={false} inactiveIcon="ic_flash" activeIcon="ic_flash_off" accessibilityLabel="Flash" modes={modes()} /></ExampleCard>
        <ExampleCard title="Toggle on" description="White fill with the active icon, announced as pressed."><IconButton isToggle isActive inactiveIcon="ic_flash" activeIcon="ic_flash_off" accessibilityLabel="Flash" modes={modes()} /></ExampleCard>
        <ExampleCard title="Disabled" description="Dimmed to half opacity and skipped by keyboard focus."><IconButton iconName="ic_add" accessibilityLabel="Add" disabled modes={modes()} /></ExampleCard>
        <ExampleCard title="Loading" description="A same-size placeholder while the action loads."><SkeletonGroup loading><IconButton loading iconName="ic_add" accessibilityLabel="Add" modes={modes()} /></SkeletonGroup></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'Two sizes, fixed squares',
      description: 'Medium is 40 px and Small is 26 px in the installed package; Figma draws Medium at 42 px. XS renders the same as Small. The button never stretches with its container.',
      body: <Anatomy legend={false} marks={[
        { kind: 'size', target: byTestId('ib-size-m'), side: 'top', label: 'both' },
        { kind: 'size', target: byTestId('ib-size-s'), side: 'top', label: 'both' },
      ]}><SpecimenRow>
        <Specimen caption="M"><IconButton testID="ib-size-m" iconName="ic_add" accessibilityLabel="Add" modes={modes({ size: 'M' })} /></Specimen>
        <Specimen caption="S"><IconButton testID="ib-size-s" iconName="ic_add" accessibilityLabel="Add" modes={modes({ size: 'S' })} /></Specimen>
      </SpecimenRow></Anatomy>,
    },
    content: {
      header: 'Content', title: 'Pick an icon people already know',
      description: 'Use icons with one common meaning and give each button a label that says the action, such as “Share statement”, not the icon’s name.',
      body: <div className="coin-new-example-grid three">
        <ExampleCard title="Share statement"><IconButton iconName="ic_share" accessibilityLabel="Share statement" modes={modes()} /></ExampleCard>
        <ExampleCard title="Download statement"><IconButton iconName="ic_download" accessibilityLabel="Download statement" modes={modes()} /></ExampleCard>
        <ExampleCard title="Filter transactions"><IconButton iconName="ic_filter" accessibilityLabel="Filter transactions" modes={modes()} /></ExampleCard>
      </div>,
    },
    context: {
      header: 'In context', title: 'Actions on a statement card',
      description: 'Icon Buttons sit together at the end of a row. The strongest one is the main action; the screen handles each press.',
      body: <div className="coin-new-context">
        <Card modes={light}><HStack alignVertical="center" justifyHorizontal="space-between" modes={light}>
          <Text>September statement</Text>
          <div className="coin-new-content-list">
            <IconButton iconName="ic_share" accessibilityLabel="Share statement" modes={modes({ emphasis: 'Low' })} onPress={() => setStatus('Shared')} />
            <IconButton iconName="ic_download" accessibilityLabel="Download statement" modes={modes({ emphasis: 'High' })} onPress={() => setStatus('Downloaded')} />
          </div>
        </HStack></Card>
        <p className="coin-new-readout" role="status">{status}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Keep icon actions obvious',
      description: 'Each pair shows a choice you can see in the row.',
      body: <div className="coin-new-stack">
        <DoDont
          good={<div className="coin-new-content-list"><IconButton iconName="ic_share" accessibilityLabel="Share statement" modes={modes({ emphasis: 'Low' })} /><IconButton iconName="ic_download" accessibilityLabel="Download statement" modes={modes({ emphasis: 'High' })} /></div>}
          bad={<div className="coin-new-content-list"><IconButton iconName="ic_share" accessibilityLabel="Share statement" modes={modes()} /><IconButton iconName="ic_download" accessibilityLabel="Download statement" modes={modes()} /><IconButton iconName="ic_filter" accessibilityLabel="Filter transactions" modes={modes()} /></div>}
          goodTitle="Make one action strongest" badTitle="Make every action loud"
          goodCaption="The High button stands out as the main action." badCaption="Three High buttons compete for attention." />
        <DoDont
          good={<IconButton iconName="ic_download" accessibilityLabel="Download statement" modes={modes()} />}
          bad={<IconButton iconName="ic_card" accessibilityLabel="Download statement" modes={modes()} />}
          goodTitle="Use a familiar icon" badTitle="Use an unclear icon"
          goodCaption="A download arrow says what happens." badCaption="A card icon does not say it downloads a statement." />
        <DoDont
          good={<div className="coin-new-content-list"><IconButton iconName="ic_share" accessibilityLabel="Share statement" modes={modes({ emphasis: 'Medium' })} /><IconButton iconName="ic_download" accessibilityLabel="Download statement" modes={modes({ emphasis: 'Medium' })} /><IconButton iconName="ic_filter" accessibilityLabel="Filter transactions" modes={modes({ emphasis: 'Medium' })} /></div>}
          bad={<div className="coin-new-content-list"><IconButton iconName="ic_share" accessibilityLabel="Share statement" modes={modes({ emphasis: 'Medium' })} /><IconButton iconName="ic_download" accessibilityLabel="Download statement" modes={modes({ size: 'S', emphasis: 'Medium' })} /><IconButton iconName="ic_filter" accessibilityLabel="Filter transactions" modes={modes({ emphasis: 'Medium' })} /></div>}
          goodTitle="Keep sizes consistent in a row" badTitle="Mix sizes in one row"
          goodCaption="One size reads as one group." badCaption="Mixed sizes look like different kinds of action." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Icon Button contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="28 September 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('iconbutton')} stories={[
        { label: 'Default', id: 'components-iconbutton--default' }, { label: 'Toggle', id: 'components-iconbutton--toggle' }, { label: 'Sizes', id: 'components-iconbutton--sizes' }, { label: 'Emphasis', id: 'components-iconbutton--appearance-modes' }, { label: 'Disabled', id: 'components-iconbutton--disabled' },
      ]}>Declared and installed <code>jfs-components</code> is <code>0.1.78</code> from the team’s private package repository. Size, emphasis, and appearance come from the <code>Button / Size</code>, <code>Emphasis</code>, and <code>AppearanceBrand</code> modes. A toggle’s On state uses the toggle tokens, a white circle with a black icon as in Figma. On the web a toggle is announced as pressed or not pressed and keeps the same name in both states. Figma’s Glass variant has no package equivalent. Without a label, the accessible name is the icon’s name, so always set one.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'iconbutton',
    corePrinciple: 'One familiar icon, one clear action, and a label for people who cannot see it.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('iconbutton'),
  }} playground={<>
    <div className="preview-stage">
      <IconButton iconName={ICONS[icon]} accessibilityLabel={icon} disabled={disabled} modes={modes({ size, emphasis, appearance })} onPress={() => setPresses(n => n + 1)} />
      <span className="stage-label">Live Coin Icon Button</span>
    </div>
    <div className="controls-panel">
      <Segment label="Icon" value={icon} options={['Add', 'Share', 'Filter', 'Download'] as const} onChange={setIcon} />
      <Segment label="Size" value={size} options={['M', 'S'] as const} onChange={setSize} />
      <Segment label="Emphasis" value={emphasis} options={['High', 'Medium', 'Low'] as const} onChange={setEmphasis} />
      <Segment label="Appearance" value={appearance} options={['Primary', 'Secondary', 'Neutral', 'Tertiary'] as const} onChange={setAppearance} />
      <OnOff label="Disabled" value={disabled} onChange={setDisabled} />
      <Readout title="Presses" value={String(presses)} />
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'iconbutton',
  label: 'Icon Button',
  summary: 'Use an Icon Button for a frequent, well-known action where an icon alone is clear, such as add, share, or close.',
  keywords: ['icon', 'icon only', 'close button', 'share button', 'add button'],
  icon: <><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" /><path d="M9 6v6M6 9h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>,
  Component: IconButtonGuide,
})
