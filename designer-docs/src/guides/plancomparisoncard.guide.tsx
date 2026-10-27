import { useState, type ComponentProps } from 'react'
import { Badge, Button, PlanComparisonCard, Text, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, FitWidth, OnOff, Readout, ScreenFrame, Segment, Sources, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4498-2968'
const JIOPLUS = { 'Page type': 'JioPlus' } as Modes
const noop = () => {}
const W = { width: 328 }
const WF = { width: 320 }

type PCCProps = Partial<ComponentProps<typeof PlanComparisonCard>>
type Row = NonNullable<PCCProps['rows']>[number]

const TWO = [{ label: 'Your plan' }, { label: 'JioFinance+', brand: true }]
const TWO_PLAIN = [{ label: 'Your plan' }, { label: 'JioFinance+' }]
const THREE = [{ label: 'Free' }, { label: 'Plus' }, { label: 'Premium', brand: true }]
const THREE_PLAIN = [{ label: 'Free' }, { label: 'Plus' }, { label: 'Premium' }]
const ROWS: Row[] = [
  { label: 'JioPoints multiplier', values: ['1x', '1.25x'] },
  { label: 'Cashback', showInfo: true, values: [false, '₹5,000'] },
  { label: 'Bonus JioGold', showInfo: true, values: [false, '1%'] },
]
const ROWS3: Row[] = [
  { label: 'JioPoints', values: ['1x', '1.1x', '1.25x'] },
  { label: 'Cashback', showInfo: true, values: [false, '₹2,000', '₹5,000'] },
  { label: 'Gold bonus', showInfo: true, values: [false, false, '1%'] },
]
const ROWS_PLAIN: Row[] = ROWS.map(({ label, values }) => ({ label, values }))
const ROWS_BADGE: Row[] = [ROWS[0], ROWS[1], { label: 'Gold locker', values: [false, <Badge label="New" />] }]
const LONG3: PCCProps = {
  columns: [{ label: 'Free' }, { label: 'Plus' }, { label: 'JioFinance+', brand: true }],
  rows: [
    { label: 'JioPoints multiplier', values: ['1x', '1.1x', '1.25x'] },
    { label: 'Cashback', showInfo: true, values: [false, 'Up to ₹2,000', 'Up to ₹5,000'] },
    { label: 'Bonus JioGold', showInfo: true, values: [false, false, '1%'] },
  ],
}

function PCC(overrides: PCCProps = {}) {
  return <PlanComparisonCard columns={TWO} rows={ROWS} modes={JIOPLUS} style={W} {...overrides} />
}
const Framed = (overrides: PCCProps = {}) => <ScreenFrame surface="dark"><FitWidth>{PCC({ style: WF, ...overrides })}</FitWidth></ScreenFrame>

const R = ':scope > div'
const HEADER = `${R} > div:nth-child(1)`
const TABLE = `${R} > div:nth-child(2)`
const ROW1 = `${TABLE} > div:nth-child(1)`
const ROW3 = `${TABLE} > div:nth-child(3)`

function PlanComparisonCardGuide() {
  const [cols, setCols] = useState<'two' | 'three'>('two')
  const [brand, setBrand] = useState(true)
  const [info, setInfo] = useState<'none' | 'showInfo' | 'onInfoPress'>('showInfo')
  const [last, setLast] = useState('None')
  const [opened, setOpened] = useState<string | null>(null)

  const columns = cols === 'two' ? (brand ? TWO : TWO_PLAIN) : (brand ? THREE : THREE_PLAIN)
  const rows: Row[] = (cols === 'two' ? ROWS : ROWS3).map((row, i) => {
    if (i === 0) return row
    const base = { label: row.label, values: row.values }
    if (info === 'showInfo') return { ...base, showInfo: true }
    if (info === 'onInfoPress') return { ...base, onInfoPress: () => setLast(`${row.label} info pressed`) }
    return base
  })
  const buttonRows = (press: (label: string) => () => void): Row[] =>
    ROWS.map((row, i) => i === 0 ? row : { label: row.label, values: row.values, onInfoPress: press(row.label) })

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'Plan names over a table of features',
      description: 'Plan names sit in a row above a dark table. Each row of the table is one feature: its label on the left, then one cell per plan, in the same order as the names.',
      body: <Anatomy surface="dark" parts={[
        { name: 'Plan names', note: 'columns: one name per plan, 14 px, centred over its column.', target: `${HEADER} > div:nth-child(2) [dir="auto"]`, side: 'top' },
        { name: 'Recommended plan', note: 'brand: true turns that plan’s name gold.', target: `${HEADER} > div:nth-child(3) [dir="auto"]`, side: 'right' },
        { name: 'Feature', note: 'A row’s label, 12 px, always on one line.', target: `${ROW1} > div:nth-child(1) [dir="auto"]`, side: 'left' },
        { name: 'Value', note: 'A string or number from values, 12 px medium, centred.', target: `${ROW1} > div:nth-child(3) [dir="auto"]`, side: 'right' },
        { name: 'Info icon', note: 'showInfo adds it after the label; onInfoPress makes it a button.', target: `${ROW3} > div:nth-child(1) [role="img"]`, side: 'bottom' },
        { name: 'Not included', note: 'false in values: a grey cross.', target: `${ROW3} > div:nth-child(2) [role="img"]`, side: 'bottom' },
        { name: 'Table', note: 'A dark panel with 16 px corners and a 1 px line between rows.', target: TABLE, side: 'left', at: 0.85 },
      ]}>{PCC()}</Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Plans, features, and cells',
      description: 'columns names the plans, left to right. Mark the one you recommend with brand: its name turns gold. rows lists the features: each row’s values fill the plan columns in the same order. A string or number shows as text, false shows a grey cross, and any Coin component, such as a Badge, shows as it is. showInfo adds an info icon after a feature’s label. children replaces the table with your own content, under the same plan names. No mode restyles the card: the modes you give it pass to the components in its cells and slot.',
      body: <div className="coin-new-stack">
        <div className="coin-new-example-grid">
          <ExampleCard title="Two plans" description="Your plan against the one you recommend, in gold.">{Framed()}</ExampleCard>
          <ExampleCard title="Three plans" description="Each plan column gets narrower, so names and values stay short.">{Framed({ columns: THREE, rows: ROWS3 })}</ExampleCard>
          <ExampleCard title="No recommendation" description="Without brand, every plan name is white.">{Framed({ columns: TWO_PLAIN })}</ExampleCard>
          <ExampleCard title="A Badge in a cell" description="A Coin component fills the cell and gets the card’s modes.">{Framed({ rows: ROWS_BADGE })}</ExampleCard>
        </div>
        <div className="coin-new-example-grid">
          <ExampleCard title="Without info icons" description="Leave out showInfo when a feature needs no explaining.">{Framed({ rows: ROWS_PLAIN })}</ExampleCard>
          <ExampleCard title="Custom body" description="Your content replaces the table; the plan names stay, and the card adds no panel.">{Framed({ children: <Text text="JioFinance+ benefits change on 1 November." /> })}</ExampleCard>
        </div>
      </div>,
    },
    states: {
      header: 'States', title: 'An info icon that explains or only hints',
      description: 'showInfo draws the icon as a hint: it doesn’t press, and screen readers skip it. onInfoPress makes the same icon a button named “More information about” and the feature, with a bigger tap area than it looks. Use it to open the explanation, for example in a sheet. The card and its rows have no pressed, selected, or disabled state.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Hint" description="The icon only marks that more detail exists.">{Framed()}</ExampleCard>
        <ExampleCard title="Button" description="Looks the same, but each icon is a button you can tab to.">{Framed({ rows: buttonRows(() => noop) })}</ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'Fills its host, nothing wraps',
      description: 'The card fills the width of its host; Figma draws it at 328 px. The feature column takes 1.8 shares of the width and each plan column one share, so at 328 px two plans leave about 67 px for each value and three plans about 48 px. Text never wraps or shortens: a name, label, or value too long for its column runs into the next one. Height follows the rows: each row is 46 px, and the plan names sit 16 px above the table.',
      body: <Anatomy legend={false} surface="dark" marks={[
        { kind: 'size', target: R, side: 'bottom', label: 'both' },
        { kind: 'gap', from: HEADER, to: TABLE },
        { kind: 'padding', target: `${ROW1} > div:nth-child(1) > div` },
        { kind: 'size', target: `${ROW1} > div:nth-child(3)`, side: 'right', label: 'both' },
      ]}>{PCC()}</Anatomy>,
    },
    content: {
      header: 'Content', title: 'Short names, short values',
      description: 'Call the user’s current plan Your plan and the others by their product names, in a word or two. Write features as nouns, such as Cashback or Bonus JioGold, not sentences. Keep values to a number or a few characters: 1.25x, ₹5,000, 1%. Use false for a feature a plan doesn’t include, not the word No, so every missing feature looks the same. With three plans, keep names under about 8 characters.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Upgrade from your plan" description="The current plan first, the upgrade by its product name.">{Framed()}</ExampleCard>
        <ExampleCard title="Three tiers" description="Short names and values that fit the narrower columns.">{Framed({ columns: THREE, rows: ROWS3 })}</ExampleCard>
      </div>,
    },
    context: {
      header: 'In context', title: 'The JioFinance+ upgrade screen',
      description: 'The comparison sits between the screen’s heading and its upgrade button. Each info icon opens that feature’s explanation through onInfoPress; the button starts the upgrade through its own onPress.',
      body: <div className="coin-new-context">
        <ScreenFrame size="full" surface="dark" footer={<VStack style={{ padding: 16 }}><Button label="Upgrade to JioFinance+" onPress={() => setOpened('Upgrade')} modes={{ AppearanceBrand: 'Primary' } as Modes} style={{ width: '100%' }} /></VStack>}>
          <VStack modes={{ ...JIOPLUS, 'Slot gap': 'L' } as Modes} style={{ flex: 1, padding: 16 }}>
            <VStack modes={{ ...JIOPLUS, 'Slot gap': 'XS', Padding: 'None' } as Modes}>
              <Text text="Get more with JioFinance+" modes={{ ...JIOPLUS, 'Text Sizes': 'Large', Weight: 'Bold' } as Modes} />
              <Text text="Compare what you get today with the upgrade." modes={{ ...JIOPLUS, 'Text Sizes': 'Small', Weight: 'Regular' } as Modes} />
            </VStack>
            <FitWidth>{PCC({ style: { width: 326 }, rows: buttonRows((label) => () => setOpened(`${label} details`)) })}</FitWidth>
          </VStack>
        </ScreenFrame>
        <p className="coin-new-readout" role="status">{opened === null ? 'Nothing opened yet' : opened === 'Upgrade' ? 'Started the upgrade' : `Opened ${opened}`}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Crosses, one gold plan, values that fit',
      description: 'Each pair shows a comparison that reads at a glance next to one that hides a missing feature, loses the recommendation, or spills out of its columns.',
      body: <div className="coin-new-stack">
        <DoDont good={Framed()} bad={Framed({ rows: [ROWS[0], { ...ROWS[1], values: ['No', '₹5,000'] }, { ...ROWS[2], values: ['No', '1%'] }] })}
          goodTitle="Cross for not included" goodCaption="false shows the same grey cross in every cell." badTitle="The word No" badCaption="Text reads like a value and looks different from the crosses." />
        <DoDont good={Framed()} bad={Framed({ columns: [{ label: 'Your plan', brand: true }, { label: 'JioFinance+', brand: true }] })}
          goodTitle="One recommended plan" goodCaption="Only JioFinance+ is gold." badTitle="Every plan gold" badCaption="Nothing stands out as the one to pick." />
        <DoDont good={Framed({ columns: THREE, rows: ROWS3 })} bad={Framed(LONG3)}
          goodTitle="Short names for three plans" goodCaption="Every name and value fits its column." badTitle="Long names in three columns" badCaption="Text doesn’t wrap, so it runs into the next column and off the card." />
        <DoDont good={Framed()} bad={Framed({ rows: [ROWS[0], { ...ROWS[1], values: ['₹5,000'] }, ROWS[2]] })}
          goodTitle="One value per plan" goodCaption="Each value sits under its own plan." badTitle="A value missing" badCaption="Values fill columns in order, so ₹5,000 lands under Your plan." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Plan Comparison Card contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="21 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('plancomparisoncard')} stories={[
        { label: 'Default', id: 'components-plancomparisoncard--default' },
        { label: 'Three plans', id: 'components-plancomparisoncard--three-plans' },
        { label: 'Interactive info', id: 'components-plancomparisoncard--interactive-info' },
        { label: 'Custom slot', id: 'components-plancomparisoncard--custom-slot' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (19 October build of Biscuit’s main) from the team’s private package repository. Figma’s Plan Comparison Card exposes only its Slot as a property; the plan names, rows, and cells are layers there. In the package, the plan names split their row exactly 1.8 to 1 but the table’s cells don’t, because each cell’s padding counts first, so a name sits 3 to 8 px right of its column. Text never wraps or shortens and overflows narrow columns. The table is 5 px taller than Figma’s because its row lines sit outside the 46 px cells, and Figma draws no line under its third row. The info icon from <code>showInfo</code> and the grey cross have no accessible name. The published Storybook still shows the older generated page, with every story on a black host (all reported).</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'plancomparisoncard', corePrinciple: 'Same features, side by side.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('plancomparisoncard'),
  }} playground={<>
    <div className="preview-stage">
      {Framed({ columns, rows })}
      <span className="stage-label">Live Coin Plan Comparison Card</span>
    </div>
    <div className="controls-panel">
      <Segment label="columns" value={cols} options={['two', 'three'] as const} onChange={setCols} />
      <OnOff label="brand" value={brand} onChange={setBrand} />
      <Segment label="info" value={info} options={['none', 'showInfo', 'onInfoPress'] as const} onChange={setInfo} />
      <Readout title="Last press" value={last}>Only onInfoPress makes the icon a button. The card and its rows don’t press.</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'plancomparisoncard',
  label: 'Plan Comparison Card',
  summary: 'Use a Plan Comparison Card to compare two or three plans feature by feature, with the plan you recommend in gold.',
  keywords: ['plan comparison', 'compare plans', 'feature matrix', 'upgrade table', 'membership plans'],
  icon: <><rect x="2.5" y="3.5" width="13" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M2.5 7.5h13M2.5 11h13M8.5 7.5v7" stroke="currentColor" strokeWidth="1.5" fill="none" /></>,
  Component: PlanComparisonCardGuide,
})
