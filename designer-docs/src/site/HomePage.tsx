import { useContext, useLayoutEffect, useState, type ReactNode } from 'react'
import { Button, ButtonGroup, FIGMA_MODES, IconButton, type Modes } from 'jfs-components'
import { SourceLink } from '../ComponentGuideTemplate'
import {
  GuideMobileBar,
  GuideSidebar,
  MobileComponentNav,
  PAGE_NAV,
  guideHref,
  handleGuideNavigation,
  useGuidePageNavigation,
} from '../GuideNavigation'
import { ArrowIcon, OnOff, Segment, classes } from '../guide-kit'
import { OpenSearchContext, SearchButton } from './SearchButton'

const FIGMA_LIBRARY = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library'
// Patterns are Figma-only compositions of Coin components; the guides cover the components.
const FIGMA_PATTERNS = 'https://www.figma.com/design/o5sUMA17UHDkC0C87bFV0l/Coin-Pattern-Library'
const STORYBOOK = 'https://jfs-components-storybook.vercel.app'

const HOME_NAV = [
  ['overview', 'Welcome'],
  ['start', 'Start here'],
  ['how-it-works', 'How components work'],
  ['guide-sections', 'Reading a guide'],
  ['resources', 'Where Coin lives'],
] as const

const SECTION_NOTES: Record<(typeof PAGE_NAV)[number][0], string> = {
  overview: 'What the component is for, its core principle, and a live playground.',
  anatomy: 'The named parts of a real instance.',
  configuration: 'The choices it exposes, and when to pick each one.',
  states: 'How it looks and behaves in each supported state.',
  sizing: 'Who owns its size, and how it fits its host.',
  content: 'How to write its labels and other content.',
  context: 'A realistic composition with other Coin components.',
  'dos-donts': 'Pairs that show the consequence of each choice.',
  sources: 'Links to Figma and Storybook, and when the guide was last checked.',
}

// Button modes as the Button guide sets them; each example changes a few.
const BUTTON_MODES = {
  'Button / Size': 'M',
  Emphasis: 'High',
  'Semantic Intent': 'Brand',
  AppearanceBrand: 'Primary',
  'Color Mode': 'Light',
  Context4: 'Button',
  'Button / State': 'Idle',
}

function buttonModes(changes: Record<string, string> = {}) {
  return { ...BUTTON_MODES, ...changes } as Modes
}

// As in the Button Group guide: the group sets the modes, children add their own.
const GROUP_MODES = {
  'Color Mode': 'Light',
  'Button / Size': 'M',
  Emphasis: 'Medium',
  AppearanceBrand: 'Primary',
} as Modes

/** Mode collections a new designer meets first; their values come from the package. */
const FIRST_MODES = ['Button / Size', 'Emphasis', 'AppearanceBrand', 'Color Mode'] as const

type ButtonSize = (typeof FIGMA_MODES)['Button / Size'][number]
type Emphasis = (typeof FIGMA_MODES)['Emphasis'][number]
type ColorMode = (typeof FIGMA_MODES)['Color Mode'][number]

function GuideLink({ href, children }: { href: string; children: string }) {
  return (
    <a className="source-link" href={href} onClick={handleGuideNavigation}>
      {children}
      <ArrowIcon />
    </a>
  )
}

function ModeDemo() {
  const [size, setSize] = useState<ButtonSize>('M')
  const [emphasis, setEmphasis] = useState<Emphasis>('High')
  const [colorMode, setColorMode] = useState<ColorMode>('Light')

  return (
    <div className="home-demo">
      <div className="home-demo-heading">
        <p className="eyebrow">Try it</p>
        <p>Change a Button’s modes</p>
      </div>
      <div className={classes('preview-stage', 'home-demo-stage', colorMode === 'Dark' && 'is-dark')}>
        <Button
          label="Continue"
          accessibilityLabel="Continue"
          modes={buttonModes({ 'Button / Size': size, Emphasis: emphasis, 'Color Mode': colorMode })}
        />
        <span className="stage-label">Live Coin Button</span>
      </div>
      <div className="home-demo-controls">
        <Segment label="Button / Size" value={size} options={FIGMA_MODES['Button / Size']} onChange={setSize} />
        <Segment label="Emphasis" value={emphasis} options={FIGMA_MODES.Emphasis} onChange={setEmphasis} />
        <Segment label="Color Mode" value={colorMode} options={FIGMA_MODES['Color Mode']} onChange={setColorMode} />
      </div>
    </div>
  )
}

function SlotDemo() {
  const [emphasizePay, setEmphasizePay] = useState(true)
  const payModes = (
    emphasizePay ? { AppearanceBrand: 'Primary', Emphasis: 'High' } : { AppearanceBrand: 'Primary' }
  ) as Modes

  return (
    <>
      <div className="preview-stage home-how-stage">
        <div className="home-slot-host">
          <ButtonGroup modes={GROUP_MODES}>
            <IconButton iconName="ic_split" accessibilityLabel="Split bill" />
            <Button label="Request" accessibilityLabel="Request" modes={{ AppearanceBrand: 'Secondary' } as Modes} />
            <Button label="Pay" accessibilityLabel="Pay" modes={payModes} />
          </ButtonGroup>
        </div>
        <span className="stage-label">Live Coin Button Group</span>
      </div>
      <div className="home-how-control">
        <OnOff label="Pay sets its own Emphasis High" value={emphasizePay} onChange={setEmphasizePay} />
      </div>
    </>
  )
}

