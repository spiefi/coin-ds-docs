# NumberPagination

> Coin agent pack 0.1.78+15 (pilot). Generated from `components/numberpagination.json`; the JSON is the source of truth.

- **State:** flagged (1 flag, listed at the end)
- **Package:** jfs-components 0.1.78 · guide commit `cba512f` · built 2026-10-29T07:47:24Z
- **Category:** navigation (for discovery only, not a limit on composition) · **Tags:** pagination, page indicator, carousel, pager, slides
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=numberpagination) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=7522-7652) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-numberpagination--docs)

Use Number Pagination to show which slide of a short media carousel is in view, and to jump to another.

## Use when

- **recommended** Show which slide of a short media carousel is in view, and let people jump to another.  
  _From summary: “Use Number Pagination to show which slide of a short media carousel is in view, and to jump to another.”_
- **recommended** A photo carousel on a product card.  
  _From inContext: “A photo carousel on a product card”_

## Avoid when

- **discouraged** On a light surface: the white numbers disappear on white.  
  _From doDont: “White numbers disappear on white.”_
- **discouraged** Showing every page of a long set: twelve pages don't fit, so people have to scroll the pill to find the rest.  
  _From doDont: “Twelve pages don’t fit, so people must scroll the pill to find the rest.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Glass pill | Frosted, translucent surface with a thin light border; it holds one circular number per page. | yes | anatomy: “Frosted, translucent surface with a thin light border.” |
| Active page | White circle with a dark number for the slide in view (activePage). | yes | anatomy: “White circle with a dark number for the slide in view.” |
| Page number | Other pages in white; each is a 32 px pressable circle. | yes | anatomy: “Other pages in white; each is a 32 px pressable circle.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

| Slot | Accepts | Source |
| --- | --- | --- |
| `children` | `ReactNode` | types |

## Placement

- **recommended** A few pages, over imagery.  
  _From corePrinciple: “A few pages, over imagery.”_
- **recommended** Place it on imagery: white numbers stand out on a photo.  
  _From doDont: “White numbers stand out on a photo.”_
- **recommended** The pill is 39 px tall and grows by 32 px for each page: four pages are about 138 px wide.  
  _From sizing: “The pill is 39 px tall and grows by 32 px for each page: four pages are about 138 px wide.”_
- **recommended** It does not wrap: pages that do not fit scroll sideways inside the pill.  
  _From sizing: “It does not wrap: pages that do not fit scroll sideways inside the pill.”_

## Configuration

- **recommended** `totalPages`: Set how many pages with totalPages; each page adds a 32 px circle.  
  _From configuration: “Each page adds a 32 px circle.”_
- **recommended** `totalPages`: Keep the count small so the pill stays compact over the image.  
  _From configuration: “Keep the count small so the pill stays compact over the image.”_
- **recommended** `totalPages` = `3`: Three pages for a short set, such as three offers.  
  _From configuration: “For a short set, such as three offers.”_
- **recommended** `totalPages` = `4`: Four pages is the Figma default.  
  _From configuration: “The Figma default.”_
- **recommended** `totalPages` = `5`: Five pages is about the most that stays compact.  
  _From configuration: “About the most that stays compact.”_
- **recommended** `totalPages`: In the package totalPages and activePage both default to 1, so a pagination with neither set shows a single number.  
  _From fact `/facts/props/1` (totalPages, source evidence)_
- **recommended** `activePage`: The screen tracks the page and passes it as activePage (1-based); the component shows it.  
  _From corePrinciple: “The screen tracks the page; the component shows it.”_
- **recommended** `activePage`: The screen passes the active page (activePage) and updates it when a number is pressed.  
  _From states: “The screen passes the active page and updates it when a number is pressed.”_
- **recommended** `onPageChange`: Number Pagination only reports the press: onPageChange gives the page pressed, and the screen shows that slide and passes it back as activePage.  
  _From inContext: “Number Pagination only reports the press.”_
- **recommended** There is no disabled state.  
  _From states: “There is no disabled state.”_
- **recommended** It has no arrows.  
  _From sources: “It has no arrows”_
- **recommended** `children`: children replaces the default page buttons; activePage and totalPages are then ignored. The guide doesn’t show custom children.  
  _From fact `/facts/props/3` (children, source types)_

## Content

