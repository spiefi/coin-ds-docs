# TestimonialsCard

> Coin agent pack 0.1.78+23 (pilot). Generated from `components/testimonialscard.json`; the JSON is the source of truth.

- **State:** documented
- **Package:** jfs-components 0.1.78 · guide commit `e7ed622` · built 2026-10-31T01:50:12Z
- **Category:** card (for discovery only, not a limit on composition) · **Tags:** testimonial, customer quote, review card, quote card
- **Sources:** [guide](https://coin-designer-docs.vercel.app/?component=testimonialscard) · [Figma](https://www.figma.com/design/3z7bmhA73Ls7j8Eu4qhYhE/Coin-Components-Library?node-id=5267-1880) · [Storybook](https://jfs-components-storybook.vercel.app/?path=/docs/components-testimonialscard--docs)

Use a Testimonials Card for one customer quote, their initials or photo, their name, and their words, usually in a sideways row.

## Use when

- **recommended** One customer quote: their initials or photo, their name, and their words, usually in a sideways row.  
  _From summary: “Use a Testimonials Card for one customer quote, their initials or photo, their name, and their words, usually in a sideways row.”_
- **recommended** A real person, in their own words.  
  _From corePrinciple: “A real person, in their own words.”_

## Avoid when

- **discouraged** A profile: the upstream Storybook docs, as the evidence records them, say the card is not a profile; use a Profile Card. Use instead: `ProfileCard`.  
  _From evidence: “Not a review with stars (Rating) or a profile (ProfileCard).”_
- **discouraged** A review with stars: the upstream Storybook docs, as the evidence records them, say the card is not one; it has no rating.  
  _From evidence: “Not a review with stars (Rating) or a profile (ProfileCard).”_
- **discouraged** A quote that needs a rating, a date, or a link on the card: the upstream Storybook docs, as the evidence records them, list none of these.  
  _From evidence: “Limits: no rating, date, or link; a row should scroll rather than shrink the card.”_

## Anatomy

| Part | Holds | Always present | From |
| --- | --- | --- | --- |
| Avatar | An Avatar, 42 px; avatarProps sets its initials or photo. | yes | anatomy: “An Avatar, 42 px; avatarProps sets its initials or photo.” |
| Name | title, the person’s name, 14 px Bold. | no | anatomy: “title, the person’s name, 14 px Bold.” |
| Quote | body, 12 px; it wraps and never clips. | no | anatomy: “body, 12 px; it wraps and never clips.” |
| Card | 180 px wide, white, a 1 px grey border, 8 px corners. | yes | anatomy: “180 px wide, white, a 1 px grey border, 8 px corners.” |

## Allowed children

What each slot accepts, from the package types (the API limit, not a design recommendation).

_No slots._

## Placement

- **recommended** In the guide's In context, customer quotes sit in a row that scrolls sideways under a section title.  
  _From inContext: “Customer quotes scroll sideways under a section title, and each card opens that customer’s full review.”_
- **recommended** The cards keep their 180 px, so the row scrolls instead of squeezing them.  
  _From inContext: “The cards keep their 180 px, so the row scrolls instead of squeezing them.”_
- **recommended** The card is 180 px wide and doesn't stretch to its host.  
  _From sizing: “The card is always 180 px wide and never stretches to its host.”_
- **recommended** Its height follows the quote: 12 px of padding, the 42 px avatar, 12 px, the name on a 16 px line, 2 px, then 16 px for each line of the quote.  
  _From sizing: “Its height follows the quote: 12 px of padding, the 42 px avatar, 12 px, the name on a 16 px line, 2 px, then 16 px for each line of the quote.”_
- **recommended** With a one-line quote it is 112 px tall, as in Figma.  
  _From sizing: “With a one-line quote it is 112 px tall, as in Figma.”_

## Configuration

- **recommended** `avatarProps`: The card shows an Avatar in every configuration, and avatarProps sets it: monogram shows the person’s initials, and imageSource shows their photo.  
  _From configuration: “The card always shows an Avatar, and avatarProps sets it: monogram shows the person’s initials, and imageSource shows their photo.”_
- **recommended** `avatarProps`: monogram alone in avatarProps shows initials; no Avatar style is needed.  
  _From sources: “monogram alone in avatarProps shows initials, and a pressable card dims while pressed.”_
- **recommended** `avatarProps`: Without avatarProps it shows the initials of the title.  
  _From configuration: “Without avatarProps it shows the initials of the title.”_
- **recommended** `Avatar Size`: Avatar Size on the card’s modes sets the avatar to 42, 36, or 29 px; an Avatar Size in avatarProps’ own modes wins.  
  _From configuration: “Avatar Size on the card’s modes sets it to 42, 36, or 29 px; an Avatar Size in avatarProps’ own modes wins.”_
- **recommended** `Avatar Size` = `L`: With no Avatar Size set, the avatar is L, 42 px, the default.  
  _From configuration: “42 px, the default.”_
- **recommended** `onPress`: In the guide's row of quotes, each card opens that customer’s full review through onPress; onPress is optional, and without it the card is a quote to read.  
  _From inContext: “Customer quotes scroll sideways under a section title, and each card opens that customer’s full review.”_
- **recommended** `disabled` = `true`: disabled dims the card to half, stops presses, and takes it out of the Tab order.  
  _From states: “disabled dims it to half, stops presses, and takes it out of the Tab order.”_
- **recommended** `disabled`: disabled works only on a card with onPress; on a card without onPress it changes nothing.  
  _From fact `/facts/props/7` (disabled, source evidence)_

## Content

- **recommended** `title`: Write title as the person’s name the way they’d sign it, such as Aarav S., not the product.  
  _From content: “Write title as the person’s name the way they’d sign it, such as Aarav S., not the product.”_
- **recommended** `body`: Write body as what they said, in a sentence or two.  
  _From content: “Write body as what they said, in a sentence or two.”_
- **recommended** Cards in a row look best with quotes of similar length.  
  _From content: “cards in a row look best with quotes of similar length”_
- **recommended** `avatarProps`: Show a face or initials that belong to the name.  
  _From doDont: “A face or initials that belong to the name.”_
- **discouraged** `avatarProps`: Don't show the brand’s initials: “JF” beside Aarav S. reads as the company, not the customer.  
  _From doDont: ““JF” beside Aarav S. reads as the company, not the customer.”_
- **discouraged** `body`: Don't write a paragraph of marketing: the card grows tall and stops sounding like a person.  
  _From doDont: “The card grows tall and stops sounding like a person.”_

Good: “Aarav S.”, “Priya M.”, “Rohan K.”, “Neha J.”, “Renewing my car insurance took a minute.”, “Simple, fast, reliable.”, “Setting up my first SIP took less than two minutes.”, “I see all my accounts and my gold in one place now.”

Bad: “JF”, “JioFinance brings your bank accounts, cards, insurance, loans, and digital gold together in one secure app, with instant payments, smart insights, and rewards on every transaction you make.”

## States

| State | When | From |
| --- | --- | --- |
| Quote | Without onPress the card is text, and screen readers read it once: “Testimonial from Aarav S.: …”. | states: “Without onPress the card is text, and screen readers read it once: “Testimonial from Aarav S.: …”.” |
| Pressed | With onPress the whole card is one button; it dims while pressed and has no hover look. | states: “it dims while pressed and has no hover look.” |
| Disabled | With onPress and disabled: dimmed to half; presses do nothing. | states: “Dimmed to half; presses do nothing.” |

## Accessibility

- **recommended** `accessibilityLabel`: With onPress the whole card is one button, so give it an accessibilityLabel that says where it goes.  
  _From states: “With onPress the whole card is one button, so give it an accessibilityLabel that says where it goes; it dims while pressed and has no hover look.”_
- **recommended** Screen readers read the name and the whole quote together.  
  _From content: “Screen readers read the name and the whole quote together”_
- **recommended** `accessibilityLabel`: accessibilityLabel is the card's label for screen readers; left out, it is made from the title and body.  
  _From fact `/facts/props/5` (accessibilityLabel, source evidence)_
- **recommended** `onPress`: With onPress, Enter and Space press the card.  
  _From evidence: “Pressed dims to 0.7; disabled is 0.5 with `aria-disabled` and `tabindex -1`; Enter and Space press it; no hover look.”_

## Do and don’t

| Do | Don’t | Why |
| --- | --- | --- |
| Their initials | The brand’s initials | “JF” beside Aarav S. reads as the company, not the customer. |
| A sentence or two | A paragraph of marketing | The card grows tall and stops sounding like a person. |

## Examples

### A row of quotes, the guide's In context: a Title over a row that scrolls sideways, each card keeping its 180 px. Each card shows the customer's initials through avatarProps' monogram, opens that customer's full review through onPress (the empty handler stands for opening it), and has an accessibilityLabel that says where it goes. ScrollArea has no entry in this pack; it is the horizontal scroller the guide's In context uses.

```tsx
<VStack>
  <Title title="What customers say" subtitle="From people who switched this year" />
  <ScrollArea direction="horizontal">
    <HStack alignVertical="flex-start">
      <TestimonialsCard
        title="Aarav S."
        body="Renewing my car insurance took a minute."
        avatarProps={{ monogram: 'AS' }}
        onPress={() => {}}
        accessibilityLabel="Read Aarav S.’s full review"
      />
      <TestimonialsCard
        title="Priya M."
        body="Simple, fast, reliable."
        avatarProps={{ monogram: 'PM' }}
        onPress={() => {}}
        accessibilityLabel="Read Priya M.’s full review"
      />
      <TestimonialsCard
        title="Rohan K."
        body="Setting up my first SIP took less than two minutes."
        avatarProps={{ monogram: 'RK' }}
        onPress={() => {}}
        accessibilityLabel="Read Rohan K.’s full review"
      />
      <TestimonialsCard
        title="Neha J."
        body="I see all my accounts and my gold in one place now."
        avatarProps={{ monogram: 'NJ' }}
        onPress={() => {}}
        accessibilityLabel="Read Neha J.’s full review"
      />
    </HStack>
  </ScrollArea>
</VStack>
```

_From inContext: “Customer quotes scroll sideways under a section title, and each card opens that customer’s full review.”_

### One quote with no onPress, from the guide's Content and Configuration: the title is the person's name as they'd sign it and the body is what they said; with no avatarProps the avatar shows the initials of the title (RK). Screen readers read the card once.

```tsx
<TestimonialsCard title="Rohan K." body="Setting up my first SIP took less than two minutes." />
```

_From configuration: “Without avatarProps it shows the initials of the title.”_

### The person's photo, from the guide's Configuration: imageSource in avatarProps shows it in the avatar. The URI stands for that person's own photo.

```tsx
<TestimonialsCard
  title="Priya M."
  body="Simple, fast, reliable."
  avatarProps={{ imageSource: { uri: 'https://example.com/photos/priya-m.jpg' } }}
/>
```

_From configuration: “The card always shows an Avatar, and avatarProps sets it: monogram shows the person’s initials, and imageSource shows their photo.”_

## Facts

Source `types`: read from the installed package (accepted, not proven at runtime). `evidence`: checked on the date shown. `unknown`: nothing establishes it.

### Props

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `title` | `string` |  | `"Title"` |  | evidence (2026-10-28) | 14 px on a 16 px line, 2 px above the quote. Declared: The testimonial heading, typically the author's name. Default "Title", from the component source. |
| `body` | `string` |  | `"I was dreading renewing my car insurance, but JioFinance made it a breeze."` |  | evidence (2026-10-28) | Wraps: a one-line card is 180 × 112, and two quote lines give 128. Declared: The testimonial body copy. Default "I was dreading renewing my car insurance, but JioFinance made it a breeze.", from the component source. |
| `modes` | `Modes` |  |  |  | types | Mode configuration passed to the token resolver. Also forwarded to the Avatar child for consistent theming. |
| `style` | `StyleProp<ViewStyle>` |  |  |  | types | Optional style overrides for the card container. |
| `avatarProps` | `Partial<AvatarProps>` |  |  |  | evidence (2026-10-28) | monogram alone shows the initials; without avatarProps the initials come from the title; imageSource shows a photo. avatarProps.modes merge with the card's modes, and the avatar's own Avatar Size wins. Declared: Props forwarded to the Avatar component (e.g. a custom `imageSource`). Card `modes` are defaults; `avatarProps.modes` win. A `monogram` without `style` uses `style: 'Monogram'` so the stock photo does not appear. |
| `accessibilityLabel` | `string` |  |  |  | evidence (2026-10-28) | Left out, the card reads once as “Testimonial from <title>: <body>”. Declared: Accessibility label for the card region. Falls back to a label generated from the title and body. |
| `onPress` | `() => void` |  |  |  | evidence (2026-10-28) | The card dims to 0.7 while pressed; Enter and Space press it; no hover look. Declared: Press handler for the whole card. When set, the card becomes pressable (rendered through a `Pressable` with `accessibilityRole="button"`). |
| `disabled` | `boolean` |  |  |  | evidence (2026-10-28) | With onPress: 0.5 opacity, aria-disabled and tabindex -1 on the web. Without onPress it leaves a static card alone. Declared: Disable interaction when `onPress` is set. Also dims the card. |

### Modes

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `Avatar Size` | `mode collection` | L, M, S, XS | `"L"` |  | types | A token collection TestimonialsCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Badge Size` | `mode collection` | Medium, Small | `"Medium"` |  | types | A token collection TestimonialsCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Color Mode` | `mode collection` | Light, Dark | `"Light"` |  | types | A token collection TestimonialsCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `context 10` | `mode collection` | Default, jioPlus | `"Default"` |  | types | A token collection TestimonialsCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context2` | `mode collection` | Default, AppBar | `"Default"` |  | types | A token collection TestimonialsCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Context4` | `mode collection` | Default, Chip, Button, Badge, Badge/glass | `"Default"` |  | types | A token collection TestimonialsCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Page type` | `mode collection` | MainPage, SubPage, JioPlus | `"MainPage"` |  | types | A token collection TestimonialsCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |
| `Profile Card Appearance` | `mode collection` | Default, Premium | `"Default"` |  | types | A token collection TestimonialsCard reads (the package's FIGMA_COMPONENT_MODES). When modes leave it unset, the resolver uses the collection's default mode. |

### Slots

_No slots._

### Events

| Name | Type | Values | Default | Required | Source | Description |
| --- | --- | --- | --- | --- | --- | --- |
| `onPress` | `() => void` |  |  |  | types | Press handler for the whole card. When set, the card becomes pressable (rendered through a `Pressable` with `accessibilityRole="button"`). |

### Gaps

Behaviour that was checked and found missing. Report these; do not work around them.

- Figma’s card has Title and Body text properties and Show Footer Text and Show Button switches, but none of them changes a layer. _(evidence, 2026-10-28)_

## Flags

_None._
