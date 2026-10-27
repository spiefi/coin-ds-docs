# CardCTA source evidence

Package, Figma, and Storybook evidence for the Card CTA guide (board ticket #150, Design documentation — Marcin; Storybook coverage — Biscuit, done: "Rewrote CardCTA to the handwritten outline. On GitHub main 7b7c79f0").

## dbe0e02 install (28 October 2026, not this guide's tickets)

The docs now install mirror tag `v0.1.78-dbe0e02` (Biscuit's `main` at dbe0e02) to publish the Component Fix batch #343–#406 (Penny run run_92acfa9d). Biscuit's ace46ca and dbe0e02 also changed CardCTA for #345, which isn't in that release, so this guide's copy wasn't re-checked and waits for #345's own publish. Only the anatomy selectors changed, so the page passes on this build: the IconCapsule is now `role="presentation"` and `aria-hidden`, so the Icon target is `${R} > div:last-child > div:first-child`. `npm run verify` passes.

## Checked

19 October 2026. Installed `jfs-components` is `0.1.78` from mirror tag `v0.1.78-a116616` (Biscuit's `main` at a116616, 16 October, which includes 7b7c79f0). `npm run coin:status` shows one newer upstream commit (c7d3348); `CardCTA.tsx` is byte-identical there. Rendered with react-native-web 0.21.2 in headless Chrome with JioType Var loaded.

## Sources

- Package: `src/components/CardCTA/CardCTA.tsx` (631 lines, plain function, no statics). Exports `CardCTA`, `CardCTAProps`, `CardCTAType`, `CardCTATypeInput` (`components/index.ts:81`). Renders a Coin `Button`, plus `IconCapsule` (cta), `Badge` + `ButtonGroup` of two `IconButton`s (rating), or `Avatar` (sip).
- Figma: [Coin Components Library · Card/CTA](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=3693-4477), component set `3693:4477`, variant `type` = CTA (default, 320 × 194), Sip (320 × 241), Rating (320 × 145). CTA: a gold Badge, title "FinSense", body "+500 JioPoints", a caption line, a purple S Button, and a full-bleed picture in the right 2/5 (`MediaBlock = Image`). Sip: avatar, title, body, headline / description / subtitle, Button (`Context = CTACard`). Rating: purple Badge (`AppearanceBrand = Secondary`), title, body, Button and like / dislike (`Context = CTACard`). Booleans Header slot, Slot, Badge, caption; slots slots, slot, slot2.
- Storybook (published `index.json`): docs `components-cardcta--docs` (older generated page); stories `--default`, `--rating`, `--sip`, `--with-custom-slots`, `--short-content`, `--long-button-label`, in a 360 px max-width frame with 20 px padding (320 px card).
- Biscuit's handwritten `CardCTA.mdx` (upstream, not the published page): "a prompt with one next step. It does not complete the action. The button does." Types: cta for an offer or setup step, rating for a score and a reaction, sip for a person or plan. Title is the offer, body the consequence, button label a verb (Set up, Save, Start). Don't use for a status message (CardFeedback) or a bank or product summary (CardBankAccount, CardProviderInfo); don't add a second primary button. No card-level `onPress`.

## Contract

`type` (`cta` default | `rating` | `sip`, any casing). Common: `title`, `body`, `buttonLabel` (default "Button"; "Save" on rating), `onPressButton`, `buttonSlot`, `modes`, `style`. cta: `iconName` (default `ic_upi_number`), `iconSlot`. rating: `ratingLabel`, `showRatingActions` (true), `showButton` (true), `ratingMediaAlign` (`center`), `onPressLike`, `onPressDislike`, `ratingBadgeSlot`, `ratingActionsSlot`. sip: `headline`, `description`, `subtitle`, `avatarSource` (none: the Avatar's stock portrait), `avatarSlot`. Props for one type do nothing on the others. No `...rest`: `testID` and `accessibilityLabel` are dropped. Placeholder defaults for every text.

- The card isn't pressable; the Button and IconButtons keep their own states. The Button is always pressable (`onPressButton || noop`); the card can't disable it.
- Nothing clamps the title or body. The Button grows with its label (non-breaking spaces, clip) and never wraps; the root is `overflow: visible`, so a long label runs past the card.
- Slots are cloned with the card's modes plus the type's forced modes; a child's own `modes` win.

## Modes and tokens

Reads the theme provider (`useTokens`) under `modes`; no defaults of its own. Forced on children: Button `{ AppearanceBrand: 'Secondary', 'Button / Size': 'S' }`; IconCapsule `{ 'Icon Capsule Size': 'M', Emphasis: 'Medium', AppearanceBrand: 'Secondary' }`; Avatar `{ 'Avatar Size': 'L' }`; like / dislike `{ 'Button / Size': 'S', Emphasis: 'Low', AppearanceBrand: 'Neutral' }`; Badge gets the card's modes.

- Panel (`cardCTA/*`, single mode): white `#ffffff`, radius 12, 1 px border, left padding 22/8/22/12, gap 16, title 16/18/700 `#0c0d10` (20 px rendered line), body 14/17/400 `#13002d`.
- Emphasis (card): Medium → Button `#e4dbff` / `#5d00b5`; Low → transparent; rating Badge lightens. High (default) `#5d00b5` / white.
- Semantic Intent System: Button and IconCapsule take AppearanceSystem's colour (positive `#26ab21`, warning `#f06e0f`, negative `#f50030`); rating Badge green.
- AppearanceBrand (card): only the rating Badge (Primary gold `#cea15a` default, Secondary `#5d00b5`, Neutral, Tertiary).
- Context: CTACard → 58 px IconCapsule; Nudge&Alert → smaller Button and capsule; ListItem → taller Button. MediaBlock Image → right column padding 0.
- Page type SubPage and context 8 Section → border `#ebebed`.

## Web render

cta: root `div` (row) › left `div` (3fr; text wrap › title, body `div[dir=auto]`; button wrap › `button[role=button]` with the label and a hidden measuring copy) › right `div` (2fr) › IconCapsule `div[role=img]`. rating: root (column) › content (badge wrapper, text wrap) › footer (button wrap, ButtonGroup of two `button`s). sip: root › wrap (Avatar `div[role=img]`, text wrap, facts, button wrap). No `data-testid`. At 320 with Figma's copy: cta 320 × 137, rating 320 × 148, sip 320 × 245. The guide's Sizing diagram ("Set up UPI Number", a two-line body) measures 320 × 154, with 16 px between the text and the button.

The default Button's measuring copy is a 9,999 px wide invisible text box; without a clipping ancestor the page's `scrollWidth` grows to about 10,000 px. A `buttonSlot` Button or `showButton={false}` doesn't add it.

## Discrepancies

- Figma's CTA is a picture card with a badge and a caption line; the package's cta has an IconCapsule, no badge or caption. A picture through `iconSlot` with `MediaBlock: 'Image'` isn't clipped to the card's corners.
- Figma's rating badge is purple (variant sets AppearanceBrand Secondary); the package's is gold by default.
- `ratingMediaAlign` doesn't move the default Badge (Badge has its own `alignSelf: flex-start`).
- Title 20 px line (Figma 18); rating 148 (145), sip 245 (241). Like / dislike 26 px (Figma 28).
- The mdx says title one line, body up to three; nothing enforces either. The default body copy says "up to 3 lines" and takes 4 at 320 px.
- Default avatar is a stock photo of a person. Capsule and Avatar are `role=img` with no name; like / dislike names are fixed in English.
- The Default story's `Button / Size: M` does nothing (forced S). Published docs page is the older generated one.

## Hosting

Storybook shows the card in a 320 px column on the canvas. The guide gives each card `style={{ width: 320 }}` and puts it in the kit's `FitWidth` (on the grey example stages, in Do & Don'ts, the playground, and In context), which scales it on narrow screens and clips the Button's measuring copy so the page doesn't scroll sideways. sip uses `avatarSource` = `src/assets/jio-gold-logo.png` (a Jio Gold SIP); the package's fallback is a stock portrait.

## Tickets

- #345 (Component Bug, Biscuit): measuring copy makes pages scroll sideways, long labels overflow, picture slot not clipped, Figma CTA picture/badge/caption missing, rating badge colour, `ratingMediaAlign`, stock-photo avatar, no `testID` or names, Storybook Default arg.

## Limits

- Not shown: Dark, Context Nudge&Alert and ListItem, Button / State, ratingBadgeSlot, ratingActionsSlot, avatarSlot, ratingMediaAlign (described only).
- No card-level press, disabled state or clamping.
