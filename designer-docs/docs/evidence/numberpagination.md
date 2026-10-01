# Number Pagination source evidence

## Checked

29 September 2026. Declared and installed `jfs-components` is `0.1.77` from the private package repo `spiefi/coin-components` (newest tag `v0.1.77`). Board ticket #14 (Design documentation — Marcin; Storybook coverage — Biscuit, done).

## Sources

- Figma: [Coin Components Library · number pagination](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=7522-7652), symbol `7522:7652` (136 × 39) with a `Slot` of four `control toggle number` instances (32 × 32). Screenshot: a translucent grey pill; "1" in a white circle with a black number, "2"–"4" in white. Tokens: `numberPagination/background/color` #8d8d8d66, `numberPagination/border/color` #ffffff26, radius 9999, padding 4/4, `blur/minimal` 29, JioType Var 16/18 500, `controlNumber` 32 × 32 round, `control/active/text/color` #000000, `control/text/default` #ffffff. Read through the Figma MCP (jiofinance.in account).
- Storybook: `components-numberpagination--docs` (container: pill-shaped frosted glass; page items: circular targets, active page white; use for paginating horizontal media slides, lists, or card carousels; announce selection). Stories: `--default` (1 of 4), `--active-page` (3 of 5), `--custom-children`, all on a #333 surface.
- Package source `src/components/NumberPagination/NumberPagination.tsx` (0.1.77). `Carousel` uses its own pagination, not this component.

## Contract

- Props: `activePage` (1-based, default 1), `totalPages` (default 1), `onPageChange(page)`, `children` (replaces the page buttons), `modes`, `style`. No testID or label.
- The screen owns the active page: it passes `activePage` and updates it in `onPageChange`.
- Designer-configurable: page count, active page, placement on media. Developer-only: `onPageChange`, `children`.

## Rendered (installed 0.1.77, web, Light)

- Container 138 × 39 for four pages (Figma 136; the 1 px border is added), radius 19.5, border rgba(255, 255, 255, 0.15), glass fill behind. No role or label.
- Pages: `button` 32 × 32 named "Page n", Enter activates; active white with a black 16 px number, others transparent with white numbers; 70% opacity while pressed. No `aria-selected`/`aria-current` on the active page.
- Width grows 32 px per page; 12 pages in a 360 px host render 344 px wide and pages 11–12 are clipped.
- White numbers on a light surface are invisible; the component is designed for imagery or dark surfaces.

## Limits

- #176 (Components, To do, Component Bug; Mr. Biscuit, Anagha Ghotkar): active page not exposed on the web; no container label; extra pages clipped.
- No disabled state, arrows, or truncation. `children` custom content is not shown on the page.

## Verification

`npm run verify` passed on 29 September 2026 (38 guides at 1280 and 390 px) on jfs-components 0.1.77; `guideKitSurvey` returned `{}`. Planner review of desktop and 390 px captures. Playground Pages control and presses update "Slide n of m"; anatomy pins on the pill, active page, and a page number (shown at 2×); Sizing reads 138 × 39 and 32 × 32. Review fixes (brief errors): In context copy no longer promises a photo swap the demo does not show; the 12-page Don't says some pages are cut off (the Backdrop clips the first ones).

## 0.1.78 check

Checked 1 October 2026 against `jfs-components` 0.1.78 (mirror tag `v0.1.78`, built from Biscuit's `fix/component-bugs-v0.1.78` at `5b6894b`) in headless Chrome with react-native-web 0.21.2, on a test page and on this guide. The same checks were run against 0.1.77 as a baseline.

- #176, accessibility part fixed. The active page has `aria-current=page`. The container renders as `<nav aria-label="Pagination">` (a toolbar on native). Twelve pages in a 360 px host scroll horizontally, and the last page can be scrolled into view; 0.1.77 clipped pages 11–12. The guide's anatomy targets moved from `:scope > div` to `[role="navigation"]`.
- #176 regression; the ticket was moved back to In-Progress with a work note. The new horizontal ScrollView is as tall as the pill's padded content box (29 px) and clips vertically, so the 32 px page circles lose about 2 px at the top and 1 px at the bottom. In the "Four pages" example the button spans 447–479 px and the ScrollView 449–478 px. 0.1.77 drew the full circle, and Storybook still runs the older code.
- Open Coin gap #180 (Components, To do, Component Bug; Mr. Biscuit, Anagha Ghotkar), present in both 0.1.77 and 0.1.78. The blur layer (`backdrop-filter: blur(9px)`, border-radius 0) is not clipped to the rounded pill, so on a photo the blur shows square corners. On Storybook's plain background it is invisible.
