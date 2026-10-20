import { useState, type ComponentProps } from 'react'
import { Button, Divider, ListItem, ProfileCard, Text, Title, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, FitWidth, OnOff, Readout, Segment, Sources, docsUrl } from '../guide-kit'
import { defineGuide } from './define'
import jioLogo from '../assets/jio-gold-logo.png'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=6914-38498'
const LIGHT = { 'Color Mode': 'Light' } as Modes
const PREMIUM = { 'Color Mode': 'Light', 'Profile Card Appearance': 'Premium' } as Modes
const S = { 'Button / Size': 'S' } as Modes
const noop = () => {}

const R = ':scope > div'
const HEADER = `${R} > div:nth-child(1)`
const LEADING = `${R} > div:nth-child(1) > div > div:first-child`
const AVATAR = `${LEADING} > div:first-child [role="img"]`
const BADGE = `${LEADING} > div:last-child [role="img"]`
const TEXT = `${R} > div:nth-child(1) > div > div:last-child`
const NAME = `${TEXT} > div:first-child > [dir="auto"]`
const HANDLES_SEL = `${TEXT} > div:last-child`
const DIVIDER = `${R} > [role="presentation"]`
const FIRST_ROW = `${R} > :nth-child(3)`

type PCProps = Partial<ComponentProps<typeof ProfileCard>>
type Appearance = 'Default' | 'Premium'

const HANDLES = (onCopy: () => void = noop) => [
  { label: 'priya@jio', iconName: 'ic_copy', onPress: onCopy },
  { label: '98765 43210', iconName: 'ic_confirm' },
]

const BODY = (onUpgrade: () => void = noop, onAccounts: () => void = noop) => <>
  <ListItem layout="Horizontal" title="JioFinance+" showSupportText={false} navArrow={false} trailing={<Button label="Upgrade" onPress={onUpgrade} modes={S} />} />
  <Divider />
  <ListItem layout="Horizontal" title="Linked bank accounts" showSupportText={false} onPress={onAccounts} />
</>

const BODY_DARK = <>
  <ListItem layout="Horizontal" title="Credit score" supportText="Updated today" navArrow={false} trailing={<Button label="Check" onPress={noop} modes={S} />} />
  <Divider />
  <Text>Member since 2021</Text>
</>

const PC = (overrides: PCProps = {}) => <ProfileCard name="Priya Sharma" monogram="PS" upiHandles={HANDLES()} modes={LIGHT} {...overrides} />
const Fit = (overrides: PCProps = {}) => <FitWidth>{PC(overrides)}</FitWidth>

