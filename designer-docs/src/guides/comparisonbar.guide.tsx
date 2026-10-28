import { useState } from 'react'
import { Avatar, Button, ComparisonBar, ListGroup, ListItem, VStack, type ComparisonBarItem, type ComparisonBarProps, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, FitWidth, OnOff, Readout, Segment, Sources, docsUrl } from '../guide-kit'
import { defineGuide } from './define'
import COIN from '../assets/gold-coin.png'
import JIO from '../assets/jio-gold-logo.png'
import PHOTO from '../assets/bank-hero.png'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=5350-360'
const M = (m: Record<string, string> = {}) => ({ 'Color Mode': 'Light', ...m }) as Modes
const LIGHT = M()

const ONE: ComparisonBarItem[] = [{ id: 'a', imageSource: COIN }, { id: 'b' }, { id: 'c' }, { id: 'd' }]
const EMPTY: ComparisonBarItem[] = [{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' }]
const FULL: ComparisonBarItem[] = [{ id: 'a', imageSource: COIN }, { id: 'b', imageSource: JIO }, { id: 'c', imageSource: COIN }, { id: 'd', imageSource: JIO }]
const PAIR: ComparisonBarItem[] = [{ id: 'a', imageSource: COIN }, { id: 'b' }]
const PHOTOS: ComparisonBarItem[] = [{ id: 'a', imageSource: PHOTO }, { id: 'b', imageSource: PHOTO }, { id: 'c' }, { id: 'd' }]
const FIVE: ComparisonBarItem[] = [...ONE, { id: 'e' }]

const R = ':scope > div'
const F = `${R} > [aria-label="Remove item from comparison"]`
const E = `${R} > [aria-label="Add item to comparison"]`
const COMPARE = `${R} > :last-child`
const slot = (n: number) => `${R} > :nth-child(${n})`

function CB(items: ComparisonBarItem[], props: Partial<ComparisonBarProps> = {}) {
  return <FitWidth><ComparisonBar modes={LIGHT} items={items} {...props} /></FitWidth>
}

const COINS = [
  { id: '1g', title: '1 g gold coin', support: '₹7,850 · 24K', weight: '1 g' },
  { id: '2g', title: '2 g gold coin', support: '₹15,640 · 24K', weight: '2 g' },
  { id: '5g', title: '5 g gold coin', support: '₹38,900 · 24K', weight: '5 g' },
  { id: '10g', title: '10 g gold coin', support: '₹77,500 · 24K', weight: '10 g' },
]

function joinAnd(list: string[]) {
  return list.length < 2 ? list.join('') : `${list.slice(0, -1).join(', ')} and ${list[list.length - 1]}`
}

function GoldCoinsContext() {
  const [picked, setPicked] = useState<string[]>([])
  const [status, setStatus] = useState('Add coins to compare')
  const change = (next: string[]) => {
    setPicked(next)
    setStatus(`${next.length} ${next.length === 1 ? 'coin' : 'coins'} picked`)
  }
  const add = (id: string) => { if (!picked.includes(id) && picked.length < 4) change([...picked, id]) }
  const remove = (id: string) => change(picked.filter(p => p !== id))
  const toggle = (id: string) => (picked.includes(id) ? remove(id) : add(id))
  const addNext = () => { const next = COINS.find(c => !picked.includes(c.id)); if (next) add(next.id) }
  const compare = () => setStatus(`Comparing ${joinAnd(picked.map(id => COINS.find(c => c.id === id)!.weight))} gold coins`)
  const slots: ComparisonBarItem[] = [
    ...picked.map(id => ({ id, imageSource: COIN, accessibilityLabel: `Remove ${COINS.find(c => c.id === id)!.title}` })),
    ...Array.from({ length: 4 - picked.length }, (_, n) => ({ id: `empty-${n}` })),
  ]
  return <div className="coin-new-context">
    <VStack modes={{ ...LIGHT, 'Slot gap': 'L' } as Modes} alignHorizontal="stretch">
      <ListGroup modes={LIGHT} label="Gold coins">
        {COINS.map(c => {
          const added = picked.includes(c.id)
          return <ListItem key={c.id} layout="Horizontal" navArrow={false} title={c.title} supportText={c.support} leading={<Avatar imageSource={COIN} />}
            trailing={<Button label={added ? 'Added' : 'Add'} modes={M({ 'Button / Size': 'S', Emphasis: added ? 'Low' : 'Medium' })} onPress={() => toggle(c.id)} />} />
        })}
      </ListGroup>
      <FitWidth><ComparisonBar modes={LIGHT} items={slots} onItemPress={addNext} onItemRemove={id => remove(String(id))} onCompare={compare} /></FitWidth>
      <p className="coin-new-readout" role="status">{status}</p>
    </VStack>
  </div>
}

function ComparisonBarGuide() {
  const [items, setItems] = useState<ComparisonBarItem[]>(ONE)
  const [size, setSize] = useState<'M' | 'S'>('M')
  const [autoOff, setAutoOff] = useState(true)
  const setSlot = (i: number, imageSource?: string) => setItems(prev => prev.map((it, n) => (n === i ? { id: it.id, ...(imageSource ? { imageSource } : {}) } : it)))
  const count = items.filter(i => i.imageSource).length
  const readout = count ? `On: ${count} of ${items.length} added` : autoOff ? 'Off: nothing added yet' : 'On: nothing added yet'

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'Slots, then the button',
      description: 'A white card holds a row of slots and a Compare button. A filled slot shows its picture; an empty one shows a + for adding the next item.',
      body: <Anatomy marks={[{ kind: 'gap', from: slot(1), to: slot(2) }]} parts={[
        { name: 'Card', note: 'A white card as wide as its slots and button.', target: R, side: 'left' },
        { name: 'Filled slot', note: 'A picture; pressing anywhere on the slot removes it.', target: `${F} > div:first-child`, side: 'bottom' },
        { name: 'Remove mark', note: 'Shows the slot removes; it isn’t a separate button.', target: `${F} > div:last-child`, side: 'top' },
        { name: 'Empty slot', note: 'A + that asks your screen to add an item.', target: E, side: 'bottom' },
        { name: 'Compare', note: 'A Coin Button that stays off until a slot has a picture.', target: COMPARE, side: 'right' },
      ]}><ComparisonBar modes={LIGHT} items={ONE} /></Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Slots and the button',
      description: 'Pass one item per slot: an item with an imageSource is filled, and one without is empty. compareLabel names the button, which is Coin’s Button at size M; Button / Size S gives the smaller button Figma draws. Radius rounds the pictures’ corners, which shows on square photos.',
      body: <div className="coin-new-stack">
        <div className="coin-new-example-grid">
          <ExampleCard title="Four slots" description="Figma’s layout: one picture and three to add.">{CB(ONE)}</ExampleCard>
          <ExampleCard title="Two slots" description="Fewer slots make a shorter bar.">{CB(PAIR)}</ExampleCard>
          <ExampleCard title="Button / Size S" description="A 32 px button, as in Figma.">{CB(ONE, { modes: M({ 'Button / Size': 'S' }) })}</ExampleCard>
          <ExampleCard title="compareLabel" description="The button widens with its label.">{CB(FULL, { compareLabel: 'Compare 4' })}</ExampleCard>
        </div>
        <div className="coin-new-example-grid">
          <ExampleCard title="Radius None" description="Square corners.">{CB(PHOTOS, { modes: M({ Radius: 'None' }) })}</ExampleCard>
          <ExampleCard title="Radius L" description="Fully rounded corners.">{CB(PHOTOS, { modes: M({ Radius: 'L' }) })}</ExampleCard>
        </div>
      </div>,
    },
    states: {
      header: 'States', title: 'Empty, filled, and off',
      description: 'Each slot is a button. Pressing an empty one asks your screen to add an item (onItemPress), and pressing a filled one asks it to remove that item (onItemRemove). The bar keeps no list of its own, so your screen changes items. Compare stays dimmed and can’t be pressed until a slot has a picture; one is enough.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Nothing added" description="Compare is dimmed and can’t be pressed.">{CB(EMPTY)}</ExampleCard>
        <ExampleCard title="One added" description="One picture turns Compare on.">{CB(ONE)}</ExampleCard>
        <ExampleCard title="All added" description="Every slot shows a picture and a remove mark.">{CB(FULL)}</ExampleCard>
        <ExampleCard title="Two needed" description="compareDisabled keeps it off, say until two are added.">{CB(ONE, { compareDisabled: true })}</ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'As wide as its slots',
      description: 'The bar hugs its content: 10 and 12 px of padding, 45 × 44 px slots 12 px apart, then the button. Four slots and the default button make it 369 × 66 px; Figma draws 344 × 64 with the smaller button. Each slot adds 57 px, and the bar never wraps or scrolls.',
      body: <Anatomy legend={false} marks={[{ kind: 'size', target: R, side: 'bottom', label: 'both' }, { kind: 'padding', target: R }, { kind: 'gap', from: slot(1), to: slot(2) }]}><ComparisonBar modes={LIGHT} items={ONE} /></Anatomy>,
    },
    content: {
      header: 'Content', title: 'Pictures people recognise, a short verb',
      description: 'Use each item’s own picture, so people can tell at a glance what they picked. Keep compareLabel to a short verb such as Compare: a long label makes the bar wider than a phone. Give each item an accessibilityLabel with its name, or every slot is read out the same.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="A short verb" description="“Compare” keeps the bar 369 px wide.">{CB(FULL)}</ExampleCard>
        <ExampleCard title="A sentence" description="The bar grows past a 390 px phone.">{CB(FULL, { compareLabel: 'Compare these 4 coins' })}</ExampleCard>
      </div>,
    },
    context: {
      header: 'In context', title: 'Comparing gold coins',
      description: 'People add coins from the list, and the bar fills from the left. Tapping a picture in the bar takes that coin out. Compare turns on with the first coin; your screen opens the comparison.',
      body: <GoldCoinsContext />,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Keep every slot usable',
      description: 'Each pair shows a bar people can use next to one that hides its own controls.',
      body: <div className="coin-new-stack">
        <DoDont good={CB(ONE)} bad={CB(ONE, { modes: M({ AppearanceBrand: 'Secondary' }) })}
          goodTitle="Leave the colour modes alone" goodCaption="The + stays dark on the grey slots."
          badTitle="Set a brand colour on the bar" badCaption="AppearanceBrand Secondary turns the + white, so the empty slots look blank." />
        <DoDont good={CB(ONE)} bad={CB(FIVE)}
          goodTitle="Four slots or fewer" goodCaption="The bar fits a phone screen."
          badTitle="Five or more slots" badCaption="The bar doesn’t wrap or scroll, so it’s wider than a 390 px phone." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Comparison Bar contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="28 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('comparisonbar')} stories={[
        { label: 'Default', id: 'components-comparisonbar--default' },
        { label: 'All empty', id: 'components-comparisonbar--all-empty' },
        { label: 'All filled', id: 'components-comparisonbar--all-filled' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (27 October build of Biscuit’s main) from the team’s private package repository. Figma’s Comparison Bar is one component, 344 × 64: four slots, the first filled, and a small pale purple Compare button. The package takes <code>items</code> and draws Coin’s Button at size M in gold, so the bar is 369 × 66; <code>Button / Size</code> S gives Figma’s button size. Its empty-slot + is 18 px where Figma’s is 29, its pictures are 28 px tall where Figma’s are 20, and brand modes on the bar turn the + white (reported).</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'comparisonbar',
    corePrinciple: 'Show what’s picked; compare when there’s something to show.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('comparisonbar'),
  }} playground={<>
    <div className="preview-stage">
      {CB(items, {
        modes: M({ 'Button / Size': size }), disableCompareWhenEmpty: autoOff,
        onItemPress: (_, i) => setSlot(i, i % 2 ? JIO : COIN),
        onItemRemove: (_, i) => setSlot(i),
      })}
      <span className="stage-label">Live Coin Comparison Bar</span>
    </div>
    <div className="controls-panel">
      <Segment label="Button / Size" value={size} options={['M', 'S'] as const} onChange={setSize} />
      <OnOff label="disableCompareWhenEmpty" value={autoOff} onChange={setAutoOff} />
      <Readout title="Compare" value={readout}>Tap an empty slot to add a coin, and a picture to remove it.</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'comparisonbar',
  label: 'Comparison Bar',
  summary: 'Use a Comparison Bar to collect the items people pick to compare, as pictures in slots, and let them start the comparison.',
  keywords: ['compare tray', 'compare drawer', 'add to compare', 'product comparison'],
  icon: <><rect x="1.5" y="5" width="15" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M4.5 8v2M7.5 8v2M11 9h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /></>,
  Component: ComparisonBarGuide,
})
