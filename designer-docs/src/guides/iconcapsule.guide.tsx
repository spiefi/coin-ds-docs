import { useState } from 'react'
import { IconCapsule, ListGroup, ListItem, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, Readout, Segment, Sources, Specimen, SpecimenRow, byTestId, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=8960-33559'
const M = (m: Record<string, string> = {}) => ({ 'Color Mode': 'Light', ...m }) as Modes
const SYS = (s: string) => ({ 'Semantic Intent': 'System', AppearanceSystem: s })
const IC = (m: Record<string, string> = {}, name = 'ic_wallet') => <IconCapsule modes={M(m)} iconName={name} />
const CAP = byTestId('ic-anatomy')

type Size = 'XS' | 'S' | 'M' | 'L'
type Emphasis = 'High' | 'Medium' | 'Low'
type Brand = 'Primary' | 'Secondary' | 'Neutral' | 'Tertiary'
const SIZE_READOUT: Record<Size, string> = {
  XS: '18 px circle, 12 px icon', S: '29 px circle, 18 px icon', M: '42 px circle, 18 px icon', L: '81 px circle, 36 px icon',
}
const SIZES: Array<[Size, string]> = [['XS', 'ic-xs'], ['S', 'ic-s'], ['M', 'ic-m'], ['L', 'ic-l']]

function IconCapsuleGuide() {
  const [size, setSize] = useState<Size>('M')
  const [emphasis, setEmphasis] = useState<Emphasis>('High')
  const [brand, setBrand] = useState<Brand>('Primary')

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'An icon in a circle',
      description: 'The circle and the icon inside it both come from modes. There’s no text: the words belong to the row or tile around it.',
      body: <Anatomy marks={[{ kind: 'size', target: CAP, side: 'bottom', label: 'both' }]} parts={[
        { name: 'Circle', note: 'Icon Capsule Size sets it, 42 px at M; AppearanceBrand and Emphasis fill it.', target: CAP, side: 'left' },
        { name: 'Icon', note: 'iconName: one glyph from the Coin icon set, 18 px at M.', target: `${CAP} svg`, side: 'right' },
      ]}><IconCapsule testID="ic-anatomy" modes={M({ AppearanceBrand: 'Neutral' })} iconName="ic_card" /></Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Colour from three modes',
      description: 'With Semantic Intent Brand, the default, AppearanceBrand picks the colour and Emphasis how strong it is. Semantic Intent System colours it with AppearanceSystem instead, for success, warning, and errors, and ignores Emphasis. With no modes it’s Primary gold; Figma draws Neutral.',
      body: <div className="coin-new-stack">
        <div className="coin-new-example-grid">
          <ExampleCard title="Primary" description="Gold with a black icon: the default.">{IC({})}</ExampleCard>
          <ExampleCard title="Secondary" description="Purple with a white icon.">{IC({ AppearanceBrand: 'Secondary' })}</ExampleCard>
          <ExampleCard title="Neutral" description="Dark grey with a white icon, as Figma draws it.">{IC({ AppearanceBrand: 'Neutral' })}</ExampleCard>
          <ExampleCard title="Tertiary" description="Blue with a white icon.">{IC({ AppearanceBrand: 'Tertiary' })}</ExampleCard>
        </div>
        <div className="coin-new-example-grid three">
          <ExampleCard title="Emphasis High" description="A solid circle.">{IC({ AppearanceBrand: 'Secondary' })}</ExampleCard>
          <ExampleCard title="Emphasis Medium" description="A pale circle with a coloured icon.">{IC({ AppearanceBrand: 'Secondary', Emphasis: 'Medium' })}</ExampleCard>
          <ExampleCard title="Emphasis Low" description="No circle, just the coloured icon.">{IC({ AppearanceBrand: 'Secondary', Emphasis: 'Low' })}</ExampleCard>
        </div>
        <div className="coin-new-example-grid three">
          <ExampleCard title="positive" description="Green, for something that worked.">{IC(SYS('positive'), 'ic_confirm')}</ExampleCard>
          <ExampleCard title="warning" description="Orange, for something to check.">{IC(SYS('warning'), 'ic_warning')}</ExampleCard>
          <ExampleCard title="negative" description="Red, for something that failed.">{IC(SYS('negative'), 'ic_error')}</ExampleCard>
        </div>
      </div>,
    },
    states: {
      header: 'States', title: 'No states of its own',
      description: 'An Icon Capsule doesn’t press, select, or disable: the row or tile around it does. If iconName isn’t in the Coin icon set, the circle shows with nothing in it.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="In the icon set" description="ic_wallet draws the wallet glyph.">{IC({}, 'ic_wallet')}</ExampleCard>
        <ExampleCard title="Not in the icon set" description="An unknown name leaves the circle empty.">{IC({}, 'wallet')}</ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'Four sizes',
      description: 'Icon Capsule Size sets the circle and the icon together: XS is 18 px with a 12 px icon, S 29 with 18, M 42 with 18, and L 81 with 36. Figma draws M. Some parent components set the Context mode instead, which fixes the capsule at 14 or 58 px whatever its size.',
      body: <Anatomy legend={false} marks={SIZES.map(([, id]) => ({ kind: 'size' as const, target: byTestId(id), side: 'top' as const, label: 'both' as const }))}>
        <SpecimenRow>{SIZES.map(([s, id]) => <Specimen key={s} caption={s}>
          <IconCapsule testID={id} modes={M({ 'Icon Capsule Size': s })} iconName="ic_wallet" />
        </Specimen>)}</SpecimenRow>
      </Anatomy>,
    },
    content: {
      header: 'Content', title: 'One glyph that names the thing',
      description: 'Pick the glyph from the Coin icon set by its iconName, so it says the same as the row’s title: a bulb for electricity, a drop for water. A capsule holds one glyph, never letters or a logo; use an Avatar for those.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="ic_bulb" description="Electricity.">{IC({ AppearanceBrand: 'Neutral' }, 'ic_bulb')}</ExampleCard>
        <ExampleCard title="ic_water" description="Water.">{IC({ AppearanceBrand: 'Neutral' }, 'ic_water')}</ExampleCard>
        <ExampleCard title="ic_mobile" description="Mobile recharge.">{IC({ AppearanceBrand: 'Neutral' }, 'ic_mobile')}</ExampleCard>
        <ExampleCard title="ic_savings" description="Savings.">{IC({ AppearanceBrand: 'Neutral' }, 'ic_savings')}</ExampleCard>
      </div>,
    },
    context: {
      header: 'In context', title: 'The mark at the start of a row',
      description: 'In a List Item’s leading slot the capsule says what each row is about. The row passes its modes to the capsule, and the capsule’s own modes win, so set its colour on the capsule.',
      body: <div className="coin-new-context"><ListGroup modes={M()} label="Pay bills">
        <ListItem layout="Horizontal" title="Electricity" supportText="Adani Electricity" leading={IC({ AppearanceBrand: 'Neutral' }, 'ic_bulb')} onPress={() => {}} />
        <ListItem layout="Horizontal" title="Water" supportText="BWSSB" leading={IC({ AppearanceBrand: 'Neutral' }, 'ic_water')} onPress={() => {}} />
        <ListItem layout="Horizontal" title="Mobile recharge" supportText="Jio prepaid" leading={IC({ AppearanceBrand: 'Neutral' }, 'ic_mobile')} onPress={() => {}} />
      </ListGroup></div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Keep the icon and its meaning',
      description: 'Each pair shows a capsule people read at a glance next to one that loses its icon or says the wrong thing.',
      body: <div className="coin-new-stack">
        <DoDont good={IC({ AppearanceBrand: 'Neutral' }, 'ic_wallet')} bad={IC({ AppearanceBrand: 'Neutral' }, 'wallet')}
          goodTitle="A name from the icon set" goodCaption="ic_wallet draws the wallet."
          badTitle="A name Coin doesn’t have" badCaption="“wallet” isn’t in the set, so the circle is empty." />
        <DoDont good={IC(SYS('negative'), 'ic_error')} bad={IC({ AppearanceBrand: 'Secondary' }, 'ic_error')}
          goodTitle="System for a failure" goodCaption="Negative is red, the colour people expect for an error."
          badTitle="A brand colour for a failure" badCaption="Purple doesn’t say that anything went wrong." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Icon Capsule contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="28 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('iconcapsule')} stories={[
        { label: 'Default', id: 'components-iconcapsule--default' },
        { label: 'Different icons', id: 'components-iconcapsule--different-icons' },
        { label: 'Appearance modes', id: 'components-iconcapsule--appearance-modes' },
        { label: 'Fallback source', id: 'components-iconcapsule--fallback-source-comparison' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (27 October build of Biscuit’s main) from the team’s private package repository. Figma’s Icon Capsule has a <code>Type</code> property, Default or Glass, and an <code>icon</code> swap, drawn at 42 px in Neutral. The package takes <code>iconName</code> and modes: it has no Glass type, and with no modes it’s Primary gold. It drops <code>accessibilityLabel</code> and hides the icon from screen readers, so name it in the row or tile around it. A custom <code>source</code> icon shows only when <code>iconName</code> isn’t in the icon set (reported).</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'iconcapsule',
    corePrinciple: 'One glyph in one circle; modes pick its size and colour.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('iconcapsule'),
  }} playground={<>
    <div className="preview-stage">
      {IC({ 'Icon Capsule Size': size, Emphasis: emphasis, AppearanceBrand: brand }, 'ic_card')}
      <span className="stage-label">Live Coin Icon Capsule</span>
    </div>
    <div className="controls-panel">
      <Segment label="Icon Capsule Size" value={size} options={['XS', 'S', 'M', 'L']} onChange={setSize} />
      <Segment label="Emphasis" value={emphasis} options={['High', 'Medium', 'Low']} onChange={setEmphasis} />
      <Segment label="AppearanceBrand" value={brand} options={['Primary', 'Secondary', 'Neutral', 'Tertiary']} onChange={setBrand} />
      <Readout title="Size" value={SIZE_READOUT[size]}>Low draws no circle: only the icon takes the colour.</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'iconcapsule',
  label: 'Icon Capsule',
  summary: 'Use an Icon Capsule to show one icon in a coloured circle, such as the mark at the start of a list row or a status on a result screen.',
  keywords: ['icon circle', 'round icon', 'leading icon', 'status icon', 'icon badge'],
  icon: <><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" /><rect x="6" y="6.75" width="6" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" /></>,
  Component: IconCapsuleGuide,
})
