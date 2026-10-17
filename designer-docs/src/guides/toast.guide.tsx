import { useState, type ReactNode } from 'react'
import { Button, Icon, Text, Toast, ToastProvider, VStack, addToast, closeAll, useToast, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, ScreenFrame, Segment, Sources, Surface, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2197-1510'
const LIGHT = { 'Color Mode': 'Light' } as Modes
const TERTIARY = { ...LIGHT, AppearanceBrand: 'Tertiary' } as Modes
const LONG = "We couldn't verify your mobile number. Check the number and try again, or sign in with your email address instead."

type Brand = 'Primary' | 'Secondary' | 'Tertiary' | 'Neutral'
type Placement = 'Bottom' | 'Top'
type Message = 'Short' | 'Long'
type Timeout = '4 s' | '8 s' | 'Stays'
const TIMEOUTS: Record<Timeout, number> = { '4 s': 4000, '8 s': 8000, Stays: 0 }

function Pill({ id, title, startItem, slotItem, modes = LIGHT }: { id: string; title: string; startItem?: boolean; slotItem?: ReactNode; modes?: Modes }) {
  return <Toast id={id} title={title} timeout={0} modes={modes} startItem={startItem} slotItem={slotItem} />
}

function ToastGuide() {
  const [active, setActive] = useState('playground')
  const [placement, setPlacement] = useState<Placement>('Bottom')
  const [message, setMessage] = useState<Message>('Short')
  const [leading, setLeading] = useState(false)
  const [timeout, setTimeoutValue] = useState<Timeout>('4 s')
  const [brand, setBrand] = useState<Brand>('Primary')
  const [status, setStatus] = useState('Nothing copied yet')
  const { toasts } = useToast()

  const take = (id: string) => {
    if (active !== id) {
      closeAll()
      setActive(id)
    }
  }

  const live = (id: string, providerProps: { placement?: 'top' | 'bottom'; modes?: Modes }, buttons: ReactNode) => {
    const screen = <VStack modes={LIGHT} style={{ flex: 1 }} justifyVertical="center" alignHorizontal="center">{buttons}</VStack>
    return <ScreenFrame size="full">{active === id ? <ToastProvider {...providerProps}>{screen}</ToastProvider> : screen}</ScreenFrame>
  }

  const count = toasts.length

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A dark pill with a message',
      description: 'A toast is a dark pill holding one message and, if you ask for it, a leading icon. It has no buttons; it closes itself.',
      body: <Anatomy specimenWidth={300} parts={[
        { name: 'Pill', note: 'Dark grey with 14 px corners and a soft shadow; the same in every mode.', target: '[role="alert"]', side: 'left' },
        { name: 'Leading icon', note: 'Optional 18 px icon; the card icon unless you swap it.', target: '[role="alert"] svg', side: 'top' },
        { name: 'Message', note: 'White 14 px text, up to two lines.', target: '[role="alert"] [dir="auto"]', side: 'bottom' },
      ]}><Toast id="toast-anatomy" title="Mobile number is invalid" startItem timeout={0} modes={LIGHT} /></Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Message, icon, and brand',
      description: "A toast is one message with an optional leading icon. Only the icon follows AppearanceBrand; the pill is the same dark grey in every mode. Where toasts appear, top or bottom, is set once on the screen's provider: try it in the playground.",
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Message only" description="The default: one line of white text in a dark pill."><Surface width="wide" elevated><Pill id="toast-config-plain" title="Mobile number is invalid" /></Surface></ExampleCard>
        <ExampleCard title="With the card icon" description="startItem adds the card icon before the message, white by default, as in Figma."><Surface width="wide" elevated><Pill id="toast-config-card" title="Mobile number is invalid" startItem /></Surface></ExampleCard>
        <ExampleCard title="Your own icon" description="Swap in another 18 px icon; it takes the Coin icon colour, a deeper gold."><Surface width="wide" elevated><Pill id="toast-config-own" title="Payment successful" startItem slotItem={<Icon iconName="ic_confirm" size={18} />} /></Surface></ExampleCard>
        <ExampleCard title="Icon by brand" description="AppearanceBrand recolours only the icon: gold, purple, blue, or white, the default.">
          <Surface width="wide" elevated><div className="coin-new-stack">
            {(['Primary', 'Secondary', 'Tertiary', 'Neutral'] as const).map(b => <Pill key={b} id={`toast-brand-${b}`} title={b} startItem modes={{ ...LIGHT, AppearanceBrand: b } as Modes} />)}
          </div></Surface>
        </ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Shown, stacked, and gone',
      description: "A toast slides in from its edge and closes itself after 4 s, or after its own timeout; with no timeout it stays until the screen clears it. Up to three show at once, newest last. Older ones wait behind them on their own timers, so they appear only if they’re still due when a newer one closes. There's no close button and no swipe.",
      body: <ExampleCard title="Stacked and queued" description="Five at once: the newest three show; the first two time out behind them and never appear.">
        {live('states', { placement: 'bottom' }, <>
          <Button label="Show five" modes={LIGHT} onPress={() => { take('states'); for (let i = 1; i <= 5; i++) addToast({ title: `Notification ${i}`, timeout: 4000 }) }} />
          <Button label="Clear all" modes={TERTIARY} onPress={closeAll} />
        </>)}
      </ExampleCard>,
    },
    sizing: {
      header: 'Sizing', title: 'Hugs its message, within 90% of the screen',
      description: 'A toast is as wide as its message, at least 200 px and at most 90% of its screen, with 16 px of padding at the sides and 14 px above and below. Long messages wrap to two lines, then end in an ellipsis, unless the toast is added with disableTruncation, which shows every line.',
      body: <div className="coin-new-stack">
        <Anatomy legend={false} specimenWidth={300} marks={[{ kind: 'size', target: '[role="alert"]', side: 'right', label: 'both' }, { kind: 'padding', target: '[role="alert"]' }]}>
          <Pill id="toast-sizing" title="Mobile number is invalid" startItem />
        </Anatomy>
        <div className="coin-new-example-grid">
          <ExampleCard title="Short message" description="Even one word gets a 200 px pill."><Surface width="wide" elevated><Pill id="toast-size-short" title="Saved" /></Surface></ExampleCard>
          <ExampleCard title="Long message" description="It wraps to two lines, then ends in an ellipsis; the rest is lost."><Surface width="wide" elevated><Pill id="toast-size-long" title={LONG} /></Surface></ExampleCard>
        </div>
      </div>,
    },
    content: {
      header: 'Content', title: 'One short sentence about what happened',
      description: 'Say what happened in a few words, such as Payment successful or UPI ID copied. A toast has no buttons and closes itself, so never ask for a decision or put anything in it that people must read twice.',
      body: <ExampleCard title="Confirmations" description="Short, specific, and about something that already happened.">
        <Surface width="wide" elevated><div className="coin-new-stack">
          <Pill id="toast-content-1" title="Payment successful" />
          <Pill id="toast-content-2" title="UPI ID copied" />
          <Pill id="toast-content-3" title="Mobile number is invalid" />
        </div></Surface>
      </ExampleCard>,
    },
    context: {
      header: 'In context', title: 'Copying a UPI ID',
      description: 'Pressing Copy confirms with a toast at the bottom of the screen. The screen adds it with addToast; it closes itself after 4 s.',
      body: <div className="coin-new-context">
        {live('context', { placement: 'bottom' }, <>
          <Text modes={{ ...LIGHT, 'Text Sizes': 'Large' } as Modes}>Your UPI ID</Text>
          <Text modes={LIGHT}>yourname@jio</Text>
          <Button label="Copy" modes={LIGHT} onPress={() => { take('context'); addToast({ title: 'UPI ID copied' }); setStatus('Copied yourname@jio') }} />
        </>)}
        <p className="coin-new-readout" role="status">{status}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Short, and about what already happened',
      description: "Each pair shows a toast people take in at a glance next to one they can't finish reading or act on.",
      body: <div className="coin-new-stack">
        <DoDont good={<Pill id="toast-do-1" title="Payment successful" />} bad={<Pill id="toast-dont-1" title={LONG} />}
          goodTitle="Keep it to one line" badTitle="Write a paragraph"
          goodCaption="“Payment successful” reads at a glance." badCaption="Past two lines the message is cut off, and nothing shows the rest." />
        <DoDont good={<Pill id="toast-do-2" title="UPI ID copied" />} bad={<Pill id="toast-dont-2" title="Retry the payment?" />}
          goodTitle="Confirm what happened" badTitle="Ask for a decision"
          goodCaption="The action is done; the toast just says so." badCaption="A toast has no buttons and disappears in 4 s, so people can't answer." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Toast contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="17 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('toast')} stories={[
        { label: 'Default', id: 'components-toast--default' },
        { label: 'Top placement', id: 'components-toast--top-placement' },
        { label: 'Multiple toasts', id: 'components-toast--multiple-toasts' },
        { label: 'Persistent toast', id: 'components-toast--persistent-toast' },
        { label: 'Custom timeout', id: 'components-toast--custom-timeout' },
        { label: 'With start item', id: 'components-toast--with-start-item' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (16 October build) from the team’s private package repository. Figma’s Toast is one 291 × 46 component with a text, an optional start icon, and an icon swap; its icon resolves to white. Since the #267 fix the default icon is white too; an AppearanceBrand mode recolours it, while the pill stays the same dark grey in every mode. Screens add toasts with addToast and show them through one ToastProvider: every provider shows the same queue, so this page mounts one at a time. Toasts slide in from their edge and fade out, as in the package, and messages stop at two lines unless addToast sets disableTruncation. Each toast is announced as an alert. The published Storybook page is still the old generated one.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'toast',
    corePrinciple: 'Confirm, briefly, then get out of the way.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('toast'),
  }} playground={<>
    <div className="preview-stage">
      {live('playground', { placement: placement === 'Top' ? 'top' : 'bottom', modes: { ...LIGHT, AppearanceBrand: brand } as Modes }, <>
        <Button label="Show toast" modes={LIGHT} onPress={() => { take('playground'); addToast({ title: message === 'Short' ? 'Mobile number is invalid' : LONG, timeout: TIMEOUTS[timeout], startItem: leading }) }} />
        <Button label="Clear all" modes={TERTIARY} onPress={closeAll} />
      </>)}
      <span className="stage-label">Live Coin Toast</span>
    </div>
    <div className="controls-panel">
      <Segment label="Placement" value={placement} options={['Bottom', 'Top'] as const} onChange={setPlacement} />
      <Segment label="Message" value={message} options={['Short', 'Long'] as const} onChange={setMessage} />
      <OnOff label="Leading icon" value={leading} onChange={setLeading} />
      <Segment label="Timeout" value={timeout} options={['4 s', '8 s', 'Stays'] as const} onChange={setTimeoutValue} />
      <Segment label="Brand" value={brand} options={['Primary', 'Secondary', 'Tertiary', 'Neutral'] as const} onChange={setBrand} />
      <Readout title="In the queue" value={count === 1 ? '1 toast' : `${count} toasts`}>Up to three show at once, newest last. Each closes after its timeout; Stays waits for Clear all.</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'toast',
  label: 'Toast',
  summary: 'Use a Toast to confirm something that just happened, such as a payment or a copy, in a short message that closes itself.',
  keywords: ['snackbar', 'notification', 'confirmation message', 'alert pill'],
  icon: <><rect x="2.5" y="10" width="13" height="5" rx="2.5" stroke="currentColor" strokeWidth="1.5" /><path d="M5 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>,
  Component: ToastGuide,
})
