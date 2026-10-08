import { useState } from 'react'
import { Card, OTP, Text, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, Segment, Sources, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const LIGHT = { 'Color Mode': 'Light' } as Modes
const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=2759-330'
const STORYBOOK = docsUrl('otp')

const S = 'input[aria-label^="OTP input"]'
const ROOT = `div:has(> ${S})`
const slot = (n: number) => `${S} + div > div:nth-child(${n})`
const digit = (n: number) => `${slot(n)} > div:first-child`
const underline = (n: number) => `${slot(n)} > div:last-child`
const SUPPORT = `${S} + div + *`
const ROW = `${S} + div`

const onResend = () => new Promise<void>((r) => setTimeout(r, 600))
const SUPPORT_TEXT = 'Enter the code sent to your phone'
const ERROR = 'Incorrect code. Try again.'

const Host = ({ children }: { children: React.ReactNode }) => <div className="coin-new-host wide">{children}</div>

type Below = 'Text' | 'Resend' | 'None'
type Status = 'waiting' | 'invalid' | 'verified'

function VerifyExample() {
  const [value, setValue] = useState('')
  const [status, setStatus] = useState<Status>('waiting')
  return (
    <div className="coin-new-context">
      <Card modes={LIGHT}>
        <VStack modes={LIGHT}>
          <Text modes={LIGHT}>Verify your number</Text>
          <Text modes={LIGHT}>We sent a 6-digit code to your phone.</Text>
          <OTP
            modes={LIGHT}
            value={value}
            onChange={(next) => { setValue(next); setStatus('waiting') }}
            onComplete={(code) => setStatus(code === '123456' ? 'verified' : 'invalid')}
            isInvalid={status === 'invalid'}
            errorMessage={ERROR}
            resend={{ durationSeconds: 30, onResend: () => { setValue(''); setStatus('waiting'); return onResend() } }}
          />
        </VStack>
      </Card>
      <p className="coin-new-readout" role="status">
        {status === 'verified' ? 'Number verified' : status === 'invalid' ? 'Incorrect code' : 'Waiting for the code'}
      </p>
    </div>
  )
}

function OtpGuide() {
  const [length, setLength] = useState<'4' | '6'>('6')
  const [value, setValue] = useState('')
  const [below, setBelow] = useState<Below>('Text')
  const [invalid, setInvalid] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const complete = value.length === Number(length)

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'Slots and a support line',
      description: 'A row of slots, one per digit, over a single support line. One hidden number-pad field takes the typing; the slots only display it.',
      body: <Anatomy
        specimenWidth={344}
        parts={[
          { name: 'Digit', note: 'An entered digit, centred above its underline.', target: digit(1), side: 'top' },
          { name: 'Underline', note: 'Lit in the brand colour when filled or active; red when invalid.', target: underline(2), side: 'left' },
          { name: 'Empty slot', note: 'Waits for the next digit; its underline stays neutral.', target: slot(4), side: 'top' },
          { name: 'Slot gap', note: 'A fixed 8 px between slots.', between: [slot(5), slot(6)], side: 'top' },
          { name: 'Support line', note: 'Guidance, resend timer, or error; left-aligned in code, right-aligned in Figma.', target: SUPPORT, side: 'right' },
        ]}
        marks={[{ kind: 'gap', from: ROW, to: SUPPORT }]}
      ><OTP modes={LIGHT} defaultValue="48" supportText={SUPPORT_TEXT} /></Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Length and what sits below',
      description: 'Match the number of slots to the code the service sends. Below the slots, show guidance, a resend timer, or nothing.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="6 digits" description="The default, and the length most SMS codes use."><Host><OTP modes={LIGHT} supportText={SUPPORT_TEXT} /></Host></ExampleCard>
        <ExampleCard title="4 digits" description="For 4-digit codes. Slots stay 48 px, so the row is shorter, not wider-spaced."><Host><OTP modes={LIGHT} length={4} supportText="Enter the 4-digit code" /></Host></ExampleCard>
        <ExampleCard title="Resend timer" description="A countdown replaces the support text and becomes a Resend button when it ends."><Host><OTP modes={LIGHT} resend={{ durationSeconds: 30, onResend }} /></Host></ExampleCard>
        <ExampleCard title="Status line" description="Give the line a status when it reports something; keep Neutral for instructions."><Host><OTP modes={LIGHT} supportText="Code sent" supportTextStatus="Success" /></Host></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'Typing, error, disabled, and resend',
      description: 'Filled slots stay lit, and the active slot lights with a caret while focused. The other states are set by the screen.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Typing" description="Click and type: filled slots stay lit; delete a digit and its slot fades back."><Host><OTP modes={LIGHT} defaultValue="481" supportText={SUPPORT_TEXT} /></Host></ExampleCard>
        <ExampleCard title="Invalid" description="Every underline turns red, and the error replaces the support text or resend timer."><Host><OTP modes={LIGHT} isInvalid defaultValue="481902" errorMessage={ERROR} /></Host></ExampleCard>
        <ExampleCard title="Disabled" description="The whole field dims to 40% and takes no input, for example while the code is checked."><Host><OTP modes={LIGHT} isDisabled defaultValue="481902" supportText="Verifying code…" supportTextStatus="Loading" /></Host></ExampleCard>
        <ExampleCard title="Ready to resend" description="After the countdown, a Resend button, which in this build stretches across the row. It reads “Sending…” while the request runs, then counts down again."><Host><OTP modes={LIGHT} resend={{ autoStart: false, onResend }} /></Host></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: 'Fills its container, slots up to 48 px',
      description: 'OTP fills its container. Slots are up to 48 px wide with 8 px gaps, plus 8 px padding, so 6 digits need 344 px at full size. In a narrower container the slots shrink: 8 digits fit a 334 px phone column at about 33 px each. In a wider one, slots stay 48 px at the left.',
      body: <Anatomy legend={false} specimenWidth={344} marks={[
        { kind: 'size', target: ROOT, side: 'top', label: 'both' },
        { kind: 'size', target: slot(1), side: 'left', label: 'both' },
        { kind: 'gap', from: slot(1), to: slot(2) },
      ]}><OTP modes={LIGHT} supportText={SUPPORT_TEXT} /></Anatomy>,
    },
    content: {
      header: 'Content', title: 'Short, specific support text',
      description: 'The support line is one short line under the slots. Say where the code went before entry, and what to do when it is wrong.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="Say where the code went" description="Name the channel, so people know where to look."><Host><OTP modes={LIGHT} supportText={SUPPORT_TEXT} /></Host></ExampleCard>
        <ExampleCard title="Say how to recover" description="Say what went wrong and what to do next, in one line."><Host><OTP modes={LIGHT} isInvalid defaultValue="481902" errorMessage={ERROR} /></Host></ExampleCard>
      </div>,
    },
    context: {
      header: 'In context', title: 'Verifying a phone number',
      description: 'The screen keeps the code, checks it when the last digit is entered, and sets the error. On phones, the keyboard offers the SMS code automatically. Enter 123456 to see success, anything else to see the error.',
      body: <VerifyExample />,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Keep entry clear',
      description: 'Each pair shows a choice that helps people finish verification versus one that stalls them.',
      body: <div className="coin-new-stack">
        <DoDont
          goodTitle="Match the code length" goodCaption="Six slots for a 6-digit code; people know when they are done."
          good={<Host><OTP modes={LIGHT} defaultValue="481902" supportText={SUPPORT_TEXT} /></Host>}
          badTitle="Add spare slots" badCaption="Empty slots left after the code make people think a digit is missing."
          bad={<Host><OTP modes={LIGHT} length={8} defaultValue="481902" supportText={SUPPORT_TEXT} /></Host>}
        />
        <DoDont
          goodTitle="Explain the error" goodCaption="The message says what went wrong and what to do."
          good={<Host><OTP modes={LIGHT} isInvalid defaultValue="481902" errorMessage={ERROR} /></Host>}
          badTitle="Show red underlines alone" badCaption="Without a message, people cannot tell what went wrong."
          bad={<Host><OTP modes={LIGHT} isInvalid defaultValue="481902" /></Host>}
        />
        <DoDont
          goodTitle="Use the resend timer" goodCaption="It counts down, then becomes a Resend button."
          good={<Host><OTP modes={LIGHT} resend={{ durationSeconds: 30, onResend }} /></Host>}
          badTitle="Write the timer as text" badCaption="A static line never counts down or becomes tappable."
          bad={<Host><OTP modes={LIGHT} supportText="Didn’t get it? Resend in 30s" /></Host>}
        />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public OTP contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="8 October 2026" figmaUrl={FIGMA} storybookUrl={STORYBOOK} stories={[
        { label: 'Default', id: 'components-otp--default' },
        { label: 'Four digits', id: 'components-otp--four-digits' },
        { label: 'Invalid', id: 'components-otp--invalid' },
        { label: 'Disabled', id: 'components-otp--disabled' },
        { label: 'With resend countdown', id: 'components-otp--with-resend-countdown' },
        { label: 'Validation flow', id: 'components-otp--validation-flow' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (5 October build) from the team’s private package repository. Figma and the package agree on 48 px slots and 8 px gaps. In code the slots shrink in a narrow container, so all of Storybook’s 4–8 digit lengths fit a phone. Figma right-aligns the support line and a small Resend button; in this build they sit at the left and Resend stretches across the row, which is reported to the Coin team. OTP has no verifying state; the screen checks the code and sets the error.</Sources>,
    },
  }

  return <ComponentGuideTemplate
    metadata={{
      slug: 'otp',
      corePrinciple: 'One digit per slot. The screen checks the code; OTP only shows the result.',
      figmaUrl: FIGMA, storybookUrl: STORYBOOK,
    }}
    playground={<>
      <div className="preview-stage">
        <Host>
          <OTP
            key={length}
            modes={LIGHT}
            length={Number(length)}
            value={value}
            onChange={setValue}
            supportText={below === 'Text' ? SUPPORT_TEXT : undefined}
            resend={below === 'Resend' ? { durationSeconds: 10, onResend } : undefined}
            isInvalid={invalid}
            errorMessage={invalid ? ERROR : undefined}
            isDisabled={disabled}
          />
        </Host>
        <span className="stage-label">Live Coin OTP</span>
      </div>
      <div className="controls-panel">
        <Segment label="Digits" value={length} options={['4', '6'] as const} onChange={(next) => { setLength(next); setValue('') }} />
        <Segment label="Below" value={below} options={['Text', 'Resend', 'None'] as const} onChange={setBelow} />
        <OnOff label="Invalid" value={invalid} onChange={setInvalid} />
        <OnOff label="Disabled" value={disabled} onChange={setDisabled} />
        <Readout title="Entered" value={value || 'Nothing yet'}>
          {complete ? 'Complete. The screen verifies the code now.' : 'Click the slots and type digits.'}
        </Readout>
      </div>
    </>}
    sections={sections}
  />
}

export default defineGuide({
  slug: 'otp',
  label: 'OTP',
  summary: 'Use OTP to enter a one-time verification code, one digit per slot, with an optional resend timer.',
  keywords: ['one-time code', 'verification code', 'PIN input', 'passcode', 'OTP input'],
  icon: <path d="M2.5 13.5h3M7.5 13.5h3M12.5 13.5h3M9 5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />,
  Component: OtpGuide,
})
