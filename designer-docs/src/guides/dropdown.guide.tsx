import { useState } from 'react'
import { Card, Dropdown, DropdownItem, HStack, Icon, IconButton, Text, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, Sources, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3087-4266'
const LIGHT = { 'Color Mode': 'Light' } as Modes
const ACCOUNTS = ['Savings account', 'Checking account', 'Brokerage account', 'Recurring deposit']
const OPTIONS = Array.from({ length: 12 }, (_, i) => `Option ${i + 1}`)
const ACTIONS = ['Download statement', 'Share statement', 'Report a problem']
const MENU = '[role="menu"]'
const item = (n: number) => `${MENU} [role="menuitem"]:nth-child(${n})`

function List({ labels, selected = [], disabled = [], icons = false, maxHeight, width = 240, label = 'Accounts', onPress }: {
  labels: string[]; selected?: string[]; disabled?: string[]; icons?: boolean; maxHeight?: number; width?: number; label?: string; onPress?: (label: string) => void
}) {
  return <Dropdown accessibilityLabel={label} modes={LIGHT} maxHeight={maxHeight} style={{ width }}>
    {labels.map(l => <DropdownItem key={l} label={l} modes={LIGHT} selected={selected.includes(l)} disabled={disabled.includes(l)}
      leading={icons ? <Icon iconName="ic_wallet" size={18} modes={LIGHT} /> : undefined} onPress={onPress ? () => onPress(l) : undefined} />)}
  </Dropdown>
}

function DropdownGuide() {
  const [selected, setSelected] = useState('None')
  const [icons, setIcons] = useState(false)
  const [disableOne, setDisableOne] = useState(false)
  const [maxH, setMaxH] = useState(false)
  const [last, setLast] = useState('None yet')
  const [open, setOpen] = useState(false)
  const [menuStatus, setMenuStatus] = useState('Menu closed')

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A panel of items',
      description: 'A rounded, shadowed panel holds Dropdown Items. The selected item gets a grey fill and a check.',
      body: <Anatomy parts={[
        { name: 'Panel', note: 'Rounded surface with a soft shadow that floats over content.', target: MENU, side: 'left' },
        { name: 'Selected item', note: 'Grey fill and a check mark the current choice.', target: item(1), side: 'top' },
        { name: 'Check', note: 'Appears on the selected item unless it has its own trailing content.', target: `${item(1)} svg`, side: 'right' },
        { name: 'Item', note: 'One choice or action in one line.', target: item(3), side: 'bottom' },
      ]} marks={[{ kind: 'padding', target: item(2) }]}>
        <List labels={ACCOUNTS.slice(0, 3)} selected={['Savings account']} />
      </Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Labels, icons, and length',
      description: 'Items take a label and an optional leading icon. Set a maximum height when the list is long so the panel scrolls instead of growing.',
      body: <div className="coin-new-example-grid three">
        <ExampleCard title="Labels only" description="The simplest list, for choices people know by name."><List labels={ACCOUNTS} /></ExampleCard>
        <ExampleCard title="With leading icons" description="Icons help people scan similar items."><List labels={ACCOUNTS} icons /></ExampleCard>
        <ExampleCard title="Scrolling list" description="The panel stays the same height and the list scrolls."><List labels={OPTIONS} label="Options" maxHeight={180} /></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Selected, disabled, and pressed',
      description: 'Mark the current choice as selected and dim options that are temporarily unavailable. Hover and press use the same grey as selected.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Selected" description="Grey fill plus a check."><List labels={ACCOUNTS} selected={['Checking account']} /></ExampleCard>
        <ExampleCard title="Disabled item" description="The unavailable item is dimmed and cannot be pressed or focused."><List labels={['Available option', 'Coming soon']} label="Options" disabled={['Coming soon']} /></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'The screen sets the width',
      description: 'Items are 43 px tall and fill the panel’s width. Labels stay on one line and end in an ellipsis when they run out of room.',
      body: <div className="coin-new-stack">
        <Anatomy legend={false} marks={[{ kind: 'size', target: MENU, side: 'top', label: 'both' }, { kind: 'size', target: item(1), side: 'right', label: 'both' }]}>
          <List labels={ACCOUNTS.slice(0, 3)} />
        </Anatomy>
        <ExampleCard title="A long label" description="The label is cut to one line."><List labels={['Savings account', 'Savings account for household and family expenses']} /></ExampleCard>
      </div>,
    },
    content: {
      header: 'Content', title: 'Start each label with the key word',
      description: 'Put the word that tells items apart first, keep labels to a few words, and use the same form for every item.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Actions"><List labels={ACTIONS} label="Statement actions" /></ExampleCard>
        <ExampleCard title="Choices"><List labels={ACCOUNTS} selected={['Savings account']} /></ExampleCard>
      </div>,
    },
    context: {
      header: 'In context', title: 'A menu from an overflow button',
      description: 'The screen opens the Dropdown when the More button is pressed, places it under the button, and closes it after a choice. Dropdown only draws the panel.',
      body: <div className="coin-new-context">
        <Card modes={LIGHT}>
          <HStack alignVertical="center" justifyHorizontal="space-between" modes={LIGHT}>
            <Text>September statement</Text>
            <IconButton iconName="ic_more_vertical" accessibilityLabel="More actions" modes={{ 'Color Mode': 'Light', Emphasis: 'Low' } as Modes}
              onPress={() => { setOpen(o => !o); setMenuStatus(open ? 'Menu closed' : 'Menu open') }} />
          </HStack>
          {open && <List labels={ACTIONS} label="Statement actions" width={220} onPress={l => { setOpen(false); setMenuStatus(l) }} />}
        </Card>
        <p className="coin-new-readout" role="status">{menuStatus}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Keep lists short and honest',
      description: 'Each pair shows a list people can scan versus one that slows them down.',
      body: <div className="coin-new-stack">
        <DoDont good={<List labels={ACCOUNTS} selected={['Savings account']} />} bad={<List labels={ACCOUNTS} selected={['Savings account', 'Brokerage account']} />}
          goodTitle="Mark the one current choice" badTitle="Mark several choices in a single-choice list" goodCaption="One check shows what is chosen." badCaption="Two checks make the current choice unclear." />
        <DoDont good={<List labels={['Savings account', 'Checking account', 'Recurring deposit']} />} bad={<List labels={['Savings account for household expenses', 'Savings account for holiday travel', 'Savings account for emergencies']} />}
          goodTitle="Keep labels short" badTitle="Write long labels" goodCaption="Every label reads in full." badCaption="Long labels are cut off, hiding what tells them apart." />
        <DoDont good={<List labels={OPTIONS} label="Options" maxHeight={180} />} bad={<List labels={OPTIONS} label="Options" />}
          goodTitle="Scroll a long list" badTitle="Let a long list grow" goodCaption="A max height keeps the panel compact." badCaption="Twelve items push the panel far past the screen." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Dropdown contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="28 September 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('dropdown')} stories={[
        { label: 'Default', id: 'components-dropdown--default' }, { label: 'With icons', id: 'components-dropdown--with-icons' },
        { label: 'With disabled item', id: 'components-dropdown--with-disabled-item' }, { label: 'Scrollable', id: 'components-dropdown--scrollable' },
      ]}>Declared, installed, and registry <code>jfs-components</code> versions are <code>0.1.60</code>. Dropdown draws the panel and its items; opening, closing, and placing it are handled by the screen, or by Dropdown Input for form fields. On the web the panel is a menu of menu items, the selected item is shown only visually (it is not announced as selected), and arrow keys do not move between items; Tab and Enter do.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'dropdown', name: 'Dropdown',
    summary: 'Use a Dropdown as the floating panel for a short list of choices or actions that opens from a button or field.',
    corePrinciple: 'A short, scannable list; the screen decides when it opens and where it sits.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('dropdown'),
  }} playground={<>
    <div className="preview-stage">
      <List labels={ACCOUNTS} selected={[selected]} icons={icons} disabled={disableOne ? ['Recurring deposit'] : []} maxHeight={maxH ? 120 : undefined} onPress={l => { setLast(l); setSelected(l) }} />
      <span className="stage-label">Live Coin Dropdown</span>
    </div>
    <div className="controls-panel">
      <OnOff label="Leading icons" value={icons} onChange={setIcons} />
      <OnOff label="Disable one" value={disableOne} onChange={setDisableOne} />
      <OnOff label="Max height" value={maxH} onChange={setMaxH} />
      <Readout title="Last choice" value={last} />
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'dropdown',
  label: 'Dropdown',
  icon: <><rect x="3" y="3" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M6 7h6M6 9.5h6M6 12h6" stroke="currentColor" strokeWidth="1.5" /></>,
  Component: DropdownGuide,
})
