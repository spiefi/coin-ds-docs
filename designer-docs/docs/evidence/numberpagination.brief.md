# Number Pagination brief

slug: numberpagination · label: Number Pagination · public API: NumberPagination (+ kit Backdrop for imagery, Card and Text for the light-surface Don't)
figma: https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=7522-7652 · storybook: docsUrl('numberpagination') · stories: Default=components-numberpagination--default, Active page=components-numberpagination--active-page, Custom children=components-numberpagination--custom-children
checked: 29 September 2026 · jfs-components 0.1.77 (newest package tag v0.1.77)
icon: `<><rect x="2" y="5.5" width="14" height="7" rx="3.5" stroke="currentColor" strokeWidth="1.5" fill="none" /><circle cx="6" cy="9" r="1.6" fill="currentColor" /><path d="M9.5 9h.01M12.5 9h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>`

Setup: `const LIGHT = { 'Color Mode': 'Light' } as Modes`; every NumberPagination gets `modes={LIGHT}` and an `onPageChange` that sets that example's own active page (each example keeps its own state). It is designed for imagery: show it inside the kit's `<Backdrop>` (compact unless stated) everywhere except where stated. No testID: pages are `[aria-label="Page n"]`; the container is `:scope > div` inside Anatomy.

## Overview
summary: Use Number Pagination to show which slide of a short media carousel is in view, and to jump to another.
principle: A few pages, over imagery. The screen tracks the page; the component shows it.
playground: `.preview-stage` holding a `<Backdrop>` with `<NumberPagination totalPages={pages} activePage={page} onPageChange={setPage} />`. Controls: Segment "Pages" 3 | 4 | 5 → `totalPages` (default 4; clamp the active page when it shrinks). Readout title "Showing", value "Slide <page> of <pages>". Stage label: "Live Coin Number Pagination".

## Anatomy
header: Anatomy · title: Numbers on a glass pill · description: A frosted, translucent pill holds one circular number per page. The page in view is a white circle with a dark number.
specimen: `<Anatomy surface="dark" …><NumberPagination totalPages={4} activePage={1} /></Anatomy>`
parts:
1. Glass pill — Frosted, translucent surface with a thin light border. — target: `:scope > div` — side: left
2. Active page — White circle with a dark number for the slide in view. — target: `[aria-label="Page 1"]` — side: top
3. Page number — Other pages in white; each is a 32 px pressable circle. — target: `[aria-label="Page 3"]` — side: bottom
marks: size `[aria-label="Page 4"]` right

## Configuration
header: Configuration · title: Set how many pages · description: Each page adds a 32 px circle. Keep the count small so the pill stays compact over the image.
Grid `coin-new-example-grid three`, each in a Backdrop:
- Three pages — `totalPages={3}`, page 1 — lesson: For a short set, such as three offers.
- Four pages — `totalPages={4}`, page 2 — lesson: The Figma default.
- Five pages — `totalPages={5}`, page 5 — lesson: About the most that stays compact.

## States
header: States · title: The white circle follows the page · description: The screen passes the active page and updates it when a number is pressed. Pressed numbers dim to 70%. There is no disabled state.
Grid `coin-new-example-grid`, each in a Backdrop:
- First slide — `totalPages={4}`, page 1 — lesson: The first number is white.
- Last slide — `totalPages={4}`, page 4 — lesson: The white circle moves to the last number.

## Sizing
header: Sizing · title: 39 px tall, 32 px per page · description: The pill is 39 px tall and grows by 32 px for each page: four pages are about 138 px wide. It does not wrap or scroll, so extra pages are cut off in a narrow space.
Measured diagram: `<Anatomy legend={false} surface="dark" marks={[{ kind: 'size', target: ':scope > div', side: 'top', label: 'both' }, { kind: 'size', target: '[aria-label="Page 1"]', side: 'bottom', label: 'both' }]}>` around `<NumberPagination totalPages={4} activePage={1} />`.

## Content
header: Content · title: Numbers only · description: The component writes the numbers from the page count; there is no text to add. Let the image or card above say what each slide is.
Body: one ExampleCard "Five slides" in a Backdrop with `totalPages={5}`, page 3.

## In context
header: In context · title: A photo carousel on a product card · description: The screen passes activePage and, when a number is pressed, shows that photo; here the line below reports the change. Number Pagination only reports the press.
Composition in `.coin-new-context`: `<Backdrop size="card">` with `<NumberPagination totalPages={4} …/>`. Below it, `<p className="coin-new-readout" role="status">` "Photo 1 of 4", updated on press.

## Do & Don'ts
header: Do & Don’ts · title: Keep it readable · description: Each pair shows pagination people can read versus pagination they can’t.
- Do Place it on imagery: White numbers stand out on a photo. — Backdrop with `totalPages={4}` | Don't Place it on a light surface: White numbers disappear on white. — `<Card modes={LIGHT}>` holding the same NumberPagination
- Do Keep to a few pages: Five numbers fit comfortably. — Backdrop with `totalPages={5}` | Don't Show every page of a long set: Twelve pages overflow a narrow space and some are cut off. — Backdrop with `totalPages={12}`

## Sources
header: Sources · title: Use the public Number Pagination contract · description: The guide compares the Figma component with the installed package and its Storybook stories.
note: Installed <code>jfs-components</code> is <code>0.1.77</code> from the team’s private package repository. The screen owns the active page and the slides; Number Pagination draws the numbers and reports presses. It has no arrows, disabled state, or overflow handling. On the web the active page is shown only visually, and the numbers are not grouped under a label.

## Limits
Do not show `children` custom content, `style`, arrows, a disabled state, or Dark mode. Do not imply the active page is announced (ticket #176) or that long sets scroll.
