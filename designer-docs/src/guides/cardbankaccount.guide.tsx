import { useState, type ComponentProps, type ReactNode } from 'react'
import { Badge, CardBankAccount, Title, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, Segment, Sources, docsUrl } from '../guide-kit'
import { defineGuide } from './define'
import jioLogo from '../assets/jio-gold-logo.png'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3762-2459'
const LIGHT = { 'Color Mode': 'Light' } as Modes
const noop = () => {}
const FRAME = { width: '100%', maxWidth: 292 } as const

const ROWS = [
  { label: 'Account type', value: 'Savings' },
  { label: 'Account number', value: '•••• 4521' },
  { label: 'Last updated', value: 'Today, 9:14 AM' },
]
const ACTIVE = <Badge label="Active" modes={{ 'Semantic Intent': 'System', AppearanceSystem: 'positive' } as Modes} />

type CBAProps = ComponentProps<typeof CardBankAccount>
type BAOpts = {
  badge?: CBAProps['badge']; footer?: CBAProps['footer']; modes?: Modes
  items?: { label: string; value: string }[]; logo?: boolean; onButtonPress?: () => void
}
const BA = ({ badge, footer, modes = LIGHT, items = ROWS, logo = true, onButtonPress = noop }: BAOpts): ReactNode => {
  const common = {
    institutionName: 'Jio Payments Bank', badge, items, buttonLabel: 'View statement', onButtonPress, footer, modes,
    style: FRAME, accessibilityLabel: 'Jio Payments Bank savings account ending 4521',
  }
  return logo ? <CardBankAccount {...common} institutionAvatar={jioLogo} /> : <CardBankAccount {...common} />
}

const R = ':scope > div'
const P = {
  header: `${R} > div:first-child`,
  institution: `${R} > div:first-child > div:first-child`,
  badge: `${R} > div:first-child > div:nth-child(2)`,
  rows: `${R} > div:nth-child(2)`,
  label: `${R} > div:nth-child(2) > div:first-child > div:first-child`,
  value: `${R} > div:nth-child(2) > div:first-child > [dir="auto"]:last-child`,
  button: `${R} > button`,
}

const BRANDS = ['Secondary', 'Primary', 'Neutral', 'Tertiary'] as const
const EMPHASES = ['High', 'Medium', 'Low'] as const

