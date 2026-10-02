import { useState } from 'react'
import { Card, NumberPagination, type Modes } from 'jfs-components'
import { ComponentGuideTemplate, type GuideSectionSlots } from '../ComponentGuideTemplate'
import { Anatomy, Backdrop, DoDont, ExampleCard, Readout, Segment, Sources, docsUrl } from '../guide-kit'
import { defineGuide } from './define'

const FIGMA = 'https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=7522-7652'
const LIGHT = { 'Color Mode': 'Light' } as Modes

function Pager({ total, initial }: { total: number; initial: number }) {
  const [page, setPage] = useState(initial)
  return <NumberPagination totalPages={total} activePage={page} onPageChange={setPage} modes={LIGHT} />
}

function OnImage({ total, initial }: { total: number; initial: number }) {
  return <Backdrop><Pager total={total} initial={initial} /></Backdrop>
}

function NumberPaginationGuide() {
  const [pages, setPages] = useState(4)
  const [page, setPage] = useState(1)
  const [photo, setPhoto] = useState(1)
  const changePages = (value: '3' | '4' | '5') => {
    const next = Number(value)
    setPages(next)
    setPage(current => Math.min(current, next))
  }

  const sections: GuideSectionSlots = {
    anatomy: {
      header: 'Anatomy', title: 'Numbers on a glass pill',
      description: 'A frosted, translucent pill holds one circular number per page. The page in view is a white circle with a dark number.',
      body: <Anatomy surface="dark" parts={[
        { name: 'Glass pill', note: 'Frosted, translucent surface with a thin light border.', target: '[role="navigation"]', side: 'left' },
        { name: 'Active page', note: 'White circle with a dark number for the slide in view.', target: '[aria-label="Page 1"]', side: 'top' },
        { name: 'Page number', note: 'Other pages in white; each is a 32 px pressable circle.', target: '[aria-label="Page 3"]', side: 'bottom' },
      ]} marks={[{ kind: 'size', target: '[aria-label="Page 4"]', side: 'right' }]}>
        <NumberPagination totalPages={4} activePage={1} modes={LIGHT} onPageChange={() => {}} />
      </Anatomy>,
    },
    configuration: {
      header: 'Configuration', title: 'Set how many pages',
      description: 'Each page adds a 32 px circle. Keep the count small so the pill stays compact over the image.',
      body: <div className="coin-new-example-grid three">
        <ExampleCard title="Three pages" description="For a short set, such as three offers."><OnImage total={3} initial={1} /></ExampleCard>
        <ExampleCard title="Four pages" description="The Figma default."><OnImage total={4} initial={2} /></ExampleCard>
        <ExampleCard title="Five pages" description="About the most that stays compact."><OnImage total={5} initial={5} /></ExampleCard>
      </div>,
    },
    states: {
      header: 'States', title: 'The white circle follows the page',
      description: 'The screen passes the active page and updates it when a number is pressed. Pressed numbers dim to 70%. There is no disabled state.',
      body: <div className="coin-new-example-grid">
        <ExampleCard title="First slide" description="The first number is white."><OnImage total={4} initial={1} /></ExampleCard>
        <ExampleCard title="Last slide" description="The white circle moves to the last number."><OnImage total={4} initial={4} /></ExampleCard>
      </div>,
    },
    sizing: {
      header: 'Sizing', title: '39 px tall, 32 px per page',
      description: 'The pill is 39 px tall and grows by 32 px for each page: four pages are about 138 px wide. It does not wrap: pages that do not fit scroll sideways inside the pill.',
      body: <Anatomy legend={false} surface="dark" marks={[
        { kind: 'size', target: '[role="navigation"]', side: 'top', label: 'both' },
        { kind: 'size', target: '[aria-label="Page 1"]', side: 'bottom', label: 'both' },
      ]}>
        <NumberPagination totalPages={4} activePage={1} modes={LIGHT} onPageChange={() => {}} />
      </Anatomy>,
    },
    content: {
      header: 'Content', title: 'Numbers only',
      description: 'The component writes the numbers from the page count; there is no text to add. Let the image or card above say what each slide is.',
      body: <ExampleCard title="Five slides"><OnImage total={5} initial={3} /></ExampleCard>,
    },
    context: {
      header: 'In context', title: 'A photo carousel on a product card',
      description: 'The screen passes activePage and, when a number is pressed, shows that photo; here the line below reports the change. Number Pagination only reports the press.',
      body: <div className="coin-new-context">
        <Backdrop size="card"><NumberPagination totalPages={4} activePage={photo} onPageChange={setPhoto} modes={LIGHT} /></Backdrop>
        <p className="coin-new-readout" role="status">Photo {photo} of 4</p>
      </div>,
    },
    'dos-donts': {
      header: 'Do & Don’ts', title: 'Keep it readable',
      description: 'Each pair shows pagination people can read versus pagination they can’t.',
      body: <div className="coin-new-stack">
        <DoDont good={<OnImage total={4} initial={1} />} bad={<Card modes={LIGHT}><Pager total={4} initial={1} /></Card>}
          goodTitle="Place it on imagery" badTitle="Place it on a light surface"
          goodCaption="White numbers stand out on a photo." badCaption="White numbers disappear on white." />
        <DoDont good={<OnImage total={5} initial={1} />} bad={<OnImage total={12} initial={1} />}
          goodTitle="Keep to a few pages" badTitle="Show every page of a long set"
          goodCaption="Five numbers fit comfortably." badCaption="Twelve pages don’t fit, so people must scroll the pill to find the rest." />
      </div>,
    },
    sources: {
      header: 'Sources', title: 'Use the public Number Pagination contract',
      description: 'The guide compares the Figma component with the installed package and its Storybook stories.',
      body: <Sources checked="2 October 2026" figmaUrl={FIGMA} storybookUrl={docsUrl('numberpagination')} stories={[
        { label: 'Default', id: 'components-numberpagination--default' },
        { label: 'Active page', id: 'components-numberpagination--active-page' },
        { label: 'Custom children', id: 'components-numberpagination--custom-children' },
      ]}>Declared and installed <code>jfs-components</code> is <code>0.1.78</code> from the team’s private package repository. The screen owns the active page and the slides; Number Pagination draws the numbers and reports presses. It has no arrows or disabled state; pages that do not fit scroll inside the pill. On the web the active page is announced as the current page, and the numbers are grouped under the name “Pagination”.</Sources>,
    },
  }

  return <ComponentGuideTemplate metadata={{
    slug: 'numberpagination',
    corePrinciple: 'A few pages, over imagery. The screen tracks the page; the component shows it.',
    figmaUrl: FIGMA, storybookUrl: docsUrl('numberpagination'),
  }} playground={<>
    <div className="preview-stage">
      <Backdrop><NumberPagination totalPages={pages} activePage={page} onPageChange={setPage} modes={LIGHT} /></Backdrop>
      <span className="stage-label">Live Coin Number Pagination</span>
    </div>
    <div className="controls-panel">
      <Segment label="Pages" value={String(pages) as '3' | '4' | '5'} options={['3', '4', '5'] as const} onChange={changePages} />
      <Readout title="Showing" value={`Slide ${page} of ${pages}`} />
    </div>
  </>} sections={sections} />
}

export default defineGuide({
  slug: 'numberpagination',
  label: 'Number Pagination',
  summary: 'Use Number Pagination to show which slide of a short media carousel is in view, and to jump to another.',
  keywords: ['pagination', 'page indicator', 'carousel', 'pager', 'slides'],
  icon: <><rect x="2" y="5.5" width="14" height="7" rx="3.5" stroke="currentColor" strokeWidth="1.5" fill="none" /><circle cx="6" cy="9" r="1.6" fill="currentColor" /><path d="M9.5 9h.01M12.5 9h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
  Component: NumberPaginationGuide,
})
