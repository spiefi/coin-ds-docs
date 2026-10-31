# NumberPagination (brief)

> Coin agent pack 0.1.78+24 · flagged · full entry: `components/numberpagination.md` (sources, all facts, flags)

Use Number Pagination to show which slide of a short media carousel is in view, and to jump to another.

**Use when**
- Show which slide of a short media carousel is in view, and let people jump to another.
- A photo carousel on a product card.

**Avoid when**
- Avoid: On a light surface: the white numbers disappear on white.
- Avoid: Showing every page of a long set: twelve pages don't fit, so people have to scroll the numbers to find the rest.

**Placement**
- A few pages, over imagery.
- Place it on imagery: white numbers stand out on a photo.
- Number Pagination is 39 px tall and grows by 32 px for each page: four pages are about 138 px wide.
- It does not wrap: pages that do not fit scroll sideways inside the glass background.

**Key rules**
- `totalPages`: Set how many pages with totalPages; each page adds a 32 px circle.
- `totalPages`: Keep the count small so Number Pagination stays compact over the image.
- `totalPages` = `3`: Three pages for a short set, such as three offers.
- `totalPages` = `4`: Four pages is the Figma default.
- `totalPages` = `5`: Five pages is about the most that stays compact.
- `totalPages`: In the package totalPages and activePage both default to 1, so a pagination with neither set shows a single number.
- `activePage`: The screen tracks the page and passes it as activePage (1-based); the component shows it.
- `activePage`: The screen passes the active page (activePage) and updates it when a number is pressed.

**Example:** A photo carousel on a product card, the guide's In context: four photos with the first in view. The screen draws the photo and puts Number Pagination over it (the component draws only the numbers); it passes activePage and, when a number is pressed, onPageChange gives that page; the screen shows that photo and passes the page back.

```tsx
<NumberPagination totalPages={4} activePage={1} onPageChange={() => {}} />
```

**Props:** `activePage`, `totalPages`, `onPageChange`, `children`, `modes`, `style`, `accessibilityLabel`. (* required)

**Gaps (report, do not work around)**
- Number Pagination has no arrows and no disabled state; pages that do not fit scroll inside the glass background.
- Figma's four-page Number Pagination is 136 px wide; the package's is 138 px, because its 1 px border is added.

Full entry: `components/numberpagination.md`. Links: `components/numberpagination.links.md`.
