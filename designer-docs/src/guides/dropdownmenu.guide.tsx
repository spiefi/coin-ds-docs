import { useState } from 'react'
import { Card, DropdownMenu, HStack, Icon, IconButton, Text, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, Sources, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=9473-2192'
const LIGHT = { 'Color Mode': 'Light' } as Modes
const ACTIONS: [string, string][] = [
  ['Download statement', 'ic_download'], ['Share statement', 'ic_share'], ['Edit details', 'ic_edit'], ['Report a problem', 'ic_info'],
]
const TEN = Array.from({ length: 10 }, (_, i) => `Action ${i + 1}`)
const MENU = '[role="menu"]'
const item = (n: number) => `${MENU} [role="menuitem"]:nth-child(${n})`

type Row = { label: string; icon?: string }

function Menu({ rows, label = 'Statement actions', leading = 'icon', chevrons = false, selected = [], disabled = [], maxHeight, onPress }: {
  rows: Row[]; label?: string; leading?: 'icon' | 'avatar' | 'none'; chevrons?: boolean; selected?: string[]; disabled?: string[]; maxHeight?: number; onPress?: (label: string) => void
}) {
  return <DropdownMenu accessibilityLabel={label} modes={LIGHT} maxHeight={maxHeight} style={{ width: 256 }}>
    {rows.map(r => <DropdownMenu.Item key={r.label} label={r.label} modes={LIGHT}
      leading={leading === 'icon' && r.icon ? <Icon iconName={r.icon} modes={LIGHT} /> : undefined}
      showLeading={leading !== 'none'} showTrailing={chevrons}
      selected={selected.includes(r.label)} disabled={disabled.includes(r.label)}
      onPress={onPress ? () => onPress(r.label) : undefined} />)}
  </DropdownMenu>
}

const actionRows: Row[] = ACTIONS.map(([label, icon]) => ({ label, icon }))
const plain = (labels: string[]): Row[] => labels.map(label => ({ label }))
const ALL = ACTIONS.map(([l]) => l)

function DropdownMenuGuide() {
  const [icons, setIcons] = useState(true)
  const [chevrons, setChevrons] = useState(false)
  const [disableOne, setDisableOne] = useState(false)
  const [last, setLast] = useState('None yet')
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState('Menu closed')

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A panel of action rows',
      description: 'Each row can show a leading visual, a label, and a trailing chevron. The selected row turns lilac.',
      body: <Anatomy parts={[
        { name: 'Panel', note: 'Rounded surface with a soft shadow.', target: MENU, side: 'left' },
        { name: 'Leading visual', note: 'Avatar or icon that identifies the row.', target: `${item(1)} [role="img"]`, side: 'top' },
        { name: 'Label', note: 'Names the action in a few words.', target: `${item(3)} [dir="auto"]`, side: 'bottom' },
        { name: 'Chevron', note: 'Shows the row leads somewhere further.', target: `${item(1)} > div:last-child`, side: 'right' },
        { name: 'Selected row', note: 'Lilac fill marks the current row.', target: item(2), side: 'right' },
      ]} marks={[{ kind: 'padding', target: item(3) }]}>
        <Menu rows={plain(['Profile', 'Settings', 'Help'])} label="Account menu" leading="avatar" chevrons selected={['Settings']} />
      </Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Choose what each row shows',
      description: 'Avatars suit people and accounts, icons suit actions, and plain labels suit short lists. Add a chevron only when a row opens another screen or menu.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="People and accounts" description="The Figma default, for switching between people or accounts."><Menu rows={plain(['Marcin Śpiewak', 'Joint account'])} label="Accounts" leading="avatar" chevrons /></ExampleCard>
        <ExampleCard title="Actions with icons" description="Icons help people spot an action quickly."><Menu rows={actionRows} /></ExampleCard>
        <ExampleCard title="Labels only" description="The lightest menu, for two or three actions."><Menu rows={plain(['Download statement', 'Share statement', 'Report a problem'])} leading="none" /></ExampleCard>
        <ExampleCard title="Scrolling menu" description="A long menu scrolls inside the panel."><Menu rows={plain(TEN)} label="Actions" leading="none" maxHeight={180} /></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Selected and disabled',
      description: 'The screen marks the current row as selected. Disable an action that is temporarily unavailable rather than removing it. Hover uses the same lilac as selected.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Selected" description="A lilac fill marks the current row."><Menu rows={actionRows} selected={['Share statement']} /></ExampleCard>
        <ExampleCard title="Disabled" description="Dimmed, skipped by keyboard focus, and not pressable."><Menu rows={actionRows} disabled={['Report a problem']} /></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'Rows are 45 px tall',
      description: 'The screen sets the menu’s width; rows fill it and labels stay on one line, ending in an ellipsis when they run out of room.',
      body: <Anatomy legend={false} marks={[{ kind: 'size', target: MENU, side: 'top', label: 'both' }, { kind: 'size', target: item(1), side: 'right', label: 'both' }]}>
        <Menu rows={plain(['Download statement', 'Share statement', 'Report a problem'])} leading="none" />
      </Anatomy>,
    },
    content: {
      header: 'Content', title: 'Start with the verb',
      description: 'Write actions in sentence case, starting with a verb such as “Download” or a clear noun such as “Settings”. Keep them short and skip end punctuation.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Actions"><Menu rows={actionRows} /></ExampleCard>
        <ExampleCard title="Places"><Menu rows={plain(['Profile', 'Settings', 'Help'])} label="Account menu" leading="none" chevrons /></ExampleCard>
      </div>,
    },
    context: {
      header: 'In context', title: 'An overflow menu on a card',
      description: 'The screen opens the menu from the More button, places it under the button, and closes it after an action. Dropdown Menu only draws the panel.',
      body: <div className="coin-new-context">
        <Card modes={LIGHT}>
          <HStack alignVertical="center" justifyHorizontal="space-between" modes={LIGHT}>
            <Text>September statement</Text>
            <IconButton iconName="ic_more_vertical" accessibilityLabel="More actions" modes={{ 'Color Mode': 'Light', Emphasis: 'Low' } as Modes}
              onPress={() => { const next = !open; setOpen(next); setStatus(next ? 'Menu open' : 'Menu closed') }} />
          </HStack>
          {open && <Menu rows={actionRows} onPress={l => { setOpen(false); setStatus(l) }} />}
        </Card>
        <p className="coin-new-readout" role="status">{status}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Keep menus for actions',
      description: 'Each pair shows a menu people can act on quickly versus one that confuses them.',
      body: <div className="coin-new-stack">
        <DoDont good={<Menu rows={actionRows} selected={['Share statement']} />} bad={<Menu rows={actionRows} selected={ALL} />}
          goodTitle="Highlight only the current row" goodCaption="One lilac row shows where people are." badTitle="Mark every row selected" badCaption="When every row is lilac, the highlight means nothing." />
        <DoDont good={<Menu rows={actionRows} />} bad={<Menu rows={plain(['Savings account', 'Checking account', 'Recurring deposit'])} label="Accounts" leading="none" />}
          goodTitle="Use it for actions" goodCaption="Each row does something." badTitle="Use it to pick a form value" badCaption="Account names in a menu have no label, value, or error to go with them." />
        <DoDont good={<Menu rows={plain(TEN)} label="Actions" leading="none" maxHeight={180} />} bad={<Menu rows={plain(TEN)} label="Actions" leading="none" />}
          goodTitle="Scroll a long menu" goodCaption="A max height keeps the panel within the screen." badTitle="Let a long menu grow" badCaption="Ten rows push the panel far down the screen." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Dropdown Menu contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="8 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('dropdownmenu')} stories={[
        { label: 'Default', id: 'components-dropdownmenu--default' }, { label: 'Without leading', id: 'components-dropdownmenu--without-leading' },
        { label: 'Without trailing', id: 'components-dropdownmenu--without-trailing' }, { label: 'Custom slots', id: 'components-dropdownmenu--custom-slots' },
        { label: 'Disabled item', id: 'components-dropdownmenu--with-disabled-item' }, { label: 'Scrollable', id: 'components-dropdownmenu--scrollable' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (5 October build) from the team’s private package repository. That build exports Dropdown Menu and its items. Dropdown Menu draws the panel and rows; opening, placing, and closing it, and which row is selected, belong to the screen. The default leading Avatar is a sample photo, so replace it with a real avatar or an icon. On the web the selected row is shown only visually and arrow keys do not move between rows. Figma’s Menu Item master cited by the package is no longer in the file.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'dropdownmenu', name: 'Dropdown Menu',
    corePrinciple: 'Actions, not answers. For choosing a form value, use Dropdown Input.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('dropdownmenu'),
  }} playground={<>
    <div className="preview-stage">
      <Menu rows={actionRows} leading={icons ? 'icon' : 'none'} chevrons={chevrons} selected={last === 'None yet' ? [] : [last]}
        disabled={disableOne ? ['Report a problem'] : []} onPress={setLast} />
      <span className="stage-label">Live Coin Dropdown Menu</span>
    </div>
    <div className="controls-panel">
      <OnOff label="Icons" value={icons} onChange={setIcons} />
      <OnOff label="Chevrons" value={chevrons} onChange={setChevrons} />
      <OnOff label="Disable one" value={disableOne} onChange={setDisableOne} />
      <Readout title="Last action" value={last} />
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'dropdownmenu',
  label: 'Dropdown Menu',
  summary: 'Use a Dropdown Menu for a short list of actions that opens from a button, such as an overflow or account menu.',
  keywords: ['overflow menu', 'kebab menu', 'more menu', 'context menu', 'actions menu'],
  icon: <><rect x="3" y="3" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M6 7h4M6 9.5h4M6 12h4M11.5 8.5l1 1-1 1" stroke="currentColor" strokeWidth="1.5" fill="none" /></>,
  Component: DropdownMenuGuide,
})
