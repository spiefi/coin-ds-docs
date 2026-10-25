import { useState, type ComponentProps, type ReactNode } from 'react'
import { Avatar, ThreadHero, TransactionBubble, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Sources, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1699-6500'
const LIGHT = { 'Color Mode': 'Light' } as Modes
const AV = (initials: string) => <Avatar style="Monogram" monogram={initials} />

type THProps = Partial<ComponentProps<typeof ThreadHero>>
function TH(overrides: THProps = {}) {
  return <ThreadHero modes={LIGHT} renderAvatar={AV('RV')} title="Rahul Verma" subtitle="Banking name: RAHUL KUMAR VERMA" caption="+91 98765 43210" {...overrides} />
}
const COLUMN = (child: ReactNode) => <VStack modes={LIGHT} style={{ width: 240 }}>{child}</VStack>
const LONG = { renderAvatar: AV('VR'), title: 'Venkatasubramanian Ramakrishnan', subtitle: 'Banking name: VENKATASUBRAMANIAN RAMAKRISHNAN', caption: 'venkatasubramanian.r@okjio' }
const SENT = { width: 231, maxWidth: '100%', alignSelf: 'flex-end' } as const
const RECEIVED = { width: 231, maxWidth: '100%', alignSelf: 'flex-start' } as const

const R = ':scope > div'
const AVATAR = `${R} [role="img"]`
const TITLE = `${R} > div:first-child > [role="img"] + [dir="auto"]`
const SUBTITLE = `${R} > div:first-child > [dir="auto"]:last-child`
const CAPTION = `${R} > [dir="auto"]`

function ThreadHeroGuide() {
  const [avatar, setAvatar] = useState(true)
  const [caption, setCaption] = useState(true)

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A portrait over three lines',
      description: 'The avatar sits on top, the name and the banking name close under it, and the caption 8 px below.',
      body: <Anatomy marks={[{ kind: 'gap', from: SUBTITLE, to: CAPTION }]} parts={[
        { name: 'Avatar', note: 'renderAvatar: an Avatar, 42 px; there’s none by default.', target: AVATAR, side: 'left' },
        { name: 'Name', note: 'title, 16 px Semibold; a long name wraps.', target: TITLE, side: 'right' },
        { name: 'Banking name', note: 'subtitle, 12 px grey on one line; it ellipsizes.', target: SUBTITLE, side: 'left' },
        { name: 'Caption', note: 'caption: a phone number or UPI ID; left out, it doesn’t show.', target: CAPTION, side: 'bottom' },
      ]}>{TH()}</Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Avatar and caption',
      description: 'renderAvatar takes an Avatar: the person’s photo, or their initials with style Monogram. There’s no default, so without one the name moves to the top. caption shows only when you pass it, and an empty subtitle hides the banking line. No mode changes the hero’s text. The hero passes its modes to the avatar and replaces the avatar’s own, so set Avatar Size on the hero; Figma uses L, 42 px.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Full" description="Initials, name, banking name, and number.">{TH()}</ExampleCard>
        <ExampleCard title="Without a caption" description="It ends at the banking name.">{TH({ caption: undefined })}</ExampleCard>
        <ExampleCard title="Without an avatar" description="The name moves to the top.">{TH({ renderAvatar: undefined })}</ExampleCard>
        <ExampleCard title="Without a banking name" description="An empty subtitle hides the line.">{TH({ subtitle: '' })}</ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Cut or wrapped',
      description: 'The hero has no states: it doesn’t press, and no part of it is a button. In a narrow column the name wraps, while the banking name and the caption stay on one line and end in an ellipsis; disableTruncation lets them wrap too. Both examples sit in a 240 px column.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Cut" description="The name wraps; the other two lines end in an ellipsis.">{COLUMN(TH(LONG))}</ExampleCard>
        <ExampleCard title="Wrapped" description="Every line wraps.">{COLUMN(TH({ ...LONG, disableTruncation: true }))}</ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'Centred in its column',
      description: 'The hero has no width of its own: its lines centre in the width they get, and Figma draws it 360 px wide. With an avatar and a caption it is 110 px tall: a 42 px avatar, 2 px, a 20 px name, an 18 px banking name, then 8 px and an 18 px caption.',
      body: <Anatomy legend={false} specimenWidth={328} marks={[
        { kind: 'size', target: R, side: 'bottom', label: 'both' },
        { kind: 'gap', from: SUBTITLE, to: CAPTION },
      ]}>{TH()}</Anatomy>,
    },
    content: {
      header: 'Content', title: 'The name people know, then the bank’s',
      description: 'Write title as the name the user knows the person by. Start subtitle with Banking name: and give the name their bank holds, so people can check they’re paying the right person. Use caption for a phone number or UPI ID, not a sentence.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Phone number" description="+91 and ten digits, spaced.">{TH()}</ExampleCard>
        <ExampleCard title="UPI ID" description="Or the ID they’re paid at.">{TH({ caption: 'rahul@okjio' })}</ExampleCard>
      </div>,
    },
    context: {
      header: 'In context', title: 'The top of a payment thread',
      description: 'The hero opens the thread, so people know who they’re paying before they see the payments below it. The thread lays it out; the hero only names the person.',
      body: <div className="coin-new-context">
        <VStack modes={{ ...LIGHT, 'Slot gap': 'XL' } as Modes} alignHorizontal="stretch">
          {TH()}
          <TransactionBubble style={SENT} modes={{ ...LIGHT, 'Transaction Status': 'Paid' } as Modes} description="Paid to Rahul Verma" value="1,200" status="Paid" date="21 Oct 2026" />
          <TransactionBubble style={RECEIVED} modes={{ ...LIGHT, 'Transaction Status': 'Request' } as Modes} description="Request from Rahul Verma" value="450" status="Requested" date="Today" />
        </VStack>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'The person, not their number',
      description: 'Each pair shows a hero people recognise at once next to one that makes them work out who it is.',
      body: <div className="coin-new-stack">
        <DoDont good={TH()} bad={TH({ title: '+91 98765 43210', caption: undefined })} goodTitle="The name people know" goodCaption="Then the banking name, labelled." badTitle="The phone as the title" badCaption="The title is the person; the number goes in caption." />
        <DoDont good={TH()} bad={TH({ renderAvatar: <Avatar /> })} goodTitle="Initials without a photo" goodCaption="A Monogram avatar with their initials." badTitle="The default avatar" badCaption="An Avatar with no photo shows a stranger’s portrait." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Thread Hero contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="25 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('threadhero')} stories={[
        { label: 'Default', id: 'components-threadhero--default' },
        { label: 'Without caption', id: 'components-threadhero--without-caption' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (23 October build of Biscuit’s main) from the team’s private package repository. Figma’s Thread Hero has <code>Title</code>, <code>Subtitle</code>, and <code>Caption</code> text properties, a <code>caption</code> switch, and a nested Avatar, drawn 360 px wide. The package takes <code>title</code>, <code>subtitle</code>, <code>caption</code>, and <code>renderAvatar</code>: with no <code>renderAvatar</code> there’s no avatar, and the caption shows only when you pass one. The title wraps, as in Figma, though Storybook’s page says it ellipsizes. The hero replaces the avatar’s own modes, and both Storybook stories pass Avatar props that don’t exist, so they show the Avatar’s stock photo (reported).</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'threadhero', corePrinciple: 'The person first, then the name their bank knows.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('threadhero'),
  }} playground={<>
    <div className="preview-stage">
      {TH({ renderAvatar: avatar ? AV('RV') : undefined, caption: caption ? '+91 98765 43210' : undefined })}
      <span className="stage-label">Live Coin Thread Hero</span>
    </div>
    <div className="controls-panel">
      <OnOff label="renderAvatar" value={avatar} onChange={setAvatar} />
      <OnOff label="caption" value={caption} onChange={setCaption} />
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'threadhero',
  label: 'Thread Hero',
  summary: 'Use a Thread Hero at the top of a payment or chat thread to show who the other person is: their name, banking name, and number.',
  keywords: ['contact header', 'payee', 'person header', 'chat header', 'thread header'],
  icon: <><circle cx="9" cy="5.5" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M5 12h8M6.5 15h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /></>,
  Component: ThreadHeroGuide,
})
