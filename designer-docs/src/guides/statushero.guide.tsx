import { useState, type ComponentProps, type ReactNode } from 'react'
import { Button, Image, StatusHero, Title, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, ScreenFrame, Segment, Sources, docsUrl } from '../guide-kit'
import { defineGuide } from './define'
import goldCoin from '../assets/gold-coin.png'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2594-13'
const LIGHT = { 'Color Mode': 'Light' } as Modes
type Appearance = 'positive' | 'warning' | 'negative'
const SYS = (a: Appearance) => ({ ...LIGHT, 'Semantic Intent': 'System', AppearanceSystem: a } as Modes)

const COIN = <Image imageSource={goldCoin} width={81} height={81} />

type SHProps = Partial<ComponentProps<typeof StatusHero>>
function SH(overrides: SHProps = {}) {
  return <StatusHero modes={LIGHT} {...overrides} />
}
const Host = ({ children }: { children: ReactNode }) => <VStack modes={LIGHT} style={{ width: 300, maxWidth: '100%' }}>{children}</VStack>
const H = (overrides: SHProps = {}) => <Host>{SH(overrides)}</Host>

const PAID: SHProps = { title: 'Payment successful', subtitle: '₹1,200 sent to Rahul Verma.', value: '1,200', modes: SYS('positive') }
const FAILED: SHProps = { title: 'Payment failed', subtitle: 'No money left your account.', value: '1,200' }

const R = ':scope > div'
const MEDIA = `${R} > div:first-child`
const MARK = `${R} [role="img"]`
const AMOUNT = `${R} > div:first-child > div:last-child`
const TITLE = `${R} > div:last-child > [dir="auto"]:first-child`
const SUBTITLE = `${R} > div:last-child > [dir="auto"]:last-child`

const MARK_COLOUR: Record<Appearance, string> = { positive: 'Green', warning: 'Orange', negative: 'Red' }