function Step({
  number,
  title,
  children,
  actions,
}: {
  number: string
  title: string
  children: ReactNode
  actions: ReactNode
}) {
  return (
    <li className="home-step">
      <span className="home-step-number" aria-hidden="true">
        {number}
      </span>
      <div>
        <h3>{title}</h3>
        <p>{children}</p>
        <div className="home-step-actions">{actions}</div>
      </div>
    </li>
  )
}

function HowRow({
  label,
  title,
  demo,
  children,
  link,
}: {
  label: string
  title: string
  demo: ReactNode
  children: ReactNode
  link: ReactNode
}) {
  return (
    <article className="home-how-row">
      <div className="home-how-demo">{demo}</div>
      <div className="home-how-copy">
        <p className="home-how-label">{label}</p>
        <h3>{title}</h3>
        {children}
        {link}
      </div>
    </article>
  )
}

/** The documentation home. `missing` is a requested guide slug that does not exist. */
export function HomePage({ missing }: { missing?: string }) {
  const openSearch = useContext(OpenSearchContext)

  useLayoutEffect(() => {
    const previousTitle = document.title
    document.title = 'Coin designer documentation'
    return () => {
      document.title = previousTitle
    }
  }, [])

  useGuidePageNavigation()

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <GuideSidebar pageNav={HOME_NAV} />

      <main id="main-content" className="content" tabIndex={-1}>
        <GuideMobileBar sources={false} />
        <MobileComponentNav />

        <article className="home">
          <section id="overview" className="hero-section home-hero anchor-section">
            <div className="hero-copy">
              {missing && (
                <p className="home-notice" role="status">
                  There’s no guide called “{missing}”. Search for it or pick a component from the
                  list.
                </p>
              )}
              <p className="eyebrow">Coin designer documentation</p>
              <h1 className="home-title">Welcome to Coin</h1>
              <p className="hero-lede">
                Coin is our design system: components that exist in both Figma and code, and Figma
                patterns built from them. Start here to learn how Coin components work, then use
                the guides to choose and configure each one.
              </p>
              <SearchButton variant="hero" />
              <p className="home-search-hint">
                Try a name or what you need, like “select” or “tab&nbsp;bar”.
              </p>
            </div>
            <ModeDemo />
          </section>

          <section id="start" className="doc-section anchor-section">
            <header className="section-header">
              <p className="eyebrow">Start here</p>
              <h2>Your first steps with Coin</h2>
              <p>Five habits that keep what you design buildable with the coded components.</p>
            </header>
            <ol className="home-steps">
              <Step
                number="01"
                title="Start from a pattern"
                actions={<SourceLink href={FIGMA_PATTERNS}>Open the Pattern Library</SourceLink>}
              >
                The Coin Pattern Library holds approved compositions and flows built from Coin
                components. When one fits your screen, start from it.
              </Step>
              <Step
                number="02"
                title="Build the rest from components"
                actions={
                  <>
                    <SourceLink href={FIGMA_LIBRARY}>Open the Components Library</SourceLink>
                    <a className="source-link" href="#how-it-works">
                      How components work
                      <ArrowIcon />
                    </a>
                  </>
                }
              >
                Place components from the Coin Components Library and keep them attached. Change
                them only through properties, modes, and slots; a detached or restyled copy has no
                match in code.
              </Step>
              <Step
                number="03"
                title="Find the component for the job"
                actions={
                  <button type="button" className="source-link home-link-button" onClick={openSearch}>
                    Search components
                    <ArrowIcon />
                  </button>
                }
              >
                Search by name or by what you need, or browse the component list. Each guide starts
                with when to use the component.
              </Step>
              <Step
                number="04"
                title="Let stacks own the spacing"
                actions={
                  <>
                    <GuideLink href={guideHref('vstack')}>VStack</GuideLink>
                    <GuideLink href={guideHref('hstack')}>HStack</GuideLink>
                  </>
                }
              >
                Lay out screens with VStack and HStack. Their gaps and padding come from tokens, so
                you never set spacing by hand.
              </Step>
              <Step
                number="05"
                title="Report what’s missing"
                actions={
                  <a className="source-link" href="#resources">
                    What to report
                    <ArrowIcon />
                  </a>
                }
              >
                When Coin can’t do what your design needs, tell the Coin team instead of working
                around it.
              </Step>
            </ol>
          </section>

          <section id="how-it-works" className="doc-section anchor-section">
            <header className="section-header">
              <p className="eyebrow">How components work</p>
              <h2>Properties, modes, slots</h2>
              <p>Every Coin component is set up the same way. The examples are live Coin components.</p>
            </header>
            <div className="home-how">
              <HowRow
                label="Properties"
                title="What it says and does"
                demo={
                  <div className="preview-stage home-how-stage">
                    <div className="home-how-specimens">
                      <Button label="Continue" icon="ic_arrow_next" accessibilityLabel="Continue" modes={buttonModes()} />
                      <Button
                        label="Continue"
                        disabled
                        accessibilityLabel="Continue"
                        modes={buttonModes({ 'Button / State': 'Disabled' })}
                      />
                    </div>
                    <span className="stage-label">Live Coin Button</span>
                  </div>
                }
                link={<GuideLink href={guideHref('button')}>See Button</GuideLink>}
              >
                <p>
                  A Button’s label, its icon, and whether it’s disabled are properties. Set them on
                  the instance instead of editing the layers inside.
                </p>
              </HowRow>

              <HowRow
                label="Modes"
                title="How it looks in context"
                demo={
                  <div className="preview-stage home-how-stage">
                    <div className="home-how-specimens is-pairs">
                      {FIGMA_MODES.AppearanceBrand.map((appearance) => (
                        <Button
                          key={appearance}
                          label={appearance}
                          accessibilityLabel={appearance}
                          modes={buttonModes({ AppearanceBrand: appearance, 'Button / Size': 'S' })}
                        />
                      ))}
                    </div>
                    <span className="stage-label">AppearanceBrand modes</span>
                  </div>
                }
                link={<GuideLink href="/?component=button#configuration">See Button configuration</GuideLink>}
              >
                <p>
                  Size, emphasis, appearance, and color mode are modes. In Figma they’re variable
                  modes on the instance or its frame; in code, the modes property. Colors and
                  spacing come from tokens under those modes, so you never pick them by hand.
                </p>
                <dl className="home-modes">
                  {FIRST_MODES.map((name) => (
                    <div key={name}>
                      <dt>{name}</dt>
                      <dd>{FIGMA_MODES[name].join(' · ')}</dd>
                    </div>
                  ))}
                </dl>
              </HowRow>

              <HowRow
                label="Slots"
                title="Components inside components"
                demo={<SlotDemo />}
                link={<GuideLink href={guideHref('buttongroup')}>See Button Group</GuideLink>}
              >
                <p>
                  A Button Group’s slot holds Buttons. They follow the group’s modes, and a mode set
                  on one of them wins, so set it only on purpose, like Emphasis High on the main
                  action.
                </p>
              </HowRow>
            </div>
          </section>

          <section id="guide-sections" className="doc-section anchor-section">
            <header className="section-header">
              <p className="eyebrow">Reading a guide</p>
              <h2>The same nine sections</h2>
              <p>Every guide follows this order, so you can go straight to what you need.</p>
            </header>
            <ol className="home-sections">
              {PAGE_NAV.map(([id, label], index) => (
                <li key={id}>
                  <span className="home-section-number" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <strong>{label}</strong>
                  <span>{SECTION_NOTES[id]}</span>
                </li>
              ))}
            </ol>
          </section>

          <section id="resources" className="doc-section anchor-section">
            <header className="section-header">
              <p className="eyebrow">Where Coin lives</p>
              <h2>Figma, code, and the team</h2>
              <p>Coin spans a few places. Here is what each one is for.</p>
            </header>
            <ul className="home-resources">
              <li className="home-resource">
                <p className="home-resource-kind">Figma</p>
                <h3>Coin Pattern Library</h3>
                <p>Approved compositions and flows built from Coin components. They live only in Figma.</p>
                <SourceLink href={FIGMA_PATTERNS}>Open in Figma</SourceLink>
              </li>
              <li className="home-resource">
                <p className="home-resource-kind">Figma</p>
                <h3>Coin Components Library</h3>
                <p>The published components these guides document. Design with them and keep them attached.</p>
                <SourceLink href={FIGMA_LIBRARY}>Open in Figma</SourceLink>
              </li>
              <li className="home-resource">
                <p className="home-resource-kind">Code</p>
                <h3>Storybook</h3>
                <p>The coded components on their own. Check how they behave and share stories with engineers.</p>
                <SourceLink href={STORYBOOK}>Open Storybook</SourceLink>
              </li>
              <li className="home-resource home-resource-wide">
                <p className="home-resource-kind">Team</p>
                <h3>Report to the Coin team</h3>
                <p>Tell the Coin team when you find:</p>
                <ul>
                  <li>Something your design needs that no pattern or component covers yet.</li>
                  <li>A component that behaves wrongly or differs from Figma.</li>
                  <li>A token or mode that is missing, misnamed, or has the wrong value.</li>
                  <li>A design in Figma that looks wrong or inconsistent.</li>
                </ul>
                <p>Include the Figma link and the guide or Storybook story it concerns.</p>
              </li>
            </ul>
          </section>
        </article>

        <footer>
          <span>Coin designer documentation</span>
          <a href="#overview">Back to top ↑</a>
        </footer>
      </main>
    </div>
  )
}
