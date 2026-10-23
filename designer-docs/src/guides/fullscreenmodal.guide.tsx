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
    headline: `${T} > div:first-child > [role="heading"]`,
    supporting: `${T} > div:nth-child(2)`,
    price: `${T} > div:nth-child(3)`,
    BODY: `${R} > div:first-child > div > div > div:nth-child(2)`,
    footer: `${R} [role="toolbar"]`,
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
      description: 'Centred hero text sits at the bottom of a space reserved for hero media, on the modal’s own black surface. Your Sections follow and scroll; the footer stays at the bottom with the main button, and a close button floats top right.',
      body: <Anatomy surface="dark" specimenWidth={360} parts={[
        { name: 'Eyebrow', note: 'A short line above the headline, such as the product name.', target: A.eyebrow, side: 'left' },
        { name: 'Headline', note: '29 px heavy; the heading, and the modal’s name for screen readers.', target: A.headline, side: 'left' },
        { name: 'Supporting text', note: 'One sentence of detail.', target: A.supporting, side: 'right' },
        { name: 'Price line', note: 'Optional; the price or the offer.', target: A.price, side: 'right' },
        { name: 'Body', note: 'Your Sections, styled for the dark modal.', target: A.BODY, side: 'left' },
        { name: 'Footer', note: 'The main button, with an optional disclaimer.', target: A.footer, side: 'bottom' },
        { name: 'Close button', note: 'Shown when the screen handles it, which closes the modal.', target: A.close, side: 'top' },
      ]}><FullscreenModal testID="fm-anatomy" {...OFFER} heroHeight={260} onClose={noop} onPrimaryAction={noop}>{BENEFITS}</FullscreenModal></Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Hero, body, and footer',
      description: 'Set the hero copy, add Sections for the details, and choose the footer’s button and disclaimer. Hero media fills the width behind the hero text, and heroHeight sets how much space the text sits at the bottom of.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Hero, body, and footer" description="The full layout: Sections scroll under the hero, and the footer stays at the bottom."><Frame><FullscreenModal {...OFFER} onClose={noop} onPrimaryAction={noop}>{BENEFITS}{PLANS}</FullscreenModal></Frame></ExampleCard>
        <ExampleCard title="Without a body" description="Hero text and one button make a confirmation screen."><Frame><FullscreenModal eyebrow="JioFinance+" headline="You’re all set" supportingText="Your benefits are active on every linked account." priceText="" primaryActionLabel="Done" disclaimer="" onClose={noop} onPrimaryAction={noop} /></Frame></ExampleCard>
        <ExampleCard title="Shorter hero" description="A lower heroHeight brings the body up; the text stays at the bottom of its space."><Frame><FullscreenModal {...OFFER} heroHeight={240} onClose={noop} onPrimaryAction={noop}>{BENEFITS}</FullscreenModal></Frame></ExampleCard>
        <ExampleCard title="With hero media" description="Media fills the width at its own ratio behind the hero and the body, and scrolls with them; keep the text off light areas."><Frame><FullscreenModal {...OFFER} heroMedia={HERO_IMAGE} heroHeight={460} onClose={noop} onPrimaryAction={noop}>{BENEFITS}</FullscreenModal></Frame></ExampleCard>
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
      description: 'Fullscreen Modal fills its screen and scrolls inside it. The hero text sits at the bottom of a 532 px space by default, the body starts 16 px below it with 16 px between Sections, and the footer stays at the bottom. The close button is 28 px, 12 px from the top and right.',
      body: <Anatomy legend={false} surface="dark" specimenWidth={360} marks={[
        { kind: 'size', target: S.close, side: 'bottom', label: 'both' },
        { kind: 'size', target: S.HERO, side: 'right', label: 'both' },
        { kind: 'gap', from: S.HERO, to: `${S.BODY} > :first-child` },
      ]}><FullscreenModal testID="fm-size" {...OFFER} heroHeight={240} onClose={noop} onPrimaryAction={noop}>{BENEFITS}</FullscreenModal></Anatomy>,
    },
    content: {
      header: 'Content', title: 'An offer in four lines and one action',
      description: 'Use the eyebrow for the product or offer, the headline for the benefit in a few words, one supporting sentence, and the price on its own line. Label the button with the action. A line you leave unset doesn’t show.',
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
          goodCaption="The modal’s own black surface keeps the white text readable." badCaption="The white text gets lost in the image." />
        <DoDont
          good={<Frame><FullscreenModal {...GOLD} onClose={noop} onPrimaryAction={noop} /></Frame>}
          bad={<Frame><FullscreenModal {...GOLD} headline="" onClose={noop} onPrimaryAction={noop} /></Frame>}
          goodTitle="Write a headline" badTitle="Leave the headline out"
          goodCaption="It’s the modal’s heading and names it for screen readers." badCaption="The offer has no heading, and screen readers get no name for the modal." />
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
      body: <Sources checked="23 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('fullscreenmodal')} stories={[
        { label: 'Default', id: 'components-fullscreenmodal--default' },
        { label: 'Minimal no body', id: 'components-fullscreenmodal--minimal-no-body' },
        { label: 'Lottie hero', id: 'components-fullscreenmodal--lottie-hero' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (23 October build) from the team’s private package repository. In Figma the modal is 1228 px tall with a full-height image behind everything; in the package it has its own black surface, so the hero text reads without media, and media you add sits behind the hero and the body. As in Figma, its hero space is 532 px and its close button 28 px. The close button shows only when the screen handles it, and copy you leave unset stays empty. On the web it’s a dialog named by its headline, which is a heading. When it has a close button, focus moves into it, Tab stays inside, Escape closes it, and focus returns when it’s removed. The examples here have one, so this page opens scrolled to its last example and Tab can’t leave it (#392). The published Storybook predates this build.</Sources>,
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
