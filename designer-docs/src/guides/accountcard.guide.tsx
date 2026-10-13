import { useState, type ComponentProps, type ReactNode } from 'react'
import { AccountCard, HStack, Title, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, ScreenFrame, Segment, Sources, Specimen, SpecimenRow, docsUrl } from '../guide-kit'
import { defineGuide } from './define'
import bankHero from '../assets/bank-hero.png'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4271-3515'
const LIGHT = { 'Color Mode': 'Light' } as Modes
const noop = () => {}

type ACProps = ComponentProps<typeof AccountCard>
const JOINT = { state: 'connected', title: 'Joint account', subtitle: '**** 4821', imageSource: bankHero } as ACProps
const ADD = { state: 'add', title: 'Add account' } as ACProps

const CONNECTED = '[aria-label="Joint account"]'
const ART = `${CONNECTED} > div:first-child`
const TEXT = `${CONNECTED} > div:last-child`
const TITLE = `${TEXT} > [dir="auto"]:first-child`
const SUBTITLE = `${TEXT} > [dir="auto"]:last-child`
const ADD_ROOT = '[aria-label="Add account"]'
const ADD_FIELD = `${ADD_ROOT} > div:first-child`

const AC = (props: ACProps) => <AccountCard modes={LIGHT} {...props} />
// The card fills its host; Storybook gives each one a 125 px column.
const Tile = ({ children }: { children: ReactNode }) => (
  <VStack modes={LIGHT} style={{ width: 125, padding: 0 }}>{children}</VStack>
)

const PAIR = (
  <SpecimenRow>
    <Specimen caption="Connected"><Tile>{AC(JOINT)}</Tile></Specimen>
    <Specimen caption="Add"><Tile>{AC(ADD)}</Tile></Specimen>
  </SpecimenRow>
)

