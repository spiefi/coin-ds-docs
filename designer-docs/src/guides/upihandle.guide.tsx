import { useState } from 'react'
import { Button, Card, Text, UpiHandle, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, Segment, Sources, Surface, byTestId, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const LIGHT = { 'Color Mode': 'Light' } as Modes
const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=262-893'
const AVATAR = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46 46"><rect width="46" height="46" fill="#E9DDF7"/><text x="23" y="30" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="600" fill="#5D00B5">P</text></svg>'
const noop = () => {}
const ICON_NOTES = {
  Copy: 'Pressing the pill copies the handle.',
  Scan: 'Pressing the pill opens the scanner.',
  None: 'Without an icon the pill only shows the handle.',
} as const

function Copy({ label, source }: { label: string; source?: string }) {
  return <UpiHandle modes={LIGHT} label={label} source={source} iconName="ic_copy" onPress={noop} />
}

function Host({ children }: { children: React.ReactNode }) {
  return <Surface width="wide">{children}</Surface>
}

function UpiHandleGuide() {
  const [label, setLabel] = useState('priya@jio')
  const [avatar, setAvatar] = useState(true)
  const [icon, setIcon] = useState<'Copy' | 'Scan' | 'None'>('Copy')
  const [presses, setPresses] = useState(0)
  const [status, setStatus] = useState('Nothing yet')

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'Avatar, handle, and an action icon',
      description: 'A grey, fully rounded pill holds an optional avatar, the handle on one line, and an optional icon for the pill’s action.',
      body: <Anatomy surface="white" parts={[
        { name: 'Avatar', note: 'Optional photo or logo; it shows only when a source is set.', target: `${byTestId('upi-anatomy')} > div:first-child`, side: 'left' },
        { name: 'Handle', note: 'The UPI ID or number, on one line.', target: `${byTestId('upi-anatomy')} [dir="auto"]`, side: 'top' },
        { name: 'Action icon', note: 'Optional cue for what pressing does: copy or scan.', target: `${byTestId('upi-anatomy')} > div:last-child`, side: 'right' },
        { name: 'Pill', note: 'Grey rounded surface that hugs its content.', target: byTestId('upi-anatomy'), side: 'bottom' },
      ]}>
        <UpiHandle modes={LIGHT} testID="upi-anatomy" label="priya@jio" source={AVATAR} iconName="ic_copy" onPress={noop} />
      </Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Avatar and icon are optional',
      description: 'Add an avatar when a photo or logo helps people recognise the account. Choose the icon for the action the pill performs, or none when it only shows the handle.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="With avatar" description="A photo helps people confirm whose handle it is."><Host><Copy label="priya@jio" source={AVATAR} /></Host></ExampleCard>
        <ExampleCard title="Without avatar" description="The pill pads evenly; use it where a name is already shown."><Host><Copy label="shrutirai-1@jio" /></Host></ExampleCard>
        <ExampleCard title="Scan icon" description="For a handle people scan to pay."><Host><UpiHandle modes={LIGHT} label="merchant@jio" iconName="ic_scan_qr_code" onPress={noop} /></Host></ExampleCard>
        <ExampleCard title="No icon" description="Display only: nothing to press."><Host><UpiHandle modes={LIGHT} label="merchant@jio" showIcon={false} /></Host></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Display only or pressable',
      description: 'Without an action the pill only shows the handle. With one, the whole pill is the control and shrinks slightly while pressed. A disabled pill looks the same as an enabled one, so avoid disabling it.',
      body: <div className="coin-new-example-grid three">
        <ExampleCard title="Display only" description="Static text in a pill."><Host><UpiHandle modes={LIGHT} label="priya@jio" showIcon={false} /></Host></ExampleCard>
        <ExampleCard title="Pressable" description="The whole pill responds to a press."><Host><Copy label="priya@jio" /></Host></ExampleCard>
        <ExampleCard title="Disabled" description="Ignores presses but looks unchanged."><Host><UpiHandle modes={LIGHT} label="priya@jio" iconName="ic_copy" onPress={noop} disabled /></Host></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: '29 px tall, as wide as its content',
      description: 'The pill is 29 px tall and grows with its handle: 14 px of padding at each end (4 px before an avatar), a 23 px avatar, and a 12 px icon. It never shrinks, so keep long handles out of narrow columns.',
      body: <Anatomy surface="white" legend={false} marks={[
        { kind: 'size', target: byTestId('upi-size'), side: 'bottom', label: 'both' },
        { kind: 'padding', target: byTestId('upi-size') },
      ]}>
        <UpiHandle modes={LIGHT} testID="upi-size" label="shrutirai-1@jio" iconName="ic_copy" onPress={noop} />
      </Anatomy>,
    },
    content: {
      header: 'Content', title: 'Show the real handle',
      description: 'Write the UPI ID or number exactly as people will pay or copy it, such as priya@jio. Don’t add “UPI:” or translate it; the pill already says what it is.',
      body: <ExampleCard title="Handles"><Host>
        <Copy label="priya@jio" /><Copy label="merchant-1234@jio" /><Copy label="9184844184" />
      </Host></ExampleCard>,
    },
    context: {
      header: 'In context', title: 'Confirm the payee',
      description: 'The screen copies the handle or opens the payment when pressed; the pill only reports the press.',
      body: <div className="coin-new-context">
        <Card modes={LIGHT}><VStack modes={LIGHT}>
          <Text modes={LIGHT}>Paying Priya Sharma</Text>
          <UpiHandle modes={LIGHT} label="priya@jio" source={AVATAR} iconName="ic_copy" onPress={() => setStatus('UPI ID copied')} />
          <Button modes={LIGHT} label="Pay ₹500" onPress={() => setStatus('Payment started')} />
        </VStack></Card>
        <p className="coin-new-readout" role="status">{status}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Make the handle recognisable and honest',
      description: 'Each pair shows a handle people can trust and act on versus one that confuses them.',
      body: <div className="coin-new-stack">
        <DoDont goodTitle="Use the real handle" goodCaption="People recognise the ID they will pay or copy." good={<Host><Copy label="priya@jio" /></Host>}
          badTitle="Leave the placeholder" badCaption="“Label” is the Figma placeholder, not a handle." bad={<Host><Copy label="Label" /></Host>} />
        <DoDont goodTitle="Put the action on the pill" goodCaption="The copy icon says what pressing does." good={<Host><Copy label="priya@jio" /></Host>}
          badTitle="Show an icon with no action" badCaption="A scan icon on a static pill looks tappable but does nothing." bad={<Host><UpiHandle modes={LIGHT} label="merchant@jio" iconName="ic_scan_qr_code" /></Host>} />
        <DoDont goodTitle="One handle per pill" goodCaption="Each pill copies one ID." good={<Host><Copy label="priya@jio" /><Copy label="priya@okaxis" /></Host>}
          badTitle="Combine handles in one label" badCaption="People can’t tell which ID they copied." bad={<Host><Copy label="priya@jio, priya@okaxis" /></Host>} />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public UPI Handle contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="1 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('upihandle')} stories={[
        { label: 'Default', id: 'components-upihandle--default' },
        { label: 'Without image', id: 'components-upihandle--without-image' },
        { label: 'Without icon', id: 'components-upihandle--without-icon' },
        { label: 'Pressable', id: 'components-upihandle--pressable-handle' },
        { label: 'Disabled', id: 'components-upihandle--disabled' },
        { label: 'Several handles', id: 'components-upihandle--multiple-handles' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.77</code> from the team’s private package repository; UPI Handle is unchanged in 0.1.78. Figma shows an avatar, the handle, and a copy icon in a 144 × 29 pill. The package defaults to a scan icon, so this guide sets the copy icon wherever the pill copies. The avatar shows only when a source is set and is never tinted. On the web a pressable pill is focusable but is not announced as a button, its accessibility label is ignored, a disabled pill looks enabled, and a click leaves a dark outline that grows it by 2 px.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'upihandle',
    corePrinciple: 'Show the real handle and put its action on the pill.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('upihandle'),
  }} playground={<>
    <div className="preview-stage">
      <Surface><UpiHandle modes={LIGHT} label={label} source={avatar ? AVATAR : undefined} showIcon={icon !== 'None'}
        iconName={icon === 'Scan' ? 'ic_scan_qr_code' : 'ic_copy'} onPress={icon === 'None' ? undefined : () => setPresses(count => count + 1)} /></Surface>
      <span className="stage-label">Live Coin UPI Handle</span>
    </div>
    <div className="controls-panel">
      <label className="text-control"><span>Label</span><input value={label} onChange={event => setLabel(event.target.value)} maxLength={32} /></label>
      <OnOff label="Avatar" value={avatar} onChange={setAvatar} />
      <Segment label="Icon" value={icon} options={['Copy', 'Scan', 'None'] as const} onChange={setIcon} />
      <Readout title="Presses" value={presses}>{ICON_NOTES[icon]}</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'upihandle',
  label: 'UPI Handle',
  summary: 'Use a UPI Handle to show a UPI ID or number that people can recognise, copy, or scan, with an optional avatar.',
  keywords: ['UPI ID', 'VPA', 'payment address', 'handle'],
  icon: <><rect x="1.5" y="5" width="15" height="8" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" /><circle cx="5.5" cy="9" r="1.6" fill="currentColor" /><path d="M9 9h4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>,
  Component: UpiHandleGuide,
})
