import { useState } from 'react'
import { Button, Card, HStack, ListItem, Toggle as CoinToggle, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, Segment, Sources, Specimen, SpecimenRow, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const LIGHT = { 'Color Mode': 'Light' } as Modes
const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2906-8120'
const SETTINGS = ['Payment alerts', 'Biometric login', 'Hide balances'] as const

function Row({ title, on, onChange, supportText }: { title: string; on?: boolean; onChange?: (v: boolean) => void; supportText?: string }) {
  const toggle = onChange
    ? <CoinToggle modes={LIGHT} value={on} onValueChange={onChange} accessibilityLabel={title} />
    : <CoinToggle modes={LIGHT} defaultValue={on} accessibilityLabel={title} />
  return <ListItem modes={LIGHT} layout="Horizontal" navArrow={false} title={title} supportText={supportText} showSupportText={!!supportText} trailing={toggle} />
}

const Host = ({ children }: { children: React.ReactNode }) => <div className="coin-new-host wide"><VStack modes={LIGHT} style={{ width: "100%" }}>{children}</VStack></div>

function ToggleGuide() {
  const [on, setOn] = useState(true)
  const [disabled, setDisabled] = useState(false)
  const [values, setValues] = useState<Record<string, boolean>>({ 'Payment alerts': true, 'Biometric login': false, 'Hide balances': false })
  const status = SETTINGS.map(s => `${s} ${values[s] ? 'on' : 'off'}`).join(' · ')

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A track and a thumb',
      description: 'Toggle is a 52 × 31 px pill. Off, the track is grey with the thumb on the left; on, it turns purple and the thumb slides right.',
      body: <Anatomy parts={[
        { name: 'Track', note: 'Pill that is grey when off and purple when on.', target: '.gk-specimen:last-child [role="switch"]', side: 'top' },
        { name: 'Thumb', note: 'White circle; its side shows the state.', target: '.gk-specimen:last-child [role="switch"] > div', side: 'right' },
        { name: 'Off position', note: 'Thumb on the left of a grey track.', target: '.gk-specimen:first-child [role="switch"] > div', side: 'left' },
      ]}>
        <SpecimenRow>
          <Specimen caption="Off"><CoinToggle modes={LIGHT} accessibilityLabel="Off example" /></Specimen>
          <Specimen caption="On"><CoinToggle modes={LIGHT} defaultValue accessibilityLabel="On example" /></Specimen>
        </SpecimenRow>
      </Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'One size, labelled by its row',
      description: 'Toggle has no size or style options. It has no label of its own, so it always sits at the end of a row whose title names the setting.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Title only" description="The title names the setting the toggle controls."><Host><Row title="Payment alerts" on /></Host></ExampleCard>
        <ExampleCard title="Title and support text" description="Support text explains what on means."><Host><Row title="Round up savings" supportText="Invest the spare change from each payment" /></Host></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Off, on, and disabled',
      description: 'The screen sets each toggle’s value. Disable a toggle only while its setting can’t change, and say why nearby.',
      body: <div className="coin-new-example-grid three">
        <ExampleCard title="Off" description="Grey track, thumb left: the setting is off."><div className="coin-new-row"><CoinToggle modes={LIGHT} accessibilityLabel="Off" /></div></ExampleCard>
        <ExampleCard title="On" description="Purple track, thumb right: the setting is on."><div className="coin-new-row"><CoinToggle modes={LIGHT} defaultValue accessibilityLabel="On" /></div></ExampleCard>
        <ExampleCard title="Disabled" description="Dimmed to 50% and grey in both states; only the thumb position shows which is on."><div className="coin-new-row">
          <CoinToggle modes={LIGHT} disabled accessibilityLabel="Disabled off" />
          <CoinToggle modes={LIGHT} disabled value accessibilityLabel="Disabled on" />
        </div></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'Always 52 × 31 px',
      description: 'The toggle never stretches. The track is 52 × 31 px with 3 px padding around a 25 px thumb, so give its row at least 31 px of height.',
      body: <Anatomy legend={false} marks={[
        { kind: 'size', target: '[role="switch"]', side: 'bottom', label: 'both' },
        { kind: 'size', target: '[role="switch"] > div', side: 'top', label: 'both' },
        { kind: 'padding', target: '[role="switch"]' },
      ]}><CoinToggle modes={LIGHT} defaultValue accessibilityLabel="Size example" /></Anatomy>,
    },
    content: {
      header: 'Content', title: 'Name the setting, not the action',
      description: 'The row’s title says what the toggle controls, such as “Payment alerts”. Don’t write “Turn on” or “Enable”: the switch already shows on or off.',
      body: <ExampleCard title="Setting names"><VStack modes={LIGHT} style={{ width: '100%' }}>
        <Row title="Payment alerts" on /><Row title="Biometric login" /><Row title="Hide balances" on />
      </VStack></ExampleCard>,
    },
    context: {
      header: 'In context', title: 'A settings card',
      description: 'Each change applies as soon as the toggle moves. The screen keeps every value and saves it; the toggle only reports the new value.',
      body: <div className="coin-new-context">
        <Card modes={LIGHT}><VStack modes={LIGHT}>
          {SETTINGS.map(s => <Row key={s} title={s} on={values[s]} onChange={v => setValues(prev => ({ ...prev, [s]: v }))} />)}
        </VStack></Card>
        <p className="coin-new-readout" role="status">{status}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Use it for instant on/off settings',
      description: 'Each pair shows a toggle people understand versus one that misleads them.',
      body: <div className="coin-new-stack">
        <DoDont goodTitle="Apply the change at once" goodCaption="Turning on Payment alerts takes effect straight away." good={<Host><Row title="Payment alerts" on /></Host>}
          badTitle="Wait for a Save button" badCaption="A switch that needs Save looks applied when it isn’t; use a Checkbox."
          bad={<Host><VStack modes={LIGHT}><Row title="Payment alerts" on /><Button modes={LIGHT} label="Save" /></VStack></Host>} />
        <DoDont goodTitle="Label every toggle" goodCaption="The row’s title says what switches." good={<Host><Row title="Biometric login" /></Host>}
          badTitle="Leave a toggle bare" badCaption="Without a label people can’t tell what it controls."
          bad={<Host><HStack modes={LIGHT}><CoinToggle modes={LIGHT} accessibilityLabel="Toggle" /><CoinToggle modes={LIGHT} defaultValue accessibilityLabel="Toggle" /></HStack></Host>} />
        <DoDont goodTitle="Use it for one on/off setting" goodCaption="“Hide balances” is either on or off." good={<Host><Row title="Hide balances" /></Host>}
          badTitle="Use it to choose between options" badCaption="Which side means Light? Use a pair of Radios." bad={<Host><Row title="Light / Dark theme" /></Host>} />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Toggle contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="8 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('toggle')} stories={[
        { label: 'Default', id: 'components-toggle--default' }, { label: 'On', id: 'components-toggle--on' },
        { label: 'Disabled', id: 'components-toggle--disabled' }, { label: 'All states', id: 'components-toggle--all-states' },
        { label: 'Interactive list', id: 'components-toggle--interactive' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (5 October build) from the team’s private package repository. Figma has two variants, Off and On, both 52 × 31; the package adds <code>disabled</code>, which dims the toggle to 50% and greys the track in both states. Toggle has no label of its own, so the screen names it, usually with the row’s title. On the web it is a switch with a name, and its on or off state is announced. Space and click switch it; in this build Enter does not. A disabled toggle is announced as disabled and skipped by Tab.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'toggle',
    corePrinciple: 'One setting, one switch, and the change happens at once.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('toggle'),
  }} playground={<>
    <div className="preview-stage">
      <Host><ListItem modes={LIGHT} layout="Horizontal" navArrow={false} title="Payment alerts" showSupportText={false}
        trailing={<CoinToggle modes={LIGHT} value={on} onValueChange={setOn} disabled={disabled} accessibilityLabel="Payment alerts" />} /></Host>
      <span className="stage-label">Live Coin Toggle</span>
    </div>
    <div className="controls-panel">
      <Segment label="State" value={on ? 'On' : 'Off'} options={['Off', 'On'] as const} onChange={v => setOn(v === 'On')} />
      <OnOff label="Disabled" value={disabled} onChange={setDisabled} />
      <Readout title="Payment alerts" value={on ? 'On' : 'Off'}>{disabled ? 'Disabled toggles ignore presses.' : 'Press the toggle or choose a state.'}</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'toggle',
  label: 'Toggle',
  summary: 'Use a Toggle to switch one setting on or off, with the change taking effect straight away.',
  keywords: ['switch', 'on/off', 'setting'],
  icon: <><rect x="1.5" y="5" width="15" height="8" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" /><circle cx="12.5" cy="9" r="2.2" fill="currentColor" /></>,
  Component: ToggleGuide,
})
