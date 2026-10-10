import { useState, type ReactNode } from 'react'
import { Button, FullscreenModal, IconCapsule, Image, ListGroup, ListItem, PlanComparisonCard, Section, Text, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, ScreenFrame, Sources, byTestId, docsUrl } from '../guide-kit'
import bankHero from '../assets/bank-hero.png'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4534-7558'
const LIGHT = { 'Color Mode': 'Light' } as Modes
const noop = () => {}

const OFFER = { eyebrow: 'JioFinance+', headline: 'Get more from your money', supportingText: 'Extra cashback, JioPoints, and JioGold every time you pay.', priceText: '₹999 a year · free until 2027', primaryActionLabel: 'Upgrade for free', disclaimer: 'We’ll check your eligibility with Experian.' }
const GOLD = { eyebrow: 'JioGold', headline: 'Save in gold every month', supportingText: 'Start a monthly SIP from ₹100. Buy and sell any time.', priceText: 'No making charges', primaryActionLabel: 'Start a SIP', disclaimer: 'Gold prices change with the market.' }

const BENEFITS = <Section title="Key benefits" showSupportText={false} slotDirection="column" slot={<ListGroup>
  <ListItem layout="Horizontal" navArrow={false} leading={<IconCapsule iconName="ic_offer" />} title="Up to ₹5,000 cashback" supportText="On bills and recharges" />
  <ListItem layout="Horizontal" navArrow={false} leading={<IconCapsule iconName="ic_star" />} title="1.25× JioPoints" supportText="On every UPI payment" />
  <ListItem layout="Horizontal" navArrow={false} leading={<IconCapsule iconName="ic_gift" />} title="1% extra JioGold" supportText="On gold you buy above ₹1,000" />
</ListGroup>} />
const PLANS = <Section title="Compare plans" showSupportText={false} slotDirection="column" slot={<PlanComparisonCard />} />
const HERO_IMAGE = <Image imageSource={bankHero} ratio={328 / 223} />

function Wrapped() { return BENEFITS }

function sel(id: string) {
  const R = byTestId(id)
  const HERO = `${R} > div:first-child > div > div > div:first-child`
  const T = `${HERO} > div`
  return {
    HERO,
    eyebrow: `${T} > div:first-child > div:first-child`,
    headline: `${T} > div:first-child > div:nth-child(2)`,
    supporting: `${T} > div:nth-child(2)`,
    price: `${T} > div:nth-child(3)`,
    BODY: `${R} > div:first-child > div > div > div:nth-child(2)`,
    footer: `${R} > [role="toolbar"]`,
    close: `${R} > [aria-label="Close"]`,
  }
}
const A = sel('fm-anatomy')
const S = sel('fm-size')

function Frame({ children }: { children: ReactNode }) {
  return <ScreenFrame size="full" surface="dark">{children}</ScreenFrame>
}