function AccountCardGuide() {
  const [state, setState] = useState<'Connected' | 'Add'>('Connected')
  const [pressable, setPressable] = useState(true)
  const [disabled, setDisabled] = useState(false)
  const [action, setAction] = useState('None')
  const [status, setStatus] = useState('Nothing opened yet')
  const live = state === 'Connected' ? JOINT : ADD

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'Art, a name, and a masked number',
      description: 'A connected tile shows the account\'s art above its name and masked number. The add tile swaps the art for a lavender field with a plus and drops the number.',
      body: <Anatomy parts={[
        { name: 'Card art', note: 'imageSource, cropped to a 125 : 82 box; cardSlot can replace it.', target: ART, side: 'top' },
        { name: 'Title', note: 'The account name, bold, on one line.', target: TITLE, side: 'left' },
        { name: 'Subtitle', note: 'The masked number; connected tiles only.', target: SUBTITLE, side: 'bottom', at: 0.1 },
        { name: 'Add field', note: 'A lavender field with a plus: the tile that links another account.', target: ADD_FIELD, side: 'right' },
      ]}>{PAIR}</Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Connected or add',
      description: 'state picks the tile: connected shows art, a name, and a masked number; add shows a lavender field with a plus and a title, with no number. imageRatio sets the art\'s shape, 125 : 82 by default, and cardSlot can replace the art or the field with your own content. Modes only recolour the add tile\'s plus.',
      body: <div className="coin-new-example-grid three">
        <ExampleCard title="Connected" description="Art, a name, and a masked number."><Tile>{AC(JOINT)}</Tile></ExampleCard>
        <ExampleCard title="Add" description="A field with a plus, then the action."><Tile>{AC(ADD)}</Tile></ExampleCard>
        <ExampleCard title="Square art" description="imageRatio 1 makes the art square."><Tile>{AC({ ...JOINT, imageRatio: 1 })}</Tile></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'A preview or a button',
      description: 'Without onPress the tile is a preview, named by its title. onPress makes the whole tile one button that fades to 70% while pressed. disabled dims it to half and, on a pressable tile, stops presses. It has no selected state.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Pressable" description="The whole tile is one button."><Tile>{AC({ ...JOINT, onPress: noop })}</Tile></ExampleCard>
        <ExampleCard title="Disabled" description="Dimmed to half; it doesn't press."><Tile>{AC({ ...JOINT, onPress: noop, disabled: true })}</Tile></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'As wide as where you put it',
      description: 'It fills its host\'s width, so set the width where you place it: Figma\'s tiles are 125 px, as in Storybook and the Card Accounts carousel. The art keeps its ratio, with 8 px to the text, so at 125 px a connected tile is 122 px tall and an add tile 106.',
      body: <Anatomy legend={false} marks={[
        { kind: 'size', target: CONNECTED, side: 'bottom', label: 'both' },
        { kind: 'size', target: ADD_ROOT, side: 'bottom', label: 'both' },
        { kind: 'gap', from: ART, to: TEXT },
      ]}>{PAIR}</Anatomy>,
    },
    content: {
      header: 'Content', title: 'A name and a mask',
      description: 'Title each tile with the account\'s name in a few words, such as “Joint account”: it\'s cut to one line. Show only the masked number, in the bank\'s own format. Title the add tile with its action, “Add account”, because its title is also what screen readers announce.',
      body: <ExampleCard title="One account, then the action" description="“Joint account” with “**** 4821”, then “Add account”.">
        <HStack modes={{ ...LIGHT, 'Slot gap': 'S' } as Modes}>
          <Tile>{AC(JOINT)}</Tile>
          <Tile>{AC(ADD)}</Tile>
        </HStack>
      </ExampleCard>,
    },
    context: {
      header: 'In context', title: 'Linked accounts',
      description: 'The Accounts screen shows each linked account as a tile, with the add tile last. Each tile\'s onPress is the screen\'s own action: open the account, or start linking a new one. For more tiles than fit, CarouselCardAccounts scrolls them.',
      body: <div className="coin-new-context">
        <ScreenFrame>
          <VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes}>
            <Title title="Accounts" subtitle="Linked to JioFinance" modes={LIGHT} />
            <HStack modes={{ ...LIGHT, 'Slot gap': 'S' } as Modes}>
              <Tile>{AC({ ...JOINT, onPress: () => setStatus('Opening Joint account') })}</Tile>
              <Tile>{AC({ ...ADD, onPress: () => setStatus('Starting to link an account') })}</Tile>
            </HStack>
          </VStack>
        </ScreenFrame>
        <p className="coin-new-readout" role="status">{status}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'A tile people can trust',
      description: 'Each pair shows a tile that says what it is next to one that exposes too much, says the wrong thing, or hides its plus.',
      body: <div className="coin-new-stack">
        <DoDont
          good={<Tile>{AC(JOINT)}</Tile>}
          bad={<Tile>{AC({ ...JOINT, subtitle: '50100234564821' })}</Tile>}
          goodTitle="Show a masked number" goodCaption="“**** 4821” tells two accounts apart."
          badTitle="Show the full number" badCaption="A preview tile exposes the whole account number." />
        <DoDont
          good={<Tile>{AC(ADD)}</Tile>}
          bad={<Tile>{AC({ state: 'add' })}</Tile>}
          goodTitle="Title the add tile with its action" goodCaption="“Add account” says what pressing it does."
          badTitle="Leave the default title" badCaption="It reads “Personal account”, the code's default." />
        <DoDont
          good={<Tile>{AC(ADD)}</Tile>}
          bad={<Tile>{AC({ ...ADD, modes: { ...LIGHT, Emphasis: 'High' } as Modes })}</Tile>}
          goodTitle="Keep the plus as it is" goodCaption="The default purple plus stands out on the field."
          badTitle="Set Emphasis High" badCaption="The plus turns white and disappears on the field." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Account Card contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="13 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('accountcard')} stories={[
        { label: 'Default', id: 'components-accountcard--default' },
        { label: 'Connected', id: 'components-accountcard--connected' },
        { label: 'Add', id: 'components-accountcard--add' },
        { label: 'Pair', id: 'components-accountcard--pair' },
        { label: 'From URL', id: 'components-accountcard--from-url' },
        { label: 'Pressable', id: 'components-accountcard--pressable' },
        { label: 'Disabled', id: 'components-accountcard--disabled' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (12 October build) from the team’s private package repository. Figma’s Account Card is a component set with Connected and Add tiles, 125 px wide, and Title and Subtitle text. Its card art has rounded corners; the code doesn’t round the art, only the add field. The package ships no card art, so this page uses a photo, as Storybook’s From URL story does. Modes only recolour the add tile’s plus; the text and the lavender field don’t change. The tile ignores the theme provider, so pass modes on it. The published Storybook still shows the old page.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'accountcard',
    corePrinciple: 'One account per tile, and one tile to add another.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('accountcard'),
  }} playground={<>
    <div className="preview-stage">
      <Tile>{AC({ ...live, onPress: pressable ? () => setAction(`${live.title} pressed`) : undefined, disabled })}</Tile>
      <span className="stage-label">Live Coin Account Card</span>
    </div>
    <div className="controls-panel">
      <Segment label="State" value={state} options={['Connected', 'Add'] as const} onChange={setState} />
      <OnOff label="Pressable" value={pressable} onChange={setPressable} />
      <OnOff label="Disabled" value={disabled} onChange={setDisabled} />
      <Readout title="Last action" value={action}>
        Without onPress the tile isn't a button. disabled dims it to half and stops presses.
      </Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'accountcard',
  label: 'Account Card',
  summary: 'Use an Account Card for one linked account in a row of accounts, or as the tile that adds another.',
  keywords: ['account tile', 'linked accounts', 'add account', 'bank account', 'account picker'],
  icon: <><rect x="3" y="3" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><path d="M3 14.5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>,
  Component: AccountCardGuide,
})
