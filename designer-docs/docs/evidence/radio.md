# Radio source evidence

## Checked

29 September 2026. Declared and installed `jfs-components` is `0.1.77` from the private package repo `spiefi/coin-components` (newest tag `v0.1.77`). Board ticket #131 (Design documentation — Marcin; Storybook coverage — Biscuit, done).

## Sources

- Figma: [Coin Components Library · Radio](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=922-3645), frame `922:3645` with eight 18 × 18 symbols: State = Idle, Hover, Active, Focus, Disabled × Selected = False/True (Idle has no True; Active is the selected variant). Tokens: `radio/width`/`height` 18, `radio/selector/size` 10; idle white with #22004a border; selected #5d00b5 with a white dot; hover glow 4 px #ede7ff; focus ring 4 px #ffde00 with `radio/focus/border/color` #fd5a13; disabled #ebebed / #c2c4c7; disabled selected #dbcfff / #c9b7ff. Read through the Figma MCP (jiofinance.in account).
- Storybook: `components-radio--docs` ("used to select a single option from a set of options"; `RadioButton` is a deprecated alias). Stories: `--default` (interactive, toggles on press), `--all-states` (Idle and Disabled rows, unselected and selected).
- Package source `src/components/Radio/Radio.tsx` (0.1.77). Used by `HoldingsCard` as its header trailing.

## Contract

- Props: `selected` (default false), `disabled` (default false), `onPress`, `modes` (Color Mode), `style`, `testID`. No label, accessibility props, or group component; the screen keeps one value and passes `selected` to each Radio.
- States: idle, hover (glow), pressed (drawn as hover), focus (yellow ring), disabled, each unselected or selected. Hover, pressed, and focus are system-driven.
- Designer-configurable: selected, disabled, placement (list row trailing or beside a label). Developer-only: `onPress` wiring, `testID`.

## Rendered (installed 0.1.77, web, Light)

- `div[tabindex=0]` with no role, name, or checked state; 18 × 18, border 1 px. Unselected white / rgb(34, 0, 74); selected rgb(93, 0, 181) with a 10 px white dot; disabled rgb(235, 235, 237) / rgb(194, 196, 199), `aria-disabled`, `tabindex=-1`; disabled selected rgb(219, 207, 255) / rgb(201, 183, 255).
- Focus: 4 px rgb(255, 222, 0) ring; unselected border stays rgb(34, 0, 74) (Figma: #fd5a13; token missing from the package).
- Keyboard: Enter fires `onPress`; Space does not.
- The pressable area is the 18 px circle. In a `ListItem` with `onPress`, the row (a button named by title and support text) handles presses on the text; a press on the Radio itself fires only the Radio's `onPress`, so both need the same handler.

## Limits

- #175 (Components, To do, Component Bug; Mr. Biscuit, Anagha Ghotkar): no radio role, checked state, or name on the web; Space doesn't select; 18 px target; focus border token missing.
- No group or single-selection enforcement: the screen must allow only one `selected`.
- Hover and focus cannot be set by props; the page must not show them as options.

## Verification

`npm run verify` passed on 29 September 2026 (38 guides at 1280 and 390 px) on jfs-components 0.1.77; `guideKitSurvey` returned `{}`. Planner review of desktop and 390 px captures. Playground: pressing a label row's Radio changes the Frequency readout; Disable Yearly greys it and blocks presses. In context: rows and Radios select the account and Continue enables. Review fixes (brief errors): the Anatomy size mark collided with the specimen caption and was removed; the account rows in Configuration and Content now fill the example card.
