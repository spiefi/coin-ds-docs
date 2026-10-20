import { useState, type ComponentProps } from 'react'
import { Avatar, Button, RechargeCard, Title, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, FitWidth, OnOff, Readout, Segment, Sources, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2235-937'
const LIGHT = { 'Color Mode': 'Light' } as Modes
const noop = () => {}
const W = { width: 312 }

const SUBS = <><Avatar style="Monogram" monogram="JH" /><Avatar style="Monogram" monogram="JS" /><Avatar style="Monogram" monogram="+2" /></>
const ONE = <Button label="Recharge" onPress={noop} />
const TWO = <><Button label="Recharge" onPress={noop} /><Button label="View details" onPress={noop} modes={{ Emphasis: 'Low' } as Modes} /></>
const PLAN = { title: 'Unlimited 5G', price: 349, validity: '28 days', data: '2 GB/day', disclaimer: 'Unlimited voice and 100 SMS a day.\nSpeed drops to 64 kbps after 2 GB.' }
const DATA = { title: 'Data pack', price: 19, validity: '1 day', data: '1.5 GB', disclaimer: 'Data only. No voice or SMS.', subscriptionContent: undefined }

type RCProps = Partial<ComponentProps<typeof RechargeCard>>
function RC(overrides: RCProps = {}) {
  return <RechargeCard {...PLAN} subscriptionContent={SUBS} actions={ONE} modes={LIGHT} style={W} {...overrides} />
}
const Fit = (overrides: RCProps = {}) => <FitWidth>{RC(overrides)}</FitWidth>

const R = ':scope > div'
const HEADER = `${R} > div:nth-child(1)`
const SPECS = `${R} > div:nth-child(2)`

function RechargeCardGuide() {
  const [apps, setApps] = useState(true)
  const [count, setCount] = useState<'one' | 'two'>('one')
  const [size, setSize] = useState<'S' | 'M'>('S')
  const [last, setLast] = useState('None')
  const [picked, setPicked] = useState<string | null>(null)

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A plan in four rows',
      description: 'A white panel stacks the plan’s name and price, a row of facts, the fine print, and the actions, 20 px apart. The facts row has a third column when the plan includes apps.',
      body: <Anatomy specimenWidth={312} parts={[
        { name: 'Title', note: 'title: the plan’s name, 12 px bold.', target: `${R} > div:nth-child(1) > [dir="auto"]`, side: 'top' },
        { name: 'Price', note: 'A MoneyValue from price, 36 px; the card adds the ₹.', target: `${R} > div:nth-child(1) > div:last-child`, side: 'right' },
        { name: 'Plan facts', note: 'validity and data under fixed labels, in equal columns.', target: `${R} > div:nth-child(2) > div:nth-child(1)`, side: 'left' },
        { name: 'Apps', note: 'subscriptionContent: your Avatars, overlapped at size S.', target: `${R} > div:nth-child(2) > div:nth-child(3) > div:last-child`, side: 'right' },
        { name: 'Fine print', note: 'disclaimer, 10 px; a line break in the text starts a new line.', target: `${R} > div:nth-child(3)`, side: 'left' },
        { name: 'Actions', note: 'actions: your Buttons, purple and size S.', target: `${R} > div:nth-child(4)`, side: 'bottom' },
        { name: 'Panel', note: 'A white panel, 20 px corners, 1 px border, at least 312 px wide.', target: R, side: 'right', at: 0.9 },
      ]}>{RC()}</Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Facts, apps, and actions',
      description: 'subscriptionContent adds a third column, Subscriptions, for the apps the plan includes: pass Avatars, and the card overlaps them at size S. Leave it out for two columns. actions takes your Buttons, and the card makes them purple, size S, and Emphasis High; give a second one Emphasis Low, as Figma does. The buttons always split their row into equal widths, so with two, the longer label is cut short. On the card, Button / Size M makes them bigger, and AppearanceBrand and Emphasis change all of them. The card’s own text and panel don’t change with modes.',
      body: <div className="coin-new-stack">
        <div className="coin-new-example-grid">
          <ExampleCard title="With apps" description="Three columns, with the apps the plan includes.">{Fit()}</ExampleCard>
          <ExampleCard title="No apps" description="Two columns for a plan without apps.">{Fit(DATA)}</ExampleCard>
          <ExampleCard title="Two actions" description="Equal halves: the longer label, View details, is cut short.">{Fit({ actions: TWO })}</ExampleCard>
          <ExampleCard title="Button / Size M" description="A bigger, 42 px button.">{Fit({ modes: { ...LIGHT, 'Button / Size': 'M' } as Modes })}</ExampleCard>
        </div>
        <div className="coin-new-example-grid">
          <ExampleCard title="AppearanceBrand Primary" description="A gold button.">{Fit({ modes: { ...LIGHT, AppearanceBrand: 'Primary' } as Modes })}</ExampleCard>
          <ExampleCard title="Emphasis Medium" description="A light purple button.">{Fit({ modes: { ...LIGHT, Emphasis: 'Medium' } as Modes })}</ExampleCard>
        </div>
      </div>,
    },
    states: {
      header: 'States', title: 'Its buttons act, or the whole card does',
      description: 'The card isn’t pressable: its buttons are. onPress makes the whole card one button, announced by its title, and disabled then stops it firing without changing its look. Use one or the other: a pressable card with actions puts buttons inside a button. The card has no selected or loading state.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Buttons act" description="Only Recharge presses.">{Fit()}</ExampleCard>
        <ExampleCard title="Whole card" description="The card is the button; the empty actions row still leaves space below.">{Fit({ actions: undefined, onPress: noop })}</ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'At least 312 px wide',
      description: 'The card is never narrower than 312 px, as Figma draws it, and fills a wider host. The facts share the width in equal columns, and the price stays at the left. Height follows the content: 20 px between the rows and 20 px of padding at the top and bottom, 16 px at the sides. Without actions, the empty row still adds 20 px at the bottom.',
      body: <div className="coin-new-stack">
        <Anatomy legend={false} specimenWidth={312} marks={[
          { kind: 'size', target: R, side: 'bottom', label: 'both' },
          { kind: 'padding', target: R },
          { kind: 'gap', from: HEADER, to: SPECS },
        ]}>{RC()}</Anatomy>
        <div className="coin-new-example-grid">
          <ExampleCard title="Wide host" description="The fact columns get wider; the price stays at the left.">{Fit({ style: { width: 360 } })}</ExampleCard>
          <ExampleCard title="No actions" description="An empty row still leaves 20 px under the fine print.">{Fit({ ...DATA, actions: undefined })}</ExampleCard>
        </div>
      </div>,
    },
    content: {
      header: 'Content', title: 'A name, a number, and short facts',
      description: 'Make the title the plan’s name and the price a number: the card adds the ₹. Keep validity and data to one value each, such as 28 days and 2 GB/day; the labels Validity, Data, and Subscriptions are fixed. Put the plan’s limits in the disclaimer, in a line or two of fine print. Label the main action Recharge.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Unlimited plan" description="Price, validity, data, and the apps included.">{Fit()}</ExampleCard>
        <ExampleCard title="Data pack" description="A small top-up, with its limit in the fine print.">{Fit(DATA)}</ExampleCard>
      </div>,
    },
    context: {
      header: 'In context', title: 'Plans on the Recharge screen',
      description: 'The screen lists plans one under another. Each Recharge starts the screen’s own payment through the Button’s onPress; the card only lays out the plan.',
      body: <div className="coin-new-context">
        <FitWidth>
          <VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes}>
            <Title title="Popular plans" subtitle="For 98765 43210" modes={LIGHT} />
            {RC({ actions: <Button label="Recharge" onPress={() => setPicked('Unlimited 5G, ₹349')} /> })}
            {RC({ ...DATA, actions: <Button label="Recharge" onPress={() => setPicked('Data pack, ₹19')} /> })}
          </VStack>
        </FitWidth>
        <p className="coin-new-readout" role="status">{picked ? `Paying for ${picked}` : 'No plan picked'}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'One clear action, a plain price, no empty rows',
      description: 'Each pair shows a card that reads cleanly next to one that cuts a label, doubles the ₹, or leaves a gap.',
      body: <div className="coin-new-stack">
        <DoDont good={Fit()} bad={Fit({ actions: TWO })} goodTitle="One main action" goodCaption="Recharge fits its button." badTitle="Two actions" badCaption="The row splits equally, so View details is cut short." />
        <DoDont good={Fit()} bad={Fit({ price: '₹349' })} goodTitle="Price as a number" goodCaption="price 349 shows ₹349." badTitle="₹ in the price" badCaption="The card adds its own, so it shows ₹₹349." />
        <DoDont good={Fit()} bad={Fit({ actions: undefined })} goodTitle="Pass your actions" goodCaption="The card ends at its buttons." badTitle="Leave out actions" badCaption="An empty row still leaves space under the fine print." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Recharge Card contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="20 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('rechargecard')} stories={[
        { label: 'Default', id: 'components-rechargecard--default' },
        { label: 'Without subscriptions', id: 'components-rechargecard--without-subscriptions' },
        { label: 'Button group size override', id: 'components-rechargecard--button-group-size-override' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (19 October build of Biscuit’s main) from the team’s private package repository. Figma’s Recharge Card exposes only <code>title</code> and <code>disclaimer</code> as properties; the price, facts, apps, and buttons are layers there. In the package, <code>actions</code> always split their row into equal widths, so of two different labels the longer is cut short (Biscuit’s own Storybook shows “View Det…”), while Figma’s buttons fit their labels. Without actions an empty row still adds space. The card is 271 px tall where Figma’s is 261, because its text lines are taller. The ₹ and the labels Validity, Data, and Subscriptions are fixed, a card without <code>onPress</code> isn’t announced by its title, and <code>disabled</code> has no look of its own. The published Storybook renders every story as a pressable card and still shows the older generated page (all reported).</Sources>,
    },
  }

  const press = (label: string) => () => setLast(`${label} pressed`)
  return <ComponentGuideTemplate metadata={{
    slug: 'rechargecard', corePrinciple: 'One plan, priced up front.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('rechargecard'),
  }} playground={<>
    <div className="preview-stage">
      <FitWidth>{RC({
        subscriptionContent: apps ? SUBS : undefined,
        actions: count === 'two'
          ? <><Button label="Recharge" onPress={press('Recharge')} /><Button label="View details" onPress={press('View details')} modes={{ Emphasis: 'Low' } as Modes} /></>
          : <Button label="Recharge" onPress={press('Recharge')} />,
        modes: { ...LIGHT, 'Button / Size': size } as Modes,
      })}</FitWidth>
      <span className="stage-label">Live Coin Recharge Card</span>
    </div>
    <div className="controls-panel">
      <OnOff label="subscriptionContent" value={apps} onChange={setApps} />
      <Segment label="actions" value={count} options={['one', 'two'] as const} onChange={setCount} />
      <Segment label="Button / Size" value={size} options={['S', 'M'] as const} onChange={setSize} />
      <Readout title="Last press" value={last}>The card itself isn’t pressable: only its buttons act.</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'rechargecard',
  label: 'Recharge Card',
  summary: 'Use a Recharge Card to show one prepaid plan: its price, validity, data, the apps it includes, and the action to buy it.',
  keywords: ['plan card', 'prepaid plan', 'recharge plan', 'mobile plan', 'data pack'],
  icon: <><rect x="2.5" y="2.5" width="13" height="13" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M5.5 6h4M5.5 9.5h7M5.5 12.5h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /></>,
  Component: RechargeCardGuide,
})
