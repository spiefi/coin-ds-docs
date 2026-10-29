# Coin agent pack: rules for agents (pilot)

Pack 0.1.78+5 · jfs-components 0.1.78 · schema version 1.

**Pilot.** This pack has 40 entries, generated from the Coin
designer guides and the installed package, and is being tested.
31 come from designer guides (Button, TextInput, Badge, Accordion, Stack, BenefitCard, VStack, HStack, ButtonGroup, IconButton, Link, FormField, CheckboxItem, Tabs, TabItem, Nudge, AppBar, ActionFooter, Stepper, Step, Slider, CardAdvisory, PaymentFeedback, ModalSheet, SuggestiveSearch, PdpCcCard, HoldingsCard, CardBankAccount, Overlay, TransactionDetails, ExpandableCheckbox).
9 are undocumented: public exports with no guide, facts only
(Screen, Text, Title, Card, ListItem, ListGroup, Icon, Image, Divider).

## Building with Coin

How to build screens and pages with Coin, in any tool. The facts (what each
component is, its props, slots and examples) are in this pack's entries: read
them for the components your task uses, not all of them.

### Plan with the largest block that fits

- For each part of a screen, use the largest existing block that fits: a
  template when the pack has one (this release has none), then a component,
  then a composition of components. One screen can mix all three.
- Choose by purpose: read each candidate's summary, use when and avoid when.
- A part nothing fits is new: compose it from Coin components and report it.
  A composition that keeps coming back is a candidate for a template.
- Never rebuild a component Coin has, or one it lacks. Report the gap.

### Use only components with an entry

Use only components that have an entry in this pack. The exports under "Not
in this pack" are not for building: some are Coin components this pack does
not cover yet, and some exist only in code and are not part of Coin (Section
is one). Ask, or report that the request needs one.

### Leave modes at their defaults

- Coin components look right with no modes set. With none, a Button is the
  main action: AppearanceBrand Primary, Emphasis High, Button / Size M,
  Semantic Intent Brand.
- Give components content, actions and layout. Do not set modes to change how
  they look.
- Set a mode only when an entry's rule says this content needs it (such as
  Semantic Intent System for an outcome with a clear positive, warning or
  negative meaning), when two actions share a place, or when you build
  something new.
- Do not copy modes from examples. Many set modes that only repeat the
  defaults, and Color Mode. Leave both out.
- Never change colour, border, radius or font through style.

### Color Mode comes from the device

Never set Color Mode on a component or a screen. The app sets it once, from
the device's light or dark setting, and Coin parents pass it down.

### In a slot, the parent decides the look

Some Coin parents give the components in their slots a context: a default
Button in a Nudge, a ListItem or an AppBar gets its look and size from it.
Put default components in slots, and do not set appearance, emphasis, size or
intent on them. The context decides those, and modes you add can undo it.

### A built-in part needs only its props

When a component has a built-in part, such as a card's call to action set
through `buttonLabel` and a press handler, the component styles it.

- Give the part its text and its action, nothing else.
- Do not set modes on the component to restyle the part: in some components
  they reach it.
- If the part does not fit the design, do not swap or restyle it. Report it.

### Two actions in one place

One action leads. When the parent does not decide which, keep the leading
action at its defaults and set Emphasis Medium on the other. Report it: this
rule is provisional.

### Something new

- Set modes only for something Coin does not cover yet: a layout or a place no
  context handles. Set the fewest that work, with values the facts list, and
  report each one and why.
- Coin has no semantic tokens and no Section component yet. For the page
  background, use Screen. Other surfaces with no Coin component, such as a
  band or a website section, may use Color Mode primitives for now: by name
  (`mode/<ramp>/<step>`), never hex or rgb, never on a Coin component, and
  each one listed in your report.
- Primitive steps are relative to the mode, not fixed shades:
  `mode/Grey/2500` is white in Light and black in Dark, and `mode/Grey/100`
  is the reverse. Choose a step by its contrast with the content.

### In code

Import from the package root only, never from internal paths. Set Color Mode
once, at the app root:

```tsx
const scheme = useColorScheme()

<JFSThemeProvider modes={{ 'Color Mode': scheme === 'dark' ? 'Dark' : 'Light' }}>
  <Screen>{/* … */}</Screen>
</JFSThemeProvider>
```

Resolve a primitive through Coin, so it follows the device:
`useTokens().getVariable('mode/Grey/2400')`.

### Check before you finish

1. Color Mode is set only where the app reads it from the device.
2. Every mode you set has a reason: an entry's rule for this content, "Two
   actions", or "Something new". Its value is in the facts.
3. No colour, border, radius or font overrides on Coin components, and no hex
   or rgb values.
4. Every component has an entry in this pack.
5. Slot children and built-in parts carry no appearance, emphasis or size
   modes.
6. Primitives appear only on surfaces with no Coin component, and all are
   listed.

If you can render the result, look at it in Light and Dark, narrow and wide.

### Report

