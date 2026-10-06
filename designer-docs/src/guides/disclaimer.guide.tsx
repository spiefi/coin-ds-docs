import { useState, type ReactNode } from 'react'
import { ActionFooter, Button, Disclaimer, Link, Stack, SupportText, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, Readout, Sources, byTestId, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=208-2399'
const LIGHT = { 'Color Mode': 'Light' } as Modes
const ERROR = { 'Color Mode': 'Light', Status: 'Error' } as Modes
const BANK = 'Payment and UPI services are provided by\nJio Payments Bank Pvt. Ltd.'
const TERMS = 'By continuing you agree to the terms for this payment.'
const LONG = 'Mutual fund investments are subject to market risks. Read all scheme-related documents carefully before investing. Past performance does not guarantee future returns. Payment and UPI services are provided by Jio Payments Bank Pvt. Ltd.'

function Host({ children }: { children: ReactNode }) {
  return <div className="coin-new-host wide"><VStack modes={LIGHT} style={{ width: '100%' }}>{children}</VStack></div>
}

function DisclaimerGuide() {
  const [copy, setCopy] = useState('All financial services are provided by Jio Payments Bank Pvt. Ltd.')
  const [paid, setPaid] = useState(false)
  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'Small print in a narrow column',
      description: 'One string of 10 px grey text, centred line by line. The column grows with the copy up to 281 px, then the text wraps.',
      body: <Anatomy parts={[
        { name: 'Copy', note: 'One string; a line break is the only formatting it takes.', target: `${byTestId('disclaimer-anatomy')} > div`, side: 'top' },
        { name: 'Column', note: 'Grows with the copy up to 281 px, then wraps.', target: byTestId('disclaimer-anatomy'), side: 'left' },
      ]} marks={[{ kind: 'size', target: byTestId('disclaimer-anatomy'), side: 'bottom', label: 'both' }]}>
        <Disclaimer testID="disclaimer-anatomy" disclaimer={BANK} modes={LIGHT} />
      </Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'The copy is the only choice',
      description: 'Disclaimer has no variants, icon, or size. Write the copy for the screen; without it, the package shows a generic Jio Payments Bank line.',
      body: <div className="coin-new-example-grid three">
        <ExampleCard title="Figma copy" description="A line break before the bank’s name keeps it on one line, as in Figma."><Host><Disclaimer disclaimer={BANK} modes={LIGHT} /></Host></ExampleCard>
        <ExampleCard title="Screen terms" description="Say what continuing means for this screen."><Host><Disclaimer disclaimer={TERMS} modes={LIGHT} /></Host></ExampleCard>
        <ExampleCard title="Package default" description="Without copy it shows “All financial services…”, which differs from Figma."><Host><Disclaimer modes={LIGHT} /></Host></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Static text, no states',
      description: 'Disclaimer isn’t interactive: it has no hover, pressed, focus, or disabled style, and Tab skips it. Inside a full-screen modal footer, the modal turns it light grey to suit its dark surface.',
      body: <ExampleCard title="Read-only" description="Only the copy changes."><Host><Disclaimer disclaimer={BANK} modes={LIGHT} /></Host></ExampleCard>,
    },
    sizing: {
      header: 'Sizing', title: 'Up to 281 px wide, 12 px a line',
      description: 'The column hugs short copy and stops at 281 px, even on wider screens. Each line adds 12 px. Place it in a vertical stack so it centres; a stack that stretches its children pins it to the left.',
      body: <div className="coin-new-stack">
        <Anatomy legend={false} marks={[{ kind: 'size', target: byTestId('disclaimer-size'), side: 'bottom', label: 'both' }]}>
          <Disclaimer testID="disclaimer-size" modes={LIGHT} />
        </Anatomy>
        <div className="coin-new-example-grid">
          <ExampleCard title="Short copy hugs" description="“Terms apply.” is 64 px wide and one line."><Host><Disclaimer disclaimer="Terms apply." modes={LIGHT} /></Host></ExampleCard>
          <ExampleCard title="Long copy wraps" description="At 281 px this copy takes five lines, 60 px of small print."><Host><Disclaimer disclaimer={LONG} modes={LIGHT} /></Host></ExampleCard>
        </div>
      </div>,
    },
    content: {
      header: 'Content', title: 'Say who provides it, in a sentence',
      description: 'Name the provider or the condition in one or two short sentences. Put the full terms on their own page and add a Link below; the copy can’t hold links or bold text.',
      body: <ExampleCard title="Link below the copy"><Host><Disclaimer disclaimer={TERMS} modes={LIGHT} /><Link text="View terms" textAlign="Center" onPress={() => {}} modes={LIGHT} /></Host></ExampleCard>,
    },
    context: {
      header: 'In context', title: 'Under a payment action',
      description: 'A payment footer holds the Pay button and, below it, the provider line. The footer passes its modes to both; the screen handles the payment.',
      body: <div className="coin-new-context">
        <ActionFooter modes={LIGHT} title="Confirm payment">
          <Stack layoutDirection="vertical" modes={LIGHT}>
            <Button label="Pay ₹500" modes={LIGHT} onPress={() => setPaid(true)} />
            <Disclaimer disclaimer={BANK} modes={LIGHT} />
          </Stack>
        </ActionFooter>
        <p className="coin-new-readout" role="status">{paid ? 'Payment of ₹500 confirmed' : 'Ready to pay ₹500'}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Keep small print small and legal',
      description: 'Each pair shows a disclaimer people can read versus one that hides something.',
      body: <div className="coin-new-stack">
        <DoDont goodTitle="Break before the bank’s name" goodCaption="The provider’s name stays on one line." good={<Host><Disclaimer disclaimer={BANK} modes={LIGHT} /></Host>}
          badTitle="Let the name split" badCaption="The default copy breaks the bank’s name across two lines." bad={<Host><Disclaimer modes={LIGHT} /></Host>} />
        <DoDont goodTitle="Keep it to a sentence or two" goodCaption="Two lines are read at a glance." good={<Host><Disclaimer disclaimer={TERMS} modes={LIGHT} /></Host>}
          badTitle="Paste the full terms" badCaption="Five or more lines of 10 px text go unread." bad={<Host><Disclaimer disclaimer={LONG} modes={LIGHT} /></Host>} />
        <DoDont goodTitle="Use Support Text for problems" goodCaption="A red message tells people what to fix." good={<Host><SupportText modes={ERROR} status="Error" label="UPI limit reached. Try a smaller amount." /></Host>}
          badTitle="Put problems in small print" badCaption="Grey 10 px text hides an error." bad={<Host><Disclaimer disclaimer="UPI limit reached. Try a smaller amount." modes={LIGHT} /></Host>} />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Disclaimer contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="6 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('disclaimer')} stories={[
        { label: 'Default', id: 'components-disclaimer--default' }, { label: 'Custom copy', id: 'components-disclaimer--custom-copy' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> from the team’s private package repository. Figma’s Disclaimer is one 281 × 24 component with no properties, and the package matches its type and width; their default copy differs. The copy is a single string: links and formatting are not supported. On the web the text reads as plain text, and <code>accessibilityLabel</code> has no effect. In the installed package Dark mode turns the text orange, so this page shows Light only.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'disclaimer',
    corePrinciple: 'Small print that says who stands behind the action, in one or two lines.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('disclaimer'),
  }} playground={<>
    <div className="preview-stage">
      <Host><Disclaimer disclaimer={copy} modes={LIGHT} /></Host>
      <span className="stage-label">Live Coin Disclaimer</span>
    </div>
    <div className="controls-panel">
      <label className="text-control"><span>Copy</span><input value={copy} onChange={event => setCopy(event.target.value)} maxLength={240} /></label>
      <Readout title="Length" value={`${copy.length} characters`}>It wraps at 281 px, about 50 characters a line, and never truncates.</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'disclaimer',
  label: 'Disclaimer',
  summary: 'Use a Disclaimer for one short legal line under an action, such as who provides a payment service.',
  keywords: ['fine print', 'legal line', 'terms', 'small print'],
  icon: <path d="M3.5 7.5h11M6 11.5h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />,
  Component: DisclaimerGuide,
})
