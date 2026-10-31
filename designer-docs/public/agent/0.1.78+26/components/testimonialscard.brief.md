# TestimonialsCard (brief)

> Coin agent pack 0.1.78+26 · documented · full entry: `components/testimonialscard.md` (sources, all facts, flags)

Use a Testimonials Card for one customer quote, their initials or photo, their name, and their words, usually in a sideways row.

**Use when**
- One customer quote: their initials or photo, their name, and their words, usually in a sideways row.
- A real person, in their own words.

**Avoid when**
- Avoid: A profile: the upstream Storybook docs, as the evidence records them, say the card is not a profile; use a Profile Card. Use instead: ProfileCard.
- Avoid: A review with stars: the upstream Storybook docs, as the evidence records them, say the card is not one; it has no rating.
- Avoid: A quote that needs a rating, a date, or a link on the card: the upstream Storybook docs, as the evidence records them, list none of these.

**Placement**
- In the guide's In context, customer quotes sit in a row that scrolls sideways under a section title.
- The cards keep their 180 px, so the row scrolls instead of squeezing them.
- The card is 180 px wide and doesn't stretch to its host.
- Its height follows the quote: 12 px of padding, the 42 px avatar, 12 px, the name on a 16 px line, 2 px, then 16 px for each line of the quote.

**Key rules**
- `avatarProps`: The card shows an Avatar in every configuration, and avatarProps sets it: monogram shows the person’s initials, and imageSource shows their photo.
- `avatarProps`: monogram alone in avatarProps shows initials; no Avatar style is needed.
- `avatarProps`: Without avatarProps it shows the initials of the title.
- `Avatar Size`: Avatar Size on the card’s modes sets the avatar to 42, 36, or 29 px; an Avatar Size in avatarProps’ own modes wins.
- `Avatar Size` = `L`: With no Avatar Size set, the avatar is L, 42 px, the default.
- `onPress`: In the guide's row of quotes, each card opens that customer’s full review through onPress; onPress is optional, and without it the card is a quote to read.
- `disabled` = `true`: disabled dims the card to half, stops presses, and takes it out of the Tab order.
- `disabled`: disabled works only on a card with onPress; on a card without onPress it changes nothing.

**Example:** A row of quotes, the guide's In context: a Title over a row that scrolls sideways, each card keeping its 180 px. Each card shows the customer's initials through avatarProps' monogram, opens that customer's full review through onPress (the empty handler stands for opening it), and has an accessibilityLabel that says where it goes. ScrollArea has no entry in this pack; it is the horizontal scroller the guide's In context uses.

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

**Props:** `title`, `body`, `modes`, `style`, `avatarProps`, `accessibilityLabel`, `onPress`, `disabled`. (* required)

**Modes it reads:** Avatar Size, Badge Size, Color Mode, context 10, Context2, Context4, Page type, Profile Card Appearance.

**Gaps (report, do not work around)**
- Figma’s card has Title and Body text properties and Show Footer Text and Show Button switches, but none of them changes a layer.

Full entry: `components/testimonialscard.md`. Links: `components/testimonialscard.links.md`.
