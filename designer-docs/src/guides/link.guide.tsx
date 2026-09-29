import { useState, type ReactNode } from 'react'
import { Button, Card, HStack, Link, Text, TextSegment, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, Segment, Sources, Specimen, SpecimenRow, byTestId, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=6981-5'
const LIGHT = { 'Color Mode': 'Light' } as Modes
const noop = () => {}

type Layout = 'Fill' | 'Hug'
type Align = 'Left' | 'Center'
type TextSize = 'Small' | 'Medium' | 'Large'

function Host({ children }: { children: ReactNode }) {
  return <div className="coin-new-host wide"><VStack modes={LIGHT} style={{ flex: 1 }}>{children}</VStack></div>
}

function Sentence({ onTerms = noop, onPrivacy = noop }: { onTerms?: () => void; onPrivacy?: () => void }) {
  return <TextSegment modes={LIGHT}>
    <Text modes={LIGHT}>By continuing you agree to our </Text>
    <Link modes={LIGHT} onPress={onTerms}>Terms</Link>
    <Text modes={LIGHT}> and </Text>
    <Link modes={LIGHT} onPress={onPrivacy}>Privacy Policy</Link>
    <Text modes={LIGHT}>.</Text>
  </TextSegment>
}

function LinkGuide() {
  const [layout, setLayout] = useState<Layout>('Fill')
  const [align, setAlign] = useState<Align>('Left')
  const [textSize, setTextSize] = useState<TextSize>('Medium')
  const [disabled, setDisabled] = useState(false)
  const [presses, setPresses] = useState(0)
  const [status, setStatus] = useState('Nothing opened yet')

  const note = disabled ? 'Disabled links ignore presses.'
    : layout === 'Fill' ? 'With Fill, the whole row responds to a press.' : 'With Hug, only the words respond to a press.'

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'An underlined label',
      description: 'Link is a single run of text in the same colour as the copy around it. The Text Sizes mode sets its size, and it is always underlined.',
      body: <Anatomy specimenWidth={180} marks={[{ kind: 'outline', target: '[role="link"]' }]} parts={[
        { name: 'Label', note: 'Says where the link goes; its size follows the Text Sizes mode.', target: '[role="link"]', side: 'top', at: 0.2 },
        { name: 'Underline', note: 'Always on; it is the cue that the words can be pressed.', target: '[role="link"]', side: 'bottom', at: 0.2 },
        { name: 'Pressable width', note: 'With Fill, the link spans its parent, so the whole row responds to a press.', target: '[role="link"]', side: 'right' },
      ]}><VStack modes={LIGHT}><Link text="Forgot PIN?" modes={LIGHT} onPress={noop} /></VStack></Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Choose the width and alignment',
      description: 'Fill stretches the link across its parent, the only width where Center has room to work. Hug keeps it to its words. Inside a sentence, the link flows with the copy.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Fill, left" description="The default. The label starts at the left and the whole row is pressable."><Host><Link text="Forgot PIN?" modes={LIGHT} onPress={noop} /></Host></ExampleCard>
        <ExampleCard title="Fill, centred" description="Centres the label, for example under a full-width button."><Host><Link text="Forgot PIN?" textAlign="Center" modes={LIGHT} onPress={noop} /></Host></ExampleCard>
        <ExampleCard title="Hug" description="Only the words are pressable, for a link in a row beside other content."><Host><HStack modes={LIGHT} alignVertical="center" justifyHorizontal="space-between"><Text modes={LIGHT}>Recent transactions</Text><Link text="View all" autolayout="Hug" modes={LIGHT} onPress={noop} /></HStack></Host></ExampleCard>
        <ExampleCard title="In a sentence" description="Inside a TextSegment the link wraps with the copy and takes its colour and size."><Host><Sentence /></Host></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Enabled and disabled',
      description: 'Disable a link only while it briefly can’t be used, such as Resend code during a countdown. Links have no pressed, hover, or visited style.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Enabled" description="Full-strength text with its underline."><Host><Link text="Resend code" modes={LIGHT} onPress={noop} /></Host></ExampleCard>
        <ExampleCard title="Disabled" description="Dimmed to 40% and ignores presses."><Host><Link text="Resend code" disabled modes={LIGHT} onPress={noop} /></Host></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'The parent sets the width; the type sets the height',
      description: 'A Fill link is as wide as its parent and a Hug link as wide as its words. Its height is one line of type: 16, 17, or 24 px for Small, Medium, and Large. Long labels wrap onto more lines.',
      body: <Anatomy legend={false} marks={[
        { kind: 'outline', target: '[data-testid^="link-"]', each: true },
        { kind: 'size', target: `${byTestId('link-fill')} [role="link"]`, side: 'top', label: 'both' },
        { kind: 'size', target: `${byTestId('link-hug')} [role="link"]`, side: 'top', label: 'both' },
      ]}><SpecimenRow>
        <Specimen caption="Fill"><VStack testID="link-fill" modes={LIGHT} style={{ width: 200 }}><Link text="Forgot PIN?" modes={LIGHT} onPress={noop} /></VStack></Specimen>
        <Specimen caption="Hug"><VStack testID="link-hug" modes={LIGHT} style={{ width: 200 }}><Link text="Forgot PIN?" autolayout="Hug" modes={LIGHT} onPress={noop} /></VStack></Specimen>
      </SpecimenRow></Anatomy>,
    },
    content: {
      header: 'Content', title: 'Say where it goes',
      description: 'Write a short label in sentence case that names the destination or task, such as “Forgot PIN?” or “View all transactions”. In a sentence, link only the words that name the destination and keep the punctuation outside. Avoid vague labels such as “Click here”.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="On its own line"><Host>
          <Link text="Forgot PIN?" modes={LIGHT} onPress={noop} />
          <Link text="View all transactions" modes={LIGHT} onPress={noop} />
          <Link text="Need help?" modes={LIGHT} onPress={noop} />
        </Host></ExampleCard>
        <ExampleCard title="In a sentence"><Host><TextSegment modes={LIGHT}>
          <Text modes={LIGHT}>Interest rates change often. </Text>
          <Link modes={LIGHT} onPress={noop}>See today’s rates</Link>
          <Text modes={LIGHT}>.</Text>
        </TextSegment></Host></ExampleCard>
      </div>,
    },
    context: {
      header: 'In context', title: 'Terms and help on a confirmation card',
      description: 'The screen opens the Terms, Privacy Policy, or help when a link is pressed; Link only reports the press. The main action stays a Button.',
      body: <div className="coin-new-context">
        <Card modes={LIGHT}><VStack modes={LIGHT}>
          <Sentence onTerms={() => setStatus('Terms opened')} onPrivacy={() => setStatus('Privacy Policy opened')} />
          <Button label="Continue" modes={LIGHT} onPress={() => setStatus('Continue pressed')} />
          <Link text="Need help?" textAlign="Center" modes={LIGHT} onPress={() => setStatus('Help opened')} />
        </VStack></Card>
        <p className="coin-new-readout" role="status">{status}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Keep links clear and secondary',
      description: 'Each pair shows a link people can find and act on versus one that misleads them.',
      body: <div className="coin-new-stack">
        <DoDont goodTitle="Link only the destination" goodCaption="Only “Terms” and “Privacy Policy” are underlined, so people know what opens."
          badTitle="Link the whole sentence" badCaption="A fully underlined sentence hides what will open."
          good={<Host><Sentence /></Host>}
          bad={<Host><TextSegment modes={LIGHT}><Link modes={LIGHT} onPress={noop}>By continuing you agree to our Terms and Privacy Policy.</Link></TextSegment></Host>} />
        <DoDont goodTitle="Centre with Fill" goodCaption="The Fill link centres its label under the button."
          badTitle="Centre with Hug" badCaption="A Hug link has no room to centre, so it stays at the left."
          good={<Host><Button label="Continue" modes={LIGHT} onPress={noop} /><Link text="Need help?" textAlign="Center" modes={LIGHT} onPress={noop} /></Host>}
          bad={<Host><Button label="Continue" modes={LIGHT} onPress={noop} /><Link text="Need help?" textAlign="Center" autolayout="Hug" modes={LIGHT} onPress={noop} /></Host>} />
        <DoDont goodTitle="Keep the main action a Button" goodCaption="Continue stands out, and the link offers a way out."
          badTitle="Make the main action a link" badCaption="A 17 px underlined line is easy to miss and hard to tap."
          good={<Host><Button label="Continue" modes={LIGHT} onPress={noop} /><Link text="Not now" textAlign="Center" modes={LIGHT} onPress={noop} /></Host>}
          bad={<Host><Link text="Continue" textAlign="Center" modes={LIGHT} onPress={noop} /><Link text="Not now" textAlign="Center" modes={LIGHT} onPress={noop} /></Host>} />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Link contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="29 September 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('link')} stories={[
        { label: 'Default', id: 'components-link--default' },
        { label: 'Inside Text Segment', id: 'components-link--inside-text-segment' },
        { label: 'Disabled', id: 'components-link--disabled' },
        { label: 'Truncated', id: 'components-link--truncated' },
        { label: 'With children', id: 'components-link--with-children' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.77</code> from the team’s private package repository. Figma has three variants (Left and Fill, Left and Hug, Center and Fill) and no disabled variant; the package adds <code>disabled</code>. The screen handles navigation in <code>onPress</code>; Link has no web address or target. On the web, Enter does not activate a focused link, and a disabled link can still be focused and is not announced as disabled.</Sources>,
    },
  }

  const liveModes = { ...LIGHT, 'Text Sizes': textSize } as Modes
  return <ComponentGuideTemplate metadata={{
    slug: 'link',
    corePrinciple: 'Links take people somewhere. Keep the screen’s main action a Button.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('link'),
  }} playground={<>
    <div className="preview-stage">
      <Host><Link text="Forgot PIN?" autolayout={layout} textAlign={align} disabled={disabled} modes={liveModes} onPress={() => setPresses(count => count + 1)} /></Host>
      <span className="stage-label">Live Coin Link</span>
    </div>
    <div className="controls-panel">
      <Segment label="Autolayout" value={layout} options={['Fill', 'Hug'] as const} onChange={setLayout} />
      <Segment label="Text align" value={align} options={['Left', 'Center'] as const} onChange={setAlign} />
      <Segment label="Text size" value={textSize} options={['Small', 'Medium', 'Large'] as const} onChange={setTextSize} />
      <OnOff label="Disabled" value={disabled} onChange={setDisabled} />
      <Readout title="Presses" value={presses}>{note}</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'link',
  label: 'Link',
  summary: 'Use a Link to send people to related content, such as terms, help, or a recovery step, on its own line or inside a sentence.',
  keywords: ['hyperlink', 'text link', 'inline link', 'anchor'],
  icon: <path d="M7.5 10.5l3-3M8.5 5.5l1.3-1.3a2.8 2.8 0 0 1 4 4l-1.3 1.3M9.5 12.5l-1.3 1.3a2.8 2.8 0 0 1-4-4l1.3-1.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />,
  Component: LinkGuide,
})
