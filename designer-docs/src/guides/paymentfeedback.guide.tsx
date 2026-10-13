import { useState } from 'react'
import { Button, IconCapsule, PaymentFeedback, Title, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, ScreenFrame, Segment, Sources, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1056-3084'
const LIGHT = { 'Color Mode': 'Light' } as Modes
const DETAILS = '13 October 2026, 4:15 pm\nTransaction ID: TXN121466784'
// Storybook's column host stops it at the host's width; a flex row stage would let a long title run past.
const FIT = { maxWidth: '100%' } as const
// A whole phone screen: the result or the payment fills it, with its button at the bottom.
const SCREEN = { flex: 1, padding: 16 } as const

const ICON = '[role="img"]'
const MESSAGE = '[role="img"] + div'
const TITLE = '[role="img"] + div > [dir="auto"]'
const SUBTITLE = '[role="img"] + div > div > [dir="auto"]:first-child'
const BODY = '[role="img"] + div > div > [dir="auto"]:nth-child(2)'
const DETAILS_SEL = '[role="img"] + div + div'
const ROOT = 'div:has(> [role="img"])'

const OUTCOMES = {
  Paid: { appearance: 'positive', iconName: 'ic_confirm', subtitle: 'Payment successful', body: 'Sent to Rahul Sharma.' },
  Pending: { appearance: 'warning', iconName: 'ic_info', subtitle: 'Payment pending', body: 'Your bank is still processing it.' },
  Failed: { appearance: 'negative', iconName: 'ic_close', subtitle: 'Payment failed', body: 'Something went wrong. Please try again.' },
} as const
type Outcome = keyof typeof OUTCOMES
const PAID = OUTCOMES.Paid
const FAILED = OUTCOMES.Failed
const pfModes = (o: Outcome) => ({ ...LIGHT, AppearanceSystem: OUTCOMES[o].appearance } as Modes)

function PaymentFeedbackGuide() {
  const [status, setStatus] = useState<Outcome>('Paid')
  const [body, setBody] = useState(true)
  const [details, setDetails] = useState(true)
  const [paid, setPaid] = useState(false)
  const pay = () => setPaid(true)
  const done = () => setPaid(false)
  const live = OUTCOMES[status]

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'An icon, an amount, and the outcome',
      description: 'A status icon sits above the amount, with the outcome and an optional sentence under it and the date and reference at the bottom, all centred. The icon and the words are separate settings.',
      body: <Anatomy specimenWidth={328} parts={[
        { name: 'Icon', note: 'An 81 px Icon Capsule coloured by AppearanceSystem; renderMedia replaces it.', target: ICON, side: 'top' },
        { name: 'Amount', note: 'The title: 36 px heavy text. The component adds no currency sign.', target: TITLE, side: 'right' },
        { name: 'Status', note: 'The subtitle: the outcome in words, at 16 px.', target: SUBTITLE, side: 'left' },
        { name: 'Body', note: 'Optional: one sentence under the status, at 14 px.', target: BODY, side: 'right' },
        { name: 'Details', note: 'One line per line break in details; showDetails hides them.', target: DETAILS_SEL, side: 'bottom' },
      ]}>
        <PaymentFeedback style={FIT} title="₹1,250" subtitle={PAID.subtitle} body={PAID.body} details={DETAILS} iconName={PAID.iconName} modes={pfModes('Paid')} />
      </Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Three outcomes and your own mark',
      description: 'Set the outcome with AppearanceSystem in modes: positive is green, warning orange, and negative red. The icon and the words don\'t follow it, so set iconName and the status line to match. renderMedia replaces the icon with your own.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Paid" description="positive with ic_confirm, the default: a check on green.">
          <PaymentFeedback style={FIT} title="₹1,250" subtitle={PAID.subtitle} body={PAID.body} details={DETAILS} iconName={PAID.iconName} modes={pfModes('Paid')} />
        </ExampleCard>
        <ExampleCard title="Pending" description="warning with ic_info, while the bank hasn't confirmed it.">
          <PaymentFeedback style={FIT} title="₹1,250" subtitle={OUTCOMES.Pending.subtitle} body={OUTCOMES.Pending.body} details={DETAILS} iconName={OUTCOMES.Pending.iconName} modes={pfModes('Pending')} />
        </ExampleCard>
        <ExampleCard title="Failed" description="negative with ic_close: a white cross on red.">
          <PaymentFeedback style={FIT} title="₹1,250" subtitle={FAILED.subtitle} body={FAILED.body} details={DETAILS} iconName={FAILED.iconName} modes={pfModes('Failed')} />
        </ExampleCard>
        <ExampleCard title="Your own mark" description="renderMedia swaps in your own, here a gold brand capsule.">
          <PaymentFeedback style={FIT} modes={LIGHT} title="₹10,000" subtitle="Transfer complete" body="Moved to your savings account." details={DETAILS}
            renderMedia={<IconCapsule iconName="ic_confirm" modes={{ 'Icon Capsule Size': 'L', Emphasis: 'High', AppearanceBrand: 'Primary' } as Modes} />} />
        </ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Shown once, with optional lines',
      description: 'Payment Feedback has no pressed, disabled, or loading state: the screen shows it once the payment has a result. The body appears only when you set it, and showDetails turns the details off.',
      body: <div className="coin-new-example-grid three">
        <ExampleCard title="Everything" description="Amount, status, body, and details.">
          <PaymentFeedback style={FIT} title="₹1,250" subtitle={PAID.subtitle} body={PAID.body} details={DETAILS} iconName={PAID.iconName} modes={pfModes('Paid')} />
        </ExampleCard>
        <ExampleCard title="No details" description="showDetails off hides the date and reference.">
          <PaymentFeedback style={FIT} title="₹1,250" subtitle={PAID.subtitle} body={PAID.body} details={DETAILS} iconName={PAID.iconName} modes={pfModes('Paid')} showDetails={false} />
        </ExampleCard>
        <ExampleCard title="Amount and status" description="The shortest version: the amount and the outcome.">
          <PaymentFeedback style={FIT} title="₹1,250" subtitle={PAID.subtitle} details={DETAILS} iconName={PAID.iconName} modes={pfModes('Paid')} showDetails={false} />
        </ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'As wide as its container',
      description: 'It has no width of its own: it fills its container, or shrinks to its longest line when centred, as in the examples above and in Storybook. The 81 px icon sits 46 px above the amount, 12 px separate the amount from the status, and the details come 46 px below. Figma\'s version is 328 px wide.',
      body: <Anatomy legend={false} specimenWidth={328} marks={[
        { kind: 'size', target: ROOT, side: 'right', label: 'both' },
        { kind: 'gap', from: ICON, to: MESSAGE },
        { kind: 'gap', from: TITLE, to: '[role="img"] + div > div:not([dir])' },
        { kind: 'gap', from: MESSAGE, to: DETAILS_SEL },
      ]}>
        <PaymentFeedback style={FIT} title="₹1,250" subtitle={PAID.subtitle} body={PAID.body} details={DETAILS} iconName={PAID.iconName} modes={pfModes('Paid')} />
      </Anatomy>,
    },
    content: {
      header: 'Content', title: 'Amount, outcome, reference',
      description: 'Write the amount as it was paid, with its currency sign: the component adds none. Put the outcome in the status line in sentence case, keep the body to one sentence, and give the details one fact per line, split with a line break.',
      body: <ExampleCard title="Amount, outcome, reference" description="₹1,250, “Payment successful”, who it went to, then the date and transaction ID.">
        <PaymentFeedback style={FIT} title="₹1,250" subtitle={PAID.subtitle} body={PAID.body} details={DETAILS} iconName={PAID.iconName} modes={pfModes('Paid')} />
      </ExampleCard>,
    },
    context: {
      header: 'In context', title: 'A payment result screen',
      description: 'Pay swaps the payment screen for the result: the amount, the outcome, and the reference, with Done below to leave. Payment Feedback has no button of its own, so the screen adds one.',
      body: <div className="coin-new-context">
        <ScreenFrame size="full">
          <VStack modes={{ ...LIGHT, 'Slot gap': 'M' } as Modes} style={SCREEN} justifyVertical="space-between">
            {paid ? (
              <VStack modes={LIGHT} style={{ flex: 1 }} justifyVertical="center">
                <PaymentFeedback style={FIT} title="₹1,250" subtitle={PAID.subtitle} body={PAID.body} details={DETAILS} iconName={PAID.iconName} modes={pfModes('Paid')} />
              </VStack>
            ) : (
              <Title title="Pay Rahul Sharma" subtitle="HDFC Bank ··4821" modes={LIGHT} />
            )}
            {paid
              ? <Button label="Done" modes={LIGHT} onPress={done} />
              : <Button label="Pay ₹1,250" modes={LIGHT} onPress={pay} />}
          </VStack>
        </ScreenFrame>
        <p className="coin-new-readout" role="status">{paid ? 'Payment successful: ₹1,250 to Rahul Sharma' : 'Ready to pay'}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'The outcome at a glance',
      description: 'Each pair shows a result people read correctly next to one that hides or contradicts the outcome.',
      body: <div className="coin-new-stack">
        <DoDont
          good={<PaymentFeedback style={FIT} title="₹1,250" subtitle={FAILED.subtitle} body={FAILED.body} details={DETAILS} iconName={FAILED.iconName} modes={pfModes('Failed')} />}
          bad={<PaymentFeedback style={FIT} title="₹1,250" subtitle="To Rahul Sharma" details={DETAILS} iconName={FAILED.iconName} modes={pfModes('Failed')} />}
          goodTitle="Say the outcome in words" goodCaption="“Payment failed” tells everyone what happened, not only people who see the red."
          badTitle="Rely on the colour" badCaption="Only the red icon says this payment failed." />
        <DoDont
          good={<PaymentFeedback style={FIT} title="₹1,250" subtitle={FAILED.subtitle} body={FAILED.body} details={DETAILS} iconName={FAILED.iconName} modes={pfModes('Failed')} />}
          bad={<PaymentFeedback style={FIT} title="₹1,250" subtitle={FAILED.subtitle} body={FAILED.body} details={DETAILS} modes={pfModes('Failed')} />}
          goodTitle="Match the icon to the outcome" goodCaption="A cross on red for a failed payment."
          badTitle="Keep the default check" badCaption="A check mark on red says success and failure at once." />
        <DoDont
          good={<PaymentFeedback style={FIT} title="₹1,250" subtitle={PAID.subtitle} body={PAID.body} details={DETAILS} iconName={PAID.iconName} modes={pfModes('Paid')} />}
          bad={<PaymentFeedback style={FIT} title="Your payment of ₹1,250 was successful" subtitle={PAID.subtitle} body={PAID.body} details={DETAILS} iconName={PAID.iconName} modes={pfModes('Paid')} />}
          goodTitle="Keep the title to the amount" goodCaption="“₹1,250” reads at a glance."
          badTitle="Write a sentence in the title" badCaption="36 px heavy text wraps into a block nobody reads first." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Payment Feedback contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="13 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('paymentfeedback')} stories={[
        { label: 'Default', id: 'components-paymentfeedback--default' },
        { label: 'Without details', id: 'components-paymentfeedback--without-details' },
        { label: 'Failed payment', id: 'components-paymentfeedback--failed-payment' },
        { label: 'Warning payment', id: 'components-paymentfeedback--warning-payment' },
        { label: 'Custom media', id: 'components-paymentfeedback--custom-media' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (12 October build) from the team’s private package repository. Figma’s Payment Feedback is one 328 × 316 component showing a successful payment, with Title, Subtitle, Body and Details text and a details switch; pending and failed exist only in code, through AppearanceSystem. Storybook’s stories use a cross for failed and an info icon for pending; Biscuit’s newer Storybook page, not yet published, suggests the error and warning icons instead. In code the amount sits on a 44 px line (36 in Figma). Of the modes, set only AppearanceSystem: AppearanceBrand and Page type change nothing, and the default icon keeps its own size, emphasis and intent. It has no label of its own and doesn’t announce the result: its text is read in order, and the icon is an image with no name. The published Storybook still shows the old page.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'paymentfeedback',
    corePrinciple: 'Lead with the amount, then say the outcome in words.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('paymentfeedback'),
  }} playground={<>
    <div className="preview-stage">
      <PaymentFeedback style={FIT} title="₹1,250" subtitle={live.subtitle} body={body ? live.body : undefined} details={DETAILS}
        showDetails={details} iconName={live.iconName} modes={pfModes(status)} />
      <span className="stage-label">Live Coin Payment Feedback</span>
    </div>
    <div className="controls-panel">
      <Segment label="Status" value={status} options={['Paid', 'Pending', 'Failed'] as const} onChange={setStatus} />
      <OnOff label="Body" value={body} onChange={setBody} />
      <OnOff label="Details" value={details} onChange={setDetails} />
      <Readout title="Status" value={`${live.appearance} · ${live.iconName}`}>
        The colour comes from AppearanceSystem in modes. The icon and the words don't follow it, so set them to match.
      </Readout>
    </div>
  </>} sections={sections} />
}


export default defineGuide({
  slug: 'paymentfeedback',
  label: 'Payment Feedback',
  summary: 'Use a Payment Feedback on the screen after a payment to show the amount, whether it went through, and its reference.',
  keywords: ['payment status', 'payment result', 'transaction result', 'success screen', 'payment confirmation', 'receipt'],
  icon: <><circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.5" /><path d="m6.2 9.2 1.9 1.9 3.7-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /></>,
  Component: PaymentFeedbackGuide,
})