function FullscreenModalGuide() {
  const [body, setBody] = useState(true)
  const [footerButton, setFooterButton] = useState(true)
  const [disclaimer, setDisclaimer] = useState(true)
  const [close, setClose] = useState(true)
  const [action, setAction] = useState('None')
  const [shown, setShown] = useState(true)
  const [ctxOpen, setCtxOpen] = useState(false)
  const [status, setStatus] = useState('On Profile')

  const footerProps = { ...(disclaimer ? {} : { disclaimer: '' }), ...(footerButton ? {} : { primaryActionLabel: '' }) }

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'Hero text, a body, a footer, and a close button',
      description: 'Centred hero text sits at the bottom of a space reserved for hero media. Your Sections follow and scroll; the footer holds the main button, and a close button floats top right.',
      body: <Anatomy surface="dark" specimenWidth={360} parts={[
        { name: 'Eyebrow', note: 'A short line above the headline, such as the product name.', target: A.eyebrow, side: 'left' },
        { name: 'Headline', note: '29 px heavy; the promise in a few words.', target: A.headline, side: 'left' },
        { name: 'Supporting text', note: 'One sentence of detail.', target: A.supporting, side: 'right' },
        { name: 'Price line', note: 'Optional; the price or the offer.', target: A.price, side: 'right' },
        { name: 'Body', note: 'Your Sections, styled for the dark modal.', target: A.BODY, side: 'left' },
        { name: 'Footer', note: 'The main button, with an optional disclaimer.', target: A.footer, side: 'bottom' },
        { name: 'Close button', note: 'Top right; the screen closes the modal.', target: A.close, side: 'top' },
      ]}><FullscreenModal testID="fm-anatomy" {...OFFER} heroHeight={260} onClose={noop} onPrimaryAction={noop}>{BENEFITS}</FullscreenModal></Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Hero, body, and footer',
      description: 'Set the hero copy, add Sections for the details, and choose the footer’s button and disclaimer. Hero media fills the width behind the hero text, and heroHeight sets how much space the text sits at the bottom of.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Hero, body, and footer" description="The full layout: Sections scroll under the hero, and the footer stays at the bottom."><Frame><FullscreenModal {...OFFER} onClose={noop} onPrimaryAction={noop}>{BENEFITS}{PLANS}</FullscreenModal></Frame></ExampleCard>
        <ExampleCard title="Without a body" description="Hero text and one button make a confirmation screen."><Frame><FullscreenModal eyebrow="JioFinance+" headline="You’re all set" supportingText="Your benefits are active on every linked account." priceText="" primaryActionLabel="Done" disclaimer="" onClose={noop} onPrimaryAction={noop} /></Frame></ExampleCard>
        <ExampleCard title="Shorter hero" description="A lower heroHeight brings the body up; the text stays at the bottom of its space."><Frame><FullscreenModal {...OFFER} heroHeight={240} onClose={noop} onPrimaryAction={noop}>{BENEFITS}</FullscreenModal></Frame></ExampleCard>
        <ExampleCard title="With hero media" description="Media fills the width at its own ratio and scrolls with the content; keep the text off light areas."><Frame><FullscreenModal {...OFFER} heroMedia={HERO_IMAGE} heroHeight={460} onClose={noop} onPrimaryAction={noop}>{BENEFITS}</FullscreenModal></Frame></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Shown until the screen removes it',
      description: 'Fullscreen Modal has no open or closed state. The screen shows it and removes it; its close button and main button only report the press.',
      body: <ExampleCard title="The screen closes it" description="Press close or Upgrade for free: the screen removes the modal. Show it again with the button."><Frame>
        {shown
          ? <FullscreenModal {...OFFER} onClose={() => setShown(false)} onPrimaryAction={() => setShown(false)}>{BENEFITS}</FullscreenModal>
          : <VStack modes={LIGHT} alignHorizontal="center" style={{ flex: 1, justifyContent: 'center' }}><Button label="Show the offer" onPress={() => setShown(true)} modes={LIGHT} /></VStack>}
      </Frame></ExampleCard>,
    },
    sizing: {
      header: 'Sizing', title: 'The whole screen',
      description: 'Fullscreen Modal fills its screen and scrolls inside it. The hero text sits at the bottom of a 420 px space by default, the body starts 16 px below it with 16 px between Sections, and the footer stays at the bottom. The close button is 40 px, 12 px from the top and right.',
      body: <Anatomy legend={false} surface="dark" specimenWidth={360} marks={[
        { kind: 'size', target: S.close, side: 'bottom', label: 'both' },
        { kind: 'size', target: S.HERO, side: 'right', label: 'both' },
        { kind: 'gap', from: S.HERO, to: `${S.BODY} > :first-child` },
      ]}><FullscreenModal testID="fm-size" {...OFFER} heroHeight={240} onClose={noop} onPrimaryAction={noop}>{BENEFITS}</FullscreenModal></Anatomy>,
    },
    content: {
      header: 'Content', title: 'An offer in four lines and one action',
      description: 'Use the eyebrow for the product or offer, the headline for the benefit in a few words, one supporting sentence, and the price on its own line. Label the button with the action. Unset lines fall back to the JioFinance+ upgrade copy, so set every line; an empty one hides it.',
      body: <ExampleCard title="Four lines, one action"><Frame><FullscreenModal {...GOLD} onClose={noop} onPrimaryAction={noop} /></Frame></ExampleCard>,
    },
    context: {
      header: 'In context', title: 'An upgrade offer from Profile',
      description: 'Profile opens the offer from its JioFinance+ row. Close takes people back; Upgrade for free starts the upgrade. The screen removes the modal either way.',
      body: <div className="coin-new-context">
        <ScreenFrame size="full" surface={ctxOpen ? 'dark' : 'light'}>
          {ctxOpen
            ? <FullscreenModal {...OFFER} onClose={() => { setCtxOpen(false); setStatus('Closed the offer') }} onPrimaryAction={() => { setCtxOpen(false); setStatus('Upgrade started') }}>{BENEFITS}{PLANS}</FullscreenModal>
            : <VStack modes={LIGHT}>
              <Text modes={LIGHT}>Profile</Text>
              <ListItem layout="Horizontal" modes={LIGHT} title="JioFinance+" supportText="Cashback, JioPoints, and JioGold" onPress={() => setCtxOpen(true)} />
            </VStack>}
        </ScreenFrame>
        <p className="coin-new-readout" role="status">{status}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Readable, complete, and styled',
      description: 'Each pair shows a modal that reads as one message versus one that hides or muddles it.',
      body: <div className="coin-new-stack">
        <DoDont
          good={<Frame><FullscreenModal {...OFFER} onClose={noop} onPrimaryAction={noop}>{BENEFITS}</FullscreenModal></Frame>}
          bad={<Frame><FullscreenModal {...OFFER} heroMedia={HERO_IMAGE} heroHeight={300} onClose={noop} onPrimaryAction={noop} /></Frame>}
          goodTitle="Keep the text on a dark background" badTitle="Put the text over a light photo"
          goodCaption="White hero text needs dark media behind it; here the dark screen stands in." badCaption="The white text gets lost in the image." />
        <DoDont
          good={<Frame><FullscreenModal {...GOLD} onClose={noop} onPrimaryAction={noop} /></Frame>}
          bad={<Frame><FullscreenModal eyebrow="JioGold" headline="Save in gold every month" onClose={noop} onPrimaryAction={noop} /></Frame>}
          goodTitle="Set every line of copy" badTitle="Leave lines unset"
          goodCaption="The JioGold offer reads as one message." badCaption="They fall back to the JioFinance+ upgrade copy." />
        <DoDont
          good={<Frame><FullscreenModal {...OFFER} heroHeight={240} onClose={noop} onPrimaryAction={noop}>{BENEFITS}</FullscreenModal></Frame>}
          bad={<Frame><FullscreenModal {...OFFER} heroHeight={240} onClose={noop} onPrimaryAction={noop}><Wrapped /></FullscreenModal></Frame>}
          goodTitle="Put Sections straight in the body" badTitle="Wrap Sections in your own component"
          goodCaption="They take the modal’s dark styling." badCaption="They miss the styling and stay white cards." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Fullscreen Modal contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="10 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('fullscreenmodal')} stories={[
        { label: 'Default', id: 'components-fullscreenmodal--default' },
        { label: 'Minimal no body', id: 'components-fullscreenmodal--minimal-no-body' },
        { label: 'Lottie hero', id: 'components-fullscreenmodal--lottie-hero' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (5 October build) from the team’s private package repository. In Figma the modal is 1228 px tall with a full-height image behind everything; the package has no background of its own, so this page shows it on a dark screen in place of that image. Its close button is 40 px (28 in Figma) and its hero space 420 px (532 in Figma), and unset copy falls back to the JioFinance+ upgrade text. In Dark mode the hero text turns black, so this page shows Light only. On the web it isn’t announced as a dialog, focus isn’t moved into it or kept there, and Escape does nothing. The published Storybook still shows the old page.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'fullscreenmodal',
    corePrinciple: 'One big moment, one main action, and always a way out.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('fullscreenmodal'),
  }} playground={<>
    <div className="preview-stage">
      <Frame>
        <FullscreenModal {...OFFER} {...footerProps} showClose={close} onClose={() => setAction('Close pressed')} onPrimaryAction={() => setAction('Upgrade for free pressed')}>
          {body ? BENEFITS : null}{body ? PLANS : null}
        </FullscreenModal>
      </Frame>
      <span className="stage-label">Live Coin Fullscreen Modal</span>
    </div>
    <div className="controls-panel">
      <OnOff label="Body" value={body} onChange={setBody} />
      <OnOff label="Footer button" value={footerButton} onChange={setFooterButton} />
      <OnOff label="Disclaimer" value={disclaimer} onChange={setDisclaimer} />
      <OnOff label="Close button" value={close} onChange={setClose} />
      <Readout title="Last action" value={action}>The modal never closes itself: the screen removes it when either button is pressed.</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'fullscreenmodal',
  label: 'Fullscreen Modal',
  summary: 'Use a Fullscreen Modal for a focused, full-screen moment, such as an upgrade offer, with a hero, details, and one main action.',
  keywords: ['full-screen offer', 'takeover', 'upsell screen', 'onboarding screen', 'success screen'],
  icon: <><rect x="4" y="1.5" width="10" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M7 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M9 4.2l.9 1.8 2 .3-1.45 1.4.35 2L9 8.75l-1.8.95.35-2L6.1 6.3l2-.3L9 4.2Z" fill="currentColor" /></>,
  Component: FullscreenModalGuide,
})
