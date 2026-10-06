import { useState, type ReactNode } from 'react'
import { Button, Card, ExpandableCheckbox, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, FitWidth, OnOff, Readout, Segment, Sources, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=4514-5767'
const LIGHT = { 'Color Mode': 'Light' } as Modes
const noop = () => {}
const SHORT = { label: 'I agree', linkLabel: 'Terms & Conditions', onLinkPress: noop }
const KYC = 'I agree to share my KYC details with Jio Payments Bank to verify my identity and open this account.'
const LONG = { label: KYC, linkLabel: 'Terms', onLinkPress: noop }

function Host({ children }: { children: ReactNode }) {
  return <div className="coin-new-host wide"><VStack modes={LIGHT} style={{ width: '100%' }}>{children}</VStack></div>
}

function ExpandableCheckboxGuide() {
  const [copy, setCopy] = useState<'Short' | 'Long'>('Long')
  const [expanded, setExpanded] = useState(false)
  const [checked, setChecked] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [kycChecked, setKycChecked] = useState(false)
  const [kycExpanded, setKycExpanded] = useState(false)
  const [waChecked, setWaChecked] = useState(false)
  const [waExpanded, setWaExpanded] = useState(false)
  const [started, setStarted] = useState(false)

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'A checkbox row with its own toggle',
      description: 'The checkbox item holds the box, the consent label, and an optional link to the document. Read more sits at the end of the row and only opens or closes the text.',
      body: <Anatomy specimenWidth={328} parts={[
        { name: 'Checkbox', note: 'Ticking it gives consent; the label and row tick it too.', target: '[role="checkbox"] [role="checkbox"]', side: 'left' },
        { name: 'Label', note: 'The consent phrase, cut to one line with an ellipsis when long.', target: '[role="checkbox"] [dir="auto"]', side: 'top' },
        { name: 'Terms link', note: 'Opens the document; pressing it doesn’t tick the box.', target: '[role="link"]', side: 'bottom' },
        { name: 'Read more', note: 'Shows the full text; it never ticks the box.', target: 'button', side: 'right' },
      ]}><ExpandableCheckbox {...SHORT} modes={LIGHT} /></Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Copy, link, and how much shows',
      description: 'Write the consent as the label and name the document in the link. When Idle, the label shows one line by default; show two when the first line alone doesn’t make sense.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Figma’s row" description="“I agree” with the Terms link, as in Figma."><Host><ExpandableCheckbox {...SHORT} modes={LIGHT} /></Host></ExampleCard>
        <ExampleCard title="Long consent" description="One line and an ellipsis; the link moves to its own line."><Host><ExpandableCheckbox {...LONG} modes={LIGHT} /></Host></ExampleCard>
        <ExampleCard title="Two lines" description="More of the consent shows before Read more."><Host><ExpandableCheckbox {...LONG} collapsedLines={2} modes={LIGHT} /></Host></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Checked and Open are separate',
      description: 'Ticking the box doesn’t open the text, and Read more doesn’t tick the box. Disabled dims the row and also stops it opening. In 0.1.78 on the web, an open sentence longer than the row is cut off instead of wrapping.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Idle" description="The default: unticked, one line, Read more."><Host><ExpandableCheckbox {...LONG} modes={LIGHT} /></Host></ExampleCard>
        <ExampleCard title="Checked" description="A purple box records consent; the text stays collapsed."><Host><ExpandableCheckbox {...LONG} defaultChecked modes={LIGHT} /></Host></ExampleCard>
        <ExampleCard title="Open" description="The text opens above Read less, which moves to the right."><Host><ExpandableCheckbox {...LONG} defaultExpanded modes={LIGHT} /></Host></ExampleCard>
        <ExampleCard title="Disabled" description="Dimmed; it can’t be ticked, unticked, or opened."><Host><ExpandableCheckbox {...LONG} disabled defaultChecked modes={LIGHT} /></Host></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'Full width, 24 px when Idle',
      description: 'The row fills its container. Idle it is 24 px tall, with Read more hugging the end 8 px after the checkbox item. Open, Read less sits 8 px below the text, and text taller than 450 px scrolls inside the row.',
      body: <div className="coin-new-stack">
        <Anatomy legend={false} specimenWidth={328} marks={[
          { kind: 'size', target: ':scope > div', side: 'top', label: 'both' },
          { kind: 'size', target: 'button', side: 'bottom', label: 'both' },
          { kind: 'gap', from: '[role="checkbox"]', to: 'button' },
        ]}><ExpandableCheckbox {...SHORT} modes={LIGHT} /></Anatomy>
        <ExampleCard title="Narrow rows" description="Below about 295 px, the link wraps under “I agree” and the row grows to 38 px.">
          <FitWidth><VStack modes={LIGHT} style={{ width: 280, padding: 0 }}><ExpandableCheckbox {...SHORT} modes={LIGHT} /></VStack></FitWidth>
        </ExampleCard>
      </div>,
    },
    content: {
      header: 'Content', title: 'A consent phrase, the document, and plain toggles',
      description: 'Start the label with the consent, in sentence case without a full stop. Name the document in the link. Rename the toggles only in pairs, and keep them short, such as “Show terms” and “Hide terms”.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Default toggles"><Host><ExpandableCheckbox {...SHORT} modes={LIGHT} /></Host></ExampleCard>
        <ExampleCard title="Renamed toggles"><Host><ExpandableCheckbox {...SHORT} readMoreLabel="Show terms" readLessLabel="Hide terms" modes={LIGHT} /></Host></ExampleCard>
      </div>,
    },
    context: {
      header: 'In context', title: 'Consent before opening an account',
      description: 'One row per agreement. The screen keeps each row’s checked state and enables Open account only after the required consent; each row opens and closes on its own.',
      body: <div className="coin-new-context">
        <Card modes={LIGHT}><VStack modes={LIGHT} style={{ width: '100%' }}>
          <ExpandableCheckbox {...LONG} checked={kycChecked} onValueChange={v => { setKycChecked(v); setStarted(false) }} expanded={kycExpanded} onExpandedChange={setKycExpanded} modes={LIGHT} />
          <ExpandableCheckbox label="I agree to get account updates on WhatsApp" checked={waChecked} onValueChange={setWaChecked} expanded={waExpanded} onExpandedChange={setWaExpanded} modes={LIGHT} />
          <Button label="Open account" disabled={!kycChecked} onPress={() => setStarted(true)} modes={LIGHT} />
        </VStack></Card>
        <p className="coin-new-readout" role="status">{!kycChecked ? 'Accept the KYC consent to continue' : started ? 'Account opening started' : 'Ready to open your account'}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'One clear agreement per row',
      description: 'Each pair shows a consent people understand versus one that misleads them.',
      body: <div className="coin-new-stack">
        <DoDont goodTitle="Collapse long consent" goodCaption="One line keeps the screen calm; Read more shows the rest." good={<Host><ExpandableCheckbox {...LONG} modes={LIGHT} /></Host>}
          badTitle="Use it for a short option" badCaption="Read more opens the same words. Use a Checkbox Item." bad={<Host><ExpandableCheckbox label="Email me offers" modes={LIGHT} /></Host>} />
        <DoDont goodTitle="Name the toggle Read more" goodCaption="People know it opens the text." good={<Host><ExpandableCheckbox {...SHORT} modes={LIGHT} /></Host>}
          badTitle="Put the document on the toggle" badCaption="“Terms & Conditions” on the button only opens the row, and squeezes the label." bad={<Host><ExpandableCheckbox label="I agree" readMoreLabel="Terms & Conditions" readLessLabel="Close" modes={LIGHT} /></Host>} />
        <DoDont goodTitle="Give each agreement its own row" goodCaption="People can accept one without the other." good={<Host>
          <ExpandableCheckbox label="I agree to share my KYC details" linkLabel="KYC terms" onLinkPress={noop} modes={LIGHT} />
          <ExpandableCheckbox label="I agree to get offers on WhatsApp" modes={LIGHT} />
        </Host>}
          badTitle="Merge agreements" badCaption="One tick accepts all three." bad={<Host><ExpandableCheckbox label="I agree to share my KYC details, get offers on WhatsApp, and receive marketing calls" modes={LIGHT} /></Host>} />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Expandable Checkbox contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="6 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('expandablecheckbox')} stories={[
        { label: 'Default', id: 'components-expandablecheckbox--default' },
        { label: 'Expanded', id: 'components-expandablecheckbox--expanded' },
        { label: 'Checked', id: 'components-expandablecheckbox--checked' },
        { label: 'Disabled', id: 'components-expandablecheckbox--disabled' },
        { label: 'Long label', id: 'components-expandablecheckbox--long-label' },
        { label: 'Two-line collapse', id: 'components-expandablecheckbox--two-line-collapse' },
        { label: 'Custom button labels', id: 'components-expandablecheckbox--custom-button-labels' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> from the team’s private package repository. Figma’s Expandable Checkbox has two states, Idle and Open; checked, disabled, the number of collapsed lines, and the toggle labels exist only in the package. Figma’s label is regular weight; the package renders it medium. On the web the box doesn’t announce whether it is ticked, the toggle doesn’t announce whether the row is open, and Space doesn’t tick the box. In 0.1.78 an open sentence longer than the row is cut off, and the Terms link can’t be opened with the keyboard.</Sources>,
    },
  }

  return <ComponentGuideTemplate
    metadata={{ slug: 'expandablecheckbox', corePrinciple: 'Ticking gives consent; Read more only shows the words.', figmaUrl: FIGMA, storybookUrl: docsUrl('expandablecheckbox') }}
    playground={<>
      <div className="preview-stage">
        <Host><ExpandableCheckbox {...(copy === 'Short' ? SHORT : LONG)} checked={checked} onValueChange={setChecked} expanded={expanded} onExpandedChange={setExpanded} disabled={disabled} modes={LIGHT} /></Host>
        <span className="stage-label">Live Coin Expandable Checkbox</span>
      </div>
      <div className="controls-panel">
        <Segment label="Copy" value={copy} options={['Short', 'Long'] as const} onChange={setCopy} />
        <Segment label="State" value={expanded ? 'Open' : 'Idle'} options={['Idle', 'Open'] as const} onChange={v => setExpanded(v === 'Open')} />
        <OnOff label="Checked" value={checked} onChange={setChecked} />
        <OnOff label="Disabled" value={disabled} onChange={setDisabled} />
        <Readout title="Consent" value={checked ? 'Given' : 'Not given'}>{disabled ? 'Disabled rows ignore presses and can’t be opened.' : 'Read more opens the text; it never ticks the box.'}</Readout>
      </div>
    </>}
    sections={sections}
  />
}

export default defineGuide({
  slug: 'expandablecheckbox',
  label: 'Expandable Checkbox',
  summary: 'Use an Expandable Checkbox for one consent whose text is too long for a line, such as agreeing to share KYC details.',
  keywords: ['consent', 'terms checkbox', 'read more', 'agreement'],
  icon: <><rect x="2" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><path d="M3.6 6l1.1 1.1 1.8-2.1M10.5 5h5.5M2 13h14M10.5 8h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /></>,
  Component: ExpandableCheckboxGuide,
})