function CardBankAccountGuide() {
  const [badge, setBadge] = useState(true)
  const [footer, setFooter] = useState(true)
  const [brand, setBrand] = useState<(typeof BRANDS)[number]>('Secondary')
  const [emphasis, setEmphasis] = useState<(typeof EMPHASES)[number]>('Medium')
  const [last, setLast] = useState('None')
  const [opened, setOpened] = useState(false)

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'The bank, its facts, and one action',
      description: 'A white panel stacks a header with the bank’s logo, its name, and an optional badge; a list of label and value rows; and one footer button. You set them through props: institutionName, institutionAvatar, badge, items, and buttonLabel.',
      body: <Anatomy specimenWidth={292} parts={[
        { name: 'Institution', note: 'institutionName and institutionAvatar: the bank’s logo and name.', target: P.institution, side: 'left' },
        { name: 'Badge', note: 'badge: one word about the account, such as its status.', target: P.badge, side: 'top' },
        { name: 'Label', note: 'A field name in 14 px bold; it wraps when space runs out.', target: P.label, side: 'left' },
        { name: 'Value', note: 'The fact in 14 px, on one line.', target: P.value, side: 'right' },
        { name: 'Button', note: 'A small Button from buttonLabel and onButtonPress, full width.', target: P.button, side: 'bottom' },
        { name: 'Panel', note: 'A white panel with 16 px corners and 16 by 12 px padding.', target: R, side: 'bottom', at: 0.15 },
      ]}>
        {BA({ badge: ACTIVE })}
      </Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'A badge, and the button’s colours',
      description: 'badge takes a word, which becomes a Badge in the button’s colours, or a Badge you set up yourself, such as a green status; leave it out for none. AppearanceBrand and Emphasis colour the footer button and a word badge; the defaults, Secondary at Medium emphasis, are light purple. The panel and the rows don’t change. headerSlot replaces the whole header, children replace the rows, and footer replaces the button.',
      body: <div className="coin-new-stack">
        <div className="coin-new-example-grid">
          <ExampleCard title="Word badge" description="A word becomes a Badge in the button’s colours.">{BA({ badge: 'Active' })}</ExampleCard>
          <ExampleCard title="Status badge" description="A Badge with Semantic Intent System and AppearanceSystem positive turns green.">{BA({ badge: ACTIVE })}</ExampleCard>
          <ExampleCard title="No badge" description="Leave badge out; the bank’s name has the row.">{BA({})}</ExampleCard>
        </div>
        <div className="coin-new-example-grid">
          <ExampleCard title="Secondary (default)" description="A light purple button and badge.">{BA({ badge: 'Active', modes: LIGHT })}</ExampleCard>
          <ExampleCard title="Primary" description="Light gold.">{BA({ badge: 'Active', modes: { ...LIGHT, AppearanceBrand: 'Primary' } as Modes })}</ExampleCard>
          <ExampleCard title="Neutral" description="A dark grey button and a light grey badge.">{BA({ badge: 'Active', modes: { ...LIGHT, AppearanceBrand: 'Neutral' } as Modes })}</ExampleCard>
          <ExampleCard title="Tertiary" description="A blue button and a light blue badge.">{BA({ badge: 'Active', modes: { ...LIGHT, AppearanceBrand: 'Tertiary' } as Modes })}</ExampleCard>
        </div>
        <div className="coin-new-example-grid">
          <ExampleCard title="Emphasis High" description="Solid purple, the strongest call.">{BA({ badge: 'Active', modes: { ...LIGHT, Emphasis: 'High' } as Modes })}</ExampleCard>
          <ExampleCard title="Emphasis Medium (default)" description="Light purple.">{BA({ badge: 'Active', modes: LIGHT })}</ExampleCard>
          <ExampleCard title="Emphasis Low" description="A text button and a pale badge.">{BA({ badge: 'Active', modes: { ...LIGHT, Emphasis: 'Low' } as Modes })}</ExampleCard>
        </div>
      </div>,
    },
    states: {
      header: 'States', title: 'Only the button responds',
      description: 'The card itself isn’t pressable: the footer button is its one action, with the Button’s own hover and pressed colours. footer={false} removes it for a summary to read. The card can’t disable its button.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="With an action" description="View statement is the card’s one action.">{BA({ badge: ACTIVE })}</ExampleCard>
        <ExampleCard title="Read only" description="No button: a summary to read.">{BA({ badge: ACTIVE, footer: false })}</ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'Your screen sets the width',
      description: 'The card fills its host’s width; Figma draws it at 292 px. Height follows the rows: each is 17 px, 12 px apart. The panel is padded 16 px top and bottom and 12 px at the sides, with 16 px between the header, the rows, and the button. Button / Size S, the default, is 32 px tall; M is 42 and XS 24. Avatar Size L makes the logo 42 px. List Item Style Minimal tightens the rows to 4 px apart with 12 px regular labels.',
      body: <div className="coin-new-stack">
        <Anatomy legend={false} specimenWidth={292} marks={[
          { kind: 'size', target: R, side: 'bottom', label: 'both' },
          { kind: 'padding', target: R },
          { kind: 'gap', from: P.header, to: P.rows },
        ]}>
          {BA({ badge: ACTIVE })}
        </Anatomy>
        <div className="coin-new-example-grid">
          <ExampleCard title="Button / Size M" description="A 42 px button.">{BA({ badge: ACTIVE, modes: { ...LIGHT, 'Button / Size': 'M' } as Modes })}</ExampleCard>
          <ExampleCard title="Button / Size XS" description="A 24 px button.">{BA({ badge: ACTIVE, modes: { ...LIGHT, 'Button / Size': 'XS' } as Modes })}</ExampleCard>
          <ExampleCard title="List Item Style Minimal" description="Rows 4 px apart, labels 12 px regular.">{BA({ badge: ACTIVE, modes: { ...LIGHT, 'List Item Style': 'Minimal' } as Modes })}</ExampleCard>
        </div>
      </div>,
    },
    content: {
      header: 'Content', title: 'Field names and short facts',
      description: 'Label each row with a field name, such as Account type, and give the fact as its value. Show only the last four digits of the account number. Keep values short: a value never shrinks, so a long one squeezes its label. Label the button with a verb, such as View statement, and pass the bank’s own logo.',
      body: <ExampleCard title="Four facts" description="Field names on the left, short facts on the right, the number masked.">
        {BA({ badge: ACTIVE, items: [ROWS[0], ROWS[1], { label: 'IFSC', value: 'JIOP0000001' }, ROWS[2]] })}
      </ExampleCard>,
    },
    context: {
      header: 'In context', title: 'Linked accounts in Settings',
      description: 'The Bank accounts screen shows the linked account. View statement opens the screen’s own statement view through onButtonPress; the card doesn’t fetch the account or change it.',
      body: <div className="coin-new-context">
        <VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes}>
          <Title title="Bank accounts" subtitle="Used for UPI payments and transfers" modes={LIGHT} />
          {BA({ badge: ACTIVE, onButtonPress: () => setOpened(true) })}
        </VStack>
        <p className="coin-new-readout" role="status">{opened ? 'Opened the statement for •••• 4521' : 'Statement not opened'}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Safe, recognisable, readable',
      description: 'Each pair shows a card people trust at a glance next to one that exposes the number, shows a stranger, or squeezes its labels.',
      body: <div className="coin-new-stack">
        <DoDont good={BA({})} bad={BA({ items: [ROWS[0], { label: 'Account number', value: '123456784521' }, ROWS[2]] })}
          goodTitle="Mask the account number" goodCaption="Only the last four digits show."
          badTitle="The full account number" badCaption="Anyone near the screen can read it." />
        <DoDont good={BA({})} bad={BA({ logo: false })}
          goodTitle="Pass the bank’s logo" goodCaption="institutionAvatar shows the bank’s own mark."
          badTitle="Leave out the logo" badCaption="The card falls back to a stranger’s photo." />
        <DoDont good={BA({})} bad={BA({ items: [{ label: 'Account type', value: 'Savings account with auto-sweep' }, ROWS[1], ROWS[2]] })}
          goodTitle="Short values" goodCaption="Each label and value fits on one line."
          badTitle="A sentence as a value" badCaption="The value never shrinks, so its label is squeezed into a narrow column." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Card Bank Account contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="19 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('cardbankaccount')} stories={[
        { label: 'Default', id: 'components-cardbankaccount--default' },
        { label: 'Savings', id: 'components-cardbankaccount--savings' },
        { label: 'Without badge', id: 'components-cardbankaccount--without-badge' },
        { label: 'Custom badge', id: 'components-cardbankaccount--with-custom-badge' },
        { label: 'Without footer', id: 'components-cardbankaccount--without-footer' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (16 October build) from the team’s private package repository. Figma’s Card / BankAccount is one 292 px component with no properties; in code it fills its host and you set it through props. Figma’s badge is amber, while the package’s takes the button’s colours (Secondary at Medium emphasis by default), and its row values are 14 px where Figma’s are 12 px. Without <code>institutionAvatar</code> the card shows a stock photo of a person, without other props it shows placeholder copy, and a long value squeezes its label (all reported). The published Storybook still shows the older generated page, and its Default story is gold (AppearanceBrand Primary) while the others are purple.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'cardbankaccount',
    corePrinciple: 'One account, a few facts, one action.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('cardbankaccount'),
  }} playground={<>
    <div className="preview-stage">
      {BA({
        badge: badge ? 'Active' : undefined, footer: footer ? undefined : false,
        modes: { ...LIGHT, AppearanceBrand: brand, Emphasis: emphasis } as Modes,
        onButtonPress: () => setLast('View statement pressed'),
      })}
      <span className="stage-label">Live Coin Card Bank Account</span>
    </div>
    <div className="controls-panel">
      <OnOff label="badge" value={badge} onChange={setBadge} />
      <OnOff label="footer" value={footer} onChange={setFooter} />
      <Segment label="AppearanceBrand" value={brand} options={BRANDS} onChange={setBrand} />
      <Segment label="Emphasis" value={emphasis} options={EMPHASES} onChange={setEmphasis} />
      <Readout title="Last action" value={last}>
        Only the footer button acts; the card itself isn’t pressable.
      </Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'cardbankaccount',
  label: 'Card Bank Account',
  summary: 'Use a Card Bank Account to summarise one linked bank account: the bank, a few facts such as the masked number, and one action.',
  keywords: ['bank account card', 'linked account', 'account summary', 'account details'],
  icon: <><path d="M3 7.5 9 4l6 3.5M4 15h10M5.5 8.5v4.5M9 8.5v4.5M12.5 8.5v4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /></>,
  Component: CardBankAccountGuide,
})
