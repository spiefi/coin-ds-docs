import { useState, type ComponentProps } from 'react'
import { HStack, ScrollArea, TestimonialsCard, Title, VStack, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, DoDont, ExampleCard, OnOff, Readout, ScreenFrame, Segment, Sources, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=5267-1880'
const LIGHT = { 'Color Mode': 'Light' } as Modes
const MONO = (initials: string) => ({ style: 'Monogram' as const, monogram: initials })

const AARAV = { title: 'Aarav S.', body: 'Renewing my car insurance took a minute.', avatarProps: MONO('AS') }
const PRIYA = { title: 'Priya M.', body: 'Simple, fast, reliable.', avatarProps: MONO('PM') }
const ROHAN = { title: 'Rohan K.', body: 'Setting up my first SIP took less than two minutes.', avatarProps: MONO('RK') }
const NEHA = { title: 'Neha J.', body: 'I see all my accounts and my gold in one place now.', avatarProps: MONO('NJ') }

type TCProps = Partial<ComponentProps<typeof TestimonialsCard>>
function TC(overrides: TCProps = {}) {
  return <TestimonialsCard modes={LIGHT} {...AARAV} {...overrides} />
}

const R = ':scope > div'
const AVATAR = `${R} [role="img"]`
const TEXT = `${R} > div:last-child`
const NAME = `${R} > div:last-child > [dir="auto"]:first-child`
const QUOTE = `${R} > div:last-child > [dir="auto"]:last-child`

const LONG = 'I have used a lot of finance apps over the years, but this is the first one that made managing my money feel calm.'

function TestimonialsCardGuide() {
  const [size, setSize] = useState<'L' | 'M' | 'S'>('L')
  const [quote, setQuote] = useState<'Short' | 'Long'>('Short')
  const [pressable, setPressable] = useState(false)
  const [presses, setPresses] = useState(0)
  const [opened, setOpened] = useState<string | null>(null)

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'An avatar, a name, a quote',
      description: 'A 180 px card with the avatar on top and the name and the quote under it, all starting at the left.',
      body: <Anatomy marks={[{ kind: 'gap', from: AVATAR, to: TEXT }]} parts={[
        { name: 'Avatar', note: 'An Avatar, 42 px; avatarProps sets its initials or photo.', target: AVATAR, side: 'left' },
        { name: 'Name', note: 'title, the person’s name, 14 px Bold.', target: NAME, side: 'right' },
        { name: 'Quote', note: 'body, 12 px; it wraps and never clips.', target: QUOTE, side: 'bottom' },
        { name: 'Card', note: '180 px wide, white, a 1 px grey border, 8 px corners.', target: R, side: 'top' },
      ]}>{TC()}</Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Initials or a photo, at three sizes',
      description: 'The card always shows an Avatar, and avatarProps sets it: monogram shows the person’s initials, and imageSource shows their photo. Without avatarProps it shows the initials of the title. Avatar Size on the card’s modes sets it to 42, 36, or 29 px; an Avatar Size in avatarProps’ own modes wins.',
      body: <div className="coin-new-example-grid three">
        <ExampleCard title="Avatar Size L" description="42 px, the default.">{TC()}</ExampleCard>
        <ExampleCard title="Avatar Size M" description="36 px.">{TC({ modes: { ...LIGHT, 'Avatar Size': 'M' } as Modes })}</ExampleCard>
        <ExampleCard title="Avatar Size S" description="29 px.">{TC({ modes: { ...LIGHT, 'Avatar Size': 'S' } as Modes })}</ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'A quote, or one button',
      description: 'Without onPress the card is text, and screen readers read it once: “Testimonial from Aarav S.: …”. With onPress the whole card is one button, so give it an accessibilityLabel that says where it goes; it dims while pressed and has no hover look. disabled dims it to half, stops presses, and takes it out of the Tab order.',
      body: <div className="coin-new-example-grid three">
        <ExampleCard title="Quote" description="Read as one line of text.">{TC()}</ExampleCard>
        <ExampleCard title="onPress" description="One button; it dims while you press it.">{TC({ onPress: () => {}, accessibilityLabel: 'Read Aarav S.’s full review' })}</ExampleCard>
        <ExampleCard title="disabled" description="Dimmed to half; presses do nothing.">{TC({ onPress: () => {}, disabled: true })}</ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: '180 px wide, as tall as its quote',
      description: 'The card is always 180 px wide and never stretches to its host. Its height follows the quote: 12 px of padding, the 42 px avatar, 12 px, the name on a 16 px line, 2 px, then 16 px for each line of the quote. With a one-line quote it is 112 px tall, as in Figma.',
      body: <Anatomy legend={false} marks={[
        { kind: 'size', target: R, side: 'bottom', label: 'both' },
        { kind: 'gap', from: AVATAR, to: TEXT },
        { kind: 'padding', target: R },
      ]}>{TC(PRIYA)}</Anatomy>,
    },
    content: {
      header: 'Content', title: 'Their name, their words',
      description: 'Write title as the person’s name the way they’d sign it, such as Aarav S., not the product. Write body as what they said, in a sentence or two. Screen readers read the name and the whole quote together, and cards in a row look best with quotes of similar length.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="A short quote" description="One line: 112 px tall.">{TC(PRIYA)}</ExampleCard>
        <ExampleCard title="A longer quote" description="It wraps, and the card grows to fit.">{TC(ROHAN)}</ExampleCard>
      </div>,
    },
    context: {
      header: 'In context', title: 'A row of quotes',
      description: 'Customer quotes scroll sideways under a section title, and each card opens that customer’s full review. The cards keep their 180 px, so the row scrolls instead of squeezing them.',
      body: <div className="coin-new-context">
        <ScreenFrame size="screen">
          <VStack modes={{ ...LIGHT, 'Slot gap': 'S' } as Modes} style={{ paddingVertical: 16 }}>
            <Title title="What customers say" subtitle="From people who switched this year" modes={LIGHT} />
            <ScrollArea direction="horizontal" style={{ width: '100%' }}>
              <HStack modes={{ ...LIGHT, 'Slot gap': 'S' } as Modes} style={{ paddingHorizontal: 12 }} alignVertical="flex-start">
                {[AARAV, PRIYA, ROHAN, NEHA].map(p => <TestimonialsCard key={p.title} modes={LIGHT} {...p}
                  onPress={() => setOpened(p.title)} accessibilityLabel={`Read ${p.title}’s full review`} />)}
              </HStack>
            </ScrollArea>
          </VStack>
        </ScreenFrame>
        <p className="coin-new-readout" role="status">{opened ? `Opened ${opened}’s review` : 'No review opened'}</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'A person, not an advert',
      description: 'Each pair shows a quote that reads as a real customer next to one that doesn’t.',
      body: <div className="coin-new-stack">
        <DoDont good={TC()} bad={TC({ avatarProps: MONO('JF') })}
          goodTitle="Their initials" goodCaption="A face or initials that belong to the name."
          badTitle="The brand’s initials" badCaption="“JF” beside Aarav S. reads as the company, not the customer." />
        <DoDont good={TC()} bad={TC({ body: 'JioFinance brings your bank accounts, cards, insurance, loans, and digital gold together in one secure app, with instant payments, smart insights, and rewards on every transaction you make.' })}
          goodTitle="A sentence or two" goodCaption="Short enough to read in a row."
          badTitle="A paragraph of marketing" badCaption="The card grows tall and stops sounding like a person." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Testimonials Card contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="28 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('testimonialscard')} stories={[
        { label: 'Default', id: 'components-testimonialscard--default' },
        { label: 'With Author', id: 'components-testimonialscard--with-author' },
        { label: 'Short Body', id: 'components-testimonialscard--short-body' },
        { label: 'Long Body', id: 'components-testimonialscard--long-body' },
        { label: 'Carousel Row', id: 'components-testimonialscard--carousel-row' },
      ]}>Installed <code>jfs-components</code> is <code>0.1.78</code> (27 October build of Biscuit’s main) from the team’s private package repository. Figma’s card has <code>Title</code> and <code>Body</code> text properties and <code>Show Footer Text</code> and <code>Show Button</code> switches, but none of them changes a layer. The package matches Figma’s <code>#0d0d0f</code> for the name and the quote and its 112 px one-line card. <code>monogram</code> alone in <code>avatarProps</code> shows initials, and a pressable card dims while pressed.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'testimonialscard', corePrinciple: 'A real person, in their own words.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('testimonialscard'),
  }} playground={<>
    <div className="preview-stage">
      {TC({
        modes: { ...LIGHT, 'Avatar Size': size } as Modes,
        body: quote === 'Short' ? AARAV.body : LONG,
        onPress: pressable ? () => setPresses(n => n + 1) : undefined,
      })}
      <span className="stage-label">Live Coin Testimonials Card</span>
    </div>
    <div className="controls-panel">
      <Segment label="Avatar Size" value={size} options={['L', 'M', 'S'] as const} onChange={setSize} />
      <Segment label="body" value={quote} options={['Short', 'Long'] as const} onChange={setQuote} />
      <OnOff label="onPress" value={pressable} onChange={setPressable} />
      <Readout title="Role" value={pressable ? `Button · pressed ${presses} times` : 'Text'}>onPress makes the whole card one button, which dims while pressed.</Readout>
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'testimonialscard',
  label: 'Testimonials Card',
  summary: 'Use a Testimonials Card for one customer quote, their initials or photo, their name, and their words, usually in a sideways row.',
  keywords: ['testimonial', 'customer quote', 'review card', 'quote card'],
  icon: <><rect x="2.75" y="2.75" width="12.5" height="10.5" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" /><circle cx="6" cy="6" r="1.25" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M5 9.5h7M5 15.25l2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /></>,
  Component: TestimonialsCardGuide,
})
