import { useState, type ReactNode } from 'react'
import { Avatar, IconCapsule, ListGroup, ListItem, MoneyValue, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Segment, Sources, byTestId, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2849-3171'
const M = (m: Record<string, string> = {}) => ({ 'Color Mode': 'Light', ...m }) as Modes
const LIGHT = M()

type Tx = { title: string; support: string; value: string; initials: string }
const TX: Tx[] = [
  { title: 'Netflix', support: '12 Mar', value: '499', initials: 'NE' },
  { title: 'Swiggy', support: '10 Mar', value: '320', initials: 'SW' },
  { title: 'Adani Electricity', support: '8 Mar', value: '1,840', initials: 'AE' },
  { title: 'Jio Fiber', support: '28 Feb', value: '999', initials: 'JF' },
  { title: 'Zomato', support: '14 Feb', value: '650', initials: 'ZO' },
]
const MARCH = TX.slice(0, 3)
const TWO = TX.slice(0, 2)
const FEB = TX.slice(3, 5)

type Pin = { id: string; title: string; support: string; icon: string }
const PINNED: Pin[] = [
  { id: 'Savings', title: 'Savings', support: 'Balance and statements', icon: 'ic_savings' },
  { id: 'Bills', title: 'Bills', support: 'Electricity, water, gas', icon: 'ic_bill' },
  { id: 'Mobile recharge', title: 'Mobile recharge', support: 'Jio prepaid', icon: 'ic_mobile' },
  { id: 'Wallet', title: 'Wallet', support: 'JioPay wallet', icon: 'ic_wallet' },
]

function ROW(tx: Tx, extra: Record<string, unknown> = {}) {
  return <ListItem key={tx.title} layout="Horizontal" title={tx.title} supportText={tx.support}
    leading={<Avatar style="Monogram" monogram={tx.initials} />}
    trailing={<MoneyValue value={tx.value} currency="₹" />} onPress={() => {}} {...extra} />
}

function G(m: Record<string, string>, label: string | undefined, rows: ReactNode, extra: { disableTruncation?: boolean } = {}) {
  return <ListGroup modes={M(m)} label={label} {...extra}>{rows}</ListGroup>
}

const A = byTestId('lg-anatomy')
const S = byTestId('lg-size')
const label = (x: string) => `${x} > div:first-child`
const rows = (x: string) => `${x} > div:nth-child(2)`
const row = (x: string, n: number) => `${x} > div:nth-child(2) > :nth-child(${n})`

type Style = 'Default' | 'Boxed' | 'Minimal'
type Level = 'Default' | 'Bold'
const LONG = 'Payments to merchants this month across all linked accounts'

function ListGroupGuide() {
  const [style, setStyle] = useState<Style>('Default')
  const [level, setLevel] = useState<Level>('Default')
  const [hasLabel, setHasLabel] = useState(true)
  const [order, setOrder] = useState<Pin[]>(PINNED)

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A label over rows',
      description: 'The label sits 12 px above the rows, and the rows sit 12 px apart. The group draws nothing else: no fill, border, or padding.',
      body: <Anatomy specimenWidth={328} marks={[{ kind: 'outline', target: A, variant: 'bounds' }, { kind: 'gap', from: label(A), to: rows(A) }]} parts={[
        { name: 'Label', note: 'label: what the rows share, on one line.', target: label(A), side: 'top' },
        { name: 'Row', note: 'A List Item; the group passes its modes to it.', target: row(A, 1), side: 'right' },
        { name: 'Group', note: 'A column that fills its width, with no fill or padding.', target: A, side: 'bottom', at: 0.5 },
      ]}><ListGroup testID="lg-anatomy" modes={LIGHT} label="March 2025">{TWO.map(tx => ROW(tx))}</ListGroup></Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Row style and label weight',
      description: 'List Item Style changes every row: Default rows sit 12 px apart with no fill, Boxed puts each row on a white card, and Minimal packs them 4 px apart with lighter titles. Title Level makes the label bigger and bolder. Without a label the rows start at the top.',
      body: <div className="coin-new-stack">
        <div className="coin-new-example-grid three">
          <ExampleCard title="Default" description="Rows 12 px apart, no fill.">{G({}, 'March 2025', TWO.map(tx => ROW(tx)))}</ExampleCard>
          <ExampleCard title="Boxed" description="Each row on a white card.">{G({ 'List Item Style': 'Boxed' }, 'March 2025', TWO.map(tx => ROW(tx)))}</ExampleCard>
          <ExampleCard title="Minimal" description="Rows 4 px apart, regular titles.">{G({ 'List Item Style': 'Minimal' }, 'March 2025', TWO.map(tx => ROW(tx)))}</ExampleCard>
        </div>
        <div className="coin-new-example-grid three">
          <ExampleCard title="Title Level Default" description="A 14 px grey label.">{G({}, 'March 2025', TWO.map(tx => ROW(tx)))}</ExampleCard>
          <ExampleCard title="Title Level Bold" description="An 18 px black label.">{G({ 'Title Level': 'Bold' }, 'March 2025', TWO.map(tx => ROW(tx)))}</ExampleCard>
          <ExampleCard title="No label" description="The rows start at the top.">{G({}, undefined, TWO.map(tx => ROW(tx)))}</ExampleCard>
        </div>
      </div>,
    },
    states: {
      header: 'States', title: 'Rows people can reorder',
      description: 'Give the group data, renderItem, keyExtractor, and onDragEnd, and every row gets a drag handle. People drag a row by its handle, and onDragEnd hands your screen the new order to save. All four are needed: leave one out and only the label shows. In this mode the group doesn’t pass its modes on, so give every row the same modes.',
      body: <ExampleCard title="Drag a handle" description="Your screen keeps the order; this one shows it below.">
        <ListGroup modes={LIGHT} label="Pinned on home" data={order} keyExtractor={(i: Pin) => i.id} onDragEnd={({ data }) => setOrder(data)}
          renderItem={({ item, isActive, drag }) => <ListItem layout="Horizontal" modes={LIGHT} title={item.title} supportText={item.support} navArrow={false} isDraggable isDragging={isActive} onDragHandleGrant={drag}
            leading={<IconCapsule iconName={item.icon} modes={M({ AppearanceBrand: 'Neutral' })} />} />} />
        <p className="coin-new-readout" role="status">Order: {order.map(i => i.title).join(', ')}</p>
      </ExampleCard>,
    },
    sizing: {
      header: 'Sizing', title: 'Full width, 12 px apart',
      description: 'The group fills its container and adds no padding: the label, 12 px, then rows 12 px apart, or 4 px with Minimal. Each row keeps its own height: 42 px for a Default List Item with an avatar, 68 px Boxed.',
      body: <Anatomy legend={false} specimenWidth={328} marks={[
        { kind: 'size', target: S, side: 'bottom', label: 'both' },
        { kind: 'gap', from: label(S), to: rows(S) },
        { kind: 'gap', from: row(S, 1), to: row(S, 2) },
      ]}><ListGroup testID="lg-size" modes={LIGHT} label="March 2025">{TWO.map(tx => ROW(tx))}</ListGroup></Anatomy>,
    },
    content: {
      header: 'Content', title: 'A label that names the rows',
      description: 'Write label as the one thing the rows share, such as a month or a kind of account, in a few words. It stays on one line and ends in an ellipsis; disableTruncation lets a longer label wrap.',
      body: <div className="coin-new-example-grid three">
        <ExampleCard title="A month" description="Fits on one line.">{G({}, 'March 2025', TWO.map(tx => ROW(tx)))}</ExampleCard>
        <ExampleCard title="A sentence" description="It ends in an ellipsis.">{G({}, LONG, TWO.map(tx => ROW(tx)))}</ExampleCard>
        <ExampleCard title="Wrapped" description="disableTruncation shows all of it.">{G({}, LONG, TWO.map(tx => ROW(tx)), { disableTruncation: true })}</ExampleCard>
      </div>,
    },
    context: {
      header: 'In context', title: 'Payments, a month at a time',
      description: 'A history screen stacks one group per month, newest first. Each label names the month, and each row opens that payment.',
      body: <div className="coin-new-context"><VStack modes={{ ...LIGHT, 'Slot gap': 'XL' } as Modes} alignHorizontal="stretch">
        {G({}, 'March 2025', MARCH.map(tx => ROW(tx)))}
        {G({}, 'February 2025', FEB.map(tx => ROW(tx)))}
      </VStack></div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'One group, one list',
      description: 'Each pair shows a group that reads as one list next to one that falls apart.',
      body: <div className="coin-new-stack">
        <DoDont goodTitle="Set the style on the group" goodCaption="Every row takes Boxed from the group."
          badTitle="Change it on one row" badCaption="A row’s own modes win, so that row loses its card."
          good={G({ 'List Item Style': 'Boxed' }, 'March 2025', TWO.map(tx => ROW(tx)))}
          bad={G({ 'List Item Style': 'Boxed' }, 'March 2025', TWO.map(tx => tx.title === 'Swiggy' ? ROW(tx, { modes: M({ 'List Item Style': 'Default' }) }) : ROW(tx)))} />
        <DoDont goodTitle="Rows under every label" goodCaption="Show a group only when it has rows."
          badTitle="An empty group" badCaption="Only the label shows, with nothing under it."
          good={G({}, 'March 2025', TWO.map(tx => ROW(tx)))}
          bad={G({}, 'March 2025', null)} />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public List Group contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="28 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('listgroup')} stories={[
        { label: 'Default', id: 'components-listgroup--default' },
        { label: 'With custom items', id: 'components-listgroup--with-custom-items' },
        { label: 'Without label', id: 'components-listgroup--without-label' },
        { label: 'Reorderable', id: 'components-listgroup--reorderable' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (27 October build of Biscuit’s main) from the team’s private package repository. Figma’s listGroup is one component: a Title over a slot of List Items, 12 px apart, drawn 352 px wide with “March 2025”. The package takes <code>label</code>, with none by default, and the rows as children. List Item Style and Title Level are modes, and the group passes its modes to its rows except when they can be reordered. It drops <code>accessibilityLabel</code> and hides the label from screen readers, so nothing names the list, and its rows aren’t list items (reported).</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'listgroup', corePrinciple: 'One label, one look for every row under it.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('listgroup'),
  }} playground={<>
    <div className="preview-stage">
      <VStack modes={LIGHT} style={{ width: 360, maxWidth: '100%' }}>{G({ 'List Item Style': style, 'Title Level': level }, hasLabel ? 'March 2025' : undefined, MARCH.map(tx => ROW(tx)))}</VStack>
      <span className="stage-label">Live Coin List Group</span>
    </div>
    <div className="controls-panel">
      <Segment label="List Item Style" value={style} options={['Default', 'Boxed', 'Minimal']} onChange={setStyle} />
      <Segment label="Title Level" value={level} options={['Default', 'Bold']} onChange={setLevel} />
      <OnOff label="label" value={hasLabel} onChange={setHasLabel} />
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'listgroup',
  label: 'List Group',
  summary: 'Use a List Group to put related list rows under one label, such as a month of payments, with one style for every row.',
  keywords: ['list section', 'grouped list', 'section header', 'transaction list', 'reorder list'],
  icon: <><path d="M3 3.5h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /><rect x="2.5" y="6.5" width="13" height="3.5" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" /><rect x="2.5" y="12" width="13" height="3.5" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" /></>,
  Component: ListGroupGuide,
})