function StatusHeroGuide() {
  const [intent, setIntent] = useState<'Brand' | 'System'>('Brand')
  const [appearance, setAppearance] = useState<Appearance>('positive')
  const [iconName, setIconName] = useState<'ic_confirm' | 'ic_warning' | 'ic_close'>('ic_confirm')
  const [showTitle, setShowTitle] = useState(true)
  const [started, setStarted] = useState(false)

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A mark, an amount, two lines',
      description: 'The media, a mark over the amount, sits on top; the title and the subtitle follow. Everything is centred.',
      body: <Anatomy marks={[{ kind: 'gap', from: MARK, to: AMOUNT }]} parts={[
        { name: 'Mark', note: 'An 81 px Icon Capsule showing iconName.', target: MARK, side: 'left' },
        { name: 'Amount', note: 'A Money Value from value and currency, 36 px.', target: AMOUNT, side: 'right' },
        { name: 'Media', note: 'renderMedia replaces the mark and the amount together.', target: MEDIA, side: 'top' },
        { name: 'Title', note: 'title, 20 px Bold; showTitle hides it.', target: TITLE, side: 'left' },
        { name: 'Subtitle', note: 'subtitle; a line break in it stays.', target: SUBTITLE, side: 'bottom' },
      ]}>{SH()}</Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'The mark, or your own media',
      description: 'The mark is gold by default: the hero fixes its Icon Capsule to AppearanceBrand Primary, so no brand mode changes it. Set Semantic Intent to System and AppearanceSystem colours it green, orange, or red; pick a matching iconName. renderMedia replaces the mark and the amount with your own content, such as a picture.',
      body: <div className="coin-new-stack">
        <div className="coin-new-example-grid">
          <ExampleCard title="Brand" description="The default gold mark.">{H()}</ExampleCard>
          <ExampleCard title="System positive" description="Green: it went through.">{H({ modes: SYS('positive') })}</ExampleCard>
          <ExampleCard title="System warning" description="Orange: still waiting.">{H({ modes: SYS('warning'), iconName: 'ic_warning', title: 'Payment pending', subtitle: 'We’ll tell you when your bank confirms it.' })}</ExampleCard>
          <ExampleCard title="System negative" description="Red: it didn’t happen.">{H({ ...FAILED, modes: SYS('negative'), iconName: 'ic_close' })}</ExampleCard>
        </div>
        <div className="coin-new-example-grid">
          <ExampleCard title="Default media" description="An Icon Capsule over a Money Value.">{H({ title: 'Gold bought', subtitle: 'It’s in your gold locker now.', value: '5,000' })}</ExampleCard>
          <ExampleCard title="renderMedia" description="A picture instead, and no amount.">{H({ title: 'Gold bought', subtitle: 'It’s in your gold locker now.', renderMedia: COIN })}</ExampleCard>
        </div>
      </div>,
    },
    states: {
      header: 'States', title: 'Full, or shorter',
      description: 'The hero has no states: it doesn’t press, load, or animate, and it has no button, so the screen adds the next action. showTitle={false} hides the title, and an empty subtitle hides the subtitle; leaving subtitle out shows the package’s default sentence instead.',
      body: <div className="coin-new-example-grid three">
        <ExampleCard title="Full" description="Mark, amount, title, and subtitle.">{H(PAID)}</ExampleCard>
        <ExampleCard title="Without a title" description="showTitle={false} hides the title.">{H({ ...PAID, showTitle: false })}</ExampleCard>
        <ExampleCard title="Without a subtitle" description="An empty subtitle hides it.">{H({ ...PAID, subtitle: '' })}</ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'As wide as its words',
      description: 'The hero has no width of its own: it centres its content and wraps text only when its host is narrower. With the default copy it is 302 × 269: 8 px of padding, an 81 px mark, 46 px to a 44 px amount, then 12 px to a 24 px title and 12 px to the subtitle. Figma’s is 259 px tall, because its amount and title sit on 36 and 22 px lines.',
      body: <Anatomy legend={false} marks={[
        { kind: 'size', target: R, side: 'bottom', label: 'both' },
        { kind: 'gap', from: MARK, to: AMOUNT },
        { kind: 'padding', target: R },
      ]}>{SH()}</Anatomy>,
    },
    content: {
      header: 'Content', title: 'The outcome, then one fact',
      description: 'Write title as the outcome in a few words, such as Payment successful. Write subtitle as the one fact that follows; a line break in it stays. Give value as the number alone: currency adds the sign, and INR or ₹ both show ₹. Phone screen readers skip the amount, so say it in the subtitle too.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Outcome and amount" description="The subtitle repeats the amount for screen readers.">{H(PAID)}</ExampleCard>
        <ExampleCard title="A long subtitle" description="It wraps, centred, in its column.">{H({ title: 'Daily savings started', subtitle: '₹50 will move from HDFC Bank ··4821 to your gold locker every morning.', value: '50' })}</ExampleCard>
      </div>,
    },
    context: {
      header: 'In context', title: 'The screen after a setup',
      description: 'Start saving swaps the setup screen for the result: the hero confirms it, and Done below leaves. The hero has no button of its own, so the screen adds one.',
      body: <div className="coin-new-context">
        <ScreenFrame size="full">
          <VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes} style={{ flex: 1, padding: 16 }} justifyVertical="space-between">
            {started ? (
              <VStack modes={LIGHT} style={{ flex: 1 }} justifyVertical="center">{SH()}</VStack>
            ) : (
              <Title title="Save in gold every day" subtitle="₹50 a day from HDFC Bank ··4821" modes={LIGHT} />
            )}
            {started
              ? <Button label="Done" modes={LIGHT} onPress={() => setStarted(false)} />
              : <Button label="Start saving" modes={LIGHT} onPress={() => setStarted(true)} />}
          </VStack>
        </ScreenFrame>
        <p className="coin-new-readout" role="status">{started ? 'Daily savings started: ₹50 a day' : 'Not started'}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'One result, said plainly',
      description: 'Each pair shows a result people take in at a glance next to one that contradicts or overloads it.',
      body: <div className="coin-new-stack">
        <DoDont good={H({ ...FAILED, modes: SYS('negative'), iconName: 'ic_close' })} bad={H(FAILED)}
          goodTitle="The mark matches" goodCaption="A red cross for a failed payment."
          badTitle="A success mark on a failure" badCaption="The gold tick says it worked." />
        <DoDont good={H(PAID)} bad={H({ ...PAID, value: '250', subtitle: '₹50 on 19 Oct, ₹50 on 20 Oct, ₹50 on 21 Oct, ₹50 on 22 Oct, ₹50 on 23 Oct' })}
          goodTitle="One next fact" goodCaption="What happened, then what follows."
          badTitle="A history in the subtitle" badCaption="This hero is one result; put the history in Transaction Details." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Status Hero contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="25 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('statushero')} stories={[
        { label: 'Default', id: 'components-statushero--default' },
        { label: 'Without title', id: 'components-statushero--without-title' },
        { label: 'Without subtitle', id: 'components-statushero--without-subtitle' },
        { label: 'Custom media slot', id: 'components-statushero--custom-media-slot' },
        { label: 'Large amount', id: 'components-statushero--large-amount' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (23 October build of Biscuit’s main) from the team’s private package repository. Figma’s Status Hero has <code>Title</code> and <code>Subtitle</code> text properties and a <code>title</code> switch, over a nested Icon Capsule and Money Value; the package adds <code>iconName</code>, <code>value</code>, <code>currency</code>, and <code>renderMedia</code>. Its mark is gold where Figma’s is dark grey with a white tick: the hero fixes the capsule’s brand mode, so only Semantic Intent System recolours it. It is 269 px tall where Figma’s is 259, and phone screen readers skip the amount. Storybook’s Without subtitle story still shows the default subtitle (all reported).</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'statushero', corePrinciple: 'Say what happened, then the one thing that follows.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('statushero'),
  }} playground={<>
    <div className="preview-stage">
      {H({ modes: intent === 'Brand' ? LIGHT : SYS(appearance), iconName, showTitle })}
      <span className="stage-label">Live Coin Status Hero</span>
    </div>
    <div className="controls-panel">
      <Segment label="Semantic Intent" value={intent} options={['Brand', 'System'] as const} onChange={setIntent} />
      <Segment label="AppearanceSystem" value={appearance} options={['positive', 'warning', 'negative'] as const} onChange={setAppearance} />
      <Segment label="iconName" value={iconName} options={['ic_confirm', 'ic_warning', 'ic_close'] as const} onChange={setIconName} />
      <OnOff label="showTitle" value={showTitle} onChange={setShowTitle} />
      <Readout title="Mark" value={intent === 'Brand' ? 'Gold' : MARK_COLOUR[appearance]}>AppearanceSystem colours the mark only with Semantic Intent System. The title and the amount don’t change.</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'statushero',
  label: 'Status Hero',
  summary: 'Use a Status Hero at the top of a result screen to confirm what just happened: a mark, the amount, a title, and one line.',
  keywords: ['success screen', 'result screen', 'payment result', 'confirmation', 'done screen'],
  icon: <><circle cx="9" cy="6" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M7.3 6l1.2 1.2 2.2-2.4M5 13h8M6.5 16h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /></>,
  Component: StatusHeroGuide,
})
