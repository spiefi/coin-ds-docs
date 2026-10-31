# Link (brief)

> Coin agent pack 0.1.78+21 · flagged · full entry: `components/link.md` (sources, all facts, flags)

Use a Link to send people to related content, such as terms, help, or a recovery step, on its own line or inside a sentence.

**Use when**
- Send people to related content, such as terms, help, or a recovery step, on its own line or inside a sentence.

**Avoid when**
- Avoid: The screen's main action: links take people somewhere, so keep the main action a Button. Use instead: Button.

**Placement**
- Inside a sentence, place the Link in a TextSegment: it wraps with the copy and takes its colour and size.
- `onPress`: Let the screen open the destination (terms, privacy policy or help) in onPress; Link only reports the press.
- `autolayout`: The parent sets the width and the type sets the height: a Fill link is as wide as its parent and a Hug link as wide as its words.

**Key rules**
- **REQUIRED** `textAlign` = `Center`: Use textAlign Center with autolayout Fill: Fill stretches the link across its parent, the only width where Center has room to work.
- `autolayout` = `Fill`: autolayout Fill with textAlign Left is the default: the label starts at the left and the whole row is pressable.
- `textAlign` = `Center`: Use textAlign Center with Fill to centre the label, for example under a full-width button.
- `autolayout` = `Hug`: Use autolayout Hug for a link in a row beside other content; only the words are pressable.
- `disabled` = `true`: Disable a link only while it briefly can't be used, such as Resend code during a countdown.
- `Text Sizes`: Set the size with the Text Sizes mode: one line is 16, 17 or 24 px tall for Small, Medium and Large; long labels wrap onto more lines.
- Avoid: Do not make the main action a link: a 17 px underlined line is easy to miss and hard to tap.
- On the web, Enter and Space activate a focused link, and a disabled link is announced as disabled and skipped by Tab.

**Example:** Links inside a sentence: only the destinations are links, and the punctuation stays outside.

```tsx
<TextSegment modes={{ 'Color Mode': 'Light' }}>
  <Text modes={{ 'Color Mode': 'Light' }}>By continuing you agree to our </Text>
  <Link text="Terms" onPress={() => {}} modes={{ 'Color Mode': 'Light' }} />
  <Text modes={{ 'Color Mode': 'Light' }}> and </Text>
  <Link text="Privacy Policy" onPress={() => {}} modes={{ 'Color Mode': 'Light' }} />
  <Text modes={{ 'Color Mode': 'Light' }}>.</Text>
</TextSegment>
```

**Props:** `text`, `children`, `onPress`, `disabled`, `autolayout` (Fill | Hug), `textAlign` (Left | Center), `modes`, `style`, `numberOfLines`, `disableTruncation`, `singleLine`, `accessibilityLabel`, `accessibilityHint`. (* required)

**Modes it reads:** Color Mode, Context, Page type, Text Appearance, Text Sizes, Weight.

**Gaps (report, do not work around)**
- No pressed, hover or visited style, and no testID.
- Dark Color Mode does not recolour Link (or Text).
- Figma has no disabled variant and no Center + Hug variant; the package adds disabled.

Full entry: `components/link.md`. Links: `components/link.links.md`.
