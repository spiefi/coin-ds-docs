# AccountCard (brief)

> Coin agent pack 0.1.78+19 · flagged · full entry: `components/accountcard.md` (sources, all facts, flags)

Use an Account Card for one linked account in a row of accounts, or as the tile that adds another.

**Use when**
- One linked account in a row of accounts.
- `state` = `add`: The tile that adds another account to the row (state add).

**Placement**
- One account per tile, and one tile to add another.
- On an Accounts screen, show each linked account as a tile, with the add tile last.
- For more tiles than fit, CarouselCardAccounts scrolls them.
- It fills its host's width, so set the width where you place it: Figma's tiles are 125 px, as in Storybook and the Card Accounts carousel.

**Key rules**
- **REQUIRED** `subtitle`: Show only the masked number, in the bank's own format, such as “**** 4821”.
- **REQUIRED** `title`: Set title yourself on every tile: left out, the tile shows the sample “Personal account”.
- **REQUIRED** `subtitle`: Set subtitle yourself on a connected tile: left out, it shows the sample “**** 5651”.
- `state`: state picks the tile: connected shows art, a name, and a masked number; add shows a lavender field with a plus and a title, with no number.
- `state` = `connected`: Connected (the default): art, a name, and a masked number.
- `state` = `add`: Add: a field with a plus, then the action.
- `imageSource`: Pass the account's card art through imageSource, as an image or a URL string; it is used on a connected tile without cardSlot.
- `imageSource`: The package ships no card art, so the app supplies the art.

**Example:** Linked accounts, the guide's In context: an Accounts title, then each linked account as a tile with the add tile last. Each onPress is the screen's own action (open the account, or start linking a new one). Each tile gets Figma's 125 px where it is placed; the app supplies the card art, since the package ships none.

```tsx
<VStack>
  <Title title="Accounts" subtitle="Linked to JioFinance" />
  <HStack>
    <AccountCard
      title="Joint account"
      subtitle="**** 4821"
      imageSource={require('./card.png')}
      onPress={() => {}}
      style={{ width: 125 }}
    />
    <AccountCard
      state="add"
      title="Add account"
      onPress={() => {}}
      style={{ width: 125 }}
    />
  </HStack>
</VStack>
```

**Props:** `state` (connected | add), `title`, `subtitle`, `imageSource`, `imageRatio`, `cardSlot`, `addIcon`, `onPress`, `disabled`, `modes`, `style`, `accessibilityLabel`, `accessibilityHint`, `disableTruncation`. (* required)

**Modes it reads:** AppearanceBrand, Button / Size, Button / State, Color Mode, Context2, Emphasis, Page type.

**Gaps (report, do not work around)**
- Figma's connected card art has rounded corners (about 4–5 px); the code doesn't round the art, only the add field.
- The package ships no card art like Figma's.

Full entry: `components/accountcard.md`. Links: `components/accountcard.links.md`.
