import { useState, type ComponentProps } from 'react'
import { DebitCard, Image, Title, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, FitWidth, OnOff, Readout, Segment, Sources, docsUrl } from '../guide-kit'
import { defineGuide } from './define'
import jioLogo from '../assets/jio-gold-logo.png'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2766-25'
const LIGHT = { 'Color Mode': 'Light' } as Modes
const noop = () => {}

const LOGO = <Image imageSource={jioLogo} width={29} height={29} />
const BASE = { bankName: 'JioFinance', cardType: 'Debit', cardNumber: '•••• 4821', cardholderName: 'Priya Sharma', expireDate: '09/29', bankLogoSlot: LOGO, modes: LIGHT }
const SBI = { ...LIGHT, 'DebitCard brand': 'SBI' } as Modes

type DCProps = Partial<ComponentProps<typeof DebitCard>>
function DC(overrides: DCProps = {}) {
  return <DebitCard {...BASE} {...overrides} />
}
const Fit = (overrides: DCProps = {}) => <FitWidth>{DC(overrides)}</FitWidth>

const R = ':scope > div'
const HEADER = `${R} > div:nth-child(1)`
const BANK = `${R} > div:nth-child(1) > div:first-child`
const TYPE = `${R} > div:nth-child(1) > div:last-child`
const ART = `${R} > div:nth-child(2)`
const NUMBER = `${R} > div:nth-child(3) > [dir="auto"]:first-child`
const NAME = `${R} > div:nth-child(3) > div:last-child > [dir="auto"]:first-child`
const EXPIRY = `${R} > div:nth-child(3) > div:last-child > [dir="auto"]:last-child`