function ProfileCardGuide() {
  const [appearance, setAppearance] = useState<Appearance>('Default')
  const [body, setBody] = useState(true)
  const [badge, setBadge] = useState(true)
  const [last, setLast] = useState('None')
  const [copied, setCopied] = useState(false)
  const [action, setAction] = useState('No action yet')

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'Who, how to pay them, and what’s below',
      description: 'A navy panel holds a header row, the avatar with its QR badge beside the name and the UPI handles, and, when you pass children, a divider and the body rows.',
      body: <Anatomy specimenWidth={344} parts={[
        { name: 'Avatar', note: 'monogram, or a photo from avatarSource, 42 px.', target: AVATAR, side: 'left' },
        { name: 'QR badge', note: 'badgeIcon on a white disc; null removes it.', target: BADGE, side: 'bottom' },
        { name: 'Name', note: 'name, 14 px bold, on one line.', target: NAME, side: 'top' },
        { name: 'UPI handles', note: 'upiHandles: a pill each; onPress makes a pill a button.', target: HANDLES_SEL, side: 'right' },
        { name: 'Divider', note: 'Drawn only when there’s a body; showDivider hides it.', target: DIVIDER, side: 'left' },
        { name: 'Body', note: 'children: your rows, given the card’s on-dark modes.', target: FIRST_ROW, side: 'right' },
        { name: 'Panel', note: 'A navy panel, 12 px corners, 20 px padding, 344 px wide.', target: R, side: 'left', at: 0.9 },
      ]}>{PC({ children: BODY() })}</Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'A header, a body, and a gold option',
      description: 'name, monogram, and upiHandles make the header. avatarSource shows a photo in place of the initials, badgeIcon={null} removes the QR badge, and upiHandles={[]} leaves just the name. children is the body, under a divider; leave it out for a header-only card. header replaces the avatar, name, and handles together. Profile Card Appearance Premium turns the panel gold. The card passes its on-dark modes to everything inside, so ListItem titles, icons, chevrons, and Buttons turn white or gold on their own; plain Text and support text don’t.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Header only" description="No children: no divider and no body.">{Fit()}</ExampleCard>
        <ExampleCard title="With a body" description="Account rows under a divider.">{Fit({ children: BODY() })}</ExampleCard>
        <ExampleCard title="Premium" description="Profile Card Appearance Premium: a gold panel.">{Fit({ modes: PREMIUM })}</ExampleCard>
        <ExampleCard title="Premium with a body" description="The rows’ titles and Buttons follow the gold.">{Fit({ children: BODY(), modes: PREMIUM })}</ExampleCard>
        <ExampleCard title="Photo" description="avatarSource in place of initials, here a business’s logo.">{Fit({ name: 'Jio Gold', avatarSource: jioLogo, upiHandles: [{ label: 'jiogold@jio', iconName: 'ic_copy', onPress: noop }] })}</ExampleCard>
        <ExampleCard title="Name only" description="No QR badge and no handles.">{Fit({ badgeIcon: null, upiHandles: [] })}</ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Handles you can press',
      description: 'The card itself isn’t pressable. A handle with onPress is a button that shrinks a little while pressed, usually to copy it; one without is plain text. Body rows keep their own states, such as a ListItem with onPress. There’s no selected, disabled, or loading state.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Copy a handle" description="Press priya@jio: its onPress copies it.">
          {Fit({ upiHandles: HANDLES(() => setCopied(true)) })}
          <p className="coin-new-readout" role="status">{copied ? 'Copied priya@jio' : 'Nothing copied'}</p>
        </ExampleCard>
        <ExampleCard title="Text handle" description="Without onPress, a handle is plain text.">{Fit({ upiHandles: [{ label: '98765 43210', iconName: 'ic_confirm' }] })}</ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: '344 px, or the host’s width',
      description: 'The card is 344 px wide, as Figma draws it; width takes another number, or a percentage such as \'100%\' to fill its host. Height follows the content: 20 px of padding, and 12 px between the header, the divider, and each body row. A long name ends in …, and the handles wrap onto another line.',
      body: <div className="coin-new-stack">
        <Anatomy legend={false} specimenWidth={344} marks={[
          { kind: 'size', target: R, side: 'bottom', label: 'both' },
          { kind: 'padding', target: R },
          { kind: 'gap', from: HEADER, to: DIVIDER },
        ]}>{PC({ children: BODY() })}</Anatomy>
        <div className="coin-new-example-grid">
          <ExampleCard title="Fills its host" description="width '100%' fills a 360 px host."><div className="coin-new-host wide">{PC({ width: '100%' })}</div></ExampleCard>
          <ExampleCard title="Long name and handle" description="The name ends in …, and the handles wrap.">{Fit({ name: 'Shruti Chandarshekhar Rai Venkataraman', monogram: 'SR', upiHandles: [{ label: 'shrutichandarshekhar.rai@okjio', iconName: 'ic_copy' }, { label: '98765 43210', iconName: 'ic_confirm' }] })}</ExampleCard>
        </div>
      </div>,
    },
    content: {
      header: 'Content', title: 'A name, initials, and handles as people type them',
      description: 'name is the person’s display name, and monogram their two initials. A handle’s label is the UPI ID or the phone number exactly as people would type it: use ic_copy on a handle people copy and ic_confirm on a verified number. Keep body rows to short titles, with one Button or a chevron each.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Two handles" description="A UPI ID to copy and a verified number.">{Fit()}</ExampleCard>
        <ExampleCard title="Short rows" description="A title with a Button, and a title with a chevron.">{Fit({ children: BODY() })}</ExampleCard>
      </div>,
    },
    context: {
      header: 'In context', title: 'The Profile screen',
      description: 'The card heads the Profile screen. Copying a handle and opening a row are the screen’s own work, through each handle’s and row’s onPress; the card only lays them out.',
      body: <div className="coin-new-context">
        <FitWidth><VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes}>
          <Title title="Profile" subtitle="Your account and payments" modes={LIGHT} />
          {PC({ upiHandles: HANDLES(() => setAction('Copied priya@jio')), children: BODY(() => setAction('Opened the JioFinance+ upgrade'), () => setAction('Opened linked bank accounts')) })}
        </VStack></FitWidth>
        <p className="coin-new-readout" role="status">{action}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Light rows, short handles, the card’s own style',
      description: 'Each pair shows a card that reads on its navy panel next to one that hides its text, lets a handle run past the panel, or covers it.',
      body: <div className="coin-new-stack">
        <DoDont good={Fit({ children: BODY() })} bad={Fit({ children: BODY_DARK })} goodTitle="Titles and Buttons in the body" badTitle="Support text or plain Text in the body" goodCaption="They turn white and gold on the navy panel." badCaption="They stay dark and almost disappear." />
        <DoDont good={Fit()} bad={Fit({ upiHandles: [{ label: 'Tap to copy my UPI ID priya@jio and pay me back', iconName: 'ic_copy' }] })} goodTitle="Short handles" badTitle="A sentence as a handle" goodCaption="Each fits its pill." badCaption="It never ends in …, so the pill runs past the panel." />
        <DoDont good={Fit({ children: BODY() })} bad={Fit({ children: BODY(), modes: { ...LIGHT, 'List Item Style': 'Boxed' } as Modes })} goodTitle="The card’s own row style" badTitle="List Item Style Boxed" goodCaption="Rows sit on the navy panel." badCaption="White boxes cover the header and rows, and the name disappears." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Profile Card contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="20 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('profilecard')} stories={[
        { label: 'Default', id: 'components-profilecard--default' },
        { label: 'Premium', id: 'components-profilecard--premium' },
        { label: 'Header only', id: 'components-profilecard--header-only' },
        { label: 'Pressable handles', id: 'components-profilecard--pressable-handles' },
        { label: 'With image avatar', id: 'components-profilecard--with-image-avatar' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (19 October build of Biscuit’s main) from the team’s private package repository. Figma’s Profile Card has one property, the body slot; the name, handles, badge, and photo are overrides there, and Premium is a variable mode. The card gives its children on-dark modes, but plain Text and ListItem support text stay dark on the navy panel, as in Figma’s own sample, and a child’s own modes override the card’s. The header is 48 px tall where Figma’s is 47, and the QR glyph is near-black, not grey. List Item Style Boxed covers the card in white boxes, and a long handle never ends in …, so its pill runs past the card. The published Storybook is older than the installed package and still shows the older generated page (all reported).</Sources>,
    },
  }

  return <ComponentGuideTemplate
    metadata={{ slug: 'profilecard', corePrinciple: 'Who you are, and the handles you share.', figmaUrl: FIGMA, storybookUrl: docsUrl('profilecard') }}
    playground={<>
      <div className="preview-stage">
        <FitWidth>{PC({
          upiHandles: HANDLES(() => setLast('Copied priya@jio')),
          children: body ? BODY(() => setLast('Upgrade pressed'), () => setLast('Opened Linked bank accounts')) : undefined,
          badgeIcon: badge ? undefined : null,
          modes: { ...LIGHT, 'Profile Card Appearance': appearance } as Modes,
        })}</FitWidth>
        <span className="stage-label">Live Coin Profile Card</span>
      </div>
      <div className="controls-panel">
        <Segment label="Profile Card Appearance" value={appearance} options={['Default', 'Premium'] as const} onChange={setAppearance} />
        <OnOff label="children" value={body} onChange={setBody} />
        <OnOff label="badgeIcon" value={badge} onChange={setBadge} />
        <Readout title="Last press" value={last}>Only the pressable handle and the body rows act; the card itself doesn’t.</Readout>
      </div>
    </>}
    sections={sections}
  />
}

export default defineGuide({
  slug: 'profilecard',
  label: 'Profile Card',
  summary: 'Use a Profile Card to show who the user is on a dark panel: initials or a photo, a name, UPI handles, and account rows below.',
  keywords: ['profile header', 'identity card', 'UPI ID', 'account card', 'jioPlus card'],
  icon: <><rect x="2.5" y="3" width="13" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.5" fill="none" /><circle cx="6.5" cy="7.5" r="1.75" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M9.75 7h3M9.75 9.5h2M5.5 12h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /></>,
  Component: ProfileCardGuide,
})