- **recommended** `totalPages`: The component writes the numbers from the page count (totalPages); there is no text to add.  
  _From content: “The component writes the numbers from the page count; there is no text to add.”_
- **recommended** Let the image or card above say what each slide is.  
  _From content: “Let the image or card above say what each slide is.”_

## States

| State | When | From |
| --- | --- | --- |
| Active | The page the screen passes as activePage is the white circle; the white circle follows the page as the screen updates it. | states: “The white circle follows the page” |
| Inactive | Every other page: a white number; each is a 32 px pressable circle. | anatomy: “Other pages in white; each is a 32 px pressable circle.” |
| Pressed | A number dims to 70% while it is pressed. | states: “Pressed numbers dim to 70%.” |

## Accessibility

- **recommended** On the web the active page is announced as the current page, and the numbers are grouped under the name “Pagination”.  
  _From sources: “On the web the active page is announced as the current page, and the numbers are grouped under the name “Pagination”.”_
- **recommended** `accessibilityLabel`: accessibilityLabel names the group of numbers; it defaults to “Pagination”.  
  _From fact `/facts/props/6` (accessibilityLabel, source evidence)_
- **recommended** Each number is a button named “Page n”; on the web Enter presses it. ⚑ flagged (trace-check)  
  _From evidence: “Pages: `button` 32 × 32 named "Page n", Enter activates”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Place it on imagery | Place it on a light surface | White numbers disappear on white. |
| Keep to a few pages | Show every page of a long set | Twelve pages don’t fit, so people must scroll the pill to find the rest. |

## Examples

### A photo carousel on a product card, the guide's In context: four photos with the first in view. The screen draws the photo and puts the pill over it (the component draws only the numbers); it passes activePage and, when a number is pressed, onPageChange gives that page; the screen shows that photo and passes the page back.

```tsx
<NumberPagination totalPages={4} activePage={1} onPageChange={() => {}} />
```

_From inContext: “The screen passes activePage and, when a number is pressed, shows that photo”_

### A short set, such as three offers: three pages, the first in view.

```tsx
<NumberPagination totalPages={3} activePage={1} onPageChange={() => {}} />
```

_From configuration: “For a short set, such as three offers.”_

### Five pages, about the most that stays compact, with the last slide in view: the white circle moves to the last number.

```tsx
<NumberPagination totalPages={5} activePage={5} onPageChange={() => {}} />
```

_From configuration: “About the most that stays compact.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `activePage` | `number` |  | `1` |  | evidence (2026-10-01) | On the web the page with this number has aria-current="page", so it is announced as the current page. Declared: The 1-based active page index. Ignored if `children` is supplied. Defaults to 1. Default 1, from the component source. |
| `totalPages` | `number` |  | `1` |  | evidence (2026-10-01) | Pages that don't fit scroll sideways inside the pill: twelve pages in a 360 px host scroll horizontally, and the last page can be scrolled into view. Declared: The total number of pages. Ignored if `children` is supplied. Defaults to 1. Default 1, from the component source. |
| `onPageChange` | `(page: number) => void` |  |  |  | types | Callback fired when a page button is pressed. Ignored if `children` is supplied. |
| `children` | `React.ReactNode` |  |  |  | types | Custom children to override the default page buttons. |
| `modes` | `Modes` |  |  |  | types |  |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types |  |
| `accessibilityLabel` | `string` |  | `"Pagination"` |  | evidence (2026-10-01) | On the web the container is a navigation landmark (nav) named “Pagination” by default; on native it is a toolbar. Declared: Accessible name for the pagination group. Defaults to `"Pagination"`. Default "Pagination", from the component source. |

### Modes

_No modes._

### Slots

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `children` | `React.ReactNode` |  |  |  | types | Custom children to override the default page buttons. |

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onPageChange` | `(page: number) => void` |  |  |  | types | Callback fired when a page button is pressed. Ignored if `children` is supplied. |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- Number Pagination has no arrows and no disabled state; pages that do not fit scroll inside the pill. _(evidence, 2026-10-08)_
- Figma's four-page pill is 136 px wide; the package's is 138 px, because its 1 px border is added. _(evidence, 2026-10-02)_

## Flags

Do not rely on a flagged item. A flag with an empty field concerns the entry as a whole.

- `/accessibility/2` · trace-check: Checked on jfs-components 0.1.77 (2026-09-29); the installed package is 0.1.78. Re-check before relying on it.