function DebitCardGuide() {
  const [type, setType] = useState<'Debit' | 'Credit'>('Debit')
  const [brand, setBrand] = useState<'JFS' | 'SBI'>('JFS')
  const [logo, setLogo] = useState(true)
  const [presses, setPresses] = useState(0)
  const [opened, setOpened] = useState<string | null>(null)

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A card face in three bands',
      description: 'The bank and the card type sit at the top, the art strip runs across the middle, and the number, cardholder, and expiry fill the bottom.',
      body: <Anatomy parts={[
        { name: 'Bank', note: 'bankLogoSlot, then bankName.', target: BANK, side: 'top' },
        { name: 'Card type', note: 'cardType, then providerLogoSlot (empty here).', target: TYPE, side: 'top' },
        { name: 'Card art', note: 'The package’s art strip, 50 px tall; cardArtSource replaces it.', target: ART, side: 'left' },
        { name: 'Card number', note: 'cardNumber, shown exactly as you pass it.', target: NUMBER, side: 'left' },
        { name: 'Cardholder', note: 'cardholderName; a long name wraps.', target: NAME, side: 'bottom' },
        { name: 'Expiry', note: 'expireDate, as MM/YY.', target: EXPIRY, side: 'bottom' },
        { name: 'Card', note: '328 × 224 with 16 px corners; DebitCard brand sets its colour.', target: R, side: 'right', at: 0.6 },
      ]}>{DC()}</Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Type, logo, art, and brand',
      description: 'cardType is free text: write Debit or Credit, and nothing else changes. bankLogoSlot puts your bank’s mark before its name, and providerLogoSlot puts a network mark after the type; the package ships neither. The art strip is the package’s own: cardArtSource replaces it with your picture, and showArt={false} removes it while the card keeps its 224 px. The DebitCard brand mode colours the card: JFS gold with dark text by default, or SBI purple with white text. No other mode changes it.',
      body: <div className="coin-new-stack">
        <div className="coin-new-example-grid">
          <ExampleCard title="Debit" description="The bank’s mark and name, then the card type.">{Fit()}</ExampleCard>
          <ExampleCard title="Credit" description="Only the word changes.">{Fit({ cardType: 'Credit', cardNumber: '•••• 7350' })}</ExampleCard>
          <ExampleCard title="Without a bank logo" description="The top band keeps Figma’s 73 px.">{Fit({ bankLogoSlot: undefined })}</ExampleCard>
          <ExampleCard title="Without the art" description="showArt={false} removes the strip; the card stays 224 px tall.">{Fit({ showArt: false })}</ExampleCard>
          <ExampleCard title="DebitCard brand SBI" description="A purple card with white text.">{Fit({ modes: SBI })}</ExampleCard>
        </div>
      </div>,
    },
    states: {
      header: 'States', title: 'A picture, or a button',
      description: 'Without onPress the card is a picture: it doesn’t press, and screen readers read its text. onPress makes the whole card one button, named by its bank, type, and number unless you set accessibilityLabel. A pressable card dims while pressed, and disabled stops it and dims it to half. The card doesn’t flip, freeze, or show a CVV.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Picture" description="No onPress: nothing to press.">{Fit()}</ExampleCard>
        <ExampleCard title="Button" description="The whole card presses and dims while you press it.">{Fit({ onPress: noop, accessibilityLabel: 'Debit card, JioFinance, ending 4821' })}</ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'Always 328 × 224',
      description: 'The card is a fixed 328 × 224, as in Figma, and doesn’t grow or shrink with its host or its text. The top band has 16 px of padding above and 28 px below; the art strip is 50 px tall; the details sit 16 px apart with 20 px at the sides. The top band is 73 px with or without a 29 px bank logo; a taller logo makes it taller.',
      body: <Anatomy legend={false} marks={[
        { kind: 'size', target: R, side: 'bottom', label: 'both' },
        { kind: 'size', target: ART, side: 'right', label: 'both' },
        { kind: 'padding', target: HEADER },
      ]}>{DC()}</Anatomy>,
    },
    content: {
      header: 'Content', title: 'Masked, short, as printed',
      description: 'Write bankName as the issuer and cardType as Debit or Credit. Mask cardNumber to its last four digits, and write expireDate as MM/YY. Give cardholderName as it appears on the card. When the card presses, set accessibilityLabel to the type, bank, and last four, such as Debit card, JioFinance, ending 4821, never the full number.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Masked number" description="Four dots, then the last four digits.">{Fit()}</ExampleCard>
        <ExampleCard title="Long name" description="The name wraps to a second line beside the expiry.">{Fit({ cardholderName: 'Venkatasubramanian Ramakrishnan' })}</ExampleCard>
      </div>,
    },
    context: {
      header: 'In context', title: 'The cards on a profile screen',
      description: 'The screen lists the cards the user holds. Each card’s onPress opens its details on the screen; the card only shows the plastic.',
      body: <div className="coin-new-context">
        <FitWidth>
          <VStack modes={{ ...LIGHT, 'Slot gap': 'M', Padding: 'None' } as Modes} style={{ width: 328 }}>
            <Title title="Your cards" subtitle="2 cards" modes={LIGHT} />
            {DC({ onPress: () => setOpened('Debit •••• 4821'), accessibilityLabel: 'Debit card, JioFinance, ending 4821' })}
            {DC({ cardType: 'Credit', cardNumber: '•••• 7350', onPress: () => setOpened('Credit •••• 7350'), accessibilityLabel: 'Credit card, JioFinance, ending 7350' })}
          </VStack>
        </FitWidth>
        <p className="coin-new-readout" role="status">{opened ? `Opened ${opened}` : 'No card opened'}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'A masked number and short labels',
      description: 'Each pair shows a card face that keeps the number private and reads cleanly next to one that exposes it or cuts a label.',
      body: <div className="coin-new-stack">
        <DoDont good={Fit()} bad={Fit({ cardNumber: '4111 1111 1111 4821' })} goodTitle="Mask the number" goodCaption="Only the last four digits show." badTitle="The full number" badCaption="The card shows it exactly as passed." />
        <DoDont good={Fit()} bad={Fit({ bankName: 'JioFinance Payments Bank', cardType: 'Debit Platinum Select' })} goodTitle="Short bank and type" goodCaption="Both fit the top band." badTitle="Long names" badCaption="Each ends in an ellipsis, so the card type is lost." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Debit Card contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="28 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('debitcard')} stories={[
        { label: 'Default', id: 'components-debitcard--default' },
        { label: 'Credit card', id: 'components-debitcard--credit-card' },
        { label: 'No card art', id: 'components-debitcard--no-card-art' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (27 October build of Biscuit’s main) from the team’s private package repository. Figma’s Debit Card exposes <code>cardholderName</code>, <code>cardNumber</code>, and <code>expireDate</code>; its bank and network logos are nested instances, and its brand is a variable mode. The package ships no logos; the top band keeps Figma’s 73 px without one. On the SBI brand the text is white. <code>cardArtSource</code> replaces the art strip and <code>showArt={false}</code> removes it, though the art doesn’t change with the brand. Long bank or type text ends in an ellipsis, and a pressable card dims while pressed. Every published Storybook story renders the card as a button, and the published page is the older generated one (all reported).</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'debitcard', corePrinciple: 'The card in their wallet, never the full number.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('debitcard'),
  }} playground={<>
    <div className="preview-stage">
      <FitWidth>{DC({
        cardType: type,
        cardNumber: type === 'Credit' ? '•••• 7350' : '•••• 4821',
        bankLogoSlot: logo ? LOGO : undefined,
        modes: { ...LIGHT, 'DebitCard brand': brand } as Modes,
        onPress: () => setPresses((n) => n + 1),
      })}</FitWidth>
      <span className="stage-label">Live Coin Debit Card</span>
    </div>
    <div className="controls-panel">
      <Segment label="cardType" value={type} options={['Debit', 'Credit'] as const} onChange={setType} />
      <Segment label="DebitCard brand" value={brand} options={['JFS', 'SBI'] as const} onChange={setBrand} />
      <OnOff label="bankLogoSlot" value={logo} onChange={setLogo} />
      <Readout title="Presses" value={String(presses)}>With onPress the whole card is one button. Without it, the card is a picture.</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'debitcard',
  label: 'Debit Card',
  summary: 'Use a Debit Card to show a card the user already holds: its bank, type, last four digits, cardholder, and expiry.',
  keywords: ['card face', 'payment card', 'credit card', 'bank card', 'plastic', 'card art'],
  icon: <><rect x="1.5" y="4" width="15" height="10.5" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M1.5 7.5h15M4.5 11.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /></>,
  Component: DebitCardGuide,
})
