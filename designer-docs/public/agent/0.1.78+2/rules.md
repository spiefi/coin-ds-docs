# Coin agent pack: rules for agents (pilot)

Pack 0.1.78+2 · jfs-components 0.1.78 · schema version 1.

**Pilot.** This pack has 30 entries, generated from the Coin
designer guides and the installed package, and is being tested.
21 come from designer guides (Button, TextInput, Badge, Accordion, Stack, BenefitCard, VStack, HStack, ButtonGroup, IconButton, Link, FormField, CheckboxItem, Tabs, TabItem, Nudge, AppBar, ActionFooter, Stepper, Step, Slider).
9 are undocumented: public exports with no guide, facts only
(Screen, Text, Title, Card, ListItem, ListGroup, Icon, Image, Divider).

## Rules

1. **Match the version.** Use this pack only when its jfs-components version
   (`0.1.78`) matches the installed package
   (`node_modules/jfs-components/package.json`). If it does not, find the
   matching release in `/agent/index.json`, or do not use the pack. Built
   from github:spiefi/coin-components#v0.1.78-c1fa197 (mirror commit edc36d0c813f6bf906900dfea3aca927e4916326; built from MrBiscuit/react-native-storybook-boilerplate-master@c1fa197, 2026-10-12).
2. **Use only what the facts list.** Use only components, props, values and
   slots that are in an entry's facts (or, for exports without an entry, in
   the package types). Never invent one.
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
8. **Pass modes to slot children.** Pass a component's `modes` to the Coin
   children in its slots.
9. **Prefer what exists.** Use an existing component when it fits. Compose
   supported Coin components for layouts and patterns. Report a gap when the
   request needs unsupported API, or a replacement for a component Coin lacks.

## Reading the pack

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

These jfs-components component exports exist but have no entry, so this pack
gives no guidance for them. They are not missing from Coin: work from their
types and say they are undocumented here.
AccordionCheckbox, AccountCard, ActionTile, Additem, AllocationComparisonChart, AmountInput, AreaLineChart, Attached, AutoplayControl, Avatar, AvatarGroup, Balance, BottomNav, BottomNavItem, BrandChip, Breadcrumbs, BubbleChart, CalendarGlyph, CardAdvisory, CardBankAccount, CardCTA, CardFeedback, CardFinancialCondition, CardInsight, CardProviderInfo, Carousel, CarouselCardAccounts, CategoryCard, CcCard, ChatAttachment, ChatBubble, ChatResponse, Checkbox, CheckboxGroup, ChipGroup, ChipSelect, CircularProgressBar, CircularProgressBarDoted, CircularRating, ClusterBubble, CompareTable, ComparisonBar, ContentSheet, CounterBadge, CoverageBarComparison, CoverageRing, DebitCard, Disclaimer, DonutChart, DonutChartSummary, Drawer, Dropdown, DropdownInput, DropdownItem, DropdownMenu, DropdownMenuItem, EmptyState, ExpandableCheckbox, FavoriteToggle, FilterBar, Form, FormUpload, FullscreenModal, Gauge, Grid, HelloJioInput, HeroSection, HoldingsCard, IconCapsule, InputSearch, InstitutionBadge, JFSThemeProvider, JioDot, LazyList, LinearMeter, LinearProgress, LottieIntroBlock, LottiePlayer, MediaCard, MediaSource, MerchantProfile, MessageField, MetricLegendItem, ModalSheet, MoneyValue, MonthlyStatusGrid, NavArrow, NoteInput, NumberPagination, Numpad, OTP, OTPResend, Overlay, PageHero, PaymentFeedback, PdpCcCard, PlanComparisonCard, Popup, PortfolioHero, PoweredByLabel, ProductLabel, ProductMerchandisingCard, ProductOverview, ProfileCard, ProgressBadge, ProjectionMarker, Radio, RadioButton, RangeTrack, RechargeCard, SavingsGoalSummary, ScrollArea, Section, SegmentedControl, SegmentedTrack, SegmentedTrackSegment, Skeleton, SkeletonGroup, Slot, Spinner, StatGroup, StatItem, StatusHero, StepLabel, StrengthIndicator, SuggestiveSearch, SummaryTile, SupportText, SupportTextIcon, SwappableAmount, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow, TestimonialsCard, TextSegment, ThreadHero, Toast, ToastProvider, Toggle, Tooltip, TooltipContent, TooltipTrigger, TransactionBubble, TransactionDetails, TransactionStatus, UpiHandle, ValueBackMetric.
