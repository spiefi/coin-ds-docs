# ContentSheet (brief)

> Coin agent pack 0.1.78+26 · documented · full entry: `components/contentsheet.md` (sources, all facts, flags)

Use a Content Sheet to show a short panel from the bottom of the screen, such as a month’s transactions or a payment choice.

**Use when**
- Show a short panel from the bottom of the screen, such as a month’s transactions or a payment choice.
- Choosing how to pay, as in the guide's In context: the sheet holds the payment options over the payment screen.

**Avoid when**
- Avoid: Content too long to read without scrolling: longer content deserves its own screen.

**Placement**
- In a screen the sheet docks to the bottom and spans the full width.
- Place the sheet in the screen it covers: it is not a portal or modal, and it docks to the bottom of its nearest positioned parent at full width.
- The sheet spans its screen and adds 12 px above and 41 px below the content, with 8 px between the title and the content.
- The sheet never sets a height: it grows with the content up to 70% of its screen, then the content scrolls under the title.

**Key rules**
- The sheet grows to fit its content; the screen decides when it shows.
- `title`: Add a title when the content needs a name.
- `title`: Without a title, the slot starts right under the top padding.
- `children`: The slot takes any content, and the sheet’s height follows it.
- `children`: Let the sheet fit its content: one row makes a short sheet.
- Avoid: `style`: Don't set a fixed height (a height in style): empty space fills the sheet under one row.
- `visible`: The screen shows and hides the sheet (visible): it springs up from the bottom and back down.
- `visible`: visible is on by default, so the sheet springs up from the bottom edge when it mounts; set to false, it springs back down below the bottom edge.

**Example:** Choosing how to pay, the guide's In context, with the sheet shown: the payment screen (a line of Text and its Change payment method Button) is dimmed by a bare Overlay, and the sheet titled “Pay with” docks to the bottom over it, holding the three payment options as List Items in a ListGroup. visible stands for the screen's shown state, which the Button's onPress sets; a row's onPress stands for keeping that choice and hiding the sheet, and the Overlay's onPress for hiding it on a tap on the dimmed screen. The screen renders the Overlay only while the sheet shows.

```tsx
<Screen>
  <Text>Pay ₹500 to Asha Stores</Text>
  <Button label="Change payment method" onPress={() => {}} />
  <Overlay onPress={() => {}} />
  <ContentSheet visible title="Pay with">
    <ListGroup>
      <ListItem layout="Horizontal" title="UPI" supportText="Jio Payments Bank •• 4821" onPress={() => {}} />
      <ListItem layout="Horizontal" title="Debit card" supportText="•• 9012" onPress={() => {}} />
      <ListItem layout="Horizontal" title="Net banking" supportText="Any bank" onPress={() => {}} />
    </ListGroup>
  </ContentSheet>
</Screen>
```

**Props:** `children`, `modes`, `title`, `avoidKeyboard`, `keyboardSpacing`, `safeAreaBottom`, `pinToBottom`, `visible`, `maxHeightPercent`, `style`. (* required)

**Modes it reads:** Color Mode, Page type.

**Gaps (report, do not work around)**
- Open since #203 (question 6): on a phone with a home indicator the package adds the bottom safe-area inset on top of Figma's 41 px bottom padding (safeAreaBottom, on by default); whether Figma means the inset to be added is not decided.

Full entry: `components/contentsheet.md`. Links: `components/contentsheet.links.md`.
