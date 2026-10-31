# ProfileCard (brief)

> Coin agent pack 0.1.78+25 · flagged · full entry: `components/profilecard.md` (sources, all facts, flags)

Use a Profile Card to show who the user is on a dark panel: initials or a photo, a name, UPI handles, and account rows below.

**Use when**
- Show who the user is on a dark panel: initials or a photo, a name, UPI handles, and account rows below.

**Avoid when**
- Avoid: A card that needs a selected, disabled, or loading state: the Profile Card has none.
- Avoid: A card that should press as a whole: the card itself isn't pressable; its handles and body rows press through their own onPress.

**Placement**
- The card heads the Profile screen.
- Let the screen do the work: copying a handle and opening a row go through each handle's and row's onPress, and the card only lays them out.
- `width`: The card is 344 px wide by default, as Figma draws it.
- Height follows the content: 20 px of padding, and 12 px between the header, the divider, and each body row.

**Key rules**
- **REQUIRED** `name`: Unless header replaces the built-in header, set name yourself: left out, the card shows “Name”.
- **REQUIRED** `monogram`: Unless header replaces the built-in header, or avatarSource gives a photo, set monogram yourself: left out, the avatar shows “MS”.
- name, monogram, and upiHandles make the header.
- `avatarSource`: avatarSource shows a photo in place of the initials, such as a business's logo.
- `badgeIcon`: badgeIcon={null} removes the QR badge.
- `upiHandles`: upiHandles={[]} leaves just the name.
- `children`: children is the body, under a divider; leave it out for a header-only card.
- `showDivider` = `false`: The divider is drawn only when there's a body; showDivider={false} hides it.

**Example:** The Profile screen, the guide's In context: the card heads the screen under its Title, with a UPI ID to copy, a verified number, and two short account rows under a divider. Copying the handle and opening a row are the screen's own work, through their onPress.

```tsx
<VStack>
  <Title title="Profile" subtitle="Your account and payments" />
  <ProfileCard
    name="Priya Sharma"
    monogram="PS"
    upiHandles={[
      { label: 'priya@jio', iconName: 'ic_copy', onPress: () => {} },
      { label: '98765 43210', iconName: 'ic_confirm' },
    ]}
  >
    <ListItem
      layout="Horizontal"
      title="JioFinance+"
      showSupportText={false}
      navArrow={false}
      trailing={<Button label="Upgrade" onPress={() => {}} />}
    />
    <Divider />
    <ListItem
      layout="Horizontal"
      title="Linked bank accounts"
      showSupportText={false}
      onPress={() => {}}
    />
  </ProfileCard>
</VStack>
```

**Props:** `name`, `monogram`, `avatarSource`, `badgeIcon`, `upiHandles`, `header`, `children`, `showDivider`, `width`, `modes`, `style`, `accessibilityLabel`. (* required)

**Modes it reads:** AppearanceBrand, AppearanceSystem, Attached Border, Avatar Size, Badge Size, Color Mode, Context, context 10, Context2, Context4, context5, Draggable List, Emphasis, Icon Capsule Size, Icon Size, List Item Style, ListItem State, NavArrow Direction, Page type, Profile Card Appearance, Selectable, Semantic Intent, Slot gap, UPI Handle Image.

**Gaps (report, do not work around)**
- Plain Text and ListItem support text in the body stay dark on the navy panel and almost disappear, as in Figma's own sample (Component Bug #354).
- A body child's own modes override the card's on-dark modes (Component Bug #354).
- List Item Style Boxed breaks the card: white boxes cover the header and rows, and the name disappears (Component Bug #354).
- A long UPI handle never ends in …, so its UPI Handle runs past the card (Component Bug #354).
- The header is 48 px tall where Figma's is 47 (Component Bug #354).

Full entry: `components/profilecard.md`. Links: `components/profilecard.links.md`.
