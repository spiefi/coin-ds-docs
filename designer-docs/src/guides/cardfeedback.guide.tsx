import { useState } from 'react'
import { Button, CardFeedback, Title, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, Segment, Sources, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=1280-4481'
const LIGHT = { 'Color Mode': 'Light' } as Modes
const noop = () => {}
const FRAME = { width: '100%', maxWidth: 328 } as const

const STATUS = {
  positive: { icon: 'ic_status_successful', title: 'Payment successful', body: '₹1,250 was sent to Rahul Sharma.', action: 'View receipt' },
  warning: { icon: 'ic_warning', title: 'KYC pending', body: 'Finish KYC by 31 October to keep investing.', action: 'Complete KYC' },
  negative: { icon: 'ic_error', title: 'Payment failed', body: 'Your bank declined the payment. No money was taken.', action: 'Try again' },
}
type Status = keyof typeof STATUS
const STATUSES = ['positive', 'warning', 'negative'] as const

type FBOpts = { actions?: string[]; icon?: string; title?: string; body?: string; onPress?: (label: string) => void }
const FB = (status: Status, { actions, icon, title, body, onPress }: FBOpts = {}) => {
  const list = actions ?? [STATUS[status].action]
  return (
    <CardFeedback modes={{ ...LIGHT, AppearanceSystem: status } as Modes} style={FRAME}>
      <CardFeedback.Icon icon={icon ?? STATUS[status].icon} />
      <CardFeedback.Content>
        <CardFeedback.Title>{title ?? STATUS[status].title}</CardFeedback.Title>
        <CardFeedback.Body>{body ?? STATUS[status].body}</CardFeedback.Body>
        {list.length ? <CardFeedback.Action>{list.map(a => <Button key={a} label={a} onPress={onPress ? () => onPress(a) : noop} />)}</CardFeedback.Action> : null}
      </CardFeedback.Content>
    </CardFeedback>
  )
}

const R = ':scope > div'
const P = {
  icon: `${R} > div:first-child`,
  content: `${R} > div:nth-child(2)`,
  title: `${R} > div:nth-child(2) > [dir="auto"]:first-child`,
  body: `${R} > div:nth-child(2) > [dir="auto"]:nth-child(2)`,
  action: `${R} > div:nth-child(2) > div:last-child`,
}

function CardFeedbackGuide() {
  const [status, setStatus] = useState<Status>('positive')
  const [action, setAction] = useState(true)
  const [last, setLast] = useState('None')
  const [paid, setPaid] = useState(false)

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'An icon, the outcome, and a next step',
      description: 'A tinted panel stacks a status icon, a title, one line of detail, and an optional row of buttons. You build it from the card’s parts: Icon, Content, Title, Body, and Action.',
      body: <Anatomy specimenWidth={328} parts={[
        { name: 'Icon', note: 'CardFeedback.Icon: a 20 px registry icon in the status colour.', target: P.icon, side: 'left' },
        { name: 'Title', note: 'CardFeedback.Title: the outcome in a few words, 14 px.', target: P.title, side: 'top' },
        { name: 'Body', note: 'CardFeedback.Body: one sentence of detail, 12 px; it wraps.', target: P.body, side: 'left' },
        { name: 'Action', note: 'CardFeedback.Action: a row of small buttons in the status colour.', target: P.action, side: 'bottom' },
        { name: 'Panel', note: 'A tinted panel with 12 px padding and corners; AppearanceSystem sets the tint.', target: R, side: 'right' },
      ]}>
        {FB('positive')}
      </Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Three statuses',
      description: 'AppearanceSystem sets the status: positive, the default, is green; warning is orange; negative is red. It colours the panel, the icon, and the buttons in Action. Pick an icon that matches: the card colours it but doesn’t choose it. AppearanceBrand only shifts the title and body colour slightly.',
      body: <div className="coin-new-example-grid three">
        <ExampleCard title="Positive" description="Green for a result that went through.">{FB('positive')}</ExampleCard>
        <ExampleCard title="Warning" description="Orange for something to finish soon.">{FB('warning')}</ExampleCard>
        <ExampleCard title="Negative" description="Red for something that failed.">{FB('negative')}</ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'With or without actions',
      description: 'The card itself is static: only the buttons you put in Action respond. onPress makes the whole card one button instead; use it only when the card has no buttons inside, and name it with accessibilityLabel. The card doesn’t change its look when pressed or disabled.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Message only" description="Icon, title, and body: nothing to press.">{FB('positive', { actions: [] })}</ExampleCard>
        <ExampleCard title="Two actions" description="Both buttons take the status colour and look the same.">{FB('negative', { actions: ['Try again', 'Change bank'] })}</ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'Your screen sets the width',
      description: 'The card fills its host’s width; Figma draws it at 328 px. It’s as tall as its content and at least 59 px, with 12 px padding and 8 px between the icon, the text, and the actions. Title and body wrap, and buttons wrap onto a new row when they run out of room.',
      body: <Anatomy legend={false} specimenWidth={328} marks={[
        { kind: 'size', target: R, side: 'bottom', label: 'both' },
        { kind: 'padding', target: R },
        { kind: 'gap', from: P.icon, to: P.content },
      ]}>
        {FB('positive')}
      </Anatomy>,
    },
    content: {
      header: 'Content', title: 'The outcome, then the next step',
      description: 'Make the title the outcome, such as “Payment failed”, and the body one sentence on what it means for the person. Label each button with a verb, and keep to one or two. The colour alone doesn’t carry the status for everyone, so the title has to say it.',
      body: <ExampleCard title="Outcome, detail, next step" description="“Payment failed”, what happened to the money, and “Try again”.">
        {FB('negative')}
      </ExampleCard>,
    },
    context: {
      header: 'In context', title: 'A failed payment on the Pay screen',
      description: 'Try again runs the screen’s own retry through the button’s onPress. When the retry goes through, the screen swaps the card for a positive one; the card doesn’t change itself or time out.',
      body: <div className="coin-new-context">
        <div className="coin-new-stack">
          <Title title="Pay Rahul Sharma" subtitle="₹1,250 from HDFC Bank" modes={LIGHT} />
          {paid ? FB('positive', { onPress: () => setPaid(false) }) : FB('negative', { onPress: () => setPaid(true) })}
        </div>
        <p className="coin-new-readout" role="status">{paid ? 'Retried: payment successful' : 'Payment failed'}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'A clear result and one next step',
      description: 'Each pair shows a card people read at once next to one that sends mixed signals or crowds its actions.',
      body: <div className="coin-new-stack">
        <DoDont
          good={FB('negative', { actions: [] })}
          bad={FB('negative', { actions: [], icon: 'ic_status_successful' })}
          goodTitle="Match the icon to the status" goodCaption="An error icon on the red card."
          badTitle="Reuse the success icon" badCaption="A tick on a red card contradicts the title." />
        <DoDont
          good={FB('negative', { actions: [] })}
          bad={FB('negative', { actions: [], title: 'Your bank declined your payment of ₹1,250 to Rahul Sharma', body: 'No money was taken.' })}
          goodTitle="Make the title the outcome" goodCaption="“Payment failed” says it in two words."
          badTitle="Put the detail in the title" badCaption="The title wraps and the outcome gets lost." />
        <DoDont
          good={FB('warning')}
          bad={FB('warning', { actions: ['Complete KYC', 'Remind me later', 'Contact support'] })}
          goodTitle="One or two actions" goodCaption="They fit on one row."
          badTitle="Three or more actions" badCaption="They wrap onto a second row and look the same." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Card Feedback contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="17 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('cardfeedback')} stories={[
        { label: 'Default', id: 'components-cardfeedback--default' },
        { label: 'Custom content', id: 'components-cardfeedback--with-custom-content' },
        { label: 'Multiple actions', id: 'components-cardfeedback--multiple-actions' },
        { label: 'Icon prop', id: 'components-cardfeedback--with-icon-prop' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (16 October build) from the team’s private package repository. Figma’s Card/Feedback is one 328 × 123 component with no properties; its status comes from modes, and its icon is a solid circle, while the package draws whichever registry icon you pass. The card doesn’t read the app’s theme, so Color Mode has to come through its modes. Inside a VStack or another Coin container that passes modes down, its title, body, and buttons lose the card’s status modes and the buttons turn gold and large (reported), so these examples sit outside one. A second button can’t be made quieter than the first. The published Storybook renders every story as a pressable card with buttons inside it, and still shows the older generated page.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'cardfeedback',
    corePrinciple: 'Say what happened, then what to do next.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('cardfeedback'),
  }} playground={<>
    <div className="preview-stage">
      {FB(status, { actions: action ? [STATUS[status].action] : [], onPress: a => setLast(`${a} pressed`) })}
      <span className="stage-label">Live Coin Card Feedback</span>
    </div>
    <div className="controls-panel">
      <Segment label="Status" value={status} options={STATUSES} onChange={setStatus} />
      <OnOff label="Action" value={action} onChange={setAction} />
      <Readout title="Last action" value={last}>
        Only the button acts; the card itself isn’t pressable here.
      </Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'cardfeedback',
  label: 'Card Feedback',
  summary: 'Use a Card Feedback to show the result of an action in the page, such as a payment that went through or failed, with one next step.',
  keywords: ['feedback card', 'status card', 'result card', 'success message', 'error message', 'inline alert'],
  icon: <><rect x="2.5" y="3.5" width="13" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="m5.5 7.2 1 1 1.8-2M5.5 11.5h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /></>,
  Component: CardFeedbackGuide,
})
