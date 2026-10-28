import { useState, type ComponentProps, type ReactNode } from 'react'
import { AmountInput, Button, MerchantProfile, MoneyValue, NoteInput, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Segment, Sources, docsUrl } from '../guide-kit'
import { defineGuide } from './define'
import JIO from '../assets/jio-gold-logo.png'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1516-1103'
const M = (m: Record<string, string> = {}) => ({ 'Color Mode': 'Light', ...m }) as Modes
const LIGHT = M()
const AMOUNT = { 'Color Mode': 'Light', Context3: 'Amount Input' } as Modes
const INITIALS = (m: string) => ({ style: 'Monogram' as const, monogram: m })
const R = ':scope > [role="heading"]'
const AVATAR = `${R} > [role="img"]`
const NAME = `${R} > :nth-child(2)`
const SUBTITLE = `${R} > :nth-child(3)`

type MPProps = Partial<ComponentProps<typeof MerchantProfile>>
const MP = (props: MPProps = {}) => <MerchantProfile modes={LIGHT} title="Jio Gold" subtitle="UPI ID: jiogold@jio" avatarProps={{ imageSource: JIO }} {...props} />
const COL = (child: ReactNode, width = 328) => <VStack modes={LIGHT} style={{ width, maxWidth: '100%' }}>{child}</VStack>