- The Coin components you used.
- Every mode you set, and why.
- Every primitive you used, and where.
- Parts you composed because no template or component fitted.
- Gaps: what Coin is missing, and exports you did not use.
- Decisions the person needs to make.

## Reading the pack

1. **Match the version.** Use this pack only when its jfs-components version
   (`0.1.78`) matches the installed package
   (`node_modules/jfs-components/package.json`). If it does not, find the
   matching release in `/agent/index.json`, or do not use the pack. Built
   from github:spiefi/coin-components#v0.1.78-dbe0e02 (mirror commit 928f528f5dc65c3347d44039cec8a7fb7ecc1bba; built from MrBiscuit/react-native-storybook-boilerplate-master@dbe0e02, 2026-10-27).
2. **Use only what the facts list.** Use only components, props, values and
   slots that are in an entry's facts. Never invent one.
3. **Follow strength.** Treat `required` rules as constraints. Follow
   `recommended` rules unless the request asks otherwise, and say so when you
   depart from one. Avoid `discouraged` configurations.
4. **Follow avoidWhen.** When an avoidWhen rule matches the request, follow
   it, and use its `useInstead` component when it names one.
5. **Read facts by source.** `types`: the API accepts it, but nothing has
   proven how it behaves. `evidence`: checked behaviour, as of `checkedOn`.
   `unknown`: nothing establishes it; do not promise it. A gap: behaviour
   that was checked and found missing; report the gap instead of working
   around it.
6. **Read entries by state.** Treat `documented` entries as guidance and
   `undocumented` ones as hints. Do not rely on a flagged rule: each flag
   points at the item it concerns; a `flagged` entry is still guidance apart
   from those items.
7. **Keep copy within the content rules.**
8. **Pass modes on where the owner does not.** When a slot's owner does not
   pass its `modes` to the Coin children in the slot, pass them the owner's
   modes unchanged. Never add your own.

## Files

- `index.json`: every entry's id, category, tags, state, summary and
  useInstead targets. `category` is for discovery only, never a limit on
  composition.
- `components/<slug>.brief.md`: the short form of an entry (summary, when to
  use and avoid, placement, key rules, one example, props and gaps). Start
  there when you have briefs.
- `components/<slug>.md` and `.json`: the full entry, with the guide sentence
  behind every rule, all facts and all flags. Open it when the brief does not
  answer the question.
- `components/<slug>.links.md` and `graph.json`: which components an entry is
  used with, placed in, or replaced by.

## Not in this pack

These jfs-components component exports have no entry, so this pack gives no
guidance for them. Some are Coin components this pack does not cover yet;
others exist only in code and are not part of Coin. Do not build with them:
ask, or report that the request needs one.
AccordionCheckbox, AccountCard, ActionTile, Additem, AllocationComparisonChart, AmountInput, AreaLineChart, Attached, AutoplayControl, Avatar, AvatarGroup, Balance, BottomNav, BottomNavItem, BrandChip, Breadcrumbs, BubbleChart, CalendarGlyph, CardCTA, CardFeedback, CardFinancialCondition, CardInsight, CardProviderInfo, Carousel, CarouselCardAccounts, CategoryCard, CcCard, ChatAttachment, ChatBubble, ChatResponse, Checkbox, CheckboxGroup, ChipGroup, ChipSelect, CircularProgressBar, CircularProgressBarDoted, CircularRating, ClusterBubble, CompareTable, ComparisonBar, ContentSheet, CounterBadge, CoverageBarComparison, CoverageRing, DebitCard, Disclaimer, DonutChart, DonutChartSummary, Drawer, Dropdown, DropdownInput, DropdownItem, DropdownMenu, DropdownMenuItem, EmptyState, FavoriteToggle, FilterBar, Form, FormUpload, FullscreenModal, Gauge, Grid, HelloJioInput, HeroSection, IconCapsule, InputSearch, InstitutionBadge, JFSThemeProvider, JioDot, LazyList, LinearMeter, LinearProgress, LottieIntroBlock, LottiePlayer, MediaCard, MediaSource, MerchantProfile, MessageField, MetricLegendItem, MoneyValue, MonthlyStatusGrid, NavArrow, NoteInput, NumberPagination, Numpad, OTP, OTPResend, PageHero, PlanComparisonCard, Popup, PortfolioHero, PoweredByLabel, ProductLabel, ProductMerchandisingCard, ProductOverview, ProfileCard, ProgressBadge, ProjectionMarker, Radio, RadioButton, RangeTrack, RechargeCard, SavingsGoalSummary, ScrollArea, Section, SegmentedControl, SegmentedTrack, SegmentedTrackSegment, Skeleton, SkeletonGroup, Slot, Spinner, StatGroup, StatItem, StatusHero, StepLabel, StrengthIndicator, SummaryTile, SupportText, SupportTextIcon, SwappableAmount, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow, TestimonialsCard, TextSegment, ThreadHero, Toast, ToastProvider, Toggle, Tooltip, TooltipTrigger, TransactionBubble, TransactionStatus, UpiHandle, ValueBackMetric.