function MerchantProfileGuide() {
  const [avatar, setAvatar] = useState<'imageSource' | 'Monogram'>('imageSource')
  const [size, setSize] = useState<'L' | 'M' | 'S'>('L')
  const [subtitle, setSubtitle] = useState(true)
  const [note, setNote] = useState('')
  const [paid, setPaid] = useState(false)

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A logo over two lines',
      description: 'The avatar sits on top, then the merchant’s name and their UPI ID, each 12 px apart and centred.',
      body: <Anatomy specimenWidth={328} marks={[{ kind: 'gap', from: AVATAR, to: NAME }]} parts={[
        { name: 'Avatar', note: 'avatarProps: the merchant’s logo, or initials with style Monogram.', target: AVATAR, side: 'left' },
        { name: 'Name', note: 'title: the registered name, 16 px Bold; it wraps.', target: NAME, side: 'right' },
        { name: 'UPI ID', note: 'subtitle, 12 px under the name; it wraps too.', target: SUBTITLE, side: 'bottom' },
      ]}>{MP()}</Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'The avatar and two lines',
      description: 'avatarProps goes to the Avatar: an imageSource for the merchant’s logo, or style Monogram with their initials. Avatar Size sets the avatar, 42 px at L; no mode changes the text. Leave title or subtitle out and it shows sample text, so hide the subtitle with an empty one.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Logo" description="imageSource: the merchant’s own logo.">{COL(MP())}</ExampleCard>
        <ExampleCard title="Initials" description="style Monogram with two letters.">{COL(MP({ title: 'Amazon Pay', subtitle: 'UPI ID: amazonpay@apl', avatarProps: INITIALS('AP') }))}</ExampleCard>
        <ExampleCard title="Avatar Size M" description="A 36 px avatar; S is 29 px.">{COL(MP({ modes: M({ 'Avatar Size': 'M' }) }))}</ExampleCard>
        <ExampleCard title="No subtitle" description="An empty subtitle hides the line.">{COL(MP({ subtitle: '' }))}</ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Wrapped, never cut',
      description: 'The profile has no states: it doesn’t press. In a narrow column both lines wrap and stay centred, and neither ends in an ellipsis, though Figma cuts a long UPI ID. Both examples sit in a 240 px column.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Long name" description="The name wraps onto three lines.">{COL(MP({ title: 'HDFC Bank Limited Corporate Banking Services India', subtitle: 'UPI ID: hdfccorp@hdfcbank', avatarProps: INITIALS('HB') }), 240)}</ExampleCard>
        <ExampleCard title="Long UPI ID" description="The UPI ID wraps too.">{COL(MP({ title: 'Swiggy', subtitle: 'UPI ID: swiggy.instamart.payments@axisbank', avatarProps: INITIALS('SW') }), 240)}</ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'Centred in its column',
      description: 'The profile has no width of its own: it fills its column, keeps 16 px clear at each side, and centres its lines; Figma draws it 360 px wide. With a one-line name it’s 102 px tall: a 42 px avatar, 12 px, a 20 px name, 12 px, and a 16 px UPI ID. Figma’s name lines are 18 px.',
      body: <Anatomy legend={false} specimenWidth={328} marks={[{ kind: 'size', target: R, side: 'bottom', label: 'both' }, { kind: 'padding', target: R }, { kind: 'gap', from: AVATAR, to: NAME }]}>{MP()}</Anatomy>,
    },
    content: {
      header: 'Content', title: 'The registered name, then the UPI ID',
      description: 'Write title as the merchant’s registered name, the one their bank holds, so people know who they’re paying. Start subtitle with UPI ID: and give the ID they’re paying, so they can check it.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Registered name" description="The company’s full name.">{COL(MP({ title: 'Uber India Systems Private Limited', subtitle: 'UPI ID: uberindia@ybl', avatarProps: INITIALS('UI') }))}</ExampleCard>
        <ExampleCard title="Labelled ID" description="“UPI ID:” before the ID people pay.">{COL(MP())}</ExampleCard>
      </div>,
    },
    context: {
      header: 'In context', title: 'Before people pay',
      description: 'A payment screen opens with the merchant, so people know who they’re paying before they enter the amount. The screen lays out the rest and sends the payment.',
      body: <div className="coin-new-context">
        <VStack modes={{ ...LIGHT, 'Slot gap': 'XL' } as Modes} alignHorizontal="stretch">
          {MP()}
          <AmountInput modes={AMOUNT} moneyValueSlot={<MoneyValue value="1,200" currency="₹" modes={AMOUNT} />}
            noteInputSlot={<NoteInput value={note} onChangeText={setNote} accessibilityLabel="Add note" modes={AMOUNT} />} />
          <Button label="Pay ₹1,200" onPress={() => setPaid(true)} modes={LIGHT} />
        </VStack>
        <p className="coin-new-readout" role="status">{paid ? 'Paid ₹1,200 to Jio Gold' : 'Paying Jio Gold, UPI ID jiogold@jio'}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'The right merchant, nothing borrowed',
      description: 'Each pair shows a profile people can trust next to one that shows someone else’s details.',
      body: <div className="coin-new-stack">
        <DoDont goodTitle="A logo or initials" goodCaption="Pass the merchant’s logo, or their initials." good={COL(MP({ title: 'Amazon Pay', subtitle: 'UPI ID: amazonpay@apl', avatarProps: INITIALS('AP') }))}
          badTitle="No avatarProps" badCaption="The Avatar falls back to a stranger’s photo." bad={COL(MP({ title: 'Amazon Pay', subtitle: 'UPI ID: amazonpay@apl', avatarProps: undefined }))} />
        <DoDont goodTitle="An empty subtitle to hide it" goodCaption="subtitle=&quot;&quot; leaves just the name." good={COL(MP({ subtitle: '' }))}
          badTitle="Leaving subtitle out" badCaption="It shows the sample UPI ID, uberindia@ybl." bad={COL(MP({ subtitle: undefined }))} />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Merchant Profile contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="28 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('merchantprofile')} stories={[
        { label: 'Default', id: 'components-merchantprofile--default' },
        { label: 'Short name', id: 'components-merchantprofile--short-name' },
        { label: 'Long name', id: 'components-merchantprofile--long-name' },
        { label: 'Without subtitle', id: 'components-merchantprofile--without-subtitle' },
        { label: 'Multiple profiles', id: 'components-merchantprofile--multiple-profiles' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (27 October build of Biscuit’s main) from the team’s private package repository. Figma’s Merchant Profile is one component, 360 × 118, with <code>Title</code> and <code>Subtitle</code> text properties and a nested Avatar showing the merchant’s logo. The package takes <code>title</code>, <code>subtitle</code>, and <code>avatarProps</code>: a left-out line shows sample text, and the Avatar shows a stock photo until you pass a logo or initials. The name’s lines are 20 px, not 18, and a long UPI ID wraps where Figma cuts it. <code>accessibilityLabel</code> does nothing, and the whole profile is a heading (reported).</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'merchantprofile',
    corePrinciple: 'Who you’re paying, before how much.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('merchantprofile'),
  }} playground={<>
    <div className="preview-stage">
      {COL(MP({ modes: M({ 'Avatar Size': size }), subtitle: subtitle ? 'UPI ID: jiogold@jio' : '', avatarProps: avatar === 'imageSource' ? { imageSource: JIO } : INITIALS('JG') }))}
      <span className="stage-label">Live Coin Merchant Profile</span>
    </div>
    <div className="controls-panel">
      <Segment label="avatarProps" value={avatar} options={['imageSource', 'Monogram'] as const} onChange={setAvatar} />
      <Segment label="Avatar Size" value={size} options={['L', 'M', 'S'] as const} onChange={setSize} />
      <OnOff label="subtitle" value={subtitle} onChange={setSubtitle} />
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'merchantprofile',
  label: 'Merchant Profile',
  summary: 'Use a Merchant Profile at the top of a payment to show who is being paid: the merchant’s logo, registered name, and UPI ID.',
  keywords: ['merchant header', 'payee', 'business profile', 'UPI merchant', 'shop header'],
  icon: <><path d="M3 7.5 4.5 3h9L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" /><path d="M4 7.5v7.5h10V7.5M7.5 15v-3.5h3V15" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" /></>,
  Component: MerchantProfileGuide,
})
